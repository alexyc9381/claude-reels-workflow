import React from "react";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 128 · "BOSS" — THE WORLD KIT.  Board: storyboards/128-boss.md.

   Subject: the "boss loop" — a three-line prompt. Line 1 sets the task, line 2
   tells Claude to spawn a team of worker sub-agents, and line 3 — the one the
   VO calls the secret sauce — puts a STRICT AI BOSS over them. The workers
   build, the boss tears it apart, and it loops until he scores it perfect.

   ⛔⛔⛔ THIS SCRIPT ALREADY SHIPPED, AS REEL 118 "LOOP", ON 2026-08-21.
   The BOSS voiceover is 118's script re-recorded with `critic` -> `boss` and
   `Gauntlet Loop` -> `boss loop`. It is being built as a deliberate re-run, and
   that means EVERYTHING 118 OWNED IS BANNED HERE or the two posts read as one:

     118 had                              128 must not
     ---------------------------------    ------------------------------------
     THE GAUNTLET, a HORIZONTAL run       a HEIGHT: floor below, glass above
     work goes ROUND on a return rail     work goes UP a hoist, DOWN a chute
     THE HEAD CRITIC on a pulpit          THE BOSS behind glass, never on the floor
     a REJECT paddle, a rubber stamp      a TEST: he runs the machine and it fails
     hero artifact THE BAR (clear it)     hero artifact THE UNIT (make it RUN)
     the payoff is PASS (binary)          the payoff is a SCORE that CLIMBS to 100
     `55,000 LINES` / `MY JOB IS...LOOPS`  `CAN THE AGENT RUN THE THING?`
     hook: a hand stamping REJECT         four hooks, none of them a stamp

   ⭐ THE ONE INVERSION THAT MAKES IT A DIFFERENT REEL: 118 IS HORIZONTAL AND
   128 IS VERTICAL. Different silhouette, different camera (low angles looking
   UP at a lit box), different blocking. If a shot here could be cropped into
   118 without anyone noticing, it is wrong.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Verified live 2026-08-29. If a figure or a quote is not in `R` it does not
      go on screen.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced).
   ⛔ `E` CLAMPS: an entrance that ends at 1 returns 1 for ever. Anything that
      should LEAVE needs its own clock; anything that should REPEAT must return.
   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN`. An `IO`/`OUT` ease decelerates
      into its end whether or not that end is on screen (§23).
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall,
  COSTUMES, costumeFor, Crew, Hero, Forearm, vivid, lerpHex, mono, ui,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
};
export type { Place };

/** ⭐ THE OVERLOOK'S OWN PAINTS.
    `JADE` is the only green in the reel and it exists for exactly two beats —
    S10 (the spout finally delivers) and S13 (it does it at scale). A colour
    used twice is a colour that means something.
    `GLASSW` is the boss's flood: a hard near-white that no other light in the
    reel uses, so the moment it lands you know who is looking.
    `IRON` is the near-black the gantry and the chute are built from — dark
    enough that anything lit on it is a real value step and not a tint. */
export const JADE = "#3FA982", GLASSW = "#F2F7FB", IRON = "#161A1E";

/* ---- THE LEDGER ----------------------------------------------------------
   Verified live 2026-08-29, before a frame was drawn. Sources are named per
   row. ⛔ Nothing on screen may assert more than a row here supports. */
export const R = {
  /** ⛔⛔ THE NAME IS OURS, NOT THE INDUSTRY'S. The published names for this
      practice are "loop engineering" and "agent loops"; NOBODY calls it the
      boss loop. So the phrase appears exactly twice — the S3 title beat and the
      S14 keyword — and never once as a citation, a quote or a "they call it".
      This is the same discipline as reel 125 refusing to plate a star count the
      VO overstated: dramatise the mechanism, stop at the edge of the claim. */
  name: "THE BOSS LOOP",

  /** ⭐ THE ONE QUOTE THE REEL PUTS ON THE GLASS, and the reason S8's beat is a
      TEST rather than a stamp. Boris Cherny, creator and head of Claude Code,
      on what real verification is: not unit tests — actual product usage.
      ⛔ Reel 118 used a DIFFERENT Cherny line ("My job is to write loops"), so
      this one is also the receipt that keeps the two reels apart. */
  quote: "CAN THE AGENT RUN THE THING?",
  quoteWho: "BORIS CHERNY · CLAUDE CODE",

  /** the line behind "even the creators of Claude think this is the future" */
  future: "I DON'T PROMPT CLAUDE ANYMORE",
  futureWho: "CREATOR · CLAUDE CODE",

  /** ⭐ what backs "spawn a team of worker sub-agents", in his own words. He
      also shipped nested subagent support: a main agent spawning subagents that
      spawn subagents. The reel draws the fan-out, never a count. */
  armies: "ARMIES OF AGENTS",

  /** the Claude Code team's own name for line 3's whole idea: the thing that
      MAKES it is not the thing that CHECKS it. This is the mechanism, and it is
      the label on the brass plate that fills the empty bracket at S7. */
  split: "MAKER · CHECKER",

  /** ⛔⛔ THE SCORE IS AN EVENT COUNT, NOT A BENCHMARK. These are the boss's own
      verdicts on a machine the viewer watches being tested three times and then
      working. No published benchmark backs any "x% better" claim, so none is
      made, and the numbers only ever appear ON the glass, as his opinion. */
  scores: [61, 74, 88, 100] as const,

  /** the three lines of the prompt, in the order they are chalked up */
  lines: [
    { n: "1", t: "THE TASK" },
    { n: "2", t: "SPAWN THE WORKERS" },
    { n: "3", t: "ASSIGN A STRICT BOSS" },
  ] as const,

  keyword: "BOSS",
} as const;

/** ⛔ GREPPABLE GUARDS. A grep for any of these across `Ovl*.tsx` must return
    zero hits inside a rendered string.
    · `NAME_BANNED` — the phrasings that would turn our own label into a claim
      that the industry uses it. It does not.
    · `PERF_BANNED` — no speed/quality multiplier is published anywhere.
    · `MONEY_BANNED` — the VO names no figure, and a number under the token drum
      reads as the cost of the build we just watched. */
export const NAME_BANNED = ["EVERYONE CALLS", "KNOWN AS", "THE INDUSTRY", "OFFICIALLY"] as const;
export const PERF_BANNED = ["10X", "100X", "5X FASTER", "% BETTER", "BEST"] as const;
export const MONEY_BANNED = ["$", "USD", "COST:", "£"] as const;

/* ---- THE EIGHT PLACES ----------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   intake -> floor -> glass -> over -> shaft -> floor' -> intake' -> glass' ->
   chute -> shaft' -> run -> drum -> floor'' -> run' -> over', which alternates
   warm/cold and dark/bright on every single cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `intake` is the only place built for it.
   ⛔⛔ EVERY LIT PLACE HERE KEEPS AN UNLIT HALF. That is not taste — it is how
   `look_audit`'s two gates are passed at the same time. Brightness is the MEAN
   and hierarchy is the SPREAD, and they only fight when the fix reached for is
   the palette's dark stop. Nothing below touches a dark stop to solve a bright
   problem; the lit parts (`back2`, `floor`, `key`) carry all the saturation and
   the unlit parts (`back`, `floor2`, `grit`) stay genuinely black. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE ORDER WALL — frame 0 lives here, so it is built for >=140: a bone
     wall behind the working light with a lit bench lip under it. The order
     board bolted to it is near-black IRON, which is where the reel's biggest
     value SPREAD comes from. */
  intake:  { back: "#7E8890", back2: "#F2F4F3", floor: "#C6CCC9", floor2: "#969E9F",
             lip: "#272E31", key: "#FFF3D4", horizon: 486, grit: "#1E2428" },
  /* 1b · THE ORDER WALL AGAIN, AND THE LIGHT HAS GONE (S6). ⛔ A returning set
     is a callback ONLY if the light changed. Same geometry, four stops down,
     one hard cone on the order and nothing else lit at all. */
  intake2: { back: "#0C1013", back2: "#39424A", floor: "#2A3134", floor2: "#111619",
             lip: "#070A0C", key: "#FFEFC0", horizon: 486, grit: "#05080A" },
  /* 2 · THE BENCH FLOOR — amber, lit from UNDER the benches, ceiling unlit. The
     warmest set in the reel and the one the crew lives in. */
  floor:   { back: "#160E03", back2: "#8A6222", floor: "#6B4F1E", floor2: "#1B1206",
             lip: "#0D0803", key: "#FFC855", horizon: 520, grit: "#090603" },
  /* 3 · THE GLASS, FROM BELOW — cold, hard, and the biggest value gap anywhere
     in the reel: a ~55-luma gantry underside against a ~205-luma lit box. */
  glass:   { back: "#080C11", back2: "#2B3A47", floor: "#141C24", floor2: "#070A0E",
             lip: "#04070A", key: "#F2F7FB", horizon: 604, grit: "#04070A" },
  /* 4 · THE HOIST SHAFT — teal, vertical, the coldest saturated frame. */
  shaft:   { back: "#03110F", back2: "#2E6E70", floor: "#1B4446", floor2: "#061A1C",
             lip: "#020A0B", key: "#BFF0EA", horizon: 560, grit: "#020809" },
  /* 5 · THE CHUTE MOUTH — red spill from above. Used once, for the rejection. */
  chute:   { back: "#160406", back2: "#7E2A24", floor: "#5A1F1B", floor2: "#1A0708",
             lip: "#0C0203", key: "#FFC0A4", horizon: 540, grit: "#0A0304" },
  /* 6 · THE UNIT RUNNING — jade. The only green, and only S10 and S13 get it. */
  run:     { back: "#04180F", back2: "#3E9C72", floor: "#256B4E", floor2: "#082017",
             lip: "#02100A", key: "#A6FFD6", horizon: 528, grit: "#03120C" },
  /* 7 · THE TOKEN DRUM, UNDER THE FLOOR — ember from below, hard shadows up.
     The smallest, tightest frame in the reel after S4. */
  drum:    { back: "#150802", back2: "#7A3A10", floor: "#54280C", floor2: "#180A03",
             lip: "#0B0401", key: "#FFA54D", horizon: 556, grit: "#080301" },
  /* 8 · THE WHOLE OVERLOOK — full flood, gold over steel. The widest and the
     brightest body frames, and the only place that sees all three storeys. */
  over:    { back: "#0F1216", back2: "#B49A6A", floor: "#8A7448", floor2: "#221C12",
             lip: "#0A0C0E", key: "#FFE6A8", horizon: 566, grit: "#070809" },
/* ⭐ THE HOOK'S OWN PLACE, AND IT IS BRIGHT ON PURPOSE.
   Hook C v1 measured FRAME-0 LUMA **62.9** against the >=140 bar, because a
   night shaft is a night shaft. The wrong fix is lifting the palette's dark
   stop — that is exactly the ratchet that took thirteen reels pale (§8). The
   right one is reel 109's: brightness is the MEAN and hierarchy is the SPREAD,
   so a BRIGHT hall containing near-black masses satisfies both at once. Here
   the shaft walls are lit steel and the flood is on from frame 0; every mass in
   front of them (gantry, chute, hoist, cage, crew) is IRON or clay, and the
   value gap is the biggest in the reel. Nothing dark got lighter. */
  hookc:  { back: "#7FA8BC", back2: "#CFEAF4", floor: "#9CC6D6", floor2: "#5B8598",
            lip: "#16232B", key: "#FFFFFF", horizon: 596, grit: "#0F1A20" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE OVERLOOK'S OWN SET PIECES.

   ⛔⛔ EVERY ONE OF THESE IS DRAWN, NOT PRIMITIVE. `feedback_props_need_real_
   drawing`: a book that was four divs got rejected, and the house bar is 12-16
   parts. Counted here — Gantry 15, GlassBox 21, Hoist 17, Chute 13, BenchRow 14
   per bay, Hatch 9. If a part count drops below the bar the prop is a slab.

   ⛔⛔ AND EVERY ONE HAS TO BEAT ITS GROUND IN **VALUE**, not hue. A dark
   neutral prop on a dark neutral set has no edge, the motion audit scores it as
   if it were not drawn, and a viewer cannot see it either (§6.5). The gantry
   and the chute are IRON on lit floors; where they sit on a dark floor they get
   a lit top edge, which is also where the light would actually be.
   ====================================================================== */

/** THE GANTRY — the steel that holds the glass out over the floor. 15 parts:
    two lattice legs (each with 4 braces), the main box beam, its bottom flange,
    a walkway grating, a handrail, a kick plate, two brackets and a lit top edge
    so it never disappears into a dark ceiling. */
export const Gantry: React.FC<{ p: Place; y: number; z?: number; f?: number;
  legs?: boolean; lit?: number; x0?: number; span?: number }> =
  ({ p, y, z = 40, f = 0, legs = true, lit = 0.5, x0 = -40, span = W + 80 }) => (
  <>
    {/* the main box beam + its bottom flange */}
    <div style={{ position: "absolute", left: x0, top: y, width: span, height: 34, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.26)} 0%, ${IRON} 100%)` }} />
    <div style={{ position: "absolute", left: x0, top: y + 34, width: span, height: 9, zIndex: z,
      background: dkh(IRON, 0.42) }} />
    {/* the lit top edge — this is what keeps IRON legible against a dark set */}
    <div style={{ position: "absolute", left: x0, top: y - 3, width: span, height: 4, zIndex: z + 1,
      background: hexa(p.key, 0.34 + lit * 0.34) }} />
    {/* walkway grating, handrail, kick plate */}
    {Array.from({ length: 26 }, (_, i) => (
      <div key={"gg" + i} style={{ position: "absolute", left: x0 + 8 + i * 40, top: y + 6,
        width: 5, height: 22, zIndex: z + 1, background: dkh(IRON, 0.5), opacity: 0.8 }} />
    ))}
    <div style={{ position: "absolute", left: x0, top: y - 42, width: span, height: 5, zIndex: z,
      background: mxh(IRON, 0.12) }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"gs" + i} style={{ position: "absolute", left: x0 + 40 + i * (span / 9), top: y - 40,
        width: 5, height: 42, zIndex: z, background: mxh(IRON, 0.06) }} />
    ))}
    {legs && [0, 1].map((s) => {
      const lx = s === 0 ? 74 : W - 128;
      return (
        <div key={"lg" + s} style={{ position: "absolute", left: lx, top: y + 40, width: 54,
          height: H - y - 40, zIndex: z - 2 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 13, height: "100%",
            background: `linear-gradient(90deg, ${mxh(IRON, 0.2)} 0%, ${dkh(IRON, 0.4)} 100%)` }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 13, height: "100%",
            background: `linear-gradient(90deg, ${dkh(IRON, 0.4)} 0%, ${mxh(IRON, 0.14)} 100%)` }} />
          {Array.from({ length: 5 }, (_, i) => (
            <div key={"br" + i} style={{ position: "absolute", left: 4, top: 18 + i * 74, width: 46,
              height: 8, background: dkh(IRON, 0.24),
              transform: `rotate(${i % 2 ? 34 : -34}deg)`, transformOrigin: "50% 50%" }} />
          ))}
        </div>
      );
    })}
  </>
);

/** THE GLASS — the boss's lit box, and the reel's single most important object.
    21 parts: the frame, four mullions, the lit interior wash, the sill, the
    soffit, the flood housing with two lamps, a reflection band that TRAVELS, a
    score readout with its own bezel and four digits' worth of cells, two
    stanchions and the name strip.

    ⛔ `on` is the box's own light and `score` is what the readout reads. When
    `score` is null the readout is DARK BUT PRESENT — an empty container has to
    read while it is still empty, because empty is the promise (§11). */
export const GlassBox: React.FC<{ p: Place; x: number; y: number; w?: number; h?: number;
  z?: number; f?: number; on?: number; score?: number | null; tint?: string;
  refl?: number; label?: string; readout?: boolean; children?: React.ReactNode }> =
  ({ p, x, y, w: ww = 560, h: hh = 264, z = 50, f = 0, on = 1, score = null,
     tint = GLASSW, refl = 1, label, readout = true, children }) => {
  /* ⛔⛔ `readout={false}` EXISTS BECAUSE A DARK RECTANGLE INSIDE A LIT BOX READS
     AS A SWITCHED-OFF TELEVISION. The hook rendered `score={null}` and the
     244x124 unlit bezel became the largest dark mass in the upper third — the
     opposite of "the glass is blazing". `feedback_a_lit_rectangle_is_a_screen`
     says moving it never helps and the SHAPE is the bug, so the hook turns the
     readout off entirely and puts the BOSS in the box instead: a character at
     frame 0, the villain planted, and the reason the flood exists, all at once
     (THE-OPEN law 2 — characters stop scrolls, empty rooms do not). */
  const glow = 0.16 + on * 0.74;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* soffit + sill — the box is a BUILT thing, not a lit rectangle */}
      <div style={{ position: "absolute", left: -16, top: -22, width: ww + 32, height: 24,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.2)} 0%, ${dkh(IRON, 0.3)} 100%)` }} />
      <div style={{ position: "absolute", left: -22, top: hh - 4, width: ww + 44, height: 30,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.1)} 0%, ${dkh(IRON, 0.46)} 100%)` }} />
      <div style={{ position: "absolute", left: -22, top: hh + 26, width: ww + 44, height: 8,
        background: dkh(IRON, 0.56) }} />
      {/* the glazing */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(176deg, ${hexa(tint, glow * 0.94)} 0%, ${hexa(tint, glow * 0.56)} 62%, ${hexa(tint, glow * 0.34)} 100%)`,
        border: `7px solid ${dkh(IRON, 0.18)}` }} />
      {/* four mullions */}
      {[0.2, 0.4, 0.6, 0.8].map((k, i) => (
        <div key={"mu" + i} style={{ position: "absolute", left: ww * k - 4, top: 0, width: 8,
          height: hh, background: dkh(IRON, 0.1) }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: hh * 0.46, width: ww, height: 7,
        background: dkh(IRON, 0.1) }} />
      {/* the reflection band — TRAVELS, so the glass is never a still pane */}
      {refl > 0 && (
        <div style={{ position: "absolute", left: ((f * 1.6) % (ww + 320)) - 200, top: 0,
          width: 130, height: hh, transform: "skewX(-14deg)", opacity: 0.20 * refl * on,
          background: `linear-gradient(90deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#FFFFFF", 0.9)} 50%, ${hexa("#FFFFFF", 0)} 100%)` }} />
      )}
      {/* the flood housing + two lamps, hung under the sill */}
      <div style={{ position: "absolute", left: ww * 0.5 - 92, top: hh + 30, width: 184, height: 26,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.16)} 0%, ${dkh(IRON, 0.36)} 100%)`,
        borderRadius: "3px 3px 8px 8px" }} />
      {[0, 1].map((i) => (
        <div key={"lm" + i} style={{ position: "absolute", left: ww * 0.5 - 62 + i * 78,
          top: hh + 52, width: 46, height: 15, borderRadius: "0 0 10px 10px",
          background: on > 0.3 ? mxh(p.key, 0.4) : dkh(IRON, 0.2) }} />
      ))}
      {/* whatever the box CONTAINS — the boss, when a scene puts him in it. It
          sits under the reflection band so the glass still reads as glass. */}
      {children}
      {/* the score readout — bezel, cells, digits. Dark but PRESENT at score=null */}
      {readout && <div style={{ position: "absolute", left: ww * 0.5 - 122, top: hh * 0.5 - 62, width: 244,
        height: 124, background: dkh(IRON, 0.06), border: `6px solid ${dkh(IRON, 0.3)}`,
        borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 8,
          background: score === null ? dkh(IRON, 0.24) : hexa("#05070A", 0.82) }} />
        <div style={{ position: "relative", ...mono(84, 800),
          color: score === null ? dkh(p.key, 0.62) : mxh(p.key, 0.24), letterSpacing: 2 }}>
          {score === null ? "--" : String(score)}
        </div>
      </div>}
      {label && (
        <div style={{ position: "absolute", left: 0, top: hh + 66, width: ww, textAlign: "center",
          ...mono(19, 800), color: mxh(p.key, 0.3), letterSpacing: 3 }}>{label}</div>
      )}
    </div>
  );
};

/** THE HOIST — two rails, a cage, its head sheave, the rope, four guide shoes,
    a counterweight and a landing gate. 17 parts. `k` is 0 at the floor and 1 at
    the glass, so a scene drives the whole machine from one number.
    ⛔ THE ROPE IS DRAWN FROM THE SAME `k`, so it can never detach from the cage
    the way reel 117's chains did when the lift outgrew its own beam. */
export const Hoist: React.FC<{ p: Place; x: number; yTop: number; yBot: number; k: number;
  z?: number; f?: number; w?: number; open?: number; children?: React.ReactNode }> =
  ({ p, x, yTop, yBot, k, z = 44, f = 0, w: ww = 168, open = 0, children }) => {
  const cy = yBot - (yBot - yTop) * Math.max(0, Math.min(1, k));
  const CH = 132;
  return (
    <>
      {/* the two rails + their fishplates */}
      {[0, 1].map((s) => (
        <div key={"rl" + s} style={{ position: "absolute", left: x + (s ? ww - 16 : 0), top: yTop - 40,
          width: 16, height: yBot - yTop + 120, zIndex: z,
          background: `linear-gradient(90deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.36)} 100%)` }} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"fp" + i} style={{ position: "absolute", left: x - 6, top: yTop + i * 96,
          width: ww + 12, height: 7, zIndex: z, background: dkh(IRON, 0.3), opacity: 0.9 }} />
      ))}
      {/* head sheave */}
      <div style={{ position: "absolute", left: x + ww / 2 - 32, top: yTop - 78, width: 64, height: 64,
        borderRadius: "50%", zIndex: z + 2, background: mxh(IRON, 0.18),
        border: `8px solid ${dkh(IRON, 0.34)}`,
        transform: `rotate(${k * 900}deg)` }}>
        <div style={{ position: "absolute", left: 22, top: 4, width: 5, height: 40,
          background: dkh(IRON, 0.5) }} />
      </div>
      {/* the rope — one line from the sheave to the cage top, always attached */}
      <div style={{ position: "absolute", left: x + ww / 2 - 3, top: yTop - 50, width: 6,
        height: Math.max(4, cy - CH - (yTop - 50)), zIndex: z + 1, background: mxh(IRON, 0.3) }} />
      {/* the counterweight, travelling the other way — a second moving mass */}
      <div style={{ position: "absolute", left: x + ww + 26, top: yTop + (yBot - yTop) * k * 0.82,
        width: 40, height: 74, zIndex: z, background: dkh(IRON, 0.12),
        border: `3px solid ${dkh(IRON, 0.42)}` }} />
      {/* the cage: floor, roof, two sides, a mesh back, four guide shoes */}
      <div style={{ position: "absolute", left: x - 4, top: cy - CH, width: ww + 8, height: CH,
        zIndex: z + 3 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 15,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.3)} 0%, ${IRON} 100%)` }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 17,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.1)} 0%, ${dkh(IRON, 0.44)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: 10, width: 14, height: CH - 20,
          background: dkh(IRON, 0.16) }} />
        <div style={{ position: "absolute", right: 0, top: 10, width: 14, height: CH - 20,
          background: dkh(IRON, 0.16) }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"mh" + i} style={{ position: "absolute", left: 18 + i * 21, top: 16,
            width: 4, height: CH - 34, background: dkh(IRON, 0.3), opacity: 0.72 }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={"gsh" + i} style={{ position: "absolute",
            left: i % 2 ? ww - 14 : -2, top: i < 2 ? 6 : CH - 26, width: 20, height: 20,
            background: mxh(IRON, 0.1), borderRadius: 3 }} />
        ))}
        {children}
      </div>
      {/* the landing gate at the bottom */}
      <div style={{ position: "absolute", left: x - 12, top: yBot - 12, width: ww + 24, height: 14,
        zIndex: z + 4, background: dkh(IRON, 0.36),
        transform: `translateY(${-open * 40}px)` }} />
    </>
  );
};

/** THE CHUTE — the way work comes back DOWN. 13 parts: two side cheeks, the
    bed, six wear strips, a mouth lip, a hood and a landing tray. `tilt` is the
    angle; the bed is drawn as one skewed plane so anything sliding on it can be
    positioned in the same space. */
export const Chute: React.FC<{ p: Place; x: number; y: number; w?: number; h?: number;
  z?: number; f?: number; hot?: number; flip?: boolean }> =
  ({ p, x, y, w: ww = 400, h: hh = 240, z = 46, f = 0, hot = 0, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: flip ? "scaleX(-1)" : undefined }}>
    {/* the hood over the mouth */}
    <div style={{ position: "absolute", left: -14, top: -30, width: ww * 0.5, height: 34,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.22)} 0%, ${dkh(IRON, 0.3)} 100%)`,
      borderRadius: "8px 20px 0 0" }} />
    {/* the bed */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: hh,
      clipPath: `polygon(0 0, 46% 0, 100% ${hh - 46}px, 100% ${hh}px, 0 34%)`,
      background: `linear-gradient(160deg, ${mxh(IRON, 0.2)} 0%, ${dkh(IRON, 0.26)} 100%)` }} />
    {/* wear strips down the bed */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"ws" + i} style={{ position: "absolute", left: i * 8, top: i * 6,
        width: ww - i * 10, height: 5, transformOrigin: "0 0",
        transform: `rotate(${Math.atan2(hh - 60, ww) * 57.3}deg)`,
        background: dkh(IRON, 0.4), opacity: 0.6 }} />
    ))}
    {/* the two side cheeks */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 15,
      transformOrigin: "0 0", transform: `rotate(${Math.atan2(hh - 60, ww) * 57.3}deg)`,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.34)} 0%, ${IRON} 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: 74, width: ww, height: 13,
      transformOrigin: "0 0", transform: `rotate(${Math.atan2(hh - 60, ww) * 57.3}deg)`,
      background: dkh(IRON, 0.44) }} />
    {/* the mouth lip — lit when something is coming through */}
    <div style={{ position: "absolute", left: -10, top: -6, width: 92, height: 13,
      background: hot > 0 ? mxh(p.key, 0.24) : mxh(IRON, 0.18) }} />
    {/* the landing tray at the foot */}
    <div style={{ position: "absolute", left: ww - 120, top: hh - 26, width: 180, height: 22,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.14)} 0%, ${dkh(IRON, 0.4)} 100%)`,
      borderRadius: 4 }} />
  </div>
);

/** A BENCH BAY — 14 parts: the top, its front edge, a lit underside strip (the
    floor's whole light source), four legs with two stretchers, a tool rail with
    three hung tools, a swarf tray and a vice. */
export const BenchBay: React.FC<{ p: Place; x: number; y: number; w?: number; z?: number;
  f?: number; lit?: number; vice?: boolean }> =
  ({ p, x, y, w: ww = 300, z = 34, f = 0, lit = 1, vice = true }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: 190, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 22,
      background: `linear-gradient(180deg, ${mxh(OXIDE, 0.34)} 0%, ${mxh(OXIDE, 0.1)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: 22, width: ww, height: 11,
      background: dkh(OXIDE, 0.36) }} />
    {/* the lit underside — this is where the floor's amber comes from */}
    <div style={{ position: "absolute", left: 12, top: 33, width: ww - 24, height: 9,
      background: hexa(p.key, 0.30 + lit * 0.5) }} />
    {[0, 1, 2, 3].map((i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: 14 + i * ((ww - 44) / 3), top: 33,
        width: 17, height: 150, background: `linear-gradient(90deg, ${mxh(IRON, 0.16)} 0%, ${dkh(IRON, 0.3)} 100%)` }} />
    ))}
    <div style={{ position: "absolute", left: 14, top: 120, width: ww - 28, height: 8,
      background: dkh(IRON, 0.26) }} />
    <div style={{ position: "absolute", left: 14, top: 162, width: ww - 28, height: 7,
      background: dkh(IRON, 0.34) }} />
    {/* tool rail + three hung tools */}
    <div style={{ position: "absolute", left: 22, top: -34, width: ww - 44, height: 6,
      background: mxh(IRON, 0.2) }} />
    {[0, 1, 2].map((i) => (
      <div key={"tl" + i} style={{ position: "absolute", left: 46 + i * 64, top: -30,
        width: 11, height: 30 + i * 7, background: mxh(STEEL, 0.06 + i * 0.06),
        transform: `rotate(${Math.sin(f / 26 + i) * 1.6}deg)`, transformOrigin: "50% 0%" }} />
    ))}
    <div style={{ position: "absolute", left: ww - 84, top: -16, width: 70, height: 17,
      background: dkh(OXIDE, 0.2), borderRadius: 2 }} />
    {vice && (
      <div style={{ position: "absolute", left: 22, top: -26, width: 46, height: 28,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.2)} 0%, ${dkh(SLATE, 0.3)} 100%)`,
        borderRadius: 3 }} />
    )}
  </div>
);

/** A FLOOR HATCH — 9 parts: the well, its lit mouth, two leaves that swing on
    their own hinge lines, two hinges and three tread plates. `k` 0 shut, 1 open.
    ⛔ The mouth is lit from BELOW, which is what throws light up onto a body
    rising out of it — the light has to exist before the sprite does. */
export const Hatch: React.FC<{ p: Place; x: number; y: number; w?: number; k: number;
  z?: number }> = ({ p, x, y, w: ww = 150, k, z = 30 }) => {
  const o = Math.max(0, Math.min(1, k));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 46, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 40,
        background: `linear-gradient(180deg, ${hexa(p.key, 0.06 + o * 0.72)} 0%, ${dkh(IRON, 0.5)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 7,
        background: hexa(p.key, 0.14 + o * 0.7) }} />
      {[0, 1].map((s) => (
        <div key={"lf" + s} style={{ position: "absolute", left: s ? ww / 2 : 0, top: -3,
          width: ww / 2, height: 15, transformOrigin: s ? "100% 50%" : "0% 50%",
          transform: `rotate(${(s ? 1 : -1) * o * 74}deg)`,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.3)} 100%)` }} />
      ))}
      {[0, 1].map((s) => (
        <div key={"hg" + s} style={{ position: "absolute", left: s ? ww - 16 : 4, top: -6,
          width: 12, height: 12, borderRadius: 6, background: dkh(IRON, 0.2) }} />
      ))}
      {[0, 1, 2].map((i) => (
        <div key={"tp" + i} style={{ position: "absolute", left: 12 + i * (ww / 3), top: 34,
          width: ww / 3 - 16, height: 5, background: dkh(IRON, 0.34), opacity: 0.7 }} />
      ))}
    </div>
  );
};

/** THE FLOOD — the boss's light, as a shaped CONE and never a full-frame fill.
    ⛔ `feedback_no_flashing_transitions` is standing: light is always a wedge
    with an origin you can point at. A full-panel tint is banned outright, and
    reel 115 shipped one to pass a gate and got told. */
export const Flood: React.FC<{ x: number; y: number; k: number; z?: number; c?: string;
  len?: number; top?: number; bot?: number; f?: number }> =
  ({ x, y, k, z = 66, c = GLASSW, len = 620, top = 120, bot = 560, f = 0 }) => {
  const o = Math.max(0, Math.min(1, k));
  if (o <= 0.01) return null;
  /* ⛔⛔ THE CLIP BOX HAS TO BE AS WIDE AS THE WIDEST END OF THE CONE. v1 sized
     the div to `top` and clipped a polygon that ran out to `bot`, so every
     flood in the reel rendered as a narrow sliver of its intended wedge and
     hook A read as if the light had never been authored. This is §6.4 with a
     new face: an effect that exists in the code and not in the video, and the
     motion audit agreed with the bug because a wedge that is not painted sweeps
     no pixels. Size the box to `bot`, centre the near end inside it. */
  const wBox = Math.max(top, bot);
  const nl = (wBox - top) / 2, nr = (wBox + top) / 2;
  const fl = (wBox - bot) / 2, fr = (wBox + bot) / 2;
  const flick = 0.94 + Math.sin(f / 9) * 0.05;
  return (
    <div style={{ position: "absolute", left: x - wBox / 2, top: y, width: wBox, height: len,
      zIndex: z, opacity: o * flick,
      clipPath: `polygon(${nl}px 0, ${nr}px 0, ${fr}px ${len}px, ${fl}px ${len}px)`,
      background: `linear-gradient(180deg, ${hexa(c, 0.46)} 0%, ${hexa(c, 0.18)} 44%, ${hexa(c, 0)} 100%)` }} />
  );
};

/** ⭐⭐⭐ THE RACK WALL — the bench floor's actual BACKGROUND, and the single
    highest-value change available to this reel.

    §1's measured table: rebuilding a SET as a dense, on-topic place took a reel
    7.68 -> 9.65 in ONE pass, after three rounds of hand-added scan bars,
    trolleys and travel bands had stalled. *"Build the right room before you add
    motion to the wrong one."*

    ⛔⛔ AND THE DEFECT IT FIXES IS ALSO A REPEAT-OBJECT DEFECT. On reel 128's
    first contact sheet, S1 · S5 · S12 and S14 were four different beats
    happening in front of the SAME flat amber wall with the same pale parallax
    boxes on it — which is reel 120's *"six timestamps, one grey slab"* exactly.
    A wall of real racking with real contents, at real value contrast, makes
    each of those four a different corner of a place instead of the same
    backdrop four times.

    24 drawn parts per bay: two uprights with foot plates, three beams, three
    shelves of stock at three different values, a bay label, a lit strip under
    the top beam, and diagonal bracing. */
export const RackWall: React.FC<{ p: Place; f: number; y?: number; z?: number;
  bays?: number; x0?: number; pitch?: number; lit?: number; dx?: number }> =
  ({ p, f, y = 196, z = 8, bays = 5, x0 = -60, pitch = 236, lit = 1, dx = 0 }) => (
  <>
    {Array.from({ length: bays }, (_, b) => {
      const bx = x0 + b * pitch + dx;
      const dark = 0.10 + (b % 3) * 0.07;      /* value ramp across the wall */
      return (
        <div key={"bay" + b} style={{ position: "absolute", left: bx, top: y, width: pitch - 14,
          height: 400, zIndex: z }}>
          {/* uprights + foot plates */}
          {[0, 1].map((u) => (
            <React.Fragment key={u}>
              <div style={{ position: "absolute", left: u ? pitch - 46 : 0, top: 0, width: 22,
                height: 400, background: dkh(IRON, dark) }} />
              <div style={{ position: "absolute", left: u ? pitch - 54 : -8, top: 392, width: 38,
                height: 12, background: dkh(IRON, dark + 0.14) }} />
            </React.Fragment>
          ))}
          {/* three beams */}
          {[0, 1, 2].map((r) => (
            <div key={"bm" + r} style={{ position: "absolute", left: 0, top: 116 + r * 128,
              width: pitch - 24, height: 15,
              background: `linear-gradient(180deg, ${mxh(OXIDE, 0.1 - dark)} 0%, ${dkh(OXIDE, 0.3 + dark)} 100%)` }} />
          ))}
          {/* the stock on each shelf — three values so the wall has depth */}
          {[0, 1, 2].map((r) => (
            <React.Fragment key={"st" + r}>
              <div style={{ position: "absolute", left: 26, top: 116 + r * 128 - 74, width: 78,
                height: 74, borderRadius: 3,
                background: `linear-gradient(168deg, ${dkh(CREAMB, 0.30 + dark + r * 0.06)} 0%, ${dkh(CREAMB, 0.52 + dark)} 100%)`,
                border: `3px solid ${dkh(CREAMB, 0.62)}` }} />
              <div style={{ position: "absolute", left: 114, top: 116 + r * 128 - 60, width: 62,
                height: 60, borderRadius: 3,
                background: `linear-gradient(168deg, ${dkh(BRASS, 0.24 + dark)} 0%, ${dkh(BRASS, 0.5 + dark)} 100%)` }} />
              {r === 1 && (
                <div style={{ position: "absolute", left: 26, top: 116 + r * 128 + 18, width: 96,
                  height: 16, background: dkh(IRON, 0.2), borderRadius: 2,
                  display: "flex", alignItems: "center", paddingLeft: 6 }}>
                  <span style={{ ...mono(9, 800), color: mxh(p.key, 0.5), letterSpacing: 1.4 }}>
                    {["A", "B", "C", "D", "E"][b]}{r + 1}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
          {/* the lit strip under the top beam — where the light actually is */}
          <div style={{ position: "absolute", left: 8, top: 132, width: pitch - 40, height: 5,
            background: hexa(p.key, 0.16 * lit) }} />
          {/* diagonal bracing */}
          <div style={{ position: "absolute", left: 14, top: 250, width: pitch - 60, height: 7,
            background: dkh(IRON, dark + 0.1), transform: "rotate(21deg)", transformOrigin: "0 0" }} />
        </div>
      );
    })}
  </>
);

/** ⭐ THE OVERHEAD RUN — §1's full-width high-contrast travelling band, which is
    worth more than any number of small props.

    ⛔⛔ v1 DREW A RAIL AND A BOX 55px BELOW IT ON A 7px DARK HANGER, and on a
    contact sheet the boxes read as PAPER FLOATING ACROSS THE TOP OF SEVEN
    SCENES — the "flying stationery" defect, and `feedback_one_prop_five_scenes`
    (one prop in five scenes is six "boring" notes) in one object. The fix is
    not to move it or shrink it: a load that does not visibly HANG from
    something is not a load, whatever it is drawn as. Each carrier now has a
    trolley with two wheels sitting ON the rail, a bright shackle, a hook and a
    short drop, and the load SWINGS off the trolley's own velocity.

    ⛔ IT GOES OVER EVERYTHING. Reel 110 bought +0.17 from a conveyor at z26
    under panes at z40; above them the same change was worth +1.33. When a prop
    spans the whole set its z has to beat all of them — which is also where a
    real one runs. */
export const Overrun: React.FC<{ p: Place; f: number; y?: number; z?: number;
  rate?: number; n?: number; lit?: number }> =
  ({ p, f, y = 128, z = 86, rate = 5.2, n = 9, lit = 1 }) => (
  <>
    {/* the I-beam: web, bottom flange, and a lit lower edge so it is not a slab */}
    <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 15, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.3)} 0%, ${dkh(IRON, 0.24)} 100%)` }} />
    <div style={{ position: "absolute", left: -40, top: y + 15, width: W + 80, height: 9, zIndex: z,
      background: dkh(IRON, 0.42) }} />
    <div style={{ position: "absolute", left: -40, top: y + 24, width: W + 80, height: 4, zIndex: z,
      background: hexa(p.key, 0.22 * lit) }} />
    {Array.from({ length: n }, (_, i) => {
      const span = W + 300;
      const x = ((i * (span / n) + f * rate) % span) - 150;
      /* the swing trails the trolley in proportion to its own velocity */
      const sw = -rate * 1.15 + Math.sin((x + i * 41) / 46) * 2.4;
      const crate = i % 2 === 0;
      return (
        <div key={"ov" + i} style={{ position: "absolute", left: x, top: y - 10, zIndex: z + 1 }}>
          {/* the trolley: a body and TWO WHEELS that sit on the rail */}
          <div style={{ position: "absolute", left: 8, top: 0, width: 54, height: 17,
            borderRadius: 3, background: mxh(IRON, 0.34) }} />
          {[0, 1].map((w) => (
            <div key={w} style={{ position: "absolute", left: 12 + w * 32, top: 6, width: 15,
              height: 15, borderRadius: "50%", background: mxh(STEEL, 0.1),
              border: `3px solid ${dkh(IRON, 0.2)}` }} />
          ))}
          {/* shackle + hook, bright, so the drop is visibly a SUSPENSION */}
          <div style={{ position: "absolute", left: 30, top: 16, width: 10, height: 20,
            background: mxh(STEEL, 0.22), transformOrigin: "50% 0%",
            transform: `rotate(${sw}deg)` }} />
          <div style={{ position: "absolute", left: 26, top: 34, width: 18, height: 12,
            borderRadius: "0 0 9px 9px", background: mxh(STEEL, 0.14),
            transformOrigin: "50% -18px", transform: `rotate(${sw}deg)` }} />
          {/* the load, hanging short off the hook and swinging with it */}
          <div style={{ position: "absolute", left: 0, top: 44, width: 70, height: 54,
            transformOrigin: "50% -34px", transform: `rotate(${sw}deg)`, borderRadius: 4,
            background: crate
              ? `linear-gradient(168deg, ${mxh(CREAMB, 0.12)} 0%, ${dkh(CREAMB, 0.3)} 100%)`
              : `linear-gradient(168deg, ${mxh(BRASS, 0.2)} 0%, ${dkh(BRASS, 0.3)} 100%)`,
            border: `3px solid ${crate ? dkh(CREAMB, 0.5) : dkh(BRASS, 0.5)}` }}>
            {/* banding, so a crate reads as a crate and not as a card */}
            <div style={{ position: "absolute", left: 0, top: 16, width: 70, height: 6,
              background: crate ? dkh(CREAMB, 0.42) : dkh(BRASS, 0.44) }} />
            <div style={{ position: "absolute", left: 30, top: 0, width: 7, height: 54,
              background: crate ? dkh(CREAMB, 0.42) : dkh(BRASS, 0.44) }} />
          </div>
        </div>
      );
    })}
  </>
);
