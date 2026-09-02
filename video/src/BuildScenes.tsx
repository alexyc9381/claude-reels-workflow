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
  RealMark, RepoPlate, DestSigns, ShortScreen, VoiceBank, MeshTurn, EcomFront,
} from "./BuildProps";
import {
  Typewriter, StudioMic, FilmRun, TapeDeck, Chair, Plinth, EnamelSign, ClonePop,
  LoadedBarrow, FilmShelf, ForeMass, WaveWall, FreeLoad, ShipLabel,
  PriceTag, TagChain, NearBand, ContentWall, NearShade, HeroKey, ToolObject, Shots, DispatchSlot,
} from "./BuildDraw";
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
/* ⛔⛔ NO BROWN ON THE SPRITES, ANYWHERE (Alex, twice). `costumeFor` in the
   chassis cycles all TWELVE costumes off the sprite's index, and two of them
   are brown HAIR — **4 `girl` and 5 `fro` IN `HwWorld`, which is the array this
   reel actually uses.** ⛔⛔⛔ THERE ARE TWO `COSTUMES` ARRAYS IN THE CLONE CHAIN
   AND THEY ARE IN DIFFERENT ORDERS: `BillWorld` puts girl/fro at 6/7,
   `HwWorld` at 4/5. The first fix excluded 6 and 7, which in `HwWorld` are
   `suit` and `prof` — so it removed two innocent costumes and kept both brown
   ones. Verify the array in the module the reel IMPORTS, never the first one
   grep finds.
   ⛔ AND `prof` (7) IS ALSO BROWN — a TWEED BLAZER, `#6E5A3C`. It is not hair,
   it is a body garment, so it reads as a brown-torsoed Claude, which is worse.
   Grep the costume block for brown FILLS rather than trusting the name. On a
   crowd those
   read as a brown lump sitting on a clay sprite. Every `Crew` in this reel
   takes its costume index through `wear()` instead, which is the same twelve
   minus those two: builder, engineer, glasses, suit, chef, beard, cop, wizard,
   samurai, stern. */
const WEAR = [0, 1, 2, 3, 6, 8, 9, 10, 11];
const wear = (n: number) => WEAR[((n % WEAR.length) + WEAR.length) % WEAR.length];

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
/* =========================================================================
   S0 · THE FREE LOAD — 0.00 to 2.40s (72f) · HOOK
   VO: "You can sell these three free Claude plugins on Fiverr and Upwork."

   ⭐⭐⭐ REBUILT AGAINST OX AND UNLAZY, FRAME-STRIPPED RATHER THAN REMEMBERED.
   Both of those hooks do the same three things and the old shutter did none:
     ONE COLOSSAL OBJECT   the ox is ~55% of the panel; the balloon grows to 45%
     IT ENTERS OR GROWS    the ox walks in from frame right; the balloon inflates
     THE WORD IS ON IT     `FREE` on the ox's flank; `DONE` on the balloon
   and in both the Claude is SMALL beside it. That scale gap IS the image. A
   shutter rising is a hole changing size — nothing arrives, so nothing dwarfs
   anyone.

   ⭐⭐ AND A BEAT ON EVERY SPOKEN WORD (Alex: *"each word needs to have
   animations"*). Onsets read out of the caption JSON, not spaced by eye:

     f0  "You"      the load is ALREADY moving in, 30% on frame — settled, not starting
     f6  "sell"     he takes the strain and the whole load LURCHES
     f10 "three"    it lands square and the three crates are countable
     f14 "free"     ⭐ FREE brands across the front in burnt stencil — the ox's flank
     f26 "Claude"   the Claude mark stamps onto the end crate
     f31 "plugins"  the three crate fronts drop and a machine is turning in each
     f48 "Fiverr"   a shipping label slaps on
     f53 "Upwork"   the second label slaps on

   ⛔ `feedback_hook_simplicity` is intact: ONE idea (a colossal free delivery)
   on an empty stage. The count of BEATS went up; the count of IDEAS did not.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("front");
  const L = LAY[v];

  /* ---- THE BEATS. One object, one word per beat, nothing said twice. -------
     f0-13  "You can sell these three"  an EMPTY lit shop front. Bright, cool,
            and the chain is already paying out of the gantry, so the shot opens
            on an event in progress rather than a still.
     f14    "free"    ⭐ THE TAG DROPS — the near-black mass ARRIVES
     f22              it lands and swings, damped
     f26    "Claude"  the $0 stamps onto the face
     f40    "on"      the tag begins its TURN
     f48    "Fiverr"  the reverse lands: Fiverr green, the real mark
     f53    "Upwork"  ONE supporting tag drops behind it
     ---------------------------------------------------------------------- */
  const drop  = E(f, 0, 20, 0, 1, IO);                     /* "free"    */
  const swing = f > 20 ? Math.sin((f - 20) * 0.36) * Math.exp(-(f - 20) / 30) * 12 : 0;
  const zero  = E(f, 26, 38, 0, 1, BACK);                  /* "Claude"  */
  const turn  = E(f, 40, 52, 0, 1, IO);                    /* "on"      */
  const two   = E(f, 53, 64, 0, 1, BACK);                  /* "Upwork"  */
  const look  = E(f, 10, 24, 0, 1, IO);

  /* ⛔ THE TAG HANGS BY ITS EYELET. `TX` is the GROMMET, so the chain meets the
     card where a chain actually would, and the swing pivots there.
     ⛔ AND IT STARTS ABOVE THE FRAME. The first build left the pre-drop card
     parked in shot at f0 — a black slab with no $0 and no chain on it, which
     is a blob, not an object. It now enters with ~30px of its tip showing at
     f0, so the shot still opens mid-event (`feedback_frame0_preseed_needs_z`)
     without the mass being there before it arrives. */
  const TX = 408 + L.b * 0.7;
  const TY = -150 + drop * 454;
  const CHAIN = Math.max(0, TY + 8);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.38}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
        lamp={{ x: 506 + L.a * 0.4, y: 210, r: 320 }} floorKind="slab" grit={0.7} />

      {/* ⛔ THE WORLD STAYS — `feedback_hook_simplicity` says strip IDEAS, not
          LAYERS. The row is still behind, held right down at 0.62 scale and
          well off the tag's axis, so it reads as depth and never as content. */}
      {[16, 880].map((x, i) => (
        <ShopFront key={"sf" + i} x={x + L.b * 0.3} y={p.horizon + 10} s={0.62}
          c="#41506E" z={11} />
      ))}
      <Runner y={p.horizon - 34} f={f} z={13} rate={5.4} pitch={226} w={150} h={58}
        kind="car" c="#D8DCD8" c2="#1A2028" rail={false} o={0.5} />

      {/* the daylight pool on the slab — the sanctioned way to buy frame-0 luma */}
      <div style={{ position: "absolute", left: 178 + L.a * 0.4, top: 512, width: 660, height: 250,
        zIndex: 14, opacity: 0.30, transform: "skewX(-13deg)",
        background: `linear-gradient(180deg, ${hexa("#FFF8E8", 0.86)} 0%, ${hexa("#FFF8E8", 0)} 100%)` }} />

      {/* the chain, already paying out at frame 0 */}
      <TagChain x={TX} y={-24} len={CHAIN} s={0.92} z={57} rot={swing * 0.45} />

      {/* ⭐⭐⭐ THE ONE OBJECT. 620px on a 1012px panel = 61%, which leaves air on
          both sides for a silhouette to form (`feedback_hook_simplicity`: past
          ~85% of panel width there is none). Near-black on a pale cool ground,
          and it ARRIVES rather than sitting in frame 0. */}
      <PriceTag x={TX} y={TY} s={0.92} z={62} rot={swing}
        turn={turn} zero={zero} mark="si_fiverr.svg" markC="#1DBF73"
        mark2="si_upwork.svg" two={two} />


      {/* ⭐ THE SMALL CLAUDE — the scale gap IS the image. He watches it come
          down, flinches on the stamp, and points it out on the turn. */}
      <Contact x={158 + L.a * 0.4} y={GY - 12} w={198} o={0.34} z={56} />
      <Hero f={f} x={158 + L.a * 0.4} y={GY} size={232} z={58} act={3} ph={0.4}
        costume={{ constr: 1 }} gaze={look} shock={zero > 0.15 && zero < 0.75 ? 1 : 0}
        cheer={turn > 0.55 ? 1 : 0} />

      {/* ⛔ NO BandChip HERE. The header already reads "3 FREE AI TOOLS / SELL
          THEM ON FIVERR"; the chip read "3 FREE TOOLS · FIVERR + UPWORK", a
          near-verbatim duplicate stacked directly beneath it. Together with the
          old $0 plate and the crate stencil that was FOUR statements of "free"
          and THREE of the marketplaces in one frame. That is the clutter note. */}
      <Edge side="l" c="#1C2028" w={88} z={93} kind="post" />
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
        window={{ x: 686 + L.b * 0.7, y: 168, w: 250, h: 210 }} />

      <WallClock x={148 + L.a * 0.4} y={250} s={158} f={f} z={30} />

      {/* the painted bay markings — a workshop floor carries them, each bay in
          ITS OWN tool's colour, so the saturation IS the information */}
      {R.tools.map((t, i) => (
        <React.Fragment key={"bay" + i}>
          <div style={{ position: "absolute", left: 206 + i * 246 + L.b * 0.7, top: GY - 96,
            width: 258, height: 132, zIndex: 13,
            background: hexa(t.c, 0.34), border: `7px solid ${hexa(t.c, 0.66)}` }} />
          <div style={{ position: "absolute", left: 206 + i * 246 + L.b * 0.7, top: GY - 96,
            width: 258, height: 16, zIndex: 14,
            background: `repeating-linear-gradient(122deg, ${hexa(t.c, 0.7)} 0 18px, transparent 18px 36px)` }} />
        </React.Fragment>
      ))}
      {/* the tool board on the back wall — saturated racking, not grey shelving */}
      <div style={{ position: "absolute", left: 96 + L.a * 0.3, top: 262, width: 300, height: 168,
        zIndex: 15, background: dkh(GREEN, 0.36), border: "6px solid rgba(0,0,0,0.42)" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"tb" + i} style={{ position: "absolute", left: 18 + (i % 4) * 70,
            top: 20 + Math.floor(i / 4) * 48, width: 44, height: 32, borderRadius: 3,
            background: [CLAY, GOLD, TEAL, VIOLET][i % 4] }} />
        ))}
      </div>

      {/* the three beds, and each one reads while it is still EMPTY */}
      {R.tools.map((t, i) => (
        <MachineBed key={"bd" + i} x={228 + i * 246 + L.b * 0.7} y={GY - 26} w={214} i={i}
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
              <Hoist x={335 + i * 246 + L.b * 0.7} y={126} drop={drop} c={t.c} f={f} z={56}
                label={t.out} />
            )}
            {drop >= 1 && (
              <div style={{ position: "absolute", left: 335 + i * 246 + L.b * 0.7 - 100,
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
              <Ring x={335 + i * 246 + L.b * 0.7} y={GY - 18} f={f} at={at + 12} c="#F2E4C4"
                z={74} s={0.8} />
              <Puff x={335 + i * 246 + L.b * 0.7} y={GY - 14} f={f} at={at + 12} c="#C6BCA2"
                z={72} />
            </>)}
          </React.Fragment>
        );
      })}

      {/* the hero slams each lock home — his `drive` is on the beat frames */}
      <Contact x={766 + L.c * 0.7} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={856 + L.c * 0.7} y={GY} size={232} z={56} act={1} ph={1.2}
        drive={AT.reduce((a, at) => a + (E(f, at + 10, at + 15, 0, 1, IN_Q) -
          E(f, at + 15, at + 24, 0, 1, OUT)) * -0.34, 0)}
        costume={{ constr: 1 }} cheer={f > 62 ? 1 : 0} />

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
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"sw" + i} style={{ position: "absolute", left: 40 + (i % 4) * 252,
          top: 306 + Math.floor(i / 4) * 208, width: 158, height: 158, zIndex: 16,
          borderRadius: "50%", border: `18px solid ${dkh(SODIUM, 0.50 - lit * 0.16)}`,
          transform: `rotate(${f * (5.4 + (i % 4) * 2.6)}deg)`, opacity: 0.92 }}>
          {[0, 60, 120].map(a => (
            <div key={"sp" + a} style={{ position: "absolute", left: "50%", top: "50%",
              width: 118, height: 10, margin: "-5px 0 0 -59px",
              background: dkh(SODIUM, 0.34 - lit * 0.14), transform: `rotate(${a}deg)` }} />
          ))}
        </div>
      ))}
      <Runner y={252} f={f} z={20} rate={10.8} pitch={176} w={144} h={66} kind="load"
        c="#E0B876" c2="#1A1208" rail hang={12} o={0.95} />

      <MillCabinet x={272 + L.a} y={330} w={468} h={300} f={f} lit={lit} z={40} />
      <NameStrip x={506 + L.a} y={252} i={0} f={f} at={12} kind="flap" s={1} z={76} />
      <ProvStrip x={352 + L.a} y={648} i={0} s={1} z={74} on={E(f, 20, 28, 0, 1, OUT)} />

      {/* the hero throws the switch — the trigger is visible */}
      <Contact x={126 + L.c * 0.7} y={GY - 12} w={186} o={0.4} />
      <Hero f={f} x={216 + L.c * 0.7} y={GY} size={226} z={56} act={3} ph={0.8}
        drive={E(f, 3, 8, 0, 1, IN_Q) * -0.4 + E(f, 8, 18, 0, 1, OUT) * 0.4}
        costume={{ chef: 1 }} cheer={lit > 0.8 ? 1 : 0} />
      <div style={{ position: "absolute", left: 292 + L.c * 0.7, top: GY - 268, width: 30,
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

      {/* ⭐ THE LINE'S OUTPUT, ARRIVING CONTINUOUSLY. Six finished reels ride
          out along the delivery rail and stack at the far end — large, bright,
          travelling, and spread across the WHOLE duration rather than bunched,
          so the scene never arrives and holds. */}
      {Array.from({ length: 6 }, (_, i) => {
        const at = 14 + i * 15;
        const k = E(f, at, at + 30, 0, 1, IO);
        if (k <= 0) return null;
        return (
          <div key={"ou" + i} style={{ position: "absolute", left: 60 + k * 860,
            top: 664 - Math.sin(k * Math.PI) * 44, width: 96, height: 96, zIndex: 66,
            borderRadius: "50%", transform: `rotate(${k * 300}deg)`,
            background: `radial-gradient(56% 56% at 36% 30%, #C6CED4 0%, #2E353A 100%)`,
            border: "5px solid rgba(0,0,0,0.46)" }}>
            <div style={{ position: "absolute", left: 26, top: 26, width: 44, height: 44,
              borderRadius: "50%", background: mxh(SODIUM, 0.3) }} />
          </div>
        );
      })}

      {/* the hero works the line — his drive lands on each station's beat */}
      <Contact x={806 + L.c * 0.3} y={GY - 12} w={190} o={0.38} />
      <Hero f={f} x={896 + L.c * 0.3} y={GY} size={228} z={56} act={1} ph={2.1}
        drive={[32, 54, 77].reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 11, 0, 1, OUT)) * -0.30, 0)}
        costume={{ glasses: 1 }} gaze={-0.5}
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
        window={{ x: 96 + L.a * 0.7, y: 156, w: 300, h: 226 }} />

      {/* the queue outside the window — the businesses, on four action loops */}
      {[0, 1, 2].map(i => (
        <Crew key={"q" + i} f={f} x={132 + i * 118 + L.a * 0.7} y={p.horizon + 34} i={wear(i + 4)}
          size={104} z={16} at={0} tint="#6E6656" />
      ))}

      <TradeCounter x={210 + L.b * 0.7} y={492} w={620} z={52} />
      {/* the finished good crossing the counter */}
      <ReelCan x={318 + slide * 340 + L.b * 0.7} y={454 - Math.sin(slide * Math.PI) * 26}
        s={0.92} z={80} f={f} rock={slide >= 1 ? 5 : 0} />
      <Docket x={772 + L.c * 0.7} y={556} f={f} at={20} s={0.94} z={84} />

      {/* the buyer's hands take it — two forearms entering from frame right */}
      <Forearm x0={1006} y0={498} x1={866} y1={470} w={30} c="#7E6A56" z={82} />
      <Forearm x0={1006} y0={562} x1={880} y1={528} w={30} c="#7E6A56" z={82} />

      <Contact x={186 + L.a * 0.7} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={276 + L.a * 0.7} y={GY} size={230} z={56} act={1} ph={0.3}
        drive={E(f, 3, 12, 0, 1, IO) * 0.30} costume={{ suit: 1 }}
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
      <Runner y={640} f={f} z={22} rate={10.4} pitch={156} w={132} h={64} kind="bead"
        c="#D8C4F4" c2="#1A1230" rail o={0.9} />

      <VoiceBooth x={188 + L.a} y={272} w={430} h={352} f={f} door={1} onAir={onAir} z={42}>
        <Crew f={f} x={402 + L.a} y={600} i={wear(7)} size={172} z={44} at={0} />
      </VoiceBooth>
      <NameStrip x={403 + L.a} y={188} i={1} f={f} at={12} kind="turn" s={1} z={76} />
      <ProvStrip x={252 + L.a} y={648} i={1} s={1} z={74} on={E(f, 22, 30, 0, 1, OUT)} />

      {/* the hero swings the disc round — the trigger */}
      <Contact x={766 + L.c * 0.3} y={GY - 12} w={182} o={0.36} />
      <Hero f={f} x={852 + L.c * 0.3} y={GY} size={222} z={56} act={0} ph={1.6}
        drive={E(f, 6, 16, 0, 1, IO) * -0.26} costume={{ suit: 1 }} />

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

      <Runner y={252} f={f} z={20} rate={11.0} pitch={168} w={136} h={66} kind="crate"
        c="#C4B08E" c2="#0E1024" rail hang={12} o={0.88} />

      <Lathe x={470 + L.b * 0.4} y={470} f={f} feed={feed} out={out} z={46} />

      {/* the hero lays the tape on the deck, then watches the stack grow —
          ⭐ his FACE is the performance surface and nothing lands on it */}
      <Contact x={150 + L.a * 0.3} y={GY - 12} w={196} o={0.4} />
      <Hero f={f} x={244 + L.a * 0.3} y={GY} size={240} z={56} act={3} ph={0.9}
        drive={E(f, 2, 9, 0, 1, IO) * 0.34 - E(f, 12, 22, 0, 1, OUT) * 0.34}
        costume={{ glasses: 1 }} gaze={0.9}
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
      <Runner y={244} f={f} z={30} rate={11.8} pitch={152} w={128} h={70} kind="bead"
        c="#EFE7D4" c2="#1E4A34" rail hang={16} o={1} />

      <Stall x={286 + L.a * 0.3} y={GY - 30} mark={ord[0] === 0 ? "fiverr" : "upwork"}
        fill={fill[0]} f={f} z={50} />
      <Stall x={742 + L.c * 0.3} y={GY - 30} mark={ord[0] === 0 ? "upwork" : "fiverr"}
        fill={fill[1]} f={f} z={50} />

      {/* the crowd working the stalls — four different action loops */}
      {[0, 1, 2, 3].map(i => (
        <Crew key={"cw" + i} f={f} x={186 + i * 214} y={GY} i={wear(i + 2)} size={122} z={54}
          at={4 + i * 3} />
      ))}

      {/* the hero hangs the job board — the trigger for the rail */}
      <Contact x={468} y={GY - 12} w={198} o={0.38} />
      <Hero f={f} x={562} y={GY} size={244} z={58} act={2} ph={0.2}
        drive={E(f, 4, 12, 0, 1, IO) * 0.22 - E(f, 12, 22, 0, 1, OUT) * 0.22}
        costume={{ suit: 1 }} cheer={f > 46 ? 1 : 0} />

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

  /* ⭐⭐⭐ THE ONE SINGING IN THE BOOTH IS THE CLONE.
     *"lets see a claude sprite singing idk recording there, not just basic
     objects."*  He is right, and it is not in tension with "NOBODY IN THE ROOM"
     — it IS the claim. GPT-SoVITS copies your voice, so the booth has someone
     in it belting a take and **it is not him**: he is outside the glass with
     his arms folded, doing nothing, while a copy of him does the recording.

     ⛔ The last two versions were a room with props in it — a mic, a stool, a
     door. `feedback_face_is_a_performance_surface` and reel 107's biggest
     measured lift both say the same thing: a SPRITE DOING SOMETHING beats any
     amount of set dressing. The gag needs a performer to be a gag at all.

     ⛔ `Scene` push walks content off-frame: at 1.26 keep left >= 120. */
  const away = E(f, 6, 26, 0, 1, IO);          /* the real one steps back   */
  const bob = Math.sin(f / 4.4);               /* the take he is belting    */
  const belt = 0.55 + Math.abs(Math.sin(f / 4.4)) * 0.45;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.26]} vig={0.52}>
      {/* the foam wall, close, filling the frame */}
      <div style={{ position: "absolute", inset: -20, zIndex: 10,
        background: `linear-gradient(184deg, ${dkh(VIOLET, 0.36)} 0%, ${dkh(VIOLET, 0.66)} 100%)` }} />
      <div style={{ position: "absolute", left: -30, top: -20, right: -30, height: 660,
        zIndex: 11, overflow: "hidden" }}>
        {Array.from({ length: 84 }, (_, i) => (
          <div key={"fw" + i} style={{ position: "absolute", left: (i % 12) * 96 - 20,
            top: Math.floor(i / 12) * 96, width: 92, height: 92,
            background: (i + Math.floor(i / 12)) % 2 ? dkh(VIOLET, 0.46) : dkh(VIOLET, 0.62),
            clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        ))}
      </div>

      {/* ON AIR — below the reserved plate band (panel y 112..210) */}
      <div style={{ position: "absolute", left: 250 + L.a * 0.4, top: 224, width: 512, height: 86,
        zIndex: 70, borderRadius: 10, display: "flex", alignItems: "center",
        justifyContent: "center", border: "8px solid rgba(0,0,0,0.6)",
        background: `linear-gradient(178deg, ${mxh(RED, 0.30)}, ${dkh(RED, 0.30)})`,
        opacity: 0.72 + Math.abs(Math.sin(f / 8)) * 0.28,
        ...ui(52, 900), color: "#FFF0EC", letterSpacing: 11 }}>ON AIR</div>

      {/* the take he is laying down — it SCROLLS, and it peaks with his voice */}
      <div style={{ position: "absolute", left: 92 + L.a * 0.4, top: 340, width: 828, height: 84,
        zIndex: 30, display: "flex", alignItems: "center", gap: 6, opacity: 0.92 }}>
        {Array.from({ length: 34 }, (_, i) => {
          const q = i + f * 1.15;
          return (
            <div key={"ew" + i} style={{ flex: 1, borderRadius: 2,
              background: hexa(Math.floor(q) % 3 ? "#8EE4F2" : "#F2F8FA", 0.92),
              height: (8 + Math.abs(Math.sin(q * 1.5)) * 70) * belt }} />
          );
        })}
      </div>

      {/* ⭐ THE SIGNAL ECHOES BEHIND HIM — two offset ghosts of the same pose,
          which is what says COPY without a caption */}
      <HeroKey x={470 + L.a * 0.4} y={470} r={340} c="#C9A8FF" z={40} k={1.0} />
      {[-1, 1].map((d) => (
        <div key={"gh" + d} style={{ position: "absolute", left: 0, top: 0, zIndex: 52,
          opacity: 0.26 + belt * 0.16,
          transform: `translate(${d * (26 + belt * 16)}px, ${-bob * 7}px)`,
          filter: `hue-rotate(${d * 12}deg)` }}>
          <Hero f={f} x={470 + L.a * 0.4} y={GY - 6} size={268} z={52} act={3} ph={0.5}
            costume={{ prof: 0 }} cheer={1} gaze={0} />
        </div>
      ))}

      {/* ⭐⭐⭐ THE CLONE, SINGING — head back, mouth open, riding the take */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 58,
        transform: `translateY(${-Math.abs(bob) * 18}px) rotate(${-4 + bob * 5.5}deg)`,
        transformOrigin: `${470 + L.a * 0.4}px ${GY}px` }}>
        <Contact x={470 + L.a * 0.4} y={GY - 12} w={244} o={0.34} z={54} />
        <Hero f={f} x={470 + L.a * 0.4} y={GY} size={268} z={58} act={3} ph={0.5}
          drive={bob * 0.5} strain={belt * 0.35} cheer={1} gaze={0}
          costume={{ glasses: 1 }} />
      </div>
      {/* the arm that is holding the note */}
      {/* both arms up — nobody belts a note with their hands by their sides */}
      <Forearm x0={530 + L.a * 0.4} y0={GY - 190} x1={618 + L.a * 0.4}
        y1={GY - 282 - belt * 30} w={28} c={CLAY} z={59} />
      <Forearm x0={410 + L.a * 0.4} y0={GY - 190} x1={330 + L.a * 0.4}
        y1={GY - 262 - belt * 24} w={27} c={CLAY} z={59} />

      {/* the mic he is singing into, in FRONT of him where it belongs */}
      <StudioMic x={230 + L.a * 0.4} y={648} s={1.30} f={f} live={belt} z={64} />
      {/* ⭐ WHAT SINGING LOOKS LIKE — sound leaving his MOUTH and travelling to
          the mic, plus the notes it carries. Without these he is a sprite
          standing near a microphone; with them he is performing into it. */}
      {[0, 1, 2, 3].map((k) => {
        const t = ((f / 15) + k / 4) % 1;
        return (
          <div key={"vr" + k} style={{ position: "absolute",
            left: 386 + L.a * 0.4 - t * 150, top: 500 - 34 - t * 26,
            width: 34 + t * 96, height: 34 + t * 78, zIndex: 60, borderRadius: "50%",
            background: `radial-gradient(circle, ${hexa("#EADCFF", (1 - t) * 0.55)} 0%, ${hexa("#EADCFF", 0)} 70%)` }} />
        );
      })}
      {[0, 1, 2].map((k) => {
        const t = ((f / 26) + k / 3) % 1;
        return (
          <svg key={"nt" + k} width="46" height="52" viewBox="0 0 46 52"
            style={{ position: "absolute", left: 360 + L.a * 0.4 - t * 120 + (k % 2) * 26,
              top: 470 - t * 150, zIndex: 61, opacity: (1 - t) * 0.9,
              transform: `rotate(${-14 + t * 26}deg)` }}>
            <ellipse cx="15" cy="40" rx="13" ry="10" fill="#EADCFF"
              stroke="#2A1E42" strokeWidth="4" transform="rotate(-18 15 40)" />
            <rect x="25" y="6" width="5" height="34" fill="#EADCFF" stroke="#2A1E42" strokeWidth="3" />
            <path d="M28 6 Q42 10 40 22 Q38 12 28 16 Z" fill="#EADCFF"
              stroke="#2A1E42" strokeWidth="3" />
          </svg>
        );
      })}

      {/* ⭐ AND HIM, OUTSIDE THE GLASS, ARMS FOLDED, NOT RECORDING ANYTHING */}
      <div style={{ position: "absolute", left: 664 + L.c * 0.4, top: 396, width: 300, height: 208,
        zIndex: 20, borderRadius: 6, overflow: "hidden",
        background: `linear-gradient(176deg, ${mxh(TEAL, 0.20)} 0%, ${dkh(TEAL, 0.44)} 100%)`,
        border: "9px solid rgba(0,0,0,0.62)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 56,
          background: hexa("#0A1A1E", 0.6) }} />
        <div style={{ position: "absolute", left: 96 + away * 22, bottom: 6,
          transform: "scale(0.62)", transformOrigin: "50% 100%" }}>
          <Hero f={f} x={0} y={0} size={230} z={22} act={1} ph={1.9}
            costume={{ suit: 1 }} gaze={-0.9} stern={1} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 664 + L.c * 0.4, top: 396, width: 300, height: 208,
        zIndex: 21, borderRadius: 6, pointerEvents: "none",
        background: `linear-gradient(122deg, ${hexa("#FFFFFF", 0.16)} 0%, ${hexa("#FFFFFF", 0)} 46%)` }} />

      {/* the door seals the room on its own, with the copy still working */}
      {(() => {
        const shut = E(f, 24, 44, 0, 1, IN_Q);
        if (shut <= 0) return null;
        return (
          <div style={{ position: "absolute", left: 1012 - shut * 440, top: 236,
            width: 440, height: 560, zIndex: 84,
            transform: `perspective(1400px) rotateY(${34 - shut * 34}deg)`,
            transformOrigin: "100% 50%",
            background: `linear-gradient(96deg, ${dkh(VIOLET, 0.72)} 0%, ${dkh(VIOLET, 0.52)} 100%)`,
            border: "9px solid rgba(0,0,0,0.66)", borderRadius: 6 }}>
            {Array.from({ length: 6 }, (_, k) => (
              <div key={"dp" + k} style={{ position: "absolute", left: 24 + (k % 2) * 196,
                top: 34 + Math.floor(k / 2) * 172, width: 182, height: 150, borderRadius: 5,
                background: hexa("#FFFFFF", 0.06), border: `4px solid ${hexa("#000000", 0.30)}` }} />
            ))}
            <div style={{ position: "absolute", left: 138, top: 176, width: 164, height: 208,
              borderRadius: "50%", background: hexa(TEAL, 0.16), border: "10px solid rgba(0,0,0,0.5)" }} />
            <div style={{ position: "absolute", left: 28, top: 268, width: 22, height: 96,
              borderRadius: 11, background: mxh(STEEL, 0.3), border: "4px solid rgba(0,0,0,0.5)" }} />
          </div>
        );
      })()}

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
      <Runner y={248} f={f} z={22} rate={11.2} pitch={160} w={132} h={66} kind="fan"
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
        costume={{ cop: 1 }} stern={1} />

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
        lamp={{ x: 506 + L.a * 0.3, y: 244, r: 268 }} floorKind="slab" grit={0.9} />

      <Runner y={648} f={f} z={22} rate={10.6} pitch={172} w={140} h={66} kind="crate"
        c="#9EB0BC" c2="#0C1216" rail o={0.84} />

      <ScanGantry x={272 + L.b * 0.3} y={230} w={468} f={f} grip={grip}
        strain={refuse} lift={tear} z={44} />
      <PhotoPrint x={506 + L.b * 0.3} y={580 - tear * 150} turn={tear} f={f} s={0.85} z={78} />

      {/* the cost of the tear: a crack, and a shower of scale */}
      {tear > 0 && tear < 0.5 && (<>
        <Ring x={506 + L.b * 0.3} y={556} f={f} at={22} c="#CFE6F4" z={80} s={0.86} />
        <Fall x={412 + L.b * 0.3} y={566} w={190} f={f} at={22} z={79} />
      </>)}

      {/* the hero slots the print in and then braces against the refusal */}
      <Contact x={790 + L.c * 0.3} y={GY - 12} w={184} o={0.4} />
      <Hero f={f} x={878 + L.c * 0.3} y={GY} size={226} z={56} act={1} ph={1.1}
        strain={refuse * 0.9}
        drive={E(f, 0, 6, 0, 1, IO) * -0.30 + E(f, 6, 14, 0, 1, OUT) * 0.30}
        costume={{ constr: 1 }} stern={refuse > 0.4 ? 1 : 0}
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

      <Runner y={244} f={f} z={20} rate={11.0} pitch={166} w={138} h={64} kind="load"
        c="#E8E0CC" c2="#2E2A20" rail hang={10} o={0.8} />

      <Turntable x={498 + L.b * 0.3} y={596} f={f} spin={spin} lamps={lamps} z={46} />

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
        costume={{ suit: 1 }} cheer={f > 54 ? 1 : 0} gaze={0.7} />

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
        <ShopFront key={"eb" + i} x={x + L.a * 0.7} y={p.horizon + 26} s={0.72 + i * 0.05}
          c={["#3E5A6E", "#4A5A48", "#5E4A52"][i]} z={12} />
      ))}

      {/* ⭐ the conveyor running out through the door — full width, alternating */}
      <Runner y={556} f={f} z={30} rate={12.4} pitch={166} w={144} h={72} kind="crate"
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
      {[4, 13, 22, 31, 40, 49].map((at, i) => {
        const k = E(f, at, at + 24, 0, 1, IO);
        if (k <= 0) return null;
        return (
          <EcomCrate key={"ec" + i} x={286 + k * 384 + L.b * 0.7}
            y={508 - Math.sin(k * Math.PI) * 42} s={0.90} z={60 + i} rot={-8 + k * 16} />
        );
      })}
      <Docket x={866 + L.c * 0.3} y={630} f={f} at={44} s={0.82} z={84} />

      {/* the hero loads, and a crew works the tailgate */}
      {[0, 1].map(i => (
        <Crew key={"dc" + i} f={f} x={556 + i * 132 + L.c * 0.3} y={GY} i={wear(i + 8)} size={128}
          z={54} at={2 + i * 4} />
      ))}
      <Contact x={152 + L.a * 0.7} y={GY - 12} w={196} o={0.38} />
      <Hero f={f} x={246 + L.a * 0.7} y={GY} size={240} z={56} act={1} ph={1.4}
        drive={[6, 22, 38].reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 12, 0, 1, OUT)) * 0.28, 0)}
        costume={{ constr: 1 }} cheer={f > 52 ? 1 : 0} />

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
  const shove = E(f, 4, 12, 0, 1, IN_Q) - E(f, 12, 21, 0, 1, OUT)
              + E(f, 22, 29, 0, 1, IN_Q) - E(f, 29, 38, 0, 1, OUT);
  /* the load carries on when the barrow stops — a damped ring, never a stop */
  const hit1 = f >= 12 ? Math.sin((f - 12) * 0.74) * Math.exp(-(f - 12) / 7) : 0;
  const hit2 = f >= 29 ? Math.sin((f - 29) * 0.74) * Math.exp(-(f - 29) / 7) : 0;
  const ring = hit1 + hit2;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.66}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="house" overhead="none"
        rake={0.09 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.4} rakeN={RAKE_N[v]}
        lamp={{ x: 224, y: 356, r: 300 }} floorKind="tarmac" grit={0.9} />

      {/* ⭐⭐ THE THREE SHOPS HE ALREADY OWNS, GLOWING BEHIND HIM — and they are
          the MOTIVATED LIGHT that makes him readable. The first pass put a
          near-black hero on the darkest set in the reel and he was invisible in
          the delivered frame: `name which side of the contrast your subject is
          on` (reel 110). He is lit from behind-left by his own workshops, which
          is also the sentence the scene is making — everything he has built is
          behind him and the gate is in front. */}
      {R.tools.map((t, i) => (
        <React.Fragment key={"gl" + i}>
          <div style={{ position: "absolute", left: 138 + i * 138, top: 342, width: 118,
            height: 226, zIndex: 70,
            background: `linear-gradient(176deg, ${dkh(t.c, 0.30)} 0%, ${dkh(t.c, 0.62)} 100%)`,
            border: "4px solid rgba(0,0,0,0.5)" }}>
            <div style={{ position: "absolute", left: 14, top: 26, right: 14, height: 84,
              background: mxh(t.c, 0.34 + 0.16 * Math.abs(Math.sin(f / 11 + i))) }} />
            <div style={{ position: "absolute", left: 14, bottom: 18, right: 14, height: 22,
              background: mxh(t.c, 0.18) }} />
          </div>
          {/* each shop throws a shaped pool onto the tarmac — never a full fill */}
          <div style={{ position: "absolute", left: 118 + i * 138, top: 560, width: 240,
            height: 190, zIndex: 71, opacity: 0.34, transform: "skewX(-20deg)",
            background: `linear-gradient(180deg, ${hexa(t.c, 0.62)} 0%, ${hexa(t.c, 0)} 100%)` }} />
        </React.Fragment>
      ))}

      <IronGate x={556 + L.b * 0.7} y={252} w={392} h={396} f={f} open={0} lit={0} z={62} wide />

      {/* the loaded trolley, shoved at it, coming back both times */}
      <LoadedBarrow x={430 + shove * 168 + ring * 26 + L.b * 0.7} y={GY} f={f}
        tip={shove * 5.4 + ring * 3.2} s={1.02} z={74} />

      {/* the hero, driving with his whole body, and getting nowhere */}
      <Contact x={210 + shove * 150} y={GY - 12} w={198} o={0.34} z={72} />
      <Hero f={f} x={300 + shove * 150} y={GY} size={248} z={76} act={1} ph={0.6}
        drive={shove * 0.30} strain={Math.min(0.92, Math.abs(shove) * 1.5)}
        costume={{ suit: 1 }} stern={1} />
      <Forearm x0={356 + shove * 150} y0={GY - 178} x1={452 + shove * 168 + ring * 26}
        y1={GY - 202} w={24} c={CLAY} z={78} />
      {/* ⭐ THE BACKGROUND PROCESS, and it is the one shape the motion table
          actually pays for: a full-width high-contrast band travelling the
          tarmac. Litter blowing down a shut alley is what the place would
          contain, so it is furniture and costs the hierarchy nothing. */}
      <Runner y={686} f={f} z={73} rate={12.6} pitch={176} w={124} h={68} kind="bead"
        c="#8E86A6" c2="#0A0910" rail={false} o={0.5} />

      {/* the cost of the shove: dust off the tarmac, and nothing else moves */}
      <Puff x={556 + L.b * 0.7} y={GY} f={f} at={12} c="#6E6482" z={80} />
      <Puff x={556 + L.b * 0.7} y={GY} f={f} at={29} c="#6E6482" z={80} />
      <Ring x={556 + L.b * 0.7} y={GY - 90} f={f} at={12} c="#6E6482" z={79} s={0.9} />
      <Ring x={556 + L.b * 0.7} y={GY - 90} f={f} at={29} c="#6E6482" z={79} s={0.9} />

      {/* ⭐ THE QUEUE THE GATE IS HOLDING UP — the crowd IS the point of this
          scene, so it is the one place the band is also the argument. */}
      <NearBand f={f} n={4} y={870} size={200} pitch={262} x0={-34} z={86}
        at={0} seed={9} dx={L.c * 0.9} />

      <HeroKey x={556 + L.b * 0.7} y={470} r={330} c="#FFD2C4" z={33} k={0.86} />
      <NearShade top={634} z={88} k={0.50} />
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
  /* the guide is CARRIED IN and set on the stand across the first 26 frames,
     so the peak scene opens on an arrival instead of on a parked object */
  const bring = E(f, 2, 22, 0, 1, IO);
  const settle = f > 22 ? Math.sin((f - 22) * 0.7) * Math.exp(-(f - 22) / 8) * 5 : 0;

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

      <Runner y={250} f={f} z={68} rate={11.6} pitch={170} w={134} h={64} kind="bead"
        c="#FFD9A0" c2="#241628" rail hang={14} o={0.72} />
      <IronGate x={556 + L.b * 0.7} y={252} w={392} h={396} f={f} open={lift} lit={struck}
        z={62} wide />

      {/* the stand, the press, and the guide being struck */}
      <div style={{ position: "absolute", left: 210 + L.a * 0.3, top: 556, width: 240, height: 30,
        zIndex: 78, borderRadius: 4, background: "linear-gradient(178deg,#8E7A5E,#3A3024)",
        border: "4px solid rgba(0,0,0,0.46)" }} />
      <StrikePress x={330 + L.a * 0.3} y={0} f={f} hits={HITS} z={88} />
      <Guide x={330 + L.a * 0.3 - (1 - bring) * 470 + carry * 218}
        y={412 - carry * 42 - (1 - bring) * 96} f={f} struck={struck}
        s={0.86} z={82} rot={(1 - bring) * -22 + settle + carry * 12} />

      {/* the cost of each strike: sparks and a ring, ascending */}
      {HITS.map((at, i) => (
        <React.Fragment key={"hk" + i}>
          <Ring x={330 + L.a * 0.3} y={430} f={f} at={at} c={mxh(GOLD, i * 0.2)} z={86}
            s={0.6 + i * 0.12} />
          {f >= at && f < at + 10 && <Fall x={266 + L.a * 0.3} y={430} w={140} f={f} at={at} z={85} />}
        </React.Fragment>
      ))}

      {/* the hero strikes, then carries it to the hasp */}
      <Contact x={648 + L.c * 0.7} y={GY - 12} w={196} o={0.36} />
      <Hero f={f} x={742 + L.c * 0.7} y={GY} size={244} z={64} act={1} ph={1.7}
        drive={HITS.reduce((a, at) =>
          a + (E(f, at - 4, at, 0, 1, IN_Q) - E(f, at, at + 10, 0, 1, OUT)) * -0.26, 0)
          + carry * 0.18}
        strain={E(f, 58, 66, 0, 0.6, OUT) * (1 - E(f, 70, 78, 0, 1, IO))}
        costume={{ suit: 1 }} cheer={lift > 0.6 ? 1 : 0} />

      <HeroKey x={470 + L.b * 0.7} y={500} r={310} c="#FFE7A8" z={33} k={1.0} />
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
        <Crew key={"ct" + i} f={f} x={706 + i * 104} y={GY - 40} i={wear(i + 5)} size={104} z={44}
          at={i * 3} />
      ))}

      <Contact x={168 + walk * 250} y={GY - 12} w={190} o={0.34} />
      <Hero f={f} x={258 + walk * 250} y={GY} size={238} z={56} act={2} ph={0.4}
        drive={walk * 0.16} costume={{ constr: 1 }} cheer={1} />

      {/* ⛔ ITS OWN COLUMN: the plate sits in the reserved band, nothing else
          is allowed above y 300 in the middle third of this shot. */}
      <KeywordPlate x={506} y={224} f={f} at={4} s={1} z={92} />
      <Edge side="r" c="#241A14" w={92} z={93} kind="post" />
    </Scene>
  );
};

/* ===========================================================================
   ⭐⭐⭐ THE REBUILD — Alex on v1: *"use real logos and graphics wherever
   possible, right now it's just random scenes, not hierarchical enough nor
   interesting, I can't even tell what's going on in each scene, it's way too
   odd and confusing."*  Three complaints, three causes, three fixes:

   1. "JUST RANDOM SCENES" — 16 places in 30s is 1.9s each, and no idea had
      time to land. Consolidated to ELEVEN: each tool now owns ONE place for
      about five seconds, which is long enough to state a name, show the thing
      and show what comes out.
   2. "NOT HIERARCHICAL ENOUGH" — every v1 scene ran a machine AND a crew AND a
      travelling band AND props, all competing. Every scene below has ONE
      dominant object at 40-55% of the panel and nothing else above knee height.
   3. "I CAN'T TELL WHAT'S GOING ON" — the tools were drawn as METAPHORS (a film
      mill, a cutting lathe, a scan gantry) and a metaphor has to be DECODED.
      ⛔ This is reel 115's rule, which is quoted in BuildProps.tsx and which I
      then broke: *at half a second on a phone a viewer RECOGNISES A MARK; they
      do not decode a silhouette.* Each tool now OPENS on its real GitHub plate
      — real owner/name, real star count, real licence — and then shows the
      literal output: a vertical short playing, a waveform copied onto a rank of
      speakers, a photo becoming a wireframe mesh.

   ⛔ EVERY MARK IS SOURCED. GitHub (all three are public repos), Hugging Face
   (`tencent/Hunyuan3D-2`), TikTok/Instagram/YouTube (MoneyPrinterTurbo's OWN
   README names them as upload targets), Docker (its README's deploy method),
   Shopify (their docs: product media can include 3D models), Fiverr and Upwork
   (spoken twice each). Nothing is drawn as a rival or a replacement.
   ========================================================================= */

/** the shared bench every tool scene is staged on — one place, one light, and
    a DARK ground so the lit hero object is the only thing that ranks */
const ToolRoom: React.FC<{ p: any; f: number; v: Variant; lampX: number }> =
  ({ p, f, v, lampX }) => (
  <>
    <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
      rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.6} rakeN={RAKE_N[v]}
      lamp={{ x: lampX, y: 250, r: 300 }} floorKind="slab" grit={0.7} />
    {/* the bench the hero object sits on — a real surface, edge to edge */}
    <Runner y={716} f={f} z={13} rate={11.4} pitch={182} w={132} h={62} kind="crate"
      c={mxh(p.key, 0.06)} c2={dkh(p.grit, -0.2)} rail o={0.6} />
    <div style={{ position: "absolute", left: -40, top: 700, width: W + 80, height: 22,
      zIndex: 12, background: dkh(p.lip, -0.16) }} />
    <div style={{ position: "absolute", left: -40, top: 722, width: W + 80, height: 90,
      zIndex: 11, background: `linear-gradient(180deg, ${dkh(p.floor2, 0.2)} 0%, ${dkh(p.floor2, 0.5)} 100%)` }} />
  </>
);

/* =========================================================================
   T1 · MONEY PRINTER TURBO — 4.73 to 9.90s (155f) · ESCALATE 1
   VO: "First, Money Printer Turbo. Just type one word or topic and it writes a
        script, records the voiceover, and edits the final video"

   ⭐ THE NAME FIRST, AS A REAL MARK: the plate lands, is held for a beat, then
   the camera cuts to the bench and the short is BUILT on the three spoken
   words. The beats are the measured caption onsets, not an even spread.
   ====================================================================== */

/* =========================================================================
   T2 · GPT SoVITS — 11.19 to 16.23s (151f) · ESCALATE 2
   VO: "Second, GPT SoVITS. One minute of your voice is enough to clone it, so
        sell narration services on Fiverr and Upwork"
   ====================================================================== */

/* =========================================================================
   T3 · HUNYUAN 3D — 17.71 to 22.61s (147f) · ESCALATE 3
   VO: "Third, Hunyuan 3D. It turns one flat photo into a real 3D model you can
        spin, light, and reuse."
   ====================================================================== */

/* =========================================================================
   SALE_A · THE COUNTER — 9.90 to 11.19s (39f) · PAYOFF 1
   VO: "to sell to businesses."
   ⛔ NO MONEY. The transaction is a docket stamped SOLD and two real marks.
   ====================================================================== */
export const SALE_A: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  const L = LAY[v];
  /* ⭐⭐⭐ THE HAND-OFF. 39 frames, three beats, and the beat IS the sentence:
     *"so sell video editing to businesses."*

     ⛔ What was here was a flat card sliding across a counter while two stray
     forearms hovered — the reel's whole THESIS is that you can sell these, and
     all three selling beats were the only scenes in the reel with no object and
     no action. `feedback_illustrate_the_sentence_not_the_set`: a sale is an
     EXCHANGE — the goods leave in someone's hands and the paper comes back. */
  const push = E(f, 0, 13, 0, 1, IO);        /* he pushes it across       */
  const grab = E(f, 12, 22, 0, 1, IO);       /* the buyer's hands close   */
  const away = E(f, 20, 39, 0, 1, IN_Q);     /* it goes, and keeps going  */
  const slam = E(f, 22, 30, 0, 1, OUT);      /* SOLD lands where it was   */
  const HX = 300 + push * 300 + away * 520 + L.b * 0.7;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
        rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.6} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6}
        window={{ x: 84 + L.a * 0.7, y: 250, w: 300, h: 214 }} />
      <TradeCounter x={210 + L.b * 0.7} y={492} w={620} z={52} />
      <HeroKey x={470 + L.b * 0.7} y={420} r={300} c="#FFF4DE" z={33} k={0.95} />

      {/* the order stack on his side, GROWING — the sale before this one */}
      {Array.from({ length: 5 }, (_, i) => {
        const k = E(f, i * 6, i * 6 + 8, 0, 1, OUT);
        if (k <= 0) return null;
        return (
          <div key={"os" + i} style={{ position: "absolute", left: 96 + L.a * 0.7 + (i % 2) * 7,
            top: 470 - i * 9, width: 132, height: 16, zIndex: 60 + i, opacity: k,
            transform: `rotate(${(i % 2 ? 2 : -2)}deg) scaleY(${k})`,
            background: "linear-gradient(178deg,#FBF6EA,#CFC4A8)", border: "3px solid #2A241C" }} />
        );
      })}

      {/* ⭐ THE FINISHED VIDEO, LEAVING — the same object the mill made */}
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 80,
        opacity: 1 - away * 0.9 }}>
        <ToolObject x={HX} y={444 - Math.sin(push * Math.PI) * 26} s={0.62 - away * 0.16}
          i={0} f={f} z={80} rot={-6 + push * 8 + away * 22} label={false}
          glow={1.1} live={1} />
      </div>

      {/* ⭐ THE BUYER'S HANDS — they come IN, they CLOSE, they take it out of
          frame. Cropped by the right edge, which is also the depth cue. */}
      {[0, 1].map((i) => (
        <Forearm key={"bh" + i} x0={996} y0={448 + i * 74}
          x1={996 - grab * 234 - away * 70} y1={432 + i * 60 - grab * 12}
          w={31 - i * 3} c="#7E6A56" z={82} />
      ))}

      {/* ⭐ SOLD, SLAMMED DOWN where the goods were — with a real squash */}
      {slam > 0 && (
        <div style={{ position: "absolute", left: 452 + L.b * 0.7, top: 452, zIndex: 88,
          transform: `translateY(${(1 - slam) * -180}px) scale(${1 + (1 - slam) * 0.5}, ${1 - Math.max(0, 1 - Math.abs(slam - 0.55) / 0.18) * 0.28})`,
          transformOrigin: "50% 100%" }}>
          <div style={{ padding: "10px 22px", background: "#FBF6EA",
            border: "6px solid #B4392C", borderRadius: 6, transform: "rotate(-7deg)",
            ...ui(38, 900), color: "#B4392C", letterSpacing: 4 }}>{R.sold}</div>
        </div>
      )}
      {slam > 0.3 && <Ring x={520 + L.b * 0.7} y={470} f={f} at={26} c="#E8C7B8" z={87} s={1.3} />}

      <Contact x={150 + L.a * 0.7} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={240 + L.a * 0.7} y={GY} size={230} z={56} act={1} ph={0.3}
        drive={push * 0.5} strain={push * 0.5} costume={{ suit: 1 }}
        cheer={slam > 0.5 ? 1 : 0} gaze={0.9} />
      <Forearm x0={296 + L.a * 0.7} y0={GY - 168} x1={316 + push * 170 + L.a * 0.7} y1={462}
        w={26} c={CLAY} z={58} />
      <NearShade top={648} z={88} k={0.46} />
      <BandChip t="SELL IT TO BUSINESSES" c={INK} />
      <Edge side="r" c="#1E1A14" w={96} z={93} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   SALE_B · THE ECOM PAGE — 22.61 to 24.71s (63f) · PAYOFF 3
   VO: "So sell this to ecom brands and businesses."
   ⭐ Shopify's own docs say product media can include 3D models, so the mark is
   depicting the MARKET the model is sold into, never endorsing anything.
   ====================================================================== */
export const SALE_B: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("dock");
  const L = LAY[v];
  const land = E(f, 8, 26, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.52}>
      {/* two shots: the counter, then in on the page that is being sold */}
      <Shots f={f} shots={[
        { at: 0,  s: 1.00, x: 0,   y: 0,   drift: 0.06 },
        { at: 32, s: 1.26, x: -84, y: -34, drift: 0.06 },
      ]}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="gantry"
        rake={0.11 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} />
      {/* ⭐⭐⭐ THE LISTING ASSEMBLES AROUND THE MODEL, THEN THE ORDERS COME.
          A finished product page sliding on screen is a card appearing — it
          states the outcome and shows no work. Now the model lands FIRST, the
          page builds around it piece by piece, ADD TO CART lands last and
          green, and the moment it does, orders start flying out of it. The
          build is the middle of the scene and the payoff is the end of it. */}
      {(() => {
        const PX = 596 + L.b * 0.7, PY = 300;
        const drop = E(f, 2, 16, 0, 1, BACK);       /* the model lands       */
        const frame = E(f, 14, 24, 0, 1, OUT);      /* the page draws round it */
        const thumbs = E(f, 24, 38, 0, 1, OUT);     /* the gallery snaps in  */
        const rows = E(f, 34, 46, 0, 1, OUT);       /* title and price       */
        const cart = E(f, 44, 54, 0, 1, BACK);      /* ADD TO CART, green    */
        return (
          <>
            {/* the page panel, drawing outward from the model */}
            <div style={{ position: "absolute", left: PX - 300, top: PY - 30, width: 600,
              height: 356, zIndex: 44, opacity: frame,
              transform: `scaleY(${0.2 + frame * 0.8})`, transformOrigin: "50% 30%",
              background: "linear-gradient(176deg,#FBF7EC 0%,#E2DCCC 100%)",
              border: "7px solid #22262E", borderRadius: 10 }} />
            {/* the shop's own mark, top-left of its own page */}
            {frame > 0.5 && <RealMark src="shopify.svg" s={46} z={49}
              x={PX - 272} y={PY + 4} />}
            {frame > 0.5 && (
              <div style={{ position: "absolute", left: PX - 214, top: PY + 8, zIndex: 49,
                ...ui(27, 900), color: "#22262E", letterSpacing: 1 }}>PRODUCT PAGE</div>
            )}
            {/* ⭐ THE MODEL — it lands before the page exists and keeps turning */}
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 52,
              opacity: Math.min(1, drop * 2) }}>
              <ToolObject x={PX - 150} y={PY + 272 - (1 - drop) * 150} s={1.06}
                i={2} f={f} z={52} rot={(1 - drop) * -18} label={false}
                glow={1.1 + (1 - drop) * 0.8} live={1} />
            </div>
            {/* the gallery thumbnails snapping in, one at a time */}
            {[0, 1, 2].map((k) => {
              const q = Math.min(1, Math.max(0, thumbs * 3.4 - k));
              if (q <= 0) return null;
              return (
                <div key={"th" + k} style={{ position: "absolute", left: PX - 268 + k * 74,
                  top: PY + 268, width: 62, height: 52, zIndex: 53, opacity: q,
                  transform: `scale(${0.5 + q * 0.5})`, borderRadius: 5,
                  background: hexa(R.tools[2].c, 0.42), border: "4px solid #22262E" }} />
              );
            })}
            {/* the title and price rows typing themselves in */}
            {[0, 1, 2].map((k) => {
              const q = Math.min(1, Math.max(0, rows * 3.4 - k));
              if (q <= 0) return null;
              return (
                <div key={"rw" + k} style={{ position: "absolute", left: PX + 24,
                  top: PY + 74 + k * 34, height: k ? 12 : 20, zIndex: 53,
                  width: (k ? 200 : 246) * q, borderRadius: 3,
                  background: hexa("#22262E", k ? 0.30 : 0.72) }} />
              );
            })}
            {/* ADD TO CART — the last thing that lands, and the thing that fires */}
            {cart > 0 && (
              <div style={{ position: "absolute", left: PX + 24, top: PY + 202, zIndex: 54,
                padding: "11px 26px", borderRadius: 7, background: "#3F9E74",
                border: "5px solid #1E5C43", transform: `scale(${0.6 + cart * 0.4})`,
                ...ui(24, 900), color: "#F2FBF6", letterSpacing: 2 }}>ADD TO CART</div>
            )}
            {/* ⭐ AND THE ORDERS COME — a stream out of the button, to the right */}
            {cart > 0.6 && Array.from({ length: 6 }, (_, k) => {
              const t = ((f - 50) / 26 + k * 0.17) % 1;
              if (t < 0) return null;
              return (
                <div key={"or" + k} style={{ position: "absolute",
                  left: PX + 120 + t * 420, top: PY + 206 - t * 190 - (k % 3) * 16,
                  width: 62, height: 44, zIndex: 84, opacity: (1 - t) * 0.95,
                  transform: `rotate(${t * (k % 2 ? 40 : -40)}deg)`, borderRadius: 4,
                  background: "linear-gradient(178deg,#FBF6EA,#D8CFB8)",
                  border: "4px solid #2A241C" }}>
                  <div style={{ position: "absolute", left: 7, top: 9, right: 7, height: 4,
                    background: hexa("#2A241C", 0.5) }} />
                  <div style={{ position: "absolute", left: 7, top: 19, right: 20, height: 4,
                    background: hexa("#2A241C", 0.3) }} />
                </div>
              );
            })}
          </>
        );
      })()}
      <Contact x={126 + L.a * 0.7} y={GY - 12} w={190} o={0.36} />
      <Hero f={f} x={214 + L.a * 0.7} y={GY} size={232} z={56} act={1} ph={1.4}
        drive={(E(f, 6, 12, 0, 1, IN_Q) - E(f, 12, 24, 0, 1, OUT)) * 0.28}
        costume={{ constr: 1 }} cheer={f > 44 ? 1 : 0} />
      {/* ⛔⛔ THE `desk` FOREMASS WAS A BLACK SLAB ACROSS THE SPRITES. Alex, at
          13s: *"there is a big black square that blocks the claude sprites."*
          It is a near-full-height opaque mass at z90 — ABOVE every sprite in
          the scene — added back when BODY_BLACK was failing at 35.7. `NearShade`
          now carries the whole dark foreground and BODY_BLACK sits at 21.2 with
          margin, so the slab is redundant AND it was eating the cast. */}
      {/* the buyers this line is about, near camera and cropped by the edge */}
      <NearBand f={f} n={4} y={866} size={202} pitch={268} x0={-40} z={86}
        at={2} seed={7} dx={L.b * 0.9} />

      <HeroKey x={606 + L.b * 0.7} y={470} r={300} c="#E8F2FF" z={33} k={0.92} />
      <NearShade top={628} z={88} k={0.54} />
      </Shots>
      <BandChip t="SELL 3D TO ECOM BRANDS" c={INK} />
    </Scene>
  );
};

/* =========================================================================
   SETUP2 · THE FIT-OUT — 2.40 to 4.73s (70f) · SETUP
   VO: "And the best part, they take just five minutes to set up."
   ⭐ REBUILT AROUND THE REAL MARKS: three repo plates are craned in and bolted
   to the wall one-two-three, with Docker on the bench — its README's own deploy
   method — and a clock whose minute hand barely travels.
   ====================================================================== */
export const SETUP2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fitout");
  const L = LAY[v];
  const AT = [6, 26, 46];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.54}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="gantry"
        rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.2} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6}
        window={{ x: 720 + L.b * 0.7, y: 250, w: 240, h: 200 }} />
      <WallClock x={128 + L.a * 0.4} y={318} s={140} f={f} z={30} />

      {/* ⭐⭐⭐ THREE GEMS LAND IN THREE MOUNTS, one per beat. The scene used to
          bolt up two flat repo PLATES — a slab of type is not a main focus, and
          "main focus not interesting" is what came back. The stones are the
          subject of the whole reel, so they are the subject of this shot; the
          plate is demoted to the label under each one. */}
      {R.tools.map((t, i) => {
        const at = AT[i];
        const k = E(f, at, at + 16, 0, 1, BACK);
        const cx = 234 + i * 272 + L.b * 0.7;
        return (
          <React.Fragment key={"gm" + i}>
            {/* the empty socket it drops into — visible BEFORE it arrives, so
                the shot promises each landing (`predictable is not anticipation`
                cuts the other way: an empty mount is a question) */}
            <div style={{ position: "absolute", left: cx - 62, top: 560, width: 124, height: 26,
              zIndex: 38, borderRadius: "50%",
              background: `radial-gradient(ellipse, ${hexa("#0B0F16", 0.6)} 0%, ${hexa("#0B0F16", 0)} 72%)` }} />
            <div style={{ position: "absolute", left: cx - 46, top: 548, width: 92, height: 30,
              zIndex: 39, background: `linear-gradient(180deg, ${mxh(STEEL, 0.24)} 0%, ${dkh(STEEL, 0.5)} 100%)`,
              border: "5px solid rgba(0,0,0,0.52)", borderRadius: 5 }} />
            {k > 0 ? (
              <>
                <ToolObject x={cx} y={556 - (1 - k) * 240 + k * Math.sin(f / 11 + i) * 12}
                  s={1.16 + k * Math.sin(f / 8 + i) * 0.06} i={i} f={f} z={72}
                  rot={(1 - k) * (i % 2 ? 16 : -16) + k * Math.sin(f / 13 + i) * 8}
                  glow={0.7 + k * (0.9 + Math.abs(Math.sin(f / 6.2 + i)) * 0.7)} live={k} />
                {k >= 1 && <Ring x={cx} y={556} f={f} at={at + 15} c={mxh(t.c, 0.5)} z={74} s={0.9} />}
              </>
            ) : null}
          </React.Fragment>
        );
      })}

      {/* Docker on the bench — the deploy method its own README documents */}
      <div style={{ position: "absolute", left: 156 + L.a * 0.4, top: 470, zIndex: 66,
        display: "flex", alignItems: "center", gap: 14, opacity: E(f, 30, 44, 0, 1, OUT) }}>
        <RealMark src="docker.svg" s={58} z={66} />
        <span style={{ ...mono(24, 900), color: "#2A241C", background: BONE,
          padding: "6px 12px", borderRadius: 5, letterSpacing: "0.08em" }}>{R.setup}</span>
      </div>

      <Contact x={786 + L.c * 0.7} y={GY - 12} w={188} o={0.36} />
      <Hero f={f} x={874 + L.c * 0.7} y={GY} size={232} z={56} act={1} ph={1.2}
        drive={AT.reduce((a, at) => a + (E(f, at + 8, at + 13, 0, 1, IN_Q) -
          E(f, at + 13, at + 22, 0, 1, OUT)) * -0.32, 0)}
        costume={{ constr: 1 }} cheer={f > 62 ? 1 : 0} />
      <ForeMass side="l" kind="stand" c="#141118" z={90} s={0.95} />
      <HeroKey x={506 + L.b * 0.7} y={470} r={356} c="#FFF3D6" z={33} k={1.0} />
      <BandChip t={`${R.setup} TO SET UP · ALL THREE`} c={INK} />
      <Edge side="r" c="#1E1A14" w={104} z={93} kind="wall" />
    </Scene>
  );
};

/* ===========================================================================
   ⭐⭐⭐ REVISION 3 — DRAWN OBJECTS, AND A BODY DOING THE WORK.

   Alex on rev 2: *"each of the scenes are not good whatsoever, these scenes are
   just too much relying on shapes and the animations are not good, needs to be
   redone significantly, needs to be way better."*

   ⛔ IT IS COUNTABLE, AND HE IS EXACTLY RIGHT. Measured across `BuildProps.tsx`:
   **4 of 35 props used any inline <svg>; the other 31 are stacked divs**, at a
   median of SIX drawn elements each. Rev 2's "fix" for legibility was to put a
   real logo on a rounded rectangle — and a rounded rectangle with a logo on it
   is a STICKER. Nine stickers in a row is what he watched.

   `feedback_props_need_real_drawing`: reel 106 got this note verbatim and
   cleared it by taking ONE object from 4 elements to ~22.

   ⭐ THE SECOND HALF OF THE NOTE — *"the animations are not good"* — has the
   same root. A sticker cannot ACT. Once the props are real machines, the scene
   gets what §2 has always asked for: a before state, a visible trigger, travel,
   and an arrival that costs something, performed BY A BODY. Every tool scene
   below is now a Claude physically operating a machine you can name from its
   silhouette, and the mark is demoted from hero to the maker's plate bolted on
   the side — which is where a real workshop carries one.
   ========================================================================= */

/* =========================================================================
   T1 · THE FILM BENCH — 4.73 to 9.90s (155f) · ESCALATE 1
   VO: "First, Money Printer Turbo. Just type one word or topic and it writes a
        script, records the voiceover, and edits the final video"

   ONE LOCKED WIDE, three real machines, three Claudes, and the beats fire on
   the measured spoken words: a TYPEWRITER hammers out a script, a STUDIO MIC
   goes live, and a FILM STRIP starts running. Nothing here is invented — all
   three are nameable from their outline alone.
   ====================================================================== */
export const T1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("mill");
  const L = LAY[v];
  const drop = E(f, 10, 26, 0, 1, IN_Q);                 /* the word goes in  */
  const spin = E(f, 26, 74, 0, 1, IO);                   /* it SPINS UP first */
  const b1 = E(f, 78, 96, 0, 1, OUT);                    /* "writes a script" */
  const b2 = E(f, 100, 116, 0, 1, OUT);                  /* "the voiceover"   */
  const b3 = E(f, 123, 142, 0, 1, OUT);                  /* "the final video" */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.54}>
      {/* ⭐⭐⭐ THREE SHOTS, NOT ONE. 5.17s on a locked-off frame is why this
          scene "shows up and then nothing happens": the wide states the room in
          the first second and then has nowhere to go. It now cuts to a push on
          the typewriter as the script is struck, and again to the mic and the
          run as the piece is carried down the bench — the same staging, three
          pictures. */}
      <Shots f={f} shots={[
        { at: 0,   s: 1.00, x: 0,    y: 0,   drift: 0.06 },
        { at: 58,  s: 1.30, x: 142,  y: -30, drift: 0.05 },
        { at: 106, s: 1.22, x: -176, y: -18, drift: 0.07 },
      ]}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="joist"
        rake={0.11 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        lamp={{ x: 506 + L.a * 0.7, y: 258, r: 300 }} floorKind="boards" grit={0.7} />

      {/* ⭐ THE OVERHEAD FILM RUN — the third machine AND the highest-value
          shape in the motion table. It only STARTS on "edits the final video". */}
      {/* the run never stops — the shop is working before he gets there — and
          it ACCELERATES onto the beat rather than starting at it */}
      <FilmRun y={236} f={f} rate={1.5 + b3 * 6.2} s={0.86} z={26} />
      <div style={{ position: "absolute", left: -60, top: 228, width: W + 120, height: 8,
        zIndex: 27, background: dkh(p.lip, 0.1) }} />

      {/* the wall of cans — a film workshop stores what it makes, and this is
          what was bare brick through the middle of the frame */}
      <FilmShelf x={-20} y={452} w={1060} f={f} rows={1} z={18} />

      {/* ⭐⭐ COUNTABLE CONTENT: twelve FINISHED SHORTS racking up on the wall,
          one at a time, right across the scene. `feedback_the_crowd_is_a_near_
          band` — not texture, things a viewer could count, and "real content
          arriving" is the third row of the motion table. It is also literally
          what the mill makes, so it earns its place. */}
      <ContentWall x={62 + L.c * 0.5} y={296} w={912} rows={1} f={f}
        kind="thumb" c={GOLD} z={19} fromX={846 + L.b * 0.7} fromY={560} arc={230}
        cols={8} k={E(f, 8, 152, 0, 1, LIN)} />

      {/* the bench: a top lip and a front face, so it is a SOLID, not a bar */}
      <div style={{ position: "absolute", left: -40, top: 634, width: W + 80, height: 24,
        zIndex: 34, background: mxh(OXIDE, 0.16) }} />
      <div style={{ position: "absolute", left: -40, top: 658, width: W + 80, height: 64,
        zIndex: 34, background: `linear-gradient(180deg, ${dkh(OXIDE, 0.30)} 0%, ${dkh(OXIDE, 0.56)} 100%)` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"bg" + i} style={{ position: "absolute", left: -20 + i * 156, top: 664,
          width: 6, height: 56, zIndex: 35, background: hexa("#000", 0.20) }} />
      ))}

      {/* ⭐⭐⭐ THE PLUGIN THAT DRIVES THE MILL. It is the biggest and brightest
          thing in the shot, which is the whole point — the stations are what it
          DOES, not what the scene is about. It pulses on each finished beat. */}
      {/* ⛔⛔ IT HAS TO MOVE. The first seating put a 284px stone in the middle
          of the shot that only sparkled, and the reel LOST 0.4 of motion — my
          own `feedback_a_sway_is_not_motion` in reverse. It now rocks on its
          mount, rides up and down, and its halo breathes; the halo is a
          ~300x320 field, so pulsing it repaints far more than the stone does. */}
      <ToolObject x={700 + L.b * 0.7 + Math.sin(f / 15) * 22}
        y={556 + Math.sin(f / 11) * 20} s={1.42 + Math.sin(f / 9) * 0.07} i={0} f={f} z={66}
        rot={Math.sin(f / 13) * 11} label={false}
        glow={1.1 + Math.abs(Math.sin(f / 6.5)) * 0.9 + Math.max(b1, Math.max(b2, b3)) * 1.0}
        live={Math.max(b1, Math.max(b2, b3))} />
      {/* the bracket it hangs in, so it is MOUNTED and not floating */}
      <div style={{ position: "absolute", left: 686 + L.b * 0.7, top: 236, width: 28,
        height: 118, zIndex: 64, background: dkh(OXIDE, 0.5) }} />

      {/* ⭐⭐⭐ THE WORK PIECE — the thing that makes this a SCENE and not three
          machines idling near each other. *"the animations need to be way more
          interesting... not just the sprites bouncing around."*

          ONE object enters at the left as a word tile and you can follow it the
          whole way: it is typed into a script, carried to the mic and voiced,
          carried to the run and cut, and leaves as a finished short. It CHANGES
          FORM at each station, so the pipeline is legible without a caption,
          and it is travelling for most of the take, which is also where the
          motion comes from (`feedback_a_sway_is_not_motion`). */}
      {(() => {
        const X1 = 196 + L.b * 0.7, X2 = 540 + L.b * 0.7, X3 = 846 + L.b * 0.7;
        const inn = E(f, 6, 26, 0, 1, IO);            /* drops onto the bench  */
        const t1 = E(f, 74, 98, 0, 1, IO);            /* carried to the mic    */
        const t2 = E(f, 120, 142, 0, 1, IO);          /* carried to the run    */
        const out = E(f, 146, 155, 0, 1, IN_Q);       /* leaves, still rising  */
        const px = X1 - (1 - inn) * 90 + (X2 - X1) * t1 + (X3 - X2) * t2;
        const py = 566 - (1 - inn) * 250
          - Math.sin(t1 * Math.PI) * 66 - Math.sin(t2 * Math.PI) * 66 - out * 210;
        /* the form it is IN right now — 0 word · 1 script · 2 voiced · 3 cut */
        const form = f > 138 ? 3 : f > 108 ? 2 : f > 62 ? 1 : 0;
        /* every transformation POPS, so you cannot miss that it changed */
        const pop = 1 + Math.max(0, 1 - Math.abs(f - 62) / 7) * 0.30
          + Math.max(0, 1 - Math.abs(f - 108) / 7) * 0.30
          + Math.max(0, 1 - Math.abs(f - 138) / 7) * 0.34;
        const W = 118, H = 78;
        return (
          <div style={{ position: "absolute", left: px - W / 2, top: py - H, width: W, height: H,
            zIndex: 68, opacity: 1 - out * 0.85,
            transform: `scale(${pop}) rotate(${-6 + t1 * 6 + t2 * 6 + out * 16}deg)`,
            transformOrigin: "50% 100%" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: 5,
              border: "5px solid #2A241C", overflow: "hidden",
              background: form >= 3 ? "#14181E"
                : "linear-gradient(174deg,#F8F2E2,#CFC4A8)" }}>
              {form === 0 ? (
                <div style={{ position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  ...mono(19, 900), color: "#2A241C" }}>{R.tools[0].input}</div>
              ) : null}
              {form === 1 || form === 2 ? (
                <>
                  {Array.from({ length: 5 }, (_, k) => (
                    <div key={"tl" + k} style={{ position: "absolute", left: 10, top: 11 + k * 10,
                      height: 4, width: (k % 2 ? 78 : 92), background: hexa("#2A241C", 0.55) }} />
                  ))}
                </>
              ) : null}
              {form === 2 ? (
                <div style={{ position: "absolute", left: 8, right: 8, bottom: 8, height: 20,
                  display: "flex", alignItems: "flex-end", gap: 3 }}>
                  {Array.from({ length: 13 }, (_, k) => (
                    <div key={"wb" + k} style={{ flex: 1, background: GOLD,
                      height: 4 + Math.abs(Math.sin(k * 1.6 + f / 3.4)) * 16 }} />
                  ))}
                </div>
              ) : null}
              {form === 3 ? (
                <>
                  <div style={{ position: "absolute", inset: 0,
                    background: `linear-gradient(150deg, ${hexa(GOLD, 0.5)}, ${hexa("#7A4A18", 0.7)})` }} />
                  <div style={{ position: "absolute", left: 46, top: 24, width: 0, height: 0,
                    borderTop: "13px solid transparent", borderBottom: "13px solid transparent",
                    borderLeft: "22px solid #FFF6E4" }} />
                  <div style={{ position: "absolute", left: 8, right: 8, bottom: 7, height: 5,
                    background: hexa("#000", 0.5) }} />
                  <div style={{ position: "absolute", left: 8, bottom: 7, height: 5,
                    width: `${20 + ((f * 3) % 70)}%`, background: "#FFF6E4" }} />
                </>
              ) : null}
            </div>
          </div>
        );
      })()}

      {/* the in-feed chute the word arrives down — it comes from somewhere */}
      <div style={{ position: "absolute", left: 86 + L.b * 0.7, top: 286, width: 82, height: 34,
        zIndex: 42, background: dkh(OXIDE, 0.42), transform: "skewX(-16deg)" }} />

      {/* ---- station 1 · THE TYPEWRITER ------------------------------------ */}
      <Typewriter x={196 + L.b * 0.7} y={640} s={0.94} f={f}
        hit={Math.max(spin * 0.55, b1)} page={b1} z={44} />
      {/* ⛔ the old standalone word tile is GONE — it is now the work piece's
          first FORM, and having both put two "1 WORD" tiles on screen at once. */}
      {/* ---- station 2 · THE STUDIO MIC ------------------------------------ */}
      <StudioMic x={540 + L.b * 0.7} y={644} s={0.76} f={f} live={b2} z={44} />
      {/* ---- station 3 · the film coming DOWN off the overhead run --------- */}
      {b3 > 0 && (
        <div style={{ position: "absolute", left: 846 + L.b * 0.7, top: 330, width: 78,
          height: 306 * b3, zIndex: 44, overflow: "hidden" }}>
          <FilmRun y={0} f={f * 1.4} rate={6.0} s={0.62} z={58} w={80} />
        </div>
      )}

      {/* ⭐⭐ ONE CLAUDE, WALKING THE BENCH. He is at the typewriter for the
          script, crosses to the mic for the voiceover, and crosses again to the
          film for the cut — so the beats are joined by TRAVEL rather than by a
          cut, and the biggest object in frame is moving through the stretches
          the old staging left dead. */}
      {(() => {
        const walk = E(f, 88, 104, 0, 1, IO) * 0.5 + E(f, 110, 128, 0, 1, IO) * 0.5;
        const hx = 300 + walk * 560;
        const working = (b1 > 0 && b1 < 1) || (b2 > 0 && b2 < 1) || (b3 > 0 && b3 < 1);
        const striding = (f > 88 && f < 104) || (f > 110 && f < 128);
        return (
          <>
            <Contact x={hx - 96} y={GY - 12} w={192} o={0.34} z={52} />
            <Hero f={f} x={hx} y={GY} size={228} z={62} act={striding ? 0 : 1} ph={0.4}
              drive={working && !striding ? Math.sin(f / 2.6) * 0.24 : 0}
              strain={working && !striding ? 0.38 : 0}
              costume={{ chef: 1 }}
              cheer={b3 >= 1 ? 1 : 0} gaze={striding ? 0.8 : -0.3} />
          </>
        );
      })()}

      {/* the maker's plate, bolted to the bench end where a real one lives */}
      <EnamelSign x={112 + L.c * 0.7} y={392} i={0} s={1.0} z={74} on={E(f, 20, 34, 0, 1, OUT)} />

      {/* ⭐⭐⭐ THE NEAR-CAMERA BAND — the mill's own CUTTING-ROOM CREW, working
          the bench in front of camera with their legs cropped by the panel.
          Five sprites at ~180px on their own loops is ~18% of the panel
          repainting every frame, which is the single biggest lever in the
          motion table; one Claude walking a bench was 6.41. They sit BELOW the
          three machines so nothing the scene is about is covered. */}
      <NearBand f={f} n={5} y={858} size={216} pitch={230} x0={-58} z={84}
        at={4} seed={1} dx={L.a * 0.9} />

      {/* ⭐⭐⭐ THE KEY TRAVELS TO WHATEVER IS WORKING. "Main focus not
          interesting" is a HIERARCHY note: this scene had three stations at the
          same brightness, so at any instant the eye had three equal candidates
          and no first place. The pool now moves typewriter -> mic -> film run,
          arriving on each beat, so there is exactly one subject at a time and
          the shot TELLS you which. */}
      {(() => {
        const kx = 210 + E(f, 92, 108, 0, 330, IO) + E(f, 114, 132, 0, 306, IO);
        const ky = 596 - E(f, 114, 132, 0, 150, IO);
        const pk = 0.72 + Math.max(b1, Math.max(b2, b3)) * 0.5;
        return <HeroKey x={kx + L.b * 0.7} y={ky} r={300} c="#FFE7B0" z={33} k={pk} />;
      })()}
      <NearShade top={604} z={88} k={0.60} />

      </Shots>
      <BandChip t="ONE TOPIC · A FINISHED VIDEO" c={INK} />
      <Edge side="r" c="#1C1308" w={92} z={93} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   T2 · THE BOOTH — 11.19 to 16.23s (151f) · ESCALATE 2
   VO: "Second, GPT SoVITS. One minute of your voice is enough to clone it, so
        sell narration services on Fiverr and Upwork"

   ⭐⭐ THE CLONE IS DRAWN AS CLAUDES, NOT AS SPEAKER BOXES. The thing being
   copied is his voice, so what appears is HIM — four more of him, popping in
   one at a time, all singing. Rev 2 drew a rank of rectangles for this and that
   is exactly the note.
   ====================================================================== */
export const T2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("booth");
  const L = LAY[v];
  const step = E(f, 0, 20, 0, 1, IO);                    /* he walks up to it */
  const sing = E(f, 22, 40, 0, 1, OUT);
  const run = E(f, 30, 60, 0, 1, IO);
  /* ⛔ THE TAIL WENT STILL AT THE FRONT. All three copies used to land inside a
     28-frame window at f76-104, leaving the first HALF of a 151-frame scene
     with one hero and nothing else — which is most of why this scene measured
     6.02. Spread across the whole take (`feedback_the_tail_goes_still`). */
  const POPS = [30, 66, 102];
  const mkt = E(f, 118, 138, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.54}>
      {/* three shots: the room, then in on the mic and the cable carrying his
          voice across, then back out as the copies arrive */}
      <Shots f={f} shots={[
        { at: 0,   s: 1.00, x: 0,    y: 0,   drift: 0.06 },
        { at: 50,  s: 1.32, x: 168,  y: -24, drift: 0.05 },
        { at: 100, s: 0.98, x: -10, y: 14, drift: 0.05 },
      ]}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="duct"
        rake={0.12 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.2} rakeN={RAKE_N[v]}
        lamp={null} floorKind="boards" grit={0.7} />

      {/* the acoustic wall — real foam wedges, the booth's own texture */}
      <div style={{ position: "absolute", left: -40, top: 214, width: W + 80, height: 300,
        zIndex: 14, overflow: "hidden" }}>
        {Array.from({ length: 44 }, (_, i) => (
          <div key={"fm" + i} style={{ position: "absolute", left: (i % 11) * 100,
            top: Math.floor(i / 11) * 76, width: 96, height: 72,
            background: (i + Math.floor(i / 11)) % 2 ? dkh(VIOLET, 0.52) : dkh(VIOLET, 0.68),
            clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        ))}
      </div>

      {/* ⭐ THE LIVE READOUT — large, continuous, and the one thing a booth
          actually has on its wall. This is the mover; the rings were not. */}
      <WaveWall x={286 + L.b * 0.7} y={286} w={660} h={128} f={f}
        live={0.3 + sing * 0.7} z={22} />

      {/* ⭐⭐ COUNTABLE CONTENT: the rack of TAKES filling up, each card with its
          own live waveform and its own number. The flat foam wall was texture;
          this is countable, and it is what "unlimited takes" actually looks
          like on a booth wall. */}
      {/* ⛔ THE FOAM WEDGES WERE 38% OF THE PANEL DOING NOTHING — texture, which
          is exactly what `feedback_the_crowd_is_a_near_band` says does not
          count. Sixteen takes now rack up over it, each flying out of the mic
          he is singing into. */}
      <ContentWall x={128 + L.c * 0.5} y={286} w={832} rows={2} f={f}
        kind="take" c={VIOLET} z={23} fromX={176 + L.b * 0.7} fromY={620} arc={150}
        cols={8} k={E(f, 10, 96, 0, 1, LIN)}
        outX={250 + L.c * 0.5} outY={384} outX2={250 + L.c * 0.5} outY2={384}
        out={E(f, 92, 116, 0, 1, LIN)} />

      {/* ⭐⭐⭐ THE PLUGIN DOING THE CLONING — big, lit, and pulsing with the
          note he is holding. It occludes the takes wall on purpose: the hero is
          in FRONT of its supporting layer, which is what hierarchy means. */}
      <ToolObject x={676 + L.b * 0.7 + Math.sin(f / 14) * 24}
        y={566 + Math.sin(f / 10) * 22} s={1.38 + Math.sin(f / 8) * 0.08} i={1} f={f} z={66}
        rot={Math.sin(f / 12) * 12} label={false}
        glow={1.0 + Math.abs(Math.sin(f / 5.8)) * 1.0 + sing * 1.0} live={sing * 0.8} />

      {/* ⭐⭐⭐ THE VOICE MAKES A JOURNEY. Before this the scene was: he sings,
          and separately some copies appear. Nothing connected the two, so there
          was no mechanism to watch. A cable now runs from his mic to the tool,
          PULSES travel down it while he holds the note, and each pulse that
          arrives is what births the next copy. Cause, then effect, visibly. */}
      {(() => {
        /* ⛔ RUN IT ABOVE THE SHADE LINE. The first path sagged to y=692 —
           inside `NearShade`, which starts at 620 — so the cable and every
           pulse on it were drawn and then darkened into nothing. */
        const AX = 206 + L.b * 0.7, AY = 534, BX = 676 + L.b * 0.7, BY = 560;
        return (
          <>
            {/* the cable itself, with a real sag */}
            <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, zIndex: 55,
              pointerEvents: "none" }}>
              <path d={`M${AX} ${AY} Q${(AX + BX) / 2} ${AY + 62} ${BX} ${BY}`}
                fill="none" stroke="#1B1526" strokeWidth="11" strokeLinecap="round" />
              <path d={`M${AX} ${AY} Q${(AX + BX) / 2} ${AY + 62} ${BX} ${BY}`}
                fill="none" stroke={hexa("#D8BEFF", 0.44)} strokeWidth="4" />
            </svg>
            {/* the pulses running along it — one per copy, and they ARRIVE just
                before the copy they cause */}
            {sing > 0.2 && Array.from({ length: 5 }, (_, k) => {
              const tt = ((f / 30) + k * 0.2) % 1;
              const qx = AX + (BX - AX) * tt;
              const qy = AY + (BY - AY) * tt + Math.sin(tt * Math.PI) * 62;
              return (
                <React.Fragment key={"pl" + k}>
                  <div style={{ position: "absolute", left: qx - 26, top: qy - 26,
                    width: 52, height: 52, borderRadius: "50%", zIndex: 56,
                    background: `radial-gradient(circle, ${hexa("#D8BEFF", 0.55)} 0%, ${hexa("#D8BEFF", 0)} 70%)`,
                    opacity: 0.4 + Math.sin(tt * Math.PI) * 0.6 }} />
                  <div style={{ position: "absolute", left: qx - 15, top: qy - 15,
                    width: 30, height: 30, borderRadius: "50%", zIndex: 57,
                    background: "#F6EEFF", border: "4px solid #7B5AB8",
                    opacity: 0.42 + Math.sin(tt * Math.PI) * 0.58 }} />
                </React.Fragment>
              );
            })}
          </>
        );
      })()}

      {/* ⭐ THE MIC HE SINGS INTO — the object the whole scene is about */}
      <StudioMic x={176 + L.b * 0.7} y={672} s={0.92} f={f} live={sing} z={64} />
      {/* the tape deck consuming the minute, beside him */}
      <TapeDeck x={772 + L.b * 0.7} y={470} s={0.74} f={f} run={run} z={40} />

      {/* the hero, singing — his own beat, before any copy exists */}
      <Contact x={94 + step * 128 + L.a * 0.7} y={GY - 12} w={214} o={0.36} z={50} />
      <Hero f={f} x={190 + step * 128 + L.a * 0.7} y={GY} size={244} z={58} act={3} ph={0.6}
        drive={sing > 0.4 ? Math.sin(f / 4.4) * 0.10 : 0}
        costume={{ suit: 1 }} gaze={-0.8}
        cheer={sing > 0.6 ? 1 : 0} />

      {/* ⭐⭐ THE CLONES. Four of HIM, each snapped into being by its own ring,
          each singing the same note on its own phase. */}
      {POPS.map((at, i) => {
        const k = E(f, at, at + 12, 0, 1, BACK);
        const cx = 512 + i * 178 + L.c * 0.7;
        /* ⭐ THE CHARGE: the floor ring under the empty spot brightens for ten
           frames BEFORE the copy lands, so the shot promises each one */
        const charge = E(f, at - 12, at, 0, 1, IO);
        return (
          <React.Fragment key={"cl" + i}>
            {charge > 0 && k <= 0 && (
              <div style={{ position: "absolute", left: cx - 92, top: GY - 30, width: 184,
                height: 52, zIndex: 50, borderRadius: "50%",
                border: `${3 + charge * 5}px solid ${hexa("#D8BEFF", charge * 0.7)}`,
                transform: `scale(${0.6 + charge * 0.4})` }} />
            )}
            <ClonePop x={cx} y={GY - 10} f={f} at={at} s={1.15} z={52} />
            {k > 0 && <Contact x={cx - 96} y={GY - 12} w={192} o={0.30 * k} z={51} />}
            {/* ⭐⭐ THEY BOB ON THEIR OWN PHASE. Three 244px heroes holding an
                idle is ~22% of the panel very nearly static, and an idle is not
                an action loop (`feedback_action_loop_is_not_a_scene`). A 52px
                peak-to-peak bob per copy, each on its own phase, is also just
                what singing looks like. */}
            {k > 0 && <div style={{ position: "absolute", left: 0, top: 0, zIndex: 56,
              opacity: k,
              transform: `translateY(${Math.sin(f / 5.2 + i * 2.1) * 26 * k}px) scale(${0.7 + k * 0.3})`,
              transformOrigin: `${cx}px ${GY}px` }}>
              <Hero f={f + i * 11} x={cx} y={GY} size={244} z={56} act={3} ph={i * 0.9}
                costume={{ suit: 1 }} cheer={1} gaze={-0.6} />
            </div>}
          </React.Fragment>
        );
      })}

      {/* ⛔ the 58px mark chips that used to sit here are GONE. The dispatch
          slots now carry both marks at 160px, and saying the same two things
          again in the same frame is the clutter note. */}

      <EnamelSign x={116 + L.a * 0.7} y={258} i={1} s={1.0} z={74} on={E(f, 12, 26, 0, 1, OUT)} />
      {/* ⭐⭐⭐ THE NEAR-CAMERA BAND — the booth's QUEUE, the people waiting for a
          slot, cropped by the bottom edge. It sits just below the clones' feet
          so the pop-ins stay the money shot, and it fills the dead purple floor
          that was the bottom third of every frame in this scene. */}
      <NearBand f={f} n={5} y={876} size={196} pitch={226} x0={-46} z={86}
        at={10} seed={3} dx={L.b * 0.9} />

      {/* the key starts tight on the mic he is singing into and OPENS OUT as
          the copies arrive — the subject genuinely changes, so the light does */}
      <HeroKey x={190 + E(f, 26, 96, 0, 430, IO) + L.a * 0.7} y={600}
        r={250 + E(f, 26, 110, 0, 190, IO)} c="#E2CCFF" z={33}
        k={0.8 + sing * 0.4} />
      <NearShade top={620} z={88} k={0.56} />

      </Shots>
      {/* ⭐⭐⭐ THE THIRD ACT, REDONE — AND DELIBERATELY NOT ABOUT MARKETPLACES.
          Second rejection on this beat, so per `feedback_repeated_note_means_
          wrong_object` the fault is the SUBJECT, not the execution. And it was:
          the words at 16s are "on Fiverr and Upwork", so I illustrated the
          NOUNS — twice, first as chips and then as dispatch slots.

          ⛔⛔ COUNTED ACROSS THE REEL, THAT MADE IT THE **FOURTH** TIME IN 30
          SECONDS THE PICTURE WAS "GOODS GOING TO TWO MARKETPLACE LOGOS":
          the hook's payoff, SALE_A's sold docket, this, and SALE_B's orders.
          `feedback_one_prop_five_scenes` — one idea in four scenes is four
          boring notes. The marketplaces are ALREADY covered three times; this
          scene has to carry the half of the claim nothing else does.

          ⭐ That half is the SCALE GAP: **one minute in, and it never stops
          coming out.** The band chip has said "1 MIN OF AUDIO · UNLIMITED
          TAKES" the whole scene and no picture had ever shown it. One tiny
          source block feeds a waveform that GROWS as it travels and pours off
          the right edge of frame still going — so the beat also does not
          resolve, which is what "unlimited" means. */}
      {(() => {
        const pour = E(f, 108, 130, 0, 1, OUT);     /* the output opens up   */
        const SX = 214 + L.c * 0.5, SY = 384;       /* the one-minute source */
        const N = 30;
        return (
          <>
            {/* ⭐ THE SOURCE — small, finite, and labelled with the real input */}
            <div style={{ position: "absolute", left: SX - 60, top: SY - 42, width: 120,
              height: 84, zIndex: 66, borderRadius: 7,
              background: `linear-gradient(176deg, ${mxh(VIOLET, 0.26)}, ${dkh(VIOLET, 0.5)})`,
              border: "6px solid rgba(0,0,0,0.55)", opacity: Math.min(1, pour * 3) }}>
              <div style={{ position: "absolute", left: 9, right: 9, top: 12, height: 34,
                display: "flex", alignItems: "center", gap: 3 }}>
                {/* ⭐⭐⭐ THE PUNCH — the minute RUNS OUT. At f132 the source
                    flatlines and the output goes on growing anyway, which is
                    the claim in one image: the input stopped, you stopped, and
                    it is still producing. */}
                {Array.from({ length: 9 }, (_, k) => {
                  const spent = E(f, 126, 136, 0, 1, IO);
                  return (
                    <div key={"sw" + k} style={{ flex: 1, borderRadius: 1,
                      background: hexa("#F0E4FF", 0.9 - spent * 0.35),
                      height: (6 + Math.abs(Math.sin(k * 1.7 + f / 4)) * 24) * (1 - spent) + spent * 3 }} />
                  );
                })}
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 8,
                textAlign: "center", ...mono(19, 900),
                color: hexa("#F0E4FF", 0.95 - E(f, 126, 136, 0, 1, IO) * 0.45) }}>
                {R.tools[1].input}</div>
              {/* the flatline it leaves behind */}
              {E(f, 126, 136, 0, 1, IO) > 0.2 && (
                <div style={{ position: "absolute", left: 9, right: 9, top: 27, height: 3,
                  background: hexa("#F0E4FF", 0.8) }} />
              )}
            </div>

            {/* ⭐⭐⭐ AND WHAT COMES OUT — a waveform that GROWS as it travels and
                runs off the right edge of frame still going. The bars are live,
                so the whole ribbon repaints every frame. */}
            {Array.from({ length: N }, (_, k) => {
              const t = k / (N - 1);
              const bx = SX + 66 + t * 900;
              if (bx > 1080) return null;
              /* ⭐ THE GAP IS THE IMAGE: ~22px of bar at the source against ~270px
                 by the frame edge, so the ratio reads without a caption. */
              const grow = pour * (0.10 + t * t * 2.1);
              /* ⛔ the first build had the NOISE bigger than the ENVELOPE, so
                 neighbouring bars jumped around and the growth was masked.
                 The envelope now carries it and the noise only textures it. */
              const h = grow * (132 + Math.abs(Math.sin(k * 0.9 + f / 3.1)) * 58);
              const w = 11 + t * 21;
              return (
                <div key={"pw" + k} style={{ position: "absolute", left: bx, top: SY - h / 2,
                  width: w, height: h, zIndex: 64, borderRadius: 4,
                  background: `linear-gradient(180deg, ${hexa("#F0E4FF", 0.95)} 0%, ${hexa("#B79BE8", 0.9)} 100%)`,
                  border: "3px solid rgba(20,10,34,0.5)" }} />
              );
            })}
            {/* the trough it pours along, so it is a CHANNEL and not floating */}
            <div style={{ position: "absolute", left: SX + 56, top: SY + 160, width: 940,
              height: 12, zIndex: 74, opacity: pour,
              background: `linear-gradient(90deg, ${dkh(VIOLET, 0.5)} 0%, ${dkh(VIOLET, 0.2)} 100%)` }} />

            {/* the key follows the output, so the ribbon is unambiguously first */}
            <HeroKey x={SX + 470} y={SY} r={400} c="#E8D8FF" z={63} k={pour * 1.1} />

            {/* the count of finished takes — it only counts what is on screen */}
            {pour > 0.4 && (
              <div style={{ position: "absolute", left: 716 + L.c * 0.5, top: 226, zIndex: 88,
                padding: "8px 18px", borderRadius: 7, background: "#15171C",
                border: `4px solid ${hexa(VIOLET, 0.9)}`,
                ...mono(30, 900), color: "#F0E4FF", letterSpacing: 2 }}>
                {`+${String(Math.floor((f - 96) * 2.4)).padStart(3, "0")}`}
              </div>
            )}
          </>
        );
      })()}

      <BandChip t={`${R.tools[1].input} OF AUDIO · UNLIMITED TAKES`} c={INK} />
      <Edge side="r" c="#150F24" w={92} z={93} kind="rail" />
    </Scene>
  );
};

/* =========================================================================
   T3 · THE STUDIO — 17.71 to 22.61s (147f) · ESCALATE 3
   VO: "Third, Hunyuan 3D. It turns one flat photo into a real 3D model you can
        spin, light, and reuse."

   ⭐⭐⭐ A CHAIR IS NAMEABLE BY ANYONE FROM ITS OUTLINE, which is the entire
   reason this beat reads: the viewer sees a FLAT paper cut-out of a chair
   become a SOLID chair with a seat top, a side face and four legs. No caption
   is doing that work. It is also the reel's one curved-silhouette object among
   a world of rectangles.
   ====================================================================== */
export const T3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("turn");
  const L = LAY[v];
  /* ⛔ THE SCENE OPENED ON EIGHT DEAD FRAMES — `min 1.69`, the lowest in the
     reel. `feedback_frame0_preseed_needs_z`: open mid-event, not on a still. */
  const carry = E(f, 0, 30, 0, 1, IO);        /* he carries the print in     */
  const scan = E(f, 34, 54, 0, 1, IO);        /* the head crosses it FIRST   */
  const solid = E(f, 52, 78, 0, 1, OUT);      /* "into a REAL 3D model"      */
  const spin = E(f, 56, 147, 0, 1, LIN);      /* it turns from the moment it exists */
  /* ⛔⛔ THE LIGHT BEAT WAS FIRING A SECOND BEFORE ITS OWN WORD. Measured
     onsets against this scene's start (f531): **"spin," 21.35s = local 120 ·
     "light," 21.81s = local 133 · "reuse." 22.00s = local 139.** The lamps ran
     at local 96-114, i.e. 20.9-21.5s — struck, and settled, before the word
     arrived. Anticipation now lives in the RIG MOVING (from 112) and the strike
     lands ON the word. */
  const rig = E(f, 112, 132, 0, 1, IO);       /* the heads swing into place  */
  const lamps = E(f, 131, 140, 0, 1, IN_Q);   /* "LIGHT" — they STRIKE       */
  const reuse = E(f, 139, 147, 0, 1, OUT);    /* "and REUSE"                 */
  const push = (E(f, 84, 92, 0, 1, IN_Q) - E(f, 92, 108, 0, 1, OUT)) * 0.34;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.48}>
      {/* three shots: the shop, a CLOSE on the turntable while the mesh builds
          itself, then out to the lamps and the copies racking up */}
      <Shots f={f} shots={[
        { at: 0,  s: 1.00, x: 0,   y: 0,   drift: 0.06 },
        { at: 48, s: 1.46, x: -46, y: -70, drift: 0.05 },
        { at: 98, s: 1.14, x: -60, y: -18, drift: 0.07 },
      ]}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="shelf" overhead="lampbar"
        rake={0.10 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={4.8} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.6} />

      {/* three real lamps on the rig, striking in an ascending run */}
      {/* ⭐⭐⭐ REAL STUDIO LIGHTS.  *"when it talks about light, show a real
          light."*  What was here was three 72x46 boxes with a faint cone — a
          shape that means "lamp" only if you already know. These are fresnel
          heads: a lens face with its rings, four BARN DOORS, a yoke, a tilt
          knob and a cable, mounted on the rig — and they SWING INTO POSITION
          first and STRIKE on the word, so the movement promises the strike
          (`feedback_predictable_is_not_anticipation`). */}
      {[-232, 6, 244].map((dx, i) => {
        const on = Math.max(0, Math.min(1, lamps * 3.4 - i * 0.7));
        const LX = 552 + dx + L.b * 0.7;
        const tilt = -46 + rig * 46 + i * 2;          /* the heads come down */
        const flare = Math.max(0, 1 - Math.abs(lamps * 3.4 - i * 0.7 - 1) * 3);
        return (
          <React.Fragment key={"lm" + i}>
            {/* the yoke it hangs in, and the bar it is clamped to */}
            <div style={{ position: "absolute", left: LX - 6, top: 196, width: 12, height: 44,
              zIndex: 29, background: dkh(STEEL, 0.55) }} />
            <div style={{ position: "absolute", left: LX - 62, top: 236, width: 124, height: 116,
              zIndex: 31, transformOrigin: "50% 8%",
              transform: `rotate(${tilt * 0.34}deg)` }}>
              <svg width="124" height="116" viewBox="0 0 124 116" style={{ overflow: "visible" }}>
                {/* the yoke arms */}
                <path d="M14 6 L14 52 M110 6 L110 52" stroke={dkh(STEEL, 0.5)} strokeWidth="9" />
                <circle cx="14" cy="52" r="9" fill={mxh(STEEL, 0.2)} stroke="#15171C" strokeWidth="4" />
                <circle cx="110" cy="52" r="9" fill={mxh(STEEL, 0.2)} stroke="#15171C" strokeWidth="4" />
                {/* the body */}
                <rect x="22" y="24" width="80" height="62" rx="7"
                  fill="url(#lampbody)" stroke="#15171C" strokeWidth="6" />
                <defs><linearGradient id="lampbody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8E8672" /><stop offset="1" stopColor="#2E2A22" />
                </linearGradient></defs>
                {/* ⭐ THE BARN DOORS — the thing that makes it read as a LAMP */}
                <path d="M18 86 L2 108 L40 108 Z" fill="#22201C" stroke="#15171C" strokeWidth="4" />
                <path d="M106 86 L122 108 L84 108 Z" fill="#22201C" stroke="#15171C" strokeWidth="4" />
                <rect x="16" y="82" width="92" height="12" rx="3" fill="#3A362E"
                  stroke="#15171C" strokeWidth="4" />
                {/* the lens, with its fresnel rings, going HOT on the strike */}
                <ellipse cx="62" cy="86" rx="34" ry="12"
                  fill={mxh("#FFF3D6", 0.06 + on * 0.9)} stroke="#15171C" strokeWidth="4" />
                {[24, 16, 8].map((r, q) => (
                  <ellipse key={"fr" + q} cx="62" cy="86" rx={r} ry={r * 0.36} fill="none"
                    stroke={hexa("#FFFFFF", 0.18 + on * 0.4)} strokeWidth="2.5" />
                ))}
                {/* the tilt knob and the cable that make it real kit */}
                <circle cx="110" cy="52" r="5" fill="#C9A15A" />
                <path d="M62 24 Q68 4 88 2" fill="none" stroke="#1A1814" strokeWidth="6" />
              </svg>
            </div>
            {/* ⭐ THE BEAM — a hard cone that reaches the turntable, plus the
                flare at the lens on the frame it fires */}
            {on > 0 && (
              <>
                <div style={{ position: "absolute", left: LX - 210, top: 336, width: 420, height: 400,
                  zIndex: 42, opacity: on * 0.66,
                  clipPath: "polygon(43% 0, 57% 0, 100% 100%, 0 100%)",
                  background: `linear-gradient(180deg, ${hexa("#FFF3D6", 0.95)} 0%, ${hexa("#FFF3D6", 0)} 100%)` }} />
                <div style={{ position: "absolute", left: LX - 86, top: 288, width: 172, height: 172,
                  zIndex: 43, borderRadius: "50%", opacity: on,
                  background: `radial-gradient(circle, ${hexa("#FFF8E4", 0.85)} 0%, ${hexa("#FFF8E4", 0)} 70%)` }} />
              </>
            )}
            {flare > 0.05 && (
              <div style={{ position: "absolute", left: LX - 190, top: 210, width: 380, height: 380,
                zIndex: 44, borderRadius: "50%", opacity: flare,
                background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.9)} 0%, ${hexa("#FFF3D6", 0.4)} 30%, ${hexa("#FFF3D6", 0)} 68%)` }} />
            )}
          </React.Fragment>
        );
      })}

      {/* the whole set lifts as three heads strike — motivated by the lamps
          themselves, so it is a light coming on and not a flash transition
          (`feedback_no_flashing_transitions`) */}
      {lamps > 0 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 45, pointerEvents: "none",
          opacity: lamps * 0.22, mixBlendMode: "screen",
          background: `radial-gradient(120% 90% at 50% 34%, ${hexa("#FFF3D6", 0.9)} 0%, ${hexa("#FFF3D6", 0)} 74%)` }} />
      )}

      {/* ⭐ AND THE MODEL HAS TO ANSWER THE LIGHT — a hard cast shadow on the
          turntable that only exists once the lamps are on. A light that does
          not change what it falls on is a prop, not a light. */}
      {lamps > 0 && (
        <div style={{ position: "absolute", left: 556 + L.b * 0.7 - 200, top: 690, width: 400,
          height: 54, zIndex: 41, opacity: lamps * 0.5, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${hexa("#0A1A20", 0.85)} 0%, ${hexa("#0A1A20", 0)} 72%)`,
          transform: `translateX(${Math.sin(spin * 6.2) * 26}px)` }} />
      )}

      {/* ⭐⭐ COUNTABLE CONTENT: the rack of FINISHED MODELS, each on its own
          mini turntable at its own angle. This wall was BLANK TEAL — the worst
          offender on the contact sheet and the reason T3 scored 5.48, the
          lowest scene in the reel. A 3D shop stores what it has made. */}
      <ContentWall x={72 + L.c * 0.5} y={312} w={880} rows={1} f={f}
        kind="model" c={TEAL} z={19} fromX={556 + L.b * 0.7} fromY={600} arc={220}
        cols={8} k={E(f, 0, 144, 0, 1, LIN)} />

      <Plinth x={556 + L.b * 0.7} y={690} s={1.12} f={f}
        spin={spin + PJ[v] * 0.17} z={40} />
      {/* ⭐ THE OBJECT: a flat print of a chair that BECOMES a chair */}
      {/* ⭐⭐ IT DOLLIES IN WHILE IT TURNS. A 90-frame spin on the spot is an
          ACTION LOOP, not a scene — `feedback_motion_needs_a_destination`. The
          chair now GROWS and RISES the whole time it is turning, so the biggest
          bright object in frame is repainting every frame instead of rotating
          inside its own outline. */}
      {/* ⭐⭐ THE OBJECT IS THE HERO HERE, SO IT IS SIZED LIKE ONE. It was 1.30
          and read at the same weight as the rack behind it and the crowd in
          front — three equal candidates and no first place. */}
      <Chair x={556 + L.b * 0.7 - (1 - carry) * 320}
        y={672 - (1 - carry) * 40 - spin * 64}
        s={1.62 + spin * 0.40} solid={solid} spin={spin + PJ[v] * 0.17}
        lit={0.22 + lamps * 0.72} z={70} />
      {/* ⭐ the plugin doing the scanning — the SOURCE, deliberately smaller
          than the thing it makes, so the two do not fight for first place */}
      <ToolObject x={198 + L.a * 0.7 + Math.sin(f / 16) * 18}
        y={520 + Math.sin(f / 12) * 18} s={0.94 + Math.sin(f / 9) * 0.06} i={2} f={f} z={64}
        rot={Math.sin(f / 14) * 10} label={false}
        glow={0.9 + Math.abs(Math.sin(f / 6)) * 0.9 + scan * 1.1} live={scan} />

      {/* ⭐⭐⭐ THE MESH BUILDS BEFORE IT SOLIDIFIES. The scene used to go flat
          print -> solid chair with nothing in between, so the one interesting
          part of the claim — that a photo becomes GEOMETRY — happened off
          screen. A wireframe cage now assembles edge by edge over the print,
          vertex by vertex, and only then fills in. */}
      {(() => {
        const wire = E(f, 40, 74, 0, 1, IO);
        if (wire <= 0 || solid >= 1) return null;
        const CX = 556 + L.b * 0.7, CY = 520;
        const N = 14;
        const pts = Array.from({ length: N }, (_, k) => {
          const th = (k / N) * Math.PI * 2 + spin * 2.2;
          const rr = 118 + (k % 3) * 26;
          return [CX + Math.cos(th) * rr, CY + Math.sin(th) * rr * 0.62 - (k % 4) * 22];
        });
        const shown = Math.floor(wire * N);
        return (
          <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0, zIndex: 72,
            pointerEvents: "none", opacity: 1 - solid * 0.9 }}>
            {pts.slice(0, shown).map((q, k) => {
              const nx = pts[(k + 1) % N], mx = pts[(k + 5) % N];
              return (
                <React.Fragment key={"wf" + k}>
                  <line x1={q[0]} y1={q[1]} x2={nx[0]} y2={nx[1]}
                    stroke="#0A2026" strokeWidth="7" />
                  <line x1={q[0]} y1={q[1]} x2={nx[0]} y2={nx[1]}
                    stroke="#EAFBFF" strokeWidth="4" />
                  {k % 2 === 0 && (
                    <line x1={q[0]} y1={q[1]} x2={mx[0]} y2={mx[1]}
                      stroke={hexa("#BFE8F0", 0.4)} strokeWidth="2" />
                  )}
                  <circle cx={q[0]} cy={q[1]} r="7.5" fill="#EAFBFF" stroke="#0A2026" strokeWidth="3" />
                </React.Fragment>
              );
            })}
          </svg>
        );
      })()}

      {/* ⭐ THE SCAN HEAD — it crosses the flat print before anything happens to
          it, which is the shot stating that something is ABOUT to */}
      {scan > 0 && scan < 1 && (<>
        <div style={{ position: "absolute", left: 400 + L.b * 0.7, top: 300 + scan * 300,
          width: 320, height: 7, zIndex: 74, background: hexa("#BFE8F0", 0.85) }} />
        <div style={{ position: "absolute", left: 400 + L.b * 0.7, top: 300 + scan * 300 - 40,
          width: 320, height: 40, zIndex: 73,
          background: `linear-gradient(180deg, ${hexa("#BFE8F0", 0)} 0%, ${hexa("#BFE8F0", 0.26)} 100%)` }} />
      </>)}

      {/* "and reuse" — finished copies racking on the shelf behind */}
      {Array.from({ length: 3 }, (_, i) => {
        const k = reuse * 3 - i;
        if (k <= 0) return null;
        const q = Math.min(1, k);
        return (
          <div key={"rc" + i} style={{ position: "absolute", left: 902 + L.c * 0.7,
            top: 300 + i * 132 + (1 - q) * -50, zIndex: 44,
            opacity: Math.min(1, k * 2.2), transform: `scale(${(0.7 + q * 0.3) * 0.44})`,
            transformOrigin: "50% 100%" }}>
            <Chair x={0} y={0} s={1} solid={1} spin={0.14 + i * 0.2} lit={0.3} z={44} />
          </div>
        );
      })}

      {/* the hero: he CARRIES it in, then PUSHES it and it turns */}
      <Contact x={110 + L.a * 0.7 + push * 180} y={GY - 12} w={226} o={0.34} z={50} />
      <Hero f={f} x={214 + L.a * 0.7 + push * 180} y={GY} size={268} z={58} act={1} ph={0.5}
        drive={carry < 1 ? 0.22 : push}
        strain={push > 0.1 ? 0.5 : 0}
        costume={{ suit: 1 }} gaze={0.7}
        cheer={reuse > 0.5 ? 1 : 0} />
      {push > 0.08 && (
        <Forearm x0={286 + L.a * 0.7 + push * 180} y0={GY - 176}
          x1={392 + L.a * 0.7 + push * 180} y1={GY - 196} w={24} c={CLAY} z={60} />
      )}

      <EnamelSign x={118 + L.a * 0.7} y={258} i={2} s={1.0} z={74} on={E(f, 12, 26, 0, 1, OUT)} />
      <ForeMass side="l" kind="stand" c="#171310" z={90} s={1.05} />
      <ForeMass side="r" kind="flag" c="#141110" z={89} s={0.9} />
      {/* ⭐⭐⭐ THE NEAR-CAMERA BAND — the shop's RECEIVING CREW, the ecom buyers
          the next line sells to, cropped by the bottom edge. Placed below the
          chair on the plinth so the turn stays clean. */}
      <NearBand f={f} n={5} y={860} size={214} pitch={228} x0={-52} z={86}
        at={6} seed={5} dx={L.c * 0.9} />

      {/* the object on the plinth is the only subject in this scene, so the
          key sits on it and comes UP as the three lamps strike */}
      <HeroKey x={556 + L.b * 0.7} y={578} r={318} c="#EAF6FF" z={33}
        k={0.66 + lamps * 0.6} />
      <NearShade top={612} z={88} k={0.58} />

      </Shots>
      <BandChip t="SPIN IT · LIGHT IT · REUSE IT" c={INK} />
    </Scene>
  );
};
