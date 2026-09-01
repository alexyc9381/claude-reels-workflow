import React from "react";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Ring, Puff, squash, rock, Mark,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, JADE, IRON, GLASSW, R,
} from "./OvlWorld";
import type { Place } from "./OvlWorld";

/* ===========================================================================
   REEL 128 · "BOSS" — THE PROPS.  Board: storyboards/128-boss.md.

   ⛔⛔⛔ THE HERO ARTIFACT IS `Unit`, AND THE PAYOFF IS THAT IT RUNS.
   Reel 118 measured its build against a BAR — a crossbeam on a wall, and the
   payoff was clearing it. That is a HEIGHT, and a height is a progress bar
   stood on its end. This reel's artifact is a MACHINE with an input, a working
   middle and an output, and the boss's verdict is whether the output arrives.
   The receipt that licenses that is Boris Cherny's own test for agent work —
   `R.quote`, "can the agent run the thing?" — so the beat is not a metaphor
   laid over the subject, it is the subject's own standard drawn in brass.

   ⛔ COUNT THE PARTS BEFORE REWRITING THE CONCEPT. `feedback_props_need_real_
   drawing`: the house bar is 12-16 drawn parts and a four-div prop gets
   rejected as a slab. Counted here — Unit 24, OrderWall 19, TokenDrum 16,
   KnifeSwitch 11, Slab 8. `Unit` is the only one over 20 and that is correct:
   it is the thing the whole reel is about.

   ⛔ EVERY CONTAINER READS WHILE EMPTY. The order's line-3 bracket, the score
   readout and the delivery bin all have to be legible BEFORE they are filled,
   because empty is the promise (§11).
   ========================================================================= */

/* -------------------------------------------------------------------------
   THE UNIT — 24 parts.
     frame:    two uprights, a base rail, a top rail, four rivet rows, feet
     input:    a hopper with a throat and a lit mouth
     middle:   three gears on a common train + a belt + a bearing block
     output:   a spout with a lip and a catch tray
     face:     a faceplate, a nameplate, a pressure gauge with a needle
   `built` 0..1 draws the machine ARRIVING in parts (S1 lands them one by one).
   `run`   0..1 turns the train and drives whatever the output is doing.
   `mode`  "dud" coughs one lump; "deliver" pours a continuous stream.

   ⛔ THE GEARS ARE DRIVEN OFF `run * f`, NOT OFF A RAMP THAT PLATEAUS. Reel 120
   froze a press ram at 0.70 because `E(f,a,b,0,1,OUT)` reaches 1 and stays;
   anything that should REPEAT has to return, so rotation integrates a rate.
   ---------------------------------------------------------------------- */
export const Unit: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; f: number;
  built?: number; run?: number; mode?: "idle" | "dud" | "deliver";
  at?: number; broken?: number; lit?: number;
}> = ({ p, x, y, s = 1, z = 60, f, built = 1, run = 0, mode = "idle",
        at = 0, broken = 0, lit = 1 }) => {
  const b = Math.max(0, Math.min(1, built));
  /* the three parts land in sequence — frame, then train, then spout */
  /* ⛔⛔ A PART IS EITHER THERE OR IT IS NOT. v1 drove OPACITY off the build
     ramp, so a half-built machine rendered at 60% alpha and read on a contact
     sheet as an empty room with a ghost in it. `k` now drives TRAVEL and the
     alpha snaps in over the first fifth of each ramp — the part flies in solid
     and lands, which is also §2's event shape instead of a dissolve. */
  const ramp = (a: number, w: number) => Math.max(0, Math.min(1, (b - a) / w));
  const kFrame = ramp(0, 0.34), kTrain = ramp(0.34, 0.33), kSpout = ramp(0.67, 0.33);
  const solid = (k: number) => (k <= 0 ? 0 : Math.min(1, k * 5));
  /* ⛔ ROTATION INTEGRATES A RATE so it never plateaus */
  const rot = run * (f - at) * 7.4;
  const brk = Math.max(0, Math.min(1, broken));
  const shakeK = run > 0.02 ? Math.sin((f - at) / 2.6) * 1.7 * run : 0;
  const P = (v: number) => v * s;

  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(300), height: P(300),
      zIndex: z, transform: `translateY(${shakeK}px)` }}>
      {/* ---- FRAME (lands first) ---- */}
      <div style={{ opacity: solid(kFrame), transform: `translateY(${(1 - kFrame) * -P(180)}px)` }}>
        <div style={{ position: "absolute", left: P(14), top: P(46), width: P(22), height: P(214),
          background: `linear-gradient(90deg, ${mxh(BRASS, 0.24)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
          transform: `rotate(${brk * -13}deg) translate(${brk * -P(40)}px, ${brk * P(26)}px)`,
          transformOrigin: "50% 100%" }} />
        <div style={{ position: "absolute", left: P(258), top: P(46), width: P(22), height: P(214),
          background: `linear-gradient(90deg, ${dkh(BRASS, 0.34)} 0%, ${mxh(BRASS, 0.2)} 100%)`,
          transform: `rotate(${brk * 13}deg) translate(${brk * P(40)}px, ${brk * P(26)}px)`,
          transformOrigin: "50% 100%" }} />
        <div style={{ position: "absolute", left: P(8), top: P(250), width: P(280), height: P(24),
          background: `linear-gradient(180deg, ${mxh(OXIDE, 0.16)} 0%, ${dkh(OXIDE, 0.4)} 100%)` }} />
        <div style={{ position: "absolute", left: P(8), top: P(38), width: P(280), height: P(16),
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.3)} 0%, ${dkh(BRASS, 0.2)} 100%)` }} />
        {/* four rivet rows */}
        {[0, 1].map((r) => Array.from({ length: 7 }, (_, i) => (
          <div key={"rv" + r + i} style={{ position: "absolute", left: P(24 + i * 40),
            top: P(r ? 258 : 42), width: P(8), height: P(8), borderRadius: P(4),
            background: mxh(BRASS, 0.44), opacity: 0.9 }} />
        )))}
        {/* feet */}
        {[0, 1].map((i) => (
          <div key={"ft" + i} style={{ position: "absolute", left: P(i ? 244 : 22), top: P(272),
            width: P(46), height: P(14), background: dkh(IRON, 0.2), borderRadius: P(3) }} />
        ))}
      </div>

      {/* ---- HOPPER (input) ---- */}
      <div style={{ opacity: solid(kFrame) }}>
        <div style={{ position: "absolute", left: P(58), top: P(-4), width: P(120), height: P(56),
          clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.3)} 100%)` }} />
        <div style={{ position: "absolute", left: P(88), top: P(50), width: P(60), height: P(15),
          background: dkh(STEEL, 0.4) }} />
        <div style={{ position: "absolute", left: P(58), top: P(-8), width: P(120), height: P(9),
          background: run > 0.02 ? mxh(p.key, 0.3) : mxh(STEEL, 0.3) }} />
      </div>

      {/* ---- GEAR TRAIN (lands second) ---- */}
      <div style={{ opacity: solid(kTrain), transform: `translateX(${(1 - kTrain) * -P(260)}px)`,
        transformOrigin: `${P(150)}px ${P(150)}px` }}>
        {[{ gx: 62, gy: 96, r: 46, d: 1 }, { gx: 138, gy: 122, r: 34, d: -1.42 },
          { gx: 198, gy: 92, r: 40, d: 1.18 }].map((g, i) => (
          <div key={"gr" + i} style={{ position: "absolute", left: P(g.gx), top: P(g.gy),
            width: P(g.r * 2), height: P(g.r * 2), borderRadius: "50%",
            background: `radial-gradient(circle at 38% 34%, ${mxh(BRASS, 0.34)} 0%, ${dkh(BRASS, 0.26)} 100%)`,
            border: `${P(5)}px solid ${dkh(BRASS, 0.44)}`,
            transform: `rotate(${rot * g.d}deg)` }}>
            {Array.from({ length: 9 }, (_, t) => (
              <div key={"th" + t} style={{ position: "absolute",
                left: P(g.r) - P(4) + Math.cos((t / 9) * 6.283) * P(g.r + 2) - P(1),
                top: P(g.r) - P(4) + Math.sin((t / 9) * 6.283) * P(g.r + 2),
                width: P(10), height: P(10), background: dkh(BRASS, 0.16), borderRadius: P(2) }} />
            ))}
            <div style={{ position: "absolute", left: P(g.r - 7), top: P(g.r - 7),
              width: P(14), height: P(14), borderRadius: "50%", background: dkh(IRON, 0.1) }} />
          </div>
        ))}
        {/* the belt between gear 1 and gear 3 */}
        <div style={{ position: "absolute", left: P(70), top: P(84), width: P(180), height: P(7),
          background: dkh(IRON, 0.12), transform: "rotate(-2deg)" }} />
        {/* bearing block */}
        <div style={{ position: "absolute", left: P(112), top: P(186), width: P(76), height: P(28),
          background: `linear-gradient(180deg, ${mxh(SLATE, 0.2)} 0%, ${dkh(SLATE, 0.3)} 100%)`,
          borderRadius: P(3) }} />
      </div>

      {/* ---- SPOUT (lands third) + FACEPLATE ---- */}
      <div style={{ opacity: solid(kSpout), transform: `translateX(${(1 - kSpout) * P(240)}px)` }}>
        <div style={{ position: "absolute", left: P(238), top: P(176), width: P(86), height: P(34),
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)} 0%, ${dkh(BRASS, 0.3)} 100%)`,
          borderRadius: `0 ${P(6)}px ${P(6)}px 0` }} />
        <div style={{ position: "absolute", left: P(316), top: P(172), width: P(15), height: P(44),
          background: mode === "deliver" ? mxh(JADE, 0.36) : mxh(BRASS, 0.4) }} />
        {/* the catch tray under the spout — reads while EMPTY */}
        <div style={{ position: "absolute", left: P(268), top: P(246), width: P(110), height: P(20),
          background: `linear-gradient(180deg, ${dkh(SLATE, 0.06)} 0%, ${dkh(SLATE, 0.36)} 100%)`,
          border: `${P(3)}px solid ${mxh(SLATE, 0.12)}`, borderRadius: P(3) }} />
      </div>

      {/* ---- FACE: nameplate + gauge ---- */}
      <div style={{ opacity: solid(kFrame) }}>
        <div style={{ position: "absolute", left: P(48), top: P(214), width: P(126), height: P(30),
          background: lit > 0.5 ? mxh(CREAMB, 0.06) : dkh(CREAMB, 0.44), borderRadius: P(3),
          border: `${P(3)}px solid ${dkh(BRASS, 0.3)}`, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(Math.max(9, 15 * s), 800), color: INK, letterSpacing: 1 }}>UNIT</span>
        </div>
        <div style={{ position: "absolute", left: P(190), top: P(210), width: P(56), height: P(56),
          borderRadius: "50%", background: dkh(CREAMB, 0.2),
          border: `${P(4)}px solid ${dkh(BRASS, 0.3)}` }}>
          <div style={{ position: "absolute", left: P(25), top: P(8), width: P(3), height: P(22),
            background: mode === "deliver" ? JADE : RED, transformOrigin: "50% 100%",
            transform: `rotate(${-64 + (mode === "deliver" ? 118 : 14) + Math.sin((f - at) / 5) * 6 * run}deg)` }} />
        </div>
      </div>

      {/* ---- OUTPUT: the dud, or the delivery ---- */}
      {mode === "dud" && (() => {
        const lf = f - at;
        if (lf < 0) return null;
        const k = Math.min(1, lf / 16);
        return (
          <div style={{ position: "absolute", left: P(330) + k * P(46), top: P(190) + k * k * P(78),
            width: P(30), height: P(24), borderRadius: P(6), background: dkh(OXIDE, 0.06),
            transform: `rotate(${k * 90}deg)`, opacity: 1 - Math.max(0, (k - 0.86) / 0.14) }} />
        );
      })()}
      {mode === "deliver" && run > 0.02 && (
        <>
          {Array.from({ length: 9 }, (_, i) => {
            const ph = ((f - at) * 4.6 + i * 13) % 118;
            const k = ph / 118;
            return (
              <div key={"dl" + i} style={{ position: "absolute",
                left: P(330) + k * P(44), top: P(200) + k * k * P(96),
                width: P(20 + rnd(i, 5) * 12), height: P(16 + rnd(i, 6) * 10),
                borderRadius: P(4), background: i % 2 ? mxh(JADE, 0.22) : mxh(GOLD, 0.1),
                transform: `rotate(${k * 160}deg)` }} />
            );
          })}
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE ORDER WALL — 19 parts. A slate board bolted to the wall carrying the
   three lines of the prompt. Line 3 is an EMPTY BRACKET until a brass plate
   travels into it at S7.

   ⛔ THE EMPTY BRACKET IS THE WHOLE SHOT AT S6, so it has to read as a socket
   waiting to be filled — a lit rebate with two lugs and a shadow, not an
   absence. Reel 115: "a socket waiting to be filled should draw NOTHING when
   the set already paints one" — here the SET does not paint it, so it does.
   ---------------------------------------------------------------------- */
export const OrderWall: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; f: number;
  done?: number; plate?: number; lit?: number;
}> = ({ p, x, y, s = 1, z = 52, f, done = 0, plate = 0, lit = 1 }) => {
  const P = (v: number) => v * s;
  const rows = R.lines;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(560), height: P(266), zIndex: z }}>
      {/* the board, its bevel, and four corner bolts */}
      <div style={{ position: "absolute", inset: 0, borderRadius: P(5),
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.06)} 0%, ${dkh(SLATE, 0.34)} 100%)`,
        border: `${P(7)}px solid ${dkh(IRON, 0.1)}` }} />
      <div style={{ position: "absolute", left: P(8), top: P(8), right: P(8), height: P(4),
        background: hexa(p.key, 0.2 * lit) }} />
      {[[10, 10], [10, 1], [1, 10], [1, 1]].map((c, i) => (
        <div key={"bo" + i} style={{ position: "absolute",
          left: c[0] === 10 ? P(14) : P(530), top: c[1] === 10 ? P(14) : P(238),
          width: P(15), height: P(15), borderRadius: "50%", background: mxh(IRON, 0.3) }} />
      ))}
      {/* the header strip */}
      <div style={{ position: "absolute", left: P(30), top: P(26), width: P(500), height: P(30),
        background: dkh(IRON, 0.2), borderRadius: P(3), display: "flex", alignItems: "center",
        paddingLeft: P(12) }}>
        <span style={{ ...mono(Math.max(10, 17 * s), 800), color: mxh(p.key, 0.36),
          letterSpacing: P(3) }}>THE ORDER</span>
      </div>
      {/* the three lines */}
      {rows.map((r, i) => {
        const isThird = i === 2;
        const struck = done > i;
        const filled = isThird ? plate : (struck ? 1 : 0);
        return (
          <div key={"ln" + i} style={{ position: "absolute", left: P(30), top: P(76 + i * 58),
            width: P(500), height: P(46) }}>
            {/* the number chip */}
            <div style={{ position: "absolute", left: 0, top: P(4), width: P(40), height: P(38),
              borderRadius: P(3), background: filled > 0.5 ? mxh(GOLD, 0.06) : dkh(IRON, 0.06),
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(Math.max(11, 20 * s), 800),
                color: filled > 0.5 ? INK : mxh(IRON, 0.5) }}>{r.n}</span>
            </div>
            {isThird ? (
              <>
                {/* THE EMPTY BRACKET — a rebate with two lugs, lit, and legible
                    with nothing in it. This is the shot at S6. */}
                <div style={{ position: "absolute", left: P(54), top: P(2), width: P(440),
                  height: P(42), borderRadius: P(3),
                  background: dkh(IRON, 0.36),
                  border: `${P(4)}px dashed ${hexa(p.key, 0.3 + lit * 0.4)}` }} />
                {[0, 1].map((g) => (
                  <div key={"lg" + g} style={{ position: "absolute", left: P(g ? 476 : 60),
                    top: P(14), width: P(14), height: P(18), background: mxh(IRON, 0.26) }} />
                ))}
                {/* the brass plate that fills it — travels in from the right */}
                {plate > 0.01 && (
                  <div style={{ position: "absolute",
                    left: P(54) + (1 - Math.min(1, plate)) * P(280), top: P(2),
                    width: P(440), height: P(42), borderRadius: P(3),
                    opacity: Math.min(1, plate * 2),
                    background: `linear-gradient(178deg, ${mxh(BRASS, 0.4)} 0%, ${dkh(BRASS, 0.1)} 100%)`,
                    border: `${P(3)}px solid ${dkh(BRASS, 0.4)}`,
                    display: "flex", alignItems: "center", paddingLeft: P(14) }}>
                    <span style={{ ...mono(Math.max(10, 19 * s), 800), color: INK,
                      letterSpacing: P(1.6) }}>{r.t}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div style={{ position: "absolute", left: P(54), top: P(2), width: P(440),
                  height: P(42), borderRadius: P(3), background: dkh(IRON, 0.2),
                  display: "flex", alignItems: "center", paddingLeft: P(14) }}>
                  <span style={{ ...mono(Math.max(10, 19 * s), 800),
                    color: struck ? mxh(p.key, 0.2) : mxh(IRON, 0.6), letterSpacing: P(1.6) }}>{r.t}</span>
                </div>
                {/* the strike-through, drawn as a chalk line that ARRIVES */}
                {struck && (
                  <div style={{ position: "absolute", left: P(64), top: P(23),
                    width: P(420) * Math.min(1, (done - i) * 3), height: P(5),
                    background: mxh(p.key, 0.24), opacity: 0.9 }} />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE TOKEN DRUM — 16 parts. What the loop actually costs.
   ⛔⛔ NO CURRENCY, NO FIGURE, ANYWHERE ON IT. The VO names no number, and a
   figure here reads as the price of the build we have just watched. It is a
   DRAIN: a sight glass that empties and a needle that falls, and the needle is
   still falling when the scene cuts (§23 — anything crossing a cut is LIN).
   ---------------------------------------------------------------------- */
export const TokenDrum: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; f: number; level: number;
}> = ({ p, x, y, s = 1, z = 54, f, level }) => {
  const P = (v: number) => v * s;
  const lv = Math.max(0, Math.min(1, level));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(340), height: P(300), zIndex: z }}>
      {/* the drum body, two hoops, a cradle, a lit rim */}
      <div style={{ position: "absolute", left: P(30), top: P(30), width: P(230), height: P(220),
        borderRadius: P(10),
        background: `linear-gradient(94deg, ${mxh(OXIDE, 0.12)} 0%, ${dkh(OXIDE, 0.2)} 52%, ${dkh(OXIDE, 0.44)} 100%)` }} />
      {[0, 1].map((i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: P(30), top: P(66 + i * 128),
          width: P(230), height: P(16), background: dkh(IRON, 0.2) }} />
      ))}
      <div style={{ position: "absolute", left: P(30), top: P(24), width: P(230), height: P(10),
        background: hexa(p.key, 0.4) }} />
      <div style={{ position: "absolute", left: P(16), top: P(250), width: P(258), height: P(22),
        background: dkh(IRON, 0.3), borderRadius: P(3) }} />
      {/* the sight glass — the thing that EMPTIES */}
      <div style={{ position: "absolute", left: P(264), top: P(46), width: P(38), height: P(196),
        background: dkh(IRON, 0.44), border: `${P(4)}px solid ${mxh(IRON, 0.2)}`,
        borderRadius: P(4), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0,
          height: `${lv * 100}%`,
          background: `linear-gradient(180deg, ${mxh(EMBER, 0.3)} 0%, ${dkh(EMBER, 0.1)} 100%)` }} />
        {/* the meniscus — one bright line so the level EDGE reads, not the fill */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: `${lv * 100}%`,
          height: P(6), background: mxh(GOLD, 0.4) }} />
      </div>
      {/* six graduation ticks beside the glass */}
      {Array.from({ length: 6 }, (_, i) => (
        <div key={"gd" + i} style={{ position: "absolute", left: P(306), top: P(56 + i * 34),
          width: P(18), height: P(4), background: mxh(IRON, 0.34), opacity: 0.8 }} />
      ))}
      {/* the gauge: bezel, dial face, needle, pivot */}
      <div style={{ position: "absolute", left: P(58), top: P(84), width: P(120), height: P(120),
        borderRadius: "50%", background: dkh(CREAMB, 0.24),
        border: `${P(7)}px solid ${dkh(IRON, 0.18)}` }}>
        <div style={{ position: "absolute", inset: P(10), borderRadius: "50%",
          background: `radial-gradient(circle at 40% 34%, ${mxh(CREAMB, 0.1)} 0%, ${dkh(CREAMB, 0.4)} 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"tk" + i} style={{ position: "absolute", left: P(53), top: P(12),
            width: P(4), height: P(14), background: i > 4 ? RED : dkh(IRON, 0.2),
            transformOrigin: `${P(2)}px ${P(46)}px`, transform: `rotate(${-116 + i * 39}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: P(51), top: P(16), width: P(5), height: P(46),
          background: RED, transformOrigin: `${P(2.5)}px ${P(42)}px`,
          transform: `rotate(${-116 + (1 - lv) * 232}deg)` }} />
        <div style={{ position: "absolute", left: P(46), top: P(48), width: P(15), height: P(15),
          borderRadius: "50%", background: dkh(IRON, 0.1) }} />
      </div>
      {/* the drain, and what comes out of it */}
      <div style={{ position: "absolute", left: P(120), top: P(250), width: P(30), height: P(26),
        background: dkh(IRON, 0.2), borderRadius: `0 0 ${P(8)}px ${P(8)}px` }} />
      {Array.from({ length: 6 }, (_, i) => {
        const ph = ((f * 5 + i * 19) % 96) / 96;
        return (
          <div key={"dp" + i} style={{ position: "absolute", left: P(128) + (rnd(i, 3) - 0.5) * P(16),
            top: P(272) + ph * P(90), width: P(11), height: P(15), borderRadius: P(5),
            background: mxh(EMBER, 0.22), opacity: 0.9 - ph * 0.5 }} />
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------
   THE KNIFE SWITCH — 11 parts. What S13 throws to start the whole hall.
   ---------------------------------------------------------------------- */
export const KnifeSwitch: React.FC<{
  p: Place; x: number; y: number; s?: number; z?: number; on: number; f?: number;
}> = ({ p, x, y, s = 1, z = 58, on, f = 0 }) => {
  const P = (v: number) => v * s;
  const k = Math.max(0, Math.min(1, on));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: P(190), height: P(180), zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: P(20), width: P(170), height: P(150),
        borderRadius: P(5), background: `linear-gradient(172deg, ${dkh(SLATE, 0.06)} 0%, ${dkh(SLATE, 0.4)} 100%)`,
        border: `${P(5)}px solid ${dkh(IRON, 0.16)}` }} />
      {[0, 1].map((i) => (
        <div key={"jw" + i} style={{ position: "absolute", left: P(i ? 116 : 30), top: P(60),
          width: P(30), height: P(56), background: mxh(COPPER, 0.06), borderRadius: P(3) }} />
      ))}
      {[0, 1].map((i) => (
        <div key={"tm" + i} style={{ position: "absolute", left: P(i ? 122 : 36), top: P(126),
          width: P(18), height: P(18), borderRadius: "50%", background: dkh(COPPER, 0.2) }} />
      ))}
      {/* the blade — swings on the LEFT jaw and lands in the right one */}
      <div style={{ position: "absolute", left: P(42), top: P(66), width: P(96), height: P(17),
        background: `linear-gradient(180deg, ${mxh(COPPER, 0.3)} 0%, ${dkh(COPPER, 0.1)} 100%)`,
        borderRadius: P(3), transformOrigin: `${P(6)}px ${P(8)}px`,
        transform: `rotate(${-58 + k * 58}deg)` }} />
      {/* the handle on the blade end */}
      <div style={{ position: "absolute", left: P(42), top: P(66), width: P(126), height: P(17),
        transformOrigin: `${P(6)}px ${P(8)}px`, transform: `rotate(${-58 + k * 58}deg)` }}>
        <div style={{ position: "absolute", left: P(100), top: P(-9), width: P(26), height: P(34),
          borderRadius: P(5), background: dkh(INK, 0.0) }} />
      </div>
      <div style={{ position: "absolute", left: P(18), top: P(30), width: P(134), height: P(20),
        background: k > 0.5 ? mxh(JADE, 0.2) : dkh(IRON, 0.2), borderRadius: P(3) }} />
    </div>
  );
};

/* -------------------------------------------------------------------------
   A SLAB — 8 parts. The work-in-progress that rides the hoist and comes down
   the chute. Deliberately simple: it is CARGO, not a hero, and its job is to be
   a large, high-contrast mass that travels.
   ⛔ It is CREAM against every dark set in this reel, because a dark neutral on
   a dark neutral has no edge and the audit scores it as if it were not drawn.
   ---------------------------------------------------------------------- */
export const Slab: React.FC<{
  x: number; y: number; w?: number; h?: number; z?: number; rot?: number;
  c?: string; parts?: number; f?: number; label?: string;
}> = ({ x, y, w: ww = 132, h: hh = 92, z = 62, rot = 0, c = CREAMB, parts = 3,
        f = 0, label }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 4,
      background: `linear-gradient(168deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.2)} 100%)`,
      border: `3px solid ${dkh(c, 0.4)}` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 7,
      background: mxh(c, 0.4) }} />
    {Array.from({ length: parts }, (_, i) => (
      <div key={"sp" + i} style={{ position: "absolute", left: 12, top: 20 + i * 20,
        width: ww - 24 - i * 14, height: 9, borderRadius: 2, background: dkh(c, 0.36),
        opacity: 0.8 }} />
    ))}
    <div style={{ position: "absolute", left: ww - 26, top: hh - 24, width: 16, height: 16,
      borderRadius: 3, background: dkh(c, 0.5) }} />
    {label && (
      <div style={{ position: "absolute", left: 10, bottom: 6, ...mono(12, 800),
        color: dkh(c, 0.62), letterSpacing: 1 }}>{label}</div>
    )}
  </div>
);
