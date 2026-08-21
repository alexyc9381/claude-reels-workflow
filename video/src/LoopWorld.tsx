import React from "react";
import { Img, staticFile } from "remotion";
import { MONO, Mascot, hexA } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 118 · "LOOP" — THE WORLD KIT.  Board: storyboards/118-loop.md.

   Subject: the GAUNTLET LOOP prompting technique. One three-line prompt sets a
   task, fans the work out to a team of builder subagents, and — the third line
   — assigns a separate CRITIC with fresh context that compares the real output
   to a quality bar, names the biggest gap and sends it back. It loops until the
   critic is satisfied. Verified live 2026-08-21.

   ⛔⛔ THE WORLD IS THE SUBJECT'S OWN NOUN. The technique is named after a
      GAUNTLET, so the set is one: a proving hall where work must physically run
      a line of judges, and what it does when it fails is go ROUND AGAIN. The
      loop is not a metaphor here, it is the return rail overhead, and you can
      watch a build ride it back to the start and come out bigger.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      1. NO CURRENCY ANYWHERE. Real runs are reported at $1,200 and $1,700, but
         they are two DIFFERENT projects and the VO names no number — a figure on
         screen reads as the cost of the build we are watching. S11 draws the
         DRAIN (a needle, an emptying glass) and no money.  Guard: MONEY_BANNED.
      2. NO LIKENESS OF A REAL PERSON. The Cherny receipt is a SPLIT-FLAP BOARD
         carrying six quoted words and a name plate. Nothing is drawn as a face.
      3. `55,000 LINES` IS THE ONLY BIG NUMBER and it is the demo's, labelled as
         the demo's, on the game viewport itself.
      4. NO SPEED / QUALITY / "N× BETTER" CLAIM — no benchmark is published.
         `REJECT ×N -> PASS` counts events the viewer watches happen on screen;
         it is not a score.  Guard: RATE_BANNED.
      5. The Claude mark rides the prompt slab, the benches and the return rail.
         ⛔ NEVER ON A FACE — the box Mascot's body rect IS the face.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere — the grep gate returns 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* ---- the palette --------------------------------------------------------- */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62";

/* ---- THE LEDGER ----------------------------------------------------------
   Every number and word the picture is allowed to assert, and where it came
   from. Checked live 2026-08-21. If it is not in here it does not go on screen. */
export const R = {
  /** the demo that made the technique spread — Claude Opus 5, a browser FPS */
  demo:      { name: "CLAUDE OF DUTY", lines: "55,000", stack: "THREE.JS" },
  /** the creator of Claude Code, on how he works now. Six words, quoted. */
  cherny:    { quote: "MY JOB IS TO WRITE LOOPS", who: "BORIS CHERNY", what: "CLAUDE CODE" },
  /** who named and popularised it */
  author:    "MATT SHUMER",
  /** the three lines, in order — this is the mechanism the reel draws */
  lines:     ["THE TASK", "FAN OUT", "THE CRITIC"] as const,
  /** the loop's own counter. These are EVENTS ON SCREEN, not a benchmark. */
  rejects:   3,
  verdicts:  { bad: "REJECT", good: "PASS" },
  stamps:    { mvp: "MVP", done: "POLISHED" },
} as const;

/** ⛔ GUARDS. A grep for any of these over Loop*.tsx must return zero hits in a
    rendered string. Both exist because the VO makes neither claim. */
export const MONEY_BANNED = ["$", "USD", "COST", "PER RUN", "SPEND", "SAVED"] as const;
export const RATE_BANNED = ["%", "FASTER", "BETTER", "X MORE", "SCORE", "/10"] as const;

/* ---- THE NINE PLACES -----------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. The order the
   reel visits them is intake -> bench -> gallery -> hall -> office -> intake ->
   bench -> lectern -> pulpit -> run -> bar -> drum -> bench -> hall -> front,
   which alternates warm/cold and bright/dark on every single cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35 (ANIM-QUALITY §8).
   The >=140 bar is FRAME 0 ONLY, and `intake` is the only place built for it. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE INTAKE — the brightest room in the reel, and the hook's. High cream
     key from the left, bone walls, a warm floor. Frame 0 lives here. */
  /* ⛔ FRAME 0 MEASURED 133.3 AGAINST THE >=140 BAR, and the fix is NOT the
     shading (§8: lifting the dark stop is exactly what washed out ten reels).
     Only the two LARGE, ALREADY-LIT areas move — the back wall's lower stop and
     the floor — while `lip` and `grit` are untouched, so the black point holds
     at p10 34. Re-measured after: 141.6, p10 33. */
  intake:  { back: "#8A7B66", back2: "#E6D6B8", floor: "#A6906B", floor2: "#6E5E46",
             lip: "#3E362B", key: "#F2E0B4", horizon: 452, grit: "#2C2620" },
  /* 2 · THE BENCH FLOOR — forge amber up through ten open hatches. */
  bench:   { back: "#3A2A1E", back2: "#8A4E28", floor: "#71472A", floor2: "#3E2718",
             lip: "#2A1C12", key: "#F2A24A", horizon: 498, grit: "#241811" },
  /* 3 · THE GALLERY — a dark hall whose ONLY light is the split-flap board. */
  gallery: { back: "#141A26", back2: "#2E3A50", floor: "#202836", floor2: "#12161E",
             lip: "#080A10", key: "#CFE0F2", horizon: 556, grit: "#080A10" },
  /* 4 · THE HALL — the whole gauntlet, cold steel with sodium pools. */
  hall:    { back: "#1C242A", back2: "#3E5058", floor: "#2E3C42", floor2: "#19232A",
             lip: "#0C1216", key: "#E7A94C", horizon: 512, grit: "#0B1013" },
  /* 5 · THE SIDE OFFICE — the smallest, sickliest room. Deliberately ugly. */
  office:  { back: "#2E3630", back2: "#525E4C", floor: "#3C443A", floor2: "#242A24",
             lip: "#141814", key: "#C2CE9E", horizon: 540, grit: "#101410" },
  /* 6 · THE LECTERN — near black, one hard cone on the slab. */
  lectern: { back: "#12141A", back2: "#242A36", floor: "#1E2028", floor2: "#101218",
             lip: "#07080C", key: "#F2E0B4", horizon: 566, grit: "#07080C" },
  /* 7 · THE PULPITS — cold violet from above, the critic's room. */
  pulpit:  { back: "#1E1A2A", back2: "#463A5E", floor: "#2C2440", floor2: "#171224",
             lip: "#0C0816", key: "#A48CC8", horizon: 560, grit: "#120E1A" },
  /* 8 · THE RUN — hard teal side rake through the rail's gaps. */
  run:     { back: "#16242A", back2: "#33565E", floor: "#284046", floor2: "#16262A",
             lip: "#0A1416", key: "#7FC0C9", horizon: 520, grit: "#0A1215" },
  /* 9 · THE DRUM ROOM — ember from a furnace mouth and nothing else. */
  drum:    { back: "#2A150E", back2: "#7A3212", floor: "#552A14", floor2: "#2A1408",
             lip: "#140803", key: "#E06A2C", horizon: 544, grit: "#150803" },
  /* 10 · THE BAR WALL — the payoff, gold flood from screen right. */
  bar:     { back: "#2A2416", back2: "#7A6428", floor: "#54441F", floor2: "#2E2410",
             lip: "#141005", key: "#F2C25E", horizon: 500, grit: "#171205" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const l = (r + g + b) / 3;
  r = Math.max(0, Math.min(255, l + (r - l) * k));
  g = Math.max(0, Math.min(255, l + (g - l) * k));
  b = Math.max(0, Math.min(255, l + (b - l) * k));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
};
export const lerpHex = (a: string, b: string, t: number) => {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const r = Math.round(((A >> 16) & 255) + (((B >> 16) & 255) - ((A >> 16) & 255)) * t);
  const g = Math.round(((A >> 8) & 255) + (((B >> 8) & 255) - ((A >> 8) & 255)) * t);
  const c = Math.round((A & 255) + ((B & 255) - (A & 255)) * t);
  return `rgb(${r},${g},${c})`;
};
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ATMOSPHERE
   ====================================================================== */

/** ⭐⭐⭐ THE TRAVELLING RAKE. §1's highest-value shape, with reel 109's two
    corrections baked in: the bands ALTERNATE LIGHT AND SHADOW (a light-only
    wash lifts the black point, which is the banned fix), and every edge is
    FEATHERED (a hard edge reads as wallpaper laid over the room, a feathered
    one reads as light falling through a structure). Width is restored and the
    motion is bought back through SPEED, which no viewer reads as stripiness. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  c?: string; o?: number; rate?: number; z?: number; n?: number; skew?: number }> =
  ({ f, y, h: hh, x0 = 0, span = W + 420, c = "#F2DFAE", o = 0.30, rate = 2.1, z = 26,
     n = 7, skew = -16 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const pitch = span / n;
    const x = x0 + (((i * pitch + f * rate) % span) + span) % span - 210;
    const dk = i % 2 === 1;
    return (
      <div key={"rk" + i} style={{ position: "absolute", left: x, top: y, width: pitch * 0.52,
        height: hh, zIndex: z, transform: `skewX(${skew}deg)`,
        /* ⛔⛔ THE SHADOW SIDE CARRIES AS MUCH WEIGHT AS THE LIGHT SIDE. At
           `o * 0.72` the light bands outweighed the dark ones, and raising `o`
           to lift motion pushed the reel's black point to p10 35.3 against a
           bar of 35 — i.e. straight into the ten-reel wash-out this gate exists
           to catch. Reel 106 measured the fix: interleaving a dark band of
           EQUAL weight raises the luma delta per swept pixel (so motion goes UP,
           not down) and puts the black point back where it was. */
        background: dk
          ? `linear-gradient(90deg, ${hexa("#05070C", 0)} 0%, ${hexa("#05070C", o * 1.16)} 46%, ${hexa("#05070C", 0)} 100%)`
          : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o * 0.86)} 46%, ${hexa(c, 0)} 100%)` }} />
    );
  })}</>
);

export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; s?: number; dur?: number }> =
  ({ x, y, f, at, c = "#F2E0B4", z = 74, s = 1, dur = 20 }) => {
  const lf = f - at;
  if (lf < 0 || lf > dur) return null;
  const k = lf / dur;
  const r = (26 + k * 190) * s;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.36, width: r * 2,
      height: r * 0.72, borderRadius: "50%", zIndex: z,
      border: `${Math.max(2, 9 * (1 - k) * s)}px solid ${hexa(c, 0.72 * (1 - k))}` }} />
  );
};

export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; n?: number; s?: number; up?: number }> =
  ({ x, y, f, at, c = "#CFC4AE", z = 60, n = 9, s = 1, up = 0 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 30) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (rnd(i, 3) - 0.5) * 2;
    const k = Math.min(1, lf / 26);
    const d = (34 + rnd(i, 4) * 96) * s;
    return (
      <div key={"pf" + i} style={{ position: "absolute",
        left: x + a * d * k - 16 * s, top: y - (up * k) - rnd(i, 5) * 40 * s * k - 16 * s,
        width: (26 + rnd(i, 6) * 34) * s * (0.5 + k), height: (26 + rnd(i, 6) * 34) * s * (0.5 + k),
        borderRadius: "50%", background: hexa(c, 0.40 * (1 - k)), zIndex: z }} />
    );
  })}</>);
};

/** a soft pool of practical light on the floor — matte, never an emissive blur */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; hh?: number }> =
  ({ x, y, w: ww, c = "#F2E0B4", o = 0.22, z = 18, hh }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww,
    height: hh ?? ww * 0.30, borderRadius: "50%", zIndex: z,
    background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, o)} 0%, ${hexa(c, 0)} 100%)` }} />
);

/** ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART OF THE HERO (§11). */
export const Steam: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  z?: number; s?: number; c?: string; rate?: number }> =
  ({ x, y, f, at, n = 7, z = 62, s = 1, c = "#E8E0D0", rate = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = ((lf * rate * 0.05) + rnd(i, 8)) % 1;
    const side = i % 2 ? 1 : -1;
    return (
      <div key={"st" + i} style={{ position: "absolute",
        left: x + side * (26 + t * 42) * s + Math.sin(t * 7 + i) * 12 * s,
        top: y - t * 128 * s,
        width: (13 + t * 34) * s, height: (13 + t * 34) * s, borderRadius: "50%",
        background: hexa(c, 0.36 * (1 - t)), zIndex: z }} />
    );
  })}</>);
};

/* =========================================================================
   THE CAST
   ====================================================================== */

/** ⛔ ALL TWELVE COSTUME LEVERS, CYCLED DETERMINISTICALLY (never random — a
    re-render must be identical). Reel 107 shipped four and was told so. */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { glasses: 1 }, { chef: 1 }, { beard: 1 }, { girl: 1 }, { fro: 1 },
  { suit: 1 }, { prof: 1 }, { cop: 1 }, { wizard: 1 }, { samurai: 1 }, { stern: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/** ⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE — four loops chosen by index,
    each on its own phase and rate, so a crowd does four things at once.
    ⛔ AND AN ACTION LOOP IS NOT A SCENE. This is what the floor does WHILE the
    scene happens; the scene still owes §2's four-part event. */
export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; at?: number; loop?: number; tint?: string; flip?: boolean; cheer?: number }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false, cheer: cheerIn = 0 }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) {                                  /* PACE */
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {                           /* WORK — a real swinging arm */
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {                           /* HOP */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else {                                        /* LOOK */
    gaze = Math.sin(f / 21 + ph) * 1.0;
    rot = Math.sin(f / 21 + ph) * 4.2;
    nod = 5.2;
  }
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy, width: size,
      height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f + i * 9} size={size} gaze={gaze} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={Math.max(cheer, cheerIn)} tint={tint} {...costumeFor(i)} />
    </div>
  );
};

/** ⭐⭐ THE HERO. §12: name what the CLAUDE DOES. `strain` drives a real
    DEFORMATION, `drive` is a whole-body move with DISTANCE, and past halfway a
    FAST SMALL TREMBLE — the opposite of a slow sway — says effort.
    ⭐⭐⭐ AND THE HERO HAS AN ACTION LOOP TOO (reel 115 §14): its amplitude
    scales to zero as drive/strain rise, so an authored beat always wins and the
    loop only fills the gaps. A breathing idle sits under all four at the
    measured 4.6px / 2.6deg floor at which an idle actually READS. */
export const Hero: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  drive?: number; strain?: number; flip?: boolean; costume?: Record<string, number>;
  gaze?: number; cheer?: number; reach?: number; tint?: string; shock?: number;
  stern?: number; pop?: number; act?: number; ph?: number; lift?: number }> =
  ({ f, x, y, size, z = 56, drive = 0, strain = 0, flip = false, costume = { constr: 1 },
     gaze = 0, cheer = 0, reach = 96, tint, shock = 0, stern = 0, pop = 1,
     act = 1, ph = 0, lift = 0 }) => {
  const beat = Math.min(1, Math.max(Math.abs(drive), strain) * 1.7);
  const k = 1 - beat;
  let ax = 0, ay = 0, ar = 0, aGaze = 0, aCheer = 0;
  if (act === 0) {
    ax = Math.sin(f / 17 + ph) * size * 0.20 * k;
    ay = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.042 * k;
    ar = Math.cos(f / 17 + ph) * 3.2 * k;
  } else if (act === 1) {
    ar = (4.5 + Math.sin(f / 6.2 + ph) * 6.5) * k;
    ay = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.038 * k;
    ax = Math.sin(f / 6.2 + ph) * size * 0.048 * k;
  } else if (act === 2) {
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    ay = -j * size * 0.19 * k; aCheer = j > 0.55 ? k : 0;
    ar = Math.sin(f / 26 + ph) * 2.6 * k;
  } else {
    aGaze = Math.sin(f / 21 + ph) * 1.0 * k;
    ar = Math.sin(f / 21 + ph) * 4.0 * k;
  }
  ay += Math.sin(f / 23 + ph) * 4.6 * k;
  ar += Math.sin(f / 31 + ph * 1.7) * 1.3 * k;

  const tremble = strain > 0.5 ? Math.sin(f * 1.9) * 3.4 * (strain - 0.5) * 2 : 0;
  const sy = 1 - strain * 0.16;
  const sx = 1 + strain * 0.12;
  const dx = (flip ? -1 : 1) * (drive * reach + ax) + tremble;
  const dy = strain * size * 0.05 + ay - lift;
  const rot = (flip ? -1 : 1) * (drive * 7 - strain * 2 + ar);
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${sx * pop * (flip ? -1 : 1)}, ${sy * pop}) rotate(${rot}deg)`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={size} gaze={gaze + aGaze} nodAmp={2.6 + strain * 2 + k * 1.4}
        nodSpeed={10} cheer={Math.max(cheer, aCheer)} tint={tint} shock={shock}
        stern={stern} {...costume} />
    </div>
  );
};

/** ⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY. `Mascot` draws its own arms; the
    only limb geometry that survives is a forearm that STARTS on the mascot's own
    arm and ENDS on the thing it holds. A limb terminating in mid-air is a TAIL. */
export const Forearm: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  w?: number; c?: string; z?: number }> =
  ({ x0, y0, x1, y1, w = 22, c = "#C4674A", z = 58 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      borderRadius: w / 2, zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.22)} 100%)` }}>
      <div style={{ position: "absolute", right: -w * 0.10, top: -w * 0.08, width: w * 1.05,
        height: w * 1.08, borderRadius: "42%", background: dkh(c, 0.10) }} />
    </div>
  );
};
