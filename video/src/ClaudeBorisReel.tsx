import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { MissionHook, HOOK_CUTS } from "./MissionHook";
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
const [HA, HB, HC, HD, HE, HF] = HOOK_CUTS.map((f) => f / FPS);

const SFX_ALL: Cue[] = [
  /* ---- THE OPEN. Frame 0 carries the heaviest stack in the reel. ---- */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 1.9,  lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",  v: LEVELS.SFX_MID,     dur: 1.33, lead: 0 },
  { at: 0.02, src: A + "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.19, lead: 0 },
  { at: 0.00, src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 5.3,  lead: 0 },
  ...scoreCut(HA, "whoosh-fast.wav",   "hit-boom.wav",       "gear-stutter.wav", 1.06),
  ...scoreCut(HB, "whoosh-swoosh.wav", "hit-up.wav",         "riser-sharp.wav"),
  ...scoreCut(HC, "whoosh-flyby.wav",  "snap.wav",           "riser-metal.wav", 1.1),
  ...scoreCut(HD, "whoosh-choppy.wav", "hit-boom.wav",       "paper-rustle.wav", 0.92),
  ...scoreCut(HE, "whoosh-fast.wav",   "punch.wav",          "gear-mech.wav"),
  ...scoreCut(HF, "whoosh-swoosh.wav", "positive-chime.wav", "unlock.wav"),

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

export const BorisReel: React.FC = () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > BORIS_TOTAL - 12 ? db(-11) * Math.max(0, (BORIS_TOTAL - f) / 12) : db(-11);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("boris_vo_final.wav")} />
      <Audio src={staticFile("boris_bed.wav")} volume={music} />
      <SfxTrack cues={SFX_ALL} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : BORIS_TOTAL;
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
