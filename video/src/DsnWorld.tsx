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
   REEL 127 · "DESIGN" — THE WORLD KIT.  Board: storyboards/127-design.md.

   Subject: Claude Code shipped `/design`, which publishes a canvas of editable
   artboards straight out of your terminal, and `/design-sync`, which pulls your
   repo's own design system in so the boards are built from YOUR parts instead
   of a stock template.

   ⛔⛔ THE WORLD IS "THE BOARD WORKS", BECAUSE AN ARTBOARD IS LITERALLY A BOARD.
      It is the one building where both halves of this subject are physical
      objects: the PRESS that stamps the same page forever, and the FLOOR where
      a blank board is laid down and worked on by hand. The reel walks it —
      floor, press hall, stack, desk, floor re-lit, code store, ink bench,
      fitting floor, the board face, the doors.

   ⛔⛔ IT MUST NOT BE REEL 100 APPLE (THE PROOFING FLOOR). That reel was also a
      design-tokens subject in a design hall: quiet, after hours, ONE board on an
      easel, a skill MEASURING it. This is a working industrial hall at
      architectural scale with a press running and a system BEING BUILT.

   ⛔⛔ THE VILLAIN IS `THE STOCK PLATE` AND IT IS NEVER ARGUED WITH.
      One engraved plate bolted into the press. Its RULE: **it only knows one
      page** — a purple gradient hero, a centred blob, one button. It stamps
      successfully at S1, fills a wall at S2, is still bolted in at S7, and at
      the peak it is UNBOLTED AND REPLACED by a plate cut from your own case.
      It is still hanging on the wall, still purple, on the last frame. Replaced,
      not beaten — which is the honest shape: `/design` does not delete the
      generic default, it gives Claude something better to reach for.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Every fact was checked on 2026-08-29 against Claude Code's own docs and the
      shipped skill / tool definitions, before a frame was drawn. If a claim is
      not in `R` it does not go on screen.
   ⛔ THE VO SAYS "COMPLETELY FIXES THE WORST PART OF AI CODING". That is an
      opinion. `PERF_BANNED` greps for the numbers it would be easy to invent.
   ⛔ THE VO SAYS "CLICKING AND DRAGGING". The documented canvas editing is
      click-to-select, a properties panel, inline text editing and undo/redo, so
      S9 STAGES direct manipulation and no plate writes DRAG as a feature claim.
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

/* ---- THE TWO PAINTS THE REEL ARGUES ABOUT ---------------------------------
   ⭐ THE VILLAIN HAS A COLOUR AND IT IS THE ONE EVERY VIEWER HAS SEEN. The
   AI-slop purple gradient is the single most recognisable thing in this
   subject, so it is a NAMED PAIR and it is used for nothing else in the reel.
   Recognition is the axis (§15) — a viewer identifies this in under a second
   without narration, which is what the hook laws actually ask for. */
export const SLOP = "#7C5CE0", SLOP2 = "#A87BF0", SLOPD = "#3A2A6E";

/** ⭐ AND YOUR OWN PAINT, which is what replaces it. Five house pigments,
    because the reel's number spine has five design-system groups and the ink
    trays have to fill to five DIFFERENT levels rather than being labelled. */
export const OWN = ["#D97757", "#E7B24C", "#3F9E74", "#2E6E8E", "#1A1813"] as const;

/** the board's own light — a live canvas is a practical light source in every
    room it appears in, which is what lets S4 re-light S0's geometry. */
export const LIVE = "#7FD8E8", LIVED = "#123A44";

/* ---- THE LEDGER ----------------------------------------------------------
   Sources, all checked 2026-08-29:
     · code.claude.com/docs/en/whats-new/2026-w34   (the /design release note)
     · the shipped `design` skill definition        (artboards, canvas, editing)
     · the shipped `DesignSync` tool definition     (/design-sync, the groups)
     · Anthropic's 2026-06-17 two-way sync announcement                       */
export const R = {
  keyword: "DESIGN",

  /* --- 1 · THE COMMAND -------------------------------------------------- */
  cmd: "/design",
  /** verbatim status from the release note. It is a RESEARCH PREVIEW and the
      frame says so every time the command is on screen — a preview presented as
      GA is the easiest false claim in this subject. */
  status: "RESEARCH PREVIEW",
  /** the real gate a viewer has to clear to use this at all */
  needs: "v2.1.233+",
  plans: "PRO · MAX · TEAM · ENTERPRISE",
  where: "CLI + CLAUDE CODE DESKTOP",
  /** what the release note says it actually does, compressed but not changed:
      "Run it with a brief and Claude publishes a canvas of editable artboards
      for your UI. Pick one, tweak it, then have Claude implement it." */
  does: "PUBLISHES A CANVAS OF EDITABLE ARTBOARDS",
  /** ⛔ the canvas is a LINK that gets printed, not a window that opens. S3's
      payoff is a printed link, because that is what actually happens. */
  emits: "PRINTS A LINK TO THE CANVAS",

  /* --- 2 · THE CANVAS --------------------------------------------------- */
  /** the artboard file type and the layout, from the skill definition */
  art: ".dc.html",
  canvas: "ONE PAN / ZOOM CANVAS",
  /** ⛔ THE VO SAYS "a few options" IS NOT A NUMBER. Three is what the reel
      DRAWS, and the plate says OPTIONS, never "3 every time". */
  optionsLabel: "OPTIONS",
  /** the documented on-canvas editing, and the edge the picture stops at */
  edits: ["CLICK TO SELECT", "PROPERTIES PANEL", "EDIT TEXT INLINE", "UNDO / REDO"] as const,
  saves: "SAVE PUBLISHES A NEW VERSION",

  /* --- 3 · THE SYNC ----------------------------------------------------- */
  sync: "/design-sync",
  /** two-way, and the direction this reel is about is PULL */
  pull: "IMPORTS YOUR DESIGN SYSTEM",
  push: "SENDS WHAT YOU BUILT BACK",
  /** ⛔ verbatim from the tool definition — this is why S6 draws drawers coming
      out one at a time and never a wholesale swap of the rack */
  how: "ONE COMPONENT AT A TIME",
  /** ⭐ THE NUMBER SPINE'S SPINE. These five are the tool's own `group` labels,
      not mine, and they are the only five words on the bench. */
  groups: ["TYPE", "COLORS", "SPACING", "COMPONENTS", "BRAND"] as const,
} as const;

/** ⛔ greppable guards — these must return ZERO rendered hits. Every one is a
    claim that would be easy to reach for and that no source backs. */
export const PERF_BANNED = ["10X", "X FASTER", "SOTA", "BEATS", "#1", "BEST",
                            "% FASTER", "INSTANTLY"] as const;
export const FREE_BANNED = ["FREE FOREVER", "NO LIMITS", "UNLIMITED", "GA",
                            "GENERALLY AVAILABLE", "FREE PLAN"] as const;
/** ⛔ the word the VO says and the frame may not claim as a feature */
export const DRAG_BANNED = ["DRAG", "DRAG AND DROP", "DRAGGABLE"] as const;

/* ---- THE TEN ROOMS -------------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order is
   floor -> press -> stack -> desk -> floorlit -> desk2 -> store -> bench ->
   fit -> close -> doors, which alternates warm/cold and bright/dark on every
   cut without exception.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `floor` is the only room built for it.                  */
export const PLACES: Record<string, Place> = {
  /* 1 · THE WORKS FLOOR — frame 0 lives here, so it is built for >=140: bone
     plaster, hard cold daylight through a north-light roof, a warm lit floor.
     The hierarchy is the value SPREAD between the lit bone wall and the
     near-black board falling through it, never a lifted dark stop. */
  floor:   { back: "#B4BEC8", back2: "#F6F4EE", floor: "#E0C795", floor2: "#B99A62",
             lip: "#463A28", key: "#FFF6DC", horizon: 472, grit: "#2A241A" },
  /* 2 · THE PRESS HALL — hot violet FROM BELOW, black ceiling. The villain's
     own room and the most saturated set in the reel. */
  press:   { back: "#170B2E", back2: "#4E2A8E", floor: "#3C1F6E", floor2: "#150A28",
             lip: "#0A0416", key: "#B98CFF", horizon: 452, grit: "#140826" },
  /* 3 · THE STACK — cold slate, low raking light, the room after the press. */
  stack:   { back: "#1A2028", back2: "#3E4A58", floor: "#28323C", floor2: "#121820",
             lip: "#070A0E", key: "#BAC8D8", horizon: 516, grit: "#080B10" },
  /* 4 · THE DESK — warm amber, one lamp, the hall dark behind. The biggest hue
     and lightness jump on any cut so far. */
  desk:    { back: "#2A1D0E", back2: "#7A5220", floor: "#5E4018", floor2: "#291B0A",
             lip: "#160E04", key: "#FFCE6E", horizon: 498, grit: "#1A1006" },
  /* 5 · THE FLOOR AGAIN, RE-LIT BY THE BOARD. Same geometry as `floor`, cold
     cyan thrown UP off the canvas, the roof now dark. ⭐ A returning set is a
     callback only if the LIGHT changed. */
  floorlit:{ back: "#0C1C22", back2: "#265464", floor: "#1A3A44", floor2: "#0A1A20",
             lip: "#040C10", key: "#7FD8E8", horizon: 472, grit: "#060F14" },
  /* 6 · THE DESK, TIGHTER AND COLDER — green screen-light instead of amber. */
  desk2:   { back: "#0E1E18", back2: "#26523E", floor: "#1C3A2C", floor2: "#0C1A14",
             lip: "#040C08", key: "#84E0B0", horizon: 498, grit: "#060E0A" },
  /* 7 · THE CODE STORE — cold teal, tall racks receding, one hard practical. */
  store:   { back: "#0E2229", back2: "#2A5666", floor: "#1A3E4A", floor2: "#0A1C24",
             lip: "#040E12", key: "#8FD8E6", horizon: 522, grit: "#061014" },
  /* 8 · THE INK BENCH — bright bone, a warm lamp. The brightest BODY set in the
     reel and the biggest lightness jump on any cut in it. */
  bench:   { back: "#ADA896", back2: "#F4F0E4", floor: "#D8C296", floor2: "#A88E62",
             lip: "#3A3022", key: "#FFE8AC", horizon: 490, grit: "#282016" },
  /* 9 · THE FITTING FLOOR — warm green, one high key. The peak's room. */
  fit:     { back: "#132218", back2: "#2E5E3E", floor: "#244A30", floor2: "#0E2016",
             lip: "#050E08", key: "#A6E8B4", horizon: 506, grit: "#06100A" },
  /* 10 · THE BOARD FACE — cool neutral slate, one lamp RAKING across the face
     so it has a real gradient and a moved panel casts a travelling shadow. */
  close:   { back: "#1C2028", back2: "#464E5C", floor: "#2A303A", floor2: "#14181E",
             lip: "#080A0E", key: "#C8D2DE", horizon: 540, grit: "#090B0F" },
  /* 11 · THE WORKS DOORS — DAYLIGHT. Brightest frame after the hook. */
  doors:   { back: "#93A8C0", back2: "#EFF2F5", floor: "#C0AB86", floor2: "#927C58",
             lip: "#382E20", key: "#FFF6DC", horizon: 470, grit: "#241C12" },
  /* 12 · THE FLOOR, BUILT FOR THE `SLAM` TRIAL CUT — a hook room must clear
     >=140 and a body room must sit at 70-105 with its shadows intact; one
     palette cannot do both jobs, so the tight cut gets its own. */
  facehook:{ back: "#A8B4C2", back2: "#F2F0EA", floor: "#D2E4EA", floor2: "#9EBCC6",
             lip: "#2E3C44", key: "#FFFAE8", horizon: 430, grit: "#20282E" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];
