import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, CAM, GRADE } from "./UnlazyScenes";
import type { Variant } from "./UnlazyScenes";
import { CamCtx, R } from "./UnlazyWorld";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./UnlazyHooks";
import type { HookId } from "./UnlazyHooks";
import words from "./data/words_120unlazy.json";

/* ===========================================================================
   REEL 120 · "UNLAZY" — THE SIGN-OFF LINE.  Board: storyboards/120-unlazy.md.

   Subject: the UNLAZY SKILL. v2 stops asking for effort and enforces it: the
   acceptance gates live in a `GATES.md` ledger, `gate-check.mjs` runs each
   gate's CHECK command and flips its box ONLY when the output matches EXPECT,
   recording the deciding lines as evidence, and a Stop hook blocks the agent
   from declaring victory while gates are unmet.

   Verified live 2026-08-22:
     · github.com/Leonxlnx/unlazy — ★973, created 2026-08-09, MIT, 66 forks
     · "GitHub's top trending author" is BACKED: the same owner (Leon Lin,
       1,705 followers) also ships `taste-skill` at ★79,304
     · the mechanism, verbatim from SKILL.md and README.md: *"You do not
       promise you are done. You prove it against a ledger."*
     · *"`gate-check.mjs` runs the CHECK commands, flips boxes only when EXPECT
       matches, and records the deciding output lines as evidence."*
     · "Anthropic even admitted it" is BACKED FIRST-PARTY: Anthropic's own
       system cards evaluate models on **reward-hack-prone coding tasks** —
       "models demonstrate increased propensity towards gaming the task through
       hard-coding or special-casing tests" — and their alignment research
       ships "Natural emergent misalignment from reward hacking".
     · the hook's receipt: SlopCodeBench, best agent solves **14.8%** of
       long-horizon iterative coding tasks (arXiv 2603.24755), cited by the
       repo's own research section.
     · ⛔ "up to 10 sub-agents in parallel" is NOT a repo feature and is not
       drawn as one. The repo says leaves run as fresh subagents "parallelized
       where the harness allows" and names NO number; the VO frames 10 as a
       user tweak ("the trick is to tweak the instructions"), so 10 appears
       only as ten lanes on screen. See the honesty ledger in UnlazyWorld.tsx.
     · ⛔ no timing figure is published, so "hours" is never drawn. S8 depicts
       the SEQUENCING, which is exactly what the repo's solo mode is. `HOURS`
       is in RATE_BANNED.

   VO: public/unlazy_vo.wav — 35.14s, 144 words, cut from a 63.95s raw take.

   ⛔ THE RAW TAKE HAD ONE `cut cut` MARKER, ONE DEAD TAKE AND A -13.5 dB MOUTH
      CLICK sitting alone in an eight-second dead zone. Every keep boundary came
      from a 10ms RMS island scan of the raw file (noise floor -66 to -70 dB),
      never from whisper's word times — measured here at 400ms early at the head
      (whisper said 0.58s, the real onset is 0.99s) and 360ms early on the redo.
      The twelve kept islands, and the three dropped:
        KEEP 0.99-4.36 · 6.43-8.51 · 9.07-12.65 · 14.99-18.20 · 19.09-22.12 ·
             23.33-26.52 · 28.62-32.32 · 40.88-41.72 · 47.18-50.31 ·
             50.50-54.28 · 54.56-55.65 · 59.73-61.59
        DROP 32.76-32.95 (the mouth click) · 42.01-43.58 (the flubbed take) ·
             44.51-44.81 ("cut, cut")
      Gaps are real ROOM TONE harvested from 36.0-39.0s, never digital silence.
      The CUT file was re-transcribed end to end with `small.en` and reads
      clean, first word at 0.000s, no marker surviving anywhere.

   ⛔⛔ THE VO SHIPS AT x1.00, AND ⛔⛔⛔ ROUND 5 UNDID THE GAP STRUCTURE.
      Alex: *"the pauses in between sentences are too long whats going on here."*
      He is right, and the cause is on record in this very file. Round 1 measured
      hook 4.50 wps and worst-5s 4.80 at the house 0.22s gap, i.e. past R1, and
      answered it by OPENING THE GAPS to 1.20s / 0.75s / 0.55s. That bought a
      green gate with DEAD AIR, which is [[feedback_green_gate_wrong_way]]
      exactly: a metric satisfiable the wrong way will be satisfied the wrong way.
      ⭐ AND THE EVIDENCE THAT R1 WAS THE WRONG TARGET WAS ALREADY MEASURED IN
      THIS SESSION: not one reel in the shipped set meets it. 118 LOOP shipped
      hook 4.50 / worst-5s 5.00 · 117 KNOW 4.30 / 5.20 · 116 BILL 4.60 / 5.40 ·
      113 GO 4.30 / 5.20 · 109 PLUGINS3 3.80 / 5.00. A rule nothing ships
      against is not a bar, and paying for it in silence costs retention.
      Gaps are back to the standing house figure: 0.22s on every sentence break,
      0.28s at the ONE structural turn ("But here's the catch"), 0.20s inside
      the long run. 3.46s of air removed, 38.95s -> 35.49s.
        RESULT   hook 4.40 wps  ·  worst 5s 4.80  ·  in family with what ships.

   ⚠️ 35.24s IS OUTSIDE THE 22-29s FIGURE IN THE PLAYBOOK AND IS FLAGGED, NOT
      TRIMMED. Every second is spoken content; the cut removes 28.7s of flubs, a
      mouth click and dead air from a 63.95s take. What has shipped recently:
      110 = 30.95 · 109 = 31.14 · 118 = 33.68 · 117 = 38.83 · 115 = 46.93 ·
      113 = 49.90 · 116 = 56.18 · 112 = 75.65. This is third shortest.

   ⛔⛔ THE HEADER IS ON FOR ALL 1057 FRAMES, rendered HERE at root, outside
      every Sequence — never per-scene, never dropped after the hook. It is fed
      `f+12` on the hook so it is SETTLED on frame 0, and it CHANGES per
      section: reel 107 taught that the header must never disappear, and reel
      108 taught that that is not the same instruction as saying one thing for
      the whole reel.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and the header. Scene bodies see
      none of it.
   ========================================================================= */

const FPS = 30;
export const UNLAZY_TOTAL = 1057;              /* CUT 35.24s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of the caption JSON by pattern-matching the
    beat's opening words, never by a hardcoded index. */
export const L = {
  S0:  0,     /* BENCH   0.00s  "The rumors are true. Claude is secretly..." */
  S1:  106,   /* FILES   3.53s  "And Anthropic, the creators of Claude..."   */
  S2:  175,   /* HALL    5.83s  "So if you've noticed that Claude keeps..."  */
  S3:  289,   /* SLATE   9.63s  "But GitHub's top trending author just..."   */
  S4:  392,   /* ARCH   13.07s  "It stops AI from taking shortcuts by..."    */
  S5:  489,   /* DESK   16.31s  "So instead of just saying that a task..."   */
  S6:  592,   /* RIG    19.73s  "Basically, the AI has to run commands..."   */
  S7:  711,   /* SHAFT  23.71s  "But here's the catch."                      */
  S8:  743,   /* LANE   24.77s  "Out of the box, it takes hours because..."  */
  S9:  843,   /* LANES  28.09s  "The trick is to tweak the instructions..."  */
  S10: 1002,  /* FRONT  33.40s  "So comment Unlazy for the free setup."      */
  END: UNLAZY_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin.

   ⛔⛔ A CLEAN AUDIT IS NOT A GOOD BANK
   ([[feedback_sfx_bank_belongs_to_the_world]]). Reel 110 passed every gate with
   24 of 41 cues out of one chiptune pack, because the tool measures spectra and
   has no gate for *"this is a Mario sound"*.
   ⭐ THE RULE: THE BANK BELONGS TO THE WORLD. This is a municipal sign-off hall
   — a rubber stamp, cast clanks, a drawer, shutters, a punched strip, a
   comparator seating, bolt drives, a warning arch, a knife lever and plant hum.
   **ZERO chiptune cues** — the greppable gate is that no `src` starts with
   `c_`, which returns zero hits.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (ANIMATION-QUALITY §9). The count PEAKS on
   S3 (the board landing) and S6 (the proof), and thins to two or three on the
   information scenes. S7 gets exactly two — it is 1.29s and one idea. */
export const SFX: Cue[] = [
  /* ---- S0 · THE HOT-AIR "DONE". Frame 0 gets the heaviest stack in the reel,
     and the bank follows the PICTURE: a pump stroke, the claim swelling, the
     burst, two wooden lies ratcheting out, the strike on the column and the
     shove that follows it. Seven events across 3.53s — the same count the
     vault-and-bell version ran, so the reel-wide rate does not move. -------- */
  { at: S(L.S0 + 0),   src: "stage_hum.wav",    v: LEVELS.SFX_BED,     dur: 3.6, rate: 0.90 },
  { at: S(L.S0 + 14),  src: "mech_clank.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.80 },
  { at: S(L.S0 + 38),  src: "gold_stamp.wav",   v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.00 },
  { at: S(L.S0 + 68),  src: "clap_slam.wav",    v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.92 },
  { at: S(L.S0 + 68),  src: "boom.wav",         v: LEVELS.SFX_MID,     dur: 1.4, rate: 0.78 },
  { at: S(L.S0 + 77),  src: "bamboo_crack.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.94 },
  { at: S(L.S0 + 86),  src: "bamboo_crack.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.78 },
  { at: S(L.S0 + 90),  src: "wrench_clank.wav", v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.86 },
  { at: S(L.S0 + 97),  src: "rebuild_thud.wav", v: LEVELS.SFX_MID,     dur: 1.1, rate: 0.82 },
  { at: S(L.S0 + 97),  src: "slate_whump.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 0.72 },

  /* ---- S1 · the prism sign rolling over to the receipt ------------------- */
  { at: S(L.S1 + 3),   src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.88 },
  { at: S(L.S1 + 18),  src: "gear_shift.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.02 },
  { at: S(L.S1 + 30),  src: "metal_ping.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.90 },

  /* ---- S2 · the whole floor skipping ------------------------------------- */
  { at: S(L.S2 + 0),   src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 3.8, rate: 1.08 },
  { at: S(L.S2 + 24),  src: "thock.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.86 },
  { at: S(L.S2 + 96),  src: "thock.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.12 },

  /* ---- S3 · PEAK DENSITY 1 of 2. The lamp bank lands. -------------------- */
  { at: S(L.S3 + 1),   src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 1.2, rate: 0.86 },
  { at: S(L.S3 + 30),  src: "rebuild_thud.wav",v: LEVELS.SFX_HERO,    dur: 1.4, rate: 0.90 },
  { at: S(L.S3 + 34),  src: "wrench_clank.wav",v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.16 },
  { at: S(L.S3 + 42),  src: "wrench_clank.wav",v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.04 },
  { at: S(L.S3 + 50),  src: "wrench_clank.wav",v: LEVELS.SFX_MID,     dur: 0.7, rate: 0.92 },
  { at: S(L.S3 + 68),  src: "gold_stamp.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.8, rate: 1.00 },

  /* ---- S4 · the turnstile drops and the skipper bounces off it ----------- */
  { at: S(L.S4 + 12),  src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.80 },
  { at: S(L.S4 + 17),  src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 1.4, rate: 0.82 },
  { at: S(L.S4 + 22),  src: "punch_thud.wav",  v: LEVELS.SFX_HERO,    dur: 1.0, rate: 0.86 },
  { at: S(L.S4 + 26),  src: "dead_thud.wav",   v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.74 },
  { at: S(L.S4 + 40),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 1.9, rate: 0.84 },

  /* ---- S5 · six cables run, two alternating samples, pitched in runs ----- */
  { at: S(L.S5 + 8),   src: "lamp_clunk.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.88 },
  { at: S(L.S5 + 34),  src: "lamp_clunk.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.00 },
  { at: S(L.S5 + 60),  src: "lamp_clunk.wav",  v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.12 },
  { at: S(L.S5 + 73),  src: "metal_ping.wav",  v: LEVELS.SFX_MID,     dur: 0.7, rate: 1.06 },

  /* ---- S6 · PEAK DENSITY 2 of 2. The press, twice. ----------------------- */
  { at: S(L.S6 + 16),  src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.10 },
  { at: S(L.S6 + 24),  src: "adv_strike.wav",  v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.90 },
  { at: S(L.S6 + 32),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.08 },
  { at: S(L.S6 + 44),  src: "arrive_chime.wav",v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.06 },
  { at: S(L.S6 + 86),  src: "adv_strike.wav",  v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.02 },
  { at: S(L.S6 + 106), src: "arrive_chime.wav",v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 1.14 },

  /* ---- S7 · 1.06s, ONE idea, TWO cues. The bed ducks under it. ----------- */
  { at: S(L.S7 + 1),   src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.8, rate: 0.78 },
  { at: S(L.S7 + 10),  src: "boom.wav",        v: LEVELS.SFX_MID,     dur: 1.5, rate: 0.72 },

  /* ---- S8 · four identical cycles, pitch descending ---------------------- */
  { at: S(L.S8 + 8),   src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 1.00 },
  { at: S(L.S8 + 19),  src: "dead_thud.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.94 },
  { at: S(L.S8 + 34),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.92 },
  { at: S(L.S8 + 60),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.86 },
  { at: S(L.S8 + 71),  src: "dead_thud.wav",   v: LEVELS.SFX_TEXTURE, dur: 0.7, rate: 0.80 },
  { at: S(L.S8 + 84),  src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.9, rate: 0.80 },

  /* ---- S9 · THE PEAK. Ten lamps do NOT get ten cues; the ceiling is a RATE,
     so three pitched cues carry all ten arrivals. -------------------------- */
  { at: S(L.S9 + 4),   src: "clap_slam.wav",   v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.90 },
  { at: S(L.S9 + 10),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 3.2, rate: 1.14 },
  { at: S(L.S9 + 30),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,     dur: 0.6, rate: 0.90 },
  { at: S(L.S9 + 63),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,     dur: 0.6, rate: 1.02 },
  { at: S(L.S9 + 96),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,     dur: 0.6, rate: 1.14 },
  { at: S(L.S9 + 129), src: "arrive_chime.wav",v: LEVELS.SFX_HERO,    dur: 1.3, rate: 1.00 },

  /* ---- S10 · the CTA. ⛔ this used to read 'the bell from the hook,
     earned this time' — the hook is the balloon now and has no bell. The chime
     stays because it is the sound of a job signed off; it is no longer a
     callback, and pretending otherwise in a comment is how the next agent
     ships a bell nobody rang. ------------------------------------------------ */
  { at: S(L.S10 + 8),  src: "rebuild_thud.wav",v: LEVELS.SFX_MID,     dur: 1.0, rate: 1.06 },
  { at: S(L.S10 + 14), src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,    dur: 1.2, rate: 0.96 },
  { at: S(L.S10 + 22), src: "bell_ring.wav",   v: LEVELS.SFX_TEXTURE, dur: 1.6, rate: 1.06 },
];

/* ---- THE BED -------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad
   ([[feedback_house_bed_is_a_real_track]]). Reels 107-114 drifted onto
   generated beds one clone at a time and every audio gate stayed green,
   because a pad passes all of them. `ados` = "Another Day Of Sun" (13 uses),
   `ebm` = "Every Living Breathing Moment" (8).

   The window was MEASURED, not picked by ear — a 5ms RMS scan over the whole
   228.5s track, scored on mean level, head onset and the worst-1.5s drop
   against the window's own mean, excluding the passages reel 118 used:

     hall   ADOS @ 108.5s   mean -15.5 dB   onset -15.7 dB   worst-1.5s 2.59 dB

   ⭐ 2.59 dB of internal range beats every window reel 118 shipped (2.8-4.8).

   ⛔⛔ THE BED IS COMPRESSED BEFORE IT IS LEVELLED. `loudnorm` sets an
   INTEGRATED level, so a track with a wide internal range puts its brass hits
   far above the target and they read as swells inside a VO gap. `acompressor`
   at 4:1 runs first.
   ⛔⛔⛔ AND THE HIGH SHELF IS NOT OPTIONAL — IT IS WHERE "THE PUFF OF AIR"
   LIVES. Reel 115 spent three rounds hunting a named cue that did not exist;
   the air was the bed's own cymbal wash above 5k. `treble=g=-11:f=4800` plus a
   -5 dB shelf at 9k, before the level stage.
   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Measured after the chain: audible at 20ms. */
const BED: Record<Variant, string> = {
  hall:  "120unlazy_bed.wav",
  amber: "120unlazy_bed_amber.wav",
  steel: "120unlazy_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { hall: 1246, amber: 1330, steel: 1178 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT (SOUND-DESIGN §13), so this
   is re-solved on THESE files, AFTER the high shelf rather than inherited
   through it. The house figure is ~12 dB under the VO; the standing cap is
   volume 0.25 (Alex: *"the background music is too loud compared to the
   voiceover"*). Re-measure and re-solve if either file is rebuilt. */
export const BED_GAIN: Record<Variant, number> = {
  hall:  db(7.60),   /* -> volume 0.2399 */
  amber: db(7.60),
  steel: db(7.20),
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

export const makeReel = (v: Variant, quiet = false): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("unlazy_vo.wav")} volume={LEVELS.DIALOGUE} />
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
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ AND A HEADER STATES THE CLAIM IN PRODUCT NOUNS, not the theme
   ([[feedback_headers_state_the_claim]]) — nothing below says "sign-off line".
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: 'ITS "DONE" IS HOT AIR', hot: "MAKE IT SHOW THE OUTPUT" },
  { from: L.S1,  big: "THEY TEST FOR THIS",     hot: "IT HAS A NAME" },
  { from: L.S2,  big: "RINGS DONE, RUNS NOTHING", hot: "YOU ARE NOT IMAGINING IT" },
  { from: L.S3,  big: "ONE FREE SKILL FIXES IT", hot: "MIT · 973 STARS" },
  { from: L.S4,  big: "NOW IT CANNOT GET PAST", hot: "IT HAS TO PROVE IT" },
  { from: L.S5,  big: "EVERY CLAIM GETS A CHECK", hot: "AND IT HAS NOT RUN YET" },
  { from: L.S6,  big: "IT HAS TO RUN THE CHECK", hot: "AND SHOW YOU THE OUTPUT" },
  { from: L.S7,  big: "THERE IS A CATCH",       hot: "AND IT'S THE SPEED" },
  { from: L.S8,  big: "IT PROVES ONE AT A TIME", hot: "SO THE QUEUE BACKS UP" },
  { from: L.S9,  big: "TWEAK IT TO FAN OUT",    hot: "TEN LANES, SAME PROOF" },
  { from: L.S10, big: "COMMENT “UNLAZY”",       hot: "AND I'LL SEND IT OVER" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* fed f+12 on the hook so the header is SETTLED on frame 0 — frame 0 is the
     only frame guaranteed to be seen and it may not contain an animation. */
  return <HookHeader big={b.big} hot={b.hot} f={f < 20 ? f + 12 : f - b.from + 12} />;
};

export const ClaudeUnlazyReel = makeReel("hall");
export const ClaudeUnlazyReelAmber = makeReel("amber");
export const ClaudeUnlazyReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 106-frame cut, on the
   real chassis with the real VO, bed, captions and progress rail, so the pick
   is made on the thing itself rather than on a description. Its own header
   band rides each one, because the header IS half of what is being chosen.
   ====================================================================== */
/* the hook previews ride the reel's own S0 bank — which IS the balloon's bank
   now that it is wired in, so the preview and the reel sound identical. */
export const HookCut = (id: HookId): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = HOOKS[id];
  const b = HOOK_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("unlazy_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.hall)} volume={LEVELS.MUSIC * BED_GAIN.hall} />
      <SfxTrack cues={SFX.filter(c => c.at < 106 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.hall }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.hall }}>
            <Sequence from={0} durationInFrames={106}><Cut dur={106} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.hall} />
      <HookHeader big={b.big} hot={b.hot} f={f < 20 ? f + 12 : f + 12} />
    </AbsoluteFill>
  );
};
