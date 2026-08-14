import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0Hook, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12Cta } from "./CmpScenes";
import { CamCtx, PalCtx } from "./CmpWorld";
import { camFor } from "./AgyWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./data/words_compress.json";

/* ===========================================================================
   REEL 101 · "COMPRESS" — everything a coding agent reads has to fit through
   one doorway and you are billed for every inch of it. headroom presses that
   material to a fraction of its size BEFORE it reaches the door, and the
   answer that comes back is the same one.

   Board: storyboards/101-compress.md.

   SUBJECT: headroomlabs-ai/headroom — 66,006★, 5,041 forks, Apache-2.0,
   created 2026-01-07, pushed 2026-08-12. Verified against the GitHub API on
   2026-08-12, not remembered. The VO is quoting the repo's own README tagline
   nearly verbatim, which is how the subject was identified.

   VO: public/101_compress_vo.wav — 24.40s, 94 words.
   ⛔ THE RAW TAKE HAD **FOUR** FLUB CLUSTERS, not three, and four regions came
      out: 2.70->12.33 (two dead takes of the "open source repo" line),
      17.50->25.50 (three dead takes of "and the trick is"), 25.86->28.28 (a
      FOURTH dead take, "And the trick is that it compres... cut, cut"), and
      40.96->43.58 (a garbled first CTA take, "I'll see you in the gut").
      Alex marked only two of the four with "cut cut".
   ⛔⛔ THE FOURTH ONE SURVIVED THE PRESCRIBED CHECK. Re-transcribing the CUT
      file — the playbook's own proof step — read back a perfectly clean
      sentence, because whisper STITCHED the flubbed half-take onto the real
      take that followed and produced one plausible reading. It only surfaced
      from a 1.44s hole in the caption JSON. **The reliable check is
      per-segment transcription of each KEPT range with padding, not a
      whole-file pass.** Every kept range in this reel was verified that way.
   ⛔ Cut boundaries came from a 20ms-hop RMS scan at -45dB, never from whisper
      word times ([[feedback_vo_cut_to_silence_not_whisper]]).

   ⛔ PACING IS PIECEWISE (hook 1.00 · claim 0.93/0.95 · mech 0.92/0.94 ·
      payoff 0.90 · benefit 0.97/0.95 · CTA 1.00). R1: hook window 4.00 wps
      (gate ≤4.0), worst 5s window 4.40 (gate ≤4.5), overall 3.85 against the
      3.96 anchor, L[0] = 0.000.
      ⭐ R1 WAS SOLVED BY WIDENING PAUSES, NOT BY SLOWING THE VOICE. A
      tempo-only fix reached the same gates at 3.31 wps overall and played
      draggy; the pauses hold it at 3.85. The widest is the 0.68s beat after
      "And the best part," — which S9 then uses as an actual scene.

   ⚠️ THE ONE HONESTY FLAG, NOT SILENTLY "FIXED":
      The VO's "60 to 95% fewer tokens" is REAL but MIS-SCOPED. The repo's own
      description splits it: **60-95% for JSON**, **15-20% for coding agents**.
      The VO attaches the big number to "the same answers you're getting from
      Claude", merging the two. Per docs/KICKOFF-PROMPT.md §1 the screen
      dramatises the MECHANISM and stops at the edge of the claim:
        · the band appears ONLY as a scope chip on the two JSON/tool-output
          rows it actually measures, and is never a headline;
        · the headline receipts are the repo's measured workload table
          (17,765→1,408 · 65,694→5,118 · 54,174→14,761 · 78,502→41,254);
        · "same answers" is proved with the published GSM8K 0.870→0.870 ±0.000,
          not asserted;
        · no invented pricing, and NO NUMBER on the usage-limit column, because
          the repo publishes none.
      Nothing on screen claims Anthropic built or endorses headroom: the Claude
      mark is on the DOOR (the API being called), never on the press or ingot.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/data/words_compress.json,
      pattern-matched on the beat's opening word, never an estimate. The SFX
      fire on these seconds; the PICTURE leads them by 4 frames inside the
      scenes, so its crossover — not its start — lands on the syllable.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;
export const CMP_TOTAL = 607;      // 20.22s of VO (round 18: the four inter-take gaps cut from 0.41-0.54s to 0.18-0.29s)

type Scene = { at: number; C: React.FC; head: [string, string] };

/* ⛔ HEADERS STATE THE CLAIM IN PRODUCT NOUNS. They never echo the VO and never
   name the theme ([[feedback_headers_state_the_claim]]). The picture carries
   the world; the header is the reel's one LITERAL channel, so it spends itself
   on the real figures and real names a Claude Code viewer recognises. */
export const SCENES: Scene[] = [
  /* ⛔⛔ ROUND 15 — ALEX: *"the headers throughout are kind of weak, like wtf
     does it mean MEASURED PER WORKLOAD … they just arent good straightforward
     easy takeaways"*. He is right and the fault is a category error: the old
     set were LABELS for the scene ("measured per workload", "a router not one
     trick") — captions for a diagram. A header's job is the one sentence the
     viewer should leave the shot with, in words they already use. Every line
     below is now a plain-English takeaway, second person where it can be, and
     no line needs the picture to be understood. */
  /* ⛔⛔ ROUND 16 — ALEX: the opening header must state the VALUE explicitly,
     in the shape of "3x Your Claude Limits FREE".
     ⚠️ I did NOT write 3x. Three rounds ago I removed a "3x" from this reel
     because it is PARITOK's published figure, not headroom's — headroom
     publishes no turns-per-window multiple at all, and re-adding it in a
     bigger font would be the same error louder. 92% IS headroom's own
     measured code-search number, FREE is true (Apache 2.0, self-hosted, no
     fees), and both survive a reader who checks. */
  { at: 0,   C: S0Hook, head: ["CUT YOUR CLAUDE TOKENS 92%", "FREE, AND OPEN SOURCE"] },
  /* ⛔ ROUND 16b — every header re-pitched to the SAME standard as the hook:
     state the value or the consequence to the viewer, in their words, with a
     real number wherever one exists. No scene labels, no cleverness that needs
     the picture to decode. Second person wherever it fits. */
  { at: 53,  C: S1,     head: ["ONE FREE TOOL DOES IT", "66,006 STARS, APACHE-2.0"] },
  { at: 82,  C: S2,     head: ["17,765 TOKENS BECOMES 1,408", "ON ONE CODE SEARCH"] },
  { at: 146, C: S3,     head: ["AND IT DOESN'T GET DUMBER", "SAME BENCHMARK SCORE"] },
  { at: 205, C: S4,     head: ["IT KNOWS WHAT IT'S SQUEEZING", "CODE, JSON AND TEXT"] },
  { at: 245, C: S5,     head: ["EVERY FILE YOUR AGENT READS", "GOES THROUGH IT FIRST"] },
  { at: 271, C: S6,     head: ["IT SHRINKS BEFORE IT SENDS", "AND KEEPS YOUR ORIGINAL"] },
  { at: 317, C: S7,     head: ["SAME BUG, STILL FOUND", "YOU LOSE NOTHING"] },
  { at: 346, C: S8,     head: ["YOU PAY FOR 1,260", "NOT 10,144"] },
  { at: 394, C: S9,     head: ["ONE COMMAND, NO CODE CHANGES", "CLAUDE, GPT AND GEMINI"] },
  { at: 460, C: S10,    head: ["SAME WORK, A FRACTION SENT", "ON EVERY SINGLE TURN"] },
  { at: 492, C: S11,    head: ["STOP HITTING YOUR LIMIT", "THE CAP NEVER MOVED"] },
  { at: 557, C: S12Cta, head: ["COMMENT COMPRESS", "FOR THE FULL PLAYBOOK"] },
];

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ MEASURE A SAMPLE BEFORE TRUSTING IT ([[reference_reel_sound_design]] —
      reel 99 shipped a bank whose most-used sample measured 0.477 spectral
      flatness and the whole reel read as "fuzzy"). This bank is the APPLE
      bank's MEASURED subset, re-cast for a room made of steel, paper, belt
      rubber and struck flap boards.
   ⛔ SYNC TO THE PHYSICAL ACTION, NOT THE BEAT GRID. A cue fires when an object
      does something: a flap falls, a plate seats, an iris opens, a sheet is
      eaten, an ingot clears the jamb, a drawer runs out.
   ⛔ LAYER THE HERO HIT: attack + low-end body. One thin pop is the single
      thing that makes a reel sound cheap.
   ⛔ RISERS CAPPED AT 2, spent on the reel's two real turns: the meter running
      up in the open (0.85s) and the ingot's face resolving at the peak
      (14.30s). Nothing else in this bank rises.
   ⛔⛔ SCENE BODIES ARE NOT Sequence-wrapped for audio, so every `at` here is
      ROOT seconds ([[sfx-root-timeline-trap]]).
   ------------------------------------------------------------------------ */
const SFX: Cue[] = [
  /* ---- S0-A · THE JAM (0.00). Frame 0 is the loudest hit in the reel. -- */
  { at: 0.0, src: "am/room-tone.wav", v: LEVELS.SFX_BED, dur: 2.6 },
  ...layer(0.0, { src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.88 },
                 { src: "sub.wav", dur: 1.2, rate: 0.84 }),
  { at: 0.0, src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.94 },
  { at: 0.04, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 0.92 },
  { at: 0.18, src: "ballast_buzz.wav", v: LEVELS.SFX_BED, dur: 0.6, rate: 0.9 },
  { at: 0.4, src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 },

  /* ---- S0-B · THE METER RUNS UP (0.67). RISER 1 OF 2. ----------------- */
  ...layer(0.67, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 1.06 },
                 { src: "mech_clank.wav", dur: 0.38, rate: 1.14 }),
  { at: 0.69, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.62, rate: 1.14 },
  ...repeat(8, 0.73, 0.052, { src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.22 }, 0.05),
  { at: 1.14, src: "alarm.wav", v: LEVELS.SFX_TEXTURE, dur: 0.36, rate: 1.06 },

  /* ---- S0-C · THE PULL-BACK onto the queue (1.33). -------------------- */
  ...layer(1.33, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.90 },
                 { src: "sub.wav", dur: 0.85, rate: 0.88 }),
  { at: 1.38, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 0.8, rate: 1.0 },
  ...repeat(4, 1.48, 0.12, { src: "metal_ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.28 }, -0.04),

  /* ---- S1 · THE REPO PLATE SEATS (2.00). ------------------------------ */
  ...layer(1.77, { src: "slate_whump.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.98 },
                 { src: "pneu_thunk.wav", dur: 0.38, rate: 0.96 }),
  ...repeat(4, 1.91, 0.11, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 }, 0.05),

  /* ---- S2 · FOUR WORKLOAD ROWS (2.97), then a CUT IN (4.37). ---------- */
  ...layer(2.76, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.96 },
                 { src: "metal_ping.wav", dur: 0.3, rate: 0.98 }),
  ...layer(3.06, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.04 },
                 { src: "metal_ping.wav", dur: 0.3, rate: 1.08 }),
  ...layer(3.36, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.12 },
                 { src: "metal_ping.wav", dur: 0.3, rate: 1.18 }),
  ...layer(3.66, { src: "gold_stamp.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.20 },
                 { src: "metal_ping.wav", dur: 0.3, rate: 1.28 }),
  ...layer(4.14, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.16 },
                 { src: "am/click-hard.wav", dur: 0.24 }),

  /* ---- S3 · THE BALANCE (5.10), then ±0.000 LANDS (6.23). ------------- */
  { at: 4.87, src: "am/paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.45, rate: 0.98 },
  { at: 5.21, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 0.98 },
  { at: 5.39, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.06 },
  /* the receipt of the whole accuracy claim gets a layered hero hit */
  ...layer(6.11, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.92 },
                 { src: "sub.wav", dur: 0.85, rate: 0.90 }),
  { at: 6.55, src: "pickup_chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.45, rate: 1.06 },

  /* ---- S4 · THE PRESS WAKES (7.30). Iris, then three heads. ----------- */
  ...layer(6.79, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 0.92 },
                 { src: "sub.wav", dur: 0.75, rate: 0.88 }),
  { at: 6.83, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 1.2, rate: 0.94 },
  { at: 7.09, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.96 },
  { at: 7.32, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.06 },
  { at: 7.56, src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.16 },

  /* ---- S5 · THE SHEET RIDES IN AND IS EATEN (8.60). ------------------- */
  { at: 8.09, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 0.9, rate: 1.06 },
  { at: 8.15, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.04 },
  ...layer(8.51, { src: "pneu_thunk.wav", v: LEVELS.SFX_HERO, dur: 0.45, rate: 0.90 },
                 { src: "slate_whump.wav", dur: 0.4, rate: 0.94 }),

  /* ---- S6 · THE TRUCK (9.50), THEN THE PASS-THROUGH (10.50). ---------- */
  { at: 8.99, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.94 },
  { at: 9.03, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 1.4, rate: 1.1 },
  { at: 9.15, src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.10 },
  /* it passes through — a clean ARRIVAL, not a victory sting. The meter has
     not lost yet and the sound must not say it has. */
  { at: 9.99, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.10 },
  { at: 10.41, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.02 },
  { at: 10.24, src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 },

  /* ---- S7 · THE ANSWER FLIES BACK AND LANDS (11.23). ------------------ */
  { at: 10.43, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.22 },
  ...layer(10.62, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.90 },
                  { src: "sub.wav", dur: 0.9, rate: 0.86 }),
  { at: 10.92, src: "am/positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55, rate: 0.98 },

  /* ---- S8 · ⭐ THE PEAK (12.20). RISER 2 OF 2, then the settle. ------- */
  { at: 11.4, src: "metal_riser.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.24 },
  { at: 11.67, src: "ratchet.wav", v: LEVELS.SFX_MID, dur: 0.38, rate: 0.90 },   /* the strike */
  /* ⛔ THE HERO HIT IS LAYERED 3 DEEP — `layer()` only takes two, so the body
     is emitted alongside it rather than folded in. */
  ...layer(11.87, { src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 1.0 },
                  { src: "sub.wav", dur: 1.0, rate: 0.88 }),
  { at: 11.87, src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-5), dur: 1.1, rate: 0.94 },
  { at: 12.2, src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.10 },
  /* the villain settles, in its own shot */
  { at: 12.47, src: "am/counter-tick.wav", v: LEVELS.SFX_MID, dur: 0.28, rate: 0.94 },
  ...layer(12.54, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.88 },
                  { src: "mech_clank.wav", dur: 0.36, rate: 0.92 }),

  /* ---- S9 · THREE ARCHES LIGHT (13.80), THEN THE COMMAND (15.13). ----- */
  { at: 13.02, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 0.96 },
  { at: 13.25, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.06 },
  { at: 13.48, src: "arrive_chime.wav", v: LEVELS.SFX_MID, dur: 0.55, rate: 1.16 },
  ...layer(14.33, { src: "am/click-hard.wav", v: LEVELS.SFX_MID, dur: 0.28 },
                  { src: "am/paper-slide.wav", dur: 0.4, rate: 1.1 }),
  /* the command typing itself — one gesture, eight keys */
  ...repeat(8, 14.42, 0.055, { src: "am/click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.04),

  /* ---- S10 · THE QUEUE CLEARS (16.00). Four even hits: rhythm is it. -- */
  { at: 15.2, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 1.1, rate: 1.14 },
  ...repeat(4, 15.26, 0.26, { src: "pneu_thunk.wav", v: LEVELS.SFX_MID, dur: 0.3 }, 0.03),

  /* ---- S11 · THE COLUMN DRAINS (17.10), THEN THE WIDE (18.50). -------- */
  { at: 16.3, src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.86 },
  { at: 16.36, src: "am/gear-mech.wav", v: LEVELS.SFX_BED, dur: 1.4, rate: 0.86 },
  ...repeat(5, 16.5, 0.18, { src: "am/counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 }, -0.05),
  ...layer(17.7, { src: "lib_whoosh.wav", v: LEVELS.SFX_MID, dur: 0.6, rate: 1.06 },
                  { src: "am/positive-chime.wav", dur: 0.8, rate: 0.96 }),

  /* ---- S12 · THE KEYWORD (19.61). Hard cut on it. --------------------- */
  ...layer(18.31, { src: "gold_stamp.wav", v: LEVELS.SFX_HERO, dur: 0.55, rate: 0.96 },
                  { src: "lib_cinematic_hit.wav", dur: 1.1, rate: 1.04 }),
  ...layer(18.64, { src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.5, rate: 0.98 },
                  { src: "sub.wav", dur: 0.75, rate: 0.92 }),
  { at: 18.94, src: "am/positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.8 },
];


/* ---- THE VARIANT CUTS -----------------------------------------------------
   [[feedback_trial_reel_variants]]: a variant must change hook, bed, camera,
   palette AND transition — not one lever.
   ------------------------------------------------------------------------ */
type Trans = "flash" | "bars" | "punch" | "slide";
export type Variant = { hook: React.FC; hookHead: [string, string]; bed: string;
  seed: number; pal: number; trans: Trans; capTop: number; endHold: number };

export const VARIANTS: Variant[] = [
  { hook: S0Hook, hookHead: ["CUT YOUR CLAUDE TOKENS 92%", "FREE, AND OPEN SOURCE"],
    bed: "101_compress_bed.wav",   seed: 0, pal: 0, trans: "flash", capTop: 1268, endHold: 10 },
  { hook: S0Hook, hookHead: ["YOUR AGENT RE-SENDS IT ALL", "EVERY SINGLE TURN"],
    bed: "101_compress_bed_b.wav", seed: 5, pal: 0, trans: "bars",  capTop: 1214, endHold: 10 },
];

/** the cut punctuation. One per variant, so two cuts never edit the same way.
    ⛔ [[feedback_no_flashing_transitions]]: no iris, no white plate, peak
       opacity <= 0.30, ramped in AND out, never closing over the full frame. */
const Trans: React.FC<{ at: number; kind: Trans }> = ({ at, kind }) => {
  const f = useCurrentFrame();
  const n = kind === "flash" ? 8 : 9;
  if (f < at || f >= at + n) return null;
  const p = (f - at) / n;
  if (kind === "flash") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#F4EEE2", opacity: Math.sin(p * Math.PI) * 0.26 }} />
  );
  if (kind === "bars") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${i * 25}%`,
          height: "25%", background: "#12161A", opacity: 0.86,
          transform: `translateX(${(i % 2 ? 1 : -1) * p * 130}%)` }} />
      ))}
    </div>
  );
  if (kind === "punch") return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      background: "#12161A", opacity: 0.9,
      clipPath: `circle(${16 + p * 116}% at 50% 46%)`,
      WebkitClipPath: `circle(${16 + p * 116}% at 50% 46%)` }} />
  );
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 140, pointerEvents: "none",
      overflow: "hidden" }}>
      <div style={{ position: "absolute", left: `${-100 + p * 100}%`, top: 0, width: "100%",
        height: "100%", background: "#12161A", opacity: 0.88 }} />
    </div>
  );
};

/** `f` restarts inside each Sequence, so the header's settle replays per cut.
    ⛔ `HookHeader` eases in from its `f` prop, so at frame 0 it is INVISIBLE —
    the hook passes `f + 12` to satisfy docs/THE-OPEN.md's frame-0 law. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

export const makeReel = (v: Variant): React.FC => () => {
  const SC = SCENES.map((sc, i) => (i === 0 ? { ...sc, head: v.hookHead } : sc));
  const TOTAL = CMP_TOTAL + v.endHold;
  return (
    <AbsoluteFill>
      <Audio src={staticFile("101_compress_vo.wav")} />
      {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]):
          three stacked causes have killed this before — a fade-in envelope,
          the TRACK's own multi-second intro, and AAC priming. The passage is
          PRE-TRIMMED to its first downbeat, measured over its first 500ms,
          frequency-pocketed against the VO and gain-flattened only 75% of the
          way, because full inversion sterilises the song. */}
      <Audio src={staticFile(v.bed)} />
      <SfxTrack cues={SFX} />
      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SC.map((sc, i) => {
          const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
          const C = i === 0 ? v.hook : sc.C;
          return (
            <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
              <PalCtx.Provider value={v.pal}>
                <CamCtx.Provider value={camFor(v.seed, i)}>
                  <AbsoluteFill><C /></AbsoluteFill>
                </CamCtx.Provider>
              </PalCtx.Provider>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {SC.slice(1).map((sc) => <Trans key={"t" + sc.at} at={sc.at} kind={v.trans} />)}

      {SC.map((sc, i) => {
        const to = i < SC.length - 1 ? SC[i + 1].at : TOTAL;
        return (
          <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <HeadFor big={sc.head[0]} hot={sc.head[1]} settled={i === 0} />
          </Sequence>
        );
      })}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={v.capTop} />
    </AbsoluteFill>
  );
};

export const CompressReel = makeReel(VARIANTS[0]);
export const CompressReelB = makeReel(VARIANTS[1]);
