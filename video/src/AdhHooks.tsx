import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Contact, Edge, Ring, Puff, Steam, Fall, Pool,
  Crew, Hero, Forearm, Runner, asPlace, R, TASKS, GY, BAND_Y, SAFE3, SLATE,
  CLAY, GOLD, GREEN, RED, INK, BRASS, BONE, STEEL, SKY, VIOLET, TEAL, MUTE,
  TERM, TERM2, UISH, UISH2, DIFFG, DIFFR, CARET, OKGREEN, WARN, CREAM_TICKET,
} from "./AdhWorld";
import { Room } from "./HwSets";
import {
  SesFit, PaneWall, Pane, PromptRail, PaneStack, TodoList, TickPile, DoneChip, AnswerCard,
  CheckBox, ErrStack, Toast, Dev, MarkTile, StampTool, ClaimBoard,
} from "./AdhProps";
import { PASS, shotAt } from "./AdhScenes";
import type { Variant, Shot } from "./AdhScenes";

/* ===========================================================================
   REEL 136 · "ADHD" — THE HOOK CANDIDATES.  REV 2, THE SESSION.

   ⛔⛔ docs/THE-OPEN.md STEP 1: the first build step of a reel is not scene 0,
   it is N CONCEPTS for scene 0, each rendered at full quality on the real
   chassis with the real mascot and the real header, and one picked before the
   body is defended.

   ⛔⛔ AND THREE CUTS = THREE HOOKS, NOT THREE GRADES. Camera + contrast + rake
   + bed is a crop, a tone curve and a bed — nothing that HAPPENS is different,
   and a dHash passes the whole time because it measures PIXELS, NOT EVENTS. So
   each candidate below is a different one-word MECHANISM:

     wander   WANDER        a body leaves the row it is standing at   ⭐ PICKED
     spike    ACCUMULATION  rows tick themselves onto a pile, faster
     scorch   SPREAD        the panes fail left to right behind a grinning Claude

   ⛔⛔⛔ AND THE SAME WORK HAS TO BE DONE THREE TIMES. `PICKED` only drives the
   HOUSE cut; `adh-amber` runs `SPIKE_HOOK` and `adh-steel` runs `SCORCH_HOOK`,
   which are different components in this file. On rev 1 the house hook was
   rebuilt over four measured rounds while these two were never measured at all,
   and one of them was FAILING the frame-0 luma law
   (`feedback_three_cuts_three_hooks_fix_all_three`). All three carry the same
   three fixes: the lit SESSION BAR that buys the >=140 law, a 3-shot structure,
   and arrivals that run all the way to the cut.

   ⭐ THE COLUMN TEST, run before building: finish *"in all of these, the thing
   that happens is ___"*. It cannot be finished once for this column — a TRAVEL,
   an ACCUMULATION and a SPREAD are three different kinds of shot.
   ========================================================================= */

export type HookId = "wander" | "spike" | "scorch";

/* =========================================================================
   spike · LOAD — he is CARRYING the work he is stamping done.
   ⭐ A body against a load, built to the same template as `wander`: he is bowed
   under a tower of unstamped rows, and every time he stamps the top one the
   tower gets TALLER, not shorter. The blow costs, the tower jolts, a sheet
   slides, and at the cut he is still under it.
   ====================================================================== */
export const SPIKE_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const SLAMS = [22, 48, 70, 88, 104, 118];
  const near = SLAMS.reduce((acc, at) => (Math.abs(f - at) < Math.abs(f - acc) ? at : acc), SLAMS[0]);
  const up = E(f, near - 20, near - 7, 0, 1, IO);
  const drop = E(f, near - 7, near, 0, 1, IN_Q);
  const raised = Math.max(0, up - drop);
  const press = SLAMS.reduce((a2, at) => Math.max(a2, f >= at && f < at + 9 ? Math.exp(-(f - at) / 3.2) : 0), 0);
  const recoil = SLAMS.reduce((a2, at) => a2 + (f > at ? Math.sin((f - at) * 0.8) * Math.exp(-(f - at) / 5.5) * 6 : 0), 0);
  const jolt = SLAMS.reduce((a2, at) => Math.max(a2, f >= at ? Math.sin((f - at) * 0.9) * Math.exp(-(f - at) / 4.2) : 0), 0);
  /* ⭐ THE LOAD GROWS. Every blow adds two rows to what he is carrying. */
  const carried = 5 + SLAMS.filter((at) => f >= at).length * 2;
  const bow = 0.28 + carried * 0.028 + press * 0.4;      /* WEIGHT IS DEFORMATION */
  const sag = carried * 3.1 + press * 12;
  const done = 2 + SLAMS.filter((at) => f >= at).length;
  const devX = 316, size = 322;
  const stampX = 548, stampY = 356 - raised * 112 + drop * 50 + press * 10;
  const SHOT: Shot[] = [{ at: 0, s: 1.10, x: 0, y: 24 },
    { at: 58, s: 1.28, x: -140, y: 40 }, { at: 104, s: 1.06, x: 60, y: 16 }];
  const sh = shotAt(f, SHOT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.42}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.09} rakeRate={3.2}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={1 - E(f, 0, dur, 0, 0.5, LIN)} run={1} />
        <Runner y={276} f={f} z={11} rate={8.4} pitch={206} w={146} h={80}
          c={mxh(UISH, 0.10)} c2={dkh(SLATE, 0.16)} kind="crate" rail={false} />
        <Runner y={324} f={f} z={12} rate={-12.0} pitch={254} w={182} h={94}
          c={mxh(UISH2, 0.02)} c2={dkh(SLATE, 0.28)} kind="crate" rail={false} />
        <div style={{ position: "absolute", left: 356, top: 116, width: 520, height: GY - 116,
          zIndex: 16, opacity: 0.40, clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.56)} 0%, ${hexa(GOLD, 0.04)} 100%)` }} />
        <Pool x={616} y={GY - 54} w={560} c={GOLD} o={0.30} z={17} />
        <PaneWall f={f} z={20} y0={12} h={150} n={6} lit={[0, 3]} signLit={1} />
        <ClaimBoard x={616} y={382} w={424} h={372} z={60} f={f} done={done} jolt={jolt}
          big={`${done}/${R.tasks}`} />
        {/* ⭐ THE TOWER HE IS UNDER, and it keeps growing */}
        {Array.from({ length: carried }, (_, i) => (
          <div key={"cy" + i} style={{ position: "absolute",
            left: devX - 96 + (rnd(i * 3.7, 1) - 0.5) * 26 + sag * 0.12,
            top: GY - size - 30 - i * 21 + sag * 0.3,
            width: 192, height: 26, zIndex: 70 + i, borderRadius: 4,
            background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
            border: `2px solid ${hexa(INK, 0.2)}`, boxShadow: SH,
            transform: `rotate(${(rnd(i * 2.1, 1) - 0.5) * 7 + jolt * 1.6}deg)` }} />
        ))}
        {SLAMS.map((at) => f >= at && f < at + 16 ? (
          <React.Fragment key={"sk" + at}>
            <Puff x={616} y={404} f={f} at={at} c="#E8DCC0" z={80} n={10} s={0.9} />
            <Ring x={616} y={396} f={f} at={at} c={mxh(GOLD, 0.45)} z={80} s={0.75} dur={14} />
          </React.Fragment>
        ) : null)}
        <Forearm x0={devX + 112} y0={GY - size * 0.56 + sag * 0.2} x1={stampX} y1={stampY - 22}
          w={28} c={CLAY} z={84} />
        <StampTool x={stampX} y={stampY} s={1.28} z={86} rot={-6 + recoil} press={press} recoil={recoil * 0.1} />
        <Contact x={devX} y={GY - 6} w={200} o={0.36} z={44} />
        <Dev f={f} x={devX} y={GY + sag * 0.16} i={0} size={size} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} shock={bow} gaze={0.7} />
        <Steam x={devX} y={GY - size * 0.98} f={f} at={2} n={7} z={64} s={0.85} c="#D8CFC0" rate={1.4} />
        <PaneStack x={W - 30} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   scorch · BURIAL — the work falls on him faster than he can stamp it.
   ⭐ The third mechanism, and the only one where the load MOVES ON ITS OWN: rows
   rain down from the top of frame, pile round his feet, and he never looks up.
   By the cut he is buried to the chest and still stamping.
   ====================================================================== */
export const SCORCH_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const SLAMS = [20, 44, 64, 82, 98, 114];
  const near = SLAMS.reduce((acc, at) => (Math.abs(f - at) < Math.abs(f - acc) ? at : acc), SLAMS[0]);
  const up = E(f, near - 18, near - 6, 0, 1, IO);
  const drop = E(f, near - 6, near, 0, 1, IN_Q);
  const raised = Math.max(0, up - drop);
  const press = SLAMS.reduce((a2, at) => Math.max(a2, f >= at && f < at + 9 ? Math.exp(-(f - at) / 3.2) : 0), 0);
  const recoil = SLAMS.reduce((a2, at) => a2 + (f > at ? Math.sin((f - at) * 0.8) * Math.exp(-(f - at) / 5.5) * 6 : 0), 0);
  const jolt = SLAMS.reduce((a2, at) => Math.max(a2, f >= at ? Math.sin((f - at) * 0.9) * Math.exp(-(f - at) / 4.2) : 0), 0);
  const done = 2 + SLAMS.filter((at) => f >= at).length;
  /* ⭐ THE RAIN. 16 sheets on their own staggered clocks — stagger = cycle/slots */
  const RAIN = Array.from({ length: 16 }, (_, i) => 8 + i * 7);
  const buried = E(f, 20, dur, 0, 1, LIN);
  const devX = 330, size = 326;
  const stampX = 556, stampY = 352 - raised * 108 + drop * 48 + press * 10;
  const SHOT: Shot[] = [{ at: 0, s: 1.06, x: 0, y: 18 },
    { at: 56, s: 1.26, x: 120, y: -6 }, { at: 104, s: 1.04, x: -50, y: 30 }];
  const sh = shotAt(f, SHOT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.44}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.6}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={1 - E(f, 0, dur, 0, 0.62, LIN)} run={1} />
        <Runner y={268} f={f} z={11} rate={9.2} pitch={198} w={142} h={78}
          c={mxh(UISH, 0.10)} c2={dkh(SLATE, 0.16)} kind="crate" rail={false} />
        <div style={{ position: "absolute", left: 340, top: 112, width: 520, height: GY - 112,
          zIndex: 16, opacity: 0.40, clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.54)} 0%, ${hexa(GOLD, 0.04)} 100%)` }} />
        <Pool x={624} y={GY - 54} w={560} c={GOLD} o={0.30} z={17} />
        <PaneWall f={f} z={20} y0={12} h={152} n={6} lit={[2, 5]} signLit={1} />
        <ClaimBoard x={624} y={378} w={420} h={368} z={60} f={f} done={done} jolt={jolt}
          big={`${done}/${R.tasks}`} />
        {/* THE RAIN — each sheet on its own clock, falling to the pile */}
        {RAIN.map((at, i) => {
          const k = E(f, at, at + 30, 0, 1, IN_Q);
          if (k <= 0.001) return null;
          const rx = 120 + rnd(i * 5.3, 1) * 720;
          return (
            <div key={"rn" + i} style={{ position: "absolute", left: rx,
              top: -70 + k * (GY - 40 - rnd(i * 2.7, 1) * 90),
              width: 168, height: 34, zIndex: 74, borderRadius: 4,
              background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
              border: `2px solid ${hexa(INK, 0.2)}`, boxShadow: SH,
              transform: `rotate(${-30 + k * (52 + rnd(i * 1.9, 1) * 40)}deg)` }} />
          );
        })}
        {/* the pile he is standing in, rising */}
        <div style={{ position: "absolute", left: -40, right: -40, top: GY - 20 - buried * 130,
          height: 190, zIndex: 88, borderRadius: "40% 34% 0 0",
          background: `linear-gradient(180deg, ${UISH} 0%, ${UISH2} 40%, ${dkh(UISH2, 0.16)} 100%)`,
          border: `4px solid ${hexa(INK, 0.14)}` }} />
        {SLAMS.map((at) => f >= at && f < at + 16 ? (
          <React.Fragment key={"sc" + at}>
            <Puff x={624} y={398} f={f} at={at} c="#E8DCC0" z={80} n={10} s={0.9} />
            <Ring x={624} y={392} f={f} at={at} c={mxh(GOLD, 0.45)} z={80} s={0.75} dur={14} />
          </React.Fragment>
        ) : null)}
        <Forearm x0={devX + 114} y0={GY - size * 0.56} x1={stampX} y1={stampY - 22} w={28}
          c={CLAY} z={84} />
        <StampTool x={stampX} y={stampY} s={1.30} z={86} rot={-7 + recoil} press={press} recoil={recoil * 0.1} />
        <Contact x={devX} y={GY - 6} w={202} o={0.36} z={44} />
        {/* ⛔ HE NEVER LOOKS UP. Down at the board, stamping, the whole shot. */}
        <Dev f={f} x={devX} y={GY} i={0} size={size} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} gaze={0.4} shock={press * 0.5} />
        <PaneStack x={W - 36} y={H - 6} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/** the three candidates, keyed. ⭐ `wander` IS S0 itself, so the candidate that
    gets picked and the scene that ships are the same code and cannot drift. */
export const HOOKS: Record<HookId, React.FC<{ v: Variant; dur: number }>> = {
  wander: PASS,
  spike: SPIKE_HOOK,
  scorch: SCORCH_HOOK,
};

/** a standalone preview of one candidate, at full quality, for the pick.
    ⛔ LABEL IT WHEN SENDING: a solo hook comp has placeholder captions, a
    comp-length retention rail and NO audio by construction. And its frame-0
    luma reads ~13 LOWER than the same hook inside the reel, because it carries
    no header band — judge the >=140 law on the full cut, never on this. */
export const HookCut = (id: HookId): React.FC => () => {
  const C = HOOKS[id];
  return <C v="house" dur={135} />;
};
