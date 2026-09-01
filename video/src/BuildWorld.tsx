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
   REEL 133 · "BUILD" — THE WORLD KIT.  Board: storyboards/133-build.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from reel 122's `HwWorld` verbatim — the Rake, the Runner, the four action
   loops on `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the
   twelve costume levers, `Scene`/`Cam`/`Panel`. Only the PLACES, the LEDGER and
   the props are new (`memory/reel-clone-chassis-verbatim`).

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "SELL".
      A lit trade row after dark. The hero has one shuttered unit; behind the
      shutter are three workshops, and each one is a DIFFERENT trade running a
      DIFFERENT machine. Every machine has the same grammar and none of them has
      the same shape: ONE SMALL FLAT THING GOES IN (a word tile, a minute of
      tape, a photo print) and a FINISHED PRODUCT COMES OUT, and then somebody
      buys it. Three inputs, three machines, three buyers, three lights.

   ⛔⛔ THE VILLAIN IS `THE TRADE GATE` AND IT LOSES EXACTLY ONCE, AT S14.
      Black ironwork at the dark end of the row. It is PLANTED IN THE HOOK,
      unlit and far right, while the shutter goes up — and then never mentioned
      until S13, where it refuses a loaded trolley and does not move. It opens
      once, at the peak, and only for the guide.

   ⛔⛔⛔ AND THE VILLAIN IS NOT DRAWN UGLY (docs/ANIMATION-QUALITY §23).
      The script disparages nothing about the gate's craft — the claim is that
      the tools alone are not enough. So it is GOOD ironwork: scrolled, riveted,
      a proper drop-bar and hasp. What is wrong with it is that it is SHUT.
      Drawing it as a grey slab would be a dead frame AND a false claim.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Checked live 2026-09-01 against each repository's own page. If a number is
      not in `R` it does not go on screen. The guards below are greppable and
      must return zero rendered hits.
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
export const MAG = "#C2559A", INDIGO = "#5B5FA8", OXBLOOD = "#5E2320", BONE = "#EFE7D4";
/** the two marketplaces the VO names, in their own brand greens */
export const FIVERR = "#1DBF73", UPWORK = "#6FDA44";

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Verified live 2026-09-01 on each repo's own GitHub page.
   ====================================================================== */
export const R = {
  /** ⭐ THE THREE TOOLS. Each is a REAL public repository, and each carries its
      own provenance strip because none of them has a recognisable brand mark —
      reel 115's finding was that a viewer RECOGNISES a mark and cannot decode a
      silhouette, so where no mark exists the NAME STRIP and the star count have
      to do that job. ⛔ And the GitHub tile may not be the identity: five
      identical white tiles became the loudest thing in reel 115's frame. It
      appears once per strip at 26px, and IDENTITY comes from the machine's own
      shape and colour. */
  tools: [
    { n: "MONEY PRINTER TURBO", stars: "119,300", lic: "MIT", c: "#E7A94C",
      input: "1 WORD",  out: "VIDEO" },
    { n: "GPT SoVITS",          stars: "61,400",  lic: "MIT", c: "#8B72B0",
      input: "1 MIN",   out: "VOICE" },
    { n: "HUNYUAN 3D",          stars: "14,700",  lic: "",    c: "#7FC0C9",
      input: "1 PHOTO", out: "MODEL" },
  ] as const,
  /** "three free Claude plugins" — the count and the price, both spoken, and
      the price is also simply true: all three are open source. */
  count: 3,
  price: "$0 · FREE",
  /** "they take just five minutes to set up" — spoken, drawn ONCE, as a stencil
      on the machine bed with a clock behind it whose hand barely travels.
      ⛔ A number is never typeset AT its value; the clock is what says it. */
  setup: "5 MIN",
  /** the two marketplaces, both spoken, twice each */
  markets: ["FIVERR", "UPWORK"] as const,
  /** every sale is a DOCKET, never a figure. This is the only word on it. */
  sold: "SOLD",
  /** the three sections struck into the guide's cover, in the spoken order */
  sections: ["BUILD", "MARKET", "SELL"] as const,
  keyword: "BUILD",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Build*.tsx` must return zero hits
    inside a rendered string.
    · EARN: **Alex never says one figure about money.** No price for a gig, no
      rate, no monthly total, no client count. Every sale in this reel is a
      docket being stamped SOLD, and the only currency string anywhere is `$0`,
      which is what the tools cost and is spoken as "free".
    · CLAIM: none of these is spoken, and "free" does not license a superlative.
    · NAME: the VO names Claude, Fiverr and Upwork. Nothing else. The "ecom
      brands" at S12 are anonymous shop silhouettes — putting a real retailer's
      mark on a buyer would be an endorsement the frame cannot source.
    · VENDOR: the three tools are REPOS THE SHOP RUNS, not Anthropic products.
      The Claude mark is on the shop — the operator — and never on a machine's
      own name strip. */
export const EARN_BANNED = ["/MO", "PER GIG", "REVENUE", "PROFIT", "INCOME", "K/MONTH", "A MONTH"] as const;
export const CLAIM_BANNED = ["GUARANTEED", "UNLIMITED", "BEST", "#1", "PASSIVE", "EASY", "100%"] as const;
export const NAME_BANNED = ["SHOPIFY", "AMAZON", "ETSY", "TENCENT", "OPENAI", "ELEVENLABS"] as const;

/* ---- THE SIXTEEN PLACES --------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
   row(bright warm sodium) -> fitout(bright cold steel) -> mill(mid amber) ->
   millc(dark ink-green) -> counter(bright cold) -> booth(mid violet) ->
   lathe(dark indigo) -> stalls(bright green) -> boothc(dark teal) ->
   shop3(mid steel) -> rig(dark slate) -> turn(bright bone) -> dock(mid blue) ->
   gate(NEAR-BLACK — the darkest set in the reel, and the villain's) ->
   gatelit(the same gate re-lit warm as the guide's lamp comes up) ->
   open(bright warm, through it).

   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `row` is the only place built for it — the lit awning board
   and the sodium wash carry the mean while the hero stays a near-black
   silhouette, which is also where the reel's biggest value SPREAD comes from.
   Brightness is the MEAN; hierarchy is the SPREAD; they only fight if you reach
   for the dark stop.
   ========================================================================= */
export const PLACES: Record<string, Place> = {
  /* 1 · THE TRADE ROW at night under one hard sodium lamp. Frame 0 lives here
     so it is built for >=140: a bright lit shopfront wash under a warm sky. */
  row:     { back: "#8A6E84", back2: "#FBF2D8", floor: "#C4B392", floor2: "#8E7C60",
             lip: "#2A2018", key: "#FFD98E", horizon: 512, grit: "#2A2016" },
  /* 2 · THE FIT-OUT — inside the bare unit, cold daylight through the shutter. */
  fitout:  { back: "#93A6BE", back2: "#EEF0EA", floor: "#B8AC92", floor2: "#7C7460",
             lip: "#2E2A22", key: "#FFF2D6", horizon: 486, grit: "#1E1A14" },
  /* 3 · THE VIDEO MILL — warm amber workshop, spools on the wall. */
  mill:    { back: "#3E2A12", back2: "#B0803A", floor: "#7E5C2E", floor2: "#3C2C14",
             lip: "#1A1208", key: "#FFD68E", horizon: 496, grit: "#1C1308" },
  /* 4 · THE MILL LINE, re-framed close and re-lit ink-green. */
  millc:   { back: "#0C1E18", back2: "#2A4438", floor: "#1C2E26", floor2: "#0A1512",
             lip: "#050C0A", key: "#9AE8C0", horizon: 534, grit: "#050A08" },
  /* 5 · THE TRADE COUNTER at the shop front — cold bright daylight spill. */
  counter: { back: "#8CA6C6", back2: "#F2F1E8", floor: "#BEB096", floor2: "#7E7460",
             lip: "#2C2820", key: "#FFF4DE", horizon: 470, grit: "#1E1A14" },
  /* 6 · THE VOICE SHOP — violet, a glass booth and a cutting lathe. */
  booth:   { back: "#2A1E42", back2: "#7C64AE", floor: "#6E6284", floor2: "#332C46",
             lip: "#150F24", key: "#D8BEFF", horizon: 500, grit: "#150F24" },
  /* 7 · THE LATHE DECK, close. Dark indigo, one hot brass lamp. */
  lathe:   { back: "#12142E", back2: "#2E3260", floor: "#22264A", floor2: "#0E1024",
             lip: "#06070F", key: "#FFCE86", horizon: 540, grit: "#070812" },
  /* 8 · THE STALLS — the marketplace end of the row. Bright, green-keyed. */
  stalls:  { back: "#1E4A34", back2: "#CFE8CE", floor: "#9EA886", floor2: "#5E6A52",
             lip: "#1C2A1E", key: "#DCF6C8", horizon: 480, grit: "#16241A" },
  /* 9 · THE BOOTH re-framed and re-lit teal — the room nobody is in. */
  boothc:  { back: "#08202A", back2: "#22525E", floor: "#183A42", floor2: "#0A1A1E",
             lip: "#040E11", key: "#8EE4F2", horizon: 528, grit: "#040C0F" },
  /* 10 · THE 3D SHOP — steel and teal, a scanning rig on a gantry. */
  shop3:   { back: "#232E36", back2: "#77909E", floor: "#5E6A70", floor2: "#2E383E",
             lip: "#0C1216", key: "#DCEEF6", horizon: 492, grit: "#0B1116" },
  /* 11 · UNDER THE GANTRY, close. Dark slate, one hard downlight. */
  rig:     { back: "#141A20", back2: "#39454E", floor: "#28323A", floor2: "#101619",
             lip: "#060A0D", key: "#CFE6F4", horizon: 538, grit: "#070B0E" },
  /* 12 · THE TURNTABLE under a three-lamp rig. The brightest body set. */
  turn:    { back: "#8E8578", back2: "#F6F0E0", floor: "#C8BCA2", floor2: "#8A8068",
             lip: "#302A20", key: "#FFF8E8", horizon: 476, grit: "#221E16" },
  /* 13 · THE LOADING DOCK — cold mid blue, roller door up, a van backed in. */
  dock:    { back: "#2E3E52", back2: "#8CA2BA", floor: "#6E7686", floor2: "#343C48",
             lip: "#12161C", key: "#E2EEFA", horizon: 500, grit: "#0F1318" },
  /* 14 · THE TRADE GATE at the dark end of the row. ⛔ THE DARKEST SET IN THE
     REEL and deliberately so: it is the one thing the tools cannot get past. */
  gate:    { back: "#0A0910", back2: "#241E2A", floor: "#181420", floor2: "#08060C",
             lip: "#040308", key: "#8E86A6", horizon: 516, grit: "#050408" },
  /* 15 · THE SAME GATE, re-lit warm as the guide's lamp comes up. */
  gatelit: { back: "#241628", back2: "#7A4E40", floor: "#5A4234", floor2: "#281C16",
             lip: "#120B0C", key: "#FFCE90", horizon: 508, grit: "#160E10" },
  /* 16 · THROUGH THE OPEN GATE — the lit market beyond. Warm and bright. */
  open:    { back: "#4A3A50", back2: "#F0DEB4", floor: "#A08868", floor2: "#645440",
             lip: "#2A2018", key: "#FFDCA0", horizon: 494, grit: "#241A14" },
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
    not any one cut's bound. Computed from `CAM` in BuildScenes:
      house s1.012 dx  -6  ->  x  24..936
      amber s1.048 dx -50  ->  x  30..864
      steel s1.052 dx  52  ->  x 134..974
      SAFE FOR ALL THREE   ->  x 134..864  (730px, not 1012)
    Anything that must be readable in every cut is laid out inside this. */
export const SAFE3 = { x0: 134, x1: 864, cx: 499 } as const;
