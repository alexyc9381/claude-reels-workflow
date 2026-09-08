import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 143 · "DEPARTMENT" — THE WORLD KIT.  Board: storyboards/143-department.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from `HwWorld` verbatim (the same route reel 141 took). Only the PLACES, the
   LEDGER, the palette table and the props below are new.

   ⭐⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "DEPARTMENT".
      A ONE-MAN WORKS. It opens on a single trade counter where one Claude is
      wearing every job at once, and it opens OUT into a five-bay working floor
      — marketing, social, design, finance, legal — each bay its own colour, its
      own light and its own machine. The reel's shape is the shape of the claim:
      one body carrying five jobs becomes five bodies carrying one each.

   ⭐ THE HOOK MECHANISM IS **ACCUMULATION UNDER LOAD**, and its resolution is
      **TRANSFER** — the five hats do not explode, they lift off and go and find
      five bodies, because the next sentence is "free skills for every single
      department". The hand-off out of a hook is a SENTENCE, not an effect.

   ⛔ ONE VILLAIN, physical and named: **THE GENERIC** — a press that stamps out
      a genuinely handsome page, identical, again and again, onto a stack. Its
      rule: whatever you feed it, the same thing comes out. Introduced S8, it
      WINS at S14 (fifty skills in, one blank slab out), and is beaten only by
      S15's rewrite.
      ⛔⛔ IT IS NEVER DRAWN UGLY. `feedback_villain_is_sameness_not_ugliness`:
      drawing the competitor grey is a dead frame AND a false claim. Sameness is
      dramatised by REPETITION, and repetition is free motion.

   ⛔ THE HERO IS NEVER TINTED. Colour goes on the bays, the crew and the lamps.
      He loses a hat per bay and ends the reel wearing none.

   ⛔ THE HONESTY LEDGER IS `D` BELOW AND NOWHERE ELSE. This reel arrived as a
      pre-recorded VO, so its only sourcing is the VO itself: **every number on
      screen is a number Alex says out loud, and nothing else is drawn.** No
      star counts, no install counts, no publisher names, no prices but $0.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()`/`lerpHex()` are hex-in/rgb-out and DO NOT NEST. dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO position/inset/zIndex is a CONTAINING BLOCK
      and its absolutely-positioned children vanish. Use `Cam`.
   ⛔ `Mascot` draws its body at ~100% of `size`. Sprite pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS: a 52px object is 12px after the
      audit's 1012->240 downsample.
   ⛔ `E` CLAMPS. An entrance that ends at 1 is a FREEZE and a decay is at full
      strength BEFORE it starts. Every arrival below is followed by an idle,
      a settle or a departure that has its own clock.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
};
export type { Place };

/* ---- the palette — the house matte set ---------------------------------- */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", SODIUM = "#E7A94C", VIOLET = "#8B72B0", EMBER = "#E06A2C";
export const SLATE = "#4E5A62", BONE = "#EFE7D4", IRON = "#5A6068", CHROME = "#C9CFD4";
export const OXBLOOD = "#8E3B37", MOSS = "#5E7A52", GUNMETAL = "#2A3340", PLUM = "#6E5386";

/** the cast ground line, panel-local */
export const GY = 700;

/* =========================================================================
   ⭐⭐ THE FIVE DEPARTMENTS — ONE TABLE, READ BY EVERYTHING.
   The bay lamp, the hat, the name plate, the crew tint and the department's own
   machine all read out of this, so CLAY always means marketing and PLUM always
   means design. `feedback_colour_the_sprite_not_the_plate`.
   ⛔ The `n` column is the ONLY count that department is allowed to assert, and
   every one of them is a number the VO says out loud.
   ====================================================================== */
export type DeptKey = "mkt" | "soc" | "dsg" | "fin" | "leg";

export const DEPTS: Array<{
  k: DeptKey; no: string; name: string; key: string; deep: string; lamp: string;
  /** the count the VO gives this department, and how it is spoken */
  n: number; unit: string;
  /** the hat this department's Claude wears, and the costume lever underneath */
  hat: "cap" | "phones" | "beret" | "visor" | "wig";
  costume: Record<string, number>;
}> = [
  { k: "mkt", no: "01", name: "MARKETING",    key: CLAY,   deep: "#8E4227", lamp: "#F0A874", n: 45, unit: "SKILLS", hat: "cap",    costume: { constr: 1 } },
  { k: "soc", no: "02", name: "SOCIAL MEDIA", key: TEAL,   deep: "#2E5F69", lamp: "#A6E0E8", n: 17, unit: "SKILLS", hat: "phones", costume: { glasses: 1 } },
  { k: "dsg", no: "03", name: "DESIGN",       key: PLUM,   deep: "#3E2F52", lamp: "#C4A8E0", n: 2,  unit: "PLUGINS", hat: "beret", costume: { beard: 1 } },
  { k: "fin", no: "04", name: "FINANCE",      key: GREEN,  deep: "#255745", lamp: "#8FD4B0", n: 8,  unit: "SKILLS", hat: "visor",  costume: { prof: 1 } },
  { k: "leg", no: "05", name: "LEGAL",        key: OXBLOOD, deep: "#4C1F1E", lamp: "#E8A08C", n: 9, unit: "SKILLS", hat: "wig",    costume: { suit: 1 } },
];
export const DEPT = Object.fromEntries(DEPTS.map(d => [d.k, d])) as Record<DeptKey, typeof DEPTS[number]>;

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   ⛔ SOURCE: THE VO, AND ONLY THE VO. This reel arrived pre-recorded, so there
   is no capture stage behind it and therefore no licence to add facts. If Alex
   does not say it, it does not go on screen.
   ====================================================================== */
export const D = {
  keyword: "DEPARTMENT",
  price: "$0",
  count: "05",
  countWord: "DEPARTMENTS",
  file: "SKILL.md",
  /** the two design plugins, named in the VO */
  design: [
    { t: "UI UX PRO", sub: "LAYOUT · SPACING · STATES" },
    { t: "TASTE",     sub: "TYPE · COLOUR · RESTRAINT" },
  ] as const,
  /** the marketing pack's own spread, in the VO's own two words */
  mktSpread: ["AD CREATIVES", "COPYWRITING"] as const,
  /** the social pack's, in the VO's own three */
  socSpread: ["SCRIPTS", "THUMBNAILS", "CONTENT IDS"] as const,
  finSpread: ["FINANCIAL STATEMENTS", "VARIANCE ANALYSIS"] as const,
  legSpread: ["CONTRACTS", "LEGAL BRIEFS"] as const,
  /** the number the warning line uses */
  heap: 50,
  agent: "CLAUDE CODE",
} as const;

/** ⛔ GREPPABLE GUARDS. None of these may ever be rendered: the VO makes no
    speed, ranking, popularity or pricing claim beyond "$0", so neither does the
    picture. `tools/` greps the built bundle for them before ship. */
export const SPEED_BANNED = ["X FASTER", "BENCHMARK", "BEATS", "SOTA", "#1", "BEST"] as const;
export const COUNT_BANNED = ["★", "STARS", "INSTALLS", "DOWNLOADS", "USERS", "/MO", "PER MONTH"] as const;
export const CLAIM_BANNED = ["REPLACES", "KILLED", "GUARANTEED", "10X"] as const;

/* =========================================================================
   THE PLACES — fifteen, so the reel is not one room eighteen times.
   `feedback_reel_vary_the_locations`: a new light AND colour every 2-4s, and
   neighbours in the cut differ by BOTH hue and lightness.
   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION: `shop` carries a LIT FASCIA across its
      top third, which is what pays the >=140 mean — the hero never carries a
      gate (`a gate carried by the wrong object deforms that object`).
   ⭐ THE >=140 LUMA LAW IS FRAME 0 ONLY. Body places sit at luma 70-105 with
      p10 <= 35, which is where the delivered reels that LOOK good sit.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /** S0 — the one-man counter, lit fascia, warm. The brightest place in the reel. */
  shop: {
    back: "#C9A468", back2: "#5A4630", floor: "#8A6B49", floor2: "#3E2E20",
    lip: "#241A12", key: SODIUM, horizon: 452, grit: "#1A120C",
  },
  /** S1 — the works floor before the lamps strike. Cold, wide, empty bays. */
  floorDark: {
    back: "#26313E", back2: "#0E141C", floor: "#2C3743", floor2: "#141A22",
    lip: "#090D13", key: SKY, horizon: 472, grit: "#070A0F",
  },
  /** S2 — one bench, one hard lamp, a big cream sheet. Dark ground, bright hero. */
  bench: {
    back: "#33302A", back2: "#15130F", floor: "#3B372E", floor2: "#1B1813",
    lip: "#0E0C09", key: "#F2DFAE", horizon: 500, grit: "#0B0906",
  },
  /** S3-S4 — the marketing bay. Clay, warm, a press. */
  mkt: {
    back: "#8E4227", back2: "#3A1B12", floor: "#6E3A26", floor2: "#2C1611",
    lip: "#190B08", key: CLAY, horizon: 462, grit: "#150907",
  },
  /** S5 — the social bay. Teal, cool, a belt. */
  soc: {
    back: "#2E5F69", back2: "#102830", floor: "#2A4E57", floor2: "#0F2027",
    lip: "#08161B", key: TEAL, horizon: 462, grit: "#061217",
  },
  /** S6a — the shutter wall. Nearly dark, one warm crack under the door. */
  gate: {
    back: "#1C232B", back2: "#0A0E13", floor: "#232A32", floor2: "#0E1217",
    lip: "#06090C", key: SODIUM, horizon: 486, grit: "#05070A",
  },
  /** S6b-S7 — the design studio. Plum, drafting lamps, bone boards. */
  dsg: {
    back: "#3E2F52", back2: "#1A1226", floor: "#3A2E4A", floor2: "#181022",
    lip: "#0D0816", key: PLUM, horizon: 462, grit: "#0A0612",
  },
  /** S8 — the press hall. THE VILLAIN'S ROOM: cold, hard, steel-blue. */
  press: {
    back: "#3D4A57", back2: "#171E27", floor: "#404C58", floor2: "#1A212A",
    lip: "#0C1016", key: CHROME, horizon: 470, grit: "#090C11",
  },
  /** S9-S10 — the finance bay. Green and brass, a ledger machine. */
  fin: {
    back: "#255745", back2: "#0E2620", floor: "#27503F", floor2: "#0F241C",
    lip: "#081610", key: GREEN, horizon: 462, grit: "#06120D",
  },
  /** S11-S12 — the legal bay. Oxblood and sodium, a wall of volumes. */
  leg: {
    back: "#4C1F1E", back2: "#1E0C0C", floor: "#4A2822", floor2: "#1D0E0B",
    lip: "#120706", key: SODIUM, horizon: 462, grit: "#0E0605",
  },
  /** S13 — THE TROUGH. Everything stopped, one lamp, the floor from a distance. */
  hall: {
    back: "#181E26", back2: "#080B10", floor: "#1D242C", floor2: "#0A0D12",
    lip: "#05070A", key: "#E7D3A4", horizon: 500, grit: "#04060A",
  },
  /** S14 — the hopper. Sour, cold, the villain's own light. */
  heap: {
    back: "#3A3B33", back2: "#16170F", floor: "#3E3F35", floor2: "#191A12",
    lip: "#0C0D08", key: "#B8BA9E", horizon: 476, grit: "#0A0B06",
  },
  /** S15 — THE PEAK. The rewrite: hot, amber, the only place with real heat. */
  forge: {
    back: "#8E5220", back2: "#33190A", floor: "#6E4222", floor2: "#2A1709",
    lip: "#180B04", key: EMBER, horizon: 466, grit: "#140904",
  },
  /** S16 — the whole floor, lit in ONE colour. Yours. */
  floorLit: {
    back: "#8A5236", back2: "#33200F", floor: "#5E4030", floor2: "#281A11",
    lip: "#150C07", key: CLAY, horizon: 472, grit: "#110905",
  },
  /** S17 — the CTA board. */
  cta: {
    back: "#7A3E27", back2: "#2C1610", floor: "#5A3220", floor2: "#22120C",
    lip: "#130906", key: CLAY, horizon: 470, grit: "#100705",
  },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   ⭐ THE ONE MOTION THAT SAYS "CARRYING TOO MUCH" WITHOUT A CAPTION.
   A load that is too heavy does not bob — it SAGS, holds at the bottom, and
   only recovers part of the way. Asymmetric on purpose: a symmetric bob is a
   sway, and `feedback_a_sway_is_not_motion`.
   ====================================================================== */
export const sagY = (f: number, ph = 0, amp = 9, period = 74) => {
  const t = (((f / period + ph) % 1) + 1) % 1;
  const down = t < 0.24 ? Math.sin((t / 0.24) * Math.PI * 0.5) : 1;
  const back = t < 0.42 ? 0 : (t - 0.42) / 0.58;
  return amp * (down - back * back * 0.78);
};

/** the works floor plate every interior scene stands on. `flip` draws it as the
    overhead gantry deck, which is the same component upside down. */
export const Deck: React.FC<{ y: number; flip?: boolean; c?: string; cl?: string;
  z?: number; h?: number; n?: number; o?: number }> =
  ({ y, flip = false, c = "#3A4657", cl = "#4C5B6E", z = 22, h: hh = 132, n = 13, o = 1 }) => (
  <div style={{ position: "absolute", left: -60, top: flip ? y - hh : y, width: W + 120, height: hh,
    zIndex: z, opacity: o, overflow: "hidden",
    background: `linear-gradient(${flip ? 0 : 180}deg, ${cl} 0%, ${c} 46%, ${dkh(c, 0.34)} 100%)` }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"dk" + i} style={{ position: "absolute", left: (i * (W + 120)) / n, top: 0,
        width: 5, height: hh, background: hexa("#05070C", 0.34) }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: flip ? hh - 9 : 0, height: 9,
      background: hexa("#05070C", 0.5) }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: flip ? hh - 15 : 6, height: 5,
      background: hexa(cl, 0.85) }} />
  </div>
);

/** a logo on a white tile — the only way a real mark is ever drawn here. */
export const Tile: React.FC<{ x: number; y: number; src: string; s?: number; z?: number;
  pad?: number; r?: number; o?: number; ring?: string }> =
  ({ x, y, src, s = 56, z = 74, pad = 0.74, r = 0.24, o = 1, ring = "#E8DCC0" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z, opacity: o,
    borderRadius: s * r, background: "#FFFFFF", border: `${Math.max(2, s * 0.045)}px solid ${ring}`,
    overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: SH }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s * pad, height: s * pad, objectFit: "contain" }} />
  </div>
);
