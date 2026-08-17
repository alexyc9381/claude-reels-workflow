import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10 } from "./CldScenes";
import type { Variant } from "./CldScenes";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_claude.json";

/* ===========================================================================
   REEL 107 · "CLAUDE" — THE ASSEMBLY.  Board: storyboards/107-claude.md.

   Three free things worth having: Anthropic Academy's 22 courses, the official
   `anthropics/skills` repo at 169,585 stars, and 100+ community subagents.

   VO: public/vo_107claude.wav — 35.06s, 179 words, cut from a 51.18s raw take
   (one whole duplicated closing line removed, nine pauses tightened, x1.10).

   ⛔⛔ THREE TRIAL CUTS FROM ONE FACTORY, never three copied files
      ([[feedback_trial_reel_variants]]: "build it as makeReel(variant) so one
      fix lands in all cuts"). IG flags near-duplicates, so the axes that vary
      are the ones a perceptual hash samples hardest:
        1. a completely different HOOK WORLD (floor / screens / baydoor) —
           different set, different props, different action AND exit
        2. a different BED per cut
        3. an in-panel CAMERA OFFSET on every scene (CldScenes.CAM)
        4. a different PUSH on every scene (CldScenes.push)
        5. a different CAPTION BAND Y
      ⛔ The camera offset goes on the panel CONTENTS, never the whole comp:
      scaling the comp moves the chassis and wrecks the motion audit (measured
      on reels 83/84 — 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content).

   ⛔⛔ THE HEADER IS ON FOR ALL 1052 FRAMES. Alex: *"the header needs to be
      there the whole time"*. It is rendered HERE, at root, outside every
      Sequence — not per-scene, and never dropped after the hook. It is also
      fed `f + 12` so it is SETTLED on frame 0 (SectionHeader fades in over 10
      frames, which is why every earlier review still had no header on it).

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1052 frames = 35.067s. The VO's last word is still sounding at 35.02s and
    the file runs to 35.063s, so the reel hard-cuts on it. */
export const CLD_TOTAL = 1052;

/* ⛔ MEASURED WORD ONSETS from src/data/words_claude.json, converted to
   frames. Nothing here is estimated. */
export const L = {
  S0: 0, S1: 200, S2: 317, S3: 368, S4: 488, S5: 538,
  S6: 651, S7: 719, S8: 807, S9: 880, S10: 992, END: 1052,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.S9 - L.S8, S9: L.S10 - L.S9, S10: L.END - L.S10,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔ EVERY SCENE CUT GETS A TRANSIENT — a cut with no sound reads as a glitch.
      The cuts are at 0 / 2.37 / 4.24 / 6.65 / 10.57 / 12.26 / 16.27 / 17.93 /
      21.70 / 23.97 / 26.91 / 29.32 / 33.07.
   ⛔ FRAME 0 IS A SETTLED POSTER, so it carries LOW-BAND WEIGHT ONLY. Scoring
      an impact on an event that is not yet on screen is what made reel 105's
      hook sound like mush.
   ------------------------------------------------------------------------ */
/* ⛔⛔⛔ BANNED CUES — NEVER REINTRODUCE THESE TWO.
   Alex: *"theres a long hissing sound effect at like 14 seconds in all the vids
   and all throughout this video like even at the beginning, its so bad never use
   that one"*.
   MEASURED, which is how they were identified:
     am/cloth-shiver.wav  2.30s · centroid 13,862Hz · 98.3% of energy >2kHz · 0% <250Hz
     am/paper-rustle.wav  2.25s · centroid 11,988Hz · 91.6% >2kHz
   Both are seconds-long BROADBAND HIGH-FREQUENCY NOISE, i.e. hiss with no body.
   Worse, they overlapped: paper-rustle at 12.55 (2.25s) + cloth-shiver at 13.60
   (2.30s) + paper-rustle at 14.80 (2.25s) ran a CONTINUOUS 4.5-SECOND HISS from
   12.55 to 17.05, which is exactly the "at like 14 seconds" note.
   ⛔ They were also no longer motivated: the paper they were scoring came out of
   the picture rounds ago, so a paper rustle was doubling the error.
   ⭐ THE RULE: a cue longer than ~1s with >85% of its energy above 2kHz is a hiss
   bed, not a sound effect. Spectral-check before using anything long. */
/* ⭐ A THIRD ONE THE AUDIT CAUGHT that I would have missed by ear: check-pop is
   0.95s at 91.5% >2kHz, and it fired THREE TIMES IN A ROW at 0.66/1.13/1.60 —
   the "even at the beginning" half of the note. Replaced with blip_up (0.35s,
   14.7% >2kHz) and pickup_chime (0.34s, 1.2%), which have a body.
   ⭐ The audit is worth keeping: parse the cue list, and flag anything
   `dur > 0.8s AND >85% of energy above 2kHz`. It found all three in one pass. */
/* ⛔⛔⛔ THE FULL BAN LIST, and how each one was caught. Three separate rounds of
   "I still hear a puff of air" came from THREE DIFFERENT defects, so there are
   three gates now and `tools/sfx_audit.py` runs all of them over the cue list:
     1 HISS BED   dur > 0.8s AND >85% of energy above 2kHz
                  -> cloth-shiver (2.30s/98.3%), paper-rustle (2.25s/91.6%),
                     check-pop (0.95s/91.5%)
     2 AIR SWELL  attack > 40ms AND <250Hz energy < 15%
                  -> swooshup (73ms), swooshdn (217ms), blip_up (167ms),
                     click-hard (192ms), chimehi (68ms)
     3 OVER-RING  a cue must not sustain longer than the event it scores
   ⛔ I introduced blip_up MYSELF as the fix for check-pop, and it failed gate 2
      because I wrote that gate and never ran it across the bank. Write the gate,
      then RUN it on everything, not just the cue you are replacing. */
const BANNED_SFX = ["am/cloth-shiver.wav", "am/paper-rustle.wav",
  "am/check-pop.wav", "swooshup.wav", "swooshdn.wav", "blip_up.wav",
  "am/click-hard.wav", "chimehi.wav", "am/whoosh-fast.wav",
  "lib_whoosh.wav", "boom.wav",
  /* ⛔ the "hitting sound" — bright clappy percussion, banned 2026-08-17 */
  "clap_slam.wav", "punch_thud.wav"] as const;

const SFX: Cue[] = [
  /* ⛔⛔⛔ NO CLAPPY PERCUSSION, AND NO TRANSIENT ON EVERY CUT.
     Alex: *"i hate that there is keep a hitting sound like at 3.7 ish seconds,
     6.2 ish seconds, etc like that sounds like shit, never do that sound again"*.
     ⭐ It was `clap_slam` on ALL THIRTEEN scene cuts — by far the most repeated
     sound in the reel, which is why it read as "keeps" happening, why it was in
     every cut (the bank is shared by the factory), and why the two times he
     named are 0.5s under my cut hits at 4.24 and 6.65: the same two events.
     ⛔ THE RULE, and it is now a ban: **percussion must be LOW, never BRIGHT.**
     A transient with most of its energy up top is a SLAP; the same event carried
     under 250Hz is a thud you feel. Measured, which is how the two offenders
     were picked out of the bank:
       clap_slam   62.0% >2kHz ·  9.6% <250Hz   <- banned, the "hitting sound"
       punch_thud  93.7% >2kHz ·  3.3% <250Hz   <- banned, same defect
       thock        1.3% >2kHz · 88.6% <250Hz   ✅
       impact       6.2% >2kHz · 42.1% <250Hz   ✅
       impact_deep  0.4% >2kHz · 93.1% <250Hz   ✅
       sub          0.8% >2kHz · 96.6% <250Hz   ✅
     ⛔ AND THE STRUCTURAL FIX: "every scene cut gets a transient" was my own rule
     and it was wrong at this cue count — 13 identical marks is a metronome, not
     an edit. The picture cut carries itself. Only FIVE structural beats keep a
     mark now, all low and warm, and every other cut is silent.
     41 cues = 1.17/sec, inside the house range (95 TOOLS 0.98 · 105 FREE 1.13). */

  /* ---- S0a 0.00 · the workroom, two Claudes flung off the far stations ---- */
  { at: 0.00, src: "sub.wav", v: LEVELS.SFX_BED, dur: 0.42 },
  { at: 0.53, src: "thock.wav", v: db(-11), dur: 0.16, rate: 0.88 },
  { at: 1.33, src: "impact.wav", v: db(-11), dur: 0.62 },

  /* ---- S0c 4.24 · the gap opens — STRUCTURAL BEAT, low mark only ---- */
  { at: 4.24, src: "sub.wav", v: db(-13), dur: 0.42 },
  { at: 5.90, src: "impact_deep.wav", v: db(-14), dur: 0.80 },

  /* ---- S1 6.65 · the three things carried in and set down ----------------
     No cut mark. The three landings ARE the sound of this scene. */
  ...[7.52, 8.39, 9.26].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-10 + i * 0.5), dur: 0.16, rate: 0.92 - i * 0.04,
  } as Cue)),

  /* ---- S2 10.57 · 22 real courses light across the board ---- */
  { at: 10.72, src: "key.wav", v: db(-20), dur: 0.05, rate: 0.94 },
  { at: 11.02, src: "key.wav", v: db(-20), dur: 0.05, rate: 1.06 },
  { at: 11.66, src: "temper_chime.wav", v: db(-13), dur: 0.70, rate: 1.08 },

  /* ---- S3 12.26 · the lecture, and a certificate printed ---------------- */
  { at: 14.80, src: "ratchet.wav", v: db(-16), dur: 0.50 },
  { at: 15.80, src: "gold_stamp.wav", v: db(-12), dur: 0.50 },

  /* ---- S4 16.27 · the cartridge lifted two-handed ---- */
  { at: 16.50, src: "ratchet.wav", v: db(-17), dur: 0.50, rate: 0.88 },

  /* ---- S5 17.93 · it SLAMS home and the brain charges -------------------
     THE hero. Its weight is `sub` + the cinematic hit, which are 96.6% and
     80.9% LOW — a slam you feel in the chest, not a clap. */
  { at: 18.93, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.40 },
  { at: 18.93, src: "sub.wav", v: db(-11), dur: 0.42 },
  { at: 18.93, src: "thock.wav", v: db(-11), dur: 0.16, rate: 0.78 },
  ...[19.35, 20.10, 20.85].map((t, i) => ({
    at: t, src: "c_power.wav", v: db(-33 + i * 0.8), dur: 0.05, rate: 0.86 + i * 0.16,
  } as Cue)),
  { at: 21.35, src: "c_powerbig.wav", v: db(-26), dur: 0.45 },

  /* ---- S6 21.70 · the shutter hauled up ---- */
  { at: 21.90, src: "ratchet.wav", v: db(-13), dur: 0.50 },
  { at: 21.90, src: "thock.wav", v: db(-13), dur: 0.16, rate: 0.80 },
  { at: 23.20, src: "impact.wav", v: db(-12), dur: 0.62 },

  /* ---- S7 23.97 · a hundred Claudes arrive ------------------------------
     The waves were `punch_thud` (93.7% top end) — the same slap defect. They
     land on `thock` now, which is what a crowd of clay sprites should sound
     like hitting a floor. */
  { at: 24.10, src: "thock.wav", v: db(-13), dur: 0.16, rate: 0.86 },
  { at: 25.30, src: "thock.wav", v: db(-11), dur: 0.16, rate: 0.96 },
  { at: 26.55, src: "temper_chime.wav", v: db(-13), dur: 0.70, rate: 0.96 },

  /* ---- S8 26.91 · three helpers drop in and get to work ---- */
  { at: 27.15, src: "c_1up.wav", v: db(-32), dur: 0.09 },
  { at: 27.60, src: "key.wav", v: db(-21), dur: 0.05, rate: 0.92 },
  { at: 28.20, src: "key.wav", v: db(-21), dur: 0.05, rate: 1.08 },

  /* ---- S9 29.32 · your own output climbs — STRUCTURAL BEAT, low mark ---- */
  { at: 29.32, src: "sub.wav", v: db(-13), dur: 0.42 },
  ...[29.65, 30.45, 31.25, 32.05].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-13 + i * 0.6), dur: 0.16, rate: 0.90 + i * 0.05,
  } as Cue)),
  { at: 32.05, src: "c_powerbig.wav", v: db(-30), dur: 0.45, rate: 1.06 },

  /* ---- S10 33.07 · the keyword struck into the plate ---- */
  { at: 33.45, src: "stamp_press.wav", v: db(-14), dur: 0.34, rate: 0.94 },
  { at: 33.85, src: "stamp_press.wav", v: db(-13), dur: 0.34, rate: 1.02 },
  { at: 33.92, src: "impact_deep.wav", v: db(-14), dur: 0.80 },
  { at: 34.10, src: "c_powerbig.wav", v: db(-26), dur: 0.45, rate: 1.06 },
  { at: 34.80, src: "sub.wav", v: db(-13), dur: 0.42 },
];

/** ⛔ A DIFFERENT BED PER CUT — the VO is the same recording and cannot change,
    so the bed is the only real audio-side lever against a fingerprint match. */
/* ⛔⛔ THE PUFF OF AIR WAS IN THE MUSIC, NOT THE SFX.
   Reported four times — "puff of air at 0.5 seconds ish", "poof of air at
   around 0.8 secs", "at nine seconds it sounds like a puff of air" — and
   answered three times by rebuilding the SFX bank, which changed nothing,
   because the SFX were never making the sound.

   Scanning the beds for the AIR-SWELL envelope (0.5s window, peak arriving
   >45% in, >55% of energy above 2kHz, <15% below 250Hz) found reverse-swell
   risers at exactly the reported times:

     104_plugin_bed   (floor)    0.00s  0.75s  1.00s  8.25s
     103_trade_bed_b  (screens)  0.25s  0.75s  1.00s  2.00s  9.00s  17.00s
     100_apple_bed    (baydoor)  13.50s 14.25s 14.75s 15.75s 18.50s …

   0.75/1.00 and 8.25/9.00 are the 0.8s and 9s reports. Replaced with three
   0-swell beds, each gain-matched to within 0.1 dB of the bed it replaces so
   the VO/music balance the mix was tuned for is untouched, trimmed to the reel
   with an 0.8s tail fade. Lesson: when a note survives three fixes, the fix is
   in the wrong layer — check every stem before rebuilding one of them. */
const BED: Record<Variant, string> = {
  floor:   "107_bed_floor.wav",    /* boris_bed_b  -7.5dB · 0 swells */
  screens: "107_bed_screens.wav",  /* powers_bed  -13.1dB · 0 swells */
  baydoor: "107_bed_baydoor.wav",  /* cancel_bed_c -5.8dB · 0 swells */
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { floor: 1236, screens: 1288, baydoor: 1196 };

export const makeReel = (v: Variant): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
/* ⛔⛔⛔ THE FIFTH "PUFF OF AIR" REPORT WAS THE VOICE ITSELF.
   Alex: *"i still hear like a puff of air sfx at around 0.8-1 second"*. Proved by
   CONSTRUCTION this time rather than by inference — the layers were soloed and
   re-rendered, and across 0.60-1.23s the SFX track measures **-180 dB, i.e.
   digital silence**, with the bed at -61 dB rms. There is no effect there at all.
   What remains is the VO: an aspirated consonant at 0.77-0.81s carrying 45-52% of
   its energy in the 2-8kHz band. A hard consonant IS a puff of air.
   ⭐ FIX: `vo_107claude_deair.wav` — a real de-esser (2.6kHz split, sidechain on
   air-vs-body ratio, 5ms attack / 40ms release, max 11 dB). Active on 12.6% of
   hops, mean cut 4.7 dB. The bursts drop 4.6-9.9 dB; voiced speech moves by
   -0.02 dB and the overall file level by -0.05 dB. Re-transcribed at 94.7% vs
   the canonical script, every difference being whisper hearing "Claude" as
   "cloud" — a homophone, not damage. ⛔ The original stays untouched on disk. */
      <Audio src={staticFile("vo_107claude_deair.wav")} volume={LEVELS.DIALOGUE} />
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC} />
      <SfxTrack cues={SFX} />

      <AssemblyCtx.Provider value={true}>
        <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} /></Sequence>
        <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
        <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 /></Sequence>
        <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 /></Sequence>
        <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 /></Sequence>
        <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 /></Sequence>
        <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 /></Sequence>
        <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 /></Sequence>
        <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 /></Sequence>
        <Sequence from={L.S9} durationInFrames={DUR.S9}><S9 v={v} /></Sequence>
        <Sequence from={L.S10} durationInFrames={DUR.S10}><S10 v={v} /></Sequence>
      </AssemblyCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      {/* ⛔ ON THE WHOLE TIME, and settled at frame 0 */}
      {/* ⭐ Alex's wording, and it is the better header: "RESOURCES / MOST PEOPLE
          NEVER OPEN" describes the video, whereas "TOOLS TO NOT FALL BEHIND"
          states the STAKE, which is what the hook VO is actually about.
          Auto-fit: longest line is 19 chars, so it renders at the full 56px. */}
      <HookHeader big="3 FREE CLAUDE TOOLS" hot="TO NOT FALL BEHIND" f={f + 12} />
    </AbsoluteFill>
  );
};

export const ReelFloor = makeReel("floor");
export const ReelScreens = makeReel("screens");
export const ReelBaydoor = makeReel("baydoor");
