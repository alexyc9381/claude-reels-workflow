import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, Forearm, settle, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, OXIDE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Occluder, Cone } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 3 — THE KEYRING.  S8 + S9.

   S8 · "Usually Claude loads ALL of your connectors into the context with every
        message, so it burns thousands of tokens per session."
        ⭐ A JANITOR'S KEYRING. He needs ONE door. Keys keep being clipped on —
        one per connector, never removed — until the ring is bigger than he is
        and drags him to the floor. "You carry all of them to use one" is not a
        metaphor for the mechanism, it IS the mechanism.

   S9 · "switch tool access to load tools when needed, so you only pay for tools
        when they're actually used."
        ⭐ THE SAME RING. Keys fly off it onto a board, one at a time, until three
        are left — and the door he could never reach opens.

   Every rule the last twenty rounds produced is applied from the first frame:
     · ONE recognisable object, named in a common noun
     · red = what it is costing you, green = cleared; the thing he HOLDS is neutral
     · ⭐ THE CLIMAX IS AT THE END OF EACH CUT and the whole cut builds to it
       ([[feedback_scene_needs_an_arc]]) — the tip-2 payoff cost four rejected
       back halves by landing at 0.7s of 3.6
     · EVENTS, not texture: every beat is a thing arriving or leaving
     · the LARGEST object must be the one that moves
     · a ratchet, not a smooth slide
   ⛔ Its own location again — a service corridor, not the crossroads or the panel.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

const FLOOR = 726;

/** the corridor both cuts stand in */
const Corridor: React.FC<{ f: number; w: World; open?: number }> = ({ f, w, open = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.42)} 0%, ${dkh(w.b3, 0.6)} 100%)` }} />
  {/* the receding wall panels — three planes without a single loose slab */}
  {[0, 1, 2].map(i => (
    <div key={"pl" + i} style={{ position: "absolute", zIndex: 3 + i,
      left: 60 + i * 66, right: 60 + i * 66, top: 70 + i * 40, bottom: 66 + i * 26,
      borderRadius: 6, background: dkh(w.b2, 0.44 - i * 0.08) }} />
  ))}
  {Array.from({ length: 6 }, (_, i) => (
    <div key={"rb" + i} style={{ position: "absolute", zIndex: 8, left: 40 + i * 168, top: 96,
      width: 26, height: FLOOR - 96, borderRadius: 4, background: dkh(w.b1, 0.3) }} />
  ))}
  <Cone x={506} y={-20} top={190} bot={820} len={760} c={open > 0.3 ? "#8FD7B0" : w.key}
    o={0.24 + open * 0.14} z={10} f={f} sway={0.3} />
  <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, zIndex: 12,
    background: `linear-gradient(180deg, ${dkh(w.ground, 0.2)} 0%, ${dkh(w.ground2, 0.46)} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, height: 9, zIndex: 13,
    background: dkh(w.lip, 0.1) }} />
</>);

/** one key, drawn as a key — a bow, a shaft and a bit */
const Key: React.FC<{ x: number; y: number; s: number; rot: number; live: boolean;
  z?: number; o?: number }> = ({ x, y, s, rot, live, z = 40, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y - 9 * s, width: 62 * s, height: 18 * s,
    zIndex: z, opacity: o, transformOrigin: "6% 50%", transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 18 * s, height: 18 * s,
      borderRadius: "50%", border: `${4.5 * s}px solid ${live ? dkh(SAFE_C, 0.1) : dkh(LIVE_C, 0.16)}` }} />
    <div style={{ position: "absolute", left: 15 * s, top: 6 * s, width: 40 * s, height: 6 * s,
      borderRadius: 3 * s, background: live ? mxh(SAFE_C, 0.12) : mxh(LIVE_C, 0.06) }} />
    <div style={{ position: "absolute", left: 44 * s, top: 10 * s, width: 6 * s, height: 8 * s,
      background: live ? dkh(SAFE_C, 0.06) : dkh(LIVE_C, 0.1) }} />
    <div style={{ position: "absolute", left: 53 * s, top: 10 * s, width: 5 * s, height: 6 * s,
      background: live ? dkh(SAFE_C, 0.06) : dkh(LIVE_C, 0.1) }} />
  </div>
);

/** the door he needs — one lock, and it only ever opens in S9 */
const Door: React.FC<{ open: number; z?: number }> = ({ open, z = 30 }) => (
  <>
    <div style={{ position: "absolute", left: 742, top: 300, width: 244, height: FLOOR - 300,
      borderRadius: "8px 8px 0 0", zIndex: z, background: dkh(STEEL, 0.5) }} />
    <div style={{ position: "absolute", left: 758, top: 316, width: 212, height: FLOOR - 322,
      borderRadius: 6, zIndex: z + 1, overflow: "hidden",
      background: `linear-gradient(100deg, ${dkh(BRASS, 0.5)} 0%, ${dkh(BRASS, 0.66)} 100%)` }}>
      {/* what is behind it, once it is open */}
      <div style={{ position: "absolute", inset: 0, opacity: open,
        background: `linear-gradient(180deg, ${mxh(SAFE_C, 0.5)} 0%, ${dkh(SAFE_C, 0.1)} 100%)` }} />
      <div style={{ position: "absolute", left: 14, top: 20, right: 14, height: 3,
        background: hexa(BONE, 0.14) }} />
    </div>
    {/* the leaf, swinging */}
    <div style={{ position: "absolute", left: 758, top: 316, width: 212, height: FLOOR - 322,
      borderRadius: 6, zIndex: z + 2, transformOrigin: "0% 50%",
      transform: `perspective(900px) rotateY(${-open * 76}deg)`,
      background: `linear-gradient(100deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.42)} 100%)` }}>
      <div style={{ position: "absolute", left: 22, top: 30, right: 22, height: 128,
        borderRadius: 4, background: hexa(INK, 0.16) }} />
      <div style={{ position: "absolute", left: 22, top: 186, right: 22, height: 128,
        borderRadius: 4, background: hexa(INK, 0.16) }} />
      <div style={{ position: "absolute", left: 168, top: 214, width: 26, height: 26,
        borderRadius: "50%", background: dkh(BRASS, 0.2) }} />
    </div>
  </>
);

/* ---- S8 · IT CARRIES ALL OF THEM (161f) ---------------------------------- */
export const KeysA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.depot;
  /* ⭐ seven arrivals, accelerating — a ratchet, and the ring is never lighter */
  const ADD = [8, 26, 42, 56, 68, 78, 87, 95, 102, 108];
  const CRASH = 124;
  const n = ADD.reduce((a, af) => (f >= af ? a + 1 : a), 0);
  const grow = ADD.reduce((a, af, i) =>
    f >= af ? E(f, af, af + 7, i / ADD.length, (i + 1) / ADD.length, OUT) : a, 0);
  const lk = ADD.reduce((a, af) =>
    f >= af && f < af + 10 ? Math.max(a, Math.abs(settle(f - af, 9.5, 2.2, 7))) : a, 0)
    + (f >= CRASH && f < CRASH + 14 ? Math.abs(settle(f - CRASH, 13, 2.2, 7)) : 0);
  const drop = f < CRASH ? 0 : E(f, CRASH, CRASH + 9, 0, 1, IN_Q);
  const RAD = 66 + grow * 292;   /* ⭐ it has to DOMINATE, not decorate */
  const turn = f * 2.9;          /* ⭐ it turns on his hand the whole time */
  const KEYS = 8 + n * 7;
  const RX = 470, RY = 300 + grow * 132 + f * 0.42 + drop * 170;   /* and never stops sagging */
  const CSZ = 300, CFY = FLOOR + 2 + drop * 30;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.3]} vig={0.66} glow={hexa(w.key, 0.24)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Corridor f={f} w={w} />
        <Door open={0} z={30} />
        {/* ⭐ THE RING — the largest object, and it is the one that grows */}
        <div style={{ position: "absolute", left: RX - RAD + lk * 7, top: RY - RAD + lk * 11,
          width: RAD * 2, height: RAD * 2, borderRadius: "50%", zIndex: 42,
          border: `${16 + grow * 12}px solid ${dkh(BRASS, 0.36)}` }} />
        {Array.from({ length: KEYS }, (_, i) => {
          const a = (i / KEYS) * 360 + turn;
          const rr = (a * Math.PI) / 180;
          const s = 1.16 + (i % 3) * 0.2;
          const jangle = Math.sin(f / 4.2 + i * 1.7) * 9;
          return <Key key={"k" + i} x={RX + lk * 7 + Math.cos(rr) * (RAD + 4)}
            y={RY + lk * 11 + Math.sin(rr) * (RAD + 4)} s={s} rot={a + jangle} live={false} z={41} />;
        })}
        {/* each arrival, dropping in from off the top */}
        {ADD.map((af, i) => {
          const t = f - af;
          if (t < -12 || t > 6) return null;
          const k = E(f, af - 12, af, 0, 1, IN_Q);
          return <Key key={"in" + i} x={RX - 30 + (i % 3) * 40} y={-110 + k * (RY - 40)}
            s={2.0} rot={k * 420} live={false} z={52} o={t > 0 ? Math.max(0, 1 - t / 6) : 1} />;
        })}
        {/* him, sagging under it — his arms stretch as it drags him down */}
        <Hero f={f} x={286} y={CFY} size={CSZ} z={60} costume={{ constr: 1 }}
          gaze={0.66} act={3} drive={0} strain={0.24 + grow * 0.7 + drop * 0.3}
          shock={drop * 0.9} />
        <Forearm x0={286 + CSZ * 0.32} y0={CFY - CSZ * 0.42} x1={RX - RAD + 18} y1={RY - RAD * 0.5}
          w={28} c="#C4674A" z={62} />
        {ADD.map((af, i) => (
          <Ring key={"ar" + i} x={RX} y={RY} f={f} at={af} c={hexa(LIVE_C, 0.6)} z={68}
            s={0.5 + i * 0.06} dur={11} />
        ))}
        <Ring x={RX} y={FLOOR - 20} f={f} at={CRASH} c={hexa(EMBER, 0.9)} z={70} s={1.9} dur={22} />
        <Puff x={RX} y={FLOOR - 10} f={f} at={CRASH} n={20} s={1.5} z={68} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S9 · ONLY THE ONES IT USES (154f) ----------------------------------- */
export const KeysB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.depot;
  /* the reverse ratchet — keys LEAVE, accelerating, and the door is the last beat */
  const OFF = [10, 24, 36, 46, 55, 63, 70, 76, 82, 87];
  const OPEN_AT = 104;
  const gone = OFF.reduce((a, of) => (f >= of ? a + 1 : a), 0);
  const shed = OFF.reduce((a, of, i) =>
    f >= of ? E(f, of, of + 7, (i + 1) / OFF.length, (i + 2) / OFF.length, OUT) : a, 1 / OFF.length);
  const lk = OFF.reduce((a, of) =>
    f >= of && f < of + 9 ? Math.max(a, Math.abs(settle(f - of, 8.5, 2.2, 7))) : a, 0)
    + (f >= OPEN_AT && f < OPEN_AT + 12 ? Math.abs(settle(f - OPEN_AT, 8, 2.2, 7)) : 0);
  const open = f < OPEN_AT ? 0 : E(f, OPEN_AT, dur - 8, 0, 1, OUT);
  const RAD = 358 - shed * 292;
  const turn = f * 2.9;
  const KEYS = Math.max(3, 78 - gone * 7);
  const RX = 470, RY = 432 - shed * 132 - f * 0.3;       /* it rises as it lightens */
  const CSZ = 300, CFY = FLOOR + 2;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.26]} vig={0.62} glow={hexa(SAFE_C, 0.2)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Corridor f={f} w={w} open={open} />
        <Door open={open} z={30} />
        {/* ⭐ THE BOARD — where the ones it is not using go */}
        <div style={{ position: "absolute", left: 96, top: 214, width: 268, height: 300,
          borderRadius: 10, zIndex: 26, background: dkh(WOODT, 0.44) }} />
        <div style={{ position: "absolute", left: 110, top: 228, width: 240, height: 272,
          borderRadius: 6, zIndex: 27, background: dkh(WOODT, 0.28) }} />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"hk" + i} style={{ position: "absolute", zIndex: 28,
            left: 136 + (i % 4) * 62, top: 258 + Math.floor(i / 4) * 76,
            width: 10, height: 26, borderRadius: 5, background: dkh(STEEL, 0.3) }} />
        ))}
        {OFF.map((of, i) => {
          if (f < of + 6) return null;
          return <Key key={"hung" + i} x={132 + (i % 4) * 62} y={296 + Math.floor(i / 4) * 76}
            s={0.82} rot={78} live z={29} />;
        })}
        {/* the ones in flight — each one a travelling event */}
        {OFF.map((of, i) => {
          const t = f - of;
          if (t < 0 || t > 8) return null;
          const k = t / 8;
          return <Key key={"fly" + i} x={RX - k * (RX - 138 - (i % 4) * 62)}
            y={RY - k * (RY - 296 - Math.floor(i / 4) * 76) - Math.sin(k * Math.PI) * 120}
            s={1.7 - k * 0.6} rot={k * 300} live={k > 0.5} z={54} />;
        })}
        {/* the ring, lighter every beat */}
        <div style={{ position: "absolute", left: RX - RAD + lk * 7, top: RY - RAD + lk * 11,
          width: RAD * 2, height: RAD * 2, borderRadius: "50%", zIndex: 42,
          border: `${28 - shed * 12}px solid ${dkh(BRASS, 0.36)}` }} />
        {Array.from({ length: KEYS }, (_, i) => {
          const a = (i / KEYS) * 360 + turn;
          const rr = (a * Math.PI) / 180;
          const jangle = Math.sin(f / 4.2 + i * 1.7) * 9;
          return <Key key={"k" + i} x={RX + lk * 7 + Math.cos(rr) * (RAD + 4)}
            y={RY + lk * 11 + Math.sin(rr) * (RAD + 4)} s={1.16 + (i % 3) * 0.2} rot={a + jangle}
            live={KEYS <= 4} z={41} />;
        })}
        <Hero f={f} x={286 + (f > 88 ? E(f, 88, OPEN_AT, 0, 250, IO) : 0) + open * 150}
          y={CFY} size={CSZ} z={60} costume={{ constr: 1 }}
          gaze={0.7} act={f > 88 ? 1 : 3} drive={f > 88 && open < 0.1 ? 0.32 : 0}
          strain={0.6 - shed * 0.55} cheer={Math.min(1, open * 1.2)} />
        <Forearm x0={286 + (f > 88 ? E(f, 88, OPEN_AT, 0, 250, IO) : 0) + open * 150 + CSZ * 0.32} y0={CFY - CSZ * 0.42}
          x1={RX - RAD + 14} y1={RY - RAD * 0.5} w={28} c="#C4674A" z={62} />
        {OFF.map((of, i) => (
          <Ring key={"or" + i} x={138 + (i % 4) * 62} y={296 + Math.floor(i / 4) * 76} f={f}
            at={of + 7} c={hexa(SAFE_C, 0.6)} z={68} s={0.28} dur={10} />
        ))}
        <Ring x={864} y={500} f={f} at={OPEN_AT} c={hexa(SAFE_C, 0.95)} z={70} s={1.7} dur={22} />
        <Puff x={846} y={560} f={f} at={OPEN_AT} n={16} s={1.3} z={68} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={54} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const KeysPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={908} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={908} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={161}><KeysA dur={161} /></Sequence>
          <Sequence from={161} durationInFrames={154}><KeysB dur={154} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="3 · LOAD TOOLS" hot="ONLY WHEN NEEDED" f={f + 12} />
    </AbsoluteFill>
  );
};
