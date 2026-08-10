import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import {
  S0Open, S1Guy, S2Stars, S3Four, S4Score, S5Fake,
  S6Repost, S7Human, S8Offer, S9Contract, S10Cta,
} from "./JobsScenes";
import words from "./data/words_jobs.json";

/* ============================================================================
   REEL 92 · "JOBS" — an open-source system reads every posting for you, kills
   the fake ones, finds the human behind the portal, and writes your negotiation.

   Board: storyboards/92-jobs.md.
   VO: public/jobs_vo.wav — 38.53s of speech, 179 words, ships at 1.0x.

   ⛔ THE TAKE IS NOT THE PASTED SCRIPT, AND THE TAKE WINS.
      Raw JOBS.m4a is 87.72s with SIX "cut cut" restarts. Eleven keep-blocks
      were spliced, every boundary SNAPPED INTO A MEASURED SILENCE (RMS floor
      -42 dBFS, walked outward from the proposed cut, 45ms/75ms of margin and an
      8ms fade at each join) rather than onto a whisper word time — whisper runs
      150-200ms early around a flub and cutting there clips the tail off the
      previous word. Re-transcribed after assembly: zero "cut cut", zero wrong
      takes, zero spoken instructions.
      Differences from the pasted script, all built AS RECORDED:
        · "the fake ones"        -> "the fake listings"
        · "instead of the portal"-> "instead of the application portal"
        · "...and writes the email for you" -> "...for you to SEND THEM"
        · "...send you the whole system"    -> "...the whole system FOR FREE"
      ⚠️ "for where you live" IS NOT IN THE TAKE. He reached for it twice and
         both attempts ended in "cut cut"; the keeper stops at "when they lowball
         you." S8 therefore does not say it, and carries the repo's own
         "GEOGRAPHIC DISCOUNT" struck off the board instead, which is the same
         fact without putting words in his mouth.

   ⚠️ THE TAKE SAYS "COMMENT DROPS", NOT "COMMENT JOBS". Verified against
      small.en AND medium.en, including a run primed with the word JOBS, which
      still returned "drops". Alex's call (2026-08-05): keep the keyword JOBS in
      the captions and on the CTA card, leave the audio alone. The one-line fix
      if that is ever revisited is a word splice from the hook's own "jobs" at
      1.28s of the raw take.

   ⛔ PACING. 179 words / 38.53s = 4.65 wps overall, worst 5s window 6.20 at the
      hook. That is inside the recent house range measured across all 81 caption
      files in this repo (median 4.21; DELETE 4.94/6.00, BORIS 4.92/6.20, ROUTE
      5.11/6.80), so it ships at 1.0x with no atempo. The playbook's 4.0 wps hook
      target cannot be reached on this take by any speed factor — the hook alone
      is 27 words in 4.39s — so it is a re-record note, not an edit note.

   ✅ EVERY ON-SCREEN FACT IS SOURCED to github.com/santifer/career-ops, read
      2026-08-06: "740+ job listings evaluated · 100+ personalized CVs · 1 dream
      role landed", "land a Head of Applied AI role", MIT, the A-F / 1.0-5.0
      rubric, the ghost-job legitimacy check, "finds the hiring manager you
      should message", "geographic discount pushback", and offer-prep's "contract
      reading companion — clause walk".
      ⛔ THE SLAB READS 62,000 BECAUSE THE VO SAYS 62,000. It is 63.0k today; the
         screen never contradicts the voice.
      ⛔ NO SALARY FIGURE ANYWHERE. Nothing sourced backs one, so S8's raise is a
         bar getting longer and a struck-out first mark, never "$120k -> $148k".
      ⛔ APPLYVAULT is a knockoff, the reel's ONE brand, and it is not a real
         product. Undefeated until S7, dark from the knock onwards.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* ---------------------------------------------------------------------------
   THE CUT. Every `s` is a MEASURED word onset out of data/words_jobs.json,
   pattern-matched on the beat's opening words, never a hardcoded index.
   Ten places plus the CTA, alternating cool/warm so every cut is a colour
   change as well as a place change.
   ------------------------------------------------------------------------ */
type Row = { C: React.FC<any>; s: number; label: string };
const SCENES: Row[] = [
  { C: S0Open,     s: 0.00,  label: "HOOK · the slot, the heap, the street · depot (cool)" },
  { C: S1Guy,      s: 4.51,  label: "740 postings, one role, then free · yard (warm)" },
  { C: S2Stars,    s: 9.99,  label: "62,000 stars · gate (cool)" },
  { C: S3Four,     s: 12.11, label: "four things · dock (warm)" },
  { C: S4Score,    s: 13.34, label: "ONE · it scores every posting · cross (cool)" },
  { C: S5Fake,     s: 17.58, label: "TWO · the facade falls flat · street (warm)" },
  { C: S6Repost,   s: 21.06, label: "reposted forever · apron (cool)" },
  { C: S7Human,    s: 23.31, label: "THREE · past the portal, knock · kerb (warm) · PEAK" },
  { C: S8Offer,    s: 29.19, label: "FOUR · struck out and raised · road (cool) · HERO" },
  { C: S9Contract, s: 34.35, label: "clause by clause · build (warm)" },
  { C: S10Cta,     s: 36.70, label: "comment JOBS · hard cut on the keyword" },
];

const END_S = 38.63;                       // last word end 38.53 + 0.10
export const JOBS_TOTAL = Math.round(END_S * FPS);
/** ⛔ the Panel fades in over 6 frames, so an outgoing scene that ends exactly
    where the next begins leaves ONE BLANK FRAME at every cut. Keep it alive. */
const LEAD = 3;

/* ---------------------------------------------------------------------------
   SOUND. ⛔ Cues sync to the PHYSICAL ACTION, not the beat grid: a sound fires
   when an object does something. The hero hits are LAYERED 3 DEEP (attack +
   low-end body + texture) because one thin pop is the single thing that makes a
   reel feel cheap. ⛔ RISERS: HARD CAP 2 — one into the open's third shot, one
   into the S8 raise. ⛔ `at` is ROOT seconds; scene bodies are not
   Sequence-wrapped for audio.
   ------------------------------------------------------------------------ */
const A = "am/";
const [T1, T2, T3, T4, T5, T6, T7, T8, T9, CTA] = SCENES.slice(1).map((x) => x.s);

/** a scored cut: movement 0.12s early, the impact ON the frame, a texture after */
const cut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.0, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];
/** the kit rotates so eleven cuts are not one sound eleven times */
const KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-up.wav",   "paper-slide.wav",  1.00],
  ["whoosh-swoosh.wav", "snap.wav",     "paper-rustle.wav", 1.06],
  ["whoosh-choppy.wav", "hit-boom.wav", "gear-mech.wav",    0.94],
];
const sceneCut = (t: number, i: number) => cut(t - 0.10, ...KIT[i % 3]);

const CUES: Cue[] = [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: END_S, from: 2, lead: 0 },

  /* ---- THE OPEN. Frame 0 is the loudest hit in the reel, and each of the
          hook's own two internal cuts (f43 / f87) gets its own transient. ---- */
  { at: 0, src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.6, lead: 0 },
  { at: 0, src: A + "ring-low.wav", v: LEVELS.SFX_HERO, dur: 1.4, lead: 0 },
  { at: 0.03, src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },
  { at: 0.06, src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 },
  /* the envelope going in */
  { at: 0.62, src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.6, lead: 0 },
  /* cut B — the flap CLACKS shut and the stamp lands */
  ...layer(1.43, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                 { src: A + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.7 }),
  /* ⛔ LAYERED 3 DEEP: attack + low-end body + texture. `layer()` only pairs
     two, so the third rides as its own cue one frame later. */
  ...layer(1.70, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.0, rate: 0.92 },
                 { src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.7 }),
  { at: 1.70, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7, lead: 2 },
  /* cut C — the wide. RISER 1 OF 2. */
  { at: 2.62, src: A + "riser-sharp.wav", v: db(-19), dur: 1.0, lead: 0 },
  ...layer(2.90, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                 { src: A + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.1 }),
  { at: 3.10, src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.9, lead: 0 },

  /* ---- S1 · the tally runs, a door opens, the plate is bolted on ---- */
  ...sceneCut(T1, 0),
  ...repeat(16, T1 + 0.24, 0.120, { src: A + "counter-tick.wav", v: db(-26), dur: 0.20 }, 0.04),
  ...layer(T1 + 2.28, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                      { src: A + "lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),
  ...layer(T1 + 3.30, { src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 }),

  /* ---- S2 · the stars landing, the count arriving ---- */
  ...sceneCut(T2, 1),
  ...repeat(11, T2 + 0.18, 0.115, { src: A + "click-hard.wav", v: db(-25), dur: 0.28 }, 0.05),
  ...layer(T2 + 1.32, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.55 },
                      { src: A + "coin-drop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),

  /* ---- S3 · four lamps, four strikes ---- */
  ...sceneCut(T3, 2),
  ...repeat(4, T3 + 0.10, 0.200, { src: A + "lights-on.wav", v: db(-19), dur: 0.45 }, 0.06),

  /* ---- S4 · three plates bolting on, then the row re-sorting ---- */
  ...sceneCut(T4, 0),
  ...repeat(3, T4 + 0.46, 0.500, { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.5 }, 0.06),
  ...repeat(3, T4 + 0.50, 0.500, { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.05),
  ...layer(T4 + 2.20, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                      { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),

  /* ---- S5 · the knuckle, the hollow ring, and the whole front going over ---- */
  ...sceneCut(T5, 1),
  ...repeat(2, T5 + 0.28, 0.170, { src: A + "click-hard.wav", v: db(-15), dur: 0.30 }, 0),
  { at: T5 + 0.34, src: A + "ring-low.wav", v: LEVELS.SFX_MID, dur: 1.3, lead: 0 },
  ...layer(T5 + 1.62, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.4, rate: 0.88 },
                      { src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  { at: T5 + 1.62, src: A + "gear-stutter.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 2 },

  /* ---- S6 · eleven posters landing, the last one on the cut ---- */
  ...sceneCut(T6, 2),
  ...repeat(11, T6 + 0.06, 0.133, { src: A + "paper-slide.wav", v: db(-23), dur: 0.30 }, 0.05),
  { at: T6 + 1.42, src: A + "hit-up.wav", v: LEVELS.SFX_MID, dur: 0.7, lead: 0 },

  /* ---- S7 · the walk, the KNOCK, the door, the letter ---- */
  ...sceneCut(T7, 0),
  ...repeat(2, T7 + 1.47, 0.200, { src: A + "click-hard.wav", v: db(-13), dur: 0.35 }, 0),
  ...layer(T7 + 1.47, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 1.08 },
                      { src: A + "gear-stutter.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }),
  ...layer(T7 + 1.72, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.8 },
                      { src: A + "lights-on.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 }),
  { at: T7 + 2.68, src: A + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 0.7, lead: 0 },
  { at: T7 + 2.86, src: A + "ping.wav", v: LEVELS.SFX_MID, dur: 0.6, lead: 0 },

  /* ---- S8 · THE HERO. The strike, then the raise. RISER 2 OF 2. ---- */
  ...sceneCut(T8, 1),
  { at: T8 + 0.30, src: A + "highlighter.wav", v: LEVELS.SFX_MID, dur: 0.8, lead: 0 },
  /* the strike-through */
  ...layer(T8 + 1.53, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                      { src: A + "snap.wav", v: LEVELS.SFX_HERO, dur: 0.6 }),
  /* and the raise */
  { at: T8 + 1.90, src: A + "riser-sharp.wav", v: db(-20), dur: 0.9, lead: 0 },
  ...layer(T8 + 2.35, { src: A + "hit-up.wav", v: LEVELS.SFX_HERO, dur: 1.1 },
                      { src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  { at: T8 + 2.35, src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2, lead: 2 },

  /* ---- S9 · the roll, and a tick per clause ---- */
  ...sceneCut(T9, 2),
  { at: T9 + 0.08, src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.8, lead: 0 },
  ...repeat(7, T9 + 0.52, 0.210, { src: A + "check-pop.wav", v: db(-24), dur: 0.30 }, 0.05),

  /* ---- CTA ---- */
  ...sceneCut(CTA, 0),
  ...layer(CTA + 0.22, { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.60 },
                       { src: A + "bubble-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40 }),
];

export const ClaudeJobsReel: React.FC = () => {
  const inAt = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("jobs_vo.wav")} />
      <Audio src={staticFile("boris_bed.wav")} volume={LEVELS.MUSIC} />
      <SfxTrack cues={CUES} />
      <AssemblyCtx.Provider value>
        {SCENES.map((sc, i) => (
          <Sequence key={i} from={inAt[i]}
            durationInFrames={(i === SCENES.length - 1 ? JOBS_TOTAL : inAt[i + 1] + 7) - inAt[i]}
            layout="none">
            <sc.C />
          </Sequence>
        ))}
      </AssemblyCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} />
    </AbsoluteFill>
  );
};
