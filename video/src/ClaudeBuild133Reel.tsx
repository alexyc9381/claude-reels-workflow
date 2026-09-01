import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import {
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, CAM, GRADE,
} from "./BuildScenes";
import type { Variant } from "./BuildScenes";
import { CamCtx } from "./BuildWorld";
import { SfxTrack, LEVELS, db, Cue, layer } from "./SoundKit";
import { HOOKS, HOOK_BANDS } from "./BuildHooks";
import type { HookId } from "./BuildHooks";
import words from "./data/words_133build.json";

/* ===========================================================================
   REEL 133 · "BUILD" — THE ASSEMBLY.  Board: storyboards/133-build.md.

   Subject: three free, open-source AI tools you can install in minutes and
   resell as a service — MoneyPrinterTurbo (one topic to a finished video),
   GPT-SoVITS (one minute of voice to a clone) and Hunyuan3D (one flat photo to
   a textured 3D model) — and the guide that covers how to build, market and
   sell them, which is the lead magnet and the CTA.

   ⛔⛔ THE VO STATES NO FIGURE ABOUT MONEY AND THE FRAME STATES NONE EITHER.
   Every sale in this reel is a docket being stamped SOLD. The only currency
   string anywhere is `$0`, which is what the tools cost and is spoken as
   "free". The three star counts and two MIT badges are the only other numerals,
   all checked live 2026-09-01 against each repository's own page. The guards
   live in `BuildWorld` (`EARN_BANNED`, `CLAIM_BANNED`, `NAME_BANNED`) and are
   greppable.

   ⛔ THE HOW IS GATED. The reel never shows an install command, a config or a
   prompt. S1 draws three machines being craned into their beds and locked — a
   PROCESS, which is exactly what "five minutes to set up" says. The
   copy-pasteable version is the lead magnet, which is the whole CTA.

   ⭐⭐ THE VO: 29.66s of speech from a 56.47s raw take, and the cut drops FIVE
   flubs and false starts, not one. Three of them were INVISIBLE to a whole-file
   transcription, because whisper merges a flubbed take and its retake and emits
   the sentence once — the hook line is spoken TWICE in the raw and a full-file
   pass reported it once. Splitting the raw at every measured silence and
   transcribing each chunk SEPARATELY is what surfaced them:

     raw  2.15- 3.87  "You can sell these three free clock plugins"   FALSE START
     raw 11.72-13.00  "First, Money Printer 2 cut."                   FLUB
     raw 16.36-17.37  "Just type 1, cut, cut."                        FLUB
     raw 24.27-25.22  "Second GPT was" + 25.69 "cut"                  FALSE START
     raw 36.36-37.47  "Third, cut, cut."                              FLUB

   ⛔ TEMPO IS x1.00 — NO SPEED-UP AT ALL, against the house x1.10. Once the
   dead takes are gone the delivery is already brisk: 4.32 words per second
   overall and 4.80 across the hook window, where `x1.05` measured 5.10 and
   twelve 5s windows over the 4.5 bar. `memory/reel-vo-pacing`: *gate the
   speedup on the take's natural pace; a brisk take gets 1.0x.*
   ⚠️ R1 IS FLAGGED, NOT FUDGED: the hook window is 4.80 wps against a 4.0 bar
   and six 5s windows sit over 4.5. That is the RECORDING's own pace with no
   speed-up applied, so the only remedy the doc offers is a re-record, which is
   Alex's call. Nothing was done to his voice.
   ⚠️ 29.93s is 0.9s above the playbook's 22-29s house range — flagged rather
   than trimmed. The script is 127 words and no line is redundant.
   ========================================================================= */

const FPS = 30;
export const BUILD_TOTAL = 898;                   /* CUT 29.93s x 30fps */

/** ⛔ Re-derived WITH `CUT` and `durationInFrames` every time the VO changes.
    Every onset below was read out of `data/words_133build.json` by
    pattern-matching the beat's opening words, never by a hardcoded index. */
export const L = {
  S0: 0,     /* ROW      hook · "You can sell these three free"        0.00s */
  S1: 72,    /* FITOUT   "And the best part"                           2.40s */
  S2: 142,   /* MILL     "First, Money Printer Turbo"                  4.73s */
  S3: 188,   /* MILLC    "Just type one word or topic"                 6.27s */
  S4: 297,   /* COUNTER  "to sell to businesses"                       9.90s */
  S5: 336,   /* BOOTH    "Second, GPT SoVITS"                         11.19s */
  S6: 383,   /* LATHE    "One minute of your voice"                   12.77s */
  S7: 427,   /* STALLS   "so sell narration services"                 14.23s */
  S8: 487,   /* BOOTHC   "without recording anything"                 16.23s */
  S9: 531,   /* SHOP3    "Third, Hunyuan 3D"                          17.71s */
  S10: 574,  /* RIG      "It turns one flat photo"                    19.13s */
  S11: 614,  /* TURN     "real 3D model you can spin"                 20.48s */
  S12: 678,  /* DOCK     "So sell this to ecom brands"                22.61s */
  S13: 741,  /* GATE     "But none of these are useful"               24.71s */
  S14: 782,  /* GATELIT  "free guide I made covering how to build"    26.06s */
  S15: 863,  /* OPEN     "Comment BUILD for access"                   28.75s */
  END: BUILD_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.S11 - L.S10, S11: L.S12 - L.S11,
  S12: L.S13 - L.S12, S13: L.S14 - L.S13, S14: L.S15 - L.S14, S15: L.END - L.S15,
} as const;

const S = (fr: number) => fr / FPS;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ BAN LIST FIRST, BEFORE ANY MEASUREMENT. `pneu_thunk.wav` and
   `crusher.wav` are on a STANDING FOREVER-BAN (Alex, reel 116: *"those puff of
   air sounds do not use those sound effects again forever"*). Neither appears
   here, and neither does any file whose name says whoosh / swoosh / puff — a
   measurement cannot out-argue the label on the tin.

   ⛔ AND THE WHOLE `am/` PACK IS OUT, measured not assumed. Every one of the
   eight candidates from it that this reel wanted — `film-projector`,
   `film-roll`, `gear-mech`, `counter-tick`, `click-hard`, `hit-boom`,
   `crowd-cheer` — came back NOISE-BED / HISS / AIR at 83-92% above 2 kHz, and
   `page-turn` is not 16-bit and crashes the reader. They were the obvious
   choices BY NAME for a film workshop, which is exactly reel 115's finding.
   Four more were dropped on their own measurements: `split_flap` (161ms attack,
   AIR — so the split-flap cascade is ONE `ratchet` rather than nineteen ticks),
   `scanner_sweep` (AIR), `deep_engine` (SWELL-346ms) and `shop_bed` (NOISE-BED).

   ⭐ THE BANK BELONGS TO THE WORLD. This is a trade row and the workshops
   behind it: a shutter chain ratcheting, a bottom rail ringing, hoists landing,
   lamps striking, a film splicer, a lathe, a scan head, a turntable, a gate
   that will not move, and three plates struck into a cover. **ZERO chiptune
   cues** — the greppable gate is that no `src` starts with `c_`, which returns
   zero.

   ⛔ PERCUSSION MUST BE LOW, NEVER BRIGHT. `impact_deep` (93.1% low),
   `sub` (96.6%), `thock` (88.6%), `rebuild_thud` (90.3%), `chair_knock` (70.1%)
   and `motor_sag` (86.6%) carry the weight. Every BRIGHT cue is used at most
   four times, under the SLAP gate's threshold of five.

   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. The count PEAKS on S0 (the hook, 7), S3
   (the line, 6) and S14 (the peak, 7), and thins to TWO on S8 — the scene whose
   whole point is that nobody is in the room.
   -------------------------------------------------------------------------- */
export const SFX: Cue[] = [
  /* ---- S0 · THE ROW. The heaviest stack in the reel — frame 0 is the
     interrupt and it gets the biggest cue set. 7 cues. ------------------- */
  { at: S(L.S0 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 2.4, rate: 0.88 },
  { at: S(L.S0 + 0),  src: "sub.wav",         v: LEVELS.SFX_HERO,    dur: 0.9, rate: 0.74 },
  /* ⭐ THE CHAIN IS AUDIBLE BEFORE IT IS DRAMATIC. Three ratchets, ascending,
     on the three pulls — the sound carries the same anticipation the picture
     does, and `ratchet` is 22ms attack and cannot swell. */
  ...[6, 22, 40].map((a, i) => ({
    at: S(L.S0 + a), src: "ratchet.wav",
    v: LEVELS.SFX_MID * db(i * 1.1), dur: 0.5, rate: 0.92 + i * 0.1,
  })),
  { at: S(L.S0 + 54), src: "chair_knock.wav", v: LEVELS.SFX_MID,     dur: 0.3 },
  { at: S(L.S0 + 56), src: "gong.wav",        v: LEVELS.SFX_TEXTURE, dur: 1.4, rate: 1.28 },

  /* ---- S1 · THE FIT-OUT. Three landings, each a low thud plus its lock. 5 -- */
  { at: S(L.S1 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.3, rate: 1.05 },
  ...[18, 38, 58].map((a, i) => ({
    at: S(L.S1 + a), src: "rebuild_thud.wav",
    v: LEVELS.SFX_HERO * db(-2 + i * 1.0), dur: 0.8, rate: 0.94 + i * 0.07,
  })),
  { at: S(L.S1 + 62), src: "mech_clank.wav",  v: LEVELS.SFX_MID,     dur: 0.12 },

  /* ---- S2 · THE MILL. The lamp strikes, then the flaps run. 3 ----------- */
  { at: S(L.S2 + 6),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,     dur: 0.27 },
  { at: S(L.S2 + 10), src: "spotlight_snap.wav", v: LEVELS.SFX_HERO, dur: 0.4 },
  /* ⭐ ONE cue for the whole nineteen-cell cascade. Nineteen bright ticks is
     the metronome-of-slaps the SLAP gate exists to stop. */
  { at: S(L.S2 + 12), src: "ratchet.wav",     v: LEVELS.SFX_MID,     dur: 0.5, rate: 1.34 },

  /* ---- S3 · THE LINE. The word drops in, then three stations fire on their
     own spoken words. 6 cues, and the beats are the caption onsets. ------- */
  { at: S(L.S3 + 0),  src: "motor_sag.wav",   v: LEVELS.SFX_BED,     dur: 0.85, rate: 1.1 },
  { at: S(L.S3 + 12), src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.16 },
  { at: S(L.S3 + 32), src: "gear_shift.wav",  v: LEVELS.SFX_HERO,    dur: 0.09, rate: 1.05 },
  { at: S(L.S3 + 54), src: "knife_switch.wav", v: LEVELS.SFX_HERO,   dur: 0.12 },
  { at: S(L.S3 + 77), src: "slate_whump.wav", v: LEVELS.SFX_HERO,    dur: 0.16 },
  { at: S(L.S3 + 81), src: "impact_deep.wav", v: LEVELS.SFX_MID,     dur: 0.8, rate: 1.14 },

  /* ---- S4 · THE COUNTER. A slide and a stamp. 2 ------------------------ */
  { at: S(L.S4 + 4),  src: "twang.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 0.9 },
  { at: S(L.S4 + 20), src: "stamp_press.wav", v: LEVELS.SFX_HERO,    dur: 0.34 },

  /* ---- S5 · THE BOOTH. The sign glows, the disc swings round. 2 -------- */
  { at: S(L.S5 + 9),  src: "lamp_clunk.wav",  v: LEVELS.SFX_MID,     dur: 0.27, rate: 1.16 },
  { at: S(L.S5 + 12), src: "gear_shift.wav",  v: LEVELS.SFX_MID,     dur: 0.09, rate: 0.82 },

  /* ---- S6 · THE LATHE. The cutter drops, the copies stack, accelerating.
     3 cues, and the disc run is ONE cue rather than seven. --------------- */
  { at: S(L.S6 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED,     dur: 1.5, rate: 1.14 },
  { at: S(L.S6 + 13), src: "mech_clank.wav",  v: LEVELS.SFX_HERO,    dur: 0.12 },
  { at: S(L.S6 + 22), src: "data.wav",        v: LEVELS.SFX_MID,     dur: 0.21, rate: 1.2 },

  /* ---- S7 · THE STALLS. The rail runs, both trays fill. 2 -------------- */
  { at: S(L.S7 + 0),  src: "stage_hum.wav",   v: LEVELS.SFX_BED,     dur: 2.0, rate: 1.22 },
  { at: S(L.S7 + 40), src: "bell_ring.wav",   v: LEVELS.SFX_MID,     dur: 1.6, rate: 1.1 },

  /* ---- S8 · THE EMPTY BOOTH. ⭐ THE THINNEST SCENE IN THE REEL, on purpose:
     the beat is that nobody is in the room, and density is a SHAPE. 2 ----- */
  { at: S(L.S8 + 30), src: "thock.wav",       v: LEVELS.SFX_MID,     dur: 0.16, rate: 0.86 },
  { at: S(L.S8 + 4),  src: "motor_sag.wav",   v: LEVELS.SFX_BED,     dur: 0.85, rate: 1.3 },

  /* ---- S9 · THE 3D SHOP. The head drives down and the name burns in. 2 -- */
  { at: S(L.S9 + 4),  src: "chair_knock.wav", v: LEVELS.SFX_MID,     dur: 0.3, rate: 0.9 },
  { at: S(L.S9 + 8),  src: "scan_beep.wav",   v: LEVELS.SFX_HERO,    dur: 0.4, rate: 0.94 },

  /* ---- S10 · THE TEAR-OUT. The tongs close, the beam REFUSES, it tears. 3 */
  { at: S(L.S10 + 6),  src: "mech_clank.wav", v: LEVELS.SFX_MID,     dur: 0.12, rate: 0.88 },
  { at: S(L.S10 + 14), src: "motor_sag.wav",  v: LEVELS.SFX_MID,     dur: 0.85, rate: 0.82 },
  { at: S(L.S10 + 22), src: "bamboo_crack.wav", v: LEVELS.SFX_HERO,  dur: 0.4 },

  /* ---- S11 · THE TURNTABLE. Spin, then three lamps in an ASCENDING run so
     the repeat reads as progress rather than repetition. 3 (the lamps are one
     mapped cue expanded to three). --------------------------------------- */
  { at: S(L.S11 + 27), src: "gear_shift.wav", v: LEVELS.SFX_MID,     dur: 0.09, rate: 0.94 },
  ...[40, 44, 48].map((a, i) => ({
    at: S(L.S11 + a), src: "spotlight_snap.wav",
    v: LEVELS.SFX_MID * db(i * 0.8), dur: 0.4, rate: 0.96 + i * 0.14,
  })),

  /* ---- S12 · THE DOCK. The conveyor runs and the last crate is stamped. 2 */
  { at: S(L.S12 + 0),  src: "engine_idle.wav", v: LEVELS.SFX_BED,    dur: 2.1, rate: 0.96 },
  { at: S(L.S12 + 44), src: "stamp_press.wav", v: LEVELS.SFX_HERO,   dur: 0.34, rate: 0.92 },

  /* ---- S13 · THE GATE. Two shoves, and nothing gives. The second is LOWER
     than the first, because it achieves less. 3 -------------------------- */
  { at: S(L.S13 + 13), src: "impact_deep.wav", v: LEVELS.SFX_HERO,   dur: 0.8, rate: 0.78 },
  { at: S(L.S13 + 30), src: "impact_deep.wav", v: LEVELS.SFX_HERO * db(-3), dur: 0.8, rate: 0.72 },
  { at: S(L.S13 + 16), src: "thock.wav",       v: LEVELS.SFX_TEXTURE, dur: 0.16, rate: 0.8 },

  /* ---- S14 · THE PEAK. Three strikes in an ASCENDING run, then the bar
     lifts and the gate opens. 7 cues — the second-heaviest stack. -------- */
  ...[30, 36, 48].map((a, i) => ({
    at: S(L.S14 + a), src: "gold_stamp.wav",
    v: LEVELS.SFX_HERO * db(-3 + i * 1.6), dur: 0.5, rate: 0.92 + i * 0.12,
  })),
  { at: S(L.S14 + 30), src: "thock.wav",       v: LEVELS.SFX_MID,    dur: 0.16 },
  { at: S(L.S14 + 58), src: "ratchet.wav",     v: LEVELS.SFX_MID,    dur: 0.5, rate: 0.86 },
  { at: S(L.S14 + 62), src: "rebuild_thud.wav", v: LEVELS.SFX_HERO,  dur: 0.8, rate: 0.86 },
  { at: S(L.S14 + 68), src: "gong.wav",        v: LEVELS.SFX_MID,    dur: 2.2, rate: 0.96 },

  /* ---- S15 · THROUGH THE GATE. The plate sets, and the row is open. 3 --- */
  { at: S(L.S15 + 4),  src: "gold_stamp.wav",  v: LEVELS.SFX_HERO,   dur: 0.5, rate: 1.06 },
  { at: S(L.S15 + 6),  src: "sub.wav",         v: LEVELS.SFX_MID,    dur: 0.42, rate: 0.88 },
  { at: S(L.S15 + 10), src: "bell_ring.wav",   v: LEVELS.SFX_TEXTURE, dur: 1.6, rate: 0.92 },
];

/* ---- THE MUSIC ------------------------------------------------------------
   ⛔⛔⛔ THE HOUSE BED IS A REAL TRACK, not a synthesised pad (Alex, reel 116:
   *"the BG music is completely wrong… it's not the right bg music we typically
   use."*). `ados` = Another Day Of Sun, `ebm` = Every Living Breathing Moment.

   ⛔ THE THREE ARE DIFFERENT PASSAGES, not one file at three volumes — an
   audio-only variant is a pixel duplicate. `house` is ados from 0.78s (its
   first downbeat), `steel` is ados from 19.0s (a different section of the same
   song), `amber` is ebm_hot from 22.2s.

   ⛔ NO `afade in`: a fade kills the first downbeat and `MUSIC_ONSET_0` wants
   the bed audible inside 150ms. Each source was PRE-TRIMMED to its own
   downbeat. Measured after the chain: all three at **0ms**.

   ⛔⛔ AND THE FIX IS SPECTRUM, NOT VOLUME — but the correction runs BOTH WAYS
   and it is per-source. `ados_bed_loud` is 90% under 250 Hz raw, and reel 123's
   published chain left it at **87.3%**, which is past the point where a phone
   speaker (rolling off below ~400 Hz) reproduces it at all. `ebm_hot` is 65.8%
   raw and the same chain over-corrected it to **34.7%**, which fights the
   voice. Each bed got its own EQ solved against the 55-70% band:
     house  ados @0.78s  −8/+8/+9   ->  68.0%
     amber  ebm  @22.2s  −1/+1.5/+1.5 -> 55.3%
     steel  ados @19.0s  −4/+3.6/+4 ->  59.6%
   ⭐ A chain that fixed one bed is not a constant, and a chain that fixed one
   SOURCE is not a constant either. */
const BED: Record<Variant, string> = {
  house: "133build_bed.wav",
  amber: "133build_bed_amber.wav",
  steel: "133build_bed_steel.wav",
};

/** a different caption band Y per cut — another axis a perceptual hash reads */
const CAP_Y: Record<Variant, number> = { house: 1268, amber: 1344, steel: 1196 };

/* ⛔⛔ A GAIN THAT FIXED ONE REEL IS NOT A CONSTANT, so this is re-solved on
   THESE files. ⛔ AND THE STANDING CAP IS volume 0.25 (Alex: *"the background
   music is too loud compared to the voiceover"*): db(7.90) x LEVELS.MUSIC =
   0.2483, inside the cap, so the gain is not the lever — the spectrum is. */
export const BED_GAIN: Record<Variant, number> = {
  house: db(7.90),   /* -> volume 0.2483, against the 0.25 cap */
  amber: db(7.60),
  steel: db(7.45),   /* the loudest of the three files, so the least make-up */
};
/** the bed-only A/B: identical picture, bed 6 dB down */
export const BED_QUIET = db(-6);

/** ⛔ THE PICKED HOOK. `shutter` IS S0 itself, so the candidate that was chosen
    and the scene that ships are the same code and cannot drift apart.
    ⏳ Not yet picked by Alex — four candidates render as their own comps. */
export const PICKED: HookId = "shutter";

export const makeReel = (v: Variant, quiet = false, hook: HookId = PICKED): React.FC => () => {
  const f = useCurrentFrame();
  const S0 = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("133_build_vo.wav")} volume={LEVELS.DIALOGUE} />
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
            <Sequence from={L.S14} durationInFrames={DUR.S14}><S14 v={v} dur={DUR.S14} /></Sequence>
            <Sequence from={L.S15} durationInFrames={DUR.S15}><S15 v={v} dur={DUR.S15} /></Sequence>
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
   Reel 107: *"the header needs to be there the whole time."* Reel 108: *"the
   headers don't change."* Both are true and they are not the same instruction.
   ⛔ AND A HEADER STATES THE CLAIM IN THE VIEWER'S WORDS — the OUTCOME they
   want to be able to do, never the set and never the theme. Alex rewrote one
   himself on reel 124 (*"Create 3D AI Websites"*), which is the register.
   Nothing below says "the trade row", "the shutter" or "the gate".
   ⭐ THE TEST: read ONE band muted with nothing else on screen. If it does not
   tell you what is on offer, it is describing the reel instead of the product.
   ====================================================================== */
const BANDS = [
  { from: L.S0,  big: "3 FREE AI TOOLS",      hot: "SELL THEM ON FIVERR" },
  { from: L.S1,  big: "5 MINUTES TO SET UP",  hot: "ALL THREE" },
  { from: L.S2,  big: "TURN ONE TOPIC",       hot: "INTO A FINISHED VIDEO" },
  { from: L.S4,  big: "SELL VIDEO EDITING",   hot: "WITHOUT EDITING" },
  { from: L.S5,  big: "CLONE YOUR OWN VOICE", hot: "FROM ONE MINUTE" },
  { from: L.S7,  big: "SELL NARRATION",       hot: "WITHOUT RECORDING" },
  { from: L.S9,  big: "TURN ONE PHOTO",       hot: "INTO A 3D MODEL" },
  { from: L.S12, big: "SELL 3D TO ECOM",      hot: "BRANDS AND SHOPS" },
  { from: L.S13, big: "THE TOOLS ARE FREE",   hot: "SELLING THEM ISN'T" },
  { from: L.S14, big: "COMMENT BUILD",        hot: "FOR THE FREE GUIDE" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  /* ⭐⭐ THE HEADER IS ON FROM FRAME 0 (Alex, reel 131: *"where is the header in
     the hook scene?"*). It is also the one MEASURED IG-performance rule in the
     repo — across reel 94's six trial cuts the two that performed both opened
     with a cream claim plate and the four that did not had none. */
  let b = BANDS[0];
  for (const x of BANDS) if (f >= x.from) b = x;
  /* ⛔ FRAME 0 MAY NOT BE MID-ROLL. `HookHeader` animates in from its own f=0,
     so feeding it f=0 on the reel's frame 0 renders the header at scale 0 — it
     WAS on, and it was invisible on the one frame guaranteed to be seen. */
  return <HookHeader big={b.big} hot={b.hot} f={f - b.from + 12} />;
};

export const ClaudeBuild133Reel = makeReel("house");
export const ClaudeBuild133ReelAmber = makeReel("amber");
export const ClaudeBuild133ReelSteel = makeReel("steel");

/* =========================================================================
   ⛔ THE HOOK EXPERIMENT — each candidate as a standalone 100-frame cut, on the
   real chassis with the real VO, bed, captions and progress rail, so the pick
   is made on the thing a viewer would actually be served rather than on a
   description. Its own header band rides each one, because the header IS half
   of what is being chosen.
   ====================================================================== */
export const HookCut = (id: HookId): React.FC => () => {
  const f = useCurrentFrame();
  const Cut = HOOKS[id];
  const b = HOOK_BANDS[id];
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("133_build_vo.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED.house)} volume={LEVELS.MUSIC * BED_GAIN.house} />
      <SfxTrack cues={SFX.filter(c => c.at < 100 / FPS + 0.4)} />
      <CamCtx.Provider value={{ ...CAM.house }}>
        <AssemblyCtx.Provider value={true}>
          <div style={{ position: "absolute", inset: 0, filter: GRADE.house }}>
            <Sequence from={0} durationInFrames={100}><Cut v="house" dur={72} /></Sequence>
          </div>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y.house} />
      <HookHeader big={b.big} hot={b.hot} f={f + 12} />
    </AbsoluteFill>
  );
};
