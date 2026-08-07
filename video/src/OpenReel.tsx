import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { S0Hook, S1Turn, S2Caveman, S3Taste, S4Agents, S5Memory, S6Feeds, S7Montage, S8Orca, S9Cta } from "./OpenScenes";
import words from "./data/words_open_103.json";

/* ============================================================================
   REEL 79 · "OPEN" — THE FULL REEL.
   One continuous chassis (cream bg + retention rail + karaoke + VO + music);
   each scene's PANEL pushes in from the right and shoves the previous one out.
   Scene starts are locked to the de-flubbed VO (public/open_vo.wav, 54.3s).
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

// start second of each scene, taken from the VO word timings
const SCENES: { C: React.FC; s: number; label: string }[] = [
  { C: S0Hook,     s: 0.00,  label: "hook · the claw, then a flip through all 7" },
  { C: S1Turn,     s: 5.18,  label: "tens of thousands of stars" },
  { C: S2Caveman,  s: 7.61,  label: "1 · Caveman" },
  { C: S3Taste,    s: 15.69, label: "2 · UI/UX Pro Max" },
  { C: S4Agents,   s: 21.46, label: "3 · Agency Agents" },
  { C: S5Memory,   s: 28.08, label: "4 · Agent Memory" },
  { C: S6Feeds,    s: 34.39, label: "5 · Last 30 Days" },
  { C: S7Montage,  s: 40.23, label: "6 · Open Montage" },
  { C: S8Orca,     s: 43.49, label: "7 · Orca" },
  { C: S9Cta,      s: 49.05, label: "CTA · comment OPEN" },
];
const END_S = 53.6;                       // VO (1.03x) ends 52.45, hold ~1.1s on the CTA
export const OPEN_TOTAL = Math.round(END_S * FPS);

const W = 1080, D = 13, LEAD = 7;
const EASE = Easing.inOut(Easing.cubic);
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

const lerp = (f: number, a: number, b: number, va: number, vb: number) =>
  interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });

// every boundary is a PUSH: the new panel drives in from the right and shoves the old one left
function xform(i: number, f: number) {
  const inStart = IN[i];
  const outStart = i < SCENES.length - 1 ? IN[i + 1] : Infinity;
  let x = 0, sc = 1, rot = 0;
  if (i > 0 && f < inStart + D) {
    const p = lerp(f, inStart, inStart + D, 0, 1);
    x = (1 - p) * W; sc = 1 + (1 - p) * 0.02;
  }
  if (f >= outStart) {
    const p = lerp(f, outStart, outStart + D, 0, 1);
    x = -p * W; sc = 1 - Math.sin(p * Math.PI) * 0.05; rot = -Math.sin(p * Math.PI) * 1.6;
  }
  return { x, sc, rot };
}

/* ============================================================================
   SOUND DESIGN — house SoundKit (docs/SOUND-DESIGN.md).
   Source: the AM Creator SFX Collection (Drive · Claude Reels/Face/Sound
   Effects), copied to public/sfx/am/.

   Applied principles:
     LAYER      every cue is a MOVEMENT + a TEXTURE, never one bare sound
     PITCH      repeats reuse ONE file with drifting rate, not new files
     J-CUT      cues land ~3 frames before the visual (SoundKit LEAD_FRAMES)
     HIERARCHY  only the primary action of a scene is sounded
     LEVELS     dialogue -6 / music -20 / sfx -10..-20, via LEVELS.*
   ========================================================================== */
const A = "am/";

// a cabinet powering up + its GitHub page painting in — shared by all 7 tool scenes
const cabinetOn = (t: number): Cue[] => [
  ...layer(t, { src: A + "lights-on.wav", v: LEVELS.SFX_MID, dur: 0.78 },
              { src: A + "ui-click.wav", dur: 0.3 }),
  ...layer(t + 0.30, { src: A + "terminal-soft.wav", v: LEVELS.SFX_TEXTURE, dur: 1.1 },
                     { src: A + "keys-macbook.wav", dur: 0.9, rate: 1.08 }),
];
// the screen flipping from the GitHub page to the demo: a whoosh with a page-turn on it
const screenFlip = (t: number, rate = 1): Cue[] =>
  layer(t, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.6, rate },
           { src: A + "page-turn.wav", dur: 0.5, rate });
// a repo won
const prizeWon = (t: number): Cue[] =>
  layer(t, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.63 },
           { src: A + "click-light.wav", dur: 0.3 });

const SFX_ALL: Cue[] = [
  /* ---------- HOOK · slam f14 · MISS f17 · pan f30 · burst f44 · carousel f60 ---------- */
  ...layer(0.06, { src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.66 },
                 { src: A + "click-mouse.wav", dur: 0.2 }),
  ...layer(0.22, { src: A + "gear-mech.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 },
                 { src: A + "gear-stutter.wav", dur: 1.0, rate: 0.9 }),
  // THE SLAM — the hero impact the whole hook is built on
  ...layer(0.47, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 1.1 },
                 { src: A + "ring-low.wav", v: LEVELS.SFX_MID, dur: 1.2 }),
  { at: 0.47, src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.16 },
  { at: 0.62, src: A + "coin-spin.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 },
  ...layer(0.95, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.21 },
                 { src: A + "click-hard.wav", v: LEVELS.SFX_MID, dur: 0.3, rate: 0.85 }),
  { at: 1.02, src: A + "crowd-laugh.wav", v: LEVELS.SFX_BED, dur: 1.3 },
  ...layer(1.40, { src: A + "whoosh-fast.wav", v: LEVELS.SFX_HERO, dur: 0.41 },
                 { src: A + "whoosh-flyby.wav", dur: 0.7 }),
  ...layer(1.92, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                 { src: A + "paper-rustle.wav", dur: 0.8 }),
  { at: 1.92, src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.73 },
  { at: 2.02, src: A + "whoosh-swoosh.wav", v: LEVELS.SFX_MID, dur: 0.5 },
  // seven selector snaps — ONE file, pitch drifting across the run
  ...repeat(7, 2.20, 0.365, { src: A + "snap.wav", v: LEVELS.SFX_MID, dur: 0.22 }, 0.055),
  ...repeat(7, 2.20, 0.365, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.22 }, 0.06),
  { at: 4.58, src: A + "positive-chime.wav", v: LEVELS.SFX_MID, dur: 0.9 },

  /* ---------- S1 · tens of thousands of stars ---------- */
  { at: 5.02, src: A + "riser-metal.wav", v: LEVELS.SFX_MID, dur: 1.33 },
  ...layer(5.40, { src: A + "crowd-wow.wav", v: LEVELS.SFX_MID, dur: 1.5 },
                 { src: A + "cash-register.wav", dur: 1.1 }),

  /* ---------- S2 · CAVEMAN (7.61) ---------- */
  ...cabinetOn(7.68),
  ...screenFlip(10.68),
  ...layer(11.21, { src: A + "hit-boom.wav", v: LEVELS.SFX_HERO, dur: 0.8 },
                  { src: A + "punch.wav", v: LEVELS.SFX_MID, dur: 0.16 }),
  { at: 13.45, src: A + "crowd-wow.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4, rate: 0.95 },
  ...prizeWon(14.14),

  /* ---------- S3 · UI/UX PRO MAX (15.69) ---------- */
  ...cabinetOn(15.76),
  ...screenFlip(18.16, 1.06),
  // the roller sweep — highlighter over a real marker stroke
  ...layer(18.76, { src: A + "highlighter.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                  { src: A + "marker-stroke.wav", v: LEVELS.SFX_MID, dur: 0.9 }),
  ...prizeWon(20.76),

  /* ---------- S4 · AGENCY AGENTS (21.46) ---------- */
  ...cabinetOn(21.53),
  ...screenFlip(24.13, 0.96),
  ...repeat(4, 24.66, 0.535, { src: A + "coin-drop.wav", v: LEVELS.SFX_MID, dur: 0.5 }, 0.07),
  ...repeat(4, 24.72, 0.535, { src: A + "bubble-pop.wav", v: LEVELS.SFX_MID, dur: 0.2 }, 0.08),
  ...prizeWon(27.06),

  /* ---------- S5 · AGENT MEMORY (28.08) ---------- */
  ...cabinetOn(28.15),
  ...screenFlip(30.61, 1.03),
  ...layer(31.68, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                  { src: A + "click-mac.wav", v: LEVELS.SFX_MID, dur: 0.3 }),
  ...repeat(5, 31.15, 0.365, { src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.07),
  ...prizeWon(33.41),

  /* ---------- S6 · LAST 30 DAYS (34.39) ---------- */
  ...cabinetOn(34.46),
  ...screenFlip(36.79, 0.98),
  ...repeat(4, 36.92, 0.20, { src: A + "ping-msg.wav", v: LEVELS.SFX_TEXTURE, dur: 0.25 }, 0.09),
  ...layer(38.32, { src: A + "success-jingle.wav", v: LEVELS.SFX_MID, dur: 1.1 },
                  { src: A + "paper-slide.wav", dur: 0.7 }),
  ...prizeWon(39.46),

  /* ---------- S7 · OPEN MONTAGE (40.23) ---------- */
  ...cabinetOn(40.30),
  ...screenFlip(41.10, 1.08),
  // the timeline rolling — film roll over a projector bed
  ...layer(41.28, { src: A + "film-roll.wav", v: LEVELS.SFX_MID, dur: 0.25 },
                  { src: A + "film-projector.wav", v: LEVELS.SFX_BED, dur: 1.9 }),
  { at: 41.60, src: A + "loading-loop.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4 },
  ...prizeWon(43.16),

  /* ---------- S8 · ORCA (43.49) ---------- */
  ...cabinetOn(43.56),
  ...screenFlip(45.69, 1.01),
  // eight lanes spinning up — countdown over a ticking counter
  ...layer(45.86, { src: A + "digital-countdown.wav", v: LEVELS.SFX_MID, dur: 2.0 },
                  { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 2.0, rate: 1.3 }),
  ...layer(48.36, { src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.63 },
                  { src: A + "crowd-cheer.wav", v: LEVELS.SFX_TEXTURE, dur: 1.4 }),
  { at: 48.56, src: A + "riser-metal.wav", v: LEVELS.SFX_TEXTURE, dur: 1.0 },

  /* ---------- S9 · CTA (49.05) ---------- */
  ...layer(49.12, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 2.4 },
                  { src: A + "crowd-applause.wav", v: LEVELS.SFX_MID, dur: 3.4 }),
  ...layer(49.98, { src: A + "cash-register.wav", v: LEVELS.SFX_MID, dur: 1.13 },
                  { src: A + "wheel-spin.wav", dur: 1.0 }),
];

export const OpenReel: React.FC = () => {
  const f = useCurrentFrame();
  const music = interpolate(f, [0, 14, OPEN_TOTAL - 28, OPEN_TOTAL], [db(-13), db(-10), db(-10), 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Audio src={staticFile("open_vo_103.wav")} />
      <Audio src={staticFile("open_bed_ducked.wav")} volume={music} />
      {/* a whoosh on every panel push */}
      {IN.slice(1).map((t, i) => (
        <Sequence key={"wh" + i} from={t - 2} durationInFrames={16} layout="none">
          <Audio src={staticFile("sfx/am/whoosh-fast.wav")} volume={LEVELS.SFX_MID} />
        </Sequence>
      ))}
      <SfxTrack cues={SFX_ALL} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] + D : OPEN_TOTAL;
          const { x, sc: scale, rot } = xform(i, f);
          const C = sc.C;
          return (
            <Sequence key={i} from={from} durationInFrames={to - from} layout="none">
              <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${scale}) rotate(${rot}deg)`, transformOrigin: "50% 54%", willChange: "transform" }}>
                <C />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AssemblyCtx.Provider>

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
