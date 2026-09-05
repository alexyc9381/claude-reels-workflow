import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, lerpHex, mono, ui,
  Scene, Cam, Contact, Edge, Ring, Puff, Steam, Sweat, Fall, Motes, Pool, Rake,
  Crew, Hero, Forearm, costumeFor, squash, asPlace, R, TASKS, GY, BAND_Y, SAFE3,
  CLAY, GOLD, GREEN, RED, INK, BRASS, COPPER, BONE, STEEL, SLATE, TEAL, SKY, VIOLET, MUTE,
  TERM, TERM2, TERM3, UISH, UISH2, DIFFG, DIFFR, CARET, OKGREEN, WARN, CREAM_TICKET,
} from "./AdhWorld";
import { Room } from "./HwSets";
import {
  MarkTile, CodeLines, CheckBox, TodoList, SesFit, Pane, PaneWall, PromptRail, AnswerCard,
  TickPile, DoneChip, SkillFile, StopHook, LedgerTable, CmdLine, OutputBlock, ExitStamp,
  Toast, ErrStack, SysCard, Fleck, Selector, WallClock, PaneStack, Bin, Dev,
} from "./AdhProps";

/* ===========================================================================
   REEL 136 · "ADHD" — THE SCENES.  REV 2, THE SESSION.

   ⛔⛔⛔ REV 1 WAS A KITCHEN AND ALEX REJECTED THE WORLD, NOT A SCENE. So this
   is a rebuild of the REEL, not a patch of the beat in the note
   (`feedback_fix_the_reel_not_the_scene`). Every scene below stages the same
   sentence it staged before — that part was already right and the two-column
   diagnostic confirmed it — but it stages it with the SUBJECT'S OWN OBJECTS.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him":
     S0  ticks a box he never ran, follows a notification, ships an empty answer
     S1  reads the eval row that lands and stiffens
     S2  SIDESTEPS the rows that need a command, four times, shipping half-answers
     S3  hauls the skill file out of the shaft and holds it into the light
     S4  SHOVES an answer at the stop hook four times and cannot get it through
     S5  bins the tick pile, tears the ledger off the printer and clips it up
     S6  types the command, reads the output, STAMPS the row, then ships
     S7  (nothing — the pane does the talking, which is the joke)
     S8  proves one row, alone, while nine panes stay dark
     S9  turns the selector 1 -> 10 and ten panes take ten rows
     S10 punches the keyword and ships the answer that is finally complete

   ⛔ A SCENE'S ARRIVALS SPAN ITS FULL DURATION. An arrival inside the first
   third leaves the rest dead, and an entrance that ends at 1 is a FREEZE —
   every `E()` that finishes early is followed by something still moving. That
   rule is the whole reason rev 1's tail audit went from 2 stalls to 0, and it
   is preserved here beat for beat.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/* ---- the three cuts ------------------------------------------------------
   ⛔ AN AUDIO-ONLY VARIANT IS A PIXEL DUPLICATE. The measured lever ranking is
   rake > grade > camera > bed > per-cut layout, so all five move together.
   ⛔ A BIG PAN IS NOT LUMA-NEUTRAL and a tilt reads as a mistake: the cameras
   are LEVEL and inside 5% of scale (reel 120 shipped a 1.25 push and a 3-degree
   roll and Alex rejected both on sight). Separation is bought from the rake,
   the grade, the per-cut LAYOUT and a different HOOK. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.010, rot: 0 },
  amber: { dx: -40, dy: 8, s: 1.040, rot: 0 },
  steel: { dx: 44, dy: -6, s: 1.045, rot: 0 },
};
/* ⛔ `hue-rotate` and `saturate` are BANNED as variant levers — they drag the
   CAST off the house clay. Separation comes from CONTRAST, which pivots at
   mid-grey so it lifts frame 0 AND drops the shadows. */
export const GRADE: Record<Variant, string> = {
  house: "saturate(1.06) contrast(1.03)",
  amber: "saturate(1.06) contrast(1.09) brightness(1.02)",
  steel: "saturate(1.06) contrast(1.12) brightness(0.99)",
};
/** ⛔ A RAKE PHASE IS MODULO THE BAND PITCH. Pitch = (1012+420)/n, so with
    n = 7/6/9 the pitches are 204.6 / 238.7 / 159.1 — these offsets are spread
    across a pitch, not across the panel. */
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.32, steel: 0.74 };
const RAKE_X: Record<Variant, number> = { house: 0, amber: 78, steel: -54 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 6, steel: 9 };
/** per-cut layout nudges — the axis a perceptual hash reads hardest */
const LAY: Record<Variant, { a: number; b: number; c: number }> = {
  house: { a: 0, b: 0, c: 0 },
  amber: { a: -24, b: 28, c: -18 },
  steel: { a: 26, b: -22, c: 20 },
};
/** a different mirror SUBSET per cut, so every PAIRING differs structurally */
const MIRROR: Record<Variant, number[]> = { house: [], amber: [2, 8], steel: [5, 9] };
export const mir = (v: Variant, s: number) => MIRROR[v].includes(s);

/* =========================================================================
   ⭐⭐⭐ SHOTS — the cut structure.

   Measured on the delivered mp4s: 132 JUDGE one cut every 1.33s · 119 OX 1.69 ·
   94 AGENCY 1.70. This reel: 20 hard cuts over 35.27s = one every 1.76s, and
   every one is a different FRAMING of the SAME continuing action.
   ⛔ A CUT IS NOT AN EVENT (§2) — no shot re-states its predecessor.
   ⛔ NO SHOT UNDER 0.7s (21 frames).
   ⛔ NEVER TWO CONSECUTIVE ZOOM-ONLY SHOTS: every punch moves the centre too.
   ⛔ AND EACH CUT GETS ITS OWN EDIT — giving all three variants the same shot
   list synchronises them and the dHash collapses (reel 135 fell to 7 bits).
   ====================================================================== */
export type Shot = { at: number; s: number; x: number; y: number };
export const shotsFor = (v: Variant, base: Shot[]): Shot[] =>
  base.map((sh, i) => {
    if (v === "house") return sh;
    const first = i === 0;
    return v === "amber"
      ? { at: first ? 0 : sh.at - 5, s: sh.s * (first ? 1.07 : 1.09),
          x: first ? 62 : -sh.x * 0.8, y: first ? -28 : sh.y * 1.22 }
      : { at: first ? 0 : sh.at + 7, s: sh.s * (first ? 1.04 : 0.94),
          x: first ? 128 : sh.x * 0.5 - 96, y: first ? -32 : sh.y * 0.6 };
  });
export const shotAt = (f: number, list: Shot[]): Shot => {
  let cur = list[0];
  for (const sh of list) if (f >= sh.at) cur = sh;
  return cur;
};
/** the cut frames of every scene, exported so the SFX bank lands a transient on
    the structural ones and the cut detector can be checked against intent */
export const CUTS: Record<string, number[]> = {
  S0: [0, 67, 102], S1: [0], S2: [0, 62], S3: [0, 44], S4: [0, 48, 104], S5: [0, 40],
  S6: [0, 46, 84], S7: [0], S8: [0, 48], S9: [0, 34, 118], S10: [0],
};


/* =========================================================================
   S0 · THE SESSION — the hook.  135 frames.  3 shots.
   "The rumors are true, Claude is secretly getting distracted, skipping your
    tasks, and lying to you about it."

   ⭐ MECHANISM: **WANDER.** A body leaves the row it is standing at, and the
   row gets ticked anyway. The object he leaves it for is a NOTIFICATION, which
   is what actually distracts an agent and is a thing this product has.

   ⭐⭐⭐ THE FOUR VERBS OF THE SENTENCE ARE FOUR DRAWN EVENTS, ON THEIR OWN
   FRAMES. Rev 1 measured 2.46 motion in its third quarter because every event
   finished by f76 and the two most important verbs had nothing on them at all.
   The word times are measured, not guessed:
     "distracted"  f50-66   the toast crosses and he turns after it
     "skipping"    f71-92   THREE rows tick themselves, f68 / f80 / f93
     "lying"       f101-132 an EMPTY answer card runs the rail, and the
                            DONE chip fires a second time over it
   ⛔ THE GATES RIDE THE TODO LIST, THE PROMPT RAIL AND THE SESSION BAR, never
   a dark prop, which is what lets the pane wall stay near-black across the top
   third and hold the reel's biggest value spread.
   ====================================================================== */
export const PASS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const L = LAY[v];
  const OP: Record<Variant, number> = { house: 0, amber: 0, steel: 2 };
  const o = OP[v];

  /* the notification crosses the WHOLE panel — LARGE x BRIGHT x FAST, and it
     means something: it is the thing he follows instead of the row. */
  const toast = E(f, o + 2, o + 88, 132, 1150, LIN);
  const look = E(f, o + 8, o + 16, 0, 1, OUT);
  /* THE TICK HE DID NOT EARN */
  const reach = E(f, o + 14, o + 20, 0, 1, OUT);
  const tick = E(f, o + 20, o + 24, 0, 1, IN_Q);
  const ticked = f >= o + 24;
  /* THE DONE CHIP — the lie, and the loudest beat of the hook */
  const chip = f >= o + 30 ? Math.exp(-(f - o - 30) / 4.5) : 0;
  /* HIS WALK — after the notification, and he never looks back */
  const walk = E(f, o + 24, o + 66, 0, 356, IO);
  /* the answer leaving, two of six rows filled */
  const ship = E(f, o + 32, o + 76, 0, 1, IN_Q);

  /* ⭐⭐⭐ "SKIPPING YOUR TASKS" IS AN ARRIVAL RUN. Three rows tick themselves
     onto the pile across exactly f68-93, each a cream slab crossing ~600px of a
     dark panel, and the pile's COUNT goes up on every one — an arrival, with a
     number that changes (`feedback_hold_needs_arrivals_not_travel`). */
  const ARR = [68, 80, 93];
  const arrived = ARR.filter((a) => f >= o + a).length;
  const fallK = (a: number) => E(f, o + a - 17, o + a, 0, 1, IN_Q);

  /* ⭐⭐⭐ "LYING TO YOU ABOUT IT" IS AN EMPTY ANSWER. It runs the prompt rail
     right to left, growing 190 -> 490px, and is cropped by the bottom edge at
     the end instead of dropping out of the visible band the way rev 1's did. */
  const lie = E(f, o + 100, o + 134, 0, 1, IN_Q);
  const chip2 = f >= o + 101 ? Math.exp(-(f - o - 101) / 5) : 0;

  const jolt = [24, ...ARR].reduce((a, at) => Math.max(a, f >= o + at ? Math.exp(-(f - o - at) / 5) : 0), 0);

  /* THE COST — failing lines stacking on the wall he is not looking at. Rev 1's
     Hitchcock clock, in this world's own material. It SPREADS: a second stack
     at f78 and a third at f92, so the back half keeps gaining area. */
  const err1 = E(f, o + 36, dur, 0, 1, LIN);
  const err2 = E(f, o + 78, dur, 0, 1, LIN);
  const err3 = E(f, o + 92, dur, 0, 1, LIN);
  const ctx = 1 - E(f, 0, dur, 0, 0.55, LIN);

  const devX = 300 + walk + L.a * 0.4;

  /* ⭐⭐⭐ THREE SHOTS. Measured: the delivered hooks of the eight reels this
     repo has shipped run 9.33 to 17.80 mean motion, and a single locked framing
     could not reach the band. The cuts sit in MEASURED gaps between words: f67
     is the gap after "distracted," (ends f66) before "skipping" (f71); f102 is
     inside "lying" (f101-105), landing on the word it illustrates.
     ⛔ 67 / 35 / 33 frames = 2.23s · 1.17s · 1.10s, all over the 0.7s floor. */
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.14, x: 0, y: 22 },
    { at: 67, s: 1.30, x: -190, y: 40 },
    { at: 102, s: 1.18, x: 96, y: 48 }]);
  const sh = shotAt(f, SHOT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.40}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="none"
          rake={0.09 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={3.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={ctx} run={1} />

        {/* ⛔ THE NEAR-BLACK MASS, AND IT IS FURNITURE: a rack of dormant panes
            across the top third, cropped by the frame. */}
        <PaneWall f={f} z={20} y0={12} h={168} n={6} lit={[1, 4]} signLit={1} />

        {/* the cost, on the wall behind him, growing to the cut */}
        <ErrStack x={300 + L.b * 0.3} y={470} f={f} at={o + 36} k={err1} z={58} n={15} s={1.05} />
        <ErrStack x={392 + L.b * 0.3} y={452} f={f} at={o + 78} k={err2} z={57} n={12} s={0.9} />
        <ErrStack x={162 + L.b * 0.3} y={462} f={f} at={o + 92} k={err3} z={56} n={11} s={0.82} />

        {/* THE DISTRACTION — a notification crossing the entire panel */}
        <Toast x={toast} y={GY - 40} s={0.92} z={50} f={f} hue={SKY} />

        {/* THE PROMPT RAIL running toward camera */}
        <PromptRail f={f} z={70} topY={632} lampBarY={214} lamps={[1, 1, 1]}
          lampX={[386 + L.c * 0.3, 536 + L.c * 0.3, 686 + L.c * 0.3]} dx={L.c * 0.2} />

        {/* ⭐⭐ THE FRAME-0 CLAIM PLATE, AND IT IS THE TODO LIST — the measured IG
            lever: a cream plate in the middle third at frame 0, carrying the
            real mark and one big number. It is not an overlay; it is the object
            the whole reel is about. It leaves at f14 and the STAND stays. */}
        {!ticked && (
          <TodoList x={636 + L.c * 0.4 - reach * 40} y={286 - reach * 26} w={292} h={392} z={78} f={f}
            ticks={[true, true, false, false, false, false]} big={`${R.done}/${R.tasks}`} sub="TODO"
            stand rot={-2 + reach * 9} hard={2} />
        )}
        <div style={{ position: "absolute", left: 636 + L.c * 0.4 + 100, top: 662, width: 88, height: 18,
          zIndex: 76, borderRadius: "50%",
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)}, ${dkh(STEEL, 0.34)})` }} />

        {/* THE VILLAIN — the pile of rows ticked without being run */}
        <TickPile x={845 + L.c * 0.4} y={GY - 96} s={1.38} z={80} f={f} jolt={jolt}
          slips={4 + arrived} />
        {/* the row currently ticking itself, in flight */}
        {reach > 0.02 && !ticked && (
          <div style={{ position: "absolute", left: 636 + L.c * 0.4 + (845 - 636) * tick - 90,
            top: 286 + 160 * tick, width: 190, height: 40, zIndex: 82, borderRadius: 4,
            background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
            border: `3px solid ${hexa(INK, 0.22)}`, boxShadow: SH,
            transform: `rotate(${-14 + tick * 30}deg)` }} />
        )}
        {ticked && <Puff x={845 + L.c * 0.4} y={GY - 96} f={f} at={o + 24} c="#E8DCC0" z={83} n={9} s={0.8} />}
        {ticked && <Ring x={845 + L.c * 0.4} y={GY - 88} f={f} at={o + 24} c={mxh(DIFFG, 0.4)} z={83} s={0.6} dur={14} />}

        {/* ⭐ THE SKIPPED ROWS ARRIVING — three of them, on the words */}
        {ARR.map((a) => {
          const k = fallK(a);
          return k > 0.02 && k < 1 ? (
            <div key={"ft" + a} style={{ position: "absolute", left: 800 + L.c * 0.4 - k * 39,
              top: -80 + k * 610, width: 190, height: 44, zIndex: 84, borderRadius: 4,
              background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
              border: `3px solid ${hexa(INK, 0.24)}`, boxShadow: SH,
              transform: `rotate(${-32 + k * 46}deg)`, display: "flex", alignItems: "center",
              gap: 8, paddingLeft: 8 }}>
              <CheckBox rel s={28} k={1} z={2} />
              <div style={{ width: 92, height: 7, borderRadius: 3, background: hexa(INK, 0.12),
                border: `1px dashed ${hexa(INK, 0.22)}` }} />
            </div>
          ) : null;
        })}
        {ARR.map((a) => f >= o + a && f < o + a + 16 ? (
          <React.Fragment key={"fp" + a}>
            <Puff x={845 + L.c * 0.4} y={GY - 96} f={f} at={o + a} c="#E8DCC0" z={86} n={7} s={0.7} />
            <Ring x={845 + L.c * 0.4} y={GY - 88} f={f} at={o + a} c={mxh(DIFFG, 0.4)} z={86} s={0.5} dur={12} />
          </React.Fragment>
        ) : null)}

        {/* THE DONE CHIP — the lie, twice. Left of frame, in the one region
            where nothing else ever moves. */}
        <DoneChip x={182 + L.c * 0.4} y={GY - 92} s={1.15} z={80} ring={Math.max(chip, chip2)} />
        {chip > 0.1 && <Ring x={182 + L.c * 0.4} y={GY - 104} f={f} at={o + 30} c={mxh(GOLD, 0.5)} z={84} s={0.7} dur={18} />}
        {chip2 > 0.1 && <Ring x={182 + L.c * 0.4} y={GY - 104} f={f} at={o + 101} c={mxh(GOLD, 0.5)} z={84} s={0.85} dur={22} />}

        {/* THE ANSWER — two of six, travelling toward camera and OUT of frame */}
        {ship > 0.001 && ship < 1 && (
          <AnswerCard x={506 + L.c * 0.3 - 40 + ship * 60} y={606 + ship * 250} w={230 + ship * 250}
            z={86} items={[true, true, false, false, false, false]} rot={ship * 6} />
        )}
        {/* ⛔ THE LIE, AND IT IS EMPTY. Same route, nothing on it, on the frames
            that say "lying to you about it." */}
        {lie > 0.001 && (
          <AnswerCard x={884 + L.c * 0.3 - lie * 474} y={556 + lie * 132} w={190 + lie * 300}
            z={88} items={[false, false, false, false, false, false]} rot={-lie * 10} bad={1} />
        )}

        {/* THE CLAUDE — he is the subject, and what he DOES is leave */}
        <Contact x={devX} y={GY - 6} w={196} o={0.36} z={44} />
        <Dev f={f} x={devX} y={GY} i={0} size={286} z={62} at={o - 14} loop={3}
          gaze={look * 1.4} extra={{ glasses: 1 }}
          shock={E(f, o + 8, o + 14, 0, 0.5, OUT) - E(f, o + 20, o + 30, 0, 0.5, IO)}
          cheer={E(f, o + 96, o + 106, 0, 1, BACK) - E(f, o + 128, dur, 0, 1, IO)} />
        {walk > 4 && walk < 350 && (
          <Steam x={devX} y={GY - 300} f={f} at={o + 26} n={5} z={64} s={0.7} c="#D8CFC0" rate={0.9} />
        )}

        {/* ⛔ THE OCCLUDER — a mass cropped by the panel edge, IN FRONT. */}
        <PaneStack x={W - 40 + L.c * 0.2} y={H - 6} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · THE CARD.  49 frames.  "And Anthropic actually admitted it."
   ⛔ NO LOGO, NO QUOTE, NO SENTENCE IN ANYBODY'S MOUTH. What arrives is the
   NAME of an evaluation category Anthropic runs on its own models, with its
   source line under it — the same receipt reel 120 used, in a new object.
   ⭐ The card DROPS down the session and LANDS: an arrival with a cost, not a
   fade-in, and he stiffens on the landing frame.
   ====================================================================== */
export const CARD: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("sysc");
  const L = LAY[v];
  const drop = E(f, 2, 16, 0, 1, IN_Q);
  const land = f >= 16 ? Math.exp(-(f - 16) / 5) : 0;
  const open = E(f, 18, 30, 0, 1, OUT);
  const lit = E(f, 20, 26, 0, 1, LIN);
  const read = E(f, 30, dur, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.52}>
      <Cam x={L.a * 0.4} y={0} s={1.06} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="none"
          rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.2} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={4} z={5} lift={1.0} ctx={0.7} run={read} />
        <PaneWall f={f} z={20} y0={4} h={140} n={5} lit={[2]} signLit={lit} />
        {/* the shaft it comes down */}
        <div style={{ position: "absolute", left: 506 - 150 + L.b * 0.3, top: 96, width: 300,
          height: 420, zIndex: 18, background: `linear-gradient(180deg, ${hexa(p.grit, 0.7)}, transparent)` }} />
        <SysCard x={506 + L.b * 0.4} y={200 + drop * 200 + land * 14} w={452} z={80}
          open={open} lit={lit} />
        <Ring x={506 + L.b * 0.4} y={410} f={f} at={16} c={mxh(TEAL, 0.4)} z={84} s={0.9} dur={18} />
        {land > 0.1 && <Puff x={506 + L.b * 0.4} y={418} f={f} at={16} c="#CFE8F0" z={84} n={10} s={0.9} />}
        <PromptRail f={f} z={70} topY={640} lampBarY={214} lamps={[1, 1, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#7E939C" />
        <Contact x={252 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={252 + L.a * 0.3} y={GY} i={0} size={278} z={62} at={-14} loop={3}
          extra={{ glasses: 1 }} gaze={0.9} shock={E(f, 16, 22, 0, 0.7, OUT) - E(f, 30, 44, 0, 0.7, IO)} />
        <PaneStack x={W - 26 + L.c * 0.2} y={H - 4} n={5} z={94} s={0.85} />
        <Edge side="r" c={dkh(p.floor2, 0.34)} w={80} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · THE QUEUE.  109 frames.  2 shots.
   "So if you notice Claude keeps dodging the hard parts of your prompts, you
    aren't crazy."
   ⭐ FOUR PASSES OF THE SAME ACTION, ASCENDING, ACROSS THE FULL BEAT. Rev 1 ran
   three and its last quarter measured 4.11 — "arrives then sits", the exact
   defect the tail audit exists for. The line is called KEEPS dodging, so the
   honest fix was a FOURTH pass, not a longer third one.
   ⭐ WHAT HE DODGES IS THE ROW THAT NEEDS A COMMAND RUN — `TASKS[i].needsRun`,
   the one table, so the hard row means the same thing in every scene.
   ====================================================================== */
export const QUEUE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("queue");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.00, x: 0, y: 0 },
    { at: 62, s: 1.24, x: -190, y: -40 }]);
  const sh = shotAt(f, SHOT);
  const flip = mir(v, 2);
  const MX = (x: number) => (flip ? W - x : x);

  const AT = [4, 24, 44, 78];
  const dodge = AT.reduce((a, at) =>
    a + (E(f, at, at + 7, 0, 1, OUT) - E(f, at + 12, at + 22, 0, 1, IO)), 0);
  const rowX = (i: number) => E(f, AT[i], AT[i] + 14, 1040, 640 - i * 8, IO);
  const parked = (i: number) => f >= AT[i] + 14;
  const shipK = (i: number) => E(f, AT[i] + 10, AT[i] + 26, 0, 1, IN_Q);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={1} kind="shelf" overhead="lampbar"
          rake={0.14 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.4} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={2} z={5} lift={1.0} ctx={0.85} run={1} />
        <PaneWall f={f} z={20} y0={6} h={150} n={6} lit={[0, 3]} signLit={0.9} />

        {/* the prompt cards coming down the rail. ⛔ THE HARD ONE IS THE DARKEST
            OBJECT ON A BRIGHT RAIL — name which side of the contrast it is on. */}
        {[0, 1, 2, 3].map((i) => (
          f >= AT[i] - 2 ? (
            <div key={"pc" + i} style={{ position: "absolute",
              left: MX(parked(i) ? 640 - i * 8 : rowX(i)) - 143, top: 476 - (parked(i) ? i * 30 : 0),
              width: 286, height: 106, zIndex: 58 + i, borderRadius: 10,
              background: TASKS[(i + 2) % 6].needsRun
                ? `linear-gradient(176deg, ${TERM2}, ${TERM})`
                : `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
              border: `3px solid ${hexa(INK, TASKS[(i + 2) % 6].needsRun ? 0.6 : 0.2)}`,
              boxShadow: SH_D, display: "flex", alignItems: "center", gap: 10, paddingLeft: 12 }}>
              <CheckBox rel s={48} k={0} z={2} />
              <div style={{ flex: 1 }}>
                <div style={{ width: "72%", height: 11, borderRadius: 5, marginBottom: 9,
                  background: hexa(TASKS[(i + 2) % 6].needsRun ? "#FFFFFF" : INK, 0.40) }} />
                <div style={{ width: "46%", height: 8, borderRadius: 4,
                  background: hexa(TASKS[(i + 2) % 6].needsRun ? "#FFFFFF" : INK, 0.20) }} />
              </div>
              {TASKS[(i + 2) % 6].needsRun && (
                <div style={{ width: 20, height: 20, marginRight: 12, background: DIFFR,
                  transform: "rotate(45deg)" }} />
              )}
            </div>
          ) : null
        ))}
        <div style={{ position: "absolute", left: 300, right: -40, top: 592, height: 16, zIndex: 52,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.4)}, ${dkh(STEEL, 0.36)})` }} />
        {/* ⛔ THE QUEUE HAS TO BE THERE ON FRAME 1. Rev 2's first pass opened on
            an empty floor and waited for the first card at f4 — a wide shot of a
            room is not a before-state (`feedback_hook_simplicity` applies to
            every scene, not just the open). Five more prompts are already
            stacked at the far end, waiting, and they SHUNT left as each one is
            taken so the queue is never still. */}
        {Array.from({ length: 5 }, (_, i) => {
          const taken = [0, 1, 2, 3].filter((k) => f >= AT[k] - 2).length;
          const sx = MX(946 + i * 74) - taken * 74 + L.b * 0.3;
          return (
            <div key={"qq" + i} style={{ position: "absolute", left: sx - 34, top: 508, width: 68,
              height: 92, zIndex: 50, borderRadius: 7,
              background: `linear-gradient(176deg, ${UISH}, ${UISH2})`,
              border: `3px solid ${hexa(INK, 0.22)}`, boxShadow: SH,
              transform: `rotate(${(rnd(i * 3.1, 1) - 0.5) * 5}deg)` }}>
              <div style={{ position: "absolute", left: 9, top: 10, width: 22, height: 22,
                borderRadius: 4, border: `3px solid ${hexa(INK, 0.34)}` }} />
              <div style={{ position: "absolute", left: 9, right: 9, top: 44, height: 6,
                borderRadius: 3, background: hexa(INK, 0.22) }} />
              <div style={{ position: "absolute", left: 9, width: 30, top: 58, height: 6,
                borderRadius: 3, background: hexa(INK, 0.14) }} />
            </div>
          );
        })}

        {/* HE SIDESTEPS. 132px, body leaning away, and the card passes where he was. */}
        <Contact x={MX(392) + dodge * (flip ? 132 : -132) + L.a * 0.3} y={GY - 6} w={188} o={0.34} z={44} />
        <Dev f={f} x={MX(392) + dodge * (flip ? 132 : -132) + L.a * 0.3} y={GY} i={0} size={282}
          z={62} at={-14} loop={1} extra={{ glasses: 1 }} flip={flip}
          gaze={dodge * (flip ? 1.2 : -1.2)} />

        {/* the half-answers he DOES ship, one per dodge, toward camera */}
        {[0, 1, 2, 3].map((i) => (
          shipK(i) > 0.001 && shipK(i) < 1 ? (
            <AnswerCard key={"sa" + i} x={506 + L.c * 0.3 + shipK(i) * 90 * (i - 1)}
              y={612 + shipK(i) * 190} w={200 + shipK(i) * 190} z={80}
              items={[true, true, false, true, i > 0, i > 1]} rot={shipK(i) * 5 * (i - 1)} />
          ) : null
        ))}

        {/* SHOT B: you at the rail, holding the list against the answer */}
        {f >= 62 && (<>
          <TodoList x={168 + L.b * 0.4} y={218} w={252} h={340} z={86} f={f}
            ticks={[true, true, false, true, true, true]} hard={2} rot={-5} sub="TODO"
            big={`5/${R.tasks}`} struck={[false, false, false, true, true, true]} />
          <Contact x={700 + L.a * 0.3} y={GY - 6} w={200} o={0.32} z={44} />
          <Crew f={f} x={700 + L.a * 0.3} y={GY} i={2} size={294} z={64} at={62} loop={3} />
        </>)}

        <PaneStack x={W - 34 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.88} />
        <Edge side={flip ? "r" : "l"} c={dkh(p.floor2, 0.34)} w={84} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE INSTALL.  90 frames.  2 shots.
   "But a top GitHub developer just dropped a fix called the ADHD skill."
   ⭐ THE FILE IS THE OBJECT AND IT INSTALLS ON SCREEN: it rides down, lands,
   the install bar fills across the beat, and the stencil lights. That bar is
   the "becomes the thing it replaces" move — the card is consumed and what it
   leaves behind is the gate the next scene runs on.
   ⛔ NO REPO PATH, NO OWNER, NO STAR COUNT, NO INSTALL COMMAND (NAME_BANNED).
   ====================================================================== */
export const INSTALL: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("install");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.02, x: 0, y: -60 },
    { at: 44, s: 1.10, x: 0, y: 90 }]);
  const sh = shotAt(f, SHOT);
  const ride = E(f, 4, 38, 0, 1, IN_Q);
  const land = f >= 38 ? Math.exp(-(f - 38) / 5) : 0;
  const lit = E(f, 58, 64, 0, 1, LIN);
  const install = E(f, 44, dur - 6, 0, 1, IO);
  const lift = E(f, 66, 80, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.54}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="none"
          rake={0.11 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={5} z={5} lift={0.9} ctx={0.62} run={install} />
        <PaneWall f={f} z={20} y0={0} h={132} n={5} lit={[1]} signLit={lit} />
        {/* the shaft */}
        <div style={{ position: "absolute", left: 506 - 130 + L.b * 0.3, top: 84, width: 260,
          height: 460, zIndex: 18,
          background: `linear-gradient(180deg, ${hexa(p.back2, 0.34)}, transparent 78%)` }} />
        <SkillFile x={506 + L.b * 0.4} y={210 + ride * 250 + land * 16 - lift * 60}
          w={272} z={80} open={install} rot={-3 + lift * 5} lit={lit} />
        {land > 0.05 && <Ring x={506 + L.b * 0.4} y={470} f={f} at={38} c={mxh(VIOLET, 0.4)} z={84} s={1.0} dur={20} />}
        {land > 0.05 && <Puff x={506 + L.b * 0.4} y={476} f={f} at={38} c="#C8CCF0" z={84} n={11} s={0.95} />}
        <PromptRail f={f} z={70} topY={640} lampBarY={214} lamps={[1, install > 0.5 ? 1 : 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#6E74A8" />
        <Contact x={772 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={772 + L.a * 0.3} y={GY} i={0} size={280} z={62} at={-14} loop={2}
          extra={{ glasses: 1 }} cheer={E(f, 64, 74, 0, 1, BACK)} gaze={-0.8} />
        <PaneStack x={-10 + L.c * 0.2} y={H - 4} n={5} z={94} s={0.85} />
        <Edge side="r" c={dkh(p.floor2, 0.34)} w={82} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE GATE.  129 frames.  3 shots.
   "It stops the AI from losing focus and taking shortcuts by forcing it to
    prove its work."
   ⭐⭐ DRAW THE MECHANISM AND LET IT FAIL FIRST (ANIMATION-QUALITY §12). He
   shoves an answer at the bar FOUR times, each harder, and it does not go
   through. The lamp stays red. Only then does he walk back to the row.
   ⛔ REV 1's THIRD SHOT PULLED BACK TO s=1.00 exactly when the last beat played
   and its fourth quarter measured 3.50; it now cuts LATER and TIGHTER, onto the
   row, and the cut itself lands inside the quarter that was failing.
   ====================================================================== */
export const GATE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.04, x: 0, y: 20 },
    { at: 48, s: 1.30, x: -110, y: -120 },
    { at: 104, s: 1.34, x: 210, y: -30 }]);
  const sh = shotAt(f, SHOT);

  const toast = E(f, 2, 44, 1100, -180, LIN);
  const look = E(f, 6, 14, 0, 1, OUT) - E(f, 34, 46, 0, 1, IO);
  const tries = [20, 34, 50, 66];
  const shove = tries.reduce((a, at) =>
    Math.max(a, E(f, at, at + 8, 0, 1, OUT) - E(f, at + 10, at + 18, 0, 1, IO)), 0);
  const give = E(f, 84, 96, 0, 1, OUT);
  /* ⛔ AND HE WALKS THE RIGHT WAY. He ends AT the row he skipped, not across
     the room from it — rev 1 sent him 300px away from the thing he then lifted. */
  const back = E(f, 92, 114, 0, -232, IO);
  const openRow = E(f, 112, 124, 0, 1, OUT);
  const ruin = E(f, 118, dur, 0, 1, LIN);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={1} kind="shelf" overhead="lampbar"
          rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.6} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={6} z={5} lift={1.0} ctx={0.5} run={1} />
        <PaneWall f={f} z={20} y0={4} h={150} n={6} lit={[2, 5]} signLit={1} />

        {/* the row he walked away from, and what is under it */}
        {openRow > 0.02 && (
          <div style={{ position: "absolute", left: 150 + L.b * 0.3 - 84, top: 402 - openRow * 132,
            width: 168, height: 40, zIndex: 60, borderRadius: 6,
            background: `linear-gradient(176deg, #FFFFFF, ${UISH2})`,
            border: `3px solid ${hexa(INK, 0.24)}`, boxShadow: SH,
            transform: `rotate(${openRow * -16}deg)`, display: "flex", alignItems: "center",
            gap: 8, paddingLeft: 8 }}>
            <CheckBox rel s={26} k={1} z={2} />
            <div style={{ width: 82, height: 7, borderRadius: 3, background: hexa(INK, 0.12) }} />
          </div>
        )}
        {ruin > 0.02 && <ErrStack x={150 + L.b * 0.3} y={470} f={f} at={118} k={ruin} z={57} n={16} s={1.1} />}
        {openRow > 0.5 && <Ring x={150 + L.b * 0.3} y={404} f={f} at={118} c={mxh(DIFFR, 0.4)} z={61} s={1.0} dur={16} />}

        {/* the callback: another notification crosses, behind everything */}
        <Toast x={toast} y={GY + 18} s={0.62} z={29} f={f} hue={VIOLET} />

        {/* ⭐ THE STOP HOOK. It is DOWN from frame 1 — the before state is
            legible without waiting — and the lamp is RED the whole beat. */}
        <StopHook x={666 + L.b * 0.4} y={GY - 30} w={520} z={84} down={1} lamp={0} f={f}
          shake={shove} />

        {/* the answer he keeps shoving at it */}
        <AnswerCard x={666 + L.b * 0.4 - 250 + shove * 150} y={GY - 190} w={230}
          z={86} items={[true, true, false, false, false, false]} rot={shove * 8} bad={1} />
        {shove > 0.6 && <Puff x={666 + L.b * 0.4 - 60} y={GY - 190} f={f} at={f} c="#F0D8B0" z={88} n={5} s={0.6} />}

        <PromptRail f={f} z={70} topY={648} lampBarY={214} lamps={[1, 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#B49A6A" />

        {/* HE SHOVES. Body compresses, feet slide, effort off the head. */}
        <Contact x={402 + L.a * 0.3 + shove * 26 + back} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={402 + L.a * 0.3 + shove * 26 + back} y={GY} i={0} size={288} z={62} at={0}
          loop={1} extra={{ glasses: 1 }} gaze={look}
          shock={shove * 0.5 + give * 0.4} />
        {shove > 0.3 && (
          <Steam x={402 + L.a * 0.3 + shove * 26} y={GY - 306} f={f} at={20} n={9} z={70} s={0.9}
            c="#E8D8B8" rate={1.4} />
        )}

        <PaneStack x={W - 20 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={84} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · THE LEDGER.  96 frames.  2 shots.
   "Instead of just saying a task is done, the ADHD skill builds a ledger."
   ⭐ THE SUBSTITUTION IS THE BEAT: the pile of self-ticked rows goes in the bin,
   and the SAME object comes back as a table with CHECK and EXPECT columns. One
   object replacing another says both the noun and the verb.
   ====================================================================== */
export const LEDGER: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("ledger");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.06, x: 0, y: 10 },
    { at: 40, s: 1.20, x: -120, y: 54 }]);
  const sh = shotAt(f, SHOT);
  const bin = E(f, 8, 26, 0, 1, IN_Q);
  const rows = Math.min(6, Math.floor(E(f, 24, 78, 0, 6.4, LIN)));
  /* ⛔ MEASURED: this scene STALLS in its last quarter. The table finished
     printing at f78 and then sat there while a `tear` value drove nothing but a
     face. The sheet now actually comes OFF and travels to the rail it gets
     clipped to — an arrival with a distance (§11: an ACTION IS A DISTANCE). */
  const tear = E(f, 74, 88, 0, 1, IN_Q);
  const clip = E(f, 86, 94, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.44}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={7} z={5} lift={1.05} ctx={0.6} run={1} />
        <PaneWall f={f} z={20} y0={6} h={146} n={6} lit={[1, 4]} signLit={1} />

        {/* the pile going in the bin */}
        {bin < 1 && (
          <TickPile x={216 + L.b * 0.4 + bin * 90} y={GY - 120 + bin * 150} s={1.0 - bin * 0.3}
            z={80} f={f} jolt={0} slips={7} struck={bin} />
        )}
        <Bin x={264 + L.b * 0.4} y={GY + 16} s={0.9} z={78} />
        {bin > 0.9 && <Puff x={264 + L.b * 0.4} y={GY - 90} f={f} at={26} c="#CFE4D8" z={82} n={9} s={0.8} />}

        {/* THE LEDGER PRINTING, row by row, across the whole beat */}
        {/* the rail it gets clipped to, waiting */}
        <div style={{ position: "absolute", left: 300 + L.c * 0.4, right: 96 - L.c * 0.4, top: 150,
          height: 16, zIndex: 74, borderRadius: 4,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)}, ${dkh(STEEL, 0.38)})` }} />
        <LedgerTable x={666 + L.c * 0.4 - tear * 200} y={214 - tear * 44} w={392} z={82} f={f}
          rows={rows} title />
        {clip > 0.02 && (
          <div style={{ position: "absolute", left: 466 + L.c * 0.4 - 26, top: 138,
            width: 52, height: 44, zIndex: 88, borderRadius: 6,
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.24)}, ${dkh(BRASS, 0.3)})`,
            border: `3px solid ${hexa(INK, 0.3)}`, transform: `scale(${clip})` }} />
        )}
        {clip > 0.4 && <Ring x={466 + L.c * 0.4} y={160} f={f} at={88} c={mxh(GOLD, 0.45)} z={90} s={0.6} dur={14} />}
        {clip > 0.4 && <Puff x={466 + L.c * 0.4} y={168} f={f} at={88} c="#E8DCC0" z={90} n={8} s={0.7} />}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          rows === i + 1 ? (
            <Ring key={"lr" + i} x={666 + L.c * 0.4} y={252 + i * 41} f={f} at={f} c={mxh(GREEN, 0.4)}
              z={86} s={0.42} dur={9} />
          ) : null
        ))}

        <PromptRail f={f} z={70} topY={638} lampBarY={214} lamps={[1, 1, rows >= 6 ? 1 : 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#B6D8C8" />
        <Contact x={452 + L.a * 0.3} y={GY - 6} w={192} o={0.34} z={44} />
        <Dev f={f} x={452 + L.a * 0.3} y={GY} i={0} size={284} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} gaze={0.9} cheer={tear} />
        <PaneStack x={W - 30 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.88} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={84} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · THE RUN.  115 frames.  3 shots.  ⭐ THE MECHANISM SCENE.
   "Basically, the AI has to run commands and verify the output before giving
    you the answer."
   ⭐ FOUR DISCRETE BEATS, OVERLAPPING, NEVER ONE TWEEN:
     run a command   -> the COMMAND types, character by character
     read the output -> the OUTPUT prints, line by line
     verify          -> the EXIT CODE stamps the row
     only then       -> the answer may leave
   ⛔ CUT TO THE MEASURED WORD ONSETS: "run" is at root f633 = local 25,
   "verify" at 654 = local 46, "before giving" at 689 = local 81.
   ⛔ REV 1's THIRD QUARTER MEASURED 2.19 — every beat correct and every beat
   TINY. The OUTPUT BLOCK is now the biggest object on the set and it prints
   through exactly that window.
   ====================================================================== */
export const RUNSC: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.18, x: 60, y: -60 },
    { at: 46, s: 1.08, x: -150, y: 40 },
    { at: 84, s: 1.00, x: 0, y: 0 }]);
  const sh = shotAt(f, SHOT);

  const type = E(f, 25, 40, 0, 1, LIN);
  const out = E(f, 40, 76, 0, 1, LIN);
  const stamp1 = E(f, 60, 68, 0, 1, IN_Q);
  const stamp2 = E(f, 76, 84, 0, 1, IN_Q);
  const green = f >= 86;
  const ship = E(f, 92, dur, 0, 1, IN_Q);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.52}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={1} kind="shelf" overhead="none"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.8} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={8} z={5} lift={0.95} ctx={0.42} run={out} />
        <PaneWall f={f} z={20} y0={0} h={138} n={5} lit={[2]} signLit={1} />

        {/* the command, typing */}
        <CmdLine x={430 + L.b * 0.4} y={272} w={470} z={82} f={f} type={type} />
        {/* ⭐ THE OUTPUT — the biggest object on this set, printing through the
            quarter that used to be dead */}
        <OutputBlock x={430 + L.b * 0.4} y={352} w={470} z={80} k={out} seed={5} f={f} />
        {/* the exit codes, stamped */}
        <ExitStamp x={786 + L.c * 0.4} y={318} s={1.0} z={90} k={stamp1} />
        <ExitStamp x={786 + L.c * 0.4} y={438} s={0.9} z={90} k={stamp2} />
        {stamp1 > 0.6 && <Ring x={786 + L.c * 0.4} y={318} f={f} at={66} c={mxh(GOLD, 0.4)} z={91} s={0.95} dur={14} />}
        {stamp2 > 0.6 && <Ring x={786 + L.c * 0.4} y={438} f={f} at={82} c={mxh(GOLD, 0.4)} z={91} s={0.95} dur={14} />}
        {f >= 66 && f < 82 && <Puff x={786 + L.c * 0.4} y={318} f={f} at={66} c="#E8DCC0" z={91} n={8} s={0.75} />}
        {f >= 82 && f < 98 && <Puff x={786 + L.c * 0.4} y={438} f={f} at={82} c="#E8DCC0" z={91} n={8} s={0.75} />}

        {/* the ledger, filling as the codes land */}
        <LedgerTable x={192 + L.c * 0.4} y={186} w={286} z={70} f={f} rows={6}
          passed={[...(stamp1 > 0.9 ? [2] : []), ...(stamp2 > 0.9 ? [3] : [])]} title={false} />

        {green && <Ring x={606 + L.c * 0.4} y={172} f={f} at={86} c={mxh(GREEN, 0.5)} z={90} s={0.7} dur={18} />}

        {ship > 0.001 && ship < 1 && (
          <AnswerCard x={506 + L.c * 0.3 + ship * 40} y={604 + ship * 200} w={240 + ship * 220} z={90}
            items={[true, true, true, true, false, false]} rot={ship * 4} />
        )}

        <PromptRail f={f} z={70} topY={646} lampBarY={214} lamps={[1, 1, green ? 1 : 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#8A6A46" />
        <Contact x={676 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={676 + L.a * 0.3} y={GY} i={0} size={280} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} gaze={-0.9} cheer={E(f, 86, 96, 0, 1, BACK)} />
        <PaneStack x={-14 + L.c * 0.2} y={H - 4} n={5} z={94} s={0.86} />
        <Edge side="r" c={dkh(p.floor2, 0.34)} w={82} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE ASIDE.  37 frames.  "There is a catch though."
   ⭐ ONE IDEA, ONE SHOT, AND THE HERO IS ABSENT. The room says it: every pane
   goes amber at once and the context meter is nearly empty. 37 frames is 1.2s
   and two events is all it can hold.
   ====================================================================== */
export const ASIDE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("aside");
  const L = LAY[v];
  const warn = E(f, 4, 16, 0, 1, OUT);
  const drop = E(f, 20, dur, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.50}>
      <Cam x={L.a * 0.4} y={0} s={1.04} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={9} z={5} lift={1.0} ctx={0.16 + (1 - drop) * 0.2} run={1} />
        <PaneWall f={f} z={20} y0={4} h={144} n={6} lit={[0, 1, 2, 3, 4, 5]} signLit={1} />
        {/* the whole row goes amber at once — one arrival, frame-wide */}
        {[0, 1, 2, 3].map((i) => (
          <Pane key={"aw" + i} x={92 + i * 216 + L.b * 0.3} y={352} w={190} h={150} z={44} f={f}
            on={0.5 + warn * 0.5} run={warn} seed={i + 3} />
        ))}
        <WallClock x={506 + L.b * 0.4} y={224} s={1.15} z={62} f={f} rate={2.4} />
        <PromptRail f={f} z={70} topY={646} lampBarY={214} lamps={[1, 1, 1]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#A6803E" />
        <AnswerCard x={506 + L.c * 0.3 - drop * 30} y={624 + drop * 150} w={250 + drop * 150}
          z={86} items={[true, true, true, true, false, false]} rot={-drop * 5} />
        <PaneStack x={W - 24 + L.c * 0.2} y={H - 4} n={5} z={94} s={0.86} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={82} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE NIGHT.  80 frames.  2 shots.
   "Out of the box, it takes hours because it runs one task at a time."
   ⭐ THE NUMBER IS THE INFORMATION: ONE pane lit out of ten, and the lit one
   MOVES along the row as each row closes, so "one at a time" is a travelling
   fact rather than a caption. ⛔ No duration is printed anywhere (TIME_BANNED).
   ====================================================================== */
export const NIGHT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("night");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.02, x: 0, y: 0 },
    { at: 48, s: 1.16, x: -80, y: 40 }]);
  const sh = shotAt(f, SHOT);
  const flip = mir(v, 8);
  /* the lit lane steps: one closes, the next opens */
  /* ⛔ MEASURED 4.44 — STATIC, the weakest scene in the rebuild. Ten 84px panes
     with one lit and three states across 80 frames is a still frame with a lamp
     on it. Five steps now, the lit lane TRAVELS the full width, and a ledger row
     CLOSES on each step so every quarter has an arrival that costs something
     (`feedback_hold_needs_arrivals_not_travel`). */
  const step = Math.min(4, Math.floor(E(f, 6, 74, 0, 5.2, LIN)));
  const shunt = E(f, 34, 44, 0, 1, IO);
  const done = (i: number) => i < step;
  const closed = Array.from({ length: step }, (_, i) => i);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.56}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={1} kind="shelf" overhead="none"
          rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.4} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={10} z={5} lift={0.95} ctx={0.3} run={0.5} />
        <PaneWall f={f} z={20} y0={2} h={140} n={5} lit={[step % 5]} signLit={0.7} />
        {/* ⛔ MEASURED 5.40, STILL STATIC. Ten identical panes with one lit means
            NINE dark rectangles filling the middle of the frame and never
            changing — the scene was mostly a photograph of idleness, which is
            the right IDEA drawn the wrong way round. The queue is now a thin
            strip along the top and the ONE running lane is a HERO pane in the
            middle, printing hard, with a progress bar that creeps the whole
            beat. Same fact, and the thing that is working is the thing you can
            see working. */}
        {Array.from({ length: 10 }, (_, i) => (
          <Pane key={"np" + i} x={(flip ? W - 104 - i * 96 : 26 + i * 96) + L.b * 0.3} y={214}
            w={90} h={104} z={40 + i} f={f}
            on={i === step ? 1 : 0.14} run={0} done={done(i) ? 1 : 0} seed={i + 1} label={false} />
        ))}
        {/* the lane that is actually running */}
        <Pane x={286 + L.b * 0.35} y={356} w={432} h={244} z={58} f={f}
          on={1} run={1} seed={2} />
        {/* the progress bar that creeps across the whole beat */}
        <div style={{ position: "absolute", left: 306 + L.b * 0.35, top: 578, width: 392, height: 22,
          zIndex: 60, borderRadius: 11, background: hexa("#000", 0.5),
          border: `3px solid ${hexa("#FFFFFF", 0.24)}`, overflow: "hidden" }}>
          <div style={{ width: `${E(f, 4, dur - 4, 4, 96, LIN)}%`, height: "100%",
            background: `linear-gradient(90deg, ${dkh(CARET, 0.2)}, ${CARET})` }} />
        </div>
        {/* each step lands on the running pane */}
        {[0, 1, 2, 3, 4].map((i) => step === i + 1 ? (
          <Ring key={"ns" + i} x={502 + L.b * 0.35} y={478} f={f} at={f} c={mxh(CARET, 0.4)}
            z={62} s={0.8} dur={12} />
        ) : null)}
        <WallClock x={636 + L.b * 0.4} y={200} s={1.0} z={62} f={f} rate={3.2} />
        <Selector x={846 + L.c * 0.4} y={252} s={0.78} z={88} k={0} from={1} to={1} />
        <PromptRail f={f} z={70} topY={648} lampBarY={214} lamps={[1, 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#4A6690" />
        <Contact x={286 + L.a * 0.3 + shunt * 40} y={GY - 6} w={186} o={0.32} z={44} />
        <Dev f={f} x={286 + L.a * 0.3 + shunt * 40} y={GY} i={0} size={272} z={62} at={-14} loop={1}
          extra={{ glasses: 1 }} gaze={0.6} />
        <PaneStack x={W - 18 + L.c * 0.2} y={H - 4} n={5} z={94} s={0.84} />
        <Edge side={flip ? "r" : "l"} c={dkh(p.floor2, 0.34)} w={82} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE FAN-OUT.  154 frames.  3 shots.  ⭐ THE PAYOFF.
   "The trick is to tweak the instructions so it runs up to 10 sub-agents in
    parallel without them messing each other up."
   ⭐ THE NUMBER IS THE EVENT: the selector runs 1 -> 10 and the panes light in
   a staggered run, not all at once — a crowd doing one action needs SLOTS
   (`feedback_crowd_needs_slots_not_a_mark`), so stagger = cycle / slots.
   ⛔ "without them messing each other up" is drawn: each pane keeps its OWN
   row, and no two ever hold the same one.
   ====================================================================== */
export const FANOUT: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fanout");
  const L = LAY[v];
  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.00, x: 0, y: 0 },
    { at: 34, s: 1.16, x: -130, y: 40 },
    { at: 118, s: 1.06, x: 70, y: 20 }]);
  const sh = shotAt(f, SHOT);
  const flip = mir(v, 9);
  const turn = E(f, 18, 62, 0, 1, IO);
  const N = 10;
  /* stagger = cycle / slots */
  const openAt = (i: number) => 40 + i * 6;
  const runK = (i: number) => E(f, openAt(i), openAt(i) + 12, 0, 1, OUT);
  const doneK = (i: number) => E(f, openAt(i) + 40, openAt(i) + 52, 0, 1, OUT);
  const ship = E(f, 122, dur, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={1} kind="shelf" overhead="lampbar"
          rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={11} z={5} lift={1.05} ctx={0.55} run={1} />
        {/* ⛔ THE BRIGHTEST SCENE STILL NEEDS SOMETHING BLACK IN IT — rev 1's
            payoff had no dark mass and its p10 came back at 76.1. */}
        <PaneWall f={f} z={20} y0={0} h={150} n={6} lit={[0, 2, 3, 5]} signLit={1} />

        {/* THE TEN PANES, in two rows of five, opening in a staggered run */}
        {Array.from({ length: N }, (_, i) => {
          const col = i % 5, row = Math.floor(i / 5);
          const x = (flip ? W - 200 - col * 186 : 30 + col * 186) + L.b * 0.3;
          return (
            <React.Fragment key={"fp" + i}>
              <Pane x={x} y={228 + row * 194} w={172} h={170} z={44 + i} f={f}
                on={runK(i)} run={runK(i)} done={doneK(i)} seed={i + 1} />
              {doneK(i) > 0.5 && doneK(i) < 1 && (
                <Ring x={x + 86} y={228 + row * 194 + 85} f={f} at={openAt(i) + 46}
                  c={mxh(GREEN, 0.4)} z={90} s={0.5} dur={12} />
              )}
            </React.Fragment>
          );
        })}

        <Selector x={506 + L.c * 0.4} y={624} s={1.05} z={88} k={turn} from={1} to={R.agents} />
        {turn > 0.98 && <Ring x={506 + L.c * 0.4} y={624} f={f} at={62} c={mxh(GOLD, 0.5)} z={90} s={0.8} dur={20} />}

        {ship > 0.001 && (
          <AnswerCard x={506 + L.c * 0.3 - ship * 60} y={640 + ship * 120} w={240 + ship * 280}
            z={92} items={[true, true, true, true, true, true]} rot={ship * 5} />
        )}

        <PromptRail f={f} z={70} topY={664} lampBarY={214} lamps={[1, 1, 1]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} />
        <Contact x={846 + L.a * 0.3} y={GY - 6} w={188} o={0.32} z={44} />
        <Dev f={f} x={846 + L.a * 0.3} y={GY} i={0} size={272} z={64} at={-14} loop={2}
          extra={{ glasses: 1 }} cheer={E(f, 64, 76, 0, 1, BACK)} />
        <PaneStack x={-16 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.88} />
        <Edge side={flip ? "l" : "r"} c={dkh(p.floor2, 0.34)} w={84} z={92} kind="post" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · THE CTA.  64 frames.
   "Comment ADHD for the free setup."
   ⭐ THE KEYWORD IS TICKED, with the reel's own object, taken back from the
   villain: four checkboxes, one per spoken letter, and each one now carries a
   RECEIPT notch because it was earned.
   ⛔ REV 1's CTA measured 6.41, the weakest scene in the reel, because its one
   completed answer sat motionless for the whole beat. It leaves now.
   ====================================================================== */
export const CTA: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("close");
  const L = LAY[v];
  /* ⛔ THE KEYWORD LANDS ON ITS OWN WORD: "ADHD" is spoken at root f1000 =
     local 6, so the four letters tick at 6 / 12 / 18 / 24. */
  const LET = [6, 12, 18, 24];
  const done = (i: number) => f >= LET[i] + 4;
  const chip = f >= 40 ? Math.exp(-(f - 40) / 5) : 0;
  const send = E(f, 38, dur, 0, 1, IN_Q);
  /* ⛔ REV 1's CTA WAS THE WEAKEST SCENE AT 6.41 AND REV 2's WAS 5.97 WITH 52%
     HOLD — the four letters land by f28 and nothing happened until f38. The
     unproved pile is now THROWN across that gap: it lifts, it crosses 300px,
     and it lands in the bin on the frame the chime fires. */
  const toss = E(f, 28, 46, 0, 1, IN_Q);
  const KWY: Record<Variant, number> = { house: 236, amber: 202, steel: 264 };
  const strike = E(f, 30, 44, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Cam x={L.a * 0.3} y={0} s={1.0} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={1} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={12} z={5} lift={1.2} ctx={0.8} run={1} />
        <PaneWall f={f} z={20} y0={8} h={146} n={6} lit={[0, 1, 2, 3, 4, 5]} signLit={1} />

        {/* THE KEYWORD CARD — four checkboxes, ticked one per beat */}
        <div style={{ position: "absolute", left: SAFE3.cx - 250 + L.c * 0.4, top: KWY[v], width: 500,
          height: 200, zIndex: 84, borderRadius: 10, boxShadow: SH_D,
          background: `linear-gradient(176deg, #FFFFFF 0%, ${UISH} 55%, ${UISH2} 100%)`,
          border: `4px solid ${hexa(INK, 0.16)}` }}>
          <div style={{ position: "absolute", left: 22, top: 18, display: "flex", alignItems: "center", gap: 12 }}>
            <MarkTile rel d={44} z={2} />
            <span style={{ ...ui(28, 900), color: hexa(INK, 0.72), letterSpacing: 3 }}>COMMENT</span>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 84, display: "flex",
            justifyContent: "center", gap: 16 }}>
            {["A", "D", "H", "D"].map((ch, i) => (
              <div key={i} style={{ width: 96, height: 96, borderRadius: 10, position: "relative",
                border: `5px solid ${done(i) ? dkh(OKGREEN, 0.1) : hexa(INK, 0.4)}`,
                background: done(i) ? mxh(OKGREEN, 0.62) : "#FFFDF6",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: done(i) ? `inset 0 4px 0 ${hexa("#000", 0.2)}` : `inset 0 4px 6px ${hexa("#000", 0.14)}`,
                transform: `scale(${done(i) ? 1 : 0.94})` }}>
                <span style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: 62,
                  color: done(i) ? "#FFFFFF" : hexa(INK, 0.2) }}>{ch}</span>
                {done(i) && (
                  <div style={{ position: "absolute", right: -10, bottom: -8, width: 30, height: 34,
                    borderRadius: 4, background: `linear-gradient(180deg, ${UISH}, ${UISH2})`,
                    border: `2px solid ${hexa(INK, 0.3)}`, boxShadow: SH }} />
                )}
              </div>
            ))}
          </div>
        </div>
        {LET.map((at, i) => f >= at && f < at + 16 ? (
          <React.Fragment key={"pk" + i}>
            <Ring x={SAFE3.cx - 168 + i * 112 + L.c * 0.4} y={KWY[v] + 132} f={f} at={at + 2}
              c={mxh(GREEN, 0.45)} z={93} s={0.8} dur={14} />
            <Puff x={SAFE3.cx - 168 + i * 112 + L.c * 0.4} y={KWY[v] + 132} f={f} at={at + 2}
              c="#E8DCC0" z={93} n={7} s={0.7} />
          </React.Fragment>
        ) : null)}

        {/* the last unproved tick, struck out and thrown away */}
        <TickPile x={936 + L.c * 0.3 - toss * 300} y={GY - 40 - toss * 190 + toss * toss * 150}
          s={0.62 + toss * 0.24} z={78} f={f} jolt={0} slips={2} struck={strike} />
        <Bin x={620 + L.c * 0.3} y={GY + 14} s={0.78} z={76} />
        {toss > 0.94 && <Puff x={620 + L.c * 0.3} y={GY - 90} f={f} at={46} c="#D8D2C0" z={90} n={10} s={0.9} />}
        {toss > 0.94 && <Ring x={620 + L.c * 0.3} y={GY - 80} f={f} at={46} c={mxh(DIFFR, 0.4)} z={90} s={0.7} dur={16} />}
        {strike > 0.5 && <Fleck x={936 + L.c * 0.3 - toss * 300} y={GY - 120} f={f} at={40} z={92} s={1.1} dir={1} />}

        {/* the answer that is finally complete, leaving */}
        <AnswerCard x={250 + L.c * 0.3 - send * 74} y={604 + send * 122} w={250 + send * 280} z={80}
          items={[true, true, true, true, true, true]} rot={send * 6} />
        <DoneChip x={806 + L.c * 0.3} y={GY - 120} s={1.05} z={80} ring={chip} />
        {chip > 0.1 && <Ring x={806 + L.c * 0.3} y={GY - 132} f={f} at={40} c={mxh(GOLD, 0.5)} z={86} s={0.8} dur={20} />}

        <Contact x={430 + L.a * 0.3} y={GY - 6} w={196} o={0.34} z={44} />
        <Dev f={f} x={430 + L.a * 0.3} y={GY} i={0} size={280} z={64} at={-14} loop={2}
          extra={{ glasses: 1 }} cheer={E(f, 44, 54, 0, 1, BACK)} />
        <Contact x={646 + L.a * 0.3} y={GY - 6} w={186} o={0.32} z={44} />
        <Crew f={f} x={646 + L.a * 0.3} y={GY} i={2} size={266} z={62} at={-14} loop={2} flip
          cheer={E(f, 48, 58, 0, 1, BACK)} />

        <PromptRail f={f} z={76} topY={646} lampBarY={202} lamps={[1, 1, 1]}
          lampX={[356 + L.c * 0.3, 526 + L.c * 0.3, 696 + L.c * 0.3]} dx={L.c * 0.2} />
        <PaneStack x={W - 30 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="rail" />
      </Cam>
    </Scene>
  );
};
