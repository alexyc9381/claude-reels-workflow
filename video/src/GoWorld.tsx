import React from "react";
import { Img, staticFile } from "remotion";
import { MONO, Mascot } from "./SlopKit";
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
   REEL 113 · "GO" — THE WORLD KIT.  Board: storyboards/113-go.md.

   Subject: nidhinjs/prompt-master — a free MIT Claude SKILL that turns a messy
   brain dump into a precise prompt carrying an output spec, a file scope and a
   stop condition. 11,415 stars, verified live 2026-08-19.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS.
      [[feedback_real_marks_are_the_props]] has burned three reels. The free,
      literal object here is that **a prompt is a WORK ORDER**: the skill's own
      output is a dimensioned spec with a scope boundary and a `Done When`
      block, and its README's thesis is that every word must be *load-bearing*,
      which is a drafting phrase. So the world is a JOB SHOP — a shop that makes
      one-off parts to a written order — and the hero artifact is the SPEC
      SHEET the press prints. Nothing here is a glowing generic box.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below). Every
      figure the picture is allowed to state lives here, so no scene can invent
      one. Checked live 2026-08-19 against the repo and its README.

   ⛔⛔⛔ THE THREE THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1. NO MONEY ON SCREEN, EVER. The VO says "way fewer retries" and "double
         the tokens" and never names a figure; the repo publishes no benchmark.
         The receipt drawn is the PART COUNT PER ORDER (4 -> 1), which is what
         "fewer retries" literally means. Guard: MONEY_BANNED.
      2. NO PERCENTAGE, NO TOKEN COUNT, NO "SAVES N%". Drawing one would be
         inventing a result the repo does not claim. Guard: RATE_BANNED.
      3. NUMBERS ARE DRAWN EXACT WHERE THE VO UNDERSTATES. VO "over 11,000" ->
         draw 11,415. VO "30 plus" -> draw 35. An understated VO number is safe
         to draw exactly; a DIFFERENT one is not (reel 111). Guard: COUNT_BANNED
         blocks the rounded forms so the plate must carry the real figure.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that must return 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70% (reel 109 merged three
      titans into one black bar by trusting the algebra). Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (reel 109). Anything under
      ~40px on its short side vanishes in the audit's 1012->240 downsample and
      reads as nothing to a human either.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* ---- the palette ---------------------------------------------------------
   Clay is the house colour and it is also, conveniently, the colour of hot
   steel and oxide — so the villain's scrap and the hero's parts share a family
   and the reel is separated by LIGHT rather than by hue. */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const OXIDE = "#8C4A2E", BRASS = "#C9A15A";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Verified live 2026-08-19 against
   github.com/nidhinjs/prompt-master and its README.
   ====================================================================== */
export const R = {
  repo: "nidhinjs/prompt-master",
  stars: 11415,          /* live API value. VO says "over 11,000" — an
                            understated VO number is safe to draw EXACTLY. */
  starsText: "11,415",
  license: "MIT",        /* spdx_id: MIT, LICENSE file present */
  patterns: 35,          /* README: "35 Credit-Killing Patterns Detected",
                            7 task + 6 context + 6 format + 6 scope + 5
                            reasoning + 5 agentic. VO says "30 plus". */
  templates: 12,         /* README: "12 Prompt Templates (Auto-Selected)" */
  dimensions: 9,         /* README: "Extracts 9 dimensions of intent" */
  retriesBefore: 4,      /* VO: "you burn THREE more messages" = 4 attempts */
  retriesAfter: 1,
  setupSteps: 3,         /* README install: download ZIP / claude.ai Customize
                            > Skills / Upload a Skill */
  kind: "SKILL",         /* it is a Claude SKILL — not a plugin, not an MCP
                            server, not an app. The word on the plate. */
  /* the four things the sheet carries, from the README's own Claude Code row:
     "Stop conditions, file scope, checkpoint output" + the worked example's
     Objective / Design Spec / Constraints / Done When */
  callouts: ["OUTPUT", "FILES", "STOP", "MEMORY"] as const,
} as const;

/** ⛔ nothing in this reel may put money on screen. The repo publishes no cost
    figure and the VO names none — a dollar sign here would be an invented
    result, which is the single failure this ledger exists to prevent. */
export const MONEY_BANNED = ["$", "USD", "SAVED", "/mo", "PRICE", "COST"] as const;
/** ⛔ nor a rate, a percentage or a token count — same reason. */
export const RATE_BANNED = ["%", "TOKENS SAVED", "50%", "2X CHEAPER", "CREDITS SAVED"] as const;
/** ⛔ the ROUNDED forms are banned so the plate must carry the real figure. */
export const COUNT_BANNED = ["11,000", "11K", "30 WAYS", "30+"] as const;

/* =========================================================================
   THE EIGHT PLACES. A new light AND colour every 2-4s
   (`feedback_reel_vary_the_locations`), and neighbouring scenes differ by BOTH
   hue and lightness.

   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE (ANIMATION-QUALITY §8).
   Body scenes target luma 70-105, saturated pixels 34-45%, black point p10
   <= 35. `scrap` is the hook set and carries the bar; every other set keeps
   its dark stop, because HIERARCHY NEEDS DARKNESS and brightness is the MEAN
   while hierarchy is the SPREAD.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE SCRAP FLOOR, hook. The mound is a near-black mass; the flood
     pool, the cream tally and the lit floor carry the mean over 140 without
     the dark stop being touched (reel 109's fix, restated). */
  scrap:   { back: "#8A6E52", back2: "#4E3D28", floor: "#B8946C", floor2: "#7E6248",
             lip: "#D6AC7C", key: "#FFF2D6", horizon: 500, grit: "#F0D7B4" },

  /* S3 — the same floor RELIT FROM THE OTHER SIDE and a full stop down. It is
     the reel's low point and the only repeated set, so it must not read as a
     copy: the key swings to camera-right and the whole family goes colder. */
  scrap2:  { back: "#463A33", back2: "#1E1815", floor: "#4E4036", floor2: "#221B15",
             lip: "#6A5546", key: "#E8B87A", horizon: 528, grit: "#A88A68" },

  /* S1/S4/S5 — THE PRESS BAY. Warm gold, cream bounce. This is where the
     transformation happens and it is the warmest family in the reel. */
  press:   { back: "#5A4526", back2: "#2E2213", floor: "#6A5330", floor2: "#3A2C18",
             lip: "#8E6F3E", key: "#F0C979", horizon: 552, grit: "#C9A468" },

  /* S5 — the same bay one stop DOWN and tighter, so the cream sheet is what
     brightens the frame rather than the palette. */
  press2:  { back: "#4A3820", back2: "#241A0E", floor: "#57431F", floor2: "#2C2011",
             lip: "#7A5C33", key: "#F5D690", horizon: 536, grit: "#B99356" },

  /* S2 — THE SPEC PLATE, outside at night. The reel's only COLD scene and its
     biggest value spread: a steel-blue yard with one warm work lamp. */
  yard:    { back: "#2A3B4E", back2: "#101A26", floor: "#2E3F52", floor2: "#121C27",
             lip: "#46617C", key: "#CFE2F0", horizon: 540, grit: "#7F98B0" },

  /* S6/S7 — THE INTAKE DOCK. Flat bright daylight through an open roller
     door: the brightest set in the reel and the only daylight one, so the
     setup section separates hard from the gold on both sides. */
  dock:    { back: "#5E8296", back2: "#233A48", floor: "#4E7285", floor2: "#1A2C37",
             lip: "#8FBBD0", key: "#FFFFFF", horizon: 556, grit: "#A8CCDD" },

  /* S8 — THE INSPECTION BAY. Red raking lamp on a wall of bad orders. The most
     saturated frame in the reel; this is where BODY_SAT is bought back. */
  insp:    { back: "#5A2320", back2: "#2A0E0D", floor: "#4E211C", floor2: "#240C0A",
             lip: "#7E3226", key: "#FF9E7A", horizon: 546, grit: "#B05A44" },

  /* S9 — THE CARD RAIL. Green signal glow running the rail itself, so the
     light source and the mechanism are the same object. */
  rail:    { back: "#1C3D34", back2: "#0C1D19", floor: "#1E4038", floor2: "#0D201B",
             lip: "#2E6B58", key: "#8FE0BC", horizon: 520, grit: "#5F9E86" },

  /* S10/S11 — THE OUTPUT FLOOR. Bright, even, near shadowless: relief after
     the red and the green, and the reel's second brightest set. */
  out:     { back: "#C08159", back2: "#54301C", floor: "#C98A5E", floor2: "#54301C",
             lip: "#E8B189", key: "#FFF3DC", horizon: 548, grit: "#EDC59A" },

  /* S12/S13 — THE COUNTER. Warm practical over the counter, cool street spill
     behind it: the strongest depth in the reel. */
  counter: { back: "#3E3448", back2: "#1B1622", floor: "#4A3C34", floor2: "#241C17",
             lip: "#6E5A46", key: "#F6CE8E", horizon: 532, grit: "#A98C6C" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* ---- helpers -------------------------------------------------------------
   ⭐⭐⭐ `mxh()` BUYS LUMA BY SPENDING SATURATION, AND BOTH ARE GATED (reel
   111). Brightening a mid-tone panel toward white lifts luma and kills
   BODY_SAT. `vivid()` lifts the TOP channel and pushes the BOTTOM one DOWN, so
   it buys value WITHOUT flattening the paint. */
export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const hi = Math.max(...c), lo = Math.min(...c);
  const out = c.map(v => {
    if (v === hi) return Math.min(255, Math.round(v + (255 - v) * k));
    if (v === lo) return Math.max(0, Math.round(v * (1 - k * 0.55)));
    return v;
  });
  return `#${out.map(v => v.toString(16).padStart(2, "0")).join("")}`;
};
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ⭐⭐⭐ THE RAKE — the travelling band that keeps every scene alive.

   ⛔⛔ IT MUST ALTERNATE LIGHT AND SHADOW. Reel 106's light-only version
   scored 7.79 AND lifted the black point 47.4 -> 56.1, i.e. it "fixed" motion
   by doing the exact thing §8 exists to ban. Interleaving a dark band fixed
   both at once: 9.92 with the black point back DOWN.

   ⭐⭐⭐ AND IT TRADES TWO SEPARABLE THINGS (reel 109). What makes a band read
   as WALLPAPER is the HARD EDGE. What makes it MEASURE is SWEPT AREA x SPEED.
   So: keep the feathering (soft edges, light falling through a room), keep the
   width, and take the motion back through SPEED at the call site. Narrowing
   them cost reel 109 1.6 median points across every scene.
   ====================================================================== */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; o?: number; rate?: number; z?: number; ang?: number }> =
  ({ f, y, h, x0 = -260, span = 1560, n = 7, c = "#FFE7BE", o = 0.30, rate = 3.4, z = 22, ang = -13 }) => {
  const pitch = span / n;
  return (<div style={{ position: "absolute", left: 0, right: 0, top: y, height: h, zIndex: z,
    overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n * 2 }, (_, i) => {
      const dark = i % 2 === 1;
      const x = x0 + ((i * pitch * 0.5 + f * rate) % span);
      return (<div key={"rk" + i} style={{ position: "absolute", left: x, top: -h * 0.5,
        width: pitch * 0.46, height: h * 2, transform: `rotate(${ang}deg)`,
        /* feathered, never hard-edged — a hard bar reads as a graphic laid over
           the room; a feathered one reads as light falling through it */
        background: dark
          ? `linear-gradient(90deg, ${hexa("#000000", 0)} 0%, ${hexa("#000000", o * 0.62)} 46%, ${hexa("#000000", 0)} 100%)`
          : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 48%, ${hexa(c, 0)} 100%)` }} />);
    })}
  </div>);
};

/** an expanding ring — every arrival gets one. Nothing lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  r?: number; z?: number; w?: number }> =
  ({ x, y, f, at, c = "#FFE7BE", r = 150, z = 62, w = 7 }) => {
  const t = E(f, at, at + 15, 0, 1, OUT);
  if (f < at || t >= 1) return null;
  const rr = r * t;
  return (<div style={{ position: "absolute", left: x - rr, top: y - rr * 0.42, width: rr * 2,
    height: rr * 0.84, borderRadius: "50%", zIndex: z, opacity: (1 - t) * 0.85,
    border: `${w * (1 - t * 0.6)}px solid ${c}` }} />);
};

/** dust squeezed out of an impact. Oxide-coloured, because this is a metal shop. */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  n?: number; s?: number; z?: number; spread?: number }> =
  ({ x, y, f, at, c = "#C4A176", n = 12, s = 1, z = 60, spread = 1 }) => {
  if (f < at || f > at + 30) return null;
  const lf = f - at;
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + rnd(i, 3) * 0.9;
    const d = E(lf, 0, 24, 0, 1, OUT) * (60 + rnd(i, 7) * 90) * s * spread;
    const g = lf * lf * 0.06;
    const sz = (16 + rnd(i, 11) * 22) * s;
    return (<div key={"pf" + i} style={{ position: "absolute",
      left: x + Math.cos(a) * d - sz / 2, top: y + Math.sin(a) * d * 0.42 - sz / 2 + g,
      width: sz, height: sz, borderRadius: "50%", background: c, zIndex: z,
      opacity: Math.max(0, 0.5 - lf / 34) }} />);
  })}</>);
};

/** a floor light pool — a practical, never an emissive blur. */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; h?: number }> =
  ({ x, y, w, c = "#FFE7BE", o = 0.30, z = 18, h }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - (h ?? w * 0.30) / 2,
    width: w, height: h ?? w * 0.30, borderRadius: "50%", zIndex: z,
    background: `radial-gradient(circle, ${hexa(c, o)} 0%, ${hexa(c, o * 0.34)} 46%, ${hexa(c, 0)} 72%)` }} />
);

/* =========================================================================
   THE PROPS.

   ⭐⭐⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES
   ([[feedback_props_need_real_drawing]]). *"A whole lot of nothing even though
   there's more stuff"* — the object that drew that note was FOUR divs. Reel
   111's crates went from 9 divs to ~30 (extrusion, ball corners, dished
   latches, a louvred vent, a cable port, a spec plate) and the note went away.
   **Count divs per object BEFORE adding objects.** Detail-per-object and
   object-COUNT are different dials and only one of them was ever turned.
   ====================================================================== */

/** ⛔ A PART IS THE REEL'S UNIT OF WORK and it appears ~40 times, so it gets
    real drawing once: a body, a machined top face, a bore, two fixing holes, a
    chamfered edge, a cast rib and a contact shadow. `wrong` bends the whole
    silhouette — a wrong part is the SCRIBBLE, in steel, which is the S3 beat. */
export const Part: React.FC<{ x: number; y: number; s?: number; wrong?: boolean;
  c?: string; z?: number; rot?: number; o?: number; lit?: number; tag?: boolean;
  /** ⛔ 0 block · 1 angle bracket · 2 flange ring · 3 long bar. A heap of ONE
      silhouette repeated is a stack of chocolate bars; scrap is recognised by
      its varied outline before any of its surface detail is read. */
  kind?: number }> =
  ({ x, y, s = 1, wrong = false, c = STEEL, z = 40, rot = 0, o = 1, lit = 1, tag = false, kind = 0 }) => {
  const w = (kind === 3 ? 176 : kind === 2 ? 104 : 120) * s;
  const h = (kind === 3 ? 58 : kind === 2 ? 104 : 84) * s;
  const face = mxh(c, 0.20 * lit), side = dkh(c, 0.34), top = mxh(c, 0.40 * lit);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg)` }}>
      {/* 1 contact shadow */}
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.86, width: w * 0.88,
        height: h * 0.22, borderRadius: "50%", background: hexa("#100C08", 0.34) }} />
      {/* 2 extruded side */}
      <div style={{ position: "absolute", left: 0, top: h * 0.22, width: w, height: h * 0.66,
        borderRadius: 8 * s, background: side,
        transform: wrong ? "skewX(-9deg) rotate(4deg)" : undefined }} />
      {/* 3 body face */}
      <div style={{ position: "absolute", left: 0, top: h * 0.10, width: w, height: h * 0.66,
        borderRadius: 8 * s, background: face, border: `${2.5 * s}px solid ${dkh(c, 0.46)}`,
        transform: wrong ? "skewX(-9deg) rotate(4deg)" : undefined }} />
      {/* 4 machined top face */}
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.13, width: w * 0.88,
        height: h * 0.20, borderRadius: 5 * s, background: top,
        transform: wrong ? "skewX(-9deg) rotate(4deg)" : undefined }} />
      {/* 4b the ANGLE BRACKET's upstand — the shape that makes a heap read as scrap */}
      {kind === 1 && (<>
        <div style={{ position: "absolute", left: w * 0.02, top: -h * 0.52, width: w * 0.30,
          height: h * 0.72, borderRadius: 6 * s, background: side,
          border: `${2.5 * s}px solid ${dkh(c, 0.46)}` }} />
        <div style={{ position: "absolute", left: w * 0.06, top: -h * 0.44, width: w * 0.20,
          height: w * 0.10, borderRadius: "50%", background: dkh(c, 0.30) }} />
      </>)}
      {/* 4c the FLANGE RING — a disc with a big centre bore and six bolt holes */}
      {kind === 2 && (<>
        <div style={{ position: "absolute", left: 0, top: h * 0.06, width: w, height: w,
          borderRadius: "50%", background: face, border: `${3 * s}px solid ${dkh(c, 0.46)}` }} />
        <div style={{ position: "absolute", left: w * 0.28, top: h * 0.34, width: w * 0.44,
          height: w * 0.44, borderRadius: "50%", background: dkh(c, 0.34) }} />
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (<div key={"bh" + i} style={{ position: "absolute",
            left: w * 0.5 + Math.cos(a) * w * 0.35 - w * 0.05,
            top: h * 0.06 + w * 0.5 + Math.sin(a) * w * 0.35 - w * 0.05,
            width: w * 0.10, height: w * 0.10, borderRadius: "50%", background: dkh(c, 0.28) }} />);
        })}
      </>)}
      {/* 5 the bore */}
      {kind !== 2 && <div style={{ position: "absolute", left: w * 0.40, top: h * 0.34, width: w * 0.20,
        height: w * 0.20, borderRadius: "50%", background: dkh(c, 0.34),
        border: `${2 * s}px solid ${mxh(c, 0.46)}` }} />}
      {/* 6,7 two fixing holes */}
      {[0.16, 0.72].map((fx, i) => (
        <div key={"fh" + i} style={{ position: "absolute", left: w * fx, top: h * 0.42,
          width: w * 0.10, height: w * 0.10, borderRadius: "50%", background: dkh(c, 0.30) }} />
      ))}
      {/* 8 a cast rib across the face */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.62, width: w * 0.80,
        height: 5 * s, borderRadius: 3 * s, background: dkh(c, 0.22) }} />
      {/* 9 the chamfer highlight */}
      <div style={{ position: "absolute", left: w * 0.04, top: h * 0.11, width: w * 0.92,
        height: 3.5 * s, borderRadius: 2 * s, background: mxh(c, 0.62), opacity: 0.85 * lit }} />
      {/* 10 wrong parts carry a bent tail — the scribble made solid */}
      {wrong && (
        <div style={{ position: "absolute", left: w * 0.74, top: h * 0.02, width: w * 0.40,
          height: h * 0.34, borderRadius: 7 * s, background: side,
          border: `${2.5 * s}px solid ${dkh(c, 0.46)}`, transform: "rotate(-31deg)" }} />
      )}
      {/* 11 the shop tag, when this part is being called out */}
      {tag && (
        <div style={{ position: "absolute", left: w * 0.20, top: h * 0.92, width: w * 0.72,
          height: h * 0.30, borderRadius: 4 * s, background: CREAMB,
          border: `${2 * s}px solid ${dkh(CREAMB, 0.28)}` }} />
      )}
    </div>
  );
};

/* =========================================================================
   ⛔⛔ THE VILLAIN'S PRODUCT — THE SCRAP MOUND.

   ANIMATION-QUALITY §1: *"small props never add up, however many you add"*,
   and §8's depth check: *"is there a mass cropped by the panel edge, in front
   of the action?"* The mound is BOTH answers — it is one colossal mass built
   from 38 real parts, cropped by both side edges and the floor, and it is the
   thing the hook's whole claim rests on.

   ⭐ Its own VALUE is lifted to ~0.36 rather than left near-black (reel 109):
   a ~92-luma mound against a ~205-luma cream tally is still the biggest spread
   in the reel, and frame 0 clears the 140 bar without the palette's dark stop
   being touched.
   ====================================================================== */
export const ScrapMound: React.FC<{ x: number; y: number; w: number; f: number;
  grown?: number; z?: number; c?: string; lit?: number; jolt?: number }> =
  ({ x, y, w, f, grown = 0, z = 34, c = OXIDE, lit = 1, jolt = 0 }) => {
  const N = 38;
  const rk = jolt ? rock(f, jolt, 7.0, 26) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - w * 0.62, width: w,
      height: w * 0.78, zIndex: z, transform: `rotate(${rk * 0.12}deg) translateY(${rk * 0.5}px)`,
      transformOrigin: "50% 100%" }}>
      {/* the mass itself — a broad shadowed heap the parts sit in, so the pile
          reads as VOLUME and not as a scatter of separate objects */}
      <div style={{ position: "absolute", left: w * 0.05, top: w * 0.40, width: w * 0.90,
        height: w * 0.36,
        borderRadius: `${w * 0.46}px ${w * 0.46}px ${w * 0.05}px ${w * 0.05}px`,
        background: `linear-gradient(174deg, ${mxh(c, 0.24 * lit)} 0%, ${dkh(c, 0.40)} 100%)` }} />
      {Array.from({ length: N }, (_, i) => {
        const grow = i / N;
        /* the last `grown` fraction of the heap only exists once it has been fed */
        const on = grow < 0.64 + grown * 0.36 ? 1 : 0;
        if (!on) return null;
        const a = rnd(i, 2), b = rnd(i, 5), d = rnd(i, 9);
        /* a pile is a triangle: the higher a piece sits, the narrower the band
           it can sit in. This is what stops it reading as a rectangle of junk. */
        const ty = 0.20 + Math.sqrt(a) * 0.56;   /* sqrt biases pieces DOWN, so the
                                                     base is crowded and the apex
                                                     is sparse and pointed */
        const spread = 0.5 - (0.80 - ty) * 0.52;
        const tx = 0.5 + (b - 0.5) * spread * 2;
        /* the pieces that arrive DURING the scene settle in, so growth reads
           as an event rather than a state change */
        const fresh = grow >= 0.64 ? Math.max(0, 1 - (grow - 0.64 - grown * 0.36) * -26) : 1;
        const settle = Math.min(1, fresh);
        return (
          <Part key={"sc" + i} x={w * tx} y={w * ty - (1 - settle) * 90} s={w / 1100 * (1.05 + d * 0.55) * (0.6 + settle * 0.4)}
            c={i % 4 === 0 ? mxh(c, 0.22) : i % 2 === 0 ? STEEL : i % 3 === 0 ? mxh(STEEL, 0.24) : c}
            wrong={i % 5 === 0} kind={i % 4} rot={-40 + d * 80} z={20 + i}
            lit={0.66 + a * 0.62 * lit} />
        );
      })}
      {/* the near rim, cropped — the piece that makes it a MASS not a picture */}
      <div style={{ position: "absolute", left: -w * 0.06, top: w * 0.70, width: w * 1.12,
        height: w * 0.16, borderRadius: `${w * 0.4}px ${w * 0.4}px 0 0`, zIndex: 70,
        background: `linear-gradient(180deg, ${dkh(c, 0.40)} 0%, ${dkh(c, 0.72)} 100%)` }} />
    </div>
  );
};

/* =========================================================================
   ⛔⛔ THE VILLAIN — THE SCRAP CHUTE. Its RULE: it is fed in S0, S3 and S8, it
   is still open in S10's before-state, and it loses EXACTLY ONCE, at the peak,
   when a part travels past it and its shutter drops. It never loses early.
   ====================================================================== */
export const Chute: React.FC<{ x: number; y: number; s?: number; f: number; z?: number;
  /** frame the shutter starts to drop; undefined = open all scene */
  shut?: number; /** frames the bell rings on */ rings?: number[]; c?: string }> =
  ({ x, y, s = 1, f, z = 44, shut, rings = [], c = "#6E6A63" }) => {
  const w = 300 * s, h = 340 * s;
  const close = shut === undefined ? 0 : E(f, shut, shut + 9, 0, 1, IN_Q);
  const bounce = shut === undefined ? 0 : rock(f, shut + 9, 3.4, 18);
  /* the bell swings on every ring and keeps swinging for ~20f after */
  const last = rings.filter(r => f >= r).slice(-1)[0];
  const swing = last === undefined ? Math.sin(f / 41) * 1.4
    : Math.sin((f - last) / 2.2) * 17 * Math.exp(-(f - last) / 13) + Math.sin(f / 41) * 1.4;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h * 0.5, width: w, height: h, zIndex: z }}>
      {/* 1 the throat's back plate */}
      <div style={{ position: "absolute", left: 0, top: h * 0.16, width: w, height: h * 0.70,
        background: dkh(c, 0.52), borderRadius: 6 * s }} />
      {/* 2,3 the two flared cheeks */}
      {[-1, 1].map(k => (
        <div key={"ck" + k} style={{ position: "absolute",
          left: k < 0 ? -w * 0.10 : w * 0.76, top: h * 0.10, width: w * 0.34, height: h * 0.80,
          background: `linear-gradient(${k < 0 ? 96 : 84}deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.30)} 100%)`,
          borderRadius: 8 * s, transform: `skewY(${k * 7}deg)`,
          border: `${3 * s}px solid ${dkh(c, 0.46)}` }} />
      ))}
      {/* 4 the mouth — the dark the parts vanish into */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.30, width: w * 0.80,
        height: h * 0.50, borderRadius: 5 * s, background: "#0B0A08" }} />
      {/* 5..10 six ribs across the throat */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: w * 0.06, top: h * (0.22 + i * 0.11),
          width: w * 0.88, height: 7 * s, borderRadius: 4 * s, background: dkh(c, 0.24),
          opacity: 0.9 }} />
      ))}
      {/* 11 THE SHUTTER — the villain's death, and it lands with weight */}
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.24,
        width: w * 0.88, height: h * 0.56 * close, borderRadius: 4 * s,
        transform: `translateY(${bounce}px)`,
        background: `repeating-linear-gradient(180deg, ${mxh(c, 0.28)} 0px, ${mxh(c, 0.28)} ${13 * s}px, ${dkh(c, 0.18)} ${13 * s}px, ${dkh(c, 0.18)} ${26 * s}px)`,
        borderBottom: close > 0.02 ? `${6 * s}px solid ${dkh(c, 0.60)}` : undefined }} />
      {/* 12,13 the bell and its yoke — the villain's signature */}
      <div style={{ position: "absolute", left: w * 0.36, top: -h * 0.04, width: w * 0.28,
        height: 8 * s, background: dkh(c, 0.40), borderRadius: 4 * s }} />
      <div style={{ position: "absolute", left: w * 0.40, top: h * 0.01, width: w * 0.20,
        height: w * 0.20, borderRadius: `${w * 0.1}px ${w * 0.1}px ${w * 0.05}px ${w * 0.05}px`,
        background: `linear-gradient(160deg, ${BRASS} 0%, ${dkh(BRASS, 0.44)} 100%)`,
        border: `${2.5 * s}px solid ${dkh(BRASS, 0.30)}`,
        transformOrigin: "50% 0%", transform: `rotate(${swing}deg)` }} />
      {/* 14 the frame lip, in front */}
      <div style={{ position: "absolute", left: -w * 0.06, top: h * 0.78, width: w * 1.12,
        height: h * 0.16, borderRadius: 6 * s, zIndex: 20,
        background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.56)} 100%)` }} />
    </div>
  );
};

/* =========================================================================
   THE MILL — the machine that does exactly what the order says. It is not a
   character: it is obedient, and that is the point of S3.
   ====================================================================== */
export const Mill: React.FC<{ x: number; y: number; s?: number; f: number; z?: number;
  c?: string; mark?: boolean; spin?: number; head?: number; foreign?: boolean }> =
  ({ x, y, s = 1, f, z = 36, c = "#5E6068", mark = true, spin = 0.7, head = 0, foreign = false }) => {
  const w = 440 * s, h = 400 * s;
  const body = foreign ? "#6B8AA6" : c;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h * 0.72, width: w, height: h, zIndex: z }}>
      {/* 1 contact shadow */}
      <div style={{ position: "absolute", left: w * 0.02, top: h * 0.90, width: w * 0.96,
        height: h * 0.14, borderRadius: "50%", background: hexa("#0C0A07", 0.40) }} />
      {/* 2 the base casting */}
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.62, width: w * 0.88, height: h * 0.32,
        borderRadius: 10 * s, background: `linear-gradient(178deg, ${mxh(body, 0.14)} 0%, ${dkh(body, 0.48)} 100%)`,
        border: `${3 * s}px solid ${dkh(body, 0.56)}` }} />
      {/* 3 the column */}
      <div style={{ position: "absolute", left: foreign ? w * 0.10 : w * 0.62, top: h * 0.06,
        width: w * 0.28, height: h * 0.62, borderRadius: 8 * s,
        background: `linear-gradient(94deg, ${mxh(body, 0.22)} 0%, ${dkh(body, 0.36)} 100%)`,
        border: `${3 * s}px solid ${dkh(body, 0.52)}` }} />
      {/* 4 the overarm */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.08, width: w * 0.80, height: h * 0.13,
        borderRadius: 7 * s, background: mxh(body, 0.08), border: `${3 * s}px solid ${dkh(body, 0.50)}` }} />
      {/* 5 the cutter head — travels on `head` */}
      <div style={{ position: "absolute", left: w * (foreign ? 0.52 : 0.20) + head, top: h * 0.20,
        width: w * 0.16, height: h * 0.22, borderRadius: 5 * s,
        background: `linear-gradient(180deg, ${mxh(body, 0.34)} 0%, ${dkh(body, 0.20)} 100%)`,
        border: `${2.5 * s}px solid ${dkh(body, 0.54)}` }}>
        {/* 6 the spinning tool */}
        <div style={{ position: "absolute", left: "34%", top: "82%", width: "32%", height: h * 0.10,
          background: `linear-gradient(180deg, ${STEEL} 0%, ${mxh(STEEL, 0.5)} 100%)`,
          transform: `scaleX(${0.6 + Math.abs(Math.sin(f * 0.9)) * 0.6})` }} />
      </div>
      {/* 7 the bed */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.55, width: w * 0.80, height: h * 0.11,
        borderRadius: 5 * s, background: `linear-gradient(180deg, ${mxh(body, 0.40)} 0%, ${dkh(body, 0.10)} 100%)`,
        border: `${2.5 * s}px solid ${dkh(body, 0.48)}` }} />
      {/* 8..12 five T-slots in the bed */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"ts" + i} style={{ position: "absolute", left: w * (0.14 + i * 0.155), top: h * 0.57,
          width: w * 0.05, height: h * 0.07, borderRadius: 2 * s, background: dkh(body, 0.46) }} />
      ))}
      {/* 13,14 two coolant lines */}
      {[0, 1].map(i => (
        <div key={"cl" + i} style={{ position: "absolute", left: w * (0.30 + i * 0.30), top: h * 0.22,
          width: 6 * s, height: h * 0.32, background: dkh(body, 0.30), borderRadius: 3 * s,
          transform: `rotate(${i ? 5 : -6}deg)` }} />
      ))}
      {/* 15 a louvred vent */}
      <div style={{ position: "absolute", left: w * 0.12, top: h * 0.70, width: w * 0.22, height: h * 0.16,
        borderRadius: 4 * s, overflow: "hidden", background: dkh(body, 0.56) }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"lv" + i} style={{ position: "absolute", left: 0, right: 0, top: i * h * 0.032 + 3,
            height: h * 0.018, background: mxh(body, 0.16) }} />
        ))}
      </div>
      {/* 16 the spec plate, cast into the base */}
      <div style={{ position: "absolute", left: w * 0.68, top: h * 0.72, width: w * 0.22, height: h * 0.12,
        borderRadius: 4 * s, background: dkh(body, 0.14), border: `${2 * s}px solid ${dkh(body, 0.50)}` }} />
      {/* 17 THE MARK, turning — the audience filter, cast into the housing */}
      {mark && <MarkCast x={w * (foreign ? 0.72 : 0.30)} y={h * 0.40} s={110 * s} z={30} f={f} spin={spin} o={0.90} />}
    </div>
  );
};

/* =========================================================================
   ⛔⛔ THE HERO ARTIFACT — THE SPEC SHEET. It is what the skill produces, it
   is what the CTA promises, and every other object in the reel exists to hand
   it over or to obey it.

   ⛔⛔⛔ MARKS AND NUMERALS ONLY, NO SENTENCES (ANIMATION-QUALITY §4). Reel 109
   PASSED EVERY GATE and was rejected on 33 `<span>`s in the animation layer.
   *"Animation should not be text. Animation should be magical, interesting,
   stimulating."* So the four callouts are drawn as MECHANISMS — a silhouette
   box, a tag row, a stop block, a memory strip — and the words that name them
   live in the header band and the captions, where words belong.
   ====================================================================== */
export const SpecSheet: React.FC<{ x: number; y: number; w: number; f: number;
  /** frames each of the four callouts inks in on; -1 = never */
  ink?: [number, number, number, number]; z?: number; rot?: number; s?: number;
  o?: number; blank?: boolean }> =
  ({ x, y, w, f, ink = [-1, -1, -1, -1], z = 50, rot = 0, s = 1, o = 1, blank = false }) => {
  const h = w * 1.24;
  const A = ink.map(k => (k < 0 ? 0 : E(f, k, k + 9, 0, 1, OUT)));
  const L2 = Math.max(2, w * 0.007);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg) scale(${s})` }}>
      {/* 1 the sheet's drop shadow */}
      <div style={{ position: "absolute", left: w * 0.03, top: h * 0.03, width: w, height: h,
        borderRadius: 6, background: hexa("#100C08", 0.34) }} />
      {/* 2 the sheet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, background: PAPER,
        border: `${Math.max(3, w * 0.012)}px solid ${dkh(PAPER, 0.30)}` }} />
      {/* 3 the drawing frame */}
      <div style={{ position: "absolute", left: w * 0.045, top: h * 0.035, right: w * 0.045,
        bottom: h * 0.035, border: `${L2}px solid ${dkh(PAPER, 0.46)}` }} />
      {/* 4 THE BORDER GRADUATIONS — a real drawing sheet is a ruled instrument,
          and this is what stops it reading as a blank page at a glance */}
      {Array.from({ length: 16 }, (_, i) => (
        <React.Fragment key={"gr" + i}>
          <div style={{ position: "absolute", left: w * (0.045 + i * 0.0567), top: h * 0.035,
            width: L2, height: h * 0.018, background: dkh(PAPER, 0.42) }} />
          <div style={{ position: "absolute", left: w * (0.045 + i * 0.0567), bottom: h * 0.035,
            width: L2, height: h * 0.018, background: dkh(PAPER, 0.42) }} />
        </React.Fragment>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <React.Fragment key={"gv" + i}>
          <div style={{ position: "absolute", left: w * 0.045, top: h * (0.05 + i * 0.0755),
            width: w * 0.016, height: L2, background: dkh(PAPER, 0.42) }} />
          <div style={{ position: "absolute", right: w * 0.045, top: h * (0.05 + i * 0.0755),
            width: w * 0.016, height: L2, background: dkh(PAPER, 0.42) }} />
        </React.Fragment>
      ))}
      {!blank && (<>
        {/* 5 CALLOUT 1 — THE OUTPUT VIEW. A dimensioned elevation of the part,
            with its own witness lines and arrows. */}
        <div style={{ position: "absolute", left: w * 0.095, top: h * 0.075, width: w * 0.50,
          height: h * 0.27, opacity: A[0],
          border: `${Math.max(2.5, w * 0.008)}px dashed ${dkh(PAPER, 0.54)}` }}>
          <div style={{ position: "absolute", left: "10%", top: "18%", width: "80%", height: "62%",
            borderRadius: w * 0.016, background: hexa(INK, 0.84) }} />
          <div style={{ position: "absolute", left: "42%", top: "38%", width: "16%", height: "24%",
            borderRadius: "50%", background: PAPER }} />
          {/* two bolt holes on the elevation */}
          {[0.20, 0.70].map((k, i) => (
            <div key={"eh" + i} style={{ position: "absolute", left: `${k * 100}%`, top: "44%",
              width: "10%", height: "14%", borderRadius: "50%", background: PAPER }} />
          ))}
        </div>
        {/* 6 the witness lines + arrows on that view */}
        <div style={{ position: "absolute", left: w * 0.095, top: h * 0.365, width: w * 0.50,
          height: L2 * 1.6, background: dkh(PAPER, 0.54), opacity: A[0] }} />
        {[0.095, 0.585].map((k, i) => (
          <div key={"wl" + i} style={{ position: "absolute", left: w * k, top: h * 0.345,
            width: L2, height: h * 0.042, background: dkh(PAPER, 0.54), opacity: A[0] }} />
        ))}
        <div style={{ position: "absolute", left: w * 0.62, top: h * 0.075, width: L2 * 1.6,
          height: h * 0.27, background: dkh(PAPER, 0.54), opacity: A[0] }} />

        {/* 7 THE SECTION DETAIL, top right — hatched, because a spec sheet has
            more than one view and empty white is what read as "a blank page" */}
        <div style={{ position: "absolute", left: w * 0.68, top: h * 0.075, width: w * 0.225,
          height: h * 0.17, opacity: A[0], overflow: "hidden",
          border: `${L2}px solid ${dkh(PAPER, 0.50)}`, background: dkh(PAPER, 0.05) }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"hx" + i} style={{ position: "absolute", left: -w * 0.10 + i * w * 0.032,
              top: -h * 0.02, width: L2 * 1.3, height: h * 0.24, background: dkh(PAPER, 0.42),
              transform: "rotate(-38deg)" }} />
          ))}
        </div>
        {/* 8 a note block under it — ruled lines, never words */}
        {[0.275, 0.305, 0.335].map((k, i) => (
          <div key={"nb" + i} style={{ position: "absolute", left: w * 0.68, top: h * k,
            width: w * (0.225 - i * 0.05), height: Math.max(3, h * 0.010),
            background: dkh(PAPER, 0.40), opacity: A[0] }} />
        ))}

        {/* 9 CALLOUT 2 — THE FILE TAG ROW: three clamped, six struck through.
            Scope is drawn as the six you may NOT touch. */}
        <div style={{ position: "absolute", left: w * 0.095, top: h * 0.415, width: w * 0.80,
          height: h * 0.155, opacity: A[1], display: "flex", gap: w * 0.017 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"ft" + i} style={{ flex: 1, borderRadius: 3,
              background: i < 3 ? CLAY : dkh(PAPER, 0.14),
              border: `${Math.max(2, w * 0.006)}px solid ${i < 3 ? dkh(CLAY, 0.36) : dkh(PAPER, 0.44)}`,
              position: "relative" }}>
              {/* every tag carries a ruled name line, so the row is not nine blanks */}
              <div style={{ position: "absolute", left: "16%", top: "18%", width: "68%",
                height: Math.max(2.5, w * 0.008), borderRadius: 2,
                background: i < 3 ? hexa("#FFFFFF", 0.62) : dkh(PAPER, 0.36) }} />
              {i >= 3 && (
                <div style={{ position: "absolute", left: "6%", top: "46%", width: "88%",
                  height: Math.max(2.5, w * 0.009), background: dkh(PAPER, 0.58),
                  transform: "rotate(-26deg)" }} />
              )}
            </div>
          ))}
        </div>
        {/* 10 the clamp bar over the three that ARE in scope */}
        <div style={{ position: "absolute", left: w * 0.088, top: h * 0.398, width: w * 0.285,
          height: Math.max(4, h * 0.013), borderRadius: 2, background: CLAYD, opacity: A[1] }} />

        {/* 11 CALLOUT 3 — THE STOP BLOCK on its rail, with a travel dimension */}
        <div style={{ position: "absolute", left: w * 0.095, top: h * 0.605, width: w * 0.80,
          height: h * 0.105, opacity: A[2] }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: "44%",
            height: Math.max(4, w * 0.012), background: dkh(PAPER, 0.50) }} />
          {/* the rail's sleepers */}
          {Array.from({ length: 7 }, (_, i) => (
            <div key={"sl" + i} style={{ position: "absolute", left: `${4 + i * 13}%`, top: "20%",
              width: Math.max(3, w * 0.010), height: "56%", background: dkh(PAPER, 0.30) }} />
          ))}
          <div style={{ position: "absolute", left: "62%", top: 0, width: "17%", height: "100%",
            borderRadius: 3, background: RED, border: `${Math.max(2, w * 0.006)}px solid ${dkh(RED, 0.36)}` }} />
          {[0.655, 0.745].map((k, i) => (
            <div key={"bt" + i} style={{ position: "absolute", left: `${k * 100}%`, top: "28%",
              width: w * 0.022, height: w * 0.022, borderRadius: "50%", background: dkh(RED, 0.52) }} />
          ))}
        </div>

        {/* 12 CALLOUT 4 — THE MEMORY STRIP: bars carried in from the sheet's edge */}
        <div style={{ position: "absolute", left: w * 0.095, top: h * 0.735, width: w * 0.52,
          height: h * 0.105, opacity: A[3], display: "flex", flexDirection: "column",
          justifyContent: "space-between" }}>
          {[0.94, 0.66, 0.82, 0.50].map((k, i) => (
            <div key={"mb" + i} style={{ width: `${k * 100}%`, height: Math.max(5, h * 0.018),
              borderRadius: 2, background: i === 1 ? GREEN : dkh(PAPER, 0.48) }} />
          ))}
        </div>

        {/* 13 THE TITLE BLOCK — three ruled rows and a colour swatch, bottom right */}
        <div style={{ position: "absolute", left: w * 0.655, top: h * 0.735, width: w * 0.245,
          height: h * 0.185, border: `${L2}px solid ${dkh(PAPER, 0.48)}`,
          background: dkh(PAPER, 0.06) }}>
          {[0.28, 0.56, 0.80].map((k, i) => (
            <div key={"tb" + i} style={{ position: "absolute", left: 0, right: 0, top: `${k * 100}%`,
              height: L2, background: dkh(PAPER, 0.42) }} />
          ))}
          <div style={{ position: "absolute", left: "8%", top: "6%", width: "34%", height: "18%",
            background: CLAY, borderRadius: 2 }} />
          {[0.34, 0.62, 0.86].map((k, i) => (
            <div key={"tr" + i} style={{ position: "absolute", left: "8%", top: `${k * 100}%`,
              width: `${44 + i * 16}%`, height: Math.max(2.5, h * 0.008),
              background: dkh(PAPER, 0.40) }} />
          ))}
        </div>
      </>)}
    </div>
  );
};

/** the INPUT: a scrawled order slip. ⛔ The strokes are deliberately illegible —
    they are a DEPICTION of a rough prompt, never readable text, because the
    moment they are readable the shot becomes something to read instead of
    something to watch. */
export const OrderSlip: React.FC<{ x: number; y: number; w: number; f: number;
  strokes?: number[]; z?: number; rot?: number; crumple?: number; o?: number; s?: number }> =
  ({ x, y, w, f, strokes = [], z = 52, rot = 0, crumple = 0, o = 1, s = 1 }) => {
  const h = w * 0.74;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: o,
      transform: `rotate(${rot}deg) scale(${s}) skewX(${crumple * -5}deg)` }}>
      <div style={{ position: "absolute", left: w * 0.03, top: h * 0.04, width: w, height: h,
        borderRadius: 4, background: hexa("#100C08", 0.28) }} />
      {/* the paper, with a torn top edge */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4, background: CREAMB,
        border: `${Math.max(2, w * 0.012)}px solid ${dkh(CREAMB, 0.24)}` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.05,
        background: `repeating-linear-gradient(90deg, ${dkh(CREAMB, 0.20)} 0px, ${dkh(CREAMB, 0.20)} ${w * 0.03}px, ${CREAMB} ${w * 0.03}px, ${CREAMB} ${w * 0.055}px)` }} />
      {/* crumple creases — three of them, so it reads as HANDLED paper */}
      {crumple > 0 && [0.22, 0.55, 0.78].map((k, i) => (
        <div key={"cr" + i} style={{ position: "absolute", left: 0, right: 0, top: `${k * 100}%`,
          height: Math.max(2, w * 0.008), background: dkh(CREAMB, 0.18), opacity: crumple,
          transform: `rotate(${i % 2 ? 1.6 : -1.2}deg)` }} />
      ))}
      {/* THE SCRIBBLE. ⛔ Three tidy bars read as a blank page with three lines
          on it. A rough prompt is a SCRAWL — each authored stroke lands as a
          CLUSTER of four ragged marks of different length and angle, plus short
          ticks, so the slip is dense with illegible handwriting rather than
          ruled. Deliberately unreadable: the moment it is readable the shot
          becomes something to READ instead of something to watch. */}
      {strokes.map((at, i) => {
        const p = E(f, at, at + 5, 0, 1, OUT);
        if (p <= 0) return null;
        return (<React.Fragment key={"stg" + i}>
          {Array.from({ length: 4 }, (_, j) => {
            const k = i * 4 + j;
            const ty = 0.13 + k * 0.052 + rnd(k, 2) * 0.018;
            const lx = 0.08 + rnd(k, 6) * 0.10;
            return (<div key={"st" + k} style={{ position: "absolute", left: w * lx,
              top: h * ty, width: w * (0.30 + rnd(k, 4) * 0.54) * p,
              height: Math.max(3.5, w * (0.016 + rnd(k, 9) * 0.014)),
              borderRadius: w * 0.02, background: INK, opacity: 0.60 + rnd(k, 3) * 0.32,
              transform: `rotate(${-4 + rnd(k, 8) * 8}deg)` }} />);
          })}
          {/* two short ticks per cluster — the marks that are not words */}
          {[0, 1].map(j => {
            const k = i * 7 + j + 40;
            return (<div key={"tk" + k} style={{ position: "absolute",
              left: w * (0.60 + rnd(k, 5) * 0.28), top: h * (0.16 + rnd(k, 7) * 0.62),
              width: w * 0.07 * p, height: Math.max(3.5, w * 0.017), borderRadius: w * 0.02,
              background: INK, opacity: 0.68, transform: `rotate(${-40 + rnd(k, 2) * 80}deg)` }} />);
          })}
        </React.Fragment>);
      })}
    </div>
  );
};

/* =========================================================================
   THE SPEC PRESS — the skill itself: a colossal cream drawing board that
   swings down on a gantry and stands between the order and the machine.

   ⭐ S1's beat is the word STOPS, so the board physically OCCUPIES the gap.
   ====================================================================== */
export const SpecPress: React.FC<{ x: number; y: number; w: number; f: number;
  drop?: number; z?: number; platen?: number; marks?: number[] }> =
  ({ x, y, w, f, drop = 0, z = 46, platen = -1, marks = [] }) => {
  const h = w * 1.16;
  const dy = drop ? E(f, drop, drop + 16, -330, 0, OUT) : 0;
  const land = drop ? squash(f, drop + 16, 0.10, 3, 13) : 1;
  const pl = platen < 0 ? 0 : E(f, platen, platen + 6, 0, 1, IN_Q) - E(f, platen + 8, platen + 20, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2 + dy, width: w, height: h,
      zIndex: z, transform: `scaleY(${land}) scaleX(${2 - land})`, transformOrigin: "50% 100%" }}>
      {/* 1,2 the two hanger chains, running up out of frame */}
      {[0.18, 0.82].map((k, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: w * k - 7, top: -h * 0.62,
          width: 14, height: h * 0.62,
          background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.30)} 0px, ${dkh(STEEL, 0.30)} 9px, ${mxh(STEEL, 0.18)} 9px, ${mxh(STEEL, 0.18)} 18px)` }} />
      ))}
      {/* 3 the frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10,
        background: `linear-gradient(168deg, ${mxh("#4A423A", 0.14)} 0%, ${dkh("#4A423A", 0.48)} 100%)`,
        border: `10px solid ${dkh("#4A423A", 0.62)}` }} />
      {/* 4 the board face — the biggest bright mass in the frame */}
      <div style={{ position: "absolute", left: w * 0.06, top: h * 0.055, right: w * 0.06,
        bottom: h * 0.11, borderRadius: 5, background: PAPER,
        border: `4px solid ${dkh(PAPER, 0.30)}` }} />
      {/* 5..10 the drafting grid on the face */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"gv" + i} style={{ position: "absolute", left: w * (0.10 + i * 0.16),
          top: h * 0.075, width: 3, bottom: h * 0.13, background: dkh(PAPER, 0.24) }} />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"gh" + i} style={{ position: "absolute", left: w * 0.075, right: w * 0.075,
          top: h * (0.10 + i * 0.115), height: 3, background: dkh(PAPER, 0.24) }} />
      ))}
      {/* 11 THE GHOSTED PLAN already pinned to the board — a drawing board with
          nothing drawn on it is a whiteboard, and a whiteboard is a container */}
      <div style={{ position: "absolute", left: w * 0.13, top: h * 0.13, width: w * 0.40,
        height: h * 0.30, border: `4px dashed ${dkh(PAPER, 0.52)}` }}>
        <div style={{ position: "absolute", left: "12%", top: "20%", width: "76%", height: "60%",
          borderRadius: 4, background: hexa(INK, 0.62) }} />
        <div style={{ position: "absolute", left: "44%", top: "40%", width: "12%", height: "20%",
          borderRadius: "50%", background: PAPER }} />
      </div>
      {/* 12 a hatched section detail, right */}
      <div style={{ position: "absolute", left: w * 0.60, top: h * 0.13, width: w * 0.26,
        height: h * 0.19, overflow: "hidden", border: `4px solid ${dkh(PAPER, 0.48)}` }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={"pb" + i} style={{ position: "absolute", left: -w * 0.10 + i * w * 0.035,
            top: -h * 0.02, width: 4, height: h * 0.26, background: dkh(PAPER, 0.44),
            transform: "rotate(-38deg)" }} />
        ))}
      </div>
      {/* 13 THE PARALLEL BAR across the board — the tool that makes it a board */}
      <div style={{ position: "absolute", left: w * 0.04, right: w * 0.04, top: h * 0.54,
        height: h * 0.035, borderRadius: 3,
        background: `linear-gradient(180deg, ${mxh("#8A7F70", 0.30)} 0%, ${dkh("#8A7F70", 0.22)} 100%)`,
        border: `2px solid ${dkh("#8A7F70", 0.40)}` }} />
      {/* 14 the scale rule clipped to its edge */}
      <div style={{ position: "absolute", left: w * 0.62, top: h * 0.60, width: w * 0.26,
        height: h * 0.030, borderRadius: 2, background: mxh(BRASS, 0.24),
        border: `2px solid ${dkh(BRASS, 0.34)}`, overflow: "hidden" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"sr" + i} style={{ position: "absolute", left: `${4 + i * 8}%`, top: 0,
            width: 2, height: i % 3 === 0 ? "70%" : "40%", background: dkh(BRASS, 0.46) }} />
        ))}
      </div>
      {/* 11 the marks the board prints — MARKS ONLY, never callouts (S1 must
          not spend S5's payoff: the critic pass flagged exactly this) */}
      {marks.map((at, i) => {
        const p = E(f, at, at + 7, 0, 1, OUT);
        if (p <= 0) return null;
        return (
          <div key={"mk" + i} style={{ position: "absolute", left: w * (0.10 + (i % 2) * 0.42),
            top: h * (0.645 + Math.floor(i / 2) * 0.095), width: w * 0.38 * p, height: h * 0.062,
            borderRadius: 3, zIndex: 16, background: i === 3 ? CLAY : hexa(INK, 0.78) }} />
        );
      })}
      {/* 12 the latch bolts, two, that fire home on the lock */}
      {[0.14, 0.86].map((k, i) => (
        <div key={"lt" + i} style={{ position: "absolute", left: w * k - 15, top: h * 0.86,
          width: 30, height: h * 0.13, borderRadius: 4,
          background: `linear-gradient(180deg, ${BRASS} 0%, ${dkh(BRASS, 0.42)} 100%)`,
          transform: drop ? `translateY(${E(f, drop + 16, drop + 21, 22, 0, OUT)}px)` : undefined }} />
      ))}
      {/* 13 the bottom rail */}
      <div style={{ position: "absolute", left: -w * 0.03, right: -w * 0.03, top: h * 0.925,
        height: h * 0.10, borderRadius: 6, zIndex: 14,
        background: `linear-gradient(180deg, ${mxh("#6A6259", 0.10)} 0%, ${dkh("#6A6259", 0.56)} 100%)` }} />
      {/* 14 THE PLATEN — the thing that comes down on the brain dump in S4 */}
      {platen >= 0 && (
        <div style={{ position: "absolute", left: w * 0.03, top: h * (0.02 + pl * 0.56),
          width: w * 0.94, height: h * 0.20, borderRadius: 6, zIndex: 22,
          background: `linear-gradient(180deg, ${dkh("#5A5249", 0.10)} 0%, ${dkh("#5A5249", 0.50)} 100%)`,
          border: `5px solid ${dkh("#5A5249", 0.60)}` }} />
      )}
    </div>
  );
};

/* =========================================================================
   THE PLATES AND COUNTERS.

   ⭐⭐ A NUMBER MOVES TO ITS VALUE; IT IS NEVER TYPESET AT IT
   ([[feedback_graphical_over_textual]]). And ⛔ PREFER N DISCRETE EVENTS OVER
   ONE LONG TWEEN (reel 104: an 82-frame smooth ramp measured 4.27, WORSE than
   what it replaced; four discrete pops measured 5.63 and read better too).
   Every counter here steps in hard pops, never a smooth interpolation.
   ====================================================================== */
export const Roll: React.FC<{ x: number; y: number; f: number; steps: Array<[number, string]>;
  size?: number; z?: number; c?: string; sub?: string }> =
  ({ x, y, f, steps, size = 96, z = 74, c = INK, sub }) => {
  let cur = "", at = -99;
  for (const [k, v] of steps) if (f >= k) { cur = v; at = k; }
  if (!cur) return null;
  const pop = 1 + E(f, at, at + 3, 0, 1, OUT) * 0.16 - E(f, at + 3, at + 11, 0, 1, IO) * 0.16;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${pop})`,
      transformOrigin: "0% 50%", display: "flex", alignItems: "baseline", gap: size * 0.16 }}>
      <span style={{ ...mono(size, 800), color: c, letterSpacing: "-0.02em", lineHeight: 1 }}>{cur}</span>
      {sub && <span style={{ ...ui(size * 0.34, 900), color: hexa(c, 0.62), letterSpacing: "0.10em" }}>{sub}</span>}
    </div>
  );
};

/** ⛔ THE HOOK'S CLAIM PLATE. `HOOK_PLATE` wants ONE CONTIGUOUS CREAM MASS —
    reel 109 warned at 8.4% with three separate 6% cards, because three small
    bright objects are never the largest one. This is a single board carrying
    the whole tally, at ~20% of the panel. */
export const TallyBoard: React.FC<{ x: number; y: number; w: number; f: number;
  steps: Array<[number, string]>; z?: number; rot?: number; label?: string }> =
  ({ x, y, w, f, steps, z = 76, rot = -2.2, label = "REDO" }) => {
  const h = w * 0.56;
  let at = -99; for (const [k] of steps) if (f >= k) at = k;
  const kick = at < 0 ? 0 : rock(f, at, 7.5, 22);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transformOrigin: "50% -8%",
      transform: `rotate(${rot + kick * 0.62}deg) translateY(${Math.abs(kick) * 0.5}px)` }}>
      {/* the two hanger eyes and their shadow */}
      <div style={{ position: "absolute", left: w * 0.04, top: h * 0.06, width: w, height: h,
        borderRadius: 8, background: hexa("#100C08", 0.34) }} />
      {[0.16, 0.84].map((k, i) => (
        <div key={"he" + i} style={{ position: "absolute", left: w * k - 9, top: -h * 0.11,
          width: 18, height: h * 0.16, borderRadius: 5, background: dkh(STEEL, 0.34) }} />
      ))}
      {/* the dark backing board, so a cream plate on a lit wall still has an EDGE */}
      <div style={{ position: "absolute", left: -w * 0.035, top: -h * 0.05, width: w * 1.07,
        height: h * 1.10, borderRadius: 11, background: dkh("#3A332B", 0.10) }} />
      {/* the board: ONE cream mass */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: CREAMB,
        border: `${w * 0.022}px solid ${dkh(CREAMB, 0.30)}` }} />
      {/* the ruled head band */}
      <div style={{ position: "absolute", left: w * 0.05, top: h * 0.10, right: w * 0.05,
        height: h * 0.22, borderBottom: `${w * 0.012}px solid ${dkh(CREAMB, 0.36)}`,
        display: "flex", alignItems: "center" }}>
        <span style={{ ...ui(h * 0.17, 900), color: hexa(INK, 0.66), letterSpacing: "0.16em" }}>{label}</span>
      </div>
      {/* the value, popping */}
      <div style={{ position: "absolute", left: w * 0.07, top: h * 0.38, right: w * 0.07,
        bottom: h * 0.10, display: "flex", alignItems: "center" }}>
        <Roll x={0} y={0} f={f} steps={steps} size={h * 0.46} z={4} c={CLAYD} />
      </div>
    </div>
  );
};

/** THE SPEC PLATE — the repo's receipts, cast into the press housing.
    ⛔ 11,415 and MIT are the exact live values (`R`). No FREE badge, no price:
    there is no money anywhere in this world. */
export const SpecPlate: React.FC<{ x: number; y: number; w: number; f: number;
  starsAt?: number[]; count?: Array<[number, string]>; dieAt?: number; z?: number; lit?: number }> =
  ({ x, y, w, f, starsAt = [], count = [], dieAt = -1, z = 58, lit = 1 }) => {
  const h = w * 0.68;
  const dieY = dieAt < 0 ? -999 : E(f, dieAt - 10, dieAt, -h * 1.9, 0, IN_Q) + E(f, dieAt + 6, dieAt + 18, 0, -h * 1.9, OUT);
  const stamped = dieAt >= 0 && f >= dieAt ? 1 : 0;
  const flash = E(f, (starsAt[starsAt.length - 1] ?? -99), (starsAt[starsAt.length - 1] ?? -99) + 4, 0, 1, OUT)
    - E(f, (starsAt[starsAt.length - 1] ?? -99) + 4, (starsAt[starsAt.length - 1] ?? -99) + 18, 0, 1, IO);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z }}>
      {/* the cast plate, with four corner fixings */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10,
        background: `linear-gradient(160deg, ${mxh(CREAMB, 0.10 + flash * 0.5)} 0%, ${dkh(CREAMB, 0.20 - flash * 0.18)} 100%)`,
        border: `${w * 0.016}px solid ${dkh(CREAMB, 0.40)}` }} />
      {[[0.05, 0.08], [0.91, 0.08], [0.05, 0.82], [0.91, 0.82]].map(([a, b], i) => (
        <div key={"fx" + i} style={{ position: "absolute", left: w * a, top: h * b,
          width: w * 0.042, height: w * 0.042, borderRadius: "50%", background: dkh(CREAMB, 0.44) }} />
      ))}
      {/* the divider */}
      <div style={{ position: "absolute", left: w * 0.10, right: w * 0.10, top: h * 0.55,
        height: w * 0.010, background: dkh(CREAMB, 0.36) }} />
      {/* THE STARS — eleven real objects that fly in and stamp themselves in */}
      <div style={{ position: "absolute", left: w * 0.09, top: h * 0.10, right: w * 0.09, height: h * 0.20 }}>
        {starsAt.map((at, i) => {
          const p = E(f, at, at + 6, 0, 1, OUT);
          if (p <= 0) return null;
          const sq = squash(f, at + 6, 0.30, 2, 9);
          const sz = h * 0.23;
          return (
            <div key={"stx" + i} style={{ position: "absolute", left: `${i * 9.1}%`, top: 0,
              width: sz, height: sz,
              transform: `translate(${(1 - p) * (i % 2 ? 260 : -260)}px, ${(1 - p) * -420}px) rotate(${(1 - p) * 220}deg) scale(${p * sq})`,
              background: GOLD, opacity: 0.5 + p * 0.5,
              clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
          );
        })}
      </div>
      {/* the count, rolling to 11,415 in discrete pops */}
      <div style={{ position: "absolute", left: w * 0.09, top: h * 0.32 }}>
        <Roll x={0} y={0} f={f} steps={count} size={h * 0.21} z={4} c={INK} />
      </div>
      {/* THE MIT STAMP, struck by a descending die */}
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.62, width: w * 0.36,
        height: h * 0.26, borderRadius: 6, opacity: stamped,
        background: hexa(CLAYD, 0.13), border: `${w * 0.011}px solid ${CLAYD}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...ui(h * 0.16, 900), color: CLAYD, letterSpacing: "0.06em" }}>{R.license}</span>
      </div>
      {/* the kind of thing this is: SKILL. Not a plugin, not an app. */}
      <div style={{ position: "absolute", left: w * 0.54, top: h * 0.62, width: w * 0.36,
        height: h * 0.26, borderRadius: 6, background: hexa(INK, 0.07),
        border: `${w * 0.009}px solid ${hexa(INK, 0.30)}`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...ui(h * 0.14, 900), color: hexa(INK, 0.72), letterSpacing: "0.14em" }}>{R.kind}</span>
      </div>
      {/* THE DIE that strikes it */}
      {dieAt >= 0 && f >= dieAt - 9 && f <= dieAt + 18 && (
        <div style={{ position: "absolute", left: w * 0.06, top: h * 0.56 + dieY, width: w * 0.44,
          height: h * 0.40, borderRadius: 5, zIndex: 30,
          background: `linear-gradient(180deg, ${dkh(STEEL, 0.06)} 0%, ${dkh(STEEL, 0.46)} 100%)`,
          border: `${w * 0.012}px solid ${dkh(STEEL, 0.56)}` }} />
      )}
    </div>
  );
};

/* =========================================================================
   ⛔⛔ THE CREW. *"A helper is not a tile, it is a Claude."* Reel 109 took its
   median 11.30 -> 14.13 by making every helper a sprite, and reel 107 was
   rejected for *"paper boxes"* when the metric was satisfied with rectangles.

   ⭐⭐⭐ AND A SPRITE NEEDS AN ACTION LOOP, NOT AN IDLE. *"They just stand
   there and move slightly up and down but they dont actually do movements."*
   Four loops chosen by index, each on its own phase and rate, so a crowd is
   doing four different things at once instead of one animation played N times.
   ⛔ An idle under 2.6deg / 4.6px reads as static to a human even though a
   metric calls it moving.
   ====================================================================== */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { prof: 1 }, { glasses: 1 }, { suit: 1 }, { chef: 1 }, { beard: 1 },
  { girl: 1 }, { fro: 1 }, { cop: 1 }, { wizard: 1 }, { samurai: 1 }, { stern: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; at?: number; loop?: number; tint?: string; flip?: boolean }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);          /* 8-frame arrival: a gentle one is not an event */
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) {                                  /* PACE — walks with a stride lift */
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {                           /* WORK — leans in on a beat */
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {                           /* HOP — jumps and cheers at the apex */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else {                                        /* LOOK — turns its head, double-takes */
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
        cheer={cheer} tint={tint} {...costumeFor(i)} />
    </div>
  );
};

/** ⛔ EVERY SHOT NEEDS A BACKGROUND PROCESS. One hero doing one gesture is a
    dead shot. This is the shop's belt: it costs the hierarchy nothing because
    it is furniture, and it is the difference between a shot and a still.
    ⛔ Its slats are >= 40px so they survive the audit's 1012->240 downsample. */
export const Belt: React.FC<{ x: number; y: number; w: number; h?: number; f: number;
  rate?: number; z?: number; c?: string; carry?: Array<{ o: number; s?: number; wrong?: boolean }> }> =
  ({ x, y, w, h = 62, f, rate = 3.6, z = 24, c = "#5A554D", carry = [] }) => {
  const pitch = 96;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 6, overflow: "hidden",
        background: `linear-gradient(180deg, ${dkh(c, 0.16)} 0%, ${dkh(c, 0.52)} 100%)`,
        border: `4px solid ${dkh(c, 0.58)}` }}>
        {Array.from({ length: Math.ceil(w / pitch) + 2 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", top: 0, bottom: 0,
            left: ((i * pitch + f * rate) % (w + pitch)) - pitch, width: pitch * 0.46,
            background: i % 2 ? mxh(c, 0.22) : dkh(c, 0.30) }} />
        ))}
      </div>
      {/* the two end rollers */}
      {[-1, 1].map(k => (
        <div key={"rl" + k} style={{ position: "absolute", left: k < 0 ? -h * 0.28 : w - h * 0.22,
          top: -h * 0.06, width: h * 0.5, height: h * 1.12, borderRadius: "50%",
          background: `linear-gradient(90deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.44)} 100%)`,
          border: `3px solid ${dkh(c, 0.56)}` }} />
      ))}
      {/* whatever the belt is carrying, riding it */}
      {carry.map((p, i) => (
        <Part key={"bc" + i} x={((p.o * w + f * rate) % (w + 160)) - 80} y={-h * 0.24}
          s={p.s ?? 0.7} wrong={p.wrong} z={z + 4} rot={-6 + rnd(i, 3) * 12} />
      ))}
    </div>
  );
};

/** S6 — THE MINUTE DIAL. ⛔ The HAND moves to the value; the numeral is on the
    dial face, where a numeral belongs on a real instrument. */
export const Dial: React.FC<{ x: number; y: number; s: number; f: number; drop?: number;
  sweep?: number; z?: number }> =
  ({ x, y, s, f, drop = 0, sweep = 0, z = 54 }) => {
  const dy = E(f, drop, drop + 18, -340, 0, OUT);
  const land = squash(f, drop + 18, 0.14, 3, 14);
  const rk = rock(f, drop + 18, 3.0, 20);
  const hand = E(f, sweep, sweep + 26, -90, 270, IO);
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2 + dy, width: s, height: s,
      zIndex: z, transform: `scale(${land}) rotate(${rk * 0.10}deg)` }}>
      <div style={{ position: "absolute", left: s * 0.04, top: s * 0.06, width: s, height: s,
        borderRadius: "50%", background: hexa("#100C08", 0.30) }} />
      {/* the case */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(160deg, ${mxh(BRASS, 0.26)} 0%, ${dkh(BRASS, 0.46)} 100%)`,
        border: `${s * 0.055}px solid ${CLAYD}` }} />
      {/* the face */}
      <div style={{ position: "absolute", left: s * 0.10, top: s * 0.10, right: s * 0.10,
        bottom: s * 0.10, borderRadius: "50%", background: CREAMB,
        border: `${s * 0.014}px solid ${dkh(CREAMB, 0.30)}` }} />
      {/* 12 tick marks — a real dial is graduated */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: s * 0.12,
          width: i % 3 === 0 ? s * 0.026 : s * 0.014, height: i % 3 === 0 ? s * 0.09 : s * 0.055,
          marginLeft: i % 3 === 0 ? -s * 0.013 : -s * 0.007, background: hexa(INK, i % 3 === 0 ? 0.72 : 0.40),
          transformOrigin: `50% ${s * 0.38}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      {/* the value, on the face where it belongs */}
      <div style={{ position: "absolute", left: 0, right: 0, top: s * 0.56, textAlign: "center" }}>
        <span style={{ ...mono(s * 0.17, 800), color: CLAYD }}>1:00</span>
      </div>
      {/* the hand, moving to its value */}
      <div style={{ position: "absolute", left: "50%", top: "50%", width: s * 0.030,
        height: s * 0.34, marginLeft: -s * 0.015, background: CLAYD, borderRadius: s * 0.015,
        transformOrigin: "50% 100%", transform: `translateY(-100%) rotate(${hand}deg)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: s * 0.075, height: s * 0.075,
        marginLeft: -s * 0.037, marginTop: -s * 0.037, borderRadius: "50%", background: dkh(CLAYD, 0.24) }} />
    </div>
  );
};

/** S7 — THE CRATE that comes down the chute: the repo, downloaded. */
export const Crate: React.FC<{ x: number; y: number; w: number; f: number; drop?: number;
  lid?: number; z?: number; c?: string }> =
  ({ x, y, w, f, drop = 0, lid = -1, z = 50, c = "#9A7A4E" }) => {
  const h = w * 0.74;
  const dy = E(f, drop, drop + 15, -420, 0, IN_Q);
  const land = squash(f, drop + 15, 0.20, 3, 15);
  const lidR = lid < 0 ? 0 : E(f, lid, lid + 10, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h + dy, width: w, height: h,
      zIndex: z, transform: `scaleY(${land}) scaleX(${2 - land})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: w * 0.04, top: h * 0.90, width: w * 0.92,
        height: h * 0.16, borderRadius: "50%", background: hexa("#100C08", 0.36) }} />
      {/* the box, with visible end-grain and a spec panel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8,
        background: `linear-gradient(168deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.36)} 100%)`,
        border: `${w * 0.026}px solid ${dkh(c, 0.46)}` }} />
      {/* four planks */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"pk" + i} style={{ position: "absolute", left: w * 0.05, right: w * 0.05,
          top: h * (0.14 + i * 0.20), height: w * 0.014, background: dkh(c, 0.24) }} />
      ))}
      {/* two corner braces */}
      {[-1, 1].map(k => (
        <div key={"cb" + k} style={{ position: "absolute", left: k < 0 ? w * 0.04 : w * 0.84,
          top: h * 0.08, width: w * 0.12, bottom: h * 0.08, background: dkh(c, 0.30),
          borderRadius: 4 }} />
      ))}
      {/* the shipping plate */}
      <div style={{ position: "absolute", left: w * 0.24, top: h * 0.36, width: w * 0.52,
        height: h * 0.28, borderRadius: 5, background: CREAMB,
        border: `${w * 0.012}px solid ${dkh(CREAMB, 0.30)}`, display: "flex",
        alignItems: "center", justifyContent: "center", gap: w * 0.03 }}>
        <div style={{ width: w * 0.12, height: w * 0.12, borderRadius: 5, background: "#FFFFFF",
          border: `2px solid #E8DCC0`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")} style={{ width: w * 0.09, height: w * 0.09, objectFit: "contain" }} />
        </div>
        <div style={{ width: w * 0.22, height: w * 0.030, borderRadius: 3, background: hexa(INK, 0.44) }} />
      </div>
      {/* THE LID, popping */}
      <div style={{ position: "absolute", left: -w * 0.03, top: -h * 0.10 - lidR * h * 0.34,
        width: w * 1.06, height: h * 0.18, borderRadius: 6, zIndex: 20,
        transform: `rotate(${lidR * -13}deg)`, transformOrigin: "10% 100%",
        background: `linear-gradient(180deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.30)} 100%)`,
        border: `${w * 0.022}px solid ${dkh(c, 0.46)}` }} />
    </div>
  );
};

/** S7 — the SKILL RACK: three blanks dealt in and seated. */
export const SkillRack: React.FC<{ x: number; y: number; w: number; f: number;
  seats?: number[]; z?: number }> =
  ({ x, y, w, f, seats = [], z = 46 }) => {
  const h = w * 0.46, cw = w * 0.28;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z }}>
      {/* the rack frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: dkh("#5E5A52", 0.30),
        border: `5px solid ${dkh("#5E5A52", 0.52)}` }} />
      {[0, 1, 2].map(i => (
        <div key={"sb" + i} style={{ position: "absolute", left: w * (0.055 + i * 0.315), top: h * 0.12,
          width: cw, height: h * 0.76, borderRadius: 5, background: dkh("#5E5A52", 0.52),
          border: `3px solid ${dkh("#5E5A52", 0.62)}` }} />
      ))}
      {/* the three blanks, dealt one-two-three, each seating with a click */}
      {seats.map((at, i) => {
        const p = E(f, at, at + 8, 0, 1, OUT);
        if (p <= 0) return null;
        const sq = squash(f, at + 8, 0.16, 3, 10);
        const on = E(f, at + 8, at + 14, 0, 1, OUT);
        return (
          <div key={"bk" + i} style={{ position: "absolute", left: w * (0.055 + i * 0.315),
            top: h * 0.12, width: cw, height: h * 0.76, borderRadius: 5,
            transform: `translate(${(1 - p) * 260}px, ${(1 - p) * -110}px) scale(${sq})`,
            background: `linear-gradient(166deg, ${mxh(CLAY, 0.18 + on * 0.24)} 0%, ${dkh(CLAY, 0.32)} 100%)`,
            border: `3px solid ${dkh(CLAY, 0.44)}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: cw * 0.46, height: cw * 0.46, objectFit: "contain", opacity: 0.4 + on * 0.6 }} />
            {/* the seated indicator — a real rack tells you it took */}
            <div style={{ position: "absolute", left: "50%", bottom: h * 0.05, marginLeft: -w * 0.02,
              width: w * 0.04, height: w * 0.04, borderRadius: "50%",
              background: on > 0.5 ? GREEN : dkh(CLAY, 0.5) }} />
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   S8 — THE WALL OF BAD ORDERS + THE INSPECTION LAMP.

   ⭐⭐ ANIMATION-QUALITY §10: A BEAM WITH NO FINDINGS IS A PROGRESS BAR. The
   sweep is not the beat — what the sweep FINDS is. So the lamp travels and, as
   it crosses each order, a flag STABS INTO IT. 35 of them, in five volleys,
   spread across the full duration, each >= 46px so it survives the downsample.
   ====================================================================== */
export const FlagWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  lamp?: [number, number]; volleys?: number[]; z?: number }> =
  ({ x, y, w, h, f, lamp = [6, 86], volleys = [], z = 30 }) => {
  const COLS = 7, ROWS = 5;
  const cw = w / COLS, ch = h / ROWS;
  const lx = E(f, lamp[0], lamp[1], -w * 0.10, w * 1.10, LIN);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {/* the wall behind */}
      <div style={{ position: "absolute", inset: -12, borderRadius: 6, background: dkh("#5A2320", 0.44) }} />
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const c = i % COLS, r = Math.floor(i / COLS);
        const px = c * cw, py = r * ch;
        /* how lit this order is by the travelling lamp */
        const d = Math.abs(px + cw / 2 - lx);
        const lit = Math.max(0, 1 - d / (w * 0.20));
        const vAt = volleys[r] ?? -999;
        const stab = E(f, vAt + c * 2, vAt + c * 2 + 5, 0, 1, IN_Q);
        return (
          <div key={"or" + i} style={{ position: "absolute", left: px + cw * 0.08, top: py + ch * 0.08,
            width: cw * 0.84, height: ch * 0.84 }}>
            {/* the pinned order — a real sheet with three ruled lines */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 4,
              background: mxh(CREAMB, -0.10 + lit * 0.34), border: `2px solid ${dkh(CREAMB, 0.34)}`,
              opacity: 0.42 + lit * 0.58 }} />
            {[0.30, 0.50, 0.70].map((k, j) => (
              <div key={"ol" + j} style={{ position: "absolute", left: "12%", top: `${k * 100}%`,
                width: `${52 + ((i + j) % 4) * 11}%`, height: Math.max(3, ch * 0.045),
                background: hexa(INK, 0.30 + lit * 0.30), borderRadius: 2 }} />
            ))}
            {/* THE FINDING — a red flag stabbed in, >= 46px on its short side */}
            {stab > 0 && (
              <div style={{ position: "absolute", left: "58%", top: -ch * 0.30 + (1 - stab) * -70,
                width: Math.max(46, cw * 0.34), height: Math.max(48, ch * 0.62),
                transform: `rotate(${-16 + (i % 5) * 7}deg) scale(${stab})`, transformOrigin: "50% 100%" }}>
                <div style={{ position: "absolute", left: "42%", top: 0, width: Math.max(6, cw * 0.05),
                  height: "100%", background: dkh(STEEL, 0.30), borderRadius: 2 }} />
                <div style={{ position: "absolute", left: "46%", top: 0, width: "54%", height: "46%",
                  background: RED, border: `2px solid ${dkh(RED, 0.34)}`,
                  clipPath: "polygon(0% 0%,100% 0%,100% 74%,0% 100%)" }} />
              </div>
            )}
          </div>
        );
      })}
      {/* THE LAMP's raking pool, travelling with the sweep */}
      <div style={{ position: "absolute", left: lx - w * 0.22, top: -h * 0.14, width: w * 0.44,
        height: h * 1.28, zIndex: 40, pointerEvents: "none",
        background: `linear-gradient(90deg, ${hexa("#FF9E7A", 0)} 0%, ${hexa("#FF9E7A", 0.30)} 50%, ${hexa("#FF9E7A", 0)} 100%)` }} />
    </div>
  );
};

/* =========================================================================
   S9 — THE JOB-CARD RAIL. [[feedback_graphical_over_textual]]'s own worked
   case: *"it remembers across chats"* is drawn as BARS TRAVELLING ACROSS A
   SESSION BOUNDARY — never labelled trays, never key/value rows.
   ⛔ And §10: a hand-off needs BOTH halves. The rail carries cards forward AND
   refuses one that contradicts them.
   ====================================================================== */
export const CardRail: React.FC<{ x: number; y: number; w: number; f: number;
  runs?: number[]; reject?: number; z?: number; divide?: number }> =
  ({ x, y, w, f, runs = [], reject = -1, z = 40, divide = 0.52 }) => {
  const cw = 132, chh = 96;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 260, zIndex: z }}>
      {/* the rail itself, and it is the light source */}
      <div style={{ position: "absolute", left: -40, right: -40, top: 0, height: 18, borderRadius: 4,
        background: `linear-gradient(180deg, ${mxh("#2E6B58", 0.34)} 0%, ${dkh("#2E6B58", 0.40)} 100%)` }} />
      <div style={{ position: "absolute", left: -40, right: -40, top: 18, height: 6,
        background: hexa("#8FE0BC", 0.55) }} />
      {/* the session boundary — a hard division the cards must cross */}
      <div style={{ position: "absolute", left: w * divide, top: -30, width: 9, height: 250,
        background: hexa("#8FE0BC", 0.34) }} />
      <div style={{ position: "absolute", left: w * divide - 30, top: -30, width: 69, height: 250,
        background: `linear-gradient(90deg, ${hexa("#0C1D19", 0.44)} 0%, ${hexa("#0C1D19", 0)} 100%)` }} />
      {/* SIX cards running the full span, each seating with a clack */}
      {runs.map((at, i) => {
        const p = E(f, at, at + 30, 0, 1, IO);
        if (p <= 0) return null;
        const px = -cw + p * (w * 0.90);
        const sq = squash(f, at + 30, 0.12, 3, 10);
        return (
          <div key={"jc" + i} style={{ position: "absolute", left: px, top: 26 + (i % 2) * 12,
            width: cw, height: chh, transform: `scale(${sq}) rotate(${Math.sin(f / 9 + i) * 2.4}deg)`,
            transformOrigin: "50% 0%" }}>
            {/* the hanger */}
            <div style={{ position: "absolute", left: cw * 0.44, top: -20, width: 12, height: 24,
              background: dkh(STEEL, 0.24), borderRadius: 3 }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: CREAMB,
              border: `3px solid ${dkh(CREAMB, 0.30)}` }} />
            {/* three decision bars — the card's actual content, as graphics */}
            {[0.86, 0.62, 0.74].map((k, j) => (
              <div key={"cb" + j} style={{ position: "absolute", left: "9%", top: `${24 + j * 24}%`,
                width: `${k * 82}%`, height: 11, borderRadius: 2,
                background: j === 1 ? GREEN : hexa(INK, 0.42) }} />
            ))}
          </div>
        );
      })}
      {/* THE REFUSAL — a contradicting card thrown back with a red flash */}
      {reject >= 0 && f >= reject - 4 && (() => {
        const lf = f - reject;
        const px = w * (divide + 0.30) - E(lf, -4, 6, 0, 1, OUT) * w * 0.24
          + E(lf, 8, 26, 0, 1, OUT) * w * 0.46;
        const flash = E(lf, 6, 9, 0, 1, OUT) - E(lf, 9, 22, 0, 1, IO);
        return (
          <div style={{ position: "absolute", left: px, top: 34, width: cw, height: chh,
            transform: `rotate(${E(lf, 8, 26, 0, 34, OUT)}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 5,
              background: mxh(RED, 0.42 - flash * 0.30), border: `3px solid ${RED}` }} />
            {[0.7, 0.9].map((k, j) => (
              <div key={"rb" + j} style={{ position: "absolute", left: "9%", top: `${30 + j * 26}%`,
                width: `${k * 80}%`, height: 11, borderRadius: 2, background: hexa(RED, 0.72) }} />
            ))}
            {/* struck through — this one argues with what is already there */}
            <div style={{ position: "absolute", left: "6%", top: "46%", width: "88%", height: 7,
              background: RED, transform: "rotate(-17deg)" }} />
          </div>
        );
      })()}
      {/* the STOP DOG that kicks it out */}
      {reject >= 0 && (
        <div style={{ position: "absolute", left: w * divide + 16, top: 8, width: 26,
          height: 58, borderRadius: 4, background: dkh(RED, 0.20),
          transform: `rotate(${E(f, reject, reject + 4, 0, -46, OUT) + E(f, reject + 8, reject + 18, 0, 46, IO)}deg)`,
          transformOrigin: "50% 0%" }} />
      )}
    </div>
  );
};

/** S10/S11 — the DONE rack the right parts land on, and the reel's proof. */
export const DoneRack: React.FC<{ x: number; y: number; w: number; f: number;
  lands?: number[]; z?: number; c?: string }> =
  ({ x, y, w, f, lands = [], z = 44, c = "#7A736A" }) => {
  const h = w * 0.30;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.52, height: h * 0.22,
        borderRadius: 5, background: `linear-gradient(180deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `4px solid ${dkh(c, 0.52)}` }} />
      {/* four legs, so it is furniture and not a floating bar */}
      {[0.06, 0.34, 0.64, 0.92].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: w * k, top: h * 0.70,
          width: w * 0.035, height: h * 0.34, background: dkh(c, 0.46), borderRadius: 3 }} />
      ))}
      {lands.map((at, i) => {
        const p = E(f, at, at + 7, 0, 1, OUT);
        if (p <= 0) return null;
        return (<React.Fragment key={"dl" + i}>
          <Part x={w * (0.20 + i * 0.28)} y={h * 0.34 + (1 - p) * -190} s={0.92}
            z={z + 6} rot={(1 - p) * -22} />
          <Ring x={w * (0.20 + i * 0.28)} y={h * 0.46} f={f} at={at + 7} r={120} c="#FFF3DC" z={z + 8} />
        </React.Fragment>);
      })}
    </div>
  );
};

/** S12/S13 — THE COUNTER, cropped by the panel's bottom edge so the reel's
    last two scenes have a real mass in front of the action (the §8 depth check). */
export const ShopCounter: React.FC<{ y: number; f: number; z?: number; c?: string;
  go?: boolean; goAt?: number }> =
  ({ y, f, z = 66, c = "#6E5A46", go = false, goAt = 0 }) => (
  <div style={{ position: "absolute", left: -60, right: -60, top: y, height: 420, zIndex: z }}>
    {/* the top slab, with a lit front edge */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40, borderRadius: 6,
      background: `linear-gradient(180deg, ${mxh(c, 0.34)} 0%, ${mxh(c, 0.06)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 40, bottom: 0,
      background: `linear-gradient(180deg, ${dkh(c, 0.24)} 0%, ${dkh(c, 0.62)} 100%)` }} />
    {/* six panel divisions in the counter face */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"cp" + i} style={{ position: "absolute", left: 60 + i * 176, top: 70, width: 150,
        height: 150, borderRadius: 5, border: `4px solid ${dkh(c, 0.44)}`, background: dkh(c, 0.34) }} />
    ))}
    {/* THE WORD — the CTA's single permitted text object, cast into the face,
        in the display weight, mute-readable at thumb distance (law 4) */}
    {go && (
      <div style={{ position: "absolute", left: 0, right: 0, top: 92, textAlign: "center",
        transform: `scale(${squash(f, goAt, 0.14, 4, 14)})` }}>
        <span style={{ ...ui(122, 900), color: mxh(c, 0.62), letterSpacing: "0.14em",
          opacity: E(f, goAt, goAt + 6, 0, 1, OUT) }}>GO</span>
      </div>
    )}
  </div>
);
