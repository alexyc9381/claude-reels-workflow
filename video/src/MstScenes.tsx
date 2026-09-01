import React from "react";
import { useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, mix3, rnd, SH, SH_D,
  Scene, Cam, Mark, Chip, Plate, BigNum, Contact, Edge, Rake, Ring, Puff, Crew, Hero,
  costumeFor, squash, settle, PLACES, Sky, Roofline, Road, Bollard, Railing, SunBars, Overhead, Tile, Stencil, R,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL, BRASS,
  SODIUM, VIOLET, EMBER, OXIDE, SLATE, VERD, BONE, WOODT, VELVET, ASPH, CHALK,
} from "./MstWorld";
import type { Place } from "./MstWorld";
import {
  Van, Hold, Robe, Board, Toolbox, Chain, Scales, SlotWall, Pigeonholes, Lever,
  CallBell, SourceMap, CheckTag, Gauge, Guide, Parcel,
} from "./MstProps";

/* ===========================================================================
   REEL 121 · "MISTAKE" — THE SCENES.  Board: storyboards/121-mistake.md.

   ⛔⛔ EVERY SCENE OWES §2's FOUR-PART EVENT: a before state legible on its
      first frame, a visible trigger, TRAVEL across a real distance, and an
      arrival that costs something. An action loop is what the floor does WHILE
      the scene happens ([[feedback_action_loop_is_not_a_scene]]); it is never
      the scene.

   ⛔⛔ AND THE §3 TEST IS RUN PER SCENE, ON THE VERB. The VO line sits above
      each scene body below. If the picture does not depict the sentence's own
      verbs, it is a container however well it moves. The two scenes where this
      changed the design are marked ⭐ VERB.
   ========================================================================= */

export type Variant = "kerb" | "rank" | "gate";
type SP = { v: Variant; dur: number };

const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* ---- the per-cut camera --------------------------------------------------
   ⛔⛔ VARIANTS NEED SHOT SIZES, NOT A REGRADE ([[feedback_variants_need_shot_sizes]]).
   A 12% zoom spread satisfies a dHash and still ships one shot three times, so
   the three cuts here differ by FRAMING (wide / medium / tight), by RAKE PHASE,
   and by which scenes are MIRRORED — three independent axes, none of them grade.
   ⛔ `hue-rotate` / `saturate` are BANNED from GRADE ([[feedback_trial_cut_variants]]):
   amber once shipped an off-brand mascot and broke "every Claude the one house
   clay". GRADE here is contrast/brightness only, and it is monotonic, so it
   contributes ~1 bit and is never asked to carry the hash. */
/* ⛔⛔⛔ A 3.7% ZOOM SPREAD IS ONE SHOT THREE TIMES. These were 1.014 / 1.030 /
   1.052 and the cuts hashed at MIN 4 of 64 — a duplicate-content risk, because
   the bed is inaudible to a hash and a grade is worth about one bit where the
   camera is worth twenty-one. [[feedback_variants_need_shot_sizes]] asks for
   WIDE / MEDIUM / TIGHT and roughly a 12% spread; this is 16%.
   ⛔ none may go below 1.0 — the content div would pull away from the panel edge.
   ⛔ the TIGHT cut sets the crop bound: 1.16 x push 1.05 = 1.218, so the live
      window is 107..905 and anything that must survive all three lives inside it. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  gate: { dx: -50, dy: -8, s: 1.000, rot: 0 },   /* WIDE   */
  kerb: { dx: 0,   dy: 12, s: 1.060, rot: 0 },   /* MEDIUM */
  rank: { dx: 56,  dy: 34, s: 1.160, rot: 0 },   /* TIGHT  */
};

export const GRADE: Record<Variant, string> = {
  kerb: "contrast(1.03) brightness(1.005)",
  rank: "contrast(1.06) brightness(0.988)",
  gate: "contrast(1.00) brightness(1.018)",
};

/* ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH ([[feedback_rake_phase_is_modulo_pitch]]).
   Reel 118 shipped offsets 0 / 214 / 428 over a 204.6px pitch, i.e. phases
   0.0 / 9.4 / 18.9 — the top variant lever was INERT and dHash MIN hit 9.
   The road rake here runs n=9 over span W+420 = 1432, so pitch = 159.1.
   These three offsets are 0.00 / 0.33 / 0.66 OF A PITCH by construction. */
const PITCH = (W + 420) / 9;
export const RAKE_X0: Record<Variant, number> = {
  kerb: 0, rank: PITCH * 0.33, gate: PITCH * 0.66,
};
export const RAKE_K: Record<Variant, number> = { kerb: 1, rank: 1.22, gate: 0.84 };
/** which scenes flip — a real layout change, and the axis a hash reads best */
export const MIRROR: Record<Variant, number[]> = {
  kerb: [], rank: [2, 5, 8, 3], gate: [1, 4, 7, 10, 9],
};

/** ⭐ THE INTERIOR VARIANT LEVER. S3 and S9 have no road and therefore no rake
    phase, so they carry a per-cut LAYOUT SHIFT instead: the whole set slides and
    the internal spacing changes, which is geometry a perceptual hash reads. */
export const INT_DX: Record<Variant, number> = { kerb: 0, rank: 74, gate: -62 };
export const INT_PH: Record<Variant, number> = { kerb: 0, rank: 41, gate: 83 };

/* ---- the shared exterior shell ------------------------------------------
   ⛔ THE OCCLUDER IS NOT OPTIONAL. §8's depth question is "is there a mass
   cropped by the panel edge, IN FRONT of the action?" — if the answer is no,
   the camera is pointed at a backdrop. `Bollard` answers it in every exterior. */
const Street: React.FC<{ p: Place; f: number; v: Variant; rake?: number; roof?: number;
  rail?: boolean; occl?: boolean; occlX?: number; oh?: number }> =
  ({ p, f, v, rake = 1.7, roof = 1, rail = true, occl = true, occlX = -46, oh = 198 }) => (
  <>
    <Sky p={p} sun={v === "gate" ? 300 : 214} />
    <Roofline p={p} o={roof} />
    {rail && <Railing p={p} />}
    <Road p={p} f={f + RAKE_X0[v]} rake={rake * RAKE_K[v] * 3.0} />
    <SunBars f={f + RAKE_X0[v]} rate={5.0 * RAKE_K[v]} o={0.38} z={24} />
    <Overhead p={p} f={f} h={oh} z={86} lamp={oh > 120} />
    {occl && <Bollard p={p} posts={1} x={occlX} y={p.horizon + 96} s={1.34} />}
  </>
);

/* =========================================================================
   S1 · THE PROMISE — f175..f258 (83f, 2.77s)
   VO: "So here are three Claude mistakes you need to fix right now."
   EVENT: the three offenders are HAULED OUT and set down on the kerb, one at a
   time, arrivals spread across the FULL duration.
   ⛔ ARRIVALS SPREAD, NEVER BUNCHED. A reel-104 rebuild put everything inside
      the first 34 of 70 frames and measured 5.94, UNDER the bar, despite being
      better in every other way. f10 / f36 / f62 of 83.
   ⭐ HIERARCHY MECHANISM: ranked by SIZE — robe tallest, board mid, chain
      lowest and widest. The eye reads 1-2-3 without reading a word.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shade");
  const mir = MIRROR[v].includes(1);
  const MX = (x: number) => (mir ? W - x - 200 : x);
  const AT = [10, 36, 62];
  const drop = (at: number) => {
    const lf = f - at;
    if (lf < 0) return { y: -420, sq: 1, o: 0 };
    return { y: E(lf, 0, 9, -420, 0, IN_Q), sq: squash(lf, 9, 0.2, 3, 12), o: 1 };
  };
  const d0 = drop(AT[0]), d1 = drop(AT[1]), d2 = drop(AT[2]);
  const doorK = E(f, 2, 14, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.192]} vig={0.6} glow={hexa(p.key, 0.18)}>
      <Street p={p} f={f} v={v} rake={1.4} occlX={mir ? 946 : -46} />
      {/* the van, doors wide — the source everything is coming OUT of */}
      <Cam z={30}>
        <Van p={p} x={MX(120)} y={p.horizon - 236} s={0.74} f={f} door={doorK} plate={false} z={30} />
      </Cam>
      {/* the rank behind, doors still bouncing, out of sync — background process */}
      {/* ⛔ AT s=0.4 AND o=0.5 THIS WAS BELOW THE 40px FLOOR AND HALF FADED OUT —
          a background process that repaints nothing is not a background process.
          Bigger, opaque, and the doors swing through a real arc. */}
      <Cam z={16} o={0.82}>
        {[0, 1, 2].map(i => (
          <Van key={"rk" + i} p={p} x={430 + i * 248} y={p.horizon - 244} s={0.6} f={f}
            door={0.16 + 0.6 * Math.abs(Math.sin(f / 9 + i * 2.1))}
            bounce={Math.sin(f / 4.6 + i * 2.1) * 3.4} plate={false} z={16} />
        ))}
      </Cam>

      {/* ---- 1 · THE ROBE (tallest) ---- */}
      {f >= AT[0] && (
        <Cam z={62} y={d0.y}>
          <div style={{ transform: `scaleY(${d0.sq})`, transformOrigin: "50% 100%" }}>
            <Robe x={MX(388)} y={p.horizon - 258} s={0.78} f={f} z={62} hang />
          </div>
        </Cam>
      )}
      {/* ---- 2 · THE BOARD (mid) ---- */}
      {f >= AT[1] && (
        <Cam z={60} y={d1.y}>
          <div style={{ transform: `scaleY(${d1.sq})`, transformOrigin: "50% 100%" }}>
            <Board x={MX(556)} y={p.horizon - 148} w={278} h={116} f={f} kind="dont" bolts={2} z={60} />
          </div>
        </Cam>
      )}
      {/* ---- 3 · THE CHAIN OF BOXES (lowest, widest) ---- */}
      {f >= AT[2] && (
        <Cam z={58} y={d2.y}>
          <div style={{ transform: `scaleY(${d2.sq})`, transformOrigin: "50% 100%" }}>
            {R.servers.slice(0, 3).map((id, i) => (
              <Toolbox key={id} id={id} x={MX(500) + i * 128} y={p.horizon - 84} s={0.6} f={f} z={58} />
            ))}
          </div>
        </Cam>
      )}
      {/* ⭐ the chalk number ARRIVES WITH its object — never typeset waiting */}
      {[0, 1, 2].map(i => f >= AT[i] + 8 && (
        <Stencil key={"ch" + i} t={String(i + 1)} x={MX(410) + i * 148} y={p.horizon + 66}
          size={58} c={hexa(CHALK, E(f, AT[i] + 8, AT[i] + 16, 0, 0.86, OUT))} z={80} w={90} align="center" />
      ))}
      {/* arrivals cost something: dust + a ring each */}
      {AT.map((at, i) => <React.Fragment key={"fx" + i}>
        <Puff x={MX(440) + i * 130} y={p.horizon + 34} f={f} at={at + 8} n={8} s={0.8} z={72} />
        <Ring x={MX(440) + i * 130} y={p.horizon + 42} f={f} at={at + 8} c={hexa(p.key, 0.7)} z={72} s={0.6} />
      </React.Fragment>)}

      <Hero f={f} x={MX(250)} y={p.horizon + 148} size={188} z={64} act={1} ph={0}
        costume={{ constr: 1 }} flip={mir} drive={f >= AT[0] && f <= AT[2] + 12 ? 0.7 : 0.2} />
      <Mark x={mir ? 92 : 838} y={112} s={82} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S2 · TIP 1 — f258..f386 (128f, 4.28s)
   VO: "First, stop telling Claude to act like an expert. With the newest
        models, you're just wasting your context window."
   ⭐ VERB: the sentence's verbs are TELLING and WASTING. A robe on a hanger
      depicts neither. So the scene is the WEIGH-IN: two needles in one frame.
      The bulk needle sweeps to 31% of the hold in four stepped pops; the WORTH
      needle travels the whole dial and lands on 0.
   ⛔ N DISCRETE POPS, not one long tween — but read §13: overlapping action, so
      the pan and the ring-out lag the steps rather than quantising with them.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("scale");
  const mir = MIRROR[v].includes(2);
  const HANG = 12, POPS = [26, 38, 50, 62], WORTH = 82, LIFT = 96;
  /* the bulk needle: four discrete steps, each a fast BACK land */
  const bulk = POPS.reduce((acc, at, i) =>
    f >= at ? E(f, at, at + 6, acc, (i + 1) / 4 * 0.62, BACK) : acc, 0);
  const worth = E(f, WORTH, WORTH + 10, 0, 0.02, BACK);
  const panDrop = POPS.reduce((a, at) => f >= at ? a + E(f, at, at + 8, 0, 5, OUT) : a, 0)
    + (f >= WORTH ? settle(f - WORTH, 7) : 0);
  const hung = f >= HANG;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.205]} vig={0.62} glow={hexa(p.key, 0.2)}>
      <Street p={p} f={f} v={v} rake={1.2} roof={0.72} occlX={mir ? 946 : -46} />
      {/* the depot roller shutter, half up, rattling — the background process */}
      <Cam z={12}>
        <div style={{ position: "absolute", left: 96, top: 60, width: 820, height: 250,
          background: dkh(SLATE, 0.34) }} />
        {/* ⛔ v1 OSCILLATED THESE BY 1.6px. Measured: 1.15deg / 1.7px registers as
            "never static" on a metric and READS as static to a human (§5), and
            at 1.6px it did not even do that. The shutter RUNS now — 14 slats
            travelling the full height on a loop, alternating light and shadow. */}
        {Array.from({ length: 14 }, (_, i) => {
          const ty = (((i * 26 - f * 4.4) % 364) + 364) % 364;
          return <div key={"sh" + i} style={{ position: "absolute", left: 96, width: 820, height: 18,
            top: 58 + ty * 0.68, background: i % 2 ? mix3(STEEL, "#FFFFFF", 0.34) : dkh(STEEL, 0.5) }} />;
        })}
        <div style={{ position: "absolute", left: 96, top: 306, width: 820, height: 16, background: dkh(INK, -0.1) }} />
      </Cam>

      <Cam z={40}>
        <Scales x={mir ? 300 : 268} y={p.horizon - 300} s={1.0} f={f} z={40}
          bulk={bulk} worth={worth} drop={panDrop} showWorth={f >= WORTH - 20} />
      </Cam>
      {/* the robe hangs on the scale hook and fills the pan */}
      {hung && (
        <Cam z={64} y={E(f, HANG, HANG + 10, -340, 0, IN_Q)}>
          <Robe x={mir ? 462 : 430} y={p.horizon - 96 - (f >= LIFT ? E(f, LIFT, LIFT + 26, 0, 430, IN_Q) : 0)} s={0.72} f={f} z={64} sway={f >= LIFT ? 3.4 : (f > POPS[3] ? 0.4 : 1.4)} />
        </Cam>
      )}
      {/* ⛔ 79% HOLD ON THE FIRST CUT: everything happened by f82 of 128 and the
          scene then sat there. The robe is HAULED OFF at f96 and rides up out of
          frame, so the last third has the biggest single mover in the shot —
          and it is the same action S3 pays off, not a filler event. */}
      {f >= LIFT && <>
        <Ring x={mir ? 462 : 520} y={p.horizon - 60} f={f} at={LIFT} c={hexa(GOLD, 0.8)} z={76} s={0.7} />
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"lc" + i} style={{ position: "absolute", zIndex: 62,
            left: (mir ? 500 : 512) + i * 4, top: -60 + i * 44, width: 26, height: 15,
            borderRadius: 8, border: `6px solid ${dkh(STEEL, 0.3)}` }} />
        ))}
      </>}
      {/* the 0 seating costs something */}
      <Ring x={mir ? 372 : 596} y={p.horizon - 172} f={f} at={WORTH} c={INK} z={78} s={0.9} dur={24} />
      <Puff x={mir ? 300 : 430} y={p.horizon - 20} f={f} at={POPS[3] + 6} n={9} s={0.9} z={70} />

      <Hero f={f} x={mir ? 736 : 782} y={p.horizon + 142} size={176} z={66} act={1} ph={1.2}
        costume={{ constr: 1 }} flip={!mir} reach={f < HANG + 8 ? 118 : 96}
        drive={f < HANG + 8 ? 0.85 : 0.15} gaze={f > WORTH ? 0.8 : 0.2} />
      <Mark x={mir ? 848 : 96} y={112} s={82} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S3 · TIP 1 PAYOFF — f386..f541 (155f, 5.14s)
   VO: "Instead, spend those tokens telling Claude exactly where to find the
        sources and tell it to check its own work before finishing."
   ⛔ §10 — which half of the mechanism is missing? The robe leaving is the
      INPUT. This scene owes the OUTPUT: what fits BECAUSE it left. So the load
      line becomes visible for the first time and the fill RETREATS from it.
   ⛔ NOT CONTAINERS: the map has real pinned destinations on it; the tag's face
      is a checklist that ticks itself, one line per beat.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hold");
  const mir = MIRROR[v].includes(3);
  const DX = INT_DX[v];
  const MX = (x: number, w = 0) => (mir ? W - x - w : x) + DX;
  const MAP = 16, TAG = 62, TICKS = [86, 104, 122];
  const open = E(f, MAP, MAP + 26, 0, 1, OUT);
  const ticks = TICKS.filter(t => f >= t).length;
  /* the fill RETREATS — a number moving to its value, downward */
  const fill = f < MAP ? 0.82 : E(f, MAP, MAP + 34, 0.82, 0.41, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.178]} vig={0.66} glow={hexa(p.key, 0.22)}>
      {/* inside the hold, looking OUT at the bright street — the reel's biggest
          value gap, and it is free depth */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 100%)` }} />
      {/* the bright doorway */}
      <div style={{ position: "absolute", left: MX(690, 300), top: 60, width: 300, height: 620, zIndex: 6,
        background: `linear-gradient(180deg, ${SKY} 0%, ${mix3(SODIUM, PAPER, 0.4)} 68%, ${mix3(p.floor, PAPER, 0.3)} 100%)` }} />
      {/* traffic crossing the doorway, silhouetted — one every ~40 frames */}
      {/* ⛔ ONE SILHOUETTE EVERY 40 FRAMES REPAINTED ALMOST NOTHING (§1: motion
          is the fraction of the panel repainted per 0.1s). Eight, larger, on a
          12-frame stagger, is a continuous stream across the brightest part of
          the frame — which is also the biggest luma delta available in here. */}
      {Array.from({ length: 8 }, (_, i) => {
        const t = ((f + i * 12) % 96) / 96;
        return (
          <div key={"tr" + i} style={{ position: "absolute", zIndex: 7,
            left: MX(664 + t * 400 - 150, 168), top: 300 + (i % 3) * 96, width: 168, height: 132,
            borderRadius: 10, background: hexa(INK, 0.5) }} />
        );
      })}
      {/* the raking light coming IN through the open door, travelling across the
          hold floor — full-height, alternating light and shadow, feathered */}
      <SunBars f={f * 1.9 + INT_PH[v]} rate={4.2} n={5} o={0.2} z={30} skew={mir ? -26 : 26} c={"#FFE9BE"} />
      {/* the hold walls in perspective, ribbed, framing the doorway */}
      <Cam z={14}>
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"wl" + i} style={{ position: "absolute", left: 40 + i * 96, top: 40 + i * 8,
            width: 22, height: 640 - i * 26, background: hexa(INK, 0.2 + i * 0.03) }} />
        ))}
        <div style={{ position: "absolute", left: 0, top: 618, width: W, height: 174,
          background: `linear-gradient(180deg, ${WOODT} 0%, ${dkh(WOODT, 0.44)} 100%)` }} />
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"fb" + i} style={{ position: "absolute", left: 0, top: 622 + i * 22, width: W,
            height: 4, background: hexa(INK, 0.2) }} />
        ))}
      </Cam>
      {/* the load line, visible for the first time in the reel */}
      <Cam z={40}>
        <Hold p={p} x={MX(96, 520)} y={196} w={520} h={420} z={40} fill={fill} line={0.72} />
      </Cam>
      {/* ⭐ the map UNROLLS across the floor, flat, taking almost no height */}
      <Cam z={62}>
        <SourceMap x={MX(120, 400)} y={520} open={open} f={f} z={62} />
      </Cam>
      {/* the tag clips to the inside of the door and swings */}
      {f >= TAG && (
        <Cam z={70} y={E(f, TAG, TAG + 8, -160, 0, BACK)}>
          <CheckTag x={MX(636, 180)} y={214} f={f} at={TAG} ticks={ticks} z={70} />
        </Cam>
      )}
      <Ring x={MX(330)} y={640} f={f} at={MAP + 18} c={hexa(GOLD, 0.8)} z={74} s={0.7} />
      <Hero f={f} x={MX(392)} y={664} size={190} z={66} act={1} ph={0.4} flip={mir}
        costume={{ constr: 1 }} reach={f < TAG ? 122 : 96} drive={f < MAP + 30 ? 0.8 : 0.25} />
      <Mark x={mir ? 838 : 96} y={112} s={82} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S4 · TIP 2 — f541..f637 (96f, 3.20s)
   VO: "Second, stop writing negative instructions like don't include numbers."
   EVENT: the sorter is working SMOOTHLY first — the background process is
   established BEFORE it is broken — then the DON'T board is bolted across the
   mouth and his next parcel stops dead against it.
   ⭐ THE BOARD'S FACE IS THE RECEIPT: Anthropic's own documented bad example,
      verbatim. Not a placeholder.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("mouth");
  const mir = MIRROR[v].includes(4);
  const MX = (x: number) => (mir ? W - x - 200 : x);
  const SWING = 22, BOLTS = [34, 42, 50], STOP = 64;
  const down = E(f, SWING, SWING + 9, 0, 1, IN_Q);
  const bolts = BOLTS.filter(b => f >= b).length;
  /* he posts cleanly TWICE before the board lands, so the break has a before */
  const px = f < STOP ? 300 + ((f * 7) % 240) : 300 + 240 - Math.max(0, (f - STOP)) * 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.198]} vig={0.6} glow={hexa(p.key, 0.18)}>
      <Street p={p} f={f} v={v} rake={1.6} roof={0.84} occlX={mir ? 946 : -46} />
      <Cam z={26}>
        <SlotWall x={MX(232)} y={132} f={f} cols={5} rows={3} z={26} />
      </Cam>
      {/* ⛔ 91% HOLD — THE WORST IN THE REEL. The board landed at f64 of 96 and
          everything before it was one parcel drifting. The belt now runs for the
          WHOLE scene and he posts continuously until the board stops him, so the
          shot has a before-state that is ALIVE rather than merely present. */}
      <div style={{ position: "absolute", left: 0, top: 604, width: W, height: 92, zIndex: 14,
        background: dkh(p.floor2, 0.34) }} />
      {Array.from({ length: 16 }, (_, i) => {
        const x = (((i * 78 - f * 9.5) % 1248) + 1248) % 1248 - 120;
        return <div key={"bs" + i} style={{ position: "absolute", left: x, top: 608, width: 40,
          height: 84, zIndex: 15, background: i % 2 ? mix3(p.floor, "#FFFFFF", 0.38) : dkh(p.lip, 0.42) }} />;
      })}
      {Array.from({ length: 5 }, (_, i) => {
        const x = (((i * 250 - f * 9.5) % 1250) + 1250) % 1250 - 130;
        return <Parcel key={"bp" + i} x={x} y={556} s={0.92} z={18} i={i} rot={(i % 3) - 1} />;
      })}
      {/* four posted cleanly before the obstruction arrives */}
      {[0, 1, 2, 3].map(i => f > 4 + i * 11 && (
        <Parcel key={"pp" + i} x={MX(252) + i * 118} y={152 + (i % 2) * 104} s={0.76} z={30} i={i} />
      ))}
      {/* the parcel in hand, travelling, then stopped dead by the board */}
      <Cam z={64}>
        <Parcel x={MX(f < STOP ? px : 470)} y={f < STOP ? 300 + Math.sin(f / 9) * 12 : 336}
          s={0.94} z={64} rot={f < STOP ? Math.sin(f / 11) * 5 : -12} i={2} />
      </Cam>
      {/* ⛔ the board is BOLTED — a physical obstruction with visible fixings */}
      <Cam z={72}>
        <Board x={MX(266)} y={96} w={470} h={192} f={f} kind="dont" down={down} bolts={bolts} z={72} />
      </Cam>
      {BOLTS.map((b, i) => (
        <Ring key={"br" + i} x={MX(300) + i * 200} y={110} f={f} at={b} c={STEEL} z={80} s={0.4} dur={14} />
      ))}
      <Puff x={MX(470)} y={352} f={f} at={STOP} n={7} s={0.7} z={78} />
      {/* ⛔ 78% HOLD: the board landed at f64 of 96 and the scene stopped. He
          shoves the parcel into it three more times before the cut — the action
          continues THROUGH the beat instead of arriving and sitting. */}
      {[70, 79, 88].map((at, i) => f >= at && (
        <React.Fragment key={"re" + i}>
          <Parcel x={MX(470 - 46 * Math.abs(Math.sin((f - at) / 2.6)))} y={330 + i * 6}
            s={0.94} z={73} rot={-12 - i * 5} i={2} />
          <Puff x={MX(452)} y={344} f={f} at={at + 3} n={5} s={0.5} z={79} />
        </React.Fragment>
      ))}

      {/* THE SORTER — prof costume, and he is the one who gets confused in S5 */}
      <Hero f={f} x={MX(576)} y={p.horizon + 146} size={182} z={66} act={1} ph={2.2}
        costume={{ prof: 1 }} flip={mir} reach={110}
        drive={f < STOP ? 0.7 : 0} shock={f >= STOP ? E(f, STOP, STOP + 8, 0, 0.9, BACK) : 0} />
      <Mark x={mir ? 92 : 838} y={112} s={82} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE COST — f637..f713 (76f, 2.53s)
   VO: "When you tell the model what not to do, it gets confused."
   ⛔ §11: CONFUSION IS A DISTANCE, NOT A STATE CHANGE. Do not tint him blue.
      His head sweeps the full slot wall and back, the parcel goes half way to
      one slot, pulls back, goes to another, pulls back, and he takes a whole
      step the wrong way — then posts it into the WRONG slot and it is spat
      straight back out at him.
   ⛔ <=3 SFX. It is 2.53s and one idea.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("slots");
  const mir = MIRROR[v].includes(5);
  const MX = (x: number) => (mir ? W - x - 200 : x);
  const POST = 46, SPIT = 56;
  /* the parcel's dithering: out, back, out further, back, then the wrong slot */
  const path = (t: number) =>
    t < 8 ? E(t, 0, 8, 0, 0.42, IO) :
    t < 16 ? E(t, 8, 16, 0.42, 0.08, IO) :
    t < 26 ? E(t, 16, 26, 0.08, 0.78, IO) :
    t < 34 ? E(t, 26, 34, 0.78, 0.18, IO) :
    E(t, 34, POST, 0.18, 1, IN_Q);
  const k = path(Math.min(f, POST));
  const px = 300 + k * 300, py = 330 - k * 150;
  const spit = f >= SPIT ? E(f, SPIT, SPIT + 12, 0, 1, OUT) : 0;
  /* his head sweeps the wall — a real amplitude, not a wobble */
  const gaze = f < POST ? 0.5 + 0.5 * Math.sin(f / 7.5) : -0.4;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.214]} vig={0.68} glow={hexa(p.key, 0.16)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 100%)` }} />
      {/* ⭐ THE BELT — a full-width high-contrast travelling band, which is the
          only shape §1 measures above bar in a scene with one body in it. The
          slats alternate LIGHT AND SHADOW; light-only bands score worse AND lift
          the black point. */}
      <div style={{ position: "absolute", left: 0, top: 596, width: W, height: 96, zIndex: 12,
        background: dkh(p.floor2, 0.3) }} />
      {Array.from({ length: 16 }, (_, i) => {
        const x = (((i * 78 - f * 8.5) % 1248) + 1248) % 1248 - 120;
        return <div key={"bs" + i} style={{ position: "absolute", left: x, top: 600, width: 40,
          height: 88, zIndex: 13, background: i % 2 ? mix3(p.floor, "#FFFFFF", 0.34) : dkh(p.lip, 0.4) }} />;
      })}
      {Array.from({ length: 5 }, (_, i) => {
        const x = (((i * 250 - f * 8.5) % 1250) + 1250) % 1250 - 130;
        return <Parcel key={"bp" + i} x={x} y={548} s={0.9} z={16} i={i} rot={(i % 3) - 1} />;
      })}
      <Cam z={20}>
        <SlotWall x={MX(148)} y={78} f={f} cols={5} rows={3} z={20}
          wrong={f >= POST ? 6 : -1} />
      </Cam>
      {/* the queue stacking up behind him for the whole scene — one every 8f */}
      {Array.from({ length: 9 }, (_, i) => f >= i * 8 && (
        <Parcel key={"q" + i} x={MX(806)} y={654 - i * 34} s={0.86} z={26 + i} i={i} rot={(i % 3) - 1} />
      ))}
      {/* the DON'T board, still bolted, still in his face */}
      <Cam z={70}>
        <Board x={MX(230)} y={452} w={402} h={158} f={f} kind="dont" bolts={3} z={70} />
      </Cam>
      {/* the parcel: dithering, then posted wrong, then spat back at his chest */}
      <Cam z={74}>
        <Parcel x={MX(px + spit * -180)} y={py + spit * 210} s={1.22} z={74}
          rot={spit > 0 ? spit * -46 : Math.sin(f / 6) * 9} i={2} />
      </Cam>
      {spit > 0 && <Puff x={MX(320)} y={640} f={f} at={SPIT + 10} n={6} s={0.6} z={80} />}

      <Hero f={f} x={MX(576 + (f > 26 && f < 40 ? 52 : 0))} y={p.horizon + 178} size={224} z={66}
        act={3} ph={0} costume={{ prof: 1 }} flip={mir} gaze={gaze}
        shock={spit > 0 ? spit * 0.9 : 0} drive={f < POST ? 0.5 : 0} />
      <Mark x={mir ? 92 : 846} y={106} s={78} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S6 · TIP 2 PAYOFF — f713..f822 (109f, 3.63s)
   VO: "So say everything as a positive command, like write smooth flowing text
        paragraphs."
   ⛔ SAME FRAMING AS S4, deliberately, so the SWAP is the only thing that
      changes and the eye reads it instantly.
   ⭐ THE GREEN BOARD IS THE OTHER HALF OF ANTHROPIC'S OWN PAIR, verbatim, and it
      carries an ARROW — a positive instruction has a DIRECTION and a negative
      one does not. That is the whole argument drawn as geometry.
   ⛔ §10: the OUTPUT is the queue DRAINING. A fix that produces nothing visible
      is a progress bar.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("swap");
  const LEVER = 10, GIVE = 22, IN = 33, DRAIN = 46;
  const off = f >= GIVE ? E(f, GIVE, GIVE + 14, 0, 1, IN_Q) : 0;
  const inK = E(f, IN, IN + 11, 0, 1, BACK);
  /* the backed-up queue drains, one parcel every 5 frames, accelerating */
  const drained = f < DRAIN ? 0 : Math.min(9, Math.floor((f - DRAIN) / 5));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.198]} vig={0.58} glow={hexa(p.key, 0.2)}>
      <Street p={p} f={f} v={v} rake={1.9} roof={0.84} />
      <Cam z={26}>
        <SlotWall x={232} y={132} f={f} cols={5} rows={3} z={26} target={f >= IN ? 7 : -1} />
      </Cam>
      {/* the queue, draining */}
      {Array.from({ length: 9 }, (_, i) => i >= drained && (
        <Parcel key={"q" + i} x={772} y={560 - i * 24} s={0.58} z={30 + i} i={i} rot={(i % 3) - 1} />
      ))}
      {/* each drained parcel flies to the target slot — real travel, not a fade */}
      {Array.from({ length: 9 }, (_, i) => {
        const at = DRAIN + i * 5, lf = f - at;
        if (lf < 0 || lf > 16) return null;
        const t = lf / 16;
        return <Parcel key={"fly" + i} x={772 - t * 340} y={560 - i * 24 - t * 360 + Math.sin(t * Math.PI) * -40}
          s={0.58} z={66} rot={t * 40} i={i} />;
      })}
      {/* ⛔ ONE OUT, ONE IN, ON THE SAME AXIS — a real swap, never a crossfade */}
      {off < 1 && (
        <Cam z={70} y={off * 620} rot={off * 26} o={1 - off * 0.2}>
          <Board x={266} y={96} w={470} h={192} f={f} kind="dont" bolts={3} z={70} />
        </Cam>
      )}
      {f >= IN && (
        <Cam z={72} y={(1 - inK) * -420}>
          <Board x={266} y={96} w={470} h={192} f={f} kind="do" bolts={3} arrow z={72} />
        </Cam>
      )}
      <Ring x={500} y={140} f={f} at={IN + 9} c={hexa(VERD, 0.8)} z={80} s={0.8} />
      <Puff x={500} y={300} f={f} at={IN + 9} n={8} s={0.8} z={78} />

      <Hero f={f} x={576} y={p.horizon + 146} size={182} z={66} act={1} ph={2.2}
        costume={{ prof: 1 }} flip reach={104} cheer={f > IN + 12 ? 0.6 : 0}
        drive={f < IN ? 0.75 : 0.3} />
      <Mark x={838} y={112} s={82} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S7 · TIP 3 — f822..f908 (86f, 2.87s)
   VO: "Third, turn off automatic tool access."
   ⭐ THE REEL'S MOTION PEAK BY CONSTRUCTION: five objects, each 186px wide,
      dragged bodily from x=820 to x=120 — a full-panel traverse by many large
      bright objects, which is the only shape §1 says measures above bar.
      Each box crosses the kerb's raking shadow, so every one of them alternates
      LIGHT AND SHADOW as it travels.
   ⛔ The five ids are Anthropic's OWN worked example, not a set chosen to look
      good ([[feedback_real_marks_are_the_props]]).
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hitch");
  const mir = MIRROR[v].includes(7);
  const MX = (x: number) => (mir ? W - x - 200 : x);
  const PULL = 12, STOP = 58;
  const k = E(f, PULL, STOP, 0, 1, IO);
  const taut = E(f, PULL, PULL + 6, 0, 1, OUT);
  const vanX = 300 - k * 900;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.216]} vig={0.62} glow={hexa(p.key, 0.2)}>
      <Street p={p} f={f} v={v} rake={2.6} roof={0.6} rail={false} occlX={mir ? 936 : -56} />
      {/* deep shadow under the van, the darkest value in the frame */}
      <div style={{ position: "absolute", left: 0, top: p.horizon - 30, width: W, height: 120,
        zIndex: 18, background: `linear-gradient(180deg, ${hexa(INK, 0.34)} 0%, ${hexa(INK, 0)} 100%)` }} />
      {/* ⛔ THE VAN IS DELIBERATELY OUT OF FRAME. At hitch height it had left the
          panel by mid-scene anyway, and five boxes crossing on their own read as
          a CONVEYOR — the opposite of the point. What is on screen is the chain
          arriving from off-left and the train hanging off it. */}
      {/* ⭐ the five boxes, dragged. 186px each, well over the 40px floor. */}
      {R.servers.map((id, i) => {
        const lag = i * 0.06;
        const kk = Math.max(0, Math.min(1, (k - lag) / (1 - lag * 4)));
        const bx = 962 - kk * 940 + i * 182;
        const jolt = f >= STOP ? settle(f - STOP - i * 2, 8 - i) : Math.sin(f / 4 + i) * 2.4;
        return (
          <React.Fragment key={id}>
            <Toolbox id={id} x={MX(bx)} y={p.horizon + 96} s={1.12} f={f} jolt={jolt} z={54 + i} />
            {/* sparks + grit off the scrape — an emitter on the STILLEST part */}
            {f > PULL && f < STOP && Array.from({ length: 3 }, (_, s) => (
              <div key={"sp" + s} style={{ position: "absolute", zIndex: 68,
                left: MX(bx) + 20 + rnd(i * 7 + s + f, 3) * 130,
                top: p.horizon + 150 - rnd(i * 5 + s + f, 4) * 26,
                width: 6 + rnd(s + i, 5) * 7, height: 4, borderRadius: 2,
                background: hexa(SODIUM, 0.5 + rnd(s + f, 6) * 0.45) }} />
            ))}
          </React.Fragment>
        );
      })}
      {/* the chain: off-frame left to the first box, then BOX TO BOX. This is
          what makes it a train and not a queue. */}
      <Chain x0={MX(-140)} y0={p.horizon + 128} x1={MX(962 - k * 940)} y1={p.horizon + 150}
        n={9} taut={taut} z={52} />
      {[0, 1, 2, 3].map(i => {
        const a = 962 - k * 940 + i * 182 + 176, b = 962 - k * 940 + (i + 1) * 182;
        return <Chain key={"lk" + i} x0={MX(a)} y0={p.horizon + 150} x1={MX(b)} y1={p.horizon + 150}
          n={3} taut={taut} z={58} />;
      })}
      {/* the pile-up costs something */}
      <Puff x={MX(220)} y={p.horizon + 150} f={f} at={STOP} n={12} s={1.1} z={76} />
      <Ring x={MX(240)} y={p.horizon + 156} f={f} at={STOP} c={hexa(p.key, 0.7)} z={76} s={1.0} />

      <Hero f={f} x={MX(846)} y={p.horizon + 196} size={168} z={70} act={3} ph={1.1}
        costume={{ constr: 1 }} flip={mir} gaze={0.7} shock={f >= STOP ? 0.6 : 0} />
      <Mark x={mir ? 96 : 834} y={106} s={78} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE COST — f908..f1069 (161f, 5.37s)
   VO: "Usually Claude loads all of your connectors into the context with every
        message, so it burns thousands of tokens per session."
   ⭐ VERB: the verbs are LOADS, EVERY MESSAGE and BURNS. A van driving past
      depicts a delivery. So the scene is a CYCLE — the SAME trip runs FOUR
      TIMES inside it, each pass faster, with the five boxes dragged along on
      every single one. The repetition IS "with every message".
   ⛔ HONESTY: the wall gauge reads PER SESSION, never DEFAULT. See the ledger.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  const mir = MIRROR[v].includes(8);
  const PASS = [0, 38, 76, 114];
  const LEN = [40, 36, 32, 30];
  /* which pass are we in, and how far through it */
  let idx = 0; for (let i = 0; i < 4; i++) if (f >= PASS[i]) idx = i;
  const local = f - PASS[idx];
  const t = Math.max(0, Math.min(1, local / LEN[idx]));
  const vanX = mir ? -1180 + t * 2560 : 1180 - t * 2560;
  const notches = PASS.filter((a, i) => f >= a + LEN[i] - 6).length;
  const gauge = 1 - notches * 0.2;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.170]} vig={0.56} glow={hexa(p.key, 0.22)}>
      <Street p={p} f={f} v={v} rake={3.2} occlX={mir ? 940 : -50} />
      {/* the depot: a mass on the left with the loading bank in front of it */}
      <Cam z={12}>
        <div style={{ position: "absolute", left: mir ? 640 : 40, top: 92, width: 330, height: 300,
          background: dkh(p.lip, 0.2) }} />
        <div style={{ position: "absolute", left: mir ? 660 : 60, top: 118, width: 290, height: 22,
          background: mix3(p.lip, PAPER, 0.3) }} />
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"dw" + i} style={{ position: "absolute", left: (mir ? 676 : 76) + i * 68,
            top: 172, width: 48, height: 74, background: hexa(INK, 0.44) }} />
        ))}
      </Cam>
      {/* THE GAUGE on the depot wall — 34% of panel height, brightest on the wall */}
      <Cam z={50}>
        <Gauge x={mir ? 726 : 86} y={p.horizon - 366} v={gauge} s={1.06} z={50} />
      </Cam>
      {/* three depot Claudes on the bank, each a different costume AND loop */}
      {[0, 1, 2].map(i => (
        <Crew key={"dc" + i} f={f} x={(mir ? 700 : 100) + i * 118} y={p.horizon + 74}
          i={i + 3} size={104} z={34} at={2 + i * 4} loop={i} />
      ))}

      {/* ⭐ THE CYCLE: the van and its chain cross the whole frame, four times */}
      <Cam z={40}>
        <Van p={p} x={vanX} y={p.horizon - 292} s={1.02} f={f} door={0.06} plate={idx === 0} z={40} flip={mir} />
      </Cam>
      {R.servers.map((id, i) => (
        <Toolbox key={id} id={id} x={vanX + (mir ? -206 - i * 120 : 790 + i * 120)}
          y={p.horizon + 74} s={0.82} f={f} jolt={Math.sin(f / 3.4 + i * 1.7) * 4} z={46 + i} />
      ))}
      <Chain x0={vanX + (mir ? -60 : 762)} y0={p.horizon + 96}
        x1={vanX + (mir ? -200 : 880)} y1={p.horizon + 112} n={7} taut={0.85} z={44} />
      {/* the drag dust, only while it is moving */}
      {t > 0.04 && t < 0.96 && (
        <Puff x={vanX + (mir ? -180 : 640)} y={p.horizon + 96} f={f} at={f - 1} n={5} s={0.7} z={62} />
      )}
      {PASS.map((a, i) => (
        <Ring key={"nr" + i} x={mir ? 786 : 186} y={p.horizon - 200} f={f} at={a + LEN[i] - 6}
          c={hexa(i === 3 ? RED : GOLD, 0.75)} z={72} s={0.5} dur={16} />
      ))}
      <Mark x={mir ? 92 : 842} y={106} s={80} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE FIX (PEAK) — f1069..f1223 (154f, 5.13s)
   VO: "Now go to your settings and switch tool access to load tools when needed
        so you only pay for tools when they're actually used."
   ⛔ THE ONE GENUINELY DARK SET, ON PURPOSE (§8: hierarchy needs DARKNESS). A
      bright hall with one lit thing has the biggest value spread in the reel.
      The dark stop is NOT lifted anywhere; the light is a practical.
   ⛔ ARRIVALS SPREAD ACROSS THE FULL 154 FRAMES: f18/42/66/90/114.
   ⭐ §10 — INPUT is the lever, OUTPUT is the one box coming back, SOURCE is the
      four that stayed put. All three halves are on screen.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lockup");
  const mir = MIRROR[v].includes(9);
  const DX = INT_DX[v];
  const MX = (x: number, w = 0) => (mir ? W - x - w : x) + DX;
  const THROW = 10, ATS = [18, 42, 66, 90, 114], BELL = 126, SAVED = 138;
  /* the roller shutter runs for the whole scene — the only light in a dark set,
     and the only thing repainting between the five arrivals */
  const slat = (i: number) => (((i * 30 - (f + INT_PH[v]) * 6.2) % 330) + 330) % 330;
  const on = E(f, THROW, THROW + 9, 0, 1, BACK);
  const seated = ATS.filter(a => f >= a).length;
  const out = f >= BELL + 6 ? 0 : -1;
  const runOut = f >= BELL + 6 ? E(f, BELL + 6, BELL + 20, 0, 1, OUT) : 0;
  const held = f < BELL ? 5 - seated : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.164]} vig={0.7} glow={hexa(p.key, 0.24)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 62%, ${p.floor2} 100%)` }} />
      {/* the roller shutter, the only opening, and the practical cone from it */}
      <div style={{ position: "absolute", left: 0, top: p.horizon, width: W, height: H - p.horizon,
        zIndex: 6, background: `linear-gradient(180deg, ${p.floor2} 0%, ${p.floor} 60%, ${dkh(p.floor, 0.3)} 100%)` }} />
      <div style={{ position: "absolute", left: MX(704, 200), top: 0, width: 200, height: 240, zIndex: 8,
        background: `linear-gradient(180deg, ${mix3(SODIUM, PAPER, 0.5)} 0%, ${hexa(SODIUM, 0.2)} 100%)` }} />
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"ls" + i} style={{ position: "absolute", left: MX(704, 200), top: slat(i) - 26, width: 200,
          height: 20, zIndex: 9, background: i % 2 ? hexa(PAPER, 0.5) : hexa(INK, 0.42) }} />
      ))}
      <div style={{ position: "absolute", left: MX(620, 380), top: 0, width: 380, height: 700, zIndex: 9,
        background: `linear-gradient(196deg, ${hexa(SODIUM, 0.22)} 0%, ${hexa(SODIUM, 0)} 62%)` }} />
      {/* ⭐⭐ THE OVERHEAD HOIST — the fix for a 3.24. A dark set has almost no
          luma delta to spend, so §8's answer ("add a practical, brighten the
          SUBJECT, never lift the palette's dark stop") is applied as a BRIGHT
          object that TRAVELS: a lit crate running the full width on a rail, over
          and over, plus the rail's own alternating slats. Large x bright x fast
          is the only combination §1 says registers. */}
      <div style={{ position: "absolute", left: 0, top: 118, width: W, height: 16, zIndex: 22,
        background: dkh(STEEL, 0.42) }} />
      {Array.from({ length: 14 }, (_, i) => {
        const x = (((i * 84 - (f + INT_PH[v]) * 11.5) % 1176) + 1176) % 1176 - 90;
        return <div key={"rs" + i} style={{ position: "absolute", left: x, top: 112, width: 44,
          height: 26, zIndex: 23, background: i % 2 ? mix3(STEEL, "#FFFFFF", 0.3) : dkh(INK, -0.06) }} />;
      })}
      {Array.from({ length: 4 }, (_, i) => {
        const x = (((i * 300 - (f + INT_PH[v]) * 11.5) % 1200) + 1200) % 1200 - 200;
        return (
          <React.Fragment key={"hz" + i}>
            <div style={{ position: "absolute", left: x + 60, top: 130, width: 12, height: 58,
              zIndex: 24, background: STEEL }} />
            <div style={{ position: "absolute", left: x, top: 186, width: 214, height: 156,
              borderRadius: 9, zIndex: 24, background: mix3(WOODT, SODIUM, 0.5) }} />
            <div style={{ position: "absolute", left: x, top: 186, width: 214, height: 18,
              borderRadius: "9px 9px 0 0", zIndex: 25, background: mix3(SODIUM, "#FFFFFF", 0.44) }} />
            <div style={{ position: "absolute", left: x + 92, top: 218, width: 30, height: 82,
              zIndex: 25, background: hexa(INK, 0.32) }} />
            <div style={{ position: "absolute", left: x + 12, top: 300, width: 190, height: 12,
              borderRadius: 6, zIndex: 25, background: dkh(WOODT, 0.4) }} />
          </React.Fragment>
        );
      })}
      {/* ⭐ THE PIGEONHOLES — five lit holes, one lamp coming up per seating */}
      <Cam z={30}>
        <Pigeonholes x={MX(96, 796)} y={214} f={f} seated={seated} out={out} ats={ATS} z={30} />
      </Cam>
      {/* the boxes still on the chain, dropping one at a time */}
      {R.servers.map((id, i) => {
        if (f >= ATS[i]) {
          const lf = f - ATS[i];
          if (lf > 12) return null;
          const t = lf / 12;
          return <Toolbox key={id} id={id} x={MX(860 - t * (760 - i * 152), 186)} y={694 - t * 438}
            s={0.92 - t * 0.28} f={f} z={68} />;
        }
        return <Toolbox key={id} id={id} x={MX(604 + i * 30, 186)} y={556} s={0.68} f={f}
          jolt={Math.sin(f / 5 + i) * 2.6} z={60 - i} />;
      })}
      {/* THE LEVER — the real in-product strings, both positions */}
      <Cam z={64}>
        <Lever x={MX(716, 300)} y={272} on={on} s={0.86} z={64} />
      </Cam>
      <Ring x={MX(800)} y={300} f={f} at={THROW + 6} c={BRASS} z={80} s={0.5} dur={18} />
      {/* the call bell, and ONE box running back out on its runner */}
      <Cam z={68}>
        <CallBell x={MX(452, 108)} y={588} f={f} at={BELL} z={68} />
      </Cam>
      {runOut > 0 && (
        <Toolbox id={R.servers[0]} x={MX(110 + runOut * 300, 186)} y={372 + runOut * 190}
          s={0.6 + runOut * 0.12} f={f} lit z={74} />
      )}
      {/* the payoff number, seated late, so the scene has an arc to its end */}
      {f >= SAVED && (
        <div style={{ position: "absolute", left: MX(120, 340), top: 618, zIndex: 84,
          transform: `scale(${E(f, SAVED, SAVED + 8, 0.7, 1, BACK)})`, transformOrigin: "0% 50%" }}>
          <div style={{ padding: "14px 26px", borderRadius: 12, background: CREAMB, boxShadow: SH_D,
            display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 74, color: VERD }}>{R.saved.n}</span>
            <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 1.2, color: hexa(INK, 0.7) }}>{R.saved.label}</span>
          </div>
        </div>
      )}
      <Hero f={f} x={MX(452)} y={678} size={200} z={70} act={1} ph={0.8} flip={mir}
        costume={{ constr: 1 }} reach={f < THROW + 10 ? 132 : 100}
        drive={f < THROW + 10 ? 0.9 : 0.2} cheer={f > SAVED ? 0.7 : 0} />
      <Mark x={mir ? 842 : 92} y={106} s={80} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S10 · CTA — f1223..f1338 (115f, 3.85s)
   VO: "I made a list of 15 mistakes to avoid in a free guide. Comment MISTAKE
        for access."
   ⛔ SPRITE PITCH IS ARITHMETIC, NOT TASTE. 18 sprites at s=148 across 600px is
      120px of pitch for ~126px bodies and renders as one orange mass. Ten
      sprites, five columns, 172px pitch at size 152 satisfies
      `spacing >= 0.85 * (rA + rB)` = 129. Computed BEFORE the count was chosen.
   ⛔ costumeFor(i) cycles ALL TWELVE levers. Reel 107 shipped four and was told.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("day");
  const mir = MIRROR[v].includes(10);
  const CREW0 = 1, GUIDE = 5, COUNT = [9, 14, 19, 24], KW = 11;   /* ⭐ 48-frame scene now */
  const n = f < COUNT[0] ? "3" : f < COUNT[1] ? "6" : f < COUNT[2] ? "9" : f < COUNT[3] ? "12" : R.guide.n;
  const away = E(f, 4, 40, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.182]} vig={0.54} glow={hexa(p.key, 0.22)}>
      <Street p={p} f={f} v={v} rake={2.2} occlX={mir ? 944 : -48} />
      {/* the van pulls away CLEAN — door latched for the first time in the reel */}
      <Cam z={26} o={1 - away * 0.35}>
        <Van p={p} x={(mir ? 560 : 300) + away * (mir ? -560 : 620)} y={p.horizon - 226}
          s={0.66} f={f} door={0} plate={false} z={26} flip={mir} />
      </Cam>
      {/* ⭐ TEN CLAUDES, five columns, 172px pitch — computed, not guessed */}
      {Array.from({ length: 10 }, (_, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        return (
          <Crew key={"cw" + i} f={f} x={112 + col * 172 + row * 44} y={p.horizon + 128 + row * 54}
            i={i} size={152 - row * 14} z={40 + row * 6} at={CREW0 + i * 8} loop={i % 4} />
        );
      })}
      {/* the guide: a real bound document, counting up in stepped pops */}
      <Cam z={76}>
        <Guide x={372} y={188} f={f} at={GUIDE} n={n} z={76} />
      </Cam>
      {COUNT.map((c, i) => (
        <Ring key={"cr" + i} x={506} y={300} f={f} at={c} c={hexa(GOLD, 0.6)} z={82} s={0.45} dur={12} />
      ))}
      {/* twelve more chalk marks land on the kerb beside the original three */}
      {Array.from({ length: 12 }, (_, i) => {
        const at = COUNT[0] + i * 3;
        return f >= at ? (
          <div key={"ck" + i} style={{ position: "absolute", zIndex: 78,
            left: 128 + (i % 6) * 42, top: p.horizon + 96 + Math.floor(i / 6) * 34,
            width: 9, height: E(f, at, at + 5, 0, 30, OUT), borderRadius: 3,
            transform: `rotate(${(i % 3) * 9 - 9}deg)`, background: hexa(CHALK, 0.8) }} />
        ) : null;
      })}
      {/* the keyword, stencilled, landing last with a squash and a ring.
          ⛔ THE HEADER COVERS PANEL y 0-96 — this plate sat at 92 and the word was
          clipped by it every single time. It lives in the lower third now. */}
      {f >= KW && (
        <div style={{ position: "absolute", left: 0, top: 596, width: W, zIndex: 88,
          transform: `scale(${E(f, KW, KW + 9, 0.72, 1, BACK)})`, transformOrigin: "50% 50%" }}>
          <div style={{ margin: "0 auto", width: 470, padding: "16px 0", borderRadius: 14,
            background: CLAY, boxShadow: SH_D, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62, letterSpacing: 5,
            color: PAPER }}>{R.guide.kw}</div>
        </div>
      )}
      <Ring x={506} y={644} f={f} at={KW} c={hexa(CLAY, 0.8)} z={90} s={0.9} />
      <Mark x={mir ? 92 : 842} y={620} s={92} z={92} />
    </Scene>
  );
};
