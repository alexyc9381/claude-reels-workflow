import React from "react";
import { useCurrentFrame } from "remotion";
import {
  Fitout, Bustle,
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, BigNum, Contact, Mark, MarkPlate, MarkCast, Edge,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Beam, Strip,
  GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, MAG, INDIGO, OXBLOOD,
} from "./JudgeWorld";
import {
  Brief, Polygraph, WitnessBox, AccuracyDial, MinuteTimer, RollerDoor,
  AppShell, PageSlab, BenchTool, SealPress, LoopRail, PromptRack, Alcove,
  EvidenceBoard, Gavel, ProvingRam, FuelColumn, BigLever, StepPlate, Folder, Wig,
  Gallery, ExhibitWall,
} from "./JudgeProps";
import { Room, Jamb, Stack, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE SCENES.  Board: storyboards/132-judge.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him":
     S0  swears the work is DONE and the needle tears the paper saying it isn't
     S1  hauls a lever down with his whole body and drives the accuracy needle
     S2  drops one token and the minute is over before you can doubt it
     S3  posts ONE card and then takes delivery of three different finished goods
     S4  holds the plate up under the press and the house mark goes into it
     S5  pushes the chamber doors open and the loop starts turning above him
     S6  shuttles one sheet back and forth and gets nowhere (the old way)
     S7  drops a task crate and a team of eleven comes through the doors
     S8  drives a hot bar into the THIRD rung against a rack that bows
     S9  assigns three roles and each one is equipped as it lands
     S10 (the prosecutor) drives fourteen flags into the work, accelerating
     S11 (the defense) hurls counters back, and the judge's gavel stops the room
     S12 rides the brief round the loop three times and it takes a ram and holds
     S13 shutters the furnace throat and sets a rough prototype down beside it
     S14 throws a full-height lever and the loop locks in front of the doors
     S15 holds the door while the keyword is stamped into the step

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
   WHILE the scene happens. Every scene still owes its own four-part event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210), and
   nothing lands on the sprite's FACE (reel 124: the face is the surface the
   beat is read off).

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly THREE re-framings — S2, S10
   and S12 — and all three are CUTS, not drifts.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10.
    ⛔ The SAFE box in `JudgeWorld.SAFE3` is derived from exactly these numbers. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -8, dy: 12, s: 1.010, rot: -0.5 },
  amber: { dx: -52, dy: -32, s: 1.046, rot: 2.4 },
  steel: { dx: 50, dy: 30, s: 1.050, rot: -2.2 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` is BANNED from
    GRADE — it moves the clay, and a trial cut may never recolour the Claude.
    Saturation is held CONSTANT across the three and lifted globally, because
    BODY_SAT is a look gate and not a variant axis: only CONTRAST and BRIGHTNESS
    differ between cuts. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.30) brightness(1.000)",
  amber: "contrast(1.140) saturate(1.30) brightness(0.960)",
  steel: "contrast(1.080) saturate(1.30) brightness(1.050)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -44, steel: 42 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH, so varying the OFFSET can be
    silently inert. `n` changes the pitch itself, which is the only offset that
    cannot collapse. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 92, steel: 168 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.78, steel: 0.48 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
const PJ: Record<Variant, number> = { house: 0, amber: 1, steel: 2 };
/** ⭐ PER-CUT LAYOUT on the flattest scenes — one large object on a plain field
    is the hardest frame to differentiate and a grade has nothing to bite on. */
const LAY: Record<Variant, { a: number; b: number; c: number }> = {
  house: { a: 0, b: 0, c: 0 },
  amber: { a: 84, b: -70, c: -54 },
  steel: { a: -92, b: 78, c: 70 },
};
/** ⛔ THREE CUTS = THREE HOOKS, and the body must not be the only thing that
    differs. `seqOrder` permutes which sub-event fires first while the BEAT
    FRAMES stay put, so the per-reel SFX bank still lands on the picture. */
const seqOrder = (v: Variant, n: number) =>
  Array.from({ length: n }, (_, i) => (i + PJ[v] * 2) % n);

/* ⭐⭐⭐ THE DENSITY PASS (Alex: *"the animations quality is just not anywhere
   near as good nor interesting here"*).

   Measured off OX / UNLAZY / BOSS body frames rather than remembered: BOSS
   carries 8-12 Claudes in a band across the bottom of EVERY body frame plus a
   wall of real UI behind; OX fills a floor with hundreds of coins and a 60-tile
   grid; UNLAZY runs six terminals with real code and five red X marks. This
   reel shipped body scenes with ONE object on an empty floor and 0-2 sprites.

   It is a DENSITY gap, not a polish gap, and it has two shapes — both of which
   a court supplies for free: a public GALLERY and WALLS OF CASE FILES. Every
   scene below now carries at least one, sized and placed for that room rather
   than pasted in, and the gallery REACTS on the scene's own beat so it is cast
   rather than wallpaper. */

/** ⭐⭐⭐ THE FRONT BAND. Read off BOSS's own frames: its crowd is not in the
    corners, it is a rank across the FULL WIDTH at 150-200px, near camera, and
    CROPPED BY THE BOTTOM EDGE — which is also the depth cue the reel-94 audit
    called out (a mass cropped by the panel edge, in front of the action).
    ⛔ It covers the hero's legs and that is correct; BOSS's boss loses his too. */
const FrontBand: React.FC<{ f: number; n?: number; size?: number; seed?: number;
  react?: number; at?: number; z?: number; x0?: number; x1?: number }> =
  ({ f, n = 5, size = 150, seed = 0, react = 0, at = -22, z = 70, x0 = -90, x1 = 1102 }) => (
  /* ⛔ THE BAND IS A TEXTURE, NOT A CAST. At n=7, 168px and full contrast it was
     seven readable faces standing in front of the subject. BOSS runs its crowd
     as a soft low-contrast mass you never read an individual in — that is what
     makes it a depth cue instead of competition. */
  <div style={{ position: "absolute", inset: 0, zIndex: z, opacity: 0.62,
    filter: "blur(1.5px)" }}>
    <Gallery f={f} x0={x0} x1={x1} y={GY + 96} n={n} ranks={1} size={size} z={z}
      at={at} react={react} seed={seed} />
  </div>
);

/** the one text chip a shot is allowed, in the reserved band */
const BandChip: React.FC<{ t: string; c?: string; fg?: string }> =
  ({ t, c = INK, fg = "#F6F2E8" }) => <Chip t={t} y={BAND_Y} c={c} fg={fg} s={0.94} z={94} />;

/* =========================================================================
   S1 · THE INSTRUMENT BENCH — 2.68 to 5.32s (80f) · TURN
   VO: "but the crazy part, it makes your output 73% more accurate"

   ⭐ THE MECHANISM, AND IT FAILS FIRST. A float is not a lift: the needle is not
   authored to move, it is the OUTPUT of a lever the hero drags down against
   resistance. He compresses, spreads and trembles; the gauge's own linkage bows
   before the needle starts; steam comes out of his head (the emitter on the
   stillest part of a pressing sprite).
   ⛔ THE NEEDLE RIDES `LIN`, NEVER `IO`. A cubic is 0.61 a third of the way in
   and a readout wired to one lies to the frame.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dial");
  /* ⛔⛔ v1 WAS ONE SMOOTH 40-FRAME EASE AND A LINEAR COUNTER. The needle glided
     0 -> 73 while the lever slid and the hero held it, and `k` was authored
     INDEPENDENTLY of the pull — so nothing on screen was driving the number.
     That is `ANIMATION-QUALITY` §12 exactly: *a FLOAT is not a LIFT — when
     movement is authored directly instead of as the OUTPUT of something, more
     frames and more distance will not fix it. Draw the MECHANISM and let it
     FAIL first.*
     ⭐ Now it is FOUR HEAVES with a STALL in the middle: he yanks, the needle
     jumps and sags back, he yanks again, and on the third the thing STICKS —
     0.05 of movement for a full heave — before the fourth breaks it and drives
     it home. The counter is `pull` itself, so the number cannot move unless he
     moves it. */
  const HEAVE = [9, 23, 41, 58];
  const GAIN = [0.34, 0.30, 0.05, 0.62];
  const SAG  = [0.09, 0.08, 0.02, 0.05];
  const grip = E(f, 2, 8, 0, 1, OUT);
  const pull = Math.max(0, Math.min(1, HEAVE.reduce((a, at, i) =>
    a + E(f, at, at + 6, 0, GAIN[i], IN_Q) - E(f, at + 6, at + 13, 0, SAG[i], OUT), 0)));
  const stall = f >= 40 && f < 54 ? E(f, 40, 47, 0, 1, OUT) - E(f, 50, 56, 0, 1, OUT) : 0;
  const bow = HEAVE.reduce((a, at) =>
    a + E(f, at, at + 4, 0, 1, IN_Q) - E(f, at + 4, at + 12, 0, 1, OUT), 0);
  const k = pull;                                   /* the COUNT *is* the pull */
  const land = E(f, 62, 69, 0, 1, BACK);
  const strain = Math.max(0, Math.min(1, grip * 0.35 + pull * 0.5 + stall * 0.45
    + HEAVE.reduce((a, at) => a + E(f, at, at + 4, 0, 0.35, IN_Q)
      - E(f, at + 4, at + 12, 0, 0.35, OUT), 0))) * (1 - E(f, 64, 72, 0, 0.9, OUT));
  const dx = LAY[v].a;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.50} glow={hexa(p.key, 0.16)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
          rake={0.11} rakeX={RAKE_X[v]} rakeRate={3.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.8} lamp={{ x: 350 + dx, y: 128, r: 220 }} window={null} />
        <Fitout p={p} f={f} seed={0} />
        <Bustle f={f} seed={0} n={1} z={34} />
        {/* the background process: a pipe run overhead, always moving */}
        <Runner y={112} f={f} z={17} rate={7.8} pitch={182} w={161} h={82}
          c="#4A6A5E" c2="#0A1614" kind="cell" rail hang={0} o={0.9} />

        {/* ⛔⛔ v2 GOT THE IDEA RIGHT AND THE SCALE WRONG. Two stacks at 40px a
            course, sitting low enough that the gallery band cut their feet off,
            and everything finished by f60 of an 80-frame scene — small, and then
            a dead tail. ⭐ NOW IT IS A RACE, at OX's scale: 300px courses, both
            stacks building at once, and the left one COLLAPSES under its own
            flags at f44 while the right keeps going. The comparison is an EVENT,
            not a diagram. */}

        {/* LEFT — WITHOUT. It builds too, and then it goes over. */}
        {Array.from({ length: 5 }, (_, i) => {
          const at = 4 + i * 7;
          if (f < at) return null;
          const rise = E(f, at, at + 5, 0, 1, BACK);
          const fall = f < 44 ? 0 : Math.min(1, (f - 44 - i * 1.5) / 13);
          const g = fall * fall;
          return (
            <div key={"lw" + i} style={{ position: "absolute",
              left: 96 + dx - (60 + i * 46) * g,
              top: 604 - i * 56 + (1 - rise) * 150 + (560 - (604 - i * 56)) * g,
              width: 296, height: 52, zIndex: 30 + i, borderRadius: 4, opacity: rise,
              boxShadow: SH, transform: `rotate(${-2 - i * 2 - g * (34 + i * 16)}deg)`,
              background: `linear-gradient(170deg,#78847C,#404C46)` }}>
              {[0, 1].map(k2 => (
                <div key={k2} style={{ position: "absolute", left: 40 + k2 * 118, top: -34,
                  width: 13, height: 40, background: RED, transformOrigin: "50% 100%",
                  transform: `rotate(${-16 + k2 * 26 + g * 60}deg)` }}>
                  <div style={{ position: "absolute", left: 9, top: 0, width: 40, height: 26,
                    background: RED, boxShadow: SH }} />
                </div>
              ))}
            </div>
          );
        })}
        {f >= 44 ? (<>
          <Puff x={214 + dx} y={640} f={f} at={45} c="#8A9A92" z={44} n={10} />
          <Fall x={214 + dx} y={630} w={420} f={f} at={45} n={12} z={43} c="#6E7A72" rate={1.8} />
        </>) : null}
        <Contact x={244 + dx} y={GY - 60} w={330} z={29} o={0.34} />
        <div style={{ position: "absolute", left: 96 + dx, top: 646, width: 296, textAlign: "center",
          ...mono(30, 800), letterSpacing: 3, zIndex: 46, color: hexa("#A8BCB2", 0.9) }}>WITHOUT</div>

        {/* RIGHT — WITH. Eight courses, each one SLAMMED, right through to f76. */}
        {Array.from({ length: 8 }, (_, i) => {
          const at = 5 + i * 9;
          if (f < at) return null;
          const rise = E(f, at, at + 5, 0, 1, BACK);
          const hit = f >= at + 4 && f < at + 9;
          return (
            <React.Fragment key={"rw" + i}>
              <div style={{ position: "absolute", left: 470 + dx,
                top: 604 - i * 56 + (1 - rise) * 210, width: 306,
                height: 52 * (hit ? 0.9 : 1), zIndex: 30 + i, borderRadius: 4, opacity: rise,
                boxShadow: SH, transformOrigin: "50% 100%",
                transform: `rotate(${(1 - rise) * -14}deg)`,
                background: `linear-gradient(170deg,${mxh(GOLD, 0.36)},${dkh(GOLD, 0.26)})` }}>
                <div style={{ position: "absolute", left: 16, top: 13, width: 26, height: 26,
                  borderRadius: "50%", background: GREEN }}>
                  <div style={{ position: "absolute", left: 5, top: 12, width: 9, height: 4,
                    background: "#04241C", transform: "rotate(44deg)" }} />
                  <div style={{ position: "absolute", left: 10, top: 7, width: 14, height: 4,
                    background: "#04241C", transform: "rotate(-44deg)" }} />
                </div>
              </div>
              {hit ? (<>
                <Puff x={623 + dx} y={606 - i * 56} f={f} at={at + 4} c="#EBDFC0" z={45} n={6} />
                <Ring x={623 + dx} y={606 - i * 56} f={f} at={at + 4} c={GOLD} z={46} />
              </>) : null}
            </React.Fragment>
          );
        })}
        <Contact x={623 + dx} y={GY - 60} w={352} z={29} o={0.40} />
        <div style={{ position: "absolute", left: 470 + dx, top: 646, width: 306, textAlign: "center",
          ...mono(30, 800), letterSpacing: 3, zIndex: 46, color: hexa("#F6EBCE", 0.95) }}>WITH THE LOOP</div>

        {/* the number lands on the difference, once, and only once */}
        {f >= 62 ? (
          <div style={{ position: "absolute", left: 464 + dx, top: 148 + (1 - land) * 50,
            width: 318, height: 142, zIndex: 60, borderRadius: 11, boxShadow: SH_D,
            opacity: E(f, 62, 66, 0, 1, OUT),
            transform: `scale(${E(f, 62, 69, 1.6, 1, IN_Q)})`, transformOrigin: "50% 100%",
            background: `linear-gradient(168deg,#33A176,#12543C)` }}>
            <div style={{ position: "absolute", left: 0, top: 14, width: 318, textAlign: "center",
              ...mono(80, 800), letterSpacing: 2, color: "#EAFBF2" }}>+73%</div>
            <div style={{ position: "absolute", left: 0, top: 100, width: 318, textAlign: "center",
              ...mono(26, 800), letterSpacing: 3, color: hexa("#EAFBF2", 0.85) }}>MORE ACCURATE</div>
          </div>
        ) : null}
        {f >= 64 ? <Ring x={623 + dx} y={220} f={f} at={64} c={GREEN} z={61} s={1.6} dur={18} /> : null}

        <Contact x={790 + dx + stall * 26} y={GY} w={230} z={41} o={0.34} />
        <Hero f={f} x={848 + dx + stall * 26} y={GY} size={262} z={56} act={1} ph={0.4}
          costume={{ constr: 1 }} strain={strain} drive={-pull * 0.20} stern={strain} />
        <Forearm x0={848 + dx - 262 * 0.34} y0={GY - 262 * 0.50}
          x1={766 + dx} y1={560 - pull * 150} w={25} c={CLAYD} z={58} />
        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART. A pressing sprite's
            head is the one thing not acting, so it steams. */}
        <Steam x={848 + dx} y={GY - 268} f={f} at={16} n={9} z={62} s={1.15} c="#CFE4DA" />
        <Sweat x={848 + dx} y={GY - 200} f={f} at={30} n={7} z={63} />
        {/* every heave shakes the plinth and the glass — the effort has to land
            somewhere other than the needle, or the needle is still a float */}
        {HEAVE.filter(at => f >= at && f < at + 16).map(at => (
          <React.Fragment key={"hv" + at}>
            <Puff x={465 + dx} y={706} f={f} at={at + 1} c="#9EBDAE" z={52} n={6} />
            <Fall x={520 + dx} y={700} w={340} f={f} at={at + 1} n={6} z={51} c="#7E9A8E" rate={1.4} />
            <Ring x={790 + dx} y={GY - 20} f={f} at={at + 2} c="#8FE0BE" z={53} />
          </React.Fragment>
        ))}
        {stall > 0.3 ? <Sweat x={848 + dx} y={GY - 236} f={f} at={42} n={6} z={64} /> : null}
        {land > 0.01 && <Ring x={465 + dx} y={410} f={f} at={60} c={GREEN} z={70} s={1.5} dur={20} />}
        {land > 0.01 && <Puff x={465 + dx} y={720} f={f} at={61} c="#9EBDAE" z={52} n={11} />}

        {/* the rest of the bench: eight more instruments on the back wall, each
            with its own needle, so the room reads as a test floor */}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"ig" + i} style={{ position: "absolute", left: 40 + i * 122 + dx * 0.4,
            top: 236 + (i % 2) * 46, width: 92, height: 92, borderRadius: "50%", zIndex: 13,
            background: `linear-gradient(160deg, #2E4A42 0%, #14231F 100%)`,
            border: "6px solid #1A2E28" }}>
            <div style={{ position: "absolute", left: 42, top: 20, width: 5, height: 30,
              background: hexa("#8FE0BE", 0.72),
              transform: `rotate(${-40 + Math.sin(f / 13 + i) * 34}deg)`,
              transformOrigin: "50% 100%" }} />
            <div style={{ position: "absolute", left: 38, top: 44, width: 14, height: 14,
              borderRadius: 8, background: "#3F5A52" }} />
          </div>
        ))}
        <FrontBand f={f} n={6} size={162} seed={1} react={land} at={-16} />
        <Edge side="l" c="#08120E" w={96} z={90} top={120} />
      </Cam>
      <BandChip t="73% MORE ACCURATE" c={GREEN} fg="#04241C" />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE SAME BENCH, CLOSE — 5.32 to 7.04s (51f) · TURN · RE-FRAMING #1
   VO: "and it takes just 1 minute to set up."

   ⛔ A CUT IS ONLY EARNED WHEN IT REVEALS SOMETHING A CONTINUOUS TAKE CANNOT:
   the timer is a 250px object that was off-frame at S1's scale. The set is the
   same bench, RE-LIT brass, so it is one place seen twice and not a new room.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dialc");
  /* ⛔⛔ SCRAPPED TWICE. v1 was a CLOCK (a second dial, straight after the first).
     v2 was three blocks dropping into a frame — accurate, and inert.
     ⭐ "IT TAKES JUST 1 MINUTE TO SET UP" is not about a duration, it is about
     how little you have to DO. So: he slams the three-line card into the floor
     slot and THE WHOLE COURT ERECTS ITSELF — the bench rises out of the floor,
     two tables swing up either side, three lamps drop and strike on, and the
     three role plaques snap onto them. One gesture, an entire apparatus, and a
     minute strip that fills a single segment while it happens. That is the
     claim, and large objects rising is the top of the motion table besides. */
  const SLAM = 6;
  const slam = E(f, 1, SLAM, 0, 1, IN_Q);
  const RISE = [9, 15, 20, 25, 30, 35];       /* bench, tableL, tableR, 3 lamps */
  const ready = E(f, 40, 47, 0, 1, BACK);
  const strip = E(f, SLAM, 46, 0, 1, LIN);
  const dx = LAY[v].b;
  const r = (i: number) => E(f, RISE[i], RISE[i] + 9, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.120]} vig={0.46} glow={hexa(p.key, 0.18 + ready * 0.14)}>
      <Cam s={1.04} x={dx * 0.4} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
          rake={0.09} rakeX={RAKE_X[v]} rakeRate={4.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 520 + dx, y: 160, r: 250 }} window={null} />
        <Fitout p={p} f={f} seed={1} />
        <Bustle f={f} seed={1} n={1} z={34} />

        {/* THE SLOT, and the three-line card he puts in it */}
        <div style={{ position: "absolute", left: 428 + dx, top: 656, width: 172, height: 26,
          zIndex: 40, borderRadius: 5, boxShadow: SH,
          background: `linear-gradient(180deg,#1A2620,#0A120E)` }} />
        <div style={{ position: "absolute", left: 448 + dx, top: 560 - (1 - slam) * 210,
          width: 132, height: 96, zIndex: 42, opacity: 1 - E(f, SLAM, SLAM + 4, 0, 1, LIN),
          borderRadius: 5, boxShadow: SH_D,
          transform: `rotate(${(1 - slam) * -16}deg)`,
          background: `linear-gradient(168deg,${mxh(GOLD, 0.44)},${dkh(GOLD, 0.22)})` }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 14, top: 20 + i * 22,
              width: 104 - i * 22, height: 9, borderRadius: 4, background: hexa("#3A2A0C", 0.55) }} />
          ))}
        </div>
        {f >= SLAM ? (<>
          <Ring x={514 + dx} y={668} f={f} at={SLAM} c={GREEN} z={44} s={1.6} dur={20} />
          <Puff x={514 + dx} y={656} f={f} at={SLAM} c="#9EE0BE" z={44} n={10} />
        </>) : null}

        {/* ⭐ THE BENCH comes up out of the floor */}
        <div style={{ position: "absolute", left: 356 + dx, top: 356 + (1 - r(0)) * 330,
          width: 312, height: 210, zIndex: 30, opacity: r(0) > 0.02 ? 1 : 0, boxShadow: SH_D,
          background: `linear-gradient(168deg,#7A5236 0%,#3A2416 54%,#1A1008 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 312, height: 16,
            background: `linear-gradient(180deg,#B4834E,#7A5236)` }} />
          <div style={{ position: "absolute", left: 34, top: 52, width: 244, height: 128,
            borderRadius: 5, border: `9px solid ${hexa("#5A3A24", 0.85)}` }} />
        </div>
        {/* the two tables swing up either side */}
        {[0, 1].map(i => (
          <div key={"tb" + i} style={{ position: "absolute",
            left: (i === 0 ? 92 : 700) + dx, top: 520, width: 218, height: 132, zIndex: 32,
            opacity: r(1 + i) > 0.02 ? 1 : 0, boxShadow: SH_D,
            transformOrigin: i === 0 ? "0% 100%" : "100% 100%",
            transform: `rotate(${(1 - r(1 + i)) * (i === 0 ? -84 : 84)}deg)`,
            background: `linear-gradient(168deg,#6E4A30,#2E1C10)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 218, height: 13,
              background: "#A0714A" }} />
          </div>
        ))}
        {/* three lamps drop and strike on, one per role */}
        {[0, 1, 2].map(i => {
          const k = r(3 + i);
          const lx = [201, 512, 809][i] + dx;
          return (
            <React.Fragment key={"lp" + i}>
              <div style={{ position: "absolute", left: lx - 6, top: 120,
                width: 12, height: 120 * k, zIndex: 33, background: "#3A4A44" }} />
              <div style={{ position: "absolute", left: lx - 52, top: 120 + 120 * k,
                width: 104, height: 34, zIndex: 34, borderRadius: "6px 6px 30px 30px",
                opacity: k > 0.02 ? 1 : 0, boxShadow: SH,
                background: `linear-gradient(180deg,#6E7A74,#2A3630)` }} />
              {k > 0.9 ? (<>
                <Beam x={lx} y={158 + 120 * k} top={70} bot={330} len={330} c="#FFE8B8"
                  o={0.26} z={20} f={f} />
                <Ring x={lx} y={166 + 120 * k} f={f} at={RISE[3 + i] + 8} c="#FFE8B8" z={35} />
              </>) : null}
            </React.Fragment>
          );
        })}
        {/* every piece LANDS. A thing that rises silently into place is a
            transition; a thing that arrives with grit under it is an EVENT. */}
        {RISE.map((at, i) => (
          f >= at + 7 && f < at + 20 ? (
            <React.Fragment key={"ld" + i}>
              <Puff x={[512, 201, 809, 201, 512, 809][i] + dx} y={[566, 652, 652, 292, 292, 292][i]}
                f={f} at={at + 7} c="#9EC0B0" z={49} n={7} />
              <Ring x={[512, 201, 809, 201, 512, 809][i] + dx} y={[566, 652, 652, 292, 292, 292][i]}
                f={f} at={at + 7} c="#8FE0BE" z={48} />
            </React.Fragment>
          ) : null
        ))}
        {/* the three role plaques snap on */}
        {R.roles.map((role, i) => {
          const k = E(f, RISE[3 + i] + 6, RISE[3 + i] + 13, 0, 1, BACK);
          if (k <= 0.02) return null;
          const lx = [201, 512, 809][i] + dx;
          return (
            <div key={"pq" + i} style={{ position: "absolute", left: lx - 88,
              top: (i === 1 ? 470 : 528) - (1 - k) * 30, width: 176, height: 46, zIndex: 44,
              opacity: k, borderRadius: 5, boxShadow: SH,
              transform: `scale(${E(f, RISE[3 + i] + 6, RISE[3 + i] + 13, 1.4, 1, IN_Q)})`,
              background: `linear-gradient(180deg,${mxh(role.c, 0.3)},${dkh(role.c, 0.28)})` }}>
              <div style={{ position: "absolute", left: 0, top: 12, width: 176, textAlign: "center",
                ...mono(22, 800), letterSpacing: 1.6, color: "#FBF6EA" }}>{role.n}</div>
            </div>
          );
        })}

        {/* the minute strip: sixty segments, and the whole build costs one */}
        <div style={{ position: "absolute", left: 856 + dx, top: 236, width: 58, height: 300,
          zIndex: 46, borderRadius: 6, boxShadow: SH,
          background: `linear-gradient(180deg,#2A2210,#120C04)` }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 8, top: 8 + i * 14.6, width: 42,
              height: 9, borderRadius: 2,
              background: i < Math.round(strip * 2.4) ? SODIUM : hexa("#5E4E2A", 0.32) }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 828 + dx, top: 196, width: 114, textAlign: "center",
          ...mono(30, 800), letterSpacing: 2, zIndex: 47, color: hexa("#FFD79A", 0.95) }}>1 MIN</div>

        {/* READY */}
        {ready > 0.02 ? (
          <div style={{ position: "absolute", left: 386 + dx, top: 258 - ready * 8, width: 252,
            height: 62, zIndex: 60, borderRadius: 8, opacity: ready, boxShadow: SH_D,
            transform: `scale(${E(f, 40, 47, 1.5, 1, IN_Q)})`,
            background: `linear-gradient(180deg,#2E8C64,#12543C)` }}>
            <div style={{ position: "absolute", left: 0, top: 16, width: 252, textAlign: "center",
              ...mono(32, 800), letterSpacing: 3, color: "#EAFBF2" }}>READY</div>
          </div>
        ) : null}
        {ready > 0.3 ? <Ring x={512 + dx} y={288} f={f} at={42} c={GREEN} z={61} s={1.6} dur={18} /> : null}

        <Contact x={786 + dx} y={GY} w={210} z={41} o={0.32} />
        <Hero f={f} x={840 + dx} y={GY} size={244} z={56} act={2} ph={0.8}
          costume={{ constr: 1 }} cheer={ready} gaze={-0.6}
          drive={-E(f, 2, SLAM, 0, 0.26, IN_Q) + E(f, SLAM, SLAM + 8, 0, 0.26, OUT)} />
        <FrontBand f={f} n={4} size={172} seed={3} react={ready} at={-14} x0={-110} x1={640} />
      </Cam>
      <BandChip t="1 MINUTE TO SET UP" c={SODIUM} fg="#2A1C04" />
    </Scene>
  );
};

export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");
  const post = E(f, 2, 10, 0, 1, IN_Q);
  const ord = seqOrder(v, 3);
  const AT = [12, 36, 60];
  const dx = LAY[v].c * 0.5;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.34} glow={hexa(p.key, 0.14)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
          rake={0.06} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.6} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={2} />
        <Bustle f={f} seed={2} n={1} z={34} />
        {/* the background process: the overhead gantry actually carries things */}
        <Runner y={150} f={f} z={16} rate={8.7} pitch={196} w={168} h={91}
          c="#B4BAC0" c2="#141A20" kind="load" rail hang={22} o={0.95} />

        {[0, 1, 2].map(i => {
          const at = AT[ord[i]];
          const k = E(f, at, at + 13, 0, 1, OUT);
          const out = E(f, at + 10, at + 30, 0, 1, IO);
          const bx = 236 + i * 268 + dx;
          return (
            <React.Fragment key={"d" + i}>
              <RollerDoor x={bx} y={620} w={244} h={344} k={k} z={26}
                c={["#5E7C8E", "#8E6A9C", "#9C7A46"][i]}>
                <div style={{ position: "absolute", inset: 0,
                  background: `linear-gradient(180deg, ${mxh(p.key, 0.30)} 0%, ${dkh("#26303A", 0.10)} 100%)` }} />
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ position: "absolute", left: 26 - j * 8, top: 24 + j * 40,
                    width: 192 + j * 20, height: 9, background: hexa(p.key, 0.42 - j * 0.1) }} />
                ))}
              </RollerDoor>
              {/* the good rides OUT toward camera on the gantry */}
              <div style={{ position: "absolute", left: 0, top: 0, zIndex: 44,
                transform: `translate(${out * (i - 1) * 46}px, ${out * 66}px) scale(${0.72 + out * 0.34})`,
                transformOrigin: `${bx}px 640px`, opacity: k }}>
                {/* ⛔ A GOOD THAT IS TOO SMALL TO READ IS DECORATION. v1 ran
                    these at 0.86 and on the contact sheet the dock read as a
                    grey wall with three thumbnails on it. */}
                {i === 0 && <AppShell x={bx} y={648} f={f} k={k * out} s={1.20} z={44} />}
                {i === 1 && <PageSlab x={bx} y={616} f={f} k={k * out} s={1.16} z={44} />}
                {i === 2 && <BenchTool x={bx} y={650} f={f} k={k * out} s={1.20} z={44} />}
              </div>
              {out > 0.5 && (
                <Crew f={f} x={bx} y={GY + 54} i={i + 8} size={110} z={50} at={at + 18} loop={1} />
              )}
            </React.Fragment>
          );
        })}

        {/* the yard: stacked pallets on both sides, because a dock that ships
            three things a second is not an empty apron */}
        {[[46, 3], [140, 5], [880, 4], [962, 6]].map(([sx, n], i) => (
          <React.Fragment key={"pl" + i}>
            {Array.from({ length: n as number }, (_, j) => (
              <div key={j} style={{ position: "absolute", left: (sx as number) + dx + (j % 2) * 7,
                top: 690 - j * 34, width: 96, height: 32, zIndex: 40,
                background: j % 2 ? "#8A6A42" : "#A0805A",
                borderTop: "4px solid #C09A66" }} />
            ))}
          </React.Fragment>
        ))}
        <FrontBand f={f} n={7} size={158} seed={5} react={0} at={26} />
        {/* the single prompt slot, front centre — ONE input */}
        <div style={{ position: "absolute", left: 466 + dx, top: 690, width: 80, height: 58,
          zIndex: 60, background: "#2A3038", borderRadius: 5 }}>
          <div style={{ position: "absolute", left: 12, top: 10, width: 56, height: 9,
            background: "#0A0E12" }} />
        </div>
        <div style={{ position: "absolute", left: 486 + dx, top: 640 - post * 44, width: 44,
          height: 56, zIndex: 61, opacity: 1 - E(f, 9, 11, 0, 1, LIN),
          background: PAPER, boxShadow: SH }} />
        <Contact x={806 + dx} y={GY} w={200} z={41} o={0.30} />
        <Hero f={f} x={856 + dx} y={GY} size={232} z={56} act={0} ph={0.15}
          costume={{ glasses: 1 }} drive={-post * 0.20} cheer={E(f, 66, 74, 0, 1, OUT)} />
        <Edge side="l" c="#1A2026" w={92} z={90} top={130} />
      </Cam>
      <BandChip t="APPS · SITES · TOOLS" c="#1A2026" fg="#EAF2F8" />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE SEAL ROOM — 9.96 to 12.40s (73f) · ESCALATE
   VO: "and even the creators of Claude think this is the future of AI."

   ⛔⛔ THE FRAME CANNOT SOURCE THIS CLAIM, so it dramatises the MECHANISM OF
   ENDORSEMENT and stops at the edge of it: the house press strikes the CLAUDE
   MARK into a brass plate the method is standing on. No person, no company
   name, no sentence in anyone's mouth. See `QUOTE_BANNED` in JudgeWorld.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("seal");
  const bo = PJ[v] * 4;   /* per-cut BEAT SHIFT: the phase differs, the event does not */
  const drop = E(f, 12 + bo, 22 + bo, 0, 1, IN_Q) - E(f, 30 + bo, 44 + bo, 0, 1, IO);
  const struck = E(f, 21 + bo, 25 + bo, 0, 1, OUT);
  const lift = E(f, 44 + bo, 62 + bo, 0, 1, OUT);
  const dx = LAY[v].a;   /* dHash 8 house/steel at f336 — full offset */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.48} glow={hexa(p.key, 0.18)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.15} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} lamp={{ x: 420 + dx, y: 110, r: 240 }} window={null} />
        <Fitout p={p} f={f} seed={3} />
        <Bustle f={f} seed={3} n={1} z={34} />
        <Runner y={126} f={f} z={16} rate={6.7} pitch={172} w={153} h={79}
          c="#B08A4A" c2="#1A0A06" kind="load" rail hang={18} o={0.85} />
        {/* the overhead that makes the press read: one shaped cone on the ram,
            never a full-frame fill */}
        <Beam x={420 + dx} y={96} top={150} bot={520} len={460} c="#FFD8A0" o={0.30} z={22} f={f} />
        <SealPress x={420 + dx} y={GY + 26} f={f} drop={drop} struck={struck} z={40} s={1.06} />
        {/* ⭐ THE MARK IS IMPRESSED INTO THE PLATE AND TRAVELS WITH IT. It lands
            on the anvil when the press strikes, the press lifts away empty, and
            when he picks the plate up the mark goes with the plate. */}
        {struck > 0.02 ? (
          <div style={{ position: "absolute",
            left: (420 + dx) + ((745 + dx) - (420 + dx)) * lift - 43,
            top: (GY - 92) + ((470 - lift * 130 - 4) - (GY - 92)) * lift - 43,
            zIndex: 63, opacity: struck,
            transform: `scale(${E(f, 21 + bo, 26 + bo, 1.8, 1, IN_Q)}) rotate(${lift * -8}deg)` }}>
            <MarkCast x={43} y={43} s={86} z={6} o={struck} f={f} spin={0} pulse={struck} />
          </div>
        ) : null}
        {struck > 0.4 && <Ring x={420 + dx} y={GY - 66} f={f} at={22} c={SODIUM} z={68} s={1.7} dur={20} />}
        {struck > 0.4 && <Puff x={420 + dx} y={GY - 30} f={f} at={22} c="#E0B080" z={66} n={13} />}
        {/* ⛔ HOLD WAS 54%: the press struck at f22 of 73 and then nothing moved
            for two seconds. Hot scale falls off the anvil for the rest of the
            shot, and a second ring goes out when he lifts the plate clear. */}
        {struck > 0.4 && <Fall x={420 + dx} y={GY - 96} w={300} f={f} at={23} n={16} z={64}
          c="#FFCE8A" rate={1.35} />}
        {lift > 0.6 && <Ring x={700 + dx} y={420} f={f} at={52} c="#FFE0A8" z={70} s={1.2} dur={18} />}
        {/* the plate he holds up once it is struck */}
        <div style={{ position: "absolute", left: 640 + dx, top: 470 - lift * 130, width: 210,
          height: 40, zIndex: 62, opacity: lift, transform: `rotate(${-8 + lift * 8}deg)`,
          background: `linear-gradient(180deg, #E0BE7E 0%, #A5802E 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 8,
            background: "#F6E2B0" }} />
        </div>
        <Contact x={766 + dx} y={GY} w={220} z={41} o={0.34} />
        <Hero f={f} x={820 + dx} y={GY} size={252} z={56} act={3} ph={0.5}
          costume={{ suit: 1 }} cheer={lift} gaze={-0.4} />
        <Forearm x0={820 + dx - 252 * 0.34} y0={GY - 252 * 0.50}
          x1={700 + dx} y1={492 - lift * 130} w={25} c={CLAYD} z={58} />
        {/* ⛔ TWO SPRITES AT PROPER SCALE BEAT THREE ANTS. v1 ran three at 104
            below the ground line and they read as clutter in the corner of the
            contact sheet, not as a cast. */}
        {/* the plates already struck today, racked — countable, and it says the
            house does this constantly rather than once for the camera */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"rp" + i} style={{ position: "absolute", left: 690 + (i % 4) * 78 + dx * 0.5,
            top: 250 + Math.floor(i / 4) * 62, width: 66, height: 46, zIndex: 13,
            background: `linear-gradient(180deg, #C9A15A 0%, #7A5A22 100%)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 7,
              background: "#E4C486" }} />
          </div>
        ))}
        <FrontBand f={f} n={5} size={172} seed={7} react={struck} at={-14} x0={-100} x1={760} />
        <Edge side="r" c="#180806" w={92} z={90} top={126} />
      </Cam>
      <BandChip t="THE HOUSE MARK GOES ON IT" c={GOLD} fg="#2A1C04" />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE CHAMBER — 12.40 to 13.72s (40f) · THE NAME
   VO: "It's called the Judge Loop."

   ⭐ 40 FRAMES IS ONE IDEA, AND THE IDEA IS THE ROOM. A large bright area
   APPEARING is the cheapest high-value shape there is — the doors swing in from
   both edges and the clerestory drops onto the bench.
   ⭐ AND THE LOOP IS PLANTED HERE: the rail starts ONE revolution and does not
   finish it. S12 pays it off. A promise made at 12s and kept at 26s.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("chamber");
  /* ⛔ HOLD WAS 64%: the doors finished at f15 of a 40-frame shot and the
     rest was a still. The swing now runs the whole scene on a slow ease and
     the clerestory keeps climbing under it. */
  const open = E(f, 0, 34, 0, 1, IO);
  const light = E(f, 4, 38, 0, 1, OUT);
  const loop = E(f, 6, 40, 0, 0.42, LIN);
  const dx = LAY[v].b * 0.4;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.40} glow={hexa(p.key, 0.22 * light)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.13 * light} rakeX={RAKE_X[v]} rakeRate={2.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.6} lamp={null}
          window={{ x: 396, y: 96, w: 220, h: 150 }} />
        <Fitout p={p} f={f} seed={4} />
        <Bustle f={f} seed={4} n={1} z={34} />
        {/* the clerestory falling on the bench — the reveal needs a light
            DIRECTION or it is a floor plan */}
        <Beam x={506 + dx} y={216} top={200} bot={620} len={380} c="#FFE0A8"
          o={0.34 * light} z={20} f={f} />
        <Pool x={506 + dx} y={556} w={620} c="#FFD68E" o={0.30 * light} z={19} />
        {/* the bench at back centre, raised */}
        <div style={{ position: "absolute", left: 316 + dx, top: 396, width: 380, height: 150,
          zIndex: 26, background: `linear-gradient(180deg, #8A5E34 0%, #3E2812 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 14,
            background: "#B4854A" }} />
          <div style={{ position: "absolute", left: 26, top: 34, width: 328, height: 96,
            border: "5px solid #9E6C3A" }} />
        </div>
        {/* the two tables, left and right */}
        {[168, 700].map((tx, i) => (
          <div key={"t" + i} style={{ position: "absolute", left: tx + dx, top: 560, width: 200,
            height: 96, zIndex: 34, background: `linear-gradient(180deg, #6E4A24 0%, #33200E 100%)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 11,
              background: "#9E7440" }} />
          </div>
        ))}
        {/* the dock, front centre, with the lie still in it */}
        <div style={{ position: "absolute", left: 420 + dx, top: 592, width: 176, height: 130,
          zIndex: 52, background: `linear-gradient(180deg, #7A5230 0%, #3E2812 100%)` }} />
        <Brief x={508 + dx} y={604} w={124} s={0} z={54} f={f} rot={-3} />

        {/* ⭐ THE LOOP, PLANTED. One revolution begun and not completed. */}
        <LoopRail cx={506 + dx} cy={250} r={286} k={loop} z={20} c="#6E5A38" pass={R.passes[0]} />

        {/* the doors swinging in from both frame edges */}
        {[0, 1].map(i => (
          <div key={"dr" + i} style={{ position: "absolute",
            left: i === 0 ? -30 : 706, top: 300, width: 336, height: 420, zIndex: 70,
            transformOrigin: i === 0 ? "0% 50%" : "100% 50%",
            transform: `perspective(900px) rotateY(${(i === 0 ? 1 : -1) * open * 82}deg)`,
            background: `linear-gradient(${i === 0 ? 100 : 260}deg, #5E3C1E 0%, #2A1A0A 100%)` }}>
            <div style={{ position: "absolute", left: 26, top: 30, right: 26, bottom: 30,
              border: "7px solid #7A5230" }} />
          </div>
        ))}
        {/* ⭐ THE REVEAL IS OF A FULL ROOM. A courtroom with nobody in it is a
            floor plan; ten in the public gallery and the whole beat lands. */}
        <Gallery f={f} x0={-50} x1={1060} y={GY + 30} n={9} ranks={2} size={124} z={30}
          at={2} react={0} seed={9} />
        <FrontBand f={f} n={6} size={182} seed={19} react={0} at={4} />
        <Contact x={806 + dx} y={GY} w={196} z={41} o={0.32} />
        <Hero f={f} x={856 + dx} y={GY} size={228} z={58} act={0} ph={0.7}
          costume={{ constr: 1 }} drive={open * 0.20} gaze={-0.5} />
        <Edge side="l" c="#1A1206" w={86} z={90} top={140} />
      </Cam>
      <BandChip t="THE JUDGE LOOP" c={SODIUM} fg="#2A1C04" />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE CORRIDOR — 13.72 to 15.26s (46f) · THE DIP (deliberate)
   VO: "Instead of doing the normal back and forth chats,"

   ⛔ SAMENESS IS DRAMATISED BY REPETITION, and repetition is free motion. The
   sheet is drawn WELL — the point is that it goes nowhere, not that it is bad
   (§23: never draw the villain ugly). The rejected pile beside each of them
   grows on every pass, so the scene has a direction even though the shuttle
   does not.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* five passes, accelerating, over the FULL duration */
  const passAt = [2, 11, 19, 26, 32, 37];
  let leg = 0;
  for (let i = 0; i < passAt.length; i++) if (f >= passAt[i]) leg = i;
  const t = E(f, passAt[leg], passAt[Math.min(leg + 1, passAt.length - 1)], 0, 1, IO);
  const side = leg % 2 === 0 ? t : 1 - t;
  const sx = 300 + side * 400;
  const piles = [Math.ceil(leg / 2), Math.floor(leg / 2)];
  const dx = LAY[v].c * 0.4;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.115]} vig={0.56} glow={hexa(p.key, 0.10)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="duct"
          rake={0.07} rakeX={RAKE_X[v]} rakeRate={2.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.8} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={5} />
        <Bustle f={f} seed={5} n={1} z={34} />
        {/* the one flickering strip — the only light in the reel that stutters */}
        <Strip x={506 + dx} y={126} w={330} on={0.55 + (rnd(Math.floor(f / 3), 2) > 0.22 ? 0.45 : 0)}
          c="#C8D6E2" z={30} f={f} />
        {/* ⛔ AN UNDER-LIT SET IS NOT AN EMPTY ONE. The dip is deliberate, but
            the room still has to be a PLACE: a run of numbered doors down the
            wall, two lit benches, and the piles that are the only thing here
            that accumulates. */}
        {[0, 1, 2, 3].map(i => (
          <div key={"dr" + i} style={{ position: "absolute", left: 86 + i * 224 + dx, top: 318,
            width: 148, height: 240, zIndex: 20,
            background: `linear-gradient(178deg, #3E4A56 0%, #232C36 100%)` }}>
            <div style={{ position: "absolute", left: 12, top: 16, right: 12, bottom: 16,
              border: "5px solid #4E5C6A" }} />
            <div style={{ position: "absolute", left: 118, top: 118, width: 13, height: 13,
              borderRadius: 7, background: "#8C98A4" }} />
          </div>
        ))}
        <Pool x={506 + dx} y={548} w={700} c="#C8D6E2" o={0.20} z={19} />
        {[220, 680].map((bx, i) => (
          <div key={"b" + i} style={{ position: "absolute", left: bx + dx, top: 588, width: 220,
            height: 54, zIndex: 30, background: `linear-gradient(180deg, #55616E 0%, #2A323C 100%)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 10,
              background: "#7E8C9A" }} />
            {[0, 1].map(j => (
              <div key={j} style={{ position: "absolute", left: 16 + j * 176, top: 44, width: 18,
                height: 46, background: "#232B33" }} />
            ))}
          </div>
        ))}
        {/* the rejected piles — the only thing that actually accumulates */}
        {[0, 1].map(i => (
          <div key={"p" + i} style={{ position: "absolute", left: (i === 0 ? 232 : 692) + dx,
            top: 596 - piles[i] * 11, width: 118, height: piles[i] * 11, zIndex: 34 }}>
            {Array.from({ length: piles[i] }, (_, j) => (
              <div key={j} style={{ position: "absolute", left: rnd(j, 4) * 12, top: j * 11,
                width: 112, height: 12, background: j % 2 ? "#D8D2C4" : PAPER,
                transform: `rotate(${(rnd(j, 6) - 0.5) * 5}deg)` }} />
            ))}
          </div>
        ))}
        {/* THE ONE SHEET, shuttling. It is a nice sheet. */}
        <div style={{ position: "absolute", left: sx + dx - 86, top: 470 - Math.sin(t * Math.PI) * 78,
          width: 172, height: 218, zIndex: 62,
          transform: `rotate(${(side - 0.5) * 26}deg)`,
          background: PAPER, boxShadow: SH }}>
          <div style={{ position: "absolute", left: 16, top: 18, width: 118, height: 14, background: CLAY }} />
          {[0, 1, 2, 3, 4, 5, 6].map(j => (
            <div key={j} style={{ position: "absolute", left: 16, top: 50 + j * 22,
              width: 140 - (j % 3) * 30, height: 9, background: "#C8C2B2" }} />
          ))}
        </div>
        {/* ⭐ THE QUEUE IS THE JOKE. The old way is not empty, it is a corridor
            full of people waiting their turn on the same shuttle — which is a
            crowd that means something rather than one pasted in for density. */}
        {[0, 1, 2, 3, 4].map(i => (
          <Crew key={"q" + i} f={f} x={70 + i * 84 + dx} y={GY - 96 - i * 9} i={i + 8}
            size={92 - i * 7} z={26 - i} at={-20} loop={3} tint={i > 1 ? "#A85A38" : undefined} />
        ))}
        <Contact x={236 + dx} y={GY} w={186} z={41} o={0.30} />
        <Contact x={696 + dx} y={GY} w={186} z={41} o={0.30} />
        <Hero f={f} x={286 + dx} y={GY} size={218} z={56} act={1} ph={0.0}
          costume={{ glasses: 1 }} drive={(1 - side) * 0.16} />
        <Hero f={f} x={746 + dx} y={GY} size={218} z={56} act={1} ph={1.6} flip
          costume={{ beard: 1 }} drive={side * 0.16} />
        <Edge side="r" c="#0A0D11" w={92} z={90} top={120} />
      </Cam>
      <BandChip t="THE BACK AND FORTH" c="#0A0D11" fg="#C8D6E2" />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE MUSTER HALL — 15.26 to 18.02s (83f) · ESCALATE
   VO: "you give Claude a task and tell it to spawn a team of elite sub-agents."

   ⛔ PITCH IS ARITHMETIC, NOT TASTE. Two ranks: front 5 at size 138 over 720px
   (pitch 144 >= 0.85 * 138 = 117 ✓), back 6 at size 104 over 800px (pitch 133
   >= 88 ✓). Back rank in darker clay — the VALUE ramp is what makes a crowd
   read as depth, and it is the axis the greyscale audit can see.
   ⭐ "ELITE" IS DRAWN AS EQUIPMENT: eleven sprites, eleven different costume
   levers off `costumeFor`, deterministic so a re-render is identical.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("muster");
  const carry = E(f, 0, 14, 0, 1, IO);
  const drop = E(f, 14, 19, 0, 1, IN_Q);
  const doors = E(f, 20, 34, 0, 1, OUT);
  const dx = LAY[v].a * 0.4;
  const front = [0, 1, 2, 3, 4], back = [0, 1, 2, 3, 4, 5];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.095]} vig={0.34} glow={hexa(p.key, 0.20)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
          rake={0.16} rakeX={RAKE_X[v]} rakeRate={5.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="boards" grit={0.6} lamp={{ x: 506 + dx, y: 108, r: 260 }} window={null} />
        <Fitout p={p} f={f} seed={6} />
        <Bustle f={f} seed={6} n={1} z={34} />
        {/* the tall doors the team comes through */}
        {[0, 1].map(i => (
          <div key={"d" + i} style={{ position: "absolute",
            left: 328 + i * 180 + dx, top: 252, width: 176, height: 300, zIndex: 18,
            transformOrigin: i === 0 ? "0% 50%" : "100% 50%",
            transform: `perspective(1000px) rotateY(${(i === 0 ? 1 : -1) * doors * 74}deg)`,
            background: `linear-gradient(${i === 0 ? 100 : 260}deg, #6E4A1E 0%, #2A1A08 100%)` }} />
        ))}
        {/* ⛔ WHAT A DOOR OPENS ON HAS TO BE A PLACE. v1 uncovered a flat cream
            rectangle and it became the loudest object in the frame while saying
            nothing — the reel-131 lesson, verbatim. It is now a receding
            corridor with lamp bars, a lit floor and figures at the far end. */}
        <div style={{ position: "absolute", left: 328 + dx, top: 252, width: 356, height: 300,
          zIndex: 14, overflow: "hidden",
          background: `linear-gradient(180deg, ${dkh("#5A3C18", 0.10)} 0%, ${mxh(p.key, 0.34)} 62%, ${mxh(p.key, 0.62)} 100%)` }}>
          {[0, 1, 2].map(i => (
            <div key={"cw" + i} style={{ position: "absolute", left: -22 + i * 18, top: 0,
              width: 96 - i * 22, height: "100%", background: dkh("#4A3210", 0.10 + i * 0.06),
              transform: "skewX(13deg)" }} />
          ))}
          {[0, 1, 2].map(i => (
            <div key={"cw2" + i} style={{ position: "absolute", right: -22 + i * 18, top: 0,
              width: 96 - i * 22, height: "100%", background: dkh("#4A3210", 0.14 + i * 0.06),
              transform: "skewX(-13deg)" }} />
          ))}
          {[0, 1, 2, 3].map(i => (
            <div key={"lb" + i} style={{ position: "absolute", left: 88 - i * 16, top: 26 + i * 46,
              width: 180 + i * 34, height: 12, borderRadius: 4,
              background: mxh(p.key, 0.62 - i * 0.11) }} />
          ))}
          {[0, 1, 2].map(i => (
            <div key={"fg" + i} style={{ position: "absolute", left: 118 + i * 56, top: 196,
              width: 40, height: 74, borderRadius: 5, background: dkh("#3A2408", 0.06) }} />
          ))}
        </div>

        {/* the task crate the hero drops on the floor plate */}
        <div style={{ position: "absolute", left: 150 + dx, top: 330 + drop * 286, width: 196,
          height: 158, zIndex: 60, opacity: 1 - E(f, 22, 30, 0, 1, LIN), boxShadow: SH_D,
          transform: `rotate(${carry * 8 - drop * 14}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 5, background: "#96682E",
            border: "8px solid #4A2E10" }} />
          <div style={{ position: "absolute", left: 12, top: 30, width: 172, height: 12, background: "#D29A46" }} />
          <div style={{ position: "absolute", left: 12, top: 86, width: 172, height: 12, background: "#D29A46" }} />
          <div style={{ position: "absolute", left: 0, top: 118, width: 196, textAlign: "center",
            ...mono(26, 800), letterSpacing: 2, color: hexa("#3A2408", 0.8) }}>TASK</div>
        </div>
        {drop > 0.9 && <Ring x={242 + dx} y={GY - 20} f={f} at={19} c="#FFE0A0" z={64} s={1.6} dur={22} />}
        {drop > 0.9 && <Puff x={242 + dx} y={GY - 6} f={f} at={19} c="#E0C48A" z={62} n={15} />}

        {/* ⛔⛔ "SPAWN A TEAM" HAS TO BE A SPAWN. v1 popped eleven crew in at fixed
            marks across the whole 83 frames — which reads as people standing
            around, not as a team arriving. They now come OUT OF THE DOORWAY:
            each starts 44px tall at the far end of the lit corridor and walks
            toward camera to full size and its own mark. That is the line
            ("tell it to spawn a team of elite sub-agents") happening on screen,
            and it is the top row of the motion table besides. */}
        {back.map(i => {
          const at = 24 + i * 4;
          if (f < at) return null;
          const k = E(f, at, at + 26, 0, 1, OUT);
          const tx = 140 + i * 152 + dx, ty = GY - 62, ts = 104;
          return (
            <Crew key={"b" + i} f={f} x={506 + dx + (tx - 506 - dx) * k}
              y={392 + (ty - 392) * k} i={i + 4} size={44 + (ts - 44) * k}
              z={36} at={at} loop={(i + 1) % 4} tint="#8A4A2E" />
          );
        })}
        {front.map(i => {
          const at = 30 + i * 6;
          if (f < at) return null;
          const k = E(f, at, at + 28, 0, 1, OUT);
          const tx = 186 + i * 158 + dx, ty = GY + 42, ts = 138;
          return (
            <React.Fragment key={"f" + i}>
              <Crew f={f} x={506 + dx + (tx - 506 - dx) * k} y={404 + (ty - 404) * k}
                i={i} size={44 + (ts - 44) * k} z={50} at={at} loop={i % 4} />
              {k > 0.92 ? <Puff x={tx} y={ty} f={f} at={at + 26} c="#E0C48A" z={49} n={4} /> : null}
            </React.Fragment>
          );
        })}
        <Contact x={840 + dx} y={GY} w={192} z={41} o={0.30} />
        <Hero f={f} x={886 + dx} y={GY - 4} size={224} z={57} act={2} ph={0.9}
          costume={{ constr: 1 }} drive={-carry * 0.20} cheer={E(f, 52, 62, 0, 1, OUT)} />
        <Edge side="l" c="#241606" w={88} z={90} top={120} />
      </Cam>
      <BandChip t="SPAWN A TEAM OF SUB AGENTS" c="#241606" fg="#FFE0A0" />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE PROMPT RACK — 18.02 to 19.88s (55f) · TURN
   VO: "But the secret sauce is in the third line of the prompt"

   ⛔ THE PROMPT IS NEVER SHOWN. `memory/gate-the-how`: the VO sells the RESULT
   and names the artifact; the copy-pasteable HOW is the lead magnet. So the
   rungs carry no words at all — only a POSITION, which is exactly what the line
   says. The numerals 1 2 3 down the side are the whole text budget.
   ⭐ AND THE MECHANISM FAILS FIRST: the rack BOWS and the bar does not seat for
   six frames. A thing that refuses before it yields is what weight looks like.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rack");
  const lift = E(f, 2, 12, 0, 1, OUT);
  const push = E(f, 12, 22, 0, 0.72, IO);
  const bow = E(f, 18, 24, 0, 1, OUT) - E(f, 26, 31, 0, 1, IO);
  const seat = Math.min(1, push + E(f, 26, 30, 0, 0.4, IN_Q));
  const lit = E(f, 30, 42, 0, 1, OUT);
  const dx = LAY[v].b * 0.4;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.110]} vig={0.50} glow={hexa(p.key, 0.16 + 0.12 * lit)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
          rake={0.16} rakeX={RAKE_X[v]} rakeRate={5.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 780 + dx, y: 130, r: 210 }} window={null} />
        <Fitout p={p} f={f} seed={7} />
        <Bustle f={f} seed={7} n={1} z={34} />
        <Runner y={106} f={f} z={16} rate={10.2} pitch={176} w={156} h={85}
          c="#2E6A76" c2="#04161A" kind="cell" rail o={0.9} />
        <PromptRack x={430 + dx} y={GY} w={430} z={46} seat={seat} bow={bow} lit={lit} />
        {/* ⛔ AN ACTION IS A DISTANCE. v1 had the bar appear in the rung and
            "seat", which is a state change: 4.88 motion, the second-weakest scene
            in the reel. The bar is now CARRIED in from off-frame right across
            660px, glowing, before it meets the rung that refuses it. */}
        {lift > 0.01 && seat < 0.99 && (
          <div style={{ position: "absolute",
            left: 1010 - E(f, 2, 22, 0, 660, IO) + dx, top: 452 - E(f, 2, 22, 0, 86, IO),
            width: 300, height: 46, zIndex: 52,
            transform: `rotate(${-14 + E(f, 2, 22, 0, 14, IO)}deg)` }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 5,
              background: `linear-gradient(180deg, #FFD68E 0%, #C07A18 100%)` }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 9,
              background: "#FFF0C8" }} />
            <div style={{ position: "absolute", left: -22, top: -10, width: 344, height: 66,
              background: hexa(SODIUM, 0.20) }} />
          </div>
        )}
        {/* the light travelling the rack once the rung is hot — a full-width
            high-contrast band, mounted as the thing the rack actually does */}
        {lit > 0.2 && (
          <div style={{ position: "absolute", left: 215 + dx - 30 + ((f - 30) * 22) % 500,
            top: 396, width: 96, height: 60, zIndex: 54,
            background: `linear-gradient(90deg, ${hexa("#FFF0C8", 0)} 0%, ${hexa("#FFF0C8", 0.62)} 50%, ${hexa("#FFF0C8", 0)} 100%)` }} />
        )}
        {seat > 0.95 && <Ring x={430 + dx} y={GY - 106} f={f} at={30} c={SODIUM} z={70} s={1.5} dur={20} />}
        {seat > 0.95 && <Puff x={430 + dx} y={GY - 60} f={f} at={30} c="#9EE0EE" z={68} n={12} />}
        {/* ⛔ HOLD WAS 50%: the bar seated at f30 of a 55-frame shot and the rest
            was a still. Hot metal SHEDS — scale falls off the rung for the whole
            remainder, and the two cold rungs each take a struck spark as the heat
            travels down the rack. Nothing in a reel lands and simply stops. */}
        {seat > 0.9 && <Fall x={430 + dx} y={GY - 130} w={400} f={f} at={30} n={14} z={69}
          c="#FFC46A" rate={1.5} />}
        {[0, 1].map(i => (
          seat > 0.9 && f > 34 + i * 8
            ? <Ring key={"rr" + i} x={310 + i * 240 + dx} y={GY - 192 - i * 86} f={f}
                at={34 + i * 8} c="#9EE0EE" z={68} s={0.9} dur={16} />
            : null
        ))}
        <Contact x={790 + dx} y={GY} w={214} z={41} o={0.34} />
        <Hero f={f} x={842 + dx} y={GY} size={256} z={56} act={1} ph={0.3}
          costume={{ constr: 1 }} strain={Math.max(0, push * 1.2 - E(f, 30, 38, 0, 1.1, OUT))}
          drive={-push * 0.24} stern={bow} />
        <Forearm x0={842 + dx - 256 * 0.34} y0={GY - 256 * 0.50}
          x1={648 + dx} y1={GY - 214 + bow * 10} w={25} c={CLAYD} z={58} />
        <Steam x={842 + dx} y={GY - 262} f={f} at={16} n={7} z={62} s={1.0} c="#B8E4EE" />
        {/* the other racks on the floor, receding, all cold */}
        {[0, 1, 2].map(i => (
          <div key={"or" + i} style={{ position: "absolute", left: 34 + i * 292 + dx * 0.4,
            top: 268 - i * 8, width: 244, height: 150, zIndex: 12,
            background: `linear-gradient(180deg, #14343C 0%, #08181C 100%)` }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ position: "absolute", left: 14, top: 16 + j * 44,
                width: 216, height: 26, borderRadius: 3, background: "#2E5660" }} />
            ))}
          </div>
        ))}
        <FrontBand f={f} n={5} size={166} seed={11} react={lit} at={-14} x0={-110} x1={700} />
        <Edge side="r" c="#041216" w={90} z={90} top={124} />
      </Cam>
      <BandChip t={`LINE ${R.lines} DOES THE WORK`} c="#041216" fg="#9EE0EE" />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE ROBING ROOM — 19.88 to 22.10s (67f) · TURN
   VO: "where you assign a judge, a prosecutor, and a defense."

   ⛔ IDENTITY IS SHAPE **AND** COLOUR (reel 115: five identical white tiles
   became the loudest thing in that frame). Three sprites, three silhouettes —
   the judge wears a WIG and stands on a step so he is the tallest object; the
   prosecutor carries a red case and a flag quiver; the defense a blue folder and
   a lectern. The names are 17px stencils on the plinths, the size a role plate
   actually is.
   ⛔ THE ARRIVALS ARE ON THE MEASURED WORD ONSETS: judge 20.32s, prosecutor
   21.02s, defense 21.62s -> local f13 / f34 / f52 of this scene.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("robing");
  const AT = [13, 34, 52];
  const dx = LAY[v].c * 0.4;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.42} glow={hexa(p.key, 0.16)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.15} rakeX={RAKE_X[v]} rakeRate={4.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.6} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={8} />
        <Bustle f={f} seed={8} n={1} z={34} />
        <Runner y={104} f={f} z={16} rate={6.4} pitch={188} w={163} h={79}
          c="#8A72B8" c2="#140E22" kind="crate" rail hang={16} o={0.8} />
        {R.roles.map((role, i) => {
          const on = E(f, AT[i], AT[i] + 8, 0, 1, OUT);
          const ax = 200 + i * 306 + dx;
          const size = i === 0 ? 216 : 196;
          const step = i === 0 ? 44 : 0;
          return (
            <React.Fragment key={"r" + i}>
              <Alcove x={ax} y={GY + 6} w={252} h={412} z={22} c={role.c} on={on} t={role.n} />
              {/* ⛔ AN ARRIVAL INSIDE A BOX IS A SMALL EVENT. A 252x412 curtain
                  lifting off each alcove is a large bright area CHANGING, which
                  is the cheapest high-value shape there is — and it is also what
                  a robing room has. */}
              <div style={{ position: "absolute", left: ax - 126, top: GY + 6 - 412,
                width: 252, height: 412 * (1 - E(f, AT[i] - 8, AT[i] + 10, 0, 1, IO)),
                zIndex: 47, overflow: "hidden",
                background: `linear-gradient(180deg, #6E5A88 0%, #3A2E52 100%)` }}>
                {Array.from({ length: 7 }, (_, j) => (
                  <div key={j} style={{ position: "absolute", left: 6 + j * 35, top: 0, width: 18,
                    height: "100%", background: hexa("#2A2040", 0.34) }} />
                ))}
                <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: 15,
                  background: "#8A76A8" }} />
              </div>
              {step > 0 && (
                <div style={{ position: "absolute", left: ax - 84, top: GY - step, width: 168,
                  height: step, zIndex: 44, background: "#6E5A80" }} />
              )}
              <Contact x={ax - size * 0.42} y={GY - step} w={size * 0.84} z={45} o={0.32} />
              <Hero f={f} x={ax} y={GY - step} size={size} z={54} act={i === 0 ? 3 : i}
                ph={i * 1.1} costume={role.costume as any} gaze={i === 2 ? 0.5 : -0.4}
                pop={E(f, AT[i], AT[i] + 7, 0.2, 1, BACK)} stern={i === 0 ? on : 0}
                cheer={i === 1 ? E(f, AT[i] + 10, AT[i] + 18, 0, 0.7, OUT) : 0} />
              {/* the equipment — what makes each a different SILHOUETTE */}
              {i === 0 && on > 0.4 && (<>
                <Wig x={ax} y={GY - step - size * 0.62} s={(size / 236) * 0.92} z={52} />
                <div style={{ position: "absolute", left: ax + 62, top: GY - step - 190, zIndex: 62,
                  opacity: on }}><Gavel x={0} y={0} k={0.4 + Math.sin(f / 9) * 0.16} z={62} s={0.72} /></div>
              </>)}
              {i === 1 && on > 0.4 && (
                <div style={{ position: "absolute", left: ax - 128, top: GY - 176, width: 74,
                  height: 96, zIndex: 62, opacity: on,
                  background: `linear-gradient(180deg, ${RED} 0%, #7A2018 100%)` }}>
                  {[0, 1, 2, 3].map(j => (
                    <div key={j} style={{ position: "absolute", left: 10 + j * 15, top: -34,
                      width: 5, height: 40, background: "#2C2A26" }} />
                  ))}
                </div>
              )}
              {i === 2 && on > 0.4 && (
                <div style={{ position: "absolute", left: ax + 60, top: GY - 152, width: 108,
                  height: 152, zIndex: 62, opacity: on }}>
                  <div style={{ position: "absolute", left: 34, top: 40, width: 40, height: 112,
                    background: "#4A3A50" }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 108, height: 44,
                    transform: "skewY(-14deg)", background: `linear-gradient(180deg, ${TEAL} 0%, #2E6068 100%)` }} />
                </div>
              )}
              {on > 0.9 && <Puff x={ax} y={GY - step} f={f} at={AT[i] + 6} c="#CFC0E0" z={52} n={9} />}
              {/* ⛔ THE WEAKEST SCENE IN THE REEL AT 7.42, AND THE REASON WAS
                  THAT EVERYTHING ARRIVED IN PLACE. The kit is now THROWN to each
                  of them from off-frame — a 420px arc, landing on the same beat
                  the sprite does — which is the only travel this shot can carry
                  and also what a robing room does. */}
              {(() => {
                const k = E(f, AT[i] + 4, AT[i] + 13, 0, 1, IO);
                if (k <= 0 || k >= 1) return null;
                const x0 = i < 2 ? -70 : 1080, y0 = 250;
                const x1 = ax + (i === 0 ? 62 : i === 1 ? -128 : 60), y1 = GY - step - 176;
                return (
                  <div style={{ position: "absolute", left: x0 + (x1 - x0) * k - 34,
                    top: y0 + (y1 - y0) * k - 34 - Math.sin(k * Math.PI) * 96,
                    width: 96, height: 96, zIndex: 68,
                    transform: `rotate(${-160 + k * 200}deg)` }}>
                    <div style={{ position: "absolute", inset: 0, borderRadius: 10,
                      background: `linear-gradient(160deg, ${mxh(role.c, 0.30)} 0%, ${dkh(role.c, 0.26)} 100%)` }} />
                    <div style={{ position: "absolute", left: 12, top: 12, width: 72, height: 16,
                      borderRadius: 4, background: hexa("#FFFFFF", 0.44) }} />
                  </div>
                );
              })()}
            </React.Fragment>
          );
        })}
        <FrontBand f={f} n={6} size={156} seed={25} react={0} at={-16} z={68} />
        <Edge side="l" c="#120C1E" w={86} z={90} top={132} />
      </Cam>
      <BandChip t="JUDGE · PROSECUTOR · DEFENSE" c="#140E22" fg="#D6BCFF" />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE EVIDENCE ROOM — 22.10 to 24.36s (68f) · ESCALATE · RE-FRAMING #2
   VO: "The prosecutor builds a case for everything wrong with your work,"

   ⭐ THE SCENE GETS BRIGHTER AS THE WORK GETS WORSE. Every flag opens a hole,
   and the board's backlight comes THROUGH it — so the light level is a readout
   of the damage. That is the mechanism's OUTPUT, which is the half §10 says
   scenes leave out.
   ⛔ THE VERB IS "BUILDS", so the case is BUILT: the pulled flags stack up the
   right-hand edge as they come out of the quiver.
   ⛔ THE SEAL IS UNTOUCHED. The villain is still winning here.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("board");
  /* fourteen strikes, ACCELERATING, across the FULL duration */
  const AT = Array.from({ length: 14 }, (_, i) => 4 + Math.pow(i / 13, 0.72) * 58);
  const n = AT.filter(a => f >= a).length;
  const glow = Math.min(1, 0.10 + n / 14 * 0.86);
  const last = AT[Math.max(0, n - 1)];
  const strike = E(f, last, last + 3, 1, 0, OUT);
  const dx = LAY[v].b;   /* dHash 8 house/steel at f708 — full offset */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.120]} vig={0.40} glow={hexa("#CFE0F0", 0.10 + glow * 0.20)}>
      <Cam s={1.03} x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="tray"
          rake={0.13} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={9} />
        <Bustle f={f} seed={9} n={1} z={34} />
        {/* the archive the exhibit came out of, behind the light box */}
        <ExhibitWall x={506 + dx} y={706} w={1040} h={300} z={13} f={f} cols={10} rows={3}
          c="#4A5560" lit={0.3} flagged={Math.min(9, n)} />
        <EvidenceBoard x={430 + dx} y={606} w={700} h={452} z={20} glow={glow} f={f} />
        <Brief x={430 + dx} y={596} w={286} s={0.22} z={40} f={f}
          holes={n} flags={Math.max(0, n - 1)} lit={glow * 0.92}
          rot={-1 + strike * 1.6 + PJ[v] * 1.4 + n * 0.42} seed={PJ[v]} />
        {/* ⭐ THE FLAG IN FLIGHT. v1 seated each flag the frame it existed, so
            fourteen strikes produced no TRAVEL at all — the scene measured 6.89
            with the busiest picture in the reel. The newest flag now crosses
            ~300px from the prosecutor's hand in four frames, which is the only
            part of this beat the audit can actually see. */}
        {/* ⛔⛔ ONE FLAG, FOUR FRAMES. Fourteen strikes across 68 frames with a
            single 4-frame flight meant ~56 of those frames had NOTHING crossing
            the panel — which is why the busiest picture in the reel measured 83%
            HOLD. ⭐ The last FIVE are in flight at once on 11-frame arcs, so
            there are always two or three crossing, they spin as they fly, and
            the case visibly builds rather than appearing. */}
        {Array.from({ length: 5 }, (_, q) => {
          const i = n - 1 - q;
          if (i < 0) return null;
          const at = AT[i];
          const k = E(f, at, at + 11, 0, 1, IN_Q);
          if (k >= 1) return null;
          const sd = PJ[v];
          const tx = 430 + dx - 143 + ((26 + ((i + sd) % 4) * 44 + rnd(i + sd * 5, 3) * 16) / 200) * 286;
          const ty = 596 - 372 + ((34 + Math.floor(i / 4) * 54 + rnd(i + sd * 5, 7) * 20) / 260) * 372;
          const x0 = 258 + dx, y0 = GY - 250;
          return (
            <div key={"ff" + i} style={{ position: "absolute", left: x0 + (tx - x0) * k - 3,
              top: y0 + (ty - y0) * k - 40 - Math.sin(k * Math.PI) * 110,
              width: 72, height: 72, zIndex: 66,
              transform: `rotate(${-40 + k * 40 + (1 - k) * 300 * (i % 2 ? 1 : -1)}deg)` }}>
              <svg viewBox="0 0 62 62" width={72} height={72} style={{ overflow: "visible" }}>
                <rect x={5} y={2} width={5} height={56} fill="#2C2A26" />
                <path d="M 10 5 L 50 16 L 10 30 Z" fill={RED} />
                <path d="M 10 5 L 50 16 L 10 18 Z" fill="#E06A56" />
              </svg>
            </div>
          );
        })}
        {/* ⭐ AND THE WORK SAGS UNDER THE CASE. Fourteen flags going in and the
            brief hanging perfectly level is the tell that nothing is landing. */}
        {n > 0 ? (
          <Fall x={430 + dx} y={596} w={300} f={f} at={AT[Math.max(0, n - 1)]} n={5} z={64}
            c="#8A94A0" rate={1.4} />
        ) : null}
        {/* the case being BUILT — the pulled flags stack up the right edge.
            ⭐ The stack's lean is permuted per cut too, so the tallest column is
            in a different place at every sampled instant. */}
        {Array.from({ length: 14 }, (_, i) => {
          if (i >= n) return null;
          return (
            <div key={"st" + i} style={{ position: "absolute",
              left: 806 + ((i + PJ[v]) % 3) * 24 - PJ[v] * 40,
              top: 690 - i * 22, width: 116, height: 20, zIndex: 46,
              transform: `rotate(${(rnd(i, 8) - 0.5) * 7}deg)`,
              background: i % 3 === 0 ? "#B4342A" : "#8E2A22" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 5,
                background: "#E06A56" }} />
            </div>
          );
        })}
        <FrontBand f={f} n={7} size={152} seed={21} react={0} at={-18} z={68} />
        <Contact x={128 + dx} y={GY} w={216} z={41} o={0.34} />
        <Hero f={f} x={186 + dx} y={GY} size={254} z={56} act={1} ph={0.2}
          costume={R.roles[1].costume as any} stern={0.8} drive={0.16 * strike} />
        <Forearm x0={186 + dx + 254 * 0.34} y0={GY - 254 * 0.50}
          x1={310 + dx} y1={GY - 250 - strike * 20} w={25} c={CLAYD} z={58} />
        {n > 0 && <Puff x={430 + dx} y={520} f={f} at={last} c="#D8E4F0" z={62} n={7} s={0.8} />}
        <Edge side="r" c="#0A0F14" w={92} z={90} top={124} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S11 · THE COURT FLOOR — 24.36 to 26.44s (62f) · ESCALATE
   VO: "the defense argues back, and the judge rules on the evidence,"

   ⭐ A REAL EXCHANGE ACROSS THE FULL PANEL — the highest-value motion shape in
   the table, mounted as something the room actually contains rather than as a
   stripe generator. Every crossing folder is >= 64px and travels the whole width.
   ⛔ AND THE GAVEL IS A DISTANCE, NOT A STATE CHANGE: it starts at 0.55 of its
   arc and covers the rest in six frames. Under about a third of its own size and
   it reads as a man holding a hammer.
   ⛔ THE ROOM STOPS WHEN IT LANDS: both pools snap out in ONE frame and a single
   ruling lamp comes up. Silence is an event.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const OUT_AT = [2, 11, 20], BACK_AT = [8, 17];
  /* ⛔ v1 moved the gavel from 0.55 to 1.0 over six frames and called it a
     strike — no windup, so it read as a wobble. A strike is a RAISE you can see
     coming, a fall, and a bounce ([[feedback_make_an_action_read]]). */
  const HITS = [22, 48];
  let rule = 0.50;
  for (const h of HITS) {
    if (f < h - 16) break;
    rule = f < h - 4 ? E(f, h - 16, h - 4, 0.50, 0.04, OUT)
         : f < h ? E(f, h - 4, h, 0.04, 1, IN_Q)
         : 1 + Math.sin((f - h) * 1.6) * 0.12 * Math.exp(-(f - h) / 5);
  }
  rule = Math.max(0, Math.min(1.12, rule));
  const lastH = HITS.filter(h => f >= h).slice(-1)[0];
  const struck = f >= HITS[0] ? 1 : 0;
  const jolt = lastH ? Math.sin((f - lastH) * 1.3) * Math.exp(-(f - lastH) / 6.5) * 16 : 0;
  const lampOn = E(f, 24, 32, 0, 1, OUT);
  const dx = LAY[v].b * 0.35;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.52}
      glow={hexa(struck ? "#FFFFFF" : p.key, struck ? 0.22 * lampOn : 0.16)}>
      <Cam x={dx * 0.3} y={jolt * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.09 * (1 - struck * 0.6)} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="boards" grit={0.7} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={10} />
        <Bustle f={f} seed={10} n={1} z={34} />
        {/* the gallery, behind, in silhouette — the room has a reason to exist */}
        {Array.from({ length: 7 }, (_, i) => (
          <Crew key={"g" + i} f={f} x={92 + i * 138} y={GY - 118} i={i + 2} size={96}
            z={24} at={-20} loop={struck ? 3 : (i % 4)} tint="#241A0C" />
        ))}
        {/* the two hard pools of light, one per table — they SNAP out */}
        {[236, 776].map((px, i) => (
          <Pool key={"pl" + i} x={px + dx} y={586} w={420} c="#FFCE7A"
            o={struck ? 0.04 : 0.46} z={18} />
        ))}
        {[168, 700].map((tx, i) => (<React.Fragment key={"t" + i}>
          <Beam x={tx + dx + 105} y={150} top={120} bot={400} len={440} c="#FFCE7A"
            o={struck ? 0.02 : 0.24} z={17} f={f} />
          <div style={{ position: "absolute", left: tx + dx, top: 592, width: 210,
            height: 100, zIndex: 34, background: `linear-gradient(180deg, #8A5E2E 0%, #33200E 100%)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 13,
              background: "#C08E52" }} />
          </div>
        </React.Fragment>))}
        {/* THE EXCHANGE — full-width, both directions, all >= 64px */}
        {OUT_AT.map((at, i) => {
          const k = E(f, at, at + 12, 0, 1, IO);
          if (k <= 0 || f > at + 16) return null;
          return <Folder key={"o" + i} x={210 + k * 590 + dx} y={430 - Math.sin(k * Math.PI) * 130}
            rot={-30 + k * 260} c={TEAL} s={1.15} z={64} />;
        })}
        {BACK_AT.map((at, i) => {
          const k = E(f, at, at + 12, 0, 1, IO);
          if (k <= 0 || f > at + 16) return null;
          return <Folder key={"b" + i} x={800 - k * 580 + dx} y={470 - Math.sin(k * Math.PI) * 116}
            rot={40 - k * 240} c={RED} s={1.10} z={64} />;
        })}
        {/* the bench, raised, and the gavel that stops the room */}
        <div style={{ position: "absolute", left: 336 + dx, top: 380 + jolt * 0.4, width: 350,
          height: 148, zIndex: 40, background: `linear-gradient(180deg, #8A5E34 0%, #3E2812 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 14,
            background: "#B4854A" }} />
        </div>
        <Contact x={452 + dx} y={402} w={280} z={39} o={0.34} />
        <Hero f={f} x={512 + dx} y={402} size={330} z={44} act={3} ph={1.4}
          costume={R.roles[0].costume as any} stern={1} drive={rule * 0.14} />
        <Wig x={512 + dx} y={402 - 330 * 0.62} s={(330 / 236) * 0.92} z={42} />
        <Gavel x={636 + dx} y={330} k={rule} z={70} s={2.2} />
        {HITS.filter(h => f >= h && f < h + 20).map(h => (
          <React.Fragment key={"hk" + h}>
            <Ring x={690 + dx} y={372} f={f} at={h} c="#FFF2D0" z={74} s={1.6} dur={16} />
            <Ring x={690 + dx} y={372} f={f} at={h + 3} c="#FFF2D0" z={74} s={1.2} dur={14} />
            <Puff x={676 + dx} y={362} f={f} at={h} c="#EFE2C2" z={75} n={9} />
            <Fall x={600 + dx} y={378} w={460} f={f} at={h} n={13} z={73} c="#C8B896" rate={1.8} />
          </React.Fragment>
        ))}
        {/* ⭐ AND THE EVIDENCE ON THE BENCH LEAVES THE TABLE. A strike that moves
            nothing but itself is a gesture; one that throws the papers is a RULING. */}
        {lastH ? [0, 1, 2, 3].map(i => {
          const kk = Math.min(1, (f - lastH) / 18);
          const sd = i % 2 ? 1 : -1;
          return (
            <Folder key={"jp" + i} x={470 + dx + i * 44 + sd * 190 * kk}
              y={372 - 120 * Math.sin(kk * Math.PI) + kk * kk * 210}
              rot={-14 + sd * 220 * kk} c={i % 2 ? RED : TEAL} s={0.9} z={73} />
          );
        }) : null}
        {/* ONE ruling lamp above the bench, and nothing else lit */}
        {lampOn > 0.01 && (<>
          <div style={{ position: "absolute", left: 470 + dx, top: 176, width: 84, height: 26,
            borderRadius: 9, zIndex: 42, background: hexa("#FFF8E4", 0.4 + lampOn * 0.6) }} />
          <Beam x={512 + dx} y={200} top={90} bot={470} len={330} c="#FFF8E4"
            o={0.30 * lampOn} z={41} f={f} />
        </>)}
        <FrontBand f={f} n={6} size={158} seed={23} react={struck ? lampOn : 0} at={-20} z={72} />
        <Contact x={130 + dx} y={GY} w={200} z={41} o={0.30} />
        <Hero f={f} x={186 + dx} y={GY} size={232} z={56} act={1} ph={0.1}
          costume={R.roles[2].costume as any} drive={-0.10 + E(f, 20, 26, 0, 0.22, OUT)}
          shock={struck ? lampOn : 0} />
        <Contact x={796 + dx} y={GY} w={200} z={41} o={0.30} />
        <Hero f={f} x={852 + dx} y={GY} size={232} z={56} act={1} ph={2.0} flip
          costume={R.roles[1].costume as any} stern={0.7} shock={struck ? lampOn : 0} />
        <Edge side="l" c="#0A0704" w={90} z={90} top={126} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · THE PROVING PIT — 26.44 to 28.54s (63f) · **THE PEAK** · RE-FRAMING #3
   VO: "so they loop and rebuild until the work is bulletproof."

   ⭐⭐⭐ THE HERO ARTIFACT IS THE ONE THAT CHANGES. Three passes round the rail,
   each SHORTER than the last (22 / 18 / 14 frames) so the loop visibly
   accelerates, and the brief comes back different every time: pass I cracks the
   gold seal off — the villain's only loss in the reel — pass II bands it in
   steel, pass III returns a solid chamfered plate.
   ⛔ OVERLAPPING ACTION, NEVER QUANTISED STEPS (§13). The carriage runs one
   continuous ease; the hanging brief LAGS in proportion to the carriage's own
   velocity (central difference) and rings out as a damped pendulum after it
   stops. That is what pays for the smoothing: the object keeps moving through
   exactly the frames a stepped version would sit still in.
   ⛔ AND THE ARRIVAL COSTS SOMETHING: the ram lands at f52, the plate does NOT
   deform, a ring travels out, the block recoils and scale falls off it.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pit");
  /* ⛔⛔ SCRAPPED. v1-v3 were a carriage on an orbit — a diagram of a loop, and
     the word the line actually lands on is **BULLETPROOF**, which the orbit never
     touched. ⭐ THIS IS A PROVING RANGE. The same plate is fired on three times
     and you watch what it survives:
        PASS I   it SHATTERS — the whole thing bursts and the pieces fly.
        PASS II  it DENTS — it holds, buckled, and he has to straighten it.
        PASS III it RINGS — unmarked, sparks off it, and the ring is the payoff.
     Loop, rebuild, bulletproof, in that order, with escalating stakes and a
     result you can read without the caption. */
  const FIRE = [14, 34, 56];
  const REBUILD = [22, 44];
  const nf = FIRE.filter(x => f >= x).length;
  const pass = Math.min(2, nf === 0 ? 0 : nf - 1 + (f >= FIRE[Math.min(2, nf - 1)] + 14 ? 1 : 0));
  const stage = Math.min(2, nf === 0 ? 0 : (f >= (REBUILD[nf - 1] ?? 999) ? nf : nf - 1));
  const lastF = FIRE.filter(x => f >= x).slice(-1)[0];
  const hitK = lastF !== undefined ? Math.min(1, (f - lastF) / 16) : 0;
  const recoil = lastF !== undefined
    ? Math.sin((f - lastF) * 1.5) * Math.exp(-(f - lastF) / 5) * 17 : 0;
  /* the ram: winds back, fires, recovers — three times, faster each time */
  const ramK = FIRE.reduce((acc, x, i) => {
    if (f < x - 11) return acc;
    return f < x ? E(f, x - 11, x, 0, 1, IN_Q) : 1 - E(f, x, x + 9 - i * 2, 0, 1, OUT);
  }, 0);
  const PX = 470, PY = 470;
  const dx = LAY[v].c * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.120]} vig={0.42} glow={hexa(p.key, 0.24)}>
      <Cam s={1.02} x={dx * 0.3} y={recoil * 0.4} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="gantry"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.9} lamp={{ x: 470 + dx, y: 150, r: 250 }} window={null} />
        <Fitout p={p} f={f} seed={11} />
        <Bustle f={f} seed={11} n={1} z={34} />

        {/* THE THREE PASS LAMPS — the loop, as a counter you can read */}
        {[0, 1, 2].map(i => (
          <div key={"pl" + i} style={{ position: "absolute", left: 214 + dx + i * 176, top: 196,
            width: 148, height: 52, zIndex: 26, borderRadius: 7, boxShadow: SH,
            background: i <= stage
              ? `linear-gradient(180deg,${mxh(GOLD, 0.4)},${dkh(GOLD, 0.24)})`
              : `linear-gradient(180deg,#3A3126,#1A140C)` }}>
            <div style={{ position: "absolute", left: 0, top: 13, width: 148, textAlign: "center",
              ...mono(26, 800), letterSpacing: 3,
              color: i <= stage ? "#2E2006" : hexa("#8A7A5E", 0.45) }}>
              {["PASS I", "PASS II", "PASS III"][i]}
            </div>
          </div>
        ))}

        {/* THE ANVIL */}
        <div style={{ position: "absolute", left: 300 + dx, top: 588 + recoil * 0.5, width: 340,
          height: 112, zIndex: 44, boxShadow: SH_D,
          background: `linear-gradient(180deg,#4A3E30 0%,#120E08 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 340, height: 14,
            background: "#7E6E58" }} />
        </div>

        {/* ⭐ THE PLATE. Its THICKNESS is the rebuild and its FATE is the point. */}
        {(() => {
          const th = [26, 46, 72][stage];
          const w = 300;
          const burst = stage === 0 && lastF === FIRE[0] ? hitK : 0;
          const dent = stage === 1 && lastF === FIRE[1] ? hitK : 0;
          if (burst > 0.02) {
            return (<>
              {Array.from({ length: 9 }, (_, i) => {
                const sd = i % 2 ? 1 : -1;
                const g = burst * burst;
                return (
                  <div key={"sh" + i} style={{ position: "absolute",
                    left: PX + dx - 150 + i * 34 + sd * (110 + i * 26) * g,
                    top: PY + 96 - 190 * Math.sin(burst * Math.PI) + g * 300,
                    width: 40, height: 26, zIndex: 52, borderRadius: 3,
                    transform: `rotate(${sd * 300 * g + i * 30}deg)`, boxShadow: SH,
                    background: `linear-gradient(160deg,${mxh(GOLD, 0.3)},${dkh(GOLD, 0.34)})` }} />
                );
              })}
            </>);
          }
          return (
            <div style={{ position: "absolute", left: PX + dx - w / 2,
              top: PY + 96 - th + recoil * 0.3, width: w, height: th, zIndex: 52,
              borderRadius: 4, boxShadow: SH_D,
              transform: `scaleY(${1 - dent * 0.22}) rotate(${dent * 3}deg)`,
              transformOrigin: "50% 100%",
              background: stage === 2
                ? `linear-gradient(170deg,#B9C4CE 0%,#71808E 46%,#39434D 100%)`
                : `linear-gradient(170deg,${mxh(GOLD, 0.36)},${dkh(GOLD, 0.28)})` }}>
              {stage === 2 ? [0, 1, 2, 3].map(i => (
                <div key={i} style={{ position: "absolute", left: 18 + i * 72, top: 12,
                  width: 46, height: 8, borderRadius: 4, background: hexa("#EAF2FA", 0.4) }} />
              )) : null}
              {dent > 0.3 ? (
                <div style={{ position: "absolute", left: w * 0.36, top: 0, width: w * 0.28,
                  height: th * 0.4, borderRadius: "0 0 40% 40%",
                  background: hexa("#3A2A0C", 0.45) }} />
              ) : null}
            </div>
          );
        })()}

        {/* the rebuild between passes: courses laid back on, thicker */}
        {REBUILD.map((at, i) => (
          f >= at && f < at + 12 ? (
            <React.Fragment key={"rb" + i}>
              <Puff x={PX + dx} y={PY + 70} f={f} at={at} c="#E4C48A" z={54} n={9} />
              <Fall x={PX + dx} y={PY + 60} w={330} f={f} at={at} n={9} z={53}
                c="#C8A46E" rate={1.4} />
            </React.Fragment>
          ) : null
        ))}

        {/* THE RAM overhead, and it fires three times */}
        <ProvingRam x={PX + dx} y={GY} k={ramK} z={66} drop={220} w={360} h={472} />

        {/* every shot: rings, sparks, grit — and pass III adds a bright RING OUT */}
        {FIRE.filter(x => f >= x && f < x + 22).map((x, i) => (
          <React.Fragment key={"fx" + x}>
            <Ring x={PX + dx} y={PY + 80} f={f} at={x} c="#FFD8A0" z={74} s={2.0} dur={20} />
            <Ring x={PX + dx} y={PY + 80} f={f} at={x + 4} c="#FFD8A0" z={74} s={1.5} dur={16} />
            <Puff x={PX + dx} y={PY + 70} f={f} at={x} c="#E0B080" z={73} n={16} />
            <Fall x={PX + dx} y={PY + 60} w={420} f={f} at={x} n={18} z={72} c="#FF9A4A" rate={1.9} />
          </React.Fragment>
        ))}
        {stage === 2 && lastF === FIRE[2] ? (<>
          <Ring x={PX + dx} y={PY + 60} f={f} at={FIRE[2] + 2} c="#EAF6FF" z={76} s={2.6} dur={26} />
          <Ring x={PX + dx} y={PY + 60} f={f} at={FIRE[2] + 7} c="#EAF6FF" z={76} s={2.2} dur={22} />
          {Array.from({ length: 12 }, (_, i) => {
            const g = Math.min(1, (f - FIRE[2]) / 20);
            const an = (i / 12) * Math.PI * 2;
            return (
              <div key={"sp" + i} style={{ position: "absolute",
                left: PX + dx + Math.cos(an) * 200 * g - 5,
                top: PY + 60 + Math.sin(an) * 120 * g - 5, width: 10, height: 10,
                borderRadius: "50%", zIndex: 77, opacity: 1 - g,
                background: "#FFF0C4" }} />
            );
          })}
        </>) : null}

        <FrontBand f={f} n={5} size={166} seed={13} react={hitK > 0.1 ? 1 : 0} at={-10} />
        <Contact x={790 + dx} y={GY} w={220} z={41} o={0.32} />
        <Hero f={f} x={844 + dx} y={GY} size={252} z={56} act={2} ph={0.6}
          costume={{ constr: 1 }} shock={stage < 2 && hitK < 0.5 ? 0.7 : 0}
          cheer={stage === 2 ? E(f, FIRE[2] + 4, FIRE[2] + 14, 0, 1, OUT) : 0} />
        <Edge side="l" c="#060302" w={86} z={90} top={118} />
      </Cam>
      <BandChip t="UNTIL IT HOLDS" c="#0A0704" fg="#FFCE7A" />
    </Scene>
  );
};

export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("furnace");
  /* ⛔⛔ SCRAPPED. v1 fed CRATES down a belt into a throat — generic cargo, when
     the line says "this burns through TOKENS fast". ⭐ Now the cost is literal
     and it is the highest-motion shape available: a hopper pouring a TORRENT OF
     GOLD TOKENS into the fire, forty of them in the air at once, each one
     flaring out as it hits. The gauge beside it empties while you watch.
     Then he SLAMS the gate — the stream stops dead, the survivors pile up — and
     sets a small rough PROTOTYPE on the bench. Burn, stop, build small. */
  const SHUT = 54;
  const shut = E(f, SHUT, SHUT + 6, 0, 1, IN_Q);
  const burn = f < SHUT ? 1 : 1 - shut;
  const level = Math.max(0.08, 0.94 - E(f, 0, SHUT, 0, 0.72, LIN));
  const set = E(f, 66, 80, 0, 1, OUT);
  const dx = LAY[v].c;
  const HX = 250, MOUTH_X = 596, MOUTH_Y = 520;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.48} glow={hexa(p.key, 0.26 * (0.5 + burn * 0.5))}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="duct"
          rake={0.17} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.9} lamp={{ x: 660 + dx, y: 470, r: 200 }} window={null} />
        <Fitout p={p} f={f} seed={12} />
        <Bustle f={f} seed={12} n={1} z={34} />

        {/* THE HOPPER, and it is visibly emptying */}
        <div style={{ position: "absolute", left: HX + dx - 130, top: 168, width: 260, height: 190,
          zIndex: 42, boxShadow: SH_D,
          background: `linear-gradient(180deg,#5A4A2E 0%,#2A2012 100%)`,
          clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)" }}>
          <div style={{ position: "absolute", left: 0, bottom: 0, width: 260,
            height: `${level * 100}%`, clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
            background: `linear-gradient(180deg,${mxh(GOLD, 0.5)},${dkh(GOLD, 0.1)})` }} />
        </div>
        <div style={{ position: "absolute", left: HX + dx - 34, top: 352, width: 68, height: 44,
          zIndex: 43, background: `linear-gradient(180deg,#6E5A34,#2A2012)` }} />

        {/* ⭐ THE TOKENS. Forty in the air, falling from the hopper into the
            mouth on a parabola, each flaring out where it lands. */}
        {Array.from({ length: 40 }, (_, i) => {
          const P = 44, t = (((f * 1.6 + i * 3.1) / P) % 1 + 1) % 1;
          if (f >= SHUT && t < 0.5) return null;
          const jx = (rnd(i, 3) - 0.5) * 46;
          const x = HX + dx + jx + (MOUTH_X - HX) * t;
          const y = 386 + (MOUTH_Y - 386) * t * t + Math.sin(t * Math.PI) * -40;
          const fade = t > 0.86 ? 1 - (t - 0.86) / 0.14 : 1;
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: x - 15, top: y - 15,
              width: 30, height: 30, borderRadius: "50%", zIndex: 50, opacity: fade * burn,
              transform: `scaleX(${0.5 + Math.abs(Math.sin(f / 3 + i)) * 0.5})`, boxShadow: SH,
              background: `radial-gradient(circle at 36% 30%, #FBE7A8, #A87A22)` }} />
          );
        })}

        {/* THE MOUTH — everything that reaches it goes */}
        <div style={{ position: "absolute", left: MOUTH_X + dx - 108, top: MOUTH_Y - 62,
          width: 216, height: 148, zIndex: 46, boxShadow: SH_D,
          background: "#180C04", border: "10px solid #4A2A12" }}>
          <div style={{ position: "absolute", inset: 8, opacity: 0.25 + burn * 0.75,
            background: `linear-gradient(0deg,#FFD07A 0%,#E0500E 100%)` }} />
        </div>
        <div style={{ position: "absolute", left: MOUTH_X + dx - 108, top: MOUTH_Y - 62,
          width: 216, height: 148 * shut, zIndex: 47,
          background: `linear-gradient(180deg,#4A423A,#241E18)` }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, top: i * 30, width: "100%",
              height: 30, borderBottom: "3px solid #14100C" }} />
          ))}
        </div>
        {burn > 0.2 ? (<>
          <Fall x={MOUTH_X + dx} y={MOUTH_Y - 80} w={240} f={f} at={0} n={14} z={48}
            c="#FFB25A" rate={1.9} />
          <Puff x={MOUTH_X + dx} y={MOUTH_Y - 70} f={f} at={Math.max(0, f - 2)} c="#FFC98A" z={49} n={5} />
        </>) : null}
        {f >= SHUT ? (<>
          <Ring x={MOUTH_X + dx} y={MOUTH_Y} f={f} at={SHUT} c="#FFD8A0" z={62} s={1.6} dur={18} />
          <Puff x={MOUTH_X + dx} y={MOUTH_Y - 40} f={f} at={SHUT} c="#E0B080" z={62} n={12} />
          {/* the survivors: tokens that did not go in, piling on the sill */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"sv" + i} style={{ position: "absolute",
              left: MOUTH_X + dx - 120 + i * 28 + (i % 2) * 9,
              top: MOUTH_Y + 78 - (i % 3) * 12, width: 30, height: 30, borderRadius: "50%",
              zIndex: 51, opacity: E(f, SHUT + 2 + i, SHUT + 8 + i, 0, 1, OUT), boxShadow: SH,
              background: `radial-gradient(circle at 36% 30%, #FBE7A8, #A87A22)` }} />
          ))}
        </>) : null}

        {/* the gauge, and it is the whole cost argument in one line */}
        <FuelColumn x={92 + dx} y={GY} h={470} w={116} level={level} z={52} f={f} />

        {/* embers never stop, so the second half cannot go still */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"eb" + i} style={{ position: "absolute",
            left: 150 + i * 74 + Math.sin(f / 8 + i * 1.7) * 26 + dx,
            top: 700 - ((f * (2.6 + (i % 3) * 0.8) + i * 52) % 330),
            width: 15, height: 15, borderRadius: 8, zIndex: 50,
            background: hexa("#FFD08A", (0.24 + (i % 4) * 0.16) * (0.4 + burn * 0.6)) }} />
        ))}

        {/* ⭐ AND THEN THE SMALL ONE. "Build your basic prototype first" — a rough
            uncased thing, set down deliberately once the fire is shut. */}
        <div style={{ position: "absolute", left: 300 + dx, top: 566 - (1 - set) * 210,
          width: 232, height: 158, zIndex: 58, opacity: set, boxShadow: SH_D,
          transform: `rotate(${(1 - set) * -12}deg)` }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 5,
            background: `linear-gradient(168deg,#8A94A0,#4A545E)`,
            border: "7px dashed #B6C0CA" }} />
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 20 + i * 68, top: 34,
              width: 52, height: 34, borderRadius: 4, background: hexa("#C6D0DA", 0.5) }} />
          ))}
          <div style={{ position: "absolute", left: 0, top: 104, width: 232, textAlign: "center",
            ...mono(26, 800), letterSpacing: 2, color: hexa("#E4ECF4", 0.85) }}>PROTOTYPE</div>
        </div>
        {set > 0.85 ? <Puff x={416 + dx} y={716} f={f} at={78} c="#C8B896" z={59} n={7} /> : null}

        <FrontBand f={f} n={5} size={164} seed={17} react={f >= SHUT ? 1 : 0} at={-12} />
        <Contact x={782 + dx} y={GY} w={216} z={41} o={0.32} />
        <Hero f={f} x={836 + dx} y={GY} size={248} z={56} act={1} ph={1.2}
          costume={{ constr: 1 }} strain={burn * 0.4}
          cheer={E(f, SHUT + 6, SHUT + 16, 0, 1, OUT)} />
        <Forearm x0={836 + dx - 248 * 0.34} y0={GY - 248 * 0.50}
          x1={MOUTH_X + dx + 118} y1={MOUTH_Y - 20} w={25} c={CLAYD} z={58} />
        <Edge side="r" c="#0E0602" w={84} z={90} top={120} />
      </Cam>
      <BandChip t="PROTOTYPE FIRST" c="#140802" fg="#FFC98A" />
    </Scene>
  );
};

export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  /* ⛔⛔ SCRAPPED. The line is "**TRIGGER** the Judge Loop **BEFORE** your launch"
     and v1 showed neither — a thing was thrown onto a cradle and some doors
     cracked. ⭐ Now the whole shot is the ORDER OF TWO ACTIONS: the launch doors
     are already opening on a bright bay with the finished work sitting on the
     cradle, and he reaches PAST the launch handle to slam the JUDGE LOOP lever
     FIRST. The loop lamp goes green, the seal drops onto the work, and only
     THEN do the doors open the rest of the way. Trigger, then launch. */
  const REACH = 3, PULL = 11, GREEN = 17, SEAL = 24, GO = 33;
  const pull = E(f, PULL, PULL + 5, 0, 1, IN_Q);
  const green = E(f, GREEN, GREEN + 6, 0, 1, OUT);
  const seal = E(f, SEAL, SEAL + 8, 0, 1, BACK);
  const doors = E(f, 0, 12, 0, 0.22, OUT) + E(f, GO, GO + 16, 0, 0.62, IO);
  const roll = E(f, GO + 5, GO + 21, 0, 1, IN_Q);
  const dx = LAY[v].b * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.34} glow={hexa(p.key, 0.16 + green * 0.12)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
          rake={0.06} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.5} lamp={null} window={null} />
        <Fitout p={p} f={f} seed={13} />
        <Bustle f={f} seed={13} n={1} z={34} />

        {/* the bay beyond — bright, and it widens only after the lever */}
        <div style={{ position: "absolute", left: 506 + dx - 250, top: 210, width: 500, height: 350,
          zIndex: 14, overflow: "hidden",
          background: `linear-gradient(180deg,#F6FAFF 0%,#CFE2F4 60%,#A8C2DC 100%)` }}>
          {[0, 1, 2, 3].map(i => (
            <div key={"hz" + i} style={{ position: "absolute", left: 40 - i * 12, top: 60 + i * 62,
              width: 420 + i * 30, height: 10, background: hexa("#7E9AB4", 0.4 - i * 0.07) }} />
          ))}
        </div>
        {[0, 1].map(i => (
          <div key={"d" + i} style={{ position: "absolute",
            left: 506 + dx - 250 + i * 250 - (i === 0 ? doors * 250 : 0),
            top: 210, width: 250 + (i === 1 ? doors * 250 : 0) * 0, height: 350, zIndex: 18,
            transform: `translateX(${(i === 0 ? -1 : 1) * doors * 250}px)`,
            background: `linear-gradient(${i === 0 ? 100 : 260}deg,#8A99A8 0%,#3E4A56 100%)`,
            boxShadow: SH_D }}>
            {[0, 1, 2].map(k2 => (
              <div key={k2} style={{ position: "absolute", left: 0, top: 40 + k2 * 100,
                width: "100%", height: 14, background: hexa("#B6C4D2", 0.4) }} />
            ))}
          </div>
        ))}

        {/* ⭐ THE TWO CONTROLS, SIDE BY SIDE — and the ORDER is the whole scene */}
        <div style={{ position: "absolute", left: 690 + dx, top: 470, width: 250, height: 152,
          zIndex: 46, borderRadius: 8, boxShadow: SH_D,
          background: `linear-gradient(180deg,#4A545E,#1E262E)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 250, height: 12,
            background: "#6E7C8A" }} />
        </div>
        {/* the JUDGE LOOP lever — the one he pulls FIRST */}
        <div style={{ position: "absolute", left: 748 + dx, top: 470, width: 0, height: 0, zIndex: 52,
          transform: `rotate(${-42 + pull * 78}deg)`, transformOrigin: "0 0" }}>
          <div style={{ position: "absolute", left: -11, top: -132, width: 22, height: 138,
            borderRadius: 11, background: `linear-gradient(90deg,#A8B4C0,#4E5862)` }} />
          <div style={{ position: "absolute", left: -26, top: -164, width: 52, height: 52,
            borderRadius: "50%", boxShadow: SH,
            background: `radial-gradient(circle at 36% 30%, #F4A28C, #A8321E)` }} />
        </div>
        <div style={{ position: "absolute", left: 690 + dx, top: 592, width: 250, textAlign: "center",
          ...mono(24, 800), letterSpacing: 2, zIndex: 47, color: hexa("#CFE0F0", 0.9) }}>JUDGE LOOP</div>
        {/* the loop lamp: red until he pulls, green after */}
        <div style={{ position: "absolute", left: 872 + dx, top: 496, width: 46, height: 46,
          borderRadius: "50%", zIndex: 48, boxShadow: SH,
          background: green > 0.5
            ? `radial-gradient(circle at 36% 30%, #B6F6D2, #1E8A56)`
            : `radial-gradient(circle at 36% 30%, #F0A090, #8A2418)` }} />
        {green > 0.1 ? <Ring x={895 + dx} y={519} f={f} at={GREEN} c="#7EE0AC" z={54} /> : null}

        {/* THE WORK on the cradle, and the seal that drops on it after the loop */}
        <div style={{ position: "absolute", left: 236 + dx, top: 560, width: 300, height: 46,
          zIndex: 40, borderRadius: 5, boxShadow: SH,
          background: `linear-gradient(180deg,#7E8A96,#39434D)` }} />
        <div style={{ position: "absolute", left: 262 + dx + roll * 420, top: 452,
          width: 250, height: 112, zIndex: 44, borderRadius: 6, boxShadow: SH_D,
          transform: `rotate(${roll * 5}deg)`,
          background: `linear-gradient(168deg,#6E7C8A 0%,#3E4A56 46%,#1C242E 100%)` }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: 20 + i * 74, top: 22, width: 52,
              height: 10, borderRadius: 5, background: hexa("#EAF2FA", 0.6) }} />
          ))}
          {seal > 0.05 ? (
            <div style={{ position: "absolute", left: 88, top: 52, width: 74, height: 74,
              borderRadius: "50%", opacity: Math.min(1, seal), boxShadow: SH,
              transform: `scale(${E(f, SEAL, SEAL + 8, 1.9, 1, IN_Q)})`,
              background: `radial-gradient(circle at 36% 30%, #7EE0AC, #1E8A56)` }}>
              <div style={{ position: "absolute", left: 18, top: 38, width: 16, height: 6,
                borderRadius: 3, background: "#04241C", transform: "rotate(44deg)" }} />
              <div style={{ position: "absolute", left: 27, top: 26, width: 30, height: 6,
                borderRadius: 3, background: "#04241C", transform: "rotate(-44deg)" }} />
            </div>
          ) : null}
        </div>
        {seal > 0.5 ? <Ring x={387 + dx} y={540} f={f} at={SEAL + 4} c="#7EE0AC" z={50} s={1.5} /> : null}
        {f >= GO ? (<>
          <Puff x={340 + dx} y={604} f={f} at={GO} c="#D6E2EE" z={49} n={12} />
          <Fall x={400 + dx} y={596} w={460} f={f} at={GO} n={13} z={48} c="#B6C4D2" rate={1.9} />
          <Ring x={506 + dx} y={540} f={f} at={GO} c="#EAF4FF" z={50} s={1.8} dur={20} />
          {/* the wake behind it, so a 250px object crossing 420px reads as SPEED */}
          {Array.from({ length: 6 }, (_, i) => {
            const g = Math.max(0, roll - i * 0.09);
            if (g <= 0) return null;
            return (
              <div key={"wk" + i} style={{ position: "absolute", left: 262 + dx + g * 420,
                top: 452, width: 250, height: 112, zIndex: 43, borderRadius: 6,
                opacity: 0.18 * (1 - i / 6),
                background: `linear-gradient(168deg,#6E7C8A,#1C242E)` }} />
            );
          })}
          {/* and the bay light floods the room once the doors are wide */}
          <div style={{ position: "absolute", left: -60, top: 0, width: 1140, height: 792,
            zIndex: 19, opacity: E(f, GO + 6, GO + 18, 0, 0.34, OUT),
            background: `radial-gradient(ellipse at 50% 42%, ${hexa("#F4FAFF", 0.62)}, ${hexa("#F4FAFF", 0)} 62%)` }} />
        </>) : null}

        {/* he reaches PAST the launch handle for the loop lever */}
        <Contact x={640 + dx} y={GY} w={220} z={41} o={0.32} />
        <Hero f={f} x={606 + dx} y={GY} size={262} z={56} act={1} ph={0.5}
          costume={{ constr: 1 }} drive={E(f, REACH, PULL, 0, 0.24, OUT)}
          strain={pull * 0.5} cheer={green} />
        <Forearm x0={606 + dx + 262 * 0.30} y0={GY - 262 * 0.50}
          x1={748 + dx - Math.sin((-42 + pull * 78) * Math.PI / 180) * 120}
          y1={470 - Math.cos((-42 + pull * 78) * Math.PI / 180) * 120} w={26} c={CLAYD} z={58} />
        <FrontBand f={f} n={5} size={160} seed={19} react={green} at={-12} />
        <Edge side="l" c="#1A222A" w={78} z={90} top={140} />
      </Cam>
      <BandChip t="TRIGGER IT BEFORE YOU LAUNCH" c="#0A1016" fg="#CFE0F0" />
    </Scene>
  );
};

export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("steps");
  const hit = Math.max(0, Math.min(5, Math.floor((f - 12) / 3.2) + 1));
  const markIn = E(f, 28, 34, 0, 1, BACK);
  const dx = LAY[v].c * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.095]} vig={0.40} glow={hexa(p.key, 0.20)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="none"
          rake={0.15} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.6} lamp={null}
          window={{ x: 386, y: 210, w: 240, h: 260 }} />
        <Fitout p={p} f={f} seed={14} />
        <Bustle f={f} seed={14} n={1} z={34} />
        {/* the doors spilling light, and the crowd walking in past him */}
        <Pool x={506 + dx} y={496} w={620} c="#FFD8A0" o={0.34} z={19} />
        <StepPlate x={506 + dx} y={GY + 14 - (1 - E(f, 0, 11, 0, 1, BACK)) * 210} w={620}
          hit={hit} z={60} />
        {markIn > 0.01 && (
          /* ⛔ NOTHING LANDS ON THE ONE WORD THE PICTURE SPELLS OUT. At GY-196
             the mark's plate (114px tall) overlapped the step plate's top edge
             and covered the U of JUDGE on the closing frame. */
          <div style={{ position: "absolute", left: 506 + dx - 57, top: GY - 306, zIndex: 78,
            transform: `scale(${markIn})` }}>
            <Mark x={0} y={0} s={88} z={78} plate />
          </div>
        )}
        {/* ⛔ 3.82 MOTION, THE WEAKEST SCENE IN THE REEL: four sprites standing
            on a plate while five letters appeared. They now WALK the full panel
            toward the open doors — four 160px bodies crossing 300px each in 38
            frames is the only large travel this shot can carry. */}
        {/* ⛔ THEY MUST STILL BE IN FRAME ON THE LAST FRAME. v1 walked them 340px
            and the closing beat — the frame a viewer screenshots — was an empty
            step with a plate on it. 210px keeps the cast in the picture while
            still reading as a crowd going in. */}
        {/* ⛔ THE BAND GOES **BEHIND** THE KEYWORD HERE. Everywhere else it is
            the near plane; on the CTA it was covering the one word the picture
            spells out in full, which is the whole call to action. */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <Crew key={"c" + i} f={f} x={-70 + i * 172 + E(f, 0, dur, 0, 240, LIN) + dx}
            y={GY + 52} i={i + 4} size={170} z={44} at={-10 + i * 3} loop={0} />
        ))}
        {/* ⛔ WHAT THE DOOR OPENS ON MUST BE A PLACE, NOT A CREAM SLAB — the
            same note the muster hall got. It is a lit hall receding away, with
            lamp bars and figures already inside it, widening as they walk in. */}
        {(() => {
          const w0 = 240 + E(f, 0, dur, 0, 176, OUT);
          const x0 = 506 + dx - w0 / 2;
          return (
            <div style={{ position: "absolute", left: x0, top: 212, width: w0, height: 258,
              zIndex: 17, overflow: "hidden",
              background: `linear-gradient(180deg, ${dkh("#5A4230", 0.14)} 0%, ${mxh(p.key, 0.12)} 58%, ${mxh(p.key, 0.34)} 100%)` }}>
              {[0, 1, 2].map(i => (
                <div key={"lw" + i} style={{ position: "absolute", left: -14 + i * 14, top: 0,
                  width: 74 - i * 18, height: "100%", background: dkh("#4A3220", 0.08 + i * 0.05),
                  transform: "skewX(12deg)" }} />
              ))}
              {[0, 1, 2].map(i => (
                <div key={"rw" + i} style={{ position: "absolute", right: -14 + i * 14, top: 0,
                  width: 74 - i * 18, height: "100%", background: dkh("#4A3220", 0.11 + i * 0.05),
                  transform: "skewX(-12deg)" }} />
              ))}
              {[0, 1, 2].map(i => (
                <div key={"lb" + i} style={{ position: "absolute", left: w0 * 0.20 - i * 8,
                  top: 26 + i * 52, width: w0 * 0.60 + i * 24, height: 15, borderRadius: 5,
                  background: mxh(p.key, 0.86 - i * 0.14) }} />
              ))}
              {[0, 1].map(i => (
                <div key={"fg" + i} style={{ position: "absolute", left: w0 * 0.34 + i * w0 * 0.22,
                  top: 168, width: 36, height: 66, borderRadius: 5,
                  background: dkh("#3A2408", 0.05) }} />
              ))}
            </div>
          );
        })()}
        <Contact x={824 + dx} y={GY} w={214} z={41} o={0.32} />
        <Hero f={f} x={876 + dx} y={GY} size={252} z={56} act={2} ph={0.2}
          costume={{ constr: 1 }} cheer={markIn} gaze={-0.6} />
        <Edge side="r" c="#160F12" w={90} z={90} top={126} />
      </Cam>
      <BandChip t={`COMMENT ${R.keyword}`} c={GREEN} fg="#04241C" />
    </Scene>
  );
};
