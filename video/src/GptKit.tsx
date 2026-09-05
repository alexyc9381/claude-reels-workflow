import React from "react";
import { Easing, interpolate } from "remotion";

/* ===========================================================================
   GPT KIT — THE CHATGPT MASCOT.

   Alex: *"you know how we have a Claude sprite icon for our videos... I want a
   ChatGPT sort of sprite icon for this character since I'm gonna be making
   ChatGPT videos soon."* And then, on the first attempt: *"for the Claude
   sprite the thing about it is that it doesn't just look like the Claude logo,
   it's quite interesting and is kind of like a mascot for it."*

   ⭐⭐⭐ THAT SECOND NOTE IS THE WHOLE DESIGN, AND THE FIRST ATTEMPT FAILED IT.
   The Claude sprite carries NO Anthropic mark anywhere on it. It is a chunky
   four-legged clay critter, and its Claude-ness is the clay orange and the
   personality — nothing else. So the first pass here, which was the house
   `GoogleSprite` move (recolour the same body, float the OpenAI knot above its
   head on a badge), was wrong by construction: it produces a Claude sprite
   WEARING a ChatGPT logo, not a ChatGPT mascot.

   ⭐ SO THE MARK BECAME THE BODY. This creature's body IS the OpenAI knot —
   its real six-lobed silhouette, with the weave showing through as a tonal
   emboss. There is no logo pasted on it anywhere, exactly as there is no
   Anthropic logo on the Claude one. It reads as ChatGPT because of its SHAPE
   and its GREEN, which is the same trick the Claude sprite plays with clay.

   ⛔ AND IT IS STILL THE SAME SPECIES. Four stubby legs, two side arms, two
      ink eyes, the same hop / blink / gaze / cheer / shock rig, the same feet
      line at 0.917 x size. Stand it next to a Claude sprite and it reads as a
      sibling, which is the point — the reels put them in the same frame.

   ⭐ THE GEOMETRY IS TRACED, NOT DRAWN. Standing rule: real logos, never
   invented glyphs. The knot is six interlocking strokes forming seven counters
   and no one eyeballs that correctly. It was vectorised from the real 600px
   `public/logos/openai.png` with a marching-squares tracer, then rasterised
   back and measured against the source:

       IoU 98.38%   ·   area ratio 100.30%   ·   all 7 counters present

   ⛔ WHY NOT THE PNG. `openai.png` is 600x600 8-bit GREYSCALE WITH NO ALPHA —
      a black knot on an opaque white square. It cannot be a body, cannot be
      tinted, and drops in as a white tile. A path does all three.

   ⛔⛔ THE TWO DESIGN FACTS THAT WERE MEASURED, NOT GUESSED — both cost a
      render to find, so do not "simplify" them back:

      1. THE COUNTERS CANNOT BE THE EYES. The knot's two upper counters sit at
         (35.5, 24.8) and (64.6, 24.9) — very nearly mirror-symmetric, and 24.8%
         down the body where the Claude sprite's eyes sit at 25.5%. It looks on
         paper like the logo's own negative space should become the face. It
         does not: rendered, those counters are big diagonal lozenges that merge
         into one black bar and read as a VISOR, not two eyes. Ink rects in the
         Claude positions are what works.

      2. THE LIMBS ARE DRAWN BEHIND THE BODY. Claude's body is a hard rect so
         its legs can sit in front and butt against a flat edge. This body is
         round, so front-drawn legs either float off the curve or need a fudge
         per leg. Behind the body, the silhouette crops each leg itself and they
         emerge at the right length for free.
   ========================================================================= */

/* ---------------------------------------------------------------------------
   THE TRACED MARK. Normalised into a 0..100 box, centred, aspect preserved.
   ⛔ `BLOSSOM_D` is the OUTER silhouette only. `KNOT_COUNTERS` are the seven
      holes. Fill the silhouette, then lay the counters over it darker — that
      is what makes the weave read without drawing a single ribbon.
   ⛔ If you ever fill the two together as one path you MUST use
      `fillRule="evenodd"` or the counters fill in and the knot becomes a blob.
   ------------------------------------------------------------------------ */
export const BLOSSOM_D =
  "M 42.50 0.09 C 43.49 0.11 46.40 -0.07 48.33 0.20 C 50.26 0.47 52.65 1.26 54.07 1.72 C 55.49 2.19 " +
  "55.96 2.53 56.85 3.02 C 57.75 3.51 58.30 3.80 59.44 4.68 C 60.59 5.57 63.70 8.31 63.70 8.31 C 63.70 " +
  "8.31 66.39 7.84 67.78 7.78 C 69.17 7.72 70.71 7.82 72.04 7.98 C 73.36 8.14 74.26 8.28 75.74 8.76 C " +
  "77.22 9.25 79.44 10.12 80.93 10.88 C 82.41 11.65 83.36 12.28 84.63 13.34 C 85.90 14.41 87.37 15.83 " +
  "88.52 17.26 C 89.66 18.70 90.69 20.30 91.50 21.94 C 92.32 23.59 93.00 25.77 93.41 27.13 C 93.82 " +
  "28.49 93.84 28.98 93.97 30.09 C 94.09 31.20 94.19 32.62 94.16 33.80 C 94.13 34.97 93.99 35.96 93.78 " +
  "37.13 C 93.57 38.30 92.91 40.83 92.91 40.83 C 92.91 40.83 94.47 42.75 95.22 43.98 C 95.98 45.22 " +
  "96.86 46.85 97.44 48.24 C 98.03 49.63 98.42 51.02 98.74 52.31 C 99.05 53.61 99.23 54.85 99.34 56.02 " +
  "C 99.44 57.19 99.41 58.30 99.35 59.35 C 99.29 60.40 99.31 60.90 98.97 62.31 C 98.62 63.73 98.07 " +
  "66.04 97.26 67.87 C 96.44 69.70 95.18 71.78 94.07 73.29 C 92.97 74.81 91.73 75.96 90.64 76.94 C " +
  "89.56 77.93 88.63 78.55 87.59 79.20 C 86.56 79.86 85.81 80.33 84.44 80.88 C 83.08 81.43 79.42 82.50 " +
  "79.42 82.50 C 79.42 82.50 78.00 85.94 77.07 87.50 C 76.15 89.06 75.04 90.58 73.89 91.85 C 72.74 " +
  "93.12 71.23 94.31 70.19 95.13 C 69.14 95.95 68.55 96.27 67.59 96.80 C 66.64 97.32 65.71 97.81 64.44 " +
  "98.28 C 63.18 98.74 61.20 99.29 60.00 99.57 C 58.80 99.86 58.33 99.91 57.22 99.98 C 56.11 100.05 " +
  "54.44 100.06 53.33 100.00 C 52.22 99.94 51.79 99.90 50.56 99.61 C 49.32 99.33 47.16 98.71 45.93 " +
  "98.28 C 44.69 97.84 44.17 97.56 43.15 96.98 C 42.13 96.40 40.93 95.68 39.81 94.80 C 38.70 93.93 " +
  "36.48 91.74 36.48 91.74 C 36.48 91.74 33.64 92.17 32.22 92.22 C 30.80 92.27 29.29 92.18 27.96 92.02 " +
  "C 26.64 91.86 25.46 91.58 24.26 91.24 C 23.06 90.89 22.20 90.69 20.74 89.94 C 19.28 89.20 17.06 " +
  "87.97 15.50 86.76 C 13.95 85.55 12.60 84.20 11.40 82.69 C 10.20 81.17 9.12 79.44 8.29 77.69 C 7.45 " +
  "75.93 6.81 74.10 6.40 72.13 C 6.00 70.15 5.87 67.41 5.84 65.83 C 5.81 64.26 6.01 63.80 6.22 62.69 C " +
  "6.43 61.57 7.09 59.17 7.09 59.17 C 7.09 59.17 5.13 56.60 4.41 55.46 C 3.68 54.32 3.21 53.36 2.74 " +
  "52.31 C 2.28 51.27 1.98 50.56 1.63 49.17 C 1.28 47.78 0.81 45.49 0.65 43.98 C 0.49 42.47 0.57 41.30 " +
  "0.66 40.09 C 0.76 38.89 0.97 37.87 1.22 36.76 C 1.47 35.65 1.78 34.51 2.19 33.43 C 2.59 32.35 2.92 " +
  "31.54 3.66 30.28 C 4.39 29.01 5.41 27.22 6.58 25.83 C 7.76 24.44 9.10 23.11 10.69 21.94 C 12.28 " +
  "20.78 14.44 19.62 16.11 18.85 C 17.78 18.07 20.71 17.31 20.71 17.31 C 20.71 17.31 21.50 15.12 22.09 " +
  "13.98 C 22.67 12.84 23.58 11.40 24.22 10.46 C 24.86 9.52 25.15 9.15 25.93 8.34 C 26.70 7.52 27.87 " +
  "6.39 28.89 5.57 C 29.91 4.74 31.02 4.00 32.04 3.39 C 33.06 2.78 33.83 2.37 35.00 1.91 C 36.17 1.45 " +
  "37.84 0.91 39.07 0.61 C 40.31 0.32 41.84 0.21 42.41 0.13 C 42.98 0.04 41.51 0.08 42.50 0.09 Z ";

export const KNOT_COUNTERS: string[] = [
  /* upper-left counter */
  "M 43.80 6.57 C 44.38 6.59 46.10 6.53 47.22 6.68 C 48.35 6.83 49.38 7.06 50.56 7.46 C 51.73 7.87 " +
  "53.27 8.57 54.26 9.13 C 55.24 9.69 56.46 10.83 56.46 10.83 C 56.46 10.83 39.88 20.46 36.30 22.65 C " +
  "32.72 24.84 35.27 23.48 34.98 23.98 C 34.68 24.48 34.61 20.86 34.54 25.65 C 34.47 30.43 34.58 48.07 " +
  "34.54 52.69 C 34.49 57.30 34.26 53.33 34.26 53.33 C 34.26 53.33 27.67 49.64 26.30 48.83 C 24.93 " +
  "48.01 26.08 52.60 26.04 48.43 C 25.99 44.25 25.96 28.30 26.02 23.80 C 26.08 19.29 26.18 22.31 26.40 " +
  "21.39 C 26.63 20.46 27.00 19.20 27.37 18.24 C 27.75 17.28 28.24 16.39 28.67 15.65 C 29.09 14.91 " +
  "29.33 14.52 29.92 13.80 C 30.51 13.07 31.44 12.02 32.22 11.31 C 33.01 10.59 33.77 10.05 34.63 9.50 C " +
  "35.49 8.95 36.45 8.43 37.41 8.02 C 38.36 7.61 39.32 7.29 40.37 7.05 C 41.42 6.82 43.13 6.69 43.70 " +
  "6.61 C 44.27 6.53 43.21 6.56 43.80 6.57 Z ",

  /* upper-right counter */
  "M 66.39 14.54 C 67.16 14.52 69.49 14.31 70.93 14.46 C 72.36 14.61 73.73 14.99 75.00 15.43 C 76.27 " +
  "15.87 77.28 16.30 78.52 17.09 C 79.75 17.89 81.35 19.13 82.41 20.19 C 83.46 21.24 84.11 22.08 84.85 " +
  "23.43 C 85.60 24.77 86.45 26.88 86.89 28.24 C 87.33 29.60 87.40 30.46 87.50 31.57 C 87.60 32.69 " +
  "87.56 34.16 87.48 34.91 C 87.41 35.65 87.04 36.06 87.04 36.06 C 87.04 36.06 70.56 26.58 67.04 24.59 " +
  "C 63.52 22.59 66.36 24.18 65.93 24.09 C 65.49 24.01 68.80 21.74 64.44 24.08 C 60.09 26.41 44.01 " +
  "35.75 39.81 38.09 C 35.62 40.44 39.26 38.14 39.26 38.14 C 39.26 38.14 39.15 30.60 39.17 28.98 C " +
  "39.19 27.36 35.87 30.53 39.40 28.43 C 42.94 26.32 56.32 18.57 60.37 16.34 C 64.42 14.11 62.72 15.35 " +
  "63.70 15.06 C 64.69 14.76 65.85 14.66 66.30 14.57 C 66.74 14.48 65.62 14.56 66.39 14.54 Z ",

  /* left counter */
  "M 18.63 24.91 C 18.75 24.87 19.26 24.73 19.26 24.73 C 19.26 24.73 19.48 21.08 19.53 25.09 C 19.58 " +
  "29.10 19.44 44.60 19.54 48.80 C 19.64 52.99 19.85 49.87 20.15 50.28 C 20.44 50.69 17.14 48.77 21.30 " +
  "51.24 C 25.46 53.71 45.11 65.09 45.11 65.09 L 37.22 69.86 C 37.22 69.86 39.64 71.66 35.93 69.57 C " +
  "32.21 67.48 19.03 59.91 14.95 57.31 C 10.86 54.72 12.45 55.31 11.40 53.98 C 10.35 52.65 9.28 50.59 " +
  "8.67 49.35 C 8.06 48.12 7.97 47.50 7.74 46.57 C 7.52 45.65 7.38 44.91 7.31 43.80 C 7.25 42.69 7.11 " +
  "41.39 7.33 39.91 C 7.56 38.43 8.26 36.11 8.67 34.91 C 9.08 33.70 9.26 33.52 9.78 32.69 C 10.29 31.85 " +
  "10.93 30.83 11.76 29.91 C 12.59 28.98 13.64 27.95 14.76 27.13 C 15.89 26.30 17.87 25.33 18.52 24.96 " +
  "C 19.16 24.59 18.50 24.95 18.63 24.91 Z ",

  /* right counter */
  "M 62.89 30.09 C 62.89 30.09 60.29 28.27 64.07 30.43 C 67.86 32.59 81.50 40.43 85.61 43.06 C 89.71 " +
  "45.68 87.75 44.89 88.70 46.15 C 89.66 47.42 90.67 49.03 91.33 50.65 C 91.99 52.26 92.46 54.26 92.68 " +
  "55.83 C 92.91 57.41 92.86 58.64 92.67 60.09 C 92.47 61.54 91.99 63.24 91.52 64.54 C 91.05 65.83 " +
  "90.44 66.90 89.85 67.87 C 89.26 68.84 88.82 69.47 87.96 70.37 C 87.10 71.26 85.73 72.48 84.68 73.24 " +
  "C 83.63 74.00 82.32 74.60 81.67 74.94 C 81.01 75.28 80.74 75.27 80.74 75.27 C 80.74 75.27 80.52 " +
  "78.92 80.47 74.91 C 80.42 70.90 80.56 55.40 80.46 51.20 C 80.36 47.01 80.14 50.13 79.85 49.72 C " +
  "79.56 49.31 82.87 51.23 78.70 48.76 C 74.54 46.29 54.84 34.91 54.84 34.91 C 54.84 34.91 61.44 30.95 " +
  "62.78 30.14 C 64.12 29.34 62.89 30.09 62.89 30.09 Z ",

  /* centre hexagon */
  "M 49.75 37.69 C 49.75 37.69 49.12 37.04 50.93 38.02 C 52.73 39.00 58.90 42.55 60.56 43.58 C 62.21 " +
  "44.60 60.80 42.07 60.83 44.17 C 60.86 46.26 60.74 56.16 60.74 56.16 L 50.25 62.31 C 50.25 62.31 " +
  "50.88 62.96 49.07 61.98 C 47.27 61.00 41.10 57.45 39.44 56.42 C 37.79 55.40 39.20 57.94 39.17 55.83 " +
  "C 39.14 53.73 39.24 43.80 39.24 43.80 C 39.24 43.80 47.88 38.75 49.63 37.74 C 51.38 36.72 49.75 " +
  "37.69 49.75 37.69 Z ",

  /* lower-right counter */
  "M 65.54 46.76 C 65.54 46.76 65.34 46.41 66.11 46.81 C 66.88 47.20 68.88 48.34 70.19 49.13 C 71.49 " +
  "49.92 73.96 51.57 73.96 51.57 C 73.96 51.57 74.17 70.71 73.98 75.65 C 73.79 80.59 73.22 79.81 72.81 " +
  "81.20 C 72.40 82.59 72.27 82.83 71.52 83.98 C 70.77 85.14 69.42 87.02 68.33 88.14 C 67.25 89.26 " +
  "66.33 89.92 65.00 90.69 C 63.67 91.45 61.94 92.25 60.37 92.72 C 58.80 93.19 57.01 93.45 55.56 93.52 " +
  "C 54.10 93.58 52.93 93.39 51.67 93.13 C 50.40 92.88 49.10 92.46 47.96 91.99 C 46.82 91.52 45.55 " +
  "90.79 44.81 90.31 C 44.08 89.84 43.54 89.17 43.54 89.17 C 43.54 89.17 41.15 90.33 44.44 88.39 C " +
  "47.74 86.45 59.90 79.63 63.33 77.54 C 66.77 75.44 64.69 76.40 65.05 75.83 C 65.40 75.27 65.39 78.98 " +
  "65.46 74.17 C 65.53 69.35 65.47 51.51 65.48 46.94 C 65.49 42.38 65.54 46.76 65.54 46.76 Z ",

  /* lower-left counter */
  "M 60.09 61.94 C 60.19 61.91 60.56 61.77 60.56 61.77 C 60.56 61.77 60.80 60.53 60.83 62.13 C 60.85 " +
  "63.73 60.71 71.39 60.71 71.39 C 60.71 71.39 44.53 80.88 40.56 83.10 C 36.58 85.33 38.09 84.35 36.85 " +
  "84.76 C 35.62 85.16 34.44 85.42 33.15 85.55 C 31.85 85.68 30.43 85.70 29.07 85.54 C 27.72 85.38 " +
  "26.27 85.01 25.00 84.57 C 23.73 84.13 22.75 83.73 21.48 82.91 C 20.22 82.08 18.46 80.68 17.41 79.63 " +
  "C 16.35 78.57 15.83 77.76 15.15 76.57 C 14.46 75.39 13.74 73.83 13.30 72.50 C 12.86 71.17 12.64 " +
  "69.85 12.50 68.61 C 12.37 67.38 12.46 65.87 12.50 65.09 C 12.55 64.32 12.78 63.97 12.78 63.97 C " +
  "12.78 63.97 29.41 73.42 32.96 75.41 C 36.51 77.40 33.67 75.82 34.07 75.91 C 34.48 75.99 34.94 75.99 " +
  "35.37 75.92 C 35.80 75.86 32.56 77.82 36.67 75.50 C 40.77 73.18 56.10 64.25 60.00 61.99 C 63.90 " +
  "59.73 60.00 61.98 60.09 61.94 Z ",
];

/* the whole mark as one path — for a logo on a screen or a wall, NOT for the
   mascot's body. Needs `fillRule="evenodd"`. */
export const KNOT_D = [BLOSSOM_D, ...KNOT_COUNTERS].join(" ");

export const OpenAIKnot: React.FC<{ x: number; y: number; s: number; f?: number; z?: number;
  spin?: number; pulse?: number; c?: string; o?: number }> =
  ({ x, y, s, f = 0, z = 80, spin = 0, pulse = 0, c = "#0D0D0D", o = 1 }) => {
  const k = pulse ? 1 + Math.sin(f / 13) * 0.09 * pulse : 1;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} style={{ position: "absolute",
      left: x - s / 2, top: y - s / 2, zIndex: z, opacity: o,
      transform: `rotate(${spin ? (f * spin) % 360 : 0}deg) scale(${k})`, overflow: "visible" }}>
      <path d={KNOT_D} fill={c} fillRule="evenodd" />
    </svg>
  );
};

/* ===========================================================================
   THE PALETTE.
   ⛔ NOT THE PURE BRAND VALUE. Same reason `G_TINTS` clays Google's blue down
      from #4285F4: a pure #10A37F body is a plastic toy standing in a clay
      world. This is ChatGPT green pulled toward the house matte.
   ⛔⛔ AND THE MONOCHROME OPENAI BLACK IS NOT A BODY COLOUR. It was rendered
      and rejected on sight: at OpenAI's brand black the #151312 eye ink has
      almost no value gap against the head, the eyes disappear, and the face
      stops performing — which is the one thing the sprite is for. `GPT_SLATE`
      below is as dark as this body goes, and it is for a night/silhouette set,
      never the default.
   ========================================================================= */
export const GPT_GREEN = "#2E9E7F";      // the body — the signature, and the default
export const GPT_GREEN_LIT = "#40B393";  // the top rim light
export const GPT_SLATE = "#4A4744";      // ⛔ dark set only — see the warning above
export const GPT_WEAVE = "rgba(20,70,58,0.24)";  // the counters, as a tonal emboss
export const OPENAI_GREEN = "#10A37F", OPENAI_INK = "#0D0D0D";  // marks only, never the body
const EYE = "#151312";

/* ---------------------------------------------------------------------------
   ⭐ THE BODY BOX, inside the same 200-unit viewBox the Claude Mascot uses.
   `BY` is not a taste number: it is solved so the eyes land on y70, which is
   exactly where the Claude sprite's eyes are, so the two casts share a sightline
   in a shared frame.   BY = 70 - BH * 0.248   (0.248 = the counters' own height
   fraction, i.e. the mark's natural "eye line").
   ------------------------------------------------------------------------ */
export const BW = 138, BH = 110, BX = 100 - BW / 2, BY = 70 - BH * 0.248;
const CXc = 100, CYc = BY + BH / 2;
/** maps the 0..100 mark into the 200-unit body box. */
const OUTER_T = `translate(${BX} ${BY}) scale(${BW / 100} ${BH / 100})`;
/** the same, shrunk 3.5% and dropped 3 — leaves a lit rim along the top edge.
    ⛔ the counters use THIS one too, or the weave mis-registers against the
       surface it is supposed to be embossed into. */
const INNER_T = `translate(${CXc} ${CYc + 3}) scale(0.965) translate(${-CXc} ${-CYc}) ` + OUTER_T;

/** measured rig constants, shared with the Claude sprite so both can stand on
    one groundline: feet at 0.917 x size, head top at 0.220, open eyes at 0.350. */
export const HEAD_TOP = 0.220, EYES_OPEN = 0.350, FEET = 0.917;

/* ===========================================================================
   THE MASCOT. Same animation rig as `SlopKit`'s Mascot — hop, squash, blink,
   gaze, leg lift, cheer, shock — so it performs like a sibling.

   ⛔ NO COSTUME LEVERS. The twelve costumes (wizard, chef, cop, professor…) are
      the CLAUDE cast's identity. A toque on this character makes it read as the
      Claude cast in fancy dress. Expressions are rig, and those carry over;
      costumes are identity, and those do not.
   ========================================================================= */
export const GptMascot: React.FC<{ lf: number; size?: number; gaze?: number; nodAmp?: number;
  nodSpeed?: number; shock?: number; cheer?: number; stern?: number; xeyes?: number; tint?: string }> =
  ({ lf, size = 250, gaze = 0, nodAmp = 3.5, nodSpeed = 10, shock = 0, cheer = 0,
     stern = 0, xeyes = 0, tint }) => {
  const C = tint || GPT_GREEN;
  const LIT = tint ? tint : GPT_GREEN_LIT;
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2 * (1 - shock);
  const squash = 1 - hopP * 0.045 * (1 - shock) + shock * 0.03;
  /* ⛔⛔ THE BLINK IS PHASE-SHIFTED AND MUST STAY THAT WAY. `SlopKit`'s Mascot
     uses a bare `(lf % 84) < 5`, so frame 0 is INSIDE the blink window and any
     sprite frozen at `lf={0}` has its eyes shut — that shipped in five scenes
     of reel 66 before anyone caught it. `+30` puts frame 0 mid-open. */
  const blink = ((lf + 30) % 84) < 5 && shock < 0.3 ? 0.15 : 1;
  const eyeH = (26 + shock * 16) * blink * (1 - stern * 0.5);
  const jump = shock > 0.05 ? Math.max(0, 1 - Math.abs(shock - 0.35) * 4) * 42 : 0;
  const legLift = (i: number) => (shock > 0.3 ? 0 : Math.max(0, Math.sin(lf / (nodSpeed * 0.6) + i * Math.PI)) * 7);
  const armY = 86 - hop * 0.4 - cheer * 26;
  const wide = shock > 0.4 ? 4 : 0, shx = shock > 0.4 ? 2 : 0;
  return (
    <div style={{ width: size, height: size, position: "relative",
      transform: `translateY(${-hop - jump}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      {/* ⛔ no `shapeRendering="crispEdges"` here. The Claude sprite can use it
          because it is all axis-aligned rects; this body is curved and crisp
          edges would staircase the whole silhouette. The rect limbs stay sharp
          on their own. */}
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ overflow: "visible" }}>
        {/* ---- limbs FIRST: the round body crops them (see the header) ---- */}
        <rect x={60}  y={125 - legLift(0)} width={17} height={59} fill={C} />
        <rect x={82}  y={125 - legLift(1)} width={17} height={59} fill={C} />
        <rect x={118} y={125 - legLift(0)} width={17} height={59} fill={C} />
        <rect x={140} y={125 - legLift(1)} width={17} height={59} fill={C} />
        <rect x={8 - cheer * 4} y={armY} width={26} height={26} fill={C}
          transform={cheer > 0.2 ? `rotate(${-cheer * 28} 21 ${armY + 13})` : undefined} />
        <rect x={166 + cheer * 4} y={armY} width={26} height={26} fill={C}
          transform={cheer > 0.2 ? `rotate(${cheer * 28} 179 ${armY + 13})` : undefined} />

        {/* ---- the knot AS the body: lit shell, inner surface, woven counters ---- */}
        <path d={BLOSSOM_D} transform={OUTER_T} fill={LIT} />
        <path d={BLOSSOM_D} transform={INNER_T} fill={C} />
        {KNOT_COUNTERS.map((d, i) => (
          <path key={"w" + i} d={d} transform={INNER_T} fill={GPT_WEAVE} />
        ))}

        {/* ---- the face, in the Claude sprite's own eye positions ---- */}
        {stern > 0.3 && <>
          <rect x={68 + gaze} y={64} width={20} height={5} fill={EYE} transform={`rotate(12 78 66)`} />
          <rect x={112 + gaze} y={64} width={20} height={5} fill={EYE} transform={`rotate(-12 122 66)`} />
        </>}
        {xeyes > 0 ? <>
          <path d="M70 68 L88 88 M88 68 L70 88" stroke={EYE} strokeWidth={5} strokeLinecap="round" />
          <path d="M112 68 L130 88 M130 68 L112 88" stroke={EYE} strokeWidth={5} strokeLinecap="round" />
        </> : <>
          <rect x={70 + gaze - shx} y={70 + (26 - eyeH) / 2} width={15 + wide} height={eyeH} fill={EYE} />
          <rect x={116 + gaze - shx} y={70 + (26 - eyeH) / 2} width={15 + wide} height={eyeH} fill={EYE} />
        </>}
        {shock > 0.4 && <rect x={93 + gaze} y={116} width={16} height={14} fill={EYE} />}
      </svg>
      {shock > 0.4 && <div style={{ position: "absolute", right: size * 0.12, top: size * 0.14,
        width: size * 0.08, height: size * 0.11,
        borderRadius: "50% 50% 50% 50% / 62% 62% 40% 40%",
        background: "linear-gradient(160deg,#BFE3FF,#5FA8E8)",
        boxShadow: "0 2px 4px rgba(20,60,120,0.4)", opacity: Math.min(1, shock * 1.5),
        transform: "rotate(8deg)" }} />}
    </div>
  );
};

/* ---------- local easing, so this kit drops into any reel unchanged ---------- */
const BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
const E = (f: number, a: number, b: number, from: number, to: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, b], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const pop = (f: number, at: number, amp: number, up: number, down: number) =>
  f < at ? 1 : f < at + up ? 1 + ((f - at) / up) * amp
  : f < at + up + down ? 1 + amp - ((f - at - up) / down) * amp : 1;

/* ===========================================================================
   THE PLACED SPRITE — position, action loop, grounding.
   ⛔ (x, y) IS THE FEET, NOT THE CENTRE — the same contract `GoogleSprite`
      uses, so a Claude, a Google and a GPT sprite all stand on one groundline
      with no per-cast fudge.
   ========================================================================= */
export const GptSprite: React.FC<{ f: number; x: number; y: number; size: number;
  i?: number; z?: number; at?: number; loop?: number; flip?: boolean;
  cheer?: number; shock?: number; tint?: string; shadow?: boolean }> =
  ({ f, x, y, size, i = 0, z = 60, at = 0, loop, flip = false, cheer, shock, tint, shadow = true }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = pop(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;

  /* ⭐ AN ACTION LOOP, NOT AN IDLE. A sprite that only breathes measures as
     dead — reel 107 cut its failure rate 3/11 -> 1/11 by giving every sprite a
     loop that TRAVELS. Four of them, so a crowd never moves as one body. */
  let dx = 0, dy = 0, rot = 0, ch = 0, gaze = 0, nod = 3.6;
  if (L === 0) {          // patrol
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {   // busy, leaning into the work
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {   // a real hop, cheering at the apex
    const t = (f / 26 + ph) % 1, j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; ch = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else {                // scanning the room
    gaze = Math.sin(f / 21 + ph) * 1.0;
    rot = Math.sin(f / 21 + ph) * 4.2; nod = 5.2;
  }

  return (
    <>
      {/* ⭐ GROUNDING. Standing law: the pool MUST be wider than the sprite or
          it does not exist. A 0.68x shadow under a 0.66x body renders entirely
          behind the sprite — that is how reel 62 shipped "floating" sprites and
          six critics all called it a sticker. Wide soft pool + tight core. */}
      {shadow && <>
        <div style={{ position: "absolute", left: x - size * 0.56, top: y - size * 0.055,
          width: size * 1.12, height: size * 0.11, zIndex: z - 1, borderRadius: "50%",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(24,22,18,0.30) 0%, rgba(24,22,18,0) 72%)" }} />
        <div style={{ position: "absolute", left: x - size * 0.31, top: y - size * 0.028,
          width: size * 0.62, height: size * 0.055, zIndex: z - 1, borderRadius: "50%",
          background: "rgba(24,22,18,0.34)", filter: "blur(2px)" }} />
      </>}
      <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
        width: size, height: size, zIndex: z,
        transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
        transformOrigin: "50% 100%" }}>
        <GptMascot lf={f + i * 9} size={size} gaze={gaze} nodAmp={nod}
          nodSpeed={9 + (i % 3) * 2} cheer={cheer ?? ch} shock={shock ?? 0} tint={tint} />
      </div>
    </>
  );
};
