import React from "react";
import { Img, staticFile } from "remotion";
import { Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  squash, rock, shake, ui, mono, INK, PAPER, CREAMB, GOLD, GREEN, CLAY,
  G_BLUE, G_RED, G_YEL, G_GRN,
} from "./BillWorld";

/* ===========================================================================
   REEL 116 · "BILL" — THE GOOGLE AI CAST AND ITS MARKS.

   Alex: *"the animation at 0 seconds hook needs to be redone completely its not
   interesting enough nor hierarchical and not really showing Google, lets
   brainstorm some sprite icons for Google AI because right now we have claude
   AI."*

   ⛔⛔⛔ THE ONE THING THIS FILE MUST NOT DO IS RESTYLE THE MASCOT. Reel 46
   (POWERS) redesigned the clay body — ink outlines, cel shading, cheeks — and
   was rejected hard: *"use the SPRITES FROM THE GIT REPO."* The house chassis
   is not negotiable. So a "Google AI sprite" here is the SAME clay body with
   two things changed, both of which the kit already supports:

     1. the BODY TINT, set to Google's own four brand values
     2. an EMBLEM above the head — never on it, because `Mascot`'s body rect IS
        its face and reel 94 learned that by landing a badge on the eyes

   ⭐ AND THE EMBLEM IS THE GEMINI SPARK, not an invented shape. The four-point
   spark is Google's universal AI symbol — it is on Gemini, on AI Studio's
   surfaces and across Labs — so a sprite wearing it reads as "Google AI" with
   no decoding. Its own colours, sampled from the real 512px mark:
       light #0A7DFB · mid #2F8FFD · deep #A190FF
   ========================================================================= */

/** Google's four brand values, and the clay tints that carry them without
    leaving the house palette (a pure #4285F4 body is a plastic toy, not clay). */
export const G_TINTS = ["#4E86D6", "#D06A5E", "#D9A64B", "#4F9C6B"] as const;
export const G_PURE = [G_BLUE, G_RED, G_YEL, G_GRN] as const;

/** ⭐ THE GEMINI SPARK, drawn as a path so it scales and can be tinted.
    Four concave-sided points — the shape is what makes it read, not the fill. */
export const Spark: React.FC<{ x: number; y: number; s: number; f?: number; z?: number;
  spin?: number; pulse?: number; a?: string; b?: string; o?: number }> =
  ({ x, y, s, f = 0, z = 80, spin = 0, pulse = 0, a = "#2F8FFD", b = "#A190FF", o = 1 }) => {
  const k = pulse ? 1 + Math.sin(f / 13) * 0.10 * pulse : 1;
  const rot = spin ? (f * spin) % 360 : 0;
  const id = `sp${Math.round(x)}_${Math.round(y)}_${Math.round(s)}`;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} style={{ position: "absolute",
      left: x - s / 2, top: y - s / 2, zIndex: z, opacity: o,
      transform: `rotate(${rot}deg) scale(${k})`, overflow: "visible" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} /><stop offset="100%" stopColor={b} />
        </linearGradient>
      </defs>
      {/* the four-point spark: each side bows IN toward the centre */}
      <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
        fill={`url(#${id})`} />
    </svg>
  );
};

/* =========================================================================
   THE FOUR SPRITE CONCEPTS, so the choice is made by LOOKING rather than by
   reading a description. All four are the house Mascot; only the identity
   layer differs.
   ====================================================================== */
export type GKind = "spark" | "four" | "halo" | "badge";

export const GoogleSprite: React.FC<{ f: number; x: number; y: number; size: number;
  i?: number; kind?: GKind; z?: number; at?: number; loop?: number; flip?: boolean;
  cheer?: number; shock?: number }> =
  ({ f, x, y, size, i = 0, kind = "spark", z = 60, at = 0, loop, flip = false,
     cheer, shock }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, ch = 0, gaze = 0, nod = 3.6;
  if (L === 0) { dx = Math.sin(f / 17 + ph) * size * 0.30;
                 dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
                 rot = Math.cos(f / 17 + ph) * 3.4; }
  else if (L === 1) { rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
                      dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
                      dx = Math.sin(f / 6.2 + ph) * size * 0.055; }
  else if (L === 2) { const t = (f / 26 + ph) % 1; const j = Math.max(0, Math.sin(t * Math.PI));
                      dy = -j * size * 0.24; ch = j > 0.55 ? 1 : 0;
                      rot = Math.sin(f / 26 + ph) * 2.8; }
  else { gaze = Math.sin(f / 21 + ph) * 1.0; rot = Math.sin(f / 21 + ph) * 4.2; nod = 5.2; }

  const tint = G_TINTS[i % 4];
  /* ⛔⛔⛔ MEASURED OFF A RENDER, AFTER GUESSING IT WRONG TWICE. I first used
     reel 109's WORLD figure (-0.451) as a LOCAL one and every emblem floated a
     body-height above its sprite; I then "corrected" it to 0.549 and every
     emblem landed ON THE EYES — which is precisely the mistake reel 94 made by
     dropping a badge on the face. `tools`-style probe (`src/mascot-probe.tsx`),
     one Mascot at size 400 in a 400 container, ink read off the pixels:

         head top   local y  88 / 400 = 0.220 x size
         eyes start local y 162 / 400 = 0.405 x size
         feet       local y 367 / 400 = 0.917 x size

     ⭐ "Read the pixels, don't trust the algebra" is in the craft doc twice and
     I broke it twice in one component. The numbers are constants now. */
  const HEAD_TOP = 0.220, EYES = 0.405;
  const headTop = size * HEAD_TOP;
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>

      {/* ---- the identity layer, above the head ---- */}
      {kind === "spark" && (
        <Spark x={size / 2} y={headTop - size * 0.21} s={size * 0.34} f={f + i * 11}
          z={4} pulse={1} spin={0.35} />
      )}
      {kind === "four" && [0, 1, 2, 3].map(j => (
        <div key={"fd" + j} style={{ position: "absolute",
          left: size * (0.20 + j * 0.17), top: headTop - size * 0.17,
          width: size * 0.12, height: size * 0.12, borderRadius: "50%", zIndex: 4,
          background: G_PURE[j],
          transform: `translateY(${Math.sin(f / 9 + j * 1.2 + i) * size * 0.05}px)` }} />
      ))}
      {kind === "halo" && (
        <div style={{ position: "absolute", left: size * 0.10, top: headTop - size * 0.19,
          width: size * 0.80, height: size * 0.24, borderRadius: "50%", zIndex: 4,
          border: `${Math.max(4, size * 0.055)}px solid transparent`,
          borderTopColor: G_BLUE, borderRightColor: G_RED,
          borderBottomColor: G_YEL, borderLeftColor: G_GRN,
          transform: `rotate(${(f * 1.6 + i * 40) % 360}deg)` }} />
      )}
      {kind === "badge" && (
        <div style={{ position: "absolute", left: size * 0.32, top: headTop - size * 0.36,
          width: size * 0.36, height: size * 0.36, borderRadius: size * 0.09, zIndex: 4,
          background: "#FFFFFF", border: `${Math.max(3, size * 0.028)}px solid #E6E1D4`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translateY(${Math.sin(f / 14 + i) * size * 0.03}px)` }}>
          <Img src={staticFile("logos/google.svg")}
            style={{ width: size * 0.26, height: size * 0.26, objectFit: "contain" }} />
        </div>
      )}

      {/* ⛔ NO COSTUME LEVERS ON A GOOGLE SPRITE. The twelve costumes are the
          CLAUDE cast's identity (reel 107 was told to use all of them); putting
          a wizard hat and a chef's toque on a Google character makes it read as
          the Claude cast in fancy dress. Here the identity is the TINT and the
          emblem, and nothing else. */}
      <Mascot lf={f + i * 9} size={size} gaze={gaze} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={cheer ?? ch} shock={shock ?? 0} tint={tint} />
    </div>
  );
};

/* =========================================================================
   ⭐⭐ THE TILE — a Google AI tool on the wall.

   Alex: *"the google logo is still at 6 seconds, use the other logos as
   replacement, there should be like 20 other google ai tool logos you can
   use."* There are, and they are real: `labs.google` publishes its roster and
   `gstatic.com/images/branding/productlogos/` publishes four of the marks.

   ⛔ BUT ONLY SEVEN OF THEM HAVE AN ICON. The rest ship as a WORDMARK — that is
   how Google Labs presents them, confirmed by reading the live site — so a tile
   is an ICON where one exists and the tool's real NAME where one does not.
   Inventing an icon for Stitch or Pomelli would be worse than either.
   ⛔ AND NOTHING HERE IS INVENTED: every name below is on labs.google today.
   ====================================================================== */
export type GTool = { name: string; mark?: string; dark?: boolean };

export const G_TOOLS: GTool[] = [
  /* the five the reel is about, first — these are the survivors of the sift */
  { name: "AI STUDIO",    mark: "logos/aistudio.png" },
  { name: "NOTEBOOKLM",   mark: "logos/notebooklm_mark.png" },
  { name: "FLOW",         mark: "logos/googleflow_light.png", dark: true },
  { name: "OPAL",         mark: "logos/opal.png" },
  { name: "ANTIGRAVITY",  mark: "logos/antigravity.png", dark: true },
  /* ⭐ THE REST OF THE ROSTER, AND TWELVE OF THE TWENTY-FOUR NOW CARRY A REAL
     ICON. Alex: *"you need the official logos for those tools, why are they just
     text."* Fair — the first pass gave up after the four on gstatic. A second
     hunt through each tool's OWN page found seven more:
        opal.google/images/favicon.png            a purple pentagon
        gstatic.com/labs-code/stitch/...192       a pill with two dots
        flowmusic.app/icon-512.png                a gradient play mark
        stax.withgoogle.com/favicon.svg           vector
        learnyourway.withgoogle.com/static/...svg vector
        gstatic.com/canvas/mixboard_favicon...    the Google Labs beaker
        gstatic.com/_/bettany/...favicon-48       the beaker, tinted (Pomelli)
     The SVGs were rasterised with headless Chrome (cairosvg has no libcairo
     here) and the small favicons upscaled — they are flat vector-style marks,
     so an upscale holds where a photographic one would not.

     ⛔ AND FIVE GENUINELY HAVE NO PRODUCT ICON. Veo, Imagen and Genie are
     MODELS: every DeepMind model page serves the shared Google DeepMind lockup,
     not a per-model mark. Whisk sits on labs.google/fx and serves Flow's
     favicon. Dreambeans and the three Science tools publish none at all. Those
     keep their real NAME, which is how Google itself presents them — the same
     call Opal forced before its pentagon turned up. */
  { name: "GEMINI",       mark: "logos/gemini.png" },
  { name: "JULES",        mark: "logos/jules.png" },
  { name: "COLAB",        mark: "logos/googlecolab.svg" },
  { name: "STITCH",       mark: "logos/stitch.png", dark: true },
  { name: "FLOW MUSIC",   mark: "logos/flowmusic.png", dark: true },
  { name: "STAX",         mark: "logos/stax.png" },
  { name: "LEARN YOUR WAY", mark: "logos/learnyourway.png" },
  { name: "MIXBOARD",     mark: "logos/labsbeaker.png" },
  { name: "POMELLI",      mark: "logos/pomelli.png" },
  /* no published product mark — the real name is the mark */
  { name: "VEO" },
  { name: "IMAGEN" },
  { name: "WHISK" },
  { name: "GENIE" },
  { name: "VANTAGE" },
  { name: "DREAMBEANS" },
  { name: "LIT. INSIGHTS" },
  { name: "HYPOTHESIS GEN" },
  { name: "COMP. DISCOVERY" },
  { name: "AI EDGE" },
];

/** one tool tile: a real icon where Google publishes one, the real NAME where
    it does not, and the four-colour bar so every tile says GOOGLE. */
export const ToolTile: React.FC<{ x: number; y: number; s: number; f: number; at: number;
  t: GTool; struck?: number; z?: number; seed?: number }> =
  ({ x, y, s, f, at, t, struck, z = 40, seed = 0 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 7, 0, 1, BACK);
  const sq = squash(lf, 5, 0.16, 3, 10);
  const w = 112 * s;
  const isX = struck !== undefined && f >= struck;
  const xt = isX ? Math.min(1, (f - (struck as number)) / 6) : 0;
  /* ⛔ ONE FONT SIZE TRUNCATED TWO NAMES ("COMPUTATION", "DREAMBEA"). Three
     tiers, keyed on the longest WORD as well as the total, because a 10-letter
     word cannot wrap out of trouble. */
  const longest = Math.max(...t.name.split(" ").map(w => w.length));
  const tier = t.name.length > 13 || longest > 9 ? 2 : t.name.length > 8 ? 1 : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - w / 2, width: w, height: w,
      zIndex: z, transform: `scale(${inS * sq})`, borderRadius: 16 * s, overflow: "hidden",
      background: isX ? dkh("#8A8578", 0.34) : t.dark ? "#141518" : "#FFFFFF",
      border: `${4 * s}px solid ${isX ? dkh("#8A8578", 0.46) : t.dark ? "#2A2C32" : "#E6E1D4"}` }}>
      {t.mark ? (
        <Img src={staticFile(t.mark)}
          style={{ position: "absolute", left: "50%", top: "42%",
            width: w * (t.dark ? 0.92 : 0.50), height: w * (t.dark ? 0.92 : 0.50),
            transform: "translate(-50%,-50%)", objectFit: "contain",
            opacity: isX ? 0.16 : 0.95 }} />
      ) : (
        /* ⭐ THE WORDMARK IS THE MARK. Google Labs presents most of these as a
           name, so the tile carries the name — real, and legible at 112px. */
        <div style={{ position: "absolute", left: 0, right: 0, top: "34%",
          transform: "translateY(-50%)", textAlign: "center", padding: `0 ${6 * s}px`,
          ...ui((tier === 2 ? 11.5 : tier === 1 ? 14.5 : 17.5) * s, 900), lineHeight: 1.06,
          color: isX ? hexa(INK, 0.20) : INK, letterSpacing: "-0.01em" }}>
          {t.name}
        </div>
      )}
      {/* the four-colour bar — every tile says GOOGLE without a word */}
      <div style={{ position: "absolute", left: "22%", right: "22%", bottom: 12 * s,
        height: 8 * s, borderRadius: 4 * s, overflow: "hidden", display: "flex",
        opacity: isX ? 0.18 : 1 }}>
        {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
          <div key={"gb" + j} style={{ flex: 1, background: c }} />
        ))}
      </div>
      {/* the X, drawn as two struck bars */}
      {xt > 0 && [-38, 38].map((a, i) => (
        <div key={"xb" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: w * 0.92 * xt, height: 11 * s, borderRadius: 3, background: hexa("#C44A3A", 0.82),
          transform: `translate(-50%,-50%) rotate(${a}deg)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE SPARK CHARACTER — a Google-SHAPED body, not a recoloured Claude.

   Alex: *"i do like the gemini style character here but maybe not so claude
   sprite shaped? idk what do you think"* — and he is right. Tinting the house
   box blue and hanging a spark over it still reads as "Claude, in blue": the
   SILHOUETTE is the identity, and the silhouette had not changed.

   ⛔ This does NOT restyle the Mascot. The clay Claude is untouched and stays
   exactly as it is in every Claude reel — this is a SECOND, separate character
   that exists alongside it, which is the only reading of reel 46's rejection
   that survives contact with a reel about someone else's product.

   ⭐ THE BODY IS THE GEMINI SPARK. Four concave-sided points, eyes in the
   middle of the mass, stub arms off the side points and stub legs under the
   bottom one. It is unmistakably Google at thumbnail size, it shares the house
   language (flat fill, hard shapes, black slit eyes, visible limbs), and its
   outline cannot be confused with a box.
   ====================================================================== */
export const SparkGuy: React.FC<{ f: number; x: number; y: number; size: number;
  i?: number; z?: number; at?: number; loop?: number; flip?: boolean;
  cheer?: number; shock?: number; a?: string; b?: string }> =
  ({ f, x, y, size, i = 0, z = 60, at = 0, loop, flip = false, cheer = 0, shock = 0,
     a = "#4C8DFF", b = "#A48BFF" }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, ch = cheer;
  if (L === 0) { dx = Math.sin(f / 17 + ph) * size * 0.26;
                 dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.05;
                 rot = Math.cos(f / 17 + ph) * 4; }
  else if (L === 1) { rot = 6 + Math.sin(f / 6.2 + ph) * 9;
                      dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05; }
  else if (L === 2) { const t = (f / 26 + ph) % 1; const j = Math.max(0, Math.sin(t * Math.PI));
                      dy = -j * size * 0.22; ch = j > 0.55 ? 1 : ch; rot = Math.sin(f / 26 + ph) * 3; }
  else { rot = Math.sin(f / 21 + ph) * 5; dy = Math.sin(f / 15 + ph) * size * 0.025; }
  /* the four-point spark spins slowly on its own clock — the body IS the mark */
  const spin = Math.sin(f / 34 + ph) * 5;
  const id = `sg${i}_${Math.round(size)}`;
  const eyeY = 52 + (shock ? -3 : 0);
  const eyeH = shock ? 20 : ch ? 7 : 15;
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={a} /><stop offset="100%" stopColor={b} />
          </linearGradient>
        </defs>
        {/* ⛔ THE LIMBS HAD TO GROW TO EXIST. At 5.5 units on a 100 viewBox they
            were ~10px on a 190px sprite — under the 40px floor twice over, so
            the character read as a floating star. Legs 9 wide, arms 15 long and
            pushed clear of the body's side points. */}
        {[38, 55].map((lx, j) => (
          <rect key={"lg" + j} x={lx} y={76} width={9} height={26} rx={4}
            fill={b} transform={`rotate(${Math.sin(f / 8 + j * 2 + ph) * (L === 0 ? 11 : 4)} ${lx + 4.5} 78)`} />
        ))}
        {[[12, -1], [88, 1]].map(([ax, dir], j) => (
          <rect key={"ar" + j} x={(ax as number) - 7} y={45} width={15} height={9} rx={4.5}
            fill={b} transform={`rotate(${(dir as number) * (16 + Math.sin(f / 7 + j * 3 + ph) * 20)} ${ax} 49)`} />
        ))}
        {/* ⭐ THE BODY: the Gemini spark itself */}
        <g transform={`rotate(${spin} 50 50)`}>
          <path d="M 50 2 C 54 30 70 46 98 50 C 70 54 54 70 50 98 C 46 70 30 54 2 50 C 30 46 46 30 50 2 Z"
            fill={`url(#${id})`} />
        </g>
        {/* the underside, so the body has FORM — the house clay sprites all have
            a shaded lower half and a flat star would sit apart from them */}
        <g transform={`rotate(${spin} 50 50)`} clipPath="none">
          <path d="M 50 98 C 46 70 30 54 2 50 C 30 52 62 56 98 50 C 70 54 54 70 50 98 Z"
            fill="#000000" opacity={0.13} />
        </g>
        {/* the face — house language: two black slit eyes, no mouth */}
        <rect x={40} y={eyeY - eyeH / 2} width={6} height={eyeH} rx={2.4} fill="#14121A" />
        <rect x={54} y={eyeY - eyeH / 2} width={6} height={eyeH} rx={2.4} fill="#14121A" />
        {/* a cheek lift when it cheers, so the emotion reads without a mouth */}
        {ch > 0 && [37, 57].map((cx, j) => (
          <circle key={"ck" + j} cx={cx} cy={62} r={3.4} fill="#FFFFFF" opacity={0.34} />
        ))}
      </svg>
    </div>
  );
};
