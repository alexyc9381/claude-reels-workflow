import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Mark, MarkPlate, Contact, Edge, Ring, Puff, Steam, Motes,
  Crew, Hero, Forearm, costumeFor, squash, mono, ui, Rake, Runner, Sweat, Fall,
  R, asPlace, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, OXBLOOD,
} from "./JudgeWorld";
import {
  Brief, Polygraph, WitnessBox, EvidenceBoard, Gavel, BigSeal, RawWork, Gallery, ExhibitWall,
} from "./JudgeProps";
import { Room, Jamb, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE HOOK CANDIDATES.

   ⛔ docs/THE-OPEN.md STEP 1: *the first build step of any reel is not scene 0,
   it is N concepts for scene 0.* Four genuinely different WORLDS, each rendered
   at full quality on the real chassis with the real VO, bed, captions and rail,
   so the pick is made on the thing a viewer would actually be served.

   The four are four different MECHANISMS, not one world in four colourways:

     stand   MEASUREMENT   a polygraph needle measures the claim and tears the paper
     light   REVELATION    a backlight goes behind the work and it is full of holes
     gavel   IMPACT        a colossal gavel comes down and the gold seal shatters
     wall    ACCUMULATION  a wall fills with findings faster and faster, and he
                           keeps smiling and holding the DONE card

   ⛔⛔ ALL FOUR OBEY THE FOUR LAWS OF FRAME 0 AND THE THREE RULES THE OX AND
   UNLAZY HOOKS ACTUALLY FOLLOW (measured off their delivered frames, not
   remembered): a LIVING THING is the subject and something happens TO it;
   ANTICIPATION IS A PHYSICAL PROCESS YOU CAN SEE COMING; ONE HUGE OBJECT beside
   a small Claude for scale, on a bright set, with the receipt already at f0.

   ⛔ AND `PREDICTABLE MOTION IS NOT ANTICIPATION` (§25). In every one of these
   the shot states that something is ABOUT to happen and withholds the
   resolution — a needle climbing toward a red stop, a shutter opening on a
   lamp bank, a mass rising before it falls, a wall filling toward its top edge.
   ========================================================================= */

export type HookId = "seal" | "stand" | "light" | "gavel" | "wall";
type SP = { v: any; dur: number };

export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  seal:  { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  stand: { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  light: { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  gavel: { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
  wall:  { big: "CLAUDE SAYS IT'S DONE", hot: "IT ISN'T" },
};

/* --------------------------------------------------------------------------
   THE EVIDENCE WALL — the object that carries `HOOK_LUMA >= 140` and
   `HOOK_PLATE` in three of the four candidates.

   ⭐⭐⭐ A GATE CARRIED BY THE WRONG OBJECT DEFORMS THAT OBJECT (reel 110). The
   hook's SUBJECT must never be the thing holding up the brightness bar, or it
   ends up huge and pale and stops reading as itself. So the claim plate and the
   luma both live on a lit bone wall BEHIND the action, and the subject in front
   of it is free to be small, dark and saturated.
   ⛔ AND A PLATE IS A CONTIGUOUS REGION: `plate_at_f0` takes the largest
   CONNECTED bright area, so this wall is ONE unbroken cream field with its
   fittings drawn on top rather than a grid of tiles with dark lines between.
   ------------------------------------------------------------------------ */
const EvidenceWall: React.FC<{ x: number; y: number; w: number; h: number; z?: number; f: number }> =
  ({ x, y, w: ww, h: hh, z = 14, f }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0,
      background: `linear-gradient(176deg, #FBF7EC 0%, #EFE7D4 62%, #DCD0B6 100%)` }} />
    {/* the case number rail — one strip, drawn ON the cream so it never severs it */}
    <div style={{ position: "absolute", left: ww * 0.07, top: hh * 0.11, width: ww * 0.86, height: 3,
      background: hexa("#8C7E60", 0.34) }} />
    <div style={{ position: "absolute", left: ww * 0.07, top: hh * 0.80, width: ww * 0.86, height: 3,
      background: hexa("#8C7E60", 0.26) }} />
    {/* the court's own mark, pressed into the plaster. Big and early: the mark
        is the AUDIENCE FILTER, not decoration. */}
    <Mark x={ww * 0.5 - 62} y={hh * 0.24} s={98} z={z + 2} plate={false} />
    <div style={{ position: "absolute", left: ww * 0.5 - 150, top: hh * 0.58, width: 300, height: 4,
      background: hexa("#8C7E60", 0.44) }} />
    {/* ⛔ AN UNBROKEN CREAM FIELD IS A PLATE, BUT IT IS ALSO A BLANK WALL. Four
        shallow pilasters give it a surface without severing it: they are drawn
        ON the cream at 0.10, well above the plate mask's 168-luma threshold, so
        the largest connected region is untouched. */}
    {[0.10, 0.36, 0.63, 0.89].map((t, i) => (
      <div key={"pl" + i} style={{ position: "absolute", left: ww * t - 22, top: hh * 0.16,
        width: 44, height: hh * 0.72, background: hexa("#C4B692", 0.10),
        borderLeft: `2px solid ${hexa("#C4B692", 0.20)}`,
        borderRight: `2px solid ${hexa("#C4B692", 0.14)}` }} />
    ))}
  </div>
);

/* =========================================================================
   HOOK 1 · `seal` — THE LOAD HE CANNOT HOLD UP.  ⭐ THIS IS ALSO S0 ITSELF, so
   the candidate that gets picked and the scene that ships are the same code.

   ⛔⛔⛔ v1 OF THIS HOOK MADE A MACHINE THE SUBJECT. A colossal chart recorder
   measured the lie and tore its own paper, and the Claude stood in the corner
   watching it. Alex: *"the begining scene needs to be way more interesting like
   OX UNLAZY BOSS."* Frame-stripped all three rather than remembered, and every
   one of them is the same shape:

     OX      a 400px bull CHARGES and a Claude is roped to it
     UNLAZY  a Claude has a pipe in his mouth INFLATING a giant DONE balloon
             until it bursts and blows him back
     BOSS    a colossal boss LOOMS over a small Claude holding work up at him

   **A CLAUDE IS THE SUBJECT AND PHYSICAL WORK IS BEING DONE THROUGH HIS BODY
   AGAINST A LOAD.** Nothing was happening to mine, so nothing was happening.
   No amount of tuning the recorder would have reached that.

   THE LOAD IS THE VILLAIN MADE LIFTABLE: the gold `DONE` seal, 460px of it,
   held over a 240px Claude, cracking under its own weight because the claim
   cannot carry itself. He gets ONE lift attempt and it fails.

   The event, four parts (§2):
     before   f0  already under it, already compressed, TWO cracks already run,
                  steam already rising, shards already on the floor
     trigger  f8  the cracks start spreading and he sinks
     travel   f26 HE DRIVES — the seal rises 34px and he almost gets it, then it
                  drops back further than it started. The mechanism FAILS FIRST.
     arrival  f46 it SHATTERS: 34 shards, a ring, dust, he drops into a squat
   ⛔ AND IT DOES NOT RESOLVE. What is revealed under the gold is the REAL work,
   raw and half-built, hanging where the lie was. The problem is now WORSE.
   ====================================================================== */
export const HookSeal: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stand");

  /* ⭐ THE FAILURE IS A PROCESS YOU CAN SEE COMING (§25). Cracks spread on their
     own accelerating clock, so at any frame the viewer can read how much is
     left — that is anticipation, as opposed to a thing that simply happens. */
  const fail = Math.min(1,
    0.18 + E(f, 6, 26, 0, 0.34, LIN) + E(f, 34, 46, 0, 0.44, IN_Q));
  /* the ONE lift attempt, and it loses ground */
  const drive = E(f, 26, 32, 0, 1, OUT) - E(f, 33, 40, 0, 1, IN_Q);
  /* ⛔ THE LOAD HAS TO VISIBLY LOSE GROUND. A 6->38px sag on a 792 panel is a
     state change, not an action (§11: under about a third of the object's own
     size and the eye cannot resolve it). It now travels 60px down and 46px back
     up on the failed lift, and it TILTS as it slips. */
  const sag = 6 + E(f, 4, 26, 0, 30, IO) - drive * 46 + E(f, 34, 46, 0, 30, IN_Q);
  const tilt = -2 - E(f, 8, 26, 0, 5, IO) + drive * 4 - E(f, 34, 46, 0, 6, IN_Q);
  const strain = Math.min(1, 0.50 + E(f, 4, 26, 0, 0.22, IO) + drive * 0.22
    + E(f, 34, 46, 0, 0.26, IN_Q)) * (1 - E(f, 52, 62, 0, 0.55, OUT));
  const burst = E(f, 46, 74, 0, 1, OUT);
  const gone = f >= 46;
  const squat = E(f, 46, 50, 0, 1, IN_Q) - E(f, 56, 70, 0, 0.8, OUT);
  /* ⛔ THE REVEAL WAS ARRIVING TOO SLOWLY TO BE THE PAYOFF. It now lands
     inside eight frames of the shatter, which is where the eye still is. */
  const reveal = E(f, 50, 60, 0, 1, BACK);
  const look = E(f, 48, 54, 0, 1, OUT) - E(f, 64, 74, 0, 1, IO);
  const stern = E(f, 66, 76, 0, 1, OUT);
  const shake = gone && f < 54 ? Math.sin((f - 46) * 1.6) * Math.exp(-(f - 46) / 5) * 13 : 0;

  /* ⛔ THE LOAD WAS COVERING HIS FACE. At 460px over a 240px hero the seal's
     bottom edge sat across his eyes for the whole first half — the strain is
     the beat, and the surface it is read off was behind the prop. The seal now
     rests ON THE CROWN and never reaches the eye band, and the SCALE came from
     shrinking the body instead: 400 over 214 is 1.87x his height, which is the
     ratio OX's bull and BOSS's boss actually run at. */
  const HX = 470, HS = 214, HEAD = GY - HS;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34} glow={hexa(p.key, 0.16)}>
      <Cam s={1.0} y={shake * 0.4} z={1}>
        <Room p={p} f={f} bands={2} kind="shelf" overhead="gantry"
          rake={0.08} rakeRate={2.4} rakeN={5} floorKind="boards" grit={0.6}
          lamp={{ x: 862, y: 150, r: 180 }} window={null} />

        {/* ⭐ DENSITY, DEVICE 1: a wall of real case files. OX fills a floor with
            hundreds of coins, BOSS runs a wall of thirty wireframes, UNLAZY six
            terminals with real code. This reel shipped one object on an empty
            floor. Twenty-four files, countable, with readable rows. */}
        <ExhibitWall x={506} y={572} w={1010} h={258} z={16} f={f} cols={9} rows={3}
          c="#7A5230" lit={0.55} flagged={0} />

        {/* the overhead run — a background process the room would actually have */}
        <Runner y={118} f={f} z={14} rate={7.4} pitch={186} w={152} h={78}
          c="#C9B48C" c2="#2E2116" kind="crate" rail hang={20} o={0.9} />

        {/* the hazard band the work is staged on */}
        <div style={{ position: "absolute", left: -40, top: 664, width: 1100, height: 26,
          zIndex: 22, overflow: "hidden", background: "#2A2116" }}>
          {Array.from({ length: 26 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: i * 46 - 20, top: -6, width: 26,
              height: 40, transform: "skewX(-26deg)", background: i % 2 ? "#E7B24C" : "#241C12" }} />
          ))}
        </div>

        {/* ⭐ DENSITY, DEVICE 2: the public gallery, either side of the dock, in
            two ranks with a value ramp. BOSS carries a band like this in EVERY
            body frame; it is the single most repeated device in the reference
            reels and a court has one for free. */}
        <Gallery f={f} x0={-56} x1={300} y={GY + 22} n={6} ranks={2} size={130} z={30}
          at={-24} react={gone ? 1 : 0} seed={0} />
        <Gallery f={f} x0={680} x1={1064} y={GY + 22} n={6} ranks={2} size={130} z={30}
          at={-20} react={gone ? 1 : 0} seed={2} />

        {/* ⭐⭐⭐ THE LOAD AND THE BODY UNDER IT */}
        <Contact x={HX - 118} y={GY} w={236} z={41} o={0.42} />
        <Hero f={f} x={HX} y={GY} size={HS} z={60} act={1} ph={0.4}
          costume={{ constr: 1 }} strain={strain} shock={look} stern={stern}
          lift={-squat * 26} gaze={0.1} />
        {/* ⛔ THE ONLY LIMB GEOMETRY THAT SURVIVES is a forearm that STARTS on
            the mascot's own arm rect and ENDS on the thing it holds (reel 110,
            two rounds lost to a hand-drawn arm that read as a tail). */}
        {!gone && (<>
          <Forearm x0={HX - HS * 0.38} y0={HEAD + HS * 0.50} x1={HX - 62}
            y1={496 + sag} w={26} c={CLAYD} z={61} />
          <Forearm x0={HX + HS * 0.38} y0={HEAD + HS * 0.50} x1={HX + 62}
            y1={496 + sag} w={26} c={CLAYD} z={61} />
        </>)}
        <BigSeal x={HX} y={292 + sag} d={400} z={62} f={f} fail={fail} burst={burst}
          bow={Math.min(1, fail * 0.8)} rot={tilt + shake * 0.2} />

        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART. A pressing sprite's
            head is the one thing not acting, so it steams — from frame 0. */}
        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART, and on a pressing
            sprite that is the head — which is also why the seal cannot be
            allowed to sit on it. Steam runs from frame 0. */}
        <Steam x={HX - 78} y={HEAD + 30} f={f} at={-14} n={9} z={64} s={1.15} c="#E8DCC0" />
        <Steam x={HX + 78} y={HEAD + 30} f={f} at={-8} n={9} z={64} s={1.15} c="#E8DCC0" />
        <Sweat x={HX} y={HEAD + 70} f={f} at={2} n={11} z={65} />
        {/* the scale falling off the seal as it goes — before it goes */}
        <Fall x={HX} y={470 + sag} w={330} f={f} at={-10} n={14} z={59} c="#E7B24C" rate={1.4} />

        {gone && <Ring x={HX} y={306} f={f} at={46} c="#FFE8B0" z={74} s={2.4} dur={24} />}
        {/* the floor takes the load too: shards that already fell, and the dust
            they kicked up. Nothing in a reel lands and simply stops. */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={"fl" + i} style={{ position: "absolute",
            left: 250 + i * 118 + rnd(i, 3) * 40, top: 690 + rnd(i, 9) * 12,
            width: 30 + rnd(i, 5) * 26, height: 15, zIndex: 44,
            transform: `rotate(${(rnd(i, 7) - 0.5) * 50}deg)`,
            clipPath: "polygon(0% 30%, 46% 0%, 100% 22%, 78% 100%, 18% 84%)",
            background: i % 2 ? "#C89A38" : GOLD }} />
        ))}
        {gone && <Puff x={HX} y={GY - 40} f={f} at={48} c="#D8C8A4" z={70} n={17} />}

        {/* ⛔ AND IT DOES NOT RESOLVE: what the gold was hiding is the real work,
            raw and half-built, hanging exactly where the lie was. */}
        {reveal > 0.01 && <RawWork x={HX} y={318} w={356} z={58} k={reveal} f={f} />}

        <Edge side="r" c="#2E1C0C" w={78} z={90} top={150} />
      </Cam>

      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

/* =========================================================================
   HOOK 2 · `light` — THE LIGHT BOX.
   MECHANISM: revelation. The work is genuinely handsome and it stays handsome;
   what changes is that a light goes behind it. Anticipation is the lamp bank
   warming: you can see the tubes striking one at a time before the reveal.
   ====================================================================== */
export const HookLight: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stand");
  const bank = E(f, 8, 34, 0, 1, LIN);                  /* the tubes striking */
  const glow = E(f, 30, 46, 0.06, 1, OUT);
  const holes = Math.floor(E(f, 32, 58, 0, 14.99, OUT));
  const press = E(f, 20, 30, 0, 1, OUT);                /* he presses it to the glass */
  const recoil = E(f, 44, 50, 0, 1, BACK) - E(f, 56, 68, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.36} glow={hexa("#DCEAF6", 0.20 * glow)}>
      <Cam s={1.0} z={1}>
        <Room p={p} f={f} bands={3} kind="column" overhead="joist"
          rake={0.06} rakeRate={2.2} rakeN={5} floorKind="boards" grit={0.5}
          lamp={null} window={null} />
        <EvidenceBoard x={506} y={584} w={800} h={470} z={18} glow={glow} f={f}>
          {/* the tubes strike ONE AT A TIME — the promise before the reveal */}
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 20, top: 26 + i * 69, width: 760,
              height: 11, background: hexa("#FFFFFF", bank * 6 - i > 1 ? 0.72 : 0.06) }} />
          ))}
        </EvidenceBoard>
        <Brief x={506} y={604} w={300} s={0} z={40} f={f} holes={holes}
          lit={glow * 0.9} rot={-2 + press * 2} />
        <Contact x={720} y={GY} w={220} z={41} o={0.34} />
        <Hero f={f} x={730} y={GY} size={252} z={56} act={1} ph={0.3}
          costume={{ constr: 1 }} drive={-press * 0.34} shock={recoil} />
        <Forearm x0={730 - 252 * 0.34} y0={GY - 252 * 0.50}
          x1={620} y1={GY - 232} w={24} c={CLAYD} z={58} />
        {[0, 1, 2].map(i => (
          <Crew key={"g" + i} f={f} x={126 + i * 72} y={GY + 58} i={i + 2} size={96}
            z={30} at={-20} loop={3} tint="#2A2018" />
        ))}
        <Edge side="l" c="#2E1C0C" w={86} z={88} top={150} />
      </Cam>
      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

/* =========================================================================
   HOOK 3 · `gavel` — THE STRIKE.
   MECHANISM: impact. A colossal gavel rises over the sealed brief on a block.
   Anticipation is the rise: the mass going UP is the promise that it will come
   down, and the higher it goes the more certain the resolution is.
   ⛔ It is a STRIKE, not a press: reel 124 already shipped a descending press
   and a second one would be the same shot in a different costume.
   ====================================================================== */
export const HookGavel: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stand");
  const rise = E(f, 4, 30, 0, 1, IO);
  const fall = E(f, 32, 37, 0, 1, IN_Q);
  const k = Math.max(0, rise - fall * 1.02);            /* 1 = up, 0 = struck */
  const hit = E(f, 37, 40, 0, 1, OUT);
  const crack = E(f, 37, 46, 0, 1, OUT);
  const jolt = f > 36 ? Math.sin((f - 36) * 1.2) * Math.exp(-(f - 36) / 7) * 16 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.36} glow={hexa(p.key, 0.16)}>
      <Cam s={1.0} y={jolt * 0.4} z={1}>
        <Room p={p} f={f} bands={3} kind="column" overhead="joist"
          rake={0.07} rakeRate={2.0} rakeN={5} floorKind="boards" grit={0.5}
          lamp={{ x: 240, y: 120, r: 210 }} window={null} />
        <EvidenceWall x={506} y={556} w={780} h={386} z={14} f={f} />
        <div style={{ position: "absolute", left: 240, top: 548, width: 540, height: 26, zIndex: 30,
          background: `linear-gradient(180deg, #A87A46 0%, #4E3218 100%)` }} />
        <Gavel x={430} y={520} k={1 - k} z={70} s={2.3} />
        <Brief x={620} y={GY - 8 + jolt} w={230} s={0} z={60} f={f} crack={crack} rot={jolt * 0.3} />
        <Contact x={620} y={GY} w={230} z={41} o={0.34} />
        {hit > 0.01 && <Ring x={620} y={GY - 150} f={f} at={37} c="#F2E0B4" z={74} s={1.6} dur={18} />}
        {hit > 0.01 && <Puff x={620} y={GY - 40} f={f} at={37} c="#D8CCB0" z={72} />}
        <Hero f={f} x={860} y={GY} size={236} z={56} act={3} ph={0.9}
          costume={{ constr: 1 }} shock={hit} />
        {[0, 1, 2].map(i => (
          <Crew key={"g" + i} f={f} x={110 + i * 70} y={GY + 60} i={i + 7} size={92}
            z={30} at={-20} loop={3} tint="#2A2018" />
        ))}
        <Edge side="r" c="#2E1C0C" w={88} z={88} top={148} />
      </Cam>
      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

/* =========================================================================
   HOOK 4 · `wall` — THE FINDINGS.
   MECHANISM: accumulation. He stands there holding the DONE card and smiling
   while a wall behind him fills with red findings, one at a time, faster and
   faster, climbing toward the top of the frame. Anticipation is a STACK GROWING
   TOWARD AN EDGE, which is §25's own worked example.
   ⛔ He never notices. The joke and the dread are the same thing.
   ====================================================================== */
export const HookWall: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stand");
  /* the rate ACCELERATES: n grows on a quadratic, so the last third lands more
     than the first two thirds put together */
  const n = Math.floor(Math.pow(Math.max(0, (f - 4) / 62), 1.7) * 22);
  const cheer = 1 - E(f, 58, 68, 0, 0.7, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.36} glow={hexa(p.key, 0.15)}>
      <Cam s={1.0} z={1}>
        <Room p={p} f={f} bands={3} kind="column" overhead="joist"
          rake={0.07} rakeRate={2.1} rakeN={5} floorKind="boards" grit={0.5}
          lamp={{ x: 780, y: 118, r: 200 }} window={null} />
        <EvidenceWall x={430} y={588} w={720} h={430} z={14} f={f} />
        {/* the findings, stabbed in one at a time from the top */}
        {Array.from({ length: 22 }, (_, i) => {
          if (i >= n) return null;
          const at = 4 + Math.pow(i / 22, 1 / 1.7) * 62;
          const in_ = E(f, at, at + 3, 0, 1, OUT);
          const cx = 118 + (i % 6) * 106 + rnd(i, 5) * 30;
          const cy = 240 + Math.floor(i / 6) * 90 + rnd(i, 9) * 26;
          return (
            <div key={i} style={{ position: "absolute", left: cx, top: cy - (1 - in_) * 220,
              width: 62, height: 62, zIndex: 44, opacity: in_ }}>
              <svg viewBox="0 0 62 62" width={62} height={62} style={{ overflow: "visible" }}>
                <rect x={5} y={2} width={5} height={56} fill="#2C2A26" />
                <path d="M 10 5 L 50 16 L 10 30 Z" fill={RED} />
                <path d="M 10 5 L 50 16 L 10 18 Z" fill="#E06A56" />
              </svg>
            </div>
          );
        })}
        <Contact x={840} y={GY} w={216} z={41} o={0.34} />
        <Hero f={f} x={840} y={GY} size={250} z={56} act={2} ph={0.2}
          costume={{ constr: 1 }} cheer={cheer} shock={1 - cheer} />
        <Forearm x0={840 - 250 * 0.34} y0={GY - 250 * 0.50}
          x1={742} y1={GY - 226} w={24} c={CLAYD} z={58} />
        <Brief x={734} y={GY - 116} w={168} s={0} z={60} f={f} rot={-6} />
        <Edge side="r" c="#2E1C0C" w={92} z={88} top={140} />
      </Cam>
      <Chip t={R.lie} y={BAND_Y} x={SAFE3.cx} c={GREEN} fg="#04241C" s={0.94} z={94} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<SP>> = {
  seal: HookSeal,
  stand: HookSeal,   /* the old machine-led open is retired; `stand` now aliases the rebuild */
  light: HookLight,
  gavel: HookGavel,
  wall: HookWall,
};
