import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19,
  CAM, GRADE,
} from "./BillScenes";
import type { Variant } from "./BillScenes";
import { CamCtx, R } from "./BillWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_116bill.json";

/* ===========================================================================
   REEL 116 · "BILL" — THE LONG BILL.  Board: storyboards/116-bill.md.

   Subject: FIVE free Google AI tools that replace paid subscriptions —
   AI Studio, NotebookLM, Flow, Opal and Antigravity. Every claim opened and
   read live 2026-08-20; the ledger is `R` in BillWorld.tsx.

   THE LONG BILL: a printed subscription invoice that crosses every scene as
   the reel's spine, and is physically CUT SHORTER five times, once per tool.
   The villain is THE STAMP HEAD, fed in S0, S1, S4 and S11, still stamping at
   S18's before-state, and beaten exactly once, at the peak.

   VO: public/vo_116bill.wav — 56.53s, 246 words, cut from a 102.59s raw take.

   ⛔⛔⛔ THE RAW TAKE HAD **FOUR** DEAD TAKES AND **THREE** `cut cut` MARKERS,
      and a whole-file faster-whisper pass FOUND ONLY ONE OF THEM. Reel 113
      shipped a flub for exactly this reason. What found them here was
      transcribing each speech ISLAND separately, cut at RMS-measured silences:

        06.76-07.54  "So Google quietly"                <- dead take 1
        08.36-08.60  "cut cut"                          <- marker, MISSED by
                                                           the whole-file pass
        49.04-51.40  "You type any animated film or..." <- dead take 2
        51.68-52.00  "and it-"                          <- trailing fragment
        52.46-52.68  "cut cut"                          <- marker
        54.82-57.42  "You type any animated or film..." <- dead take 3
        57.82-58.08  "cut cut"                          <- marker
        58.68-65.30  the clean retry                    <- KEPT

      ⭐ THE ROUTINE THAT FINDS THEM: a 20ms RMS envelope segments the file into
      islands at -38 dB; each island is transcribed ALONE. The model smooths a
      stutter-plus-retry into the sentence it expects when it can see the whole
      file, and cannot when the window is one phrase long.
      ⛔ A WHOLE-FILE PASS IS NOT A FLUB CHECK.

   ⛔⛔ AND I OVER-CUT ONCE, IN THE OTHER DIRECTION. The first pass ended the
      NotebookLM keep at 39.00s on a -56 dB trough and clipped "build a" — the
      re-transcribe read *"you can BREATHE second brain"*. There was no flub
      there at all; the trough was the natural pause between "a" and "free".
      ⭐ Every one of the 17 keep ranges was then transcribed INDEPENDENTLY and
      had to read as a complete phrase before the splice was rebuilt.

   ⛔⛔ 56.53s IS OUTSIDE THE 22-29s HOUSE RANGE AND IS FLAGGED, NOT TRIMMED.
      No edit reaches 30s without dropping one of the five tools, which is not
      a silent call to make. In family with what actually ships:
      107 = 35.06 · 110 = 31.36 · 111 = 33.49 · 113 = 51.93 · 112 = 81.63.

   ⛔⛔ THE HONESTY LEDGER LIVES IN BillWorld.tsx (`R`, `RATE_BANNED`,
      `TOTAL_BANNED`, `FREE_STAMP_BANNED_SCENES`). The five that matter:
      1. NO `FREE` PLATE AND NO `$0` ON THE FLOW BEAT (S9/S10). Flow's free
         tier is 50 DAILY CREDITS — metered, not open. "Free" stays in the
         AUDIO, exactly where reel 105 stopped for Magnific.
      2. NO `20x` PLATE AND NO MULTIPLIER GAUGE (S17). No benchmark is
         published; the frame draws OUTPUT VOLUME instead.
      3. ONLY THREE PAID MARKS APPEAR — higgsfield, bytedance (Seedance),
         cursor — because the VO names only three. The "$20 a month for a chat
         window" line names NO vendor, so that row of the bill carries no mark.
      4. NO TOTAL, EVER. "Thousands a month" is not sourceable. The only money
         on screen is `$20/MO`, twice, both said by the VO and both real.
         THE NUMBER SPINE COUNTS CHARGES: 5 -> 0.
      5. NO "0% HALLUCINATION" PLATE. S8 draws a TETHER, not a score.

   ⛔⛔ THE HEADER IS ON FOR ALL 1696 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f + 12` on the hook so it is SETTLED on frame 0, and it CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1696 frames = 56.53s, exactly the VO file's length. Its last word `BILL`
    starts at 55.98s (f1679), so the reel carries 17 frames of tail and hard-cuts
    on the keyword. */
export const BILL_TOTAL = 1696;

/* ⛔ MEASURED WORD ONSETS from src/data/words_116bill.json, converted to frames
   and pulled back by the house 4-frame picture lead. Nothing here is estimated
   — every value is `round(onset * 30) - 4` of the VO's own beat openers, read
   by pattern-matching the opening words (never a hardcoded index — those drift
   the moment the VO changes). */
export const L = {
  S0: 0,      /* HOOK      0.00s  "If you're not using these 5 Google AI..."  */
  S1: 48,     /* CHARGES   1.72s  "you're wasting thousands of dollars a..."  */
  S2: 137,    /* SHIPPED   4.70s  "So Google quietly shipped over 20 of..."   */
  S3: 220,    /* THE FIVE  7.48s  "but these 5 are the ones that actually..." */
  S4: 312,    /* TOLL     10.52s  "1. AI Studio. Instead of $20 a month..."   */
  S5: 389,    /* FREE     11.52s  "you get Gemini 3 Pro in your browser..."   */
  S6: 489,    /* CONTEXT  16.42s  "with a context window big enough to..."    */
  S7: 577,    /* FILES    19.36s  "2. NotebookLM. You can build a free..."    */
  S8: 673,    /* TETHER   22.55s  "so it stops making things up and has..."   */
  S9: 769,    /* STAGE    25.75s  "3. Google Flow. This is Google's AI..."    */
  S10: 843,   /* THE SHOT 28.24s  "You type any animated or film shot you..." */
  S11: 948,   /* RENTS    31.74s  "so you're not paying Higgsfield or..."     */
  S12: 1033,  /* SENTENCE 34.57s  "4. Opal. You describe an app in one..."    */
  S13: 1093,  /* THE LINK 36.56s  "and it builds a working AI tool you can..."*/
  S14: 1195,  /* THE IDE  39.96s  "5. Antigravity. It's a free coding IDE..." */
  S15: 1275,  /* THE TEAM 42.62s  "that runs a team of agents at once..."     */
  S16: 1395,  /* WATCH    46.63s  "while you just watch them work."           */
  S17: 1434,  /* OUTPUT   47.94s  "This is how people become 20 times more..."*/
  S18: 1517,  /* LAST     50.71s  "and that's what people are also paying..." */
  S19: 1636,  /* CTA      54.66s  "For the full free list, comment BILL."     */
  END: BILL_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.S16 - L.S15,
  S16: L.S17 - L.S16, S17: L.S18 - L.S17, S18: L.S19 - L.S18, S19: L.END - L.S19,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ `tools/sfx_audit.py` WAS RUN BEFORE THIS BANK WAS WRITTEN, NOT AFTER.
   67 world-appropriate candidates were measured and **12 FAILED**, several of
   which sound exactly right by name — including the one this reel most wanted:

       coin_slide   89.8% >2kHz, 303ms attack   HISS+AIR   (the toll booth!)
       split_flap   AIR   (a bill counter!)     chain_clank AIR
       chimehi · chimelo · lib_click · lib_pop · lib_notif · lib_typing  AIR
       scanner_sweep AIR · wire_travel AIR · lib_deep_whoosh NAMED-AIR

   None of them is in this bank. The toll's coin is `key` + `slot_stop` +
   `mech_clank` instead — three short metal transients, which is what a coin
   going through a mechanism actually is.

   ⭐⭐ AND A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate with
   24 of 41 cues out of one chiptune pack, because the tool measures spectra and
   has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This reel is a records hall, a
   print room, a workshop, a film stage and a control room — so: room tone,
   press dies, pneumatic thunks, blade passes, drawer rolls, shutters, a
   projector, stage lamps and machine hum. **ZERO chiptune cues.** The greppable
   gate is a grep for `c_` over this file, which must return 0.


   ⛔⛔⛔ TWO CUES ARE BANNED FROM THIS REEL AND FROM EVERY FUTURE ONE.
   Alex, on the delivered cut: *"those puff of air sounds at 4 seconds and stuff
   do not use those sound effects again forever, like those do not sound good
   and dont sound like stamping or whatever."*

     the pneumatic cue   PNEUMATIC — literally compressed air escaping. It was
                         the STAMP sound in S1, four times, and the 4-second hit
                         he named is the one at 3.97s.
     the crusher cue     289ms attack used as an IMPACT. Anything over ~150ms is
                         a SWELL, and a swell at impact volume reads as a whoosh.

   ⭐ AND NEITHER WAS CATCHABLE BY THE EXISTING GATES. `sfx_audit` measures
   spectrum and names; the pneumatic is 4.6% >2kHz with a 17ms attack and passes
   every check in the tool. The ATTACK SCAN is what finds this class, and it is
   now part of building a bank:

       for every non-BED cue:  attack > 150ms  ->  it is a SWELL, not a hit

   Measured on this bank: crusher 289ms · deep_engine 346ms · projector 776ms ·
   shop_bed 296ms · machine_bed 422ms · road_bed 2681ms. The four beds are
   SUPPOSED to swell and sit at SFX_BED; the crusher sat at TEXTURE and MID.

   ⭐ THE REPLACEMENTS ARE THE OBJECT, not a near-miss. A stamp is
   `stamp_press` (0.9ms attack, literally a stamp press) layered with `thock`
   for the low body, and the heaviest of the four adds `rebuild_thud`. That is
   what a die striking paper sounds like.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz. Every bright one
   (`stamp_press` 50.4%, `slash` 81.1%, `ratchet` 67.3%, `ui_tap` 65.7%,
   `snap` 92.7%, `key` 97.0%, `wrench_clank` 93.3%, `camera_shutter` 80.1%,
   `crack_hunt` 86.3%, `metal_ping` 89.5%, `sign_clack` 49.9%) is capped at FOUR
   uses; the low ones (`thock` 1.3%, `rebuild_thud` 2.7%, `slate_whump` 2.2%,
   `pneu_thunk` 4.6%, `impact` 6.2%, `sub` 0.8%, `boom` 1.0%, `mech_clank`
   30.4%, `crusher` 33.3%) carry the repetition.
   ⛔ Every `dur` is <= the file's measured true length so no cue is truncated
   mid-decay by the renderer, and no long one-shot is left ringing under a cut.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count per
   scene PEAKS on S0 (the hook, 8), S15 (the team, 7) and S18 (the last charge,
   7), and thins to two or three on the information scenes. A reel where every
   scene has the same amount going on reads as busy AND unranked.
   ⛔⛔ AND THE COUNT IS MEASURED, NOT ESTIMATED. The first draft of this
   comment claimed 66 cues; `grep -c "{ at: S("` said **99 = 1.75/sec**, over
   the 1.5 ceiling, and `sfx_audit` separately failed `slash.wav` at 5 uses
   against a 4-use cap for anything over 35% >2kHz. Both were fixed by REMOVING
   cues, never by re-describing them — 23 accents came out and the S13 blade
   became a low `thock`. **76 cues over 56.53s = 1.34/sec.**
   ⭐ What was cut was accents; what was kept is the SHAPE — S0 (7), S15 (7) and
   S18 (7) still carry the three peaks, and the information scenes run 2-4.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE BILL (8) — the density peak, and the villain's theme. The
     stamp is a PRESS DIE plus a low body, and the roll's lurch is the sub. */
  { at: S(L.S0 + 0),   src: "shop_bed.wav",      v: LEVELS.SFX_BED,     dur: 4.9 },
  { at: S(L.S0 + 0),   src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,     dur: 0.26 },
  { at: S(L.S0 + 0),   src: "sub.wav",           v: LEVELS.SFX_HERO,    dur: 0.40 },
  { at: S(L.S0 + 12),  src: "stamp_press.wav",   v: LEVELS.SFX_HERO,    dur: 0.32 },
  { at: S(L.S0 + 18),  src: "rebuild_thud.wav",  v: LEVELS.SFX_HERO,    dur: 0.78, rate: 0.94 },
  { at: S(L.S0 + 18),  src: "boom.wav",          v: LEVELS.SFX_MID,     dur: 0.52, rate: 0.88 },
  { at: S(L.S0 + 36),  src: "rebuild_thud.wav",  v: LEVELS.SFX_MID,     dur: 0.78, rate: 0.86 },

  /* ---- S1 · THE CHARGES (5). ⭐ FOUR STAMPS, ONE SAMPLE, PITCHES FALLING —
     the repetition IS the argument, so it must sound like the same charge, not
     four different events. */
  { at: S(L.S1 + 0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED,     dur: 3.9 },
  { at: S(L.S1 + 11),  src: "stamp_press.wav",   v: LEVELS.SFX_HERO,    dur: 0.32, rate: 1.00 },
  { at: S(L.S1 + 11),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.92 },
  { at: S(L.S1 + 32),  src: "slate_whump.wav",   v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.96 },
  { at: S(L.S1 + 53),  src: "slate_whump.wav",   v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.90 },
  { at: S(L.S1 + 71),  src: "stamp_press.wav",   v: LEVELS.SFX_HERO,    dur: 0.32, rate: 0.88 },
  { at: S(L.S1 + 71),  src: "rebuild_thud.wav",  v: LEVELS.SFX_MID,     dur: 0.78, rate: 0.90 },

  /* ---- S2 · TWENTY SHIPPED (4). 24 tiles are NOT 24 cues — two textured
     passes plus the shutter, or it becomes a metronome of slaps. */
  { at: S(L.S2 + 0),   src: "stage_hum.wav",     v: LEVELS.SFX_BED,     dur: 1.9 },
  { at: S(L.S2 + 2),   src: "ratchet.wav",       v: LEVELS.SFX_MID,     dur: 0.46 },
  { at: S(L.S2 + 20),  src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.11, rate: 1.10 },
  { at: S(L.S2 + 32),  src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.11, rate: 0.96 },

  /* ---- S3 · THESE FIVE (5). Five landings are TWO impacts and a chime, not
     five slaps — and the chime is what says "these are the good ones". */
  { at: S(L.S3 + 20),  src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.15, rate: 1.04 },
  { at: S(L.S3 + 62),  src: "impact.wav",        v: LEVELS.SFX_HERO,    dur: 0.58 },
  { at: S(L.S3 + 66),  src: "temper_chime.wav",  v: LEVELS.SFX_MID,     dur: 0.66 },

  /* ---- S4 · THE TOLL (5). ⭐ The coin is THREE short metal transients, not a
     `coin_slide` — that sample measured 89.8% >2kHz with a 303ms attack and is
     banned. A coin through a mechanism is metal hitting metal three times. */
  { at: S(L.S4 + 0),   src: "engine_idle.wav",   v: LEVELS.SFX_BED,     dur: 1.9 },
  { at: S(L.S4 + 30),  src: "slot_stop.wav",     v: LEVELS.SFX_MID,     dur: 0.20 },
  { at: S(L.S4 + 34),  src: "mech_clank.wav",    v: LEVELS.SFX_HERO,    dur: 0.11 },
  { at: S(L.S4 + 36),  src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.32, rate: 0.90 },

  /* ---- S5 · FREE IN THE BROWSER (6). The cage LEAVING is the low sweep; the
     first cut of five is the blade, and it gets its own chime. */
  { at: S(L.S5 + 7),   src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.80, rate: 1.10 },
  { at: S(L.S5 + 27),  src: "green_tone.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.64 },
  { at: S(L.S5 + 63),  src: "slash.wav",         v: LEVELS.SFX_HERO,    dur: 0.44 },
  { at: S(L.S5 + 70),  src: "pickup_chime.wav",  v: LEVELS.SFX_MID,     dur: 0.32 },

  /* ---- S6 · THE CODEBASE DROP (5). Three crates land; the THIRD is the
     heaviest, because the point is that it still fits. */
  { at: S(L.S6 + 0),   src: "deep_engine.wav",   v: LEVELS.SFX_BED,     dur: 1.05 },
  { at: S(L.S6 + 22),  src: "impact.wav",        v: LEVELS.SFX_MID,     dur: 0.58, rate: 1.02 },
  { at: S(L.S6 + 75),  src: "impact.wav",        v: LEVELS.SFX_HERO,    dur: 0.58, rate: 0.84 },
  { at: S(L.S6 + 75),  src: "sub.wav",           v: LEVELS.SFX_HERO,    dur: 0.40, rate: 0.86 },

  /* ---- S7 · YOUR OWN FILES (4). NINE files are not nine cues — two paired
     taps and a shelf chime, so the run reads as a texture. */
  { at: S(L.S7 + 0),   src: "road_bed.wav",      v: LEVELS.SFX_BED,     dur: 3.2, rate: 0.9 },
  { at: S(L.S7 + 22),  src: "chair_knock.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.28 },
  { at: S(L.S7 + 88),  src: "arrive_chime.wav",  v: LEVELS.SFX_MID,     dur: 1.02 },

  /* ---- S8 · TIED TO THE SOURCE (5). ⭐ The untied answer FALLS and gets the
     only descending cue in the reel; the boundary sweep is a low tone, not a
     whoosh (every whoosh in this pack measured as AIR). */
  { at: S(L.S8 + 18),  src: "twang.wav",         v: LEVELS.SFX_MID,     dur: 0.46 },
  { at: S(L.S8 + 38),  src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.80, rate: 0.84 },
  { at: S(L.S8 + 74),  src: "slash.wav",         v: LEVELS.SFX_MID,     dur: 0.44, rate: 0.94 },

  /* ---- S9 · THE STAGE (5). Three lamp strikes and a crane locking. ⭐ The
     projector is the room, and it is the only place it appears. */
  { at: S(L.S9 + 0),   src: "projector.wav",     v: LEVELS.SFX_BED,     dur: 1.9 },
  { at: S(L.S9 + 4),   src: "spotlight_snap.wav", v: LEVELS.SFX_MID,    dur: 0.36 },
  { at: S(L.S9 + 20),  src: "spotlight_snap.wav", v: LEVELS.SFX_HERO,   dur: 0.36, rate: 0.88 },

  /* ---- S10 · THE SHOT (6). ⛔ EVERY CUE IS ON A MEASURED WORD ONSET — the
     slate on "shot you want", the set on "Veo", the move on "camera move". */
  { at: S(L.S10 + 40), src: "clap_slam.wav",     v: LEVELS.SFX_HERO,    dur: 0.28 },
  { at: S(L.S10 + 62), src: "slate_whump.wav",   v: LEVELS.SFX_MID,     dur: 0.15 },
  { at: S(L.S10 + 72), src: "thock.wav",         v: LEVELS.SFX_HERO,    dur: 0.15, rate: 0.88 },
  { at: S(L.S10 + 80), src: "motor_sag.wav",     v: LEVELS.SFX_MID,     dur: 0.80, rate: 1.18 },

  /* ---- S11 · THE CANCELLED RENTS (4). The blade is the hero and it gets a
     low body under it, because a cut has to feel like it cost something. */
  { at: S(L.S11 + 35), src: "slash.wav",         v: LEVELS.SFX_HERO,    dur: 0.44, rate: 0.90 },
  { at: S(L.S11 + 43), src: "boom.wav",          v: LEVELS.SFX_MID,     dur: 0.52, rate: 0.94 },
  { at: S(L.S11 + 50), src: "pickup_chime.wav",  v: LEVELS.SFX_MID,     dur: 0.32, rate: 1.06 },

  /* ---- S12 · ONE SENTENCE (3). A 2.0s beat, not a set piece. */
  { at: S(L.S12 + 35), src: "rebuild_thud.wav",  v: LEVELS.SFX_HERO,    dur: 0.78, rate: 0.92 },
  { at: S(L.S12 + 35), src: "sub.wav",           v: LEVELS.SFX_MID,     dur: 0.40, rate: 0.94 },

  /* ---- S13 · THE APP, AS A LINK (5). The chain is ONE cue, not eleven; the
     far end lighting up is what earns the chime. */
  { at: S(L.S13 + 26), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.32, rate: 1.10 },
  { at: S(L.S13 + 70), src: "arrive_chime.wav",  v: LEVELS.SFX_HERO,    dur: 1.02, rate: 1.06 },
  { at: S(L.S13 + 78), src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.90 },

  /* ---- S14 · THE FREE IDE (4). One switch, three shutters — the shutters are
     ONE rising trio, not three identical hits. */
  { at: S(L.S14 + 8),  src: "knife_switch.wav",  v: LEVELS.SFX_MID,     dur: 0.11 },
  { at: S(L.S14 + 22), src: "ratchet.wav",       v: LEVELS.SFX_MID,     dur: 0.46, rate: 0.82 },
  { at: S(L.S14 + 30), src: "impact_deep.wav",   v: LEVELS.SFX_HERO,    dur: 0.76 },

  /* ---- S15 · THE TEAM (7) — the second density peak. ⭐ The three bays come
     alive on their OWN measured words, and the ticket hand-offs are the two
     taps BETWEEN them. */
  { at: S(L.S15 + 0),  src: "machine_bed.wav",   v: LEVELS.SFX_BED,     dur: 3.9, rate: 1.06 },
  { at: S(L.S15 + 65), src: "scan_beep.wav",     v: LEVELS.SFX_MID,     dur: 0.38 },
  { at: S(L.S15 + 76), src: "mallet_tap.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.18, rate: 1.10 },
  { at: S(L.S15 + 88), src: "scan_beep.wav",     v: LEVELS.SFX_MID,     dur: 0.38, rate: 1.08 },
  { at: S(L.S15 + 99), src: "mallet_tap.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.18, rate: 1.18 },
  { at: S(L.S15 + 107), src: "scan_beep.wav",    v: LEVELS.SFX_HERO,    dur: 0.38, rate: 1.16 },
  { at: S(L.S15 + 112), src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.66, rate: 1.16 },

  /* ---- S16 · YOU JUST WATCH (2). ⭐ The quietest beat in the reel, on
     purpose: the room keeps running and the hero stops. Density is a SHAPE. */
  { at: S(L.S16 + 5),  src: "chair_knock.wav",   v: LEVELS.SFX_MID,     dur: 0.28, rate: 0.88 },
  { at: S(L.S16 + 17), src: "thock.wav",         v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.80 },

  /* ---- S17 · MUCH MORE FINISHED (5). Thirty units are TWO textures plus the
     overflow — never thirty cues. */
  { at: S(L.S17 + 0),  src: "shop_bed.wav",      v: LEVELS.SFX_BED,     dur: 2.7, rate: 1.08 },
  { at: S(L.S17 + 28), src: "chair_knock.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.28, rate: 1.14 },
  { at: S(L.S17 + 70), src: "can_bong.wav",      v: LEVELS.SFX_MID,     dur: 0.32, rate: 1.18 },

  /* ---- S18 · THE LAST CHARGE (7) — the third density peak, and the only place
     in the reel the GONG appears. The villain stamps twice more, is cut, and
     the gong is the beat that says it is over. */
  { at: S(L.S18 + 0),  src: "machine_bed.wav",   v: LEVELS.SFX_BED,     dur: 3.9, rate: 0.94 },
  { at: S(L.S18 + 8),  src: "slate_whump.wav",   v: LEVELS.SFX_MID,     dur: 0.15, rate: 0.94 },
  { at: S(L.S18 + 24), src: "stamp_press.wav",   v: LEVELS.SFX_MID,     dur: 0.32, rate: 0.88 },
  { at: S(L.S18 + 46), src: "slash.wav",         v: LEVELS.SFX_HERO,    dur: 0.44, rate: 0.84 },
  { at: S(L.S18 + 55), src: "impact_deep.wav",   v: LEVELS.SFX_HERO,    dur: 0.76, rate: 0.92 },
  { at: S(L.S18 + 55), src: "sub.wav",           v: LEVELS.SFX_HERO,    dur: 0.40, rate: 0.82 },
  { at: S(L.S18 + 74), src: "gong.wav",          v: LEVELS.SFX_MID,     dur: 2.10 },

  /* ---- S19 · THE CTA (4). ⛔ No confetti and no fanfare. The keyword lands on
     a single bright lock, which is the hard cut. */
  { at: S(L.S19 + 8),  src: "mallet_tap.wav",    v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.06 },
  { at: S(L.S19 + 42), src: "snap.wav",          v: LEVELS.SFX_HERO,    dur: 0.05 },
  { at: S(L.S19 + 43), src: "bell_ring.wav",     v: LEVELS.SFX_MID,     dur: 1.52 },
];

/* ⛔⛔⛔ THE GENERATED BED WAS THE WRONG MUSIC AND ALEX CALLED IT: *"the BG music
   is completely wrong, it's not using the right bg music we typically use."*
   He is right and the evidence was in this repo the whole time. Counted across
   every reel's source, the HOUSE beds are two real tracks from Drive
   `Faceless/*Soundtracks/`:

       ados_bed_loud.wav / ados_bed.wav   13 uses   "Another Day Of Sun"
       ebm_bed.wav / ebm_bed_hot.wav       8 uses   "Every Living Breathing Moment"

   Reels 107-114 drifted onto synthesised beds (`gen_bay_bed.py` and its clones)
   and this reel inherited that drift without ever checking what "the bed" meant
   here. ⭐ A synthesised pad can pass every audio gate — onset at zero, no air
   swell, continuous, correctly gapped — and still not be the show's music.
   `tools/gen_bill_bed.py` is kept for reference and is no longer used.

   ⛔ A DIFFERENT BED PER CUT still holds: the VO is the same recording in all
   three, so the bed is one of the few audio layers a duplicate check can see.
   `ebm_bed` is 59.0s and covers the 56.53s reel with no loop; `ados_bed_loud`
   is 50.0s and loops once. */
const BED: Record<Variant, string> = {
  bill:  "116_ebm_bed.wav",     /* ebm, head-trimmed 0.28s — see below */
  amber: "ados_bed_loud.wav",   /* ados from the top */
  steel: "116_ados_late.wav",   /* ados from 22s — a different PASSAGE, not a level */
};
/** ⛔⛔ `soundtrack-onset-at-zero`, and it BLOCKED THE SHIP GATE. `ebm_bed.wav`
    carries a 280ms lead-in before anything is audible, and `MUSIC_ONSET_0`
    requires the bed audible inside 150ms — the reel failed 7/8 on a bed that
    sounded completely fine. Measured with a 5ms RMS scan rather than guessed:
        ebm_bed        first >-40dB at 280ms   ⛔
        ebm_bed_hot    first >-40dB at  15ms   ✓
        ados_bed_loud  first >-40dB at  10ms   ✓
    So `116_ebm_bed.wav` is ebm with 0.28s trimmed off its head (58.72s, onset
    0ms), which also re-measured its loudness -11.0 -> -16.0 LUFS because the
    trim removed a loud intro — so the gain below had to be recomputed, not
    carried over.
    ⛔ And steel does NOT get "ebm at a different volume": an audio-only variant
    is a pixel duplicate (docs/TRIAL-CUTS). It gets ados from 22s, which is a
    different passage of the other track. */
const BED_LOOP: Record<Variant, boolean> = { bill: false, amber: true, steel: false };

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { bill: 1248, amber: 1332, steel: 1182 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13). Reel 110
   shipped 7 dB hot because reel 108's `+8 dB` bed trim — a correction for an
   INAUDIBLE bed on a different source — was carried forward unmeasured. These
   are measured with `ffmpeg -af ebur128` on THESE files, today, and the two
   house tracks are 12.3 dB apart from each other so they cannot share a trim:

       VO             vo_116bill.wav  -16.6 LUFS  x DIALOGUE(-6) -> -22.6
       116_ebm_bed    -16.0 LUFS      x MUSIC(-20)               -> -36.0   gap 13.4
       ados_bed_loud  -23.3 LUFS      x MUSIC(-20)               -> -43.3   gap 20.7
       116_ados_late  -27.6 LUFS      x MUSIC(-20)               -> -47.6   gap 25.0

   The house figure is ~12 dB under the VO, so all three come UP, by different
   amounts, because they are three different files. Nothing is inherited and
   nothing is shared — and note the ebm figure moved -11.0 -> -16.0 when its
   head was trimmed for the onset gate, which is exactly the kind of change a
   carried-over constant would have missed. */
export const BED_GAIN: Record<Variant, number> = {
  bill:  db(1.4),    /* 116_ebm_bed   -16.0 LUFS -> 12.0 dB under the VO */
  amber: db(8.7),    /* ados_bed_loud -23.3 LUFS -> 12.0 dB under the VO */
  steel: db(13.0),   /* 116_ados_late -27.6 LUFS -> 12.0 dB under the VO */
};
/** the A/B comp only: the same picture with the bed 6 dB further down */
export const BED_TRIM = { loud: db(0), quiet: db(-6) } as const;

export const makeReel = (v: Variant, bed: keyof typeof BED_TRIM = "loud"): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_116bill.wav")} volume={LEVELS.DIALOGUE} />
      <Audio loop={BED_LOOP[v]} src={staticFile(BED[v])}
        volume={LEVELS.MUSIC * BED_GAIN[v] * BED_TRIM[bed]} />
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
            <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} dur={DUR.S16} /></Sequence>
            <Sequence from={L.S17} durationInFrames={DUR.S17}><S17 v={v} dur={DUR.S17} /></Sequence>
            <Sequence from={L.S18} durationInFrames={DUR.S18}><S18 v={v} dur={DUR.S18} /></Sequence>
            <Sequence from={L.S19} durationInFrames={DUR.S19}><S19 v={v} dur={DUR.S19} /></Sequence>
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
   ⛔⛔ AND THIS IS WHERE THE WORDS LIVE. The picture carries MARKS and NUMERALS
   only (reel 109 was rejected on 33 `<span>`s in its animation layer); the
   header band and the captions carry the language.
   ⛔⛔ NOTHING HERE MAY BREAK THE LEDGER: no `FREE` on the two FLOW bands
   (S9/S10), no `20x` on S17, no total anywhere, and `$20` only where the VO
   says it.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "5 FREE GOOGLE TOOLS",      hot: "THAT KILL YOUR AI BILL" },
  { from: L.S1,  big: "THE SAME CHARGE",          hot: "EVERY SINGLE MONTH" },
  { from: L.S2,  big: "GOOGLE SHIPPED",           hot: "OVER 20 OF THESE QUIETLY" },
  { from: L.S3,  big: "THESE 5 REPLACE",          hot: "WHAT YOU ALREADY PAY FOR" },
  { from: L.S4,  big: "$20/MO FOR A",             hot: "CHAT WINDOW" },
  { from: L.S5,  big: "GEMINI 3 PRO",             hot: "FREE IN YOUR BROWSER" },
  { from: L.S6,  big: "1M CONTEXT WINDOW",        hot: "DROP A WHOLE CODEBASE IN" },
  { from: L.S7,  big: "NOTEBOOKLM",               hot: "A SECOND BRAIN FROM YOUR FILES" },
  { from: L.S8,  big: "TIED TO YOUR SOURCES",     hot: "AND IT KEEPS THE CONTEXT" },
  /* ⛔ NO `FREE` ON THESE TWO. Flow's free tier is 50 daily credits — metered,
     not open — so the word stays in the audio and never in the frame. */
  { from: L.S9,  big: "GOOGLE FLOW",              hot: "GOOGLE'S AI FILM TOOL" },
  { from: L.S10, big: "TYPE THE SHOT",            hot: "VEO BUILDS THE CAMERA MOVE" },
  { from: L.S11, big: "NO MORE HIGGSFIELD",       hot: "NO MORE SEEDANCE" },
  { from: L.S12, big: "OPAL",                     hot: "DESCRIBE IT IN ONE SENTENCE" },
  { from: L.S13, big: "A WORKING AI TOOL",        hot: "SENT TO ANYONE AS A LINK" },
  { from: L.S14, big: "ANTIGRAVITY",              hot: "A FREE CODING IDE FROM GOOGLE" },
  { from: L.S15, big: "A TEAM OF AGENTS",         hot: "EDITOR · TERMINAL · BROWSER" },
  { from: L.S16, big: "THEY DO THE WORK",         hot: "YOU JUST WATCH" },
  /* ⛔ NOT "20x MORE PRODUCTIVE" — no benchmark is published. The band states
     what the picture states: more finishes, same person. */
  { from: L.S17, big: "FAR MORE GETS FINISHED",   hot: "BY THE SAME ONE PERSON" },
  { from: L.S18, big: "CURSOR · $20/MO",          hot: "THE LAST CHARGE ON THE BILL" },
  { from: L.S19, big: "COMMENT BILL",             hot: "AND I'LL SEND THE FREE LIST" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelBill = makeReel("bill");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
/** the same picture with the music bed 6 dB down — an A/B on the bed only.
    ⛔ NOT a delivered trial cut: an audio-only variant is a PIXEL duplicate. */
export const ReelQuiet = makeReel("bill", "quiet");
