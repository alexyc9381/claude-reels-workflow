import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
import { Cue, SfxTrack, LEVELS, layer, repeat, db } from "./SoundKit";
import { DojoHook } from "./DojoHook";
import { D1Strap, D2Cut, D3Founder, D4Posts, D5Short, D6Bell, D7Shop, D8Belt } from "./DojoScenes";
import words from "./data/words_delete.json";

/* ============================================================================
   REEL 81 · "DELETE" — the full reel. World: THE DOJO (see DojoScenes.tsx).
   One continuous chassis (cream bg + retention rail + karaoke + VO + music);
   each scene's PANEL pushes in from the right and shoves the previous one out.
   Scene starts are locked to the de-flubbed VO (public/delete_vo.wav, 35.6s).
   ========================================================================== */

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);

const SCENES: { C: React.FC; s: number; label: string }[] = [
  { C: DojoHook,  s: 0.00,  label: "hook · buried in iron, the creator, the drop" },
  { C: D1Strap,     s: 4.98,  label: "the trainers strap MORE iron on" },
  { C: D2Cut,      s: 7.54,  label: "the sensei cuts the straps" },
  { C: D3Founder,        s: 10.10, label: "he BUILT the dojo · the clip" },
  { C: D4Posts,      s: 14.40, label: "2024 needed the iron, 2026 does not" },
  { C: D5Short,   s: 18.88, label: "the iron drags the punch short" },
  { C: D6Bell,       s: 21.82, label: "the six month bell · the rack empties" },
  { C: D7Shop,    s: 28.44, label: "the iron shop · walk past it" },
  { C: D8Belt,        s: 33.14, label: "the belt board · comment DELETE" },
];
const END_S = 36.6;                       // VO ends 35.46, hold ~1.1s on the CTA
export const DELETE_TOTAL = Math.round(END_S * FPS);

const W = 1080, D = 12, LEAD = 6;
const EASE = Easing.inOut(Easing.cubic);
const IN: number[] = SCENES.map((sc, i) => (i === 0 ? 0 : fr(sc.s) - LEAD));

const lerp = (f: number, a: number, b: number, va: number, vb: number) =>
  interpolate(f, [a, b], [va, vb], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });

/* ⛔ NO SLIDING TRANSITIONS. Scenes HARD CUT. The only motion across a boundary
   is a 3-frame push-in on the incoming scene, which reads as an edit rather
   than a slide, plus a 2-frame warm flash (see Flash below). */
function xform(i: number, f: number) {
  const inStart = IN[i];
  const p = lerp(f, inStart, inStart + 3, 0, 1);
  return { x: 0, sc: i === 0 ? 1 : 1.035 - p * 0.035, rot: 0 };
}

/** a 2-frame warm flash on each cut — punctuation, not a wipe */
const Flash: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const k = f - at;
  if (k < 0 || k > 2) return null;
  return <AbsoluteFill style={{ background: "#FFEFC0", opacity: (1 - k / 2) * 0.34 }} />;
};

/* ============================================================================
   SOUND DESIGN — house SoundKit (docs/SOUND-DESIGN.md), AM Creator pack.
   LAYER movement+texture · PITCH-vary repeats · J-CUT 3 frames early ·
   HIERARCHY primary action only · dB LEVELS.
   ========================================================================== */
const A = "am/";

const cardIn = (t: number): Cue[] =>
  layer(t, { src: A + "click-light.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 },
           { src: A + "paper-slide.wav", dur: 0.5 });

const SFX_ALL: Cue[] = [
  /* ---------- HOOK · the clip is already rolling ---------- */
  ...layer(0.05, { src: A + "click-mac.wav", v: LEVELS.SFX_MID, dur: 0.3 },
                 { src: A + "terminal-soft.wav", dur: 0.9 }),
  { at: 0.10, src: A + "crowd-laugh.wav", v: LEVELS.SFX_BED, dur: 1.6, rate: 0.9 },   // room tone of a talk
  ...layer(1.55, { src: A + "crowd-wow.wav", v: LEVELS.SFX_MID, dur: 1.4 },
                 { src: A + "paper-rustle.wav", dur: 0.8 }),                          // the room reacts
  { at: 3.10, src: A + "riser-sharp.wav", v: LEVELS.SFX_TEXTURE, dur: 0.73 },

  /* ---------- S1 · the tower goes up, block by block ---------- */
  ...layer(4.98, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5 },
                 { src: A + "page-turn.wav", dur: 0.5 }),
  ...repeat(6, 5.16, 0.165, { src: A + "click-hard.wav", v: LEVELS.SFX_TEXTURE, dur: 0.3 }, 0.06),

  /* ---------- S2 · the shredder — the hero impact of the reel ---------- */
  ...layer(7.54, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.05 },
                 { src: A + "page-turn.wav", dur: 0.5 }),
  ...layer(7.86, { src: A + "gear-mech.wav", v: LEVELS.SFX_HERO, dur: 2.1 },
                 { src: A + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 1.6 }),
  { at: 8.10, src: A + "hit-boom.wav", v: LEVELS.SFX_MID, dur: 0.7 },

  /* ---------- S3 · who he is — credentials land one by one ---------- */
  ...layer(10.10, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.97 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...repeat(3, 10.82, 0.30, { src: A + "ping.wav", v: LEVELS.SFX_TEXTURE, dur: 0.2 }, 0.08),
  { at: 12.60, src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.8 },

  /* ---------- S4 · old model vs Opus 5 ---------- */
  ...layer(14.40, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.02 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...cardIn(14.72),
  ...cardIn(15.10),

  /* ---------- S5 · the wall gets in the way ---------- */
  ...layer(18.88, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.95 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...repeat(3, 19.36, 0.44, { src: A + "click-hard.wav", v: LEVELS.SFX_MID, dur: 0.3 }, -0.05),  // bumping it

  /* ---------- S6 · the rule, then the file empties ---------- */
  ...layer(21.82, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.04 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...repeat(6, 22.50, 0.27, { src: A + "counter-tick.wav", v: LEVELS.SFX_TEXTURE, dur: 0.24 }, 0.07),
  ...layer(24.42, { src: A + "paper-rustle.wav", v: LEVELS.SFX_MID, dur: 1.0 },
                  { src: A + "click-light.wav", dur: 0.3 }),                          // the lines go
  ...layer(25.60, { src: A + "unlock.wav", v: LEVELS.SFX_MID, dur: 0.91 },
                  { src: A + "positive-chime.wav", v: LEVELS.SFX_TEXTURE, dur: 0.9 }), // empty, and it worked

  /* ---------- S7 · the install treadmill ---------- */
  ...layer(28.44, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 0.99 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...layer(28.70, { src: A + "loading-loop.wav", v: LEVELS.SFX_TEXTURE, dur: 2.2 },
                  { src: A + "gear-stutter.wav", v: LEVELS.SFX_BED, dur: 2.0 }),
  ...layer(31.10, { src: A + "error-take.wav", v: LEVELS.SFX_MID, dur: 0.21 },
                  { src: A + "click-hard.wav", dur: 0.3, rate: 0.85 }),

  /* ---------- S8 · CTA ---------- */
  ...layer(33.14, { src: A + "whoosh-choppy.wav", v: LEVELS.SFX_MID, dur: 0.5, rate: 1.06 },
                  { src: A + "page-turn.wav", dur: 0.5 }),
  ...layer(33.44, { src: A + "success-jingle.wav", v: LEVELS.SFX_HERO, dur: 2.3 },
                  { src: A + "crowd-applause.wav", v: LEVELS.SFX_TEXTURE, dur: 2.8 }),
  { at: 34.40, src: A + "check-pop.wav", v: LEVELS.SFX_MID, dur: 0.63 },
];

export const DeleteReel: React.FC = () => {
  const f = useCurrentFrame();
  const music = interpolate(f, [0, 14, DELETE_TOTAL - 26, DELETE_TOTAL], [db(-13), db(-10), db(-10), 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Audio src={staticFile("delete_vo.wav")} />
      <Audio src={staticFile("delete_bed_ducked.wav")} volume={music} />
      {IN.slice(1).map((t, i) => (
        <Sequence key={"wh" + i} from={t - 2} durationInFrames={14} layout="none">
          <Audio src={staticFile("sfx/am/click-hard.wav")} volume={LEVELS.SFX_MID} />
        </Sequence>
      ))}
      <SfxTrack cues={SFX_ALL} />

      <Bg />

      <AssemblyCtx.Provider value={true}>
        {SCENES.map((sc, i) => {
          const from = IN[i];
          const to = i < SCENES.length - 1 ? IN[i + 1] : DELETE_TOTAL;
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

      {IN.slice(1).map((t, i) => <Flash key={"fl" + i} at={t} />)}

      <ProgressBar />
      <KaraokeCaption words={words as any} fps={FPS} top={1268} />
    </AbsoluteFill>
  );
};
