import React from "react";
import { useCurrentFrame } from "remotion";
import { fraunces } from "./fonts";
import { Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, usePlace,
  Ridge, Snow, Ash, Beam, Strip, Motes, Edge, Keeper, Mitt, Queue, QueueShadows,
  Scene, Cam, MarkPlate, MarkCast,
} from "./NomWorld";
import { Portal, Bunker, Fence, Wreck, Hatch, MastSite, Prints, Apron, Overhead,
  Windsock, Strobe, Debris, ScanDish, Exhaust, Vortex, SweepLamp, Flap,
  BlastDoor, Wheel, Tunnel, Mast } from "./NomProps";

/* ===========================================================================
   REEL 98 "NOMAD" — THE ALTERNATE OPENS.

   docs/THE-OPEN.md step 1: the first build step of a reel is not scene 0, it is
   N concepts for scene 0. [[feedback_hook_simplicity]]: each candidate must be
   a different MECHANISM, not one world in four colourways — if you can describe
   them all with the same sentence you have one concept.

     A  THE PORTAL   (in NomScenes)  ENTRY        — a sealed thing opens, and the lock is missing
     B  THE COLLAPSE                 DESTRUCTION  — the tower comes down across the frame, and what it was hiding is lit
     C  THE CASE                     UNBOXING     — four latches pop and the lid lifts on light
     D  THE HATCH                    EXCAVATION   — a plate of steel comes out from under the snow and opens AT you

   ⛔⛔ B AND D WERE REBUILT. Alex: *"the second and the fourth aren't meeting the
      bar in the hook scenes, not enough interest, not enough pattern interrupt."*
      He was right and both failures were the same failure — NO EVENT.
        · B was a grey lattice in a field, then the same lattice smaller. Its
          mechanism (inversion of scale) was an idea, not a picture, and it gave
          the eye nothing to watch. It now DESTROYS the tower in the first
          second and reveals the bunker behind where it stood.
        · D opened on a single establishing wide of an empty plain with a 40px
          figure in it. `docs/THE-OPEN.md` names that exactly: an establishing
          wide is a POSTER — one beat, and after that beat the eye has nothing
          left to do. It is now the only TOP-DOWN shot in the reel, and the
          thing it looks down at opens upward into the lens.

   All four run 117 frames and all four end at the same place (a door about to
   open). All four are set in the SAME doomsday: a wildfire haze, a broken
   skyline with a few emergency lights still flickering, ashfall, stripped
   wrecks and a torn fence. What dies at the crest is the LAST of it, not a
   healthy city.
   ⛔ AND ALL FOUR CARRY REAL WEATHER. Alex: *"the variants need to be more
      interesting with more motion and better worldbuilding."* Every shot below
      runs four continuous atmosphere layers — storm ceiling, ashfall, driving
      snow, near-plane spindrift — none of which is a SUBJECT, so the motion
      hierarchy holds while the frame stops being still.

   ⛔⛔ AND ALL FOUR CARRY THE MARK. Reel 95's audience-filter rule applies to
      every open, not just the one that ships: a scroller either recognises the
      Claude mark in the first seconds or was never the audience. Each hook below
      lands at least four marks plus the product noun (OFFLINE AI / LOCAL MODEL)
      inside its own three seconds.
   ========================================================================= */

/* ================================================================== B ====
   THE MAST · INVERSION OF SCALE.
   ------------------------------------------------------------------------ */
export const S0HookMast: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 30, 62, 92];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pm = usePlace("mast"), pd = usePlace("door");
  const weather = (n = 30) => (<>
    <Ash f={f} n={26} z={68} speed={1.4} />
    <Snow f={f} n={n} z={72} speed={1.5} c="#E6E3DB" />
    <Snow f={f} n={15} z={93} near speed={2.0} c="#F2F0EA" />
  </>);

  /* A · 0.00-1.00s · LOW ANGLE. The mast at full height, beacon turning — and
     at f14 it JOLTS and the guy wire whips. The frame-0 subject is the tower;
     the event is that it is about to stop being one. */
  if (shot === 0) {
    const jolt = E(lf, 14, 20, 0, 1, OUT) * (1 - E(lf, 20, 30, 0, 1, OUT));
    return (
      /* ⛔⛔ IT IS A SITE, NOT A TOWER. Alex, round 6: cut B's first scene is
         *"still too boring, and those are the most important scenes."* Shot A
         was a lattice and a sky — almost no ink on the panel and no reason to
         believe anyone ever worked there. It is now a working comms compound:
         an equipment cabin with a live status lamp, a generator and its fuel
         drums, a dish on its own mount, four guy wires anchored to concrete
         blocks, a cable duct, an ice-furred climbing ladder with a safety cage,
         a hazard sign on the fence line, and a wreck outside it. None of it
         moves — SET-AND-LIGHT §6: the density lives in the STATIC set, and the
         only thing that acts is the wire letting go. */
      <Scene p={pm} slug="THE UPLINK COMPOUND" push={[0, 30, 1.06]} vig={0.46}>
        <Ridge p={pm} f={f} city={1} lit={1} sunX={168} storm={1} fires={1} />
        <Cam z={40} s={1.34} y={96} rot={jolt * 1.6}>
          <Mast x={506} base={pm.horizon + 120} h={380} s={1} z={20} f={f} on={1} />
        </Cam>
        <MastSite x={506} base={pm.horizon + 214} s={0.94} z={44} f={f} on={1} />
        {/* ⭐ ROUND 7 · the compound is RUNNING, not parked: the dish scans, the
            generator smokes, a wind sock whips, a strobe blinks on the wire and
            sheeting tumbles through. Fixtures and weather only. */}
        <ScanDish x={856} base={pm.horizon + 214} s={0.80} z={52} f={f} rate={1.4} />
        <Exhaust x={273} y={pm.horizon + 108} s={0.94} z={54} f={f} n={4} />
        <Windsock x={92} base={pm.horizon + 178} s={0.80} z={60} f={f} />
        <Strobe x={636} base={pm.horizon + 258} s={0.86} z={78} f={f} period={17} />
        <Flap x={790} y={pm.horizon + 214} w={124} h={88} s={1} z={82} f={f} c="#6E6459" />
        <Debris f={f} n={7} z={86} y0={pm.horizon + 110} y1={pm.horizon + 300} speed={1.4} />
        {/* the guy wire that lets go */}
        <div style={{ position: "absolute", left: 96, top: 40, width: 660, height: 7, zIndex: 56,
          background: "#4E4A45", transformOrigin: "0% 50%",
          transform: `rotate(${26 + jolt * 22}deg)` }} />
        <Queue x={442} y={pm.horizon + 226} n={8} s={0.58} f={f} z={58} gap={96} dir={-1}
          depth={0.082} period={88} lit={0.88} rise={18} />
        <Keeper x={206} y={pm.horizon + 268} s={0.90} z={72} f={f} face={1} hood={1}
          badge={1} lit={0.94} />
        <MarkPlate x={82} y={210} t="OFFLINE AI · NO CLOUD" s={0.92} z={76} />
        <Wreck x={862} base={pm.horizon + 292} s={0.98} z={80} face={-1} />
        <Fence y={pm.horizon + 236} z={84} s={1.08} torn={1} />
        <Edge side="r" c={dark(pm.back, 0.68)} kind="rock" w={130} z={90} />
        {weather(34)}
      </Scene>
    );
  }

  /* B · 1.00-2.07s · WIDE. IT COMES DOWN. The whole tower rotates about its
     base across the frame and throws a burst of snow on impact. This is the
     pattern interrupt: something very large moves, once, fast. */
  if (shot === 1) {
    const fall = E(lf, 2, 22, 0, 1, IN_Q);
    const hit = E(lf, 21, 32, 0, 1, OUT);
    return (
      <Scene p={pm} slug="AND DOWN IT GOES" push={[30, 62, 1.05]} vig={0.48}>
        <Ridge p={pm} f={f} city={1} lit={1 - fall * 0.5} sunX={168} storm={1} fires={1} />
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 40,
          transformOrigin: `760px ${pm.horizon + 96}px`,
          transform: `rotate(${fall * 86}deg)` }}>
          <Mast x={760} base={pm.horizon + 96} h={400} s={1.12} z={20} f={f}
            on={1 - E(lf, 12, 20, 0, 1, LIN)} />
        </div>
        {/* the burst where it lands */}
        {hit > 0.01 && Array.from({ length: 12 }, (_, i) => (
          <div key={"bu" + i} style={{ position: "absolute",
            left: 200 + i * 62 - hit * 30, top: pm.horizon + 84 - hit * (40 + rnd(i, 5) * 90),
            width: (26 + rnd(i, 6) * 54) * (0.5 + hit), height: (18 + rnd(i, 7) * 34) * (0.5 + hit),
            borderRadius: "50%", background: "#E9E6DE", opacity: (1 - hit) * 0.86, zIndex: 60 }} />
        ))}
        {/* ⭐ and the line SCATTERS as it comes down — the queue breaks and runs */}
        <Queue x={410 - fall * 180} y={pm.horizon + 232} n={8} s={0.58} f={f * (1 + fall * 3)}
          z={58} gap={98 + fall * 60} dir={-1} depth={0.08}
          period={Math.max(14, 88 - fall * 70)} lit={0.90} rope={false} rise={18} />
        <Wreck x={196} base={pm.horizon + 250} s={0.94} z={78} />
        <Edge side="l" c={dark(pm.back, 0.68)} kind="rock" w={150} z={90} />
        {weather(40)}
      </Scene>
    );
  }

  /* C · 2.07-3.07s · WIDE. The reveal: the tower is wreckage in the foreground
     and the bunker it was standing in front of is lit and open. */
  if (shot === 2) {
    const up = E(lf, 4, 24, 0, 1, OUT);
    return (
      <Scene p={pm} slug="AND THE BOX IS STILL ON" push={[62, 92, 1.055]} vig={0.46}>
        <Ridge p={pm} f={f} city={1} lit={0.45} sunX={168} storm={1} fires={1} />
        <Bunker x={556} base={pm.horizon + 214} s={0.82} z={26} f={f}
          slot={0.55 + up * 0.45} floods={1} lamp={1} shutter={0} vent={1} />
        <MarkCast x={556} y={pm.horizon - 106} s={88} z={70} o={0.92} spin={1.1} f={f} />
        {/* the fallen mast, now lying across the whole foreground */}
        <div style={{ position: "absolute", left: -60, top: pm.horizon + 172, zIndex: 82,
          transform: "rotate(-7deg)" }}>
          <Mast x={300} base={120} h={420} s={1.05} z={0} f={0} on={0} />
        </div>
        {/* and they re-form at the door, which is the point of the whole cut */}
        <Queue x={448} y={pm.horizon + 228} n={8} s={0.58} f={f} z={58} gap={96} dir={-1}
          depth={0.082} period={84} lit={0.90} rise={18} />
        <Keeper x={228} y={pm.horizon + 336} s={1.22} z={88} f={f} face={1} hood={1}
          badge={1} lit={0.96} />
        <Edge side="r" c={dark(pm.back, 0.66)} kind="rock" w={130} z={90} />
        {weather(34)}
      </Scene>
    );
  }

  /* D · the wheel, and the seal parting. */
  const turn = E(lf, 2, 17, 0, 1, IO);
  const seal = E(lf, 15, 23, 0, 1, OUT);
  return (
    <Scene p={pd} slug="ONE HAND  ·  NO KEY" push={[92, 117, 1.055]} vig={0.62}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(174deg, #4E545C 0%, #6E747C 40%, #767D86 100%)" }} />
      <Wheel x={470} y={420} r={258} z={40} rot={-turn * 118} frost={1 - turn * 0.7} />
      <MarkCast x={470} y={616} s={84} z={52} o={0.94} spin={1.4} f={f} />
      <Mitt x={618} y={344} s={1.4} z={60} rot={-14 + turn * 110} />
      {seal > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 306 - seal * 26,
          height: 24 + seal * 66, zIndex: 80, background: "#F6E3BE", opacity: seal * 0.9,
          transform: "skewY(-4deg)" }} />
      )}
      <Ash f={f} n={12} z={88} speed={1.5} />
      <Edge side="l" c="#3E434A" kind="wall" w={90} z={90} />
    </Scene>
  );
};

/* ================================================================== C ====
   THE CASE · UNBOXING. Four latches, then light.
   ------------------------------------------------------------------------ */
export const S0HookCase: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 30, 64, 94];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pr = usePlace("ridge"), pt = usePlace("throat");

  const Case: React.FC<{ lid: number; glow: number; latch: number[]; x?: number; base?: number;
    s?: number }> = ({ lid, glow, latch, x = 506, base = 606, s = 1 }) => {
    const w = 640 * s, h = 250 * s;
    return (<>
      {/* the glow escaping the seam, drawn UNDER the lid */}
      {glow > 0.01 && (<>
        <div style={{ position: "absolute", left: x - w * 0.56, top: base - h - 200 * s * lid,
          width: w * 1.12, height: 300 * s, zIndex: 44,
          background: `radial-gradient(ellipse at 50% 100%, ${hexa("#F2D79E", 0.42 * glow)} 0%, ${hexa("#F2D79E", 0)} 70%)` }} />
        <div style={{ position: "absolute", left: x - w / 2 + 22 * s, top: base - h - 6 * s,
          width: w - 44 * s, height: Math.max(5, 150 * s * lid), background: "#FBEFD2",
          opacity: 0.55 + glow * 0.45, zIndex: 45 }} />
      </>)}
      {/* the lid */}
      <div style={{ position: "absolute", left: x - w / 2, top: base - h - 92 * s, width: w,
        height: 96 * s, background: "#3B4133", zIndex: 48, borderRadius: `${14 * s}px ${14 * s}px 0 0`,
        boxShadow: SH_D, transformOrigin: "50% 100%",
        transform: `perspective(1500px) rotateX(${lid * 66}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 12 * s,
          background: "#565E48", borderRadius: `${14 * s}px ${14 * s}px 0 0` }} />
        {[0.2, 0.5, 0.8].map((k, i) => (
          <div key={"rb" + i} style={{ position: "absolute", left: w * k - 26 * s, top: 16 * s,
            width: 52 * s, height: 64 * s, borderRadius: 6, background: "#2C3127" }} />
        ))}
      </div>
      {/* the body */}
      <div style={{ position: "absolute", left: x - w / 2, top: base - h, width: w, height: h,
        background: "#4C5340", zIndex: 46, borderRadius: `0 0 ${16 * s}px ${16 * s}px`,
        boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: x - w / 2, top: base - 40 * s, width: w,
        height: 40 * s, background: "#343A2B", zIndex: 47,
        borderRadius: `0 0 ${16 * s}px ${16 * s}px` }} />
      {/* the four latches */}
      {[0.13, 0.37, 0.63, 0.87].map((k, i) => (
        <div key={"lt" + i} style={{ position: "absolute", left: x - w / 2 + w * k - 34 * s,
          top: base - h - 22 * s, width: 68 * s, height: 54 * s, zIndex: 50,
          transformOrigin: "50% 88%", transform: `rotate(${latch[i] * 74}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 7, background: "#8A8579",
            boxShadow: SH }} />
          <div style={{ position: "absolute", left: 8 * s, top: 7 * s, width: 52 * s,
            height: 12 * s, borderRadius: 4, background: "#B4AEA0" }} />
        </div>
      ))}
      {/* the mark cast into the lid, so the case says what is inside it */}
      <div style={{ position: "absolute", left: x - w / 2 + 34 * s, top: base - h - 74 * s,
        width: 62 * s, height: 62 * s, borderRadius: 14 * s, background: "#FFFFFF",
        border: `${3 * s}px solid #E8DCC0`, zIndex: 51, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("claude_logo.png")}
          style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
      </div>
      {/* the stencil on the body */}
      <div style={{ position: "absolute", left: x - w / 2, top: base - h * 0.52, width: w,
        textAlign: "center", zIndex: 49, fontFamily: fraunces.fontFamily, fontWeight: 900,
        fontSize: 76 * s, letterSpacing: "0.10em", color: "#9AA089", opacity: 0.72,
        lineHeight: 1 }}>NOMAD</div>
    </>);
  };

  /* A · MACRO. The case, half buried, latched, frosted. Bright snow behind.
     ⛔ THE GUST IS LOAD-BEARING, NOT DECORATION. Without it this shot measured
        3.48 on the per-scene motion audit against a 4.0 bar: a locked object in
        still air under a slow push barely moves a pixel. Weather is the cheapest
        legitimate motion an exterior has. */
  if (shot === 0) {
    const gust = E(lf, 8, 24, 0, 1, IO);
    return (
      <Scene p={pr} slug="A CASE IN THE SNOW" push={[0, 30, 1.075]} vig={0.46}>
        <Ridge p={pr} f={f} city={0.9} lit={1} sunX={868} />
        <Case lid={0} glow={0} latch={[0, 0, 0, 0]} base={640} s={1.06} />
        {/* snow drifted against its near edge, blowing off the lid in the gust */}
        <div style={{ position: "absolute", left: 106, top: 610, width: 800, height: 76,
          borderRadius: "50%", background: "#E4EAEF", zIndex: 52 }} />
        <div style={{ position: "absolute", left: 150 + gust * 240, top: 300 - gust * 40,
          width: 520, height: 30, borderRadius: 30, background: "#EEF3F7",
          opacity: 0.62 * Math.sin(Math.PI * gust), zIndex: 62 }} />
        <Bunker x={806} base={pr.horizon + 176} s={0.52} z={20} f={f} slot={0.9}
          floods={1} lamp={1} />
        <Wreck x={128} base={pr.horizon + 176} s={0.74} z={30} />
        <ScanDish x={906} base={pr.horizon + 132} s={0.62} z={24} f={f} rate={1.3} />
        <Exhaust x={862} y={pr.horizon + 40} s={0.72} z={25} f={f} n={3} />
        <Queue x={752} y={pr.horizon + 178} n={7} s={0.40} f={f} z={26} gap={62} dir={-1}
          depth={0.08} period={90} lit={0.82} rope={false} rise={12} />
        <Windsock x={96} base={pr.horizon + 96} s={0.74} z={58} f={f} />
        <Strobe x={196} base={pr.horizon + 172} s={0.80} z={60} f={f} period={19} />
        <Flap x={704} y={pr.horizon + 120} w={104} h={76} s={1} z={62} f={f} c="#6E6459" />
        <Debris f={f} n={8} z={86} y0={pr.horizon + 20} y1={pr.horizon + 300} speed={1.6} />
        <MarkPlate x={72} y={214} t="AN OFFLINE AI" s={0.92} z={70} />
        <Edge side="l" c={dark(pr.back, 0.66)} kind="rock" w={126} z={90} />
        <Ash f={f} n={30} z={68} speed={1 + gust * 2.4} />
        <Snow f={f} n={44} z={72} speed={1 + gust * 3.2} c="#E6E3DB" />
        <Snow f={f} n={22} z={93} near speed={1.4 + gust * 4} c="#F2F0EA" />
      </Scene>
    );
  }

  /* B · the four latches popping, 1-2-3-4. */
  if (shot === 1) {
    const latch = [0, 1, 2, 3].map((i) => E(lf, 3 + i * 6, 9 + i * 6, 0, 1, BACK));
    return (
      <Scene p={pr} slug="FOUR LATCHES" push={[30, 64, 1.075]} vig={0.50}>
        <Ridge p={pr} f={f} city={0.8} lit={1} sunX={868} />
        <Case lid={0} glow={latch[3] * 0.4} latch={latch} base={640} s={1.06} />
        <div style={{ position: "absolute", left: 106, top: 610, width: 800, height: 76,
          borderRadius: "50%", background: "#E4EAEF", zIndex: 52 }} />
        <Bunker x={806} base={pr.horizon + 176} s={0.52} z={20} f={f} slot={0.9}
          floods={1} lamp={1} />
        <ScanDish x={906} base={pr.horizon + 132} s={0.62} z={24} f={f} rate={1.3} />
        <Queue x={752} y={pr.horizon + 178} n={7} s={0.40} f={f} z={26} gap={62} dir={-1}
          depth={0.08} period={90} lit={0.82} rope={false} rise={12} />
        <Windsock x={96} base={pr.horizon + 96} s={0.74} z={58} f={f} />
        <Debris f={f} n={8} z={86} y0={pr.horizon + 20} y1={pr.horizon + 300} speed={1.6} />
        <Edge side="l" c={dark(pr.back, 0.66)} kind="rock" w={126} z={90} />
        <Ash f={f} n={28} z={68} speed={1.3} />
        <Snow f={f} n={40} z={72} speed={1.3} c="#E6E3DB" />
        <Snow f={f} n={16} z={93} near speed={1.6} c="#F2F0EA" />
      </Scene>
    );
  }

  /* C · the lid lifts and the light comes out. */
  if (shot === 2) {
    const lid = E(lf, 2, 22, 0, 1, OUT);
    return (
      <Scene p={pr} slug="WHAT IS INSIDE IT" push={[64, 94, 1.055]} vig={0.56}>
        <Ridge p={pr} f={f} city={0.6} lit={1} sunX={868} />
        <Case lid={lid} glow={lid} latch={[1, 1, 1, 1]} base={640} s={1.06} />
        <div style={{ position: "absolute", left: 106, top: 610, width: 800, height: 76,
          borderRadius: "50%", background: "#E4EAEF", zIndex: 52 }} />
        <Bunker x={820} base={pr.horizon + 176} s={0.52} z={20} f={f} slot={0.9}
          floods={1} lamp={1} />
        <Ash f={f} n={26} z={68} speed={1.2} />
        <Snow f={f} n={38} z={72} speed={1.2} c="#E6E3DB" />
        <Snow f={f} n={15} z={93} near speed={1.5} c="#F2F0EA" />
        <Edge side="r" c={dark(pr.back, 0.62)} kind="rock" w={110} z={90} />
      </Scene>
    );
  }

  /* D · WIDE. The case is open on the plain and the vault is right there. */
  return (
    <Scene p={pr} slug="AND WHERE IT LIVES" push={[94, 117, 1.055]} vig={0.52}>
      <Ridge p={pr} f={f} city={1} lit={1} sunX={868} />
      <Bunker x={664} base={pr.horizon + 226} s={0.78} z={26} f={f}
        slot={0.9 + Math.sin(f / 16) * 0.06} floods={1} lamp={1} />
      <Queue x={534} y={pr.horizon + 224} n={8} s={0.54} f={f} z={58} gap={88} dir={-1}
        depth={0.082} period={86} lit={0.88} rise={17} />
      <Wreck x={128} base={pr.horizon + 300} s={0.98} z={78} />
      <Cam z={50} s={0.44} x={-250} y={168}>
        <Case lid={1} glow={1} latch={[1, 1, 1, 1]} base={640} s={1.06} />
      </Cam>
      <MarkCast x={640} y={pr.horizon + 34} s={82} z={44} o={0.94} />
      <Keeper x={306} y={716} s={0.90} z={54} f={f} hood={1} badge={1} lit={0.88} />
      <Fence y={pr.horizon + 248} z={84} s={1.06} torn={1} />
      <Edge side="l" c={dark(pr.back, 0.66)} kind="rock" w={126} z={90} />
        <Ash f={f} n={26} z={68} speed={1.2} />
        <Snow f={f} n={34} z={72} speed={1.4} c="#E6E3DB" />
        <Snow f={f} n={15} z={93} near speed={1.9} c="#F2F0EA" />
    </Scene>
  );
};

/* ================================================================== D ====
   THE CROSSING · SCALE OF EMPTINESS. One small figure, an enormous white
   nothing, one dark slot at the far end of it.
   ------------------------------------------------------------------------ */
export const S0HookCross: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = [0, 30, 58, 90];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pr = usePlace("ridge"), pd = usePlace("door");

  /* ⭐ THE ONLY TOP-DOWN SHOTS IN THE REEL. Everything else in reel 98 — and in
     the last dozen reels — is a side-on diorama. Looking straight down at a
     plate of steel coming out from under snow is the pattern interrupt: it is
     not a new subject, it is a camera nobody expects. */
  const Drift: React.FC<{ n?: number; z?: number; sp?: number }> = ({ n = 18, z = 80, sp = 1 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const x = ((rnd(i, 71) * 1300 - f * (9 + rnd(i, 72) * 14) * sp) % 1300 + 1300) % 1300 - 150;
      const y = rnd(i, 73) * 792 + Math.sin(f / 15 + i) * 16;
      const w = 110 + rnd(i, 74) * 240;
      return <div key={"df" + i} style={{ position: "absolute", left: x, top: y, width: w,
        height: 6 + rnd(i, 75) * 9, borderRadius: 30, background: "#FAF8F3",
        opacity: 0.34 + rnd(i, 76) * 0.36, zIndex: z,
        transform: `rotate(${(rnd(i, 77) - 0.5) * 10}deg)` }} />;
    })}
  </>);

  const Ground: React.FC<{ k?: number }> = ({ k = 1 }) => (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: "linear-gradient(168deg, #EFECE4 0%, #D2CDC2 62%, #BBB6AC 100%)" }} />
    {Array.from({ length: 16 }, (_, i) => (
      <div key={"gd" + i} style={{ position: "absolute", left: -80 + rnd(i, 61) * 1080,
        top: rnd(i, 62) * 792, width: 180 + rnd(i, 63) * 340, height: 9 + rnd(i, 64) * 16,
        borderRadius: 40, background: "#B3ADA2", opacity: 0.30 * k,
        transform: `rotate(${(rnd(i, 65) - 0.5) * 24}deg)` }} />
    ))}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"rk" + i} style={{ position: "absolute", left: rnd(i, 66) * 1010,
        top: rnd(i, 67) * 780, width: 24 + rnd(i, 68) * 52, height: 12 + rnd(i, 69) * 20,
        background: "#8E887E", opacity: 0.60 * k,
        transform: `rotate(${(rnd(i, 70) - 0.5) * 50}deg)` }} />
    ))}
  </>);

  /* A · TOP-DOWN. A drift, and something under it. The wind takes the first
     third of the snow off it before the first cut. */
  if (shot === 0) {
    const clear = E(lf, 3, 30, 0.36, 0.60, LIN);
    return (
      /* ⛔⛔ A PLATE IN A FIELD OF NOTHING IS STILL NOTHING. Round 6: the
         top-down camera was the right idea and the shot was still empty,
         because a flat grey ground gives the eye one object and no context.
         What it needed was EVIDENCE OF PEOPLE, which top-down does better than
         any other angle: BOOT PRINTS walking in from the frame edge, the
         painted concrete apron and its bay number showing through the drift, a
         cable conduit running away off frame, a dropped crowbar and a shovel
         stuck in the snow, scattered slabs — and the SHADOW of somebody
         standing over the whole thing, cast in from the top of the frame. That
         last one puts a person in a shot that contains no person. */
      <Scene p={pr} slug="SOMETHING UNDER THE SNOW" push={[0, 30, 1.06]} vig={0.40}>
        <Ground />
        <Apron x={520} y={452} r={356} z={14} s={1} />
        <Prints x1={-50} y1={766} x2={300} y2={604} n={10} s={1.15} z={20} fade={1} />
        <Hatch x={520} y={452} s={0.94} z={30} f={f} clear={clear} open={0}
          spin={-lf * 0.6} />
        {/* a crowbar dropped beside it and a shovel stood in the drift */}
        <div style={{ position: "absolute", left: 168, top: 496, width: 224, height: 15,
          borderRadius: 7, background: "#5A5148", zIndex: 52, transform: "rotate(15deg)",
          boxShadow: SH }} />
        <div style={{ position: "absolute", left: 154, top: 486, width: 52, height: 20,
          borderRadius: 6, background: "#6E6459", zIndex: 53, transform: "rotate(46deg)" }} />
        <div style={{ position: "absolute", left: 826, top: 240, width: 17, height: 216,
          borderRadius: 6, background: "#8A6242", zIndex: 52, transform: "rotate(-19deg)",
          boxShadow: SH }} />
        <div style={{ position: "absolute", left: 848, top: 430, width: 76, height: 92,
          borderRadius: `${8}px ${8}px ${34}px ${34}px`, background: "#98A0A9", zIndex: 53,
          transform: "rotate(-19deg)" }} />
        {/* ⭐ ROUND 7 · a rotating beacon on a post at the edge of the apron,
            seen FROM ABOVE, sweeps a wedge of amber right across the plate once
            a second. On a top-down shot that single fixture repaints half the
            frame every cycle, which is the most motion available from something
            that is bolted to the ground. Plus snow devils and tumbling sheeting. */}
        <SweepLamp x={182} y={188} s={1.34} z={22} f={f} rate={2.8} />
        <Vortex f={f} n={4} z={73} s={1.1} />
        <Debris f={f} n={6} z={79} y0={80} y1={720} speed={1.5} />
        {/* ⭐ ROUND 8 · the queue, from above. A side-on sprite cannot exist in
            a top-down shot, but a row of SHADOWS reads as a row of people just
            as well — and it keeps the camera that makes this cut worth having. */}
        <QueueShadows x={640} y={-52} n={5} s={1.06} f={f} z={66} gap={126} o={0.24} />
        <Overhead x={496} y={-58} s={1.24} z={68} f={f} o={0.28} />
        <Drift n={22} z={74} sp={1.3} />
        <Ash f={f} n={30} z={76} speed={1.6} />
        <Snow f={f} n={40} z={78} speed={2.0} c="#E6E3DB" />
        <Snow f={f} n={20} z={94} near speed={2.6} c="#F6F4EE" />
      </Scene>
    );
  }

  /* B · a mitt sweeps the rest of it clear and the whole plate reads: steel,
     chevrons, NOMAD, and a wheel where a lock would be. */
  if (shot === 1) {
    const clear = E(lf, 0, 22, 0.60, 1, OUT);
    return (
      <Scene p={pr} slug="NOMAD  ·  BAY 08" push={[30, 58, 1.06]} vig={0.42}>
        <Ground />
        <Apron x={520} y={452} r={356} z={14} s={1} />
        <Prints x1={-50} y1={766} x2={300} y2={604} n={10} s={1.15} z={20} fade={1} />
        <Hatch x={520} y={452} s={0.94} z={30} f={f} clear={clear} open={0}
          spin={-18 - lf * 0.4} />
        <SweepLamp x={182} y={188} s={1.34} z={22} f={f} rate={2.8} />
        <Vortex f={f} n={3} z={73} s={1.1} />
        <Debris f={f} n={5} z={79} y0={80} y1={720} speed={1.4} />
        <QueueShadows x={640} y={-52} n={5} s={1.06} f={f} z={66} gap={126} o={0.20} />
        <Overhead x={496} y={-58} s={1.24} z={68} f={f} o={0.24} />
        <Mitt x={112} y={300} s={1.5} z={70} rot={-18 + clear * 26} />
        <MarkPlate x={70} y={92} t="AN OFFLINE AI" s={0.92} z={72} />
        <Drift n={20} z={74} sp={1.3} />
        <Ash f={f} n={26} z={76} speed={1.4} />
        <Snow f={f} n={34} z={78} speed={1.7} c="#E6E3DB" />
        <Snow f={f} n={16} z={94} near speed={2.2} c="#F6F4EE" />
      </Scene>
    );
  }

  /* C · the wheel spins and the seal cracks — gold knifing out of the ground. */
  if (shot === 2) {
    const turn = E(lf, 2, 22, 0, 1, IO);
    const crack = E(lf, 16, 32, 0, 0.16, OUT);
    return (
      <Scene p={pr} slug="ONE HAND  ·  NO KEY" push={[58, 90, 1.06]} vig={0.46}>
        <Ground k={0.8} />
        <Apron x={520} y={452} r={356} z={14} s={1} />
        <SweepLamp x={182} y={188} s={1.34} z={22} f={f} rate={2.8} />
        <Vortex f={f} n={3} z={73} s={1.0} />
        <Hatch x={520} y={452} s={0.94} z={30} f={f} clear={1} open={crack}
          spin={-18 - turn * 210} />
        <Mitt x={128} y={356} s={1.6} z={70} rot={-14 + turn * 96} />
        <Drift n={20} z={74} sp={1.3} />
        <Ash f={f} n={22} z={76} speed={1.3} />
        <Snow f={f} n={30} z={78} speed={1.6} c="#E6E3DB" />
      </Scene>
    );
  }

  /* D · IT OPENS AT YOU. The lid swings up toward the lens and the light comes
     out of the ground. The biggest single value change in any of the four opens. */
  const open = E(lf, 0, 20, 0.16, 1, OUT);
  return (
    <Scene p={pr} slug="AND IT IS ALREADY ON" push={[90, 117, 1.06]} vig={0.40}>
      <Ground k={0.6} />
      <Hatch x={520} y={452} s={0.94} z={30} f={f} clear={1} open={open}
        spin={-228} />
      <MarkCast x={520} y={452} s={126} z={64} o={0.42 + open * 0.44} spin={1.6} f={f}
        pulse={1} />
      <Drift n={20} z={74} sp={1.3} />
        <Ash f={f} n={18} z={76} speed={1.2} />
      <Snow f={f} n={24} z={78} speed={1.4} c="#E6E3DB" />
    </Scene>
  );
};
