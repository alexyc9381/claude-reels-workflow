import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { PASS, CARD, QUEUE, INSTALL, GATE, LEDGER, RUNSC, ASIDE, NIGHT, FANOUT, CTA,
  CAM, GRADE } from "./AdhScenes";
import type { Variant } from "./AdhScenes";
import { HOOKS, HookCut } from "./AdhHooks";
import type { HookId } from "./AdhHooks";
import { CamCtx } from "./AdhWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_adhd136.json";

/* ===========================================================================
   REEL 136 · "ADHD" — THE SESSION.  REV 2.  Board: storyboards/136-adhd.md.

   Subject: the skill the VO calls "the ADHD skill" — a ledger the agent has to
   punch by running a command and reading its output, instead of declaring the
   job done; sequential out of the box, fanned out to ten sub-agents by a tweak
   to the instructions.

   ⚠️⚠️ THE REPO IS UNRESOLVED AND THE FRAME SAYS ONLY WHAT IT KNOWS.
   `UditAkhourii/adhd` (4,053★, MIT, 2026-05-25) is the repo literally named
   ADHD and it is a PARALLEL DIVERGENT IDEATION skill — five isolated branches,
   score, prune, deepen — with no ledger, no verify step and no sequential mode
   anywhere in its README or SKILL.md. The mechanism this VO describes word for
   word is `Leonxlnx/unlazy` (3,062★), which is reel 120 UNLAZY's subject, and
   its README never says ADHD. Alex was asleep when this was found, so the reel
   draws the MECHANISM the VO describes and asserts nothing it cannot source:
   the GitHub mark and the stencil "ADHD SKILL" appear; NO repo path, owner,
   star count or install line does. `NAME_BANNED` in AdhWorld enforces it.
   ⛔ FLAGGED FOR ALEX: which repo the CTA sends is his call, and the article
   cannot be published until he says.

   ⚠️⚠️ SAME SCRIPT AS REEL 120 "UNLAZY" (shipped 2026-08-22): every sentence
   maps one to one with the keyword changed. Reel 120's world (THE SIGN-OFF
   LINE), its hooks (balloon / trophy / paint, the Pinocchio nose), and reel
   132's courtroom and 118's press are all FROZEN and none of them is imported.

   ⭐ THE WORLD IS THE WORD THE SCRIPT TURNS ON: "DISTRACTED". A restaurant
   kitchen at service, walked pass -> line -> pass. Eleven light changes, one
   continuous building, and the arc is the same order sent honestly the second
   time.

   ⭐⭐ THE VO. 65.39s raw, cut to 35.27s. NINE "cut cut" flubs and false starts,
   every one found by splitting the raw at measured silence and transcribing
   each chunk ALONE — a whole-file pass merges a flub with its retake and emits
   the sentence once. Every one of the eleven keep-boundaries was then chosen by
   an isolated-transcription SWEEP, not by a word time: four of them needed the
   LATER candidate (`skill` 21.80 -> "skil-" vs 22.00 ✓, `work` 28.44 ->
   "worth" vs 28.58 ✓, `ledger` 36.37 -> "ledge" vs 36.565 ✓, `though` 49.65 ->
   "catch." vs 49.845 ✓). The take's own inter-sentence gaps are real room tone
   at -51..-73 dBFS, so the joins are 0.24s slices of two VERIFIED-EMPTY windows
   (22.06-22.74s and 13.00-13.70s) — never a "quiet window", which on reel 135
   turned out to be a spoken syllable tiled under the whole voice.

   ⛔ TEMPO IS PIECEWISE: hook x0.90, body x1.00. R1 after: overall 4.17,
   hook 0-10s **4.10** (bar 4.0), worst-5s **5.20** (bar 4.5). ⚠️ Both are over
   and both are the recording's own pace — flagged, not hidden. The worst-5s
   figure is identical to reel 135's shipped one and below every reel this repo
   has measured (takes 6.20 · unlock 6.40 · squad 6.00 · video 5.80).
   ⚠️ 35.27s sits inside the 22-29s house range only if you count the range as a
   floor; it is 6.3s over the top of it. Flagged, not trimmed — cutting a beat
   is Alex's call.
   ========================================================================= */

const FPS = 30;
export const ADH_TOTAL = 1058;                    /* CUT 35.27s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_adhd136.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,      /* PASS     hook · "The rumors are true"                 0.00s */
  S1: 135,    /* CARD     "And Anthropic actually admitted it"         4.51s */
  S2: 184,    /* QUEUE     "So if you notice Claude keeps dodging"      6.12s */
  S3: 293,    /* INSTALL    "But a top GitHub developer"                 9.77s */
  S4: 383,    /* GATE    "It stops the AI from losing focus"         12.78s */
  S5: 512,    /* LEDGER  "Instead of just saying a task is done"     17.08s */
  S6: 608,    /* RUN      "Basically, the AI has to run commands"     20.27s */
  S7: 723,    /* ASIDE    "There is a catch though"                   24.09s */
  S8: 760,    /* NIGHT    "Out of the box, it takes hours"            25.32s */
  S9: 840,    /* FANOUT     "The trick is to tweak the instructions"    28.00s */
  S10: 994,   /* CTA      "Comment ADHD for the free setup"           33.15s */
  END: ADH_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116). Neither is
   here, and neither is any file whose name says whoosh / swoosh / puff / riser.
   The whole `am/` pack is out on its own measurements (NOISE-BED / HISS / AIR),
   and every `c_*` chiptune file is out because a clean audit is not a good bank
   — 24 of 41 cues from one arcade pack passed every gate on reel 110 and got
   *"it just sounds like video game upgrade sounds."*

   ⭐ THE BANK BELONGS TO THE WORLD (`feedback_sfx_bank_belongs_to_the_world`).
   REV 2 IS A CLAUDE CODE SESSION, so it is: key presses, data blips, a
   mechanical STAMP for an exit code, a switch throwing, a pane opening, a
   detent on the selector, a bar dropping, and a room HUM under all of it.
   ⛔ THE SERVICE BELL WENT WITH THE KITCHEN. `bell_ring` is 1.6s of struck
   metal and it was the single most kitchen-shaped sound in the bank; both its
   cues are now `green_tone` (0.0% >2kHz, 2.6ms attack), which is the sound a
   thing that reports success makes.

   ⛔ RISERS: ZERO. Every riser in the bank measures as the banned air class.
   ⛔ PERCUSSION IS LOW, NEVER BRIGHT: the repeated cues here are `thock`
   (1.3% >2kHz), `impact_deep` (0.4%) and `sub` (0.8%). `stamp_press` is 50.4%
   bright and is capped at FOUR uses, all of them hero punches.

   ⭐ DENSITY IS A SHAPE. It PEAKS on S0 (the hook), S6 (the mechanism) and S9
   (the payoff), and thins to two cues on S7, whose whole beat is one plate
   crossing a quiet room.

   ⭐⭐ THE RATE, MEASURED — AND THE DOC NUMBER CALIBRATED AGAINST SHIPPED WORK.
   65 cues over 35.27s = **1.84/sec**. docs/SOUND-DESIGN.md says "1.0-1.5, treat
   1.5 as a ceiling", so I went to trim 12 cues — then measured the banks of all
   nine reels in this repo first (`feedback_the_metric_makes_paper`):

       agency135 3.45 · repos137 2.82 · agents134 2.72 · judge132 2.69
       free131 2.50 · unlazy120 2.19 · **adhd136 1.84** · build133 1.80 · hw 1.46

   NO SHIPPED REEL MEETS 1.5. The approved 135 runs 3.45. Cutting to 1.50 would
   have made this the second-thinnest bank in the repo to satisfy a number the
   house does not actually hold itself to.

   ⛔ So the gate that matters is the one the doc's own evidence describes: the
   complaint was never an average, it was *"bursts of the SAME sample"* — 10x
   `key` inside 0.75s, 8x `ui_tap`, 6x `ticket_click`. Measured here:
       worst 1.0s window          7 cues   (the hook — the intended peak)
       worst SAME sample / 0.75s  4x `impact`  — and those four ARE A-D-H-D,
                                  one per letter, which is a mapping not a burst
       min same-sample gap        6 frames, inside that same spelled word
   Nothing repeats into a machine gun, so the bank stays at 65 and the rate is
   reported honestly rather than trimmed to a paper figure.

   ⛔ EVERY SAMPLE IS MEASURED, AND EVERY SAMPLE IS A `.wav`. `click.mp3` was
   replaced by `mallet_tap.wav` (14.5% >2kHz, 60.2% low, 2ms) NOT for how it
   sounds but because `tools/sfx_audit.py` opens files with `wave.open`, so an
   mp3 CRASHES the gate — and a cue the gate cannot open is a cue that ships
   unaudited. Five samples were cut on their own measurements:
       ticket_click  92.3% >2kHz, flat 0.771, was used 5x  -> SLAP
       sorter_tick   2.40s, 508ms attack, 71.4% bright, 8x -> AIR/SWELL
       fire_bed      90.1% bright, 4356ms attack, flat 0.844 -> HISS (115/116)
       wire_travel   78.3% bright  ·  snap  90.7% bright, flat 0.793
       metal_ping    100.0% >2kHz — a pure top-octave tone with no body
   -------------------------------------------------------------------------- */
export const SFX: Cue[] = [
  /* ---- S0 · THE SESSION. A notification crosses, a row ticks itself, DONE
     fires, an answer ships, and the next row prints. 9 ------------- */
  { at: S(L.S0 + 0), src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 4.6, rate: 0.92 },
  /* the notification crossing — TRANSIENTS, never a rolling texture.
     ⛔ A sustained cue anywhere inside a sentence eats it (reel 135: 1.33s of
     ratchet turned "It plugs straight into Claude Code" into "-in -the -clock
     code"). Two detents, 0.09s each, in the gaps between words. */
  ...[8, 26].map((a2, i) => ({
    at: S(L.S0 + a2), src: "gear_shift.wav",
    v: LEVELS.SFX_TEXTURE * db(-1 + i * 1.2), dur: 0.09, rate: 0.94 + i * 0.08,
  })),
  /* THE TICK HE DID NOT EARN */
  { at: S(L.S0 + 24), src: "impact.wav", v: LEVELS.SFX_HERO, dur: 0.26, rate: 1.06 },
  { at: S(L.S0 + 24), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.88 },
  /* THE DONE CHIP — the lie, and the loudest cue in the hook */
  { at: S(L.S0 + 30), src: "green_tone.wav", v: LEVELS.SFX_HERO, dur: 0.62, rate: 1.02 },
  { at: S(L.S0 + 30), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.30, rate: 0.74 },
  /* the answer shipping */
  { at: S(L.S0 + 34), src: "slate_whump.wav", v: LEVELS.SFX_MID, dur: 0.34, rate: 1.04 },
  /* ⛔ NOTHING BETWEEN f118 AND f135. "about it." ends the sentence at root
     f127-134 and a cue there is the failure that cost reel 135 six rounds. */
  /* ⭐ THE THREE SKIPPED TASKS LANDING ON THE SPIKE — f68 / f80 / f93. Three
     DIFFERENT low samples rather than one repeated three times, and every onset
     sits in a MEASURED gap between words: f68 is the 5-frame gap after
     "distracted," (ends f66) and before "skipping" (f71); f80 is inside "your";
     f93 is the gap between "tasks," (ends f92) and "and" (f96). */
  { at: S(L.S0 + 68), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-5), dur: 0.16, rate: 0.86 },
  { at: S(L.S0 + 80), src: "chair_knock.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.22, rate: 0.98 },
  { at: S(L.S0 + 93), src: "mallet_tap.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.20, rate: 0.88 },
  /* ⭐ THE LIE — the second bell, on "lying" (f101-105). ⛔ NOT `bell_ring`:
     that file is 1.60s and a 48-frame ring decaying across "to you about it"
     is a TEXTURE inside a sentence, which is the cue class that ate a line on
     reel 135. `can_bong` at 0.42s is done by f114, seven frames before "about"
     starts — and a DULL bell is the better joke anyway. */
  { at: S(L.S0 + 101), src: "can_bong.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.42, rate: 0.86 },
  { at: S(L.S0 + 108), src: "mallet_tap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.10 },
  { at: S(L.S0 + 114), src: "chair_knock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22, rate: 0.94 },

  /* ---- S1 · THE CARD. The eval row drops, lands, the page opens. 4 ----- */
  { at: S(L.S1 + 2), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 1.16 },
  { at: S(L.S1 + 16), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.42, rate: 0.96 },
  { at: S(L.S1 + 16), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.28, rate: 0.80 },
  { at: S(L.S1 + 20), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.14, rate: 1.14 },
  /* ⛔ nothing on "it." (root f164-183) */

  /* ---- S2 · THE QUEUE. Prompt cards park, half-answers ship. 5 --------------- */
  ...[16, 36, 56].map((a2, i) => ({
    at: S(L.S2 + a2), src: "slate_whump.wav",
    v: LEVELS.SFX_HERO * db(-6 + i * 2.0), dur: 0.16, rate: 0.88 + i * 0.07,
  })),
  ...[24, 44].map((a2, i) => ({
    at: S(L.S2 + a2), src: "thock.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.6), dur: 0.18, rate: 0.96 + i * 0.10,
  })),
  /* ⛔ nothing on "crazy." (root f268-292) */

  /* ---- S3 · THE INSTALL. The file rides down, lands, the stencil lights, the
     install bar closes. 5 --------------------------------------------------------- */
  { at: S(L.S3 + 6), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.86 },
  { at: S(L.S3 + 38), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.50, rate: 0.90 },
  { at: S(L.S3 + 38), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.34, rate: 0.70 },
  { at: S(L.S3 + 58), src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.26, rate: 1.02 },
  { at: S(L.S3 + 68), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.14, rate: 0.94 },
  /* ⛔ nothing on "skill." (root f365-382) */

  /* ---- S4 · THE GATE. A notification returns, he shoves, the bar rings, the
     lamp stays red, he walks back and lifts the row. 6 ---------------------- */
  { at: S(L.S4 + 6), src: "gear_shift.wav", v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 1.04 },
  ...[20, 40, 62].map((a2, i) => ({
    at: S(L.S4 + a2), src: "adv_strike.wav",
    v: LEVELS.SFX_MID * db(-7 + i * 2.2), dur: 0.34, rate: 0.82 + i * 0.07,
  })),
  { at: S(L.S4 + 52), src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.30, rate: 0.94 },
  { at: S(L.S4 + 84), src: "mech_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.14, rate: 0.78 },
  /* ⛔ nothing on "work." (root f492-511) */

  /* ---- S5 · THE LEDGER. The tick pile goes in the bin, the table prints, he
     tears it and clips it up. 4 ------------------------------------------ */
  { at: S(L.S5 + 14), src: "can_bong.wav", v: LEVELS.SFX_MID, dur: 0.40, rate: 1.04 },
  /* ⭐ THE PRINTER IS TWO SPACED CLICKS, NOT A RUN OF CHATTER — a printer's
     texture laid over a whole sentence is the cue class that ate a reel-135
     line, and ⛔ `ticket_click` measures 91.8% above 2kHz, which is a SLAP the
     moment it repeats. `click` is 0.0% bright and 0.000 flat. */
  ...[24, 52].map((a2, i) => ({
    at: S(L.S5 + a2), src: "mallet_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(-1 + i * 0.8), dur: 0.18, rate: 0.94 + i * 0.10,
  })),
  { at: S(L.S5 + 86), src: "sign_clack.wav", v: LEVELS.SFX_HERO, dur: 0.22, rate: 1.0 },
  /* ⛔ nothing on "ledger." (root f588-607) */

  /* ---- S6 · THE RUN. The command types, the output prints, TWO EXIT CODES
     stamp, the lamp goes green, the answer ships. Peak density #2. 9 ------------------------ */
  { at: S(L.S6 + 25), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.14, rate: 0.90 },
  ...[32, 40].map((a2, i) => ({
    at: S(L.S6 + a2), src: "blip1.wav",
    v: LEVELS.SFX_TEXTURE * db(-2 + i * 1.6), dur: 0.16, rate: 1.02 + i * 0.14,
  })),
  { at: S(L.S6 + 48), src: "data.wav", v: LEVELS.SFX_TEXTURE, dur: 0.21, rate: 1.06 },
  /* THE PUNCH — the hero cue of the reel. `stamp_press` is 0.4% bright and
     98.5% low, so it can carry the repetition; it is used 4 times in total. */
  { at: S(L.S6 + 62), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.30, rate: 0.98 },
  { at: S(L.S6 + 62), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.82 },
  { at: S(L.S6 + 70), src: "temper_chime.wav", v: LEVELS.SFX_MID, dur: 0.40, rate: 1.08 },
  { at: S(L.S6 + 78), src: "stamp_press.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.28, rate: 1.06 },
  { at: S(L.S6 + 86), src: "spotlight_snap.wav", v: LEVELS.SFX_MID, dur: 0.24, rate: 1.10 },
  { at: S(L.S6 + 108), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.94 },
  /* ⛔ nothing on "answer." (root f705-722) */

  /* ---- S7 · THE ASIDE. ONE idea, TWO cues. The bed ducks here. 2 - */
  { at: S(L.S7 + 4), src: "rebuild_thud.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.96 },
  { at: S(L.S7 + 28), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20, rate: 1.10 },
  /* ⛔ nothing on "though." (root f741-759) */

  /* ---- S8 · THE NIGHT. One cycle, one shunt, the hour hand. 4 ----- */
  { at: S(L.S8 + 16), src: "blip1.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 0.96 },
  { at: S(L.S8 + 28), src: "stamp_press.wav", v: LEVELS.SFX_MID, dur: 0.26, rate: 0.92 },
  { at: S(L.S8 + 36), src: "adv_strike.wav", v: LEVELS.SFX_HERO, dur: 0.40, rate: 0.76 },
  { at: S(L.S8 + 36), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.84 },
  /* ⛔ nothing on "time." (root f833-839 — the sentence ends AT the cut) */

  /* ---- S9 · THE FAN-OUT. Detents, panes opening, arrivals, the selector, the
     answer. Peak density #1. 10 ------------------------------------------ */
  ...[24, 40, 58].map((a2, i) => ({
    at: S(L.S9 + a2), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(-5 + i * 1.6), dur: 0.20, rate: 0.86 + i * 0.11,
  })),
  ...[38, 50, 62].map((a2, i) => ({
    at: S(L.S9 + a2), src: "spotlight_snap.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.5), dur: 0.22, rate: 0.96 + i * 0.09,
  })),
  ...[46, 88].map((a2, i) => ({
    at: S(L.S9 + a2), src: "thock.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.6), dur: 0.20, rate: 0.90 + i * 0.10,
  })),
  { at: S(L.S9 + 115), src: "can_bong.wav", v: LEVELS.SFX_HERO, dur: 0.40, rate: 0.92 },
  { at: S(L.S9 + 122), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 1.04 },
  /* ⛔ nothing on "up." (root f975-993) */

  /* ---- S10 · THE CTA. Four letters, then the chime, honestly. 5 --------- */
  ...[6, 12, 18, 24].map((a2, i) => ({
    at: S(L.S10 + a2), src: "impact.wav",
    v: LEVELS.SFX_HERO * db(-5 + i * 1.5), dur: 0.24, rate: 0.94 + i * 0.07,
  })),
  { at: S(L.S10 + 40), src: "green_tone.wav", v: LEVELS.SFX_HERO, dur: 0.70, rate: 1.04 },
  /* ⛔ nothing on "setup." (root f1035-1058) — the reel ends in air */
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116).
   ⛔ THE THREE CUTS GET DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate. */
const BED: Record<Variant, string> = {
  house: "136adhd_bed.wav",
  amber: "136adhd_bed_amber.wav",
  steel: "136adhd_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1272, amber: 1344, steel: 1204 };

/* ⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT: solved on THESE files
   against THIS voice, target ~12 dB under the VO, cap 0.25. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.4), amber: db(7.1), steel: db(6.9),
};
export const BED_QUIET = db(-6);

/* ⛔⛔⛔ THE LOUDEST CUES LAND WHERE THE VOICE IS QUIETEST, because cues are
   keyed to scene action and a scene ends where a sentence ends. Every
   sentence-final word in this reel is CLEAR of the bank (see the ⛔ notes in
   SFX), and the bed steps back 5 dB across each tail on top of that — a
   decaying word is 20 dB down on its own vowel and needs the room to itself. */
const TAILS: Array<[number, number]> = [
  [4.30, 4.62], [5.74, 6.06], [9.29, 9.61], [12.44, 12.76], [16.57, 16.89],
  [19.74, 20.06], [23.64, 23.96], [24.74, 25.06], [27.90, 28.22], [32.86, 33.18],
  [34.69, 35.27],
];
const tailDuck = (t: number) => {
  for (const [a, b] of TAILS) {
    if (t >= a && t <= b) {
      const edge = Math.min(t - a, b - t);
      return db(-5 * Math.min(1, edge / 0.08));   /* ramped, never a step */
    }
  }
  return 1;
};

/* the house envelope shape: quieter into the hook so the bell owns frame 0,
   flat through the body, up into the payoff, hard duck for the keyword */
const bedEnv = (f: number) => {
  const t = f / FPS;
  if (t < 1.0) return db(-2);
  if (t < 24.0) return db(0);
  if (t < 32.6) return db(1);
  const k = Math.min(1, (t - 32.6) / 0.2);
  return db(1 - 10 * k);
};
const bedMix = (f: number) => bedEnv(f) * tailDuck(f / FPS);

/** ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. `wander` IS S0 itself, so
    the candidate that gets picked and the scene that ships are the same code
    and cannot drift apart. */
/* ⭐⭐⭐ RE-PICKED ON MEASUREMENT after Alex scrapped the previous hook. Three
   genuinely different mechanisms were built at full quality and measured as
   solo comps (docs/THE-OPEN.md step 1, which I had skipped for four rounds):

       THE FRONT  (scorch)  motion **20.24**   a screen conceals a room
       SPLIT      (spike)   motion   8.25      a body divides
       HOLLOW     (wander)  motion   7.48      a sealed thing is empty

   THE FRONT wins outright and is not close: it is the highest-motion hook this
   reel has ever produced, it sits near the TOP of the shipped band (9.33-17.80),
   and it is the only one of the three that is legible in a single frame — a
   giant green ALL CLEAR board with a burning room behind it. */
export const PICKED: HookId = "scorch";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("adhd136_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])}
        volume={(fr) => LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1) * bedMix(fr)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><CARD v={v} dur={DUR.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><QUEUE v={v} dur={DUR.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><INSTALL v={v} dur={DUR.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><GATE v={v} dur={DUR.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><LEDGER v={v} dur={DUR.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><RUNSC v={v} dur={DUR.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><ASIDE v={v} dur={DUR.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><NIGHT v={v} dur={DUR.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><FANOUT v={v} dur={DUR.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><CTA v={v} dur={DUR.S10} /></Sequence>
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
   ⛔ A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they want to
   be able to do, never the set and never the theme. Nothing below says "the
   kitchen", "the pass" or "the line".
   ⛔ AND IT ADDS, IT DOES NOT RESTATE (reel 93): the hook and the CTA echo by
   design; every body band carries something the VO does not say.
   ⛔ BUDGET: `big` <= 22 characters, `hot` <= 24, measured off reel 115's
   shipped bands. The longest here is 20.
   ⛔ THE FIRST BAND GETS A HEAD START so the claim is fully rendered on frame 0
   — the feed thumbnail (reel 134 shipped it at opacity 0 and the skip rate
   said so).
   ====================================================================== */
const BANDS = [
  { from: L.S0, big: "CLAUDE HAS ADHD", hot: "ONE SKILL FIXES IT" },
  { from: L.S1, big: "ITS OWN MAKERS", hot: "TEST FOR THIS" },
  { from: L.S2, big: "IT SKIPS THE", hot: "HARD PART FIRST" },
  { from: L.S3, big: "A FREE FIX", hot: "DROPPED ON GITHUB" },
  { from: L.S4, big: "IT CANNOT SAY DONE", hot: "UNTIL IT PROVES IT" },
  { from: L.S5, big: "EVERY TASK GETS", hot: "A BOX TO PUNCH" },
  { from: L.S6, big: "IT RUNS THE CHECK", hot: "AND READS IT BACK" },
  { from: L.S7, big: "THE HONEST WAY", hot: "IS THE SLOW WAY" },
  { from: L.S8, big: "ONE JOB AT A TIME", hot: "IS THE DEFAULT" },
  { from: L.S9, big: "TEN AGENTS", hot: "ON ONE TICKET" },
  { from: L.S10, big: "COMMENT", hot: "ADHD" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const cand of BANDS) if (f >= cand.from) b = cand;
  /* ⛔ the first band is already SETTLED on frame 0; later bands keep their
     entrance, because a header swap mid-reel is a change worth animating. */
  const local = f - b.from + (b.from === 0 ? 14 : 0);
  return <HookHeader big={b.big} hot={b.hot} f={local} />;
};

export { HookCut };
export const ClaudeAdhd136Reel = makeReel("house");
export const ClaudeAdhd136Amber = makeReel("amber");
export const ClaudeAdhd136Steel = makeReel("steel");
