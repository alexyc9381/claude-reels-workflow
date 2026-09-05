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
   REEL 135 · "AGENCY" — THE WORLD KIT.  Board: storyboards/135-agency.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from `HwWorld` verbatim — the Rake, the Runner, the four action loops on
   `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the twelve
   costume levers, `Scene`/`Cam`/`Panel`. Only the PLACES, the LEDGER and the
   props are new (`memory/reel-clone-chassis-verbatim`).

   ⚠️⚠️ SAME SUBJECT AS REEL 94 "AGENCY" (shipped 2026-08-08): the same repo,
   the same keyword, the same three named trades. Reel 94's world is AGENCY ROW
   — a night city, ranked by what is lit, entered through a roll-up shutter —
   and it is FROZEN. A second night street reads as a repost, so nothing in
   `AgyWorld.tsx` is imported here and no place below is a street.

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "OWN".
      A great playhouse at first light, walked stage door to stage. The subject
      is a COMPANY OF NAMED SPECIALISTS you suddenly command, and a theatre is
      the one place where that is literally the furniture: a call board, a
      wardrobe rail, a dressing-room corridor, a green room, a switchboard and
      a stage. Seven spaces, seven palettes, and the arc runs door -> stage,
      which is the same arc the VO runs: alone -> owner.

   ⛔⛔ THERE IS NO VILLAIN AND THE SCRIPT NAMES NONE.
      The VO disparages nothing — it does not say agencies are bad, expensive or
      slow. It says you can own one for nothing. So the reel has no antagonist
      to draw, and drawing one would be a claim the frame cannot source
      (docs/ANIMATION-QUALITY §23: find the property the script is actually
      disparaging; here there is none). The tension is the LOCKED DOOR at S0,
      and it loses in the first two seconds, on purpose — everything after it is
      the reward.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Checked live 2026-09-02 against the GitHub API and the repo's own README.
      If a number is not in `R` it does not go on screen.
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
export const OXIDE = "#8C4A2E", SLATE = "#4E5A62", COPPER = "#C87F4A", BONE = "#EFE7D4";
export const MAG = "#C2559A", INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", PLUM = "#4A2C4E";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Verified live 2026-09-02: GitHub API for the counts, the repo's own README
   for the roster and the supported-tool list.
   ====================================================================== */
export const R = {
  repo: "msitarzewski/agency-agents",
  name: "THE AGENCY",
  lic: "MIT",

  /** ⭐ THE STAR COUNT. The API returned 149,734 today. The VO says "over
      135,000", which is TRUE against it — and the house rule is that the frame
      never shows a number SMALLER than the truth, so the board counts to the
      real figure while the voice stays conservative. (Reel 94 hit the same
      split: it drew 139,604 under a spoken "over 124,000".) */
  stars: 149734,
  starsStr: "149,734",
  forks: "24,135",

  /** ⭐ COUNTED FROM THE README'S OWN ROSTER TABLES, not from its prose. The
      prose says "230+ agents across every division"; the tables hold 273 rows
      across 18 division headings. 273 is therefore both true and larger, which
      is the safe direction. */
  agents: 273,
  divisions: 18,

  /** "for exactly zero dollars" — the repo is MIT, so this is simply a fact.
      ⛔ This is the ONLY currency string anywhere in the reel. */
  price: "$0",

  /** ⭐ THE THREE THE VO NAMES, with their REAL names and REAL divisions.
      Each was found in the README roster under the division given here. The
      spoken shorthand ("front end designers, ad writers, Reddit wizards") is
      looser than the repo's own titles, so the FRAME carries the real title and
      the division, which is where the receipts live. */
  cast: [
    { role: "FRONTEND DEVELOPER",       div: "ENGINEERING", c: "#5AA0DE", cost: "glasses" },
    { role: "AD CREATIVE STRATEGIST",   div: "PAID MEDIA",  c: "#E7B24C", cost: "suit" },
    { role: "REDDIT COMMUNITY BUILDER", div: "MARKETING",   c: "#D97757", cost: "fro" },
  ] as const,

  /** ⭐ THE SEVEN TOOLS THE DESKTOP APP INSTALLS INTO. Every one is named in the
      repo's own README (Option 1 and Option 4) and every one has a REAL mark in
      `public/logos/`. ⛔ Claude is FIRST and BIGGEST because the VO names it and
      nothing else; the other six are the sourced supporting cast, not rivals.
      ⛔ OpenCode, Qwen CLI and Osaurus are also supported and are NOT drawn,
      because no real mark exists for two of them and an invented glyph is worse
      than no glyph (`feedback_covers_use_real_logos`). */
  tools: [
    { n: "CLAUDE CODE", logo: "claude.svg",        c: "#D97757", s: 1.00 },
    { n: "CURSOR",      logo: "cursor.svg",        c: "#8E9299", s: 0.80 },
    { n: "CODEX",       logo: "openai.png",        c: "#7FC0C9", s: 0.80 },
    { n: "GEMINI",      logo: "googlegemini.svg",  c: "#5AA0DE", s: 0.80 },
    { n: "COPILOT",     logo: "githubcopilot.svg", c: "#C9BFA6", s: 0.80 },
    { n: "WINDSURF",    logo: "windsurf.svg",      c: "#3F9E74", s: 0.80 },
    { n: "QWEN",        logo: "qwen.svg",          c: "#8B72B0", s: 0.80 },
  ] as const,

  /** the two halves of "their own personality and process", drawn APART because
      the sentence names two different things. Sourced verbatim from the repo
      description: "a specialized expert with personality, processes, and proven
      deliverables". */
  halves: ["PERSONALITY", "PROCESS"] as const,

  keyword: "AGENCY",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Agn*.tsx` must return zero hits
    inside a rendered string.
    · EARN: **the VO states no figure about money except "zero dollars".** No
      agency retainer, no hourly rate, no saving, no comparison price. The only
      currency string in the reel is `$0`.
    · CLAIM: none of these is spoken, and "free" does not license a superlative.
    · NAME: the VO names Claude and GitHub. Nothing else. The six non-Claude
      tool marks at S5 are the repo's own documented install targets, shown as
      DESTINATIONS, never as rivals and never as endorsements. */
export const EARN_BANNED = ["/MO", "PER HOUR", "RETAINER", "SAVE $", "WORTH $", "K/MONTH", "A MONTH", "VALUE $"] as const;
export const CLAIM_BANNED = ["GUARANTEED", "UNLIMITED", "BEST", "#1", "PASSIVE", "EASY", "100%", "REPLACES"] as const;
export const NAME_BANNED = ["FIVERR", "UPWORK", "OGILVY", "WPP", "ACCENTURE", "DELOITTE"] as const;

/* ---- THE SEVEN PLACES ----------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
     door     BRIGHT COLD BLUE   (frame 0 lives here, built for >=140)
     board    MID WARM AMBER
     wardrobe DARK COOL TEAL
     rooms    MID RED
     green    MID-DARK GREEN
     switch   DARK INDIGO + brass
     stage    BRIGHT GOLD        (the peak, and the deepest value range)

   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `door` is the only place built for it: a pale cold stone
   facade and a lit playbill carry the MEAN while the door and the key stay
   near-black, which is also where the reel's biggest value SPREAD comes from.
   Brightness is the MEAN; hierarchy is the SPREAD; they only fight if you reach
   for the dark stop (docs/ANIMATION-QUALITY §8, §11).
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  /* 1 · THE STAGE DOOR at first light. Pale cold stone, one warm canopy lamp,
     a near-black door and a near-black key. Built for frame 0. */
  door:     { back: "#7E93B6", back2: "#FBFAF2", floor: "#BFBEB4", floor2: "#71767A",
              lip: "#1B1F27", key: "#FFF3D8", horizon: 466, grit: "#11151B" },
  /* 2 · THE CALL BOARD, just inside. Warm amber, one hard overhead, deep edges. */
  /* ⛔ BROWN CRATE ON A BROWN WALL. The one main thing in this scene is the
     crate erupting, and at back2 #B58642 it was mid-brown on mid-brown with no
     silhouette at all — "name which side of the contrast your subject is on" is
     the answer to *"I can't tell what that is"* more often than shape ever is.
     The store room drops two stops so the lit crate and the GOLD it throws are
     the only bright things in it, which also multiplies the luma delta every
     star is worth to the motion metric. */
  board:    { back: "#241809", back2: "#6E5124", floor: "#54401C", floor2: "#221808",
              lip: "#120C06", key: "#FFD894", horizon: 492, grit: "#140E07" },
  /* 3 · THE WARDROBE corridor. Dark cool teal, one warm lamp at the far end,
     and the rail is the brightest travelling thing in the reel. */
  wardrobe: { back: "#0A1E26", back2: "#265563", floor: "#1A3A44", floor2: "#0A171C",
              lip: "#040D11", key: "#8EE0F0", horizon: 528, grit: "#040B0E" },
  /* 4 · THE DRESSING ROOM CORRIDOR. Mid red, hard side light, three doors. */
  rooms:    { back: "#38100F", back2: "#A65246", floor: "#6E3A2E", floor2: "#2C1512",
              lip: "#170707", key: "#FFC9A4", horizon: 486, grit: "#160707" },
  /* 5 · THE GREEN ROOM. Mid-dark green and brass, one low warm lamp. */
  green:    { back: "#0E2A22", back2: "#3E7A5E", floor: "#2C5244", floor2: "#12271F",
              lip: "#07120E", key: "#FFE0A2", horizon: 506, grit: "#08130F" },
  /* 6 · THE PROMPT CORNER. The darkest set: deep indigo, one hot brass
     filament on the lever. Everything the switchboard lights has to arrive
     against this, which is why it is the reel's biggest spread after frame 0. */
  switch:   { back: "#0E1030", back2: "#2A2E62", floor: "#1E2148", floor2: "#0B0C22",
              lip: "#05060E", key: "#FFCE86", horizon: 540, grit: "#06070F" },
  /* 7 · THE STAGE. Bright gold, a full house behind, the deepest value range in
     the reel — the company's back ranks run down to near-black. */
  /* ⛔ THE FLOOR IS LIT BECAUSE THE LAMPS ARE ON, not to make a gate pass.
     Frame 0 lives here now, and a lit stage under a seven-lamp bar genuinely
     is a bright floor; the SHADING is untouched, which is the line
     docs/ANIMATION-QUALITY §8 draws. */
  /* ⛔ THE BACK WALL WAS A DEAD BRIGHT VOID. At back2 #F6DA94 the band between
     the marquee and the crowd was the second-brightest thing in frame and it
     contained nothing — so it competed with the hero for the eye and gave the
     composition nowhere to rank. Dropped two stops it becomes ground, the hero
     and the marquee become the only lit things, and the reel's black point wins
     back margin at the same time. ⛔ Frame 0 is unaffected: the sealed curtain
     covers the whole panel there, so the >=140 law never touches this. */
  /* ⭐ FRAME 0 NOW LIVES IN THIS ROOM. The sealed curtain used to cover the whole
     panel at f0 and carried the >=140 law on its own; with the multiplication
     replacing it, the ROOM has to. THE-OPEN's answer is never the palette's dark
     stop — brightness is the MEAN and hierarchy is the SPREAD, and they only
     fight if you reach for the shading. So the FLOOR goes bright (a lit stage
     floor genuinely is) and carries the mean, while the BACK WALL stays dark so
     there is no dead bright void competing with the subject. Bright ground,
     dark wall, one saturated figure: high mean AND the biggest spread in the
     reel, from the same palette. */
  stage:    { back: "#2C1E0C", back2: "#7A5C28", floor: "#D2AC5C", floor2: "#6E5628",
              lip: "#140E06", key: "#FFEEC2", horizon: 470, grit: "#120B04" },
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
    not any one cut's bound. Computed from `CAM` in AgnScenes:
      house s1.010 dx   0  ->  x  26..986
      amber s1.050 dx -46  ->  x  22..862
      steel s1.055 dx  50  ->  x 128..972
      SAFE FOR ALL THREE   ->  x 128..862  (734px, not 1012)
    Anything that must be readable in every cut is laid out inside this. */
export const SAFE3 = { x0: 128, x1: 862, cx: 495 } as const;

/* ⭐⭐⭐ THE DIVISION PALETTE — ONE SOURCE OF TRUTH, USED BY EVERY SCENE.
   Alex: *"have the diff colored claude sprites for each door section whatever
   so its more obvious its distinguisehd alongside same with hte other sections
   etc here throughout"*. A division is only legible as a division if the SAME
   colour means the SAME division everywhere in the reel — so the rings in the
   hook, the line-up, the dressing rooms, the green room and the roster all
   read their colour and their costume set out of this one table. */
export const DIVS = [
  { name: "ENGINEERING", c: "#5AA0DE", cos: [1, 11, 3] },
  { name: "DESIGN",      c: "#8B72B0", cos: [6, 5, 1] },
  { name: "MARKETING",   c: "#D97757", cos: [5, 0, 8] },
  { name: "PAID MEDIA",  c: "#E7B24C", cos: [6, 11, 2] },
  { name: "SECURITY",    c: "#3F9E74", cos: [8, 1, 3] },
  { name: "TESTING",     c: "#7FC0C9", cos: [11, 6, 0] },
] as const;
export const divBy = (name: string) => DIVS.find((d) => d.name === name) ?? DIVS[0];
