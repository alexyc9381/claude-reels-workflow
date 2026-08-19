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
   REEL 110 · "FLOW" — THE WORLD KIT.  Board: storyboards/110-flow.md.

   Subject: github.com/ruvnet/ruflo — "the original agent meta-harness", the repo
   that used to be `ruvnet/claude-flow`. One Claude drowning in a queue types
   `npx ruflo init` and becomes SIXTY Claudes that work in parallel, share one
   memory, improve each other every run, and route the easy work off the
   frontier model.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS AND NOTHING ELSE.
      [[feedback_real_marks_are_the_props]] has burned three reels — a night
      waterworks, a title fight and a heap of coins were each a CORRECT mapping
      of the mechanism and each got rejected, because a metaphor for the
      mechanism is not the subject. The largest object here is free:
      **AN AGENT IS A CLAUDE.** The VO says "60 agents"; the house mascot is the
      literal noun. Sixty clay Claudes need no decoding at all.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below). Every
      figure the picture is allowed to state lives here, so no scene can invent
      one. Checked live 2026-08-18 against the GitHub API and the raw README.

   ⛔⛔⛔ THE TWO THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1 the VO says the tool "slashes your API costs by **75%**". That figure is
        NOWHERE in the README. What IS there is the MECHANISM (`ruflo-ruvllm`
        "run local LLMs (Ollama, etc.) with smart routing", "Multi-Provider ...
        with smart routing", `ruflo-cost-tracker`). So the reel dramatises the
        mechanism and stops at the edge of the claim: the meter's needle FALLS
        and NO PERCENTAGE IS TYPESET ANYWHERE. Guard: `PCT_BANNED`.
      2 the VO says "ranked number one in agentic frameworks". The OLD
        `claude-flow` description said that; the CURRENT `ruflo` one does not.
        So there is no #1 badge — S8 shows the repo's own GitHub TOPIC chips
        instead. Guard: `RANK_BANNED`.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
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
export const CYAN = "#6FD3D8", VIOLET = "#9A7FD0";

/* =========================================================================
   THE RECEIPTS — one place, so no scene can invent a number.
   Verified live 2026-08-18: api.github.com/repos/ruvnet/ruflo and the raw
   README at raw.githubusercontent.com/ruvnet/ruflo/main/README.md.
   ====================================================================== */
export const R = {
  owner: "ruvnet",
  name: "ruflo",
  full: "ruvnet/ruflo",
  /** 68,132 on build day. The VO says "over 20,000" — TRUE and understated, so
      the frame carries the REAL figure. A bigger true number does not
      contradict "over 20,000". */
  stars: "68,132",
  starsN: 68132,
  forks: "8,173",
  license: "MIT",
  cmd: "npx ruflo init",
  tagline: "AGENT META-HARNESS",
  /** the repo's own topics, used INSTEAD of a rank badge at S8 */
  topics: ["agentic-framework", "swarm-intelligence", "multi-agent"] as const,
  /** the four roles the VO names, all four backed:
      README "specialized agents for coding, testing, security, docs,
      architecture" + the GOAP planner at goal.ruv.io */
  roles: ["PLAN", "CODE", "TEST", "SECURITY"] as const,
  /** the README's own architecture line — this is the reel's spine:
      User -> Ruflo (CLI/MCP) -> Router -> Swarm -> Agents -> Memory -> LLM
      Providers, with a Learning Loop returning to the Router. */
  spine: ["ROUTER", "SWARM", "AGENTS", "MEMORY", "PROVIDERS"] as const,
} as const;

export const KEYWORD = "FLOW";

/** ⛔⛔ GREPPABLE INTENT GUARDS (board §0, the honesty ledger). If a later pass
    wants to typeset any of these, it is wrong. The gate is:
      grep -rn "75%\|#1 \|RANKED #1\|3x more\|100+ AGENTS" src/Flw*.tsx  -> 0 */
export const PCT_BANNED = ["75%", "75 %", "-75%", "75 PERCENT", "SLASHES 75",
  "SAVE 75", "3X", "3×", "3x MORE", "THREE TIMES"] as const;
export const RANK_BANNED = ["#1", "No. 1", "NUMBER ONE", "RANKED #1",
  "RANKED NUMBER ONE", "TOP RANKED"] as const;
/** ⛔ the VO says 60 agents; the README says "100+" and the CLI track ships 98.
    60 is an understatement of a real number, so the reel DRAWS SIXTY and never
    typesets a different count against a spoken one. */
export const COUNT_BANNED = ["100+ AGENTS", "98 AGENTS", "100 AGENTS"] as const;

/* ⭐⭐ ONE COLOUR PER STATION, and it is that station's identity all reel.
   Reel 107's note: three resources were introduced in three colours and then
   every later scene drew them in default cream, so the viewer lost track. These
   constants are the ONLY source of a station's colour. */
export const ROLE_C = [
  "#E0925A",  /* PLAN     · ochre */
  "#6FA8DC",  /* CODE     · steel */
  "#8FD1A8",  /* TEST     · mint  */
  "#C88FA8",  /* SECURITY · rose  */
] as const;

/** the two lanes at S6, with the repo's own provider names and real marks.
    ⛔ A wrong mark is worse than no mark — both of these were checked on build
    day and both are dark-filled, so they survive a white tile
    (`ollama.svg #000000`, `claude.svg #D97757`). */
export const LANES = [
  { t: "LOCAL · FREE", logo: "logos/ollama.svg", c: "#6FD3D8", sub: "OLLAMA" },
  { t: "FRONTIER",     logo: "logos/claude.svg", c: "#E7B24C", sub: "CLAUDE" },
] as const;

/** ⭐ THE PROVIDERS THE README NAMES, VERBATIM: *"Multi-Provider: Claude, GPT,
    Gemini, Cohere, Ollama with smart routing."* All five go on the router's
    overhead rack, which is the "logos wherever possible" note done honestly —
    every one of these is a routing target the source lists.
    ⛔⛔ COHERE 404s ON THE SIMPLE-ICONS CDN (checked on build day), so it ships as
    a WORDMARK and never a faked glyph. A wrong mark is worse than no mark —
    [[reel-brand-logo-sourcing]], and the same call reel 108 made for Klaviyo. */
export const PROVIDERS: Array<{ t: string; logo: string | null }> = [
  { t: "Claude", logo: "logos/claude.svg" },
  { t: "GPT",    logo: "logos/openai.png" },
  { t: "Gemini", logo: "logos/googlegemini.svg" },
  { t: "Cohere", logo: null },
  { t: "Ollama", logo: "logos/ollama.svg" },
];

/* =========================================================================
   THE TEN PLACES.
   ⛔ NEIGHBOURING SCENES DIFFER BY **BOTH HUE AND LIGHTNESS** (the AGENCY bar):
      desk indigo/BRIGHT -> floor teal/dark -> gantry violet/bright ->
      benches ochre/mid -> core blue-black/DARKEST -> meter oxblood/dark-warm ->
      router steel-cyan/mid-bright -> deskclear amber/bright ->
      stars violet-gold/bright -> cta near-black/mid
   ⛔ Every `back2`/`floor2` is the darkest value in its row ON PURPOSE. That is
      what the black-point gate measures and what lets one lit thing out-rank the
      frame. If a set comes out dim, add a `Cone`/`Pool` or brighten the SUBJECT
      — NEVER lift these. That is the move that flattened ten reels.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE 3AM DESK, and the ONLY set built bright.
     ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE. AGENCY, the one reel
     that still passes the look gate, obeys it exactly: hook 154, body 64-103.
     ⛔⛔ MEASURE THE GATE ON THE FILE THAT SHIPS. Remotion writes yuvj420p
     (full range); the delivered mp4 must be yuv420p (limited range) or browsers
     refuse it, and that conversion costs ~1.5 luma. Source targets ~148. */
  /* ⛔⛔ `back` IS THE ONE VALUE IN THIS FILE THAT WAS RAISED, and only here.
     Frame 0 measured 134.8 then 139.1 against the >=140 bar, and the yuv420p
     encode costs another ~1.5. The hook set is the ONE place the brightness law
     applies (AGENCY: hook 154, body 64-103), so the lit half of this wall goes
     up while `back2` — the dark stop the black-point gate actually measures —
     is untouched. Every body row below is unchanged. */
  desk:     { back: "#7C8ABA", back2: "#4A5480", floor: "#BCC2D2", floor2: "#979DB2",
              lip: "#D6DBEA", key: "#E7B24C", horizon: 524, grit: "#EDF0F7" },

  /* S0 — THE PLATFORM. ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE, and
     this hook is the one set in the reel built to it. A dark stage with a single
     spotlit lifter is the composition the note asks for, and it CANNOT reach 140:
     at a 45-luma ground you would need half the panel painted at 235 to average
     out. So the hall is LIT and the hierarchy comes from where the eye is sent —
     one dominant object dead centre, a hard pool under it, and a dark platform
     slab holding the black point down. That is exactly what 94 AGENCY does
     (hook 154, body 64-103), and it is why AGENCY is still the look reference. */
  platform: { back: "#8E7C5A", back2: "#4E4230", floor: "#B6A478", floor2: "#6E6140",
              lip: "#DCCA9E", key: "#F2CE84", horizon: 548, grit: "#EEE4CC" },

  /* S1 — the swarm floor. Teal-green, mid-dark, so sixty clay bodies rank. */
  floor:    { back: "#123039", back2: "#08181D", floor: "#14313A", floor2: "#081A20",
              lip: "#215464", key: "#7FC0C9", horizon: 556, grit: "#7FC0C9" },

  /* S2 — the gantry. EXTERIOR, violet night, bright: the name is the subject. */
  gantry:   { back: "#4B3070", back2: "#1C1230", floor: "#382852", floor2: "#180F28",
              lip: "#6E4E9E", key: "#EFCF8C", horizon: 604, grit: "#A98CC4" },

  /* S3 — the four benches. Warm ochre workshop, mid. */
  benches:  { back: "#553C24", back2: "#2E1F0D", floor: "#66492C", floor2: "#3A2716",
              lip: "#875F36", key: "#E0925A", horizon: 512, grit: "#C08E5A" },

  /* S4 — the memory core. THE DARKEST SET IN THE REEL, lit only by the core. */
  core:     { back: "#101827", back2: "#05080F", floor: "#121A28", floor2: "#05080E",
              lip: "#243450", key: "#6FD3D8", horizon: 568, grit: "#3A5474" },

  /* S5 — the cost hall. Oxblood, dark-warm; the villain's own light. */
  meter:    { back: "#3E1C1C", back2: "#1E0A0A", floor: "#442220", floor2: "#210F0E",
              lip: "#6A3230", key: "#C44A3A", horizon: 540, grit: "#8A4A42" },

  /* S6 — the router. Steel + cyan, mid-BRIGHT: the peak is the readable scene. */
  router:   { back: "#22394A", back2: "#0E1A24", floor: "#2A4152", floor2: "#111E28",
              lip: "#456A82", key: "#6FD3D8", horizon: 500, grit: "#8FBECA" },

  /* S7 — the same room as S0, relit warm. The callback IS the payoff. */
  deskclear:{ back: "#4E4430", back2: "#2A2318", floor: "#5A4A32", floor2: "#332A1C",
              lip: "#836C46", key: "#F0C979", horizon: 524, grit: "#B49B72" },

  /* S8 — the star yard. EXTERIOR, deep violet, gold key. */
  stars:    { back: "#3A2860", back2: "#150E28", floor: "#32244E", floor2: "#140E24",
              lip: "#5E4488", key: "#F0C979", horizon: 610, grit: "#A98CC4" },

  /* S9 — the keyword plate. Near-black with one clay key. */
  cta:      { back: "#20242E", back2: "#0A0C12", floor: "#22262F", floor2: "#0B0D13",
              lip: "#3A414F", key: "#D97757", horizon: 560, grit: "#4E5666" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   MOTION HELPERS specific to this reel.
   ====================================================================== */

/** ⛔⛔ A TRAVELLING BAND MUST ALTERNATE **LIGHT AND SHADOW**.
    Reel 106's first attempt was light bands only: 7.79 AND the black point went
    47.4 -> 56.1, which is exactly the "fix it by lifting the shading" move the
    look gate exists to ban. Interleaving a DARK band between the light ones
    fixed both at once (9.92, black point back down) — every boundary becomes
    light-against-shadow, so more luma delta per swept pixel, and it is also just
    what raking light looks like. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; speed?: number; z?: number; o?: number; skew?: number }> =
  ({ f, y, h, x0 = -140, span = 1300, n = 8, c = "#FFFFFF", speed = 3.4, z = 22, o = 0.20, skew = -12 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = x0 + (((f * speed) + i * (span / n)) % span);
      const shadow = i % 2 === 1;
      return (
        <div key={"rk" + i} style={{ position: "absolute", left: x, top: y,
          width: span / n * 0.58, height: h, zIndex: z,
          transform: `skewX(${skew}deg)`,
          background: shadow ? `rgba(4,6,11,${Math.min(0.62, o * 1.55)})` : hexa(c, o) }} />
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

/** ⛔ `inter` is a FONT OBJECT (`inter.fontFamily`), not a function. These two
    helpers are the only way type is set in this file. */
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ⭐⭐⭐ THE REPO CARD — THE HERO ARTIFACT.

   [[feedback_real_marks_are_the_props]], the fifth lesson on reel 99:
   *"for any repo/tool/product reel, the most obvious object available is the
   thing itself, rendered as one card: the GitHub mark, owner/name, star count,
   licence — and the claim printed underneath on the same card. That single
   object is the whole sentence the VO is speaking."*

   It is settled and complete at frame 0, it BURSTS at S0 f10 (an object coming
   apart is an interrupt; a fade never is), and it RE-FORMS at S8 with the star
   count rolling up — which closes the loop the hook opened.

   `crack` 0..1 drives the shard throw; `stars` overrides the printed figure so
   S8's odometer can roll it.
   ====================================================================== */
export const RepoCard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  crack?: number; stars?: string; sub?: string; lit?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, crack = 0, stars, sub, lit = 1 }) => {
  const CW = 300 * s, CH = 214 * s;
  const shown = stars ?? R.stars;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      width: CW, height: CH, borderRadius: 18 * s,
      background: lit > 0.5 ? "#F7F5F0" : "#CFC9BC",
      border: `${4 * s}px solid ${lit > 0.5 ? "#E2D8C2" : "#B0A995"}`,
      boxShadow: SH_D, overflow: "hidden",
      opacity: 1 - crack * 0.9, transform: `scale(${1 + crack * 0.06})` }}>
      {/* ⛔⛔ THE HEADER STRIP USED TO BE `#181717` AND IT COST THE CLAIM PLATE.
          `look_audit` measures the largest CONTIGUOUS bright region at frame 0
          against an 18% bar; a black band across the card's top third split it in
          two and the whole plate read as 10.6% however big the card got. Painting
          the strip stone keeps the card one mass — and it still reads
          unmistakably as a repo card, because the GitHub mark is on its own white
          tile and the owner/name is set in mono. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 78 * s,
        background: "#E9E4D8", borderBottom: `${3 * s}px solid #CFC7B4`,
        display: "flex", alignItems: "center", gap: 14 * s, paddingLeft: 16 * s }}>
        <div style={{ width: 56 * s, height: 56 * s, borderRadius: 11 * s, background: "#FFFFFF",
          border: `${2 * s}px solid #D8D0BC`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/github.svg")}
            style={{ width: 44 * s, height: 44 * s, objectFit: "contain" }} />
        </div>
        <span style={{ ...mono(27 * s, 700), color: "#20242C", letterSpacing: 0.2 }}>
          {R.full}
        </span>
      </div>
      {/* the star row — a real receipt, big enough to read at a thumbnail */}
      <div style={{ position: "absolute", left: 18 * s, top: 100 * s, display: "flex",
        alignItems: "center", gap: 10 * s }}>
        <StarGlyph s={s * 1.5} c="#E7B24C" />
        <span style={{ ...mono(40 * s, 700), color: "#241F17" }}>{shown}</span>
      </div>
      {/* the licence chip and the claim line */}
      <div style={{ position: "absolute", left: 18 * s, top: 160 * s, display: "flex",
        alignItems: "center", gap: 10 * s }}>
        <div style={{ ...mono(19 * s, 700), color: "#3C6A52", background: "#DCEBE0",
          border: `${2 * s}px solid #B6D4C0`, borderRadius: 6 * s,
          padding: `${4 * s}px ${10 * s}px` }}>{R.license}</div>
        <span style={{ ...ui(16 * s, 800), color: "#5A5347", letterSpacing: 0.5,
          whiteSpace: "nowrap" }}>
          {sub ?? R.tagline}
        </span>
      </div>
      {/* the Claude mark, top right — the audience filter, never on a face */}
      <div style={{ position: "absolute", right: 14 * s, top: 100 * s, width: 62 * s,
        height: 62 * s, borderRadius: 14 * s, background: "#FFFFFF",
        border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
      </div>
    </div>
  );
};

/** the eight shards the card throws when it bursts, and pulls back in at S8.
    `k` 0..1 is OUTWARD; pass `inward` to run the same geometry backwards. */
export const CardShards: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  c?: string }> = ({ x, y, k, s = 1, z = 62, c = "#F7F5F0" }) => {
  if (k <= 0.001) return null;
  const CW = 300 * s, CH = 214 * s;
  return (<>
    {Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 + 0.4;
      const d = k * (470 + (i % 3) * 120) * s;
      const w2 = (70 + (i % 4) * 26) * s, h2 = (46 + (i % 3) * 22) * s;
      return (
        <div key={"sh" + i} style={{ position: "absolute",
          left: x + CW / 2 - w2 / 2 + Math.cos(a) * d,
          top: y + CH / 2 - h2 / 2 + Math.sin(a) * d * 0.62,
          width: w2, height: h2, zIndex: z,
          background: i % 3 === 0 ? "#4C5262" : c,
          border: `${3 * s}px solid ${i % 3 === 0 ? "#2A2E38" : "#E2D8C2"}`,
          borderRadius: 4 * s, opacity: Math.max(0, 1 - k * 0.72),
          transform: `rotate(${(i * 47) % 360 + k * 150}deg)` }} />
      );
    })}
  </>);
};

/** a real five-point star, drawn — not a glyph in a font that may not load */
export const StarGlyph: React.FC<{ s?: number; c?: string }> = ({ s = 1, c = "#E7B24C" }) => (
  <svg width={26 * s} height={26 * s} viewBox="0 0 24 24" style={{ display: "block" }}>
    <path fill={c} d="M12 2.2l2.95 6.28 6.85.9-5.02 4.73 1.28 6.79L12 17.6l-6.06 3.3 1.28-6.79L2.2 9.38l6.85-.9z" />
  </svg>
);

/* =========================================================================
   ⭐⭐ THE METER — THE VILLAIN. Your API bill, as a brass column with a needle
   track up its face and a hopper burning tokens into it.

   RULE: every task you run makes it climb. It is small at S0, absent S1-S4 (so
   it is never beaten off-screen), WINS a fourth time at S5, and LOSES EXACTLY
   ONCE — at S5 f52, driven by S6's mechanism. It is never beaten early.

   ⛔⛔ NO NUMERAL ON IT, EVER. The VO's "75%" is unsourced (see the header), so
   the track carries tick marks and lit segments and nothing written at all.
   The translation table's own answer for a percentage: *ten segments, four lit
   — no numeral anywhere.*
   ====================================================================== */
export const Meter: React.FC<{ x: number; y: number; f: number; lvl: number; s?: number;
  z?: number; hot?: number; burn?: number }> =
  ({ x, y, f, lvl, s = 1, z = 50, hot = 1, burn = 0 }) => {
  const CWID = 128 * s, CHGT = 430 * s, SEG = 10;
  const on = Math.round(lvl * SEG);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      {/* the hopper at the top — where tokens go in */}
      <div style={{ position: "absolute", left: -18 * s, top: -66 * s, width: CWID + 36 * s,
        height: 62 * s, background: "#6E5C38", borderRadius: 5 * s,
        border: `${3 * s}px solid #514328`,
        clipPath: "polygon(0 0, 100% 0, 82% 100%, 18% 100%)" }} />
      {burn > 0.02 && Array.from({ length: 5 }, (_, i) => {
        const ph = ((f * 2.4 + i * 17) % 44) / 44;
        return (
          <div key={"bn" + i} style={{ position: "absolute",
            left: 22 * s + i * 20 * s, top: -34 * s + ph * 42 * s,
            width: 13 * s, height: 13 * s, borderRadius: "50%",
            background: hexa("#F0A050", (1 - ph) * 0.85 * burn), zIndex: 2 }} />
        );
      })}
      {/* the brass column */}
      <div style={{ position: "absolute", left: 0, top: 0, width: CWID, height: CHGT,
        borderRadius: 6 * s, background: "linear-gradient(96deg, #8A7448 0%, #5E4E30 100%)",
        border: `${4 * s}px solid #493C24`, boxShadow: SH_D }} />
      {/* the ten segments, filling from the bottom. No numeral. */}
      {Array.from({ length: SEG }, (_, i) => {
        const litSeg = i < on;
        return (
          <div key={"sg" + i} style={{ position: "absolute", left: 16 * s,
            top: CHGT - 26 * s - i * ((CHGT - 44 * s) / SEG), width: CWID - 32 * s,
            height: (CHGT - 52 * s) / SEG - 5 * s, borderRadius: 3 * s,
            background: litSeg
              ? (i > 6 ? mxh("#C44A3A", 0.10 * hot) : "#D9B45C")
              : "#3E3320",
            border: `${2 * s}px solid ${litSeg ? "#F2E4B8" : "#2E2618"}` }} />
        );
      })}
      {/* the tick track and the needle — the thing that MOVES to its value */}
      <div style={{ position: "absolute", left: CWID + 8 * s, top: 12 * s, width: 7 * s,
        height: CHGT - 24 * s, background: "#3A3020", borderRadius: 3 * s }} />
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: CWID + 8 * s,
          top: 12 * s + i * ((CHGT - 24 * s) / 10), width: 22 * s, height: 3 * s,
          background: "#8E7A4E" }} />
      ))}
      <div style={{ position: "absolute", left: CWID - 6 * s,
        top: 12 * s + (1 - lvl) * (CHGT - 24 * s) - 9 * s,
        width: 54 * s, height: 18 * s, borderRadius: 3 * s,
        background: lvl > 0.55 ? "#E4643F" : "#8FD1A8",
        border: `${2 * s}px solid ${lvl > 0.55 ? "#8E3320" : "#3F7E5E"}` }} />
    </div>
  );
};


/* =========================================================================
   ⭐⭐⭐ THE BARBELL — the hook's one dominant object.

   Alex: *"the beginning hook scene needs to be completely reworked to be a lot
   more interesting... maybe just have one Claude sprite in the middle lifting
   weights, super hierarchical, to show that he's the most powerful."*

   The VO's line is *"the most powerful Claude tool on the planet"*, so the
   picture is a Claude pressing the heaviest thing in the room. What stops it
   being a borrowed gym is WHAT IS ON THE BAR: the plates are the repo itself,
   the GitHub mark on one and the Claude mark on the other, with the star count
   and the licence struck into the collar. Point at every object and say what it
   is — the barbell IS `ruvnet/ruflo`, and at 1.3s it comes apart into the swarm.

   ⛔⛔ IT IS ALSO THE CLAIM PLATE. `look_audit.HOOK_PLATE` measures the largest
   CONTIGUOUS bright region against an 18% bar, so the bar and both discs are one
   unbroken cream mass rather than two discs with a dark shaft between them —
   the same trap that cost the repo card 8 points last round.
   ====================================================================== */
export const Barbell: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  flex?: number; strain?: number; grow?: number }> =
  ({ x, y, f, s = 1, z = 60, flex = 0, strain = 0, grow = 0 }) => {
  /* ⛔⛔⛔ THE PROPORTIONS WERE THE REASON IT DID NOT READ, and they were not a
     taste call — they were a consequence of making this object carry both
     frame-0 gates. Measured on v3:
       plate 372px  = 47% of the panel HEIGHT and **113% of the lifter's body**
       a real 45cm plate against a 175cm lifter is **26%** of his height
       barbell overall 982px = **97% of the panel width** — no air on either side
     So it was 4.3x too big to read as a plate, and with nothing around it the
     BARBELL SILHOUETTE — a long shaft with a weight at each end and a person
     under it — never formed. On top of that the VALUE was backwards: a cream bar
     on a lit hall has no silhouette at all, where every readable reference image
     is a DARK bar against something brighter behind it.
     ⭐ Fixed by moving both gates onto the `MeetBoard` behind him, which frees
     this object to be the right size and the right colour: 152px plates on a
     560px shaft is 70% of the panel width with air on both sides, and it is CAST
     IRON against a cream board. */
  const D = 152 * s, BARW = (560 + grow) * s, BARH = 30 * s;
  const whip = (flex * 13 + strain * 6) * s;
  const bob = Math.sin(f / 4.2) * (1.4 + strain * 2.4) * s;
  const PLATES = [
    { logo: "logos/github.svg", stamp: `\u2605${R.stars}` },
    { logo: "claude_logo.png",  stamp: R.license },
  ];
  return (
    <div style={{ position: "absolute", left: x - BARW / 2, top: y, zIndex: z,
      transform: `rotate(${Math.sin(f / 5) * 1.1}deg) translateY(${bob}px)`,
      transformOrigin: "50% 50%" }}>
      {PLATES.map((pl, i) => {
        const cx = i === 0 ? -D * 0.52 : BARW - D * 0.48;
        const wob = Math.sin(f / 3.4 + i * 2.1) * (0.9 + strain * 1.8);
        return (
          <div key={"pl" + i} style={{ position: "absolute", left: cx,
            top: BARH / 2 - D / 2 + whip, width: D, height: D, borderRadius: "50%",
            /* CAST IRON. The rim is the bright part now — a steel band on a black
               plate — which is the right way round for a dark object. */
            background: "#22201C", border: `${9 * s}px solid #8E8674`,
            boxShadow: SH_D, transform: `rotate(${wob}deg)` }}>
            <div style={{ position: "absolute", inset: 13 * s, borderRadius: "50%",
              border: `${4 * s}px solid #4E4A40` }} />
            {/* six grip holes, cut through to the board behind */}
            {Array.from({ length: 6 }, (_, j) => {
              const a = (j / 6) * Math.PI * 2 + Math.PI / 6;
              const rr = (D / 2 - 9 * s) * 0.66;
              return (
                <div key={"gh" + j} style={{ position: "absolute",
                  left: D / 2 - 9 * s + Math.cos(a) * rr - 11 * s,
                  top: D / 2 - 9 * s + Math.sin(a) * rr - 11 * s,
                  width: 22 * s, height: 22 * s, borderRadius: "50%",
                  background: "#0E0D0B", border: `${2 * s}px solid #3A362E` }} />
              );
            })}
            {/* the hub, with the mark on a white tile — small, because on a real
                plate that is exactly how big the maker's mark is */}
            <div style={{ position: "absolute", left: D / 2 - 9 * s - 31 * s,
              top: D / 2 - 9 * s - 31 * s, width: 62 * s, height: 62 * s,
              borderRadius: "50%", background: "#FFFFFF",
              border: `${4 * s}px solid #9A9280`, display: "flex",
              alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(pl.logo)}
                style={{ width: 40 * s, height: 40 * s, objectFit: "contain" }} />
            </div>
          </div>
        );
      })}
      {/* the shaft — steel, drawn last so it bridges the two plates */}
      <div style={{ position: "absolute", left: 0, top: whip, width: BARW, height: BARH,
        borderRadius: BARH / 2, zIndex: 3,
        background: "linear-gradient(180deg, #C6BEAA 0%, #857D6C 100%)",
        border: `${3 * s}px solid #5E574A` }} />
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"kn" + i} style={{ position: "absolute", left: BARW * 0.16 + i * 15 * s,
          top: whip + 7 * s, width: 3 * s, height: BARH - 14 * s,
          background: "#6E6858", opacity: 0.9, zIndex: 4 }} />
      ))}
      {[D * 0.52, BARW - D * 0.48 - 20 * s].map((cxp, i) => (
        <div key={"co" + i} style={{ position: "absolute", left: cxp, top: whip - 9 * s,
          width: 20 * s, height: BARH + 18 * s, borderRadius: 4 * s,
          background: "#6E6858", border: `${3 * s}px solid #464034`, zIndex: 5 }} />
      ))}
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE MEET BOARD — the hook's claim plate, moved OFF the barbell.

   Both frame-0 gates (`HOOK_LUMA >= 140` and `HOOK_PLATE >= 18%` contiguous)
   used to be carried by the weights, which is what forced them to 4.3x their
   readable size and to a cream face they should never have had. A lifting hall
   has a big lit board on the wall behind the platform; putting the receipts
   there frees the barbell to be small, dark and correctly proportioned, and the
   dark bar silhouetted against this is what finally makes the image read.
   ====================================================================== */
export const MeetBoard: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  s?: number; z?: number }> = ({ x, y, w, h, f, s = 1, z = 24 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 10 * s, background: "#F2EBD6", border: `${9 * s}px solid #6E6250`,
    boxShadow: SH_D, overflow: "hidden" }}>
    {/* the board's own frame lights, so it is LIT rather than merely pale */}
    {Array.from({ length: 11 }, (_, i) => (
      <div key={"bl" + i} style={{ position: "absolute", left: 18 * s + i * (w - 40 * s) / 10,
        top: 10 * s, width: 22 * s, height: 22 * s, borderRadius: "50%",
        background: ((Math.floor(f / 7) + i) % 4) === 0 ? "#FFE9BC" : "#E4D8B4" }} />
    ))}
    {/* ⛔ THE CONTENT IS CENTRED, not left-aligned. The plates cross this board's
        left and right MARGINS on every frame of the lift — left-aligned copy put
        the GitHub tile underneath the near plate. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 56 * s, display: "flex",
      alignItems: "center", justifyContent: "center", gap: 22 * s }}>
      <div style={{ width: 110 * s, height: 110 * s, borderRadius: 20 * s,
        background: "#FFFFFF", border: `${4 * s}px solid #D8CDB2`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/github.svg")}
          style={{ width: 84 * s, height: 84 * s, objectFit: "contain" }} />
      </div>
      <div>
        <div style={{ ...mono(42 * s, 700), color: "#20242C" }}>{R.full}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 * s, marginTop: 8 * s }}>
          <StarGlyph s={1.9 * s} c="#E7B24C" />
          <span style={{ ...mono(46 * s, 700), color: "#20242C" }}>{R.stars}</span>
          <span style={{ ...mono(24 * s, 700), color: "#3C6A52", background: "#DCEBE0",
            border: `${2 * s}px solid #B6D4C0`, borderRadius: 6 * s,
            padding: `${3 * s}px ${10 * s}px`, marginLeft: 8 * s }}>{R.license}</span>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 20 * s,
      textAlign: "center", ...ui(23 * s, 800),
      color: "#6E6250", letterSpacing: 1.4 }}>{R.tagline}</div>
  </div>
);

/** the plate shards, thrown when the discs let go */
export const PlateShards: React.FC<{ x: number; y: number; k: number; s?: number; z?: number }> =
  ({ x, y, k, s = 1, z = 64 }) => {
  if (k <= 0.001) return null;
  return (<>
    {Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2 + 0.3;
      const d = k * (420 + (i % 4) * 110) * s;
      const w2 = (74 + (i % 3) * 34) * s, h2 = (52 + (i % 4) * 20) * s;
      const dark = i % 3 === 0;
      return (
        <div key={"ps" + i} style={{ position: "absolute",
          left: x + Math.cos(a) * d - w2 / 2, top: y + Math.sin(a) * d * 0.66 - h2 / 2,
          width: w2, height: h2, zIndex: z, borderRadius: 6 * s,
          background: dark ? "#3A3D48" : "#F7F2E4",
          border: `${4 * s}px solid ${dark ? "#20242C" : "#D8CDB2"}`,
          opacity: Math.max(0, 1 - k * 0.8),
          transform: `rotate(${(i * 53) % 360 + k * 240}deg)` }} />
      );
    })}
  </>);
};

/** ⭐⭐ THE LIFTER.

    ⛔ v1 of this scene tried to sell an overhead press with the bar simply
    floating above a normal standing mascot, and it read as a man STANDING UNDER
    two discs. The rig already solves it and I had not read it: `SlopKit.Mascot`
    draws **its own arms** — two 26x26 clay rects at x=8 and x=166 — and `cheer`
    both raises them (`armY = 86 - cheer*26`) and rotates them out by up to 28
    degrees. So `cheer` IS the arms-up pose, and it is a house prop rather than a
    hand-drawn limb.

    ⛔ The one thing the rig cannot do is reach OVERHEAD, because those arms sit
    beside the torso. The two FOREARMS below are the only drawn geometry, and
    they are not the reel-108 mistake: that was a limb hung off the body edge
    swinging at nothing, which read as a tail. These start ON the mascot's own
    arm rects and END on the bar, so they connect two objects that are both on
    screen and can only be read one way.

    `press` 0..1 is strain -> lockout. */
export const Lifter: React.FC<{ f: number; x: number; y: number; size: number; press: number;
  z?: number; strain?: number; barY?: number }> =
  ({ f, x, y, size, press, z = 70, strain = 0, barY }) => {
  const rise = press * size * 0.06;
  const stretch = 0.94 + press * 0.07;
  const tremble = Math.sin(f / 2.4) * strain * 4.6;
  const top = y - size * stretch - rise;
  /* the mascot's own arm rects, in panel space */
  const armY = top + size * ((86 - press * 26) / 200);
  const armX = [top ? x - size * 0.42 : 0, x + size * 0.30];
  return (<>
    {/* the forearms — clay, from his own arms up to the bar */}
    {barY !== undefined && [0, 1].map((i) => {
      const w = size * 0.135;
      const fx = i === 0 ? x - size * 0.40 : x + size * 0.265;
      const h = Math.max(0, armY - barY);
      return (
        <div key={"fa" + i} style={{ position: "absolute", left: fx, top: barY,
          width: w, height: h + w * 0.4, borderRadius: w * 0.18, zIndex: z - 1,
          background: "#D97757",
          transform: `rotate(${(i ? -1 : 1) * (5 - press * 4)}deg)`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: w * 0.42,
            borderRadius: w * 0.18, background: "#C4653F" }} />
        </div>
      );
    })}
    <div style={{ position: "absolute", left: x - size / 2, top, zIndex: z,
      transform: `rotate(${tremble * 0.4}deg) scaleY(${stretch})`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={size} nodAmp={1.6 + strain * 4} nodSpeed={3.5}
        stern={0.55 + strain * 0.45} cheer={0.55 + press * 0.45} constr={1} />
    </div>
    {/* ⭐⭐ STEAM OUT OF THE EARS. Alex asked for it by name and it is the right
        call: it is the one gag that says EFFORT with no narration, it reads at
        thumbnail size, and it gives the head — which is otherwise the stillest
        part of a pressing sprite — something continuously moving.
        Two jets, one per side, each on its own phase, drifting outward and up
        and fading as they expand. ⛔ Pale but not white: #E8E2D2 against a warm
        hall, so it reads as steam rather than as a hole in the picture. */}
    {[0, 1].map((side) => (
      <React.Fragment key={"st" + side}>
        {Array.from({ length: 9 }, (_, j) => {
          const ph = (((f * 2.9) + j * 10 + side * 7) % 46) / 46;
          const dir = side ? 1 : -1;
          const sz = (12 + ph * 40) * (0.55 + strain * 0.75);
          return (
            <div key={"sp" + j} style={{ position: "absolute",
              left: x + dir * (size * 0.30 + ph * size * 0.34) - sz / 2
                    + Math.sin(ph * 7 + j) * 7,
              top: top + size * 0.30 - ph * size * 0.30 - sz / 2,
              width: sz, height: sz, borderRadius: "50%", zIndex: z + 2,
              background: hexa("#EFEADC", (1 - ph) * 0.82 * (0.45 + strain * 0.55)) }} />
          );
        })}
      </React.Fragment>
    ))}
  </>);
};

/** the ONE text chip a shot is allowed. ⛔ Budget is ONE per shot, in a band
    nothing else enters. A chip LABELS; it never performs. */
export const Tag: React.FC<{ x: number; y: number; t: string; c?: string; s?: number;
  z?: number; mono?: boolean; o?: number }> =
  ({ x, y, t, c = "#F2EEE4", s = 1, z = 84, mono: m = true, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    padding: `${7 * s}px ${14 * s}px`, borderRadius: 7 * s,
    background: "rgba(12,14,20,0.80)", border: `${2 * s}px solid ${hexa(c, 0.42)}`,
    ...(m ? mono(19 * s) : ui(19 * s)), color: c,
    letterSpacing: m ? 0.4 : 0.8, whiteSpace: "nowrap" }}>{t}</div>
);

/* =========================================================================
   REAL MARKS ON WHITE TILES.
   ⛔ "Real marks wherever one exists, on white tiles, from public/logos/.
      A WRONG MARK IS WORSE THAN NO MARK." Every mark used by this reel was
      checked for the `fill=#ffffff` trap on build day and all are dark-filled.
   ====================================================================== */
export const LogoTile: React.FC<{ x: number; y: number; t: string; logo: string | null;
  s?: number; z?: number; on?: number }> =
  ({ x, y, t, logo, s = 1, z = 66, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 108 * s, height: 108 * s, borderRadius: 16 * s,
    background: on > 0.5 ? "#FFFFFF" : "#E6E2D8",
    border: `${3 * s}px solid ${on > 0.5 ? "#E8DCC0" : "#C8C2B4"}`,
    boxShadow: SH, opacity: 0.35 + on * 0.65,
    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
    {logo
      ? <Img src={staticFile(logo)} style={{ width: 68 * s, height: 68 * s, objectFit: "contain" }} />
      : <div style={{ ...ui(17 * s), color: "#2B2824", textAlign: "center",
          lineHeight: 1.05, padding: 4 * s }}>{t}</div>}
  </div>
);

/* =========================================================================
   ⭐⭐⭐ THE SIXTY. Five receding ranks: 5 / 8 / 12 / 16 / 19 = 60.

   ⛔ THE SPACING LAW IS ARITHMETIC, NOT TASTE. 18 sprites at s=148 across 600px
      is 120px of pitch for ~126px bodies — under `spacing >= 0.85*(rA+rB)` — and
      it rendered as one unreadable orange mass. Packing sixty at one size is
      that failure five times over. DEPTH is what makes sixty legible: the front
      rank is the readable cast at 190px pitch, and each rank behind is smaller,
      dimmer and higher, so the count reads as a CROWD rather than a texture.

   ⛔⛔ SPRITES NEED AN ACTION LOOP, NOT AN IDLE. Reel 107, measured, one change:
      failures 3/11 -> 1/11 and EVERY scene rose. Four loops chosen by index —
      0 PACE (walks with a stride lift) · 1 WORK (leans in, real swinging arm) ·
      2 HOP (jumps on a beat and cheers at the apex) · 3 LOOK (turns and
      double-takes) — each on its own phase and rate, so a crowd is doing four
      things at once rather than one animation played sixty times.

   ⛔ ALL TWELVE COSTUME LEVERS, CYCLED DETERMINISTICALLY (never random —
      re-renders must be identical). Reel 107 shipped four and was told so.
   ====================================================================== */
export const COSTUMES: Array<Record<string, number>> = [
  { glasses: 1 }, { suit: 1 }, { constr: 1 }, { prof: 1 }, { chef: 1 }, { wizard: 1 },
  { samurai: 1 }, { cop: 1 }, { beard: 1 }, { fro: 1 }, { girl: 1 }, { suit: 1, glasses: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/** the five ranks, back to front: [count, groundY, scale, opacity].
    ⛔⛔ THESE FIVE ROWS ARE ARITHMETIC, NOT TASTE, AND v1 GOT THEM WRONG. v1 put
    5 bodies of 213px across a 149px pitch and 19 bodies of 60px across a 45px
    pitch — every rank under `spacing >= 0.85 * (rA + rB)` — and it rendered as
    one unreadable orange mass, which is precisely the reel-107 blob failure at
    five times the scale. Recomputed against a 892px usable width, `pitch =
    892/(n+1)` and `size = 150 * scale`:

      n=19  pitch 44.6  size 51   0.85*51  = 43.4  OK
      n=16  pitch 52.5  size 62   0.85*62  = 52.3  OK
      n=12  pitch 68.6  size 80   0.85*80  = 67.6  OK
      n=8   pitch 99.1  size 113  0.85*113 = 95.6  OK
      n=5   pitch 148.7 size 168  0.85*168 = 142.8 OK

    The ranks still OVERLAP vertically, which is correct — a front rank occludes
    the rank behind's lower body. What must never overlap is HEADS. */
export const RANKS: Array<[number, number, number, number]> = [
  [19, 398, 0.34, 0.64],
  [16, 456, 0.41, 0.74],
  [12, 524, 0.53, 0.86],
  [8,  606, 0.75, 0.94],
  [5,  716, 1.12, 1.00],
];

/** ⭐ AND THE SECOND HALF OF WHY A CROWD READS: a VALUE ramp. Sixty bodies in
    one paint is a texture whatever the pitch is. Back ranks are painted in
    progressively darker clay so the crowd has depth in LIGHTNESS as well as in
    size — which is also the axis the greyscale motion audit can see. */
export const RANK_TINT: Array<string | undefined> = [
  "#7A4230", "#8F4E36", "#A85B3C", "#C4693F", undefined,
];

/** one Claude running one of the four action loops. Used by the swarm and by
    any scene that needs a worker doing a job rather than standing. */
export const Agent: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; o?: number; tint?: string; act?: number; lvl?: number }> =
  ({ f, x, y, i, size, z = 40, o = 1, tint, act, lvl = 0 }) => {
  const t = f * (0.86 + (i % 5) * 0.08) + i * 11;
  const a = act ?? i % 4;
  /* ⛔ an idle wobble has to be VISIBLE to count: 1.15deg / 1.7px measured as
     "never static" and READ as static. 2.6deg / 4.6px with a second slower
     harmonic is the amplitude that actually shows. */
  const pace = a === 0 ? Math.sin(t / 17) * size * 0.30 : 0;
  const stride = a === 0 ? Math.abs(Math.sin(t / 8.5)) * size * 0.07 : 0;
  const hopPh = (t + i * 7) % 48;
  const hop = a === 2 ? -Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * size * 0.22 : 0;
  const lean = a === 1 ? Math.sin(t / 8) * 15 : 0;
  const drive = a === 1 ? Math.abs(Math.sin(t / 8)) : 0;   /* feeds the nod */
  const look = a === 3 ? Math.sin(t / 11) * 1.1 : 0;
  const wob = Math.sin(t / 23 + i) * 2.6 + Math.sin(t / 41 + i * 0.7) * 1.4;
  return (
    <div style={{ position: "absolute", left: x + pace - size / 2, top: y - size - hop - stride,
      zIndex: z, opacity: o, transform: `rotate(${lean + wob * 0.35}deg)`,
      transformOrigin: "50% 96%" }}>
      {/* ⛔ v1 DREW ITS OWN ARM here — a clay bar hung off the body's right edge
          at 0.78 of its width, swinging on a pivot. On screen it read as a TAIL,
          on every sprite in the reel, and the fix is the same law as reel 108's
          `MascotLite`: **never hand-draw a limb onto the house mascot.** The WORK
          loop is now carried by the body lean and a faster, deeper nod, which is
          what the sprite already has. */}
      <Mascot lf={t} size={size} gaze={look}
        nodAmp={a === 1 ? 6.4 + drive * 3.2 : 4.2} nodSpeed={a === 1 ? 7 : 11}
        cheer={a === 2 ? Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * 0.7 : 0}
        tint={tint} {...(costumeFor(i) as any)} />
      {/* the level-up pips — "each one getting smarter every single run" */}
      {lvl > 0 && Array.from({ length: Math.min(4, lvl) }, (_, j) => (
        <div key={"lv" + j} style={{ position: "absolute", left: size * 0.20 + j * size * 0.19,
          top: -size * 0.20, width: size * 0.14, height: size * 0.14,
          background: "#8FD1A8", transform: "rotate(45deg)", zIndex: 3 }} />
      ))}
    </div>
  );
};
