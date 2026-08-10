import React from "react";
import { AbsoluteFill, useCurrentFrame, Img, Audio, staticFile } from "remotion";
import { inter } from "./fonts";
import { Bg, Panel, ProgressBar, HookHeader, KaraokeCaption, AssemblyCtx, Mascot, hexA } from "./SlopKit";
import WORDS from "./data/words_cancel.json";
import {
  Stage, Plate, Lock, Counter, Chip, Receipt, Barrier, Tower, Gate, Wheel, Card, Cone,
  PAID, FREE, TOTAL, PAPER, PAPER2, INKD, RED, RED_D, GO, GO_L, AMB, AMB_L, MAG,
  STEEL, STEEL_D, SH, SH_S,
} from "./CancelWorld";
import { E, osc, rnd, OUT, IO, BACK } from "./MissionWorld";

/* =========================================================================
   REEL 86 "CANCEL" · FIVE CANDIDATE HOOKS, ONE PER WORLD.

   Hook VO 0.00-4.84s: "5 apps you pay for every month have free versions,
   and together they have over 175,000 stars on GitHub."

   Every variant runs the SAME five beat jobs at the SAME cut frames, so what
   is being compared is the world and its hierarchy mechanism, nothing else:

     1  0.00-0.73  THE CHARGE   recognition, close, bright. It already happened.
     2  0.73-1.53  THE WIDE     scale: this is the place it came out of.
     3  1.53-2.47  THE FIVE     all five paid marks, together, stamped.
     4  2.47-3.60  THE NUMBER   176,656 ★ counting UP to its value.
     5  3.60-4.84  THE TURN     five replacements, star counts shown, names
                                blacked out. The count is teased, not spent.

   Cut frames 22 · 46 · 74 · 108 — three cuts inside 1.6s, then the shots
   lengthen (0.73 / 0.80 / 0.93 / 1.13 / 1.23). Nothing under 0.70s, and no two
   consecutive shots differ only in zoom: every cut is a new PLACE with its own
   palette (learnings §2, the reel-82 location count).

   ⛔ SAFE AREA. Shot 1 opens at scale 1.07 about origin 50%/54%, so the panel's
   own 1012x792 box is NOT what survives to screen. Anything outside
   x 40..972 / y 118..731 is cropped — the first cut of chips at y 700..726 came
   back sliced in half. The chip band is y=672 and nothing else may enter it.

   ⛔ FRAME 0 IS THE SETTLED STATE. First pass had A's receipt at scaleY 0.02,
   B's barrier still raised and E's stamp mid-travel on frame 0, which reads as
   "still loading". The charge has ALREADY happened when the reel starts; the
   break is a SECOND one landing a few frames later.
   ========================================================================= */

export const CANCEL_HOOK_LEN = 145;
export const CUTS = [22, 46, 74, 108];
const HEAD = { big: "5 APPS YOU PAY FOR", hot: "ARE FREE ON GITHUB" };
const CHIP_Y = 672;

/* These preview comps carry the REAL VO and the REAL karaoke line, trimmed to
   the hook window, so the pick is made with sound rather than against a
   placeholder caption. The one artefact that remains is the retention rail:
   it fills across 145 frames instead of across the finished 26s reel. */
const Vo: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : (
    <Audio src={staticFile("cancel_vo_final.wav")} endAt={CANCEL_HOOK_LEN} />
  );
const Cap: React.FC = () =>
  React.useContext(AssemblyCtx) ? null : <KaraokeCaption words={WORDS as any} />;

/** the clay Claude, with the house drop shadow. In EVERY shot, at frame 0. */
const Cl: React.FC<{
  f: number; x: number; y: number; size?: number; z?: number;
  gaze?: number; shock?: number; cheer?: number; stern?: number;
  nodAmp?: number; nodSpeed?: number; flip?: boolean;
}> = ({ f, x, y, size = 190, z = 30, gaze = 0, shock = 0, cheer = 0, stern = 0,
        nodAmp = 3, nodSpeed = 10, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scaleX(${flip ? -1 : 1})`, transformOrigin: "50% 90%",
    filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.07)}px rgba(6,9,14,0.5))` }}>
    <Mascot lf={f} size={size} gaze={gaze} shock={shock} cheer={cheer} stern={stern}
            nodAmp={nodAmp} nodSpeed={nodSpeed} />
  </div>
);

const Shot: React.FC<{ f: number; a: number; b: number; k?: number; children: React.ReactNode }> =
  ({ f, a, b, k = 0, children }) => {
  if (f < a || f >= b) return null;
  /* a settle, not a drift: each shot eases a few percent of scale over its
     first 26 frames so the cut lands with weight. The camera does not travel. */
  const t = Math.min(1, (f - a) / 26), e = t * t * (3 - 2 * t);
  const z = [1.07 - e * 0.06, 1.01 + e * 0.05, 1.06 - e * 0.05, 1.02 + e * 0.04, 1.05 - e * 0.05][k % 5];
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden",
      transform: `scale(${z})`, transformOrigin: "50% 54%" }}>{children}</div>
  );
};

const Flash: React.FC<{ f: number }> = ({ f }) => (<>
  {CUTS.map((cf) => {
    const k = f - cf;
    if (k < 0 || k > 2) return null;
    return <div key={cf} style={{ position: "absolute", inset: 0, background: "#FFF6E2",
      opacity: (1 - k / 2) * 0.28, zIndex: 60 }} />;
  })}
</>);

const wrap = (f: number, glow: string, children: React.ReactNode) => (
  <AbsoluteFill>
    <Bg /><ProgressBar /><Vo />
    <HookHeader f={f + 12} big={HEAD.big} hot={HEAD.hot} />
    <Panel glow={hexA(glow, 0.26)}>
      {children}
      <Flash f={f} />
    </Panel>
    <Cap />
  </AbsoluteFill>
);

/** the redacted rack, shared by beat 5 — ranked by stars, top to bottom */
const FreeRack: React.FC<{ f: number; at: number; x?: number; y?: number; w?: number }> =
  ({ f, at, x = 316, y = 206, w = 340 }) => (<>
  {FREE.map((r, i) => (
    <Lock key={r.repo} i={i} x={x} y={y + i * 62} w={w} s={0.92}
          t={E(f, at + 2 + i * 4, at + 15 + i * 4, 0, 1, BACK)} z={34} />
  ))}
</>);

/** the bright surface each world already owns — this is how the frame-0 luma
    bar gets cleared from INSIDE the theme instead of by importing a card
    (learnings §2: "winning the luma gate must not cost you the theme"). */
const Bright: React.FC<{ x: number; y: number; w: number; h: number; c?: string; r?: number; z?: number }> =
  ({ x, y, w, h, c = PAPER2, r = 0, z = 12 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: r, background: c, boxShadow: SH }} />
);

/* ############################################################## A · CHECKOUT
   MECHANISM: ORDER. A receipt is a ranked list with a total at the bottom, so
   the frame tells you what is biggest without a single label doing it.
   PLACES: the terminal · the lane · the aisle · the price board · the doors
   ######################################################################### */
export const CancelHookA: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = CUTS;
  return wrap(f, RED, (<>
    {/* 1 · THE CHARGE — the receipt is already printed, and a sixth line lands */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage id="a1" f={f} />
      {/* the lit counter the lane already owns: the world's bright surface */}
      <Bright x={40} y={520} w={932} h={196} c="#C9CFD2" z={10} />
      <Bright x={40} y={520} w={932} h={16} c="#E3E7E8" z={11} />
      <Cone x={286} y={118} w={440} h={410} c={PAPER} o={0.18} z={5} />
      {/* the terminal, behind and left */}
      <Bright x={54} y={198} w={276} h={330} c={PAPER2} r={20} z={16} />
      <div style={{ position: "absolute", left: 82, top: 232, width: 220, height: 128, zIndex: 18,
        background: "#26323C", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36, color: RED }}>APPROVED</div>
      <Card x={92} y={392} s={0.62} rot={-7} z={20} />
      {/* the hero: the receipt, COMPLETE on frame 0 */}
      <Receipt f={f} x={352} y={150} s={1.44} at={-40} z={26} />
      <Cl f={f} x={766} y={452} size={196} gaze={1} shock={0.75} nodAmp={2} nodSpeed={15}
          flip z={32} />
      <Chip y={CHIP_Y} text="YOUR CARD. AGAIN." c={RED} size={34} />
    </Shot>

    {/* 2 · THE WIDE — the lane it came out of, and the receipt is not short */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage id="a2" f={f} />
      <Bright x={40} y={556} w={932} h={78} c="#25353F" z={14} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 46 + i * 78, top: 556, width: 42,
          height: 78, background: "#31485A", zIndex: 15 }} />
      ))}
      {/* the scanner arch */}
      <div style={{ position: "absolute", left: 236, top: 196, width: 540, height: 22, zIndex: 16,
        background: STEEL, boxShadow: SH_S }} />
      <div style={{ position: "absolute", left: 236, top: 196, width: 22, height: 372, zIndex: 16, background: STEEL }} />
      <div style={{ position: "absolute", left: 754, top: 196, width: 22, height: 372, zIndex: 16, background: STEEL }} />
      <Bright x={272} y={220} w={468} h={26} c="#D9E2E6" z={17} />
      {/* the printer it is coming OUT of — the first cut had the receipt
          floating in mid-air over a white trapezoid, which read as nothing */}
      <div style={{ position: "absolute", left: 560, top: 250, width: 362, height: 54, zIndex: 31,
        background: STEEL_D, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 578, top: 296, width: 326, height: 10, zIndex: 31,
        background: "#0E141A" }} />
      <Receipt f={f} x={580} y={302} s={0.86} at={C1 - 40} z={30} />
      {/* and the ribbon it spills onto the belt */}
      <div style={{ position: "absolute", left: 590, top: 578, width: 302, height: 62, zIndex: 29,
        background: PAPER, clipPath: "polygon(0 0,100% 0,88% 100%,12% 100%)" }} />
      <div style={{ position: "absolute", left: 616, top: 636, width: 250, height: 26, zIndex: 29,
        background: PAPER2 }} />
      <Cl f={f} x={150} y={372} size={222} gaze={1} stern={0.55} nodAmp={2.6} nodSpeed={11} z={32} />
      <Chip y={CHIP_Y} text="EVERY MONTH. FOREVER." c={RED} size={32} />
    </Shot>

    {/* 3 · THE FIVE — the aisle, one shelf end per subscription, all stamped */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage id="a3" f={f} />
      <Cone x={120} y={118} w={780} h={330} c={AMB_L} o={0.15} z={5} />
      {PAID.map((b, i) => (
        <Plate key={b.name} i={i} x={52 + i * 184} y={300} s={1.14}
               t={E(f, C2 + 1 + i * 3, C2 + 13 + i * 3, 0, 1, BACK)}
               dead={E(f, C2 + 15 + i * 3, C2 + 22 + i * 3, 0, 1, OUT)} z={26} />
      ))}
      {/* the shelf they sit on, so they are IN the aisle, not floating */}
      <Bright x={40} y={472} w={932} h={22} c="#8A6C46" z={24} />
      <div style={{ position: "absolute", left: 40, width: 932, top: 494, height: 12, zIndex: 24,
        background: "#3A2C1E" }} />
      <Cl f={f} x={408} y={496} size={172} gaze={0} shock={0.6} nodAmp={2.2} nodSpeed={14} z={32} />
      <Chip y={CHIP_Y} text="FIVE SUBSCRIPTIONS" c={RED} size={34} />
    </Shot>

    {/* 4 · THE NUMBER — the price board flips, and the number climbs to it */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage id="a4" f={f} />
      <div style={{ position: "absolute", left: 84, top: 176, width: 844, height: 300, zIndex: 20,
        background: "#12181F", border: `10px solid ${STEEL_D}`, boxShadow: SH }} />
      <Counter f={f} at={C3 + 3} dur={26} to={TOTAL} y={244} size={132} c={AMB_L} z={30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 386, textAlign: "center", zIndex: 30,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 462, top: 502,
        width: 84, height: 84, objectFit: "contain", filter: "invert(1)", zIndex: 30 }} />
      <Cl f={f} x={78} y={452} size={196} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={9} z={32} />
      <Chip y={CHIP_Y} text="FIVE FREE REPLACEMENTS" c={GO} size={32} />
    </Shot>

    {/* 5 · THE TURN — out the doors, the free rack, names blacked out */}
    <Shot f={f} a={C4} b={9999} k={4}>
      <Stage id="a5" f={f} />
      <Cone x={330} y={118} w={380} h={400} c={GO_L} o={0.14} z={5} />
      <FreeRack f={f} at={C4} x={326} y={200} w={330} />
      <Cl f={f} x={54} y={442} size={206} gaze={2} cheer={0.9} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip y={CHIP_Y} text="ALL FIVE. $0." c={GO} size={36} />
    </Shot>
  </>));
};

/* ############################################################# B · TOLL ROAD
   MECHANISM: DIRECTION. One lit lane running to a vanishing point — the eye is
   led rather than told, and the free off-ramp is the only way out of the shot.
   PLACES: the barrier · the plaza · the booth row · the queue · the off-ramp
   ######################################################################### */
export const CancelHookB: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = CUTS;
  /* down on frame 0 (recognition), lifts a hair, then SLAMS again at f10 —
     establish, then break, without ever opening on an empty gate. */
  const drop = 1 - E(f, 6, 10, 0, 1, IO) * 0.22 + E(f, 10, 14, 0, 1, IO) * 0.22;
  return wrap(f, AMB, (<>
    {/* 1 · THE CHARGE — the barrier is across you, under the sodium canopy */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage id="b1" f={f} />
      {/* the lit canopy soffit — the brightest thing a toll plaza owns */}
      <Bright x={40} y={120} w={932} h={126} c="#D8C48E" z={9} />
      <Bright x={40} y={236} w={932} h={16} c="#8E7638" z={10} />
      <Cone x={286} y={252} w={440} h={300} c={AMB_L} o={0.22} z={6} />
      {/* ⛔ NOT a type-fitting problem, which is what it looked like: the text
          was fine and the BARRIER ARM (z 30) was painted across the C of
          CONTINUE. Measure what is on top before resizing the thing underneath.
          The arm now stops at x=620 and the booth starts at 640. */}
      <Bright x={640} y={266} w={332} h={396} c={PAPER2} z={16} />
      <div style={{ position: "absolute", left: 664, top: 306, width: 284, height: 186, zIndex: 18,
        background: "#26323C", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 38, color: AMB_L,
        textAlign: "center", lineHeight: 1.15, overflow: "hidden" }}>PAY TO<br />CONTINUE</div>
      <Barrier f={f} x={132} y={396} s={1.1} drop={drop} z={30} />
      <Cl f={f} x={62} y={438} size={200} gaze={2} shock={0.8} nodAmp={2} nodSpeed={16} z={34} />
      <Chip y={CHIP_Y} text="CHARGED. AGAIN." c={RED} size={34} />
    </Shot>

    {/* 2 · THE WIDE — every lane is a booth, and every barrier is down */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage id="b2" f={f} />
      <Bright x={40} y={166} w={932} h={54} c={STEEL_D} z={20} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 46 + i * 166, top: 220, width: 22,
          height: 292, background: STEEL, zIndex: 18 }} />
      ))}
      {/* five booths — a roof, a lit window and a mark, so they read as BOOTHS
          and not as five pale rectangles (which is what the first cut gave) */}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`bb${i}`} style={{ position: "absolute", left: 72 + i * 166, top: 330, width: 122,
          height: 182, zIndex: 19,
          transform: `scale(${E(f, C1 + 1 + i * 3, C1 + 12 + i * 3, 0.2, 1, BACK)})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ position: "absolute", left: -8, top: 0, width: 138, height: 18,
            background: STEEL_D, boxShadow: SH_S }} />
          <div style={{ position: "absolute", left: 0, top: 18, width: 122, height: 164,
            background: PAPER2, boxShadow: SH_S }} />
          <div style={{ position: "absolute", left: 14, top: 34, width: 94, height: 66,
            background: "#26323C" }} />
          <div style={{ position: "absolute", left: 31, top: 112, width: 60, height: 60,
            background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(PAID[i].file)} style={{ width: 40, height: 40,
              objectFit: "contain", filter: "none" }} />
          </div>
        </div>
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`ba${i}`} style={{ position: "absolute", left: 66 + i * 166, top: 526, width: 152,
          height: 15, background: RED, zIndex: 22, boxShadow: SH_S,
          opacity: E(f, C1 + 8 + i * 3, C1 + 16 + i * 3, 0, 1, OUT) }} />
      ))}
      {/* near foreground, feet low and cropped — depth, not a stage line */}
      <Cl f={f} x={706} y={434} size={244} gaze={1} stern={0.6} nodAmp={2.2} nodSpeed={13}
          flip z={32} />
      <Chip y={CHIP_Y} text="EVERY MONTH. FOREVER." c={RED} size={32} />
    </Shot>

    {/* 3 · THE FIVE — the gantry names the lanes, and every one is a brand */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage id="b3" f={f} />
      <Bright x={40} y={196} w={932} h={26} c={STEEL_D} z={20} />
      {PAID.map((b, i) => (
        <Plate key={b.name} i={i} x={52 + i * 184} y={244} s={1.12}
               t={E(f, C2 + 1 + i * 3, C2 + 13 + i * 3, 0, 1, BACK)}
               dead={E(f, C2 + 16 + i * 3, C2 + 23 + i * 3, 0, 1, OUT)} z={26} />
      ))}
      {PAID.map((b, i) => (
        <div key={`h${i}`} style={{ position: "absolute", left: 116 + i * 184, top: 222, width: 12,
          height: 24, background: STEEL, zIndex: 25 }} />
      ))}
      <Cl f={f} x={410} y={470} size={186} gaze={0} shock={0.55} nodAmp={2.4} nodSpeed={13} z={32} />
      <Chip y={CHIP_Y} text="FIVE LANES. ALL PAID." c={RED} size={32} />
    </Shot>

    {/* 4 · THE NUMBER — the roadside sign, counting to the real total */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage id="b4" f={f} />
      {/* the queue you are in: PAIRS of tail lights on a car body, receding.
          A single stacked bar read as an artefact, not as traffic. */}
      {Array.from({ length: 7 }, (_, i) => {
        const s = 1 - i * 0.1, cx = 506 + (rnd(i, 3) - 0.5) * 150 * s, cy = 618 - i * 34;
        return (
          <div key={i} style={{ position: "absolute", left: cx - 108 * s, top: cy, zIndex: 12 + (7 - i) }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 216 * s, height: 62 * s,
              background: "#2A1C20", boxShadow: SH_S }} />
            <div style={{ position: "absolute", left: 12 * s, top: 16 * s, width: 46 * s,
              height: 20 * s, background: RED }} />
            <div style={{ position: "absolute", left: 158 * s, top: 16 * s, width: 46 * s,
              height: 20 * s, background: RED }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 84, top: 166, width: 844, height: 288, zIndex: 24,
        background: "#0F151C", border: `10px solid ${STEEL_D}`, boxShadow: SH }} />
      <Counter f={f} at={C3 + 3} dur={26} to={TOTAL} y={230} size={128} c={AMB_L} z={30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 368, textAlign: "center", zIndex: 30,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={60} y={452} size={196} gaze={2} cheer={0.8} nodAmp={3.2} nodSpeed={9} z={34} />
      <Chip y={CHIP_Y} text="THE FREE ONES" c={GO} size={34} />
    </Shot>

    {/* 5 · THE TURN — the off-ramp nobody is in, and what is down it */}
    <Shot f={f} a={C4} b={9999} k={4}>
      <Stage id="b5" f={f} />
      <Cone x={318} y={118} w={400} h={410} c={GO_L} o={0.14} z={5} />
      <FreeRack f={f} at={C4} x={316} y={200} w={340} />
      <Cl f={f} x={46} y={442} size={208} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip y={CHIP_Y} text="ALL FIVE. $0." c={GO} size={36} />
    </Shot>
  </>));
};

/* ############################################################### C · SKYLINE
   MECHANISM: SCALE. Tower height IS the star count, so the ranking is the
   picture. Nothing has to be labelled for the frame to say which is biggest.
   PLACES: the window · the street · the rooftop · the ticker · the tower
   ######################################################################### */
export const CancelHookC: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = CUTS;
  return wrap(f, MAG, (<>
    {/* 1 · THE CHARGE — five charge rows already on the phone, a sixth lands */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage id="c1" f={f} />
      <Cone x={300} y={118} w={430} h={380} c={AMB_L} o={0.17} z={5} />
      <div style={{ position: "absolute", left: 256, top: 134, width: 500, height: 596, zIndex: 20,
        borderRadius: 36, background: "#14181F", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 274, top: 156, width: 464, height: 552, zIndex: 21,
        borderRadius: 26, background: PAPER, overflow: "hidden" }} />
      {PAID.map((b, i) => (
        <div key={b.name} style={{ position: "absolute", left: 286, top: 180 + i * 106, width: 440,
          height: 94, zIndex: 22, background: PAPER2, display: "flex", alignItems: "center",
          gap: 16, padding: "0 18px", fontFamily: inter.fontFamily,
          transform: `translateX(${(1 - E(f, -40 + i * 3, -22 + i * 3, 0, 1, OUT)) * 460}px)` }}>
          <Img src={staticFile(b.file)} style={{ width: 50, height: 50, objectFit: "contain",
            filter: "none" }} />
          <span style={{ flex: 1, fontWeight: 900, fontSize: 27, color: INKD }}>{b.short}</span>
          <span style={{ fontWeight: 900, fontSize: 29, color: RED }}>/mo</span>
        </div>
      ))}
      {/* the break: the fifth charge is not the end of it, and a stamp says so */}
      <div style={{ position: "absolute", left: 268, top: 396, width: 476, height: 100, zIndex: 26,
        background: RED, transform: `rotate(-9deg) scale(${E(f, 4, 12, 0.4, 1, BACK)})`,
        opacity: E(f, 4, 9, 0, 1, OUT), display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 48,
        color: "#FFF8ED", letterSpacing: "0.04em", boxShadow: SH }}>×5 THIS MONTH</div>
      <Cl f={f} x={44} y={440} size={196} gaze={2} shock={0.78} nodAmp={2} nodSpeed={15} z={32} />
      <Chip y={CHIP_Y} text="CHARGED. AGAIN." c={RED} size={34} />
    </Shot>

    {/* 2 · THE WIDE — the street those charges pay for */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage id="c2" f={f} />
      {PAID.map((b, i) => (
        <div key={b.name} style={{ position: "absolute", left: 46 + i * 186, top: 276 + (i % 2) * 58,
          width: 152, height: 74, zIndex: 24, background: i % 2 ? "#C24C86" : "#8C3F9E",
          boxShadow: SH_S, display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scale(${E(f, C1 + 2 + i * 3, C1 + 13 + i * 3, 0.2, 1, BACK)})` }}>
          <Img src={staticFile(b.file)} style={{ width: 46, height: 46, objectFit: "contain",
            filter: "brightness(0) invert(1)" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 40, width: 932, top: 552, height: 16, zIndex: 22,
        background: "#452752" }} />
      <Cl f={f} x={412} y={492} size={178} gaze={0} stern={0.6} nodAmp={2.2} nodSpeed={13} z={32} />
      <Chip y={CHIP_Y} text="EVERY MONTH. FOREVER." c={RED} size={32} />
    </Shot>

    {/* 3 · THE FIVE — from a rooftop: five paid blocks, and how short they are */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage id="c3" f={f} />
      {PAID.map((b, i) => (
        <Tower key={b.name} f={f} x={58 + i * 184} base={560} w={146} h={84 + i * 15}
               c="#2B415E" lit={AMB} at={C2 + 1 + i * 3} z={20} />
      ))}
      {PAID.map((b, i) => (
        <div key={`m${i}`} style={{ position: "absolute", left: 93 + i * 184, top: 574, width: 76,
          height: 76, zIndex: 26, background: PAPER, display: "flex", alignItems: "center",
          justifyContent: "center", boxShadow: SH_S,
          transform: `scale(${E(f, C2 + 4 + i * 3, C2 + 15 + i * 3, 0, 1, BACK)})` }}>
          <Img src={staticFile(b.file)} style={{ width: 52, height: 52, objectFit: "contain",
            filter: "none" }} />
        </div>
      ))}
      <Cl f={f} x={414} y={346} size={168} gaze={0} shock={0.5} nodAmp={2.4} nodSpeed={13} z={32} />
      <Chip y={196} text="FIVE SUBSCRIPTIONS" c={RED} size={34} />
    </Shot>

    {/* 4 · THE NUMBER — the building ticker, climbing to the real total */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage id="c4" f={f} />
      <div style={{ position: "absolute", left: 76, top: 172, width: 860, height: 300, zIndex: 24,
        background: "#0B0F14", border: `12px solid ${STEEL_D}`, boxShadow: SH }} />
      <Counter f={f} at={C3 + 3} dur={26} to={TOTAL} y={238} size={134} c={AMB_L} z={30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 384, textAlign: "center", zIndex: 30,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 466, top: 494,
        width: 80, height: 80, objectFit: "contain", filter: "invert(1)", zIndex: 30 }} />
      <Cl f={f} x={68} y={452} size={192} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={9} z={32} />
      <Chip y={CHIP_Y} text="THE FREE ONES" c={GO} size={34} />
    </Shot>

    {/* 5 · THE TURN — one green tower goes up past all of them, still redacted */}
    <Shot f={f} a={C4} b={9999} k={4}>
      <Stage id="c5" f={f} />
      <Tower f={f} x={386} base={726} w={230} h={548} c="#1F5142" lit={GO_L} at={C4} z={16} />
      <FreeRack f={f} at={C4 + 3} x={326} y={196} w={350} />
      <Cl f={f} x={48} y={480} size={202} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip y={CHIP_Y} text="ALL FIVE. $0." c={GO} size={36} />
    </Shot>
  </>));
};

/* ############################################################# D · TURNSTILE
   MECHANISM: CONTRAST. One green gate in a field of red — the cheapest, most
   legible ranking there is, and it reads at thumb size on mute.
   PLACES: the reader · the gate line · the poster wall · the board · the gate
   ######################################################################### */
export const CancelHookD: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = CUTS;
  return wrap(f, RED, (<>
    {/* 1 · THE CHARGE — the reader is already red, and it re-flashes */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage id="d1" f={f} />
      {/* the tiled hall wall — the brightest thing a station owns */}
      <Bright x={40} y={126} w={932} h={310} c="#CFC4BF" z={8} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 40 + i * 78, top: 126, width: 4,
          height: 310, background: "#B3A49E", zIndex: 9 }} />
      ))}
      <div style={{ position: "absolute", left: 40, width: 932, top: 278, height: 5, zIndex: 9,
        background: "#B3A49E" }} />
      <Cone x={286} y={436} w={440} h={280} c={PAPER} o={0.14} z={10} />
      {/* the reader, big and near */}
      <div style={{ position: "absolute", left: 214, top: 262, width: 584, height: 372, zIndex: 18,
        borderRadius: 22, background: PAPER2, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 254, top: 296, width: 504, height: 218, zIndex: 20,
        background: RED, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 112, color: "#FFF8ED",
        opacity: 0.86 + Math.abs(Math.sin(f / 4)) * 0.14 }}>✕</div>
      <div style={{ position: "absolute", left: 214, width: 584, top: 534, textAlign: "center",
        zIndex: 22, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44, color: INKD,
        letterSpacing: "0.1em" }}>PAY TO ENTER</div>
      <Card x={782} y={412} s={0.6} rot={11} z={26} />
      <Cl f={f} x={44} y={438} size={192} gaze={2} shock={0.8} nodAmp={2} nodSpeed={16} z={32} />
      <Chip y={CHIP_Y} text="CHARGED. AGAIN." c={RED} size={34} />
    </Shot>

    {/* 2 · THE WIDE — a whole hall of them, all shut */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage id="d2" f={f} />
      {Array.from({ length: 5 }, (_, i) => (
        <Gate key={i} x={52 + i * 180} y={366} s={1.0} i={i}
              t={E(f, C1 + 1 + i * 3, C1 + 13 + i * 3, 0.2, 1, BACK)} z={24} />
      ))}
      <Cl f={f} x={412} y={492} size={172} gaze={0} stern={0.62} nodAmp={2.2} nodSpeed={13} z={32} />
      <Chip y={CHIP_Y} text="EVERY MONTH. FOREVER." c={RED} size={32} />
    </Shot>

    {/* 3 · THE FIVE — the corridor wall, one poster per subscription */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage id="d3" f={f} />
      <Cone x={120} y={118} w={780} h={320} c={AMB_L} o={0.14} z={5} />
      {PAID.map((b, i) => (
        <div key={b.name} style={{ position: "absolute", left: 48 + i * 184, top: 236, width: 156,
          height: 230, zIndex: 24, background: PAPER, boxShadow: SH,
          transform: `scale(${E(f, C2 + 1 + i * 3, C2 + 13 + i * 3, 0.2, 1, BACK)})` }}>
          <Img src={staticFile(b.file)} style={{ position: "absolute", left: 38, top: 42, width: 80,
            height: 80, objectFit: "contain", filter: "none" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 142, textAlign: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17, color: INKD }}>{b.short}</div>
          <div style={{ position: "absolute", left: 20, right: 20, top: 174, height: 34,
            background: RED, opacity: E(f, C2 + 16 + i * 3, C2 + 23 + i * 3, 0, 1, OUT),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19, color: "#FFF8ED" }}>PAID</div>
        </div>
      ))}
      <Cl f={f} x={414} y={482} size={182} gaze={0} shock={0.55} nodAmp={2.4} nodSpeed={13} z={32} />
      <Chip y={CHIP_Y} text="FIVE SUBSCRIPTIONS" c={RED} size={34} />
    </Shot>

    {/* 4 · THE NUMBER — the departure board, flipping up to the real total */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage id="d4" f={f} />
      <div style={{ position: "absolute", left: 62, top: 162, width: 888, height: 312, zIndex: 24,
        background: "#07090C", border: `12px solid ${STEEL_D}`, boxShadow: SH }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 118 + i * 132, top: 196, width: 112,
          height: 168, zIndex: 26, background: "#12171E", border: "3px solid #1E262F" }} />
      ))}
      <Counter f={f} at={C3 + 3} dur={26} to={TOTAL} y={226} size={126} c={AMB_L} z={30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 388, textAlign: "center", zIndex: 30,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Cl f={f} x={60} y={456} size={192} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={9} z={32} />
      <Chip y={CHIP_Y} text="THE FREE ONES" c={GO} size={34} />
    </Shot>

    {/* 5 · THE TURN — the one gate standing open, and what is through it */}
    <Shot f={f} a={C4} b={9999} k={4}>
      <Stage id="d5" f={f} />
      <Cone x={322} y={118} w={390} h={410} c={GO_L} o={0.14} z={5} />
      <Gate x={62} y={396} s={1.1} open t={E(f, C4 + 1, C4 + 12, 0.2, 1, BACK)} z={24} />
      <FreeRack f={f} at={C4 + 2} x={330} y={196} w={330} />
      <Cl f={f} x={752} y={442} size={198} gaze={1} cheer={0.92} nodAmp={3.6} nodSpeed={8}
          flip z={36} />
      <Chip y={CHIP_Y} text="ALL FIVE. $0." c={GO} size={36} />
    </Shot>
  </>));
};

/* ################################################################# E · PLANT
   MECHANISM: TIME. The calendar wheel is the only thing moving, so it rules
   the frame — and what it rules is the fact that this happens again on the 1st.
   PLACES: the stamp head · the plant floor · the wheel · the gantry · the yard
   ######################################################################### */
export const CancelHookE: React.FC = () => {
  const f = useCurrentFrame();
  const [C1, C2, C3, C4] = CUTS;
  /* landed on frame 0, lifts, and comes down again — the charge already
     happened, and the reel opens on it happening AGAIN. */
  const hit = 1 - E(f, 4, 11, 0, 1, IO) * 0.85 + E(f, 12, 17, 0, 1, IO) * 0.85;
  return wrap(f, AMB, (<>
    {/* 1 · THE CHARGE — the stamp is on your card when the reel starts */}
    <Shot f={f} a={0} b={C1} k={0}>
      <Stage id="e1" f={f} />
      {/* the platen: a full-width lit bed, the bright surface a plant owns */}
      <Bright x={40} y={452} w={932} h={228} c={PAPER2} z={14} />
      <Bright x={40} y={452} w={932} h={18} c="#FDFAF3" z={15} />
      <Cone x={290} y={118} w={440} h={340} c={AMB_L} o={0.20} z={5} />
      <Card x={352} y={418} s={1.0} rot={-3} z={20} />
      {/* the press: two columns, a crosshead and a ram that LANDS on the platen.
          The first cut left the head floating 70px short of the bed, so it read
          as a rectangle rather than as a press. */}
      {/* machined LIGHT steel, not dark: the dark frame cost the shot 3.5 luma
          and put it back under the 140 bar it had just cleared. */}
      <div style={{ position: "absolute", left: 214, top: 126, width: 46, height: 330, zIndex: 22,
        background: "#93A2B0", boxShadow: SH_S }} />
      <div style={{ position: "absolute", left: 752, top: 126, width: 46, height: 330, zIndex: 22,
        background: "#93A2B0", boxShadow: SH_S }} />
      <div style={{ position: "absolute", left: 200, top: 126, width: 612, height: 42, zIndex: 23,
        background: "#A7B4C0", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 332, top: 282 - (1 - hit) * 150, width: 348,
        height: 170, zIndex: 26, background: STEEL_D, boxShadow: SH }} />
      <div style={{ position: "absolute", left: 362, top: 372 - (1 - hit) * 150, width: 288,
        height: 56, zIndex: 27, background: RED, display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 32,
        color: "#FFF8ED" }}>BILLED</div>
      <Cl f={f} x={54} y={430} size={190} gaze={2} shock={0.8} nodAmp={2} nodSpeed={16} z={32} />
      <Chip y={CHIP_Y} text="CHARGED. AGAIN." c={RED} size={34} />
    </Shot>

    {/* 2 · THE WIDE — the floor it runs on, one machine per subscription */}
    <Shot f={f} a={C1} b={C2} k={1}>
      <Stage id="e2" f={f} />
      {PAID.map((b, i) => (
        <div key={b.name} style={{ position: "absolute", left: 48 + i * 184, top: 306, width: 156,
          height: 212, zIndex: 24, background: "#28545A", boxShadow: SH,
          transform: `scale(${E(f, C1 + 1 + i * 3, C1 + 13 + i * 3, 0.2, 1, BACK)})` }}>
          <div style={{ position: "absolute", left: 20, top: 20, width: 116, height: 90,
            background: PAPER, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(b.file)} style={{ width: 64, height: 64, objectFit: "contain",
              filter: "none" }} />
          </div>
          <div style={{ position: "absolute", left: 42, top: 128 + Math.abs(Math.sin((f + i * 7) / 5)) * 22,
            width: 72, height: 30, background: AMB }} />
          <div style={{ position: "absolute", left: 20, bottom: 16, width: 116, height: 12,
            background: STEEL_D }} />
        </div>
      ))}
      <Cl f={f} x={412} y={496} size={172} gaze={0} stern={0.62} nodAmp={2.2} nodSpeed={13} z={32} />
      <Chip y={CHIP_Y} text="EVERY MONTH. FOREVER." c={RED} size={32} />
    </Shot>

    {/* 3 · THE FIVE — the wheel turns to the 1st and fires all five stamps */}
    <Shot f={f} a={C2} b={C3} k={2}>
      <Stage id="e3" f={f} />
      {/* the wheel is the hero of this mechanism, so it gets the size and the
          left third to itself; the stamps it fires live in the right two */}
      <Wheel f={f} x={52} y={244} s={1.26} at={C2} z={30} />
      {PAID.map((b, i) => (
        <Plate key={b.name} i={i} x={412 + (i % 3) * 190} y={206 + Math.floor(i / 3) * 176} s={0.98}
               t={E(f, C2 + 6 + i * 3, C2 + 17 + i * 3, 0, 1, BACK)}
               dead={E(f, C2 + 18 + i * 3, C2 + 25 + i * 3, 0, 1, OUT)} z={26} />
      ))}
      <Cl f={f} x={790} y={452} size={196} gaze={1} shock={0.5} nodAmp={2.4} nodSpeed={13}
          flip z={32} />
      <Chip y={CHIP_Y} text="FIVE SUBSCRIPTIONS" c={RED} size={34} />
    </Shot>

    {/* 4 · THE NUMBER — the control gantry board, counting to the real total */}
    <Shot f={f} a={C3} b={C4} k={3}>
      <Stage id="e4" f={f} />
      <div style={{ position: "absolute", left: 76, top: 172, width: 860, height: 300, zIndex: 24,
        background: "#0A0E13", border: `12px solid ${STEEL_D}`, boxShadow: SH }} />
      <Counter f={f} at={C3 + 3} dur={26} to={TOTAL} y={240} size={132} c={AMB_L} z={30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 384, textAlign: "center", zIndex: 30,
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 42, letterSpacing: "0.14em",
        color: PAPER }}>★ ON GITHUB</div>
      <Img src={staticFile("logos/github.svg")} style={{ position: "absolute", left: 466, top: 494,
        width: 80, height: 80, objectFit: "contain", filter: "invert(1)", zIndex: 30 }} />
      <Cl f={f} x={66} y={454} size={194} gaze={2} cheer={0.85} nodAmp={3.4} nodSpeed={9} z={32} />
      <Chip y={CHIP_Y} text="THE FREE ONES" c={GO} size={34} />
    </Shot>

    {/* 5 · THE TURN — out in the yard, five crates, nothing to pay */}
    <Shot f={f} a={C4} b={9999} k={4}>
      <Stage id="e5" f={f} />
      <Cone x={318} y={118} w={400} h={400} c={GO_L} o={0.14} z={5} />
      <FreeRack f={f} at={C4} x={320} y={198} w={344} />
      <Cl f={f} x={50} y={442} size={206} gaze={2} cheer={0.92} nodAmp={3.6} nodSpeed={8} z={36} />
      <Chip y={CHIP_Y} text="ALL FIVE. $0." c={GO} size={36} />
    </Shot>
  </>));
};
