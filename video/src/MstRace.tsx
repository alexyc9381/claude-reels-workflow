import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { inter } from "./fonts";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, Forearm, settle, Tile, R, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, PAPER, VELVET,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Occluder, Cone } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   TIP 1 — SAME JOB, TWO LANES.  (seventh build)

   ⛔ Rejected so far: the costume, the scroll, the slot bar, and the stage act.
      The stage was the closest and still wrong, and it is worth naming why: "act
      like an expert" -> an actor on a stage is a PUN, not a mapping. The window
      vanished from the picture entirely, so the claim ("you are wasting your
      context window") had nothing on screen to be true about.

   ⭐⭐⭐ THE CLAIM IS A COMPARISON, SO THE PICTURE IS A COMPARISON. Two lanes, the
      same job, a finish line. Up top, Claude loaded with the persona — gown,
      mortarboard, a trailing tail of it — heaving and barely moving. Below, plain
      Claude carrying only a map and a checklist, going straight past him. The
      window is the LANE: you can see exactly what the persona is spending.

   ⭐ It cannot go quiet — both lanes are travelling the whole time, the ground
      streams, and the finish line arrives. And it splits cleanly across the VO:
      S2 is the loaded lane getting nowhere, S3 is the light one finishing.
   ========================================================================= */

const SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

const LY = [300, 560];            /* the two lane floors */
const X0 = 150, XF = 900;         /* start gate, finish line */

/** the track: two lanes, a start gate, a finish, and ground that streams */
const Track: React.FC<{ f: number; w: World; scroll: number; lit: number; shiftX?: number }> =
  ({ f, w, scroll, lit, shiftX = 0 }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.42)} 0%, ${dkh(w.b3, 0.62)} 100%)` }} />
  {LY.map((y, k) => (
    <React.Fragment key={"ln" + k}>
      {/* the lane bed */}
      <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 96, zIndex: 10,
        background: `linear-gradient(180deg, ${dkh(w.ground, 0.16)} 0%, ${dkh(w.ground2, 0.42)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 7, zIndex: 11,
        background: k ? hexa(SAFE_C, 0.5) : hexa(RED, 0.5) }} />
      {/* ⛔ STREAMING A FLAT COLOUR BAND REPAINTS NOTHING. Locking the camera only
          works if the world has FURNITURE to sweep past — the lift had landings, rails
          and rungs; this had twelve small dashes, about 1% of the panel, which is why
          the locked version measured WORSE than the moving one. Big markers, banners
          and chevrons now, so the track itself carries the speed. */}
      {Array.from({ length: 9 }, (_, i) => {
        const sx = (((i * 168 - scroll * (k ? 1 : 0.14)) % 1512) + 1512) % 1512 - 260;
        return (
          <React.Fragment key={"fx" + i}>
            <div style={{ position: "absolute", zIndex: 9, left: sx, top: y - 132,
              width: 26, height: 132, background: dkh(w.b1, 0.3) }} />
            <div style={{ position: "absolute", zIndex: 9, left: sx - 12, top: y - 148,
              width: 96, height: 30, borderRadius: 5,
              background: k ? dkh(SAFE_C, 0.44) : dkh(RED, 0.44) }} />
            <div style={{ position: "absolute", zIndex: 13, left: sx + 30, top: y + 40,
              width: 108, height: 26, borderRadius: 6, transform: "skewX(-26deg)",
              background: hexa(BONE, 0.2) }} />
            <div style={{ position: "absolute", zIndex: 13, left: sx - 54, top: y + 40,
              width: 108, height: 26, borderRadius: 6, transform: "skewX(-26deg)",
              background: hexa(BONE, 0.1) }} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  ))}
  {/* the start gate */}
  <div style={{ position: "absolute", left: X0 - 26 + shiftX, top: 250, width: 16, height: 420,
    zIndex: 20, background: dkh(STEEL, 0.4) }} />
  {/* ⭐ the finish, chequered, and it is on screen from frame 0 */}
  {[0, 1].map(k => (
    <div key={"fin" + k} style={{ position: "absolute", left: XF + shiftX, top: LY[k] - 24,
      width: 56, height: 144, zIndex: 20, overflow: "hidden",
      background: dkh(BONE, 0.1) }}>
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: (i % 2) * 28, top: Math.floor(i / 2) * 24,
          width: 28, height: 24, background: hexa(INK, 0.86) }} />
      ))}
    </div>
  ))}
  <Cone x={506} y={-30} top={220} bot={900} len={800} c={lit > 0.5 ? "#8FD7B0" : w.key}
    o={0.2} z={8} f={f} sway={0.3} />
</>);

/* ---- S2 · THE LOADED LANE GETS NOWHERE (124f) ---------------------------- */
export const RaceA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const HEAVE = [8, 30, 52, 74, 96];              /* five heaves, almost no ground */
  const gain = HEAVE.reduce((a, h, i) =>
    f >= h ? E(f, h, h + 9, i * 0.2, (i + 1) * 0.2, OUT) : a, 0);
  const lk = HEAVE.reduce((a, h) =>
    f >= h && f < h + 10 ? Math.max(a, Math.abs(settle(f - h, 8, 2.2, 7))) : a, 0);
  const hx = X0 + gain * 130;                      /* 130px in four seconds */
  const strain = 0.5 + gain * 0.5;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.1]} vig={0.62} glow={hexa(RED, 0.2)}>
      <Cam s={1} x={lk * 0.5} y={lk} z={16}>
        <Track f={f} w={w} scroll={gain * 130} lit={0} />
        {/* ⭐ THE LOADED ONE — gown, board, and a tail of persona dragging behind */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"tl" + i} style={{ position: "absolute", zIndex: 40 - i,
            left: hx - 132 - i * 86 + Math.sin(f / 5.5 + i * 1.1) * (14 + i * 7),
            top: LY[0] - 66 + Math.sin(f / 4.2 + i) * (16 + i * 6),
            width: 104, height: 74, borderRadius: 10,
            transform: `rotate(${Math.sin(f / 5 + i * 1.4) * (18 + i * 5)}deg)`,
            background: `linear-gradient(160deg, ${mxh(VELVET, 0.1)} 0%, ${dkh(VELVET, 0.34)} 100%)` }} />
        ))}
        <Hero f={f} x={hx} y={LY[0] + 8} size={252} z={46} costume={{ prof: 1 }}
          gaze={0.66} act={3} drive={0} strain={strain} stern={1} shock={gain * 0.7}
          tint={mix3("#D2724E", "#C4392A", gain)} />
        {f > 4 && Array.from({ length: 7 }, (_, i) => (
          <div key={"ef" + i} style={{ position: "absolute", zIndex: 60, borderRadius: 2,
            left: hx - 70 + ((i * 41 + f * 8) % 150), top: LY[0] - 120 + ((i * 27 + f * 5) % 46),
            width: 8 + rnd(i, 5) * 9, height: 4,
            background: hexa(mix3(EMBER, GOLD, rnd(i, 6)), 0.8) }} />
        ))}
        {/* the other lane, still waiting */}
        <Hero f={f} x={X0 + 30} y={LY[1] + 8} size={252} z={46} costume={{ constr: 1 }}
          gaze={0.2} act={0} drive={0} strain={0} ph={1.4} />
        {/* ⭐ how far each has actually got, as a bar under its own lane */}
        {[gain * 0.17, 0].map((v, k) => (
          <div key={"pb" + k} style={{ position: "absolute", zIndex: 30,
            left: X0, top: LY[k] + 104, width: (XF - X0) * v, height: 16, borderRadius: 8,
            background: k ? hexa(SAFE_C, 0.8) : hexa(RED, 0.8) }} />
        ))}
        {HEAVE.map((h, i) => (
          <Puff key={"p" + i} x={hx - 60} y={LY[0] + 60} f={f} at={h + 6} n={9} s={0.9} z={58} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S3 · THE LIGHT ONE GOES PAST (150f) --------------------------------- */
export const RaceB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const GO = 10, WIN = 104;
  const HOLDX = 470;          /* he stays here; the track moves */
  const run = f < GO ? 0 : E(f, GO, WIN, 0, 1, IO);
  const loaded = 0.17 + E(f, 0, dur, 0, 0.07, LIN);   /* he is still going nowhere */
  const lk = (f >= GO && f < GO + 8 ? Math.abs(settle(f - GO, 6, 2.2, 7)) : 0)
    + (f >= WIN && f < WIN + 14 ? Math.abs(settle(f - WIN, 12, 2.2, 7)) : 0);
  const world = run * 1580;                     /* ⭐ 15px/frame of ground, not 7 */
  const px = HOLDX;
  const hx = X0 + loaded * (XF - X0) - world;   /* the loaded one falls away behind */

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.12]} vig={0.6} glow={hexa(SAFE_C, 0.2)}>
      <Cam s={1} x={lk * 0.5} y={lk} z={16}>
        <Track f={f} w={w} scroll={world} lit={run > 0.5 ? 1 : 0} shiftX={-world} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"tl" + i} style={{ position: "absolute", zIndex: 40 - i,
            left: hx - 132 - i * 86, top: LY[0] - 66 + Math.sin(f / 9 + i) * 5,
            width: 104, height: 74, borderRadius: 10,
            transform: `rotate(${Math.sin(f / 11 + i * 1.4) * 7}deg)`,
            background: `linear-gradient(160deg, ${mxh(VELVET, 0.1)} 0%, ${dkh(VELVET, 0.34)} 100%)` }} />
        ))}
        <Hero f={f} x={hx} y={LY[0] + 8} size={252} z={46} costume={{ prof: 1 }}
          gaze={0.66} act={3} drive={0} strain={1} stern={1} shock={0.7}
          tint={mix3("#D2724E", "#C4392A", 1)} />

        {/* ⭐ THE LIGHT ONE — a map and a checklist, and it just goes */}
        <Hero f={f} x={px} y={LY[1] + 8} size={252} z={48} costume={{ constr: 1 }}
          gaze={0.72} act={run > 0.02 ? 1 : 3} drive={run > 0.02 ? 0.36 : 0}
          strain={0} cheer={f >= WIN ? 1 : 0} ph={1.4} />
        {[[-96, 0], [96, 26]].map((o, k) => (
          <div key={"cd" + k} style={{ position: "absolute", zIndex: 50,
            left: px + o[0] - 46, top: LY[1] - 118 + o[1] + Math.sin(f / 8 + k * 2) * 6,
            width: 92, height: 70, borderRadius: 9,
            transform: `rotate(${Math.sin(f / 10 + k) * 8}deg)`,
            background: `linear-gradient(150deg, ${mxh(SAFE_C, 0.3)} 0%, ${dkh(SAFE_C, 0.24)} 100%)` }}>
            {k === 0 ? [0, 1, 2].map(i => (
              <div key={i} style={{ position: "absolute", left: 12, right: 12, top: 14 + i * 16,
                height: 6, borderRadius: 3, background: hexa(BONE, 0.44) }} />
            )) : (<>
              <div style={{ position: "absolute", left: 20, top: 34, width: 24, height: 9,
                borderRadius: 5, background: hexa(BONE, 0.85), transform: "rotate(46deg)" }} />
              <div style={{ position: "absolute", left: 32, top: 26, width: 40, height: 9,
                borderRadius: 5, background: hexa(BONE, 0.85), transform: "rotate(-42deg)" }} />
            </>)}
          </div>
        ))}
        {/* the two bars, side by side, telling the whole story */}
        {[loaded, run * 0.96].map((v, k) => (
          <div key={"pb" + k} style={{ position: "absolute", zIndex: 30,
            left: X0, top: LY[k] + 104, width: (XF - X0) * v, height: 16, borderRadius: 8,
            background: k ? hexa(SAFE_C, 0.85) : hexa(RED, 0.8) }} />
        ))}
        <Ring x={HOLDX} y={LY[1] + 40} f={f} at={WIN} c={hexa(SAFE_C, 0.9)} z={70} s={1.3} dur={20} />
        <Puff x={HOLDX} y={LY[1] + 60} f={f} at={WIN} n={18} s={1.3} z={68} />
        {f >= WIN && Array.from({ length: 12 }, (_, i) => {
          const t = ((f - WIN) / 26 + i * 0.08) % 1;
          return <div key={"cf" + i} style={{ position: "absolute", zIndex: 66,
            left: HOLDX - 150 + rnd(i, 2) * 300, top: LY[1] - 180 + t * 300,
            width: 16, height: 22, borderRadius: 4, opacity: (1 - t) * 0.9,
            transform: `rotate(${t * 420}deg)`, background: mix3(SAFE_C, GOLD, rnd(i, 3)) }} />;
        })}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const RacePair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo_tight.wav")} volume={LEVELS.DIALOGUE} startFrom={245} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={245} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={124}><RaceA dur={124} /></Sequence>
          <Sequence from={124} durationInFrames={150}><RaceB dur={150} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big={f < 124 ? "1 · DROP THE PERSONA" : "SEND SOURCES INSTEAD"}
        hot={f < 124 ? "FREES YOUR WINDOW" : "+ MAKE IT SELF-CHECK"} f={f + 12} />
    </AbsoluteFill>
  );
};
