import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Contact, Ring, Puff, Steam, Fall, Crew, Forearm, Rig, anchors,
  CLAY, GOLD, GREEN, RED, INK, IRON, CHROME, BONE,
  REPOS, repoBy, asPlace, GY, mono, ui,
} from "./RpsWorld";
import type { Kit, Repo } from "./RpsWorld";
import { Room } from "./HwSets";
import { ShopWall, BayLamp, TyreStack, Toolbox, Drum, Lift, Chain, Hook, Tag, HangPart, Hoist, CrewBand, GhFitout } from "./RpsSets";
import { RepoCard, GhSign } from "./RpsProps";
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
  const HX = 506 + L.a * 0.2, HS = 262;
  const jolt = (E(f, 5, 8, 0, 1, OUT) - E(f, 8, 12, 0, 1, OUT)) * 12 + (E(f, 11, 13, 0, 1, OUT) - E(f, 13, 16, 0, 1, OUT)) * 16;
  /* ⭐ TWO RISES, so the last third is a travel and not a wait: up to the first REPO (f14-52),
     the install, then on up toward the DeepSeek card (f60-100), which is descending to meet him
     and is still above his head at the cut. */
  const rise = 6 + 300 * E(f, 14, 52, 0, 1, IO) + 80 * E(f, 60, 100, 0, 1, IO);
  const platTop = GY - 18 - rise - 26;
  const meet = E(f, 14, 52, 0, 1, IO);                      /* the cards come down to meet him */
  /* ⭐⭐ THE EVENT IS AN INSTALL, and it is GitHub's own verb. The card closes on him (f14-52),
     its progress bar fills (f46-58), the tick stamps at f58 — where the hero clank already sits —
     the card is consumed (f58-64) and the hardware it carried seats on his hip (f58-66, the
     wrench cue). Card in the air, hardware on the body: one substitution that says REPO and
     UPGRADE in the same beat (feedback_illustrate_the_sentence_not_the_set). */
  const install = E(f, 46, 58, 0, 1, LIN);
  const consumed = f >= 58;
  const lock = E(f, 58, 66, 0, 1, BACK);
  const locked = f >= 58;
  const impact = f >= 58 ? Math.exp(-(f - 58) / 4) : 0;
  const kit: Kit = { intake: lock };
  const a = anchors(HX, platTop + 20, HS);
  const swing2 = f < 58 ? 0 : -6 + 22 * E(f, 58, 102, 0, 1, IO);
  const coreDown = 70 * E(f, 60, 102, 0, 1, IO);
  /* ⭐ the star counts are still CLIMBING as the cards come down — a real number moving is the
     top of the motion table and it is the repo's own number (feedback_graphical_over_textual) */
  const count = E(f, 4, 46, 0.972, 1, OUT);
  /* the camera follows the rise: a slow push, and the frame tilts up with him */
  const camS = 1 + 0.09 * E(f, 14, 100, 0, 1, LIN);
  const camY = 0.28 * (rise - 6);
  /* the hero card's own travel: it starts high and right, and comes down to his shoulder line.
     ⛔ its left edge stays right of 520 so it never crosses the hero's FACE
     (feedback_face_is_a_performance_surface). */
  const CARDX = 736;
  const cardY = 104 + 168 * E(f, 10, 52, 0, 1, IO);
  const cardGone = E(f, 58, 66, 0, 1, IN_Q);
  const CARD2X = 700;
  const card2Y = 82 + 150 * E(f, 62, 102, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.0]} vig={0.40}>
      <Cam s={camS} x={0} y={camY} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={0} z={19} graphX={64} graphY={232} cols={9} rail={false} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      {/* the shop's own sign — the ≥96px REAL mark the sentence names in its first four words */}
      <GhSign x={198} y={352} w={286} z={26} on={E(f, 2, 8, 0.35, 1, OUT)} f={f} />
      {/* ⛔ ONE DOMINANT OBJECT (feedback_hook_simplicity): four legible cards at once was an
          unreadable pile on the first probe. The three repos he has not reached yet hang as the
          HARDWARE they become, small and high; the repo actually arriving is the only CARD in
          frame, and it is big enough to read on a phone. */}
      {[2, 3].map((i2, n) => {
        const hx2 = [150, 906][n];
        const ln = [122, 112][n] + meet * 34 + (i2 === 2 ? coreDown * 0.5 : 0);
        const sw = Math.sin(f / 13 + i2 * 1.7) * 1.8 + jolt * 0.25 * (n % 2 ? 1 : -1);
        return <Hoist key={REPOS[i2].key} repo={REPOS[i2]} x={hx2 + L.b * 0.2 + jolt * 0.4} len={ln} f={f}
          z={58 + n} swing={sw} partSize={176} tag={false} />;
      })}
      {/* ⭐⭐ THE HERO: the anydoc repo card comes down its chain onto him and INSTALLS. */}
      <Chain x={CARDX + L.b * 0.2} top={0} len={cardY - 18} z={62} swing={Math.sin(f / 15) * 1.2} />
      <Hook x={CARDX + L.b * 0.2} y={cardY - 18} z={63} swing={Math.sin(f / 15) * 3} />
      {f < 68 && (
        <RepoCard repo={REPOS[0]} x={CARDX + L.b * 0.2} y={cardY} w={412 * (1 - 0.34 * cardGone)} z={64} f={f}
          count={count} install={install} rot={Math.sin(f / 15) * 1.4} open={1 - cardGone} />
      )}
      {/* ⭐ THE SECOND REPO IS ALREADY ON ITS WAY DOWN AT THE CUT — the hook's unresolved event.
          Its bar has barely started, so the viewer leaves mid-install, not after one (THE-OPEN:
          the open ends on a question, and feedback_predictable_is_not_anticipatory). */}
      {f >= 60 && (<>
        <Chain x={CARD2X + L.b * 0.2} top={0} len={card2Y - 18} z={62} swing={Math.sin(f / 12) * 2.2} />
        <Hook x={CARD2X + L.b * 0.2} y={card2Y - 18} z={63} swing={Math.sin(f / 12) * 5} />
        <RepoCard repo={REPOS[1]} x={CARD2X + L.b * 0.2} y={card2Y} w={366} z={64} f={f} count={1}
          install={E(f, 92, 118, 0, 1, LIN)} rot={-2.4 + Math.sin(f / 12) * 2.4} open={E(f, 60, 68, 0, 1, OUT)} />
      </>)}
      <Lift x={HX} y={GY} rise={rise + jolt} f={f} w={400} z={40} steamAt={0} />
      {[6, 12].map((j) => (f >= j && f < j + 16 ? <Puff key={j} x={HX} y={GY - 30} f={f} at={j} c="#DDD5C4" z={44} n={8} s={1.2} up={0.3} /> : null))}
      <Contact x={HX} y={platTop + 22 - jolt} w={HS * 0.8} o={0.4} />
      <Rig f={f} x={HX} y={platTop + 20 - jolt} size={HS} z={56} act={3} ph={0.3} kit={kit}
        strain={f < 14 ? 0.32 : impact * 0.7} gaze={f < 58 ? -0.6 : 0.4} shock={impact > 0.4 ? 0.6 : 0}
        cheer={f < 58 ? 0.25 * E(f, 14, 30, 0, 1, OUT) : E(f, 70, 84, 0.25, 0.75, OUT)} />
      {/* the install costs: a ring, sparks off the hip, dust off the platform */}
      {locked && f < 84 && (<>
        <Ring x={a.hipL.x} y={a.hipL.y} f={f} at={58} c={mxh(REPOS[0].c, 0.4)} z={72} s={1.4} dur={18} />
        <Fall x={a.hipL.x - 80} y={a.hipL.y} w={160} f={f} at={58} n={12} z={74} c={mxh(GOLD, 0.3)} rate={1.8} s={1.0} />
        <Puff x={HX} y={platTop + 26} f={f} at={58} c="#E4DCC8" z={58} n={10} s={1.2} up={0.2} />
      </>)}
      <ShopCrew f={f} v={v} />
      <TyreStack x={-40 + L.c} n={3} s={1.0} z={90} />
      <Toolbox x={W + 20 - L.c} y={H + 30} s={1.1} z={90} />
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
  const HX = 506 + L.a * 0.2, HS = 250;
  const a = anchors(HX, GY, HS);
  const LET = [14, 38, 62, 88];
  const FALL = 14;
  const order: Repo["part"][] = ["INTAKE", "HUD", "CORE", "TANK"];
  const land = LET.map((t) => t + FALL);
  const landed = land.filter((t) => f >= t).length;
  const impact = land.reduce((m, t) => { const d = f - t; return d >= 0 && d < 12 ? Math.max(m, Math.exp(-d / 3.6)) : m; }, 0);
  const base = [0.06, 0.22, 0.36, 0.5][Math.min(3, landed)];
  const kit: Kit = { intake: E(f, land[0], land[0] + 6, 0, 1, BACK), hud: E(f, land[1], land[1] + 6, 0, 1, BACK),
    core: E(f, land[2], land[2] + 6, 0, 1, BACK), tank: 0, coreLit: 1, gauge: 0.8, hudOn: 1 };
  /* ⛔ the four hooks were clustered within 160px of centre, so four cards drawn at once were an
     unreadable pile on the probe — the same defect the lift hook had. Spread them, and hold the
     ONE RULE the reel now uses everywhere: a repo is a CARD while it is in transit, and the
     HARDWARE it becomes before and after (feedback_hook_simplicity). */
  const HOX = [HX - 210, HX + 224, HX - 96, HX + 118];
  /* ⭐ v4 measured this hook at 3.58 (STATIC) against the house LIFT's 9.35: a locked camera and one
     250px part in flight repaint 8% of the panel. Same levers as the house hook: the camera TILTS
     with each falling part and settles after it lands, pushes in slowly to the cut, and the platform
     DIPS under each landing (weight is deformation). Each hook LOWERS 24px in the 8 frames before it
     lets go — the BEFORE of the event. */
  let trackY = 156;
  for (let i = 0; i < 4; i++) {
    const t0 = LET[i], t1 = land[i];
    if (f >= t0 && f < t1) trackY = 156 + 294 * E(f, t0, t1, 0, 1, IN_Q);
    else if (f >= t1 && f < t1 + 10) trackY = 450 - 294 * E(f, t1, t1 + 10, 0, 1, OUT);
  }
  const plat = 6 - 6 * impact;
  const camS = 1.10 + 0.08 * E(f, 0, dur, 0, 1, LIN);
  const camY = 470 + 0.16 * (trackY - 156) + 6 * impact;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.40}>
      <Cam {...punch(camS, HX, camY)} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={2} z={19} graphX={80} graphY={244} cols={12} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      <GhSign x={250} y={232} w={312} z={26} on={E(f, 2, 8, 0.35, 1, OUT)} f={f} />
      <Lift x={HX} y={GY} rise={plat} f={f} w={400} z={40} />
      {REPOS.map((r, i) => {
        const t0 = LET[i], t1 = land[i];
        const k = E(f, t0, t1, 0, 1, IN_Q);
        const gone = f >= t1;
        const target = i === 0 ? a.hipL : i === 1 ? a.shoulderR : i === 2 ? { x: HX, y: a.headTop } : a.back;
        const startY = 96 + i * 8 + Math.sin(f / 15 + i) * 3 + 24 * E(f, t0 - 8, t0, 0, 1, IO);
        const hx = HOX[i] + L.b * 0.2;
        const px = hx + (target.x - hx) * k, py = startY + 60 + (target.y - startY - 60) * k;
        return (
          <React.Fragment key={r.key}>
            <Chain x={hx} top={0} len={startY + (gone ? -30 * E(f, t1, t1 + 10, 0, 1, OUT) : 0)} z={60} swing={Math.sin(f / 13 + i) * 1.4} />
            <Hook x={hx} y={startY + (gone ? -30 * E(f, t1, t1 + 10, 0, 1, OUT) : 0)} z={61} swing={gone ? Math.sin((f - t1) / 3) * 8 * Math.exp(-(f - t1) / 12) : 0} />
            {/* ⭐ what falls on him is the REPO CARD, and it INSTALLS as it drops: the bar fills over
                the fall and stamps at the landing, where the hardware it carried pops on. */}
            {!gone && f >= t0 - 12 && (
              <RepoCard repo={r} x={px} y={py - 30} w={i === 0 ? 286 : 264} z={70} f={f}
                count={E(f, 2, Math.max(6, t0), 0.972, 1, OUT)} install={E(f, t0, t1, 0, 1, LIN)}
                open={E(f, t0 - 12, t0 - 4, 0, 1, OUT)} rot={k * 7 * (i % 2 ? 1 : -1)} />
            )}
            {/* before its turn it is still on the rack, as the hardware it will become */}
            {f < t0 - 8 && <HangPart repo={r} x={hx} y={startY + 46} size={168} z={66} f={f}
              swing={Math.sin(f / 13 + i) * 2.2} />}
          </React.Fragment>
        );
      })}
      <Contact x={HX} y={GY - 18 - 26 - plat + 22} w={HS * 0.8 + impact * 40} o={0.4} />
      <Rig f={f} x={HX} y={GY - 18 - plat - 26 + 20} size={HS} z={56} act={3} ph={0.3} kit={kit}
        strain={Math.min(1, base + impact * 0.62)} shock={impact > 0.5 ? 0.6 : 0} gaze={f > land[0] ? 0.3 : -0.4}
        stern={landed >= 2 ? 0.5 : 0} />
      {land.map((t, i) => (f >= t && f < t + 22 ? (
        <React.Fragment key={t}>
          <Ring x={HX} y={GY - 30} f={f} at={t} c={mxh(REPOS[i].c, 0.4)} z={58} s={1.6 + i * 0.3} dur={20} />
          <Puff x={HX} y={GY - 40} f={f} at={t} c="#E4DCC8" z={58} n={10 + i * 2} s={1.2} up={0.15} />
        </React.Fragment>
      ) : null))}
      {landed >= 2 && <Steam x={HX} y={GY - HS * 0.95} f={f} at={land[1]} n={6} z={74} s={1.0} c="#EDE7DC" />}
      <ShopCrew f={f} v={v} />
      <TyreStack x={-40 + L.c} n={3} s={1.0} z={90} />
      <Drum x={W + 10 - L.c} y={H + 40} s={1.1} z={90} c={dkh(GREEN, 0.1)} />
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
  const HS = 250;
  const slide = E(f, 0, 16, 0, 1, OUT);
  const HX = 40 + (506 - 40) * slide + L.a * 0.2;               /* f0: he is already half in frame at the left edge */
  const lurch = E(f, 16, 19, 0, 1, OUT) - E(f, 19, 26, 0, 1, OUT);
  const a = anchors(HX, GY - 22, HS);
  const START = [12, 30, 48, 84];
  const RUN = 14;
  const arrive = START.map((t) => t + RUN);
  const done = arrive.map((t) => f >= t + 4);
  const impact = arrive.reduce((m, t) => { const d = f - t - 4; return d >= 0 && d < 10 ? Math.max(m, Math.exp(-d / 3.2)) : m; }, 0);
  const kit: Kit = { intake: E(f, arrive[0] + 2, arrive[0] + 8, 0, 1, BACK), hud: E(f, arrive[1] + 2, arrive[1] + 8, 0, 1, BACK),
    core: E(f, arrive[2] + 2, arrive[2] + 8, 0, 1, BACK), tank: 0, coreLit: 1, gauge: 0.8, hudOn: 1 };
  /* ⭐ v4: 3.88 (STATIC) on a locked camera. The camera PANS with the dolly as he slides in (the whole
     set repaints ~4px/frame), JOLTS with the lurch, then pushes in slowly to the cut. Each runner drags
     a dust trail — an emitter on the moving part, one more repaint per run. */
  const camS = 1.10 + 0.10 * E(f, 16, dur, 0, 1, LIN);
  const camX = 488 + 60 * slide;
  const camY = 480 + 10 * lurch;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.40}>
      <Cam {...punch(camS, camX, camY)} z={12}>
      <Room p={p} f={f} bands={2} kind="rack" overhead="gantry" rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.8 * RAKE_K[v]}
        rakeN={RAKE_N[v]} floorKind="slab" grit={0.5} window={null} />
      <GhFitout p={p} f={f} seed={5} z={19} graphX={82} graphY={248} cols={12} />
      <ShopWall p={p} f={f} seed={0} bay={null} door pegX={560} pegW={400} />
      <GhSign x={254} y={236} w={312} z={26} on={E(f, 2, 8, 0.35, 1, OUT)} f={f} />
      {/* the empty hoists, hooks swinging: the repos have been taken down */}
      {REPOS.map((r, i) => (
        <React.Fragment key={r.key}>
          <Chain x={HOIST_X[i] + L.b * 0.2} top={0} len={HOIST_LEN[i] - 20} z={60} swing={Math.sin(f / 11 + i) * 3} />
          <Hook x={HOIST_X[i] + L.b * 0.2} y={HOIST_LEN[i] - 20} z={61} swing={Math.sin(f / 11 + i) * 6} />
        </React.Fragment>
      ))}
      <Lift x={506 + L.a * 0.2} y={GY} rise={6} f={f} w={400} z={40} />
      {/* the dolly he rides in on */}
      <div style={{ position: "absolute", left: HX - 150, top: GY - 44 + 5 * impact, width: 300, height: 22, zIndex: 50, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(IRON, 0.16)}, ${dkh(IRON, 0.36)})`, boxShadow: SH_D, transform: `rotate(${lurch * -2}deg)` }} />
      {[HX - 110, HX + 90].map((wx, i) => (
        <div key={i} style={{ position: "absolute", left: wx, top: GY - 30, width: 30, height: 30, zIndex: 51, borderRadius: "50%",
          background: `radial-gradient(circle, ${dkh(CHROME, 0.3)} 0 30%, #22201D 32%)`, transform: `rotate(${slide * 900}deg)` }}>
          <div style={{ position: "absolute", left: 13, top: 2, width: 4, height: 10, background: hexa("#FFFFFF", 0.3) }} />
        </div>
      ))}
      {slide < 1 && <Steam x={HX - 120} y={GY - 10} f={f} at={0} n={8} z={52} s={1.2} c="#CFC9BC" rate={1.6} />}
      <Contact x={HX} y={GY - 26} w={HS * 0.8} o={0.4} />
      <Rig f={f} x={HX} y={GY - 22 + 5 * impact} size={HS} z={56} act={3} ph={0.3} kit={kit} drive={lurch * 0.35} reach={40}
        strain={impact * 0.6} shock={lurch > 0.3 || impact > 0.5 ? 0.6 : 0} gaze={0.3} cheer={E(f, 66, 76, 0, 0.6, OUT)} />
      {/* the runners: each from its edge to the hero, carrying the part */}
      {REPOS.map((r, i) => {
        const t0 = START[i], t1 = arrive[i];
        if (f < t0) return null;
        const side = i % 2 === 0 ? -1 : 1;
        const k = E(f, t0, t1, 0, 1, OUT);
        const back = E(f, t1 + 6, t1 + 22, 0, 1, IN_Q);
        const fromX = side < 0 ? -140 : W + 140;
        const stopX = HX + side * 152;
        const rx = fromX + (stopX - fromX) * k + (fromX - stopX) * back;
        if (back >= 1) return null;
        const raise = E(f, t1, t1 + 4, 0, 1, OUT);
        return (
          <React.Fragment key={r.key}>
            <Crew f={f} x={rx} y={GY - 4} i={r.cos[0] + 2} size={176} z={66} at={t0 - 8} loop={0} tint={r.c} flip={side > 0} />
            {k < 1 && <Steam x={rx - side * 90} y={GY - 8} f={f} at={t0} n={6} z={64} s={1.1} c="#CFC9BC" rate={1.5} />}
            {back > 0 && <Steam x={rx + side * 90} y={GY - 8} f={f} at={t1 + 6} n={6} z={64} s={1.1} c="#CFC9BC" rate={1.5} />}
            {/* the runner is carrying the REPO, held up over the head, its install bar filling as he runs */}
            {f < t1 + 4 && (
              <RepoCard repo={r} x={rx - side * 6} y={GY - 4 - 176 * 0.9 - 56 - raise * 60} w={238} z={68} f={f}
                count={E(f, 2, Math.max(6, t0), 0.972, 1, OUT)} install={E(f, t0, t1 + 4, 0, 1, LIN)}
                rot={Math.sin(f / 3) * 5 * (1 - raise)} />
            )}
          </React.Fragment>
        );
      })}
      {arrive.map((t, i) => (f >= t + 4 && f < t + 26 ? (
        <React.Fragment key={t}>
          <Ring x={HX} y={GY - HS * 0.5} f={f} at={t + 4} c={mxh(REPOS[i].c, 0.4)} z={72} s={1.3} dur={18} />
          <Puff x={HX} y={GY - HS * 0.5} f={f} at={t + 4} c="#E4DCC8" z={72} n={8} s={1.0} up={0.2} />
        </React.Fragment>
      ) : null))}
      <ShopCrew f={f} v={v} y={H + 78} />
      <TyreStack x={-40 + L.c} n={3} s={1.0} z={90} />
      <Toolbox x={W + 20 - L.c} y={H + 30} s={1.1} z={90} />
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
