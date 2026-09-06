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
  JobCan, TestRig, Conveyor, BayWall, DeskFit, Sweep, Gauge,
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

/* ═══════════════════════════════════════════════════════════════════════════
   ⛔⛔⛔ SCRAPPED AND REMADE. Alex: *"no this hook is horrible just scrap it
   completely and remake it again."*

   ⭐⭐⭐ AND FOUR REJECTIONS OF ONE HOOK IS **ONE** PROBLEM
   (`feedback_one_concept_four_costumes`): name the concept all of them shared
   before generating anything new. Mine shared it exactly:

       wander  a Claude at a workstation, ticking rows he did not do
       stamp   a Claude at a workstation, stamping rows he did not do
       cap     a Claude at a workstation, capping cans he did not test

   ⛔ THE SHARED CONCEPT IS: **a hero performing a repetitive falsifying action
   on a queue of objects.** Three costumes, one idea. Iterating inside it could
   never work, which is why four rounds of better drawing and more motion did
   not move the note.

   ⭐ THE COLUMN TEST for the three below — finish *"in all of these, the thing
   that happens is ___"*. It cannot be finished:
       a BODY DIVIDES · a SCREEN CONCEALS A ROOM · A SEALED THING IS EMPTY
   Three different KINDS of event. None is a repetitive action on a queue, none
   is an object being marked, and none of them has any paper in it.
   ═══════════════════════════════════════════════════════════════════════════ */

/* =========================================================================
   spike · **SPLIT** — one Claude becomes two, and only one of them works.
   ⭐ The most literal reading of "secretly getting distracted": at f0 there is
   ONE Claude at the rig. At f22 he SPLITS — a second Claude peels out of him,
   and while the first keeps working the second walks out of frame after the
   notification. The rig's lamp goes red behind the one who stayed, because one
   half of an agent is not enough to run anything.
   ⛔ It does not resolve: at the cut a THIRD is peeling away.
   ====================================================================== */
export const SPIKE_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const SPLIT1 = 22, SPLIT2 = 74, SPLIT3 = 118;
  const peel = (at: number) => E(f, at, at + 26, 0, 1, IO);
  const pop = (at: number) => (f >= at && f < at + 12
    ? Math.sin((f - at) / 12 * Math.PI) : 0);
  const p1 = peel(SPLIT1), p2 = peel(SPLIT2), p3 = peel(SPLIT3);
  const gone = p1 + p2;
  /* the one who stays gets THINNER as pieces leave — weight is deformation */
  const drain = 1 - (p1 * 0.10 + p2 * 0.10);
  const lamp = f > SPLIT1 + 10 ? 0 : 1;
  const toast = E(f, 8, 30, 1180, 690, OUT);
  const SHOT: Shot[] = [{ at: 0, s: 1.08, x: 0, y: 20 },
    { at: 62, s: 1.26, x: -110, y: 30 }, { at: 108, s: 1.04, x: 70, y: 14 }];
  const sh = shotAt(f, SHOT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.42}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.09} rakeRate={3.2}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={1 - E(f, 0, dur, 0, 0.5, LIN)} run={1} />
        <BayWall p={p} f={f} x={-20} y={150} cols={10} rows={2} z={16} seed={41} live={6} o={0.8} />
        <div style={{ position: "absolute", left: 340, top: 118, width: 520, height: GY - 118,
          zIndex: 16, opacity: 0.38, clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.54)} 0%, ${hexa(GOLD, 0.03)} 100%)` }} />
        <Pool x={600} y={GY - 54} w={560} c={GOLD} o={0.28} z={17} />
        <Conveyor y={GY - 74} f={f} z={40} x0={-80} w={1180} rate={2.4} s={1.0} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <JobCan key={"sj" + i} x={-40 + i * 210 + ((f * 2.4) % 210)} y={GY - 64} s={1.34}
            z={70 + i} hue={TASKS[i % 6].c} capped={0} proved={0}
            rot={Math.sin(f / 9 + i) * 2.4} f={f} seed={i} />
        ))}
        <TestRig x={772} y={GY - 44} s={1.06} z={58} f={f}
          clamp={0.3 + Math.abs(Math.sin(f / 12)) * 0.5}
          run={0.10 + Math.abs(Math.sin(f / 14)) * 0.34} verdict={lamp}
          lever={Math.abs(Math.sin(f / 19)) * 0.3} />

        {/* ⭐ THE ONE WHO STAYS — and he is visibly less than he was */}
        <Contact x={332} y={GY - 6} w={200} o={0.34} z={44} />
        <Dev f={f} x={332} y={GY} i={0} size={344 * drain} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} shock={pop(SPLIT1) * 0.6 + pop(SPLIT2) * 0.6} gaze={0.5} />

        {/* ⭐ THE ONES WHO PEEL OFF AND WALK OUT */}
        {[[SPLIT1, p1], [SPLIT2, p2], [SPLIT3, p3]].map(([at, k], i) =>
          (k as number) > 0.01 ? (
            <React.Fragment key={"pl" + i}>
              <Dev f={f} x={332 - (k as number) * (420 + i * 60)} y={GY - (k as number) * 6}
                i={i + 1} size={344 * (0.62 + (k as number) * 0.3)} z={64 + i} at={at as number}
                loop={0} extra={{ glasses: i % 2 }} gaze={-1.1} flip />
              <Ring x={332} y={GY - 150} f={f} at={at as number} c={mxh(CLAY, 0.4)} z={90}
                s={0.7} dur={16} />
              <Puff x={332} y={GY - 150} f={f} at={at as number} c="#F0D8C8" z={90} n={9} s={0.85} />
            </React.Fragment>
          ) : null)}

        <Toast x={toast} y={GY - 262} s={0.92} z={96} f={f} hue={SKY} />
        <Sweep k={E(f, SPLIT1, SPLIT1 + 16, 0, 1, IO)} y={230} h={380} c="#FFE8C8" z={80}
          w={230} o={0.42} />
        <DeskFit p={p} f={f} z={30} seed={2} side="r" lamp={1} mug={1} />
        <PaneStack x={W - 30} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   scorch · **THE FRONT** — a big green ALL-CLEAR board slides across the frame
   and hides a room that is on fire behind it.
   ⭐ A CONCEALMENT, not an action: the hero does nothing but hold the board
   steady and grin at camera. The event is the board SLIPPING — twice — and each
   time you see more of what is behind it, and each time he shoves it back.
   ⛔ It does not resolve: at the cut it is slipping again and he has stopped
   being able to hold it.
   ====================================================================== */
export const SCORCH_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const SLIP = [30, 68, 104];
  /* the board's own position: it slides on, then slips down, then is shoved back */
  const onK = E(f, 2, 20, 0, 1, OUT);
  /* ⛔ MEASURED 4 dead samples: between slips the board simply hung there. It
     now CREEPS down the whole time — he is losing it continuously and only
     catching it in jerks, which is a better story AND removes the flat spans. */
  const creep = E(f, 0, dur, 0, 0.30, LIN);
  const slip = creep + SLIP.reduce((a2, at) =>
    a2 + (E(f, at, at + 12, 0, 1, IN_Q) - E(f, at + 13, at + 24, 0, 1, OUT) * 0.86), 0);
  const finalSlip = E(f, 118, dur, 0, 1, IN_Q);
  const shown = Math.min(1, slip + finalSlip);
  const boardY = 250 + shown * 300;
  const shove = SLIP.reduce((a2, at) =>
    Math.max(a2, f >= at + 12 && f < at + 26 ? Math.exp(-(f - at - 12) / 4) : 0), 0);
  const chaos = E(f, 0, dur, 0.35, 1, LIN);
  const SHOT: Shot[] = [{ at: 0, s: 1.04, x: 0, y: 16 },
    { at: 60, s: 1.22, x: 120, y: -12 }, { at: 106, s: 1.02, x: -56, y: 28 }];
  const sh = shotAt(f, SHOT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.44}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.6}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={1 - chaos * 0.6} run={1} />
        <BayWall p={p} f={f} x={-20} y={150} cols={10} rows={3} z={16} seed={59} live={7} o={0.9} />

        {/* ⭐ WHAT IS BEHIND THE BOARD — five rigs, all with RED verdict lamps,
            cans jammed on a stalled belt, and the failures climbing */}
        <Conveyor y={GY - 74} f={f} z={40} x0={-80} w={1180} rate={0.25} s={1.0} />
        {[70, 300, 530, 760, 960].map((x, i) => (
          <TestRig key={"cr" + i} x={x} y={GY - 40} s={0.62} z={44 + i} f={f}
            clamp={0.9} run={0.06} verdict={0} lever={0.9} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <JobCan key={"cj" + i} x={40 + i * 158} y={GY - 62} s={1.06} z={66 + i}
            hue={TASKS[i % 6].c} capped={0} proved={0} rot={(i % 2 ? 9 : -8)} f={f} seed={i} />
        ))}
        {[0, 1, 2].map((i) => (
          <ErrStack key={"ce" + i} x={190 + i * 320} y={470} f={f} at={4 + i * 10}
            k={chaos} z={58 + i} n={15} s={1.15} />
        ))}

        {/* ⭐ THE FRONT — one enormous ALL CLEAR board, and it SLIPS */}
        {/* ⛔ 940px wide got cropped to "ALL CL" once the camera pushed in. The
            claim has to be READABLE — it is the whole hook. 772 fits inside the
            tightest of the three cuts' framings. */}
        <div style={{ position: "absolute", left: 506 - 386 + (1 - onK) * 1100, top: boardY - 186,
          width: 772, height: 372, zIndex: 86, borderRadius: 18,
          transform: `rotate(${shove * -2.5 + shown * 2}deg)`,
          background: `linear-gradient(178deg, ${mxh(OKGREEN, 0.34)} 0%, ${OKGREEN} 46%, ${dkh(OKGREEN, 0.26)} 100%)`,
          border: `10px solid ${dkh(OKGREEN, 0.44)}`, boxShadow: SH_D,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 34 }}>
          <div style={{ width: 104, height: 104, borderRadius: "50%", flexShrink: 0,
            background: hexa("#FFFFFF", 0.92), display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <svg width="62" height="62" viewBox="0 0 24 24">
              <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke={OKGREEN} strokeWidth={4}
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ ...ui(86, 900), color: "#FFFFFF", letterSpacing: 3 }}>ALL CLEAR</span>
          {/* the board's own bolts */}
          {[0, 1, 2, 3].map((i) => (
            <div key={"bb" + i} style={{ position: "absolute", left: i % 2 ? undefined : 22,
              right: i % 2 ? 22 : undefined, top: i < 2 ? 22 : undefined,
              bottom: i < 2 ? undefined : 22, width: 22, height: 22, borderRadius: "50%",
              background: `radial-gradient(circle at 34% 30%, ${hexa("#FFF", 0.5)}, ${hexa("#000", 0.4)})` }} />
          ))}
        </div>

        {/* he holds it up, grinning at camera, and never looks behind him */}
        <Contact x={306} y={GY - 6} w={206} o={0.36} z={90} />
        <Dev f={f} x={306} y={GY} i={0} size={352} z={92} at={-14} loop={2}
          extra={{ glasses: 1 }} gaze={0} cheer={E(f, 6, 20, 0, 1, BACK)}
          shock={shove * 0.55} />
        {SLIP.map((at) => (
          <React.Fragment key={"sv" + at}>
            <Ring x={506} y={boardY} f={f} at={at + 12} c={mxh(DIFFR, 0.4)} z={96} s={0.9} dur={16} />
            <Puff x={506} y={boardY} f={f} at={at + 12} c="#E8C8B8" z={96} n={9} s={0.9} />
          </React.Fragment>
        ))}
        <PaneStack x={W - 36} y={H - 6} n={6} z={98} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={97} kind="post" />
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
