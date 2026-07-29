import React from "react";
import { Actor, H, Vignette, seed, mono, over, ramp } from "./chassis";
import { W, WorldDefs, Wasteland, CentreLine, DustWall, Rig, Trailer } from "./world";
import { GuzzSign, Poles, RouteShield, Buzzards, Wreck, ChromeSkull, HandPrints } from "./props";

/* =============================================================================
   REEL 78 "LIMITS" · S1 — THE LOAD                window 4.36–6.86s · 75f @ 30fps
   -----------------------------------------------------------------------------
   VO: "First, run slash compact whenever your chat gets long."

   PLACE   the same highway, but a NEW LOCKED FRAMING — side-on and low, horizon
           dropped to 388 so the road owns the bottom two thirds. The rig is at
           frame LEFT now (it was right in the hook) and behind it a junk train
           of eleven trailers recedes to a vanishing point off frame right. That
           train IS the long chat: every trailer is a turn nobody threw away.
   LIGHT   same low sun, now behind camera-right so the train's flanks catch a
           rim and the road under it stays deep teal.
   CONTRAST vs S0: S0 was a tall three-quarter wide with a big sun disc; this is
           a long flat side-on with no sun in frame. Same world, different shot.
   CAMERA  ⛔ LOCKED. Only the train moves.
   DEPTH   0 cropped foreground gravel · 1 hero · 2 the rig · 3 the junk train
           4 dust off the tail · 5 rock bank · 6 sky

   ⛔ ONE beat (the scene is 2.5s — a second event would just be noise):
        f6–52   the train RATTLES and stretches: every trailer shunts back in a
                travelling wave from the cab to the tail, and the tail dust wall
                swells. It reads as "this thing is longer than you think".
   ============================================================================= */

const HZ = 388;
const GY = 726;

export const S1Load: React.FC<{ lf: number }> = ({ lf }) => {
  const wave = over(lf, 6, 46);
  const roll = lf * 15;
  const spin = lf * 6;

  /* eleven trailers receding to a vanishing point at x 1040 */
  const cars = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const x = 292 + t * 700;
    const s = 1 - t * 0.62;
    const y = HZ + 168 - t * 92;
    /* the shunt travels down the train, cab -> tail */
    const local = Math.max(0, 1 - Math.abs(wave * 13 - i) / 2.2);
    /* continuous rattle so the train is never still between beats */
    const jig = Math.sin((lf + i * 9) / 3.1) * 3.4 * (1 - t * 0.5);
    return { i, x: x - local * 16 * (1 - t), y: y + jig, s, lit: 0 };
  });

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs><WorldDefs p="s1" /></defs>
        <Wasteland p="s1" horizon={HZ} sun={[880, 300]} scroll={lf * 52} />
        <Buzzards lf={lf} x={700} y={150} s={1.0} n={3} />
        <Poles k={lf / 58} horizon={HZ} n={6} op={0.5} />
        <g opacity={0.85}><GuzzSign x={132} y={HZ - 150} s={0.66} /></g>
        <g opacity={0.8}><RouteShield x={880} y={HZ - 22} s={0.5} n="78" /></g>
        <g opacity={0.6}><Wreck x={64} y={HZ + 132} s={0.34} rot={7} /></g>
        <CentreLine roll={roll} horizon={HZ} vx={1040} op={0.42} />

        {/* ---- plane 3: the junk train, far end first so near ones overlap ---- */}
        {[...cars].reverse().map((c) => (
          <Trailer key={c.i} n={c.i + 2} x={c.x} y={c.y} s={c.s} lit={c.lit} />))}

        {/* dust off the tail — swells with the shunt */}
        <DustWall x={1002} y={HZ + 128} s={0.32 + wave * 0.2} o={0.8} />

        {/* ---- plane 2: the rig itself, frame left ---- */}
        <Rig p="s1" x={196} y={HZ + 44} s={0.62} spin={spin} drums={3} />
        <ChromeSkull x={26} y={HZ + 128} s={0.5} />
        <HandPrints x={34} y={HZ + 152} s={0.4} n={3} />

        {/* the tow chain, cab to first trailer */}
        <g stroke="#3A1710" strokeWidth={7} strokeLinecap="round" opacity={0.9}>
          <path d={`M336 ${HZ + 208} L${cars[0].x - 42} ${cars[0].y + 12}`} /></g>

        {/* ---- plane 0: cropped gravel ---- */}
        <g fill={W.tealLo} opacity={0.9}>
          <path d="M0 780 q120 -34 250 -10 q120 22 240 -6 l0 40 l-490 0 z" /></g>
        <g stroke="#062730" strokeWidth={3} opacity={0.4}>
          <path d={`M0 ${HZ + 96}h1012M0 ${HZ + 210}h1012`} /></g>

        <Vignette cx={0.4} cy={0.56} a={0.6} />
      </svg>

      {/* the hero, small against his own load */}
      <Actor lf={lf} x={470} groundY={GY} size={H * 0.82} z={22} coat={1}
             gaze={7} nodAmp={1.4} nodSpeed={16} />
      <svg viewBox="0 0 1012 792" width={1012} height={792}
           style={{ position: "absolute", left: 0, top: 0, zIndex: 26, pointerEvents: "none" }}>
        <g transform={`translate(470,${GY - 156}) scale(0.82)`}>
          <rect x={-92} y={-16} width={184} height={15} rx={7} fill={W.oil} />
          <g fill="#0E3843" stroke={W.rust} strokeWidth={5}>
            <rect x={-74} y={-34} width={62} height={52} rx={13} />
            <rect x={12} y={-34} width={62} height={52} rx={13} /></g>
          <rect x={-14} y={-16} width={28} height={11} rx={4} fill={W.oil} />
        </g>
      </svg>
    </>
  );
};
