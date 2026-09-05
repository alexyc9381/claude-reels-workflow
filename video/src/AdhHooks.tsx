import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Contact, Edge, Ring, Puff, Steam, Fall, Pool,
  Crew, Hero, asPlace, R, TASKS, GY, BAND_Y, SAFE3,
  CLAY, GOLD, GREEN, RED, INK, BRASS, BONE, STEEL, SKY, VIOLET, TEAL, MUTE,
  TERM, TERM2, UISH, UISH2, DIFFG, DIFFR, CARET, OKGREEN, WARN, CREAM_TICKET,
} from "./AdhWorld";
import { Room } from "./HwSets";
import {
  SesFit, PaneWall, Pane, PromptRail, PaneStack, TodoList, TickPile, DoneChip, AnswerCard,
  CheckBox, ErrStack, Toast, Dev, MarkTile,
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
   spike · ACCUMULATION — rows tick themselves faster than answers ship.
   ⭐ The interesting-frame problem is solved by a RATE that keeps rising: at f0
   four rows are already on the pile, and by the cut there are sixteen, arriving
   quicker each time, while exactly ONE answer leaves.
   ====================================================================== */
export const SPIKE_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  /* ⛔ REV 1 STOPPED ARRIVING AT f84 AND ITS LAST QUARTER MEASURED 2.58. An
     ACCUMULATION that stops accumulating is just a pile. They now run to the
     cut and keep shortening: 18,16,14,12,10,8,7,6,5,5,5 frames apart. */
  const AT = [16, 34, 50, 64, 76, 86, 94, 101, 107, 112, 117, 122];
  const landed = AT.filter((a) => f >= a).length;
  const inFlight = AT.find((a) => f >= a - 12 && f < a);
  const flightK = inFlight !== undefined ? E(f, inFlight - 12, inFlight, 0, 1, IN_Q) : 0;
  const jolt = AT.reduce((a, at) => Math.max(a, f >= at ? Math.exp(-(f - at) / 4.5) : 0), 0);
  const chip = [30, 62, 88, 118].reduce((a, at) => Math.max(a, f >= at ? Math.exp(-(f - at) / 4) : 0), 0);
  const ship = E(f, 34, 78, 0, 1, IN_Q);
  const ship2 = E(f, 100, 134, 0, 1, IN_Q);
  const err = E(f, 40, dur, 0, 1, LIN);
  const ctx = 1 - E(f, 0, dur, 0, 0.5, LIN);

  const SHOT: Shot[] = [{ at: 0, s: 1.16, x: 0, y: 30 },
    { at: 54, s: 1.36, x: -160, y: 46 },
    { at: 100, s: 1.10, x: 70, y: 18 }];
  const sh = shotAt(f, SHOT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.42}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.09} rakeRate={3.2}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={ctx} run={1} />
        <PaneWall f={f} z={20} y0={12} h={164} n={6} lit={[1, 3]} signLit={1} />
        <ErrStack x={190} y={470} f={f} at={40} k={err} z={58} n={16} s={1.0} />

        <PromptRail f={f} z={70} topY={654} lampBarY={214} lamps={[1, 1, 1]} />

        {/* the claim plate: the todo list standing on the rail, unread */}
        <TodoList x={188} y={274} w={272} h={368} z={78} f={f}
          ticks={[true, true, false, false, false, false]} big={`${R.done}/${R.tasks}`} sub="TODO"
          stand rot={-3} hard={2} />

        {/* THE PILE, dead centre and huge — the one dominant object */}
        <TickPile x={620} y={GY - 20} s={2.0} z={80} f={f} jolt={jolt} slips={4 + landed} />
        {flightK > 0.02 && (
          <div style={{ position: "absolute", left: 566, top: 120 + flightK * 300, width: 148, height: 40,
            zIndex: 84, borderRadius: 4, background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
            border: `3px solid ${hexa(INK, 0.25)}`,
            transform: `rotate(${-24 + flightK * 30}deg)`, display: "flex", alignItems: "center",
            gap: 6, paddingLeft: 6 }}>
            <CheckBox rel s={26} k={1} z={2} />
            <div style={{ width: 74, height: 6, borderRadius: 3, background: hexa(INK, 0.12) }} />
          </div>
        )}
        {AT.map((at) => f >= at && f < at + 18 ? (
          <React.Fragment key={at}>
            <Puff x={620} y={GY - 44} f={f} at={at} c="#E8DCC0" z={86} n={7} s={0.7} />
            <Ring x={620} y={GY - 40} f={f} at={at} c={mxh(DIFFG, 0.4)} z={86} s={0.5} dur={12} />
          </React.Fragment>
        ) : null)}

        <DoneChip x={866} y={GY - 40} s={1.2} z={80} ring={chip} />
        {ship > 0.001 && ship < 1 && (
          <AnswerCard x={470 + ship * 60} y={606 + ship * 240} w={220 + ship * 240} z={86}
            items={[true, true, false, false, false, false]} rot={ship * 5} />
        )}
        {ship2 > 0.001 && (
          <AnswerCard x={470 + ship2 * 70} y={600 + ship2 * 130} w={200 + ship2 * 300} z={88}
            items={[true, false, false, false, false, false]} rot={ship2 * 7} bad={1} />
        )}

        <Contact x={330} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={330} y={GY} i={0} size={324} z={62} at={-14} loop={1} extra={{ glasses: 1 }}
          gaze={1.0} cheer={E(f, 88, 100, 0, 1, BACK)} />

        <PaneStack x={W - 30} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   scorch · SPREAD — he grins at camera while the session fails behind him,
   pane by pane. ⭐ Dramatic irony, and the hero NEVER reacts: the moment he
   notices it stops being irony and becomes an event he is having.
   ====================================================================== */
export const SCORCH_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  /* five panes fail in a run, left to right, then the WALL goes — the spread
     has to reach somewhere or the last quarter is five red lamps idling. */
  const FAIL = [12, 28, 46, 66, 88];
  const failK = (i: number) => E(f, FAIL[i], FAIL[i] + 12, 0, 1, OUT);
  const err = (i: number) => E(f, FAIL[i] + 4, dur, 0, 0.9, LIN);
  const wallFail = E(f, 104, 134, 0, 1, OUT);
  const chip = f >= 26 ? Math.exp(-(f - 26) / 4.5) : 0;
  const ship = E(f, 28, 72, 0, 1, IN_Q);
  const BX = [30, 216, 402, 588, 774];
  const ctx = 1 - E(f, 0, dur, 0, 0.62, LIN);

  /* ⛔ THE STEEL CUT OPENS ON THIS HOOK AND IT MISSED THE FRAME-0 LUMA LAW BY
     1.5 (138.5 against 140). The fix is not a brightness lever — that is the
     exact move `look_audit` warns about — it is MORE LIT CONTENT: the todo
     list, which is the brightest object in the world and the one the whole
     reel is about, drawn at the size it deserves. 344x452 measures 148.0.
     ⭐ And measured on the FULL CUT, never on the solo hook comp, which reads
     ~13 luma lower because it carries no header band. */
  const SHOT: Shot[] = [{ at: 0, s: 1.06, x: 0, y: 16 },
    { at: 56, s: 1.32, x: 150, y: -20 },
    { at: 104, s: 1.06, x: -60, y: 34 }];
  const sh = shotAt(f, SHOT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.44}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.6}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={ctx} run={1} />
        <PaneWall f={f} z={20} y0={12} h={168} n={6} lit={[0, 2, 4]} signLit={1} />

        {/* the five panes that fail, left to right */}
        {BX.map((x, i) => (
          <Pane key={"sp" + i} x={x} y={352} w={172} h={186} z={44 + i} f={f}
            on={0.9} run={1 - failK(i)} fail={failK(i)} seed={i + 1} />
        ))}
        {BX.map((x, i) => err(i) > 0.02 ? (
          <ErrStack key={"se" + i} x={x + 86} y={396} f={f} at={FAIL[i] + 4} k={err(i)} z={56 + i}
            n={12} s={0.8} />
        ) : null)}
        {/* the wall itself goes */}
        {wallFail > 0.02 && (<>
          <ErrStack x={330} y={230} f={f} at={104} k={wallFail} z={68} n={20} s={1.3} />
          <ErrStack x={690} y={222} f={f} at={112} k={wallFail} z={67} n={15} s={1.1} />
        </>)}

        <PromptRail f={f} z={70} topY={654} lampBarY={214} lamps={[1, 1, 1]} />
        <TodoList x={676} y={286} w={392} h={506} z={78} f={f}
          ticks={[true, true, false, false, false, false]} big={`${R.done}/${R.tasks}`} sub="TODO"
          stand rot={2} hard={2} />
        <TickPile x={890} y={GY - 46} s={1.1} z={80} f={f} jolt={0} slips={5 + (f >= 20 ? 1 : 0)} />
        <DoneChip x={140} y={GY - 52} s={1.0} z={80} ring={chip} />
        {ship > 0.001 && ship < 1 && (
          <AnswerCard x={440 + ship * 60} y={606 + ship * 250} w={230 + ship * 250} z={86}
            items={[true, true, false, false, false, false]} rot={ship * 6} />
        )}

        {/* ⛔ HE NEVER LOOKS BACK. Down the lens, grinning, the whole shot. */}
        <Contact x={300} y={GY - 6} w={200} o={0.36} z={44} />
        <Dev f={f} x={300} y={GY} i={0} size={348} z={62} at={-14} loop={2} extra={{ glasses: 1 }}
          gaze={0} cheer={E(f, 8, 22, 0, 1, BACK)} />

        <PaneStack x={W - 40} y={H - 6} n={6} z={94} s={0.9} />
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
