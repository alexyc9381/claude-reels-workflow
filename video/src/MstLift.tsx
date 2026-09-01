import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, settle, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, OXIDE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Occluder, Cone } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 3 — THE LIFT THAT STOPS AT EVERY FLOOR.

   ⛔ THE KEYRING WAS THE THIRD PILE-UP I HAD BUILT IN A ROW (the box that would
      not close, the meter, the ring of keys) and Alex was right that none of them
      is interesting: "a thing gets heavier" is a QUANTITY, not a SITUATION.
      Nothing happens TO anybody, so there is nothing to watch and nothing to feel.
      The signpost worked because it put him in a PREDICAMENT.

   ⭐⭐⭐ SO: A LIFT THAT STOPS AT EVERY SINGLE FLOOR. He wants ONE floor. The doors
      open on an empty landing, close, and it crawls up one more — seven times.
      Everyone alive has stood in that lift, which is the whole test
      ([[feedback_draw_a_machine_people_know]]), and it is the mechanism exactly:
      "loads ALL of your connectors WITH EVERY MESSAGE" is a stop at every floor
      to reach the one you asked for.

   ⭐ It also solves what the keyring could not. The events are built into the
      object — every stop is doors OPEN, nothing, doors CLOSE, rise — so the cut
      cannot go quiet, and the payoff writes itself: press one button and go
      straight there. A cutaway shaft shows the whole waste at once.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/* ⛔ FIRST BUILD DREW ALL SEVEN LANDINGS AT ONCE, WHICH MADE THE CAR 3.5% OF THE PANEL —
   the same fault as the keyring, one scene later: 2.77 with 27 DEAD frames. The gag is
   shot the other way round. HOLD ON THE CAR, BIG, AND LET THE SHAFT STREAM PAST IT.
   The whole background translating is the largest repaint available, every stop is still
   its own event, and you see far more floors than you could ever draw at once. */
const CX = 506, CY = 424;             /* the car sits here; the world moves */
const CW = 508, CH = 268;
const FH = 300;                       /* one storey */

/** the shaft rushing past — landings, rails and rungs, positioned by `rise` */
const Shaft: React.FC<{ rise: number; w: World; lit: number }> = ({ rise, w, lit }) => {
  const frac = rise - Math.floor(rise);
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 2,
      background: `linear-gradient(180deg, ${dkh(w.b3, 0.44)} 0%, ${dkh(w.b3, 0.62)} 100%)` }} />
    {[-2, -1, 0, 1, 2].map(i => {
      const y = CY + (i + frac) * FH;
      const n = Math.floor(rise) - i;
      return (
        <React.Fragment key={"lv" + i}>
          {/* the landing slab */}
          <div style={{ position: "absolute", left: 0, right: 0, top: y + CH / 2 - 20,
            height: 40, zIndex: 20, background: dkh(STEEL, 0.44) }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: y + CH / 2 - 20,
            height: 9, zIndex: 21, background: mxh(STEEL, 0.1) }} />
          {/* the empty landing behind the doors — there is never anything on it */}
          <div style={{ position: "absolute", left: CX - CW / 2 + 14, top: y - CH / 2 + 14,
            width: CW - 28, height: CH - 34, zIndex: 18, borderRadius: 4,
            background: `linear-gradient(180deg, ${dkh(w.b1, 0.2)} 0%, ${dkh(w.b1, 0.44)} 100%)` }} />
          <div style={{ position: "absolute", left: CX - CW / 2 + 54, top: y - CH / 2 + 52,
            width: 96, height: 150, zIndex: 19, borderRadius: 4, background: dkh(w.b2, 0.26) }} />
          {/* the storey number as a lamp bar, never a numeral */}
          <div style={{ position: "absolute", left: CX + CW / 2 + 44, top: y - 13,
            width: 74, height: 26, borderRadius: 6, zIndex: 24,
            background: lit > 0.5 && n >= 6 ? SAFE_C : (n <= Math.floor(rise) ? LIVE_C : dkh(MUTE, 0.55)) }} />
        </React.Fragment>
      );
    })}
    {/* the guide rails, so the streaming has hard edges to read against */}
    {[-1, 1].map(sd => (
      <div key={"rl" + sd} style={{ position: "absolute", zIndex: 22,
        left: CX + sd * (CW / 2 + 6) - 11, top: 0, bottom: 0, width: 22,
        background: `linear-gradient(90deg, ${dkh(STEEL, 0.5)} 0%, ${mxh(STEEL, 0.18)} 45%, ${dkh(STEEL, 0.5)} 100%)` }} />
    ))}
    {Array.from({ length: 9 }, (_, i) => {
      const y = ((i + frac) * 120) % 1080 - 90;
      return [-1, 1].map(sd => (
        <div key={"rg" + i + sd} style={{ position: "absolute", zIndex: 23,
          left: CX + sd * (CW / 2 + 6) - 17, top: y, width: 34, height: 13, borderRadius: 3,
          background: dkh(STEEL, 0.34) }} />
      ));
    })}
  </>);
};

/** the car: two leaves that part on a big frame, and him inside it */
const Car: React.FC<{ open: number; f: number; sag: number; shake: number; out?: number }> =
  ({ open, f, sag, shake, out = 0 }) => (
  <div style={{ position: "absolute", left: CX - CW / 2, top: CY - CH / 2 + shake,
    width: CW, height: CH, zIndex: 34 }}>
    <div style={{ position: "absolute", left: -16, top: -16, width: CW + 32, height: CH + 32,
      borderRadius: 8, background: dkh(STEEL, 0.5) }} />
    <Hero f={f} x={CW / 2 + out * 430} y={CH - 16} size={210} z={out > 0.02 ? 40 : 35}
      costume={{ constr: 1 }} gaze={0.5} act={out > 0.02 ? 1 : 3} drive={out > 0.02 ? 0.32 : 0}
      strain={sag} shock={sag * 0.8} />
    {[-1, 1].map(sd => (
      <div key={sd} style={{ position: "absolute", top: 0, bottom: 0,
        [sd < 0 ? "left" : "right"]: 0, width: CW / 2 - open * (CW / 2 - 10), zIndex: 36,
        background: `linear-gradient(${sd < 0 ? 96 : 264}deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.34)} 100%)` }}>
        <div style={{ position: "absolute", [sd < 0 ? "right" : "left"]: 0, top: 0, bottom: 0,
          width: 5, background: hexa(INK, 0.34) }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: CH * 0.42, height: 10,
          background: hexa(INK, 0.12) }} />
      </div>
    ))}
  </div>
);

/* ---- S8 · IT STOPS AT EVERY FLOOR (161f) --------------------------------- */
export const LiftA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.depot;
  const ARR = [16, 38, 59, 79, 97, 114, 129];
  const DWELL = 10;
  let rise = 0;
  for (let i = 0; i < ARR.length; i++) if (f >= ARR[i] - 12) rise = E(f, ARR[i] - 12, ARR[i], i, i + 1, IO);
  /* ⭐ and it never stops — past the last landing it just keeps climbing to the cut */
  if (f > ARR[ARR.length - 1] + DWELL) rise = E(f, ARR[ARR.length - 1] + DWELL, dur, ARR.length, ARR.length + 2.6, IO);
  const open = ARR.reduce((a, af) =>
    f >= af && f < af + DWELL ? Math.max(a, Math.sin(((f - af) / DWELL) * Math.PI)) : a, 0);
  const lk = ARR.reduce((a, af) =>
    f >= af && f < af + 9 ? Math.max(a, Math.abs(settle(f - af, 7.4, 2.2, 7))) : a, 0);
  const n = ARR.reduce((a, af) => (f >= af ? a + 1 : a), 0);

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.08]} vig={0.64} glow={hexa(w.key, 0.24)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.8} z={16}>
        <Shaft rise={rise} w={w} lit={0} />
        <Cone x={CX} y={-20} top={200} bot={820} len={760} c={w.key} o={0.2} z={10} f={f} sway={0.3} />
        <Car open={open} f={f} sag={Math.min(1, n / 5)} shake={lk * 1.4} />
        {ARR.map((af, i) => (
          <Ring key={"ar" + i} x={CX} y={CY} f={f} at={af} c={hexa(LIVE_C, 0.5)} z={40}
            s={0.75} dur={11} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S9 · ONE BUTTON, STRAIGHT THERE (154f) ------------------------------ */
export const LiftB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.depot;
  const PRESS = 24, GO = 36, ARRIVE = 104;
  /* the panel goes out in steps, not one ramp — six little events before the run */
  const OUT_AT = [6, 11, 15, 19, 22, 24];
  const dark = f < PRESS ? OUT_AT.reduce((a, of) => (f >= of ? a + 1 / OUT_AT.length : a), 0) * 0.9
    : E(f, PRESS, PRESS + 8, 0.9, 1, OUT);
  /* ⭐ no stops at all — one long accelerating run, and the doors open at the END */
  const rise = f < GO ? 0 : E(f, GO, ARRIVE, 0, 9, IO);
  const open = f < ARRIVE ? 0 : E(f, ARRIVE, ARRIVE + 16, 0, 1, OUT);
  /* ⭐ and he WALKS OUT — a 210px sprite crossing the frame is the biggest thing
     available in the tail, and stepping out is what arriving means */
  const stepOut = f < ARRIVE + 14 ? 0 : E(f, ARRIVE + 14, dur - 4, 0, 1, IO);
  const lk = OUT_AT.reduce((a, of) => f >= of && f < of + 6 ? Math.max(a, Math.abs(settle(f - of, 3.4, 2.2, 7))) : a, 0)
    + (f >= PRESS && f < PRESS + 8 ? Math.abs(settle(f - PRESS, 5.4, 2.2, 7)) : 0)
    + (f >= ARRIVE && f < ARRIVE + 14 ? Math.abs(settle(f - ARRIVE, 12, 2.2, 7)) : 0);

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.1]} vig={0.6} glow={hexa(SAFE_C, 0.2)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.8} z={16}>
        <Shaft rise={rise} w={w} lit={dark} />
        <Cone x={CX} y={-20} top={200} bot={820} len={760}
          c={dark > 0.5 ? "#8FD7B0" : w.key} o={0.2 + open * 0.16} z={10} f={f} sway={0.3} />
        <Car open={open} f={f} sag={0} shake={lk * 1.4} out={stepOut} />
        <Ring x={CX} y={CY} f={f} at={ARRIVE} c={hexa(SAFE_C, 0.95)} z={70} s={1.5} dur={20} />
        <Puff x={CX} y={CY + 60} f={f} at={ARRIVE} n={14} s={1.2} z={68} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const LiftPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={908} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={908} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={161}><LiftA dur={161} /></Sequence>
          <Sequence from={161} durationInFrames={154}><LiftB dur={154} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="3 · LOAD TOOLS" hot="ONLY WHEN NEEDED" f={f + 12} />
    </AbsoluteFill>
  );
};
