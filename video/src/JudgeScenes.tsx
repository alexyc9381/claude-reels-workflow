import React from "react";
import { useCurrentFrame } from "remotion";
import {
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
  ({ f, n = 7, size = 168, seed = 0, react = 0, at = -22, z = 70, x0 = -90, x1 = 1102 }) => (
  <Gallery f={f} x0={x0} x1={x1} y={GY + 96} n={n} ranks={1} size={size} z={z}
    at={at} react={react} seed={seed} />
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
  const grip = E(f, 2, 8, 0, 1, OUT);
  const bow = E(f, 10, 18, 0, 1, OUT) - E(f, 18, 24, 0, 1, IO);   /* it refuses first */
  const pull = E(f, 18, 58, 0, 1, IO);
  const k = E(f, 20, 62, 0, 1, LIN);                              /* the COUNT */
  const land = E(f, 60, 66, 0, 1, BACK);
  const strain = Math.min(1, grip * 0.4 + pull * 0.75) * (1 - E(f, 62, 70, 0, 0.9, OUT));
  const dx = LAY[v].a;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.50} glow={hexa(p.key, 0.16)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
          rake={0.11} rakeX={RAKE_X[v]} rakeRate={3.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.8} lamp={{ x: 350 + dx, y: 128, r: 220 }} window={null} />
        {/* the background process: a pipe run overhead, always moving */}
        <Runner y={112} f={f} z={17} rate={7.8} pitch={182} w={161} h={82}
          c="#4A6A5E" c2="#0A1614" kind="cell" rail hang={0} o={0.9} />

        {/* the plinth the gauge is bolted to — it takes the load too */}
        <div style={{ position: "absolute", left: 300 + dx, top: 520 + land * 6, width: 330,
          height: 200, zIndex: 30, background: `linear-gradient(180deg, #2A3A34 0%, #0E1A16 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 12,
            background: "#44605A" }} />
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ position: "absolute", left: 24 + i * 84, top: 26, width: 16,
              height: 16, borderRadius: 8, background: "#16241E" }} />
          ))}
        </div>
        <AccuracyDial x={465 + dx} y={410 - bow * 8} d={410} k={k} z={44} f={f} />

        {/* the linkage from the dial to the lever — the two are one machine */}
        <svg viewBox="0 0 1012 792" width={1012} height={792}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 42, overflow: "visible" }}>
          <path d={`M ${640 + dx} ${430 + bow * 14} L ${760 + dx} ${470 - pull * 40}`}
            fill="none" stroke="#59636D" strokeWidth={16} strokeLinecap="round" />
          <path d={`M ${640 + dx} ${430 + bow * 14} L ${760 + dx} ${470 - pull * 40}`}
            fill="none" stroke="#8C98A4" strokeWidth={5} strokeLinecap="round" />
        </svg>
        {/* the lever he hauls */}
        <div style={{ position: "absolute", left: 758 + dx, top: 470 - pull * 40, width: 0, height: 0,
          zIndex: 50, transform: `rotate(${-52 + pull * 96}deg)`, transformOrigin: "0 0" }}>
          <div style={{ position: "absolute", left: -8, top: -230, width: 17, height: 236,
            borderRadius: 8, background: `linear-gradient(90deg, #98A4B0 0%, #4A545E 100%)` }} />
          <div style={{ position: "absolute", left: -24, top: -262, width: 48, height: 48,
            borderRadius: "50%", background: `linear-gradient(160deg, ${RED} 0%, #7A2018 100%)` }} />
        </div>

        <Contact x={790 + dx} y={GY} w={230} z={41} o={0.34} />
        <Hero f={f} x={848 + dx} y={GY} size={262} z={56} act={1} ph={0.4}
          costume={{ constr: 1 }} strain={strain} drive={-pull * 0.14} stern={strain} />
        <Forearm x0={848 + dx - 262 * 0.34} y0={GY - 262 * 0.50}
          x1={772 + dx} y1={470 - pull * 40 - 150 + pull * 120} w={25} c={CLAYD} z={58} />
        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART. A pressing sprite's
            head is the one thing not acting, so it steams. */}
        <Steam x={848 + dx} y={GY - 268} f={f} at={16} n={9} z={62} s={1.15} c="#CFE4DA" />
        <Sweat x={848 + dx} y={GY - 200} f={f} at={30} n={7} z={63} />
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
  const drop = E(f, 2, 8, 0, 1, IN_Q);
  const flag = E(f, 8, 12, 0, 1, BACK);
  const sweep = E(f, 10, 34, 0, 1, LIN);
  const bell = E(f, 34, 38, 0, 1, BACK);
  const dx = LAY[v].b;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.120]} vig={0.46} glow={hexa(p.key, 0.20)}>
      <Cam s={1.04} x={dx * 0.4} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
          rake={0.09} rakeX={RAKE_X[v]} rakeRate={4.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 520 + dx, y: 160, r: 250 }} window={null} />
        <Runner y={96} f={f} z={17} rate={9.6} pitch={168} w={148} h={76}
          c="#6E5A2E" c2="#120E06" kind="crate" rail o={0.85} />
        <div style={{ position: "absolute", left: 180 + dx, top: 560, width: 660, height: 170,
          zIndex: 28, background: `linear-gradient(180deg, #4A3A22 0%, #1C1408 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 13,
            background: "#7A6034" }} />
        </div>
        <MinuteTimer x={470 + dx} y={400} d={280} k={sweep} flag={flag} z={50} />
        {/* the brass token falling into the throat — the whole "setup" gesture */}
        <div style={{ position: "absolute", left: 596 + dx, top: 236 + drop * 92, width: 40,
          height: 40, borderRadius: "50%", zIndex: 54, opacity: 1 - E(f, 8, 11, 0, 1, LIN),
          background: `linear-gradient(160deg, #F0D89E 0%, #8A6626 100%)` }} />
        {bell > 0.01 && <Ring x={470 + dx} y={400} f={f} at={34} c={SODIUM} z={70} s={1.4} dur={18} />}
        <Contact x={786 + dx} y={GY} w={210} z={41} o={0.32} />
        <Hero f={f} x={840 + dx} y={GY} size={244} z={56} act={2} ph={0.8}
          costume={{ constr: 1 }} cheer={bell} gaze={-0.6} />
        <Forearm x0={840 + dx - 244 * 0.34} y0={GY - 244 * 0.50}
          x1={636 + dx} y1={300} w={24} c={CLAYD} z={58} />
        <FrontBand f={f} n={4} size={176} seed={3} react={bell} at={-14} x0={-110} x1={640} />
        <Edge side="r" c="#0A1610" w={88} z={90} top={130} />
      </Cam>
      <BandChip t="1 MINUTE TO SET UP" c={SODIUM} fg="#2A1C04" />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE DELIVERY DOCK — 7.04 to 9.96s (88f) · ESCALATE
   VO: "People are using it to ship entire apps, websites, and tools from a
        single prompt,"

   ⛔ THREE DOORS IS NOT THREE CONTAINERS (§3). Each opening shows a DIFFERENT
   machine finishing a DIFFERENT job: a list landing row by row, a page
   assembling nav-hero-cards, a spindle cutting a part. The doors are staggered
   across the FULL duration, not bunched in the first third.
   ====================================================================== */
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
        <Runner y={126} f={f} z={16} rate={6.7} pitch={172} w={153} h={79}
          c="#B08A4A" c2="#1A0A06" kind="load" rail hang={18} o={0.85} />
        {/* the overhead that makes the press read: one shaped cone on the ram,
            never a full-frame fill */}
        <Beam x={420 + dx} y={96} top={150} bot={520} len={460} c="#FFD8A0" o={0.30} z={22} f={f} />
        <SealPress x={420 + dx} y={GY + 26} f={f} drop={drop} struck={struck} z={40} s={1.06}>
          {/* the mark arriving IN the brass — a mark, never a sentence */}
          <div style={{ position: "absolute", left: 118, top: 322, zIndex: 6, opacity: struck }}>
            <MarkCast x={70} y={22} s={86} z={6} o={struck} f={f} spin={0} pulse={struck} />
          </div>
        </SealPress>
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
        <div style={{ position: "absolute", left: 176 + dx, top: 380 + drop * 250, width: 132,
          height: 108, zIndex: 60, opacity: 1 - E(f, 22, 30, 0, 1, LIN),
          transform: `rotate(${carry * 8 - drop * 12}deg)` }}>
          <div style={{ position: "absolute", inset: 0, background: "#8A5E2E",
            border: "6px solid #4A2E10" }} />
          <div style={{ position: "absolute", left: 8, top: 22, width: 116, height: 8, background: "#C08A3E" }} />
          <div style={{ position: "absolute", left: 8, top: 62, width: 116, height: 8, background: "#C08A3E" }} />
        </div>
        {drop > 0.9 && <Ring x={242 + dx} y={GY - 20} f={f} at={19} c="#FFE0A0" z={64} s={1.6} dur={22} />}
        {drop > 0.9 && <Puff x={242 + dx} y={GY - 6} f={f} at={19} c="#E0C48A" z={62} n={15} />}

        {/* THE BACK RANK — 6, smaller, darker clay */}
        {back.map(i => (
          <Crew key={"b" + i} f={f} x={140 + i * 152 + dx} y={GY - 62} i={i + 4} size={104}
            z={36} at={30 + i * 6} loop={(i + 1) % 4} tint="#8A4A2E" />
        ))}
        {/* THE FRONT RANK — 5, bigger, full clay, staggered across the FULL shot */}
        {front.map(i => (
          <Crew key={"f" + i} f={f} x={186 + i * 158 + dx} y={GY + 42} i={i} size={138}
            z={50} at={36 + i * 9} loop={i % 4} />
        ))}
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
                <Wig x={ax} y={GY - step - size * 0.86} s={size / 236} z={61} />
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
        {/* the archive the exhibit came out of, behind the light box */}
        <ExhibitWall x={506 + dx} y={706} w={1040} h={300} z={13} f={f} cols={10} rows={3}
          c="#4A5560" lit={0.3} flagged={Math.min(9, n)} />
        <EvidenceBoard x={430 + dx} y={606} w={700} h={452} z={20} glow={glow} f={f} />
        <Brief x={430 + dx} y={596} w={286} s={0.22} z={40} f={f}
          holes={n} flags={Math.max(0, n - 1)} lit={glow * 0.92}
          rot={-1 + strike * 1.6 + PJ[v] * 1.4} seed={PJ[v]} />
        {/* ⭐ THE FLAG IN FLIGHT. v1 seated each flag the frame it existed, so
            fourteen strikes produced no TRAVEL at all — the scene measured 6.89
            with the busiest picture in the reel. The newest flag now crosses
            ~300px from the prosecutor's hand in four frames, which is the only
            part of this beat the audit can actually see. */}
        {n > 0 && (() => {
          const i = n - 1, at = AT[i];
          const k = E(f, at, at + 4, 0, 1, IN_Q);
          if (k >= 1) return null;
          const sd = PJ[v];
          const tx = 430 + dx - 143 + ((26 + ((i + sd) % 4) * 44 + rnd(i + sd * 5, 3) * 16) / 200) * 286;
          const ty = 596 - 372 + ((34 + Math.floor(i / 4) * 54 + rnd(i + sd * 5, 7) * 20) / 260) * 372;
          const x0 = 258 + dx, y0 = GY - 250;
          return (
            <div style={{ position: "absolute", left: x0 + (tx - x0) * k - 3,
              top: y0 + (ty - y0) * k - 40 - Math.sin(k * Math.PI) * 70,
              width: 62, height: 62, zIndex: 66,
              transform: `rotate(${-40 + k * 40}deg)` }}>
              <svg viewBox="0 0 62 62" width={62} height={62} style={{ overflow: "visible" }}>
                <rect x={5} y={2} width={5} height={56} fill="#2C2A26" />
                <path d="M 10 5 L 50 16 L 10 30 Z" fill={RED} />
                <path d="M 10 5 L 50 16 L 10 18 Z" fill="#E06A56" />
              </svg>
            </div>
          );
        })()}
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
      <BandChip t="IT PROSECUTES YOUR OWN WORK" c="#0A0F14" fg="#DCE8F2" />
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
  const rule = E(f, 31, 37, 0.55, 1, IN_Q);
  const struck = f >= 36 ? 1 : 0;
  const jolt = f > 36 ? Math.sin((f - 36) * 1.3) * Math.exp(-(f - 36) / 6.5) * 14 : 0;
  const lampOn = E(f, 38, 46, 0, 1, OUT);
  const dx = LAY[v].b * 0.35;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.52}
      glow={hexa(struck ? "#FFFFFF" : p.key, struck ? 0.22 * lampOn : 0.16)}>
      <Cam x={dx * 0.3} y={jolt * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="joist"
          rake={0.09 * (1 - struck * 0.6)} rakeX={RAKE_X[v]} rakeRate={3.0 * RAKE_K[v]}
          rakeN={RAKE_N[v]} floorKind="boards" grit={0.7} lamp={null} window={null} />
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
        <Contact x={452 + dx} y={392} w={166} z={39} o={0.30} />
        <Hero f={f} x={512 + dx} y={392} size={196} z={44} act={3} ph={1.4}
          costume={R.roles[0].costume as any} stern={1} drive={rule * 0.12} />
        <Wig x={512 + dx} y={392 - 196 * 0.86} s={0.86} z={46} />
        <Gavel x={588 + dx} y={352} k={rule} z={70} s={1.5} />
        {struck === 1 && <Ring x={640 + dx} y={392} f={f} at={36} c="#FFF2D0" z={74} s={1.5} dur={16} />}
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
      <BandChip t="IT RULES ON EVIDENCE" c="#0A0704" fg="#FFCE7A" />
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
  /* three passes, each SHORTER than the one before, so the loop visibly
     accelerates and the third arrival lands on the word "bulletproof" */
  const PASS: Array<[number, number]> = [[2, 24], [24, 42], [42, 55]];
  const ARC = [1, 1, 0.5];              /* pass III is a HALF turn, so it ENDS at
                                           the bottom — on the anvil */
  const BASE = [0, 1, 2];
  let pi = 0;
  for (let i = 0; i < PASS.length; i++) if (f >= PASS[i][0]) pi = i;
  const [pa, pb] = PASS[pi];
  const carriage = (g: number) => E(g, pa, pb, 0, 1, IO);
  const k = carriage(f);
  /* ⛔ OVERLAPPING ACTION, NEVER QUANTISED STEPS (§13). The carriage runs one
     continuous ease; the hanging load LAGS in proportion to the carriage's own
     velocity (central difference) and rings out as a damped pendulum after it
     stops. That is what pays for the smoothing — the load keeps moving through
     exactly the frames a stepped version would sit still in. */
  const vel = (carriage(f + 1) - carriage(f - 1)) * 0.5;
  const ring = f > pb ? Math.sin((f - pb) * 0.62) * Math.exp(-(f - pb) / 6.5) * 26 : 0;
  const lag = -vel * 620 + ring;
  const th = (BASE[pi] + k * ARC[pi]) * Math.PI * 2 - Math.PI / 2;
  const CX = 470, CY = 244, RR = 326, RY = 150;
  const bx = CX + Math.cos(th) * RR + lag;
  const by = CY + Math.sin(th) * RY + 186;
  /* the hero artifact's STATE is the story: gold+hollow -> seal cracked ->
     banded -> a solid chamfered plate */
  const state = [0, 0.52, 0.80, 1][Math.min(3, pi + (k > 0.88 ? 1 : 0))];
  const crack = pi === 0 ? E(f, 13, 22, 0, 1, OUT) : 0;
  /* the hammer: the tie rods lead, the mass follows, and it retracts after */
  const ram = E(f, 49, 53, 0, 1, IN_Q) - E(f, 58, 63, 0, 1, IO);
  const hit = f >= 52 ? 1 : 0;
  const recoil = f > 52 ? Math.sin((f - 52) * 1.5) * Math.exp(-(f - 52) / 5) * 15 : 0;
  const dx = LAY[v].c * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.120]} vig={0.42} glow={hexa(p.key, 0.24)}>
      <Cam s={1.02} x={dx * 0.3} y={recoil * 0.4} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="gantry"
          rake={0.11} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.9} lamp={null} window={null} />

        {/* ⭐⭐ THE FURNACE TRENCH. This set is the darkest in the reel and it can
            be, because everything that matters is a SILHOUETTE against a hot
            floor: the anvil, the hammer and the hero are all read as dark shapes
            on a bright field, which is the biggest value gap after the hook and
            the one thing "I can't tell what that is" is usually missing. */}
        <div style={{ position: "absolute", left: 20 + dx, top: 596, width: 972, height: 196,
          zIndex: 12, background: `linear-gradient(0deg, #FFE0A0 0%, #FF8A32 40%, ${hexa("#FF8A32", 0)} 100%)` }} />
        <div style={{ position: "absolute", left: 20 + dx, top: 686, width: 972, height: 106,
          zIndex: 13, background: `linear-gradient(0deg, #FFF2D0 0%, #FFA346 100%)` }} />
        {/* the trench mouth itself — a hard bright edge, so the anvil and the
            hammer read as SILHOUETTES rather than as dark shapes on a dark wall */}
        <div style={{ position: "absolute", left: 20 + dx, top: 682, width: 972, height: 16,
          zIndex: 14, background: "#FFF6DE" }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"em" + i} style={{ position: "absolute",
            left: 70 + i * 108 + Math.sin(f / 9 + i) * 22 + dx,
            top: 690 - ((f * 2.4 + i * 40) % 210), width: 13, height: 13, borderRadius: 7,
            zIndex: 15, background: hexa("#FFD08A", 0.30 + (i % 3) * 0.2) }} />
        ))}
        <Motes x={506 + dx} y={300} w={620} h={380} n={14} f={f} z={34} c="#FFB870" />

        {/* THE LOOP, RUNNING FOR REAL — planted at S5 and paid off here */}
        <LoopRail cx={CX + dx} cy={CY} r={RR} k={(BASE[pi] + k * ARC[pi]) % 1} z={22}
          c="#6E5A44" pass={R.passes[Math.min(2, pi)]} />

        {/* THE HERO ARTIFACT, hanging from the carriage, changing every pass */}
        <Brief x={bx + dx} y={by} w={210} s={state} z={60} f={f} crack={crack}
          rot={lag * 0.045} />
        <div style={{ position: "absolute", left: bx + dx - 5, top: by - 272, width: 10,
          height: 86, zIndex: 58, background: "#39434D" }} />

        {/* the anvil block, dark against the hot floor */}
        <div style={{ position: "absolute", left: 346 + dx, top: 618 + recoil * 0.5, width: 252,
          height: 92, zIndex: 52, background: `linear-gradient(180deg, #3A3026 0%, #0E0C08 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 12,
            background: "#6E6050" }} />
          <div style={{ position: "absolute", left: -18, top: 62, width: 288, height: 30,
            background: "#100E0A" }} />
        </div>
        <ProvingRam x={472 + dx} y={GY} k={ram} z={66} drop={196} w={360} h={472} />
        {hit === 1 && <Ring x={472 + dx} y={614} f={f} at={52} c="#FFD8A0" z={74} s={2.0} dur={20} />}
        {hit === 1 && <Fall x={472 + dx} y={584} w={330} f={f} at={52} n={18} z={72} c="#FF9A4A" />}
        {hit === 1 && <Puff x={472 + dx} y={632} f={f} at={52} c="#E0B080" z={73} n={15} />}

        <FrontBand f={f} n={6} size={170} seed={13} react={hit} at={-10} />
        <Contact x={742 + dx} y={GY} w={214} z={41} o={0.32} />
        <Hero f={f} x={796 + dx} y={GY} size={244} z={56} act={2} ph={0.6}
          costume={{ constr: 1 }} cheer={E(f, 53, 61, 0, 1, OUT)} shock={hit ? 0.55 : 0} />
        <Edge side="l" c="#060302" w={86} z={90} top={118} />
      </Cam>
      <BandChip t="IT LOOPS UNTIL IT HOLDS" c="#060302" fg="#FFC06A" />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE FURNACE — 28.54 to 31.74s (96f) · FALL
   VO: "This burns through tokens fast, so you should only build your basic
        prototype first and"

   ⛔ NO QUANTITY IS SPOKEN, SO NO NUMERAL IS DRAWN. The column has hoops and a
   level and nothing else — an invented token count is the most believable kind
   of wrong. See `COST_BANNED`.
   ⭐ AND THE ADVICE IS THE CONTRAST: he shutters the throat, the rate halves,
   and he sets a ROUGH prototype down beside it — bare frame, visible fixings,
   no seal, no gold. Unfinished-but-real, never scruffy: raw timber and bright
   bare metal against the black, because grey + rectangular is what reads as
   boring and this beat is the advice.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("furnace");
  const feed = E(f, 0, 56, 0, 1, LIN);
  const shut = E(f, 56, 64, 0, 1, IN_Q);
  const level = 0.92 - feed * 0.58 - (1 - shut) * 0 + shut * 0.02;
  const set = E(f, 70, 84, 0, 1, OUT);
  const rate = 8.4 * (1 - shut * 0.55);
  const dx = LAY[v].c;   /* dHash 10 house/amber at f932 — full offset */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.105]} vig={0.48} glow={hexa(p.key, 0.24 * (1 - shut * 0.4))}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="duct"
          rake={0.17} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.9} lamp={{ x: 660 + dx, y: 470, r: 200 }} window={null} />
        {/* ⛔ THE READOUT WAS INVISIBLE. v1 ran a 156px column of dark brown at
            the frame edge inside an orange room — one stop of separation, at the
            crop bound. It is now 214px wide, further in, and the fuel itself is
            the brightest thing in the set, so the LEVEL is the readout. */}
        {/* ⛔ AND IT HAS TO BE IN FRONT OF THE BELT. At z40 the feed crates ran
            across y470..594 and the fuel line sat at y512 — the one boundary the
            whole shot exists to show was behind the furniture. */}
        {/* ⛔ A 214px BONE STANDPIPE IN AN ORANGE ROOM READS AS A SLAB. Narrower,
            darker cased, and the FUEL is the only bright thing in it, so the
            level line is the readout rather than the tube. */}
        <FuelColumn x={206 + dx} y={GY} h={500} w={144} level={Math.max(0.10, level)}
          z={52} f={f} />
        {/* ⭐ THE BACKGROUND PROCESS IS THE COST: a belt feeding the throat, and
            it visibly SLOWS when he shutters it. The rate is the readout. */}
        <Runner y={470} f={f} z={44} rate={rate * 1.25} pitch={182} w={172} h={124}
          c="#F0BC5E" c2="#100502" kind="crate" rail o={0.98} />
        {/* the throat, and the shutter that comes across it */}
        <div style={{ position: "absolute", left: 596 + dx, top: 470, width: 190, height: 120,
          zIndex: 46, background: "#1A0E06", border: "9px solid #4A2A12" }}>
          <div style={{ position: "absolute", inset: 8,
            background: `linear-gradient(0deg, #FFD07A 0%, #E0500E 100%)`,
            opacity: 1 - shut * 0.82 }} />
        </div>
        <div style={{ position: "absolute", left: 596 + dx, top: 470, width: 190,
          height: 120 * shut, zIndex: 47, background: "#39302A" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 0, top: i * 24, width: "100%",
              height: 24, borderBottom: "3px solid #221C18" }} />
          ))}
        </div>
        <Fall x={690 + dx} y={430} w={200} f={f} at={2} n={12} z={48} c="#FFB25A" rate={1.6} />
        {/* ⛔ HOLD WAS 56%. The throat shutting is the POINT of the second half,
            so the second half cannot go still: embers keep climbing the whole
            shot and the belt keeps running under the shutter at half rate. */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"eb" + i} style={{ position: "absolute",
            left: 120 + i * 74 + Math.sin(f / 8 + i * 1.7) * 26 + dx,
            top: 700 - ((f * (2.6 + (i % 3) * 0.8) + i * 52) % 330),
            width: 15, height: 15, borderRadius: 8, zIndex: 50,
            background: hexa("#FFD08A", 0.24 + (i % 4) * 0.16) }} />
        ))}

        {/* the rough prototype he sets down — real, unfinished, not scruffy */}
        <div style={{ position: "absolute", left: 300 + dx, top: 560 - (1 - set) * 200,
          width: 214, height: 150, zIndex: 58, opacity: set }}>
          <svg viewBox="0 0 214 150" width={214} height={150} style={{ overflow: "visible" }}>
            <rect x={6} y={22} width={202} height={122} fill="none" stroke="#B08A50" strokeWidth={9} />
            <rect x={6} y={22} width={202} height={9} fill="#D8AE6E" />
            <rect x={44} y={54} width={128} height={62} fill="#7E868E" />
            <rect x={44} y={54} width={128} height={10} fill="#AAB2BA" />
            {[26, 188].map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy={38} r={7} fill="#E0C48A" />
                <circle cx={cx} cy={128} r={7} fill="#E0C48A" />
              </g>
            ))}
            <rect x={78} y={0} width={58} height={24} fill="#5E4A32" />
          </svg>
        </div>
        <Contact x={356 + dx} y={GY} w={210} z={41} o={0.34} />

        <FrontBand f={f} n={5} size={164} seed={15} react={0} at={-6} x0={-90} x1={780} />
        <Contact x={848 + dx} y={GY} w={206} z={41} o={0.32} />
        <Hero f={f} x={898 + dx} y={GY} size={240} z={56} act={1} ph={0.4}
          costume={{ constr: 1 }} strain={E(f, 52, 58, 0, 0.8, OUT) - E(f, 62, 70, 0, 0.9, OUT)}
          drive={-shut * 0.20 + set * 0.10} stern={shut} />
        <Forearm x0={898 + dx - 240 * 0.34} y0={GY - 240 * 0.50}
          x1={790 + dx} y1={506} w={25} c={CLAYD} z={58} />
        <Steam x={898 + dx} y={GY - 246} f={f} at={48} n={7} z={62} s={1.0} c="#F0C89A" />
        <Edge side="l" c="#120503" w={92} z={90} top={120} />
      </Cam>
      <BandChip t="PROTOTYPE FIRST" c="#120503" fg="#FFB25A" />
    </Scene>
  );
};

/* =========================================================================
   S14 · THE LAUNCH BAY — 31.74 to 33.52s (54f) · PAYOFF
   VO: "trigger the Judge Loop before your launch."

   ⭐ THE LOOP ARRIVES WHERE IT BELONGS — swinging in overhead and locking over
   the cradle IN FRONT OF the doors, which is the whole instruction drawn as a
   position. The doors only START to open; the reel does not launch anything,
   because the VO does not.
   ⛔ THE THROW IS A REAL DISTANCE: the lever covers 45% of its arc in six
   frames, and he goes with it (drive, not a wrist).
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bay");
  const reach = E(f, 2, 10, 0, 1, OUT);
  const throwK = E(f, 12, 18, 0, 1, IN_Q);
  const swing = E(f, 18, 34, 0, 1, IO);
  const doors = E(f, 38, 54, 0, 0.34, OUT);
  const dx = LAY[v].b * 0.3;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.34} glow={hexa(p.key, 0.16)}>
      <Cam x={dx * 0.3} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
          rake={0.06} rakeX={RAKE_X[v]} rakeRate={2.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.5} lamp={null} window={null} />
        {/* the tall doors at the back, just cracking */}
        {[0, 1].map(i => (
          <div key={"d" + i} style={{ position: "absolute",
            left: 316 + i * 190 - (i === 0 ? doors * 120 : -doors * 120) + dx, top: 236,
            width: 190, height: 330, zIndex: 18,
            background: `linear-gradient(${i === 0 ? 100 : 260}deg, #6E7A86 0%, #2A343E 100%)` }}>
            {Array.from({ length: 5 }, (_, j) => (
              <div key={j} style={{ position: "absolute", left: 16, top: 24 + j * 60, width: 158,
                height: 40, background: "#39434D" }} />
            ))}
          </div>
        ))}
        {doors > 0.05 && (
          <div style={{ position: "absolute", left: 380 + dx, top: 236, width: 250, height: 330,
            zIndex: 16, background: `linear-gradient(180deg, ${mxh(p.key, 0.60)} 0%, ${mxh(p.key, 0.18)} 100%)` }} />
        )}
        {doors > 0.05 && (
          <Pool x={506 + dx} y={566} w={520 * doors * 2.4} c="#F0F8FF" o={0.30 * doors} z={19} />
        )}
        {/* the cradle and the finished plate on it */}
        <div style={{ position: "absolute", left: 392 + dx, top: 622, width: 230, height: 86,
          zIndex: 44, background: `linear-gradient(180deg, #4A545E 0%, #1A2026 100%)` }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 11,
            background: "#7E8A96" }} />
        </div>
        <Brief x={506 + dx} y={628} w={228} s={1} z={50} f={f} rot={-2} />
        {/* the finished plate gets the one warm accent in a cold room, so the
            thing the whole reel has been rebuilding is what the eye lands on */}
        <Pool x={506 + dx} y={600} w={420} c="#FFD8A0" o={0.26} z={43} />
        {/* the loop swinging in and LOCKING over the cradle, in front of the doors */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 792, zIndex: 30,
          transform: `translate(${(1 - swing) * 640}px, 0px)`, opacity: 0.4 + swing * 0.6 }}>
          <LoopRail cx={506 + dx} cy={286} r={272} k={0.14 + swing * 0.7} z={30} c="#5A6672"
            pass={R.passes[2]} />
        </div>
        <BigLever x={848 + dx} y={GY} k={throwK} z={50} h={320} />
        <Contact x={740 + dx} y={GY} w={214} z={41} o={0.32} />
        <Hero f={f} x={790 + dx} y={GY} size={254} z={56} act={1} ph={0.5}
          costume={{ constr: 1 }} strain={throwK * (1 - E(f, 20, 28, 0, 1, OUT))}
          drive={reach * 0.24 + throwK * 0.20} cheer={E(f, 36, 46, 0, 1, OUT)} />
        <Forearm x0={790 + dx + 254 * 0.34} y0={GY - 254 * 0.50}
          x1={846 + dx} y1={GY - 300 + throwK * 130} w={25} c={CLAYD} z={58} />
        {swing > 0.95 && <Ring x={506 + dx} y={470} f={f} at={34} c="#F0F8FF" z={74} s={1.6} dur={18} />}
        <FrontBand f={f} n={6} size={168} seed={17} react={E(f, 36, 46, 0, 1, OUT)} at={-14} />
        <Edge side="l" c="#1A2026" w={90} z={90} top={124} />
      </Cam>
      <BandChip t="RUN IT BEFORE YOU LAUNCH" c="#1A2026" fg="#EAF4FF" />
    </Scene>
  );
};

/* =========================================================================
   S15 · THE FRONT STEPS — 33.52 to 34.80s (38f) · CTA
   VO: "Comment Judge for the free guide."

   ⛔ THE KEYWORD IS THE ONLY WORD THE PICTURE SPELLS OUT IN FULL, and it is
   stamped one letter at a time, each one step up, with the mark pressed in last.
   ⛔ HARD CUT ON THE KEYWORD: the first letter lands on the measured onset of
   "Judge" (33.94s -> local f13), not on the start of the sentence.
   ====================================================================== */
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
