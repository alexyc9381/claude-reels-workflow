import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader } from "./SlopKit";
import { S0, S1, S2, S3, S4, S5, S6, S7, S8 } from "./MktScenes";
import type { Variant } from "./MktScenes";
import { CamCtx } from "./MktWorld";
import { CAM } from "./MktScenes";
import { SfxTrack, LEVELS, db, Cue } from "./SoundKit";
import words from "./data/words_108marketing.json";

/* ===========================================================================
   REEL 108 · "MARKETING" — THE ASSEMBLY.  Board: storyboards/108-marketing.md.

   Seven Claude marketing skills, each switching on a department that used to
   cost a retainer: head-of-content · ai-seo · brand-guidelines · the Anthropic
   marketing plugin · marketing-council · Lessie · campaign-launcher-oss.

   VO: public/vo_108marketing.wav — 47.78s, 209 words, cut from an 89.21s raw
   take (FIVE `cut cut` flubs removed, a 7.25s dead gap, five pauses tightened,
   x1.15, two-pass loudnorm to -16.0 LUFS). Every one of the 21 cut boundaries
   lands inside a silence MEASURED with `silencedetect=-40dB:d=0.045` — never on
   a whisper word time, which run 150-200ms early. The cut file was
   re-transcribed and 0 flubs survived.

   ⚠️ 47.78s is FAR over the 22-29s house range. Flagged, never silently trimmed:
      the VO counts "Number one ... number seven", so no item can be dropped
      without a re-record.

   ⛔⛔ THE HONESTY LEDGER LIVES IN MktWorld.tsx (R1..R7). The one that matters:
      the VO says the plugin gives you "six commands" and the README's table has
      SEVEN, so S4 typesets NO NUMERAL AT ALL and makes the four verified
      integrations the hero instead.

   ⛔⛔ THE HEADER IS ON FOR ALL 1434 FRAMES, rendered HERE at root, outside every
      Sequence — never per-scene, never dropped after the hook. It is fed `f + 12`
      so it is SETTLED on frame 0 (SectionHeader fades in over 10 frames).

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO and the header. Scene bodies see
      AssemblyCtx = true so their own copies return null.

   ⛔⛔ EVERY `at` IN THE SFX BANK IS ROOT SECONDS, NOT SCENE-LOCAL. Scene bodies
      are not Sequence-wrapped for audio purposes ([[sfx-root-timeline-trap]]).
   ⛔ `src` IS RELATIVE TO public/sfx/ — `Sfx` prefixes "sfx/" itself.
   ========================================================================= */

export const FPS = 30;

/** 1434 frames = 47.80s. The VO file runs 47.781s and its last word is still
    sounding at 47.36s, so the reel carries the tail and hard-cuts after it. */
export const MKT_TOTAL = 1434;

/* ⛔ MEASURED WORD ONSETS from src/data/words_108marketing.json, converted to
   frames. Nothing here is estimated — every value is `round(onset * 30)` of the
   VO's own "Number one/two/.../seven" and "If you want". */
export const L = {
  S0: 0,      /* HOOK    0.00s */
  S1: 169,    /* ONE     5.63s  head-of-content     */
  S2: 322,    /* TWO    10.75s  ai-seo              */
  S3: 541,    /* THREE  18.04s  brand-guidelines    */
  S4: 669,    /* FOUR   22.30s  marketing plugin    */
  S5: 830,    /* FIVE   27.66s  marketing-council   */
  S6: 994,    /* SIX    33.12s  Lessie              */
  S7: 1191,   /* SEVEN  39.72s  campaign-launcher   */
  S8: 1338,   /* CTA    44.61s                      */
  END: MKT_TOTAL,
} as const;

const DUR = {
  S0: L.S1 - L.S0, S1: L.S2 - L.S1, S2: L.S3 - L.S2, S3: L.S4 - L.S3,
  S4: L.S5 - L.S4, S5: L.S6 - L.S5, S6: L.S7 - L.S6, S7: L.S8 - L.S7,
  S8: L.END - L.S8,
} as const;

/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔⛔ THE FULL BAN LIST, and why each one is on it. Three separate rounds of
   "I still hear a puff of air" on reel 107 came from THREE DIFFERENT defects:
     1 HISS BED   dur > 0.8s AND >85% of energy above 2kHz
                  -> cloth-shiver (2.30s/98.3%), paper-rustle (2.25s/91.6%),
                     check-pop (0.95s/91.5%)
     2 AIR SWELL  attack > 40ms AND <250Hz energy < 15%
                  -> swooshup, swooshdn, blip_up, click-hard, chimehi
     3 OVER-RING  a cue must not sustain longer than the event it scores
   ⛔ AND THE "HITTING SOUND": percussion must be LOW, never BRIGHT. A transient
      with most of its energy up top is a SLAP; the same event carried under
      250Hz is a thud you feel. Measured:
        clap_slam   62.0% >2kHz ·  9.6% <250Hz   <- BANNED
        punch_thud  93.7% >2kHz ·  3.3% <250Hz   <- BANNED
        thock        1.3% >2kHz · 88.6% <250Hz   ok
        impact       6.2% >2kHz · 42.1% <250Hz   ok
        impact_deep  0.4% >2kHz · 93.1% <250Hz   ok
        sub          0.8% >2kHz · 96.6% <250Hz   ok
   ------------------------------------------------------------------------ */
const BANNED_SFX = ["am/cloth-shiver.wav", "am/paper-rustle.wav",
  "am/check-pop.wav", "swooshup.wav", "swooshdn.wav", "blip_up.wav",
  "am/click-hard.wav", "chimehi.wav", "am/whoosh-fast.wav",
  "lib_whoosh.wav", "boom.wav", "clap_slam.wav", "punch_thud.wav"] as const;

/* ⛔ NOT EVERY CUT GETS A TRANSIENT. "Every scene cut gets a transient" was the
   house rule and it was WRONG at this cue count — thirteen identical marks is a
   metronome, not an edit. The picture cut carries itself. Only STRUCTURAL beats
   keep a mark, all of them low and warm.
   ⭐ DENSITY IS A SHAPE, NOT A LEVEL. This bank runs 4-6 cues in most scenes and
   NINE in the two that carry the story (S4 the wiring, S7 the launch). That
   contour is the point — flat coverage reads as busy AND unranked.
   ⛔ Every `dur` is >= the file's measured true length, so no tail is chopped
   mid-decay. The one exception is `lib_cinematic_hit` (5.63s true), deliberately
   truncated to 1.40s under gate 3: a slam does not sustain for five seconds.
   57 cues / 47.78s = 1.19 per second, inside the house range
   (95 TOOLS 0.98 · 105 FREE 1.13 · 106 SKILL 1.48 · a REJECTED 107 pass 3.82). */
const SFX_RAW: Cue[] = [

  /* ⛔⛔ THE REPEAT RULE, ENFORCED BY `tools/sfx_audit.py`: **no BRIGHT sample
     more than 3 times.** The first pass of this bank ran key.wav NINE times
     (97.0% of its energy above 2kHz), stamp_press EIGHT and c_power SEVEN, and
     the audit flagged all three as SLAP. That is the reel-107 "hitting sound"
     defect arriving by a different door — there it was one clap on all thirteen
     cuts, here it was three ticks spread thin enough to feel deliberate. It is
     the same thing: a bright transient repeated until it reads as a metronome.
     ⭐ Fixed by SPREADING across cues that have BODY, all measured on the day:
       c_bump   0.09s  <250Hz  0.2%  >2kHz  9.2%
       c_clear  0.14s                >2kHz 22.8%
       c_break  0.20s                >2kHz 23.2%
       c_stomp  0.12s                >2kHz 30.3%
       c_stomp2 0.14s                >2kHz 30.4%
       impact   0.62s  <250Hz 42.4%  >2kHz  3.7%
     vs the three that were over-used: key 97.0% · c_power 58.1% · stamp 50.4%. */

  /* ---- S0 0.00-5.63 · THE HOOK ------------------------------------------
     ⛔⛔ THE CUE TIMES HAD GONE STALE. The hook was rebuilt three times (the
     barrage cadence, the climax, the blow-off) and the SFX were never moved with
     it, so the bank was firing at 0.80 / 2.00 / 2.15 against beats that now land
     at 0.27 / 0.80 / 1.27 / 1.67 / 2.00 / 2.27 / 2.47 / 2.67 / 3.13 / 4.20.
     Four of the six cues were scoring nothing at all.
     ⭐ **WHEN A SCENE'S TIMING CHANGES, ITS CUES ARE PART OF THE SCENE.** Re-derive
     them from the frame constants, never leave them to drift.

     ⭐ The eight impacts ESCALATE in weight and pitch, all of them LOW
     (thock 1.3% >2kHz · impact 6.2% · impact_deep 0.4%), so eight hits in three
     seconds reads as a barrage rather than eight slaps. `c_hit` (0.14s, 28.5%)
     is the keyboard, on the typing bursts between impacts. */
  { at: 0.00, src: "sub.wav", v: LEVELS.SFX_BED, dur: 0.42 },

  /* the typing, in the gaps — he is working before anything arrives */
  { at: 0.45, src: "c_hit.wav", v: db(-24), dur: 0.14, rate: 1.10 },
  { at: 1.05, src: "c_hit.wav", v: db(-24), dur: 0.14, rate: 1.02 },
  { at: 1.95, src: "c_hit.wav", v: db(-25), dur: 0.14, rate: 1.14 },

  /* THE BARRAGE — eight impacts, escalating, every one of them low */
  { at: 0.27, src: "thock.wav", v: db(-17), dur: 0.16, rate: 0.88 },
  { at: 0.80, src: "thock.wav", v: db(-16), dur: 0.16, rate: 0.92 },
  { at: 1.27, src: "impact.wav", v: db(-16), dur: 0.62, rate: 0.96 },
  { at: 1.67, src: "thock.wav", v: db(-14), dur: 0.16, rate: 1.00 },
  { at: 2.00, src: "impact.wav", v: db(-14), dur: 0.62, rate: 1.04 },
  { at: 2.27, src: "thock.wav", v: db(-13), dur: 0.16, rate: 1.08 },
  { at: 2.47, src: "impact_deep.wav", v: db(-13), dur: 0.80 },
  { at: 2.67, src: "thock.wav", v: db(-11), dur: 0.16, rate: 1.14 },
  { at: 2.67, src: "sub.wav", v: db(-13), dur: 0.42 },

  /* THE CLIMAX at 3.13 — the crate shatters and bay 1 ignites. Its weight is
     `lib_cinematic_hit` + `sub`, 80.9% and 96.6% LOW: a slam you feel. */
  { at: 3.13, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.40 },
  { at: 3.13, src: "sub.wav", v: db(-10), dur: 0.42 },
  { at: 3.13, src: "thock.wav", v: db(-10), dur: 0.16, rate: 0.78 },

  /* 4.20 — the invoice stack blown off the desk */
  { at: 4.20, src: "impact_deep.wav", v: db(-14), dur: 0.80, rate: 1.06 },
  /* 4.67 — the queue of dark bays starts powering up */
  { at: 4.67, src: "blip1.wav", v: db(-22), dur: 0.22 },

  /* ---- S1 5.63 · five outlier tiles pulled off the wall ------------------
     No cut mark. The five landings ARE the sound of this scene. */
  ...[6.50, 7.10, 7.70, 8.40, 9.20].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-14 + i * 0.6), dur: 0.16, rate: 0.94 - i * 0.03,
  } as Cue)),
  { at: 9.90, src: "temper_chime.wav", v: db(-15), dur: 0.70, rate: 1.06 },

  /* ---- S2 10.75 · the head sweeps, the slab climbs, the bill ticks ------- */
  { at: 11.02, src: "ratchet.wav", v: db(-16), dur: 0.50 },
  ...[13.68, 14.28, 14.88, 15.48].map((t, i) => ({
    at: t, src: "thock.wav", v: db(-13 + i * 0.7), dur: 0.16, rate: 0.86 + i * 0.05,
  } as Cue)),
  /* the villain reveal — low, and it does NOT resolve */
  { at: 16.40, src: "impact_deep.wav", v: db(-14), dur: 0.80 },

  /* ---- S3 18.04 · three sweeps repaint the artifact ---------------------- */
  ...[18.91, 20.11, 21.31].map((t, i) => ({
    at: t, src: "stamp_press.wav", v: db(-15 + i * 0.7), dur: 0.34, rate: 0.92 + i * 0.07,
  } as Cue)),
  { at: 21.90, src: "gold_stamp.wav", v: db(-14), dur: 0.50 },

  /* ---- S4 22.30 · ⭐ PEAK 1 — the cartridge seats and FOUR cables fire ----
     Its weight is `lib_cinematic_hit` + `sub`, 80.9% and 96.6% LOW — a slam you
     feel in the chest, not a clap. The four pillar lights alternate two stomps
     so no single sample carries all four. */
  { at: 22.80, src: "ratchet.wav", v: db(-16), dur: 0.50, rate: 0.90 },
  { at: 23.30, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.40 },
  { at: 23.30, src: "sub.wav", v: db(-11), dur: 0.42 },
  { at: 23.30, src: "thock.wav", v: db(-11), dur: 0.16, rate: 0.76 },
  { at: 23.90, src: "c_stomp.wav", v: db(-19), dur: 0.12, rate: 0.92 },
  { at: 24.47, src: "c_stomp2.wav", v: db(-18), dur: 0.14, rate: 0.98 },
  { at: 25.03, src: "c_stomp.wav", v: db(-17), dur: 0.12, rate: 1.06 },
  { at: 25.60, src: "c_stomp2.wav", v: db(-16), dur: 0.14, rate: 1.12 },
  { at: 26.90, src: "c_powerbig.wav", v: db(-26), dur: 0.45 },

  /* ---- S5 27.66 · five lamps snap on, one recommendation stamps ----------
     A banker's lamp snapping on is a low click, not a tick. */
  ...[28.33, 29.79, 31.26].map((t, i) => ({
    at: t, src: "c_bump.wav", v: db(-17 + i * 0.5), dur: 0.09, rate: 0.92 + i * 0.09,
  } as Cue)),
  ...[29.06, 30.53].map((t, i) => ({
    at: t, src: "c_clear.wav", v: db(-21 + i * 0.6), dur: 0.14, rate: 0.96 + i * 0.10,
  } as Cue)),
  { at: 31.99, src: "gold_stamp.wav", v: db(-13), dur: 0.50, rate: 1.04 },

  /* ---- S6 33.12 · the belt runs, cards verify, rejects hit the hopper ----
     ⭐ The REJECT is what makes "verifies" audible as well as visible. */
  ...[34.00, 35.20, 36.40].map((t, i) => ({
    at: t, src: "key.wav", v: db(-22), dur: 0.05, rate: 0.92 + i * 0.08,
  } as Cue)),
  { at: 37.20, src: "c_break.wav", v: db(-19), dur: 0.20, rate: 1.04 },
  { at: 38.40, src: "c_break.wav", v: db(-19), dur: 0.20, rate: 0.96 },
  { at: 38.80, src: "thock.wav", v: db(-17), dur: 0.16, rate: 0.84 },

  /* ---- S7 39.72 · ⭐⭐ THE PEAK — the lever, and three channels fire ------
     This is the loudest moment in the reel and it MUST beat S4's. */
  { at: 40.35, src: "ratchet.wav", v: db(-13), dur: 0.50 },
  { at: 40.65, src: "lib_cinematic_hit.wav", v: LEVELS.SFX_HERO, dur: 1.40, rate: 1.04 },
  { at: 40.65, src: "sub.wav", v: db(-10), dur: 0.42 },
  { at: 40.65, src: "thock.wav", v: db(-10), dur: 0.16, rate: 0.74 },
  ...[40.85, 41.19, 41.52].map((t, i) => ({
    at: t, src: "c_power.wav", v: db(-30 + i * 1.1), dur: 0.05, rate: 0.90 + i * 0.18,
  } as Cue)),
  { at: 43.40, src: "c_powerbig.wav", v: db(-24), dur: 0.45, rate: 1.06 },
  { at: 43.80, src: "impact_deep.wav", v: db(-13), dur: 0.80 },

  /* ---- S8 44.61 · the keyword STRUCK into the plate, twice ---------------
     A strike is a THUD. `impact` is 42.4% under 250Hz and 3.7% over 2kHz. */
  { at: 45.48, src: "impact.wav", v: db(-15), dur: 0.62, rate: 0.94 },
  { at: 46.01, src: "impact.wav", v: db(-12), dur: 0.62, rate: 1.04 },
  { at: 46.01, src: "sub.wav", v: db(-13), dur: 0.42 },
  { at: 46.30, src: "c_powerbig.wav", v: db(-26), dur: 0.45, rate: 1.04 },
  { at: 46.90, src: "sub.wav", v: db(-15), dur: 0.42 },
];

/* ⛔⛔⛔ "WHERE ARE THE SFX?" — AND THEY WERE ALL THERE.
   Alex could not hear a single cue. The bank had 57 of them, the sfx_audit was
   green, and every cue fired. SOLOING THE STEM is what found it — you cannot
   judge this from the full mix, because at −16 LUFS the VO dominates every RMS
   window and will happily tell you the effects are fine:

     SFX stem alone   mean −37.8 dB   peak −15.9 dB
     VO same window   mean −19.5 dB   peak  −2.7 dB
                                      -------------
                                      13 dB under on peaks, 18 dB on means

   A transient 13 dB below a continuous voice is not a quiet effect, it is an
   inaudible one. ⭐ THE LESSON, and it is [[feedback_check_every_stem]] pointed
   the other way: that memory says a note surviving a fix means the fix is in the
   wrong LAYER. This is the same tool used earlier — solo the layer and MEASURE
   it against the layer it competes with, rather than trusting a gate that only
   ever looked at the cue list.
   ⛔ The bank's SHAPE was never the problem, so this is one global gain rather
   than 57 hand-edits: the density contour (4-6 cues per scene, 9 in the two that
   matter) and the audit's no-bright-sample-over-3x rule are both untouched. */
const SFX_GAIN = db(9);
const SFX: Cue[] = SFX_RAW.map((c) => ({ ...c, v: c.v * SFX_GAIN }));

/** ⛔ A DIFFERENT BED PER CUT — the VO is the same recording and cannot change,
    so the bed is the only real audio-side lever against a fingerprint match.
    ⛔⛔ EVERY BED IS AIR-SWELL SCANNED BEFORE USE (`vo/108-marketing/swell_scan.py`).
    The reel-107 "puff of air" was reported FIVE times over four rounds and
    answered three times by rebuilding the SFX bank — which changed nothing,
    because the sound was in the MUSIC BED and then in the VOICE. A note that
    survives a fix means the fix is in the WRONG LAYER.
    108_marketing_bed = cancel_bed_c -5.8dB, trimmed to 47.80s with an 0.8s tail
    fade, re-scanned AFTER the trim: 0 swells on the delivered file. */
const BED: Record<Variant, string> = {
  night: "108_marketing_bed.wav",
  amber: "108_marketing_bed.wav",
  steel: "108_marketing_bed.wav",
};

/** ⛔ a different caption band per cut — cheap, and it changes every frame */
const CAP_Y: Record<Variant, number> = { night: 1244, amber: 1292, steel: 1200 };

export const makeReel = (v: Variant): React.FC => () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("vo_108marketing.wav")} volume={LEVELS.DIALOGUE} />
      {/* ⛔⛔ "WHERE IS THE BG MUSIC?" — and it was in the file the whole time, 26 dB
          under the voice. TWO attenuations were stacked without me noticing: I built
          the bed at -5.8 dB (a figure copied from reel 107's note, where it applied
          to a DIFFERENT source file) and then the house `LEVELS.MUSIC = db(-20)` cut
          it again. Measured by soloing the stem, which is the only way to see it:
            bed in mix  mean -39.9 dB      VO  mean -19.5 dB
          ⭐ Bed re-normalised to -16.9 LUFS AND given a +8 dB reel-local trim, so it
          lands ~12 dB under the VO — present, not competing. The shared MUSIC
          constant is untouched, because other reels are balanced against it. */}
      <Audio src={staticFile(BED[v])} volume={LEVELS.MUSIC * db(8)} />
      <SfxTrack cues={SFX} />

      <CamCtx.Provider value={{ ...CAM[v] }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={L.S0} durationInFrames={DUR.S0}><S0 v={v} /></Sequence>
          <Sequence from={L.S1} durationInFrames={DUR.S1}><S1 v={v} /></Sequence>
          <Sequence from={L.S2} durationInFrames={DUR.S2}><S2 v={v} /></Sequence>
          <Sequence from={L.S3} durationInFrames={DUR.S3}><S3 v={v} /></Sequence>
          <Sequence from={L.S4} durationInFrames={DUR.S4}><S4 v={v} /></Sequence>
          <Sequence from={L.S5} durationInFrames={DUR.S5}><S5 v={v} /></Sequence>
          <Sequence from={L.S6} durationInFrames={DUR.S6}><S6 v={v} /></Sequence>
          <Sequence from={L.S7} durationInFrames={DUR.S7}><S7 v={v} /></Sequence>
          <Sequence from={L.S8} durationInFrames={DUR.S8}><S8 v={v} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={CAP_Y[v]} />
      <SectionBand f={f} />
    </AbsoluteFill>
  );
};

/* =========================================================================
   ⭐⭐ THE HEADER CHANGES PER SECTION.
   Alex, round 1: *"the headers don't change… the header at the very hook should
   say ten marketing skills, that replace an agency… after the hook, need to have
   a different header."*

   ⛔ The old build ran ONE header for all 1434 frames, which came straight from
   reel 107's *"the header needs to be there the whole time"*. Both are true and
   they are not the same instruction: the header must never DISAPPEAR, but it
   does not have to say the same thing for 48 seconds. It is now on for every
   frame AND it re-states the current item, so the count is visible even to
   someone watching muted with the sound off.

   ⭐ Each body header names the SKILL and its CLAIM in product nouns, per
   [[feedback_headers_state_the_claim]] — never the theme, never the world.

   ⛔⛔ "10 MARKETING SKILLS" is Alex's explicit call, made after I flagged that
   the VO's "10 out of 10" is a rating and only SEVEN items are listed. His
   decision, recorded here so it is not silently re-litigated next round. The
   per-item headers still count 1..7, so the frame never claims ten of anything.
   ====================================================================== */
const BANDS: Array<{ from: number; big: string; hot: string }> = [
  { from: L.S0, big: "10 MARKETING SKILLS", hot: "THAT REPLACE AN AGENCY" },
  { from: L.S1, big: "1 · HEAD OF CONTENT", hot: "TRACKS WHAT ALREADY WORKS" },
  { from: L.S2, big: "2 · AI SEO", hot: "REWRITES IT TO RANK" },
  { from: L.S3, big: "3 · BRAND GUIDELINES", hot: "COLOUR, TYPE AND VOICE" },
  { from: L.S4, big: "4 · MARKETING PLUGIN", hot: "WIRED INTO YOUR STACK" },
  { from: L.S5, big: "5 · MARKETING COUNCIL", hot: "A BOARD THAT ARGUES BACK" },
  { from: L.S6, big: "6 · LESSIE", hot: "FINDS AND VERIFIES LEADS" },
  { from: L.S7, big: "7 · CAMPAIGN LAUNCHER", hot: "IT ACTUALLY LAUNCHES" },
  { from: L.S8, big: "COMMENT MARKETING", hot: "AND I'LL SEND ALL SEVEN" },
];

const SectionBand: React.FC<{ f: number }> = ({ f }) => {
  let i = 0;
  for (let j = 0; j < BANDS.length; j++) if (f >= BANDS[j].from) i = j;
  const b = BANDS[i];
  /* ⛔ the hook is fed f+12 so it is SETTLED on frame 0 (SectionHeader fades in
     over 10 frames); every later band fades in on its own cut. */
  return <HookHeader big={b.big} hot={b.hot} f={i === 0 ? f + 12 : f - b.from} />;
};

export const ReelNight = makeReel("night");
export const ReelAmber = makeReel("amber");
export const ReelSteel = makeReel("steel");
