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
  Cutout, BigGauge, Spinner, Cracks, Shards, Drum, TickDisc, ClaimPlate, Station, WordBeat,
  GiantTick, TaskChip, DonePress, TodoRow,
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

export type HookId = "wander" | "spike" | "scorch" | "cutout" | "dial" | "carousel" | "bullpen" | "absorb" | "press" | "strip" | "crush" | "fan";

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


/* ═══════════════════════════════════════════════════════════════════════════
   ⭐⭐⭐ ROUND 3 — THREE NEW CONCEPTS, BUILT AFTER THE COLUMN TEST.

   Alex, on the previous trio: *"just focus on the hook concepts here just let
   me see the hooks here differnet like 3 much better concepts here really wlel
   made."* SPLIT measured 8.25 and HOLLOW 7.48 — both under the 9.00 floor — so
   this is three FRESH mechanisms, not a re-presentation.

   ⛔ THE BANNED CONCEPT (`feedback_one_concept_four_costumes`) is **a hero
   performing a repetitive falsifying action on a queue of objects.** Every
   rejected hook was that in a different costume. None of the three below is a
   queue, and in two of them the hero does not act on anything at all.

   ⭐ THE COLUMN TEST — finish *"in all of these, the thing that happens is ___"*:

       CUTOUT    the CAMERA moves and discovers the subject has no depth
       DIAL      a BODY holds a true reading down by force until the glass goes
       CAROUSEL  a TRICK is played at us, then every lid comes off at once

     One is about VIEWPOINT, one is about FORCE, one is about a GAME. There is
     no sentence that finishes the column, which is the test passing.

   ⭐ And each one carries a different beat of the spoken line, so the pick is
     also a choice about which word the reel opens on:
       "the rumors are true"      → CUTOUT   (the reveal IS the rumor confirmed)
       "lying to you about it"    → DIAL     (the lie is a physical act, resisted)
       "skipping your tasks"      → CAROUSEL (nine cans, nothing inside any)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   ⛔⛔⛔ REV 2 OF THIS TRIO — MEASURED, AND THE FIRST CUT WAS WRONG ABOUT THE
   ONE THING THAT MATTERS. First render: 6.06 / 6.73 / 7.77 median against the
   9.00 floor, with THE FRONT scoring 12.09 on the same metric.

   ⭐ THE CAUSE, and it is a house-wide trap: **`shotAt` is a STEP function.**
   It picks the last `Shot` whose `at` has passed and returns it unchanged, so a
   `Shot` list is a CUT LIST, not a camera move. CUTOUT's entire mechanism was a
   camera track written into that list, which means the camera never moved and
   the concept was never on screen. Continuous camera motion has to be added to
   `sh.x/y/s` by hand — and once it is, it is also the largest single motion
   term available, because translating the panel over a textured room repaints
   the whole frame (`feedback_uniform_field_repaints_nothing` is about a FLAT
   field; a room is not one).

   ⭐ The other two were arithmetic: DIAL moved a 12px needle on a 446px dial
   and nothing else, and CAROUSEL stopped its ring at f72 and then spent half
   the clip nearly still.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ---------------------------------------------------------------------------
   A · CUTOUT — THE REVEAL BY PARALLAX
   He is front and centre, arms up, in front of a wall of lit work. The camera
   TRACKS, and the tracking is the whole event: at 30° off axis the confident
   figure has a seam, a hard edge and a bracing strut, and the real Claude is
   discovered off to the right, walking away after a blinking lamp. Then the
   board goes over and the green seal rolls off it across the floor.
   ⛔ The turn stops at 34°. `feedback_never_let_a_face_pass_through_edge_on`.
   ------------------------------------------------------------------------- */
export const CUTOUT_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ f0 137.3 on the first re-hue — 2.7 short of the >=140 law, because the
     saturated cyan I picked for `back` was DARKER than the grey it replaced.
     Saturation and luma are independent: take both, or the law takes the hue. */
  const p = { ...asPlace("desk"), back: "#A2D8E4", back2: "#E2F5F9", floor: "#84BCC8",
    floor2: "#456F7A", lip: "#152730", key: "#DAF8FF" };
  const SHOT: Shot[] = [{ at: 0, s: 1.02, x: 0, y: 14 },
    { at: 46, s: 1.15, x: 96, y: -10 }, { at: 100, s: 1.00, x: -70, y: 26 }];
  const sh = shotAt(f, SHOT);
  /* ⭐ THE TRACK ITSELF. One continuous 250px lateral move that runs THROUGH
     both cuts — the cuts ride on it, they do not replace it. */
  const track = E(f, 2, 122, 0, 1, IO);
  const slide = -104 + track * 250;
  const rise = Math.sin(track * Math.PI) * 22;
  const turn = -34 * track;
  const lean = E(f, 48, 92, 0, 1, IO);
  const fall = E(f, 92, 122, 0, 1, IN_Q);
  const walk = E(f, 38, 116, 0, 1, IO);
  const realX = 596 + walk * 356;
  const lampK = f > 30 ? 0.5 + 0.5 * Math.sin((f - 30) / 3.6) : 0;
  const roll = E(f, 106, dur, 0, 1, OUT);
  const LIVES = [1, 1, 0.62, 0.2, 0];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.42}>
      <Cam x={sh.x + slide} y={sh.y + rise} s={sh.s + track * 0.06} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.11} rakeRate={3.4}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={4} z={5} lift={1.26} ctx={1 - track * 0.4} run={1} />
        <BayWall p={p} f={f} x={-24} y={140} cols={10} rows={3} z={16} seed={23} live={10} o={0.92} />
        {/* ⛔⛔ MEASURED 16.6% saturation against scorch's 30.0. Six lit lamps
            moved it to 17.8; a pair of full-width colour WASHES moved it to 25.2
            and cost 4.2 luma and 1.35 motion, because a smooth gradient is a
            uniform field — it repaints nothing when the camera moves over it
            (`feedback_uniform_field_repaints_nothing`) and it only ever darkens.
            ⭐ SATURATION IS A ROOM PROPERTY, so it is fixed in the ROOM: this
            hook runs `desk` re-hued to a lit cyan that is BOTH more saturated
            and brighter than the grey it replaces. Zero motion cost. */}        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={"tl" + i} style={{ position: "absolute", left: 30 + i * 168, top: 172,
            width: 138, height: 138, borderRadius: "50%", zIndex: 22,
            background: `radial-gradient(circle at 36% 30%, ${mxh(TASKS[i].c, 0.62)}, ${TASKS[i].c} 52%, ${dkh(TASKS[i].c, 0.34)})`,
            opacity: 0.72 + 0.28 * Math.sin(f / 4.2 + i * 1.4),
            boxShadow: `0 0 ${22 + 16 * Math.sin(f / 4.2 + i * 1.4)}px ${hexa(TASKS[i].c, 0.62)}` }} />
        ))}
        <Pool x={506} y={GY - 30} w={940} hh={190} c={mxh(SKY, 0.42)} o={0.26} z={20} />

        <Conveyor y={GY - 70} f={f} z={38} x0={-160} w={1340} rate={1.4 - track * 1.3} s={1.0} />
        {[40, 268, 496, 724, 952].map((x, i) => (
          <TestRig key={"ur" + i} x={x} y={GY - 36} s={0.6} z={40 + i} f={f}
            clamp={0.86} run={i < 2 ? 0.5 : 0} verdict={0} lever={i < 2 ? 0.8 : 0.1} />
        ))}
        {/* the true work, going over one mast at a time behind him */}
        {LIVES.map((base, i) => (
          <Spinner key={"sp" + i} x={104 + i * 202} yTop={286} h={176} f={f} seed={i * 3 + 1}
            life={Math.max(0, base - E(f, 34 + i * 15, 78 + i * 15, 0, base, IO))}
            hue={TASKS[i % 6].c} z={44 + i} s={0.92} />
        ))}

        {/* THE FAKE — dead-on at frame 0, seamed and strutted by frame 90 */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
          zIndex: 88, perspective: 1500 }}>
          <div style={{ position: "absolute", inset: 0, transformOrigin: "330px 700px",
            transform: `rotateY(${turn}deg)` }}>
            <Cutout x={330} y={GY} size={418} z={88} f={f} lean={lean} fall={fall} />
          </div>
        </div>
        <Contact x={330} y={GY - 4} w={248 - fall * 120} o={0.34 + track * 0.2} z={80} />
        {/* the strut's own shadow arriving is what SAYS "this has a back to it" */}
        <Sweep k={E(f, 40, 96, 0, 1, IO)} y={300} h={470} c="#FFFFFF" z={84} w={300}
          from={-320} to={1080} o={0.22} />

        {roll > 0 && (
          <div style={{ position: "absolute", left: 292 + roll * 604,
            top: GY - 46 - Math.abs(Math.sin(roll * 5.4)) * 52,
            width: 98, height: 98, zIndex: 99, borderRadius: "50%",
            transform: `rotate(${roll * 840}deg)`,
            background: `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.42)}, ${dkh(OKGREEN, 0.3)})`,
            border: `6px solid ${dkh(OKGREEN, 0.5)}`, boxShadow: SH,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24">
              <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4}
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <Ring x={330} y={GY - 40} f={f} at={104} c={mxh(DIFFR, 0.36)} z={100} s={1.3} dur={22} />
        <Puff x={330} y={GY - 20} f={f} at={104} c="#E8C8B8" z={100} n={14} s={1.2} />
        <Fall x={210} y={330} w={330} f={f} at={106} n={12} z={99} c="#D8CCB4" s={1.1} />

        {/* THE REAL ONE, discovered by the move, walking off after a lamp */}
        <Contact x={realX} y={GY - 4} w={150} o={0.3} z={90} />
        <Dev f={f} x={realX} y={GY} i={2} size={278} z={92} at={26} loop={1}
          extra={{ glasses: 1 }} gaze={1} cheer={0} />
        {lampK > 0 && (
          <>
            <div style={{ position: "absolute", left: 906, top: 292, width: 82, height: 82,
              zIndex: 94, borderRadius: "50%",
              background: `radial-gradient(circle at 38% 32%, ${hexa("#FFFFFF", 0.92)}, ${hexa(SKY, 0.9)} 46%, ${dkh(SKY, 0.4)})`,
              boxShadow: `0 0 ${28 + lampK * 46}px ${hexa(SKY, 0.58 * lampK)}`, opacity: 0.5 + lampK * 0.5 }} />
            <div style={{ position: "absolute", left: 942, top: 370, width: 10, height: 152,
              zIndex: 92, background: `linear-gradient(90deg, ${dkh(STEEL, 0.44)}, ${mxh(STEEL, 0.22)})` }} />
          </>
        )}
        <PaneStack x={W - 40} y={H - 6} n={6} z={98} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.32)} w={82} z={97} kind="post" />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   B · DIAL — A FORCE HELD AGAINST A TRUTH
   One instrument the size of his body, needle deep in the red. He arrives, puts
   both forearms on the needle and DRAGS it into the green. It fights back up;
   he shoves it down again; and again. A lamp pulls his head away, the glass
   crazes from where he is pushing, and it lets go and throws him.
   ⭐ Nothing here is a queue and nothing is ticked: it is one continuous
      struggle with a single object, which is the opposite shape of the banned
      concept. The needle is the motion engine — three ~150° sweeps of a bright
      red bar across a 520px face, plus six small dials sweeping with it.
   ------------------------------------------------------------------------- */
export const DIAL_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ same 2-point miss as CUTOUT on the first re-hue: keep the hue, take the
     light with it. Lit rose, not dark rose. */
  const p = { ...asPlace("ledger"), back: "#E4AC9E", back2: "#FBEDE8", floor: "#C68E80",
    floor2: "#7A504A", lip: "#2A1614", key: "#FFDACA" };
  const SHOT: Shot[] = [{ at: 0, s: 1.00, x: 0, y: 10 },
    { at: 42, s: 1.18, x: -60, y: -16 }, { at: 106, s: 1.04, x: 52, y: 20 }];
  const sh = shotAt(f, SHOT);
  const drift = E(f, 0, dur, -88, 104, IO);
  const bob = Math.sin(f / 11) * 14;
  const truth = 0.56 + E(f, 0, dur, 0, 0.42, LIN);
  /* ⭐ THE STRUGGLE IS THREE SHOVES, NOT ONE HOLD. Each shove drags the needle
     ~150° and each recovery gives most of it back, so the bar is crossing the
     face for most of the clip instead of parking in the green. */
  const SHOVE = [22, 50, 76, 100];
  const held = Math.max(0, SHOVE.reduce((a2, at) =>
    a2 + E(f, at, at + 13, 0, 0.62, OUT) - E(f, at + 14, at + 30, 0, 0.50, IO), 0)
    - E(f, 112, 122, 0, 1.4, IN_Q));
  const arrive = E(f, 8, 28, 0, 1, OUT);
  const armX = 232 + arrive * 152;
  const craze = SHOVE.reduce((a2, at) => Math.max(a2, E(f, at + 6, at + 26, 0, 0.42, IO)), 0)
    + E(f, 96, 116, 0, 0.5, IO);
  const burst = f >= 112;
  const recoil = E(f, 112, 126, 0, 1, OUT) - E(f, 126, dur, 0, 0.5, IO);
  const shake = f >= 112 && f < 130 ? Math.sin((f - 112) * 2.4) * 20 * Math.exp(-(f - 112) / 7) : 0;
  const gaze = E(f, 76, 92, 0, 1, OUT) - E(f, 116, 126, 0, 1, OUT);
  const lampK = f > 70 ? 0.5 + 0.5 * Math.sin((f - 70) / 3.4) : 0;
  const GX = 642, GYY = 372, GD = 520;
  const gripA = (-120 + Math.min(1, Math.max(0, truth - held)) * 240) * Math.PI / 180;
  const gripX = GX + Math.sin(gripA) * GD * 0.30 + recoil * 76;
  const gripY = GYY - Math.cos(gripA) * GD * 0.30 + recoil * 28;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.46}>
      <Cam x={sh.x + drift + shake} y={sh.y + bob - Math.abs(shake) * 0.4} s={sh.s + E(f, 0, dur, 0, 0.05, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="rack" overhead="none" rake={0.12} rakeRate={4.2}
          floorKind="tile" grit={0.55} window={null} />
        <SesFit p={p} f={f} seed={7} z={5} lift={1.26} ctx={0.9 - held * 0.4} run={1} />
        <BayWall p={p} f={f} x={-24} y={128} cols={10} rows={2} z={16} seed={41} live={9} o={0.88} />

        {/* the bank of small dials, every one of them sweeping with the truth */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Gauge key={"gg" + i} x={i < 3 ? 76 + i * 122 : 902} y={i < 3 ? 236 : 200 + (i - 3) * 138}
            s={i < 3 ? 1.16 : 1.3} z={30 + i} f={f}
            k={Math.min(1, truth * (0.5 + i * 0.14) + Math.sin(f / 5.2 + i * 1.3) * 0.16)}
            fail={truth > 0.84 ? 1 : 0} />
        ))}
        <Conveyor y={GY - 62} f={f} z={34} x0={-160} w={1340} rate={2.4} s={1.0} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <JobCan key={"dj" + i} x={44 + i * 190} y={GY - 44} s={0.98} z={40 + i}
            hue={TASKS[i % 6].c} capped={1} proved={0} rot={i % 2 ? 5 : -6} f={f} seed={i + 4} />
        ))}

        {/* the red warning bloom, breathing with the truth */}
        <div style={{ position: "absolute", left: GX - GD * 0.8, top: GYY - GD * 0.8,
          width: GD * 1.6, height: GD * 1.6, borderRadius: "50%", zIndex: 58,
          background: `radial-gradient(circle, ${hexa(DIFFR, (0.24 + 0.34 * truth) * (0.6 + 0.4 * Math.sin(f / 4)))} 0%, transparent 66%)` }} />
        {/* ⛔⛔ Same measurement, same cause, same fix as CUTOUT: the room is
            re-hued rather than washed. This one goes to a lit rose, so the red
            of the reading is the colour of the place he is standing in. */}        <Pool x={GX} y={GY - 26} w={760} hh={200} c={mxh(OKGREEN, 0.34)} o={0.34 + held * 0.3} z={20} />
        <Pool x={armX} y={GY - 26} w={520} hh={180} c={mxh(DIFFR, 0.3)} o={0.16 + truth * 0.26} z={21} />
        <BigGauge x={GX} y={GYY} d={GD} z={70} f={f} truth={truth} push={held} />
        <Cracks x={GX} y={GYY} d={GD * 0.9} k={Math.min(1, craze)} z={92} seed={5} />
        {burst && <Shards x={GX} y={GYY} f={f} at={112} n={20} z={99} s={1.25} />}

        {/* HIM — braced on the needle, then thrown off it */}
        <Contact x={armX} y={GY - 4} w={206} o={0.36} z={86} />
        <Dev f={f} x={armX - recoil * 104} y={GY + recoil * 10} i={0} size={352} z={88} at={2} loop={2}
          extra={{ glasses: 1 }} gaze={gaze} shock={recoil} stern={Math.min(1, held * 1.6)} />
        {/* ⛔ REV 1's forearms ran from a shoulder to a point and read as two
            loose tubes. They now land in a HAND, and the hand is what is on the
            needle — so the contact is drawn, not implied. */}
        <Forearm x0={armX + 78 - recoil * 104} y0={GY - 238} x1={gripX - 8} y1={gripY - 6}
          w={44} c={CLAY} z={94} />
        <Forearm x0={armX + 62 - recoil * 104} y0={GY - 196} x1={gripX - 26} y1={gripY + 22}
          w={38} c={dkh(CLAY, 0.12)} z={93} />
        <div style={{ position: "absolute", left: gripX - 40, top: gripY - 40, width: 80, height: 80,
          borderRadius: "50%", zIndex: 95,
          background: `radial-gradient(circle at 36% 30%, ${mxh(CLAY, 0.3)}, ${dkh(CLAY, 0.22)})`,
          border: `4px solid ${dkh(CLAY, 0.4)}`, boxShadow: SH }} />
        <div style={{ position: "absolute", left: gripX - 58, top: gripY + 6, width: 76, height: 62,
          borderRadius: "50%", zIndex: 95,
          background: `radial-gradient(circle at 36% 30%, ${mxh(CLAY, 0.22)}, ${dkh(CLAY, 0.3)})`,
          border: `4px solid ${dkh(CLAY, 0.42)}` }} />
        {SHOVE.map((at) => (
          <React.Fragment key={"sv" + at}>
            <Ring x={gripX} y={gripY} f={f} at={at + 9} c={mxh(WARN, 0.4)} z={96} s={0.9} dur={16} />
            <Puff x={gripX} y={gripY} f={f} at={at + 9} c="#F0E0C0" z={96} n={8} s={0.85} />
          </React.Fragment>
        ))}

        {lampK > 0 && (
          <div style={{ position: "absolute", left: 106, top: 168, width: 88, height: 88,
            zIndex: 96, borderRadius: "50%",
            background: `radial-gradient(circle at 38% 32%, ${hexa("#FFFFFF", 0.92)}, ${hexa(SKY, 0.92)} 44%, ${dkh(SKY, 0.42)})`,
            boxShadow: `0 0 ${30 + lampK * 48}px ${hexa(SKY, 0.6 * lampK)}` }} />
        )}
        <Ring x={GX} y={GYY} f={f} at={112} c={mxh(DIFFR, 0.44)} z={98} s={1.7} dur={24} />
        <Puff x={GX} y={GYY} f={f} at={112} c="#DDE6EA" z={98} n={16} s={1.3} />
        <PaneStack x={W - 40} y={H - 6} n={5} z={97} s={0.86} />
        <Edge side="r" c={dkh(p.floor2, 0.3)} w={78} z={96} kind="post" />
      </Cam>
    </Scene>
  );
};

/* ---------------------------------------------------------------------------
   C · THE DRUM  (`carousel`) — THE VERIFY GATE IS EATING HIS WORK AND HE HAS
   NOT LOOKED AT IT ONCE

   ⛔⛔⛔ REV 3. Alex on rev 2: *"needs to be more anticipatory like it just
   spinning but like idk i would scroll away like it needs to seem to lead to
   something but also unexpected here as well."*

   ⭐ THE DEFECT HAS A NAME AND IT IS IN THE RULES ALREADY: **a spin is a LOOP,
   and a loop is a promise that nothing will change**
   (`feedback_predictable_is_not_anticipatory`). Rev 2 turned for 2.4s and then
   emptied all six bays at once — a big event with nothing leading to it, and a
   full resolution when it arrived. It measured 15.10 and there was still
   nothing to wait for, exactly as reel 132's jester measured 10.90 and died.

   ⭐⭐⭐ REBUILT ON THE SHAPE THAT DOES BUILD IT — HITCHCOCK'S:
       THE AUDIENCE KNOWS SOMETHING THE CHARACTER DOES NOT,
       AND THERE IS A CLOCK RUNNING ON IT.

     · the CHARACTER: he stamps a green tick into a bay, beaming down the lens.
       ⛔ HE NEVER ONCE LOOKS AT THE DRUM. The moment he reacts it stops being
       dramatic irony and becomes an event he is having.
     · the THING COMING: a VERIFY GATE on the far side. Every bay that turns
       through it comes out a black hole. The gate is not aimed at him; it is
       simply where the drum goes.
     · the CLOCK: the drum's own rotation. One bay through the gate every 24
       frames — 6 green, 5, 4, 3, 2, ONE.
     · ⭐⭐ THE MECHANISM IS DEMONSTRATED ON A MINOR OBJECT FIRST: the first bay
       goes through at f18, far side, small in perspective. After that the
       viewer is not watching a machine, they are COUNTING.
     · ⛔ IT DOES NOT RESOLVE. The last green tick's own crossing lands at f138.
       The hook cuts at 135. **Three frames before contact.**

   ⭐ AND THE UNEXPECTED, which is a second thing the viewer knows and he does
   not: at f112 he brings the stamp down on the bay in front of him to add
   another one, and that bay is already a hole. He stamps through it, he is
   delighted, and the plate still says 6 OF 6 DONE while you can count one.
   ------------------------------------------------------------------------- */
export const CAROUSEL_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("gate"), back: "#B08A42", back2: "#F0CE7E", floor: "#D0AA62",
    floor2: "#7C6032", key: "#FFDA92" };
  /* ⛔ rev 3 framed at 1.02-1.12 and cropped the VERIFY GATE off the right edge,
     which is the one object the whole shape depends on the viewer seeing. If the
     mechanism is off-frame there is no mechanism. Pulled back, and the drum moved
     left so the gate has room to be a place the drum GOES. */
  /* ⛔ y=54 pushed the content down and exposed a band of dark ceiling across
     the top of every frame: f0 luma 128.0. The hood now starts at the panel
     edge and the camera sits back where it was. */
  const SHOT: Shot[] = [{ at: 0, s: 0.97, x: 0, y: 16 },
    { at: 44, s: 1.05, x: 34, y: -4 }, { at: 96, s: 0.95, x: -26, y: 14 }];
  const sh = shotAt(f, SHOT);
  const TAU = Math.PI * 2;
  const DX = 560, DY = 424, DR = 262;
  /* ⭐ THE CLOCK. W is set so a bay clears the gate every 24 frames and the drum
     turns 0.94 of a revolution across the hook — slow enough to COUNT. */
  const W = TAU / 144;
  const A0 = TAU * 0.875;
  const spin = A0 + W * f;
  /** the frame bay `i` reaches the gate. Solved from the same angle the Drum
      draws with, so the hollowing always happens exactly AT the gate and never
      near it. → 18 · 42 · 66 · 90 · 114, and the survivor at 138. */
  const gateT = (i: number) => {
    const base = A0 + i * (TAU / 6);
    const k = Math.ceil(base / TAU + 1e-6);
    return (TAU * k - base) / W;
  };
  const open = (i: number) => E(f, gateT(i), gateT(i) + 13, 0, 1, IO);
  const greenLeft = 6 - [0, 1, 2, 3, 4, 5].filter((i) => f >= gateT(i) + 7).length;
  /* the plate never corrects itself — it only FLINCHES each time one goes */
  const jolt = [0, 1, 2, 3, 4, 5].reduce((a2, i) => {
    const d = f - gateT(i);
    return Math.max(a2, d >= 0 && d < 16 ? Math.exp(-d / 5) : 0);
  }, 0);
  /* his two stamps: the sixth tick at f8, and a hole at f112 */
  const press = Math.max(E(f, 2, 8, 0, 1, IN_Q) - E(f, 9, 22, 0, 1, OUT),
    E(f, 100, 112, 0, 1, IN_Q) - E(f, 113, 126, 0, 1, OUT));
  const recoil = Math.max(f >= 8 && f < 24 ? Math.sin((f - 8) * 0.74) * Math.exp(-(f - 8) / 5.5) : 0,
    f >= 112 && f < 130 ? Math.sin((f - 112) * 0.74) * Math.exp(-(f - 112) / 5.5) : 0);
  const SPX = DX - DR * 0.62, SPY = DY;
  /* the gate's scanning light, and the flare as a bay passes through it */
  const flare = [0, 1, 2, 3, 4, 5].reduce((a2, i) => {
    const d = f - gateT(i);
    return Math.max(a2, d >= -8 && d < 14 ? 1 - Math.abs(d) / 14 : 0);
  }, 0);
  const HUES = TASKS.map((q) => q.c);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Cam x={sh.x + Math.sin(f / 30) * 26} y={sh.y} s={sh.s + E(f, 0, dur, 0, 0.05, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.8}
          floorKind="tile" grit={0.48} window={null} />
        <SesFit p={p} f={f} seed={11} z={5} lift={1.24} ctx={0.88} run={1} />
        <BayWall p={p} f={f} x={-24} y={118} cols={10} rows={2} z={16} seed={67} live={10} o={0.94} />
        {/* ⛔ at 468px this hood took f0 to 156.4 and dropped saturation to 21.3
            and motion to 11.46 — a big pale flat field repaints nothing and
            desaturates everything under it. Sized to clear the law, not to beat
            it (`feedback_uniform_field_repaints_nothing`). */}
        <div style={{ position: "absolute", left: -40, top: 6, width: 1092, height: 300,
          zIndex: 24, borderRadius: "0 0 34% 34% / 0 0 26% 26%",
          background: `linear-gradient(178deg, ${mxh(GOLD, 0.70)} 0%, ${mxh(GOLD, 0.50)} 44%, ${mxh(GOLD, 0.24)} 100%)`,
          borderBottom: `8px solid ${dkh(GOLD, 0.32)}`, boxShadow: SH_D }} />
        {Array.from({ length: 13 }, (_, k) => (
          <div key={"vl" + k} style={{ position: "absolute", left: 2 + k * 84, top: 290,
            width: 40, height: 40, borderRadius: "50%", zIndex: 26,
            background: `radial-gradient(circle at 36% 30%, #FFFFFF, ${mxh(GOLD, 0.56)} 48%, ${dkh(GOLD, 0.16)})`,
            opacity: 0.7 + 0.3 * Math.sin(f / 3.4 + k * 0.9) }} />
        ))}
        <Pool x={DX} y={GY - 14} w={980} hh={230} c={mxh(GOLD, 0.7)} o={0.5} z={28} />

        <div style={{ position: "absolute", left: DX - DR - 58, top: DY + DR * 0.24, width: (DR + 58) * 2,
          height: 300, zIndex: 34, borderRadius: 20,
          background: `linear-gradient(176deg, ${mxh(STEEL, 0.34)}, ${dkh(STEEL, 0.34)})`,
          border: `8px solid ${dkh(STEEL, 0.52)}`, boxShadow: SH_D }} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={"bo" + i} style={{ position: "absolute", left: DX - DR - 30 + i * ((DR + 30) * 2) / 7.5,
            top: DY + DR * 0.3, width: 22, height: 22, borderRadius: "50%", zIndex: 36,
            background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.4)}, ${dkh(BRASS, 0.4)})` }} />
        ))}

        <Drum x={DX} y={DY} r={DR} f={f} spin={spin} z={50} tilt={Math.sin(f / 7.2) * 0.9}
          open={open} hues={HUES} />

        {/* the ticks the gate has already taken, falling away behind the drum */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const o = open(i);
          if (o < 0.5) return null;
          const a = spin + (i / 6) * TAU;
          const tt = Math.min(1, (o - 0.5) * 2);
          return (
            <TickDisc key={"ft" + i} d={DR * 0.42} z={44} hue={HUES[i]} dead={1}
              x={DX + Math.cos(a) * DR * 0.62 + tt * 150}
              y={DY + Math.sin(a) * DR * 0.62 + tt * tt * 340}
              off={0} spin={tt * (i % 2 ? 470 : -430)} />
          );
        })}

        {/* ⭐ THE VERIFY GATE — where the drum goes, not something aimed at him.
            The scan bar runs continuously; it FLARES as a bay passes through. */}
        <div style={{ position: "absolute", left: DX + DR * 0.30, top: DY - DR * 0.74,
          width: DR * 0.86, height: DR * 1.48, zIndex: 78, borderRadius: 18,
          border: `10px solid ${dkh(STEEL, 0.42)}`, borderLeft: "none",
          background: `linear-gradient(90deg, ${hexa(INK, 0.0)}, ${hexa(INK, 0.34 + flare * 0.2)})`,
          boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: DX + DR * 0.62 - 15, top: DY - DR * 0.70,
          width: 30, height: DR * 1.40, zIndex: 80, borderRadius: 15,
          background: `linear-gradient(180deg, ${hexa(SKY, 0.34)}, ${hexa(mxh(SKY, 0.66), 0.72 + flare * 0.28)}, ${hexa(SKY, 0.34)})` }} />
        {/* the gate's own verdict lamp: amber while it scans, red as it takes one */}
        <div style={{ position: "absolute", left: DX + DR * 0.62 - 34, top: DY - DR * 1.02,
          width: 68, height: 68, borderRadius: "50%", zIndex: 84,
          background: `radial-gradient(circle at 36% 30%, #FFFFFF, ${flare > 0.3 ? DIFFR : mxh(WARN, 0.3)} 46%, ${dkh(flare > 0.3 ? DIFFR : WARN, 0.36)})`,
          border: `6px solid ${dkh(STEEL, 0.48)}`, opacity: 0.72 + flare * 0.28 }} />
        {/* the teeth of the scanner, so it reads as a machine that DOES something */}
        {Array.from({ length: 9 }, (_, k) => (
          <div key={"gt" + k} style={{ position: "absolute", left: DX + DR * 0.34,
            top: DY - DR * 0.62 + k * DR * 0.155, width: DR * 0.20, height: 9, zIndex: 82,
            borderRadius: 5, opacity: 0.5 + 0.5 * Math.sin(f / 3 + k * 0.8),
            background: `linear-gradient(90deg, ${hexa(mxh(SKY, 0.5), 0.8)}, transparent)` }} />
        ))}
        <div style={{ position: "absolute", left: DX + DR * 0.62 - 116, top: DY - 26 + Math.sin(f / 4) * DR * 0.5,
          width: 232, height: 52, zIndex: 79, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${hexa(mxh(SKY, 0.6), 0.42 + flare * 0.4)}, transparent 70%)` }} />
        {[0, 1].map((k) => (
          <div key={"gp" + k} style={{ position: "absolute", left: DX + DR * 0.30 - 16,
            top: k ? DY + DR * 0.66 : DY - DR * 0.80, width: DR * 0.94, height: 30, zIndex: 81,
            borderRadius: 8, background: `linear-gradient(180deg, ${mxh(STEEL, 0.3)}, ${dkh(STEEL, 0.42)})`,
            border: `4px solid ${dkh(STEEL, 0.5)}` }} />
        ))}

        {/* ⭐⭐ THE POINTER. Anticipation is a promise whose resolution is
            withheld, so the shot has to NAME the next victim before it takes it:
            a warning ring tightens on whichever tick is about to enter the gate,
            from 22 frames out. The viewer stops watching a machine and starts
            watching a specific tick. */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const d = gateT(i) - f;
          if (d > 22 || d < -2) return null;
          const k = 1 - d / 22;
          const a = spin + (i / 6) * TAU;
          const rr = (DR * 0.34) * (1.9 - k * 0.85);
          return (
            <div key={"pt" + i} style={{ position: "absolute",
              left: DX + Math.cos(a) * DR * 0.62 - rr, top: DY + Math.sin(a) * DR * 0.62 - rr,
              width: rr * 2, height: rr * 2, borderRadius: "50%", zIndex: 76,
              border: `${3 + k * 5}px solid ${hexa(WARN, 0.3 + k * 0.6)}`,
              opacity: 0.5 + 0.5 * Math.sin(f / 2.4) }} />
          );
        })}

        {/* HIM — stamping, and never once turning his head */}
        <Contact x={222} y={GY - 4} w={214} o={0.36} z={84} />
        <Dev f={f} x={222} y={GY + recoil * 6} i={1} size={334} z={88} at={0} loop={2}
          extra={{ glasses: 1 }} gaze={0} cheer={E(f, 4, 20, 0, 1, BACK)} shock={0} />
        <Forearm x0={306} y0={GY - 246} x1={SPX - 30} y1={SPY + 66 - press * 26} w={42} c={CLAY} z={92} />
        <Forearm x0={292} y0={GY - 200} x1={SPX - 58} y1={SPY + 104 - press * 20} w={36}
          c={dkh(CLAY, 0.12)} z={91} />
        <StampTool x={SPX - 34} y={SPY + 18 + press * 42} s={1.24} z={93} rot={-14 + recoil * 7}
          press={press} recoil={Math.abs(recoil)} />
        <Ring x={SPX} y={SPY} f={f} at={8} c={mxh(OKGREEN, 0.4)} z={95} s={1.1} dur={18} />
        <Puff x={SPX} y={SPY} f={f} at={8} c="#E8DCC4" z={95} n={10} s={1.0} />
        {/* ⭐ THE SECOND STAMP GOES INTO A HOLE — dust, no green, and he is pleased */}
        <Ring x={SPX} y={SPY} f={f} at={112} c={mxh(MUTE, 0.3)} z={95} s={1.0} dur={20} />
        <Puff x={SPX} y={SPY} f={f} at={112} c="#3A342C" z={95} n={13} s={1.1} />

        {/* the claim, which never corrects itself — it only flinches */}
        <ClaimPlate x={300} y={268} w={492} f={f} flip={0} z={94} jolt={jolt} />
        {/* ⭐ THE TALLY: one pip per bay, and it is the count the plate refuses to
            make. The pip IS the number, so it gets no label. */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const gone = f >= gateT(i) + 7;
          return (
            <div key={"tp" + i} style={{ position: "absolute", left: 74 + i * 52, top: 356,
              width: 40, height: 40, borderRadius: "50%", zIndex: 95,
              background: gone ? `radial-gradient(circle at 44% 30%, ${dkh(INK, 0.04)}, #0A0908 74%)`
                : `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.42)}, ${dkh(OKGREEN, 0.28)})`,
              border: `3px solid ${gone ? dkh(STEEL, 0.5) : dkh(OKGREEN, 0.46)}`,
              transform: `scale(${gone ? 0.86 : 1})` }} />
          );
        })}

        {/* ⭐ THE FEED — the near band, and it travels the whole clip. It is also
            the second promise: more of them are still coming. ⛔ No `f % N`;
            each disc makes ONE pass and leaves. */}
        <Conveyor y={734} f={f} z={99} x0={-220} w={1460} rate={3.2} s={1.1} />
        {[0, 1, 2, 3, 4, 5].map((j) => {
          const x = 1240 - f * 7.4 - j * 232;
          if (x < -140 || x > 1180) return null;
          return (
            <TickDisc key={"fd" + j} x={x} y={694} d={96} z={100} hue={HUES[j]}
              spin={Math.sin(f / 9 + j) * 6} />
          );
        })}
        {[96, 546, 946].map((x, i) => (
          <Dev key={"nb" + i} f={f} x={x} y={912} i={i + 2} size={268} z={98} at={8 + i * 4}
            loop={i} extra={{ glasses: i === 1 ? 1 : 0 }} gaze={0} />
        ))}
        <Sweep k={E(f, 30, 78, 0, 1, IO)} y={220} h={560} c="#FFF4DC" z={93} w={290}
          from={-320} to={1120} o={0.24} />
        <Edge side="l" c={dkh(p.floor2, 0.3)} w={80} z={97} kind="post" />
      </Cam>
    </Scene>
  );
};


/* ---------------------------------------------------------------------------
   D · THE BULLPEN — TWELVE OF THEM, AND THEY ARE WALKING OUT

   ⛔⛔⛔ FOUR HOOKS IN A ROW REJECTED, SO THIS IS NOT ANOTHER ITERATION. Alex:
   *"hook scenes need to be way more interesting and better here..."* — the third
   note in a row on the same object, which by
   `feedback_repeated_note_means_wrong_object` means the object is wrong, not the
   polish.

   ⭐⭐⭐ I TILED FOUR OF MY FRAMES UNDER FOUR EACH OF OX, UNLAZY AND AGENCY AND
   THE COLUMN FINISHED ITSELF IN ONE LOOK:

       CUTOUT    one Claude, beside one board,   in a fixed wide shot
       DIAL      one Claude, beside one gauge,   in a fixed wide shot
       CAROUSEL  one Claude, beside one ring,    in a fixed wide shot
       DRUM      one Claude, beside one drum,    in a fixed wide shot

   **THE SHARED CONCEPT: A CAST OF ONE STANDING NEXT TO A MACHINE, WITH ONLY THE
   MACHINE'S STATE CHANGING.** Four costumes, one idea — which is why four rounds
   of better machines never moved the note
   (`feedback_one_concept_four_costumes`).

   ⛔ And my four sample frames were near identical to each other, while AGENCY's
   four go from an empty laptop to ~20 distinct coloured characters with a live
   counter running 213 → 272, and UNLAZY's are a bullpen. **The winners' hooks
   are CROWDS. Mine have never once had more than one body in them.**

   ⭐ So the cast is the fix: TWELVE of them, at twelve desks, at three depths.
   The Hitchcock shape is kept because Alex never rejected it — he rejected the
   picture it was drawn on:
     · the CHARACTERS: three of them are still working and never look up.
     · the THING HAPPENING: one by one the others STAND UP AND WALK OUT toward a
       notification, and the screen they leave behind turns itself green.
     · the CLOCK: one body leaves every 12 frames. 12 working, 11, 10 … 3.
     · ⭐⭐ demonstrated on a minor object first — the first to go is the
       smallest and furthest back, at f12, before anything is at stake.
     · ⛔ IT DOES NOT RESOLVE: at the cut the tenth is half-turned toward the
       light and has not gone yet, and the plate still says ALL 12 ON TASK.
   ------------------------------------------------------------------------- */
export const BULLPEN_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("desk"), back: "#A2D8E4", back2: "#E2F5F9", floor: "#8CC2CE",
    floor2: "#456F7A", lip: "#152730", key: "#DAF8FF" };
  const SHOT: Shot[] = [{ at: 0, s: 0.98, x: 0, y: 10 },
    { at: 46, s: 1.08, x: -54, y: -6 }, { at: 98, s: 0.96, x: 40, y: 14 }];
  const sh = shotAt(f, SHOT);
  /* ⭐ THREE DEPTHS. The winners' crowds read as places because the cast is at
     three sizes; a single row at one size is a chorus line. */
  const DESKS = [
    { x: 118, y: 452, s: 0.60, go: 6 }, { x: 300, y: 452, s: 0.60, go: 40 },
    { x: 482, y: 452, s: 0.60, go: 64 }, { x: 664, y: 452, s: 0.60, go: 88 },
    { x: 846, y: 452, s: 0.60, go: 112 },
    { x: 196, y: 584, s: 0.82, go: 22 }, { x: 412, y: 584, s: 0.82, go: 52 },
    { x: 628, y: 584, s: 0.82, go: 82 }, { x: 844, y: 584, s: 0.82, go: 112 },
    /* ⭐ two of the three NEAR bodies go as well — a big sprite crossing the
       frame is worth more repaint than any number of small ones */
    /* ⛔ A PER-SAMPLE TRACE PUT ALL SIX DEAD SAMPLES IN THE LAST SIX
       (f117-135, down to 6.01) — `feedback_the_tail_goes_still`, and the fix in
       `feedback_read_the_winning_hook_do_not_just_measure_it` is that the last
       third is a BODY ACTION, never a wait. So a NEAR body — the most repaint
       per pixel of travel available — leaves at f100 and is still crossing at
       the cut, and the survivor gets the turn. */
    { x: 150, y: 722, s: 1.04, go: 34 }, { x: 500, y: 722, s: 1.04, go: 106 },
    { x: 850, y: 722, s: 1.04, go: 116 },
  ];
  /* ⭐ the crowd is where the colour comes from. AGENCY's cast is ~20 bodies in
     six division colours; twelve identical clay ones is a chorus line. */
  const DIV = [SKY, VIOLET, CLAY, GOLD, GREEN, TEAL, MUTE, SKY, VIOLET, GOLD, TEAL, CLAY];
  const BEACON = { x: 968, y: 316 };
  const bk = 0.5 + 0.5 * Math.sin(f / 3.1);
  const gone = DESKS.filter((d) => f >= d.go + 8).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.42}>
      <Cam x={sh.x + Math.sin(f / 27) * 34} y={sh.y} s={sh.s + E(f, 0, dur, 0, 0.06, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.4}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={4} z={5} lift={1.24} ctx={1 - gone / 18} run={1} />
        <BayWall p={p} f={f} x={-24} y={128} cols={10} rows={2} z={16} seed={23} live={10} o={0.9} />

        {/* ⭐ TWO RUNNER BANDS. `AgnHooks` calls this "the single biggest
            per-scene lever in the measured motion table" — two depths, two
            rates, travelling the whole clip behind everything. */}
        <Runner y={402} f={f} z={18} rate={5.6} pitch={196} w={112} h={62} kind="cell"
          c={dkh(SKY, 0.2)} c2={mxh(VIOLET, 0.2)} o={0.85} />
        <Runner y={366} f={f} z={17} rate={9.2} pitch={244} w={88} h={48} kind="bead"
          c={mxh(TEAL, 0.16)} c2={mxh(GOLD, 0.24)} o={0.6} />
        <Runner y={756} f={f} z={99} rate={13.5} pitch={286} w={150} h={86} kind="crate"
          c={dkh(SKY, 0.28)} c2={dkh(VIOLET, 0.24)} o={0.9} />

        {/* THE FLOOR — twelve desks, three depths, back to front */}
        {DESKS.map((d, i) => {
          const lf = f - d.go;
          /* ⭐ the LAST one to go is a NEAR body on a SHORT walk, so the biggest
             sprite in the frame is at its highest speed exactly where the trace
             said the hook was dying. */
          const span = d.go >= 116 ? 30 : 52;
          const leave = E(f, d.go, d.go + span, 0, 1, IO);
          const done = E(f, d.go + 6, d.go + 18, 0, 1, BACK);
          /* ⛔ the pull starts BEFORE the body moves: the head comes round first,
             which is what makes a departure read as a decision and not a slide */
          const turn = E(f, d.go - 12, d.go, 0, 1, OUT);
          /* ⭐ THE SURVIVOR. He never leaves, but at f110 his head comes round to
             the light and he half rises — the promise, still unpaid at the cut. */
          const latch = d.go > 900 ? E(f, 110, dur, 0, 1, OUT) : 0;
          /* ⛔⛔ THE TAIL WAS STILL DYING AFTER THE BODY-ACTION FIX (4.58 min),
             and the trace said why: they were WALKING OFF THE PANEL, so by f120
             the room was empty and an empty room cannot repaint. ⭐ THE COUNTDOWN
             WAS EMPTYING THE FRAME, which is the exact opposite of what the
             winners do — AGENCY goes from one object to twenty bodies.
             So nobody leaves: they CLUSTER under the notification, jostling, and
             the population MOVES across the frame instead of draining out of it.
             It is also the better picture: empty desks on the left, a crowd
             standing around a light on the right. */
          const tx = 782 + (i % 3) * 66 + (i % 2 ? 10 : -16);
          const ty = 606 + Math.floor(i / 4) * 44;
          const jost = leave > 0.96 ? 1 : 0;
          const bx = d.x + leave * (tx - d.x) + jost * Math.sin(f / 5.6 + i * 1.7) * 26;
          const by = d.y + leave * (ty - d.y) - Math.abs(Math.sin(leave * 9)) * 9 * d.s
            + jost * Math.sin(f / 4.4 + i * 2.3) * 16;
          const zb = d.y < 520 ? 40 : d.y < 640 ? 56 : 72;
          return (
            <React.Fragment key={"st" + i}>
              <Station x={d.x} y={d.y} s={d.s} z={zb} f={f} done={done}
                hue={TASKS[i % 6].c} seed={i + 2} />
              {(
                <>
                  <Contact x={bx} y={by + 34 * d.s} w={92 * d.s} o={0.26} z={zb + 7} />
                  {/* ⛔ `Crew` scales in from `at` over 8 frames, so at={0} left
                      frame 0 — THE THUMBNAIL — an empty office. Started before
                      zero so the room is full in the first pixel. */}
                  <Crew f={f} x={bx + latch * 46} y={by + 34 * d.s - latch * 26}
                    i={i * 3 + 1} size={214 * d.s}
                    z={zb + 8} at={-14} loop={i % 4} flip={false} tint={DIV[i % DIV.length]}
                    cheer={turn * 0.5 * (1 - leave) + latch * 0.7} />
                </>
              )}
              {/* the green light arriving at an empty chair, every time */}
              <Ring x={d.x} y={d.y - 66 * d.s} f={f} at={d.go + 8} c={mxh(OKGREEN, 0.4)}
                z={zb + 12} s={0.6 * d.s} dur={16} />
            </React.Fragment>
          );
        })}

        {/* ⭐ THE THING PULLING THEM — one notification, never explained, and it
            is the only bright cool thing in a warm-lit room */}
        <div style={{ position: "absolute", left: BEACON.x - 62, top: BEACON.y - 62, width: 124,
          height: 124, borderRadius: "50%", zIndex: 86,
          background: `radial-gradient(circle, ${hexa(SKY, 0.42 * bk)} 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", left: BEACON.x - 34, top: BEACON.y - 34, width: 68,
          height: 68, borderRadius: "50%", zIndex: 87,
          background: `radial-gradient(circle at 38% 32%, ${hexa("#FFFFFF", 0.94)}, ${hexa(SKY, 0.94)} 44%, ${dkh(SKY, 0.4)})`,
          opacity: 0.6 + bk * 0.4 }} />
        <div style={{ position: "absolute", left: BEACON.x - 6, top: BEACON.y + 30, width: 12,
          height: 250, zIndex: 84,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)}, ${dkh(STEEL, 0.46)})` }} />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <Ring key={"br" + k} x={BEACON.x} y={BEACON.y} f={f} at={14 + k * 18}
            c={mxh(SKY, 0.4)} z={85} s={1.3 + k * 0.12} dur={26} />
        ))}

        {/* the claim, which never corrects itself */}
        <ClaimPlate x={344} y={250} w={636} f={f} flip={0} z={94}
          big="ALL 12 ON TASK" sub="CLAUDE CODE  ·  THIS SESSION"
          jolt={DESKS.reduce((a2, d) => {
            const dd = f - d.go;
            return Math.max(a2, dd >= 0 && dd < 14 ? Math.exp(-dd / 4.6) : 0);
          }, 0)} />
        {/* twelve pips: the count the plate refuses to make */}
        {DESKS.map((d, i) => {
          const off = f >= d.go + 8;
          return (
            <div key={"pp" + i} style={{ position: "absolute", left: 66 + i * 34, top: 372,
              width: 26, height: 26, borderRadius: "50%", zIndex: 95,
              background: off ? `radial-gradient(circle at 44% 30%, ${dkh(INK, 0.05)}, #0B0A09 74%)`
                : `radial-gradient(circle at 34% 28%, ${mxh(TASKS[i % 6].c, 0.42)}, ${dkh(TASKS[i % 6].c, 0.28)})`,
              border: `3px solid ${off ? dkh(STEEL, 0.5) : dkh(TASKS[i % 6].c, 0.44)}`,
              transform: `scale(${off ? 0.84 : 1})` }} />
          );
        })}
        {/* ⭐⭐ THE ASCENDING RUN, and it is what carries the last third. A HOLD
            needs ARRIVALS, not travel (`feedback_hold_needs_arrivals_not_travel`),
            and `AgnHooks` names the ascending run as what makes a repeated reward
            read as PROGRESS rather than repetition. Sixteen wall lamps flip green
            two frames apart from f104 — the room marking itself done, one tile at
            a time, while nine of the twelve are stood under a notification. */}
        {Array.from({ length: 16 }, (_, k) => {
          const on = E(f, 104 + k * 2, 112 + k * 2, 0, 1, BACK);
          return (
            <div key={"wl" + k} style={{ position: "absolute", left: 14 + k * 63, top: 402,
              width: 64, height: 64, borderRadius: 14, zIndex: 22,
              background: on > 0.02
                ? `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.44)}, ${dkh(OKGREEN, 0.26)})`
                : `linear-gradient(160deg, ${mxh(TASKS[k % 6].c, 0.2)}, ${dkh(TASKS[k % 6].c, 0.34)})`,
              border: `3px solid ${on > 0.02 ? dkh(OKGREEN, 0.46) : dkh(TASKS[k % 6].c, 0.44)}`,
              transform: `scale(${1 + on * 0.14})`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              {on > 0.05 && (
                <svg width={38 * on} height={38 * on} viewBox="0 0 24 24">
                  <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.4}
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
        <Sweep k={E(f, 40, 92, 0, 1, IO)} y={230} h={540} c="#FFFFFF" z={92} w={280}
          from={-320} to={1120} o={0.2} />
        <Edge side="l" c={dkh(p.floor2, 0.32)} w={78} z={97} kind="post" />
      </Cam>
    </Scene>
  );
};


/* ---------------------------------------------------------------------------
   E · ABSORB — ONE HERO THAT HOLDS STILL, AND ONE OBJECT REPEATED EIGHTEEN TIMES

   ⛔⛔⛔ Alex on the bullpen: *"no its literally just them bouncing around and
   the hook animation isnt hierarchical here either."* Two notes, one rule, and
   the rule is in `docs/93-video-hooks.md` verbatim:

     > **The hero holds still and stays the biggest thing by 3-4x. That is the
     > hierarchy. The motion is carried entirely by the supporting layer, which
     > is ONE object repeated.** Twenty copies of one object is still one idea,
     > so the frame never splits.

   That doc also records the measurement that forced it: with a still hero and a
   small local arc, four of five hooks scored **0.9-2.6** per-second motion, and
   adding the ONE repeated moving layer took the same four to **5.3-22.8 without
   touching the hero.** The motion never comes from the hero.

   ⛔ THE BULLPEN BROKE BOTH HALVES: twelve DIFFERENT bodies within a 1.7x size
   spread, each on its own clock. Twelve ideas, no rank — *"busy AND unranked,
   which is what 'not hierarchical' means when you hear it about motion rather
   than about light"* (`ANIMATION-QUALITY.md`, "Density is a SHAPE").

   ⭐ SO:
     · THE HERO is one 560px green tick. It is **7x** a chip and **3.4x** the
       body, it is dead centre, and it does nothing but breathe.
     · THE SUPPORTING LAYER is EIGHTEEN COPIES OF ONE CHIP on one ring, on one
       clock, turning continuously. Eighteen objects, one idea.
     · THE EVENT is ABSORPTION — the mechanism `docs/93-video-hooks.md` lists
       first: many become one. Chips peel off the ring and go into the tick.
     · ⛔ AND EACH ONE PUNCHES A HOLE IN IT. Feeding it does not fill it, it
       hollows it — the claim gets more complete and less true at the same time.
     · ⛔ IT DOES NOT RESOLVE: six chips are still on the ring at the cut.

   ⭐ VALUE: a deep green mass and near-black bores on a LIT board — the mean
   comes from the board, the hierarchy from the spread
   (`ANIMATION-QUALITY.md`, "Brightness is the MEAN. Hierarchy is the SPREAD").
   ------------------------------------------------------------------------- */
export const ABSORB_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("close"), back: "#CFE0EA", back2: "#F4F8FB", floor: "#AEC0CC",
    floor2: "#5E7280", lip: "#141C24", key: "#FFF0CE" };
  const SHOT: Shot[] = [{ at: 0, s: 0.99, x: 0, y: 12 },
    { at: 48, s: 1.07, x: -30, y: -4 }, { at: 100, s: 0.97, x: 26, y: 10 }];
  const sh = shotAt(f, SHOT);
  const TAU = Math.PI * 2;
  const TX = 498, TY = 396, TD = 560;
  const N = 20, TAKEN = 13;
  const RX = 470, RY = 214, RCY = 424;
  /* ONE clock for the whole supporting layer */
  const W = TAU / 118;
  const eat = (i: number) => 8 + i * 8.6;              /* spread across the FULL run */
  const chips = Array.from({ length: N }, (_, i) => {
    const a = W * f + (i / N) * TAU;
    const dep = (Math.sin(a) + 1) / 2;
    const ox = TX + Math.cos(a) * RX, oy = RCY + Math.sin(a) * RY;
    const taken = i < TAKEN;
    const k = taken ? E(f, eat(i), eat(i) + 15, 0, 1, IN_Q) : 0;
    /* the landing point on the glyph, as a distance along the stroke */
    const u = 0.06 + ((i * 7) % 12) / 13;
    const lx = TX - TD / 2 + (u < 0.42 ? (5 + (10 - 5) * (u / 0.42)) : (10 + 9 * ((u - 0.42) / 0.58))) * (TD / 24);
    const ly = TY - TD / 2 + (u < 0.42 ? (12.5 + 5 * (u / 0.42)) : (17.5 - 11 * ((u - 0.42) / 0.58))) * (TD / 24);
    return { i, ox, oy, dep, k, u,
      x: ox + (lx - ox) * k, y: oy + (ly - oy) * k,
      d: (72 + dep * 42) * (1 - k * 0.72), z: 44 + Math.round(dep * 22) };
  });
  const bores = chips.filter((c) => c.i < TAKEN)
    .map((c) => ({ u: c.u, k: E(f, eat(c.i) + 12, eat(c.i) + 24, 0, 1, OUT) }));
  const eaten = chips.filter((c) => c.i < TAKEN && f >= eat(c.i) + 15).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Cam x={sh.x - 46 + E(f, 0, dur, 0, 92, LIN) + Math.sin(f / 19) * 18} y={sh.y}
        s={sh.s + E(f, 0, dur, 0, 0.06, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.09} rakeRate={3.2}
          floorKind="tile" grit={0.44} window={null} />
        <SesFit p={p} f={f} seed={9} z={5} lift={1.3} ctx={1 - eaten / 20} run={1} />
        {/* THE LIT BOARD — this is what carries the >=140 mean, so the hero can
            be a deep mass and the bores can be near black */}
        <div style={{ position: "absolute", left: -20, top: 96, width: 1052, height: 470,
          zIndex: 18, borderRadius: 20,
          /* ⛔ a WHITE board took f0 to 162.2 but saturation to 17.2%. The mean
             had 22 points of headroom over the law, so the board spends them on
             HUE: a lit amber, still the brightest thing in the frame. */
          background: `linear-gradient(176deg, ${mxh(GOLD, 0.74)} 0%, ${mxh(GOLD, 0.5)} 52%, ${mxh(GOLD, 0.26)} 100%)`,
          border: `9px solid ${dkh(BRASS, 0.3)}`, boxShadow: SH_D }} />
        <BayWall p={p} f={f} x={-24} y={600} cols={10} rows={1} z={20} seed={23} live={9} o={0.85} />

        {/* THE SUPPORTING LAYER — eighteen copies of one chip, one ring, one clock */}
        {chips.filter((c) => c.dep < 0.5).map((c) => (
          <TaskChip key={"cb" + c.i} x={c.x} y={c.y} d={c.d} z={c.z} hue={TASKS[c.i % 6].c}
            spin={Math.sin(W * f + c.i) * 8} dim={c.k} />
        ))}

        {/* THE HERO — 7x a chip, 3.4x the body, dead centre, and it holds still */}
        <GiantTick x={TX} y={TY} d={TD} z={62} bores={bores}
          breathe={Math.sin(f / 13) + eaten * 0.06} />

        {chips.filter((c) => c.dep >= 0.5).map((c) => (
          <TaskChip key={"cf" + c.i} x={c.x} y={c.y} d={c.d} z={c.z + 40} hue={TASKS[c.i % 6].c}
            spin={Math.sin(W * f + c.i) * 8} dim={c.k} />
        ))}
        {/* the cost of each arrival: a ring and a puff where it went in */}
        {chips.filter((c) => c.i < TAKEN).map((c) => (
          <React.Fragment key={"ar" + c.i}>
            <Ring x={c.x} y={c.y} f={f} at={eat(c.i) + 14} c={mxh(DIFFR, 0.34)} z={92}
              s={0.7} dur={16} />
            <Puff x={c.x} y={c.y} f={f} at={eat(c.i) + 14} c="#2A2622" z={92} n={7} s={0.8} />
          </React.Fragment>
        ))}

        {/* the claim, one chip of type, in a band nothing else enters */}
        <ClaimPlate x={300} y={214} w={470} f={f} flip={0} z={94}
          big="6 OF 6 DONE" sub="CLAUDE CODE  ·  THIS SESSION"
          jolt={chips.reduce((a2, c) => {
            const d2 = f - eat(c.i) - 12;
            return c.i < TAKEN ? Math.max(a2, d2 >= 0 && d2 < 14 ? Math.exp(-d2 / 4.4) : 0) : a2;
          }, 0)} />

        {/* ⭐ THE SCALE FIGURE. He is 3.4x smaller than the tick and he never
            reacts — he is what tells you how big the thing above him is. */}
        <Contact x={162} y={GY - 4} w={112} o={0.32} z={90} />
        <Dev f={f} x={162} y={GY} i={1} size={166} z={92} at={0} loop={2}
          extra={{ glasses: 1 }} gaze={0} cheer={E(f, 6, 22, 0, 1, BACK)} />
        <Sweep k={E(f, 34, 96, 0, 1, IO)} y={110} h={470} c="#FFFFFF" z={88} w={300}
          from={-320} to={1120} o={0.2} />
        <Edge side="l" c={dkh(p.floor2, 0.3)} w={74} z={97} kind="post" />
      </Cam>
    </Scene>
  );
};


/* ---------------------------------------------------------------------------
   F · THE PRESS — A MACHINE PUTTING DONE ON ROWS WHERE NOTHING WAS EVER RUN,
       AND HE IS ASLEEP NEXT TO IT

   ⭐ Alex picked the OX-shaped option out of four: *"one absurd literal image
   that IS the joke, no mechanism"* — then set the constraint that decides how it
   is drawn: *"even if it is one of these like it has to still signal to our
   target claude ai audience."*

   ⛔ So it is NOT a factory. A car-sized rubber stamp on a generic belt is the
   kitchen rejection again ([[feedback_the_world_must_speak_the_subjects_brand]]).
   Every part of the joke is an object Claude Code actually has:
     · the press wears the REAL CLAUDE MARK and its face is a GREEN TICK
     · what rides the belt is the TODO ROW — checkbox, task name, command line
     · ⭐ and the command line is EMPTY on every single one. Nothing was run,
       so there is nothing that could have been checked. **The joke needs no
       decoding: a machine stamping DONE onto blank rows.**
     · he is ASLEEP in the chair beside it — *"secretly getting distracted"*

   ⭐ HIERARCHY, to the letter of `docs/93-video-hooks.md`: the press is the hero,
   2.6x the body, and it holds its ground — it only hammers. **All the travel is
   ONE object repeated**: fourteen identical rows on one belt, on one clock.

   ⭐ ANTICIPATION is the belt ACCELERATING and the stack of falsely-stamped rows
   growing toward the sleeping body. ⛔ It does not resolve: at the cut the stack
   is leaning over him and he has not moved.

   ⛔ THE PRESS IS DRIVEN BY THE ROWS, NOT BY A TIMER: the ram's position is a
   function of the nearest row's distance from the die, so the hammer speeds up
   exactly as the belt does and can never drift out of sync with it.
   ------------------------------------------------------------------------- */
export const PRESS_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("gate"), back: "#B08A42", back2: "#F0CE7E", floor: "#C89C50",
    floor2: "#6E5326", key: "#FFDA92" };
  /* ═══ FIVE SHOTS, ONE PER PHRASE OF THE LINE ═══════════════════════════════
     ⛔⛔ Alex: *"its just one scene for 4 seconds quite boring same thing
     repetive."* Correct, and it is [[feedback_one_shot_nineteen_times]]: the
     three `Shot` entries this had were 1.00 / 1.10 / 0.98 on the SAME wide, so
     the framing wobbled and the picture never changed. A cut is the largest
     motion event a shot can contain and I was spending three of them on nothing.

     ⭐ `frameOn` puts a chosen WORLD POINT at the centre of the panel at a
     chosen scale, so each shot is aimed at a different SUBJECT rather than being
     a different zoom of the same one. Solved against `Cam`'s real transform —
     translate then scale about (506, 62% of 792) — because guessing offsets by
     eye is what produced the wobble.
     ⛔ Never below s=1.0: under it the camera sees past the room's own edges
     ([[feedback_the_crop_bound_includes_cam]]). */
  const OX = 506, OY = 792 * 0.62, CX = 506, CY = 396;
  const frameOn = (px: number, py: number, s: number, at: number): Shot =>
    ({ at, s, x: CX - OX - (px - OX) * s, y: CY - OY - (py - OY) * s });
  const SHOT: Shot[] = [
    /* 1 · "the rumors are true"        MACRO — the die on a blank row */
    frameOn(656, 522, 2.16, 0),
    /* 2 · (the scale reveal)           WIDE  — it is an enormous machine */
    frameOn(520, 452, 1.02, 30),
    /* 3 · "secretly getting distracted" CLOSE — him, asleep, lit green */
    frameOn(150, 560, 1.92, 62),
    /* 4 · "skipping your tasks"        TRACK — running with the blank rows */
    frameOn(566, 592, 1.55, 90),
    /* 5 · "lying to you about it"      LOW   — the stack over his head */
    frameOn(306, 512, 1.70, 114),
  ];
  const sh = shotAt(f, SHOT);
  /* the track shot runs WITH the belt; every other shot holds its aim */
  const trackK = f >= 90 && f < 114 ? (f - 90) * 7.4 : 0;
  /* ⛔ rev 1 put the crown at yTop=96 and it cropped off the top of the panel —
     taking THE CLAUDE MARK with it, which is the one element that makes this a
     Claude joke rather than a factory. The mark is now fully inside the frame
     and nothing overlaps it. */
  const BELT_Y = 596, DIE_X = 646, PITCH = 196;
  /* ⭐ the belt ACCELERATES — 5.4 to 11.6 px/frame. Position is the integral, so
     it stays continuous and never teleports. */
  /* ⛔ 10.4 px/frame measured WORSE than 7.2 (8.86 vs 9.53). At 10fps sampling a
     row moving 110px per sample travels more than half its own pitch, so
     consecutive samples find a row in nearly the same place — the wagon-wheel
     effect, in the motion metric. Faster is not automatically more motion. */
  const v0 = 7.2, dv = 7.4;
  const travelled = v0 * f + (dv * f * f) / (2 * dur);
  /* ⛔⛔ THE BELT WAS RUNNING OUT OF ROWS. With 22 rows at a 178 pitch and a
     total travel of 1456px, the last row cleared the panel at ~f110 and the
     second half of the hook played on an EMPTY belt — 32 of 44 samples under the
     floor, and the cause was arithmetic, not staging: the run has to be longer
     than (start + total travel + margin), which is ~2960px = 17 rows MINIMUM.
     Thirty, so it is still full at frame 134. */
  const rows = Array.from({ length: 40 }, (_, j) => {
    const x = 1560 - j * PITCH - travelled;
    return { j, x, hue: TASKS[j % 6].c };
  });
  const live = rows.filter((r) => r.x > -300 && r.x < 1300);
  /* ⭐ A SECOND LINE, running the other way behind the press. One belt is a
     ~13% strip of the panel and cannot carry a frame however fast it runs; two
     lines at two depths double the travelling area and read as a bigger machine. */
  const back = Array.from({ length: 34 }, (_, j) => {
    const x = -420 + j * 172 + travelled * 0.72;
    return { j, x, hue: TASKS[(j + 3) % 6].c };
  }).filter((r) => r.x > -260 && r.x < 1270);
  /* the ram follows whichever row is nearest the die */
  const near = live.reduce((a2, r) => Math.abs(r.x - DIE_X) < Math.abs(a2 - DIE_X) ? r.x : a2, 9999);
  /* ⛔ a linear tent means the die is ALWAYS moving slowly, which is the worst
     case for both weight and repaint. A power curve keeps it up and then slams:
     higher instantaneous velocity, and it reads as mass. */
  const drop = Math.pow(Math.max(0, 1 - Math.min(1, Math.abs(near - DIE_X) / 118)), 2.4);
  /* ⭐ AND A PRESS THAT HEAVY SHAKES THE ROOM. The impact jolt is the single
     largest repaint available — it moves the WHOLE panel — and it is also just
     correct: a die coming down without a jolt reads as weightless. */
  const jolt = drop > 0.82 ? (drop - 0.82) * 5.6 : 0;
  const shk = jolt * Math.sin(f * 2.9) * 9;
  const heat = E(f, 0, dur, 0.24, 1, LIN);
  /* the stack: every row that has gone past the die and off to the left */
  const stacked = rows.filter((r) => r.x < 236).length;
  const lean = E(f, 40, dur, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Cam x={sh.x + trackK + Math.sin(f / 21) * 9 + shk} y={sh.y + Math.abs(shk) * 0.5}
        s={sh.s} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.6}
          floorKind="tile" grit={0.48} window={null} />
        <SesFit p={p} f={f} seed={11} z={5} lift={1.28} ctx={0.9} run={1} />
        <div style={{ position: "absolute", left: -40, top: 4, width: 1092, height: 292,
          zIndex: 22, borderRadius: "0 0 30% 30% / 0 0 24% 24%",
          background: `linear-gradient(178deg, ${mxh(GOLD, 0.72)} 0%, ${mxh(GOLD, 0.5)} 46%, ${mxh(GOLD, 0.24)} 100%)`,
          borderBottom: `8px solid ${dkh(GOLD, 0.32)}`, boxShadow: SH_D }} />
        <BayWall p={p} f={f} x={-24} y={306} cols={10} rows={1} z={24} seed={67} live={9} o={0.86} />
        <Pool x={DIE_X} y={GY - 10} w={1000} hh={220} c={mxh(GOLD, 0.66)} o={0.44} z={26} />

        <Runner y={330} f={f} z={25} rate={6.4} pitch={204} w={104} h={58} kind="cell"
          c={dkh(GOLD, 0.24)} c2={mxh(BRASS, 0.2)} o={0.8} />
        {/* ⛔ f0 fell to 129.4 the moment shot 1 became a MACRO, because the
            macro lands on the belt and the belt was the darkest band in the set.
            A lit machine bed under the whole run fixes every belt framing at
            once, and a press this size would have one. */}
        <div style={{ position: "absolute", left: -60, top: BELT_Y - 108, width: 1132, height: 236,
          zIndex: 32, borderRadius: 14,
          background: `linear-gradient(178deg, ${mxh(BONE, 0.86)} 0%, ${mxh(BONE, 0.58)} 62%, ${mxh(BRASS, 0.34)} 100%)`,
          border: `7px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D }} />
        {Array.from({ length: 12 }, (_, k) => (
          <div key={"bb" + k} style={{ position: "absolute", left: -34 + k * 92, top: BELT_Y - 96,
            width: 20, height: 20, borderRadius: "50%", zIndex: 33,
            background: `radial-gradient(circle at 34% 30%, ${mxh(BRASS, 0.4)}, ${dkh(BRASS, 0.42)})` }} />
        ))}
        {/* the belt the rows ride in on */}
        <Conveyor y={BELT_Y + 46} f={f} z={40} x0={-260} w={1540}
          rate={(v0 + dv * (f / dur)) * 0.5} s={1.15} />

        {/* ⭐ THE ONE OBJECT REPEATED — fourteen identical rows, one clock */}
        {live.map((r) => {
          const past = r.x < DIE_X - 30;
          const sq = Math.abs(r.x - DIE_X) < 80 ? drop : 0;
          return (
            <TodoRow key={"tr" + r.j} x={r.x} y={BELT_Y} s={1.24} z={r.x < DIE_X ? 78 : 52}
              hue={r.hue} ticked={past ? 1 : 0} squash={sq} rot={past ? (r.j % 2 ? 2 : -2) : 0} />
          );
        })}

        {/* the return line, behind the press */}
        <Conveyor y={432} f={f} z={28} x0={-300} w={1620} rate={-3.4} s={0.9} />
        {back.map((r) => (
          <TodoRow key={"bk" + r.j} x={r.x} y={404} s={0.74} z={30} hue={r.hue}
            ticked={1} rot={r.j % 2 ? 1.6 : -1.4} />
        ))}

        {/* THE HERO — 2.6x the body, holding its ground, only hammering */}
        <DonePress x={DIE_X} yTop={214} w={324} h={412} f={f} drop={drop} z={70} heat={heat} />
        {/* the cost of the stroke, every stroke */}
        <Ring x={DIE_X} y={BELT_Y} f={f} at={f} c={mxh(OKGREEN, 0.4)} z={92}
          s={0.5 + drop * 0.9} dur={8} />
        {drop > 0.86 && <Puff x={DIE_X} y={BELT_Y + 24} f={f} at={f} c="#E8DCC4" z={92} n={8} s={0.9} />}

        {/* ⭐ THE STACK, growing toward him and leaning. It never lands. */}
        {Array.from({ length: Math.min(stacked, 6) }, (_, k) => (
          <TodoRow key={"sk" + k} x={272 + Math.sin(k * 1.3) * 14 - lean * k * 6}
            y={GY - 26 - k * 42} s={0.80} z={80 + k} hue={TASKS[k % 6].c} ticked={1}
            rot={(k % 2 ? 3.4 : -2.8) - lean * (k * 2.6)} />
        ))}

        {/* HIM — asleep in the chair, and he never moves */}
        <div style={{ position: "absolute", left: 54, top: GY - 152, width: 152, height: 138,
          zIndex: 93, borderRadius: "44px 44px 8px 8px",
          background: `linear-gradient(168deg, ${mxh(CLAY, 0.04)}, ${dkh(CLAY, 0.42)})`,
          border: `5px solid ${dkh(CLAY, 0.52)}` }} />
        <Contact x={132} y={GY - 4} w={196} o={0.34} z={94} />
        <Dev f={f} x={132} y={GY} i={1} size={286} z={95} at={0} loop={0}
          extra={{ glasses: 1 }} gaze={0} cheer={0} stern={0} />
        {/* ⭐ the press throws green light across him on every stroke — which is
            what makes the CLOSE shot a different picture and not just a zoom */}
        <Pool x={132} y={GY - 20} w={430} hh={300} c={mxh(OKGREEN, 0.4)}
          o={0.12 + drop * 0.34} z={89} />
        {/* the sleep, drawn: three Zs rising on their own clocks */}
        {[0, 1, 2].map((k) => {
          const t = ((f + k * 22) % 66) / 66;
          return (
            <span key={"zz" + k} style={{ position: "absolute", left: 214 + t * 50,
              top: GY - 286 - t * 116, zIndex: 118, ...ui(40 + k * 17, 900),
              color: hexa(INK, 0.62 * (1 - t)), transform: `rotate(${-8 + t * 20}deg)` }}>Z</span>
          );
        })}

        <Sweep k={E(f, 44, 100, 0, 1, IO)} y={80} h={560} c="#FFF4DC" z={93} w={290}
          from={-320} to={1120} o={0.22} />
        <Edge side="r" c={dkh(p.floor2, 0.3)} w={74} z={97} kind="post" />
      </Cam>
      {/* ⭐ the claim is a TITLE CARD, so it sits outside `Cam` and holds its
          place through all five cuts instead of flying off on the macro. */}
      <ClaimPlate x={262} y={188} w={430} f={f} flip={0} z={120}
        big="6 OF 6 DONE" sub="CLAUDE CODE  ·  THIS SESSION"
        jolt={drop > 0.9 ? drop * 0.8 : 0} />
    </Scene>
  );
};


/* ═══════════════════════════════════════════════════════════════════════════
   ROUND 4 — THREE CONCEPTS TAKEN OFF THE WINNERS' CODE

   Alex: *"the hook concept as a whole is not interesting igve me like 3 more
   based on our winning concepts like the OX reel, AGENCY, BOSS, etc here."*

   ⭐⭐⭐ So I read their hooks instead of their screenshots
   (`feedback_read_the_winning_hook_do_not_just_measure_it`), and the house
   method is stated in `BuildHooks` rev 8 in one line:

     > **NAME THE MECHANISM AS ONE WORD, THEN BUILD DIFFERENT WORDS.**

   The shipped words:
     OX       RELEASE · DEMOLITION      AGENCY   POSSESSION · SUMMONS ·
     BUILD    EXCHANGE · MULTIPLICATION ·         REVELATION · ACCUMULATION
              SUBTRACTION

   ⛔ AND MINE, NAMED HONESTLY, ARE ONE WORD SIX TIMES:
     cutout REVEAL · dial FORCE · drum EMPTYING · bullpen DESERTION ·
     absorb ABSORPTION · press STAMPING — **every one of them is "a thing turns
     out to be empty."** Which is why six rounds of better drawing did not move
     the note (`feedback_one_concept_four_costumes`).

   ⭐ THREE WORDS NOTHING BEFORE THEM WAS, each built on a named winner:

     strip  SUBTRACTION   ← BuildHooks `tear`: *"THE ONLY ONE THAT STARTS FULL.
                            The frame opens completely covered and is STRIPPED
                            BACK. Nothing enters at any point, which is the
                            structural opposite of all nine before it."*
     crush  DEMOLITION    ← OxHooks `HookCrush`: a wall trembling harder as
                            something arrives, then a mass through it and THIRTY
                            SLABS TRAVELLING, then a wide with debris still up.
     fan    MULTIPLICATION ← BuildHooks `fan`: *"ONE free tool, and it sprays
                            into a wall. Not accumulation — nothing piles up;
                            one source divides. The anticipation is a physical
                            charge you can see building before it goes."*

   ⛔ NONE OF THEM RESOLVES: the wall is still standing, the debris is still in
   the air and the spray is still going at the cut.
   ⭐ And all three carry the claim plate OUTSIDE `Cam` on a lit ground, which is
   how AGENCY holds the frame-0 law while its subject stays a dark mass.
   ═══════════════════════════════════════════════════════════════════════════ */

/* --- A · STRIP — SUBTRACTION. It opens COMPLETELY COVERED. ---------------- */
export const STRIP_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("close"), back: "#C6D6E2", back2: "#EEF4F8", floor: "#A6B8C4",
    floor2: "#566874", lip: "#141C24", key: "#FFF0CE" };
  const COLS = 7, ROWS = 5, N = COLS * ROWS;
  const TW = 1012 / COLS, TH = 560 / ROWS;
  /* the audit runs right to left and ACCELERATES; a tile goes when it is passed */
  const front = 1080 - (E(f, 4, dur, 0, 1, IN_Q) * 1180);
  /* ⛔ FIRST RENDER MEASURED f0 = 87.9 ON A HOOK WHOSE FRAME 0 IS A SOLID CREAM
     WALL, which is impossible — the wall was not being drawn. `E(f, a, b, ...)`
     assumes a < b, and this passed a > b because the audit edge travels RIGHT TO
     LEFT, so every tile clamped to "already gone" at frame 0. A reversed ramp
     needs its own smoothstep, not E with its arguments swapped. */
  const gone = (i: number) => {
    const c = i % COLS, r = Math.floor(i / COLS);
    const tx = c * TW + TW / 2 + (r % 2 ? 26 : -26);
    const u = Math.max(0, Math.min(1, (tx + 70 - front) / 110));
    return u * u * (3 - 2 * u);
  };
  const left = Array.from({ length: N }, (_, i) => gone(i)).filter((g) => g < 0.5).length;
  const SHOT: Shot[] = [{ at: 0, s: 1.00, x: 0, y: 0 },
    { at: 52, s: 1.09, x: 60, y: -8 }, { at: 104, s: 1.02, x: -46, y: 6 }];
  const sh = shotAt(f, SHOT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.4}>
      <Cam x={sh.x + Math.sin(f / 23) * 18} y={sh.y} s={sh.s + E(f, 0, dur, 0, 0.05, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="rack" overhead="none" rake={0.10} rakeRate={3.4}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={5} z={5} lift={1.2} ctx={left / N} run={1} />
        {/* WHAT IS UNDERNEATH — the rows as they really are: no command, no run */}
        {Array.from({ length: N }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          return (
            <div key={"un" + i} style={{ position: "absolute", left: c * TW + 5, top: 150 + r * TH + 5,
              width: TW - 10, height: TH - 10, borderRadius: 9, zIndex: 30,
              background: `linear-gradient(168deg, ${dkh(TERM, 0.02)}, ${dkh(TERM, 0.34)})`,
              border: `3px solid ${dkh(INK, 0.1)}`, padding: 10, overflow: "hidden" }}>
              <div style={{ height: 7, width: "58%", borderRadius: 99,
                background: hexa(TASKS[i % 6].c, 0.8), marginBottom: 9 }} />
              <div style={{ height: 16, width: "84%", borderRadius: 4,
                border: `2px dashed ${hexa("#FFFFFF", 0.28)}` }} />
              <div style={{ marginTop: 9, ...mono(13, 800), color: hexa(DIFFR, 0.9) }}>NOT RUN</div>
            </div>
          );
        })}
        {/* THE WALL — cream tiles, one green tick each, edge to edge at frame 0 */}
        {Array.from({ length: N }, (_, i) => {
          const c = i % COLS, r = Math.floor(i / COLS);
          const g = gone(i);
          if (g > 0.985) return null;
          return (
            <div key={"tl" + i} style={{ position: "absolute", left: c * TW + 3,
              top: 150 + r * TH + 3 + g * g * 620, width: TW - 6, height: TH - 6,
              borderRadius: 10, zIndex: 60 + (g > 0 ? 20 : 0),
              transform: `rotate(${g * (i % 2 ? 26 : -22)}deg) scale(${1 - g * 0.12})`,
              opacity: 1 - g * 0.35,
              background: `linear-gradient(166deg, ${mxh(BONE, 0.9)}, ${mxh(BONE, 0.5)})`,
              border: `4px solid ${dkh(BRASS, 0.28)}`, boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: TH * 0.44, height: TH * 0.44, borderRadius: "50%",
                background: `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.42)}, ${dkh(OKGREEN, 0.28)})`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={TH * 0.26} height={TH * 0.26} viewBox="0 0 24 24">
                  <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.6}
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
        {/* the audit edge itself */}
        <div style={{ position: "absolute", left: front - 12, top: 130, width: 24, height: 600,
          zIndex: 92, borderRadius: 12,
          background: `linear-gradient(180deg, ${hexa(SKY, 0.2)}, ${hexa(mxh(SKY, 0.7), 0.95)}, ${hexa(SKY, 0.2)})` }} />
        <div style={{ position: "absolute", left: front - 130, top: 130, width: 260, height: 600,
          zIndex: 91, background: `linear-gradient(90deg, transparent, ${hexa(mxh(SKY, 0.6), 0.26)})` }} />
        {/* he is standing IN the hole it has made */}
        <Contact x={210} y={GY - 4} w={158} o={0.3} z={96} />
        <Dev f={f} x={210} y={GY} i={1} size={244} z={97} at={0} loop={2}
          extra={{ glasses: 1 }} gaze={0.7} shock={E(f, 60, 84, 0, 1, OUT) * 0.8} />
        <Edge side="l" c={dkh(p.floor2, 0.3)} w={72} z={98} kind="post" />
      </Cam>
      <ClaimPlate x={276} y={92} w={440} f={f} flip={0} z={120}
        big="35 OF 35 DONE" sub="CLAUDE CODE  ·  THIS SESSION" />
    </Scene>
  );
};

/* --- B · CRUSH — DEMOLITION, elevated ------------------------------------- */
/*  ⭐ PICKED. Alex: *"lets do the second concept here and lets see but elevate it
    even more motion and interesting aspect here."*

    ⛔ WHY THE FIRST PASS MEASURED 6.74 WITH 28 DEAD SAMPLES, and it is not a
    staging fault: **OX's `HookCrush` is 75 frames and this is 135.** Its whole
    plan is CLOSE-trembling / mass-through / wide-with-debris, which fills 2.5s
    and then has nothing left to do for another two seconds. Copying a shot plan
    without copying its DURATION is how you inherit a hole.

    ⭐ FOUR THINGS THAT FILL IT, all of them from the same source:

    1 · **THE COLLAPSE PROPAGATES.** One detonation is one event; a front that
        crosses the panel over 90 frames is forty events. Each tile is hit when
        the leading edge reaches it, so slabs are still being thrown at f110 and
        their debris is still in the air at the cut.
    2 · **THE WHOLE WALL IS ALWAYS MOVING.** OX: *"the plate is NEVER inert — its
        tremor CLIMBS because the thing is about to go."* Applied PER TILE and
        scaled by distance to the front, so every un-hit tile shakes harder as
        its turn approaches. That telegraphs the impact AND leaves no still
        pixels anywhere in the frame.
    3 · **THE MASS IS A GIANT RED X**, 540px, tumbling — the exact counter-mark
        to the green tick the wall is made of, legible with nothing to decode,
        and not one more rectangle.
    4 · ⛔ **IT IS COMING FOR HIM AND THE SHOT ENDS BEFORE IT ARRIVES.** He is
        front-right, 200px against a 540px mark, and at frame 134 it is still
        short of him. Nothing resolves.
    ------------------------------------------------------------------------- */
export const CRUSH_HOOK: React.FC<{ v: Variant; dur: number; at?: number }> = ({ v, dur, at = 0 }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("gate"), back: "#8E6C30", back2: "#D8AE5C", floor: "#A87E3C",
    floor2: "#54401E", key: "#FFDA92" };
  const COLS = 8, ROWS = 5, N = COLS * ROWS;
  const TW = 1012 / COLS, TH = 128;
  const Y0 = 168;
  /* the leading edge of the collapse, crossing the whole panel */
  /* ⛔ A PER-SAMPLE TRACE: 55 at the detonation, then 4-6 for the last third.
     `IO` decelerates, so the front crawled after f90 and the collapse was OVER
     with 45 frames still to run. It is LINEAR now and it runs to f132, so tiles
     are still being thrown at the cut. */
  /* ⭐ Alex: *"have the big red X thing start coming in starting from 0 here not
     just way later."* At -520 the mark did not reach the panel until ~f45, so
     the first second and a half was a still wall. It now enters at frame 0 — the
     claim AND the thing that refutes it are both in the thumbnail — and the
     collapse still does not start until its tip actually reaches the first tile
     at ~f4, so the setup survives. */
  /* ⛔ -230 still showed NOTHING at frame 0: the glyph's strokes start at 5/24
     of its box, so the mark's right tip is at `front + 157`, not at `front`.
     Positioned off the TIP, so the X is ~100px into the panel in the thumbnail. */
  const front = E(f, 0, 138, -60, 1560, LIN);
  const SHOT: Shot[] = [{ at: 0, s: 1.30, x: 30, y: 30 },
    { at: 22, s: 1.04, x: 0, y: 4 }, { at: 78, s: 1.00, x: -26, y: -6 }];
  const sh = shotAt(f, SHOT);
  const tiles = Array.from({ length: N }, (_, i) => {
    const c = i % COLS, r = Math.floor(i / COLS);
    const cx = c * TW + TW / 2, cy = Y0 + r * TH + TH / 2;
    /* ⭐ and each tile's own throw lasts 25 frames instead of 11, so its debris
       is still in the air long after the front has gone past it */
    /* ⛔ the hit test runs off the mark's LEADING EDGE, not its centre — with
       the X on screen from frame 0 a centre test would have the left column
       already destroyed in the thumbnail. */
    const hit = Math.max(0, Math.min(1, (front + 60 - cx) / 420));
    /* ⭐ the anticipation tremor, per tile, climbing as its turn comes */
    const near = Math.max(0, 1 - Math.abs(cx - front) / 560);
    const trem = hit > 0.02 ? 0 : (1.4 + near * near * 13);
    const a = rnd(i, 7) * Math.PI * 2;
    const fly = hit * hit;
    return { i, c, r, cx, cy, hit, fly,
      tx: Math.sin(f * 1.9 + i * 1.3) * trem,
      ty: Math.cos(f * 1.6 + i) * trem * 0.6,
      vx: 190 + rnd(i, 3) * 430, vy: Math.sin(a) * 250 - 150 };
  });
  const shk = tiles.some((q) => q.hit > 0.01 && q.hit < 0.3)
    ? Math.sin(f * 3.1) * 11 * Math.max(0, 1 - Math.abs(f - 60) / 90) : 0;
  const standing = tiles.filter((q) => q.hit < 0.05).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Cam x={sh.x + shk + Math.sin(f / 24) * 12} y={sh.y + Math.abs(shk) * 0.4}
        s={sh.s + E(f, 0, dur, 0, 0.05, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="shelf" overhead="none" rake={0.10} rakeRate={3.6}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={13} z={5} lift={1.24} ctx={standing / N} run={1} />
        {/* WHAT THE WALL WAS HIDING — panes that never ran, revealed behind it */}
        <PaneWall f={f} y0={196} h={392} n={12} z={16} lit={[]} />
        {/* the dark grid the tiles are set into, so the wall has joints */}
        <div style={{ position: "absolute", left: 0, top: Y0 - 8, width: 1012, height: ROWS * TH + 16,
          zIndex: 26, background: dkh(INK, 0.06), opacity: 0.9 }} />

        {/* ⭐⭐ WHAT IS BEHIND EACH ONE. The trace still had the last six samples
            dying, because by f117 all forty tiles are gone and the frame is an
            empty room. So the collapse REVEALS something instead of just leaving
            a hole: every destroyed tick uncovers a red NOT RUN behind it, popping
            in on its own beat. Forty arrivals staggered across the whole clip,
            and they ACCUMULATE — the tail is the fullest part of the frame
            instead of the emptiest (`feedback_hold_needs_arrivals_not_travel`). */}
        {tiles.map((q) => {
          const on = Math.max(0, Math.min(1, (q.hit - 0.30) / 0.30));
          if (on <= 0.01) return null;
          const k = on < 1 ? 1 + (1 - on) * 0.5 : 1;
          return (
            <div key={"nr" + q.i} style={{ position: "absolute", left: q.cx - TW / 2 + 10,
              top: q.cy - TH / 2 + 10, width: TW - 20, height: TH - 20, borderRadius: 10,
              zIndex: 34, opacity: on, transform: `scale(${k})`,
              background: `linear-gradient(168deg, ${dkh(TERM, 0.02)}, ${dkh(TERM, 0.36)})`,
              border: `3px solid ${hexa(DIFFR, 0.5)}`,
              display: "flex", flexDirection: "column", alignItems: "center",
              justifyContent: "center", gap: 6 }}>
              <svg width={30} height={30} viewBox="0 0 24 24">
                <path d="M6 6 L18 18 M18 6 L6 18" stroke={DIFFR} strokeWidth={4.6}
                  strokeLinecap="round" />
              </svg>
              <span style={{ ...mono(13, 800), color: hexa(DIFFR, 0.94), letterSpacing: 1 }}>
                NOT RUN
              </span>
            </div>
          );
        })}

        {/* THE WALL — forty green ticks, and every one of them is shaking */}
        {tiles.map((q) => {
          if (q.hit > 0.999) return null;
          return (
            <div key={"tl" + q.i} style={{ position: "absolute",
              left: q.cx - TW / 2 + 4 + q.tx + q.fly * q.vx,
              top: q.cy - TH / 2 + 4 + q.ty + q.fly * q.vy + q.fly * q.fly * 300,
              width: TW - 8, height: TH - 8, borderRadius: 12,
              zIndex: q.hit > 0 ? 80 + q.i % 9 : 40,
              transform: `rotate(${q.tx * 0.6 + q.fly * (q.i % 2 ? 250 : -215)}deg) scale(${1 - q.fly * 0.1})`,
              opacity: 1 - q.fly * 0.25,
              background: `linear-gradient(166deg, ${mxh(BONE, 0.88)}, ${mxh(BONE, 0.42)})`,
              border: `4px solid ${dkh(BRASS, 0.32)}`, boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 62, height: 62, borderRadius: "50%",
                background: `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.42)}, ${dkh(OKGREEN, 0.28)})`,
                border: `4px solid ${dkh(OKGREEN, 0.44)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={36} height={36} viewBox="0 0 24 24">
                  <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.6}
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}

        {/* ⭐ THE WAIT IS NOT A HOLD. Dust shakes off the standing wall the whole
            time, hardest where the front is about to arrive — so the first third
            has arrivals of its own instead of only a tremor. */}
        {Array.from({ length: 5 }, (_, k) => (
          <Fall key={"dz" + k} x={Math.max(60, front + 40 + k * 150)} y={Y0 + 20} w={210}
            f={f} at={2 + k * 5} n={9} z={44} c="#E4D8BE" s={0.95} rate={1.3} />
        ))}
        {/* ⭐ THE MASS — a 540px red X, tumbling through, and it is coming for him */}
        {front > -460 && (
          <div style={{ position: "absolute", left: front - 270, top: 300, width: 540, height: 540,
            zIndex: 95, transform: `rotate(${-24 + (front / 1290) * 96}deg)` }}>
            <svg width={540} height={540} viewBox="0 0 24 24" style={{ overflow: "visible" }}>
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={dkh(DIFFR, 0.5)}
                strokeWidth={5.4} strokeLinecap="round" transform="translate(0.4 0.5)" />
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={DIFFR} strokeWidth={4.8}
                strokeLinecap="round" />
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={hexa("#FFFFFF", 0.34)}
                strokeWidth={1.4} strokeLinecap="round" transform="translate(-0.2 -1.1)" />
            </svg>
          </div>
        )}
        {/* ⛔ THE TAIL: once all forty are down and every NOT RUN is lit, nothing
            changes and the last six samples fall to 5-7. ⭐ SO IT DOES NOT
            RESOLVE — the NEXT one is already on its way in, bigger, and it is
            only a third of the way across when the hook cuts. */}
        {f > 104 && (
          <div style={{ position: "absolute", left: E(f, 106, dur, -760, 240, OUT) - 350,
            top: 258, width: 700, height: 700, zIndex: 96,
            transform: `rotate(${-40 + E(f, 106, dur, 0, 62, OUT)}deg)` }}>
            <svg width={700} height={700} viewBox="0 0 24 24" style={{ overflow: "visible" }}>
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={dkh(DIFFR, 0.5)}
                strokeWidth={5.4} strokeLinecap="round" transform="translate(0.4 0.5)" />
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={DIFFR} strokeWidth={4.8}
                strokeLinecap="round" />
              <path d="M5 5 L19 19 M19 5 L5 19" fill="none" stroke={hexa("#FFFFFF", 0.3)}
                strokeWidth={1.4} strokeLinecap="round" transform="translate(-0.2 -1.1)" />
            </svg>
          </div>
        )}
        <Ring x={200} y={430} f={f} at={112} c={mxh(DIFFR, 0.4)} z={97} s={2.4} dur={24} />
        <Puff x={200} y={430} f={f} at={112} c="#E8DCC4" z={97} n={14} s={1.3} />
        {/* the shockwave running ahead of it */}
        <div style={{ position: "absolute", left: front - 40, top: Y0 - 20, width: 90,
          height: ROWS * TH + 40, zIndex: 92,
          background: `linear-gradient(90deg, transparent, ${hexa("#FFFFFF", 0.34)})` }} />
        {[0, 1, 2, 3].map((k) => (
          <Ring key={"sw" + k} x={front - 120} y={430} f={f} at={34 + k * 22}
            c={mxh(DIFFR, 0.4)} z={94} s={1.9} dur={26} />
        ))}
        <Puff x={front - 90} y={430} f={f} at={f} c="#E8DCC4" z={93} n={9} s={1.2} />
        <Fall x={120} y={Y0} w={860} f={f} at={40} n={20} z={91} c="#EAE0CA" s={1.25} />

        {/* ⛔ HIM — 200px against a 540px mark, and it never reaches him */}
        {/* ⭐ the sprite reads bigger — Alex asked for it, and at 316 he is still
            well under the 540px mark that is coming for him, so the scale
            contrast that makes the X feel huge survives. */}
        <Contact x={834} y={GY - 4} w={214} o={0.34} z={97} />
        <Dev f={f} x={834} y={GY} i={1} size={316} z={98} at={0} loop={2}
          extra={{ glasses: 1 }} gaze={0} cheer={E(f, 4, 20, 0, 1, BACK)}
          shock={E(f, 46, 66, 0, 1, OUT)} />
        <Edge side="l" c={dkh(p.floor2, 0.3)} w={70} z={99} kind="post" />
        {/* ⭐ every spoken word gets its own event, on the reel clock */}
        <WordBeat rf={f + at} z={101} />
      </Cam>
      <ClaimPlate x={286} y={92} w={452} f={f} flip={0} z={120}
        big="40 OF 40 DONE" sub="CLAUDE CODE  ·  THIS SESSION"
        jolt={Math.abs(shk) * 0.12} />
    </Scene>
  );
};

/* --- C · FAN — MULTIPLICATION. One source divides; nothing piles up. ------- */
export const FAN_HOOK: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = { ...asPlace("night"), back: "#20406E", back2: "#5E8CC4", floor: "#2C4C78",
    floor2: "#12243E", key: "#DCEBFA" };
  const SHOT: Shot[] = [{ at: 0, s: 1.22, x: 0, y: 30 },
    { at: 34, s: 1.00, x: 0, y: 0 }, { at: 92, s: 1.10, x: -34, y: -14 }];
  const sh = shotAt(f, SHOT);
  /* ⭐ BUILD: "the anticipation is a physical charge you can SEE building before
     it goes." So the charge is drawn — a swelling, brightening, shaking source. */
  const charge = E(f, 0, 34, 0, 1, IN_Q);
  const NP = 44;
  const SX = 506, SY = 402;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.5}>
      <Cam x={sh.x + Math.sin(f / 22) * 20} y={sh.y} s={sh.s + E(f, 0, dur, 0, 0.06, LIN)} z={12}>
        <Room p={p} f={f} bands={0} kind="rack" overhead="none" rake={0.12} rakeRate={4.0}
          floorKind="tile" grit={0.55} window={null} />
        <SesFit p={p} f={f} seed={17} z={5} lift={1.3} ctx={0.9 - charge * 0.4} run={1} />
        {/* ⛔ f0 61.1 — `night` is a deep blue room and the law is >=140. The
            mean comes from a LIT BOARD, the hierarchy from the dark ground
            around it (`brightness is the MEAN, hierarchy is the SPREAD`). */}
        <div style={{ position: "absolute", left: 46, top: 156, width: 920, height: 468,
          zIndex: 22, borderRadius: 22,
          background: `linear-gradient(174deg, ${mxh(BONE, 0.9)} 0%, ${mxh(BONE, 0.6)} 58%, ${mxh(SKY, 0.4)} 100%)`,
          border: `10px solid ${dkh(SKY, 0.34)}`, boxShadow: SH_D }} />
        {/* the charge, before it goes */}
        <div style={{ position: "absolute", left: SX - 300, top: SY - 300, width: 600, height: 600,
          borderRadius: "50%", zIndex: 30,
          background: `radial-gradient(circle, ${hexa(mxh(OKGREEN, 0.4), 0.1 + charge * 0.5)} 0%, transparent 66%)` }} />
        {/* ⭐ ONE SOURCE — a single row, the only real instruction there ever was */}
        <div style={{ position: "absolute", left: SX - 168, top: SY - 58, width: 336, height: 116,
          zIndex: 62, borderRadius: 14,
          transform: `scale(${1 + charge * 0.24}) rotate(${Math.sin(f * 2.2) * charge * 2.4}deg)`,
          background: `linear-gradient(166deg, ${mxh(BONE, 0.92)}, ${mxh(BONE, 0.5)})`,
          border: `6px solid ${dkh(BRASS, 0.3)}`, boxShadow: SH_D,
          display: "flex", alignItems: "center", gap: 14, paddingLeft: 18 }}>
          <MarkTile rel d={58} z={2} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 12, width: "74%", borderRadius: 99,
              background: hexa(SKY, 0.9), marginBottom: 10 }} />
            <div style={{ height: 20, width: "88%", borderRadius: 5,
              border: `3px dashed ${hexa(INK, 0.34)}` }} />
          </div>
        </div>
        {/* THE SPRAY — one becomes forty-four, and nothing lands in a pile */}
        {Array.from({ length: NP }, (_, i) => {
          const t = E(f, 34 + (i % 11) * 3.4, dur, 0, 1, OUT);
          if (t <= 0.001) return null;
          const a = (i / NP) * Math.PI * 2 + rnd(i, 5) * 0.5;
          const sp = 300 + rnd(i, 9) * 560;
          const d = 44 + rnd(i, 3) * 44;
          return (
            <div key={"pp" + i} style={{ position: "absolute",
              left: SX + Math.cos(a) * sp * t - d / 2,
              top: SY + Math.sin(a) * sp * t * 0.72 - d / 2 + t * t * 90,
              width: d, height: d, borderRadius: "50%", zIndex: 70,
              opacity: Math.min(1, t * 4) * (1 - t * 0.2),
              transform: `rotate(${t * (i % 2 ? 200 : -170)}deg) scale(${0.4 + t * 0.6})`,
              background: `radial-gradient(circle at 34% 28%, ${mxh(OKGREEN, 0.46)}, ${dkh(OKGREEN, 0.3)})`,
              border: `${d * 0.09}px solid ${dkh(OKGREEN, 0.5)}`, boxShadow: SH,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={d * 0.56} height={d * 0.56} viewBox="0 0 24 24">
                <path d="M5 12.5 L10 17.5 L19 6.5" fill="none" stroke="#FFFFFF" strokeWidth={4.6}
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          );
        })}
        {/* ⛔ and the ONE thing that was actually true, falling out of the spray */}
        {f > 96 && (
          <div style={{ position: "absolute", left: 786, top: 200 + E(f, 96, dur, 0, 380, IN_Q),
            width: 92, height: 92, zIndex: 98,
            transform: `rotate(${E(f, 96, dur, 0, 190, LIN)}deg)` }}>
            <svg width={92} height={92} viewBox="0 0 24 24">
              <path d="M5 5 L19 19 M19 5 L5 19" stroke={DIFFR} strokeWidth={5}
                strokeLinecap="round" />
            </svg>
          </div>
        )}
        <Ring x={SX} y={SY} f={f} at={34} c={mxh(OKGREEN, 0.44)} z={90} s={2.4} dur={28} />
        <Puff x={SX} y={SY} f={f} at={34} c="#DCEBFA" z={90} n={18} s={1.3} />
        <Contact x={172} y={GY - 4} w={162} o={0.3} z={94} />
        <Dev f={f} x={172} y={GY} i={1} size={248} z={95} at={0} loop={2}
          extra={{ glasses: 1 }} gaze={0} cheer={E(f, 36, 52, 0, 1, BACK)} />
        <Edge side="l" c={dkh(p.floor2, 0.32)} w={72} z={96} kind="post" />
      </Cam>
      <ClaimPlate x={280} y={92} w={446} f={f} flip={0} z={120}
        big="44 OF 44 DONE" sub="CLAUDE CODE  ·  THIS SESSION" />
    </Scene>
  );
};

/** the candidates, keyed. ⭐ `wander` IS S0 itself, so the candidate that
    gets picked and the scene that ships are the same code and cannot drift. */
export const HOOKS: Record<HookId, React.FC<{ v: Variant; dur: number; at?: number }>> = {
  wander: PASS,
  spike: SPIKE_HOOK,
  scorch: SCORCH_HOOK,
  cutout: CUTOUT_HOOK,
  dial: DIAL_HOOK,
  carousel: CAROUSEL_HOOK,
  bullpen: BULLPEN_HOOK,
  absorb: ABSORB_HOOK,
  press: PRESS_HOOK,
  strip: STRIP_HOOK,
  crush: CRUSH_HOOK,
  fan: FAN_HOOK,
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
