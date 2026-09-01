import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Ring, Puff, Motes, Rake, Contact, Mark, MarkPlate, Chip, Plate,
  Crew, Hero, costumeFor, squash, rock, shake, asPlace, R,
  Gantry, GlassBox, Hoist, Chute, BenchBay, Hatch, Flood, RackWall, Overrun,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, JADE, IRON, GLASSW,
} from "./OvlWorld";
import { Unit, OrderWall, TokenDrum, KnifeSwitch, Slab } from "./OvlProps";
import { Room, Jamb, Overhead } from "./HwSets";
import { HookC } from "./OvlHooks";

/* ===========================================================================
   REEL 128 · "BOSS" — THE SCENES.  Board: storyboards/128-boss.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?*, never *what is around him* (§12):
     S0  watches his finished machine come apart over his head
     S1  posts one plate and steps back as a whole machine lands around him
     S2  looks UP, and keeps looking up, while six words resolve above him
     S3  is one of three who bring the hall up, bank by bank
     S4  hands a slip up a hatch four times and gets it back four times
     S5  comes up out of the floor first, and pulls the next one up after him
     S6  strikes two lines off and stops dead at the third
     S7  carries the brass plate up the bracket himself
     S8  watches his own machine cough a dud under the boss's light
     S9  catches parts off the chute and throws them back on the hoist
     S10 stands under the spout and lets the delivery land in his hands
     S11 is not here — the drum is, and it is draining
     S12 builds one small rough unit alone, with the hoist switched off
     S13 THROWS THE KNIFE SWITCH and the whole building wakes up
     S14 turns and faces out, with the thing still running behind him

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
      WHILE the scene happens. Every scene still owes its own four-part event.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). Plates
      never enter the ground line the cast stands on.
   ⛔ EVERY ONSET BELOW IS `round(word_onset*30) - 4 - L[scene]`, read out of
      `src/data/words_128boss.json`. Nothing is typed by feel.
   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN`. An `IO`/`OUT` ease decelerates
      into its end whether or not that end is on screen (§23), and six of reel
      125's thirteen scenes arrived at their cut already stopping.
   ⛔ `E` CLAMPS. Anything that should LEAVE gets its own clock and an end;
      anything that should REPEAT returns; anything that SWEEPS uses
      `0.5 - 0.5*cos(t)`, never a ramp.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/** ⛔⛔⛔ LEVEL, AND INSIDE 3% OF SCALE. `rot` is 0 in all three and stays there:
    a roll reads as a MISTAKE, not a choice, and reel 125 was told so in those
    words. A PAN is a legitimate re-framing; a tilt is a defect. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -6, dy: 5, s: 1.005, rot: 0 },
  amber: { dx: -56, dy: -22, s: 1.026, rot: 0 },
  steel: { dx: 58, dy: 20, s: 1.030, rot: 0 },
};
/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate`/`saturate` are BANNED
    from GRADE — both move the clay, and a trial cut may never recolour the
    Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.18) brightness(1.000)",
  amber: "contrast(1.130) saturate(1.18) brightness(0.958)",
  steel: "contrast(1.072) saturate(1.18) brightness(1.052)",
};
/** ⛔ A RAKE PHASE IS MODULO THE BAND PITCH — offsets inside one pitch collapse
    to nothing, which is how reel 122's top variant lever went inert. Varying `n`
    changes the PITCH itself, and that is the only offset that cannot. */
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.82, steel: 0.52 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
const PAR_X: Record<Variant, number> = { house: 0, amber: -44, steel: 42 };

/** the idle floor — 1.15deg/1.7px registers on a metric and READS as static;
    2.6deg/4.6px with a second slower harmonic is the amplitude that shows */
const breathe = (f: number, ph: number) =>
  Math.sin(f / 13 + ph) * 4.6 + Math.sin(f / 31 + ph * 0.6) * 2.2;
const tiltA = (f: number, ph: number) =>
  Math.sin(f / 15 + ph) * 2.6 + Math.sin(f / 37 + ph) * 1.1;


/* =========================================================================
   ⛔⛔⛔ THE SHOT LIST — MEASURED, AND IT WAS ONE SHOT FIFTEEN TIMES.

   Alex: *"the scenes need to be way more interesting."* Measured before
   changing anything, by taking the clay-pixel bounding box of the cast in every
   scene at 62% of its own duration:

     ground line y%   mean 96.6   spread 9.1pp   (across ALL FIFTEEN scenes)
     cast box width   86-98% of the panel in 12 of 15

   That is reel 122's rejected shot list with a different paint: *"16 of 17
   scenes put the Claude at 27.9-33.8% of panel width, on the same ground line,
   at the same camera height. Nineteen scenes, one shot. No amount of motion
   fixes that — the eye reads 'same picture again' and leaves."* Every scene
   here was a row of bodies along the bottom of the frame with an object in the
   middle, and the audits cannot see it because each one measures a scene
   against itself.

   ⭐ THE CURE IS A DESIGNED SEQUENCE OF SHOT SIZES, and the cheap way to get one
   is an inner `Cam` rather than re-laying every prop (`tools/frame_shot.py`).
   ⛔ `Cam` SCALES THE WHOLE SET, so it may only go UP: below 1.0 the panel's own
   background shows outside the painted room. Variety therefore comes from TWO
   axes together — scale 1.00-1.34, and a vertical offset that moves the ground
   line, which is the axis that measured flat.
   ⛔ AND THE CROP BOUND INCLUDES THIS: total = Scene push x SHOT.s. At 1.30 on
   top of a 1.07 push the visible width is 1012/1.39 = 728px, so 142px is gone
   each side. Nothing that has to READ sits outside the middle 700px in a tight
   shot. */
const SHOT: Record<string, { s: number; y: number }> = {
  S0:  { s: 1.00, y:   0 },   /* WIDE      — the picked hook, untouched */
  S1:  { s: 1.22, y:  26 },   /* LOW/TIGHT — up at the machine landing */
  S2:  { s: 1.06, y: -34 },   /* WIDE LOW  — the glass, and floor under it */
  S3:  { s: 1.00, y:   0 },   /* WIDEST    — the establishing */
  S4:  { s: 1.34, y: -46 },   /* CLOSE     — one body, one hatch */
  S5:  { s: 1.04, y:  22 },   /* WIDE      — the burst needs width */
  S6:  { s: 1.20, y:  48 },   /* CLOSE     — the board */
  S7:  { s: 1.28, y:  96 },   /* LOW TIGHT — he is above us and we are under it */
  S8:  { s: 1.26, y:  14 },   /* TIGHT     — the spout, and what comes out */
  S9:  { s: 1.00, y:   0 },   /* WIDE      — the loop needs the full height */
  S10: { s: 1.16, y:  30 },   /* MED       — pushing into the delivery */
  S11: { s: 1.28, y: -40 },   /* TIGHT     — the drum */
  S12: { s: 1.22, y:  18 },   /* CLOSE     — down onto the bench */
  S13: { s: 1.02, y:   6 },   /* WIDE      — the whole hall at speed */
  S14: { s: 1.12, y:  18 },   /* MED       — the CTA */
};
/** the inner camera. ⛔ `translate(x,y) scale(k)` — translate LAST, in screen
    space — which is what `Cam` does and why the offsets above are real pixels. */
const Shot: React.FC<{ k: keyof typeof SHOT; children: React.ReactNode }> =
  ({ k, children }) => (
  <Cam s={SHOT[k].s} y={SHOT[k].y} z={12}>{children}</Cam>
);

/** ⭐ AN IMPACT: 1 on the frame it lands, ringing out. §11 — WEIGHT is
    DEFORMATION, so this drives `strain` (which compresses scaleY, spreads
    scaleX and adds a tremble), never a position offset. ⛔ `strain`/`shock` are
    0..1 and summing two of them tears the rig, so every use is clamped. */
const hit = (f: number, at: number, d = 14) =>
  f < at || f > at + d ? 0 : Math.exp(-(f - at) / (d * 0.36));
const cl = (v: number) => Math.max(0, Math.min(1, v));

/** a body that breathes at the measured floor, on its own phase */
const Alive: React.FC<{ f: number; ax: number; ay: number; ph: number; z?: number;
  children: React.ReactNode }> = ({ f, ax, ay, ph, z = 52, children }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z,
    transform: `translateY(${breathe(f, ph)}px) rotate(${tiltA(f, ph)}deg)`,
    transformOrigin: `${ax}px ${ay}px` }}>{children}</div>
);

/* =========================================================================
   S0 — THE HOOK.  0.00 -> 2.63s (79f).  Picked from four concepts.

   ⭐ THE PICK WAS MEASURED, NOT ARGUED. Four full 79-frame shots were built and
   scored on the numbers a hook is actually decided by (`tools/hook_score.py`):

     concept          MOTION  0-1s FLOOR  HOLD   TOP/BOT  PRE-CUT  FRAME-0 LUMA
     A  THE FLOOD       5.98      2.95    46.2%    0.40     1.09       66.4
     B  THE ASSEMBLY    3.06      2.25   100.0%    1.02     0.79      151.7
     C  THE DROP        6.75      4.21    42.3%    0.43     0.45       62.9
     D  THE CLIMB       4.60      3.37    96.2%    0.46     0.78       74.1

   B was the only one that cleared the luma bar and it was DEAD — 100% of its
   0.1s samples under the bar, which is what a pale grey room full of small
   props measures. C had the event and failed three gates, and all three were
   authoring bugs rather than concept problems, so C was rebuilt six times
   against them:

     v1 -> v6   MOTION 6.75 -> 10.92 · 0-1s FLOOR 4.21 -> 8.08 · HOLD 42.3% -> 0.0%
                TOP/BOT 0.43 -> 0.67 · PRE-CUT 0.45 -> 1.45 · LUMA 62.9 -> 141.7

   The five findings, because each is reusable:
     1 `Flood`'s clip box was sized to the NEAR end of its cone, so every flood
       in the reel rendered as a sliver. §6.4, and the motion audit agreed with
       the bug because an unpainted wedge sweeps nothing.
     2 `Crew` runs `E(lf,0,8,0,1,BACK)` as its entrance, so `at={0}` means SCALE
       ZERO on frame 0 — a hook about a crew with no crew in its first frame.
       Pre-seeding is TIME, not position: `at={-12}`.
     3 A dark score bezel inside a lit box reads as a switched-off television.
       The box now holds the BOSS instead: a character at frame 0, the villain
       planted, and the reason the light exists.
     4 The 140 miss was MEASURED to two masses — a full-width gantry band at
       luma 70.9 and a redundant left occluder at 80.4 — and fixed by narrowing
       the occluder the CAST had already made unnecessary, not by lifting a dark
       stop (§8, the move that took thirteen reels pale).
     5 The ceiling on the shot was how much of the mechanism is in the air at
       once: 14 parts -> 22 closed the gaps and took it 9.05 -> 10.92 (§24).
   ====================================================================== */
export const S0: React.FC<SP> = ({ dur }) => <HookC dur={dur} />;

/* =========================================================================
   S1 — 2.63 -> 4.87s (67f) · WIDE · SETUP
   VO: "You can build entire apps and websites in a single prompt,"
   EVENT: one plate seats; the floor answers by throwing up a whole UNIT in
   three overlapping parts, each landing on its own spoken word.
   ⛔ THE PARTS ARRIVE, THEY DO NOT GROW. §12 — a float is not a lift.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const SEAT = 9;                                   /* "build"  3.08s */
  const B1 = 23, B2 = 36, B3 = 54;                  /* apps · websites · single */
  const seated = f >= SEAT;
  const built = Math.min(1, E(f, B1, B1 + 8, 0, 0.34, IN_Q)
    + E(f, B2, B2 + 8, 0, 0.33, IN_Q) + E(f, B3, B3 + 9, 0, 0.33, IN_Q));
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.46} glow={hexa(p.key, 0.24)}>
      <Shot k="S1">
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="duct" rake={0.14}
        rakeRate={5.4 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.7}
        lamp={{ x: 470, y: 150, r: 300 }} />
      {/* ⭐⭐ THE SET, NOT THE EFFECTS. S1 measured 4.12 in front of a flat amber
          wall with `Room`'s pale parallax boxes on it, and S5/S12/S14 were the
          SAME wall — reel 120's "six timestamps, one grey slab" with a different
          paint. A wall of real racking at real value contrast is §1's biggest
          single lever (7.68 -> 9.65 in one pass) and it is what makes these four
          beats four corners of a place instead of one backdrop four times. */}
      <RackWall p={p} f={f} y={216} z={8} bays={5} x0={-70} pitch={244} lit={0.8} dx={PAR_X[v] * 0.4} />
      <Overrun p={p} f={f} y={104} z={86} rate={5.6} n={9} lit={0.9} />
      <Gantry p={p} y={168} z={36} f={f} legs={false} lit={0.34} />
      {[24, 736].map((bx, i) => (
        <BenchBay key={"bb" + i} p={p} x={bx} y={556} w={252} z={32} f={f} lit={0.9} vice={i === 0} />
      ))}
      {/* the background process: a feed belt under the benches, always running */}
      {Array.from({ length: 12 }, (_, i) => {
        const x = ((i * 92 + f * 4.6) % (W + 200)) - 100;
        return <Slab key={"bl" + i} x={x} y={718} w={82} h={50} z={28} parts={2}
          c={i % 3 === 0 ? CREAMB : OXIDE} rot={(rnd(i, 9) - 0.5) * 5} />;
      })}
      {/* the slot, and the plate travelling into it */}
      <div style={{ position: "absolute", left: 62, top: 470, width: 158, height: 84, zIndex: 40,
        background: `linear-gradient(180deg, ${dkh(IRON, 0.06)} 0%, ${dkh(IRON, 0.4)} 100%)`,
        border: `6px solid ${mxh(IRON, 0.22)}`, borderRadius: 5 }}>
        <div style={{ position: "absolute", left: 10, top: 10, right: 10, height: 8,
          background: hexa(p.key, seated ? 0.94 : 0.3) }} />
      </div>
      <div style={{ position: "absolute", left: 74 + (1 - E(f, 0, SEAT, 0, 1, IN_Q)) * -210,
        top: 486, zIndex: 56, transform: `scale(${squash(f, SEAT, 0.16, 3, 11)})`,
        transformOrigin: "70px 26px" }}>
        <Slab x={0} y={0} w={140} h={56} z={56} parts={2} c={CREAMB} label="1 PROMPT" />
      </div>
      {seated && <Ring x={144} y={514} f={f} at={SEAT} c={mxh(GOLD, 0.3)} s={0.66} />}

      {/* ⭐ THE UNIT ARRIVES IN THREE PARTS, ON THREE SPOKEN WORDS */}
      {/* S1 · the machine lands AROUND him at 1.46 — biggest the Unit ever is
          except S8, and he is inside its footprint rather than watching from
          across the room */}
      <div style={{ position: "absolute", left: 300, top: 236, zIndex: 66 }}>
        <Unit p={p} x={0} y={0} s={1.46} z={66} f={f} built={built} run={0} lit={1} at={0} />
      </div>
      {[B1, B2, B3].map((at, i) => f >= at + 8 && (
        <React.Fragment key={"ar" + i}>
          <Ring x={492} y={396 + i * 84} f={f} at={at + 8} c={mxh(BRASS, 0.34)} s={0.9} dur={16} />
          <Puff x={492} y={410 + i * 84} f={f} at={at + 8} c={p.grit} n={8} s={0.85} />
        </React.Fragment>
      ))}
      {/* the hero steps BACK as it lands — an arrival that costs something */}
      <Alive f={f} ax={224} ay={700} ph={0.4} z={72}>
        {/* ⛔ HE WAS STANDING THERE WHILE THINGS HAPPENED AROUND HIM (§12), which
            is the definition of a dead scene however the number reads. Three
            parts slam in on three spoken words, so he DUCKS under each one: the
            impact drives `strain`, which compresses his body 16% and spreads it
            12%, and he ships 54px of real travel doing it. */}
        <Hero f={f} x={224} y={700} size={296} z={72} costume={{ constr: 1 }} act={3}
          strain={cl(hit(f, B1 + 8) + hit(f, B2 + 8) + hit(f, B3 + 9))}
          lift={-54 * cl(hit(f, B1 + 8) + hit(f, B2 + 8) + hit(f, B3 + 9))}
          gaze={0.55} shock={cl(E(f, B2, B2 + 7, 0, 0.7, IN_Q) - E(f, B3 + 14, B3 + 30, 0, 0.7, IO))} />
      </Alive>
      <Contact x={224} y={712} w={236} z={30} o={0.36} />
      <Jamb p={p} side="r" w={104} z={88} kind="stud" />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S2 — 4.87 -> 7.70s (85f) · LOW ANGLE, LOOKING UP · SETUP
   VO: "and even the creators of Claude think this is the future of AI."
   EVENT: the flood strikes and sweeps down; six quoted words resolve on the
   glass cell by cell; the boss crosses BEHIND them once and does not stop.
   ⛔ NO PORTRAIT OF A REAL PERSON — a name strip under quoted words, nothing
      drawn as a likeness. `R.future` / `R.futureWho` are the only strings.
   ⛔ THE §3 TEST KILLED THE FIRST VERSION OF THIS SHOT: a lit box says nothing
      about "the creators think this is the future". The picture has to depict
      PEOPLE WHO WORK THIS WAY, so the words are his and the silhouette is a
      person crossing a lit office at the top of a building at night.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("glass");
  const STRIKE = 6, CRE = 15, CLA = 32, FUT = 52, AI = 68;
  const words = R.future.split(" ");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.52} glow={hexa(p.key, 0.2)}>
      <Shot k="S2">
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="none" rake={0.11}
        rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.4}
        lamp={{ x: 506, y: 96, r: 210 }} />
      {/* the gantry underside, from below — the floor is a dark ledge at the foot */}
      <Gantry p={p} y={404} z={40} f={f} legs lit={0.42} />
      <GlassBox p={p} x={148} y={130} w={716} h={252} z={50} f={f}
        on={E(f, STRIKE, STRIKE + 5, 0.22, 1, IN_Q)} score={null} readout={false} refl={1}>
        {/* ⭐ the quoted words resolve CELL BY CELL, each on its own clock */}
        {/* ⛔ 5.42 BECAUSE THE WORDS FADED IN AT 34px. §1: only LARGE x BRIGHT x
            FAST registers, and a 34px chip easing 14px is none of the three.
            They are split-flap cells now — 52px, arriving from a full cell
            height above with a hard land, on their own clocks. */}
        <div style={{ position: "absolute", left: 36, top: 48, width: 644, display: "flex",
          flexWrap: "wrap", gap: 12, zIndex: 3 }}>
          {words.map((wd, i) => {
            const at = CRE + i * 6;
            const k = E(f, at, at + 4, 0, 1, IN_Q);
            const land = f >= at + 4 ? squash(f, at + 4, 0.16, 3, 10) : 1;
            return (
              <div key={"w" + i} style={{ padding: "10px 16px", borderRadius: 5,
                background: k > 0.02 ? dkh(IRON, 0.1) : dkh(IRON, 0.34),
                overflow: "hidden", ...mono(52, 800), color: mxh(GOLD, 0.36),
                letterSpacing: 2, transform: `scaleY(${land})`, transformOrigin: "50% 0%" }}>
                <span style={{ display: "inline-block", opacity: k,
                  transform: `translateY(${(1 - k) * -62}px)` }}>{wd}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 40, top: 186, zIndex: 3, opacity: E(f, FUT, FUT + 6, 0, 1, IN_Q),
          ...mono(20, 800), color: mxh(p.key, 0.4), letterSpacing: 3 }}>{R.futureWho}</div>
        {/* ⭐ THE BOSS CROSSES ONCE, BEHIND THE WORDS, AND DOES NOT STOP.
            ⛔ LIN — he is still walking when the scene cuts (§23). */}
        <div style={{ position: "absolute", left: E(f, 20, dur + 24, -170, 760, LIN), top: 236,
          zIndex: 1, opacity: 0.5 }}>
          <Hero f={f} x={0} y={0} size={172} z={1} costume={{ suit: 1 }} act={0}
            stern={1} tint={dkh(CLAY, 0.5)} ph={1.3} />
        </div>
      </GlassBox>
      <Flood x={506} y={400} k={E(f, STRIKE, STRIKE + 6, 0, 0.9, IN_Q)} z={22} c={GLASSW}
        len={400} top={300} bot={880} f={f} />
      {/* the crew below, in silhouette, all looking UP */}
      {/* ⭐ S2 IS A POINT OF VIEW, NOT A CROWD SHOT. Four evenly-spaced 196px
          silhouettes along the bottom was the row-of-bodies composition this
          reel had fifteen times. One body at 372px in the near foreground,
          cropped by the panel edge, IS the `Occluder` this frame needed and it
          makes the glass read as something being looked UP at. The other two
          are far, small and dark, which is the value ramp that makes depth
          readable. */}
      <Alive f={f} ax={196} ay={846} ph={0.3} z={74}>
        <Hero f={f} x={196} y={846} size={372} z={74} costume={{ constr: 1 }} act={3}
          gaze={-0.75} tint={dkh(CLAY, 0.30)} />
      </Alive>
      {[706, 878].map((bx, i) => (
        <Alive key={"c" + i} f={f} ax={bx} ay={772} ph={i * 2.1} z={52}>
          <Crew f={f} x={bx} y={772} i={i + 4} size={152} z={52} at={-12} loop={3}
            tint={dkh(CLAY, 0.46 + i * 0.06)} />
        </Alive>
      ))}
      {/* the background process: rain of sparks off the gantry, always running */}
      {Array.from({ length: 9 }, (_, i) => {
        const ph = ((f * 6 + i * 27) % 140) / 140;
        return <div key={"sk" + i} style={{ position: "absolute",
          left: 120 + i * 96 + Math.sin(i * 2.1) * 30, top: 420 + ph * 300,
          width: 7, height: 26, zIndex: 44, borderRadius: 4,
          background: mxh(GOLD, 0.2), opacity: 0.85 - ph * 0.6 }} />;
      })}
      {/* the overhead run, unlit, above the glass — the building never stops */}
      <Overrun p={p} f={f} y={62} z={86} rate={5.0 + E(f, AI - 10, dur + 18, 0, 9, IN_Q)} n={8} lit={0.2} />
      <Motes x={506} y={200} w={760} h={420} n={18} f={f} z={80} c={mxh(p.key, 0.3)} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S3 — 7.70 -> 8.73s (31f) · ESTABLISH WIDE · TURN
   VO: "It's called the boss loop."
   EVENT: the whole OVERLOOK is seen for the first time and the hall comes up in
   three banks, bottom to top, so the eye is walked UP the building.
   ⛔ 31 FRAMES IS ABOVE THE 0.7s SHOT FLOOR AND NOTHING ELSE FITS. One event.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("over");
  const B = [0, 5, 10];                             /* banks, 5f apart */
  const on = (i: number) => E(f, B[i], B[i] + 4, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(p.key, 0.24)}>
      <Shot k="S3">
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="none" rake={0.12}
        rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.6}
        lamp={{ x: 506, y: 120, r: 260 }} />
      {/* storey 1 — the bench floor */}
      <div style={{ position: "absolute", left: 0, top: 646, width: W, height: 13, zIndex: 26,
        background: hexa(p.key, 0.1 + on(0) * 0.76) }} />
      {[16, 268, 700, 900].map((bx, i) => (
        <BenchBay key={"b" + i} p={p} x={bx} y={658} w={172} z={30} f={f} lit={on(0)} vice={i === 0} />
      ))}
      {/* storey 2 — the mid deck */}
      <Gantry p={p} y={444} z={34} f={f} legs={false} lit={on(1)} />
      {/* storey 3 — the glass */}
      <Gantry p={p} y={252} z={40} f={f} legs lit={on(2)} />
      <GlassBox p={p} x={288} y={112} w={436} h={140} z={52} f={f} on={on(2)}
        score={null} readout={false} refl={on(2)}>
        <div style={{ position: "absolute", left: 138, top: 128, zIndex: 2 }}>
          <Hero f={f} x={0} y={0} size={116} z={2} costume={{ suit: 1 }} act={3}
            stern={1} gaze={-0.3} ph={0.7} />
        </div>
      </GlassBox>
      <Flood x={506} y={254} k={on(2) * 0.72} z={22} c={GLASSW} len={420} top={250} bot={760} f={f} />
      {/* ⛔ 0.74 — the three banks were done by f14 of 31 and the shot held.
          The hoist LEAVES the floor at f16 on an accelerating clock and is still
          climbing when the scene cuts, which is also what a hall that has just
          come up would do. */}
      <Hoist p={p} x={430} yTop={266} yBot={646} k={E(f, 16, dur + 18, 0.02, 0.62, IN_Q)} z={44} f={f} w={152}>
        <div style={{ position: "absolute", left: 16, top: 14, zIndex: 2 }}>
          <Slab x={0} y={0} w={112} h={76} z={2} parts={2} c={CREAMB} />
        </div>
      </Hoist>
      <Chute p={p} x={604} y={236} w={372} h={222} z={46} f={f} hot={0} />
      {/* the cast, small, all present */}
      {[86, 250, 764, 928].map((bx, i) => (
        <Alive key={"c" + i} f={f} ax={bx} ay={760} ph={i * 1.7} z={50}>
          <Crew f={f} x={bx} y={748} i={i} size={132} z={50} at={-12} loop={i % 4}
            tint={i > 1 ? dkh(CLAY, 0.22) : undefined} />
        </Alive>
      ))}
      {/* the ONE text chip this shot gets, in the reserved band */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, zIndex: 92,
        display: "flex", justifyContent: "center", opacity: E(f, 11, 16, 0, 1, IN_Q),
        transform: `translateY(${(1 - E(f, 11, 16, 0, 1, BACK)) * -18}px)` }}>
        <div style={{ padding: "12px 28px", borderRadius: 8, background: mxh(CREAMB, 0.06),
          border: `4px solid ${dkh(BRASS, 0.24)}`, boxShadow: SH,
          ...mono(40, 800), color: INK, letterSpacing: 3 }}>{R.name}</div>
      </div>
      <Jamb p={p} side="l" w={78} z={88} kind="post" o={0.7} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S4 — 8.73 -> 10.33s (48f) · TIGHT · CONTRAST
   VO: "Instead of doing the normal back and forth chats,"
   EVENT: one Claude alone hands a slip UP through a hatch, waits, gets it
   BACK, hands it up again — four times, the same 2px of progress, slower each
   time. ⛔ THE ONLY REPETITIVE SCENE IN THE REEL, ON PURPOSE: it is the
   "before" everything after it is measured against.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shaft");
  /* four cycles, each SLOWER than the last — the rate is the point */
  const CY = [0, 13, 25, 36];
  const cycle = CY.reduce((a, c, i) => (f >= c ? i : a), 0);
  const lf = f - CY[cycle];
  const len = [11, 10, 9, 8][cycle];
  const up = E(lf, 0, len * 0.45, 0, 1, IN_Q) - E(lf, len * 0.5, len, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.60} glow={hexa(p.key, 0.16)}>
      <Shot k="S4">
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="column" overhead="joist" rake={0.08}
        rakeRate={3.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.3}
        lamp={{ x: 300, y: 220, r: 150 }} />
      {/* ⛔ 5.95, the only scene still under bar. It is MEANT to be the trough —
          it is the "before" the rest of the reel is measured against — but
          AUDIT-FIRST §C is the right diagnosis: *"too boring is often ABSENCE,
          not quality"*. The room gets what a dead corner of a shaft would have:
          a run of pipes, four SHUT hatches (so his one open hatch reads as the
          only way through), and a dead conveyor that does not move — the only
          still background process in the reel, which is the point. */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"pp" + i} style={{ position: "absolute", left: -30, top: 120 + i * 26,
          width: W + 60, height: 13, zIndex: 20, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.24 - i * 0.03)} 0%, ${dkh(IRON, 0.2)} 100%)` }} />
      ))}
      {[70, 232, 700, 870].map((hx, i) => (
        <Hatch key={"sh" + i} p={p} x={hx} y={252} w={126} k={0} z={22} />
      ))}
      <div style={{ position: "absolute", left: -30, top: 606, width: W + 60, height: 15, zIndex: 24,
        background: dkh(IRON, 0.22) }} />
      {Array.from({ length: 7 }, (_, i) => (
        <Slab key={"dc" + i} x={-20 + i * 158} y={556} w={92} h={52} z={26} parts={2}
          c={dkh(OXIDE, 0.24)} rot={(rnd(i, 4) - 0.5) * 3} />
      ))}
      {/* one tired lamp, and it FLICKERS — the dullest frame in the reel by design */}
      <div style={{ position: "absolute", left: 268, top: 148, width: 76, height: 34, zIndex: 40,
        borderRadius: "0 0 12px 12px",
        background: hexa(p.key, ((f * 7) % 61) < 4 ? 0.2 : 0.62) }} />
      {/* the hatch in the ceiling — a SOCKET that reads while empty */}
      <div style={{ position: "absolute", left: 372, top: 208, width: 224, height: 40, zIndex: 42,
        background: dkh(IRON, 0.34), border: `6px solid ${mxh(IRON, 0.18)}`, borderRadius: 4 }}>
        <div style={{ position: "absolute", left: 12, top: 8, right: 12, height: 8,
          background: hexa(p.key, 0.16 + up * 0.5) }} />
      </div>
      {/* the slip, going up and coming straight back */}
      <div style={{ position: "absolute", left: 428, top: 420 - up * 172, zIndex: 62,
        transform: `rotate(${up * 5}deg)` }}>
        <Slab x={0} y={0} w={112} h={46} z={62} parts={1} c={CREAMB} />
      </div>
      {/* ⭐ four tally marks accumulate — the ONE thing that changes in this shot */}
      {CY.map((c, i) => f >= c + 8 && (
        <div key={"tl" + i} style={{ position: "absolute", left: 664 + i * 26, top: 470,
          width: 8, height: 46, zIndex: 60, background: mxh(p.key, 0.2), opacity: 0.85,
          transform: `rotate(${(i % 2 ? 1 : -1) * 5}deg)` }} />
      ))}
      <Alive f={f} ax={470} ay={716} ph={0.2} z={54}>
        {/* ⭐ THE ONLY REPETITIVE SCENE IN THE REEL, AND THE REPETITION IS THE
            POINT — so the BODY has to carry it: he extends UP into each shove
            (lift), strains at the top, and starts each cycle lower than the
            last. By the fourth he is 34px down and visibly heavier. */}
        <Hero f={f} x={396} y={708} size={228} z={54} costume={{ glasses: 1 }} act={1}
          reach={110} lift={up * 66 - cycle * 11} strain={cl(up * 0.85)}
          cheer={0} gaze={0.2} />
      </Alive>
      <Contact x={470} y={724} w={182} z={30} o={0.32} />
      <Jamb p={p} side="r" w={132} z={88} kind="door" />
      <Jamb p={p} side="l" w={112} z={88} kind="post" />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S5 — 10.33 -> 13.17s (85f) · WIDE · ESCALATE          ⭐ DENSITY PEAK 1
   VO: "you give Claude a task and tell it to spawn a team of worker sub-agents."
   EVENT: the task plate seats on "task"; on "spawn" eight hatches blow open and
   eight Claudes come UP out of the floor, staggered across the FULL 85 frames.
   ⛔ PITCH IS ARITHMETIC: 8 across 928 usable is 103px per rank against bodies
      of ~150px, which renders as one orange mass. TWO RANKS OF FOUR at 232px
      pitch, back rank in darker clay — size alone is a texture, VALUE is what
      makes depth readable and it is the axis a greyscale audit can see.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const TASK = 14, SPAWN = 35;
  /* ⛔ v1 STAGGERED THESE 6 FRAMES APART FROM f35, so the eighth body arrived at
     f77 of 85 and at the sampled instant only three were on screen — a density
     PEAK measuring 5.74. §5's "shorten the arrival" and §26's "a wider stagger
     is better for a QUEUE" pull opposite ways and only the measurement settles
     it: this is a BURST, not a queue, so the eight go 4 frames apart from f31
     and the last one is up by f59, leaving the back half of the scene for what
     they DO rather than for them still arriving. */
  const HATCH = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => SPAWN - 4 + i * 4);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.44} glow={hexa(p.key, 0.26)}>
      <Shot k="S5">
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="duct" rake={0.15}
        rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.8}
        lamp={{ x: 506, y: 140, r: 320 }} />
      <RackWall p={p} f={f} y={200} z={8} bays={5} x0={-40} pitch={232} lit={0.9} dx={PAR_X[v] * 0.4} />
      <Overrun p={p} f={f} y={96} z={86} rate={7.4} n={11} lit={1} />
      <Gantry p={p} y={160} z={36} f={f} legs={false} lit={0.36} />
      {/* the task plate seats first — it is what causes everything after it */}
      <div style={{ position: "absolute", left: 388 + (1 - E(f, 0, TASK, 0, 1, IN_Q)) * -300,
        top: 214, zIndex: 60, transform: `scale(${squash(f, TASK, 0.15, 3, 11)})`,
        transformOrigin: "116px 30px" }}>
        <Slab x={0} y={0} w={232} h={62} z={60} parts={2} c={CREAMB} label="THE TASK" />
      </div>
      {f >= TASK && <Ring x={504} y={244} f={f} at={TASK} c={mxh(GOLD, 0.3)} s={0.8} />}

      {/* ⭐ EIGHT HATCHES, TWO RANKS, VALUE-RAMPED */}
      {HATCH.map((at, i) => {
        const back = i >= 4;
        const col = i % 4;
        const bx = 118 + col * 232 + (back ? 86 : 0);
        const by = back ? 552 : 782;
        const sz = back ? 146 : 272;
        const k = E(f, at, at + 6, 0, 1, IN_Q);
        return (
          <React.Fragment key={"h" + i}>
            <Hatch p={p} x={bx - sz * 0.42} y={by - 6} w={sz * 0.84} k={k} z={back ? 34 : 46} />
            {f >= at && (
              <Alive f={f} ax={bx} ay={by} ph={i * 1.7} z={back ? 38 : 52}>
                <Crew f={f} x={bx} y={by} i={i} size={sz} z={back ? 38 : 52} at={at}
                  loop={i % 4} tint={back ? dkh(CLAY, 0.30) : undefined} />
              </Alive>
            )}
            {f >= at + 6 && <Puff x={bx} y={by} f={f} at={at + 6} c={p.grit} n={7} s={0.7} up={30} />}
            {f >= at + 6 && <Ring x={bx} y={by} f={f} at={at + 6} c={mxh(p.key, 0.3)} s={0.5} dur={13} />}
          </React.Fragment>
        );
      })}
      {/* the background process: the feed belt, and it ACCELERATES as the crew
          fill the floor — the rate is the thing that carries the last frames */}
      {Array.from({ length: 13 }, (_, i) => {
        const x = ((i * 86 + f * (6.2 + E(f, 48, dur, 0, 13, LIN))) % (W + 200)) - 100;
        return <Slab key={"bl" + i} x={x} y={758} w={78} h={46} z={26} parts={2}
          c={i % 3 === 0 ? CREAMB : OXIDE} rot={(rnd(i, 9) - 0.5) * 5} />;
      })}
      <Jamb p={p} side="l" w={86} z={88} kind="stud" o={0.8} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S6 — 13.17 -> 15.10s (58f) · CLOSE ON THE ORDER · TURN
   VO: "But the secret sauce is the third line of the prompt"
   EVENT: lines 1 and 2 tick over fast and strike through; the frame settles on
   an EMPTY BRACKET and holds it, lit, with nothing in it.
   ⛔ THE EMPTY CONTAINER MUST READ WHILE EMPTY — empty is the promise (§11).
   ⛔ A RETURNING SET IS A CALLBACK ONLY IF THE LIGHT CHANGED: `intake2` is the
      same geometry as the hook's order wall, four stops down, one hard cone.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("intake2");
  const L1 = 8, L2 = 27, HOLD = 46;
  const done = (f >= L1 ? Math.min(1, (f - L1) / 6) : 0) + (f >= L2 ? Math.min(1, (f - L2) / 6) : 0);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.065]} vig={0.60} glow={hexa(p.key, 0.2)}>
      <Shot k="S6">
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="shelf" overhead="joist" rake={0.09}
        rakeRate={3.6 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="boards" grit={0.4}
        lamp={{ x: 470, y: 150, r: 210 }} />
      <OrderWall p={p} x={214} y={214} s={1.06} z={52} f={f} done={done} plate={0} lit={1} />
      {/* the cone that lights it, and nothing else in the room is lit */}
      <div style={{ position: "absolute", left: 300, top: 118, width: 420, height: 110, zIndex: 30,
        clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0 100%)",
        background: `linear-gradient(180deg, ${hexa(p.key, 0.4)} 0%, ${hexa(p.key, 0)} 100%)` }} />
      {/* ⭐ THE THIRD BRACKET PULSES ONCE IT IS THE ONLY THING LEFT — a socket
          that is waiting, not an absence. ⛔ contained, never a screen flash. */}
      {f >= HOLD && (
        <div style={{ position: "absolute", left: 272, top: 462, width: 470, height: 52,
          zIndex: 70, borderRadius: 5, opacity: 0.24 + 0.24 * (0.5 - 0.5 * Math.cos((f - HOLD) / 3.4)),
          background: hexa(p.key, 0.9) }} />
      )}
      {/* the hero strikes the two lines off himself, then stops dead */}
      <Alive f={f} ax={846} ay={742} ph={0.9} z={56}>
        {/* he works fast through lines 1 and 2, then the third bracket stops him:
            the drive goes to zero and his whole body SETTLES 26px, which is what
            "and then he sees it" looks like without a face */}
        <Hero f={f} x={772} y={732} size={216} z={56} costume={{ constr: 1 }} act={1}
          reach={104} drive={f < HOLD ? 0.5 + 0.5 * Math.sin(f / 4) : 0}
          lift={f >= HOLD ? -E(f, HOLD, HOLD + 10, 0, 26, OUT) : 0}
          strain={cl(E(f, HOLD, HOLD + 8, 0, 0.4, OUT))}
          stern={f >= HOLD ? 0.8 : 0} gaze={-0.4} />
      </Alive>
      <Contact x={846} y={748} w={168} z={30} o={0.3} />
      {/* ⛔ 5.12 ON A SHOT WHOSE SUBJECT IS A BOARD. The board is correct and the
          ROOM was empty — so the room gets the thing this world always has
          running overhead, unlit, at the far end. A background process is
          furniture; it costs the hierarchy nothing and it is the difference
          between a shot and a still. */}
      {/* ⛔ 0.83 — fading. The overhead run ACCELERATES from the moment the third
          bracket is the only thing left, so the room is speeding up into the cut
          even though the board itself is deliberately still. */}
      <Overrun p={p} f={f} y={86} z={86} rate={4.0 + E(f, HOLD - 6, dur + 16, 0, 11, IN_Q)} n={7} lit={0.22} />
      <RackWall p={p} f={f} y={252} z={8} bays={4} x0={-120} pitch={268} lit={0.12} dx={PAR_X[v] * 0.4} />
      <Motes x={480} y={140} w={420} h={420} n={20} f={f} z={78} c={mxh(p.key, 0.4)} />
      <Jamb p={p} side="l" w={124} z={88} kind="door" />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S7 — 15.10 -> 16.63s (46f) · LOW ANGLE · VILLAIN IN
   VO: "where you assign a strict AI boss."
   EVENT: a brass plate travels UP the bracket and seats on "assign"; the glass
   LIGHTS on "boss"; the boss stands into it and does not look down at us.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("glass");
  const ASSIGN = 5, STRICT = 14, BOSS = 25;
  const plate = E(f, ASSIGN, ASSIGN + 10, 0, 1, IN_Q);
  const lit = E(f, BOSS, BOSS + 4, 0.2, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.52} glow={hexa(p.key, 0.22)}>
      <Shot k="S7">
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="none" rake={0.12}
        rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.4}
        lamp={{ x: 506, y: 110, r: 220 }} />
      <Gantry p={p} y={392} z={40} f={f} legs lit={0.34 + lit * 0.4} />
      {/* the chute mouth swings open as the cage comes up — the next scene's
          machinery arriving early, and a large high-contrast mass rotating
          through the frames that were dead */}
      <div style={{ position: "absolute", left: 620, top: 372, width: 380, height: 92, zIndex: 43,
        transformOrigin: "0% 0%", transform: `rotate(${E(f, 30, dur, 0, 34, LIN)}deg)`,
        background: `linear-gradient(174deg, ${mxh(IRON, 0.26)} 0%, ${dkh(IRON, 0.3)} 100%)`,
        borderTop: `7px solid ${mxh(IRON, 0.4)}` }} />
      <GlassBox p={p} x={126} y={112} w={760} h={272} z={50} f={f} on={lit}
        score={null} readout={false} refl={lit}>
        <div style={{ position: "absolute", left: 292, top: 250, zIndex: 2,
          opacity: E(f, BOSS, BOSS + 5, 0, 1, IN_Q),
          transform: `translateY(${(1 - E(f, BOSS, BOSS + 7, 0, 1, BACK)) * 76}px)` }}>
          <Hero f={f} x={0} y={0} size={214} z={2} costume={{ suit: 1 }} act={3}
            stern={1} gaze={-0.35} ph={1.9} />
        </div>
      </GlassBox>
      {/* ⭐ the brass plate travels UP the bracket and seats */}
      <div style={{ position: "absolute", left: 268, top: 640 - plate * 200, zIndex: 62,
        transform: `scale(${squash(f, ASSIGN + 10, 0.16, 3, 11)})`, transformOrigin: "236px 30px" }}>
        <div style={{ width: 472, height: 62, borderRadius: 5,
          background: `linear-gradient(178deg, ${mxh(BRASS, 0.42)} 0%, ${dkh(BRASS, 0.1)} 100%)`,
          border: `4px solid ${dkh(BRASS, 0.4)}`, display: "flex", alignItems: "center",
          justifyContent: "center", ...mono(28, 800), color: INK, letterSpacing: 3 }}>
          {R.split}
        </div>
      </div>
      {f >= ASSIGN + 10 && <Ring x={504} y={470} f={f} at={ASSIGN + 10} c={mxh(BRASS, 0.4)} s={1.1} dur={18} />}
      {/* ⛔⛔ 0.43 — THIS SCENE DIED INTO ITS OWN CUT. Everything it was authored
          to do (the plate travels, seats, the glass lights, he stands) had
          COMPLETED by local f30 of 46, and the last 16 frames were a held pose.
          §23: extending the ramps past the cut fixes nothing, because an IO/OUT
          ease decelerates toward its end whether or not that end is on screen.
          ⭐ THE FIX IS A NEW EVENT THAT STARTS LATE AND IS STILL ACCELERATING AT
          THE CUT — and the right one is the beat S8 opens on: the moment there
          is a boss, the hoist starts taking work UP to him. It is `IN_Q`, it is
          a large object, and it hands straight into the next scene. */}
      {/* ⛔⛔ v1 OF THIS FIX MOVED THE CAGE 71px IN 16 FRAMES — 4.4px per frame on
          a 172px object, which repaints an edge and nothing else, and the ratio
          only went 0.43 -> 0.59. The travel is now LIN over the frames it
          actually has: 400px in 20, i.e. 20px/frame, and it leaves the top of
          frame still accelerating away. Speed is a first-class parameter (§26)
          and it is the one nobody audits. */}
      {/* ⛔⛔ MEASURED, FRAME BY FRAME, AFTER THREE FIXES ALL STUCK AT 0.69: the
          per-frame profile showed f27-29 at 6.97/9.77/12.58 (the boss standing)
          and f39-45 at 2.0-2.7. Every tail object added was too small, too far
          off-frame or too far under the stack — the crew had ALREADY left frame
          by f45, and the sweeping flood was half off the right edge.
          ⭐ SO THE TAIL CARRIES THE HERO ARTIFACT. What rides the cage is the
          UNIT itself at 0.92 — a ~300px lit brass machine crossing 440px of
          dead-centre frame in the last twelve frames — which is both the
          biggest object available and the beat S8 opens on. */}
      {/* ⛔ THE SHOT CHANGE PUT THIS BACK ON THE FLOOR. `SHOT.S7` is s=1.28 y=+96,
          which maps the cage's start at panel y 860 to SCREEN y 1059 — off the
          bottom — so half its travel happened outside the crop and the tail went
          0.73 -> 0.68. Two fixes together: the travel starts inside the frame,
          and it is `IN_Q` rather than `LIN` so it is FASTEST at the exact frame
          it cuts. §23 allows either, but accelerating is what an editor cuts on
          and it is the one that puts the pixels in the last eight frames. */}
      <Hoist p={p} x={392} yTop={286} yBot={742} k={E(f, 18, dur, 0, 1, IN_Q)} z={44} f={f} w={172}>
        <div style={{ position: "absolute", left: -66, top: -196, zIndex: 2 }}>
          <Unit p={p} x={0} y={0} s={0.92} z={2} f={f} built={1} run={0} lit={1} at={0} />
        </div>
      </Hoist>
      {/* ⭐ AND THE LIGHT ITSELF TRAVELS. A flood that snaps on and holds is a
          state; one that SWEEPS the floor looking for something is the boss
          doing his job, and it is a full-width high-contrast band — §1's second
          highest-value shape. LIN, still sweeping at the cut. */}
      <Flood x={506 + E(f, 26, dur, -230, 300, LIN)} y={388} k={lit * 0.94} z={22}
        c={GLASSW} len={410} top={360} bot={980} f={f} />
      {/* ⭐⭐ THE LAST BEAT OF THIS SCENE IS THE FLOOR REACTING. BOSSIN went
          0.43 -> 0.57 -> 0.69 across three fixes because every one of them also
          raised the BODY — the cage, the sweeping flood and the chute all fire
          mid-scene too, so the ratio barely moved. What the last eight frames
          needed was an event that exists ONLY in them, and the one this scene
          is about is what a floor does when a boss starts looking at it: both
          bodies turn and get out of the light, LIN, still travelling at the cut.
          It is two 210px sprites crossing 300px in eight frames — large, fast,
          and it means something. */}
      {[110, 890].map((bx, i) => {
        const flee = E(f, 32, dur + 6, 0, 1, LIN) * (i ? 300 : -300);
        return (
          <Alive key={"c" + i} f={f} ax={bx + flee} ay={790} ph={i * 1.7} z={54}>
            <Crew f={f} x={bx + flee} y={800} i={i + 2} size={210} z={54} at={-12}
              loop={f >= 32 ? 0 : 3} tint={dkh(CLAY, 0.32)} />
          </Alive>
        );
      })}
      <Motes x={506} y={180} w={700} h={420} n={16} f={f} z={80} c={mxh(p.key, 0.3)} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S8 — 16.63 -> 19.13s (75f) · MED, THE FLOOD ON THE UNIT · ESCALATE
   VO: "The worker agents write the code and the boss tears it apart."
   EVENT: the crew's finished unit rides up into the flood on "write"; THE BOSS
   RUNS IT and the spout COUGHS A DUD; on "apart" it is unbolted and goes down
   the chute in one piece.
   ⛔⛔ HE DOES NOT STAMP ANYTHING. The receipt on the glass is `R.quote` —
      Cherny's own test is whether the agent can RUN the thing — so the verdict
      here is a demonstration that fails, not a verdict handed down.
   ⛔ AND IT IS DELIBERATELY NOT THE HOOK'S EVENT. S0 is a WIDE, fast, explosive
      fall down a shaft; this is a TIGHT, slow, deliberate failure under a light.
      Same subject, opposite tempo, so the two never read as one beat twice.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("chute");
  const WRITE = 11, CODE = 23, BOSS = 37, TEARS = 42, APART = 57;
  const rise = E(f, WRITE, WRITE + 14, 0, 1, IN_Q);
  const run = f >= CODE && f < TEARS ? 1 : 0;
  const slide = E(f, APART, dur + 16, 0, 1, LIN);           /* crosses the cut */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.50} glow={hexa(p.key, 0.24)}>
      <Shot k="S8">
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray" rake={0.14}
        rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.5}
        lamp={{ x: 470, y: 130, r: 250 }} />
      <Gantry p={p} y={158} z={38} f={f} legs={false} lit={0.6} />
      <Chute p={p} x={600} y={232} w={400} h={300} z={46} f={f} hot={f >= APART ? 1 : 0} />
      <Flood x={452} y={162} k={0.9} z={22} c={GLASSW} len={430} top={280} bot={700} f={f} />

      {/* ⭐ THE GLASS CARRIES THE RECEIPT — six quoted words and a name strip */}
      <div style={{ position: "absolute", left: 132, top: 128, width: 640, zIndex: 92,
        opacity: E(f, BOSS, BOSS + 5, 0, 1, IN_Q) }}>
        <div style={{ padding: "10px 20px", borderRadius: 6, background: mxh(CREAMB, 0.06),
          border: `4px solid ${dkh(BRASS, 0.26)}`, ...mono(28, 800), color: INK, letterSpacing: 2 }}>
          {R.quote}
        </div>
        <div style={{ marginTop: 7, marginLeft: 6, ...mono(18, 800), color: mxh(p.key, 0.36),
          letterSpacing: 3 }}>{R.quoteWho}</div>
      </div>

      {/* the unit on the test plate, running, and coughing */}
      {/* S8 · the Unit at 1.62 and pushed right, so the failure happens at a
          size you can read the gears turning at. This is the ONLY scene where
          the machine outranks the cast, and it is the scene about the machine. */}
      <div style={{ position: "absolute", left: 356 + slide * 620, top: 560 - rise * 196 + slide * 210,
        zIndex: 64, transform: `rotate(${slide * 34}deg) scale(${1 - slide * 0.2})`,
        transformOrigin: "50% 100%" }}>
        <Unit p={p} x={0} y={0} s={1.62} z={64} f={f} built={1} run={run}
          mode={f >= TEARS - 8 && f < APART ? "dud" : "idle"} at={TEARS - 8} lit={1} />
      </div>
      {/* the dud landing on the plate — one lump, and it ROLLS */}
      {f >= TEARS && f < APART + 10 && (
        <div style={{ position: "absolute", left: 560 + (f - TEARS) * 4.2, top: 666,
          width: 46, height: 36, borderRadius: 9, zIndex: 70, background: dkh(OXIDE, 0.06),
          transform: `rotate(${(f - TEARS) * 14}deg)` }} />
      )}
      {f >= TEARS && <Puff x={584} y={640} f={f} at={TEARS} c={dkh(p.grit, -0.3)} n={9} s={0.9} up={40} />}
      {/* the boss's hands on the glass above, and the crew watching from below */}
      <Alive f={f} ax={150} ay={742} ph={0.5} z={54}>
        {/* ⭐ he watches his own machine fail, and a body says it: on the dud he
            FLINCHES (shock) and his frame gives 38px, then he stays down. */}
        <Hero f={f} x={150} y={742} size={254} z={54} costume={{ constr: 1 }} act={3}
          strain={cl(hit(f, TEARS, 22) * 0.9 + E(f, APART, APART + 8, 0, 0.3, OUT))}
          lift={-E(f, TEARS, TEARS + 9, 0, 38, OUT)}
          gaze={0.6} shock={cl(E(f, TEARS, TEARS + 6, 0, 0.85, IN_Q) - E(f, APART + 6, APART + 20, 0, 0.85, IO))} />
      </Alive>
      {[880].map((bx, i) => (
        <Alive key={"c" + i} f={f} ax={bx} ay={790} ph={2.4} z={54}>
          <Crew f={f} x={bx} y={796} i={5} size={196} z={54} at={-12} loop={3}
            tint={dkh(CLAY, 0.26)} />
        </Alive>
      ))}
      <Jamb p={p} side="l" w={94} z={88} kind="post" o={0.8} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S9 — 19.13 -> 20.47s (40f) · WIDE, SIDE-ON · ESCALATE
   VO: "And they automatically loop and fix errors"
   EVENT: THE LOOP RUNS — three laps inside 40 frames and ACCELERATING. Parts
   down the chute, crew catch and rework, cage climbs, parts up. Each lap the
   unit comes back with one more part on it.
   ⛔ OVERLAPPING ACTION, NEVER STEPPED (§13). The hoist leads, the cage follows
      on one ease, the load swings off the cage's own VELOCITY and rings out.
      A stepped three-lap move is what "way too choppy" sounds like.
   ⛔ NOTHING IN THIS SCENE PAUSES BETWEEN LAPS, and the rate ITSELF rises —
      §26, speed is a first-class parameter and it is the one nobody audits.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shaft");
  /* an ACCELERATING lap clock: integrate a rate rather than repeat a ramp */
  const phase = (0.030 * f + 0.00090 * f * f);
  const lap = Math.floor(phase);
  const t = phase - lap;
  /* the cage: one continuous ease per lap, no dead pause at either end */
  const cage = 0.5 - 0.5 * Math.cos(t * 6.283);
  const vel = 3.14 * Math.sin(t * 6.283) * (0.030 + 0.0018 * f);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.48} glow={hexa(p.key, 0.24)}>
      <Shot k="S9">
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="tray" rake={0.16}
        rakeRate={7.4 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.5}
        lamp={{ x: 486, y: 130, r: 240 }} />
      <Gantry p={p} y={126} z={38} f={f} legs={false} lit={0.5} />
      <Chute p={p} x={568} y={186} w={412} h={286} z={46} f={f} hot={1} />
      {/* ⭐ THE WHOLE LOOP IS LEGIBLE IN ONE FRAME: chute top, bench bottom, cage
          climbing between them. The load LAGS the cage in proportion to its own
          velocity and rings out — smooth object, composite still repainting. */}
      <Hoist p={p} x={356} yTop={196} yBot={708} k={cage} z={42} f={f} w={176}>
        <div style={{ position: "absolute", left: 24, top: 16, zIndex: 2,
          transform: `translateX(${-vel * 260}px) rotate(${-vel * 200}deg)` }}>
          <Slab x={0} y={0} w={128} h={92} z={2} parts={Math.min(4, 1 + lap)} c={CREAMB}
            label={["", "", "", ""][Math.min(3, lap)]} />
        </div>
      </Hoist>
      {/* parts coming DOWN the chute, continuously, never in step with the cage */}
      {Array.from({ length: 7 }, (_, i) => {
        const ph = ((f * 7.4 + i * 21) % 128) / 128;
        return (
          <div key={"dn" + i} style={{ position: "absolute",
            left: 640 + ph * 300, top: 250 + ph * ph * 380,
            width: 84, height: 60, zIndex: 60, borderRadius: 4,
            transform: `rotate(${ph * 220}deg)`,
            background: `linear-gradient(168deg, ${mxh(BRASS, 0.28)} 0%, ${dkh(BRASS, 0.28)} 100%)`,
            border: `4px solid ${dkh(BRASS, 0.46)}` }} />
        );
      })}
      {/* the crew CATCH and throw back — the hero acts, he does not watch */}
      {[186, 862].map((bx, i) => (
        <Alive key={"c" + i} f={f} ax={bx} ay={784} ph={i * 2.1} z={54}>
          <Crew f={f} x={bx} y={790} i={i} size={214} z={54} at={-12} loop={1}
            tint={i ? dkh(CLAY, 0.24) : undefined} />
        </Alive>
      ))}
      {/* the lap counter, as three lamps that LIGHT — not a numeral */}
      {[0, 1, 2].map((i) => (
        <div key={"lp" + i} style={{ position: "absolute", left: 428 + i * 62, top: 158,
          width: 46, height: 46, borderRadius: "50%", zIndex: 90,
          background: lap > i ? mxh(GOLD, 0.24) : dkh(IRON, 0.2),
          border: `5px solid ${dkh(IRON, 0.3)}` }} />
      ))}
      <Jamb p={p} side="l" w={100} z={88} kind="post" o={0.8} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S10 — 20.47 -> 22.40s (58f) · MED -> WIDE · PAYOFF          ⭐ THE PEAK
   VO: "until the boss gives it a perfect score."
   EVENT: the finished unit rides up, the hopper takes, the train turns, and THE
   SPOUT DELIVERS — a real continuous stream landing in a bin that FILLS. The
   glass score climbs 61 -> 74 -> 88 -> 100 in four discrete pops on the word
   onsets; on 100 the glass goes JADE and the boss puts a hand on it.
   ⛔⛔ HE DOES NOT COME DOWN. He is SATISFIED, not beaten, and no frame of this
      reel has him on the floor. The villain is not defeated; his standard is
      what made the thing work.
   ⛔ THE REWARD IS CONTAINED, NEVER A SCREEN FLASH (§16, §29).
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  const BOSS = 12, GIVES = 15, PERF = 30, SCORE = 36;
  const POPS = [BOSS, GIVES + 6, PERF, SCORE];
  const idx = POPS.reduce((a, c, i) => (f >= c ? i : a), -1);
  const score = idx >= 0 ? R.scores[idx] : null;
  const perfect = f >= SCORE;
  const rise = E(f, 0, 14, 0.2, 1, IN_Q);
  const fill = E(f, GIVES, dur + 10, 0, 1, LIN);           /* crosses the cut */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.075]} vig={0.42} glow={hexa(perfect ? JADE : p.key, 0.28)}>
      <Shot k="S10">
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry" rake={0.15}
        rakeRate={6.6 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.6}
        lamp={{ x: 486, y: 140, r: 300 }} />
      <Gantry p={p} y={196} z={38} f={f} legs={false} lit={0.7} />
      <GlassBox p={p} x={276} y={54} w={460} h={148} z={52} f={f} on={1}
        score={score} tint={perfect ? mxh(JADE, 0.5) : GLASSW} refl={1} readout>
        <div style={{ position: "absolute", left: 66, top: 140, zIndex: 2 }}>
          <Hero f={f} x={0} y={0} size={120} z={2} costume={{ suit: 1 }} act={3}
            stern={perfect ? 0 : 1} cheer={perfect ? 0.5 : 0} gaze={-0.3} ph={1.1} />
        </div>
      </GlassBox>
      <Flood x={486} y={200} k={0.94} z={22} c={perfect ? mxh(JADE, 0.6) : GLASSW}
        len={420} top={300} bot={860} f={f} />

      {/* ⭐ THE UNIT RUNS, AND THE SPOUT DELIVERS */}
      <div style={{ position: "absolute", left: 250, top: 604 - rise * 158, zIndex: 64 }}>
        <Unit p={p} x={0} y={0} s={1.08} z={64} f={f} built={1} run={1}
          mode={f >= GIVES ? "deliver" : "idle"} at={GIVES} lit={1} />
      </div>
      {/* ⭐⭐⭐ THE DELIVERY IS THE PAYOFF AND IT WAS TOO SMALL TO BE ONE. S10
          measured 7.39 — BELOW the reel median, on the scene the whole thing
          exists for. §12's calculator says why: nine 20px pellets are 5px after
          the audit's 1012->240 downsample, and a bin filling changes only its
          leading edge (+0.11 on the measured table). The fix is MORE OF THE
          MECHANISM (§24), never a foreign element: the stream is what a working
          machine produces, so it becomes 16 pieces at 62-96px on fast arcs, and
          the bin OVERFLOWS onto the floor. */}
      {f >= GIVES && Array.from({ length: 16 }, (_, i) => {
        const lf = (f - GIVES) * 3.4 + i * 9;
        const ph = (lf % 96) / 96;
        const sz = 62 + rnd(i, 11) * 34;
        return (
          <div key={"dv" + i} style={{ position: "absolute",
            left: 470 + ph * 250 + (rnd(i, 12) - 0.5) * 40,
            top: 470 + ph * 150 + ph * ph * 190,
            width: sz, height: sz * 0.76, zIndex: 68, borderRadius: 6,
            transform: `rotate(${ph * 240 * (i % 2 ? 1 : -1)}deg)`,
            opacity: 0.98 - Math.max(0, (ph - 0.86) / 0.14),
            background: `linear-gradient(168deg, ${mxh(i % 3 ? JADE : GOLD, 0.24)} 0%, ${dkh(i % 3 ? JADE : GOLD, 0.14)} 100%)`,
            border: `4px solid ${dkh(i % 3 ? JADE : GOLD, 0.4)}` }} />
        );
      })}
      {/* what OVERFLOWS the bin — the destination is exceeded, not just reached */}
      {fill > 0.72 && Array.from({ length: 7 }, (_, i) => {
        const lf = f - (GIVES + 26 + i * 4);
        if (lf < 0) return null;
        return (
          <div key={"of" + i} style={{ position: "absolute",
            left: 660 + i * 34 + Math.sin(i * 2.1) * 22, top: 720 + Math.min(46, lf * 3.4),
            width: 72, height: 54, zIndex: 70, borderRadius: 6,
            transform: `rotate(${(rnd(i, 13) - 0.5) * 40}deg)`,
            background: `linear-gradient(168deg, ${mxh(JADE, 0.2)} 0%, ${dkh(JADE, 0.16)} 100%)`,
            border: `4px solid ${dkh(JADE, 0.42)}` }} />
        );
      })}
      {/* the bin that FILLS — a destination, not an oscillation (§MOTION) */}
      <div style={{ position: "absolute", left: 636, top: 596, width: 214, height: 168, zIndex: 62,
        background: `linear-gradient(180deg, ${dkh(SLATE, 0.04)} 0%, ${dkh(SLATE, 0.4)} 100%)`,
        border: `6px solid ${mxh(SLATE, 0.14)}`, borderRadius: 5, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: `${fill * 100}%`,
          background: `linear-gradient(180deg, ${mxh(JADE, 0.22)} 0%, ${dkh(JADE, 0.1)} 100%)` }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: `${fill * 100}%`, height: 8,
          background: mxh(GOLD, 0.4) }} />
      </div>
      {/* the four score pops — each a squash, a ring and one ascending chime */}
      {POPS.map((at, i) => f >= at && (
        <Ring key={"sr" + i} x={506} y={130} f={f} at={at} c={mxh(i === 3 ? JADE : GOLD, 0.3)}
          s={0.7 + i * 0.1} dur={15} />
      ))}
      {/* ⛔ the reward bloom is CONTAINED — 6.4% of frame width, never a flash */}
      {perfect && (
        <div style={{ position: "absolute", left: 506 - 32, top: 98, width: 64, height: 64,
          borderRadius: "50%", zIndex: 94, opacity: 0.7 * (1 - Math.min(1, (f - SCORE) / 16)),
          background: `radial-gradient(circle, ${hexa(JADE, 0.9)} 0%, ${hexa(JADE, 0)} 70%)` }} />
      )}
      {perfect && Array.from({ length: 8 }, (_, i) => {
        const lf = f - SCORE, a = (i / 8) * 6.283;
        return <div key={"sp" + i} style={{ position: "absolute",
          left: 506 + Math.cos(a) * lf * 8.4, top: 128 + Math.sin(a) * lf * 6.2 + lf * lf * 0.5,
          width: 15, height: 15, borderRadius: 8, zIndex: 94, background: mxh(GOLD, 0.3),
          opacity: Math.max(0, 1 - lf / 22) }} />;
      })}
      {/* the hero stands under the spout and takes the delivery in his hands */}
      <Alive f={f} ax={866} ay={782} ph={0.3} z={54}>
        {/* ⭐⭐ THE PAYOFF NEEDS A BODY IN IT. He stands under the spout with his
            hands up and the delivery LOADS him — strain climbs with the fill, so
            he is visibly carrying it — and on 100 he releases and OVERSHOOTS
            past his own standing height. §12: the overshoot is the whole reason
            a lift reads as a lift. */}
        <Hero f={f} x={792} y={790} size={220} z={54} costume={{ constr: 1 }} act={2}
          strain={cl(perfect ? 0 : fill * 0.78)}
          lift={perfect ? E(f, SCORE, SCORE + 7, 0, 78, BACK) : -fill * 22}
          cheer={perfect ? 1 : 0} gaze={-0.2} />
      </Alive>
      <Contact x={866} y={790} w={178} z={30} o={0.34} />
      {/* ⭐ THE CAST IS IN THE PAYOFF. Two more come up on the score pops and
          cheer at the apex — a reward beat with nobody in it is a firework. */}
      {[112, 320].map((bx, i) => (
        <Alive key={"pc" + i} f={f} ax={bx} ay={784} ph={i * 2.3} z={54}>
          <Crew f={f} x={bx} y={792} i={i + 2} size={202} z={54} at={POPS[i + 1]}
            loop={2} cheer={perfect ? 1 : 0.3} tint={i ? dkh(CLAY, 0.22) : undefined} />
        </Alive>
      ))}
      <Overrun p={p} f={f} y={196} z={86} rate={7.0} n={9} lit={0.9} />
      <Jamb p={p} side="l" w={82} z={88} kind="post" o={0.72} />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S11 — 22.40 -> 23.73s (40f) · TIGHT · COST
   VO: "This burns through tokens fast,"
   EVENT: the drum's sight glass EMPTIES and the needle FALLS, fast, and is
   still falling when the scene cuts.
   ⛔⛔ NO CURRENCY AND NO FIGURE. The VO names none, and a number here reads as
      the price of the build we just watched. It is a DRAIN.
   ⛔ THE NEEDLE CROSSES THE CUT ON `LIN` (§23).
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("drum");
  const level = E(f, 3, dur + 14, 0.92, 0.06, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.58} glow={hexa(p.key, 0.26)}>
      <Shot k="S11">
      <Room p={p} f={f} dx={PAR_X[v]} bands={1} kind="plant" overhead="joist" rake={0.13}
        rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.6}
        lamp={{ x: 506, y: 640, r: 220 }} />
      {/* the furnace mouth, throwing ember light UP — hard shadows upward */}
      <div style={{ position: "absolute", left: 372, top: 664, width: 268, height: 128, zIndex: 24,
        borderRadius: "70px 70px 0 0",
        background: `radial-gradient(ellipse at 50% 100%, ${hexa(p.key, 0.9)} 0%, ${hexa(p.key, 0.2)} 56%, ${hexa(p.key, 0)} 100%)` }} />
      {/* ⛔⛔ HOLD 86%, THE WORST IN THE REEL. The drum drains and the needle
          falls, and both are SMALL: a 38px sight glass is 9px after the audit's
          1012->240 downsample. §12's calculator says a big object moving slowly
          repaints only its edge — so the drum goes up to 1.52 and what actually
          moves is the SPILL, which is large, bright against an ember set, and
          still running when the scene cuts. */}
      <TokenDrum p={p} x={286} y={176} s={1.52} z={54} f={f} level={level} />
      {/* the spill: what leaves the drum has to be as big as what is in it */}
      {Array.from({ length: 14 }, (_, i) => {
        const ph = ((f * 9 + i * 17) % 120) / 120;
        return (
          <div key={"sp" + i} style={{ position: "absolute",
            left: 402 + (rnd(i, 7) - 0.5) * 190 + ph * (rnd(i, 8) - 0.5) * 120,
            top: 620 + ph * 220, width: 48 + rnd(i, 9) * 30, height: 40 + rnd(i, 10) * 26,
            zIndex: 66, borderRadius: 7, opacity: 0.95 - ph * 0.55,
            transform: `rotate(${ph * 200 * (i % 2 ? 1 : -1)}deg)`,
            background: `linear-gradient(168deg, ${mxh(GOLD, 0.2)} 0%, ${dkh(EMBER, 0.1)} 100%)` }} />
        );
      })}
      {/* a second drum behind, already empty — the cost is not a one-off */}
      <div style={{ position: "absolute", left: 44, top: 300, opacity: 0.6 }}>
        <TokenDrum p={p} x={0} y={0} s={0.7} z={40} f={f + 40} level={0.04} />
      </div>
      {/* ⛔ S11 HAD NO CAST AT ALL and it was the least interesting frame in the
          reel — an object in a room. THE-OPEN law 2 is not only about frame 0:
          characters stop scrolls and empty rooms do not. One body, small at
          158px against a 1.52-scale drum, back to us, watching the needle fall
          — the size difference IS the point of the scene. */}
      <Alive f={f} ax={806} ay={700} ph={1.4} z={58}>
        <Hero f={f} x={806} y={700} size={178} z={58} costume={{ constr: 1 }} act={3}
          gaze={-0.6} stern={0.7} tint={dkh(CLAY, 0.2)} />
      </Alive>
      <Contact x={806} y={708} w={142} z={30} o={0.3} />
      <Motes x={506} y={300} w={520} h={420} n={18} f={f} z={80} c={mxh(p.key, 0.4)} />
      <Jamb p={p} side="r" w={128} z={88} kind="post" />
      <Jamb p={p} side="l" w={108} z={88} kind="stud" />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S12 — 23.73 -> 25.30s (47f) · CLOSE · ADVICE
   VO: "so you should only build your basic prototype first,"
   EVENT: THE MAKER builds one small rough unit by hand, alone, in four honest
   hits, and sets it on the bench.
   ⭐ THE HOIST BEHIND HIM IS DARK AND STILL, AND THAT IS THE WHOLE BEAT. It has
     to be legible that the expensive machine is switched OFF.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const HITS = [9, 18, 26, 36];
  const built = HITS.reduce((a, at) => a + (f >= at ? 0.25 : 0), 0);
  const hitAt = HITS.reduce((a, at) => (f >= at && f < at + 5 ? at : a), -99);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.60} glow={hexa(p.key, 0.2)}>
      <Shot k="S12">
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="duct" rake={0.09}
        rakeRate={3.4 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.5}
        lamp={{ x: 366, y: 200, r: 200 }} />
      {/* ⛔ A TROUGH IS NOT A DEAD SCENE. S12 is meant to be the quiet one and it
          measured 4.92 — under the bar — because the room behind him was blank.
          The racking is UNLIT here (lit=0.2), which is the same wall as S1 and
          S5 with the light taken off it: a returning set is a callback only if
          the light changed. */}
      <RackWall p={p} f={f} y={230} z={8} bays={4} x0={-30} pitch={252} lit={0.2} dx={PAR_X[v] * 0.4} />
      {/* ⭐ THE HOIST IS OFF: no light on the rails, the cage parked, no rope run */}
      <div style={{ opacity: 0.5 }}>
        <Hoist p={p} x={694} yTop={200} yBot={700} k={0} z={36} f={0} w={150} />
      </div>
      <div style={{ position: "absolute", left: 686, top: 172, width: 166, height: 34, zIndex: 40,
        background: dkh(IRON, 0.3), borderRadius: 3, display: "flex", alignItems: "center",
        justifyContent: "center", ...mono(17, 800), color: dkh(p.key, 0.66), letterSpacing: 3 }}>
        OFF
      </div>
      <BenchBay p={p} x={168} y={594} w={410} z={34} f={f} lit={1} vice />
      {/* the small rough unit, built four honest hits at a time */}
      <div style={{ position: "absolute", left: 236, top: 388, zIndex: 62,
        transform: `scale(${squash(f, hitAt, 0.12, 3, 9)})`, transformOrigin: "50% 100%" }}>
        <Unit p={p} x={0} y={0} s={0.62} z={62} f={f} built={built} run={0} lit={1} at={0} />
      </div>
      {HITS.map((at, i) => f >= at && (
        <React.Fragment key={"h" + i}>
          <Ring x={332} y={470} f={f} at={at} c={mxh(GOLD, 0.3)} s={0.8} dur={14} />
          <Puff x={332} y={476} f={f} at={at} c={p.grit} n={9} s={0.9} up={44} />
          {/* ⭐ EACH HIT THROWS SOMETHING. §10: a scene that draws the first half
              of a mechanism and stops is what "plain" means — a hammer with no
              swarf is a gesture, and swarf is large, bright and fast. */}
          {Array.from({ length: 6 }, (_, k) => {
            const lf = f - at;
            if (lf < 0 || lf > 26) return null;
            const a = (k / 6) * 3.14 - 1.57;
            return <div key={"sw" + k} style={{ position: "absolute",
              left: 332 + Math.cos(a) * lf * 9.4, top: 462 + Math.sin(a) * lf * 5 + lf * lf * 1.1,
              width: 26, height: 12, zIndex: 72, borderRadius: 5,
              transform: `rotate(${lf * 22}deg)`, opacity: 1 - lf / 26,
              background: mxh(GOLD, 0.24) }} />;
          })}
        </React.Fragment>
      ))}
      {/* he is SWINGING, not standing — act=1 with a real reach */}
      <Alive f={f} ax={628} ay={736} ph={0.6} z={56}>
        {/* ⭐ FOUR HONEST HITS. The arm swings (drive) and every landing drives
            the whole body down into it (strain) — a hammer whose owner does not
            compress is a man waving a stick. */}
        <Hero f={f} x={628} y={736} size={306} z={56} costume={{ constr: 1 }} act={1}
          reach={116} drive={hitAt > -50 ? 0.9 : 0.35}
          strain={cl(HITS.reduce((a, at) => a + hit(f, at, 11), 0))}
          lift={-30 * cl(HITS.reduce((a, at) => a + hit(f, at, 11), 0))} gaze={-0.5} />
      </Alive>
      <Contact x={628} y={748} w={244} z={30} o={0.34} />
      {/* ⛔ 0.83 — the fourth hit lands at f36 of 47 and nothing follows it. He
          PICKS THE UNIT UP and starts carrying it, accelerating, still moving at
          the cut — which is also the beat S13 needs him holding. */}
      {f >= 34 && (
        <div style={{ position: "absolute", left: 236 + E(f, 34, dur, 0, 300, LIN),
          top: 388 - E(f, 34, dur, 0, 150, LIN), zIndex: 74,
          transform: `rotate(${E(f, 34, dur, 0, -22, LIN)}deg)` }}>
          <Unit p={p} x={0} y={0} s={0.62} z={74} f={f} built={1} run={0} lit={1} at={0} />
        </div>
      )}
      <Jamb p={p} side="l" w={116} z={88} kind="door" />
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S13 — 25.30 -> 27.47s (65f) · WIDE · CLIMAX OF SCALE
   VO: "then trigger the boss loop to polish the final product."
   EVENT: THE MAKER throws the knife switch on "trigger"; the hoist starts, the
   glass lights, the crew come up, the loop runs at full rate — and the rough
   unit from S12 goes up crude and comes back FINISHED.
   ⛔ EVERYTHING ON SCREEN MOVES. §27: a viewer reads the whole frame, and the
      audit cannot see a floor that is 90% static because the mean is carried by
      whatever moves. Measure the FLOOR.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  const TRIG = 6, LOOP = 20, POLISH = 34, PROD = 49;
  const on = E(f, TRIG, TRIG + 4, 0, 1, IN_Q);
  /* the loop accelerates from the throw and is at full rate when it cuts */
  const phase = on * (0.026 * (f - TRIG) + 0.0011 * (f - TRIG) * (f - TRIG));
  const cage = 0.5 - 0.5 * Math.cos((phase % 1) * 6.283);
  const finish = E(f, POLISH, PROD, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.40} glow={hexa(p.key, 0.3)}>
      <Shot k="S13">
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry" rake={0.16}
        rakeRate={7.8 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.8}
        lamp={{ x: 506, y: 130, r: 330 }} />
      <Gantry p={p} y={206} z={38} f={f} legs lit={0.3 + on * 0.6} />
      <GlassBox p={p} x={306} y={78} w={400} h={126} z={52} f={f} on={on}
        score={on > 0.5 ? R.scores[3] : null} tint={mxh(JADE, 0.5)} refl={on} readout>
        <div style={{ position: "absolute", left: 44, top: 120, zIndex: 2 }}>
          <Hero f={f} x={0} y={0} size={104} z={2} costume={{ suit: 1 }} act={3}
            stern={1} gaze={-0.3} ph={0.4} />
        </div>
      </GlassBox>
      <Flood x={506} y={210} k={on * 0.9} z={22} c={mxh(JADE, 0.6)} len={420} top={300} bot={880} f={f} />
      <Hoist p={p} x={406} yTop={218} yBot={676} k={on * cage} z={42} f={f} w={168}>
        <div style={{ position: "absolute", left: 20, top: 14, zIndex: 2 }}>
          <Unit p={p} x={0} y={0} s={0.4} z={2} f={f} built={0.34 + finish * 0.66}
            run={finish} mode={finish > 0.8 ? "deliver" : "idle"} at={POLISH} lit={1} />
        </div>
      </Hoist>
      <Chute p={p} x={606} y={228} w={380} h={266} z={46} f={f} hot={on} />
      {/* the knife switch he actually throws */}
      <KnifeSwitch p={p} x={54} y={452} s={1.0} z={58} on={on} f={f} />
      <Alive f={f} ax={252} ay={768} ph={0.4} z={56}>
        {/* ⭐ HE HAULS IT. Not a hand on a lever: he leans into it, his body
            drops 46px through the pull, strains at the bottom, and comes back up
            past his own height when it goes over. */}
        <Hero f={f} x={176} y={776} size={228} z={56} costume={{ constr: 1 }} act={1}
          reach={122} drive={E(f, TRIG - 4, TRIG, 0, 1, IN_Q) - E(f, TRIG + 6, TRIG + 16, 0, 1, IO)}
          strain={cl(E(f, TRIG - 6, TRIG + 2, 0, 1, IN_Q) - E(f, TRIG + 4, TRIG + 14, 0, 1, OUT))}
          lift={-E(f, TRIG - 6, TRIG + 2, 0, 46, IN_Q) + E(f, TRIG + 3, TRIG + 12, 0, 62, BACK)}
          cheer={finish * 0.8} gaze={0.3} />
      </Alive>
      {/* the crew come up with it — everything on screen moves */}
      {[440, 640, 852].map((bx, i) => (
        <Alive key={"c" + i} f={f} ax={bx} ay={784} ph={i * 1.7} z={50}>
          <Crew f={f} x={bx} y={790} i={i + 1} size={186} z={50} at={TRIG + i * 4}
            loop={i % 4} tint={i > 1 ? dkh(CLAY, 0.24) : undefined} />
        </Alive>
      ))}
      {/* the belt, at full rate, under all of it */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((i * 80 + f * (2 + on * 9)) % (W + 200)) - 100;
        return <Slab key={"bl" + i} x={x} y={764} w={72} h={44} z={26} parts={2}
          c={i % 3 === 0 ? CREAMB : OXIDE} rot={(rnd(i, 9) - 0.5) * 5} />;
      })}
          </Shot>
    </Scene>
  );
};

/* =========================================================================
   S14 — 27.47 -> 28.80s (40f) · MED · CTA
   VO: "Comment BOSS for the free guide."
   ⛔ HARD CUT ON THE KEYWORD: shot A from f0, shot B punches in on "BOSS" at
      local f4. The keyword lands centred, on its own measured onset.
   ⛔ THE BACKGROUND PROCESS NEVER STOPS — the unit is still delivering behind
      them. A CTA where everything has stopped is a title card.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("over");
  const KW = 4;
  const punch = f >= KW ? 1.16 : 1;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.38} glow={hexa(p.key, 0.28)}>
      <Shot k="S14">
      <Cam s={punch} z={20}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry" rake={0.14}
          rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]} floorKind="slab" grit={0.7}
          lamp={{ x: 506, y: 140, r: 300 }} />
        <RackWall p={p} f={f} y={214} z={8} bays={5} x0={-50} pitch={238} lit={1} dx={PAR_X[v] * 0.4} />
        <Overrun p={p} f={f} y={110} z={86} rate={6.4} n={9} lit={1} />
        <Gantry p={p} y={182} z={36} f={f} legs={false} lit={0.7} />
        {/* the finished unit, still delivering */}
        <div style={{ position: "absolute", left: 636, top: 372, zIndex: 60 }}>
          <Unit p={p} x={0} y={0} s={0.94} z={60} f={f} built={1} run={1} mode="deliver"
            at={-20} lit={1} />
        </div>
        {/* the crew, facing OUT for the first time in the reel */}
        {[128, 320, 512].map((bx, i) => (
          <Alive key={"c" + i} f={f} ax={bx} ay={772} ph={i * 1.7} z={54}>
            <Crew f={f} x={bx} y={778} i={i} size={214} z={54} at={-12} loop={2}
              cheer={0.7} tint={i > 1 ? dkh(CLAY, 0.2) : undefined} />
          </Alive>
        ))}
        {[128, 320, 512].map((bx, i) => <Contact key={"ct" + i} x={bx} y={784} w={170} z={30} o={0.34} />)}
      </Cam>
      {/* the keyword, on its own onset, centred, in the reserved band */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 138, zIndex: 94,
        display: "flex", justifyContent: "center",
        transform: `scale(${squash(f, KW, 0.2, 3, 11)})` }}>
        <div style={{ padding: "14px 34px", borderRadius: 10, background: mxh(CREAMB, 0.04),
          border: `5px solid ${dkh(BRASS, 0.24)}`, boxShadow: SH,
          ...mono(56, 800), color: INK, letterSpacing: 6 }}>{R.keyword}</div>
      </div>
      {f >= KW && <Ring x={506} y={176} f={f} at={KW} c={mxh(GOLD, 0.3)} s={1.1} dur={18} />}
          </Shot>
    </Scene>
  );
};
