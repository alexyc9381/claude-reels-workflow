import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Bg, HookHeader, AssemblyCtx } from "./SlopKit";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd,
  Scene, Cam, Ring, Puff, Hero, Forearm, settle, CamCtx,
  CLAY, GOLD, RED, CREAMB, INK, MUTE, STEEL, BRASS, EMBER, BONE, WOODT, OXIDE,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import { PALETTES, Surface, Occluder, Cone, StreetLamp } from "./WorldKit";
import type { World } from "./WorldKit";
import { LEVELS, db } from "./SoundKit";

/* ===========================================================================
   THE SIGNPOST — reel 121, S5 + S6.

   ⛔ *"each of the animations are not good, too many squares and stuff."* The body
      was built from abstract slabs. Every replacement has to be a thing people
      already own, named in ONE COMMON NOUN
      ([[feedback_draw_a_machine_people_know]]).

   ⭐⭐⭐ THIS PAIR IS THE ONE WHERE THE OBJECT *IS* THE ARGUMENT.
      S5 · "when you tell the model what not to do, it gets confused"
           A SIGNPOST with every arm crossed out. Nothing points anywhere, so the
           post spins like a weathervane and he spins under it. That is not a
           metaphor for the claim — Anthropic's own line is that a negative
           instruction has NO DIRECTION IN IT, and a signpost with no arm pointing
           is that sentence, drawn.
      S6 · "so say everything as a positive command"
           The SAME post. It clunks to a stop, ONE arm swings down and locks GREEN,
           and the road it points at lights up. He walks it.

   ⭐ Red = barred, green = the way — the open's law, unchanged. The four attempts
      are a ratchet of monotonic REVOLUTIONS (going in circles is real travel, and
      it accumulates), not an oscillation ([[feedback_motion_needs_a_destination]]).
   ⛔ Exterior, so the location changes from the open's interior
      ([[feedback_reel_vary_the_locations]]) — and a sky is free luma.
   ========================================================================= */

const LIVE_C = RED, SAFE_C = "#3E9A72";
const asPlace = (w: World): Place => ({
  back: w.sky, back2: w.sky2, floor: w.ground, floor2: w.ground2,
  lip: w.lip, key: w.key, horizon: w.horizon, grit: w.grit,
} as Place);

const PX = 506;                    /* the post, dead centre */
const ARMS = [268, 336, 404, 472]; /* four arms, four directions */

/** one arm: a real plank with a pointed end, a bracket, and — while it is barred —
    a painted X across it. Not a rectangle. */
const Arm: React.FC<{ y: number; rot: number; len: number; live: boolean; z?: number }> =
  ({ y, rot, len, live, z = 40 }) => (
  <div style={{ position: "absolute", left: PX, top: y - 31, width: len, height: 62,
    zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: len - 34, height: 62,
      borderRadius: "6px 0 0 6px",
      background: live
        ? `linear-gradient(180deg, ${mxh(SAFE_C, 0.26)} 0%, ${dkh(SAFE_C, 0.24)} 100%)`
        : `linear-gradient(180deg, ${mxh(LIVE_C, 0.2)} 0%, ${dkh(LIVE_C, 0.28)} 100%)` }} />
    {/* the point */}
    <div style={{ position: "absolute", left: len - 36, top: 0, width: 40, height: 62,
      clipPath: "polygon(0 0, 100% 50%, 0 100%)",
      background: live ? dkh(SAFE_C, 0.14) : dkh(LIVE_C, 0.18) }} />
    <div style={{ position: "absolute", left: 8, top: 7, width: len - 46, height: 9,
      borderRadius: 5, background: hexa(BONE, live ? 0.4 : 0.24) }} />
    {/* ⭐ the X — what makes it BARRED rather than merely red */}
    {!live && (<>
      <div style={{ position: "absolute", left: len * 0.24, top: 22, width: len * 0.5,
        height: 11, borderRadius: 6, background: hexa(BONE, 0.72),
        transform: "rotate(17deg)" }} />
      <div style={{ position: "absolute", left: len * 0.24, top: 22, width: len * 0.5,
        height: 11, borderRadius: 6, background: hexa(BONE, 0.72),
        transform: "rotate(-17deg)" }} />
    </>)}
  </div>
);

const Post: React.FC<{ spin: number; liveIdx: number; f: number; drop: number }> =
  ({ spin, liveIdx, f, drop }) => (
  <>
    {/* the pole and its collar — drawn, not a slab */}
    <div style={{ position: "absolute", left: PX - 21, top: 214, width: 42, height: 420,
      zIndex: 34,
      background: `linear-gradient(90deg, ${dkh(STEEL, 0.5)} 0%, ${mxh(STEEL, 0.24)} 38%, ${dkh(STEEL, 0.46)} 100%)` }} />
    <div style={{ position: "absolute", left: PX - 44, top: 606, width: 88, height: 34,
      borderRadius: 8, zIndex: 34, background: dkh(STEEL, 0.4) }} />
    <div style={{ position: "absolute", left: PX - 30, top: 200, width: 60, height: 30,
      borderRadius: "30px 30px 0 0", zIndex: 36, background: dkh(BRASS, 0.24) }} />
    {ARMS.map((y, i) => {
      const base = spin + i * 90;
      const rot = i === liveIdx ? E(drop, 0, 1, base, 8, OUT) : base;
      return <Arm key={"a" + i} y={y} rot={rot} len={268 - i * 12}
        live={i === liveIdx && drop > 0.55} z={40 + i} />;
    })}
  </>
);

/* ---- S5 · IT GETS CONFUSED (76f) ---------------------------------------- */
export const SignA: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const TRY = [5, 18, 31, 44];   /* ⭐ resolves by ~58 of 76 — it was outstaying itself */
  /* ⭐ revolutions ACCUMULATE — going in circles is real travel and it has somewhere
     to be at the end, unlike a sway that returns to where it started */
  const spin = TRY.reduce((a, tf, i) =>
    f >= tf ? E(f, tf, tf + 11, i * 200, (i + 1) * 200, IO) : a, 0)
    /* ⭐ and it never fully stops — it is still turning when the cut takes it */
    + (f > TRY[TRY.length - 1] + 11 ? (f - TRY[TRY.length - 1] - 11) * 3.4 : 0);
  const lk = TRY.reduce((a, tf) =>
    f >= tf && f < tf + 8 ? Math.max(a, Math.abs(settle(f - tf, 5.4, 2.2, 6))) : a, 0);
  const dizzy = Math.min(1, spin / 760);
  const CSZ = 300, CFY = 690;

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.05]} vig={0.62} glow={hexa(w.key, 0.22)}>
      <Cam s={1} x={lk * 0.5} y={lk} z={16}>
        <Surface w={w} t={0} stars overhead={false} lampsOn litFar={0.34} />
        <StreetLamp x={116} y={648} h={330} c={w.key} s={1.05} z={22} />
        <Cone x={168} y={318} top={120} bot={520} len={360} c={w.key} o={0.22} z={20} f={f} />
        {/* the four roads, all of them barred */}
        {[0, 1, 2, 3].map(i => (
          <div key={"rd" + i} style={{ position: "absolute", zIndex: 24,
            left: PX - 300 + i * 160, top: 640, width: 120, height: 152,
            transform: `skewX(${-26 + i * 17}deg)`,
            background: `linear-gradient(180deg, ${dkh(w.ground, 0.1)} 0%, ${dkh(w.ground2, 0.36)} 100%)` }} />
        ))}
        <Post spin={spin} liveIdx={-1} f={f} drop={0} />
        {/* he turns with it, and the turning does not undo itself */}
        <div style={{ position: "absolute", inset: 0, zIndex: 60,
          transform: `rotate(${Math.sin(spin * 0.0115) * 13}deg)`, transformOrigin: `${PX - 176}px ${CFY - CSZ * 0.5}px` }}>
          <Hero f={f} x={PX - 176} y={CFY} size={CSZ} costume={{ constr: 1 }}
            gaze={0.2} act={3} drive={0} strain={0.2 + dizzy * 0.3}
            shock={0.3 + dizzy * 0.6} />
        </div>
        {/* the tally of dead ends he has tried */}
        {[0, 1, 2, 3].map(i => (
          <div key={"tl" + i} style={{ position: "absolute", zIndex: 66,
            left: 826, top: 268 + i * 46, width: 58, height: 18, borderRadius: 4,
            background: f >= TRY[i] ? LIVE_C : dkh(MUTE, 0.52) }} />
        ))}
        {TRY.map((tf, i) => (
          <Ring key={"tr" + i} x={855} y={277 + i * 46} f={f} at={tf} c={hexa(LIVE_C, 0.7)}
            z={68} s={0.34} dur={10} />
        ))}
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

/* ---- S6 · SAY IT AS A POSITIVE COMMAND (109f) ----------------------------
   ⛔⛔⛔ THREE VERSIONS OF THE BACK HALF WERE REJECTED — gantries, then signpost
   dominoes — and the fault was never the animation in them. IT WAS THE SHAPE OF THE
   CUT. The arrow landed at frame 22 of 109, so EIGHTY PERCENT OF THE SCENE WAS AFTER
   ITS OWN CLIMAX and everything I put there was filler for a beat already spent. No
   amount of motion rescues a payoff that happened at 0.7s.

   ⭐⭐⭐ SO THE LANDING IS THE END, AND THE CUT BUILDS TO IT:
     0-8    the post still spinning, every arm crossed out (carried from S5)
     8-64   ⭐ THE ARMS SNAP OFF, one at a time, and tumble away — four discrete events,
            the same object, and the frame gets emptier and less red with each one.
            That is the reel's arc (SUBTRACTION) happening on screen.
     64-76  a bare pole, the spin finally dying. Nothing points anywhere at all.
     76-88  ⭐ THE ARROW SLAMS ONTO IT. One direction, on the post that had none.
     88-109 the road ignites and he goes — 0.7s of pure energy, too short to need a
            concept of its own, which is exactly why the old back half needed one.
   ------------------------------------------------------------------------- */
export const SignB: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const w = PALETTES.corner;
  const SNAP_AT = [6, 17, 28, 39];
  const DIE = 64, LAND = 76, GO = 90;
  /* the spin dies as the arms come off — it has less and less to swing */
  const spin = E(f, 0, DIE, 0, 360, OUT);
  const arrow = f < LAND - 12 ? 0 : E(f, LAND - 12, LAND, 0, 1, IN_Q);
  const q = f >= LAND ? settle(f - LAND, 20, 3.0, 10) : 0;
  const ring = f >= LAND ? settle(f - LAND, 4.2, 5.4, 44) : 0;
  const road = f < LAND ? 0 : E(f, LAND, LAND + 14, 0, 1, OUT);
  const rush = Math.max(0, f - LAND);
  const lk = SNAP_AT.reduce((a2, sf) =>
    f >= sf && f < sf + 8 ? Math.max(a2, Math.abs(settle(f - sf, 5.0, 2.2, 6))) : a2, 0)
    + (f >= LAND && f < LAND + 10 ? Math.abs(settle(f - LAND, 9.5, 2.2, 6)) : 0);
  const HZ = 452;
  const CSZ = 300, CFY = 700;
  const AY = [268, 336, 404, 472];

  return (
    <Scene p={asPlace(w)} slug="" push={[0, dur, 1.11]} vig={0.6} glow={hexa(SAFE_C, 0.2)}>
      <Cam s={1} x={lk * 0.5} y={lk} z={16}>
        <Surface w={w} t={0} stars overhead={false} lampsOn litFar={0.34} />
        <StreetLamp x={110} y={646} h={320} c={w.key} s={1.0} z={22} />

        {/* the road — dark until it is pointed at, then lit and rushing */}
        <div style={{ position: "absolute", left: 0, top: HZ, right: 0, bottom: 0, zIndex: 39,
          clipPath: `polygon(${506 - 62}px 0, ${506 + 62}px 0, 100% 100%, 0 100%)`,
          background: `linear-gradient(180deg, ${dkh(w.ground, 0.12)} 0%, ${dkh(w.ground2, 0.34)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, top: HZ, right: 0, bottom: 0, zIndex: 40,
          overflow: "hidden", opacity: road,
          clipPath: `polygon(${506 - 62}px 0, ${506 + 62}px 0, 100% 100%, 0 100%)`,
          background: `linear-gradient(180deg, ${dkh(SAFE_C, 0.42)} 0%, ${dkh(SAFE_C, 0.62)} 100%)` }}>
          {Array.from({ length: 9 }, (_, i) => {
            const t = ((rush * 0.125 + i / 9) % 1), k = t * t;
            const ww = 120 + k * 980;
            return <div key={"cv" + i} style={{ position: "absolute",
              left: 506 - ww / 2, top: k * (792 - HZ), width: ww, height: 20 + k * 62,
              borderRadius: 12, background: hexa(BONE, 0.2 + k * 0.4) }} />;
          })}
        </div>

        {/* the pole, and the arms coming off it one at a time */}
        <div style={{ position: "absolute", left: 506 - 21 + lk * 1.6, top: 214, width: 42, height: 420,
          zIndex: 44, transformOrigin: "50% 100%", transform: `rotate(${lk * 0.5}deg)`,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.5)} 0%, ${mxh(STEEL, 0.24)} 38%, ${dkh(STEEL, 0.46)} 100%)` }} />
        <div style={{ position: "absolute", left: 506 - 44, top: 606, width: 88, height: 34,
          borderRadius: 8, zIndex: 44, background: dkh(STEEL, 0.4) }} />
        {AY.map((y, i) => {
          const gone = Math.max(0, f - SNAP_AT[i]);
          if (gone > 26) return null;
          const sd = i % 2 ? 1 : -1;
          const fly = gone > 0 ? gone / 26 : 0;
          return (
            <div key={"ar" + i} style={{ position: "absolute", left: 506, top: y - 31,
              width: 296 - i * 14, height: 76, zIndex: 45 - i,
              opacity: fly > 0 ? Math.max(0, 1 - fly * 1.15) : 1,
              transformOrigin: "0% 50%",
              transform: `rotate(${spin + i * 90}deg) translate(${fly * 470}px, ${fly * fly * 660}px) rotate(${fly * sd * 420}deg) scale(${1 + fly * 0.5})` }}>
              <div style={{ position: "absolute", left: 0, top: 0, right: 34, bottom: 0,
                borderRadius: "6px 0 0 6px",
                background: `linear-gradient(180deg, ${mxh(LIVE_C, 0.2)} 0%, ${dkh(LIVE_C, 0.28)} 100%)` }} />
              <div style={{ position: "absolute", right: -2, top: 0, width: 48, height: 76,
                clipPath: "polygon(0 0, 100% 50%, 0 100%)", background: dkh(LIVE_C, 0.18) }} />
              {[17, -17].map((r, k) => (
                <div key={k} style={{ position: "absolute", left: "24%", top: 26, width: "50%",
                  height: 13, borderRadius: 7, background: hexa(BONE, 0.72),
                  transform: `rotate(${r}deg)` }} />
              ))}
            </div>
          );
        })}

        {/* ⭐ THE ARROW — one direction, arriving on a post that had none */}
        {arrow > 0 && (
          <div style={{ position: "absolute", left: 506 - 40, top: -260 + arrow * 560,
            width: 690, height: 196, zIndex: 50, transformOrigin: "6% 50%",
            transform: `translateY(${q * 1.7}px) rotate(${ring * 0.55}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 196,
              borderRadius: "10px 0 0 10px",
              background: `linear-gradient(180deg, ${mxh(SAFE_C, 0.3)} 0%, ${dkh(SAFE_C, 0.26)} 100%)` }} />
            <div style={{ position: "absolute", left: 530, top: 0, width: 160, height: 196,
              clipPath: "polygon(0 0, 100% 50%, 0 100%)", background: dkh(SAFE_C, 0.14) }} />
            <div style={{ position: "absolute", left: 30, top: 30, width: 440, height: 22,
              borderRadius: 11, background: hexa(BONE, 0.44) }} />
            <div style={{ position: "absolute", left: 30, top: 142, width: 320, height: 20,
              borderRadius: 10, background: hexa(BONE, 0.26) }} />
            <div style={{ position: "absolute", left: 44, top: 70, width: 400, height: 56,
              borderRadius: 8, background: hexa(BONE, 0.16) }} />
          </div>
        )}

        {/* ⭐ he does not amble off — he GOES. A 300px sprite crossing 520px in the last
            half-second is the biggest thing available in a 15-frame tail, and "set off"
            is what the beat is. */}
        <Hero f={f} x={330 + road * 92 + (f >= GO ? E(f, GO, dur, 0, 520, IN_Q) : 0)}
          y={CFY} size={CSZ} z={60} costume={{ constr: 1 }}
          gaze={f < DIE ? 0.2 : 0.74} act={road > 0.2 ? 1 : 3}
          drive={road > 0.2 ? 0.32 : 0} strain={0}
          shock={f < DIE ? 0.45 : 0} cheer={Math.min(1, road)} />
        {SNAP_AT.map((sf, i) => (
          <Ring key={"sr" + i} x={506} y={AY[i]} f={f} at={sf} c={hexa(LIVE_C, 0.6)} z={68}
            s={0.4} dur={11} />
        ))}
        <Ring x={506} y={330} f={f} at={LAND} c={hexa(SAFE_C, 0.95)} z={70} s={1.7} dur={20} />
        <Puff x={506} y={620} f={f} at={LAND} n={18} s={1.4} z={68} />
      </Cam>
      <Occluder side="l" c={dkh(w.b3, 0.6)} w={52} z={88} kind="wall" />
      <Occluder side="r" c={dkh(w.b3, 0.64)} w={44} z={88} kind="wall" />
    </Scene>
  );
};

export const SignPair: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg />
      <Audio src={staticFile("mistake_vo.wav")} volume={LEVELS.DIALOGUE} startFrom={637} />
      <Audio src={staticFile("121mistake_bed.wav")} volume={LEVELS.MUSIC * db(7.4)} startFrom={637} />
      <CamCtx.Provider value={{ dx: 0, dy: 8, s: 1.02, rot: 0 }}>
        <AssemblyCtx.Provider value={true}>
          <Sequence from={0} durationInFrames={76}><SignA dur={76} /></Sequence>
          <Sequence from={76} durationInFrames={109}><SignB dur={109} /></Sequence>
        </AssemblyCtx.Provider>
      </CamCtx.Provider>
      <HookHeader big="2 · SAY WHAT TO DO" hot="NOT WHAT NOT TO" f={f + 12} />
    </AbsoluteFill>
  );
};
