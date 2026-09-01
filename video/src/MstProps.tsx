import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, Contact, Ring, Puff,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS,
  SODIUM, VIOLET, EMBER, OXIDE, SLATE, VERD, BONE, WOODT, VELVET, ASPH, CHALK,
  mix3,
  Tile, Stencil, settle, R,
} from "./MstWorld";
import type { Place } from "./MstWorld";

/* ===========================================================================
   REEL 121 · "MISTAKE" — THE PROPS.  Board: storyboards/121-mistake.md.

   ⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES ([[feedback_props_need_real_drawing]]).
      Reel 117 shipped a "book" that was FOUR DIVS. The house bar is 12-16
      elements per prop, and the count is checked here per component rather than
      discovered in a review round. Element counts are in each header.

   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO. `scene_motion_audit` scales
      1012 -> 240 (x0.237), so anything under ~170px drawn vanishes from the
      measurement AND from the eye. Every prop that TRAVELS in this reel
      (toolbox 186px, robe 300px, boards 420px) clears it by construction.

   ⛔ NO `boxShadow: "0 0 Npx"` ANYWHERE. Shadow is SH / SH_D (offset, matte)
      or a solid contact patch. The grep gate returns 0.
   ========================================================================= */

/* ---- THE HERO ARTIFACT: THE VAN ------------------------------------------
   28 elements. Side-on, dark OXIDE against a bright sky in every exterior, so
   the "which side of the contrast is my subject on" question ([[feedback_hook_simplicity]])
   is answered once here for the whole reel.

   ⭐ THE FLANK CARRIES BOTH FRAME-0 GATES. `HOOK_PLATE` (>=18% of panel) and
   `HOOK_LUMA` (>=140) both ride on the cream stencilled panel, NOT on the door.
   THE-OPEN's "a gate carried by the wrong object DEFORMS that object" is why:
   reel 110's barbell went pale and enormous because it was holding up the luma
   bar. Here the door is free to stay a dark silhouette. */
export const Van: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; f: number;
  /** 0..1, how far the back door stands open */
  door?: number;
  /** suspension bounce, driven by the caller's event */
  bounce?: number;
  /** show the stencilled claim panel on the flank */
  plate?: boolean;
  flip?: boolean;
}> = ({ p, x, y, s = 1, z = 40, f, door = 0, bounce = 0, plate = true, flip = false }) => {
  const body = OXIDE, bodyD = dkh(OXIDE, 0.34), bodyL = mix3(OXIDE, "#FFFFFF", 0.16);
  const glass = mix3(p.back, "#FFFFFF", 0.44);
  return (
    <div style={{ position: "absolute", left: x, top: y + bounce, zIndex: z,
      transform: `scale(${s}) ${flip ? "scaleX(-1)" : ""}`, transformOrigin: "50% 100%" }}>
      {/* ---- under-shadow: a solid contact patch, never a blur ---- */}
      <div style={{ position: "absolute", left: 26, top: 292, width: 700, height: 30,
        borderRadius: 14, background: hexa(INK, 0.40) }} />
      {/* ---- box body ---- */}
      <div style={{ position: "absolute", left: 200, top: 34, width: 528, height: 262,
        borderRadius: "10px 6px 6px 10px", background: body }} />
      {/* the roof lip, lit */}
      <div style={{ position: "absolute", left: 196, top: 26, width: 536, height: 16,
        borderRadius: 6, background: bodyL }} />
      {/* the lower rocker, in shade — the value gap that gives it mass */}
      <div style={{ position: "absolute", left: 200, top: 250, width: 528, height: 46, background: bodyD }} />
      {/* corrugation ribs: 7 verticals, texture only */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"rb" + i} style={{ position: "absolute", left: 236 + i * 66, top: 44,
          width: 7, height: 204, background: hexa(INK, 0.13) }} />
      ))}
      {/* ---- cab ---- */}
      <div style={{ position: "absolute", left: 22, top: 96, width: 190, height: 200,
        borderRadius: "34px 8px 6px 10px", background: body }} />
      <div style={{ position: "absolute", left: 22, top: 250, width: 190, height: 46, background: bodyD }} />
      {/* windscreen + door glass, raked */}
      <div style={{ position: "absolute", left: 44, top: 112, width: 96, height: 78,
        borderRadius: "22px 6px 4px 6px", background: glass,
        transform: "skewX(-9deg)" }} />
      <div style={{ position: "absolute", left: 150, top: 116, width: 54, height: 70,
        borderRadius: 5, background: mix3(glass, INK, 0.22) }} />
      {/* mirror + handle */}
      <div style={{ position: "absolute", left: 12, top: 150, width: 24, height: 34, borderRadius: 4, background: bodyD }} />
      <div style={{ position: "absolute", left: 156, top: 200, width: 40, height: 9, borderRadius: 4, background: bodyL }} />
      {/* headlamp + bumper */}
      <div style={{ position: "absolute", left: 20, top: 214, width: 30, height: 24, borderRadius: 6, background: mix3(BONE, GOLD, 0.4) }} />
      <div style={{ position: "absolute", left: 14, top: 254, width: 60, height: 18, borderRadius: 5, background: STEEL }} />
      {/* ---- wheels: tyre, hub, five studs, and an arch shadow ---- */}
      {[112, 592].map((wx, i) => (
        <React.Fragment key={"wh" + i}>
          <div style={{ position: "absolute", left: wx - 6, top: 236, width: 116, height: 60,
            borderRadius: "50% 50% 0 0", background: hexa(INK, 0.34) }} />
          <div style={{ position: "absolute", left: wx, top: 244, width: 104, height: 104,
            borderRadius: "50%", background: "#26241F" }} />
          <div style={{ position: "absolute", left: wx + 24, top: 268, width: 56, height: 56,
            borderRadius: "50%", background: STEEL }} />
          <div style={{ position: "absolute", left: wx + 44, top: 288, width: 16, height: 16,
            borderRadius: "50%", background: dkh(STEEL, 0.34) }} />
          {Array.from({ length: 5 }, (_, k) => {
            const a = (k / 5) * Math.PI * 2 + f * 0.04;
            return (
              <div key={k} style={{ position: "absolute", borderRadius: "50%", width: 8, height: 8,
                left: wx + 48 + Math.cos(a) * 19, top: sy(292, a), background: dkh(STEEL, 0.5) }} />
            );
          })}
        </React.Fragment>
      ))}
      {/* ---- THE FLANK PANEL — the claim plate, and the frame-0 gates ---- */}
      {plate && (
        <div style={{ position: "absolute", left: 236, top: 62, width: 456, height: 188,
          borderRadius: 8, background: CREAMB, boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: 20, top: 12, fontFamily: fraunces.fontFamily,
            fontWeight: 900, fontSize: 92, lineHeight: 0.94, color: INK }}>{R.bloat.n}</div>
          <div style={{ position: "absolute", left: 22, top: 108, width: 330,
            fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17, letterSpacing: 1.1,
            lineHeight: 1.2, color: dkh(INK, -0.35) }}>{R.bloat.label}</div>
          {/* the five real marks, on white tiles, in a row */}
          {R.servers.map((id, i) => (
            <Tile key={id} id={id} x={20 + i * 60} y={140} s={50} r={9} z={72} />
          ))}
          {/* the source chip — the receipt for the number above it */}
          <div style={{ position: "absolute", right: 14, top: 118, padding: "6px 11px",
            borderRadius: 8, background: hexa(INK, 0.08),
            fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 0.6, color: dkh(INK, -0.28) }}>
            {R.bloat.src}
          </div>
        </div>
      )}
      {/* ---- THE BACK DOOR: two leaves, the right one swinging ---- */}
      <div style={{ position: "absolute", left: 728, top: 30, width: 18, height: 268, background: bodyD }} />
      <div style={{ position: "absolute", left: 700, top: 34, width: 46, height: 262,
        background: dkh(OXIDE, 0.5) }} />
      <div style={{ position: "absolute", left: 736, top: 34, width: 30, height: 262,
        transformOrigin: "0% 50%", transform: `rotateY(${-door * 78}deg) translateX(${door * 26}px)`,
        background: bodyD }}>
        <div style={{ position: "absolute", left: 4, top: 26, width: 22, height: 34, borderRadius: 4, background: bodyL }} />
        <div style={{ position: "absolute", left: 4, top: 150, width: 22, height: 12, borderRadius: 3, background: STEEL }} />
      </div>
    </div>
  );
};
/** wheel-stud y helper, kept out of the JSX so the arithmetic is readable */
const sy = (base: number, a: number) => base - 4 + Math.sin(a) * 19;

/* ---- THE HOLD ------------------------------------------------------------
   19 elements. The load space seen square-on through the open mouth, with the
   painted LOAD LINE that everything in the reel is measured against.
   ⛔ This is the artifact that CHANGES STATE in all 11 scenes. Nothing else does. */
export const Hold: React.FC<{
  p: Place; x: number; y: number; w?: number; h?: number; z?: number;
  /** 0..1 of the hold's height that is currently occupied — the number that
      MOVES to its value (§4), never a numeral typeset at it */
  fill?: number;
  /** where the painted limit sits, 0..1 from the floor */
  line?: number;
  dim?: number;
}> = ({ p, x, y, w = 500, h = 320, z = 44, fill = 0, line = 0.78, dim = 0 }) => {
  const inner = dkh(OXIDE, 0.62), floor = WOODT, lit = mix3(WOODT, "#FFFFFF", 0.2);
  const lineY = y + h - h * line;
  return (
    <>
      {/* the mouth frame — four sides, so it reads as a hole not a rectangle */}
      <div style={{ position: "absolute", left: x - 16, top: y - 16, width: w + 32, height: h + 40,
        borderRadius: 8, background: dkh(OXIDE, 0.3), zIndex: z }} />
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z + 1,
        background: `linear-gradient(180deg, ${dkh(inner, 0.25)} 0%, ${inner} 52%, ${dkh(inner, 0.1)} 100%)` }} />
      {/* the floor boards, in perspective: 7 planks narrowing to the back */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pl" + i} style={{ position: "absolute", zIndex: z + 2,
          left: x + 10 + i * 4, top: y + h - 54 + i * 2, width: w - 20 - i * 8, height: 7,
          background: i % 2 ? floor : lit, opacity: 0.5 + i * 0.06 }} />
      ))}
      {/* ribs down both walls */}
      {Array.from({ length: 4 }, (_, i) => (
        <React.Fragment key={"hr" + i}>
          <div style={{ position: "absolute", left: x + 14 + i * 9, top: y + 12 + i * 8,
            width: 8, height: h - 40 - i * 14, background: hexa(INK, 0.24), zIndex: z + 2 }} />
          <div style={{ position: "absolute", left: x + w - 22 - i * 9, top: y + 12 + i * 8,
            width: 8, height: h - 40 - i * 14, background: hexa(INK, 0.24), zIndex: z + 2 }} />
        </React.Fragment>
      ))}
      {/* ⭐ THE LOAD LINE — a painted limit with hatching, and a small stencil */}
      <div style={{ position: "absolute", left: x + 8, top: lineY, width: w - 16, height: 7,
        zIndex: z + 12, background: GOLD }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: x + 12 + i * ((w - 24) / 14),
          top: lineY - 13, width: 12, height: 13, zIndex: z + 12, transform: "skewX(-26deg)",
          background: hexa(GOLD, 0.42) }} />
      ))}
      <Stencil t="LOAD LINE" x={x + 12} y={lineY + 12} size={17} c={hexa(GOLD, 0.8)} z={z + 12} w={220} />
      {/* ⭐ the fill: a solid mass rising from the floor. Its TOP EDGE is the
          only thing that repaints, which is exactly why it is paired with the
          objects arriving rather than asked to carry a scene on its own (§1). */}
      {fill > 0 && (
        <div style={{ position: "absolute", left: x + 8, top: y + h - 46 - (h - 60) * fill,
          width: w - 16, height: (h - 60) * fill, zIndex: z + 8,
          background: `linear-gradient(180deg, ${hexa(fill > line ? RED : VERD, 0.5)} 0%, ${hexa(fill > line ? RED : VERD, 0.24)} 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 6,
            background: fill > line ? RED : VERD }} />
        </div>
      )}
      {dim > 0 && (
        <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z + 20,
          background: hexa(INK, dim) }} />
      )}
    </>
  );
};

/* ---- OFFENDER 1: THE EXPERT ROBE -----------------------------------------
   17 elements. Velvet, bulky, a mortarboard and a tassel. It fills the pan and
   it is worth nothing — which is what the source says, so it is never drawn as
   harmful, only as EXPENSIVE. */
export const Robe: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  sway?: number; hang?: boolean }> = ({ x, y, s = 1, z = 60, f, sway = 1, hang = true }) => {
  const sw = Math.sin(f / 21) * 2.4 * sway;
  const v = VELVET, vD = dkh(VELVET, 0.36), vL = mix3(VELVET, "#FFFFFF", 0.20);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s}) rotate(${sw}deg)`, transformOrigin: "50% 4%" }}>
      {/* hanger: hook, shoulder bar, and the twist */}
      {hang && <>
        <div style={{ position: "absolute", left: 132, top: -46, width: 9, height: 40,
          borderRadius: 5, border: `5px solid ${BRASS}`, borderBottom: "none" }} />
        <div style={{ position: "absolute", left: 42, top: -8, width: 190, height: 9,
          borderRadius: 5, background: BRASS, transform: "rotate(2deg)" }} />
      </>}
      {/* the body of the robe — wide, heavy, a real silhouette */}
      <div style={{ position: "absolute", left: 30, top: 0, width: 214, height: 300,
        borderRadius: "56px 56px 14px 14px", background: v }} />
      <div style={{ position: "absolute", left: 30, top: 0, width: 80, height: 300,
        borderRadius: "56px 0 0 14px", background: vL, opacity: 0.5 }} />
      {/* sleeves, both, hanging past the body */}
      <div style={{ position: "absolute", left: -6, top: 46, width: 74, height: 216,
        borderRadius: "34px 12px 12px 30px", background: vD }} />
      <div style={{ position: "absolute", left: 208, top: 46, width: 74, height: 216,
        borderRadius: "12px 34px 30px 12px", background: vD }} />
      {/* the front opening + two velvet facings */}
      <div style={{ position: "absolute", left: 122, top: 24, width: 30, height: 276, background: vD }} />
      <div style={{ position: "absolute", left: 100, top: 20, width: 26, height: 280, borderRadius: 8, background: vL, opacity: 0.42 }} />
      <div style={{ position: "absolute", left: 148, top: 20, width: 26, height: 280, borderRadius: 8, background: vL, opacity: 0.42 }} />
      {/* three velvet bars on each sleeve — the "doctoral" tell */}
      {[0, 1, 2].map(i => (
        <React.Fragment key={"bar" + i}>
          <div style={{ position: "absolute", left: 0, top: 150 + i * 24, width: 62, height: 12, background: GOLD, opacity: 0.72 }} />
          <div style={{ position: "absolute", left: 214, top: 150 + i * 24, width: 62, height: 12, background: GOLD, opacity: 0.72 }} />
        </React.Fragment>
      ))}
      {/* the mortarboard, sat on the shoulder bar */}
      <div style={{ position: "absolute", left: 74, top: -54, width: 128, height: 15,
        borderRadius: 3, background: INK, transform: "rotate(-4deg)" }} />
      <div style={{ position: "absolute", left: 104, top: -44, width: 68, height: 26,
        borderRadius: "4px 4px 16px 16px", background: dkh(INK, -0.22) }} />
      {/* the tassel, on its own slower clock so it lags the robe */}
      <div style={{ position: "absolute", left: 190 + Math.sin(f / 13) * 6, top: -46,
        width: 5, height: 44, background: GOLD }} />
      <div style={{ position: "absolute", left: 182 + Math.sin(f / 13) * 6, top: -6,
        width: 22, height: 30, borderRadius: "3px 3px 11px 11px", background: GOLD }} />
    </div>
  );
};

/* ---- OFFENDER 2: THE INSTRUCTION BOARD -----------------------------------
   16 elements. Red DON'T or green DO, bolted across the hold mouth with visible
   fixings, so it is a physical obstruction rather than a sign floating there.
   ⭐ Its FACE is the receipt: Anthropic's own before/after pair, verbatim. */
export const Board: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; f: number;
  kind: "dont" | "do";
  /** 0..1 swing-down, 0 = up out of frame */
  down?: number;
  bolts?: number;
  /** the DO board points at one destination; the DON'T board points nowhere */
  arrow?: boolean;
}> = ({ x, y, w = 420, h = 176, z = 66, f, kind, down = 1, bolts = 3, arrow = false }) => {
  const c = kind === "dont" ? RED : VERD;
  const cD = dkh(c, 0.34), cL = mix3(c, "#FFFFFF", 0.18);
  const rot = (1 - down) * -74;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${rot}deg)` }}>
      {/* the plate, its lit top edge and its shaded underside */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, borderRadius: 7,
        background: c, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 9, borderRadius: "7px 7px 0 0", background: cL }} />
      <div style={{ position: "absolute", left: 0, top: h - 12, width: w, height: 12, borderRadius: "0 0 7px 7px", background: cD }} />
      {/* the inner rule, so it reads as a road sign rather than a coloured box */}
      <div style={{ position: "absolute", left: 13, top: 13, width: w - 26, height: h - 26,
        borderRadius: 4, border: `4px solid ${hexa("#FFFFFF", 0.5)}` }} />
      {/* ⭐ THE FACE: the verbatim source text */}
      <div style={{ position: "absolute", left: 26, top: kind === "dont" ? 44 : 30, width: w - 52,
        whiteSpace: "pre-line", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: kind === "dont" ? 27 : 24, lineHeight: 1.18, letterSpacing: 0.4,
        color: "#FFFFFF" }}>{kind === "dont" ? R.dont : R.do}</div>
      {/* bolts: heads with a slot and a shadow, driven one at a time */}
      {Array.from({ length: bolts }, (_, i) => {
        const px = 30 + i * ((w - 60) / Math.max(1, bolts - 1));
        return (
          <React.Fragment key={"bt" + i}>
            <div style={{ position: "absolute", left: px - 15, top: -13, width: 30, height: 30,
              borderRadius: "50%", background: STEEL }} />
            <div style={{ position: "absolute", left: px - 15, top: 1, width: 30, height: 16,
              borderRadius: "0 0 50% 50%", background: dkh(STEEL, 0.34) }} />
            <div style={{ position: "absolute", left: px - 9, top: -3, width: 18, height: 5, background: dkh(STEEL, 0.5) }} />
          </React.Fragment>
        );
      })}
      {/* the DO board names a destination and points at it. The DON'T board
          cannot: a negative instruction has no direction, which is the whole
          argument of S5 drawn as geometry rather than said. */}
      {arrow && (
        <>
          <div style={{ position: "absolute", left: w - 96, top: h - 62, width: 66, height: 15,
            borderRadius: 3, background: "#FFFFFF" }} />
          <div style={{ position: "absolute", left: w - 46, top: h - 76, width: 0, height: 0,
            borderTop: "22px solid transparent", borderBottom: "22px solid transparent",
            borderLeft: `28px solid #FFFFFF` }} />
        </>
      )}
    </div>
  );
};

/* ---- OFFENDER 3: THE TOOLBOX ---------------------------------------------
   14 elements. 186px wide so it clears the 40px moving-object floor after the
   1012->240 downsample. Each carries ONE real mark on a white tile — and the
   five ids are Anthropic's own worked example, not a set chosen to look good. */
export const Toolbox: React.FC<{ id: string; x: number; y: number; s?: number; z?: number;
  f: number; jolt?: number; open?: boolean; lit?: boolean }> =
  ({ id, x, y, s = 1, z = 62, f, jolt = 0, open = false, lit = false }) => {
  const c = lit ? mix3(STEEL, GOLD, 0.34) : STEEL, cD = dkh(c, 0.36), cL = mix3(c, "#FFFFFF", 0.2);
  return (
    <div style={{ position: "absolute", left: x, top: y + jolt, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 8, top: 128, width: 170, height: 18,
        borderRadius: 8, background: hexa(INK, 0.36) }} />
      {/* the case, its lit top and its shaded foot */}
      <div style={{ position: "absolute", left: 0, top: 26, width: 186, height: 112,
        borderRadius: 8, background: c }} />
      <div style={{ position: "absolute", left: 0, top: 26, width: 186, height: 12, borderRadius: "8px 8px 0 0", background: cL }} />
      <div style={{ position: "absolute", left: 0, top: 120, width: 186, height: 18, borderRadius: "0 0 8px 8px", background: cD }} />
      {/* the lid seam + two catches */}
      <div style={{ position: "absolute", left: 0, top: 58, width: 186, height: 5, background: cD,
        transform: `translateY(${open ? -13 : 0}px)` }} />
      <div style={{ position: "absolute", left: 24, top: 52, width: 20, height: 20, borderRadius: 3, background: BRASS }} />
      <div style={{ position: "absolute", left: 142, top: 52, width: 20, height: 20, borderRadius: 3, background: BRASS }} />
      {/* the handle, with its two stanchions */}
      <div style={{ position: "absolute", left: 62, top: 4, width: 62, height: 10, borderRadius: 5, background: dkh(c, 0.2) }} />
      <div style={{ position: "absolute", left: 62, top: 8, width: 9, height: 22, background: dkh(c, 0.2) }} />
      <div style={{ position: "absolute", left: 115, top: 8, width: 9, height: 22, background: dkh(c, 0.2) }} />
      {/* the real mark, on a white tile */}
      <Tile id={id} x={56} y={72} s={74} r={12} z={z + 4} />
      {/* the chain ring it hangs from */}
      <div style={{ position: "absolute", left: 84, top: 138, width: 22, height: 14,
        borderRadius: 8, border: `5px solid ${dkh(STEEL, 0.28)}` }} />
    </div>
  );
};

/** the chain itself, drawn as LINKS so it is a chain and not a rope. `taut`
    straightens the sag; the caller drives it from the van's motion. */
export const Chain: React.FC<{ x0: number; y0: number; x1: number; y1: number; n?: number;
  taut?: number; z?: number; c?: string }> =
  ({ x0, y0, x1, y1, n = 12, taut = 0, z = 58, c = dkh(STEEL, 0.3) }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const k = i / (n - 1);
    const sag = Math.sin(k * Math.PI) * 40 * (1 - taut);
    const lx = x0 + (x1 - x0) * k, ly = y0 + (y1 - y0) * k + sag;
    return (
      <div key={"ln" + i} style={{ position: "absolute", left: lx, top: ly, width: 28, height: 16,
        borderRadius: 9, border: `6px solid ${c}`, zIndex: z,
        transform: `rotate(${i % 2 ? 0 : 62}deg)` }} />
    );
  })}</>
);

/* ---- THE DEPOT SCALE -----------------------------------------------------
   21 elements. TWO dials in one frame: BULK on the left, WORTH on the right.
   ⭐ The two needles ARE the sentence — it costs a third of your window, and it
   is worth nothing. Neither number is typeset waiting; both TRAVEL to value. */
export const Scales: React.FC<{ x: number; y: number; s?: number; z?: number; f: number;
  bulk: number; worth: number; drop?: number; showWorth?: boolean }> =
  ({ x, y, s = 1, z = 50, f, bulk, worth, drop = 0, showWorth = true }) => {
  const face = CREAMB, rim = BRASS;
  const Dial = (dx: number, v: number, label: string, big: string, hot: boolean) => (
    <>
      <div style={{ position: "absolute", left: dx - 8, top: -8, width: 216, height: 216,
        borderRadius: "50%", background: dkh(rim, 0.22) }} />
      <div style={{ position: "absolute", left: dx, top: 0, width: 200, height: 200,
        borderRadius: "50%", background: face, boxShadow: SH_D }} />
      {/* ticks: 16 around the arc, every 4th long */}
      {Array.from({ length: 16 }, (_, i) => {
        const a = -Math.PI * 1.12 + (i / 15) * Math.PI * 1.24;
        const r1 = 82, r2 = i % 4 === 0 ? 62 : 72;
        return (
          <div key={"tk" + dx + i} style={{ position: "absolute",
            left: dx + 100 + Math.cos(a) * r2 - 2, top: 100 + Math.sin(a) * r2 - 2,
            width: 4, height: (r1 - r2) + 4, background: hexa(INK, i % 4 === 0 ? 0.6 : 0.3),
            transformOrigin: "50% 0%", transform: `rotate(${(a * 180) / Math.PI + 90}deg)` }} />
        );
      })}
      {/* the red danger arc on the bulk dial only */}
      {hot && <div style={{ position: "absolute", left: dx + 18, top: 18, width: 164, height: 164,
        borderRadius: "50%", border: `9px solid ${hexa(RED, 0.34)}`,
        clipPath: "polygon(50% 50%, 100% 0, 100% 60%)" }} />}
      {/* THE NEEDLE — travels to value */}
      <div style={{ position: "absolute", left: dx + 96, top: 34, width: 8, height: 70,
        borderRadius: 4, background: hot ? RED : INK, transformOrigin: "50% 94%",
        transform: `rotate(${-112 + v * 148}deg)` }} />
      <div style={{ position: "absolute", left: dx + 86, top: 86, width: 28, height: 28,
        borderRadius: "50%", background: dkh(rim, 0.1) }} />
      {/* the read-out window under the spindle */}
      <div style={{ position: "absolute", left: dx + 44, top: 124, width: 112, height: 52,
        borderRadius: 7, background: hexa(INK, 0.1) }} />
      <div style={{ position: "absolute", left: dx + 44, top: 122, width: 112, textAlign: "center",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, color: hot ? RED : INK }}>{big}</div>
      <div style={{ position: "absolute", left: dx, top: 184, width: 200, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15, letterSpacing: 2,
        color: hexa(INK, 0.62) }}>{label}</div>
    </>
  );
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      {/* the column and its foot */}
      <div style={{ position: "absolute", left: 190, top: 210, width: 34, height: 190, background: dkh(STEEL, 0.2) }} />
      <div style={{ position: "absolute", left: 128, top: 392, width: 158, height: 26, borderRadius: 7, background: dkh(STEEL, 0.36) }} />
      <div style={{ position: "absolute", left: 112, top: 412, width: 190, height: 16, borderRadius: 8, background: hexa(INK, 0.4) }} />
      {Dial(0, bulk, "BULK OF HOLD", R.robe.bulk, true)}
      {showWorth && Dial(224, worth, "WHAT IT BUYS", R.robe.worth, false)}
      {/* the pan, on two stays, which DROPS when the load seats */}
      <div style={{ position: "absolute", left: 96, top: 236 + drop, width: 12, height: 46,
        background: dkh(STEEL, 0.3), transform: "rotate(-15deg)" }} />
      <div style={{ position: "absolute", left: 306, top: 236 + drop, width: 12, height: 46,
        background: dkh(STEEL, 0.3), transform: "rotate(15deg)" }} />
      <div style={{ position: "absolute", left: 62, top: 276 + drop, width: 290, height: 20,
        borderRadius: 6, background: STEEL }} />
      <div style={{ position: "absolute", left: 62, top: 292 + drop, width: 290, height: 12,
        borderRadius: "0 0 6px 6px", background: dkh(STEEL, 0.4) }} />
    </div>
  );
};

/* ---- THE SLOT WALL -------------------------------------------------------
   The sorter's destinations. 15 slots, each with a lip, a number and a shadow.
   ⭐ `wrong` lights the one he posts into by mistake; `target` is where the DO
   board's arrow points. */
export const SlotWall: React.FC<{ x: number; y: number; z?: number; cols?: number; rows?: number;
  target?: number; wrong?: number; f: number }> =
  ({ x, y, z = 34, cols = 5, rows = 3, target = -1, wrong = -1, f }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: -14, top: -14, width: cols * 118 + 28,
      height: rows * 106 + 28, borderRadius: 8, background: dkh(WOODT, 0.5) }} />
    {Array.from({ length: cols * rows }, (_, i) => {
      const cx = (i % cols) * 118, cy = Math.floor(i / cols) * 106;
      const hot = i === target, bad = i === wrong;
      return (
        <React.Fragment key={"sl" + i}>
          <div style={{ position: "absolute", left: cx, top: cy, width: 106, height: 94,
            borderRadius: 5, background: hot ? mix3(WOODT, GOLD, 0.5) : bad ? mix3(WOODT, RED, 0.42) : dkh(WOODT, 0.22) }} />
          {/* the dark mouth — this is what makes it a slot and not a tile */}
          <div style={{ position: "absolute", left: cx + 9, top: cy + 9, width: 88, height: 66,
            borderRadius: 3, background: hexa(INK, hot ? 0.5 : 0.74) }} />
          <div style={{ position: "absolute", left: cx + 9, top: cy + 66, width: 88, height: 11,
            borderRadius: "0 0 3px 3px", background: mix3(WOODT, "#FFFFFF", 0.24) }} />
          <div style={{ position: "absolute", left: cx + 9, top: cy + 78, width: 88, textAlign: "center",
            fontFamily: MONO, fontWeight: 800, fontSize: 13, color: hexa(BONE, 0.72) }}>{i + 1}</div>
        </React.Fragment>
      );
    })}
  </div>
);

/* ---- THE LOCK-UP: PIGEONHOLES, THE LEVER, THE BELL -----------------------
   The fix, drawn as geometry. Five lit holes, a two-position lever whose brass
   plates carry the REAL in-product strings, and a call bell. */
export const Pigeonholes: React.FC<{ x: number; y: number; z?: number; f: number;
  /** how many boxes have seated, 0..5 */
  seated?: number; out?: number; ats: number[] }> =
  ({ x, y, z = 36, f, seated = 0, out = -1, ats }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: -18, top: -18, width: 5 * 152 + 36, height: 214,
      borderRadius: 8, background: dkh(WOODT, 0.62) }} />
    {R.servers.map((id, i) => {
      const on = i < seated, lf = f - ats[i];
      const isOut = i === out;
      return (
        <React.Fragment key={"ph" + i}>
          <div style={{ position: "absolute", left: i * 152, top: 0, width: 138, height: 178,
            borderRadius: 5, background: dkh(WOODT, 0.34) }} />
          <div style={{ position: "absolute", left: i * 152 + 10, top: 10, width: 118, height: 148,
            borderRadius: 3, background: hexa(INK, on ? 0.36 : 0.8) }} />
          {/* the lamp over each hole comes up as its box seats — a practical,
              a solid disc plus one ring, never an emissive blur */}
          {on && <>
            <div style={{ position: "absolute", left: i * 152 + 56, top: -32, width: 26, height: 26,
              borderRadius: "50%", background: SODIUM }} />
            <div style={{ position: "absolute", left: i * 152 + 22, top: -6, width: 94, height: 150,
              background: `linear-gradient(180deg, ${hexa(SODIUM, 0.30)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />
          </>}
          {on && !isOut && (
            <div style={{ position: "absolute", left: i * 152 + 26, top: 34 + settle(lf, 7),
              width: 86, height: 96, borderRadius: 6, background: dkh(STEEL, 0.18) }}>
              <Tile id={id} x={12} y={20} s={62} r={10} z={z + 6} />
            </div>
          )}
          {/* the runner each box slides out on */}
          <div style={{ position: "absolute", left: i * 152 + 10, top: 152, width: 118, height: 8,
            background: dkh(STEEL, 0.3) }} />
        </React.Fragment>
      );
    })}
  </div>
);

export const Lever: React.FC<{ x: number; y: number; z?: number; on: number; s?: number }> =
  ({ x, y, z = 64, on, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    {/* the back plate + its two fixings */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 250,
      borderRadius: 9, background: dkh(SLATE, 0.28), boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 12, top: 12, width: 18, height: 18, borderRadius: "50%", background: dkh(STEEL, 0.4) }} />
    <div style={{ position: "absolute", left: 270, top: 12, width: 18, height: 18, borderRadius: "50%", background: dkh(STEEL, 0.4) }} />
    {/* the two brass position plates — REAL in-product strings, verbatim */}
    <div style={{ position: "absolute", left: 18, top: 24, width: 264, height: 62, borderRadius: 6,
      background: on > 0.5 ? BRASS : dkh(BRASS, 0.55), display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 0.8,
        textAlign: "center", lineHeight: 1.1, color: on > 0.5 ? INK : hexa(BONE, 0.5) }}>{R.lever.on}</span>
    </div>
    <div style={{ position: "absolute", left: 18, top: 158, width: 264, height: 62, borderRadius: 6,
      background: on > 0.5 ? dkh(BRASS, 0.6) : BRASS, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 0.8,
        textAlign: "center", color: on > 0.5 ? hexa(BONE, 0.45) : INK }}>{R.lever.off}</span>
    </div>
    {/* the slot the handle runs in, and the handle itself */}
    <div style={{ position: "absolute", left: 288, top: 30, width: 26, height: 190, borderRadius: 13, background: hexa(INK, 0.6) }} />
    <div style={{ position: "absolute", left: 274, top: 30 + (1 - on) * 148, width: 54, height: 46,
      borderRadius: 10, background: STEEL }} />
    <div style={{ position: "absolute", left: 282, top: 38 + (1 - on) * 148, width: 38, height: 14,
      borderRadius: 7, background: mix3(STEEL, "#FFFFFF", 0.3) }} />
  </div>
);

export const CallBell: React.FC<{ x: number; y: number; z?: number; f: number; at: number }> =
  ({ x, y, z = 68, f, at }) => {
  const lf = f - at, hit = lf >= 0 && lf < 26;
  const sq = hit ? 1 - Math.exp(-lf / 4) * 0.16 : 1;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scaleY(${sq})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 0, top: 62, width: 108, height: 18, borderRadius: 6, background: dkh(BRASS, 0.42) }} />
      <div style={{ position: "absolute", left: 8, top: 14, width: 92, height: 54, borderRadius: "46px 46px 6px 6px", background: BRASS }} />
      <div style={{ position: "absolute", left: 22, top: 22, width: 26, height: 34, borderRadius: "20px 20px 4px 4px", background: mix3(BRASS, "#FFFFFF", 0.36) }} />
      <div style={{ position: "absolute", left: 44, top: 2, width: 20, height: 18, borderRadius: "50%", background: dkh(BRASS, 0.2) }} />
      {hit && <Ring x={54} y={40} f={f} at={at} c={BRASS} z={z + 2} s={0.55} dur={22} />}
    </div>
  );
};

/* ---- THE PAYOFF PROPS: THE MAP AND THE TAG -------------------------------
   ⛔ NOT CONTAINERS (§3). The map is not a box labelled "sources", it is a map
   with places pinned on it. The tag is not a label saying "check", its face is
   a checklist that ticks itself line by line. */
export const SourceMap: React.FC<{ x: number; y: number; z?: number; open: number; f: number }> =
  ({ x, y, z = 64, open, f }) => {
  const w = 120 + open * 400;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 8, top: 214, width: w - 16, height: 15,
        borderRadius: 7, background: hexa(INK, 0.34) }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 218, borderRadius: 5,
        background: CREAMB, boxShadow: SH_D }} />
      {/* the fold creases — this is what makes it a folded map */}
      {open > 0.25 && Array.from({ length: 4 }, (_, i) => (
        <div key={"fd" + i} style={{ position: "absolute", left: (w / 5) * (i + 1), top: 0,
          width: 3, height: 218, background: hexa(INK, 0.14) }} />
      ))}
      {/* routes: three polylines drawn as short bars */}
      {open > 0.4 && Array.from({ length: 18 }, (_, i) => (
        <div key={"rt" + i} style={{ position: "absolute", zIndex: z + 1,
          left: 22 + (i * 29) % (w - 60), top: 40 + ((i * 47) % 140),
          width: 34, height: 5, borderRadius: 3, transform: `rotate(${(i % 5) * 22 - 44}deg)`,
          background: hexa(i % 3 === 0 ? CLAY : MUTE, 0.62) }} />
      ))}
      {/* ⭐ the pins — REAL destinations, which is what makes it a source map */}
      {open > 0.6 && ["/docs", "repo/src", "CHANGELOG"].map((t, i) => (
        <React.Fragment key={"pin" + i}>
          <div style={{ position: "absolute", left: 54 + i * 158, top: 62 + (i % 2) * 74,
            width: 20, height: 20, borderRadius: "50% 50% 50% 0", zIndex: z + 3,
            transform: "rotate(-45deg)", background: RED }} />
          <div style={{ position: "absolute", left: 78 + i * 158, top: 62 + (i % 2) * 74,
            padding: "4px 8px", borderRadius: 5, zIndex: z + 3, background: hexa(INK, 0.82),
            fontFamily: MONO, fontWeight: 700, fontSize: 15, color: BONE }}>{t}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const CheckTag: React.FC<{ x: number; y: number; z?: number; f: number; at: number;
  ticks: number }> = ({ x, y, z = 66, f, at, ticks }) => {
  const lf = f - at;
  const sw = Math.sin(lf / 12) * 4.2 * Math.exp(-lf / 60);
  const L = ["RAN THE CHECK", "READ THE OUTPUT", "FIXED WHAT FAILED"];
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transformOrigin: "50% 0%", transform: `rotate(${sw}deg)` }}>
      {/* the lanyard */}
      <div style={{ position: "absolute", left: 84, top: -74, width: 7, height: 78, background: dkh(CLAY, 0.3) }} />
      <div style={{ position: "absolute", left: 74, top: -84, width: 28, height: 18,
        borderRadius: 9, border: `5px solid ${STEEL}` }} />
      {/* the card, with the punched eyelet */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 180, height: 168, borderRadius: 8,
        background: PAPER, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 80, top: 10, width: 20, height: 20,
        borderRadius: "50%", background: hexa(INK, 0.24) }} />
      {L.map((t, i) => (
        <React.Fragment key={"tk" + i}>
          <div style={{ position: "absolute", left: 14, top: 46 + i * 40, width: 26, height: 26,
            borderRadius: 5, border: `4px solid ${hexa(INK, 0.4)}`,
            background: i < ticks ? VERD : "transparent" }} />
          {i < ticks && (
            <div style={{ position: "absolute", left: 22, top: 55 + i * 40, width: 15, height: 8,
              borderLeft: `5px solid ${PAPER}`, borderBottom: `5px solid ${PAPER}`,
              transform: "rotate(-45deg)" }} />
          )}
          <div style={{ position: "absolute", left: 50, top: 52 + i * 40, width: 122,
            fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 14, letterSpacing: 0.3,
            color: hexa(INK, i < ticks ? 0.86 : 0.4) }}>{t}</div>
        </React.Fragment>
      ))}
    </div>
  );
};

/* ---- THE DEPOT WALL GAUGE ------------------------------------------------
   ⛔ HONESTY: labelled `PER SESSION`, never `DEFAULT`. See the ledger in
   MstWorld. It drops in DISCRETE stepped notches, never a smooth drain —
   an 82-frame smooth tween measured 4.27, WORSE than what it replaced (§9). */
export const Gauge: React.FC<{ x: number; y: number; z?: number; v: number; label?: string;
  s?: number }> = ({ x, y, z = 52, v, label = "PER SESSION", s = 1 }) => {
  const N = 12, lit = Math.round(v * N);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: -14, top: -14, width: 168, height: 396,
        borderRadius: 9, background: dkh(SLATE, 0.36), boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 140, height: 340, borderRadius: 5,
        background: hexa(INK, 0.6) }} />
      {Array.from({ length: N }, (_, i) => {
        const on = i < lit, hot = i >= N - 3;
        return (
          <div key={"sg" + i} style={{ position: "absolute", left: 10, top: 330 - (i + 1) * 27,
            width: 120, height: 21, borderRadius: 3,
            background: on ? (hot ? RED : mix3(GOLD, EMBER, i / N)) : hexa(BONE, 0.09) }} />
        );
      })}
      <div style={{ position: "absolute", left: -14, top: 346, width: 168, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 16, letterSpacing: 1.6,
        color: hexa(BONE, 0.8) }}>{label}</div>
    </div>
  );
};

/* ---- CTA: THE GUIDE ------------------------------------------------------
   A real bound document — a spine, a block of leaves, a cover — not a card. */
export const Guide: React.FC<{ x: number; y: number; z?: number; f: number; at: number;
  n: string }> = ({ x, y, z = 70, f, at, n }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0.7, 1, BACK);
  const bob = settle(lf - 8, 8);
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, zIndex: z,
      transform: `scale(${inS})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: 14, top: 306, width: 260, height: 20,
        borderRadius: 9, background: hexa(INK, 0.4) }} />
      {/* the leaf block, offset, so it has thickness */}
      {[0, 1, 2].map(i => (
        <div key={"lf" + i} style={{ position: "absolute", left: 10 + i * 4, top: 8 + i * 3,
          width: 264, height: 300, borderRadius: 6, background: mix3(PAPER, MUTE, 0.14 + i * 0.1) }} />
      ))}
      <div style={{ position: "absolute", left: 0, top: 0, width: 268, height: 306, borderRadius: 7,
        background: CREAMB, boxShadow: SH_D }} />
      {/* the spine */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: 306,
        borderRadius: "7px 0 0 7px", background: CLAY }} />
      <div style={{ position: "absolute", left: 26, top: 0, width: 6, height: 306, background: dkh(CLAY, 0.3) }} />
      {/* the cover: the count, its label, and a rule */}
      <div style={{ position: "absolute", left: 52, top: 48, fontFamily: fraunces.fontFamily,
        fontWeight: 900, fontSize: 128, lineHeight: 0.9, color: INK }}>{n}</div>
      <div style={{ position: "absolute", left: 54, top: 190, width: 180, height: 5, background: hexa(INK, 0.3) }} />
      <div style={{ position: "absolute", left: 54, top: 208, width: 190,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25, lineHeight: 1.1,
        letterSpacing: 0.4, color: hexa(INK, 0.82) }}>MISTAKES{"\n"}TO AVOID</div>
    </div>
  );
};

/* ---- a parcel, for the sorter beats -------------------------------------- */
export const Parcel: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  i?: number }> = ({ x, y, s = 1, z = 60, rot = 0, i = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s}) rotate(${rot}deg)`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", left: 4, top: 62, width: 84, height: 12, borderRadius: 6, background: hexa(INK, 0.3) }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 92, height: 68, borderRadius: 5,
      background: mix3(WOODT, BONE, 0.44 + (i % 3) * 0.08) }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 92, height: 8, borderRadius: "5px 5px 0 0", background: mix3(WOODT, "#FFFFFF", 0.34) }} />
    <div style={{ position: "absolute", left: 38, top: 0, width: 16, height: 68, background: hexa(CLAY, 0.6) }} />
    <div style={{ position: "absolute", left: 0, top: 28, width: 92, height: 12, background: hexa(CLAY, 0.6) }} />
    <div style={{ position: "absolute", left: 8, top: 44, width: 26, height: 16, borderRadius: 2, background: hexa(PAPER, 0.8) }} />
  </div>
);

/* ---- THE HOOK'S HERO: THE VAN, THREE-QUARTER REAR -------------------------
   34 elements.

   ⛔⛔⛔ THE SIDE VIEW CANNOT SHOW A DOOR OPENING, AND THAT COST THE HOOK TWO
      RENDERS. `Van` draws the rear leaf 30px wide seen EDGE-ON; swinging it
      changed 35 screen pixels, so the one thing the whole open is about — a
      door that will not shut — was invisible on the frame that is guaranteed
      to be seen. No amount of repositioning fixes it, because the ANGLE was
      wrong, not the placement.

   ⭐ THE RULE THIS IS AN INSTANCE OF: an object is recognised by its
      SILHOUETTE, and a silhouette needs the angle that HAS one. Before moving a
      prop around the frame, ask whether the camera can see the action from
      where it is standing.

   ⛔ The leaves use `perspective(900px) rotateY()`. A bare `rotateY` with no
      perspective is an orthographic squash — it just gets narrower and reads as
      a shrinking rectangle, not as a door coming toward you. */
export const VanRear: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; f: number;
  /** 0..1 how far the right leaf stands open */
  door?: number;
  bounce?: number;
  /** 0..1 of the hold height that is occupied */
  fill?: number;
  children?: React.ReactNode;
  /** drawn on the CLOSED leaf, in van-local coords */
  manifest?: React.ReactNode;
}> = ({ p, x, y, s = 1, z = 40, f, door = 0, bounce = 0, fill = 0.9, children, manifest }) => {
  const body = OXIDE, bodyD = dkh(OXIDE, 0.38), bodyL = mix3(OXIDE, "#FFFFFF", 0.14);
  const inner = dkh(OXIDE, 0.68);
  const ang = door * 74;
  return (
    /* ⛔ transformOrigin is 0% 0% ON PURPOSE: with "50% 100%" on a wrapper that
       has no intrinsic size, the origin lands on the bbox of whatever happens to
       be drawn, so every placement calculation is guesswork. This way
       screen = x + local * s, and the geometry can be SOLVED rather than nudged. */
    <div style={{ position: "absolute", left: x, top: y + bounce, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "0% 0%" }}>
      {/* 1 · the ground contact — a solid patch, never a blur. ⛔ It sits UNDER
          the wheels only; v1 ran it 780px wide and the van read as a plinth. */}
      <div style={{ position: "absolute", left: -30, top: 546, width: 640, height: 34,
        borderRadius: "50%", background: hexa(INK, 0.30), filter: "blur(7px)" }} />

      {/* 2-4 · the body receding to the left in three-quarter */}
      <div style={{ position: "absolute", left: -232, top: 34, width: 292, height: 452,
        background: bodyD, transform: "skewY(6.5deg)", transformOrigin: "100% 0%" }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"sr" + i} style={{ position: "absolute", left: -204 + i * 62, top: 44,
          width: 8, height: 420, background: hexa(INK, 0.16),
          transform: "skewY(6.5deg)", transformOrigin: "100% 0%" }} />
      ))}
      <div style={{ position: "absolute", left: -236, top: 18, width: 300, height: 20,
        background: bodyL, transform: "skewY(6.5deg)", transformOrigin: "100% 0%" }} />

      {/* 5-6 · the rear frame: a dark surround with a lit top edge */}
      <div style={{ position: "absolute", left: 40, top: 22, width: 560, height: 470,
        borderRadius: 8, background: body }} />
      <div style={{ position: "absolute", left: 34, top: 10, width: 572, height: 20,
        borderRadius: 6, background: bodyL }} />
      <div style={{ position: "absolute", left: 40, top: 438, width: 560, height: 54, background: bodyD }} />

      {/* 7-9 · THE HOLD — the dark interior, its floor in perspective, and the
          painted LOAD LINE that the whole reel is measured against */}
      <div style={{ position: "absolute", left: 76, top: 52, width: 488, height: 386,
        background: `linear-gradient(180deg, ${dkh(inner, 0.3)} 0%, ${inner} 56%, ${dkh(inner, 0.12)} 100%)` }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"hf" + i} style={{ position: "absolute", left: 84 + i * 6, top: 392 + i * 8,
          width: 472 - i * 12, height: 7, background: i % 2 ? WOODT : mix3(WOODT, "#FFFFFF", 0.2),
          opacity: 0.42 + i * 0.08 }} />
      ))}
      <div style={{ position: "absolute", left: 84, top: 148, width: 472, height: 7, background: GOLD, opacity: 0.9 }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"hz" + i} style={{ position: "absolute", left: 88 + i * 39, top: 136,
          width: 13, height: 12, transform: "skewX(-26deg)", background: hexa(GOLD, 0.4) }} />
      ))}
      {/* 10 · what is inside — passed in, so the hook owns the load */}
      {children}
      {/* 11 · the fill mass, whose TOP EDGE is the number moving to its value */}
      {fill > 0 && (
        <div style={{ position: "absolute", left: 84, top: 428 - 352 * fill, width: 472,
          height: 352 * fill, background: hexa(RED, 0.16) }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 5, background: hexa(RED, 0.7) }} />
        </div>
      )}

      {/* 12-16 · THE LEFT LEAF, closed. Hinge straps, a rib, a handle. */}
      <div style={{ position: "absolute", left: 46, top: 30, width: 252, height: 454,
        borderRadius: "4px 2px 2px 4px", background: bodyD }} />
      <div style={{ position: "absolute", left: 46, top: 30, width: 252, height: 12, background: bodyL, opacity: 0.5 }} />
      <div style={{ position: "absolute", left: 66, top: 60, width: 212, height: 394,
        border: `5px solid ${hexa(INK, 0.22)}`, borderRadius: 3 }} />
      {[74, 380].map((ty, i) => (
        <div key={"lh" + i} style={{ position: "absolute", left: 34, top: ty, width: 58, height: 30,
          borderRadius: 4, background: STEEL }} />
      ))}
      <div style={{ position: "absolute", left: 272, top: 224, width: 18, height: 68,
        borderRadius: 9, background: mix3(STEEL, "#FFFFFF", 0.2) }} />
      {/* ⭐ THE MANIFEST — the frame-0 claim plate, mounted ON the closed leaf.
          It is not an overlay competing with the van for attention; it is the
          paperwork that belongs on the back of a van, which is what lets it be
          this big without becoming a second subject
          ([[feedback_hook_simplicity]] — a hook is an IMAGE, one subject). */}
      {manifest}

      {/* 17-23 · THE RIGHT LEAF, SWINGING TOWARD CAMERA. This is the subject. */}
      <div style={{ position: "absolute", left: 342, top: 30, width: 252, height: 454,
        transformOrigin: "100% 50%",
        transform: `perspective(900px) rotateY(-${ang}deg)`,
        background: bodyD, borderRadius: "2px 4px 4px 2px" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 252, height: 12, background: bodyL, opacity: 0.5 }} />
        <div style={{ position: "absolute", left: 22, top: 30, width: 208, height: 394,
          border: `5px solid ${hexa(INK, 0.22)}`, borderRadius: 3 }} />
        {/* the INNER face catches the light as it swings — this is the cue that
            says "coming toward you" rather than "getting narrower" */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 252, height: 454,
          background: hexa(BONE, door * 0.16) }} />
        <div style={{ position: "absolute", left: 8, top: 224, width: 18, height: 68,
          borderRadius: 9, background: mix3(STEEL, "#FFFFFF", 0.2) }} />
      </div>
      {[74, 380].map((ty, i) => (
        <div key={"rh" + i} style={{ position: "absolute", left: 548, top: ty, width: 58, height: 30,
          borderRadius: 4, background: STEEL }} />
      ))}

      {/* 24-28 · bumper, plate, two lamps, the hitch and its tow ball */}
      <div style={{ position: "absolute", left: 22, top: 486, width: 596, height: 34,
        borderRadius: 6, background: STEEL }} />
      <div style={{ position: "absolute", left: 22, top: 508, width: 596, height: 14,
        borderRadius: "0 0 6px 6px", background: dkh(STEEL, 0.4) }} />
      <div style={{ position: "absolute", left: 250, top: 446, width: 140, height: 38,
        borderRadius: 4, background: CREAMB }} />
      <div style={{ position: "absolute", left: 250, top: 452, width: 140, textAlign: "center",
        whiteSpace: "nowrap", fontFamily: MONO, fontWeight: 800,
        fontSize: 22, letterSpacing: 0.5, color: hexa(INK, 0.7) }}>CTX 55K</div>
      {[60, 540].map((lx, i) => (
        <div key={"lp" + i} style={{ position: "absolute", left: lx, top: 448, width: 46, height: 34,
          borderRadius: 5, background: i ? RED : mix3(RED, GOLD, 0.5) }} />
      ))}
      <div style={{ position: "absolute", left: 296, top: 518, width: 48, height: 30, background: dkh(STEEL, 0.3) }} />
      <div style={{ position: "absolute", left: 302, top: 540, width: 36, height: 36,
        borderRadius: "50%", background: STEEL }} />

      {/* 29-34 · the rear wheels, just visible under the body */}
      {[-52, 470].map((wx, i) => (
        <React.Fragment key={"rw" + i}>
          <div style={{ position: "absolute", left: wx, top: 470, width: 118, height: 96,
            borderRadius: "50%", background: "#26241F" }} />
          <div style={{ position: "absolute", left: wx + 30, top: 500, width: 58, height: 58,
            borderRadius: "50%", background: STEEL }} />
          <div style={{ position: "absolute", left: wx + 48, top: 518, width: 20, height: 20,
            borderRadius: "50%", background: dkh(STEEL, 0.36) }} />
        </React.Fragment>
      ))}
    </div>
  );
};
