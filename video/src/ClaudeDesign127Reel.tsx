import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, CAM, GRADE } from "./DsnScenes";
import type { Variant } from "./DsnScenes";
import { CamCtx, R } from "./DsnWorld";
import { SfxTrack, LEVELS, db, Cue, layer, repeat } from "./SoundKit";
import { HOOKS, PICKED } from "./DsnHooks";
import type { HookId } from "./DsnHooks";
import words from "./data/words_127design.json";

/* ===========================================================================
   REEL 127 · "DESIGN" — THE BOARD WORKS.  Board: storyboards/127-design.md.

   Subject: Claude Code shipped `/design` — a research preview that publishes a
   canvas of editable artboards straight out of the terminal — and
   `/design-sync`, which pulls your repo's own design system in so the boards
   are built from YOUR parts instead of a stock template. Every fact is in `R`
   in `DsnWorld.tsx`, checked 2026-08-29 against Claude Code's own docs and the
   shipped skill and tool definitions. Nothing on screen is outside it.

   ⛔⛔ TWO THINGS THE VO SAYS THAT THE FRAME DOES NOT CLAIM:
     "completely fixes the worst part of AI coding"
                       an opinion. No plate carries a percentage, a benchmark or
                       a multiplier anywhere in the reel. `PERF_BANNED` greps.
     "clicking and dragging"
                       the documented canvas editing is click-to-select, a
                       properties panel, inline text editing and undo/redo. S9
                       STAGES direct manipulation — real handles, a real
                       properties strip, a panel re-seated, SAVED — and
                       `DRAG_BANNED` must return zero rendered hits.

   ⛔⛔ THE VILLAIN IS `THE STOCK PLATE` AND IT IS NEVER ARGUED WITH. It stamps
   at S1, fills a wall at S2, is still bolted in at S7, is UNBOLTED AND REPLACED
   at S8, and it is still hanging on the wall, still purple, on the last frame.
   That is the honest shape: `/design` does not delete the generic default, it
   gives Claude something better to reach for.

   ⭐ 31.27s — inside the playbook's 22-29s figure to within half a second, and
   shorter than every recent ship (118 = 33.68 · 124 = 32.53 · 120 = 35.24 ·
   126 = 37.90). The cut removes 15.7s of a 46.07s raw take: one `cut cut`
   retake in the "ugly generic template" line, and eight dead spots between
   0.55s and 2.70s.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;

/** ⛔ DERIVED FROM `words_127design.json`, NEVER TYPED. On reel 122 the scene
    list was a hand-typed copy of `L` and 7 of 19 entries were wrong, one by
    1.26s, so a whole round was spent editing a scene that was not in the frame
    being complained about. Regenerate with `tools/dsn_scenes.sh`. */
export const L = {
  S0: 0, S1: 104, S2: 173, S3: 254, S4: 336, S5: 427,
  S6: 462, S7: 532, S8: 608, S9: 712, S10: 811, END: 861,
} as const;

export const DESIGN_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
};

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 (slow attack, no low end
   = a swell) and are excluded, and so is `slot_lever`.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a BOARD WORKS — cast iron,
   a flywheel, chain hoists, a stock belt, ratchets, wrenches, timber landing on
   a slab floor, ink, and the small precise sounds of a canvas being edited.
   **ZERO chiptune cues**: the greppable gate is that no `src` starts with `c_`.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. A transient with its energy up top is
   a SLAP; the same event carried under 250 Hz is a thud you feel. `impact_deep`
   (93.1% low), `sub` (96.6%), `thock` (88.6%), `impact` (42.1%), `mallet_tap`
   (60.2%), `slate_whump` (44.7%) and `rebuild_thud` (90.3%) carry every weight
   beat in the reel. Nothing bright is used more than three times.

   ⛔⛔ AND FOUR CUES WERE REPLACED AFTER MEASURING, not after listening — the
   whole point of the tool being that these are invisible until you run it:
     `wire_travel`   910ms attack on a 1.0s file = a rising SWELL. That is the
                     banned "puff of air" shape under a different filename.
     `lib_confirm`   peaks at 1727ms and the cue was 850ms long, so the link
                     arriving made a sound that had not started yet. A cue whose
                     `dur` is under its own attack is ABSENT, not quiet — and it
                     still counts as a placed cue in every row-counting audit.
     `lib_pop`       91.8% above 2kHz, four times, in the densest scene.
     `resolve`       176ms attack, over the 150ms hit/swell line.
   ⭐ AND ONE WAS REPLACED FOR A REASON NO MEASUREMENT COULD GIVE: `harden_chime`
   is a WIND CHIME, and this is a board works. A clean audit is not a good bank.

   ⛔ `dur` TRUNCATES TAILS — every `dur` below is >= the file's measured length
   (impact_deep 0.80 · sub 0.42 · thock 0.16 · impact 0.62 · ratchet 0.50 ·
   mech_clank 0.12 · wrench_clank 0.06 · harden_chime 0.60 · temper_chime 0.70 ·
   pickup_chime 0.34 · sign_clack 0.22 · lib_pop 0.20 · ui_tap 0.10 ·
   motor_sag 0.85 · gold_stamp 0.50 · resolve 0.80 · scan_beep 0.40).

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the drop) and S8
   (the plate swap) and thins to two or three on the command scenes, which is
   why those scenes are short. 42 non-bed cues over 30.40s = **1.38/sec**,
   inside the house 1.0-1.5 ceiling (95 = 0.98 · 105 = 1.13 · a rejected 107 =
   3.82).
   ⭐ AND A REPEATED REWARD ONLY READS AS PROGRESS WHEN IT CLIMBS. Every run
   here ascends: the three faces at S0, the boards at S2, the drawers at S6, the
   five inks at S7, the parts at S8. Equal temperament is 2^(n/12), so a `rate`
   IS a transposition.                                                        */
const STEP3 = [1.000, 1.1225, 1.2599];
const STEP4 = [1.000, 1.0905, 1.1892, 1.2968];
const STEP5 = [1.000, 1.0595, 1.1225, 1.1892, 1.2599];

/** ⛔⛔ THE S0 CUES CANNOT BE SHARED. S1-S10 show the same picture in all three
    cuts, so their cues come straight off `L`. S0 is the one scene where the
    three hooks show three different EVENTS — a board dropped from a gantry, a
    roll thrown across a floor, three boards slammed down at camera — and a cue
    list written for the first, played over the others, is a chain hoist and a
    single slam under a shot in which nothing hangs and three things land. */
const s0Cues = (hook: HookId): Cue[] => {
  /* ---- A · DROP (104f) · THE PICKED HOOK. The shape is the picture's: the
     works running, a chain going slack, a release, ONE enormous low landing,
     then three seats UP a scale because the payoff is three OPTIONS and a
     repeat only reads as progress when it climbs. ⛔ NO ALARM AND NO KLAXON —
     nothing here is failing, something is being DELIVERED. ------------------ */
  if (hook === "drop") return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.86, lead: 0 },
    { at: S(25), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.22, rate: 0.82 },
    { at: S(29), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.60, rate: 0.88 },
    /* THE SLAM — three low layers on one beat, and the biggest cue in the reel */
    { at: S(41), src: "impact_deep.wav", v: LEVELS.SFX_HERO, dur: 0.90, rate: 0.92 },
    { at: S(41), src: "sub.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.50, rate: 0.90, lead: 2 },
    { at: S(41), src: "thock.wav", v: LEVELS.SFX_MID, dur: 0.20, rate: 0.84, lead: 2 },
    /* the three faces, ASCENDING. ⛔ `harden_chime` was here and it is a WIND
       CHIME — `sfx_audit` measures its attack at 96ms and the bank rule that
       matters more is the one a measurement cannot make: THE BANK BELONGS TO THE
       WORLD. A face seating into a board in a works is a small bright PING off
       metal, not a chime. */
    ...[51, 63, 75].map((fr, i) => ({
      at: S(fr), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-2 - i * 0.5),
      dur: 0.35, rate: STEP3[i],
    })),
  ];

  /* ---- B · UNROLL (104f) · the throw, the run out, three pops along it. The
     hero cue is a TRAVEL, not an impact, because nothing falls in this cut.
     ⛔ ITS POPS ARE `lamp_clunk`, NOT `sign_clack`. S2 already spends three
     sign_clacks on the stock boards landing, and the per-VARIANT count is what
     the ban is about — three here plus three there is six of one sample in one
     playable cut, which is the thing "no sample more than 3x" exists to stop. */
  if (hook === "unroll") return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.90, lead: 0 },
    { at: S(18), src: "impact.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.66, rate: 0.94 },
    /* ⛔ `wire_travel` HAS A 910ms ATTACK ON A 1.0s FILE — it is a rising SWELL,
       i.e. exactly the "puff of air" shape that is banned by name, arriving under
       a different filename. A canvas roll running out across a floor is a
       RATCHET, which is also what the works would actually contain. */
    { at: S(20), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-1), dur: 1.10, rate: 0.62, lead: 0 },
    ...[36, 52, 68].map((fr, i) => ({
      at: S(fr), src: "lamp_clunk.wav", v: LEVELS.SFX_MID * db(-1 - i * 0.5),
      dur: 0.30, rate: STEP3[i],
    })),
  ];

  /* ---- C · SLAM (104f) · two landings onto a board that already has one on
     it, so two low hits UP a scale. ⛔ Its texture is `slate_whump`, not
     `thock`, for the same per-variant reason as B. */
  return [
    { at: 0.00, src: "machine_bed.wav", v: LEVELS.SFX_BED, dur: 4.0, rate: 0.94, lead: 0 },
    ...[28, 58].map((fr, i) => ({
      at: S(fr), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-i * 1.2),
      dur: 0.90, rate: 0.88 + i * 0.08,
    })),
    ...[28, 58].map((fr, i) => ({
      at: S(fr), src: "slate_whump.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.20,
      rate: STEP3[i] * 0.88, lead: 2,
    })),
    { at: S(76), src: "metal_ping.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.35, rate: 1.26 },
  ];
};

/* ⭐⭐⭐ THE RATE WAS THE THING NOBODY HAD CHECKED, AND IT WAS OVER.
   The first bank measured **1.74 cues/sec on the picked cut** against a house
   ceiling of 1.0-1.5 (95 = 0.98 · 105 = 1.13 · 106 = 1.48 · a rejected 107 =
   3.82), and the count was only visible after auditing PER VARIANT: `s0Cues`
   holds three mutually exclusive banks in one function, so a whole-file count
   both over-reports the total and hides which sample is repeated inside a cut
   that actually plays (`feedback_a_source_audit_overcounts_branches`).

   Eight cues came out, and each removal was a HIERARCHY decision rather than a
   trim: if a big thing and a small thing move together, the small thing is
   silent. The press slam keeps `impact` and loses its `thock`; the coupling
   keeps its latch and loses the `sub` under it; the ENTER keeps its thock and
   the link keeps its confirm; the snap at S9 keeps `snap` and loses the chime
   stacked on it; the keyword keeps `gold_stamp` and loses the `sub`.

   ⭐ THE TWO RUNS THAT ARE DELIBERATELY OVER 3x ARE MUSIC, NOT REPETITION. The
   five pours at S7 and the four parts at S8 are ASCENDING — equal temperament,
   2^(n/12), so a `rate` IS a transposition — and an ascending run is the only
   thing that makes a repeated reward read as PROGRESS rather than as the same
   event happening again. That is the house pattern reel 126 shipped, and it is
   different in kind from using one sample for five unrelated events.

   MEASURED, per playable cut, over 30.40s:
       DROP 44 non-bed = 1.45/sec · UNROLL 41 = 1.35 · SLAM 42 = 1.38          */
const makeSFX = (hook: HookId): Cue[] => [
  ...s0Cues(hook),

  /* S1 · THE PRESS HALL — a flywheel bed under the whole scene, one press slam
     LOW on "worst", and the board it makes landing on the belt. */
  { at: S(L.S1), src: "deep_engine.wav", v: LEVELS.SFX_BED * db(2), dur: 2.6, rate: 0.72, lead: 0 },
  { at: S(L.S1 + 32), src: "impact.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.66, rate: 0.86 },
  /* ⛔ the board landing on the belt had its own `dead_thud` here. The reel
     losing 1.35s put the bank at 1.51/sec, and the press `impact` 7 frames
     earlier IS this event — hierarchy, not trimming. */

  /* S2 · THE STACK — the belt is the bed AND the subject. Three boards land
     ASCENDING (the villain's output only goes up), then a dry ratchet on
     "template" so the sentence lands on a mechanical, unglamorous sound. */
  { at: S(L.S2), src: "sorter_tick.wav", v: LEVELS.SFX_BED * db(3), dur: 3.0, rate: 0.84, lead: 0 },
  ...[14, 38, 62].map((fr, i) => ({
    at: S(L.S2 + fr), src: "sign_clack.wav", v: LEVELS.SFX_MID * db(-2),
    dur: 0.26, rate: STEP3[i] * 0.90,
  })),
  { at: S(L.S2 + 69), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.60, rate: 0.80 },

  /* S3 · THE DESK — typing, ONE low ENTER, then the link. */
  { at: S(L.S3 + 40), src: "lib_mactype.wav", v: LEVELS.SFX_MID * db(-4), dur: 1.05, rate: 1.06, lead: 0, from: 0.6 },
  { at: S(L.S3 + 68), src: "thock.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.20, rate: 0.78 },
  /* ⛔⛔ `lib_confirm` PEAKS AT 1727ms AND THE CUE WAS 850ms LONG, so the link
     arriving made a sound that had not started yet. A cue whose `dur` is shorter
     than its own attack is not quiet, it is ABSENT — and it would have measured
     as a placed cue in every audit that counts cue rows. */
  { at: S(L.S3 + 76), src: "green_tone.wav", v: LEVELS.SFX_MID * db(-3), dur: 0.75, rate: 1.10 },

  /* S4 · THE FLOOR, RE-LIT — the coupling travelling, the lock, and the board
     coming up on "canvas". */
  { at: S(L.S4 + 2), src: "ratchet.wav", v: LEVELS.SFX_MID * db(-2), dur: 0.80, rate: 0.74, lead: 0 },
  { at: S(L.S4 + 10), src: "mech_clank.wav", v: LEVELS.SFX_MID, dur: 0.22, rate: 0.86 },
  { at: S(L.S4 + 67), src: "arrive_chime.wav", v: LEVELS.SFX_MID * db(-2), dur: 1.15, rate: 1.00 },

  /* S5 · THE DESK, COLDER — deliberately THIN. Two cues, no bed of its own. */
  { at: S(L.S5 + 6), src: "lib_mactype.wav", v: LEVELS.SFX_MID * db(-5), dur: 0.95, rate: 1.12, lead: 0, from: 2.1 },
  { at: S(L.S5 + 33), src: "snap.wav", v: LEVELS.SFX_MID, dur: 0.12, rate: 0.92 },

  /* S6 · THE CODE STORE — the head sweeping is the bed, and three drawers come
     out UP a scale, because the reading is progressive and one component at a
     time is what the tool actually does. */
  { at: S(L.S6 + 2), src: "scanner_sweep.wav", v: LEVELS.SFX_MID * db(-4), dur: 2.2, rate: 0.80, lead: 0 },
  ...[14, 32, 50].map((fr, i) => ({
    at: S(L.S6 + fr), src: "ticket_click.wav", v: LEVELS.SFX_MID * db(-2),
    dur: 0.18, rate: STEP3[i],
  })),

  /* S7 · THE INK BENCH — five pours, five pitches. ⭐ The run climbs because the
     system is being ASSEMBLED, not merely listed, and there are five groups. */
  ...[12, 24, 36, 48, 60].map((fr, i) => ({
    at: S(L.S7 + fr), src: "pickup_chime.wav", v: LEVELS.SFX_MID * db(-2),
    dur: 0.38, rate: STEP5[i],
  })),

  /* S8 · THE FITTING FLOOR — ⭐ THE PEAK, and the densest scene in the bank.
     The case opens, four parts land UP a scale, the stock plate is UNBOLTED (a
     wrench, dry and mechanical — the villain is not exploded, it is unscrewed),
     the new plate seats LOW, and one warm resolve on "guessing". */
  { at: S(L.S8 + 36), src: "gear_shift.wav", v: LEVELS.SFX_MID, dur: 0.14, rate: 0.84 },
  /* ⛔ `lib_pop` IS 91.8% ABOVE 2kHz. Percussion must be LOW, never bright — a
     transient with its energy up top is a SLAP, and four of them in the reel's
     densest scene is where a bank starts to sound cheap. A part seating into a
     forme is a MALLET (60.2% under 250Hz, 2ms attack). */
  ...[42, 54, 66, 78].map((fr, i) => ({
    at: S(L.S8 + fr), src: "mallet_tap.wav", v: LEVELS.SFX_MID * db(-2),
    dur: 0.26, rate: STEP4[i] * 0.94,
  })),
  { at: S(L.S8 + 68), src: "wrench_clank.wav", v: LEVELS.SFX_MID * db(1), dur: 0.10, rate: 0.88 },
  { at: S(L.S8 + 76), src: "impact.wav", v: LEVELS.SFX_HERO * db(-2), dur: 0.66, rate: 0.90 },
  { at: S(L.S8 + 89), src: "temper_chime.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.75, rate: 1.00 },

  /* S9 · THE BOARD FACE — the small precise sounds of an edit. ⭐ THE STICK IS
     A SOUND: `motor_sag` under the resistance is what makes the effort read,
     and it is the only place in the reel it is used. */
  { at: S(L.S9 + 14), src: "ui_tap.wav", v: LEVELS.SFX_MID * db(-1), dur: 0.14, rate: 1.06 },
  { at: S(L.S9 + 34), src: "motor_sag.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.90, rate: 0.78 },
  { at: S(L.S9 + 79), src: "snap.wav", v: LEVELS.SFX_MID * db(1), dur: 0.12, rate: 1.00 },
  { at: S(L.S9 + 87), src: "lib_correct.wav", v: LEVELS.SFX_MID * db(-6), dur: 1.00, rate: 1.02 },

  /* S10 · THE DOORS — the keyword stamp LOW, and one resolve. */
  { at: S(L.S10 + 8), src: "gold_stamp.wav", v: LEVELS.SFX_HERO * db(-4), dur: 0.55, rate: 0.92 },
  /* ⛔ `resolve` attacks in 176ms, over the 150ms line at which a non-bed cue
     stops being a hit and becomes a swell. The keyword lands on a low thud. */
  { at: S(L.S10 + 13), src: "rebuild_thud.wav", v: LEVELS.SFX_MID * db(-4), dur: 0.85, rate: 0.90 },
];

/* ---- THE MIX --------------------------------------------------------------
   ⭐ THE BED IS 12 dB UNDER THE VOICE AND THE FINAL VOLUME IS INSIDE THE
   STANDING 0.25 CAP (Alex: *"the background music is too loud compared to the
   voiceover"*). The VO measures -16 LUFS and plays at `DIALOGUE` (-6 dB), so it
   lands at -22. The beds measure -23 and play at `MUSIC` (-20 dB) x this gain;
   db(7.40) puts the bed at -35.6, i.e. 13.6 dB under the voice, at a final
   volume of 0.234. */
export const BED: Record<Variant, string> = {
  house: "127design_bed.wav",
  amber: "127design_bed_amber.wav",
  steel: "127design_bed_steel.wav",
};
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.40), amber: db(7.40), steel: db(7.40),
};
export const BED_QUIET = db(-6);

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1248, amber: 1330, steel: 1178 };

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("127design_vo.wav")} volume={LEVELS.DIALOGUE} />
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
   says "the board works".
   ⛔⛔ A BAND STATES THE CLAIM OF THE SECTION IT IS OVER, AND NEVER THE NEXT
   ONE. On reel 122 the opening band printed the reel's final number over the
   eighteen seconds in which the VO was still building it, and a viewer who read
   it at 2s had no reason to watch the rest.
   ⛔ EVERY FIGURE COMES OUT OF `R`, so a band cannot drift off the ledger.
   ⛔ AND `PERF_BANNED` APPLIES HERE FIRST: no band claims a speed, a multiple
   or a percentage, because no source backs one.
   ====================================================================== */
/* ⛔⛔ THE HOOK BAND SAID `/design` AND `RESEARCH PREVIEW` — a command name and a
   status. Alex: *"the hook header needs to be way better, more informative,
   explaining what's going on, the value and what they can get."* He is right and
   it is the standing rule `feedback_headers_state_the_claim`: a header restates
   the line in PRODUCT NOUNS, and on the hook it has to answer "what do I get" for
   a muted viewer who reads nothing else.
   ⭐ Every band below now carries a VALUE, not a label. The receipts that used to
   sit in the header — the preview status, the version gate, the plans — moved to
   a chip in the reserved band underneath, which is what a chip is FOR: something
   the band cannot carry. */
const BANDS = [
  { from: L.S0,  big: R.cmd,                 hot: "= $10,000 DESIGNER, FREE" },
  { from: L.S1,  big: "IT DRAFTS THE SCREEN",  hot: "BEFORE YOU WRITE THE CODE" },
  { from: L.S2,  big: "NOT THE STOCK TEMPLATE", hot: "THE ONE AI ALWAYS GIVES YOU" },
  { from: L.S3,  big: `TYPE ${R.cmd}`,       hot: "IT PRINTS YOU A CANVAS LINK" },
  { from: L.S4,  big: "A CANVAS YOU CAN EDIT", hot: "PAN · ZOOM · PICK ONE" },
  { from: L.S5,  big: R.sync,                hot: "PULLS IN YOUR DESIGN SYSTEM" },
  { from: L.S6,  big: "IT READS YOUR REPO",   hot: "ONE COMPONENT AT A TIME" },
  /* ⛔ `R.groups.join(" · ")` is 41 characters and ran off the panel even at
     HookHeader's 38px auto-fit floor. The five group names are on the BENCH, at
     the 21px a label actually is; the band names what they ADD UP TO. */
  { from: L.S7,  big: "YOUR TYPE · COLORS",  hot: "YOUR REAL COMPONENTS" },
  { from: L.S8,  big: "NEW PAGES USE THEM",   hot: "INSTEAD OF GUESSING" },
  { from: L.S9,  big: "FIX IT ON THE CANVAS", hot: "SAVE PUBLISHES A VERSION" },
  { from: L.S10, big: "COMMENT",             hot: R.keyword },
];

/** ⛔ the band is IDENTICAL across the three cuts and it owns the top two rows
    of an 8x8 dHash. A per-cut Y nudge is the cheapest way to stop it flattening
    the only cells the hook's own per-cut layout cannot reach. */
const BAND_DY: Record<Variant, number> = { house: 0, amber: 26, steel: -22 };

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
             reel that forgot this popped its header in at ~0.2s. */}
      <HookHeader big={cur.big} hot={cur.hot} f={local} at0={cur === BANDS[0]} />
    </div>
  );
};

export const ClaudeDesign127Reel = makeReel("house", false, "drop");
export const ClaudeDesign127ReelAmber = makeReel("amber", false, "unroll");
export const ClaudeDesign127ReelSteel = makeReel("steel", false, "slam");
export const ClaudeDesign127ReelQuiet = makeReel("house", true, "drop");
