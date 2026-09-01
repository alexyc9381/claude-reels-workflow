import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Mark, MarkPlate, Contact, Edge, Ring, Puff, Steam, Motes,
  Crew, Hero, Forearm, costumeFor, squash, mono, ui, Rake,
  R, asPlace, GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, OXBLOOD,
} from "./JudgeWorld";
import { Brief, Polygraph, WitnessBox, EvidenceBoard, Gavel } from "./JudgeProps";
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

export type HookId = "stand" | "light" | "gavel" | "wall";
type SP = { v: any; dur: number };

export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
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
   HOOK 1 · `stand` — THE POLYGRAPH.  ⭐ THIS IS ALSO S0 ITSELF, so the
   candidate that gets picked and the scene that ships are the same code and
   cannot drift apart.

   MECHANISM: measurement. He swears the work is DONE; the instrument disagrees
   and tears its own paper saying so; the seal is still gleaming at the end.

   The event, four parts (§2):
     before   f0  he is already in the box, arm out, brief held toward camera,
                  the drum already running with a FLAT trace on 220px of paper
     trigger  f6  the needle twitches — the first promise
     travel   f14 it climbs, and the climb ACCELERATES (IN_Q, not OUT) so you can
                  see where it is going before it gets there
     arrival  f34 full deflection, the pen TEARS 300px of sheet, the LIE lamp
                  strikes as a shaped cone, he flinches, and light shows THROUGH
                  the brief for the first time — it is hollow
   ⛔ AND IT DOES NOT RESOLVE: f52 he sets his jaw and the seal is untouched.
   A hook that resolves has spent the reel.
   ====================================================================== */
export const HookStand: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stand");

  /* ⭐ THE NEEDLE AS A FUNCTION OF FRAME, not a value at this frame. The trace
     reads its own history off this, so every millimetre of ink is the value the
     needle actually held when that paper passed the nib — and the paper SCROLLS,
     which turns the receipt into the reel's background process.
     ⛔ THE CLIMB IS `IN_Q`, NOT `OUT`. An accelerating rise tells you where it
     is going before it gets there; a decelerating one has already arrived. */
  const nAt = (g: number) => {
    const twitch = E(g, 6, 9, 0, 0.19, OUT) - E(g, 10, 14, 0, 0.15, IO);
    const climb = E(g, 14, 34, 0, 0.86, IN_Q);
    const slam = E(g, 34, 38, 0, 0.15, BACK);
    return Math.max(0, Math.min(1, twitch + climb + slam));
  };
  const spin = 1 + E(f, 24, 30, 0, 2.2, OUT);
  const tear = E(f, 35, 62, 0, 1, OUT);
  const lamp = E(f, 36, 41, 0, 1, OUT) * (0.86 + Math.sin(f / 3.1) * 0.14);
  const flinch = E(f, 38, 42, 0, 1, OUT) - E(f, 50, 60, 0, 1, IO);
  const kick = f > 38 ? Math.sin((f - 38) * 0.9) * Math.exp(-(f - 38) / 9) * 15 : 0;
  const hollow = E(f, 42, 62, 0, 0.42, OUT);
  const stern = E(f, 52, 62, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.34} glow={hexa(p.key, 0.16)}>
      <Cam s={1.0} z={1}>
        <Room p={p} f={f} bands={2} kind="shelf" overhead="joist"
          rake={0.06} rakeRate={1.9} rakeN={5} floorKind="boards" grit={0.5}
          lamp={{ x: 856, y: 196, r: 176 }} window={null} />

        {/* ⭐ THE WALL CARRIES THE GATES SO THE SUBJECT DOES NOT HAVE TO
            (reel 110). One unbroken cream field behind the action with the
            court's own mark pressed into it: HOOK_LUMA and the claim plate both
            live here, which leaves the polygraph free to be near-black and the
            Claude free to be small and saturated. That value gap is the biggest
            in the reel, and it is bought with the SUBJECT's value, never by
            lifting the palette's dark stop. */}
        <EvidenceWall x={506} y={680} w={900} h={300} z={14} f={f} />
        <div style={{ position: "absolute", left: 56, top: 672, width: 900, height: 26, zIndex: 16,
          background: `linear-gradient(180deg, #A87A46 0%, #5E3C1E 100%)` }} />

        {/* ⭐⭐⭐ THE COLOSSAL OBJECT AND THE BACKGROUND PROCESS ARE THE SAME
            MACHINE: 640px of near-black recorder standing on the boards, and
            660px of lit chart paper scrolling out of it on its own dark guide
            plate with the pen carriage riding the new end. */}
        {/* ⛔⛔ THE BAND HAS TO CROSS THE WHOLE PANEL. v1 ran 660px of paper in
            the left two thirds and the hook measured 4.84 — the lowest scene in
            the reel — because 10% of the panel cannot carry a shot however
            interesting it is. The chart is now FULL BLEED at 1104x152 (21% of
            the panel) and it runs BEHIND the box, which is also what a recorder
            in a room actually looks like. */}
        <Polygraph x={200} y={GY} h={640} f={f} spin={spin} z={40}
          paperX={-46} paperY={196} paperW={1104} paperH={152} penX={636}
          nAt={nAt} speed={12} tear={tear} lamp={lamp} />

        {/* the box, the hero, and the work he is swearing to.
            ⛔ HE STANDS ON A STEP INSIDE THE BOX. v1 put him at the ground line
            behind a 178px front panel and 61% of the sprite — the whole face —
            was hidden by furniture on the one frame guaranteed to be seen. */}
        <WitnessBox x={812} y={GY} w={348} h={192} z={62} />
        <Contact x={694} y={GY} w={236} z={41} o={0.36} />
        <Hero f={f} x={812} y={GY - 116} size={296} z={56} act={3} ph={0.6}
          costume={{ constr: 1 }} shock={flinch} stern={stern} gaze={-0.55} />
        {/* ⛔ THE FOREARM CONNECTS TWO THINGS THAT ARE BOTH ON SCREEN — the only
            limb geometry that cannot be misread as a tail (reel 110, two rounds). */}
        <Forearm x0={812 - 296 * 0.30} y0={GY - 116 - 296 * 0.46}
          x1={752} y1={GY - 268 + kick * 0.5} w={27} c={CLAYD} z={58} />
        {/* ⛔ THE LAST BEAT OF THE HOOK IS A PROMISE, NOT THE PAYOFF. Three
            pinholes open and the light behind shows through — the work is
            hollow. The other eleven holes, and the flags that make them, are
            S10's job; spending them here would spend the reel. */}
        {/* ⛔ AND IT MOVED INTO HIS OWN SILHOUETTE, WHICH IS TWO FIXES AT ONCE.
            Held out in mid-frame it (a) split the hook into two competing
            objects — a machine AND a document — where a hook is ONE image, and
            (b) severed the cream wall behind it, which is what `HOOK_PLATE` was
            reading at 9.9%: a plate far below its own area is a dark LINE
            through it, not a size problem. Inside the box it is clearly HIS, the
            wall behind is one field, and its top edge sits well below the eye
            band, so nothing lands on the face. */}
        <Brief x={748} y={GY - 78 + kick} w={172} s={0} z={60} f={f}
          rot={-6 + kick * 0.4} lit={hollow} holes={f > 46 ? 3 : 0} />

        {/* the cable — it is why the two objects are ONE machine and not two
            props sharing a room */}
        <svg viewBox="0 0 1012 792" width={1012} height={792}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 39, overflow: "visible" }}>
          <path d={`M 700 ${GY - 40} Q 500 ${GY + 40} 268 ${GY - 70}`} fill="none"
            stroke="#141A20" strokeWidth={12} strokeLinecap="round" />
        </svg>

        <Edge side="r" c="#2E1C0C" w={74} z={88} top={170} />
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
  stand: HookStand,
  light: HookLight,
  gavel: HookGavel,
  wall: HookWall,
};
