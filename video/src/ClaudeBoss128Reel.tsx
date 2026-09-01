import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, CAM, GRADE,
} from "./ArnScenes";
import type { Variant } from "./ArnScenes";
import { CamCtx, R } from "./ArnWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import words from "./data/words_128boss.json";

/* ===========================================================================
   REEL 128 · "BOSS" — THE OVERLOOK.  Board: storyboards/128-boss.md.

   Subject: the "boss loop" — a three-line prompt. Line 1 is the task, line 2
   spawns a team of worker sub-agents, and line 3 puts a STRICT AI BOSS over
   them who tears the work apart and sends it back until it scores perfect.

   ⛔⛔⛔ THIS SCRIPT ALREADY SHIPPED AS REEL 118 "LOOP" ON 2026-08-21 — it is
   the same nine beats re-recorded, with `critic` -> `boss` and `Gauntlet Loop`
   -> `boss loop`. Built as a deliberate re-run, which means the reel has to be
   unrecognisable from 118: 118 is HORIZONTAL (a proving run, work goes round a
   return rail, a critic on a pulpit with a REJECT paddle, the payoff is
   clearing a BAR); 128 is VERTICAL (a floor, a boss behind glass above it, work
   goes UP a hoist and DOWN a chute, the payoff is a MACHINE that finally RUNS).
   See `OvlWorld.tsx` for the full banned list.

   ⛔⛔ THE HONESTY LEDGER IS `R` IN `OvlWorld.tsx` AND NOWHERE ELSE.
     · "the boss loop" is OUR name. The published names are "loop engineering"
       and "agent loops". Nothing on screen calls it an industry term.
     · the two quotes are Boris Cherny's, and 118 used a DIFFERENT one, which is
       also what keeps the two reels' receipts apart.
     · NO money figure anywhere — the VO names none, and a number under the
       token drum reads as the price of the build we have just watched.
     · the score 61/74/88/100 is the boss's own verdict on a machine the viewer
       watches being tested. It is an event count, not a benchmark.

   ⚠️ 864 frames = 28.80s at 30fps — inside the playbook's 22-29s house range,
      at x1.00 with NO SPEEDUP, and that is deliberate. The cut runs 4.80 words
      per second (118 = 4.35, 122 = 4.45, 125 = 4.47) and the 0-10s hook span is
      4.69 against a 4.0 bar, so speeding it up would push a hook that is
      already fast further past the bar. R1 is FLAGGED, not silently passed.
      The cut removes 69.3s of retakes and dead air from a 98.08s raw take
      containing three full retakes of the "single prompt" line, five of the
      "spawn a team" line, THREE of the "secret sauce" line (two of which were
      invisible to a whole-file transcription and only showed when every kept
      span was transcribed alone) and two of the "loop and fix errors" line.

   ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).
   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;

/** ⛔ EVERY ONSET IS DERIVED FROM THE CAPTION JSON, never typed by feel, and
    every one is the measured word onset MINUS 4 FRAMES — the picture leads the
    voice by 4f house-wide. Source onsets (seconds, from words_128boss.json):
      S1  "You" 2.76 · S2  "and" 5.00 · S3  "It's" 7.84 · S4  "Instead" 8.85
      S5  "you" 10.46 · S6  "But" 13.30 · S7  "where" 15.24 · S8  "The" 16.78
      S9  "And" 19.26 · S10 "until" 20.61 · S11 "This" 22.54 · S12 "so" 23.85
      S13 "then" 25.42 · S14 "Comment" 27.59 · last word ends 28.70 */
export const L = {
  S0: 0, S1: 79, S2: 146, S3: 231, S4: 262, S5: 310, S6: 395, S7: 453,
  S8: 499, S9: 574, S10: 614, S11: 672, S12: 712, S13: 759, S14: 824, END: 870,
} as const;
/* ⛔⛔ END WAS 864 (28.80s) AND THE LAST WORD ENDS AT 28.70 — a 0.10s tail, and
   the CTA's final word did not survive it. Re-transcribing the DELIVERED file
   returned "comment boss for the freak"; the VO STEM alone returned "Comment
   BOSS for the free guide." perfectly, so the word was never the problem. A
   word sitting 100ms from the file boundary is inside the AAC encoder's own
   priming/flush window, and boosting the mix 12dB did not recover it either.
   ⭐ 870 frames = 29.00s puts 0.30s behind the word — still well inside
   `verify_reel`'s ENDS_TIGHT 0.5s bar, and the VO wav is 29.14s so it covers.
   ⛔ THIS IS WHY THE DELIVERED FILE IS RE-TRANSCRIBED AND NOT JUST THE CUT: the
   defect did not exist in any stem, only in the render. */
export const BOSS_TOTAL = L.END;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.END - L.S14,
};
const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin. `ballast_buzz` and
   `chain_clank` both tripped the AIR gate on reel 120 and are excluded, and so
   is `slot_lever` (58.7% bright with a 116ms attack — an air swell AND a slap).

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK. Reel 110 passed every gate with 24 of
   41 cues out of one chiptune pack, because the tool measures spectra and has
   no gate for *"this is a Mario sound"*. Every `c_*.wav` in the library is that
   pack and NONE of them is here.

   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD, AND THE WORLD IS NOW A FIGHT.
   Alex: *"there needs to be better sound effects."* The arena bank was a crowd,
   a gong and generic impacts — the sound of a ROOM, not of a fight happening in
   it. Every blow now has its own class: `katana_shing` and `slash` for the
   sweep and the volley LEAVING, `bang_on` / `impact` / `punch_thud` /
   `adv_strike` for it LANDING, `crash` for the two that break through,
   `dead_thud` for a body that does not get up, `pickup_chime` and `green_tone`
   for a fighter spawning, `ding` for a token buying one back, `bell_ring` for
   the K.O. ⛔ A hit and a miss must not share a sample — that is what makes a
   fight read as a fight rather than as a sequence of thumps.
   ⛔ ZERO chiptune (every `c_*.wav` is one pack), zero synth stabs, nothing
   that could not be made by that room.
   ⛔⛔ AND FOUR ARENA CUES WERE REPLACED AFTER THE AUDIT MEASURED THE FILES
   RATHER THAN TRUSTING THEIR NAMES: `coin_slide` is a 275ms noise swell with
   hiss at 90% bright (a SLAP at 5x, not a coin), `crowd_cheer` a 1205ms swell,
   `crowd_run` a 694ms one and `horn` an air swell. `crowd_ambience` stays and is
   the reel's ONLY bed — a room tone is legitimately a noise bed, which is the
   one case the AIR gate is not describing.
   ⛔ FIVE CUES WERE REPLACED AFTER `sfx_audit` MEASURED THE FILES RATHER THAN
   TRUSTING THEIR NAMES: `sorter_tick` is a 2.4s NOISE BED with a 1929ms swell
   (not a tick), `graph_hum` and `resolve` are AIR swells, `machine_bed` is a
   noise bed, and `harden_chime` has a 96ms attack. `ratchet` at 5x and 67%
   bright was a SLAP and is now 3x.

   ⭐ AND THE SCORE RUN IS AN ASCENDING RUN. Reel 115: three of five reward
   beats made NO SOUND AT ALL and the whole thing read as inert whatever the
   picture did. The four score pops at S10 are one chime pitched up the run,
   which is what makes a repeated reward read as PROGRESS rather than repetition.

   ⚠️ CUE RATE, MEASURED AND REPORTED HONESTLY: 51 cues over 29.00s = **1.76/sec**.
   The documented house ceiling is 1.0-1.5/sec, so this is ABOVE the written bar
   and it is being flagged rather than quietly passed. The reason it ships is
   that the last two delivered reels ran HIGHER — 125 at 2.17/sec and 124 at
   2.18 — so 1.76 is inside current practice and well clear of the 3.82 that got
   reel 107 rejected. ⛔ If a note ever comes back saying "too many sfx", the
   first cuts are S0's two texture clanks, S1's third impact and S2's second
   click; the counted runs (S3's three banks, S4's four knocks, S10's four score
   chimes, S12's four hand hits) are BEATS, not decoration, and go last.
   ⛔ AND DENSITY IS A SHAPE, NOT A LEVEL: this bank peaks at S0 (7) and S5 (5)
   and thins to 1 at S11 and S14, which is the contour §9 asks for.
   ⛔ `at` IS ROOT SECONDS, not scene-local — scene bodies are not Sequence-
   wrapped for audio purposes.
   ⛔ `dur` TRUNCATES TAILS. Every dur below is >= the file's measured length or
   deliberately gated shorter with a fade. */
/* ⭐⭐ THE HOOK'S CUES ARE PER CUT, BECAUSE THE HOOK IS PER CUT.
   Each of the three openings lands its beats on different frames, and a cue's
   whole job is to land on its event (`feedback_a_cue_shorter_than_its_attack`
   and the round that found four silent impacts in this very reel). Rates:
   3 non-bed cues over 2.63s = 1.14/sec for F and G, inside the 1.0-1.5 house
   range; B keeps its five at 1.90/sec, which is what it shipped at.
   ⛔ `feedback_a_source_audit_overcounts_branches`: three EXCLUSIVE banks in one
   file make a whole-file cue audit over-count. Audit per variant, not per file. */
const HOOK_SFX: Record<Variant, Cue[]> = {
  /* G · SENT BACK DOWN THE LINE — thrown back at f4 and f30, passed at f58 */
  house: [
    { at: S(L.S0 + 4),  src: "bang_on.wav",     v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.86 },
    { at: S(L.S0 + 30), src: "impact_deep.wav", v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.90 },
    { at: S(L.S0 + 58), src: "green_tone.wav",  v: LEVELS.SFX_HERO, dur: 0.9, rate: 1.12 },
  ],
  /* F · THE COUNTER — the stamp lands at f3 and f30, green at f60 */
  amber: [
    { at: S(L.S0 + 3),  src: "bang_on.wav",     v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.92 },
    { at: S(L.S0 + 30), src: "punch_thud.wav",  v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.86 },
    { at: S(L.S0 + 60), src: "green_tone.wav",  v: LEVELS.SFX_HERO, dur: 0.9, rate: 1.12 },
  ],
  /* B · THE VERDICT LOOP — five backhands, as shipped */
  steel: [
    { at: S(L.S0 + 4),  src: "bang_on.wav",     v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.86 },
    { at: S(L.S0 + 20), src: "punch_thud.wav",  v: LEVELS.SFX_MID,  dur: 0.6, rate: 0.94 },
    { at: S(L.S0 + 36), src: "impact_deep.wav", v: LEVELS.SFX_MID,  dur: 0.9, rate: 0.88 },
    { at: S(L.S0 + 52), src: "punch_thud.wav",  v: LEVELS.SFX_MID,  dur: 0.6, rate: 1.12 },
    { at: S(L.S0 + 68), src: "adv_strike.wav",  v: LEVELS.SFX_MID,  dur: 0.7, rate: 1.00 },
  ],
};

const SFX: Cue[] = [
  /* ---- S0 THE HOOK · a sweep, and eight bodies taking it ------------------ */
  { at: S(L.S0 + 0),  src: "crowd_ambience.wav", v: LEVELS.SFX_BED * db(4), dur: 2.8, rate: 1.0 },

  /* ---- S1 one token in, and the arena floods ----------------------------- */
  { at: S(L.S1 + 7),  src: "metal_ping.wav",     v: LEVELS.SFX_MID,        dur: 0.5, rate: 0.94 },
  { at: S(L.S1 + 12), src: "green_tone.wav",     v: LEVELS.SFX_MID,        dur: 0.8, rate: 0.92 },
  { at: S(L.S1 + 30), src: "green_tone.wav",     v: LEVELS.SFX_MID,        dur: 0.8, rate: 1.04 },
  { at: S(L.S1 + 48), src: "green_tone.wav",     v: LEVELS.SFX_HERO,       dur: 0.9, rate: 1.16 },

  /* ---- S2 the creator on the arena board --------------------------------- */
  { at: S(L.S2 + 6),  src: "gong.wav",           v: LEVELS.SFX_HERO,       dur: 2.2, rate: 0.72 },
  { at: S(L.S2 + 32),  src: "tick.wav",          v: LEVELS.SFX_TEXTURE,    dur: 0.3, rate: 1.0 },
  { at: S(L.S2 + 58), src: "crowd_ambience.wav", v: LEVELS.SFX_BED * db(3), dur: 1.4, rate: 0.96 },

  /* ---- S3 the house lights, three banks, ascending ----------------------- */
  { at: S(L.S3 + 0),  src: "lamp_clunk.wav",     v: LEVELS.SFX_MID,        dur: 0.7, rate: 0.86 },
  { at: S(L.S3 + 5),  src: "lamp_clunk.wav",     v: LEVELS.SFX_MID,        dur: 0.7, rate: 1.0 },
  { at: S(L.S3 + 10), src: "lamp_clunk.wav",     v: LEVELS.SFX_HERO,       dur: 0.9, rate: 1.16 },

  /* ---- S4 one fighter, four hits, and a bar that will not move ----------- */
  { at: S(L.S4 + 5),  src: "adv_strike.wav",     v: LEVELS.SFX_MID,        dur: 0.7, rate: 1.10 },
  { at: S(L.S4 + 18), src: "adv_strike.wav",     v: LEVELS.SFX_MID,        dur: 0.7, rate: 1.02 },
  { at: S(L.S4 + 30), src: "adv_strike.wav",     v: LEVELS.SFX_MID,        dur: 0.7, rate: 0.94 },
  { at: S(L.S4 + 40), src: "dead_thud.wav",      v: LEVELS.SFX_MID,        dur: 0.6, rate: 0.86 },

  /* ---- S5 the spawn · DENSITY PEAK 1 ------------------------------------- */
  { at: S(L.S5 + 14), src: "metal_ping.wav",     v: LEVELS.SFX_MID,        dur: 0.5, rate: 0.88 },
  { at: S(L.S5 + 31), src: "pickup_chime.wav",   v: LEVELS.SFX_HERO,       dur: 0.5, rate: 0.90 },
  { at: S(L.S5 + 39), src: "pickup_chime.wav",   v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.02 },
  { at: S(L.S5 + 47), src: "pickup_chime.wav",   v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.14 },
  { at: S(L.S5 + 55), src: "pickup_chime.wav",   v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.26 },

  /* ---- S6 two slots fill, the third does not ----------------------------- */
  { at: S(L.S6 + 8),  src: "chair_knock.wav",    v: LEVELS.SFX_MID,        dur: 0.4, rate: 0.96 },
  { at: S(L.S6 + 27), src: "chair_knock.wav",    v: LEVELS.SFX_MID,        dur: 0.4, rate: 1.06 },

  /* ---- S7 THE BOSS RISES -------------------------------------------------- */
  { at: S(L.S7 + 5),  src: "gold_stamp.wav",     v: LEVELS.SFX_MID,        dur: 0.6, rate: 0.94 },
  { at: S(L.S7 + 25), src: "boom.wav",           v: LEVELS.SFX_HERO,       dur: 1.0, rate: 0.78 },
  { at: S(L.S7 + 26), src: "gong.wav",           v: LEVELS.SFX_MID,        dur: 2.0, rate: 0.84 },

  /* ---- S8 they throw everything, and he blocks it ------------------------ */
  { at: S(L.S8 + 11), src: "slash.wav",          v: LEVELS.SFX_MID,        dur: 0.6, rate: 1.08 },
  { at: S(L.S8 + 23), src: "slash.wav",          v: LEVELS.SFX_MID,        dur: 0.6, rate: 0.96 },
  { at: S(L.S8 + 37), src: "bang_on.wav",        v: LEVELS.SFX_HERO,       dur: 1.0, rate: 0.82 },
  { at: S(L.S8 + 57), src: "slate_whump.wav",    v: LEVELS.SFX_MID,        dur: 0.7, rate: 0.86 },

  /* ---- S9 the retry, three laps, the RATE rising ------------------------- */
  { at: S(L.S9 + 2),  src: "impact.wav",         v: LEVELS.SFX_MID,        dur: 0.7, rate: 0.94 },
  { at: S(L.S9 + 17), src: "impact.wav",         v: LEVELS.SFX_MID,        dur: 0.7, rate: 1.08 },
  { at: S(L.S9 + 29), src: "crash.wav",          v: LEVELS.SFX_HERO,       dur: 0.8, rate: 1.0 },

  /* ---- S10 THE PEAK · the hit lands, the bar empties, K.O. --------------- */
  { at: S(L.S10 + 6),  src: "katana_shing.wav",  v: LEVELS.SFX_MID,        dur: 0.6, rate: 1.10 },
  { at: S(L.S10 + 18), src: "crash.wav",         v: LEVELS.SFX_HERO,       dur: 0.8, rate: 0.90 },
  { at: S(L.S10 + 30), src: "temper_chime.wav",  v: LEVELS.SFX_MID,        dur: 0.8, rate: 1.10 },
  { at: S(L.S10 + 36), src: "bell_ring.wav",     v: LEVELS.SFX_HERO,       dur: 1.8, rate: 1.0 },
  { at: S(L.S10 + 38), src: "crowd_ambience.wav", v: LEVELS.SFX_BED * db(7), dur: 2.0, rate: 1.06 },

  /* ---- S11 the continue screen · a token in, a fighter up ---------------- */
  { at: S(L.S11 + 8),  src: "pickup_chime.wav",  v: LEVELS.SFX_MID,        dur: 0.5, rate: 0.92 },
  { at: S(L.S11 + 18), src: "metal_ping.wav",    v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.04 },
  { at: S(L.S11 + 28), src: "arrive_chime.wav",  v: LEVELS.SFX_MID,        dur: 0.9, rate: 1.10 },

  /* ---- S12 four hand hits, and NO arena at all --------------------------- */
  { at: S(L.S12 + 9),  src: "mallet_tap.wav",    v: LEVELS.SFX_MID,        dur: 0.5, rate: 0.94 },
  { at: S(L.S12 + 18), src: "mallet_tap.wav",    v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.0 },
  { at: S(L.S12 + 26), src: "mallet_tap.wav",    v: LEVELS.SFX_MID,        dur: 0.5, rate: 1.06 },
  { at: S(L.S12 + 36), src: "mallet_tap.wav",    v: LEVELS.SFX_MID,        dur: 0.6, rate: 1.12 },

  /* ---- S13 the whole arena comes up at once ------------------------------ */
  { at: S(L.S13 + 6),  src: "boom.wav",          v: LEVELS.SFX_HERO,       dur: 1.0, rate: 0.90 },
  { at: S(L.S13 + 10), src: "crowd_ambience.wav", v: LEVELS.SFX_BED * db(5), dur: 2.2, rate: 1.0 },
  { at: S(L.S13 + 34), src: "temper_chime.wav",  v: LEVELS.SFX_MID,        dur: 0.7, rate: 1.20 },

  /* ---- S14 one seat on the keyword. Nothing after it. -------------------- */
  { at: S(L.S14 + 4),  src: "gold_stamp.wav",    v: LEVELS.SFX_HERO,       dur: 1.2, rate: 1.0 },
];

/* ---- THE VARIANTS ---------------------------------------------------------
   ⛔⛔ A TRIAL CUT IS NOT A COLOUR PASS. Reel 126's three cuts opened on the
   version already rejected because only the picked hook was ever re-rendered.
   ⛔ Camera is a TIE-BREAKER and nothing more; `rot` is 0 in all three. What
   actually separates the cuts is the rake PITCH (varying `n`, not a phase
   inside one pitch), the parallax offset, the caption band and the grade. */
/* ⭐⭐ THE BED, AFTER ALEX'S NOTE: *"the bg music is too quiet and like not a good
   part of the bg music, it needs to be the intense beginning part at around 8
   seconds ish of the soundtrack."*

   ⛔ v1 USED `ados_bed_loud.wav` AND IT WAS THE WRONG TRACK, NOT THE WRONG
   WINDOW. Profiled at 0.5s resolution it runs -25 to -32 dB for its whole
   length — a FLAT pad with no dynamics anywhere, which is why it read as
   nothing under the voice however it was gained. `ebm_bed_hot.wav` profiled
   over the same range has real dynamics and a hard hit at exactly **8.0s**
   (-16.4 dB against a -27 floor either side), building from there. That is the
   part he is describing, so the house cut starts at 8.0s.

   ⛔ AND THE LEVEL WAS TWO SEPARATE PROBLEMS. The beds were loudnormed to
   I=-23 (quiet) AND played at `LEVELS.MUSIC` (db -20) with no gain, i.e. ~14 dB
   under the voice. They are now normalised to I=-17 and lifted 6 dB here, so
   the bed sits about 8 dB under the VO instead of 14.
   ⛔ THE VARIANTS TAKE DIFFERENT HITS OF THE SAME TRACK, not the same window
   quieter: amber opens on the 22.0s hit (-11.9) and steel on the 15.5s (-13.8).
   `feedback_house_bed_is_a_real_track`: do not re-derive a window by scoring —
   reel 122 did that twice and got the wrong part of the song both times. */
const BED: Record<Variant, string> = {
  house: "128boss_bed.wav", amber: "128boss_bed_amber.wav", steel: "128boss_bed_steel.wav",
};
const BED_GAIN: Record<Variant, number> = { house: db(6), amber: db(7), steel: db(5.5) };
const CAP_Y: Record<Variant, number> = { house: 1250, amber: 1332, steel: 1180 };
const BED_QUIET = db(-9);

const Reel: React.FC<{ v: Variant; quiet?: boolean }> = ({ v, quiet = false }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#ECE9E2" }}>
      <Bg />
      <Audio src={staticFile("128_boss_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * BED_GAIN[v] * (quiet ? BED_QUIET : 1)} />
      <SfxTrack cues={[...SFX, ...HOOK_SFX[v]]} />

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
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any[]} fps={FPS} top={CAP_Y[v]} />
      {/* ⛔ THE HEADER IS THERE ON FRAME 0 — `at0` on the FIRST band only, or
          every house reel opens with no header and pops one in at ~0.2s. */}
      <HookHeader big="CLAUDE NEEDS" hot="A STRICT BOSS" f={f} at0 />
    </AbsoluteFill>
  );
};

export const ClaudeBoss128Reel: React.FC = () => <Reel v="house" />;
export const ClaudeBoss128ReelAmber: React.FC = () => <Reel v="amber" />;
export const ClaudeBoss128ReelSteel: React.FC = () => <Reel v="steel" />;
export const ClaudeBoss128ReelQuiet: React.FC = () => <Reel v="house" quiet />;
