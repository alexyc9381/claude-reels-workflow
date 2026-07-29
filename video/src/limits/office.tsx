import React from "react";
import { seed, mono } from "./chassis";

/* =============================================================================
   REEL 78 "LIMITS" — THE CLAUDON FLOOR (shared world)
   -----------------------------------------------------------------------------
   A Severance knockoff. Every scene is a different room on the same severed
   floor, so the palette and the props are defined ONCE here and scenes change
   the STAGING only.

   ⛔ THE LIGHT RULE. One source: overhead fluorescent, flat and DIRECTIONLESS.
      Shadows fall straight down and stay soft. The missing key direction is the
      whole reason the room feels wrong — never add a side key to "improve" it.
   ⛔ THE GRADE. Eggshell walls, cold mint carpet, beige plastic. Clay
      (#D97757, the mascot) is the ONLY warm thing on the floor, which is what
      makes the refiners read instantly against any of it.
   ============================================================================= */
export const O = {
  wallHi: "#F2F1EA", wallLo: "#DFDED3",
  carpetHi: "#7A9A8E", carpetLo: "#4E6B62", carpetSeam: "#3F5A52",
  cabHi: "#D6D3C4", cabMid: "#BFBCAC", cabLo: "#9A9788",
  screen: "#12332C", screenTxt: "#6FE0A8",
  plastic: "#DAD6C6", plasticSh: "#B9B5A4",
  ink: "#23271F", dim: "#7C8079",
  paper: "#FBFBF6", red: "#E4574A", steel: "#3A3E37",
};

export const OfficeDefs: React.FC<{ p: string }> = ({ p }) => (
  <>
    <linearGradient id={`${p}wall`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={O.wallHi} /><stop offset="1" stopColor={O.wallLo} /></linearGradient>
    <linearGradient id={`${p}carpet`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={O.carpetHi} /><stop offset="1" stopColor={O.carpetLo} /></linearGradient>
    <linearGradient id={`${p}cab`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={O.cabHi} /><stop offset="1" stopColor={O.cabMid} /></linearGradient>
    <linearGradient id={`${p}tube`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFFFFF" stopOpacity=".30" />
      <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" /></linearGradient>
  </>
);

/* ---- drop ceiling with fluorescent troughs, receding ---- */
export const Ceiling: React.FC<{ p: string; h?: number; lit?: number }> =
({ p, h = 196, lit = 1 }) => (
  <g>
    <rect width={1012} height={h} fill="#E8E7DE" />
    {[0, 1, 2, 3].map((i) => {
      const t = i / 4, y = 8 + t * (h - 46), hh = 26 - t * 12, inset = t * 300;
      return (
        <g key={i}>
          <rect x={inset} y={y} width={1012 - inset * 2} height={hh} rx={3} fill="#FBFBF6" opacity={0.95} />
          <rect x={inset + 24} y={y + 4} width={1012 - inset * 2 - 48} height={hh - 8} rx={2}
                fill="#FFFFFF" opacity={lit} />
        </g>); })}
    <g stroke="#CFCEC4" strokeWidth={2} opacity={0.9}>
      <path d={`M0 0 L336 ${h}M1012 0 L676 ${h}M0 ${h * 0.31} L1012 ${h * 0.31}M0 ${h * 0.61} L1012 ${h * 0.61}`} /></g>
    <rect y={h - 56} width={1012} height={300} fill={`url(#${p}tube)`} opacity={lit} />
  </g>
);

/* ---- mint carpet with one-point seams ---- */
export const Carpet: React.FC<{ p: string; y: number; vx?: number }> = ({ p, y, vx = 506 }) => (
  <g>
    <rect y={y} width={1012} height={792 - y} fill={`url(#${p}carpet)`} />
    <g stroke={O.carpetSeam} strokeWidth={2} opacity={0.55}>
      {[-2, -1, 0, 1, 2].map((i) => (
        <path key={i} d={`M${vx + i * 40} ${y} L${vx + i * 420} 792`} />))}
      <path d={`M0 ${y + 96}h1012M0 ${y + 190}h1012M0 ${y + 290}h1012`} />
    </g>
  </g>
);

/* ---- the cabinet wall. `out` (0..1) pulls every drawer toward camera. ---- */
export const CabinetWall: React.FC<{ p: string; top: number; bottom: number; cols?: number;
  rows?: number; out?: number; wave?: number; pulse?: number }> =
({ p, top, bottom, cols = 13, rows = 3, out = 0, wave = -1, pulse = 0 }) => {
  const rh = (bottom - top) / rows;
  return (
    <g>
      <rect y={top} width={1012} height={bottom - top + 6} fill={`url(#${p}cab)`} />
      {Array.from({ length: cols }, (_, c) => (
        <rect key={c} x={c * (1012 / cols) + 74} y={top} width={4} height={bottom - top}
              fill={O.cabLo} opacity={0.7} />))}
      {Array.from({ length: cols }, (_, c) =>
        Array.from({ length: rows }, (_, r) => {
          const sd = seed(c * 3 + r + 7);
          /* a travelling wave opens the wall left-to-right when `wave` is set */
          const local = wave < 0 ? out
            : Math.max(0, 1 - Math.abs(wave * cols - c) / 2.4) * 0.9;
          /* ⛔ the perpetual wave: two rolling crests travelling the wall at all
             times, so the frame is never static between beats and the idea
             ("it re-reads everything, constantly") is always on screen. */
          const per = pulse
            ? Math.max(
                Math.max(0, 1 - Math.abs(((pulse * 1.6) % 1) * cols - c) / 2.0),
                Math.max(0, 1 - Math.abs(((pulse * 1.6 + 0.5) % 1) * cols - c) / 2.0)
              ) * (0.55 + 0.45 * Math.sin(pulse * 3 + r))
            : 0;
          const o = Math.max(local, per) * (16 + sd * 26);
          return (
            <g key={`${c}-${r}`} transform={`translate(${c * (1012 / cols) + 8},${top + 14 + r * rh})`}>
              <rect x={0} y={0} width={62} height={rh - 8} rx={3} fill={O.cabHi} />
              <rect x={0} y={0} width={62} height={rh - 8} rx={3} fill="none" stroke={O.cabLo} strokeWidth={2} />
              <g transform={`translate(0,${o * 0.34}) scale(${1 + o * 0.006})`}>
                <rect x={2} y={2} width={58} height={rh - 12} rx={3} fill={O.cabMid} />
                <rect x={18} y={rh / 2 - 6} width={24} height={6} rx={3} fill={O.cabLo} />
                {o > 3 && Array.from({ length: 3 }, (_, k) => (
                  <rect key={k} x={8 + k * 16} y={-6 - o * 0.5} width={12} height={10 + o * 0.5}
                        rx={2} fill={O.paper} opacity={0.9} />))}
              </g>
            </g>); })).flat()}
      <rect y={bottom - 8} width={1012} height={14} fill={O.cabLo} />
    </g>);
};

/* ---- loose paper thrown clear of the wall ---- */
export const PaperBurst: React.FC<{ t: number; n?: number; y0?: number }> =
({ t, n = 40, y0 = 350 }) => (
  <>
    {t > 0.02 && Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 61);
      const d = (1 - t) * (140 + sd * 280);
      const x = 40 + sd * 940, y = y0 + seed(i * 2.3) * 120 + d;
      return (
        <rect key={i} x={x} y={y} width={24 + sd * 18} height={30 + sd * 16} rx={2}
              fill={O.paper} opacity={t * 0.95}
              transform={`rotate(${(sd - 0.5) * 160} ${x} ${y})`} />); })}
  </>
);

/* ---- a chunky CRT terminal ---- */
export const CRT: React.FC<{ x: number; y: number; s?: number; n?: number; busy?: number }> =
({ x, y, s = 1, n = 0, busy = 0 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-56} y={-98} width={112} height={98} rx={10} fill={O.plastic} />
    <rect x={-56} y={-98} width={112} height={98} rx={10} fill="none" stroke={O.plasticSh} strokeWidth={3} />
    <rect x={-44} y={-86} width={88} height={68} rx={7} fill={O.screen} />
    <g fill={O.screenTxt} opacity={0.9}>
      {[0, 1, 2, 3].map((r) => (
        <rect key={r} x={-36} y={-78 + r * 14} rx={2} height={5}
              width={(26 + seed(n * 4 + r) * 40) * (busy ? 0.5 + seed(n + r + Math.floor(busy)) * 0.5 : 1)}
              opacity={0.55 + seed(r + n) * 0.45} />))}
    </g>
    <rect x={-44} y={-86} width={88} height={30} rx={7} fill="#FFFFFF" opacity={0.06} />
    <rect x={-30} y={-8} width={60} height={7} rx={3} fill={O.plasticSh} />
  </g>
);

/* ---- the split-flap USAGE counter. `v` is 0..1, shown as a percentage. ---- */
export const UsageBoard: React.FC<{ x: number; y: number; s?: number; v: number; label?: string }> =
({ x, y, s = 1, v, label = "USAGE" }) => {
  const pct = Math.round(v * 100);
  /* at 100 the third slot carries a digit, not the "%" — otherwise the board
     reads "10%" and undersells the exact moment the reel opens on. */
  const full = pct >= 100;
  const digits = (full ? "100" : String(pct).padStart(2, " ")).split("");
  const hot = v > 0.75;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-128} y={-46} width={256} height={92} rx={9} fill={O.steel} />
      <rect x={-128} y={-46} width={256} height={92} rx={9} fill="none" stroke="#22261F" strokeWidth={4} />
      <text x={-112} y={-22} fontFamily={mono} fontSize={13} fontWeight={700}
            letterSpacing={3} fill="#9AA095">{label}</text>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${-72 + i * 52},14)`}>
          <rect x={-22} y={-24} width={44} height={48} rx={4} fill="#151813" />
          <rect x={-22} y={-1} width={44} height={2} fill={O.steel} />
          <text x={0} y={11} textAnchor="middle" fontFamily={mono} fontSize={30} fontWeight={700}
                fill={hot ? O.red : "#E8E7DE"}>
            {full ? digits[i] : i < 2 ? (digits[i] || "").trim() : "%"}</text>
        </g>))}
      {full && (
        <text x={106} y={24} textAnchor="middle" fontFamily={mono} fontSize={20}
              fontWeight={700} fill={O.red}>%</text>)}
      <circle cx={106} cy={-26} r={9} fill={hot ? O.red : "#4E6B62"} />
    </g>);
};

/* ---- the CLAUDON department plate ---- */
export const DeptPlate: React.FC<{ x: number; y: number; s?: number; dept: string }> =
({ x, y, s = 1, dept }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <g transform="translate(-286,0)">
      <circle cx={0} cy={0} r={23} fill="none" stroke={O.ink} strokeWidth={5} />
      <path d="M-11 6 L0 -12 L11 6 Z" fill={O.ink} />
    </g>
    <text x={-244} y={9} fontFamily={mono} fontSize={27} fontWeight={700}
          letterSpacing={7} fill={O.ink}>CLAUDON</text>
    <text x={-244} y={38} fontFamily={mono} fontSize={15} fontWeight={700}
          letterSpacing={4} fill={O.dim}>{dept}</text>
  </g>
);

/* ---- a wall-mounted wellness-poster style placard (Severance signage gag) ---- */
export const Poster: React.FC<{ x: number; y: number; s?: number; line1: string; line2?: string }> =
({ x, y, s = 1, line1, line2 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-84} y={-58} width={168} height={116} rx={5} fill={O.paper} />
    <rect x={-84} y={-58} width={168} height={116} rx={5} fill="none" stroke={O.cabLo} strokeWidth={3} />
    <circle cx={0} cy={-22} r={20} fill="none" stroke={O.carpetLo} strokeWidth={4} />
    <path d="M-9 -16 L0 -32 L9 -16 Z" fill={O.carpetLo} />
    <text x={0} y={22} textAnchor="middle" fontFamily={mono} fontSize={13}
          fontWeight={700} letterSpacing={2} fill={O.ink}>{line1}</text>
    {line2 && (
      <text x={0} y={42} textAnchor="middle" fontFamily={mono} fontSize={11}
            letterSpacing={1} fill={O.dim}>{line2}</text>)}
  </g>
);


/* ---- paper permanently in the air. Large, opaque, continuous. ---- */
export const PaperFall: React.FC<{ t: number; n?: number; top?: number; bottom?: number }> =
({ t, n = 14, top = 300, bottom = 700 }) => (
  <g opacity={0.9}>
    {Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 131);
      const span = bottom - top;
      const y = top + ((t * (26 + sd * 34) + sd * span) % span);
      const x = 30 + sd * 950 + Math.sin(t / 14 + i) * 26;
      const w = 22 + sd * 16;
      return (
        <rect key={i} x={x} y={y} width={w} height={w * 1.3} rx={2} fill={O.paper}
              opacity={0.55 + sd * 0.4}
              transform={`rotate(${(t * (0.6 + sd) + i * 40) % 360} ${x + w / 2} ${y + w * 0.65})`} />); })}
  </g>
);

/* ---- the pneumatic tube run. Capsules shoot across the ceiling constantly —
       the biggest continuous travelling mover available in an office. ---- */
export const TubeRun: React.FC<{ t: number; y?: number; n?: number; speed?: number }> =
({ t, y = 232, n = 3, speed = 13 }) => (
  <g>
    <rect x={0} y={y} width={1012} height={28} rx={14} fill="#CFCCC0" />
    <rect x={0} y={y + 3} width={1012} height={9} rx={5} fill="#E6E3D8" />
    <g fill={O.cabLo} opacity={0.7}>
      {[120, 340, 560, 780].map((x) => <rect key={x} x={x} y={y - 6} width={14} height={40} rx={4} />)}
    </g>
    {Array.from({ length: n }, (_, i) => {
      const sd = seed(i + 211);
      const x = ((t * speed * (0.7 + sd * 0.6) + i * 420) % 1240) - 120;
      return (
        <g key={i} transform={`translate(${x},${y + 14})`}>
          <rect x={-26} y={-9} width={52} height={18} rx={9} fill="#B8763F" />
          <rect x={-26} y={-9} width={52} height={6} rx={3} fill="#D89A5C" />
          <rect x={-6} y={-9} width={5} height={18} fill="#8A5324" />
        </g>); })}
  </g>
);

/* ---- a file trolley, pushed along the back of the room ---- */
export const FileCart: React.FC<{ x: number; y: number; s?: number; wob?: number }> =
({ x, y, s = 1, wob = 0 }) => (
  <g transform={`translate(${x},${y + Math.sin(wob) * 2}) scale(${s})`}>
    <rect x={-52} y={-64} width={104} height={64} rx={4} fill={O.plastic} />
    <g fill={O.paper}>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={-42 + i * 30} y={-84} width={24} height={26} rx={2}
              transform={`rotate(${(i - 1) * 5} ${-30 + i * 30} -70)`} />))}
    </g>
    <rect x={-52} y={0} width={104} height={9} rx={4} fill={O.plasticSh} />
    <circle cx={-34} cy={16} r={9} fill={O.steel} />
    <circle cx={34} cy={16} r={9} fill={O.steel} />
  </g>
);

/* ---- an analogue wall clock. Second hand sweeps continuously. ---- */
export const WallClock: React.FC<{ x: number; y: number; s?: number; t: number }> =
({ x, y, s = 1, t }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <circle cx={0} cy={0} r={30} fill={O.paper} stroke={O.cabLo} strokeWidth={4} />
    <g stroke={O.ink} strokeWidth={3} strokeLinecap="round">
      <path d="M0 0 L0 -17" transform={`rotate(${(t / 24) % 360})`} />
      <path d="M0 0 L13 6" transform={`rotate(${(t / 3) % 360})`} />
    </g>
    <path d="M0 4 L0 -22" stroke={O.red} strokeWidth={2}
          transform={`rotate(${(t * 6) % 360})`} />
    <circle cx={0} cy={0} r={4} fill={O.ink} />
  </g>
);

/* ---- a water cooler with a rising bubble ---- */
export const Cooler: React.FC<{ x: number; y: number; s?: number; t: number }> =
({ x, y, s = 1, t }) => {
  const b = (t % 60) / 60;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-26} y={0} width={52} height={78} rx={5} fill={O.plastic} />
      <rect x={-22} y={-64} width={44} height={64} rx={9} fill="#BBD8D0" opacity={0.85} />
      <circle cx={0} cy={-8 - b * 46} r={4 + b * 3} fill="#FFFFFF" opacity={0.8 * (1 - b)} />
      <rect x={-26} y={78} width={52} height={9} rx={4} fill={O.plasticSh} />
    </g>);
};

/* ---- floor lane markings, receding ---- */
export const FloorMark: React.FC<{ y: number; vx?: number }> = ({ y, vx = 506 }) => (
  <g opacity={0.35}>
    {[-1, 1].map((sgn) => (
      <path key={sgn} d={`M${vx + sgn * 92} ${y + 14} L${vx + sgn * 470} 792`}
            stroke="#D9E4DE" strokeWidth={7} strokeDasharray="26 20" />))}
  </g>
);

/* ---- a wall directory board ---- */
export const Directory: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-72} y={-52} width={144} height={104} rx={4} fill={O.steel} />
    <rect x={-64} y={-44} width={128} height={88} rx={3} fill="#1B211C" />
    <g fill="#8FE3B4" opacity={0.8}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={-54} y={-32 + i * 20} width={92 - i * 14} height={6} rx={3} />))}
    </g>
  </g>
);

/* =============================================================================
   ⛔ THE LITERAL LAYER (Alex 2026-07-28: "when each thing is mentioned, something
   should appear on screen to show and represent it — right now it's too abstract").

   The metaphor carries the WHY; these carry the WHAT. Every scene now has a real
   Claude Code session visible in the room at all times, and the exact command the
   VO names types itself onto a big board at the moment it is spoken.
   ============================================================================= */

/* ---- a real Claude Code terminal, drawn at any size and still legible ---- */
export const TermScreen: React.FC<{
  x: number; y: number; w?: number; h?: number; s?: number;
  cmd?: string; note?: string; lines?: number[]; meter?: number; t?: number;
  typed?: number; ok?: string }> =
({ x, y, w = 300, h = 190, s = 1, cmd = "", note = "", lines = [0.9, 0.72, 0.84],
   meter = -1, t = 0, typed = 1, ok = "" }) => {
  const L = -w / 2 + 16, T = -h / 2 + 14;
  const shown = cmd.slice(0, Math.max(0, Math.round(cmd.length * typed)));
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {/* beige housing */}
      <rect x={-w / 2 - 14} y={-h / 2 - 14} width={w + 28} height={h + 42} rx={10} fill={O.plastic} />
      <rect x={-w / 2 - 14} y={-h / 2 - 14} width={w + 28} height={h + 42} rx={10}
            fill="none" stroke={O.plasticSh} strokeWidth={3} />
      {/* the screen: light mode, so it reads as Claude Code and not a green CRT */}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={5} fill="#FAF9F5" />
      <rect x={-w / 2} y={-h / 2} width={w} height={22} rx={5} fill="#F0EDE4" />
      <circle cx={L + 2} cy={T - 3} r={4} fill="#E06C60" />
      <circle cx={L + 15} cy={T - 3} r={4} fill="#E0A85C" />
      <circle cx={L + 28} cy={T - 3} r={4} fill="#6FBE8C" />
      <text x={L + 44} y={T + 2} fontFamily={mono} fontSize={11} fill="#8A8578">claude</text>
      {/* the prompt + the command being spoken */}
      <text x={L} y={T + 34} fontFamily={mono} fontSize={16} fill="#C85A2E">&gt;</text>
      <text x={L + 18} y={T + 34} fontFamily={mono} fontSize={16} fill="#1F1D1A">{shown}</text>
      {typed < 1 && t % 12 < 7 && (
        <rect x={L + 20 + shown.length * 9.2} y={T + 22} width={3} height={16} fill="#C85A2E" />)}
      {note && <text x={L} y={T + 58} fontFamily={mono} fontSize={13} fill="#8A8578">{note}</text>}
      {lines.map((wf, i) => (
        <rect key={i} x={L} y={T + 72 + i * 17} width={(w - 34) * wf} height={7} rx={3} fill="#DBD6C9" />))}
      {ok && <text x={L} y={T + 78 + lines.length * 17} fontFamily={mono} fontSize={13} fill="#3F8F63">{ok}</text>}
      {meter >= 0 && (
        <g transform={`translate(0,${h / 2 - 26})`}>
          <text x={L} y={-8} fontFamily={mono} fontSize={11} fill="#8A8578">context</text>
          <rect x={L} y={0} width={w - 34} height={11} rx={6} fill="#F0EDE4" />
          <rect x={L} y={0} width={(w - 34) * meter} height={11} rx={6}
                fill={meter > 0.8 ? "#C4413A" : meter > 0.5 ? "#D79A3C" : "#3F8F63"} />
        </g>)}
    </g>);
};

/* ---- THE COMMAND BOARD. The literal command the VO just said, big enough to
       read on a phone, typing itself in on cue. This is the direct answer to
       "something should appear on screen to represent it". ---- */
export const CommandBoard: React.FC<{ x: number; y: number; s?: number; cmd: string;
  typed: number; caption?: string; t?: number }> =
({ x, y, s = 1, cmd, typed, caption = "", t = 0 }) => {
  const shown = cmd.slice(0, Math.max(0, Math.round(cmd.length * typed)));
  const done = typed >= 1;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-300} y={-56} width={600} height={112} rx={12} fill="#1B211C" />
      <rect x={-300} y={-56} width={600} height={112} rx={12} fill="none"
            stroke={done ? "#C85A2E" : O.cabLo} strokeWidth={5} />
      <text x={-274} y={12} fontFamily={mono} fontSize={38} fontWeight={700} fill="#C85A2E">&gt;</text>
      <text x={-236} y={12} fontFamily={mono} fontSize={38} fontWeight={700}
            fill="#F2EFE6" letterSpacing={1}>{shown}</text>
      {!done && t % 12 < 7 && (
        <rect x={-232 + shown.length * 22} y={-16} width={6} height={34} fill="#C85A2E" />)}
      {caption && (
        <text x={0} y={78} textAnchor="middle" fontFamily={mono} fontSize={17}
              fontWeight={700} letterSpacing={3} fill={O.dim}>{caption}</text>)}
    </g>);
};

/* ---- named model chips, for the Opus-plans / Sonnet-builds line ---- */
export const ModelChip: React.FC<{ x: number; y: number; s?: number; name: string;
  role: string; on?: number; ent?: number; hot?: boolean }> =
({ x, y, s = 1, name, role, on = 1, ent = 1, hot = false }) => (
  /* ⛔ These sit over a busy wall, so they need VALUE separation, not a tint:
     an opaque card, a hard offset shadow, a solid colour bar carrying the state,
     and a subtitle in ink — never in the dim grey. Sized to be read on a phone. */
  <g transform={`translate(${x - (1 - ent) * 46},${y}) scale(${s * (0.86 + ent * 0.14)})`} opacity={on}>
    <rect x={-166} y={-52} width={332} height={112} rx={14} fill="#191D18" opacity={0.55} />
    <rect x={-172} y={-58} width={332} height={112} rx={14} fill="#FBFBF6" />
    <rect x={-172} y={-58} width={332} height={112} rx={14} fill="none"
          stroke={hot ? "#C85A2E" : "#3A4A43"} strokeWidth={6} />
    <rect x={-172} y={-58} width={22} height={112} rx={0}
          fill={hot ? "#C85A2E" : "#3A4A43"} />
    <rect x={-160} y={-58} width={10} height={112} fill="#FBFBF6" />
    <text x={12} y={-8} textAnchor="middle" fontFamily={mono} fontSize={40} fontWeight={700}
          fill={hot ? "#C85A2E" : "#1F2A24"}>{name}</text>
    <text x={12} y={28} textAnchor="middle" fontFamily={mono} fontSize={19} fontWeight={700}
          letterSpacing={1} fill="#5B6A62">{role}</text>
  </g>
);
