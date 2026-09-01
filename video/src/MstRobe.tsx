import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
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
   TIP 1 — THE COSTUME.  S2 + S3.

   S2 · "stop telling Claude to act like an expert — you're just wasting your
        context window"
        ⭐ A SITUATION, not a quantity ([[feedback_draw_a_machine_people_know]]):
        he DRESSES IT UP for a simple job. Gown, mortarboard, sash, medal,
        monocle, scroll — six arrivals, each one an event, each one heavier, and
        by the end it cannot lift its own arms. The window gauge beside it is the
        receipt, not the picture.

   S3 · "instead tell it where the sources are and to check its own work"
        ⭐ The same sprite. Every piece is torn off in four frames, and the two
        things that replace them are a MAP and a CHECKLIST — and it RUNS. The
        climax is at the end and it is movement, so the pair reads as
        weighed-down / freed rather than as full / empty (which is tip 3's shape).
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);
const FLOOR = 712, CX = 470;

/** the fitting room: a mirror, a rail, a dais */
const Fitting: React.FC<{ f: number; w: World; refl?: React.ReactNode }> = ({ f, w, refl }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.36)} 0%, ${dkh(w.b3, 0.58)} 100%)` }} />
  {[0, 1, 2].map(i => (
    <div key={"pn" + i} style={{ position: "absolute", zIndex: 3 + i,
      left: 40 + i * 58, right: 40 + i * 58, top: 56 + i * 34, bottom: 56 + i * 22,
      borderRadius: 8, background: dkh(w.b2, 0.4 - i * 0.07) }} />
  ))}
  {/* the mirror behind him */}
  <div style={{ position: "absolute", left: CX - 214, top: 96, width: 428, height: 470,
    borderRadius: "214px 214px 10px 10px", zIndex: 8, background: dkh(BRASS, 0.42) }} />
  <div style={{ position: "absolute", left: CX - 196, top: 114, width: 392, height: 440,
    borderRadius: "196px 196px 6px 6px", zIndex: 9, overflow: "hidden",
    background: `linear-gradient(150deg, ${dkh(w.b1, 0.1)} 0%, ${dkh(w.b2, 0.34)} 100%)` }}>
    {refl}
    {/* the sheen that says GLASS, travelling so the mirror is never a flat plate */}
    <div style={{ position: "absolute", top: -60, bottom: -60, width: 120,
      left: ((f * 3.4) % 640) - 200, transform: "skewX(-16deg)",
      background: `linear-gradient(90deg, ${hexa(BONE, 0)} 0%, ${hexa(BONE, 0.09)} 50%, ${hexa(BONE, 0)} 100%)` }} />
  </div>
  {/* the rail the regalia comes off */}
  <div style={{ position: "absolute", left: 760, top: 172, width: 250, height: 16,
    borderRadius: 8, zIndex: 10, background: dkh(STEEL, 0.34) }} />
  {[0, 1, 2, 3].map(i => (
    <div key={"hg" + i} style={{ position: "absolute", left: 786 + i * 54, top: 182, width: 9,
      height: 44, borderRadius: 5, zIndex: 10, background: dkh(STEEL, 0.28) }} />
  ))}
  <Cone x={CX} y={-20} top={190} bot={760} len={740} c={w.key} o={0.24} z={11} f={f} sway={0.3} />
  {/* the dais he stands on */}
  <div style={{ position: "absolute", left: CX - 200, top: FLOOR - 34, width: 400, height: 34,
    borderRadius: 6, zIndex: 24, background: dkh(WOODT, 0.4) }} />
  <div style={{ position: "absolute", left: CX - 200, top: FLOOR - 40, width: 400, height: 10,
    borderRadius: 5, zIndex: 25, background: mxh(WOODT, 0.16) }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: FLOOR, bottom: 0, zIndex: 12,
    background: `linear-gradient(180deg, ${dkh(w.ground, 0.18)} 0%, ${dkh(w.ground2, 0.44)} 100%)` }} />
</>);

/** ⭐ the regalia, drawn as things rather than blocks — six distinct silhouettes */
const Piece: React.FC<{ k: number; t: number; z: number; sway?: number }> = ({ k, t, z, sway = 0 }) => {
  const dropX = (1 - t) * (k % 2 ? 520 : -520);
  const dropY = (1 - t) * -300;
  const spin = (1 - t) * (k % 2 ? 220 : -220);
  const st: React.CSSProperties = { position: "absolute", zIndex: z,
    transformOrigin: "50% 8%",
    transform: `translate(${dropX + sway * (1 + (k % 3) * 0.4)}px, ${dropY}px) rotate(${spin + sway * 0.32 * (1 + (k % 2))}deg)`,
    opacity: Math.min(1, t * 4) };
  if (k === 0) return (  /* the gown */
    <div style={{ ...st, left: CX - 150, top: 392, width: 300, height: 250 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "40px 40px 14px 14px",
        background: `linear-gradient(160deg, ${mxh(VELVET, 0.16)} 0%, ${dkh(VELVET, 0.3)} 100%)` }} />
      <div style={{ position: "absolute", left: 118, top: 0, width: 64, height: 250,
        background: hexa(INK, 0.18) }} />
      {[16, 220].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: 30, width: 64, height: 176,
          borderRadius: 20, background: dkh(VELVET, 0.16) }} />
      ))}
    </div>
  );
  if (k === 1) return (  /* the mortarboard */
    <div style={{ ...st, left: CX - 132, top: 236, width: 264, height: 78 }}>
      <div style={{ position: "absolute", left: 0, top: 22, width: 264, height: 26,
        borderRadius: 5, transform: "rotate(-3deg)", background: dkh(INK, -0.04) }} />
      <div style={{ position: "absolute", left: 78, top: 40, width: 108, height: 38,
        borderRadius: "0 0 10px 10px", background: dkh(INK, 0.06) }} />
      <div style={{ position: "absolute", left: 196, top: 40, width: 9, height: 74,
        background: GOLD }} />
      <div style={{ position: "absolute", left: 186, top: 108, width: 30, height: 34,
        borderRadius: 6, background: dkh(GOLD, 0.14) }} />
    </div>
  );
  if (k === 2) return (  /* the sash */
    <div style={{ ...st, left: CX - 120, top: 404, width: 240, height: 216 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 268, height: 56,
        borderRadius: 8, transform: "rotate(40deg)", transformOrigin: "0% 50%",
        background: `linear-gradient(180deg, ${mxh(GOLD, 0.2)} 0%, ${dkh(GOLD, 0.24)} 100%)` }} />
      <div style={{ position: "absolute", left: 150, top: 150, width: 66, height: 66,
        borderRadius: "50%", background: dkh(GOLD, 0.3) }} />
    </div>
  );
  if (k === 3) return (  /* the medal */
    <div style={{ ...st, left: CX - 34, top: 452, width: 68, height: 128 }}>
      <div style={{ position: "absolute", left: 14, top: 0, width: 40, height: 58,
        clipPath: "polygon(0 0, 100% 0, 78% 100%, 22% 100%)", background: dkh(RED, 0.14) }} />
      <div style={{ position: "absolute", left: 0, top: 52, width: 68, height: 68,
        borderRadius: "50%", background: `linear-gradient(160deg, ${mxh(GOLD, 0.3)} 0%, ${dkh(GOLD, 0.22)} 100%)` }} />
      <div style={{ position: "absolute", left: 20, top: 72, width: 28, height: 28,
        borderRadius: "50%", background: dkh(GOLD, 0.4) }} />
    </div>
  );
  if (k === 4) return (  /* the monocle */
    <div style={{ ...st, left: CX + 22, top: 330, width: 150, height: 170 }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 86, height: 86,
        borderRadius: "50%", border: `9px solid ${dkh(GOLD, 0.2)}`,
        background: hexa(BONE, 0.14) }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 76 + i * 9, top: 78 + i * 12,
          width: 12, height: 12, borderRadius: "50%", background: dkh(GOLD, 0.24) }} />
      ))}
    </div>
  );
  return (              /* the scroll */
    <div style={{ ...st, left: CX - 210, top: 470, width: 200, height: 78 }}>
      <div style={{ position: "absolute", left: 16, top: 8, width: 168, height: 62,
        borderRadius: 6, background: mxh(PAPER, 0.0) }} />
      {[0, 172].map((x, i) => (
        <div key={i} style={{ position: "absolute", left: x, top: 0, width: 30, height: 78,
          borderRadius: 15, background: dkh(WOODT, 0.24) }} />
      ))}
      <div style={{ position: "absolute", left: 84, top: 0, width: 26, height: 78,
        background: hexa(RED, 0.6) }} />
    </div>
  );
};

/** the window gauge — red is what the costume is spending */
const Win: React.FC<{ used: number; f: number; ticks: number }> = ({ used, f, ticks }) => (<>
  <div style={{ position: "absolute", left: 118, top: 168, width: 108, height: 452,
    borderRadius: 14, zIndex: 26, background: dkh(STEEL, 0.46) }} />
  <div style={{ position: "absolute", left: 130, top: 180, width: 84, height: 428,
    borderRadius: 10, zIndex: 27, background: dkh(STEEL, 0.7) }} />
  <div style={{ position: "absolute", left: 138, top: 188, width: 68,
    height: Math.max(0, 412 * (1 - used)), borderRadius: 8, zIndex: 28,
    background: `linear-gradient(180deg, ${dkh(SAFE_C, 0.3)} 0%, ${mxh(SAFE_C, 0.12)} 100%)` }} />
  <div style={{ position: "absolute", left: 138, top: 188 + 412 * (1 - used), width: 68,
    height: 412 * used, borderRadius: 8, zIndex: 28, overflow: "hidden",
    background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.16)} 0%, ${dkh(LIVE_C, 0.2)} 100%)` }}>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: -10, top: ((f * 11 + i * 44) % 264) - 20,
        width: 100, height: 20, background: hexa(BONE, 0.28), transform: "skewY(-16deg)" }} />
    ))}
  </div>
  {[0, 1, 2, 3, 4, 5].map(i => (
    <div key={"tk" + i} style={{ position: "absolute", left: 232, top: 566 - i * 76,
      width: 46, height: 15, borderRadius: 4, zIndex: 29,
      background: i < ticks ? LIVE_C : dkh(MUTE, 0.55) }} />
  ))}
</>);

/* ⛔⛔⛔ THE COSTUME VERSION IS BINNED. *"I don't understand what you mean by dressing it
   up — it doesn't look properly fitted and I don't even see him after those things are
   put on."* All true, and both faults were mine: the regalia was positioned in ABSOLUTE
   panel coords so it never tracked the sprite (nothing could fit), and six opaque layers
   on a 330px figure buries the only character in the reel. It also measured 5.63 STATIC
   through three passes, because a figure standing still wearing things is a PORTRAIT and
   a portrait has no travel in it.

   ⭐⭐⭐ THE SCROLL FIXES ALL THREE AT ONCE. He HOLDS the credentials instead of wearing
   them — nothing has to fit, and his head and face are never covered — and a scroll
   unspooling is continuous travel by construction, the same property that made the tool
   avalanche work first try. It is the same claim: this is the costume, and you are
   paying for every inch of it. */
/* ⛔⛔⛔ SIXTH BUILD OF TIP 1. Rejected so far: the costume (six layers, he vanished under
   them), the scroll ("we can't have papers"), and the slot bar with the mortarboard
   ("not good whatsoever"). All three were DIAGRAMS of the claim.

   ⭐⭐⭐ THE BEAT THAT JUST LANDED IN THIS REEL IS CLAUDE SPRITES DOING THE THING (the
   three at 8s). So tip 1 is that, and it takes the line literally: you told it to ACT
   like an expert, so it ACTS. He is on a stage in a gown, taking bows, working the
   crowd, milking it — while the actual job sits untouched at the side of the stage and
   grows. Then the gown comes off, the work lights come up, and he just does it.

   ⭐ It is a SITUATION with a joke in it, the character carries the frame, and the
   reversal happens to the same sprite — which is what made the signpost pair work. */
const STAGE = 604;

/** the theatre: drapes, a valance, footlights, and two sweeping followspots */
const Stage: React.FC<{ f: number; w: World; showLights: number }> =
  ({ f, w, showLights }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 2,
    background: `linear-gradient(180deg, ${dkh(w.b3, 0.44)} 0%, ${dkh(w.b3, 0.64)} 100%)` }} />
  {/* the drapes */}
  {[-1, 1].map(sd => (
    <div key={"dr" + sd} style={{ position: "absolute", zIndex: 30, top: -10, height: STAGE + 20,
      [sd < 0 ? "left" : "right"]: -12, width: 186 }}>
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: i * 32, width: 34,
          borderRadius: 10,
          background: `linear-gradient(90deg, ${dkh(VELVET, 0.42)} 0%, ${mxh(VELVET, 0.06)} 50%, ${dkh(VELVET, 0.46)} 100%)` }} />
      ))}
    </div>
  ))}
  <div style={{ position: "absolute", left: -10, right: -10, top: -14, height: 110, zIndex: 31,
    borderRadius: "0 0 26px 26px",
    background: `linear-gradient(180deg, ${dkh(VELVET, 0.3)} 0%, ${dkh(VELVET, 0.5)} 100%)` }} />
  {/* the boards */}
  <div style={{ position: "absolute", left: 0, right: 0, top: STAGE, bottom: 0, zIndex: 12,
    background: `linear-gradient(180deg, ${mxh(WOODT, 0.06)} 0%, ${dkh(WOODT, 0.4)} 100%)` }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={"bd" + i} style={{ position: "absolute", zIndex: 13, left: -20 + i * 122,
      top: STAGE, width: 6, bottom: 0, background: hexa(INK, 0.16) }} />
  ))}
  {/* footlights */}
  {Array.from({ length: 11 }, (_, i) => (
    <div key={"ft" + i} style={{ position: "absolute", zIndex: 34, left: 22 + i * 92,
      top: STAGE - 22, width: 46, height: 26, borderRadius: "23px 23px 4px 4px",
      background: showLights > 0.5 ? mxh(GOLD, 0.2) : dkh(MUTE, 0.5) }} />
  ))}
  {/* ⭐ two followspots, sweeping — the biggest moving thing while he performs */}
  {[0, 1].map(k => {
    const sx = 506 + Math.sin(f / (k ? 23 : 17) + k * 2.1) * 300;
    return <div key={"sp" + k} style={{ position: "absolute", zIndex: 16,
      left: sx - 150, top: 60, width: 300, height: STAGE - 40, opacity: showLights * 0.9,
      clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
      background: `linear-gradient(180deg, ${hexa(GOLD, 0.34)} 0%, ${hexa(GOLD, 0.04)} 100%)` }} />;
  })}
</>);

/* ---- S2 · SO IT ACTS (124f) ---------------------------------------------- */
export const RobeA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const BOW = [14, 40, 66, 92];                    /* four bows, four rounds of applause */
  const bow = BOW.reduce((a, b2) =>
    f >= b2 && f < b2 + 16 ? Math.max(a, Math.sin(((f - b2) / 16) * Math.PI)) : a, 0);
  const lk = BOW.reduce((a, b2) =>
    f >= b2 + 12 && f < b2 + 22 ? Math.max(a, Math.abs(settle(f - b2 - 12, 7, 2.2, 7))) : a, 0);
  const rounds = BOW.reduce((a, b2) => (f >= b2 + 12 ? a + 1 : a), 0);
  const CX2 = 452;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.14]} vig={0.62} glow={hexa(GOLD, 0.2)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Stage f={f} w={w} showLights={1} />
        {/* ⭐ THE JOB, untouched at the side of the stage, and growing every round */}
        {Array.from({ length: 6 + rounds * 6 }, (_, i) => (
          <div key={"jb" + i} style={{ position: "absolute", zIndex: 26,
            left: 690 + (i % 3) * 96 - (i % 2) * 20,
            top: STAGE - 66 - Math.floor(i / 3) * 58 + Math.sin(f / 11 + i) * 3,
            width: 180, height: 56, borderRadius: 7,
            transform: `rotate(${(i % 2 ? -1 : 1) * (3 + i)}deg)`,
            background: `linear-gradient(180deg, ${dkh(WOODT, 0.2)} 0%, ${dkh(WOODT, 0.5)} 100%)` }} />
        ))}
        {/* ⭐ HIM, PERFORMING — bowing on the beat, gown and all */}
        <div style={{ position: "absolute", inset: 0, zIndex: 50,
          transform: `rotate(${bow * 24}deg)`, transformOrigin: `${CX2}px ${STAGE}px` }}>
          <Hero f={f} x={CX2} y={STAGE + 4} size={330} costume={{ prof: 1 }}
            gaze={0.2} act={2} drive={0} strain={0} cheer={Math.min(1, 0.4 + bow)} />
        </div>
        {/* the arm thrown out on every bow */}
        <Forearm x0={CX2 + 112} y0={STAGE - 150} x1={CX2 + 200 + bow * 60}
          y1={STAGE - 190 - bow * 70} w={28} c="#C4674A" z={52} />
        {/* the applause it is playing to */}
        {BOW.map((b2, k) => (
          <React.Fragment key={"ap" + k}>
            <Puff x={CX2} y={STAGE - 250} f={f} at={b2 + 12} n={13} s={1.1} z={60} />
          </React.Fragment>
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          const t = ((f * 2.4 + i * 27) % 90) / 90;
          return <div key={"cf" + i} style={{ position: "absolute", zIndex: 58,
            left: 150 + rnd(i, 2) * 620 + Math.sin(f / 9 + i) * 22, top: -40 + t * (STAGE + 40),
            width: 16, height: 22, borderRadius: 4, opacity: (1 - t) * 0.9,
            transform: `rotate(${t * 420}deg)`,
            background: mix3(GOLD, CLAY, rnd(i, 3)) }} />;
        })}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S3 · GOWN OFF, WORK LIGHTS ON (150f) -------------------------------- */
export const RobeB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.row;
  const STRIP = 10, MAP = 34, CHK = 52, WORK = 68;
  const strip = f < STRIP ? 0 : E(f, STRIP, STRIP + 14, 0, 1, IN_Q);
  const map = f < MAP ? 0 : E(f, MAP, MAP + 12, 0, 1, BACK);
  const chk = f < CHK ? 0 : E(f, CHK, CHK + 12, 0, 1, BACK);
  /* ⭐ and then it just works — the pile drains all the way to the cut */
  const work = f < WORK ? 0 : E(f, WORK, dur - 4, 0, 1, LIN);
  const lk = [STRIP, MAP, CHK].reduce((a, e) =>
    f >= e && f < e + 8 ? Math.max(a, Math.abs(settle(f - e, 7, 2.2, 7))) : a, 0);
  const CX2 = 452, JOB = 30;
  const left = Math.max(0, Math.round(JOB * (1 - work)));

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.15]} vig={0.6} glow={hexa("#3E9A72", 0.2)}>
      <Cam s={1} x={lk * 0.4} y={lk * 0.9} z={16}>
        <Stage f={f} w={w} showLights={1 - strip} />
        {/* the work lights, once the act is over */}
        {strip > 0.4 && (
          <div style={{ position: "absolute", left: 60, right: 60, top: 40, height: STAGE - 20,
            zIndex: 15, opacity: (strip - 0.4) * 1.6,
            background: `linear-gradient(180deg, ${hexa("#BFE6D2", 0.2)} 0%, ${hexa("#BFE6D2", 0.02)} 100%)` }} />
        )}
        {/* the gown, whipped off and gone */}
        {strip < 1 && (
          <div style={{ position: "absolute", left: CX2 - 130 - strip * 520,
            top: STAGE - 300 - strip * 120, width: 260, height: 300, zIndex: 54,
            opacity: Math.max(0, 1 - strip * 1.2),
            transform: `rotate(${strip * 300}deg)`,
            borderRadius: "50px 50px 16px 16px",
            background: `linear-gradient(160deg, ${mxh(VELVET, 0.16)} 0%, ${dkh(VELVET, 0.32)} 100%)` }} />
        )}
        {/* the job, draining */}
        {Array.from({ length: left }, (_, i) => (
          <div key={"jb" + i} style={{ position: "absolute", zIndex: 26,
            left: 690 + (i % 3) * 96 - (i % 2) * 20,
            top: STAGE - 66 - Math.floor(i / 3) * 58 + Math.sin(f / 11 + i) * 3,
            width: 180, height: 56, borderRadius: 7,
            transform: `rotate(${(i % 2 ? -1 : 1) * (3 + i)}deg)`,
            background: `linear-gradient(180deg, ${dkh(WOODT, 0.2)} 0%, ${dkh(WOODT, 0.5)} 100%)` }} />
        ))}
        {/* each one done, flying off green */}
        {/* ⛔ FOURTEEN TRANSLUCENT TILES ON ONE PATH READ AS A SMEAR, NOT AS WORK
            GETTING DONE — overlapping alpha carries almost no luma delta, which is why
            the whole phase measured 2.5. Eight OPAQUE ones, properly spaced, arcing up
            and off the top-left so they clear him instead of passing through him. */}
        {Array.from({ length: 8 }, (_, i) => {
          if (work <= 0.02) return null;
          const t = ((work * 5.2 + i * 0.125) % 1);
          return <div key={"dn" + i} style={{ position: "absolute", zIndex: 56,
            left: 742 - t * 840, top: STAGE - 90 - t * 430 + t * t * 130,
            width: 178, height: 56, borderRadius: 7,
            opacity: t > 0.86 ? Math.max(0, (1 - t) / 0.14) : 1,
            transform: `rotate(${-t * 210}deg)`,
            background: `linear-gradient(180deg, ${mxh("#3E9A72", 0.28)} 0%, ${dkh("#3E9A72", 0.26)} 100%)` }} />;
        })}
        {/* the two things he was given, held out */}
        {map > 0 && (
          <div style={{ position: "absolute", left: 214 - (1 - map) * 340, top: 330, width: 150,
            height: 108, zIndex: 52, borderRadius: 10, transform: `rotate(${(1 - map) * -40}deg)`,
            background: `linear-gradient(150deg, ${mxh("#3E9A72", 0.3)} 0%, ${dkh("#3E9A72", 0.24)} 100%)` }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ position: "absolute", left: 16, right: 16, top: 22 + i * 24,
                height: 8, borderRadius: 4, background: hexa(BONE, 0.42) }} />
            ))}
          </div>
        )}
        {chk > 0 && (
          <div style={{ position: "absolute", left: 214 - (1 - chk) * 340, top: 452, width: 126,
            height: 96, zIndex: 52, borderRadius: 10, transform: `rotate(${(1 - chk) * 40}deg)`,
            background: `linear-gradient(150deg, ${mxh("#3E9A72", 0.34)} 0%, ${dkh("#3E9A72", 0.2)} 100%)` }}>
            <div style={{ position: "absolute", left: 28, top: 46, width: 30, height: 10,
              borderRadius: 5, background: hexa(BONE, 0.8), transform: "rotate(46deg)" }} />
            <div style={{ position: "absolute", left: 44, top: 38, width: 52, height: 10,
              borderRadius: 5, background: hexa(BONE, 0.8), transform: "rotate(-42deg)" }} />
          </div>
        )}
        <Hero f={f} x={CX2 + work * 190} y={STAGE + 4} size={330} z={50} costume={{ constr: 1 }}
          gaze={0.72} act={work > 0.02 ? 1 : 3} drive={work > 0.02 ? 0.34 : 0}
          strain={0.4 * (1 - work)} cheer={Math.min(1, work * 1.3)} />
        <Puff x={CX2} y={STAGE - 200} f={f} at={STRIP} n={16} s={1.3} z={60} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const RobePair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={258} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={258} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={128}><RobeA dur={128} /></Sequence>
          <Sequence from={128} durationInFrames={155}><RobeB dur={155} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="1 · THE COSTUME" hot="COSTS YOU THE WINDOW" f={f + 12} />
    </AbsoluteFill>
  );
};
