import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15,
  CAM, GRADE,
} from "./KnowScenes";
import type { Variant } from "./KnowScenes";
import { CamCtx, R, SectionCard, SODIUM, TEAL, VIOLET } from "./KnowWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_117know.json";

/* ===========================================================================
   REEL 117 · "KNOW" — THE HOUR WORKS.  Board: storyboards/117-know.md.

   Subject: FIFTEEN Claude tips, beginner to expert. SIX are spoken and drawn;
   the guide holds the other nine. Every product claim opened and read live
   2026-08-21; the ledger is `R` in KnowWorld.tsx.

   THE HOUR WORKS: a three-deck foundry-school where experience is a physical
   material — hour-ingots, one hour each. The spine is the brass HOUR RAIL,
   15 slots, climbing through every deck, and it deliberately stops at SIX so
   the CTA is the rest of the number rather than a restatement of the promise.
   The villain is THE GRIND, the whetstone treadmill that charges you 10,000
   hours one at a time: undefeated at S2, S8 and S12's before-state, and beaten
   exactly once, at the peak.

   VO: public/vo_117know.wav — 40.39s, 167 words, cut from a 62.46s raw take.

   ⛔⛔⛔ THE RAW TAKE HAD **THREE** DEAD-TAKE CLUSTERS AND **THREE** `cut cut`
      MARKERS, and a whole-file faster-whisper pass FOUND ONLY TWO OF THEM.
      Reel 113 shipped a flub for exactly this reason and reel 116 wrote the
      routine that catches it. What found them here was transcribing each
      speech ISLAND separately, cut at RMS-measured silences:

        14.30-18.10  "Also, don't use projects ... when in-"   <- dead take 1
        19.20-19.44  "cut cut"                                 <- marker
        35.62-37.70  "For expert tips, use the desktop apps."  <- dead take 2
        38.56-40.58  "For expert tips, use the desktop apps."  <- dead take 3
        54.10-55.34  "I made a full list of 15."               <- dead take 4
        55.82-56.08  "cut cut"   <- MISSED ENTIRELY by the whole-file pass,
                                    which read straight from 53.14 to 53.76
        56.70-60.64  the clean retry                           <- KEPT

      ⭐ THE ROUTINE: a 20ms RMS envelope segments the file into islands at
      -38 dB; each island is transcribed ALONE. The model smooths a stutter and
      its retry into the sentence it expects when it can see the whole file, and
      cannot when the window is one phrase long.
      ⛔ A WHOLE-FILE PASS IS NOT A FLUB CHECK. Without the island pass this
         reel would have shipped "I made a full list of 15." twice.

   ⭐ AND ONE WORD WAS DECIDED BY MEASUREMENT, NOT BY EAR. small.en heard
      "waste money ON usage limits"; medium.en at two beam sizes heard "waste
      money AND usage limits", which is also the reading that makes sense. The
      canon in public/know_script.txt is the medium.en reading.

   ⛔⛔ 40.39s IS OUTSIDE THE 22-29s HOUSE RANGE AND IS FLAGGED, NOT TRIMMED.
      No edit reaches 30s without dropping one of the six tips, which is not a
      silent call to make. In family with what actually ships:
      107 = 35.06 · 110 = 31.36 · 111 = 33.49 · 113 = 51.93 · 115 = 51.41 ·
      116 = 56.53 · 112 = 81.63.

   ⛔⛔ THE HONESTY LEDGER LIVES IN KnowWorld.tsx (`R`, `MONEY_BANNED`,
      `RATE_BANNED`, `COUNT_BANNED`). The four that matter:
      1. NO PRICE, ANYWHERE. The VO names no dollar figure in this reel, so the
         picture carries none. "Money" is drawn as hour-ingots being consumed.
      2. NO SCORE PLATE ON THE HAIKU BEAT (S5). No `%`, no accuracy gauge, no
         `WRONG` stamp. The frame draws the mechanism the joke points at — a
         tiny furnace at 3x line speed making parts that will not stack. The
         claim stays in the AUDIO, where reel 105 stopped for Magnific.
      3. NO `10x` PLATE AND NO MULTIPLIER GAUGE (S12). Identical ruling to reel
         116's `20x`. The scene draws OUTPUT VOLUME instead.
      4. THE PROJECTS RECEIPT IS A QUOTE, NOT A VERDICT. S8's booth carries
         `SEPARATE MEMORY SPACE` — Anthropic's own three words from the help
         centre. No red cross on the product; the shutter does the arguing.

   ⛔⛔ THE HEADER IS ON FOR ALL 1212 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f + 12` on the hook so it is SETTLED on frame 0, and it CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene
      bodies are not Sequence-wrapped for audio purposes.
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1171 frames = 39.02s. ⛔ RE-CUT: Alex, on the first delivery — *"there is a
    bit too long of a pause in between scenes here."* Measured on the shipped
    VO, the four gaps before a new beat ran **0.45 / 0.55 / 0.49 / 0.51s**, and
    half a second of nothing in a forty-second reel is a hole rather than a
    breath. Re-spliced from the raw take with the inter-island silences cut to
    0.05-0.15s and the safety pads tightened 0.10/0.12 -> 0.07/0.09: longest gap
    now **0.30s**, total silence 3.31 -> 2.03s, runtime 40.39 -> 39.02s.
    ⛔⛔ AND A RE-CUT IS NOT A DIVISION (reel 115). Every onset below was
    RE-DERIVED from the rebuilt caption JSON, not scaled — at 35s a 1.04x factor
    is over a second out. Captions were rebuilt first, then these read off them.
    Its last word `access` starts at 38.55s (f1157), so the reel carries 14
    frames of tail and hard-cuts after the CTA lands. */
export const KNOW_TOTAL = 1171;

/* ⛔ MEASURED WORD ONSETS from src/data/words_117know.json, converted to frames
   and pulled back by the house 4-frame picture lead. Nothing here is estimated
   — every value is `round(onset * 30) - 4` of the VO's own beat openers, found
   by pattern-matching the opening words (never a hardcoded index — those drift
   the moment the VO changes). */
export const L = {
  S0: 0,      /* POUR      0.00s  "Give me 30 seconds and I'll give you…"     */
  S1: 31,     /* INGOT     1.17s  "…10,000 hours of Claude knowledge."        */
  S2: 90,     /* GRIND     3.12s  "First, beginner tips."          BEGINNER   */
  S3: 124,    /* BURN      4.26s  "Don't waste money and usage limits on…"    */
  S4: 215,    /* LINE      7.29s  "Use Sonnet for daily use,"                 */
  S5: 247,    /* FAST      8.38s  "Haiku if you like wrong answers,"          */
  S6: 281,    /* DEEP      9.50s  "and Opus slash Fable for more complex…"    */
  S7: 353,    /* VAULT    11.90s  "Also, don't use Projects for most work"    */
  S8: 399,    /* SHUTTER  13.42s  "because the AI loses access to your main…" */
  S9: 485,    /* STREET   16.31s  "For intermediate tips, use the Claude…" INT*/
  S10: 570,   /* VERBS    19.12s  "It can navigate pages, read content,…"     */
  S11: 693,   /* LOFT     23.22s  "For expert tips, use the desktop app's…" EXP*/
  S12: 810,   /* LOOMS    27.13s  "and build automations to 10x your Claude…" */
  S13: 885,   /* SOCKETS  29.63s  "And you can install plugins and MCPs…"     */
  S14: 935,   /* RESKILL  31.29s  "to make it an expert in UI design,…"       */
  S15: 1041,  /* CTA      34.82s  "I made a full list of 15 tips from…"       */
  END: KNOW_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.END - L.S15,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ `tools/sfx_audit.py` WAS RUN BEFORE THIS BANK WAS WRITTEN, NOT AFTER.
   77 world-appropriate candidates were measured and **23 FAILED**, several of
   which sound exactly right by name — including three this reel most wanted:

       machine_bed  32.4% >2kHz, flat bins    NOISE-BED  (a foundry!)
       shop_bed     28.8% >2kHz, flat bins    NOISE-BED  (a workshop!)
       chain_clank  AIR                       (the hoist chain!)
       split_flap   AIR      sorter_tick  NOISE-BED+SWELL+AIR
       slot_lever   AIR      harden_chime AIR      resolve  AIR
       ident_chirp  AIR      survive_chord SWELL   rev_up   SWELL-866ms
       fire_bed     NOISE-BED+HISS+AIR        (the furnace!)
       graph_hum · ballast_buzz · water_fan · construction · crowd_ambience

   None of them is in this bank. The beds here are `stage_hum` (137ms attack,
   0.3% >2kHz, 70.3% low — a TONE, with tall bins), `engine_idle`, `deep_engine`
   and `road_bed_dry`, all four measured clean on the NOISE-BED gate that reel
   115 spent four review rounds discovering it needed.

   ⛔⛔ AND `metal_riser.wav` IS NOT HERE EITHER, DELIBERATELY. `claude-ai-reel-
   workflow` says to put the metallic riser after the hook on every reel, and
   the current gate measures it NOISE-BED + SWELL-1769ms + AIR. Reels 114, 115
   and 116 all shipped without it. The later, harder rule wins: the standing
   ban on anything that reads as a puff of air outranks a preference recorded
   before that ban existed. Logged here so the next agent does not "restore" it.

   ⛔⛔⛔ `pneu_thunk` AND `crusher` ARE BANNED FOREVER (Alex, on reel 116's
   delivered cut). Neither appears. The greppable gate is a grep for `c_` over
   this file for chiptune, which must return 0 — the bank belongs to the WORLD,
   and this world is a foundry, a vault, a street, a loft and a loom hall, so:
   room tone, furnace roar, cast-iron impacts, shutters, ratchets, spool rails,
   press dies, looms and a stone wheel. ZERO chiptune cues.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz. The bright ones
   (`stamp_press` 50.4%, `metal_ping` 89.5%, `wrench_clank` 93.3%, `key` 97.0%,
   `snap` 92.7%, `ratchet` 67.3%, `ui_tap` 65.7%, `sign_clack` 49.9%,
   `clap_slam` 62.0%, `gold_stamp` 68.8%, `ticket_click` 92.1%, `dead_thud`
   91.3%, `bamboo_crack` 74.5%) are each capped at FOUR uses; the low ones
   (`thock` 1.3%, `sub` 0.8%, `boom` 1.0%, `impact` 6.2%, `impact_deep` 0.4%,
   `slate_whump` 2.2%, `rebuild_thud` 2.7%, `mallet_tap` 14.5%, `chair_knock`
   10.8%, `mech_clank` 30.4%, `can_bong` 17.4%, `adv_strike` 0.4%) carry the
   repetition.
   ⛔ Every `dur` is <= the file's measured true length so no cue is truncated
   mid-decay by the renderer.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count per
   scene PEAKS on S0 (the hook, 5), S10 (the four verbs, 6) and S12 (the peak,
   6), and thins to two or three on the information scenes. A reel where every
   scene has the same amount going on reads as busy AND unranked.
   ⛔⛔ AND THE COUNT IS MEASURED, NOT ESTIMATED. The first version of this bank
   read as "about 76 cues" in its own comment; `grep -c "{ at: S("` said **84 =
   2.08/sec**, forty percent over the 1.5 ceiling, and `sfx_audit` separately
   failed `ratchet.wav` at 7 uses against the 4-use cap for anything over 35%
   >2kHz. Both were fixed by REMOVING cues, never by re-describing them — 26
   accents came out, the counter went from four ratchets to one, and the CTA's
   nine rail ratchets became one textured run. **58 cues over 40.40s =
   1.44/sec.** What was cut was accents; what was kept is the SHAPE.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE POUR (5) — the hook gets the heaviest stack in the reel
     because it is the interrupt. Lever, gate, and the pour running under it. */
  { at: S(L.S0 + 0),  src: "engine_idle.wav",  v: LEVELS.SFX_BED,     dur: 2.0 },
  { at: S(L.S0 + 0),  src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.42 },
  { at: S(L.S0 + 9),  src: "knife_switch.wav", v: LEVELS.SFX_HERO,    dur: 0.12 },
  { at: S(L.S0 + 12), src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.60, rate: 0.86 },
  { at: S(L.S0 + 15), src: "road_bed_dry.wav", v: LEVELS.SFX_BED,     dur: 2.4, rate: 1.10 },

  /* ---- S1 · THE INGOT (4). ⛔ THE COUNTER WAS FOUR RATCHETS AND THAT PUT THE
     SAMPLE ON SEVEN USES AT 67% BRIGHT — `sfx_audit`'s SLAP gate, which caps a
     bright cue at FOUR uses across the whole reel. Two ratchets read as the
     same mechanism; four read as a metronome. */
  { at: S(L.S1 + 10), src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.80 },
  { at: S(L.S1 + 10), src: "boom.wav",         v: LEVELS.SFX_MID,     dur: 0.55, rate: 0.90 },
  { at: S(L.S1 + 22), src: "temper_chime.wav", v: LEVELS.SFX_HERO,    dur: 0.70 },
  { at: S(L.S1 + 30), src: "ratchet.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.30, rate: 1.00 },

  /* ---- S2 · THE GRIND (2). The villain's theme is a low stone rumble that
     never resolves, and the reach that MISSES gets no landing — nothing lands. */
  { at: S(L.S2 + 0),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 1.10, rate: 0.82 },
  { at: S(L.S2 + 4),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.12, rate: 0.86 },

  /* ---- S3 · THE BURN (3). ⛔ EIGHTEEN INGOTS ARE NOT EIGHTEEN CUES. The roar,
     one textured swallow, and the bolt coming back out unchanged. */
  { at: S(L.S3 + 0),  src: "engine_idle.wav",  v: LEVELS.SFX_BED,     dur: 2.0, rate: 0.88 },
  { at: S(L.S3 + 22), src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.60, rate: 0.78 },
  { at: S(L.S3 + 74), src: "gear_shift.wav",   v: LEVELS.SFX_MID,     dur: 0.09 },

  /* ---- S4 · THE MODEL LINE (2). The door, and the hum it opens into. */
  { at: S(L.S4 + 0),  src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 1.10 },
  { at: S(L.S4 + 8),  src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.12, rate: 1.04 },

  /* ---- S5 · FAST, NOT RIGHT (3). ⭐ THE RATE IS THE JOKE — two quick ticks
     and the pile going over. Fourteen ejects would be a machine gun. */
  { at: S(L.S5 + 2),  src: "tick.wav",         v: LEVELS.SFX_TEXTURE, dur: 0.03, rate: 1.20 },
  { at: S(L.S5 + 8),  src: "tick.wav",         v: LEVELS.SFX_TEXTURE, dur: 0.03, rate: 1.34 },
  { at: S(L.S5 + 20), src: "ceramic_crack.wav",v: LEVELS.SFX_HERO,    dur: 0.70 },

  /* ---- S6 · THE DEEP WORK (3). The crane, and the last of the four unfold
     pops — the loudest, because it is the finish. */
  { at: S(L.S6 + 0),  src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 1.10, rate: 0.94 },
  { at: S(L.S6 + 18), src: "chair_knock.wav",  v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.82 },
  { at: S(L.S6 + 60), src: "temper_chime.wav", v: LEVELS.SFX_HERO,    dur: 0.70, rate: 1.08 },

  /* ---- S7 · THE VAULT (2). Spool rails as a BED; one hand-off lands. */
  { at: S(L.S7 + 0),  src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 1.60, rate: 1.06 },
  { at: S(L.S7 + 12), src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.34 },

  /* ---- S8 · THE SHUTTER (5). ⭐ The biggest object in the reel gets the
     biggest sound: a steel slam with a low body under it, three rail snaps
     FALLING in pitch, then the room going quiet on the far side. */
  { at: S(L.S8 + 46), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.16, rate: 0.82 },
  { at: S(L.S8 + 46), src: "impact_deep.wav",  v: LEVELS.SFX_HERO,    dur: 0.80, rate: 0.92 },
  { at: S(L.S8 + 52), src: "twang.wav",        v: LEVELS.SFX_MID,     dur: 0.50, rate: 1.06 },
  { at: S(L.S8 + 58), src: "twang.wav",        v: LEVELS.SFX_MID,     dur: 0.50, rate: 0.82 },
  { at: S(L.S8 + 62), src: "punch_thud.wav",   v: LEVELS.SFX_MID,     dur: 0.50, rate: 0.86 },

  /* ---- S9 · THE STREET (3). The harness down, and the rail he rides. */
  { at: S(L.S9 + 0),  src: "road_bed_dry.wav", v: LEVELS.SFX_BED,     dur: 3.0 },
  { at: S(L.S9 + 8),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.50 },
  { at: S(L.S9 + 22), src: "chair_knock.wav",  v: LEVELS.SFX_MID,     dur: 0.30 },

  /* ---- S10 · THE FOUR VERBS (6) — the second density peak. ⭐ ONE CUE PER
     VERB, each on its own MEASURED word onset, plus the submit. The seven form
     stamps are ONE textured tap, never seven slaps. */
  { at: S(L.S10 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.0, rate: 0.94 },
  { at: S(L.S10 + 6),  src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.09, rate: 1.10 },
  { at: S(L.S10 + 32), src: "scan_beep.wav",   v: LEVELS.SFX_MID,     dur: 0.40, rate: 1.06 },
  { at: S(L.S10 + 50), src: "ui_tap.wav",      v: LEVELS.SFX_HERO,    dur: 0.10 },
  { at: S(L.S10 + 71), src: "mallet_tap.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.20, rate: 1.12 },
  { at: S(L.S10 + 110), src: "stamp_press.wav",v: LEVELS.SFX_HERO,    dur: 0.34, rate: 0.94 },

  /* ---- S11 · THE CODE LOFT (3). The ticket in, and the button lighting.
     Nine cues for nine pops would be a xylophone. */
  { at: S(L.S11 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.0, rate: 1.02 },
  { at: S(L.S11 + 26), src: "ticket_click.wav",v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(L.S11 + 98), src: "green_tone.wav",  v: LEVELS.SFX_HERO,    dur: 0.70, rate: 1.06 },

  /* ---- S12 · THE PEAK (6). ⭐⭐ THE VILLAIN DIES HERE AND IT IS THE ONLY
     PLACE IN THE REEL WITH THIS MUCH SOUND: the lever, three looms starting on
     a stagger, and the stone wheel SEIZING — a falling rumble with a metal
     bind over it. */
  { at: S(L.S12 + 8),  src: "knife_switch.wav",v: LEVELS.SFX_MID,     dur: 0.12, rate: 0.94 },
  { at: S(L.S12 + 11), src: "mech_clank.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 1.10 },
  { at: S(L.S12 + 23), src: "mech_clank.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.90 },
  { at: S(L.S12 + 26), src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 2.0, rate: 1.12 },
  { at: S(L.S12 + 52), src: "motor_sag.wav",   v: LEVELS.SFX_HERO,    dur: 0.85, rate: 0.84 },
  { at: S(L.S12 + 62), src: "impact.wav",      v: LEVELS.SFX_HERO,    dur: 0.62, rate: 0.86 },

  /* ---- S13 · THE SOCKETS (4). FOUR slams, one sample, pitches falling — the
     repetition IS the argument, so they must sound like one mechanism. */
  { at: S(L.S13 + 11), src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 0.30, rate: 1.06 },
  { at: S(L.S13 + 20), src: "clap_slam.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.98 },
  { at: S(L.S13 + 29), src: "clap_slam.wav",   v: LEVELS.SFX_MID,     dur: 0.30, rate: 0.90 },
  { at: S(L.S13 + 38), src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 0.30, rate: 0.82 },

  /* ---- S14 · RE-SKILLED (3). One cue per job, on its own measured onset. */
  { at: S(L.S14 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.0, rate: 1.10 },
  { at: S(L.S14 + 31), src: "pop.wav",         v: LEVELS.SFX_MID,     dur: 0.13, rate: 1.14 },
  { at: S(L.S14 + 64), src: "pickup_chime.wav",v: LEVELS.SFX_MID,     dur: 0.34, rate: 1.08 },

  /* ---- S15 · THE CTA (4). The rail extension is ONE textured run, not nine
     ratchets; the press is the hero; the slot returns on a bell. */
  { at: S(L.S15 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.0, rate: 1.16 },
  { at: S(L.S15 + 20), src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.50, rate: 1.10 },
  { at: S(L.S15 + 68), src: "stamp_press.wav", v: LEVELS.SFX_HERO,    dur: 0.34, rate: 0.90 },
  { at: S(L.S15 + 112),src: "bell_ring.wav",   v: LEVELS.SFX_HERO,    dur: 1.60, rate: 1.04 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK. Reel 115 generated a synth bed while
   "Another Day Of Sun" was sitting in Drive `Faceless/*Soundtracks/`, and Alex:
   *"the BG music is completely wrong, not the one we use, another day another
   sun."* A synthesised pad passes every audio gate and is still not the show's
   music. THE TRACK IS NAMED IN `claude-ai-reel-workflow`. Look there first.

   ⭐ THE WINDOW IS CHOSEN BY MEASUREMENT, NOT BY THE HOUSE SPOT. Scanning the
   whole 228.5s track in 0.5s steps for a 40.5s window:

       start    onset   rise   mean dB   open-3s   worst-1.5s below mean
       176.00   0.249   1.13    -13.1     -13.8      2.6   <- BEST IN THE TRACK
       127.54   0.159   2.03    -13.2     -15.7      3.2
        13.95   0.206   1.67    -22.7     -19.9      9.3   <- the house spot
         0.00   0.000   0.50    -25.8     -40.0     65.2

   176.00 is the finale, after the 170-175s breakdown, and it wins on every
   axis: the loudest opening three seconds (the test that matters — a bed is
   judged where a viewer meets it), the strongest onset, and a worst-1.5s only
   2.6 dB under its own mean against a 9 dB bar. It also clears reel 115's
   13.95s window by 162s, which is well past the >=12s separation the trial-cut
   rule asks for.

   ⛔⛔ AND THE BED IS COMPRESSED BEFORE IT IS LEVELLED. `loudnorm` sets an
   INTEGRATED level, so a track with internal range puts its brass hits far
   above the target. `acompressor` 4:1 before the level stage took
   peak-over-median to 1.4 dB.
   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — THE PUFF OF AIR LIVES IN HERE.
   Reel 115 spent three rounds on an air note that was in the BED, not the SFX.
   Measured on this window, >4kHz share went 16.6% -> 6.7-9.4% across the whole
   41s with `treble=g=-15:f=4200` plus a -9 dB shelf at 9k, which puts it below
   the VO's own ~10%. ⛔ DO NOT REMOVE THESE TWO FILTERS.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Measured onset: 0 ms.

   ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT. Measured with `ebur128`
   on THESE files, today:
       VO   vo_117know.wav  -19.0 LUFS  x DIALOGUE(-6)  -> -25.0
       117_know_bed.wav     -23.8 LUFS  x MUSIC(-20)    -> -43.8   gap 18.8 dB
   The house figure is ~12 dB under the VO, so the bed comes UP by 6.8 dB. */
const BED: Record<Variant, string> = {
  works: "117_know_bed.wav",        /* Another Day Of Sun @ 176.00s — the finale */
  forge: "117_know_bed_forge.wav",  /* Another Day Of Sun @ 127.54s */
  night: "117_know_bed_night.wav",  /* Every Living Breathing Moment — the other house track */
};
export const BED_GAIN: Record<Variant, number> = {
  works: db(6.8),   /* -23.8 LUFS -> 12.0 dB under the -19.0 LUFS VO */
  forge: db(6.8),
  night: db(6.8),
};
/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { works: 1252, forge: 1332, night: 1186 };
/** and a per-cut section-card Y, for the same reason */
const CARD_Y: Record<Variant, number> = { works: 664, forge: 590, night: 726 };

/** ⭐ THE HEADER IS CONSTANT, AND THAT IS A DELIBERATE REVERSAL. Alex, on the
    delivered cut: *"Claude Beginner -> Expert / 30 Seconds — that should be the
    header here."*

    ⛔ It contradicts a standing house rule, so the reasoning is written down
    rather than left to look like a slip. Reel 107 taught that the header must
    never DISAPPEAR, and reel 108 taught that that is not the same instruction
    as saying one thing for the whole reel — so 116 and this reel's first cut
    both swapped the header per section. That rule existed because the header
    was the ONLY thing marking structure.
    ⭐ It no longer is. This reel now carries three full SECTION CARDS
    (1/3 · 2/3 · 3/3, numbered, with the fifteen ticks split 5/5/5), which mark
    the tiers far harder than a pill ever did. With the structure carried
    properly, the header is free to go back to its real job: stating the promise
    for all 1171 frames, so a viewer arriving at any second knows what they are
    watching and how long it takes. The tier label was duplicating the card. */
const headerFor = (_f: number): { big: string; hot: string } =>
  ({ big: "CLAUDE BEGINNER → EXPERT", hot: "30 SECONDS" });

export const makeReel = (v: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const hd = headerFor(f);
  const cam = CAM[v];
  return (
    <AbsoluteFill>
      <Bg />
      <CamCtx.Provider value={{ dx: cam.dx, dy: cam.dy, s: cam.s, rot: cam.rot }}>
        <AssemblyCtx.Provider value={true}>
          {/* ⛔ THE GRADE IS CONTRAST AND BRIGHTNESS ONLY — no hue, no saturate
              swing. It wraps the SCENE STACK, never the chassis, so the header,
              rail and captions stay identical across cuts. */}
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

      {/* ⭐⭐ THE THREE SECTION CARDS. Alex: *"when I say beginner, intermediate,
          expert it should be clear separations… very clear and structured."*
          Each drives in ON the spoken word, holds ~0.7s and leaves. They are at
          ROOT so a card can ride over the cut that follows it, and their tick
          rules split the fifteen 5/5/5 — which is exactly how the guide is
          divided, so the card is also telling you where you are in the number
          spine rather than just naming a tier. */}
      <SectionCard t="BEGINNER" n={1} f={f} at={L.S2} from={0} to={5} c={SODIUM} bc="#F0C078"
        top={CARD_Y[v]} grade={GRADE[v]} />
      <SectionCard t="INTERMEDIATE" n={2} f={f} at={L.S9} from={5} to={10} c={TEAL} bc="#A6D8DE"
        top={CARD_Y[v]} grade={GRADE[v]} />
      <SectionCard t="EXPERT" n={3} f={f} at={L.S11} from={10} to={15} c={VIOLET} bc="#BCA8DA"
        top={CARD_Y[v]} grade={GRADE[v]} />

      {/* ⛔ THE GLOBAL CHROME — one of each, at root, for all 1171 frames. */}
      <HookHeader big={hd.big} hot={hd.hot} f={f < L.S2 ? f + 12 : f - L.S2} />
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />

      <Audio src={staticFile("vo_117know.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v]} />
      <SfxTrack cues={SFX} />
    </AbsoluteFill>
  );
};

export const ClaudeKnowReel = makeReel("works");
export const ClaudeKnowForge = makeReel("forge");
export const ClaudeKnowNight = makeReel("night");
