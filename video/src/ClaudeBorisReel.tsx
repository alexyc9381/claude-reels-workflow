import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { MissionHook, HOOK_CUTS } from "./MissionHook";
import { MissionHookB, HOOK_CUTS_B, MissionHookC, HOOK_CUTS_C } from "./MissionHooksBC";
import { M1Deleted, M2Babysit, M3Scientist, M4TooHard, M5Breaks, M6Setup, M7TooSmall, M8LongBurn, M9Cta } from "./MissionScenes";
import { MissionCut, MKind } from "./MissionTransitions";
import words from "./data/words_boris.json";

/* ============================================================================
   REEL 82 · "BORIS" — the full reel. World: THE MISSION (MissionScenes.tsx).

   TEN LOCATIONS: the hook alone travels through seven (control room, launch,
   nebula, gas giant, rust world, ringed world, control room), then the plan
   bay, the creche bay, the test stand, the rig, the shake bay, the hop pad,
   deep space and the dawn gantry.

   VO: public/boris_vo_final.wav — 35.86s.
   Raw was 74.30s. He marks a flub by saying "cut cut" and redoing the line;
   six of those were spliced out. Every cut boundary sits inside a measured
   -40 dB silence, >=60ms clear of speech (⛔ never whisper's word ends — see
   REEL-BUILD-LEARNINGS §5). Verified: zero "cut" survivors, no hole >0.28s.

   ⚠️ The written script's line "Those instructions are not helping anymore,
   they are in the way." was never recorded, so the reel does not contain it.
   ⚠️ The scientist line had two takes; the FIRST is kept because it matches the
   written script ("the job is now closer"). The retake said "Claude is now".
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

const SCENES: { C: React.FC; s: number; label: string; cut: MKind }[] = [
  { C: MissionHook, s: 0.00,  cut: "sweep",  label: "hook · seven worlds, three cuts inside 2.4s" },
  { C: M1Deleted,   s: 5.24,  cut: "static", label: "the plan bay · 80% of the manual pulled" },
  { C: M2Babysit,   s: 8.86,  cut: "iris",   label: "the creche bay · the old model still in rails" },
  { C: M3Scientist, s: 13.51, cut: "sweep",  label: "the test stand · the prompt sheet crossed out" },
  { C: M4TooHard,   s: 17.15, cut: "static", label: "the rig · load pushed past comfortable" },
  { C: M5Breaks,    s: 20.63, cut: "iris",   label: "the shake bay · the trace lets go" },
  { C: M6Setup,     s: 22.62, cut: "sweep",  label: "three setup dials turned, not a prompt reworded" },
  { C: M7TooSmall,  s: 25.36, cut: "static", label: "the hop pad · a pathetic arc" },
  { C: M8LongBurn,  s: 27.56, cut: "iris",   label: "a gas giant · one instruction, 14 days" },
  { C: M9Cta,       s: 33.08, cut: "sweep",  label: "the dawn gantry · comment BORIS" },
];
const END_S = 35.66;                      // last word ends 35.56
export const BORIS_TOTAL = Math.round(END_S * FPS);

const LEAD = 3;                            // the incoming scene is alive under the clearing graphic
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND — house SoundKit. Every cue is written RELATIVE to its scene start, so
   a re-time is one table edit (the structural fix from reel 81).
   ========================================================================== */
const A = "am/";

const scoreCut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.1, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];
const cutSfx = (t: number, k: MKind): Cue[] =>
  k === "sweep"  ? scoreCut(t, "whoosh-swoosh.wav", "hit-boom.wav", "paper-rustle.wav")
: k === "static" ? scoreCut(t, "whoosh-choppy.wav", "error-take.wav", "gear-stutter.wav", 1.04)
:                  scoreCut(t, "whoosh-fast.wav", "snap.wav", "riser-metal.wav", 1.08);
const amb = (t: number, dur: number, src: string, rate = 1, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, rate, lead: 0 }];

const [S1, S2, S3, S4, S5, S6, S7, S8, S9] = SCENES.slice(1).map((x) => x.s);

/* Every hook cut needs a transient, and each VARIANT cuts at different frames —
   so score the list, never hard-coded times. The palette rotates so a 9- or
   11-cut hook does not repeat the same hit twice in a row. */
const HOOK_KIT: [string, string, string, number][] = [
  ["whoosh-fast.wav",   "hit-boom.wav",       "gear-stutter.wav", 1.06],
  ["whoosh-swoosh.wav", "hit-up.wav",         "riser-sharp.wav",  1.00],
  ["whoosh-flyby.wav",  "snap.wav",           "riser-metal.wav",  1.10],
  ["whoosh-choppy.wav", "hit-boom.wav",       "paper-rustle.wav", 0.92],
  ["whoosh-fast.wav",   "punch.wav",          "gear-mech.wav",    1.00],
  ["whoosh-swoosh.wav", "positive-chime.wav", "unlock.wav",       1.00],
  ["whoosh-flyby.wav",  "punch.wav",          "gear-stutter.wav", 1.14],
  ["whoosh-choppy.wav", "hit-up.wav",         "riser-sharp.wav",  0.96],
];
const hookCues = (cuts: number[]): Cue[] =>
  cuts.flatMap((cf, i) => {
    const [mv, imp, tex, rate] = HOOK_KIT[i % HOOK_KIT.length];
    return scoreCut(cf / FPS, mv, imp, tex, rate);
  });

const SFX_ALL: Cue[] = [
  /* ---- THE OPEN. Frame 0 carries the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 1.9,  lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",  v: LEVELS.SFX_MID,     dur: 1.33, lead: 0 },
  { at: 0.02, src: A + "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.19, lead: 0 },
  { at: 0.00, src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 5.3,  lead: 0 },

  /* ---- internal cuts inside M1 and M2. A scene that runs past ~2.5s is cut
     into shots, and every one of those cuts needs a transient or the edit
     reads soft exactly where it just got more interesting. ---- */
  ...scoreCut(S1 + 40 / FPS, "whoosh-fast.wav",   "snap.wav",     "paper-rustle.wav", 1.05),
  ...scoreCut(S1 + 76 / FPS, "whoosh-choppy.wav", "hit-up.wav",   "gear-stutter.wav", 0.95),
  ...scoreCut(S2 + 46 / FPS, "whoosh-swoosh.wav", "snap.wav",     "paper-slide.wav", 1.1),
  ...scoreCut(S2 + 94 / FPS, "whoosh-fast.wav",   "hit-boom.wav", "gear-mech.wav", 0.92),

  /* ---- M1 · the plan bay: five binders pulled ---- */
  ...cutSfx(S1 - 0.10, "static"),
  ...amb(S1 - 0.06, S2 - S1 + 0.06, "room-tone.wav", 1.0),
  ...repeat(5, S1 + 0.27, 0.40, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, 0.06),
  ...layer(S1 + 1.90, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.9 },
                      { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.5 }),

  /* ---- M2 · the creche bay ---- */
  ...cutSfx(S2 - 0.10, "iris"),
  ...amb(S2 - 0.06, S3 - S2 + 0.06, "room-tone.wav", 0.8),
  ...layer(S2 + 0.33, { src: A + "gear-stutter.wav", v: LEVELS.SFX_TEXTURE, dur: 1.03, rate: 0.82 },
                      { src: A + "click-hard.wav", dur: 0.42 }),
  ...layer(S2 + 2.10, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 }),

  /* ---- M3 · the test stand ---- */
  ...cutSfx(S3 - 0.10, "sweep"),
  ...amb(S3 - 0.06, S4 - S3 + 0.06, "room-tone.wav", 0.92),
  ...layer(S3 + 0.47, { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                      { src: A + "highlighter.wav", dur: 0.45 }),
  { at: S3 + 1.30, src: A + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 },

  /* ---- M4 · the load pushed past comfortable ---- */
  ...cutSfx(S4 - 0.10, "static"),
  ...amb(S4 - 0.06, S5 - S4 + 0.06, "room-tone.wav", 0.86),
  ...layer(S4 + 0.20, { src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
                      { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 1.03 }),
  { at: S4 + 1.60, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.63 },

  /* ---- M5 · it breaks ---- */
  ...cutSfx(S5 - 0.10, "iris"),
  ...amb(S5 - 0.06, S6 - S5 + 0.06, "gear-stutter.wav", 0.9),
  ...layer(S5 + 0.87, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.21 },
                      { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.3, rate: 0.84 }),

  /* ---- M6 · three dials turned ---- */
  ...cutSfx(S6 - 0.10, "sweep"),
  ...amb(S6 - 0.06, S7 - S6 + 0.06, "room-tone.wav", 0.95),
  ...repeat(3, S6 + 0.40, 0.44, { src: A + "click-hard.wav", v: LEVELS.SFX_MID, dur: 0.42 }, 0.07),
  { at: S6 + 1.90, src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 },

  /* ---- M7 · the pathetic hop ---- */
  ...cutSfx(S7 - 0.10, "static"),
  ...amb(S7 - 0.06, S8 - S7 + 0.06, "room-tone.wav", 0.7),
  ...layer(S7 + 0.27, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.41 },
                      { src: A + "punch.wav", v: LEVELS.SFX_TEXTURE, dur: 0.16 }),
  { at: S7 + 1.20, src: A + "error-take.wav", v: LEVELS.SFX_TEXTURE, dur: 0.21 },

  /* ---- M8 · the long burn ---- */
  ...cutSfx(S8 - 0.10, "iris"),
  ...amb(S8 - 0.06, 2.60, "loading-loop.wav", 0.7, LEVELS.SFX_BED),
  ...amb(S8 + 2.54, S9 - S8 - 2.54, "loading-loop.wav", 0.7, LEVELS.SFX_BED),
  ...layer(S8 + 0.33, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.2, rate: 0.9 },
                      { src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.73 }),
  ...repeat(2, S8 + 0.60, 0.20, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.08),
  ...layer(S8 + 1.60, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                      { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8 }),

  /* ---- M9 · the CTA ---- */
  ...cutSfx(S9 - 0.10, "sweep"),
  ...amb(S9 - 0.06, 2.60, "crowd-cheer.wav", 0.9),
  ...layer(S9 + 0.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 },
                      { src: A + "page-turn.wav", dur: 0.50 }),
  ...layer(S9 + 1.10, { src: A + "marker-stroke.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                      { src: A + "snap.wav", dur: 0.19 }),
  ...layer(S9 + 1.70, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 0.85 },
                      { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),
];

/* ============================================================================
   TRIAL-REEL VARIANTS.

   ⛔ Instagram flags near-duplicates, so a variant that only swaps its music is
   a wasted post (memory `feedback_trial_reel_variants`). Each variant below
   changes FIVE things, and the first two do most of the work:

     1. the HOOK — a different cold-open world, order and cut rhythm
     2. the BED — a different track, not the same track re-EQd
     3. per-scene CAMERA OFFSET, so the shared body is not frame-identical
     4. the TRANSITION kinds between scenes
     5. the CAPTION band position

   The luma delta between variants is MEASURED after render, not assumed.
   ========================================================================== */
type Variant = {
  Hook: React.FC;
  hookCuts: number[];
  bed: string;
  cuts: MKind[];          // per-scene transition kind, overrides the table
  camScale: number;       // body framing, per variant
  camDx: number;
  capTop: number;
};

const makeReel = (V: Variant): React.FC => () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > BORIS_TOTAL - 12 ? db(-11) * Math.max(0, (BORIS_TOTAL - f) / 12) : db(-11);
  const CUES = [...hookCues(V.hookCuts), ...SFX_ALL];
  return (
    <AbsoluteFill>
      <Audio src={staticFile("boris_vo_final.wav")} />
      <Audio src={staticFile(V.bed)} volume={music} />
      <SfxTrack cues={CUES} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : BORIS_TOTAL;
          const C = i === 0 ? V.Hook : sc.C;
          /* the shared body gets a per-variant, per-scene framing nudge. The hook
             is left alone — it is already a different edit. */
          const k = i === 0 ? 0 : ((i % 3) - 1);
          const t = i === 0 ? "none"
            : `scale(${V.camScale + k * 0.012}) translateX(${V.camDx * k}px)`;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill style={{ transform: t, transformOrigin: "50% 56%" }}><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {SCENES.slice(1).map((sc, i) => (
        <MissionCut key={"c" + i} at={IN[i + 1]} kind={V.cuts[i % V.cuts.length]} />
      ))}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={V.capTop} />
    </AbsoluteFill>
  );
};

export const BorisReel = makeReel({
  Hook: MissionHook, hookCuts: HOOK_CUTS, bed: "boris_bed.wav",
  cuts: SCENES.slice(1).map((x) => x.cut), camScale: 1, camDx: 0, capTop: 1268,
});

/* B — opens on the BREAK: violet, dark, a failure in the first frame. */
export const BorisReelB = makeReel({
  Hook: MissionHookB, hookCuts: HOOK_CUTS_B, bed: "boris_bed_b.wav",
  cuts: ["iris", "sweep", "static", "iris", "sweep", "static", "iris", "sweep", "static"],
  camScale: 1.035, camDx: 14, capTop: 1244,
});

/* C — opens on the BURN: amber, bright, full thrust in the first frame. */
export const BorisReelC = makeReel({
  Hook: MissionHookC, hookCuts: HOOK_CUTS_C, bed: "boris_bed_c.wav",
  cuts: ["static", "iris", "sweep", "static", "iris", "sweep", "static", "iris", "sweep"],
  camScale: 1.02, camDx: -18, capTop: 1292,
});
