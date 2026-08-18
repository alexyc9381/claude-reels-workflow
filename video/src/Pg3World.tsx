import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 109 · "PLUGINS3" — THE WORLD KIT.  Board: storyboards/109-plugins3.md.

   Three free Claude Code plugins, each knocking down a different wall:
     claude-code-setup  scans your codebase and RECOMMENDS what to install
     OmniRoute          routes around the usage limit across 290 providers
     claude-mem         carries context across sessions

   World = THE ALL-NIGHT BUILD, a machine hall where a build runs through the
   night. ⭐ Every prop is one of the SUBJECT'S OWN objects — repo cards, file
   crates with real filenames, cartridges, provider logo tiles, token coins,
   session spools. [[feedback_real_marks_are_the_props]] rejected two worlds
   whose mappings were CORRECT because every prop had to be TRANSLATED first.
   Nothing here does. And OmniRoute's own noun is a ROUTE, which is already a
   physical object — the free pass this world is built on.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R1`..`R3`, `BANNED`
      below). Every number the picture is allowed to state lives here, so no
      scene can invent one. Checked live against the GitHub API and each repo's
      own README on 2026-08-18.

   ⛔⛔⛔ THE THREE THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1 The VO says the setup plugin gives you "10x your productivity". NOTHING
        backs a multiplier. S3 typesets NO NUMERAL AT ALL — the picture shows
        the ranked stack being HANDED OVER and the bench starting work, and the
        claim stays in the audio. Guard: `MULTIPLIER_BANNED`.
      2 The VO says OmniRoute gives "unlimited usage". The README never says
        unlimited — its own words are "Never stop coding" / "never hit limits",
        delivered by a quota-aware FOUR-TIER CASCADE. So S6 draws the CASCADE.
        Guard: `UNLIMITED_BANNED`.
      3 The VO says "1.6 billion tokens". The README publishes ~1.53B/mo
        (up to ~2.15B in month one with signup credits) and says the figure is
        re-audited fortnightly. The receipt prints the REPO'S figure with its
        source plate. Guard: `TOKEN_FIGURE_BANNED`.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that must stay 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";
export const VIOLET = "#8E75B2", MINT = "#8FD8B4";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Live 2026-08-18.
   Stars from the GitHub API on build day, never from a blog — a syndicated
   article had claude-mem at "46.1K" while the API returned 90,651 on reel 104
   and 91,045 today ([[repo-reel]]'s rule paying out a third time).
   ====================================================================== */

/** PLUGIN 1 — the official Anthropic marketplace that ships `claude-code-setup`.
    ⛔ The star count is the MARKETPLACE repo's, not the plugin's own, so the
    plate names the repo. The VO's description is ACCURATE: the skill scans the
    codebase and RECOMMENDS across five categories, and its own docs say it is
    read-only. Printing READ-ONLY is honest AND the better picture — a scan plus
    a ranking is an arc; "it installs it" is one motionless event. */
export const R1 = {
  repo: "anthropics/claude-plugins-official", stars: "33,639", lic: "Apache-2.0",
  plugin: "claude-code-setup",
  cats: ["MCP", "SKILLS", "HOOKS", "SUBAGENTS", "COMMANDS"],
  verb: "RECOMMENDS · READ-ONLY",
} as const;

/** PLUGIN 2 — OmniRoute. ⛔ The repo DESCRIPTION says 340 providers / 1200+
    models while the README headline says 290 providers / 516 models. It
    contradicts itself exactly the way reel 104's `awesome-freellm-apis` did.
    The VO says "over 200", which both figures satisfy, so the picture prints
    the README HEADLINE — the subject's own most conservative number. */
export const R2 = {
  repo: "diegosouzapw/OmniRoute", stars: "50,060", lic: "MIT",
  providers: "290 PROVIDERS", free: "90+ FREE",
  tiers: ["SUBSCRIPTION", "API KEY", "CHEAP", "FREE"],
  tokens: "~1.53B", tokenUnit: "FREE TOKENS / MO", tokenSrc: "README · POOL-DEDUPED",
  pools: 43,
} as const;

/** PLUGIN 3 — claude-mem.
    ⛔ OVERLAP: this exact repo was plugin #3 of REEL 104 PLUGIN, five days ago
    at ★90,651. Not fixable without a re-record. S8/S9 must not reuse 104's
    staging (labelled trays) — this reel does an ERASE and a PLAYBACK instead. */
export const R3 = {
  repo: "thedotmack/claude-mem", stars: "91,045", lic: "Apache-2.0",
  verb: "ACROSS SESSIONS",
} as const;

export const KEYWORD = "CLAUDE";
export const TOTAL_STARS = "174,744";

/* ⛔ GREPPABLE INTENT GUARDS (board · honesty ledger). If a later pass wants to
   typeset any of these, the board and this ledger have to be revised FIRST. The
   ship-gate greps for them. */
/* ⚠️ SCOPE NARROWED 2026-08-18 ON ALEX'S EXPLICIT INSTRUCTION. The hook HEADER
   now reads "3 CLAUDE CODE PLUGINS / TO 10X PRODUCTIVITY" — his call, made after
   the concern was raised. The guard still holds everywhere it matters: no SCENE
   may typeset a multiplier, because a number on a receipt-shaped object inside
   the picture is the most believable kind of wrong. The header is chrome and it
   is echoing the VO's own words; a plate beside a star count is not. */
export const MULTIPLIER_BANNED_IN_SCENES = ["10X", "10x", "10×", "TEN TIMES", "10 X"] as const;
export const UNLIMITED_BANNED = ["UNLIMITED", "Unlimited", "∞", "INFINITE"] as const;
export const TOKEN_FIGURE_BANNED = ["1.6B", "1.6 BILLION", "1,600,000,000"] as const;

/** the twelve providers with a REAL mark in public/logos/, every one of them
    named in OmniRoute's own README. ⛔ A wrong mark is worse than no mark, and
    the other 278 stay ANONYMOUS tiles on purpose — an honest picture of "290",
    not a padded one. ⛔ Checked: none of these ship `fill="#ffffff"`, which
    would be invisible on the white tile. */
export const PROVIDERS: Array<{ t: string; logo: string; c: string }> = [
  { t: "OpenAI",     logo: "openai.png",       c: "#0E1116" },
  { t: "Gemini",     logo: "googlegemini.svg", c: "#8E75B2" },
  { t: "DeepSeek",   logo: "deepseek.svg",     c: "#5786FE" },
  { t: "Groq",       logo: "groq.svg",         c: "#F43E01" },
  { t: "Mistral",    logo: "mistralai.svg",    c: "#FA520F" },
  { t: "MiniMax",    logo: "minimax.svg",      c: "#E73562" },
  { t: "Qwen",       logo: "qwen.svg",         c: "#6950EF" },
  { t: "xAI",        logo: "x.svg",            c: "#1A1A1A" },
  { t: "Anthropic",  logo: "anthropic.svg",    c: "#D97757" },
  { t: "OpenRouter", logo: "openrouter.svg",   c: "#94A3B8" },
  { t: "HuggingFace",logo: "huggingface.svg",  c: "#FFD21E" },
  { t: "NVIDIA",     logo: "nvidia.svg",       c: "#76B900" },
];

/** real filenames for the crate wall. ⛔ §3 of the craft doc: the VO says
    "scans your entire CODEBASE" — so the crates ARE files, with the names a
    real repo actually has. A crate with a generic glyph on it is a container. */
export const FILES = [
  "package.json", "src/App.tsx", "Dockerfile", "tsconfig.json", ".env.example",
  "api/routes.py", "Cargo.toml", "go.mod", "README.md", "src/index.ts",
  "requirements.txt", "docker-compose.yml", "src/db/schema.sql", "Makefile",
  "src/auth/login.ts", ".github/ci.yml", "vite.config.ts", "src/lib/http.rs",
  "tests/e2e.spec.ts", "pyproject.toml", "src/hooks/useAuth.ts", "next.config.js",
];

/** what the setup skill actually recommends, by category — all named in the
    plugin's own docs. ⛔ Nothing invented: no scores, no install counts, no
    per-item numbers, because the plugin publishes none. */
export const CANDIDATES: Array<{ t: string; cat: number }> = [
  { t: "context7", cat: 0 }, { t: "Playwright", cat: 0 }, { t: "postgres", cat: 0 },
  { t: "frontend-design", cat: 1 }, { t: "Plan agent", cat: 1 },
  { t: "auto-format", cat: 2 }, { t: "block-secrets", cat: 2 },
  { t: "security-reviewer", cat: 3 }, { t: "performance", cat: 3 }, { t: "a11y", cat: 3 },
  { t: "/pr-review", cat: 4 }, { t: "/test", cat: 4 },
];

/* =========================================================================
   THE ELEVEN PLACES.
   ⛔ NEIGHBOURING SCENES DIFFER BY **BOTH HUE AND LIGHTNESS** (the AGENCY bar):
     bay indigo/BRIGHT -> hold teal/dark -> shelf ochre/mid-bright
     -> bench oxblood/dark -> lane steel/mid -> grid near-black
     -> gate RED/dark -> mint gold/BRIGHTEST-body -> void grey/drained
     -> drum green/mid-bright -> runlit amber/bright
   ⛔⛔ Every `back2`/`floor2` is the darkest value in its row ON PURPOSE. That
      is what the black-point gate measures and what lets one lit thing out-rank
      the frame. If a set comes out too dim, add a `Cone`/`Pool` or brighten the
      SUBJECT — NEVER lift these. That is the move that flattened ten reels
      (saturation -47%, black point +95%, motion +2.6%).
   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE. Body rows target luma
      70-105 / saturated 34-45% / p10 <= 35.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE BAY. The HOOK set, and the ONLY one built bright.
     ⛔⛔ MEASURE THE GATE ON THE FILE THAT SHIPS. Remotion's intermediate is
     yuvj420p (full range); the delivered mp4 must be yuv420p (limited, 16-235)
     and that conversion COMPRESSES luma by ~2 points. Source targets ~147 so
     the delivered file still clears 140 with margin. */
  bay:    { back: "#7A87B4", back2: "#59638E", floor: "#C2C7D3", floor2: "#A6ABBC",
            lip: "#D9DEEB", key: "#E7B24C", horizon: 524, grit: "#F2F4F9" },

  /* S1 — the cargo hold. Teal, mid-dark; the gantry brings its own light. */
  hold:   { back: "#12303A", back2: "#07171D", floor: "#143039", floor2: "#081A20",
            lip: "#215260", key: "#7FC0C9", horizon: 548, grit: "#7FC0C9" },

  /* S2 — the sorting shelf. Warm ochre, mid-bright — the lift after the hold. */
  shelf:  { back: "#5E4326", back2: "#33230E", floor: "#6E4E2C", floor2: "#3C2916",
            lip: "#8E6536", key: "#E0925A", horizon: 506, grit: "#C08E5A" },

  /* S3 — the bench. Deep oxblood, one hard practical. Dark on purpose: the
     handoff is the only lit thing, which is what makes it rank. */
  bench:  { back: "#3A1F27", back2: "#1C0D12", floor: "#3E2429", floor2: "#200F14",
            lip: "#5C343E", key: "#E0A07A", horizon: 540, grit: "#8A5A64" },

  /* S4 — the road. EXTERIOR, steel-blue night. (Surface palette in Pg3Sets.) */
  lane:   { back: "#24374C", back2: "#0F1824", floor: "#1C2734", floor2: "#0C121A",
            lip: "#3A5473", key: "#6FA8DC", horizon: 596, grit: "#8AA6C4" },

  /* S5 — the provider grid. THE DARKEST SET IN THE REEL, lit only by its own
     tiles. ⛔ The light ARRIVES with the marks; never lift this palette. */
  grid:   { back: "#13161D", back2: "#07080C", floor: "#161920", floor2: "#08090D",
            lip: "#282E3A", key: "#8FB6D8", horizon: 566, grit: "#3A4250" },

  /* S6 — the limit gate. Red-lit, dark, hostile. The villain's one win. */
  gate:   { back: "#3C161A", back2: "#190709", floor: "#301418", floor2: "#14060A",
            lip: "#6A2229", key: "#E4574A", horizon: 588, grit: "#A84A44" },

  /* S7 — the minting hall. Gold, the BRIGHTEST body set — the peak. */
  mint:   { back: "#6A4C1E", back2: "#3A280C", floor: "#7A5A26", floor2: "#432E10",
            lip: "#A87C34", key: "#F4CE79", horizon: 512, grit: "#D9AE62" },

  /* S8 — the void. Cold blue-grey and DRAINED: the wipe. Lowest saturation in
     the reel, deliberately, for one 2.7s beat before the last lift. */
  void:   { back: "#2A313A", back2: "#12161C", floor: "#252B33", floor2: "#0F1218",
            lip: "#414B57", key: "#9FB0BE", horizon: 556, grit: "#6E7B88" },

  /* S9 — the spool room. Green/mint, mid-bright: the recall. */
  drum:   { back: "#123A2C", back2: "#061C14", floor: "#143A2E", floor2: "#071E16",
            lip: "#22634B", key: "#8FD8B4", horizon: 530, grit: "#6FBF9A" },

  /* S10 — the run, lit. Amber, bright, the payoff. */
  runlit: { back: "#5A4222", back2: "#2E2010", floor: "#5E4626", floor2: "#31220F",
            lip: "#8A6538", key: "#F0C979", horizon: 574, grit: "#C79B62" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   MOTION HELPERS.
   ====================================================================== */

/** ⛔⛔ A TRAVELLING BAND MUST ALTERNATE **LIGHT AND SHADOW**. Light-only bands
    scored 7.79 on reel 106 AND lifted the black point 47.4 -> 56.1 — the exact
    "fix it by lifting the shading" move the look gate exists to ban. Alternating
    fixed both at once (9.92, black point back down): every boundary becomes
    light-against-shadow, so there is more luma delta per swept pixel. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; speed?: number; z?: number; o?: number; skew?: number }> =
  ({ f, y, h, x0 = -140, span = 1300, n = 8, c = "#FFFFFF", speed = 3.4, z = 22, o = 0.20, skew = -12 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + (((f * speed) + i * (span / n)) % span);
      const shadow = i % 2 === 1;
      /* ⛔⛔ THE BAND IS RAKING LIGHT, NOT WALLPAPER. v4 ran these at full width
         (0.58 of the pitch) and o 0.12-0.34, and on a contact sheet of nine
         scenes the diagonal stripes were the FIRST thing you saw in every one —
         a texture applied to the reel rather than light falling through a room.
         ⛔⛔ AND THEN THE FIX WENT TOO FAR. Narrowing to 0.34 of the pitch at
         0.52 opacity took the reel's median motion 10.81 -> 9.18, one point off
         the bar, with EVERY scene dropping (SCAN 10.81->9.18, ROAD 11.21->8.89,
         CTA 11.04->8.45). That is the formula being obeyed exactly: motion is
         (fraction of the panel repainted per 0.1s) x (luma delta), and both
         terms had just been cut.

         ⭐ THE RESOLUTION SEPARATES THE TWO THINGS THAT WERE BEING TRADED. What
         made it look like wallpaper was the HARD EDGE — a hard-edged bar reads
         as a graphic laid over the room, a feathered one reads as light falling
         through it. What made it MEASURE was swept area x speed, neither of
         which a viewer reads as "stripiness" in a still frame. So: keep the
         feathering (the visual fix), restore the width to 0.50 and the opacity
         to 0.80 of requested, and take the rest back through SPEED at the call
         sites, which is free — a faster sweep repaints more per sample and looks
         no heavier at any instant. */
      const W = (span / n) * 0.50;
      return (
        <div key={"rk" + i} style={{ position: "absolute", left: x, top: y,
          width: W, height: h, zIndex: z,
          transform: `skewX(${skew}deg)`,
          background: shadow
            ? `linear-gradient(90deg, rgba(4,6,11,0) 0%, rgba(4,6,11,${Math.min(0.56, o * 1.42)}) 46%, rgba(4,6,11,${Math.min(0.56, o * 1.42)}) 58%, rgba(4,6,11,0) 100%)`
            : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o * 0.80)} 46%, ${hexa(c, o * 0.80)} 58%, ${hexa(c, 0)} 100%)` }} />
      );
    })}
  </>);

/** an expanding ring — what an arrival COSTS. ⛔ Nothing lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; max?: number; dur?: number }> =
  ({ x, y, f, at, c = "#FFFFFF", z = 70, max = 190, dur = 18 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  const r = k * max;
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.34, width: r * 2,
      height: r * 0.68, borderRadius: "50%", zIndex: z,
      border: `${Math.max(1, 5 * (1 - k))}px solid ${hexa(c, 0.5 * (1 - k))}` }} />
  );
};

/** a dust puff — the second half of "an arrival costs something" */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  z?: number; n?: number; s?: number }> =
  ({ x, y, f, at, c = "#B9B2A4", z = 68, n = 7, s = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const k = E(f, at, at + 22 + (i % 3) * 5, 0, 1, OUT);
      if (k <= 0 || k >= 1) return null;
      const dir = (i / (n - 1) - 0.5) * 2;
      return (
        <div key={"pf" + i} style={{ position: "absolute",
          left: x + dir * 96 * k * s, top: y - k * 34 * s - (i % 2) * 8,
          width: (16 + (i % 3) * 9) * s, height: (16 + (i % 3) * 9) * s,
          borderRadius: "50%", background: hexa(c, 0.36 * (1 - k)), zIndex: z }} />
      );
    })}
  </>);

/** the practical pool on a floor — what makes a dark set read LIT without
    touching the palette's dark stop */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number }> = ({ x, y, w: ww, c = "#E7B24C", o = 0.22, z = 18 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: ww * 0.30,
    borderRadius: "50%", zIndex: z,
    background: `radial-gradient(ellipse at 50% 50%, ${hexa(c, o)} 0%, ${hexa(c, 0)} 70%)` }} />
);

/** a hard practical cone. Local copy so this reel never reaches into MktWorld. */
export const Lamp: React.FC<{ x: number; y: number; bot?: number; top?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number }> =
  ({ x, y, bot = 340, top = 90, len = 400, c = "#F0C979", o = 0.20, z = 20, f = 0 }) => {
  const flick = 1 + Math.sin(f / 23) * 0.05 + Math.sin(f / 7.3) * 0.02;
  return (
    <div style={{ position: "absolute", left: x - bot / 2, top: y, width: bot, height: len,
      zIndex: z, opacity: o * flick,
      clipPath: `polygon(${(bot - top) / 2}px 0, ${(bot + top) / 2}px 0, ${bot}px ${len}px, 0 ${len}px)`,
      background: `linear-gradient(180deg, ${hexa(c, 0.95)} 0%, ${hexa(c, 0)} 100%)` }} />
  );
};

/* =========================================================================
   THE HERO ARTIFACT — THE RIG SPINE.
   Three sockets, empty and lit at frame 0 of S0, three seated and rolling at
   S10. ⛔⛔ REEL 104 RAN THREE DARK EMPTY SLOTS FOR ELEVEN ROUNDS and the note
   that finally fixed it was Alex's: PUT CLAUDES IN THEM. So a seated cartridge
   is never just a lit rectangle — the spine drives a working machine and there
   is always a sprite riding it.
   ====================================================================== */
export const Spine: React.FC<{ x: number; y: number; f: number; seated: number;
  s?: number; z?: number; fuse?: number; shake?: number }> =
  ({ x, y, f, seated, s = 1, z = 40, fuse = -999, shake: sh = 0 }) => {
  const jolt = sh ? Math.sin(f / 1.7) * sh : 0;
  /* the fuse runs bottom-to-top once the third cartridge locks */
  const fk = fuse > -900 ? E(f, fuse, fuse + 16, 0, 1, OUT) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateX(${jolt}px)` }}>
      {/* the column itself — a real drawn mass, not a rectangle: base, three
          bays with lips and rails, a capital, and a spine channel up the front */}
      <div style={{ position: "absolute", left: -26 * s, top: 388 * s, width: 232 * s,
        height: 44 * s, borderRadius: 10 * s, background: "#161A22", boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -12 * s, top: 372 * s, width: 204 * s,
        height: 22 * s, borderRadius: 6 * s, background: "#252B36" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 180 * s, height: 392 * s,
        borderRadius: 14 * s, background: "linear-gradient(174deg,#4A5568 0%,#232A36 100%)",
        border: `${3 * s}px solid #63708A`, boxShadow: SH_D }} />
      {/* a lit face-plate down the left flank, so the mass has a light side and
          a dark side rather than one flat value */}
      <div style={{ position: "absolute", left: 4 * s, top: 6 * s, width: 22 * s,
        height: 380 * s, borderRadius: 8 * s, background: hexa("#C9D4E8", 0.24) }} />
      {/* the channel — the fuse runs up this */}
      <div style={{ position: "absolute", left: 82 * s, top: 16 * s, width: 16 * s,
        height: 360 * s, borderRadius: 8 * s, background: "#0C0F15" }} />
      <div style={{ position: "absolute", left: 82 * s, top: 16 * s + (1 - fk) * 360 * s,
        width: 16 * s, height: fk * 360 * s, borderRadius: 8 * s, background: GOLD }} />
      {/* the capital */}
      <div style={{ position: "absolute", left: -14 * s, top: -26 * s, width: 208 * s,
        height: 32 * s, borderRadius: 8 * s, background: "#39424F" }} />
      {[0, 1, 2].map((i) => {
        const on = i < seated;
        const top = (36 + i * 118) * s;
        return (
          <div key={"bay" + i}>
            {/* the socket recess. ⛔⛔ REEL 104 RAN THREE DARK EMPTY SLOTS FOR
                ELEVEN ROUNDS. An empty bay here is not a black rectangle: it is
                lit from inside, rimmed in amber, and carries a DASHED GHOST of
                the cartridge that belongs in it — so frame 0 states "three are
                missing" instead of "there are three dark holes". */}
            <div style={{ position: "absolute", left: 16 * s, top, width: 148 * s,
              height: 96 * s, borderRadius: 10 * s,
              background: on ? "#0A0D13"
                : `linear-gradient(180deg,${hexa(GOLD, 0.20)} 0%,${hexa("#1A2130", 0.96)} 100%)`,
              border: `${3 * s}px solid ${hexa(GOLD, on ? 0.55 : 0.42)}` }} />
            {!on && (<>
              <div style={{ position: "absolute", left: 30 * s, top: top + 14 * s,
                width: 120 * s, height: 68 * s, borderRadius: 7 * s,
                border: `${3 * s}px dashed ${hexa("#F7DFA8", 0.52)}` }} />
              {/* the bay's own standby lamp, on its own clock */}
              <div style={{ position: "absolute", left: 132 * s, top: top + 74 * s,
                width: 12 * s, height: 12 * s, borderRadius: "50%",
                background: hexa("#F7DFA8", 0.30 + Math.abs(Math.sin(f / 13 + i * 1.9)) * 0.45) }} />
            </>)}
            {/* the rails that guide a cartridge in */}
            <div style={{ position: "absolute", left: 10 * s, top: top + 14 * s, width: 160 * s,
              height: 5 * s, background: "#2E3746" }} />
            <div style={{ position: "absolute", left: 10 * s, top: top + 74 * s, width: 160 * s,
              height: 5 * s, background: "#2E3746" }} />
            {/* the seated cartridge face */}
            {on && (<>
              <div style={{ position: "absolute", left: 24 * s, top: top + 8 * s,
                width: 132 * s, height: 80 * s, borderRadius: 8 * s,
                background: [CLAY, SKY, GREEN][i], boxShadow: SH }} />
              {/* ⛔ A COLOURED RECTANGLE IS A CONTAINER. The seated bay keeps the
                  plugin's NAME on it, so the rig states which three are in it. */}
              <div style={{ position: "absolute", left: 32 * s, top: top + 16 * s,
                width: 116 * s, height: 26 * s, borderRadius: 5 * s, background: PAPER,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden" }}>
                <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 13 * s,
                  color: INK, whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>
                  {["claude-setup", "OmniRoute", "claude-mem"][i]}
                </span>
              </div>
              {/* a real status lamp that pulses on its own clock */}
              <div style={{ position: "absolute", left: 132 * s, top: top + 62 * s,
                width: 14 * s, height: 14 * s, borderRadius: "50%",
                background: hexa("#FFF6DE", 0.5 + Math.sin(f / 8 + i * 2) * 0.4) }} />
            </>)}
          </div>
        );
      })}
    </div>
  );
};

/** the CARTRIDGE as a travelling object — a real drawn module, not a slab:
    shell, label band, contact fingers, a grip notch and a lit status bead.
    ⭐ [[feedback_props_need_real_drawing]]: count the divs per object BEFORE
    adding more objects. This is nine. */
export const Cartridge: React.FC<{ x: number; y: number; f: number; c: string; t: string;
  s?: number; z?: number; rot?: number; lit?: number }> =
  ({ x, y, f, c, t, s = 1, z = 60, rot = 0, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 148 * s, height: 92 * s,
      borderRadius: 10 * s, background: `linear-gradient(168deg,${mxh(c, 0.18)} 0%,${dkh(c, 0.20)} 100%)`,
      border: `${3 * s}px solid ${dkh(c, 0.36)}`, boxShadow: SH_D }} />
    {/* the label band, where the plugin's name lives */}
    <div style={{ position: "absolute", left: 10 * s, top: 12 * s, width: 128 * s,
      height: 30 * s, borderRadius: 6 * s, background: PAPER, display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, color: INK,
        letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{t}</span>
    </div>
    {/* contact fingers along the bottom — five of them, gold */}
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={"cf" + i} style={{ position: "absolute", left: (16 + i * 25) * s, top: 78 * s,
        width: 17 * s, height: 14 * s, borderRadius: `0 0 ${3 * s}px ${3 * s}px`,
        background: hexa(GOLD, 0.86) }} />
    ))}
    {/* the grip notch */}
    <div style={{ position: "absolute", left: 52 * s, top: 50 * s, width: 44 * s,
      height: 9 * s, borderRadius: 5 * s, background: dkh(c, 0.42) }} />
    {/* the status bead */}
    <div style={{ position: "absolute", left: 122 * s, top: 50 * s, width: 13 * s,
      height: 13 * s, borderRadius: "50%",
      background: hexa("#FFF6DE", lit * (0.55 + Math.sin(f / 7) * 0.35)) }} />
  </div>
);

/* =========================================================================
   THE REPO CARD — ⭐⭐ "for any repo/tool/product reel the most obvious object
   available is the thing itself, rendered as ONE CARD": the GitHub mark,
   owner/name, star count, licence, and the claim under it. It needs no
   decoding, it carries the receipt, and it is the brightest thing in frame.
   ====================================================================== */
export const RepoCard: React.FC<{ x: number; y: number; f: number; at?: number;
  repo: string; stars: string; lic: string; claim?: string; c?: string;
  s?: number; z?: number; rot?: number }> =
  ({ x, y, f, at = -999, repo, stars, lic, claim, c = CLAY, s = 1, z = 72, rot = 0 }) => {
  const k = at > -900 ? E(f, at, at + 9, 0, 1, BACK) : 1;
  if (k <= 0) return null;
  const sq = at > -900 ? squash(f, at + 8, 0.16) : 1;
  const [owner, name] = repo.includes("/") ? repo.split("/") : ["", repo];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, k * 1.6),
      transform: `translateY(${(1 - k) * -110}px) rotate(${rot + (1 - k) * -7}deg) scaleY(${sq})`,
      transformOrigin: "50% 100%" }}>
      {/* ⛔ AUTO-WIDTH, NOT A FIXED 452. At s=0.50 a fixed card is 226px and
          `anthropics/claude-plugins-official` is ~245px of mono at that size, so
          the receipt — the one thing on the card that has to be checkable —
          silently ran off its own plate. The card now sizes to its content. */}
      <div style={{ width: "max-content", maxWidth: 620 * s, borderRadius: 18 * s,
        background: PAPER, border: `${4 * s}px solid ${dkh(c, 0.10)}`,
        boxShadow: SH_D, overflow: "hidden" }}>
        {/* the head band — GitHub mark + owner/name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
          padding: `${13 * s}px ${16 * s}px`, background: c }}>
          <Img src={staticFile("logos/github.svg")}
            style={{ width: 40 * s, height: 40 * s, objectFit: "contain",
              filter: "brightness(0) invert(1)" }} />
          <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 24 * s, color: "#FFFFFF",
            whiteSpace: "nowrap", letterSpacing: "-0.02em" }}>
            <span style={{ opacity: 0.72 }}>{owner}/</span>{name}
          </span>
        </div>
        {/* the receipt row — stars and licence, the two things that are checkable */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 * s,
          padding: `${12 * s}px ${16 * s}px` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 * s,
            padding: `${5 * s}px ${12 * s}px`, borderRadius: 9 * s, background: hexa(GOLD, 0.20),
            border: `${2 * s}px solid ${hexa(GOLD, 0.55)}` }}>
            <span style={{ fontSize: 22 * s, lineHeight: 1, color: "#B98A18" }}>★</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
              color: INK, letterSpacing: "-0.02em" }}>{stars}</span>
          </div>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18 * s, color: "#6E6A61",
            padding: `${5 * s}px ${10 * s}px`, borderRadius: 8 * s, background: "#EFECE4" }}>{lic}</span>
        </div>
        {claim && (
          <div style={{ padding: `0 ${16 * s}px ${14 * s}px`, }}>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 20 * s,
              color: dkh(c, 0.30), letterSpacing: "-0.01em" }}>{claim}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/** the ONE text chip a shot is allowed. ⛔ Budget is ONE per shot, in a band
    nothing else enters (docs/ANIMATION-QUALITY §9). */
export const Tag: React.FC<{ x: number; y: number; t: string; c?: string; s?: number;
  z?: number; f?: number; at?: number }> =
  ({ x, y, t, c = PAPER, s = 1, z = 88, f = 0, at = -999 }) => {
  const k = at > -900 ? E(f, at, at + 7, 0, 1, OUT) : 1;
  if (k <= 0) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: k,
      transform: `translateY(${(1 - k) * 16}px)`,
      padding: `${9 * s}px ${18 * s}px`, borderRadius: 11 * s, background: c,
      border: `${3 * s}px solid ${dkh(c, 0.14)}`, boxShadow: SH }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
        letterSpacing: "0.03em", color: INK, whiteSpace: "nowrap" }}>{t}</span>
    </div>
  );
};

/** a real brand mark on a WHITE tile — the only way a mark stays legible over a
    dark set. ⛔ >= 96px on the mark itself; a wrong mark is worse than none. */
export const LogoTile: React.FC<{ x: number; y: number; logo: string; t?: string;
  s?: number; z?: number; lit?: number; c?: string }> =
  ({ x, y, logo, t, s = 1, z = 40, lit = 1, c = "#FFFFFF" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ width: 132 * s, height: 132 * s, borderRadius: 16 * s,
      background: lit > 0.5 ? c : "#1B1F27",
      border: `${3 * s}px solid ${lit > 0.5 ? "#E3DDCE" : "#262C36"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: lit > 0.5 ? SH : undefined, opacity: 0.35 + lit * 0.65 }}>
      <Img src={staticFile("logos/" + logo)}
        style={{ width: 98 * s, height: 98 * s, objectFit: "contain",
          opacity: lit > 0.5 ? 1 : 0.14 }} />
    </div>
    {t && lit > 0.5 && (
      <div style={{ position: "absolute", left: 0, top: 138 * s, width: 132 * s,
        textAlign: "center" }}>
        <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15 * s,
          color: "#CFC8B8", whiteSpace: "nowrap" }}>{t}</span>
      </div>
    )}
  </div>
);
