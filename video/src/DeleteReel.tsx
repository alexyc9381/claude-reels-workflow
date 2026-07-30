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
  { C: NinjaHook, s: 0.00,  cut: "smoke", label: "hook · chained to CLAUDE.md, yanked over, cut free" },
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
const END_S = 33.14;                      // ⛔ the reel ENDS on the word "DELETE" (ends 33.04). No hold.
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

/* Measured file lengths (ffprobe). `dur` shorter than these is fine now that
   Sfx ramps the tail, but anything set WAY under its decay still sounds thin —
   these are the numbers to reason against. */
const LEN = {
  clickLight: 0.08, clickMac: 0.08, bubble: 0.11, ping: 0.13, punch: 0.16, filmRoll: 0.18,
  snap: 0.19, err: 0.21, uiClick: 0.23, whooshFast: 0.41, clickHard: 0.42, page: 0.50,
  checkPop: 0.63, paperSlide: 0.63, coin: 0.66, riserSharp: 0.73, ringLow: 0.76,
  whooshSwoosh: 0.76, lightsOn: 0.78, whooshChoppy: 0.78, unlock: 0.91, gearMech: 1.03,
  gearStutter: 1.03, tick: 1.05, cash: 1.13, riserMetal: 1.33, rustle: 1.50, wow: 1.71,
  flyby: 2.15, hitUp: 2.18, loading: 2.27, terminal: 2.91, wheel: 3.78, projector: 5.10,
  applause: 5.90, cheer: 6.02, boom: 7.45, laugh: 7.62, jingle: 8.31, chime: 9.23,
  marker: 11.62, keys: 12.15, roomTone: 57.17,
} as const;

/** SCORE A CUT (docs/THE-OPEN.md): whoosh INTO it, transient ON it. */
const scoreCut = (t: number, movement: string, impact: string, opts: { rate?: number; texture?: string } = {}): Cue[] => [
  { at: t - 0.12, src: A + movement, v: LEVELS.SFX_MID, dur: 0.8, rate: opts.rate ?? 1, lead: 0 },
  { at: t, src: A + impact, v: LEVELS.SFX_HERO, dur: 1.1, rate: opts.rate ?? 1, lead: 0 },
  ...(opts.texture ? [{ at: t + 0.03, src: A + opts.texture, v: LEVELS.SFX_TEXTURE, dur: 0.9, lead: 0 }] : []),
];

/** the four transition sounds, so each cut is heard as well as seen */
const cutSfx = (t: number, kind: Kind): Cue[] =>
  kind === "smoke" ? scoreCut(t, "whoosh-swoosh.wav", "hit-boom.wav", { texture: "paper-rustle.wav" })
  : kind === "star" ? scoreCut(t, "whoosh-flyby.wav", "snap.wav", { texture: "riser-metal.wav" })
  : kind === "slash" ? scoreCut(t, "whoosh-fast.wav", "snap.wav", { rate: 1.08, texture: "riser-metal.wav" })
  : scoreCut(t, "whoosh-choppy.wav", "marker-stroke.wav", { texture: "paper-rustle.wav" });

/** a location's own ambience, so every world sounds like somewhere */
const amb = (t: number, dur: number, src: string, rate = 1, v: number = LEVELS.SFX_BED): Cue[] =>
  [{ at: t, src: A + src, v, dur, rate, lead: 0 }];

const SFX_ALL: Cue[] = [
  /* ======================= THE OPEN · six shots, every cut scored ==========
     Frame 0 carries the HEAVIEST stack in the reel — it is the interrupt.
     Five simultaneous cues: the lock slamming, the movement, the metal snap,
     a keyboard texture (recognition: this is a file you have), and room tone. */
  { at: 0.00, src: A + "hit-boom.wav",     v: LEVELS.SFX_HERO,    dur: 2.0,  lead: 0 },
  { at: 0.00, src: A + "whoosh-fast.wav",  v: LEVELS.SFX_MID,     dur: 0.41, lead: 0, rate: 0.9 },
  { at: 0.02, src: A + "snap.wav",         v: LEVELS.SFX_MID,     dur: 0.19, lead: 0 },
  { at: 0.00, src: A + "keys-macbook.wav", v: LEVELS.SFX_TEXTURE, dur: 0.85, lead: 0 },
  { at: 0.00, src: A + "room-tone.wav",    v: LEVELS.SFX_BED,     dur: 4.6,  lead: 0 },
  /* the chain jerks taut inside shot A */
  ...layer(0.20, { src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
                 { src: A + "click-hard.wav", dur: 0.42 }),

  /* the five hard cuts of the open: 0.50 / 1.03 / 1.57 / 2.03 / 2.50 */
  ...scoreCut(0.50, "whoosh-swoosh.wav", "hit-boom.wav", { texture: "paper-rustle.wav" }),   // to the wide
  ...scoreCut(1.03, "whoosh-choppy.wav", "hit-boom.wav", { rate: 0.9, texture: "gear-stutter.wav" }), // the yank
  ...scoreCut(1.57, "whoosh-fast.wav", "snap.wav", { rate: 1.1, texture: "riser-metal.wav" }),  // the blade
  ...scoreCut(2.03, "whoosh-swoosh.wav", "punch.wav", { texture: "paper-rustle.wav" }),      // smoke
  ...scoreCut(2.50, "whoosh-flyby.wav", "unlock.wav", { texture: "positive-chime.wav" }),    // free
  { at: 3.10, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.2 },                    // gone

  /* ======================= N1 · THE ARMORY (4.48) ========================= */
  ...cutSfx(4.38, "smoke"),
  ...amb(4.42, 2.40, "room-tone.wav", 1.0),
  ...amb(4.42, 2.30, "gear-stutter.wav", 0.8, LEVELS.SFX_BED),                 // forge hum
  ...layer(4.75, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0 }, { src: A + "click-hard.wav", dur: 0.42 }),
  ...layer(5.28, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.0, rate: 0.94 }, { src: A + "click-hard.wav", dur: 0.42 }),
  ...layer(5.81, { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.2, rate: 0.88 },
                 { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 1.03 }),
  ...repeat(3, 4.90, 0.53, { src: A + "ui-click.wav", v: LEVELS.SFX_TEXTURE, dur: 0.23 }, 0.06),  // the load rail filling

  /* ======================= N2 · BAMBOO FOREST (6.78) ===================== */
  ...cutSfx(6.68, "star"),
  ...amb(6.72, 2.56, "room-tone.wav", 0.72),                                   // wind through cane
  { at: 7.11, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.50 }, // he steps out
  ...layer(7.65, { src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
                 { src: A + "highlighter.wav", dur: 0.45 }),                   // the draw
  ...layer(7.91, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.41 },
                 { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.19 }),       // the cut
  ...repeat(4, 8.05, 0.15, { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.42 }, -0.06), // iron on soil

  /* ======================= N3 · THE SCROLL HALL (9.24) =================== */
  ...cutSfx(9.14, "slash"),
  ...amb(9.18, 3.72, "room-tone.wav", 0.9),
  ...layer(9.44, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, { src: A + "page-turn.wav", dur: 0.50 }),
  { at: 9.97, src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.13 },
  ...layer(10.24, { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.6 },
                  { src: A + "check-pop.wav", dur: 0.63 }),
  { at: 11.30, src: A + "paper-rustle.wav", v: LEVELS.SFX_TEXTURE, dur: 1.50, rate: 0.9 },  // he kneels

  /* ======================= N4 · TWO TRAINING YARDS (13.00) ============== */
  ...cutSfx(12.90, "ink"),
  ...amb(12.94, 4.16, "room-tone.wav", 0.66),
  ...layer(13.20, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }, { src: A + "click-light.wav", dur: 0.08 }),
  ...layer(13.93, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63, rate: 1.06 }, { src: A + "click-light.wav", dur: 0.08 }),
  ...layer(15.20, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }),            // the iron slides off
  { at: 16.10, src: A + "gear-stutter.wav", v: LEVELS.SFX_BED, dur: 1.03, rate: 0.85 },     // 2024 straining

  /* ======================= N5 · THE ROOFTOP RANGE (17.10) =============== */
  ...cutSfx(17.00, "star"),
  ...amb(17.04, 2.86, "room-tone.wav", 0.8),
  ...layer(17.37, { src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.73 },
                  { src: A + "highlighter.wav", dur: 0.45 }),                               // wind up
  ...layer(17.83, { src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.2 }, { src: A + "snap.wav", dur: 0.19 }),
  { at: 18.28, src: A + "riser-metal.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0, rate: 0.8 },    // the chain drags it
  ...layer(18.57, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.21 },
                  { src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 1.3, rate: 0.86 }),    // into the tiles

  /* ======================= N6 · THE WATERFALL (19.90) =================== */
  ...cutSfx(19.80, "smoke"),
  ...amb(19.84, 3.90, "wheel-spin.wav", 0.55, LEVELS.SFX_TEXTURE),             // the falls
  ...amb(23.70, 0.64, "wheel-spin.wav", 0.55, LEVELS.SFX_TEXTURE),
  ...repeat(6, 20.43, 0.30, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.6 }, 0.07),   // six moons
  ...repeat(6, 20.62, 0.30, { src: A + "bubble-pop.wav", v: LEVELS.SFX_MID, dur: 0.11 }, -0.05),        // each one hits the pool
  ...layer(22.43, { src: A + "ring-low.wav", v: LEVELS.SFX_HERO, dur: 0.76 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 1.8 }),      // the shrine bell
  ...layer(22.63, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                  { src: A + "check-pop.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 }),
  { at: 23.40, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_MID, dur: 1.1 },                  // blur speed

  /* ======================= N7 · THE SUMMIT (24.34) ====================== */
  ...cutSfx(24.24, "slash"),
  ...amb(24.28, 2.04, "room-tone.wav", 0.6),
  ...layer(24.47, { src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                  { src: A + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.71 }),          // dawn
  ...layer(24.87, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 },
                  { src: A + "click-hard.wav", dur: 0.42 }),                                // the banner planted

  /* ======================= N8 · THE NIGHT MARKET (26.32) =============== */
  ...cutSfx(26.22, "ink"),
  ...amb(26.26, 4.48, "crowd-laugh.wav", 0.85, LEVELS.SFX_BED),                // market chatter
  ...layer(26.52, { src: A + "paper-slide.wav", v: LEVELS.SFX_TEXTURE, dur: 0.63 },
                  { src: A + "loading-loop.wav", v: LEVELS.SFX_BED, dur: 2.27 }),
  ...layer(27.45, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.13 }, { src: A + "coin-drop.wav", dur: 0.66 }),
  ...layer(27.80, { src: A + "hit-boom.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9, rate: 0.8 },
                  { src: A + "gear-stutter.wav", dur: 1.03 }),                              // the buyer sags
  ...layer(28.39, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.13, rate: 0.92 }, { src: A + "coin-drop.wav", dur: 0.66 }),
  ...layer(28.85, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.78 },
                  { src: A + "click-light.wav", dur: 0.08 }),                               // the hero walks past
  { at: 29.90, src: A + "whoosh-flyby.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1, rate: 1.1 },

  /* ======================= N9 · THE TORII GATE (30.74) ================= */
  ...cutSfx(30.64, "smoke"),
  ...amb(30.68, 2.46, "crowd-cheer.wav", 0.9, LEVELS.SFX_BED),
  ...layer(30.94, { src: A + "paper-slide.wav", v: LEVELS.SFX_MID, dur: 0.63 }, { src: A + "page-turn.wav", dur: 0.50 }),
  ...layer(31.61, { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.9 },
                  { src: A + "snap.wav", dur: 0.19 }),                                      // DELETE burns in
  ...layer(32.07, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 0.95 },
                  { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 }),
  { at: 32.58, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.55 },                    // the seal stamps
];

export const DeleteReel: React.FC = () => {
  const f = useCurrentFrame();
  const music =
    f < 12 ? db(-12) : f > DELETE_TOTAL - 10 ? db(-10) * Math.max(0, (DELETE_TOTAL - f) / 10) : db(-10);
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
