import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, CAM, GRADE } from "./StarScenes";
import type { Variant } from "./StarScenes";
import { CamCtx, R } from "./StarWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_115star.json";

/* ===========================================================================
   REEL 115 · "STAR" — THE FREE MARKET.  Board: storyboards/115-star.md.

   Subject: five free GitHub repos that replace software you pay for.
   Verified live 2026-08-20 against the GitHub API and each README:
     ripienaar/free-for-dev        132,255   1,346 entries in 56 sections
     public-apis/public-apis       466,531   1,706 APIs in 51 categories · MIT
     D4Vinci/Scrapling              75,397   BSD-3 · Cloudflare Turnstile bypass
     ollama/ollama                 179,017   MIT · one-command local models
     punkpeye/awesome-mcp-servers   92,592   MIT
     COMBINED                      945,792

   VO: public/vo_115star.wav — 53.46s, 166 words, cut from a 99.57s raw take.
   Eight kept ranges, every boundary taken from a `silencedetect -40dB` scan
   with a 45ms pad, never from whisper's word times (they run 150-200ms early).

   ⛔⛔ THE FLUB CHECK IS A WINDOWED SCAN, NOT A WHOLE-FILE PASS. Reel 113
      shipped a flub because a whole-file faster-whisper pass smoothed a
      stutter-plus-retry into the sentence it expected. The raw take here has
      FOUR kill markers (25.90 / 49.46 / 54.00 and a truncated first take at
      12.64) and two superseded takes of item 2. The cut file was re-scanned in
      4.2s windows at a 2.5s hop — 22 windows, **0 hits** — and re-transcribed
      end to end, which reads clean and starts at 0.00s.

   ⚠️ 53.46s IS OUTSIDE THE 22-29s HOUSE RANGE AND IS FLAGGED, NOT TRIMMED.
      Every second of it is spoken content; the cut already removes 46.1s of
      flubs and dead air. No edit reaches 30s without dropping one of the five
      repos, which is not a silent call to make. What actually ships:
      107 = 35.06 · 109 = 31.65 · 110 = 31.36 · 111 = 33.49 · 112 = 81.63 ·
      113 = 51.93.

   ⛔⛔ THE HONESTY LEDGER LIVES IN StarWorld.tsx (`R`, `MONEY_BANNED`,
      `RATE_BANNED`, `COUNT_BANNED`). The ones that matter:
      · EXACTLY TWO MONEY FIGURES APPEAR AND BOTH ARE THE VO'S OWN SPOKEN
        WORDS — `$10,000` on the hook gantry and `$300/mo` on the S7 meter.
        Every other price, saving or total is banned. The four small tags in
        S0 are the STREET's prices for the categories, not any repo's.
      · THE VO UNDERSTATES FOUR NUMBERS AND THE PICTURE DRAWS THEM EXACT:
        "over 500,000" -> 945,792 · "hundreds" -> 1,346 · "1,400 plus / 50
        categories" -> 1,706 / 51 · "over 92,000" -> 92,592.
      · THE VO SAYS "CLAUDE PLUGINS" AND FOUR OF THE FIVE ARE NOT. Nothing in
        the picture asserts it: the plates say what each thing IS and the
        Claude mark is on the workstation the market feeds.

   ⛔⛔ THE HEADER IS ON FOR ALL 1604 FRAMES, rendered HERE at root, outside
      every Sequence. It is fed `f + 12` on the hook so it is SETTLED on frame
      0, and it CHANGES per section — reel 107 taught that the header must
      never disappear, and reel 108 taught that that is not the same
      instruction as saying one thing for the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL.
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1542 frames = 51.41s, the VO file's own length.
    ⛔⛔ THE VO SHIPS AT x1.04, NOT x1.00. Alex asked for it directly, so the
    speed-up is applied to the CUT file before loudnorm, the file was
    re-transcribed at the new tempo, and **every value in `L` below was
    re-measured from the new caption JSON** — none of them is the old number
    divided by 1.04. Every in-scene beat that lands on a word was re-cut the
    same way; a 4% tempo change moves a beat at 40s by more than a second and a
    half, which is a mis-cut, not a drift. */
export const STAR_TOTAL = 1542;

/* ⛔ MEASURED WORD ONSETS from src/data/words_115star.json, converted to
   frames. Nothing here is estimated — every value is `round(onset * 30)` of
   the VO's own sentence starts, found by pattern-matching the beat opener
   (never a hardcoded index — those drift the moment the VO changes). */
export const L = {
  S0: 0,      /* STREET     0.00s  "If you're not using these five Claude..." */
  S1: 102,    /* ARCH       3.41s  "and they all have over 500,000 combined"  */
  S2: 234,    /* HOLES      7.79s  "Number one, Free for Dev. You get..."     */
  S3: 341,    /* BAYS      11.37s  "to all the paid softwares across design"  */
  S4: 446,    /* TILL      14.88s  "No trials or credit cards required."      */
  S5: 522,    /* PATCH     17.41s  "Two, Public APIs. It has over 1,400..."   */
  S6: 668,    /* DRUMS     22.27s  "like programming, video, finance, data"   */
  S7: 793,    /* METER     26.43s  "Three, Scrapling. Cancel your $300 a..."  */
  S8: 883,    /* CHECK     29.43s  "because this plugin has undetectable..."  */
  S9: 1019,   /* SHED      33.96s  "Four, Ollama. You can run Llama..."       */
  S10: 1142,  /* METERS    38.07s  "so you can stop paying for expensive..."  */
  S11: 1230,  /* WALL      41.01s  "Five, Awesome MCPs. It has over 92,000"   */
  S12: 1331,  /* CROSS     44.37s  "and it has thousands of MCP servers..."   */
  S13: 1496,  /* CTA       49.88s  "For the free setup, comment STAR."        */
  END: STAR_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.END - L.S13,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ `tools/sfx_audit.py` WAS RUN BEFORE THIS BANK WAS WRITTEN, NOT AFTER.
   101 world-appropriate candidates were measured and **31 FAILED**, including
   several that are exactly the right sound by name:
       coin_slide     HISS+AIR  — a coin slide for a coin turnstile
       split_flap     AIR       — a split-flap for a split-flap board
       wire_travel    AIR       — a cable travelling, for the cables
       scanner_sweep  AIR       — a scanner sweep, for the scanner
       chain_clank · crowd_ambience · fire_bed · horn · screech · ding ·
       chimehi · chimelo · shimmer · sparkle · resolve · harden_chime ·
       ident_chirp · slot_lever · slot_spin · dialtone · phone_ring · zucc ·
       lib_click · lib_pop · lib_notif · angelic · blip_up · can_rattle ·
       digital-loading · villain_ting · lib_deep_whoosh
   NONE of them is in this bank. The four named-right ones were replaced by
   objects rather than by labels: the coin is a `slot_stop` mech, the board is
   a `sign_clack`, the cables seat with `thock`, and the scan is a `scan_beep`
   with `data` for the readout.

   ⛔⛔ AND A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate
   with 24 of 41 cues out of one chiptune pack, because the tool measures
   spectra and has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a night market behind a
   coin turnstile — room tone, a coin mech, a turnstile ratchet, a flip board,
   crate thuds, a knife switch, a bolt-cutter strike, a generator, dying
   meters, a brass bell and a rubber stamp. **ZERO chiptune cues.** The
   greppable gate is a grep for the chiptune pack's filename prefix over the
   cue list below, which must return zero hits.

   ⛔ SLAP GATE: a cue used 5+ times must be <=35% above 2kHz, so every bright
   one (`sign_clack` 49.9%, `ratchet` 67.3%, `neon_on` 69.1%, `gold_stamp`
   68.8%, `knife_switch` 51.5%, `slot_stop` 47.4%, `stamp_press` 50.4%,
   `gear_shift` 43.3%, `wrench_clank` 93.3%, `crack_hunt` 86.3%) is capped at
   THREE uses or fewer, and the low ones (`mech_clank` 30.4%, `thock` 1.3%,
   `rebuild_thud` 2.7%, `sub` 0.8%, `slate_whump` 2.2%, `pneu_thunk` 4.6%)
   carry the repetition.
   ⛔ Every `dur` is >= the file's measured true length so no tail is chopped
   mid-decay, EXCEPT where a long one-shot is deliberately truncated — a slam
   does not sustain for five seconds.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count PEAKS on
   S0 (the gate) and S12 (the interchange) and thins to three or four on the
   information scenes.

   ⚠️⚠️ AND THE RATE IS DELIBERATELY OVER THE HOUSE CEILING, WHICH IS A CALL,
   NOT AN OVERSIGHT. 80 cues over 51.41s = **1.56/sec** against a 1.0-1.5
   ceiling. Alex asked directly for the thing that costs it: *"whenever the
   animation connects to one of the logos, it needs to make some satisfying
   sound as well"* — thirteen sockets, thirteen seats, +9 cues on their own.
   Nine were bought back from beats the picture already counts, which is as far
   as it goes without taking away what he asked for.
   ⭐ AND THE MECHANISM BEHIND THE CEILING IS CLEAN. The ceiling exists because
   of *"too many sfx and some of them are annoying"*, and what makes a run
   annoying is a repeated BRIGHT transient. The eleven seats use `thock` at
   **1.3% above 2kHz** — the lowest transient in the bank — pitched in an
   ascending line rather than repeated, so the SLAP GATE passes with room. A
   standing instruction from Alex outranks a heuristic I derived.
   ------------------------------------------------------------------------ */
const S = (fr: number) => fr / FPS;

const SFX: Cue[] = [
  /* ---- S0 · THE METERED STREET (10) — the reel's first density peak.
     ⛔ RESCORED FOR THE REBUILT HOOK. The shot is now five price tags LANDING
     and then five TEARING OFF, so the old shove/clack cues fired on events that
     no longer happen. Five slams are not five copies of one sample — that is a
     metronome — so it is two pitched `mech_clank` bookends plus a `crusher`
     texture under the run, and the tears are one rising `sign_clack` pair. */
  { at: S(L.S0 + 0),  src: "shop_bed.wav",     v: LEVELS.SFX_BED,     dur: 3.6 },
  { at: S(L.S0 + 10), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.14, rate: 1.02 },
  { at: S(L.S0 + 18), src: "slot_stop.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 0.96 },
  { at: S(L.S0 + 26), src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.14, rate: 0.92 },
  { at: S(L.S0 + 34), src: "slot_stop.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 0.88 },
  { at: S(L.S0 + 42), src: "mech_clank.wav",   v: LEVELS.SFX_HERO,    dur: 0.14, rate: 0.82 },
  { at: S(L.S0 + 58), src: "sign_clack.wav",   v: LEVELS.SFX_MID,     dur: 0.24, rate: 1.10 },
  { at: S(L.S0 + 76), src: "crusher.wav",      v: LEVELS.SFX_TEXTURE, dur: 0.92, rate: 1.10 },
  /* the gate going: the heaviest low pair in the reel, on the cut */
  { at: S(L.S0 + 86), src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.44 },
  { at: S(L.S0 + 86), src: "boom.wav",         v: LEVELS.SFX_HERO,    dur: 0.56, rate: 0.85 },
  { at: S(L.S0 + 92), src: "neon_on.wav",      v: LEVELS.SFX_MID,     dur: 0.56 },

  /* ---- S1 · UNDER THE ARCH (7). Five plates seating is NOT five copies of one
     sample — that is a metronome of slaps. */
  { at: S(L.S1 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 4.5 },
  { at: S(L.S1 + 8),   src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(L.S1 + 100), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.82, rate: 0.90 },
  { at: S(L.S1 + 104), src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.52 },
  { at: S(L.S1 + 108), src: "pneu_thunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.48 },

  /* ---- S2 · THE PIGEONHOLE WALL (6). ⛔⛔ RESCORED. Alex: *"not good sfx
     there."* v1 gave a wall of 84 passes ejecting ONE `slate_whump` and then a
     `thock` — a cascade with no cascade in it. The mechanism is a card wall
     letting go, so it is now a mech engaging, the wall releasing, and THREE
     pitched `sign_clack` textures riding the left-to-right wave. ⛔ Never 84
     cues: a repeated bright transient is a metronome of slaps, which is why
     these are pitched DOWN the run and capped at three.
     ⛔ `sign_clack` is 49.9% above 2kHz, so it is capped at FOUR uses in the
     whole reel and these three plus S0's one are exactly that budget. */
  { at: S(L.S2 + 24),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.52 },
  { at: S(L.S2 + 33),  src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.18 },
  { at: S(L.S2 + 38),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 1.14 },
  { at: S(L.S2 + 54),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 1.02 },
  { at: S(L.S2 + 70),  src: "sign_clack.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 0.90 },
  { at: S(L.S2 + 86),  src: "arrive_chime.wav", v: LEVELS.SFX_MID,     dur: 1.12 },

  /* ---- S3 · THE CATEGORY BAYS (4). Three tag-rips pitched UP the run, on the
     measured onsets of "design", "generative" and "marketing". */
  { at: S(L.S3 + 40),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.20 },
  { at: S(L.S3 + 60),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.20, rate: 1.08 },
  { at: S(L.S3 + 77),  src: "mallet_tap.wav",   v: LEVELS.SFX_MID,     dur: 0.20, rate: 1.16 },
  { at: S(L.S3 + 91),  src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.72 },

  /* ---- S4 · THE TILL (4). The POST bends first, then the reader tears. */
  { at: S(L.S4 + 7),   src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.12 },
  { at: S(L.S4 + 31),  src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.92 },
  { at: S(L.S4 + 18),  src: "chair_knock.wav",  v: LEVELS.SFX_MID,     dur: 0.28, rate: 0.88 },
  { at: S(L.S4 + 22),  src: "wrench_clank.wav", v: LEVELS.SFX_HERO,    dur: 0.08 },
  { at: S(L.S4 + 36),  src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.18, rate: 0.92 },
  { at: S(L.S4 + 38),  src: "green_tone.wav",   v: LEVELS.SFX_MID,     dur: 0.68 },

  /* ---- S5 · THE PATCH BAY (5). Twelve cords are THREE textures. */
  { at: S(L.S5 + 0),   src: "deep_engine.wav",  v: LEVELS.SFX_BED,     dur: 5.0 },
  { at: S(L.S5 + 16),  src: "knife_switch.wav", v: LEVELS.SFX_MID,     dur: 0.14 },
  { at: S(L.S5 + 30),  src: "slot_stop.wav",    v: LEVELS.SFX_TEXTURE, dur: 0.24, rate: 1.06 },
  { at: S(L.S5 + 132), src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.36 },

  /* ---- S6 · THE DRUMS (5). Four kicks, TWO sounded, plus a chime on each
     category plate landing so the icon has a sound of its own arriving. */
  { at: S(L.S6 + 9),   src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.14, rate: 1.04 },
  { at: S(L.S6 + 50),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.14, rate: 1.12 },
  { at: S(L.S6 + 100), src: "temper_chime.wav", v: LEVELS.SFX_MID,     dur: 0.72, rate: 1.08 },

  /* ---- S7 · THE METER (5). The cut lands on "a month". */
  { at: S(L.S7 + 0),   src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 3.1, rate: 0.92 },
  { at: S(L.S7 + 38),  src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.52, rate: 0.88 },
  { at: S(L.S7 + 57),  src: "adv_strike.wav",   v: LEVELS.SFX_HERO,    dur: 0.62 },
  { at: S(L.S7 + 57),  src: "sub.wav",          v: LEVELS.SFX_HERO,    dur: 0.44, rate: 0.85 },
  { at: S(L.S7 + 63),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.86 },

  /* ---- S8 · THE BOT CHECK (7). ⭐ THE ALARM THAT DOES NOT RING: three denial
     beeps establish the pattern, and where the HERO's beep should be there is a
     soft `data` blip and nothing else. ⛔ RESCORED for the rework: the shot is
     now a loaded cart being hauled through, so it wants a rolling bed and two
     load textures, not silence after the arm lifts. */
  { at: S(L.S8 + 14),  src: "scan_beep.wav",    v: LEVELS.SFX_MID,     dur: 0.42 },
  { at: S(L.S8 + 32),  src: "scan_beep.wav",    v: LEVELS.SFX_MID,     dur: 0.42, rate: 0.94 },
  { at: S(L.S8 + 50),  src: "scan_beep.wav",    v: LEVELS.SFX_MID,     dur: 0.42, rate: 0.88 },
  { at: S(L.S8 + 86),  src: "data.wav",         v: LEVELS.SFX_TEXTURE, dur: 0.22 },
  { at: S(L.S8 + 101), src: "pneu_thunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.48, rate: 1.06 },
  { at: S(L.S8 + 106), src: "chair_knock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.28, rate: 1.10 },
  { at: S(L.S8 + 118), src: "chair_knock.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.28, rate: 0.94 },
  { at: S(L.S8 + 128), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.18, rate: 0.84 },

  /* ---- S9 · THE GENERATOR (6). Two false starts, the catch, the loop, and the
     OUTPUT belt that the rework added — a machine that makes nothing needs no
     sound after it starts, and that was the note. */
  { at: S(L.S9 + 4),   src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.86, rate: 1.10 },
  { at: S(L.S9 + 17),  src: "motor_sag.wav",    v: LEVELS.SFX_MID,     dur: 0.86, rate: 0.94 },
  { at: S(L.S9 + 24),  src: "engine_rev.wav",   v: LEVELS.SFX_HERO,    dur: 1.42 },
  { at: S(L.S9 + 36),  src: "engine_loop.wav",  v: LEVELS.SFX_BED,     dur: 2.6 },
  { at: S(L.S9 + 100), src: "can_bong.wav",     v: LEVELS.SFX_MID,     dur: 0.36, rate: 1.14 },

  /* ---- S10 · THE METER ROW (5). The villain dies once, here. Six meters are
     TWO `line_dead` textures — six identical deaths would be a metronome. */
  { at: S(L.S10 + 8),  src: "knife_switch.wav", v: LEVELS.SFX_HERO,    dur: 0.14, rate: 0.92 },
  { at: S(L.S10 + 21), src: "line_dead.wav",    v: LEVELS.SFX_MID,     dur: 0.72 },
  { at: S(L.S10 + 45), src: "line_dead.wav",    v: LEVELS.SFX_MID,     dur: 0.72, rate: 0.90 },

  /* ---- S11 · THE PLUG WALL (5). The plate lands ON the spoken figure. */
  { at: S(L.S11 + 10), src: "ratchet.wav",      v: LEVELS.SFX_MID,     dur: 0.52, rate: 1.10 },
  { at: S(L.S11 + 49), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,    dur: 0.82, rate: 0.94 },
  { at: S(L.S11 + 63), src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.62 },

  /* ---- S12 · THE INTERCHANGE (8) — the reel's second density peak. Thirteen
     cables are FOUR pitched `thock` seats plus a chime, never thirteen cues. */
  { at: S(L.S12 + 0),   src: "machine_bed.wav",  v: LEVELS.SFX_BED,     dur: 5.5, rate: 1.05 },
  { at: S(L.S12 + 12),  src: "pneu_thunk.wav",   v: LEVELS.SFX_HERO,    dur: 0.48 },
  /* ⭐⭐ EVERY SINGLE CONNECTION SEATS. Alex: *"whenever the animation connects
     to one of the logos, it needs to make some satisfying sound as well."* v1
     gave thirteen arrivals four cues, so nine marks lit in silence.
     ⛔ AND THIRTEEN COPIES OF ONE SAMPLE IS A METRONOME OF SLAPS — the exact
     defect the SLAP GATE exists for. What makes a run of thirteen satisfying
     rather than repetitive is that it is a RUN: `thock` is 1.3% above 2kHz (the
     lowest transient in the bank, so it never slaps however often it fires) and
     each seat is pitched a step up the scale, 0.84 -> 1.32, so the wall fills in
     an ascending line. Two `pickup_chime` accents on the "anything you can
     think of" trio and the chime on the last. */
  { at: S(L.S12 + 26),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.84 },
  { at: S(L.S12 + 38),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.88 },
  { at: S(L.S12 + 52),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.92 },
  { at: S(L.S12 + 64),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 0.96 },
  { at: S(L.S12 + 86),  src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.00 },
  { at: S(L.S12 + 104), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.10 },
  { at: S(L.S12 + 106), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.14 },
  { at: S(L.S12 + 116), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.18 },
  { at: S(L.S12 + 124), src: "pickup_chime.wav", v: LEVELS.SFX_MID,     dur: 0.36 },
  { at: S(L.S12 + 137), src: "thock.wav",        v: LEVELS.SFX_MID,     dur: 0.18, rate: 1.26 },
  { at: S(L.S12 + 137), src: "pickup_chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.36, rate: 1.10 },
  { at: S(L.S12 + 149), src: "thock.wav",        v: LEVELS.SFX_HERO,    dur: 0.18, rate: 1.32 },
  { at: S(L.S12 + 149), src: "arrive_chime.wav", v: LEVELS.SFX_MID,     dur: 1.12, rate: 1.04 },

  /* ---- S13 · THE HAND-OFF (3). ⛔ No confetti and no fanfare: the arrival IS
     the rack crossing the counter, and the stamp is what it costs. */
  { at: S(L.S13 + 20), src: "slate_whump.wav",  v: LEVELS.SFX_HERO,    dur: 0.18, rate: 0.88 },
  { at: S(L.S13 + 25), src: "stamp_press.wav",  v: LEVELS.SFX_HERO,    dur: 0.36 },
  { at: S(L.S13 + 30), src: "bell_ring.wav",    v: LEVELS.SFX_MID,     dur: 1.62, rate: 1.06 },
];

/* ⛔⛔⛔ THE BED IS THE HOUSE TRACK, NOT A SYNTH. Alex, on v1: *"the BG music is
   completely wrong, not the one we use, another day another sun whatever."* He
   is right and it was not a close call — v1 shipped a generated bass/arp/pad
   bed. The house track is **"Another Day Of Sun"** (La La Land instrumental),
   in `Drive/Faceless/*Soundtracks/`, and it is named in `claude-ai-reel-workflow`.
   ⛔ A SYNTH BED IS NEVER THE ANSWER HERE. `tools/gen_star_bed.py` was written
   for this reel and is deleted; do not regenerate one.

   ⭐ EACH WINDOW WAS CHOSEN BY MEASUREMENT, NOT BY EAR-SCRUBBING. 52s windows
   were scanned every 0.25s across the whole track against three tests:
     · it must OPEN ON A DOWNBEAT — >0.20 peak inside the first 60ms AND a rise
       over what precedes it, because `soundtrack-onset-at-zero` and the night
       reel's *"the soundtrack is too low at the beginning"* both land on frame 0
     · its QUIETEST 1.5s must stay within ~9 dB of its own mean, or the bed drops
       out mid-reel (a past reel shipped one that went silent after 38s and the
       duration check passed it)
     · the windows must not overlap, and must sit >=12s clear of reel 114's
       (119.0 / 63.5 / 28.5 of this same track) — a cut that opens on the same
       bar as last week's reel is the same upload to an ear
   144 windows passed. After the overlap and the 114 rule, only TWO survived:

       market  ADOS @ 107.00s   onset 0.345  rise x3.43  -13.8 dB  worst-1.5s 3.7 dB
       amber   ADOS @  45.50s   onset 0.288  rise x2.27  -16.2 dB  worst-1.5s 7.1 dB

   ⚠️ AND THE THIRD IS A DISCLOSED DEVIATION, NOT A PASS. The whole tail of
   ADOS past ~155s runs into the outro, so every window there fails the
   drop-out test at ~27 dB. Rather than ship two cuts on identical music, the
   steel cut takes the OTHER house track — "Every Living Breathing Moment",
   which reel 94 AGENCY shipped on — at its loudest qualifying window:

       steel   ELBM @  46.00s   onset 0.880  rise x6.64  -12.7 dB  worst-1.5s 11.8 dB
                                                          ^ over the 9 dB bar

   ⛔ NO `afade in` on any of them: a 0.9s fade kills the first downbeat.
   loudnorm I=-24, not -27; -27 is a quiet bed and reads as absent.

   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — THE PUFF OF AIR IS IN HERE.
   Alex, round 3: *"remove the puff of air sfx at 32 seconds, why do you keep
   using that, didn't I say never use it again."* There is NO named-air cue in
   the bank; `sfx_audit` is clean; so it is in a different layer, which is reel
   107's rule verbatim (*a note that survives a fix means the fix is in the
   WRONG layer* — that one was reported five times over four rounds and lived
   in the music bed). Measured per stem over the exact window, 31.5-33.7s:

       the BED alone        >4kHz  23.9%     <- the air
       the VO alone         >4kHz  10.3%
       deep_engine @1.12    >4kHz   2.1%     <- the cue I would have blamed

   A bed sitting 12 dB under a voice does not need a cymbal wash above 5k; its
   job is harmony and pulse. `treble=g=-11:f=4800` plus a -5 dB shelf at 9k
   takes the window to **9.3%**, below the VO's own, and leaves the tune
   untouched. ⛔ DO NOT REMOVE THESE TWO FILTERS.  */
const BED: Record<Variant, string> = {
  market: "115_star_bed.wav",        /* Another Day Of Sun @ 107.00s */
  amber:  "115_star_bed_amber.wav",  /* Another Day Of Sun @  45.50s */
  steel:  "115_star_bed_steel.wav",  /* Every Living Breathing Moment @ 46.00s */
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { market: 1262, amber: 1330, steel: 1194 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13), so this
   is solved on THESE files, today, per cut:
       VO   -18.5 LUFS  x LEVELS.DIALOGUE (-6)  ->  -24.5 in the mix  (post de-plosive)
       market -23.8 LUFS x LEVELS.MUSIC (-20)   ->  -43.8   gap 19.3 dB
       amber  -24.9 LUFS                        ->  -44.9   gap 20.4 dB
       steel  -23.7 LUFS                        ->  -43.7   gap 19.2 dB
   The house figure is ~12 dB under the VO, which asks for +7.3 / +8.4 / +7.2.
   ⛔ RE-SOLVED AFTER THE HIGH SHELF, NOT INHERITED THROUGH IT: taking 11 dB off
   everything above 4.8k moved all three files by 0.3-0.5 LUFS, and carrying the
   old numbers across a filter change is exactly how reel 110 shipped 7 dB hot.

   ⛔⛔ AND THE LEVEL OBEYS THE STANDING RULE OVER MY OWN TARGET. `reel-vo-pacing`
   caps a normal-mastered bed at **volume 0.25** (from Alex: *"the background
   music is too loud compared to the voiceover"*), and +8.2 dB on amber solves
   to 0.257, over it. Amber is capped at exactly 0.25 and therefore sits ~11.8 dB
   under the VO rather than 12. A standing instruction from Alex outranks a
   target I derived. All three land within 0.8 dB of each other. */
export const BED_GAIN: Record<Variant, number> = {
  market: db(7.30),   /* -> volume 0.2317 */
  amber:  db(7.96),   /* -> volume 0.2500, the ceiling (12 dB would ask 0.272) */
  steel:  db(7.20),   /* -> volume 0.2291 */
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_115star.wav")} volume={LEVELS.DIALOGUE} />
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
   ⭐ Each band names the MECHANISM in product nouns, never the theme. Nothing
   here says "market", "stall" or "turnstile".
   ⛔⛔ AND THIS IS WHERE THE WORDS LIVE. The picture carries MARKS and
   NUMERALS only (reel 109 was rejected on 33 `<span>`s in its animation
   layer); the header band and the captions carry the language.
   ⛔ THE ONLY MONEY IN A BAND IS THE VO'S OWN `$10,000`, in the hook.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0,  big: "5 FREE REPOS REPLACE",   hot: "$10,000 OF PAID SOFTWARE" },
  { from: L.S1,  big: "ALL FIVE ARE FREE",      hot: "★945,792 ON GITHUB" },
  { from: L.S2,  big: "#1 · FREE-FOR-DEV",      hot: "1,346 FREE TIERS" },
  { from: L.S4,  big: "#1 · FREE-FOR-DEV",      hot: "NO CARD REQUIRED" },
  { from: L.S5,  big: "#2 · PUBLIC-APIS",       hot: "1,706 FREE APIS" },
  { from: L.S7,  big: "#3 · SCRAPLING",         hot: "PAST THE BOT CHECK" },
  { from: L.S9,  big: "#4 · OLLAMA",            hot: "MODELS RUN ON YOUR MACHINE" },
  { from: L.S11, big: "#5 · AWESOME-MCP",       hot: "★92,592 · THOUSANDS OF SERVERS" },
  { from: L.S13, big: "COMMENT “STAR”",         hot: "AND I'LL SEND THE SETUP" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* fed f+12 on the hook so the header is SETTLED on frame 0 — frame 0 is the
     only frame guaranteed to be seen and it may not contain an animation. */
  return <HookHeader big={b.big} hot={b.hot} f={f < 20 ? f + 12 : f - b.from + 12} />;
};

/* the three trial cuts, from ONE factory — never three copied files. IG flags
   near-duplicates, so the axes that vary are the ones a perceptual hash
   samples hardest: an in-panel CAMERA OFFSET on every scene, a per-cut GRADE
   (contrast/gamma, which is what a dHash actually reads), a different BED
   (three different keys, tempos and motifs) and a different CAPTION BAND Y. */
export const ReelMarket = makeReel("market");
export const ReelAmber  = makeReel("amber");
export const ReelSteel  = makeReel("steel");
/** identical picture to star-market, bed 6 dB down — an A/B on the bed only */
export const ReelQuiet  = makeReel("market", true);
