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
   REEL 130 · "LIBRARY" — THE WORLD KIT.  Board: storyboards/130-library.md.

   Subject: Anthropic published its OWN Claude Code prompt library —
   `code.claude.com/docs/en/prompt-library` — 52 copy-paste prompts tagged by
   task and role, with editable fill-in fields, lifted out of Anthropic's own
   workflow / best-practice / team guides. Free.

   ⛔⛔ THE WORLD IS "THE PROMPT COUNTER", AND IT IS A COUNTER BECAUSE THE
      SUBJECT IS A TRANSACTION. "Copy-paste prompts, tagged by task" is
      something you are HANDED, not something you read: a lit service window at
      the front, a shutter, and behind it a deep picking hall whose back wall is
      ranks of numbered card drawers on a moving rail. You walk up with a job and
      a finished card comes over the counter. [[feedback_a_transaction_not_a_conveyor]]

   ⛔⛔ IT MUST NOT BE REEL 112 SQUAD (THE SUMMONING FLOOR). 112 shipped a lit
      LIBRARY HALL with repos drawn as BOUND VOLUMES and a barrage of books, and
      the word "library" in this reel's CTA is exactly the pull back toward it.
      **There is not one book, one shelf, one spine or one reading room here.**
      The unit is a CARD, the building is a COUNTER, the verb is ISSUE.

   ⛔⛔ IT MUST NOT BE REEL 127 DESIGN (THE BOARD WORKS) EITHER. 127 was a press
      hall stamping plates onto a belt. 130 has no press, no stamping and no
      belt: its motion is DRAWERS, a PICKING RAIL, a CHUTE and a COUNTER, and
      its light is a warm service window against a cool deep hall.

   ⛔⛔ THE ANTAGONIST IS `THE BLANK DOCKET` AND IT IS NEVER DESTROYED. A plain
      cream card with nothing printed on it. Its RULE: **it never remembers** —
      every job needs a fresh one, written longhand. It wins the hook, it wins
      S4 outright, and it is still on the spike, still blank, in the last frame.
      The library does not abolish writing your own prompt; it means you almost
      never have to.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below). Every
      row was checked on 2026-08-30 against Claude Code's own documentation
      before a frame was drawn. If a claim is not in `R` it does not go on screen.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO (really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced).
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

/* ---- THE FIVE PHASE PAINTS ------------------------------------------------
   ⭐ THE NUMBER SPINE IS A COLOUR, NOT A LABEL. The library's five SDLC phases
   are the wall's five BANKS, so a drawer's tab says which phase it is without a
   word on it, and the bank counters at the peak are five different colours
   travelling rather than one number ticking.

   ⛔⛔ AN ACCENT SET IS ONLY AS LEGIBLE AS ITS WORST MEMBER (reel 117 shipped a
   3.44:1 tier badge because the other two measured 8.6). Every one of these is
   a LIFTED value chosen to sit on the drawer face `#39434A`, and none of them
   is a mid-tone violet — the exact hue that failed there, and also reel 127's
   villain paint, which must not reappear as a friendly accent one reel later.
   Measured against `#39434A`:  SKY 4.98 · TEAL 6.42 · CLAY 4.61 · GRN 4.55 ·
   GLD 6.85 — the worst member clears 4.5.                                    */
export const PHASE = [
  { id: "DISCOVER", c: "#7FB6EA", n: 7 },
  { id: "DESIGN", c: "#7FC0C9", n: 6 },
  { id: "BUILD", c: "#E58C67", n: 22 },
  { id: "SHIP", c: "#5CB98D", n: 5 },
  { id: "OPERATE", c: "#E7B24C", n: 12 },
] as const;

/** the drawer body and its face — the ground every tab has to beat */
export const DRW = "#39434A", DRWD = "#242C31", DRWL = "#4E5A62";
/** the cream of a card that has nothing printed on it — THE ANTAGONIST */
export const BLANK = "#E4DCC6", BLANKD = "#B9AE93";
/** the counter's own warm surface, and the hall's cold steel */
export const COUNTERTOP = "#8A6B45", HALLSTEEL = "#6E7C84";

/* ---- THE LEDGER -----------------------------------------------------------
   Sources, all checked 2026-08-30:
     · code.claude.com/docs/en/prompt-library   (the library itself, counted)
     · code.claude.com/docs/en/skills           (slash commands ARE skills)
     · code.claude.com/docs/en/memory           (CLAUDE.md, every session)
     · code.claude.com/docs/en/interactive-mode (Shift+Tab -> plan mode)       */
export const R = {
  keyword: "LIBRARY",
  url: "code.claude.com/docs",
  page: "/prompt-library",

  /** ⭐ THE HARD RECEIPT, COUNTED FROM THE PAGE'S OWN DATA ARRAY ON 2026-08-30.
      Spent at S2, where the VO is describing what the library IS. */
  prompts: 52,
  cats: 15,

  /** the fifteen category names, exactly as the page tags them */
  catNames: ["Onboard", "Understand", "Plan", "Prototype", "Implement", "Refactor",
    "Test", "Review", "Git", "Release", "Incident", "Automate", "Data", "Steer", "Debug"],

  /** ⛔ the five phase sizes are the REAL ones and they sum to 52.
      7 + 6 + 22 + 5 + 12 = 52. A bank counter may never read anything else. */
  phases: PHASE,

  /** where the prompts came from — this is what "Anthropic's own engineers" is */
  srcs: [["workflows", 23], ["teams", 13], ["best-practices", 10],
    ["ebook", 3], ["legal", 2], ["cybersecurity", 1]] as const,

  /** the real fill-in fields, verbatim from the page */
  slotA: "{path}", slotB: "{behavior}",
  slotAv: "src/api/handlers/", slotBv: "validate uploaded file types",

  /* ---- RULE 1 ---- */
  skillPath: ".claude/skills/<name>/SKILL.md",
  cmdPath: ".claude/commands/<name>.md",
  cmdName: "/name",
  /** the docs' own reason, which is the VO's line: "Create a skill when you keep
      pasting the same instructions, checklist, or multi-step procedure into chat" */

  /* ---- RULE 2 ---- */
  keys: ["SHIFT", "TAB"] as const,
  modes: ["normal", "accept edits on", "plan mode on"] as const,
  modeLine: "plan mode on",
  planAlt: "/plan",

  /* ---- RULE 3 ---- */
  mdFile: "CLAUDE.md",
  mdPaths: "./CLAUDE.md · ./.claude/CLAUDE.md",
  mdLoads: "EVERY SESSION",
  mdHolds: ["NAMING", "LIBRARIES", "RULES"] as const,
  mdLines: 200,
  mdInit: "/init",
} as const;

/* ⛔⛔⛔ THE ONE THING THE VO SAYS THAT THE FRAME DOES NOT CLAIM.
   *"there's already over a hundred free templates"* — the official Claude Code
   prompt library holds **52**. So no plate, band, chip or drawer face in this
   reel prints a total above 52, and the line is paid by the PICTURE instead: at
   S9 the wall runs past the crop on both sides with its five bank counters
   still climbing, which is true of the wall as drawn and asserts no number.
   The standing rule: when a VO asserts a figure you cannot source, dramatise
   the MECHANISM and stop at the edge of the claim. */
export const COUNT_BANNED = ["100", "100+", "OVER 100", "HUNDRED", "HUNDREDS",
  "1000", "1K", "200", "300"] as const;
/** no speed or saving claim has a source */
export const PERF_BANNED = ["10X", "X FASTER", "SAVES", "%", "BEST", "SOTA",
  "#1", "INSTANT"] as const;
/** it is free, and nothing may hint otherwise */
export const PAID_BANNED = ["$", "PRO ONLY", "SUBSCRIPTION", "PER SEAT", "TRIAL"] as const;
/** ⛔ 112's world, kept out by name */
export const BOOK_BANNED = ["SHELF", "SHELVES", "VOLUME", "SPINE", "BORROW",
  "READING ROOM", "STACKS"] as const;

/* =========================================================================
   THE PLACES.
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE AND LIGHTNESS (the stated house
   bar, from AGENCY's own source). The walk is:
     bench(cool dark) -> counter(warm bright) -> hall(cool mid) ->
     source(green dark) -> console(gold bright) -> spike(ember dark) ->
     board(navy mid) -> plan(cyan bright) -> plate(copper mid-dark) ->
     runs(green mid) -> hall FLOODED(bright) -> counter(warm) -> doors(gold)
   ====================================================================== */
/* ⛔⛔⛔ THE DARK STOPS ARE DELIBERATELY VERY DARK, AND THAT IS THE WHOLE POINT.
   `look_audit` blocked this reel at BODY_BLACK p10 44.9 against a <= 35 bar —
   the ten-reel look regression (ANIMATION-QUALITY §8) is a black point that rose
   95% while motion moved 2.6%, because the sanctioned fix for every frame-0 luma
   failure was LIFTING THE SHADING. ⛔ That move is banned here. The >= 140 luma
   law applies to FRAME 0 ONLY, and frame 0 buys its brightness from the shutter
   slats, the stock pallet and the header pill — never from the palette.
   ⭐ Hierarchy needs DARKNESS: a cream room ranks nothing at 1.24, a dark room
   with one lit thing ranks at 2.92 (reel 84, and still true). */
export const PLACES: Record<string, Place> = {
  /* ⛔⛔⛔ THE BLACK POINT. The first pass measured **BODY_BLACK p10 = 44.9**
     against a bar of <= 35, i.e. the shadows had filled in — the exact drift
     that cost reels 96-105 a 95% rise in black point while every motion audit
     stayed green (ANIMATION-QUALITY §8). ⛔ THE FIX IS NEVER TO LIFT ANYTHING:
     it is to let the DARK STOP go dark. Every `back2` and `floor2` below is the
     far/low end of its room's gradient and every one of them came DOWN; the
     `back`, `floor` and `key` values — what a viewer actually reads the room by
     — are untouched, so the rooms are the same colour and only their shadows
     got deeper. That is `feedback_push_the_two_values_apart` on the palette. */
  bench: {
    back: "#33404A", back2: "#080B0E", floor: "#414340", floor2: "#111417",
    lip: "#525960", key: SODIUM, horizon: 452, grit: "#2A2E30",
  },
  counter: {
    back: "#5A472F", back2: "#160F09", floor: "#7A6144", floor2: "#241C13",
    lip: "#9A7A52", key: GOLD, horizon: 470, grit: "#42351F",
  },
  hall: {
    back: "#33474F", back2: "#080E13", floor: "#44535A", floor2: "#111820",
    lip: "#5C6E77", key: TEAL, horizon: 440, grit: "#28323A",
  },
  source: {
    back: "#2F3F34", back2: "#070C09", floor: "#3E5040", floor2: "#0E1510",
    lip: "#537055", key: GREEN, horizon: 458, grit: "#233022",
  },
  console: {
    back: "#63502F", back2: "#1A1409", floor: "#7C6540", floor2: "#251D11",
    lip: "#A08248", key: BRASS, horizon: 466, grit: "#463719",
  },
  spike: {
    back: "#40271D", back2: "#0D0705", floor: "#4C2D20", floor2: "#130A06",
    lip: "#69402A", key: EMBER, horizon: 460, grit: "#2A180F",
  },
  board: {
    back: "#22334C", back2: "#050810", floor: "#2E3F58", floor2: "#0C1220",
    lip: "#425A7C", key: "#7FD8E8", horizon: 448, grit: "#18202E",
  },
  plan: {
    back: "#2A4A6A", back2: "#07101E", floor: "#375A74", floor2: "#0E1A28",
    lip: "#4E7C9C", key: "#8FE4F2", horizon: 434, grit: "#1B2C3C",
  },
  plate: {
    back: "#463522", back2: "#100C07", floor: "#573F29", floor2: "#16110A",
    lip: "#775638", key: COPPER, horizon: 462, grit: "#2E2214",
  },
  runs: {
    back: "#274C3E", back2: "#06120E", floor: "#33574A", floor2: "#0C1A16",
    lip: "#457865", key: GREEN, horizon: 446, grit: "#1A3129",
  },
  doors: {
    back: "#65502C", back2: "#1C1509", floor: "#816A40", floor2: "#2A2113",
    lip: "#A98A4E", key: GOLD, horizon: 474, grit: "#4A3B1F",
  },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE ROOM. Four depth planes plus an occluder, because "is there a mass
   cropped by the panel edge, IN FRONT of the action?" is the one depth check
   that survived (ANIMATION-QUALITY §8) and ten reels shipped without one.
   ====================================================================== */
export const Room: React.FC<{
  p: Place; f: number; z?: number; lit?: number; occ?: "l" | "r" | "both" | "none";
  /** the far wall's own texture — the picking hall gets drawer ranks, the
      counter gets tile, the board gets a grid. Never a flat gradient. */
  weave?: "rank" | "tile" | "grid" | "plain";
  rake?: number; rakeRate?: number; horizonDy?: number;
  /** ⭐⭐ THE RAKE **PITCH**, PER CUT — and it is the single biggest measured
      lever in `docs/TRIAL-CUTS.md` (rake > grade > camera > bed > layout).
      ⛔ IT HAS TO BE THE PITCH, NOT THE PHASE OR THE RATE: a different phase
      inside the SAME pitch lands the bands in the same cells of an 8x8 hash and
      collapses to nothing. This reel built `RK[v].n` and then never passed it,
      so the three cuts differed only by grade and a camera offset and the body
      frames measured **5-16 bits of 64, MIN 5 against a bar of 10** — every one
      of them a duplicate risk. */
  rakeN?: number;
}> = ({ p, f, z = 4, lit = 1, occ = "l", weave = "plain", rake = 0.26,
        rakeRate = 2.1, horizonDy = 0, rakeN = 6 }) => {
  const hz = p.horizon + horizonDy;
  return (
    <>
      {/* PLANE 1 — the far wall */}
      <div style={{ position: "absolute", inset: 0, zIndex: z,
        background: `linear-gradient(178deg, ${p.back2} 0%, ${p.back} ${hz * 0.86}px, ${dkh(p.back, -0.10)} ${hz}px)` }} />

      {/* PLANE 2 — what the far wall is MADE of */}
      {weave === "rank" && Array.from({ length: 9 }, (_, i) => (
        <div key={"wv" + i} style={{ position: "absolute", left: -30 + i * 128, top: 96,
          width: 106, height: hz - 128, zIndex: z + 1,
          background: `linear-gradient(96deg, ${hexa(dkh(p.back, -0.16), 0.9)} 0%, ${hexa(mxh(p.back, 0.08), 0.7)} 100%)`,
          borderLeft: `3px solid ${hexa("#000", 0.26)}` }} />
      ))}
      {weave === "tile" && Array.from({ length: 7 }, (_, i) => (
        <div key={"tl" + i} style={{ position: "absolute", left: 0, right: 0, top: 110 + i * 52,
          height: 4, zIndex: z + 1, background: hexa("#000", 0.16) }} />
      ))}
      {weave === "grid" && (<>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"gv" + i} style={{ position: "absolute", left: i * 92, top: 70, width: 2,
            height: hz - 90, zIndex: z + 1, background: hexa(p.key, 0.13) }} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"gh" + i} style={{ position: "absolute", left: 0, right: 0, top: 90 + i * 68,
            height: 2, zIndex: z + 1, background: hexa(p.key, 0.11) }} />
        ))}
      </>)}

      {/* PLANE 3 — the ground */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: z + 2,
        background: `linear-gradient(180deg, ${dkh(p.floor2, -0.05)} 0%, ${p.floor} 54%, ${dkh(p.floor, -0.46)} 100%)` }} />
      {/* the horizon line — the single hardest edge in the room */}
      <div style={{ position: "absolute", left: 0, right: 0, top: hz - 7, height: 9, zIndex: z + 3,
        background: `linear-gradient(180deg, ${hexa("#000", 0.44)} 0%, ${p.lip} 62%, ${dkh(p.lip, -0.3)} 100%)` }} />

      {/* PLANE 4 — grit on the floor, so the ground is not a flat sweep */}
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"gr" + i} style={{ position: "absolute",
          left: rnd(i, 41) * W, top: hz + 16 + rnd(i, 42) * (H - hz - 40),
          width: 14 + rnd(i, 43) * 34, height: 5 + rnd(i, 44) * 6, borderRadius: 3,
          zIndex: z + 4, background: hexa(p.grit, 0.44), transform: `rotate(${rnd(i, 45) * 22 - 11}deg)` }} />
      ))}

      {/* THE RAKE — light falling through the roof lights, feathered, never a
          hard stripe. ⛔ 112 turned itself into venetian blinds by scaling this. */}
      {rake > 0 && (
        <Rake f={f} y={0} h={hz + 130} o={rake * lit} rate={rakeRate} z={z + 6}
          c={mxh(p.key, 0.34)} n={rakeN} skew={-15 - (rakeN - 6) * 2} />
      )}

      {/* THE OCCLUDER — the mass cropped by the frame edge, IN FRONT */}
      {(occ === "l" || occ === "both") && (
        <div style={{ position: "absolute", left: -74, top: -40, width: 178, bottom: -30,
          zIndex: 88, background: `linear-gradient(96deg, ${dkh(p.back2, -0.4)} 0%, ${dkh(p.back, -0.34)} 78%, ${hexa("#000", 0.5)} 100%)`,
          borderRight: `5px solid ${hexa("#000", 0.5)}` }} />
      )}
      {(occ === "r" || occ === "both") && (
        <div style={{ position: "absolute", right: -74, top: -40, width: 178, bottom: -30,
          zIndex: 88, background: `linear-gradient(264deg, ${dkh(p.back2, -0.4)} 0%, ${dkh(p.back, -0.34)} 78%, ${hexa("#000", 0.5)} 100%)`,
          borderLeft: `5px solid ${hexa("#000", 0.5)}` }} />
      )}
    </>
  );
};

/* ---- small shared helpers the props and scenes both need ---------------- */

/** a damped ring-out — ⛔ NOTHING IN A REEL LANDS AND SIMPLY STOPS. */
export const settle = (lf: number, at: number, amp = 1, k = 26, w = 3.1) =>
  lf < at ? 0 : Math.sin((lf - at) / w) * Math.exp(-(lf - at) / k) * amp;

/* ===========================================================================
   ⭐⭐⭐ ANTICIPATION — the note that produced this: *"the animations aren't very
   interesting either, like it doesn't show an anticipatory action or story."*

   Every authored beat in the first build was a naked `E(f, a, b, 0, 1, IN_Q)`:
   the thing simply went. ANIMATION-QUALITY §2 asks for a before state, a
   trigger, travel and a costed arrival, and all four were there — but §12's
   reel-117 finding is the missing half: *"the right fix is to draw the MECHANISM
   and let it FAIL first"*, i.e. six frames of the thing visibly REFUSING before
   it moves. That is anticipation, and it is what makes a movement read as an
   INTENTION rather than a tween.

   `antic` is the whole shape in one function:
     · COIL   — it pulls BACK against the direction of travel, easing OUT so it
                HOLDS at the top of the wind-up. This is the beat a viewer reads
                as "he is about to".
     · DRIVE  — then it accelerates through, `IN_Q`, arriving at full value at
                exactly `b`, which is also what §23 wants of anything near a cut.
     · RING   — and it never simply stops: a damped oscillation settles it.
   Returns 0 before `a`, dips to `-back`, hits 1 at `b`, then rings out.
   ========================================================================= */
export const antic = (f: number, a: number, b: number, back = 0.30) => {
  const d = Math.max(1, b - a);
  const coil = E(f, a, a + d * 0.55, 0, -back, OUT);
  const drive = E(f, a + d * 0.55, b, 0, 1 + back, IN_Q);
  const ring = f > b ? Math.sin((f - b) / 3.0) * Math.exp(-(f - b) / 9) * 0.15 : 0;
  return coil + drive + ring;
};

/** ⭐ the STRAIN that goes with it — effort peaks during the COIL, not the drive,
    because a body is most visibly loaded just before it releases. */
export const load = (f: number, a: number, b: number) => {
  const d = Math.max(1, b - a);
  return Math.max(0, E(f, a, a + d * 0.55, 0, 1, OUT) - E(f, a + d * 0.55, b, 0, 1, IN_Q));
};

/** equal-temperament step, so a repeated reward reads as PROGRESS not repetition */
export const STEP = (i: number) => Math.pow(2, i / 12);
