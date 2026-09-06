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
  Cutout, BigGauge, Spinner, Cracks, Shards, Drum, TickDisc, ClaimPlate,
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

export type HookId = "wander" | "spike" | "scorch" | "cutout" | "dial" | "carousel";

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
  const p = { ...asPlace("gate"), back: "#9A7834", back2: "#E4B95E", floor: "#C49C54",
    floor2: "#6A5028", key: "#FFDA92" };
  /* ⛔ rev 3 framed at 1.02-1.12 and cropped the VERIFY GATE off the right edge,
     which is the one object the whole shape depends on the viewer seeing. If the
     mechanism is off-frame there is no mechanism. Pulled back, and the drum moved
     left so the gate has room to be a place the drum GOES. */
  const SHOT: Shot[] = [{ at: 0, s: 0.97, x: 0, y: 54 },
    { at: 44, s: 1.05, x: 34, y: 32 }, { at: 96, s: 0.95, x: -26, y: 52 }];
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
        <div style={{ position: "absolute", left: -40, top: 118, width: 1092, height: 306,
          zIndex: 24, borderRadius: "0 0 34% 34% / 0 0 26% 26%",
          background: `linear-gradient(178deg, ${mxh(BONE, 0.92)} 0%, ${mxh(BONE, 0.66)} 46%, ${mxh(GOLD, 0.52)} 100%)`,
          borderBottom: `8px solid ${dkh(GOLD, 0.32)}`, boxShadow: SH_D }} />
        {Array.from({ length: 13 }, (_, k) => (
          <div key={"vl" + k} style={{ position: "absolute", left: 2 + k * 84, top: 388,
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
        <ClaimPlate x={300} y={252} w={492} f={f} flip={0} z={94} jolt={jolt} />
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

/** the candidates, keyed. ⭐ `wander` IS S0 itself, so the candidate that
    gets picked and the scene that ships are the same code and cannot drift. */
export const HOOKS: Record<HookId, React.FC<{ v: Variant; dur: number }>> = {
  wander: PASS,
  spike: SPIKE_HOOK,
  scorch: SCORCH_HOOK,
  cutout: CUTOUT_HOOK,
  dial: DIAL_HOOK,
  carousel: CAROUSEL_HOOK,
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
