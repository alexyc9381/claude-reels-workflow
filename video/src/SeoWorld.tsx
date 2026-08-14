import React from "react";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { Hall, Spot, dkh, mxh, idle } from "./AppWorld";

/* ===========================================================================
   REEL 102 · "SEO" — THE WORLD KIT.  Board: storyboards/102-seo.md.

   THE PLACE: **THE NIGHT AUDIT** — a studio floor after hours where a website
   exists as PHYSICAL PAGES on a steel rack, a finding is a red flag pinned to
   one of them, and the plan is a numbered ladder on the wall.

   ⛔⛔ THE BAR THIS IS HELD TO ([[feedback_real_marks_are_the_props]] — two
      worlds rejected on reel 99 with CORRECT mappings): **point at each prop
      and say what it is.** If the honest answer needs the word "stands for",
      it is cut. Here every answer is literal:

        your website        -> twelve pages on a rack (a site IS a set of pages)
        an audit finding    -> a red flag pinned to the page it was found on
        the 18 agents       -> eighteen .md cards with their REAL filenames
        the action plan     -> a ladder with the rungs numbered 1..5
        Google's guidance   -> a printed guide, open, on the bench
        the repo            -> one card: mark, owner/name, stars, licence

   ⛔ DARKNESS IS FOR HIERARCHY, NOT MOOD ([[roles-reel]]: a cream room cannot
      rank things). But every LIT surface is paper-toned — there is no glowing
      terminal anywhere in this reel ([[feedback_reel_matte_palette]]).
   ⛔⛔ `dark()`/`mix()` are HEX-IN, RGB-OUT and do not nest. Use dkh/mxh.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx, Hall, Spot, dkh, mxh, idle };
export type { Place };

/* the house accents, matte — no neon, no coloured glow */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";

/* the world's own materials: steel rack, oak bench, cream paper */
export const OAK = "#A67F58", OAKD = "#75593B", OAKL = "#C0996E";
export const STEEL = "#9BA4AD", STEELD = "#5E666E", STEELL = "#C3CAD1";
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
export const CARD = "#F4EFE3", CARDD = "#D9D0BC", CARDL = "#FBF7EE";
export const TAGR = "#C8443A", TAGRD = "#8E2B24";
export const LAMPC = "#F2E3BC";

/* =========================================================================
   THE FIVE DOMAINS the VO actually names, each a real `/seo` sub-skill, each
   given one accent from the approved matte list so a colour on screen always
   means the same thing.
   ⛔ THE ORDER IS THE VO'S ORDER: technical, content, schema, geo, local.
   ====================================================================== */
export type Domain = { key: string; label: string; cmd: string; c: string; note: string };
export const DOMAINS: Domain[] = [
  { key: "technical", label: "TECHNICAL", cmd: "/seo technical", c: SKY,   note: "9 CATEGORIES" },
  { key: "content",   label: "CONTENT",   cmd: "/seo content",   c: CLAY,  note: "E-E-A-T" },
  { key: "schema",    label: "SCHEMA",    cmd: "/seo schema",    c: GOLD,  note: "SCHEMA.ORG" },
  { key: "geo",       label: "GEO",       cmd: "/seo geo",       c: GREEN, note: "AI OVERVIEWS" },
  { key: "local",     label: "LOCAL",     cmd: "/seo local",     c: RED,   note: "MAP PACK" },
];

/* =========================================================================
   THE EIGHTEEN AGENTS — the real filenames in `agents/` on the repo, read
   from the GitHub API on 2026-08-12. Not a representative sample, not
   invented: this is the directory listing, and it is exactly 18 long, which
   is the number the VO says.
   ⛔ WIDTH ARITHMETIC BEFORE THE BOX ([[apple-reel]] lesson 4): mono at
      weight 800 advances ~0.60em, and the longest name here is
      `seo-dataforseo.md` at 17 chars — 17 * 0.60 * 22px = 225px, so every
      chip that renders a full name is >= 260px inner and carries
      `textOverflow: ellipsis` + `minWidth: 0` so a future overflow degrades
      instead of leaking.
   ====================================================================== */
export const AGENTS: string[] = [
  "seo-technical.md", "seo-content.md", "seo-schema.md", "seo-geo.md",
  "seo-local.md", "seo-maps.md", "seo-backlinks.md", "seo-cluster.md",
  "seo-drift.md", "seo-ecommerce.md", "seo-flow.md", "seo-google.md",
  "seo-image-gen.md", "seo-performance.md", "seo-sitemap.md", "seo-sxo.md",
  "seo-visual.md", "seo-dataforseo.md",
];
export const AGENT_MAX = "seo-dataforseo.md";     // the width the boxes are sized to

/* which of the five named domains each agent belongs to, so eighteen stations
   still group into the five things the VO actually says out loud. */
export const AGENT_DOMAIN: Record<string, string> = {
  "seo-technical.md": "technical", "seo-performance.md": "technical",
  "seo-sitemap.md": "technical", "seo-visual.md": "technical",
  "seo-content.md": "content", "seo-cluster.md": "content",
  "seo-flow.md": "content", "seo-image-gen.md": "content",
  "seo-schema.md": "schema", "seo-drift.md": "schema", "seo-sxo.md": "schema",
  "seo-geo.md": "geo", "seo-google.md": "geo", "seo-backlinks.md": "geo",
  "seo-dataforseo.md": "geo",
  "seo-local.md": "local", "seo-maps.md": "local", "seo-ecommerce.md": "local",
};

/* =========================================================================
   THE COSTUMES — ⛔ EIGHTEEN IDENTICAL SPRITES IS A TEXTURE, NOT A ROSTER.
   v1 drew all 18 stations with `glasses={1}` and the main sprite in the same
   glasses for all ten scenes, which throws away the one thing that makes a
   crowd of Claudes readable as SPECIALISTS rather than as wallpaper.

   Each costume below is chosen from what the agent actually DOES, so the
   picture teaches the roster instead of just counting it: the technical agent
   wears a hard hat, the backlinks agent is a detective, the cluster agent
   ranks things so it wears the judge's collar, the image agent is a painter.
   `tint` gives a second axis where two roles want the same hat.
   ====================================================================== */
export type Costume = Record<string, number | string>;

export const AGENT_COSTUME: Record<string, Costume> = {
  "seo-technical.md":  { hardHat: 1 },                  // structural work
  "seo-content.md":    { beret: 1 },                    // the writer
  "seo-schema.md":     { glasses: 1 },                  // structured data
  "seo-geo.md":        { brainHat: 1 },                 // AI search
  "seo-local.md":      { capBack: 1 },                  // on the street
  "seo-maps.md":       { hiVis: 1 },                    // field surveyor
  "seo-backlinks.md":  { sherlock: 1 },                 // follows the trail
  "seo-cluster.md":    { judge: 1 },                    // groups and ranks
  "seo-drift.md":      { earpiece: 1 },                 // monitoring
  "seo-ecommerce.md":  { suit: 1 },                     // commerce
  "seo-flow.md":       { bowtie: 1 },
  "seo-google.md":     { freshEyes: 1 },
  "seo-image-gen.md":  { paint: 1 },                    // makes pictures
  "seo-performance.md":{ shades: 1 },                   // speed
  "seo-sitemap.md":    { wizard: 1 },                   // maps the whole site
  "seo-sxo.md":        { wrapShades: 1 },
  "seo-visual.md":     { glasses: 1, tint: "#C4708E" }, // second axis: tint
  "seo-dataforseo.md": { brainHat: 1, tint: "#5AA0DE" },
};

/* ⛔⛔ EVERY CLAUDE IN THE REEL WEARS SOMETHING NOBODY ELSE WEARS. v1 set a
   costume per SCENE, which still left duplicates once a scene held more than
   one sprite — S0 alone ran the glass-holder, the bench Claude and the site's
   own illustration, two of them in the same glasses. Alex: *"each of the
   claudes in each scene need to be different outfit each time differing."*
   So the table is now keyed per SPRITE, not per scene, and every entry below
   uses a lever no other entry uses. 13 sprites, 13 distinct levers.
   ⭐ Where the job suggests the costume, it takes it: the Claude holding the
   magnifier is the DETECTIVE, the one at the ranked plan wears the judge's
   collar, and the one who has been marking pages up by hand all night is
   covered in paint. */
export const SPRITE_COSTUME: Record<string, Costume> = {
  hookHolder: { sherlock: 1 },     // S0-A · holds the glass. A detective, obviously.
  hookBench:  { hardHat: 1 },      // S0-A · second Claude, at the bench
  sitePage:   { beret: 1, tint: "#C4708E" },  // the SITE's own illustration — not one of ours
  install:    { earpiece: 1 },     // S0-C · running the console
  site:       { freshEyes: 1 },    // S0-D · first look at the score
  sweep:      { hiVis: 1 },        // S1 · out on the rack
  geo:        { capBack: 1 },      // S2 · AI answers + the map pack
  plan:       { judge: 1 },        // S3 · ranking the findings
  fix:        { bowtie: 1 },       // S4 · generating the markup
  source:     { brainHat: 1 },     // S6 · reading the primary source
  villain:    { paint: 1 },        // S7 · has been marking pages by hand all night
  peak:       { shades: 1 },       // S8 · the payoff
  cta:        { suit: 1 },         // S9 · handing the guide over
};

/* kept as an index so scene code can stay positional where it reads better */
export const SCENE_COSTUME: Costume[] = [
  SPRITE_COSTUME.hookHolder, SPRITE_COSTUME.sweep, SPRITE_COSTUME.geo,
  SPRITE_COSTUME.plan, SPRITE_COSTUME.fix, { suit: 1, bowtie: 1 },
  SPRITE_COSTUME.source, SPRITE_COSTUME.villain, SPRITE_COSTUME.peak,
  SPRITE_COSTUME.cta,
];


/** the short form for a tight box — `seo-` is on every one of them and carries
    no information the set does not already give (the rack banner says SEO). */
export const shortAgent = (n: string) => n.replace(/^seo-/, "").replace(/\.md$/, "");

/* the repo's own receipts — every one verified against the GitHub API and the
   README on 2026-08-12. Nothing here is estimated. */
export const REPO = {
  owner: "AgriciDaniel", name: "claude-seo", full: "AgriciDaniel/claude-seo",
  stars: "14,028", licence: "MIT", lang: "Python",
  skills: 25, agents: 18, tests: "410 TESTS", parallel: "UP TO 15 IN PARALLEL",
  site: "example.com",                    // the repo's OWN documented example URL
  cmd: "/seo audit https://example.com",
  guide: "AI OPTIMIZATION GUIDE",
  guideSrc: "developers.google.com",
} as const;

/* the finding classes the audit actually emits, used as the labels on the
   flags pinned to the rack. ⛔ These are real check names from the sub-skills
   (technical, content, schema, geo, local), not invented copy — a made-up
   string on a receipt-shaped object is the most believable kind of wrong. */
export const FINDINGS: [string, number][] = [
  ["MISSING H1", 0], ["NO SCHEMA", 2], ["THIN CONTENT", 1], ["NOINDEX", 0],
  ["SLOW LCP", 0], ["NO ALT TEXT", 1], ["DUPE TITLE", 1], ["NO CANONICAL", 0],
  ["NOT CITABLE", 3], ["NO NAP MATCH", 4], ["NO HREFLANG", 0], ["ORPHAN PAGE", 0],
];

/* =========================================================================
   THE PLAN — the hero artifact. Five rungs, in dependency order, each one a
   real finding class the matching sub-skill actually emits. The ORDER is the
   thing the VO sells ("and what order") and no other SEO reel shows it.
   ⛔ These are finding CLASSES, not results for a real site: the site on the
      rack is `example.com`, the repo's own example URL, so nothing here is a
      claim about anyone's numbers.
   ====================================================================== */
export const PLAN: { n: number; t: string; d: Domain }[] = [
  { n: 1, t: "INDEXABLE",   d: DOMAINS[0] },
  { n: 2, t: "TITLES + H1", d: DOMAINS[1] },
  { n: 3, t: "SCHEMA",      d: DOMAINS[2] },
  { n: 4, t: "CITABILITY",  d: DOMAINS[3] },
  { n: 5, t: "MAP PACK",    d: DOMAINS[4] },
];

/* =========================================================================
   THE PLACES — one per scene, each its own palette so every cut is a COLOUR
   change as well as a framing change ([[feedback_reel_vary_the_locations]]).

   ⛔⛔ HORIZONS ARE DERIVED FROM THE MEASURED STAGE, NOT GUESSED. The panel is
      1012x792; the root header pill owns y 0..112 and the slug owns y 730..792,
      so the working stage is y 118..726 and a horizon belongs at 560..604.
      Reel 100 v1 authored to guesses and shipped four scenes with a dead
      bottom third and a hero cropped off-panel.
   ====================================================================== */
/* ⛔⛔ THE FIRST BUILD OF THIS TABLE WAS TOO DARK ACROSS THE BOARD AND THE
   MEASUREMENT CAUGHT IT: the hook panel came in at 109.9 mean luma against
   docs/THE-OPEN.md's >= 140 bar, and six of thirteen sampled frames sat under
   118. The cause is the exact instinct REEL-BUILD-LEARNINGS §1 names — the
   subject is technological, so a dark room "feels right", and then every
   accent has to fight to be seen. Darkness here is only paid for where it does
   RANKING work: `night` (the villain) and the contrast into `lit` (the peak).
   Every other place is a warm PAINTED INTERIOR at a real working level.
   ⭐ On the hook that fix and the brief pointed the same way: the rack behind
   the card is twelve cream pages, so bringing it back up restored the world
   AND supplied the luma, in one move. */
export const PLACES: Record<string, Place> = {
  /* S0 · the hook. A lit studio floor: the card owns the frame, but the room
     is genuinely there behind it rather than swallowed by black. */
  open:  { back: "#6C7885", back2: "#4A5661", floor: "#7A8794", floor2: "#525D68",
           lip: "#8794A0", key: LAMPC, horizon: 600, grit: "#68747F" },
  /* S1 · the rack, seen whole for the first time. Cool steel, high key. */
  rack:  { back: "#63727F", back2: "#44515D", floor: "#6F7D8A", floor2: "#4B5762",
           lip: "#7A8792", key: "#C6D8E4", horizon: 578, grit: "#5F6D79" },
  /* S2 · the bench corner. Warmer, tighter, a different room entirely. */
  corner:{ back: "#7A6B5A", back2: "#4E4136", floor: OAK, floor2: OAKD,
           lip: "#B08E62", key: "#EFD3A0", horizon: 596, grit: "#8C7355" },
  /* S3 · the plan wall. Hard top light, the cleanest frame in the reel. */
  wall:  { back: "#5D6975", back2: "#3B4651", floor: "#6B7784", floor2: "#46505A",
           lip: "#75818D", key: "#F4E8C8", horizon: 604, grit: "#5A6672" },
  /* S4 · the fix bench. Tight warm lamp pool, paper white. */
  fix:   { back: "#6B5A49", back2: "#413428", floor: "#96704E", floor2: "#6A4C36",
           lip: "#A07850", key: GOLD, horizon: 600, grit: "#7C5C40" },
  /* S5 · the lamp rail end-on. Eighteen lamps ON, so this is the second
     brightest wide in the reel — it has to EARN the word "at once". */
  rail:  { back: "#66757F", back2: "#47535E", floor: "#71808A", floor2: "#4E5A64",
           lip: "#7C8B95", key: "#DCE9F2", horizon: 566, grit: "#62717B" },
  /* S6 · the plate press. The darkest of the WORKING scenes (the villain is
     darker still), so a struck plate reads as the event. */
  press: { back: "#6A5A48", back2: "#443626", floor: "#8A6242", floor2: "#5E4230",
           lip: "#7E664C", key: BRASS, horizon: 604, grit: "#6A543E" },
  /* S7 · the villain. One lamp, everything else dead. Lowest luma, on purpose. */
  night: { back: "#2A323A", back2: "#12171B", floor: "#333C44", floor2: "#191F24",
           lip: "#3C454D", key: "#D9C79C", horizon: 578, grit: "#39424A" },
  /* S8/S9 · the full rig. Warm, bright, every lamp on. Brightest in the reel. */
  lit:   { back: "#EDE2C8", back2: "#C6B492", floor: "#A8895E", floor2: "#7A6240",
           lip: "#BE9E73", key: GOLD, horizon: 586, grit: "#B2936A" },
};

const WARM = ["corner", "fix", "press", "lit"];
const COLD = ["open", "rack", "wall", "rail", "night"];
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
   THE LAMP — the single most important object in this world, because the
   villain's whole rule is "it can only light one page at a time" and the
   payoff is eighteen of them striking at once.
   ⛔ The cone is a SHAPED gradient, never a full-frame tint (reel 78's third
      rejected draft flooded the frame and made the motion metric look good for
      the wrong reason).
   ====================================================================== */
export const Lamp: React.FC<{ x: number; y: number; on: number; s?: number; z?: number;
  f?: number; len?: number; spread?: number; c?: string }> =
  ({ x, y, on, s = 1, z = 30, f = 0, len = 300, spread = 210, c = LAMPC }) => {
  /* the filament breathes a little when lit — a ceiling'd idle, <= 0.05 opacity */
  const live = on > 0.04 ? 1 + Math.sin(f / 37 + x) * 0.045 : 1;
  return (<>
    {/* stem + shade, drawn as a real object so the silhouette is nameable */}
    <div style={{ position: "absolute", left: x - 2 * s, top: y, width: 4 * s, height: 26 * s,
      background: "#2B3037", zIndex: z }} />
    <div style={{ position: "absolute", left: x - 25 * s, top: y + 22 * s,
      width: 50 * s, height: 26 * s, borderRadius: `${5 * s}px ${5 * s}px ${19 * s}px ${19 * s}px`,
      background: on > 0.04 ? "#48505A" : "#343A42", zIndex: z, boxShadow: SH_D }} />
    {/* the bulb face */}
    <div style={{ position: "absolute", left: x - 17 * s, top: y + 45 * s,
      width: 34 * s, height: 7 * s, borderRadius: `0 0 ${15 * s}px ${15 * s}px`,
      background: on > 0.04 ? c : "#3A3F46", opacity: on > 0.04 ? (0.42 + on * 0.58) * live : 1,
      zIndex: z + 1 }} />
    {on > 0.04 && (
      <Beam x={x} y={y + 51 * s} top={40 * s} bot={spread * s} len={len * s} c={c}
        o={0.26 * on} z={z - 9} f={f} />
    )}
  </>);
};

/* =========================================================================
   THE RACK UPRIGHT — the foreground occluder this world owns. Without one the
   camera is looking at a backdrop rather than standing in a room.
   ====================================================================== */
export const RackEdge: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  top?: number }> = ({ side = "l", c = STEELD, w: ww = 74, z = 92, top = -40 }) => {
  const L = side === "l";
  return (
    <div style={{ position: "absolute", top, bottom: -40, width: ww, zIndex: z,
      [L ? "left" : "right"]: -16, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "right" : "left"]: 0,
        width: 10, background: mxh(c, 0.22) }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "left" : "right"]: 0,
        width: 18, background: dkh(c, 0.30) }} />
      {/* bolt holes down the upright — the detail that makes it steel */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"bh" + i} style={{ position: "absolute", left: ww / 2 - 5, top: 40 + i * 118,
          width: 10, height: 10, borderRadius: 5, background: dkh(c, 0.44) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE BENCH — the oak surface the guide, the press and the flag box sit on.
   A real top face in perspective, because a flat slab reads as a sheet of
   paper rather than a solid ([[apple-reel]] lesson 2).
   ====================================================================== */
export const Bench: React.FC<{ y: number; z?: number; depth?: number; c?: string;
  x0?: number; x1?: number }> =
  ({ y, z = 40, depth = 30, c = OAK, x0 = -60, x1 = W + 60 }) => (<>
    {/* the top face, lighter, receding */}
    <div style={{ position: "absolute", left: x0 + 26, right: W - x1 + 26, top: y - depth,
      height: depth, background: mxh(c, 0.16), zIndex: z,
      clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)" }} />
    {/* the front edge */}
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y, height: 22,
      background: c, zIndex: z + 1, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y + 22, height: 8,
      background: dkh(c, 0.28), zIndex: z + 1 }} />
    {/* the apron below */}
    <div style={{ position: "absolute", left: x0, right: W - x1, top: y + 30, height: 150,
      background: dkh(c, 0.44), zIndex: z }} />
  </>);

/* =========================================================================
   THE BACK WALL — ⛔⛔ EVERY SCENE HAD THE SAME WALL IN A DIFFERENT COLOUR.
   `Hall` draws wall + wash + floor + skirting + boards + pool, and that is the
   whole background of all ten scenes; the per-scene `Place` changes the PAINT
   but never the STRUCTURE, so the reel reads as one room re-lit ten times.
   Alex: *"diff backgrounds more interesting etc."*

   Each treatment below is real architecture a working building would have, and
   each is a different SHAPE, so the eye registers a new place at every cut:

     girder   · a steel truss with rivets            (the hook, a workshop)
     pegboard · a punched board of tool holes        (the rack room)
     window   · tall panes onto the night            (the corner, AI + maps)
     tile     · a large-format tiled wall            (the plan wall)
     panel    · vertical wainscot with a chair rail  (the fix bench)
     slat     · a horizontal slatted wall            (the agent rail)
     shelf    · deep shelving carrying boxes         (the press room)
     brick    · staggered courses                    (the villain, after hours)

   ⛔ ALL OF IT IS FURNITURE. Held to low contrast against its own wall and
      drawn at z=2, under everything, so it can never compete for rank
      ([[reel-motion-hierarchy]]) — the note was "more interesting backgrounds",
      not "more things to look at".
   ====================================================================== */
export const BackWall: React.FC<{ kind: string; p: Place; f?: number; o?: number }> =
  ({ kind, p, f = 0, o = 1 }) => {
  const hz = p.horizon;
  const L = mxh(p.back, 0.13), D2 = dkh(p.back, 0.16), D3 = dkh(p.back, 0.28);
  const box = (k: string, s: React.CSSProperties) =>
    <div key={k} style={{ position: "absolute", zIndex: 2, ...s }} />;
  const K: Record<string, React.ReactNode> = {
    girder: (<>
      {box("gt", { left: -20, right: -20, top: 132, height: 22, background: D3 })}
      {box("gb", { left: -20, right: -20, top: 246, height: 22, background: D3 })}
      {Array.from({ length: 9 }, (_, i) =>
        box("gd" + i, { left: -10 + i * 122, top: 150, width: 18, height: 98,
          background: D2, transform: `skewX(${i % 2 ? 26 : -26}deg)` }))}
      {Array.from({ length: 10 }, (_, i) =>
        box("gr" + i, { left: 6 + i * 110, top: 138, width: 9, height: 9,
          borderRadius: 5, background: L }))}
    </>),
    pegboard: (<>
      {box("pb", { left: -20, right: -20, top: 118, height: hz - 138, background: D2 })}
      {Array.from({ length: 132 }, (_, i) =>
        box("ph" + i, { left: 18 + (i % 22) * 46, top: 140 + Math.floor(i / 22) * 46,
          width: 11, height: 11, borderRadius: 6, background: D3 }))}
    </>),
    window: (<>
      {[0, 1, 2].map((w) => (
        <React.Fragment key={"wf" + w}>
          {box("wo" + w, { left: 44 + w * 336, top: 128, width: 250, height: 316,
            background: dkh(p.back2, 0.34), border: `12px solid ${D3}`, borderRadius: 6 })}
          {box("wv" + w, { left: 163 + w * 336, top: 128, width: 10, height: 316,
            background: D3 })}
          {box("wh" + w, { left: 44 + w * 336, top: 278, width: 250, height: 10,
            background: D3 })}
          {/* a few lit windows across the way, so the night has depth */}
          {box("wl" + w, { left: 66 + w * 336, top: 152, width: 74, height: 52,
            background: mxh(p.key, 0.30), opacity: 0.22 + Math.sin(f / 71 + w) * 0.04 })}
        </React.Fragment>))}
    </>),
    tile: (<>
      {Array.from({ length: 24 }, (_, i) =>
        box("tl" + i, { left: -14 + (i % 6) * 176, top: 118 + Math.floor(i / 6) * 122,
          width: 168, height: 114, background: i % 2 ? D2 : L, opacity: 0.5,
          borderRadius: 3 }))}
    </>),
    panel: (<>
      {Array.from({ length: 9 }, (_, i) =>
        box("pn" + i, { left: -8 + i * 118, top: 118, width: 104, height: hz - 138,
          background: D2, borderRadius: 5, border: `4px solid ${D3}` }))}
      {box("pr", { left: -20, right: -20, top: hz - 116, height: 16, background: D3 })}
    </>),
    slat: (<>
      {Array.from({ length: 11 }, (_, i) =>
        box("sl" + i, { left: -20, right: -20, top: 124 + i * 44, height: 26,
          background: i % 2 ? D2 : D3, opacity: 0.62 }))}
    </>),
    shelf: (<>
      {[0, 1, 2].map((r) => (
        <React.Fragment key={"sh" + r}>
          {box("sb" + r, { left: -20, right: -20, top: 168 + r * 132, height: 13,
            background: D3 })}
          {Array.from({ length: 6 }, (_, i) =>
            box("sx" + r + i, { left: 12 + i * 172, top: 168 + r * 132 - (56 + (i % 3) * 18),
              width: 132, height: 56 + (i % 3) * 18, background: i % 2 ? D2 : L,
              opacity: 0.55, borderRadius: 4 }))}
        </React.Fragment>))}
    </>),
    brick: (<>
      {Array.from({ length: 84 }, (_, i) => {
        const r = Math.floor(i / 7);
        return box("bk" + i, { left: -40 + (i % 7) * 156 + (r % 2 ? 78 : 0), top: 120 + r * 46,
          width: 146, height: 36, background: r % 3 === 1 ? D2 : D3, opacity: 0.5,
          borderRadius: 3 });
      })}
    </>),
  };
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.55 * o,
      overflow: "hidden", pointerEvents: "none" }}>
      {K[kind] ?? null}
    </div>
  );
};
