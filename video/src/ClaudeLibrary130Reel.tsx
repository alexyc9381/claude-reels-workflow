import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, CAM, GRADE } from "./LbyScenes";
import type { Variant } from "./LbyScenes";
import { CamCtx, R } from "./LbyWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import { HOOKS, PICKED } from "./LbyHooks";
import type { HookId } from "./LbyHooks";
import words from "./data/words_130library.json";

/* ===========================================================================
   REEL 130 · "LIBRARY" — THE PROMPT COUNTER.  Board: storyboards/130-library.md.

   Subject: Anthropic published its own Claude Code prompt library —
   `code.claude.com/docs/en/prompt-library` — **52** copy-paste prompts tagged
   by task and role across **15** categories and **5** SDLC phases, with
   editable fill-in fields, lifted out of Anthropic's own workflow,
   best-practice and team guides. Free. Every fact is in `R` in `LbyWorld.tsx`,
   checked 2026-08-30 against Claude Code's own docs. Nothing on screen is
   outside it.

   ⛔⛔ THE ONE THING THE VO SAYS THAT THE FRAME DOES NOT CLAIM:
     "there's already over a hundred free templates"
                       the library holds **52**. `COUNT_BANNED` greps for 100 /
                       100+ / OVER 100 / HUNDRED / HUNDREDS / 1000, and no
                       plate, band, chip or drawer face prints a total above 52.
                       S9 pays the line with the PICTURE instead — the wall runs
                       past the crop on both sides with its five bank counters
                       still climbing — which is true of the wall as drawn and
                       asserts no number. The receipt `52 PROMPTS · 15
                       CATEGORIES` is spent at S2, where the VO is describing
                       what the library IS.

   ⛔⛔ THE ANTAGONIST IS `THE BLANK DOCKET` AND IT IS NEVER DESTROYED. It wins
   the hook, it wins S4 outright, and it is STILL ON THE SPIKE, STILL BLANK, in
   the last frame. The library does not abolish writing your own prompt; it
   means you almost never have to.

   ⭐ 29.65s — inside the playbook's 22-29s figure to within 0.65s, and shorter
   than every recent ship (127 = 30.40 · 118 = 33.68 · 124 = 32.53 · 126 =
   37.90). The cut removes 16.42s of a 46.07s raw take: **TWO `cut cut` retakes**
   (17.60-22.05 in the "Second" line and 34.52-37.56 in "But here's the thing"),
   both of which four separate whisper passes reported as clean prose — each had
   absorbed the whole retake into ONE WORD TOKEN (`' to'` 18.80->22.70,
   `" there's"` 35.44->38.02). ⭐ THE TELL IS A WORD LONGER THAN ITS OWN
   SYLLABLES: scan word DURATIONS, not just the gaps between them.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see none
      of it.
   ========================================================================= */

const FPS = 30;

/** ⛔ DERIVED FROM `words_130library.json`, NEVER TYPED. On reel 122 the scene
    list was a hand-typed copy of `L` and 7 of 19 entries were wrong, one by
    1.26s, so a whole round was spent editing a scene that was not in the frame
    being complained about. Regenerate with `tools/lby_scenes.sh`. */
export const L = {
  S0: 0, S1: 115, S2: 172, S3: 269, S4: 340, S5: 398, S6: 467,
  S7: 551, S8: 629, S9: 725, S10: 795, S11: 843, END: 890,
} as const;

export const LIBRARY_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.END - L.S11,
};

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff —
   `lib_deep_whoosh.wav` is excluded by its own name and a measurement cannot
   out-argue the label on the tin. `ballast_buzz` and `chain_clank` both tripped
   the AIR gate on reel 120 (slow attack, no low end = a swell) and are out, and
   so is `slot_lever`.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is an ALL-NIGHT ISSUE
   COUNTER — a roller shutter, drawer slams, a desk bell, a card chute, a stamp
   press, bolts driven with a wrench, ratchets, ticket clicks and a low picking
   motor under the hall. **ZERO chiptune**: the greppable gate is that no `src`
   starts with `c_`.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top is
   a SLAP; the same event carried under 250 Hz is a thud you feel.
   `impact_deep` (93.1% low), `sub` (96.6%), `thock` (88.6%), `slate_whump`
   (44.7%), `rebuild_thud` (90.3%) and `mallet_tap` (60.2%) carry every weight
   beat in the reel. ⛔ `lib_pop` is 91.8% ABOVE 2kHz and does not appear.

   ⛔⛔⛔ FOUR CUES WERE REPLACED AFTER MEASURING, NOT AFTER LISTENING — which is
   the whole point of the tool, because these are inaudible as defects until you
   run it:
     `sorter_tick`   1929ms attack on a 2.4s file, 75.9% of its energy ABOVE
                     2 kHz. As a bed that is a rising HISS sitting exactly where
                     the voice lives. Replaced by `stage_hum` — **70.3% under
                     250 Hz and 0.3% above 2 kHz**, which is the bass-forward
                     shape [[feedback_house_bed_is_a_real_track]] says the house
                     sound actually is, at four different rates so one sample is
                     four different rooms.
     `coin_slide`    303ms attack, 89.8% above 2 kHz — NOISE-BED + SWELL + HISS +
                     AIR on one cue. That is the banned "puff of air" shape under
                     a different filename, and no measurement can out-argue four
                     flags. A card slid across a counter is not a travel sound
                     anyway: the EVENT is where it stops.
     `scanner_sweep` 136ms attack and 0.3% under 250 Hz — all midrange, flagged
                     AIR. A reader head is a MOTOR: `motor_sag` is 86.6% low.
     `dead_thud`     91.3% ABOVE 2 kHz. ⛔ Percussion must be LOW, never bright —
                     a transient with its energy up top is a SLAP, and three of
                     them carried the whole pour in one playable cut.
   ⛔ `machine_bed` still flags NOISE-BED and that is CORRECT: it is a bed, it
   plays at `SFX_BED` with `lead: 0`, and a bed is supposed to be a noise bed.
   A clean audit is not the goal; the right cue in the right slot is.

   ⛔ `dur` TRUNCATES TAILS — every `dur` below is >= the file's own measured
   length: machine_bed 4.00 · stage_hum 2.00 · motor_sag 0.85 · ratchet 0.50 ·
   mech_clank 0.12 · impact_deep 0.80 · sub 0.42 · thock 0.16 · slate_whump 0.16
   · mallet_tap 0.20 · metal_ping 0.31 · sign_clack 0.22 · ticket_click 0.14 ·
   lamp_clunk 0.27 · snap 0.05 · gear_shift 0.09 · bell_ring 1.60 ·
   bamboo_crack 0.40 · green_tone 0.70 · sub 0.42 · wrench_clank 0.06
   · stamp_press 0.34 · gold_stamp 0.50 · rebuild_thud 0.80 · pickup_chime 0.34.
   ⛔ AND A CUE SHORTER THAN ITS OWN ATTACK IS ABSENT, NOT QUIET
   ([[feedback_a_cue_shorter_than_its_attack]] — `lib_confirm` peaks at 1727ms
   and shipped at 850ms, so the payoff beat made no sound and every row-counting
   audit still counted it). `lib_confirm` is not used.

   ⭐ A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS. Every run here
   ascends: the four trays at S2, the four chute cards at S3, the three route
   ticks at S6, the four bolts at S7, the three strips at S8 and the three bank
   passes at S9. Equal temperament is 2^(n/12), so a `rate` IS a transposition.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S7 (the plate lands and
   is bolted) and S3 (four cards fired) and thins to three on S5 and four on S4,
   which is why S4 is the quietest 1.93s in the reel and has no bed at all.
   MEASURED, per playable cut, over 29.65s:
       SHUTTER 43 non-bed = 1.45/sec  ·  SLIDE 43 = 1.45  ·  DELUGE 44 = 1.48
   against the house 1.0-1.5 ceiling (95 = 0.98 · 105 = 1.13 · 127 = 1.38 · a
   rejected 107 = 3.82).                                                      */
const STEP3 = [1.000, 1.1225, 1.2599];
const STEP4 = [1.000, 1.0905, 1.1892, 1.2968];

/** ⛔⛔ THE S0 CUES CANNOT BE SHARED. S1-S11 show the same picture in all three
    cuts, so their cues come straight off `L`. S0 is the one scene where the
    three hooks show three different EVENTS — a shutter thrown up, a card slid
    the width of a counter, and a chute pouring at camera — and a cue list
    written for the first, played over the others, is a rising shutter and one
    enormous land under a shot in which nothing rises and twelve things fall.
    ⛔ AND A SOURCE AUDIT CANNOT SEE A BRANCH: audit these PER VARIANT
    ([[feedback_a_source_audit_overcounts_branches]] — three exclusive banks in
    one function produced two false SLAPs on reel 127). */
const s0Cues = (hook: HookId): Cue[] => {
  /* ---- A · THE COUNT (115f) · THE PICKED HOOK. The shape is the picture's: the
     hall running, the shutter RIPPING up on a ratchet, ONE enormous low landing
     as it hits the head box, then the card slammed on the counter and `FREE`
     stamped on the word. ⛔ NO ALARM AND NO KLAXON — nothing here is failing,
     something is being OPENED. ------------------------------------------- */
  /* ---- A · THE HAUL (115f) · THE PICKED HOOK.
     ⛔⛔⛔ THE HOOK WAS PLAYING THE SHUTTER'S CUE LIST. Alex: *"where's the sound
     effect?"* — and he was right in a way the audits could not see. The picture
     had been rebuilt six times and this array had not moved with it: a ratchet at
     f41 and one enormous impact at f54, on a shot whose beats are at 13 / 32 / 52
     / 72 / 88 / 96. Nothing landed on anything. That is
     [[feedback_a_retime_moves_three_clocks]] and reel 119's *"THE SFX LIST MUST
     BE PER CUT ONCE THE HOOKS DIFFER — three pictures on one soundtrack is worse
     than no soundtrack"*, both at once, and no gate in this repo can hear it: the
     cue rate was inside the ceiling and `sfx_audit` was clean the whole time.
     ⭐ THE SHAPE IS THE PICTURE'S. A strap groaning under load, three break-frees
     that get LOWER as the thing gets heavier (a descending run says the load is
     winning — an ascending one would read as progress, which is the opposite of
     this shot), the load taken off him on one big low, and the keyword. */
  /* ⛔ ONE BANK FOR ALL THREE LOAD CANDIDATES. The strip is deciding the OBJECT,
     so every other variable — including this list — has to be held still. */
  if (hook === "haul" || hook === "haulb" || hook === "haulc") return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.80, lead: 0 },
    /* ⭐ THE ANTICIPATION IS A SOUND TOO. `motor_sag` is 86.6% under 250 Hz with a
       73ms attack — a groan under load, which is what a strap going taut IS. It
       runs from f2, so the first thing a viewer hears is something straining. */
    { at: S(2), src: "motor_sag.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.90, rate: 0.72, lead: 0 },
    /* the three break-frees, DESCENDING — each one moves it less */
    ...[[13, 0.94], [52, 0.86], [88, 0.78]].map(([fr, rt]) => ({
      at: S(fr), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.85, rate: rt,
    })),
    /* the load taken off him — the biggest cue in the hook, and the turn */
    { at: S(96), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.88 },
    { at: S(100), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.55, rate: 0.96 },
  ];

  /* ---- B · SLIDE (115f) · the hero cue is a TRAVEL, not an impact, because
     nothing falls in this cut. ⛔ Its arrival is `bell_ring`, not `thock` — the
     per-VARIANT count is what the "no sample more than 3x" ban is about. ---- */
  if (hook === "slot") return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.88, lead: 0 },
    { at: S(42), src: "gear_shift.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.12, rate: 0.80 },
    { at: S(62), src: "bell_ring.wav", v: LEVELS.SFX_HERO * db(-6), dur: 1.65, rate: 1.06 },
    { at: S(76), src: "thock.wav", v: LEVELS.SFX_MID * db(1), dur: 0.20, rate: 0.88 },
    { at: S(88), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.55, rate: 0.96 },
  ];

  /* ---- C · DELUGE (115f) · twelve cards landing at camera is a RUN, not a
     hit, so it is three sampled thuds across the pour rather than twelve cues
     (§9's density ceiling, and hierarchy: the pour is one event). ---------- */
  return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.92, lead: 0 },
    { at: S(43), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.55, rate: 0.70, lead: 0 },
    { at: S(46), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.90, rate: 0.98 },
    /* ⛔ TWO CUES CAME OUT OF THIS BANK AND BOTH REMOVALS WERE HIERARCHY, NOT
       TRIMMING. The DELUGE cut measured **1.55/sec** against the 1.0-1.5 ceiling
       — visible only once the counter expanded its `.map()` runs — and its
       `lamp_clunk` was a FOURTH use of a sample S9 already spends three times as
       an ascending run, which is the thing the "no sample more than 3x" ban
       exists to stop. The pour is ONE event: the big low hit is the pour, and one
       dry clank is the pile settling. */
    { at: S(56), src: "mech_clank.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.16, rate: 0.90 },
    { at: S(88), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-5), dur: 0.55, rate: 0.96 },
  ];
};

const makeSFX = (hook: HookId): Cue[] => [
  ...s0Cues(hook),

  /* S1 · THE REJECTION — the rail is the bed AND the subject. Three of the four
     blanks knock; the fourth is silent because the third already said it
     (hierarchy, not trimming). DESCENDING, because the villain's throw is
     losing force. */
  { at: S(L.S1), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(4), dur: 2.05, rate: 0.86, lead: 0 },
  ...[14, 30].map((fr, i) => ({
    at: S(L.S1 + fr), src: "sign_clack.wav", v: LEVELS.SFX_MID * db(-1 - i * 0.6),
    dur: 0.26, rate: STEP3[1 - i] * 0.88,
  })),

  /* S2 · THE STOCK HATCH — four trays land ASCENDING. ⛔ `slate_whump`, not
     `impact_deep`: the deep sample is already carrying the hook land, the plate
     land at S7 and the flood at S9, and seven of one sample in one playable cut
     is exactly what the repeat ban exists to stop. */
  { at: S(L.S2), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(3), dur: 2.05, rate: 0.80, lead: 0 },
  ...[19, 33, 47, 61].map((fr, i) => ({
    at: S(L.S2 + fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-i * 0.5),
    dur: 0.20, rate: STEP4[i] * 0.84,
  })),

  /* S3 · THE KEY BANK — the cap snaps in, then four cards fire out of the chute
     ASCENDING, because the whole point is that the same press keeps paying. */
  { at: S(L.S3 + 18), src: "snap.wav", v: LEVELS.SFX_MID * db(2), dur: 0.10, rate: 0.94 },
  ...[29, 41, 53, 63].map((fr, i) => ({
    at: S(L.S3 + fr), src: "mallet_tap.wav", v: LEVELS.SFX_MID * db(-1 - i * 0.3),
    dur: 0.26, rate: STEP4[i] * 0.90,
  })),

  /* S4 · THE SPIKE — ⛔ DELIBERATELY THE THINNEST SCENE IN THE BANK AND THE ONLY
     ONE WITH NO BED. Three snatches, one tear, silence around them. Density is a
     SHAPE: this is the trough that makes S5's cyan land. */
  ...[4, 22, 35].map((fr, i) => ({
    at: S(L.S4 + fr), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(1 + i * 0.6),
    dur: 0.18, rate: 1.06 + i * 0.10,
  })),
  { at: S(L.S4 + 42), src: "bamboo_crack.wav", v: LEVELS.SFX_HERO * db(-6), dur: 0.44, rate: 0.88 },

  /* S5 · THE ROCKER — two real key strikes and one settle tone. Thin, because
     the picture is a MODE CHANGE and a mode change is quiet. */
  { at: S(L.S5 + 15), src: "thock.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.20, rate: 0.80 },
  { at: S(L.S5 + 29), src: "thock.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.20, rate: 0.86 },
  { at: S(L.S5 + 44), src: "green_tone.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.75, rate: 1.08 },

  /* S6 · THE ROUTE BOARD — three route ticks ASCENDING as the run is drawn, then
     ONE dry mechanical latch on the gate that does NOT open. */
  { at: S(L.S6), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(3), dur: 2.05, rate: 0.92, lead: 0 },
  ...[2, 16, 30].map((fr, i) => ({
    at: S(L.S6 + fr), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 - i * 0.4),
    dur: 0.35, rate: STEP3[i],
  })),
  /* ⛔ the gate latch came out: the three route ticks ARE this event, and a
     small dry clank under them is the small thing moving with a big one. */

  /* S7 · THE SETUP PLATE — ⭐ THE DENSEST SCENE IN THE BANK. The plate lands on
     the reel's biggest low pair, then four bolts drive ASCENDING. ⛔ The plate is
     BOLTED, not stamped: a wrench, dry and mechanical. */
  { at: S(L.S7 + 12), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.86 },
  /* ⛔ the `sub` under this land came out: if a big thing and a small thing
     move together the small thing is silent, and dropping it is what puts the
     picked cut back inside the 1.0-1.5 cues/sec ceiling at 1.48. */
  ...[26, 38, 50, 62].map((fr, i) => ({
    at: S(L.S7 + fr), src: "wrench_clank.wav", v: LEVELS.SFX_MID * db(1 - i * 0.3),
    dur: 0.10, rate: STEP4[i] * 0.92,
  })),

  /* S8 · THE SHIFT LINE — the reader head sweeping is the bed, and three strips
     seat UP a scale, because the reading is progressive and one thing at a time
     is what the file actually does. */
  { at: S(L.S8), src: "motor_sag.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.90, rate: 0.82, lead: 0 },
  ...[17, 38, 51].map((fr, i) => ({
    at: S(L.S8 + fr), src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(-2),
    dur: 0.38, rate: STEP3[i],
  })),

  /* S9 · THE FLOOD — the peak. One enormous low as the flood comes up, the rail
     bed comes up under it, and three bank passes ASCEND as they go by. */
  { at: S(L.S9 + 2), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-1), dur: 0.90, rate: 0.94 },
  { at: S(L.S9), src: "stage_hum.wav", v: LEVELS.SFX_BED * db(7), dur: 2.05, rate: 1.02, lead: 0 },
  ...[16, 34, 52].map((fr, i) => ({
    at: S(L.S9 + fr), src: "lamp_clunk.wav", v: LEVELS.SFX_MID * db(-1 - i * 0.4),
    dur: 0.30, rate: STEP3[i] * 0.96,
  })),

  /* S10 · THE HAND-OVER — the slide, and the counter bell on the arrival. */
  { at: S(L.S10 + 6), src: "gear_shift.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.12, rate: 0.88 },
  { at: S(L.S10 + 18), src: "bell_ring.wav", v: LEVELS.SFX_HERO * db(-7), dur: 1.65, rate: 1.10 },

  /* S11 · THE CTA — the keyword stamps LOW and one low resolve under it.
     ⛔ nothing bright: `resolve` attacks in 176ms, over the 150ms line at which
     a non-bed cue stops being a hit and becomes a swell. */
  { at: S(L.S11 + 1), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.55, rate: 0.90 },
  { at: S(L.S11 + 6), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.85, rate: 0.92 },
];

/* ---- THE MIX --------------------------------------------------------------
   ⭐ THE BED IS 12+ dB UNDER THE VOICE AND THE FINAL VOLUME IS INSIDE THE
   STANDING 0.25 CAP (Alex: *"the background music is too loud compared to the
   voiceover"*). The VO measures -16 LUFS and plays at `DIALOGUE` (-6 dB), so it
   lands at -22.
   ⛔⛔⛔ AND THE BED IS A REAL TRACK, NOT A SYNTHESISED PAD
   ([[feedback_house_bed_is_a_real_track]] — reels 107-116 drifted onto a
   generated bed one clone at a time and every audio gate stayed green). Both
   files below are house tracks, and both are BASS-FORWARD, which is the half of
   that rule reel 122 still got wrong: `ados_bed_loud` is 90.0% under 250 Hz and
   `ebm_bed_hot` is 65.8%, against 14.9-28.8% for every bed that got a note.
   ⛔ AND THE ONSET IS MEASURED, NOT ASSUMED: `verify_reel`'s MUSIC_ONSET_0 wants
   the bed audible inside 150 ms — ados_bed_loud 10ms ✓ · ebm_bed_hot 15ms ✓ ·
   ebm_bed 280ms ⛔ (not used).
   ⛔ AND USE THE OPENING STATEMENT ([[feedback_the_bed_drifted_to_the_end]] —
   124 and 125 both scored a window 168.96s into a 229s master and shipped the
   dropout inside it). All three cuts start at 0.00 of their own file. */
export const s0CuesFor = s0Cues;

export const BED: Record<Variant, string> = {
  house: "130library_bed_house.wav",
  amber: "130library_bed_amber.wav",
  steel: "130library_bed_steel.wav",
};
/* ⛔⛔⛔ THE SOUNDTRACK WAS INAUDIBLE AND EVERY GATE SAID IT WAS FINE. Alex:
   *"where is the soundtrack???"* `verify_reel`'s MUSIC_ONSET_0 and
   MUSIC_CONTINUOUS both passed, and the arithmetic said the bed sat 13.6 dB
   under the voice — the house figure, the one reel 127 shipped on.
   ⭐ THE BUG: the gain was derived from the FILE'S INTEGRATED LUFS (-23.2), and
   LUFS is gated and K-weighted. The RMS of the 30 seconds the reel actually
   PLAYS is **-28.0**. Times MUSIC (-20 dB) that put the bed near -40 dB under a
   -22 LUFS voice, which is below the level anyone hears.
   ⭐⭐ THE RULE: DERIVE A BED GAIN FROM THE MEASURED RMS OF THE WINDOW YOU PLAY,
   never from the file's integrated loudness. And when the right track is too
   quiet at source, fix it in the FILE — lifting it at playback needed db(+12.6),
   which puts the final volume at 0.427 against the standing 0.25 cap.
   ⛔ AND A MEAN OVER A WINDOW HIDES THE DROPOUT IN IT, so each candidate was
   scanned in 1.5s bins for its WORST bin, not its average:
     ebm_bed_hot   @ 0s  mean -21.4  worst -34.8  spread 13.4  ⛔
     ebm_bed_hot   @21s  mean -14.8  worst -24.1  spread  9.4  ⛔
     ados_bed_loud @15s  mean -25.8  worst -28.2  spread  2.5  ✅  <- house
     ados_bed_loud @ 0s  mean -28.0  worst -31.5  spread  3.5  ✅  <- steel
   `tools/lby_beds.py` builds all three, each normalised to -18.4 dB RMS, so ONE
   modest gain serves all three and the bed lands at -33 dB — **11 dB under the
   voice instead of 18** — at a final volume of 0.186, inside the 0.25 cap.
   ⛔ THEY ARE STILL THREE DIFFERENT PASSAGES: an audio-only variant is a pixel
   duplicate, and the bed is one of the axes a trial cut varies on. */
/* ⭐ AND THEN TAKEN TO THE CEILING THE STANDING CAP ALLOWS. db(5.4) put the bed
   at -33.0 (a measured +7.4 dB over the version Alex could not hear); db(7.8)
   puts it at **-30.6, i.e. +9.8 dB**, at a final volume of **0.245** against the
   0.25 cap from *"the background music is too loud compared to the voiceover"*.
   That is the loudest this bed is allowed to be, and it is the right side of the
   cap to be sitting on when the note was that it was missing. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.8), amber: db(7.8), steel: db(7.8),
};
export const BED_QUIET = db(-6);

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1252, amber: 1332, steel: 1176 };

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("130library_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={makeSFX(hook)} />

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
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any[]} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} v={v} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   ⛔ A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme — nothing below
   says "the prompt counter".
   ⛔⛔ A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT
   ONE. On reel 122 the opening band printed the reel's final number over the
   eighteen seconds in which the VO was still building it, and a viewer who read
   it at 2s had no reason to watch the rest.
   ⛔⛔ AND THE BAND STATES THE VALUE, NOT THE LABEL
   ([[feedback_the_band_states_the_value]] — "/design · RESEARCH PREVIEW" names
   the thing and never says what you GET). Every band below carries a VALUE; the
   receipts live in the reserved chip band underneath, which is what a chip is
   FOR: something the band cannot carry.
   ⛔ EVERY FIGURE COMES OUT OF `R`, so a band cannot drift off the ledger, and
   `COUNT_BANNED` applies here FIRST: no band prints a total above 52.
   ⛔ EVERY BAND IS CHECKED AGAINST `HookHeader`'s 38px auto-fit floor.
   ====================================================================== */
/* ⭐ SHORTER AND HARDER. Alex: *"try making the title shorter and more
   impactful."* The old set ran to 26 and 30 characters on a band that auto-fits
   down to a 38px floor, so the longest of them were arriving small AND slow to
   read — a title you have to scan is not a title. Every line below is four words
   or fewer and the hot line is two or three, so the pair reads as one hit.
   ⛔ THE NUMBERS STAY HONEST: `R.prompts` is 52 and `R.cats` is 15, both counted
   from the page's own data, and nothing here prints a total above 52. */
const BANDS = [
  /* ⭐ ALEX'S EXACT WORDING, 2026-08-31: line 1 CLAUDE OFFICIAL, line 2 52 PROMPTS.
     `big` renders as l1 and `hot` as l2 in clay (SlopKit HookHeader), so the pair
     goes in that order. Both are 15 characters, which clears the auto-fit's
     22-char budget outright — the header renders at its full 56px rather than
     scaling down, which is the whole point of a short title. */
  { from: L.S0, big: "CLAUDE OFFICIAL", hot: `${R.prompts} PROMPTS` },
  { from: L.S1, big: "NOT YOURS TO WRITE", hot: "THEY EXIST" },
  { from: L.S2, big: "CAST BY ANTHROPIC", hot: "THEIR OWN GUIDES" },
  { from: L.S3, big: "1 · MAKE IT A SKILL", hot: "TYPE ONE WORD" },
  { from: L.S4, big: "OR RETYPE IT FOREVER", hot: "EVERY TIME" },
  { from: L.S5, big: "2 · SHIFT + TAB", hot: "PLAN MODE" },
  { from: L.S6, big: "IT MAPS THE JOB", hot: "BEFORE ANY CODE" },
  { from: L.S7, big: `3 · ADD ${R.mdFile}`, hot: "ONE FILE" },
  { from: L.S8, big: "IT LEARNS YOUR RULES", hot: "EVERY SESSION" },
  { from: L.S9, big: "THE WHOLE SHELF", hot: `${R.cats} CATEGORIES` },
  { from: L.S10, big: "COPY ONE, FILL IT IN", hot: R.url },
  { from: L.S11, big: "COMMENT", hot: R.keyword },
];

/** ⛔ the band is IDENTICAL across the three cuts and it owns the top two rows
    of an 8x8 dHash. A per-cut Y nudge is the cheapest way to stop it flattening
    the only cells the hook's own per-cut layout cannot reach. */
const BAND_DY: Record<Variant, number> = { house: 0, amber: 24, steel: -20 };

const SectionBand: React.FC<{ f: number; v: Variant }> = ({ f, v }) => {
  /* ⛔⛔ THE HOOK KEEPS ITS HEADER. Reel 122 took the band off the hook on one
     round and was asked *"where is the header in the hook scene"* on the next.
     And the measured evidence was always on this side: across reel 94's six
     trial cuts the two that performed opened with a cream claim plate. */
  let cur = BANDS[0];
  for (const b of BANDS) if (f >= b.from) cur = b;
  const local = f - cur.from;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${BAND_DY[v]}px)`,
      pointerEvents: "none" }}>
      {/* ⛔ `at0` on the FIRST band only — the reel opens with its claim already
             on screen, because SlopKit ramps `settle` over 0.34s and every house
             gate reads frame 0. */}
      <HookHeader big={cur.big} hot={cur.hot} f={local} at0={cur.from === L.S0} />
    </div>
  );
};
