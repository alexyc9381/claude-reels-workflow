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
   REEL 131 · "FREE" — THE WORLD KIT.  Board: storyboards/131-free.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED. Everything above is re-exported
   from reel 122's `HwWorld` verbatim — the Rake, the Runner, the four action
   loops on `Crew`, the `Hero` with its amplitude-scaled idle, `Forearm`, the
   twelve costume levers, `Scene`/`Cam`/`Panel`. Only the PLACES, the LEDGER and
   the props are new, which is exactly what `memory/reel-clone-chassis-verbatim`
   asks for. Do not re-derive any of it here.

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "SEPARATELY".
      One street. On one side THE TOLL ROW — five coin-fed turnstiles, one per
      subscription, each of which gives exactly one quarter-turn per coin. On the
      other side ONE building with the doors open and NO slot on the gate: THE
      FARE HALL, where every one of those tools is on one counter, the image
      presses are in the back bay and the reasoning engines are literally ON TOP.

   ⛔⛔ THE VILLAIN IS `THE TOLL ROW` AND IT LOSES EXACTLY ONCE, AT S11.
      It wins the hook, it is still collecting from five Claudes at 22s, and it
      is never broken — the hero walks THROUGH the one gate that does not take
      anything. The same turnstile opens and closes the reel; its BEHAVIOUR is
      the payoff, not a new object.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      THE VO NEVER NAMES THE PLATFORM AND NEVER STATES A PRICE — the name is
      gated behind the comment keyword, which is the whole CTA. So no product
      name and no currency figure appears anywhere in the frame, and the three
      guards below are greppable and must return zero rendered hits.
   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
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
export const MAG = "#C2559A", INDIGO = "#5B5FA8";

/* =========================================================================
   THE LEDGER — every name the picture is allowed to assert, and where it
   came from. The VO is the only source; nothing here is researched, because
   nothing beyond the VO is claimed.
   ====================================================================== */
export const R = {
  /** ⭐ THE SEVEN TEXT MODELS, IN SPOKEN ORDER. `logo: null` is not an
      oversight — it is the rule. A wrong mark is worse than no mark, and there
      is no Grok/xAI mark in `public/logos` nor on the Simple Icons CDN
      (checked 2026-08-31: `grok` -> 404, `xai` -> 404). GROK therefore ships as
      a stencilled NAME PLATE with no logo on it, the same way reel 122 handled
      Kimi before `si_kimi.svg` existed.
      ⛔ IDENTITY IS SHAPE **AND** COLOUR (reel 115): five identical white tiles
      became the loudest thing in that frame, so every plate below carries its
      own paint as well as its own mark. */
  models: [
    { n: "CHATGPT",    logo: "logos/openai.png",     c: "#10A37F", fg: "#04241C" },
    { n: "CLAUDE",     logo: "logos/claude.svg",     c: "#D97757", fg: "#2A1408" },
    { n: "GEMINI",     logo: "logos/googlegemini.svg", c: "#5B8DEF", fg: "#0A1836" },
    { n: "GROK",       logo: null,                   c: "#B9BDC4", fg: "#14161A" },
    { n: "PERPLEXITY", logo: "logos/perplexity.svg", c: "#20B8CD", fg: "#04262C" },
    { n: "KIMI",       logo: "logos/si_kimi.svg",    c: "#8B72B0", fg: "#150E24" },
    { n: "DEEPSEEK",   logo: "logos/deepseek.svg",   c: "#4D6BFE", fg: "#080E30" },
  ] as const,
  /** the three image models the VO names. The maker's mark is honest where one
      exists (Nano Banana is Google's Gemini image model, Seedance is
      ByteDance's, GPT Image is OpenAI's); the PRODUCT name is stencilled,
      because none of the three has a mark of its own. */
  /** ⭐⭐ AND THE SCREEN IS THE REAL PAGE (Alex, round 5: *"actually have the
      websites shown on the screens, not just random stuff you built"*). All
      three were captured from the product's own site, headless, on 2026-08-31:
        NANO BANANA  gemini.google.com — the page literally reads "Nano Banana 2
                     is here", so the receipt and the name are the same object
        SEEDANCE     seed.bytedance.com/en/seedance — the "Seedance 1.0" hero
        GPT IMAGE    platform.openai.com/docs/guides/image-generation — the
                     grid of generated images on OpenAI's own docs page
      ⛔ `openai.com/index/...` and `openai.com/api/` both captured BLANK (10-14KB,
      luma 255): a JS-gated page screenshots as white and would have shipped as a
      white rectangle. MEASURE EVERY CAPTURE — do not eyeball the filename. */
  images: [
    { n: "NANO BANANA", logo: "logos/googlegemini.svg", c: "#E7B24C", fg: "#2C1E04",
      shot: "shots/131_nano.jpg" },
    { n: "SEEDANCE",    logo: "logos/bytedance.svg",    c: "#C2559A", fg: "#2C0A20",
      shot: "shots/131_seedance.jpg" },
    { n: "GPT IMAGE",   logo: "logos/openai.png",       c: "#7FC0C9", fg: "#062226",
      shot: "shots/131_gptimage.jpg" },
  ] as const,
  /** "plus top tier reasoning engines on top of that" — three engines and a
      tier ladder that climbs to its own TOP notch. ⛔ THE TIER IS THE LADDER'S
      OWN, not a rank against anything: no benchmark, no rival, no score. */
  tiers: ["I", "II", "III", "TOP"] as const,
  /** "people are paying for 5 subscriptions" — five is spoken, so five is drawn.
      ⛔ NO AMOUNT IS SPOKEN, so the fare is a COIN and never a figure. */
  fares: { n: 5, label: "SEPARATE FARES", free: "FREE", none: "NO FARE" },
  /** the three kinds of output, in the order the VO says them */
  outputs: ["TEXT", "IMAGES", "REASONING"] as const,
  keyword: "FREE",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Free*.tsx` must return zero hits
    inside a rendered string.
    · PRICE: no price is spoken anywhere in the VO. An invented number on a
      price plate is the most believable kind of wrong, so the fare is always a
      COIN — a physical object with no denomination on it.
    · NAME: the VO deliberately gates the platform's name behind "comment FREE
      for the link". Putting a guess on screen would break the gate the script
      is built on AND risk naming the wrong product.
    · CLAIM: none of these words is spoken, and every one of them is the kind of
      superlative that turns a true statement into an unbacked one. */
export const PRICE_BANNED = ["$9", "$20", "$200", "/MO", "PER MONTH", "A MONTH", "USD"] as const;
export const NAME_BANNED = ["POE", "OPENROUTER", "MONICA", "MERLIN", "YOU.COM"] as const;
export const CLAIM_BANNED = ["UNLIMITED", "FOREVER", "NO LIMITS", "BEST", "FASTEST", "X FASTER"] as const;

/* ---- THE TWELVE PLACES ---------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
   toll -> alley -> hall -> bench -> bench(green) -> tabs -> press -> loft ->
   line -> merge -> row -> gate -> cta, which alternates warm/cold and
   bright/dark on every single cut.
   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `toll` is the only place built for it — its bone booth
   fascia is a big lit field with a near-black hero in front of it, which is
   where the reel's biggest value SPREAD comes from. */
export const PLACES: Record<string, Place> = {
  /* 1 · THE TOLL — sodium night street. Frame 0 lives here so it is built for
     >=140: a bone kiosk wall, a hard warm key and a pale wet road. */
  toll:   { back: "#A6B0BC", back2: "#F8F5EC", floor: "#DCCEB4", floor2: "#B8AA90",
            lip: "#453A2A", key: "#FFD98E", horizon: 506, grit: "#241C12" },
  /* 2 · THE BACK LANE — the coldest, darkest set in the reel. One warm door. */
  alley:  { back: "#161E2C", back2: "#33425C", floor: "#1E2634", floor2: "#0C1018",
            lip: "#05080D", key: "#F2C878", horizon: 512, grit: "#070A10" },
  /* 3 · THE FARE HALL — cool bone-cyan, long perspective, seven lamp bars. */
  hall:   { back: "#9FB4BC", back2: "#EFF4F2", floor: "#AFB8AE", floor2: "#7C877E",
            lip: "#2E3630", key: "#DAF4F2", horizon: 470, grit: "#1E2622" },
  /* 4 · THE COUNTER — dark ink-green, warm oak bench, one overhead. */
  bench:  { back: "#10201A", back2: "#2C4C3A", floor: "#22382C", floor2: "#101E16",
            lip: "#060C09", key: "#8ED8A8", horizon: 520, grit: "#060A08" },
  /* 5 · THE COUNTER, RE-LIT GREEN — the rack completing. Brighter than `bench`
     so the S4 cut is a lightness step, not just a beat. */
  benchg: { back: "#1A3A2A", back2: "#5E9E74", floor: "#3A6A4E", floor2: "#1A3226",
            lip: "#08160E", key: "#C6F2CE", horizon: 520, grit: "#08120C" },
  /* 6 · THE DEAD TOLL ROW, FROM BEHIND — cold slate corridor. */
  tabs:   { back: "#1E242C", back2: "#485462", floor: "#2C343E", floor2: "#141920",
            lip: "#080B0F", key: "#C0CEDC", horizon: 528, grit: "#090C11" },
  /* 7 · THE PRINT BAY — hot magenta and amber. The only magenta in the reel. */
  press:  { back: "#3A0E2A", back2: "#A8407E", floor: "#7C2E58", floor2: "#3A1228",
            lip: "#1C0612", key: "#FFC0E4", horizon: 496, grit: "#1A0612" },
  /* 8 · THE ENGINE LOFT — violet, light falling from a roof light above. */
  loft:   { back: "#1C1630", back2: "#493870", floor: "#2E2450", floor2: "#171130",
            lip: "#0A0618", key: "#BE9CF0", horizon: 462, grit: "#110B22" },
  /* 9 · THE OUTPUT LINE — bright bone workshop. Neutral-warm, the belt runs. */
  line:   { back: "#ABA492", back2: "#F2EEE0", floor: "#C4B694", floor2: "#948462",
            lip: "#382E20", key: "#FFEEC0", horizon: 480, grit: "#261E14" },
  /* 10 · THE JUNCTION — cold navy, five lanes. */
  merge:  { back: "#111C34", back2: "#2A3C64", floor: "#1C2744", floor2: "#0C1222",
            lip: "#050912", key: "#8FC0F0", horizon: 500, grit: "#070B14" },
  /* 11 · THE PAY ROW — amber, five booths head on. */
  row:    { back: "#2A1A08", back2: "#8A5A18", floor: "#7A5626", floor2: "#3A2810",
            lip: "#160E04", key: "#FFC24E", horizon: 506, grit: "#1A1006" },
  /* 12 · THE OPEN GATE — DAYLIGHT. The brightest body set in the reel, and the
     biggest lightness jump on any cut (it follows `row`). */
  gate:   { back: "#93AAC4", back2: "#F1F4F6", floor: "#C0B294", floor2: "#94866A",
            lip: "#3A3226", key: "#FFF8E4", horizon: 468, grit: "#261E14" },
  /* 13 · THE FRONT AT EVENING — warm, doors open, light spilling out. */
  cta:    { back: "#241C2E", back2: "#6E5470", floor: "#5E4A3E", floor2: "#2C2220",
            lip: "#150F10", key: "#FFD9A0", horizon: 492, grit: "#181014" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide */
export const GY = 706;
/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210. The cast
    owns the ground line; `HookHeader` owns y 0..96. Reel 112 shipped plates at
    y 600-640 and got *"the claude sprites are covered by the text boxes."* */
export const BAND_Y = 132;
