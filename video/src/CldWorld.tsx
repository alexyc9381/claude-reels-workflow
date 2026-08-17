import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 107 · "CLAUDE" — THE WORLD KIT.  Board: storyboards/107-claude.md.

   THE PLACE: **THE WORKROOM.** Two identical Claude desks at night. One has the
   three free things on it and has been producing work all night. The other is
   yours and it is bare. The reel is your desk becoming the other one.

   ⛔⛔ THE STAIRCASE VERSION OF THIS WORLD IS DEAD, AND NOT ON TASTE.
      Draft 1 made the three resources the TREADS of a staircase. The mapping is
      perfect. It is also the exact trap `SklHooks.tsx` (reel 106, round 3)
      records rejecting BY NAME: *"my second was a staircase, an hourglass and a
      door — those are the exact trap [[feedback_real_marks_are_the_props]]
      documents: CORRECT MAPPINGS THE VIEWER HAS TO TRANSLATE. Four worlds
      across reels 99/104 were rejected for it."* Five builds have now been lost
      to "my mapping is correct so it is fine". A door is out for the same
      reason.

   ⭐ WHAT SHIPPED ON 99 AFTER FOUR REJECTIONS, and what this world does instead:
      **the most obvious object available is the thing itself, rendered as one
      card** — GitHub mark, owner/name, ★count, the claim under it. It needs no
      decoding, it carries the receipt, and it is the brightest thing in frame.
      So there is NO symbolic layer left here at all:

        the loaded desk        ->  someone using Claude fully
        the bare desk          ->  you, right now
        the 22-card board      ->  Anthropic Academy · 22 COURSES · $0
        the seated cartridge   ->  anthropics/skills · ★169,585
        the tile wall          ->  awesome-claude-code-subagents · ★24,350 · 100+
        his tray filling and yours staying empty
                               ->  "you're probably falling behind"
        the same three landing on YOUR desk
                               ->  "it's not too late to catch up"

      ⭐ Two IDENTICAL desks is what makes the comparison honest: it is the same
      object drawn twice, which is the 4-token-vs-800M-token-pile trick — a
      comparison PROVED rather than asserted.

   ⛔⛔ THE HONESTY LINE (board §0, all read live 2026-08-15):
      1. **Dario Amodei really did warn about this.** Essay "The Adolescence of
         Technology" (Jan 2026): wealth concentration could EXCEED the Gilded
         Age, fortunes "well into the trillions". ⛔ The frame may show the
         ESSAY TITLE ONLY — no invented quote, no quotation marks, no portrait.
      2. **Anthropic Academy is real and free** — anthropic.skilljar.com, 22
         courses counted on the catalogue on build day. Course titles drawn
         here are REAL titles from it.
      3. **anthropics/skills is real** — ★169,585, and it genuinely installs as
         a Claude Code plugin marketplace. "OFFICIAL" is earned (Anthropic's own
         org) and appears nowhere else in the reel.
      4. **VoltAgent/awesome-claude-code-subagents is real** — ★24,350, and its
         own description says "100+". ⛔ `100+`, NEVER a fake exact count: a
         made-up number on a receipt-shaped object is the most believable kind
         of wrong (the reel-99 ledger).
      5. "cheat codes" / "apps" are the VO's ANALOGIES. They drive the VERB
         (a cartridge seats, tiles dock) and are never typeset as product names.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B";

/** ⛔ GREPPABLE INTENT GUARD (board §0). None of these is a real thing. If a
    later pass wants to typeset one as product UI, it is wrong. */
export const CLAIM_LABELS_BANNED = ["Cheat Code", "Cheat Codes", "App Store",
  "Claude Store", "Official Plugin Store", "Anthropic App Store"] as const;

/* ---- THE RECEIPTS. One place, so no scene can invent a number. ----------- */
export const R1 = { name: "ANTHROPIC ACADEMY", n: "22", unit: "COURSES", price: "$0" };
export const R2 = { repo: "anthropics/skills", stars: "169,585", tag: "OFFICIAL" };
export const R3 = { repo: "awesome-claude-code-subagents", owner: "VoltAgent",
                    stars: "24,350", n: "100+" };
/** ⭐⭐ THE THREE RESOURCES EACH HAVE ONE COLOUR, AND IT IS THEIR IDENTITY.
    Alex: *"we see these things as like blue, yellow, then green but then
    afterwards we see them as plain cream colored — when they should be these
    colored"*. The handover at 9s introduced them in three colours and then every
    later scene drew the same objects in default cream, so the viewer loses track
    of which of the three they are looking at. These constants are now the ONLY
    source, used in S1's handover and in each item's own scenes. */
export const C1 = "#7FC0C9";   /* ANTHROPIC ACADEMY  · teal  · S1, S2, S3 */
export const C2 = "#E7B24C";   /* anthropics/skills  · amber · S1, S4, S5 */
export const C3 = "#3F9E74";   /* …code-subagents    · green · S1, S6, S7, S8 */

export const ESSAY = "THE ADOLESCENCE OF TECHNOLOGY";
export const ESSAY_DATE = "JAN 2026";

/** REAL Anthropic Academy course titles, from the catalogue on build day.
    ⛔ Do not add invented ones to fill the grid — the grid is 22 because the
    catalogue is 22. */
export const COURSES = [
  "Claude 101", "Claude Code 101", "Claude Platform 101",
  "Introduction to Claude Cowork", "Claude Code in Action", "AI Fluency",
  "Building with the Claude API", "Intro to MCP", "AI Fluency: Educators",
  "AI Fluency: Students", "MCP: Advanced Topics", "Claude with Bedrock",
  "Claude on Google Cloud", "Teaching AI Fluency", "AI Fluency: Nonprofits",
  "Introduction to agent skills", "Introduction to subagents",
  "AI Capabilities & Limits", "AI Fluency: Small Business", "AI Fluency: Builders",
  "AI Fluency: pK-12", "Claude Platform Deep Dive",
] as const;

/** REAL subagent roles from VoltAgent/awesome-claude-code-subagents. */
export const ROLES = [
  "code-reviewer", "backend-architect", "sql-pro", "security-auditor",
  "devops-engineer", "frontend-dev", "test-automator", "data-engineer",
  "api-designer", "python-pro", "react-specialist", "cloud-architect",
  "debugger", "refactorer", "perf-engineer", "docs-writer",
] as const;

/* =========================================================================
   THE PLACES. ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (THE-OPEN law 1) and a
   night stairwell is exactly the premise that fails it. So the CREAM TREADS
   are the brightest plane in the panel and the darkness is pushed to the
   edges, never across the middle. Body scenes then sit at luma 70-105 with a
   black point p10 <= 35 (ANIMATION-QUALITY §8 — the >=140 bar is FRAME 0 ONLY;
   applying it reel-wide is what washed out ten straight reels).
   ⛔ SIX distinct locations across eleven scenes, each with its own palette so
      every cut is also a colour change ([[feedback_reel_vary_the_locations]]).
   ====================================================================== */
/* ⭐⭐⭐ REBUILT AGAINST REEL 94 AGENCY, which is the reel Alex named as the bar
   and the ONLY one that passes `look_audit`. Its `AgyWorld.tsx` states the law
   this reel was breaking: **"Neighbours in the cut differ by both hue AND
   lightness."** AGENCY spans purple / teal / navy / mint / olive / pink-sunrise
   and gives every place its own practical-light colour. Mine were warm brown
   almost throughout, differing only in VALUE — which is exactly
   *"the coloring is not interesting enough"*.

   The cut order and its hue walk, so no two neighbours share a family:
     S0/S1  floor    INDIGO       amber key
     S2     lecture  TEAL         cream board
     S3     lecfront PLUM         warm pendant
     S4     bay      STEEL CYAN   cold strip
     S5     slot     BLUE-VIOLET  cyan port
     S6     dock     GREEN        amber door
     S7     dockin   AMBER        warm gantries
     S8     bench    ROSE         gold hood
     S9/S10 floor    INDIGO, lit  amber key
   ⛔ Body targets stay AGENCY's: luma 70-105, sat 0.34-0.45, black point <= 35.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* --- the hook worlds ------------------------------------------------- */
  floor:     { back: "#3A3352", back2: "#161327", floor: "#2A2540", floor2: "#0E0C1A",
               lip: "#E8B978", key: GOLD, horizon: 596, grit: "#7E76A4" },
  screens:   { back: "#173040", back2: "#070E16", floor: "#14222E", floor2: "#060A0F",
               lip: "#8FD6E4", key: SKY, horizon: 604, grit: "#3E7088" },
  baydoor:   { back: "#1C2E22", back2: "#070E09", floor: "#1B2A1E", floor2: "#070C08",
               lip: "#F2C878", key: "#F0B45C", horizon: 590, grit: "#4E7A54" },

  /* --- item 1 · the classes: TEAL, and the board is the light ----------- */
  lecture:   { back: "#12414A", back2: "#06181D", floor: "#123239", floor2: "#051418",
               lip: "#CBEAE4", key: "#7FC0C9", horizon: 592, grit: "#4E9AA0" },
  /* reverse angle goes PLUM so the cut inside the same room is a colour cut */
  lecfront:  { back: "#452D52", back2: "#1B1024", floor: "#38264A", floor2: "#150E1E",
               lip: "#F0C979", key: "#E9C6A2", horizon: 540, grit: "#8F6BA4" },

  /* --- item 2 · the skills: STEEL CYAN, then BLUE-VIOLET on the slot ---- */
  bay:       { back: "#173A46", back2: "#06161C", floor: "#14303A", floor2: "#050F14",
               lip: "#9FE4EE", key: "#5FC8D8", horizon: 566, grit: "#3E8090" },
  slot:      { back: "#232A5A", back2: "#0A0C22", floor: "#1C2148", floor2: "#080A1C",
               lip: "#A8B6F2", key: "#6FD8E6", horizon: 596, grit: "#5A63A8" },

  /* --- item 3 · the subagents: GREEN outside, AMBER within, ROSE bench -- */
  dock:      { back: "#12301F", back2: "#050F09", floor: "#12281A", floor2: "#040A06",
               lip: "#9FD9BC", key: "#7ED8A8", horizon: 542, grit: "#3E7A54" },
  dockin:    { back: "#4A2E10", back2: "#1C1005", floor: "#3A2410", floor2: "#150C05",
               lip: "#F8D08A", key: "#F0B45C", horizon: 520, grit: "#9A6A30" },
  bench:     { back: "#4A2237", back2: "#1C0B16", floor: "#3A1C2C", floor2: "#150810",
               lip: "#F5C0A8", key: "#F2A07E", horizon: 588, grit: "#9A5470" },

  /* --- the workroom variants (kept for the earlier hook builds) --------- */
  work:      { back: "#2A2620", back2: "#171410", floor: "#3B342B", floor2: "#231F19",
               lip: "#4A4238", key: GOLD, horizon: 556, grit: "#6B6155" },
  workhook:  { back: "#E4BC84", back2: "#C0925C", floor: "#57402A", floor2: "#31220F",
               lip: "#F0D3A6", key: GOLD, horizon: 596, grit: "#8A6B48" },
  worklow:   { back: "#241F1A", back2: "#14110E", floor: "#4E4235", floor2: "#2A241D",
               lip: "#6A5B49", key: GOLD, horizon: 604, grit: "#7C6B57" },
  worktop:   { back: "#221D1A", back2: "#100E0C", floor: "#544636", floor2: "#241E18",
               lip: "#7A6650", key: GOLD, horizon: 470, grit: "#8A7660" },
  benchhook: { back: "#EDA85C", back2: "#C47C34", floor: "#5E3D20", floor2: "#33200E",
               lip: "#F7D094", key: GOLD, horizon: 596, grit: "#9A7040" },
  stagehook: { back: "#C3CEDA", back2: "#8D9FB0", floor: "#414E5A", floor2: "#232B33",
               lip: "#E2EAF2", key: SKY, horizon: 596, grit: "#6E8090" },
  counter:   { back: "#4A3320", back2: "#1C1209", floor: "#241708", floor2: "#0E0904",
               lip: "#F6E6C2", key: GOLD, horizon: 662, grit: "#6E5230" },
};

export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   THE DESK — the hero artifact. ONE object, TWO states: bare at frame 0 (with
   an identical loaded one beside it), carrying all three at 29.32s.
   ⛔ NOT a rack and NOT a bay plate — reel 104 owns that arrangement.
   ====================================================================== */

/** a desk: the top plane (bright — it is the value the frame is built on), the
    front face (dark, so the edge is light-against-shadow), legs and a contact
    shadow. Drawn as ONE svg ([[feedback_props_need_real_drawing]] — the
    silhouette test: nameable as a desk from its outline alone). */
/** ⛔⛔ THE DESK IS TWO LAYERS, AND IT HAS TO BE.
    v1 drew it as one object and every sprite behind it lost its FACE — the box
    Mascot's body rect IS its face (eyes at 35-48% of its height), so a desk
    drawn in one piece either crops the eyes or floats in front of the laptop.
    A real set does not work that way: you stand BEHIND the desktop and IN FRONT
    of the desk's front face.
      <DeskTop>   z 40   the top plane, behind the sprite
      <Actor>     z 50   him
      <DeskFront> z 60   the front face + legs, cropping his legs
    Everything ON the desk (laptop, tray) goes at z 55-58, between the two. */
export const DeskTop: React.FC<{
  x: number; y: number; w?: number; lit?: number; z?: number }> =
  ({ x, y, w: ww = 470, lit = 1, z = 40 }) => {
  const top = mxh("#C6B79C", lit * 0.20);
  return (
    <svg width={ww} height={46} viewBox={`0 0 ${ww} 46`}
      style={{ position: "absolute", left: x, top: y, zIndex: z, display: "block" }}>
      {/* the top plane, in slight perspective */}
      <path d={`M0 42 L${ww} 42 L${ww - 22} 0 L22 0 Z`} fill={top} />
      <path d={`M40 32 L${ww - 40} 32 L${ww - 48} 10 L48 10 Z`} fill={dkh(top, 0.06)} opacity={0.6} />
    </svg>
  );
};

export const DeskFront: React.FC<{
  x: number; y: number; w?: number; lit?: number; z?: number; h?: number }> =
  ({ x, y, w: ww = 470, lit = 1, z = 60, h: hh = 150 }) => {
  const top = mxh("#C6B79C", lit * 0.20);
  const face = dkh("#C6B79C", 0.44 + (1 - lit) * 0.16);
  const leg = dkh("#C6B79C", 0.62);
  return (
    <svg width={ww} height={hh} viewBox={`0 0 ${ww} ${hh}`}
      style={{ position: "absolute", left: x, top: y, zIndex: z, display: "block",
        filter: "drop-shadow(0 20px 28px rgba(8,7,5,0.48))" }}>
      <rect x={26} y={30} width={20} height={hh - 30} fill={leg} />
      <rect x={ww - 46} y={30} width={20} height={hh - 30} fill={leg} />
      {/* the front face — the DARK the bright top edge reads against */}
      <rect x={0} y={0} width={ww} height={32} rx={3} fill={face} />
      {/* the lit front lip: light-against-shadow at the one edge that matters */}
      <rect x={0} y={0} width={ww} height={7} fill={mxh(top, 0.16)} />
    </svg>
  );
};

/** the output tray — the thing that is empty on one desk and full on the other.
    ⭐ It is the reel's whole hook in one prop, so it is drawn at size. */
export const Tray: React.FC<{ x: number; y: number; n: number; s?: number;
  z?: number; lit?: number; f?: number; landAt?: number[] }> =
  ({ x, y, n, s = 1, z = 58, lit = 1, f = 0, landAt }) => (<>
    {/* the tray itself */}
    <div style={{ position: "absolute", left: x, top: y, width: 214 * s, height: 20 * s, zIndex: z,
      borderRadius: 4 * s, background: dkh("#C6B79C", 0.5),
      borderTop: `${3 * s}px solid ${mxh("#C6B79C", 0.1)}`, boxShadow: SH }} />
    {Array.from({ length: n }, (_, i) => {
      const at = landAt?.[i];
      const k = at === undefined ? 1 : E(f, at, at + 7, 0, 1, OUT);
      if (k <= 0) return null;
      const rk = at === undefined ? 0 : rock(f, at + 5, 4.2, 20);
      return (
        <div key={"wc" + i} style={{ position: "absolute",
          left: x + 8 * s + (rnd(i, 5) - 0.5) * 9 * s,
          top: y - (i + 1) * 15 * s - (1 - k) * 150 * s,
          width: 198 * s, height: 17 * s, zIndex: z + 1 + i,
          borderRadius: 3 * s, background: mxh("#EDE6D6", lit * 0.06),
          border: `${2 * s}px solid ${dkh("#EDE6D6", 0.26)}`,
          transform: `rotate(${rk * 0.5 + (rnd(i, 9) - 0.5) * 2.4}deg) scaleY(${squash(f, at ?? -99, 0.2)})`,
          opacity: k, boxShadow: SH }} />
      );
    })}
  </>);

/** a finished-work card in flight — ejects from a terminal, arcs, and lands.
    ⛔ An arrival that just appears is a state change, not an event: this one
    travels, squashes and rocks. */
export const WorkCard: React.FC<{
  f: number; at: number; x0: number; y0: number; x1: number; y1: number;
  s?: number; z?: number; dur?: number }> =
  ({ f, at, x0, y0, x1, y1, s = 1, z = 62, dur = 16 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0) return null;
  const gone = f > at + dur + 26;
  if (gone) return null;
  const x = x0 + (x1 - x0) * k;
  const y = y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 96 * s;   /* the arc */
  const rk = rock(f, at + dur, 6, 18);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 198 * s, height: 17 * s, zIndex: z,
      borderRadius: 3 * s, background: "#F1EADA", border: `${2 * s}px solid ${dkh("#EDE6D6", 0.3)}`,
      transform: `rotate(${(1 - k) * -22 + rk * 0.6}deg) scaleY(${squash(f, at + dur, 0.28)})`,
      boxShadow: SH }} />
  );
};

/* =========================================================================
   THE REPO CARD — [[feedback_real_marks_are_the_props]]: for any repo reel the
   most obvious object available is THE THING ITSELF, rendered as one card.
   It needs no decoding, it carries the receipt, and it is the brightest thing
   in the frame. This is that card.
   ====================================================================== */
export const RepoCard: React.FC<{
  x: number; y: number; s?: number; owner?: string; name: string; stars?: string;
  tag?: string; note?: string; z?: number; lit?: number }> =
  ({ x, y, s = 1, owner, name, stars, tag, note, z = 60, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 430 * s, borderRadius: 18 * s, overflow: "hidden",
    background: mxh("#F2ECDE", lit * 0.06), border: `${4 * s}px solid ${dkh("#F2ECDE", 0.22)}`,
    boxShadow: SH_D, opacity: 0.5 + lit * 0.5 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 * s,
      padding: `${13 * s}px ${16 * s}px`, background: dkh("#F2ECDE", 0.08),
      borderBottom: `${3 * s}px solid ${dkh("#F2ECDE", 0.20)}` }}>
      {/* the GitHub mark, drawn — not an image dependency */}
      <svg width={34 * s} height={34 * s} viewBox="0 0 16 16" style={{ flex: "0 0 auto" }}>
        <path fill="#241F17" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
          1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
          0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
          2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
          2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
          .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22 * s, color: "#5C5346" }}>
        {owner ? owner + "/" : ""}
      </span>
      {tag && <span style={{ marginLeft: "auto", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: 17 * s, letterSpacing: "0.12em", color: "#F6F2E8",
        background: "#3F6B4E", padding: `${5 * s}px ${11 * s}px`, borderRadius: 6 * s }}>{tag}</span>}
    </div>
    <div style={{ padding: `${16 * s}px ${18 * s}px ${18 * s}px` }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33 * s,
        letterSpacing: "-0.02em", color: "#1E1A14", lineHeight: 1.05 }}>{name}</div>
      {stars && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 * s, marginTop: 12 * s }}>
          <svg width={26 * s} height={26 * s} viewBox="0 0 24 24">
            <path fill={GOLD} stroke={dkh(GOLD, 0.3)} strokeWidth={1.4}
              d="M12 2.4l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.25 6.2 20.3l1.1-6.45-4.7-4.6 6.5-.95z" />
          </svg>
          <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30 * s,
            letterSpacing: "0.01em", color: "#241F17" }}>{stars}</span>
          {note && <span style={{ marginLeft: 10 * s, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 24 * s, color: "#7A6B58" }}>{note}</span>}
        </div>
      )}
    </div>
  </div>
);

/* =========================================================================
   SPLIT-FLAP — ⛔ ANIMATION-QUALITY §4: a number MOVES to its value, it is
   never typeset at it. Every figure in this reel arrives on one of these.
   ====================================================================== */
export const Flap: React.FC<{
  x: number; y: number; v: string; f: number; at: number; per?: number;
  size?: number; c?: string; bg?: string; z?: number; mono?: boolean }> =
  ({ x, y, v, f, at, per = 3, size = 44, c = "#F6F1E6", bg = "#1C1915", z = 72, mono = true }) => {
  const chars = v.split("");
  const POOL = "0123456789★,+$";
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex", gap: size * 0.09 }}>
      {chars.map((ch, i) => {
        const land = at + i * per;
        const settled = f >= land;
        /* before it lands it is CYCLING — a cell that is blank is a hole, and a
           hole reads as missing rather than arriving. */
        const shown = settled ? ch : POOL[Math.floor((f * 2.3 + i * 5) % POOL.length)];
        const flip = E(f, land - 2, land + 3, 0, 1, OUT);
        return (
          <span key={"fl" + i} style={{ display: "inline-block",
            minWidth: ch === "," ? size * 0.34 : size * 0.66,
            padding: `${size * 0.11}px ${size * 0.08}px`, textAlign: "center",
            borderRadius: size * 0.11, background: bg,
            border: `2px solid ${mxh(bg, 0.12)}`,
            fontFamily: mono ? MONO : inter.fontFamily, fontWeight: 900,
            fontSize: size, lineHeight: 1, color: settled ? c : mxh(bg, 0.34),
            transform: `scaleY(${0.62 + flip * 0.38})`, transformOrigin: "50% 50%" }}>{shown}</span>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE CARTRIDGE — item 2, drawn as ONE svg with real paths (shell, label
   recess, contact fingers, chamfer). ⛔ Stacked CSS divs CANNOT draw a
   recognisable object ([[reel-draw-dont-stack]]); the silhouette test is
   "nameable in flat black on white", and this passes it.
   ====================================================================== */
export const Cartridge: React.FC<{
  x: number; y: number; s?: number; rot?: number; z?: number; lit?: number;
  c?: string; children?: React.ReactNode }> =
  ({ x, y, s = 1, rot = 0, z = 60, lit = 1, c = "#E9E2D2", children }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 80%" }}>
    <svg width={290} height={228} viewBox="0 0 290 228" style={{ display: "block",
      filter: "drop-shadow(0 22px 30px rgba(6,10,16,0.55))" }}>
      {/* the shell, chamfered top-right so it has an orientation */}
      <path d="M10 0 H252 L282 30 V196 A12 12 0 0 1 270 208 H22 A12 12 0 0 1 10 196 Z"
        fill={mxh(c, lit * 0.08)} stroke={dkh(c, 0.30)} strokeWidth={5} />
      {/* the label recess — a real inset, one shade down */}
      <rect x={30} y={22} width={228} height={128} rx={9}
        fill={dkh(c, 0.14)} stroke={dkh(c, 0.26)} strokeWidth={3} />
      {/* the contact fingers along the bottom edge */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={"pin" + i} x={40 + i * 24} y={176} width={15} height={26} rx={3}
          fill={mxh(GOLD, 0.16)} />
      ))}
      <rect x={30} y={166} width={228} height={5} fill={dkh(c, 0.34)} />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={"rb" + i} x={62 + i * 36} y={6} width={22} height={9} rx={4}
          fill={dkh(c, 0.24)} />
      ))}
    </svg>
    <div style={{ position: "absolute", left: 30, top: 22, width: 228, height: 128 }}>{children}</div>
  </div>
);

/* =========================================================================
   ⭐⭐ THE THREE THINGS, AS OBJECTS RATHER THAN AS CARDS OF TEXT.
   Alex on v1: *"they have text animations when the animations themselves should
   NOT be text"*. v1 drew all three as GitHub repo cards and put a 916px text
   claim plate over them, so the whole frame was type
   ([[feedback_graphical_over_textual]]: "type is read, graphics are watched" —
   one text chip per shot, and a number MOVES to its value, never typeset at it).
   These carry ONE small mark each; the quantity is shown by COUNTABLE OBJECTS.
   ====================================================================== */

/** item 1 — a FANNED DECK of 22 course cards. ⭐ The count is the picture: you
    can count the cards, so no numeral has to say "22". */
export const CourseDeck: React.FC<{
  x: number; y: number; n?: number; s?: number; z?: number; lit?: number;
  spread?: number; f?: number; c?: string }> =
  ({ x, y, n = 22, s = 1, z = 56, lit = 1, spread = 1, f = 0, c = "#F2ECDD" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const k = i / (n - 1);
      const ang = (k - 0.5) * 46 * spread;
      const lift = Math.sin(k * Math.PI) * 26 * s * spread;
      return (
        <div key={"cd" + i} style={{ position: "absolute",
          left: (k - 0.5) * 196 * s * spread, top: -lift,
          width: 74 * s, height: 104 * s, borderRadius: 7 * s,
          transformOrigin: "50% 100%", transform: `rotate(${ang}deg)`,
          background: mxh(c, lit * 0.06 - (1 - k) * 0.02),
          border: `${3 * s}px solid ${dkh(c, 0.30)}`,
          boxShadow: SH, zIndex: i }} />
      );
    })}
  </div>
);

/** item 3 — a solid BLOCK of subagent tiles. One mass, countable, no numeral. */
export const TileBlock: React.FC<{
  x: number; y: number; cols?: number; rows?: number; s?: number; z?: number;
  lit?: number; on?: (i: number) => number; c?: string }> =
  ({ x, y, cols = 6, rows = 4, s = 1, z = 56, lit = 1, on, c = "#EDE6D6" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    {Array.from({ length: cols * rows }, (_, i) => {
      const k = on ? on(i) : 1;
      return (
        <div key={"tb" + i} style={{ position: "absolute",
          left: (i % cols) * 46 * s, top: Math.floor(i / cols) * 46 * s,
          width: 40 * s, height: 40 * s, borderRadius: 6 * s,
          background: k > 0.5 ? mxh(c, lit * 0.06) : dkh(c, 0.62),
          border: `${3 * s}px solid ${dkh(c, 0.34)}`,
          opacity: 0.25 + k * 0.75,
          transform: `scale(${0.82 + k * 0.18})`, boxShadow: k > 0.5 ? SH : undefined }} />
      );
    })}
  </div>
);

/** a small identifying chip — ⛔ ONE per object, and it LABELS, it never
    ANIMATES. The events in this reel are physical, never typographic. */
export const NameChip: React.FC<{ x: number; y: number; t: string; s?: number;
  z?: number; c?: string }> = ({ x, y, t, s = 1, z = 70, c = "#F2ECDE" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${6 * s}px ${13 * s}px`, borderRadius: 8 * s, background: c,
    border: `${2 * s}px solid ${dkh(c, 0.22)}`, boxShadow: SH,
    fontFamily: MONO, fontWeight: 900, fontSize: 19 * s, letterSpacing: "0.04em",
    color: "#241F17", whiteSpace: "nowrap" }}>{t}</div>
);

/* =========================================================================
   THE SUBAGENT TILE — item 3. ⛔ >= 40px on the short side: the motion audit
   scales 1012 -> 240, so anything under ~8px is GONE before differencing.
   Reel 106 ran 46 three-pixel streaks a frame and scored 4.96 — it HAD a
   background process and the process was invisible.
   ====================================================================== */
export const SubTile: React.FC<{
  x: number; y: number; t: string; s?: number; rot?: number; z?: number; lit?: number }> =
  ({ x, y, t, s = 1, rot = 0, z = 56, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 128 * s, height: 62 * s, borderRadius: 9 * s, overflow: "hidden",
    transform: `rotate(${rot}deg)`, boxShadow: SH,
    background: mxh("#EDE6D6", lit * 0.07), border: `${3 * s}px solid ${dkh("#EDE6D6", 0.26)}`,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 4 * s }}>
    <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15 * s, lineHeight: 1.1,
      letterSpacing: "-0.01em", color: "#2A241C", textAlign: "center" }}>{t}</span>
  </div>
);

/* =========================================================================
   THE COURSE CARD — item 1. Real titles only (COURSES above).
   ====================================================================== */
export const CourseCard: React.FC<{
  x: number; y: number; t: string; on: number; s?: number; z?: number }> =
  ({ x, y, t, on, s = 1, z = 56 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    width: 108 * s, height: 62 * s, borderRadius: 7 * s, overflow: "hidden",
    background: on > 0.5 ? mxh("#F4EFE2", 0.02) : "#3E382C",
    border: `${3 * s}px solid ${on > 0.5 ? dkh("#F4EFE2", 0.24) : "#302B22"}`,
    boxShadow: on > 0.5 ? SH : undefined,
    transform: `scale(${0.9 + on * 0.1})`,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 5 * s }}>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13 * s,
      lineHeight: 1.12, textAlign: "center",
      color: on > 0.5 ? "#2A241C" : "#5C5445", opacity: 0.35 + on * 0.65 }}>{t}</span>
  </div>
);

/* =========================================================================
   THE ESSAY PLATE — the hook's receipt. ⛔ TITLE ONLY. No quote, no quotation
   marks, no portrait. The claim's SIZE stays in the VO where it belongs.
   ====================================================================== */
export const EssayPlate: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 78 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${14 * s}px ${22 * s}px`, borderRadius: 12 * s,
    background: "#F2ECDE", border: `${4 * s}px solid ${dkh("#F2ECDE", 0.24)}`, boxShadow: SH_D }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 30 * s,
      letterSpacing: "-0.01em", color: "#1E1A14", lineHeight: 1 }}>{ESSAY}</div>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, marginTop: 7 * s,
      letterSpacing: "0.16em", color: "#7A6B58" }}>{ESSAY_DATE}</div>
  </div>
);

/* an expanding ring — every arrival costs something */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number;
  r?: number; c?: string; z?: number; dur?: number }> =
  ({ x, y, f, at, r = 150, c = GOLD, z = 74, dur = 22 }) => {
  const k = E(f, at, at + dur, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  const rr = r * k;
  return (
    <div style={{ position: "absolute", left: x - rr, top: y - rr * 0.42,
      width: rr * 2, height: rr * 0.84, borderRadius: "50%", zIndex: z,
      border: `${Math.max(2, 7 * (1 - k))}px solid ${hexa(c, 0.62 * (1 - k))}` }} />
  );
};

/* a dust puff on impact — an arrival that just appears is a state change */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number;
  n?: number; s?: number; c?: string; z?: number }> =
  ({ x, y, f, at, n = 9, s = 1, c = "#8A7C68", z = 52 }) => {
  const k = E(f, at, at + 26, 0, 1, OUT);
  if (k <= 0 || k >= 1) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const dir = (rnd(i, 3) - 0.5) * 2;
      return (
        <div key={"pf" + i} style={{ position: "absolute",
          left: x + dir * 96 * k * s, top: y - rnd(i, 7) * 44 * k * s,
          width: (13 + rnd(i, 9) * 20) * s, height: (13 + rnd(i, 9) * 20) * s,
          borderRadius: "50%", background: hexa(c, 0.34 * (1 - k)), zIndex: z }} />
      );
    })}
  </>);
};
