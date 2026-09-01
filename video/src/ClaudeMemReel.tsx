import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15,
  CAM, GRADE,
} from "./MemScenes";
import type { Variant } from "./MemScenes";
import { CamCtx, R } from "./MemWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, PICKED } from "./MemHooks";
import type { HookId } from "./MemHooks";
import wordsH1 from "./data/words_124mem.json";
import wordsH2 from "./data/words_124mem_h2.json";
import wordsH3 from "./data/words_124mem_h3.json";

/* ===========================================================================
   REEL 124 · "MEM" — THE ASSEMBLY.  Board: storyboards/124-mem.md.

   Subject: Anthropic's memory update, announced 2026-08-25. Claude now writes
   what it learns into individual FILES grouped under TOPICS in Memory settings,
   WHILE you are still talking rather than as a summary afterwards; you can
   read, edit or delete each one; it is on by default on Free, Pro and Max
   across web, desktop and mobile; and it is shared with Cowork, whose tasks run
   in the cloud — which is exactly why a task pinned to your LOCAL files is the
   one place it does not reach.

   ⛔⛔ THE VO SAYS "FOR ALL USERS" AND THE FRAME DOES NOT. Team/Enterprise
   memory is admin-controlled and defaults OFF for individuals, so every plate
   carries `R.plans` = "FREE · PRO · MAX" instead. Standing rule: when a VO
   asserts a result you cannot source, dramatise the MECHANISM and stop at the
   edge of the claim.

   ⛔⛔ THE VILLAIN IS `THE GAP` AND IT IS NEVER BEATEN. It eats the details at
   S3, wins again at S4, is PLATED OVER at S5 — floored, not killed — and it
   re-opens under the severed local line at S14 and wins there. The reel's
   opening problem is its closing caveat, in the same physical object.

   ⚠️ 34.60s IS OUTSIDE THE PLAYBOOK'S 22-29s FIGURE AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content: the cut removes 122.81s of flubs,
      retakes and dead air from a 159.01s raw take containing fourteen `cut cut`
      retakes and two spoken editing directions. Recent ships: 110 = 30.95 ·
      109 = 31.14 · 118 = 33.68 · 117 = 38.83 · 122 = 61.05.

   ⚠️ R1 IS NOT SATISFIABLE BY TEMPO ON THIS TAKE. The densest 5s measures
      5.80 wps at x1.00 and straddles the S12->S13 junction, so it is in the
      recording, not in the speedup. What IS controllable was done: the hook
      ships at x1.00 (hook span 3.70 wps, inside the 4.0 bar; 0-10s = 4.40, in
      family with 118 = 4.50 and 122 = 4.45), the body at x1.05 rather than the
      house x1.08, and a 0.34s beat sits in front of "if you set your tasks".

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;
/** ⭐⭐ ONE CUT PER HOOK TAKE. Alex recorded three hooks and labelled them
    "Hook 1 / Hook 2 / Hook 3"; the first build read that as three takes of one
    line and shipped a single VO across all three cuts. It is three cuts.

    Each take is a different length, so each cut carries its own VO, its own
    caption file and its own scene table — the body spans are identical and only
    the hook span differs, which is why the tables below diverge at S0 and then
    stay parallel. `docs/TRIAL-CUTS.md` calls the HOOK the strongest variant
    lever there is, and this is the strongest form of it: a different spoken
    hook AND a different hook picture per cut, over the same body.

    ⛔ EVERY TABLE IS DERIVED, never typed: `python3 tools/mem_scenes.py --hook=h2`.
    ⛔ AND EVERY HOOK SPAN WAS VERIFIED IN ISOLATION before it was used, per the
    rule that caught the `cut cut` at 22s. H2 had two clean takes and the later
    one ships; H3's wording was settled with large-v3 ("drops an update", where
    medium.en heard "dropped an object"). */
export type LTable = {
  total: number;
  L: Record<"S0" | "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7" | "S8" | "S9"
          | "S10" | "S11" | "S12" | "S13" | "S14" | "S15" | "END", number>;
};

const H1: LTable = {
  total: 976,                 /* CUT 32.53s x 30fps */
  L: { S0: 0, S1: 113, S2: 188, S3: 235, S4: 318, S5: 353, S6: 424, S7: 512,
       S8: 560, S9: 610, S10: 654, S11: 702, S12: 758, S13: 814, S14: 870,
       S15: 934, END: 976 },
};
const H2: LTable = {
  total: 958,                 /* CUT 31.93s x 30fps */
  L: { S0: 0, S1: 88, S2: 171, S3: 219, S4: 304, S5: 340, S6: 401, S7: 494,
       S8: 542, S9: 592, S10: 640, S11: 689, S12: 741, S13: 802, S14: 853,
       S15: 920, END: 958 },
};
const H3: LTable = {
  total: 966,                 /* CUT 32.20s x 30fps */
  L: { S0: 0, S1: 103, S2: 178, S3: 227, S4: 307, S5: 348, S6: 409, S7: 501,
       S8: 550, S9: 600, S10: 643, S11: 697, S12: 748, S13: 809, S14: 860,
       S15: 928, END: 966 },
};

/** the three delivered cuts: a hook take, its picture, its VO and its table */
export const CUTS: Partial<Record<HookId, { t: LTable; vo: string; words: any[] }>> & {
  drop: { t: LTable; vo: string; words: any[] } } = {
  drop:   { t: H1, vo: "124_mem_vo.wav",    words: wordsH1 as any[] },
  head:   { t: H2, vo: "124_mem_vo_h2.wav", words: wordsH2 as any[] },
  swap:   { t: H3, vo: "124_mem_vo_h3.wav", words: wordsH3 as any[] },
  /* `prints` is a candidate that was never picked, so it has no VO of its own —
     it falls back to the h1 timing if it is ever previewed. */
  prints: { t: H1, vo: "124_mem_vo.wav",    words: wordsH1 as any[] },
};
export const MEM_TOTAL = H1.total;

const durs = (L: LTable["L"]) => ({
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.END - L.S15,
});

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 (slow attack, no low end
   = a swell) and are excluded too, and so is `slot_lever` (58.7% bright with a
   116ms attack — an air swell AND a slap at any real use count).

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a RECORDS PLANT — a press,
   a roller belt, latches, label flaps, a roller shutter, an incinerator, a
   barrier, a selector and a drop hammer. **ZERO chiptune cues** — the greppable
   gate is that no `src` starts with `c_`, which returns zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top
   is a SLAP; the same event carried under 250 Hz is a thud you feel. `thock`
   (88.6% low), `impact_deep` (93.1%), `sub` (96.6%) and `impact` (42.1%) carry
   the weight here. Nothing bright is used five times.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook), S5 (the
   press), S6 (the labels), S12 (the barrier) and S15 (the strike), and thins to
   two or three on the information scenes. S2 gets three — it is 1.53s and one
   idea.
   ⭐ AND A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS. Every run in
   this bank ascends in rate: the nine labels at S6, the three feeds at S9, the
   three-note plate at S10. Equal temperament is 2^(n/12), so a `rate` IS a
   transposition. */
/** ⛔⛔ THE S0 CUES CANNOT BE SHARED, AND EVERY OTHER SCENE'S CAN. S1-S15 show
    the same picture in all three cuts, so deriving their cues from that cut's
    own L table is the whole job. S0 is the one scene where the three cuts show
    three different EVENTS — a stack pancaking, a sealed case bursting open, a
    cartridge crossing a room — and a cue list written for the first of them,
    played over the other two, is three descending thuds and a klaxon under a
    shot in which nothing falls and nothing is wrong. It also runs off the end:
    `drop`'s last chime sits at scene-frame 108 and `head` only has 88. */
const s0Cues = (L: LTable["L"], hook: HookId): Cue[] => {
  /* ---- B · HEAD (88f) · A SEALED CASE IS OPENED. The shape is a BREAK and a
     RELEASE: the seal gives on frame 0, two latches let go, the lids leave, and
     then a hoist takes the weight of something coming up out of it. No klaxon —
     nothing here is failing, something is being ISSUED. ------------------- */
  if (hook === "head") return [
    { at: S(L.S0 + 0),  src: "machine_bed.wav",   v: LEVELS.SFX_BED,          dur: 3.0, rate: 0.86 },
    ...layer(S(L.S0 + 0),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.78 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.4, rate: 0.68 }),
    { at: S(L.S0 + 2),  src: "ceramic_crack.wav", v: LEVELS.SFX_MID,          dur: 0.7, rate: 0.88 },
    ...[5, 11].map((a, i) => ({
      at: S(L.S0 + a), src: "mech_clank.wav",
      v: LEVELS.SFX_MID * db(-i * 1.2), dur: 0.5, rate: 0.98 - i * 0.12,
    })),
    ...layer(S(L.S0 + 15),
      { src: "slate_whump.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.0, rate: 0.80 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(1),  dur: 1.2, rate: 0.64 }),
    { at: S(L.S0 + 27), src: "gear_shift.wav",    v: LEVELS.SFX_TEXTURE,      dur: 0.6, rate: 1.10 },
    { at: S(L.S0 + 30), src: "ratchet.wav",       v: LEVELS.SFX_MID,          dur: 1.0, rate: 0.86 },
    { at: S(L.S0 + 50), src: "ratchet.wav",       v: LEVELS.SFX_MID * db(1),  dur: 1.1, rate: 0.72 },
    { at: S(L.S0 + 62), src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE,      dur: 0.6, rate: 0.76 },
    ...layer(S(L.S0 + 68),
      { src: "thock.wav",        v: LEVELS.SFX_HERO * db(3), dur: 0.9, rate: 0.68 },
      { src: "green_tone.wav",   v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.02 }),
    { at: S(L.S0 + 68), src: "gold_stamp.wav",    v: LEVELS.SFX_MID,          dur: 0.8, rate: 0.92 },
    ...[74, 81, 87].map((a, i) => ({
      at: S(L.S0 + a), src: "pickup_chime.wav",
      v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.6, rate: [1.000, 1.1225, 1.2599][i],
    })),
  ];
  /* ---- D · SWAP (103f) · IT ARRIVES QUIETLY. ⭐ THE WORD IN THE LINE IS THE
     BRIEF: no klaxon, no pancake, no burst. A latch, two leaves, a carriage
     running on a rail, and then one hit when it goes in. The reward is the same
     three-part coupling as the other two, because all three takes end on the
     same three words and the payoff is not the thing that should vary. ---- */
  if (hook === "swap") return [
    { at: S(L.S0 + 0),  src: "machine_bed.wav",   v: LEVELS.SFX_BED,          dur: 3.4, rate: 0.90 },
    ...layer(S(L.S0 + 0),
      { src: "knife_switch.wav", v: LEVELS.SFX_MID * db(2),  dur: 0.7, rate: 0.90 },
      { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.3, rate: 0.70 }),
    /* the carriage itself is a BED, not a hit — it runs for most of a second
       and a running sound scored as a cue is the "swell" the audit cannot hear */
    { at: S(L.S0 + 4),  src: "engine_idle.wav",   v: LEVELS.SFX_BED * db(2),  dur: 1.0, rate: 1.06 },
    { at: S(L.S0 + 7),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,          dur: 0.5, rate: 0.96 },
    { at: S(L.S0 + 13), src: "lamp_clunk.wav",    v: LEVELS.SFX_TEXTURE,      dur: 0.6, rate: 0.94 },
    { at: S(L.S0 + 18), src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE * db(-1), dur: 0.4, rate: 1.20 },
    ...layer(S(L.S0 + 26),
      { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.3, rate: 0.72 },
      { src: "sub.wav",          v: LEVELS.SFX_MID * db(2),  dur: 1.4, rate: 0.64 }),
    { at: S(L.S0 + 31), src: "green_tone.wav",    v: LEVELS.SFX_MID,          dur: 0.9, rate: 0.96 },
    { at: S(L.S0 + 45), src: "arrive_chime.wav",  v: LEVELS.SFX_TEXTURE,      dur: 0.8, rate: 0.94 },
    { at: S(L.S0 + 63), src: "arrive_chime.wav",  v: LEVELS.SFX_MID,          dur: 0.9, rate: 1.06 },
    ...layer(S(L.S0 + 80),
      { src: "thock.wav",        v: LEVELS.SFX_HERO * db(3), dur: 0.9, rate: 0.68 },
      { src: "green_tone.wav",   v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.02 }),
    { at: S(L.S0 + 80), src: "gold_stamp.wav",    v: LEVELS.SFX_MID,          dur: 0.8, rate: 0.92 },
    ...[86, 93, 99].map((a, i) => ({
      at: S(L.S0 + a), src: "pickup_chime.wav",
      v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.6, rate: [1.000, 1.1225, 1.2599][i],
    })),
  ];
  return [
  /* ---- S0 · MID-FALL AT FRAME 0, and the biggest cue set in the reel.
     ⭐ THE SHAPE IS THE PICTURE'S: the interrupt lands ON frame 0 rather than
     building to one, three descending thuds pancake the stack, the last land is
     the heaviest single hit in the reel, a WINCH ticks the brain down, and the
     COUPLING is a three-part reward — a dead blow, a tone and a struck stamp —
     after which the alarm is gone and the drawers climb a scale.
     ⛔ THE KLAXON IS PITCHED DOWN, NOT UP. `alarm` at rate 1.0 is a beep and a
     beep on frame 0 is the sound of a notification, not of something failing;
     at 0.84 it is a klaxon you feel. It is also cut short at 1.6s so it has
     LET GO before the brain arrives — an alarm still running under a resolution
     is what makes an open sound anxious instead of satisfying. -------- */
  { at: S(L.S0 + 0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED,         dur: 3.0, rate: 0.82 },
  { at: S(L.S0 + 0),   src: "alarm.wav",         v: LEVELS.SFX_MID * db(1), dur: 1.6, rate: 0.84 },
  ...layer(S(L.S0 + 0),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(2), dur: 1.2, rate: 0.76 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.4, rate: 0.66 }),
  /* the stack pancaking — three thuds, each lower and quieter than the last */
  ...[3, 8, 13].map((a, i) => ({
    at: S(L.S0 + a), src: i === 2 ? "slate_whump.wav" : "chair_knock.wav",
    v: LEVELS.SFX_MID * db(-i * 1.1), dur: 0.5, rate: 0.86 - i * 0.07,
  })),
  ...layer(S(L.S0 + 18),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.4, rate: 0.68 },
    { src: "sub.wav",          v: LEVELS.SFX_MID * db(2),  dur: 1.5, rate: 0.62 }),
  { at: S(L.S0 + 21),  src: "ceramic_crack.wav", v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 0.82 },
  /* ⭐ THE WINCH. A large mass coming down needs to sound like it is being LET
     down on something, not like it is falling: two ratchet passes, the second
     slower and lower, and a chain link as it takes the last of the weight. */
  { at: S(L.S0 + 36),  src: "ratchet.wav",       v: LEVELS.SFX_MID,         dur: 1.0, rate: 0.82 },
  { at: S(L.S0 + 60),  src: "ratchet.wav",       v: LEVELS.SFX_MID * db(1), dur: 1.1, rate: 0.70 },
  { at: S(L.S0 + 76),  src: "mech_clank.wav",    v: LEVELS.SFX_TEXTURE,     dur: 0.6, rate: 0.74 },
  /* the coupling — the one moment the hook is built to arrive at */
  ...layer(S(L.S0 + 86),
    { src: "thock.wav",        v: LEVELS.SFX_HERO * db(3), dur: 0.9, rate: 0.68 },
    { src: "green_tone.wav",   v: LEVELS.SFX_MID,          dur: 1.0, rate: 1.02 }),
  { at: S(L.S0 + 86),  src: "gold_stamp.wav",    v: LEVELS.SFX_MID,         dur: 0.8, rate: 0.92 },
  /* the drawers lighting — an ascending run, because a repeat only reads as
     PROGRESS when it climbs */
  ...[92, 100, 108].map((a, i) => ({
    at: S(L.S0 + a), src: "pickup_chime.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.6, rate: [1.000, 1.1225, 1.2599][i],
  })),

  ];
};

export const makeSFX = (L: LTable["L"], hook: HookId = "drop"): Cue[] => [
  ...s0Cues(L, hook),
  /* ---- S1 · THE INTAKE. Six drops on the belt, and the belt under them. -- */
  { at: S(L.S1 + 0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(3), dur: 2.6, rate: 1.02 },
  ...[6, 42].map((a, i) => ({
    at: S(L.S1 + a + 9), src: "chair_knock.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.4, rate: 0.94 + i * 0.10,
  })),

  /* ---- S2 · THE CROSSING. 1.53s, ONE idea, THREE cues. ----------------- */
  { at: S(L.S2 + 0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(3), dur: 1.6, rate: 1.08 },
  /* ⛔ this was a fifth `gear_shift` and five uses of a 43%-bright sample is a
     SLAP by the gate's own definition. `mech_clank` is 30.4% bright — under the
     35% ceiling — which is the only reason it can carry long runs elsewhere. */
  /* one cue per WALL the file goes through — the two crossings ARE the beat */
  ...[13, 32].map((a, i) => ({
    at: S(L.S2 + a), src: "mech_clank.wav",
    v: LEVELS.SFX_MID * db(i * 1.0), dur: 0.5, rate: 1.06 + i * 0.14,
  })),

  /* ---- S3 · THE GAP. Five files go in and NOTHING comes back — each fall
     gets its cue on the LIP, and no cue at all at the bottom. That absence is
     the sound design of the villain. ------------------------------------- */
  { at: S(L.S3 + 0),   src: "shop_bed.wav",      v: LEVELS.SFX_BED,         dur: 3.0, rate: 0.80 },
  ...[4, 28, 52].map((a, i) => ({
    at: S(L.S3 + a + 24), src: "chair_knock.wav",
    v: LEVELS.SFX_TEXTURE * db(-i * 1.0), dur: 0.4, rate: 0.90 - i * 0.09,
  })),

  /* ---- S4 · THE SWITCH. Two throws, the second harder. ----------------- */
  ...layer(S(L.S4 + 6),
    { src: "knife_switch.wav", v: LEVELS.SFX_HERO,         dur: 0.5, rate: 0.92 },
    { src: "thock.wav",        v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 0.78 }),
  { at: S(L.S4 + 22), src: "impact.wav",        v: LEVELS.SFX_MID,         dur: 0.8, rate: 0.74 },

  /* ---- S5 · THE PRESS. A density PEAK, and the point is SIMULTANEITY: the
     press cues are strictly on the beat while the ribbon bed runs continuously
     underneath, so the mix says "two things at once" before the picture does. */
  { at: S(L.S5 + 0),   src: "machine_bed.wav",   v: LEVELS.SFX_BED * db(4), dur: 2.6, rate: 0.94 },
  ...[6, 18, 28, 36, 43, 49, 54].map((a, i) => ({
    at: S(L.S5 + a), src: "stamp_press.wav",
    v: LEVELS.SFX_MID * db(i * 0.24), dur: 0.45, rate: 0.86 + i * 0.040,
  })),
  /* the steel floor going over the gap — the villain being covered */
  ...layer(S(L.S5 + 52),
    { src: "gear_shift.wav",   v: LEVELS.SFX_MID,          dur: 1.1, rate: 0.78 },
    { src: "thock.wav",        v: LEVELS.SFX_TEXTURE,      dur: 0.5, rate: 0.70 }),

  /* ---- S6 · THE WALL. The shutter, then NINE labels as an ascending run.
     ⛔ `split_flap` is the only label sound in the bank that is not a slap, and
     nine uses of one sample is a metronome unless every one is transposed. -- */
  ...layer(S(L.S6 + 2),
    { src: "gear_shift.wav",   v: LEVELS.SFX_MID,          dur: 1.4, rate: 0.68 },
    { src: "ratchet.wav",      v: LEVELS.SFX_TEXTURE,      dur: 1.2, rate: 0.82 }),
  /* ⭐ one per RANK, and the three climb a whole tone each — equal temperament
     is 2^(n/12), so a rate IS a transposition and the three ranks land as an
     ascending phrase rather than as the same sound three times. */
  ...[18, 42, 66].map((a, i) => ({
    at: S(L.S6 + a), src: "lamp_clunk.wav",
    v: LEVELS.SFX_MID * db(i * 0.9), dur: 0.35, rate: [1.000, 1.1225, 1.2599][i],
  })),
  { at: S(L.S6 + 80),  src: "green_tone.wav",    v: LEVELS.SFX_HERO,        dur: 1.0, rate: 1.12 },

  /* ---- S7 · THE FILE, OPEN. The pull, the cover, and three rewrites. --- */
  { at: S(L.S7 + 3),   src: "ratchet.wav",       v: LEVELS.SFX_MID,         dur: 0.7, rate: 1.02 },
  ...[24, 38].map((a, i) => ({
    at: S(L.S7 + a), src: "ui_tap.wav",
    v: LEVELS.SFX_TEXTURE * db(i * 0.9), dur: 0.3, rate: 1.00 + i * 0.16,
  })),

  /* ---- S8 · THE BURN. ⭐ `paper_burn` is the one cue in the bank that IS the
     event rather than a stand-in for it. ---------------------------------- */
  { at: S(L.S8 + 8),   src: "mech_clank.wav",    v: LEVELS.SFX_MID,         dur: 0.6, rate: 0.72 },
  ...layer(S(L.S8 + 30),
    { src: "slate_whump.wav",  v: LEVELS.SFX_HERO,         dur: 0.7, rate: 0.70 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.0, rate: 0.72 }),
  { at: S(L.S8 + 38),  src: "impact_deep.wav",   v: LEVELS.SFX_MID,         dur: 0.8, rate: 0.86 },

  /* ---- S9 · THE THREE OUTLETS. An ascending run of three, one per feed. - */
  { at: S(L.S9 + 0),   src: "shop_bed.wav",      v: LEVELS.SFX_BED * db(3), dur: 2.2, rate: 1.06 },
  { at: S(L.S9 + 11),  src: "mech_clank.wav",    v: LEVELS.SFX_MID,         dur: 0.5, rate: 1.20 },
  ...[30, 33, 36].map((a, i) => ({
    at: S(L.S9 + a), src: "pickup_chime.wav",
    v: LEVELS.SFX_MID * db(i * 0.7), dur: 0.7, rate: [1.000, 1.1225, 1.2599][i],
  })),

  /* ---- S10 · THE PLATE. One strike, and the floor cheering it. --------- */
  ...layer(S(L.S10 + 21),
    { src: "gold_stamp.wav",   v: LEVELS.SFX_HERO,         dur: 0.9, rate: 1.00 },
    { src: "impact.wav",       v: LEVELS.SFX_MID,          dur: 0.8, rate: 0.78 }),
  ...layer(S(L.S10 + 21),
    { src: "pickup_chime.wav", v: LEVELS.SFX_MID,          dur: 0.6, rate: 1.000 },
    { src: "green_tone.wav",   v: LEVELS.SFX_TEXTURE,      dur: 0.7, rate: 1.1225 }),

  /* ---- S11 · FULL GEAR. The works winding up — the RATE climbs with it. - */
  ...layer(S(L.S11 + 2),
    { src: "gear_shift.wav",   v: LEVELS.SFX_MID,          dur: 0.5, rate: 0.82 },
    { src: "motor_sag.wav",    v: LEVELS.SFX_TEXTURE,      dur: 1.2, rate: 1.14 }),

  /* ---- S12 · THE BARRIER. The PEAK. It falls in silence and lands hard. - */
  ...layer(S(L.S12 + 15),
    { src: "impact_deep.wav",  v: LEVELS.SFX_HERO * db(3), dur: 1.4, rate: 0.70 },
    { src: "sub.wav",          v: LEVELS.SFX_MID,          dur: 1.6, rate: 0.64 }),
  /* he hits it — a body against steel is a DEAD blow, not a slap */
  { at: S(L.S12 + 20), src: "dead_thud.wav",     v: LEVELS.SFX_MID,         dur: 0.7, rate: 0.80 },

  /* ---- S13 · THE SELECTOR. The throw, and the coupling breaking. ------- */
  ...layer(S(L.S13 + 15),
    { src: "knife_switch.wav", v: LEVELS.SFX_MID,          dur: 0.5, rate: 0.88 },
    { src: "ui_tap.wav",       v: LEVELS.SFX_TEXTURE,      dur: 0.3, rate: 1.14 }),
  { at: S(L.S13 + 42), src: "lamp_clunk.wav",    v: LEVELS.SFX_MID,         dur: 0.5, rate: 0.92 },
  { at: S(L.S13 + 44), src: "engine_idle.wav",   v: LEVELS.SFX_BED,         dur: 1.4, rate: 0.96 },

  /* ---- S14 · THE VILLAIN WINS. ⭐ The cloud lane keeps its bed running the
     whole scene and the local lane gets FOUR arrivals with NOTHING under them
     — the same absence the gap had at S3, deliberately reused. ----------- */
  { at: S(L.S14 + 0),  src: "shop_bed.wav",      v: LEVELS.SFX_BED * db(4), dur: 2.6, rate: 1.04 },
  ...[8, 22, 50].map((a, i) => ({
    at: S(L.S14 + a + 16), src: "chair_knock.wav",
    v: LEVELS.SFX_TEXTURE * db(-i * 0.9), dur: 0.4, rate: 0.88 - i * 0.06,
  })),
  { at: S(L.S14 + 44), src: "line_dead.wav",     v: LEVELS.SFX_MID,         dur: 1.1, rate: 0.86 },

  /* ---- S15 · THE STRIKE. The drop hammer, and the reel ends on it. ----- */
  ...layer(S(L.S15 + 13),
    { src: "gold_stamp.wav",   v: LEVELS.SFX_HERO * db(2), dur: 1.0, rate: 0.98 },
    { src: "impact_deep.wav",  v: LEVELS.SFX_MID,          dur: 1.0, rate: 0.88 }),
  ...layer(S(L.S15 + 16),
    { src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(2),  dur: 0.7, rate: 1.1225 },
    { src: "arrive_chime.wav", v: LEVELS.SFX_TEXTURE,      dur: 1.0, rate: 1.2599 }),
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad. `ados` =
   "Another Day Of Sun", `ebm` = "Every Living Breathing Moment". Reels 107-114
   drifted onto generated beds one clone at a time and every audio gate stayed
   green, because a pad passes all of them.

   ⛔⛔ AND USING THE RIGHT SONG IS STILL NOT ENOUGH. The house bed is a PASSAGE,
   not a track: `ados_bed_loud.wav` is one specific 50s window and reel 122 lost
   two rounds re-deriving its own window by scoring mean level and onset, which
   landed on a different section of the same song and kept sounding unfamiliar.
   ⭐ SO THESE ARE BUILT FROM THE HOUSE FILES THEMSELVES, never re-derived.

   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms.
   ⛔ ALL THREE ARE LEVELLED TO -20.4 LUFS, which is what the previous house
   files measured, so `BED_GAIN` below is unchanged and one variable moved. */
const BED: Record<Variant, string> = {
  house: "124mem_bed.wav",
  amber: "124mem_bed_amber.wav",
  steel: "124mem_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1248, amber: 1332, steel: 1180 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. The house figure is ~12 dB under the VO; the standing cap is
   volume 0.25 (Alex: *"the background music is too loud compared to the
   voiceover"*). */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.60),   /* -> volume 0.2399 */
  amber: db(7.20),
  steel: db(7.40),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  /* ⭐ everything timed comes from THIS cut's table: its VO, its captions, its
     scene onsets, its cue bank and its section bands. Nothing is shared with
     the other two except the scene bodies themselves. */
  const cut = CUTS[hook] ?? CUTS.drop;
  const L = cut.t.L;
  const DUR = durs(L);
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile(cut.vo)} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={makeSFX(L, hook)} />

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
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={cut.words} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} v={v} L={L} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER IS NEVER OFF, AND IT CHANGES PER SECTION.
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ AND A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme — nothing
   below says "the memory works".
   ⛔⛔ A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT
   ONE. On reel 122 the opening band printed the reel's final number over the
   eighteen seconds in which the VO was still building it, and a viewer who read
   it at 2s had no reason to watch the arithmetic. So the catch is NOT named
   until S12, and the reason for the catch is not named until S14 — each band
   lands on the frame its own line is spoken.
   ⛔ EVERY FIGURE COMES OUT OF `R`, so a band cannot drift off the ledger the
   way a hand-typed one can.
   ====================================================================== */
const makeBands = (L: LTable["L"]) => [
  { from: L.S0,  big: "CLAUDE JUST BUILT",   hot: "ITS OWN SECOND BRAIN" },
  { from: L.S1,  big: "IT REMEMBERS",        hot: "ACROSS EVERY CHAT" },
  { from: L.S3,  big: "IT USED TO FORGET",   hot: "EVERY TIME YOU SWITCHED" },
  { from: L.S5,  big: "NOW IT WRITES",       hot: "WHILE YOU TALK" },
  { from: L.S6,  big: "SEE EVERY MEMORY",    hot: `${R.section} · ONE FILE EACH` },
  { from: L.S7,  big: "AND YOU CAN",         hot: R.controls.join(" · ") },
  { from: L.S9,  big: "SAME MEMORY ON",      hot: R.surfaces.join(" · ") },
  { from: L.S10, big: "ON BY DEFAULT",       hot: R.plans },
  { from: L.S12, big: "ONE CATCH",           hot: "BEFORE YOU TURN IT ON" },
  { from: L.S14, big: `${R.local} TASKS`,    hot: "DO NOT SYNC" },
  { from: L.S15, big: "COMMENT",             hot: R.keyword },
];
/** ⛔ the band is IDENTICAL across the three cuts and it owns the top two rows of
    an 8x8 dHash. A per-cut Y nudge is the cheapest way to stop it flattening the
    only cells the hook's own per-cut layout cannot reach. */
const BAND_DY: Record<Variant, number> = { house: 0, amber: 24, steel: -20 };

const SectionBand: React.FC<{ f: number; v: Variant; L: LTable["L"] }> = ({ f, v, L }) => {
  /* ⛔⛔ THE HOOK KEEPS ITS HEADER. Reel 122 took the band off the hook on one
     round and was asked *"where is the header in the hook scene"* on the next;
     the reel opened with no header and popped one in at 1.77s. And the measured
     evidence was always on this side: across reel 94's six trial cuts the two
     that performed opened with a cream claim plate and the four that did not
     had none. `HOOK_PLATE` is satisfied by the hook's own plate; this band sits
     above it and RAISES frame-0 luma, which moves HOOK_LUMA the right way. */
  const BANDS = makeBands(L);
  let cur = BANDS[0];
  for (const b of BANDS) if (f >= b.from) cur = b;
  const local = f - cur.from;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${BAND_DY[v]}px)`,
      pointerEvents: "none" }}>
      {/* ⛔ `at0` on the FIRST band only — the reel opens with its claim already
             on screen. Every later band still pops in. See SlopKit/SectionHeader. */}
      <HookHeader big={cur.big} hot={cur.hot} f={local} at0={cur === BANDS[0]} />
    </div>
  );
};

export const ClaudeMemReel = makeReel("house", false, "drop");
export const ClaudeMemReelAmber = makeReel("amber", false, "head");
export const ClaudeMemReelSteel = makeReel("steel", false, "swap");
export const ClaudeMemReelQuiet = makeReel("house", true, "drop");
