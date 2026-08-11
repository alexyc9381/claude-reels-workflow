import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import { Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, mix, dark, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, Plate, Contact, Beam,
} from "./NomWorld";

/* ===========================================================================
   REEL 98 "NOMAD" — THE OBJECTS. Board: storyboards/98-nomad.md.

   ⛔ SET-AND-LIGHT §5, draw-don't-stack: flat MANUFACTURED faces (the door, the
      box, the racks, the meter, the cage) are div-built, which the medium
      renders cleanly. Anything round or mechanical — the wheel lock, the
      compass rose, the mast lattice — is REAL SVG PATH GEOMETRY, because
      stacked divs render those as mush.
   ⛔ Every object is shaded the same way: flat base + ONE shade face + ONE
      highlight + a contact shadow. Four deliberate values, never six stacked
      translucent gradients.
   ========================================================================= */

const CONC = "#8A8579", CONCD = "#605C53", CONCL = "#A39D8E";   // poured concrete
const STEEL = "#6E747C", STEELD = "#474C53", STEELL = "#98A0A9"; // the door, the racks
const OLIVE = "#4C5340", OLIVED = "#343A2B", OLIVEL = "#666E55"; // the box

/* =========================================================================
   THE PORTAL — the concrete wedge in the ridge with one slot of light in it.
   The hook's ONE dominant object.
   ====================================================================== */
export const Portal: React.FC<{ x: number; base: number; s?: number; z?: number;
  slot?: number; f?: number }> =
  ({ x, base, s = 1, z = 30, slot = 1, f = 0 }) => {
  const w = 300 * s, h = 232 * s;
  return (<>
    <Contact x={x - w * 0.62} y={base - 12 * s} w={w * 1.24} z={z - 2} o={0.30} />
    {/* the wedge: a solid mass with one lit face and one shade face */}
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h,
      zIndex: z, background: CONC, boxShadow: SH_D,
      clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w * 0.30, height: h,
      zIndex: z + 1, background: CONCD,
      clipPath: "polygon(46% 0, 100% 0, 100% 100%, 0 100%)" }} />
    {/* ⛔ THE TOP HIGHLIGHT MUST CARRY THE SAME CLIP AS THE MASS. Without it the
        bar ran the full width and two beige wings stuck out either side of the
        wedge like a diving board. */}
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h,
      zIndex: z + 2, background: `linear-gradient(180deg, ${CONCL} 0%, ${CONCL} ${(9 / h) * 100}%, transparent ${(9 / h) * 100}%)`,
      clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)" }} />
    {/* form-tie holes: the detail that says POURED concrete */}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"tt" + i} style={{ position: "absolute",
        left: x - w * 0.30 + (i % 4) * w * 0.20, top: base - h + 40 * s + Math.floor(i / 4) * 74 * s,
        width: 7 * s, height: 7 * s, borderRadius: 5, background: CONCD, zIndex: z + 3 }} />
    ))}
    {/* ⛔ THE OPENING IS A DOORWAY, NOT A GLOWING BAR. The first cut drew a 42px
        rounded-top strip and it read as a pill stuck on a plinth. A doorway
        needs a SURROUND (jambs + a lintel in the parent material), a DARK
        interior, and the light living inside that opening — then the eye reads
        "a way in" instead of "a lit shape". */}
    <div style={{ position: "absolute", left: x - 74 * s, top: base - h * 0.66 - 16 * s,
      width: 148 * s, height: h * 0.66 + 16 * s, zIndex: z + 4, background: CONCD,
      borderRadius: `${74 * s}px ${74 * s}px 0 0` }} />
    <div style={{ position: "absolute", left: x - 60 * s, top: base - h * 0.62,
      width: 120 * s, height: h * 0.62, zIndex: z + 5, background: "#22262C",
      borderRadius: `${60 * s}px ${60 * s}px 0 0` }} />
    {slot > 0 && (<>
      <div style={{ position: "absolute", left: x - 52 * s, top: base - h * 0.58,
        width: 104 * s, height: h * 0.58, zIndex: z + 6, background: "#E8CE97",
        opacity: 0.45 + slot * 0.55, borderRadius: `${52 * s}px ${52 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: x - 34 * s, top: base - h * 0.50,
        width: 68 * s, height: h * 0.50, zIndex: z + 7, background: "#FBEFD2",
        opacity: slot, borderRadius: `${34 * s}px ${34 * s}px 0 0` }} />
      {/* the haze the opening throws back onto its own face */}
      <div style={{ position: "absolute", left: x - 150 * s, top: base - h * 0.86,
        width: 300 * s, height: h * 0.86, zIndex: z + 3, borderRadius: "50%",
        background: `radial-gradient(ellipse at 50% 72%, ${hexa("#F2D79E", 0.32 * slot)} 0%, ${hexa("#F2D79E", 0)} 70%)` }} />
      {/* the spill on the snow in front of it */}
      <div style={{ position: "absolute", left: x - 130 * s, top: base - 8 * s,
        width: 260 * s, height: 104 * s, zIndex: z - 1,
        background: `linear-gradient(180deg, ${hexa("#EED9AC", 0.50 * slot)} 0%, ${hexa("#EED9AC", 0)} 100%)`,
        clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)" }} />
    </>)}
    {/* snow settled on the top of the wedge — a soft cap, not a bright bar */}
    <div style={{ position: "absolute", left: x - w * 0.38, top: base - h - 9 * s,
      width: w * 0.76, height: 20 * s, borderRadius: `${16 * s}px ${16 * s}px 0 0`,
      background: "#DDE5EC", zIndex: z + 8 }} />
    <div style={{ position: "absolute", left: x - w * 0.38, top: base - h + 4 * s,
      width: w * 0.76, height: 7 * s, background: "#BCCAD6", zIndex: z + 8 }} />
  </>);
};

/* =========================================================================
   ⛔⛔ THE BUNKER — the hook's subject, rebuilt at SCALE and in TIERS.

   v1 drew a 300px concrete wedge sitting alone in the middle of a wide snow
   plain. Alex: *"the beginning scene even bigger, more hierarchical and like a
   bunker."* He is right: one small mass in a large empty frame has no
   hierarchy, because hierarchy is a RELATIONSHIP and there was nothing for it
   to be in a relationship with.

   This is built as a stack of tiers that read at a glance in descending size:
     1  the BERM      a wide earth mound the whole thing is set into
     2  the MASS      a battered concrete block, 520 wide and 400 tall
     3  the TIER      a smaller upper block set back on top of it
     4  the STACK     a vent tower and a lattice antenna above that
     5  the GANTRY    a lit beam over the door, with working floodlights
     6  the DOOR      the one warm thing, at the bottom of the pile
   Plus the things that say "this is defended, not decorative": hazard chevrons,
   a rotating amber lamp, buttresses, a bay stencil and a stair.
   ====================================================================== */
export const Bunker: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  slot?: number; floods?: number; lamp?: number; shutter?: number; vent?: number;
  floodSeq?: [number, number, number] }> =
  ({ x, base, s = 1, z = 30, f = 0, slot = 1, floods = 1, lamp = 1, shutter = 0, vent = 0,
     floodSeq }) => {
  const W2 = 520 * s, Hm = 400 * s;            // the main mass
  const top = base - Hm;
  const tierW = 330 * s, tierH = 96 * s;
  const rot = (f * 3.4) % 360;                  // the hazard lamp
  const flick = floods * (0.80 + 0.20 * Math.sin(f / 3.1) * (rnd(Math.floor(f / 17), 2) > 0.12 ? 1 : -3));
  return (<>
    {/* 1 · THE BERM — the mound it is set into. Reads as dug in, not placed. */}
    <div style={{ position: "absolute", left: x - W2 * 0.95, top: base - 66 * s,
      width: W2 * 1.9, height: 120 * s, zIndex: z - 3, background: dark(CONC, 0.34),
      clipPath: "polygon(9% 0, 91% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: x - W2 * 0.95, top: base - 66 * s,
      width: W2 * 1.9, height: 20 * s, zIndex: z - 2, background: "#CFCCC4",
      clipPath: "polygon(9% 0, 91% 0, 96% 100%, 4% 100%)" }} />

    {/* 4 · THE STACK — a vent tower and a lattice mast, the top of the pile */}
    <div style={{ position: "absolute", left: x + W2 * 0.20, top: top - tierH - 128 * s,
      width: 74 * s, height: 132 * s, zIndex: z, background: CONCD }} />
    <div style={{ position: "absolute", left: x + W2 * 0.20, top: top - tierH - 128 * s,
      width: 74 * s, height: 14 * s, zIndex: z + 1, background: CONCL }} />
    <div style={{ position: "absolute", left: x + W2 * 0.20 - 12 * s, top: top - tierH - 146 * s,
      width: 98 * s, height: 22 * s, zIndex: z + 1, background: STEELD, borderRadius: 4 }} />
    <svg width={90 * s} height={150 * s} viewBox="0 0 90 150"
      style={{ position: "absolute", left: x - W2 * 0.34, top: top - tierH - 150 * s, zIndex: z }}>
      <line x1={26} y1={150} x2={45} y2={6} stroke={dark(STEELD, 0.2)} strokeWidth={5} />
      <line x1={64} y1={150} x2={45} y2={6} stroke={dark(STEELD, 0.2)} strokeWidth={5} />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={28 + i * 3} y1={140 - i * 22} x2={62 - i * 3} y2={140 - i * 22}
          stroke={dark(STEELD, 0.1)} strokeWidth={4} />
      ))}
      <circle cx={45} cy={6} r={7}
        fill={Math.floor(f / 14) % 2 ? "#C44A3A" : dark("#C44A3A", 0.5)} />
    </svg>

    {/* 3 · THE UPPER TIER, set back */}
    <div style={{ position: "absolute", left: x - tierW / 2, top: top - tierH, width: tierW,
      height: tierH, zIndex: z + 2, background: mix(CONC, 0.06), boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - tierW / 2, top: top - tierH, width: tierW,
      height: 13 * s, zIndex: z + 3, background: "#D5D2CA" }} />
    <div style={{ position: "absolute", left: x - tierW / 2, top: top - tierH * 0.52,
      width: tierW * 0.30, height: tierH * 0.34, zIndex: z + 3, background: "#2A2E34",
      marginLeft: tierW * 0.10 }} />
    {/* the rotating amber hazard lamp on the tier's corner */}
    {lamp > 0 && (<>
      <div style={{ position: "absolute", left: x + tierW * 0.38, top: top - tierH - 30 * s,
        width: 26 * s, height: 30 * s, zIndex: z + 6, background: STEELD, borderRadius: 4 }} />
      <div style={{ position: "absolute", left: x + tierW * 0.38 + 3 * s, top: top - tierH - 26 * s,
        width: 20 * s, height: 18 * s, zIndex: z + 7, background: "#E0A542", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: x + tierW * 0.38 - 92 * s, top: top - tierH - 74 * s,
        width: 150 * s, height: 84 * s, zIndex: z + 5, transform: `rotate(${rot}deg)`,
        transformOrigin: "50% 30%",
        background: `linear-gradient(90deg, ${hexa("#E0A542", 0)} 0%, ${hexa("#E0A542", 0.28 * lamp)} 50%, ${hexa("#E0A542", 0)} 100%)`,
        clipPath: "polygon(44% 0, 56% 0, 100% 100%, 0 100%)" }} />
    </>)}

    {/* 2 · THE MASS — battered face, buttresses, form ties, bay stencil */}
    <div style={{ position: "absolute", left: x - W2 / 2, top, width: W2, height: Hm, zIndex: z + 4,
      background: CONC, boxShadow: SH_D, clipPath: "polygon(6% 0, 94% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: x - W2 / 2, top, width: W2 * 0.30, height: Hm,
      zIndex: z + 5, background: CONCD, clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: x - W2 / 2, top, width: W2, height: Hm, zIndex: z + 5,
      clipPath: "polygon(6% 0, 94% 0, 94.6% 4%, 5.4% 4%)", background: CONCL }} />
    {[0, 1].map((i) => (
      <div key={"bt" + i} style={{ position: "absolute",
        left: x + (i ? W2 * 0.40 : -W2 * 0.52), top: top + Hm * 0.30, width: W2 * 0.12,
        height: Hm * 0.70, zIndex: z + 6, background: i ? CONCD : mix(CONC, 0.04),
        clipPath: i ? "polygon(0 0, 100% 26%, 100% 100%, 0 100%)"
                    : "polygon(0 26%, 100% 0, 100% 100%, 0 100%)" }} />
    ))}
    {Array.from({ length: 15 }, (_, i) => (
      <div key={"ft" + i} style={{ position: "absolute",
        left: x - W2 * 0.36 + (i % 5) * W2 * 0.18,
        top: top + 46 * s + Math.floor(i / 5) * 74 * s,
        width: 8 * s, height: 8 * s, borderRadius: 5, background: CONCD, zIndex: z + 7 }} />
    ))}
    <div style={{ position: "absolute", left: x - W2 * 0.44, top: top + 40 * s, zIndex: z + 8,
      fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 78 * s, lineHeight: 1,
      color: CONCD, opacity: 0.44 }}>08</div>
    {/* hazard chevrons across the base — the "this is defended" signal */}
    <div style={{ position: "absolute", left: x - W2 * 0.52, top: base - 46 * s, width: W2 * 1.04,
      height: 26 * s, zIndex: z + 9, overflow: "hidden", background: "#3A3630" }}>
      {Array.from({ length: 18 }, (_, i) => (
        <div key={"cv" + i} style={{ position: "absolute", left: i * 40 * s - 24 * s, top: -6 * s,
          width: 20 * s, height: 40 * s, background: "#D0A64A",
          transform: "skewX(-26deg)" }} />
      ))}
    </div>

    {/* 5 · THE GANTRY — a beam over the door carrying three working floods */}
    <div style={{ position: "absolute", left: x - W2 * 0.46, top: top + Hm * 0.36, width: W2 * 0.92,
      height: 17 * s, zIndex: z + 12, background: STEELD, boxShadow: SH }} />
    {[-1, 0, 1].map((k, i) => (
      <React.Fragment key={"fl" + i}>
        <div style={{ position: "absolute", left: x + k * W2 * 0.30 - 22 * s,
          top: top + Hm * 0.36 + 15 * s, width: 44 * s, height: 26 * s, zIndex: z + 13,
          background: "#33383F", borderRadius: `0 0 ${8 * s}px ${8 * s}px` }} />
        <div style={{ position: "absolute", left: x + k * W2 * 0.30 - 15 * s,
          top: top + Hm * 0.36 + 36 * s, width: 30 * s, height: 8 * s, zIndex: z + 14,
          background: "#F2E3BC",
          opacity: 0.30 + flick * 0.70 * (floodSeq ? floodSeq[i] : 1), borderRadius: 3 }} />
        <div style={{ position: "absolute", left: x + k * W2 * 0.30 - 78 * s,
          top: top + Hm * 0.36 + 42 * s, width: 156 * s, height: 200 * s, zIndex: z + 10,
          background: `linear-gradient(180deg, ${hexa("#F2E3BC", 0.24 * flick * (floodSeq ? floodSeq[i] : 1))} 0%, ${hexa("#F2E3BC", 0)} 100%)`,
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
      </React.Fragment>
    ))}

    {/* 6 · THE DOOR — recessed, arched, and the only warm thing in the pile */}
    <div style={{ position: "absolute", left: x - 108 * s, top: base - 268 * s, width: 216 * s,
      height: 268 * s, zIndex: z + 15, background: CONCD,
      borderRadius: `${108 * s}px ${108 * s}px 0 0` }} />
    <div style={{ position: "absolute", left: x - 90 * s, top: base - 250 * s, width: 180 * s,
      height: 250 * s, zIndex: z + 16, background: "#22262C",
      borderRadius: `${90 * s}px ${90 * s}px 0 0` }} />
    {slot > 0 && (<>
      <div style={{ position: "absolute", left: x - 74 * s, top: base - 232 * s, width: 148 * s,
        height: 232 * s, zIndex: z + 17, background: "#E8CE97", opacity: 0.42 + slot * 0.58,
        borderRadius: `${74 * s}px ${74 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: x - 48 * s, top: base - 206 * s, width: 96 * s,
        height: 206 * s, zIndex: z + 18, background: "#FBEFD2", opacity: slot,
        borderRadius: `${48 * s}px ${48 * s}px 0 0` }} />
      <div style={{ position: "absolute", left: x - 200 * s, top: base - 6 * s, width: 400 * s,
        height: 138 * s, zIndex: z - 1,
        background: `linear-gradient(180deg, ${hexa("#EED9AC", 0.50 * slot)} 0%, ${hexa("#EED9AC", 0)} 100%)`,
        clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)" }} />
    </>)}
    {/* ⭐ THE OUTER SHUTTER. Alex asked for an opening door in the hook; the
        BLAST door already opens in shot D, so repeating it there would spend the
        same beat twice. This is the roller shutter in front of it, and it rises
        during shot A — a genuine reveal, on a different object. */}
    {shutter > 0.002 && (
      <div style={{ position: "absolute", left: x - 92 * s, top: base - 252 * s, width: 184 * s,
        height: 252 * s * shutter, zIndex: z + 19, overflow: "hidden",
        background: "#5E646C", borderRadius: `${8 * s}px ${8 * s}px 0 0` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 22 * s,
            height: 18 * s, background: i % 2 ? "#525860" : "#6A7078" }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 12 * s,
          background: "#3E434A" }} />
      </div>
    )}
    {/* ⭐ THE STACK VENTS. Three puffs on a loop, drifting up and out. */}
    {vent > 0 && Array.from({ length: 3 }, (_, i) => {
      const t2 = ((f * 0.9 + i * 40) % 120) / 120;
      const sz = (18 + t2 * 68) * s;
      return <div key={"vp" + i} style={{ position: "absolute",
        left: x + W2 * 0.20 + 22 * s - sz / 2 + t2 * 66 * s,
        top: base - Hm - tierH - 146 * s - t2 * 130 * s,
        width: sz, height: sz * 0.72, borderRadius: "50%", background: "#B9B3AA",
        opacity: (1 - t2) * 0.42 * vent, zIndex: z + 1 }} />;
    })}
    {/* the stair up to the threshold, so the door is reachable */}
    {[0, 1, 2].map((i) => (
      <div key={"st" + i} style={{ position: "absolute", left: x - (118 + i * 22) * s,
        top: base - 4 * s + i * 15 * s, width: (236 + i * 44) * s, height: 16 * s,
        zIndex: z + 14 - i, background: i % 2 ? CONCD : CONC }} />
    ))}
    {/* ash and snow caught on every horizontal — the world lands on it */}
    {[[x - tierW / 2, top - tierH - 8 * s, tierW, 14 * s],
      [x - W2 * 0.44, top - 9 * s, W2 * 0.88, 15 * s]].map((r, i) => (
      <div key={"sn" + i} style={{ position: "absolute", left: r[0], top: r[1], width: r[2],
        height: r[3], background: "#D9D6CE", zIndex: z + 20, borderRadius: `${6 * s}px ${6 * s}px 0 0` }} />
    ))}
  </>);
};

/* the things that say a place was defended and then abandoned ------------- */

/** chain-link + hazard signage, cropped by the panel: the foreground plane */
export const Fence: React.FC<{ y: number; z?: number; s?: number; torn?: number }> =
  ({ y, z = 88, s = 1, torn = 1 }) => (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 200 * s, zIndex: z,
      overflow: "hidden" }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={"fv" + i} style={{ position: "absolute", left: i * 27 * s, top: 0, width: 3,
          height: "100%", background: "#8E9096", opacity: 0.55 }} />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"fh" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 27 * s,
          height: 3, background: "#8E9096", opacity: 0.55 }} />
      ))}
      {/* the tear — a whole panel ripped away and curled */}
      {torn > 0 && (
        <div style={{ position: "absolute", left: 300 * s, top: 20 * s, width: 250 * s,
          height: 170 * s, background: "transparent",
          boxShadow: `inset 0 0 0 3px #8E9096`,
          clipPath: "polygon(0 0, 100% 12%, 76% 100%, 12% 88%)",
          backdropFilter: "none" }} />
      )}
    </div>
    {[0, 1].map((i) => (
      <div key={"fp" + i} style={{ position: "absolute", left: 120 + i * 640, top: y - 26 * s,
        width: 16 * s, height: 250 * s, background: "#6E7076", zIndex: z + 1 }} />
    ))}
  </>);

/** a dead vehicle, half buried and stripped */
export const Wreck: React.FC<{ x: number; base: number; s?: number; z?: number; face?: 1 | -1 }> =
  ({ x, base, s = 1, z = 40, face = 1 }) => (
  <div style={{ position: "absolute", left: x - 150 * s, top: base - 108 * s, zIndex: z,
    transform: `scaleX(${face}) rotate(-4deg)` }}>
    <Contact x={4 * s} y={96 * s} w={290 * s} z={-1} o={0.34} />
    <div style={{ position: "absolute", left: 0, top: 46 * s, width: 300 * s, height: 58 * s,
      background: "#5A5148", borderRadius: `${16 * s}px ${8 * s}px ${5 * s}px ${5 * s}px` }} />
    <div style={{ position: "absolute", left: 46 * s, top: 6 * s, width: 150 * s, height: 48 * s,
      background: "#4A423A", borderRadius: `${14 * s}px ${20 * s}px 0 0` }} />
    <div style={{ position: "absolute", left: 62 * s, top: 16 * s, width: 54 * s, height: 26 * s,
      background: "#2A2E34" }} />
    <div style={{ position: "absolute", left: 130 * s, top: 16 * s, width: 46 * s, height: 26 * s,
      background: "#2A2E34" }} />
    <div style={{ position: "absolute", left: 0, top: 46 * s, width: 300 * s, height: 9 * s,
      background: "#6E6459" }} />
    {/* the wheels are gone; it sits on its rims in the drift */}
    <div style={{ position: "absolute", left: 34 * s, top: 92 * s, width: 52 * s, height: 20 * s,
      background: "#3A3630", borderRadius: 6 }} />
    <div style={{ position: "absolute", left: 208 * s, top: 92 * s, width: 52 * s, height: 20 * s,
      background: "#3A3630", borderRadius: 6 }} />
    <div style={{ position: "absolute", left: -14 * s, top: 84 * s, width: 330 * s, height: 30 * s,
      background: "#D9D6CE", borderRadius: `${18 * s}px` }} />
    {/* snow on the roof */}
    <div style={{ position: "absolute", left: 44 * s, top: 0, width: 156 * s, height: 13 * s,
      background: "#DDDAD2", borderRadius: `${10 * s}px ${14 * s}px 0 0` }} />
  </div>
);

/** a toppled pylon, its lattice folded into the ground */
export const Pylon: React.FC<{ x: number; base: number; s?: number; z?: number; rot?: number }> =
  ({ x, base, s = 1, z = 26, rot = -7 }) => (
  <svg width={400 * s} height={200 * s} viewBox="0 0 400 200"
    style={{ position: "absolute", left: x - 200 * s, top: base - 180 * s, zIndex: z,
      transform: `rotate(${rot}deg)` }}>
    <line x1={10} y1={150} x2={380} y2={96} stroke="#5E5A54" strokeWidth={9} />
    <line x1={10} y1={196} x2={380} y2={130} stroke="#5E5A54" strokeWidth={9} />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <line x1={16 + i * 42} y1={150 - i * 6} x2={16 + i * 42} y2={196 - i * 7}
          stroke="#4E4A45" strokeWidth={6} />
        <line x1={16 + i * 42} y1={150 - i * 6} x2={58 + i * 42} y2={189 - i * 7}
          stroke="#4E4A45" strokeWidth={5} />
      </g>
    ))}
    <line x1={352} y1={64} x2={352} y2={132} stroke="#5E5A54" strokeWidth={8} />
    <line x1={318} y1={72} x2={392} y2={64} stroke="#5E5A54" strokeWidth={7} />
  </svg>
);

/* =========================================================================
   THE BLAST DOOR — steel, stencilled, frosted, and pointedly UNLOCKED.
   ====================================================================== */
export const BlastDoor: React.FC<{ x: number; base: number; w?: number; h?: number; z?: number;
  f?: number; bleed?: number; frost?: number; open?: number }> =
  ({ x, base, w: ww = 560, h: hh = 520, z = 30, f = 0, bleed = 1, frost = 1, open = 0 }) => (<>
    {/* the concrete lintel and jambs the door sits in */}
    <div style={{ position: "absolute", left: x - ww / 2 - 46, top: base - hh - 56,
      width: ww + 92, height: hh + 56, background: CONCD, zIndex: z - 2, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - ww / 2 - 46, top: base - hh - 56,
      width: ww + 92, height: 22, background: CONCL, zIndex: z - 1 }} />
    {/* ⛔ THE BLEED IS LIGHT ESCAPING, NOT A PICTURE FRAME. The first cut drew an
        even 20px gold border on all four sides and it read as a mount around a
        grey rectangle. Light that escapes a door is UNEVEN — a hairline at the
        hinge, a wider seam at the jamb, and a real pool on the ground where the
        gap is biggest. */}
    {bleed > 0 && (<>
      <div style={{ position: "absolute", left: x - ww / 2 - 26, top: base - hh - 10,
        width: ww + 52, height: hh + 10, zIndex: z, background: "#F0D9A6",
        opacity: 0.26 + bleed * 0.44, borderRadius: 6 }} />
      <div style={{ position: "absolute", left: x - ww / 2 - 46, top: base - hh - 30,
        width: ww + 92, height: hh + 90, zIndex: z - 1, borderRadius: 40,
        background: `radial-gradient(ellipse at 50% 84%, ${hexa("#F2D79E", 0.34 * bleed)} 0%, ${hexa("#F2D79E", 0)} 72%)` }} />
      {/* the pool on the ground: the thing that proves the light is real */}
      <div style={{ position: "absolute", left: x - ww * 0.78, top: base - 12,
        width: ww * 1.56, height: 128, zIndex: z - 1,
        background: `linear-gradient(180deg, ${hexa("#EED9AC", 0.52 * bleed)} 0%, ${hexa("#EED9AC", 0)} 100%)`,
        clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
    </>)}
    {/* the door leaf */}
    <div style={{ position: "absolute", left: x - ww / 2 + open * ww * 0.9, top: base - hh,
      width: ww, height: hh, zIndex: z + 2, boxShadow: SH_D,
      background: `linear-gradient(176deg, ${dark(STEEL, 0.34)} 0%, ${STEEL} 34%, ${STEEL} 74%, ${mix(STEEL, 0.10)} 100%)`,
      transformOrigin: "0% 50%", transform: `perspective(1400px) rotateY(${-open * 62}deg)` }}>
      {/* the lintel's shadow across the top: this is what makes it read as a
          heavy thing seen from BELOW rather than a flat card */}
      <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 54,
        background: dark(STEEL, 0.46) }} />
      <div style={{ position: "absolute", left: 0, top: 52, width: ww, height: 7, background: STEELL }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 26, height: hh, background: STEELL, opacity: 0.4 }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 60, height: hh, background: STEELD }} />
      {/* hinge bosses */}
      {[0.16, 0.5, 0.84].map((k, i) => (
        <div key={"hb" + i} style={{ position: "absolute", left: -18, top: hh * k - 30,
          width: 40, height: 60, borderRadius: 8, background: STEELD, boxShadow: SH }} />
      ))}
      {/* rivet courses */}
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute",
          left: 40 + (i % 11) * (ww - 110) / 10, top: 40 + Math.floor(i / 11) * (hh - 100),
          width: 12, height: 12, borderRadius: 8, background: STEELD }} />
      ))}
      {/* THE STENCIL */}
      <div style={{ position: "absolute", left: 0, right: 60, top: hh * 0.30,
        textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
        fontSize: ww * 0.20, letterSpacing: "0.08em", lineHeight: 1,
        color: "#C6CBD1", opacity: 0.62 }}>NOMAD</div>
      {/* ⭐ THE IDEA ON MUTE: an empty bolt-hole where a padlock hasp was, a bare
          staple, and a licence plate. No lock, no keypad, no reader. */}
      <div style={{ position: "absolute", left: ww * 0.60, top: hh * 0.58,
        width: 96, height: 30, borderRadius: 4, background: STEELD }} />
      <div style={{ position: "absolute", left: ww * 0.60 + 34, top: hh * 0.58 - 22,
        width: 28, height: 30, borderRadius: "14px 14px 0 0", border: `7px solid ${STEELD}`,
        borderBottom: "none", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: ww * 0.60 + 40, top: hh * 0.58 + 8,
        width: 16, height: 16, borderRadius: 10, background: "#1E2228" }} />
      <Plate x={ww * 0.535} y={hh * 0.70} t="APACHE-2.0" w={218} s={0.94} c="#B9A98A" z={4} />
      {/* ⛔ FROST IS A DRIFT, NOT A ROW OF BLOCKS. Sixteen separate rects along
          the bottom edge read as teeth. One soft rounded mass with a couple of
          rimed verticals off the top edge is what reads as ice. */}
      {frost > 0 && (<>
        <div style={{ position: "absolute", left: 8, right: 8, bottom: -6, height: 46,
          background: "#DCE5EB", opacity: 0.60 * frost,
          borderRadius: "40% 60% 0 0 / 100% 100% 0 0" }} />
        <div style={{ position: "absolute", left: ww * 0.24, right: ww * 0.34, bottom: -6,
          height: 26, background: "#EEF4F8", opacity: 0.52 * frost,
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
        {[0.13, 0.34, 0.58, 0.81].map((k, i) => (
          <div key={"fi" + i} style={{ position: "absolute", left: ww * k, top: 54,
            width: 11 + i * 4, height: 26 + rnd(i, 4) * 34, background: "#DCE5EB",
            opacity: 0.46 * frost, borderRadius: "0 0 9px 9px" }} />
        ))}
      </>)}
    </div>
  </>);

/* =========================================================================
   THE WHEEL LOCK — real SVG geometry, because a spoked wheel built from divs
   is exactly the "mush" case §5 names.
   ====================================================================== */
export const Wheel: React.FC<{ x: number; y: number; r?: number; z?: number; rot?: number;
  frost?: number }> = ({ x, y, r = 260, z = 40, rot = 0, frost = 1 }) => (
  <svg width={r * 2.3} height={r * 2.3} viewBox="0 0 260 260" shapeRendering="geometricPrecision"
    style={{ position: "absolute", left: x - r * 1.15, top: y - r * 1.15, zIndex: z,
      transform: `rotate(${rot}deg)`, filter: "drop-shadow(0 18px 34px rgba(8,10,16,0.52))" }}>
    <circle cx={130} cy={130} r={122} fill={STEELD} />
    <circle cx={130} cy={130} r={112} fill={STEEL} />
    <circle cx={130} cy={130} r={112} fill="none" stroke={STEELL} strokeWidth={5} strokeDasharray="9 15" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <g key={a} transform={`rotate(${a} 130 130)`}>
        <rect x={122} y={22} width={16} height={98} rx={7} fill={STEEL} />
        <rect x={122} y={22} width={6} height={98} fill={STEELL} />
        <circle cx={130} cy={26} r={17} fill={STEELD} />
        <circle cx={130} cy={26} r={11} fill={STEEL} />
      </g>
    ))}
    <circle cx={130} cy={130} r={52} fill={STEELD} />
    <circle cx={130} cy={130} r={41} fill={STEEL} />
    <circle cx={130} cy={130} r={41} fill="none" stroke={STEELL} strokeWidth={4} />
    <circle cx={130} cy={130} r={15} fill={STEELD} />
    {frost > 0 && [12, 74, 148, 214, 296].map((a, i) => (
      <g key={"f" + a} transform={`rotate(${a} 130 130)`} opacity={0.42 * frost}>
        <rect x={106} y={8} width={48} height={17} rx={7} fill="#DCE5EB" />
      </g>
    ))}
  </svg>
);

/* =========================================================================
   THE THROAT — a ribbed concrete tunnel receding to a warm mouth.
   ====================================================================== */
export const Tunnel: React.FC<{ cx?: number; cy?: number; z?: number; f?: number;
  glow?: number; rings?: number; lamps?: number }> =
  ({ cx = 506, cy = 430, z = 20, f = 0, glow = 1, rings = 9, lamps = 1 }) => (<>
    <div style={{ position: "absolute", inset: 0, background: "#241F1A", zIndex: z }} />
    {Array.from({ length: rings }, (_, i) => {
      const k = i / (rings - 1);
      const w = 1180 * Math.pow(0.70, i), h = 900 * Math.pow(0.70, i);
      const shade = dark(CONC, 0.14 + k * 0.52);
      return (
        <div key={"tr" + i} style={{ position: "absolute", left: cx - w / 2, top: cy - h / 2,
          width: w, height: h, zIndex: z + i * 2,
          background: shade, borderRadius: `${w * 0.16}px ${w * 0.16}px ${w * 0.05}px ${w * 0.05}px`,
          boxShadow: `inset 0 ${h * 0.03}px 0 ${dark(CONC, 0.02 + k * 0.4)}` }} />
      );
    })}
    {/* the mouth: the warm hall waiting at the bottom of the descent, drawn as
        an ARCHED DOORWAY so it reads as somewhere to go rather than a bright
        blob at the end of a pipe */}
    <div style={{ position: "absolute", left: cx - 210, top: cy - 200, width: 420, height: 400,
      zIndex: z + rings * 2 - 1, borderRadius: "50%",
      background: `radial-gradient(ellipse, ${hexa("#F0D9A6", 0.30 * glow)} 0%, ${hexa("#F0D9A6", 0)} 70%)` }} />
    <div style={{ position: "absolute", left: cx - 106, top: cy - 118, width: 212, height: 210,
      zIndex: z + rings * 2, background: dark(CONC, 0.56),
      borderRadius: `${106}px ${106}px 6px 6px` }} />
    <div style={{ position: "absolute", left: cx - 88, top: cy - 100, width: 176, height: 192,
      zIndex: z + rings * 2 + 1, background: "#E8CE97", opacity: 0.36 + glow * 0.58,
      borderRadius: `${88}px ${88}px 4px 4px` }} />
    <div style={{ position: "absolute", left: cx - 62, top: cy - 74, width: 124, height: 166,
      zIndex: z + rings * 2 + 2, background: "#FBEFD2", opacity: 0.30 + glow * 0.66,
      borderRadius: `${62}px ${62}px 4px 4px` }} />
    {/* amber haunch strips down both sides */}
    {lamps > 0 && Array.from({ length: 5 }, (_, i) => {
      const k = i / 4;
      const on = E(f, 4 + i * 3, 10 + i * 3, 0, 1, LIN) * lamps;
      const w = 1180 * Math.pow(0.70, i * 1.6), h = 900 * Math.pow(0.70, i * 1.6);
      return (<React.Fragment key={"tl" + i}>
        <div style={{ position: "absolute", left: cx - w / 2 + w * 0.045, top: cy - h * 0.20,
          width: w * 0.030, height: h * 0.34, zIndex: z + 40 + i,
          background: "#F0D9A6", opacity: 0.24 + on * 0.66 }} />
        <div style={{ position: "absolute", left: cx + w / 2 - w * 0.075, top: cy - h * 0.20,
          width: w * 0.030, height: h * 0.34, zIndex: z + 40 + i,
          background: "#F0D9A6", opacity: 0.24 + on * 0.66 }} />
      </React.Fragment>);
    })}
    {/* ⛔ THE FLOOR IS A PLANE, NOT A STACK OF BARS. A sprite standing here has
        to stand ON something; the first cut drew eleven receding rules and the
        Keeper read as floating in mid-pipe. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: cy + 96, bottom: 0,
      zIndex: z + 58, background: "linear-gradient(184deg, #4A4038 0%, #2A241E 100%)",
      clipPath: `polygon(${(cx - 90) / W * 100}% 0, ${(cx + 90) / W * 100}% 0, 118% 100%, -18% 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: cy + 92, height: 9,
      zIndex: z + 59, background: "#6B5C4E" }} />
    {/* grate treads, spaced by perspective so the plane reads as receding */}
    {Array.from({ length: 8 }, (_, i) => {
      const t = i / 7;
      const yy = cy + 104 + t * t * 300 + t * 46;
      const halfW = 90 + t * 520;
      if (yy > H) return null;
      return <div key={"gw" + i} style={{ position: "absolute", left: cx - halfW,
        top: yy, width: halfW * 2, height: 4 + t * 7,
        background: dark("#6B5C4E", 0.30), opacity: 0.72, zIndex: z + 60 }} />;
    })}
  </>);

/* =========================================================================
   THE BOX — THE HERO ARTIFACT. A rugged machine with a PAPER-toned screen.
   Everything else in the reel exists to point at this.
   ====================================================================== */
export const Box: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  on?: number; screen?: React.ReactNode; leds?: number }> =
  ({ x, base, s = 1, z = 50, f = 0, on = 1, screen, leds = 1 }) => {
  const w = 420 * s, h = 268 * s;
  return (<>
    <Contact x={x - w * 0.56} y={base - 8 * s} w={w * 1.12} z={z - 1} o={0.40} />
    {/* the case */}
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h,
      zIndex: z, background: OLIVE, borderRadius: 12 * s, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: 12 * s,
      borderRadius: `${12 * s}px ${12 * s}px 0 0`, background: OLIVEL, zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - 34 * s, width: w, height: 34 * s,
      borderRadius: `0 0 ${12 * s}px ${12 * s}px`, background: OLIVED, zIndex: z + 1 }} />
    {/* heat-sink fins on both flanks */}
    {Array.from({ length: 7 }, (_, i) => (<React.Fragment key={"hs" + i}>
      <div style={{ position: "absolute", left: x - w / 2 + 10 * s, top: base - h + 40 * s + i * 26 * s,
        width: 26 * s, height: 13 * s, borderRadius: 3, background: OLIVED, zIndex: z + 2 }} />
      <div style={{ position: "absolute", left: x + w / 2 - 36 * s, top: base - h + 40 * s + i * 26 * s,
        width: 26 * s, height: 13 * s, borderRadius: 3, background: OLIVED, zIndex: z + 2 }} />
    </React.Fragment>))}
    {/* rubber corner bumpers */}
    {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx0, cy0], i) => (
      <div key={"bm" + i} style={{ position: "absolute",
        left: x - w / 2 + (cx0 ? w - 30 * s : 0), top: base - h + (cy0 ? h - 30 * s : 0),
        width: 30 * s, height: 30 * s, background: "#26291F", zIndex: z + 3,
        borderRadius: 8 * s }} />
    ))}
    {/* the carry handle */}
    <div style={{ position: "absolute", left: x - 54 * s, top: base - h - 20 * s, width: 108 * s,
      height: 26 * s, borderRadius: `${13 * s}px ${13 * s}px 0 0`, border: `${8 * s}px solid ${OLIVED}`,
      borderBottom: "none", boxSizing: "border-box", zIndex: z - 1 }} />
    {/* ⭐ THE SCREEN — light paper UI, never a glowing dark terminal */}
    <div style={{ position: "absolute", left: x - w / 2 + 52 * s, top: base - h + 26 * s,
      width: w - 104 * s, height: h - 84 * s, borderRadius: 6 * s, zIndex: z + 4,
      background: on > 0.02 ? PAPER : "#2A2E24", overflow: "hidden",
      border: `${5 * s}px solid #23261D`, boxSizing: "border-box",
      opacity: on > 0.02 ? 1 : 1 }}>
      {on > 0.02 && screen}
    </div>
    {/* the screen's spill onto the desk in front — the only reason to believe it is lit */}
    {on > 0.4 && (
      <div style={{ position: "absolute", left: x - w * 0.62, top: base - 6 * s,
        width: w * 1.24, height: 92 * s, zIndex: z - 2,
        background: `linear-gradient(180deg, ${hexa("#FFF6E2", 0.30 * on)} 0%, ${hexa("#FFF6E2", 0)} 100%)`,
        clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }} />
    )}
    {/* ⭐ THE MARK ON THE HERO ARTIFACT. The box is the thing the whole reel
        points at, so it is the thing that has to say what it runs. At the crest
        this tile is one of only two lit objects left in the frame. */}
    <div style={{ position: "absolute", left: x + w / 2 - 62 * s, top: base - 30 * s,
      width: 42 * s, height: 22 * s, borderRadius: 5 * s, background: "#FFFFFF",
      border: `${2 * s}px solid #E8DCC0`, zIndex: z + 5, display: "flex",
      alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")}
        style={{ width: 17 * s, height: 17 * s, objectFit: "contain" }} />
    </div>
    {/* status LEDs */}
    {leds > 0 && [GREEN, GOLD].map((c, i) => (
      <div key={"ld" + i} style={{ position: "absolute", left: x - w / 2 + 20 * s,
        top: base - 26 * s + i * 0, width: 11 * s, height: 11 * s, borderRadius: 8,
        background: i === 0 ? c : (Math.floor(f / 9) % 2 ? c : dark(c, 0.55)),
        zIndex: z + 5, marginLeft: i * 20 * s }} />
    ))}
  </>);
};

/** the Command Center as it actually ships: a light web UI at localhost:8080 */
export const CmdScreen: React.FC<{ f: number; ask?: number; answer?: number; s?: number }> =
  ({ f, ask = 1, answer = 1, s = 1 }) => {
  const typed = Math.floor(E(f, 0, 26, 0, 34, LIN) * ask);
  const Q = "how do i purify water";
  const lines = [0, 1, 2, 3].map((i) => E(f, 4 + i * 6, 12 + i * 6, 0, 1, OUT) * answer);
  return (<>
    <div style={{ position: "absolute", inset: 0, background: PAPER }} />
    {/* chrome + address */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30 * s,
      background: "#EDE7DA", borderBottom: "2px solid #DCD4C4" }}>
      {["#D0837A", "#D9BE7C", "#8FBB9B"].map((c, i) => (
        <div key={i} style={{ position: "absolute", left: 9 * s + i * 15 * s, top: 10 * s,
          width: 10 * s, height: 10 * s, borderRadius: 6, background: c }} />
      ))}
      <div style={{ position: "absolute", left: 62 * s, right: 10 * s, top: 6 * s, height: 18 * s,
        borderRadius: 5, background: "#F7F5F0", border: "1px solid #DCD4C4",
        fontFamily: MONO, fontWeight: 700, fontSize: 12 * s, color: "#6B6559",
        display: "flex", alignItems: "center", paddingLeft: 8 * s }}>localhost:8080</div>
    </div>
    {/* the ask */}
    <div style={{ position: "absolute", left: 14 * s, top: 44 * s, right: 14 * s,
      fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 15 * s, color: "#8C877D" }}>
      {Q.slice(0, typed)}<span style={{ opacity: Math.floor(f / 7) % 2 }}>|</span>
    </div>
    {/* the answer, streaming, from a MARKED assistant — the screen has to say
        who is answering, not just that something is */}
    {lines[0] > 0.02 && (
      <div style={{ position: "absolute", left: 14 * s, top: 68 * s, width: 24 * s,
        height: 24 * s, borderRadius: 7 * s, background: "#FFF3EC",
        border: `${1.5 * s}px solid #F0D5C6`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 18 * s, height: 18 * s, objectFit: "contain" }} />
      </div>
    )}
    {lines.map((p, i) => (
      <div key={"al" + i} style={{ position: "absolute", left: 46 * s, top: (72 + i * 16) * s,
        width: `${(66 - i * 8) * p}%`, height: 9 * s, borderRadius: 4,
        background: i === 0 ? "#2B2824" : "#B4AEA2" }} />
    ))}
    {/* the local badge — the fact that matters */}
    <div style={{ position: "absolute", right: 12 * s, bottom: 10 * s, padding: `${4 * s}px ${9 * s}px`,
      borderRadius: 6, background: "#E4EDE6", border: "1px solid #B9CFC0",
      fontFamily: MONO, fontWeight: 800, fontSize: 12 * s, color: "#38614B" }}>ollama · local</div>
  </>);
};

/* =========================================================================
   THE CANISTER + THE RACK — one object, three gates, the whole comparison.
   ====================================================================== */
export const Canister: React.FC<{ x: number; base: number; s?: number; z?: number; lit?: number;
  label?: string; sub?: string; c?: string; f?: number }> =
  ({ x, base, s = 1, z = 50, lit = 1, label, sub, c = GOLD, f = 0 }) => {
  const w = 96 * s, h = 176 * s;
  return (<>
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h,
      zIndex: z, background: STEEL, borderRadius: 10 * s, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w * 0.26, height: h,
      background: STEELL, opacity: 0.35, borderRadius: `${10 * s}px 0 0 ${10 * s}px`, zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: 15 * s,
      background: STEELD, borderRadius: `${10 * s}px ${10 * s}px 0 0`, zIndex: z + 2 }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - 17 * s, width: w, height: 17 * s,
      background: STEELD, borderRadius: `0 0 ${10 * s}px ${10 * s}px`, zIndex: z + 2 }} />
    {/* the window down its face */}
    <div style={{ position: "absolute", left: x - w * 0.24, top: base - h + 30 * s,
      width: w * 0.48, height: h * 0.44, borderRadius: 5 * s, zIndex: z + 3,
      background: lit > 0.02 ? mix(c, 0.20) : "#2C3138",
      border: `${3 * s}px solid ${STEELD}`, boxSizing: "border-box",
      opacity: lit > 0.02 ? 0.45 + lit * 0.55 : 1 }} />
    {lit > 0.4 && (
      <div style={{ position: "absolute", left: x - w * 0.62, top: base - h + 20 * s,
        width: w * 1.24, height: h * 0.62, zIndex: z - 1, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${hexa(c, 0.24 * lit)} 0%, ${hexa(c, 0)} 68%)` }} />
    )}
    {label && (
      <div style={{ position: "absolute", left: x - w * 0.52, top: base - h * 0.40,
        width: w * 1.04, zIndex: z + 4, background: "#C9BFA6", borderRadius: 3,
        border: `${2 * s}px solid ${dark("#C9BFA6", 0.24)}`, padding: `${3 * s}px 0` }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 15 * s,
          letterSpacing: "0.04em", color: "#241F17", textAlign: "center", lineHeight: 1 }}>{label}</div>
        {sub && <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 10 * s,
          color: "#5C5347", textAlign: "center", marginTop: 2 }}>{sub}</div>}
      </div>
    )}
  </>);
};

/** a steel shelving rack seen head-on, with N empty slots */
export const Rack: React.FC<{ x: number; base: number; w?: number; h?: number; slots?: number;
  shelves?: number; z?: number; s?: number }> =
  ({ x, base, w: ww = 470, h: hh = 400, slots = 4, shelves = 3, z = 26, s = 1 }) => (<>
    <Contact x={x - ww * 0.54} y={base - 6} w={ww * 1.08} z={z - 1} o={0.32} />
    {/* ⛔ THE BACK PANEL IS STEEL, NOT A BLACK VOID. v1 painted it
        dark(STEELD, 0.30) and every empty slot read as a hole cut in the frame —
        two thirds of the stacks shot was a black rectangle. A lit back panel
        also gives each canister something to separate FROM. */}
    <div style={{ position: "absolute", left: x - ww / 2, top: base - hh, width: ww, height: hh,
      zIndex: z, boxShadow: SH_D,
      background: `linear-gradient(174deg, ${mix(STEELD, 0.14)} 0%, ${dark(STEELD, 0.18)} 100%)` }} />
    {/* pressed ribs on the back panel, so it is a made thing */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"rib" + i} style={{ position: "absolute", left: x - ww / 2 + 16 + i * (ww - 32) / 7,
        top: base - hh + 10, width: 4, height: hh - 20, background: dark(STEELD, 0.42),
        opacity: 0.5, zIndex: z + 1 }} />
    ))}
    {/* uprights */}
    {[0, 1].map((i) => (
      <div key={"up" + i} style={{ position: "absolute",
        left: x - ww / 2 - 12 + i * (ww + 4), top: base - hh - 14, width: 20, height: hh + 14,
        background: STEEL, zIndex: z + 6, boxShadow: SH }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 6, height: "100%",
          background: STEELL, opacity: 0.5 }} />
      </div>
    ))}
    {/* shelves + their slot dividers */}
    {Array.from({ length: shelves }, (_, r) => {
      const sy = base - 12 - r * (hh - 30) / shelves;
      return (<React.Fragment key={"sh" + r}>
        <div style={{ position: "absolute", left: x - ww / 2 - 8, top: sy, width: ww + 16, height: 15,
          background: STEEL, zIndex: z + 5, boxShadow: SH }} />
        <div style={{ position: "absolute", left: x - ww / 2 - 8, top: sy, width: ww + 16, height: 5,
          background: STEELL, opacity: 0.55, zIndex: z + 6 }} />
        {Array.from({ length: slots + 1 }, (_, c) => (
          <div key={"dv" + c} style={{ position: "absolute", left: x - ww / 2 + c * ww / slots - 3,
            top: sy - (hh - 30) / shelves + 15, width: 6, height: (hh - 30) / shelves - 15,
            background: dark(STEELD, 0.16), zIndex: z + 2 }} />
        ))}
      </React.Fragment>);
    })}
  </>);

/* =========================================================================
   THE SIGNAL METER — the reel's clock. Four bars that mean the internet, and
   the whole crest is them going to zero.
   ====================================================================== */
export const Bars: React.FC<{ x: number; y: number; n: number; s?: number; z?: number;
  f?: number; dead?: number }> = ({ x, y, n, s = 1, z = 74, f = 0, dead = 0 }) => {
  const c = dead > 0.5 ? RED : GREEN;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      padding: `${9 * s}px ${13 * s}px`, borderRadius: 9 * s, background: "#20242C",
      border: `${3 * s}px solid #39404A`, boxShadow: SH, display: "flex",
      alignItems: "flex-end", gap: 6 * s }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ width: 13 * s, height: (16 + i * 11) * s, borderRadius: 3,
          background: i < n ? c : "#39404A",
          opacity: i < n ? (dead > 0.5 ? 0.5 + 0.5 * (Math.floor(f / 4) % 2) : 1) : 1 }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE CHART TABLE + THE MAP
   ====================================================================== */
export const ChartTable: React.FC<{ x: number; base: number; w?: number; z?: number }> =
  ({ x, base, w: ww = 720, z = 30 }) => (<>
    <Contact x={x - ww * 0.52} y={base - 4} w={ww * 1.04} z={z - 1} o={0.40} />
    <div style={{ position: "absolute", left: x - ww / 2, top: base - 172, width: ww, height: 34,
      background: "#8A6242", zIndex: z + 2, borderRadius: 5, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - ww / 2, top: base - 172, width: ww, height: 11,
      background: "#A87C4C", zIndex: z + 3, borderRadius: "5px 5px 0 0" }} />
    <div style={{ position: "absolute", left: x - ww / 2, top: base - 138, width: ww, height: 10,
      background: "#5C412C", zIndex: z + 2 }} />
    {[0, 1].map((i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: x - ww / 2 + 34 + i * (ww - 96),
        top: base - 132, width: 30, height: 132, background: "#6E4A30", zIndex: z + 1 }} />
    ))}
  </>);

export const MapSheet: React.FC<{ x: number; y: number; w?: number; open?: number; z?: number }> =
  ({ x, y, w: ww = 560, open = 1, z = 40 }) => {
  const wv = ww * Math.max(0.06, open);
  return (
    <div style={{ position: "absolute", left: x - wv / 2, top: y, width: wv, height: 176,
      zIndex: z, background: "#EDE7DA", borderRadius: 3, boxShadow: SH_D, overflow: "hidden" }}>
      <svg width={ww} height={176} viewBox="0 0 560 176" style={{ position: "absolute",
        left: (wv - ww) / 2, top: 0 }}>
        {/* ⛔ CONTOURS ARE NESTED CLOSED RINGS, NOT PARALLEL SQUIGGLES. v1 drew
            five long S-curves across the sheet and the map read as spaghetti.
            Real contours nest around a high point, which is instantly legible
            as terrain even at thumbnail size. */}
        {[0, 1, 2, 3].map((i) => {
          const rx = 118 - i * 26, ry = 54 - i * 12;
          return <ellipse key={"ct" + i} cx={168} cy={96} rx={rx} ry={ry} fill="none"
            stroke="#B9AE96" strokeWidth={2} transform="rotate(-14 168 96)" />;
        })}
        {[0, 1, 2].map((i) => {
          const rx = 84 - i * 24, ry = 40 - i * 11;
          return <ellipse key={"c2" + i} cx={432} cy={64} rx={rx} ry={ry} fill="none"
            stroke="#B9AE96" strokeWidth={2} transform="rotate(9 432 64)" />;
        })}
        {/* the river */}
        <path fill="none" stroke="#8FB2C4" strokeWidth={8} strokeLinecap="round"
          d="M 6 26 C 96 58, 172 150, 268 148 S 424 128, 556 164" />
        {/* the route + its waypoints */}
        <path fill="none" stroke={CLAY} strokeWidth={4} strokeDasharray="12 8"
          d="M 62 142 L 168 104 L 274 122 L 388 66 L 498 88" />
        {[[62, 142], [274, 122], [498, 88]].map(([px, py], i) => (
          <circle key={"wp" + i} cx={px} cy={py} r={8} fill={CLAY} stroke="#EDE7DA" strokeWidth={3} />
        ))}
        {/* the grid */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={"gv" + i} x1={40 + i * 92} y1={0} x2={40 + i * 92} y2={176}
            stroke="#CDC2AB" strokeWidth={1} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={"gh" + i} x1={0} y1={44 + i * 46} x2={560} y2={44 + i * 46}
            stroke="#CDC2AB" strokeWidth={1} />
        ))}
      </svg>
    </div>
  );
};

/** a brass compass rose, as real SVG — the paperweight that says NAVIGATION */
export const Compass: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 60, rot = 0 }) => (
  <svg width={92 * s} height={92 * s} viewBox="0 0 92 92" style={{ position: "absolute",
    left: x - 46 * s, top: y - 46 * s, zIndex: z, transform: `rotate(${rot}deg)`,
    filter: "drop-shadow(0 7px 12px rgba(8,10,16,0.45))" }}>
    <circle cx={46} cy={46} r={42} fill="#B08D46" />
    <circle cx={46} cy={46} r={35} fill="#E4D2A4" />
    <circle cx={46} cy={46} r={35} fill="none" stroke="#8A6C34" strokeWidth={2} />
    <polygon points="46,12 54,46 46,80 38,46" fill="#8A6C34" />
    <polygon points="46,12 54,46 46,46" fill="#C44A3A" />
    <polygon points="12,46 46,38 80,46 46,54" fill="#8A6C34" opacity={0.55} />
    <circle cx={46} cy={46} r={6} fill="#B08D46" />
  </svg>
);

/* =========================================================================
   THE LOADING SHAFT — where content comes down, once.
   ====================================================================== */
/* ⛔ A SHAFT IS AN OPENING WITH CONVERGING JAMBS, NOT A STACK OF SHRINKING
   RECTS. v1 drew seven nested bars and the result read as a stepped ceiling
   recess; nothing about it said "there is sky up there". Two trapezoid jambs
   framing a dark interior, with a lit square at the top, reads as a shaft in
   one glance. */
export const Shaft: React.FC<{ cx?: number; z?: number; f?: number; day?: number }> =
  ({ cx = 506, z = 16, f = 0, day = 1 }) => (<>
    {/* ⛔ THE DAYLIGHT SITS BELOW THE HEADER'S OCCLUSION BAND. The whole point of
        this shot is that there is sky at the top of the shaft; drawn at y=-10 the
        white pilot bar was behind the header pill and the shaft read as a dark
        diagonal ceiling. Everything is pushed down 58px so the sky is visible. */}
    {/* the dark interior of the shaft */}
    <div style={{ position: "absolute", left: cx - 190, top: 48, width: 380, height: 306,
      background: "#20242A", zIndex: z,
      clipPath: "polygon(26% 0, 74% 0, 100% 100%, 0 100%)" }} />
    {/* the two jambs, one lit face and one shade face */}
    <div style={{ position: "absolute", left: cx - 330, top: 48, width: 200, height: 306,
      background: dark(CONC, 0.22), zIndex: z + 1,
      clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }} />
    <div style={{ position: "absolute", left: cx + 130, top: 48, width: 200, height: 306,
      background: dark(CONC, 0.42), zIndex: z + 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%)" }} />
    {/* courses on the shaft lining, converging with it */}
    {Array.from({ length: 5 }, (_, i) => {
      const t = i / 4, half = 100 + t * 88;
      return <div key={"sc" + i} style={{ position: "absolute", left: cx - half,
        top: 82 + i * 62, width: half * 2, height: 5, background: dark(CONC, 0.52),
        zIndex: z + 2 }} />;
    })}
    {/* the daylight square at the top */}
    <div style={{ position: "absolute", left: cx - 100, top: 48, width: 200, height: 66,
      background: "#DCE7F0", opacity: 0.44 + day * 0.52, zIndex: z + 3 }} />
    <div style={{ position: "absolute", left: cx - 100, top: 110, width: 200, height: 12,
      background: "#A9BCCC", opacity: 0.5 + day * 0.4, zIndex: z + 3 }} />
    <Beam x={cx} y={120} top={196} bot={520} len={400} c="#CFDDEA" o={0.22 * day} z={z + 10} f={f} />
    {/* the access ladder up the back wall */}
    <div style={{ position: "absolute", left: cx + 200, top: 130, width: 68, height: 300,
      zIndex: z + 11 }}>
      {[0, 1].map((i) => (
        <div key={"lr" + i} style={{ position: "absolute", left: i * 58, top: 0, width: 9,
          height: 330, background: STEELD }} />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: 0, top: 14 + i * 36, width: 67,
          height: 7, background: STEEL }} />
      ))}
    </div>
  </>);

/** the chute the canisters slide down */
export const Chute: React.FC<{ x1: number; y1: number; x2: number; y2: number; z?: number;
  w?: number }> = ({ x1, y1, x2, y2, z = 40, w: ww = 116 }) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return (
    <div style={{ position: "absolute", left: x1, top: y1 - ww / 2, width: len, height: ww,
      zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)` }}>
      <div style={{ position: "absolute", inset: 0, background: STEELD, borderRadius: 8,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 9, height: ww - 30,
        background: STEEL, borderRadius: 5 }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 9, height: 7,
        background: STEELL, opacity: 0.5 }} />
      {Array.from({ length: Math.max(2, Math.round(len / 74)) }, (_, i) => (
        <div key={"cr" + i} style={{ position: "absolute", left: 26 + i * 74, top: 4,
          width: 9, height: ww - 8, background: dark(STEELD, 0.26) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE MAST — the uplink, at full strength, 0.8s before it dies.
   ====================================================================== */
export const Mast: React.FC<{ x: number; base: number; h?: number; z?: number; f?: number;
  on?: number; s?: number }> = ({ x, base, h: hh = 340, z = 30, f = 0, on = 1, s = 1 }) => (
  <svg width={200 * s} height={hh + 40} viewBox={`0 0 200 ${hh + 40}`}
    style={{ position: "absolute", left: x - 100 * s, top: base - hh - 20, zIndex: z,
      filter: "drop-shadow(0 12px 22px rgba(8,10,16,0.44))" }}>
    {/* the lattice, as real strokes */}
    <line x1={72} y1={hh + 20} x2={92} y2={26} stroke="#4E5661" strokeWidth={7} />
    <line x1={128} y1={hh + 20} x2={108} y2={26} stroke="#4E5661" strokeWidth={7} />
    {Array.from({ length: 9 }, (_, i) => {
      const y = 34 + i * (hh - 30) / 9;
      const k = i / 9, hw = 10 + k * 26;
      return <g key={"lx" + i}>
        <line x1={100 - hw} y1={y} x2={100 + hw} y2={y} stroke="#5A6470" strokeWidth={5} />
        <line x1={100 - hw} y1={y} x2={100 + hw + 4} y2={y + (hh - 30) / 9} stroke="#454D57" strokeWidth={4} />
      </g>;
    })}
    {/* dishes */}
    <ellipse cx={70} cy={96} rx={30} ry={19} fill="#7E8894" transform="rotate(-18 70 96)" />
    <ellipse cx={70} cy={96} rx={22} ry={13} fill="#A9B3BE" transform="rotate(-18 70 96)" />
    <ellipse cx={134} cy={158} rx={24} ry={15} fill="#7E8894" transform="rotate(16 134 158)" />
    <ellipse cx={134} cy={158} rx={17} ry={10} fill="#A9B3BE" transform="rotate(16 134 158)" />
    {/* the beacon */}
    <circle cx={100} cy={18} r={13} fill={on > 0.02 ? RED : "#4A3330"}
      opacity={on > 0.02 ? 0.45 + 0.55 * Math.abs(Math.sin(f / 13)) : 1} />
    <rect x={94} y={26} width={12} height={16} fill="#4E5661" />
  </svg>
);

/* =========================================================================
   THE COIN CAGE — the same canisters, behind a grille, with a coin column.
   ⛔ NO BRAND, NO PRICE, NO LOGO. The VO says "hundreds of dollars"; that is
      unverifiable per-product, so the frame says "this costs money" GRAPHICALLY
      and says nothing it cannot back.
   ====================================================================== */
export const CoinCage: React.FC<{ x: number; base: number; z?: number; lift?: number;
  f?: number; s?: number }> = ({ x, base, z = 30, lift = 0, f = 0, s = 1 }) => {
  const w = 460 * s, h = 360 * s;
  return (<>
    <Contact x={x - w * 0.60} y={base - 6} w={w * 1.20} z={z - 1} o={0.38} />
    {/* the plinth */}
    <div style={{ position: "absolute", left: x - w / 2 - 22 * s, top: base - 52 * s,
      width: w + 44 * s, height: 52 * s, background: CONCD, zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - w / 2 - 22 * s, top: base - 52 * s,
      width: w + 44 * s, height: 10 * s, background: CONC, zIndex: z + 1 }} />
    {/* the cabinet. Its interior is LIT, not black — the canisters behind the
        grille have to be visible or the A/B comparison in this scene does not
        exist. (v1 painted it dark and also stacked it ABOVE the canisters in z,
        so the shot showed a grey radiator and nothing else.) */}
    <div style={{ position: "absolute", left: x - w / 2, top: base - 52 * s - h, width: w, height: h,
      zIndex: z + 2, boxShadow: SH_D, borderRadius: 6,
      background: `linear-gradient(174deg, ${dark(STEELD, 0.02)} 0%, ${dark(STEELD, 0.30)} 100%)` }} />
    <div style={{ position: "absolute", left: x - w / 2, top: base - 52 * s - h, width: w, height: 14 * s,
      background: STEEL, zIndex: z + 3, borderRadius: "6px 6px 0 0" }} />
    {/* THE GRILLE — the lift is the whole performance of the shot */}
    <div style={{ position: "absolute", left: x - w / 2 + 18 * s, top: base - 52 * s - h + 22 * s,
      width: w - 36 * s, height: (h - 44 * s) * (1 - lift), zIndex: z + 12, overflow: "hidden" }}>
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"gb" + i} style={{ position: "absolute", left: i * (w - 36 * s) / 15, top: 0,
          width: 9 * s, height: "100%", background: STEEL }} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"gh" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 54 * s,
          height: 8 * s, background: STEELD }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14 * s,
        background: STEELL }} />
    </div>
    {/* the coin column on the right flank */}
    <div style={{ position: "absolute", left: x + w / 2 + 6 * s, top: base - 52 * s - h * 0.82,
      width: 96 * s, height: h * 0.82, background: "#8A6C34", zIndex: z + 14, borderRadius: 5,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x + w / 2 + 6 * s, top: base - 52 * s - h * 0.82,
      width: 96 * s, height: 12 * s, background: "#B08D46", zIndex: z + 15 }} />
    <div style={{ position: "absolute", left: x + w / 2 + 34 * s, top: base - 52 * s - h * 0.70,
      width: 42 * s, height: 12 * s, borderRadius: 6, background: "#241F17", zIndex: z + 16 }} />
    {/* the plunger */}
    <div style={{ position: "absolute", left: x + w / 2 + 30 * s,
      top: base - 52 * s - h * 0.44 + lift * 22 * s, width: 50 * s, height: 30 * s,
      borderRadius: 6, background: "#8A3F32", zIndex: z + 16, boxShadow: SH }} />
  </>);
};

export const Coin: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 80, rot = 0 }) => (
  <div style={{ position: "absolute", left: x - 20 * s, top: y - 20 * s, width: 40 * s,
    height: 40 * s, borderRadius: "50%", background: "#D9B45F", zIndex: z,
    border: `${4 * s}px solid #B08D46`, boxSizing: "border-box", boxShadow: SH,
    transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: "26%", top: "26%", width: "48%", height: "48%",
      borderRadius: "50%", background: "#B08D46" }} />
  </div>
);

/* =========================================================================
   THE SLIT WINDOW — a horizontal cut high in the back wall, with the city in
   it. This is how the crest shows the world dying without leaving the room.
   ====================================================================== */
export const SlitWindow: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  lit?: number; f?: number }> =
  ({ x, y, w: ww = 340, h: hh = 74, z = 22, lit = 1, f = 0 }) => (<>
    <div style={{ position: "absolute", left: x - ww / 2 - 14, top: y - 14, width: ww + 28,
      height: hh + 28, background: CONCD, zIndex: z, borderRadius: 4, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: hh,
      zIndex: z + 1, overflow: "hidden", background: "#1B2430" }}>
      {/* the far city, in three bands, going out left to right when `lit` falls */}
      {[0, 1, 2].map((b) => (
        <div key={"sb" + b} style={{ position: "absolute", left: 0, right: 0,
          bottom: b * 9, height: hh }}>
          {Array.from({ length: 11 - b * 2 }, (_, i) => {
            const bw = 14 + rnd(b * 7 + i, 1) * 22, bh = 16 + rnd(b * 7 + i, 2) * (30 - b * 6);
            const bx = 6 + i * (ww / (11 - b * 2)) + rnd(b * 7 + i, 3) * 8;
            /* the wave: the leftmost blocks die first */
            const local = Math.max(0, Math.min(1, (lit - (bx / ww) * 0.55) / 0.45));
            return (
              <div key={i} style={{ position: "absolute", left: bx, bottom: 0, width: bw, height: bh,
                background: dark("#3C5878", 0.30 + b * 0.14) }}>
                {Array.from({ length: 4 }, (_, k) => (
                  rnd(b * 30 + i * 5 + k, 8) < 0.62 ? (
                    <div key={k} style={{ position: "absolute", left: 3 + (k % 2) * (bw * 0.5),
                      top: 4 + Math.floor(k / 2) * 11, width: Math.max(3, bw * 0.30), height: 6,
                      background: "#F0D49B", opacity: local }} />
                  ) : null
                ))}
              </div>
            );
          })}
        </div>
      ))}
      {/* the sky behind it, dimming with the city */}
      <div style={{ position: "absolute", inset: 0, background: "#1B2430",
        opacity: 1 - (0.32 + lit * 0.48) }} />
    </div>
    {/* the bars across the slit */}
    {[0.33, 0.66].map((k, i) => (
      <div key={"sv" + i} style={{ position: "absolute", left: x - ww / 2 + ww * k, top: y - 4,
        width: 9, height: hh + 8, background: STEELD, zIndex: z + 2 }} />
    ))}
  </>);

/* =========================================================================
   THE UPLINK CABLE — glowing and taut while the grid lives, slack and dark
   after. The single prop the whole crest turns on.
   ====================================================================== */
export const Cable: React.FC<{ x1: number; y1: number; x2: number; y2: number; z?: number;
  live?: number; f?: number; sag?: number; w?: number }> =
  ({ x1, y1, x2, y2, z = 44, live = 1, f = 0, sag = 0, w: ww = 15 }) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + 30 + sag * 150;
  const c = live > 0.5 ? "#D08A3C" : "#5A4636";
  return (
    <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, zIndex: z,
      pointerEvents: "none" }}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={dark(c, 0.34)}
        strokeWidth={ww + 6} strokeLinecap="round" />
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none" stroke={c}
        strokeWidth={ww} strokeLinecap="round" />
      {/* data moving along it — the ONLY thing in the reel that says "internet" */}
      {live > 0.5 && Array.from({ length: 4 }, (_, i) => {
        const t = ((f * 0.016 + i * 0.25) % 1);
        const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
        const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
        return <circle key={"dp" + i} cx={px} cy={py} r={ww * 0.34} fill="#F4DDA8" />;
      })}
    </svg>
  );
};

/* =========================================================================
   THE LIGHT BANK — the hall's depth reveal is FIVE of these coming up back to
   front. A lighting cue instead of a camera pull-back (CAMERA-GRAMMAR §5.7).
   ====================================================================== */
export const LightBank: React.FC<{ x: number; y: number; w?: number; on?: number; z?: number;
  f?: number; depth?: number }> =
  ({ x, y, w: ww = 500, on = 0, z = 24, f = 0, depth = 0 }) => {
  const k = 1 - depth * 0.55;
  return (<>
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: 13 * k,
      background: dark("#2E3238", depth * 0.4), zIndex: z, borderRadius: 3 }} />
    <div style={{ position: "absolute", left: x - ww / 2 + 12, top: y + 10 * k, width: ww - 24,
      height: 8 * k, borderRadius: 3, zIndex: z + 1,
      background: on > 0.02 ? "#F0DDB0" : "#343940", opacity: on > 0.02 ? 0.30 + on * 0.70 : 1 }} />
    {on > 0.05 && (
      <div style={{ position: "absolute", left: x - ww * 0.72, top: y + 16 * k, width: ww * 1.44,
        height: 330 * k, zIndex: z - 4,
        background: `linear-gradient(180deg, ${hexa("#F0DDB0", 0.20 * on * k)} 0%, ${hexa("#F0DDB0", 0)} 100%)`,
        clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)" }} />
    )}
  </>);
};

/* =========================================================================
   INTERIOR DRESSING.
   Alex: *"some of the scenes don't have enough stuff so it needs to be improved
   to be more interesting in those scenes."* SET-AND-LIGHT §6 names the band we
   want: the density lives in the STATIC, QUIET set — back-wall props, pipework,
   stores — while only ONE thing moves. A richly built room where one thing
   moves is the target; a bare room with one mover is what v1 shipped.
   ⛔ None of these ever animates. They are there to be taken away by the dark.
   ====================================================================== */

/** conduit and pipework running the back wall — instant "this is a facility" */
export const Pipes: React.FC<{ y: number; z?: number; c?: string; n?: number }> =
  ({ y, z = 7, c = "#5A6169", n = 3 }) => (<>
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={"pp" + i}>
        <div style={{ position: "absolute", left: -20, right: -20, top: y + i * 26,
          height: 13 - i * 2, borderRadius: 7, background: dark(c, i * 0.12), zIndex: z }} />
        <div style={{ position: "absolute", left: -20, right: -20, top: y + i * 26,
          height: 4, borderRadius: 4, background: mix(c, 0.24), zIndex: z + 1, opacity: 0.6 }} />
      </React.Fragment>
    ))}
    {[150, 470, 790].map((x, i) => (
      <div key={"br" + i} style={{ position: "absolute", left: x, top: y - 8,
        width: 20, height: 26 + n * 26, background: dark(c, 0.28), zIndex: z + 2 }} />
    ))}
  </>);

/** a wall gauge panel: three dials and a row of labelled toggles */
export const GaugePanel: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  on?: number }> = ({ x, y, s = 1, z = 20, f = 0, on = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 210 * s, height: 128 * s, zIndex: z,
    background: "#3A4148", borderRadius: 8 * s, border: `${4 * s}px solid #262B31`,
    boxShadow: SH }}>
    {[0, 1, 2].map((i) => (
      <div key={"gg" + i} style={{ position: "absolute", left: (14 + i * 62) * s, top: 12 * s,
        width: 50 * s, height: 50 * s, borderRadius: "50%", background: "#D9D3C4",
        border: `${3 * s}px solid #262B31` }}>
        <div style={{ position: "absolute", left: "48%", top: "16%", width: 3 * s, height: 20 * s,
          background: "#8A3F32", transformOrigin: "50% 100%",
          transform: `rotate(${(-52 + i * 34 + Math.sin(f / (21 + i * 7)) * 12) * on}deg)` }} />
      </div>
    ))}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"tg" + i} style={{ position: "absolute", left: (14 + i * 32) * s, top: 78 * s,
        width: 22 * s, height: 34 * s, borderRadius: 4 * s, background: "#2E343A" }}>
        <div style={{ position: "absolute", left: 4 * s, top: (i % 2 ? 4 : 16) * s,
          width: 14 * s, height: 14 * s, borderRadius: 3 * s,
          background: i % 3 === 0 && on > 0.4 ? GREEN : "#5A6169" }} />
      </div>
    ))}
  </div>
);

/** a steel shelf of stores: cans, crates, a jerry can, a coil of rope */
export const Stores: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number }> =
  ({ x, y, w: ww = 300, s = 1, z = 22 }) => (<>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 11 * s,
      background: "#6E747C", zIndex: z, boxShadow: SH }} />
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 4 * s,
      background: "#98A0A9", zIndex: z + 1, opacity: 0.6 }} />
    {[0, 1].map((i) => (
      <div key={"sb" + i} style={{ position: "absolute", left: x + (i ? ww - 14 * s : 4 * s),
        top: y, width: 11 * s, height: 54 * s, background: "#474C53", zIndex: z }} />
    ))}
    {/* cans */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"cn" + i} style={{ position: "absolute", left: x + (18 + i * 30) * s,
        top: y - 40 * s, width: 24 * s, height: 40 * s, borderRadius: 3 * s,
        background: ["#8A6C34", "#7A4A3E", "#8A6C34", "#5E6161", "#7A4A3E"][i], zIndex: z + 2 }}>
        <div style={{ position: "absolute", left: 0, top: 12 * s, width: "100%", height: 10 * s,
          background: "#D9D3C4", opacity: 0.72 }} />
      </div>
    ))}
    {/* a crate */}
    <div style={{ position: "absolute", left: x + 178 * s, top: y - 52 * s, width: 74 * s,
      height: 52 * s, background: "#8A6242", zIndex: z + 2, borderRadius: 3 }}>
      <div style={{ position: "absolute", left: 0, top: 20 * s, width: "100%", height: 7 * s,
        background: "#6E4A30" }} />
    </div>
    {/* a jerry can */}
    <div style={{ position: "absolute", left: x + 262 * s, top: y - 58 * s, width: 40 * s,
      height: 58 * s, background: "#4C5340", zIndex: z + 2, borderRadius: 4 * s }}>
      <div style={{ position: "absolute", left: 8 * s, top: -8 * s, width: 24 * s, height: 12 * s,
        borderRadius: 4 * s, background: "#343A2B" }} />
      <div style={{ position: "absolute", left: 6 * s, top: 18 * s, width: 28 * s, height: 5 * s,
        background: "#666E55" }} />
    </div>
  </>);

/** pinned notes and a clipboard on the wall — the "someone works here" detail */
export const Notes: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 8 }) => (<>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={"nt" + i} style={{ position: "absolute", left: x + (i % 3) * 62 * s,
        top: y + Math.floor(i / 3) * 66 * s, width: 48 * s, height: 56 * s,
        background: ["#EDE7DA", "#DED5C4", "#EDE7DA", "#D9CFB8", "#EDE7DA"][i], zIndex: z,
        transform: `rotate(${(rnd(i, 41) - 0.5) * 12}deg)`, boxShadow: SH }}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{ position: "absolute", left: 7 * s, top: (12 + k * 11) * s,
            width: (34 - k * 8) * s, height: 3 * s, background: "#A79A84" }} />
        ))}
        <div style={{ position: "absolute", left: "45%", top: 3 * s, width: 7 * s, height: 7 * s,
          borderRadius: "50%", background: "#C44A3A" }} />
      </div>
    ))}
  </>);

/** a wall-mounted fan, still, because the power it needs is the point */
export const Fan: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  on?: number }> = ({ x, y, s = 1, z = 20, f = 0, on = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 92 * s, height: 92 * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s, background: "#3A4148",
      border: `${4 * s}px solid #262B31` }} />
    <div style={{ position: "absolute", inset: 12 * s, borderRadius: "50%", background: "#22262C" }} />
    <div style={{ position: "absolute", inset: 12 * s,
      transform: `rotate(${on > 0.1 ? (f * 11) % 360 : 24}deg)` }}>
      {[0, 120, 240].map((a) => (
        <div key={a} style={{ position: "absolute", left: "46%", top: "8%", width: 10 * s,
          height: 30 * s, borderRadius: 5 * s, background: "#6E747C",
          transformOrigin: "50% 140%", transform: `rotate(${a}deg)` }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: "44%", top: "44%", width: 12 * s, height: 12 * s,
      borderRadius: "50%", background: "#98A0A9" }} />
  </div>
);

/* =========================================================================
   THE HATCH — a floor hatch seen from ABOVE, buried in drift.

   Built for cut D's rebuilt open. Alex: cut D's hook *"isn't meeting the bar in
   terms of interest and pattern interrupt."* He was right and the doc already
   said why: its first shot was a single establishing wide of an empty plain
   with a 40px figure in it, and `docs/THE-OPEN.md` calls an establishing wide a
   POSTER — one beat, then the eye has nothing left to do.

   ⭐ The replacement mechanism is EXCAVATION, and the thing that makes it work
   is the CAMERA: this is the only shot in the whole reel that looks DOWN. A
   viewer who has scrolled past forty side-on dioramas has not seen a top-down
   plate of steel come out from under snow and open at them.
   ====================================================================== */
export const Hatch: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  clear?: number; open?: number; spin?: number }> =
  ({ x, y, s = 1, z = 30, f = 0, clear = 1, open = 0, spin = 0 }) => {
  const R = 250 * s;
  return (<>
    {/* the rim set into the ground */}
    <div style={{ position: "absolute", left: x - R * 1.16, top: y - R * 1.16, width: R * 2.32,
      height: R * 2.32, borderRadius: "50%", background: CONCD, zIndex: z }} />
    <div style={{ position: "absolute", left: x - R * 1.08, top: y - R * 1.08, width: R * 2.16,
      height: R * 2.16, borderRadius: "50%", background: "#22262C", zIndex: z + 1 }} />
    {/* the light that is already down there, revealed as the lid lifts */}
    {open > 0.01 && (<>
      <div style={{ position: "absolute", left: x - R * 1.02, top: y - R * 1.02, width: R * 2.04,
        height: R * 2.04, borderRadius: "50%", background: "#E8CE97",
        opacity: 0.45 + open * 0.55, zIndex: z + 2 }} />
      <div style={{ position: "absolute", left: x - R * 0.74, top: y - R * 0.74, width: R * 1.48,
        height: R * 1.48, borderRadius: "50%", background: "#FBEFD2", opacity: open, zIndex: z + 3 }} />
      {/* the beam coming UP out of it, straight at the lens */}
      <div style={{ position: "absolute", left: x - R * 2.0, top: y - R * 2.0, width: R * 4,
        height: R * 4, borderRadius: "50%", zIndex: z + 4,
        background: `radial-gradient(circle, ${hexa("#F5E2B4", 0.46 * open)} 0%, ${hexa("#F5E2B4", 0)} 62%)` }} />
    </>)}
    {/* the LID, hinged at the top edge, swinging up and toward camera */}
    <div style={{ position: "absolute", left: x - R, top: y - R, width: R * 2, height: R * 2,
      zIndex: z + 8, transformOrigin: "50% 0%",
      transform: `perspective(1400px) rotateX(${-open * 96}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: STEEL,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `linear-gradient(160deg, ${STEELL} 0%, ${STEEL} 34%, ${STEELD} 100%)`,
        opacity: 0.55 }} />
      {/* hazard chevrons round the rim */}
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"hc" + i} style={{ position: "absolute", left: "50%", top: "50%", width: 20 * s,
          height: R * 0.98, marginLeft: -10 * s, background: i % 2 ? "#D0A64A" : "#3A3630",
          transformOrigin: "50% 0%", transform: `rotate(${i * 22.5}deg)`, opacity: 0.9 }} />
      ))}
      <div style={{ position: "absolute", left: R * 0.20, top: R * 0.20, width: R * 1.6,
        height: R * 1.6, borderRadius: "50%", background: STEEL }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"rv" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: 13 * s, height: 13 * s, marginLeft: -6.5 * s, borderRadius: 8,
          background: STEELD,
          transform: `rotate(${i * 30}deg) translateY(${-R * 0.70}px)` }} />
      ))}
      {/* the stencil, and the wheel at the centre */}
      <div style={{ position: "absolute", left: 0, right: 0, top: R * 0.42, textAlign: "center",
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44 * s, lineHeight: 1,
        letterSpacing: "0.08em", color: "#C6CBD1", opacity: 0.66 }}>NOMAD</div>
      <div style={{ position: "absolute", left: R - 90 * s, top: R - 20 * s, width: 180 * s,
        height: 180 * s, transform: `rotate(${spin}deg)` }}>
        <svg width={180 * s} height={180 * s} viewBox="0 0 180 180">
          <circle cx={90} cy={90} r={78} fill={STEELD} />
          <circle cx={90} cy={90} r={68} fill={STEEL} />
          {[0, 72, 144, 216, 288].map((a) => (
            <g key={a} transform={`rotate(${a} 90 90)`}>
              <rect x={83} y={18} width={14} height={64} rx={6} fill={STEELL} opacity={0.7} />
              <circle cx={90} cy={20} r={13} fill={STEELD} />
            </g>
          ))}
          <circle cx={90} cy={90} r={26} fill={STEELD} />
          <circle cx={90} cy={90} r={17} fill={STEELL} opacity={0.55} />
        </svg>
      </div>
    </div>
    {/* the drift still lying on it, swept off by `clear` */}
    {/* ⛔ A SLIDING CIRCLE IS NOT SNOW. v1 masked the drift with one disc moving
        sideways and it rendered as a hard-edged white lens flare over the plate.
        A drift is a CLUSTER — overlapping lobes that shrink and blow off, each
        at its own rate — and the lobes have to sit at different radii so the
        steel comes out from under it unevenly, the way snow actually leaves. */}
    {clear < 0.995 && Array.from({ length: 9 }, (_, i) => {
      const a = (i / 9) * Math.PI * 2 + 0.6;
      const rad = R * (0.30 + rnd(i, 81) * 0.62);
      const lag = rnd(i, 82) * 0.42;                 // each lobe leaves at its own time
      const k = Math.max(0, Math.min(1, (clear - lag) / (1 - lag)));
      if (k > 0.985) return null;
      const sz = R * (0.62 + rnd(i, 83) * 0.60) * (1 - k * 0.86);
      const blow = k * (140 + rnd(i, 84) * 190) * s;
      return (
        <div key={"sd" + i} style={{ position: "absolute",
          left: x + Math.cos(a) * rad - sz / 2 + blow,
          top: y + Math.sin(a) * rad * 0.9 - sz / 2 - blow * 0.24,
          width: sz, height: sz * (0.72 + rnd(i, 85) * 0.30), borderRadius: "50%",
          background: i % 3 === 0 ? "#FBFAF6" : "#EFEDE6",
          opacity: (1 - k) * 0.98, zIndex: z + 14 + (i % 3) }} />
      );
    })}
    {/* the ridge of swept snow piling up ahead of the sweep */}
    {clear > 0.06 && clear < 0.99 && (
      <div style={{ position: "absolute", left: x - R * 0.30 + clear * R * 1.5,
        top: y - R * 0.86, width: R * 0.52, height: R * 1.72, borderRadius: "50%",
        background: "#FBFAF6", opacity: 0.86 * (1 - clear * 0.4), zIndex: z + 18 }} />
    )}
  </>);
};

/* =========================================================================
   THE MAST SITE — everything that stands at the foot of a real comms tower.

   Alex: cut B's first scene is *"still too boring, and those are the most
   important scenes."* He is right. Shot A was a tower and a sky. A mast on its
   own is a thin grey lattice: almost no ink, nothing to look at, and no reason
   to believe anyone ever worked there.

   ⭐ SET-AND-LIGHT §6: the density belongs in the STATIC set. None of this
   moves. It is an equipment cabin, a generator, fuel drums, a dish on a mount,
   guy wires anchored to concrete blocks, cable ducts, an ice-furred ladder and
   signage — the stuff that makes a site read as a place somebody maintained
   until they could not any more.
   ====================================================================== */
export const MastSite: React.FC<{ x: number; base: number; s?: number; z?: number; f?: number;
  on?: number }> = ({ x, base, s = 1, z = 26, f = 0, on = 1 }) => (<>
  {/* the guy wires, anchored to concrete blocks out either side */}
  {[[-1, 0.86], [1, 0.86], [-1, 0.52], [1, 0.52]].map(([d, k], i) => (
    <React.Fragment key={"gw" + i}>
      <div style={{ position: "absolute", left: x, top: base - 470 * s * (k as number),
        width: 420 * s * (k as number), height: 4, background: "#6E6A62", zIndex: z,
        transformOrigin: "0% 50%",
        transform: `rotate(${(d as number) > 0 ? 46 + i * 4 : 134 - i * 4}deg)` }} />
      {/* ice furring the windward wire */}
      {(d as number) < 0 && (
        <div style={{ position: "absolute", left: x, top: base - 470 * s * (k as number),
          width: 420 * s * (k as number), height: 9, background: "#DCE5EB", opacity: 0.5,
          zIndex: z + 1, transformOrigin: "0% 50%", transform: `rotate(134deg)` }} />
      )}
    </React.Fragment>
  ))}
  {[-1, 1].map((d, i) => (
    <div key={"an" + i} style={{ position: "absolute", left: x + d * 330 * s - 34 * s,
      top: base - 34 * s, width: 68 * s, height: 38 * s, background: CONCD, zIndex: z + 2,
      clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)" }} />
  ))}

  {/* the equipment cabin: a door, a vent louvre, a meter box and a cable duct */}
  <div style={{ position: "absolute", left: x + 96 * s, top: base - 152 * s, width: 224 * s,
    height: 152 * s, background: "#7E7A72", zIndex: z + 6, boxShadow: SH_D }} />
  <div style={{ position: "absolute", left: x + 96 * s, top: base - 152 * s, width: 224 * s,
    height: 13 * s, background: "#959086", zIndex: z + 7 }} />
  <div style={{ position: "absolute", left: x + 96 * s, top: base - 164 * s, width: 224 * s,
    height: 16 * s, background: "#D9D6CE", zIndex: z + 8, borderRadius: `${5 * s}px ${5 * s}px 0 0` }} />
  <div style={{ position: "absolute", left: x + 126 * s, top: base - 116 * s, width: 62 * s,
    height: 116 * s, background: "#4A4E54", zIndex: z + 9 }} />
  <div style={{ position: "absolute", left: x + 178 * s, top: base - 66 * s, width: 9 * s,
    height: 9 * s, borderRadius: 5, background: "#C9BFA6", zIndex: z + 10 }} />
  {Array.from({ length: 5 }, (_, i) => (
    <div key={"lv" + i} style={{ position: "absolute", left: x + 214 * s, top: base - 122 * s + i * 13 * s,
      width: 82 * s, height: 8 * s, background: "#5A5F66", zIndex: z + 9 }} />
  ))}
  <div style={{ position: "absolute", left: x + 232 * s, top: base - 56 * s, width: 46 * s,
    height: 34 * s, background: "#3E434A", zIndex: z + 9, borderRadius: 3 }} />
  <div style={{ position: "absolute", left: x + 238 * s, top: base - 48 * s, width: 34 * s,
    height: 10 * s, background: on > 0.5 ? GREEN : "#5A5F66", zIndex: z + 10 }} />

  {/* the generator and its fuel drums */}
  <div style={{ position: "absolute", left: x - 320 * s, top: base - 76 * s, width: 168 * s,
    height: 76 * s, background: "#4C5340", zIndex: z + 6, borderRadius: 4, boxShadow: SH }} />
  <div style={{ position: "absolute", left: x - 320 * s, top: base - 76 * s, width: 168 * s,
    height: 11 * s, background: "#666E55", zIndex: z + 7 }} />
  {Array.from({ length: 6 }, (_, i) => (
    <div key={"gv" + i} style={{ position: "absolute", left: x - 306 * s + i * 22 * s,
      top: base - 58 * s, width: 12 * s, height: 34 * s, background: "#343A2B", zIndex: z + 8 }} />
  ))}
  <div style={{ position: "absolute", left: x - 250 * s, top: base - 108 * s, width: 15 * s,
    height: 36 * s, background: "#3A3630", zIndex: z + 8 }} />
  {[0, 1, 2].map((i) => (
    <div key={"dr" + i} style={{ position: "absolute", left: x - 154 * s + i * 44 * s,
      top: base - 64 * s, width: 40 * s, height: 64 * s, borderRadius: 4 * s,
      background: i === 1 ? "#8A6C34" : "#7A4A3E", zIndex: z + 7 }}>
      <div style={{ position: "absolute", left: 0, top: 16 * s, width: "100%", height: 7 * s,
        background: "rgba(0,0,0,0.22)" }} />
      <div style={{ position: "absolute", left: 0, top: 38 * s, width: "100%", height: 7 * s,
        background: "rgba(0,0,0,0.22)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 8 * s,
        background: "#D9D6CE" }} />
    </div>
  ))}

  {/* a dish on its own mount, and a cable duct running to the cabin */}
  <div style={{ position: "absolute", left: x + 372 * s, top: base - 96 * s, width: 15 * s,
    height: 96 * s, background: "#5A5F66", zIndex: z + 6 }} />
  <div style={{ position: "absolute", left: x + 340 * s, top: base - 152 * s, width: 92 * s,
    height: 72 * s, borderRadius: "50%", background: "#8A9099", zIndex: z + 7,
    transform: "rotate(-16deg)" }} />
  <div style={{ position: "absolute", left: x + 356 * s, top: base - 140 * s, width: 62 * s,
    height: 48 * s, borderRadius: "50%", background: "#B4BAC2", zIndex: z + 8,
    transform: "rotate(-16deg)" }} />
  <div style={{ position: "absolute", left: x - 40 * s, top: base - 20 * s, width: 300 * s,
    height: 18 * s, background: "#6E6A62", zIndex: z + 5, borderRadius: 4 }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"dt" + i} style={{ position: "absolute", left: x - 30 * s + i * 42 * s,
      top: base - 22 * s, width: 8 * s, height: 22 * s, background: "#565249", zIndex: z + 6 }} />
  ))}

  {/* the ladder with its safety cage, going up out of frame */}
  <div style={{ position: "absolute", left: x - 34 * s, top: base - 520 * s, width: 44 * s,
    height: 520 * s, zIndex: z + 4 }}>
    {[0, 1].map((i) => (
      <div key={"lr" + i} style={{ position: "absolute", left: i * 34 * s, top: 0, width: 7 * s,
        height: "100%", background: "#5A5F66" }} />
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: 0, top: 14 * s + i * 32 * s,
        width: 41 * s, height: 5 * s, background: "#6E747C" }} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"cg" + i} style={{ position: "absolute", left: -13 * s, top: 20 * s + i * 64 * s,
        width: 70 * s, height: 5 * s, borderRadius: 4, background: "#4A4E54", opacity: 0.85 }} />
    ))}
  </div>

  {/* signage on the fence line */}
  <div style={{ position: "absolute", left: x - 440 * s, top: base - 116 * s, width: 96 * s,
    height: 72 * s, background: "#D9C86A", zIndex: z + 9, borderRadius: 4, boxShadow: SH,
    transform: "rotate(-5deg)" }}>
    <div style={{ position: "absolute", left: 8 * s, top: 8 * s, right: 8 * s, height: 26 * s,
      background: "#3A3630" }} />
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", left: 14 * s, top: 42 * s + i * 12 * s,
        width: (64 - i * 20) * s, height: 5 * s, background: "#3A3630" }} />
    ))}
  </div>
  <div style={{ position: "absolute", left: x - 440 * s + 44 * s, top: base - 48 * s, width: 9 * s,
    height: 50 * s, background: "#6E6A62", zIndex: z + 8 }} />
</>);

/* --- TOP-DOWN DRESSING, for cut D's hatch plate ------------------------- */

/** boot prints walking in from the frame edge — the single best top-down detail
    there is, because it puts a person in a shot with no person in it */
export const Prints: React.FC<{ x1: number; y1: number; x2: number; y2: number; n?: number;
  s?: number; z?: number; fade?: number }> =
  ({ x1, y1, x2, y2, n = 9, s = 1, z = 20, fade = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t;
      const side = i % 2 ? 1 : -1;
      const ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      return (
        <div key={"pr" + i} style={{ position: "absolute",
          left: px + side * 15 * s - 13 * s, top: py - 19 * s, width: 26 * s, height: 38 * s,
          borderRadius: `${12 * s}px ${12 * s}px ${7 * s}px ${7 * s}px`,
          background: "#B7B2A8", opacity: (0.30 + t * 0.42) * fade, zIndex: z,
          transform: `rotate(${ang + 90}deg)` }} />
      );
    })}
  </>);

/** the painted concrete apron the hatch is set into, showing through the drift */
export const Apron: React.FC<{ x: number; y: number; r?: number; z?: number; s?: number }> =
  ({ x, y, r = 340, z = 14, s = 1 }) => (<>
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      borderRadius: "50%", background: "#9C978D", opacity: 0.72, zIndex: z }} />
    <div style={{ position: "absolute", left: x - r * 0.92, top: y - r * 0.92, width: r * 1.84,
      height: r * 1.84, borderRadius: "50%", border: `${9 * s}px dashed #C9BF6A`, opacity: 0.5,
      boxSizing: "border-box", zIndex: z + 1 }} />
    <div style={{ position: "absolute", left: x - r * 1.28, top: y - r * 0.30, zIndex: z + 1,
      fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 108 * s, lineHeight: 1,
      color: "#8A857B", opacity: 0.62 }}>08</div>
    {/* cable conduit running away to the frame edge */}
    <div style={{ position: "absolute", left: x + r * 0.7, top: y - 13 * s, width: 640 * s,
      height: 26 * s, background: "#7A756C", opacity: 0.8, zIndex: z + 1,
      transform: "rotate(-9deg)", transformOrigin: "0% 50%" }} />
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"cd" + i} style={{ position: "absolute", left: x + r * 0.78 + i * 74 * s,
        top: y - 20 * s + i * 11 * s, width: 12 * s, height: 40 * s, background: "#5F5B54",
        opacity: 0.8, zIndex: z + 2, transform: "rotate(-9deg)" }} />
    ))}
  </>);

/** the shadow of somebody standing over it, cast in from the frame edge */
export const Overhead: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  o?: number }> = ({ x, y, s = 1, z = 70, f = 0, o = 0.30 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `rotate(${-14 + Math.sin(f / 26) * 1.6}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: -96 * s, top: 0, width: 192 * s, height: 210 * s,
      borderRadius: `${96 * s}px ${96 * s}px ${34 * s}px ${34 * s}px`, background: "#3C3A36",
      filter: "blur(7px)" }} />
    <div style={{ position: "absolute", left: -150 * s, top: 62 * s, width: 84 * s, height: 156 * s,
      borderRadius: 40 * s, background: "#3C3A36", filter: "blur(7px)",
      transform: "rotate(19deg)" }} />
    <div style={{ position: "absolute", left: 66 * s, top: 62 * s, width: 84 * s, height: 156 * s,
      borderRadius: 40 * s, background: "#3C3A36", filter: "blur(7px)",
      transform: "rotate(-19deg)" }} />
  </div>
);
