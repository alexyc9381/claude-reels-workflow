import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx, HookHeader, hexA } from "./SlopKit";
import { S0Hook, S0HookB, S0HookC, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11Cta } from "./RteScenes";
import { CamCtx, PalCtx } from "./RteWorld";
import { SfxTrack, LEVELS, layer, repeat, db, Cue } from "./SoundKit";
import words from "./words_route123.json";
import bedDuck from "./route123_duck.json";

/* ===========================================================================
   REEL 123 · "ROUTE" — everyone pastes their whole pile of notes into the AI
   and it chokes; instead you keep ONE index file that holds pointers rather
   than notes, so Claude opens the three that matter out of two hundred.
   Board: storyboards/123-route.md · Log: memory/reels/route-factory-log.md.

   VO: public/route123_vo.wav — 30.30s, 131 words, 11 beats.

   ⛔⛔ THE RAW TAKE WAS 60.93s AND CONTAINED FIVE ABANDONED RETAKES. He restated
      "there's a much better way" twice, "instead build a context compass" twice,
      "and it pulls the exact research" twice and "Claude will even write your
      final script" THREE times; every dead take ends in `cut cut` and the LAST
      one of each is the clean one. Every boundary came from a MEASURED 10ms RMS
      envelope edge (−45 dBFS floor, 0.18s minimum), never from a whisper word
      time — whisper put the "and" that opens beat O at 41.30s and the audio's
      own rising edge is at 41.69s, 390ms apart, and cutting on the whisper time
      would have spliced the tail of a `cut cut` marker into the body.
   ✅ THE CUT WAS VERIFIED RANGE BY RANGE, NOT END TO END. ⛔⛔ A whole-file pass
      stitches a half-take onto the real one and HIDES the flub — it did exactly
      that here at 53.4-56.0s, emitting `"...directly for you... cut cut... cut
      cut... directly for you."` for a run that is in fact one clean take. All 21
      runs were transcribed SEPARATELY with medium.en; the delivered cut was then
      re-transcribed end to end and came back clean, 11 beats, zero markers.
   ⛔⛔ ROUND 6 — THE PAUSES WERE HALVED. Alex: *"the pause in between each part in
      the VO is too long."* Every inter-beat gap went from 0.26-0.38s to 0.14-0.21s,
      which is TIGHTER than the playbook's own "cap mid gaps to ~0.22s" and is his
      call. The reel went 30.27s -> 28.93s, into the 22-29s house range for the
      first time. ⚠️ It also raises density: overall wps 4.32 -> 4.52 and the worst
      5s window 5.80 -> 5.40 (the window improved because the two densest beats no
      longer sit either side of a long hold). R1 remains over bar and remains
      logged rather than hidden.
   ⛔ atempo 1.00 — NO speedup. R1 is logged as a DEVIATION, not silently passed:
      hook 0-10s is 4.20 wps against a 4.0 bar and the worst 5s window is 5.80
      against 4.5. Both are properties of the RAW TAKE (beats L and O are
      delivered at 5.4 and 5.6 wps before any edit), so the only levers were
      re-recording or wider pauses. The two turns were widened (G→J 0.24→0.28s,
      L→O 0.16→0.30s, which moved the worst window 6.00 → 5.80); widening further
      would push the reel past 31s and read as dead air. The PICTURE carries R4
      duty across that stretch instead — S7 and S8 each run ONE hero action and
      hold their in-panel chip until the line has finished.
   ⚠️ 30.27s is above the 22-29s house range and is being shipped flagged, not
      trimmed: reel 103 shipped at 31.02s and reel 104 at 31.06s, and there is no
      beat here that is not load-bearing.

   ⛔ TWO PLACES THE PICTURE DELIBERATELY STOPS SHORT OF THE AUDIO (board §0):
      1. "add new notes anytime without breaking the system" — the SYSTEM does
         not break; the VO does not claim the index updates itself. S9 therefore
         shows a HAND putting the card in. Nothing in this reel maintains itself.
      2. "save it directly for you" is a FILE WRITE, not a publish. S10 ends in a
         folder in a drawer; nothing is drawn uploading, posting or sending, and
         S10's header states the mechanism the audio glides over.

   ⛔ NO VILLAIN, BY DESIGN — the same finding reel 104 logged. The antagonist is
      the viewer's own habit, embodied as THE HOPPER, which is FURNITURE: no face,
      no voice, capped at S4 and never seen again.

   ⛔⛔ EVERY `at` BELOW IS A MEASURED WORD ONSET from src/words_route123.json,
      pattern-matched on the beat's opening word, never an estimate.

   ⛔ ROOT OWNS THE GLOBAL CHROME: Bg, the one continuous ProgressBar, the one
      KaraokeCaption track, the VO, the bed and every header. Scene bodies see
      AssemblyCtx = true so their own copies return null.
   ========================================================================= */

export const FPS = 30;

/* ⛔⛔ THE REEL HARD-CUTS ON THE LAST AUDIBLE SAMPLE. `words_route123.json` ends
   `guide.` at 30.145s, and the 10ms RMS envelope of the delivered wav is above
   −50 dBFS through 30.26s and silent after. 908 frames = 30.267s, so the cut
   lands on the last audible sample with zero dead tail. */
/** ⛔⛔ EVERY SFX TIME IS DERIVED FROM A BEAT ONSET, NEVER TYPED AS A ROOT SECOND.
    Round 6 shortened every pause in the VO and moved all eleven beats; a bank of
    hard-typed root seconds would have silently drifted up to 1.3s out of sync and
    nothing in the pipeline measures cue placement. `B[n] + offset` moves with the
    cut by construction. */
export const B = [0.000, 2.535, 4.995, 7.780, 9.290, 12.270, 14.000,
                  16.950, 20.260, 22.880, 25.150, 27.725] as const;

export const ROUTE_TOTAL = 868;

type SceneDef = { at: number; C: React.FC; head: [string, string] };

/* ⛔⛔ EVERY HEADER ADDS A FACT THE VO NEVER SAYS, IN PLAIN WORDS
   ([[headers-describe-dont-decorate]]): the FIRST header is the TOPIC for a
   muted viewer, and no header anywhere repeats the line under it — that is R4,
   one channel carrying meaning at a time. ⛔ No header uses a noun the viewer
   would have to decode: no "index", no "context window", no ".md" outside the
   frame's own plates. */
export const SCENES: SceneDef[] = [
  /* ⛔⛔ FIFTH-GRADE READING LEVEL, AND EVERY LINE SAYS WHAT THE VIEWER GETS.
     Alex, 2026-08-27: *"the subheaders need to be 5th grade reading level and
     clear about what its talking about and more about the value."* The first pass
     was written in the reel's own vocabulary — CONTEXT, POINTERS, INDEX, TEMPLATE,
     TO DISK — which is [[no-house-jargon-in-teaching-decks]] exactly: those words
     mean something to the person who built the thing and nothing to a stranger
     three seconds into a muted video.
     ⭐ The rules applied to every line below: only words a ten-year-old uses; name
     the THING on screen, not its category; and state the BENEFIT, not the
     mechanism. "It stores pointers" became "the page holds where your notes are".
     ⛔ One noun for the artifact all the way through — **one page** — so S5, S6 and
     S7 build on each other instead of each introducing a new term. */
  { at: 0,   C: S0Hook, head: ["10X CLAUDE SKILLS", "1 HACK"] },          /* Alex-set */
  { at: 76,  C: S1,     head: ["A LONGER MESSAGE", "MAKES IT WORSE"] },
  { at: 153, C: S2,     head: ["COPYING SOMEONE ELSE", "WASTES YOUR TIME"] },
  { at: 233, C: S3,     head: ["PUT THEM IN ORDER", "SO IT CAN FIND THEM"] },
  { at: 279, C: S4,     head: ["MORE STUFF IN", "IS NOT A BETTER ANSWER"] },
  { at: 368, C: S5,     head: ["IT IS ONE PAGE", "YOU WRITE ONE TIME"] },
  { at: 420, C: S6,     head: ["THE PAGE HOLDS", "WHERE YOUR NOTES ARE"] },
  { at: 508, C: S7,     head: ["IT READS ONE PAGE", "BEFORE ANYTHING ELSE"] },
  /* ⭐ the peak's header is the reel's whole argument as two plain numbers */
  { at: 608, C: S8,     head: ["IT OPENS 3 NOTES", "INSTEAD OF ALL 200"] },
  { at: 686, C: S9,     head: ["ADDING A NOTE", "TAKES ONE LINE"] },
  /* ⭐ the one literal channel correcting the audio: it writes a file, it does not
     hand you a wall of chat to copy out */
  { at: 754, C: S10,    head: ["IT SAVES THE FILE", "NO COPY AND PASTE"] },
  { at: 831, C: S11Cta, head: ["COMMENT ROUTE", "I'LL SEND THE GUIDE"] },
];


/* ---- THE SFX BANK ---------------------------------------------------------
   ⛔⛔ EVERY `dur` BELOW IS >= THE FILE'S MEASURED TRUE LENGTH, measured with
      ffprobe before a single cue was written (docs/THE-OPEN.md: reel 78's first
      bank chopped five of six opening cues mid-decay and the whole open sounded
      cheap):
        impact 0.62 · sub 0.42 · boom 0.55 · thock 0.16 · lib_paper 0.22 ·
        paper 0.30 · blip3 0.22 · swooshup 0.42 · swooshdn 0.42 · snap 0.05 ·
        m_coin 0.49 · chimehi 0.55 · shimmer 0.80 · lib_click 0.29 ·
        lib_pop 0.20 · swish 0.24 · toggle 0.29 · data 0.21 · resolve 0.80 ·
        twang 0.50 · zipline 1.50 · fling 1.10 · m_powerup 0.49 ·
        lib_correct 1.96 · metal_riser 1.95 · lib_riser 2.58 · screech 1.24
   ⛔ `at` is ROOT seconds. Scene bodies are Sequence-wrapped but the SFX track
      is not, so a scene-local frame here would be silently wrong.
   ⛔ EVERY CUT GETS A TRANSIENT ON THE CUT FRAME — a cut with no sound reads as
      a glitch. Frame 0 carries the heaviest stack in the reel (4 cues).
   ⛔ S9 IS THE ONE BEAT WITH NO HEAVY TRANSIENT, BY DESIGN. "Without breaking
      the system" is argued by the room NOT reacting, and a bang there would
      contradict the picture.
   ------------------------------------------------------------------------ */
const H = LEVELS.SFX_HERO, M = LEVELS.SFX_MID, T = LEVELS.SFX_TEXTURE;

export const SFX: Cue[] = [
  /* ---- S0 · the hook. The heaviest cue stack of the reel lands on frame 0. */
  { at: B[0] + 0.00, src: "impact.wav",   v: H,          dur: 0.62, lead: 0 },
  { at: B[0] + 0.00, src: "sub.wav",      v: H * db(-2), dur: 0.42, lead: 0 },
  { at: B[0] + 0.00, src: "boom.wav",     v: M,          dur: 0.55, lead: 0, rate: 0.9 },
  { at: B[0] + 0.00, src: "shimmer.wav",  v: T,          dur: 0.80, lead: 0, rate: 1.2 },
  /* the five slab arrivals — HITS in S0Hook are f4/17/30/43/56 */
  ...[0.10, 0.47, 0.83, 1.20, 1.57].map((o, i) => ({
    at: B[0] + o, src: "lib_paper.wav", v: M * (1 - i * 0.04), dur: 0.22,
    rate: 1 + (i - 2) * 0.07 })),
  ...[0.10, 0.83, 1.57].map((o, i) => ({
    at: B[0] + o, src: "boom.wav", v: M * db(-2), dur: 0.55, rate: 0.86 + i * 0.04 })),
  /* ⭐ THE CRASH. Alex: "add like a crash sfx when the paper stack crashes." The
     load gives way at f60 in every hook — in A the throat splits, in B the lid
     blows off, in C the tower comes down — and all three land on the same beat. */
  { at: B[0] + 1.67, src: "crash.wav",    v: H,          dur: 1.10, lead: 0 },
  { at: B[0] + 1.67, src: "impact.wav",   v: H * db(-3), dur: 0.62 },
  { at: B[0] + 1.67, src: "sub.wav",      v: M,          dur: 0.42 },
  { at: B[0] + 1.83, src: "lib_paper.wav", v: M,         dur: 0.22, rate: 0.8 },

  /* ---- S1 · the intake fills and jams */
  { at: B[1] - 0.12, src: "swooshup.wav", v: M,          dur: 0.42 },
  { at: B[1] + 0.00, src: "boom.wav",     v: M,          dur: 0.55, lead: 0, rate: 1.05 },
  ...repeat(7, B[1] + 0.73, 0.17, { src: "blip3.wav", v: T, dur: 0.22 }, 0.11),
  { at: B[1] + 1.67, src: "impact.wav",   v: H,          dur: 0.62, rate: 0.88 },
  { at: B[1] + 1.67, src: "sub.wav",      v: H * db(-3), dur: 0.42 },
  { at: B[1] + 1.73, src: "lib_paper.wav",v: M,          dur: 0.22, rate: 0.8 },

  /* ---- S2 · the search board */
  { at: B[2] - 0.11, src: "swooshdn.wav", v: M,          dur: 0.42 },
  { at: B[2] + 0.00, src: "thock.wav",    v: M,          dur: 0.16, lead: 0 },
  ...repeat(12, B[2] + 0.27, 0.113, { src: "lib_click.wav", v: T, dur: 0.29 }, 0.045),
  { at: B[2] + 1.74, src: "impact.wav",   v: H * db(-2), dur: 0.62, rate: 0.94 },
  { at: B[2] + 1.74, src: "twang.wav",    v: M,          dur: 0.50, rate: 0.85 },
  { at: B[2] + 2.27, src: "paper.wav",    v: T,          dur: 0.30 },

  /* ---- S3 · the wall re-sorts. ⭐ the wave is a RUN of flips, not one hit. */
  { at: B[3] - 0.14, src: "metal_riser.wav", v: M, dur: 1.95, lead: 52 },
  ...repeat(14, B[3] + 0.13, 0.080, { src: "lib_click.wav", v: T * db(-2), dur: 0.29 }, 0.030),
  { at: B[3] + 1.13, src: "lib_click.wav", v: H * db(-4), dur: 0.29 },
  { at: B[3] + 1.13, src: "sub.wav",      v: M,          dur: 0.42 },
  { at: B[3] + 1.33, src: "chimehi.wav",  v: M,          dur: 0.55, rate: 1.12 },

  /* ---- S4 · the refusal */
  { at: B[4] + 0.00, src: "screech.wav",  v: T * db(-4), dur: 1.24, lead: 0, rate: 0.7 },
  { at: B[4] + 0.47, src: "thock.wav",    v: H * db(-2), dur: 0.16, rate: 0.78 },
  { at: B[4] + 0.47, src: "boom.wav",     v: M,          dur: 0.55, rate: 0.8 },
  { at: B[4] + 1.07, src: "swish.wav",    v: M,          dur: 0.24, rate: 0.8 },
  { at: B[4] + 1.53, src: "snap.wav",     v: M,          dur: 0.06 },
  { at: B[4] + 1.53, src: "blip3.wav",    v: T,          dur: 0.22, rate: 0.7 },
  { at: B[4] + 2.43, src: "impact.wav",   v: H * db(-1), dur: 0.62, rate: 0.72, lead: 0 },
  { at: B[4] + 2.43, src: "lib_paper.wav", v: M,         dur: 0.22, rate: 0.7 },
  { at: B[4] + 2.69, src: "paper.wav",    v: M,          dur: 0.30, rate: 0.85 },

  /* ---- S5 · the artifact is born */
  { at: B[5] - 0.12, src: "swooshup.wav", v: M,          dur: 0.42, rate: 1.1 },
  { at: B[5] + 0.27, src: "lib_pop.wav",  v: M,          dur: 0.21 },
  { at: B[5] + 0.97, src: "chimehi.wav",  v: H * db(-4), dur: 0.55 },
  { at: B[5] + 0.97, src: "snap.wav",     v: M,          dur: 0.06 },
  { at: B[5] + 1.27, src: "shimmer.wav",  v: M,          dur: 0.80, rate: 1.15 },

  /* ---- S6 · the sweep, and the lock-on */
  { at: B[6] - 0.12, src: "swooshup.wav", v: M,          dur: 0.42, rate: 0.9 },
  { at: B[6] + 0.50, src: "data.wav",     v: T,          dur: 0.21, rate: 0.6 },
  ...repeat(9, B[6] + 0.60, 0.155, { src: "tick.wav", v: T, dur: 0.06 }, 0.05),
  { at: B[6] + 1.93, src: "blip3.wav",    v: H * db(-5), dur: 0.22, rate: 1.25 },
  { at: B[6] + 1.93, src: "thock.wav",    v: M,          dur: 0.16 },
  { at: B[6] + 1.93, src: "chimehi.wav",  v: M * db(-3), dur: 0.55, rate: 1.3 },

  /* ---- S7 · the request rides the rail */
  { at: B[7] - 0.12, src: "swooshdn.wav", v: M,          dur: 0.42, rate: 1.05 },
  { at: B[7] + 0.60, src: "thock.wav",    v: M,          dur: 0.16, rate: 0.9 },
  { at: B[7] + 1.00, src: "swish.wav",    v: T,          dur: 0.24, rate: 0.7 },
  { at: B[7] + 1.90, src: "m_coin.wav",   v: M * db(-4), dur: 0.49, rate: 1.2 },
  { at: B[7] + 2.53, src: "toggle.mp3",   v: M,          dur: 0.29 },
  { at: B[7] + 2.53, src: "snap.wav",     v: M,          dur: 0.06 },
  { at: B[7] + 2.83, src: "paper.wav",    v: T,          dur: 0.30, rate: 1.3 },

  /* ---- S8 · ⭐ THE PEAK. Three arrivals, descending pitch. */
  { at: B[8] - 0.12, src: "swooshup.wav", v: M,          dur: 0.42, rate: 1.15 },
  { at: B[8] + 0.20, src: "zipline.wav",  v: M,          dur: 1.50, rate: 1.2 },
  { at: B[8] + 1.17, src: "impact.wav",   v: H,          dur: 0.62, rate: 1.06 },
  { at: B[8] + 1.17, src: "sub.wav",      v: M,          dur: 0.42 },
  { at: B[8] + 1.70, src: "impact.wav",   v: H,          dur: 0.62, rate: 0.97 },
  { at: B[8] + 1.70, src: "sub.wav",      v: M,          dur: 0.42, rate: 0.95 },
  { at: B[8] + 2.00, src: "impact.wav",   v: H,          dur: 0.62, rate: 0.88 },
  { at: B[8] + 2.00, src: "sub.wav",      v: H * db(-4), dur: 0.42, rate: 0.9 },
  { at: B[8] + 2.00, src: "boom.wav",     v: M,          dur: 0.55, rate: 0.86 },
  { at: B[8] + 2.30, src: "lib_correct.wav", v: H * db(-6), dur: 1.96 },

  /* ---- S9 · ⛔ NO HEAVY TRANSIENT, BY DESIGN. */
  { at: B[9] + 0.00, src: "swish.wav",    v: T,          dur: 0.24, rate: 1.15 },
  { at: B[9] + 1.33, src: "lib_click.wav", v: T,         dur: 0.29, rate: 1.1 },
  { at: B[9] + 1.56, src: "lib_click.wav", v: T * db(-3), dur: 0.29, rate: 0.9 },
  { at: B[9] + 1.73, src: "tick.wav",     v: T,          dur: 0.06, rate: 1.2 },

  /* ---- S10 · it writes, and it lands in a folder */
  { at: B[10] - 0.12, src: "swooshup.wav", v: M,         dur: 0.42, rate: 0.95 },
  { at: B[10] + 0.27, src: "toggle.mp3",  v: M,          dur: 0.29, rate: 0.85 },
  { at: B[10] + 0.37, src: "data.wav",    v: T,          dur: 0.21, rate: 0.8 },
  { at: B[10] + 0.87, src: "data.wav",    v: T * db(-3), dur: 0.21, rate: 1.1 },
  { at: B[10] + 1.73, src: "thock.wav",   v: H * db(-4), dur: 0.16 },
  { at: B[10] + 1.73, src: "snap.wav",    v: M,          dur: 0.06 },
  { at: B[10] + 2.07, src: "chimehi.wav", v: M,          dur: 0.55, rate: 1.1 },
  { at: B[10] + 2.27, src: "boom.wav",    v: T,          dur: 0.55, rate: 0.7 },

  /* ---- S11 · the CTA */
  { at: B[11] + 0.00, src: "impact.wav",  v: H * db(-2), dur: 0.62, lead: 0 },
  { at: B[11] + 0.20, src: "m_coin.wav",  v: M,          dur: 0.49 },
  { at: B[11] + 0.60, src: "m_powerup.wav", v: M,        dur: 0.49 },
  { at: B[11] + 0.85, src: "shimmer.wav", v: T,          dur: 0.80, rate: 1.2 },
];

/** `f` restarts inside each Sequence, so the header's settle replays per cut.
    ⛔ `HookHeader` eases in from its `f` prop, so at frame 0 it is INVISIBLE —
    the hook passes `f + 12` to satisfy docs/THE-OPEN.md's frame-0 law. */
const HeadFor: React.FC<{ big: string; hot: string; settled?: boolean }> =
  ({ big, hot, settled }) => {
  const f = useCurrentFrame();
  return <HookHeader f={settled ? f + 12 : f} big={big} hot={hot} />;
};

/* ⭐ THREE CUTS, ONE SPINE (docs/THE-OPEN.md step 1). The VO, the caption track,
   the measured scene boundaries, the SFX bank and the eleven body scenes are
   IDENTICAL in all three; what changes is the OPENING EVENT. A variant that only
   swaps a header is the same reel twice ([[trial-variants-are-hook-animations]]:
   a trial variant is a different HOOK ANIMATION, not a different header). */
export const makeReel = (Hook: React.FC): React.FC => () => (
  <AbsoluteFill>
    <Audio src={staticFile("route123_vo.wav")} />
    {/* ⛔⛔ THE BED MUST BE AUDIBLE AT 0.00s ([[soundtrack-onset-at-zero]]) and it
        is MEASURED, not assumed: the first 500 ms of this passage reads mean
        -27.6 dB / peak -15.7 dB, so it is not silence at zero.
        ⛔ IT IS ALSO A FRESH PASSAGE. "Another Day Of Sun" from **89.0s**, found
        by scanning the whole track in 0.5s buckets for the loudest continuous
        30.3s window whose floor never drops out (mean -17.55 dB, min -26.51 dB)
        and rejecting every start within 22s of one already spent — reel 101 took
        39.2s, 103 56.0s, 102 61.2s, 104 111.0/137.0/188.0s. ⛔ "Every Living
        Breathing Moment" is fully consumed and is not an option.
        ⭐ THE LEVEL IS ARITHMETIC, NOT A FEELING. The VO measures -17.0 LUFS and
        the bed is loudnorm'd to -19.0; a dialogue bed wants 10-15 dB of
        separation, so 0.38 puts it at ~-27.4 LUFS in the gaps (10.4 dB down) and
        the duck takes it to ~-35.8 under speech. Reel 104's own header records
        that `LEVELS.MUSIC` was never applied house-wide and its bed ran only
        6.4 dB under the voice; this is that arithmetic done.
        ⭐ AND IT IS A REAL SIDECHAIN, not a flat trim: route123_duck.json is
        generated from the VO's OWN per-frame envelope with a 3-frame attack and
        a 14-frame release, so the bed opens in every gap and closes under every
        phrase, and it ramps off over the last 0.6s so nothing swells past the
        final word. */}
    <Audio src={staticFile("route123_bed.wav")}
      volume={(fr) => 0.38 * (bedDuck[Math.min(fr, bedDuck.length - 1)] ?? 1)} />
    <SfxTrack cues={SFX} />
    <Bg />

    <AssemblyCtx.Provider value={true}>
      {SCENES.map((sc, i) => {
        const to = i < SCENES.length - 1 ? SCENES[i + 1].at : ROUTE_TOTAL;
        const C = i === 0 ? Hook : sc.C;
        return (
          <Sequence key={sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
            <PalCtx.Provider value={0}>
              <CamCtx.Provider value={{ dx: 0, dy: 0, s: 1, rot: 0 }}>
                <AbsoluteFill><C /></AbsoluteFill>
              </CamCtx.Provider>
            </PalCtx.Provider>
          </Sequence>
        );
      })}
    </AssemblyCtx.Provider>

    {SCENES.map((sc, i) => {
      const to = i < SCENES.length - 1 ? SCENES[i + 1].at : ROUTE_TOTAL;
      return (
        <Sequence key={"h" + sc.at} from={sc.at} durationInFrames={to - sc.at} layout="none">
          <HeadFor big={sc.head[0]} hot={sc.head[1]} settled={i === 0} />
        </Sequence>
      );
    })}

    <ProgressBar />
    <KaraokeCaption words={words as any} fps={FPS} top={1252} />
  </AbsoluteFill>
);

export const RouteReel  = makeReel(S0Hook);    /* A · THE AVALANCHE — the wall lets go   */
export const RouteReelB = makeReel(S0HookB);   /* B · THE BURST BOX — one box, crammed   */
export const RouteReelC = makeReel(S0HookC);   /* C · THE TIP — the bank falls on you    */
