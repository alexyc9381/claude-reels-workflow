import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { E, osc, rnd, OUT, IO, IN_Q, SH, SH_D, RED, AMBER, GO, GO_L, STARC, Stars } from "./MissionWorld";

/* =========================================================================
   MISSION SURFACES — the crew OUTSIDE, on nine different worlds.

   ⛔ Why this file exists. The first cut of reel 82 put SEVEN of its nine body
   scenes inside a bay, and three of those were "a figure next to a wall screen
   with a wave on it". Alex: "they look like theyre on the ship... most of the
   scenes are just them with a screen with waves on the wall which is so boring
   ... i want to also see them walking on the planets."

   So: every body scene is now an EXTERIOR on a distinct world, the crew is
   DOING something physical in it, and each world owns its own palette so every
   cut is a colour change. Object budget is 12-18 per scene (memory
   `reel-graphical-not-textual`); the terrain below already contributes 6-9.

   House palette rules hold: solid matte paints, dark drop shadows, ONE light
   direction per world. No glow, no low-opacity neon washes.
   ========================================================================= */

export const PW = 1012, PH = 792;

/* ---------------------------------------------------------------- terrain -- */

export type WorldKind =
  | "ice" | "dune" | "canyon" | "volcanic" | "shatter" | "shore" | "moon" | "night" | "dawn";

type Spec = {
  sky: string;            // the sky, as a solid-stop gradient
  sun: [number, number, number, string] | null;   // x, y, d, colour
  ridge: [string, string, string];                // far -> near, all matte
  ground: string; lip: string; rock: string; grit: string;
  profile: [string, string, string];              // the silhouette of each ridge band
  horizon: number;
};

const R_JAG   = "polygon(0 100%, 10% 42%, 22% 66%, 34% 20%, 48% 58%, 60% 26%, 74% 62%, 86% 34%, 100% 100%)";
const R_DUNE  = "polygon(0 100%, 0 66%, 18% 48%, 38% 62%, 56% 40%, 76% 58%, 92% 44%, 100% 62%, 100% 100%)";
const R_MESA  = "polygon(0 100%, 6% 54%, 26% 54%, 30% 26%, 56% 26%, 60% 50%, 84% 50%, 88% 30%, 100% 30%, 100% 100%)";
const R_CONE  = "polygon(0 100%, 22% 54%, 34% 18%, 46% 44%, 58% 12%, 72% 50%, 100% 88%, 100% 100%)";
const R_SHARD = "polygon(0 100%, 8% 30%, 16% 78%, 28% 14%, 40% 70%, 52% 22%, 64% 74%, 78% 28%, 90% 66%, 100% 100%)";
const R_LOW   = "polygon(0 100%, 14% 72%, 32% 60%, 52% 74%, 70% 58%, 88% 70%, 100% 64%, 100% 100%)";
const R_CRAT  = "polygon(0 100%, 12% 74%, 24% 62%, 33% 74%, 46% 60%, 58% 76%, 72% 62%, 86% 76%, 100% 66%, 100% 100%)";
const R_SUMM  = "polygon(0 100%, 18% 62%, 40% 18%, 52% 40%, 64% 22%, 82% 60%, 100% 76%, 100% 100%)";

const SPECS: Record<WorldKind, Spec> = {
  /* 1 — an ice plain under two suns. Cold, high-value, wide. */
  ice: { sky: "linear-gradient(180deg,#3C6A93 0%,#7FA8C6 52%,#C6DCE8 100%)",
    sun: [742, 92, 118, "#FBE7C0"], ridge: ["#8FB2C8", "#B4CDDB", "#D6E6EE"],
    ground: "#CFE0E8", lip: "#EEF6F9", rock: "#9FBACB", grit: "#B7CFDC",
    profile: [R_JAG, R_LOW, R_LOW], horizon: 452 },

  /* 2 — dust dunes, a low amber sun, everything half buried. */
  dune: { sky: "linear-gradient(180deg,#8A4A2E 0%,#C97A3E 46%,#EFB264 100%)",
    sun: [196, 150, 132, "#FFD79A"], ridge: ["#B0743F", "#C98A4E", "#DFA463"],
    ground: "#C98D51", lip: "#E7B471", rock: "#9C6B3C", grit: "#B57C46",
    profile: [R_DUNE, R_DUNE, R_DUNE], horizon: 470 },

  /* 3 — a layered canyon. Green-teal light, sandstone walls. */
  canyon: { sky: "linear-gradient(180deg,#1F4A46 0%,#3E7A6C 50%,#8FBCA4 100%)",
    sun: [826, 118, 96, "#E6F0C8"], ridge: ["#6E7F5E", "#95724E", "#B98F5E"],
    ground: "#A97F52", lip: "#CFA167", rock: "#8A6541", grit: "#9C7449",
    profile: [R_MESA, R_MESA, R_LOW], horizon: 446 },

  /* 4 — a volcanic ridge, seams of cooling rock. Matte orange on charcoal. */
  volcanic: { sky: "linear-gradient(180deg,#241B26 0%,#5A2A2C 48%,#A8482C 100%)",
    sun: null, ridge: ["#3E2E33", "#4E3435", "#5E3B36"],
    ground: "#3A2C2E", lip: "#7E4230", rock: "#2C2224", grit: "#4A3335",
    profile: [R_CONE, R_JAG, R_LOW], horizon: 440 },

  /* 5 — a shattered plain, violet sky, everything broken into shards. */
  shatter: { sky: "linear-gradient(180deg,#2C2450 0%,#5A4A86 50%,#9C8ABE 100%)",
    sun: [166, 122, 92, "#E8DCF6"], ridge: ["#5E5486", "#7A6C9E", "#9488B4"],
    ground: "#6E6490", lip: "#A296C4", rock: "#514874", grit: "#7E74A0",
    profile: [R_SHARD, R_SHARD, R_LOW], horizon: 458 },

  /* 6 — a methane shore. Teal liquid, cream flats, a still surface. */
  shore: { sky: "linear-gradient(180deg,#175E63 0%,#3E9A96 50%,#B8DCCE 100%)",
    sun: [618, 104, 104, "#F2EAC6"], ridge: ["#2F6E6C", "#4C8C82", "#79AC9A"],
    ground: "#D8CFAE", lip: "#EFE7C6", rock: "#A99B76", grit: "#C4B992",
    profile: [R_LOW, R_LOW, R_LOW], horizon: 436 },

  /* 7 — a cratered moon with a huge planet overhead. Grey-blue, airless. */
  moon: { sky: "linear-gradient(180deg,#0C1226 0%,#141C36 60%,#26304C 100%)",
    sun: null, ridge: ["#3A445E", "#4C566E", "#606A80"],
    ground: "#6E7688", lip: "#8E96A6", rock: "#525A6E", grit: "#7E8698",
    profile: [R_CRAT, R_CRAT, R_LOW], horizon: 462 },

  /* 8 — night camp on a ridge, an aurora overhead. */
  night: { sky: "linear-gradient(180deg,#0A1430 0%,#12224A 54%,#1E3A62 100%)",
    sun: null, ridge: ["#1C2E4E", "#263C5E", "#32506E"],
    ground: "#2A4460", lip: "#3E6480", rock: "#20364E", grit: "#365874",
    profile: [R_SUMM, R_JAG, R_LOW], horizon: 470 },

  /* 9 — a summit at dawn, a planet rising. Warm, final. */
  dawn: { sky: "linear-gradient(180deg,#3E3A6E 0%,#C86A56 46%,#FFB56E 100%)",
    sun: null, ridge: ["#7A5A76", "#A06A64", "#C08464"],
    ground: "#8E6250", lip: "#C08A66", rock: "#6E4A3E", grit: "#A0705A",
    profile: [R_SUMM, R_JAG, R_LOW], horizon: 458 },
};

export const horizonOf = (k: WorldKind) => SPECS[k].horizon;

/** The world itself: sky, sun, three parallax ridge bands, ground, grit.
 *  `pan` slides the ridges for a slow camera drift. */
export const Surface: React.FC<{ f: number; kind: WorldKind; pan?: number }> = ({ f, kind, pan = 0 }) => {
  const S = SPECS[kind], H = S.horizon;
  const dep = [0.18, 0.42, 0.78];
  return (<>
    <div style={{ position: "absolute", inset: 0, background: S.ground }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: H, background: S.sky }} />
    {(kind === "moon" || kind === "night") && <Stars n={70} seed={kind === "moon" ? 5 : 9} maxY={H - 40} />}
    {S.sun && (
      <div style={{ position: "absolute", left: S.sun[0], top: S.sun[1], width: S.sun[2], height: S.sun[2],
        borderRadius: "50%", background: S.sun[3] }} />
    )}
    {/* the ice world has a second, smaller sun — the giveaway that it is not Earth */}
    {kind === "ice" && (
      <div style={{ position: "absolute", left: 866, top: 172, width: 54, height: 54,
        borderRadius: "50%", background: "#F6D9A6" }} />
    )}

    {/* three ridge bands, each a flat paint, each drifting at its own rate */}
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: -120 - pan * dep[i], top: H - 210 + i * 66,
        width: PW + 260, height: 250, background: S.ridge[i], clipPath: S.profile[i] }} />
    ))}

    {/* the ground plane and its lit lip */}
    <div style={{ position: "absolute", left: 0, right: 0, top: H, bottom: 0, background: S.ground }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: H, height: 13, background: S.lip }} />

    {/* grit: flat stones scattered across the plane, bigger toward camera */}
    {Array.from({ length: 22 }, (_, i) => {
      const t = rnd(i, 3), d = rnd(i, 7);
      const y = H + 26 + d * (PH - H - 60), w = 16 + d * 62;
      return <div key={i} style={{ position: "absolute", left: t * (PW + 80) - 40 - pan * 0.9, top: y,
        width: w, height: w * 0.34, borderRadius: w * 0.2,
        background: i % 3 === 0 ? S.rock : S.grit }} />;
    })}
  </>);
};

/* --------------------------------------------------------- sky furniture -- */

/** a big world hanging in the sky, with an optional ring */
export const SkyWorld: React.FC<{ cx: number; cy: number; r: number; c: string; c2: string;
  ring?: string; z?: number }> = ({ cx, cy, r, c, c2, ring, z = 2 }) => (
  <div style={{ position: "absolute", left: cx - r * 1.9, top: cy - r * 1.9,
    width: r * 3.8, height: r * 3.8, zIndex: z }}>
    {ring && (
      <div style={{ position: "absolute", left: 0, top: r * 1.62, width: r * 3.8, height: r * 0.56,
        borderRadius: "50%", border: `9px solid ${ring}`, transform: "rotate(-14deg)" }} />
    )}
    <div style={{ position: "absolute", left: r * 0.9, top: r * 0.9, width: r * 2, height: r * 2,
      borderRadius: "50%", background: c, overflow: "hidden" }}>
      {[0.16, 0.38, 0.58, 0.78].map((t, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${t * 100}%`,
          height: `${8 + i * 3}%`, background: c2, opacity: 0.9 }} />
      ))}
      <div style={{ position: "absolute", left: "-24%", top: 0, width: "46%", height: "100%",
        background: "rgba(20,24,40,0.30)" }} />
    </div>
  </div>
);

/** an aurora: solid matte curtains, not a glow */
export const Aurora: React.FC<{ f: number; z?: number }> = ({ f, z = 2 }) => (<>
  {[0, 1, 2, 3, 4].map((i) => {
    const x = 40 + i * 196 + osc(f, 46 + i * 9, 18, i);
    const h = 210 + (i % 2) * 74;
    return (
      <svg key={i} viewBox="0 0 160 300" width={160} height={h}
        style={{ position: "absolute", left: x, top: 30 + (i % 3) * 22, zIndex: z, overflow: "visible" }}>
        <path d={`M78 0 Q ${40 + osc(f, 38, 12, i)} 150 ${96 + osc(f, 52, 16, i)} 300 L ${140 + osc(f, 52, 16, i)} 300 Q ${96 + osc(f, 38, 12, i)} 150 128 0 Z`}
          fill={i % 3 === 1 ? "#3E9C7A" : i % 3 === 0 ? "#2F7E68" : "#57B894"} opacity={0.8} />
      </svg>
    );
  })}
</>);

/* ------------------------------------------------------------- EVA props -- */

/** boot prints trailing behind a walker */
export const Prints: React.FC<{ x: number; y: number; n?: number; step?: number; c?: string; z?: number;
  flip?: boolean }> = ({ x, y, n = 7, step = 46, c = "rgba(40,34,30,0.30)", z = 5, flip = false }) => (<>
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: x + (flip ? 1 : -1) * i * step, top: y + (i % 2) * 13,
      width: 26, height: 13, borderRadius: 5, background: c, zIndex: z,
      opacity: 1 - i / (n + 2) }} />
  ))}
</>);

/** a planted mission flag */
export const Flagpole: React.FC<{ f: number; x: number; y: number; h?: number; c?: string; z?: number }> =
  ({ f, x, y, h = 150, c = RED, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 118, height: h, zIndex: z,
    filter: "drop-shadow(0 6px 6px rgba(26,30,40,0.34))" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: h, background: "#D9DEE4" }} />
    <div style={{ position: "absolute", left: 8, top: 8, width: 92, height: 58, background: c,
      clipPath: `polygon(0 0, 100% ${4 + osc(f, 22, 4)}%, 100% ${88 + osc(f, 22, 4, 1)}%, 0 100%)` }} />
    <div style={{ position: "absolute", left: 22, top: 20, width: 34, height: 34 }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </div>
  </div>
);

/** a six-wheel surface rover; `bury` sinks it into the ground, `old` greys it out */
export const Rover: React.FC<{ f: number; x: number; y: number; s?: number; bury?: number;
  old?: boolean; roll?: number; z?: number }> =
  ({ f, x, y, s = 1, bury = 0, old = false, roll = 0, z = 12 }) => {
  const body = old ? "#9A8E86" : "#E4E7EA", trim = old ? "#7A6E66" : "#8E9AA6";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 168 * s, zIndex: z,
      clipPath: bury ? `inset(0 0 ${bury * 100}% 0)` : undefined,
      filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.36))" }}>
      <svg viewBox="0 0 300 168" width={300 * s} height={168 * s} style={{ overflow: "visible" }}>
        <rect x={44} y={54} width={214} height={62} rx={10} fill={body} />
        <rect x={44} y={54} width={214} height={9} fill="rgba(255,255,255,0.45)" />
        <rect x={60} y={70} width={70} height={32} rx={5} fill={old ? "#6E635C" : "#33506B"} />
        <rect x={150} y={68} width={92} height={16} rx={5} fill={trim} />
        <rect x={150} y={92} width={64} height={12} rx={4} fill={trim} />
        {/* mast + dish */}
        <rect x={228} y={16} width={9} height={44} fill={trim} />
        <circle cx={232} cy={14} r={17} fill={body} />
        <circle cx={232} cy={14} r={7} fill={trim} />
        {[62, 150, 238].map((cx, i) => (
          <g key={i} transform={`rotate(${roll * 30 * (i + 1)} ${cx} 128)`}>
            <circle cx={cx} cy={128} r={30} fill={old ? "#5E544E" : "#3A4048"} />
            <circle cx={cx} cy={128} r={13} fill={trim} />
            <rect x={cx - 32} y={125} width={64} height={6} fill={old ? "#6E635C" : "#5A6472"} />
          </g>
        ))}
        <rect x={44} y={112} width={214} height={10} rx={4} fill={old ? "#6E635C" : "#5A6472"} />
      </svg>
      {!old && (
        <div style={{ position: "absolute", left: 66 * s, top: 74 * s, width: 26 * s, height: 26 * s }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
        </div>
      )}
    </div>
  );
};

/** a stack of supply crates. `gone` lifts the top N off the pile. */
export const Crates: React.FC<{ f: number; x: number; y: number; cols?: number; rows?: number;
  cw?: number; gone?: number; c?: string; z?: number }> =
  ({ f, x, y, cols = 3, rows = 5, cw = 76, gone = 0, c = "#C0663E", z = 12 }) => {
  const total = cols * rows, lift = Math.round(total * gone);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: cols * cw, height: rows * cw, zIndex: z }}>
      {Array.from({ length: total }, (_, i) => {
        const r = Math.floor(i / cols), col = i % cols;
        const up = i < lift ? 1 : 0;               // strip from the TOP row down
        const t = E(f, 6 + i * 1.0, 28 + i * 1.0, 0, 1, OUT);
        const dy = up ? -t * (430 + i * 22) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: col * cw, top: r * cw + dy,
            width: cw - 6, height: cw - 6, borderRadius: 6, opacity: up ? 1 - t * 0.85 : 1,
            background: (r + col) % 2 ? c : "#A9552F", boxShadow: SH,
            transform: up ? `rotate(${(rnd(i, 2) - 0.5) * 26 * t}deg)` : undefined }}>
            <div style={{ position: "absolute", left: 8, top: (cw - 6) / 2 - 4, right: 8, height: 8,
              background: "rgba(255,255,255,0.34)" }} />
          </div>
        );
      })}
    </div>
  );
};

/** a drill rig taking a core sample */
export const Drill: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 150 * s, height: 250 * s, zIndex: z,
    filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.34))" }}>
    <svg viewBox="0 0 150 250" width={150 * s} height={250 * s} style={{ overflow: "visible" }}>
      <path d="M18 250 L46 92 L104 92 L132 250 Z" fill="#9AA6B2" />
      <path d="M32 250 L54 108 L96 108 L118 250 Z" fill="#C3CCD4" />
      <rect x={40} y={78} width={70} height={26} rx={5} fill="#4E5A68" />
      <rect x={68} y={100} width={14} height={130 - osc(f, 9, 8) - 8} fill="#6E7B88" />
      <rect x={62} y={100 + 118 - osc(f, 9, 8)} width={26} height={22} rx={4} fill="#3A4048" />
      {[130, 168, 206].map((yy, i) => (
        <rect key={i} x={28} y={yy} width={94} height={9} fill="#8E9AA6" />
      ))}
      <rect x={44} y={62} width={62} height={16} rx={5} fill={RED} />
    </svg>
  </div>
);

/** a field bench with open sample cases */
export const SampleBench: React.FC<{ f: number; x: number; y: number; s?: number; n?: number; z?: number }> =
  ({ f, x, y, s = 1, n = 4, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 130 * s, zIndex: z,
    filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.32))" }}>
    <svg viewBox="0 0 300 130" width={300 * s} height={130 * s} style={{ overflow: "visible" }}>
      <rect x={0} y={48} width={300} height={18} rx={5} fill="#C3CCD4" />
      <rect x={14} y={66} width={13} height={64} fill="#8E9AA6" />
      <rect x={273} y={66} width={13} height={64} fill="#8E9AA6" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`translate(${18 + i * 68} 0)`}>
          <rect x={0} y={22} width={54} height={26} rx={4} fill="#E4E7EA" />
          <rect x={0} y={8} width={54} height={14} rx={4} fill={i % 2 ? GO : AMBER}
            transform={`rotate(${-18 - i * 6} 0 22)`} />
          <rect x={12} y={30} width={30} height={10} rx={3} fill="#8E9AA6" />
        </g>
      ))}
    </svg>
  </div>
);

/** a guyed mast that snaps at `at` */
export const Mast: React.FC<{ f: number; x: number; y: number; h?: number; at: number; z?: number }> =
  ({ f, x, y, h = 300, at, z = 12 }) => {
  const k = f - at, broke = k >= 0;
  const bend = broke ? 0 : E(f, at - 26, at, 0, 8, IO);
  const fall = broke ? E(f, at, at + 16, 0, 76, IN_Q) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 130, height: h, zIndex: z,
      filter: "drop-shadow(0 7px 7px rgba(26,30,40,0.34))" }}>
      {/* lower half stays planted */}
      <div style={{ position: "absolute", left: 46, top: h * 0.44, width: 30, height: h * 0.56,
        background: "#C3CCD4", transform: `rotate(${bend * 0.3}deg)`, transformOrigin: "50% 100%" }} />
      {/* upper half is what fails */}
      <div style={{ position: "absolute", left: 46, top: 0, width: 30, height: h * 0.46,
        background: "#D9DEE4", transformOrigin: "50% 100%",
        transform: `rotate(${bend + fall}deg)` }}>
        <div style={{ position: "absolute", left: -14, top: 8, width: 58, height: 13, background: "#8E9AA6" }} />
        <div style={{ position: "absolute", left: -14, top: h * 0.22, width: 58, height: 13, background: "#8E9AA6" }} />
      </div>
      {/* the guy wires, one of which goes slack at the break */}
      <svg viewBox={`0 0 130 ${h}`} width={130} height={h} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={`M61 ${h * 0.46} L4 ${h}`} stroke="#8E9AA6" strokeWidth={5} fill="none" />
        <path d={broke ? `M61 ${h * 0.5} Q 96 ${h * 0.92} 126 ${h}` : `M61 ${h * 0.46} L126 ${h}`}
          stroke="#8E9AA6" strokeWidth={5} fill="none" />
      </svg>
      {broke && Array.from({ length: 7 }, (_, i) => {
        const t = E(f, at, at + 20, 0, 1, OUT);
        return <div key={i} style={{ position: "absolute", left: 40 + (rnd(i, 4) - 0.5) * 190 * t,
          top: h * 0.42 + t * (60 + rnd(i, 6) * 130), width: 15, height: 8, borderRadius: 3,
          background: "#C3CCD4", opacity: 1 - t * 0.5,
          transform: `rotate(${t * 240 * (rnd(i, 8) - 0.5)}deg)` }} />;
      })}
    </div>
  );
};

/** a four-legged lander; `shim` raises one leg so the deck comes level */
export const Lander: React.FC<{ f: number; x: number; y: number; s?: number; shim?: number; z?: number }> =
  ({ f, x, y, s = 1, shim = 0, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 330 * s, height: 240 * s, zIndex: z,
    transform: `rotate(${(1 - shim) * 7}deg)`, transformOrigin: "50% 90%",
    filter: "drop-shadow(0 9px 9px rgba(26,30,40,0.36))" }}>
    <svg viewBox="0 0 330 240" width={330 * s} height={240 * s} style={{ overflow: "visible" }}>
      <rect x={52} y={30} width={226} height={106} rx={16} fill="#E4E7EA" />
      <rect x={52} y={30} width={226} height={13} fill="rgba(255,255,255,0.55)" />
      <rect x={74} y={56} width={92} height={48} rx={6} fill="#33506B" />
      <rect x={182} y={58} width={80} height={18} rx={5} fill="#8E9AA6" />
      <rect x={182} y={84} width={56} height={14} rx={4} fill="#8E9AA6" />
      <rect x={96} y={14} width={138} height={18} rx={6} fill="#9AA6B2" />
      {/* the bell, so it reads as a lander and not a table */}
      <path d="M134 136 L120 176 L210 176 L196 136 Z" fill="#8E9AA6" />
      <rect x={116} y={172} width={98} height={13} rx={5} fill="#5A6472" />
      <path d="M70 136 L26 208" stroke="#9AA6B2" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M260 136 L304 208" stroke="#9AA6B2" strokeWidth={20} fill="none" strokeLinecap="round" />
      <path d="M112 136 L92 212" stroke="#9AA6B2" strokeWidth={16} fill="none" strokeLinecap="round" />
      <path d="M218 136 L238 212" stroke="#9AA6B2" strokeWidth={16} fill="none" strokeLinecap="round" />
      {[[6, 206], [286, 206], [72, 210], [220, 210]].map(([fx, fy], i) => (
        <rect key={i} x={fx} y={fy - (i === 0 ? shim * 22 : 0)} width={44} height={18} rx={6} fill="#3A4048" />
      ))}
      {/* the shim that actually fixes it */}
      {shim > 0.05 && (
        <rect x={12} y={224 - shim * 22} width={34} height={shim * 24} rx={3} fill={AMBER} />
      )}
    </svg>
  </div>
);

/** a pressurised field habitat */
export const Hab: React.FC<{ f: number; x: number; y: number; s?: number; z?: number }> =
  ({ f, x, y, s = 1, z = 11 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, height: 170 * s, zIndex: z,
    filter: "drop-shadow(0 8px 8px rgba(26,30,40,0.4))" }}>
    <svg viewBox="0 0 300 170" width={300 * s} height={170 * s} style={{ overflow: "visible" }}>
      <path d="M10 170 L10 78 A140 92 0 0 1 290 78 L290 170 Z" fill="#D9DEE4" />
      <path d="M10 170 L10 78 A140 92 0 0 1 150 8 L150 170 Z" fill="#EFF3F6" />
      <rect x={120} y={104} width={60} height={66} rx={7} fill="#33506B" />
      <rect x={128} y={112} width={44} height={30} rx={4} fill="#FFE9B0" />
      {[46, 232].map((cx, i) => (
        <circle key={i} cx={cx} cy={104} r={22} fill="#33506B" />
      ))}
      <rect x={0} y={162} width={300} height={12} rx={4} fill="#9AA6B2" />
    </svg>
  </div>
);

/** tally marks cut into a rock — days, counted the way a person counts them */
export const Tally: React.FC<{ f: number; x: number; y: number; n: number; at: number; c?: string;
  z?: number }> = ({ f, x, y, n, at, c = "#F2E4C6", z = 18 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: Math.ceil(n / 5) * 78, height: 62, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const grp = Math.floor(i / 5), k = i % 5, on = f >= at + i * 2;
      if (!on) return null;
      return k === 4
        ? <div key={i} style={{ position: "absolute", left: grp * 78 - 4, top: 20, width: 58, height: 7,
            background: c, transform: "rotate(-24deg)" }} />
        : <div key={i} style={{ position: "absolute", left: grp * 78 + k * 13, top: 0, width: 7, height: 54,
            background: c }} />;
    })}
  </div>
);

/** the arc a craft flies, drawn as a dashed trajectory that draws itself */
export const Arc: React.FC<{ f: number; at: number; x1: number; y1: number; x2: number; y2: number;
  peak?: number; c?: string; dur?: number; w?: number; z?: number }> =
  ({ f, at, x1, y1, x2, y2, peak = 200, c = GO_L, dur = 26, w = 7, z = 14 }) => {
  const t = E(f, at, at + dur, 0, 1, OUT);
  if (t <= 0) return null;
  const cx = (x1 + x2) / 2, cy = Math.min(y1, y2) - peak;
  const L = Math.hypot(x2 - x1, y2 - y1) + peak * 1.6;
  return (
    <svg viewBox={`0 0 ${PW} ${PH}`} width={PW} height={PH}
      style={{ position: "absolute", left: 0, top: 0, zIndex: z, overflow: "visible", pointerEvents: "none" }}>
      <path d={`M${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke={c} strokeWidth={w} fill="none"
        strokeLinecap="round" strokeDasharray={`${L} ${L}`} strokeDashoffset={L * (1 - t)} />
    </svg>
  );
};

/** a scene chip. ONE per scene, in a band nothing else occupies. */
export const Chip: React.FC<{ y: number; text: string; c?: string; size?: number; z?: number }> =
  ({ y, text, c = RED, size = 38, z = 26 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex", justifyContent: "center", zIndex: z }}>
    <div style={{ padding: "10px 26px", borderRadius: 8, background: c, boxShadow: SH_D,
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em",
      color: "#FFF6F2", whiteSpace: "nowrap" }}>{text}</div>
  </div>
);

/** dust kicked up where a boot lands */
export const Kick: React.FC<{ f: number; x: number; y: number; c?: string; z?: number }> =
  ({ f, x, y, c = "rgba(255,255,255,0.5)", z = 13 }) => (<>
  {Array.from({ length: 5 }, (_, i) => {
    const t = ((f * 0.06 + i * 0.2) % 1);
    return <div key={i} style={{ position: "absolute", left: x + t * (30 + i * 16), top: y - t * 26,
      width: 20 + t * 30, height: 11 + t * 12, borderRadius: 12, background: c,
      opacity: (1 - t) * 0.55, zIndex: z }} />;
  })}
</>);
