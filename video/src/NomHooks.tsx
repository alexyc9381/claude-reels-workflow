import React from "react";
import { useCurrentFrame } from "remotion";
import { fraunces } from "./fonts";
import { Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  CLAY, GOLD, GREEN, RED, PAPER, INK, usePlace,
  Ridge, Snow, Ash, Beam, Strip, Motes, Edge, Keeper, Mitt, Scene, Cam, MarkPlate, MarkCast,
} from "./NomWorld";
import { Portal, Bunker, Fence, Wreck, BlastDoor, Wheel, Tunnel, Mast } from "./NomProps";

/* ===========================================================================
   REEL 98 "NOMAD" — THE ALTERNATE OPENS.

   docs/THE-OPEN.md step 1: the first build step of a reel is not scene 0, it is
   N concepts for scene 0. [[feedback_hook_simplicity]]: each candidate must be
   a different MECHANISM, not one world in four colourways — if you can describe
   them all with the same sentence you have one concept.

     A  THE PORTAL   (in NomScenes)  ENTRY              — a sealed thing opens, and the lock is missing
     B  THE MAST                     INVERSION OF SCALE — the 200-foot tower is not the thing; the shoebox at its foot is
     C  THE CASE                     UNBOXING           — four latches pop and the lid lifts on light
     D  THE CROSSING                 SCALE OF EMPTINESS — one small figure, an enormous white nothing, one dark slot

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
  const CUT = [0, 34, 66, 94];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pm = usePlace("mast"), pd = usePlace("door");

  /* A · extreme LOW ANGLE. The lattice fills the frame and reads as enormous. */
  if (shot === 0) return (
    <Scene p={pm} slug="THE UPLINK MAST" push={[0, 34, 1.05]} vig={0.48}>
      <Ridge p={pm} f={f} city={0.85} lit={1} sunX={168} />
      <Cam z={40} s={1.72} y={132}>
        <Mast x={506} base={pm.horizon + 120} h={360} s={1} z={20} f={f} on={1} />
      </Cam>
      <Wreck x={168} base={pm.horizon + 232} s={0.94} z={78} />
      <MarkPlate x={82} y={214} t="OFFLINE AI · NO CLOUD" s={0.92} z={70} />
      <Fence y={pm.horizon + 252} z={84} s={1.06} torn={1} />
      <Edge side="r" c={dark(pm.back, 0.68)} kind="rock" w={130} z={90} />
        <Ash f={f} n={26} z={68} speed={1.2} />
        <Snow f={f} n={34} z={72} speed={1.4} c="#E6E3DB" />
        <Snow f={f} n={15} z={93} near speed={1.9} c="#F2F0EA" />
    </Scene>
  );

  /* B · WIDE. The same mast in silhouette, and a tiny warm rectangle at its
     foot. The whole hook is the size relationship between those two things. */
  if (shot === 1) {
    const pulse = 0.86 + Math.sin(f / 15) * 0.10;
    return (
      <Scene p={pm} slug="AND THE BOX AT ITS FOOT" push={[34, 66, 1.055]} vig={0.54}>
        <Ridge p={pm} f={f} city={0.9} lit={1} sunX={168} />
        <Mast x={640} base={pm.horizon + 96} h={396} s={1.18} z={30} f={f} on={1} />
        {/* the hut: one small mass, one warm slot, dwarfed */}
        <div style={{ position: "absolute", left: 556, top: pm.horizon + 40, width: 178,
          height: 74, background: "#8A8579", zIndex: 34, boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 556, top: pm.horizon + 40, width: 178,
          height: 8, background: "#A39D8E", zIndex: 35 }} />
        <div style={{ position: "absolute", left: 616, top: pm.horizon + 62, width: 26,
          height: 52, background: "#FBEFD2", opacity: pulse, zIndex: 36, borderRadius: "6px 6px 0 0" }} />
        <MarkCast x={645} y={pm.horizon + 20} s={72} z={38} o={0.96} />
        <Keeper x={368} y={pm.horizon + 214} s={0.86} z={40} f={f} face={1} hood={1}
          badge={1} lit={0.94} />
        <div style={{ position: "absolute", left: 570, top: pm.horizon + 104, width: 120,
          height: 60, zIndex: 33,
          background: `linear-gradient(180deg, ${hexa("#EED9AC", 0.44)} 0%, ${hexa("#EED9AC", 0)} 100%)`,
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)" }} />
        <Wreck x={862} base={pm.horizon + 250} s={0.98} z={78} face={-1} />
        <Fence y={pm.horizon + 246} z={84} s={1.04} torn={1} />
        <Edge side="l" c={dark(pm.back, 0.68)} kind="rock" w={150} z={90} />
        <Ash f={f} n={26} z={68} speed={1.2} />
        <Snow f={f} n={34} z={72} speed={1.4} c="#E6E3DB" />
        <Snow f={f} n={15} z={93} near speed={1.9} c="#F2F0EA" />
      </Scene>
    );
  }

  /* C · MEDIUM. What the rectangle actually is: a steel door with no lock. */
  if (shot === 2) {
    const fall = E(lf, 20, 27, 0, 1, IN_Q);
    return (
      <Scene p={pd} slug="NO LOCK  ·  NO KEYPAD" push={[66, 94, 1.055]} vig={0.56}>
        <Ridge p={pd} f={f} city={0.3} lit={0.8} sunX={80} />
        <BlastDoor x={506} base={pd.horizon + 120} w={560} h={510} z={30} f={f}
          bleed={0.82} frost={1 - fall * 0.5} open={0} />
        <MarkCast x={506} y={pd.horizon - 408} s={100} z={46} o={0.86} />
        <MarkPlate x={216} y={pd.horizon - 92} t="LOCAL MODEL" s={0.9} z={48} />
        <Wreck x={112} base={pd.horizon + 132} s={0.72} z={78} />
        <Edge side="r" c={dark(pd.back, 0.62)} kind="rock" w={104} z={90} />
        <Ash f={f} n={26} z={68} speed={1.2} />
        <Snow f={f} n={34} z={72} speed={1.4} c="#E6E3DB" />
        <Snow f={f} n={15} z={93} near speed={1.9} c="#F2F0EA" />
      </Scene>
    );
  }

  /* D · the wheel, and the seal parting. */
  const turn = E(lf, 2, 17, 0, 1, IO);
  const seal = E(lf, 15, 23, 0, 1, OUT);
  return (
    <Scene p={pd} slug="ONE HAND  ·  NO KEY" push={[94, 117, 1.055]} vig={0.62}>
      <div style={{ position: "absolute", inset: 0, background: dark("#6E747C", 0.50), zIndex: 1 }} />
      <Wheel x={470} y={420} r={258} z={40} rot={-turn * 118} frost={1 - turn * 0.7} />
      <MarkCast x={470} y={616} s={84} z={52} o={0.94} />
      <Mitt x={618} y={344} s={1.4} z={60} rot={-14 + turn * 110} />
      {seal > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 306 - seal * 26,
          height: 24 + seal * 66, zIndex: 80, background: "#F6E3BE", opacity: seal * 0.9,
          transform: "skewY(-4deg)" }} />
      )}
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
  const CUT = [0, 36, 68, 96];
  const shot = CUT.filter((c) => f >= c).length - 1;
  const lf = f - CUT[shot];
  const pr = usePlace("ridge"), pd = usePlace("door");

  /* A · EXTREME WIDE. The brightest frame 0 of the four cuts: a white plain
     filling two thirds of the panel, one small orange figure crossing it. */
  if (shot === 0) return (
    <Scene p={pr} slug="THE CROSSING" push={[0, 36, 1.045]} vig={0.40}>
      <Ridge p={pr} f={f} city={0.7} lit={1} sunX={880} />
      {/* the plain runs higher here — this hook is a big empty white field */}
      <div style={{ position: "absolute", left: 0, right: 0, top: pr.horizon - 40, bottom: 0,
        background: "linear-gradient(182deg, #C4D0DA 0%, #E6ECF1 100%)", zIndex: 17 }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"dr" + i} style={{ position: "absolute", left: -110 + rnd(i, 3) * 150,
          right: -110 + rnd(i, 4) * 150, top: pr.horizon + 4 + i * i * 3.2 + i * 14,
          height: 4 + i * 1.5, borderRadius: 40, background: "#AFBECB",
          opacity: 0.34 + i * 0.03, zIndex: 18 }} />
      ))}
      {/* the destination, small and far: the bunker he is walking to */}
      <Bunker x={772} base={pr.horizon + 62} s={0.40} z={19} f={f} slot={0.92}
        floods={1} lamp={1} />
      <Wreck x={148} base={pr.horizon + 150} s={0.60} z={24} />
      <MarkPlate x={92} y={210} t="AN AI, OFFLINE" s={0.94} z={70} />
      <Keeper x={288 + f * 0.9} y={pr.horizon + 214} s={0.66} z={40} f={f} walk={1} hood={1}
        badge={1} lit={0.98} />
      <Ash f={f} n={24} z={68} speed={1.1} />
      <Snow f={f} n={32} z={72} c="#E9E6DE" speed={1.3} />
      <Snow f={f} n={14} z={93} near c="#F6F4EE" speed={1.7} />
    </Scene>
  );

  /* B · MEDIUM. He passes camera with the case, snow in his face. */
  if (shot === 1) return (
    <Scene p={pr} slug="ONE MACHINE  ·  CARRIED IN" push={[36, 68, 1.055]} vig={0.48}>
      <Ridge p={pr} f={f} city={0.4} lit={1} sunX={920} />
      <div style={{ position: "absolute", left: 0, right: 0, top: pr.horizon + 60, bottom: 0,
        background: "linear-gradient(182deg, #C4D0DA 0%, #E6ECF1 100%)", zIndex: 17 }} />
      <Keeper x={470} y={742} s={1.9} z={44} f={f} walk={1} hood={1} badge={1} lit={1} />
      {/* the hard case in his off hand */}
      <div style={{ position: "absolute", left: 646, top: 512, width: 196, height: 128,
        background: "#4C5340", zIndex: 46, borderRadius: 10, boxShadow: SH_D,
        transform: `translateY(${Math.abs(Math.sin(f / 4.6)) * 6}px)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 196, height: 26,
          background: "#565E48", borderRadius: "10px 10px 0 0" }} />
        <div style={{ position: "absolute", left: 66, top: -20, width: 64, height: 24,
          borderRadius: "12px 12px 0 0", border: "8px solid #343A2B", borderBottom: "none",
          boxSizing: "border-box" }} />
      </div>
      <Wreck x={880} base={pr.horizon + 300} s={0.92} z={80} face={-1} />
      <Edge side="r" c={dark(pr.back, 0.60)} kind="rock" w={116} z={90} />
      <Ash f={f} n={28} z={68} speed={1.4} />
      <Snow f={f} n={38} z={72} c="#E9E6DE" speed={1.5} />
      <Snow f={f} n={20} z={93} near speed={2.0} c="#F6F4EE" />
    </Scene>
  );

  /* C · he stops, and the door is right there, enormous. */
  if (shot === 2) return (
    <Scene p={pd} slug="THE PORTAL  ·  NO LOCK" push={[68, 96, 1.055]} vig={0.54}>
      <Ridge p={pd} f={f} city={0.25} lit={0.8} sunX={90} />
      <BlastDoor x={556} base={pd.horizon + 126} w={600} h={540} z={30} f={f}
        bleed={0.84} frost={1} open={0} />
      <MarkCast x={556} y={pd.horizon - 392} s={96} z={46} o={0.86} />
      <MarkPlate x={94} y={pd.horizon - 300} t="LOCAL MODEL" s={0.88} z={48} />
      <Keeper x={186} y={pd.horizon + 132} s={1.16} z={60} f={f} hood={1} badge={1} lit={0.78} />
      <Ash f={f} n={22} z={68} />
      <Snow f={f} n={30} z={72} c="#E6E3DB" />
      <Snow f={f} n={13} z={93} near c="#F2F0EA" />
      <Edge side="l" c={dark(pd.back, 0.62)} kind="rock" w={104} z={91} />
    </Scene>
  );

  /* D · the wheel, and the seal parting. */
  const turn = E(lf, 1, 15, 0, 1, IO);
  const seal = E(lf, 13, 21, 0, 1, OUT);
  return (
    <Scene p={pd} slug="ONE HAND  ·  NO KEY" push={[96, 117, 1.055]} vig={0.62}>
      <div style={{ position: "absolute", inset: 0, background: dark("#6E747C", 0.54), zIndex: 1 }} />
      <div style={{ position: "absolute", right: 40, top: 40, zIndex: 4,
        fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 400, lineHeight: 1,
        color: "#8C939C", opacity: 0.30 }}>D</div>
      <Wheel x={452} y={424} r={266} z={40} rot={-turn * 124} frost={1 - turn * 0.7} />
      <MarkCast x={452} y={624} s={84} z={52} o={0.94} />
      <Mitt x={606} y={348} s={1.42} z={60} rot={-16 + turn * 114} />
      {seal > 0 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 300 - seal * 28,
          height: 24 + seal * 70, zIndex: 80, background: "#F6E3BE", opacity: seal * 0.9,
          transform: "skewY(-4deg)" }} />
      )}
      <Edge side="l" c="#3E434A" kind="wall" w={92} z={90} />
    </Scene>
  );
};
