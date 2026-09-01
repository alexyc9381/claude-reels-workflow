import React from "react";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh,
  Contact, Pool, Ring, Puff, mono, ui, CLAY, INK, RED, GREEN,
  PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL, FACE, FACED, VOID,
  C_JUDGE, C_PROS, C_DEF, R, settle, antic, load, stroke, STEP, Mark,
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
      const bw = 152 * s;
      return (
        <React.Fragment key={"bl" + i}>
          <div style={{ position: "absolute", left: x + bw / 2 - 3, top: y - 4, width: 6,
            height: 22, zIndex: z + 1, background: dkh(BRSD, 0.2) }} />
          {/* ⭐ ALEX CHOSE "the conveyor carries parts of the hero object". It was
              carrying coloured bars, which is the shapes note one layer down. It
              carries the same finished UNITS the hero is holding up — the line
              that keeps feeding him work to sign off — hazed back with brightness
              and desaturation rather than darkness, so it stays background AND
              keeps paying frame-0 luma. */}
          <div style={{ position: "absolute", inset: 0, zIndex: z + 2,
            opacity: 1 - back * 0.42,
            filter: `saturate(${(1 - back * 0.55).toFixed(2)}) brightness(${(1 + back * 0.34).toFixed(2)})` }}>
            <Unit kind={i} x={x + bw / 2} y={y + 20 + 46 * s} w={bw} z={z + 2} lamp={1} f={f} />
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
  const inX = E(lf, -16, 0, -640, 0, IN_Q);
  const set = lf >= 0 ? settle(lf, 0, 9, 13, 2.5) : 0;
  const bob = lf >= 0 ? Math.sin(lf / 7) * 4 : 0;
  /* ⛔ THREE DIFFERENT PRODUCTS, and they are the reel's own units — a phone, a
     monitor and a toolbox for "apps, websites and tools". Three crates would
     carry ONE bit of information; three nameable devices carry three. */
  const KIND = [1, 0, 3][kind];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transform: `translate(${inX + set}px, ${bob}px)` }}>
      <Unit kind={KIND} x={x} y={y} w={286 * s} z={z} lamp={1} f={f} />
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

/* =========================================================================
   ⭐⭐⭐ THREE RECOGNISABLE OBJECTS — THE HOOK CANDIDATES.

   ⛔⛔⛔ SECOND REJECTION ON THE SAME AXIS. v1 was paper; v2 replaced it with a
   TOWER OF BLOCKS and got: *"each of the animations are too boring still, just
   primarily shapes when it should be interesting objects."*
   ⭐ [[feedback_recognition_beats_craft_on_a_hook_object]] is explicit about why
   a better-drawn shape scores worse: reel 130 went blank cards -> ONE prompt card
   at architectural scale with 17 drawn parts -> a TYPEWRITER, and only the third
   needed no decoding. **A rectangle is what "I don't know what I'm looking at"
   means**, and a stack of rectangles is still a rectangle.
   ⭐ THE TEST, BEFORE DRAWING: could a stranger NAME this in half a second, sound
   off, from the silhouette alone? A typewriter, a padlock, a fire extinguisher —
   yes. A crate, a slab, a "module", a tower of blocks — no.
   ⭐ AND ALL THREE STAY ON SUBJECT, because recognition is the constraint, not a
   licence to leave the topic: each one is A THING SOMEBODY BUILT, and the whole
   reel asks one question about it — DOES IT HOLD?
   ========================================================================= */

/** ⭐ A CAR, side on. Nine features a viewer identifies a car BY, all drawn:
    body · cabin with two windows · bonnet slope · boot · two wheels with hubs and
    tyres · headlight · bumper · door shut-line · wing mirror. Parts detach. */
export const Car: React.FC<{
  x: number; y: number; f: number; w?: number; z?: number;
  /** part i falls off at this frame: 0 wheelF · 1 wheelR · 2 bumper · 3 bonnet · 4 door */
  off?: Record<number, number>;
  lit?: number; sag?: number; hit?: number; tint?: string;
  /** ⭐ 0..1 — how far the press has taken it. Drives the ONE thing a viewer
      reads as "it is losing": the roof comes down, the tyres bulge out under it,
      the glass crazes and the wheels splay. A progressive state the whole shot
      counts toward is what [[feedback_a_wobble_is_not_a_clock]] means by a
      visible countdown; parts falling off at unrelated frames is a texture. */
  crush?: number;
}> = ({ x, y, f, w: ww = 460, z = 60, off = {}, lit = 1, sag = 0, hit = 0, tint, crush = 0 }) => {
  const K = Math.max(0, Math.min(1, crush));
  const H = ww * 0.42 * (1 - K * 0.42), R = ww * 0.115;
  const C = tint || "#E4572E";
  const paint = lit > 0.5 ? C : lerpHex(C, "#6E5A50", 0.26);
  const gone = (i: number) => off[i] !== undefined && f >= off[i];
  const drop = (i: number, gx: number, gy: number, spin: number) => {
    const lf = f - (off[i] ?? 0);
    return { dx: gx * lf * lf * 0.9, dy: gy + lf * lf * 1.5, rot: spin * lf * 7 };
  };
  const ring = hit > 0 ? Math.sin(f * 2.1) * 5 * hit : 0;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - H - R, width: ww,
      height: H + R, zIndex: z, transform: `translate(${ring}px, ${sag * 0.5}px) rotate(${sag * 0.5}deg)`,
      transformOrigin: "50% 100%" }}>
      {/* WHEELS — the single most identifying feature, so they are drawn first
          and they are big enough to read at thumb distance */}
      {[0, 1].map(i => {
        const cx = i === 0 ? ww * 0.76 : ww * 0.24;
        const g = gone(i) ? drop(i, i === 0 ? 1.4 : -0.9, 0, i === 0 ? 1 : -1) : { dx: 0, dy: 0, rot: 0 };
        if (g.dy > 620) return null;
        const splay = K * (i === 0 ? 34 : -34);
        return (
          <div key={"wh" + i} style={{ position: "absolute", left: cx - R + g.dx + splay,
            top: H - R * 0.42 + g.dy, width: R * 2 * (1 + K * 0.16), height: R * 2 * (1 - K * 0.22),
            borderRadius: "50%",
            zIndex: 4, transform: `rotate(${g.rot}deg)`, background: "#1E2428",
            border: `${R * 0.16}px solid #11161A`, boxShadow: SH }}>
            <div style={{ position: "absolute", inset: R * 0.42, borderRadius: "50%",
              background: `radial-gradient(50% 50% at 42% 36%, #E8EDF0 0%, #9AA6AE 62%, #5E686E 100%)` }} />
            {[0, 60, 120].map(a => (
              <div key={a} style={{ position: "absolute", left: "50%", top: R * 0.5,
                width: 3, height: R, marginLeft: -1.5, background: "#7C868C",
                transformOrigin: `1.5px ${R * 0.5}px`, transform: `rotate(${a + g.rot}deg)` }} />
            ))}
          </div>
        );
      })}
      {/* BODY — a real car profile: bonnet slope up into a cabin, then a boot */}
      <div style={{ position: "absolute", left: 0, top: H * 0.44, width: ww, height: H * 0.56,
        zIndex: 3, borderRadius: `${ww * 0.05}px ${ww * 0.05}px ${ww * 0.03}px ${ww * 0.03}px`,
        background: `linear-gradient(174deg, ${mxh(paint, 0.34)} 0%, ${paint} 40%, ${dkh(paint, 0.4)} 100%)`,
        border: `3px solid ${dkh(paint, 0.5)}`, boxShadow: SH_D }} />
      {/* CABIN — the roofline is what makes it a car and not a box */}
      <div style={{ position: "absolute", left: ww * 0.26, top: H * 0.05, width: ww * 0.46,
        height: H * 0.46, zIndex: 2,
        clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(174deg, ${mxh(paint, 0.26)} 0%, ${paint} 70%)` }} />
      {/* the glass crazes as the roof comes down — one cause, several effects */}
      {K > 0.18 && [0, 1, 2].map(i => (
        <div key={"cr" + i} style={{ position: "absolute", left: ww * (0.30 + i * 0.09),
          top: H * 0.12, width: 3, height: H * 0.30 * Math.min(1, (K - 0.18) * 3),
          zIndex: 9, background: hexa("#F2FAFF", 0.85),
          transform: `rotate(${(i - 1) * 16}deg)` }} />
      ))}
      {[0.30, 0.52].map((k, i) => (
        <div key={"win" + i} style={{ position: "absolute", left: ww * k, top: H * 0.12,
          width: ww * 0.17, height: H * 0.30, zIndex: 5, borderRadius: 4,
          clipPath: i ? "polygon(0 0,100% 0,100% 100%,0 100%)" : "polygon(18% 0,100% 0,100% 100%,0 100%)",
          background: `linear-gradient(168deg, #BFE2F2 0%, #6FA8C8 74%, #3E7392 100%)` }} />
      ))}
      {/* HEADLIGHT + BUMPER + DOOR LINE + MIRROR */}
      <div style={{ position: "absolute", left: ww * 0.955, top: H * 0.56, width: ww * 0.045,
        height: H * 0.16, zIndex: 6, borderRadius: 3,
        background: lit > 0.5 ? "#FFF3C4" : "#5A5E58" }} />
      {(() => {
        const g = gone(2) ? drop(2, 1.1, 0, 1.4) : { dx: 0, dy: 0, rot: 0 };
        if (g.dy > 620) return null;
        return (
          <div style={{ position: "absolute", left: ww * 0.94 + g.dx, top: H * 0.74 + g.dy,
            width: ww * 0.10, height: H * 0.13, zIndex: 6, borderRadius: 3,
            transform: `rotate(${g.rot}deg)`, background: "#B9C3C9",
            border: `2px solid #7E888E` }} />
        );
      })()}
      {(() => {
        const g = gone(3) ? drop(3, -0.5, 0, -2.2) : null;
        const openK = g ? 1 : 0;
        if (g && g.dy > 620) return null;
        return (
          <div style={{ position: "absolute", left: ww * 0.70 + (g ? g.dx : 0),
            top: H * 0.44 + (g ? g.dy : 0), width: ww * 0.29, height: H * 0.16, zIndex: 7,
            borderRadius: 4, transformOrigin: "0% 100%",
            transform: `rotate(${g ? g.rot : 0}deg)`,
            background: `linear-gradient(174deg, ${mxh(paint, 0.4)} 0%, ${dkh(paint, 0.2)} 100%)`,
            border: `2px solid ${dkh(paint, 0.5)}` }} />
        );
      })()}
      <div style={{ position: "absolute", left: ww * 0.46, top: H * 0.46, width: 3,
        height: H * 0.5, zIndex: 8, background: hexa("#000", 0.32) }} />
      <div style={{ position: "absolute", left: ww * 0.235, top: H * 0.30, width: ww * 0.05,
        height: H * 0.07, zIndex: 8, borderRadius: 2, background: dkh(paint, 0.3) }} />
    </div>
  );
};

/** ⭐ A LADDER, leaning. Two stiles and N rungs — a silhouette nobody has to
    decode, and "does it hold your weight?" is the whole reel in one object. */
export const Ladder: React.FC<{ x: number; y: number; f: number; h?: number; z?: number;
  rungs?: number; snap?: Record<number, number>; lean?: number; tint?: string }> =
  ({ x, y, f, h: hh = 470, z = 60, rungs = 7, snap = {}, lean = -12, tint }) => {
  const wdt = hh * 0.30, C = tint || "#F2A93B";
  return (
    <div style={{ position: "absolute", left: x - wdt / 2, top: y - hh, width: wdt, height: hh,
      zIndex: z, transformOrigin: "50% 100%", transform: `rotate(${lean}deg)` }}>
      {[0, 1].map(i => (
        <div key={"st" + i} style={{ position: "absolute", left: i ? wdt - 20 : 0, top: 0,
          width: 20, height: hh, borderRadius: 4, boxShadow: SH,
          background: `linear-gradient(96deg, ${mxh(C, 0.32)} 0%, ${C} 46%, ${dkh(C, 0.42)} 100%)`,
          border: `3px solid ${dkh(C, 0.5)}` }} />
      ))}
      {Array.from({ length: rungs }, (_, i) => {
        const at = snap[i];
        const broke = at !== undefined && f >= at;
        const lf = broke ? f - at : 0;
        if (broke && lf * lf * 1.6 > 640) return null;
        return (
          <div key={"rg" + i} style={{ position: "absolute", left: 12,
            top: 26 + i * ((hh - 60) / (rungs - 1)) + (broke ? lf * lf * 1.6 : 0),
            width: wdt - 24, height: 15, borderRadius: 4,
            transform: `rotate(${broke ? lf * 9 : 0}deg)`,
            opacity: broke ? Math.max(0, 1 - lf / 22) : 1, boxShadow: SH,
            background: `linear-gradient(178deg, ${mxh(C, 0.28)} 0%, ${dkh(C, 0.3)} 100%)`,
            border: `2px solid ${dkh(C, 0.52)}` }} />
        );
      })}
    </div>
  );
};

/** ⭐ A BRIDGE — two piers, a deck and a truss. "Does it take the load?" is the
    literal question the reel asks, and a truck crossing it is the test. */
export const Bridge: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  /** deck section i drops out at this frame (0..3) */
  drop?: Record<number, number>; lit?: number; tint?: string }> =
  ({ x, y, f, w: ww = 620, z = 60, drop = {}, lit = 1, tint }) => {
  const C = tint || "#2FA8A0";
  const paint = lit > 0.5 ? C : lerpHex(C, "#4A5257", 0.48);
  const dw = ww / 4, th = 26;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - 210, width: ww, height: 210,
      zIndex: z }}>
      {[0.06, 0.94].map((k, i) => (
        <div key={"pr" + i} style={{ position: "absolute", left: ww * k - 22, top: 40,
          width: 44, height: 170, zIndex: 2, boxShadow: SH,
          background: `linear-gradient(96deg, #A9B2B8 0%, #616A70 100%)` }} />
      ))}
      {[0, 1, 2, 3].map(i => {
        const at = drop[i];
        const fell = at !== undefined && f >= at;
        const lf = fell ? f - at : 0;
        if (fell && lf * lf * 1.7 > 560) return null;
        return (
          <React.Fragment key={"dk" + i}>
            <div style={{ position: "absolute", left: i * dw, top: 116 + (fell ? lf * lf * 1.7 : 0),
              width: dw - 4, height: th, zIndex: 4, borderRadius: 3, boxShadow: SH,
              transform: `rotate(${fell ? lf * (i % 2 ? 5 : -5) : 0}deg)`,
              opacity: fell ? Math.max(0, 1 - lf / 20) : 1,
              background: `linear-gradient(178deg, ${mxh(paint, 0.3)} 0%, ${paint} 46%, ${dkh(paint, 0.4)} 100%)`,
              border: `3px solid ${dkh(paint, 0.5)}` }} />
            {/* the truss above each section — what makes it a BRIDGE and not a plank */}
            {!fell && [0, 1].map(j => (
              <div key={j} style={{ position: "absolute", left: i * dw + j * (dw / 2), top: 62,
                width: dw / 2 - 3, height: 54, zIndex: 3,
                borderTop: `6px solid ${dkh(paint, 0.24)}`,
                borderLeft: `5px solid ${dkh(paint, 0.3)}`,
                transform: `skewX(${j ? 12 : -12}deg)` }} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};


/** ⭐⭐⭐ THE PRESS — the approaching second thing.

    [[feedback_a_wobble_is_not_a_clock]]: anticipation needs a PREDICTABLE threat,
    a VISIBLE COUNTDOWN and a DENIED payoff, and *a state cannot be a clock —
    something has to be travelling toward the moment*. A car quietly shedding
    parts has none of the three: you cannot predict which part, there is nothing
    counting down, and nothing is withheld.
    ⛔ A hydraulic press descending on a ratchet has all three, and it is in frame
    on the FIRST frame, which is what makes the shot anticipatory rather than
    merely surprising: a big steel head, two guide rails, and a toothed bar whose
    teeth you can literally count off as it comes down.
    ⛔ AND THE TENSION GROWS INTO THE CUT — the head is still descending on the
    last frame. Letting it relax after the payoff tells the viewer the danger has
    passed while the hook is still playing. */
export const Press: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  /** 0..1 — how far down the head has come */
  k?: number; teeth?: number; lit?: number }> =
  ({ x, y, f, w: ww = 620, z = 70, k = 0, teeth = 8, lit = 1 }) => {
  const K = Math.max(0, Math.min(1, k));
  const TOP = y - 560, TRAVEL = 300;
  const headY = TOP + K * TRAVEL;
  return (<>
    {/* the two guide rails — they are what say "this can only go one way" */}
    {[-1, 1].map(sd => (
      <div key={"rl" + sd} style={{ position: "absolute", left: x + sd * (ww / 2 - 16) - 11,
        top: TOP - 40, width: 22, height: 620, zIndex: z - 2,
        background: `linear-gradient(96deg, #D6DEE3 0%, #939EA5 52%, #5A646B 100%)` }} />
    ))}
    {/* THE RATCHET BAR — the countdown, and it is countable */}
    <div style={{ position: "absolute", left: x + ww / 2 + 22, top: TOP - 30, width: 26,
      height: 600, zIndex: z - 1, background: "#2E363B" }} />
    {Array.from({ length: teeth }, (_, i) => {
      const ty = TOP - 20 + i * (TRAVEL / (teeth - 1));
      const passed = headY >= ty - 4;
      return (
        <div key={"th" + i} style={{ position: "absolute", left: x + ww / 2 + 24, top: ty,
          width: 22, height: 12, zIndex: z, clipPath: "polygon(0 0,100% 50%,0 100%)",
          background: passed ? "#FF5A3C" : "#8E9AA2" }} />
      );
    })}
    {/* THE HEAD — a heavy slab with two hydraulic rams into it */}
    {[0.3, 0.7].map((kx, i) => (
      <div key={"rm" + i} style={{ position: "absolute", left: x - ww / 2 + ww * kx - 17,
        top: TOP - 120, width: 34, height: headY - TOP + 120, zIndex: z,
        background: `linear-gradient(96deg, #F0F5F8 0%, #B8C4CB 46%, #78838A 100%)` }} />
    ))}
    <div style={{ position: "absolute", left: x - ww / 2, top: headY, width: ww, height: 78,
      zIndex: z + 1, borderRadius: 5, boxShadow: SH_D,
      background: `linear-gradient(178deg, #EDF3F6 0%, #AFBBC2 44%, #5E686E 100%)`,
      border: `4px solid #3A444B` }}>
      {[0.12, 0.5, 0.88].map((bx, i) => (
        <div key={i} style={{ position: "absolute", left: `${bx * 100}%`, top: 14, width: 20,
          height: 20, marginLeft: -10, borderRadius: "50%", background: "#5A646B",
          border: "3px solid #39424A" }} />
      ))}
      {/* the warning stripe on the face — a press is a thing you stay out from under */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14,
        background: "repeating-linear-gradient(115deg,#F2B33B 0 14px,#2A333A 14px 28px)" }} />
    </div>
  </>);
};

/** ⭐⭐⭐ THE STATUS LAMP — the claim, as an object.

    "Lying to your face" needs the LIE on screen, not just the failure. Every
    Claude Code user knows one image: the green all-clear. So the claim is a
    signal lamp on a post — a big lens, a hood, a bracket — lit hard green and
    throwing green onto the floor, and it is the thing the hero is standing next
    to vouching for. The whole hook is built on ONE fact: **it never goes red.**
    ⛔ It is a LAMP, not a tick or a badge, because a symbol is a shape and
    [[feedback_recognition_beats_craft_on_a_hook_object]] wants an object you can
    name from its silhouette. */
export const StatusLamp: React.FC<{ x: number; y: number; f: number; s?: number;
  z?: number; on?: number; flicker?: number }> = ({ x, y, f, s = 1, z = 70, on = 1, flicker = 0 }) => {
  const d = 128 * s;
  const jit = flicker > 0 ? (Math.sin(f * 2.7) > 0.2 ? 1 : 0.72) : 1;
  const lit = on * jit;
  const C = "#3FD07A";
  return (<>
    <div style={{ position: "absolute", left: x - 11 * s, top: y - 300 * s, width: 22 * s,
      height: 300 * s, zIndex: z - 2,
      background: `linear-gradient(96deg, #8E9AA2 0%, #4E585E 60%, #2E363B 100%)` }} />
    {/* the hood over the lens — what makes it a signal lamp and not a circle */}
    <div style={{ position: "absolute", left: x - d * 0.62, top: y - 300 * s - d * 0.72,
      width: d * 1.24, height: d * 0.46, zIndex: z + 2, borderRadius: `${d * 0.5}px ${d * 0.5}px 0 0`,
      background: `linear-gradient(178deg, #6E787E 0%, #39424A 100%)` }} />
    <div style={{ position: "absolute", left: x - d / 2, top: y - 300 * s - d * 0.42,
      width: d, height: d, borderRadius: "50%", zIndex: z + 1,
      border: `${d * 0.09}px solid #39424A`, boxShadow: SH_D,
      background: lit > 0.4
        ? `radial-gradient(50% 50% at 40% 32%, #EBFFF2 0%, ${C} 46%, ${dkh(C, 0.5)} 100%)`
        : `radial-gradient(50% 50% at 40% 32%, #2A3430 0%, #131A17 100%)` }} />
    {lit > 0.4 && <Pool x={x} y={y - 300 * s + d * 0.7} w={d * 3.4} c={C} o={0.30 * lit} z={z - 3} />}
    {lit > 0.4 && <Pool x={x} y={y - 26} w={d * 3.0} c={C} o={0.26 * lit} z={z - 4} />}
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THREE OBJECTS FOR A BODY TO WORK AGAINST.

   ⛔⛔⛔ FIVE HOOKS WERE REJECTED BEFORE THESE, AND ALL FIVE HAD THE SAME
   DEFECT — the one [[feedback_a_hook_needs_a_body_not_a_mechanism]] already
   describes: *"an apparatus performing, with a Claude standing next to it. An
   apparatus has no intention, so there is nothing to anticipate."* A board
   shedding leaves, a tower collapsing, a car losing parts, a press descending,
   cars dropping off a bench — in every one the OBJECT did the work and the hero
   watched.
   ⭐ Reel 119 went **7.88 -> 15.63** on the fix, and it is not more motion: it is
   *"a character doing physical work against a load."* So these three exist only
   to be RESISTED. Each is drawn so that a body braced against it is the subject
   and the object is what he is losing to.
   ========================================================================= */

/** ⭐ A STEEL LOCKER whose door he is holding shut. The gap is the countdown:
    every slam opens it wider and you can see more of what is inside. */
export const Locker: React.FC<{ x: number; y: number; f: number; w?: number; h?: number;
  z?: number; gap?: number; burst?: number }> =
  ({ x, y, f, w: ww = 340, h: hh = 470, z = 56, gap = 0, burst = -1 }) => {
  const open = Math.max(0, Math.min(1, gap));
  const blown = burst >= 0 && f >= burst;
  const bk = blown ? Math.min(1, (f - burst) / 26) : 0;
  const swing = blown ? 18 + bk * 96 : open * 16;
  return (<>
    <Contact x={x - ww / 2 - 16} y={y - 6} w={ww + 32} z={z - 1} o={0.46} />
    {/* the carcass, and the MESS inside it — visible through the gap */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, background: `linear-gradient(174deg, #7E8C95 0%, #46545C 66%, #26313A 100%)`,
      border: `5px solid #101619`, boxShadow: SH_D }}>
      {Array.from({ length: 9 }, (_, i) => {
        const c = BLOCKS[i % BLOCKS.length];
        const push = (open + bk * 2.2) * (18 + i * 9);
        return (
          <div key={"ms" + i} style={{ position: "absolute",
            left: 12 + (i % 3) * (ww / 3.2) + push * 0.5,
            top: 22 + Math.floor(i / 3) * (hh / 3.4) + Math.sin(f / 7 + i) * 3 * (open + 0.2),
            width: ww / 3.6, height: hh / 4.4, borderRadius: 4,
            background: `linear-gradient(172deg, ${mxh(c, 0.26)} 0%, ${c} 48%, ${dkh(c, 0.44)} 100%)`,
            border: `3px solid ${dkh(c, 0.52)}` }} />
        );
      })}
    </div>
    {/* THE DOOR — hinged on the far side, and it is what he is fighting */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z + 6, transformOrigin: "0% 50%",
      transform: `perspective(1100px) rotateY(${-swing}deg)`,
      background: `linear-gradient(96deg, #A9B7BF 0%, #6E7C85 54%, #3E4A52 100%)`,
      border: `5px solid #101619`, boxShadow: SH_D }}>
      {[0.24, 0.5, 0.76].map((k, i) => (
        <div key={"vt" + i} style={{ position: "absolute", left: 26, right: 26, top: hh * k,
          height: 12, borderRadius: 3, background: hexa("#0B1013", 0.7) }} />
      ))}
      <div style={{ position: "absolute", right: 22, top: hh * 0.46, width: 20, height: 74,
        borderRadius: 10, background: `linear-gradient(96deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
      {/* the green all-clear he is vouching with, screwed to the door */}
      <div style={{ position: "absolute", left: ww * 0.5 - 26, top: hh * 0.12, width: 52,
        height: 52, borderRadius: "50%", border: "5px solid #101619",
        background: `radial-gradient(50% 50% at 40% 32%, #EBFFF2 0%, #3FD07A 46%, #1E6B41 100%)` }} />
    </div>
  </>);
};

/** ⭐ THE LOAD he is holding up — courses that keep landing on top of him. */
export const Load: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  lands?: number[]; drop?: number }> =
  ({ x, y, f, w: ww = 420, z = 66, lands = [], drop = -1 }) => {
  const fell = drop >= 0 && f >= drop;
  const fk = fell ? Math.min(1, (f - drop) / 44) : 0;
  return (<>
    {lands.map((at, i) => {
      if (f < at - 12) return null;
      const dz = E(f, at - 12, at, -420, 0, IN_Q);
      const set = f >= at ? settle(f - at, 0, 8, 11, 2.3) : 0;
      const c = BLOCKS[i % BLOCKS.length];
      const cw = ww * (1 - i * 0.06);
      return (
        <div key={"ld" + i} style={{ position: "absolute", left: x - cw / 2,
          top: y - (i + 1) * 62 + dz + set + fk * fk * 620,
          width: cw, height: 56, borderRadius: 6, zIndex: z + i, boxShadow: SH,
          transform: `translateX(${fell ? fk * fk * (i % 2 ? 470 : -470) : 0}px) rotate(${fell ? fk * (i % 2 ? 82 : -82) : 0}deg)`,
          background: `linear-gradient(172deg, ${mxh(c, 0.3)} 0%, ${c} 46%, ${dkh(c, 0.42)} 100%)`,
          border: `3px solid ${dkh(c, 0.5)}` }}>
          <div style={{ position: "absolute", left: 58, right: 20, top: 22, height: 8,
            borderRadius: 4, background: mxh(c, 0.72) }} />
          <div style={{ position: "absolute", left: 16, top: 14, width: 30, height: 30,
            borderRadius: "50%", border: "4px solid #17211E",
            background: `radial-gradient(50% 50% at 40% 32%, #EBFFF2 0%, #3FD07A 46%, #1E6B41 100%)` }} />
        </div>
      );
    })}
  </>);
};

/** ⭐ A PRESSURE TANK he is plugging. Every split is a jet, and the jets are big
    and bright so the frame is full of travelling water rather than of a prop. */
export const Tank: React.FC<{ x: number; y: number; f: number; w?: number; h?: number;
  z?: number; splits?: Array<[number, number, number]>; blow?: number }> =
  ({ x, y, f, w: ww = 360, h: hh = 400, z = 56, splits = [], blow = -1 }) => {
  const blown = blow >= 0 && f >= blow;
  return (<>
    <Contact x={x - ww / 2 - 14} y={y - 6} w={ww + 28} z={z - 1} o={0.46} />
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, borderRadius: `${ww * 0.16}px ${ww * 0.16}px 12px 12px`,
      background: `linear-gradient(96deg, #7FD0D8 0%, #2FA8A0 42%, #125A58 100%)`,
      border: `5px solid #0C3E3D`, boxShadow: SH_D }}>
      {[0.26, 0.62].map((k, i) => (
        <div key={"bd" + i} style={{ position: "absolute", left: -6, right: -6, top: hh * k,
          height: 18, background: `linear-gradient(180deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: ww * 0.5 - 30, top: -34, width: 60, height: 40,
        borderRadius: 6, background: `linear-gradient(96deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
      {/* the gauge, pegged, and it is the countdown */}
      <div style={{ position: "absolute", left: ww * 0.5 - 34, top: hh * 0.12, width: 68,
        height: 68, borderRadius: "50%", border: "5px solid #0C3E3D",
        background: `radial-gradient(50% 50% at 42% 34%, #F7F1DC 0%, #D3C9AC 100%)` }}>
        <div style={{ position: "absolute", left: "50%", top: 8, width: 4, height: 24,
          marginLeft: -2, background: "#C4331C", transformOrigin: "2px 22px",
          transform: `rotate(${-70 + Math.min(140, splits.length * 34 + (blown ? 60 : 0))}deg)` }} />
      </div>
    </div>
    {/* THE JETS — large, bright and travelling, one per split still open */}
    {splits.map(([sx, sy, at], i) => {
      if (f < at) return null;
      const lf = f - at;
      const plugged = !blown && lf > 8;
      const len = plugged ? 26 : Math.min(300, 40 + lf * 26);
      const dir = i % 2 ? 1 : -1;
      return (
        <React.Fragment key={"jt" + i}>
          <div style={{ position: "absolute", left: x + sx, top: y - hh + sy,
            width: len, height: 20 + (plugged ? 0 : 12), zIndex: z + 4, borderRadius: 10,
            transformOrigin: "0% 50%", transform: `scaleX(${dir}) rotate(${-14 + i * 9}deg)`,
            background: `linear-gradient(90deg, ${hexa("#EAFBFF", 0.95)} 0%, ${hexa("#8FE0F0", 0.5)} 60%, ${hexa("#8FE0F0", 0)} 100%)` }} />
          {!plugged && Array.from({ length: 4 }, (_, j) => {
            const t = ((lf * 0.09 + j / 4) % 1);
            return (
              <div key={j} style={{ position: "absolute",
                left: x + sx + dir * (40 + t * 260), top: y - hh + sy + t * t * 150,
                width: 22, height: 22, borderRadius: "50%", zIndex: z + 5,
                opacity: 0.8 * (1 - t), background: hexa("#DFF6FF", 0.9) }} />
            );
          })}
        </React.Fragment>
      );
    })}
  </>);
};

/** ⭐⭐⭐ A SHIPPED UNIT — one of five recognisable devices, each with the green
    sign-off lamp still lit on it.

    ⛔ The load was five flat coloured BARS, which is the "shapes, not objects"
    note one layer down: the hero was right and what he was holding was not. The
    VO names what he ships — *"entire apps, websites, and tools"* — so the load is
    a phone, a monitor, a laptop, a toolbox and a router: things a stranger can
    name from the silhouette, stacked on one Claude, every one of them still
    showing the all-clear he gave it. What is crushing him is his own sign-offs.
    ⭐ AND THE LAMPS FLICKER UNDER STRAIN — the claims themselves wavering while
    he insists they are fine. */
export const Unit: React.FC<{ kind: number; x: number; y: number; w?: number; z?: number;
  lamp?: number; f?: number }> = ({ kind, x, y, w: ww = 300, z = 66, lamp = 1, f = 0 }) => {
  const k = kind % 5;
  const c = BLOCKS[k];
  const hh = ww * 0.30;
  const lit = lamp > 0.5 && (lamp >= 1 || Math.sin(f * 1.9 + k) > -0.25);
  const Lamp = (
    <div style={{ position: "absolute", left: 14, top: hh * 0.5 - 15, width: 30, height: 30,
      borderRadius: "50%", zIndex: 6, border: "4px solid #17211E",
      background: lit
        ? `radial-gradient(50% 50% at 40% 32%, #EBFFF2 0%, #3FD07A 46%, #1E6B41 100%)`
        : `radial-gradient(50% 50% at 40% 32%, #2A3430 0%, #131A17 100%)` }} />
  );
  const body: React.CSSProperties = {
    position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
    zIndex: z, borderRadius: 7, boxShadow: SH,
    background: `linear-gradient(172deg, ${mxh(c, 0.32)} 0%, ${c} 44%, ${dkh(c, 0.4)} 100%)`,
    border: `3px solid ${dkh(c, 0.5)}`,
  };
  /* ⭐ THE MAKER'S MARK — on the unit, beside its own all-clear */
  const Badge = <Mark x={ww * 0.5 - hh * 0.30} y={hh * 0.5 - hh * 0.30} s={hh * 0.46} z={7} />;
  if (k === 0) return (   /* A MONITOR — screen, bezel, stand */
    <div style={body}>{Lamp}{Badge}
      <div style={{ position: "absolute", left: 60, top: 12, right: 22, bottom: 24, borderRadius: 4,
        background: `linear-gradient(168deg, #BFE2F2 0%, #6FA8C8 74%, #2E5E7C 100%)` }} />
      <div style={{ position: "absolute", left: ww * 0.5 - 34, bottom: -14, width: 68, height: 16,
        borderRadius: 4, background: dkh(c, 0.5) }} />
    </div>
  );
  if (k === 1) return (   /* A PHONE — tall rounded slab, notch, home bar */
    <div style={{ ...body, borderRadius: 16 }}>{Lamp}{Badge}
      <div style={{ position: "absolute", left: 62, top: 10, right: 18, bottom: 18, borderRadius: 10,
        background: `linear-gradient(168deg, #2B3440 0%, #151C25 100%)` }} />
      <div style={{ position: "absolute", left: ww * 0.56, top: 14, width: 44, height: 9,
        borderRadius: 5, background: "#0B1016" }} />
      <div style={{ position: "absolute", right: 26, top: hh * 0.44, width: 8, height: hh * 0.3,
        borderRadius: 4, background: hexa("#8FA6BC", 0.7) }} />
    </div>
  );
  if (k === 2) return (   /* A LAPTOP — a lid at an angle over a base */
    <div style={body}>{Lamp}{Badge}
      <div style={{ position: "absolute", left: 58, top: -hh * 0.52, width: ww * 0.62, height: hh * 0.62,
        borderRadius: 5, transformOrigin: "0% 100%", transform: "rotate(-9deg)",
        background: `linear-gradient(168deg, ${dkh(c, 0.2)} 0%, ${dkh(c, 0.46)} 100%)`,
        border: `3px solid ${dkh(c, 0.55)}` }}>
        <div style={{ position: "absolute", inset: 7, borderRadius: 3,
          background: `linear-gradient(168deg, #BFE2F2 0%, #5E93B4 100%)` }} />
      </div>
      <div style={{ position: "absolute", left: 62, top: hh * 0.42, right: 24, height: 10,
        borderRadius: 3, background: hexa("#12181E", 0.5) }} />
    </div>
  );
  if (k === 3) return (   /* A TOOLBOX — handle over a lid, two latches */
    <div style={body}>{Lamp}{Badge}
      <div style={{ position: "absolute", left: ww * 0.46, top: -hh * 0.36, width: ww * 0.26,
        height: hh * 0.38, borderTopLeftRadius: 20, borderTopRightRadius: 20,
        border: `8px solid ${dkh(c, 0.5)}`, borderBottom: "none" }} />
      <div style={{ position: "absolute", left: 56, right: 20, top: hh * 0.5, height: 7,
        background: hexa("#000", 0.34) }} />
      {[0.34, 0.78].map((q, i) => (
        <div key={i} style={{ position: "absolute", left: ww * q, top: hh * 0.36, width: 26,
          height: 26, borderRadius: 4, background: BRSL, border: `3px solid ${BRSD}` }} />
      ))}
    </div>
  );
  return (               /* A ROUTER — a slab with two aerials and port lights */
    <div style={body}>{Lamp}{Badge}
      {[0.44, 0.72].map((q, i) => (
        <div key={i} style={{ position: "absolute", left: ww * q, top: -hh * 0.5, width: 9,
          height: hh * 0.54, borderRadius: 5, background: dkh(c, 0.5),
          transformOrigin: "50% 100%", transform: `rotate(${i ? 16 : -12}deg)` }} />
      ))}
      {[0, 1, 2, 3].map(i => (
        <div key={"pl" + i} style={{ position: "absolute", left: 66 + i * 34, bottom: 12, width: 20,
          height: 10, borderRadius: 3, background: i < 3 ? "#3FD07A" : hexa("#0B1016", 0.6) }} />
      ))}
    </div>
  );
};

/** ⭐⭐⭐ A STACK OF SHIPPED UNITS — the reel's hero artifact, in the hook's own
    vocabulary.

    ⛔ It replaces `Tower` (six coloured blocks) everywhere, because the blocks
    were the "shapes, not objects" note and the hook now says what the work IS: a
    toolbox, a monitor, a laptop, a phone and a router, each with the Claude mark
    on it and each still showing the green all-clear it was signed off with.
    The same switch carries the whole reel:
      hook  5 units on ONE Claude, and they come down on him
      S1    the crew takes them off him — but ONE stays
      S10   the prosecutor PULLS UNITS OUT from under the stack
      S11   the defense rams them back and takes the weight
      S13   ⭐ he stands up straight under the full load and it HOLDS
    Tower's API is kept so the scene code did not have to be rewritten around it. */
export const UnitStack: React.FC<{
  x: number; y: number; f: number; w?: number; z?: number;
  blocks?: number[]; out?: Record<number, number>; seat?: Record<number, number>;
  lit?: number; lean?: number; fall?: number; hit?: number;
  spikes?: Array<[number, number]>;
}> = ({ x, y, f, w: ww = 330, z = 60, blocks = [0, 1, 2, 3, 4], out = {}, seat = {},
        lit = 1, lean = 0, fall = -1, hit = 0, spikes = [] }) => {
  const KINDS = [3, 0, 2, 1, 4];
  const pitch = ww * 0.20;
  const fallen = fall >= 0 && f >= fall;
  const fk = fallen ? Math.min(1, (f - fall) / 44) : 0;
  const ring = hit > 0 ? Math.sin(f * 2.0) * 6 * hit : 0;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transformOrigin: `${x}px ${y}px`,
      transform: `rotate(${lean}deg) translateX(${ring}px)` }}>
      {KINDS.map((kind, i) => {
        const isOut = out[i] !== undefined && f >= out[i];
        const seatAt = seat[i];
        const seating = seatAt !== undefined;
        if (seating && f < seatAt - 14) return null;
        if (!blocks.includes(i) && !seating) return null;
        let dx = 0, dy = 0, rot = 0, op = 1;
        if (out[i] !== undefined && f >= out[i] - 7 && f < out[i]) {
          const k = E(f, out[i] - 7, out[i], 0, 1, IN_Q);
          const sd = i % 2 ? 1 : -1;
          rot = sd * k * 13; dx = sd * k * 24; dy = k * 5;
        }
        if (isOut) {
          const lf = f - out[i];
          const sd = i % 2 ? 1 : -1;
          dx = sd * (24 + lf * lf * 2.0); dy = lf * lf * 0.8; rot = sd * (13 + lf * 8);
          op = Math.max(0, 1 - Math.abs(dx) / 880);
          if (Math.abs(dx) > 920) return null;
        } else if (fallen && i >= 1) {
          const sd = i % 2 ? 1 : -1;
          dx = sd * fk * fk * 560; dy = fk * fk * 620; rot = sd * fk * 84;
          op = Math.max(0, 1 - fk * 0.8);
        }
        const k = seating ? E(f, seatAt - 14, seatAt, 0, 1, IN_Q) : 1;
        const over = seating ? settle(f, seatAt, 8, 12, 2.5) : 0;
        const inY = seating ? (1 - k) * -360 : 0;
        return (
          <div key={"us" + i} style={{ position: "absolute", inset: 0, opacity: (seating ? k : 1) * op,
            transform: `translate(${dx}px, ${inY + dy}px) rotate(${rot}deg)`,
            transformOrigin: `${x}px ${y - i * pitch}px` }}>
            <Unit kind={kind} x={x} y={y - i * pitch + over} w={ww - i * 18} z={z + i}
              lamp={lit} f={f} />
          </div>
        );
      })}
      {spikes.map(([course, at], i) => {
        if (f < at) return null;
        const lf = f - at;
        const drive = E(lf, 0, 5, -170, 0, IN_Q) + settle(lf, 5, 7, 10, 2.2);
        return (
          <div key={"sp" + i} style={{ position: "absolute", left: x - 7 + (i - 1) * 52,
            top: y - course * pitch - 96 + drive, width: 14, height: 92, zIndex: z + 9,
            background: `linear-gradient(180deg, ${mxh(RED, 0.2)} 0%, ${dkh(RED, 0.45)} 100%)` }}>
            <div style={{ position: "absolute", left: -9, top: -14, width: 34, height: 24,
              borderRadius: 3, background: RED }} />
          </div>
        );
      })}
    </div>
  );
};
