import React from "react";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh,
  Contact, Pool, Ring, Puff, mono, ui, CLAY, INK, RED, GREEN,
  PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL, FACE, FACED, VOID,
  C_JUDGE, C_PROS, C_DEF, R, settle, antic, load, stroke, STEP,
} from "./JdgWorld";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE PROPS.  Board: storyboards/132-judge.md.

   ⛔⛔⛔ EVERY OBJECT IN THIS FILE IS A REAL COURTHOUSE OBJECT. Nothing was
   invented. That is not a style preference: reel 128 v1 shipped a 24-part
   machine that passed EVERY gate and was rejected on the metaphor, because an
   invented object is a container one layer up and a viewer at half a second
   reads it as "a big box of tools".
   [[feedback_the_invented_object_is_a_container]] · [[ANIMATION-QUALITY §15]]

   ⛔ MATTE ONLY — no `boxShadow: 0 0 Npx` anywhere in this file.
   ⛔ NOTHING LANDS AND STOPS: every arrival gets `settle()`, a squash, and
      where it costs something, a `Ring` and a `Puff`.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS — a 52px prop is 12px after the
      audit's 1012->240 downsample, i.e. invisible to it and nearly so to a
      viewer on a phone.
   ========================================================================= */

/* =========================================================================
   ⭐⭐⭐ THE EXHIBIT — THE HERO ARTIFACT, AND IT IS AN EASEL-MOUNTED BOARD.

   ⛔⛔⛔ THE FIRST VERSION OF THIS PROP WAS A BRASS FRAME OF SIX CREAM BAYS AND
   IT RENDERED AS A RADIATOR. Which is the reel's own thesis used against me:
   an object I invented is a CONTAINER one layer up, and a viewer does not decode
   a silhouette, they RECOGNISE a thing
   ([[feedback_the_invented_object_is_a_container]] · [[ANIMATION-QUALITY §15]]).
   Six identical bays with four rules in each carried ONE bit of information and
   looked like a heating grille at half a second.

   ⭐ THE REPLACEMENT IS THE MOST RECOGNISABLE OBJECT IN A COURTROOM AFTER THE
   GAVEL: **an exhibit on an easel.** A wooden tripod, a big board, and on the
   board a real piece of WORK — a heading bar, two columns of copy, a bar chart
   and a green APPROVED roundel. It passes all three bars:
     name it in 2 words   -> "exhibit board"
     can a body do that   -> he presents it, swears to it, and it sheds its face
     ⭐ IS IT THE SUBJECT -> it is Claude's work, presented as finished

   THE FACE IS THREE LEAVES, so it can come apart in stages and leave the EMPTY
   BACKING FRAME behind — which is the whole reel in one switch:
     hook   3 leaves, seal GREEN  ->  they tear away  ->  0 leaves, seal DEAD
     S1     2 leaves back         ->  ⭐ ONE LEAF LEFT MISSING, and it stays missing
     S10    a flag driven THROUGH the missing leaf
     S13    pass 3 restores it, and the gavel lands and leaves NO MARK
   ========================================================================= */
/** ⭐ THE EASEL ON ITS OWN — so the board can come OFF it and leave it standing
    and empty, which is the hook's last image and the reel's thesis in one prop.
    ⛔ Drawn here rather than inside `Exhibit` because a topple has to move the
    board WITHOUT moving what it was resting on. */
export const EaselOnly: React.FC<{ x: number; y: number; w?: number; z?: number }> =
  ({ x, y, w: ww = 520, z = 44 }) => (<>
    <Contact x={x - ww * 0.42} y={y + 176} w={ww * 0.84} z={z - 1} o={0.42} />
    {[-1, 1].map(sd => (
      <div key={"lg" + sd} style={{ position: "absolute", left: x + sd * (ww * 0.30) - 13,
        top: y - 30, width: 26, height: 216, zIndex: z, transformOrigin: "50% 0%",
        transform: `rotate(${sd * 9}deg)`,
        background: `linear-gradient(96deg, ${OAKL} 0%, ${dkh(OAK, 0.34)} 100%)` }} />
    ))}
    <div style={{ position: "absolute", left: x - ww * 0.36, top: y - 14, width: ww * 0.72,
      height: 22, zIndex: z + 1, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(OAKL, 0.28)} 0%, ${dkh(OAK, 0.3)} 100%)` }} />
  </>);

export const Exhibit: React.FC<{
  x: number; y: number; f: number; w?: number; z?: number;
  /** which of the three leaves are present */
  leaves?: number[];
  /** per-leaf tear-away: leaf i rips off starting at frame `out[i]` */
  out?: Record<number, number>;
  /** per-leaf seat: leaf i flies IN and lands at frame `seat[i]` */
  seat?: Record<number, number>;
  /** the APPROVED seal: 1 = green and lit, 0 = dead */
  lamp?: number;
  /** the board leans on its easel */
  tip?: number;
  /** every remaining leaf goes at once, from this frame */
  fall?: number;
  /** red flags driven in: [leafIndex, atFrame] */
  flags?: Array<[number, number]>;
  /** the gavel rings OFF it — the board does NOT deform. That IS "bulletproof". */
  hit?: number;
  /** draw the easel legs (off for wall-mounted uses) */
  easel?: boolean;
}> = ({ x, y, f, w: ww = 520, z = 60, leaves = [0, 1, 2], out = {},
        seat = {}, lamp = 1, tip = 0, fall = -1, flags = [], hit = 0, easel = true }) => {
  const hh = Math.round(ww * 0.74);
  const lw = (ww - 34) / 3;
  const fallen = fall >= 0 && f >= fall;
  /* ⛔ THE FACE GOES OVER 30 FRAMES, ACCELERATING, AND IS STILL CROSSING THE
     FRAME AT THE CUT. v1 finished in 16 and then held, which is half of why all
     three cuts measured a PRE-CUT ratio under 0.70. §23: an OUT/IO ease
     decelerates into its end whether or not that end is on screen. */
  const fk = fallen ? Math.min(1, (f - fall) / 30) : 0;
  const ringOff = hit > 0 ? Math.sin((f) * 1.7) * 7 * hit : 0;
  return (<>
    {/* THE EASEL — a wooden tripod. This is the half that makes it recognisable;
        a board with no easel is just a rectangle. */}
    {easel && (<>
      <Contact x={x - ww * 0.42} y={y + 176} w={ww * 0.84} z={z - 3} o={0.42} />
      {[-1, 1].map(sd => (
        <div key={"lg" + sd} style={{ position: "absolute", left: x + sd * (ww * 0.30) - 11,
          top: y - 30, width: 22, height: 214, zIndex: z - 2, transformOrigin: "50% 0%",
          transform: `rotate(${sd * 9}deg)`,
          background: `linear-gradient(96deg, ${OAKL} 0%, ${dkh(OAK, 0.34)} 100%)` }} />
      ))}
      {/* the crossbar the board actually rests on */}
      <div style={{ position: "absolute", left: x - ww * 0.36, top: y - 14, width: ww * 0.72,
        height: 20, zIndex: z - 1, borderRadius: 3,
        background: `linear-gradient(180deg, ${mxh(OAKL, 0.24)} 0%, ${dkh(OAK, 0.3)} 100%)` }} />
    </>)}

    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transformOrigin: "50% 100%",
      transform: `rotate(${tip}deg) translateX(${ringOff}px)` }}>
      {/* the BACKING FRAME — what is left when the work is gone. ⛔ A HOLE HAS NO
          GRADIENT: the room stops at it. A dimmer over a dark ground deletes the
          object, so the empty state is a real VOID with cross-bracing in it, not
          a faded panel ([[feedback_a_dimmer_on_a_dark_ground]]). */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 5,
        background: `linear-gradient(172deg, ${BRSL} 0%, ${BRS} 28%, ${BRSD} 100%)`,
        border: `5px solid ${dkh(BRSD, 0.42)}`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 14, top: 14, right: 14, bottom: 14,
        background: VOID, border: `2px solid ${hexa("#000", 0.7)}` }} />
      {[0.30, 0.70].map((k, i) => (
        <div key={"br" + i} style={{ position: "absolute", left: 14, right: 14,
          top: 14 + (hh - 28) * k - 4, height: 8,
          background: `linear-gradient(180deg, ${dkh(BRSD, 0.24)} 0%, ${dkh(BRSD, 0.6)} 100%)` }} />
      ))}

      {/* THE THREE LEAVES OF THE WORK ITSELF */}
      {[0, 1, 2].map(i => {
        const lx = 17 + i * lw;
        const isOut = out[i] !== undefined && f >= out[i];
        const seatAt = seat[i];
        const seating = seatAt !== undefined;
        if (seating && f < seatAt - 14) return null;
        if (!leaves.includes(i) && !seating) return null;
        let dy = 0, rot = 0, op = 1, ox = 0;
        /* ⭐ A LEAF PEELS BEFORE IT GOES. The first build cut straight from
           "attached" to "falling", which left an 8-frame hole between the oath
           strike (f7) and the first consequence (f15) where the whole frame
           measured 0.72-0.88 — the 0-1s FLOOR the hook score kept failing on.
           A peel is a LARGE object rotating about its own top corner: it is the
           consequence arriving IMMEDIATELY and escalating, instead of a gap and
           then an event. §31.4 — a causal chain, not one event after a wait. */
        if (out[i] !== undefined && f >= out[i] - 7 && f < out[i]) {
          const k = E(f, out[i] - 7, out[i], 0, 1, IN_Q);
          rot = k * 26; ox = k * 10; dy = k * 6;
        }
        if (isOut) {
          const lf = f - out[i];
          dy = lf * lf * 1.25; rot = 26 + lf * (i - 1 || 1) * 3.6;
          op = Math.max(0, 1 - dy / 700);
          if (dy > hh + 480) return null;
        } else if (fallen) {
          dy = fk * fk * 980; rot = fk * (i - 1) * 13 + fk * 5;
          op = Math.max(0, 1 - fk * 0.9);
        }
        const k = seating ? E(f, seatAt - 14, seatAt, 0, 1, IN_Q) : 1;
        const over = seating ? settle(f, seatAt, 8, 12, 2.6) : 0;
        const inY = seating ? (1 - k) * -340 : 0;
        return (
          <div key={"lf" + i} style={{ position: "absolute", left: lx, top: 17 + over,
            width: lw - 6, height: hh - 34, borderRadius: 2,
            opacity: (seating ? k : 1) * op,
            transformOrigin: "0% 0%",
            transform: `translate(${ox}px, ${inY + dy}px) rotate(${rot}deg)`,
            background: `linear-gradient(168deg, #F4EEDC 0%, ${FACE} 58%, ${FACED} 100%)`,
            border: `2px solid ${dkh(FACED, 0.26)}` }}>
            {/* ⭐ REAL WORK ON IT, so the board is a REPORT and not a blank tile:
                a heading bar, ruled copy, and on the middle leaf a bar chart. */}
            <div style={{ position: "absolute", left: 10, top: 12, width: (lw - 26) * 0.82,
              height: 15, borderRadius: 2, background: i === 1 ? CLAY : hexa("#3B3527", 0.72) }} />
            {[0, 1, 2, 3, 4, 5].map(j => (
              <div key={j} style={{ position: "absolute", left: 10, top: 42 + j * 19,
                width: (lw - 26) * (0.94 - ((i + j) % 3) * 0.22), height: 6, borderRadius: 2,
                background: hexa("#3B3527", 0.40) }} />
            ))}
            {i === 1 && [0, 1, 2, 3].map(j => (
              <div key={"bc" + j} style={{ position: "absolute", left: 12 + j * 22,
                bottom: 16, width: 15, height: 26 + j * 17, borderRadius: 2,
                background: hexa(CLAY, 0.78) }} />
            ))}
            {i === 2 && (
              <div style={{ position: "absolute", left: 10, bottom: 16,
                width: (lw - 26) * 0.7, height: 5, background: hexa("#3B3527", 0.55) }} />
            )}
          </div>
        );
      })}

      {/* the red flags the prosecutor drives in */}
      {flags.map(([leaf, at], i) => {
        if (f < at) return null;
        const lf = f - at;
        const drive = E(lf, 0, 5, -140, 0, IN_Q) + settle(lf, 5, 6, 10, 2.2);
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: 17 + leaf * lw + lw * 0.40,
            top: -58 + drive, width: 10, height: 96, zIndex: 6,
            background: `linear-gradient(180deg, ${dkh(RED, 0.06)} 0%, ${dkh(RED, 0.5)} 100%)` }}>
            <div style={{ position: "absolute", left: 8, top: 2, width: 52, height: 32,
              background: RED, clipPath: "polygon(0 0,100% 0,74% 50%,100% 100%,0 100%)" }} />
          </div>
        );
      })}

      {/* THE APPROVED SEAL — a real lit roundel, not a flat disc. Reel 129's
          finding: a lens lit FROM WITHIN reads as ON where a pale square reads
          as a blank card. */}
      <div style={{ position: "absolute", right: -44, top: hh * 0.10, width: 112, height: 112,
        borderRadius: "50%", border: `7px solid ${dkh(BRSD, 0.4)}`, zIndex: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        ...mono(27, 900), color: lamp > 0.5 ? "#0B3A24" : "#3A3E39", letterSpacing: 1,
        background: lamp > 0.5
          ? `radial-gradient(50% 50% at 42% 34%, #DFFBE6 0%, ${GREEN} 56%, ${dkh(GREEN, 0.5)} 100%)`
          : `radial-gradient(50% 50% at 42% 34%, #2A2E29 0%, #14170F 100%)` }}>OK</div>
    </div>
    {lamp > 0.5 && <Pool x={x + ww / 2} y={y - hh * 0.72} w={230} c={GREEN} o={0.22} z={z - 4} />}
  </>);
};

/** the plinth the exhibit stands on — an oak block with a brass cap */
export const Plinth: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number;
  tip?: number }> = ({ x, y, w: ww = 300, h: hh = 130, z = 46, tip = 0 }) => (<>
  <Contact x={x - ww / 2 - 14} y={y - 8} w={ww + 28} z={z - 1} o={0.44} />
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${tip * 0.4}deg)`,
    background: `linear-gradient(172deg, ${OAKL} 0%, ${OAK} 36%, ${dkh(OAK, 0.5)} 100%)`,
    borderTop: `5px solid ${mxh(OAKL, 0.3)}`, boxShadow: SH }} />
  <div style={{ position: "absolute", left: x - ww / 2 - 10, top: y - hh - 10, width: ww + 20,
    height: 14, zIndex: z + 1, background: `linear-gradient(180deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
</>);

/* =========================================================================
   THE WITNESS BOX — the hook's set piece. An oak box, a brass rail across the
   front, and the OATH BLOCK he strikes.
   ========================================================================= */
export const WitnessBox: React.FC<{ x: number; y: number; f: number; w?: number;
  z?: number; strike?: number }> = ({ x, y, f, w: ww = 470, z = 50, strike = 0 }) => {
  const hh = 250;
  return (<>
    <Contact x={x - ww / 2 - 18} y={y - 10} w={ww + 36} z={z - 1} o={0.5} />
    {/* the box front, panelled like the wainscot so it belongs to the building */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, background: `linear-gradient(174deg, ${OAKL} 0%, ${OAK} 30%, ${dkh(OAK, 0.55)} 100%)`,
      boxShadow: SH_D }}>
      {[0, 1, 2].map(i => (
        <div key={"wp" + i} style={{ position: "absolute", left: 16 + i * (ww - 32) / 3,
          top: 26, width: (ww - 32) / 3 - 14, height: hh - 62,
          background: `linear-gradient(174deg, ${hexa(dkh(OAK, 0.2), 0.9)} 0%, ${hexa(dkh(OAK, 0.5), 0.9)} 100%)`,
          borderTop: `3px solid ${hexa(OAKL, 0.4)}`, borderBottom: `3px solid ${hexa("#000", 0.4)}` }} />
      ))}
    </div>
    {/* the brass rail across the top — the object a body actually GRIPS */}
    <div style={{ position: "absolute", left: x - ww / 2 - 16, top: y - hh - 16, width: ww + 32,
      height: 20, zIndex: z + 2,
      background: `linear-gradient(180deg, ${BRSL} 0%, ${BRS} 42%, ${BRSD} 100%)` }} />
    {/* THE OATH BLOCK — a brass plate on a short post, and it takes the hit */}
    <div style={{ position: "absolute", left: x + ww * 0.30, top: y - hh - 44 + strike * 7,
      width: 116, height: 30, zIndex: z + 3, borderRadius: 3,
      background: `linear-gradient(178deg, ${BRSL} 0%, ${BRSD} 100%)`,
      border: `3px solid ${dkh(BRSD, 0.44)}` }} />
  </>);
};

/* =========================================================================
   THE BENCH — the judge's desk. Raised, panelled, with the brass gavel block.
   ========================================================================= */
export const BenchDesk: React.FC<{ x: number; y: number; w?: number; h?: number;
  z?: number; lit?: number }> = ({ x, y, w: ww = 640, h: hh = 220, z = 50, lit = 1 }) => (<>
  <Contact x={x - ww / 2 - 20} y={y - 12} w={ww + 40} z={z - 1} o={0.5} />
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z, background: `linear-gradient(174deg, ${OAKL} 0%, ${OAK} 26%, ${dkh(OAK, 0.58)} 100%)`,
    boxShadow: SH_D }}>
    {[0, 1, 2, 3].map(i => (
      <div key={"bp" + i} style={{ position: "absolute", left: 18 + i * (ww - 36) / 4,
        top: 24, width: (ww - 36) / 4 - 16, height: hh - 58,
        background: `linear-gradient(174deg, ${hexa(dkh(OAK, 0.18), 0.9)} 0%, ${hexa(dkh(OAK, 0.5), 0.9)} 100%)`,
        borderTop: `3px solid ${hexa(OAKL, 0.42)}` }} />
    ))}
  </div>
  {/* the desk top, the brightest horizontal in the frame when the lamp is on */}
  <div style={{ position: "absolute", left: x - ww / 2 - 22, top: y - hh - 20, width: ww + 44,
    height: 24, zIndex: z + 2,
    background: `linear-gradient(180deg, ${mxh(OAKL, 0.4 * lit)} 0%, ${OAKL} 40%, ${dkh(OAK, 0.5)} 100%)` }} />
</>);

/** the gavel and its block. ⭐ THE STRIKE IS A DISCRETE STROKE, and on the
    payoff it RECOILS — a gavel that stops dead has hit something soft. */
export const Gavel: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; recoil?: boolean }> = ({ x, y, f, at, s = 1, z = 72, recoil = false }) => {
  const lf = f - at;
  /* wind-up (coil back and HOLD), drive through, then either settle or bounce */
  const swing = lf < 0 ? E(f, at - 14, at - 4, 0, -46, OUT)
    : recoil ? E(lf, 0, 3, -46, 0, IN_Q) + Math.max(0, settle(lf, 3, 30, 9, 2.0))
             : E(lf, 0, 3, -46, 0, IN_Q) + settle(lf, 3, 9, 14, 2.4);
  const head = 92 * s, shaft = 150 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transformOrigin: "8% 92%", transform: `rotate(${swing}deg)` }}>
      <div style={{ position: "absolute", left: 0, top: -shaft, width: 18 * s, height: shaft,
        borderRadius: 4, background: `linear-gradient(96deg, ${OAKL} 0%, ${dkh(OAK, 0.3)} 100%)` }} />
      <div style={{ position: "absolute", left: -head * 0.34, top: -shaft - head * 0.42,
        width: head, height: head * 0.56, borderRadius: 7,
        background: `linear-gradient(172deg, ${OAKL} 0%, ${OAK} 44%, ${dkh(OAK, 0.5)} 100%)`,
        borderTop: `4px solid ${mxh(OAKL, 0.34)}` }}>
        <div style={{ position: "absolute", left: 4, top: 4, width: 12 * s, height: head * 0.48 - 8,
          background: hexa(BRS, 0.7) }} />
        <div style={{ position: "absolute", right: 4, top: 4, width: 12 * s, height: head * 0.48 - 8,
          background: hexa(BRS, 0.7) }} />
      </div>
    </div>
  );
};

/** the sound block the gavel lands on */
export const Block: React.FC<{ x: number; y: number; s?: number; z?: number }> =
  ({ x, y, s = 1, z = 66 }) => (
  <div style={{ position: "absolute", left: x - 62 * s, top: y - 30 * s, width: 124 * s,
    height: 30 * s, borderRadius: 5, zIndex: z,
    background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.4)} 100%)`,
    borderTop: `4px solid ${mxh(OAKL, 0.3)}` }} />
);

/* =========================================================================
   THE NAMEPLATE — a brass plate with a role on it. Three of these landing on
   the words IS the reel's identity scene.
   ⭐ IT LANDS HARD AND IT THROWS ITS OWN POOL. §31.3: one cause, several
   visible effects — the land lights a pool, jolts the surface and rings.
   ========================================================================= */
export const Nameplate: React.FC<{ x: number; y: number; f: number; at: number;
  t: string; c?: string; w?: number; z?: number; pool?: boolean }> =
  ({ x, y, f, at, t, c = BRSL, w: ww = 268, z = 78, pool = true }) => {
  const lf = f - at;
  if (lf < -18) return null;
  const drop = E(lf, -18, 0, -260, 0, IN_Q);
  const set = settle(lf, 0, 9, 11, 2.3);
  const sq = lf >= 0 && lf < 9 ? 1 + E(lf, 0, 4, 0.20, 0, OUT) : 1;
  return (<>
    {pool && lf >= 0 && <Pool x={x} y={y + 22} w={ww * 1.7} c={c} o={0.24 * Math.min(1, lf / 5)} z={z - 2} />}
    <div style={{ position: "absolute", left: x - ww / 2, top: y - 54 + drop + set,
      width: ww, height: 54, zIndex: z, borderRadius: 4,
      transform: `scaleX(${sq}) scaleY(${2 - sq})`, transformOrigin: "50% 100%",
      background: `linear-gradient(178deg, ${mxh(c, 0.3)} 0%, ${c} 40%, ${dkh(c, 0.42)} 100%)`,
      border: `3px solid ${dkh(c, 0.5)}`, display: "flex", alignItems: "center",
      justifyContent: "center", boxShadow: SH }}>
      <span style={{ ...mono(23, 900), color: "#241B0C", letterSpacing: 3 }}>{t}</span>
    </div>
    {lf >= 0 && lf < 22 && <Ring x={x} y={y - 16} f={f} at={at} c={c} z={z + 1} s={0.9} />}
  </>);
};

/* =========================================================================
   THE DOCKET — the three-line prompt, as a real document under a desk lamp.
   ⛔ NOT 118's vertical lectern slab. This is paper, flat, seen from above.
   ⭐ Line 3 is struck in letter-block by letter-block, on the words.
   ========================================================================= */
export const Docket: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  /** how many of the three lines are struck: 0..3, fractional for line 3 */
  lines?: number; stamp?: number }> =
  ({ x, y, f, w: ww = 540, z = 62, lines = 3, stamp = -1 }) => {
  const hh = Math.round(ww * 0.70);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh / 2, width: ww, height: hh,
      zIndex: z, background: `linear-gradient(172deg, #F6F0DF 0%, #DED5BE 100%)`,
      boxShadow: SH_D, border: `2px solid ${hexa("#8B8065", 0.5)}` }}>
      {/* ⛔⛔ THE FIRST VERSION OF THIS WAS A BLANK WHITE SLAB. On the contact
          sheet S8 read as an empty page with two rows of faint dashes on it, and
          it measured STATIC twice — a 780x530 field of near-white is both the
          least interesting object you can put on screen and, per
          [[feedback_a_lit_rectangle_is_a_screen]], a SHAPE problem that moving it
          does not fix. A filed court document has a ruled head, a case number, a
          margin rule, punched holes, a signature block and a seal. */}
      <div style={{ position: "absolute", left: 30, top: 22, width: ww - 60, height: 7,
        background: hexa("#6E644E", 0.85) }} />
      <div style={{ position: "absolute", left: 30, top: 38, width: (ww - 60) * 0.52, height: 22,
        borderRadius: 3, background: hexa("#3B3527", 0.80) }} />
      <div style={{ position: "absolute", right: 30, top: 38, width: (ww - 60) * 0.24, height: 22,
        borderRadius: 3, background: hexa(C_PROS, 0.72) }} />
      <div style={{ position: "absolute", left: 96, top: 70, bottom: 70, width: 3,
        background: hexa(C_PROS, 0.45) }} />
      {[0.28, 0.5, 0.72].map((k, i) => (
        <div key={"ph" + i} style={{ position: "absolute", left: 44, top: hh * k - 11,
          width: 22, height: 22, borderRadius: "50%", background: hexa("#8B8065", 0.34) }} />
      ))}
      <div style={{ position: "absolute", left: 118, bottom: 34, width: (ww - 240) * 0.5,
        height: 5, background: hexa("#3B3527", 0.55) }} />
      <div style={{ position: "absolute", left: 118, bottom: 52, width: (ww - 240) * 0.34,
        height: 12, borderRadius: 2, background: hexa("#3B3527", 0.34) }} />
      <div style={{ position: "absolute", right: 42, bottom: 30, width: 92, height: 92,
        borderRadius: "50%", border: `6px solid ${hexa(C_PROS, 0.62)}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        ...mono(15, 900), color: hexa(C_PROS, 0.8), letterSpacing: 1 }}>SEAL</div>
      {R.docket.map((t, i) => {
        const done = lines - i;
        if (done <= 0) return null;
        const hot = i === 2;
        /* line 3 arrives as discrete letter-blocks, never a fade */
        const nb = 14;
        const shown = hot ? Math.max(0, Math.min(nb, Math.round(done * nb))) : nb;
        return (
          <div key={"ln" + i} style={{ position: "absolute", left: 34, top: 96 + i * 76,
            display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 3,
              background: hot ? C_JUDGE : hexa("#8B8065", 0.30),
              display: "flex", alignItems: "center", justifyContent: "center",
              ...mono(18, 900), color: hot ? "#241B0C" : "#4A4335" }}>{i + 1}</div>
            {Array.from({ length: nb }, (_, j) => (
              <div key={j} style={{ width: (ww - 130) / nb - 5,
                height: hot ? 24 : 17, borderRadius: 2,
                opacity: j < shown ? 1 : 0,
                background: hot ? dkh(C_PROS, 0.05) : hexa("#3B3527", 0.78) }} />
            ))}
          </div>
        );
      })}
      {/* the stamp, landing beside line 3 */}
      {stamp >= 0 && f >= stamp - 8 && (() => {
        const lf = f - stamp;
        const dz = E(lf, -8, 0, -150, 0, IN_Q);
        const s = lf >= 0 ? 1 + settle(lf, 0, 0.08, 9, 2.1) : 1.5;
        return (
          <div style={{ position: "absolute", left: ww - 176, top: hh - 118,
            width: 138, height: 88, borderRadius: 6, transform: `translateY(${dz}px) scale(${s})`,
            border: `6px solid ${hexa(C_PROS, 0.9)}`, display: "flex", alignItems: "center",
            justifyContent: "center", ...mono(26, 900), color: C_PROS, letterSpacing: 2 }}>
            FILED
          </div>
        );
      })()}
    </div>
  );
};

/* =========================================================================
   THE CASE — the prosecutor's charge cards, stacked one hammered at a time.
   ⭐ "BUILDS A CASE" IS THE VO'S OWN VERB, so the picture is a thing being
   BUILT: N discrete lands, ascending, never one growing tween. §9's measured
   row — four discrete pops beat an 82-frame smooth growth 5.63 to 4.27.
   ========================================================================= */
export const CaseStack: React.FC<{ x: number; y: number; f: number; ats: number[];
  w?: number; z?: number; /** the whole stack is swept sideways from this frame */
  sweep?: number }> = ({ x, y, f, ats, w: ww = 300, z = 70, sweep = -1 }) => {
  const ch = 40;
  const swept = sweep >= 0 && f >= sweep;
  return (<>
    {ats.map((at, i) => {
      if (f < at - 12) return null;
      const lf = f - at;
      const drop = E(lf, -12, 0, -340, 0, IN_Q);
      const set = settle(lf, 0, 7, 12, 2.4);
      const sq = lf >= 0 && lf < 8 ? E(lf, 0, 4, 0.22, 0, OUT) : 0;
      /* the sweep: each card leaves on its own vector, still moving at the cut */
      const sk = swept ? (f - sweep) : 0;
      const sx = swept ? sk * sk * (2.2 + i * 0.5) : 0;
      const sy = swept ? -sk * (5 + i * 1.4) + sk * sk * 0.5 : 0;
      const sr = swept ? sk * (7 + i * 3) : 0;
      if (sx > 1400) return null;
      return (
        <div key={"cc" + i} style={{ position: "absolute",
          left: x - ww / 2 + sx, top: y - (i + 1) * ch + drop + set + sy,
          width: ww, height: ch - 5, zIndex: z + i, borderRadius: 3,
          transform: `rotate(${sr + (rnd(i, 71) - 0.5) * 3}deg) scaleY(${1 - sq}) scaleX(${1 + sq})`,
          transformOrigin: "50% 100%", opacity: swept ? Math.max(0, 1 - sx / 1200) : 1,
          background: `linear-gradient(176deg, ${FACE} 0%, ${FACED} 100%)`,
          border: `2px solid ${dkh(FACED, 0.34)}`, boxShadow: SH }}>
          {/* a red charge tab, so a card is a CHARGE and not a blank slab */}
          <div style={{ position: "absolute", left: 8, top: 8, width: 12, height: ch - 21,
            background: C_PROS }} />
          {[0.30, 0.62].map((r, j) => (
            <div key={j} style={{ position: "absolute", left: 30, top: (ch - 5) * r,
              width: (ww - 54) * (0.86 - j * 0.3), height: 4, borderRadius: 2,
              background: hexa("#3B3527", 0.55) }} />
          ))}
        </div>
      );
    })}
  </>);
};

/* =========================================================================
   THE ACCURACY RAIL — ten segments filling.
   ⛔⛔ THE §4 DEPICTION OF A PERCENTAGE, AND THERE IS NO NUMERAL ON IT.
   "ten segments, four lit — no numeral anywhere". The VO's 73% is Alex's
   spoken claim and the caption carries it; the frame does not certify it.
   [[feedback_a_bar_makes_a_loop_legible]] — a quantity as a LENGTH.
   ========================================================================= */
export const Rail10: React.FC<{ x: number; y: number; f: number; lit: number;
  w?: number; z?: number; c?: string; vertical?: boolean }> =
  ({ x, y, f, lit, w: ww = 360, z = 74, c = GREEN, vertical = false }) => {
  const n = R.railN;
  const seg = ww / n;
  return (
    <div style={{ position: "absolute", left: vertical ? x - 26 : x - ww / 2,
      top: vertical ? y - ww : y - 30, width: vertical ? 52 : ww,
      height: vertical ? ww : 30, zIndex: z, borderRadius: 4,
      background: `linear-gradient(178deg, ${dkh(OAK, 0.4)} 0%, ${OAKD} 100%)`,
      border: `3px solid ${dkh(BRSD, 0.5)}`, padding: 4, display: "flex",
      flexDirection: vertical ? "column-reverse" : "row", gap: 3 }}>
      {Array.from({ length: n }, (_, i) => {
        const on = i < lit;
        return (
          <div key={"sg" + i} style={{ flex: 1, borderRadius: 2,
            background: on
              ? `linear-gradient(178deg, ${mxh(c, 0.4)} 0%, ${c} 60%, ${dkh(c, 0.3)} 100%)`
              : hexa("#000", 0.55) }} />
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE CLERK'S COUNTER — brass grille, a filing slot, and the minute dial.
   ========================================================================= */
export const Counter: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number }> =
  ({ x, y, w: ww = 720, h: hh = 210, z = 50 }) => (<>
  <Contact x={x - ww / 2 - 18} y={y - 10} w={ww + 36} z={z - 1} o={0.46} />
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z, background: `linear-gradient(174deg, ${OAKL} 0%, ${OAK} 30%, ${dkh(OAK, 0.55)} 100%)`,
    boxShadow: SH_D }} />
  {/* the counter top — where the sheet actually slides */}
  <div style={{ position: "absolute", left: x - ww / 2 - 20, top: y - hh - 20, width: ww + 40,
    height: 24, zIndex: z + 2,
    background: `linear-gradient(180deg, ${mxh(OAKL, 0.42)} 0%, ${OAKL} 42%, ${dkh(OAK, 0.42)} 100%)` }} />
  {/* the filing SLOT — a real hole in the counter face */}
  <div style={{ position: "absolute", left: x + ww * 0.16, top: y - hh + 34, width: 210,
    height: 22, zIndex: z + 3, background: VOID, border: `3px solid ${dkh(BRSD, 0.4)}` }} />
</>);

/** the brass grille above the counter — a background the eye can read as a place */
export const Grille: React.FC<{ x: number; y: number; w?: number; h?: number; z?: number }> =
  ({ x, y, w: ww = 460, h: hh = 190, z = 30 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z, background: VOID, border: `9px solid ${dkh(BRSD, 0.34)}` }}>
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"gv" + i} style={{ position: "absolute", left: i * (ww / 9) + 6, top: 0,
        width: 7, height: hh, background: `linear-gradient(96deg, ${BRS} 0%, ${BRSD} 100%)` }} />
    ))}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"gh" + i} style={{ position: "absolute", left: 0, right: 0, top: i * (hh / 4) + 8,
        height: 6, background: hexa(BRSD, 0.8) }} />
    ))}
  </div>
);

/** THE MINUTE DIAL — the VO says "one minute", so the hand makes exactly ONE
    sweep. A clock is a recognisable object; the sweep is the depiction. */
export const MinuteDial: React.FC<{ x: number; y: number; f: number; a: number; b: number;
  s?: number; z?: number }> = ({ x, y, f, a, b, s = 1, z = 40 }) => {
  const rot = E(f, a, b, 0, 360, IO);
  const d = 150 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      borderRadius: "50%", zIndex: z, border: `9px solid ${dkh(BRSD, 0.36)}`,
      background: `radial-gradient(50% 50% at 42% 34%, #F7EFD9 0%, #D9CEB2 74%, #B8AC8C 100%)` }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: 6,
          width: 4, height: i % 3 === 0 ? 16 : 9, marginLeft: -2, background: "#4A4335",
          transformOrigin: `2px ${d / 2 - 6}px`, transform: `rotate(${i * 30}deg)` }} />
      ))}
      <div style={{ position: "absolute", left: "50%", top: 14, width: 6, height: d / 2 - 16,
        marginLeft: -3, borderRadius: 3, background: "#24201A",
        transformOrigin: `3px ${d / 2 - 14}px`, transform: `rotate(${rot}deg)` }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 14,
        marginLeft: -7, marginTop: -7, borderRadius: "50%", background: BRSD }} />
    </div>
  );
};

/** a sheet of paper that slides. ⛔ The EVENT is where it STOPS, not the travel. */
export const Sheet: React.FC<{ x: number; y: number; f: number; a: number; b: number;
  from?: number; w?: number; z?: number; lines?: number; drop?: number }> =
  ({ x, y, f, a, b, from = -420, w: ww = 250, z = 68, lines = 4, drop = -1 }) => {
  const slid = E(f, a, b, from, 0, IN_Q);
  const set = f >= b ? settle(f - b, 0, 5, 10, 2.2) : 0;
  const dropping = drop >= 0 && f >= drop;
  const dk = dropping ? (f - drop) : 0;
  if (dropping && dk > 26) return null;
  return (
    <div style={{ position: "absolute", left: x - ww / 2 + slid + set, top: y - ww * 0.36 + dk * dk * 1.4,
      width: ww, height: ww * 0.72, zIndex: z, borderRadius: 2,
      opacity: dropping ? Math.max(0, 1 - dk / 22) : 1,
      transform: `rotate(${dropping ? dk * 2.4 : 0}deg)`,
      background: `linear-gradient(172deg, #F8F2E2 0%, #DFD6C0 100%)`, boxShadow: SH,
      border: `2px solid ${hexa("#8B8065", 0.44)}` }}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 18, top: 22 + i * 22,
          width: (ww - 36) * (0.92 - (i % 3) * 0.24), height: 5, borderRadius: 2,
          background: hexa("#3B3527", 0.5) }} />
      ))}
    </div>
  );
};

/* =========================================================================
   THE VIDEO EXHIBIT — a courtroom A/V cart. ⭐ This is the on-theme home for
   the real stage footage: in this world a screen is EVIDENCE, wheeled in.
   ⛔ THE MONITOR IS A LIT HOLE, full height in its bezel, square corners, with
   light thrown on the floor under it — [[feedback_a_lit_rectangle_is_a_screen]]
   says moving it never helps because the SHAPE is the bug.
   ========================================================================= */
export const EvidenceCart: React.FC<{ x: number; y: number; f: number; at: number;
  w?: number; z?: number; children?: React.ReactNode }> =
  ({ x, y, f, at, w: ww = 860, z = 42, children }) => {
  const sh = Math.round(ww * 0.365);
  const roll = E(f, at - 20, at, 780, 0, IN_Q);
  const set = f >= at ? settle(f - at, 0, 6, 13, 2.6) : 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: z,
      transform: `translateX(${roll + set}px)` }}>
      {/* the two legs and the castors — a cart, not a floating rectangle */}
      {[0.24, 0.76].map((k, i) => (
        <React.Fragment key={"lg" + i}>
          <div style={{ position: "absolute", left: x - ww / 2 + ww * k - 9, top: y - 190,
            width: 18, height: 190, zIndex: z, background: `linear-gradient(96deg, ${STEELC} 0%, ${dkh(STEELC, 0.5)} 100%)` }} />
          <div style={{ position: "absolute", left: x - ww / 2 + ww * k - 17, top: y - 26,
            width: 34, height: 26, borderRadius: 6, zIndex: z + 1, background: "#20242A" }} />
        </React.Fragment>
      ))}
      <Contact x={x - ww * 0.34} y={y - 6} w={ww * 0.68} z={z - 1} o={0.46} />
      {/* the bezel */}
      <div style={{ position: "absolute", left: x - ww / 2 - 22, top: y - 190 - sh - 22,
        width: ww + 44, height: sh + 44, zIndex: z + 2, borderRadius: 10,
        background: `linear-gradient(172deg, #2C3138 0%, #14181D 100%)`,
        border: `8px solid #0C0F13`, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: x - ww / 2, top: y - 190 - sh, width: ww,
        height: sh, zIndex: z + 3, overflow: "hidden" }}>{children}</div>
      {/* the light the screen throws on the floor — where a lit hole's luma
          actually comes from */}
      <Pool x={x} y={y - 40} w={ww * 1.15} c="#BFD8F2" o={0.20} z={z + 1} />
      <div style={{ position: "absolute", left: x + ww / 2 - 16, top: y - 176, width: 13,
        height: 13, borderRadius: 13, zIndex: z + 4, background: GREEN }} />
    </div>
  );
};
const STEELC = "#79828C";

/* =========================================================================
   THE THREE SHIPPED THINGS — ⛔ THREE DIFFERENT SILHOUETTES, not three crates.
   Three identical containers carry ONE bit of information ("there are three")
   for two and a half seconds, which is §3 exactly.
   ========================================================================= */
export const Ship: React.FC<{ kind: 0 | 1 | 2; x: number; y: number; f: number; at: number;
  s?: number; z?: number }> = ({ kind, x, y, f, at, s = 1, z = 66 }) => {
  const lf = f - at;
  if (lf < -16) return null;
  const inX = E(lf, -16, 0, -520, 0, IN_Q);
  const set = lf >= 0 ? settle(lf, 0, 8, 13, 2.5) : 0;
  const bob = lf >= 0 ? Math.sin((lf) / 7) * 3.4 : 0;
  const base: React.CSSProperties = { position: "absolute", zIndex: z,
    transform: `translate(${inX + set}px, ${bob}px)` };
  if (kind === 0) return (  /* APP — a tall rounded slab with a header band */
    <div style={{ ...base, left: x - 62 * s, top: y - 210 * s, width: 124 * s, height: 210 * s,
      borderRadius: 18 * s, background: `linear-gradient(168deg, ${FACE} 0%, ${FACED} 100%)`,
      border: `4px solid ${dkh(FACED, 0.4)}`, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 30 * s,
        borderRadius: 5, background: CLAY }} />
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ position: "absolute", left: 12, top: 58 * s + i * 30 * s,
          width: (100 - (i % 2) * 30) * s, height: 12 * s, borderRadius: 3,
          background: hexa("#3B3527", 0.42) }} />
      ))}
    </div>
  );
  if (kind === 1) return (  /* SITE — a WIDE board with a nav strip */
    <div style={{ ...base, left: x - 145 * s, top: y - 150 * s, width: 290 * s, height: 150 * s,
      borderRadius: 7 * s, background: `linear-gradient(168deg, ${FACE} 0%, ${FACED} 100%)`,
      border: `4px solid ${dkh(FACED, 0.4)}`, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 26 * s,
        background: dkh(OAK, 0.1) }} />
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", left: 14 + i * 44 * s, top: 8 * s,
          width: 32 * s, height: 10 * s, borderRadius: 2, background: hexa(FACE, 0.6) }} />
      ))}
      <div style={{ position: "absolute", left: 16, top: 44 * s, width: 150 * s, height: 22 * s,
        borderRadius: 3, background: hexa("#3B3527", 0.5) }} />
      <div style={{ position: "absolute", right: 16, top: 44 * s, width: 92 * s,
        height: 82 * s, borderRadius: 4, background: hexa(CLAY, 0.75) }} />
    </div>
  );
  return (  /* TOOL — a squat chest with a HANDLE and two latches */
    <div style={{ ...base, left: x - 105 * s, top: y - 130 * s, width: 210 * s, height: 130 * s,
      borderRadius: 8 * s, background: `linear-gradient(168deg, ${dkh(BRS, 0.05)} 0%, ${BRSD} 100%)`,
      border: `4px solid ${dkh(BRSD, 0.44)}`, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 70 * s, top: -26 * s, width: 70 * s, height: 30 * s,
        borderTopLeftRadius: 18, borderTopRightRadius: 18,
        border: `7px solid ${dkh(OAK, 0.2)}`, borderBottom: "none" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 52 * s, height: 8 * s,
        background: hexa("#000", 0.34) }} />
      {[0.22, 0.78].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: 210 * s * k - 16 * s, top: 40 * s,
          width: 32 * s, height: 32 * s, borderRadius: 4, background: OAKL }} />
      ))}
    </div>
  );
};

/** the brass fee discs on the clerk's counter. ⛔ NO CURRENCY FIGURE — the VO
    names none, and a number under them reads as the price of the run watched. */
export const FeeStack: React.FC<{ x: number; y: number; f: number; sweep: number;
  n?: number; s?: number; z?: number }> = ({ x, y, f, sweep, n = 9, s = 1, z = 70 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const go = sweep + i * 1.6;
    const lf = f - go;
    const gone = lf > 0;
    const dx = gone ? lf * (7 + i * 0.5) : 0;
    const dy = gone ? Math.max(0, (lf - 4) * (lf - 4) * 1.8) : 0;
    const rot = gone ? lf * (9 + i * 2) : 0;
    if (dy > 520) return null;
    return (
      <div key={"fd" + i} style={{ position: "absolute", left: x - 34 * s + dx,
        top: y - (i + 1) * 15 * s + dy, width: 68 * s, height: 15 * s, borderRadius: "50%",
        zIndex: z + i, transform: `rotate(${rot}deg)`,
        background: `linear-gradient(178deg, ${BRSL} 0%, ${BRS} 46%, ${BRSD} 100%)`,
        border: `2px solid ${dkh(BRSD, 0.4)}` }} />
    );
  })}
</>);

/** THE EVIDENCE SHELF — where the hollow shell from the hook ends up, and it
    is STILL HOLLOW in the last act. The villain is caught, never abolished. */
export const Shelf: React.FC<{ x: number; y: number; f: number; w?: number; z?: number }> =
  ({ x, y, f, w: ww = 300, z = 34 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - 190, width: ww, height: 190,
    zIndex: z }}>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 13,
      background: `linear-gradient(180deg, ${OAKL} 0%, ${dkh(OAK, 0.5)} 100%)` }} />
    {/* the shell: a brass frame with NOTHING in it */}
    <div style={{ position: "absolute", left: ww * 0.14, bottom: 13, width: ww * 0.72,
      height: 118, borderRadius: 4, border: `5px solid ${dkh(BRSD, 0.3)}`, background: VOID }}>
      {[0.36, 0.64].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${k * 100}%`,
          height: 5, background: dkh(BRSD, 0.4) }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: ww * 0.14, bottom: 138, ...mono(15, 800),
      color: hexa(FACED, 0.6), letterSpacing: 2 }}>EXHIBIT A</div>
  </div>
);
