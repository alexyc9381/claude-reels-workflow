import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Audio, Sequence, staticFile } from "remotion";
import { fraunces, inter } from "../fonts";

/* ===== REEL 78 "LIMITS" — shared chassis (cloned verbatim from 77 TESTED). Cloned from CALLBACK/SERENA; do not restyle. ===== */
export const CREAM = "#ECE9E2", INK = "#1A1813", CLAY = "#D2724E", AMBER = "#CF9544",
             GOLD = "#E7B24C", GREEN = "#3F9E74", RED = "#C44A3A", PAPER = "#EDE6D6";
export const TERM_A = "#2E1F30", TERM_B = "#1B121C";
export const mono = "ui-monospace,'SF Mono',Menlo,monospace";
export const FPS = 30;
export const fr = (s: number) => Math.round(s * FPS);
export const grad = (a: string, b: string) => `linear-gradient(158deg, ${a} 0%, ${b} 100%)`;
export const over = (f: number, start: number, dur: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
export const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
export const seed = (n: number) => { const x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
export const CL = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
export { fraunces, inter };

/* ⛔ SCALE CONTRACT — one human reference, obeyed by every scene.
   Claude sprite HERO = 330px tall. Everything else is derived from that so nothing reads doll-sized:
     mug 0.10m -> 19px | A4 sheet 0.30m -> 56px | monitor 0.40m -> 76px
     desk 0.75m -> 142px | chair seat 0.45m -> 85px | door 2.0m -> 380px
   If a prop looks "fine" but breaks this table, the prop is wrong, not the table. */

/* ============================================================ POLISH HELPERS
   ⛔ Nothing enters linearly and nothing enters as a plain fade — that reads as
   a slideshow. `pop` overshoots once and settles (critically damped, no ring),
   `settle` is the heavy quint ease for anything with mass, and `wobble` is the
   follow-through that keeps a thing alive for a beat after it lands. */
export const pop = (f: number, start: number, dur = 13) =>
  over(f, start, dur, Easing.out(Easing.back(1.7)));
export const settle = (f: number, start: number, dur = 18) =>
  over(f, start, dur, Easing.out(Easing.poly(4)));
export const wobble = (f: number, start: number, life = 24, freq = 0.44) => {
  const d = f - start;
  if (d <= 0 || d >= life) return 0;
  return Math.sin(d * freq) * Math.pow(1 - d / life, 2.2);
};

export const H = 330;
export const M = (metres: number) => Math.round((metres / 1.75) * H);

export const Mascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number; nodSpeed?: number;
  shock?: number; rant?: number; pin?: number; cheer?: number; stern?: number; coat?: number; glasses?: number; constr?: number;
  point?: number; flip?: number }> =
({ lf, size = H, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, rant = 0, pin = 0, cheer = 0, stern = 0,
   coat = 0, glasses = 0, constr = 0, point = 0, flip = 0 }) => {
  const C = "#D97757";
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  const blink = ((lf + 41) % 84) < 5 && shock < 0.3 ? 0.15 : 1;   // ⛔ never closed at frame 0
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.45);
  const armY = 86 - rant * 26 - cheer * 24 - pin * 4;
  return (
    <div style={{ width: size, height: size, position: "relative",
                  transform: `translateY(${-hop}px) scaleY(${squash}) scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        {/* arms stay ATTACHED (x+26 = 34 / x = 166); rotation <=20deg or they read as floating diamonds */}
        <rect x={8} y={armY} width={26} height={26} fill={C} transform={(rant || cheer) > 0.2 ? `rotate(${-(rant + cheer) * 20} 21 ${armY + 13})` : undefined} />
        <rect x={8} y={armY + 24} width={26} height={26} fill={C} opacity={(rant || cheer) > 0.2 ? 1 : 0} />
        {/* the raised/pointing arm stays ATTACHED and short — a long limb reads as a stray slab */}
        <rect x={166} y={pin > 0.2 ? 58 : armY} width={point > 0.2 ? 44 : 26} height={pin > 0.2 ? 30 : 26}
              fill={pin > 0.2 ? "#C4664A" : C}
              transform={(rant || cheer) > 0.2 ? `rotate(${(rant + cheer) * 20} 179 ${armY + 13})` : undefined} />
        <rect x={166} y={armY + 24} width={26} height={26} fill={C} opacity={(rant || cheer) > 0.2 ? 1 : 0} />
        <rect x={34} y={44} width={132} height={102} fill={C} />
        <rect x={34} y={44} width={132} height={10} fill="rgba(255,255,255,0.16)" />
        {coat > 0 ? (<>
          <rect x={34} y={100} width={132} height={46} fill="#EDE6D6" />
          <rect x={34} y={100} width={132} height={6} fill="#CFC6B2" />
          <polygon points="80,100 100,124 120,100" fill={C} />
          <rect x={96} y={112} width={8} height={34} fill="#CFC6B2" />
        </>) : (<>
          <rect x={34} y={102} width={132} height={44} fill="#EDE6D6" />
          <rect x={34} y={102} width={132} height={5} fill="#CFC6B2" />
          <polygon points="82,102 100,126 118,102" fill={C} />
          <path d="M92 118 l8 -8 l8 8 l-4 30 h-8 z" fill="#8C4A57" />
          <rect x={42} y={128} width={22} height={5} fill="#CFC6B2" /><rect x={136} y={120} width={24} height={5} fill="#CFC6B2" />
        </>)}
        <rect x={52} y={146} width={17} height={38} fill={C} /><rect x={77} y={146} width={17} height={38} fill={C} />
        <rect x={124} y={146} width={17} height={38} fill={C} /><rect x={149} y={146} width={17} height={38} fill={C} />
        <rect x={66 + gaze} y={70 + (26 - eyeH) / 2} width={21} height={eyeH} fill="#151312" />
        <rect x={113 + gaze} y={70 + (26 - eyeH) / 2} width={21} height={eyeH} fill="#151312" />
        {glasses > 0 && (<>
          <rect x={58} y={64} width={38} height={34} rx={5} fill="none" stroke="#2B2622" strokeWidth={6} />
          <rect x={104} y={64} width={38} height={34} rx={5} fill="none" stroke="#2B2622" strokeWidth={6} />
          <rect x={96} y={76} width={8} height={6} fill="#2B2622" />
        </>)}
        {constr > 0 && (<>
          <path d="M34 44 q66 -40 132 0 z" fill="#E7B24C" />
          <rect x={24} y={38} width={152} height={12} rx={5} fill="#F0CB63" />
        </>)}
      </svg>
    </div>
  );
};

const FEET = 0.92;
/* ⛔ the contact shadow MUST be wider than the sprite or it does not exist. */
export const Actor: React.FC<{ lf: number; x: number; groundY: number; size?: number; shadow?: number; z?: number } & Record<string, any>> =
({ lf, x, groundY, size = H, shadow = 1, z = 5, ...rest }) => (
  <>
    <div style={{ position: "absolute", left: x - size * 0.56, top: groundY - 15, width: size * 1.12, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.55), transparent 70%)", opacity: 0.7 * shadow, zIndex: z - 4 }} />
    <div style={{ position: "absolute", left: x - size * 0.31, top: groundY - 13, width: size * 0.62, height: 18, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.75), transparent 66%)", opacity: 0.85 * shadow, zIndex: z - 4 }} />
    <div style={{ position: "absolute", left: x - size / 2, top: groundY - size * FEET, width: size, height: size, zIndex: z }}>
      <Mascot lf={lf} size={size} {...rest} />
    </div>
  </>
);

export const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.35, dur = 2.2 }) => (
  <Sequence from={fr(at)} durationInFrames={fr(dur)}><Audio src={staticFile(`sfx/${src}`)} volume={v} /></Sequence>
);

/* A parameterised ROOM so every scene gets its OWN dominant colour cheaply
   (⛔ reel-interscene-contrast: never route every scene through one fixed room). */
export const Room: React.FC<{ wall1: string; wall2: string; floor1: string; floor2: string; floorY?: number;
  beam?: string; beamX?: number; lf?: number }> =
({ wall1, wall2, floor1, floor2, floorY = 600, beam, beamX = 200, lf = 0 }) => (
  <g>
    <defs>
      <linearGradient id={`rw${wall1.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={wall1} /><stop offset="1" stopColor={wall2} /></linearGradient>
      <linearGradient id={`rf${floor1.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={floor1} /><stop offset="1" stopColor={floor2} /></linearGradient>
      {beam && <linearGradient id={`rb${beam.slice(1)}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={beam} stopOpacity=".46" /><stop offset="1" stopColor={beam} stopOpacity="0" /></linearGradient>}
    </defs>
    <rect x={0} y={0} width={1012} height={792} fill={`url(#rw${wall1.slice(1)})`} />
    <rect x={0} y={floorY} width={1012} height={792 - floorY} fill={`url(#rf${floor1.slice(1)})`} />
    <rect x={0} y={floorY - 4} width={1012} height={8} fill={floor1} opacity={0.7} />
    {[-620, -340, -130, 130, 340, 620].map((d) => (
      <line key={d} x1={506 + d * 0.18} y1={floorY} x2={506 + d * 1.8} y2={792} stroke="#000" strokeOpacity={0.30} strokeWidth={3} />))}
    {beam && <polygon points={`${beamX - 48},0 ${beamX + 48},0 ${beamX + 430},792 ${beamX - 430},792`} fill={`url(#rb${beam.slice(1)})`} />}
  </g>
);

export const Vignette: React.FC<{ cx?: number; cy?: number; a?: number }> = ({ cx = 0.46, cy = 0.5, a = 0.62 }) => (
  <>
    <defs><radialGradient id={`vg${Math.round(cx * 100)}${Math.round(cy * 100)}`} cx={String(cx)} cy={String(cy)} r=".78">
      <stop offset=".47" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity={String(a)} />
    </radialGradient></defs>
    <rect x={0} y={0} width={1012} height={792} fill={`url(#vg${Math.round(cx * 100)}${Math.round(cy * 100)})`} />
  </>
);

/* a hard white streak on a shot cut so it reads as intentional editing */
export const CutFlash: React.FC<{ lf: number; at: number }> = ({ lf, at }) => {
  const d = lf - at;
  return d >= 0 && d < 5 ? <div style={{ position: "absolute", inset: 0, background: "#EAF2FF", opacity: (1 - d / 5) * 0.3, zIndex: 80, pointerEvents: "none" }} /> : null;
};
