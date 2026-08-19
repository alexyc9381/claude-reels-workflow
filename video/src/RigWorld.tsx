import React from "react";
import { MONO, Mascot } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Ring, Puff, Rake, Pool, Tag, COSTUMES, costumeFor, mono, ui,
} from "./FlwWorld";
import type { Place } from "./FlwWorld";

/* ===========================================================================
   REEL 114 · "SMART" — THE WORLD KIT.  Board: storyboards/114-smart.md.

   Subject: your Claude setup — CLAUDE.md, skills, memory — was written for
   models that needed hand-holding. On Claude Opus 5 it is the thing making the
   model slow, disobedient and wrong. Anthropic deleted >80% of Claude Code's
   own system prompt for exactly this reason (verified, see `R` below). The fix
   is an audit that KEEPS what earns its place and cuts the rest.

   ⛔⛔ THE WORLD IS THE SUBJECT'S OWN OBJECTS. [[feedback_real_marks_are_the_props]]
      has burned three reels. Here the mapping is one-to-one and physical:
      **A RULE IS A BRACE.** A support structure bolted onto something that no
      longer needs support is the literal shape of the argument, and it is the
      only mapping in which *"their own rules were fighting against each other"*
      has a picture: TWO BRACES YANKING ONE ARM IN OPPOSITE DIRECTIONS (S7).

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` + the BANNED
      lists). Every figure the picture is allowed to state lives here, so no
      scene can invent one. Checked live 2026-08-19.

   ⛔⛔⛔ THE GUARD THAT WILL COST A ROUND IF IT IS FORGOTTEN: the VO's payoff
      says Claude is *"running so much faster with no hallucinations"*. That is
      Alex's own setup and it has NO source. So there is no multiplier, no
      percentage, no "0 HALLUCINATIONS" plate and no speed meter ANYWHERE.
      S13 draws the MECHANISM — the belt that stalled in S1 runs, and the REJECT
      BIN that filled in S1 stays EMPTY — and stops at the edge of the claim.
      Guard: `SPEED_BANNED`.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ⛔ NEVER hand-draw a limb on the Mascot (reel 110: it read as a TAIL). Every
      brace here is a SEPARATE object bolted around the sprite, never attached
      to its body geometry.
   ⛔⛔⛔ `SlopKit.Mascot`'s DRAWN BODY IS 0.73 x size TALL AND 0.95 x size WIDE,
      bottom-aligned in its div. MEASURED on a rendered still (size 330 -> a
      315 x 241px bbox), not derived. Reel 109's note says "the body is ~100% of
      size" and that is true of its WIDTH and wrong by a third of its HEIGHT —
      v0 of this reel laid every brace out on `by in [0, 1]` and all fifteen of
      them floated above the shoulders. The body occupies `by in [0.27, 1.00]`
      and `bx in [-0.475, +0.475]`; see `BraceDef`.
   ========================================================================= */

export {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
  dkh, mxh, idle, rock, shake, drift, squash,
  Ring, Puff, Rake, Pool, Tag, COSTUMES, costumeFor, mono, ui,
};
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";
export const STEEL = "#8A8F98", STEELD = "#3E434C", IRON = "#5A6069";
export const RUST = "#9E5A38", CREAM = "#EFE7D4";

export const KEYWORD = "SMART";

/* =========================================================================
   THE RECEIPTS — one place, so no scene can invent a number.

   Verified 2026-08-19 against Anthropic's own published post, "The new rules of
   context engineering for Claude 5 generation models" (Thariq Shihipar,
   2026-07-24, claude.com/blog):

     · Anthropic removed **over 80%** of Claude Code's system prompt for the
       Claude 5 generation (Opus 5 / Fable 5) with **no measurable loss** on
       their coding evaluations.
     · Their words: they were **"over-constraining Claude Code, both through our
       system prompt and in our CLAUDE.md files and skills."**
     · Their worked example of rules fighting: a single request carrying both
       *"leave documentation as appropriate"* AND *"DO NOT add comments"*.
     · Anthropic's own remedy ships as the `/doctor` command, which rightsizes
       skills and CLAUDE.md files. ⛔ NOT ON SCREEN — the VO promises a pasted
       PROMPT, and putting a real command on screen next to Alex's prompt would
       imply they are the same artifact. It belongs in the article.
   ====================================================================== */
export const R = {
  /** the ONE percentage the picture may state, and it is Anthropic's own */
  cutPct: 80,
  /** drawn as 8 of 10 slots going dark — countable without reading a numeral */
  slots: 10, slotsCut: 8,
  /** the model the rules are now too small for */
  model: "OPUS 5", modelNum: "5",
  /** Anthropic's published conflicting pair, shortened to fit a stencil */
  clashA: "DOCUMENT IT", clashB: "NO COMMENTS",
  /** their word for it, one stamp, one shot */
  verdict: "OVER-CONSTRAINING",
} as const;

/** ⛔ NOTHING IN THIS LIST MAY BE TYPESET. The payoff claim is unsourced, so the
    picture draws the mechanism and stops. Gate:
      grep -oiE 'x faster|[0-9]+x|no hallucinations|0 halluc' src/Rig*.tsx | wc -l  ->  0 */
export const SPEED_BANNED = [
  "2x", "3x", "5x", "10x", "X FASTER", "2X FASTER", "50% FASTER",
  "0 HALLUCINATIONS", "NO HALLUCINATIONS", "ZERO HALLUCINATIONS", "100% ACCURATE",
] as const;

/** ⛔ "the smartest models ever" is a marketing superlative. No benchmark, no
    score, no leaderboard, no chart anywhere in this reel. */
export const BENCH_BANNED = ["SOTA", "#1", "BENCHMARK", "SWE-BENCH", "97%", "SCORE"] as const;

/* =========================================================================
   THE BRACES — the rig's parts list, and the reel's number spine.

   Each brace is ONE line of your CLAUDE.md / one skill / one memory file.
   ⛔ THE TAGS ARE MARKS, NOT PROSE. Reel 109 shipped 33 `<span>`s in the
      animation layer and was rejected for it; the words in this reel live in
      the header band and the captions. A stencil here is at most two short
      words, and no more than ONE is legible in any single shot.
   ====================================================================== */
export type Rank = "rule" | "skill" | "mem";

export type BraceDef = {
  id: string;
  rank: Rank;
  tag: string;
  /** ⛔⛔⛔ OFFSETS ARE IN `size` UNITS FROM THE TOP OF THE MASCOT'S DIV, DOWN —
      AND THE DRAWN BODY IS NOT THE DIV. Measured on a rendered still by reading
      the pixel bbox (reel 109's law: read the pixels, don't trust the algebra):

        requested size 330  ->  drawn body 315 x 241 px, bottom-aligned in the div
        so  HEIGHT = 0.73 x size   ·   WIDTH = 0.95 x size
        and the body occupies  by in [0.27, 1.00],  bx in [-0.475, +0.475]

      ⛔ The note carried into this build said "the body is ~100% of size", which
      is true of its WIDTH and wrong by a third of its HEIGHT. v0's braces were
      all laid out on by in [0, 1.0] and every one of them floated above the
      shoulders. Every row below is placed against the MEASURED box, so a brace
      that should clamp the body ends INSIDE [-0.475, +0.475]. */
  bx: number; by: number; bw: number; bh: number;
  rot?: number;
  /** true = drawn in FRONT of the body, false = behind it */
  front: boolean;
  /** the audit's verdict: braces that earn their place are KEPT */
  keep: boolean;
};

/** 15 braces: 7 rules, 5 skills, 3 memory. The audit keeps 4 (2 rules, 1 skill,
    1 memory) — an audit that keeps nothing is a delete, and the VO explicitly
    says *"don't just go deleting everything"*. */
export const BRACES: BraceDef[] = [
  /* --- the RULE rank: the head band and the arm cage. `by` runs 0.30 (head)
         to 0.72 (waist), i.e. INSIDE the measured body box. ---------------- */
  /* ⛔ r7 SITS ON THE CROWN, NOT ACROSS THE FACE. At by 0.30 it landed exactly
     on the eyes and read as a blindfold — and a reel whose whole cast is one
     mascot cannot afford to lose its only face. Expression is the cheapest
     legible information in the frame; never brace over it. */
  { id: "r7", rank: "rule", tag: "FORMAT",   bx: -0.10, by:  0.245, bw: 0.20, bh: 0.060, front: true, keep: false },
  { id: "r1", rank: "rule", tag: R.clashA,   bx: -0.66, by:  0.42, bw: 0.30, bh: 0.090, front: true, keep: false, rot: -6 },
  { id: "r2", rank: "rule", tag: R.clashB,   bx:  0.36, by:  0.42, bw: 0.30, bh: 0.090, front: true, keep: false, rot:  6 },
  { id: "r3", rank: "rule", tag: "NO TESTS", bx: -0.62, by:  0.56, bw: 0.24, bh: 0.080, front: true, keep: false, rot: -3 },
  { id: "r4", rank: "rule", tag: "ALWAYS",   bx:  0.38, by:  0.56, bw: 0.24, bh: 0.080, front: true, keep: true,  rot:  3 },
  { id: "r5", rank: "rule", tag: "NEVER",    bx: -0.60, by:  0.70, bw: 0.22, bh: 0.075, front: true, keep: false, rot: -2 },
  { id: "r6", rank: "rule", tag: "STYLE",    bx:  0.38, by:  0.70, bw: 0.22, bh: 0.075, front: true, keep: true,  rot:  2 },
  /* --- the SKILL rank: the leg braces and the base ring ------------------ */
  { id: "s1", rank: "skill", tag: "SKILL",   bx: -0.58, by:  0.82, bw: 0.20, bh: 0.075, front: true, keep: false, rot: -4 },
  { id: "s2", rank: "skill", tag: "SKILL",   bx:  0.38, by:  0.82, bw: 0.20, bh: 0.075, front: true, keep: true,  rot:  4 },
  { id: "s3", rank: "skill", tag: "SKILL",   bx: -0.54, by:  0.92, bw: 0.18, bh: 0.070, front: true, keep: false, rot: -2 },
  { id: "s4", rank: "skill", tag: "SKILL",   bx:  0.36, by:  0.92, bw: 0.18, bh: 0.070, front: true, keep: false, rot:  2 },
  { id: "s5", rank: "skill", tag: "SKILL",   bx: -0.09, by:  1.00, bw: 0.20, bh: 0.070, front: true, keep: false },
  /* --- the MEMORY rank: the spine bars, BEHIND the body ------------------ */
  { id: "m1", rank: "mem", tag: "MEMORY",    bx: -0.07, by:  0.24, bw: 0.14, bh: 0.80, front: false, keep: true },
  { id: "m2", rank: "mem", tag: "MEMORY",    bx: -0.66, by:  0.28, bw: 0.11, bh: 0.68, front: false, keep: false },
  { id: "m3", rank: "mem", tag: "MEMORY",    bx:  0.56, by:  0.28, bw: 0.11, bh: 0.68, front: false, keep: false },
];

export const byRank = (r: Rank) => BRACES.filter((b) => b.rank === r);
export const KEPT = BRACES.filter((b) => b.keep).map((b) => b.id);

/* =========================================================================
   THE PLACES — six lit zones of ONE bay.

   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE (docs/ANIMATION-QUALITY §8).
      `fitbay` is the only set built bright, and even there the brightness is
      carried by the SPEC BOARD prop, not by the palette's dark stop — reel 110
      proved that a gate carried by the hero DEFORMS the hero. Every body row
      below targets luma 70-105, sat 34-45%, p10 <= 35.
   ⛔ Neighbouring zones differ in BOTH hue and lightness.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0-S1 — THE FIT BAY. Tungsten on gravel, warmest set, and the ONE bright
     one: the hook lives here and frame 0 is a brightness competition. */
  /* ⛔⛔ `back` AND `floor` ARE THE ONLY VALUES IN THIS FILE THAT WERE RAISED,
     and only here. Frame 0 measured 130.0 against the >=140 bar and the yuv420p
     encode costs another ~1.5, so the LIT half of the hook set goes up while
     `back2` and `floor2` — the dark stops the black-point gate actually
     measures — are untouched. This is §8's sanctioned move and it applies to
     the hook set ONLY; every body row below is unchanged. */
  fitbay:   { back: "#BCA470", back2: "#544628", floor: "#CCBA90", floor2: "#8A7448",
              lip: "#EAD2A0", key: "#F0C979", horizon: 520, grit: "#F0DCA8" },

  /* S1 — the same bay one stop down, tighter on the line. The belt scene must
     not be as bright as the hook or the hook stops ranking. */
  linebay:  { back: "#4E4128", back2: "#241D10", floor: "#5C4C2E", floor2: "#2A2214",
              lip: "#886F42", key: "#E0925A", horizon: 546, grit: "#B4956010" },

  /* S2-S3 — THE INSPECTION. Cold teal, the biggest hue jump in the reel. */
  inspect:  { back: "#173845", back2: "#0A1B22", floor: "#1A3B47", floor2: "#0B1E26",
              lip: "#2C6376", key: "#7FC0C9", horizon: 552, grit: "#7FC0C9" },

  /* S3 — THE ARCHIVE. Where the older model is kept, and the ONE indigo set in
     the reel: S2 is cold teal and S4 is sodium orange, so the reveal sits
     between them differing from BOTH in hue and in lightness. */
  archive:  { back: "#2C2450", back2: "#140F28", floor: "#312A54", floor2: "#171230",
              lip: "#57497E", key: "#B8A2E0", horizon: 546, grit: "#9E8CC8" },

  /* S4 — THE FURNACE. Sodium orange, up-lit, the villain's own light. */
  furnace:  { back: "#4A2415", back2: "#210E08", floor: "#54301A", floor2: "#26140A",
              lip: "#8A4A24", key: "#E0925A", horizon: 534, grit: "#C4783C" },

  /* S5-S6 — ANTHROPIC'S BAY. Cold sky over a warm interior: TWO SOURCES
     FIGHTING, which is literally what the scene is about. Visibly not ours. */
  theirbay: { back: "#26375E", back2: "#121A32", floor: "#2E3A5C", floor2: "#141B30",
              lip: "#57689A", key: "#EFC978", horizon: 508, grit: "#8FA0CE" },

  /* S7 — THE CLASH. Oxblood, dark-warm, lit by two opposed reds. The peak. */
  clash:    { back: "#421C1C", back2: "#1E0808", floor: "#4A2220", floor2: "#230D0C",
              lip: "#74332F", key: "#C44A3A", horizon: 540, grit: "#945044" },

  /* S8-S10 — THE TOOL CRIB. Navy + gold, mid-bright: the turn is readable. */
  crib:     { back: "#233A54", back2: "#0E1A28", floor: "#2A4258", floor2: "#111E2C",
              lip: "#476C8E", key: "#E7B24C", horizon: 512, grit: "#8FB2CE" },

  /* S11-S12 — THE CUT DECK. Green screen-wash; the scan IS the source. */
  cutdeck:  { back: "#1B3A2E", back2: "#0A1C15", floor: "#1E4032", floor2: "#0C2018",
              lip: "#35705A", key: "#5FAE86", horizon: 528, grit: "#7FBFA0" },

  /* S13-S14 — THE OPEN FLOOR. Doors open, daylight flood; brightest body
     scene, and the callback to `fitbay` relit. */
  openfloor:{ back: "#6A6748", back2: "#3A3A26", floor: "#7C7450", floor2: "#443F2A",
              lip: "#B0A46C", key: "#F2DA9A", horizon: 512, grit: "#D4C68C" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* =========================================================================
   MOTION HELPERS specific to this reel.
   ====================================================================== */

/** a damped judder — what a limb does when two cables fight over it.
    ⛔ This is NOT `rock`: it does not decay to rest, it decays to a TREMBLE,
    because the rules never stop pulling. */
export const judder = (lf: number, at: number, amp = 14, k = 40) => {
  if (lf < at) return 0;
  const d = lf - at;
  return Math.sin(d / 1.7) * amp * (0.34 + 0.66 * Math.exp(-d / k));
};

/** bar whip — a loaded bar never sits straight (ANIMATION-QUALITY §11: WEIGHT
    is DEFORMATION). Returns degrees of bend for a brace under tension. */
export const whip = (lf: number, load: number) =>
  load * (2.6 + Math.sin(lf / 9) * 1.1 + Math.sin(lf / 23) * 0.6);

/* =========================================================================
   THE RIG — the villain, and the reel's HERO ARTIFACT.

   ⛔⛔ PROPORTION IS A GATE, NOT A TASTE (reel 110's ⭐⭐⭐). Measured against a
      `size`-tall body in a 792px panel:
        frame height  = 1.30 x size   (a cage AROUND him, not a costume)
        frame width   = 1.34 x size   -> at size 330 that is 442px = 44% of the
                                        panel width, so there is air on BOTH
                                        sides and a silhouette can form.
      Do not let a gate ride on this object. `HOOK_LUMA` and `HOOK_PLATE` are
      carried by `SpecBoard`, which is why the rig is free to be dark steel.
   ====================================================================== */
export const RigBrace: React.FC<{
  b: BraceDef; f: number; size: number; on?: number; state?: "idle" | "red" | "green" | "cut";
  pull?: number; showTag?: boolean; z?: number;
}> = ({ b, f, size, on = 1, state = "idle", pull = 0, showTag = false, z = 46 }) => {
  const w = b.bw * size, h = b.bh * size;
  /* ⛔⛔ EVERY DETAIL BELOW IS SIZED OFF THE SHORT SIDE, NOT OFF `h`. v0 sized
     the clamp jaw off `h`, which is a bar THICKNESS for a horizontal brace and a
     bar LENGTH for the vertical spine — so the three spine braces each grew a
     164 x 380px jaw and the rig rendered as one grey box with the hero
     completely hidden behind it. Same class of bug as reel 112's press ram that
     could not reach its own target: an expression that is right for one
     orientation and silently absurd for the other. */
  const t = Math.min(w, h);                 /* the bar's thickness, either way */
  const c = state === "red" ? "#7E3A31" : state === "green" ? "#2F5F4A" : IRON;
  const face = state === "red" ? RED : state === "green" ? GREEN : STEEL;
  const bend = whip(f, pull);
  const nBolt = Math.max(2, Math.round(Math.max(w, h) / 40));
  const vert = h > w;
  return (
    <div style={{ position: "absolute", left: b.bx * size, top: b.by * size, width: w, height: h,
      zIndex: z, opacity: on,
      transform: `rotate(${(b.rot ?? 0) + bend}deg)`, transformOrigin: b.bx < 0 ? "100% 50%" : "0% 50%" }}>
      {/* the cast body of the brace — a machined bar, so the corners are barely
          broken. v0's 0.22 radius made every brace read as a lozenge. */}
      <div style={{ position: "absolute", inset: 0, borderRadius: Math.min(4, t * 0.16),
        background: vert
          ? `linear-gradient(90deg, ${dkh(c, 0.30)} 0%, ${mxh(c, 0.16)} 44%, ${dkh(c, 0.38)} 100%)`
          : `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${c} 44%, ${dkh(c, 0.38)} 100%)`,
        boxShadow: SH }} />
      {/* the machined highlight edge — what makes it read as metal, not plastic */}
      <div style={{ position: "absolute",
        left: 2, top: 2, width: vert ? Math.max(2, t * 0.20) : w - 4,
        height: vert ? h - 4 : Math.max(2, t * 0.20),
        background: hexa(mxh(face, 0.34), 0.50) }} />
      {/* the bolt heads: STRUCTURE is what says category, not hue (§11) */}
      {Array.from({ length: nBolt }, (_, i) => {
        const d = Math.max(4, t * 0.30);
        const along = 6 + i * ((Math.max(w, h) - 12 - d) / Math.max(1, nBolt - 1));
        return (
          <div key={"bo" + i} style={{ position: "absolute",
            left: vert ? w / 2 - d / 2 : along, top: vert ? along : h / 2 - d / 2,
            width: d, height: d, borderRadius: "50%",
            background: dkh(c, 0.46), border: `1px solid ${hexa(mxh(c, 0.42), 0.45)}` }} />
        );
      })}
      {/* the clamp jaw at the INBOARD end — this is the part that bites the body.
          Only front braces have one; the spine bars are not clamps. */}
      {b.front && (
        <div style={{ position: "absolute", [b.bx < 0 ? "right" : "left"]: -t * 0.34,
          top: -t * 0.36, width: t * 0.72, height: h + t * 0.72, borderRadius: 3,
          background: `linear-gradient(90deg, ${dkh(c, 0.34)}, ${mxh(c, 0.10)})`,
          boxShadow: SH } as any} />
      )}
    </div>
  );
};

/** ⛔⛔⛔ THE STENCIL IS ITS OWN SIBLING, NOT A CHILD OF THE BRACE.
    v1 put the tag inside the bar and "DOCUMENT IT" rendered as "OCUMENT IT".
    v2 moved it to a plate at `zIndex: 40` — INSIDE the brace div — and it STILL
    clipped, because `RigBrace` carries `transform: rotate(...)`, and **a
    transformed element creates a stacking context**: the child's z=40 is
    resolved against its siblings inside that context, not against the rig's
    uprights at z=5 outside it. Same family as reel 93's vanished tower and
    reel 104's three zIndex bugs — when something looks wrong, check the
    STACKING CONTEXT before you touch its values.
    So the plate is rendered by the Rig itself, after everything, untransformed. */
export const BraceStencil: React.FC<{ b: BraceDef; size: number; state?: string }> =
  ({ b, size, state = "idle" }) => {
  const t = Math.min(b.bw * size, b.bh * size);
  const face = state === "red" ? RED : state === "green" ? GREEN : STEEL;
  return (
    <div style={{ position: "absolute",
      left: (b.bx + b.bw / 2) * size, top: b.by * size - t * 2.4, zIndex: 88,
      transform: "translateX(-50%)", padding: `${t * 0.22}px ${t * 0.46}px`,
      borderRadius: 4, background: hexa("#17140F", 0.90),
      border: `2px solid ${hexa(mxh(face, 0.34), 0.60)}`,
      fontFamily: MONO, fontWeight: 900, fontSize: Math.max(16, t * 0.66),
      letterSpacing: "0.05em", color: "#F6F0E2", whiteSpace: "nowrap" }}>
      {b.tag}
    </div>
  );
};


/* =========================================================================
   THE WINCH — the thing that lowers the rig, and the reason it is lowered.

   ⛔⛔ ALEX, ON THE REVISED HOOK: *"need more interesting motion, another Claude
   sprite somehow in this equation lowering it and stuff, just more not just like
   standard linear motion."* The note is doing two jobs at once and both are in
   the craft doc:
     1 §10 — a hand-off needs a SOURCE. A cage that descends by itself has no
       agent, so nothing on screen explains WHY it is coming down.
     2 §1 — "N discrete pops instead of one long tween" measured 4.27 -> 5.63 at
       identical duration. A winch pays out in NOTCHES; a tween does not.

   ⭐ And it is the best beat in the hook thematically: the rig does not fall on
   him out of nowhere. **Other Claudes bolt it on.** That is literally what
   writing a CLAUDE.md is, and it is why the crew are the ones who look pleased
   with themselves right up until it bites.
   ====================================================================== */
export const Winch: React.FC<{ x: number; y: number; f: number; turn: number; z?: number;
  s?: number; released?: boolean; c?: string }> =
  ({ x, y, f, turn, z = 56, s = 1, released = false, c = IRON }) => {
  const R = 66 * s;
  return (<>
    {/* the platform the crew stand on */}
    <div style={{ position: "absolute", left: x - 190 * s, top: y, width: 400 * s, height: 22 * s,
      zIndex: z - 2, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(c, 0.26)}, ${dkh(c, 0.44)})`, boxShadow: SH_D }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"pk" + i} style={{ position: "absolute", left: x - 182 * s + i * 46 * s,
        top: y - 30 * s, width: 7 * s, height: 30 * s, zIndex: z - 3,
        background: hexa(dkh(c, 0.34), 0.85) }} />
    ))}
    {/* the drum, and the CAPSTAN WHEEL that turns with the payout */}
    <div style={{ position: "absolute", left: x - 52 * s, top: y - 92 * s, width: 104 * s,
      height: 70 * s, zIndex: z, borderRadius: 6,
      background: `linear-gradient(180deg, ${mxh(c, 0.20)}, ${dkh(c, 0.46)})`, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - R, top: y - 92 * s + 35 * s - R, width: R * 2,
      height: R * 2, borderRadius: "50%", zIndex: z + 1,
      border: `${11 * s}px solid ${dkh(c, 0.26)}`,
      background: hexa(dkh(c, 0.52), 0.7),
      transform: `rotate(${turn}deg)` }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: R - 6 * s - 11 * s, top: 0,
          width: 12 * s, height: R * 2 - 22 * s, background: dkh(c, 0.34),
          transform: `rotate(${i * 30}deg)`, transformOrigin: "50% 50%" }} />
      ))}
      <div style={{ position: "absolute", left: R - 20 * s - 11 * s, top: R - 20 * s - 11 * s,
        width: 40 * s, height: 40 * s, borderRadius: "50%", background: mxh(c, 0.16) }} />
    </div>
    {/* the brake lever — upright while it holds, thrown flat on the release */}
    <div style={{ position: "absolute", left: x + 96 * s, top: y - 108 * s, width: 13 * s,
      height: 96 * s, zIndex: z + 2, borderRadius: 4,
      transformOrigin: "50% 100%",
      transform: `rotate(${released ? 74 : 4 + Math.sin(f / 17) * 2}deg)`,
      background: `linear-gradient(90deg, ${dkh(RED, 0.34)}, ${mxh(RED, 0.12)})`, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x + 88 * s, top: y - 18 * s, width: 30 * s,
      height: 20 * s, zIndex: z + 1, borderRadius: 3, background: dkh(c, 0.44) }} />
  </>);
};


/* =========================================================================
   THE BEACON — a rotating hazard light, for the one bay rule this world had not
   yet drawn: when a load is moving overhead, the light is on.

   ⛔⛔ IT IS A SWEEPING CONE, NOT A FULL-FRAME TINT. THE-OPEN's third rejected
   draft was "a full-panel red tint pulse for the klaxon", killed twice over --
   it flattened the grade AND flooded the frame uniformly, "making the motion
   metric look good for the wrong reason". The rule it produced is absolute:
   light is always a SHAPED CONE, never a full-frame fill.

   A rotating beacon is also the cheapest legitimate motion in the frame. Two
   opposed cones sweeping 360 degrees is a large swept area at a high luma delta,
   which is what the motion formula rewards -- and unlike a rake it is a real
   object doing a real job, so it cannot read as wallpaper.

   `level` escalates rather than switching: 0 = dark, 1 = slow amber-red sweep
   while the load is under control, 2 = fast hard-red strobe once it is not.
   ====================================================================== */
export const Beacon: React.FC<{ x: number; y: number; f: number; level?: number;
  z?: number; s?: number; len?: number; rate?: number;
  /** ⛔ ON A RED SET, A RED CONE IS A COLOUR CHANGE AT EQUAL LUMA — the audit is
      GREYSCALE and scores it at zero, and the eye reads it as haze rather than
      as a light. Pass a near-white here for the oxblood room. */
  hot?: string }> =
  ({ x, y, f, level = 1, z = 64, s = 1, len = 300, rate = 1, hot: hotC }) => {
  if (level <= 0) return null;
  const hot = level >= 2;
  const c = hotC ?? (hot ? "#FF5A44" : "#E8734A");
  const spin = f * (hot ? 11.5 : 5.2) * rate;
  const face = 0.5 + 0.5 * Math.cos((spin * Math.PI) / 180);
  return (<>
    {[0, 180].map((off, i) => {
      const a = (spin + off) % 360;
      const lit = Math.max(0, Math.cos(((a - 90) * Math.PI) / 180));
      if (lit <= 0.02) return null;
      return (
        <div key={"bc" + i} style={{ position: "absolute", left: x - 46 * s, top: y + 12 * s,
          width: 92 * s, height: len * s, zIndex: z - 2, opacity: lit * (hot ? 0.62 : 0.44),
          transform: `rotate(${a - 90}deg)`, transformOrigin: `50% ${-12 * s}px`,
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa(c, 0.85)} 0%, ${hexa(c, 0)} 100%)` }} />
      );
    })}
    <div style={{ position: "absolute", left: x - 26 * s, top: y - 30 * s, width: 52 * s,
      height: 34 * s, zIndex: z, borderRadius: `${26 * s}px ${26 * s}px 4px 4px`,
      background: `linear-gradient(180deg, ${mxh(c, 0.30 + face * 0.45)}, ${dkh(c, 0.30)})`,
      boxShadow: SH }} />
    {Array.from({ length: 3 }, (_, i) => (
      <div key={"bg" + i} style={{ position: "absolute", left: x - 26 * s + i * 18 * s,
        top: y - 30 * s, width: 5 * s, height: 34 * s, zIndex: z + 1,
        background: hexa(dkh(IRON, 0.30), 0.75) }} />
    ))}
    <div style={{ position: "absolute", left: x - 32 * s, top: y + 2 * s, width: 64 * s,
      height: 13 * s, zIndex: z + 1, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.14)}, ${dkh(IRON, 0.46)})` }} />
    <div style={{ position: "absolute", left: x - 13 * s, top: y - 22 * s, width: 26 * s,
      height: 18 * s, borderRadius: "50%", zIndex: z + 2,
      background: hexa(mxh(c, 0.55), 0.30 + face * 0.65) }} />
  </>);
};

/** the gantry cable that hangs each brace from the ceiling — the rig's SOURCE
    (§10: a hand-off needs somewhere it came from). */
export const RigCables: React.FC<{ size: number; f: number; z?: number; tension?: number;
  only?: string[] }> = ({ size, f, z = 24, tension = 0, only }) => (<>
  {BRACES.filter((b) => b.front && (!only || only.includes(b.id))).map((b, i) => {
    const x = (b.bx + b.bw / 2) * size;
    const sway = Math.sin(f / 27 + i) * 3 * (1 - tension);
    return (
      <div key={"cb" + b.id} style={{ position: "absolute", left: x + sway, top: -size * 1.70,
        width: 3, height: size * 1.70 + b.by * size, zIndex: z,
        background: `linear-gradient(180deg, ${hexa("#2A2E36", 0.30)}, ${hexa("#20242B", 0.86)})`,
        transform: `rotate(${sway * 0.4 + tension * (b.bx < 0 ? -2.4 : 2.4)}deg)`,
        transformOrigin: "50% 0%" }} />
    );
  })}
</>);

/** THE RIG, assembled around a body of `size` at (x, groundY). */
export const Rig: React.FC<{
  f: number; x: number; y: number; size: number; z?: number;
  /** 0 = still up on the gantry, 1 = seated and clamped */
  drop?: number;
  /** brace ids that have been cut away */
  gone?: string[];
  /** per-brace verdicts */
  state?: Record<string, "red" | "green" | "cut">;
  /** brace ids currently lit / legible */
  lit?: string[];
  /** which brace ids show their stencil (⛔ keep this to ONE or TWO) */
  tags?: string[];
  /** 0..1 how hard the two arm braces fight each other */
  fight?: number;
  /** 0..1 general clamp tension -> visible bend */
  tight?: number;
  cables?: boolean;
  /** degrees of pendulum swing about the cable anchor */
  sway?: number;
  /** ⛔⛔ THE RIG STRADDLES THE HERO, IT DOES NOT SIT IN FRONT OF HIM. v0 wrapped
      the whole rig in one z=46 div, so its own internal z ordering was
      irrelevant and the spine bars painted OVER a mascot at z=40 — the hero
      vanished behind his own cage. The two halves are now two sibling wrappers
      at `zBack` and `zFront`, and the call site puts the Mascot between them.
      Same class as reel 104's three zIndex bugs: when something looks wrong,
      check the STACKING CONTEXT before you touch its values. */
  zBack?: number; zFront?: number;
}> = ({ f, x, y, size, z = 46, zBack, zFront, drop = 1, gone = [], state = {}, lit, tags = [],
        fight = 0, tight = 0, cables = true, sway = 0 }) => {
  const zB = zBack ?? z - 12, zF = zFront ?? z + 6;
  /* ⭐ THE LIFT IS 1.40 x size, AND IT WAS TUNED TWICE.
     At 1.55 the hanging rig sat entirely above the panel, so frame 0 promised
     nothing and the drop appeared to come from nowhere — THE-OPEN law 3 is
     RECOGNITION, and a threat you cannot see is not one.
     At 1.15 it hung too low and covered the SpecBoard's headline, which breaks
     law 4 (mute-readable) and splits the one contiguous cream mass HOOK_PLATE
     is measuring. At 1.40 only the rig's lower third is in frame — enough to
     read as a cage waiting on the gantry — and the fall is 462px against a
     323px rig = 1.43x its own height, comfortably over §11's floor. */
  const dy = (1 - drop) * -size * 1.40;
  const jd = fight > 0 ? judder(f, 0, 13 * fight, 9999) : 0;
  const brace = (b: BraceDef) => {
    const isFighter = fight > 0 && (b.id === "r1" || b.id === "r2");
    return (
      <RigBrace key={b.id} b={b} f={f} size={size}
        on={lit ? (lit.includes(b.id) ? 1 : 0.40) : 1}
        state={state[b.id] ?? "idle"}
        pull={isFighter ? fight * (b.id === "r1" ? -1 : 1) : tight * 0.35}
        showTag={tags.includes(b.id)} z={4} />
    );
  };
  const live = BRACES.filter((b) => !gone.includes(b.id));
  /* ⭐ A HANGING LOAD SWINGS. A rig on cables that travels in a perfectly
     straight line reads as a div animating, which is exactly the "just standard
     linear motion" note. `sway` is a slow pendulum about the CABLE ANCHOR that
     decays as the load seats, so the descent has a second axis the eye can read
     without any extra objects. */
  const Half: React.FC<{ zi: number; children: React.ReactNode }> = ({ zi, children }) => (
    <div style={{ position: "absolute", left: x, top: y - size, width: 0, height: 0, zIndex: zi }}>
      <div style={{ position: "absolute",
        transform: `translateY(${dy}px) rotate(${sway}deg)`,
        transformOrigin: `50% ${-dy - size * 0.9}px` }}>{children}</div>
    </div>
  );
  return (<>
    {/* ---- BEHIND the hero: the cables, the spine bars, the base ring ------ */}
    <Half zi={zB}>
      {cables && <RigCables size={size} f={f} tension={tight} />}
      {live.filter((b) => !b.front).map(brace)}
      <div style={{ position: "absolute", left: -size * 0.72, top: size * 1.06,
        width: size * 1.45, height: size * 0.09, zIndex: 2, borderRadius: 5,
        background: `linear-gradient(180deg, ${IRON}, ${dkh(IRON, 0.50)})`, boxShadow: SH }} />
    </Half>

    {/* ---- IN FRONT of the hero: the yoke, the uprights, the clamping braces */}
    <Half zi={zF}>
      {/* the shoulder yoke — the one continuous member that says CAGE.
          ⛔ PROPORTION: 1.41 x size wide. At size 330 that is 465px = 46% of the
          panel, so the silhouette has air on both sides (reel 110: a prop at 97%
          of panel width cannot read as itself). */}
      <div style={{ position: "absolute", left: -size * 0.70, top: size * 0.14,
        width: size * 1.41, height: size * 0.10, zIndex: 6,
        borderRadius: 5, transform: `rotate(${jd * 0.18}deg)`,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${IRON} 44%, ${dkh(IRON, 0.40)} 100%)`,
        boxShadow: SH_D }} />
      {[-0.70, 0.64].map((k, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: k * size, top: size * 0.14,
          width: size * 0.07, height: size * 0.98, zIndex: 5, borderRadius: 4,
          transform: `rotate(${(i ? 1 : -1) * tight * 1.6}deg)`, transformOrigin: "50% 0%",
          background: `linear-gradient(90deg, ${dkh(IRON, 0.34)}, ${IRON} 52%, ${dkh(IRON, 0.22)})`,
          boxShadow: SH }} />
      ))}
      {live.filter((b) => b.front).map(brace)}
      {/* the stencils LAST and untransformed, so nothing can paint over them */}
      {live.filter((b) => tags.includes(b.id)).map((b) => (
        <BraceStencil key={"st" + b.id} b={b} size={size} state={state[b.id] ?? "idle"} />
      ))}
    </Half>
  </>);
};

/* =========================================================================
   THE SPEC BOARD — the lit cream board on the back wall.

   ⭐⭐⭐ THIS IS THE OBJECT THAT CARRIES `HOOK_LUMA` AND `HOOK_PLATE`, and that
   is its whole job. Reel 110's most reusable finding: when a prop looks wrong
   and you cannot say why, ask what GATE it is being asked to satisfy — a
   barbell carrying both frame-0 gates came out 4.3x too big and painted pale.
   Give that job to a different object. This is that object: ONE contiguous
   cream mass, ~30% of the panel, on the wall BEHIND the action, which leaves
   the rig free to be dark steel at its real proportions.
   ====================================================================== */
export const SpecBoard: React.FC<{ x: number; y: number; w?: number; h?: number; f?: number;
  z?: number; lit?: number; head?: string; sub?: string; num?: string }> =
  ({ x, y, w: ww = 470, h: hh = 300, f = 0, z = 16, lit = 1, head, sub, num }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    borderRadius: 10, overflow: "hidden",
    background: `linear-gradient(172deg, ${mxh(CREAM, 0.66)} 0%, ${mxh(CREAM, 0.20)} 40%, ${dkh(CREAM, 0.06)} 100%)`,
    border: `7px solid ${dkh("#8C7A50", 0.24)}`, boxShadow: SH_D, opacity: 0.36 + lit * 0.64 }}>
    {/* the ruled grid — a spec board is ruled, and it survives the downsample */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"gl" + i} style={{ position: "absolute", left: 0, right: 0, top: 26 + i * (hh / 7.6),
        height: 2, background: hexa("#8C7A50", 0.055) }} />
    ))}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"gv" + i} style={{ position: "absolute", top: 0, bottom: 0, left: 34 + i * (ww / 4.4),
        width: 2, background: hexa("#8C7A50", 0.04) }} />
    ))}
    {num && (
      <div style={{ position: "absolute", right: 20, bottom: 8,
        fontFamily: MONO, fontWeight: 900, fontSize: hh * 0.46, lineHeight: 1,
        color: hexa("#3A3018", 0.11) }}>{num}</div>
    )}
    {head && (
      <div style={{ position: "absolute", left: 44, right: 30, top: hh * 0.20,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: Math.round(hh * 0.17),
        letterSpacing: "-0.02em", lineHeight: 1.02, color: "#2A2416" }}>{head}</div>
    )}
    {sub && (
      <div style={{ position: "absolute", left: 46, right: 30, top: hh * 0.20 + hh * 0.21,
        fontFamily: MONO, fontWeight: 800, fontSize: Math.round(hh * 0.078),
        letterSpacing: "0.13em", color: hexa("#5A4A28", 0.85) }}>{sub}</div>
    )}
    {/* the lamp wash across the top — a practical, not a palette lift */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * 0.44,
      background: `linear-gradient(180deg, ${hexa("#FFFBF0", 0.72 * lit)}, transparent)` }} />
  </div>
);

/* =========================================================================
   THE OUTPUT LINE — the belt, the parts, and the reject bin.
   ⭐ The belt is the reel's continuous BACKGROUND PROCESS in S1 and S13, and
   the ONLY object that appears in both: S1 fills the bin, S13 leaves it empty.
   ⛔ Parts are >= 40px on the short side or they vanish in the 1012->240
      downsample (ANIMATION-QUALITY §11).
   ====================================================================== */
export const Part: React.FC<{ x: number; y: number; s?: number; bad?: number; z?: number;
  f?: number; c?: string }> = ({ x, y, s = 1, bad = 0, z = 52, f = 0, c = GOLD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 62 * s, height: 46 * s, zIndex: z,
    transform: `rotate(${bad ? Math.sin(f / 5) * 16 * bad : 0}deg) skewX(${bad * -14}deg)`,
    borderRadius: 5,
    background: bad
      ? `linear-gradient(160deg, ${mxh(RED, 0.16)}, ${dkh(RED, 0.36)})`
      : `linear-gradient(160deg, ${mxh(c, 0.30)}, ${dkh(c, 0.28)})`,
    boxShadow: SH }}>
    <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 6 * s, height: 7 * s,
      borderRadius: 3, background: hexa("#FFFFFF", bad ? 0.14 : 0.34) }} />
    <div style={{ position: "absolute", left: 8 * s, top: 22 * s, width: 16 * s, height: 16 * s,
      borderRadius: "50%", background: hexa("#100E0A", 0.30) }} />
    {bad > 0 && (
      <div style={{ position: "absolute", left: 30 * s, top: 20 * s, width: 22 * s, height: 5 * s,
        background: hexa("#FFD9CE", 0.5), transform: "rotate(38deg)" }} />
    )}
  </div>
);

export const Belt: React.FC<{ x: number; y: number; w: number; f: number; speed?: number;
  z?: number; c?: string }> = ({ x, y, w: ww, f, speed = 3.2, z = 44, c = STEELD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: 46, zIndex: z,
    borderRadius: 6, overflow: "hidden",
    background: `linear-gradient(180deg, ${mxh(c, 0.16)}, ${dkh(c, 0.30)})`, boxShadow: SH }}>
    {Array.from({ length: Math.ceil(ww / 46) + 2 }, (_, i) => (
      <div key={"cl" + i} style={{ position: "absolute", top: 0, bottom: 0,
        left: ((i * 46 + f * speed) % (ww + 46)) - 46, width: 22,
        background: hexa("#0B0D12", 0.34) }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 6,
      background: hexa("#FFFFFF", 0.13) }} />
  </div>
);

export const RejectBin: React.FC<{ x: number; y: number; fill: number; f: number; z?: number;
  s?: number }> = ({ x, y, fill, f, z = 56, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 186 * s, height: 132 * s, zIndex: z }}>
    {/* the bin body */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 8,
      background: `linear-gradient(174deg, ${dkh(STEELD, 0.10)}, ${dkh(STEELD, 0.44)})`,
      border: `4px solid ${dkh(STEELD, 0.52)}`, boxShadow: SH_D }} />
    {/* the diagonal reject hazard band — STRUCTURE says category, not hue */}
    {/* ⛔ THE HAZARD BAND IS A LABEL, NOT THE OBJECT. At 0.42 opacity across the
        full height the EMPTY bin in S13 still read as a red barrier, which
        fights the one thing that scene exists to show. It is now a band across
        the bin's upper third only. */}
    <div style={{ position: "absolute", left: 4 * s, right: 4 * s, top: 8 * s, height: 30 * s,
      overflow: "hidden", borderRadius: 3 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: -26 + i * 30, top: 0, bottom: 0,
          width: 13, background: hexa(RED, 0.46), transform: "skewX(-24deg)" }} />
      ))}
    </div>
    {/* what is IN it. ⭐ S13's whole claim is that this stays empty. */}
    {Array.from({ length: Math.round(fill * 6) }, (_, i) => (
      <div key={"rj" + i} style={{ position: "absolute",
        left: 14 * s + (i % 3) * 56 * s, top: 132 * s - 44 * s - Math.floor(i / 3) * 38 * s,
        transform: `rotate(${(rnd(i, 3) - 0.5) * 40}deg)` }}>
        <Part x={0} y={0} s={0.74 * s} bad={1} f={f + i * 9} z={1} />
      </div>
    ))}
  </div>
);

/* =========================================================================
   THE TOKEN FURNACE + GAUGE — "burns more tokens for it to decide what to do".
   ⭐ The number MOVES to its value; it is never typeset at it
      ([[feedback_graphical_over_textual]]). The gauge is TEN SEGMENTS and the
      only numeral it ever shows is none.
   ====================================================================== */
export const TokenGauge: React.FC<{ x: number; y: number; lvl: number; f: number; z?: number;
  s?: number; w?: number }> = ({ x, y, lvl, f, z = 62, s = 1, w: ww = 300 }) => {
  const n = 10, lit = lvl * n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 54 * s, zIndex: z }}>
      <div style={{ position: "absolute", inset: -6, borderRadius: 8,
        background: dkh(STEELD, 0.42), border: `3px solid ${dkh(STEELD, 0.60)}`, boxShadow: SH }} />
      {Array.from({ length: n }, (_, i) => {
        const on = Math.max(0, Math.min(1, lit - i));
        const hot = i >= 7;
        return (
          <div key={"tg" + i} style={{ position: "absolute", left: 6 + i * ((ww - 12) / n),
            top: 6 * s, width: (ww - 12) / n - 6, height: 42 * s, borderRadius: 3,
            background: on > 0.04
              ? (hot ? mxh(RED, 0.10 + Math.sin(f / 6 + i) * 0.06) : mxh(GOLD, 0.06))
              : dkh(STEELD, 0.22),
            opacity: on > 0.04 ? 0.55 + on * 0.45 : 1 }} />
        );
      })}
    </div>
  );
};

export const Furnace: React.FC<{ x: number; y: number; f: number; on: number; z?: number;
  w?: number }> = ({ x, y, f, on, z = 30, w: ww = 260 }) => (<>
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: 74, zIndex: z,
    borderRadius: 5, background: dkh(STEELD, 0.50), boxShadow: SH }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"gr" + i} style={{ position: "absolute", left: x + 12 + i * ((ww - 24) / 7),
      top: y + 8, width: (ww - 24) / 7 - 8, height: 58, zIndex: z + 1, borderRadius: 3,
      background: on > 0.02
        ? hexa(mxh(RED, 0.24 + Math.sin(f / 5 + i * 1.4) * 0.16), 0.36 + on * 0.6)
        : dkh("#1A1410", 0.2) }} />
  ))}
  {on > 0.02 && (
    <div style={{ position: "absolute", left: x - 40, top: y - 150, width: ww + 80, height: 160,
      zIndex: z - 4,
      background: `linear-gradient(0deg, ${hexa("#E8823C", 0.30 * on)}, transparent)` }} />
  )}
</>);

/** a token coin dropping into the fire — the COST, made countable */
export const TokenCoin: React.FC<{ x: number; y: number; f: number; at: number; dist: number;
  z?: number; s?: number }> = ({ x, y, f, at, dist, z = 64, s = 1 }) => {
  const k = E(f, at, at + 16, 0, 1, IN_Q);
  if (k <= 0 || k >= 1) return null;
  return (
    <div style={{ position: "absolute", left: x + Math.sin(k * 3) * 10, top: y + k * dist,
      width: 26 * s, height: 26 * s, borderRadius: "50%", zIndex: z, opacity: 1 - k * 0.35,
      background: `linear-gradient(160deg, ${mxh(GOLD, 0.34)}, ${dkh(GOLD, 0.26)})`,
      transform: `scaleX(${Math.abs(Math.cos(k * 7))})`, boxShadow: SH }} />
  );
};

/* =========================================================================
   THE SLOT RANK — Anthropic's 80%, drawn as 8 of 10 slots going dark.
   ⭐ §4's translation table: a count of N is N REAL TILES you can count, never
      a numeral on a card. The `80%` mark appears ONCE, small, on the tally.
   ====================================================================== */
export const SlotRank: React.FC<{ x: number; y: number; f: number; cut: number; z?: number;
  w?: number; h?: number }> = ({ x, y, f, cut, z = 58, w: ww = 720, h: hh = 96 }) => {
  const n = R.slots, pitch = ww / n;
  return (<>
    <div style={{ position: "absolute", left: x - 10, top: y - 10, width: ww + 20, height: hh + 20,
      zIndex: z - 2, borderRadius: 8, background: dkh(STEELD, 0.46),
      border: `4px solid ${dkh(STEELD, 0.62)}`, boxShadow: SH_D }} />
    {Array.from({ length: n }, (_, i) => {
      const isCut = i < cut;
      const fall = isCut ? E(f, 0, 1, 1, 1, LIN) : 0;
      return (
        <div key={"sl" + i} style={{ position: "absolute", left: x + i * pitch + 5, top: y,
          width: pitch - 10, height: hh, zIndex: z, borderRadius: 5,
          background: isCut
            ? `linear-gradient(180deg, ${dkh(STEELD, 0.44)}, ${dkh(STEELD, 0.70)})`
            : `linear-gradient(180deg, ${mxh(GOLD, 0.26)}, ${dkh(GOLD, 0.24)})`,
          border: `3px solid ${isCut ? dkh(STEELD, 0.66) : dkh(GOLD, 0.42)}`,
          opacity: isCut ? 0.88 : 1, boxShadow: SH }}>
          {!isCut && (
            <div style={{ position: "absolute", left: 5, right: 5, top: 6, height: 9,
              borderRadius: 3, background: hexa("#FFF3D2", 0.55) }} />
          )}
          {isCut && (
            <div style={{ position: "absolute", left: -4, right: -4, top: hh * 0.44, height: 5,
              background: hexa(RED, 0.55), transform: "rotate(-8deg)" }} />
          )}
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   THE PRESS — stamps OVER-CONSTRAINING in S6 and SMART in S14.
   ⭐ The same object doing both is the reel's rhyme: the thing that named the
      problem is the thing that hands you the way out.
   ⛔ v0 authored a ram that could not reach its own target (reel 112 did this
      twice). `travel` below is measured from the ram's REST y to the plate TOP.
   ====================================================================== */
export const Press: React.FC<{ x: number; y: number; f: number; at: number; t: string;
  z?: number; s?: number; c?: string; fg?: string; travel?: number; w?: number }> =
  ({ x, y, f, at, t, z = 66, s = 1, c = CREAM, fg = "#241F17", travel = 300, w: ww = 700 }) => {
  /* ⛔⛔ THE RAM MUST CLEAR ITS OWN STAMP. v1's ram sat at `y - travel + down*travel`
     with a height of `travel + 24`, so its bottom edge was at `y + 24` at FULL
     RETRACTION and somewhere across the middle of the plate at every other
     moment — it covered the word it had just stamped, and the contact sheet
     showed the plate as two white rectangles with a grey box between them.
     Now the ram's HEAD is what travels and the shaft runs UP out of frame, so
     at down=0 the head sits at `y - travel` and nothing overlaps the face. */
  const down = E(f, at, at + 5, 0, 1, IN_Q) - E(f, at + 8, at + 20, 0, 1, OUT);
  const stamped = f >= at + 5 ? 1 : 0;
  const w = ww * s, h = 150 * s;
  const headH = 54 * s, headW = 210 * s;
  const headY = y - travel * s + down * (travel * s - headH * 0.4);
  /* the face size is solved from the plate's own width, so a long word cannot
     overflow it. "OVER-CONSTRAINING" is 17 chars in a 700px plate. */
  const fs = Math.round(Math.min(60 * s, (w - 56 * s) / Math.max(6, t.length) * 1.62));
  return (<>
    {/* the ram's shaft, running up out of frame — the SOURCE of the blow */}
    <div style={{ position: "absolute", left: x + w * 0.5 - 40 * s, top: -60,
      width: 80 * s, height: headY + 60, zIndex: z + 3, borderRadius: 3,
      background: `linear-gradient(90deg, ${dkh(IRON, 0.36)}, ${IRON} 46%, ${dkh(IRON, 0.46)})` }} />
    {/* the plate being stamped */}
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 8, background: `linear-gradient(172deg, ${mxh(c, 0.28)}, ${dkh(c, 0.12)})`,
      border: `6px solid ${dkh(c, 0.28)}`, boxShadow: SH_D,
      transform: `scaleY(${1 - down * 0.05})`, transformOrigin: "50% 100%" }}>
      {stamped > 0 && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: fs, letterSpacing: "-0.015em", color: fg, whiteSpace: "nowrap",
          transform: `scale(${1 + E(f, at + 5, at + 13, 0.12, 0, OUT)})` }}>{t}</div>
      )}
    </div>
    {/* the ram HEAD */}
    <div style={{ position: "absolute", left: x + w * 0.5 - headW / 2, top: headY,
      width: headW, height: headH, zIndex: z + 4, borderRadius: 4,
      background: `linear-gradient(180deg, ${mxh(IRON, 0.20)}, ${IRON} 52%, ${dkh(IRON, 0.50)})`,
      boxShadow: SH_D }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: 18 * s + i * (headW - 44 * s) / 4,
          top: headH * 0.32, width: 12 * s, height: 12 * s, borderRadius: "50%",
          background: dkh(IRON, 0.52) }} />
      ))}
    </div>
    <Ring x={x + w * 0.5} y={y + 10} f={f} at={at + 5} c={c} max={320} dur={18} />
    <Puff x={x + w * 0.5} y={y + h} f={f} at={at + 5} c={"#C9BFA6"} n={9} s={1.4} />
  </>);
};

/* =========================================================================
   THE PROMPT CARTRIDGE — the one prompt you paste, as an OBJECT.
   ⛔ Alex's standing ruling (reel 86 round 2, and reels 85 + 68): CREATIVE
      OBJECTS, NOT UI. No fake terminal, no fake Claude Code screenshot. The
      recognition comes from the shape and the keyword, not from a screenshot.
   ====================================================================== */
export const Cartridge: React.FC<{ x: number; y: number; f: number; z?: number; s?: number;
  seated?: number; label?: string }> = ({ x, y, f, z = 70, s = 1, seated = 0, label = KEYWORD }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 214 * s, height: 128 * s, zIndex: z,
    transform: `rotate(${(1 - seated) * -9}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 10,
      background: `linear-gradient(162deg, ${mxh(CLAY, 0.30)}, ${dkh(CLAY, 0.26)})`,
      border: `5px solid ${dkh(CLAY, 0.42)}`, boxShadow: SH_D }} />
    {/* the contact fingers — structure is what says CATEGORY */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"cf" + i} style={{ position: "absolute", left: 16 * s + i * 32 * s,
        bottom: -13 * s, width: 20 * s, height: 20 * s, borderRadius: 2,
        background: `linear-gradient(180deg, ${mxh(GOLD, 0.22)}, ${dkh(GOLD, 0.30)})` }} />
    ))}
    <div style={{ position: "absolute", left: 14 * s, right: 14 * s, top: 16 * s, height: 44 * s,
      borderRadius: 5, background: hexa("#1A140F", 0.34) }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 70 * s, textAlign: "center",
      fontFamily: MONO, fontWeight: 900, fontSize: 34 * s, letterSpacing: "0.14em",
      color: "#FCF4E4" }}>{label}</div>
    {seated > 0.5 && (
      <div style={{ position: "absolute", left: 14 * s, right: 14 * s, top: 22 * s, height: 32 * s,
        borderRadius: 4, background: hexa(GOLD, 0.30 + Math.sin(f / 5) * 0.16) }} />
    )}
  </div>
);

/* =========================================================================
   TOOLS — the sledge that is taken away, and the cutter that replaces it.
   ⭐ S8/S9 are §10's "a hand-off needs a SOURCE": the crib wall is in frame.
   ====================================================================== */
export const Sledge: React.FC<{ x: number; y: number; rot?: number; z?: number; s?: number;
  bright?: boolean }> = ({ x, y, rot = 0, z = 74, s = 1, bright = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "12% 84%" }}>
    {/* the shaft, with a bound grip at the bottom */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 24 * s, height: 250 * s,
      borderRadius: 6, background: `linear-gradient(90deg, ${dkh(RUST, 0.34)}, ${mxh(RUST, 0.18)} 46%, ${dkh(RUST, 0.28)})`,
      boxShadow: SH }} />
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"gr" + i} style={{ position: "absolute", left: -3 * s, top: (176 + i * 15) * s,
        width: 30 * s, height: 8 * s, borderRadius: 2, background: dkh(RUST, 0.52) }} />
    ))}
    {/* ⭐ THE HEAD IS BRIGHT STEEL WHEN `bright`. A dark head on a dark crib wall
        is the "light on light" failure inverted — same swept area, no luma
        delta, and the audit and the eye agree that nothing happened. */}
    <div style={{ position: "absolute", left: -52 * s, top: -34 * s, width: 128 * s, height: 68 * s,
      borderRadius: 6,
      background: bright
        ? `linear-gradient(180deg, ${mxh(STEEL, 0.46)} 0%, ${mxh(STEEL, 0.16)} 50%, ${dkh(STEEL, 0.34)} 100%)`
        : `linear-gradient(180deg, ${mxh(IRON, 0.22)}, ${dkh(IRON, 0.44)})`,
      boxShadow: SH_D }} />
    {/* the head's two faces, so it reads as a forged block not a lozenge */}
    <div style={{ position: "absolute", left: -52 * s, top: -34 * s, width: 22 * s, height: 68 * s,
      borderRadius: "6px 0 0 6px",
      background: bright ? dkh(STEEL, 0.22) : dkh(IRON, 0.50) }} />
    <div style={{ position: "absolute", left: 54 * s, top: -34 * s, width: 22 * s, height: 68 * s,
      borderRadius: "0 6px 6px 0",
      background: bright ? dkh(STEEL, 0.30) : dkh(IRON, 0.56) }} />
  </div>
);

export const Cutter: React.FC<{ x: number; y: number; f: number; rot?: number; z?: number;
  s?: number; on?: number }> = ({ x, y, f, rot = 0, z = 74, s = 1, on = 0 }) => (
  /* ⛔ CATEGORY IS STRUCTURE, NOT HUE (§11). v1's cutter was a grey bar with a
     40x58 dark-green rectangle stuck under it, and at s=2.1 that rectangle read
     as a floating green slab rather than a grip. What makes a hand tool read is
     the FEATURES: a barrel, a machined collar, a shaped pistol grip with finger
     swells, a trigger, a hose gland and a nozzle. */
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "20% 70%" }}>
    {/* the barrel */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 152 * s, height: 36 * s,
      borderRadius: 7 * s, background: `linear-gradient(180deg, ${mxh(IRON, 0.30)}, ${IRON} 46%, ${dkh(IRON, 0.44)})`,
      boxShadow: SH }} />
    {/* two machined collars */}
    {[38, 96].map((k, i) => (
      <div key={"co" + i} style={{ position: "absolute", left: k * s, top: -4 * s,
        width: 13 * s, height: 44 * s, borderRadius: 2,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)}, ${dkh(IRON, 0.40)})` }} />
    ))}
    {/* the tapered nozzle */}
    <div style={{ position: "absolute", left: 146 * s, top: 9 * s, width: 62 * s, height: 17 * s,
      background: `linear-gradient(90deg, ${IRON}, ${dkh(IRON, 0.36)})`,
      clipPath: "polygon(0 0, 100% 26%, 100% 74%, 0 100%)" }} />
    {/* the pistol grip: angled, with three finger swells */}
    <div style={{ position: "absolute", left: 26 * s, top: 32 * s, width: 34 * s, height: 74 * s,
      borderRadius: `${5 * s}px ${5 * s}px ${13 * s}px ${9 * s}px`,
      transform: "rotate(9deg)",
      background: `linear-gradient(90deg, ${dkh(RUST, 0.42)}, ${dkh(RUST, 0.14)} 44%, ${dkh(RUST, 0.50)})`,
      boxShadow: SH }} />
    {[0, 1, 2].map((i) => (
      <div key={"fg" + i} style={{ position: "absolute", left: 24 * s, top: (44 + i * 19) * s,
        width: 9 * s, height: 11 * s, borderRadius: "50%", background: dkh(RUST, 0.56) }} />
    ))}
    {/* the trigger */}
    <div style={{ position: "absolute", left: 58 * s, top: 38 * s, width: 20 * s, height: 9 * s,
      borderRadius: 3, background: dkh(STEEL, 0.34) }} />
    {/* the hose gland at the back */}
    <div style={{ position: "absolute", left: -20 * s, top: 6 * s, width: 24 * s, height: 24 * s,
      borderRadius: 4, background: dkh(IRON, 0.46) }} />
    {on > 0.02 && (<>
      <div style={{ position: "absolute", left: 206 * s, top: 11 * s, width: 74 * s * on,
        height: 13 * s, borderRadius: 6,
        background: `linear-gradient(90deg, ${mxh(GREEN, 0.55)}, ${hexa(GREEN, 0)})` }} />
      <div style={{ position: "absolute", left: 200 * s, top: 5 * s, width: 25 * s, height: 25 * s,
        borderRadius: "50%", background: hexa(mxh(GREEN, 0.55), 0.45 + Math.sin(f / 3) * 0.22) }} />
    </>)}
  </div>
);

/* =========================================================================
   THE INSPECTION LAMP — a swinging practical. The ONLY thing in the reel that
   moves the light direction, and it is a LIGHT, not a camera move.
   ====================================================================== */
export const SwingLamp: React.FC<{ x: number; y: number; f: number; len?: number; z?: number;
  c?: string; on?: number; amp?: number }> =
  ({ x, y, f, len = 190, z = 34, c = "#DCEFF2", on = 1, amp = 15 }) => {
  const a = Math.sin(f / 21) * amp;
  const rad = (a * Math.PI) / 180;
  const lx = x + Math.sin(rad) * len, ly = y + Math.cos(rad) * len;
  return (<>
    <div style={{ position: "absolute", left: x - 1.5, top: y, width: 3, height: len, zIndex: z,
      background: hexa("#20242B", 0.8), transform: `rotate(${-a}deg)`, transformOrigin: "50% 0%" }} />
    <div style={{ position: "absolute", left: lx - 34, top: ly, width: 68, height: 40, zIndex: z + 2,
      borderRadius: "50% 50% 22% 22%",
      background: `linear-gradient(180deg, ${dkh(IRON, 0.20)}, ${dkh(IRON, 0.50)})`, boxShadow: SH }} />
    {on > 0.02 && (
      <div style={{ position: "absolute", left: lx - 12, top: ly + 30, width: 24, height: 24,
        borderRadius: "50%", zIndex: z + 3, background: hexa(c, 0.9 * on) }} />
    )}
    {on > 0.02 && <Beam x={lx} y={ly + 34} top={60} bot={430} len={430} c={c} o={0.24 * on} z={z - 6} f={f} />}
  </>);
};

/* =========================================================================
   THE SCAN LINE — the audit. ⛔⛔ A BEAM WITH NO FINDINGS IS A PROGRESS BAR
   (ANIMATION-QUALITY §10). This one always ships with `Verdict` marks.
   ====================================================================== */
export const ScanLine: React.FC<{ x: number; w: number; y0: number; y1: number; f: number;
  at: number; dur: number; z?: number; c?: string }> =
  ({ x, w: ww, y0, y1, f, at, dur, z = 78, c = "#7DE0A8" }) => {
  const k = E(f, at, at + dur, 0, 1, LIN);
  if (k <= 0) return null;
  const y = y0 + (y1 - y0) * k;
  return (<>
    <div style={{ position: "absolute", left: x, top: y - 3, width: ww, height: 7, zIndex: z,
      background: hexa(mxh(c, 0.30), 0.92) }} />
    <div style={{ position: "absolute", left: x, top: y - 82, width: ww, height: 82, zIndex: z - 1,
      background: `linear-gradient(180deg, ${hexa(c, 0)}, ${hexa(c, 0.26)})` }} />
  </>);
};

/** the FINDING: a flag stabbed into a brace, or a tick beside it */
export const Verdict: React.FC<{ x: number; y: number; f: number; at: number; kind: "cut" | "keep";
  z?: number; s?: number }> = ({ x, y, f, at, kind, z = 84, s = 1 }) => {
  const k = E(f, at, at + 7, 0, 1, BACK);
  if (k <= 0) return null;
  const c = kind === "cut" ? RED : GREEN;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${k}) rotate(${(1 - k) * 30}deg)`, transformOrigin: "0% 100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 5 * s, height: 54 * s,
        background: dkh(c, 0.34) }} />
      <div style={{ position: "absolute", left: 4 * s, top: 0, width: 52 * s, height: 34 * s,
        background: `linear-gradient(160deg, ${mxh(c, 0.22)}, ${dkh(c, 0.20)})`,
        clipPath: "polygon(0 0, 100% 0, 78% 50%, 100% 100%, 0 100%)", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 14 * s, top: 8 * s, width: 20 * s, height: 18 * s }}>
        {kind === "keep" ? (
          <div style={{ position: "absolute", left: 2 * s, top: 6 * s, width: 17 * s, height: 6 * s,
            background: "#F4FBF6", transform: "rotate(-42deg)" }} />
        ) : (<>
          <div style={{ position: "absolute", left: 0, top: 7 * s, width: 20 * s, height: 5 * s,
            background: "#FDF1EE", transform: "rotate(42deg)" }} />
          <div style={{ position: "absolute", left: 0, top: 7 * s, width: 20 * s, height: 5 * s,
            background: "#FDF1EE", transform: "rotate(-42deg)" }} />
        </>)}
      </div>
    </div>
  );
};

/* =========================================================================
   THE BAY — the set itself: floor, back wall, gantry, work lamps, and the
   Occluder leg that crops the frame in EVERY scene.
   ⛔ "Is there a mass cropped by the panel edge, IN FRONT of the action?" is
      the one depth question the look gate cannot automate (§8). `RigLeg` is
      this reel's answer and it is in all fifteen scenes.
   ====================================================================== */
export const RigLeg: React.FC<{ side?: "l" | "r"; c?: string; z?: number; w?: number }> =
  ({ side = "l", c = "#2A2E36", z = 92, w: ww = 116 }) => {
  const L = side === "l";
  return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: ww, zIndex: z,
      [L ? "left" : "right"]: -14,
      background: `linear-gradient(${L ? 90 : 270}deg, ${dkh(c, 0.30)}, ${c} 62%, ${dkh(c, 0.42)})`,
      boxShadow: SH_D } as any}>
      {/* the flange bolts — real drawing, not a primitive */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"lg" + i} style={{ position: "absolute", top: 40 + i * 96,
          [L ? "right" : "left"]: 16, width: 26, height: 26, borderRadius: "50%",
          background: dkh(c, 0.50), border: `2px solid ${hexa(mxh(c, 0.30), 0.5)}` } as any} />
      ))}
      {/* the web cut-outs down the middle */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"wb" + i} style={{ position: "absolute", top: 90 + i * 176,
          [L ? "left" : "right"]: ww * 0.30, width: ww * 0.34, height: 104, borderRadius: 10,
          background: dkh(c, 0.44) } as any} />
      ))}
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "right" : "left"]: 0, width: 8,
        background: hexa(mxh(c, 0.40), 0.34) } as any} />
    </div>
  );
};

/** the ceiling gantry the rig hangs from — the SOURCE, always in frame */
export const Gantry: React.FC<{ y?: number; f: number; z?: number; c?: string; speed?: number }> =
  ({ y = 96, f, z = 18, c = "#343943", speed = 0 }) => (<>
    <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 34, zIndex: z,
      background: `linear-gradient(180deg, ${mxh(c, 0.18)}, ${dkh(c, 0.40)})`, boxShadow: SH }} />
    <div style={{ position: "absolute", left: -40, right: -40, top: y + 34, height: 10, zIndex: z,
      background: dkh(c, 0.56) }} />
    {/* the truss diagonals */}
    {Array.from({ length: 14 }, (_, i) => (
      <div key={"tr" + i} style={{ position: "absolute", left: -40 + i * 82, top: y - 40,
        width: 7, height: 46, zIndex: z - 1, background: dkh(c, 0.30),
        transform: `skewX(${i % 2 ? 24 : -24}deg)` }} />
    ))}
    {/* the trolley that crosses it: the ceiling's own background process */}
    {speed > 0 && (
      <div style={{ position: "absolute", left: ((f * speed) % 1200) - 100, top: y - 16,
        width: 92, height: 46, zIndex: z + 2, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(c, 0.30)}, ${dkh(c, 0.34)})`, boxShadow: SH }} />
    )}
  </>);

/** the bay's back wall: racking, panel seams, and a hazard stripe at floor level */
export const BayWall: React.FC<{ p: Place; f: number; z?: number; racks?: number }> =
  ({ p, f, z = 10, racks = 5 }) => (<>
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"sm" + i} style={{ position: "absolute", left: -20 + i * 140, top: 60,
        width: 5, height: p.horizon - 60, zIndex: z, background: hexa(dkh(p.back, 0.30), 0.55) }} />
    ))}
    {Array.from({ length: racks }, (_, i) => (
      <div key={"rk" + i} style={{ position: "absolute", left: 40 + i * 190, top: p.horizon - 168,
        width: 150, height: 150, zIndex: z + 1, borderRadius: 4,
        background: `linear-gradient(178deg, ${dkh(p.back, 0.14)}, ${dkh(p.back, 0.38)})`,
        border: `4px solid ${dkh(p.back, 0.44)}` }}>
        {Array.from({ length: 3 }, (_, j) => (
          <div key={"sh" + j} style={{ position: "absolute", left: 8, right: 8, top: 14 + j * 44,
            height: 30, background: hexa(dkh(p.back, 0.46), 0.7) }} />
        ))}
      </div>
    ))}
    <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon - 20, height: 20,
      zIndex: z + 3, overflow: "hidden" }}>
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: i * 56, top: 0, width: 26,
          height: 20, background: hexa(p.key, 0.30), transform: "skewX(-26deg)" }} />
      ))}
    </div>
  </>);
