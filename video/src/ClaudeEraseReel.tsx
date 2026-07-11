import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Audio, Sequence, staticFile, Img } from "remotion";
import { fraunces, inter } from "./fonts";
import words from "./data/words_erase.json";

const CREAM = "#ECE9E2", INK = "#1A1813", SLATE = "#3A5C84", CLAY = "#D2724E", AMBER = "#CF9544", GOLD = "#E7B24C", GREEN = "#3F9E74", MUTE = "#9A968B", RED = "#C44A3A";
const TERM = "#0E1626", TERM2 = "#0A1120", PAPER = "#F7F3EA", META = "#0866FF", METALO = "#0A5AE0";
const mono = "ui-monospace,'SF Mono',Menlo,monospace";
const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
const NAVYSH = "0 34px 66px -22px rgba(18,28,58,0.55), 0 10px 24px rgba(18,28,58,0.30)";

// scene starts (sec): crash(hook), bank(past), reframe(rules), vault(gated file), paid(rehook2), payoff(outlast), cta
const L = [0.0, 3.22, 6.98, 14.76, 18.18, 27.66, 33.80];
const Lf = L.map(fr);
const CUT = 38.6;
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

const Panel: React.FC<{ children?: React.ReactNode; tint?: string; label?: string }> = ({ children, tint, label }) => {
  const f = useCurrentFrame();
  return (
  <div style={{ position: "absolute", left: 34, right: 34, top: 384, height: 792, borderRadius: 40, background: grad("#2A2118", "#17110B"), boxShadow: NAVYSH, overflow: "hidden", border: `2px solid ${tint || "rgba(210,150,90,0.24)"}` }}>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 2px 0 rgba(255,241,220,0.07), inset 0 0 150px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", left: "50%", top: "42%", width: 820, height: 620, marginLeft: -410, marginTop: -310, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(210,120,70,0.12), transparent 70%)", opacity: 0.6 + 0.25 * Math.sin(f / 22), pointerEvents: "none" }} />
    <div style={{ position: "absolute", top: -20, bottom: -20, left: ((f * 4) % 1400) - 260, width: 220, background: "linear-gradient(100deg, transparent, rgba(240,200,140,0.06), transparent)", filter: "blur(26px)", pointerEvents: "none" }} />
    {Array.from({ length: 16 }).map((_, i) => { const sx = (i * 137 % 1000) / 1000, sy = (i * 331 % 1000) / 1000; const yy = 800 - ((f * 0.3 + sy * 820) % 830); return <div key={i} style={{ position: "absolute", left: 30 + sx * 940, top: yy, width: 3, height: 3, borderRadius: "50%", background: "rgba(235,190,130,0.35)", opacity: 0.25 + 0.35 * Math.sin(f / 18 + i * 1.3), pointerEvents: "none" }} />; })}
    <div style={{ position: "absolute", left: 30, top: 26, display: "flex", gap: 12, alignItems: "center", zIndex: 2 }}>
      {[RED, AMBER, GREEN].map((c, i) => <div key={i} style={{ width: 15, height: 15, borderRadius: "50%", background: c, opacity: 0.9 }} />)}
      {label && <div style={{ marginLeft: 14, fontFamily: mono, fontSize: 22, color: "rgba(235,215,190,0.6)" }}>{label}</div>}
    </div>
    {children}
  </div>
  );
};

const Pill: React.FC<{ text: string; x: number; y: number; o?: number }> = ({ text, x, y, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, padding: "7px 16px", borderRadius: 999, background: "rgba(20,30,52,0.9)", border: "1.5px solid rgba(150,170,215,0.4)", fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 22, color: "rgba(190,205,235,0.92)", display: "flex", gap: 8, alignItems: "center", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.6)", whiteSpace: "nowrap" }}>
    <span style={{ fontSize: 18 }}>◍</span>{text}
  </div>
);

const Chip: React.FC<{ text: string; bg: string; bd: string; fg: string; size?: number }> = ({ text, bg, bd, fg, size = 40 }) => (
  <div style={{ padding: `${size * 0.34}px ${size * 0.7}px`, borderRadius: 18, background: bg, border: `3px solid ${bd}`, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, color: fg, boxShadow: `0 18px 40px -14px rgba(10,16,34,0.7)`, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{text}</div>
);

// pixel Claude mascot (canonical critter) + costumes
const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number; shock?: number; cheer?: number; stern?: number; glasses?: number; brainHat?: number; sherlock?: number; wizard?: number; judge?: number; cop?: number; beard?: number; zuck?: number; zuckChain?: number; zuckCurly?: number; wang?: number; bikini?: number; prof?: number; girl?: number; suit?: number; dino?: number; constr?: number; chef?: number; robber?: number }> = ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0, stern = 0, glasses = 0, brainHat = 0, sherlock = 0, wizard = 0, judge = 0, cop = 0, beard = 0, zuck = 0, zuckChain = 0, zuckCurly = 0, wang = 0, bikini = 0, prof = 0, girl = 0, suit = 0, dino = 0, constr = 0, chef = 0, robber = 0 }) => {
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
        {/* robber: black beanie + eye-mask band (eyes draw on top) + striped jumper */}
        {robber > 0 && <>
          <rect x={34} y={30} width={132} height={20} fill="#22262E" />
          <rect x={34} y={46} width={132} height={5} fill="#15181E" />
          <rect x={34} y={60} width={132} height={28} fill="#22262E" />
          <rect x={60} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={106} y={63} width={34} height={22} fill="#E8E4DA" />
          <rect x={34} y={106} width={132} height={40} fill="#E8E4DA" />
          <rect x={34} y={108} width={132} height={9} fill="#22262E" />
          <rect x={34} y={126} width={132} height={9} fill="#22262E" />
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
        <div style={{ padding: "18px 20px", borderRadius: 24, background: "#FFFFFF", border: `5px solid ${META}`, boxShadow: `0 8px 18px -6px ${META}66, inset 0 2px 0 rgba(255,255,255,0.9)` }}>
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

const ScreenHead: React.FC<{ lf: number; big: string; clay: string; chip?: boolean; paid?: boolean; stack?: boolean }> = ({ lf, big, clay, chip = true, paid = false, stack = false }) => { const p = over(lf, 0, fr(0.4), Easing.out(Easing.back(1.5))); return (<>
  {chip && (
  <div style={{ position: "absolute", right: 26, top: 22, zIndex: 46, transform: `scale(${1 + 0.035 * Math.abs(Math.sin(lf / 6))})`, display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 12, background: "linear-gradient(180deg,#2C4764,#1B2E48)", border: "2px solid #5C7CA8", boxShadow: "0 6px 16px rgba(0,0,0,0.5)" }}>
    <span style={{ fontSize: 13 }}>🔒</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}>FABLE 5</span>
  </div>)}
  <div style={{ position: "absolute", left: 48, right: 48, top: stack ? 52 : 68, textAlign: "center", zIndex: 46, transform: `scale(${p})`, opacity: p }}><span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: stack ? 48 : 50, lineHeight: 1.08, color: "#F4EEDF", textShadow: "0 3px 12px rgba(0,0,0,0.7), 0 0 10px rgba(0,0,0,0.5)" }}>{big}{stack ? <br /> : " "}<span style={{ color: "#F0A878" }}>{clay}</span></span></div>
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
  const done = prog >= 0.985;
  if (done) prog = 1;                                                     // snap: fill, counter and ✓ land on the SAME frame
  let val = Math.round(interpolate(prog, [0, 1], [from, to]));
  if (!done && val === to) val = to > from ? to - 1 : to + 1;             // never show the target value before the seal pops
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
        <div style={{ position: 'absolute', left: `${prog * 100}%`, top: -3, width: 9, height: 17, marginLeft: -4, borderRadius: 4, background: spark, boxShadow: `0 6px 9px -4px ${spark}`, opacity: done ? 0 : 1 }} />
        {done && (<div style={{ position: 'absolute', right: -12, top: -10, width: 28, height: 28, borderRadius: 14, background: '#10A37F', border: `2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 900, transform: `scale(${doneP})`, boxShadow: '0 0 14px rgba(16,163,127,0.7)' }}>✓</div>)}
      </div>
    </div>
  );
};

// ============================ VAULT SCENES (The Judgment Vault) ============================
// NOTE: scene bodies live INSIDE <Panel> (local coord space 0..792, overflow-clipped). Keep tops in ~210..780.
const BRASS = "#E2A954", BRASS2 = "#B87A32", STEEL2 = "#151F33";

// a circular bank-vault door. open:0..1 slides plate off; dial rotates; glow=gold bloom; locked tints red.
const VaultDoor: React.FC<{ size: number; open?: number; dial?: number; glow?: number; locked?: number; sealed?: number; green?: number }> = ({ size, open = 0, dial = 0, glow = 0, locked = 0, sealed = 0, green = 0 }) => {
  const rim = green > 0.5 ? "#3F9E74" : locked > 0.5 ? "#C24A34" : BRASS;
  const glowC = green > 0.5 ? "#3F9E74" : GOLD;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: grad("#2C3D5A", STEEL2), boxShadow: `0 30px 56px -20px rgba(8,13,28,0.7), inset 0 4px 0 rgba(255,255,255,0.06)` }} />
      <div style={{ position: "absolute", inset: size * 0.045, borderRadius: "50%", border: `${Math.max(6, size * 0.05)}px solid ${rim}`, boxShadow: `inset 0 0 ${size * 0.1}px rgba(0,0,0,0.55), 0 0 ${16 + glow * 42}px ${glowC}${glow > 0.4 ? "cc" : "55"}` }} />
      {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; const rr = size * 0.42; return <div key={i} style={{ position: "absolute", left: size / 2 + Math.cos(a) * rr - 3, top: size / 2 + Math.sin(a) * rr - 3, width: 6, height: 6, borderRadius: "50%", background: BRASS2, boxShadow: "0 1px 1px rgba(0,0,0,0.5)" }} />; })}
      <div style={{ position: "absolute", inset: size * 0.14, borderRadius: "50%", background: grad("#27374F", STEEL2), overflow: "hidden", transform: `translateX(${open * size * 0.92}px)`, boxShadow: "inset 0 0 24px rgba(0,0,0,0.6)", opacity: 1 - open * 0.15 }}>
        {[0.9, 0.66, 0.42].map((s, i) => <div key={i} style={{ position: "absolute", inset: `${(1 - s) * 50}%`, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)" }} />)}
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${dial}deg)` }}>
          {Array.from({ length: 6 }, (_, i) => <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: size * 0.28, height: Math.max(5, size * 0.028), marginTop: -size * 0.014, background: grad("#8C97A8", "#5A6576"), transformOrigin: "0% 50%", transform: `rotate(${(i / 6) * 360}deg)`, borderRadius: 4 }} />)}
        </div>
        <div style={{ position: "absolute", left: "50%", top: "50%", width: size * 0.2, height: size * 0.2, marginLeft: -size * 0.1, marginTop: -size * 0.1, borderRadius: "50%", background: grad(BRASS, BRASS2), boxShadow: `0 0 0 ${size * 0.02}px #1B2740, inset 0 3px 6px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.4)`, transform: `rotate(${dial * 1.6}deg)` }}>
          {sealed < 0.3 && <div style={{ position: "absolute", left: "50%", top: 4, width: 4, height: size * 0.06, marginLeft: -2, background: "#2A1B0C", borderRadius: 2 }} />}
        </div>
      </div>
      {/* clean seal badge (covers the knob entirely — no dial bits poking out) */}
      {sealed > 0 && <div style={{ position: "absolute", left: "50%", top: "50%", width: size * 0.26, height: size * 0.26, marginLeft: -size * 0.13, marginTop: -size * 0.13, borderRadius: "50%", background: grad("#F0CB63", "#D39A2A"), border: `${Math.max(2, size * 0.012)}px solid #F6E4A0`, boxShadow: `0 0 ${glow * 22 + 10}px ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sealed})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size * 0.15, color: locked > 0.5 ? "#3a2a05" : "#fff", lineHeight: 1 }}>{locked > 0.5 ? "🔒" : "✓"}</span>
      </div>}
    </div>
  );
};

const PastCard: React.FC<{ w?: number; label: string; tone?: string; tilt?: number; glow?: number }> = ({ w = 300, label, tone = GREEN, tilt = 0, glow = 0 }) => (
  <div style={{ width: w, padding: "12px 16px", borderRadius: 15, background: WIN, border: "1px solid #E4DAC8", boxShadow: `0 16px 30px -16px rgba(18,28,58,0.4), 0 0 ${glow * 26}px ${GOLD}${glow > 0.3 ? "88" : "00"}`, transform: `rotate(${tilt}deg)`, display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ width: 28, height: 28, borderRadius: 8, background: tone, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, flexShrink: 0 }}>✓</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: INK }}>{label}</span>
  </div>
);

const RuleLine: React.FC<{ n: number; text: string; on: number }> = ({ n, text, on }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", borderRadius: 12, background: on > 0.5 ? "rgba(63,158,116,0.12)" : "rgba(58,92,132,0.06)", border: `1px solid ${on > 0.5 ? "rgba(63,158,116,0.4)" : "rgba(58,92,132,0.15)"}`, opacity: Math.min(1, on * 1.4), transform: `translateX(${(1 - on) * 20}px)` }}>
    <span style={{ width: 26, height: 26, borderRadius: 7, background: on > 0.5 ? GREEN : MUTE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{n}</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, color: INK }}>{text}</span>
  </div>
);

// ===== shared cinematic BACKDROP — a rendered BANK-VAULT ROOM (safe-deposit wall + god-rays + floor) fills the panel =====
const VaultChamber: React.FC<{ lf: number; warm?: number; heat?: number }> = ({ lf, warm = 1, heat = 0 }) => {
  const FY = 648;
  const cols = 9, rows = 6, bw = 96, bh = 82, gx = 8, gy = 8;
  const gridW = cols * (bw + gx) - gx, startX = (1012 - gridW) / 2;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg,#121d31 0%,#0d1424 55%,#090e1a 100%)" }} />
      {/* back wall: grid of safe-deposit boxes */}
      <div style={{ position: "absolute", left: 0, top: 44, right: 0, height: FY - 44, overflow: "hidden" }}>
        {Array.from({ length: rows }).map((_, r) => Array.from({ length: cols }).map((_, c) => {
          const x = startX + c * (bw + gx), y = 30 + r * (bh + gy);
          return <div key={`${r}-${c}`} style={{ position: "absolute", left: x, top: y, width: bw, height: bh, borderRadius: 9, background: "linear-gradient(180deg, rgba(52,72,108,0.62), rgba(30,44,70,0.6))", boxShadow: "inset 0 2px 0 rgba(160,190,230,0.13), inset 0 -4px 7px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.35)", border: "1px solid rgba(100,132,182,0.16)" }}>
            <div style={{ position: "absolute", left: 9, top: bh / 2 - 9, width: 5, height: 18, borderRadius: 2, background: "rgba(140,170,220,0.2)" }} />
            <div style={{ position: "absolute", right: 15, top: bh / 2 - 10, width: 20, height: 20, borderRadius: "50%", background: "radial-gradient(circle at 40% 35%, rgba(210,170,90,0.5), rgba(120,90,40,0.35))", boxShadow: "inset 0 1px 1px rgba(255,225,160,0.25)" }} />
          </div>;
        }))}
        <AbsoluteFill style={{ background: "radial-gradient(125% 95% at 50% 58%, transparent 26%, rgba(9,14,26,0.82) 88%)" }} />
      </div>
      {/* warm key glow behind hero */}
      <div style={{ position: "absolute", left: "50%", top: 400, width: 780, height: 620, marginLeft: -390, marginTop: -310, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(${231 + heat * 24},${178 - heat * 90},${76 - heat * 40},${0.2 * warm + heat * 0.1}), transparent 62%)`, filter: "blur(6px)" }} />
      {/* crisp volumetric god-rays */}
      {[[268, -6, 132], [520, 0, 104], [752, 6, 132]].map(([cx, rot, w], i) => <div key={i} style={{ position: "absolute", left: cx, top: -46, width: w, height: FY + 90, marginLeft: -(w as number) / 2, background: `linear-gradient(180deg, rgba(248,214,146,${0.18 * warm}) 0%, rgba(231,178,76,${0.06 * warm}) 44%, transparent 80%)`, transform: `rotate(${rot}deg)`, transformOrigin: "50% 0%", filter: "blur(2.5px)", mixBlendMode: "screen" }} />)}
      {/* perspective floor */}
      <div style={{ position: "absolute", left: -60, right: -60, top: FY, bottom: -30, background: "linear-gradient(180deg,#101c34,#14243f)", overflow: "hidden" }}>
        {Array.from({ length: 15 }).map((_, i) => { const t = (i - 7) / 7; return <div key={i} style={{ position: "absolute", left: "50%", top: -6, width: 2, height: 260, background: `rgba(150,185,240,${0.24 - Math.abs(t) * 0.07})`, transformOrigin: "50% 0%", transform: `translateX(-50%) rotate(${t * 45}deg)` }} />; })}
        {[0, 1, 2, 3, 4].map(i => <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 12 + i * i * 10 + i * 12, height: 1, background: `rgba(150,185,240,${0.24 - i * 0.04})` }} />)}
        <div style={{ position: "absolute", left: "50%", top: 0, width: 460, height: 130, marginLeft: -230, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(231,178,76,${0.16 * warm}), transparent 62%)`, filter: "blur(9px)" }} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: FY, height: 2, background: "rgba(170,205,250,0.4)", boxShadow: "0 0 28px rgba(170,205,250,0.55)" }} />
      {/* dust motes catching light */}
      {Array.from({ length: 34 }).map((_, i) => { const dep = (i % 3) + 1; const t = ((lf / (210 * dep) + seed(i)) % 1); const x = seed(i * 2) * 1012; const y = 56 + (((seed(i * 3) * 600 - t * 100 * dep) % 600) + 600) % 600; return <div key={i} style={{ position: "absolute", left: x, top: y, width: 1.5 + dep * 1.4, height: 1.5 + dep * 1.4, borderRadius: "50%", background: "rgba(248,228,182,0.75)", opacity: 0.16 + 0.3 * (0.5 + 0.5 * Math.sin(lf / 16 + i)), boxShadow: dep > 2 ? "0 0 5px rgba(248,228,182,0.6)" : "none" }} />; })}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 140px 16px rgba(0,0,0,0.4)", pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

// ===== SCENE 0 : CRASH HOOK — a GIANT vault SLAMS into the vault room; a crowd of Claudes is launched (with trails) =====
// crash constants shared by the in-panel scene AND the full-screen escapee overlay (sprites fling PAST the panel border)
const CRASH_FI = 24, CRASH_GROUND = 648;
const CRASH_FITS: any[] = [{ wizard: 1 }, { chef: 1 }, { constr: 1 }, { glasses: 1 }, { cop: 1 }, { beard: 1 }, { suit: 1 }];
const CRASH_CHARS = Array.from({ length: 7 }).map((_, i) => { const x = 92 + i * 138 + seed(i) * 16; const s = 92 + seed(i * 2) * 34; return { x, s, fit: CRASH_FITS[i], vx: ((x - 506) / 30) * 1.45 + (seed(i * 3) - 0.5) * 3, vy: 16 + seed(i * 4) * 9, sp: (seed(i * 5) - 0.5) * 52, dep: 0.82 + seed(i * 7) * 0.4 }; });
// flying sprites live OUTSIDE the clipped Panel so they cross the black border onto the cream page (Alex: fling off-screen, no fading)
// ============================== ERASE SCENE BODIES (panel-local 0..792) ==============================
// Shared: a censored people-finder LISTING card (real-run structure, data redacted by design).
const RedBlock: React.FC<{ w: number }> = ({ w }) => <div style={{ height: 13, width: w, borderRadius: 3, background: "#26324A" }} />;
// REAL-looking people-finder listing: partially-redacted values so the viewer feels THEIR data is public.
const REDROWS: [string, string, "age" | "addr" | "rel"][] = [
  ["Age", "34", "age"],
  ["Address", "4██ Maple Ave, █████ TX", "addr"],
  ["Phone", "(███) ███-██92", "addr"],
  ["Relatives", "J████ · M████ · K███", "rel"],
];
const Listing: React.FC<{ w?: number; flags?: { age?: number; addr?: number; rel?: number }; scale?: number; dim?: number }> = ({ w = 470, flags = {}, scale = 1, dim = 0 }) => (
  <div style={{ width: w, borderRadius: 16, background: grad("#FFFFFF", "#F3F0E8"), border: "2px solid #DFD8C8", boxShadow: NAVYSH, overflow: "hidden", transform: `scale(${scale})`, opacity: 1 - dim * 0.5 }}>
    <div style={{ height: 52, background: grad(SLATE, "#2C4764"), display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#C9D6E8" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}><RedBlock w={128} /><div style={{ height: 8, width: 76, borderRadius: 3, background: "rgba(201,214,232,0.5)" }} /></div>
      <div style={{ flex: 1 }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#0F1B30", background: "#EAF0FA", padding: "3px 9px", borderRadius: 6 }}>6 records</span>
      <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 15, color: "#EAF0FA" }}>PUBLIC</span>
    </div>
    <div style={{ padding: "15px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
      {REDROWS.map(([lab, val, key], i) => { const fl = (flags as any)[key] as number | undefined; return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15, color: MUTE, width: 92 }}>{lab}</span>
          <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 19, color: "#26324A", letterSpacing: 0.5, flex: 1 }}>{val}</span>
          {(fl ?? 0) > 0.02 && <div style={{ position: "absolute", right: 4, top: -5, padding: "3px 11px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), boxShadow: "0 5px 12px rgba(0,0,0,0.28)", transform: `scale(${fl})` }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#fff" }}>EXPOSED</span></div>}
        </div>
      ); })}
    </div>
  </div>
);
// StealBox: gated prompt card — line 1 readable, rest BLURRED + guide chip (CLONE house move #9)
const StealBox: React.FC<{ lf: number; n: number; line1: string; y?: number; scale?: number }> = ({ lf, n, line1, y = 470, scale = 1 }) => {
  const p = over(lf, fr(0.15), fr(0.4), Easing.out(Easing.back(1.5)));
  if (p <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: "50%", top: y, transform: `translateX(-50%) scale(${(0.9 + p * 0.1) * scale})`, width: 496, borderRadius: 16, background: grad("#12203A", "#0B1730"), border: "2px solid rgba(140,170,220,0.32)", boxShadow: NAVYSH, overflow: "hidden", zIndex: 6, opacity: p }}>
      <div style={{ padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(140,170,220,0.18)" }}>
        <span style={{ fontFamily: mono, fontWeight: 900, fontSize: 17, color: GOLD }}>PROMPT {n}</span>
        <div style={{ flex: 1 }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "rgba(190,205,235,0.6)" }}>gated</span>
      </div>
      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 9 }}>
        <span style={{ fontFamily: mono, fontSize: 18, color: "#DCE7F7", lineHeight: 1.35 }}>{line1}</span>
        {[0.86, 0.7, 0.9, 0.52].map((wf, i) => <div key={i} style={{ height: 15, width: `${wf * 100}%`, borderRadius: 3, background: "rgba(150,175,215,0.72)", filter: `blur(${4.5 + i * 1.3}px)` }} />)}
      </div>
      <div style={{ padding: "10px 18px", background: "rgba(231,178,76,0.14)", display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 19 }}>🔒</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, color: GOLD }}>full prompt in the guide · comment ERASE</span>
      </div>
    </div>
  );
};
// ============ REALISTIC CLAUDE CHAT WINDOW (claude.ai style) ============
const ChatWindow: React.FC<{ lf: number; prompt: string; gatedFrom: number; children?: React.ReactNode; h?: number }> = ({ lf, prompt, gatedFrom, children, h = 470 }) => {
  const winP = lf <= 0 ? 1 : Math.max(0.92, over(lf, 0, fr(0.2), Easing.out(Easing.cubic)));  // window solid at scene start
  const typedFrac = lf <= 0 ? 0.55 : Math.min(1, 0.55 + over(lf, 0, fr(0.4), Easing.linear) * 0.45);  // prompt already ~half-typed at open
  const typed = Math.floor(typedFrac * prompt.length);
  const shown = prompt.slice(0, typed);
  const sent = lf <= 0 ? 1 : Math.max(0.85, over(lf, 0, fr(0.22), Easing.out(Easing.cubic)));  // reply zone present at open
  return (
    <div style={{ position: "absolute", left: "50%", top: 214, transform: `translateX(-50%) scale(${0.92 + winP * 0.08})`, width: 700, height: h, borderRadius: 24, background: grad("#26231F", "#1B1815"), border: "2px solid #3A342C", boxShadow: NAVYSH, overflow: "hidden", opacity: winP, zIndex: 5 }}>
      <div style={{ height: 62, background: "#211E1A", borderBottom: "1px solid #38322A", display: "flex", alignItems: "center", padding: "0 22px", gap: 12 }}>
        <ClaudeLogo lf={lf} size={30} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 24, color: "#EFE7DA" }}>Claude</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 16, color: "#8C8578", padding: "5px 13px", borderRadius: 999, background: "#2E2A24", border: "1px solid #3E382F" }}>Fable 5</span>
      </div>
      <div style={{ padding: "20px 22px 8px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: 560, padding: "14px 18px", borderRadius: 18, borderTopRightRadius: 5, background: "#38332B" }}>
          <span style={{ fontFamily: mono, fontSize: 21, lineHeight: 1.4, color: "#E9E0D2" }}>
            {shown.split("").map((ch, i) => i >= gatedFrom ? "" : ch).join("")}
            {typed > gatedFrom && <span style={{ filter: "blur(5px)", color: "#B8AE9C" }}>{shown.slice(gatedFrom)}</span>}
            {typed < prompt.length && <span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: "#D97757" }}>&#9613;</span>}
          </span>
          {typed >= prompt.length && <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 999, background: "rgba(217,119,87,0.16)" }}><span style={{ fontSize: 14 }}>&#128274;</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, color: "#D97757" }}>full prompt in the guide &middot; comment ERASE</span></div>}
        </div>
      </div>
      {sent > 0.05 && <div style={{ padding: "6px 22px", opacity: sent }}>
        <div style={{ display: "flex", gap: 12 }}>
          <ClaudeLogo lf={lf} size={26} />
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </div>}
    </div>
  );
};

const HouseCard: React.FC<{ idx: number; w?: number; worst?: boolean; reveal?: number }> = ({ idx, w = 300, worst = false, reveal = 1 }) => (
  <div style={{ width: w, borderRadius: 16, overflow: "hidden", background: "#0C1424", border: `${worst ? 4 : 2}px solid ${worst ? RED : "#3A342C"}`, boxShadow: NAVYSH, position: "relative", opacity: reveal }}>
    <Img src={staticFile(`refs/house_blur_${idx}.jpg`)} style={{ width: "100%", height: w * 0.6, objectFit: "cover", display: "block" }} />
    <div style={{ height: 44, background: "#1B1815", display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
      <span style={{ width: 22, height: 22, borderRadius: 6, background: worst ? RED : "#3A342C" }} />
      <div style={{ height: 12, width: worst ? 150 : 110, borderRadius: 3, background: "rgba(120,150,210,0.4)" }} />
    </div>
    {worst && <div style={{ position: "absolute", right: -6, top: -14, padding: "6px 15px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), boxShadow: "0 6px 14px rgba(0,0,0,0.35)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: "#fff" }}>your house &#127968;</span></div>}
  </div>
);

const CrashEscapees: React.FC<{ lf: number }> = () => null; // ERASE hook stays inside the panel

// ---- SCENE 0 HOOK (B1): censored listing FULLY on frame 0 + winner-header pill + shocked Mascot + row-sweep ----
const CrashBody: React.FC<{ lf: number }> = ({ lf }) => {
  const settle = over(lf, 0, fr(0.5), Easing.out(Easing.cubic));      // solid at f0, slight settle
  const zoom = 1.05 + over(lf, 0, fr(3.4), Easing.linear) * 0.06;     // slow ken-burns push into the house
  const scanY = over(lf, fr(0.25), fr(2.0)) * 486;                    // red scan reticle sweeps down the house
  const scanning = over(lf, fr(0.25), fr(2.0)) < 1;
  const alarm = 0.82 + Math.sin(lf / 6) * 0.18;                       // red danger pulse
  // your exposed data, snapping onto YOUR house one by one (the reveal)
  const pins: { lab: string; x: number; y: number; t: number }[] = [
    { lab: "Age 34", x: 120, y: 96, t: 0.55 },
    { lab: "4██ Maple Ave, ██ TX", x: 470, y: 176, t: 0.95 },
    { lab: "(███) ███-██92", x: 150, y: 300, t: 1.35 },
    { lab: "Relatives: J██ · M██ · K██", x: 430, y: 384, t: 1.75 },
  ];
  return (
    <AbsoluteFill>
      {/* red danger vignette (pulsing) */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 78% at 50% 42%, rgba(196,74,58,0.14), transparent 62%)", opacity: alarm }} />
      {/* ===== BIG blurred MANSION — the main focus ===== */}
      <div style={{ position: "absolute", left: "50%", top: 150, transform: `translateX(-50%) scale(${0.96 + settle * 0.04})`, width: 944, height: 500, borderRadius: 24, overflow: "hidden", border: `4px solid ${RED}`, boxShadow: `0 30px 60px -18px rgba(120,20,10,0.5)` }}>
        <Img src={staticFile("refs/house_blur_1.jpg")} style={{ position: "absolute", left: "50%", top: "50%", width: 1080, transform: `translate(-50%,-50%) scale(${zoom})` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,8,4,0.12) 0%, rgba(15,8,4,0.10) 55%, rgba(15,8,4,0.5) 100%)" }} />
        {/* "your home" label bottom-left */}
        <div style={{ position: "absolute", left: 18, bottom: 16, display: "inline-flex", alignItems: "center", gap: 9, padding: "9px 18px", borderRadius: 999, background: "rgba(20,12,7,0.82)", border: "1.5px solid rgba(235,200,150,0.4)" }}><span style={{ fontSize: 22 }}>📍</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#F3E7D2" }}>your home</span></div>
        {/* PUBLIC tag top-right, pulsing */}
        <div style={{ position: "absolute", right: 16, top: 16, padding: "8px 18px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), transform: `scale(${alarm})`, boxShadow: "0 6px 16px rgba(120,20,10,0.5)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: 1 }}>PUBLIC</span></div>
        {/* red scan reticle sweeping down while it "finds" the data */}
        {scanning && <div style={{ position: "absolute", left: 0, right: 0, top: scanY, height: 5, background: `linear-gradient(90deg, transparent, ${RED}, transparent)`, boxShadow: `0 6px 14px -4px ${RED}` }} />}
        {/* the exposed data pins snapping onto the house */}
        {pins.map((pn, k) => { const pp = over(lf, fr(pn.t), fr(0.32), Easing.out(Easing.back(2))); if (pp <= 0.02) return null; const bob = Math.sin(lf / 13 + k) * 2; return (
          <div key={k} style={{ position: "absolute", left: pn.x, top: pn.y + bob, transform: `scale(${pp})`, transformOrigin: "0% 50%", display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(20,12,7,0.9)", border: `2px solid ${RED}`, boxShadow: "0 8px 18px -6px rgba(0,0,0,0.6)" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: RED, boxShadow: `0 0 8px ${RED}` }} />
            <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 20, color: "#EFE1CC" }}>{pn.lab}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#fff", padding: "2px 8px", borderRadius: 999, background: grad("#E0975C", "#C5603C") }}>EXPOSED</span>
          </div>); })}
      </div>
      {/* alarm banner under the house */}
      <div style={{ position: "absolute", left: "50%", top: 672, transform: `translateX(-50%) scale(${0.97 + Math.sin(lf / 8) * 0.03})`, display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), boxShadow: "0 10px 22px -8px rgba(160,50,40,0.55)", zIndex: 6 }}>
        <span style={{ fontSize: 22 }}>⚠️</span><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff" }}>all of this is public on 10+ sites</span>
      </div>
      {/* shocked mascot peeking bottom-right */}
      <div style={{ position: "absolute", left: 812, top: 636, zIndex: 8, transform: `rotate(${Math.sin(lf / 11) * 4}deg)` }}>
        <Mascot lf={lf} size={150} shock={0.92} gaze={-1} nodAmp={2} nodSpeed={7} />
      </div>
    </AbsoluteFill>
  );
};

// ---- SCENE 1 PROOF (B2): "3 sites" — three listings fan in, flags snap word-synced, counter chip ----
// realistic people-search results page (styled like FastPeopleSearch — real UI, redacted fake data)
const RealSearch: React.FC<{ lf: number; w?: number; rows?: number }> = ({ lf, w = 640, rows = 3 }) => {
  const data = [
    { age: "Age 34", city: "Austin, TX" },
    { age: "Age 41", city: "Dallas, TX" },
    { age: "Age 29", city: "Houston, TX" },
  ];
  return (
    <div style={{ width: w, borderRadius: 14, overflow: "hidden", background: "#FFFFFF", boxShadow: NAVYSH, border: "1px solid #D8D3C8" }}>
      {/* green site header + search bar */}
      <div style={{ height: 46, background: "#2E7D5B", display: "flex", alignItems: "center", padding: "0 14px", gap: 12 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "#fff" }}>Fast<span style={{ color: "#BFE8D4" }}>PeopleSearch</span></span>
        <div style={{ flex: 1, height: 26, borderRadius: 5, background: "#fff", display: "flex", alignItems: "center", padding: "0 10px" }}><div style={{ height: 9, width: 120, borderRadius: 2, background: "#1B2A44" }} /></div>
        <div style={{ width: 30, height: 26, borderRadius: 5, background: "#20624A", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14 }}>🔍</div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, color: "#2A2A2A", marginBottom: 10 }}>Over <span style={{ color: "#2E7D5B" }}>100+</span> public records found</div>
        {data.slice(0, rows).map((r, i) => { const hi = (lf % (rows * 18)) / 18 | 0; return (
          <div key={i} style={{ borderTop: i ? "1px solid #EAE6DC" : "none", padding: "11px 0", position: "relative", background: hi === i ? "rgba(196,74,58,0.05)" : "transparent" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ height: 13, width: 150, borderRadius: 3, background: "#1B2A44" }} />
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15, color: "#555" }}>{r.age} · {r.city}</span>
              <div style={{ flex: 1 }} />
              <div style={{ padding: "5px 11px", borderRadius: 6, background: "#2E7D5B", fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#fff" }}>VIEW FREE DETAILS ›</div>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 4, alignItems: "center" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: "#888" }}>Past Addresses:</span>{[70, 90, 60].map((wd, k) => <div key={k} style={{ height: 10, width: wd, borderRadius: 2, background: "#26324A" }} />)}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13, color: "#888" }}>Relatives:</span>{[64, 80].map((wd, k) => <div key={k} style={{ height: 10, width: wd, borderRadius: 2, background: "#26324A" }} />)}</div>
          </div>); })}
      </div>
    </div>
  );
};
// tease of the 4 prompts (numbered, redacted) — alludes to the payoff early
const PromptTease: React.FC<{ lf: number; t0?: number }> = ({ lf, t0 = 0.6 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#F0A583" }}>4 prompts fix this</span>
    {[1, 2, 3, 4].map((n, i) => { const pp = over(lf, fr(t0 + i * 0.12), fr(0.3), Easing.out(Easing.back(1.8))); if (pp <= 0.02) return null; return (
      <div key={n} style={{ transform: `scale(${pp}) translateY(${Math.sin(lf / 12 + i) * 2}px)`, width: 44, height: 52, borderRadius: 9, background: grad("#2A2118", "#181109"), border: "2px solid rgba(231,178,76,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 20, color: GOLD }}>{n}</span>
        <span style={{ fontSize: 11 }}>🔒</span>
      </div>); })}
  </div>
);
const BankBody: React.FC<{ lf: number }> = ({ lf }) => {
  const n = Math.min(10, Math.floor(over(lf, fr(0.4), fr(1.8)) * 10.6));
  const pIn = lf <= 0 ? 1 : Math.max(0.9, over(lf, 0, fr(0.35), Easing.out(Easing.cubic)));
  return (
    <AbsoluteFill>
      {/* the realistic people-search results page (the "site") */}
      <div style={{ position: "absolute", left: "50%", top: 150, transform: `translateX(-50%) scale(${0.92 + pIn * 0.06}) translateY(${Math.sin(lf / 18) * 3}px)`, zIndex: 3 }}>
        <div style={{ position: "relative" }}>
          <RealSearch lf={lf} w={660} rows={3} />
          {/* red PUBLIC stamp slams on */}
          <div style={{ position: "absolute", right: -8, top: -14, padding: "7px 16px", borderRadius: 999, background: grad("#C44A3A", "#992E22"), transform: `rotate(-6deg) scale(${over(lf, fr(1.0), fr(0.35), Easing.out(Easing.back(1.8)))})`, boxShadow: "0 6px 14px rgba(120,20,10,0.4)" }}><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, color: "#fff", letterSpacing: 1 }}>ALL PUBLIC</span></div>
        </div>
      </div>
      {/* "10 sites" counter */}
      <div style={{ position: "absolute", left: "50%", top: 552, transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 12, padding: "13px 26px", borderRadius: 16, background: grad("#E9825C", "#C7541F"), boxShadow: "0 10px 24px -8px rgba(160,60,30,0.5)", zIndex: 5 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: "#fff" }}>{n}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 22, color: "#FFF0E6" }}>sites like this have your info</span>
      </div>
      {/* the 4-prompt tease (open loop) */}
      <div style={{ position: "absolute", left: "50%", top: 636, transform: "translateX(-50%)", zIndex: 5 }}><PromptTease lf={lf} t0={0.8} /></div>
      <div style={{ position: "absolute", left: 96, top: 690, zIndex: 8 }}><Mascot lf={lf} size={106} shock={0.6} gaze={1} nodAmp={2.4} nodSpeed={7} /></div>
    </AbsoluteFill>
  );
};
// ---- SCENE 2 PROMPT 1 (B3): Fable panel + StealBox PROMPT 1 + site cards streaming + creeped Mascot ----
const UltraBody: React.FC<{ lf: number }> = ({ lf }) => {
  const brokers = ["truepeoplesearch", "fastpeoplesearch", "radaris", "spokeo", "whitepages"];
  const scan = over(lf, 0, fr(5.4));
  const found = Math.min(10, Math.round(scan * 10.5));
  return (
    <AbsoluteFill>
      <ChatWindow lf={lf} prompt="Search every people-finder site for my name and show everything public" gatedFrom={30} h={500}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: "#B8AE9C" }}>Scanning people-finder sites{".".repeat(1 + (Math.floor(lf / 8) % 3))}</div>
          <div style={{ flex: 1 }} /><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: "#F0A583" }}>{found} found</div>
        </div>
        <div style={{ height: 8, width: "100%", borderRadius: 4, background: "#241E17", overflow: "hidden", marginBottom: 12, position: "relative" }}>
          <div style={{ height: "100%", width: `${scan * 100}%`, background: grad("#E0975C", "#C5603C") }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, left: `${(lf * 3 % 100)}%`, width: 30, background: "linear-gradient(90deg,transparent,rgba(240,200,140,0.5),transparent)" }} />
        </div>
        {brokers.map((site, i) => { const reached = scan > (i + 0.55) / 5; const glow = 0.7 + 0.3 * Math.sin(lf / 6 + i); return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 6, borderRadius: 10, background: "#241E17", opacity: reached ? 1 : 0.55 }}>
            <span style={{ width: 15, height: 15, borderRadius: 4, background: reached ? RED : "#4A4237", opacity: reached ? glow : 1 }} />
            <span style={{ fontFamily: mono, fontSize: 16, color: reached ? "#D8C9B4" : "#8A8172" }}>{site}</span><div style={{ flex: 1 }} />
            {reached
              ? <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 13, color: "#fff", padding: "3px 10px", borderRadius: 999, background: grad("#E0975C", "#C5603C") }}>EXPOSED</span>
              : <span style={{ display: "inline-block", width: 13, height: 13, borderRadius: "50%", border: "2px solid #6A6152", borderTopColor: "transparent", transform: `rotate(${lf * 22}deg)` }} />}
          </div>); })}
        {found >= 8 && <div style={{ marginTop: 4, fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 24, color: "#F0A583", transform: `scale(${1 + Math.sin(lf / 7) * 0.02})` }}>10 sites have your home address</div>}
      </ChatWindow>
      <div style={{ position: "absolute", left: 70, top: 706, zIndex: 8, transform: `rotate(${Math.sin(lf / 12) * 3}deg)` }}><Mascot lf={lf} size={112} shock={0.5} gaze={1} nodAmp={2.4} nodSpeed={7} glasses={1} /></div>
    </AbsoluteFill>
  );
};
const StackBody: React.FC<{ lf: number }> = ({ lf }) => {
  const rise = over(lf, fr(0.5), fr(0.8), Easing.out(Easing.back(1.3)));
  const cards = [{ x: 176, idx: 2, r: -7 }, { x: 820, idx: 3, r: 7 }];
  const sweepY = 300 + ((lf * 5) % 340);
  const pin = over(lf, fr(1.2), fr(0.35), Easing.out(Easing.back(2)));
  return (
    <AbsoluteFill>
      {cards.map((c, i) => { const p = lf <= 0 ? 1 : Math.max(0.85, over(lf, 0, fr(0.3), Easing.out(Easing.cubic))); return (
        <div key={i} style={{ position: "absolute", left: c.x, top: 336 + Math.sin(lf / 15 + i) * 4, transform: `translate(-50%,0) rotate(${c.r * (1 - rise)}deg) translateY(${rise * 40}px) scale(${0.7 * p})`, opacity: p * (1 - rise * 0.5), zIndex: 1 }}>
          <HouseCard idx={c.idx} w={286} />
        </div>); })}
      <div style={{ position: "absolute", left: "50%", top: (236 - rise * 18) + Math.sin(lf / 17) * 3, transform: `translateX(-50%) scale(${0.86 + rise * 0.16})`, zIndex: 6 }}>
        <div style={{ position: "relative" }}>
          <HouseCard idx={1} w={384} worst reveal={lf <= 0 ? 1 : Math.max(0.9, over(lf, 0, fr(0.3)))} />
          {/* address pin drops onto the worst house */}
          {pin > 0.02 && <div style={{ position: "absolute", left: "50%", top: 40, transform: `translateX(-50%) scale(${pin}) translateY(${(1 - pin) * -30}px)`, fontSize: 46, filter: "drop-shadow(0 6px 8px rgba(0,0,0,0.4))" }}>📍</div>}
        </div>
      </div>
      {/* continuous scan line sweeping the houses */}
      <div style={{ position: "absolute", left: 120, right: 120, top: sweepY, height: 4, background: "linear-gradient(90deg, transparent, rgba(240,200,140,0.55), transparent)", boxShadow: "0 0 12px rgba(240,200,140,0.5)", zIndex: 5 }} />
      {/* risk-score chips under each house fill the lower band */}
      {[{ x: 176, s: "LOW", c: "#3F9E74" }, { x: 506, s: "HIGH RISK", c: RED }, { x: 820, s: "MED", c: AMBER }].map((r, i) => { const pp = over(lf, fr(1.4 + i * 0.2), fr(0.35), Easing.out(Easing.back(1.8))); if (pp <= 0.02) return null; return (
        <div key={i} style={{ position: "absolute", left: r.x, top: 626 + Math.sin(lf / 14 + i) * 3, transform: `translateX(-50%) scale(${pp})`, display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 999, background: "rgba(20,12,7,0.85)", border: `2px solid ${r.c}` }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: r.c, boxShadow: `0 0 8px ${r.c}` }} /><span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: r.c }}>{r.s}</span></div>); })}
      <div style={{ position: "absolute", left: 936, top: 690 + Math.sin(lf / 13) * 3, zIndex: 8 }}><Mascot lf={lf} size={106} shock={0.55} gaze={-1} nodAmp={2.4} nodSpeed={7} /></div>
    </AbsoluteFill>
  );
};
const AgentBody: React.FC<{ lf: number }> = ({ lf }) => {
  const brokers = ["Spokeo", "Radaris", "Whitepages", "BeenVerified", "Intelius"];
  const prog = over(lf, fr(0.4), fr(7.6)) * 5;
  const cleared = Math.min(10, Math.round(over(lf, fr(0.4), fr(7.6)) * 10.5));
  const ai = Math.max(0, Math.min(4, Math.floor(prog)));
  const body = "please permanently remove my personal information from your public records.";
  const typed = Math.max(0, Math.min(body.length, Math.floor((prog - ai) * body.length * 1.5)));
  return (
    <AbsoluteFill>
      <ChatWindow lf={lf} prompt="Write the removal request for every single site, friendly but firm" gatedFrom={28} h={540}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 9 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 19, color: "#B8AE9C" }}>Drafting &amp; sending takedowns{".".repeat(1 + (Math.floor(lf / 8) % 3))}</div>
          <div style={{ flex: 1 }} /><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 22, color: GREEN }}>{cleared}/10 sent</div>
        </div>
        {/* the removal LETTER being written live (addressed to the active site) */}
        <div style={{ borderRadius: 10, background: "#2C2519", border: "1px solid #473C2C", padding: "10px 13px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><span style={{ fontSize: 15 }}>✉️</span><span style={{ fontFamily: mono, fontWeight: 700, fontSize: 15, color: "#E0B88A" }}>To: {brokers[ai]} · Removal Request</span><div style={{ flex: 1 }} /><span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13, color: GREEN }}><span style={{ transform: `translateX(${(Math.sin(lf / 5) + 1) * 4}px)` }}>✈️</span>sending</span></div>
          <span style={{ fontFamily: mono, fontSize: 14, color: "#B7AB97", lineHeight: 1.35 }}>{body.slice(0, typed)}<span style={{ opacity: lf % 16 < 8 ? 1 : 0.2, color: "#E0975C" }}>▍</span></span>
        </div>
        <div style={{ height: 8, width: "100%", borderRadius: 4, background: "#241E17", overflow: "hidden", marginBottom: 10 }}><div style={{ height: "100%", width: `${(cleared / 10) * 100}%`, background: grad("#489C77", "#2F7856") }} /></div>
        {brokers.map((site, k) => { const st = prog - k; const sent = st > 1; const sending = st > 0 && st <= 1; return (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", marginBottom: 5, borderRadius: 9, background: "#241E17", opacity: st > -0.3 ? 1 : 0.5 }}>
            <span style={{ width: 14, height: 14, borderRadius: 4, background: sent ? GREEN : sending ? "#E0975C" : "#4A4237" }} />
            <span style={{ fontFamily: mono, fontSize: 15, color: sent ? "#9FC7B0" : "#D8C9B4", textDecoration: sent ? "line-through" : "none" }}>{site}</span><div style={{ flex: 1 }} />
            {sent
              ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#fff", padding: "3px 10px", borderRadius: 999, background: grad("#489C77", "#2F7856") }}>✓ SENT</span>
              : sending
                ? <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#E0975C" }}><span style={{ display: "inline-block", width: 12, height: 12, borderRadius: "50%", border: "2px solid #E0975C", borderTopColor: "transparent", transform: `rotate(${lf * 26}deg)` }} />sending</span>
                : <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 12, color: "#8A8172" }}>queued</span>}
          </div>); })}
      </ChatWindow>
      {/* paper planes flying off as each takedown fires */}
      {brokers.map((site, k) => { const fire = over(lf, fr(0.9 + k * 1.42), fr(0.7), Easing.out(Easing.cubic)); if (fire <= 0.02 || fire >= 0.98) return null; return (
        <div key={`pl${k}`} style={{ position: "absolute", left: 300 + fire * 620, top: 470 - fire * 180 + Math.sin(fire * 6) * 12, fontSize: 30, opacity: (1 - fire) * 1.4, transform: `rotate(${-18 + fire * 8}deg)`, zIndex: 9 }}>✈️</div>); })}
      <div style={{ position: "absolute", left: 84, top: 720, zIndex: 8, transform: `translateY(${Math.sin(lf / 14) * 3}px)` }}><Mascot lf={lf} size={112} cheer={0.5} gaze={1} nodAmp={2.2} nodSpeed={5} /></div>
    </AbsoluteFill>
  );
};
const RehookBody: React.FC<{ lf: number }> = ({ lf }) => {
  const cx = 506, cy = 424;
  const sites = [
    { name: "Spokeo", x: 196, y: 258, tPop: 0.5, tZap: 1.5 },
    { name: "Radaris", x: 812, y: 300, tPop: 1.6, tZap: 2.6 },
    { name: "Whitepages", x: 470, y: 604, tPop: 2.8, tZap: 3.8 },
  ];
  const sweepAng = (lf * 3.6) % 360;
  const caught = sites.filter((st) => lf >= fr(st.tZap + 0.2)).length;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  return (
    <AbsoluteFill>
      {/* radar rings around the agent */}
      {[110, 190, 268].map((r, i) => <div key={i} style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `2px solid rgba(63,158,116,${0.22 - i * 0.055})` }} />)}
      {/* rotating radar sweep */}
      <div style={{ position: "absolute", left: cx, top: cy - 2, width: 268, height: 4, transformOrigin: "0% 50%", transform: `rotate(${sweepAng}deg)`, background: `linear-gradient(90deg, rgba(63,158,116,0.7), transparent)`, boxShadow: `0 0 10px rgba(63,158,116,0.5)`, zIndex: 3 }} />
      {/* pulsing scan dot at the sweep tip */}
      <div style={{ position: "absolute", left: cx + Math.cos(rad(sweepAng)) * 268 - 5, top: cy + Math.sin(rad(sweepAng)) * 268 - 5, width: 10, height: 10, borderRadius: "50%", background: GREEN, boxShadow: `0 0 12px ${GREEN}`, zIndex: 3 }} />
      {/* the AGENT — detective mascot actively scanning in the center */}
      <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%,-50%) rotate(${Math.sin(lf / 14) * 4}deg)`, zIndex: 6 }}>
        <Mascot lf={lf} size={158} sherlock={1} gaze={Math.sin(lf / 9) * 5} nodAmp={2} nodSpeed={6} />
      </div>
      {/* re-listed sites pop up red, the agent BEAMS them, they flip to REMOVED and shrink away */}
      {sites.map((st, i) => {
        const pop = over(lf, fr(st.tPop), fr(0.32), Easing.out(Easing.back(1.9))); if (pop <= 0.02) return null;
        const zapping = lf >= fr(st.tZap) && lf < fr(st.tZap + 0.45);
        const removed = lf >= fr(st.tZap + 0.18);
        const shrink = removed ? Math.max(0.62, 1 - over(lf, fr(st.tZap + 0.7), fr(0.6)) * 0.38) : 1;
        const fade = removed ? Math.max(0.35, 1 - over(lf, fr(st.tZap + 1.4), fr(0.7)) * 0.65) : 1;
        const dx = st.x - cx, dy = st.y - cy; const len = Math.hypot(dx, dy); const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <React.Fragment key={i}>
            {zapping && <div style={{ position: "absolute", left: cx, top: cy - 3, width: len, height: 6, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, background: `linear-gradient(90deg, ${GREEN}, #EAFBF2)`, boxShadow: `0 6px 11px -4px ${GREEN}`, zIndex: 5 }} />}
            <div style={{ position: "absolute", left: st.x, top: st.y + Math.sin(lf / 13 + i) * 2, transform: `translate(-50%,-50%) scale(${pop * shrink})`, opacity: fade, zIndex: 6 }}>
              <div style={{ padding: "10px 15px", borderRadius: 12, background: "rgba(20,12,7,0.92)", border: `2.5px solid ${removed ? GREEN : RED}`, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: `0 8px 18px -6px rgba(0,0,0,0.6)` }}>
                <span style={{ fontSize: 15 }}>{removed ? "✅" : "⚠️"}</span>
                <span style={{ fontFamily: mono, fontWeight: 700, fontSize: 18, color: removed ? "#CFE6D8" : "#EFD9CF" }}>{st.name}</span>
                <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12, color: "#fff", padding: "2px 9px", borderRadius: 999, background: removed ? grad(GREEN, "#2E7C58") : grad("#C44A3A", "#992E22") }}>{removed ? "REMOVED" : "re-listed"}</span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
      {/* bottom counter */}
      <div style={{ position: "absolute", left: "50%", top: 706, transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", borderRadius: 999, background: grad(GREEN, "#2E7C58"), boxShadow: `0 10px 22px -8px rgba(30,90,60,0.5)`, zIndex: 7 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff" }}>{caught}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 21, color: "#EAFBF2" }}>crept back · caught & removed</span>
      </div>
    </AbsoluteFill>
  );
};
const Crash: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><CrashBody lf={lf} /></Panel>;
const Bank: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><BankBody lf={lf} /></Panel>;
const Ultra: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><UltraBody lf={lf} /><ScreenHead lf={lf} big="EVERY SITE" clay="SELLING YOUR NAME" /></Panel>;
const Stack: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><StackBody lf={lf} /><ScreenHead lf={lf} big="SORT THEM" clay="WORST FIRST" /></Panel>;
const Agent: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><AgentBody lf={lf} /><ScreenHead lf={lf} big="IT WRITES EVERY" clay="TAKEDOWN"  /></Panel>;
const Rehook: React.FC<{ lf: number }> = ({ lf }) => <Panel label=""><RehookBody lf={lf} /><ScreenHead lf={lf} big="RE-CHECKS YOU" clay="EVERY MONTH" /></Panel>;

const CTA: React.FC<{ lf: number }> = ({ lf }) => {
  const inP = over(lf, 0.06, fr(0.22), Easing.out(Easing.back(1.4)));
  const kw = "ERASE"; const typed = Math.floor(over(lf, fr(0.2), fr(0.5)) * kw.length);
  const arrowBob = Math.abs(Math.sin(lf / 5)) * 14; const kwPulse = 1 + Math.sin(lf / 3.4) * 0.05;
  return (
    <AbsoluteFill style={{ opacity: Math.min(1, inP * 1.3) }}>
      {/* LOOP CLOSURE: the hook's EXPOSED data now resolves to REMOVED */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 372, display: "flex", justifyContent: "center", gap: 14, alignItems: "center", transform: `scale(${inP})` }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#fff", padding: "6px 16px", borderRadius: 999, background: "rgba(196,74,58,0.9)", textDecoration: "line-through", opacity: 0.7 }}>EXPOSED</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30, color: SLATE }}>→</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 28, color: "#fff", padding: "7px 20px", borderRadius: 999, background: grad("#489C77", "#2F7856"), boxShadow: `0 7px 15px -5px rgba(63,158,116,0.5)`, transform: `scale(${1 + Math.sin(lf / 5) * 0.04})` }}>✓ REMOVED</span>
      </div>

      <div style={{ position: "absolute", left: 224, right: 224, top: 452, transform: `scale(${inP})`, transformOrigin: "50% 0%" }}>
        <div style={{ borderRadius: 22, background: WIN, boxShadow: "0 30px 60px -20px rgba(10,16,34,0.5)", overflow: "hidden", border: "1px solid #E2D8C6" }}>
          <div style={{ height: 84, background: grad("#E9825C", "#C7541F"), display: "flex", alignItems: "center", padding: "0 26px", gap: 12 }}><ClaudeLogo lf={lf} size={34} /><div><div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20, color: "rgba(255,255,255,0.85)" }}>THE ERASE GUIDE</div><div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27, color: "#fff" }}>the 5 takedown prompts</div></div></div>
          <div style={{ padding: "18px 28px", display: "flex", flexDirection: "column", gap: 11 }}>{["The 5 word-for-word prompts", "The re-list site list + templates", "The prompt for sites that ignore you"].map((t, i) => { const rp = over(lf, fr(0.55 + i * 0.28), fr(0.3), Easing.out(Easing.back(1.6))); const ck = over(lf, fr(0.72 + i * 0.28), fr(0.28), Easing.out(Easing.back(2.4))); return <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 24, color: INK, transform: `translateX(${(1 - rp) * -18}px)`, opacity: rp }}><span style={{ width: 28, height: 28, borderRadius: 8, background: ck > 0.1 ? GREEN : "#D8CFC0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, transform: `scale(${Math.max(ck, 0.3)})` }}>✓</span>{t}</div>; })}</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 850, textAlign: "center", transform: `scale(${inP})` }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 999, background: "#1A2233", border: `2px solid ${GOLD}`, fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#F6E4A0", transform: `scale(${1 + Math.sin(lf / 6) * 0.03})` }}>🔖 save this video</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 999, background: grad("#E9825C", "#C7541F"), fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 25, color: "#fff" }}>💬 comment ERASE</span>
        </div>
        <div style={{ position: "relative", display: "inline-block", fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 96, color: CLAY, letterSpacing: "-0.02em", lineHeight: 1, textShadow: `0 8px 22px -8px rgba(150,60,30,0.5)`, transform: `scale(${kwPulse})` }}>ERASE<div style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen" }}><div style={{ position: "absolute", top: 0, bottom: 0, left: `${((lf * 6) % 220) - 60}%`, width: "40%", background: "linear-gradient(100deg, transparent, rgba(255,230,190,0.5), transparent)" }} /></div></div>
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
    <div style={{ position: "absolute", left: 0, right: 0, top: 1392, height: 130, opacity: inP, zIndex: 95, transform: `translateY(${(1 - inP) * 20}px)` }}>
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
  { s: 0.0, e: 6.98, k: '' },
  { s: 6.98, e: 14.76, k: '1' },
  { s: 14.76, e: 18.18, k: '2' },
  { s: 18.18, e: 27.66, k: '3' },
  { s: 27.66, e: 38.6, k: '' },
];
const ChapterBar: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const fade = interpolate(t, [0.4, 1.2, 37.4, 38.4], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  if (fade < 0.01) return null;
  const nearEnd = interpolate(t, [27.66, 38.0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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
  const VIRT = 33.8;
  const p = Math.min(1, t / VIRT);
  const marks = [11.14, 22.02, 32.84];
  const STARS = [4.1, 16.0, 27.0, 43.0];
  const TOTAL = VIRT;
  const PELLETS = [3, 8, 14, 19, 25, 30, 36, 42];
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
        const wake = interpolate(t, [43.0, 47.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
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
          <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -6 - cs, transform: `translateX(-50%) scale(${1 + cpop})`, zIndex: 127, filter: `drop-shadow(0 0 8px ${GOLD}99)` }}>
            <Mascot lf={f} size={cs} nodAmp={3} nodSpeed={6} cheer={0.35} gaze={2} {...cc} />
          </div>
        );
      })()}
      {(() => { const slamShock = t >= 2.35 && t < 3.4 ? Math.min(1, (t - 2.35) / 0.25) * 0.9 : 0; const cheerV = Math.max(t >= CLOCK_START ? 1 : 0, incPop * 0.75); return (
        <div style={{ position: "absolute", left: `${Math.min(p, 0.9) * 100}%`, top: -10, transform: "translateX(-50%)", zIndex: 126 }}>
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
    const lastw = w.word.trim().toLowerCase().replace(/[^a-z']/g, "");
    const dangling = ["i", "a", "the", "to", "of", "and", "is", "it", "an", "you"].includes(lastw);
    if ((cur.length >= 3 || gap > 0.34 || endsSent) && !(dangling && !endsSent && next)) { out.push({ words: cur, start: cur[0].start, end: w.end }); cur = []; }
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
          <span key={i} style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, lineHeight: 1.12, letterSpacing: "-0.01em", color: on ? (active ? "#B8501F" : CLAY) : "rgba(120,56,26,0.5)", transform: active ? "translateY(-3px) scale(1.04)" : "none", display: "inline-block", textShadow: "0 2px 12px rgba(255,251,244,0.9), 0 1px 2px rgba(120,56,26,0.35)" }}>{w.word.trim()}</span>); })}
      </div>
    </div>
  );
};

const HeroHeader: React.FC<{ f: number }> = ({ f }) => {
  const settle = over(f, 0, fr(0.45), Easing.out(Easing.cubic));  // solid at f0, only settles into place
  const out = 1 - over(f, fr(L[1] - 0.35), fr(0.35));   // hold through the hook, clear just before scene 1
  const op = out;
  const inP = settle;
  if (op <= 0.02) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", justifyContent: "center", zIndex: 200, opacity: op, transform: `translateY(${(1 - inP) * -14}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 30px", borderRadius: 999, background: "#FFFFFF", border: "3px solid #E7E2D6", boxShadow: "0 18px 44px -12px rgba(20,26,45,0.4)", maxWidth: 940 }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, letterSpacing: -0.5, color: INK, textAlign: "center" }}><span style={{ color: CLAY }}>Fable 5</span> erased my digital identity 😅</span>
      </div>
    </div>
  );
};

export const ClaudeEraseReel: React.FC = () => {
  const frame = useCurrentFrame();
  let punch = 0;
  for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 9) punch = Math.max(punch, Math.pow(1 - d / 9, 2)); }
  const KICKS = [0.8, 0.86, L[1] + 2.2, L[1] + 3.5, L[2] + 0.4, L[2] + 6.0, L[3] + 0.4, L[3] + 6.4, L[4] + 1.6, L[5] + 1.4, CLOCK_START + 1, CLOCK_START + 2, CLOCK_START + 3];
  for (const k of KICKS) { const d = frame - fr(k); if (d >= 0 && d < 7) punch = Math.max(punch, Math.pow(1 - d / 7, 2) * 0.7); }
  const zoom = interpolate(frame, [0, 16, 28], [1.0, 1.02, 1.0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }) + punch * 0.028;
  const scene = (i: number) => frame >= Lf[i] && (i === Lf.length - 1 || frame < Lf[i + 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: CREAM, fontFamily: inter.fontFamily }}>
      <Audio src={staticFile("erase_vo.wav")} />
      {/* NEW viral music bed (extracted from the DYM77 SFX reel), ducked under VO */}
      <Audio loop src={staticFile("erase_bed.wav")} volume={(ff) => interpolate(ff, [0, fr(0.5), fr(CUT) - 20, fr(CUT), 99999], [0.17, 0.17, 0.17, 0.06, 0.06], { extrapolateRight: "clamp" })} />
      {/* ==== SFX CHEAT-SHEET (from @seankuksinovich): whoosh=zoom-in | pop+click=pop-up | riser=suspense | camera-shutter=transition | magic-reveal=reveal ==== */}
      {/* SCENE 0 HOOK — attention-grab OPEN: deep whoosh-in + boom impact as the exposed data lands, then a building riser */}
      <Sfx at={0} src="lib_deep_whoosh.wav" v={0.72} dur={0.9} />
      <Sfx at={0.16} src="lib_boom.wav" v={0.52} dur={0.9} />
      <Sfx at={0.14} src="lib_whoosh.wav" v={0.4} dur={0.7} />
      <Sfx at={0.35} src="lib_riser.wav" v={0.34} dur={2.4} />
      {[0.55, 0.9, 1.25].map((d, i) => <React.Fragment key={`ex${i}`}><Sfx at={d} src="lib_pop.wav" v={0.42} dur={0.3} /><Sfx at={d + 0.02} src="lib_click.wav" v={0.3} dur={0.2} /></React.Fragment>)}
      {/* TRANSITIONS — riser building into every cut + CAMERA-SHUTTER on the cut */}
      {[L[1], L[2], L[3], L[4], L[5], L[6]].map((tt, i) => <React.Fragment key={`tr${i}`}><Sfx at={tt - 1.5} src="lib_riser.wav" v={0.5} dur={1.5} /><Sfx at={tt} src="lib_camera_shutter.wav" v={0.5} dur={0.5} /><Sfx at={tt + 0.02} src="lib_whoosh.wav" v={0.3} dur={0.6} /></React.Fragment>)}
      {/* the HOOK -> proof transition gets a BIG deep whoosh to grab attention */}
      <Sfx at={L[1] - 0.4} src="lib_deep_whoosh.wav" v={0.7} dur={0.85} />
      <Sfx at={L[1] + 0.04} src="lib_whoosh_fast.wav" v={0.45} dur={0.5} />
      {/* SCENE 1 PROOF — age/address/relatives flags SNAP (pop+click) + count ding */}
      {[1.4, 2.3, 3.2].map((d, i) => <React.Fragment key={`pf${i}`}><Sfx at={L[1] + d} src="lib_pop.wav" v={0.4} /><Sfx at={L[1] + d + 0.02} src="lib_click.wav" v={0.28} /><Sfx at={L[1] + d + 0.05} src="ding.wav" v={0.24} /></React.Fragment>)}
      {/* SCENE 2 CHAT SCAN — window pop, EXPOSED rows pop+click, MAGIC-REVEAL on the "3 sites" count */}
      <Sfx at={L[2] + 0.15} src="lib_pop.wav" v={0.44} />
      {[0.5, 1.0, 1.5].map((d, i) => <React.Fragment key={`sr${i}`}><Sfx at={L[2] + d} src="lib_pop.wav" v={0.36} /><Sfx at={L[2] + d + 0.02} src="lib_click.wav" v={0.3} /></React.Fragment>)}
      <Sfx at={L[2] + 3.5} src="lib_magic_reveal.wav" v={0.42} dur={1.1} /><Sfx at={L[2] + 3.55} src="ding.wav" v={0.32} />
      {/* SCENE 3 HOUSES — whoosh in, pop per house, MAGIC-REVEAL + hit as "your house" rises */}
      {[0.05, 0.2].map((d, i) => <Sfx key={`hw${i}`} at={L[3] + d} src="lib_whoosh.wav" v={0.34} dur={0.5} />)}
      {[0.1, 0.25].map((d, i) => <Sfx key={`hp${i}`} at={L[3] + d} src="lib_pop.wav" v={0.34} />)}
      <Sfx at={L[3] + 0.55} src="lib_magic_reveal.wav" v={0.4} dur={1.0} /><Sfx at={L[3] + 0.6} src="lib_cinematic_hit.wav" v={0.36} />
      {/* SCENE 4 CHAT TAKEDOWNS — window pop, MAGIC-REVEAL on each REMOVAL DRAFTED stamp */}
      <Sfx at={L[4] + 0.15} src="lib_pop.wav" v={0.44} />
      {[0.6, 1.5, 2.4].map((d, i) => <React.Fragment key={`rm${i}`}><Sfx at={L[4] + d} src="lib_pop.wav" v={0.3} /><Sfx at={L[4] + d + 0.4} src="lib_magic_reveal.wav" v={0.34} dur={0.7} /><Sfx at={L[4] + d + 0.42} src="ding.wav" v={0.3} /></React.Fragment>)}
      {/* SCENE 5 MONTHLY — pop + MAGIC-REVEAL */}
      <Sfx at={L[5] + 1.4} src="lib_pop.wav" v={0.38} /><Sfx at={L[5] + 1.6} src="lib_magic_reveal.wav" v={0.34} dur={0.9} />
      {/* SCENE 6 CTA — camera-shutter already on the flip + MAGIC-REVEAL endcard */}
      <Sfx at={L[6] + 0.1} src="lib_magic_reveal.wav" v={0.46} dur={1.1} /><Sfx at={L[6] + 0.5} src="lib_pop.wav" v={0.3} /><Sfx at={L[6] + 0.55} src="sparkle.wav" v={0.26} dur={0.7} />
      {/* ==== typing + engagement SFX (Alex: more typing sounds etc.) ==== */}
      {/* SCAN: prompt types + digital scanning hum */}
      <Sfx at={L[2] + 0.1} src="lib_typing.wav" v={0.32} dur={1.9} />
      <Sfx at={L[2] + 0.2} src="digital-loading.wav" v={0.2} dur={2.2} />
      {[0.6, 1.1, 1.6, 2.1, 2.6].map((d, i) => <Sfx key={`sf${i}`} at={L[2] + d} src="lib_pop2.wav" v={0.34} dur={0.2} />)}
      {/* TAKEDOWN: continuous letter typing + a SEND whoosh+notif per site */}
      <Sfx at={L[4] + 0.2} src="lib_mactype.wav" v={0.34} dur={6.4} />
      {[0.9, 2.3, 3.7, 5.1, 6.5].map((d, i) => <React.Fragment key={`snd${i}`}><Sfx at={L[4] + d} src="lib_whoosh_fast.wav" v={0.4} dur={0.4} /><Sfx at={L[4] + d + 0.12} src="lib_notif.wav" v={0.34} dur={0.5} /></React.Fragment>)}
      {/* MONTHLY: radar sweep beeps + a zap/confirm on each catch */}
      {[1.5, 2.6, 3.8].map((d, i) => <React.Fragment key={`zap${i}`}><Sfx at={L[5] + d - 0.05} src="lib_whoosh_fast.wav" v={0.32} dur={0.3} /><Sfx at={L[5] + d + 0.1} src="lib_correct.wav" v={0.32} dur={0.5} /></React.Fragment>)}
      {/* CTA: checks tick in + celebration */}
      {[0.72, 1.0, 1.28].map((d, i) => <Sfx key={`ck${i}`} at={L[6] + d} src="ding.wav" v={0.34} dur={0.4} />)}
      <Sfx at={L[6] + 0.35} src="lib_correct.wav" v={0.4} dur={0.6} /><Sfx at={L[6] + 0.4} src="sparkle.wav" v={0.34} dur={0.9} />
      <Sfx at={L[6] + 1.7} src="crowd_cheer.wav" v={0.22} dur={1.6} />
      {/* progress pellets */}
      {[3, 7, 12, 17, 22, 28, 34].map((tt, i) => <Sfx key={`pt${i}`} at={tt} src="tick.wav" v={0.07} dur={0.2} />)}

      <Bg />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 46%" }}>
        {scene(0) ? <Crash lf={frame - Lf[0]} /> : null}
        {scene(1) ? <Bank lf={frame - Lf[1]} /> : null}
        {scene(2) ? <Ultra lf={frame - Lf[2]} /> : null}
        {scene(3) ? <Stack lf={frame - Lf[3]} /> : null}
        {scene(4) ? <Agent lf={frame - Lf[4]} /> : null}
        {scene(5) ? <Rehook lf={frame - Lf[5]} /> : null}
        {scene(6) ? <ClockCTA lf={frame - Lf[6]} /> : null}
        <Captions />
      </AbsoluteFill>
      {scene(0) ? <CrashEscapees lf={frame - Lf[0]} /> : null}
      
      <HeroHeader f={frame} />
      <ProgressBar />
      {(() => { let fl = 0; for (const b of Lf.slice(1)) { const d = frame - b; if (d >= 0 && d < 7) fl = Math.max(fl, Math.pow(1 - d / 7, 2)); } return fl > 0 ? <AbsoluteFill style={{ background: "#FFF6E6", opacity: fl * 0.5, zIndex: 200, pointerEvents: "none" }} /> : null; })()}
    </AbsoluteFill>
  );
};
