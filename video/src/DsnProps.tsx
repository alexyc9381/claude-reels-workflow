import React from "react";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, mono, ui,
  SLOP, SLOP2, SLOPD, OWN, LIVE, LIVED, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./DsnWorld";

/* ===========================================================================
   REEL 127 · "DESIGN" — THE PROPS.  Board: storyboards/127-design.md.

   ⛔⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. The house bar is 12-16 drawn
   parts on a hero object (a book that was FOUR divs cost a whole round). Every
   prop below states its part count in its own comment, and the two that carry
   the reel — `StockPress` and `Board` — are the most drawn things in the file.

   ⛔⛔ A CONTAINER IS STILL A CONTAINER WHEN IT IS A NICE BOX. A board is not a
   rectangle with a label on it: it is a FACE with real UI on it, in a frame,
   with a lip, a shadow and hardware. The face is what the scene is about.

   ⛔ MATTE ONLY — no `boxShadow: 0 0 Npx`. Inset shadows are shading, not glow.
   ⛔ EVERY PROP THAT HOLDS SOMETHING MUST READ WHILE EMPTY, and must differ from
   its room in BOTH hue and value. Empty is the promise.
   ========================================================================= */

/* =========================================================================
   1 · THE TWO FACES THE REEL ARGUES ABOUT
   ====================================================================== */

/** ⭐⭐⭐ THE SLOP FACE — the villain's one page, and the single most
    recognisable object in this subject. A viewer who has ever asked an AI for a
    website identifies this in under a second with no narration, which is
    exactly what THE-OPEN law 3 asks for.
    ⛔ It must be drawn as REAL UI at real proportions, never as an abstract
    purple slab — the recognition IS the joke, and a slab carries one bit.
    17 drawn parts: gradient field · vignette · nav bar · 4 nav items · logo dot
    · centred headline block · sub block · one pill button · 3 dead cards · a
    footer rule · the corner watermark. */
export const SlopFace: React.FC<{ w: number; h: number; dim?: number }> =
  ({ w, h, dim = 0 }) => {
  const u = w / 460;                                        // one design unit
  const fade = 1 - dim * 0.55;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      background: `linear-gradient(158deg, ${SLOP2} 0%, ${SLOP} 46%, ${SLOPD} 100%)`,
      opacity: fade }}>
      {/* the obligatory radial bloom every one of these has */}
      <div style={{ position: "absolute", left: -w * 0.2, top: -h * 0.3, width: w * 1.4,
        height: h * 1.1, background: `radial-gradient(46% 46% at 50% 50%, ${hexa("#C8AEFF", 0.5)} 0%, ${hexa("#C8AEFF", 0)} 70%)` }} />
      {/* nav */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 26 * u,
        background: hexa("#FFFFFF", 0.10) }} />
      <div style={{ position: "absolute", left: 14 * u, top: 9 * u, width: 9 * u, height: 9 * u,
        borderRadius: "50%", background: hexa("#FFFFFF", 0.82) }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={"nv" + i} style={{ position: "absolute", left: w - (30 + i * 34) * u,
          top: 11 * u, width: 22 * u, height: 5 * u, borderRadius: 2,
          background: hexa("#FFFFFF", 0.46) }} />
      ))}
      {/* the centred headline — always centred, always two lines */}
      <div style={{ position: "absolute", left: w * 0.18, top: h * 0.30, width: w * 0.64,
        height: 17 * u, borderRadius: 3, background: hexa("#FFFFFF", 0.90) }} />
      <div style={{ position: "absolute", left: w * 0.27, top: h * 0.30 + 24 * u, width: w * 0.46,
        height: 17 * u, borderRadius: 3, background: hexa("#FFFFFF", 0.90) }} />
      <div style={{ position: "absolute", left: w * 0.30, top: h * 0.30 + 52 * u, width: w * 0.40,
        height: 7 * u, borderRadius: 3, background: hexa("#FFFFFF", 0.42) }} />
      {/* the one button */}
      <div style={{ position: "absolute", left: w * 0.5 - 46 * u, top: h * 0.30 + 70 * u,
        width: 92 * u, height: 24 * u, borderRadius: 12 * u,
        background: hexa("#FFFFFF", 0.94) }} />
      {/* three dead feature cards */}
      {[0, 1, 2].map((i) => (
        <div key={"cd" + i} style={{ position: "absolute", left: w * 0.09 + i * w * 0.30,
          top: h * 0.70, width: w * 0.24, height: h * 0.19, borderRadius: 6 * u,
          background: hexa("#FFFFFF", 0.13), border: `${1.4 * u}px solid ${hexa("#FFFFFF", 0.20)}` }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: h - 5 * u, width: w, height: 2 * u,
        background: hexa("#FFFFFF", 0.16) }} />
    </div>
  );
};

/** ⭐⭐⭐ THE REAL CAPTURES. Alex: *"try to use real images whenever possible and
    more than just basic graphics... the screens themselves are really relatively
    boring still."* He is right and it is also the biggest single motion lever in
    this repo: real UI took reel 107's median 6.36 -> 8.00 and reel 111's
    10.90 -> 12.51, because dense high-detail content changing every frame
    satisfies the audit and the PROOF requirement at the same time.

    Captured by `tools/dsn_capture.mjs` (headless Chrome out of the playwright
    cache) and measured before use — the blank-capture failure mode reads
    edge-detail 0-516 and one of the five came back at 5.9 luma and was dropped.

    ⛔⛔ CLAUDE'S OWN SURFACES ONLY, AND A CROP IS NOT A SAFE SUBSTITUTE FOR A SAFE
    SOURCE. The first pass captured three third-party product pages and cut
    "component regions" out of them to avoid the branded-hero problem
    `capture_sites.mjs` warns about — and two of the four crops STILL carried an
    identifiable mark: a customer logo row on one, a wordmark inside an activity
    feed on the other, on boards this reel puts under *"your existing design
    system"*. Every shot below is Claude Code's own documentation. Real pixels,
    real density, on-subject, nobody implicated, and the first one is the release
    note for the feature the reel is about — which makes it the receipt as well as
    the texture. */
export const SHOTS = [
  "refs/d127/board_docs.png",   // the /design release note itself
  "refs/d127/board_grid.png",   // the artifacts docs, with a real device mockup
  "refs/d127/board_flow.png",   // a skills page: code blocks and prose
  "refs/d127/board_wire.png",   // an MCP page: tables and reference blocks
] as const;
/** the real Claude Code composer, with the real `/design` command in it */
export const COMPOSER = "refs/d127/composer.png";

/** ⭐⭐ AN ARTBOARD FACE — a real screen, and each `scheme` is a genuinely
    different design rather than a recolour, because "a few options" means three
    DIFFERENT directions, not one page in three hues (the release note's own
    example is a dark technical one, an editorial one and a chart-led one).
    ⛔ Built from `OWN` — your paint — so S8's board is visibly made of the same
    pigments the bench mixed at S7. That continuity is the whole argument.
    16-21 drawn parts depending on scheme. */
export const ArtFace: React.FC<{ w: number; h: number; scheme?: 0 | 1 | 2;
  fill?: number; live?: number;
  /** ⭐ a real capture instead of drawn UI. `fill` becomes a RENDER WIPE — the
      page arrives top-down the way a page actually paints, so the arrival beat
      is preserved and the content underneath is real pixels. */
  shot?: string }> =
  ({ w, h, scheme = 0, fill = 1, live = 1, shot }) => {
  const u = w / 460;
  if (shot) {
    const k = Math.max(0, Math.min(1, fill));
    /* ⛔⛔⛔ THE UNREVEALED PART OF A WIPE MUST BE THE RULED CANVAS, NOT BLACK.
       This is the third time this defect has been fixed on this reel — in the
       hook, then in S4, and here in the payoff scene, where a contact sheet
       caught the board 17% revealed and therefore 83% black at 22s. Fixing it at
       the two call sites was fixing the INSTANCE; the pattern is that a partial
       wipe over near-black is a black rectangle for most of its life. The ground
       under every wipe is now the drafting surface the board would actually be.
       [[feedback_one_prop_five_scenes]]. */
    const bg = `linear-gradient(172deg, #3D444E 0%, #262C34 100%)`;
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden",
        background: bg, opacity: 0.34 + live * 0.66 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"wv" + i} style={{ position: "absolute", left: w * (i + 1) / 9, top: 0,
            width: 1.5, height: h, background: hexa("#FFFFFF", 0.10) }} />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"wh" + i} style={{ position: "absolute", left: 0, top: h * (i + 1) / 5,
            width: w, height: 1.5, background: hexa("#FFFFFF", 0.10) }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h * k,
          overflow: "hidden" }}>
          <Img src={staticFile(shot)} style={{ position: "absolute", left: 0, top: 0,
            width: w, height: h, objectFit: "cover", objectPosition: "top center" }} />
        </div>
        {/* the paint line, so the wipe reads as rendering rather than a mask */}
        {k > 0.02 && k < 0.995 && (
          <div style={{ position: "absolute", left: 0, top: h * k - 2 * u, width: w,
            height: 4 * u, background: hexa(LIVE, 0.85) }} />
        )}
        {/* the chrome sits OVER the capture, so the board still reads as a board */}
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 24 * u,
          background: "#0D1118" }} />
        {[0, 1, 2].map((i) => (
          <div key={"tl" + i} style={{ position: "absolute", left: (10 + i * 11) * u, top: 9 * u,
            width: 6 * u, height: 6 * u, borderRadius: "50%",
            background: ["#D9705C", "#DDB05A", "#6FA98A"][i], opacity: 0.9 }} />
        ))}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(104deg, ${hexa("#FFFFFF", 0.10)} 0%, ${hexa("#FFFFFF", 0)} 44%, ${hexa("#05070C", 0.24)} 100%)` }} />
      </div>
    );
  }
  const dark = scheme === 0;
  const bg = dark ? "#141922" : scheme === 1 ? "#FBF8F1" : "#F2F5F7";
  const fg = dark ? "#E8EDF4" : "#1A1813";
  const acc = OWN[scheme === 0 ? 3 : scheme === 1 ? 0 : 2];
  const K = (i: number) => E(fill, i * 0.10, i * 0.10 + 0.34, 0, 1, OUT);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: bg,
      opacity: 0.34 + live * 0.66 }}>
      {/* chrome: a real top bar with a control cluster */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 24 * u,
        background: dark ? "#0D1118" : "#E9E4D8" }} />
      {[0, 1, 2].map((i) => (
        <div key={"tl" + i} style={{ position: "absolute", left: (10 + i * 11) * u, top: 9 * u,
          width: 6 * u, height: 6 * u, borderRadius: "50%",
          background: [ "#D9705C", "#DDB05A", "#6FA98A" ][i], opacity: 0.9 }} />
      ))}

      {scheme === 0 && (<>
        {/* DARK + TECHNICAL: a rail, a chart, a dense row list */}
        <div style={{ position: "absolute", left: 0, top: 24 * u, width: 62 * u, height: h - 24 * u,
          background: "#0D1118", transform: `scaleX(${K(0)})`, transformOrigin: "0% 50%" }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: 12 * u, top: (40 + i * 20) * u,
            width: 38 * u, height: 5 * u, borderRadius: 2, opacity: K(0) * (i === 1 ? 1 : 0.42),
            background: i === 1 ? acc : fg }} />
        ))}
        <div style={{ position: "absolute", left: 76 * u, top: 38 * u, width: w - 96 * u,
          height: 12 * u, borderRadius: 3, background: fg, opacity: K(1) * 0.92 }} />
        {/* the chart — real bars at real heights, not a picture of a chart */}
        {[0.42, 0.68, 0.30, 0.86, 0.54, 0.74, 0.38].map((v, i) => (
          <div key={"br" + i} style={{ position: "absolute", left: (80 + i * 24) * u,
            top: h * 0.66 - h * 0.34 * v * K(2), width: 15 * u, height: h * 0.34 * v * K(2),
            background: i === 3 ? acc : hexa(fg, 0.30), borderRadius: 2 }} />
        ))}
        <div style={{ position: "absolute", left: 76 * u, top: h * 0.70, width: w - 96 * u,
          height: 1.6 * u, background: hexa(fg, 0.24), opacity: K(2) }} />
        {[0, 1, 2].map((i) => (
          <div key={"lr" + i} style={{ position: "absolute", left: 76 * u, top: h * 0.76 + i * 15 * u,
            width: (w - 110 * u) * (1 - i * 0.16), height: 6 * u, borderRadius: 2,
            background: hexa(fg, 0.34), opacity: K(3) }} />
        ))}
      </>)}

      {scheme === 1 && (<>
        {/* EDITORIAL: a big serif measure, a rule, a two-column body */}
        <div style={{ position: "absolute", left: 30 * u, top: 44 * u, width: (w - 60 * u) * K(0),
          height: 22 * u, borderRadius: 2, background: fg }} />
        <div style={{ position: "absolute", left: 30 * u, top: 72 * u, width: (w - 150 * u) * K(0),
          height: 22 * u, borderRadius: 2, background: fg }} />
        <div style={{ position: "absolute", left: 30 * u, top: 106 * u, width: 74 * u,
          height: 3 * u, background: acc, opacity: K(1) }} />
        {[0, 1].map((c) => (
          <React.Fragment key={"col" + c}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={"tx" + c + i} style={{ position: "absolute", left: (30 + c * 208) * u,
                top: (124 + i * 13) * u, width: (186 - (i === 5 ? 60 : 0)) * u, height: 5 * u,
                borderRadius: 2, background: hexa(fg, 0.42), opacity: K(2) }} />
            ))}
          </React.Fragment>
        ))}
        <div style={{ position: "absolute", left: 30 * u, top: h * 0.74, width: w - 60 * u,
          height: h * 0.18 * K(3), background: hexa(acc, 0.24),
          border: `${1.6 * u}px solid ${hexa(acc, 0.62)}` }} />
      </>)}

      {scheme === 2 && (<>
        {/* CARD-LED: a header, a stat row, a six-up grid */}
        <div style={{ position: "absolute", left: 0, top: 24 * u, width: w, height: 30 * u,
          background: "#E4EAEE", opacity: K(0) }} />
        <div style={{ position: "absolute", left: 16 * u, top: 34 * u, width: 96 * u * K(0),
          height: 10 * u, borderRadius: 2, background: fg }} />
        {[0, 1, 2].map((i) => (
          <div key={"st" + i} style={{ position: "absolute", left: (16 + i * 148) * u, top: 66 * u,
            width: 132 * u, height: 44 * u, borderRadius: 5 * u, background: "#FFFFFF",
            border: `${1.4 * u}px solid #DCE3E7`, opacity: K(1) }}>
            <div style={{ position: "absolute", left: 10 * u, top: 10 * u, width: 40 * u,
              height: 12 * u, borderRadius: 2, background: i === 1 ? acc : hexa(fg, 0.72) }} />
            <div style={{ position: "absolute", left: 10 * u, top: 27 * u, width: 66 * u,
              height: 5 * u, borderRadius: 2, background: hexa(fg, 0.28) }} />
          </div>
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={"gc" + i} style={{ position: "absolute", left: (16 + (i % 3) * 148) * u,
            top: (124 + Math.floor(i / 3) * 58) * u, width: 132 * u, height: 48 * u,
            borderRadius: 5 * u, background: "#FFFFFF", border: `${1.4 * u}px solid #DCE3E7`,
            opacity: K(2 + Math.floor(i / 3)) }}>
            <div style={{ position: "absolute", left: 10 * u, top: 10 * u, width: 16 * u,
              height: 16 * u, borderRadius: 4 * u, background: hexa(acc, 0.75) }} />
            <div style={{ position: "absolute", left: 32 * u, top: 13 * u, width: 62 * u,
              height: 6 * u, borderRadius: 2, background: hexa(fg, 0.52) }} />
            <div style={{ position: "absolute", left: 10 * u, top: 32 * u, width: 106 * u,
              height: 4 * u, borderRadius: 2, background: hexa(fg, 0.22) }} />
          </div>
        ))}
      </>)}
    </div>
  );
};

/* =========================================================================
   2 · THE HERO ARTIFACT — THE BOARD
   ====================================================================== */

/** ⭐⭐⭐ THE BOARD. The reel's hero artifact: dropped in the hook, live at S4,
    re-cut at S8, adjusted by hand at S9, carried out at S10. It CHANGES STATE
    every time it returns, which is the difference between a recurring hero and
    reel 120's grey slab in six rooms.
    `state`: 0 blank · 1 live (faces on it) · 2 slop (the press's page).
    ⛔ IT IS A PHYSICAL BOARD, not a screen: a milled frame, a chamfered lip,
    corner hardware, a hanging eye, a cast shadow and a real thickness. That
    thickness is also what stops it tripping `feedback_a_lit_rectangle_is_a_screen`.
    18 drawn parts + whatever the face adds. */
export const Board: React.FC<{
  x: number; y: number; w: number; h: number; z?: number; rot?: number;
  state?: 0 | 1 | 2; scheme?: 0 | 1 | 2; fill?: number; live?: number;
  faces?: number; edge?: string; shade?: number; eye?: boolean;
  /** ⭐⭐ PER-FACE POP AND PER-FACE FILL. The first build drove all three faces
      off ONE `fill` ramp spread over the whole scene, so the payoff beat — three
      options arriving one-two-three — rendered as three grey panels slowly
      going less grey. A payoff is N DISCRETE ARRIVALS (§1: N pops beat one long
      tween 4.27 -> 5.63) and each one has to be able to land on its own word. */
  faceK?: number[]; faceF?: number[];
  /** real captures, one per face (or one for a single-face board) */
  shots?: readonly string[]; shot?: string;
  /** what `/design` OUTPUTS is drawn, not captured */
  design?: 0 | 1 | 2;
}> = ({ x, y, w, h, z = 40, rot = 0, state = 0, scheme = 0, fill = 1, live = 1,
        faces = 0, edge = "#2A2F38", shade = 0, eye = false, faceK, faceF,
        shots, shot, design }) => {
  const T = Math.max(6, w * 0.016);                          // real thickness
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {/* the board's own edge, drawn UNDER and offset so it has depth */}
      <div style={{ position: "absolute", left: -T, top: T * 0.7, width: w + T * 2, height: h,
        background: dkh(edge, 0.52), borderRadius: 3 }} />
      {/* the milled frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 3,
        background: `linear-gradient(168deg, ${mxh(edge, 0.22)} 0%, ${dkh(edge, 0.30)} 100%)` }} />
      {/* the chamfer catching the key light along the top and left */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: T * 0.8,
        background: hexa("#FFFFFF", 0.16) }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: T * 0.8, height: h,
        background: hexa("#FFFFFF", 0.09) }} />
      {/* the recessed face well — reads as a well even when EMPTY */}
      <div style={{ position: "absolute", left: T * 2, top: T * 2, width: w - T * 4,
        height: h - T * 4, overflow: "hidden", borderRadius: 2,
        background: state === 0
          ? `linear-gradient(172deg, ${mxh(edge, 0.62)} 0%, ${mxh(edge, 0.34)} 100%)`
          : "#0A0D12",
        boxShadow: `inset 0 ${T}px ${T * 2}px ${hexa("#000", 0.44)}` }}>
        {/* ⭐ AN EMPTY CANVAS IS RULED. A blank board is the largest object in the
            hook's frame 0 and it was a dark rectangle; a drafting surface has a
            grid on it, which reads as "ready to be drawn on" rather than "off",
            and adds real edge detail where there was none. */}
        {state === 0 && (<>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"gv" + i} style={{ position: "absolute", left: (w - T * 4) * (i + 1) / 10,
              top: 0, width: 1.5, height: h - T * 4, background: hexa("#FFFFFF", 0.11) }} />
          ))}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={"gh" + i} style={{ position: "absolute", left: 0,
              top: (h - T * 4) * (i + 1) / 6, width: w - T * 4, height: 1.5,
              background: hexa("#FFFFFF", 0.11) }} />
          ))}
          <div style={{ position: "absolute", left: "6%", top: "8%", width: "88%",
            height: "84%", border: `2px dashed ${hexa("#FFFFFF", 0.22)}` }} />
        </>)}
        {state === 2 && <SlopFace w={w - T * 4} h={h - T * 4} />}
        {state === 1 && (
          faces > 1
            ? Array.from({ length: faces }, (_, i) => {
                const fw = (w - T * 4 - T * (faces + 1)) / faces;
                const k = faceK ? Math.max(0, Math.min(1, faceK[i] ?? 0)) : 1;
                const kf = faceF ? Math.max(0, Math.min(1, faceF[i] ?? 0))
                                 : E(fill, i * 0.13, i * 0.13 + 0.5, 0, 1, OUT);
                if (k <= 0.001) return null;
                return (
                  <div key={"fc" + i} style={{ position: "absolute", left: T + i * (fw + T),
                    top: T, width: fw, height: h - T * 6, overflow: "hidden", borderRadius: 2,
                    background: "#0A0D12", transform: `scale(${k})`,
                    transformOrigin: "50% 100%" }}>
                    <ArtFace w={fw} h={h - T * 6} scheme={(i % 3) as 0 | 1 | 2}
                      fill={kf} live={live} shot={shots ? shots[i % shots.length] : undefined} />
                  </div>
                );
              })
            : design !== undefined
              ? <DesignFace w={w - T * 4} h={h - T * 4} scheme={design} fill={fill} live={live} />
              : <ArtFace w={w - T * 4} h={h - T * 4} scheme={scheme} fill={fill} live={live} shot={shot} />
        )}
        {/* the raking sheen across the face — a light, not a gloss */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(104deg, ${hexa("#FFFFFF", 0.13)} 0%, ${hexa("#FFFFFF", 0)} 42%, ${hexa("#000", 0.22)} 100%)` }} />
      </div>
      {/* corner hardware — four milled plates with a bolt each */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], i) => (
        <div key={"hw" + i} style={{ position: "absolute",
          left: cx ? w - T * 3.4 : T * 0.6, top: cy ? h - T * 3.4 : T * 0.6,
          width: T * 2.8, height: T * 2.8, borderRadius: 2,
          background: `linear-gradient(150deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.42)} 100%)` }}>
          <div style={{ position: "absolute", left: "34%", top: "34%", width: "32%", height: "32%",
            borderRadius: "50%", background: dkh(BRASS, 0.66) }} />
        </div>
      ))}
      {eye && (<>
        <div style={{ position: "absolute", left: w / 2 - T * 1.4, top: -T * 2.6, width: T * 2.8,
          height: T * 2.8, borderRadius: "50%", border: `${T * 0.7}px solid ${dkh(STEEL, 0.30)}` }} />
      </>)}
      {shade > 0 && (
        <div style={{ position: "absolute", inset: 0, background: hexa("#05070C", shade) }} />
      )}
    </div>
  );
};

/** ⭐⭐⭐ AN ARTBOARD, AS A SEPARATE OBJECT ON THE CANVAS.
    Alex: *"the real images inside of three seconds are not good because they're
    cropped, I can't really see what's going on. It might be better to restructure
    the layout."* Both halves of that are one defect. Three equal columns inside
    one board gave each capture a ~200px-wide well, and a `cover` fit into a
    200-wide well from an 851-wide page shows a random quarter of it — a slice,
    not a screen.

    ⭐ THE FIX IS THE LAYOUT, AND IT IS ALSO MORE FAITHFUL. A real pan/zoom canvas
    does not hold equal columns; it holds artboards at DIFFERENT SIZES laid out
    freely. Two small ones above and one large one below reads as a canvas, and
    the large one is 430px wide, which is a 2x downscale of the capture rather
    than a 4x crop of it — you can see what the page IS.

    Drawn as a real object: a frame, a title tab the way an artboard carries its
    name, a shadow onto the canvas, and a selection outline. 9 parts + the shot. */
export const Artboard: React.FC<{
  x: number; y: number; w: number; h: number; z?: number; shot?: string;
  /** ⭐ what `/design` OUTPUTS is drawn, not captured — see `DesignFace`. */
  design?: 0 | 1 | 2;
  k?: number; fill?: number; label?: string; rot?: number; c?: string;
}> = ({ x, y, w, h, z = 60, shot, design, k = 1, fill = 1, label, rot = 0, c = LIVE }) => {
  if (k <= 0.01) return null;
  const u = w / 430;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `scale(${k}) rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
      {/* the drop onto the canvas surface */}
      <div style={{ position: "absolute", left: 5 * u, top: 8 * u, width: w, height: h,
        background: hexa("#05070C", 0.42), borderRadius: 3 }} />
      {/* the name tab — an artboard is labelled, and it is where the eye starts */}
      {label && (
        <div style={{ position: "absolute", left: 0, top: -17 * u, height: 17 * u,
          padding: `0 ${7 * u}px`, borderRadius: `${3 * u}px ${3 * u}px 0 0`,
          background: hexa(c, 0.86), display: "flex", alignItems: "center" }}>
          <span style={{ ...mono(11 * u, 800), color: "#08131A", letterSpacing: 0.6 }}>{label}</span>
        </div>
      )}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 2,
        border: `${3 * u}px solid ${dkh("#2A3038", 0.10)}`, background: "#0C1016" }}>
        {design !== undefined
          ? <DesignFace w={w} h={h} scheme={design} fill={fill} live={1} />
          : <ArtFace w={w} h={h} shot={shot} fill={fill} live={1} />}
      </div>
      {/* the selection outline, faint, so it reads as an editable object */}
      <div style={{ position: "absolute", inset: -3 * u, border: `${2 * u}px solid ${hexa(c, 0.30)}` }} />
    </div>
  );
};

/** ⭐⭐⭐ WHAT `/design` PRODUCES, DRAWN AS AN ACTUAL DESIGN.
    Alex: *"the sample images at the hook when the screen drops are very
    underwhelming and boring, like not good."* Correct. The artboards were real
    captures of Claude Code's DOCUMENTATION — walls of grey body text — in a reel
    whose whole subject is Claude designing a UI. The samples looked like docs.

    ⛔ AND "USE REAL IMAGES" DOES NOT SOLVE THIS ONE. A real capture is right for a
    real thing — the composer, your repo, your docs — and those stay real. But
    what `/design` OUTPUTS does not exist yet as a capture, and every third-party
    page good enough to stand in for it carries a mark
    ([[feedback_a_crop_is_not_a_safe_source]]). So the artboards are DRAWN, and
    drawn to a standard: real hierarchy, a committed accent, generous spacing, an
    image area, and one number big enough to read.

    Three genuinely different directions, the way `/design` actually answers a
    brief — not one layout in three colourways.
      0 DARK ANALYTICS — rail, KPI row, an area chart with a gradient fill, a table
      1 LIGHT COMMERCE — a hero image block, a price, a buy button, thumbnails
      2 MOBILE APP     — a phone, a warm header, an avatar, cards, a tab bar
    28-34 drawn parts each. */
export const DesignFace: React.FC<{ w: number; h: number; scheme?: 0 | 1 | 2;
  fill?: number; live?: number }> = ({ w, h, scheme = 0, fill = 1, live = 1 }) => {
  const u = w / 430;
  const K = (i: number) => E(fill, i * 0.13, i * 0.13 + 0.34, 0, 1, OUT);
  const R = (n: number) => n * u;
  if (scheme === 0) {
    const BARS = [0.38, 0.62, 0.44, 0.78, 0.56, 0.88, 0.70, 0.94];
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0E1219",
        opacity: 0.4 + live * 0.6 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: R(74), height: h,
          background: "#080B10", transform: `scaleX(${K(0)})`, transformOrigin: "0% 50%" }} />
        <div style={{ position: "absolute", left: R(14), top: R(14), width: R(20), height: R(20),
          borderRadius: R(6), background: OWN[0], opacity: K(0) }} />
        {[0,1,2,3,4].map((i)=>(
          <div key={"nv"+i} style={{ position:"absolute", left:R(14), top:R(48+i*22),
            width:R(46), height:R(7), borderRadius:R(3), opacity:K(0)*(i===1?1:0.34),
            background: i===1?OWN[3]:"#8FA3B4" }} />))}
        <div style={{ position:"absolute", left:R(94), top:R(18), width:R(150), height:R(13),
          borderRadius:R(3), background:"#E8EFF5", opacity:K(1) }} />
        {[0,1,2].map((i)=>(
          <div key={"kp"+i} style={{ position:"absolute", left:R(94+i*112), top:R(46),
            width:R(100), height:R(58), borderRadius:R(8), opacity:K(1),
            background:"#161C25", border:`${R(1.4)}px solid #232C38` }}>
            <div style={{ position:"absolute", left:R(10), top:R(9), width:R(34), height:R(6),
              borderRadius:R(3), background:hexa("#8FA3B4",0.6) }} />
            <div style={{ position:"absolute", left:R(10), top:R(22), width:R(52), height:R(17),
              borderRadius:R(3), background: i===1?OWN[2]:"#E8EFF5" }} />
          </div>))}
        <div style={{ position:"absolute", left:R(94), top:R(118), width:R(324), height:R(96),
          borderRadius:R(8), background:"#131922", border:`${R(1.4)}px solid #232C38`,
          opacity:K(2), overflow:"hidden" }}>
          <div style={{ position:"absolute", left:0, bottom:0, width:"100%", height:"78%",
            background:`linear-gradient(180deg, ${hexa(OWN[3],0.34)} 0%, ${hexa(OWN[3],0)} 100%)`,
            clipPath:"polygon(0% 78%,12% 56%,25% 68%,38% 34%,50% 50%,63% 22%,76% 38%,88% 12%,100% 24%,100% 100%,0% 100%)" }} />
          <div style={{ position:"absolute", left:0, top:0, width:"100%", height:"100%",
            borderBottom:`${R(2.4)}px solid ${OWN[3]}`,
            clipPath:"polygon(0% 78%,12% 56%,25% 68%,38% 34%,50% 50%,63% 22%,76% 38%,88% 12%,100% 24%,100% 26%,88% 14%,76% 40%,63% 24%,50% 52%,38% 36%,25% 70%,12% 58%,0% 80%)",
            background:OWN[3] }} />
        </div>
        {BARS.map((v,i)=>(
          <div key={"tb"+i} style={{ position:"absolute", left:R(94+i*41), top:R(228+ (1-v)*38),
            width:R(30), height:R(v*38), borderRadius:R(2), opacity:K(3),
            background: i===7?OWN[1]:hexa("#8FA3B4",0.30) }} />))}
      </div>
    );
  }
  if (scheme === 1) {
    return (
      <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#FBF8F3",
        opacity:0.4+live*0.6 }}>
        <div style={{ position:"absolute", left:0, top:0, width:w, height:R(26),
          background:"#FFFFFF", borderBottom:`${R(1.2)}px solid #EDE6DA`, opacity:K(0) }} />
        <div style={{ position:"absolute", left:R(14), top:R(9), width:R(52), height:R(9),
          borderRadius:R(2), background:"#241E16", opacity:K(0) }} />
        {[0,1,2].map((i)=>(
          <div key={"nb"+i} style={{ position:"absolute", left:w-R(30+i*38), top:R(11),
            width:R(26), height:R(6), borderRadius:R(3), background:hexa("#241E16",0.34), opacity:K(0) }} />))}
        {/* the hero image block — a real photographic field, which is what a
            designed page has and a docs page never does */}
        <div style={{ position:"absolute", left:R(16), top:R(42), width:R(214), height:R(160),
          borderRadius:R(10), opacity:K(1), overflow:"hidden",
          background:`linear-gradient(148deg, ${OWN[1]} 0%, ${OWN[0]} 54%, #8E3F2A 100%)` }}>
          <div style={{ position:"absolute", left:"18%", top:"22%", width:"64%", height:"56%",
            borderRadius:"50%", background:hexa("#FFFFFF",0.16) }} />
          <div style={{ position:"absolute", left:"34%", top:"40%", width:"32%", height:"30%",
            borderRadius:"50%", background:hexa("#FFF6E6",0.34) }} />
        </div>
        {[0,1,2].map((i)=>(
          <div key={"th"+i} style={{ position:"absolute", left:R(16+i*72), top:R(212),
            width:R(64), height:R(46), borderRadius:R(6), opacity:K(2),
            background:`linear-gradient(148deg, ${hexa(OWN[i%3],0.75)} 0%, ${hexa(OWN[(i+1)%3],0.5)} 100%)` }} />))}
        <div style={{ position:"absolute", left:R(248), top:R(48), width:R(146), height:R(15),
          borderRadius:R(3), background:"#241E16", opacity:K(1) }} />
        <div style={{ position:"absolute", left:R(248), top:R(70), width:R(104), height:R(15),
          borderRadius:R(3), background:"#241E16", opacity:K(1) }} />
        {[0,1,2].map((i)=>(
          <div key={"bd"+i} style={{ position:"absolute", left:R(248), top:R(98+i*13),
            width:R(150-i*24), height:R(6), borderRadius:R(3),
            background:hexa("#241E16",0.28), opacity:K(2) }} />))}
        <div style={{ position:"absolute", left:R(248), top:R(146), width:R(74), height:R(26),
          borderRadius:R(3), background:OWN[0], opacity:K(3) }} />
        <div style={{ position:"absolute", left:R(248), top:R(182), width:R(158), height:R(38),
          borderRadius:R(19), background:"#241E16", opacity:K(3) }} />
      </div>
    );
  }
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", background:"#EEF1F4",
      opacity:0.4+live*0.6 }}>
      <div style={{ position:"absolute", left:w/2-R(96), top:R(16), width:R(192), height:h-R(30),
        borderRadius:R(20), background:"#FFFFFF", opacity:K(0),
        border:`${R(3)}px solid #D8DEE5`, overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, top:0, width:"100%", height:R(74),
          background:`linear-gradient(158deg, ${OWN[2]} 0%, ${OWN[3]} 100%)` }} />
        <div style={{ position:"absolute", left:R(14), top:R(20), width:R(30), height:R(30),
          borderRadius:"50%", background:hexa("#FFFFFF",0.9) }} />
        <div style={{ position:"absolute", left:R(52), top:R(24), width:R(74), height:R(9),
          borderRadius:R(3), background:hexa("#FFFFFF",0.92) }} />
        <div style={{ position:"absolute", left:R(52), top:R(38), width:R(48), height:R(6),
          borderRadius:R(3), background:hexa("#FFFFFF",0.55) }} />
        {[0,1,2].map((i)=>(
          <div key={"cd"+i} style={{ position:"absolute", left:R(12), top:R(86+i*44),
            width:R(164), height:R(36), borderRadius:R(9), background:"#F5F7F9",
            opacity:K(1+i), border:`${R(1.2)}px solid #E4E9EE` }}>
            <div style={{ position:"absolute", left:R(9), top:R(9), width:R(18), height:R(18),
              borderRadius:R(5), background:hexa(OWN[i%3],0.8) }} />
            <div style={{ position:"absolute", left:R(34), top:R(11), width:R(72), height:R(6),
              borderRadius:R(3), background:hexa("#241E16",0.5) }} />
            <div style={{ position:"absolute", left:R(34), top:R(22), width:R(46), height:R(5),
              borderRadius:R(3), background:hexa("#241E16",0.22) }} />
          </div>))}
        <div style={{ position:"absolute", left:0, bottom:0, width:"100%", height:R(34),
          background:"#FFFFFF", borderTop:`${R(1.2)}px solid #E4E9EE`, opacity:K(3) }} />
        {[0,1,2,3].map((i)=>(
          <div key={"tb"+i} style={{ position:"absolute", left:R(18+i*44), bottom:R(11),
            width:R(14), height:R(14), borderRadius:R(4), opacity:K(3),
            background: i===0?OWN[2]:hexa("#241E16",0.20) }} />))}
      </div>
    </div>
  );
};

/** ⭐⭐⭐ THE CANVAS ITSELF. Alex: *"the visual canvas section needs to be way
    more interesting, like make it an actual canvas."* He is right and the frame
    strip is unarguable: the scene was a grey ruled BOARD hanging on a wall in a
    teal room. Nothing in it said pan/zoom canvas — no grid that moves, no
    artboard labels, no toolbar, no zoom read-out, no cursor, no selection.

    ⛔ AND "OBJECT SCENES NOT UI" DOES NOT FORBID THIS. That standing note is
    about the HOOK (reels 85/86/68), where a screenshot replaced a staged idea.
    Here the canvas IS the subject of the sentence, and the way it stays a SCENE
    rather than a screenshot is that the hero stands ON it: the canvas is the
    GROUND, the artboards stand up out of it, and the camera moves over it. A
    place with a character in it that happens to be made of real UI.

    The five things that make a canvas read as a canvas, all of them moving:
      · a DOT GRID that translates and scales with the view
      · ARTBOARDS as lit panels with a name tab each
      · a floating TOOLBAR
      · a ZOOM read-out whose number actually changes
      · a CURSOR, and a selection on one board */
export const CanvasGround: React.FC<{
  x: number; y: number; z?: number; zoom: number; f: number; c?: string;
}> = ({ x, y, z = 12, zoom, f, c = LIVE }) => {
  const step = 46 * zoom;
  const ox = ((-x * 0.5) % step + step) % step;
  const oy = ((-y * 0.5) % step + step) % step;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, overflow: "hidden",
      background: "linear-gradient(178deg, #101820 0%, #0A0F15 100%)" }}>
      {/* the dot grid — the single strongest signal that a surface is a canvas,
          and it has to MOVE with the view or the pan is invisible */}
      {Array.from({ length: Math.ceil(H / step) + 2 }, (_, r) =>
        Array.from({ length: Math.ceil(W / step) + 2 }, (_, k) => (
          <div key={`d${r}-${k}`} style={{ position: "absolute",
            left: ox + k * step - step, top: oy + r * step - step,
            width: Math.max(2, 2.6 * zoom), height: Math.max(2, 2.6 * zoom),
            borderRadius: "50%", background: hexa("#7FA0B4", 0.34) }} />
        )))}
      {/* the heavier ruled lines every fifth dot, so the zoom is legible */}
      {Array.from({ length: Math.ceil(W / (step * 5)) + 2 }, (_, k) => (
        <div key={"vl" + k} style={{ position: "absolute", left: ox + k * step * 5 - step,
          top: 0, width: 1, height: H, background: hexa("#7FA0B4", 0.10) }} />
      ))}
      {Array.from({ length: Math.ceil(H / (step * 5)) + 2 }, (_, r) => (
        <div key={"hl" + r} style={{ position: "absolute", left: 0,
          top: oy + r * step * 5 - step, width: W, height: 1,
          background: hexa("#7FA0B4", 0.10) }} />
      ))}
    </div>
  );
};

/** the canvas chrome: a toolbar, a zoom read-out, a share pill. Real canvases
    have all three and none of them is decoration — the zoom NUMBER is what makes
    a zoom legible as a zoom. */
export const CanvasChrome: React.FC<{ zoom: number; f: number; k?: number; c?: string }> =
  ({ zoom, f, k = 1, c = LIVE }) => (
  <>
    <div style={{ position: "absolute", left: W / 2 - 168, top: H - 92, width: 336, height: 56,
      zIndex: 88, borderRadius: 28, opacity: k, display: "flex", alignItems: "center",
      justifyContent: "space-around", padding: "0 14px",
      background: "linear-gradient(178deg, #1E252E 0%, #12171D 100%)",
      border: `2px solid ${hexa("#8CA6B8", 0.24)}` }}>
      {["cursor", "frame", "text", "pen", "comment"].map((t, i) => (
        <div key={t} style={{ width: 34, height: 34, borderRadius: 9,
          background: i === 0 ? hexa(c, 0.30) : hexa("#8CA6B8", 0.10),
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i === 0 && (
            <svg viewBox="0 0 100 100" width={17} height={17}>
              <path d="M12 6 L12 76 L30 58 L42 88 L56 82 L44 54 L70 52 Z"
                fill="#E6EFF5" /></svg>)}
          {i === 1 && <div style={{ width: 15, height: 15, border: "2.4px solid #8CA6B8" }} />}
          {i === 2 && <span style={{ ...mono(15, 800), color: "#8CA6B8" }}>T</span>}
          {i === 3 && <div style={{ width: 3, height: 15, background: "#8CA6B8",
            transform: "rotate(28deg)" }} />}
          {i === 4 && <div style={{ width: 15, height: 12, borderRadius: 3,
            border: "2.4px solid #8CA6B8" }} />}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: W - 152, top: H - 92, width: 104, height: 56,
      zIndex: 88, borderRadius: 12, opacity: k, display: "flex", alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(178deg, #1E252E 0%, #12171D 100%)",
      border: `2px solid ${hexa("#8CA6B8", 0.24)}` }}>
      <span style={{ ...mono(21, 800), color: "#CFE0EA" }}>{Math.round(zoom * 100)}%</span>
    </div>
  </>
);

/* =========================================================================
   3 · THE VILLAIN — THE STOCK PRESS
   ====================================================================== */

/** ⭐⭐⭐ THE STOCK PRESS. §21: *"GREY + RECTANGULAR is the combination that
    reads as boring — either one alone survives"*, and the answer that worked
    there was *brass, domed, with turning valve wheels and a backlit nameplate.*
    So this is cast iron with a real turning FLYWHEEL (the background process,
    running on every frame it is on screen), a brass nameplate, a spoked crank,
    tie bars, a ram on real ways, and ONE engraved plate bolted into the bed.
    `slam` 0..1 drives the ram down; `plate` picks which plate is bolted in;
    `swap` 0..1 swings the old plate out and the new one in.
    24 drawn parts. */
export const StockPress: React.FC<{
  x: number; y: number; s?: number; z?: number; f: number; slam?: number;
  plate?: "stock" | "own" | "none"; swap?: number; spin?: number;
}> = ({ x, y, s = 1, z = 40, f, slam = 0, plate = "stock", swap = 0, spin = 1 }) => {
  const P = (n: number) => n * s;
  const ramY = P(96) + slam * P(96);
  const ang = f * 3.4 * spin;
  return (
    <div style={{ position: "absolute", left: x - P(230), top: y - P(430), width: P(460),
      height: P(430), zIndex: z }}>
      {/* the bed and the two side frames — cast, with a cast highlight */}
      <div style={{ position: "absolute", left: 0, top: P(330), width: P(460), height: P(100),
        borderRadius: P(5),
        background: `linear-gradient(178deg, ${mxh("#3A3540", 0.20)} 0%, #16131C 100%)` }} />
      {[0, 1].map((i) => (
        <div key={"fr" + i} style={{ position: "absolute", left: i ? P(392) : P(0), top: P(52),
          width: P(68), height: P(290), borderRadius: P(6),
          background: `linear-gradient(${i ? 250 : 110}deg, ${mxh("#3A3540", 0.26)} 0%, #12101A 100%)` }} />
      ))}
      {/* the tie bars across the crown */}
      <div style={{ position: "absolute", left: P(0), top: P(28), width: P(460), height: P(40),
        borderRadius: P(4),
        background: `linear-gradient(178deg, ${mxh("#3A3540", 0.30)} 0%, #14121C 100%)` }} />
      {[0, 1, 2].map((i) => (
        <div key={"tb" + i} style={{ position: "absolute", left: P(70 + i * 106), top: P(68),
          width: P(12), height: P(258), background: dkh("#3A3540", 0.44) }} />
      ))}
      {/* THE FLYWHEEL — the background process, and it never stops */}
      <div style={{ position: "absolute", left: P(-64), top: P(150), width: P(150),
        height: P(150), borderRadius: "50%",
        background: `radial-gradient(circle at 38% 32%, ${mxh("#4A4252", 0.22)}, #14121A)`,
        border: `${P(9)}px solid #0C0A12`, transform: `rotate(${ang}deg)` }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: P(63), top: P(8),
            width: P(8), height: P(58), background: dkh("#4A4252", 0.30),
            transformOrigin: `50% ${P(58)}px`, transform: `rotate(${i * 60}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: P(54), top: P(54), width: P(34), height: P(34),
          borderRadius: "50%", background: mxh(BRASS, 0.10) }} />
      </div>
      {/* the drive belt from the wheel up to the crown */}
      <div style={{ position: "absolute", left: P(4), top: P(58), width: P(9), height: P(180),
        background: dkh("#2A2430", 0.20), transform: "rotate(6deg)" }} />
      {/* THE RAM on real ways */}
      <div style={{ position: "absolute", left: P(84), top: ramY, width: P(292), height: P(78),
        borderRadius: P(4),
        background: `linear-gradient(178deg, ${mxh("#4A4252", 0.30)} 0%, #1A1622 100%)`,
        borderBottom: `${P(10)}px solid #0A0810` }} />
      <div style={{ position: "absolute", left: P(214), top: P(48), width: P(32),
        height: Math.max(P(4), ramY - P(46)), background: dkh("#4A4252", 0.36) }} />
      {/* THE PLATE, bolted into the bed. This is the villain. */}
      {plate !== "none" && (
        <div style={{ position: "absolute", left: P(96) + swap * P(430), top: P(268),
          width: P(268), height: P(66), borderRadius: P(3),
          transform: `rotate(${swap * 22}deg)`, opacity: 1 - swap * 0.15,
          background: plate === "stock"
            ? `linear-gradient(160deg, ${SLOP2} 0%, ${SLOPD} 100%)`
            : `linear-gradient(160deg, ${mxh(OWN[0], 0.20)} 0%, ${dkh(OWN[4], 0.10)} 100%)`,
          border: `${P(5)}px solid ${plate === "stock" ? dkh(SLOPD, 0.40) : dkh(OWN[0], 0.52)}` }}>
          {/* the engraving — a page, cut into metal */}
          <div style={{ position: "absolute", left: "8%", top: "18%", width: "84%", height: "16%",
            background: hexa("#000", 0.34) }} />
          <div style={{ position: "absolute", left: "24%", top: "44%", width: "52%", height: "13%",
            background: hexa("#000", 0.30) }} />
          <div style={{ position: "absolute", left: "38%", top: "66%", width: "24%", height: "18%",
            borderRadius: P(9), background: hexa("#000", 0.40) }} />
        </div>
      )}
      {/* THE BRASS NAMEPLATE — backlit, and it is what names the villain */}
      <div style={{ position: "absolute", left: P(150), top: P(346), width: P(160), height: P(38),
        borderRadius: P(3), display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(168deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
        border: `${P(3)}px solid ${dkh(BRASS, 0.58)}` }}>
        <span style={{ ...mono(P(19), 800), color: "#1A1206", letterSpacing: P(2) }}>STOCK</span>
      </div>
      {/* the ways' oil sheen, so the ram has something to slide against */}
      {[0, 1].map((i) => (
        <div key={"wy" + i} style={{ position: "absolute", left: i ? P(374) : P(72), top: P(70),
          width: P(14), height: P(256), background: hexa("#FFFFFF", 0.07) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   4 · THE TERMINAL, THE CURSOR, THE LINK
   ====================================================================== */

/** the real thing the command is typed into. 14 drawn parts: shell, bezel, three
    lights, a title strip, the scrollback, the prompt caret, the typed command,
    the printed link and its underline, the stand column and the foot. */
export const Terminal: React.FC<{
  x: number; y: number; w: number; h: number; z?: number; f: number;
  typed?: string; caret?: boolean; link?: number; scroll?: number; hit?: number;
  /** ⛔⛔ THE COMMAND IS THE SUBJECT OF ITS OWN SCENE AND THE FIRST BUILD SET IT
      AT 19px. THE-OPEN law 4 is MUTE-READABLE: the one string that matters is
      set large enough to read at thumb distance, in the terminal face because it
      is a command. On a contact sheet the whole scene read as a black rectangle
      with a smudge in it. `cmd` scales the prompt line alone, so the scrollback
      stays the texture it is meant to be. */
  cmd?: number;
  /** ⭐ the REAL Claude Code composer, with the real `/design` command in it,
      pulled from Anthropic's own release-note demo. `real` is how much of it has
      been revealed, so it types in rather than appearing. */
  real?: string; realK?: number;
}> = ({ x, y, w, h, z = 44, f, typed = "", caret = true, link = 0, scroll = 1, hit = 0,
        cmd = 1, real, realK = 1 }) => {
  const u = w / 620;
  const punch = 1 + hit * 0.26;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h,
      zIndex: z, transform: `scale(${punch})`, transformOrigin: "50% 88%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * u,
        background: "linear-gradient(168deg, #2A2E36 0%, #14171C 100%)",
        border: `${5 * u}px solid #0A0C10` }} />
      <div style={{ position: "absolute", left: 12 * u, top: 12 * u, width: w - 24 * u,
        height: 26 * u, borderRadius: 5 * u, background: "#0C1016" }} />
      {[0, 1, 2].map((i) => (
        <div key={"tl" + i} style={{ position: "absolute", left: (22 + i * 15) * u, top: 19 * u,
          width: 9 * u, height: 9 * u, borderRadius: "50%",
          background: ["#D9705C", "#DDB05A", "#6FA98A"][i] }} />
      ))}
      <div style={{ position: "absolute", left: 12 * u, top: 44 * u, width: w - 24 * u,
        height: h - 60 * u, borderRadius: 5 * u, overflow: "hidden",
        background: "#080B11" }}>
        {/* scrollback — real lines, arriving, never a static block */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"sb" + i} style={{ position: "absolute", left: 16 * u,
            top: (14 + i * 17) * u, width: (60 + ((i * 53) % 220)) * u, height: 6 * u,
            borderRadius: 2, opacity: 0.20 * scroll,
            background: i % 4 === 0 ? CLAY : "#6E7A88" }} />
        ))}
        {/* ⭐ THE REAL COMPOSER. It sits where the prompt line would be and the
            drawn prompt is suppressed under it, so the scene shows the actual
            product rather than a drawing of it. */}
        {real && (
          <div style={{ position: "absolute", left: 16 * u, top: h - 168 * u,
            width: w - 56 * u, height: (w - 56 * u) * 0.241, overflow: "hidden",
            borderRadius: 8 * u }}>
            <Img src={staticFile(real)} style={{ position: "absolute", left: 0, top: 0,
              width: "100%", height: "100%", objectFit: "cover",
              clipPath: `inset(0 ${(1 - Math.max(0, Math.min(1, realK))) * 100}% 0 0)` }} />
          </div>
        )}
        {/* the prompt line */}
        <div style={{ position: "absolute", left: 22 * u, top: h - 132 * u, display: "flex",
          alignItems: "center", gap: 12 * u, opacity: real ? 0 : 1 }}>
          <span style={{ ...mono(21 * u * cmd, 800), color: CLAY }}>&gt;</span>
          <span style={{ ...mono(21 * u * cmd, 800), color: "#F2F7FC", letterSpacing: 1.2 }}>{typed}</span>
          {caret && (
            <span style={{ display: "inline-block", width: 13 * u * cmd, height: 24 * u * cmd,
              background: f % 22 < 13 ? "#F2F7FC" : "transparent" }} />
          )}
        </div>
        {/* ⭐ the canvas is a LINK THAT GETS PRINTED. That is what happens. */}
        {link > 0 && (
          <div style={{ position: "absolute", left: 16 * u, top: h - 62 * u,
            opacity: link, transform: `translateY(${(1 - link) * 12 * u}px)` }}>
            <div style={{ ...mono(23 * u, 800), color: LIVE, letterSpacing: 0.8 }}>
              claude.ai/design/…
            </div>
            <div style={{ marginTop: 6 * u, width: 268 * u * link, height: 3 * u,
              background: hexa(LIVE, 0.72) }} />
          </div>
        )}
      </div>
    </div>
  );
};

/** ⭐ A CURSOR MUST BE ~78px (§28 — a 30x38 pointer measures ~0 motion and is
    invisible on a phone). It gets a click ring that LEAVES, so the click is an
    event and not a halo. 6 drawn parts. */
export const Cursor: React.FC<{ x: number; y: number; z?: number; s?: number;
  click?: number; grab?: number }> = ({ x, y, z = 88, s = 78, click = -1, grab = 0 }) => {
  const k = click >= 0 ? Math.min(1, click) : -1;
  return (<>
    {k >= 0 && k < 1 && (
      <div style={{ position: "absolute", left: x - s * 1.5 * k, top: y - s * 1.5 * k,
        width: s * 3 * k, height: s * 3 * k, borderRadius: "50%", zIndex: z - 1,
        border: `${Math.max(2, 7 * (1 - k))}px solid ${hexa(LIVE, 0.85 * (1 - k))}` }} />
    )}
    <div style={{ position: "absolute", left: x, top: y, width: s, height: s, zIndex: z,
      transform: `scale(${1 - grab * 0.14})`, transformOrigin: "8% 8%" }}>
      <svg viewBox="0 0 100 100" width={s} height={s}>
        <path d="M8 4 L8 78 L27 60 L40 90 L56 83 L43 54 L70 52 Z"
          fill={INK} stroke="#F7F5F0" strokeWidth="7" strokeLinejoin="round" />
      </svg>
    </div>
  </>);
};

/* =========================================================================
   5 · THE SYSTEM — INK TRAYS, THE CASE, THE READER
   ====================================================================== */

/** ⭐ A NUMBER MOVES TO ITS VALUE, IT IS NEVER TYPESET AT IT (§4). Five trays,
    each filling to a DIFFERENT level in YOUR paint. The tray reads while EMPTY
    because it is a bright recessed plate, not a black hole (§11).
    9 drawn parts each. */
export const InkTray: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  c: string; fill: number; f: number; label?: string }> =
  ({ x, y, w, h, z = 44, c, fill, f, label }) => {
  const lv = Math.max(0, Math.min(1, fill));
  const slosh = lv > 0.02 ? Math.sin(f / 5.4 + x) * h * 0.018 * Math.min(1, lv * 3) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the pan — bright metal, so it reads empty */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4,
        background: `linear-gradient(172deg, ${mxh(STEEL, 0.42)} 0%, ${dkh(STEEL, 0.22)} 100%)`,
        border: `4px solid ${dkh(STEEL, 0.48)}` }} />
      <div style={{ position: "absolute", left: 7, top: 7, width: w - 14, height: h - 14,
        borderRadius: 2, background: mxh(STEEL, 0.60),
        boxShadow: `inset 0 7px 12px ${hexa("#000", 0.34)}` }} />
      {/* the ink */}
      <div style={{ position: "absolute", left: 7, top: 7 + (h - 14) * (1 - lv) + slosh,
        width: w - 14, height: (h - 14) * lv - slosh, borderRadius: 2,
        background: `linear-gradient(178deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.26)} 100%)` }} />
      {/* the meniscus catching the lamp */}
      {lv > 0.03 && (
        <div style={{ position: "absolute", left: 9, top: 7 + (h - 14) * (1 - lv) + slosh,
          width: w - 18, height: 4, background: hexa("#FFFFFF", 0.42) }} />
      )}
      {/* the pour, while it is filling */}
      {lv > 0.02 && lv < 0.98 && (
        <div style={{ position: "absolute", left: w / 2 - 7, top: -78, width: 14, height: 82,
          background: `linear-gradient(180deg, ${hexa(c, 0)} 0%, ${mxh(c, 0.16)} 40%, ${c} 100%)` }} />
      )}
      {label && (
        <div style={{ position: "absolute", left: -6, top: h + 12, width: w + 12,
          textAlign: "center", padding: "3px 0", borderRadius: 3,
          background: hexa("#2A1F0C", 0.72),
          ...mono(21, 800), color: hexa("#221A0C", 0.90), letterSpacing: 1.6 }}>{label}</div>
      )}
    </div>
  );
};

/** ⭐ THE CASE — your own cut parts, in a real type case with real compartments.
    ⛔ A crate carries ONE bit; a case with a DIFFERENT drawn part in every
    compartment carries as many bits as it has compartments. `open` slides the
    drawers, `fill` seats the parts. 5 + 4 per cell drawn parts. */
export const PartsCase: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  cols?: number; rows?: number; fill?: number; f: number; c?: string }> =
  ({ x, y, w, h, z = 40, cols = 6, rows = 3, fill = 1, f, c = "#3A3026" }) => {
  const cw = (w - 14) / cols, ch = (h - 14) / rows;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4,
        background: `linear-gradient(168deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.34)} 100%)`,
        border: `6px solid ${dkh(c, 0.54)}` }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = 7 + (i % cols) * cw, cy = 7 + Math.floor(i / cols) * ch;
        const k = E(fill, (i / (cols * rows)) * 0.72, (i / (cols * rows)) * 0.72 + 0.30, 0, 1, BACK);
        const kind = i % 5;
        const acc = OWN[i % OWN.length];
        return (
          <div key={"cl" + i} style={{ position: "absolute", left: cx, top: cy,
            width: cw - 5, height: ch - 5, borderRadius: 2, overflow: "hidden",
            background: mxh(c, 0.44), boxShadow: `inset 0 4px 8px ${hexa("#000", 0.44)}` }}>
            {k > 0.02 && (
              <div style={{ position: "absolute", inset: 0, transform: `scale(${k})`,
                transformOrigin: "50% 100%" }}>
                {/* ⭐ a DIFFERENT real part per cell, never one icon repeated */}
                {kind === 0 && (<>
                  <div style={{ position: "absolute", left: "12%", top: "26%", width: "76%",
                    height: "22%", borderRadius: 3, background: acc }} />
                  <div style={{ position: "absolute", left: "12%", top: "58%", width: "48%",
                    height: "12%", borderRadius: 2, background: hexa("#F4EFE2", 0.44) }} />
                </>)}
                {kind === 1 && (<>
                  <div style={{ position: "absolute", left: "16%", top: "22%", width: "68%",
                    height: "56%", borderRadius: 5, border: `3px solid ${acc}` }} />
                  <div style={{ position: "absolute", left: "28%", top: "42%", width: "44%",
                    height: "16%", background: hexa(acc, 0.62) }} />
                </>)}
                {kind === 2 && [0, 1, 2].map((r) => (
                  <div key={r} style={{ position: "absolute", left: "14%", top: `${24 + r * 20}%`,
                    width: `${72 - r * 16}%`, height: "10%", borderRadius: 2,
                    background: r === 0 ? acc : hexa("#F4EFE2", 0.40) }} />
                ))}
                {kind === 3 && (<>
                  <div style={{ position: "absolute", left: "22%", top: "24%", width: "56%",
                    height: "34%", borderRadius: "50%", background: hexa(acc, 0.78) }} />
                  <div style={{ position: "absolute", left: "18%", top: "66%", width: "64%",
                    height: "10%", borderRadius: 2, background: hexa("#F4EFE2", 0.38) }} />
                </>)}
                {kind === 4 && [0, 1, 2, 3].map((r) => (
                  <div key={r} style={{ position: "absolute", left: `${14 + (r % 2) * 40}%`,
                    top: `${24 + Math.floor(r / 2) * 32}%`, width: "34%", height: "24%",
                    borderRadius: 3, background: r === 1 ? acc : hexa("#F4EFE2", 0.26) }} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {/* the case's own rails, so it reads as joinery and not a grid */}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <div key={"rr" + i} style={{ position: "absolute", left: 7, top: 7 + (i + 1) * ch - 3,
          width: w - 14, height: 4, background: dkh(c, 0.60) }} />
      ))}
    </div>
  );
};

/** ⭐ THE READER HEAD — and §10's law: *a scan that surfaces nothing is a
    progress bar.* It travels, and it PRODUCES: a bright read-line under it and a
    finding flag left behind at every part it lifts. 11 drawn parts. */
export const ReaderHead: React.FC<{ x: number; y: number; h: number; z?: number; f: number;
  c?: string }> = ({ x, y, h, z = 60, f, c = LIVE }) => (
  <div style={{ position: "absolute", left: x - 46, top: y, width: 92, height: h, zIndex: z }}>
    {/* the carriage */}
    <div style={{ position: "absolute", left: 0, top: -34, width: 92, height: 54, borderRadius: 4,
      background: `linear-gradient(168deg, ${mxh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
      border: `4px solid ${dkh(STEEL, 0.58)}` }} />
    {[0, 1].map((i) => (
      <div key={"rl" + i} style={{ position: "absolute", left: 12 + i * 52, top: -26,
        width: 28, height: 28, borderRadius: "50%", background: dkh(STEEL, 0.20),
        border: `4px solid ${dkh(STEEL, 0.62)}`, transform: `rotate(${f * 11}deg)` }}>
        <div style={{ position: "absolute", left: 10, top: 2, width: 4, height: 10,
          background: mxh(STEEL, 0.40) }} />
      </div>
    ))}
    {/* the column */}
    <div style={{ position: "absolute", left: 34, top: 18, width: 24, height: h - 18,
      background: `linear-gradient(90deg, ${dkh(STEEL, 0.46)} 0%, ${mxh(STEEL, 0.16)} 50%, ${dkh(STEEL, 0.52)} 100%)` }} />
    {/* THE READ LINE — bright, and it is the finding, not the progress */}
    <div style={{ position: "absolute", left: -10, top: h * 0.42, width: 112, height: 9,
      background: `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${c} 50%, ${hexa(c, 0)} 100%)` }} />
    <div style={{ position: "absolute", left: -34, top: h * 0.42 - 26, width: 160, height: 62,
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, 0.30)} 0%, ${hexa(c, 0)} 72%)` }} />
    {/* the lamp on the head */}
    <div style={{ position: "absolute", left: 36, top: -14, width: 20, height: 20,
      borderRadius: "50%", background: f % 18 < 10 ? mxh(c, 0.40) : dkh(c, 0.30) }} />
  </div>
);

/* =========================================================================
   6 · THE CANVAS FURNITURE — HANDLES, PROPERTIES, GUIDES
   ====================================================================== */

/** the selection a click makes. Eight real handles on a real bounding box —
    which is what click-to-select LOOKS like, and it is drawn rather than
    written, so the frame never claims anything the docs do not. */
export const Handles: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  k?: number; c?: string }> = ({ x, y, w, h, z = 84, k = 1, c = LIVE }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
    zIndex: z, opacity: k }}>
    <div style={{ position: "absolute", inset: 0, border: `3px solid ${c}` }} />
    {[[0, 0], [0.5, 0], [1, 0], [0, 0.5], [1, 0.5], [0, 1], [0.5, 1], [1, 1]].map(([hx, hy], i) => (
      <div key={"hd" + i} style={{ position: "absolute", left: w * hx - 8, top: h * hy - 8,
        width: 16, height: 16, background: "#FAF9F5", border: `3px solid ${c}` }} />
    ))}
  </div>
);

/** the properties strip. ⛔ IT LIVES IN THE RESERVED PLATE BAND (panel y
    112..210) and never enters the ground line the cast stands on (reel 112:
    *"the claude sprites are covered by the text boxes"*). */
export const PropStrip: React.FC<{ x: number; y: number; z?: number; k?: number;
  rows: Array<[string, string]>; c?: string }> =
  ({ x, y, z = 86, k = 1, rows, c = LIVE }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 268, zIndex: z, opacity: k,
    transform: `translateX(${(1 - k) * 40}px)`, borderRadius: 6, overflow: "hidden",
    background: "linear-gradient(172deg, #1E242E 0%, #12161C 100%)",
    border: `3px solid ${hexa(c, 0.5)}` }}>
    <div style={{ padding: "7px 12px", background: hexa(c, 0.16),
      ...mono(15, 800), color: hexa("#EAF4F7", 0.9), letterSpacing: 1.6 }}>PROPERTIES</div>
    {rows.map(([a, b], i) => (
      <div key={"pr" + i} style={{ display: "flex", justifyContent: "space-between",
        padding: "6px 12px", borderTop: `1px solid ${hexa("#FFFFFF", 0.08)}` }}>
        <span style={{ ...mono(15, 700), color: hexa("#9FB4C0", 0.9) }}>{a}</span>
        <span style={{ ...mono(15, 800), color: "#EAF4F7" }}>{b}</span>
      </div>
    ))}
  </div>
);

/** an alignment guide that flashes when something snaps to it. */
export const Guide: React.FC<{ x?: number; y?: number; len: number; z?: number; k?: number;
  c?: string; bow?: number }> = ({ x, y, len, z = 82, k = 1, c = GREEN, bow = 0 }) => (
  <div style={{ position: "absolute",
    left: x !== undefined ? x : 0, top: y !== undefined ? y : 0,
    width: x !== undefined ? 3 : len, height: x !== undefined ? len : 3, zIndex: z,
    opacity: k, background: c,
    transform: bow ? `skewX(${bow}deg)` : undefined }} />
);

/* =========================================================================
   7 · STRUCTURE — THE SPUR, THE STACK, THE RACKS
   ====================================================================== */

/** ⭐⭐⭐ THE SPUR — §1's highest-value shape: a full-width high-contrast
    travelling run. ⛔ It ALTERNATES light and shadow (a light-only wash lifts
    the black point, which is the banned fix) and every carrier is >= 48px on
    its short side so it survives the audit's 1012->240 downsample.
    ⛔ AND ITS z MUST BEAT BOTH THINGS IT JOINS (§6). */
export const Spur: React.FC<{ y: number; f: number; z?: number; rate?: number; pitch?: number;
  on?: number; c?: string; from?: number; to?: number }> =
  ({ y, f, z = 76, rate = 9.2, pitch = 168, on = 1, c = LIVE, from = -60, to = W + 60 }) => {
  const span = to - from;
  const n = Math.ceil(span / pitch) + 1;
  return (<>
    {/* the conduit itself, with hangers */}
    <div style={{ position: "absolute", left: from, top: y - 26, width: span, height: 22,
      zIndex: z, background: `linear-gradient(180deg, ${mxh("#2E3844", 0.28)} 0%, #0C1218 100%)` }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: from + 60 + i * (span / 6.4),
        top: y - 84, width: 9, height: 60, zIndex: z - 1, background: "#131A22" }} />
    ))}
    {/* the carriers */}
    {on > 0 && Array.from({ length: n }, (_, i) => {
      const x = from + ((((i * pitch + f * rate) % span) + span) % span);
      const dk = i % 2 === 1;
      return (
        <div key={"cr" + i} style={{ position: "absolute", left: x - 33, top: y - 2,
          width: 66, height: 46, zIndex: z, borderRadius: 3, opacity: on,
          background: dk
            ? `linear-gradient(168deg, #0A1014 0%, #05080B 100%)`
            : `linear-gradient(168deg, ${mxh(c, 0.34)} 0%, ${dkh(c, 0.18)} 100%)`,
          border: `3px solid ${dk ? "#04070A" : dkh(c, 0.44)}` }}>
          <div style={{ position: "absolute", left: "18%", top: "24%", width: "64%", height: "18%",
            background: hexa(dk ? "#6E8494" : "#0A1014", 0.5) }} />
          <div style={{ position: "absolute", left: "18%", top: "56%", width: "40%", height: "14%",
            background: hexa(dk ? "#6E8494" : "#0A1014", 0.34) }} />
        </div>
      );
    })}
  </>);
};

/** a bay of code drawers — the store. Each drawer can come OUT with a real part
    visible in it, which is what "reads your existing codebase" looks like. */
export const CodeRack: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  cols?: number; rows?: number; out?: number[]; f: number; c?: string }> =
  ({ x, y, w, h, z = 30, cols = 5, rows = 4, out = [], f, c = "#173540" }) => {
  const cw = (w - 12) / cols, ch = (h - 12) / rows;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 4,
        background: `linear-gradient(172deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `5px solid ${dkh(c, 0.58)}` }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = 6 + (i % cols) * cw, cy = 6 + Math.floor(i / cols) * ch;
        const o = out[i] ?? 0;
        return (
          <div key={"dr" + i} style={{ position: "absolute", left: cx, top: cy,
            width: cw - 4, height: ch - 4, borderRadius: 2, overflow: "hidden",
            background: mxh(c, 0.34), boxShadow: `inset 0 4px 9px ${hexa("#000", 0.5)}` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
              transform: `translateY(${o * ch * 0.34}px) scale(${1 + o * 0.06})`,
              background: `linear-gradient(172deg, ${mxh(c, 0.46)} 0%, ${dkh(c, 0.14)} 100%)`,
              borderBottom: `3px solid ${dkh(c, 0.62)}` }}>
              <div style={{ position: "absolute", left: "26%", top: "38%", width: "48%",
                height: "16%", borderRadius: 2, background: hexa(STEEL, 0.42) }} />
              {o > 0.4 && (
                <div style={{ position: "absolute", left: "12%", top: "12%", width: "76%",
                  height: "20%", borderRadius: 2, background: OWN[i % OWN.length],
                  opacity: (o - 0.4) / 0.6 }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** the stock belt — identical purple boards arriving forever. ⛔ Its carried
    objects are the SLOP FACE at real proportions, because the recognition is
    the point and an abstract slab carries one bit. */
export const StockBelt: React.FC<{ y: number; f: number; z?: number; rate?: number;
  pitch?: number; bw?: number; bh?: number }> =
  ({ y, f, z = 34, rate = 5.6, pitch = 214, bw = 150, bh = 98 }) => {
  const span = pitch * Math.ceil((W + pitch * 2) / pitch);
  const n = Math.ceil(span / pitch);
  return (<>
    <div style={{ position: "absolute", left: -40, top: y + bh - 12, width: W + 80, height: 22,
      zIndex: z - 1, background: "#0B0F14" }} />
    {Array.from({ length: 12 }, (_, i) => (
      <div key={"rlr" + i} style={{ position: "absolute", left: -30 + i * 92, top: y + bh - 8,
        width: 42, height: 14, borderRadius: 7, zIndex: z,
        background: dkh(STEEL, 0.44), transform: `rotate(${f * 9}deg)` }} />
    ))}
    {Array.from({ length: n }, (_, i) => {
      const x = -pitch + ((((i * pitch - f * rate) % span) + span) % span);
      return (
        <div key={"sb" + i} style={{ position: "absolute", left: x, top: y, width: bw, height: bh,
          zIndex: z + 1, borderRadius: 3, overflow: "hidden",
          border: `4px solid #1A1424`,
          transform: `rotate(${Math.sin(i * 2.3) * 1.4}deg)` }}>
          <SlopFace w={bw} h={bh} />
        </div>
      );
    })}
  </>);
};

/** the wall the belt builds — a stack of identical pages, and it GROWS. */
export const SlopStack: React.FC<{ x: number; y: number; n: number; z?: number;
  bw?: number; bh?: number; f: number }> =
  ({ x, y, n, z = 26, bw = 132, bh = 88, f }) => (
  <>{Array.from({ length: Math.max(0, Math.floor(n)) }, (_, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    return (
      <div key={"ss" + i} style={{ position: "absolute", left: x + col * (bw + 9),
        top: y - row * (bh + 8), width: bw, height: bh, zIndex: z + row,
        borderRadius: 3, overflow: "hidden", border: `3px solid #1A1424`,
        transform: `rotate(${Math.sin(i * 1.7) * 1.1}deg)` }}>
        <SlopFace w={bw} h={bh} dim={0.18 + row * 0.06} />
      </div>
    );
  })}</>
);
