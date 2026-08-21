import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh, squash, rock, shake,
  mono, ui, Ingot, Cable, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, ENAM, SODIUM, VIOLET, OXIDE, CYAN, IRON, EMBER, ING, INGH, INGD,
} from "./KnowWorld";

/* ===========================================================================
   REEL 117 · "KNOW" — THE PROPS.  Board: storyboards/117-know.md.

   ⭐⭐⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES. *"A whole lot of nothing even
   though there's more stuff"* — the object that drew that note was FOUR divs.
   Count divs per object BEFORE adding objects; detail-per-object and
   object-COUNT are different dials and only one of them was ever turned.
   Nothing in this file is under nine elements.

   ⭐⭐ CATEGORY IS COMMUNICATED BY STRUCTURE, NOT HUE (ANIMATION-QUALITY §11).
   Before drawing anything here, the four or five features a viewer actually
   uses to identify that category were listed, and they are all drawn:
     a FURNACE   = brick courses · an arched mouth · a lifted door · a flue
     an INGOT    = a chamfered wedge · a machined stamp panel · a mould seam
     a WHETSTONE = a round dressed face · a spindle · a trough · a dressing rest
     a SHUTTER   = horizontal slats · guide channels · a bottom rail · a latch
     a SOCKET    = a recessed bore · two keyed slots · a collar · a live lamp
   ⛔ Hue is usually the least of them, and it is often the one a gate is
      riding on and you cannot change.
   ========================================================================= */

/* =========================================================================
   S0/S1 · THE HOUR DRUM — the colossal cast-iron drum stamped 10,000 HRS.

   ⭐ THIS IS THE HOOK'S "BEFORE STATE" AND IT HAS TO BE LEGIBLE ON FRAME 0.
   It is the largest object in the reel (620px), it carries the reel's headline
   number as a CAST STAMP (a structural feature you have to draw anyway is free
   real estate for a real number), and it is DARK against the lit sand floor so
   the silhouette forms — reel 110's "name which side of the contrast the
   subject is on".
   ====================================================================== */
export const HourDrum: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  /** 0..1 — the gate lifting */ crack?: number; spin?: number }> =
  ({ x, y, f, s = 1, z = 34, crack = 0, spin = 0 }) => {
  const w = 640 * s, h = 430 * s;
  const gw = w * 0.26, gh = h * 0.17;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* ⭐ A HOPPER, NOT A WHEEL. v1 drew a 620px cast DRUM and on the contact
          sheet it read as a black disc with an asterisk on it — the §10 defect,
          a shape that measures fine and depicts nothing. A hopper reads as
          POURING at thumbnail size because its silhouette IS a funnel, and its
          flat face is somewhere a foundry stamp can actually live. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h * 0.72,
        clipPath: `polygon(0 0, 100% 0, ${50 + (gw / w) * 50}% 100%, ${50 - (gw / w) * 50}% 100%)`,
        background: `linear-gradient(172deg, ${mxh(IRON, 0.34)} 0%, ${mxh(IRON, 0.10)} 26%, ${dkh(IRON, 0.34)} 68%, ${dkh(IRON, 0.58)} 100%)` }} />
      {/* the rim band across the top — a hopper has a lip you can see into */}
      <div style={{ position: "absolute", left: -10 * s, top: -14 * s, width: w + 20 * s,
        height: 30 * s, borderRadius: 6 * s,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.40)} 0%, ${dkh(IRON, 0.30)} 60%, ${dkh(IRON, 0.62)} 100%)` }} />
      {/* what is IN it — a bed of hour-ingots, lit, visible over the lip. The
          before state has to say WHAT is about to pour. */}
      <div style={{ position: "absolute", left: 14 * s, top: 2 * s, width: w - 28 * s, height: 34 * s,
        overflow: "hidden", borderRadius: 4 * s }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"hi" + i} style={{ position: "absolute", left: (i * (w - 28 * s)) / 9 + 4 * s,
            top: 4 * s + (i % 2) * 9 * s, width: (w - 28 * s) / 10, height: 20 * s, borderRadius: 3 * s,
            background: `linear-gradient(180deg, ${INGH} 0%, ${INGD} 100%)` }} />
        ))}
      </div>
      {/* six riveted strakes down the funnel — plate steel, not a flat swatch */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"stk" + i} style={{ position: "absolute", left: (i + 1) * (w / 7), top: 24 * s,
          width: 4 * s, height: h * 0.66, background: hexa("#000000", 0.22),
          transform: `rotate(${(i - 2.5) * 5.4}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      {/* ⭐ THE CAST STAMP — the reel's headline number, raised proud on the
          hopper's own face, where a foundry mark actually goes. */}
      <div style={{ position: "absolute", left: "50%", top: h * 0.24, transform: "translateX(-50%)",
        padding: `${13 * s}px ${28 * s}px`, borderRadius: 9 * s, whiteSpace: "nowrap",
        background: `linear-gradient(180deg, ${mxh(IRON, 0.20)} 0%, ${dkh(IRON, 0.42)} 100%)`,
        border: `${5 * s}px solid ${hexa(INGD, 0.72)}` }}>
        <span style={{ ...mono(52 * s, 900), color: ING, letterSpacing: "0.05em" }}>{R.hours}</span>
      </div>
      {/* the discharge gate at the throat, lifting on `crack` */}
      <div style={{ position: "absolute", left: (w - gw) / 2, top: h * 0.72 - 2 * s, width: gw,
        height: gh, overflow: "hidden", borderRadius: `0 0 ${5 * s}px ${5 * s}px`,
        background: `linear-gradient(180deg, ${hexa(INGH, 0.96)} 0%, ${hexa(EMBER, 0.90)} 100%)`,
        border: `${5 * s}px solid ${dkh(IRON, 0.68)}` }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${-crack * 108}%)`,
          background: `linear-gradient(180deg, ${dkh(IRON, 0.18)} 0%, ${dkh(IRON, 0.52)} 100%)`,
          borderBottom: `${5 * s}px solid ${dkh(IRON, 0.74)}` }} />
      </div>
      {/* the gate ram that DRIVES it — a mechanism, so the trigger has a body */}
      <div style={{ position: "absolute", left: (w - gw) / 2 - 34 * s, top: h * 0.70, width: 30 * s,
        height: 54 * s, borderRadius: 5 * s, background: dkh(IRON, 0.58) }} />
      <div style={{ position: "absolute", left: (w - gw) / 2 - 26 * s, top: h * 0.70 - crack * 26 * s,
        width: 14 * s, height: 40 * s, borderRadius: 7 * s, background: mxh(IRON, 0.18) }} />
      {/* the two legs it stands on, so it is PLANT and not a floating funnel */}
      {[0.06, 0.86].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: w * k, top: h * 0.40, width: 26 * s,
          height: h * 0.60, borderRadius: 4 * s, transform: `rotate(${i ? -7 : 7}deg)`,
          background: `linear-gradient(90deg, ${dkh(IRON, 0.60)} 0%, ${mxh(IRON, 0.06)} 44%, ${dkh(IRON, 0.66)} 100%)` }} />
      ))}
    </div>
  );
};

/* =========================================================================
   S0/S1 · THE POUR — the torrent of hour-ingots.

   ⭐⭐⭐ THE HIGHEST-VALUE SHAPE IN THE MOTION TABLE: a full-panel-width
   high-contrast travelling band. Every ingot is 118x44 — well over the 40px
   floor on the short side — and they alternate against the DARK chute walls,
   so every boundary is light-against-shadow and the black point does not move.
   ====================================================================== */
export const Pour: React.FC<{ f: number; at: number; x0: number; y0: number; x1: number;
  y1: number; n?: number; z?: number; rate?: number; s?: number; spread?: number }> =
  ({ f, at, x0, y0, x1, y1, n = 26, z = 52, rate = 0.055, s = 1, spread = 118 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const dx = x1 - x0, dy = y1 - y0;
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = ((lf * rate + i / n) % 1);
    const off = (rnd(i, 5) - 0.5) * spread;
    const px = x0 + dx * t - Math.sin((ang * Math.PI) / 180) * off;
    const py = y0 + dy * t + Math.cos((ang * Math.PI) / 180) * off;
    const sc = (0.82 + rnd(i, 9) * 0.36) * s;
    return <Ingot key={"po" + i} x={px} y={py} s={sc} z={z + (i % 3)}
      rot={ang + (rnd(i, 13) - 0.5) * 40} hot={1} />;
  })}</>);
};

/** the chute the pour runs down — dark walls, so the ingots have something to
    be bright against, plus a ribbed floor that catches the light between them */
export const Chute: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  w?: number; z?: number; f?: number }> =
  ({ x0, y0, x1, y1, w = 190, z = 30, f = 0 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`, overflow: "hidden",
      background: `linear-gradient(180deg, ${dkh(IRON, 0.44)} 0%, ${dkh(IRON, 0.20)} 40%, ${dkh(IRON, 0.60)} 100%)`,
      borderTop: `7px solid ${dkh(IRON, 0.66)}`, borderBottom: `9px solid ${dkh(IRON, 0.74)}` }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={"rib" + i} style={{ position: "absolute", top: 0, height: w,
          left: (i * (len / 16) + ((f * 0.6) % (len / 16))), width: 9,
          background: hexa("#000000", 0.30) }} />
      ))}
    </div>
  );
};

/** the 30 SEC mould that receives the pour — a real sand mould: a box, a
    parting line, two pouring lugs, a stamped face plate and a lip that
    overflows */
export const Mould: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  fill?: number; hot?: number }> =
  ({ x, y, f, s = 1, z = 44, fill = 0, hot = 0 }) => {
  const w = 300 * s, h = 178 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the box */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 7 * s, overflow: "hidden",
        background: `linear-gradient(178deg, ${mxh("#6A5A48", 0.16)} 0%, ${dkh("#6A5A48", 0.30)} 58%, ${dkh("#6A5A48", 0.54)} 100%)`,
        border: `${5 * s}px solid ${dkh("#6A5A48", 0.60)}` }}>
        {/* what is in it, rising */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`,
          background: `linear-gradient(180deg, ${INGH} 0%, ${ING} 30%, ${INGD} 100%)` }} />
        {/* the parting line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.42, height: 3 * s,
          background: hexa("#000000", 0.34) }} />
      </div>
      {/* two pouring lugs */}
      {[0.08, 0.78].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: w * k, top: -14 * s,
          width: w * 0.14, height: 20 * s, borderRadius: `${5 * s}px ${5 * s}px 0 0`,
          background: dkh("#6A5A48", 0.52), border: `${3 * s}px solid ${dkh("#6A5A48", 0.66)}` }} />
      ))}
      {/* the stamped face plate — the reel's other spoken figure */}
      <div style={{ position: "absolute", left: "50%", top: h * 0.52, transform: "translateX(-50%)",
        padding: `${6 * s}px ${14 * s}px`, borderRadius: 6 * s, whiteSpace: "nowrap",
        background: hexa("#2A231A", 0.72), border: `${3 * s}px solid ${hexa(INGD, 0.56)}` }}>
        <span style={{ ...mono(24 * s, 900), color: ING, letterSpacing: "0.08em" }}>{R.secs}</span>
      </div>
      {hot > 0 && <div style={{ position: "absolute", left: -10 * s, right: -10 * s, top: -10 * s,
        height: 16 * s, borderRadius: 8 * s, background: hexa(EMBER, 0.50 * hot) }} />}
    </div>
  );
};

/* =========================================================================
   S2/S8/S12 · THE GRIND — the villain.

   A whetstone treadmill: the 10,000 hours, charged one at a time. Category
   features drawn: a round DRESSED FACE with visible grinding grooves, a
   spindle with bearing caps, a water trough under it, and a dressing rest.

   ⛔ It is UNDEFEATED until S12. `stop` is only ever non-zero there.
   ====================================================================== */
export const Grind: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  /** 0..1 — the seize. NON-ZERO ONLY AT S12. */ stop?: number; rate?: number;
  /** how many Claudes are trudging on it */ n?: number; lit?: number }> =
  ({ x, y, f, s = 1, z = 36, stop = 0, rate = 2.1, n = 5, lit = 1 }) => {
  const d = 470 * s;
  /* the wheel decelerates to a dead stop over `stop`, and JUDDERS as it goes */
  const spd = rate * (1 - stop);
  const jud = stop > 0 && stop < 1 ? Math.sin(f * 2.3) * 7 * stop * (1 - stop) * 4 : 0;
  const rot = f * spd + jud;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d, width: d, height: d * 1.28, zIndex: z }}>
      {/* the water trough, under it */}
      <div style={{ position: "absolute", left: d * 0.06, top: d * 0.92, width: d * 0.88,
        height: d * 0.16, borderRadius: 8 * s, background: dkh("#2E3840", 0.34),
        border: `${4 * s}px solid ${dkh("#2E3840", 0.58)}` }}>
        <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 6 * s, height: 8 * s,
          borderRadius: 4 * s, background: hexa("#7FA8BE", 0.34 * lit) }} />
      </div>
      {/* the stone — a round dressed face, dark, with real grinding grooves */}
      <div style={{ position: "absolute", left: 0, top: 0, width: d, height: d, borderRadius: "50%",
        overflow: "hidden",
        background: `radial-gradient(68% 60% at 38% 28%, ${mxh("#5A5750", 0.20)} 0%, ${dkh("#5A5750", 0.26)} 44%, ${dkh("#5A5750", 0.58)} 100%)`,
        border: `${9 * s}px solid ${dkh("#3E3C37", 0.44)}` }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${rot}deg)` }}>
          {Array.from({ length: 14 }, (_, i) => (
            <div key={"gv" + i} style={{ position: "absolute", left: "50%", top: "50%",
              width: d * 0.96, height: 5 * s, marginLeft: -d * 0.48, marginTop: -2.5 * s,
              transform: `rotate(${i * 12.85}deg)`,
              background: i % 2 ? hexa("#000000", 0.26) : hexa("#B8B2A6", 0.16) }} />
          ))}
          {/* three dressing scars, so the face reads as WORN */}
          {[0.24, 0.52, 0.78].map((k, i) => (
            <div key={"sc" + i} style={{ position: "absolute", left: d * k, top: d * (0.2 + i * 0.24),
              width: d * 0.16, height: 7 * s, borderRadius: 4 * s,
              background: hexa("#000000", 0.30), transform: `rotate(${i * 33}deg)` }} />
          ))}
        </div>
      </div>
      {/* the spindle and its bearing caps */}
      <div style={{ position: "absolute", left: "50%", top: d * 0.5 - 26 * s, width: d * 0.20,
        height: 52 * s, marginLeft: -d * 0.10, borderRadius: 26 * s,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.48)} 100%)`,
        border: `${5 * s}px solid ${dkh(IRON, 0.66)}` }} />
      {/* the dressing rest */}
      <div style={{ position: "absolute", left: d * 0.80, top: d * 0.40, width: d * 0.30,
        height: 20 * s, borderRadius: 5 * s, background: dkh(IRON, 0.52),
        border: `${3 * s}px solid ${dkh(IRON, 0.68)}` }} />
      {/* ⭐ THE CLAUDES TRUDGING ON IT. They are the reason it is a villain and
          not a machine: the cost is a person, walking, getting nowhere.
          Their pitch is d*0.88/(n+1) which at n=5 is 69px for 62px bodies —
          over the 0.85 spacing law. */}
      {Array.from({ length: n }, (_, i) => {
        const a = ((f * spd) % 360) * (Math.PI / 180) + (i / n) * Math.PI * 0.86 + 0.6;
        const rr = d * 0.50 + 30 * s;
        const px = d / 2 + Math.cos(a - Math.PI / 2) * rr;
        const py = d / 2 + Math.sin(a - Math.PI / 2) * rr;
        if (py > d * 0.62) return null;             /* the far side is occluded */
        const bob = Math.abs(Math.sin(f / 6 + i * 1.9)) * 5 * s * (1 - stop);
        return (
          <div key={"tr" + i} style={{ position: "absolute", left: px - 31 * s, top: py - 62 * s - bob,
            width: 62 * s, height: 62 * s, zIndex: 6,
            transform: `rotate(${((a * 180) / Math.PI) * 0.34}deg)` }}>
            {/* a trudging body: bowed, with a sack — drawn, not a Mascot, because
                a Mascot at 62px is a blob and this rank is texture, not cast */}
            <div style={{ position: "absolute", left: 12 * s, top: 16 * s, width: 38 * s,
              height: 44 * s, borderRadius: 9 * s, background: dkh(CLAY, 0.44) }} />
            <div style={{ position: "absolute", left: 2 * s, top: 6 * s, width: 26 * s,
              height: 22 * s, borderRadius: 6 * s, background: dkh("#4A4038", 0.24) }} />
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   S3 · THE INGOT RACK + THE USAGE GAUGE.

   ⛔ EDGE 1: the gauge is drawn in SEGMENTS, countable, and carries NO
   numeral, NO percentage and NO price. "money and usage limits" is depicted by
   the ingots leaving the rack, which is the currency the hook established.
   ====================================================================== */
export const IngotRack: React.FC<{ x: number; y: number; f: number; n?: number; z?: number;
  s?: number; /** how many have been taken, 0..n */ gone?: number; at?: number }> =
  ({ x, y, f, n = 18, z = 40, s = 1, gone = 0, at = 0 }) => {
  const cols = 3, rows = Math.ceil(n / cols);
  const cw = 132 * s, ch = 56 * s;
  const w = cols * cw + 26 * s, h = rows * ch + 26 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the rack frame — uprights, shelves, feet */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6 * s,
        background: hexa(dkh(IRON, 0.34), 0.62), border: `${5 * s}px solid ${dkh(IRON, 0.60)}` }} />
      {Array.from({ length: rows + 1 }, (_, i) => (
        <div key={"sh" + i} style={{ position: "absolute", left: 6 * s, right: 6 * s,
          top: 13 * s + i * ch, height: 7 * s, borderRadius: 3 * s, background: dkh(IRON, 0.56) }} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* they leave from the TOP DOWN, one every 4 frames, staggered across
           the scene's full duration — never all inside the first third */
        const taken = i < gone;
        if (taken) return null;
        return <Ingot key={"rk" + i} x={17 * s + c * cw + cw / 2} y={13 * s + r * ch + ch * 0.44}
          s={0.98 * s} z={4} stamp="1 HR" />;
      })}
    </div>
  );
};

/** ⛔ NO NUMERAL, NO `%`, NO `$`. Ten segments; the count IS the reading. */
export const UsageGauge: React.FC<{ x: number; y: number; lit: number; n?: number; s?: number;
  z?: number; label?: string; vert?: boolean }> =
  ({ x, y, lit, n = 10, s = 1, z = 70, label, vert = true }) => {
  const sw = 54 * s, sh = 26 * s, gap = 7 * s;
  const run = n * (sh + gap) + 14 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y - (vert ? run : 0), zIndex: z,
      width: vert ? sw + 16 * s : run, height: vert ? run : sh + 16 * s,
      borderRadius: 7 * s, background: hexa("#14171C", 0.78),
      border: `${3 * s}px solid ${dkh(IRON, 0.56)}`, padding: 8 * s }}>
      {Array.from({ length: n }, (_, i) => {
        const on = (n - 1 - i) < lit;
        return (
          <div key={"sg" + i} style={{ position: "absolute",
            left: vert ? 8 * s : 8 * s + i * (sh + gap), top: vert ? 8 * s + i * (sh + gap) : 8 * s,
            width: vert ? sw : sh, height: vert ? sh : sw, borderRadius: 3 * s,
            background: on ? `linear-gradient(180deg, ${INGH} 0%, ${INGD} 100%)` : hexa("#000000", 0.46),
            border: `${1.5 * s}px solid ${on ? hexa(INGD, 0.5) : hexa("#000000", 0.3)}` }} />
        );
      })}
      {label && <div style={{ position: "absolute", left: 0, right: 0, bottom: -24 * s,
        textAlign: "center", whiteSpace: "nowrap" }}>
        <span style={{ ...mono(14 * s, 900), color: "#CFC6AE", letterSpacing: "0.14em" }}>{label}</span>
      </div>}
    </div>
  );
};

/* =========================================================================
   S6 · THE NINE-PIECE ASSEMBLY — what "more complex tasks" actually looks like.

   ⭐ §3: draw the NOUN and the VERB the sentence uses. "Complex" is not a
   colour and it is not a bigger box — it is a thing with NINE PARTS that has
   to be put together in an order. So: nine real parts, and they UNFOLD.
   ====================================================================== */
export const Assembly: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; /** 0 = crated, 1 = fully unfolded */ open?: number }> =
  ({ x, y, f, at, s = 1, z = 54, open = 0 }) => {
  const d = 240 * s;
  const PARTS: Array<[number, number, number, number, string]> = [
    [-0.46, -0.10, 0.30, 0.44, GOLD], [0.46, -0.10, 0.30, 0.44, GOLD],
    [-0.24, -0.46, 0.24, 0.26, TEAL], [0.24, -0.46, 0.24, 0.26, TEAL],
    [0.00, -0.62, 0.34, 0.20, CLAY], [-0.34, 0.34, 0.26, 0.26, VIOLET],
    [0.34, 0.34, 0.26, 0.26, VIOLET], [0.00, 0.52, 0.42, 0.18, STEEL],
    [0.00, 0.00, 0.44, 0.44, BRASS],
  ];
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d, zIndex: z }}>
      {PARTS.map(([ox, oy, pw, ph, c], i) => {
        /* four DISCRETE pops, not one tween — §1's row, applied honestly */
        const step = Math.min(1, Math.max(0, (open * 4 - Math.floor(i / 2.5)) ));
        const k = step;
        const px = d / 2 + ox * d * k, py = d / 2 + oy * d * k;
        const W = pw * d, Hh = ph * d;
        return (
          <div key={"pt" + i} style={{ position: "absolute", left: px - W / 2, top: py - Hh / 2,
            width: W, height: Hh, borderRadius: 6 * s, zIndex: i === 8 ? 2 : 4,
            transform: `rotate(${(i - 4) * 5 * k}deg)`,
            background: `linear-gradient(170deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.24)} 60%, ${dkh(c, 0.48)} 100%)`,
            border: `${3 * s}px solid ${dkh(c, 0.54)}` }}>
            {/* ⛔⛔ TWO BORES AT 26% PLUS A CENTRED RIB AT 22% IS A FACE. On the
                render every one of the nine parts read as a cartoon head with
                two eyes and a mouth, in a reel whose actual cast is faces — so
                the "complex assembly" looked like nine more Claudes floating in
                the air. This is the §11 lesson with the sign flipped: CATEGORY
                IS STRUCTURE, and the structure I drew was the wrong category.
                A machined plate has FOUR CORNER BOLT HOLES, a chamfer and an
                offset slot — none of which can line up into a face. */}
            {[[0.14, 0.16], [0.86, 0.16], [0.14, 0.84], [0.86, 0.84]].map((q, k) => (
              <div key={"bo" + k} style={{ position: "absolute", left: `${q[0] * 100}%`,
                top: `${q[1] * 100}%`, width: 10 * s, height: 10 * s, marginLeft: -5 * s,
                marginTop: -5 * s, borderRadius: "50%", background: hexa("#000000", 0.36),
                border: `${1.5 * s}px solid ${hexa("#FFFFFF", 0.14)}` }} />
            ))}
            {/* the offset machined slot — deliberately NOT centred */}
            <div style={{ position: "absolute", left: "28%", top: "40%", width: "44%",
              height: 6 * s, borderRadius: 3 * s, background: hexa("#000000", 0.26),
              transform: "rotate(-12deg)" }} />
            {/* the chamfer, so the plate has a machined edge */}
            <div style={{ position: "absolute", right: -1, top: -1, width: 18 * s,
              height: 18 * s, background: hexa("#FFFFFF", 0.16),
              clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   S7/S8 · THE MEMORY VAULT AND THE PROJECT BOOTH.

   ⭐ THE VAULT IS THE BIGGEST BRIGHT MASS SINCE THE HOOK, ON PURPOSE. S8 has
   to be able to TAKE it away, and a thing you take away has to have been
   there. The BEFORE state is deliberately generous.
   ====================================================================== */
export const SpoolWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; cols?: number; rows?: number; lit?: number }> =
  ({ x, y, w, h, f, z = 26, cols = 9, rows = 5, lit = 1 }) => {
  const cw = w / cols, ch = h / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 8, overflow: "hidden",
      background: `linear-gradient(178deg, ${dkh(ENAM, 0.24)} 0%, ${dkh(ENAM, 0.50)} 100%)`,
      border: `6px solid ${dkh(ENAM, 0.58)}` }}>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        /* each spool turns on its own clock, so the wall is a field of motion
           rather than a texture — and the lit face is CREAM, which is the only
           value that survives the greyscale downsample */
        const rot = f * (0.9 + rnd(i, 3) * 1.5) + i * 24;
        const on = rnd(i, 7) > 0.16 ? lit : lit * 0.34;
        return (
          <div key={"sp" + i} style={{ position: "absolute", left: c * cw + cw * 0.14,
            top: r * ch + ch * 0.14, width: cw * 0.72, height: ch * 0.72 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
              background: hexa("#0C1410", 0.5), border: `3px solid ${hexa(GOLD, 0.28 * on)}` }} />
            <div style={{ position: "absolute", inset: cw * 0.10, borderRadius: "50%",
              background: `conic-gradient(from ${rot}deg, ${hexa(CREAMB, 0.92 * on)} 0deg, ${hexa(GOLD, 0.50 * on)} 90deg, ${hexa(CREAMB, 0.88 * on)} 180deg, ${hexa(GOLD, 0.46 * on)} 270deg, ${hexa(CREAMB, 0.92 * on)} 360deg)` }} />
            <div style={{ position: "absolute", left: "42%", top: "42%", width: "16%", height: "16%",
              borderRadius: "50%", background: dkh(ENAM, 0.60) }} />
          </div>
        );
      })}
    </div>
  );
};

/** a spool travelling the feed rail, out of the wall and into his hands */
export const FeedSpool: React.FC<{ x0: number; y0: number; x1: number; y1: number; f: number;
  ph?: number; period?: number; z?: number; s?: number; cut?: number }> =
  ({ x0, y0, x1, y1, f, ph = 0, period = 54, z = 58, s = 1, cut }) => {
  /* after `cut` the rail is severed: the spool stops mid-run and falls */
  const severed = cut != null && f >= cut;
  const t = severed ? Math.min(1, ((cut! + ph) % period) / period)
                    : (((f + ph) % period) / period);
  const drop = severed ? Math.min(180, (f - cut!) * (f - cut!) * 0.34) : 0;
  const px = x0 + (x1 - x0) * t, py = y0 + (y1 - y0) * t + drop;
  const d = 54 * s;
  return (
    <div style={{ position: "absolute", left: px - d / 2, top: py - d / 2, width: d, height: d,
      zIndex: z, opacity: severed ? Math.max(0, 1 - (f - cut!) / 22) : 1,
      transform: `rotate(${f * 5}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `conic-gradient(${CREAMB} 0deg, ${GOLD} 120deg, ${CREAMB} 240deg, ${GOLD} 360deg)`,
        border: `4px solid ${dkh(GOLD, 0.34)}` }} />
      <div style={{ position: "absolute", left: "38%", top: "38%", width: "24%", height: "24%",
        borderRadius: "50%", background: dkh(ENAM, 0.5) }} />
    </div>
  );
};

/** the feed rail itself — 40px minimum, because a thin rail is not a rail */
export const FeedRail: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  z?: number; snapped?: number; f?: number }> =
  ({ x0, y0, x1, y1, z = 30, snapped = 0, f = 0 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  const gap = snapped * len * 0.30;
  return (
    <>
      {[0, 1].map((half) => (
        <div key={"fr" + half} style={{ position: "absolute", left: x0, top: y0 - 20,
          width: half ? len * 0.5 - gap * 0.5 : len * 0.5 - gap * 0.5, height: 40, zIndex: z,
          transformOrigin: "0% 50%",
          transform: `rotate(${ang}deg) translateX(${half ? len * 0.5 + gap * 0.5 : 0}px) rotate(${snapped * (half ? 5 : -5)}deg)`,
          borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.32)} 52%, ${dkh(BRASS, 0.56)} 100%)`,
          border: `3px solid ${dkh(BRASS, 0.58)}` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 15, height: 8,
            background: hexa("#000000", 0.26) }} />
        </div>
      ))}
    </>
  );
};

/** ⛔ EDGE 4: the booth plate QUOTES Anthropic. It does not judge. */
export const Booth: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; /** 0..1 — the shutter travel */ shut?: number; lit?: number }> =
  ({ x, y, w, h, f, z = 46, shut = 0, lit = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y - h, width: w, height: h, zIndex: z }}>
    {/* the frame, with real guide channels either side */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 8, overflow: "hidden",
      background: `linear-gradient(180deg, ${dkh("#243036", 0.20)} 0%, ${dkh("#243036", 0.52)} 100%)`,
      border: `7px solid ${dkh("#243036", 0.60)}` }}>
      {/* the booth's own single bulb, and its one local spool box */}
      <div style={{ position: "absolute", left: "50%", top: 22, width: 54, height: 20,
        marginLeft: -27, borderRadius: 6, background: hexa(TEAL, 0.62 * lit) }} />
      <div style={{ position: "absolute", left: "50%", bottom: 26, width: 88, height: 66,
        marginLeft: -44, borderRadius: 6, background: hexa("#0E1618", 0.72),
        border: `3px solid ${hexa(TEAL, 0.34)}` }}>
        {/* exactly ONE spool in it — the whole point of the scene */}
        <div style={{ position: "absolute", left: 22, top: 16, width: 40, height: 34,
          borderRadius: "50%", background: `conic-gradient(${CREAMB} 0deg, ${GOLD} 180deg, ${CREAMB} 360deg)` }} />
      </div>
      {/* ⭐ THE RECEIPT — Anthropic's own three words, on a cream chip */}
      <div style={{ position: "absolute", left: "50%", top: 62, transform: "translateX(-50%)",
        padding: "7px 14px", borderRadius: 7, background: CREAMB, whiteSpace: "nowrap",
        border: `2.5px solid ${dkh(CREAMB, 0.18)}` }}>
        <span style={{ ...mono(16, 900), color: "#241F17", letterSpacing: "0.06em" }}>{R.projectPlate}</span>
      </div>
    </div>
    {/* the door label */}
    <div style={{ position: "absolute", left: "50%", top: -34, transform: "translateX(-50%)",
      padding: "6px 18px", borderRadius: 7, background: "#FFFFFF", whiteSpace: "nowrap",
      border: "2.5px solid #E4DCC8", boxShadow: SH }}>
      <span style={{ ...ui(21, 900), color: "#241F17", letterSpacing: "0.06em" }}>PROJECT</span>
    </div>
    {/* THE SHUTTER — horizontal slats, guide channels, a bottom rail, a latch */}
    <div style={{ position: "absolute", left: -8, top: 0, width: w + 16, height: h,
      overflow: "hidden", zIndex: 9 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: -h + shut * h, height: h,
        background: `linear-gradient(180deg, ${dkh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.48)} 100%)` }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0,
            top: i * (h / 14), height: h / 14 - 3,
            background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.34)} 62%, ${dkh(STEEL, 0.52)} 100%)`,
            borderBottom: `3px solid ${dkh(STEEL, 0.58)}` }} />
        ))}
        {/* the bottom rail and its latch */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 22,
          background: dkh(IRON, 0.58) }} />
        <div style={{ position: "absolute", left: "50%", bottom: 4, width: 60, height: 14,
          marginLeft: -30, borderRadius: 4, background: dkh(IRON, 0.72) }} />
      </div>
    </div>
    {/* the guide channels, drawn OVER the shutter so it reads as running in them */}
    {[-8, w + 2].map((lx, i) => (
      <div key={"gc" + i} style={{ position: "absolute", left: lx, top: -6, width: 14,
        height: h + 6, zIndex: 12, borderRadius: 4, background: dkh(IRON, 0.60),
        border: `2px solid ${dkh(IRON, 0.74)}` }} />
    ))}
  </div>
);

/* =========================================================================
   S9/S10 · THE PAGE WINDOWS, THE TAB RAIL, THE FORM BOARD.

   ⭐ §10 — the SCAN NEEDS A FINDING. `read` below does not just sweep a lamp:
   the lines it has passed LIGHT UP AND LIFT OFF as a stack of found facts. A
   scan that surfaces nothing is a progress bar.
   ====================================================================== */
export const PageWindow: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; lit?: number; rows?: number; /** 0..1 how far the read lamp has gone */
  read?: number; /** the drawer that opens when it is clicked */ click?: number; i?: number }> =
  ({ x, y, w, h, f, z = 32, lit = 1, rows = 9, read = 0, click = 0, i = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y - h, width: w, height: h, zIndex: z }}>
    {/* the shopfront frame + a real cill */}
    <div style={{ position: "absolute", inset: 0, borderRadius: 6,
      background: dkh("#2A3540", 0.40), border: `6px solid ${dkh("#2A3540", 0.62)}` }} />
    {/* the lit page inside */}
    <div style={{ position: "absolute", left: 10, top: 10, right: 10, bottom: 10,
      overflow: "hidden", borderRadius: 3, background: hexa(PAPER, 0.90 * lit) }}>
      {/* a real browser chrome bar — three lights and an address rule */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.13,
        background: hexa("#DCD6C8", lit), borderBottom: `2px solid ${hexa("#B9B2A2", lit)}` }}>
        {[0, 1, 2].map((k) => (
          <div key={"tl" + k} style={{ position: "absolute", left: 8 + k * 14, top: h * 0.045,
            width: 9, height: 9, borderRadius: "50%", background: hexa("#9A948B", lit) }} />
        ))}
        <div style={{ position: "absolute", left: 54, right: 10, top: h * 0.04, height: h * 0.05,
          borderRadius: 3, background: hexa("#FFFFFF", 0.9 * lit) }} />
      </div>
      {/* the content rows. Rows the lamp has passed go CREAM->CLAY: they have
          been READ, and the ones that lift off in S10 come from here. */}
      {Array.from({ length: rows }, (_, r) => {
        const done = read > (r + 0.5) / rows;
        const rw = (0.44 + rnd(r + i * 7, 3) * 0.5) * (w - 30);
        return (
          <div key={"rw" + r} style={{ position: "absolute", left: 14,
            top: h * 0.19 + r * ((h * 0.74) / rows), width: rw, height: Math.max(7, h * 0.038),
            borderRadius: 3, background: done ? hexa(CLAY, 0.86 * lit) : hexa("#B4AEA2", 0.72 * lit) }} />
        );
      })}
      {/* the button that gets clicked, and the drawer that answers it */}
      <div style={{ position: "absolute", right: 16, bottom: 14, width: w * 0.30,
        height: h * 0.11, borderRadius: 5, background: hexa(CLAY, lit),
        border: `2px solid ${hexa(dkh(CLAY, 0.30), lit)}`,
        transform: `scale(${1 - click * 0.10})` }} />
      <div style={{ position: "absolute", left: 14, bottom: 14 + click * h * 0.16,
        width: w * 0.46, height: h * 0.16 * click, borderRadius: 4, overflow: "hidden",
        background: hexa(GOLD, 0.9 * lit * (click > 0.02 ? 1 : 0)) }} />
    </div>
  </div>
);

/** the stack of facts a read actually produces */
export const Facts: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  z?: number; s?: number }> = ({ x, y, f, at, n = 5, z = 68, s = 1 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  return (<>{Array.from({ length: n }, (_, i) => {
    const t = E(lf, i * 4, i * 4 + 16, 0, 1, OUT);
    if (t <= 0) return null;
    const w = (96 + rnd(i, 5) * 70) * s;
    return (
      <div key={"fc" + i} style={{ position: "absolute", left: x - w / 2 + (rnd(i, 9) - 0.5) * 90 * t,
        top: y - t * (76 + i * 34) * s, width: w, height: 22 * s, borderRadius: 4 * s, zIndex: z,
        opacity: Math.min(1, t * 2), transform: `rotate(${(rnd(i, 3) - 0.5) * 16 * t}deg)`,
        background: `linear-gradient(180deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.14)} 100%)`,
        border: `${2 * s}px solid ${hexa(CLAY, 0.5)}` }}>
        <div style={{ position: "absolute", left: 6 * s, top: 7 * s, right: 6 * s, height: 6 * s,
          borderRadius: 3 * s, background: hexa(CLAY, 0.44) }} />
      </div>
    );
  })}</>);
};

/** the FORM board — seven fields that fill with real values, one after another */
export const FormBoard: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; z?: number; n?: number; /** 0..1 */ done?: number; submitted?: number }> =
  ({ x, y, w, h, f, at, z = 50, n = 7, done = 0, submitted = 0 }) => {
  const rowH = (h - 96) / n;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      transform: `rotateY(${submitted * 12}deg) rotate(${submitted * -3}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8,
        background: `linear-gradient(178deg, ${PAPER} 0%, ${dkh(PAPER, 0.12)} 100%)`,
        border: `6px solid ${dkh(PAPER, 0.26)}`, boxShadow: SH_D }} />
      {/* the board's own head rule */}
      <div style={{ position: "absolute", left: 20, top: 20, width: w * 0.44, height: 18,
        borderRadius: 4, background: hexa("#241F17", 0.72) }} />
      {Array.from({ length: n }, (_, i) => {
        const fillT = Math.min(1, Math.max(0, done * n - i));
        return (
          <div key={"fd" + i} style={{ position: "absolute", left: 20, right: 20,
            top: 62 + i * rowH, height: rowH - 12, borderRadius: 5,
            background: hexa("#DEDACE", 0.9), border: `2px solid ${hexa("#B9B2A2", 0.8)}`,
            overflow: "hidden" }}>
            {/* the field's own label tab, so it reads as a FORM and not a list */}
            <div style={{ position: "absolute", left: 8, top: "50%", marginTop: -6, width: 54,
              height: 12, borderRadius: 3, background: hexa("#9A948B", 0.7) }} />
            {/* the value that lands in it */}
            <div style={{ position: "absolute", left: 72, top: "50%", marginTop: -8, height: 16,
              width: `${fillT * (0.42 + rnd(i, 7) * 0.34) * 100}%`, borderRadius: 3,
              background: hexa(CLAY, 0.9) }} />
          </div>
        );
      })}
      {/* the SUBMITTED band — the arrival that costs something */}
      {submitted > 0 && (
        <div style={{ position: "absolute", left: "50%", top: "48%", zIndex: 6,
          transform: `translate(-50%,-50%) rotate(-9deg) scale(${E(f, at, at + 8, 1.5, 1, BACK)})`,
          padding: "12px 30px", borderRadius: 8, background: hexa(GREEN, 0.94),
          border: `4px solid ${dkh(GREEN, 0.34)}`, opacity: submitted }}>
          <span style={{ ...mono(30, 900), color: "#F6FFF9", letterSpacing: "0.12em" }}>SUBMITTED</span>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   S11 · THE CODE RIG AND THE APP IT BUILDS.

   ⭐ §1: NINE DISCRETE POPS, NEVER ONE TWEEN — and spread across the FULL
   duration, because an arrival inside the first third leaves the rest dead.
   ====================================================================== */
export const CodeRig: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; hot?: number }> = ({ x, y, w, h, f, z = 34, hot = 1 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
    {/* the bench body */}
    <div style={{ position: "absolute", left: 0, top: h * 0.30, width: w, height: h * 0.70,
      borderRadius: 8, background: `linear-gradient(178deg, ${mxh(IRON, 0.18)} 0%, ${dkh(IRON, 0.44)} 100%)`,
      border: `6px solid ${dkh(IRON, 0.62)}` }} />
    {/* the TAB — a real browser/app tab shape, which is what "the Code tab" is */}
    <div style={{ position: "absolute", left: w * 0.06, top: 0, width: w * 0.34, height: h * 0.32,
      borderRadius: "10px 10px 0 0",
      background: `linear-gradient(180deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.10)} 100%)`,
      border: `5px solid ${dkh(CREAMB, 0.24)}`, borderBottom: "none",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
      <Img src={staticFile("logos/claude.svg")} style={{ width: h * 0.13, height: h * 0.13 }} />
      <span style={{ ...ui(h * 0.13, 900), color: "#241F17", letterSpacing: "0.04em" }}>CODE</span>
    </div>
    {/* the sibling tabs, unlit, so the lit one RANKS */}
    {[0.44, 0.62].map((k, i) => (
      <div key={"tb" + i} style={{ position: "absolute", left: w * k, top: h * 0.08,
        width: w * 0.15, height: h * 0.24, borderRadius: "8px 8px 0 0",
        background: dkh(IRON, 0.30), border: `4px solid ${dkh(IRON, 0.50)}`, borderBottom: "none" }} />
    ))}
    {/* the intake slot, and the light inside it */}
    <div style={{ position: "absolute", left: w * 0.10, top: h * 0.40, width: w * 0.26,
      height: h * 0.10, borderRadius: 5, background: hexa("#0A0D16", 0.86),
      border: `4px solid ${dkh(IRON, 0.62)}` }}>
      <div style={{ position: "absolute", left: 5, right: 5, top: 5, bottom: 5, borderRadius: 3,
        background: hexa("#FFE0B0", 0.30 * hot) }} />
    </div>
    {/* the bench's own working surface — where the app rises */}
    <div style={{ position: "absolute", left: w * 0.05, top: h * 0.56, width: w * 0.90,
      height: h * 0.06, borderRadius: 4, background: dkh(IRON, 0.66) }} />
  </div>
);

/** the app that assembles — nine discrete parts, each a real UI element */
export const AppBuild: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; z?: number; step?: number }> =
  ({ x, y, w, h, f, at, z = 56, step = 0 }) => {
  const T = [0, 4, 8, 12, 17, 30, 48, 60, 74];   /* frames, not a constant step */
  const pop = (i: number) => E(f, at + T[i], at + T[i] + 6, 0, 1, BACK);
  const on = (i: number) => (step > i ? 1 : pop(i));
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* 1 the frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10, transformOrigin: "50% 100%",
        transform: `scaleY(${on(0)})`, overflow: "hidden",
        background: `linear-gradient(178deg, #232A3E 0%, #161B2A 100%)`,
        border: `6px solid #3A4260`, boxShadow: SH_D }} />
      {/* 2 the title bar */}
      <div style={{ position: "absolute", left: 10, top: 10, right: 10, height: h * 0.12,
        borderRadius: 5, background: hexa("#39425E", on(1)), transformOrigin: "0% 50%",
        transform: `scaleX(${on(1)})`, overflow: "hidden" }}>
        {[0, 1, 2].map((k) => (
          <div key={"tl" + k} style={{ position: "absolute", left: 10 + k * 20, top: "36%",
            width: 12, height: 12, borderRadius: "50%",
            background: [RED, GOLD, GREEN][k], opacity: on(1) }} />
        ))}
        <div style={{ position: "absolute", right: 12, top: "30%", width: w * 0.22,
          height: "40%", borderRadius: 4, background: hexa(CLAY, 0.9 * on(1)) }} />
      </div>
      {/* 3 the sidebar */}
      <div style={{ position: "absolute", left: 10, top: h * 0.16, width: w * 0.24,
        bottom: 10, borderRadius: 5, background: hexa("#2C3450", on(2)),
        transformOrigin: "0% 50%", transform: `scaleX(${on(2)})` }} />
      {/* 4,5 two sidebar rows */}
      {[0, 1].map((k) => (
        <div key={"sr" + k} style={{ position: "absolute", left: 18, top: h * (0.22 + k * 0.10),
          width: w * 0.17, height: h * 0.05, borderRadius: 3,
          background: hexa(k ? "#8894B4" : CLAY, on(3 + k)), transform: `scaleX(${on(3 + k)})`,
          transformOrigin: "0% 50%" }} />
      ))}
      {/* 6 the chart — it DRAWS ITSELF, bar by bar */}
      <div style={{ position: "absolute", left: w * 0.30, top: h * 0.20, right: 16, height: h * 0.46,
        borderRadius: 5, background: hexa("#1B2136", on(5)), overflow: "hidden",
        border: `2px solid ${hexa("#39425E", on(5))}` }}>
        {/* the grid the bars are read against — a chart, not six rectangles */}
        {[0.25, 0.5, 0.75].map((g, k) => (
          <div key={"gl" + k} style={{ position: "absolute", left: 0, right: 0, top: `${g * 100}%`,
            height: 2, background: hexa("#39425E", 0.9 * on(5)) }} />
        ))}
        {[0.28, 0.55, 0.40, 0.78, 0.62, 0.92].map((v, k) => (
          <div key={"bar" + k} style={{ position: "absolute", bottom: 8,
            left: 12 + k * ((w * 0.60) / 6), width: (w * 0.60) / 6 - 10,
            height: `${v * on(5) * 82}%`, borderRadius: 3,
            background: `linear-gradient(180deg, ${INGH} 0%, ${CLAY} 100%)` }} />
        ))}
      </div>
      {/* 7,8 two content rows */}
      {[0, 1].map((k) => (
        <div key={"cr" + k} style={{ position: "absolute", left: w * 0.30, top: h * (0.68 + k * 0.09),
          width: (w * 0.60) * on(6 + k), height: h * 0.055, borderRadius: 3,
          background: hexa(k ? "#5A6486" : "#8894B4", 0.92) }} />
      ))}
      {/* 9 the button LIGHTS — the last pop, at the very end of the scene */}
      <div style={{ position: "absolute", right: 16, bottom: 14, width: w * 0.24,
        height: h * 0.10, borderRadius: 5, transform: `scale(${on(8)})`,
        background: hexa(GREEN, 0.95), border: `3px solid ${hexa(dkh(GREEN, 0.34), 1)}` }} />
    </div>
  );
};

/* =========================================================================
   S12 · THE LOOMS AND THE OVERFLOWING RACK.

   ⛔⛔ EDGE 3: NO `10x` PLATE, NO MULTIPLIER GAUGE. This draws OUTPUT VOLUME —
   countable finished units filling a rack and spilling out of it. The figure
   stays in the audio and the caption, exactly where reel 116 left `20x`.
   ====================================================================== */
export const Loom: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; run?: number }> = ({ x, y, f, at, s = 1, z = 40, run = 1 }) => {
  const w = 158 * s, h = 210 * s;
  const lf = f - at;
  const beat = lf > 0 ? Math.sin(lf / 4.2) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      {/* the frame: two uprights and a crown */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 20 * s, height: h,
        background: dkh(BRASS, 0.48), borderRadius: 4 * s }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 20 * s, height: h,
        background: dkh(BRASS, 0.48), borderRadius: 4 * s }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 22 * s,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.22)} 0%, ${dkh(BRASS, 0.40)} 100%)`,
        borderRadius: 5 * s }} />
      {/* the warp — vertical threads, which is what makes it read as a LOOM */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"wp" + i} style={{ position: "absolute", left: 24 * s + i * ((w - 52 * s) / 8),
          top: 22 * s, width: 4 * s, height: h - 62 * s, background: hexa(CREAMB, 0.44) }} />
      ))}
      {/* the beater, sweeping — the background process for the whole scene */}
      <div style={{ position: "absolute", left: 18 * s, top: h * 0.32 + beat * h * 0.16 * run,
        width: w - 36 * s, height: 14 * s, borderRadius: 4 * s,
        background: `linear-gradient(180deg, ${INGH} 0%, ${dkh(BRASS, 0.30)} 100%)` }} />
      {/* the cloth beam, filling */}
      <div style={{ position: "absolute", left: 20 * s, bottom: 14 * s, width: w - 40 * s,
        height: 34 * s, borderRadius: 5 * s, background: dkh(BRASS, 0.56) }} />
    </div>
  );
};

/** a finished unit — countable, 62px, well over the downsample floor */
export const Unit: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  c?: string }> = ({ x, y, s = 1, z = 58, rot = 0, c = CREAMB }) => {
  const d = 88 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d * 0.76,
      zIndex: z, transform: `rotate(${rot}deg)`, borderRadius: 5 * s,
      background: `linear-gradient(172deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.14)} 62%, ${dkh(c, 0.30)} 100%)`,
      border: `${2.5 * s}px solid ${dkh(c, 0.32)}` }}>
      <div style={{ position: "absolute", left: 7 * s, top: 8 * s, right: 7 * s, height: 5 * s,
        borderRadius: 3 * s, background: hexa(CLAY, 0.62) }} />
      <div style={{ position: "absolute", left: 7 * s, top: 19 * s, width: "48%", height: 5 * s,
        borderRadius: 3 * s, background: hexa("#9A948B", 0.62) }} />
      <div style={{ position: "absolute", left: 7 * s, bottom: 7 * s, width: 18 * s, height: 9 * s,
        borderRadius: 3 * s, background: hexa(GREEN, 0.80) }} />
    </div>
  );
};

/* =========================================================================
   S13/S14 · THE SOCKET WALL.

   Category features drawn: a recessed BORE, two keyed slots, a collar, a live
   lamp. A socket is not a square with a hole in it.
   ====================================================================== */
export const SocketWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; n?: number; /** how many are filled */ filled?: number; at?: number }> =
  ({ x, y, w, h, f, z = 28, n = 8, filled = 0, at = 0 }) => {
  const cw = w / n;
  return (
    <div style={{ position: "absolute", left: x, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8,
        background: `linear-gradient(178deg, ${dkh(VIOLET, 0.30)} 0%, ${dkh(VIOLET, 0.58)} 100%)`,
        border: `6px solid ${dkh(VIOLET, 0.64)}` }} />
      {Array.from({ length: n }, (_, i) => {
        const on = i < filled;
        const cx = cw * (i + 0.5), cy = h * 0.44;
        const d = Math.min(cw * 0.72, h * 0.46);
        return (
          <div key={"sk" + i} style={{ position: "absolute", left: cx - d / 2, top: cy - d / 2,
            width: d, height: d }}>
            {/* the collar */}
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
              background: `radial-gradient(60% 60% at 40% 32%, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.42)} 100%)`,
              border: `${Math.max(3, d * 0.055)}px solid ${dkh(IRON, 0.62)}` }} />
            {/* the recessed bore */}
            <div style={{ position: "absolute", inset: d * 0.20, borderRadius: "50%",
              background: on ? hexa(CYAN, 0.60) : hexa("#07090E", 0.86) }} />
            {/* two keyed slots */}
            {[0, 1].map((k) => (
              <div key={"ky" + k} style={{ position: "absolute", left: d * (k ? 0.58 : 0.30),
                top: d * 0.36, width: d * 0.12, height: d * 0.28, borderRadius: d * 0.05,
                background: on ? hexa(INGH, 0.86) : hexa("#000000", 0.62) }} />
            ))}
            {/* the live lamp, above */}
            <div style={{ position: "absolute", left: d * 0.44, top: -d * 0.20, width: d * 0.14,
              height: d * 0.14, borderRadius: "50%",
              background: on ? INGH : hexa("#000000", 0.44) }} />
          </div>
        );
      })}
    </div>
  );
};

/** a plugin cartridge / MCP connector that flies in and SLAMS home */
export const Cartridge: React.FC<{ x: number; y: number; f: number; at: number; from?: number;
  s?: number; z?: number; c?: string; label?: string }> =
  ({ x, y, f, at, from = -420, s = 1, z = 64, c = CLAY, label }) => {
  const lf = f - at;
  if (lf < -1) return null;
  const t = E(lf, 0, 7, 0, 1, IN_Q);            /* fast in, hard land */
  const px = x + from * (1 - t);
  const sq = squash(lf, 7, 0.22, 3, 10);
  const w = 118 * s, h = 74 * s;
  return (
    <div style={{ position: "absolute", left: px - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `scale(${sq}, ${2 - sq})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 8 * s,
        background: `linear-gradient(172deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.22)} 60%, ${dkh(c, 0.46)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.52)}` }} />
      {/* the contact fingers — what makes it a cartridge and not a brick */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"cf" + i} style={{ position: "absolute", right: -9 * s,
          top: 12 * s + i * ((h - 24 * s) / 5), width: 14 * s, height: 8 * s, borderRadius: 2 * s,
          background: INGD }} />
      ))}
      {/* the grip ridges */}
      {[0, 1, 2].map((i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: 12 * s + i * 11 * s, top: 10 * s,
          width: 5 * s, height: h - 20 * s, borderRadius: 3 * s, background: hexa("#000000", 0.22) }} />
      ))}
      {label && <div style={{ position: "absolute", left: 42 * s, top: "50%", marginTop: -11 * s,
        whiteSpace: "nowrap" }}>
        <span style={{ ...mono(15 * s, 900), color: "#F6EEDC", letterSpacing: "0.06em" }}>{label}</span>
      </div>}
    </div>
  );
};

/* =========================================================================
   S15 · THE GUIDE PRESS AND THE COMMENT SLOT.

   ⭐ THE HERO ARTIFACT BECOMES THE DELIVERABLE. The ingot the drum poured at
   1.2s is pressed into the guide the CTA hands over — which is the only way a
   CTA is a payoff rather than an ask.
   ====================================================================== */
export const Guide: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  open?: number; rot?: number }> = ({ x, y, f, s = 1, z = 66, open = 0, rot = 0 }) => {
  const w = 210 * s, h = 268 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {/* the board, with a real spine and a bevel */}
      <div style={{ position: "absolute", inset: 0, borderRadius: `${4 * s}px ${9 * s}px ${9 * s}px ${4 * s}px`,
        background: `linear-gradient(172deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.14)} 100%)`,
        border: `${4 * s}px solid ${dkh(CREAMB, 0.28)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 20 * s, height: h,
        borderRadius: `${4 * s}px 0 0 ${4 * s}px`, background: dkh(CLAY, 0.24) }} />
      {/* the cast title plate — the ingot, flattened into the cover */}
      <div style={{ position: "absolute", left: 34 * s, top: 40 * s, right: 18 * s, height: 62 * s,
        borderRadius: 5 * s, background: `linear-gradient(178deg, ${INGH} 0%, ${ING} 40%, ${INGD} 100%)`,
        border: `${2.5 * s}px solid ${dkh(INGD, 0.30)}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(29 * s, 900), color: "#6B4E1C", letterSpacing: "0.04em" }}>{R.ctaBig}</span>
      </div>
      {/* fifteen rule lines — the tips, countable */}
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"gl" + i} style={{ position: "absolute", left: 34 * s, top: 120 * s + i * 9.4 * s,
          width: (0.42 + rnd(i, 5) * 0.48) * (w - 56 * s), height: 4 * s, borderRadius: 2 * s,
          background: hexa(i < R.tipsShown ? CLAY : "#9A948B", 0.72) }} />
      ))}
      {/* the Claude mark on the cover, so the artifact says who it is for */}
      <div style={{ position: "absolute", left: 34 * s, bottom: 14 * s, width: 34 * s,
        height: 34 * s, borderRadius: 8 * s, background: "#FFFFFF",
        border: `${2 * s}px solid #E8DCC0`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <Img src={staticFile("logos/claude.svg")} style={{ width: 24 * s, height: 24 * s }} />
      </div>
    </div>
  );
};

/** the comment slot — the CTA's literal mechanism: KNOW goes in, the guide
    comes out. A real slot: a bezel, a lit throat, a return lip and a keycap */
export const CommentSlot: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; /** 0..1 the word travelling in */ push?: number; ret?: number }> =
  ({ x, y, f, at, s = 1, z = 52, push = 0, ret = 0 }) => {
  const w = 320 * s, h = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(178deg, ${mxh(IRON, 0.20)} 0%, ${dkh(IRON, 0.46)} 100%)`,
        border: `${5 * s}px solid ${dkh(IRON, 0.62)}` }} />
      {/* the throat */}
      <div style={{ position: "absolute", left: 22 * s, top: 26 * s, right: 22 * s, height: 46 * s,
        borderRadius: 6 * s, background: hexa("#07090E", 0.9), overflow: "hidden",
        border: `${3 * s}px solid ${dkh(IRON, 0.66)}` }}>
        {/* the keyword, travelling in */}
        <div style={{ position: "absolute", left: `${8 + push * 40}%`, top: "50%",
          transform: "translateY(-50%)", padding: `${5 * s}px ${13 * s}px`, borderRadius: 5 * s,
          background: CREAMB, opacity: 1 - Math.max(0, push - 0.72) * 3.6 }}>
          <span style={{ ...mono(23 * s, 900), color: "#241F17", letterSpacing: "0.10em" }}>{R.keyword}</span>
        </div>
      </div>
      {/* the return lip, where the guide comes back out */}
      <div style={{ position: "absolute", left: 30 * s, bottom: 16 * s, right: 30 * s,
        height: 30 * s, borderRadius: 5 * s, background: dkh(IRON, 0.60),
        borderTop: `${4 * s}px solid ${hexa(INGH, 0.30 + ret * 0.5)}` }} />
    </div>
  );
};
