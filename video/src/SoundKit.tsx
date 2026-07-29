import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

/* =============================================================================
   SOUND KIT — the house sound-design system.

   Five rules, encoded so they are hard to get wrong:

   1. LEVELS live in dB, not guessed floats. Dialogue ≈ -6, music ≈ -20,
      SFX floats -10..-20 by impact. `db()` converts.
   2. LAYERING. One sound is rarely enough. A cue is a MOVEMENT (whoosh / boom)
      plus a TEXTURE (paper, tick, marker, gear). `layer()` builds the pair.
   3. PITCH VARIATION. Repeats reuse the SAME file at a different `rate` rather
      than hunting for a new sound — the editor's rate-stretch trick.
   4. J-CUTS. Every cue lands a few frames BEFORE its visual so the brain is
      prepped. `LEAD_FRAMES` is applied automatically; opt out with `lead: 0`.
   5. HIERARCHY. Sound the PRIMARY action only. If a big thing and a small thing
      move together, the small thing is silent. There is no API for this — it is
      a review rule. Count your cues per scene; more than ~4 is usually clutter.

   Docs: docs/SOUND-DESIGN.md
   ========================================================================== */

const FPS = 30;

/** dB → linear gain. -6 dB ≈ 0.50, -12 ≈ 0.25, -20 ≈ 0.10. */
export const db = (d: number) => Math.pow(10, d / 20);

/** The three mix buckets. Keep every cue inside its bucket. */
export const LEVELS = {
  DIALOGUE: db(-6),
  MUSIC: db(-20),
  SFX_HERO: db(-10),   // the one impact a scene is built around
  SFX_MID: db(-15),    // supporting movement
  SFX_TEXTURE: db(-19),// the layer you feel more than hear
  SFX_BED: db(-24),    // room tone / hum under a scene
} as const;

/** J-cut: how many frames early a cue fires by default (~0.1s). */
export const LEAD_FRAMES = 3;

export type Cue = {
  /** seconds of the VISUAL beat — the lead is subtracted for you */
  at: number;
  src: string;
  /** linear gain; use LEVELS.* or db(-14) */
  v: number;
  /** seconds — ALWAYS set it, long one-shots will otherwise run under the next scene */
  dur: number;
  /** playback rate: pitch/speed variation from the same file (0.85 = lower/slower) */
  rate?: number;
  /** override the J-cut lead in frames (0 = land exactly on the beat) */
  lead?: number;
  /** start this many seconds into the file, to skip a slow attack */
  from?: number;
};

export const Sfx: React.FC<Cue> = ({ at, src, v, dur, rate = 1, lead = LEAD_FRAMES, from = 0 }) => {
  const start = Math.max(0, Math.round(at * FPS) - lead);
  return (
    <Sequence from={start} durationInFrames={Math.max(1, Math.round(dur * FPS))} layout="none">
      <Audio src={staticFile(`sfx/${src}`)} volume={v} playbackRate={rate} startFrom={Math.round(from * FPS)} />
    </Sequence>
  );
};

/**
 * A layered cue: a MOVEMENT sound plus a TEXTURE sound on the same beat.
 * The texture sits ~6 dB under the movement and is nudged 1 frame later so the
 * pair reads as one event with grit rather than two separate hits.
 */
export const layer = (
  at: number,
  movement: { src: string; v: number; dur: number; rate?: number },
  texture: { src: string; v?: number; dur: number; rate?: number },
): Cue[] => [
  { at, src: movement.src, v: movement.v, dur: movement.dur, rate: movement.rate },
  { at, src: texture.src, v: texture.v ?? movement.v * db(-6), dur: texture.dur, rate: texture.rate, lead: LEAD_FRAMES - 1 },
];

/**
 * The same cue repeated N times with drifting pitch, so a run of identical
 * actions (seven selector snaps, five save slots) never sounds copy-pasted.
 * `step` is the pitch delta per repeat.
 */
export const repeat = (
  times: number,
  first: number,
  gap: number,
  base: Omit<Cue, "at" | "rate">,
  step = 0.05,
): Cue[] =>
  Array.from({ length: times }, (_, i) => ({
    ...base,
    at: first + i * gap,
    rate: 1 + (i - (times - 1) / 2) * step,
    v: base.v * (1 - i * 0.03),
  }));

/** Render a whole cue list. */
export const SfxTrack: React.FC<{ cues: Cue[] }> = ({ cues }) => (
  <>{cues.map((c, i) => <Sfx key={`${c.src}-${c.at}-${i}`} {...c} />)}</>
);
