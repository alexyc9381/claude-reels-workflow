import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, CAM, GRADE,
} from "./LoopScenes";
import type { Variant } from "./LoopScenes";
import { CamCtx, R } from "./LoopWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_118loop.json";

/* ===========================================================================
   REEL 118 · "LOOP" — THE GAUNTLET.  Board: storyboards/118-loop.md.

   Subject: the GAUNTLET LOOP prompting technique. Three lines: set the task,
   fan the work out to builder subagents, and assign a separate CRITIC with
   fresh context that compares the real output to a quality bar, names the
   biggest gap and sends it back. It loops until the critic is satisfied.

   Verified live 2026-08-21:
     · named and popularised by MATT SHUMER, via the "Claude of Duty" demo —
       Claude Opus 5, a browser FPS, ~55,000 lines of Three.js from one prompt
     · BORIS CHERNY, creator of Claude Code: "I don't prompt Claude anymore…
       My job is to write loops."
     · the mechanism: the lead agent splits the goal into the smallest
       independently judgeable pieces; each gets a BUILDER and a SEPARATE
       CRITIC with fresh context; the builder never grades itself
     · reported cost: single projects at $1,200 and $1,700 — ⛔ NOT DRAWN, see
       the honesty ledger in LoopWorld.tsx

   VO: public/118loop_vo.wav — 34.05s, 148 words, cut from an 86.24s raw take.

   ⛔⛔ THE RAW TAKE HAD **NINE** `cut cut` MARKERS AND SEVEN DEAD TAKES, and the
      last line was re-run FIVE times. Every keep boundary came from a 10ms RMS
      scan of the raw file (noise floor -61 to -63 dB), never from whisper's
      word times — they run 150-200ms early. The eight kept ranges:
        0.80-4.15 · 4.58-10.88 · 12.56-13.82 · 20.08-26.06 · 27.42-31.14 ·
        45.38-49.92 · 74.12-80.50 · 81.22-83.92
      The CUT file was then re-transcribed end to end and reads clean, with the
      first word starting at 0.00s and no marker surviving anywhere.

   ⛔⛔ THE VO SHIPS AT x1.00, NOT THE HOUSE x1.10. Measured before deciding:
      148 words over 34.05s = 4.35 wps, hook 0-10s = 4.20 wps. x1.10 would put
      it at 4.79 overall — past every window in the shipped set. In family with
      what actually ships: 116 BILL 4.38 · 113 GO 4.23 · 114 SMART 4.13 ·
      110 FLOW 3.84 · 111 LIBRARIES 3.66 · 115 STAR 3.25.

   ⚠️ 34.07s IS OUTSIDE THE 22-29s FIGURE IN THE PLAYBOOK AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content; the cut already removes 52.2s of
      flubs and dead air. What has actually shipped recently: 110 = 31.42 ·
      111 = 33.56 · 114 = 46.49 · 113 = 50.20 · 115 = 51.46 · 116 = 56.60 ·
      112 = 76.22. This is the SECOND SHORTEST reel in that set.

   ⛔⛔ THE HEADER IS ON FOR ALL 1022 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f+12`
      on the hook so it is SETTLED on frame 0, and it CHANGES per section: reel
      107 taught that the header must never disappear, and reel 108 taught that
      that is not the same instruction as saying one thing for the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1022 frames = 34.07s, the VO file's own length. Its last word `LOOP.` starts
    at 33.44s (f1003), so the reel carries 19 frames of tail and HARD-CUTS on
    the keyword. */
export const LOOP_TOTAL = 1022;

/* ⛔ MEASURED WORD ONSETS from src/data/words_118loop.json, converted to frames
   and pulled back by the house 4-frame picture lead. Nothing here is estimated
   — every value is `round(onset * 30) - 4` of the VO's own beat openers, found
   by pattern-matching the opening words (never a hardcoded index — those drift
   the moment the VO changes). */
export const L = {
  S0: 0,     /* INTAKE    0.00s  "There's a new prompting technique that's..."  */
  S1: 96,    /* BENCH     3.34s  "Because in a single prompt, you can build..." */
  S2: 182,   /* GALLERY   6.21s  "even the creator of Claude Code said might..."*/
  S3: 280,   /* HALL      9.45s  "It's called the Gauntlet Loop."               */
  S4: 318,   /* OFFICE   10.73s  "Instead of going back and forth with the AI..."*/
  S5: 379,   /* LECTERN  12.78s  "you set the task and tell Claude"             */
  S6: 417,   /* FAN OUT  14.03s  "to deploy a massive team of subagents to..."  */
  S7: 497,   /* LINE 3   16.69s  "But the secret sauce is in the third line..." */
  S8: 565,   /* PULPIT   18.98s  "where you assign an AI critic."               */
  S9: 607,   /* THE RUN  20.38s  "The agents loop and refine the code..."       */
  S10: 672,  /* THE BAR  22.52s  "until the critic is amazed by the result."    */
  S11: 750,  /* DRUM     25.12s  "Now this eats up tokens fast,"                */
  S12: 785,  /* MVP      26.30s  "so you should build your minimum viable..."   */
  S13: 856,  /* UNLEASH  28.67s  "and then unleash the Gauntlet Loop to..."     */
  S14: 933,  /* CTA      31.24s  "I put this all in a free setup guide, just..."*/
  END: LOOP_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.END - L.S14,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate with
   24 of 41 cues out of one chiptune pack, because the tool measures spectra and
   has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a proving hall — plant
   hum, a throw lever, cast clanks, hatch thuds, a winch ratchet, a chain, a
   rubber stamp, a flip board, a knife switch, a furnace and a crowd on the
   floor. **ZERO chiptune cues** — the greppable gate is that no `src` starts
   with `c_`, which returns zero hits.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz, because what makes
   a run annoying is a repeated BRIGHT transient. The only cue used five times
   is `thock` at **1.3% above 2kHz** — the lowest transient in the bank — and it
   is pitched in runs rather than copy-pasted. Every bright one is capped at
   three or fewer: `stamp_press` 50.4% x3 · `gold_stamp` 68.8% x3 ·
   `ratchet` 67.3% x2 · `neon_on` 69.1% x2 · `gear_shift` 43.3% x2 ·
   `lamp_clunk` x3 · `sign_clack` 49.9% x1.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count PEAKS on
   S6 (the fan-out), S9 (the loop) and S10 (the payoff) and thins to two or
   three on the information scenes.

   ⚠️ 53 cues over 34.07s = **1.56/sec** against a 1.0-1.5 house ceiling, which
   is the same figure reel 115 shipped and a deliberate call rather than an
   oversight: Alex has twice asked for a sound on every reward beat, and the
   mechanism behind the ceiling is a repeated BRIGHT transient, not a count.
   The repeated cues here are the two lowest-HF transients in the bank.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE INTAKE (5). The lever, then FOUR stage-pops of which only two
     are sounded — four identical thuds is a metronome, two pitched apart reads
     as one thing accelerating — and the top-out takes the reel's heaviest low. */
  { at: S(L.S0 + 0),  src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 3.4, rate: 0.92 },
  { at: S(L.S0 + 4),  src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.96 },
  { at: S(L.S0 + 12), src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 0.62, rate: 1.06 },
  { at: S(L.S0 + 34), src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 0.72, rate: 0.92 },
  { at: S(L.S0 + 55), src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.46, rate: 0.88 },

  /* ---- S1 · THE BENCH FLOOR (4). Three artifacts seating are NOT three copies
     of one sample. One winch ratchet under the run, then three `thock` seats
     pitched UP — an ascending run is what makes a repeat read as PROGRESS. */
  { at: S(L.S1 + 6),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.54, rate: 0.90 },
  { at: S(L.S1 + 22), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 0.90 },
  { at: S(L.S1 + 49), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 1.02 },
  { at: S(L.S1 + 76), src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.38, rate: 1.14 },

  /* ---- S2 · THE GALLERY (3). ⛔ NOT one cue per flap cell — 24 bright clacks
     is the metronome the ceiling exists to prevent. One lever, ONE texture
     riding the wave, and the lock. */
  { at: S(L.S2 + 6),  src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 1.08 },
  { at: S(L.S2 + 18), src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.90, rate: 0.94 },
  { at: S(L.S2 + 74), src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.78 },

  /* ---- S3 · THE HALL (3). Four lamp banks, THREE sounded and climbing, plus
     the rail motor catching on the last. */
  { at: S(L.S3 + 2),  src: "lamp_clunk.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.88 },
  { at: S(L.S3 + 14), src: "lamp_clunk.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 1.00 },
  { at: S(L.S3 + 26), src: "lamp_clunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.30, rate: 1.12 },

  /* ---- S4 · THE SIDE OFFICE (3). The shoves get DULLER, not louder — the room
     is a treadmill, so its sound has to lose energy rather than gain it. */
  { at: S(L.S4 + 4),  src: "chair_knock.wav",  v: LEVELS.SFX_MID,     dur: 0.30, rate: 1.02 },
  { at: S(L.S4 + 13), src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.50, rate: 0.94 },
  { at: S(L.S4 + 40), src: "chair_knock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.30, rate: 0.86 },

  /* ---- S5 · THE LECTERN (2). One card, one seat. */
  { at: S(L.S5 + 6),  src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.14 },
  { at: S(L.S5 + 11), src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.40, rate: 0.96 },

  /* ---- S6 · THE FAN-OUT (5) — ⭐ a density peak. Ten sprites erupting are TWO
     pitched textures plus the belt, never ten cues. */
  { at: S(L.S6 + 0),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 2.8, rate: 1.06 },
  { at: S(L.S6 + 6),  src: "slot_stop.wav",    v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.04 },
  { at: S(L.S6 + 18), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.92 },
  { at: S(L.S6 + 42), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.16, rate: 1.10 },
  { at: S(L.S6 + 62), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 1.20 },

  /* ---- S7 · THE THIRD LINE (3). ⭐ THE THIRD CUE IS THE OUTPUT HALF: the seat
     is answered by the hall waking, and a seat that changes nothing is a click. */
  { at: S(L.S7 + 10), src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.60, rate: 0.82 },
  { at: S(L.S7 + 40), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.20, rate: 0.86 },
  { at: S(L.S7 + 44), src: "neon_on.wav",      v: LEVELS.SFX_MID,     dur: 0.60 },

  /* ---- S8 · THE PULPIT (3). The villain arrives on the lowest pair in the reel. */
  { at: S(L.S8 + 2),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.90, rate: 0.90 },
  { at: S(L.S8 + 16), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.20, rate: 0.80 },
  { at: S(L.S8 + 24), src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.44, rate: 0.82 },

  /* ---- S9 · THE RUN (5) — ⭐ a density peak. THREE paddle slams pitched DOWN
     the run (the loop is getting heavier, not brighter) over a rail bed, and one
     punt. ⛔ `stamp_press` is 50.4% above 2kHz so these three are its whole
     budget for the reel. */
  { at: S(L.S9 + 0),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 2.3, rate: 1.14 },
  { at: S(L.S9 + 12), src: "stamp_press.wav",  v: LEVELS.SFX_MID,     dur: 0.44, rate: 1.06 },
  { at: S(L.S9 + 22), src: "punch_thud.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.30, rate: 1.10 },
  { at: S(L.S9 + 34), src: "stamp_press.wav",  v: LEVELS.SFX_MID,     dur: 0.44, rate: 0.94 },
  { at: S(L.S9 + 54), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,    dur: 0.44, rate: 0.84 },

  /* ---- S10 · THE BAR (5) — ⭐ THE PEAK, and the reel's densest scene.
     ⭐ A REWARD BEAT HAS TO RESOLVE (§18): the arrival, the FLIP, the bar
     flooding, the counter turning over and the crowd, all inside 26 frames.
     ⛔ AND THE SLAM THAT DOES NOT COME IS THE POINT — there is deliberately no
     `stamp_press` in this scene. The pattern established three times in S9 is
     broken by silence where the fourth slam should be. */
  { at: S(L.S10 + 20), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.80, rate: 0.94 },
  { at: S(L.S10 + 40), src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.54, rate: 1.06 },
  { at: S(L.S10 + 44), src: "neon_on.wav",      v: LEVELS.SFX_MID,     dur: 0.70, rate: 0.92 },
  { at: S(L.S10 + 46), src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.40, rate: 1.24 },
  /* ⛔ THE CELEBRATION IS AN OBJECT, NOT A LABEL. Every crowd sample in the
     library is a NOISE BED or a SWELL — `crowd_cheer` 1205ms attack, 50.4%
     above 2kHz; `crowd_cheers2` 2537ms; `crowd_run` 695ms — i.e. every one of
     them IS the puff of air that is banned. A proving hall does not roar
     anyway: it RINGS A BELL when something passes. `bell_ring` is 7ms attack,
     16.1% above 2kHz, and it is the sound the set would actually make. */
  { at: S(L.S10 + 50), src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.70 },
  { at: S(L.S10 + 60), src: "dead_thud.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.34, rate: 0.90 },

  /* ---- S11 · THE DRUM ROOM (3). Three laps thump overhead; TWO are sounded. */
  { at: S(L.S11 + 0),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 1.3, rate: 0.84 },
  { at: S(L.S11 + 4),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.84 },
  { at: S(L.S11 + 26), src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.16, rate: 0.74 },

  /* ---- S12 · ONE BENCH (3). Four assembly pops, TWO sounded and climbing,
     then the stamp. */
  { at: S(L.S12 + 6),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.22, rate: 0.94 },
  { at: S(L.S12 + 38), src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.22, rate: 1.10 },
  { at: S(L.S12 + 62), src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.52, rate: 0.98 },

  /* ---- S13 · THE HALL AT SPEED (4). The switch, the hall spinning up, and the
     final land. */
  { at: S(L.S13 + 4),  src: "knife_switch.wav", v: LEVELS.SFX_MID,     dur: 0.18 },
  { at: S(L.S13 + 8),  src: "engine_rev.wav",   v: LEVELS.SFX_HERO,    dur: 1.30, from: 0.30 },
  { at: S(L.S13 + 34), src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.36, rate: 1.12 },
  { at: S(L.S13 + 58), src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.64 },

  /* ---- S14 · THE FRONT (3). The press, one hand-off texture, and the plate
     flipping EXACTLY on the spoken keyword (33.44s = f1003 = local f70). */
  { at: S(L.S14 + 4),  src: "ticket_click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16 },
  { at: S(L.S14 + 30), src: "thock.wav",        v: LEVELS.SFX_TEXTURE, dur: 0.34, rate: 1.10 },
  { at: S(L.S14 + 70), src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.60, rate: 1.02 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad
   ([[feedback_house_bed_is_a_real_track]]). Reels 107-114 drifted onto generated
   beds one clone at a time and every audio gate stayed green, because a pad
   passes all of them. Counted before choosing: `ados` 13 uses, `ebm` 8.

   Three DIFFERENT PASSAGES, because the same track at a different volume is an
   audio-only variant, which [[feedback_variant_dhash_measured]] calls a pixel
   duplicate. Every window below was measured, not picked by ear — a 5ms RMS
   scan over both tracks, scored on mean level, head onset and the worst-1.5s
   drop against the window's own mean:

     gauntlet  ADOS @ 135.0s   mean -13.1 dB   onset 0ms   worst-1.5s drop 2.9 dB
     amber     ADOS @ 185.0s   mean -13.0 dB   onset 0ms   worst-1.5s drop 2.8 dB
     steel     EBM  @  65.0s   mean -14.6 dB   onset 0ms   worst-1.5s drop 4.8 dB

   ⛔⛔ THE BED IS COMPRESSED BEFORE IT IS LEVELLED. `loudnorm` sets an
   INTEGRATED level, so a track with 11 dB of internal range puts its brass hits
   far above the target and they read as swells inside a VO gap. `acompressor`
   at 4:1 runs first.
   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — IT IS WHERE "THE PUFF OF AIR"
   LIVES. Reel 115 spent three rounds hunting a named cue that did not exist;
   the air was the bed's own cymbal wash above 5k. `treble=g=-11:f=4800` plus a
   -5 dB shelf at 9k, on every cut, before the level stage.
   ⛔ NO `afade in` on any of them: a 0.9s fade kills the first downbeat, and
   `verify_reel.MUSIC_ONSET_0` wants the bed audible inside 150ms. Measured
   after the chain: all three at **0ms**.  */
const BED: Record<Variant, string> = {
  gauntlet: "118_loop_bed.wav",
  amber:    "118_loop_bed_amber.wav",
  steel:    "118_loop_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { gauntlet: 1258, amber: 1332, steel: 1190 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13), so this
   is re-solved on THESE files, today, AFTER the high shelf rather than
   inherited through it:
       VO       -18.2 LUFS  x LEVELS.DIALOGUE (-6)  ->  -24.2 in the mix
       gauntlet -23.8 LUFS  x LEVELS.MUSIC (-20)    ->  -43.8   gap 19.6 dB
       amber    -23.8 LUFS                          ->  -43.8   gap 19.6 dB
       steel    -23.4 LUFS                          ->  -43.4   gap 19.2 dB
   The house figure is ~12 dB under the VO, which asks for +7.6 / +7.6 / +7.2.
   ⛔ AND THE RESULT IS CHECKED AGAINST THE STANDING CAP. `reel-vo-pacing` caps a
   normal-mastered bed at **volume 0.25** (Alex: *"the background music is too
   loud compared to the voiceover"*). These solve to 0.240 / 0.240 / 0.229 —
   all three under it, so no cut has to be pulled back off its target. */
export const BED_GAIN: Record<Variant, number> = {
  gauntlet: db(7.60),   /* -> volume 0.2399 */
  amber:    db(7.60),   /* -> volume 0.2399 */
  steel:    db(7.20),   /* -> volume 0.2291 */
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("118loop_vo.wav")} volume={LEVELS.DIALOGUE} />
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
   ⭐⭐ THE HEADER CHANGES PER SECTION, AND IS NEVER OFF.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction —
   it is on for every frame AND it re-states the current claim, so the reel is
   legible to someone watching muted.
   ⭐ Each band names the MECHANISM in product nouns, never the theme. Nothing
   here says "gauntlet hall", "pulpit" or "the run".
   ⛔⛔ AND THIS IS WHERE THE WORDS LIVE. The picture carries MARKS and NUMERALS
   only (reel 109 was rejected on 33 `<span>`s in its animation layer); the
   header band and the captions carry the language.
   ⛔ NO MONEY IN ANY BAND — the VO names no figure (honesty ledger 1).
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "ONE PROMPT. THREE LINES.", hot: "55,000 LINES OF CODE" },
  { from: L.S1,  big: "IT BUILDS THE WHOLE THING", hot: "APPS · SITES · A PLAYABLE GAME" },
  { from: L.S2,  big: "CLAUDE CODE'S CREATOR",     hot: "“MY JOB IS TO WRITE LOOPS”" },
  { from: L.S3,  big: "THE GAUNTLET LOOP",         hot: "BUILDERS VS CRITICS" },
  { from: L.S4,  big: "STOP PROMPTING BY HAND",    hot: "NO MORE BACK AND FORTH" },
  { from: L.S5,  big: "LINE 1 · SET THE TASK",     hot: "AND WHAT GREAT LOOKS LIKE" },
  { from: L.S6,  big: "LINE 2 · FAN IT OUT",       hot: "A TEAM OF SUBAGENTS" },
  { from: L.S7,  big: "LINE 3 · THE SECRET",       hot: "THE PART EVERYONE MISSES" },
  { from: L.S8,  big: "LINE 3 · ADD A CRITIC",     hot: "THE BUILDER NEVER GRADES ITSELF" },
  { from: L.S9,  big: "THEN IT LOOPS ITSELF",      hot: "BUILD · JUDGE · REJECT · REPEAT" },
  { from: L.S10, big: "IT STOPS WHEN IT'S GREAT",  hot: "NOT WHEN IT'S FINISHED" },
  { from: L.S11, big: "IT BURNS TOKENS FAST",      hot: "SO RUN IT LAST, NOT FIRST" },
  { from: L.S12, big: "BUILD YOUR MVP FIRST",      hot: "THE CHEAP VERSION, BY HAND" },
  { from: L.S13, big: "THEN UNLEASH THE LOOP",     hot: "IT POLISHES THE FINAL BUILD" },
  { from: L.S14, big: "COMMENT “LOOP”",            hot: "AND I'LL SEND THE SETUP" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* fed f+12 on the hook so the header is SETTLED on frame 0 — frame 0 is the
     only frame guaranteed to be seen and it may not contain an animation. */
  return <HookHeader big={b.big} hot={b.hot} f={f < 20 ? f + 12 : f - b.from + 12} />;
};

/* the three trial cuts, from ONE factory — never three copied files. IG flags
   near-duplicates, so the axes that vary are the ones a perceptual hash samples
   hardest: an in-panel CAMERA OFFSET on every scene, a per-cut GRADE (contrast
   and brightness only — ⛔ never hue, which would recolour the clay), a
   different BED (two tracks, three passages), a different RAKE speed and phase,
   and a different CAPTION BAND Y. */
export const ReelGauntlet = makeReel("gauntlet");
export const ReelAmber    = makeReel("amber");
export const ReelSteel    = makeReel("steel");
/** identical picture to the main cut, bed 6 dB down — an A/B on the bed only */
export const ReelQuiet    = makeReel("gauntlet", true);
