import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
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
    {/* the answer, streaming */}
    {lines.map((p, i) => (
      <div key={"al" + i} style={{ position: "absolute", left: 14 * s, top: (72 + i * 16) * s,
        width: `${(78 - i * 9) * p}%`, height: 9 * s, borderRadius: 4,
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
