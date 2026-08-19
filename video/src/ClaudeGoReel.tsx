import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, CAM, GRADE } from "./GoScenes";
import type { Variant } from "./GoScenes";
import { CamCtx, R } from "./GoWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_113go.json";

/* ===========================================================================
   REEL 113 · "GO" — THE JOB SHOP.  Board: storyboards/113-go.md.

   Subject: nidhinjs/prompt-master — a free MIT Claude SKILL that turns a messy
   brain dump into a precise work order carrying an output spec, a file scope
   and a stop condition. 11,415 stars, verified live 2026-08-19.

   VO: public/vo_113go.wav — 51.93s, 211 words, cut from a 65.43s raw take.
   NO `cut cut` flubs (a clean single take). Head trimmed 3.10s, tail 2.87s,
   seven mid-gaps capped to 0.22s, two-pass polish to -18.0 LUFS integrated.
   The cut file was re-transcribed and starts at 0.00s.

   ⛔⛔ WHISPER LIED ABOUT THE HEAD BY 0.35s AND EVERY DOWNSTREAM GATE WOULD
      HAVE AGREED. It put the first word at 2.76s; the 10 ms RMS scan shows
      room tone at -59 dB all the way to 3.10s and the real onset at **3.11s**.
      This is playbook C2's trap verbatim, and it is why the lead trim is
      RMS-verified rather than taken from the transcript.

   ⛔⛔ THE VO SHIPS AT x1.00 AND R1 IS FLAGGED, NOT PASSED.
        x1.00  dur 51.93  hook 3.90  worst-5s 5.20   FAIL
        x1.05  dur 49.46  hook 4.09  worst-5s 5.46   FAIL
        x1.10  dur 47.21  hook 4.29  worst-5s 5.72   FAIL
        x1.15  dur 45.16  hook 4.48  worst-5s 5.98   FAIL
      The peak is 5.20 at EVERY tempo including 1.00x, and it is IDENTICAL on
      the untrimmed take — so gap-trimming did not cause it and restoring the
      gaps does not fix it. The delivery is simply dense: 4.10 wps against a
      3.96 house anchor. Playbook C3's remedy is "reduce the speedup", which is
      exhausted at x1.00. Shipping x1.00 per the reel 111/112 precedent
      (*"R1 CAN FORBID THE SPEEDUP ENTIRELY"*), flagged rather than fixed by
      padding the VO with dead air that would not fix it either.

   ⭐ 51.93s is outside the 22-29s house range and inside what actually ships
      (107 = 35.06 · 109 = 31.65 · 110 = 31.36 · 111 = 33.49 · 112 = 81.63).
      FLAGGED, not silently trimmed: no edit reaches 30s without dropping
      spoken content, which is not a silent call to make.

   ⛔⛔ THE HONESTY LEDGER LIVES IN GoWorld.tsx (`R`, `MONEY_BANNED`,
      `RATE_BANNED`, `COUNT_BANNED`). The ones that matter:
      · NO MONEY, NO PERCENTAGE, NO TOKEN COUNT anywhere in the picture. The
        repo publishes no benchmark and the VO names no figure; the receipt
        drawn is the PART COUNT PER ORDER (4 -> 1), which is what "way fewer
        retries" literally means.
      · The VO understates two numbers and the picture draws them EXACT:
        "over 11,000" -> 11,415 · "30 plus" -> 35. An understated VO number is
        safe to draw exactly; a DIFFERENT one is not.
      · The hook's "people who never hit their Claude limit" is a persuasive
        FRAME, not a repo claim. Nothing in the picture asserts it — there is
        no usage gauge in this reel — and the dread is drawn as the SCRAP,
        which is the mechanism the repo actually addresses.

   ⛔⛔ THE HEADER IS ON FOR ALL 1558 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f + 12` on the hook so it is SETTLED on frame 0, and it CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene
      bodies are not Sequence-wrapped for audio purposes
      ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1558 frames = 51.93s, exactly the VO file's length. Its last word ends at
    51.64s, so the reel carries the tail and hard-cuts after it. */
export const GO_TOTAL = 1558;

/* ⛔ MEASURED WORD ONSETS from src/data/words_113go.json, converted to frames.
   Nothing here is estimated — every value is `round(onset * 30)` of the VO's
   own sentence starts, read by pattern-matching the beat opener (never a
   hardcoded index — those drift the moment the VO changes). */
export const L = {
  S0: 0,      /* MOUND      0.00s  "The people who never hit their Claude..." */
  S1: 93,     /* PRESS      3.09s  "They just installed this one free skill"  */
  S2: 210,    /* PLATE      7.00s  "It even has over 11,000 stars on GitHub"  */
  S3: 396,    /* TURN      13.19s  "Here's the problem. You type a rough..."  */
  S4: 580,    /* DUMP      19.32s  "Now you just brain dump what you want"    */
  S5: 714,    /* CALLOUTS  23.79s  "What the output should look like..."      */
  S6: 813,    /* MINUTE    27.11s  "And now the setup takes just one minute"  */
  S7: 863,    /* MOVES     28.78s  "All you have to do is just download..."   */
  S8: 1029,   /* INSPECT   34.30s  "It checks against 30 plus unknown ways"   */
  S9: 1132,   /* RAIL      37.74s  "and it remembers your old thought..."     */
  S10: 1249,  /* PAYOFF    41.64s  "So now you get the same work for way..."  */
  S11: 1326,  /* FOREIGN   44.21s  "and this even works on your ChatGPT..."   */
  S12: 1387,  /* STAKES    46.22s  "If you're paying for Claude and still..." */
  S13: 1492,  /* CTA       49.74s  "Just comment GO and I'll send you..."     */
  END: GO_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.END - L.S13,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ `tools/sfx_audit.py` WAS RUN BEFORE THIS BANK WAS WRITTEN, NOT AFTER.
   71 world-appropriate candidates were measured and **14 FAILED**, including
   several that sound exactly right by name:
       dead_thud    91.3% >2kHz   — a "thud" that is all treble
       sorter_tick  AIR, 1929ms attack
       harden_chime AIR · ident_chirp AIR · resolve AIR · slot_lever AIR
       metal_riser  AIR · water_fan AIR · graph_hum AIR · can_rattle AIR
       glitch_counter HISS · paper_burn HISS+AIR · neon_buzz AIR
       survive_chord AIR · ballast_buzz AIR
   None of them is in this bank. Reel 109 built a 44-cue bank that sounded
   right by name and had 14 cues fail on measurement — the same 14-in-71 rate.

   ⚠️ AND A FINDING TO CARRY FORWARD: `sfx_audit.py` reads every file as
   16-bit PCM, but the whole `public/sfx/am/` pack is **24-bit stereo**. Its
   measurements on those files are therefore GARBAGE — every am/ file reports
   ~91% above 2kHz, which is the byte stream being misread, and one of them
   crashes the tool outright. This bank uses ZERO am/ cues for that reason.

   ⛔⛔ AND A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate
   with 24 of 41 cues out of one chiptune pack, because the tool measures
   spectra and has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a metal job shop —
   room tone, machine hum, ejector clacks, pneumatic thunks, a press die, a
   crusher, latch bolts, a brass bell, drawer rolls and a shutter slam.
   **ZERO chiptune cues.** The greppable gate is a grep for `c_` over this
   file, which must return 0.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz, so every bright
   one (`sign_clack` 49.9%, `ticket_click` 92.1%, `metal_ping` 89.5%,
   `wrench_clank` 93.3%, `snap` 92.7%) is capped at FOUR uses and the low ones
   (`rebuild_thud` 2.7%, `thock` 1.3%, `mech_clank` 30.4%, `pneu_thunk` 4.6%)
   carry the repetition.
   ⛔ Every `dur` is >= the file's measured true length so no tail is chopped
   mid-decay, EXCEPT where a long one-shot is deliberately truncated under the
   over-ring gate — a slam does not sustain for five seconds.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count per
   scene PEAKS on S0 (the hook), S4 (the press) and S10 (the payoff), and thins
   to two or three cues on the information scenes. A reel where every scene has
   the same amount going on reads as busy AND unranked.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE MOUND (8) — frame 0 carries the heaviest stack in the reel,
     because frame 0 IS the interrupt (THE-OPEN: "frame 0 gets the heaviest cue
     stack of the open"). Three simultaneous cues there, one to two elsewhere. */
  { at: S(L.S0 + 0),   src: "shop_bed.wav",     v: LEVELS.SFX_BED,     dur: 5.0 },
  { at: S(L.S0 + 0),   src: "lamp_clunk.wav",   v: LEVELS.SFX_MID,     dur: 0.30 },
  { at: S(L.S0 + 0),   src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.45 },
  { at: S(L.S0 + 8),   src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.15 },
  { at: S(L.S0 + 20),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.96 },
  { at: S(L.S0 + 46),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.90 },
  { at: S(L.S0 + 72),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.84 },
  { at: S(L.S0 + 74),  src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.65 },

  /* ---- S1 · THE PRESS LANDS (4) */
  { at: S(L.S1 + 0),   src: "slate_whump.wav",  v: LEVELS.SFX_MID,     dur: 0.20 },
  { at: S(L.S1 + 14),  src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.12 },
  { at: S(L.S1 + 30),  src: "pneu_thunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.50 },
  { at: S(L.S1 + 30),  src: "boom.wav",         v: LEVELS.SFX_MID,     dur: 0.58, rate: 0.92 },

  /* ---- S2 · THE SPEC PLATE (5). Eleven stars are NOT eleven cues — they are
     two pitched impacts on the counter's pops, so the run reads as a texture
     rather than a metronome of slaps. */
  { at: S(L.S2 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 6.2 },
  { at: S(L.S2 + 10),  src: "knife_switch.wav", v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(L.S2 + 34),  src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.34, rate: 1.04 },
  { at: S(L.S2 + 74),  src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.74 },
  { at: S(L.S2 + 104), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,    dur: 0.38 },
  { at: S(L.S2 + 104), src: "impact.wav",       v: LEVELS.SFX_MID,     dur: 0.66, rate: 0.88 },

  /* ---- S3 · THE TURN (8). The three bells are the villain's theme and they
     RISE in pitch, because it is getting worse. */
  { at: S(L.S3 + 0),   src: "shop_bed.wav",     v: LEVELS.SFX_BED,     dur: 6.1, rate: 0.9 },
  { at: S(L.S3 + 20),  src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.12 },
  { at: S(L.S3 + 33),  src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.92 },
  { at: S(L.S3 + 58),  src: "slate_whump.wav",  v: LEVELS.SFX_MID,     dur: 0.20 },
  { at: S(L.S3 + 60),  src: "rev_up.wav",       v: LEVELS.SFX_MID,     dur: 1.05, rate: 0.9 },
  { at: S(L.S3 + 100), src: "slate_whump.wav",  v: LEVELS.SFX_MID,     dur: 0.20, rate: 0.94 },
  { at: S(L.S3 + 112), src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.20, rate: 0.96 },
  { at: S(L.S3 + 126), src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.20, rate: 1.06 },
  { at: S(L.S3 + 140), src: "bell_ring.wav",    v: LEVELS.SFX_HERO,    dur: 1.65, rate: 1.16 },

  /* ---- S4 · THE BRAIN DUMP (7). The heaviest single hit in the reel is the
     platen at +78; the eighteen-scrap cascade under it is TWO textured cues,
     never eighteen. */
  { at: S(L.S4 + 0),   src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 4.5 },
  { at: S(L.S4 + 24),  src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.38 },
  { at: S(L.S4 + 28),  src: "crusher.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.94, rate: 1.14 },
  { at: S(L.S4 + 44),  src: "crusher.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.94, rate: 1.02 },
  { at: S(L.S4 + 78),  src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.78 },
  { at: S(L.S4 + 78),  src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.45, rate: 0.9 },
  { at: S(L.S4 + 88),  src: "pneu_thunk.wav",   v: LEVELS.SFX_MID,     dur: 0.50, rate: 1.1 },
  { at: S(L.S4 + 90),  src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.74, rate: 1.08 },

  /* ---- S5 · THE THREE CALLOUTS (6) */
  { at: S(L.S5 + 42),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.54 },
  { at: S(L.S5 + 50),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.26 },
  { at: S(L.S5 + 55),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.26, rate: 1.08 },
  { at: S(L.S5 + 60),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.26, rate: 1.16 },
  { at: S(L.S5 + 87),  src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.64 },
  { at: S(L.S5 + 87),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.20 },

  /* ---- S6 · THE MINUTE (3). A 1.67s breath, not a set piece. */
  { at: S(L.S6 + 4),   src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.8 },
  { at: S(L.S6 + 22),  src: "impact.wav",       v: LEVELS.SFX_HERO,    dur: 0.66 },
  { at: S(L.S6 + 24),  src: "tick.wav",         v: LEVELS.SFX_TEXTURE, dur: 0.10 },

  /* ---- S7 · THE THREE MOVES (7) */
  { at: S(L.S7 + 10),  src: "projector.wav",    v: LEVELS.SFX_BED,     dur: 1.6 },
  { at: S(L.S7 + 50),  src: "impact.wav",       v: LEVELS.SFX_HERO,    dur: 0.66, rate: 0.92 },
  { at: S(L.S7 + 58),  src: "wrench_clank.wav", v: LEVELS.SFX_MID,     dur: 0.10 },
  { at: S(L.S7 + 106), src: "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.10 },
  { at: S(L.S7 + 120), src: "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.1 },
  { at: S(L.S7 + 134), src: "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.10, rate: 1.2 },
  { at: S(L.S7 + 138), src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.38 },

  /* ---- S8 · THE INSPECTION (5). 35 flags are TWO volley textures, never 35
     cues — a repeated bright transient is a metronome of slaps. */
  { at: S(L.S8 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 3.5, rate: 0.88 },
  { at: S(L.S8 + 6),   src: "knife_switch.wav", v: LEVELS.SFX_MID,     dur: 0.14, rate: 0.94 },
  { at: S(L.S8 + 10),  src: "crack_hunt.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.54 },
  { at: S(L.S8 + 58),  src: "crack_hunt.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.54, rate: 1.18 },
  { at: S(L.S8 + 88),  src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.64, rate: 0.94 },

  /* ---- S9 · THE CARD RAIL (4) */
  { at: S(L.S9 + 8),   src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.12, rate: 0.92 },
  { at: S(L.S9 + 8),   src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 3.6 },
  { at: S(L.S9 + 54),  src: "slot_stop.wav",    v: LEVELS.SFX_MID,     dur: 0.26, rate: 0.9 },
  { at: S(L.S9 + 62),  src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.20, rate: 0.86 },

  /* ---- S10 · THE PAYOFF (7). ⭐ THE BELL THAT DOES NOT RING: a soft wooden
     knock where a brass bell used to be, and the absence IS the beat. Then the
     shutter — the heaviest low hit in the reel. */
  { at: S(L.S10 + 0),  src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 2.7, rate: 1.05 },
  { at: S(L.S10 + 6),  src: "pneu_thunk.wav",   v: LEVELS.SFX_MID,     dur: 0.50, rate: 1.05 },
  { at: S(L.S10 + 24), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.20 },
  { at: S(L.S10 + 40), src: "impact.wav",       v: LEVELS.SFX_HERO,    dur: 0.66, rate: 1.02 },
  { at: S(L.S10 + 48), src: "boom.wav",         v: LEVELS.SFX_HERO,    dur: 0.58, rate: 0.82 },
  { at: S(L.S10 + 48), src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.45, rate: 0.84 },
  { at: S(L.S10 + 62), src: "arrive_chime.wav", v: LEVELS.SFX_MID,     dur: 1.14 },

  /* ---- S11 · THE FOREIGN MACHINE (2) — it SOUNDS foreign, which is the point */
  { at: S(L.S11 + 14), src: "rev_up.wav",       v: LEVELS.SFX_MID,     dur: 1.05, rate: 1.22 },
  { at: S(L.S11 + 40), src: "impact.wav",       v: LEVELS.SFX_MID,     dur: 0.66, rate: 1.12 },

  /* ---- S12 · DOUBLE THE WORK (4). The left lane's four passes reuse ONE
     sample at ONE pitch, deliberately: the repetition IS the argument. */
  { at: S(L.S12 + 20), src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.15, rate: 0.9 },
  { at: S(L.S12 + 40), src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.15, rate: 0.9 },
  { at: S(L.S12 + 60), src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.15, rate: 0.9 },
  { at: S(L.S12 + 80), src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.15, rate: 0.9 },
  { at: S(L.S12 + 92), src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 0.85, rate: 1.04 },

  /* ---- S13 · THE HAND-OFF (3). ⛔ No confetti and no fanfare: the arrival IS
     the hand-off across the counter. */
  { at: S(L.S13 + 11), src: "spotlight_snap.wav", v: LEVELS.SFX_MID,   dur: 0.44 },
  { at: S(L.S13 + 28), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.20, rate: 0.88 },
  { at: S(L.S13 + 28), src: "boom.wav",         v: LEVELS.SFX_MID,     dur: 0.58, rate: 1.08 },
];

/* ⛔ ONE BED ACROSS THREE CUTS IS NOT A VARIANT. The VO is the same recording
   in all three, so the bed is one of the few genuinely different audio layers
   a duplicate check can see. Three non-overlapping 51.93s windows of the same
   source, so no two cuts share a bar. */
const BED: Record<Variant, string> = {
  shop:  "113go_bed.wav",
  amber: "113go_bed_amber.wav",
  steel: "113go_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { shop: 1254, amber: 1326, steel: 1188 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13). Reel
   110 shipped 7 dB hot because reel 108's `+8 dB` bed trim — a correction for
   an INAUDIBLE bed on a different source — was carried forward unmeasured.
   So this one is measured on THESE two files, today:
       VO  file -18.0 LUFS  x LEVELS.DIALOGUE (-6)  ->  -24.0 in the mix
       bed file -17.7 LUFS  x LEVELS.MUSIC  (-20)   ->  -37.7 in the mix
       gap 13.7 dB, against a house figure of ~12 dB under the VO
   +1.5 dB lands the gap at 12.2 dB. Nothing was inherited. */
export const BED_TRIM = { loud: db(1.5), quiet: db(-4.5) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "loud"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_113go.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_TRIM[bed]} />
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
   headers don't change."* Both are true and they are not the same instruction
   — it is on for every frame AND it re-states the current claim, so the reel
   is legible to someone watching muted.
   ⭐ Each band names the MECHANISM in product nouns, never the theme.
   ⛔⛔ AND THIS IS WHERE THE WORDS LIVE. The picture carries MARKS and
   NUMERALS only (reel 109 was rejected on 33 `<span>`s in its animation
   layer); the header band and the captions carry the language.
   ⛔ NOTHING HERE MAY STATE A COST, A RATE OR A TOKEN COUNT — the repo
   publishes none (MONEY_BANNED / RATE_BANNED).
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "YOU ARE NOT WORSE AT CLAUDE",  hot: "YOU ARE FEEDING IT A SCRIBBLE" },
  { from: L.S1,  big: "ONE FREE CLAUDE SKILL",        hot: "IT STOPS THE WRONG BUILD FIRST" },
  { from: L.S2,  big: "PROMPT MASTER",                hot: "★ 11,415 · MIT · OPEN SOURCE" },
  { from: L.S3,  big: "IT BUILDS WHAT YOU TYPED",     hot: "NOT WHAT YOU MEANT" },
  { from: L.S4,  big: "BRAIN DUMP THE MESS",          hot: "IT RETURNS ONE CLEAN SPEC" },
  { from: L.S5,  big: "OUTPUT · FILE SCOPE · STOP",   hot: "THE THREE YOU NEVER WRITE" },
  { from: L.S6,  big: "SETUP TAKES ONE MINUTE",       hot: "NO TERMINAL REQUIRED" },
  { from: L.S7,  big: "DOWNLOAD · CUSTOMIZE · SKILLS", hot: "claude.ai → CUSTOMIZE → SKILLS" },
  { from: L.S8,  big: "35 CREDIT-KILLING PATTERNS",   hot: "CHECKED ON EVERY PROMPT" },
  { from: L.S9,  big: "IT CARRIES YOUR DECISIONS",    hot: "AND REFUSES TO CONTRADICT THEM" },
  { from: L.S10, big: "SAME WORK · FEWER RETRIES",    hot: "FOUR PASSES BECOMES ONE" },
  { from: L.S11, big: "WORKS ON ANY AI TOOL",         hot: "CHATGPT · GEMINI · CURSOR" },
  { from: L.S12, big: "RE-PROMPTING IS THE BILL",     hot: "YOU ARE ALREADY PAYING IT" },
  { from: L.S13, big: "COMMENT GO",                   hot: "AND I'LL SEND THE FREE SETUP" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelShop = makeReel("shop");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** the same picture with the music bed 6 dB down — for an A/B on the bed only */
export const ReelQuiet = makeReel("shop", "quiet");
