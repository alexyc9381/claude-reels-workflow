import React from "react";
import { useCurrentFrame } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Contact, Ring, Puff, Steam, Sweat, Fall, Hero, Forearm, mono,
  R, GY, BAND_Y, SAFE3, CLAYD, GOLD, GREEN, SODIUM,
} from "./JudgeWorld";
import { Stage } from "./JudgeOpens2";

/* ===========================================================================
   REEL 132 · "JUDGE" — ROUND 6 OPENS.  ⛔⛔⛔ ILLUSTRATE THE SENTENCE.

   THE NOTE: *"is there one that is kind of like a jester or something like that
   idk these concepts are still not really representing whats being spoken."*
   He is right and it is the whole diagnosis. THE LINE IS:

       "There's a new prompting technique that stops Claude from LYING TO YOUR FACE"

   Rounds 1-5 built: a chart recorder, a cracking seal, a gold seal x4, a big
   Claude shoving a small one, a bolted door bulging, a verdict descending.
   Every one of them is about PRESSURE or JUDGMENT — the courtroom the reel is
   SET in — and NOT ONE of them is about LYING, which is what the voice is
   actually saying over them. I illustrated the set instead of the sentence.

   ⭐⭐⭐ THE TEST THESE THREE HAVE TO PASS, AND THE OLD ONES DO NOT:
   mute the reel, and a stranger should be able to say the word `LYING`.

   And the jester instinct is the right one: the fool is the figure in a COURT
   whose whole job is telling you what you want to hear. That is the villain of
   this script — Claude is not malicious, he is a crowd-pleaser.

     A  jester   THE PERFORMANCE. Capped and belled, he juggles six gold DONEs
                 and they split open hollow at the top of the arc, one by one.
                 He keeps smiling. NOTHING HAS HIT THE FLOOR YET.
     B  mask     THE FACE IS A PROP. A serene gilt smiling face fills the panel;
                 it slips, he shoves it back up, and each shove recovers less.
                 The real face appears above it — panicking, ONLY TO US.
     C  dummy    THE THING TALKING IS NOT THE THING WORKING. He works a big
                 grinning gold DONE dummy; it fires claims out of its mouth at
                 you and it is GROWING. His own mouth never moves.

   ⛔ Hierarchy is unchanged: ONE dominant object, ONE Claude, `Stage` imported
   from round 4 and held down behind. `feedback_hook_simplicity`.
   ========================================================================= */

type SP = { v: any; dur: number };
export type Open4Id = "jester" | "mask" | "dummy";

export const OPEN4_BANDS: Record<Open4Id, { big: string; hot: string }> = {
  jester: { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  mask:   { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
  dummy:  { big: "STOP CLAUDE LYING", hot: "3 LINES OF PROMPT" },
};

/* ---------------------------------------------------------------------------
   The thing he is lying ABOUT, in one small drawable unit: a gold DONE tablet
   that can be WHOLE or SPLIT OPEN AND EMPTY. ⛔ A prop may draw its own
   children — the split is the tablet's own business, not the scene's.
   ------------------------------------------------------------------------ */
const Tablet: React.FC<{ x: number; y: number; s?: number; rot?: number; open?: number;
  z?: number }> = ({ x, y, s = 1, rot = 0, open = 0, z = 66 }) => {
  const W = 118 * s, H = 92 * s;
  const gap = open * 46 * s;
  const half = (side: -1 | 1) => (
    <div style={{ position: "absolute", left: side < 0 ? 0 : W / 2, top: 0,
      width: W / 2, height: H, overflow: "hidden",
      transformOrigin: side < 0 ? "100% 50%" : "0% 50%",
      transform: `translateX(${side * gap}px) rotate(${side * open * 17}deg)`,
      background: `linear-gradient(150deg, ${mxh(GOLD, 0.30)} 0%, ${GOLD} 46%, ${dkh(GOLD, 0.26)} 100%)`,
      borderTop: `${3 * s}px solid ${mxh(GOLD, 0.52)}`,
      boxShadow: open > 0.02 ? `inset ${side * -7 * s}px 0 ${9 * s}px ${hexa("#1A1206", 0.72)}` : SH }}>
      <div style={{ position: "absolute", left: side < 0 ? 15 * s : -44 * s, top: 30 * s,
        width: 88 * s, ...mono(27 * s, 800),
        letterSpacing: 2 * s, color: hexa("#3A2A0C", 0.86) }}>DONE</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", left: x - W / 2, top: y - H / 2, width: W, height: H,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      {/* the hollow revealed between the halves — black, and it is the point */}
      {open > 0.02 ? (
        <div style={{ position: "absolute", left: W * 0.16, top: H * 0.10, width: W * 0.68,
          height: H * 0.80, background: "#12100C", borderRadius: 5 * s,
          boxShadow: `inset 0 ${5 * s}px ${11 * s}px ${hexa("#000", 0.9)}` }} />
      ) : null}
      {half(-1)}{half(1)}
      {/* the pressed seal, on the whole ones only */}
      {open < 0.5 ? (
        <div style={{ position: "absolute", left: W / 2 - 13 * s, top: H / 2 - 13 * s,
          width: 26 * s, height: 26 * s, borderRadius: "50%", background: "#B23A2A",
          border: `${2.5 * s}px solid ${mxh("#B23A2A", 0.4)}`, opacity: 1 - open * 2 }} />
      ) : null}
    </div>
  );
};

/* =========================================================================
   A · `jester` — THE PERFORMANCE.

   ⭐ THE READ: a fool in a cap and bells, up on the plinth where the evidence
   should be, keeping SIX gold DONEs in the air and grinning at you. One by one
   they crack open at the top of their arc and there is nothing inside, and he
   does not break the smile and does not stop.
   ⭐ THE WITHHELD THING: not one of them has hit the floor. Five are open
   shells still going round at f79. The crash is the whole reason to stay.
   ⭐ AND IT IS THE HIGHEST-MOTION SHAPE IN THE TABLE — six large bright objects
   travelling on crossing arcs — which is why the metaphor and the number agree
   for once instead of fighting.
   ====================================================================== */
const N_BALL = 6, PERIOD = 46;
const SPLIT = [11, 22, 34, 47, 60];        // five of six. The sixth is still gold.
const HAND_L = 372, HAND_R = 640, HAND_Y = 512, ARC = 384;
const JS = 340;

export const Open4Jester: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const cracked = SPLIT.filter(a => f >= a).length;
  // he speeds up as he loses control of it — the pattern tightens, never drops
  const rate = 1 + E(f, 12, 79, 0, 0.34, LIN);
  const ff = f * rate;
  // the hands work on the CATCH beat, so the arms are driven by the pattern
  // rather than by a private sine ([[feedback_authored_motion_needs_its_own_driver]])
  const beat = Math.sin((ff / (PERIOD / N_BALL)) * Math.PI * 2);
  const hyL = HAND_Y + beat * 17, hyR = HAND_Y - beat * 17;

  return (
    <Stage dur={dur} f={f} poolX={506}>
      {/* the dais: he is performing where the EVIDENCE is supposed to stand */}
      <div style={{ position: "absolute", left: 358, top: GY - 2, width: 300, height: 104,
        zIndex: 40, boxShadow: SH_D,
        background: `linear-gradient(180deg, #8A5E34 0%, #5A3A1C 46%, #33200E 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 300, height: 13,
          background: `linear-gradient(180deg,#B98B54,#7A5230)` }} />
      </div>
      <Contact x={506} y={GY + 100} w={344} o={0.52} z={39} />

      {/* the arms are UP and they are working — a forearm that starts on his own
          arm and ends on the thing it holds ([[feedback_a_prop_may_draw_its_own_children]]) */}
      <Forearm x0={506 - 82} y0={GY - 176} x1={HAND_L} y1={hyL} w={28} z={58} />
      <Forearm x0={506 + 82} y0={GY - 176} x1={HAND_R} y1={hyR} w={28} z={58} />

      <Hero f={f} x={506} y={GY} size={JS} z={56} costume={{ constr: 1 }}
        cheer={1} act={2} gaze={0} pop={1} />
      <JesterCap f={ff} x={506} y={GY} size={JS} z={62} />

      {/* the six, on a crossing cascade */}
      {Array.from({ length: N_BALL }, (_, i) => {
        const u = (ff - i * (PERIOD / N_BALL)) / PERIOD;
        const cyc = Math.floor(u), t = u - cyc;
        if (u < 0) return null;
        const dir = (cyc + i) % 2 === 0 ? 1 : -1;
        const x = dir > 0 ? HAND_L + (HAND_R - HAND_L + 150) * t - 75
                          : HAND_R - (HAND_R - HAND_L + 150) * t + 75;
        const y = HAND_Y - ARC * 4 * t * (1 - t);
        const op = i < cracked ? E(f, SPLIT[i], SPLIT[i] + 7, 0, 1, OUT) : 0;
        return (
          <React.Fragment key={"tb" + i}>
            <Tablet x={x} y={y} s={1.14} open={op} z={68 + i}
              rot={dir * (t * 300 - 150) * 0.34 + op * dir * 12} />
            {/* what falls out of an empty promise: a few fixings, and dust */}
            {op > 0.1 ? <Fall x={x} y={y + 16} w={130} f={f} at={SPLIT[i]} n={7} z={65}
              c="#C8B896" rate={1.35} /> : null}
          </React.Fragment>
        );
      })}
      {SPLIT.slice(0, cracked).map((at, i) => (
        <Puff key={"pf" + i} x={506} y={HAND_Y - ARC} f={f} at={at} c="#EFE2C2" z={64} />
      ))}
    </Stage>
  );
};

/** The ruff. One scalloped collar is worth more than any amount of motion at
    telling a stranger, muted, in a thumbnail, that this figure is a FOOL. */
const Ruff: React.FC<{ f: number; x: number; y: number; w: number; z?: number }> =
  ({ f, x, y, w, z = 59 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - w * 0.19, width: w,
    height: w * 0.38, zIndex: z, transform: `rotate(${Math.sin(f / 13) * 2.6}deg)`,
    transformOrigin: "50% 30%" }}>
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: (w / 9) * i, top: w * 0.06,
        width: w * 0.155, height: w * 0.155, borderRadius: "50%", boxShadow: SH,
        background: i % 2 ? `linear-gradient(180deg,#F4E8CC,#C8B48A)`
                          : `linear-gradient(180deg,#E0A83C,#A9761E)` }} />
    ))}
    <div style={{ position: "absolute", left: w * 0.16, top: 0, width: w * 0.68,
      height: w * 0.13, borderRadius: w * 0.07,
      background: `linear-gradient(180deg,#FBF2DC,#D6C49A)` }} />
  </div>
);

/** The cap is the whole costume note: three lobes, three bells, and they swing
    on the juggle rhythm rather than on a private sine of their own
    (`feedback_authored_motion_needs_its_own_driver` — the driver here is the
    pattern he is keeping up). */
const JesterCap: React.FC<{ f: number; x: number; y: number; size: number; z?: number }> =
  ({ f, x, y, size, z = 62 }) => {
  const hy = y - size * 0.935;
  const sw = Math.sin(f / 7.4) * 15;
  const LOBE: Array<[number, number]> = [[-62, -1], [0, 0], [62, 1]];
  return (
    <div style={{ position: "absolute", left: x - size * 0.5, top: hy - 128,
      width: size, height: 210, zIndex: z }}>
      {LOBE.map(([dx, s2], i) => {
        const L = i === 1 ? 150 : 172;
        return (
          <div key={i} style={{ position: "absolute", left: size * 0.5 - 21 + dx,
            top: 128 - L + 22, width: 42, height: L, transformOrigin: "50% 100%",
            transform: `rotate(${s2 * 52 + sw * (0.45 + i * 0.42)}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "48% 48% 30% 30%",
              boxShadow: SH,
              background: i % 2 ? `linear-gradient(180deg,#D9512F 0%,#8A2E1C 100%)`
                                : `linear-gradient(180deg,#E7B245 0%,#A9761E 100%)` }} />
            <div style={{ position: "absolute", left: 3, top: -25, width: 36, height: 36,
              borderRadius: "50%", boxShadow: SH,
              background: `radial-gradient(circle at 34% 28%,#FBEDBA,#9C7A22)` }}>
              <div style={{ position: "absolute", left: 14, top: 20, width: 8, height: 10,
                borderRadius: 4, background: hexa("#4A3A10", 0.7) }} />
            </div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: size * 0.22, top: 124, width: size * 0.56,
        height: 26, borderRadius: 13, boxShadow: SH,
        background: `linear-gradient(180deg,#FBF2DC,#C0A472)` }} />
    </div>
  );
};

/* =========================================================================
   B · `mask` — THE FACE IS A PROP.

   ⭐ THE READ: frame 0 is a serene gilt smiling face, 470px, filling the panel,
   with DONE pressed into its forehead. It is beautiful, which is the point
   (`ANIMATION-QUALITY` §23 — the villain is not ugly). Then it SLIPS. Two small
   hands shove it back up and each shove recovers less, and what rises into view
   above the sinking rim is the real face: shocked, sweating, eyes going.
   ⭐ THE WITHHELD THING: it is still up between him and YOU at f79. We can see
   behind it and the person being lied to cannot.
   ⛔ AND THE SLIP IS THE MOTION: a 470px lit object travelling 300px vertically
   over a dark hero repaints a huge fraction of the panel at a big luma delta,
   which a deforming or a detailed object never does
   ([[feedback_uniform_field_repaints_nothing]]).
   ====================================================================== */
const NOTCH = [8, 21, 34, 47, 61];

export const Open4Mask: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const slipped = NOTCH.filter(a => f >= a).length;
  // each notch: it drops 82, he claws back 24. Net 58, five times.
  /* ⛔ v1 measured 2.47 with 15 DEAD frames: five 82px slips netting 58px each
     is 410px of travel over 80 frames and nothing at all in between them. The
     fix is not more slips, it is a bigger CYCLE — it falls 214 and he hauls it
     back 168, five times, which is 1910px of a 470px LIT object crossing a dark
     hero. Travel of a high-delta mass is the whole motion table. */
  const drop = NOTCH.reduce((a, at) =>
    a + E(f, at, at + 6, 0, 196, IN_Q) - E(f, at + 6, at + 15, 0, 142, OUT), 0);
  /* and it is never still: he is holding up something heavy and losing */
  const tremor = Math.sin(f / 2.6) * (2.2 + slipped * 1.5)
    + Math.sin(f / 6.1) * (3.4 + slipped * 2.1);
  const jolt = NOTCH.reduce((a, at) => a + E(f, at, at + 3, 0, 9, OUT)
    - E(f, at + 3, at + 9, 0, 9, OUT), 0);
  const MY = 258 + drop + tremor;

  return (
    <Stage dur={dur} f={f} poolX={506}>
      {/* the real one, behind it, and he is not having a good time */}
      <Hero f={f} x={506} y={GY} size={520} z={50} costume={{ constr: 1 }}
        shock={Math.min(1, 0.3 + slipped * 0.18)} strain={0.36}
        gaze={Math.sin(f / 5.6) * 1.6} act={3} />
      <Sweat x={506} y={GY - 400} f={f} at={NOTCH[0]} n={6} z={52} />
      {slipped >= 3 ? <Sweat x={436} y={GY - 376} f={f} at={NOTCH[2]} n={5} z={52} /> : null}

      {/* the hands that keep putting it back — they start on his own arms */}
      {/* ⛔ v2 ran both forearms UP THE MIDDLE of the mask and they read as two
          straws in a smiley face. They grip the SIDE RIMS, where hands holding
          something up actually go, and they never cross the face. */}
      <Forearm x0={506 - 138} y0={GY - 238} x1={506 - 176 + tremor * 1.6} y1={MY + 214}
        w={30} z={71} />
      <Forearm x0={506 + 138} y0={GY - 238} x1={506 + 176 + tremor * 1.6} y1={MY + 214}
        w={30} z={71} />

      <MaskFace x={506 + tremor * 1.6} y={MY} w={330} f={f}
        tilt={jolt * 0.5 + tremor * 0.22} z={72} />

      {NOTCH.slice(0, slipped).map((at, i) => (
        <React.Fragment key={"nk" + i}>
          <Puff x={i % 2 ? 692 : 320} y={MY + 190} f={f} at={at} c="#E8D8AE" z={74} />
          <Fall x={506} y={MY + 200} w={330} f={f} at={at} n={6} z={70} c="#CBBB96" rate={1.2} />
        </React.Fragment>
      ))}
      <Contact x={506} y={GY + 4} w={330} o={0.5} z={44} />
    </Stage>
  );
};

const MaskFace: React.FC<{ x: number; y: number; w: number; f: number; tilt?: number;
  z?: number }> = ({ x, y, w, f, tilt = 0, z = 72 }) => {
  const h = w * 1.19;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: h, zIndex: z,
      transform: `rotate(${tilt}deg)`, transformOrigin: "50% 20%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "48% 48% 44% 44% / 40% 40% 58% 58%",
        background: `linear-gradient(158deg, ${mxh(GOLD, 0.42)} 0%, ${GOLD} 40%, ${dkh(GOLD, 0.30)} 100%)`,
        boxShadow: `${SH_D}, inset 0 ${w * 0.03}px ${w * 0.06}px ${hexa("#FFF3D0", 0.5)}` }} />
      {/* DONE pressed into the forehead — the one mute-readable string */}
      <div style={{ position: "absolute", left: 0, top: h * 0.115, width: w, textAlign: "center",
        ...mono(w * 0.115, 800), letterSpacing: w * 0.022,
        color: hexa("#3E2C0A", 0.5) }}>DONE</div>
      {/* the serene, closed, entirely untroubled eyes */}
      {[-1, 1].map(s => (
        <div key={s} style={{ position: "absolute", left: x0(w, s) , top: h * 0.375,
          width: w * 0.20, height: w * 0.085, borderRadius: "0 0 999px 999px",
          borderBottom: `${w * 0.028}px solid ${hexa("#2E2008", 0.82)}`,
          borderLeft: `${w * 0.014}px solid ${hexa("#2E2008", 0.30)}`,
          borderRight: `${w * 0.014}px solid ${hexa("#2E2008", 0.30)}` }} />
      ))}
      <div style={{ position: "absolute", left: w * 0.46, top: h * 0.44, width: w * 0.08,
        height: w * 0.13, borderRadius: "50% 50% 40% 40%", background: hexa(dkh(GOLD, 0.18), 0.9) }} />
      {/* and the smile, which is the lie */}
      <div style={{ position: "absolute", left: w * 0.235, top: h * 0.56, width: w * 0.53,
        height: w * 0.24, borderRadius: "0 0 999px 999px",
        borderBottom: `${w * 0.045}px solid ${hexa("#2E2008", 0.86)}`,
        borderLeft: `${w * 0.022}px solid ${hexa("#2E2008", 0.34)}`,
        borderRight: `${w * 0.022}px solid ${hexa("#2E2008", 0.34)}` }} />
      <div style={{ position: "absolute", left: w * 0.10, top: h * 0.06, width: w * 0.26,
        height: h * 0.30, borderRadius: "50%", background: hexa("#FFF6DC", 0.30),
        filter: "blur(9px)" }} />
      {/* ⛔ THE RIM IS WHAT MAKES IT A MASK. Without a visible thickness and a
          dark inner edge it is a giant smiley FACE — which is what v1 read as. */}
      <div style={{ position: "absolute", left: -w * 0.028, top: -h * 0.012,
        width: w * 1.056, height: h * 1.03, borderRadius: "48% 48% 44% 44% / 40% 40% 58% 58%",
        zIndex: -1, background: `linear-gradient(180deg,${dkh(GOLD,0.30)},${dkh(GOLD,0.55)})`,
        boxShadow: `inset 0 ${-h * 0.02}px ${h * 0.03}px ${hexa("#1A1206", 0.8)}` }} />
    </div>
  );
};
const x0 = (w: number, s: number) => (s < 0 ? w * 0.215 : w * 0.585);

/* =========================================================================
   C · `dummy` — THE THING TALKING IS NOT THE THING WORKING.

   ⛔ v1 of this slot was a Pinocchio nose. It measured 2.75 STATIC and, worse,
   it read as a SAUSAGE — a segmented tube at chest height that a stranger would
   not call a nose, let alone a lie. Dropped, not tuned: the defect was legibility
   and no amount of motion fixes an object nobody recognises.

   ⭐ THE READ, and it is the jester's own family: a small Claude works a big
   grinning gold DONE dummy. The dummy does all the talking — its jaw hammers,
   it gestures, and it fires DONE tags straight out of its mouth at you. His own
   mouth never moves. The puppet is the confident deliverable; he is the one who
   actually knows.
   ⭐ THE WITHHELD THING: THE DUMMY IS GROWING. 236px at f0, 430px at f79, and
   his arm is further inside it every beat. Which of them is working which is
   the question the hook asks and does not answer.
   ⭐ AND THE TAGS COMING OUT OF THE MOUTH ARE THE MOTION — the escaping-content
   shape ([[feedback_uniform_field_repaints_nothing]]), and here it is literally
   the script: claims, pouring out, faster than anyone can check them.
   ====================================================================== */
const SAY = [4, 10, 16, 22, 28, 34, 40, 46, 52, 58, 64, 70, 75];

export const Open4Dummy: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const said = SAY.filter(a => f >= a).length;
  const DS = 236 + E(f, 0, 79, 0, 194, LIN);        // it is taking over
  const swing = Math.sin(f / 8.2) * 15 + Math.sin(f / 3.1) * 4;
  const jaw = Math.max(0, Math.sin(f / 1.9)) * 26;   // it never stops talking
  const DX = 370, DY = GY - 108;

  return (
    <Stage dur={dur} f={f} poolX={430}>
      {/* the operator: smaller, quiet, and his mouth is shut */}
      <Hero f={f} x={742} y={GY} size={312} z={52} costume={{ constr: 1 }}
        flip stern={0.6} gaze={-0.9} act={3} strain={0.22} />
      <Sweat x={742} y={GY - 254} f={f} at={SAY[2]} n={5} z={53} />
      {/* his arm, all the way up inside it */}
      <Forearm x0={648} y0={GY - 196} x1={DX + DS * 0.26} y1={DY - DS * 0.20}
        w={31} z={54} />
      {/* the cuff where his arm goes IN — without it he is just standing near it */}
      <div style={{ position: "absolute", left: DX + DS * 0.20, top: DY - DS * 0.30,
        width: DS * 0.20, height: DS * 0.22, borderRadius: "50%", zIndex: 55,
        background: `radial-gradient(circle at 60% 40%, ${hexa("#12100C", 0.95)}, ${hexa("#12100C", 0.7)})` }} />

      <Dummy x={DX} y={DY} s={DS} rot={swing} jaw={jaw} f={f} z={60} />

      {/* the claims, fired out of its mouth at YOU */}
      {SAY.map((at, i) => {
        if (f < at) return null;
        const k = E(f, at, at + 30, 0, 1, OUT);
        const sp = 1 + k * 1.9;
        const tx = DX - DS * 0.30 - k * 520;
        const ty = DY - DS * 0.30 + (rnd(i, 5) - 0.5) * 190 * k + k * k * 150;
        return (
          <div key={"sy" + i} style={{ position: "absolute", left: tx - 54 * sp,
            top: ty - 34 * sp, width: 108 * sp, height: 68 * sp, zIndex: 74,
            opacity: Math.max(0, 1 - k * 0.7), boxShadow: SH, borderRadius: 7,
            transform: `rotate(${(rnd(i, 9) - 0.5) * 70 * k}deg)`,
            background: `linear-gradient(150deg, ${mxh(GOLD, 0.30)}, ${dkh(GOLD, 0.24)})` }}>
            <div style={{ position: "absolute", left: 0, top: 20 * sp, width: 108 * sp,
              textAlign: "center", ...mono(26 * sp, 800),
              color: hexa("#3A2A0C", 0.86) }}>DONE</div>
          </div>
        );
      })}
      <Contact x={742} y={GY + 4} w={310} o={0.5} z={44} />
    </Stage>
  );
};

/** The dummy draws its own hinged jaw, its own painted grin and its own limp
    arms. ⛔ A LIMP arm is the entire gag — it is not doing any of the work. */
const Dummy: React.FC<{ x: number; y: number; s: number; rot: number; jaw: number;
  f: number; z?: number }> = ({ x, y, s, rot, jaw, f, z = 60 }) => {
  const HW = s * 0.66, HH = s * 0.58;
  return (
    <div style={{ position: "absolute", left: x - s / 2, top: y - s, width: s, height: s,
      zIndex: z, transformOrigin: "62% 100%", transform: `rotate(${rot}deg)` }}>
      {/* the collar — a dummy wears clothes somebody put on it */}
      <div style={{ position: "absolute", left: s * 0.24, top: s * 0.455, width: s * 0.52,
        height: s * 0.10, borderRadius: s * 0.02, zIndex: 2, boxShadow: SH,
        background: `linear-gradient(180deg,#FBF2DC,#C8B48A)` }} />
      <div style={{ position: "absolute", left: s / 2 - s * 0.075, top: s * 0.475,
        width: s * 0.15, height: s * 0.085, zIndex: 3, borderRadius: s * 0.02,
        background: `linear-gradient(180deg,#D9512F,#8A2E1C)` }} />
      {/* body: the gold deliverable, wearing a collar */}
      <div style={{ position: "absolute", left: s * 0.14, top: s * 0.50, width: s * 0.72,
        height: s * 0.52, borderRadius: s * 0.06, boxShadow: SH_D,
        background: `linear-gradient(160deg, ${mxh(GOLD, 0.34)} 0%, ${GOLD} 44%, ${dkh(GOLD, 0.28)} 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: s * 0.19, width: s * 0.72,
          textAlign: "center", ...mono(s * 0.15, 800), letterSpacing: s * 0.012,
          color: hexa("#3A2A0C", 0.84) }}>DONE</div>
      </div>
      {/* the limp arms — it gestures because HE swings it, not because it moves */}
      {[-1, 1].map(sd => (
        <div key={sd} style={{ position: "absolute",
          left: sd < 0 ? s * 0.02 : s * 0.80, top: s * 0.58, width: s * 0.18, height: s * 0.30,
          borderRadius: s * 0.09, transformOrigin: "50% 0%",
          transform: `rotate(${sd * (16 + Math.sin(f / 8.2 + sd) * 22)}deg)`,
          background: `linear-gradient(180deg,${mxh(CLAYD, 0.2)},${dkh(CLAYD, 0.3)})` }} />
      ))}
      {/* head */}
      <div style={{ position: "absolute", left: s / 2 - HW / 2, top: s * 0.50 - HH + s * 0.05,
        width: HW, height: HH, borderRadius: `${HW * 0.3}px ${HW * 0.3}px ${HW * 0.16}px ${HW * 0.16}px`,
        boxShadow: SH_D,
        background: `linear-gradient(158deg, ${mxh(GOLD, 0.44)} 0%, ${GOLD} 42%, ${dkh(GOLD, 0.24)} 100%)` }}>
        {[-1, 1].map(sd => (
          <div key={sd} style={{ position: "absolute",
            left: sd < 0 ? HW * 0.16 : HW * 0.56, top: HH * 0.22,
            width: HW * 0.28, height: HW * 0.28, borderRadius: "50%", background: "#FBF4E2",
            boxShadow: `inset 0 ${HW * 0.02}px ${HW * 0.03}px ${hexa("#6E5A34", 0.5)}` }}>
            <div style={{ position: "absolute", left: "24%", top: "22%", width: "52%",
              height: "52%", borderRadius: "50%", background: "#1C1406" }}>
              <div style={{ position: "absolute", left: "20%", top: "14%", width: "38%",
                height: "38%", borderRadius: "50%", background: hexa("#FFF6DC", 0.9) }} />
            </div>
          </div>
        ))}
        {/* the painted cheeks — a dummy is a face somebody PAINTED */}
        {[-1, 1].map(sd => (
          <div key={"ck" + sd} style={{ position: "absolute",
            left: sd < 0 ? HW * 0.04 : HW * 0.74, top: HH * 0.48,
            width: HW * 0.22, height: HW * 0.14, borderRadius: "50%",
            background: hexa("#D9512F", 0.42), filter: "blur(3px)" }} />
        ))}
        {/* the HINGE LINE. This is the whole tell: the lower face is a separate
            part, and something else is working it. */}
        <div style={{ position: "absolute", left: HW * 0.10, top: HH * 0.68, width: HW * 0.80,
          height: HH * 0.035, background: hexa("#2E2008", 0.5) }} />
      </div>
      <div style={{ position: "absolute", left: s / 2 - HW * 0.36,
        top: s * 0.50 - HH + s * 0.05 + HH * 0.72, width: HW * 0.72, height: HH * 0.38,
        transformOrigin: "50% 0%", transform: `rotate(${jaw}deg)`,
        borderRadius: `0 0 ${HW * 0.22}px ${HW * 0.22}px`, boxShadow: SH,
        background: `linear-gradient(180deg, ${dkh(GOLD, 0.10)}, ${dkh(GOLD, 0.36)})` }}>
        <div style={{ position: "absolute", left: HW * 0.06, top: 0, width: HW * 0.56,
          height: HH * 0.13, background: "#170F04" }} />
      </div>
    </div>
  );
};

export const OPENS4: Record<Open4Id, React.FC<SP>> = {
  jester: Open4Jester, mask: Open4Mask, dummy: Open4Dummy,
};
