import React from "react";
import { AbsoluteFill } from "remotion";
import { fraunces, inter } from "./fonts";
import {
  W, H, hexa, rnd, dkh, mxh, mono, ui, SH, Mark,
  R, SLAB, SLAB3, PAGE, PAGE2, PAGELINE, RAIL, RAILHI, CLAY, GOLD,
  DIFFG, INK, SYN_MIX, CARET, TEAL,
} from "./IntWorld";

/* ===========================================================================
   REEL 140 · "INTENT" — THE POST COVER.  1080x1920.

   ⛔ A COVER IS A THUMBNAIL, NOT A POSTER (`feedback_a_cover_is_a_thumbnail`):
   the hero is >= 55% of the scene block, CENTRED, and everything else is <= 40%
   of it or cropped by the frame. Nothing here is a third competing object.

   ⛔ THE GIANT IS THE PAYOFF NAME, NOT THE CTA KEYWORD
   (`feedback_cover_giant_is_a_name`), and it is taken from the reel's own header
   band ("A NEW CLAUDE FILE / OUTRANKS CLAUDE.MD"). The giant is `intent.md` —
   the thing the reel is about — and the keyword `INTENT` appears nowhere on the
   cover. ⛔ And the reel's hook is a REVEAL, so the cover must BE the subject
   rather than hide it (`feedback_a_reveal_hook_must_not_hide_its_own_subject`).

   ⛔ REAL MARKS ONLY (`feedback_covers_use_real_logos`): the Claude mark is the
   house `Mark` from NomWorld. No invented glyph stands in for a brand.

   ⛔⛔ "COVERS ARE DULL" IS MEASURED (`feedback_cover_dullness_is_measurable`):
   shipped covers run 34-41% saturated pixels and ~28% near-black. So the scene
   block is a SATURATED amber hall with a near-black hero on it — chroma in the
   scene, darkness in the wall, never a pale wash.
   ========================================================================= */

const CW = 1080, CH = 1920;
const BAND = 812;                       /* the cream headline block */

/** the CLAUDE.md wall behind — the thing being outranked, kept to a supporting
    value so the near-black hero keeps the frame. */
const WallCard: React.FC<{ x: number; y: number; w: number; h: number; dim?: number }> =
  ({ x, y, w, h, dim = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 12,
    background: `linear-gradient(164deg, ${mxh(PAGE, 0.24 - dim * 0.2)}, ${dkh(PAGE2, dim * 0.34)})`,
    border: `4px solid ${hexa(PAGELINE, 0.9)}`,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 9 }}>
    <span style={{ ...mono(19, 900), color: hexa(INK, 0.80 - dim * 0.3), letterSpacing: 0.3 }}>
      {R.other}
    </span>
    <div style={{ width: w * 0.52, height: 6, borderRadius: 3, background: hexa(INK, 0.22) }} />
    <div style={{ width: w * 0.34, height: 6, borderRadius: 3, background: hexa(INK, 0.18) }} />
  </div>
);

export const IntCover: React.FC = () => {
  const SX = 0, SY = BAND, SH_ = CH - BAND;      /* the scene block */
  return (
    <AbsoluteFill style={{ background: "#F3EAD3" }}>
      {/* =============== THE HEADLINE BLOCK =============== */}
      <div style={{ position: "absolute", left: 0, top: 0, width: CW, height: BAND,
        background: "linear-gradient(178deg, #F7F0DE 0%, #EFE2C2 62%, #E6D5AE 100%)" }} />
      {/* the paper tooth, so the block is a SURFACE and not a swatch */}
      {Array.from({ length: 210 }, (_, i) => (
        <div key={"g" + i} style={{ position: "absolute",
          left: rnd(i, 3) * CW, top: rnd(i, 7) * BAND, width: 3, height: 3, borderRadius: 2,
          background: hexa("#8A7440", 0.14) }} />
      ))}

      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center" }}>
        <div style={{ ...ui(74, 900), color: "#241C10", letterSpacing: -0.4, lineHeight: 1.0 }}>
          <span style={{ color: CLAY }}>ANTHROPIC'S</span> NEW FILE
        </div>
        <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 178,
          color: "#1B4C58", letterSpacing: -5, lineHeight: 0.96, marginTop: 6 }}>
          intent.md
        </div>
        <div style={{ ...ui(58, 900), color: "#241C10", letterSpacing: -0.2, marginTop: 8 }}>
          OUTRANKS <span style={{ color: CLAY }}>CLAUDE.MD</span>
        </div>
      </div>

      {/* =============== THE SCENE BLOCK =============== */}
      <div style={{ position: "absolute", left: SX, top: SY, width: CW, height: SH_,
        overflow: "hidden",
        background: "linear-gradient(178deg, #E8AE34 0%, #CE8C14 54%, #8A5A08 100%)" }}>
        {/* the pilasters that stop a lit field reading as flat paint */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"pi" + i} style={{ position: "absolute", left: -20 + i * 168, top: 0,
            width: 30, height: SH_, opacity: 0.28,
            background: `linear-gradient(90deg, ${hexa("#000000", 0.55)}, ${hexa("#000000", 0.04)})` }} />
        ))}

        {/* the wall of the file everyone already has — supporting, and CUT by the
            frame edge on both sides so the block has a foreground plane */}
        {[
          { x: -78, y: 40, w: 196, h: 150, d: 0.26 },
          { x: 962, y: 40, w: 196, h: 150, d: 0.26 },
          { x: -78, y: 206, w: 196, h: 150, d: 0.38 },
          { x: 962, y: 206, w: 196, h: 150, d: 0.38 },
          { x: -78, y: 372, w: 196, h: 150, d: 0.50 },
          { x: 962, y: 372, w: 196, h: 150, d: 0.50 },
        ].map((c, i) => <WallCard key={"wc" + i} x={c.x} y={c.y} w={c.w} h={c.h} dim={c.d} />)}

        {/* ⭐ THE HERO — near-black, dead centre, and the largest thing in the
            block by a wide margin. Its five ribs are the REAL intent.md section
            headings, which is what makes the cover carry a receipt rather than a
            slogan. */}
        <div style={{ position: "absolute", left: CW / 2 - 344, top: 34, width: 688, height: 966,
          borderRadius: 26,
          background: "linear-gradient(162deg, #204049 0%, #12262B 44%, #0A171B 100%)",
          border: "7px solid #2E5560", boxShadow: SH }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 688, height: 10,
            borderRadius: "26px 26px 0 0", background: hexa("#FFFFFF", 0.20) }} />
          {/* the name plate */}
          <div style={{ position: "absolute", left: 32, top: 32, right: 32, height: 132,
            borderRadius: 12, background: "#1B3A43", border: "3px solid #2E5560",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(76, 900), color: PAGE, letterSpacing: 0.4 }}>{R.hero}</span>
          </div>
          {/* the five REAL fields */}
          {R.fields.map((t, i) => (
            <div key={"fd" + i} style={{ position: "absolute", left: 38, right: 38,
              top: 194 + i * 146, height: 124, borderRadius: 12,
              background: "linear-gradient(180deg, #24454E, #163037)",
              borderLeft: `13px solid ${i === 0 ? CARET : hexa(GOLD, 0.76)}`,
              display: "flex", alignItems: "center", paddingLeft: 26 }}>
              <span style={{ ...mono(40, 800), color: hexa(PAGE, 0.95), letterSpacing: 0.4 }}>{t}</span>
            </div>
          ))}
          {/* ⛔ the REAL Claude mark, never an invented glyph */}
          <div style={{ position: "absolute", right: 26, bottom: 22, width: 112, height: 112 }}>
            <Mark x={0} y={0} s={86} z={2} plate={false} />
          </div>
        </div>

        {/* the contact shadow that seats it on the floor */}
        <div style={{ position: "absolute", left: CW / 2 - 350, top: 1000, width: 700, height: 44,
          borderRadius: "50%", background: hexa("#2A1C06", 0.42), filter: "blur(12px)" }} />

        {/* the branch rail the block stands on */}
        <div style={{ position: "absolute", left: -40, top: 1042, width: CW + 80, height: 11,
          background: hexa(RAILHI, 0.72) }} />
        <div style={{ position: "absolute", left: -40, top: 1053, width: CW + 80, height: 20,
          background: hexa(RAIL, 0.9) }} />
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"cd" + i} style={{ position: "absolute", left: 46 + i * 142, top: 1028,
            width: 38, height: 38, borderRadius: "50%",
            background: `radial-gradient(circle at 34% 30%, ${mxh(GOLD, 0.34)}, ${dkh(GOLD, 0.4)})`,
            border: `4px solid ${dkh(GOLD, 0.5)}` }} />
        ))}

        {/* ONE Claude, small, at the hero's foot — the audience filter, never a
            second competing object */}
        <div style={{ position: "absolute", left: 892, top: 846, width: 168, height: 216 }}>
          {/* legs */}
          <div style={{ position: "absolute", left: 40, top: 176, width: 26, height: 40,
            borderRadius: 7, background: dkh(CLAY, 0.40) }} />
          <div style={{ position: "absolute", left: 100, top: 176, width: 26, height: 40,
            borderRadius: 7, background: dkh(CLAY, 0.40) }} />
          {/* body */}
          <div style={{ position: "absolute", left: 22, top: 104, width: 122, height: 84,
            borderRadius: "18px 18px 10px 10px",
            background: `linear-gradient(168deg, ${mxh(CLAY, 0.10)}, ${dkh(CLAY, 0.30)})`,
            border: `6px solid ${dkh(CLAY, 0.48)}` }} />
          {/* arms, attached ON the body */}
          <div style={{ position: "absolute", left: 2, top: 112, width: 26, height: 62,
            borderRadius: 9, background: `linear-gradient(168deg, ${mxh(CLAY, 0.04)}, ${dkh(CLAY, 0.38)})`,
            border: `5px solid ${dkh(CLAY, 0.48)}` }} />
          <div style={{ position: "absolute", left: 140, top: 112, width: 26, height: 62,
            borderRadius: 9, background: `linear-gradient(168deg, ${mxh(CLAY, 0.04)}, ${dkh(CLAY, 0.38)})`,
            border: `5px solid ${dkh(CLAY, 0.48)}` }} />
          {/* head */}
          <div style={{ position: "absolute", left: 30, top: 8, width: 106, height: 102,
            borderRadius: "26px 26px 16px 16px",
            background: `linear-gradient(168deg, ${mxh(CLAY, 0.22)}, ${dkh(CLAY, 0.14)})`,
            border: `6px solid ${dkh(CLAY, 0.48)}`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
            <div style={{ width: 15, height: 26, borderRadius: 6, background: hexa(INK, 0.86) }} />
            <div style={{ width: 15, height: 26, borderRadius: 6, background: hexa(INK, 0.86) }} />
          </div>
        </div>

        {/* the FREE tag — the one accent, cropped by the left edge like reel 139's */}
        <div style={{ position: "absolute", left: 22, top: 900, padding: "18px 34px 18px 26px",
          borderRadius: 12, transform: "rotate(-7deg)",
          background: `linear-gradient(168deg, ${mxh(SLAB, 0.22)}, ${dkh(SLAB, 0.10)})`,
          border: `5px solid ${hexa(GOLD, 0.9)}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", border: `4px solid ${GOLD}` }} />
          <span style={{ ...ui(46, 900), color: GOLD, letterSpacing: 1 }}>FREE</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
