import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, R, asPlace, mono, ui,
  Ring, Puff, Steam, Crew, Hero, Forearm, Fall, Motes, rock, squash,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, SLATE,
} from "./MemWorld";
import {
  TopicFile, Bay, Press, SpeechRibbon, WorksSign, RackSkeleton, NoteTower,
  SecondBrain, AlarmMark,
} from "./MemProps";
import { Room } from "./HwSets";
import type { SP } from "./MemScenes";
import { GY } from "./MemScenes";

/* ===========================================================================
   REEL 124 · "MEM" — THE HOOK CANDIDATES.

   ⛔ THE FIRST BUILD STEP OF ANY REEL IS NOT SCENE 0, IT IS N CONCEPTS FOR
   SCENE 0 (docs/THE-OPEN.md step 1). Four here, each a genuinely different
   WORLD rather than one world in four colourways, each rendered at frame 0 at
   FULL CHASSIS QUALITY — the decision is visual, so the artefact has to be.

   ⛔⛔⛔ WHAT THE FIRST PASS OF THIS FILE GOT WRONG, MEASURED OFF ITS OWN
   STILLS, because it is the most expensive class of mistake there is:

     1 THE CLAIM PLATE WAS PAINTED OVER THE SUBJECT. A full-width cream card at
       panel y 96..272 sat directly on top of the crate the entire hook is
       about. The crate was invisible, and the hero's two forearms — which
       correctly ENDED on it — read as two clay sticks hanging in mid-air, i.e.
       the exact "limb terminating in nothing" shape that cost reel 110 two
       rounds. §6 defect 2 and §17 in one frame.
       ⭐ FIX, and it is reel 110's: A GATE CARRIED BY THE WRONG OBJECT DEFORMS
       THAT OBJECT. The frame-0 luma and claim-plate jobs move onto `WorksSign`,
       a lit enamel board BOLTED TO THE WALL at a different x from the hero. It
       is a set element, so it also answers "is this a place or a backdrop".

     2 THE HERO WAS 20% OF THE PANEL AND THE PROP WAS SMALLER. Two small objects
       and neither dominant, in a frame with two thirds dead floor under them.
       ⭐ FIX: hero 340px, and the load is a TOWER standing on the floor that is
       TALLER THAN HE IS. One figure, one mass, a clear relationship.

     3 THE SET WAS A BACKDROP. Measured on the still: luma 153 (fine) but only
       10.1% saturated pixels, and the "wall" was a rank of pale grey boxes.
       ⭐ FIX: the `floor` palette went bone-and-brass, and the back wall now
       carries a real `RackSkeleton` — uprights, cross-rails, foot plates, bays
       standing EMPTY at frame 0. A before state has to be legible on frame 1,
       and "it built itself" needs something to have been built.

   THE FOUR LAWS OF FRAME 0, and how these answer them:
     1 BRIGHT      the bone `floor` set, the only place built for the >=140 bar,
                   plus the lit enamel sign
     2 SUBJECT     a Claude is on screen at frame 0 in all four, at 340px
     3 RECOGNITION the thing the viewer dreads is the vault THEY maintain by
                   hand, and it carries a real mark
     4 MUTE-READ   one claim, big, in the display face, on the sign

   ⭐⭐ AND THE RULE THAT OUTRANKS ALL FOUR: a hook is an IMAGE, not a ROOM.
   Reel 110's first hook obeyed every law above, measured 17.68 — one of the
   strongest opens this repo has produced — and was rejected for having five
   objects competing across the frame. ONE dominant object, empty stage.
   ⛔ AND A CUT IS NOT AN EVENT. Each of these is ONE locked framing in which
   one thing HAPPENS: a before state, a trigger, travel, and an arrival that
   costs something.
   ========================================================================= */

export type HookId = "drop" | "head" | "prints" | "swap";

/** ⭐ the drawn head top of a `Hero`, MEASURED off a still rather than derived.
    `Hero` puts the div at `top: y - size`, but `Mascot` starts its drawn body
    lower than its own div's top edge: at size 286 on GY the hat crown rendered
    at panel y 481, i.e. 0.787 * size above the ground line. Reel 110 spent two
    rounds on a crown floating 38px over a head by trusting the container maths.
    READ THE PIXELS, DO NOT TRUST THE ALGEBRA. */
export const headTop = (y: number, size: number) => y - size * 0.787;

/* =========================================================================
   ⭐⭐ THE SHARED PAYOFF — the two VARIANT hooks end the same way, because all
   three hook takes end on the same three words: "a second brain".
   `drop` keeps its own inline copy: it is the cut that was reviewed five times
   and signed off, and re-pointing approved frames at a new component to save
   forty lines is how an approved shot quietly stops being the approved shot.
   ⛔ IT EXISTS BECAUSE THE TRIAL CUTS FELL BEHIND. Rounds 3-5 rebuilt `drop`
   into 222 lines while `head` sat at 81 and `swap` at 49, so two of the three
   delivered cuts still opened on the version that had already been rejected.
   Anything the hooks SHARE now lives here and cannot drift again; what each
   hook owns is only its own before-state and its own trigger.
   ⛔ AND IT IS SCALED BY `dur`, because the three takes are different lengths
   (113 / 88 / 103 frames). A fixed frame number would land the coupling past
   the end of the shortest cut.
   ====================================================================== */
const BrainArrival: React.FC<{ f: number; dur: number; x: number; crown: number;
  heroX: number; y0?: number; s0?: number; chains?: boolean; z?: number; arc?: number }> =
  ({ f, dur, x, crown, heroX, y0 = -20, s0 = 0.58, chains = true, z = 52, arc = 0 }) => {
  const A = Math.round(dur * 0.26), B = Math.round(dur * 0.78);
  /* ⛔ NOT "down" — `head` travels UP out of a case and `swap` does not travel
     at all, it blooms in place. The three cuts have to arrive along three
     different axes or the dHash reads them as one shot three times, which is
     the exact failure the trial-cut doc was written after. */
  const down = E(f, A, B, 0, 1, LIN);
  const seat = E(f, B, B + 6, 0, 1, OUT) - E(f, B + 6, B + 24, 0, 1, IO);
  const lit  = E(f, A + 14, dur - 6, 0, 1, LIN);
  const core = down * 0.7 + 0.3 * Math.abs(Math.sin(f * 0.16));
  const yEnd = crown + 62;
  /* ⭐ `arc` buys TRAVEL that a straight line between two close points cannot.
     When a variant starts the brain near where it ends — rising out of a case
     on the floor is only ~190px — the straight version repaints almost nothing
     and the whole arrival reads as a scale-up in place. Overshooting above the
     seat and settling back doubles the distance and gives the landing a beat. */
  const brainY = y0 + down * (yEnd - y0) - Math.sin(down * Math.PI) * arc;
  return (<>
    {chains && (<>
      <div style={{ position: "absolute", left: -40, top: 76, width: W + 80, height: 26, zIndex: 26,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.26)} 0%, ${dkh(SLATE, 0.46)} 100%)` }} />
      {[-134, 134].map((cx, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: x + cx, top: 100,
          opacity: 1 - seat * 0.4, width: 10, height: Math.max(0, brainY - 100), zIndex: 27,
          background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.28)} 0px, ${dkh(STEEL, 0.28)} 10px, ${mxh(STEEL, 0.14)} 10px, ${mxh(STEEL, 0.14)} 19px)` }} />
      ))}
    </>)}
    {/* ⭐ the light it casts: a pool on the floor and a wash up the wall, both
        growing with the descent. This is what pays for the dim */}
    <div style={{ position: "absolute", left: x - 470, top: GY - 150, width: 940, height: 300,
      zIndex: 30, borderRadius: "50%", pointerEvents: "none",
      opacity: 0.20 + down * 0.60 + seat * 0.22, filter: "blur(34px)",
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFC6D2", 0.80)} 0%, ${hexa("#FF92A8", 0.26)} 46%, ${hexa("#FF7E98", 0)} 100%)` }} />
    <div style={{ position: "absolute", left: x - 400, top: 90, width: 800, height: 420,
      zIndex: 19, borderRadius: "50%", pointerEvents: "none",
      opacity: down * 0.48 + lit * 0.24, filter: "blur(46px)",
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFB8C8", 0.62)} 0%, ${hexa("#FF8AA4", 0)} 100%)` }} />
    {down > 0.001 && (
      <div style={{ position: "absolute", inset: 0, zIndex: z,
        transform: `scale(${s0 + down * (1 - s0)})`, transformOrigin: `${x}px ${brainY}px` }}>
        <SecondBrain x={x} y={brainY} w={508} z={z} f={f} lit={lit} seat={seat} core={core}
          colours={R.topicColour} labels={R.topics} />
      </div>
    )}
    <Ring x={x} y={crown + 40} f={f} at={B} c={hexa("#FFD2DC", 0.95)} />
    <Puff x={x - 150} y={GY} f={f} at={B + 1} c={hexa("#E8DCC0", 0.7)} />
    <Puff x={x + 150} y={GY} f={f} at={B + 2} c={hexa("#E8DCC0", 0.7)} />
    {/* the spine — what turns "a thing near his head" into "attached" */}
    {(seat > 0.02 || lit > 0.02) && (
      <div style={{ position: "absolute", left: heroX + 152, top: crown + 34, width: 28,
        height: 150 * Math.min(1, (seat + lit) * 3), zIndex: 61, overflow: "hidden" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"vt" + i} style={{ position: "absolute", left: 0, top: i * 25, width: 28,
            height: 19, borderRadius: 5,
            background: `linear-gradient(180deg, ${mxh(CLAY, 0.26)} 0%, ${dkh(CLAY, 0.32)} 100%)` }} />
        ))}
      </div>
    )}
  </>);
};

/** the room going down for the arrival and coming back up as it wakes.
    ⛔ NEUTRAL and RAMPED — never a colour tint, never a flash, and frame 0 is
    untouched because the >=140 luma law is a frame-0 law. */
const arrivalDim = (f: number, dur: number) =>
  E(f, Math.round(dur * 0.16), Math.round(dur * 0.42), 0, 1, LIN) * 0.72
  - E(f, Math.round(dur * 0.80), dur, 0, 1, IO) * 0.50;

const DimOverlay: React.FC<{ f: number; dur: number }> = ({ f, dur }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: 98, pointerEvents: "none",
    opacity: arrivalDim(f, dur),
    background: `radial-gradient(44% 40% at 50% 36%, ${hexa("#04050A", 0.02)} 0%, ${hexa("#04050A", 0.70)} 52%, ${hexa("#04050A", 0.97)} 100%)` }} />
);

/* =========================================================================
   A · "DROP" — the vault you keep BY HAND collapses, and the rack fills
     BEFORE   f0, settled and legible: a tower of hand-kept note bundles
              standing on the floor, TALLER than the hero, the real mark on its
              top unit, visibly leaning. Behind them, an EMPTY rack skeleton.
     TRIGGER  f20, on "Delete": the bottom unit gives.
     TRAVEL   five units pancake down over 30 frames, each starting before the
              one under it has landed (⛔ §13: stepping this would read choppy —
              overlapping action is smooth AND repaints more).
     ARRIVAL  each lands with a squash, a dust ring and a burst of loose paper
              thrown sideways; the floor recoils; the hero staggers back.
     PAYOFF   f46-104, overlapping the last landing: the rack behind him LIGHTS
              and loads itself bay by bay, no hands anywhere near it.
   ====================================================================== */
const HookDrop: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  /* ⭐⭐ FRAME 0 IS MID-FALL, asked for directly (*"it should start at 0 seconds
     mid fall"*), and it is the stronger open: THE-OPEN law 3 wants the thing
     itself, big, ALREADY HAPPENING, and v1 spent its first 20 frames on a tower
     merely standing there. `GO = -16` pre-rolls the collapse so frame 0 catches
     the bottom unit landed, the second nearly down, the third halfway and the
     top two still up — a legible state, not a half-rolled one.
     ⛔ The frame-0 law it bends ("settled, not merely started") exists to stop a
     counter being caught mid-roll showing garbage. A tower caught mid-collapse
     is a state a viewer can read instantly, which is the thing the law protects. */
  const GO = -10, N = 5, UNIT = 92;
  const unitK = (i: number) => E(f, GO + i * 5, GO + i * 5 + 14, 0, 1, IN_Q);
  const lean = -2.4 - Math.sin(f / 21) * 1.6;
  const lastLand = GO + (N - 1) * 5 + 14;                       /* f18 */
  const slam = rock(f, 0, 20, 11) + rock(f, lastLand, 17, 13);
  /* the alarm runs hot from frame 0 and only lets go once the brain arrives */
  const alarm = 1 - E(f, 28, 44, 0, 1, IO);
  /* THE SECOND BRAIN: down f30-70, seats f70, drawers light through to f106 */
  const down = E(f, 28, 86, 0, 1, LIN);
  const seat = E(f, 86, 92, 0, 1, OUT) - E(f, 92, 112, 0, 1, IO);
  const lit  = E(f, 44, 92, 0, 1, LIN);
  const HX = 506, HS = 396, BX = 506, TX = 690;
  const crown = headTop(GY, HS);                                /* 435 */
  const brainY = -20 + down * (crown + 96 + 20);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.26} glow={hexa(p.key, 0.24)}
      overlay={
        /* ⭐ THE ROOM GOES DOWN AS THE BRAIN COMES IN — asked for directly, and
           it is the oldest rule in the look doc: HIERARCHY NEEDS DARKNESS. A
           glow is only a glow against something darker, so the works dims from
           f28 while the brain's own pool lights the middle back up. It is
           NEUTRAL and it RAMPS: never a colour tint (reel 78's red pulse was
           rejected for exactly that) and never a flash. Frame 0 is untouched,
           which is the only frame the >=140 luma law applies to. */
        <div style={{ position: "absolute", inset: 0, zIndex: 98, pointerEvents: "none",
          opacity: E(f, 16, 64, 0, 1, LIN) * 0.72 - E(f, 90, 116, 0, 1, IO) * 0.50,
          /* ⭐ TIGHTER AND DEEPER. A glow is only as bright as what surrounds it
             is dark, so the falloff now starts at 44% of the frame instead of
             78%: the middle where the brain hangs stays readable and everything
             outside it goes to near black. Frame 0 is untouched — the >=140 luma
             law is a FRAME 0 law and the dim does not begin until f18. */
          background: `radial-gradient(44% 40% at 50% 36%, ${hexa("#04050A", 0.02)} 0%, ${hexa("#04050A", 0.70)} 52%, ${hexa("#04050A", 0.97)} 100%)` }} />
      }>
      <Room p={p} f={f} dx={0} bands={3} kind="shelf" overhead="gantry"
        rake={0.12} rakeRate={4.6} rakeN={7} floorKind="slab" grit={0.5}
        lamp={{ x: 300, y: 118, r: 300 }} />

      {/* the gantry the brain comes down on, and its two chains */}
      <div style={{ position: "absolute", left: -40, top: 76, width: W + 80, height: 26, zIndex: 26,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.26)} 0%, ${dkh(SLATE, 0.46)} 100%)` }} />
      {[-134, 134].map((cx, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: BX + cx, top: 100, opacity: 1 - seat * 0.4,
          width: 10, height: Math.max(0, brainY - 340 + 320 - 100 + 240), zIndex: 27,
          background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.28)} 0px, ${dkh(STEEL, 0.28)} 9px, ${mxh(STEEL, 0.14)} 9px, ${mxh(STEEL, 0.14)} 17px)` }} />
      ))}

      {/* ⛔ the mass cropped by the panel edge — place, not backdrop */}
      <div style={{ position: "absolute", left: -70, top: 210, width: 128, height: 600, zIndex: 68,
        background: `linear-gradient(96deg, ${dkh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.54)} 100%)` }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: 9, height: "100%",
          background: mxh(SLATE, 0.10) }} />
      </div>

      <div style={{ position: "absolute", left: 206, top: GY - 66, width: 600, height: 112,
        zIndex: 18, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFE9B8", 0.40)} 0%, ${hexa("#FFE9B8", 0)} 100%)` }} />

      {/* the left-hand spill — notes that came off this pile before the shot
             started. It is set dressing and it exists to balance the floor. */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"sp" + i} style={{ position: "absolute", left: 132 + (i % 4) * 62 + (i % 2) * 18,
          top: GY - 44 - Math.floor(i / 4) * 26, width: 74, height: 52, zIndex: 40,
          borderRadius: 3, transform: `rotate(${-24 + i * 13}deg)`,
          background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.20)} 100%)` }}>
          <div style={{ position: "absolute", left: 10, top: 12, width: 42, height: 3.4,
            background: hexa(INK, 0.24) }} />
          <div style={{ position: "absolute", left: 10, top: 22, width: 30, height: 3.4,
            background: hexa(INK, 0.18) }} />
        </div>
      ))}

      {/* ── THE TOWER, already going at frame 0 ── */}
      {Array.from({ length: N }, (_, i) => {
        const k = unitK(i);
        const start = GY - i * UNIT;
        const rest = GY - i * 24;
        const yy = start + k * (rest - start);
        const sq = k >= 1 ? squash(f - (GO + i * 5 + 14), 6, 0.20, 3, 10) : 1;
        return (
          <div key={"un" + i} style={{ position: "absolute", inset: 0, zIndex: 52 + i,
            transform: `scale(${1 / sq}, ${sq})`, transformOrigin: `${TX}px ${GY}px` }}>
            <NoteTower x={TX + k * (i % 2 ? 34 : -30)} y={yy} s={1.0} z={52 + i} f={f} n={1}
              unit={UNIT} lean={(1 - k) * lean * (i + 1) * 0.34 + k * (i % 2 ? 7 : -8)}
              mark={null} stencil={i === 0} />
          </div>
        );
      })}
      {/* ⭐ THE MARK, BIG AND SHAKING. It rides the top unit down, so it is the
             thing the eye tracks through the whole collapse. */}
      {/* ⭐ "DELETE OBSIDIAN" — the word lands at f5 (measured off the caption
             JSON), so the cross stamps at f10 and it breaks at f16. */}
      {/* ⛔ AT 292px IT HAS TO SIT HIGHER. The mark rides the crown of the stack,
             and at the old -22 offset a tile this size dropped its lower third
             onto the hero's hat at z 72 — over him, which is the one place
             nothing is allowed to be. -70 clears his crown and still sits under
             the header pill. */}
      <AlarmMark x={TX} y={GY - (N - 1) * UNIT - 70 + unitK(N - 1) * ((GY - (N - 1) * 24) - (GY - (N - 1) * UNIT))}
        s={1.0} z={72} f={f} alarm={alarm} tilt={-8 + unitK(N - 1) * 26}
        strike={E(f, 10, 17, 0, 1, BACK)} shatter={E(f, 16, 44, 0, 1, IN_Q)} />

      {/* the paper each landing throws */}
      {Array.from({ length: N }, (_, i) => {
        const at = GO + i * 5 + 14;
        if (f < at) return null;
        const t = E(f, at, at + 30, 0, 1, OUT);
        return Array.from({ length: 5 }, (_, j) => {
          const dir = j % 2 ? 1 : -1;
          const r = t * (150 + j * 62);
          return (
            <div key={`bp${i}_${j}`} style={{ position: "absolute",
              left: TX + dir * r - 27, top: GY - 60 - Math.sin(t * Math.PI) * (110 + j * 26) + t * t * 90,
              width: 54, height: 66, borderRadius: 3, zIndex: 64, opacity: 1 - t * 0.45,
              transform: `rotate(${j * 47 + t * dir * 240}deg)`,
              background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.18)} 100%)` }}>
              <div style={{ position: "absolute", left: 9, top: 15, width: 32, height: 3.4,
                background: hexa(INK, 0.26) }} />
            </div>
          );
        });
      })}
      {[0, 2, 4].map(i => (
        <Ring key={"rg" + i} x={TX} y={GY - 10} f={f} at={GO + i * 5 + 14} c={hexa("#FFE6B4", 0.9)} />
      ))}
      <Puff x={TX - 150} y={GY} f={f} at={2} c={hexa("#E4D6BC", 0.7)} />
      <Puff x={TX + 150} y={GY} f={f} at={lastLand} c={hexa("#E4D6BC", 0.7)} />

      {/* ── THE SECOND BRAIN, coming down onto him ── */}
      {/* ⭐ IT GROWS AS IT COMES. A 508px object sliding 25px per sample repaints
             1.6% of the panel and that is all 1.5-2.0s had. Descending toward
             the viewer is ALSO a scale change, and a scale change on the largest
             object in the frame repaints a band the full width of it on every
             sample. 0.58 -> 1.00 across the descent, anchored at the collar so
             the landing position cannot drift.
             ⛔ transformOrigin, never `scale() translate()` — that multiplies
             the translate by the scale and the object lands somewhere else. */}
      {down > 0.001 && (
      <div style={{ position: "absolute", inset: 0, zIndex: 52,
        transform: `scale(${0.58 + down * 0.42})`,
        transformOrigin: `${BX}px ${brainY}px` }}>
        <SecondBrain x={BX} y={brainY} w={508} z={52} f={f} lit={lit} seat={seat}
          core={down * 0.7 + 0.3 * Math.abs(Math.sin(f * 0.16))}
          colours={R.topicColour} labels={R.topics} />
      </div>
      )}

      {/* ⭐ THE LIGHT IT CASTS. A dim room costs contrast, and contrast is half of
             what the motion formula multiplies — the 2-3s second went to 2.7 the
             moment the dim went deep. The answer is not a lighter room, it is a
             BRIGHTER SUBJECT that lights the room back: a pool on the floor and
             a wash up the back wall, both growing with the descent. Large,
             bright, moving, against near black. */}
      <div style={{ position: "absolute", left: BX - 470, top: GY - 150, width: 940, height: 300,
        zIndex: 30, borderRadius: "50%", pointerEvents: "none",
        opacity: 0.20 + down * 0.60 + seat * 0.22, filter: "blur(34px)",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFC6D2", 0.80)} 0%, ${hexa("#FF92A8", 0.26)} 46%, ${hexa("#FF7E98", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: BX - 400, top: 90, width: 800, height: 420,
        zIndex: 19, borderRadius: "50%", pointerEvents: "none",
        opacity: down * 0.48 + lit * 0.24, filter: "blur(46px)",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFB8C8", 0.62)} 0%, ${hexa("#FF8AA4", 0)} 100%)` }} />

      {/* the arrival: a ring off the collar, dust either side, and the floor
             taking it. Nothing in this reel lands and simply stops. */}
      <Ring x={BX} y={crown + 40} f={f} at={86} c={hexa("#FFD2DC", 0.95)} />
      <Puff x={BX - 150} y={GY} f={f} at={87} c={hexa("#E8DCC0", 0.7)} />
      <Puff x={BX + 150} y={GY} f={f} at={88} c={hexa("#E8DCC0", 0.7)} />

      {/* ── THE HERO ── shocked from frame 0, recoiling, then it seats on him ── */}
      <Hero f={f} x={HX} y={GY + slam * 0.5} size={HS} z={60}
        costume={{ constr: 1 }}
        strain={0.30 * (1 - E(f, 0, 12, 0, 1, OUT)) + 0.62 * seat}
        drive={-E(f, 0, 8, 0, 1, OUT) * 0.30 + E(f, 14, 40, 0, 1, IO) * 0.30
               - E(f, 42, 68, 0, 1, IO) * 0.46 + E(f, 86, 104, 0, 1, OUT) * 0.46}
        reach={130}
        /* ⭐ MAXIMUM SHOCK AT FRAME 0 and held through the collapse — asked for
           directly. It only lets go when the brain seats, and then he cheers. */
        shock={Math.max(1 - E(f, 26, 46, 0, 1, IO), seat * 0.8)}
        stern={0.5 * alarm}
        heat={0.42 * alarm}
        cheer={E(f, 96, 112, 0, 0.9, OUT)}
        gaze={0.9 * (1 - E(f, 30, 44, 0, 1, OUT)) - 0.85 * E(f, 44, 62, 0, 1, OUT)}
        act={3} ph={0.3} />
      <Contact x={HX} y={GY} w={310} z={44} o={0.34} />
      {alarm > 0.3 && <Steam x={HX} y={crown} f={f} at={0} n={4} />}
      {/* ⭐ THE SPINE. A brain that merely hovers near a head is a cabinet on a
             chain; what makes it ATTACHED is a run of vertebrae from the collar
             down his back, drawn the frame it couples. */}
      {seat > 0.02 || lit > 0.02 ? (
        <div style={{ position: "absolute", left: HX + 152, top: crown + 34, width: 28,
          height: 150 * Math.min(1, (seat + lit) * 3), zIndex: 61, overflow: "hidden" }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"vt" + i} style={{ position: "absolute", left: 0, top: i * 25, width: 26,
              height: 19, borderRadius: 5,
              background: `linear-gradient(180deg, ${mxh(CLAY, 0.26)} 0%, ${dkh(CLAY, 0.32)} 100%)` }} />
          ))}
        </div>
      ) : null}

      {/* ── THE CLAIM, on the wall, clear of both ── */}
      {/* the claim shrinks into the corner: with a 396px hero and a 486px brain
          in the middle of the frame, a big board is one object too many. It
          still carries frame-0 luma and it is still a set element bolted to the
          wall — it is simply not competing any more. */}
      {/* ⛔ THE SIGN IS GONE. It said the same eleven words as the header pill
             directly above it, and it was the only thing on the left of a frame
             whose every other object sat right of centre — so it was paying for
             the imbalance without adding a single fact. A hook is an IMAGE. */}
    </Scene>
  );
};

/* =========================================================================
   B · "HEAD" — the OFFICIAL RELEASE: a sealed case, and the thing rises out
   Cut: AMBER. VO: "Most people don't realize that Anthropic just released an
   official second brain for Claude."
     ⛔ REBUILT. v1 of this hook was written before the drop hook was reviewed
     five times, and it still had every defect those rounds removed: the gold
     drawer-bank brain (rejected as a lung, a butterfly and bandages), a
     WorksSign repeating the header pill, a hero at x=276 with the whole load
     down the right, and no dim, so the arrival had nothing to be bright
     against. Two of the three delivered cuts were opening on the version the
     first cut had already been rejected for.
     BEFORE   f0, mid-action: the official seal across a shipping case is
              already parting, one hot line of light in the seam.
     TRIGGER  f4, the lid breaks its hinge line.
     TRAVEL   ⭐ the brain rises OUT of the case — UPWARD, against `drop`'s
              descent. Same payoff, opposite axis, so the two cuts cannot hash
              as the same shot.
     ARRIVAL  f69, it seats on his crown and the spine draws down his back.
   ====================================================================== */
const HookHead: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const HX = 506, HS = 396;
  const crown = headTop(GY, HS);
  /* ⛔ THE CASE WAS 214 TALL AND IT ATE HIM. At 396px the hero's crown sits
     311px above the floor, so a case that stands 214px in front of him left
     97px of hero on screen — a hat and no character, in the one shot whose
     whole payoff is that the thing lands ON HIM. 110 is knee height: it still
     reads as freight, and two thirds of him clears it. */
  const CX = 506, CW = 560, CH = 110;
  const CTOP = GY - CH;
  /* ⭐ FRAME 0 IS MID-ACTION, the same law `drop` is built on: the seal is
     already parting. A case merely sitting shut is a picture of nothing. */
  const snap  = E(f, -8, 6, 0, 1, IN_Q);
  const lidUp = E(f, 2, 26, 0, 1, OUT);
  const lidGo = E(f, 26, 54, 0, 1, IN_Q);
  const alarm = 1 - E(f, 22, 40, 0, 1, IO);
  const B = Math.round(dur * 0.78);
  const seat = E(f, B, B + 6, 0, 1, OUT) - E(f, B + 6, B + 24, 0, 1, IO);
  /* ⭐ and the seam is ALREADY POURING at frame 0, which is both the brighter
     frame and the truer one: this shot opens on a seal that has just gone, not
     on a case waiting to be opened. */
  const mouth = 0.60 + snap * 0.22 + lidUp * 0.20;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.26} glow={hexa(p.key, 0.24)}
      overlay={<DimOverlay f={f} dur={dur} />}>
      {/* ⛔ a DIFFERENT ROOM BUILD, not a different grade. rakeN and rakeRate
          change the band PITCH itself, which a dHash can see; a phase offset
          modulo that pitch is inert and cost reel 122 its top variant lever. */}
      {/* ⛔ `plant` gave this cut a dark boarded lower wall across rows 4-6 —
          96 / 124 / 117 against the house cut's 139 / 131 / 150 — and rows 4-6
          are two thirds of the panel. `rack` is pale bone at the same height.
          The BUILD still differs from the other two on every other axis
          (overhead, floor, rake pitch), which is what the dHash reads. */}
      <Room p={p} f={f} dx={0} bands={3} kind="rack" overhead="duct"
        rake={0.13} rakeX={0} rakeRate={6.1} rakeN={5} floorKind="boards" grit={0.5}
        lamp={{ x: 560, y: 150, r: 470 }} />

      {/* freight either side, so frame 0 is a PLACE and not one object on a
          wall — and so the case reads as one of several, i.e. a delivery. */}
      <Bay x={112} y={GY} w={188} h={252} z={24} f={f} lit={0.84} n={4} fill={0.80} />
      <Bay x={904} y={GY} w={188} h={300} z={24} f={f} lit={0.78} n={5} fill={0.70} />

      {/* ⛔ the mass cropped by the panel edge — and on the RIGHT, where `drop`
          has open floor, so the two frames are not the same silhouette. */}
      {/* ⛔ AND THIS WAS 4.6% OF THE PANEL AT LUMA 40. The right column measured
          84 against the house cut's 141, and an occluder exists to give the frame
          a near mass — it does not have to be the darkest thing in the shot. Half
          the width, a lit face, and the dark kept in its shadowed edge, which is
          where a near mass reads from anyway. */}
      <div style={{ position: "absolute", left: W - 36, top: 210, width: 108, height: 600, zIndex: 68,
        background: `linear-gradient(276deg, ${mxh(SLATE, 0.40)} 0%, ${mxh(SLATE, 0.06)} 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 11, height: "100%",
          background: dkh(SLATE, 0.44) }} />
      </div>

      {/* ⭐ ROW 4 WAS THE LAST 0.5 OF A LUMA POINT. The wall directly behind the
             case was lit by nothing — the case's own light was all pointing up
             past it. A wash on the wall at the height the case sits is both the
             missing brightness and the missing depth cue: it is what says the
             hot thing is IN FRONT of the wall rather than pasted on it. */}
      <div style={{ position: "absolute", left: CX - 430, top: CTOP - 320, width: 860, height: 420,
        zIndex: 21, borderRadius: "50%", pointerEvents: "none", filter: "blur(40px)",
        opacity: 0.30 + mouth * 0.26,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF2E2", 0.86)} 0%, ${hexa("#FFE9B8", 0)} 100%)` }} />

      <div style={{ position: "absolute", left: 96, top: GY - 78, width: 820, height: 148,
        zIndex: 18, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFEFC8", 0.62)} 0%, ${hexa("#FFE9B8", 0)} 100%)` }} />

      {/* ── THE HERO, dead centre, behind his own case ── */}
      <Hero f={f} x={HX} y={GY} size={HS} z={60} costume={{ constr: 1 }}
        act={3} ph={0.45}
        strain={0.24 * (1 - E(f, 0, 14, 0, 1, OUT)) + 0.58 * seat}
        drive={E(f, 6, 30, 0, 1, IO) * 0.26 - E(f, 34, 62, 0, 1, IO) * 0.40
               + E(f, B, B + 18, 0, 1, OUT) * 0.44}
        reach={126}
        shock={Math.max(1 - E(f, 20, 40, 0, 1, IO), seat * 0.8)}
        stern={0.46 * alarm} heat={0.40 * alarm}
        cheer={E(f, B + 10, B + 26, 0, 0.9, OUT)}
        gaze={0.9 * (1 - E(f, 26, 40, 0, 1, OUT)) - 0.85 * E(f, 40, 58, 0, 1, OUT)} />
      <Contact x={HX} y={GY} w={310} z={44} o={0.34} />
      {alarm > 0.3 && <Steam x={HX} y={crown} f={f} at={0} n={4} />}

      {/* ── THE CASE, dead centre and IN FRONT of him: the plinth the news
             arrives in. Riveted, stencilled, and wide enough to read as freight
             rather than as a box on a table. ── */}
      <div style={{ position: "absolute", left: CX - CW / 2, top: CTOP, width: CW, height: CH,
        /* ⛔ FRAME-0 LUMA. The amber cut measured 131.7 against a 140 bar while
           house sat at 154, and the difference was almost entirely this object:
           a near-black case 560x110 dead centre is 7.7% of the panel. It is now
           a LIGHT flight case with dark edges and dark rivets — the same value
           SPREAD, carried around a bright face instead of a dark one, which is
           the only legal way to move the mean (⛔ never by lifting the shadows:
           that is the exact move that caused the 93-105 pale drift). */
        zIndex: 70, borderRadius: 9, boxShadow: SH,
        background: `linear-gradient(172deg, ${mxh(SLATE, 0.86)} 0%, ${mxh(SLATE, 0.64)} 54%, ${mxh(SLATE, 0.34)} 100%)`,
        border: `7px solid ${dkh(SLATE, 0.52)}` }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"rv" + i} style={{ position: "absolute", left: 16 + (i % 6) * 96,
            top: i < 6 ? 12 : CH - 26, width: 11, height: 11, borderRadius: "50%",
            background: dkh(SLATE, 0.34), boxShadow: `inset 0 -2px 0 ${dkh(SLATE, 0.6)}` }} />
        ))}
        <div style={{ position: "absolute", left: 36, top: 34 }}>
          <span style={{ ...mono(28, 900), color: hexa(INK, 0.46), letterSpacing: 3.4 }}>MEMORY</span>
        </div>
        {/* the light coming out of it, hard and warm */}
        <div style={{ position: "absolute", left: 22, top: -6, width: CW - 58, height: 22,
          borderRadius: 11, filter: "blur(7px)", opacity: 0.35 + mouth * 0.65,
          background: `linear-gradient(90deg, ${hexa("#FFC6D2", 0)} 0%, ${hexa("#FFE2E8", 0.95)} 50%, ${hexa("#FFC6D2", 0)} 100%)` }} />
      </div>
      {/* ⭐⭐ WHAT THE HOUSE CUT HAS AND THIS ONE DID NOT: WHITE. Side by side at
             frame 0, house carries a 292px cream mark plate and a floor of loose
             white paper; this cut was tan wall, tan floor and one grey case, and
             no amount of raising the room's lamp fixes a frame with nothing
             bright IN it. Panel rows 4 and 6 measured 100 and 124 against 139
             and 150. So the case has already been unpacked when we arrive —
             which is also the truer frame: this is a shot of something that has
             just been opened, not of something waiting to be.
             ⛔ AND THEY ARE PRE-SEEDED WITH A z, not merely with a time. Reel
             122 put two crates at frame 0 at the right coordinates and drew them
             behind a 296px sprite on the same x. These sit at z 72, on the floor,
             clear of the case at 226-786. */}
      {Array.from({ length: 9 }, (_, i) => {
        const side = i < 5 ? -1 : 1;
        const k = i < 5 ? i : i - 5;
        return (
          <div key={"ps" + i} style={{ position: "absolute",
            left: CX + side * (232 + k * 58) + (k % 2) * 20 - 38,
            top: GY - 46 - (k % 3) * 26, width: 78, height: 56, zIndex: 72,
            borderRadius: 3, transform: `rotate(${-28 + i * 11}deg)`, boxShadow: SH_D,
            background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.18)} 100%)` }}>
            <div style={{ position: "absolute", left: 11, top: 13, width: 44, height: 3.6,
              background: hexa(INK, 0.24) }} />
            <div style={{ position: "absolute", left: 11, top: 24, width: 30, height: 3.6,
              background: hexa(INK, 0.18) }} />
          </div>
        );
      })}

      {/* ⭐ THE SEAM, ABOVE THE CASE. It was drawn at z 46, behind a hero at 60
             and a case at 70, so the one hot thing in the frame was invisible. */}
      <div style={{ position: "absolute", left: CX - CW / 2 + 18, top: CTOP - 20 - lidUp * 26,
        width: CW - 36, height: 26, zIndex: 74, borderRadius: 13, filter: "blur(5px)",
        opacity: 0.55 + mouth * 0.45,
        background: `linear-gradient(90deg, ${hexa("#FFC6D2", 0)} 0%, ${hexa("#FFFFFF", 0.98)} 46%, ${hexa("#FFE2E8", 0.9)} 66%, ${hexa("#FFC6D2", 0)} 100%)` }} />

      {/* the wedge of light standing up out of the open case */}
      <div style={{ position: "absolute", left: CX - 320, top: CTOP - 400, width: 640, height: 420,
        zIndex: 73, pointerEvents: "none", opacity: 0.20 + mouth * 0.46, filter: "blur(20px)",
        clipPath: "polygon(50% 100%, 4% 0%, 96% 0%)",
        background: `linear-gradient(0deg, ${hexa("#FFD8E0", 0.80)} 0%, ${hexa("#FF9EB2", 0)} 100%)` }} />

      {/* THE OFFICIAL SEAL — one band across the lid line, and it PARTS. This is
          the whole "officially released" idea in one object: a thing is not
          released until someone breaks the seal on it. */}
      {[-1, 1].map((d, i) => (
        <div key={"sl" + i} style={{ position: "absolute", top: CTOP + 12 - lidUp * 26,
          left: CX - 12 + d * (12 + snap * (150 + i * 10)), width: 172, height: 34, zIndex: 76,
          borderRadius: 4, opacity: 1 - E(f, 18, 40, 0, 1, IO),
          transform: `rotate(${snap * d * 22}deg)`, transformOrigin: `${d > 0 ? 0 : 172}px 50%`,
          background: `repeating-linear-gradient(120deg, ${RED} 0px, ${RED} 15px, ${dkh(RED, 0.42)} 15px, ${dkh(RED, 0.42)} 30px)`,
          boxShadow: SH_D }} />
      ))}

      {/* ⛔ THE LID IS TWO LEAVES. As one bar hinging off its left corner it
             read as a clapperboard swinging across the crate — a black rectangle
             with a stripe under it is a slate, and once the eye has decided that,
             nothing else in the frame is believed. Two leaves opening off their
             OUTER edges is a case, it is unmistakable at a glance, and it throws
             twice the travel in opposite directions. */}
      {[-1, 1].map((d, i) => (
        <div key={"ld" + i} style={{ position: "absolute",
          left: CX + (d < 0 ? -CW / 2 - 4 : 4), top: CTOP - 26 - lidGo * (520 + i * 60),
          width: CW / 2, height: 40, zIndex: 78, borderRadius: 6,
          transform: `rotate(${d * (lidUp * 46 + lidGo * 150)}deg) translateX(${d * lidGo * 190}px)`,
          transformOrigin: d < 0 ? "0% 100%" : "100% 100%",
          background: `linear-gradient(180deg, ${mxh(SLATE, 0.88)} 0%, ${mxh(SLATE, 0.52)} 100%)`,
          border: `5px solid ${dkh(SLATE, 0.52)}`, boxShadow: SH }}>
          {Array.from({ length: 3 }, (_, k) => (
            <div key={"lr" + k} style={{ position: "absolute", left: 24 + k * 96, top: 11,
              width: 10, height: 10, borderRadius: "50%", background: dkh(SLATE, 0.34) }} />
          ))}
        </div>
      ))}

      {/* the case throwing its packing out sideways as it opens */}
      {Array.from({ length: 10 }, (_, i) => {
        const t = E(f, 4 + (i % 4) * 3, 44 + (i % 4) * 3, 0, 1, OUT);
        if (t <= 0) return null;
        const dir = i % 2 ? 1 : -1;
        return (
          <div key={"pk" + i} style={{ position: "absolute",
            left: CX + dir * t * (170 + i * 26) - 26,
            top: CTOP - 40 - Math.sin(t * Math.PI) * (150 + i * 18) + t * t * 200,
            width: 52, height: 62, borderRadius: 3, zIndex: 72, opacity: 1 - t * 0.5,
            transform: `rotate(${i * 41 + t * dir * 260}deg)`,
            background: `linear-gradient(180deg, ${PAPER} 0%, ${dkh(PAPER, 0.20)} 100%)` }} />
        );
      })}
      <Ring x={CX} y={CTOP} f={f} at={4} c={hexa("#FFE6B4", 0.9)} />
      <Ring x={CX} y={CTOP} f={f} at={26} c={hexa("#FFD2DC", 0.9)} />
      <Puff x={CX - 210} y={GY} f={f} at={6} c={hexa("#E4D6BC", 0.7)} />
      <Puff x={CX + 210} y={GY} f={f} at={9} c={hexa("#E4D6BC", 0.7)} />

      {/* ── THE SECOND BRAIN, rising out of the case and in FRONT of him, so it
             is never hidden behind a 396px hero on the way up ── */}
      <BrainArrival f={f} dur={dur} x={CX} crown={crown} heroX={HX}
        y0={GY - 54} s0={0.26} chains={false} z={66} arc={158} />
    </Scene>
  );
};

/* =========================================================================
   C · "PRINTS" — he talks and the rack writes itself around him
   The literal MECHANISM ("adds topics to memory as you chat"), which is also
   its risk AS A HOOK: it is S5's beat, and an open that spends the body's best
   reveal has nothing left for twelve seconds. Kept as a candidate because it is
   the truest picture of the news.
   ====================================================================== */
const HookPrints: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const fill = E(f, 14, 96, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.26} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={0} bands={3} kind="shelf" overhead="lampbar"
        rake={0.11} rakeRate={5.4} rakeN={7} floorKind="tile" grit={0.5}
        lamp={{ x: 620, y: 110, r: 320 }} />

      {/* the rack fills the whole back wall and loads itself while he talks */}
      <RackSkeleton x={470} y={188} w={512} h={264} z={20} f={f} cols={3} rows={3}
        fill={fill} lit={E(f, 12, 24, 0, 1, OUT)} colours={R.topicColour} />
      {Array.from({ length: 9 }, (_, i) => (
        <Ring key={"rr" + i} x={470 + (i % 3) * 170 + 85} y={188 + Math.floor(i / 3) * 88 + 40}
          f={f} at={14 + i * 8} c={hexa(GOLD, 0.55)} />
      ))}

      {/* the ribbon of speech leaving him and feeding the wall */}
      <SpeechRibbon x={360} y={GY - 246} f={f} len={330} z={54} rate={7.2} />

      <div style={{ position: "absolute", left: -70, top: 230, width: 128, height: 580, zIndex: 68,
        background: `linear-gradient(96deg, ${dkh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.54)} 100%)` }} />

      <Hero f={f} x={252} y={GY} size={348} z={56} costume={{ glasses: 1 }}
        act={1} ph={1.1} gaze={-0.9}
        cheer={E(f, 80, 96, 0, 0.85, OUT)} />
      <Contact x={252} y={GY} w={280} z={44} o={0.32} />

      <WorksSign x={38} y={118} w={404} h={228} z={22} f={f}
        l1="IT WRITES ITSELF" l2="WHILE YOU TALK"
        hot={fill > 0.5 ? GREEN : CLAY} lit={1} s={0.94} />
    </Scene>
  );
};

/* =========================================================================
   D · "SWAP" — the update arrives QUIETLY, and he BECOMES the thing
   Cut: STEEL. VO: "So Anthropic just quietly drops an update that turns Claude
   into a literal second brain."
     ⛔ REBUILT, and off the RIGHT WORDS this time. The old version staged a
     before/after — a hand-kept tower shoved over next to a rack filling — which
     is `drop`'s picture with the furniture rearranged, and it is not what this
     take says. This take says QUIETLY (so: no collapse, no explosion, one small
     object and one thin line of light) and it says TURNS CLAUDE INTO (so: the
     brain does not arrive from anywhere, it comes OUT OF HIM).
     BEFORE   f0, mid-action: a service hatch in the back wall is already
              parting on a hot seam, and the update is already on the rail.
     TRAVEL   ⭐ HORIZONTAL. `drop` descends, `head` rises, this one crosses.
              Three cuts, three axes — the one lever the dHash rates above grade.
     TRIGGER  f26, it goes into his chest.
     PAYOFF   f27-80, the brain BLOOMS out of him from nothing to full size.
              A scale ramp on the largest object in the frame repaints a band
              the full width of it on every sample, which is why the quietest
              of the three hooks is not the deadest.
   ====================================================================== */
const HookSwap: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const HX = 506, HS = 396;
  const crown = headTop(GY, HS);
  /* ⛔ THE RAIL WAS ROTATED AND IT READ AS A DROPPED CABLE. A 400px bar
     rotated to join a hatch at y=322 to a chest at y=497 crosses the entire
     frame on a diagonal, and a thin diagonal line over a room is a wire, not a
     track — it was the first thing the eye found in every frame. Putting the
     hatch at CHEST HEIGHT removes the rotation entirely: the rail is level, it
     is short, and it points at exactly one thing. */
  const RY = GY - 250;
  /* ⛔ AND IT WAS ON THE WRONG SIDE. At x=848 the port sat a hand's width from
     a hero at x=506: the update had ~300px to cross, which at 24 frames is
     invisible, and a lit rectangle that close to the subject stops being a hole
     in a wall and becomes a MONITOR he is standing next to. On the left edge,
     cropped by the panel, it is unmistakably an opening — and the update now
     crosses the whole room, which is the only reason this cut has a horizontal
     axis at all. It also puts this cut's weight LEFT, where `drop` is right and
     `head` is centred: three cuts, three balances. */
  /* ⛔⛔ AND A SMALL LIT RECTANGLE IS A SCREEN WHEREVER YOU PUT IT. Moving it
     to the left edge did not stop it reading as a switched-off monitor, because
     the thing that made it a monitor was its SHAPE: a discrete rounded rect,
     bezelled, drop-shadowed, sitting flat on a wall with the room continuing
     past it on all four sides. A hole is a hole because the room STOPS at it —
     so it is now a full-height portal, square-cornered, cropped by the panel
     edge, with light coming out past its own frame and lying on the floor. */
  const HAX = 40, HAY = RY, HAW = 220, HAH = 372;
  const A = Math.round(dur * 0.26), B = Math.round(dur * 0.78);
  /* frame 0 catches the hatch already parting — not shut, not open */
  const open = E(f, -7, 20, 0, 1, OUT);
  /* the capsule crosses the room and goes in at A */
  const trav = E(f, 2, A - 1, 0, 1, IO);
  const capX = HAX + trav * (HX - 34 - HAX);
  const capY = RY;
  const enter = E(f, A - 1, A + 5, 0, 1, OUT) - E(f, A + 5, A + 20, 0, 1, IO);
  const alarm = 1 - E(f, A, A + 16, 0, 1, IO);
  const seat = E(f, B, B + 6, 0, 1, OUT) - E(f, B + 6, B + 24, 0, 1, IO);
  /* the rack behind him takes the update too, bay by bay, once he has it */
  const fill = E(f, A + 6, B + 8, 0, 1, LIN);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.048]} vig={0.26} glow={hexa(p.key, 0.24)}
      overlay={<DimOverlay f={f} dur={dur} />}>
      <Room p={p} f={f} dx={0} bands={3} kind="column" overhead="lampbar"
        rake={0.10} rakeX={0} rakeRate={3.5} rakeN={9} floorKind="tarmac" grit={0.5}
        lamp={{ x: 250, y: 132, r: 296 }} />

      <Bay x={862} y={GY} w={196} h={286} z={24} f={f} lit={0.26} n={5} fill={0.45} />

      {/* the rack that takes the same update, low and wide behind him */}
      <RackSkeleton x={506} y={196} w={470} h={210} z={20} f={f} cols={3} rows={2}
        fill={fill} lit={E(f, A + 2, A + 14, 0, 1, OUT)} colours={R.topicColour} />

      {/* ── THE SERVICE HATCH — two leaves parting on a hot seam. This is the
             whole word "quietly": nothing breaks, nothing falls, a panel that
             was always in the wall simply opens. ── */}
      <div style={{ position: "absolute", left: HAX - HAW / 2 - 14, top: HAY - HAH / 2 - 14,
        width: HAW + 28, height: HAH + 28, zIndex: 22,
        background: `linear-gradient(168deg, ${dkh(SLATE, 0.30)} 0%, ${dkh(SLATE, 0.64)} 100%)` }}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"pb" + i} style={{ position: "absolute", right: 12, top: 20 + i * 56,
            width: 13, height: 13, borderRadius: "50%", background: mxh(SLATE, 0.26) }} />
        ))}
      </div>
      {/* ⛔ THE OPENING IS A DARK RECESS WITH A HOT CORE, not a pink panel. A
             flat bright rectangle on a back wall is a MONITOR — that is what it
             read as, a screen sitting in a warehouse — and a hole has to be
             darker at its edges than the wall around it or it is not a hole. */}
      <div style={{ position: "absolute", left: HAX - HAW / 2, top: HAY - HAH / 2,
        width: HAW, height: HAH, zIndex: 23, overflow: "hidden",
        background: `radial-gradient(64% 44% at 62% 50%, ${hexa("#FFF2F5", 0.46 + open * 0.54)} 0%, ${hexa("#FF9EB2", 0.16 + open * 0.44)} 40%, ${hexa("#120A0D", 0.96)} 100%)` }}>
        {[-1, 1].map((d, i) => (
          <div key={"lf" + i} style={{ position: "absolute", top: 0, height: HAH, width: HAW / 2 + 2,
            left: d < 0 ? -open * (HAW / 2 + 2) : HAW / 2 - 2 + open * (HAW / 2 + 2),
            background: `linear-gradient(${d < 0 ? 96 : 264}deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.48)} 100%)`,
            borderRight: d < 0 ? `4px solid ${dkh(SLATE, 0.7)}` : undefined,
            borderLeft: d > 0 ? `4px solid ${dkh(SLATE, 0.7)}` : undefined }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: HAX - 190, top: HAY - 230, width: 430, height: 460,
        zIndex: 25, borderRadius: "50%", pointerEvents: "none", filter: "blur(34px)",
        opacity: 0.24 + open * 0.56 - trav * 0.26,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFC6D2", 0.7)} 0%, ${hexa("#FF8AA4", 0)} 100%)` }} />
      {/* ⭐ the light it throws ON THE FLOOR. An opening that lights nothing is a
             picture of an opening; a wedge on the ground is what makes the room
             agree that there is a hole in its wall. */}
      <div style={{ position: "absolute", left: -60, top: GY - 96, width: 520, height: 150,
        zIndex: 19, pointerEvents: "none", filter: "blur(22px)",
        opacity: 0.20 + open * 0.50 - trav * 0.22,
        clipPath: "polygon(0% 26%, 0% 74%, 100% 100%, 100% 0%)",
        background: `linear-gradient(90deg, ${hexa("#FFD8E0", 0.85)} 0%, ${hexa("#FF9EB2", 0)} 100%)` }} />

      {/* ── THE RAIL it comes in on, and the update riding it ── */}
      {/* ⛔ THE CAPSULE HAS TO SIT ON THE RAIL. In v2 the bar ran 44px below it
             and the two read as unrelated objects — a pill floating over a
             stripe. The rail top is now exactly the capsule's underside. */}
      <div style={{ position: "absolute", left: -60, top: RY + 44, width: HX + 120,
        height: 14, zIndex: 28, borderRadius: 7,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.26)} 0%, ${dkh(STEEL, 0.48)} 100%)` }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"tie" + i} style={{ position: "absolute", left: -30 + i * 68, top: RY + 57,
          width: 16, height: 30, zIndex: 27, borderRadius: 3, background: dkh(STEEL, 0.58) }} />
      ))}
      {trav < 1 && (
        <>
          {/* ⭐ the streak BEHIND it. A 96px object stepping ~24px a sample
              repaints almost nothing; the trail it drags repaints the whole
              distance it has covered, and it is what makes a small fast thing
              read as fast rather than as a jump. */}
          <div style={{ position: "absolute", left: HAX, top: capY - 14,
            width: Math.max(0, capX - HAX), height: 28, zIndex: 63, borderRadius: 14,
            filter: "blur(7px)", opacity: 0.34 + trav * 0.48,
            background: `linear-gradient(90deg, ${hexa("#FF9EB2", 0)} 0%, ${hexa("#FFE2E8", 0.95)} 100%)` }} />
          <div style={{ position: "absolute", left: capX - 68, top: capY - 44, width: 136, height: 88,
            /* ⛔ z 64, ABOVE the hero. At 56 it slid behind a 250px-wide torso
               four frames before it arrived and simply disappeared: the shot
               had a departure and a flash with nothing joining them. */
            zIndex: 64, borderRadius: 44, boxShadow: `0 0 66px ${hexa("#FFB0C0", 0.95)}`,
            background: `linear-gradient(168deg, ${hexa("#FFF2F5", 0.98)} 0%, ${hexa("#FF9EB2", 0.92)} 100%)`,
            border: `6px solid ${hexa("#FFE2E8", 0.92)}` }}>
            {/* ⛔ NOT TWO STACKED BARS. A white rounded pill with two short dark
               lines in it is a SPEECH BUBBLE, which is the one thing this object
               must not be in a reel whose body beat is about Claude writing
               things down while you talk. A bright vertical core between two
               contact pips is a cartridge. */}
            <div style={{ position: "absolute", left: 58, top: 14, width: 20, height: 46,
              borderRadius: 10, background: `linear-gradient(180deg, ${hexa("#FFFFFF", 0.98)} 0%, ${hexa("#FFC6D2", 0.9)} 100%)`,
              boxShadow: `0 0 18px ${hexa("#FFFFFF", 0.9)}` }} />
            {[26, 92].map((px, k) => (
              <div key={"pp" + k} style={{ position: "absolute", left: px, top: 26, width: 18,
                height: 22, borderRadius: 3, background: hexa("#8A4150", 0.46) }} />
            ))}
            {[26, 84].map((wx, k) => (
              <div key={"wh" + k} style={{ position: "absolute", left: wx, top: 74, width: 26,
                height: 26, borderRadius: "50%", background: dkh(STEEL, 0.5),
                border: `4px solid ${mxh(STEEL, 0.22)}`,
                transform: `rotate(${trav * 900}deg)` }}>
                <div style={{ position: "absolute", left: 7, top: 1, width: 4, height: 16,
                  background: mxh(STEEL, 0.30) }} />
              </div>
            ))}
          </div>
        </>
      )}
      <Ring x={HX - 34} y={RY} f={f} at={A - 1} c={hexa("#FFD2DC", 0.95)} />
      <Ring x={HX - 34} y={RY} f={f} at={A + 3} c={hexa("#FFE6B4", 0.85)} />

      {/* ⛔ the mass cropped by the panel edge — bottom-left here, a low stack
          rather than a tall wall, so the three cuts do not share a silhouette. */}
      {/* ⛔ this moved to the RIGHT. It was at x=-84, i.e. directly on top of the
          port the update comes out of, which would have hidden the one event
          the first second of this cut has. */}
      <div style={{ position: "absolute", left: W - 76, top: GY - 250, width: 200, height: 314, zIndex: 68,
        borderRadius: 6,
        background: `linear-gradient(264deg, ${dkh(SLATE, 0.18)} 0%, ${dkh(SLATE, 0.56)} 100%)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 9, height: "100%",
          background: mxh(SLATE, 0.10) }} />
      </div>

      <div style={{ position: "absolute", left: 196, top: GY - 60, width: 620, height: 104,
        zIndex: 18, borderRadius: "50%",
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFE9B8", 0.38)} 0%, ${hexa("#FFE9B8", 0)} 100%)` }} />

      {/* ── THE HERO, centred, taking it in the chest ── */}
      <Hero f={f} x={HX} y={GY + rock(f, A - 1, 16, 12) * 0.5} size={HS} z={60}
        /* ⛔ NOT `glasses`. Uncostumed, the mascot is one unbroken clay mass and
           at this size in a warm room it read as a red animal with a black band
           for a face. The hi-vis breaks the silhouette into shoulders and a
           torso — and it is what the other two cuts wear, because the rule is
           one house clay and one character, varied by the SHOT, not the paint. */
        costume={{ constr: 1 }} act={3} ph={0.7} reach={126} flip
        strain={0.20 * (1 - E(f, 0, 12, 0, 1, OUT)) + 0.66 * enter + 0.52 * seat}
        drive={E(f, A - 4, A + 6, 0, 1, IN_Q) * 0.42 - E(f, A + 8, A + 30, 0, 1, IO) * 0.30
               + E(f, B, B + 18, 0, 1, OUT) * 0.42}
        shock={Math.max(enter, seat * 0.8)}
        stern={0.40 * (1 - E(f, 0, A, 0, 1, LIN))} heat={0.38 * alarm}
        cheer={E(f, B + 10, B + 26, 0, 0.9, OUT)}
        gaze={-0.9 * (1 - E(f, A - 6, A + 6, 0, 1, OUT)) + 0.8 * E(f, A + 8, A + 26, 0, 1, OUT)} />
      <Contact x={HX} y={GY} w={310} z={44} o={0.34} />
      {enter > 0.15 && <Steam x={HX} y={crown} f={f} at={A} n={4} />}

      {/* the flash where it goes in, and the ring off his chest */}
      <div style={{ position: "absolute", left: HX - 224, top: RY - 190, width: 380, height: 380,
        zIndex: 62, borderRadius: "50%", pointerEvents: "none", filter: "blur(26px)",
        opacity: enter * 0.85,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF2F5", 0.95)} 0%, ${hexa("#FF9EB2", 0)} 100%)` }} />
      <Puff x={HX - 160} y={GY} f={f} at={A + 1} c={hexa("#E4D6BC", 0.7)} />
      <Puff x={HX + 160} y={GY} f={f} at={A + 3} c={hexa("#E4D6BC", 0.7)} />

      {/* ── AND HE BECOMES IT ── y0 == the seat, so nothing travels: it grows
             out of him from a spark to 508px. ── */}
      <BrainArrival f={f} dur={dur} x={HX} crown={crown} heroX={HX}
        y0={crown + 62} s0={0.05} chains={false} z={52} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = {
  drop: HookDrop,
  head: HookHead,
  prints: HookPrints,
  swap: HookSwap,
};

/** ⛔ The PICKED hook is also S0 itself, so the candidate that was chosen and the
    scene that ships are the same code and cannot drift apart. */
export const PICKED: HookId = "drop";
export const S0: React.FC<SP> = (props) => {
  const Chosen = HOOKS[PICKED];
  return <Chosen {...props} />;
};
