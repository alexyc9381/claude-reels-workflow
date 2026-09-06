import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, lerpHex, mono, ui,
  Scene, Cam, Contact, Edge, Ring, Puff, Steam, Sweat, Fall, Motes, Pool, Rake,
  Crew, Hero, Forearm, Runner, costumeFor, squash, asPlace, R, TASKS, GY, BAND_Y, SAFE3,
  CLAY, GOLD, GREEN, RED, INK, BRASS, COPPER, BONE, STEEL, SLATE, TEAL, SKY, VIOLET, MUTE,
  TERM, TERM2, TERM3, UISH, UISH2, DIFFG, DIFFR, CARET, OKGREEN, WARN, CREAM_TICKET,
} from "./AdhWorld";
import { Room } from "./HwSets";
import {
  MarkTile, CodeLines, CheckBox, TodoList, SesFit, Pane, PaneWall, PromptRail, AnswerCard,
  TickPile, DoneChip, SkillFile, StopHook, LedgerTable, CmdLine, OutputBlock, ExitStamp,
  Toast, ErrStack, SysCard, Fleck, Selector, WallClock, PaneStack, Bin, Dev,
  StampTool, ClaimBoard, Sweep, PipRow, DeskFit, RowTower, AgentRow, BayWall,
  PromptCard, Flurry, JobCan, Gauge, TestRig, Conveyor,
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
   S0 · THE STAMP — the hook.  135 frames.  ⭐ REBUILT ON THE HOUSE TEMPLATE.

   "The rumors are true, Claude is secretly getting distracted, skipping your
    tasks, and lying to you about it."

   ⛔⛔⛔ REV 3's HOOK FAILED SIX OF THE EIGHT POINTS IN
   `feedback_read_the_winning_hook_do_not_just_measure_it`, which is the file
   that says: READ THE WINNING HOOK'S CODE, measuring its output only gives you
   the score. Reel 131 FREE's picked hook (`FreeHooks.HookToll`) documents the
   whole shape, and this is built to it.

   MECHANISM: **STAMP.** A body against a load. Reel 119 measured PULL — a body
   working against a load — beating two abstract candidates outright, and reel
   112 measured the same hero in the same set going 8.94 -> 14.09 purely by
   making his BODY change shape. So the hook is not "there is a todo list"
   (a state) and not "cards arrive" (an arrangement); it is ONE Claude putting
   DONE on work he has not done, once, with his whole body.

   THE EVENT, all four parts:
     BEFORE   f0 is settled and ALREADY THE JOKE — he is mid-swing with the
              stamp raised, the spring already BOWED under its weight, effort
              coming off him, three rows behind him green and every one of their
              RECEIPT SLOTS EMPTY. No narration needed to read it.
     TRIGGER  f13 he commits; f19 the stamp starts down.
     TRAVEL   f19-27 the stamp falls 172px and he drops and SQUASHES with it —
              0.52 of his own body width, which clears §11's one-third floor.
              Under that it is a state change the eye cannot resolve at 30fps.
     ARRIVAL  f27 SLAM, and it COSTS: a damped recoil through the arm, the whole
              board JOLTS, a dust puff, a ring, and a loose sheet slides off the
              stack. f31 the tally ticks 3/6 -> 4/6.
     ⛔ f48 HE LIFTS THE NEXT STAMP. It does not resolve.

   ⭐⭐⭐ AND THE SENTENCE IS STAGED ON ITS OWN WORDS, measured, not guessed:
     "distracted" f50-66  a notification slides in and HIS HEAD TURNS TO IT
     "skipping"   f71-92  SLAM 2 — landed while he is still looking away
     "lying"      f101-132 SLAM 3, faster, head never coming back, and at f126
                  he is already lifting the fourth. The claim of the reel, in
                  one image: he is stamping DONE on work he is not even watching.

   ⭐⭐⭐ THE SET IS WORTH MORE THAN THE EFFECTS. Two `Runner` bands of unstamped
   work cross behind him at different depths and rates — the single biggest
   per-scene lever in the measured motion table — plus a shaped lamp cone and
   its pool, which is where the saturated colour on a bone frame comes from.
   ====================================================================== */
export const PASS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const L = LAY[v];
  const OP: Record<Variant, number> = { house: 0, amber: 0, steel: 2 };
  const o = OP[v];

  /* ⛔⛔⛔ SCRAPPED AND REMADE. Alex: *"no this hook is horrible just scrap it
     completely and remake it again."*
     ⭐⭐⭐ AND FOUR REJECTIONS OF ONE HOOK IS ONE PROBLEM. All three previous
     versions shared a concept — **a hero performing a repetitive falsifying
     action on a queue** (ticking rows / stamping rows / capping cans). Three
     costumes, one idea, which is why four rounds of better drawing never moved
     the note (`feedback_one_concept_four_costumes`).

     MECHANISM: **HOLLOW.** A sealed thing turns out to be empty. Not an action
     repeated on a queue — a single CONTAINER FAILING, once, in close-up.

     THE EVENT, all four parts:
       BEFORE   f0 he stands beside a job canister the size of his own body,
                sealed, green-capped, hand resting on it, presenting it. The
                gauge on the rig behind him reads ZERO and he is not looking.
       TRIGGER  f13 he throws the release lever.
       TRAVEL   f19-27 the shell SPLITS and the two halves swing 150px apart —
                0.43 of his own body width each, and the whole object opens.
       ARRIVAL  f27 it is EMPTY. Nothing inside but a lit floor. It COSTS: the
                halves recoil, dust, a ring, the rig's lamp flips RED and its
                needle slams back to zero.
       ⛔ f52 HE IS ALREADY SEALING THE NEXT ONE. It does not resolve.
     ⭐ Then the sentence's own order, on measured words: the notification lands
     on "distracted" (f50-66), he walks off on "skipping" (f66-100), and on
     "lying" (f101-132) the cans behind him seal THEMSELVES, green, untested. */
  const PULL = 13, OPEN = 19, EMPTY = 27, NEXT = 52;
  const pull = E(f, o + PULL, o + OPEN, 0, 1, OUT);
  const open = E(f, o + OPEN, o + EMPTY, 0, 1, IO);
  const bang = f >= o + EMPTY ? Math.exp(-(f - o - EMPTY) / 4.6) : 0;
  const shellRecoil = f >= o + EMPTY
    ? Math.sin((f - o - EMPTY) * 0.8) * Math.exp(-(f - o - EMPTY) / 5.5) * 9 : 0;
  const halfX = open * 150 + shellRecoil;

  const toast = E(f, o + 40, o + 58, 1180, 730, OUT);
  const away = E(f, o + 52, o + 66, 0, 1, OUT);
  const leave = E(f, o + 66, o + 100, 0, 196, IO);
  /* the ones that seal THEMSELVES once he is gone */
  const SELF = [102, 112, 122, 130];
  const selfDone = SELF.filter((a2) => f >= o + a2).length;
  const sealK = (i: number) => E(f, o + SELF[i] - 12, o + SELF[i], 0, 1, IN_Q);

  const devX = 276 + L.a * 0.4 - leave;
  const size = 356;
  const lever = E(f, o + PULL, o + PULL + 7, 0, 1, OUT);

  const SHOT: Shot[] = shotsFor(v, [{ at: 0, s: 1.10, x: 0, y: 18 },
    { at: 67, s: 1.24, x: -120, y: 32 },
    { at: 102, s: 1.08, x: 76, y: 22 }]);
  const sh = shotAt(f, SHOT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.40}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="none"
          rake={0.09 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={3.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={1} z={5} lift={1.1} ctx={1 - E(f, 0, dur, 0, 0.5, LIN)} run={1} />
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={72 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={6} o={0.72}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : 2} />
        <div style={{ position: "absolute", left: 380, top: 120, width: 520, height: GY - 120,
          zIndex: 16, opacity: 0.40, clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(180deg, ${hexa(GOLD, 0.56)} 0%, ${hexa(GOLD, 0.04)} 100%)` }} />
        <Pool x={620} y={GY - 54} w={560} c={GOLD} o={0.30} z={17} />

        {/* the rig behind him: its needle sits at ZERO and its lamp is RED,
            because nothing was ever run through it */}
        <TestRig x={868 + L.b * 0.3} y={GY - 44} s={0.92} z={44} f={f}
          clamp={0.2} run={0.02} verdict={0} lever={0.06} />

        <Conveyor y={GY - 74} f={f} z={40} x0={-80} w={1180} rate={1.4} s={1.04} />

        {/* ⭐⭐⭐ THE BIG ONE — body-sized, sealed, and it OPENS ONTO NOTHING.
            Drawn as two half-shells that swing apart, with a lit empty floor
            between them, so the emptiness is a SHAPE and not an absence. */}
        <div style={{ position: "absolute", left: 596 + L.c * 0.3 - 150, top: GY - 372,
          width: 300, height: 344, zIndex: 78 }}>
          {/* the lit interior floor — what you see when it opens */}
          <div style={{ position: "absolute", left: 42, right: 42, top: 44, bottom: 26,
            borderRadius: "18px 18px 90px 90px",
            background: `linear-gradient(180deg, ${dkh(TERM, 0.06)}, #070706 68%, ${hexa(GOLD, 0.10)})`,
            boxShadow: `inset 0 8px 24px ${hexa("#000", 0.85)}` }}>
            {open > 0.4 && (
              <div style={{ position: "absolute", left: "18%", right: "18%", bottom: "12%",
                height: 26, borderRadius: "50%", background: hexa(GOLD, 0.16) }} />
            )}
          </div>
          {/* the two half-shells */}
          {[-1, 1].map((sgn) => (
            <div key={"hs" + sgn} style={{ position: "absolute", top: 22,
              left: sgn < 0 ? 8 - halfX : undefined, right: sgn > 0 ? 8 - halfX : undefined,
              width: 146, height: 300,
              borderRadius: sgn < 0 ? "22px 6px 6px 78px" : "6px 22px 78px 6px",
              transform: `rotate(${sgn * open * 7}deg)`, transformOrigin: sgn < 0 ? "0% 40%" : "100% 40%",
              background: sgn < 0
                ? `linear-gradient(90deg, ${dkh(STEEL, 0.46)}, ${mxh(STEEL, 0.28)} 70%, ${mxh(STEEL, 0.04)})`
                : `linear-gradient(90deg, ${mxh(STEEL, 0.04)}, ${mxh(STEEL, 0.28)} 30%, ${dkh(STEEL, 0.48)})`,
              border: `4px solid ${hexa("#000", 0.5)}`, boxShadow: SH_D }}>
              {/* banding + bolts, so it reads as a pressure shell */}
              {[0.16, 0.54, 0.84].map((t, i) => (
                <div key={"bn" + i} style={{ position: "absolute", left: -4, right: -4, top: `${t * 100}%`,
                  height: 16, background: `linear-gradient(180deg, ${mxh(STEEL, 0.34)}, ${dkh(STEEL, 0.4)})`,
                  border: `2px solid ${hexa("#000", 0.34)}` }} />
              ))}
              {[0.24, 0.62].map((t, i) => (
                <div key={"bl" + i} style={{ position: "absolute", [sgn < 0 ? "right" : "left"]: 12,
                  top: `${t * 100}%`, width: 13, height: 13, borderRadius: "50%",
                  background: `radial-gradient(circle at 34% 30%, ${hexa("#FFF", 0.34)}, ${hexa("#000", 0.6)})` } as any} />
              ))}
            </div>
          ))}
          {/* the green cap across the seam — the claim, before it opens */}
          <div style={{ position: "absolute", left: 60 + halfX * 0.0, top: 0, width: 180, height: 52,
            borderRadius: "58px 58px 10px 10px", opacity: 1 - open,
            background: `linear-gradient(180deg, ${mxh(OKGREEN, 0.36)}, ${dkh(OKGREEN, 0.28)})`,
            border: `5px solid ${hexa("#000", 0.44)}`, zIndex: 4 }}>
            <div style={{ position: "absolute", left: 22, right: 22, top: 9, height: 4,
              borderRadius: 2, background: hexa("#FFFFFF", 0.44) }} />
          </div>
        </div>
        {/* it COSTS */}
        {f >= o + EMPTY && f < o + EMPTY + 20 && (<>
          <Ring x={596 + L.c * 0.3} y={GY - 210} f={f} at={o + EMPTY} c={mxh(DIFFR, 0.45)} z={92}
            s={1.1} dur={18} />
          <Puff x={596 + L.c * 0.3} y={GY - 200} f={f} at={o + EMPTY} c="#E8D8C8" z={92} n={12} s={1.0} />
        </>)}

        {/* ⛔ f52: HE IS ALREADY SEALING THE NEXT ONE */}
        {f >= o + NEXT - 16 && (
          <JobCan x={286 + L.c * 0.2} y={GY - 62} s={1.44} z={74} hue={TASKS[2].c}
            capped={E(f, o + NEXT, o + NEXT + 10, 0, 1, BACK)} proved={0}
            rot={Math.sin(f / 10) * 2} f={f} seed={4} />
        )}
        {/* and the ones that seal THEMSELVES after he walks off */}
        {SELF.map((a2, i) => f >= o + a2 - 14 ? (
          <JobCan key={"sf" + a2} x={396 + i * 132 + L.c * 0.2} y={GY - 62} s={1.32}
            z={76 + i} hue={TASKS[(i + 3) % 6].c} capped={sealK(i)} proved={0}
            rot={(i % 2 ? 5 : -4)} f={f} seed={i + 7} />
        ) : null)}
        {SELF.map((a2, i) => f >= o + a2 && f < o + a2 + 15 ? (
          <Ring key={"sr" + a2} x={396 + i * 132 + L.c * 0.2} y={GY - 150} f={f} at={o + a2}
            c={mxh(OKGREEN, 0.45)} z={93} s={0.6} dur={13} />
        ) : null)}

        {/* ⭐ THE LEVER HE PULLS */}
        <div style={{ position: "absolute", left: 452 + L.b * 0.3, top: GY - 250, width: 14,
          height: 118, borderRadius: 7, zIndex: 80, transformOrigin: "50% 100%",
          transform: `rotate(${-24 + lever * 58}deg)`,
          background: `linear-gradient(90deg, ${dkh(STEEL, 0.42)}, ${mxh(STEEL, 0.3)}, ${dkh(STEEL, 0.46)})` }}>
          <div style={{ position: "absolute", left: -9, top: -16, width: 32, height: 32,
            borderRadius: "50%",
            background: `radial-gradient(circle at 34% 30%, ${mxh(CLAY, 0.34)}, ${dkh(CLAY, 0.26)})` }} />
        </div>

        <Contact x={devX} y={GY - 6} w={208} o={0.36} z={44} />
        <Dev f={f} x={devX} y={GY} i={0} size={size} z={62} at={o - 14} loop={1}
          extra={{ glasses: 1 }} gaze={away * 1.5}
          shock={pull * 0.4 + bang * 0.8}
          cheer={E(f, o + 2, o + 12, 0, 0.8, BACK) - E(f, o + EMPTY, o + EMPTY + 8, 0, 0.8, IO)} />

        <Toast x={toast} y={GY - 268} s={0.94} z={96} f={f} hue={SKY} />
        <Sweep k={E(f, o + EMPTY, o + EMPTY + 16, 0, 1, IO)} y={232} h={380} c="#FFD8C0"
          z={90} w={240} o={0.44} />
        <PipRow lit={1 + selfDone} f={f} at={o + EMPTY} pop={1} z={94} />

        <DeskFit p={p} f={f} z={30} seed={1} side="l" lamp={1} mug={1} />
        <PaneStack x={W - 34 + L.c * 0.2} y={H - 4} n={6} z={95} s={0.92} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={93} kind="post" />
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
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="none"
          rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.2} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={4} z={5} lift={1.0} ctx={0.7} run={read} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={31 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={4} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={2} side="r" lamp={1} mug={1} />
        <PaneWall f={f} z={20} y0={4} h={140} n={5} lit={[2]} signLit={lit} />
        {/* the shaft it comes down */}
        <div style={{ position: "absolute", left: 506 - 150 + L.b * 0.3, top: 96, width: 300,
          height: 420, zIndex: 18, background: `linear-gradient(180deg, ${hexa(p.grit, 0.7)}, transparent)` }} />
        <SysCard x={506 + L.b * 0.4} y={200 + drop * 200 + land * 14} w={452} z={80}
          open={open} lit={lit} />
        <Ring x={506 + L.b * 0.4} y={410} f={f} at={16} c={mxh(TEAL, 0.4)} z={84} s={0.9} dur={18} />
        {land > 0.1 && <Puff x={506 + L.b * 0.4} y={418} f={f} at={16} c="#CFE8F0" z={84} n={10} s={0.9} />}
        <PromptRail f={f} z={70} topY={696} lampBarY={214} lamps={[1, 1, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
        <Contact x={252 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={252 + L.a * 0.3} y={GY} i={0} size={322} z={62} at={-14} loop={3}
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
        <Room p={p} f={f} dx={L.a * 0.5} bands={0} kind="shelf" overhead="lampbar"
          rake={0.14 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.4} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={2} z={5} lift={1.0} ctx={0.85} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x3 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={17 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={6} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={3} side="l" lamp={1} mug={1} />
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
        <Dev f={f} x={MX(392) + dodge * (flip ? 132 : -132) + L.a * 0.3} y={GY} i={0} size={327}
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
          <Crew f={f} x={700 + L.a * 0.3} y={GY} i={2} size={329} z={64} at={62} loop={3} />
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
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="none"
          rake={0.11 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={5} z={5} lift={0.9} ctx={0.62} run={install} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={53 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={4} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={4} side="r" lamp={1} mug={1} />
        <PaneWall f={f} z={20} y0={0} h={132} n={5} lit={[1]} signLit={lit} />
        {/* the shaft */}
        <div style={{ position: "absolute", left: 506 - 130 + L.b * 0.3, top: 84, width: 260,
          height: 460, zIndex: 18,
          background: `linear-gradient(180deg, ${hexa(p.back2, 0.34)}, transparent 78%)` }} />
        <SkillFile x={506 + L.b * 0.4} y={210 + ride * 250 + land * 16 - lift * 60}
          w={272} z={80} open={install} rot={-3 + lift * 5} lit={lit} />
        {land > 0.05 && <Ring x={506 + L.b * 0.4} y={470} f={f} at={38} c={mxh(VIOLET, 0.4)} z={84} s={1.0} dur={20} />}
        {land > 0.05 && <Puff x={506 + L.b * 0.4} y={476} f={f} at={38} c="#C8CCF0" z={84} n={11} s={0.95} />}
        <PromptRail f={f} z={70} topY={696} lampBarY={214} lamps={[1, install > 0.5 ? 1 : 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
        <Contact x={772 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={772 + L.a * 0.3} y={GY} i={0} size={324} z={62} at={-14} loop={2}
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
        <Room p={p} f={f} dx={L.a * 0.5} bands={0} kind="shelf" overhead="lampbar"
          rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.6} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={6} z={5} lift={1.0} ctx={0.5} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x3 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={29 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={5} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={5} side="l" lamp={1} mug={1} />
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

        <PromptRail f={f} z={70} topY={700} lampBarY={214} lamps={[1, 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />

        {/* HE SHOVES. Body compresses, feet slide, effort off the head. */}
        <Contact x={402 + L.a * 0.3 + shove * 26 + back} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={402 + L.a * 0.3 + shove * 26 + back} y={GY} i={0} size={334} z={62} at={0}
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
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={7} z={5} lift={1.05} ctx={0.6} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={41 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={5} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={6} side="r" lamp={1} mug={1} />
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

        {/* ⭐ MEASURED 9.68 with 47% HOLD. Prompts fly in and CLIP to the rail as
            the ledger prints, so the beat has arrivals across its whole span
            rather than a table filling in place. */}
        {/* canisters roll in and queue as the ledger prints */}
        {[16, 32, 48, 64].map((at, i) => {
          const k = E(f, at, at + 22, 0, 1, IO);
          return k > 0.02 ? (
            <JobCan key={"lg" + at} x={1140 - k * (700 - i * 116) + L.c * 0.3}
              y={GY - 96} s={1.14} z={90 + i} hue={TASKS[i].c} capped={0} proved={0}
              rot={Math.sin(f / 8 + i) * 3} f={f} seed={i + 2} />
          ) : null;
        })}
        {/* the band that crosses the ledger as its last row closes */}
        <Sweep k={E(f, 74, 96, 0, 1, IO)} y={180} h={330} c="#CFF2DC" z={86} w={250} o={0.40} />
        <PipRow lit={rows} f={f} at={24} pop={1} z={92} />
        <PromptRail f={f} z={70} topY={694} lampBarY={214} lamps={[1, 1, rows >= 6 ? 1 : 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
        <Contact x={452 + L.a * 0.3} y={GY - 6} w={192} o={0.34} z={44} />
        <Dev f={f} x={452 + L.a * 0.3} y={GY} i={0} size={329} z={62} at={-14} loop={1}
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
        <Room p={p} f={f} dx={L.a * 0.5} bands={0} kind="shelf" overhead="none"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.8} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={8} z={5} lift={0.95} ctx={0.42} run={out} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x3 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={67 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={6} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={7} side="l" lamp={1} mug={1} />
        <PaneWall f={f} z={20} y0={0} h={138} n={5} lit={[2]} signLit={1} />

        {/* the command, typing */}
        <CmdLine x={430 + L.b * 0.4} y={272} w={470} z={82} f={f} type={type} />
        {/* ⭐ THE OUTPUT — the biggest object on this set, printing through the
            quarter that used to be dead */}
        <OutputBlock x={430 + L.b * 0.4} y={352} w={470} z={80} k={out} seed={5} f={f} />
        {/* the exit codes, stamped */}
        <ExitStamp x={786 + L.c * 0.4} y={318} s={1.0} z={90} k={stamp1} />
        <ExitStamp x={786 + L.c * 0.4} y={438} s={0.9} z={90} k={stamp2} />
        {/* ⭐ the row that finally has a receipt, leaving */}
        {/* the job that finally HAS a seal, leaving */}
        {E(f, 88, dur, 0, 1, IN_Q) > 0.02 && (
          <JobCan x={330 + L.c * 0.3 - E(f, 88, dur, 0, 1, IN_Q) * 200}
            y={GY - 120 + E(f, 88, dur, 0, 1, IN_Q) * 150}
            s={1.24 + E(f, 88, dur, 0, 1, IN_Q) * 0.7} z={94}
            hue={GREEN} capped={1} proved={1} rot={E(f, 88, dur, 0, 1, IN_Q) * 10}
            f={f} seed={7} />
        )}
        {[66, 82].map((at) => (
          <Flurry key={"rf" + at} x={786 + L.c * 0.4} y={370} f={f} at={at} n={3} z={93}
            s={0.68} spread={220} />
        ))}
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

        <PromptRail f={f} z={70} topY={700} lampBarY={214} lamps={[1, 1, green ? 1 : 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
        <Contact x={676 + L.a * 0.3} y={GY - 6} w={190} o={0.34} z={44} />
        <Dev f={f} x={676 + L.a * 0.3} y={GY} i={0} size={324} z={62} at={-14} loop={1}
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
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} window={null} />
        <SesFit p={p} f={f} seed={9} z={5} lift={1.0} ctx={0.16 + (1 - drop) * 0.2} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={13 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={4} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={8} side="r" lamp={1} mug={1} />
        <PaneWall f={f} z={20} y0={4} h={144} n={6} lit={[0, 1, 2, 3, 4, 5]} signLit={1} />
        {/* the whole row goes amber at once — one arrival, frame-wide */}
        {[0, 1, 2, 3].map((i) => (
          <Pane key={"aw" + i} x={92 + i * 216 + L.b * 0.3} y={352} w={190} h={150} z={44} f={f}
            on={0.5 + warn * 0.5} run={warn} seed={i + 3} />
        ))}
        <WallClock x={506 + L.b * 0.4} y={224} s={1.15} z={62} f={f} rate={2.4} />
        <PromptRail f={f} z={70} topY={700} lampBarY={214} lamps={[1, 1, 1]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
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
        <Room p={p} f={f} dx={L.a * 0.5} bands={0} kind="shelf" overhead="none"
          rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.4} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} window={null} />
        <SesFit p={p} f={f} seed={10} z={5} lift={0.95} ctx={0.3} run={0.5} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x3 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={83 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={5} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={9} side="l" lamp={1} mug={1} />
        <PaneWall f={f} z={20} y0={2} h={140} n={5} lit={[step % 5]} signLit={0.7} />
        {/* ⛔ MEASURED 5.40, STILL STATIC. Ten identical panes with one lit means
            NINE dark rectangles filling the middle of the frame and never
            changing — the scene was mostly a photograph of idleness, which is
            the right IDEA drawn the wrong way round. The queue is now a thin
            strip along the top and the ONE running lane is a HERO pane in the
            middle, printing hard, with a progress bar that creeps the whole
            beat. Same fact, and the thing that is working is the thing you can
            see working. */}
        {/* ⭐ THE QUEUE STRIP TRAVELS. "One task at a time" is not ten lamps with
            one lit — it is the whole queue SHIFTING one slot every time a row
            closes, so the set itself moves and the fact is a travelling change
            rather than a state (`feedback_a_sway_is_not_motion`). */}
        {Array.from({ length: 10 }, (_, i) => {
          const advance = E(f, 6, 74, 0, 4.2, LIN);          /* smooth, not stepped */
          const x = (flip ? W - 104 - i * 96 : 26 + i * 96) + L.b * 0.3
            + (flip ? advance * 96 : -advance * 96);
          return (
            <Pane key={"np" + i} x={x} y={214} w={90} h={104} z={40 + i} f={f}
              on={i === step ? 1 : 0.14} run={0} done={done(i) ? 1 : 0} seed={i + 1}
              label={false} />
          );
        })}
        {/* ⭐ MEASURED 9.15 with 54% HOLD. ONE prompt crawls the full width across
            the whole beat — "one task at a time" as a single continuous travel —
            and every close sheds paper. */}
        {/* ONE canister crawls the full width — "one task at a time", as travel */}
        <Conveyor y={GY - 78} f={f} z={40} x0={-80} w={1180} rate={1.1} s={1.0} />
        <JobCan x={E(f, 4, dur - 6, -180, 1160) + L.b * 0.3} y={GY - 68} s={1.5} z={86}
          hue={CLAY} capped={0} proved={0} rot={Math.sin(f / 10) * 3} f={f} seed={5} />
        {[6, 21, 36, 51, 66].map((at) => (
          <Flurry key={"nf" + at} x={506 + L.b * 0.3} y={420} f={f} at={at} n={3} z={88}
            s={0.66} spread={260} />
        ))}
        {/* a band crosses the strip as each row closes */}
        {[0, 1, 2, 3, 4].map((i) => (
          <Sweep key={"nsw" + i} k={E(f, 6 + i * 15, 6 + i * 15 + 13, 0, 1, IO)} y={200}
            h={132} c="#CFE0FA" z={70} w={200} o={0.34} />
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
        <PromptRail f={f} z={70} topY={700} lampBarY={214} lamps={[1, 0, 0]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} surface="#23262B" />
        <Contact x={286 + L.a * 0.3 + shunt * 40} y={GY - 6} w={186} o={0.32} z={44} />
        <Dev f={f} x={286 + L.a * 0.3 + shunt * 40} y={GY} i={0} size={315} z={62} at={-14} loop={1}
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
  /* ⭐⭐⭐ THE SET ITSELF RE-FLOWS, WHICH IS WHAT ELITE SCENES DO AND MINE DID
     NOT. Reel 131 FREE's S4 makes "all in one spot" by CONTRACTING the rack's
     pitch 232 -> 124 so seven plates slide together, and its own comment says
     why: *"the compress IS the event, and it is a large travelling change
     rather than a lamp turning on."*
     The line here is "it runs up to 10 sub-agents in parallel", so the ONE pane
     he has been working in SPLITS into ten: every pane's x, y, w AND h is
     interpolated from the single big rect to its own grid slot, so the whole
     set travels at once instead of a grid fading up. */
  const split = E(f, 34, 78, 0, 1, IO);
  const ONE = { x: 236, y: 250, w: 540, h: 322 };
  /* ⛔⛔ A SYMMETRIC GRID IS MIRROR-INVARIANT, so the MIRROR lever does nothing
     to it: house vs steel measured **3 bits** of dHash at f945 — a duplicate
     risk — because ten identical panes in a 5x2 grid look the same flipped.
     ⭐ Variants need STRUCTURE, not a regrade (`feedback_variants_need_shot_
     sizes`), so each cut fans out into a genuinely different ARRANGEMENT: five
     across in two rows, four across in three, or two across in five. Same ten
     lanes, three different pictures. */
  const GRID: Record<Variant, { cols: number; pw: number; ph: number; gx: number; gy: number; x0: number; y0: number }> = {
    house: { cols: 5, pw: 172, ph: 170, gx: 186, gy: 194, x0: 30, y0: 228 },
    amber: { cols: 4, pw: 196, ph: 132, gx: 212, gy: 150, x0: 78, y0: 214 },
    steel: { cols: 2, pw: 210, ph: 104, gx: 226, gy: 118, x0: 268, y0: 190 },
  };
  const G = GRID[v];
  const slot = (i: number) => {
    const col = i % G.cols, row = Math.floor(i / G.cols);
    return { x: (flip ? W - G.pw - 30 - col * G.gx : G.x0 + col * G.gx) + L.b * 0.3,
             y: G.y0 + row * G.gy, w: G.pw, h: G.ph };
  };
  const lerp = (a: number, b: number) => a + (b - a) * split;
  /* stagger = cycle / slots — each lane opens on its own clock once it is free */
  const openAt = (i: number) => 60 + i * 6;
  const runK = (i: number) => E(f, openAt(i), openAt(i) + 12, 0, 1, OUT);
  const doneK = (i: number) => E(f, openAt(i) + 40, openAt(i) + 52, 0, 1, OUT);
  const ship = E(f, 126, dur, 0, 1, IN_Q);
  const sweep = E(f, 92, 118, 0, 1, IO);
  const lit = Math.min(6, Array.from({ length: N }, (_, i) => i)
    .filter((i) => f >= openAt(i) + 52).length);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
        <Room p={p} f={f} dx={L.a * 0.5} bands={0} kind="shelf" overhead="lampbar"
          rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={11} z={5} lift={1.05} ctx={0.55} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={23 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={6} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={10} side="r" lamp={1} mug={1} />
        {/* ⛔ THE BRIGHTEST SCENE STILL NEEDS SOMETHING BLACK IN IT — rev 1's
            payoff had no dark mass and its p10 came back at 76.1. */}
        <PaneWall f={f} z={20} y0={0} h={150} n={6} lit={[0, 2, 3, 5]} signLit={1} />

        {/* ⭐ THE ONE PANE BECOMING TEN — the set travelling, not a grid fading */}
        {Array.from({ length: N }, (_, i) => {
          const sl = slot(i);
          const x = lerp(ONE.x, sl.x), y = lerp(ONE.y, sl.y);
          const w = lerp(ONE.w, sl.w), h = lerp(ONE.h, sl.h);
          /* before the split they occupy the SAME rect, so the other nine are
             held back until the set has actually opened up */
          const vis = i === 0 ? 1 : Math.min(1, Math.max(0, (split - 0.14) * 2.6));
          return vis <= 0 ? null : (
            <React.Fragment key={"fp" + i}>
              <div style={{ position: "absolute", inset: 0, zIndex: 44 + i, opacity: vis }}>
                <Pane x={x} y={y} w={w} h={h} z={44 + i} f={f}
                  on={i === 0 ? 1 : Math.max(runK(i), vis * 0.85)}
                  run={i === 0 ? 1 : runK(i)} done={doneK(i)} seed={i + 1 + (v === 'amber' ? 11 : v === 'steel' ? 23 : 0)} />
              </div>
              {doneK(i) > 0.5 && doneK(i) < 1 && (
                <Ring x={x + w / 2} y={y + h / 2} f={f} at={openAt(i) + 46}
                  c={mxh(GREEN, 0.4)} z={90} s={0.5} dur={12} />
              )}
            </React.Fragment>
          );
        })}
        {/* ⭐⭐⭐ AND A CAST, NOT A GRID. 135 AGENCY's hook fills with fifteen
            characters; ten sub-agents here are ten CLAUDES at ten desks, each on
            its own slot clock and its own costume, arriving as the session
            splits. Population change is the thing the winners' frames do. */}
        <AgentRow f={f} y={GY - 8} n={N} x0={72 + L.b * 0.2} pitch={92} size={126} z={64}
          open={(i) => E(f, openAt(i) - 4, openAt(i) + 10, 0, 1, BACK)}
          done={(i) => doneK(i)} seedOff={v === "amber" ? 3 : v === "steel" ? 6 : 0} />
        {/* ⭐ the band that crosses the grid the moment it is whole */}
        <Sweep k={sweep} y={206} h={436} c="#CFF2DC" z={86} w={264} o={0.40} />
        <PipRow lit={lit} f={f} at={60} pop={1} z={92} />

        <Selector x={506 + L.c * 0.4} y={624} s={1.05} z={88} k={turn} from={1} to={R.agents} />
        {turn > 0.98 && <Ring x={506 + L.c * 0.4} y={624} f={f} at={62} c={mxh(GOLD, 0.5)} z={90} s={0.8} dur={20} />}

        {ship > 0.001 && (
          <AnswerCard x={506 + L.c * 0.3 - ship * 60} y={640 + ship * 120} w={240 + ship * 280}
            z={92} items={[true, true, true, true, true, true]} rot={ship * 5} />
        )}

        <PromptRail f={f} z={70} topY={700} lampBarY={214} lamps={[1, 1, 1]}
          lampX={[366 + L.c * 0.3, 526 + L.c * 0.3, 686 + L.c * 0.3]} />
        <Contact x={846 + L.a * 0.3} y={GY - 6} w={188} o={0.32} z={44} />
        <Dev f={f} x={846 + L.a * 0.3} y={GY} i={0} size={315} z={64} at={-14} loop={2}
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
        <Room p={p} f={f} dx={L.a * 0.4} bands={0} kind="shelf" overhead="lampbar"
          rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.0} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.5} window={null} />
        <SesFit p={p} f={f} seed={12} z={5} lift={1.2} ctx={0.8} run={1} />
        {/* ⭐ THE DENSITY DEVICE — UNLAZY's `ToolWall` pattern in this world's
            own objects: skill files on hooks, cable coils, lit sub-agent bays
            and pin-toothed modules, 10x2 on rails, each swaying. This is why
            the OX and UNLAZY frames read as PLACES and mine read as diagrams. */}
        <BayWall p={p} f={f} x={-20} y={150} cols={10} z={16}
          seed={47 + (v === "amber" ? 7 : v === "steel" ? 19 : 0)} live={5} o={0.92}
          rows={v === "amber" ? 2 : v === "steel" ? 3 : undefined} />
        {/* ⭐ THE PLACE, not a screenshot: desk, anglepoise, mug, keyboard,
            cables, plant, chair back — the silhouette variety the note asked for */}
        <DeskFit p={p} f={f} z={30} seed={11} side="l" lamp={1} mug={1} />
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

        {/* ⭐ MEASURED 8.22, the weakest scene. Four proved prompts fly in on the
            four spoken letters and land in a fan, each with a FILLED receipt —
            the reel's own object, arriving, on the beat. */}
        {/* ⛔ NO PAPER. Four PROVED canisters land on the four spoken letters,
            each with its round seal — the object the reel is actually about. */}
        {[8, 15, 22, 29].map((at, i) => {
          const k = E(f, at, at + 14, 0, 1, BACK);
          return k > 0.02 ? (
            <JobCan key={"cta" + at} x={168 + i * 128 + L.c * 0.3}
              y={GY - 128 + (1 - k) * -260} s={1.26} z={88 + i}
              hue={TASKS[i].c} capped={1} proved={k} rot={(1 - k) * (i % 2 ? 26 : -26)}
              f={f} seed={i} />
          ) : null;
        })}
        {[8, 15, 22, 29].map((at) => (
          <Flurry key={"cf" + at} x={300 + L.c * 0.3} y={GY - 190} f={f} at={at} n={3} z={93}
            s={0.7} spread={220} />
        ))}
        <Sweep k={E(f, 30, 52, 0, 1, IO)} y={200} h={400} c="#FFF0C8" z={86} w={250} o={0.42} />
        <PipRow lit={6} f={f} at={6} pop={1} z={92} />
        <Contact x={430 + L.a * 0.3} y={GY - 6} w={196} o={0.34} z={44} />
        <Dev f={f} x={430 + L.a * 0.3} y={GY} i={0} size={324} z={64} at={-14} loop={2}
          extra={{ glasses: 1 }} cheer={E(f, 44, 54, 0, 1, BACK)} />
        <Contact x={646 + L.a * 0.3} y={GY - 6} w={186} o={0.32} z={44} />
        <Crew f={f} x={646 + L.a * 0.3} y={GY} i={2} size={297} z={62} at={-14} loop={2} flip
          cheer={E(f, 48, 58, 0, 1, BACK)} />

        <PromptRail f={f} z={76} topY={700} lampBarY={202} lamps={[1, 1, 1]}
          lampX={[356 + L.c * 0.3, 526 + L.c * 0.3, 696 + L.c * 0.3]} dx={L.c * 0.2} />
        <PaneStack x={W - 30 + L.c * 0.2} y={H - 4} n={6} z={94} s={0.9} />
        <Edge side="l" c={dkh(p.floor2, 0.34)} w={86} z={92} kind="rail" />
      </Cam>
    </Scene>
  );
};
