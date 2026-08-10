import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { MissionHook, HOOK_CUTS } from "./MissionHook";
import { M1Deleted, M2Babysit, M3Scientist, M4TooHard, M5Breaks, M6Setup, M7TooSmall, M8LongBurn, M9Cta } from "./MissionScenes";
import { MissionCut, MKind } from "./MissionTransitions";
import words from "./data/words_boris_reorder.json";

/* ============================================================================
   REEL 82 · "BORIS" — THE RE-ORDERED CUT.

   The ask: "make me a version where the number 1 section of the VO is moved to
   number 3, and the visuals adjusted as well."

   The VO says the ordinals out loud, so this is not a scene shuffle — the audio
   had to be re-spliced. The blocks were separated, then reassembled so the
   SPOKEN numbers still run 1, 2, 3 while the CONTENT order changes:

     spoken "One."        -> be a scientist        (was point 2)
     spoken "Two."        -> your tasks are small  (was point 3)
     spoken "And three."  -> he deleted 80%        (was point 1)

   ⛔ Every splice boundary sits inside a MEASURED quiet zone — a -40 dB
   silencedetect gap, or where no gap existed, an inter-word trough found by a
   5ms energy-envelope scan (the "One." and "And three." tails both needed the
   second method; the deepest point at each is -42 dB and -57 dB). Never a
   whisper word end, which runs 150-200ms early (REEL-BUILD-LEARNINGS §5).

   ⚠️ whisper mis-hears the re-spliced "Stop" as "He's not" on a short clip. The
   junction measures -58 dB with a normal speech ramp after it, and whisper
   mangles the SAME words in the untouched original, so it is a transcription
   artifact, not audio damage.

   Audio: public/boris_vo_reorder.wav (35.86s, same total — nothing dropped).
   Captions: src/data/words_boris_reorder.json, rebuilt by tools/build_captions.py.
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

/* Scene starts derived from the re-spliced block durations:
   hook 0-5.41 | "One." 5.41-5.78 | pt1 5.78-17.11 | "Two." 17.11-17.57
   | pt2 17.57-24.44 | "And three." 24.44-24.97 | pt3 24.97-32.95 | CTA 32.95-  */
const SCENES: { C: React.FC; s: number; label: string; cut: MKind }[] = [
  { C: MissionHook, s: 0.00,  cut: "sweep",  label: "hook · six worlds" },
  { C: M3Scientist, s: 5.41,  cut: "static", label: "ONE · the canyon, be a scientist" },
  { C: M4TooHard,   s: 8.71,  cut: "iris",   label: "ONE · the fissure, it checks itself" },
  { C: M5Breaks,    s: 12.19, cut: "sweep",  label: "ONE · the plain, where it breaks" },
  { C: M6Setup,     s: 14.18, cut: "static", label: "ONE · the shore, fix the setup" },
  { C: M7TooSmall,  s: 17.11, cut: "iris",   label: "TWO · the moon, tasks too small" },
  { C: M8LongBurn,  s: 19.05, cut: "sweep",  label: "TWO · night camp, one instruction" },
  { C: M1Deleted,   s: 24.44, cut: "static", label: "THREE · the ice plain, 80% deleted" },
  { C: M2Babysit,   s: 28.05, cut: "iris",   label: "THREE · the dunes, the old model" },
  { C: M9Cta,       s: 32.95, cut: "sweep",  label: "the summit · comment BORIS" },
];
const END_S = 35.76;                      // last word ends 35.64
export const BORIS_R_TOTAL = Math.round(END_S * FPS);

const LEAD = 3;
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

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

/* ⛔ In the main cut these were positional (SCENES[1..9]). Here the running
   order changes, so each cue must follow its SCENE, not its slot. Bound by name. */
const S1 = 24.440, S2 = 28.050;                      // point THREE now: deleted 80% / babysit
const S3 = 5.410,  S4 = 8.710, S5 = 12.190, S6 = 14.180;   // point ONE now: be a scientist
const S7 = 17.110, S8 = 19.050;                      // point TWO now: tasks too small
const S9 = 32.950;                                   // CTA

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


export const BorisReelReorder: React.FC = () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > BORIS_R_TOTAL - 12 ? db(-11) * Math.max(0, (BORIS_R_TOTAL - f) / 12) : db(-11);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("boris_vo_reorder.wav")} />
      <Audio src={staticFile("boris_bed.wav")} volume={music} />
      <SfxTrack cues={[...hookCues(HOOK_CUTS), ...SFX_ALL]} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : BORIS_R_TOTAL;
          const C = sc.C;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {SCENES.slice(1).map((sc, i) => <MissionCut key={"c" + i} at={IN[i + 1]} kind={sc.cut} />)}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
