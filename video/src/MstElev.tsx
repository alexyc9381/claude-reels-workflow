import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  W as PW, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Mark, Ring, Puff, Hero, Forearm, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, OXIDE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Cone, Occluder } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   REEL 121 — THE BODY, REBUILT TO THE OPEN'S STANDARD.

   ⛔ The open is NOT touched. What carries over is the CONTRACT the eight rounds
      on it produced, applied scene by scene:
        · ONE recognisable object, centre, largest and lightest mass
        · COLOUR CARRIES STATE — red is what it is costing you, green is cleared —
          and the thing he HOLDS stays neutral so it never competes with the signal
        · the TARGET drawn on screen from frame 0, so the goal needs no words
        · a five-tick TALLY, so you can see how close he is
        · a RATCHET, not a smooth slide (a smooth travel is under the 8px floor)
        · a real room: three planes, a key light, a mass cropped by each frame edge

   ⭐ And the reel's arc is SUBTRACTION, so the colour law is the arc: every tip
      takes a RED thing out and the frame gets greener. The open ended on a
      full-red track; the body is the reel earning its way back to green.

   ⛔ VARY THE LOCATION. The open lived in `marquee` navy; the body must not
      ([[feedback_reel_vary_the_locations]]). Tip 1 is `row` — a warm plum
      fitting room, its own key colour, same craft.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

/** the room, parameterised by palette so every block gets its own light */
const ElevRoom: React.FC<{ f: number; w: World; tint: string; lightK?: number }> =
  ({ f, w, tint, lightK = 1 }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.44)} 0%, ${dkh(w.b3, 0.62)} 100%)` }} />
  {[[24, 300, 150, 300], [846, 268, 142, 332], [140, 356, 96, 244]].map((r, i) => (
    <div key={"fm" + i} style={{ position: "absolute", left: r[0], top: r[1],
      width: r[2], height: r[3], borderRadius: 8, zIndex: 3,
      background: dkh(w.b2, 0.48 + (i % 2) * 0.06) }} />
  ))}
  <div style={{ position: "absolute", left: 96, right: 96, top: 40, bottom: 0, zIndex: 6,
    background: `linear-gradient(180deg, ${dkh(w.b2, 0.26)} 0%, ${dkh(w.b3, 0.4)} 100%)` }} />
  {Array.from({ length: 15 }, (_, i) => (
    <React.Fragment key={"br" + i}>
      {Array.from({ length: 7 }, (_, k) => (
        <div key={k} style={{ position: "absolute", left: 60 + k * 128 + (i % 2) * 64,
          top: 46 + i * 50, width: 120, height: 42, borderRadius: 2, zIndex: 7,
          background: dkh(w.b1, 0.26 + ((i * 3 + k) % 4) * 0.03) }} />
      ))}
    </React.Fragment>
  ))}
  <Cone x={506} y={-30} top={210} bot={880} len={790} c={tint} o={0.3 * lightK} z={9} f={f} sway={0.35} />
  {Array.from({ length: 14 }, (_, i) => {
    const t = ((f * 4.2 + i * 57) % 800) / 800;
    return <div key={"mo" + i} style={{ position: "absolute", zIndex: 13,
      left: 240 + rnd(i, 2) * 540 + (rnd(i, 3) - 0.5) * 120 * t,
      top: 40 + t * 660, width: 10 + rnd(i, 4) * 12, height: 10 + rnd(i, 4) * 12,
      borderRadius: "50%", background: hexa(tint, 0.5 * lightK * Math.sin(t * Math.PI)) }} />;
  })}
  <div style={{ position: "absolute", left: 216, top: 700, width: 580, height: 60,
    borderRadius: "50%", zIndex: 10,
    background: `radial-gradient(circle, ${hexa(tint, 0.3 * lightK)} 0%, ${hexa(INK, 0)} 70%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 725, bottom: 0, zIndex: 14,
    background: `linear-gradient(180deg, ${dkh(w.ground, 0.22)} 0%, ${dkh(w.ground2, 0.48)} 100%)` }} />
</>);

/** the fill gauge every body scene shares: RED is what the window is spending,
    GREEN is what is free. Same law as the open's track, read bottom-up. */
const FillGauge: React.FC<{ x: number; top: number; bot: number; used: number; f: number;
  ticks: number[]; at: number[]; snapAll?: boolean }> =
  ({ x, top, bot, used, f, ticks, at, snapAll }) => {
  const h = bot - top, redTop = bot - h * used;
  return (<>
    <div style={{ position: "absolute", left: x - 12, top: top - 12, width: 100,
      height: h + 24, borderRadius: 14, background: dkh(STEEL, 0.46) }} />
    <div style={{ position: "absolute", left: x, top, width: 76, height: h,
      borderRadius: 10, background: dkh(STEEL, 0.7) }} />
    <div style={{ position: "absolute", left: x + 7, top: top + 6, width: 62,
      height: Math.max(0, redTop - top - 6), borderRadius: 8,
      background: `linear-gradient(180deg, ${dkh(SAFE_C, 0.28)} 0%, ${mxh(SAFE_C, 0.14)} 100%)` }} />
    <div style={{ position: "absolute", left: x + 7, top: redTop, width: 62,
      height: Math.max(0, bot - 6 - redTop), borderRadius: 8, overflow: "hidden",
      background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.16)} 0%, ${dkh(LIVE_C, 0.2)} 100%)` }}>
      {Array.from({ length: 6 }, (_, i) => {
        const ty = ((f * 12 + i * 46) % 276);
        return <div key={i} style={{ position: "absolute", left: -8, top: ty - 20,
          width: 92, height: 20, background: hexa(BONE, 0.28), transform: "skewY(-16deg)" }} />;
      })}
    </div>
    {ticks.map((ty, i) => (
      <div key={"tk" + i} style={{ position: "absolute", left: x + 90, top: ty - 8,
        width: 46, height: 16, borderRadius: 4,
        background: snapAll || f < at[i] ? LIVE_C : SAFE_C }} />
    ))}
  </>);
};

/* ---------------------------------------------------------------------------
   TIP 1a — "First, stop telling Claude to act like an expert. With the newest
   models, you're just wasting your context window."   (128f)

   ⭐ The object is THE WINDOW ITSELF, drawn as a glass case with a fill gauge, and
   the costume is the enormous RED thing eating nearly all of it. He hauls it out in
   four lurches; every lurch the red drops a step and a tick flips green. The claim
   ("it is wasting your window") is not stated, it is METERED.
   ------------------------------------------------------------------------- */
export const E2: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const PULL = [12, 30, 48, 66, 84, 102];
  const out = PULL.reduce((a, pf, i) =>
    f >= pf ? E(f, pf, pf + 5, i / PULL.length, (i + 1) / PULL.length, OUT) : a, 0);
  const lk = PULL.reduce((a, pf) =>
    f >= pf && f < pf + 8 ? Math.max(a, Math.abs(settle(f - pf, 5.2, 2.2, 6))) : a, 0);
  const used = 0.88 - out * 0.62;                     /* ⭐ the meter IS the claim */
  const judder = 0.5 + lk;
  const CX = 214, CY = 104, CW = 584, CH = 572;       /* the case */
  const robeX = CX + 44 - out * 470;
  const TICKS = [176, 268, 360, 452, 544];
  const CSZ = 320, CFX = 150, CFY = 712;
  const shX = CFX + CSZ * 0.34, shY = CFY - CSZ * 0.42;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.05]} vig={0.68} glow={hexa(w.key, 0.24)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.8} z={16}>
        <ElevRoom f={f} w={w} tint="#E9C6A2" />
        {(() => {
          const T = `translate(${Math.sin(f * 2.4) * judder}px, ${Math.cos(f * 3.1) * judder * 0.6}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            {/* the case — the context window, drawn as a thing with a capacity */}
            <div style={{ position: "absolute", left: CX - 14, top: CY + 20, width: CW + 60,
              height: CH + 30, borderRadius: 24, background: hexa(INK, 0.36) }} />
            <div style={{ position: "absolute", left: CX - 26, top: CY - 26, width: CW + 52,
              height: CH + 52, borderRadius: 24,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.1)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
            <div style={{ position: "absolute", left: CX, top: CY, width: CW, height: CH,
              borderRadius: 14, background: `linear-gradient(168deg, ${mxh(BONE, 0.46)} 0%, ${mxh(BONE, 0.18)} 100%)` }} />
            <div style={{ position: "absolute", left: CX + 16, top: CY + 16, width: CW - 32,
              height: CH - 32, borderRadius: 10, overflow: "hidden", background: hexa(INK, 0.16) }}>
              {/* ⭐⭐ THE WINDOW IS FULL, AND YOU CAN SEE OF WHAT. A bed of tokens that
                  never stops shifting — this is the continuous motion the first pass
                  dropped when it left the open's load column behind, and it is also
                  what makes "your context window" a thing rather than a blank box. */}
              {Array.from({ length: 42 }, (_, i) => {
                const col = i % 7, row = Math.floor(i / 7);
                const drift = Math.sin(f / 6.5 + i * 1.7) * 13;
                return <div key={"tk" + i} style={{ position: "absolute",
                  left: 4 + col * 80 + drift, top: CH - 112 - row * 74 + Math.cos(f / 7.5 + i) * 11,
                  width: 70, height: 62, borderRadius: 8,
                  transform: `rotate(${Math.sin(f / 13 + i * 2.2) * 4}deg)`,
                  background: `linear-gradient(180deg, ${dkh(WOODT, 0.2)} 0%, ${dkh(WOODT, 0.46)} 100%)` }} />;
              })}
              {/* and it keeps arriving */}
              {Array.from({ length: 9 }, (_, i) => {
                const t = ((f * 4.4 + i * 2.3) % 20) / 20;
                return <div key={"in" + i} style={{ position: "absolute",
                  left: 20 + rnd(i, 2) * 480, top: -80 + t * (CH - 90),
                  width: 74, height: 64, borderRadius: 8,
                  transform: `rotate(${t * 210}deg)`,
                  background: `linear-gradient(180deg, ${mxh(WOODT, 0.3)} 0%, ${dkh(WOODT, 0.14)} 100%)` }} />;
              })}
            </div>
            {/* ⭐ THE COSTUME — the one red mass, and it is nearly the whole window */}
            <div style={{ position: "absolute", left: robeX, top: CY + 52, width: 344, height: CH - 116,
              borderRadius: "18px 18px 44px 44px", zIndex: 24,
              background: `linear-gradient(140deg, ${mxh(LIVE_C, 0.2)} 0%, ${dkh(LIVE_C, 0.24)} 100%)` }}>
              <div style={{ position: "absolute", left: 116, top: -28, width: 128, height: 64,
                borderRadius: "26px 26px 0 0", background: dkh(LIVE_C, 0.4) }} />
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", left: 44 + i * 96, top: 110, width: 18,
                  height: CH - 280, borderRadius: 7, background: hexa(INK, 0.16) }} />
              ))}
              <div style={{ position: "absolute", left: 126, top: 62, width: 96, height: 96 }}>
                <Mark x={0} y={0} s={72} z={26} />
              </div>
            </div>
            <FillGauge x={CX + CW + 42} top={CY + 10} bot={CY + CH - 10} used={used}
              f={f} ticks={TICKS} at={[PULL[1], PULL[2], PULL[3], PULL[4], PULL[5]]} />
            {/* the free line it is being pulled back to — the target, from frame 0 */}
            <div style={{ position: "absolute", left: CX + CW + 30, top: CY + CH - 10 - (CH - 20) * 0.26,
              width: 100, height: 10, borderRadius: 5, background: mxh(SAFE_C, 0.1) }} />
          </div>);
        })()}
        <Hero f={f} x={CFX} y={CFY} size={CSZ} costume={{ constr: 1 }} gaze={0.7} act={3}
          drive={0} strain={0.34 + out * 0.5} />
        <Forearm x0={shX} y0={shY} x1={robeX + 56} y1={CY + 250} w={29} c="#C4674A" z={62} />
        <Forearm x0={shX - 18} y0={shY + 40} x1={robeX + 96} y1={CY + 316} w={27} c="#B85E42" z={61} />
        {PULL.map((pf, i) => (
          <Ring key={"pr" + i} x={CX + CW + 118} y={TICKS[i]} f={f} at={pf} c={hexa(SAFE_C, 0.7)}
            z={68} s={0.32} dur={11} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   TIP 1b — "Instead, spend those tokens telling Claude exactly where to find the
   sources, and tell it to check its own work before finishing."   (155f)

   ⭐ THE PAYOFF IS A COMPARISON, SO IT HAS TO BE MEASURED IN THE SAME UNITS. The
   two things that replace the costume go into the SAME case, against the SAME
   gauge — and they barely move it. That is the whole argument, made by the
   picture: one red thing took most of the window; two green ones take almost none.
   ------------------------------------------------------------------------- */
export const E3: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const IN_AT = [22, 62];
  const seat = (at: number) => (f < at ? 0 : E(f, at, at + 10, 0, 1, OUT));
  const s1 = seat(IN_AT[0]), s2 = seat(IN_AT[1]);
  const lk = IN_AT.reduce((a, pf) =>
    f >= pf + 8 && f < pf + 18 ? Math.max(a, Math.abs(settle(f - pf - 8, 5.0, 2.2, 6))) : a, 0);
  const used = 0.26 + s1 * 0.05 + s2 * 0.05;          /* ⭐ they cost almost nothing */
  const judder = 0.4 + lk;
  const CX = 214, CY = 104, CW = 584, CH = 572;
  const TICKS = [176, 268, 360, 452, 544];
  const CSZ = 320, CFX = 150, CFY = 712;
  const shX = CFX + CSZ * 0.34, shY = CFY - CSZ * 0.42;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.06]} vig={0.68} glow={hexa(w.key, 0.24)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.8} z={16}>
        <ElevRoom f={f} w={w} tint="#B8DCC4" />
        {(() => {
          const T = `translate(${Math.sin(f * 2.4) * judder}px, ${Math.cos(f * 3.1) * judder * 0.6}px)`;
          return (
          <div style={{ position: "absolute", inset: 0, zIndex: 20, transform: T }}>
            <div style={{ position: "absolute", left: CX - 14, top: CY + 20, width: CW + 60,
              height: CH + 30, borderRadius: 24, background: hexa(INK, 0.36) }} />
            <div style={{ position: "absolute", left: CX - 26, top: CY - 26, width: CW + 52,
              height: CH + 52, borderRadius: 24,
              background: `linear-gradient(158deg, ${mxh(STEEL, 0.1)} 0%, ${dkh(STEEL, 0.46)} 100%)` }} />
            <div style={{ position: "absolute", left: CX, top: CY, width: CW, height: CH,
              borderRadius: 14, background: `linear-gradient(168deg, ${mxh(BONE, 0.46)} 0%, ${mxh(BONE, 0.18)} 100%)` }} />
            <div style={{ position: "absolute", left: CX + 16, top: CY + 16, width: CW - 32,
              height: CH - 32, borderRadius: 10, overflow: "hidden", background: hexa(INK, 0.16) }}>
              {Array.from({ length: 11 }, (_, i) => {
                const drift = Math.sin(f / 6.5 + i * 1.7) * 13;
                return <div key={"tk" + i} style={{ position: "absolute",
                  left: 4 + (i % 7) * 80 + drift, top: CH - 112 + Math.cos(f / 7.5 + i) * 11,
                  width: 70, height: 62, borderRadius: 8,
                  transform: `rotate(${Math.sin(f / 13 + i * 2.2) * 4}deg)`,
                  background: `linear-gradient(180deg, ${dkh(WOODT, 0.2)} 0%, ${dkh(WOODT, 0.46)} 100%)` }} />;
              })}
              {Array.from({ length: 4 }, (_, i) => {
                const t = ((f * 4.2 + i * 5) % 20) / 20;
                return <div key={"in" + i} style={{ position: "absolute",
                  left: 40 + rnd(i, 2) * 440, top: -80 + t * (CH - 90),
                  width: 72, height: 62, borderRadius: 8,
                  transform: `rotate(${t * 210}deg)`,
                  background: `linear-gradient(180deg, ${mxh(WOODT, 0.3)} 0%, ${dkh(WOODT, 0.14)} 100%)` }} />;
              })}
            </div>

            {/* 1 · WHERE THE SOURCES ARE — a folded chart, small and green */}
            <div style={{ position: "absolute", zIndex: 24,
              left: CX + 72 - (1 - s1) * 520, top: CY + CH - 214 - (1 - s1) * 120,
              width: 168, height: 122, borderRadius: 10,
              transform: `rotate(${(1 - s1) * -22}deg)`,
              background: `linear-gradient(150deg, ${mxh(SAFE_C, 0.3)} 0%, ${dkh(SAFE_C, 0.22)} 100%)` }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", left: 14, right: 14, top: 20 + i * 22,
                  height: 8, borderRadius: 4, background: hexa(BONE, 0.4) }} />
              ))}
              <div style={{ position: "absolute", left: 96, top: 58, width: 20, height: 20,
                borderRadius: "50%", background: hexa(BONE, 0.62) }} />
            </div>
            {/* ⭐ IT CHECKS ITS OWN WORK — a sweep across the window on a loop, and
                every token it crosses is marked as it passes */}
            {s2 > 0.6 ? (() => {
              const sw = ((f - IN_AT[1] - 10) * 11) % (CW + 120);
              return (<>
                <div style={{ position: "absolute", left: CX + 16 + sw - 60, top: CY + 16,
                  width: 26, height: CH - 32, zIndex: 25, borderRadius: 13,
                  background: `linear-gradient(90deg, ${hexa(SAFE_C, 0)} 0%, ${hexa(SAFE_C, 0.72)} 60%, ${hexa(SAFE_C, 0)} 100%)` }} />
                {Array.from({ length: 11 }, (_, i) => {
                  const tx = 4 + (i % 7) * 80;
                  const hit = Math.max(0, 1 - Math.abs(tx + 34 - (sw - 60)) / 90);
                  if (hit <= 0.02) return null;
                  return <div key={"ck" + i} style={{ position: "absolute", zIndex: 26,
                    left: CX + 16 + tx, top: CY + 16 + CH - 144,
                    width: 70, height: 62, borderRadius: 8,
                    background: hexa(SAFE_C, hit * 0.66) }} />;
                })}
              </>);
            })() : null}
            {/* 2 · CHECK ITS OWN WORK — a tag, smaller still */}
            <div style={{ position: "absolute", zIndex: 24,
              left: CX + 290 - (1 - s2) * 560, top: CY + CH - 196 - (1 - s2) * 150,
              width: 132, height: 104, borderRadius: 10,
              transform: `rotate(${(1 - s2) * 26}deg)`,
              background: `linear-gradient(150deg, ${mxh(SAFE_C, 0.34)} 0%, ${dkh(SAFE_C, 0.2)} 100%)` }}>
              <div style={{ position: "absolute", left: 22, top: 40, width: 26, height: 9,
                borderRadius: 5, background: hexa(BONE, 0.72), transform: "rotate(46deg)" }} />
              <div style={{ position: "absolute", left: 36, top: 32, width: 44, height: 9,
                borderRadius: 5, background: hexa(BONE, 0.72), transform: "rotate(-42deg)" }} />
            </div>
            <FillGauge x={CX + CW + 42} top={CY + 10} bot={CY + CH - 10} used={used}
              f={f} ticks={TICKS} at={[0, 0, 0, 0, 0]} />
            <div style={{ position: "absolute", left: CX + CW + 30, top: CY + CH - 10 - (CH - 20) * 0.26,
              width: 100, height: 10, borderRadius: 5, background: mxh(SAFE_C, 0.1) }} />
          </div>);
        })()}
        <Hero f={f} x={CFX} y={CFY} size={CSZ} costume={{ constr: 1 }} gaze={0.66} act={3}
          drive={0} strain={0.16} cheer={Math.min(1, s2 * 0.8)} />
        <Forearm x0={shX} y0={shY} x1={CX + 40 - (1 - Math.max(s1, s2)) * 240} y1={CY + 400}
          w={29} c="#C4674A" z={62} />
        {IN_AT.map((pf, i) => (
          <Ring key={"ir" + i} x={CX + (i ? 356 : 156)} y={CY + CH - 150} f={f} at={pf + 8}
            c={hexa(SAFE_C, 0.7)} z={68} s={0.42} dur={12} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={56} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={46} z={88} kind="wall" />
    </Scene>
  );
};

/** tip 1, both cuts, with the VO from its real position in the take */
export const BodyTip1: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={258} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={258} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={128}><E2 dur={128} /></Sequence>
          <Sequence from={128} durationInFrames={155}><E3 dur={155} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="1 · THE COSTUME" hot="COSTS YOU THE WINDOW" f={f + 12} />
    </AbsoluteFill>
  );
};
