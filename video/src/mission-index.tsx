import { registerRoot } from "remotion";
import React from "react";
import { AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame } from "remotion";
import { MissionHook, HOOK_CUTS } from "./MissionHook";
import { Cue, SfxTrack, LEVELS, layer, db } from "./SoundKit";

const P = { width: 1080, height: 1920, fps: 30 };
const FPS = 30, A = "am/";
const T = HOOK_CUTS.map((f) => f / FPS);          // cut times in seconds

/** SCORE A CUT (docs/THE-OPEN.md): whoosh INTO it, transient ON it. */
const scoreCut = (t: number, mv: string, imp: string, tex?: string, rate = 1): Cue[] => [
  { at: Math.max(0, t - 0.12), src: A + mv, v: LEVELS.SFX_MID, dur: 0.8, rate, lead: 0 },
  { at: t, src: A + imp, v: LEVELS.SFX_HERO, dur: 1.1, rate, lead: 0 },
  ...(tex ? [{ at: t + 0.03, src: A + tex, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];

/* Frame 0 carries the heaviest stack in the reel — it is the interrupt. Then
   every one of the six cuts is scored, each with its own colour so the staccato
   open does not read as one repeated noise. */
const HOOK_SFX: Cue[] = [
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 1.9,  lead: 0 },
  { at: 0.00, src: A + "riser-metal.wav",  v: LEVELS.SFX_MID,     dur: 1.33, lead: 0 },
  { at: 0.02, src: A + "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.19, lead: 0 },
  { at: 0.00, src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 5.8,  lead: 0 },
  ...scoreCut(T[0], "whoosh-fast.wav",   "hit-boom.wav",      "gear-stutter.wav", 1.06),  // -> launch
  ...scoreCut(T[1], "whoosh-swoosh.wav", "hit-up.wav",        "riser-sharp.wav"),         // -> nebula
  ...scoreCut(T[2], "whoosh-flyby.wav",  "snap.wav",          "riser-metal.wav", 1.1),    // -> the 3
  ...scoreCut(T[3], "whoosh-choppy.wav", "hit-boom.wav",      "paper-rustle.wav", 0.92),  // -> gas giant
  ...scoreCut(T[4], "whoosh-fast.wav",   "punch.wav",         "gear-mech.wav"),           // -> rust world
  ...scoreCut(T[5], "whoosh-swoosh.wav", "positive-chime.wav","unlock.wav"),              // -> rings / control
  { at: 1.10, src: A + "lights-on.wav",   v: LEVELS.SFX_MID,     dur: 0.78 },             // the launch lights
  { at: 3.50, src: A + "loading-loop.wav", v: LEVELS.SFX_BED,    dur: 2.2 },              // it keeps running
];

const HookWithSound: React.FC = () => {
  const f = useCurrentFrame();
  const music = f < 10 ? db(-12) : f > 160 ? db(-11) * Math.max(0, (171 - f) / 11) : db(-11);
  return (
    <AbsoluteFill>
      {/* the house bed, from a hot bar so it is audible at frame 0 */}
      <Audio src={staticFile("ebm_bed.wav")} volume={music} startFrom={12 * FPS} />
      <SfxTrack cues={HOOK_SFX} />
      <MissionHook />
    </AbsoluteFill>
  );
};

registerRoot(() => React.createElement(React.Fragment, null,
  React.createElement(Composition, { key: "a", id: "MissionHook", component: MissionHook as any, durationInFrames: 171, ...P }),
  React.createElement(Composition, { key: "b", id: "MissionHookSound", component: HookWithSound as any, durationInFrames: 171, ...P }),
));
