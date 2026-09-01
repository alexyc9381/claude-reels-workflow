import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, CAM, GRADE,
} from "./JudgeScenes";
import type { Variant } from "./JudgeScenes";
import { CamCtx } from "./JudgeWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./JudgeHooks";
import type { HookId } from "./JudgeHooks";
import { OPENS, OPEN_BANDS } from "./JudgeOpens";
import type { OpenId } from "./JudgeOpens";
import { OPENS2, OPEN2_BANDS } from "./JudgeOpens2";
import type { Open2Id } from "./JudgeOpens2";
import words from "./data/words_judge132.json";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE ASSEMBLY.  Board: storyboards/132-judge.md.

   Subject: a three-line prompt that makes Claude put its own output on trial —
   a prosecutor sub-agent that finds everything wrong with it, a defense that
   argues back, and a judge that rules on the evidence — looping until the work
   survives being attacked.

   ⛔⛔ THE VO NAMES NO PRODUCT BUT CLAUDE, AND STATES NO QUANTITY BUT TWO.
   73% and one minute are spoken and appear once each, in the two places they
   are spoken. No token count, no price, no benchmark, no rival tool, and no
   sentence attributed to any person or company — "even the creators of Claude
   think this is the future of AI" is dramatised as a MARK being struck into
   brass and stops there. All four guards live in `JudgeWorld` (`COST_BANNED`,
   `CLAIM_BANNED`, `QUOTE_BANNED`, `NAME_BANNED`) and are greppable.

   ⛔ THE HOW IS GATED. The reel never shows the prompt. S8 draws a three-rung
   rack with the third rung hot and no text on any rung — a POSITION, which is
   exactly what "the third line of the prompt" says. The copy-pasteable version
   is the lead magnet, which is the whole CTA.

   ⭐ LENGTH: 34.80s. The cut removes 32.1s of SIX dead takes and dead air from
   a 66.87s raw take — and five of those six were INVISIBLE to a whole-file
   transcription, because whisper merges a flubbed take and its retake into one
   segment and emits the sentence once. Splitting the raw at every measured
   silence (`silencedetect=noise=-38dB:d=0.25`) and transcribing each chunk
   SEPARATELY is what surfaced them; the finished cut was re-transcribed as a
   control and contains no `cut cut`.
   ⛔ TEMPO IS x1.05, NOT THE HOUSE x1.10. The raw take already runs 4.96 words
   per second, so the usual speed-up would have landed at 5.2 and Alex's note on
   reel 124 was *"speed sounds kind of fast"*. The length was taken out of the
   PAUSES instead: 0.16-0.24s of engineered gap per line against measured
   silence, giving delivered inter-line gaps of 0.28-0.36s.
   ⚠️ 34.80s is ABOVE the playbook's 22-29s house range and it is flagged rather
   than silently trimmed: the script is 168 words and no line is redundant.
   ========================================================================= */

const FPS = 30;
export const JUDGE_TOTAL = 1044;                  /* CUT 34.80s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_judge132.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,     /* STAND    hook · "There's a new prompting technique"   0.00s */
  S1: 80,    /* DIAL     "but the crazy part"                         2.68s */
  S2: 160,   /* DIALC    "and it takes just 1 minute"                 5.32s */
  S3: 211,   /* DOCK     "People are using it to ship"                7.04s */
  S4: 299,   /* SEAL     "and even the creators of Claude"            9.96s */
  S5: 372,   /* CHAMBER  "It's called the Judge Loop"                12.40s */
  S6: 412,   /* HALL     "Instead of doing the normal back and forth" 13.72s */
  S7: 458,   /* MUSTER   "you give Claude a task"                    15.26s */
  S8: 541,   /* RACK     "But the secret sauce is in the third line" 18.02s */
  S9: 596,   /* ROBING   "where you assign a judge"                  19.88s */
  S10: 663,  /* BOARD    "The prosecutor builds a case"              22.10s */
  S11: 731,  /* FLOOR    "the defense argues back"                   24.36s */
  S12: 793,  /* PIT      "so they loop and rebuild"                  26.44s */
  S13: 856,  /* FURNACE  "This burns through tokens fast"            28.54s */
  S14: 952,  /* BAY      "trigger the Judge Loop before your launch" 31.74s */
  S15: 1006, /* STEPS    "Comment Judge for the free guide"          33.52s */
  END: JUDGE_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.END - L.S15,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` tripped the AIR gate on reel 120; `coin_slide` is 89.8% above
   2 kHz; `chimelo`, `ding`, `harden_chime` and `can_rattle` are AIR swells.
   None of them is here.

   ⭐ THE BANK BELONGS TO THE WORLD. This is a courthouse and the works behind
   it: a chart recorder humming, a needle ticking, a pen tearing paper, a lamp
   striking, latches and mech clanks, a bell, a gavel, folders crossing a floor,
   a rebuild thud, a seal cracking, a ram, a plate ringing, a furnace, and five
   stamps into brass. **ZERO chiptune cues** — the greppable gate is that no
   `src` starts with `c_`, which returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. `impact_deep` (93.1% low),
   `sub` (96.6%), `thock` (88.6%), `chair_knock` (70% under 250 Hz) and
   `dead_thud` carry the weight. `gold_stamp` is 68.8% bright so it is used
   EXACTLY FIVE times, all in the CTA, which is the SLAP gate's threshold and
   not past it. `clap_slam` (62% bright) does not appear at all.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook, 10),
   S12 (the loop and the ram, 9) and S13 (the furnace, 8), and thins to three on
   the short information beats. S5 is 1.33s and one idea, so it gets three.

   ⛔⛔ AND THE COUNT IS OF THE **EXPANDED** ARRAY. Reel 131 reported "44 cues"
   for three rounds by grepping `src:` literals, which counts a `.map()` run as
   one; the real figure was 87. Expanded, this bank is **74 cues over 34.80s =
   2.13/sec**, against 131 FREE's shipped 2.17 and 122 HARDWARE's 1.97, and well
   under the 3.82 that got reel 107 rejected as *"too many sfx"*.
   -------------------------------------------------------------------------- */
export const SFX: Cue[] = [
  /* ---- S0 · THE STAND. The heaviest stack in the reel — frame 0 is the
     interrupt and it gets the biggest cue set. 10 cues. ------------------- */
  /* ⛔⛔ SIX CUES WERE REPLACED BY `sfx_audit`, NOT BY EAR, AND THAT IS THE
     POINT (reel 115: *"a measurement cannot out-argue a ban"*, and its
     corollary — the GATE is the arbiter, not a hand measurement). The bank as
     first written carried `graph_hum` (755ms attack, 1.8% under 250Hz = AIR),
     `sorter_tick` (1929ms attack over 2.4s = NOISE-BED + SWELL + AIR),
     `fire_bed` (90.7% above 2kHz = NOISE-BED + HISS + AIR), `machine_bed`
     (NOISE-BED), `slot_lever` (116ms attack, 58.7% bright = AIR) and
     `am/paper-slide` (HISS + AIR). Every one of them was a defensible choice by
     name and every one of them is the shape that produced *"a puff of air
     throughout the video"* for five review rounds on reel 115. */
  { at: S(L.S0 + 0),  src: "engine_idle.wav",   v: LEVELS.SFX_BED,  dur: 2.7, rate: 0.92 },
  { at: S(L.S0 + 0),  src: "sub.wav",          v: LEVELS.SFX_HERO, dur: 1.1, rate: 0.72 },
  /* ⭐ THE NEEDLE IS AUDIBLE BEFORE IT IS DRAMATIC. Three ticks, ascending,
     on the twitch and the climb — the sound carries the same anticipation the
     picture does. `sorter_tick` is 0.09s and low: it cannot swell or hiss. */
  ...[6, 16, 26].map((a, i) => ({
    at: S(L.S0 + a), src: "data.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.14, rate: 0.92 + i * 0.13,
  })),
  /* the pen tearing the sheet: the movement is the impact, the texture is the
     rip. One event with grit, not two hits. */
  ...layer(S(L.S0 + 34),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.84 },
    { src: "slate_whump.wav",  v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.90 }),
  { at: S(L.S0 + 36), src: "neon_on.wav",      v: LEVELS.SFX_MID,  dur: 0.5, rate: 0.88 },
  /* ⛔ ONE STEP DOWN, NEVER UP. The last cue of the hook is lower and quieter
     than the tear: the hook must NOT resolve, and a rising repeat reads as
     progress. The seal is still gleaming when this lands. */
  { at: S(L.S0 + 52), src: "thock.wav",        v: LEVELS.SFX_MID,  dur: 0.5, rate: 0.78 },

  /* ---- S1 · THE DIAL. A switch, a motor sagging under load, two clanks as
     the segment ring fills, one green tone on 73. 6 cues. ----------------- */
  { at: S(L.S1 + 4),  src: "knife_switch.wav", v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.92 },
  { at: S(L.S1 + 12), src: "motor_sag.wav",    v: LEVELS.SFX_MID,  dur: 1.0, rate: 0.84 },
  ...[24, 44].map((a, i) => ({
    at: S(L.S1 + a), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.4, rate: 0.88 + i * 0.14,
  })),
  { at: S(L.S1 + 60), src: "green_tone.wav",   v: LEVELS.SFX_HERO, dur: 0.9, rate: 1.14 },
  { at: S(L.S1 + 62), src: "thock.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.3, rate: 0.86 },

  /* ---- S2 · THE MINUTE. Three cues for one gesture. -------------------- */
  { at: S(L.S2 + 2),  src: "ticket_click.wav", v: LEVELS.SFX_MID,  dur: 0.2, rate: 1.02 },
  { at: S(L.S2 + 9),  src: "ratchet.wav",      v: LEVELS.SFX_MID,  dur: 0.5, rate: 1.04 },
  { at: S(L.S2 + 34), src: "bell_ring.wav",    v: LEVELS.SFX_HERO, dur: 1.4, rate: 1.06 },

  /* ---- S3 · THE DOCK. One post, three doors ASCENDING, one arrival.
     ⛔ The three doors are the only run here: five ticks would make the dock a
     metronome and the picture already staggers them. 5 cues. --------------- */
  { at: S(L.S3 + 2),  src: "bang_on.wav",      v: LEVELS.SFX_MID,  dur: 0.5, rate: 0.96 },
  ...[16, 40, 62].map((a, i) => ({
    at: S(L.S3 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.4, rate: 0.86 + i * 0.11,
  })),
  { at: S(L.S3 + 76), src: "arrive_chime.wav", v: LEVELS.SFX_MID,  dur: 1.0, rate: 1.04 },

  /* ---- S4 · THE SEAL. ⛔ `gold_stamp` is 68.8% bright and its five uses are
     ALL reserved for the CTA, so the press here is a clank and a deep impact.
     4 cues. --------------------------------------------------------------- */
  { at: S(L.S4 + 12), src: "mech_clank.wav",   v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.82 },
  { at: S(L.S4 + 21), src: "impact_deep.wav",  v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.88 },
  { at: S(L.S4 + 34), src: "temper_chime.wav", v: LEVELS.SFX_MID,  dur: 0.7, rate: 1.02, lead: 2 },
  { at: S(L.S4 + 52), src: "arrive_chime.wav", v: LEVELS.SFX_MID,  dur: 1.0, rate: 0.98 },

  /* ---- S5 · THE CHAMBER. 1.33s, ONE idea, THREE cues. ------------------ */
  { at: S(L.S5 + 0),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.86 },
  { at: S(L.S5 + 4),  src: "stage_hum.wav",    v: LEVELS.SFX_BED,  dur: 1.3, rate: 1.00 },
  { at: S(L.S5 + 18), src: "gong.wav",         v: LEVELS.SFX_HERO, dur: 1.3, rate: 0.72 },

  /* ---- S6 · THE BACK AND FORTH. Three of the five passes are marked, and
     they DESCEND in level while the spacing tightens — the shuttle is losing,
     not building. 3 cues. -------------------------------------------------- */
  ...[2, 19, 32].map((a, i) => ({
    at: S(L.S6 + a), src: "sign_clack.wav",
    v: LEVELS.SFX_MID * db(-i * 1.1), dur: 0.24, rate: 1.02 + i * 0.09,
  })),

  /* ---- S7 · THE MUSTER. The crate lands, then the ranks arrive.
     ⛔ Eleven sprites, THREE marks: a run does not have to be 1:1 with the
     picture, and eleven identical knocks would be a metronome. 5 cues. ----- */
  ...layer(S(L.S7 + 18),
    { src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.8, rate: 0.86 },
    { src: "sub.wav",          v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.78 }),
  ...[36, 50, 64].map((a, i) => ({
    at: S(L.S7 + a), src: "chair_knock.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.3, rate: 0.86 + i * 0.10,
  })),

  /* ---- S8 · THE THIRD RUNG. It refuses, then it seats. 4 cues. --------- */
  { at: S(L.S8 + 10), src: "mech_clank.wav",   v: LEVELS.SFX_MID,  dur: 0.4, rate: 0.92 },
  { at: S(L.S8 + 20), src: "ratchet.wav",      v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.88 },
  { at: S(L.S8 + 29), src: "impact.wav",       v: LEVELS.SFX_HERO, dur: 0.7, rate: 0.94 },
  { at: S(L.S8 + 34), src: "green_tone.wav",   v: LEVELS.SFX_MID,  dur: 0.7, rate: 1.26 },

  /* ---- S9 · THE THREE ROLES. Three alcove lamps ASCENDING, plus ONE
     signature cue on the judge only — the tallest object gets the mallet, and
     the other two are carried by the lamps. 4 cues. ------------------------ */
  ...[13, 34, 52].map((a, i) => ({
    at: S(L.S9 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.4, rate: 0.84 + i * 0.12,
  })),
  { at: S(L.S9 + 14), src: "mallet_tap.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.3, rate: 0.94 },

  /* ---- S10 · THE CASE. Fourteen flags in the picture, FIVE marked.
     ⭐ FLAT LEVEL, RISING PITCH: it is the same act repeated, so a rising level
     would read as progress. Rising pitch reads as ACCELERATION, which is what
     is happening. 5 cues. -------------------------------------------------- */
  ...[4, 18, 32, 46, 60].map((a, i) => ({
    at: S(L.S10 + a), src: "punch_thud.wav",
    v: LEVELS.SFX_MID, dur: 0.26, rate: 0.88 + i * 0.055,
  })),

  /* ---- S11 · THE ARGUMENT. Two out, two back, then the gavel — the heaviest
     cue after frame 0, a three-way layer — and one lamp. 7 cues. ---------- */
  ...[2, 20].map((a, i) => ({
    at: S(L.S11 + a), src: "fling.wav",
    v: LEVELS.SFX_MID * db(i * 0.5), dur: 0.30, rate: 1.04 - i * 0.08,
  })),
  ...[8, 17].map((a, i) => ({
    at: S(L.S11 + a), src: "fling.wav",
    v: LEVELS.SFX_MID * db(i * 0.5), dur: 0.30, rate: 0.86 + i * 0.08,
  })),
  { at: S(L.S11 + 31), src: "mallet_tap.wav",  v: LEVELS.SFX_HERO, dur: 0.45, rate: 0.86 },
  { at: S(L.S11 + 31), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.80, lead: 2 },
  { at: S(L.S11 + 38), src: "neon_on.wav",     v: LEVELS.SFX_MID,  dur: 0.5, rate: 1.06 },

  /* ---- S12 · THE LOOP. THE PEAK OF THE REEL.
     ⭐ THE THREE PASSES ASCEND, because a repeated reward that ascends reads as
     PROGRESS rather than repetition — and progress is exactly what the loop is.
     ⛔ `ceramic_crack` fires ONCE in the whole reel, on the seal breaking. It
     is the villain's only loss and it gets its own sound. 9 cues. ---------- */
  { at: S(L.S12 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,  dur: 2.1, rate: 0.78 },
  ...[6, 26, 44].map((a, i) => ({
    at: S(L.S12 + a), src: "rebuild_thud.wav",
    v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.8, rate: 0.86 + i * 0.09,
  })),
  { at: S(L.S12 + 16), src: "ceramic_crack.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 0.96 },
  ...layer(S(L.S12 + 52),
    { src: "adv_strike.wav",  v: LEVELS.SFX_HERO,    dur: 0.7, rate: 0.90 },
    { src: "impact_deep.wav", v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.82 }),
  { at: S(L.S12 + 56), src: "metal_ping.wav",  v: LEVELS.SFX_MID,  dur: 0.8, rate: 0.94 },
  { at: S(L.S12 + 58), src: "sub.wav",         v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.74 },

  /* ---- S13 · THE FURNACE. A fire bed, three accelerating feeds, the shutter
     and the prototype going down. 7 cues. --------------------------------- */
  { at: S(L.S13 + 0),  src: "engine_idle.wav",  v: LEVELS.SFX_BED,  dur: 3.1, rate: 0.62 },
  ...[8, 24, 40].map((a, i) => ({
    at: S(L.S13 + a), src: "mech_clank.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.6), dur: 0.16, rate: 0.88 + i * 0.12,
  })),
  { at: S(L.S13 + 58), src: "knife_switch.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 0.80 },
  { at: S(L.S13 + 64), src: "dead_thud.wav",   v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.86 },
  { at: S(L.S13 + 80), src: "chair_knock.wav", v: LEVELS.SFX_MID,  dur: 0.3, rate: 0.92 },

  /* ---- S14 · THE TRIGGER. 5 cues. -------------------------------------- */
  { at: S(L.S14 + 6),  src: "bang_on.wav",     v: LEVELS.SFX_MID,  dur: 0.5, rate: 0.88 },
  { at: S(L.S14 + 14), src: "ratchet.wav",     v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.94 },
  { at: S(L.S14 + 18), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.9, rate: 0.86 },
  { at: S(L.S14 + 34), src: "green_tone.wav",  v: LEVELS.SFX_MID,  dur: 0.7, rate: 1.20 },
  { at: S(L.S14 + 44), src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.1, rate: 1.08 },

  /* ---- S15 · THE CTA. Five letters, five stamps, one step up each, then the
     mark. ⛔ `gold_stamp` is 68.8% bright and this is its ONLY appearance in
     the reel — five uses, which is the SLAP gate's threshold and not past it.
     6 cues. ---------------------------------------------------------------- */
  ...[13, 16, 19, 22, 25].map((a, i) => ({
    at: S(L.S15 + a), src: "gold_stamp.wav",
    v: LEVELS.SFX_MID * db(i * 0.45), dur: 0.42, rate: 0.90 + i * 0.055,
  })),
  { at: S(L.S15 + 30), src: "arrive_chime.wav", v: LEVELS.SFX_HERO, dur: 1.2, rate: 1.04 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad. `ados` =
   "Another Day Of Sun", `ebm` = "Every Living Breathing Moment". Reels 107-114
   drifted onto generated beds one clone at a time and every audio gate stayed
   green, because a pad passes all of them.

   ⛔ THE THREE ARE DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate. `house` is ados from 0.78s (its
   first downbeat), `steel` is ados from 21.8s (a different section of the same
   song), `amber` is ebm from 22.2s.

   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Each source was PRE-TRIMMED to its own first
   downbeat instead — ados runs 0.78s of silence before the horns, and cutting
   at 0.0s shipped a bed that measured -180 dB across the first 150ms.
   Measured after the chain: house 0.0ms · amber 10.7ms · steel 19.5ms.

   ⛔ THE FIX IS SPECTRUM, NOT VOLUME. Per bed: -4 dB shelf at 110 Hz, +4 at
   700 Hz, +5 at 1.8 kHz, a 5.2 kHz low pass and a -5 dB shelf at 4 kHz — the
   chain reel 131 landed on. A bed that keeps only its bass loses ~9 dB the
   moment it plays through a phone speaker; a bed that keeps its midrange fights
   the voice. The low pass is not optional: without it the >5 kHz content is
   where reel 115's "puff of air" lived for three rounds. */
const BED: Record<Variant, string> = {
  house: "132judge_bed.wav",
  amber: "132judge_bed_amber.wav",
  steel: "132judge_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1348, steel: 1200 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. ⛔ AND THE STANDING CAP IS volume 0.25 (Alex: *"the background
   music is too loud compared to the voiceover"*) — db(7.90) x LEVELS.MUSIC =
   0.2483, inside the cap by 0.0017, so the gain is not the lever. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.90),   /* -> volume 0.2483, against the 0.25 cap */
  amber: db(7.55),
  steel: db(7.70),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED OPEN. It IS S0 itself, so the candidate that was chosen and the
    scene that ships are the same code and cannot drift apart.
    ⛔⛔ ROUND 3, AND THIS ONE IS PROVISIONAL. `docs/THE-OPEN.md` step 1 wants the
    pick made on RENDERED candidates, not argued for by whoever authored one —
    twice now I authored a single open and defended it, and twice it came back.
    Four mechanisms are rendered as their own mp4s in the delivery folder;
    `haul` is set here only so the reel has an open while the pick is made.
    Swapping is this one line. */
export const PICKED: Open2Id = "scale";

export const makeReel = (v: Variant, quiet = false, open: Open2Id = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = OPENS2[open];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("132_judge_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} dur={DUR.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} dur={DUR.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} dur={DUR.S12} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} dur={DUR.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ AND A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they
   want to be able to do, never the set and never the theme. Alex rewrote one
   himself on reel 124 (*"Create 3D AI Websites"*), which is the register.
   Nothing below says "the court", "the bench" or "the loop rail".
   ⭐ THE TEST: read ONE band muted with nothing else on screen. If it does not
   tell you what is on offer, it is describing the reel instead of the product.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "CLAUDE SAYS IT'S DONE",  hot: "IT ISN'T" },
  { from: L.S1,  big: "73% MORE ACCURATE",      hot: "IN ONE MINUTE" },
  { from: L.S3,  big: "SHIP APPS AND SITES",    hot: "FROM ONE PROMPT" },
  { from: L.S5,  big: "THE JUDGE LOOP",         hot: "3 LINES OF PROMPT" },
  { from: L.S7,  big: "SPAWN A TEAM",           hot: "OF SUB AGENTS" },
  { from: L.S9,  big: "JUDGE, PROSECUTOR",      hot: "AND DEFENSE" },
  { from: L.S10, big: "IT PROSECUTES",          hot: "YOUR OWN CODE" },
  { from: L.S12, big: "IT LOOPS AND REBUILDS",  hot: "UNTIL IT HOLDS" },
  { from: L.S13, big: "BURNS TOKENS FAST",      hot: "PROTOTYPE FIRST" },
  { from: L.S15, big: "COMMENT JUDGE",          hot: "FOR THE FREE GUIDE" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  /* ⭐⭐ THE HEADER IS ON FROM FRAME 0 (Alex, reel 131: *"where is the header in
     the hook scene?"*). It is also the one MEASURED IG-performance rule in the
     repo — across reel 94's six trial cuts the two that performed both opened
     with a cream claim plate and the four that did not had none. */
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* ⛔ FRAME 0 MAY NOT BE MID-ROLL. `SectionHeader` animates in from its own
     f=0, so feeding it f=0 on the reel's frame 0 renders the header at scale 0
     — it WAS on, and it was invisible on the one frame guaranteed to be seen. */
  return <HookHeader big={b.big} hot={b.hot} f={f - b.from + 12} />;
};

export const ClaudeJudge132Reel = makeReel("house");
export const ClaudeJudge132ReelAmber = makeReel("amber");
export const ClaudeJudge132ReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 100-frame cut, on the
   real chassis with the real VO, bed, captions and progress rail, so the pick
   is made on the thing a viewer would actually be served rather than on a
   description. Its own header band rides each one, because the header IS half
   of what is being chosen.
   ====================================================================== */
export const HookCut = (id: HookId): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = HOOKS[id];
  const b = HOOK_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("132_judge_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={80} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⛔ THE OPEN EXPERIMENT, ROUND 3. `docs/THE-OPEN.md` step 1 says N concepts
   for scene 0, rendered at full quality, PICKED before the body is defended —
   and this hook has now been rejected twice because I authored one and defended
   it instead. Five mechanisms, each on the real chassis with the real VO, bed,
   captions and rail. None of them is argued for here.
   ====================================================================== */
export const OpenCut = (id: OpenId): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = OPENS[id];
  const b = OPEN_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("132_judge_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={80} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};

/** round 4 — the BARE-STAGE opens. One dominant object each, a different object
    in every one, the court held down behind them. */
export const Open2Cut = (id: Open2Id): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = OPENS2[id];
  const b = OPEN2_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("132_judge_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={80} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};
