import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Steam, Sweat, Fall, Hero, Forearm, mono,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { BoltedPanel, VerdictHead, Monolith, Brief } from "./JudgeProps";
import { Stage } from "./JudgeOpens2";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 5 OPENS.  ANTICIPATION, NOT ARRIVAL.

   ⛔⛔⛔ THE NOTE: *"needs to be more elevated, more interesting motion and
   anticipatory concept."* `feedback_predictable_is_not_anticipatory` is a
   STANDING rule and it is exact:

     **Anticipation = a promised event whose resolution is WITHHELD.** At any
     frame ask *"what does the viewer not yet know, that this shot has already
     promised them?"* If the answer is "nothing", the shot is decoration.

   Round 4's open fails that test outright. At f0 you can extrapolate the whole
   thing — a big Claude is leaning over a small one holding work up — and the
   jab happens at f16 and is over. Motion with a destination is
   [[feedback_motion_needs_a_destination]], which the rule says is *necessary
   but not sufficient*. Nothing was being withheld, so there was no reason to
   stay past the second second.

   ⭐⭐ ALL THREE BELOW CARRY A COUNTDOWN THE VIEWER CAN READ WITHOUT BEING TOLD,
   AND NONE OF THEM RESOLVES INSIDE THE HOOK:

     A  bulge    SIX BOLTS, and they pop one at a time. Something behind the
                 gold DONE door is pushing; the panel bows, the seams blaze,
                 pages squeeze out. It ends on ONE BOLT LEFT. It never bursts.
     B  descend  a colossal DONE head ratchets down over the work in eight
                 notches. The gap is the readout: 470px to 34px. It never lands.
     C  lean     a 620px DONE monolith tips past its balance point on one prop.
                 The gap under its near edge is the readout. It never falls.

   ⛔ And the hierarchy rule still holds — ONE dominant object, ONE Claude, the
   court held down behind them. `Stage` is imported from round 4, not rebuilt.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open3Id = "bulge" | "descend" | "lean";

export const OPEN3_BANDS: Record<Open3Id, { big: string; hot: string }> = {
  bulge:   { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  descend: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  lean:    { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

/* =========================================================================
   A · `bulge` — SIX BOLTS, AND IT NEVER BURSTS.

   The promise is stated on frame 0: a gold `DONE` door, bolted shut, already
   bowing, with light already showing at the seams. Everything after that is the
   countdown — bolt, bolt, bolt, bolt, bolt — and the resolution is withheld: at
   f79 there is ONE bolt left, the belly is at 95%, three sheets are squeezing
   out of the top seam and the whole thing is still holding.
   ⭐ THE VIEWER'S OPEN QUESTION IS NEVER CLOSED: what is behind it, and when.
   ====================================================================== */
export const Open3Bulge: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⭐⭐⭐ THE PRESSURE SURGES, IT DOES NOT CREEP. v1 grew the belly on one slow
     ease and measured 2.43 — STATIC — because a 460x520 panel bowing a few
     percent over 80 frames repaints almost nothing per sample. SIX SURGES, each
     a near-miss: the whole panel swells and eases, the light behind flares, and
     he is shoved back and digs in again. That is more motion AND better
     anticipation — every surge is a resolution that nearly happened. */
  const SURGE = [8, 19, 30, 41, 53, 67];
  const POP = [8, 19, 30, 41, 53];                 /* five of six. The sixth holds. */
  const gone = POP.filter(a => f >= a).length;
  const swell = SURGE.reduce((a, at) =>
    a + (E(f, at - 3, at, 0, 0.20, IN_Q) - E(f, at + 2, at + 9, 0, 0.14, OUT)), 0);
  const bulge = Math.max(0.06, Math.min(1, 0.10 + E(f, 0, 78, 0, 0.34, LIN) + swell));
  const flare = SURGE.reduce((a, at) =>
    a + (E(f, at - 3, at, 0, 0.30, IN_Q) - E(f, at + 2, at + 10, 0, 0.26, OUT)), 0);
  const leak = Math.min(1, 0.08 + gone * 0.10 + E(f, 0, 78, 0, 0.16, LIN) + flare);
  const kick = SURGE.reduce((a, at) =>
    a + (f >= at && f < at + 10 ? Math.sin((f - at) * 1.5) * Math.exp(-(f - at) / 3.4) * 17 : 0), 0);
  /* he loses ground on every surge and claws a little back between them */
  const push = SURGE.reduce((a, at) => a + E(f, at, at + 5, 0, 0.19, OUT)
    - E(f, at + 6, at + 12, 0, 0.07, IO), 0) + 0.24;
  const HX = 786 + push * 96;
  return (
    <Stage dur={dur} f={f} poolX={392}>
      <BoltedPanel x={392} y={702} w={460} h={520} z={54} f={f}
        bulge={bulge} gone={gone} leak={leak} />
      {[142, 642].map((jx, i) => (
        <div key={"jm" + i} style={{ position: "absolute", left: jx - 24, top: 166, width: 48,
          height: 556, zIndex: 50,
          background: `linear-gradient(90deg, #6E5230 0%, #3A2A16 100%)` }} />
      ))}
      <div style={{ position: "absolute", left: 112, top: 152, width: 560, height: 32, zIndex: 50,
        background: `linear-gradient(180deg, #8A6A3E 0%, #4A3A22 100%)` }} />

      {push > 0.30 && (
        <div style={{ position: "absolute", left: 786, top: GY - 12, width: (push - 0.24) * 110,
          height: 15, zIndex: 43, background: hexa("#2A2016", 0.34) }} />
      )}
      <Contact x={HX - 110} y={GY} w={220} z={41} o={0.34} />
      <Hero f={f} x={HX} y={GY} size={246} z={62} act={1} ph={0.3} flip
        costume={{ constr: 1 }} strain={Math.min(1, 0.45 + push * 0.5)}
        drive={push * 0.16} stern={Math.min(1, push)}
        shock={SURGE.reduce((a, at) => a + E(f, at, at + 3, 0, 0.7, OUT) - E(f, at + 7, at + 13, 0, 0.7, IO), 0)} />
      <Forearm x0={HX - 246 * 0.34} y0={GY - 246 * 0.46} x1={636 + kick * 0.5}
        y1={GY - 320} w={27} c={CLAYD} z={63} />
      <Forearm x0={HX - 246 * 0.34} y0={GY - 246 * 0.30} x1={640 + kick * 0.5}
        y1={GY - 180} w={25} c={CLAYD} z={63} />
      <Steam x={HX} y={GY - 270} f={f} at={6} n={9} z={66} s={1.15} />
      <Sweat x={HX} y={GY - 200} f={f} at={18} n={9} z={67} />
      {SURGE.map((at, i) => (
        f >= at && f < at + 22
          ? <Ring key={"r" + i} x={392 + (i % 2 ? 150 : -150)} y={440} f={f} at={at}
              c="#FFE8B0" z={70} s={1.3} dur={20} />
          : null
      ))}
      {SURGE.map((at, i) => (
        f >= at ? <Puff key={"p" + i} x={392 + (i % 2 ? 180 : -180)} y={i < 3 ? 230 : 660}
          f={f} at={at} c="#D8C8A4" z={69} n={11} s={1.0} /> : null
      ))}
      {/* the jamb sheds every time it takes a surge — the room takes the load */}
      {SURGE.map((at, i) => (
        f >= at ? <Fall key={"fl" + i} x={392} y={170} w={560} f={f} at={at} n={10}
          z={52} c="#C8B896" rate={1.5} /> : null
      ))}
      {/* ⭐⭐⭐ AND WHAT IS BEHIND IT IS ALREADY GETTING OUT. The door was the
          whole picture and a gold field deforming repaints almost nothing —
          3.88, which the audit calls STATIC. Pages ESCAPING through the widening
          top seam are the top row of the motion table (many large bright objects
          travelling), they are the highest-value shape available here, and they
          are also the thing the shot is about: the findings are coming out
          whether he holds the door or not. Two more escape on every surge. */}
      {Array.from({ length: 18 }, (_, i) => {
        const at = 6 + i * 4.2;
        if (f < at) return null;
        const k = E(f, at, at + 46, 0, 1, OUT);
        const side = i % 2 ? 1 : -1;
        const x0 = 392 + (rnd(i, 3) - 0.5) * 300;
        const x = x0 + side * (90 + rnd(i, 7) * 320) * k;
        const y = 190 - 130 * Math.sin(k * Math.PI * 0.8) + k * k * 560;
        return (
          <div key={"esc" + i} style={{ position: "absolute", left: x - 58, top: y - 74,
            width: 116, height: 146, zIndex: 68, opacity: Math.max(0, 1 - k * 0.55),
            transform: `rotate(${i * 41 + k * side * 300}deg)`, background: "#EFE7D6",
            boxShadow: SH }}>
            {[0, 1, 2, 3].map(j => (
              <div key={j} style={{ position: "absolute", left: 15, top: 22 + j * 24,
                width: 82 - j * 17, height: 7, background: hexa("#8C8578", 0.42) }} />
            ))}
          </div>
        );
      })}
    </Stage>
  );
};

/* =========================================================================
   B · `descend` — THE GAP IS THE READOUT.

   A colossal `DONE` head ratchets down over the work in EIGHT notches, 470px of
   gap down to 34px, and it never touches. The promise is stated by the first
   notch and the resolution is withheld for the whole hook.
   ====================================================================== */
export const Open3Descend: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const NOTCH = [3, 12, 21, 30, 38, 46, 56, 68];
  const n = NOTCH.filter(a => f >= a).length;
  const last = NOTCH[Math.max(0, n - 1)];
  const step = E(f, last, last + 4, 0, 1, IN_Q);
  const gap = 470 - (n - 1 + step) * 54;
  const jolt = f - last < 8 ? Math.sin((f - last) * 1.7) * Math.exp(-(f - last) / 3) * 11 : 0;
  const strain = Math.min(1, 0.3 + (8 - gap / 54) * 0.10);
  return (
    <Stage dur={dur} f={f} poolX={430}>
      {/* the block, and the work on it */}
      <div style={{ position: "absolute", left: 250, top: 668 + jolt * 0.3, width: 360, height: 60,
        zIndex: 46, background: `linear-gradient(180deg, #4A4038 0%, #16120E 100%)` }} />
      <Brief x={430} y={670 + jolt * 0.3} w={196} s={0} z={48} f={f} rot={-3} />
      <VerdictHead x={430} y={640} w={700} z={60} gap={Math.max(34, gap)} f={f} />
      {/* the notches left, cut into the column — the countdown, drawn */}
      {NOTCH.map((_, i) => (
        <div key={"nk" + i} style={{ position: "absolute", left: 792, top: 146 + i * 54,
          width: i < 8 - n ? 76 : 32, height: 20, borderRadius: 3, zIndex: 58,
          background: i < 8 - n ? SODIUM : "#2A323A",
          border: i < 8 - n ? "3px solid #B8842A" : "3px solid #171D24" }} />
      ))}
      {/* one prop, and he is under it */}
      <div style={{ position: "absolute", left: 640, top: 640 - gap, width: 20,
        height: Math.max(0, gap), zIndex: 57,
        background: `linear-gradient(90deg, #C09A5E 0%, #7A5A2E 100%)`,
        transform: `skewX(${-(8 - gap / 54) * 1.1}deg)` }} />
      <Contact x={790} y={GY} w={190} z={41} o={0.32} />
      <Hero f={f} x={836} y={GY} size={214} z={62} act={1} ph={0.4} flip
        costume={{ constr: 1 }} strain={strain} stern={strain}
        shock={E(f, NOTCH[6], NOTCH[6] + 4, 0, 0.8, OUT)} />
      <Forearm x0={836 - 214 * 0.34} y0={GY - 214 * 0.46} x1={664} y1={640 - gap + 26}
        w={25} c={CLAYD} z={63} />
      <Steam x={836} y={GY - 238} f={f} at={10} n={9} z={66} s={1.1} />
      {NOTCH.map((at, i) => (
        f >= at && f < at + 16
          ? <Puff key={"pf" + i} x={430} y={676} f={f} at={at} c="#D8C8A4" z={64} n={8} s={0.8} />
          : null
      ))}
      <Fall x={430} y={640 - gap + 40} w={520} f={f} at={6} n={11} z={59} c="#C8B896" rate={1.0} />
    </Stage>
  );
};

/* =========================================================================
   C · `lean` — PAST THE BALANCE POINT, HELD ON ONE PROP.

   A 620px gold `DONE` monolith tips from 2 degrees to 19, and its balance point
   is 11. The gap under its near edge is the readout and it opens the whole way.
   It never lands.
   ====================================================================== */
export const Open3Lean: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const tip = E(f, 0, 78, 2, 19, IO);
  const past = Math.max(0, (tip - 11) / 8);
  const slip = E(f, 30, 78, 0, 96, IO);
  const lift = Math.sin((tip * Math.PI) / 180) * 380;
  return (
    <Stage dur={dur} f={f} poolX={400}>
      <Monolith x={462} y={GY} w={380} h={620} z={54} tip={tip} f={f} />
      {/* the gap opening under its near edge — the readout, and it is a WEDGE of
          floor you can see under a thing that should be standing on it */}
      <div style={{ position: "absolute", left: 462 - 380 + 6, top: GY - lift * 0.42,
        width: 380, height: Math.max(2, lift * 0.42), zIndex: 52,
        background: `linear-gradient(180deg, ${hexa("#1A120A", 0.62)} 0%, ${hexa("#1A120A", 0.18)} 100%)`,
        clipPath: "polygon(0% 100%, 100% 0%, 100% 100%)" }} />
      {/* ONE prop, and it is bending */}
      <div style={{ position: "absolute", left: 700 + slip * 0.4, top: GY - 300, width: 22,
        height: 306, zIndex: 56, transformOrigin: "50% 100%",
        transform: `rotate(${16 + past * 13}deg) skewX(${-past * 11}deg)`,
        background: `linear-gradient(90deg, #C09A5E 0%, #7A5A2E 100%)` }} />
      {past > 0.05 && (
        <div style={{ position: "absolute", left: 690, top: GY - 14, width: slip * 1.2, height: 14,
          zIndex: 43, background: hexa("#2A2016", 0.34) }} />
      )}
      <Contact x={806 + slip * 0.5} y={GY} w={188} z={41} o={0.32} />
      <Hero f={f} x={852 + slip * 0.5} y={GY} size={210} z={62} act={1} ph={0.3} flip
        costume={{ constr: 1 }} strain={Math.min(1, 0.4 + past * 0.6)}
        drive={past * 0.2} stern={past}
        shock={E(f, 42, 48, 0, 0.7, OUT) - E(f, 62, 72, 0, 0.7, IO)} />
      <Forearm x0={852 + slip * 0.5 - 210 * 0.34} y0={GY - 210 * 0.46}
        x1={724 + slip * 0.4} y1={GY - 272} w={25} c={CLAYD} z={63} />
      <Steam x={852 + slip * 0.5} y={GY - 234} f={f} at={12} n={9} z={66} s={1.1} />
      <Sweat x={852 + slip * 0.5} y={GY - 180} f={f} at={24} n={9} z={67} />
      {/* grit shaking off the top corner as it goes over */}
      <Fall x={300} y={200} w={420} f={f} at={16} n={13} z={58} c="#C8B896" rate={1.2} />
    </Stage>
  );
};

export const OPENS3: Record<Open3Id, React.FC<SP>> = {
  bulge: Open3Bulge, descend: Open3Descend, lean: Open3Lean,
};
