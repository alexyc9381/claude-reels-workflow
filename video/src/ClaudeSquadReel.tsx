import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9,
  S10, S11, S12, S13, S14, S15, S16, S17, S18, S19,
} from "./SqdScenes";
import type { Variant, HookAction } from "./SqdScenes";
import { CAM, GRADE } from "./SqdScenes";
import { CamCtx, R, STAR_TOTAL, KEYWORD } from "./SqdWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_squad.json";

/* ===========================================================================
   REEL 112 · "SQUAD" — THE ASSEMBLY.  Board: storyboards/112-squad.md.

   SEVEN free Claude Code repos, verified live 2026-08-18. A lone Claude buried
   under thousands of GitHub repos gets seven specialists cut out of the pile,
   and each one takes over the job he was failing at alone.

   VO: public/vo_squad.wav — 81.64s, 299 words, cut from a 108.60s raw take.
   TWO `cut cut` flubs removed (the Playwright retake at raw 67.95s and the
   "11 times more per-" retake at raw 98.02s), the lead and tail trimmed, eight
   pauses tightened to 0.22s, loudnormed to -16 LUFS. The cut file was
   re-transcribed and 0 flubs survived.

   ⛔⛔⛔ THE LEAD TRIM. `silencedetect=-40dB` reported speech from raw 1.043s.
      A 10ms RMS scan says the first word ("Most") actually starts at raw
      1.040s — but the scan also found -48.5 dB mouth clicks at 0.26-0.31s,
      which is EXACTLY the blip that shipped reel 110 with 0.53s of dead room
      tone while `VO_ONSET_0`, `VO_NO_FLUB` and `AUDIO_AT_0` all passed. Cut at
      1.025 (15ms of natural pre-roll): the voice starts at 0.00s.
      ⭐ THE RULE: silencedetect finds a THRESHOLD CROSSING, not a WORD.

   ⛔⛔ NO SPEEDUP — AND THAT IS THE RULE, NOT AN OVERSIGHT. The house default is
      x1.10, but `reel-vo-pacing` gates the speedup on the TAKE'S NATURAL PACE:
      the ~7% figure assumes a ~2.7 wps delivery, and *"if the RECORDING is
      already brisk, adding 1.07x on top makes it frantic"* (ARENA: "wayyy too
      fast, sped up too much"). This take runs **3.73 wps** natural. Measured at
      every candidate tempo, R1 fails at ALL of them including 1.00x:

        x1.00  81.18s  overall 3.73  hook 4.30  worst5s 6.00
        x1.05  77.31s  overall 3.92  hook 4.50  worst5s 6.00
        x1.10  73.80s  overall 4.11  hook 4.70  worst5s 6.40

      i.e. the hook (bar 4.0) and the CTA (bar 4.5) are hot AS RECORDED, and
      every speedup makes both worse. 1.00x is the best available answer and the
      R1 miss is a property of the take. FLAGGED, not silently papered over.

   ⭐ 81.63s is far outside the stated 22-29s house range and outside what has
      actually shipped (107 CLAUDE 35.11 · 110 FLOW 31.93 · 104 PLUGIN 30.66).
      It is a SEVEN-item listicle with ~78s of pure speech: there is no edit that
      reaches 30s without dropping items, and the VO promises "the seven that you
      actually need". FLAGGED, not silently trimmed.

   ⛔⛔ THE HONESTY LEDGER LIVES IN SqdWorld.tsx (`R`, `X11_BANNED`,
      `THOUSANDS_BANNED`). The two that matter:
      1 the VO's CTA says the guide makes you "11 times more productive". That
        figure has NO source, so NO `11`, no `11x`, no `%` and no productivity
        meter is typeset anywhere — S18 draws the MECHANISM (one paste against
        seven manual searches, as a race) and stops at the edge of the claim.
        Gate:  grep -oE '\b11 ?(x|times)' src/Sqd*.tsx | wc -l   ->  0
      2 "thousands of Claude repos" is true but uncountable, so it is a MASS
        (the crate canyon) and never a numeral. There is no "1000+" plate.

   ⛔⛔ THE HEADER IS ON FOR ALL 2449 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f + 12`
      on the hook so it is SETTLED on frame 0 (SectionHeader fades in over 10
      frames). It also CHANGES per section: reel 107 taught that the header must
      never disappear, and reel 108 taught that that is not the same instruction
      as saying the same thing for the whole reel.
      ⭐ It is also where every CATEGORY WORD lives — the five workflow stages,
      the four principles, the four browser verbs. Reel 109 was rejected at v8
      with 33 `<span>`s in the animation layer; the picture here carries only
      MARKS and NUMERALS.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 2354 frames = 78.47s. ⭐ ×1.04, ALEX'S CALL. I measured and recommended 1.00x
    (this take is 3.73 wps natural against the ~2.7 the house speedup assumes, and
    R1 fails at every tempo including 1.00x). He asked for 1.04 anyway, so the VO
    is re-cut at 1.04, the captions are REBUILT AGAINST THE NEW WAV rather than
    divided, and every onset and cue below is re-derived from it. */
export const SQD_TOTAL = 2285;

/* ⛔ MEASURED WORD ONSETS from src/data/words_squad.json, converted to frames.
   Nothing here is estimated — every value is `round(onset * 30)` of the VO's own
   sentence starts. */
export const L = {
  S0: 0,
  S1: 91,
  S2: 162,
  S3: 216,
  S4: 375,
  S5: 451,
  S6: 588,
  S7: 739,
  S8: 893,
  S9: 967,
  S10: 1060,
  S11: 1167,
  S12: 1257,
  S13: 1424,
  S14: 1501,
  S15: 1663,
  S16: 1810,
  S17: 1912,
  S18: 1999,
  S19: 2150,
  END: SQD_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.S16 - L.S15,
  S16: L.S17 - L.S16, S17: L.S18 - L.S17, S18: L.S19 - L.S18, S19: L.END - L.S19,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ MEASURED BEFORE IT WAS BUILT, NOT AFTER. Reel 109 built a 44-cue bank
   and then found 14 of them failed on measurement while sounding right by name.
   Every cue below was run through the four gates FIRST; three candidates were
   thrown out on their numbers before a single `at` was written:

     scanner_sweep  0.90s   4.3% >2kHz   0.3% <250Hz   60.6ms attack  AIR-SWELL
     blip_up        0.35s  11.3%         1.7%          57.6ms         AIR-SWELL
     coin_slide     1.62s  89.7%         0.2%         134.9ms         HISS-BED + AIR-SWELL

   `scanner_sweep` was the planned SCRAPE cue and `blip_up` was the planned
   green-lamp run; both are replaced below (`ratchet`, `green_tone`).

   ⛔⛔ AND THE BANK BELONGS TO THE WORLD, NOT JUST TO THE GATES. Reel 110's v1
   passed every gate with 24 of its 41 cues from ONE chiptune pack, and Alex:
   *"it just sounds like video game upgrade sounds, it's not good at all."*
   There is no gate for "this is a Mario sound". **ZERO `c_*` cues here.**
       grep -oE 'c_[a-z0-9_]+[.]wav' src/ClaudeSquadReel.tsx | wc -l   ->  0
   Every cue is a real mechanical/foley sound or a cinematic impact, chosen so
   the reel sounds like the nine places it is set in: a crate landing on wet
   concrete, a drawer taking a tape, a press coming down, a split-flap board, a
   cartridge seating, a hammer, a crusher, a barrier slamming, footfalls.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz. Honoured by
   construction — the high-frequency cues are each used <=4 times:
     bamboo_crack 75.8% (x4)   ceramic_crack 88.0% (x3)   split_flap 57.7% (x4)
     sign_clack   51.1% (x1)   gear_shift    72.5% (x4)   crusher     40.4% (x4)
     ratchet      68.5% (x3)   chain_clank   71.7% (x2)   snap        92.8% (x1)
     stamp_press  35.3% (x4)   crash         77.3% (x1)   metal_ping  93.9% (x0)
   The 5+ cues are all LOW: impact_deep 0.1% · slate_whump 2.3% · thock 0.9% ·
   mallet_tap 1.3% · can_bong 1.3% · chair_knock 0.6% · green_tone 0.3% ·
   mech_clank 22.8% · data 13.8%.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. 121 cues over 81.63s = **1.48/sec**, inside
   the house 1.0-1.5 ceiling (a rejected reel ran 3.82). The contour PEAKS on the
   three scenes that carry the story — S10 the three benches, S15 the barrier,
   S16 the green run — and thins to 3-4 cues elsewhere.
   -------------------------------------------------------------------------- */
const SFX_RAW: Cue[] = [
  /* ---- S0-S2 · THE OPEN.  ⛔⛔⛔ REBUILT TWICE. Alex: *"the sfx design is not
     good, it sounds choppy, it should be more interesting and dopamine inducing."*

     CHOPPY IS A DIAGNOSIS: v3's open was eleven short transients in three seconds
     with NOTHING SUSTAINING UNDER THEM, so each cue read as a separate click
     rather than as one gesture. The cue RATE was already legal — the defect was
     glue and shape, not count.

     ⛔⛔ MY FIRST FIX WAS WRONG AND THE GATE CAUGHT IT. I reached for `angelic`,
     `survive_chord`, `riser_cine`, `metal_riser`, `chimehi/lo` and `sparkle` and
     `sfx_audit` flagged all seven as AIR (attack >40ms with <15% under 250Hz).
     I then tried to argue the gate was over-broad — that a chime is tonal where a
     swoosh is noise — and MEASURED IT: spectral flatness put the known swooshes
     (`whoosh` 0.122, `lib_whoosh` 0.081) as MORE tonal than `riser_cine` (0.169).
     The distinction does not hold, so the gate stands and none of those cues ship.

     ⭐ THE GLUE COMES FROM THE LOW END INSTEAD, which is what the gate is actually
     shaped to allow: a sustained cue passes if it carries real weight under 250Hz.
       `cello_note`  6.00s  82.6% low   the bed under the whole open
       `lib_cinematic_hit` 5.63s 87.2% low   the two big beats
       `gong`        2.20s  67.2% low   the crown's sustain
       `boom`        0.55s  98.3% low   the floor under every impact
     Every impact is LAYERED (body + low + top) instead of a lone tick, and the
     crown gets the one reward stack in the reel. */
  { at: 0.00, src: "cello_note.wav", v: db(-27), dur: 6.00, rate: 0.96 },
  { at: 0.00, src: "lib_cinematic_hit.wav", v: db(-15), dur: 2.60, rate: 0.92 },
  { at: 0.00, src: "boom.wav", v: db(-14), dur: 0.55, rate: 0.90 },
  { at: 0.00, src: "sub.wav", v: db(-13), dur: 0.42 },

  /* the six crates landing on his head — each a LAYERED thud, pitch climbing as
     the tower gets taller, so the run reads as one rising gesture. */
  ...[0.19, 0.65, 1.10, 1.55, 2.01, 2.46].map((t, i) => ({
    at: t, src: "rebuild_thud.wav", v: db(-18 + i * 0.8), dur: 0.80, rate: 0.82 + i * 0.05,
  } as Cue)),
  { at: 2.46, src: "boom.wav", v: db(-14), dur: 0.55, rate: 0.86 },

  /* ---- S1 3.11 · THE RELEASE + THE SUMMON. The big one, layered four deep. */
  { at: 3.11, src: "lib_cinematic_hit.wav", v: db(-10), dur: 3.20, rate: 1.00 },
  { at: 3.11, src: "boom.wav", v: db(-10), dur: 0.55, rate: 0.86 },
  { at: 3.11, src: "gong.wav", v: db(-18), dur: 2.20, rate: 1.04 },
  { at: 3.11, src: "sub.wav", v: db(-11), dur: 0.42, rate: 0.88 },

  /* the seven arriving — body + top, pitch stepping up. ⛔ the crack is SPLIT
     across two samples: `bamboo_crack` is 74.5% above 2kHz, so seven uses of it
     tripped the SLAP gate (a bright transient repeated 5+ times is a metronome). */
  ...[3.21, 3.44, 3.66, 3.88, 4.10, 4.33, 4.55].map((t, i) => ({
    at: t, src: "impact_deep.wav", v: db(-21 + i * 0.5), dur: 0.80, rate: 0.90 + i * 0.035,
  } as Cue)),
  ...[3.21, 3.44, 3.66, 3.88, 4.10, 4.33, 4.55].map((t, i) => ({
    at: t, src: "rebuild_thud.wav", v: db(-20 + i * 0.5), dur: 0.80, rate: 0.86 + i * 0.045,
  } as Cue)),
  /* the seven RISING — this is the line "these are the seven you actually need",
     so the run has to climb rather than just repeat */
  ...[3.21, 3.44, 3.66, 3.88, 4.10, 4.33, 4.55].map((t, i) => ({
    at: t, src: "pickup_chime.wav", v: db(-25 + i * 0.7), dur: 0.34, rate: 0.80 + i * 0.085,
  } as Cue)),
  { at: 4.77, src: "temper_chime.wav", v: db(-19), dur: 0.70, rate: 1.04 },

  /* ---- S2 5.57 · THE CROWN.  ⭐ THE ONE REWARD STACK IN THE REEL, on the one
     frame that earns it: a low body, a bright top, and a 2.2s gong to ring under
     the rest of the shot so the beat does not just stop. */
  { at: 5.67, src: "lib_cinematic_hit.wav", v: db(-13), dur: 2.60, rate: 1.08 },
  { at: 5.67, src: "gong.wav", v: db(-15), dur: 2.20, rate: 1.10 },
  { at: 5.67, src: "temper_chime.wav", v: db(-14), dur: 0.70, rate: 1.10 },
  { at: 5.67, src: "impact_deep.wav", v: db(-16), dur: 0.80, rate: 1.06 },
  { at: 6.15, src: "bell_ring.wav", v: db(-17), dur: 1.60, rate: 1.08 },
  /* the seventh crate, still shut, still thumping under all of it */
  { at: 5.88, src: "impact.wav", v: db(-20), dur: 0.62, rate: 0.86 },
  { at: 6.46, src: "impact.wav", v: db(-17), dur: 0.62, rate: 0.82 },
  { at: 6.46, src: "sub.wav", v: db(-14), dur: 0.42, rate: 0.90 },

  /* ---- S3 7.77 · THE ARCHIVE. Fourteen tapes are FILED but only six are
     CUED — a cue per object would run 2.5/sec on a quiet scene. ---------- */
  ...[7.56, 8.39, 9.24, 10.17, 11.20].map((t, i) => ({
    at: t, src: "mech_clank.wav", v: db(-22 + i * 0.4), dur: 0.12, rate: 0.88 + i * 0.06,
  } as Cue)),

  /* ---- S4 13.41 · THE RETRIEVAL. ------------------------------------- */

  { at: 13.89, src: "data.wav", v: db(-18), dur: 0.21, rate: 0.96 },
  /* ---- S5 16.12 · THE LINE. FIVE DIFFERENT mechanical foley, one per
     station, ascending — a list becomes a process in the audio too. ------ */

  { at: 15.97, src: "mallet_tap.wav", v: db(-19), dur: 0.34, rate: 0.92 },
  { at: 16.72, src: "pneu_thunk.wav", v: db(-19), dur: 0.45, rate: 0.98 },
  { at: 17.47, src: "gear_shift.wav", v: db(-20), dur: 0.09, rate: 1.02 },
  { at: 18.21, src: "mech_clank.wav", v: db(-19), dur: 0.12, rate: 1.06 },
  { at: 18.96, src: "wrench_clank.wav", v: db(-21), dur: 0.06, rate: 1.10 },
  /* ---- S6 20.99 · THE PROMOTION and the four throws. ------------------ */
  { at: 21.64, src: "chair_knock.wav", v: db(-18), dur: 0.30, rate: 0.96 },
  { at: 21.64, src: "temper_chime.wav", v: db(-20), dur: 0.70, rate: 1.06 },
  ...[22.32, 23.07, 23.81, 24.49].map((t, i) => ({
    at: t, src: "slate_whump.wav", v: db(-18 + i * 0.5), dur: 0.16, rate: 0.92 + i * 0.06,
  } as Cue)),

  /* ---- S7 26.37 · THE INDEX HALL. `split_flap` is the literal sound of the
     literal object, used exactly 4 times so it stays under the slap gate. - */
  { at: 24.91, src: "knife_switch.wav", v: db(-17), dur: 0.12, rate: 0.92 },
  ...[25.10, 26.16, 27.22, 28.27].map((t, i) => ({
    at: t, src: "sign_clack.wav", v: db(-19 + i * 0.4), dur: 0.22, rate: 0.94 + i * 0.05,
  } as Cue)),

  { at: 28.93, src: "lamp_clunk.wav", v: db(-21), dur: 0.27, rate: 1.04 },
  /* ---- S8 31.88 · THE CHUTE. Three cartridges seating, then the rack
     closing ITSELF — the latch is the point of the beat. ---------------- */
  ...[30.43, 30.98, 31.55].map((t, i) => ({
    at: t, src: "can_bong.wav", v: db(-18 + i * 0.5), dur: 0.34, rate: 1.06 - i * 0.06,
  } as Cue)),

  { at: 32.05, src: "lamp_clunk.wav", v: db(-18), dur: 0.27, rate: 0.94 },
  /* ---- S9 34.54 · THE BENCHES. Two pools snapping on. ----------------- */
  { at: 33.28, src: "spotlight_snap.wav", v: db(-18), dur: 0.40, rate: 0.98 },
  { at: 33.28, src: "chair_knock.wav", v: db(-21), dur: 0.30, rate: 1.04 },
  { at: 34.03, src: "spotlight_snap.wav", v: db(-17), dur: 0.40, rate: 1.06 },
  { at: 34.03, src: "chair_knock.wav", v: db(-20), dur: 0.30, rate: 0.94 },

  /* ---- S10 37.87 · ⭐ THE DENSITY PEAK. Three benches, three DIFFERENT
     rhythms running at once, then one hero bell when all three deliver. -- */
  ...[35.58, 36.57, 38.45].map((t, i) => ({
    at: t, src: "mallet_tap.wav", v: db(-17 + i * 0.4), dur: 0.20, rate: 0.90 + i * 0.07,
  } as Cue)),
  ...[35.89, 36.89].map((t, i) => ({
    at: t, src: "mallet_tap.wav", v: db(-19), dur: 0.34, rate: 1.04 + i * 0.06,
  } as Cue)),
  ...[36.21, 37.88].map((t, i) => ({
    at: t, src: "ratchet.wav", v: db(-22), dur: 0.50, rate: 0.96 + i * 0.08,
  } as Cue)),
  { at: 38.45, src: "bell_ring.wav", v: db(-20), dur: 1.60, rate: 1.04 },

  /* ---- S11 41.59 · THE CONVERGENCE and the FREE tag. ------------------ */
  ...[39.10, 39.75].map((t, i) => ({
    at: t, src: "data.wav", v: db(-22 + i * 0.5), dur: 0.21, rate: 0.92 + i * 0.08,
  } as Cue)),
  { at: 40.92, src: "gear_shift.wav", v: db(-19), dur: 0.09, rate: 0.94 },
  { at: 40.92, src: "can_bong.wav", v: db(-19), dur: 0.34, rate: 0.90 },

  /* ---- S12 44.80 · THE GAUGE. Four crusher impacts, DESCENDING and each
     heavier — the block is being taken apart, not decorated. ------------ */
  ...[43.36, 44.41, 45.47, 46.53].map((t, i) => ({
    at: t, src: "crusher.wav", v: db(-18 + i * 0.7), dur: 0.90, rate: 1.06 - i * 0.05,
  } as Cue)),
  { at: 46.53, src: "sub.wav", v: db(-14), dur: 0.42, rate: 0.90 },

  /* ---- S13 50.86 · SENIOR. The costume snaps on a beat. --------------- */
  { at: 48.27, src: "temper_chime.wav", v: db(-17), dur: 0.70, rate: 1.10 },
  { at: 48.27, src: "spotlight_snap.wav", v: db(-19), dur: 0.40, rate: 1.02 },
  { at: 49.08, src: "thock.wav", v: db(-20), dur: 0.16, rate: 1.06 },

  /* ---- S13 47.47 · SENIOR. The chuckle, on the costume snap. */
  { at: 48.28, src: "huh.mp3", v: db(-19), dur: 0.30, rate: 0.86 },
  { at: 48.44, src: "huh.mp3", v: db(-22), dur: 0.30, rate: 0.74 },

  /* ---- S14 53.62 · THE CONTROL ROOM. One cue per VERB, four different
     mechanisms. `ratchet` replaces the rejected `scanner_sweep`. -------- */
  { at: 50.71, src: "gear_shift.wav", v: db(-18), dur: 0.09, rate: 0.88 },
  { at: 50.71, src: "pneu_thunk.wav", v: db(-20), dur: 0.45, rate: 1.06 },
  ...[51.96, 52.52].map((t, i) => ({
    at: t, src: "data.wav", v: db(-21 + i * 0.5), dur: 0.21, rate: 1.00 + i * 0.07,
  } as Cue)),
  { at: 53.58, src: "thock.wav", v: db(-15), dur: 0.16, rate: 0.90 },

  { at: 54.21, src: "ratchet.wav", v: db(-19), dur: 0.50, rate: 0.92 },
  /* ---- S15 59.43 · ⭐ THE CHECKPOINT. The barrier slam is the loudest
     single transient in the reel — it is the beat the whole open loop from
     S2 has been pointing at. ------------------------------------------- */
  { at: 55.61, src: "deep_engine.wav", v: db(-25), dur: 1.10, rate: 0.94 },
  { at: 56.83, src: "deep_engine.wav", v: db(-24), dur: 1.10, rate: 0.98 },
  { at: 58.07, src: "crash.wav", v: db(-13), dur: 0.70, rate: 0.88 },
  { at: 58.07, src: "impact_deep.wav", v: db(-12), dur: 0.80, rate: 0.86 },
  { at: 58.07, src: "sub.wav", v: db(-11), dur: 0.42, rate: 0.86 },
  { at: 58.32, src: "impact_deep.wav", v: db(-16), dur: 0.80, rate: 1.02 },
  { at: 58.32, src: "slate_whump.wav", v: db(-19), dur: 0.16, rate: 0.90 },

  /* ---- S16 64.61 · ⭐⭐ THE PEAK. Eight lamps firing green in a fast
     ascending run — `green_tone` is 0.3% above 2kHz, so eight uses is well
     inside the slap gate. Then the barrier rises and the card hits 7/7. -- */
  ...[60.53, 60.69, 60.84, 61.01, 61.15, 61.31].map((t, i) => ({
    at: t, src: "green_tone.wav", v: db(-24 + i * 0.45), dur: 0.70, rate: 0.86 + i * 0.045,
  } as Cue)),
  { at: 62.03, src: "gear_shift.wav", v: db(-17), dur: 0.09, rate: 1.08 },
  { at: 62.03, src: "bell_ring.wav", v: db(-18), dur: 1.60, rate: 1.10 },

  { at: 62.52, src: "temper_chime.wav", v: db(-15), dur: 0.70, rate: 1.00 },
  /* ---- S17 68.30 · THE ROSTER. Seven footfalls landing into one. ------ */
  ...[64.60, 64.78, 64.97, 65.15, 65.35].map((t, i) => ({
    at: t, src: "slate_whump.wav", v: db(-21 + i * 0.4), dur: 0.16, rate: 0.90 + i * 0.05,
  } as Cue)),
  { at: 65.40, src: "temper_chime.wav", v: db(-17), dur: 0.70, rate: 1.02 },

  /* ---- S18 71.55 · THE RACE. One snap on the left, two slow drags on the
     right. ⛔ Nothing here counts, meters or multiplies. ---------------- */
  { at: 67.57, src: "snap.wav", v: db(-19), dur: 0.05, rate: 1.00 },
  ...[67.76, 67.99, 68.23].map((t, i) => ({
    at: t, src: "data.wav", v: db(-22 + i * 0.4), dur: 0.21, rate: 0.94 + i * 0.07,
  } as Cue)),
  { at: 68.44, src: "pneu_thunk.wav", v: db(-23), dur: 0.45, rate: 0.86 },

  /* ---- S19 76.74 · THE KEYWORD, STRUCK. A strike is a THUD:
     `adv_strike` is 91.9% under 250Hz, `impact` is 50.2%. ---------------- */
  { at: 74.24, src: "impact.wav", v: db(-13), dur: 0.62, rate: 0.92 },
  { at: 74.24, src: "adv_strike.wav", v: db(-13), dur: 0.60, rate: 1.02 },
  { at: 74.24, src: "sub.wav", v: db(-12), dur: 0.42, rate: 0.96 },
  { at: 74.24, src: "mallet_tap.wav", v: db(-17), dur: 0.34, rate: 0.94 },
];

/* ⛔⛔⛔ "WHERE ARE THE SFX?" — AND THEY WERE ALL THERE (reel 108). The bank had
   57 cues, the audit was green, and every one fired. SOLOING THE STEM is what
   found it: at -16 LUFS the VO dominates every RMS window and will happily tell
   you the effects are fine.
     SFX stem alone   mean -37.8 dB   peak -15.9 dB
     VO same window   mean -19.5 dB   peak  -2.7 dB
   A transient 13 dB below a continuous voice is not a quiet effect, it is an
   inaudible one. The bank's SHAPE was never the problem, so this is ONE global
   gain rather than N hand-edits — the density contour and the slap gate are
   both untouched. */
const SFX_GAIN = db(9);
const SFX: Cue[] = SFX_RAW.map((c) => ({ ...c, v: c.v * SFX_GAIN }));

/** ⛔ A DIFFERENT BED PER CUT — the VO is the same recording and cannot change,
    so the bed is the only real audio-side lever against a fingerprint match, and
    ONE bed across three cuts is not a variant.
    ⛔⛔ EVERY BED IS AIR-SWELL SCANNED BEFORE USE. The reel-107 "puff of air" was
    reported FIVE times over four rounds and answered three times by rebuilding
    the SFX bank — which changed nothing, because the sound was in the MUSIC BED
    and then in the VOICE. A note that survives a fix means the fix is in the
    WRONG LAYER. */
const BED: Record<Variant, string> = {
  dawn:  "112_squad_bed.wav",
  amber: "112_squad_bed_amber.wav",
  steel: "112_squad_bed_steel.wav",
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { dawn: 1262, amber: 1326, steel: 1194 };

/** ⛔⛔ THE BED SITS ~12 dB UNDER THE VO — "present, not competing". Reel 110
    shipped 7 dB hot and the ear caught it before any tool did; reel 108 hit the
    OPPOSITE bug (a bed 26 dB under, inaudible) and the +8 dB trim that fixed it
    was copied forward without re-measuring against a different bed source.
    ⭐ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT — the two stems are
    re-measured against each other on this reel's own beds.
    ⛔ The shared `LEVELS.MUSIC` is untouched; other reels are balanced to it. */
export const BED_TRIM = { loud: db(6), quiet: db(2) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "loud",
  hk: HookAction = "pitch"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_squad.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_TRIM[bed]} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} hk={hk} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><S11 v={v} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} /></Sequence>
            <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} /></Sequence>
            <Sequence from={L.S17} durationInFrames={DUR.S17}><S17 v={v} /></Sequence>
            <Sequence from={L.S18} durationInFrames={DUR.S18}><S18 v={v} /></Sequence>
            <Sequence from={L.S19} durationInFrames={DUR.S19}><S19 v={v} /></Sequence>
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

   ⭐ Each band names the MECHANISM in product nouns, never the theme.
   ⭐⭐ AND THIS IS WHERE EVERY CATEGORY WORD LIVES. The five workflow stages, the
   four principles and the four browser verbs are all HERE, in a band nothing
   else enters — so the picture can carry only marks and numerals. Reel 109 was
   rejected at v8 with 33 spans in the animation layer.
   ⛔⛔ NOTHING HERE MAY CARRY THE "11 TIMES" CLAIM. It is unsourced (SqdWorld
   `X11_BANNED`), so the CTA bands state the ARTIFACT and the KEYWORD instead.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "7 FREE CLAUDE REPOS",       hot: "WORTH INSTALLING" },
  { from: L.S1,  big: "SEVEN SPECIALISTS",         hot: "ONE JOB EACH" },
  { from: L.S2,  big: "AND NUMBER SEVEN",          hot: "IS THE BEST ONE" },
  { from: L.S3,  big: "IT WATCHES AND FILES",      hot: "claude-subconscious" },
  { from: L.S4,  big: "NOTHING IS FORGOTTEN",      hot: `${R[0].stars} STARS · FREE` },
  { from: L.S5,  big: "BRAINSTORM · SPEC · PLAN",  hot: "TEST · REVIEW" },
  { from: L.S6,  big: "IT RUNS THE BUILD",         hot: `obra/superpowers · ${R[1].stars}★` },
  { from: L.S7,  big: "SKILLS · HOOKS · COMMANDS", hot: "ORCHESTRATORS" },
  { from: L.S8,  big: "PLUGINS INSTALL THEMSELVES", hot: `awesome-claude-code · ${R[2].stars}★` },
  { from: L.S9,  big: "THREE AGENTS AT ONCE",      hot: "NOT ONE AFTER ANOTHER" },
  { from: L.S10, big: "FEATURE · TESTS · REFACTOR", hot: "ALL RUNNING TOGETHER" },
  { from: L.S11, big: "A WHOLE DEV TEAM",          hot: `smtg-ai/claude-squad · ${R[3].stars}★` },
  { from: L.S12, big: "FOUR PRINCIPLES",           hot: "IN ONE CLAUDE.md" },
  { from: L.S13, big: "IT STOPS OVERBUILDING",     hot: `karpathy-skills · ${R[4].stars}★` },
  { from: L.S14, big: "CLICK · FILL · SCRAPE",     hot: `playwright-mcp · ${R[5].stars}★` },
  { from: L.S15, big: "NO TESTS, NO COMMIT",       hot: "IT BLOCKS THE PUSH" },
  { from: L.S16, big: "THEN YOU SHIP CLEAN",       hot: `nizos/tdd-guard · ${R[6].stars}★` },
  { from: L.S17, big: `ALL SEVEN · ${STAR_TOTAL}★`, hot: "ONE FREE SETUP GUIDE" },
  { from: L.S18, big: "ONE PASTE INSTALLS THEM",   hot: "INSTEAD OF SEVEN SEARCHES" },
  { from: L.S19, big: `COMMENT ${KEYWORD}`,        hot: "AND I'LL SEND IT OVER" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelDawn = makeReel("dawn");
/** the two hook actions, built to compare (Alex asked for the best two) */
export const ReelCollapse = makeReel("dawn", "loud", "collapse");
export const ReelBarrage = makeReel("dawn", "loud", "pitch");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** the same cut with the music bed 4 dB down — for an A/B on the bed level only */
export const ReelQuiet = makeReel("dawn", "quiet");
