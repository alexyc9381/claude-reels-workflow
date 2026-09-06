import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Contact, Ring, Puff, Steam, Fall, Crew, Forearm, Rig, anchors, Motes,
  CLAY, GOLD, GREEN, RED, INK, IRON, CHROME, BONE,
  REPOS, repoBy, asPlace, GY, mono, ui,
} from "./RpsWorld";
import type { Kit, Repo } from "./RpsWorld";
import { Room } from "./HwSets";
import { ShopWall, BayLamp, TyreStack, Toolbox, Drum, Lift, Chain, Hook, Tag, HangPart, Hoist, CrewBand, GhFitout } from "./RpsSets";
import { RepoCard, GhSign, Gem, Sled } from "./RpsProps";
import { LAY, RAKE_K, RAKE_X, RAKE_N, punch } from "./RpsScenes";
import type { Variant, SP } from "./RpsScenes";

/* ===========================================================================
   REEL 137 · "REPOS" — THE HOOK CANDIDATES.

   ⛔⛔ docs/THE-OPEN.md STEP 1: the first build step is N concepts for scene 0,
   each rendered at full quality on the real chassis, and THREE CUTS = THREE
   HOOKS, NOT THREE GRADES. Each candidate is a different one-word MECHANISM
   on the same set, the same subject and the same line:

     lift   ELEVATION   the scissor lift raises him INTO the four hanging parts
     drop   LOAD        the four parts come DOWN onto him one by one; he takes
                        each with his whole body (a body against a load)
     pit    SWARM       he skids in on a dolly and a pit crew sprints in from
                        both edges carrying the parts, slamming them on

   ⭐ ALL THREE OBEY THE WINNERS' CHECKLIST (feedback_read_the_winning_hook):
   one body, f0 already mid-action, the event inside ~30 frames, travel over a
   third of the body, an arrival that COSTS, the last third a body action, and
   it does NOT resolve — the fourth part is still coming when the cut lands.

   ⭐ FRAME 0 LUMA rides the pale brick wall and the lit floor of `floor`, never
   the hero, so the hero can stay saturated clay against a pale ground and
   hold the biggest value spread in the frame.
   ========================================================================= */

export type HookId = "lift" | "drop" | "pit";

/** the four hoists across the gantry, in repo order, with the part hanging */
const HOIST_X = [396, 650, 506, 800];
const HOIST_LEN = [112, 122, 40, 96];

/* ---- a mixed crew band: the four bay crews, one colour each -------------- */
const ShopCrew: React.FC<{ f: number; v: Variant; cheer?: number; y?: number }> = ({ f, v, cheer = 0, y = H + 62 }) => {
  const L = LAY[v];
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 84 }}>
      {REPOS.map((r, i) => (
        <Crew key={r.key} f={f} x={126 + i * 254 + (rnd(i + 3, 2) - 0.5) * 34 + L.c * 0.3} y={y - (i % 2) * 12}
          i={r.cos[1] + i * 5} size={184 - (i % 3) * 8} z={84 + (i % 2)} at={-40} loop={i % 2 === 0 ? 0 : 2} tint={r.c}
          flip={i % 2 === 1} cheer={cheer} />
      ))}
    </div>
  );
};

/* =========================================================================
   lift · ELEVATION
   BEFORE  f0: he stands braced on the lift at floor level, the ram hissing,
           four parts hanging above him on the hoists, the first already
           lowering. Settled, mid-action, the joke already legible.
   TRIGGER f6 / f12: the lift JOLTS twice and fails to rise.
   TRAVEL  f14-58: the scissors open and he rises 300px toward the parts while
           the parts come down 60px to meet him.
   ARRIVAL f58: the INTAKE meets his hip and LOCKS — clank, recoil, sparks, a
           ring; he squashes and recovers; the tag on that hoist lights.
   ⛔ f66-102: the HUD swings in toward his shoulder and is still swinging when
           the cut lands. It does not resolve.
   ====================================================================== */
export const LIFTHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: HAUL. ONE BODY AGAINST A LOAD.
     ⛔ The three hooks before this one were PASSIVE ACCRETION in three costumes — parts, then
     cards, then gems, all coming to a Claude standing still on a lift while he received them.
     Measured, the open was already inside the winners' band (mean Δ 5.26 against 4.87-6.79, f0
     subject 9.9% against 9.0-28.0%), so it was never churn and never a pale frame 0: it was the
     SHAPE ([[feedback_one_concept_four_costumes]]).

     Against the winning-hook checklist ([[feedback_read_the_winning_hook_do_not_just_measure_it]]):
     BEFORE   f0 he is ALREADY mid-pull — rope taut, body bowed, heels dug in, steam off him, and
              the sled has NOT moved. Legible with the sound off: he is dragging his own junk.
     TRIGGER  f10 the first repo SLAMS into him. It costs: recoil, a ring, dust off the floor.
     TRAVEL   f12-30 he goes 120px, then 190, then 250 — 560px total against a 330px body, so
              **1.7 body widths**, where the floor is a third and half is good.
     ARRIVAL  each surge ends on a thump: the wheels cross a floor joint, he recoils, dust.
     ⛔ IT DOES NOT RESOLVE — the fourth repo is still in the air at the cut, and he is mid-stride.
     ⭐ And the last third is a BODY ACTION, not a wait: he is running with it. */
  const HS = 384;
  const SLAM = [10, 32, 58, 92];                       /* the repos landing on him */
  const seg = [0, 120, 310, 560];                      /* cumulative distance after each */
  let dist = 0;
  for (let i = 0; i < 3; i++) {
    const a = SLAM[i] + 2, b = SLAM[i] + (i === 0 ? 18 : i === 1 ? 24 : 32);
    dist += (seg[i + 1] - seg[i]) * E(f, a, b, 0, 1, OUT);
  }
  /* ⭐ BEFORE the first repo lands he is not merely "straining" — he HEAVES: rocks back and throws
     his weight forward on a 7-frame cycle, the sled creeps a few px and slips back, the wheels kick
     dust. A held strain pose measured 11 frames under Δ2.0; a heave is an action loop with travel
     ([[feedback_action_loop_is_not_a_scene]], [[feedback_a_sway_is_not_motion]] — this one TRAVELS). */
  const heave = f < SLAM[0] + 2 ? Math.sin(f / 3.4) : 0;
  const HX = 336 + dist + heave * 9 + L.a * 0.2;
  const hit = SLAM.slice(0, 3).reduce((m, at) => { const d = f - at; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.4)) : m; }, 0);
  /* the thump at the end of each surge — the wheels crossing a joint */
  const THUMP = [30, 58, 92];
  const thump = THUMP.reduce((m, at) => { const d = f - at; return d >= 0 && d < 10 ? Math.max(m, Math.exp(-d / 3)) : m; }, 0);
  /* he strains hardest BEFORE the first repo, and less after each one — the load getting easier
     is the whole claim, drawn */
  const eff = f < SLAM[0] ? 0.92 : f < SLAM[1] ? 0.72 : f < SLAM[2] ? 0.5 : 0.3;
  const a = anchors(HX, GY, HS);
  /* ⛔ on the first probe the sled sat mostly off-frame left for half the hook, so f0 did not read
     as "he is dragging something" — the checklist's law 2. It starts 62% in frame, cropped by the
     left edge, which is also the near-edge mass the winners all have. */
  const sledX = HX - 262 - heave * 4, sledY = GY + 6;
  const camS = 1.0 + 0.06 * E(f, 0, dur, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.40}>
      <Cam s={camS} x={-0.45 * dist} y={0} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={0} z={19} graphX={64} graphY={232} cols={9} rail={false} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      <GhSign x={232} y={330} w={268} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      {/* the load, cropped by the left edge at f0 and fully in frame by the cut */}
      <Sled x={sledX} y={sledY} f={f} s={1} z={50} roll={dist} lift={Math.min(1, dist / 560) * 0.8} jolt={thump} />
      {/* ⛔ the first probe drew this as a pale bar and it read as a pink pipe crossing the frame.
          It is a steel TOW BAR he has both hands on: dark, thick, angled up to his grip, and it
          shudders on every hit. */}
      <div style={{ position: "absolute", left: sledX + 236, top: GY - 214 + thump * 6,
        width: Math.max(0, HX - sledX - 250), height: 14, zIndex: 54, borderRadius: 7,
        transformOrigin: "0% 50%", transform: `rotate(${-13 + hit * 3}deg)`, boxShadow: SH_D,
        background: `linear-gradient(180deg, #6A635A 0%, #3E3931 45%, #201D18 100%)` }} />
      <Contact x={HX} y={GY - 10} w={HS * 0.86 + thump * 40} o={0.4} />
      {/* ⭐ he LEANS INTO IT: `drive` is the forward-lean the rig already has, and it never drops
          to zero until the last surge, so the last third is a body action */}
      <Rig f={f} x={HX} y={GY} size={HS} z={56} act={f >= SLAM[2] ? 0 : 1} ph={0.3}
        drive={0.5 + 0.35 * hit + heave * 0.22} strain={eff * (0.7 + 0.3 * hit) + Math.max(0, -heave) * 0.2} gaze={0.5}
        shock={hit > 0.45 || thump > 0.5 ? 0.7 : 0} reach={30}
        cheer={f >= SLAM[2] + 8 ? E(f, SLAM[2] + 8, SLAM[2] + 20, 0, 0.8, OUT) : 0} />
      {/* effort comes off the STILLEST part of him: steam off the shoulders while he is stuck */}
      {f < SLAM[1] && <Steam x={HX - 40} y={GY - HS * 0.86} f={f} at={0} n={9} z={72} s={1.25} c="#DDD5C4" rate={1.5} />}
      {/* the wheels kick as he heaves and they refuse to roll */}
      {f < SLAM[0] + 4 && [0, 6, 12].map((at) => (f >= at && f < at + 14
        ? <Puff key={"hv" + at} x={sledX + 116} y={GY + 2} f={f} at={at} c="#DED6C6" z={53} n={8} s={1.0} up={0.12} />
        : null))}
      {/* ⭐ the repos ARRIVE ON HIM — arcing in from the top right and slamming into his shoulder */}
      {REPOS.map((r, i) => {
        const at = SLAM[i], t0 = at - 16;
        if (f < t0 || (i < 3 && f > at + 6)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        const gx = HX + 470 - 400 * k, gy = -150 + (a.headTop + 30 + 150) * k;
        return <Gem key={r.key} repo={r} x={gx} y={gy} s={150 + 30 * k} z={92} f={f} lit={Math.min(1, k * 1.6)}
          spin={(1 - k) * 34} stars={1} label={false} shake={i === 3 ? 0.6 : 0} />;
      })}
      {/* every landing costs: a ring, sparks off the shoulder, dust off the floor */}
      {SLAM.slice(0, 3).map((at) => (f >= at && f < at + 24 ? (
        <React.Fragment key={"im" + at}>
          <Ring x={a.headTop ? HX + 40 : HX} y={a.headTop + 40} f={f} at={at} c={mxh(GOLD, 0.4)} z={94} s={1.7} dur={18} />
          <Fall x={HX - 60} y={a.headTop + 30} w={200} f={f} at={at} n={14} z={94} c={mxh(GOLD, 0.3)} rate={1.8} s={1.1} />
          <Puff x={HX - 90} y={GY - 16} f={f} at={at} c="#E4DCC8" z={58} n={12} s={1.3} up={0.15} />
        </React.Fragment>
      ) : null))}
      {/* the wheels bite: dust kicked up behind the sled the whole way */}
      {dist > 4 && <Puff x={sledX + 120} y={GY + 4} f={f} at={SLAM[0]} c="#DED6C6" z={52} n={9} s={1.0} up={0.1} />}
      <ShopCrew f={f} v={v} />
      <TyreStack x={-60 + L.c} n={3} s={1.0} z={96} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   drop · LOAD — a body against a load (the OX / UNLAZY / BOSS class).
   BEFORE  f0: he stands on the floor under four parts already lowering.
   TRIGGER f14: the first part lets go of its hook.
   TRAVEL  each part falls ~260px onto him.
   ARRIVAL f28 / f52 / f76: he SINKS and SPREADS under each, dust off the
           floor, a ring, the tag lights; the strain baseline climbs.
   ⛔ f86: the TANK lets go and is 40px above his head at the cut.
   ====================================================================== */
export const DROPHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: PRESS. ONE BODY UNDER A LOAD — the vertical answer to the haul.
     ⛔ Same rebuild as the house hook: this was PASSIVE ACCRETION too (four parts fall on a Claude
     who stands and receives them). Now the load is ON him and the travel is HIS OWN BODY:
     BEFORE   f0 he is already buckling — knees bent, arms locked over his head, the loaded sled
              bed pressing down on him and 30px lower than it should be. Steam off his shoulders.
     TRIGGER  f12 the first repo lands ON the load. It costs: the whole stack jolts, dust, recoil.
     TRAVEL   he PUSHES BACK UP: 62px, then 108, then 168 — 338px on a 384px body, so 0.88 of his
              own height, where the floor is a third.
     ⛔ IT DOES NOT RESOLVE — the fourth repo is still falling at the cut and he is mid-press. */
  const HS = 384;
  const LAND = [12, 34, 60, 114];
  const seg = [0, 62, 170, 338];
  let up = 0;
  for (let i = 0; i < 3; i++) {
    const a = LAND[i] + 2, b = LAND[i] + (i === 0 ? 16 : i === 1 ? 22 : 42);
    up += (seg[i + 1] - seg[i]) * E(f, a, b, 0, 1, OUT);
  }
  const hit = LAND.slice(0, 3).reduce((m, at) => { const d = f - at; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.2)) : m; }, 0);
  /* he is pressed 96px into the floor at f0 and rises out of it */
  const squat = 96 - up * 0.28;
  const HX = 506 + L.a * 0.2;
  const a2 = anchors(HX, GY, HS);
  const eff = f < LAND[0] ? 0.95 : f < LAND[1] ? 0.76 : f < LAND[2] ? 0.54 : 0.32;
  const heave = f < LAND[0] + 2 ? Math.sin(f / 3.2) : 0;
  const bedY = a2.headTop + 26 - up + heave * 5;
  const camS = 1.04 + 0.09 * E(f, 0, dur, 0, 1, LIN) + 0.09 * E(f, 74, dur, 0, 1, LIN);
  /* ⛔ Q4 was the third slow press and one falling gem (TAIL 0.43 → 0.55, still flagged). As he
     drives it up the last time the LOAD LETS GO: the bed tips and the cargo slides off, which is
     several objects travelling through the frames a viewer was otherwise watching nothing in. */
  const shed = E(f, 76, dur, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.40}>
      <Cam s={camS} x={0} y={0.30 * up} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={2} z={19} graphX={80} graphY={244} cols={12} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      <GhSign x={214} y={352} w={262} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      {/* ⭐ THE LOAD IS OVER HIS HEAD — the same sled, tipped onto him, riding on his arms */}
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 62,
        transform: `translateY(${bedY - GY - 6}px) rotate(${-2.5 + hit * 2 - shed * 13}deg)`, transformOrigin: `${HX}px ${GY}px` }}>
        <Sled x={HX - 30} y={GY + 6} f={f} s={0.94} z={62} roll={0} lift={0} jolt={hit} />
      </div>
      <Contact x={HX} y={GY - 10} w={HS * 0.9 + hit * 40} o={0.42} />
      <Rig f={f} x={HX} y={GY} size={HS} z={56} act={3} ph={0.3}
        strain={Math.min(1, eff + hit * 0.3 + Math.max(0, -heave) * 0.15)} lift={Math.min(1, up / 338)}
        shock={hit > 0.5 ? 0.75 : 0} gaze={-0.4} reach={40}
        cheer={f >= LAND[2] + 10 ? E(f, LAND[2] + 10, LAND[2] + 22, 0, 0.7, OUT) : 0} />
      {/* effort off the stillest part of him while he is pinned */}
      {f < LAND[1] && <Steam x={HX + 70} y={GY - HS * 0.80} f={f} at={0} n={9} z={72} s={1.3} c="#DDD5C4" rate={1.5} />}
      {/* the repos land ON the load, from straight above */}
      {REPOS.map((r, i) => {
        const at = LAND[i], t0 = at - 18;
        if (f < t0 || (i < 3 && f > at + 6)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        return <Gem key={r.key} repo={r} x={HX - 130 + i * 92} y={-190 + (bedY - 96 + 190) * k}
          s={150 + 26 * k} z={92} f={f} lit={Math.min(1, k * 1.6)} spin={(1 - k) * 30} stars={1}
          label={false} shake={i === 3 ? 0.6 : 0} />;
      })}
      {LAND.slice(0, 3).map((at) => (f >= at && f < at + 24 ? (
        <React.Fragment key={"lm" + at}>
          <Ring x={HX} y={bedY - 40} f={f} at={at} c={mxh(GOLD, 0.4)} z={94} s={1.9} dur={18} />
          <Fall x={HX - 130} y={bedY - 30} w={280} f={f} at={at} n={16} z={94} c={mxh(GOLD, 0.3)} rate={1.8} s={1.1} />
          <Puff x={HX} y={GY - 14} f={f} at={at} c="#E4DCC8" z={58} n={12} s={1.3} up={0.15} />
        </React.Fragment>
      ) : null))}
      {/* the cargo coming off the high side as it tips */}
      {shed > 0.02 && (<>
        <Fall x={HX - 300} y={bedY - 120} w={340} f={f} at={78} n={22} z={90} c={mxh(BONE, 0.16)} rate={2.1} s={1.6} />
        <Fall x={HX - 220} y={bedY - 60} w={260} f={f} at={86} n={14} z={90} c={mxh(GOLD, 0.24)} rate={1.9} s={1.3} />
        <Puff x={HX - 260} y={GY - 20} f={f} at={90} c="#E4DCC8" z={58} n={12} s={1.4} up={0.12} />
      </>)}
      <ShopCrew f={f} v={v} />
      <TyreStack x={-50 + L.c} n={3} s={1.0} z={96} />
      <Toolbox x={W + 26 - L.c} y={H + 30} s={1.1} z={96} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   pit · SWARM
   BEFORE  f0: he is already sliding in on a dolly from the left, tyre smoke.
   TRIGGER f16: the dolly stops dead on the lift plate; he lurches.
   TRAVEL  f12 / f30 / f48 / f84: four crew Claudes sprint in from both
           edges carrying the parts (each crosses ~560px in 14 frames).
   ARRIVAL each slams a part on with a puff and a ring; the tag lights.
   ⛔ the fourth runner reaches him at f98 and is still raising the TANK at
      the cut.
   ====================================================================== */
export const PITHOOK: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const L = LAY[v];
  /* ⭐⭐⭐ MECHANISM: TEAM HAUL. ONE BODY AGAINST A LOAD, WITH A CREW BEHIND IT.
     ⛔ The third costume of the same passive shape (a crew ran gems to a Claude who stood on a
     dolly). Now he is on the rope and the pit crew are on the tailgate: same load, opposite end of
     the frame, and it travels RIGHT TO LEFT so the picture is not the house hook mirrored.
     BEFORE   f0 rope taut, three crew shoving the back, and it has not moved.
     TRIGGER  f14 the first repo lands on the crew's end.
     TRAVEL   84 → 208 → 392px, 1.06 of his own body width.
     ⛔ the fourth is still in the air at the cut. */
  const HS = 366;
  const SLAM = [14, 36, 62, 94];
  const seg = [0, 84, 208, 392];
  let dist = 0;
  for (let i = 0; i < 3; i++) {
    const a2 = SLAM[i] + 2, b = SLAM[i] + (i === 0 ? 18 : i === 1 ? 24 : 32);
    dist += (seg[i + 1] - seg[i]) * E(f, a2, b, 0, 1, OUT);
  }
  const heave = f < SLAM[0] + 2 ? Math.sin(f / 3.6) : 0;
  const HX = 700 - dist - heave * 9 + L.a * 0.2;
  const hit = SLAM.slice(0, 3).reduce((m, at) => { const d = f - at; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.4)) : m; }, 0);
  const THUMP = [34, 62, 96];
  const thump = THUMP.reduce((m, at) => { const d = f - at; return d >= 0 && d < 10 ? Math.max(m, Math.exp(-d / 3)) : m; }, 0);
  const eff = f < SLAM[0] ? 0.92 : f < SLAM[1] ? 0.7 : f < SLAM[2] ? 0.48 : 0.28;
  const a = anchors(HX, GY, HS);
  const sledX = HX + 270 + heave * 4, sledY = GY + 6;
  const camS = 1.02 + 0.07 * E(f, 0, dur, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.40}>
      <Cam s={camS} x={0.45 * dist} y={0} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={5} z={19} graphX={82} graphY={248} cols={12} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      <GhSign x={790} y={344} w={262} z={26} on={E(f, 2, 8, 0.5, 1, OUT)} f={f} />
      <Sled x={sledX} y={sledY} f={f} s={1} z={50} roll={-dist} lift={Math.min(1, dist / 392) * 0.7} jolt={thump} />
      {/* the tow bar, running back to the sled */}
      <div style={{ position: "absolute", left: HX + 40, top: GY - 224 + thump * 6,
        width: Math.max(0, sledX - HX - 60), height: 14, zIndex: 54, borderRadius: 7,
        transformOrigin: "0% 50%", transform: `rotate(${11 - hit * 3}deg)`, boxShadow: SH_D,
        background: `linear-gradient(180deg, #6A635A 0%, #3E3931 45%, #201D18 100%)` }} />
      {/* ⭐ the pit crew, shoulders into the tailgate — the load is a TEAM problem */}
      {[0, 1, 2].map((i) => (
        <Crew key={"pc" + i} f={f} x={sledX + 300 + i * 92} y={GY + 6} i={REPOS[i].cos[0] + i * 3} size={196}
          z={49 - i} at={-30} loop={1} tint={REPOS[i].c} flip
          cheer={hit > 0.5 ? 0.5 : 0} />
      ))}
      <Contact x={HX} y={GY - 10} w={HS * 0.86 + thump * 40} o={0.4} />
      <Rig f={f} x={HX} y={GY} size={HS} z={56} act={f >= SLAM[2] ? 0 : 1} ph={0.6} flip
        drive={0.5 + 0.35 * hit + heave * 0.2} strain={eff * (0.7 + 0.3 * hit)} gaze={-0.5}
        shock={hit > 0.45 || thump > 0.5 ? 0.7 : 0} reach={30}
        cheer={f >= SLAM[2] + 8 ? E(f, SLAM[2] + 8, SLAM[2] + 20, 0, 0.8, OUT) : 0} />
      {f < SLAM[1] && <Steam x={HX + 44} y={GY - HS * 0.86} f={f} at={0} n={9} z={72} s={1.25} c="#DDD5C4" rate={1.5} />}
      {f < SLAM[0] + 4 && [0, 7, 14].map((at) => (f >= at && f < at + 14
        ? <Puff key={"hv" + at} x={sledX - 110} y={GY + 2} f={f} at={at} c="#DED6C6" z={53} n={8} s={1.0} up={0.12} />
        : null))}
      {/* the repos come down onto the crew's end and the whole load surges */}
      {REPOS.map((r, i) => {
        const at = SLAM[i], t0 = at - 16;
        if (f < t0 || (i < 3 && f > at + 6)) return null;
        const k = E(f, t0, at, 0, 1, IN_Q);
        const gx = sledX + 260 - 180 * k, gy = -150 + (GY - 300 + 150) * k;
        return <Gem key={r.key} repo={r} x={gx} y={gy} s={148 + 28 * k} z={92} f={f} lit={Math.min(1, k * 1.6)}
          spin={(1 - k) * -32} stars={1} label={false} shake={i === 3 ? 0.6 : 0} />;
      })}
      {SLAM.slice(0, 3).map((at) => (f >= at && f < at + 24 ? (
        <React.Fragment key={"pm" + at}>
          <Ring x={sledX + 90} y={GY - 260} f={f} at={at} c={mxh(GOLD, 0.4)} z={94} s={1.7} dur={18} />
          <Fall x={sledX + 10} y={GY - 270} w={220} f={f} at={at} n={14} z={94} c={mxh(GOLD, 0.3)} rate={1.8} s={1.1} />
          <Puff x={sledX + 150} y={GY - 12} f={f} at={at} c="#E4DCC8" z={58} n={12} s={1.3} up={0.15} />
        </React.Fragment>
      ) : null))}
      <ShopCrew f={f} v={v} y={H + 78} />
      <Toolbox x={W + 26 - L.c} y={H + 30} s={1.1} z={96} />
      </Cam>
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = { lift: LIFTHOOK, drop: DROPHOOK, pit: PITHOOK };

/** a standalone preview of one candidate at full quality, for the pick.
    ⛔ Labelled in the filename, never burned into the frame. */
export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C v="house" dur={102} />;
};
