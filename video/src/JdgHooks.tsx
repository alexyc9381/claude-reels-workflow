import React from "react";
import { useCurrentFrame } from "remotion";
import { HookHeader } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh,
  Scene, Cam, Contact, Pool, Ring, Puff, Motes, Beam, Mark, Hero, Crew, Forearm,
  mono, ui, CLAY, INK, GREEN, RED, GOLD,
  Chamber, asPlace, PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL,
  FACE, FACED, VOID, C_JUDGE, C_PROS, C_DEF, R,
  settle, antic, load, stroke, STEP,
} from "./JdgWorld";
import { Tower, BlockLine, Plinth, Nameplate } from "./JdgProps";

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
export const HookChrome: React.FC<{ f: number }> = ({ f }) => (<>
  <HookHeader big={HDR_BIG} hot={HDR_HOT} f={f} at0 />
  <div style={{ position: "absolute", left: 0, right: 0, top: 516, textAlign: "center",
    zIndex: 199, opacity: E(f, 3, 11, 0, 1, OUT) }}>
    <span style={{ ...mono(25, 900), letterSpacing: 4, color: "#2A2116",
      background: `linear-gradient(180deg,${BRSL},${BRS})`, padding: "10px 24px",
      borderRadius: 9, border: `3px solid ${dkh(BRSD, 0.3)}` }}>
      {R.loopName} · {R.setup} SETUP
    </span>
  </div>
</>);

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

/* =========================================================================
   A · THE OATH — a Claude swears the thing he built is finished, and it comes
   down beside him while he does. He never looks at it.

   ⛔⛔⛔ REBUILT AFTER REJECTION ON THE CONCEPT. v1 was a paper exhibit board on
   an easel shedding paper leaves, and Alex: *"the animation concept is wayyy too
   boring, like it's literally just the papers concept."* Every gate was green —
   motion 10.66 median, HOLD 8%, PRE-CUT 1.30, LUMA 147.9. The gates cannot see
   that a reel is made of stationery. [[feedback_the_metric_makes_paper]]
   ⭐ THE RE-MAP: nobody's work is a DOCUMENT. It is a THING THEY BUILT. So the
   hook is a Claude and a TOWER he stacked, in six saturated colours, and the
   beats stop being pages coming loose and start being COURSES KNOCKED OUT of a
   structure that then can't hold itself up.

   Same clock — every beat is a word at `onset − 4`:
     f0  (settled)   he stands beside his tower, all six courses LIT
     f2  "new"       his hand SLAMS UP for the oath
     f7  "prompting" he KNOCKS the stack to show it is solid   <- the trigger
     f15 "technique" a course drops OUT of the middle; the stack sags
     f26 "stops"     two more go, and the lights start dying
     f32 "Claude"    it leans hard, still standing on nothing
     f44 "lying"     ⭐ the whole top half comes down
     f66 "face"      he is still swearing, to a stump
   ========================================================================= */
export const HookOath: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");

  const armDown = 1 - E(f, 2, 7, 0, 1, BACK)
                + stroke(f, B.TRIG, 1, 4) - stroke(f, B.TRIG + 9, 1, 10);
  const approach = E(f, 0, 9, -84, 0, IN_Q);
  const plant = E(f, 2, 8, 0, 1, BACK) - E(f, B.TRIG, B.TRIG + 5, 0, 1, OUT);
  const jolt = f >= B.TRIG ? settle(f, B.TRIG, 1, 15, 2.4) : 0;

  const HX = 720, HY = 760;            /* the tower, standing on the floor */
  const SX = 196, SFEET = 678, SIZE = 384;

  /* it LEANS as it loses courses, and the lean is still opening at f76 (§23) */
  const lean = E(f, B.E1, B.E1 + 14, 0, 2.6, OUT)
             + E(f, B.E2, B.E2 + 14, 0, 5.0, OUT)
             + E(f, B.PAY, 88, 0, 84, IN_Q);
  const slide = E(f, B.PAY + 4, 92, 0, 300, IN_Q);
  const gaze = E(f, B.LAST, B.LAST + 7, 0, -1, OUT);
  const shock = E(f, B.E2, B.E2 + 6, 0, 0.35, OUT) + E(f, B.PAY, B.PAY + 5, 0, 0.55, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="l" bays={4} shaft={300} shaftO={0.34}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={8} rail horizonDy={-16} occW={112} />
      {/* ⭐ THE BAND IS THE MATERIAL THE REEL IS ABOUT. Removing the paper removed
          the reel's only full-width travelling element; a conveyor of the same
          blocks the tower is built from puts it back in the right substance. */}
      <BlockLine f={f} y={286} z={30} rate={RK[v].rate * 1.5} n={6} s={1.55} />
      <ShaftDust f={f} x={330} w={520} z={22} />
      <Pool x={330} y={548} w={1010} c="#FFFCF2" o={0.72} z={12} />
      <Pool x={700} y={702} w={1010} c="#FFFCF2" o={0.68} z={12} />
      <Pool x={506} y={382} w={1010} c="#EAF6FA" o={0.20} z={11} />

      {/* ── THE TOWER. 300px wide against a 1012px panel, air on both sides, and
             it is the saturated side of the contrast on a deep teal chamber. ── */}
      <Contact x={HX - 176} y={HY - 10} w={352} z={44} o={0.48} />
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translateX(${slide}px)` }}>
      <Tower x={HX} y={HY} f={f} w={330} z={60}
        blocks={[0, 1, 2, 3, 4, 5]}
        out={{ 3: B.E1, 1: B.E2 }}
        lit={f < B.E2 ? 1 : 0} lean={lean} fall={B.PAY} />
      </div>

      {f >= B.E1 && <Puff x={HX} y={HY - 210} f={f} at={B.E1} n={9} s={1.2} c="#CFC4AE" z={66} />}
      {f >= B.E2 && <Puff x={HX} y={HY - 260} f={f} at={B.E2} n={11} s={1.4} c="#CFC4AE" z={66} />}
      {f >= B.PAY && <Puff x={HX} y={HY - 40} f={f} at={B.PAY} n={16} s={1.9} c="#CFC4AE" z={66} />}
      {f >= B.PAY && <Ring x={HX} y={HY - 120} f={f} at={B.PAY} c={BRSL} z={67} s={1.7} dur={28} />}

      {/* ── THE HERO, FULL BODY ON THE FLOOR ── */}
      <Contact x={SX - 122 + approach} y={SFEET - 8} w={244} z={46} o={0.44} />
      <Hero f={f} x={SX + approach} y={SFEET} size={SIZE} z={48} costume={{}} tint={CLAY}
        gaze={gaze} shock={Math.min(1, shock)} strain={plant * 0.34}
        lift={plant * 16} act={3} ph={0.6} />
      <OathHand x={SX + approach} y={SFEET} size={SIZE} down={armDown} z={64} />
      {/* the other hand rests ON the thing he is swearing about — and it is still
          there, on nothing, once the stack has gone */}
      <div style={{ position: "absolute", zIndex: 64,
        left: HX - 236, top: 486 + jolt * 9,
        width: SIZE * 0.21, height: SIZE * 0.155, borderRadius: 5,
        background: dkh(CLAY, 0.06),
        transform: `rotate(${-7 + jolt * 5}deg)` }} />
      {f >= B.TRIG && f < B.TRIG + 18 &&
        <Ring x={HX - 172} y={508} f={f} at={B.TRIG} c={BRSL} z={70} s={0.7} dur={17} />}

      {/* the gallery, behind the rail, on their own loops */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 452,
        overflow: "hidden", zIndex: 26 }}>
        {[336, 566, 828].map((gx, i) => (
          <Crew key={"gl" + i} f={f} x={gx} y={556} i={i + 3} size={206} z={26}
            at={-14} loop={[3, 0, 3][i]} tint={dkh(CLAY, 0.34)}
            cheer={f >= B.PAY ? 0.6 : f >= B.E2 ? 0.25 : 0} />
        ))}
      </div>

      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   B · THE STACK — he keeps ADDING courses and claiming each one, and the stack
   goes past the angle it can hold. The load keeps ARRIVING, which is what makes
   a shot anticipatory rather than merely precarious
   ([[feedback_anticipation_is_a_changing_state]]).
   ========================================================================= */
export const HookStack: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");
  const LAND = [-8, B.TRIG, B.E1, B.E2, B.E3];
  const RX = 560, RY = 700;
  const down = LAND.filter(a => f >= a).length;
  const snapped = f >= B.PAY;
  const lean = LAND.reduce((a, at, i) => a + (f >= at ? E(f, at, at + 10, 0, 1.5 + i * 0.7, OUT) : 0), 0)
             + (snapped ? E(f, B.PAY, 96, 0, 26, IN_Q) : 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="r" bays={4} shaft={640} shaftO={0.34}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={7} rail horizonDy={-16} />
      <BlockLine f={f} y={286} z={30} rate={RK[v].rate * 1.5} n={6} s={1.55} />
      <ShaftDust f={f} x={680} w={520} z={22} />
      <Pool x={660} y={556} w={900} c="#FFF9EC" o={0.50} z={12} />
      <Contact x={RX - 180} y={RY - 10} w={360} z={44} o={0.46} />
      <Tower x={RX} y={RY} f={f} w={318} z={60}
        blocks={[0, 1]} seat={{ 2: LAND[1], 3: LAND[2], 4: LAND[3], 5: LAND[4] }}
        lit={snapped ? 0 : 1} lean={lean} fall={snapped ? B.PAY : -1} />
      {LAND.slice(1).map((at, i) => (
        f >= at ? <Puff key={"p" + i} x={RX} y={RY - 150 - i * 60} f={f} at={at} n={8} s={1.1}
          c="#CFC4AE" z={66} /> : null
      ))}
      {snapped && <Ring x={RX} y={RY - 120} f={f} at={B.PAY} c={BRSL} z={70} s={1.7} dur={28} />}
      <Contact x={216} y={664} w={220} z={44} o={0.44} />
      <Hero f={f} x={310} y={672} size={392} z={48} costume={{}} tint={CLAY}
        strain={snapped ? 0 : Math.min(0.8, down * 0.15)}
        shock={E(f, B.PAY, B.PAY + 6, 0, 0.85, OUT)}
        gaze={E(f, B.AFT, B.AFT + 8, 0, 0.7, OUT)} act={1} ph={0.4} />
      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   C · THE PRESS — he drives a certification press down onto the stack to mark it
   finished, and it goes straight THROUGH, because the middle courses are hollow.
   ========================================================================= */
export const HookSeal: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");
  const HX = 620, HY = 706;
  const swing = antic(f, B.TRIG, B.E2, 0.34);
  const through = E(f, B.E3, B.PAY, 0, 1, IN_Q);
  const sealY = swing * 300 + through * 250;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="both" bays={4} shaft={430} shaftO={0.36}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={9} rail horizonDy={-16} />
      <BlockLine f={f} y={286} z={30} rate={RK[v].rate * 1.5} n={7} s={1.55} />
      <ShaftDust f={f} x={470} w={560} z={22} />
      <Pool x={470} y={560} w={960} c="#FFF9EC" o={0.50} z={12} />
      <Contact x={HX - 176} y={HY - 10} w={352} z={44} o={0.46} />
      <Tower x={HX} y={HY} f={f} w={312} z={60}
        blocks={[0, 1, 2, 3, 4, 5]} out={{ 3: B.E3 }}
        lit={f < B.E3 ? 1 : 0} fall={B.PAY}
        lean={E(f, B.E3, B.E3 + 12, 0, 3, OUT) + E(f, B.PAY, 96, 0, 18, IN_Q)} />
      {f < B.PAY + 8 && (
        <div style={{ position: "absolute", left: HX - 96, top: HY - 620 + sealY,
          width: 192, height: 118, zIndex: through > 0.3 ? 55 : 76, borderRadius: 8,
          opacity: through > 0.82 ? Math.max(0, 1 - (through - 0.82) * 5.5) : 1,
          background: `linear-gradient(172deg, ${BRSL} 0%, ${BRS} 46%, ${BRSD} 100%)`,
          border: `7px solid ${dkh(BRSD, 0.44)}`, display: "flex", alignItems: "center",
          justifyContent: "center", ...mono(30, 900), color: "#2A2116", letterSpacing: 2 }}>
          OK
        </div>
      )}
      {f >= B.E3 && <Puff x={HX} y={HY - 250} f={f} at={B.E3} n={13} s={1.5} c="#CFC4AE" z={70} />}
      {f >= B.PAY && <Ring x={HX} y={HY - 200} f={f} at={B.PAY} c={BRSL} z={71} s={1.7} dur={28} />}
      <Contact x={158} y={664} w={216} z={44} o={0.44} />
      <Hero f={f} x={252} y={672} size={392} z={48} costume={{}} tint={CLAY}
        strain={load(f, B.TRIG, B.E2) * 0.9 + (f >= B.E3 && f < B.PAY ? 0.4 : 0)}
        drive={swing * 0.22} reach={70}
        shock={E(f, B.PAY, B.PAY + 6, 0, 0.9, OUT)}
        gaze={E(f, B.LAST, B.LAST + 6, 0, 0.8, OUT)} act={1} ph={0.2} />
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
export const PICKED: HookId = "oath";
