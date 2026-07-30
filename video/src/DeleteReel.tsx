import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { NinjaHook } from "./NinjaHook";
import { N1Armory, N2Master, N3Founder, N4Yards, N5Short, N6Reset, N7Summit, N8Market, N9Gate } from "./NinjaScenes";
import { NinjaCut, Kind } from "./NinjaTransitions";
import words from "./data/words_delete.json";

/* ============================================================================
   REEL 81 · "DELETE" — the full reel. World: THE NINJA (NinjaScenes.tsx).

   NINE LOCATIONS, one arc: moonlit rooftops → the armory → a bamboo forest →
   the scroll hall → two training yards → a rooftop range → a waterfall shrine
   → a dawn summit → the night market → the torii gate.

   ⛔ No sliding panels. Scenes HARD CUT, and what travels across the boundary
   is a ninja GRAPHIC (smoke bomb / thrown star / blade slash / ink swipe) that
   is opaque on the cut frame. See NinjaTransitions.tsx.

   Scene starts are locked to the de-flubbed, de-gapped VO
   (public/delete_vo_v2.wav — 33.04s of speech, 2.43s of dead air removed).
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

const SCENES: { C: React.FC; s: number; label: string; cut: Kind }[] = [
  { C: NinjaHook, s: 0.00,  cut: "smoke", label: "hook · the rooftop run, the fall, the cut" },
  { C: N1Armory,  s: 4.48,  cut: "smoke", label: "the armory · they strap more iron on" },
  { C: N2Master,  s: 6.78,  cut: "star",  label: "bamboo forest · the master cuts every chain" },
  { C: N3Founder, s: 9.24,  cut: "slash", label: "the scroll hall · he is named, his clip hangs" },
  { C: N4Yards,   s: 13.00, cut: "ink",   label: "two yards · snowy 2024 vs night 2026" },
  { C: N5Short,   s: 17.10, cut: "star",  label: "rooftop range · the throw falls short" },
  { C: N6Reset,   s: 19.90, cut: "smoke", label: "the waterfall · six moons, the chains go in" },
  { C: N7Summit,  s: 24.34, cut: "slash", label: "the summit · dawn, carrying nothing" },
  { C: N8Market,  s: 26.32, cut: "ink",   label: "the night market · six brand new sets" },
  { C: N9Gate,    s: 30.74, cut: "smoke", label: "the torii gate · comment DELETE" },
];
const END_S = 34.1;                       // speech ends 33.04, hold ~1.05s on the CTA
export const DELETE_TOTAL = Math.round(END_S * FPS);

/* the incoming scene is alive 3 frames early, under the clearing graphic */
const LEAD = 3;
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

/* ============================================================================
   SOUND DESIGN — house SoundKit (docs/SOUND-DESIGN.md), AM Creator pack.
   LAYER movement+texture · PITCH-vary repeats · J-CUT 3 frames early ·
   HIERARCHY primary action only · dB LEVELS.
   Every transition gets its own ninja sound, keyed to its cut frame.
   ========================================================================== */
const A = "am/";

/** the four transition sounds, so each cut is heard as well as seen */
const cutSfx = (t: number, kind: Kind): Cue[] =>
  kind === "smoke" ? layer(t, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                              { src: A + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 0.8 })
  : kind === "star" ? layer(t, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                              { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.3 })
  : kind === "slash" ? layer(t, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.6 },
                              { src: A + "riser-metal.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 })
  : layer(t, { src: A + "marker-stroke.wav", v: LEVELS.SFX_HERO, dur: 0.7 },
             { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5 });

const SFX_ALL: Cue[] = [
  /* ---------- HOOK · a run, a fall, a slash, a poof ---------- */
  ...repeat(5, 0.05, 0.19, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.4 }, 0.07),  // the sprint
  { at: 0.10, src: A + "room-tone.wav", v: LEVELS.SFX_BED, dur: 3.0 },
  ...layer(0.53, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                  { src: A + "snap.wav", dur: 0.3 }),                                             // the leap
  { at: 0.87, src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 0.7 },                          // the chains go taut
  ...layer(1.40, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.0 },
                  { src: A + "gear-stutter.wav", v: LEVELS.SFX_MID, dur: 0.7 }),                  // it slams short
  ...layer(1.93, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.6, rate: 1.1 },
                  { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.3 }),                          // the blade
  ...layer(2.10, { src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_HERO, dur: 0.9 },
                  { src: A + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 0.8 }),                  // smoke bomb
  ...layer(2.67, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 }),            // free
  { at: 3.20, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.8 },                         // gone

  /* ---------- CUT 1 → the armory ---------- */
  ...cutSfx(4.38, "smoke"),
  /* ---------- N1 · three sets of iron slammed on ---------- */
  ...layer(4.75, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8 }, { src: A + "click-hard.wav", dur: 0.3 }),
  ...layer(5.28, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.94 }, { src: A + "click-hard.wav", dur: 0.3 }),
  ...layer(5.81, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.8, rate: 0.88 },
                  { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),

  /* ---------- CUT 2 → the bamboo forest ---------- */
  ...cutSfx(6.68, "star"),
  /* ---------- N2 · the master, the draw, the cut ---------- */
  { at: 7.11, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 },
  { at: 7.65, src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 0.7 },
  ...layer(7.91, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.6 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.9 }),

  /* ---------- CUT 3 → the scroll hall ---------- */
  ...cutSfx(9.14, "slash"),
  /* ---------- N3 · the scroll drops, the name lands ---------- */
  ...layer(9.44, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.6 }, { src: A + "click-light.wav", dur: 0.3 }),
  { at: 9.97, src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 },
  { at: 10.24, src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 },

  /* ---------- CUT 4 → the two yards ---------- */
  ...cutSfx(12.90, "ink"),
  /* ---------- N4 · two yards, then the iron slides off the new one ---------- */
  ...layer(13.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5 }, { src: A + "click-light.wav", dur: 0.3 }),
  ...layer(13.93, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.5, rate: 1.06 }, { src: A + "click-light.wav", dur: 0.3 }),
  ...layer(15.20, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 0.7 }),

  /* ---------- CUT 5 → the rooftop range ---------- */
  ...cutSfx(17.00, "star"),
  /* ---------- N5 · wind up, throw, and it drops short ---------- */
  { at: 17.37, src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 },
  ...layer(17.83, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 0.8 }, { src: A + "snap.wav", dur: 0.3 }),
  ...layer(18.57, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.3 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.86 }),

  /* ---------- CUT 6 → the waterfall ---------- */
  ...cutSfx(19.80, "smoke"),
  /* ---------- N6 · six moons, the bell, the chains in the water ---------- */
  ...repeat(6, 20.43, 0.30, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.26 }, 0.07),
  ...repeat(4, 20.60, 0.44, { src: A + "bubble-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, -0.05),
  ...layer(22.43, { src: A + "ring-low.wav", v: LEVELS.SFX_HERO, dur: 2.2 },
                  { src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),
  ...layer(22.63, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),

  /* ---------- CUT 7 → the summit ---------- */
  ...cutSfx(24.24, "slash"),
  /* ---------- N7 · dawn on the peak ---------- */
  ...layer(24.47, { src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 1.0 },
                  { src: A + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.2 }),
  { at: 24.87, src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.6 },

  /* ---------- CUT 8 → the night market ---------- */
  ...cutSfx(26.22, "ink"),
  /* ---------- N8 · the stall, two sales, and the hero walks past ---------- */
  ...layer(26.52, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 },
                  { src: A + "loading-loop.wav", v: LEVELS.SFX_BED, dur: 2.4 }),
  ...layer(27.45, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 0.9 }, { src: A + "coin-drop.wav", dur: 0.5 }),
  ...layer(28.39, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 0.9, rate: 0.92 }, { src: A + "coin-drop.wav", dur: 0.5 }),
  { at: 28.85, src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5 },

  /* ---------- CUT 9 → the torii gate ---------- */
  ...cutSfx(30.64, "smoke"),
  /* ---------- N9 · the scroll, the brand, the CTA ---------- */
  ...layer(30.94, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.7 }, { src: A + "page-turn.wav", dur: 0.5 }),
  ...layer(31.61, { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.7 }, { src: A + "snap.wav", dur: 0.3 }),
  ...layer(32.07, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 2.0 },
                  { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 2.0 }),
];

export const DeleteReel: React.FC = () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > DELETE_TOTAL - 24 ? db(-10) * Math.max(0, (DELETE_TOTAL - f) / 24) : db(-10);
  return (
    <AbsoluteFill>
      <Audio src={staticFile("delete_vo_v2.wav")} />
      <Audio src={staticFile("delete_bed_v2.wav")} volume={music} />
      <SfxTrack cues={SFX_ALL} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : DELETE_TOTAL;
          const C = sc.C;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill><C /></AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      {/* the ninja graphic that covers every cut */}
      {SCENES.slice(1).map((sc, i) => <NinjaCut key={"cut" + i} at={IN[i + 1]} kind={sc.cut} />)}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
