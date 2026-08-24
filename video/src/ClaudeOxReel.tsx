import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, CAM, GRADE } from "./OxScenes";
import { HookGate, HookCrush, HookBoard } from "./OxHooks";
import type { Variant } from "./OxScenes";
import { CamCtx, R } from "./OxWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_119ox.json";

/* ===========================================================================
   REEL 119 · "OX" — THE UNSIGNED CORE.  Board: storyboards/119-ox.md.

   Subject: `ox-alpha`, an anonymous frontier model that appeared on OpenRouter
   on 2026-08-20, free during a preview that ends 2026-08-27.

   VERIFIED LIVE 2026-08-22, and the ledger lives in OxWorld.tsx (`R`):
     · 1,048,576-token context window · 131,072 max output
     · text + image + video in, tool calling, structured outputs
     · price on OpenRouter: zero, for the preview window only
     · the operator CLAIMS 100 trillion tokens/day of serving capacity
     · runs on OpenRouter, OpenCode Zen and Mercury Cloud
   ⛔⛔ AND THE ONE THE PICTURE IS CONSTRAINED BY: the VO says it "beats Claude
      Fable 5 and GPT-5.6 on ALL the coding benchmarks". What exists is ONE
      result — DeepSWE Pass@1 80 / 65 / 52 — from a 10-TASK COMMUNITY RUN, not
      an audited leaderboard. S2 draws that ONE test with its provenance strip
      on the board and never a wall of benchmarks. FLAGGED to Alex.
   ⛔ NOT DRAWN: the community attribution to a Zhipu/GLM variant. It is
      speculation, and a guess printed on a maker's plate is the most believable
      kind of wrong. The plate stays redacted — which is also the hook.

   VO: public/119_ox_vo.wav — 30.28s, 121 words, cut from a 46.11s raw take.

   ⛔⛔ THE RAW TAKE HAD ONE `cut cut` MARKER, at raw 18.64-19.50, with the dead
      take running 13.87-19.42 and the clean retake starting at 20.28. EVERY
      boundary came from a 10ms RMS scan of the raw file, never from whisper's
      word times:
        · whisper put the first word at 0.56s; the real /s/ of "So" builds from
          0.83s and a broadband scan MISSES it, because a fricative lives above
          3.5kHz. Cutting at the broadband onset sliced the attack off and the
          word vanished from the re-transcription. Lead is 0.82s.
        · whisper put the retake at 20.14s; the real onset is 20.28s.
      The eight kept ranges: 0.82-3.43 · 4.09-10.08 · 11.35-13.05 · 20.21-28.07
      · 31.16-34.31 · 35.29-37.02 · 37.79-41.34 · 42.64-43.92.
      The CUT file was re-transcribed end to end: clean, first word at 0.00s,
      zero markers surviving.

   ⛔⛔ THE VO SHIPS AT x1.00 AND R1 IS FLAGGED, NOT PASSED. Measured at four
      tempos on the finished cut before deciding:
               len     overall   hook 0-10s   worst 5s (bar 4.5)
        x1.00  30.46s    4.04       4.20         5.00      FAIL
        x1.05  29.10s    4.23       4.40         5.20      FAIL
        x1.10  27.79s    4.43       4.60         5.60      FAIL
        x1.15  26.60s    4.64       4.80         5.80      FAIL
      Every speedup makes the failing window worse, so C3's remedy ("reduce the
      speedup") is exhausted at x1.00. In family with what ships: 116 BILL 4.38
      · 118 LOOP 4.35 · 113 GO 4.23 · 114 SMART 4.13.
   ⭐ AND A CONTROL RUN SAID SOMETHING REEL 113's DID NOT. On the UNTRIMMED take
      the hook measures 4.00 and the worst window 4.80 — so unlike 113, the
      gap-trimming DID cost part of it. The hook's recorded air was doing real
      work, so the body keeps its dead air removed while the HOOK keeps its
      beats: 0.55s after "next week", 0.60s after "benchmarks". That single
      change took the hook 4.60 -> 4.20 and the worst window 5.20 -> 5.00.

   ⚠️ 30.28s against the 22-29s figure in the playbook. FLAGGED, not trimmed —
      and it is the SHORTEST reel since 105 (110 = 31.42 · 111 = 33.56 ·
      118 = 34.07 · 114 = 46.49 · 113 = 50.20 · 112 = 76.22).

   ⛔⛔ THE HEADER IS ON FOR ALL 908 FRAMES, rendered HERE at root, outside every
      Sequence. It is fed `f+12` on the hook so it is SETTLED on frame 0.
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the ProgressBar, the KaraokeCaption
      track, the VO, the bed and the header. Scene bodies see AssemblyCtx = true.
   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL.
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 860 frames = 28.66s. ⛔ RE-DERIVED after Alex: *"the pauses in between
    sections is too long."* Every gap in the VO went to 0.15s (the 0.29s pause
    inside the old seg3 became a real split so it got tightened too), which took
    the cut 30.59s -> 28.89s and the reel 908f -> 860f. L, CUT and
    durationInFrames are re-derived TOGETHER, per playbook C5. */
export const OX_TOTAL = 860;

/* ⛔ MEASURED WORD ONSETS from src/data/words_119ox.json, converted to frames.
   Nothing here is estimated — every value is `round(onset * 30)` of the VO's
   own beat openers, found by pattern-matching the opening words (never a
   hardcoded index — those drift the moment the VO changes). */
export const L = {
  S0: 0,     /* THE BAY     0.00s  "So you can now use Claude Code completely free for the next week." */
  S1: 75,    /* THE LINEUP  2.51s  "Now let me explain. So there's this brand new model called Ox Alpha" */
  S2: 147,   /* THE BOARD   4.88s  "that beats Claude Fable 5 and GPT-5.6 on all the coding benchmarks." */
  S3: 257,   /* THE BAY 2   8.58s  "But here's the part that's even crazier."    */
  S4: 322,   /* THE HOPPER 10.73s  "It has a free daily capacity of a hundred..." */
  S5: 392,   /* THE DECK   13.08s  "and even offers a one million token context" */
  S6: 476,   /* THE YARD   15.87s  "meaning you can use it to build anything..." */
  S7: 558,   /* YARD WIDE  18.59s  "Imagine apps, websites, games, videos..."    */
  S8: 656,   /* THE ROW    21.88s  "And you can run it in any coding software."  */
  S9: 713,   /* THE CLOCK  23.76s  "But here's the twist. It's only free..."     */
  S10: 825,  /* CTA        27.51s  "Comment OX for the free setup."              */
  END: OX_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate with
   24 of 41 cues out of one chiptune pack.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is an engine bay, a test
   floor, a token silo and a clock tower — so: plant hum, a gear shove, cast
   seats, a ratchet, coin fall, metal pings on the lane bars, a rubber stamp,
   screens waking, paper burning and a tick bed that speeds up. ZERO chiptune:
   the greppable gate is that no `src` starts with `c_`, which returns zero.

   ⛔ SLAP GATE: a cue used 5+ times must be low-HF, because what makes a run
   annoying is a repeated BRIGHT transient. The only cue used 5+ times here is
   `thock` (the lowest transient in the bank), and it is PITCHED in runs rather
   than copy-pasted. Every bright one is capped at three or fewer.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (§9). 43 cues over 28.66s = **1.50/sec**,
   and the SHAPE is the point: S0 and S2 carry 7 each (Alex asked for more on the
   board at 6s) against 2-4 on the information beats.
   inside the 1.0-1.5 house ceiling (95 = 0.98 · 105 = 1.13 · 106 = 1.48 ·
   115 = 1.56 · 118 = 1.56 · a REJECTED 107 = 3.82). The first pass ran 55 cues
   = 1.82/sec and ten were cut, taken out of the information scenes rather than
   spread evenly, so the shape stays PEAKED: S0 7 · S9 6 · S6 5 against 2-4 on
   the information beats.

   ⭐⭐ AND EVERY RUN OF A REPEATED CUE IS PITCHED **UP** A STEP — except S9's,
   which is pitched **DOWN**. An ascending run reads as PROGRESS; the villain's
   scene is the one place the reel loses, so its run is the inverse.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

/* ⭐⭐⭐ THE HOOK'S CUES ARE PER CUT, because the hooks are per cut. One shared
   list would have put ratchet clicks and a gate impact over a wall detonating
   and over a price board — three pictures, one soundtrack, which is worse than
   no soundtrack. Every cue below is on an action you can see in ITS cut. */
const HOOK_SFX: Record<Variant, Cue[]> = {
  /* THE PEN GATE · winch -> gate -> hooves -> animal -> iron -> animal */
  unsigned: [
    { at: 3 / 30,  src: "ratchet.wav",      v: LEVELS.SFX_MID * db(-1), dur: 0.32, rate: 0.94 },
    { at: 8 / 30,  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.32, rate: 1.03 },
    { at: 13 / 30, src: "ratchet.wav",      v: LEVELS.SFX_MID * db(2), dur: 0.34, rate: 1.13 },
    { at: 16 / 30, src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.70 },
    { at: 16 / 30, src: "chain_clank.wav",  v: LEVELS.SFX_TEXTURE * db(2), dur: 0.50, rate: 0.88, lead: 2 },
    { at: 17 / 30, src: "whoosh_heavy.wav", v: LEVELS.SFX_MID * db(1), dur: 0.66 },
    { at: 20 / 30, src: "crowd_run.wav",    v: LEVELS.SFX_TEXTURE * db(2), dur: 0.62, rate: 0.78 },
    { at: 2 / 30,  src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-3), dur: 1.10, rate: 0.92 },
    { at: 53 / 30, src: "stamp_press.wav",  v: LEVELS.SFX_HERO * db(3), dur: 0.34 },
    { at: 53 / 30, src: "paper_burn.wav",   v: LEVELS.SFX_TEXTURE * db(3), dur: 0.90, lead: 2 },
    /* 2 · the iron lands and the animal answers it */
    { at: 57 / 30, src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-4), dur: 0.85, rate: 0.74 },
  ],
  /* THE CRUSH · the wall straining -> it goes -> animal -> five tags turning */
  amber: [
    { at: 6 / 30,  src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.18, rate: 0.82 },
    { at: 11 / 30, src: "ceramic_crack.wav", v: LEVELS.SFX_TEXTURE * db(2), dur: 0.34, rate: 0.8 },
    { at: 16 / 30, src: "crash.wav",        v: LEVELS.SFX_HERO * db(1), dur: 0.90 },
    { at: 16 / 30, src: "impact_deep.wav",  v: LEVELS.SFX_MID * db(2), dur: 0.62, lead: 2 },
    { at: 18 / 30, src: "whoosh_heavy.wav", v: LEVELS.SFX_MID, dur: 0.60 },
    { at: 2 / 30,  src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-3), dur: 1.10, rate: 0.92 },
    /* 2 · the first price turns over — this cut's stamp beat */
    { at: 38 / 30, src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-4), dur: 0.85, rate: 0.78 },
    { at: 38 / 30, src: "sign_clack.wav",   v: LEVELS.SFX_MID * db(-2), dur: 0.26, rate: 0.94 },
    { at: 42 / 30, src: "sign_clack.wav",   v: LEVELS.SFX_MID * db(-1), dur: 0.26, rate: 1.00 },
    { at: 46 / 30, src: "sign_clack.wav",   v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.06 },
    { at: 50 / 30, src: "sign_clack.wav",   v: LEVELS.SFX_MID * db(1), dur: 0.26, rate: 1.12 },
    { at: 54 / 30, src: "sign_clack.wav",   v: LEVELS.SFX_HERO * db(-2), dur: 0.34, rate: 1.19 },
  ],
  /* THE PRICE BOARD · chains -> animal in -> THREE FLIPS, the price collapsing */
  steel: [
    { at: 5 / 30,  src: "chain_clank.wav",  v: LEVELS.SFX_TEXTURE * db(1), dur: 0.46, rate: 0.9 },
    { at: 16 / 30, src: "whoosh_heavy.wav", v: LEVELS.SFX_MID * db(1), dur: 0.64 },
    { at: 20 / 30, src: "crowd_run.wav",    v: LEVELS.SFX_TEXTURE * db(2), dur: 0.66, rate: 0.78 },
    { at: 2 / 30,  src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-3), dur: 1.10, rate: 0.92 },
    { at: 40 / 30, src: "split_flap.wav",   v: LEVELS.SFX_MID * db(2), dur: 0.40, rate: 1.00 },
    { at: 50 / 30, src: "split_flap.wav",   v: LEVELS.SFX_MID * db(3), dur: 0.40, rate: 0.94 },
    /* 2 · the number lands on zero — this cut's stamp beat */
    { at: 60 / 30, src: "split_flap.wav",   v: LEVELS.SFX_HERO,    dur: 0.46, rate: 0.86 },
    { at: 61 / 30, src: "ox_bellow.wav",    v: LEVELS.SFX_HERO * db(-4), dur: 0.85, rate: 0.78 },
    { at: 61 / 30, src: "impact_deep.wav",  v: LEVELS.SFX_TEXTURE * db(3), dur: 0.60, lead: 2 },
  ],
};

const SFX: Cue[] = [
  /* ---- S0 · the hook's cues live in HOOK_SFX, per cut (see below) ------- */
  /* ⛔ THE THIRD BELLOW IS OUT (Alex: *"remove the ox sound at 3 seconds"*).
     `ox_bellow` is synthesised for this reel by `tools/gen_ox_bellow.py` — the
     183-file house bank has no animal in it at all — and it now fires TWICE, in
     the hook, both times answering something: the herd coming through the gate
     at 0.90s and the branding iron at 2.03s. A third at 3.53s was tied to no
     action; it just made the animal noisy. One at 27.9s closes the reel. */
  { at: S(L.S1 + 40), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.86 },
  /* ⭐ the NAME branded onto the wall. ⛔ NO SIZZLE LAYER (Alex: *"i dont like
     the sizzle sound at 4 seconds ish"*). Pairing `paper_burn` under the stamp
     matched the hook's iron, but the hook's version is under a HOT PRESS you
     watch make contact; here the burn is already on the wall by the time the
     hiss arrives, so it read as noise rather than as the event. The hit alone. */
  { at: S(L.S1 + 44), src: "stamp_press.wav",  v: LEVELS.SFX_HERO * db(2), dur: 0.34, rate: 0.92 },

  /* ---- S2 · THE PULL FLOOR (5). One start, one drag texture under all three
     lanes (⛔ NOT one cue per lane — three identical drags is a metronome),
     then the bars and the end-stop clank the winning lane overruns. */
  { at: S(L.S2 + 2),  src: "neon_on.wav",      v: LEVELS.SFX_MID,     dur: 0.56, rate: 0.92 },
  { at: S(L.S2 + 13), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.94 },
  { at: S(L.S2 + 30), src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 1.06 },
  { at: S(L.S2 + 43), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.08 },
  { at: S(L.S2 + 60), src: "metal_ping.wav",   v: LEVELS.SFX_HERO,    dur: 0.30, rate: 1.10 },
  { at: S(L.S2 + 92), src: "stamp_press.wav",  v: LEVELS.SFX_MID,     dur: 0.34, rate: 0.96 },
  { at: S(L.S2 + 98), src: "temper_chime.wav", v: LEVELS.SFX_HERO,    dur: 0.78, rate: 1.04 },

  /* ---- S3 · THE TURN (3). A latch, a haul, and a low swell rising through the
     beat with NO impact — the payoff is S4's, and spending it here would be
     spending the promise early. */
  { at: S(L.S3 + 16), src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.62, rate: 0.84 },
  { at: S(L.S3 + 26), src: "sub.wav",          v: LEVELS.SFX_MID,     dur: 0.90, rate: 0.80 },

  /* ---- S4 · THE HOPPER (6) — ⭐ a density peak. A chute, then a coin BED that
     thickens, two pitched pings inside it, and the buried thud. ⛔ NOT one cue
     per coin: thirty coins is a texture, not thirty events. */
  { at: S(L.S4 + 6),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 2.4, rate: 1.08 },
  { at: S(L.S4 + 10), src: "projector_dry.wav",v: LEVELS.SFX_BED,     dur: 1.70, rate: 1.10 },
  { at: S(L.S4 + 58), src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.76, rate: 0.84 },

  /* ---- S5 · THE DECK (4). One motor under the run, two rule ticks pitched up,
     and the far stamp — the arrival that makes the run mean something. */
  { at: S(L.S5 + 6),  src: "engine_idle.wav",  v: LEVELS.SFX_BED,     dur: 2.2, rate: 1.06 },
  { at: S(L.S5 + 70), src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,    dur: 0.50, rate: 0.98 },

  /* ---- S6 · THE YARD (6) — ⭐ a density peak, and the reel's brightest beat.
     The doors, the belt, and FIVE landings sounded as THREE pitched thocks
     climbing — five identical thuds is the metronome the ceiling exists for. */
  { at: S(L.S6 + 0),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 0.66, rate: 0.94 },
  { at: S(L.S6 + 2),  src: "shop_bed.wav",     v: LEVELS.SFX_BED,     dur: 2.7, rate: 1.02 },
  { at: S(L.S6 + 40), src: "pickup_chime.wav", v: LEVELS.SFX_HERO,    dur: 0.42, rate: 1.16 },

  /* ---- S7 · THE GATES (5). Four flaps ON the four spoken nouns, then ONE
     accelerating texture instead of a cue per object. */
  { at: S(L.S7 + 8),  src: "ticket_click.wav", v: LEVELS.SFX_MID,     dur: 0.26, rate: 0.92 },
  { at: S(L.S7 + 26), src: "ticket_click.wav", v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.02 },
  { at: S(L.S7 + 34), src: "ticket_click.wav", v: LEVELS.SFX_MID,     dur: 0.26, rate: 1.10 },
  { at: S(L.S7 + 44), src: "ticket_click.wav", v: LEVELS.SFX_HERO,    dur: 0.26, rate: 1.20 },

  /* ---- S8 · THE ROW (5). ⭐ THREE SEATS PITCHED UP A STEP EACH — an ascending
     run is what makes a REPEATED reward read as PROGRESS rather than
     repetition — and the 3-of-3 chime is the thing they resolve INTO. */
  { at: S(L.S8 + 6),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 0.90 },
  { at: S(L.S8 + 22), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 1.02 },
  { at: S(L.S8 + 38), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.38, rate: 1.14 },
  { at: S(L.S8 + 44), src: "temper_chime.wav", v: LEVELS.SFX_HERO,    dur: 0.82 },

  /* ---- S9 · THE CLOCK (7) — ⭐ a density peak, and the ONLY descending run in
     the reel. The segments drop a step each as the week empties, the ribbon
     BURNS, and the tick bed speeds up under all of it. */
  { at: S(L.S9 + 6),  src: "neon_on.wav",      v: LEVELS.SFX_MID,     dur: 0.56, rate: 0.86 },
  { at: S(L.S9 + 8),  src: "tick.wav",         v: LEVELS.SFX_TEXTURE, dur: 2.20, rate: 0.96 },
  { at: S(L.S9 + 34), src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.90, rate: 0.94 },
  { at: S(L.S9 + 44), src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.28, rate: 1.02 },

  /* ---- S10 · THE CTA (3). The stencil lands ON the spoken word "OX"
     (root f878 = scene-local f18), and the reel hard-cuts three frames later. */
  { at: S(L.S10 + 2),  src: "ratchet.wav",     v: LEVELS.SFX_TEXTURE, dur: 0.36, rate: 1.10 },
  { at: S(L.S10 + 6),  src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,    dur: 0.54, rate: 0.92 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad
   ([[feedback_house_bed_is_a_real_track]]). Counted before choosing, across
   every shipped reel: `ados` 13 uses, `ebm` 8. This is ADOS.

   Three DIFFERENT PASSAGES, because the same track at a different volume is an
   audio-only variant, which [[feedback_variant_dhash_measured]] calls a pixel
   duplicate. Every window was MEASURED (a 100ms RMS scan over the whole 228.6s
   track, scored on mean level against the worst-1.5s drop inside the window),
   and reel 118's passages at 135s and 185s were excluded so 119 has its own:

     unsigned  ADOS @  52.5s   mean -16.1 dB   onset 10ms   worst-1.5s drop 2.3 dB
     amber     ADOS @  96.0s   mean -14.7 dB   onset  5ms   worst-1.5s drop 2.0 dB
     steel     ADOS @  24.0s   mean -15.4 dB   onset 10ms   worst-1.5s drop 2.4 dB

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
   after the chain: 10ms / 5ms / 10ms. */
const BED: Record<Variant, string> = {
  unsigned: "119_ox_bed.wav",
  amber:    "119_ox_bed_amber.wav",
  steel:    "119_ox_bed_steel.wav",
};

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13), so this
   is re-solved on THESE files, today, AFTER the high shelf rather than
   inherited through it:
       VO        -17.49 LUFS x LEVELS.DIALOGUE (-6)  ->  -23.49 in the mix
       unsigned  -23.65 LUFS x LEVELS.MUSIC (-20)    ->  -43.65   gap 20.16 dB
       amber     -23.57 LUFS                         ->  -43.57   gap 20.08 dB
       steel     -22.59 LUFS                         ->  -42.59   gap 19.10 dB
   The house figure is ~12 dB under the VO, which asks for +8.2 / +8.1 / +7.1.
   ⛔ AND THE RESULT IS CHECKED AGAINST THE STANDING CAP. `reel-vo-pacing` caps
   a normal-mastered bed at **volume 0.25** (Alex: *"the background music is too
   loud compared to the voiceover"*). +8.2 solves to 0.2570, which is OVER it —
   so the two ADOS cuts are pulled back to +7.9 (0.2483) and the gap runs 12.3
   dB instead of 12.0. The cap wins; a third of a dB does not. */
export const BED_GAIN: Record<Variant, number> = {
  unsigned: db(7.90),   /* -> volume 0.2483 */
  amber:    db(7.90),   /* -> volume 0.2483 */
  steel:    db(6.90),   /* -> volume 0.2213 */
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { unsigned: 1418, amber: 1470, steel: 1376 };

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("119_ox_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={[...HOOK_SFX[v], ...SFX]} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}>{v === "amber" ? <HookCrush dur={DUR.S0} /> : v === "steel" ? <HookBoard dur={DUR.S0} /> : <HookGate dur={DUR.S0} />}</Sequence>
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
   headers don't change."* Both are true and they are not the same instruction.
   ⭐ Each band names the MECHANISM in product nouns, never the theme. Nothing
   here says "the bay", "the pull floor" or "the hopper".
   ⛔⛔ AND THIS IS WHERE THE WORDS LIVE. The picture carries MARKS and NUMERALS
   only; the header band and the captions carry the language.
   ⭐ THE LENGTH BUDGET, measured off what has shipped: `big` <= 22 chars,
   `hot` <= 24, every band, no exceptions (reel 118: *"the header of the hook
   scene is way too long"*).
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "USE CLAUDE CODE FREE", hot: "UNLIMITED, THIS WEEK" },
  { from: L.S1,  big: "THE MODEL: OX ALPHA",   hot: "NOBODY WILL CLAIM IT" },
  { from: L.S2,  big: "IT BEATS CLAUDE & GPT", hot: "ON THE ONE REAL TEST" },
  { from: L.S3,  big: "AND IT GETS BETTER",    hot: "LOOK UNDER THE FLOOR" },
  { from: L.S4,  big: "100 TRILLION TOKENS",   hot: "FREE, EVERY DAY" },
  { from: L.S5,  big: "1,048,576 CONTEXT",     hot: "THE WHOLE CODEBASE" },
  { from: L.S6,  big: "BUILD ANYTHING",        hot: "AND PAY NOTHING" },
  { from: L.S7,  big: "APPS, SITES, GAMES",    hot: "THE LIST DOESN'T END" },
  { from: L.S8,  big: "ANY CODING SOFTWARE",   hot: "CLAUDE CODE INCLUDED" },
  { from: L.S9,  big: "IT ENDS AUG 27",        hot: "THEN IT STOPS BEING FREE" },
  { from: L.S10, big: "COMMENT “OX”",          hot: "AND I'LL SEND THE SETUP" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* fed f+12 on the hook so the header is SETTLED on frame 0 — frame 0 is the
     only frame guaranteed to be seen and it may not contain an animation. */
  return <HookHeader big={b.big} hot={b.hot} f={f < 20 ? f + 12 : f - b.from + 12} />;
};

export const ReelUnsigned = makeReel("unsigned");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
export const ReelQuiet = makeReel("unsigned", true);
