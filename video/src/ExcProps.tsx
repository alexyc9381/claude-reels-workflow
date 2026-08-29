import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  mono, ui, squash, rock, Contact,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER, JADE, BAKE,
  PatchCard, Cord, R,
} from "./ExcWorld";

/* ===========================================================================
   REEL 125 · "AUTO" — THE PROPS.  Board: storyboards/125-auto.md.

   ⛔⛔ PROPS NEED REAL DRAWING, NOT PRIMITIVES. A book that was four divs got
   rejected; the house bar is 12-16 drawn parts on anything the camera stops on.
   Every component here is counted in its own comment.
   ⛔ EVERY OBJECT THAT HOLDS, CARRIES OR RECEIVES SOMETHING MUST DIFFER FROM ITS
   BACKGROUND IN BOTH HUE AND VALUE, and must read while it is still EMPTY —
   empty is the promise (reel 108's "an empty bay is a bright cream plate, not a
   black hole").
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS. Anything that travels is sized
   past it, because a 52px object is 12px after the audit's 1012->240 downsample.
   ========================================================================= */

/* -------------------------------------------------------------------------
   THE ENVELOPE — 7 parts: body, flap, flap shadow, address bar, stamp block,
   two rule lines. It travels, so its short side is 48px minimum.
   ---------------------------------------------------------------------- */
export const Envelope: React.FC<{ x: number; y: number; w?: number; z?: number;
  rot?: number; o?: number; c?: string }> =
  ({ x, y, w: ww = 84, z = 50, rot = 0, o = 1, c = PAPER }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: ww * 0.66,
    zIndex: z, opacity: o, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.03, background: c,
      border: `${Math.max(1.5, ww * 0.022)}px solid ${dkh(c, 0.28)}`, boxShadow: SH }} />
    {/* the flap — a real V, drawn as two skewed halves so it has a crease */}
    <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "58%",
      background: dkh(c, 0.10), clipPath: "polygon(0 0, 100% 0, 100% 100%)" }} />
    <div style={{ position: "absolute", left: "50%", top: 0, width: "50%", height: "58%",
      background: dkh(c, 0.18), clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
    <div style={{ position: "absolute", left: "6%", top: "56%", width: "44%",
      height: ww * 0.035, background: dkh(c, 0.44) }} />
    <div style={{ position: "absolute", left: "6%", top: "72%", width: "30%",
      height: ww * 0.030, background: dkh(c, 0.34) }} />
    <div style={{ position: "absolute", right: "7%", top: "62%", width: ww * 0.17,
      height: ww * 0.14, background: dkh(RED, 0.12), borderRadius: 2 }} />
  </div>
);

/* -------------------------------------------------------------------------
   THE PIGEONHOLE BANK — where the mail SORTS ITSELF.
   ⛔ §3: the VO's verb is SORT, so the picture is not "three labelled trays"
   (a container carrying one bit). It is holes that FILL, visibly, at different
   rates, with nobody at the desk.
   14 drawn parts per hole: the carcass, the two dividers, the shelf lip, the
   back shadow, the label card, the label rule, the fill stack (up to 6 sheets),
   and the brass number.
   ---------------------------------------------------------------------- */
export const Pigeonholes: React.FC<{ x: number; y: number; w?: number; z?: number;
  cols?: number; rows?: number;
  /** 0..1 per hole — how full it is. Length must be cols*rows. */
  fill: number[]; labels?: readonly string[]; c?: string }> =
  ({ x, y, w: ww = 520, z = 40, cols = 4, rows = 2, fill, labels, c = CREAMB }) => {
  const cw = ww / cols, ch = cw * 0.62;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: ch * rows,
      zIndex: z }}>
      {/* the carcass — one object, so the bank reads as a unit of furniture */}
      <div style={{ position: "absolute", left: -10, top: -10, width: ww + 20,
        height: ch * rows + 20, background: dkh(OXIDE, 0.40),
        border: `5px solid ${dkh(OXIDE, 0.60)}`, borderRadius: 4, boxShadow: SH_D }} />
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols), cI = i % cols;
        const k = Math.max(0, Math.min(1, fill[i] ?? 0));
        return (
          <div key={"ph" + i} style={{ position: "absolute", left: cI * cw, top: r * ch,
            width: cw - 6, height: ch - 6 }}>
            {/* the hole itself — a bright cream back, so an EMPTY hole still
                reads as a place a thing goes */}
            {/* ⛔ AN EMPTY HOLE MUST READ WHILE IT IS STILL EMPTY — empty is the
                promise (reel 108: "an empty bay is a bright cream plate, not a
                black hole"). The whole-reel darkening pass took these with it
                and the bank went brown-on-brown, so the sorting had nothing to
                happen against. The BACKS are lifted; the carcass stays dark, so
                the hole still reads as a hole. */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 2,
              background: `linear-gradient(184deg, ${dkh(c, 0.16)} 0%, ${mxh(c, 0.26)} 100%)`,
              border: `3px solid ${dkh(OXIDE, 0.62)}` }} />
            {/* the back shadow, which is what gives the hole DEPTH */}
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "30%",
              background: hexa("#000", 0.30) }} />
            {/* ⭐ THE FILL — real sheets stacking, countable, not a bar */}
            {Array.from({ length: Math.round(k * 6) }, (_, s) => (
              <div key={"sh" + s} style={{ position: "absolute", left: cw * 0.08,
                bottom: 8 + s * (ch * 0.095), width: cw * 0.78, height: ch * 0.085,
                background: s % 2 ? PAPER : mxh(PAPER, 0.0),
                border: `1.5px solid ${dkh(PAPER, 0.30)}`, borderRadius: 1,
                transform: `rotate(${(rnd(i * 7 + s, 19) - 0.5) * 2.6}deg)` }} />
            ))}
            {/* the shelf lip in front of the stack */}
            <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%",
              height: ch * 0.10, background: dkh(OXIDE, 0.30) }} />
            {/* the label card in its brass holder */}
            {labels && labels[i] && (
              <div style={{ position: "absolute", left: cw * 0.10, top: -ch * 0.02,
                width: cw * 0.70, height: ch * 0.20, background: mxh(BRASS, 0.62),
                border: `2px solid ${dkh(BRASS, 0.44)}`, borderRadius: 2,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...ui(Math.max(11, cw * 0.11), 900), color: dkh(OXIDE, 0.50),
                  letterSpacing: "0.06em" }}>{labels[i]}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE SORTER ARM — the thing DOING the sorting, so the scene has a mechanism
   and not just an outcome. §10: a beam needs a finding, an arrival needs an
   output, a hand-off needs a source.
   ---------------------------------------------------------------------- */
export const SorterArm: React.FC<{ x: number; y: number; len?: number; z?: number;
  /** -1..1 — which hole it is pointing at */ aim: number; flick?: number }> =
  ({ x, y, len = 190, z = 58, aim, flick = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: len, height: 26, zIndex: z,
    transform: `rotate(${aim * 34 + flick * 12}deg)`, transformOrigin: "8px 50%" }}>
    <div style={{ position: "absolute", left: 0, top: 6, width: len, height: 14,
      borderRadius: 7, background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.40)} 100%)`,
      border: `2px solid ${dkh(STEEL, 0.58)}` }} />
    {/* the pivot */}
    <div style={{ position: "absolute", left: -4, top: -1, width: 30, height: 30,
      borderRadius: "50%", background: dkh(BRASS, 0.26),
      border: `4px solid ${dkh(BRASS, 0.54)}` }} />
    {/* the gripper at the far end — two jaws that close on the flick */}
    {[-1, 1].map(s => (
      <div key={"jw" + s} style={{ position: "absolute", left: len - 26,
        top: 13 + s * (10 - flick * 6) - 4, width: 28, height: 8, borderRadius: 3,
        background: dkh(STEEL, 0.22), transform: `rotate(${s * (10 - flick * 9)}deg)` }} />
    ))}
  </div>
);

/* -------------------------------------------------------------------------
   THE LEAD TICKET — what travels the night line. 9 parts.
   ---------------------------------------------------------------------- */
export const LeadTicket: React.FC<{ x: number; y: number; w?: number; z?: number;
  /** 0..1 — the reply stamp landing on it */ stamped?: number; rot?: number }> =
  ({ x, y, w: ww = 96, z = 52, stamped = 0, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: ww * 0.72,
    zIndex: z, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", inset: 0, background: PAPER, borderRadius: 3,
      border: `2.5px solid ${dkh(PAPER, 0.30)}`, boxShadow: SH }} />
    {/* the punched edge — a ticket has holes */}
    {[0.16, 0.44, 0.72].map((t, i) => (
      <div key={"pn" + i} style={{ position: "absolute", left: ww * 0.045, top: ww * t * 0.72,
        width: ww * 0.075, height: ww * 0.075, borderRadius: "50%", background: dkh(PAPER, 0.44) }} />
    ))}
    <div style={{ position: "absolute", left: ww * 0.20, top: ww * 0.12, width: ww * 0.62,
      height: ww * 0.055, background: dkh(PAPER, 0.52) }} />
    <div style={{ position: "absolute", left: ww * 0.20, top: ww * 0.26, width: ww * 0.44,
      height: ww * 0.045, background: dkh(PAPER, 0.34) }} />
    {/* ⭐ THE REPLY STAMP — it ARRIVES, over-scale, and settles. A stamp that
        fades in is a state change; a stamp that lands is an event. */}
    {stamped > 0.02 && (
      <div style={{ position: "absolute", left: ww * 0.30, top: ww * 0.32,
        width: ww * 0.52, height: ww * 0.28, borderRadius: 3,
        border: `${Math.max(2, ww * 0.035)}px solid ${dkh(GREEN, 0.06)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `rotate(-12deg) scale(${1 + (1 - stamped) * 1.5})`,
        opacity: Math.min(1, stamped * 2) }}>
        <span style={{ ...ui(ww * 0.17, 900), color: dkh(GREEN, 0.06),
          letterSpacing: "0.04em" }}>SENT</span>
      </div>
    )}
  </div>
);

/* -------------------------------------------------------------------------
   THE OUTLET MOUTH — where a post goes out. 12 parts: the surround, the throat,
   the throat shadow, the lit ring, the mark tile, the name strip, four louvre
   blades, the counter window and the counter digits.
   ⛔ THE MARKS ARE REAL AND THEY ARE IN THE REPO. `R.outlets` is the source.
   ---------------------------------------------------------------------- */
export const Outlet: React.FC<{ x: number; y: number; w?: number; z?: number;
  mark: string; name: string; count: number;
  /** 0..1 — a card being swallowed right now */ hot?: number }> =
  ({ x, y, w: ww = 176, z = 54, mark, name, count, hot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: ww * 1.15,
    zIndex: z }}>
    {/* the surround */}
    <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.05,
      background: `linear-gradient(168deg, ${mxh(OXIDE, 0.22)} 0%, ${dkh(OXIDE, 0.34)} 100%)`,
      border: `${ww * 0.028}px solid ${dkh(OXIDE, 0.56)}`, boxShadow: SH_D }} />
    {/* the throat — near-black, so it reads as a HOLE: the surface stops at it */}
    <div style={{ position: "absolute", left: ww * 0.10, top: ww * 0.40, width: ww * 0.80,
      height: ww * 0.30, borderRadius: ww * 0.02, background: BAKE,
      border: `${ww * 0.016}px solid ${dkh(OXIDE, 0.66)}` }} />
    <div style={{ position: "absolute", left: ww * 0.10, top: ww * 0.40, width: ww * 0.80,
      height: ww * 0.09, background: hexa("#000", 0.55) }} />
    {/* the lit ring — fires only while something is going in */}
    {hot > 0.02 && (
      <div style={{ position: "absolute", left: ww * 0.06, top: ww * 0.36, width: ww * 0.88,
        height: ww * 0.38, borderRadius: ww * 0.03,
        border: `${ww * 0.026}px solid ${mxh(SODIUM, 0.30)}`, opacity: hot }} />
    )}
    {/* the louvres under the throat */}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"lv" + i} style={{ position: "absolute", left: ww * 0.14,
        top: ww * (0.76 + i * 0.055), width: ww * 0.72, height: ww * 0.028,
        background: dkh(OXIDE, 0.62), borderRadius: 2 }} />
    ))}
    {/* the mark tile + name strip */}
    <div style={{ position: "absolute", left: ww * 0.09, top: ww * 0.075, width: ww * 0.22,
      height: ww * 0.22, borderRadius: ww * 0.04, background: "#FFFFFF",
      border: `${ww * 0.012}px solid ${dkh(OXIDE, 0.42)}`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(`logos/${mark}.svg`)}
        style={{ width: "70%", height: "70%", objectFit: "contain" }} />
    </div>
    <div style={{ position: "absolute", left: ww * 0.36, top: ww * 0.115,
      ...ui(ww * 0.105, 900), color: mxh(BRASS, 0.52), letterSpacing: "0.05em" }}>{name}</div>
    {/* the counter — a real window with digits behind it */}
    <div style={{ position: "absolute", left: ww * 0.36, top: ww * 0.245, width: ww * 0.30,
      height: ww * 0.135, borderRadius: 2, background: BAKE,
      border: `${ww * 0.012}px solid ${dkh(BRASS, 0.48)}`,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ ...mono(ww * 0.085, 700), color: mxh(SODIUM, 0.22),
        letterSpacing: "0.10em" }}>{String(count).padStart(2, "0")}</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------
   THE SLOT RACK — where a card goes IN. It has to read while EMPTY, because
   empty is the promise, so the bay is a lit cream throat with brass guides,
   never a black hole.
   ---------------------------------------------------------------------- */
export const SlotRack: React.FC<{ x: number; y: number; w?: number; z?: number;
  /** 0..1 — the IMPORT latch throwing */ latch?: number; live?: number; f?: number;
  /** ⛔ off when the scene draws its own IMPORT control. S8 gained a real green
      button for the cursor to click, and the rack's own plate made TWO of the
      same word in one frame — the budget is ONE text chip per shot. */
  label?: boolean }> =
  ({ x, y, w: ww = 380, z = 40, latch = 0, live = 0, f = 0, label = true }) => {
  const hh = ww * 0.78;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the frame */}
      <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.02,
        background: `linear-gradient(170deg, ${dkh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.52)} 100%)`,
        border: `${ww * 0.020}px solid ${dkh(STEEL, 0.62)}`, boxShadow: SH_D }} />
      {/* ⭐ THE BAY — a LIT cream throat. An empty bay is a bright plate, not a
          black hole (reel 108), or the arrival has nothing to arrive into. */}
      <div style={{ position: "absolute", left: ww * 0.075, top: hh * 0.22, width: ww * 0.85,
        height: hh * 0.50, borderRadius: ww * 0.012,
        background: `linear-gradient(178deg, ${dkh(CREAMB, 0.44)} 0%, ${dkh(CREAMB, 0.18)} 100%)`,
        border: `${ww * 0.012}px solid ${dkh(STEEL, 0.66)}` }} />
      {/* the two brass guide rails inside it */}
      {[0.255, 0.655].map((t, i) => (
        <div key={"gd" + i} style={{ position: "absolute", left: ww * 0.075, top: hh * t,
          width: ww * 0.85, height: hh * 0.035, background: dkh(BRASS, 0.30) }} />
      ))}
      {/* the IMPORT latch — a real lever with travel, and a plate that says the
          literal action n8n performs */}
      {label && (
        <div style={{ position: "absolute", left: ww * 0.10, top: hh * 0.795, width: ww * 0.34,
          height: hh * 0.115, borderRadius: 3, background: mxh(BRASS, 0.44),
          border: `${ww * 0.010}px solid ${dkh(BRASS, 0.50)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...ui(hh * 0.072, 900), color: dkh(OXIDE, 0.44),
            letterSpacing: "0.14em" }}>IMPORT</span>
        </div>
      )}
      <div style={{ position: "absolute", left: ww * 0.52, top: hh * 0.775, width: ww * 0.075,
        height: hh * 0.20, borderRadius: 4, background: dkh(RED, 0.14),
        border: `${ww * 0.010}px solid ${dkh(RED, 0.42)}`,
        transform: `rotate(${-26 + latch * 52}deg)`, transformOrigin: "50% 92%" }} />
      {/* the live lamp — the only place JADE appears outside S9 */}
      <div style={{ position: "absolute", left: ww * 0.68, top: hh * 0.815, width: ww * 0.10,
        height: ww * 0.10, borderRadius: "50%",
        background: live > 0.5 ? mxh(JADE, 0.34) : dkh(STEEL, 0.50),
        border: `${ww * 0.012}px solid ${dkh(STEEL, 0.66)}` }} />
      {/* the vent slots along the top — furniture that makes it a machine */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"vt" + i} style={{ position: "absolute", left: ww * (0.10 + i * 0.115),
          top: hh * 0.075, width: ww * 0.075, height: hh * 0.055, borderRadius: 2,
          background: dkh(STEEL, 0.60) }} />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE HALL BENCH — the villain, repeated. One per operator at S10.
   Deliberately SMALLER and simpler than `Bench`: this is a rank of them, and
   what has to read at that size is the SILHOUETTE (a lit top, a cord tangle
   under it, one lamp) not the detail.
   ---------------------------------------------------------------------- */
export const HallBench: React.FC<{ x: number; y: number; w?: number; z?: number;
  f?: number; seed?: number; lamp?: number }> =
  ({ x, y, w: ww = 190, z = 40, f = 0, seed = 0, lamp = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, zIndex: z }}>
    {/* the lit top */}
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: ww * 0.10,
      background: `linear-gradient(178deg, ${mxh(OXIDE, 0.16 + lamp * 0.26)} 0%, ${dkh(OXIDE, 0.30)} 100%)`,
      border: `2.5px solid ${dkh(OXIDE, 0.58)}`, borderRadius: 2 }} />
    {/* legs */}
    {[0.08, 0.84].map((t, i) => (
      <div key={"hl" + i} style={{ position: "absolute", left: ww * t, top: ww * 0.10,
        width: ww * 0.075, height: ww * 0.26, background: dkh(OXIDE, 0.60) }} />
    ))}
    {/* the one unfinished card, one lamp lit */}
    <PatchCard x={ww * 0.24} y={-ww * 0.30} w={ww * 0.50} z={z + 3} lit={1}
      face={dkh(CREAMB, 0.22)} rot={-4} />
    {/* the tangle — every cord at least two stops off the bench top */}
    {Array.from({ length: 5 }, (_, i) => {
      const c = [dkh(RED, 0.18), dkh(TEAL, 0.24), dkh(SODIUM, 0.26), dkh(SKY, 0.24)][i % 4];
      return (
        <div key={"ht" + i} style={{ position: "absolute", left: ww * (0.10 + rnd(seed * 5 + i, 51) * 0.78),
          top: ww * 0.08, width: 6, height: ww * (0.14 + rnd(seed * 5 + i, 52) * 0.22),
          background: c, borderRadius: 3,
          transform: `rotate(${(rnd(seed * 5 + i, 53) - 0.5) * 30 + Math.sin(f / 24 + i) * 4}deg)`,
          transformOrigin: "50% 0%" }} />
      );
    })}
    {/* the lamp over it — a shaped cone, never a full-frame fill */}
    <div style={{ position: "absolute", left: ww * 0.16, top: -ww * 0.86, width: ww * 0.68,
      height: ww * 0.86, opacity: 0.36 * lamp, zIndex: -1,
      clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(180deg, ${hexa(SODIUM, 0.72)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />
    <div style={{ position: "absolute", left: ww * 0.40, top: -ww * 0.92, width: ww * 0.20,
      height: ww * 0.10, borderRadius: `${ww * 0.10}px ${ww * 0.10}px 0 0`,
      background: dkh(STEEL, 0.44) }} />
  </div>
);

/* -------------------------------------------------------------------------
   THE COUNT PLATE — the reel's receipts, in the reserved band.
   ⛔ ONE TEXT CHIP PER SHOT, and it lives at panel y 112..210. `HookHeader`
   owns 0..96; the cast owns the ground line; nothing else enters this band.
   ---------------------------------------------------------------------- */
export const CountPlate: React.FC<{ x: number; y: number; big: string; sub?: string;
  z?: number; s?: number; c?: string; pop?: number }> =
  ({ x, y, big, sub, z = 78, s = 1, c = CREAMB, pop = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${pop})`, transformOrigin: "0% 50%",
    padding: `${11 * s}px ${20 * s}px`, borderRadius: 8 * s,
    background: `linear-gradient(168deg, ${mxh(c, 0.24)} 0%, ${c} 100%)`,
    border: `${3 * s}px solid ${dkh(c, 0.34)}`, boxShadow: SH,
    display: "flex", alignItems: "baseline", gap: 12 * s, whiteSpace: "nowrap" }}>
    <span style={{ ...ui(40 * s, 900), color: dkh(c, 0.80), letterSpacing: "-0.01em" }}>{big}</span>
    {sub && <span style={{ ...mono(20 * s, 700), color: dkh(c, 0.58),
      letterSpacing: "0.10em" }}>{sub}</span>}
  </div>
);

/* -------------------------------------------------------------------------
   THE KEYWORD TAG — the CTA, as a struck brass jack tag hanging on the board.
   ⛔ It is an OBJECT in the world, not a caption laid over it: it hangs off a
   real chain, it takes a hit, and it rings out on a damped swing.
   ---------------------------------------------------------------------- */
export const KeyTag: React.FC<{ x: number; y: number; t: string; f: number; at: number;
  w?: number; z?: number }> =
  ({ x, y, t, f, at, w: ww = 340, z = 80 }) => {
  const lf = f - at;
  const drop = E(lf, 0, 9, -260, 0, BACK);
  /* the ring-out: a damped swing that never quite settles */
  const sw = lf > 6 ? Math.sin((lf - 6) / 3.4) * 7.5 * Math.exp(-(lf - 6) / 22) : 0;
  const sq = squash(lf, 8, 0.16, 3, 12);
  return (
    <div style={{ position: "absolute", left: x, top: y + drop, width: ww, zIndex: z,
      transform: `rotate(${sw}deg)`, transformOrigin: "50% -34px" }}>
      {/* the chain it hangs from */}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: ww / 2 - 6, top: -34 + i * 9,
          width: 12, height: 11, borderRadius: 5, border: `3px solid ${dkh(BRASS, 0.44)}` }} />
      ))}
      <div style={{ width: ww, padding: "16px 0", borderRadius: 10,
        background: `linear-gradient(166deg, ${mxh(BRASS, 0.46)} 0%, ${BRASS} 44%, ${dkh(BRASS, 0.30)} 100%)`,
        border: `5px solid ${dkh(BRASS, 0.52)}`, boxShadow: SH_D, textAlign: "center",
        transform: `scaleY(${sq})` }}>
        <div style={{ ...ui(30, 900), color: dkh(OXIDE, 0.40), letterSpacing: "0.20em" }}>COMMENT</div>
        <div style={{ ...ui(78, 900), color: dkh(OXIDE, 0.62), letterSpacing: "0.06em",
          lineHeight: 1.02 }}>{t}</div>
      </div>
      {/* the two mounting holes — a tag is a thing that was drilled */}
      {[0.06, 0.94].map((k, i) => (
        <div key={"mh" + i} style={{ position: "absolute", left: ww * k - 8, top: 22,
          width: 16, height: 16, borderRadius: "50%", background: dkh(BRASS, 0.60) }} />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE OPERATOR STOOL — small, and it carries the whole point of S2: the work
   is happening and NOBODY IS AT IT. An empty chair is only legible if it reads
   as a chair, so it gets a seat, a ring, four splayed legs and a footrail.
   ---------------------------------------------------------------------- */
export const Stool: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number }> =
  ({ x, y, s = 1, z = 46, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 120 * s, height: 150 * s,
    zIndex: z, transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 120 * s, height: 22 * s,
      borderRadius: 60 * s / 2, background: `linear-gradient(178deg, ${mxh(OXIDE, 0.24)} 0%, ${dkh(OXIDE, 0.34)} 100%)`,
      border: `${3 * s}px solid ${dkh(OXIDE, 0.56)}` }} />
    <div style={{ position: "absolute", left: 12 * s, top: 20 * s, width: 96 * s, height: 10 * s,
      background: dkh(OXIDE, 0.52), borderRadius: 4 }} />
    {[[18, -12], [42, -4], [66, 4], [90, 12]].map(([lx, sk], i) => (
      <div key={"sl" + i} style={{ position: "absolute", left: lx * s, top: 28 * s,
        width: 9 * s, height: 118 * s, background: dkh(OXIDE, 0.58),
        transform: `skewX(${sk}deg)` }} />
    ))}
    <div style={{ position: "absolute", left: 12 * s, top: 92 * s, width: 96 * s, height: 8 * s,
      background: dkh(BRASS, 0.40), borderRadius: 4 }} />
  </div>
);

/* ===========================================================================
   ⭐⭐⭐ THE n8n WORKFLOW — the actual thing, drawn as the actual thing.

   Alex, round 1: *"really focus on showing a graphic of an actual n8n
   workflow."* So this is not a metaphor for a workflow, it is the n8n editor's
   own vocabulary, and every part of it is a real feature of that UI:

     · a light canvas with a DOT GRID
     · a TRIGGER node with the rounded-left/square-right silhouette n8n gives it,
       carrying the lightning bolt
     · action nodes as rounded squares with the REAL app icon in the middle
     · a coloured accent bar on each node
     · BEZIER connectors between output and input ports, with the little round
       port dots n8n draws on both sides
     · the tiny `+` on the last connector stub
     · node captions in the small grey the editor uses

   ⭐ AND IT RUNS. `run` 0..1 walks a pulse along the connectors and lights each
   node's accent as the pulse reaches it, which is what n8n's own execution view
   does — so the same component carries "here is the file" (S8) and "and it runs
   immediately" (S9) without inventing a second object.
   ⛔ THE ICONS ARE FROM `R.roster`, so every node is an app the repo really
   automates. A workflow made of marks that are not in it would be a fabricated
   screenshot.
   ========================================================================= */
export const N8nFlow: React.FC<{ x: number; y: number; w?: number; z?: number;
  /** the app icons, left to right after the trigger */ nodes: readonly string[];
  /** 0..1 — the execution pulse travelling the graph */ run?: number;
  /** 0..1 — reveal, node by node, for the build-on */ build?: number;
  f?: number; rot?: number; s?: number; o?: number; captions?: readonly string[];
  /** ⭐ node size as a fraction of the canvas width. Asked for directly (Alex,
      round 7: *"at 18 seconds make each of the logos for the import thing
      bigger, even if it means having less logos"*) — and "even if it means
      fewer" is the right instinct: a node is only worth drawing if its ICON is
      recognisable, and at 0.118 a 700px canvas gave a 43px logo. At 0.170 the
      same canvas gives 72px, which is the size a mark actually reads at on a
      phone. Fewer, bigger, recognisable beats more and decorative. */
  nodeScale?: number }> =
  ({ x, y, w: ww = 620, z = 70, nodes, run = 0, build = 1, f = 0, rot = 0, s = 1,
     o = 1, captions, nodeScale = 0.170 }) => {
  const hh = ww * 0.50;
  const N = nodes.length + 1;                       /* +1 for the trigger */
  const nodeW = ww * nodeScale;
  const gapX = (ww - nodeW * N - ww * 0.10) / (N - 1);
  const nx = (i: number) => ww * 0.05 + i * (nodeW + gapX);
  const ny = hh * 0.36;
  const ACC = ["#EA4B71", "#4B7BEA", "#2FB673", "#E9A13B", "#8B5CF6", "#0EA5A5"];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 50%" }}>
      {/* ---- the canvas: n8n's light ground with its dot grid ---- */}
      <div style={{ position: "absolute", inset: 0, borderRadius: ww * 0.020,
        background: "#F6F6F7", border: `${ww * 0.006}px solid #D8D8DC`, boxShadow: SH_D,
        overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(#C9C9CF ${ww * 0.0034}px, transparent ${ww * 0.0034}px)`,
          backgroundSize: `${ww * 0.030}px ${ww * 0.030}px` }} />
      </div>

      {/* ---- the connectors, UNDER the nodes ---- */}
      {Array.from({ length: N - 1 }, (_, i) => {
        const ax = nx(i) + nodeW, bx = nx(i + 1);
        const midY = ny + nodeW / 2;
        const seg = ww * 0.008;
        const len = bx - ax;
        /* the pulse: a bright bead travelling this segment when `run` reaches it */
        const t = run * (N - 1) - i;
        const on = t > 0;
        return (
          <React.Fragment key={"cn" + i}>
            <div style={{ position: "absolute", left: ax, top: midY - seg / 2,
              width: len, height: seg, borderRadius: seg,
              background: on ? "#2FB673" : "#B9B9C0",
              opacity: build * (N - 1) > i ? 1 : 0 }} />
            {/* the two port dots n8n draws at every join */}
            {[ax - ww * 0.008, bx - ww * 0.008].map((px, k) => (
              <div key={k} style={{ position: "absolute", left: px, top: midY - ww * 0.008,
                width: ww * 0.016, height: ww * 0.016, borderRadius: "50%",
                background: on ? "#2FB673" : "#9A9AA2",
                opacity: build * (N - 1) > i ? 1 : 0 }} />
            ))}
            {on && t < 1 && (
              <div style={{ position: "absolute", left: ax + len * Math.min(1, t) - ww * 0.014,
                top: midY - ww * 0.014, width: ww * 0.028, height: ww * 0.028,
                borderRadius: "50%", background: "#7CF3C0",
                border: `${ww * 0.005}px solid #2FB673` }} />
            )}
          </React.Fragment>
        );
      })}

      {/* ---- the nodes ---- */}
      {Array.from({ length: N }, (_, i) => {
        if (build * N < i) return null;
        const isTrig = i === 0;
        const done = run * (N - 1) >= i;
        const cx = nx(i);
        const acc = isTrig ? "#EA4B71" : ACC[(i + 1) % ACC.length];
        return (
          <div key={"nd" + i} style={{ position: "absolute", left: cx, top: ny,
            width: nodeW, height: nodeW, zIndex: 6 }}>
            <div style={{ position: "absolute", inset: 0,
              /* ⭐ n8n's trigger node is rounded on its LEFT and square on its
                 right — that silhouette is half of why the graphic is
                 recognisable at a glance, so it is drawn, not approximated. */
              borderRadius: isTrig
                ? `${nodeW * 0.46}px ${nodeW * 0.16}px ${nodeW * 0.16}px ${nodeW * 0.46}px`
                : nodeW * 0.16,
              background: "#FFFFFF",
              border: `${nodeW * 0.038}px solid ${done ? "#2FB673" : "#DCDCE2"}`,
              boxShadow: "0 2px 5px rgba(20,20,30,0.14)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isTrig ? (
                /* the lightning bolt, drawn — n8n's trigger glyph */
                <div style={{ width: nodeW * 0.34, height: nodeW * 0.50,
                  background: acc,
                  clipPath: "polygon(58% 0, 16% 56%, 44% 56%, 34% 100%, 84% 40%, 52% 40%)" }} />
              ) : (
                <Img src={staticFile(`logos/${nodes[i - 1]}.svg`)}
                  style={{ width: nodeW * 0.62, height: nodeW * 0.62, objectFit: "contain" }} />
              )}
            </div>
            {/* the accent bar along the node's foot */}
            <div style={{ position: "absolute", left: nodeW * 0.16, bottom: -nodeW * 0.07,
              width: nodeW * 0.68, height: nodeW * 0.075, borderRadius: nodeW * 0.04,
              background: done ? "#2FB673" : acc }} />
            {captions && captions[i] && (
              <div style={{ position: "absolute", left: -nodeW * 0.55, top: nodeW * 1.24,
                width: nodeW * 2.1, textAlign: "center",
                ...ui(Math.max(9, nodeW * 0.155), 700), color: "#7C7C86",
                letterSpacing: "0.01em" }}>{captions[i]}</div>
            )}
          </div>
        );
      })}

      {/* the `+` stub n8n leaves on the last output */}
      {build >= 1 && (
        <div style={{ position: "absolute", left: nx(N - 1) + nodeW + ww * 0.030,
          top: ny + nodeW / 2 - ww * 0.020, width: ww * 0.040, height: ww * 0.040,
          borderRadius: ww * 0.010, background: "#FFFFFF",
          border: `${ww * 0.005}px dashed #B9B9C0`,
          display: "flex", alignItems: "center", justifyContent: "center",
          ...ui(ww * 0.026, 700), color: "#9A9AA2" }}>+</div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE CURSOR — asked for directly: *"when it says 'click import' have like a
   big-ish sized mouse and clicking right when it has those aspects."*

   ⛔ IT IS BIG ON PURPOSE. §1 measured a 30x38 cursor travelling at ~0 motion —
   a normal-sized pointer is invisible both to the audit and to a phone screen.
   This one is 76px, drawn as a real arrow with a dark keyline so it reads
   against a white UI panel, and it carries a click ring so the CLICK is an
   event and not just an arrival.
   ---------------------------------------------------------------------- */
export const Cursor: React.FC<{ x: number; y: number; s?: number; z?: number;
  /** 0..1 — the press. Drives the dip, the ring and the shadow squash. */
  click?: number; o?: number }> =
  ({ x, y, s: sz = 76, z = 96, click = 0, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: sz, height: sz * 1.36,
    zIndex: z, opacity: o,
    transform: `translate(${click * 5}px, ${click * 7}px) scale(${1 - click * 0.10})`,
    transformOrigin: "10% 6%" }}>
    {/* the click ring — it leaves, so it reads as a hit and not a halo */}
    {click > 0.02 && (
      <div style={{ position: "absolute", left: -sz * 0.42, top: -sz * 0.42,
        width: sz * 1.0, height: sz * 1.0, borderRadius: "50%",
        border: `${sz * 0.07}px solid ${hexa("#2FB673", 1 - click)}`,
        transform: `scale(${0.5 + click * 1.5})` }} />
    )}
    <div style={{ position: "absolute", inset: 0,
      background: "#FFFFFF",
      filter: `drop-shadow(0 ${sz * 0.05}px ${sz * 0.06}px rgba(16,18,24,0.45))`,
      clipPath: "polygon(6% 2%, 6% 78%, 27% 60%, 41% 92%, 56% 84%, 43% 54%, 70% 52%)" }} />
    <div style={{ position: "absolute", inset: 0, background: "#1A1813",
      clipPath: "polygon(6% 2%, 6% 78%, 27% 60%, 41% 92%, 56% 84%, 43% 54%, 70% 52%)",
      transform: `scale(1.10)`, transformOrigin: "6% 2%", zIndex: -1 }} />
  </div>
);
