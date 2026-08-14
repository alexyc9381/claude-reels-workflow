import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { Hall, Spot, dkh, mxh, idle } from "./AppWorld";
import { BackWall } from "./SeoWorld";

/* ===========================================================================
   REEL 104 · "PLUGIN" — THE WORLD KIT.  Board: storyboards/104-plugin.md.

   THE PLACE: **THE FITTING BAY** — a bright daytime service house where
   machines get modules fitted. Painted concrete with a yellow bay line, a steel
   bench with a lip, pegboard walls, a gantry rail, a roller door throwing one
   committed light direction.

   ⭐⭐ WHY THIS WORLD, AND WHY IT IS NOT A METAPHOR WORLD.
      [[feedback_real_marks_are_the_props]] has now rejected TWO worlds whose
      mappings were CORRECT — reel 99's waterworks and its tag-team fight —
      because every prop still had to be TRANSLATED before it meant anything,
      and the viewer does not do that work. The rule that came out of it: use
      the SUBJECT'S OWN OBJECTS.
      Here the subject's own object is free: **"plugin" is the product's own
      noun.** The audio says *plug in* and the picture shows a thing *being
      plugged in* — zero decode. Same free ride reel 103 got from Anthropic's
      own agent names and reel 100 got from Apple's real design tokens.

   ⛔⛔ THE BAR EVERY PROP IS HELD TO. Point at it and say what it IS. If the
      honest answer needs "stands for", it is cut. Every answer here is literal:

        the bay plate        -> Claude Code's plugin system, three empty slots
        a module             -> a plugin
        the capability bank  -> the VO's "only using about 40%" (no receipt)
        the key wall         -> 134+ free API keys across 40+ providers
        the three sockets    -> Cursor · Claude Code · Codex, the repo's own list
        the search beam      -> find-skills searching the open skills ecosystem
        the rank rail        -> "evaluates quality by install counts"
        the handed card      -> the REAL `npx skills add` you run yourself
        the press + wafer    -> claude-mem: captures, compresses, injects
        the tray rack        -> project / preferences / decisions, across chats

   ⛔ MATTE PALETTE, NOT NEON (REEL-BUILD-LEARNINGS §1). A reel about developer
      tooling is exactly the setup that pulls a build toward glowing terminals
      on black. There is NO glowing terminal here. Every lit surface is a solid
      matte paint; depth is a dark drop-shadow; contacts throw a SHAPED cone,
      never a full-frame tint. ⛔ No `0 0 Npx <colour>` anywhere in this reel.

   ⛔ `dark()`/`mix()` are HEX-IN, RGB-OUT and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh everywhere.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx, Hall, Spot, dkh, mxh, idle,
  BackWall };
export type { Place };

/* the house accents, matte — no neon, no coloured glow */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B";

/* this world's own materials — a service house, not an office */
export const STEEL = "#AFB7BE", STEELD = "#79818A", STEELL = "#D6DBE0";
export const CREAMP = "#F1EADA", CREAMD = "#D2C7AF", CREAML = "#FBF6EA";  /* the bay plate */
export const RUBBER = "#3A3D42", RUBBERL = "#565A61";
export const HAZARD = "#E0B341";                    /* the painted bay line */
export const COPPER = "#B4703F", COPPERL = "#D9975F";
export const PEG = "#C08C55", PEGD = "#8A6136";     /* the pegboard */
export const LAMPC = "#F4E7C6";
export const BOLT = "#F43E01";                      /* Groq's real brand orange */

/* =========================================================================
   THE THREE MODULES — every field below was read from the GitHub API on
   2026-08-13 (build day). ⛔ STARS CAME FROM THE API, NEVER FROM A BLOG: a
   syndicated article dated this month puts claude-mem at "46.1K" and the API
   says 90,651. That is the reel-99 rule paying out again.
   ⛔ `spoken` is what the VO calls it; `repo` is what is stencilled on the
      module. Both appear, so the viewer can join the two without being told.
   ====================================================================== */
export type Module = {
  id: string; spoken: string; repo: string; owner: string;
  stars: string; starsN: number; license: string; accent: string;
  /** the honest maker mark for THIS repo — never a provider it merely lists */
  mark: string;
};

export const MODULES: Module[] = [
  { id: "apis",  spoken: "AWESOME APIS", repo: "awesome-freellm-apis", owner: "open-free-llm-api",
    stars: "1,697",  starsN: 1697,  license: "MIT",        accent: "#5B8FC7",
    mark: "logos/github.svg" },
  { id: "skills", spoken: "FIND SKILLS", repo: "vercel-labs/skills",   owner: "vercel-labs",
    stars: "28,826", starsN: 28826, license: "MIT",        accent: "#D08A38",
    mark: "logos/vercel.svg" },
  { id: "mem",   spoken: "CLAUDE MEM",  repo: "claude-mem",            owner: "thedotmack",
    stars: "90,651", starsN: 90651, license: "APACHE-2.0", accent: "#7A5F9E",
    mark: "logos/github.svg" },
];
export const modOf = (id: string) => MODULES.find((m) => m.id === id)!;

/** the honest combined figure the peak spends its scale on */
export const TOTAL_STARS = "121,174";   /* 1,697 + 28,826 + 90,651, verified */

/* the repo's OWN description, verbatim — the source of every number in S2/S3.
   "134+ free LLM APIs & AI API keys from 40+ providers. Google Gemini,
    NVIDIA NIM, Groq, OpenRouter & more. One-click setup for Claude Code,
    Cursor and Codex."
   ⛔ The repo's front page ALSO says "431+ ... from 30 providers" — the two
      disagree INSIDE the repo. The VO says 134+ / 40+, which is the
      description, so that is what the picture prints. Audio and picture agree
      and both are the subject's own words. */
export const APIS = { n: "134+", providers: "40+", tier: "PERMANENT FREE TIER",
  card: "NO CREDIT CARD" };

/** the three tools the repo itself names for one-click setup */
export const TOOLS = [
  { t: "CURSOR",      logo: "logos/cursor.svg" },
  { t: "CLAUDE CODE", logo: "claude_logo.png" },
  { t: "CODEX",       logo: "logos/openai.png" },
];

/** the three real provider marks the VO names, on white tiles */
export const PROVIDERS = [
  { t: "GEMINI", logo: "logos/googlegemini.svg", tile: "#FFFFFF" },
  { t: "GROQ",   logo: "logos/groq.svg",         tile: "#FFFFFF" },
  { t: "NVIDIA", logo: "logos/nvidia.svg",       tile: "#FFFFFF" },
];

/** the real install command find-skills hands you. ⛔⛔ IT DOES NOT RUN ITSELF.
    find-skills searches and RECOMMENDS — it "identifies skills rather than
    automatically deploying them", and installing is this separate command. The
    VO says "finds and installs ... automatically"; the PICTURE stops at the
    edge by making this a card that is HANDED OVER and taken by hand. */
export const ADD_CMD = "npx skills add";

/** what claude-mem actually keeps, in the VO's own three words */
export const TRAYS = ["PROJECT", "PREFERENCES", "DECISIONS"];

/* one costume lever per sprite, never repeated ([[feedback_reel_vary_the_locations]]:
   the costume IS the theme). Nine scenes, nine levers. */
export const SPRITE_COSTUME: Record<string, Record<string, number | string>> = {
  hook:   { constr: 1 },                       /* the fitter, in the apron      */
  bank:   { stern: 1 },                        /* reading the dark bank         */
  vault:  { glasses: 1 },                      /* the key clerk                 */
  tags:   { glasses: 1, gaze: 0.6 },
  fit:    { constr: 1, cheer: 0.35 },          /* the fitter again, bay 1 lands */
  stacks: { prof: 1 },                         /* the librarian                 */
  press:  { chef: 1 },                         /* the press operator's whites   */
  trays:  { chef: 1, gaze: -0.5 },
  full:   { cheer: 1 },                        /* the peak                      */
  cta:    { suit: 1 },
};

/* =========================================================================
   THE PLACES — one per scene, each committing to its own HUE so every cut is a
   COLOUR change as well as a framing change ([[feedback_reel_vary_the_locations]]).

   ⛔⛔ THE STAGE IS MEASURED, NOT GUESSED. The panel is 1012x792; the root
      header pill owns y 0..112 and the slug owns y 730..792, so the working
      stage is **y 118..726** and a horizon belongs at 560..604.

   ⛔⛔ SATURATION, NOT BRIGHTNESS, IS WHAT FIXED "GRAY AND DULL" ON REEL 103.
      Five of its fifteen scenes measured under 0.22 mean saturation because
      three places had been built as desaturated blue-GRAYS sitting on the gray
      axis. Every place below COMMITS to a hue — ochre, petrol, indigo, clay,
      oxblood, forest — and none is a neutral. The house rule bans
      neon-on-black, not colour ([[feedback_reel_matte_palette]]).

   ⛔ THE BENCH RETURNS FOUR TIMES AND IS NEVER THE SAME SHOT OR THE SAME LIGHT.
      S0 is warm door-light close on the plate, S1 is the bank wall cold and
      low, S4 is the clay of the contacts firing, S8 is full daylight with the
      door open. A return to a set is a callback only if the object has changed
      state; otherwise it is the CALLBACK S1=S2 failure.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 · the bench, close on the plate. Warm ochre, hard roller-door daylight. */
  bench: { back: "#BE8F44", back2: "#8E6626", floor: "#D6A253", floor2: "#A87A34",
           lip: "#EBBE6E", key: LAMPC, horizon: 594, grit: "#BC8C42" },
  /* S1 · the same room from the bank wall. Petrol — cold, and the bank owns it. */
  bank:  { back: "#2B5F63", back2: "#14373A", floor: "#37787A", floor2: "#1F5053",
           lip: "#478C8E", key: "#CFE9E4", horizon: 580, grit: "#296066" },
  /* S2/S3 · the key vault. Indigo steel — a different room, not a re-light. */
  vault: { back: "#3A4A7C", back2: "#202C50", floor: "#485A92", floor2: "#2B3868",
           lip: "#5A6EA8", key: "#DCE2F5", horizon: 588, grit: "#364474" },
  /* S4 · bay one seats. Clay — the contacts' own colour, warmest so far. */
  fit:   { back: "#8A4E33", back2: "#552B18", floor: "#A96A44", floor2: "#7A4526",
           lip: "#C4835A", key: "#F6DCC4", horizon: 596, grit: "#8C5232" },
  /* S5 · the stacks. Oxblood shelving under one warm rake. */
  stacks:{ back: "#6B3138", back2: "#3E181D", floor: "#8A4A48", floor2: "#5E2E2E",
           lip: "#A15F58", key: "#F2D8A8", horizon: 570, grit: "#6E353A" },
  /* S6/S7 · the cold room. Forest green, low underlight, breath-cold. */
  cold:  { back: "#2A5C48", back2: "#143528", floor: "#377559", floor2: "#1F4C39",
           lip: "#478E6C", key: "#DCEFDF", horizon: 592, grit: "#2A6049" },
  /* S8 · the plate full, door open. Brightest and warmest frame in the reel —
     the peak must beat the hook and brightness is half of how it does that. */
  full:  { back: "#EFE3C6", back2: "#C9B590", floor: "#B08D5C", floor2: "#80653E",
           lip: "#C7A578", key: GOLD, horizon: 584, grit: "#B7986C" },
  /* S9 · the bench lip, close and low. */
  cta:   { back: "#A87F4C", back2: "#785832", floor: "#C79A5D", floor2: "#96723F",
           lip: "#DDB477", key: "#F3E2BB", horizon: 590, grit: "#A87D48" },
};

const WARM = ["bench", "fit", "stacks", "full", "cta"];
const COLD = ["bank", "vault", "cold"];
/* ⛔ HEX IN, HEX OUT — a Place field goes straight back into dkh/mxh. */
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.09), 2: (c) => mxh(c, 0.16), 3: (c) => dkh(c, 0.10),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = COLD.includes(key) ? COLD : WARM;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   THE BENCH — a steel service bench with a lip, and the thing every module
   lands on. Four depth planes on its own: the lip, the top, the apron, the legs.
   ====================================================================== */
export const Bench: React.FC<{ y: number; z?: number; depth?: number; s?: number }> =
  ({ y, z = 30, depth = 40, s = 1 }) => (<>
    {/* the apron under the top. ⛔ WAS dkh 0.34 -> 0.52 and it measured 79/255
        across the whole bottom band of frame 0, pulling the panel mean to
        exactly the 140 bar. Daylight through an open roller door does not make
        a near-black apron. */}
    <div style={{ position: "absolute", left: -60, right: -60, top: y, height: 190 * s,
      zIndex: z, background: `linear-gradient(180deg, ${dkh(STEEL, 0.10)} 0%, ${dkh(STEEL, 0.30)} 100%)` }} />
    {/* the top */}
    <div style={{ position: "absolute", left: -60, right: -60, top: y - depth * s, height: depth * s,
      zIndex: z + 1, background: `linear-gradient(178deg, ${mxh(STEEL, 0.22)} 0%, ${STEEL} 100%)`,
      boxShadow: SH_D }} />
    {/* the lip — the bright line that says "this is a working surface" */}
    <div style={{ position: "absolute", left: -60, right: -60, top: y - depth * s - 9 * s,
      height: 11 * s, zIndex: z + 2, background: STEELL }} />
    {/* the bolt row along the apron */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"bb" + i} style={{ position: "absolute", left: 34 + i * 118, top: y + 26 * s,
        width: 13 * s, height: 13 * s, borderRadius: "50%", zIndex: z + 3,
        background: dkh(STEEL, 0.30), border: `2px solid ${dkh(STEEL, 0.44)}` }} />
    ))}
  </>);

/* the painted hazard line on the floor — the bay's own marking, and the thing
   that tells you this is a place where machines get worked on */
export const BayLine: React.FC<{ y: number; z?: number; o?: number }> =
  ({ y, z = 18, o = 0.5 }) => (
  <div style={{ position: "absolute", left: -80, right: -80, top: y, height: 16, zIndex: z,
    opacity: o, background: `repeating-linear-gradient(74deg, ${HAZARD} 0 26px, ${dkh(HAZARD, 0.42)} 26px 52px)` }} />
);

/* =========================================================================
   THE PEGBOARD — the back wall of a service house. It is FURNITURE: it reads as
   texture at a glance and as real tools when the camera is close, and it never
   animates on its own.
   ====================================================================== */
export const Pegboard: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  seed?: number; o?: number }> = ({ x, y, w, h, z = 6, seed = 3, o = 1 }) => {
  const cols = Math.floor(w / 34), rows = Math.floor(h / 34);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      opacity: o, background: `linear-gradient(176deg, ${mxh(PEG, 0.10)} 0%, ${PEGD} 100%)`,
      borderRadius: 6, boxShadow: SH_D, overflow: "hidden" }}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <div key={"pg" + i} style={{ position: "absolute",
          left: 17 + (i % cols) * 34, top: 17 + Math.floor(i / cols) * 34,
          width: 7, height: 7, borderRadius: "50%", background: dkh(PEGD, 0.34) }} />
      ))}
      {/* hung tools — silhouettes, three shapes, deterministic placement */}
      {Array.from({ length: 7 }, (_, i) => {
        const cx = 40 + rnd(seed, i) * (w - 96), cy = 26 + rnd(seed + 9, i) * (h - 120);
        const kind = Math.floor(rnd(seed + 4, i) * 3);
        return (
          <div key={"tl" + i} style={{ position: "absolute", left: cx, top: cy, zIndex: 3 }}>
            {kind === 0 && <div style={{ width: 13, height: 84, borderRadius: 5, background: dkh(PEGD, 0.52) }} />}
            {kind === 1 && <div style={{ width: 58, height: 15, borderRadius: 7, background: dkh(PEGD, 0.48) }} />}
            {kind === 2 && <div style={{ width: 34, height: 34, borderRadius: "50%",
              border: `7px solid ${dkh(PEGD, 0.50)}` }} />}
          </div>
        );
      })}
    </div>
  );
};

/* the overhead gantry rail + its hanging chain. A background process that
   costs the hierarchy nothing — ⛔ every shot needs one so no scene is one hero
   doing one gesture ([[feedback_scene_needs_an_arc]]). */
export const Gantry: React.FC<{ y: number; f: number; z?: number; hookX?: number }> =
  ({ y, f, z = 8, hookX = 700 }) => {
  const sway = Math.sin(f / 47) * 2.4 + Math.sin(f / 23) * 0.9;   /* ≥2.6° combined */
  return (<>
    <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 22, zIndex: z,
      background: `linear-gradient(180deg, ${STEELD} 0%, ${dkh(STEELD, 0.40)} 100%)`, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: hookX, top: y + 22, zIndex: z + 1,
      transformOrigin: "50% 0%", transform: `rotate(${sway}deg)` }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: -6, top: i * 17, width: 12, height: 20,
          borderRadius: 6, border: `3px solid ${dkh(STEEL, 0.30)}` }} />
      ))}
      <div style={{ position: "absolute", left: -15, top: 104, width: 30, height: 34,
        borderRadius: "4px 4px 15px 15px", background: dkh(STEEL, 0.24), border: `3px solid ${dkh(STEEL, 0.44)}` }} />
    </div>
  </>);
};

/* =========================================================================
   A REAL MARK ON A WHITE TILE — the house lockup. ⛔ Dark marks (nvidia is near
   black, groq is a coloured square) must sit on WHITE or they vanish
   ([[reel-brand-logo-sourcing]]).
   ⛔ The per-scene contract in the board requires one of these at >= 96px in
      every scene, so this is the component that satisfies it.
   ====================================================================== */
export const Tile: React.FC<{ x: number; y: number; src: string; s?: number; z?: number;
  label?: string; rot?: number; pad?: number }> =
  ({ x, y, src, s = 110, z = 80, label, rot = 0, pad = 0.20 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: rot ? `rotate(${rot}deg)` : undefined, transformOrigin: "50% 0%" }}>
    <div style={{ width: s, height: s, borderRadius: s * 0.24, background: "#FFFFFF",
      border: `${Math.max(2, s * 0.03)}px solid ${CREAMD}`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(src)} style={{ width: s * (1 - pad), height: s * (1 - pad), objectFit: "contain" }} />
    </div>
    {label && (
      <div style={{ marginTop: 7, textAlign: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: s * 0.155, letterSpacing: "0.06em", color: CREAML,
        textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}>{label}</div>
    )}
  </div>
);

/* =========================================================================
   THE REPO PLATE — one module's receipt: owner/name, stars, licence. This is
   where a freeze-frame has to hold up, so every value comes from MODULES,
   which came from the API.
   ====================================================================== */
export const RepoPlate: React.FC<{ x: number; y: number; m: Module; s?: number; z?: number;
  showOwner?: boolean }> = ({ x, y, m, s = 1, z = 84, showOwner = true }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${11 * s}px ${18 * s}px`, borderRadius: 14 * s, background: CREAMP,
    border: `${3 * s}px solid ${CREAMD}`, boxShadow: SH, whiteSpace: "nowrap" }}>
    <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 25 * s, color: "#221E17",
      letterSpacing: "-0.01em" }}>
      {showOwner ? `${m.owner}/` : ""}<span style={{ fontWeight: 800 }}>{m.repo}</span>
    </div>
    <div style={{ display: "flex", gap: 10 * s, marginTop: 7 * s, alignItems: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
        color: "#3A3226" }}>★ {m.stars}</span>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s,
        letterSpacing: "0.06em", color: "#5B5142", background: mxh(CREAMD, 0.30),
        border: `2px solid ${CREAMD}`, borderRadius: 7 * s, padding: `${3 * s}px ${8 * s}px` }}>
        {m.license}
      </span>
    </div>
  </div>
);
