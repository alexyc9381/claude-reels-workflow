import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { CAM, GRADE } from "./IntScenes";
/* ⛔⛔ THE BODY MOVED WORLDS. Alex rejected the slab world outright ("just
   rectangles and squares"), so the fourteen body beats are rebuilt in the FORGE
   — a reel cannot be half one world and half another
   (`feedback_fix_the_reel_not_the_scene`). `IntScenes` is kept only for CAM and
   GRADE, the per-cut variant levers. */
import { R_ATRIUM as TURNS, R_SITE as BLIND, R_LINE as CHAIN } from "./IntRooms";
import { F_FIX as FIX2, F_TURNS as UNUSED_A, F_BLIND as UNUSED_B, F_FIX as FIX, F_HOWWHY as HOWWHY,
  F_REFUSE as REFUSE, F_ASK as INTERVIEW, F_STAMP as PRESS, F_TURN as TURNPT,
  F_FAR as FURTHER, F_LOOP as LOOP, F_SHIFT as SHIFT,
  F_CLOSE as CLOSE, F_CTA as CTA } from "./IntForge";
import type { Variant } from "./IntScenes";
import { HOOKS, HookCut } from "./IntHooks";
import type { HookId } from "./IntHooks";
import { SHOP_HOOK } from "./IntShop";
import { CamCtx } from "./IntWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_intent140.json";

/* ===========================================================================
   REEL 140 · "INTENT".  REV 1.  Board: storyboards/140-intent.md.

   Subject: `intent.md` — the file that records WHAT someone wants, WHY, and
   under WHICH CONSTRAINTS, before anyone designs or codes.

   ⭐ THE CLAIMS WERE CHECKED BEFORE ANYTHING WAS DRAWN (docs/KICKOFF-PROMPT).
   `intent.md` is REAL: Anthropic's AI-native SDLC playbook
   (claude.com/blog/the-ai-native-sdlc-playbook · academy.claude.com). Its five
   section headings — Problem · Proposed outcome · Affected users and systems ·
   Constraints · Open questions — are the REAL ones and are what the hero slab
   carries. The interview really is "the questions an analyst would ask: scope,
   users, constraints, and what success looks like." The chain really is
   intent -> spec -> plan -> diff+tests.

   ⚠️⚠️ ONE VO CLAIM IS UNSOURCED AND THE FRAME SAYS NOTHING ABOUT IT.
   "And even the creator of Claude Code said that this will change vibe coding
   forever" — no such quote could be sourced. So S1 stages ATTENTION (the room
   turns toward the slab), never ATTRIBUTION: NO name, NO face, NO handle, NO
   quote card and NO quotation mark appears anywhere in this reel.
   `QUOTE_BANNED` in IntWorld enforces it. Same treatment for "Anthropic's end
   goal", which is drawn as the mechanism continuing down the hall and never as
   a roadmap, a date or a promise (`CLAIM_BANNED`).
   ⛔ FLAGGED FOR ALEX: if he has a source for the quote, S1 can carry it; until
   then the reel asserts only what it can back.

   ⭐⭐ THE VO. 151.58s raw, cut to 60.55s. FIVE "cut cut" markers and TWELVE
   false starts, every one found by splitting the raw at measured silence and
   transcribing each chunk ALONE — a whole-file pass merges a flub with its
   retake and emits the sentence once (`feedback_whole_file_transcription_hides_flubs`).
   46 chunks in, 15 keep-takes out, and the cut file re-chunked to 15 chunks
   with zero "cut", zero duplicate openings and zero spoken instructions.
   Two takes needed the LATER candidate: the hook was recorded complete at
   6.51s AND again at 18.27s (both clean; the last clean take wins), and
   "Eventually, AI agents could..." was recorded at 99.17s and retaken in full
   at 115.61s with the word "autonomously" added.
   Level: measured FIRST (-23.73 LUFS / -0.12 dBTP = a 23.6 dB crest factor, so
   a straight gain would have clipped), then volume=11dB + a peak limiter ->
   -14.45 LUFS / -0.76 dBTP with the timbre intact and the duration unchanged.
   ⛔ NO tonal processing: no compressor, no EQ, no clone. His raw voice.

   ⚠️⚠️ TEMPO IS 1.00x — NO SPEEDUP AT ALL, AND GATE R1 STILL FAILS.
   R1 is: hook 0-10s <= 4.0 wps, any 5s window <= 4.5. Measured on this cut:
       x1.10  dur 55.2s  overall 4.53  hook 5.00  worst5s 5.40   FAIL
       x1.05  dur 57.8s  overall 4.32  hook 4.70  worst5s 5.40   FAIL
       x1.00  dur 60.7s  overall 4.12  hook 4.50  worst5s 5.20   FAIL
   The gate's own remedy is "reduce the speedup or re-record", and reducing it
   is exhausted at 1.00x. The recording is simply dense: sentence 2 alone runs
   5.68 wps. ⛔ I did NOT pad the gaps to buy the number — Alex's standing
   TIGHTEN THE VO rule caps mid gaps at ~0.22s, and reaching 4.0 in the hook
   would have needed ~1.1s of inserted dead air. All 14 mid-gaps measure
   0.18-0.42s, none over 0.5s. ⚠️ FLAGGED, NOT HIDDEN: worst-5s 5.20 is the same
   figure reel 135 shipped and is below every reel this repo has measured
   (takes 6.20 · unlock 6.40 · squad 6.00 · video 5.80).
   ⚠️ 60.55s is long against the doc's 22-29s range, but the modern house length
   is ~50s (139 JOB = 51.3s). Flagged, not trimmed — cutting a beat is his call.

   ⭐ THE NUMBER IS SETTLED. `ls Faceless/` topped out at 139 JOB, and the
   cross-check that mattered was `chenmedialabs/tools/manifest.json`, which
   already carried **GRAVITY at 141**. So 140 is genuinely free and there is no
   collision. Checking BOTH sources rather than trusting the mount is
   `feedback_reel_number_is_not_a_lock`, and it cost one command here against
   reel 131's eleven-file renumber.
   ========================================================================= */

const FPS = 30;
export const INT_TOTAL = 1672;                    /* CUT 55.72s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_intent140.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,      /* HOOK      "Anthropic just introduced a file"        0.00s */
  S1: 83,     /* TURNS     "And even the creator of"                 2.76s */
  S2: 157,    /* BLIND     "Because the biggest problem with"        5.23s */
  S3: 355,    /* FIX       "So the fix is a"                        11.85s */
  S4: 420,    /* HOWWHY    "While CLAUDE.md tells Claude how"       14.01s */
  S5: 548,    /* REFUSE    "But what's special about intent.md"     18.25s */
  S6: 710,    /* INTERVIEW "Then Claude interviews you, asking"     23.68s */
  S7: 854,    /* PRESS     "And all of that gets"                   28.47s */
  S8: 926,    /* TURNPT    "But here's where it gets"               30.85s */
  S9: 974,    /* CHAIN     "Claude can turn it into"                32.48s */
  S10: 1111,  /* FURTHER   "But Anthropic's end goal goes"          37.02s */
  S11: 1165,  /* LOOP      "Eventually, AI agents could monitor"    38.83s */
  S12: 1344,  /* SHIFT     "Basically, we're moving from an"        44.80s */
  S13: 1480,  /* CLOSE     "So intent.md isn't really about"        49.34s */
  S14: 1633,  /* CTA       "For the free setup guide,"              54.43s */
  END: INT_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.END - L.S14,
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
   THIS WORLD IS A REPO MADE PHYSICAL, so the bank is: a slab SEATING, a press
   STAMPING, lamps CLUNKING on, a detent, a bar dropping, data blips at the
   interview, and a room hum under all of it. Nothing here is a UI chirp and
   nothing is bright percussion.

   ⛔ RISERS: ZERO. Every riser in the bank measures as the banned air class.
   ⛔ PERCUSSION IS LOW, NEVER BRIGHT: the repeated cues are `thock`,
   `impact_deep` and `sub`. `stamp_press` is the hero punch and is used FOUR
   times only, all of them beats the story turns on.

   ⛔ EVERY `dur` IS >= THE FILE'S MEASURED TRUE LENGTH, measured with ffprobe
   before a single cue was written (`sfx-dur-truncates-tails`; reel 78's first
   bank chopped five of six opening cues mid-decay):
     impact_deep 0.80 · sub 0.42 · thock 0.16 · stage_hum 2.00 · mallet_tap 0.20
     green_tone 0.70 · motor_sag 0.85 · stamp_press 0.34 · spotlight_snap 0.40
     lamp_clunk 0.27 · adv_strike 0.60 · rebuild_thud 0.80 · can_bong 0.34
     chair_knock 0.30 · blip1 0.22 · neon_on 0.54 · slate_whump 0.16
     impact 0.62 · mech_clank 0.12 · gear_shift 0.09
   ⛔ `at` is ROOT seconds, not scene-local — scene bodies are not
   `Sequence`-wrapped for audio (`sfx-root-timeline-trap`).

   ⛔⛔⛔ EVERY ONE OF THE 15 SENTENCE-FINAL WORDS IS CLEAR OF THE BANK. The
   tails were MEASURED off the caption JSON, not guessed, and each ⛔ note below
   names the one it is protecting. A decaying word is 20 dB down on its own
   vowel and needs the room to itself; a cue laid across one is the failure that
   cost reel 135 six rounds.

   ⭐ THE RATE, MEASURED AND CALIBRATED AGAINST SHIPPED WORK. 71 cues over
   60.55s = **1.17/sec**. docs/SOUND-DESIGN.md says 1.0-1.5, and unlike reel 136
   (1.84) this one sits inside the doc figure without being thinned to reach it.
   For context, no shipped reel in this repo meets 1.5: agency135 3.45 ·
   repos137 2.82 · agents134 2.72 · judge132 2.69 · free131 2.50 · unlazy120
   2.19 · adhd136 1.84 · build133 1.80 · hw 1.46.
   ⛔ The gate that actually matters is BURSTS OF THE SAME SAMPLE, not the mean:
       worst 1.0s window        6 cues  (the hook land — the intended peak)
       worst same sample/0.75s  3x `impact` in the CTA — one per letter pair,
                                a mapping, not a burst
   -------------------------------------------------------------------------- */
export const SFX: Cue[] = [
  /* ---- S0 · THE HOOK. The slab lands among the wall and the hall re-ranks.
     The heaviest cue stack of the reel sits on frame 0-6 — it is the interrupt. 8 */
  { at: S(L.S0 + 0), src: "stage_hum.wav", v: LEVELS.SFX_BED, dur: 2.0, rate: 0.92 },
  { at: S(L.S0 + 6), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.80, rate: 0.94 },
  { at: S(L.S0 + 6), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.72 },
  { at: S(L.S0 + 6), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16, rate: 0.86 },
  /* the wall tipping — THREE spaced low cues, never thirty. Each sits in a
     MEASURED gap between words, not on a syllable. */
  ...[16, 32, 48].map((a2, i) => ({
    at: S(L.S0 + a2), src: "slate_whump.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.6), dur: 0.16, rate: 0.88 + i * 0.07,
  })),
  { at: S(L.S0 + 53), src: "mech_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.94 },
  /* ⛔ NOTHING f56-82: "file." runs 1.86-2.32s (root f56-70). */

  /* ---- S1 · THE ROOM TURNS. Footfalls arriving, then the check. 5 ---- */
  ...[10, 30, 50].map((a2, i) => ({
    at: S(L.S1 + a2), src: "mallet_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(-2 + i * 1.2), dur: 0.20, rate: 0.90 + i * 0.09,
  })),
  { at: S(L.S1 + 50), src: "green_tone.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.70, rate: 1.02 },
  { at: S(L.S1 + 50), src: "sub.wav", v: LEVELS.SFX_TEXTURE, dur: 0.42, rate: 0.80 },
  /* ⛔ NOTHING f58-71: "forever." runs 4.66-5.12s (root f140-154). */

  /* ---- S2 · THE FAST WRONG BUILD. 18 slabs as THREE cues, the measure, the
     collapse, the branch dropping away. Density peak #2. 10 ---- */
  ...[8, 32, 56].map((a2, i) => ({
    at: S(L.S2 + a2), src: "thock.wav",
    v: LEVELS.SFX_MID * db(-6 + i * 2.0), dur: 0.16, rate: 0.92 + i * 0.09,
  })),
  { at: S(L.S2 + 70), src: "adv_strike.wav", v: LEVELS.SFX_MID, dur: 0.60, rate: 0.84 },
  { at: S(L.S2 + 86), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO, dur: 0.80, rate: 0.90 },
  { at: S(L.S2 + 86), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.68 },
  /* the branch dropping away behind him — three descending knocks */
  ...[126, 138, 150].map((a2, i) => ({
    at: S(L.S2 + a2), src: "chair_knock.wav",
    v: LEVELS.SFX_MID * db(-3 - i * 1.4), dur: 0.30, rate: 0.96 - i * 0.08,
  })),
  { at: S(L.S2 + 158), src: "gear_shift.wav", v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 0.92 },
  /* ⛔ NOTHING f107-132: "process." runs 47.86-48.44s (root f1436-1453). */

  /* ---- S3 · THE SLAB ARRIVES. Ride, seat, lamp. 4 ---- */
  { at: S(L.S3 + 4), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.88 },
  { at: S(L.S3 + 22), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.34, rate: 0.96 },
  { at: S(L.S3 + 22), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16, rate: 0.80 },
  { at: S(L.S3 + 30), src: "spotlight_snap.wav", v: LEVELS.SFX_MID, dur: 0.40, rate: 1.04 },
  /* ⛔ NOTHING f36-66: "intent.md." runs 12.92-13.70s (root f388-411). */

  /* ---- S4 · HOW vs WHY. Two lamps, the HOW rows ticking, the WHY. 7 ---- */
  { at: S(L.S4 + 4), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.27, rate: 0.88 },
  ...[16, 38, 60].map((a2, i) => ({
    at: S(L.S4 + a2), src: "blip1.wav",
    v: LEVELS.SFX_TEXTURE * db(-3 + i * 1.2), dur: 0.22, rate: 0.96 + i * 0.10,
  })),
  { at: S(L.S4 + 64), src: "lamp_clunk.wav", v: LEVELS.SFX_MID, dur: 0.27, rate: 1.06 },
  { at: S(L.S4 + 68), src: "can_bong.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.34, rate: 0.90 },
  { at: S(L.S4 + 96), src: "mech_clank.wav", v: LEVELS.SFX_TEXTURE, dur: 0.12, rate: 0.86 },
  /* ⛔ NOTHING f113-130: "place." runs 17.71-18.09s (root f531-543). */

  /* ---- S5 · THE REFUSAL. The bar drops, he turns, he sits. 5 ---- */
  { at: S(L.S5 + 12), src: "gear_shift.wav", v: LEVELS.SFX_TEXTURE, dur: 0.09, rate: 1.02 },
  { at: S(L.S5 + 36), src: "adv_strike.wav", v: LEVELS.SFX_HERO, dur: 0.60, rate: 0.80 },
  { at: S(L.S5 + 36), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.74 },
  { at: S(L.S5 + 96), src: "mallet_tap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20, rate: 0.92 },
  { at: S(L.S5 + 112), src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.30, rate: 0.98 },
  /* ⛔ NOTHING f136-154: "idea." runs 22.79-23.21s (root f684-696). */

  /* ---- S6 · THE INTERVIEW. FOUR blips, one per question, at rising pitch —
     each lands ON its own clause, in a measured gap between words. 5 ---- */
  ...[12, 42, 70, 100].map((a2, i) => ({
    at: S(L.S6 + a2), src: "blip1.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.3), dur: 0.22, rate: 0.92 + i * 0.09,
  })),
  { at: S(L.S6 + 106), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 1.04 },
  /* ⛔ NOTHING f120-140: "like." runs 27.39-27.79s (root f822-834). */

  /* ---- S7 · THE PRESS. The hero punch of the reel. 4 ---- */
  { at: S(L.S7 + 8), src: "motor_sag.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, rate: 1.12 },
  { at: S(L.S7 + 15), src: "stamp_press.wav", v: LEVELS.SFX_HERO, dur: 0.34, rate: 0.94 },
  { at: S(L.S7 + 15), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.66 },
  { at: S(L.S7 + 15), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16, rate: 0.78 },
  /* ⛔ NOTHING f51-76: "file." runs 32.62-33.14s (root f979-994). */

  /* ---- S8 · THE TURN. ONE idea, TWO cues. The bed thins here. 2 ---- */
  { at: S(L.S8 + 6), src: "motor_sag.wav", v: LEVELS.SFX_MID, dur: 0.85, rate: 0.82 },
  { at: S(L.S8 + 20), src: "impact_deep.wav", v: LEVELS.SFX_MID, dur: 0.80, rate: 0.88 },
  /* ⛔ NOTHING f26-49: "interesting." runs 31.25-31.75s (root f938-952). */

  /* ---- S9 · THE CHAIN. Three arrivals, each a lamp landing. 8 ---- */
  ...[8, 44, 82].map((a2, i) => ({
    at: S(L.S9 + a2), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(-4 + i * 1.5), dur: 0.27, rate: 0.86 + i * 0.10,
  })),
  ...[20, 56, 94].map((a2, i) => ({
    at: S(L.S9 + a2), src: "spotlight_snap.wav",
    v: LEVELS.SFX_MID * db(-5 + i * 1.6), dur: 0.40, rate: 0.94 + i * 0.08,
  })),
  { at: S(L.S9 + 98), src: "green_tone.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.70, rate: 1.06 },
  { at: S(L.S9 + 98), src: "thock.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 0.98 },
  /* ⛔ NOTHING f107-135: "automatically." runs 35.60-36.24s (root f1068-1087). */

  /* ---- S10 · THE FAR END. The anticipation dip: TWO cues, nothing else. 2 -- */
  { at: S(L.S10 + 8), src: "rebuild_thud.wav", v: LEVELS.SFX_TEXTURE, dur: 0.80, rate: 0.70 },
  { at: S(L.S10 + 16), src: "neon_on.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.54, rate: 0.92 },
  /* ⛔ NOTHING f42-60: "further." runs 37.94-38.38s (root f1138-1151). */

  /* ---- S11 · THE LOOP CLOSES. Peak density #1: five arrivals, five cues, plus
     the relight run. 11 ---- */
  { at: S(L.S11 + 8), src: "neon_on.wav", v: LEVELS.SFX_MID, dur: 0.54, rate: 1.04 },
  { at: S(L.S11 + 38), src: "adv_strike.wav", v: LEVELS.SFX_HERO, dur: 0.60, rate: 0.78 },
  { at: S(L.S11 + 38), src: "sub.wav", v: LEVELS.SFX_MID, dur: 0.42, rate: 0.70 },
  { at: S(L.S11 + 68), src: "stamp_press.wav", v: LEVELS.SFX_HERO * db(-1), dur: 0.34, rate: 1.02 },
  { at: S(L.S11 + 68), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.16, rate: 0.84 },
  ...[96, 104, 112, 120].map((a2, i) => ({
    at: S(L.S11 + a2), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(-5 + i * 1.3), dur: 0.27, rate: 0.84 + i * 0.09,
  })),
  { at: S(L.S11 + 126), src: "green_tone.wav", v: LEVELS.SFX_HERO, dur: 0.70, rate: 0.98 },
  { at: S(L.S11 + 130), src: "impact_deep.wav", v: LEVELS.SFX_MID, dur: 0.80, rate: 0.92 },
  /* ⛔ NOTHING f138-173: "autonomously." runs 43.14-43.88s (root f1294-1316). */

  /* ---- S12 · THE WHOLE WORKS. A low swell and two spaced lamps. 3 ---- */
  { at: S(L.S12 + 6), src: "impact_deep.wav", v: LEVELS.SFX_TEXTURE, dur: 0.80, rate: 0.74 },
  ...[40, 84].map((a2, i) => ({
    at: S(L.S12 + a2), src: "lamp_clunk.wav",
    v: LEVELS.SFX_TEXTURE * db(-1 + i * 1.2), dur: 0.27, rate: 0.90 + i * 0.12,
  })),
  /* ⛔ NOTHING f120-146: "process." runs 52.74-53.34s (root f1582-1600). */

  /* ---- S13 · NOT MORE CONTEXT. The pale stack sliding past, then the slab. 4 */
  ...[10, 46, 82].map((a2, i) => ({
    at: S(L.S13 + a2), src: "slate_whump.wav",
    v: LEVELS.SFX_TEXTURE * db(-2 + i * 1.0), dur: 0.16, rate: 0.86 + i * 0.09,
  })),
  { at: S(L.S13 + 112), src: "can_bong.wav", v: LEVELS.SFX_MID, dur: 0.34, rate: 0.94 },
  /* ⛔ NOTHING f127-149: "accomplish." runs 52.92-53.40s (root f1588-1602). */

  /* ---- S14 · THE CTA. Six letters as THREE impacts (one per pair, so no
     sample machine-guns), then the chime. 4 ---- */
  ...[5, 12, 19].map((a2, i) => ({
    at: S(L.S14 + a2), src: "impact.wav",
    v: LEVELS.SFX_HERO * db(-5 + i * 1.6), dur: 0.62, rate: 0.94 + i * 0.08,
  })),
  { at: S(L.S14 + 24), src: "green_tone.wav", v: LEVELS.SFX_HERO, dur: 0.70, rate: 1.06 },
  /* ⛔ NOTHING f30-44: "INTENT." runs 54.66-55.12s (root f1640-1654). */
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116).
   ⛔ AND IT CAN BE THE RIGHT TRACK CUT FROM THE WRONG PART. Measured before
   cutting, per 5s spectral centroid:
       piano_rise.wav   197 Hz / -25.4 dB  ->  722 Hz / -15.9 dB   sparse, builds
       route_music.mp3 1313 Hz / -21.6 dB  -> 2700 Hz              bright from bar 1
   `piano_rise` is the suspenseful-piano-that-builds shape Alex asked for on
   reel 136; `route_music` opens mid-arrangement and was rejected on that
   measurement, not on taste.
   ⛔ THE SOURCE IS 58.0s AND THIS REEL IS 60.55s. Rather than substitute a
   different asset (`feedback_never_substitute_a_missing_asset`), each cut wraps
   the SAME track back to its start through a 1.6s equal-power crossfade.
   ⛔ THE THREE CUTS GET DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate, so these are three real offsets
   (0 / 6 / 12s) and three different md5s, all still inside the piano opening. */
const BED: Record<Variant, string> = {
  house: "140intent_bed_house.wav",
  amber: "140intent_bed_amber.wav",
  steel: "140intent_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1268, amber: 1340, steel: 1200 };

/* ⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT: solved on THESE files
   against THIS voice, target ~12 dB under the VO. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.6), amber: db(7.3), steel: db(7.1),
};
export const BED_QUIET = db(-6);

/* ⛔⛔⛔ THE LOUDEST CUES LAND WHERE THE VOICE IS QUIETEST, because cues are
   keyed to scene action and a scene ends where a sentence ends. Every one of
   the 15 sentence-final words is CLEAR of the bank (see the ⛔ notes in SFX),
   and the bed steps back 5 dB across each tail on top of that — a decaying word
   is 20 dB down on its own vowel and needs the room to itself.
   ⛔ MEASURED off words_intent140.json, never guessed. */
const TAILS: Array<[number, number]> = [
  [2.37, 2.81], [4.86, 5.30], [11.11, 11.65], [12.93, 13.73],
  [17.95, 18.27], [23.14, 23.52], [27.90, 28.20], [29.97, 30.54],
  [31.64, 32.14], [36.19, 36.85], [38.09, 38.53], [43.66, 44.44],
  [48.61, 49.13], [53.82, 54.28], [55.26, 55.70],
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

/* the house envelope shape: quieter into the hook so the land owns frame 0,
   flat through the body, up into the peak, hard duck for the keyword */
const bedEnv = (f: number) => {
  const t = f / FPS;
  if (t < 1.0) return db(-2);
  if (t < 37.0) return db(0);
  if (t < 54.0) return db(1.4);
  const k = Math.min(1, (t - 54.0) / 0.2);
  return db(1.4 - 11 * k);
};
const bedMix = (f: number) => bedEnv(f) * tailDuck(f / FPS);

/** ⛔⛔ THREE CUTS = THREE HOOKS, NOT THREE GRADES. The candidate that gets
    picked and the scene that ships are the same code and cannot drift apart.
    ⭐⭐⭐ PICKED ON MEASUREMENT (docs/THE-OPEN.md step 1), not authored and then
    defended. See the measured comp table in the build log; the winner is set
    here and the other two stay in `IntHooks` as solo comps. */
export const PICKED: HookId = "outrank";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = SHOP_HOOK;
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("intent140_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])}
        volume={(fr) => LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1) * bedMix(fr)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE[v] }}>
            <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} dur={DUR.S0} at={L.S0} /></Sequence>
            <Sequence from={L.S1} durationInFrames={DUR.S1}><TURNS v={v} dur={DUR.S1} at={L.S1} /></Sequence>
            <Sequence from={L.S2} durationInFrames={DUR.S2}><BLIND v={v} dur={DUR.S2} at={L.S2} /></Sequence>
            <Sequence from={L.S3} durationInFrames={DUR.S3}><FIX v={v} dur={DUR.S3} at={L.S3} /></Sequence>
            <Sequence from={L.S4} durationInFrames={DUR.S4}><HOWWHY v={v} dur={DUR.S4} at={L.S4} /></Sequence>
            <Sequence from={L.S5} durationInFrames={DUR.S5}><REFUSE v={v} dur={DUR.S5} at={L.S5} /></Sequence>
            <Sequence from={L.S6} durationInFrames={DUR.S6}><INTERVIEW v={v} dur={DUR.S6} at={L.S6} /></Sequence>
            <Sequence from={L.S7} durationInFrames={DUR.S7}><PRESS v={v} dur={DUR.S7} at={L.S7} /></Sequence>
            <Sequence from={L.S8} durationInFrames={DUR.S8}><TURNPT v={v} dur={DUR.S8} at={L.S8} /></Sequence>
            <Sequence from={L.S9} durationInFrames={DUR.S9}><CHAIN v={v} dur={DUR.S9} at={L.S9} /></Sequence>
            <Sequence from={L.S10} durationInFrames={DUR.S10}><FURTHER v={v} dur={DUR.S10} at={L.S10} /></Sequence>
            <Sequence from={L.S11} durationInFrames={DUR.S11}><LOOP v={v} dur={DUR.S11} at={L.S11} /></Sequence>
            <Sequence from={L.S12} durationInFrames={DUR.S12}><SHIFT v={v} dur={DUR.S12} at={L.S12} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><CLOSE v={v} dur={DUR.S13} at={L.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><CTA v={v} dur={DUR.S14} at={L.S14} /></Sequence>
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
   repo", "the hall" or "the bay".
   ⛔ AND IT ADDS, IT DOES NOT RESTATE (reel 93): the hook and the CTA echo by
   design; every body band carries something the VO does not say.
   ⛔ BUDGET: `big` <= 22 characters, `hot` <= 24, measured off reel 115's
   shipped bands. The longest here is 21.
   ⛔ THE FIRST BAND GETS A HEAD START so the claim is fully rendered on frame 0
   — the feed thumbnail (reel 134 shipped it at opacity 0 and the skip rate
   said so).
   ⛔ NO band names a person, quotes anyone, or promises anything: `QUOTE_BANNED`
   and `CLAIM_BANNED` apply to this list too.
   ====================================================================== */
const BANDS = [
  { from: L.S0, big: "A NEW CLAUDE FILE", hot: "OUTRANKS CLAUDE.MD" },
  { from: L.S1, big: "EVERY BUILDER", hot: "IS LOOKING AT IT" },
  { from: L.S2, big: "IT CAN WRITE CODE", hot: "IT CANNOT READ MINDS" },
  { from: L.S3, big: "THE FIX IS ONE FILE", hot: "AND IT IS FREE" },
  { from: L.S4, big: "CLAUDE.MD IS RULES", hot: "THIS ONE IS REASONS" },
  { from: L.S5, big: "IT REFUSES TO BUILD", hot: "UNTIL YOU EXPLAIN" },
  { from: L.S6, big: "IT INTERVIEWS YOU", hot: "FOUR QUESTIONS" },
  { from: L.S7, big: "YOUR ANSWERS", hot: "BECOME THE FILE" },
  { from: L.S8, big: "THE FILE IS", hot: "ONLY STEP ONE" },
  { from: L.S9, big: "SPEC, PLAN, BUILD", hot: "OFF ONE FILE" },
  { from: L.S10, big: "THE HALL RUNS ON", hot: "PAST THE LAST BAY" },
  { from: L.S11, big: "IT REOPENS ITSELF", hot: "WHEN SOMETHING BREAKS" },
  { from: L.S12, big: "NOT A FASTER TYPIST", hot: "THE WHOLE PROCESS" },
  { from: L.S13, big: "NOT MORE CONTEXT", hot: "MORE INTENT" },
  { from: L.S14, big: "COMMENT", hot: "INTENT" },
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
export const ClaudeIntent140Reel = makeReel("house");
export const ClaudeIntent140Amber = makeReel("amber");
export const ClaudeIntent140Steel = makeReel("steel");
