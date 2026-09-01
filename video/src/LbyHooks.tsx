import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, MarkPlate, mono, ui, settle, STEP,
  R, PHASE, PLACES, asPlace, vivid, Rake, Ring, Puff, Pool, Steam, Sweat, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Room, antic, load,
  DRW, DRWD, DRWL, BLANK, BLANKD, COUNTERTOP, HALLSTEEL,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, EMBER, OXIDE, SLATE, COPPER,
} from "./LbyWorld";
import {
  PromptCard, Spike, DrawerWall, Shutter, CounterTop, Chute, PickRail,
  LeverCutter, WritingDesk, Typewriter, Stencil, Tray,
  LoadCardDrawer, LoadDraftBall, LoadCardBale,
} from "./LbyProps";

/* ===========================================================================
   REEL 130 · "LIBRARY" — THE HOOK CANDIDATES.  Board: storyboards/130-library.md.

   ⛔⛔⛔ THE-OPEN STEP 1: three genuinely different PICTURES, each built at full
   chassis quality, each shipping as its own cut. Not one world in three
   colourways — if one sentence describes all three, there is one concept.

   ⭐ THE THREE, REBUILT AGAINST ONE NOTE. Alex: *"propose much better hook
   options… it has to be a very HIERARCHICAL beginning with a very
   STRAIGHTFORWARD interesting concept."*
     A · THE GATE    ⭐ THE HOUSE'S OWN WINNING MECHANISM. A colossal steel gate
                     fills the frame with the library already visible THROUGH its
                     bars; he braces to force it, the seal gives, and 700px of
                     steel leaves the frame. Travel is VERTICAL.
     B · THE SLOT    he posts his hand-written card into a machine; it SPITS IT
                     BACK and then fills the tray until it overflows onto the
                     floor. Travel is TOWARD CAMERA.
     C · THE DRAWER  he braces and pulls ONE drawer out of a dark wall; it keeps
                     coming, and the pull-back shows it is one of hundreds.
                     Travel is in DEPTH.

   ⛔ WHAT THEY REPLACED, AND WHY. The previous set (a shutter going up, a card
   slid along a counter, a chute pouring) put SEVEN objects in frame — a lamp, a
   desk, a card, a hero, a spike and two stock racks — none of them dominant, and
   three of them added only to pass the frame-0 luma gate. That is the opposite
   of hierarchy: a cream room ranks nothing at 1.24, a dark room with ONE LIT
   THING ranks at 2.92 (reel 84). Every hook here has ONE object owning the
   frame, and the NUMBER is the animation rather than a printed figure.

   ⛔⛔ THE GEOMETRY IS WORKED OUT, NOT EYEBALLED. Panel is 1012x792 panel-local,
   cast on GY=706. The crop bound is `left >= 506 - 486/(push*cam.s)`; at the
   worst case here (push 1.058 x cam.s 1.052 = 1.113) that is x 69..943, and
   every object below is inside it.
   ========================================================================= */

export type HookId = "haul" | "haulb" | "haulc" | "slot" | "drawer";
export const PICKED: HookId = "haulb";

/** ⛔⛔⛔ FOURTH NOTE ON ONE OBJECT — blank cards, then a monumental prompt card,
    then a typewriter, and the note ("I don't know what I'm looking at") never
    moved. So this time the load is a PARAMETER and all three candidates get
    built, because [[feedback_render_a_frame_strip]] and THE-OPEN step 1 both say
    the same thing: the decision is visual, a description is not a candidate.
    ⭐ ROUND 5's DIAGNOSIS, and the one that finally names it. A hook object has
    to clear THREE bars, and every rejection so far cleared only some of them:

      1 · can you name it in two words?      blank cards ✗ · big card ✗ · rest ✓
      2 · does a body really do that to it?  typewriter ✗ · rest ✓
      3 · ⭐ IS IT THE THING THE REEL IS ABOUT?

    Bar 3 is what killed round 4. A pencil says *by hand*, a boulder says
    *pointless labour*, a ball and chain says *shackled* — three legible objects,
    three sensible verbs, and not one of them says PROMPT LIBRARY. Alex:
    *"these don't really represent PROMPT LIBRARY that well."*
    All three below are made of the subject: a catalogue drawer packed with
    cards, a compacted wad of rewritten drafts, and a banded bale of cards. */
export type LoadId = "drawer" | "drafts" | "bale";

type HP = { v: "house" | "amber" | "steel"; dur: number };

const GY = 706;
const CUT1 = 36, CUT2 = 68;

/* ---- THE SHARED BEFORE-STATE ---------------------------------------------
   ⭐ ANIMATE WHAT IS ALREADY ON SCREEN BEFORE ADDING ANYTHING ELSE. The bench
   is not a still life: the arm strokes on a beat, the spike grows on every
   stroke, the offcut flies, and the hero's `heat` climbs the whole time.       */
/* ⛔⛔⛔ THE REEL'S FIRST SIX FRAMES MEASURED 1.27 AGAINST A 6.5 BAR
   ([[feedback_every_cut_has_a_frame_zero]] — 13/15 scenes on reel 128 opened on
   a dead half-second and NO gate saw it). The first authored stroke was at f6,
   so frame 0 was a still life of a man about to move.
   ⭐ THE SEED IS **THREE** STROKES DEEP, AND THE ARITHMETIC MATTERS. A card is drawn
   from `t+4` to `t+23` and LANDS at `t+23`, so seeding at **-19, -12 and -5** puts one
   card landing on **f4** — inside the exact six frames the gate measures — and
   two more in mid-flight across the whole window, while the pen releases the first
   stroke and starts the next at f5. ⛔ A first attempt seeded -11/+3 and scored
   WORSE (4.22 -> 3.51, OPENS DEAD) because it left only ONE card in the window and
   no landing in it at all: seeding is not "put something before zero", it is
   solving for what is on screen at f1-f6. ⛔ A card in flight is a steady state of
   this bench, not a transition caught halfway; the LANDING is the event. */
const STROKES = [-19, -12, -5, 6, 17, 28];

const benchStroke = (f: number) =>
  STROKES.reduce((a, t) => Math.max(a, E(f, t, t + 5, 0, 1, IN_Q) - E(f, t + 5, t + 12, 0, 1, OUT)), 0);

const heatAt = (f: number, base = 0.30) =>
  Math.min(0.95, base + STROKES.filter(t => f > t).length * 0.20);

/** the bench, drawn once, used by all three hooks. `s` changes the SCALE it is
    drawn at, never its contents — the shot size is the variant axis.

    ⛔⛔ THE LAYOUT, AND WHY IT IS THIS ONE. The first pass put the cutter, the
    hero and the spike all inside the middle 300px: the cutter read as a ruler
    behind the hero, the spike read as a stack of pancakes, and the one big
    bright object was an unlabelled cream rectangle. Three separate defects with
    one cause — nothing had ROOM. It is now three clearly separated masses at
    three depths: the STOCK PALLET cropped by the left edge (the bright
    occluder, in front), the CUTTER and the hero mid-ground, and the SPIKE right
    and slightly back. */
const Bench: React.FC<{ f: number; s?: number; x?: number; y?: number; heroSize?: number;
  spikeN?: number; showHero?: boolean; heroGaze?: number; heroShock?: number }> =
  ({ f, s = 1, x = 0, y = 0, heroSize = 256, spikeN = 30, showHero = true,
     heroGaze = 0, heroShock = 0 }) => {
  const cut = benchStroke(f);
  const hot = heatAt(f);
  /* the bench top the whole shot is staged ON. ⛔ BOTTOM-HEAVY IS A COMPOSITION
     DEFECT, NOT A PROP SHORTAGE (ANIMATION-QUALITY §12): the first build left
     two thirds of the panel as empty dark floor under the action. The bench is
     now a full-width slab at BY, the cast works BEHIND it, and what hangs
     overhead is the shutter. */
  const BY = 592;
  return (
    <Cam x={x} y={y} s={s} z={54}>
      {/* the sodium cone from the bench lamp — it has to land ABOVE the horizon
          or it is washed out by the floor gradient. ⭐ AND IT SWINGS: a shop lamp
          on a bracket over a bench that is being hammered does, and the pool is
          19% of the panel, so 24px of travel is the largest cheap repaint in this
          framing. ⛔ It is driven off the STROKE, not a free-running sine — a sway
          with no cause is an idle ([[feedback_a_sway_is_the_whole_cast]]). */}
      <Pool x={430 + Math.sin(f / 7.5) * 24 * (0.35 + cut * 0.65)} y={BY - 26} w={760}
        c={SODIUM} o={0.36} z={20} />

      {/* THE BENCH — a real slab with a front edge, a rail and legs */}
      <div style={{ position: "absolute", left: -40, top: BY, width: 1100, height: 30, zIndex: 46,
        background: `linear-gradient(180deg, ${mxh("#6E5A3C", 0.34)} 0%, #6E5A3C 52%, ${dkh("#6E5A3C", -0.34)} 100%)` }} />
      <div style={{ position: "absolute", left: -40, top: BY + 28, width: 1100, height: 15, zIndex: 47,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.2)} 0%, ${dkh(BRASS, -0.42)} 100%)` }} />
      <div style={{ position: "absolute", left: -40, top: BY + 42, width: 1100, height: 74, zIndex: 45,
        background: `linear-gradient(180deg, ${dkh("#6E5A3C", -0.48)} 0%, ${dkh("#6E5A3C", -0.68)} 100%)` }} />
      {[104, 396, 690, 962].map((lx, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: lx, top: BY + 114, width: 32,
          height: 106, zIndex: 44, background: dkh("#3A3F44", -0.34) }} />
      ))}
      {/* ⛔ THE BOTTOM 170px WAS DEAD FLOOR. It is not a prop shortage, it is a
          composition defect (ANIMATION-QUALITY §12), and the fix is the thing the
          story already implies: he has been doing this for HOURS, so the floor
          under the bench is a drift of dropped blanks and an overflowing bin. */}
      <div style={{ position: "absolute", left: 208, top: BY + 128, width: 148, height: 96,
        zIndex: 48, borderRadius: `4px 4px 14px 14px`, background: dkh("#3A3F44", -0.24),
        border: `4px solid ${hexa("#000", 0.44)}` }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"dr" + i} style={{ position: "absolute",
          left: 206 + rnd(i, 55) * 150 + (i > 8 ? 320 + rnd(i, 56) * 480 : 0),
          top: BY + (i > 8 ? 146 : 108) + rnd(i, 57) * 74,
          width: 56 + rnd(i, 58) * 42, height: 15 + rnd(i, 59) * 8, borderRadius: 2,
          zIndex: i > 8 ? 43 : 49, background: i % 3 ? BLANKD : BLANK,
          transform: `rotate(${rnd(i, 60) * 56 - 28}deg)`, opacity: 0.9 }} />
      ))}

      {/* ⭐ THE STOCK PALLET — cropped by the LEFT EDGE, so it is the mass in
          FRONT of the action the depth check asks for, and the biggest bright
          object at frame 0. It is the card stock he is cutting from, so it is
          also the thing the scene is about. */}
      <div style={{ position: "absolute", left: -78, top: GY - 322, width: 234, height: 326,
        zIndex: 86 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={"pl" + i} style={{ position: "absolute", left: 6 + (i % 2) * 10,
            top: 4 + i * 29, width: 216 - (i % 3) * 12, height: 26, borderRadius: 3,
            background: i % 2
              ? `linear-gradient(178deg, #F5F1E3 0%, ${BLANKD} 100%)`
              : `linear-gradient(178deg, #EDE7D5 0%, ${dkh(BLANKD, -0.14)} 100%)`,
            borderTop: `2px solid ${hexa("#fff", 0.5)}`,
            borderBottom: `3px solid ${hexa("#000", 0.30)}` }} />
        ))}
        <div style={{ position: "absolute", left: -12, top: 300, width: 240, height: 26,
          background: dkh("#6E5A3C", -0.28), borderTop: `4px solid ${hexa("#000", 0.4)}` }} />
        <Stencil x={98} y={268} t="BLANK STOCK" c={hexa("#4A4436", 0.88)} z={88} size={17} />
      </div>

      {/* ⭐ THE DESK, ON THE BENCH. `cut` is the WRITING STROKE crossing the
          card — a real distance, left to right, and the pen is what the eye
          follows. */}
      <WritingDesk x={368} y={BY + 2} s={1.10} z={58} ink={cut} f={f} lines={4} />
      {/* the finished card thrown onto the spike on every stroke — >= 40px, so
          it survives the audit's 1012->240 downsample */}
      {/* ⛔ 92x58 AT 28px/FRAME REPAINTS 1.2% OF THE PANEL PER SAMPLE and the
          reel's first six frames measured 4.22 against a 6.5 bar. The card is now
          152x96 travelling 34px/frame, and it ARRIVES: a puff, a ring and a jolt
          through the spike on landing, which is the event the window is looking
          for. */}
      {STROKES.map((t, i) => {
        const lf = f - t - 4;
        if (lf < 0 || lf > 19) return null;
        return (
          <React.Fragment key={"oc" + i}>
            <div style={{ position: "absolute",
              left: 296 + lf * 40, top: BY - 176 - Math.sin(lf / 15 * Math.PI) * 168,
              width: 152, height: 96, borderRadius: 3, zIndex: 70, background: BLANK,
              border: `4px solid ${hexa("#000", 0.28)}`,
              transform: `rotate(${lf * 21}deg)` }} />
            {lf > 14 && <Puff x={846} y={BY - 96} f={f} at={t + 19} c="#C7BCA2" n={7} s={0.9} z={68} />}
            {lf > 14 && <Ring x={846} y={BY - 88} f={f} at={t + 19} c="#E4D3A8" z={69} s={0.7} />}
          </React.Fragment>
        );
      })}

      {/* THE SPIKE — right, on the same bench, needle proud */}
      {/* ⭐ THE LANDING JOLTS THE WHOLE STACK. `jolt` drives a 12px shift on a
          240x190 mass — the biggest repaint available in this framing — and it
          fires on every card arrival, not on the pen stroke. */}
      <Spike x={854} y={BY + 2} n={spikeN + STROKES.filter(t => f > t + 4).length * 2} s={1.16}
        z={62} f={f}
        jolt={STROKES.reduce((a, t) => a + (f >= t + 23 && f < t + 27
          ? 2.2 * (1 - (f - t - 23) / 4) : 0), 0) + cut * 0.4} />

      {showHero && (<>
        {/* ⭐ HE IS BEHIND THE BENCH AND HE IS WRITING. `drive` sweeps him across
            with the stroke, so the action is a DISTANCE and not a state change.
            ⛔ z=66 puts him OVER the desk — at z=52 the pen and the clip bar
            crossed his face on every stroke. */}
        {/* ⭐ AND THE HERO IS THE BIGGEST MASS IN THIS FRAMING, so his stroke is
            worth more than any prop: `reach` 96 -> 168 turns a 44px gesture into a
            118px one, which at 256px of body is a third of his own width — past
            ANIMATION-QUALITY §11's floor at which a movement stops being a state
            change and becomes an ACTION. */}
        <Hero f={f} x={620} y={BY + 34} size={heroSize} z={66} costume={{ constr: 1 }} flip
          act={1} ph={0.6} heat={hot} gaze={heroGaze} shock={heroShock} reach={168}
          strain={cut * 0.52} drive={-0.10 - cut * 0.60} />
      </>)}
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — sweat off the body on
          each stroke, on top of `heat`'s own steam off the crown. */}
      {STROKES.map((t, i) => f > t && (
        <Sweat key={"sw" + i} x={638} y={BY - heroSize * 0.52} f={f} at={t} n={5} s={0.9} z={72} />
      ))}
    </Cam>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE THREE HOOKS, REBUILT AGAINST ONE NOTE.

   Alex: *"propose much better hook options, the hooks from 0-3 secs are not
   good… it has to be a very HIERARCHICAL beginning with a very STRAIGHTFORWARD
   interesting concept."*

   ⛔ THE DIAGNOSIS, AND IT IS NOT "ADD MORE". The hook it replaces had a lamp, a
   desk, a card, a hero, a spike, two stock racks and a pallet of blanks — SEVEN
   objects, none of them dominant, and every one of them added to answer a
   different gate (frame-0 luma took three of them). That is the opposite of
   hierarchy: a cream room ranks nothing at 1.24, a dark room with ONE LIT THING
   ranks at 2.92 (reel 84, and still the measurement that matters here).
   ⛔ And "straightforward" is a PART COUNT, not a pace — *"I can't tell what's
   going on"* is parts-per-shot ([[feedback_too_fast_is_a_part_count]]).

   ⭐ SO ALL THREE BELOW OBEY THE SAME THREE RULES:
     1 · ONE OBJECT OWNS THE FRAME. Everything else is black or nearly so.
     2 · THE CONCEPT IS ONE SENTENCE, and it is legible with the sound off.
     3 · THE NUMBER IS THE ANIMATION — 52 is not printed, it is COUNTED OUT in
         front of you, which is the only way a figure earns a hook.

     A · THE COUNT   two plinths. His six hand-written cards on the left. The
                     right one BUILDS — fifty-two slam down one after another
                     until the stack leaves the top of the frame.
                     *"You wrote six. There are fifty-two."*
     B · THE SLOT    he posts his hand-written card into a machine. It SPITS IT
                     BACK, then fills the tray until it overflows onto the floor.
                     *"You didn't need to write one."*
     C · THE DRAWER  he braces and pulls ONE drawer out of a dark wall. It keeps
                     coming — a metre, two, three, packed — then the pull-back
                     shows it is one drawer of hundreds.
                     *"This is one drawer."*

   ⛔ Three different EVENTS on three different AXES — vertical (a stack rising),
   toward camera (a tray overflowing), and depth (a drawer coming out) — which is
   what `docs/TRIAL-CUTS.md` needs from three cuts that share a VO.
   ========================================================================= */

/** the hard top light every one of these is staged under — ⛔ HIERARCHY NEEDS
    DARKNESS, so the room contributes almost nothing and every lit pixel is on
    the subject. */
const Spot: React.FC<{ x: number; w: number; top?: number; c?: string; o?: number; z?: number }> =
  ({ x, w: ww, top = 96, c = SODIUM, o = 0.5, z = 18 }) => (<>
    <div style={{ position: "absolute", left: x - ww * 0.30, top, width: ww * 0.60, height: 22,
      zIndex: z + 20, borderRadius: 5,
      background: `linear-gradient(180deg, #FFF6E0 0%, ${dkh(c, -0.2)} 100%)` }} />
    <div style={{ position: "absolute", left: x - ww / 2, top: top + 20, width: ww, height: 760,
      zIndex: z, background: `linear-gradient(180deg, ${hexa(c, o)} 0%, ${hexa(c, o * 0.62)} 62%, ${hexa(c, o * 0.44)} 100%)`,
      clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
    {/* the pool it puts on the floor — a spot with no floor under it is a gradient */}
    <div style={{ position: "absolute", left: x - ww * 0.62, top: top + 640, width: ww * 1.24,
      height: 150, zIndex: z - 1, borderRadius: "50%",
      background: `radial-gradient(50% 50% at 50% 50%, ${hexa(c, o * 0.9)} 0%, ${hexa(c, 0)} 100%)` }} />
  </>);

/** a plinth — the only furniture any of these shots has */
const Plinth: React.FC<{ x: number; y: number; w: number; label?: string; z?: number;
  lit?: number }> = ({ x, y, w: ww, label, z = 40, lit = 1 }) => (<>
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: 26, zIndex: z,
    borderRadius: 3,
    background: `linear-gradient(180deg, ${mxh("#6E5A3C", 0.30 + lit * 0.24)} 0%, ${dkh("#6E5A3C", -0.34)} 100%)` }} />
  <div style={{ position: "absolute", left: x - ww / 2 + 16, top: y + 26, width: ww - 32,
    height: 210, zIndex: z - 1,
    background: `linear-gradient(180deg, ${dkh("#6E5A3C", -0.50)} 0%, ${dkh("#6E5A3C", -0.78)} 100%)` }} />
  {label && (
    <div style={{ position: "absolute", left: x - ww / 2, top: y + 44, width: ww, textAlign: "center",
      zIndex: z + 2, ...mono(21, 800), color: hexa("#F2E6CA", 0.82), letterSpacing: "0.16em" }}>
      {label}
    </div>
  )}
</>);

/* =========================================================================
   A · THE HAUL.  "You are dragging this by hand."

   ⭐⭐⭐ THIS IS REEL 119's FINDING APPLIED DIRECTLY, and it is the reason every
   hook before it failed. From [[ox119-reel]]:

     *"THE THIRD HOOK IS THE ONE THAT WORKED, AND THE DIFFERENCE IS A BODY.
      Mechanisms tried: SEAT (a slab into a slot — an installation, i.e. a
      progress bar), BREAK (a usage bar tearing off its end stop — better, still
      a BAR). Both abstract, both rejected. v3 is PULL: the ox is harnessed by a
      real chain to your rig, the mechanic drops the pin, the slack goes out of
      the chain, the ox digs in and DRAGS the machine. 7.88-class → 15.63.
      The lesson under it: after two rejections for 'boring', the axis that
      finally moved was not more motion, it was A CHARACTER DOING PHYSICAL WORK
      AGAINST A LOAD."*

   ⛔ EVERY HOOK THIS REEL HAS TRIED WAS A MECHANISM REVEALING ITSELF — a shutter
   going up, a gate lifting, a stack counting, a slot dispensing, a drawer coming
   out. All five are SEAT and BREAK: an apparatus performing, with the Claude
   standing next to it. That is why "it doesn't build anticipation" — an apparatus
   has no intention, so there is nothing to anticipate.

   ⭐⭐ AND ANTICIPATION IS WHERE THE OX HOOK PUTS ITS WHOLE FIRST SECOND: the pin
   drops, **THE SLACK GOES OUT OF THE STRAP**, the body digs in — and the load has
   still not moved. The wind-up is a rope going tight with nothing happening yet.
   That is the beat, and it is the one thing none of the five had.

   THE SHOT, one continuous framing (⛔ [[cut-must-reveal]] — a cut is only earned
   when it reveals something a continuous take cannot, and nothing here is):
     f0-13   the strap is TAUT and the sledge DOES NOT MOVE. He is dug in at an
             angle a body only holds under load, and what he is dragging is ONE
             prompt card at architectural scale that he is still half-way through
             writing. ⛔ A PILE OF PAPER CARRIES ONE BIT — "there are a lot of
             them" — which is §3's container defect; one monumental card is 17
             drawn parts and the joke is exact.
     f13     it BREAKS FREE — the sledge lurches, grit sprays, he stumbles a step.
     f13-62  three more heaves, each with its own coil, each moving it less.
     f66     a finished card arrives on the overhead rail and lands in front of
             him. He does not see it yet.
     f72+    THE STRAP GOES SLACK — a real sagging curve — because the load was
             never his to pull. `FREE` stamps.

   ⛔ THE STRAP RUNS OVER HIS SHOULDER AT z=86, NOT BEHIND HIM. 119: *"a chain
   BEHIND the thing it pulls is not a mechanism"* — the trace was at z=50 under a
   z=58 ox and was invisible, and it was the one element the hook turned on.
   ⛔ AND HE MUST NOT DRAG HIMSELF OUT OF FRAME. 119's rig travelled 210px and put
   the ox half outside the panel; the sledge here travels 104.
   ====================================================================== */
const HookHaulBase: React.FC<HP & { ld: LoadId }> = ({ dur, ld }) => {
  const f = useCurrentFrame();
  const GYY = 704;

  /* ⭐ THE FOUR HEAVES. Each is a COIL that peaks with the load still still, then
     a break-free. The first is the long one — 13 frames of a body against a rope
     that has not moved yet, which is the anticipation the note asked for. */
  const HEAVE = [13, 32, 52, 72, 88];
  /* ⛔⛔⛔ THE HOOK OPENED DEAD AND ONLY `scene_open_audit` COULD SEE IT.
     f1-6 measured 3.13-3.46 against a 6.5 bar and a 4.0 DEAD floor — identical
     across all three load candidates, which is the signature of a shared cause
     ([[feedback_one_prop_five_scenes]]). The cause is the first heave's own
     design: `antic(f, 0, 13)` spends its first seven frames COILING BACKWARD
     from a standstill, so the anticipation Alex asked for was bought with a dead
     half-second at the very top of the reel — exactly the defect
     [[feedback_every_cut_has_a_frame_zero]] was written for.
     ⭐ THE FIX IS CARRY-IN, NOT A RETIME. Re-spacing HEAVE would move the words
     under the caption, the beat constants in every downstream scene AND the cue
     offsets ([[feedback_a_retime_moves_three_clocks]]). Instead a heave that
     STARTED BEFORE FRAME 0 finishes its drive at f3: on frame 1 he is already
     mid-pull, the load is already moving, and f13 becomes his SECOND effort. */
  const CARRY = -11;
  /* ⭐⭐ "MAKE THE MOVEMENTS BIGGER". The constraint is that the hero cannot be
     given more TRAVEL — 260px of it is what walked him off the crop in the first
     place. So the amplitude goes where it costs no framing: a deeper body, and
     ROTATION on the load. [[feedback_make_an_action_read]] — weight is
     deformation, and a 30 degree roll repaints far more of the panel than the
     14px of translation each heave was buying. */
  const pullK = Math.max(0, antic(f, CARRY, 3)) * 0.52 + HEAVE.reduce((a, t, i) =>
    a + Math.max(0, antic(f, t - (i === 0 ? 13 : 10), t)) * (i === 0 ? 0.66 : 0.54), 0);
  const strainK = Math.min(1.2, load(f, CARRY, 3) * 0.9 + HEAVE.reduce((a, t, i) =>
    a + load(f, t - (i === 0 ? 13 : 9), t) * 1.0, 0));

  /* ⭐ THE LURCH — one impulse per break-free with a real overshoot and a ring
     down. ⛔ It must return to zero between heaves or the load reads as toppling
     rather than as being dragged ([[feedback_a_repeat_must_return_to_zero]]). */
  const lurch = (amp: number) => HEAVE.reduce((a, t, i) => {
    if (f < t) return a;
    const d = f - t;
    return a + amp * (i === 0 ? 1.15 : 1 - i * 0.12) *
      Math.sin(d / 3.4) * Math.exp(-d / 11);
  }, 0);

  /* ⭐⭐ B ROLLS. A six-foot wad of paper being hauled does not slide, it turns
     over — and a cumulative rotation is the single biggest legible movement
     available to this shot, because the four prompt cards stuck to the surface
     sweep right around the mass with it. */
  /* ⛔ AND 114 DEGREES WAS TOO MUCH: the four prompt cards stuck to the wad are
     the thing that proves it is made of PROMPTS, and past about 70 degrees they
     arrive upside down and stop reading. 72 total, front-loaded. */
  const roll = E(f, CARRY, 3, 0, 26, IN_Q) + HEAVE.reduce((a, t, i) =>
    a + E(f, t, t + 13, 0, [16, 14, 12, 10, 8][i], IN_Q), 0) + lurch(3.0);

  /* ⭐⭐ C TIPS. A banded bale rocks up onto its leading bottom edge while the
     strap comes taut, hangs there, then SLAMS flat. The coil now has a visible
     consequence instead of only a pose. */
  /* ⛔ THE CARRY-IN HEAVE HAS TO DRIVE THESE TOO. Wiring it into `pullK` alone
     left the LOAD static through f1-6 while the body moved, which is why B's
     opening did not shift when its roll was added — the frames the gate measures
     are before HEAVE[0] fires. */
  /* ⛔⛔ THE TIP LEANED THE WRONG WAY. He hauls LEFT, so friction holds the base
     and inertia holds the TOP BACK — the block leans away from the direction of
     travel, i.e. its top goes RIGHT. v1's negative angle rocked it top-left,
     which reads as the bale TOPPLING ONTO HIM rather than resisting him. */
  const tip = load(f, CARRY, 3) * 13 + HEAVE.reduce((a, t, i) =>
    a + load(f, t - (i === 0 ? 13 : 9), t) * (i === 0 ? 15 : 12), 0) + lurch(4.2);
  /* and the slam squashes it — the deformation IS the weight */
  const slam = (f >= CARRY && f <= CARRY + 12
      ? Math.sin((f - CARRY) / 3.0) * Math.exp(-(f - CARRY) / 5) * 0.075 : 0)
    + HEAVE.reduce((a, t) =>
    f < t || f > t + 12 ? a : a + Math.sin((f - t) / 3.0) * Math.exp(-(f - t) / 5) * 0.075, 0);
  /* ⛔⛔⛔ THE HERO WALKED OUT OF THE FRAME AT THE PAYOFF. The whole rig travels
     left by `sled * TRAVEL`, and at 260px that put his centre at panel x 114
     once the push and the variant camera had both scaled about the middle — so
     at f92, the exact frame where the rail takes his load and his `shock`,
     `gaze` and `lift` all fire, HALF OF HIM WAS PAST THE CROP. No gate in this
     repo looks for that: motion, look, halves, pre-cut and open all measure the
     panel's CONTENT, not whether the actor is inside it.
     ⛔ AND 150 WAS STILL WRONG, because the arithmetic was done against the push
     alone while `CamCtx` applies its own offset on top — so the corrected frame
     still had a third of him past the edge. MEASURE, DO NOT MODEL: rendered at
     150 he sat at panel x 0-130, which is 170px further left than the algebra
     said ([[feedback_cell_map_the_frame]] — three renders chasing a number a
     single measurement settles).
     ⭐ 70px. The translation was always the weakest carrier of distance here
     anyway: the wall runs 390px behind him over the same window and the floor is
     scored with drag marks, so the travel reads without walking the actor out of
     his own shot. */
  const TRAVEL = 70;
  /* the sledge only ever moves 104px total, and it moves in LURCHES */
  const sled = Math.min(1, E(f, CARRY + 4, 3, 0, 0.07, IN_Q) + HEAVE.reduce((a, t, i) =>
    a + E(f, t, t + 8, 0, [0.28, 0.23, 0.19, 0.14, 0.10][i], IN_Q), 0));

  /* ⭐ AND THE CAMERA TAKES THE HIT. Small — 5px, gone in 8 frames — but it is
     the difference between watching a heavy thing move and feeling it.
     ⛔ TRANSLATION ONLY: TILT_BANNED means the camera never rotates the world. */
  /* ⭐⭐⭐ THREE SHOTS, NOT ONE. Alex: *"the hook scene needs to be more
     interesting, cut faster and more dramatic motion."* The hook was a single
     locked 3.83s take — every other note about it has been about what is IN the
     frame, and the frame itself never changed once in 115 frames. THE-OPEN's
     multi-shot structure is the lever nobody had pulled.
       A  f0-40   WIDE, the whole haul: a small body against a big load.
       B  f40-74  TIGHT on the strap and his face — 1.66x, the effort shot.
       C  f74-115 the release: back off to 1.14x on the rail that takes it.
     ⛔ THE CUTS ARE PICTURE-ONLY. They do not touch HEAVE, the caption clock or
     the cue bank ([[feedback_a_retime_moves_three_clocks]]) — the beats stay
     where the words are, and the camera changes around them.
     ⛔ AND EACH SHOT DRIFTS. A hard cut to a locked frame reads as a slideshow;
     every shot has a slow move of its own so no cut lands on a still. */
  const SHOTS: { at: number; s: number; fx: number; fy: number; dx: number; dy: number }[] = [
    { at: 0,  s: 1.00, fx: 506, fy: 396, dx: 26,  dy: -10 },
    /* ⛔ fx 372 with a leftward drift put the hero half past the crop AGAIN —
       the fourth time this session. On a 1.66x shot every pixel of framing error
       is worth 1.66, so the tight shot gets measured, not guessed. */
    { at: 40, s: 1.58, fx: 442, fy: 500, dx: 30, dy: 12 },
    { at: 74, s: 1.14, fx: 596, fy: 430, dx: 40,  dy: -18 },
  ];
  const si = SHOTS.reduce((a, sh, i) => (f >= sh.at ? i : a), 0);
  const SH0 = SHOTS[si];
  const end = si + 1 < SHOTS.length ? SHOTS[si + 1].at : 115;
  const t = Math.max(0, Math.min(1, (f - SH0.at) / Math.max(1, end - SH0.at)));
  const shotX = 506 - SH0.fx + SH0.dx * t, shotY = 396 - SH0.fy + SH0.dy * t;
  /* ⭐ a 3-frame settle on each cut — the camera arrives with a little weight
     rather than snapping to a dead stop */
  const land = si === 0 ? 0 : Math.exp(-(f - SH0.at) / 2.6) * 0.022;
  const shotS = SH0.s * (1 + land);

  const kick = (f >= CARRY && f <= CARRY + 9
      ? Math.sin((f - CARRY) / 2.4) * Math.exp(-(f - CARRY) / 3.4) * 4.6 : 0)
    + HEAVE.reduce((a, t, i) =>
    f < t || f > t + 9 ? a : a + Math.sin((f - t) / 2.4) * Math.exp(-(f - t) / 3.4) * (i === 0 ? 5.4 : 4.2), 0);

  const card = E(f, 92, 102, 0, 1, IN_Q);          /* it arrives on the rail */
  const slack = E(f, 96, 150, 0, 1, IN_Q);       /* ⛔ IN_Q, and it runs PAST the cut */
  const stamp = E(f, 100, 106, 0, 1, BACK);

  /* the strap: taut is a straight line, slack is a sag. Both are drawn off the
     SAME two endpoints, so it can never detach from the body or the load. */
  const away = E(f, 96, 148, 0, 470, IN_Q), up = E(f, 96, 142, 0, 300, IN_Q);
  /* ⭐ THE BALL IS SHACKLED TO HIS ANKLE, NOT SLUNG OVER HIS SHOULDER. That is
     the whole reason the image reads in half a second, so the geometry has to
     honour it — a ball and chain worn as a rucksack strap is neither. */
  const ankle = false;   /* ⛔ the ankle rig went with the ball-and-chain */
  /* ⛔⛔⛔ THE STRAP CAME OFF HIS SHOULDER. `Hero` moves the sprite by
     `drive * reach` (HwWorld:570) and this anchor only ever tracked `sled`, so
     the moment `pullK` was raised for "bigger movements" the pad stayed put
     while the body walked out from under it — by f74 the hero was at panel x 20
     and his own harness was at 130. The anchor now carries the SAME term.
     ⭐ AND THE EXTRA AMPLITUDE DOES NOT GO INTO TRANSLATION. `reach` is
     multiplied by a `pullK` that is now ~2x its old peak, which is what pushed
     him off the crop for the third time in this session. The bigger movement
     belongs in DEFORMATION and in the load's rotation, so the hero is fed a
     scaled `drive` that restores his old pixel travel and a `strain` that is
     bigger than it has ever been. */
  const REACH = 126, DRIVE = -pullK * 0.55;
  const SX = (ankle ? 402 : 452) - sled * TRAVEL + DRIVE * REACH, SY = ankle ? 688 : 566;
  /* ⛔⛔ EVERY ONE OF THESE IS DERIVED FROM THE LOAD'S OWN GEOMETRY, NOT
     EYEBALLED. v1's far end was a single number reused for all three loads and
     it landed in open air on two of them — the strap ran off his shoulder and
     simply stopped short of the thing it was supposedly pulling, which is the
     one detail the whole shot depends on.
       pencil   the sledge ring: wrapper(500,250) + ring(246,290) + r14
       boulder  the rope band's near end: wrapper(600,214) + band(6,356) + h/2
       ball     the sphere's eye: wrapper(470,366) + eye(D*0.02, D*0.50) + r26 */
  /* ⛔⛔⛔ AND NOW THE FAR END MUST SIT NEAR THE LOAD'S PIVOT. Once the loads
     ROTATE, an attachment point far from the centre of rotation sweeps away from
     the strap and the rope visibly comes off the thing it is pulling — which is
     exactly what the f2/f8 stills showed on the bale. Each is taken from the
     load's own transform-origin:
       drawer  origin 22%/100% of wrapper(470,300,580,420)  ->  (598, 616)
       drafts  the rope band's own near end, which rides the WRAPPER and
               therefore does not roll with the mass          ->  (572, 566)
       bale    origin 18%/100% of wrapper(512,246,530,480), taken at 70% height
               so the rope lands on the block, not the floor  ->  (604, 582) */
  const LX = (ld === "drawer" ? 598 : ld === "drafts" ? 534 : 578) - sled * TRAVEL + away;
  const LY = (ld === "drawer" ? 616 : ld === "drafts" ? 566 : 600) - up;
  const droop = slack * (ankle ? 40 : 96);

  return (
    /* ⭐ THE PUSH IS FRONT-LOADED. Every other scene in the reel spreads its push
       over its whole length; this one reaches the same scale in 46 frames and
       then settles, so the frame the viewer meets is one that is CLOSING IN on
       the effort rather than sitting still around it. It is also the only lever
       that repaints the whole panel at once, which is what the dead top third
       needed. ⛔ 1.052 x cam.s 1.052 = 1.107, inside the 1.113 crop bound this
       file's header works out, so nothing walks off frame. */
    <Scene p={asPlace("hall")} slug="THE HAUL" push={[0, 46, 1.052]} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, transformOrigin: "506px 396px",
        transform: `scale(${shotS}) translate(${shotX - kick * 1.3}px, ${shotY + kick}px)` }}>
      <Room p={asPlace("hall")} f={f} lit={1} occ="none" weave="rank" rake={0.24}
        rakeRate={2.0} horizonDy={40} />
      {/* the work light over the haul — a practical, not a palette lift */}
      <Pool x={470} y={GYY - 40} w={1180} c={SODIUM} o={0.66} z={22} />
      <div style={{ position: "absolute", left: 0, top: 396, right: 0, height: 396, zIndex: 21,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.40)} 0%, ${hexa(SODIUM, 0.20)} 100%)` }} />
      {/* the library is behind him the whole time, dim and unvisited — ⛔ it is
          NOT the event, and the floods do not come up until 24s */}
      {/* ⛔⛔ THE TOP THIRD OF THE FRAME WAS DEAD AND THE CELL MAP FOUND IT.
          An 8x6 map of the opening six frames put 33% of all change in two cells
          (the hero and his strap) and **7% across the entire top band** — a third
          of the panel contributing almost nothing, which is why the hook opened
          at 3.5 against a 6.5 bar no matter which load was hanging off it
          ([[feedback_cell_map_the_frame]], [[feedback_deadest_half]]).
          ⭐ THE FIX IS ON-STORY, NOT DECORATION: the library is IN USE while he
          hauls. Drawers slide out and back on their own staggered clocks and the
          wall runs faster. ⭐ THE PAN IS ALSO WHERE THE TRAVEL WENT: cutting the
          rig's translation from 260px to 70px to keep the hero inside his own
          shot cost the hook 1.5 points of motion, and 5.6px/frame here buys it
          back from the SAME idea (ground covered) without walking the actor at
          the crop bound.
          wall runs faster, so the thing he is ignoring is visibly working.
          ⛔ Each drawer returns fully to rest ([[feedback_a_repeat_must_return_to_zero]])
          and they do NOT share a phase ([[feedback_a_sway_is_the_whole_cast]]). */}
      <DrawerWall f={f} x={-150} y={96} w={1320} h={300} z={18} rows={4} cols={20}
        banks={[1, 0.96, 0.92, 0.88, 0.84]} showCounters={false} pan={-(f * 5.6)}
        openAt={i => {
          const seed = rnd(i, 41);
          if (seed > 0.30) return 0;                     /* most stay shut */
          const per = 46 + rnd(i, 42) * 40;              /* its own clock */
          const t = (f + rnd(i, 43) * per) % per;
          return Math.max(0, E(t, 0, 9, 0, 1, OUT) - E(t, 15, 27, 0, 1, IN_Q));
        }} />
      {/* the lamp reaches the wall too — a light, not a repaint, so the gutters
          between the drawers stay black and BODY_BLACK does not move */}
      <div style={{ position: "absolute", left: 0, top: 96, right: 0, height: 320, zIndex: 19,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.30)} 0%, ${hexa(SODIUM, 0.16)} 100%)` }} />
      <PickRail y={452} f={f} z={26} rate={5.0} pitch={190} run={1} />
      {/* ⭐ THE RAIL HE COULD HAVE USED THE WHOLE TIME — a lit gantry across the
          top of the shot. It is the last 1.3 points of frame-0 luma and it is
          also the thing that takes his load off him at f96, so it has to be
          established before it acts. */}
      <div style={{ position: "absolute", left: -40, top: 404, width: 1100, height: 34, zIndex: 27,
        background: `linear-gradient(180deg, #FBEFD2 0%, ${mxh(BRASS, 0.44)} 46%, ${dkh(BRASS, -0.30)} 100%)` }} />
      {[90, 330, 570, 810].map((hx, i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: hx, top: 372, width: 10, height: 40,
          zIndex: 26, background: dkh(STEEL, -0.42) }} />
      ))}
      <div style={{ position: "absolute", left: -40, top: 388, width: 1100, height: 22, zIndex: 25,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.5)} 0%, ${hexa(SODIUM, 0)} 100%)` }} />

      {/* ⭐ THE WORK LAMP. A haul like this happens under one, and frame 0 is a
          brightness competition (THE-OPEN law 1) that a dark hall with a
          cast-iron machine in it cannot win on its own. ⛔ NOT a palette lift —
          this is a practical: a real reflector, a real cone, and the shadows
          behind it stay exactly as black. Reel 94 solved the same problem with a
          lit shutter filling the frame; this shot has no equivalent mass, so it
          gets the lamp instead. */}
      <div style={{ position: "absolute", left: 484, top: 96, width: 12, height: 54, zIndex: 28,
        background: dkh(STEEL, -0.48) }} />
      <div style={{ position: "absolute", left: 158, top: 138, width: 676, height: 118, zIndex: 30,
        borderRadius: "48% 48% 12px 12px",
        background: `linear-gradient(180deg, #FCF3DC 0%, ${mxh(SODIUM, 0.46)} 50%, ${dkh(SODIUM, -0.24)} 100%)`,
        border: `4px solid ${hexa("#000", 0.32)}` }} />
      <div style={{ position: "absolute", left: 178, top: 152, width: 636, height: 20, zIndex: 31,
        borderRadius: 8, background: hexa("#FFFDF4", 0.6) }} />
      <div style={{ position: "absolute", left: 216, top: 222, width: 560, height: 36, zIndex: 31,
        borderRadius: 7, background: "#FFF8E6" }} />
      <div style={{ position: "absolute", left: -20, top: 244, width: 1052, height: 548, zIndex: 23,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.54)} 0%, ${hexa(SODIUM, 0.34)} 62%, ${hexa(SODIUM, 0.24)} 100%)`,
        clipPath: "polygon(22% 0, 78% 0, 100% 100%, 0 100%)" }} />

      {/* the floor he is scoring — the evidence that this has been going on */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"sc" + i} style={{ position: "absolute", left: 902 - sled * TRAVEL + i * 22,
          top: GYY - 22 + (i % 2) * 7, width: 120 + i * 14, height: 5, borderRadius: 3,
          zIndex: 30, background: hexa("#0A0F13", 0.34) }} />
      ))}

      {/* ══════════════════ THE LOAD · THREE CANDIDATES ══════════════════ */}

      {/* ⭐ A · THE CATALOGUE DRAWER. A library's own object, levered out of the
             wall and dragged along the floor, packed with prompt cards on a
             brass rod. The wall he is dragging it past is eighty of the same
             drawer, already full — which is the whole reel in one frame. */}
      {ld === "drawer" && (
        <div style={{ position: "absolute", left: 470 - sled * TRAVEL + away, top: 300 - up,
          width: 580, height: 420, zIndex: 56,
          transform: `rotate(${E(f, 96, 142, 0, -11, IN_Q) + tip * 0.55}deg) scaleY(${1 - slam * 0.7})`,
          transformOrigin: "22% 100%" }}>
          <LoadCardDrawer x={0} y={406} s={0.92} z={58} f={f} strain={strainK}
            ink={0.3 + sled * 0.7} />
        </div>
      )}

      {/* ⭐ B · THE BALL OF DRAFTS. Every prompt he rewrote from scratch, wadded
             and compacted — it keeps the boulder's silhouette (the shape that
             read best at thumbnail size) and makes the shape MEAN the subject. */}
      {ld === "drafts" && (
        <div style={{ position: "absolute", left: 522 - sled * TRAVEL + away, top: 226 - up,
          width: 470, height: 500, zIndex: 56,
          transform: `translateY(${-Math.abs(lurch(5)) * 0.5}px) rotate(${E(f, 96, 142, 0, -14, IN_Q)}deg)`,
          transformOrigin: "48% 94%" }}>
          {/* ⭐ THE ROLL GOES ON THE MASS, NOT THE WRAPPER — the rope has to stay
              put across it while the wad turns underneath, exactly as a real
              towline would. */}
          {/* ⛔⛔ THE PIVOT HAS TO BE THE BALL'S OWN CENTRE. v1 rotated about
              48%/88% of the WRAPPER — a point near the wad's bottom edge — so by
              the third heave the accumulated angle had swung the whole mass up
              and out of the top of the frame, taking the strap with it. A thing
              that ROLLS turns about its centre; anything else is a swing.
              Ball centre = (D/2, 480 - D/2) = (225, 255) of a 470x500 wrapper. */}
          <div style={{ position: "absolute", inset: 0,
            transform: `rotate(${roll}deg)`, transformOrigin: "48% 51%" }}>
            <LoadDraftBall x={0} y={480} s={0.98} z={58} f={f} strain={strainK}
              ink={0.34 + sled * 0.66} />
          </div>
          {/* the rope bites into the wad */}
          <div style={{ position: "absolute", left: 4, top: 330, width: 360, height: 19,
            zIndex: 62, borderRadius: 3, transform: "rotate(-7deg)",
            background: `linear-gradient(180deg, ${mxh(OXIDE, 0.3)} 0%, ${dkh(OXIDE, -0.46)} 100%)`,
            border: `2px solid ${hexa("#000", 0.34)}` }} />
        </div>
      )}

      {/* ⭐ C · THE BALE. The library itself as a block: two steel bands, a
             stencil, and every visible face made of card edges with category
             tabs. The strap hooks an actual tensioner, so the rig is honest. */}
      {ld === "bale" && (
        <div style={{ position: "absolute", left: 486 - sled * TRAVEL + away, top: 268 - up,
          width: 530, height: 480, zIndex: 56,
          transform: `rotate(${E(f, 96, 142, 0, -10, IN_Q) + tip}deg) scaleY(${1 - slam}) scaleX(${1 + slam * 0.6})`,
          transformOrigin: "18% 100%" }}>
          <LoadCardBale x={0} y={462} s={0.96} z={58} f={f} strain={strainK}
            ink={0.34 + sled * 0.66} />
        </div>
      )}
      <Contact x={(ld === "drawer" ? 500 : ld === "drafts" ? 592 : 536) - sled * TRAVEL}
        y={GYY - 4} w={ld === "drawer" ? 520 : ld === "drafts" ? 420 : 470} z={32} o={0.48} />

      {/* ══ THE BODY. He is dug in — `strain` deforms him, `drive` is the haul,
             and the tremble past halfway is what says he is at his limit. ══ */}
      <Hero f={f} x={412 - sled * TRAVEL} y={GYY + 8} size={306} z={70} costume={{ constr: 1 }}
        act={1} ph={0.3} reach={REACH}
        strain={Math.min(1, strainK)} drive={DRIVE}
        heat={Math.min(0.9, 0.34 + strainK * 0.5)} stern={0.6}
        shock={E(f, 96, 106, 0, 1, OUT)} gaze={E(f, 98, 110, 0, 0.9, OUT)}
        lift={E(f, 100, 150, 0, 54, IN_Q)} />
      <Sweat x={412 - sled * TRAVEL + DRIVE * REACH} y={GYY - 210} f={f} at={4} n={9} s={1.1} z={78} rate={1.6} />
      <Contact x={322 - sled * TRAVEL + DRIVE * REACH} y={GYY} w={230} z={32} o={0.46} />

      {/* ⭐⭐ THE STRAP, OVER HIS SHOULDER AT z=86. Taut for the first 72 frames —
             this is the object the whole hook turns on, and 119 lost it once by
             putting it behind the thing it pulled. */}
      {(() => {
        const mx = (SX + LX) / 2, my = (SY + LY) / 2 + droop;
        const seg = (x0: number, y0: number, x1: number, y1: number, k: string) => {
          const dx = x1 - x0, dy = y1 - y0;
          return (
            <div key={k} style={{ position: "absolute", left: x0, top: y0 - 6,
              width: Math.hypot(dx, dy), height: 20, zIndex: 86, borderRadius: 4,
              transformOrigin: "0% 50%", transform: `rotate(${Math.atan2(dy, dx) * 57.2958}deg)`,
              background: ankle ? "transparent"
                : `linear-gradient(180deg, ${mxh(OXIDE, 0.34)} 0%, ${dkh(OXIDE, -0.44)} 100%)`,
              border: ankle ? "none" : `2px solid ${hexa("#000", 0.34)}` }}>
              {/* ⭐ a chain is LINKS. Drawn along the same segment so it can never
                  come off either end, and counted off the segment's own length. */}
              {ankle && Array.from({ length: Math.max(2, Math.round(Math.hypot(dx, dy) / 34)) }, (_, i) => (
                <div key={"cl" + i} style={{ position: "absolute", left: i * 34, top: -2,
                  width: 40, height: 24, borderRadius: "50%",
                  border: `8px solid ${dkh(STEEL, i % 2 ? -0.34 : -0.14)}`,
                  transform: `rotate(${i % 2 ? 74 : 0}deg)` }} />
              ))}
            </div>
          );
        };
        return (<>{seg(SX, SY, mx, my, "s1")}{seg(mx, my, LX, LY, "s2")}</>);
      })()}
      {/* the harness pad on his shoulder, so the strap terminates on a THING */}
      <div style={{ position: "absolute", left: SX - 34, top: SY - 26,
        width: ankle ? 74 : 68, height: ankle ? 34 : 46,
        borderRadius: ankle ? 6 : 8, zIndex: 88,
        background: ankle ? `linear-gradient(180deg, ${mxh(STEEL, 0.2)} 0%, ${dkh(STEEL, -0.44)} 100%)`
          : dkh(OXIDE, -0.2),
        border: `3px solid ${hexa("#000", ankle ? 0.5 : 0.4)}` }} />

      {/* the rail hook that takes the load — ⛔ a lift with no visible cause is a
          FLOAT ([[ANIMATION-QUALITY §12]]); this one comes down, closes, and pulls */}
      {f > 84 && (
        <div style={{ position: "absolute",
          left: (ld === "drawer" ? 764 : ld === "drafts" ? 774 : 800) - sled * TRAVEL + away,
          top: 452 - E(f, 96, 142, 0, 300, IN_Q) * 0.42,
          width: 14, height: 190 + E(f, 84, 96, 0, 60, OUT) - E(f, 96, 142, 0, 300, IN_Q) * 0.58,
          zIndex: 60, background: dkh(STEEL, -0.30) }} />
      )}
      {f > 84 && (
        <div style={{ position: "absolute",
          left: 806 - sled * TRAVEL + E(f, 96, 148, 0, 470, IN_Q),
          top: 636 + E(f, 84, 96, 0, 60, OUT) - E(f, 96, 142, 0, 300, IN_Q),
          width: 54, height: 54, zIndex: 61, borderRadius: "0 0 27px 27px",
          border: `9px solid ${dkh(BRASS, -0.18)}`, borderTop: "none" }} />
      )}

      {/* ⭐ THE GRIT FROM THE HEAVE BEFORE FRAME 0. Authored explicitly rather
             than with a negative `at`, so it is unambiguously already airborne
             and already falling on frame 1 — the second half of the carry-in. */}
      {f < 26 && Array.from({ length: 11 }, (_, i) => {
        const t = f + 9 + i * 0.7, k = Math.max(0, 1 - t / 34);
        return (
          <div key={"cg" + i} style={{ position: "absolute",
            left: 792 - sled * TRAVEL - i * 21 + t * (1.4 + rnd(i, 51) * 2.2),
            top: GYY - 26 - t * (2.9 + rnd(i, 52) * 2.4) + t * t * 0.075,
            width: (9 + rnd(i, 53) * 11) * k + 3, height: (9 + rnd(i, 54) * 11) * k + 3,
            borderRadius: "50%", zIndex: 62, opacity: k * 0.8,
            background: i % 3 ? "#A8B6BE" : "#CBD5DA" }} />
        );
      })}

      {/* the grit each break-free throws */}
      {HEAVE.map((t, i) => f > t && f < t + 22 && (
        <Puff key={"gp" + i} x={790 - sled * TRAVEL} y={GYY - 8} f={f} at={t} c="#8FA4AE"
          n={9} s={1.1} z={60} />
      ))}

      {/* ⭐ AND THE ONE THAT ARRIVES ON THE RAIL — the load was never his to pull */}
      {f > 91 && (
        <PromptCard x={628} y={GYY - 30 + (1 - card) * -320} s={0.94} z={80} ph={2} ink={1}
          fill={E(f, 102, 148, 0, 1, LIN)} cat={R.catNames[1]} big f={f}
          rot={(1 - card) * 26 - 3} />
      )}
      {f > 101 && <Ring x={628} y={GYY - 30} f={f} at={102} c="#F0DFB2" z={82} s={1.1} />}
      {f > 101 && <Puff x={628} y={GYY - 24} f={f} at={102} c="#CFC1A4" n={8} z={78} s={1.0} />}

      <div style={{ position: "absolute", left: 44, top: GYY - 380, zIndex: 88,
        transform: `scale(${stamp}) rotate(${-9 + (1 - stamp) * 12}deg)`, transformOrigin: "0% 100%",
        opacity: stamp }}>
        <div style={{ padding: "12px 28px", borderRadius: 6, background: "#2E6E4E",
          border: "5px solid #17402C", ...ui(54, 900), color: "#F2FBF5", letterSpacing: "0.06em" }}>
          FREE
        </div>
      </div>
      </div>
      <Mark x={846} y={128} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   B · THE SLOT.  "You didn't need to write one."
   ⭐ A TRANSACTION WITH A JOKE ([[feedback_a_transaction_not_a_conveyor]]): he
   puts one in, the machine gives him back fifty-two, and it does not stop.
   ====================================================================== */
const HookSlot: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const MX = 506, MY = 118;
  const post = antic(f, -10, 6);                /* ⛔ already going in at f0 */
  const spit = E(f, 14, 22, 0, 1, IN_Q);        /* and straight back out at f14 */
  const POUR = Array.from({ length: 40 }, (_, i) => 20 + i * 2.4);
  const poured = POUR.filter(t => f >= t).length;
  return (
    <Scene p={asPlace("console")} slug="THE SLOT" push={[0, dur + 14, 1.040]} vig={0.54}>
      <Room p={asPlace("console")} f={f} lit={0.52} occ="none" weave="plain" rake={0.0}
        horizonDy={40} />
      <Spot x={MX} w={860} top={26} o={0.66} c={BRASS} />

      {/* ⭐ ONE MACHINE, DEAD CENTRE, AND NOTHING ELSE IN THE ROOM */}
      <div style={{ position: "absolute", left: MX - 330, top: MY - 24, width: 660, height: 548,
        zIndex: 40, borderRadius: 8,
        background: `linear-gradient(176deg, ${mxh(BRASS, 0.62)} 0%, ${mxh(BRASS, 0.18)} 46%, ${dkh(BRASS, -0.40)} 100%)`,
        border: `6px solid ${hexa("#000", 0.44)}` }} />
      {/* its face: a maker's plate, the slot, the tray */}
      <div style={{ position: "absolute", left: MX - 176, top: MY + 34, width: 352, height: 56,
        zIndex: 42, borderRadius: 4, background: "#12171C", display: "flex", alignItems: "center",
        justifyContent: "center", ...mono(25, 800), color: hexa("#F2E2BE", 0.86),
        letterSpacing: "0.20em" }}>PROMPT LIBRARY</div>
      {/* THE SLOT — a HOLE: the machine stops at it */}
      <div style={{ position: "absolute", left: MX - 142, top: MY + 122, width: 284, height: 30,
        zIndex: 44, borderRadius: 3, background: "#05070A",
        border: `5px solid ${hexa("#000", 0.6)}` }} />
      <Stencil x={MX} y={MY + 166} t="IN" c={hexa("#F0DCB0", 0.66)} z={44} size={19} align="c" />
      {/* THE TRAY it delivers into */}
      <div style={{ position: "absolute", left: MX - 232, top: MY + 328, width: 464, height: 128,
        zIndex: 52, borderRadius: 5, background: "#0A0D11",
        border: `6px solid ${dkh(BRASS, -0.34)}` }} />
      <Stencil x={MX} y={MY + 300} t="OUT" c={hexa("#F0DCB0", 0.66)} z={44} size={19} align="c" />

      {/* his card goes IN, and comes straight back out */}
      {f < 18 && (
        <div style={{ position: "absolute", left: MX - 96, top: MY + 250 - post * 120,
          width: 192, height: 116, borderRadius: 3, zIndex: 48, background: BLANK,
          border: `4px solid ${hexa("#000", 0.30)}`, transform: `rotate(${-4 + post * 4}deg)` }} />
      )}
      {f >= 14 && f < 44 && (
        <div style={{ position: "absolute", left: MX - 96 - spit * 300, top: MY + 130 - spit * 40 + spit * spit * 300,
          width: 192, height: 116, borderRadius: 3, zIndex: 60, background: BLANK,
          border: `4px solid ${hexa("#000", 0.30)}`, transform: `rotate(${spit * -180}deg)` }} />
      )}

      {/* ⭐ AND THEN IT FILLS. Twenty-six land in the tray and OVERFLOW onto the
          floor — the joke escalates rather than repeating. */}
      {POUR.map((t, i) => {
        if (f < t) return null;
        const k = E(f, t, t + 9, 0, 1, IN_Q);
        const over = i > 13;
        const x = MX - 190 + (i % 7) * 62 + (over ? (rnd(i, 5) - 0.5) * 460 : 0);
        const y = MY + 356 + (over ? 210 + rnd(i, 6) * 80 : (i % 2) * 18);
        return (
          <div key={"po" + i} style={{ position: "absolute", left: x, top: y - (1 - k) * 320,
            width: 118, height: 74, borderRadius: 3, zIndex: 54 + i,
            background: i % 3 === 0 ? "#F7F3E6" : BLANKD,
            borderLeft: `8px solid ${PHASE[i % 5].c}`, border: `3px solid ${hexa("#000", 0.28)}`,
            transform: `rotate(${(1 - k) * 30 + (rnd(i, 7) - 0.5) * 40}deg)` }} />
        );
      })}

      {/* he is beside it, and he steps BACK as it keeps coming */}
      <Hero f={f} x={886} y={706} size={214} z={70} costume={{ constr: 1 }} flip
        act={3} ph={0.9} reach={120}
        drive={post * 0.5 - E(f, 26, 56, 0, 0.5, OUT)}
        gaze={-0.6} shock={E(f, 14, 24, 0, 1, OUT)}
        heat={E(f, 24, 96, 0.2, 0.8, LIN)} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 736, textAlign: "center",
        zIndex: 88, ...mono(72, 900), color: "#F8EFD8" }}>{String(poured * 2).padStart(2, "0")}</div>
      <Mark x={124} y={128} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   C · THE DRAWER.  "This is one drawer."
   ⭐ ANTICIPATION IS THE WHOLE SHOT: he BRACES, the drawer RESISTS, and then it
   comes — and keeps coming. Travel is in DEPTH, toward camera.
   ====================================================================== */
const HookDrawer: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  /* he braces f6-20, it resists, it tears open at f22 and runs out to f78 */
  const brace = load(f, -10, 10);   /* ⛔ already braced at f0 */
  const outk = E(f, 10, 74, 0, 1, IN_Q);
  const pull = E(f, 30, dur + 10, 0, 1, LIN);
  return (
    <Scene p={asPlace("hall")} slug="ONE DRAWER" push={[0, dur + 14, 1.026]} vig={0.50}>
      <Room p={asPlace("hall")} f={f} lit={0.62 + pull * 0.3} occ="none" weave="plain" rake={0.0}
        horizonDy={90} />
      <Spot x={506} w={840} top={22} o={0.66} c={TEAL} />

      {/* ⭐ AT FIRST THERE IS ONE DRAWER AND NOTHING ELSE. The wall it sits in is
          revealed only by the pull-back, which is where the joke is. */}
      <Cam x={0} y={pull * 40} s={1.62 - pull * 0.92} z={26}>
        <DrawerWall f={f} x={-660} y={-190} w={2340} h={640} z={22} rows={5} cols={26}
          banks={[0.5 + pull * 0.5, 0.44 + pull * 0.5, 0.4 + pull * 0.5, 0.36 + pull * 0.5, 0.32 + pull * 0.5]}
          showCounters={false} pan={-(f * 1.1)} />
        {/* the one that is being opened, drawn over the rank it came from */}
        <div style={{ position: "absolute", left: 506 - 210, top: 214, width: 420,
          height: 132, zIndex: 60, borderRadius: 4,
          background: `linear-gradient(178deg, ${mxh(DRW, 0.44)} 0%, ${DRWD} 100%)`,
          border: `5px solid ${hexa("#000", 0.44)}`,
          transform: `translateY(${brace * -6}px) scale(${1 + outk * 0.9})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: 40, top: 22, width: 150, height: 22,
            borderRadius: 3, background: PHASE[2].c }} />
          <div style={{ position: "absolute", left: 240, top: 40, width: 130, height: 30,
            borderRadius: 4, background: DRWL, borderBottom: `4px solid ${hexa("#000", 0.44)}` }} />
        </div>
        {/* the cards inside it, coming toward camera and never running out */}
        {Array.from({ length: 20 }, (_, i) => {
          const k = Math.max(0, Math.min(1, outk * 2.2 - i * 0.07));
          if (k <= 0) return null;
          const sc = 0.34 + k * 1.15;
          return (
            <div key={"dc" + i} style={{ position: "absolute",
              left: 506 - 150 * sc + (rnd(i, 3) - 0.5) * 40 * k,
              top: 236 + k * (150 + i * 15), width: 300 * sc, height: 22 * sc,
              borderRadius: 3, zIndex: 62 + i,
              background: i % 4 === 0 ? "#F7F3E6" : i % 3 === 0 ? BLANK : BLANKD,
              borderLeft: `${9 * sc}px solid ${PHASE[i % 5].c}`,
              border: `${3 * sc}px solid ${hexa("#000", 0.28)}`,
              transform: `rotate(${(rnd(i, 4) - 0.5) * 7}deg)` }} />
          );
        })}
      </Cam>

      {/* ⭐ HE BRACES AGAINST IT — `load` peaks in the COIL, so the drawer is
          visibly REFUSING for fourteen frames before it comes. */}
      <Hero f={f} x={856 - pull * 60} y={716} size={236 - pull * 66} z={78}
        costume={{ constr: 1 }} flip act={1} ph={0.5} reach={140}
        strain={brace} drive={-brace * 0.5 + E(f, 10, 28, 0, 0.5, OUT)}
        shock={E(f, 10, 22, 0, 1, OUT)} heat={0.35 + brace * 0.5} />
      {f > 8 && <Puff x={506} y={330} f={f} at={10} c="#9FB4BE" n={10} s={1.2} z={70} />}
      {f > 8 && <Ring x={506} y={330} f={f} at={10} c="#BFE6F0" z={71} s={1.2} />}
      <Stencil x={506} y={772} t="ONE DRAWER" c={hexa("#DDEEF4", 0.78)} z={88} size={23} align="c" />
      <Mark x={124} y={128} s={84} z={92} />
    </Scene>
  );
};

/** ⛔ ONE PICTURE, THREE LOADS — everything else in the shot (the heaves at
    f13/32/52/72/88, the rail that takes it at f96, the lamp, the SFX bank) is
    identical, so the strip below compares the OBJECT and nothing else. */
const HookHaul: React.FC<HP> = p => <HookHaulBase {...p} ld="drawer" />;
const HookHaulB: React.FC<HP> = p => <HookHaulBase {...p} ld="drafts" />;
const HookHaulC: React.FC<HP> = p => <HookHaulBase {...p} ld="bale" />;

export const HOOKS: Record<HookId, React.FC<HP>> = {
  haul: HookHaul, haulb: HookHaulB, haulc: HookHaulC,
  slot: HookSlot, drawer: HookDrawer,
};
