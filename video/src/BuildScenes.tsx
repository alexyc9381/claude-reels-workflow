import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, BigNum, Contact, Mark, MarkPlate, MarkCast, Edge,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Runner, Ring, Puff, Pool, Steam, Sweat, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Beam, Strip,
  GY, BAND_Y, SAFE3,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, MAG, INDIGO, BONE,
  FIVERR, UPWORK,
} from "./BuildWorld";
import {
  ProvStrip, NameStrip, Shutter, AwningBoard, IronGate, MachineBed, WallClock, Hoist,
  MillCabinet, WordTile, MillLine, ReelCan, TradeCounter, Docket, Stall,
  VoiceBooth, Stool, DeadMic, Lathe, ScanGantry, PhotoPrint, Turntable,
  ShopFront, EcomCrate, Trolley, Guide, StrikePress, KeywordPlate,
} from "./BuildProps";
import { Room, Jamb, Stack, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 133 · "BUILD" — THE SCENES.  Board: storyboards/133-build.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him":
     S0  hauls the shutter up on his own shop against its weight
     S1  slams three machines into their beds as the hoist drops them
     S2  throws the mill's lamp switch and the name flips up
     S3  drops ONE word tile in, then works the line as three stations fire
     S4  slides the finished reel across the counter and stamps the docket
     S5  swings the lathe disc round to face us
     S6  lays one minute of tape on the deck and the copies stack out
     S7  hangs the job board and rides the discs out to two stalls
     S8  walks OUT and pulls the door shut while the machine keeps working
     S9  drives the scan head down and the name burns into steel
     S10 slots one flat photo in, and the gantry REFUSES before it tears free
     S11 cranks the table, strikes the lamps, lifts the model off
     S12 loads the conveyor and stamps the last crate
     S13 shoves a loaded trolley at the gate and the gate does not move
     S14 strikes three plates into the guide and puts it in the hasp
     S15 walks the goods through the gate he just opened

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the room does
   WHILE the scene happens. Every scene still owes its own four-part event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210), and
   nothing lands on the sprite's FACE.

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly THREE re-framings — S3, S8 and
   S11 — and all three are CUTS that reveal what a continuous take cannot.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10.
    ⛔ The SAFE box in `BuildWorld.SAFE3` is derived from exactly these numbers. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -6, dy: 12, s: 1.012, rot: -0.5 },
  amber: { dx: -50, dy: -34, s: 1.048, rot: 2.5 },
  steel: { dx: 52, dy: 30, s: 1.052, rot: -2.3 },
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
    silently inert: 0/214/428 over a 204.6px pitch are the SAME phase. `n`
    changes the pitch itself, which is the only offset that cannot collapse. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 92, steel: 168 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.74, steel: 0.52 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 11 };
const PJ: Record<Variant, number> = { house: 0, amber: 1, steel: 2 };
/** ⭐ PER-CUT LAYOUT on the flattest scenes — one large object on a plain field
    is the hardest frame to differentiate and a grade has nothing to bite on.
    ⛔ USED WHOLE, never scaled to 0.3-0.5: reel 132's dHash MIN of 8 was three
    scenes that had quietly shrunk their own offset. */
const LAY: Record<Variant, { a: number; b: number; c: number }> = {
  house: { a: 0, b: 0, c: 0 },
  amber: { a: 88, b: -74, c: -58 },
  steel: { a: -94, b: 82, c: 74 },
};
/** ⛔ THREE CUTS = THREE HOOKS, and the body must not be the only thing that
    differs. `seqOrder` permutes which sub-event fires first while the BEAT
    FRAMES stay put, so the per-reel SFX bank still lands on the picture. */
const seqOrder = (v: Variant, n: number) =>
  Array.from({ length: n }, (_, i) => (i + PJ[v] * 2) % n);

/** the one text chip a shot is allowed, in the reserved band */
const BandChip: React.FC<{ t: string; c?: string; fg?: string }> =
  ({ t, c = INK, fg = "#F6F2E8" }) => <Chip t={t} y={BAND_Y} c={c} fg={fg} s={0.94} z={94} />;

/* =========================================================================
   S0 · THE TRADE ROW — 0.00 to 2.40s (72f) · HOOK
   VO: "You can sell these three free Claude plugins on Fiverr and Upwork."

   ⭐⭐⭐ THE HOOK IS AN IMAGE, NOT A ROOM: one figure, dead centre, doing one
   thing, with nothing else standing on the floor. The shutter is the only
   subject; the row behind it is depth, not competition.

   ⭐⭐ AND IT IS ANTICIPATORY (§25). At frame 0 the shutter is already 22% up
   with light spilling under it and a flywheel turning in the gap — the shot has
   PROMISED something and withheld what it is. That is the difference between
   travel toward a destination and a reason to stay.

   ⛔ FRAME 0 IS PRE-SEEDED AND SETTLED, not merely started (reel 115): `k`
   starts at 0.22, the awning bulbs are mid-cycle, and the traffic band is
   already crossing. A pre-seeded element that is still animating IN on frame 0
   renders as a half-rolled blank.

   ⭐ THE GATE IS PLANTED HERE, far right, UNLIT, and never mentioned again
   until S13. It is the villain and it is good ironwork, not a grey slab.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("row");
  const L = LAY[v];
  /* the chain leads, the curtain follows — overlapping action, never stepped */
  const chain = E(f, 4, 54, 0, 1, IO);
  const k = 0.22 + chain * 0.78;
  const strain = E(f, 2, 16, 0, 0.94, OUT) * (1 - E(f, 46, 58, 0, 1, IO));
  const pull = Math.sin(f / 5.2) * 0.10 * (1 - E(f, 48, 60, 0, 1, IO));

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.50}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
        rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        lamp={{ x: 214 + L.a * 0.3, y: 122, r: 250 }} floorKind="tarmac" grit={0.9} />

      {/* the terrace opposite, in silhouette — depth plane 2 */}
      {[64, 268, 470].map((x, i) => (
        <ShopFront key={"sf" + i} x={x + L.b * 0.16} y={p.horizon + 18} s={0.66 + i * 0.06}
          c="#3E3348" z={11} />
      ))}
      {/* ⭐ the background process: traffic crossing the far end, all scene */}
      <Runner y={p.horizon - 26} f={f} z={13} rate={6.4} pitch={214} w={150} h={62}
        kind="car" c="#C8B48E" c2="#141018" rail={false} o={0.9} />

      {/* the sodium lamp on its bracket — the one practical */}
      <div style={{ position: "absolute", left: 168, top: 60, width: 96, height: 28, zIndex: 22,
        borderRadius: "6px 6px 20px 20px", background: "linear-gradient(176deg,#6E6656,#2E2A22)" }} />
      <div style={{ position: "absolute", left: 258, top: 66, width: 120, height: 11, zIndex: 22,
        background: "#2E2A22" }} />

      {/* the shopfront the shutter is set into */}
      <div style={{ position: "absolute", left: 232 + L.a, top: 186, width: 552, height: 400,
        zIndex: 30, background: "linear-gradient(176deg,#4A3E30 0%,#241C14 100%)",
        border: "8px solid rgba(0,0,0,0.5)" }} />
      {/* what is BEHIND it, revealed as the curtain climbs: three lit bays with
          machines already mid-cycle. The reveal is the hook's payoff. */}
      <div style={{ position: "absolute", left: 248 + L.a, top: 200, width: 520, height: 372,
        zIndex: 32, overflow: "hidden", background: "#120E0A" }}>
        {R.tools.map((t, i) => (
          <React.Fragment key={"by" + i}>
            <div style={{ position: "absolute", left: 18 + i * 170, top: 40, width: 152,
              height: 300, background: `linear-gradient(176deg, ${dkh(t.c, 0.40)} 0%, ${dkh(t.c, 0.76)} 100%)`,
              border: "4px solid rgba(0,0,0,0.44)" }} />
            {/* each machine's flywheel, turning at its own rate */}
            <div style={{ position: "absolute", left: 46 + i * 170, top: 128, width: 96, height: 96,
              borderRadius: "50%", border: `10px solid ${mxh(t.c, 0.34)}`,
              transform: `rotate(${f * (4.4 + i * 2.1)}deg)` }}>
              <div style={{ position: "absolute", left: "50%", top: 4, width: 6, height: 28,
                marginLeft: -3, background: mxh(t.c, 0.66) }} />
            </div>
            <div style={{ position: "absolute", left: 30 + i * 170, top: 262, width: 128,
              height: 14, background: mxh(t.c, 0.24 + 0.3 * Math.abs(Math.sin(f / 7 + i))) }} />
          </React.Fragment>
        ))}
      </div>

      <Shutter x={248 + L.a} y={200} w={520} h={372} k={k} f={f} z={40} />
      <AwningBoard x={252 + L.a} y={82} w={512} f={f} z={66} />

      {/* ⭐ THE VILLAIN, PLANTED. Unlit, far right, unremarked. */}
      <div style={{ position: "absolute", left: 856 + L.c * 0.3, top: 300, width: 150, height: 300,
        zIndex: 28 }}>
        <IronGate x={0} y={0} w={150} h={300} f={f} open={0} lit={0} z={28} />
      </div>

      {/* the hero, hauling. ⛔ HE STAYS DARK: the awning carries the luma bar,
          which is what lets him be the biggest value gap in the reel. */}
      <Contact x={392 + L.a} y={GY - 12} w={228} o={0.42} />
      <Hero f={f} x={506 + L.a} y={GY} size={286} z={56} act={1} ph={0.4}
        strain={strain} drive={pull} costume={{ constr: 1 }} tint="#8E4A2E"
        stern={strain > 0.5 ? 1 : 0} />
      <Forearm x0={560 + L.a} y0={GY - 214} x1={786 + L.a} y1={GY - 366} w={26}
        c="#8E4A2E" z={58} />

      {/* the cost of the haul: grit shaken off the shutter box */}
      {strain > 0.4 && <Fall x={252 + L.a} y={168} w={520} f={f} at={6} z={72} />}
      <Puff x={506 + L.a} y={GY} f={f} at={50} c="#C8B48E" z={70} />

      <BandChip t={`${R.count} FREE TOOLS · ${R.markets[0]} + ${R.markets[1]}`} c={INK} />
      <Edge side="l" c="#1A1218" w={104} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S1 · THE FIT-OUT — 2.40 to 4.73s (70f) · SETUP
   VO: "And the best part, they take just five minutes to set up."

   ⛔ THE §3 TEST KILLED THE FIRST DRAFT. "Five minutes" drawn as a clock alone
   is a NUMBER TYPESET AT ITS VALUE — the picture adds nothing the words did not
   already say. Rebuilt as three machines being craned into their beds and
   locked, with the clock as an instrument in the room whose minute hand barely
   travels across the whole scene.

   ⛔ ARRIVALS SPAN THE FULL 70 FRAMES (f6 / f26 / f46). Bunching them in the
   first third leaves the tail dead, which is worth more than any effect.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fitout");
  const L = LAY[v];
  const ord = seqOrder(v, 3);
  const AT = [6, 26, 46];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.54}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="gantry"
        rake={0.11 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.2} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.7}
        window={{ x: 686 + L.b * 0.2, y: 168, w: 250, h: 210 }} />

      <WallClock x={148 + L.a * 0.4} y={250} s={158} f={f} z={30} />

      {/* the three beds, and each one reads while it is still EMPTY */}
      {R.tools.map((t, i) => (
        <MachineBed key={"bd" + i} x={228 + i * 246 + L.b * 0.2} y={GY - 26} w={214} i={i}
          z={34} stencil={i === 1} />
      ))}

      {/* the hoist drops them in, one at a time, across the whole scene */}
      {R.tools.map((t, i) => {
        const at = AT[ord[i]];
        const drop = E(f, at, at + 13, 0, 1, IN_Q);
        const land = E(f, at + 12, at + 19, 0, 1, OUT);
        const sq = squash(f - at - 12, 6, 0.20, 3, 12);
        if (f < at - 2) return null;
        return (
          <React.Fragment key={"hz" + i}>
            {drop < 1 && (
              <Hoist x={335 + i * 246 + L.b * 0.2} y={126} drop={drop} c={t.c} f={f} z={56}
                label={t.out} />
            )}
            {drop >= 1 && (
              <div style={{ position: "absolute", left: 335 + i * 246 + L.b * 0.2 - 100,
                top: GY - 218, width: 200, height: 196, zIndex: 50,
                transform: `scale(${1 + (1 - sq) * 0}, ${sq})`, transformOrigin: "50% 100%" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 6,
                  background: `linear-gradient(176deg, ${mxh(t.c, 0.24)} 0%, ${dkh(t.c, 0.36)} 100%)`,
                  border: "5px solid rgba(0,0,0,0.5)" }}>
                  <div style={{ position: "absolute", left: 16, top: 18, right: 16, height: 58,
                    borderRadius: 4, background: "rgba(0,0,0,0.34)" }} />
                  <div style={{ position: "absolute", left: 20, top: 96, width: 62, height: 62,
                    borderRadius: "50%", border: `8px solid ${mxh(t.c, 0.44)}`,
                    transform: `rotate(${f * 6}deg)` }} />
                  {/* the quarter-turn lock, thrown by the hero */}
                  <div style={{ position: "absolute", left: 128, top: 112, width: 44, height: 12,
                    borderRadius: 6, background: land > 0.5 ? GREEN : "#6E6656",
                    transform: `rotate(${land * 90}deg)`, transformOrigin: "50% 50%" }} />
                </div>
              </div>
            )}
            {land > 0 && land < 1 && (<>
              <Ring x={335 + i * 246 + L.b * 0.2} y={GY - 18} f={f} at={at + 12} c="#F2E4C4"
                z={74} s={0.8} />
              <Puff x={335 + i * 246 + L.b * 0.2} y={GY - 14} f={f} at={at + 12} c="#C6BCA2"
                z={72} />
            </>)}
          </React.Fragment>
        );
      })}

      {/* the hero slams each lock home — his `drive` is on the beat frames */}
      <Contact x={766 + L.c * 0.2} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={856 + L.c * 0.2} y={GY} size={232} z={56} act={1} ph={1.2}
        drive={AT.reduce((a, at) => a + (E(f, at + 10, at + 15, 0, 1, IN_Q) -
          E(f, at + 15, at + 24, 0, 1, OUT)) * -0.34, 0)}
        costume={{ constr: 1 }} tint="#8E4A2E" cheer={f > 62 ? 1 : 0} />

      <BandChip t={`${R.setup} TO SET UP`} c={INK} />
      <Edge side="r" c="#1E1A14" w={112} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE VIDEO MILL — 4.73 to 6.27s (46f) · ESCALATE 1
   VO: "First, Money Printer Turbo."

   ⛔ THREE "A TOOL GETS NAMED" SCENES IS THE one-prop-five-scenes SHAPE, so
   each gets a DIFFERENT REVEAL MECHANISM AND A DIFFERENT MATERIAL. This one is
   a SODIUM LAMP STRIKING (two flickers, then hard) over a SPLIT-FLAP that lands
   letter by letter — a hard edge inside one audit sample, not a smear.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("mill");
  const L = LAY[v];
  /* the strike: flicker, flicker, hard on */
  const lit = f < 6 ? 0 : f < 8 ? 0.5 : f < 10 ? 0.1 : E(f, 10, 16, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.56}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="joist"
        rake={0.15 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.4} rakeN={RAKE_N[v]}
        lamp={lit > 0.3 ? { x: 506 + L.a, y: 118, r: 300 } : null}
        floorKind="boards" grit={0.8} />

      {/* the wall of spools behind — a dense, on-topic SET is worth more than
          any effect (§1), and every one of them turns */}
      {Array.from({ length: 18 }, (_, i) => (
        <div key={"sw" + i} style={{ position: "absolute", left: 62 + (i % 6) * 158,
          top: 210 + Math.floor(i / 6) * 116, width: 86, height: 86, zIndex: 16,
          borderRadius: "50%", border: `9px solid ${dkh(SODIUM, 0.52 - lit * 0.16)}`,
          transform: `rotate(${f * (2.2 + (i % 4) * 1.3)}deg)`, opacity: 0.9 }}>
          <div style={{ position: "absolute", left: "50%", top: 3, width: 5, height: 20,
            marginLeft: -2.5, background: dkh(SODIUM, 0.30) }} />
        </div>
      ))}
      <Runner y={196} f={f} z={20} rate={7.6} pitch={188} w={128} h={54} kind="load"
        c="#E0B876" c2="#1A1208" rail hang={10} o={0.92} />

      <MillCabinet x={272 + L.a} y={330} w={468} h={300} f={f} lit={lit} z={40} />
      <NameStrip x={506 + L.a} y={252} i={0} f={f} at={12} kind="flap" s={1} z={76} />
      <ProvStrip x={352 + L.a} y={648} i={0} s={1} z={74} on={E(f, 20, 28, 0, 1, OUT)} />

      {/* the hero throws the switch — the trigger is visible */}
      <Contact x={126 + L.c * 0.2} y={GY - 12} w={186} o={0.4} />
      <Hero f={f} x={216 + L.c * 0.2} y={GY} size={226} z={56} act={3} ph={0.8}
        drive={E(f, 3, 8, 0, 1, IN_Q) * -0.4 + E(f, 8, 18, 0, 1, OUT) * 0.4}
        costume={{ chef: 1 }} tint="#8E4A2E" cheer={lit > 0.8 ? 1 : 0} />
      <div style={{ position: "absolute", left: 292 + L.c * 0.2, top: GY - 268, width: 30,
        height: 76, zIndex: 54, borderRadius: 5,
        background: "linear-gradient(176deg,#8E8672,#3A342A)",
        transform: `rotate(${lit > 0.2 ? 32 : -32}deg)`, transformOrigin: "50% 100%" }} />

      <BandChip t="ONE TOPIC · A FINISHED VIDEO" c={INK} />
      <Edge side="l" c="#1C1308" w={98} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE MILL LINE — 6.27 to 9.90s (109f) · ESCALATE 1
   VO: "Just type one word or topic and it writes a script, records the
        voiceover, and edits the final video"

   ⭐⭐ THE BEATS ARE ON THE MEASURED WORD ONSETS, pulled out of the caption
   JSON, not spread evenly: script @32, voiceover @54, edits @77 (local).
   A scene can be "about" the right subject and depict none of the words.

   ⛔ THIS IS A CUT, and it earns one: the wide cannot show the line INSIDE the
   machine. Same subject, new access.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("millc");
  const L = LAY[v];
  const feed = E(f, 4, 14, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.58}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="tray"
        rake={0.16 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.2} rakeN={RAKE_N[v]}
        lamp={{ x: 506 + L.a * 0.4, y: 150, r: 280 }} floorKind="tile" grit={0.8} />

      {/* ⭐ THE BACKGROUND PROCESS AND THE BIGGEST MOTION LEVER IN THE TABLE:
          a full-width high-contrast travelling band, feathered, taken up
          through SPEED rather than opacity (§11's correction). */}
      <Runner y={598} f={f} z={24} rate={9.4} pitch={166} w={122} h={58} kind="cell"
        c="#BFE8CE" c2="#0A1512" rail o={0.95} />

      {/* the hopper the word goes into */}
      <div style={{ position: "absolute", left: 424 + L.b * 0.3, top: 130, width: 172, height: 96,
        zIndex: 40, clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
        background: "linear-gradient(176deg,#3A5648,#0E1A14)" }} />
      <WordTile x={510 + L.b * 0.3} y={120 + feed * 118} s={1} z={80}
        rot={-8 + feed * 8} />

      <MillLine f={f} beats={[32, 54, 77]} z={44} />

      {/* the hero works the line — his drive lands on each station's beat */}
      <Contact x={806 + L.c * 0.3} y={GY - 12} w={190} o={0.38} />
      <Hero f={f} x={896 + L.c * 0.3} y={GY} size={228} z={56} act={1} ph={2.1}
        drive={[32, 54, 77].reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 11, 0, 1, OUT)) * -0.30, 0)}
        costume={{ glasses: 1 }} tint="#8E4A2E" gaze={-0.5}
        cheer={f > 96 ? 1 : 0} />

      {/* the arrival that costs: rings and recoil on each station */}
      {[32, 54, 77].map((at, i) => (
        <Ring key={"rg" + i} x={[210, 400, 700][i]} y={[330, 440, 300][i]} f={f} at={at}
          c={["#BFE8CE", "#7FC0C9", "#E7A94C"][i]} z={74} s={0.72} />
      ))}

      <BandChip t="SCRIPT · VOICEOVER · FINAL CUT" c={INK} />
      <Edge side="r" c="#050C0A" w={106} z={93} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE TRADE COUNTER — 9.90 to 11.19s (39f) · PAYOFF 1
   VO: "to sell to businesses."

   ⛔ NO MONEY, ANYWHERE. Alex says not one figure about what any of this earns,
   so the frame says none either. The transaction is a DOCKET being stamped, and
   the stamp RECOILS — nothing lands and stops.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  const L = LAY[v];
  const slide = E(f, 3, 17, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.52}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
        rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.6} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6}
        window={{ x: 96 + L.a * 0.2, y: 156, w: 300, h: 226 }} />

      {/* the queue outside the window — the businesses, on four action loops */}
      {[0, 1, 2].map(i => (
        <Crew key={"q" + i} f={f} x={132 + i * 118 + L.a * 0.2} y={p.horizon + 34} i={i + 4}
          size={104} z={16} at={0} tint="#6E6656" />
      ))}

      <TradeCounter x={210 + L.b * 0.2} y={492} w={620} z={52} />
      {/* the finished good crossing the counter */}
      <ReelCan x={318 + slide * 340 + L.b * 0.2} y={454 - Math.sin(slide * Math.PI) * 26}
        s={0.92} z={80} f={f} rock={slide >= 1 ? 5 : 0} />
      <Docket x={772 + L.c * 0.2} y={556} f={f} at={20} s={0.94} z={84} />

      {/* the buyer's hands take it — two forearms entering from frame right */}
      <Forearm x0={1006} y0={498} x1={866} y1={470} w={30} c="#7E6A56" z={82} />
      <Forearm x0={1006} y0={562} x1={880} y1={528} w={30} c="#7E6A56" z={82} />

      <Contact x={186 + L.a * 0.2} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={276 + L.a * 0.2} y={GY} size={230} z={56} act={1} ph={0.3}
        drive={E(f, 3, 12, 0, 1, IO) * 0.30} costume={{ suit: 1 }} tint="#8E4A2E"
        cheer={f > 26 ? 1 : 0} />

      <BandChip t="SELL IT TO BUSINESSES" c={INK} />
      <Edge side="r" c="#1E1A14" w={98} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE VOICE SHOP — 11.19 to 12.77s (47f) · ESCALATE 2
   VO: "Second, GPT SoVITS."

   ⭐ REVEAL MECHANISM TWO, AND IT IS NOT S2's: an ON AIR sign glows and the name
   is CUT INTO A DISC that swings round to face us. A lathe reveals by TURNING.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("booth");
  const L = LAY[v];
  const onAir = f > 9 ? 1 : 0;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.56}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="duct"
        rake={0.14 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        lamp={onAir ? { x: 780 + L.c * 0.3, y: 200, r: 250 } : null}
        floorKind="boards" grit={0.7} />

      {/* the rack of cut discs already on the wall — the shop has a history */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={"dw" + i} style={{ position: "absolute", left: 742 + (i % 3) * 92,
          top: 268 + Math.floor(i / 3) * 92, width: 74, height: 74, zIndex: 18,
          borderRadius: "50%", background: `radial-gradient(56% 56% at 36% 30%, ${dkh(VIOLET, 0.24)} 0%, ${dkh(VIOLET, 0.62)} 100%)`,
          border: "4px solid rgba(0,0,0,0.4)",
          transform: `rotate(${f * (1.4 + (i % 3) * 0.8)}deg)` }} />
      ))}
      <Runner y={640} f={f} z={22} rate={7.0} pitch={158} w={110} h={52} kind="bead"
        c="#D8C4F4" c2="#1A1230" rail o={0.9} />

      <VoiceBooth x={188 + L.a} y={272} w={430} h={352} f={f} door={1} onAir={onAir} z={42}>
        <Crew f={f} x={402 + L.a} y={600} i={7} size={172} z={44} at={0} tint="#8E4A2E" />
      </VoiceBooth>
      <NameStrip x={403 + L.a} y={188} i={1} f={f} at={12} kind="turn" s={1} z={76} />
      <ProvStrip x={252 + L.a} y={648} i={1} s={1} z={74} on={E(f, 22, 30, 0, 1, OUT)} />

      {/* the hero swings the disc round — the trigger */}
      <Contact x={766 + L.c * 0.3} y={GY - 12} w={182} o={0.36} />
      <Hero f={f} x={852 + L.c * 0.3} y={GY} size={222} z={56} act={0} ph={1.6}
        drive={E(f, 6, 16, 0, 1, IO) * -0.26} costume={{ prof: 1 }} tint="#8E4A2E" />

      <BandChip t="CLONE YOUR OWN VOICE" c={INK} />
      <Edge side="l" c="#150F24" w={102} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE LATHE DECK — 12.77 to 14.23s (44f) · ESCALATE 2
   VO: "One minute of your voice is enough to clone it,"

   ⛔ BOTH HALVES OF THE MECHANISM ARE DRAWN (§10). A machine that consumes and
   produces nothing is a progress bar: the minute goes IN and the copies come
   OUT, accelerating, each one landing hard.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lathe");
  const L = LAY[v];
  const feed = E(f, 6, 15, 0, 1, IN_Q);
  const out = E(f, 13, 40, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.60}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
        rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.6} rakeN={RAKE_N[v]}
        lamp={{ x: 300 + L.a * 0.3, y: 176, r: 246 }} floorKind="slab" grit={0.8} />

      <Runner y={218} f={f} z={20} rate={8.2} pitch={172} w={116} h={56} kind="crate"
        c="#C4B08E" c2="#0E1024" rail hang={12} o={0.88} />

      <Lathe x={470 + L.b * 0.4} y={470} f={f} feed={feed} out={out} z={46} />

      {/* the hero lays the tape on the deck, then watches the stack grow —
          ⭐ his FACE is the performance surface and nothing lands on it */}
      <Contact x={150 + L.a * 0.3} y={GY - 12} w={196} o={0.4} />
      <Hero f={f} x={244 + L.a * 0.3} y={GY} size={240} z={56} act={3} ph={0.9}
        drive={E(f, 2, 9, 0, 1, IO) * 0.34 - E(f, 12, 22, 0, 1, OUT) * 0.34}
        costume={{ glasses: 1 }} tint="#8E4A2E" gaze={0.9}
        shock={out > 0.5 ? 1 : 0} cheer={out > 0.86 ? 1 : 0} />

      {/* the cut: swarf coming off the cutter, continuously, while it works */}
      {feed >= 1 && out < 1 && (
        <Fall x={392 + L.b * 0.4} y={430} w={130} f={f} at={15} z={72} />
      )}
      <Ring x={470 + L.b * 0.4} y={452} f={f} at={15} c="#D8C4F4" z={74} s={0.7} />

      <BandChip t={`${R.tools[1].input} OF AUDIO`} c={INK} />
      <Edge side="r" c="#06070F" w={110} z={93} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE STALLS — 14.23 to 16.23s (60f) · PAYOFF 2
   VO: "so sell narration services on Fiverr and Upwork"

   ⭐ THE TWO MARKETPLACES ARE SPOKEN, so they are the only two marks in the
   scene, and the goods physically ARRIVE at them along a full-width rail.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stalls");
  const L = LAY[v];
  const ord = seqOrder(v, 2);
  const fill = [E(f, 12, 44, 0, 1, IO), E(f, 20, 54, 0, 1, IO)];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 116, r: 300 }} floorKind="tarmac" grit={0.8} />

      {/* ⭐ the full-width overhead rail carrying the discs to the stalls —
          §1's highest-value shape, mounted as something the row would contain */}
      <Runner y={214} f={f} z={30} rate={9.8} pitch={148} w={104} h={58} kind="bead"
        c="#EFE7D4" c2="#1E4A34" rail hang={16} o={1} />

      <Stall x={286 + L.a * 0.3} y={GY - 30} mark={ord[0] === 0 ? "fiverr" : "upwork"}
        fill={fill[0]} f={f} z={50} />
      <Stall x={742 + L.c * 0.3} y={GY - 30} mark={ord[0] === 0 ? "upwork" : "fiverr"}
        fill={fill[1]} f={f} z={50} />

      {/* the crowd working the stalls — four different action loops */}
      {[0, 1, 2, 3].map(i => (
        <Crew key={"cw" + i} f={f} x={186 + i * 214} y={GY} i={i + 2} size={122} z={54}
          at={4 + i * 3} tint="#8E4A2E" />
      ))}

      {/* the hero hangs the job board — the trigger for the rail */}
      <Contact x={468} y={GY - 12} w={198} o={0.38} />
      <Hero f={f} x={562} y={GY} size={244} z={58} act={2} ph={0.2}
        drive={E(f, 4, 12, 0, 1, IO) * 0.22 - E(f, 12, 22, 0, 1, OUT) * 0.22}
        costume={{ suit: 1 }} tint="#8E4A2E" cheer={f > 46 ? 1 : 0} />

      <BandChip t="NARRATION, ON BOTH MARKETPLACES" c={INK} />
      <Edge side="l" c="#16241A" w={96} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE EMPTY BOOTH — 16.23 to 17.71s (44f) · TURN
   VO: "without recording anything."

   ⛔ AN EMPTY CONTAINER MUST STILL READ, because EMPTY IS THE PROMISE. The
   stool is bone against a dark teal booth — different in hue AND value — the
   mic is visibly UNPLUGGED with its jack lying loose, and the hero LEAVES.
   The machine keeps cutting behind the glass with nobody in the room.

   ⛔ THIS IS A CUT and it reveals what the wide could not: that the booth is
   empty.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("boothc");
  const L = LAY[v];
  const leave = E(f, 8, 26, 0, 1, IO);
  const door = E(f, 20, 34, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.58}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="duct"
        rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.4} rakeN={RAKE_N[v]}
        lamp={{ x: 300 + L.b * 0.3, y: 190, r: 230 }} floorKind="boards" grit={0.7} />

      <VoiceBooth x={168 + L.a * 0.4} y={230} w={470} h={396} f={f} door={door} onAir={0} z={42}>
        <Stool x={402 + L.a * 0.4} y={600} s={1.15} z={54} />
        <DeadMic x={272 + L.a * 0.4} y={470} f={f} s={1.05} z={58} />
      </VoiceBooth>

      {/* the lathe keeps working, on its own, behind the glass */}
      <div style={{ position: "absolute", left: 700 + L.c * 0.3, top: 380, width: 268, height: 42,
        zIndex: 44, borderRadius: 4, background: "linear-gradient(178deg,#2A4A56,#0C1E24)",
        border: "4px solid rgba(0,0,0,0.5)" }} />
      {Array.from({ length: 5 }, (_, i) => {
        const k = ((f * 0.032 + i * 0.2) % 1);
        return (
          <div key={"au" + i} style={{ position: "absolute", left: 712 + L.c * 0.3 + k * 234,
            top: 330, width: 52, height: 52, zIndex: 46, borderRadius: "50%",
            background: `radial-gradient(56% 56% at 36% 30%, ${mxh(TEAL, 0.3)} 0%, ${dkh(TEAL, 0.4)} 100%)`,
            border: "4px solid rgba(0,0,0,0.42)" }} />
        );
      })}
      <div style={{ position: "absolute", left: 806 + L.c * 0.3, top: 250, width: 62, height: 62,
        zIndex: 48, borderRadius: "50%", border: `9px solid ${mxh(TEAL, 0.4)}`,
        transform: `rotate(${f * 11}deg)` }}>
        <div style={{ position: "absolute", left: "50%", top: 3, width: 5, height: 18,
          marginLeft: -2.5, background: mxh(TEAL, 0.7) }} />
      </div>

      {/* the hero walks OUT of frame and pulls the door shut */}
      <Contact x={556 + leave * 300} y={GY - 12} w={176 * (1 - leave * 0.3)} o={0.36 * (1 - leave)} />
      <Hero f={f} x={646 + leave * 300} y={GY} size={224 - leave * 30} z={60} act={0} ph={0.7}
        drive={leave * 0.5} costume={{ glasses: 1 }} tint="#8E4A2E" gaze={-1} />

      <BandChip t="NOBODY IN THE ROOM" c={INK} />
      <Edge side="r" c="#040C0F" w={104} z={93} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE 3D SHOP — 17.71 to 19.13s (43f) · ESCALATE 3
   VO: "Third, Hunyuan 3D."

   ⭐ REVEAL MECHANISM THREE, and it is neither of the first two: a SCAN BEAM
   sweeps down a steel plate and the name is BURNED INTO IT as the beam passes,
   trailing sparks off the write head.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("shop3");
  const L = LAY[v];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.54}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="gantry"
        rake={0.14 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.8} rakeN={RAKE_N[v]}
        lamp={{ x: 506 + L.a * 0.3, y: 140, r: 268 }} floorKind="slab" grit={0.8} />

      {/* the shelf of finished models the shop has already made */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"md" + i} style={{ position: "absolute", left: 92 + (i % 4) * 104,
          top: 274 + Math.floor(i / 4) * 116, width: 76, height: 76, zIndex: 18 }}>
          <div style={{ position: "absolute", left: 0, top: 14, width: 58, height: 58,
            background: dkh(TEAL, 0.36 + (i % 3) * 0.08), border: "3px solid rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: 58, height: 16,
            background: dkh(TEAL, 0.12), transform: "skewX(-42deg)", transformOrigin: "0% 100%" }} />
          <div style={{ position: "absolute", left: 58, top: 0, width: 17, height: 72,
            background: dkh(TEAL, 0.56), transform: "skewY(-42deg)", transformOrigin: "0% 0%" }} />
        </div>
      ))}
      <Runner y={210} f={f} z={22} rate={8.6} pitch={162} w={112} h={54} kind="fan"
        c="#BFE0EE" c2="#101A20" rail o={0.86} />

      {/* the rig and the plate it is writing on */}
      <div style={{ position: "absolute", left: 508 + L.b * 0.3, top: 268, width: 400, height: 300,
        zIndex: 40, borderRadius: 6, background: "linear-gradient(176deg,#5A6870,#1E262C)",
        border: "5px solid rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", left: 24, top: 150, right: 24, height: 118,
          borderRadius: 4, background: "#141A1E", border: "4px solid rgba(0,0,0,0.4)" }} />
      </div>
      <NameStrip x={708 + L.b * 0.3} y={340} i={2} f={f} at={8} kind="burn" s={1} z={76} />
      <ProvStrip x={556 + L.b * 0.3} y={604} i={2} s={1} z={74} on={E(f, 26, 34, 0, 1, OUT)} />

      {/* the hero drives the scan head down — the trigger, with his weight in it */}
      <Contact x={182 + L.c * 0.3} y={GY - 12} w={190} o={0.38} />
      <Hero f={f} x={272 + L.c * 0.3} y={GY} size={232} z={56} act={1} ph={1.9}
        strain={E(f, 4, 12, 0, 0.6, OUT) * (1 - E(f, 30, 40, 0, 1, IO))}
        costume={{ cop: 1 }} tint="#8E4A2E" stern={1} />

      <BandChip t="ONE PHOTO · A REAL 3D MODEL" c={INK} />
      <Edge side="l" c="#0B1116" w={100} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S10 · UNDER THE GANTRY — 19.13 to 20.48s (40f) · ESCALATE 3
   VO: "It turns one flat photo into a..."

   ⭐⭐⭐ THE WEIGHT BEAT (reel 117). A float is not a lift. The tongs descend,
   they CLOSE, the chains go taut, THE BEAM BOWS AND THE PHOTO DOES NOT MOVE for
   six frames — the refusal is the whole point — and then it TEARS free.

   ⭐⭐ AND THE REVEAL IS THE ROTATION, NOT THE TRAVEL. It rises while turning
   −26° → 0, so the flat print turns edge-on and comes back with volume. The
   viewer decodes it at the same instant it arrives.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rig");
  const L = LAY[v];
  const grip = E(f, 6, 12, 0, 1, OUT);            /* the tongs CLOSE */
  const refuse = E(f, 12, 18, 0, 1, OUT) * (1 - E(f, 22, 26, 0, 1, IN_Q));
  const tear = E(f, 22, 34, 0, 1, OUT);           /* it TEARS free */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.62}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="none"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        lamp={{ x: 506 + L.a * 0.3, y: 156, r: 234 }} floorKind="slab" grit={0.9} />

      <Runner y={648} f={f} z={22} rate={7.4} pitch={176} w={124} h={56} kind="crate"
        c="#9EB0BC" c2="#0C1216" rail o={0.84} />

      <ScanGantry x={272 + L.b * 0.3} y={140} w={468} f={f} grip={grip}
        strain={refuse} lift={tear} z={44} />
      <PhotoPrint x={506 + L.b * 0.3} y={470 - tear * 178} turn={tear} f={f} s={1.05} z={78} />

      {/* the cost of the tear: a crack, and a shower of scale */}
      {tear > 0 && tear < 0.5 && (<>
        <Ring x={506 + L.b * 0.3} y={460} f={f} at={22} c="#CFE6F4" z={80} s={0.86} />
        <Fall x={412 + L.b * 0.3} y={470} w={190} f={f} at={22} z={79} />
      </>)}

      {/* the hero slots the print in and then braces against the refusal */}
      <Contact x={790 + L.c * 0.3} y={GY - 12} w={184} o={0.4} />
      <Hero f={f} x={878 + L.c * 0.3} y={GY} size={226} z={56} act={1} ph={1.1}
        strain={refuse * 0.9}
        drive={E(f, 0, 6, 0, 1, IO) * -0.30 + E(f, 6, 14, 0, 1, OUT) * 0.30}
        costume={{ constr: 1 }} tint="#8E4A2E" stern={refuse > 0.4 ? 1 : 0}
        shock={tear > 0.2 && tear < 0.7 ? 1 : 0} />
      {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — steam off the head */}
      {refuse > 0.5 && <Steam x={878 + L.c * 0.3} y={GY - 232} f={f} at={14} n={5} z={70} />}

      <BandChip t="FLAT PHOTO IN" c={INK} />
      <Edge side="l" c="#070B0E" w={108} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S11 · THE TURNTABLE — 20.48 to 22.61s (64f) · ESCALATE 3
   VO: "real 3D model you can spin, light, and reuse."

   ⭐⭐ THREE VERBS, THREE BEATS, ON THEIR MEASURED ONSETS: spin @27, light @40,
   reuse @46 (local). None of them is typeset — the table turns, the lamps
   strike in an ascending run, and the copies rack up.

   ⛔ THIS IS A CUT and it reveals the model free of the rig.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("turn");
  const L = LAY[v];
  const spin = E(f, 27, 58, 0, 1, IO);
  const lamps = E(f, 40, 52, 0, 1, LIN);
  const reuse = E(f, 46, 62, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.48}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="lampbar"
        rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.8} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} />

      <Runner y={188} f={f} z={20} rate={8.0} pitch={168} w={118} h={52} kind="load"
        c="#E8E0CC" c2="#2E2A20" rail hang={10} o={0.8} />

      <Turntable x={470 + L.b * 0.3} y={556} f={f} spin={spin} lamps={lamps} z={46} />

      {/* "reuse" — the copies racking up on the shelf behind, each landing hard */}
      {Array.from({ length: 4 }, (_, i) => {
        const k = reuse * 4 - i;
        if (k <= 0) return null;
        const q = Math.min(1, k);
        return (
          <div key={"rc" + i} style={{ position: "absolute", left: 786 + (i % 2) * 108 + L.c * 0.3,
            top: 288 + Math.floor(i / 2) * 122 + (1 - q) * -60, width: 96, height: 96,
            zIndex: 52, opacity: Math.min(1, k * 2.2), transform: `scale(${0.72 + q * 0.28})` }}>
            <div style={{ position: "absolute", left: 0, top: 18, width: 74, height: 74,
              background: mxh(CLAY, 0.06), border: "4px solid rgba(0,0,0,0.42)" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: 74, height: 20,
              background: mxh(CLAY, 0.36), transform: "skewX(-42deg)", transformOrigin: "0% 100%" }} />
            <div style={{ position: "absolute", left: 74, top: 0, width: 21, height: 92,
              background: dkh(CLAY, 0.34), transform: "skewY(-42deg)", transformOrigin: "0% 0%" }} />
          </div>
        );
      })}

      {/* the hero cranks the table, then lifts the model off */}
      <Contact x={150 + L.a * 0.3} y={GY - 12} w={192} o={0.36} />
      <Hero f={f} x={244 + L.a * 0.3} y={GY} size={236} z={56} act={1} ph={0.5}
        drive={E(f, 24, 30, 0, 1, IO) * 0.24 - E(f, 30, 40, 0, 1, OUT) * 0.24}
        strain={E(f, 44, 50, 0, 0.5, OUT) * (1 - E(f, 56, 62, 0, 1, IO))}
        costume={{ beard: 1 }} tint="#8E4A2E" cheer={f > 54 ? 1 : 0} gaze={0.7} />

      <BandChip t="SPIN IT · LIGHT IT · REUSE IT" c={INK} />
      <Edge side="r" c="#221E16" w={100} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   S12 · THE LOADING DOCK — 22.61 to 24.71s (63f) · PAYOFF 3
   VO: "So sell this to ecom brands and businesses."

   ⛔ THE BUYERS ARE ANONYMOUS SHOP SILHOUETTES. The VO names no retailer, so
   the frame names none — a real mark on a buyer would be an endorsement the
   picture cannot source.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");
  const L = LAY[v];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.52}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
        floorKind="tarmac" grit={0.7} />

      {/* the buyers' shopfronts beyond the door — anonymous, and lit */}
      {[86, 300, 512].map((x, i) => (
        <ShopFront key={"eb" + i} x={x + L.a * 0.2} y={p.horizon + 26} s={0.72 + i * 0.05}
          c={["#3E5A6E", "#4A5A48", "#5E4A52"][i]} z={12} />
      ))}

      {/* ⭐ the conveyor running out through the door — full width, alternating */}
      <Runner y={556} f={f} z={30} rate={9.0} pitch={172} w={128} h={62} kind="crate"
        c="#BFD8EE" c2="#1A222C" rail o={1} />

      {/* the van backed into the bay, its tailgate down */}
      <div style={{ position: "absolute", left: 654 + L.c * 0.3, top: 302, width: 380, height: 286,
        zIndex: 40, borderRadius: "10px 6px 6px 10px",
        background: "linear-gradient(176deg,#E6E2D6 0%,#9EA0A0 100%)",
        border: "6px solid rgba(0,0,0,0.46)" }}>
        <div style={{ position: "absolute", left: 22, top: 30, width: 300, height: 178,
          borderRadius: 4, background: "#2A3038" }} />
      </div>
      <div style={{ position: "absolute", left: 620 + L.c * 0.3, top: 560, width: 132, height: 20,
        zIndex: 44, background: "#8E9299", transform: "rotate(9deg)", transformOrigin: "100% 50%" }} />

      {/* the crates going out, spread across the whole scene */}
      {[6, 22, 38].map((at, i) => {
        const k = E(f, at, at + 22, 0, 1, IO);
        return (
          <EcomCrate key={"ec" + i} x={330 + k * 320 + L.b * 0.2} y={512 - Math.sin(k * Math.PI) * 34}
            s={0.94} z={60 + i} rot={-6 + k * 12} />
        );
      })}
      <Docket x={866 + L.c * 0.3} y={630} f={f} at={44} s={0.82} z={84} />

      {/* the hero loads, and a crew works the tailgate */}
      {[0, 1].map(i => (
        <Crew key={"dc" + i} f={f} x={556 + i * 132 + L.c * 0.3} y={GY} i={i + 8} size={128}
          z={54} at={2 + i * 4} tint="#8E4A2E" />
      ))}
      <Contact x={152 + L.a * 0.2} y={GY - 12} w={196} o={0.38} />
      <Hero f={f} x={246 + L.a * 0.2} y={GY} size={240} z={56} act={1} ph={1.4}
        drive={[6, 22, 38].reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 12, 0, 1, OUT)) * 0.28, 0)}
        costume={{ constr: 1 }} tint="#8E4A2E" cheer={f > 52 ? 1 : 0} />

      <BandChip t="SELL TO ECOM BRANDS" c={INK} />
      <Edge side="l" c="#0F1318" w={104} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE TRADE GATE — 24.71 to 26.06s (41f) · THE BLOCK
   VO: "But none of these are useful without the"

   ⛔⛔ THE VILLAIN, AND IT WINS HERE. Planted in the hook, silent for 24s, and
   now it refuses a trolley loaded with all three finished goods. It does not
   nearly open. It does not move.

   ⛔ A BARRIER YOU CAN WALK ROUND IS NOT "STOPPED" (reel 120): `wide` fills
   everything past its near face, edge to edge and top to bottom, so the run
   ends AT it and not inside it.

   ⛔ AND IT IS NOT DRAWN UGLY (§23): the script disparages nothing about its
   craft. It is scrolled, riveted ironwork with a real drop-bar. What is wrong
   with it is that it is SHUT.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const L = LAY[v];
  /* two shoves, and the trolley comes back both times */
  const shove = E(f, 6, 13, 0, 1, IN_Q) - E(f, 13, 22, 0, 1, OUT)
              + E(f, 24, 30, 0, 1, IN_Q) - E(f, 30, 38, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.66}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="house" overhead="none"
        rake={0.09 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.4} rakeN={RAKE_N[v]}
        floorKind="tarmac" grit={0.9} />

      {/* the three shops still glowing warm BEHIND him — what he already has */}
      {R.tools.map((t, i) => (
        <div key={"gl" + i} style={{ position: "absolute", left: 40 + i * 108, top: 402,
          width: 84, height: 150, zIndex: 14,
          background: `linear-gradient(176deg, ${dkh(t.c, 0.44)} 0%, ${dkh(t.c, 0.80)} 100%)`,
          border: "3px solid rgba(0,0,0,0.5)" }}>
          <div style={{ position: "absolute", left: 12, top: 22, right: 12, height: 40,
            background: mxh(t.c, 0.10 + 0.12 * Math.abs(Math.sin(f / 11 + i))) }} />
        </div>
      ))}

      <IronGate x={556 + L.b * 0.2} y={252} w={392} h={396} f={f} open={0} lit={0} z={62} wide />

      {/* the loaded trolley, shoved at it, coming back both times */}
      <Trolley x={430 + shove * 74 + L.b * 0.2} y={GY} f={f} tip={shove * 3.2} z={58} />

      {/* the hero, driving with his whole body, and getting nowhere */}
      <Contact x={210 + shove * 60} y={GY - 12} w={198} o={0.34} />
      <Hero f={f} x={300 + shove * 60} y={GY} size={248} z={60} act={1} ph={0.6}
        drive={shove * 0.30} strain={Math.min(0.92, Math.abs(shove) * 1.5)}
        costume={{ prof: 1 }} tint="#8E4A2E" stern={1} />
      <Forearm x0={356 + shove * 60} y0={GY - 178} x1={444 + shove * 74} y1={GY - 198}
        w={24} c="#8E4A2E" z={62} />

      {/* the cost of the shove: dust off the tarmac, and nothing else moves */}
      <Puff x={430 + L.b * 0.2} y={GY} f={f} at={13} c="#4A4458" z={70} />
      <Puff x={430 + L.b * 0.2} y={GY} f={f} at={30} c="#4A4458" z={70} />

      <BandChip t="THE TOOLS ARE NOT THE HARD PART" c={RED} fg="#FFF0EC" />
      <Edge side="l" c="#050408" w={122} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S14 · THE KEY — 26.06 to 28.75s (81f) · PEAK
   VO: "free guide I made covering how to build, market, and sell these tools."

   ⭐⭐⭐ THE HERO ARTIFACT ARRIVES, AND IT IS THE ONLY THING THAT OPENS THE
   GATE. Three plates are struck into its cover on their three MEASURED onsets —
   build @30, market @36, sell @48 (local) — each brighter than the last, so the
   repeat reads as PROGRESS and not repetition (reel 115 §18).

   ⛔ THE VILLAIN LOSES EXACTLY ONCE, HERE, at the peak, and the drop-bar lifts
   BEFORE the leaves swing: a mechanism that releases in the right order is what
   makes a gate read as unlocked rather than pushed.

   ⛔ THE HOW IS GATED. The guide's cover carries the three SECTION NAMES and no
   sentence of its contents — the copy-pasteable version is the lead magnet,
   which is the entire CTA.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gatelit");
  const L = LAY[v];
  const HITS = [30, 36, 48];
  const struck = Math.max(0, Math.min(1,
    (E(f, 30, 34, 0, 1, OUT) + E(f, 36, 40, 0, 1, OUT) + E(f, 48, 52, 0, 1, OUT)) / 3));
  const lift = E(f, 58, 76, 0, 1, IO);            /* into the hasp, then OPEN */
  const carry = E(f, 52, 62, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.54}
      overlay={lift > 0.2 ? (
        /* the light flooding through — a SHAPED cone, never a full-frame fill */
        <div style={{ position: "absolute", left: 300, top: 120, width: 460, height: 672,
          zIndex: 96, opacity: (lift - 0.2) * 0.42, pointerEvents: "none",
          clipPath: "polygon(34% 0, 66% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa("#FFD9A0", 0.9)} 0%, ${hexa("#FFD9A0", 0)} 100%)` }} />
      ) : undefined}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="house" overhead="none"
        rake={0.13 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        lamp={{ x: 300 + L.a * 0.3, y: 210, r: 262 }} floorKind="tarmac" grit={0.8} />

      <IronGate x={556 + L.b * 0.2} y={252} w={392} h={396} f={f} open={lift} lit={struck}
        z={62} wide />

      {/* the stand, the press, and the guide being struck */}
      <div style={{ position: "absolute", left: 210 + L.a * 0.3, top: 556, width: 240, height: 30,
        zIndex: 78, borderRadius: 4, background: "linear-gradient(178deg,#8E7A5E,#3A3024)",
        border: "4px solid rgba(0,0,0,0.46)" }} />
      <StrikePress x={330 + L.a * 0.3} y={0} f={f} hits={HITS} z={88} />
      <Guide x={330 + L.a * 0.3 + carry * 218} y={412 - carry * 42} f={f} struck={struck}
        s={0.86} z={82} rot={carry * 12} />

      {/* the cost of each strike: sparks and a ring, ascending */}
      {HITS.map((at, i) => (
        <React.Fragment key={"hk" + i}>
          <Ring x={330 + L.a * 0.3} y={430} f={f} at={at} c={mxh(GOLD, i * 0.2)} z={86}
            s={0.6 + i * 0.12} />
          {f >= at && f < at + 10 && <Fall x={266 + L.a * 0.3} y={430} w={140} f={f} at={at} z={85} />}
        </React.Fragment>
      ))}

      {/* the hero strikes, then carries it to the hasp */}
      <Contact x={648 + L.c * 0.2} y={GY - 12} w={196} o={0.36} />
      <Hero f={f} x={742 + L.c * 0.2} y={GY} size={244} z={64} act={1} ph={1.7}
        drive={HITS.reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 10, 0, 1, OUT)) * -0.26, 0)
          + carry * 0.18}
        strain={E(f, 58, 66, 0, 0.6, OUT) * (1 - E(f, 70, 78, 0, 1, IO))}
        costume={{ prof: 1 }} tint="#8E4A2E" cheer={lift > 0.6 ? 1 : 0} />

      <BandChip t="THE FREE GUIDE" c={GOLD} fg="#2A1C04" />
      <Edge side="l" c="#120B0C" w={112} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S15 · THROUGH THE GATE — 28.75 to 29.93s (35f) · CTA
   VO: "Comment BUILD for access."

   ⛔ THE CTA GRAPHIC GETS ITS OWN COLUMN. Nothing crosses the keyword plate —
   no sprite, no prop, no contact shadow. Reel 82 shipped 9/9 with the
   astronaut's shadow across its seal, so this is checked on the STILL.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("open");
  const L = LAY[v];
  const walk = E(f, 0, 26, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="none"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.4} rakeN={RAKE_N[v]}
        lamp={{ x: 506, y: 130, r: 300 }} floorKind="tarmac" grit={0.8} />

      {/* the market beyond, lit, with the two marketplaces on the far side */}
      {[96, 306, 728, 928].map((x, i) => (
        <ShopFront key={"ms" + i} x={x} y={p.horizon + 22} s={0.68 + (i % 2) * 0.07}
          c={["#6E5A44", "#5E5040", "#6E5A44", "#544838"][i]} z={12} />
      ))}
      <Runner y={p.horizon - 34} f={f} z={16} rate={7.0} pitch={196} w={140} h={58} kind="car"
        c="#D8C4A0" c2="#2A2018" rail={false} o={0.8} />

      {/* the open leaves, standing back against their piers */}
      <div style={{ position: "absolute", left: 78, top: 300, width: 132, height: 330, zIndex: 30,
        background: "linear-gradient(94deg,#241E28,#100C14)", border: "5px solid rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: 802, top: 300, width: 132, height: 330, zIndex: 30,
        background: "linear-gradient(268deg,#241E28,#100C14)", border: "5px solid rgba(0,0,0,0.5)" }} />

      {/* the goods going through, and the crowd on the far side */}
      <Trolley x={300 + walk * 250} y={GY} f={f} tip={0} z={52} />
      {[0, 1, 2].map(i => (
        <Crew key={"ct" + i} f={f} x={706 + i * 104} y={GY - 40} i={i + 5} size={104} z={44}
          at={i * 3} tint="#8E4A2E" />
      ))}

      <Contact x={168 + walk * 250} y={GY - 12} w={190} o={0.34} />
      <Hero f={f} x={258 + walk * 250} y={GY} size={238} z={56} act={2} ph={0.4}
        drive={walk * 0.16} costume={{ constr: 1 }} tint="#8E4A2E" cheer={1} />

      {/* ⛔ ITS OWN COLUMN: the plate sits in the reserved band, nothing else
          is allowed above y 300 in the middle third of this shot. */}
      <KeywordPlate x={506} y={224} f={f} at={4} s={1} z={92} />
      <Edge side="r" c="#241A14" w={92} z={93} kind="post" />
    </Scene>
  );
};
