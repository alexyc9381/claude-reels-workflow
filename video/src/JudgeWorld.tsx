import React from "react";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE WORLD KIT.  Board: storyboards/132-judge.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from reel 122's `HwWorld` verbatim — the Rake, the Runner, the four action
   loops on `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the
   twelve costume levers, `Scene`/`Cam`/`Panel`. Only the PLACES, the LEDGER and
   the props are new (`memory/reel-clone-chassis-verbatim`).

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "LYING".
      A courthouse where the defendant is not a person — it is YOUR WORK. The
      brief in the dock is the output Claude swore was finished. Three sub-agents
      are the three benches: a PROSECUTOR who finds everything wrong with it, a
      DEFENSE who argues back, and a JUDGE who rules on the evidence. The loop is
      a real circular rail overhead that carries the work back down to be rebuilt.

   ⛔⛔ THE VILLAIN IS `THE GOLD SEAL` AND IT LOSES EXACTLY ONCE, AT S12.
      It is the confident lie: a pressed gold seal and a green tick on work that
      is hollow. It wins the hook (the needle proves the lie and the seal is
      still gleaming), it is untouched under fourteen flag strikes at S10, it
      survives the gavel at S11, and it cracks off on the FIRST loop pass at S12
      — the peak. An arc where the blocker survives everything until the peak.

   ⛔⛔⛔ AND THE VILLAIN IS NOT DRAWN UGLY (docs/ANIMATION-QUALITY §23).
      The script disparages DISHONESTY, not craftsmanship — the whole premise is
      that the wrong output looks finished. `Brief` at state 0 is the handsomest
      object in the reel: oxblood board, gilt rule, a real pressed seal, a green
      tick. Drawing the villain grey would be a dead frame AND a false claim.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      The VO is the only source. Two numbers are spoken — 73% and one minute —
      and they appear in exactly the two places they are spoken. No token count,
      no price, no benchmark, no rival product, and no sentence attributed to any
      person or company. The four guards below are greppable and must return
      zero rendered hits.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — really "survives the audit's
      1012->240 downsample", i.e. a 52px object is 12px when differenced.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
};
export type { Place };

/* ---- the palette — the house matte set, unchanged ------------------------ */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", PCB = "#2E5A46", COPPER = "#C87F4A";
export const MAG = "#C2559A", INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", WIG = "#E8E3D6";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   ====================================================================== */
export const R = {
  /** ⭐ THE TWO SPOKEN NUMBERS, AND NOTHING ELSE IS A NUMBER IN THIS REEL.
      "it makes your output 73% more accurate" and "it takes just 1 minute to
      set up" — both said, both drawn once, each in the place a real instrument
      would carry it (a dial face, a timer flag), never typeset as a caption. */
  accuracy: 73,
  setup: "1 MIN",
  /** "the third line of the prompt" — three rungs, and the third is the hot one.
      ⛔ THE PROMPT ITSELF IS NEVER SHOWN (memory `gate-the-how`): the rungs
      carry no text at all, only a position. The HOW is the lead magnet. */
  lines: 3,
  /** "you assign a judge, a prosecutor, and a defense" — spoken in this order,
      so assigned in this order. Each is a different SILHOUETTE and a different
      accent colour: identity is shape AND colour, never a label on a twin. */
  roles: [
    { n: "JUDGE",      c: "#E7B24C", fg: "#2A1C04", costume: { prof: 1 } },
    { n: "PROSECUTOR", c: "#C44A3A", fg: "#2A0C08", costume: { suit: 1 } },
    { n: "DEFENSE",    c: "#7FC0C9", fg: "#04262C", costume: { glasses: 1 } },
  ] as const,
  /** "ship entire apps, websites, and tools from a single prompt" — three
      nouns, three doors, three DIFFERENT machines finishing three different
      jobs. A door that opens on a box is a container; a door that opens on a
      job being finished is a depiction. */
  goods: ["APP", "SITE", "TOOL"] as const,
  /** "so they loop and rebuild until the work is bulletproof" — three passes,
      each shorter than the last, marked in roman on the carriage because that
      is what a pass counter on a rig looks like. */
  passes: ["I", "II", "III"] as const,
  /** what the lie says on its face at frame 0. This is the dreaded string: the
      thing every Claude Code user has been handed and believed. */
  lie: "DONE",
  keyword: "JUDGE",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Judge*.tsx` must return zero hits
    inside a rendered string.
    · COST: "this burns through tokens fast" is spoken with NO quantity, so the
      furnace column has no numerals and no currency anywhere on it. An invented
      token count is the most believable kind of wrong.
    · CLAIM: none of these is spoken. 73% is a spoken figure about accuracy and
      it does not license a superlative anywhere else in the frame.
    · QUOTE: "even the creators of Claude think this is the future of AI" is an
      assertion the frame CANNOT source, so S4 dramatises the MECHANISM of
      endorsement — a mark being struck into brass — and stops there. No person,
      no company name, no sentence in anyone's mouth.
    · NAME: the VO names no product but Claude. The technique's name is the
      keyword and the keyword is the CTA. */
export const COST_BANNED = ["$", "USD", "TOKENS/", "PER RUN", "M TOKENS", "K TOKENS"] as const;
export const CLAIM_BANNED = ["100%", "GUARANTEED", "UNLIMITED", "BEST", "SOTA", "BENCHMARK", "#1"] as const;
export const QUOTE_BANNED = ["ANTHROPIC", "SAID", "OFFICIAL", "ENDORSED", "APPROVED BY"] as const;
export const NAME_BANNED = ["GPT", "CURSOR", "COPILOT", "GEMINI", "DEVIN"] as const;

/* ---- THE FIFTEEN PLACES --------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
   stand(bright warm) -> dial(dark green) -> dialc(dark green, re-lit brass) ->
   dock(bright cold) -> seal(dark oxblood) -> chamber(mid amber) -> hall(dark
   cold) -> muster(bright hot) -> rack(dark teal) -> robing(mid violet) ->
   board(mid cold) -> floor(dark warm) -> pit(dark contrast) -> furnace(hot) ->
   bay(bright cold) -> steps(mid warm).
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `stand` is the only place built for it — a big lit bone
   evidence wall with a near-black polygraph drum in front of it, which is where
   the reel's biggest value SPREAD comes from. Brightness is the MEAN; hierarchy
   is the SPREAD; they only fight if you reach for the dark stop.
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  /* 1 · THE STAND — bone-panelled court corner under a hard warm clerestory.
     Frame 0 lives here so it is built for >=140. */
  stand:  { back: "#B6BCC4", back2: "#F6F2E6", floor: "#D8C7A6", floor2: "#B29A72",
            lip: "#4A3A26", key: "#FFDC9E", horizon: 498, grit: "#2A2016" },
  /* 2 · THE INSTRUMENT BENCH — ink-green machine room, one brass gauge lit. */
  dial:   { back: "#0E1E1A", back2: "#274038", floor: "#1C2E28", floor2: "#0A1512",
            lip: "#050C0A", key: "#8FE0BE", horizon: 516, grit: "#050A08" },
  /* 3 · THE SAME BENCH, RE-FRAMED CLOSE AND RE-LIT BRASS for the timer. */
  dialc:  { back: "#16241C", back2: "#3C5240", floor: "#2A3A2E", floor2: "#111C16",
            lip: "#070E0A", key: "#FFD08A", horizon: 540, grit: "#070C09" },
  /* 4 · THE DELIVERY DOCK — cold daylight, roller doors, steel blue. */
  dock:   { back: "#8FA8C4", back2: "#EFF1EA", floor: "#BCAE90", floor2: "#7E7460",
            lip: "#2E2A22", key: "#FFF0CE", horizon: 476, grit: "#1E1A14" },
  /* 5 · THE SEAL ROOM — oxblood and brass, one overhead cone. */
  seal:   { back: "#2A0E0C", back2: "#6E2A22", floor: "#4E2018", floor2: "#240C0A",
            lip: "#120504", key: "#FFC08A", horizon: 508, grit: "#150605" },
  /* 6 · THE CHAMBER — the courtroom revealed. Amber, high clerestory. */
  chamber:{ back: "#3A2A16", back2: "#A87A38", floor: "#7A5A2E", floor2: "#3A2A14",
            lip: "#1A1208", key: "#FFD68E", horizon: 486, grit: "#1C1308" },
  /* 7 · THE CORRIDOR — grey-blue, drab, a flickering strip. The only
     deliberately under-lit set: it is what the method replaces. */
  hall:   { back: "#232A32", back2: "#4A5460", floor: "#303842", floor2: "#171C22",
            lip: "#0A0D11", key: "#B8C6D2", horizon: 524, grit: "#0B0E12" },
  /* 8 · THE MUSTER HALL — hot amber, high key, tall doors. */
  muster: { back: "#4A2E10", back2: "#E0A048", floor: "#B4813A", floor2: "#5A3C16",
            lip: "#241706", key: "#FFE0A0", horizon: 470, grit: "#221606" },
  /* 9 · THE PROMPT RACK — dark teal machine room. */
  rack:   { back: "#0C1E24", back2: "#245058", floor: "#183A40", floor2: "#0A1A1E",
            lip: "#040E11", key: "#8EE4F2", horizon: 522, grit: "#040C0F" },
  /* 10 · THE ROBING ROOM — violet with a bone floor and three lit alcoves. */
  robing: { back: "#241A38", back2: "#6E56A0", floor: "#B8AEC4", floor2: "#6E6480",
            lip: "#140E22", key: "#D6BCFF", horizon: 500, grit: "#150F24" },
  /* 11 · THE EVIDENCE ROOM — cold slate, one huge backlit board. */
  board:  { back: "#1E262E", back2: "#5A6672", floor: "#3A444E", floor2: "#1A2026",
            lip: "#080C10", key: "#DCE8F2", horizon: 540, grit: "#090D11" },
  /* 12 · THE COURT FLOOR — warm ink, two hard pools, gallery in silhouette. */
  floor:  { back: "#1C1408", back2: "#4E3A18", floor: "#3A2C14", floor2: "#160F06",
            lip: "#0A0704", key: "#FFCE7A", horizon: 494, grit: "#0C0805" },
  /* 13 · THE PROVING PIT — the loop rail above, furnace glow below. Highest
     contrast set in the reel and the peak lives here. */
  pit:    { back: "#120C10", back2: "#3E1E14", floor: "#2A1A12", floor2: "#0E0806",
            lip: "#060302", key: "#FF9A4A", horizon: 512, grit: "#080403" },
  /* 14 · THE FURNACE — orange and black. */
  furnace:{ back: "#28100A", back2: "#9E4212", floor: "#6E3010", floor2: "#2A1006",
            lip: "#140603", key: "#FFB25A", horizon: 504, grit: "#160704" },
  /* 15 · THE LAUNCH BAY — cold bright, tall doors. */
  bay:    { back: "#93A9C2", back2: "#EFF2F0", floor: "#B6AE98", floor2: "#7E7866",
            lip: "#2E2C26", key: "#FFF4DE", horizon: 466, grit: "#1E1C16" },
  /* 16 · THE FRONT STEPS AT EVENING — warm, doors spilling light. */
  steps:  { back: "#2A2032", back2: "#7A5A62", floor: "#68503E", floor2: "#302420",
            lip: "#160F12", key: "#FFD8A0", horizon: 490, grit: "#1A1114" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210. The cast
    owns the ground line; `HookHeader` owns y 0..96. Reel 112 shipped plates at
    y 600-640 and got *"the claude sprites are covered by the text boxes."*
    ⛔ AND NOTHING LANDS ON THE FACE (reel 124): the sprite's face is the surface
    the beat is read off, so props land beside, in front of, or into its hands. */
export const BAND_Y = 132;

/** ⛔ THE SAFE BOX FOR ALL THREE CUTS. The visible window is `push x cam.s` and
    `cam` differs PER VARIANT, so what survives every cut is the INTERSECTION,
    not any one cut's bound. Computed once here from `CAM` in JudgeScenes:
      house s1.010 dx  -8  ->  x  26..936
      amber s1.046 dx -52  ->  x  30..866
      steel s1.050 dx  50  ->  x 132..974
      SAFE FOR ALL THREE   ->  x 132..866  (734px, not 1012)
    Anything that must be readable in every cut is laid out inside this. */
export const SAFE3 = { x0: 132, x1: 866, cx: 499 } as const;
