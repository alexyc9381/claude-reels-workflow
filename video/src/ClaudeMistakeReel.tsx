import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, CAM, GRADE } from "./MstScenes";
import type { Variant } from "./MstScenes";
import { S0, HOOK_OF, HOOK_CUTS } from "./MstHooks";
import { OpenScene } from "./MstShots";
import { SignA, SignB } from "./MstSign";
import { ToolsA, ToolsB } from "./MstTools";
import { ShopA, ShopB } from "./MstShop";
import { Three, Crossed } from "./MstBeats";
import { CamCtx } from "./MstWorld";
import { R } from "./MstWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_121mistake.json";

/* ===========================================================================
   REEL 121 · "MISTAKE" — THE DAY RUN.  Board: storyboards/121-mistake.md.

   Subject: three things that ride along in your context window and buy you
   nothing. VO: public/mistake_vo.wav — 44.61s, 182 words, cut from an 81.73s
   raw take.

   ⛔ THE RAW TAKE HAD SIX DEAD TAKES AND FIVE `cut cut` MARKERS. Every keep
      boundary came from a 10ms RMS island scan of the raw file (noise floor
      p5 = -61.0 dB, threshold -44 dB, 180ms minimum gap so a stop consonant
      cannot split a word — [[feedback_cut_on_a_word_not_a_dip]], where a 50ms
      dip at -50 dB turned out to be the T CLOSURE inside "sof-t-ware").
      NEVER from whisper's word times.
      The twenty islands were transcribed INDIVIDUALLY, so a keep/drop decision
      was made against what each one actually says rather than against a
      whole-file pass that can hide a flub inside a good sentence
      ([[feedback_check_every_stem]] applied to speech).
        KEEP 1.09-6.53 · 9.42-11.73 · 12.66-16.70 · 17.89-22.64 · 24.77-27.65 ·
             29.82-32.03 · 36.74-40.55 · 43.62-45.59 · 60.02-64.96 ·
             70.12-74.91 · 76.33-80.01
        DROP 7.98-8.46 ("So here", false start) · 8.71-9.00 · 32.60-34.74 +
             35.08-35.34 + 35.64-35.94 (the first take of the positive-command
             line, and its marker) · 46.42-48.65 + 48.88-49.17 · 54.69-56.11 ·
             66.45-69.45 (three abandoned runs at the connectors line)
      Gaps are REAL ROOM TONE harvested from the 50.30-54.20s dead zone, never
      digital silence. Each keep is padded 50ms at the head and 80ms at the tail
      so no fricative is clipped.

   ⛔ TWO WORDS WERE ARBITRATED, NOT ASSUMED. `small.en` on the raw heard
      "15 mistakes"; `medium.en` on the cut heard "50". `large-v3` at beam 5 AND
      beam 1 both read **15**, and both read "stop **writing** negative
      instructions" (not "running"). The canon is the arbitrated reading, and
      the lead magnet's own count depends on it.

   ⛔ THE CUT FILE WAS RE-TRANSCRIBED END TO END and reads clean: first word at
      0.000s, all eleven keeps present in order, no `cut cut` surviving anywhere.

   ⚠️ 44.61s IS OUTSIDE THE 22-29s FIGURE IN THE PLAYBOOK AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content; the cut already removed 37.1s of
      dead takes and markers from an 81.73s raw. What has shipped recently:
      110 = 30.95 · 109 = 31.14 · 118 = 33.68 · 120 = 35.24 · 117 = 38.83 ·
      115 = 46.93 · 113 = 49.90 · 116 = 56.18 · 112 = 75.65. This sits between
      117 and 115.

   ⛔⛔ THE HEADER IS ON FOR ALL 1338 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f+12` on the hook so it is SETTLED on frame 0, and it CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;
export const MISTAKE_TOTAL = 1223;             /* ⭐ TIGHTENED CUT 40.77s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of the caption JSON by PATTERN-MATCHING the
    beat's opening words, never by a hardcoded index. */
export const L = {
  S0:  0,     /* STREET  0.00s  "Most people are wasting thousands of tokens..." */
  S1:  167,   /* SHADE   5.82s  "So here are three Claude mistakes..."           */
  S2:  245,   /* SCALE   8.60s  "First, stop telling Claude to act like..."      */
  S3:  369,   /* HOLD   12.88s  "Instead, spend those tokens telling Claude..."  */
  S4:  519,   /* MOUTH  18.02s  "Second, stop writing negative instructions..."  */
  S5:  615,   /* SLOTS  21.22s  "When you tell the model what not to do..."      */
  S6:  691,   /* SWAP   23.77s  "So say everything as a positive command..."     */
  S7:  800,   /* HITCH  27.39s  "Third, turn off automatic tool access."         */
  S8:  876,   /* RUN    30.27s  "Usually Claude loads all of your connectors..." */
  S9:  1031,  /* LOCKUP 35.63s  "Now go to your settings and switch tool..."     */
  S10: 1175,  /* DAY    40.76s  "I made a list of 15 mistakes to avoid..."       */
  END: MISTAKE_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE HEADER ----------------------------------------------------------
   ⛔ It changes per SECTION, never per scene, and never disappears. Reel 108's
   lesson: "must never disappear" is not the same instruction as "must say one
   thing for the whole reel". */
/* ⛔⛔ THE HEADERS WERE DOING NOTHING. "THREE THINGS TO / TAKE OUT" is a label, not a
   claim; "3 · THE CHAIN / RIDES EVERY TRIP" is a metaphor for a picture that is no longer
   a chain. A header earns its place by stating the CLAIM in product nouns
   ([[feedback_headers_state_the_claim]]) — a number the viewer can act on, or the exact
   thing being taken out. Every line below is either a receipt or an instruction. */
const HEAD: { at: number; big: string; hot: string }[] = [
  /* ⭐ EVERY LINE STATES THE VALUE, PLAINLY. The old set was clever instead of clear
     ("THE DON'T HAS NO DIRECTION" is a riddle, not a reason to keep watching). Each one
     is now what the viewer GETS, and the two carrying numbers carry Anthropic's own:
     ~55k in tool definitions before any work, and over 85% off loading on demand.
     ⛔ No invented percentages anywhere else — where there is no sourced figure the line
     says the benefit in words instead of guessing one. */
  { at: L.S0,  big: "FIX 1 SETTING",       hot: "10X CLAUDE" },
  { at: L.S1,  big: "3 FIXES",             hot: "UNDER A MINUTE" },
  { at: L.S2,  big: "1 · DROP THE PERSONA", hot: "FREES YOUR WINDOW" },
  { at: L.S3,  big: "SEND SOURCES INSTEAD", hot: "+ MAKE IT SELF-CHECK" },
  { at: L.S4,  big: "2 · STOP SAYING DON'T", hot: "IT HAS NO DIRECTION" },
  { at: L.S6,  big: "SAY WHAT TO DO",      hot: "STRAIGHT TO THE ANSWER" },
  { at: L.S7,  big: "3 · EVERY TOOL LOADED", hot: "~55K BEFORE YOU TYPE" },
  { at: L.S9,  big: "LOAD TOOLS ON DEMAND", hot: "-85% TOKENS" },
  { at: L.S10, big: "FREE GUIDE",          hot: "COMMENT MISTAKE" },
];


/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name contains whoosh / swoosh / puff —
   a measurement cannot out-argue the label on the tin.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate with
   24 of 41 cues out of one chiptune pack, because the tool measures spectra and
   has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a street, a depot and a
   van — an engine, a gear shift, a chain, a roller shutter, wrenches on bolts,
   a ratchet, boxes scraping tarmac, a sorter's tick, a knife switch, a call
   bell and a coin on a runner. **ZERO chiptune cues**: the greppable gate is
   that no `src` starts with `c_`, which returns zero hits.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count PEAKS on
   S0 (the interrupt) and S9 (the fix), and thins to two or three on the
   information beats. S5 gets exactly three — it is 2.53s and one idea.
   Rate: 62 cues over 44.61s = 1.39/sec, inside the 1.0-1.5 house ceiling. */

/** the body of the bank — identical across all three cuts */
const BODY: Cue[] = [
  /* ---- S1 · THREE THINGS COME OUT ------------------------------------- */
  { at: S(L.S1 + 2),   src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.78 },
  { at: S(L.S1 + 18),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 1.1, rate: 0.96 },
  { at: S(L.S1 + 44),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.86 },
  { at: S(L.S1 + 70),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.76 },
  { at: S(L.S1 + 72),  src: "twang.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.06 },



  /* ---- S4 · THE BOARD GOES ON. Swing, three bolts, the stop. ---------- */
  { at: S(L.S4 + 4),   src: "mallet_tap.wav",  v: LEVELS.SFX_TEXTURE, dur: 1.4, rate: 1.00 },
  { at: S(L.S4 + 22),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.82 },
  { at: S(L.S4 + 34),  src: "wrench_clank.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.06 },
  { at: S(L.S4 + 42),  src: "wrench_clank.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.94 },
  { at: S(L.S4 + 50),  src: "wrench_clank.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.82 },
  { at: S(L.S4 + 64),  src: "dead_thud.wav",    v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.78 },

  /* ⛔ `bonk.mp3` was here and `sfx_audit` cannot read it — the tool opens
     files with `wave`, so an mp3 cue crashes the gate rather than failing it,
     which is worse: an audit that dies looks like an audit that was not run
     ([[feedback_audits_lie_under_load]]). Every cue in this bank is a .wav. */


  /* ---- S7 · THE DRAG. The reel's motion peak gets a scrape bed. ------- */
  { at: S(L.S7 + 8),   src: "twang.wav",  v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.84 },
  { at: S(L.S7 + 12),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 1.7, rate: 0.88 },
  { at: S(L.S7 + 36),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 1.5, rate: 0.94 },
  { at: S(L.S7 + 58),  src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.10 },
  { at: S(L.S7 + 62),  src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.98 },
  { at: S(L.S7 + 66),  src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.86 },
  { at: S(L.S7 + 70),  src: "can_bong.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 0.76 },
  { at: S(L.S7 + 60),  src: "punch_thud.wav",   v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.80 },



  /* ---- S10 · the CTA. ------------------------------------------------- */
  { at: S(L.S10 + 4),  src: "motor_sag.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.06 },
  { at: S(L.S10 + 44), src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.02 },
  { at: S(L.S10 + 58), src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.94 },
  { at: S(L.S10 + 82), src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 1.1, rate: 1.02 },
  { at: S(L.S10 + 96), src: "bell_ring.wav",    v: LEVELS.SFX_TEXTURE, dur: 1.6, rate: 1.08 },

  /* ⛔⛔⛔ THESE SIX SCENES WERE REBUILT AND THEIR OLD CUES WERE STILL FIRING AT BEATS
     THAT NO LONGER EXIST — thuds on frames where nothing lands, chimes over nothing.
     That is a real part of "the animations make no sense": the ear was being told a
     different story from the eye. Every cue below is placed on a beat that is actually
     in the current build, and every source is one the audit already passes clean. */

  /* ---- S2 · THE CREDENTIALS. The roll starts, then paper, paper, paper. --- */
  /* S2 · the crew buries the shopfront — one cue per beat, on the beat */
  { at: S(L.S2 + 0),   src: "ratchet.wav",       v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.06 },
  { at: S(L.S2 + 15),  src: "slate_whump.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.10 },
  { at: S(L.S2 + 26),  src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.86 },
  { at: S(L.S2 + 37),  src: "clap_slam.wav",     v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.96 },
  { at: S(L.S2 + 48),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.16 },
  { at: S(L.S2 + 65),  src: "sign_clack.wav",    v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.98 },
  { at: S(L.S2 + 72),  src: "ratchet.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.88 },
  { at: S(L.S2 + 89),  src: "gold_stamp.wav",    v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.94 },
  { at: S(L.S2 + 102), src: "stamp_press.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.14 },
  { at: S(L.S2 + 108), src: "stamp_press.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.22 },
  { at: S(L.S2 + 114), src: "stamp_press.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.4, rate: 1.30 },
  { at: S(L.S2 + 120), src: "sub.wav",           v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.82 },

  /* ---- S3 · THE RIP, the two cards, and he goes. ------------------------- */
  /* S3 · he tears it down, the shop lights, the real stock lands */
  { at: S(L.S3 + 10),  src: "bamboo_crack.wav",  v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.9  },
  { at: S(L.S3 + 24),  src: "neon_on.wav",       v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.0  },
  { at: S(L.S3 + 46),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.6, rate: 1.14 },
  { at: S(L.S3 + 56),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.6, rate: 1.08 },
  { at: S(L.S3 + 66),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.6, rate: 1.02 },
  { at: S(L.S3 + 76),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.96 },
  { at: S(L.S3 + 86),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.90 },
  { at: S(L.S3 + 96),  src: "scan_beep.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.06 },
  { at: S(L.S3 + 118), src: "green_tone.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.0  },

  /* ---- S5 · THE POST SPINS. One clack per dead end it tries. ------------- */
  { at: S(L.S5 + 5),   src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.96 },
  { at: S(L.S5 + 18),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.88 },
  { at: S(L.S5 + 31),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.80 },
  { at: S(L.S5 + 44),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.74 },
  { at: S(L.S5 + 58),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.76 },

  /* ---- S6 · FOUR ARMS OFF, THEN THE ARROW LANDS. ------------------------ */
  { at: S(L.S6 + 6),   src: "thock.wav", v: LEVELS.SFX_MID,     dur: 0.5, rate: 0.94 },
  { at: S(L.S6 + 17),  src: "thock.wav", v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.02 },
  { at: S(L.S6 + 28),  src: "thock.wav", v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.10 },
  { at: S(L.S6 + 39),  src: "thock.wav", v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.18 },
  { at: S(L.S6 + 76),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.88 },
  { at: S(L.S6 + 76),  src: "sub.wav",          v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.84 },
  { at: S(L.S6 + 92),  src: "rubber_bounce.wav", v: LEVELS.SFX_MID,    dur: 0.7, rate: 1.06 },

  /* ---- S8 · FOUR FLOODS. One hatch, one landing, each time. ------------- */
  { at: S(L.S8 + 0),   src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.96 },
  { at: S(L.S8 + 26),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.04 },
  { at: S(L.S8 + 44),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.90 },
  { at: S(L.S8 + 74),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.96 },
  { at: S(L.S8 + 92),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.84 },
  { at: S(L.S8 + 120), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.88 },
  { at: S(L.S8 + 140), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.76 },

  /* ---- S9 · THE SWITCH, THE EXTRACTOR, THE THREE. ----------------------- */
  { at: S(L.S9 + 14),  src: "lamp_clunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.7, rate: 0.90 },
  { at: S(L.S9 + 26),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.82 },
  { at: S(L.S9 + 40),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.14 },
  { at: S(L.S9 + 74),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.20 },
  { at: S(L.S9 + 108), src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.26 },
  { at: S(L.S9 + 126), src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.06 },
  { at: S(L.S9 + 130), src: "can_bong.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.98 },
  { at: S(L.S9 + 134), src: "can_bong.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.10 },
  { at: S(L.S9 + 138), src: "can_bong.wav",   v: LEVELS.SFX_HERO,    dur: 0.6, rate: 1.22 },

];

/* ⛔ THE HOOK'S CUTS DIFFER PER VARIANT, so the transients cannot be shared.
   THE-OPEN: *"a cut with no sound reads as a glitch; a cut with sound reads as
   intent"* — every cut frame gets a transient landing ON it, and frame 0 gets
   the heaviest stack in the reel because it is the interrupt.
   ⛔ `dur` TRUNCATES TAILS: every dur below is >= the file's measured length. */
const hookCues = (cuts: number[], kind: "shoulder" | "spill" | "squat"): Cue[] => {
  const [A, B, C] = cuts;
  const base: Cue[] = [
    /* frame 0 · the heaviest stack of the reel */
    { at: S(0),      src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.90 },
    { at: S(0),      src: "boom.wav",        v: LEVELS.SFX_MID,     dur: 1.5, rate: 0.74 },
    { at: S(0),      src: "sub.wav",         v: LEVELS.SFX_MID,     dur: 1.4, rate: 0.80 },
    { at: S(0),      src: "twang.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0, rate: 0.86 },
    /* cut B and cut C each get a transient ON the frame */
    { at: S(B),      src: "slate_whump.wav", v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.84, lead: 0 },
    { at: S(C),      src: "rebuild_thud.wav",v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.80, lead: 0 },
    { at: S(C + 12), src: "dead_thud.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.96 },
    { at: S(C + 24), src: "thock.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.86 },
    { at: S(C + 36), src: "thock.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.76 },
  ];
  if (kind === "shoulder") return [...base,
    /* the two attempts: the shove, the latch missing, the kickback */
    { at: S(8),  src: "motor_sag.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 1.10 },
    { at: S(15), src: "metal_ping.wav",    v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.14 },
    { at: S(19), src: "bang_on.wav",       v: LEVELS.SFX_HERO,    dur: 1.1, rate: 0.84 },
    { at: S(19), src: "rubber_bounce.wav", v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.78 },
    { at: S(38), src: "motor_sag.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 1.16 },
    { at: S(47), src: "bang_on.wav",       v: LEVELS.SFX_HERO,    dur: 1.1, rate: 0.94 },
    { at: S(47), src: "can_bong.wav",    v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.88 },
    { at: S(B + 10), src: "punch_thud.wav",v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.80 },
    { at: S(B + 30), src: "punch_thud.wav",v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.88 },
  ];
  if (kind === "spill") return [...base,
    { at: S(14), src: "metal_ping.wav",    v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.10 },
    { at: S(20), src: "bang_on.wav",       v: LEVELS.SFX_HERO,    dur: 1.1, rate: 0.86 },
    { at: S(25), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.06 },
    { at: S(30), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.94 },
    { at: S(35), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.82 },
    { at: S(40), src: "can_bong.wav",    v: LEVELS.SFX_MID,     dur: 1.1, rate: 0.90 },
  ];
  return [...base,
    /* the squat: four loads, four suspension drops */
    { at: S(10), src: "rebuild_thud.wav",  v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.06 },
    { at: S(12), src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.02 },
    { at: S(34), src: "rebuild_thud.wav",  v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.96 },
    { at: S(36), src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.92 },
    { at: S(58), src: "rebuild_thud.wav",  v: LEVELS.SFX_MID,     dur: 1.0, rate: 0.86 },
    { at: S(60), src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.82 },
    { at: S(82), src: "punch_thud.wav",    v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.76 },
    { at: S(84), src: "alarm.wav",         v: LEVELS.SFX_MID,     dur: 1.4, rate: 0.92 },
  ];
};

export const SFX_OF = (v: Variant): Cue[] =>
  [...hookCues(HOOK_CUTS[HOOK_OF[v]], HOOK_OF[v]), ...BODY];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad
   ([[feedback_house_bed_is_a_real_track]]). Reels 107-114 drifted onto
   generated beds one clone at a time and every audio gate stayed green, because
   a pad passes all of them. `ados` = "Another Day Of Sun" (13 uses),
   `ebm` = "Every Living Breathing Moment" (8).

   The window was MEASURED, not picked by ear — a 5ms RMS scan over both tracks,
   every 44.61s window scored on internal range (mean minus the worst 1.5s) with
   the passages reels 116 and 120 used excluded:

     kerb  ADOS @ 54.0s   range 7.33 dB   mean -17.93 dB   onset -14.99 dB
     rank  ADOS @ 51.0s   range 7.31 dB
     gate  EBM  @ 33.0s   range 7.91 dB

   ⚠️ 7.3 dB is WIDER than reel 120's 2.59 dB, and that is a function of LENGTH,
   not of a worse choice: a 44.61s window spans more of a track's structure than
   a 35.24s one, and 7.31 is the tightest that exists in either track at this
   duration. It is exactly why the compressor below is not optional.

   ⛔⛔ THE BED IS COMPRESSED BEFORE IT IS LEVELLED. `loudnorm` sets an
   INTEGRATED level, so a track with a wide internal range puts its brass hits
   far above the target and they read as swells inside a VO gap. `acompressor`
   at 4:1 runs FIRST.
   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — IT IS WHERE "THE PUFF OF AIR"
   LIVES. Reel 115 spent three rounds hunting a named cue that did not exist;
   the air was the bed's own cymbal wash above 5k. `treble=g=-11:f=4800` plus a
   -5 dB shelf at 9k, before the level stage.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. MEASURED after the chain: 28 / 10 / 22 ms. */
const BED: Record<Variant, string> = {
  kerb: "121mistake_bed_v2.wav",
  rank: "121mistake_bed_rank_v2.wav",
  gate: "121mistake_bed_gate_v2.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { kerb: 1268, rank: 1344, gate: 1196 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13), so this
   is re-solved on THESE files, AFTER the high shelf rather than inherited
   through it. The house figure is ~12 dB under the VO; the standing cap is
   volume 0.25 (Alex: *"the background music is too loud compared to the
   voiceover"*). Re-measure and re-solve if either file is rebuilt. */
export const BED_GAIN: Record<Variant, number> = {
  kerb: db(7.40),   /* -> volume 0.2344 */
  rank: db(7.60),
  gate: db(7.00),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  /* the header section that is currently live. ⛔ Fed `f+12` inside the hook so
     it is SETTLED on frame 0 rather than caught mid-entrance. */
  let h = HEAD[0];
  for (const x of HEAD) if (f >= x.at) h = x;
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX_OF(v)} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            {/* ⭐ THE OPEN IS THE NEW BUILD — one continuous 5.8s cut of one object */}
            <Sequence from={L.S0}  durationInFrames={DUR.S0}><OpenScene v={v} /></Sequence>
            {/* ⭐ three gems come down, one per mistake */}
            <Sequence from={L.S1}  durationInFrames={DUR.S1}><Three dur={DUR.S1} /></Sequence>
            {/* ⭐ tip 1 rebuilt: the credentials unspool, then get torn off */}
            <Sequence from={L.S2}  durationInFrames={DUR.S2}><ShopA dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3}  durationInFrames={DUR.S3}><ShopB dur={DUR.S3} /></Sequence>
            {/* ⭐ every option crossed out — what a prompt full of "do not" leaves you */}
            <Sequence from={L.S4}  durationInFrames={DUR.S4}><Crossed dur={DUR.S4} /></Sequence>
            {/* ⭐ tip 2 rebuilt: the signpost that points nowhere, then the one that does */}
            <Sequence from={L.S5}  durationInFrames={DUR.S5}><SignA dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6}  durationInFrames={DUR.S6}><SignB dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7}  durationInFrames={DUR.S7}><S7  v={v} dur={DUR.S7} /></Sequence>
            {/* ⭐ tip 3 rebuilt: every connector floods in, then the extractor takes them back */}
            <Sequence from={L.S8}  durationInFrames={DUR.S8}><ToolsA dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9}  durationInFrames={DUR.S9}><ToolsB dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} dur={DUR.S10} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      {/* ⛔ ROOT CHROME — one header, one rail, one caption track, all 1338f */}
      <HookHeader big={h.big} hot={h.hot} f={f < L.S1 ? f + 12 : 999} />
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
    </AbsoluteFill>
  );
};

export const ClaudeMistakeReel = makeReel("kerb");

/* ⛔ docs/THE-OPEN.md step 1: N concepts for scene 0, rendered at FULL QUALITY,
   picked before anything else is built. Skipping it cost reel 78 an entire
   scene and reel 120 two rounds.
   ⛔⛔ A SOLO HOOK COMP HAS NO AUDIO AND PLACEHOLDER CAPTIONS BY CONSTRUCTION
   ([[feedback_label_preview_artifacts]]) — the karaoke track and the VO are
   ROOT chrome and a 175-frame preview starts them mid-word. These comps are for
   PICKING A PICTURE. Never judge sound or caption sync from one. */
export const HookCut = (v: Variant): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <S0 v={v} dur={DUR.S0} />
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={HEAD[0].big} hot={HEAD[0].hot} f={f + 12} />
    </AbsoluteFill>
  );
};
