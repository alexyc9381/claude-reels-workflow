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
import {
  Rake, Ring, Puff, Pool, Steam, Tile, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex, Counter,
} from "./StarWorld";

/* ===========================================================================
   REEL 117 · "KNOW" — THE WORLD KIT.  Board: storyboards/117-know.md.

   Subject: fifteen Claude tips, beginner to expert. Six of them are spoken;
   the guide holds the other nine. Every product claim was opened and read live
   2026-08-21 and the ledger is `R` below.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS.
      The VO's own frame is TIME: "give me 30 seconds and I'll give you 10,000
      hours". So experience is a physical material — **hour-ingots**, small
      bright bars, one hour each — and the works is a three-deck foundry-school
      where they are smelted into skill. Every prop is the literal mechanism of
      its tip: four furnaces SIZED BY WHAT THEY ARE FOR, a lit vault that feeds
      you spools until a Project shutter cuts the rails, a street of page
      windows a junior rides, a bench that eats one plain-English ticket and
      builds an app, a socket wall that re-skills whoever is on the cable.
      Nothing here is a glowing box, and nothing is a costume over an
      unrelated subject.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).

   ⛔⛔⛔ THE FOUR THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1. NO PRICE, ANYWHERE. The VO names no dollar figure in this reel, so
         there is no `$`, no `/mo`, no total. "Money" is drawn as hour-ingots
         being consumed — the currency the hook itself established.
         Guard: MONEY_BANNED.
      2. THE HAIKU BEAT GETS NO SCORE PLATE. No `%`, no accuracy gauge, no
         `WRONG` stamp, no comparison bar. The frame draws the mechanism the
         joke points at — a tiny furnace at 3x line speed making parts that
         will not stack. The claim stays in the AUDIO. And the furnace is drawn
         FAST, never BROKEN: the real trade is speed, and the reel does not get
         to invent a defect. Guard: RATE_BANNED.
      3. NO `10x` PLATE AND NO MULTIPLIER GAUGE (S12). Identical ruling to reel
         116's `20x`. The scene draws OUTPUT VOLUME — countable finished units
         filling a rack and overflowing it. Guard: RATE_BANNED.
      4. THE PROJECTS RECEIPT IS A QUOTE, NOT A VERDICT. S8's booth carries
         `SEPARATE MEMORY SPACE` — Anthropic's own three words, from the help
         centre. No "PROJECTS ARE BAD", no red cross on the product. The
         shutter does the arguing.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere — the grep gate returns 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`, and
      the real bound is `push x cam.s` wide, not `push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — under ~40px on the short
      side it vanishes in the audit's 1012->240 downsample. Reel 115 lost two
      whole scenes to 9px cords.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Ring, Puff, Pool, Steam, Tile, Crew, Hero, Forearm, costumeFor, COSTUMES,
  mono, ui, vivid, lerpHex, Counter,
};
export type { Place };

/* ---- the palette ---------------------------------------------------------
   Clay is the house colour and it is also the colour of a furnace mouth, so
   the decks are separated from each other by LIGHT and LIGHTNESS rather than
   by repainting the hero. The ingots are the brightest mass in the reel and
   every room is dark around them — which is how frame 0 carries its luma on
   hot metal and a claim plate instead of on a lifted dark stop. */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", ENAM = "#2E6B58", SODIUM = "#E7A94C", VIOLET = "#7A6494";
export const OXIDE = "#8C4A2E", CYAN = "#6FC8D8", IRON = "#4A4E57", EMBER = "#FF9A4A";
/** the hour-ingot's own two values. It is the brightest thing in the reel and
    it is never repainted — every deck reads it the same. */
export const ING = "#FFE9B4", INGH = "#FFF7DE", INGD = "#C79A46";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Every claim opened and read live 2026-08-21.
   ====================================================================== */
export const R = {
  /* the number spine. SIX tips are spoken and drawn; the guide holds FIFTEEN.
     The rail deliberately stops short of its own total during the reel, so the
     CTA is the REST of the number rather than a restatement of the promise. */
  tipsShown: 6,
  tipsTotal: 15,
  railSlots: 15,

  /* the hook's two stamped figures — both are the VO's own spoken words */
  hours: "10,000 HRS",
  hoursPlate: "10,000 HOURS",
  secs: "30 SEC",
  secsPlate: "IN 30 SECONDS",

  /* the model line, in the order the VO names them, sized by what they are for.
     ⛔ Anthropic publishes no per-model logo, so these are HOUSE-TYPE WORDMARKS
     on white tiles. Inventing a mark would be inventing a fact. */
  models: [
    { key: "haiku",  name: "HAIKU 4.5", w: 150, h: 190, c: "#5FB6D6", job: "FAST"   },
    { key: "sonnet", name: "SONNET 5",  w: 232, h: 268, c: SODIUM,    job: "DAILY"  },
    { key: "opus",   name: "OPUS 5",    w: 300, h: 344, c: "#C0563E", job: "COMPLEX"},
    { key: "fable",  name: "FABLE 5",   w: 296, h: 330, c: VIOLET,    job: "COMPLEX"},
  ],

  /* ⛔ EDGE 4: Anthropic's own words, three of them, from the help centre page
     "Use Claude's chat search and memory to build on previous context":
     "Each project has its own separate memory space and dedicated project
      summary, so the context within each of your projects is focused,
      relevant, and separate from other projects or non-project chats."
     The plate quotes it. It does not judge it. */
  projectPlate: "SEPARATE MEMORY SPACE",

  /* the four verbs, verbatim from the VO, each drawn as a visible action.
     All four are real: Claude in Chrome sees the page and takes action in it —
     clicking links, typing text, navigating between pages, filling out forms. */
  verbs: ["NAVIGATE", "READ", "CLICK", "FILL"] as const,

  /* the three jobs the sockets re-skill into, verbatim from the VO */
  jobs: ["UI DESIGN", "SCRAPING", "MARKETING"] as const,

  /* the CTA */
  keyword: "KNOW",
  ctaBig: "15 TIPS",
  ctaSub: "BEGINNER → EXPERT",

  /* the three section bands, in order */
  bands: ["BEGINNER", "INTERMEDIATE", "EXPERT"] as const,
} as const;

/** ⛔ THE VO NAMES NO MONEY IN THIS REEL. Nothing in the picture may. */
export const MONEY_BANNED = ["$", "USD", "/MO", "/YR", "PRICE", "TOTAL", "SAVED", "YOU SAVE"] as const;
/** ⛔ NO MULTIPLIER, NO SCORE, NO BENCHMARK. Edges 2 and 3. */
export const RATE_BANNED = ["10X", "%", "FASTER", "ACCURACY", "WRONG", "SCORE", "BETTER THAN"] as const;
/** ⛔ The rail may only ever read a slot number it has actually filled. */
export const COUNT_BANNED = ["100", "1,000", "MILLION", "EVERY TIP"] as const;

/* =========================================================================
   THE TWELVE PLACES. A new light AND lightness every 1.5-3s, and neighbouring
   scenes differ by BOTH hue and lightness.

   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE (ANIMATION-QUALITY §8).
   Body scenes target luma 70-105, saturated pixels 34-45%, black point p10
   <= 35. `pour` is the hook set and carries the bar through HOT METAL and the
   claim plate — never through the palette's dark stop.

   ⭐ The order below is the reel's order, so the hue/lightness alternation is
   readable as a column: sodium -> blue-grey -> sodium -> spread -> blue ->
   red/violet -> green -> teal-black -> teal -> steel -> indigo -> brass ->
   violet -> violet -> gold.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0/S1 — THE POUR HALL. The hook. Molten amber from the drum mouth at low
     left; everything else falls to shadow. The BRIGHT plane is the pour itself
     plus the lit sand floor under it, so the mean is high while the value
     SPREAD is the biggest in the reel (reel 109: brightness is the mean,
     hierarchy is the spread). */
  pour:   { back: "#3A2A1E", back2: "#8A5226", floor: "#EAD09A", floor2: "#B08A50",
            lip: "#C4914A", key: EMBER, horizon: 486, grit: "#C9A472" },

  /* S2 — THE GRIND. Deliberately the coldest, dimmest frame in the reel, so
     the burn floor that follows reads as a hard cut in BOTH hue and lightness.
     One overhead lamp, wet concrete, nothing warm anywhere. */
  grind:  { back: "#232A33", back2: "#161B22", floor: "#3E464F", floor2: "#252B32",
            lip: "#4C555F", key: "#9DB4C4", horizon: 556, grit: "#5A626B" },

  /* S3 — THE BURN FLOOR. Sodium, low and hot, from the furnace mouth only. */
  burn:   { back: "#2A1C14", back2: "#5E3418", floor: "#7A5734", floor2: "#472F1C",
            lip: "#8A5F30", key: SODIUM, horizon: 520, grit: "#7E5C34" },

  /* S4/S5/S6 — THE MODEL LINE. Four sources across one frame: warm at frame
     left grading to violet at frame right. One room, four colour temperatures,
     which is what lets the punch-ins read as new places without a new set. */
  line:   { back: "#2C2432", back2: "#4E3A34", floor: "#6E6058", floor2: "#413931",
            lip: "#7C6A5C", key: SODIUM, horizon: 528, grit: "#756557" },
  fast:   { back: "#1E2A33", back2: "#2E4E5E", floor: "#5A6B74", floor2: "#333F47",
            lip: "#6B7E88", key: "#8FD6EE", horizon: 540, grit: "#66757E" },
  deep:   { back: "#2A1E2C", back2: "#4A2430", floor: "#5E4A52", floor2: "#382A31",
            lip: "#6C5460", key: VIOLET, horizon: 536, grit: "#6A525C" },

  /* S7 — THE MEMORY VAULT. Soft library uplight, warm and generous. The
     spool wall is the biggest bright mass since the hook, on purpose: S8 has
     to be able to TAKE it away. */
  vault:  { back: "#1E3A32", back2: "#2E5A4A", floor: "#6A6A5C", floor2: "#42433A",
            lip: "#7A7A66", key: GOLD, horizon: 540, grit: "#75755F" },

  /* S8 — THE PROJECT BOOTH. The same room after the shutter: one booth bulb,
     near-black around it. This is the darkest frame in the reel and it is the
     only one allowed to be, because the scene is ABOUT the light going out. */
  booth:  { back: "#141C1E", back2: "#1E3034", floor: "#333B3C", floor2: "#1C2224",
            lip: "#3E4849", key: TEAL, horizon: 548, grit: "#4A5354" },

  /* S9 — THE STREET WINDOW. Cool teal night with sodium practicals down the
     block. Exterior, so the value range opens back up after the booth. */
  street: { back: "#1C2C38", back2: "#2E4A5C", floor: "#4A5560", floor2: "#2A333C",
            lip: "#5C6874", key: SODIUM, horizon: 566, grit: "#5A6570" },

  /* S10 — THE FORM HALL. Flat overhead steel with a violet kicker; the lamp
     the junior carries is the only MOVING light in the scene. */
  hall:   { back: "#2E3440", back2: "#4A5260", floor: "#6E7480", floor2: "#434955",
            lip: "#7C838F", key: "#B8A6D8", horizon: 528, grit: "#767C87" },

  /* S11 — THE CODE LOFT. One hot key light off the rig, the night window cold
     behind it. The biggest indigo/white spread in the top third of the reel. */
  loft:   { back: "#171C30", back2: "#28304E", floor: "#4A4E5E", floor2: "#2A2E3A",
            lip: "#585D6E", key: "#FFE0B0", horizon: 546, grit: "#5A5F6E" },

  /* S12 — THE AUTOMATION LINE. Brass, warm practicals down the run, and the
     open shaft to the grind at frame right. THE PEAK. */
  looms:  { back: "#241D16", back2: "#4E3A20", floor: "#7A6440", floor2: "#453722",
            lip: "#8A7245", key: GOLD, horizon: 534, grit: "#7E6A46" },

  /* S13/S14 — THE SOCKET WALL. Violet ambient, cyan charge travelling. The
     cables are the travelling band and they alternate lit and unlit. */
  socket: { back: "#231C34", back2: "#3A2C54", floor: "#4E4660", floor2: "#2C2740",
            lip: "#5C5470", key: CYAN, horizon: 542, grit: "#5A5268" },

  /* S15 — THE BALCONY. Dawn. The brightest frame since the hook, and the only
     one in the reel that looks DOWN at the whole works. */
  dawn:   { back: "#7A6A82", back2: "#E8C084", floor: "#9A8468", floor2: "#6A5A46",
            lip: "#B09468", key: GOLD, horizon: 470, grit: "#93805F" },
};

export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE SPINE — THE HOUR RAIL.

   ⭐ 15 slots, and only 6 of them ever light during the reel. It runs through
   every deck, always visible, always creeping upward, and it is the reel's
   travelling band: LIT SLOTS ARE BRIGHT BRASS AND UNLIT ONES ARE SHADOW, which
   is the only version of a band that raises motion WITHOUT lifting the black
   point (ANIMATION-QUALITY §1).

   ⛔ Slot pitch is 46px and the slot body is 40px on the short side — at the
   audit's 1012->240 downsample that is 9.5px, which survives. A 20px slot
   would be 4.7px and would measure as nothing.
   ====================================================================== */
export const HourRail: React.FC<{
  x: number; y: number; f: number; lit: number; z?: number;
  /** horizontal run (the CTA) vs the vertical climb (every other scene) */
  horiz?: boolean; n?: number; s?: number;
  /** frame at which each newly-lit slot pops, for the ratchet */ at?: number;
  /** the CTA's extension: slots 7..15 light in sequence from this frame */
  extendAt?: number; label?: string;
}> = ({ x, y, f, lit, z = 74, horiz = false, n = R.railSlots, s = 1, at = 0,
        extendAt, label }) => {
  const pitch = 46 * s, slot = 40 * s, thick = 56 * s;
  const run = pitch * n + 16 * s;
  /* the creep: the whole channel drifts 1px every 3 frames so the rail is
     never a static graphic, even in a scene where no slot changes */
  const creep = ((f * 0.33) % pitch) * (horiz ? 0 : -1);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      width: horiz ? run : thick, height: horiz ? thick : run,
      borderRadius: 8 * s, background: `linear-gradient(${horiz ? 180 : 90}deg, ${dkh(BRASS, 0.52)} 0%, ${dkh(BRASS, 0.30)} 46%, ${dkh(BRASS, 0.62)} 100%)`,
      border: `${3 * s}px solid ${dkh(BRASS, 0.66)}`, overflow: "hidden" }}>
      {Array.from({ length: n }, (_, i) => {
        /* slot i is lit when i < lit, or when the CTA extension has reached it */
        const ext = extendAt != null && i >= R.tipsShown
          ? f >= extendAt + (i - R.tipsShown) * 5 : false;
        const on = i < lit || ext;
        const popAt = ext ? extendAt! + (i - R.tipsShown) * 5 : at;
        const pop = on ? E(f, popAt, popAt + 6, 1.34, 1, BACK) : 1;
        const off = horiz ? i * pitch + 8 * s : run - (i + 1) * pitch + creep;
        return (
          <div key={"sl" + i} style={{ position: "absolute",
            left: horiz ? off : (thick - slot) / 2,
            top: horiz ? (thick - slot) / 2 : off,
            width: horiz ? slot : slot * 1.15, height: horiz ? slot * 0.62 : slot * 0.62,
            borderRadius: 4 * s, transform: `scale(${pop})`,
            background: on
              ? `linear-gradient(180deg, ${INGH} 0%, ${ING} 44%, ${INGD} 100%)`
              : hexa("#000000", 0.44),
            border: `${2 * s}px solid ${on ? dkh(INGD, 0.28) : hexa("#000000", 0.30)}` }} />
        );
      })}
      {label && <div style={{ position: "absolute", left: 0, right: 0,
        bottom: horiz ? -26 * s : undefined, top: horiz ? undefined : -26 * s,
        textAlign: "center" }}>
        <span style={{ ...mono(15 * s, 900), color: "#D8CFB6", letterSpacing: "0.14em" }}>{label}</span>
      </div>}
    </div>
  );
};

/* =========================================================================
   THE HOUR INGOT — the hero artifact.

   ⭐⭐⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES. This is nine elements, not a
   rounded rect: a cast body with a top facet and a bottom shadow, a chamfered
   left and right end, a machined stamp panel, the stamped text, a mould seam
   down the middle, and a hot rim that only exists when it is fresh.
   ====================================================================== */
export const Ingot: React.FC<{ x: number; y: number; s?: number; z?: number;
  rot?: number; stamp?: string; hot?: number; o?: number }> =
  ({ x, y, s = 1, z = 60, rot = 0, stamp, hot = 0, o = 1 }) => {
  const w = 118 * s, h = 44 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg)` }}>
      {/* the cast body, with a real top facet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s,
        background: `linear-gradient(178deg, ${INGH} 0%, ${ING} 34%, ${INGD} 100%)`,
        border: `${2 * s}px solid ${dkh(INGD, 0.30)}` }} />
      {/* the chamfered ends — an ingot is a truncated wedge, not a bar */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 12 * s, height: h,
        background: `linear-gradient(90deg, ${dkh(INGD, 0.34)} 0%, ${hexa(INGD, 0)} 100%)`,
        borderRadius: `${5 * s}px 0 0 ${5 * s}px` }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 12 * s, height: h,
        background: `linear-gradient(270deg, ${dkh(INGD, 0.34)} 0%, ${hexa(INGD, 0)} 100%)`,
        borderRadius: `0 ${5 * s}px ${5 * s}px 0` }} />
      {/* the machined stamp panel */}
      <div style={{ position: "absolute", left: w * 0.14, top: h * 0.20, width: w * 0.72,
        height: h * 0.54, borderRadius: 3 * s, background: hexa("#8A6A2E", 0.24),
        border: `${1.5 * s}px solid ${hexa("#7A5C24", 0.34)}`, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        {stamp && <span style={{ ...mono(15 * s, 900), color: "#6B4E1C",
          letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{stamp}</span>}
      </div>
      {/* the mould seam */}
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.62, height: 1.6 * s,
        background: hexa("#8A6A2E", 0.34) }} />
      {/* fresh out of the mould it still carries heat at the rim */}
      {hot > 0 && <div style={{ position: "absolute", inset: -3 * s, borderRadius: 7 * s,
        border: `${3 * s}px solid ${hexa(EMBER, 0.62 * hot)}` }} />}
    </div>
  );
};

/* =========================================================================
   A FURNACE — the model picker, drawn as four mouths SIZED BY WHAT THEY ARE
   FOR. The size IS the information (a number MOVES to its value; it is never
   typeset at it), so the badge only has to carry the NAME.

   ⛔ EDGE 2: `HAIKU 4.5` is drawn FAST, never BROKEN. `roar` is a rate, not a
   fault, and there is no score plate anywhere on this component.
   ====================================================================== */
export const Furnace: React.FC<{
  x: number; y: number; f: number; w: number; h: number; c: string; name: string;
  z?: number; open?: number; roar?: number; s?: number; job?: string;
}> = ({ x, y, f, w, h, c, name, z = 42, open = 0, roar = 1, s = 1, job }) => {
  const mouthW = w * 0.76, mouthH = h * 0.46;
  /* the mouth breathes on its own clock, scaled by rate. A 3x furnace flickers
     three times as often — which is the whole depiction of "fast". */
  const brt = 0.86 + Math.sin(f / (9 / roar)) * 0.12 + Math.sin(f / (3.4 / roar)) * 0.06;
  const doorLift = open * mouthH * 1.06;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the brick stack — real courses, not a flat rect */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${w * 0.06}px ${w * 0.06}px 0 0`,
        background: `linear-gradient(174deg, ${mxh(OXIDE, 0.14)} 0%, ${dkh(OXIDE, 0.30)} 62%, ${dkh(OXIDE, 0.52)} 100%)`,
        border: `${3 * s}px solid ${dkh(OXIDE, 0.56)}`, overflow: "hidden" }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"cr" + i} style={{ position: "absolute", left: 0, right: 0,
            top: (i + 1) * (h / 8), height: 2, background: hexa("#000000", 0.22) }} />
        ))}
      </div>
      {/* the arch over the mouth */}
      <div style={{ position: "absolute", left: (w - mouthW) / 2 - 10 * s,
        top: h - mouthH - 16 * s, width: mouthW + 20 * s, height: mouthH + 16 * s,
        borderRadius: `${mouthW * 0.4}px ${mouthW * 0.4}px 0 0`,
        background: dkh(OXIDE, 0.62) }} />
      {/* the mouth itself — the practical, and the only bright thing on it */}
      <div style={{ position: "absolute", left: (w - mouthW) / 2, top: h - mouthH,
        width: mouthW, height: mouthH, overflow: "hidden",
        borderRadius: `${mouthW * 0.36}px ${mouthW * 0.36}px 0 0`,
        background: `radial-gradient(130% 150% at 50% 100%, ${hexa("#FFFFFF", brt)} 0%, ${hexa(INGH, brt)} 22%, ${hexa(c, brt * 0.94)} 52%, ${dkh(c, 0.50)} 100%)` }}>
        {/* the door, lifted by `open` */}
        <div style={{ position: "absolute", left: 0, right: 0, top: -doorLift, height: mouthH,
          background: `linear-gradient(180deg, ${dkh(IRON, 0.12)} 0%, ${dkh(IRON, 0.44)} 100%)`,
          borderBottom: `${4 * s}px solid ${dkh(IRON, 0.60)}` }}>
          <div style={{ position: "absolute", left: "50%", top: "40%", width: mouthW * 0.30,
            height: 6 * s, marginLeft: -mouthW * 0.15, borderRadius: 3 * s, background: dkh(IRON, 0.62) }} />
        </div>
      </div>
      {/* the badge — a HOUSE-TYPE WORDMARK on a white tile. Anthropic publishes
          no per-model logo and inventing one would be inventing a fact. */}
      <div style={{ position: "absolute", left: "50%", top: h * 0.16, transform: "translateX(-50%)",
        padding: `${6 * s}px ${12 * s}px`, borderRadius: 7 * s, background: "#FFFFFF",
        border: `${2.5 * s}px solid #E4DCC8`, whiteSpace: "nowrap", boxShadow: SH }}>
        <span style={{ ...ui(Math.max(15, w * 0.098), 900), color: "#241F17", letterSpacing: "0.02em" }}>{name}</span>
      </div>
      {job && <div style={{ position: "absolute", left: "50%", top: h * 0.16 + 34 * s,
        transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
        <span style={{ ...mono(Math.max(11, w * 0.062), 900), color: hexa("#FFF0D0", 0.72),
          letterSpacing: "0.16em" }}>{job}</span>
      </div>}
      {/* the flue, so the stack reads as plant and not as a cabinet */}
      <div style={{ position: "absolute", left: w * 0.68, top: -h * 0.22, width: w * 0.16,
        height: h * 0.24, background: dkh(IRON, 0.30), borderRadius: `${w * 0.03}px ${w * 0.03}px 0 0`,
        border: `${2.5 * s}px solid ${dkh(IRON, 0.52)}` }} />
    </div>
  );
};

/* =========================================================================
   A SECTION BAND — BEGINNER / INTERMEDIATE / EXPERT.

   ⛔ ONE TEXT CHIP PER SHOT, in a band nothing else enters. This is that chip,
   and it is the only typeset thing allowed in a body scene besides the rail
   label and a prop's own stamped face.
   ====================================================================== */
export const Band: React.FC<{ t: string; f: number; at?: number; y?: number; c?: string;
  z?: number; sub?: string }> =
  ({ t, f, at = 0, y = 96, c = GOLD, z = 88, sub }) => {
  const inS = E(f, at, at + 8, 0, 1, BACK);
  const slide = E(f, at, at + 10, -26, 0, OUT);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, zIndex: z,
      display: "flex", justifyContent: "center", opacity: inS,
      transform: `translateY(${slide}px)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12,
        padding: "9px 20px 9px 12px", borderRadius: 13, background: hexa("#0C0E14", 0.80),
        border: `2.5px solid ${hexa(c, 0.60)}` }}>
        <div style={{ width: 13, height: 13, borderRadius: 3, background: c }} />
        <span style={{ ...mono(23, 900), color: "#F6EEDC", letterSpacing: "0.18em" }}>{t}</span>
        {sub && <span style={{ ...mono(17, 800), color: hexa("#F6EEDC", 0.52),
          letterSpacing: "0.10em" }}>{sub}</span>}
      </div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE WALL MARK — the Claude emblem CAST INTO A SET, for the empty half
   of a frame.

   Alex, on the delivered cut: *"for certain scenes where there are blank parts,
   try to incorporate the Claude logo more throughout."* This is the standing
   note from reel 95 round 3 arriving again — *"more Claude logos throughout…
   so our target Claude audience keeps watching but other randoms don't."*
   ⛔ THE MARK IS AN AUDIENCE FILTER, NOT BRANDING, and a floating sticker is
   the wrong answer to both halves of that. What belongs in a works is an
   emblem CAST INTO the wall it hangs on: a recessed plate, a bevel that catches
   the room's own key light, four fixing bolts, and the mark proud on it.

   ⭐ It also does three jobs at once, which is why it is worth building rather
   than pasting a logo:
     1 it FILLS the blank upper third that most of these sets have
     2 it TURNS, and a slow rotation on a fixture is the cheapest legitimate
       motion in the frame — it costs the hierarchy nothing because it is
       furniture, not a subject
     3 the mark is saturated house clay, which feeds BODY_SAT rather than
       fighting it

   ⛔ NEVER on a sprite (the mascot's body IS its face) and never in the middle
   of a claim plate — a mark placed at a plate's centre carves its bright region
   in two and the frame-0 plate gate sizes the largest remaining piece.
   ====================================================================== */
export const WallMark: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  /** the room's own key colour, so the bevel belongs to THIS set */ c?: string;
  o?: number; spin?: number; plate?: boolean }> =
  ({ x, y, f, s = 168, z = 16, c = GOLD, o = 1, spin = 0.22, plate = true }) => {
  const d = s * 1.42;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z, opacity: o }}>
      {plate && <>
        {/* the recess it is set into */}
        <div style={{ position: "absolute", inset: 0, borderRadius: d * 0.20,
          background: hexa("#0A0C12", 0.42) }} />
        {/* the plate, lit from the room's own key */}
        <div style={{ position: "absolute", inset: d * 0.05, borderRadius: d * 0.17,
          background: `linear-gradient(158deg, ${hexa(mxh(c, 0.30), 0.30)} 0%, ${hexa(dkh(c, 0.44), 0.26)} 100%)`,
          border: `${Math.max(3, d * 0.022)}px solid ${hexa(dkh(c, 0.50), 0.44)}` }} />
        {/* four fixing bolts — what makes it CAST IN rather than stuck on */}
        {[[0.13, 0.13], [0.87, 0.13], [0.13, 0.87], [0.87, 0.87]].map((q, i) => (
          <div key={"bx" + i} style={{ position: "absolute", left: `${q[0] * 100}%`,
            top: `${q[1] * 100}%`, width: d * 0.055, height: d * 0.055,
            marginLeft: -d * 0.0275, marginTop: -d * 0.0275, borderRadius: "50%",
            background: hexa(mxh(c, 0.24), 0.34) }} />
        ))}
      </>}
      <div style={{ position: "absolute", left: d / 2 - s * 0.34, top: d / 2 - s * 0.34,
        width: s * 0.68, height: s * 0.68,
        transform: `rotate(${(f * spin) % 360}deg)` }}>
        <Img src={staticFile("logos/claude.svg")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE SECTION CARD — the three tiers, made unmissable.

   Alex, on the delivered cut: *"when I say beginner, intermediate, expert it
   should be clear separations and showing the headers, showing the separations,
   very clear and structured."*

   ⛔ AND I HAD REMOVED THE THING THAT DID THIS. Round 1 deleted the per-scene
   `Band` chip on the grounds that `HookHeader` already carried the tier and
   `feedback_graphical_over_textual` says ONE text chip per shot. Both of those
   are true and the conclusion was still wrong: a pill that quietly swaps a word
   at the top of the frame is not a SEPARATION, it is a label. A structure the
   viewer can feel needs a beat where one section ENDS and the next BEGINS.

   ⭐ So this is a real title card, and it is the only place in the reel where
   type is allowed to be the subject: a full-width band that drives in on the
   spoken word, holds ~1.1s, and leaves. It carries
     · the tier number as a fraction (1/3, 2/3, 3/3) — the structure, countable
     · the tier name, huge
     · a rule of 15 ticks with THIS tier's slice lit — so the card also says
       where you are in the fifteen, which is the reel's number spine
   ⛔ It sits ABOVE the panel content but BELOW nothing: `Scene`'s vignette is a
   sibling at z97, so a card inside `children` can never beat it. It is passed
   to `Scene` as `overlay` instead.
   ====================================================================== */
export const SectionCard: React.FC<{
  t: string; n: number; f: number; at: number; hold?: number; c?: string;
  /** which rail slots this tier owns, for the tick rule */ from: number; to: number;
  /** per-cut vertical position and grade — a card that is byte-identical in all
      three cuts makes every frame it appears on a duplicate risk */
  top?: number; grade?: string;
  /** ⛔ THE BADGE FILL. See the block below — this is NOT the same value as `c`. */
  bc?: string;
}> = ({ t, n, f, at, hold = 34, c = GOLD, from, to, top = 664, grade, bc }) => {
  const lf = f - at;
  const OUT_AT = 12 + hold;
  if (lf < -2 || lf > OUT_AT + 14) return null;
  /* drive in hard, hold, then leave the way it came — a wipe, never a fade,
     because a fade at this size reads as a mistake rather than as a cut */
  const inX = E(lf, 0, 11, -1180, 0, BACK);
  const outX = E(lf, OUT_AT, OUT_AT + 12, 0, 1180, IN_Q);
  const x = inX + outX;
  const shake = lf >= 11 && lf < 17 ? Math.sin((lf - 11) * 2.2) * 5 * (1 - (lf - 11) / 6) : 0;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top, zIndex: 99, filter: grade,
      transform: `translateX(${x}px) translateY(${shake}px)`, pointerEvents: "none" }}>
      {/* the dark shadow bar behind it, so the card has a thickness */}
      <div style={{ position: "absolute", left: 14, right: 14, top: 18, height: 226,
        borderRadius: 22, background: hexa("#06070C", 0.86) }} />
      {/* and a hard dark rule under it, so the card sits ON something */}
      <div style={{ position: "absolute", left: 22, right: 22, top: 236, height: 14,
        borderRadius: 7, background: hexa("#06070C", 0.62) }} />
      <div style={{ position: "absolute", left: 22, right: 22, top: 0, height: 214,
        borderRadius: 20, background: CREAMB, border: `9px solid ${INK}`,
        display: "flex", alignItems: "center", gap: 26, padding: "0 30px", overflow: "hidden" }}>
        {/* ⛔⛔ THE TIER NUMBER, AND IT IS INVERTED FOR A MEASURED REASON.
            Alex, on the delivered cut: *"these icons here for 1, 2, 3 are too
            dark, can't really see."* v1 set the numeral in the TIER colour on
            an INK badge, and measured as WCAG contrast that is:
              BEGINNER  #E7A94C on ink   8.60:1   ok
              INTERMED  #7FC0C9 on ink   8.69:1   ok
              EXPERT    #7A6494 on ink   3.44:1   ⛔ under the 4.5 floor
            The violet is a MID-TONE, so it was never going to survive being put
            on near-black — and a badge that is only legible for two of three
            tiers is broken for all three, because the set has to read as one
            system. Inverted: a FILLED badge in a lifted tier colour with the
            numeral in INK gives 10.57 / 11.40 / 8.24, and it also makes the
            tier COLOUR the thing you see first rather than a dark chip.
            ⛔ `bc` is deliberately a separate value from `c`: the badge needs a
            LIGHT fill to carry dark type, while the tick rule below sits on a
            CREAM plate and needs the SATURATED colour to read against it. One
            value cannot do both jobs. */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
          padding: "12px 24px", borderRadius: 14, whiteSpace: "nowrap",
          background: bc ?? c, border: `4px solid ${dkh(bc ?? c, 0.34)}` }}>
          <span style={{ ...ui(76, 900), color: INK, lineHeight: 0.88 }}>{n}</span>
          <span style={{ ...mono(24, 900), color: hexa("#1A1813", 0.66), lineHeight: 1.1 }}>/3</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...ui(t.length > 10 ? 68 : 82, 900), color: INK, lineHeight: 0.94,
            letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>{t}</div>
          {/* the rule of fifteen, with THIS tier's slice lit */}
          <div style={{ display: "flex", gap: 5, marginTop: 14 }}>
            {Array.from({ length: R.railSlots }, (_, i) => {
              const on = i >= from && i < to;
              return (
                <div key={"tk" + i} style={{ width: 34, height: 14, borderRadius: 3,
                  background: on ? c : hexa("#241F17", 0.16),
                  border: on ? `2px solid ${dkh(c, 0.34)}` : "2px solid transparent" }} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   A BELT — the background process. Every shot needs one running, and it costs
   the hierarchy nothing because it is furniture.

   ⭐ It is also the cheapest legitimate motion in the frame: a full-width band
   whose swept area is large and whose slats alternate light and shadow.
   ====================================================================== */
export const Belt: React.FC<{ y: number; f: number; z?: number; h?: number; rate?: number;
  c?: string; x0?: number; w?: number; n?: number }> =
  ({ y, f, z = 24, h = 26, rate = 4.2, c = IRON, x0 = -120, w = 1260, n = 22 }) => {
  const pitch = w / n;
  return (
    <div style={{ position: "absolute", left: x0, top: y, width: w, height: h, zIndex: z,
      overflow: "hidden", borderRadius: 4,
      background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.34)} 100%)`,
      borderTop: `3px solid ${mxh(c, 0.22)}`, borderBottom: `3px solid ${dkh(c, 0.52)}` }}>
      {Array.from({ length: n + 2 }, (_, i) => (
        <div key={"bs" + i} style={{ position: "absolute", top: 0, height: h,
          left: ((i * pitch + f * rate) % (w + pitch)) - pitch,
          width: pitch * 0.42,
          background: i % 2 ? hexa("#000000", 0.30) : hexa(INGH, 0.16) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   A CABLE — used by the socket wall and the vault feed rails.

   ⛔⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO. Reel 115 built two scenes
   around 9px cords and both measured LOWEST in the reel, because 9px is 2.1px
   after the audit's 1012->240 downsample. These are 40px minimum, and the
   charge travelling down them is 74px.
   ====================================================================== */
export const Cable: React.FC<{ x0: number; y0: number; x1: number; y1: number; f: number;
  at?: number; c?: string; z?: number; w?: number; charge?: boolean; rate?: number;
  live?: number }> =
  ({ x0, y0, x1, y1, f, at = 0, c = IRON, z = 34, w = 40, charge = false, rate = 7, live = 1 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  const lf = f - at;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      borderRadius: w / 2, overflow: "hidden",
      background: `linear-gradient(180deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.30)} 52%, ${dkh(c, 0.56)} 100%)`,
      border: `2px solid ${dkh(c, 0.58)}` }}>
      {charge && lf >= 0 && Array.from({ length: 3 }, (_, i) => {
        const t = ((lf * rate + i * (len / 3)) % (len + 90)) - 74;
        return (
          <div key={"ch" + i} style={{ position: "absolute", left: t, top: w * 0.16,
            width: 74, height: w * 0.68, borderRadius: w * 0.34, opacity: live,
            background: `linear-gradient(90deg, ${hexa(CYAN, 0)} 0%, ${hexa(INGH, 0.92)} 46%, ${hexa(CYAN, 0)} 100%)` }} />
        );
      })}
    </div>
  );
};
