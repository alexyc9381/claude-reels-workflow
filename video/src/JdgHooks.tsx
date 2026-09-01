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
import { Exhibit, EaselOnly, Plinth, Nameplate } from "./JdgProps";

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
   A · THE OATH — a Claude swears his work is finished while the work comes
   apart on its easel beside him, and he does not look at it until the last beat.

   ⛔⛔ THE WITNESS BOX CAME OUT OF THIS SHOT AND THAT WAS TWO FIXES AT ONCE.
   It was a 452x250 slab of dark oak across the bottom third: it cropped the hero
   to a shapeless mass (he read as a salmon blob, not a character) AND it was
   most of the luma deficit the band scan kept flagging in bands 8-11, because
   the thing sitting on the lit stone floor was a near-black rectangle.
   ⭐ Standing him on the floor in full body fixed the silhouette and the gate
   together — which is THE-OPEN's *"a gate carried by the wrong object deforms
   that object"* read from the other end.

   ⭐ ANTICIPATION TO THE DEFINITION IN [[feedback_a_wobble_is_not_a_clock]]:
   a PREDICTABLE THREAT (the face is coming off), a VISIBLE COUNTDOWN (leaf 1,
   then leaf 2, then the rest) and a DENIED PAYOFF until the word "lying".
   ========================================================================= */
export const HookOath: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");

  /* ⭐ ONE CAUSE: the oath. Everything below is a function of it. */
  const RAISE = 2;                                   /* "new"      onset 0.20s - 4f */
  const approach = E(f, 0, 9, -84, 0, IN_Q);         /* he walks the last step in */
  const armDown = 1 - E(f, RAISE, RAISE + 5, 0, 1, BACK)      /* it SLAMS up */
                + stroke(f, B.TRIG, 1, 4) - stroke(f, B.TRIG + 9, 1, 10);
  /* he plants himself as the hand goes up — a 416px body moving is worth far
     more repaint than a 54px hand, and it is the same intention */
  const plant = E(f, RAISE, RAISE + 6, 0, 1, BACK) - E(f, B.TRIG, B.TRIG + 5, 0, 1, OUT);
  const jolt = f >= B.TRIG ? settle(f, B.TRIG, 1, 15, 2.4) : 0;

  const HX = 690, HY = 588;            /* the board, on its easel */
  const SX = 218, SFEET = 670;         /* the hero, feet inside the 672 band */
  const SIZE = 416;

  /* ⭐ THE LAST BEAT IS A TOPPLE, AND IT IS STILL ACCELERATING AT f76.
     PRE-CUT measured 0.49 against a 0.70 "dies" line for three builds running,
     because the chain finished at f66 and the frame then held. §23: an OUT/IO
     ease decelerates into its end whether or not that end is on screen, so
     extending one past the cut fixes nothing — the motion has to still be
     accelerating when the cut lands. `IN_Q` over a window that ENDS at f104,
     sampled at f76, is barely a third of the way in and gaining.
     ⭐ It also gives the shot a better last image than "he holds still": he is
     still swearing while the whole thing goes over. */
  const tip = E(f, B.E3, B.E3 + 16, 0, -2.6, OUT)
            + E(f, B.PAY, B.PAY + 18, 0, -5.0, IN_Q)
            + E(f, B.AFT + 2, 88, 0, -84, IN_Q);
  const slide = E(f, B.AFT + 2, 88, 0, 330, IN_Q);
  const gaze = E(f, B.LAST, B.LAST + 7, 0, -1, OUT);
  const shock = E(f, B.E2, B.E2 + 6, 0, 0.35, OUT) + E(f, B.PAY, B.PAY + 5, 0, 0.55, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.20)}>
      <Chamber p={p} f={f} lit={1} occ="l" bays={4} shaft={300} shaftO={0.36} rakeRate={RK[v].rate} rakeN={RK[v].n}
        panelN={8} rail horizonDy={-16} />
      <ShaftDust f={f} x={330} w={520} z={22} />
      <Pool x={330} y={556} w={980} c="#FFF9EC" o={0.60} z={12} />
      <Pool x={720} y={700} w={880} c="#FFF9EC" o={0.42} z={12} />
      <Pool x={506} y={430} w={1000} c="#FFF3D6" o={0.20} z={11} />

      {/* ── THE BOARD. 500px = 49% of the panel, air on both sides, well under
             THE-OPEN's 85% line, and it is the LIGHT side of the contrast. ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translate(${jolt * 5.5}px, ${slide + jolt * 9}px) rotate(${jolt * 1.4}deg)`,
        transformOrigin: "66% 100%" }}>
        <Exhibit x={HX} y={HY} f={f} w={500} z={60}
          leaves={[0, 1, 2]}
          out={{ 1: B.E1, 0: B.E2 }}
          lamp={f < B.E2 ? (f >= B.TRIG && f < B.TRIG + 3 ? 0 : 1) : 0} tip={tip} fall={B.PAY} easel={false} />
      </div>
      {/* the easel is left STANDING and EMPTY when the board goes off it —
          the shot's last image, and the reel's thesis in one prop */}
      <EaselOnly x={HX} y={HY} w={500} z={44} />

      {/* the board's pinned notes, shaken off by the same jolt and STILL FALLING
          at the cut — one of the two things that fixes the PRE-CUT ratio */}
      {[0, 1, 2, 3, 4].map(i => {
        const go = B.E2 + i * 6;
        const lf = f - go;
        if (lf < 0) return null;
        const dy = lf * lf * 0.62, dx = (rnd(i, 12) - 0.5) * lf * 5;
        if (dy > 520) return null;
        return (
          <div key={"tg" + i} style={{ position: "absolute", left: HX - 200 + i * 92 + dx,
            top: HY - 300 + dy, width: 66, height: 44, zIndex: 63, borderRadius: 2,
            opacity: Math.max(0, 1 - dy / 470), transform: `rotate(${lf * 6}deg)`,
            background: FACE, border: `2px solid ${dkh(FACED, 0.3)}` }} />
        );
      })}
      {f >= B.PAY && <Puff x={HX} y={HY - 20} f={f} at={B.PAY} n={14} s={1.8} c="#CFC4AE" z={66} />}
      {f >= B.PAY && <Ring x={HX} y={HY - 180} f={f} at={B.PAY} c={FACE} z={67} s={1.6} dur={26} />}
      {f >= B.E2 && <Puff x={HX} y={HY - 200} f={f} at={B.E2} n={9} s={1.2} c="#CFC4AE" z={66} />}

      {/* ── THE HERO, FULL BODY ON THE FLOOR. ── */}
      <Contact x={SX - 122 + approach} y={SFEET - 8} w={244} z={46} o={0.42} />
      <Hero f={f} x={SX + approach} y={SFEET} size={SIZE} z={48} costume={{}} tint={CLAY}
        gaze={gaze} shock={Math.min(1, shock)} strain={plant * 0.34}
        lift={plant * 16} act={3} ph={0.6} />
      <OathHand x={SX + approach} y={SFEET} size={SIZE} down={armDown} z={64} />
      {/* the swearing hand, resting ON the work */}
      <div style={{ position: "absolute", zIndex: 64,
        left: HX - 262, top: 496 + jolt * 9 + slide,
        width: SIZE * 0.21, height: SIZE * 0.155, borderRadius: 5,
        background: dkh(CLAY, 0.06),
        transform: `rotate(${-7 + jolt * 5}deg)` }} />
      {f >= B.TRIG && f < B.TRIG + 18 &&
        <Ring x={SX + approach + SIZE * 0.40} y={SFEET - SIZE * 0.52} f={f} at={B.TRIG} c={BRSL} z={70}
          s={0.7} dur={17} />}

      {/* ⭐ THE GALLERY — three bodies behind the rail, each on its own action
          loop and its own phase, so the top of the frame is never still. They
          are 150px against a 416px hero and sit in shadow, so they read as the
          room rather than competing with the subject
          ([[feedback_a_dense_room_is_not_a_system]] — count the things
          mistakable for the subject, and keep that count at one). */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 452,
        overflow: "hidden", zIndex: 26 }}>
        {[336, 566, 828].map((gx, i) => (
          <Crew key={"gl" + i} f={f} x={gx} y={556} i={i + 3} size={150} z={26}
            at={-14} loop={[3, 0, 3][i]} tint={dkh(CLAY, 0.34)}
            cheer={f >= B.PAY ? 0.6 : f >= B.E2 ? 0.25 : 0} />
        ))}
      </div>

      {/* ⛔ THE ROOM JOLT USED TO LIVE ON AN EMPTY <div> HERE AND MOVED NOTHING.
          The strike's visible consequences are now: the board lurches on its
          easel, the pinned notes shake loose, dust comes off the crossbar and
          the seal flickers — one cause, four effects (§31.3). */}
      {f >= B.TRIG && f < B.TRIG + 20 &&
        <Puff x={HX} y={HY + 10} f={f} at={B.TRIG} n={7} s={1.0} c="#CFC4AE" z={58} />}

      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   B · THE STACK — he keeps stacking claim-plates on the rail in front of him and
   the rail BOWS further with every one. On "lying" it snaps and the stack goes
   through it.

   ⭐ THE PUREST ANTICIPATION SHAPE OF THE THREE, and the reason is
   [[feedback_anticipation_is_a_changing_state]]: a load past its angle HELD
   STILL opened dead at 3.23. Here the load keeps ARRIVING, and the next plate is
   already in the air before the last one lands — a second thing travelling
   toward the moment is what makes a shot anticipatory rather than merely tense.
   ========================================================================= */
export const HookStack: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");
  const LAND = [-8, B.TRIG, B.E1, B.E2, B.E3];   /* plate 0 is already down at f0 */
  const RX = 548, RY = 468;

  const down = LAND.filter(a => f >= a).length;
  const bowT = LAND.reduce((s, a, i) => s + (f >= a ? 1 : 0) * (5 + i * 3.4), 0);
  const snapped = f >= B.PAY;
  const bow = snapped ? 0 : bowT + (f >= LAND[down - 1] ? settle(f, LAND[down - 1], 5, 10, 2.2) : 0);
  const creak = !snapped && down >= 3 ? Math.sin(f * 0.9) * (down - 2) * 0.9 : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.20)}>
      <Chamber p={p} f={f} lit={1} occ="r" bays={4} shaft={640} shaftO={0.36} rakeRate={RK[v].rate} rakeN={RK[v].n}
        panelN={7} rail horizonDy={-16} />
      <ShaftDust f={f} x={680} w={520} z={22} />
      <Pool x={660} y={556} w={900} c="#FFF6E2" o={0.46} z={12} />
      <Pool x={300} y={706} w={760} c="#FFF6E2" o={0.28} z={12} />

      {/* the stand the plates are piling onto — a lectern top, not a whole box,
          so it does not eat the lit floor the way the witness box did */}
      <div style={{ position: "absolute", left: RX - 190, top: RY + 8, width: 380, height: 250,
        zIndex: 46, background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.4)} 100%)`,
        boxShadow: SH_D }} />
      <Contact x={RX - 210} y={RY + 250} w={420} z={45} o={0.44} />

      {/* THE RAIL — it BOWS. ⭐ WEIGHT IS COMMUNICATED BY DEFORMATION, not by
          size or colour: the rail is the only thing here that reports the load,
          and it reports it by bending. */}
      {!snapped && (
        <div style={{ position: "absolute", left: RX - 320, top: RY - 20, width: 640, height: 30,
          zIndex: 64, transform: `translateY(${bow * 0.9 + creak}px)`,
          clipPath: `path("M0,14 Q320,${14 + bow * 2.0} 640,14 L640,30 Q320,${30 + bow * 2.0} 0,30 Z")`,
          background: `linear-gradient(180deg, ${BRSL} 0%, ${BRS} 42%, ${BRSD} 100%)` }} />
      )}
      {snapped && [-1, 1].map(sd => {
        const lf = f - B.PAY;
        return (
          <div key={"rh" + sd} style={{ position: "absolute",
            left: RX + sd * (320 + lf * 10) - (sd < 0 ? 0 : 320), top: RY - 20 + lf * lf * 1.0,
            width: 320, height: 30, zIndex: 64,
            transform: `rotate(${sd * lf * 3.2}deg)`,
            background: `linear-gradient(180deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
        );
      })}

      {/* THE PLATES — each is a CLAIM Claude is making about the work. */}
      {LAND.map((at, i) => {
        if (f < at - 12) return null;
        const lf = f - at;
        const drop = E(lf, -12, 0, -460, 0, IN_Q);
        const set = lf >= 0 ? settle(lf, 0, 6, 11, 2.3) : 0;
        const fall = snapped ? (f - B.PAY) : 0;
        const fy = snapped ? fall * fall * 1.15 : 0;
        const fx = snapped ? (rnd(i, 21) - 0.5) * fall * 8 : 0;
        if (fy > 560) return null;
        return (
          <div key={"pl" + i} style={{ position: "absolute",
            left: RX - 168 + fx + (rnd(i, 22) - 0.5) * 24,
            top: RY - 44 - i * 38 + drop + set + bow * 0.9 + fy,
            width: 336, height: 38, zIndex: 66 + i, borderRadius: 3,
            transform: `rotate(${snapped ? fall * (i % 2 ? 5 : -4) : (rnd(i, 23) - 0.5) * 2.2}deg)`,
            opacity: snapped ? Math.max(0, 1 - fy / 500) : 1,
            background: `linear-gradient(178deg, ${BRSL} 0%, ${BRS} 44%, ${BRSD} 100%)`,
            border: `3px solid ${dkh(BRSD, 0.42)}`, boxShadow: SH,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(17, 900), color: "#2A2116", letterSpacing: 3 }}>
              {["ALL TESTS PASS", "NO ERRORS", "FULLY WIRED", "SHIP READY", "DONE"][i]}
            </span>
          </div>
        );
      })}

      {/* the NEXT plate, already in the air — `LIN`, so it is still moving when
          the rail goes */}
      {!snapped && f >= B.E3 - 12 && (
        <div style={{ position: "absolute", left: RX - 168,
          top: RY - 44 - 5 * 38 + E(f, B.E3 - 12, B.PAY, -340, -40, LIN),
          width: 336, height: 38, zIndex: 72, borderRadius: 3, opacity: 0.95,
          background: `linear-gradient(178deg, ${BRSL} 0%, ${BRSD} 100%)`,
          border: `3px solid ${dkh(BRSD, 0.42)}` }} />
      )}

      {snapped && <Puff x={RX} y={RY + 110} f={f} at={B.PAY} n={15} s={1.8} c="#CFC4AE" z={74} />}
      {snapped && <Ring x={RX} y={RY} f={f} at={B.PAY} c={BRSL} z={75} s={1.6} dur={26} />}

      <Contact x={RX - 110} y={664} w={220} z={44} o={0.42} />
      <Hero f={f} x={RX} y={672} size={372} z={48} costume={{}} tint={CLAY}
        strain={snapped ? 0 : Math.min(0.8, down * 0.15)}
        shock={E(f, B.PAY, B.PAY + 6, 0, 0.85, OUT)}
        gaze={E(f, B.AFT, B.AFT + 8, 0, 0.7, OUT)} act={1} ph={0.4} />

      <Motes x={506} y={330} w={880} h={420} n={14} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Mark x={58} y={152} s={84} z={92} />
    </Scene>
  );
};

/* =========================================================================
   C · THE SEAL — he drives a brass certification seal down onto the board to
   mark it finished, and it punches straight THROUGH, because there is nothing
   behind the face. The certification is what breaks it.

   ⭐ AN ACTION IS A DISTANCE, NOT A STATE CHANGE ([[ANIMATION-QUALITY §11]]):
   the seal travels ~310px with a real coil, and the arrival COSTS something.
   ========================================================================= */
export const HookSeal: React.FC<{ v: Variant; dur: number }> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("box");
  const HX = 632, HY = 566;

  /* ⭐ `antic` is the whole shape: COIL back and HOLD (the beat a viewer reads as
     "he is about to"), DRIVE through IN_Q, and never simply stop. */
  const swing = antic(f, B.TRIG, B.E2, 0.34);
  const through = E(f, B.E3, B.PAY, 0, 1, IN_Q);
  const sealY = swing * 300 + through * 230;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.34} glow={hexa(BRS, 0.20)}>
      <Chamber p={p} f={f} lit={1} occ="both" bays={4} shaft={430} shaftO={0.38} rakeRate={RK[v].rate} rakeN={RK[v].n}
        panelN={9} rail horizonDy={-16} />
      <ShaftDust f={f} x={470} w={560} z={22} />
      <Pool x={470} y={560} w={940} c="#FFF6E2" o={0.46} z={12} />
      <Pool x={700} y={710} w={780} c="#FFF6E2" o={0.28} z={12} />

      <Exhibit x={HX} y={HY} f={f} w={504} z={60}
        leaves={[0, 1, 2]} out={{ 1: B.E3 }}
        lamp={f < B.E3 ? 1 : 0} fall={B.PAY} />

      {/* THE SEAL — a brass disc on a handle. ⛔ 176px is ~35% of the board's
          width: a hand prop over ~40% of what it acts on stops reading as itself. */}
      {f < B.PAY + 8 && (
        <div style={{ position: "absolute", left: HX - 88, top: HY - 470 + sealY,
          width: 176, height: 176, zIndex: through > 0.3 ? 55 : 76,
          opacity: through > 0.82 ? Math.max(0, 1 - (through - 0.82) * 5.5) : 1 }}>
          <div style={{ position: "absolute", left: 66, top: -100, width: 46, height: 114,
            borderRadius: 8, background: `linear-gradient(96deg, ${OAKL} 0%, ${dkh(OAK, 0.34)} 100%)` }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
            background: `radial-gradient(50% 50% at 40% 32%, ${BRSL} 0%, ${BRS} 54%, ${BRSD} 100%)`,
            border: `7px solid ${dkh(BRSD, 0.44)}`, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <span style={{ ...mono(30, 900), color: "#2A2116", letterSpacing: 2 }}>OK</span>
          </div>
        </div>
      )}

      {/* the HOLE the seal made — a real void with a torn lip */}
      {f >= B.PAY && (
        <div style={{ position: "absolute", left: HX - 100, top: HY - 300, width: 200, height: 168,
          zIndex: 62, background: VOID, borderRadius: 6,
          border: `4px solid ${dkh(FACED, 0.5)}`,
          transform: `scale(${E(f, B.PAY, B.PAY + 6, 0.2, 1, BACK)})` }} />
      )}

      {f >= B.E3 && <Puff x={HX} y={HY - 250} f={f} at={B.E3} n={13} s={1.5} c="#CFC4AE" z={70} />}
      {f >= B.PAY && <Ring x={HX} y={HY - 230} f={f} at={B.PAY} c={FACE} z={71} s={1.6} dur={26} />}
      {f >= B.PAY && <Puff x={HX} y={HY - 30} f={f} at={B.PAY} n={15} s={1.8} c="#CFC4AE" z={70} />}

      <Contact x={248 - 108} y={664} w={216} z={44} o={0.42} />
      <Hero f={f} x={248} y={672} size={372} z={48} costume={{}} tint={CLAY}
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
