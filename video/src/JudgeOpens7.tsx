import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Steam, Sweat, Fall, Hero, Forearm, mono,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { ColdCourt } from "./JudgeOpens6";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 9.  ⛔⛔⛔ IT HAS TO ACTUALLY HAPPEN.

   THE NOTE: *"none of these are good enough whatsoever, please take a step back
   and try to fix this."* Nine rounds. So I stopped generating candidates and
   read my own spec, and `docs/THE-OPEN.md` says the thing I have been doing
   wrong since round 5, in its own words:

     > "An establishing wide is a POSTER. It has one beat, and after that beat
     >  the eye has nothing left to do. No amount of motion added INSIDE one
     >  framing fixes it, because the composition has stopped making promises."

   and then the correction reel 104 forced onto it:

     > "A CUT IS NOT AN EVENT... an open needs ONE THING TO HAPPEN — a BEFORE
     >  state, a TRIGGER, TRAVEL, and AN ARRIVAL THAT COSTS SOMETHING."

   ⛔⛔⛔ **NOT ONE OF MY LAST TEN HOOKS HAS AN ARRIVAL.** The tower never falls.
   The glass never reaches. The fifth bolt holds. The verdict never lands. The
   shadows stop at his heel. I withheld the payoff every single time, on purpose,
   because I over-applied [[feedback_predictable_is_not_anticipatory]].

   ⭐⭐⭐ THAT RULE WITHHOLDS THE *ANSWER*, NOT THE *EVENT*. What a hook must not
   give away is HOW YOU FIX IT — that is the video. The physical thing in the
   shot has to complete, and it has to cost the character something. Check it
   against the three reels Alex keeps naming: OX's bull CHARGES. UNLAZY's balloon
   inflates until it BURSTS. BOSS knocks the work clean out of his hands. Reel
   104 shipped three plugins ejecting off a wall and SLAMMING onto a counter and
   measured 12.10 with FEWER cuts than the five-shot version it replaced.

   SO: one locked framing, and the thing happens.

     f0-16   BEFORE.   Bright cold court, 36 lit case files, the gallery cropped
                       at the bottom. He beams down the lens holding his gold
                       DONE up. The tower of everything he already said was done
                       stands plumb behind him, running off the top of frame.
     f16     TRIGGER.  It lurches. Dust off every course.
     f16-50  TRAVEL.   It goes over, accelerating, shedding slabs past his ears.
     f50-66  ⭐ ARRIVAL, AND IT COSTS HIM. The whole tower COMES DOWN on him.
                       Every slab SHATTERS on landing and every one is HOLLOW —
                       black inside, nothing in it at all. He is buried to the
                       chest in his own empty claims.
     f66-79  He is still grinning, and still holding the one gold DONE up.

   ⛔ AND THE WITHHELD THING IS STILL THERE, in the right place: he has learned
   nothing, the last claim is still in the air, and how you stop this is the
   twenty-eight seconds that follow.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open7Id = "fall";

export const OPEN7_BANDS: Record<Open7Id, { big: string; hot: string }> = {
  fall: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

const NSLAB = 15;
const PIVX = 690;                       // the tower's foot. It never moves.
const LURCH = [16, 26, 36, 45];
const GO = 50;                          // past the balance point
const LAND = (i: number) => GO + 4 + i * 1.55;   // the top has furthest to fall

/** the gold slab, and it can be BROKEN OPEN — which is the entire point of the
    arrival. ⛔ A slab that merely lands has completed a movement; a slab that
    SPLITS AND IS EMPTY has completed the argument. */
const Claim: React.FC<{ x: number; y: number; w?: number; h?: number; rot?: number;
  broke?: number; z?: number }> =
  ({ x, y, w = 216, h = 58, rot = 0, broke = 0, z = 60 }) => {
  const gap = broke * 17;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2, width: w, height: h,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {broke > 0.02 ? (
        <div style={{ position: "absolute", left: w * 0.27, top: h * 0.16, width: w * 0.46,
          height: h * 0.68, borderRadius: 4, background: "#3A2A12",
          boxShadow: `inset 0 ${4}px ${9}px ${hexa("#140E04", 0.92)}` }} />
      ) : null}
      {([-1, 1] as const).map(sd => (
        <div key={sd} style={{ position: "absolute",
          left: sd < 0 ? -gap : w / 2 + gap, top: broke * sd * 5,
          width: w / 2, height: h, overflow: "hidden", borderRadius: sd < 0 ? "5px 0 0 5px" : "0 5px 5px 0",
          transform: `rotate(${sd * broke * 9}deg)`,
          transformOrigin: sd < 0 ? "0% 50%" : "100% 50%", boxShadow: SH,
          background: `linear-gradient(160deg, ${mxh(GOLD, 0.36)} 0%, ${GOLD} 44%, ${dkh(GOLD, 0.26)} 100%)`,
          borderRight: sd < 0 && broke > 0.02 ? `4px solid ${dkh(GOLD, 0.45)}` : undefined,
          borderLeft: sd > 0 && broke > 0.02 ? `4px solid ${dkh(GOLD, 0.45)}` : undefined }}>
          <div style={{ position: "absolute", left: sd < 0 ? w * 0.09 : -w * 0.41, top: h * 0.27,
            width: w * 0.82, textAlign: "center", ...mono(h * 0.44, 800),
            letterSpacing: w * 0.012, color: hexa("#3A2A0C", 0.88) }}>DONE</div>
        </div>
      ))}
    </div>
  );
};

export const Open7Fall: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();

  /* ---- the lean, then the letting-go -------------------------------------
     Four lurches take it to -19 degrees. At GO it is past its balance point and
     nothing holds it: the angle runs away on a square curve, which is what
     gravity looks like and what four rounds of linear "leaning" never did. */
  const lean = LURCH.reduce((a, at) =>
    a + E(f, at, at + 5, 0, 5.4, IN_Q) - E(f, at + 5, at + 13, 0, 0.7, OUT), 0);
  const runaway = f < GO ? 0 : Math.min(1, (f - GO) / 17) ** 2 * 74;
  const tip = -(lean + runaway);
  const strain = LURCH.reduce((a, at) =>
    a + (f >= at && f < at + 9 ? Math.sin((f - at) * 2.4) * 9 * (1 - (f - at) / 9) : 0), 0)
    + Math.sin(f / 3.4) * (1.4 + LURCH.filter(a2 => f >= a2).length * 0.8);

  /* ---- where a course actually is, in world space, at this frame ---------- */
  const place = (i: number) => {
    const creep = -(i * i * 1.05);
    const x0 = PIVX + creep + strain * (i / NSLAB), y0 = GY - 34 - i * 60;
    const a = (tip * Math.PI) / 180;
    const dx = x0 - PIVX, dy = y0 - GY;
    return { x: PIVX + dx * Math.cos(a) - dy * Math.sin(a),
             y: GY + dx * Math.sin(a) + dy * Math.cos(a), r: tip * 0.9 };
  };
  /* ---- and where it ends up: rubble, most of it ON him -------------------- */
  const rest = (i: number) => (
    i % 2 === 0
      ? { x: 178 + rnd(i, 3) * 210, y: GY - 46 - (i % 5) * 54, r: -52 + rnd(i, 11) * 104 }
      : { x: 372 + rnd(i, 3) * 340, y: GY - 24 - (i % 3) * 48, r: -34 + rnd(i, 11) * 68 });

  const buried = E(f, GO + 8, GO + 20, 0, 1, OUT);

  return (
    <ColdCourt dur={dur} f={f}>
      {/* ⭐ THE ARRIVAL. Every course lands, splits, and is empty. */}
      {Array.from({ length: NSLAB }, (_, i) => {
        const at = LAND(i);
        const k = f < at ? 0 : Math.min(1, (f - at) / 9);
        const p = place(i), q = rest(i);
        const g = k * k;
        const x = p.x + (q.x - p.x) * g, y = p.y + (q.y - p.y) * g;
        const r = p.r + (q.r - p.r) * g;
        const broke = k >= 1 ? 1 : E(f, at + 6, at + 11, 0, 1, OUT);
        // it settles for a while after it lands — nothing in a pile is still
        const set = k >= 1 ? Math.sin((f - at) * 1.35) * 7 * Math.exp(-(f - at - 9) / 9) : 0;
        return (
          <React.Fragment key={"sl" + i}>
            <Claim x={x + set * 0.7} y={y} w={224 - i * 4} h={58} rot={r + set} broke={broke}
              z={k >= 1 ? 74 + i : 52 + i} />
            {k > 0 && k < 1 ? (
              <Fall x={x} y={y + 26} w={210} f={f} at={at} n={7} z={71} c="#D6CDB6" rate={1.4} />
            ) : null}
            {k >= 1 ? <Puff x={x} y={y + 10} f={f} at={at + 8} c="#EDF2F8" z={73} /> : null}
          </React.Fragment>
        );
      })}

      {/* the dust each lurch shakes out, before any of it lets go */}
      {LURCH.filter(a => f >= a).map((at, i) => (
        <React.Fragment key={"lr" + i}>
          <Puff x={670 - i * 34} y={GY - 110 - i * 92} f={f} at={at} c="#E4EAF2" z={64} />
          <Fall x={670 - i * 34} y={GY - 110 - i * 92} w={260} f={f} at={at} n={8} z={49}
            c="#D6CDB6" rate={1.2} />
        </React.Fragment>
      ))}
      {/* and the ground shot when the mass hits it */}
      {f >= GO + 26 ? (<>
        <Fall x={470} y={GY - 150} w={860} f={f} at={GO + 26} n={13} z={77} c="#E2DAC6" rate={0.62} />
        <Puff x={330} y={GY - 90} f={f} at={GO + 28} c="#EDF2F8" z={77} />
        <Puff x={640} y={GY - 70} f={f} at={GO + 33} c="#EDF2F8" z={77} />
      </>) : null}
      {f >= GO + 6 ? (<>
        <Ring x={430} y={GY + 6} f={f} at={GO + 6} c="#EDF2F8" z={76} />
        <Ring x={690} y={GY + 6} f={f} at={GO + 9} c="#EDF2F8" z={76} />
        <Fall x={430} y={GY - 10} w={780} f={f} at={GO + 6} n={16} z={75} c="#D6CDB6" rate={1.6} />
      </>) : null}
      <Contact x={PIVX} y={GY + 6} w={340} o={0.55 * (1 - buried * 0.5)} z={45} />

      {/* the bench: dark oxblood joinery, cropped by the edge. It carries the
          black point and the value spread without recolouring anything alive. */}
      <div style={{ position: "absolute", left: 712, top: GY - 348, width: 400, height: 420,
        zIndex: 80, boxShadow: SH_D,
        background: `linear-gradient(168deg,#2E1E18 0%,#170D0C 46%,#080505 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 400, height: 34,
          background: `linear-gradient(180deg,#6E4838,#2E1E18)` }} />
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 34 + i * 186, top: 92, width: 148,
            height: 262, borderRadius: 4, border: `9px solid ${hexa("#4A3028", 0.85)}` }} />
        ))}
        {/* the reel's own keyword, cut into the bench front */}
        <div style={{ position: "absolute", left: 6, top: 44, width: 232, textAlign: "center",
          ...mono(34, 800), letterSpacing: 4, color: hexa("#8A6A54", 0.55) }}>{R.keyword}</div>
      </div>
      {/* and the shadow it throws back into the room */}
      <div style={{ position: "absolute", left: 560, top: GY - 44, width: 460, height: 92,
        zIndex: 46, borderRadius: "50%", filter: "blur(16px)",
        background: `radial-gradient(ellipse at 60% 50%, ${hexa("#0A0605", 0.72)}, ${hexa("#0A0605", 0)})` }} />
      {/* ⛔ AND HE HAS NOT LEARNED A THING. Buried to the chest in his own empty
          claims, still grinning down the lens, still holding the next one up.
          THAT is what the twenty-eight seconds after this are for. */}
      <Hero f={f} x={252} y={GY} size={296} z={56} costume={{ constr: 1 }}
        cheer={1} act={2} gaze={0} strain={buried * 0.30} />
      <Forearm x0={312} y0={GY - 168} x1={382} y1={GY - 292} w={25} z={58} />
      <Contact x={252} y={GY + 4} w={262} o={0.5} z={44} />
      <Claim x={414} y={GY - 306} w={192} h={60} rot={-7} z={60} />
      {buried > 0.2 ? <Sweat x={252} y={GY - 250} f={f} at={GO + 10} n={5} z={62} /> : null}
    </ColdCourt>
  );
};

export const OPENS7: Record<Open7Id, React.FC<SP>> = { fall: Open7Fall };
