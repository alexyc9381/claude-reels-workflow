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
   REEL 134 · "AGENTS" — THE WORLD KIT.  Board: storyboards/134-agents.md.

   ⛔ THE CHASSIS IS CLONED, NOT REINVENTED (`memory/reel-clone-chassis-verbatim`).
   Everything above is re-exported from reel 122's `HwWorld` verbatim — the Rake,
   the Runner, the four action loops on `Crew`, the `Hero` with its
   amplitude-scaled idle, `Forearm`, the twelve costume levers, `Scene`/`Cam`.
   Only the PLACES, the LEDGER and the props are new.

   Subject: `wshobson/agents` — a free GitHub repo of 202 specialized AI agents
   you install into Claude Code. 39.4k stars. Instead of one general model doing
   everything you get a named specialist per role, and several can work one job.

   ⛔⛔ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "TEAM".
      One address: a studio workshop that STAFFS ITSELF off a rack. A rack wall
      of engraved role plates (the repo), benches (the specialists), a build
      table (the job) — and it keeps running after dark with nobody being paid.
      The joke a viewer gets in under a second is that the whole firm came out
      of one free repo, and that joke is also the thesis.

   ⛔⛔ THE VILLAIN IS `THE BACKLOG` AND IT LOSES EXACTLY ONCE, AT S6.
      A tower of job tickets. It WINS at S2 (it buries the one Claude), it is
      only DENTED at S3 (three specialists take a third each and it still
      stands), and it is cleared at S6 — overnight, with nobody in the room,
      which is what "no salaries or sleep" actually means.

   ⛔⛔⛔ AND THE VILLAIN IS NOT DRAWN UGLY (docs/ANIMATION-QUALITY §23). The
      script disparages nothing about the work in the pile — the claim is that
      ONE worker cannot clear it. So the tickets are good, clean, real dockets.
      What is wrong with the pile is its HEIGHT.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).
      Checked live 2026-09-02 against the repository's own GitHub page. If a
      number is not in `R` it does not go on screen. The guards below are
      greppable and must return zero rendered hits.
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

/* =========================================================================
   THE LEDGER — every label and numeral the picture is allowed to assert.
   Verified live 2026-09-02 on the repository's own GitHub page.
   ====================================================================== */
export const R = {
  /** the repo. ⛔ It is a COMMUNITY repo, not an Anthropic product — the Claude
      mark goes on the WORKERS (they are Claude subagents), never on this plate.
      The plate's mark is GitHub's, because the star count is GitHub's. */
  repo:  { owner: "wshobson", name: "agents", stars: "39.4k", agents: "202" },
  /** ⭐ THE NUMBER SPINE, and it is the SOURCED figure in every case. The VO
      says "200" and "over 39,000"; those are round readings of 202 and 39.4k.
      The screen carries the sourced numbers so nothing on it is unverifiable,
      and the spoken round number is true of them. */
  agents: 202,
  stars:  "39.4k",
  price:  "$0",
  /** the three roles the VO NAMES, in the spoken order, with the costume lever
      each one is cast with. ⛔ Deterministic — a re-render must be identical. */
  roles: [
    { n: "FRONTEND", c: "#5AA0DE", costume: { girl: 1 } },
    { n: "BACKEND",  c: "#3F9E74", costume: { glasses: 1 } },
    { n: "SECURITY", c: "#C44A3A", costume: { cop: 1 } },
  ] as const,
  /** the fourth agent, named in beat 3 only */
  architect: { n: "ARCHITECT", c: "#E7B24C", costume: { prof: 1 } },
  /** the four jobs done to ONE slab at S4/S5, in the spoken order */
  jobs: ["ARCHITECTURE", "FRONTEND", "BACKEND", "SECURITY"] as const,
  /** the deck of role names on the rack. 24 real domains from the repo's own
      category list (architecture / languages / infrastructure / security /
      data / ML / docs / business / SEO). Used as plate faces; the RACK's job is
      to be countable, so most plates carry no legible text at all. */
  deck: [
    "FRONTEND", "BACKEND", "SECURITY", "ARCHITECT", "DATA ENG", "ML ENG",
    "DEVOPS", "SRE", "QA", "MOBILE", "API", "DATABASE", "CLOUD", "NETWORK",
    "PYTHON", "RUST", "GO", "TYPESCRIPT", "DOCS", "SEO", "ANALYTICS",
    "PAYMENTS", "PERF", "ACCESSIBILITY",
  ] as const,
  keyword: "AGENTS",
} as const;

/** ⛔ GUARDS. A grep for any of these over `Ag*.tsx` must return zero hits
    inside a rendered string.
    · EARN: the VO states NO figure about money. The only currency string in the
      entire reel is `$0`, which is what the repo costs and is spoken as "free".
      A salary number would also make the "no salaries" line a comparison the
      frame cannot source.
    · CLAIM: none of these is spoken, and "free" does not license a superlative.
      ⛔ "REPLACES" is banned too — the VO says you GET a team, never that it
      replaces anyone, and the stronger claim is not ours to make.
    · NAME: the VO names GitHub and (by subject) Claude. Nothing else. No rival
      model, no employer, no marketplace, no cloud vendor.
    · VENDOR: `wshobson/agents` is a community repository. Putting the Claude
      mark on the repo plate would assert an endorsement that does not exist. */
export const EARN_BANNED = ["/MO", "SALARY", "PER HOUR", "REVENUE", "PROFIT", "K/MONTH", "A YEAR"] as const;
export const CLAIM_BANNED = ["GUARANTEED", "UNLIMITED", "BEST", "#1", "PASSIVE", "EASY", "100%", "REPLACES"] as const;
export const NAME_BANNED = ["OPENAI", "CURSOR", "COPILOT", "AWS", "GOOGLE", "FIVERR", "UPWORK"] as const;

/* ---- THE NINE PLACES -----------------------------------------------------
   ⛔ NEIGHBOURING SCENES DIFFER BY BOTH HUE **AND** LIGHTNESS. Visit order:
   hall(BRIGHT cool slate) -> bench(MID warm amber) -> pit(DARK cold navy) ->
   wide(BRIGHT neutral bone) -> floor(MID cold teal) -> floorlit(MID warm, the
   same floor re-lit — a returning set is a callback only if the LIGHT changed)
   -> night(DARK deep blue) -> desk(BRIGHT warm daylight) -> open(BRIGHT warm).

   ⛔ BODY SCENES TARGET LUMA 70-105 AND BLACK POINT p10 <= 35. The >=140 bar is
   FRAME 0 ONLY, and `hall` is the only place built for it — a pale cool wall and
   a daylight window carry the mean while the RACK stays a near-black mass, which
   is where the reel's biggest value SPREAD comes from
   (`feedback_eyecatch_is_value_structure`: brightness is the MEAN, hierarchy is
   the SPREAD; they only fight if you reach for the palette's dark stop, which
   nothing here does).
   -------------------------------------------------------------------------- */
export const PLACES: Record<string, Place> = {
  /* 1 · THE RACK HALL — frame 0 lives here. Pale COOL slate-blue plaster, a real
     daylight window, a lit floor. The rack on top of it is near-black. */
  hall:     { back: "#A8B6C6", back2: "#EEF1F4", floor: "#C2B49A", floor2: "#948468",
              lip: "#3E362A", key: "#FFF6E2", horizon: 476, grit: "#241E16" },
  /* 2 · THE BENCH — mid warm amber, one lamp over the plate. */
  bench:    { back: "#38291A", back2: "#8E6634", floor: "#775530", floor2: "#3C2A18",
              lip: "#221608", key: "#F2C260", horizon: 492, grit: "#1C1208" },
  /* 3 · THE PIT — dark cold navy, one hard overhead. Where the pile buries him. */
  pit:      { back: "#121A2E", back2: "#2A3A58", floor: "#1E2840", floor2: "#0E1422",
              lip: "#060A12", key: "#B8CCE8", horizon: 516, grit: "#080C14" },
  /* 4 · THE WIDE — bright neutral bone, the pull-back. Brightest since the hook. */
  wide:     { back: "#ADA695", back2: "#F1EEE4", floor: "#C4B492", floor2: "#968264",
              lip: "#38301F", key: "#FFE9B4", horizon: 500, grit: "#262014" },
  /* 5 · THE BUILD FLOOR — mid cold teal, work light. */
  floor:    { back: "#0F2228", back2: "#2C5A64", floor: "#1E424A", floor2: "#0E2026",
              lip: "#040E12", key: "#86D2DE", horizon: 498, grit: "#061014" },
  /* 6 · THE SAME FLOOR, RE-LIT WARM as the app comes together. */
  floorlit: { back: "#2A1E12", back2: "#7E5A2E", floor: "#6A4E2C", floor2: "#331F12",
              lip: "#1A1006", key: "#FFCE7A", horizon: 498, grit: "#180E06" },
  /* 7 · THE NIGHT FLOOR — deep blue, lamps on, nobody there. */
  night:    { back: "#0A1230", back2: "#202C5E", floor: "#151E40", floor2: "#080C20",
              lip: "#03050E", key: "#F0D28C", horizon: 522, grit: "#05070E" },
  /* 8 · THE DESK — DAYLIGHT. The brightest body set, and the biggest lightness
     jump on any cut in the reel (it follows `night`). */
  desk:     { back: "#93A8C0", back2: "#EEF2F5", floor: "#BCA884", floor2: "#8E7A56",
              lip: "#382E20", key: "#FFF4D8", horizon: 470, grit: "#241C12" },
  /* 10 · THE LINE HALL — the hook lives here, so it is built for the >=140
     frame-0 law: a pale COOL daylight shed with a clerestory. The line's own
     lamps are the warm accent against it, which is the value structure the
     reference sheet asks for (pale cool ground, hot accent) without needing the
     palette's dark stop lifted anywhere. */
  linehall: { back: "#AAB8C6", back2: "#F0F3F6", floor: "#BCB29A", floor2: "#8E8468",
              lip: "#3A342A", key: "#FFF6E2", horizon: 486, grit: "#241E16" },
  /* 9 · THE OPEN — warm and bright, through to the CTA. */
  open:     { back: "#4A3A50", back2: "#F0DEB4", floor: "#A08868", floor2: "#645440",
              lip: "#2A2018", key: "#FFDCA0", horizon: 494, grit: "#241A14" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** the ground line the cast stands on, house-wide */
export const GY = 706;

/** ⛔ THE RESERVED PLATE BAND — nothing else enters panel y 112..210.
    The cast owns the ground line; `HookHeader` owns y 0..96. */
export const BAND_Y = 132;

/** ⛔ THE SAFE BOX FOR ALL THREE CUTS. The visible window is `push x cam.s` and
    `cam` differs PER VARIANT, so what survives every cut is the INTERSECTION.
    Computed from `CAM` in AgScenes:
      house s1.012 dx  -6  ->  x  24..936
      amber s1.048 dx -50  ->  x  30..864
      steel s1.052 dx  52  ->  x 134..974
      SAFE FOR ALL THREE   ->  x 134..864  (730px, not 1012) */
export const SAFE3 = { x0: 134, x1: 864, cx: 499 } as const;
