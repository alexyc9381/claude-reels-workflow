import React from "react";
import { Img, staticFile } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash,
  Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Crew, Hero, Forearm,
  COSTUMES, costumeFor, vivid, lerpHex, mono, ui,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 141 · "GRAVITY" — THE WORLD KIT.  Board: storyboards/141-gravity.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from `HwWorld` verbatim. Only the PLACES, the LEDGER, the ACTORS table and
   the props below are new.

   ⭐⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "INSIDE".
      THE DOUBLE FLOOR — one working bay with TWO gravities. A gridded steel
      deck you stand on (VS Code, cold blue) and the same deck inverted
      overhead (Antigravity, warm amber), sharing one wall. Riggers work feet
      down; hangers work feet UP. The extension is a rail and socket on the
      shared wall, and when it seats, the upper deck descends and DOCKS.

   ⭐ THE HOOK MECHANISM IS **INVERSION** — checked against every word already
      shipped (RELEASE · DEMOLITION · POSSESSION · SUMMONS · REVELATION ·
      ACCUMULATION · EXCHANGE · MULTIPLICATION · SUBTRACTION). It is new, and
      it is not "something comes toward you", the verb nine rejected hooks
      shared. The product's own NAME is a force, so the hook runs the force.

   ⛔ ONE VILLAIN, physical and named: **THE MOVE** — crates, a dolly, a tape
      gun and a far door. Its rule: it makes you carry everything you own into
      another building. Undefeated until S6.

   ⛔ THE HERO IS NEVER TINTED AND HE NEVER FLIES. In a reel where everything
      else changes which way is down, YOUR CLAUDE is the one body that stays on
      the floor. Colour goes on the crew, the decks, the canisters and the lamps.

   ⛔ THE HONESTY LEDGER IS `G` BELOW AND NOWHERE ELSE. Verified 2026-09-06
      against antigravity.google (blog, docs, pricing) and the VS Marketplace
      listing. If a figure is not in `G` it does not go on screen.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()`/`lerpHex()` are hex-in/rgb-out and DO NOT NEST. dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO position/inset/zIndex is a CONTAINING BLOCK
      and its absolutely-positioned children vanish. Use `Cam`.
   ⛔ `Mascot` draws its body at ~100% of `size`. Sprite pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS: a 52px object is 12px after the
      audit's 1012->240 downsample.
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
export const GUNMETAL = "#2A3340", DECK = "#3A4657", DECKL = "#4C5B6E";

/** ⭐ THE TWO SIDES. One table; the deck, the lamp, the plate, the crew tint
    and the wall all read out of it, so blue ALWAYS means VS Code and amber
    ALWAYS means Antigravity (feedback_colour_the_sprite_not_the_plate). */
export const VSC = "#3E7FC1";     /* VS Code blue, house-matted from #007ACC */
export const AGV = "#E7B24C";     /* Antigravity amber */

export const SIDE = {
  down: { key: VSC,  deck: DECK,     deckL: DECKL,   wall: GUNMETAL, mark: "vscode.svg",     name: "VS CODE" },
  up:   { key: AGV,  deck: "#C9B282", deckL: "#E2D2AC", wall: "#6B5A3C", mark: "antigravity.png", name: "ANTIGRAVITY" },
} as const;

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Verified 2026-09-06:
     · antigravity.google/blog/antigravity-ide-extensions  (launch, the IDEs)
     · marketplace.visualstudio.com/items?itemName=Google.google-antigravity
       (publisher, version, install count, "Free")
     · antigravity.google/pricing                          (the free plan list)
     · antigravity.google/docs/ide/extensions/vscode       (install, the panel)
   ====================================================================== */
export const G = {
  keyword: "GRAVITY",
  publisher: "Google",
  extName: "Google Antigravity",
  version: "v1.2.0",
  updated: "AUG 31 2026",
  launched: "AUG 20 2026",
  /** the marketplace's own install count, read 2026-09-06 */
  installs: "208,494",
  installsLabel: "INSTALLS",
  price: "$0",
  priceWord: "FREE",
  /** ⛔ the pricing page's OWN strings. The VO says "GPT"; the free-tier entry
      is the open-weights one, so the frame shows `GPT-OSS-120B` and never a
      bare "GPT" (a bare GPT would assert a product that is not on that list). */
  models: [
    { t: "GEMINI 3.8 FLASH",  mark: "googlegemini.svg", c: "#7B8FF7" },
    { t: "CLAUDE OPUS 4.6",   mark: "claude.svg",       c: CLAY },
    { t: "CLAUDE SONNET 4.6", mark: "claude.svg",       c: EMBER },
    { t: "GPT-OSS-120B",      mark: "openai.png",       c: "#8E9299" },
  ] as const,
  /** the fifth socket stays open and lit: the list is longer than the sentence */
  moreModels: "GEMINI 3.1 PRO",
  allowances: ["UNLIMITED TAB COMPLETIONS", "UNLIMITED COMMAND REQUESTS"] as const,
  /** the five IDEs the launch post names, in its own order */
  ides: [
    { t: "VS CODE",       mark: "vscode.svg" },
    { t: "VISUAL STUDIO", mark: "visualstudio.svg" },
    { t: "ZED",           mark: "zed.svg" },
    { t: "JETBRAINS",     mark: "jetbrains.svg" },
    { t: "XCODE",         mark: "xcode.svg" },
  ] as const,
  /** what the side panel actually does, per the docs page */
  panel: ["AGENTS", "INLINE DIFFS", "PLANS"] as const,
  /** the local backend the extension installs on first launch */
  service: "agy",
} as const;

/** ⛔ GREPPABLE GUARDS. None of these may ever be rendered: the reel makes no
    speed, quality, ranking or rate-limit claim, and never prints a bare "GPT"
    as a free-tier model. `tools/` greps for them before ship. */
export const SPEED_BANNED = ["X FASTER", "BENCHMARK", "BEATS", "SOTA", "#1", "BEST"] as const;
export const LIMIT_BANNED = ["REQUESTS/DAY", "PER DAY", "TOKENS/MO", "5 HOUR", "WEEKLY LIMIT"] as const;
export const CLAIM_BANNED = ["REPLACES", "KILLED", "DEAD", "GPT-5", "GPT-4"] as const;

/* =========================================================================
   THE PLACES — five, so the reel is not one room thirteen times.
   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION: `bay` carries a LIT amber ceiling as
      its top third, which is what pays the >=140 mean while the gunmetal deck
      keeps the body saturation and the drawer voids keep the black point.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /** S0-S3, S5: the bay before the dock. Cold below, lit above, out of reach. */
  bay: {
    back: "#6B5A3C", back2: "#212A36", floor: DECK, floor2: "#212A36",
    lip: "#151C26", key: VSC, horizon: 470, grit: "#0E141C",
  },
  /** S6-S8, S12: the bay AFTER the dock — the amber now falls INSIDE the room. */
  bayLit: {
    back: "#8A7246", back2: "#2C3542", floor: "#45525F", floor2: "#28313D",
    lip: "#1A222C", key: AGV, horizon: 470, grit: "#141A22",
  },
  /** S4: the loading dock, looking out at a cold night and another building. */
  dock: {
    back: "#16203A", back2: "#0C1120", floor: "#2E3742", floor2: "#171E28",
    lip: "#0A0E16", key: SKY, horizon: 520, grit: "#080C14",
  },
  /** S9-S10: exterior night, two buildings and the air between them. */
  city: {
    back: "#101A32", back2: "#070B16", floor: "#141B28", floor2: "#0A0E18",
    lip: "#05080E", key: SKY, horizon: 610, grit: "#04060C",
  },
  /** S11: the same exterior, joined. Warmer, because the gap is gone. */
  cityJoined: {
    back: "#1B2440", back2: "#0B1120", floor: "#1A222E", floor2: "#0D131C",
    lip: "#070A11", key: AGV, horizon: 610, grit: "#05080E",
  },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   ⭐ THE ONE MOTION THAT SAYS "ANTIGRAVITY" WITHOUT A CAPTION SAYING IT.
   Everything hung in this world FLOATS rather than swings: it rises, hangs a
   beat too long at the top, and falls back slower than it rose. A sine wave
   reads as a pendulum; this reads as weightlessness, and it costs one function.
   ⛔ It is deliberately asymmetric — a symmetric bob is a sway, and a sway is
      not motion (feedback_a_sway_is_not_motion).
   ====================================================================== */
export const floatY = (f: number, ph = 0, amp = 10, period = 62) => {
  const t = (((f / period + ph) % 1) + 1) % 1;
  /* rise fast over the first 32%, hang, then drift back down over the rest */
  const up = t < 0.32 ? Math.sin((t / 0.32) * Math.PI * 0.5) : 1;
  const hang = t < 0.32 ? 0 : t < 0.52 ? 0 : (t - 0.52) / 0.48;
  return -amp * (up - hang * hang * (t >= 0.52 ? 1 : 0));
};

/** the deck grid — the floor plate every bay scene stands on. `flip` draws it
    as a CEILING (the upside deck), which is the same component upside down. */
export const Deck: React.FC<{ y: number; flip?: boolean; c?: string; cl?: string;
  z?: number; h?: number; n?: number; o?: number }> =
  ({ y, flip = false, c = DECK, cl = DECKL, z = 22, h: hh = 132, n = 13, o = 1 }) => (
  <div style={{ position: "absolute", left: -60, top: flip ? y - hh : y, width: W + 120, height: hh,
    zIndex: z, opacity: o, overflow: "hidden",
    background: `linear-gradient(${flip ? 0 : 180}deg, ${cl} 0%, ${c} 46%, ${dkh(c, 0.34)} 100%)` }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"dk" + i} style={{ position: "absolute", left: (i * (W + 120)) / n, top: 0,
        width: 5, height: hh, background: hexa("#05070C", 0.34) }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: flip ? hh - 9 : 0, height: 9,
      background: hexa("#05070C", 0.5) }} />
    {/* the lit lip that tells you which way is down on this plane */}
    <div style={{ position: "absolute", left: 0, right: 0, top: flip ? hh - 15 : 6, height: 5,
      background: hexa(cl, 0.85) }} />
  </div>
);

/** a logo on a white tile — the only way a real mark is ever drawn here. */
/* ⛔ `full` draws the mark EDGE TO EDGE with no white plate. antigravity.png is a
   real DARK app icon (its ground measures rgb 18,19,23, opaque), so putting it on a
   white tile renders a black square inside a white ring — a box, not a logo. Marks
   that ship their own plate get `full`; flat glyphs keep the white tile. */
export const Tile: React.FC<{ x: number; y: number; src: string; s?: number; z?: number;
  pad?: number; r?: number; o?: number; ring?: string; full?: boolean }> =
  ({ x, y, src, s = 56, z = 74, pad = 0.74, r = 0.24, o = 1, ring = "#E8DCC0", full = false }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z, opacity: o,
    borderRadius: s * r, background: full ? "transparent" : "#FFFFFF",
    border: `${Math.max(2, s * 0.045)}px solid ${full ? hexa(ring, 0.5) : ring}`,
    overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s * (full ? 1 : pad), height: s * (full ? 1 : pad), objectFit: "contain" }} />
  </div>
);

/** the VS Code mark is a single monochrome path, so it is filled house-blue
    rather than left black. ⛔ A mask, not a filter: a hue-rotate on a black
    glyph produces black. */
export const VscTile: React.FC<{ x: number; y: number; s?: number; z?: number; c?: string }> =
  ({ x, y, s = 56, z = 74, c = VSC }) => (
  <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z,
    borderRadius: s * 0.24, background: "#FFFFFF", border: `${Math.max(2, s * 0.045)}px solid #E8DCC0`,
    display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
    <div style={{ width: s * 0.7, height: s * 0.7, background: c,
      WebkitMaskImage: `url(${staticFile("logos/vscode.svg")})`,
      maskImage: `url(${staticFile("logos/vscode.svg")})`,
      WebkitMaskSize: "contain", maskSize: "contain",
      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      WebkitMaskPosition: "center", maskPosition: "center" }} />
  </div>
);
