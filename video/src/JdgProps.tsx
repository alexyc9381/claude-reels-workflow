import React from "react";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh,
  Contact, Pool, Ring, Puff, mono, ui, CLAY, INK, RED, GREEN,
  PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL, FACE, FACED, VOID,
  C_JUDGE, C_PROS, C_DEF, R, settle, antic, load, stroke, STEP,
  BLOCKS, BLOCK_DEAD, lerpHex, W,
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
/* =========================================================================
   ⭐⭐⭐ THE TOWER — THE HERO ARTIFACT, AND IT IS THE THING THAT WAS BUILT.

   ⛔⛔⛔ THIS REPLACES AN EXHIBIT BOARD MADE OF PAPER LEAVES, WHICH WAS REJECTED
   ON THE CONCEPT: *"it's literally just the papers concept."* The board was the
   third drawing of this artifact and all three were flat rectangles — first six
   cream bays that rendered as a RADIATOR, then a board of paper leaves on an
   easel, and the whole reel grew paper around it: charge cards, a docket, a
   clerk carrying files through every scene.
   ⭐ [[feedback_the_metric_makes_paper]] names the mechanism: the motion audit
   rewards large bright objects arriving, so every low scene gets answered with
   another cream rectangle. Its fix is to RE-MAP FROM THE ACTOR. The work is not
   a document — nobody's app is a document — it is A THING SOMEBODY BUILT. So it
   is a stack of big saturated blocks, and every beat in the reel becomes
   physical: a crew STACKS it, the prosecutor KNOCKS BLOCKS OUT, the defense RAMS
   them back in, the judge DROPS A WEIGHT on it.

   Three bars, same as before:
     name it in 2 words   -> "a tower"
     can a body do that   -> build it, knock it down, prop it up, crush it
     ⭐ IS IT THE SUBJECT -> it is the thing you shipped, and it is on trial

   ⭐ AND IT CARRIES THE REEL'S SATURATION. Six distinct saturated hues stacked
   against a deep teal chamber is where "vibrant" comes from — chroma in the
   OBJECTS, not a filter over beige ones.
   ========================================================================= */
export const Tower: React.FC<{
  x: number; y: number; f: number; w?: number; z?: number;
  /** which of the six courses are IN. A course not listed is a GAP. */
  blocks?: number[];
  /** course i is knocked OUT sideways from frame `out[i]` */
  out?: Record<number, number>;
  /** course i is rammed back IN, landing at frame `seat[i]` */
  seat?: Record<number, number>;
  /** 0..1 — how lit the whole stack is. A dead tower is grey. */
  lit?: number;
  /** the whole stack leans (deg) — it sags toward the side it lost */
  lean?: number;
  /** everything above this course comes down from `fall` */
  fall?: number;
  /** a weight is landing on it: 1 = the frame RINGS and does not deform */
  hit?: number;
  /** red spikes driven in: [course, atFrame] */
  spikes?: Array<[number, number]>;
}> = ({ x, y, f, w: ww = 300, z = 60, blocks = [0, 1, 2, 3, 4, 5], out = {},
        seat = {}, lit = 1, lean = 0, fall = -1, hit = 0, spikes = [] }) => {
  const bh = Math.round(ww * 0.335);
  const N = 6;
  const fallen = fall >= 0 && f >= fall;
  const fk = fallen ? Math.min(1, (f - fall) / 44) : 0;
  /* ⛔ THE HIT DOES NOT DEFORM IT. That IS "bulletproof": the weight recoils and
     the stack RINGS. A squash here would say it gave. */
  const ring = hit > 0 ? Math.sin(f * 1.9) * 6 * hit : 0;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - bh * N, width: ww,
      height: bh * N, zIndex: z, transformOrigin: "50% 100%",
      transform: `rotate(${lean}deg) translateX(${ring}px)` }}>
      {Array.from({ length: N }, (_, i) => {
        const isOut = out[i] !== undefined && f >= out[i];
        const seatAt = seat[i];
        const seating = seatAt !== undefined;
        if (seating && f < seatAt - 14) return null;
        if (!blocks.includes(i) && !seating) return null;
        let dx = 0, dy = 0, rot = 0, op = 1;
        if (out[i] !== undefined && f >= out[i] - 7 && f < out[i]) {
          /* the TIP: it works loose and leans out before it leaves */
          const k = E(f, out[i] - 7, out[i], 0, 1, IN_Q);
          const sd = i % 2 ? 1 : -1;
          rot = sd * k * 15; dx = sd * k * 22; dy = k * 5;
        }
        if (isOut) {
          /* it is KNOCKED OUT sideways and keeps going — real distance, still
             travelling when it leaves frame (§23) */
          const lf = f - out[i];
          const sd = i % 2 ? 1 : -1;
          dx = sd * (22 + lf * lf * 2.1); dy = lf * lf * 0.7; rot = sd * (15 + lf * 8);
          op = Math.max(0, 1 - Math.abs(dx) / 860);
          if (Math.abs(dx) > 900) return null;
        } else if (fallen && i >= 1) {
          const sd = i % 2 ? 1 : -1;
          dx = sd * fk * fk * 880; dy = fk * fk * 900; rot = sd * fk * 104;
          op = Math.max(0, 1 - fk * 0.85);
        }
        const k = seating ? E(f, seatAt - 14, seatAt, 0, 1, IN_Q) : 1;
        const over = seating ? settle(f, seatAt, 9, 12, 2.5) : 0;
        const inX = seating ? (1 - k) * (i % 2 ? 640 : -640) : 0;
        const c = BLOCKS[i % BLOCKS.length];
        const paint = lit > 0.5 ? c : lerpHex(c, BLOCK_DEAD, 0.45);
        /* each course is narrower as it goes up, so the silhouette is a TOWER */
        const cw = ww * (1 - i * 0.055);
        return (
          <div key={"bk" + i} style={{ position: "absolute",
            left: (ww - cw) / 2 + dx + inX, top: (N - 1 - i) * bh + dy + over,
            width: cw, height: bh - 5, borderRadius: 5, opacity: (seating ? k : 1) * op,
            transform: `rotate(${rot}deg)`, boxShadow: SH,
            background: `linear-gradient(172deg, ${mxh(paint, 0.46)} 0%, ${paint} 44%, ${dkh(paint, 0.34)} 100%)`,
            border: `3px solid ${dkh(paint, 0.5)}` }}>
            {/* the lit face — a course that is WORKING glows along its front */}
            <div style={{ position: "absolute", left: 12, right: 12, top: bh * 0.30,
              height: 9, borderRadius: 5,
              background: lit > 0.5 ? mxh(paint, 0.86) : hexa("#000", 0.30) }} />
            {[0.16, 0.84].map((r, j) => (
              <div key={j} style={{ position: "absolute", left: cw * r - 9, top: bh * 0.56,
                width: 18, height: 18, borderRadius: 4,
                background: lit > 0.5 ? hexa(mxh(paint, 0.8), 0.9) : hexa("#000", 0.3) }} />
            ))}
          </div>
        );
      })}
      {/* the gap a knocked-out course leaves is a real HOLE with the courses
          above it resting on nothing */}
      {spikes.map(([course, at], i) => {
        if (f < at) return null;
        const lf = f - at;
        const drive = E(lf, 0, 5, -170, 0, IN_Q) + settle(lf, 5, 7, 10, 2.2);
        return (
          <div key={"sp" + i} style={{ position: "absolute", left: ww * 0.5 - 7 + (i - 1) * 46,
            top: (N - 1 - course) * bh - 60 + drive, width: 14, height: 84, zIndex: 6,
            background: `linear-gradient(180deg, ${mxh(RED, 0.2)} 0%, ${dkh(RED, 0.45)} 100%)` }}>
            <div style={{ position: "absolute", left: -9, top: -14, width: 32, height: 22,
              borderRadius: 3, background: RED }} />
          </div>
        );
      })}
    </div>
  );
};

/** ⭐⭐ THE BLOCK LINE — an overhead conveyor carrying courses across the room.
    ⛔ THIS EXISTS BECAUSE REMOVING THE PAPER REMOVES THE REEL'S ONLY FULL-WIDTH
    TRAVELLING BAND, and that is the single biggest lever in the measured motion
    table (one scene 10.44 against its neighbour 2.83 at identical push). Reel
    120 lost 11.03 -> 5.23 on one scene the moment its dockets came out, and got
    it back with a parts line in METAL rather than in paper. Same move here: the
    band is the material the reel is actually about. */
export const BlockLine: React.FC<{ f: number; y: number; z?: number; rate?: number;
  n?: number; s?: number; back?: number }> =
  ({ f, y, z = 30, rate = 3.2, n = 7, s = 1, back = 0.52 }) => {
  const span = W + 320, pitch = span / n;
  return (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: y - 16, height: 12,
      zIndex: z, background: `linear-gradient(180deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
    {Array.from({ length: n }, (_, i) => {
      const x = (((i * pitch + f * rate) % span) + span) % span - 160;
      const c = lerpHex(BLOCKS[i % BLOCKS.length], "#AFD2DA", back);
      const bw = 118 * s, bhh = 52 * s;
      return (
        <React.Fragment key={"bl" + i}>
          <div style={{ position: "absolute", left: x + bw / 2 - 3, top: y - 4, width: 6,
            height: 20, zIndex: z + 1, background: dkh(BRSD, 0.2) }} />
          <div style={{ position: "absolute", left: x, top: y + 16, width: bw, height: bhh,
            zIndex: z + 2, borderRadius: 4, boxShadow: SH,
            background: `linear-gradient(172deg, ${mxh(c, 0.26)} 0%, ${c} 46%, ${dkh(c, 0.4)} 100%)`,
            border: `3px solid ${dkh(c, 0.26)}` }}>
            <div style={{ position: "absolute", left: 10, right: 10, top: bhh * 0.34, height: 6,
              borderRadius: 3, background: hexa("#FFFFFF", 0.30) }} />
          </div>
        </React.Fragment>
      );
    })}
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
   ⭐ THE CONSOLE — "the third line of the prompt", as a thing a body OPERATES.

   ⛔ THIS REPLACES A PAPER DOCKET UNDER A DESK LAMP. It was the most literal
   possible drawing of "a line of a prompt" and it was the single most static
   scene in the reel twice over — a 780px near-white rectangle with dashes on it.
   ⭐ The ACTOR here is not a document, it is somebody CONFIGURING the run: three
   slots on a lit console, and the third one takes three ROLE KEYS that get
   slammed home. That is the same information as a third line of text, delivered
   as a physical act with saturated colour on it.
   ⛔ [[feedback_substitute_the_text_never_delete_it]] — the line is not dropped,
   it is SUBSTITUTED by a graphic that says the same thing.
   ========================================================================= */
export const Console: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  /** how many of the three slots are filled, 0..3 */
  slots?: number;
  /** the three role keys slam home at these frames */
  keys?: number[];
}> = ({ x, y, f, w: ww = 620, z = 62, slots = 3, keys = [] }) => {
  const hh = Math.round(ww * 0.46);
  const sw = (ww - 90) / 3;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh / 2, width: ww, height: hh,
      zIndex: z, borderRadius: 10, boxShadow: SH_D,
      background: `linear-gradient(172deg, ${mxh(OAKL, 0.16)} 0%, ${OAK} 40%, ${dkh(OAK, 0.5)} 100%)`,
      border: `6px solid ${dkh(OAKD, -0.3)}` }}>
      {/* the three slots, left to right — the third is the one that matters */}
      {[0, 1, 2].map(i => {
        const on = i < slots;
        const hot = i === 2;
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: 30 + i * (sw + 15), top: 26,
            width: sw, height: hh - 100, borderRadius: 7,
            background: on
              ? `linear-gradient(178deg, ${mxh(hot ? C_JUDGE : GREEN, 0.34)} 0%, ${hot ? C_JUDGE : GREEN} 54%, ${dkh(hot ? C_JUDGE : GREEN, 0.44)} 100%)`
              : `linear-gradient(178deg, #16323A 0%, #081A20 100%)`,
            border: `4px solid ${on ? dkh(hot ? C_JUDGE : GREEN, 0.5) : "#0A2028"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            ...mono(hot ? 40 : 34, 900), color: on ? "#12240E" : "#2A4A54" }}>
            {i + 1}
          </div>
        );
      })}
      {/* the three ROLE KEYS, slamming into the third slot */}
      {keys.map((at, i) => {
        if (f < at - 12) return null;
        const c = [C_JUDGE, C_PROS, C_DEF][i];
        const drop = E(f, at - 12, at, -340, 0, IN_Q);
        const set = f >= at ? settle(f - at, 0, 9, 11, 2.3) : 0;
        return (
          <div key={"ky" + i} style={{ position: "absolute", left: ww - 78 - (2 - i) * 82,
            top: hh - 74 + drop + set, width: 70, height: 62, borderRadius: 6, zIndex: 5,
            boxShadow: SH,
            background: `linear-gradient(172deg, ${mxh(c, 0.32)} 0%, ${c} 48%, ${dkh(c, 0.42)} 100%)`,
            border: `4px solid ${dkh(c, 0.52)}` }}>
            <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, height: 10,
              borderRadius: 3, background: hexa("#000", 0.36) }} />
          </div>
        );
      })}
      {/* the run bar across the foot — a LENGTH, no numeral */}
      <div style={{ position: "absolute", left: 30, bottom: 20, width: ww - 240, height: 20,
        borderRadius: 5, background: "#081A20", border: `3px solid #0A2028`, padding: 3,
        display: "flex", gap: 3 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"rb" + i} style={{ flex: 1, borderRadius: 2,
            background: i < Math.round(slots * 2.6) ? GREEN : hexa("#000", 0.5) }} />
        ))}
      </div>
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
  const inX = E(lf, -16, 0, -620, 0, IN_Q);
  const set = lf >= 0 ? settle(lf, 0, 9, 13, 2.5) : 0;
  const bob = lf >= 0 ? Math.sin(lf / 7) * 4 : 0;
  /* ⛔ THREE DIFFERENT BUILDS, NOT THREE CRATES — and not three cream slabs
     either. Each is made of the same saturated blocks the tower is made of, in a
     different arrangement, so "an app, a site, a tool" reads as three things
     somebody BUILT out of the same material. */
  const SHAPES: number[][][] = [
    [[0], [1], [2], [3]],                    /* APP  — tall and narrow */
    [[0, 1, 2], [3, 4, 5]],                  /* SITE — wide, two courses */
    [[0, 1], [2, 3], [4]],                   /* TOOL — squat, stepped */
  ];
  const rows = SHAPES[kind];
  const bw = 74 * s, bh = 56 * s;
  const wide = Math.max(...rows.map(r => r.length)) * bw;
  return (
    <div style={{ position: "absolute", left: x - wide / 2, top: y - rows.length * bh,
      zIndex: z, transform: `translate(${inX + set}px, ${bob}px)` }}>
      {rows.map((row, r) => row.map((bi, c) => {
        const col = BLOCKS[bi % BLOCKS.length];
        return (
          <div key={`s${r}-${c}`} style={{ position: "absolute",
            left: (wide - row.length * bw) / 2 + c * bw, top: r * bh,
            width: bw - 5, height: bh - 5, borderRadius: 5, boxShadow: SH,
            background: `linear-gradient(172deg, ${mxh(col, 0.28)} 0%, ${col} 46%, ${dkh(col, 0.4)} 100%)`,
            border: `3px solid ${dkh(col, 0.5)}` }}>
            <div style={{ position: "absolute", left: 8, right: 8, top: bh * 0.30, height: 6,
              borderRadius: 3, background: mxh(col, 0.68) }} />
          </div>
        );
      }))}
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
