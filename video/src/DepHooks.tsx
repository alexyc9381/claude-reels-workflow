import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import {
  Cone, CagedBulb, Batten, Leg, Claudie, Contact, E, OUT, IO, BACK, LIN,
  hexa, mix, dark, SH, SH_D, W, H,
} from "./DepWorld";
import {
  Crate, Heap, FloorSign, Mark, Pallet, CatIcon, CAT, catD, catL,
  MANILA, MANILA_D, MANILA_L, COPPER, STEEL, STEEL_D, STENCIL,
} from "./DepProps";
import { Scene, WallEmblem } from "./DepScenes";

/* =========================================================================
   REEL 96 "AWESOME" · THE ALTERNATE OPENS, for the trial cuts.

   ⛔⛔ A VARIANT WHOSE HOOK SHARES A SHOT WITH ANOTHER IS NOT A VARIANT
      (reel 95). Each open below is a DIFFERENT MECHANISM against the same
      dread, not the same picture re-lit:

        A  THE CHUTE    (S0Hook, DepScenes)  POURING   — vertical, from above
        B  THE LOCKERS  (this file)          BURSTING  — horizontal, from a wall
        C  THE OVERLOAD (this file)          BUCKLING  — one object under strain

      Different silhouette, different direction of force, different sound.

   ⛔ Every law the main open answers, these answer too: settled at frame 0,
      the sprite IS in frame 0, bright (panel luma >= 140), the Claude mark big
      and early, and 2-3 shots each carrying a whole beat rather than a faster
      re-angle of the same one.
   ========================================================================= */

/* ---------------------------------------------------------------------------
   HOOK B · THE LOCKER WALL — 1.27s + 2.20s

   Mechanism: CONTAINMENT FAILURE. Not a pile on the floor but a wall of shut
   doors, every one of them full, and the pressure coming at you sideways. The
   dread is the same ("I saved all of this") drawn from the opposite direction.
   ------------------------------------------------------------------------ */
export const HookLockers: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 38;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);

  /* the door grid — 6 x 3, each one a category colour, most of them straining */
  const doors = Array.from({ length: 18 }, (_, i) => ({
    col: i % 6, row: Math.floor(i / 6), c: CAT[(i * 5) % CAT.length], i,
  }));

  if (shot === 0) {
    /* ⛔ SETTLED: three doors are ALREADY burst at frame 0 and the rest are
       already bulging. Nothing arrives; the failure has happened. */
    return (
      <Scene k="chute" slug="" dust vig={0.20} push={[0, 38, 1.11]}>
        <WallEmblem f={f} x={52} y={128} s={0.80} />
        {doors.map(({ col, row, c, i }) => {
          const burst = i % 5 === 2;
          const swing = burst ? 34 + Math.sin(f / 9 + i) * 5 : Math.sin(f / 14 + i) * 1.4;
          return (
            <div key={"d" + i} style={{ position: "absolute", left: 336 + col * 118,
              top: 138 + row * 190, width: 112, height: 184, zIndex: 30 + row,
              perspective: 600 }}>
              {/* the recess behind the door, crammed */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 3,
                background: "#3A4A4A" }} />
              {Array.from({ length: 3 }, (_, k) => (
                <div key={k} style={{ position: "absolute", left: 6, right: 6,
                  top: 8 + k * 58, height: 52, borderRadius: 2,
                  background: k % 2 ? catL(c) : c,
                  borderTop: `6px solid ${catD(c)}` }} />
              ))}
              {/* the door itself, hinged left */}
              <div style={{ position: "absolute", inset: 0, borderRadius: 3,
                background: `linear-gradient(168deg, ${mix(STEEL, 0.62)} 0%, ${mix(STEEL, 0.24)} 100%)`,
                transformOrigin: "0% 50%", transform: `rotateY(${-swing}deg)`,
                boxShadow: SH, border: `3px solid ${mix(STEEL, 0.10)}` }}>
                <div style={{ position: "absolute", left: 12, top: 14, opacity: 0.85 }}>
                  <CatIcon i={(i * 5) % 11} s={30} c={catL(c)} />
                </div>
                <div style={{ position: "absolute", right: 12, top: "46%", width: 16,
                  height: 26, borderRadius: 3, background: "#8A9490" }} />
              </div>
            </div>
          );
        })}
        {/* what has already spilled out of the burst doors */}
        {Array.from({ length: 11 }, (_, i) => {
          const r = (k: number) => { const v = Math.sin(i * 47.3 + k * 31.7) * 43758.5; return v - Math.floor(v); };
          const period = 44 + r(1) * 26;
          const t = ((f + r(2) * period) % period) / period;
          return (
            <Crate key={"sp" + i} x={392 + r(3) * 520} y={300 + t * 400}
              s={0.40 + r(4) * 0.20} rot={-140 + t * 300} z={52}
              c={CAT[Math.floor(r(5) * CAT.length) % CAT.length]}
              icon={Math.floor(r(5) * CAT.length) % CAT.length} mark={r(6) > 0.7} />
          );
        })}
        <Heap n={16} y={782} seed={21} z={68} x0={-60} x1={1080} />
        <Claudie x={188} y={738} s={1.34} z={62} f={f + 10} hero badge={1}
          costume={{ shock: 0.6 }} />
        <Contact x={124} y={732} w={150} z={44} o={0.28} />
        <Pallet x={912} y={790} s={1.10} z={82} n={5} seed={9} face={-1} />
        <Leg side="l" c="#8A9A9C" w={82} z={90} kind="rack" />
        <Leg side="r" c="#8A9A9C" w={82} z={90} kind="chain" />
        <Cone f={f} x={620} y={40} top={150} bot={540} len={420} c="#BFD8DA" o={0.22} z={24} sway={0.3} />
      </Scene>
    );
  }

  /* ---- B2 · the wide: the wall runs off both edges, and it is all like this */
  const sw = Math.sin(lf / 15) * 9;
  return (
    <Scene k="heap" slug="" dust vig={0.44} push={[38, 104, 1.14]}>
      <Mark x={58} y={172} s={0.74} z={16} />
      <Mark x={854} y={186} s={0.62} z={16} rot={-5} />
      {/* the same wall, smaller and repeating past both frame edges */}
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        const c = CAT[(i * 3) % CAT.length];
        return (
          <div key={"w" + i} style={{ position: "absolute", left: -30 + col * 108,
            top: 132 + row * 96, width: 100, height: 88, borderRadius: 3, zIndex: 18,
            background: `linear-gradient(168deg, ${mix(STEEL, 0.14)} 0%, ${STEEL_D} 100%)`,
            border: `2px solid ${dark(STEEL_D, 0.22)}` }}>
            <div style={{ position: "absolute", left: 8, top: 8, opacity: 0.8 }}>
              <CatIcon i={(i * 3) % 11} s={22} c={catL(c)} />
            </div>
            <div style={{ position: "absolute", left: 6, right: 6, bottom: 6, height: 12,
              borderRadius: 2, background: c, opacity: 0.9 }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 120 + sw * 24, top: 300, width: 780,
        height: 480, background: hexa("#141A18", 0.40), zIndex: 60, pointerEvents: "none",
        clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }} />
      <CagedBulb x={520} y={126} f={lf} s={1.12} z={70} flex={124} />
      <Heap n={30} y={720} seed={17} z={50} x0={-80} x1={1090} />
      <FloorSign x={506} y={604} t="UNSORTED" s={0.84} z={64} />
      <Claudie x={648} y={636} s={0.86} z={52} f={lf} hero={false} badge={0.8}
        costume={{ constr: 1 }} />
      <Leg side="l" c="#48504E" w={80} z={90} kind="rack" />
      <Leg side="r" c="#48504E" w={80} z={90} kind="rack" />
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   HOOK C · THE OVERLOADED TROLLEY — 1.53s + 1.94s

   Mechanism: BUCKLING. One object, not a room: a sack-truck stacked past any
   sane height with colour-coded freight, wheels splayed, the whole tower
   swaying. The dread here is personal rather than architectural — this is the
   pile YOU are carrying, and it is about to go.
   ------------------------------------------------------------------------ */
export const HookOverload: React.FC = () => {
  const f = useCurrentFrame();
  const CUT = 46;
  const shot = f >= CUT ? 1 : 0;
  const lf = f - (shot ? CUT : 0);
  const sway = Math.sin(f / 11) * 2.6;

  if (shot === 0) {
    return (
      <Scene k="chute" slug="" dust vig={0.10} push={[0, 46, 1.12]}>
        {/* ⭐ THE LOADING-DOCK DOOR, standing open on daylight. Cut C is the most
            saturated of the three (76 vs 58) and saturated paint is DARK paint —
            it measured 132.4 against the 140 frame-0 bar even after the
            occluders were lifted. The answer is not to desaturate the thing that
            makes this cut worth having; it is to put a genuinely bright mass in
            frame. A dock door does that AND back-lights the leaning tower, so
            the silhouette reads harder than it did lit from the front. */}
        <div style={{ position: "absolute", left: 96, top: 128, width: 520, height: 400,
          background: "linear-gradient(178deg,#F6FBF4 0%,#CFDCCE 100%)", zIndex: 8 }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"dr" + i} style={{ position: "absolute", left: 96, top: 128 + i * 58,
            width: 520, height: 7, background: "#A8B6AC", opacity: 0.55, zIndex: 9 }} />
        ))}
        <div style={{ position: "absolute", left: 78, top: 112, width: 556, height: 22,
          borderRadius: 5, background: "#8A9A9C", zIndex: 10 }} />
        <WallEmblem f={f} x={648} y={148} s={0.72} />
        {/* the tower, leaning — 13 crates stacked and already unstable */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 60,
          transform: `rotate(${sway}deg)`, transformOrigin: "336px 720px" }}>
          {Array.from({ length: 13 }, (_, i) => {
            const c = CAT[(i * 4) % CAT.length];
            return (
              <Crate key={"st" + i} x={336 + Math.sin(i * 1.7) * 22}
                y={716 - i * 52} s={0.82 - i * 0.012}
                rot={Math.sin(i * 2.3) * 4} z={60 + i} c={c}
                icon={(i * 4) % CAT.length} mark={i % 3 === 0} />
            );
          })}
          {/* the sack truck under it */}
          <div style={{ position: "absolute", left: 246, top: 700, width: 180, height: 22,
            borderRadius: 4, background: "#7C8A8C", zIndex: 58 }} />
          {[262, 396].map((x) => (
            <div key={x} style={{ position: "absolute", left: x, top: 700, width: 14,
              height: 96, background: "#8A9A9C", zIndex: 57 }} />
          ))}
          {[250, 400].map((x) => (
            <div key={"wh" + x} style={{ position: "absolute", left: x, top: 774, width: 46,
              height: 46, borderRadius: 24, background: "#41504F", zIndex: 59,
              border: "6px solid #8A9A9C" }} />
          ))}
        </div>
        <Claudie x={640} y={782} s={1.30} z={64} f={f + 8} hero badge={1}
          costume={{ shock: 0.7 }} face={-1} />
        <Contact x={578} y={776} w={140} z={46} o={0.28} />
        {/* two already fallen off the top */}
        {Array.from({ length: 4 }, (_, i) => {
          const period = 40 + i * 9;
          const t = ((f + i * 13) % period) / period;
          return (
            <Crate key={"fl" + i} x={430 + i * 34 + t * 90} y={190 + t * 520}
              s={0.44} rot={-90 + t * 260} z={74}
              c={CAT[(i * 6) % CAT.length]} icon={(i * 6) % CAT.length} />
          );
        })}
        <Heap n={10} y={790} seed={31} z={80} x0={-40} x1={340} />
        <Leg side="l" c="#8A9A9C" w={80} z={90} kind="chain" />
        <Leg side="r" c="#8A9A9C" w={80} z={90} kind="rack" />
        <Cone f={f} x={336} y={30} top={130} bot={460} len={470} c="#D2E6E8" o={0.22} z={24} sway={0.4} />
      </Scene>
    );
  }

  /* ---- C2 · it goes. Hard cut to the floor as the tower comes down. */
  return (
    <Scene k="heap" slug="" dust vig={0.42} push={[46, 104, 1.15]}>
      <Mark x={62} y={168} s={0.76} z={16} />
      <Mark x={848} y={182} s={0.64} z={16} rot={-4} />
      {/* the collapse, looping so it never stops arriving */}
      {Array.from({ length: 20 }, (_, i) => {
        const r = (k: number) => { const v = Math.sin(i * 53.9 + k * 21.3) * 43758.5; return v - Math.floor(v); };
        const period = 30 + r(1) * 24;
        const t = ((lf + r(2) * period) % period) / period;
        return (
          <Crate key={"cl" + i} x={120 + r(3) * 780} y={180 + t * 520}
            s={0.40 + r(4) * 0.22} rot={-180 + t * 420} z={54 + (i % 4)}
            c={CAT[Math.floor(r(5) * CAT.length) % CAT.length]}
            icon={Math.floor(r(5) * CAT.length) % CAT.length} mark={r(6) > 0.72} />
        );
      })}
      <Heap n={38} y={700} seed={41} z={44} x0={-80} x1={1090} spread={220} />
      <Heap n={16} y={790} seed={47} z={66} x0={-80} x1={1090} />
      <FloorSign x={506} y={598} t="UNSORTED" s={0.84} z={62} />
      <CagedBulb x={520} y={122} f={lf} s={1.08} z={70} flex={120} />
      <Claudie x={786} y={706} s={0.94} z={58} f={lf} hero badge={0.85}
        costume={{ shock: 0.4 }} />
      <Leg side="l" c="#48504E" w={80} z={90} kind="rack" />
      <Leg side="r" c="#48504E" w={80} z={90} kind="chain" />
    </Scene>
  );
};
