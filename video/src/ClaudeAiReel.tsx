import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { AiDiveOne, ONE_CUES } from "./AiHooks5";
import {
  VarCtx,
  S2Surface, S3Reset, S4Cable, S5Brain, S6Sessions, S7Cost,
  S8Extras, S9Skill, S10Save, S11Recall, S12Payoff, S13Cta,
} from "./AiScenes";
import words from "./data/words_ai.json";

/* ============================================================================
   REEL 89 · "AI" — Claude wired to NotebookLM, so it stops paying to relearn
   you every session.

   VO: public/ai_vo_final.wav — 34.29s.

   ⛔ THE TAKE IS NOT CLEAN. An earlier pass shipped this VO calling it "a clean
   single take with no cut cut flubs". That was wrong, and it went out that way.
   There are TWO `cut cut` retakes in it, and Alex caught them:

     11.02-13.00  "...connect Claude to Notebo— CUT CUT. But when you connect..."
     26.90-29.30  "...it saves the entire— CUT CUT. After each session..."
     24.79-24.93  a 145ms STUB of the second false start's "Af-", which the cut
                  above left behind. Alex heard it as "after" said twice at ~25s.
                  Whisper merged it into the following word, so the transcript
                  looked clean — only the 20ms RMS envelope showed it: a burst at
                  24.795-24.91 with a 29ms gap before and 132ms after.

   All three are now removed — 4.52s cut. Every boundary sits inside a
   MEASURED silencedetect window (10.943-11.120 and 29.170-29.415), never a
   whisper word end, because those run 150-200ms early. The pre-cut take is kept
   at public/ai_vo_withflubs.wav. Re-transcribed after: zero "cut", zero
   adjacent repeats.

   Ships at 1.0x. R1: 3.32 wps overall against a 3.96 anchor, hook window
   exactly on the 4.0 bar, worst 5s 4.60 against 4.50. Speeding it up makes both
   worse, so the 0.10 is recorded rather than hidden.

   34.3s, which is now inside the recent house range (CANCEL 26.4 / ROLES 29.5).

   Captions: src/data/words_ai.json — 127 words, 44 lines, 43 anchored to a
   measured onset + 1 carried, rebuilt by tools/build_captions.py after the cut.

   ⛔ ONE CLAIM IS NOT VERIFIED. The VO at 21.33 says NotebookLM gives you "free
   infographics, cinematic videos, and deep research". notebooklm.google serves
   a JavaScript shell, so none of the three could be confirmed, and the question
   went to Alex twice unanswered. S8 draws three UNNAMED outputs and puts no
   product-feature name on screen. Naming them later is a one-line edit.

   THE HOOK is a single continuous take with no cuts — Alex's call, and the
   right one. It breaks the house "3+ shots in the first 5s" rule, which exists
   to stop a static opener; a tracked fall measures ~20 against a bar of 4.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* ============================================================================
   THE 17-SECOND SAG, and the three variants that test it.

   MEASURED, not guessed. Around 17s two things happen at once:
     · the VO slows from 4.24 wps (13.0-16.3s) to 2.90 wps (16.3-19.4s)
     · the scenes go 1.98s -> 1.10s -> 4.07s, and that 4.07s is the LONGEST
       hold in the whole reel

   So the middle of the reel is where the delivery gets slowest and the picture
   gets stillest, at the same moment. D, E and F each test a different theory
   about which half of that is doing the damage.

     D · CUT THE LULL   the 4.07s hold becomes three rooms of ~1.36s each, one
                        per list item. Nothing else changes. Tests: it is the
                        HOLD LENGTH.
     E · ESCALATE       same shot structure, but 16.3-23.4 builds — a hard whip
                        pattern-interrupt at 17.0s, then each list item lands
                        bigger than the last. Tests: it is the ENERGY, not the
                        cut rate.
     F · NO LONG HOLDS  both of the reel's long holds are split: the 5.10s ramp
                        moves to a second, steeper room halfway through, AND the
                        4.07s list is split three ways. Tests: it is long holds
                        ANYWHERE, not just at 17s.

   Every one of them keeps the hook, the VO, the captions and the beat map
   identical to A, so a difference in retention is attributable to the middle.
   ========================================================================== */
type Row = { C: React.FC<any>; s: number; label: string; p?: Record<string, unknown> };

/* Scene starts are MEASURED word onsets from words_ai.json, not estimates. */
const BASE: Row[] = [
  { C: AiDiveOne, s: 0.00,  label: "THE DIVE · one take, board to token pit, and the bounce" },
  { C: S2Surface, s: 4.86,  label: "here's the problem · he surfaces out of the bill" },
  { C: S3Reset,   s: 5.83,  label: "the reset ramp · haul it up, the gate sends him back" },
  { C: S4Cable,   s: 10.93, label: "the cable · Claude wired into NotebookLM" },
  { C: S5Brain,   s: 13.43, label: "a second brain that never forgets" },
  { C: S6Sessions,s: 16.28, label: "persistent memory across every session" },
  { C: S7Cost,    s: 18.26, label: "the valve closes · the token cost drops off" },
  { C: S8Extras,  s: 19.36, label: "and it makes more from it (UNNAMED — see header)" },
  { C: S9Skill,   s: 23.43, label: "the wrap-up skill · the press" },
  { C: S10Save,   s: 24.74, label: "every session saved down the chute" },
  { C: S11Recall, s: 27.48, label: "semantic search pulls the one card it needs" },
  { C: S12Payoff, s: 30.41, label: "standing on the archive, cost is one coin" },
  { C: S13Cta,    s: 32.11, label: "comment AI" },
];

/* ============================================================================
   THE 17-SECOND FIX — now in the BASE cut, so every variant inherits it.

   D, E and F were built to test three theories about the sag. Alex's read is
   that the drop is real and costly, so this stops being a test: all three fixes
   are merged, because they address different halves of the same measurement.

   What the sag actually was:
     · the VO slows from 4.24 wps (13.0-16.3s) to 2.90 wps (16.3-19.4s)
     · the scenes go 1.98s -> 1.10s -> 4.07s, and 4.07s is the LONGEST hold in
       the reel

   So the delivery gets slowest and the picture gets stillest at the same
   moment. The base cut now does all of:

     PACING    the 4.07s list becomes three rooms of ~1.36s, one per item, and
               the 5.10s ramp moves to a second steeper room halfway through.
               No body scene holds longer than 2.93s any more.
     INTERRUPT a hard whip across frame at 16.9s, right at the drop.
     ENERGY    a punch-in on the cost beat, and each of the three list rooms
               lands bigger than the one before it, so the list BUILDS instead
               of repeating three times.

   `A0` is kept as the un-fixed control, for comparison only.
   ========================================================================== */
const SPLIT8: Row[] = [
  { C: S8Extras, s: 19.36, label: "output 1", p: { only: 0, gs: 1.00, wall: "#B6AC97", floor: "#968C77" } },
  { C: S8Extras, s: 20.72, label: "output 2", p: { only: 1, gs: 1.16, wall: "#A8B0BC", floor: "#8A93A0" } },
  { C: S8Extras, s: 22.08, label: "output 3", p: { only: 2, gs: 1.34, wall: "#B2AE92", floor: "#948F74" } },
];

const FIXED: Row[] = BASE
  .flatMap((r) => (r.C !== S3Reset ? [r] : [
    { C: S3Reset, s: 5.83, label: "the ramp, first two laps" },
    { C: S3Reset, s: 8.44, label: "the ramp, steeper room", p: { alt: true } },
  ]))
  .flatMap((r) => (r.C !== S8Extras ? [r] : SPLIT8))
  .map((r) => (r.C === S6Sessions ? { ...r, p: { whip: true } }
             : r.C === S7Cost ? { ...r, p: { punch: true } } : r));

const scenesFor = (V: string): Row[] => (V === "A0" ? BASE : FIXED);

const END_S = 34.14;                       // last word ends 33.77
export const AI_TOTAL = Math.round(END_S * FPS);

const SCENES = BASE;                        // the cue table is written against A
const LEAD = 3;                            // incoming scene alive under the cut

/* ============================================================================
   SOUND. Every cue is written RELATIVE to its scene start, so a re-time is one
   table edit. Frame 0 carries the heaviest stack in the reel, a transient lands
   on every cut, and only the PRIMARY action in a scene is sounded.

   The three scenes the 17s fix splits keep the ORIGINAL scene's cue block —
   the sounds were written to the VO, not to the shot count, so splitting the
   picture must not re-time the audio.
   ========================================================================== */
const A = "am/";
const [T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, CTA] =
  SCENES.slice(1).map((x) => x.s);

/** a scored cut: movement 0.12s early, the impact ON the frame, a texture after */
const cut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.0, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];
/** the kit rotates so the cuts are not one sound over and over */
const KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-up.wav",   "riser-sharp.wav", 1.00],
  ["whoosh-swoosh.wav", "snap.wav",     "paper-slide.wav", 1.06],
  ["whoosh-choppy.wav", "hit-boom.wav", "riser-metal.wav", 0.94],
];
const sceneCut = (t: number, i: number) => cut(t - 0.10, ...KIT[i % 3]);

const CUES: Cue[] = [
  { at: 0, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: END_S, from: 2, lead: 0 },
  /* ---- THE DIVE. The hook owns its own mix; it is merged in whole. ---- */
  ...ONE_CUES.filter((c) => c.src !== A + "room-tone.wav"),
  /* ---- S2 ---- */
  ...sceneCut(T2, 0),
  ...layer(T2 + 0.12, { src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                      { src: A + "coin-spin.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),
  /* ---- S3 · the ramp, now across two rooms; the cue for the room change
          lands on the 8.44s split ---- */
  ...sceneCut(T3, 1),
  ...repeat(3, T3 + 1.34, 1.533, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.25 }, 0.05),
  ...repeat(3, T3 + 1.42, 1.533, { src: A + "coin-drop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }, 0.06),
  ...repeat(9, T3 + 0.30, 0.500, { src: A + "gear-stutter.wav", v: db(-22), dur: 0.40 }, 0.04),
  ...cut(8.44 - 0.10, ...KIT[2]),
  /* ---- S4 ---- */
  ...sceneCut(T4, 2),
  { at: T4 + 1.55, src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.70, lead: 0 },
  ...layer(T4 + 1.86, { src: A + "lights-on.wav", v: LEVELS.SFX_HERO, dur: 0.80 },
                      { src: A + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 0.90 }),
  ...repeat(5, T4 + 2.10, 0.267, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.06),
  /* ---- S5 ---- */
  ...sceneCut(T5, 0),
  ...repeat(8, T5 + 0.24, 0.110, { src: A + "click-light.wav", v: db(-24), dur: 0.30 }, 0.07),
  { at: T5 + 1.10, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.00, lead: 0 },
  /* ---- S6 · and the WHIP at 16.9s gets its own hit, or the interrupt is
          silent and reads as a glitch ---- */
  ...sceneCut(T6, 1),
  ...repeat(4, T6 + 0.22, 0.200, { src: A + "snap.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40 }, 0.06),
  ...layer(T6 + 0.63, { src: A + "whoosh-choppy.wav", v: db(-9), dur: 0.55 },
                      { src: A + "riser-sharp.wav", v: db(-17), dur: 0.60 }),
  /* ---- S7 ---- */
  ...sceneCut(T7, 2),
  { at: T7 + 0.20, src: A + "wheel-spin.wav", v: LEVELS.SFX_MID, dur: 0.90, lead: 0 },
  { at: T7 + 0.82, src: A + "coin-drop.wav", v: db(-20), dur: 0.60, lead: 0 },
  /* ---- S8 · three rooms now, so three scored cuts instead of one ---- */
  ...sceneCut(T8, 0),
  ...cut(20.72 - 0.10, ...KIT[1]),
  ...cut(22.08 - 0.10, ...KIT[2]),
  ...repeat(3, T8 + 0.62, 1.360, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, 0.07),
  ...repeat(3, T8 + 0.70, 1.360, { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.55 }, 0.06),
  /* ---- S9 ---- */
  ...sceneCut(T9, 1),
  ...repeat(2, T9 + 0.47, 1.467, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 0.80 }, 0.04),
  ...repeat(2, T9 + 0.52, 1.467, { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.70 }, 0.05),
  /* ---- S10 ---- */
  ...sceneCut(T10, 2),
  ...repeat(5, T10 + 0.36, 0.733, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }, 0.05),
  /* ---- S11 ---- */
  ...sceneCut(T11, 0),
  ...layer(T11 + 0.55, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.45 },
                       { src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.20 }),
  { at: T11 + 1.30, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 1.00, lead: 0 },
  /* ---- S12 ---- */
  ...sceneCut(T12, 1),
  { at: T12 + 0.66, src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.80, lead: 0 },
  /* ---- CTA ---- */
  ...sceneCut(CTA, 2),
  ...layer(CTA + 0.20, { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.60 },
                       { src: A + "bubble-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.40 }),
];

export const VARIANTS: Record<string, { bed: string; kit: number }> = {
  A: { bed: "ai_bed.wav",   kit: 0 },
  B: { bed: "ai_bed_b.wav", kit: 1 },
  C: { bed: "ai_bed_c.wav", kit: 2 },
  A0: { bed: "ai_bed.wav",  kit: 0 },      // the un-fixed control
  /* the three BLUE cuts — sky + rooms together, A's camera, A's fixed middle */
  D: { bed: "ai_bed_b.wav", kit: 1 },
  E: { bed: "ai_bed_c.wav", kit: 2 },
  F: { bed: "ai_bed_b.wav", kit: 1 },
};

export const makeAiReel = (V: string): React.FC => () => {
  const cfg = VARIANTS[V] ?? VARIANTS.A;
  const rows = scenesFor(V);
  const inAt = rows.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("ai_vo_final.wav")} />
      <Audio src={staticFile(cfg.bed)} volume={LEVELS.MUSIC} />
      <SfxTrack cues={V === "A" ? CUES : CUES.map((c) => c)} />
      <AssemblyCtx.Provider value>
      <VarCtx.Provider value={"BCDEF".includes(V) && V.length === 1 ? V : "A"}>
        {rows.map((sc, i) => (
          <Sequence key={i} from={inAt[i]}
            /* ⛔ Panel fades in from opacity 0 over 6 frames. Ending the outgoing
               scene exactly where the incoming one starts left ONE BLANK FRAME at
               every single cut — the reel flashed empty 12 times. The outgoing
               scene has to stay alive underneath until the incoming is opaque. */
            durationInFrames={(i === rows.length - 1 ? AI_TOTAL : inAt[i + 1] + 7) - inAt[i]}
            layout="none">
            {i === 0 ? <AiDiveOne v={V} /> : <sc.C {...(sc.p ?? {})} />}
          </Sequence>
        ))}
      </VarCtx.Provider>
      </AssemblyCtx.Provider>
      <ProgressBar />
      <KaraokeCaption words={words as any} />
    </AbsoluteFill>
  );
};

export const ClaudeAiReel = makeAiReel("A");
