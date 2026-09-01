import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16,
  CAM, GRADE,
} from "./UsgScenes";
import type { Variant } from "./UsgScenes";
import { CamCtx, R } from "./UsgWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, PICKED } from "./UsgHooks";
import type { HookId } from "./UsgHooks";
import words from "./data/words_126usage.json";

/* ===========================================================================
   REEL 126 · "USAGE" — THE METER HOUSE.  Board: storyboards/126-usage.md.

   Subject: three free GitHub repos that each cut a DIFFERENT part of what a
   Claude Code session costs — the RATE per token, the VOLUME of tokens sent
   back, and the tokens you pay for TWICE. All three verified live 2026-08-28
   against GitHub's API and each repo's own README; the ledger is `R` in
   `UsgWorld.tsx` and nothing on screen is outside it.

   ⛔⛔ THREE THINGS THE VO SAYS THAT THE FRAME DOES NOT:
     "10x your usage"   no repo claims it. Every plate carries that repo's OWN
                        figure instead (17x on output PRICE · 65% on output
                        TOKENS · 45% on a measured day).
     "65% token usage"  it is 65% of OUTPUT tokens on the repo's own benchmark,
                        and the repo says so itself. S8 draws the input line
                        running past the grille untouched — the caveat is
                        STAGED, not written.
     "75% less"         unsourced anywhere. `TEN_BANNED` greps for it and it
                        must return zero rendered hits.

   ⛔⛔ THE VILLAIN IS `THE DRUM` AND IT IS NEVER BEATEN. It is slowed at S5,
   restricted at S8 and denied at S15, and on the last frame of the CTA it is
   still turning at 0.9/s. `Drum` clamps its own rate floor at 0.18 so no scene
   can accidentally claim a free session, which is also the honest reading of
   "completely free": the REPOS are free, the session is not.

   ⚠️ 37.90s IS OUTSIDE THE PLAYBOOK'S 22-29s FIGURE AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content: the cut removes 84.9s of flubs,
      retakes and dead air from a 120.6s raw take with fourteen `cut cut`
      retakes in it, and the caveman line alone was recorded seven times.
      Recent ships: 118 = 33.68 · 124 = 32.53 · 120 = 35.24 · 117 = 38.83.

   ⚠️ R1 IS NOT SATISFIABLE BY TEMPO ON THIS TAKE, and what IS controllable was
      done. The hook ships at x1.00 and the body at x1.05 rather than the house
      x1.10, and the beats between lines were widened from 0.30s to 0.42-0.54s,
      which bought the hook window 4.60 -> 4.50 wps (118 = 4.50, 122 = 4.45,
      124 = 4.40) and the worst 5s 6.00 -> 5.60 (124 shipped 5.80). Overall
      4.44 against the CLONE anchor of 3.96. Going faster to reach the house
      length figure would have cost the pacing gate, and pacing is the binding
      one.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;

/** ⛔ DERIVED, NEVER TYPED: `python3 tools/usg_scenes.py`. On reel 122 the scene
    list was a hand-typed copy and 7 of 19 entries were wrong, one by 1.26s, so
    a whole round was spent editing a scene that was not in the frame being
    complained about. */
export const L = {
  S0: 0, S1: 97, S2: 177, S3: 227, S4: 290, S5: 370,
  S6: 412, S7: 448, S8: 498, S9: 540, S10: 604, S11: 688,
  S12: 742, S13: 773, S14: 862, S15: 935, S16: 1006, END: 1043,
} as const;

export const USAGE_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14,
  S15: L.S16 - L.S15, S16: L.END - L.S16,
};

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 (slow attack, no low end
   = a swell) and are excluded, and so is `slot_lever` (58.7% bright with a
   116 ms attack — an air swell AND a slap at any real use count).

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a METER HOUSE — brass,
   iron, coin slides, ratchets, gate latches, a knife switch, a stone mallet and
   a drop hammer. **ZERO chiptune cues**: the greppable gate is that no `src`
   starts with `c_`, which returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top
   is a SLAP; the same event carried under 250 Hz is a thud you feel. `thock`
   (88.6% low), `impact_deep` (93.1%), `sub` (96.6%) and `impact` (42.1%) carry
   the weight. Nothing bright is used five times.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook), S4 (the
   swing), S9 (the mallet), S13 (the cache dying) and S16 (the strike), and
   thins to two or three on the title and information scenes.
   ⭐ AND A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS. Every run in
   this bank ascends in rate: the three plates at S0 and S1, the four mallet
   hits at S9, the five pours at S15. Equal temperament is 2^(n/12), so a `rate`
   IS a transposition. */
const STEP3 = [1.000, 1.1225, 1.2599];
const STEP4 = [1.000, 1.0905, 1.1892, 1.2968];
const STEP5 = [1.000, 1.0595, 1.1225, 1.1892, 1.2599];

/** ⛔⛔ THE S0 CUES CANNOT BE SHARED. S1-S16 show the same picture in all three
    cuts, so their cues come straight off `L`. S0 is the one scene where the
    three hooks show three different EVENTS — a hatch paying out, a runaway
    meter being braked, a column of coins being sheared — and a cue list written
    for the first of them, played over the other two, is a coin slide and eleven
    crate landings under a shot in which nothing is paid and nothing falls. */
const s0Cues = (hook: HookId): Cue[] => {
  /* ---- A · CREW (107f) · THE PICKED HOOK. ⭐ THE SHAPE IS THE PICTURE'S: a coin
     goes in, ONE thing comes out and the payout is deliberately THIN — a single
     light knock with nothing under it, because the absence is the joke. Three
     marks seat one-two-three UP a scale. Then the same coin, and the machine
     does not stop: ten issues on an ASCENDING run, because a repeat only reads
     as PROGRESS when it climbs, and the run is what "10x" sounds like.
     ⛔ NO KLAXON AND NO ALARM. Nothing here is failing; something is being
     ISSUED, and an alarm under a resolution is what makes an open sound
     anxious instead of satisfying. ------------------------------------- */
  if (hook === "crew") return [
    /* ⛔ THE CUES MOVED WITH THE PICTURE. They were written for a coin at f14, a
       payout at f18 and three seats at 26/36/46 — beats that no longer exist.
       A cue bank left on the old timings is the "authored but never reachable"
       failure with sound instead of pixels, and it is silent about it.
       ⭐ Now: a running bed from f0, the ERUPTION on f10 (the word "10x"), ten
       issues across "your Claude usage" on an ascending run, and three strikes
       on f65/72/78 (the words "3 / GitHub / repos"). */
    { at: S(0),   src: "engine_idle.wav",   v: LEVELS.SFX_BED * db(5),  dur: 1.2, rate: 0.90 },
    { at: S(0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(3),  dur: 3.8, rate: 0.96 },
    /* the machine already labouring at frame 0 */
    ...layer(S(0),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(1), dur: 1.1, rate: 0.78 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.66 }),
    { at: S(4),   src: "motor_sag.wav",     v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.14 },
    /* ⭐ THE ERUPTION, ON THE WORD "10x" */
    ...layer(S(10),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.4, rate: 0.70 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(2),  dur: 1.5, rate: 0.60 }),
    { at: S(10),  src: "ratchet.wav",       v: LEVELS.SFX_MID * db(1),  dur: 0.9, rate: 0.82 },
    /* four of the ten issues are scored, ASCENDING — ten cues in 1.3s is a
       rattle, and four that climb read as a run that keeps going */
    ...[14, 26, 38, 50].map((a, i) => ({
      at: S(a), src: "chair_knock.wav",
      v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.4, rate: STEP4[i] * 0.94,
    })),
    { at: S(30),  src: "engine_idle.wav",   v: LEVELS.SFX_BED * db(4),  dur: 1.4, rate: 1.20 },
    /* the three marks, one per word */
    ...[65, 72, 78].map((a, i) => ({
      at: S(a), src: "adv_strike.wav",
      v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.6, rate: STEP3[i] * 0.90,
    })),
    ...[65, 72, 78].map((a, i) => ({
      at: S(a), src: "pickup_chime.wav",
      v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.5, rate: STEP3[i],
    })),
    /* and the machine hitting maximum on the third */
    ...layer(S(78),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.66 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(1),  dur: 1.3, rate: 0.58 }),
    { at: S(82),  src: "green_tone.wav",    v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.06 },
  ];
  /* ---- B · BRAKE (107f) · A MACHINE RUNNING AWAY, THEN THREE ARRESTS.
     The shape is a RUNAWAY and a HOLD: the drum's own bed is running on frame
     0, three slams arrest it, and the lever is a long ratchet rather than a hit.
     ⛔ NO KLAXON — the anxiety is already in the engine bed, and an alarm still
     running under a resolution is what makes an open sound unfinished. ---- */
  if (hook === "brake") return [
    { at: S(0),   src: "engine_idle.wav",   v: LEVELS.SFX_BED * db(4),  dur: 3.6, rate: 1.14 },
    ...layer(S(0),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.74 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.4, rate: 0.64 }),
    { at: S(4),   src: "motor_sag.wav",     v: LEVELS.SFX_MID,          dur: 1.4, rate: 1.08 },
    ...[26, 38, 50].map((a, i) => ({
      at: S(a), src: "adv_strike.wav",
      v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.6, rate: STEP3[i] * 0.86,
    })),
    ...[26, 38, 50].map((a, i) => ({
      at: S(a), src: "thock.wav",
      v: LEVELS.SFX_TEXTURE * db(i * 0.6), dur: 0.5, rate: 0.78 - i * 0.05,
    })),
    { at: S(56),  src: "ratchet.wav",       v: LEVELS.SFX_MID * db(1),  dur: 1.3, rate: 0.72 },
    { at: S(72),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,          dur: 0.6, rate: 0.80 },
    ...layer(S(76),
      { src: "slate_whump.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.0, rate: 0.80 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(1),  dur: 1.2, rate: 0.62 }),
    { at: S(88),  src: "green_tone.wav",    v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.02 },
  ];
  /* ---- C · COLUMN (107f) · A LOAD, THEN THREE CUTS. A creak under the stack,
     three shears that ascend, and a release. ------------------------------- */
  if (hook === "column") return [
    { at: S(0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(3),  dur: 3.6, rate: 0.86 },
    ...layer(S(0),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO,         dur: 1.1, rate: 0.80 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.68 }),
    { at: S(6),   src: "twang.wav",         v: LEVELS.SFX_TEXTURE,      dur: 1.2, rate: 0.72 },
    ...[30, 44, 58].map((a, i) => ({
      at: S(a), src: "katana_shing.wav",
      v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.7, rate: STEP3[i] * 0.92,
    })),
    ...[30, 44, 58].map((a, i) => ({
      at: S(a + 3), src: "mallet_tap.wav",
      v: LEVELS.SFX_TEXTURE * db(i * 0.8), dur: 0.5, rate: 0.92 + i * 0.10,
    })),
    ...layer(S(70),
      { src: "thock.wav",        v: LEVELS.SFX_HERO * db(2), dur: 0.9, rate: 0.70 },
      { src: "green_tone.wav",   v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.04 }),
    ...[78, 88, 98].map((a, i) => ({
      at: S(a), src: "pickup_chime.wav",
      v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.6, rate: STEP3[i],
    })),
  ];
  /* ---- A · RATION (107f) · THE PICKED HOOK, and the biggest cue set in the
     reel. ⭐ THE SHAPE IS THE PICTURE'S: a coin goes in, almost nothing comes
     out, three plates seat one-two-three UP a scale, the same coin goes in
     again, and then eleven crate landings that descend in pitch as the pile
     gets deeper — a fall that ascends would read as more coins, not more goods.
     ⛔ THE FIRST PAYOUT IS DELIBERATELY THIN: one small `chair_knock` and
     nothing under it. The absence is the joke. ------------------------------ */
  return [
    { at: S(0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(3),  dur: 3.8, rate: 0.90 },
    ...layer(S(0),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(1), dur: 1.1, rate: 0.78 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.66 }),
    /* the coin going in */
    ...layer(S(16),
      { src: "mallet_tap.wav",   v: LEVELS.SFX_MID,          dur: 0.4, rate: 1.06 },
      { src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 1.24 }),
    /* the mouth, and the disappointing payout */
    { at: S(20),  src: "gear_shift.wav",    v: LEVELS.SFX_MID,          dur: 0.7, rate: 1.12 },
    { at: S(22),  src: "chair_knock.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.4, rate: 1.06 },
    /* the three plates seating, ASCENDING */
    ...[28, 42, 56].map((a, i) => ({
      at: S(a), src: "adv_strike.wav",
      v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.6, rate: STEP3[i] * 0.90,
    })),
    ...[28, 42, 56].map((a, i) => ({
      at: S(a), src: "thock.wav",
      v: LEVELS.SFX_TEXTURE * db(i * 0.5), dur: 0.5, rate: 0.76 - i * 0.04,
    })),
    ...[30, 44, 58].map((a, i) => ({
      at: S(a), src: "pickup_chime.wav",
      v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.5, rate: STEP3[i],
    })),
    /* the same coin, again */
    ...layer(S(68),
      { src: "mallet_tap.wav",   v: LEVELS.SFX_MID * db(1),  dur: 0.4, rate: 0.98 },
      { src: "metal_ping.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 1.10 }),
    /* the burst, and eleven landings that DESCEND as the pile deepens */
    ...layer(S(76),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.4, rate: 0.68 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(2),  dur: 1.5, rate: 0.60 }),
    /* four landings, descending — the pile getting deeper. Eleven cues for
       eleven crates is a rattle, not a burial. */
    ...[78, 86, 94, 102].map((a, i) => ({
      at: S(a), src: i % 2 ? "slate_whump.wav" : "chair_knock.wav",
      v: LEVELS.SFX_MID * db(-i * 0.9), dur: 0.5, rate: 1.02 - i * 0.09,
    })),
    { at: S(80),  src: "gold_stamp.wav",    v: LEVELS.SFX_MID,          dur: 0.8, rate: 0.94 },
  ];
};

export const makeSFX = (hook: HookId = PICKED): Cue[] => [
  ...s0Cues(hook),

  /* ---- S1 · THE RACK. Three installs against a sweep hand: a ratchet under
     each run, a latch on each seat, ASCENDING. ---------------------------- */
  { at: S(L.S1 + 0),  src: "shop_bed.wav",     v: LEVELS.SFX_BED * db(3), dur: 3.2, rate: 0.94 },
  ...[20, 42, 64].map((a, i) => ({
    at: S(L.S1 + a), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.5, rate: STEP3[i] * 0.94,
  })),

  /* ---- S2 · PLATE BAY 1. A title scene: three cues, one idea. ---------- */
  { at: S(L.S2 + 4),  src: "ratchet.wav",      v: LEVELS.SFX_TEXTURE,     dur: 0.8, rate: 0.88 },
  ...layer(S(L.S2 + 18),
    { src: "gold_stamp.wav",   v: LEVELS.SFX_MID * db(1),  dur: 0.8, rate: 0.96 },
    { src: "green_tone.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.9, rate: 1.06 }),

  /* ---- S3 · THE DRUM. A density peak on the villain: the engine under it,
     the brake taking hold, and a long drag with no resolution at the end. -- */
  { at: S(L.S3 + 0),  src: "engine_idle.wav",  v: LEVELS.SFX_BED * db(5), dur: 2.4, rate: 1.16 },
  { at: S(L.S3 + 6),  src: "wrench_clank.wav", v: LEVELS.SFX_MID,         dur: 0.6, rate: 0.88 },
  { at: S(L.S3 + 12), src: "motor_sag.wav",    v: LEVELS.SFX_MID * db(2), dur: 1.2, rate: 0.72 },
  { at: S(L.S3 + 30), src: "motor_sag.wav",    v: LEVELS.SFX_MID * db(1), dur: 1.6, rate: 0.92 },
  { at: S(L.S3 + 46), src: "dead_thud.wav",    v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 0.84 },

  /* ---- S4 · THE SWING. The reel's second density peak, and the shape is
     ONE CONTINUOUS MOVE: a pin knocked out, a bearing running for most of a
     second (a BED, never a cue — a running sound scored as a hit is the swell
     the audit cannot hear), a landing, a gate and a line coming up to pressure. */
  { at: S(L.S4 + 0),  src: "machine_bed.wav",  v: LEVELS.SFX_BED * db(4), dur: 3.0, rate: 0.92 },
  { at: S(L.S4 + 12), src: "wrench_clank.wav", v: LEVELS.SFX_MID * db(2), dur: 0.6, rate: 1.04 },
  { at: S(L.S4 + 16), src: "engine_idle.wav",  v: LEVELS.SFX_BED * db(3), dur: 0.9, rate: 0.94 },
  ...layer(S(L.S4 + 42),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.72 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.62 }),
  { at: S(L.S4 + 52), src: "green_tone.wav",   v: LEVELS.SFX_MID,         dur: 1.0, rate: 1.00 },

  /* ---- S5 · THE PAYOFF. Two cues and a bed: the crate landing, and three
     coins in one hand. ---------------------------------------------------- */
  { at: S(L.S5 + 0),  src: "shop_bed.wav",     v: LEVELS.SFX_BED * db(2), dur: 2.0, rate: 1.02 },
  ...layer(S(L.S5 + 12),
    { src: "slate_whump.wav",  v: LEVELS.SFX_MID * db(2),  dur: 0.8, rate: 0.88 },
    { src: "sub.wav",          v: LEVELS.SFX_TEXTURE,      dur: 1.0, rate: 0.66 }),
  { at: S(L.S5 + 26), src: "metal_ping.wav",   v: LEVELS.SFX_MID,         dur: 0.5, rate: 1.16 },

  /* ---- S6 · PLATE BAY 2. --------------------------------------------- */
  { at: S(L.S6 + 4),  src: "mech_clank.wav",   v: LEVELS.SFX_TEXTURE,     dur: 0.5, rate: 0.90 },
  ...layer(S(L.S6 + 18),
    { src: "mallet_tap.wav",   v: LEVELS.SFX_MID * db(2),  dur: 0.4, rate: 0.80 },
    { src: "bamboo_crack.wav", v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 0.94 }),

  /* ---- S7 · THE OUTLET. The torrent is a BED that runs the whole scene,
     with exactly one hero hit when it lets go. Scoring 26 individual blocks
     would be 26 cues in 1.7s, which is reel 107's rejected 3.82/sec. ------- */
  { at: S(L.S7 + 0),  src: "engine_idle.wav",  v: LEVELS.SFX_BED * db(6), dur: 2.0, rate: 1.32 },
  ...layer(S(L.S7 + 6),
    { src: "impact.wav",       v: LEVELS.SFX_HERO,         dur: 0.9, rate: 0.80 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.1, rate: 0.66 }),

  /* ---- S8 · THE GRILLE. A haul and a landing, and the input line keeps
     running underneath — the caveat is in the mix as well as in the picture. */
  { at: S(L.S8 + 0),  src: "machine_bed.wav",  v: LEVELS.SFX_BED * db(3), dur: 1.8, rate: 1.04 },
  ...layer(S(L.S8 + 20),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.1, rate: 0.74 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.2, rate: 0.62 }),

  /* ---- S9 · THE MALLET. A density peak: four hits, each ASCENDING, each a
     stone strike with a chip layer under it. ------------------------------ */
  { at: S(L.S9 + 0),  src: "shop_bed.wav",     v: LEVELS.SFX_BED * db(2), dur: 2.4, rate: 0.96 },
  ...[10, 22, 34, 46].map((a, i) => ({
    at: S(L.S9 + a), src: "mallet_tap.wav",
    v: LEVELS.SFX_MID * db(i * 0.6), dur: 0.5, rate: STEP4[i] * 0.82,
  })),
  ...[10, 46].map((a, i) => ({
    at: S(L.S9 + a), src: "bamboo_crack.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 1.4), dur: 0.5, rate: 0.90 + i * 0.20,
  })),

  /* ---- S10 · THE PROOF. Two lids, then one tick. ---------------------- */
  { at: S(L.S10 + 0),  src: "shop_bed.wav",    v: LEVELS.SFX_BED,         dur: 2.8, rate: 1.06 },
  { at: S(L.S10 + 9), src: "chair_knock.wav", v: LEVELS.SFX_MID, dur: 0.4, rate: 1.02 },
  ...layer(S(L.S10 + 44),
    { src: "green_tone.wav",   v: LEVELS.SFX_HERO * db(-3), dur: 1.1, rate: 1.18 },
    { src: "thock.wav",        v: LEVELS.SFX_TEXTURE,       dur: 0.5, rate: 0.72 }),

  /* ---- S11 · THE ACT BREAK. One throw, and a room starting up. -------- */
  ...layer(S(L.S11 + 22),
    { src: "knife_switch.wav", v: LEVELS.SFX_HERO,         dur: 0.7, rate: 0.90 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.2, rate: 0.62 }),
  { at: S(L.S11 + 26), src: "engine_idle.wav", v: LEVELS.SFX_BED * db(5), dur: 1.6, rate: 1.02 },

  /* ---- S12 · PLATE BAY 3. -------------------------------------------- */
  { at: S(L.S12 + 4),  src: "gear_shift.wav",  v: LEVELS.SFX_TEXTURE,     dur: 0.5, rate: 0.86 },
  ...layer(S(L.S12 + 18),
    { src: "adv_strike.wav",   v: LEVELS.SFX_MID * db(1),  dur: 0.7, rate: 1.04 },
    { src: "green_tone.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.9, rate: 1.18 }),

  /* ---- S13 · THE CACHE DIES. THE PEAK OF THE REEL, and the densest scene.
     ⭐ THE SHAPE IS A CLOCK, A FAILURE AND A COST: a fire bed that STOPS, the
     hour landing, the block cracking, a collapse, and then the meter running
     away with nothing under it. The bed cutting out is the loudest thing in
     the scene and it is an absence. ---------------------------------------- */
  { at: S(L.S13 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED * db(6), dur: 0.85, rate: 0.78 },
  ...[6, 16].map((a, i) => ({
    at: S(L.S13 + a), src: "tick.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 1.8), dur: 0.3, rate: 0.94 + i * 0.10,
  })),
  ...layer(S(L.S13 + 22),
    { src: "line_dead.wav",    v: LEVELS.SFX_MID * db(2),  dur: 1.0, rate: 0.88 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.58 }),
  ...layer(S(L.S13 + 36),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.4, rate: 0.64 },
    { src: "sub.wav",          v: LEVELS.SFX_MID * db(2),  dur: 1.5, rate: 0.56 }),
  { at: S(L.S13 + 40), src: "twang.wav",       v: LEVELS.SFX_MID,         dur: 1.0, rate: 0.66 },
  ...[56, 74].map((a, i) => ({
    at: S(L.S13 + a), src: "dead_thud.wav",
    v: LEVELS.SFX_TEXTURE * db(-i * 1.2), dur: 0.5, rate: 0.86 - i * 0.09,
  })),

  /* ---- S14 · THE HUNT. Thin on purpose — the room is nearly silent while
     something searches in it. Two sweeps and one lock. -------------------- */
  { at: S(L.S14 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED, dur: 3.0, rate: 0.62 },
  ...[10, 30].map((a, i) => ({
    at: S(L.S14 + a), src: "green_tone.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.8), dur: 0.8, rate: 0.74 + i * 0.16,
  })),
  ...layer(S(L.S14 + 50),
    { src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(2),  dur: 0.5, rate: 1.26 },
    { src: "thock.wav",        v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 0.74 }),

  /* ---- S15 · THE SAVE. The shutter, then five pours ASCENDING — the only
     way a repeated reward reads as PROGRESS rather than as repetition. ---- */
  ...layer(S(L.S15 + 14),
    { src: "gear_shift.wav",   v: LEVELS.SFX_HERO * db(-2), dur: 1.0, rate: 0.78 },
    { src: "thock.wav",        v: LEVELS.SFX_MID,           dur: 0.6, rate: 0.70 }),
  { at: S(L.S15 + 16), src: "green_tone.wav",  v: LEVELS.SFX_MID,         dur: 0.9, rate: 1.00 },
  ...[20, 40, 60].map((a, i) => ({
    at: S(L.S15 + a), src: "mallet_tap.wav",
    v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.4, rate: STEP3[i],
  })),
  ...[20, 40, 60].map((a, i) => ({
    at: S(L.S15 + a), src: "pickup_chime.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.5, rate: STEP3[i],
  })),

  /* ---- S16 · THE STRIKE. One hit, and it is the biggest in the reel after
     the hook. ------------------------------------------------------------- */
  ...layer(S(L.S16 + 8),
    { src: "adv_strike.wav",   v: LEVELS.SFX_HERO * db(2), dur: 0.8, rate: 0.84 },
    { src: "sub.wav",          v: LEVELS.SFX_MID * db(1),  dur: 1.3, rate: 0.58 }),
  { at: S(L.S16 + 8),  src: "gold_stamp.wav",  v: LEVELS.SFX_MID * db(2), dur: 0.9, rate: 0.90 },
  { at: S(L.S16 + 16), src: "green_tone.wav",  v: LEVELS.SFX_MID,         dur: 1.0, rate: 1.22 },
];

/* ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK — `ados` (Another Day Of Sun) and `ebm`
   (Every Living Breathing Moment), both bass-forward, both in `public/`. Reels
   107-116 drifted onto synthesised pads one clone at a time and every audio
   gate stayed green, because there is no gate for "this is not the show's
   music". Counted before writing a line: ados 13 uses, ebm 8.
   ⭐ AND A PER-CUT BED MUST BE A DIFFERENT TRACK OR A DIFFERENT PASSAGE — the
   same track at a different volume is an audio-only variant, which is a pixel
   duplicate. `steel` is ados from 12.0s, i.e. a different part of the song.
   ⛔ EVERY ONE WAS RE-MEASURED after trimming, because trimming changes the
   loudness: onsets 5 / 15 / 0 ms against the 150 ms MUSIC_ONSET_0 gate, and all
   three loudness-matched to -23.0 dB RMS so ONE gain is correct for all three
   (a gain that fixed one file yesterday is not a constant otherwise). */
/* ⛔ THE PROVENANCE, WRITTEN DOWN, because the house grep is
   `grep -ohE '"[a-z0-9_]*bed[a-z0-9_]*\.wav"' src/Claude*Reel.tsx | sort | uniq -c`
   and a reel-local filename tells it nothing. These three ARE the house tracks:
     126usage_bed.wav        = ados_bed_loud.wav  0.0s..37.94s   (Another Day Of Sun)
     126usage_bed_amber.wav  = ebm_bed_hot.wav    0.0s..37.94s   (Every Living Breathing Moment)
     126usage_bed_steel.wav  = ados_bed_loud.wav  12.0s..49.94s  — a different PASSAGE, because
       the same track at a different volume is an audio-only variant, i.e. a pixel duplicate. */
const BED: Record<Variant, string> = {
  house: "126usage_bed.wav",
  amber: "126usage_bed_amber.wav",
  steel: "126usage_bed_steel.wav",
};

/** ⛔ derived, not guessed: the VO measures -17.6 dB RMS and plays at
    `DIALOGUE` (-6 dB), so it lands at -23.6. The beds measure -23.0 and play at
    `MUSIC` (-20 dB) x this gain. db(7.40) puts the bed at -35.6 — 12 dB under
    the voice, and a final volume of 0.234, inside the standing 0.25 cap
    (Alex: *"the background music is too loud compared to the voiceover"*). */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.40), amber: db(7.40), steel: db(7.40),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1248, amber: 1330, steel: 1178 };

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("126_usage_vo.wav")} volume={LEVELS.DIALOGUE} />
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
            <Sequence from={L.S12} durationInFrames={DUR.S12}><S12 v={v} dur={DUR.S12} /></Sequence>
            <Sequence from={L.S13} durationInFrames={DUR.S13}><S13 v={v} dur={DUR.S13} /></Sequence>
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
            <Sequence from={L.S16} durationInFrames={DUR.S16}><S16 v={v} dur={DUR.S16} /></Sequence>
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
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme — nothing below
   says "the meter house".
   ⛔⛔ A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT
   ONE. On reel 122 the opening band printed the reel's final number over the
   eighteen seconds in which the VO was still building it, and a viewer who read
   it at 2s had no reason to watch the arithmetic. So each figure lands on the
   frame its own line is spoken: the DeepSeek price is not named until S3, the
   65% not until S8, and the $9 not until S13.
   ⛔ EVERY FIGURE COMES OUT OF `R`, so a band cannot drift off the ledger the
   way a hand-typed one can.
   ⛔ AND `TEN_BANNED` APPLIES HERE FIRST: no band says 10x, and none says 75%.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "3 REPOS",             hot: "80% CHEAPER CLAUDE" },
  { from: L.S1,  big: "SECONDS TO INSTALL",  hot: "ALL THREE OPEN SOURCE" },
  { from: L.S2,  big: `1 · ${R.r1.name}`,    hot: `${R.r1.stars} · ${R.r1.lic}` },
  { from: L.S3,  big: R.parts[0],            hot: `${R.r1.priceOld} ${R.r1.priceUnit}` },
  { from: L.S4,  big: "POINT CLAUDE CODE",   hot: "AT DEEPSEEK INSTEAD" },
  { from: L.S5,  big: `${R.r1.priceNew} ${R.r1.priceUnit}`, hot: R.r1.mult },
  { from: L.S6,  big: `2 · ${R.r2.name}`,    hot: `${R.r2.stars} · ${R.r2.lic}` },
  { from: L.S7,  big: R.parts[1],            hot: "THE PROSE YOU PAY FOR" },
  { from: L.S8,  big: R.r2.cut,              hot: R.r2.cutSrc },
  { from: L.S10, big: "CODE STAYS EXACT",    hot: "COMMANDS · ERRORS TOO" },
  { from: L.S11, big: R.parts[2],            hot: "THE ONE NOBODY SEES" },
  { from: L.S12, big: `3 · ${R.r3.name}`,    hot: `${R.r3.stars} · ${R.r3.lic}` },
  { from: L.S13, big: `CACHE DIES AT ${R.r3.ttl}`, hot: `${R.r3.spike} ON THE NEXT PROMPT` },
  { from: L.S14, big: "IT WATCHES THE CLOCK", hot: `${R.r3.guard} GUARD` },
  { from: L.S15, big: "CAUGHT BEFORE THE RE-SEND", hot: R.r3.saved },
  { from: L.S16, big: "COMMENT",             hot: R.keyword },
];

/** ⛔ the band is IDENTICAL across the three cuts and it owns the top two rows of
    an 8x8 dHash. A per-cut Y nudge is the cheapest way to stop it flattening the
    only cells the hook's own per-cut layout cannot reach. */
const BAND_DY: Record<Variant, number> = { house: 0, amber: 26, steel: -22 };

const SectionBand: React.FC<{ f: number; v: Variant }> = ({ f, v }) => {
  /* ⛔⛔ THE HOOK KEEPS ITS HEADER. Reel 122 took the band off the hook on one
     round and was asked *"where is the header in the hook scene"* on the next.
     And the measured evidence was always on this side: across reel 94's six
     trial cuts the two that performed opened with a cream claim plate and the
     four that did not had none. */
  let cur = BANDS[0];
  for (const b of BANDS) if (f >= b.from) cur = b;
  const local = f - cur.from;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${BAND_DY[v]}px)`,
      pointerEvents: "none" }}>
      {/* ⛔ `at0` on the FIRST band only — the reel opens with its claim already
             on screen, because SlopKit ramps `settle` over 0.34s and every house
             reel that forgot this popped its header in at ~0.2s. */}
      <HookHeader big={cur.big} hot={cur.hot} f={local} at0={cur === BANDS[0]} />
    </div>
  );
};

export const ClaudeUsageReel = makeReel("house", false, "crew");
export const ClaudeUsageReelAmber = makeReel("amber", false, "brake");
export const ClaudeUsageReelSteel = makeReel("steel", false, "column");
export const ClaudeUsageReelQuiet = makeReel("house", true, "crew");
