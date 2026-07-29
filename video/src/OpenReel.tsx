import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, interpolate, Easing } from "remotion";
import { Bg, ProgressBar, KaraokeCaption, AssemblyCtx } from "./SlopKit";
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

const Sfx: React.FC<{ at: number; src: string; v?: number; dur?: number }> = ({ at, src, v = 0.4, dur = 0.4 }) => (
  <Sequence from={fr(at)} durationInFrames={Math.max(1, fr(dur))} layout="none">
    <Audio src={staticFile(`sfx/${src}`)} volume={v} />
  </Sequence>
);

/* ============================================================================
   SOUND DESIGN — sourced from the house pack at
   Google Drive · Claude Reels/Face/Sound Effects  (copied to public/sfx/pack/).
   Every cue is keyed to a real beat in the animation, not sprinkled: the claw
   motor, the slam, the MISS, each whip-pan, each cabinet powering on, each
   screen flip, each prize won, and the CTA payoff.
   `dur` TRUNCATES long one-shots (impact-boom is 7.4s, applause 5.9s) — always
   set it, or a tail will run under the next scene.
   ========================================================================== */
const K = "pack/";
const SFX_ALL: { at: number; src: string; v: number; dur: number }[] = [
  /* ---------- HOOK (0-5.18): slam f14 · MISS f17 · pan f30 · burst f44 · carousel f60 ---------- */
  { at: 0.06, src: K + "coin-drop.wav", v: 0.52, dur: 0.66 },        // the coin goes in
  { at: 0.22, src: K + "gear-stutter.wav", v: 0.40, dur: 0.8 },      // the claw motor tracks
  { at: 0.47, src: K + "impact-boom.wav", v: 0.66, dur: 1.1 },       // THE SLAM
  { at: 0.47, src: K + "punch.wav", v: 0.50, dur: 0.16 },
  { at: 0.60, src: K + "coin-spin.wav", v: 0.40, dur: 0.9 },         // coins jump off the stack
  { at: 0.95, src: K + "error-take.wav", v: 0.56, dur: 0.21 },       // MISS stamp
  { at: 1.02, src: K + "crowd-laugh.wav", v: 0.20, dur: 1.3 },       // the arcade laughs at you
  { at: 1.40, src: K + "whoosh-fast.wav", v: 0.60, dur: 0.41 },      // whip-pan to the crate
  { at: 1.92, src: K + "unlock.wav", v: 0.52, dur: 0.91 },           // the crate BURSTS
  { at: 1.92, src: K + "riser-sharp.wav", v: 0.34, dur: 0.73 },
  { at: 2.02, src: K + "whoosh-swoosh.wav", v: 0.40, dur: 0.5 },     // into the prize-select carousel
  // seven selector snaps, one per repo, alternating so it reads mechanical
  { at: 2.20, src: K + "snap-1.wav", v: 0.44, dur: 0.19 },
  { at: 2.57, src: K + "snap-2.wav", v: 0.42, dur: 0.24 },
  { at: 2.93, src: K + "snap-1.wav", v: 0.42, dur: 0.19 },
  { at: 3.30, src: K + "snap-2.wav", v: 0.40, dur: 0.24 },
  { at: 3.67, src: K + "snap-1.wav", v: 0.40, dur: 0.19 },
  { at: 4.03, src: K + "snap-2.wav", v: 0.38, dur: 0.24 },
  { at: 4.40, src: K + "snap-1.wav", v: 0.38, dur: 0.19 },
  { at: 4.58, src: K + "positive-chime.wav", v: 0.34, dur: 0.9 },    // the star total lands

  /* ---------- S1 · tens of thousands of stars (5.18) ---------- */
  { at: 5.02, src: K + "riser-metal.wav", v: 0.36, dur: 1.33 },
  { at: 5.40, src: K + "crowd-wow.wav", v: 0.34, dur: 1.5 },
  { at: 5.60, src: K + "cash-register.wav", v: 0.26, dur: 1.1 },

  /* ---------- S2 · #1 CAVEMAN (7.61) ---------- */
  { at: 7.68, src: K + "lights-on.wav", v: 0.42, dur: 0.78 },        // cabinet powers up
  { at: 7.95, src: K + "terminal-soft.wav", v: 0.26, dur: 1.2 },     // the GitHub page paints in
  { at: 10.68, src: K + "whoosh-choppy.wav", v: 0.40, dur: 0.5 },    // screen flips to the demo
  { at: 11.21, src: K + "punch.wav", v: 0.60, dur: 0.16 },           // the club smash
  { at: 11.21, src: K + "impact-boom.wav", v: 0.40, dur: 0.8 },
  { at: 13.45, src: K + "crowd-wow.wav", v: 0.30, dur: 1.4 },        // the laughing stops
  { at: 14.14, src: K + "check-pop.wav", v: 0.44, dur: 0.63 },       // prize won

  /* ---------- S3 · #2 UI/UX PRO MAX (15.69) ---------- */
  { at: 15.76, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 16.02, src: K + "terminal-soft.wav", v: 0.24, dur: 1.2 },
  { at: 18.16, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 18.76, src: K + "highlighter.wav", v: 0.52, dur: 0.45 },     // the paint roller sweeps
  { at: 19.20, src: K + "highlighter.wav", v: 0.34, dur: 0.45 },
  { at: 20.76, src: K + "check-pop.wav", v: 0.42, dur: 0.63 },

  /* ---------- S4 · #3 AGENCY AGENTS (21.46) ---------- */
  { at: 21.53, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 21.79, src: K + "terminal-soft.wav", v: 0.24, dur: 1.2 },
  { at: 24.13, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 24.66, src: K + "coin-drop.wav", v: 0.40, dur: 0.5 },        // capsules drop
  { at: 24.72, src: K + "bubble-pop.wav", v: 0.46, dur: 0.11 },      // and pop open
  { at: 25.19, src: K + "coin-drop.wav", v: 0.38, dur: 0.5 },
  { at: 25.25, src: K + "bubble-pop.wav", v: 0.44, dur: 0.11 },
  { at: 25.73, src: K + "coin-drop.wav", v: 0.36, dur: 0.5 },
  { at: 25.79, src: K + "bubble-pop.wav", v: 0.42, dur: 0.11 },
  { at: 26.26, src: K + "bubble-pop.wav", v: 0.40, dur: 0.11 },
  { at: 27.06, src: K + "check-pop.wav", v: 0.42, dur: 0.63 },

  /* ---------- S5 · #4 AGENT MEMORY (28.08) ---------- */
  { at: 28.15, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 28.41, src: K + "terminal-soft.wav", v: 0.24, dur: 1.2 },
  { at: 30.61, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 31.15, src: K + "ping.wav", v: 0.34, dur: 0.13 },            // one per save slot lighting
  { at: 31.51, src: K + "ping.wav", v: 0.33, dur: 0.13 },
  { at: 31.88, src: K + "ping.wav", v: 0.32, dur: 0.13 },
  { at: 32.25, src: K + "ping.wav", v: 0.31, dur: 0.13 },
  { at: 32.61, src: K + "ping.wav", v: 0.30, dur: 0.13 },
  { at: 31.68, src: K + "unlock.wav", v: 0.44, dur: 0.91 },          // the memory card seats
  { at: 33.41, src: K + "check-pop.wav", v: 0.42, dur: 0.63 },

  /* ---------- S6 · #5 LAST 30 DAYS (34.39) ---------- */
  { at: 34.46, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 34.72, src: K + "terminal-soft.wav", v: 0.24, dur: 1.2 },
  { at: 36.79, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 36.92, src: K + "ping.wav", v: 0.36, dur: 0.13 },            // each feed comes online
  { at: 37.12, src: K + "ping.wav", v: 0.35, dur: 0.13 },
  { at: 37.32, src: K + "ping.wav", v: 0.34, dur: 0.13 },
  { at: 37.52, src: K + "ping.wav", v: 0.33, dur: 0.13 },
  { at: 38.32, src: K + "success-jingle.wav", v: 0.34, dur: 1.1 },   // the one summary lands
  { at: 39.46, src: K + "check-pop.wav", v: 0.42, dur: 0.63 },

  /* ---------- S7 · #6 OPEN MONTAGE (40.23) ---------- */
  { at: 40.30, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 41.10, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 41.28, src: K + "film-roll.wav", v: 0.50, dur: 0.18 },       // the timeline rolls
  { at: 41.52, src: K + "loading-loop.wav", v: 0.26, dur: 1.5 },     // render progress
  { at: 43.16, src: K + "check-pop.wav", v: 0.42, dur: 0.63 },

  /* ---------- S8 · #7 ORCA (43.49) ---------- */
  { at: 43.56, src: K + "lights-on.wav", v: 0.40, dur: 0.78 },
  { at: 43.82, src: K + "terminal-soft.wav", v: 0.24, dur: 1.2 },
  { at: 45.69, src: K + "whoosh-choppy.wav", v: 0.38, dur: 0.5 },
  { at: 45.86, src: K + "digital-countdown.wav", v: 0.30, dur: 2.0 },// eight lanes spin up
  { at: 48.36, src: K + "check-pop.wav", v: 0.44, dur: 0.63 },
  { at: 48.56, src: K + "riser-metal.wav", v: 0.32, dur: 1.0 },      // into the CTA

  /* ---------- S9 · CTA (49.05) ---------- */
  { at: 49.12, src: K + "success-jingle.wav", v: 0.40, dur: 2.4 },
  { at: 49.20, src: K + "crowd-applause.wav", v: 0.30, dur: 3.4 },
  { at: 49.98, src: K + "cash-register.wav", v: 0.44, dur: 1.13 },   // $49.99 -> $0.00
  { at: 50.60, src: K + "positive-chime.wav", v: 0.30, dur: 1.2 },
];

export const OpenReel: React.FC = () => {
  const f = useCurrentFrame();
  const music = interpolate(f, [0, 14, OPEN_TOTAL - 28, OPEN_TOTAL], [0.22, 0.32, 0.32, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Audio src={staticFile("open_vo_103.wav")} />
      <Audio src={staticFile("powers_bed.wav")} volume={music} />
      {/* a whoosh on every panel push */}
      {IN.slice(1).map((t, i) => (
        <Sequence key={"wh" + i} from={t - 2} durationInFrames={16} layout="none">
          <Audio src={staticFile("sfx/pack/whoosh-fast.wav")} volume={0.46} />
        </Sequence>
      ))}
      {SFX_ALL.map((s, i) => <Sfx key={"sfx" + i} at={s.at} src={s.src} v={s.v} dur={s.dur} />)}

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
