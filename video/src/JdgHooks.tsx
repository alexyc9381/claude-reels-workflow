import React from "react";
import { useCurrentFrame } from "remotion";
import { HookHeader } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh,
  Scene, Cam, Contact, Pool, Ring, Puff, Motes, Beam, Mark, Hero, Crew, Forearm, Sweat,
  mono, ui, CLAY, INK, GREEN, RED, GOLD,
  Chamber, asPlace, PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL, BLOCKS,
  FACE, FACED, VOID, C_JUDGE, C_PROS, C_DEF, R,
  settle, antic, load, stroke, STEP,
} from "./JdgWorld";
import { Car, Ladder, Bridge, Press, StatusLamp, Locker, Load, Tank, Unit, Tower, BlockLine, Plinth, Nameplate } from "./JdgProps";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE HOOK, THREE CONCEPTS.

   ⛔⛔⛔ THE FIRST BUILD STEP OF A REEL IS NOT SCENE 0, IT IS N CONCEPTS FOR
   SCENE 0 ([`docs/THE-OPEN.md`] step 1). Three genuinely different 76-frame
   shots, built at full quality, scored with `tools/hook_score.py`, and one
   picked. A hook is cheap to try and expensive to argue about after it is built.

   ⛔⛔⛔ AND THE FIRST BUILD OF ALL THREE FAILED THE SAME WAY, WHICH IS WHY THE
   LAYOUT NOTES BELOW ARE SO SPECIFIC. `<HookHeader>` was rendered INSIDE
   `<Scene>`, so it inherited the panel's camera push and sat as a white slab
   across the MIDDLE of the frame — over the hero's head. Every one of the three
   cuts rendered with **no visible Claude in it** and every gate was silent about
   it, because no gate can see a missing character
   ([[feedback_no_gate_can_see_a_missing_character]]). It was found by rendering
   a contact strip and LOOKING at frame 0.
   ⭐ THE CHASSIS RULE THIS BREAKS: **ROOT OWNS THE GLOBAL CHROME.** The header,
   the caption track, the rail and the bed belong to the composition; scene
   bodies see none of them. `HookChrome` below is exported for the root to draw.

   THE MEASURED STATE OF v1, kept because the deltas are the useful part:
       cut     MOTION  MEDIAN  0-1s FLOOR  HOLD   PRE-CUT  LUMA
       OATH     4.74    3.42      1.95     68.0%   0.43    117.1
       STACK    5.12    4.71      3.74     72.0%   0.38    109.3
       SEAL     5.27    4.57      2.35     68.0%   0.51    114.4
   ⛔ ALL THREE PRE-CUT RATIOS ARE UNDER 0.70, i.e. all three DIE into the cut —
      the chain finished at f66 and then held. §23: anything crossing a cut must
      be `LIN` or `IN`, and the fix is not to extend an `OUT` ease past the cut,
      which decelerates into its end whether or not that end is on screen.
   ⛔ AND THE LUMA DEFICIT WAS MEASURED, NOT GUESSED (`tools/jdg_bands.py`):
      12 bands put **23.7 points of a 22.4-point deficit in bands 9-11**, the
      bottom quarter, at 47.3 / 40.8 / 47.2. The floor. The fix is NOT to lift
      the shading ([[feedback_push_the_two_values_apart]]) — it is that a
      courthouse floor is STONE and I had painted it as dark oak. Every piece of
      furniture kept its value, so the spread is untouched.

   THE FIVE RULES ALL THREE ARE BUILT AGAINST ([[ANIMATION-QUALITY §31]] —
   reel 129's hook was rejected EIGHT times with every gate green):
   ⭐ 1. EVERY BEAT IS A WORD, at `word_onset - 4`
         ([[feedback_the_picture_leads_the_voice]]):
           f0  (settled)   the frame a viewer is guaranteed to see
           f7  "prompting" THE BODY ACTS — the trigger
           f15 "technique" the first consequence, and it TRAVELS
           f26 "stops"     the second, bigger
           f32 "Claude"    the third
           f44 "lying"     ⭐ THE PAYOFF — the word the shot is built on
           f56 "to"        the aftermath
           f66 "face"      the last image
   ⭐ 2. DISCRETE STROKES, NOT RAMPS — `stroke()`/`antic()`, summed. A constant
         ramp has no future in it, which is what "just moving back and forth"
         actually means.
   ⭐ 3. ONE CAUSE, SEVERAL VISIBLE EFFECTS — one accumulator drives them all.
   ⭐ 4. A CAUSAL CHAIN, NOT ONE EVENT REPEATED, and it STARTS WITH A BODY.
   ⭐ 5. A HOOK IS AN IMAGE, NOT A ROOM. One dominant object, an empty stage.

   THE THREE BARS EVERY HOOK OBJECT CLEARS ([[feedback_the_verb_must_have_logic]]):
     | | name it in 2 words | can a BODY do that | ⭐ IS IT THE SUBJECT |
     | A OATH  | "witness box" | he stands in it and swears | Claude testifying its own work is good |
     | B STACK | "claim stack" | he stacks it; it bows the rail | every claim Claude makes about the work |
     | C SEAL  | "the seal"    | he drives it down two-handed | Claude certifying its own work done |

   ⛔ THE LAYOUT CONTRACT, SO NO CUT LOSES ITS HERO AGAIN:
      panel is 1012x792, panel-local. `HookHeader` is drawn by the ROOT at comp
      `top:322`, i.e. it covers panel-local y **0..118** and nothing else.
      · nothing that must be read may sit above y=130
      · the sprite band is x 208..879 and FEET <= 672
      · `Scene` push walks content off-frame: keep `left >= 506 - 486/push`
   ========================================================================= */

export type HookId = "oath" | "stack" | "seal";
export type Variant = "house" | "amber" | "steel";

/** ⛔⛔ THE HOOK HAD NO PER-CUT RAKE AT ALL. `RK` lived in `JdgScenes.tsx` and the
    hook's `Chamber` was called with a hardcoded `bays={4} rakeRate={4.0}`, so all
    three cuts shared one pitch across the entire hook — and dHash found it
    exactly there: **f44, house vs amber = 6 bits of 64** against a MIN bar of 10,
    the single weakest frame pair in the reel. The rake is the biggest measured
    dHash lever and the hook is the most-viewed 2.5 seconds of the reel, so it is
    the last place that should be sharing a pitch. It lives here now, and
    `JdgScenes` imports it, so hook and body cannot drift apart again. */
export const RK: Record<Variant, { n: number; rate: number }> = {
  house: { n: 4, rate: 4.0 }, amber: { n: 7, rate: 3.0 }, steel: { n: 3, rate: 5.2 },
};

export const HDR_BIG = "CLAUDE SIGNS OFF";
export const HDR_HOT = "ITS OWN WORK";

/** ⭐ THE CHROME THE ROOT DRAWS — never inside `Scene`. The header states a
    CLAIM rather than a description, and the chip carries what you GET
    ([[feedback_the_band_states_the_value]]): the name alone says what the thing
    is called, not what it does for you. Four words a line. */
export const HookChrome: React.FC<{ f: number }> = ({ f }) => (
  <HookHeader big={HDR_BIG} hot={HDR_HOT} f={f} at0 />
);

/* THE BEATS — one shared table, so all three cuts are cut to the same words and
   only the PICTURE differs. ⛔ If these stop matching `words_132judge.json`,
   `tools/beat_audit.py` fails the build. */
export const B = { TRIG: 7, E1: 15, E2: 26, E3: 32, PAY: 44, AFT: 56, LAST: 66 } as const;

/** ⭐ THE BACKGROUND PROCESS EVERY SHOT NEEDS — dust in the shaft, big enough to
    survive the audit's 1012->240 downsample (anything under ~8px becomes 0.7px
    and is differenced away; reel 106 ran 46 rain streaks every frame and still
    scored 4.96). These are 14-30px and they CROSS the frame. */
const ShaftDust: React.FC<{ f: number; x: number; w: number; z?: number }> =
  ({ f, x, w: ww, z = 20 }) => (<>
    {Array.from({ length: 12 }, (_, i) => {
      const t = ((f * (0.0055 + rnd(i, 61) * 0.004) + rnd(i, 62)) % 1);
      const s = 14 + rnd(i, 63) * 16;
      return (
        <div key={"dm" + i} style={{ position: "absolute",
          left: x - ww / 2 + rnd(i, 64) * ww + Math.sin(t * 5 + i) * 30,
          top: 90 + t * 560, width: s, height: s, borderRadius: "50%", zIndex: z,
          opacity: 0.30 * (1 - Math.abs(t - 0.5) * 1.1),
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#FFF6DE", 0.9)} 0%, ${hexa("#FFF6DE", 0)} 100%)` }} />
      );
    })}
  </>);

/* =========================================================================
   ⭐ THE OATH HAND — drawn in the MASCOT'S OWN VOCABULARY.

   ⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY. `SlopKit.Mascot` is blocky pixel art
   on a 200-unit viewBox: the body is `rect x=34 y=44 w=132 h=102` and the hands
   are two 26x26 SQUARES at x=8 and x=166. **There are no drawn arm limbs at
   all.** So the `Forearm` helper I first used here — a long tapered limb from
   the shoulder to a raised fist — rendered as a stick with a ball on the end,
   because it had nothing to attach to. A limb terminating in mid-air reads as a
   TAIL on every sprite in the reel, and that cost reel 110 two rounds.
   ⭐ The right raised hand is therefore ONE MORE 26x26 SQUARE in the same paint,
   at the same fraction of `size`, lifted. It matches because it is the same
   shape the rig already draws.
   ========================================================================= */
const OathHand: React.FC<{ x: number; y: number; size: number; down: number; z?: number }> =
  ({ x, y, size, down, z = 64 }) => {
  const u = size / 200;                    /* one viewBox unit, in panel px */
  const bodyTop = y - size + 44 * u;       /* `rect x=34 y=44 w=132 h=102` */
  const shX = x - size / 2 + 150 * u;      /* just inside the body's right edge */
  const lift = 1 - Math.max(0, Math.min(1, down));
  /* ⭐ THE ARM GOES STRAIGHT UP, ABOVE THE HEAD, AGAINST THE PALE PLASTER.
     Three drawings of this gesture failed before this one and each failure was
     a different rule:
       · a tapered `Forearm` -> a stick with a ball on it. The rig draws NO arm
         limbs, only two 26x26 hand SQUARES, so there was nothing to attach to.
       · a single square at head height -> read as an EAR.
       · a stepped arm angled up-and-RIGHT at z=52 -> disappeared behind the
         board, which is the one object it was supposed to be sworn over.
     ⭐ The fix is silhouette, not size: raised STRAIGHT UP it clears the head and
     sits clay-on-plaster, which is the biggest value gap available in the frame.
     "Light on light" is what answers *"I can't tell what that is"* far more
     often than shape does. */
  /* ⛔ AND THE FOURTH THING WRONG WITH THIS ARM WAS ARITHMETIC, NOT DESIGN.
     At 46 units of rise per segment the hand topped out at panel y=100 — inside
     the 0..118 band the root's header covers — so the gesture the shot is about
     was being drawn underneath the title card. Spacing 30 puts the hand at
     y~200, clear of the header and clear of the head, against the plaster. */
  const seg = 34 * u;
  return (<>
    {[0, 1, 2, 3].map(i => {
      const isHand = i === 3;
      const w = isHand ? 44 * u : 34 * u;
      const rise = lift * (26 + i * 30) * u;
      return (
        <div key={"oa" + i} style={{ position: "absolute", zIndex: z,
          left: shX + i * 4 * u - w / 2,
          top: bodyTop + 46 * u - rise - (isHand ? w * 0.55 : 0),
          width: w, height: isHand ? w : seg,
          borderRadius: isHand ? 4 : 0,
          background: isHand ? CLAY : dkh(CLAY, 0.12),
          transform: `rotate(${lift * (i * 1.6 - 2)}deg)` }} />
      );
    })}
  </>);
};

/* ── SHARED: the room every option is staged in ─────────────────────────── */
const HookRoom: React.FC<{ v: Variant; f: number; shaft: number }> = ({ v, f, shaft }) => (<>
  <Chamber p={asPlace("box")} f={f} lit={1} occ="l" bays={4} shaft={shaft} shaftO={0.34}
    rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={8} rail horizonDy={-16} occW={112} />
  <ShaftDust f={f} x={shaft + 30} w={520} z={22} />
  <Pool x={330} y={548} w={1010} c="#FFFCF2" o={0.84} z={12} />
  <Pool x={700} y={702} w={1010} c="#FFFCF2" o={0.86} z={12} />
  <Pool x={506} y={382} w={1010} c="#EAF6FA" o={0.34} z={11} />
</>);

const Gallery: React.FC<{ f: number; pay: number; e2: number }> = ({ f, pay, e2 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 452,
    overflow: "hidden", zIndex: 26 }}>
    {[336, 566, 828].map((gx, i) => (
      <Crew key={"gl" + i} f={f} x={gx} y={556} i={i + 3} size={206} z={26}
        at={-14} loop={[3, 0, 3][i]} tint={dkh(CLAY, 0.10)}
        cheer={f >= pay ? 0.6 : f >= e2 ? 0.25 : 0} />
    ))}
  </div>
);

/* =========================================================================
   ⭐⭐⭐ ALL THREE OF THESE ARE A BODY DOING PHYSICAL WORK AGAINST A LOAD, AND
   THAT IS THE WHOLE POINT OF THE REBUILD.

   Five hooks were rejected before them and every one had the same defect, which
   [[feedback_a_hook_needs_a_body_not_a_mechanism]] already names: *"an apparatus
   performing, with a Claude standing next to it. An apparatus has no intention,
   so there is nothing to anticipate."*
   ⭐ Reel 119 went 7.88 -> 15.63 on the fix, and it is not more motion — it is a
   CHARACTER STRAINING. So in all three the hero is under load from frame 0, the
   strain peaks in the COIL before each hit (`load()`), and the anticipation is
   the thing 119 puts its whole first beat on: *a rope going tight with nothing
   happening yet.*
   ⭐⭐ AND IT IS THE SAME SHAPE AS THE LIE. He is holding it together WHILE
   telling you it is fine — the thumbs-up never comes down, in any of the three,
   including after he has lost. That is what "to your face" means.
   ========================================================================= */

/** the free hand, held at camera the whole way through — the claim that never
    gets withdrawn. ⛔ It is the LAST thing to move in every one of these. */
const ThumbUp: React.FC<{ x: number; y: number; size: number; z?: number; k?: number }> =
  ({ x, y, size, z = 66, k = 1 }) => {
  const u = size / 200, s = 30 * u;
  return (
    <div style={{ position: "absolute", left: x - size / 2 + 14 * u, top: y - size + 78 * u,
      width: s, height: s * 1.5, zIndex: z, borderRadius: 5,
      background: dkh(CLAY, 0.04), transform: `rotate(${-16 * k}deg)` }}>
      <div style={{ position: "absolute", left: -s * 0.34, top: -s * 0.5, width: s * 0.52,
        height: s * 0.86, borderRadius: 4, background: CLAY,
        transform: `rotate(${-14 * k}deg)` }} />
    </div>
  );
};

/* =========================================================================
   A · HOLDING THE DOOR SHUT — his back is against it, his feet are skidding, and
   the mess inside is winning an inch at a time.
   ========================================================================= */
export const HookOath: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const HITS = [B.TRIG, B.E1, B.E2, B.E3];
  /* ⭐ THE COUNTDOWN IS THE GAP, and each slam is a stroke with a COIL in front
     of it — the strain peaks before the hit, which is where a body is most
     visibly loaded. */
  const gap = HITS.reduce((a, at, i) => a + stroke(f, at, 0.20 + i * 0.05, 5)
                                          - stroke(f, at + 6, 0.13 + i * 0.03, 7), 0.06);
  const skid = HITS.reduce((a, at, i) => a + (f >= at ? E(f, at, at + 8, 0, 15 + i * 5, OUT) : 0), 0);
  const strain = 0.5 + HITS.reduce((a, at) => a + load(f, at - 7, at) * 0.5, 0);
  const LX = 726, LY = 726, SX = 452, SFEET = 734, SIZE = 380;
  const blown = f >= B.PAY;
  return (
    <Scene p={asPlace("box")} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <HookRoom v={v} f={f} shaft={300} />
      <BlockLine f={f} y={240} z={30} rate={RK[v].rate * 1.5} n={6} s={1.35} back={0.68} />
      <Locker x={LX} y={LY} f={f} w={356} h={492} z={56} gap={gap} burst={B.PAY} />
      {/* what gets out once he loses — big, saturated, and still travelling */}
      {blown && Array.from({ length: 7 }, (_, i) => {
        const lf = f - B.PAY - i;
        if (lf < 0) return null;
        const c = BLOCKS[i % BLOCKS.length];
        const px = LX - 40 - lf * (11 + i * 2.4);
        const py = LY - 300 + i * 34 + lf * lf * 1.5;
        if (px < -180 || py > 900) return null;
        return (
          <div key={"out" + i} style={{ position: "absolute", left: px - 62, top: py - 24,
            width: 124, height: 48, zIndex: 72, borderRadius: 5, boxShadow: SH,
            transform: `rotate(${-lf * 8 - i * 20}deg)`,
            background: `linear-gradient(172deg, ${mxh(c, 0.28)} 0%, ${c} 46%, ${dkh(c, 0.42)} 100%)`,
            border: `3px solid ${dkh(c, 0.5)}` }} />
        );
      })}
      {HITS.map((at, i) => (
        f >= at && f < at + 12
          ? <Puff key={"h" + i} x={LX - 170} y={LY - 240} f={f} at={at} n={7} s={1.0} c="#CFC4AE" z={70} />
          : null
      ))}
      {blown && <Ring x={LX} y={LY - 250} f={f} at={B.PAY} c={BRSL} z={74} s={1.9} dur={30} />}
      {/* ── THE BODY, BRACED. `strain` squashes and trembles him; the skid is the
             ground he is losing. ── */}
      <Contact x={SX - 122 - skid} y={SFEET - 8} w={244} z={46} o={0.46} />
      <Hero f={f} x={SX - skid} y={SFEET + (blown ? E(f, B.PAY, B.PAY + 10, 0, 40, OUT) : 0)}
        size={SIZE} z={62} costume={{}} tint={CLAY}
        strain={blown ? 0.2 : Math.min(0.95, strain)}
        shock={blown ? E(f, B.PAY, B.PAY + 6, 0, 0.85, OUT) : 0}
        gaze={0.35} act={1} ph={0.4} />
      <ThumbUp x={SX - skid} y={SFEET} size={SIZE} z={68} />
      <Gallery f={f} pay={B.PAY} e2={B.E2} />
      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   B · HOLDING IT UP — he is under everything he has signed off, and it is his own
   green lights that are crushing him.

   ⛔⛔⛔ ELEVATED AFTER "the concept is right but it is still boring somehow."
   The concept WAS right and the shot was still one thing happening five times:
   a slab lands, he sinks, repeat. [[ANIMATION-QUALITY §31.4]] names that exactly
   — *"a causal chain, not one event repeated. Reel 129's failed hooks repeated
   ONE event — rain falling, boxes landing, a ball rolling — which is a texture,
   not a story."* Reel 119's chain is five DIFFERENT events, each caused by the
   last: the pin drops -> the slack leaves the chain -> the ox digs in -> the rig
   moves -> the dial spins past its stop.

   ⭐ SO THIS IS A CHAIN NOW, AND EVERY LINK IS CAUSED BY THE ONE BEFORE IT:
     f2  "new"       he TAKES the weight — locks his arms and sets his grip
     f7  "prompting" because his arms lock, his KNEES go
     f15 "technique" because his knees go, his feet splay and THE FLOOR CRACKS
     f26 "stops"     because the floor gives on one side, the STACK TILTS
     f32 "Claude"    because it tilts, the TOP UNIT STARTS TO SLIDE off the back
     f44 "lying"     ⭐ the slide takes the balance and the whole lot comes down
     f66 "face"      it is still scattering, and his thumb is still up

   ⭐⭐ AND ONE CAUSE, SEVERAL VISIBLE EFFECTS (§31.3): the strain drives the sink,
   the tremble, the sweat, the crack widening AND the green lamps flickering — his
   own sign-offs wavering while he insists they are fine.
   ⛔ THE CRACK IS THE COUNTDOWN. [[feedback_a_wobble_is_not_a_clock]] wants a
   VISIBLE countdown, not an unstable-looking state: the split under his feet
   grows on every beat and you can see how far it has left to go.
   ========================================================================= */
export const HookStack: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const GRIP = 2, KNEES = B.TRIG, FLOOR = B.E1, TILT = B.E2, SLIDE = B.E3;
  const blown = f >= B.PAY;

  /* the chain, each link a function of the one before it */
  const grip  = E(f, GRIP, GRIP + 6, 0, 1, BACK);
  const knees = E(f, KNEES, KNEES + 9, 0, 1, OUT);
  const crack = E(f, FLOOR, FLOOR + 10, 0, 1, OUT) + E(f, TILT, TILT + 10, 0, 0.6, OUT)
              + E(f, B.PAY, 92, 0, 1.4, IN_Q);
  const tilt  = E(f, TILT, TILT + 12, 0, 5.5, OUT) + E(f, SLIDE, SLIDE + 10, 0, 4, OUT)
              + (blown ? E(f, B.PAY, 90, 0, 22, IN_Q) : 0);
  const slide = E(f, SLIDE, B.PAY + 4, 0, 96, IN_Q);
  const sink  = grip * 10 + knees * 34 + E(f, FLOOR, FLOOR + 10, 0, 22, OUT)
              + E(f, TILT, TILT + 10, 0, 20, OUT) + E(f, SLIDE, SLIDE + 10, 0, 26, OUT);
  const strain = 0.30 + grip * 0.16 + knees * 0.22 + E(f, FLOOR, FLOOR + 8, 0, 0.14, OUT)
               + E(f, TILT, TILT + 8, 0, 0.12, OUT) + E(f, SLIDE, SLIDE + 8, 0, 0.10, OUT);

  const HX = 540, HFEET = 748, SIZE = 392;
  const STACK_Y = HFEET - SIZE * 0.94 + sink;
  const KINDS = [3, 0, 2, 1, 4];
  const LAND = [-6, GRIP, KNEES, FLOOR, TILT];

  return (
    <Scene p={asPlace("box")} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <HookRoom v={v} f={f} shaft={640} />
      <BlockLine f={f} y={190} z={30} rate={RK[v].rate * 1.5} n={6} s={1.35} back={0.68} />

      {/* ⭐ THE CRACK — the countdown, under his feet, growing on every link */}
      {crack > 0.02 && (<>
        <div style={{ position: "absolute", left: HX - 30, top: HFEET - 12,
          width: 6 + crack * 300, height: 13, zIndex: 42, borderRadius: 3,
          transform: "rotate(-3deg)", background: `linear-gradient(90deg, ${hexa("#0B0F12", 0.9)} 0%, ${hexa("#0B0F12", 0.35)} 100%)` }} />
        <div style={{ position: "absolute", left: HX - 20 - crack * 190, top: HFEET - 6,
          width: 6 + crack * 190, height: 10, zIndex: 42, borderRadius: 3,
          transform: "rotate(4deg)", background: `linear-gradient(270deg, ${hexa("#0B0F12", 0.85)} 0%, ${hexa("#0B0F12", 0.3)} 100%)` }} />
        {crack > 0.5 && <Puff x={HX + 70} y={HFEET} f={f} at={FLOOR} n={6} s={1.0} c="#CFC4AE" z={44} />}
      </>)}

      {/* ⭐ THE STACK — five NAMEABLE devices, each still showing the all-clear he
          gave it, and the whole stack tilts as the floor goes under one side */}
      <div style={{ position: "absolute", inset: 0, zIndex: 66,
        transformOrigin: `${HX}px ${STACK_Y}px`, transform: `rotate(${tilt}deg)` }}>
        {KINDS.map((kind, i) => {
          if (f < LAND[i] - 12) return null;
          const dz = E(f, LAND[i] - 12, LAND[i], -440, 0, IN_Q);
          const set = f >= LAND[i] ? settle(f - LAND[i], 0, 8, 11, 2.3) : 0;
          const top = i === KINDS.length - 1;
          const fk = blown ? Math.min(1, (f - B.PAY) / 44) : 0;
          const sx = blown ? fk * fk * (i % 2 ? 520 : -520) : (top ? slide : 0);
          const sy = blown ? fk * fk * 660 : 0;
          const rr = blown ? fk * (i % 2 ? 88 : -88) : (top ? slide * 0.16 : 0);
          if (sy > 700) return null;
          return (
            <div key={"u" + i} style={{ position: "absolute", inset: 0,
              transform: `translate(${sx}px, ${sy}px) rotate(${rr}deg)`,
              transformOrigin: `${HX}px ${STACK_Y - i * 64}px`,
              opacity: blown ? Math.max(0, 1 - fk * 0.75) : 1 }}>
              <Unit kind={kind} x={HX} y={STACK_Y - i * 64 + dz + set} w={392 - i * 22}
                z={66 + i} lamp={blown ? 0 : (strain > 0.62 ? 0.5 : 1)} f={f} />
            </div>
          );
        })}
      </div>

      {[GRIP, KNEES, FLOOR, TILT, SLIDE].map((at, i) => (
        f >= at && f < at + 12
          ? <Puff key={"c" + i} x={HX} y={STACK_Y - i * 50} f={f} at={at} n={7} s={1.0}
              c="#CFC4AE" z={72} />
          : null
      ))}
      {blown && <Ring x={HX} y={HFEET - 220} f={f} at={B.PAY} c={BRSL} z={76} s={1.9} dur={30} />}
      {blown && <Puff x={HX} y={HFEET - 40} f={f} at={B.PAY} n={16} s={1.9} c="#CFC4AE" z={72} />}

      {/* the two arms taking it, bending as he goes down */}
      {!blown && [-1, 1].map(sd => (
        <div key={"arm" + sd} style={{ position: "absolute",
          left: HX + sd * SIZE * 0.34 - 19, top: HFEET - SIZE * 0.88 + sink,
          width: 38, height: SIZE * 0.32 - sink * 0.34, zIndex: 68, borderRadius: 6,
          background: `linear-gradient(96deg, ${mxh(CLAY, 0.16)} 0%, ${dkh(CLAY, 0.14)} 100%)`,
          transform: `rotate(${sd * (9 + sink * 0.14)}deg)`, transformOrigin: "50% 100%" }} />
      ))}
      <Contact x={HX - 124} y={HFEET - 8} w={248} z={46} o={0.46} />
      <Hero f={f} x={HX} y={HFEET} size={SIZE} z={62} costume={{}} tint={CLAY}
        strain={blown ? 0.15 : Math.min(0.96, strain)} lift={-sink * 0.42}
        shock={blown ? E(f, B.PAY, B.PAY + 6, 0, 0.85, OUT) : 0}
        gaze={0.3} act={1} ph={0.2} />
      {/* ⛔ THE SWEAT IS ON THE STILLEST PART OF HIM — §11: effort wants a
          secondary emitter where the body is NOT moving, or it reads as noise. */}
      {!blown && strain > 0.55 &&
        <Sweat x={HX + 74} y={HFEET - SIZE * 0.66 + sink} f={f} at={FLOOR} n={3} z={70} />}
      <ThumbUp x={HX} y={HFEET} size={SIZE} z={70} />
      <Gallery f={f} pay={B.PAY} e2={B.E2} />
      {/* ⭐ THE CROWD IS CLAUDES, AND THEY ARE IN THE FIRST SECOND — characters
          stop scrolls, and these are the audience filter as much as the mark is */}
      {[128, 862, 962].map((gx, i) => (
        <Crew key={"fg" + i} f={f} x={gx} y={772} i={i + 7} size={226} z={54} at={-12}
          loop={[3, 1, 0][i]} cheer={f >= B.PAY ? 0.5 : 0} />
      ))}
      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={40} y={214} s={118} z={92} />
      <Mark x={886} y={214} s={92} z={92} />
    </Scene>
  );
};

/* =========================================================================
   C · PLUGGING THE LEAKS — every split he jams shut opens two more, and you can
   count the limbs he has left.
   ========================================================================= */
export const HookSeal: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const SPL: Array<[number, number, number]> = [
    [150, 90, B.TRIG], [162, 210, B.E1], [140, 320, B.E2], [166, 150, B.E3], [148, 262, B.AFT],
  ];
  const open = SPL.filter(([, , at]) => f >= at);
  const strain = 0.3 + open.length * 0.13 + SPL.reduce((a, [, , at]) => a + load(f, at - 7, at) * 0.3, 0);
  const TX = 660, TY = 738, SX = 306, SFEET = 736, SIZE = 386;
  const blown = f >= B.PAY;
  return (
    <Scene p={asPlace("box")} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <HookRoom v={v} f={f} shaft={430} />
      <BlockLine f={f} y={196} z={30} rate={RK[v].rate * 1.5} n={6} s={1.35} back={0.68} />
      <Tank x={TX} y={TY} f={f} w={368} h={430} z={56} splits={SPL} blow={blown ? B.PAY : -1} />
      {/* ⭐ THE LIMBS HE HAS LEFT — each new split takes one, and the last beat
          leaves him with none, which is the countdown made countable. */}
      {open.slice(0, 4).map(([sx, sy], i) => (
        <div key={"limb" + i} style={{ position: "absolute", left: TX + sx - 66,
          top: TY - 430 + sy - 16, width: 74, height: 34, zIndex: 70, borderRadius: 6,
          background: dkh(CLAY, 0.04), transform: `rotate(${-8 + i * 5}deg)` }} />
      ))}
      {SPL.map(([, , at], i) => (
        f >= at && f < at + 12
          ? <Puff key={"s" + i} x={TX + 120} y={TY - 300 + i * 50} f={f} at={at} n={7} s={1.0}
              c="#DFF6FF" z={70} />
          : null
      ))}
      {blown && <Ring x={TX} y={TY - 240} f={f} at={B.PAY} c="#DFF6FF" z={74} s={1.9} dur={30} />}
      <Contact x={SX - 122} y={SFEET - 8} w={244} z={46} o={0.46} />
      <Hero f={f} x={SX} y={SFEET} size={SIZE} z={62} costume={{}} tint={CLAY}
        strain={blown ? 0.2 : Math.min(0.95, strain)}
        shock={blown ? E(f, B.PAY, B.PAY + 6, 0, 0.9, OUT) : 0}
        gaze={0.35} act={1} ph={0.5}
        drive={0.24 * Math.sin(f / 6)} reach={40} />
      <ThumbUp x={SX} y={SFEET} size={SIZE} z={68} />
      <Gallery f={f} pay={B.PAY} e2={B.E2} />
      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<{ v: Variant; dur: number }>> = {
  oath: HookOath, stack: HookStack, seal: HookSeal,
};

/** ⛔ SET BY `tools/hook_score.py`, NOT BY TASTE. The four numbers that decided
    it are recorded in the factory log. */
export const PICKED: HookId = "stack";
