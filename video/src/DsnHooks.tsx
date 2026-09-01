import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Mark, MarkPlate, mono, ui,
  R, PLACES, asPlace, vivid, Rake, Ring, Puff, Pool, Steam, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, rock, shake, lerpHex, Runner, Sweat,
  SLOP, SLOP2, SLOPD, OWN, LIVE, LIVED,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, PCB, COPPER,
} from "./DsnWorld";
import { SlopFace, ArtFace, DesignFace, Board, Spur, Cursor, Artboard, SHOTS } from "./DsnProps";
import { seat } from "./DsnScenes";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 127 · "DESIGN" — THE HOOK CANDIDATES.

   ⛔⛔⛔ THE-OPEN STEP 1: three genuinely different PICTURES, each built at full
   chassis quality, each shipping as its own cut. Not one world in three
   colourways — if one sentence describes all three, there is one concept.

   ⭐ THE THREE, AND WHY THEY ARE DIFFERENT PICTURES:
     A · DROP   — a colossal board craned down and DROPPED on the works floor.
                  WIDE. Travel is VERTICAL. The verb in the VO, drawn literally.
     B · UNROLL — a rolled canvas thrown down and unrolling across the floor,
                  faces popping up along its length. MEDIUM. Travel is
                  HORIZONTAL, left to right, and the camera is low.
     C · SLAM   — tight and low across the board face, artboards slamming down
                  AT camera one after another. TIGHT. Travel is TOWARD camera.
   Different SHOT SIZES as well as different events: `feedback_variants_need_shot_sizes`
   — a 12% zoom spread satisfies a dHash and still reads as one shot three
   times, and the TIGHT cut is what sets the crop bound for the whole reel.

   ⛔ ALL THREE OBEY THE FOUR LAWS OF FRAME 0. Bright: `floor` and `facehook` are
   the two rooms built for the >=140 mean at f0 and they are the only two used
   here. The subject is a Claude and it is ON SCREEN at f0. The thing a viewer
   recognises with no narration is the CANVAS ITSELF arriving. And the one big
   string is the header, mute-readable at thumb distance.
   ⛔ A CUT IS NOT AN EVENT: each is ONE locked framing with ONE thing happening
   — a before state, a trigger, travel, and an arrival that costs something.
   ⛔ PRE-SEEDING PUTS AN OBJECT IN TIME; z PUTS IT IN SIGHT. Everything present
   at f0 is drawn SETTLED and at a z that beats what is in front of it, and
   nothing at f0 is caught mid-roll.
   ⛔ ANYTHING CROSSING THE CUT INTO S1 IS `LIN` OR `IN` (§23) — the artboards
   are still filling on the last frame of all three.

   ⛔⛔ THE GEOMETRY IS WORKED OUT, NOT EYEBALLED. Panel is 1012x792 panel-local
   with the cast on GY=706. The crop bound is `left >= 506 - 486/(push*cam.s)`,
   and at the worst case here (push 1.062 x cam.s 1.054 = 1.119) that is
   x 72..940 — every object below is inside it.
   ========================================================================= */

export type HookId = "drop" | "unroll" | "slam";
export const PICKED: HookId = "drop";

type HP = { v: "house" | "amber" | "steel"; dur: number };

const GY = 706;

/* the word onsets this hook is cut to, straight out of words_127design.json:
     f 0 Most · f18 Claude · f26 just · f30 dropped · f36 slash · f41 design
     f50 and  · f54 it's   · f62 absolutely · f86 insane
   ⛔ THESE MOVED. The VO was re-cut with crossfaded joins and no tempo change
   (the first pass used `silenceremove`, which splices without a crossfade and
   put a click on almost every pause), so every beat below is re-derived from
   the new caption JSON rather than nudged.
   ⭐ THE BOARD LANDS ON "DESIGN" (f34) and the three faces bloom on
   "absolutely insane" (f42/52/62) — the promise arrives while the word for it
   is still being said. */
/* derived from words_127design.json: "dropped" f23, "design" f34.
   The board LANDS on the word `design`. */
const REL = 27, LAND = 41, FACE = [66, 76, 86];

/* =========================================================================
   ⭐ A · DROP — THE PICKED HOOK.
   "Most people don't realize that Claude just dropped slash design…"

   §20: THE VO'S VERB NAMES THE FIX, and the verb here is **DROPPED**. So the
   picture is a drop: a colossal blank board comes down out of the roof and
   hits the floor of the works, and what lands is a live canvas with three
   different options already on it.

   THE EVENT, four parts (§2):
     before  f0   the board hangs edge-lit under the gantry, CROPPED BY THE TOP
                  EDGE so it is the occluder as well as the subject; the chains
                  are taut; the hero is small at the bottom, looking up; its
                  shadow is already on the floor and already growing.
     trigger f18  the chains go slack on "just".
     travel  f18-34  it falls the full height of the panel. ⛔ `IN_Q` — the
                  fastest frames are the LAST ones, so the shot accelerates into
                  its own arrival instead of easing into it.
     arrival f34  SLAM on "design": dust ring, the floor recoils, the hero is
                  knocked back and squashes, the gantry rings out on a damped
                  oscillation, and the board SQUARES UP — the value flips from a
                  dark mass against a lit hall to a lit face against a dark
                  floor, which is the frame where it becomes readable.
     payoff  f42/52/62  three faces bloom one-two-three, ASCENDING, each a
                  genuinely different design rather than a recolour.
     hand-off f70 the crew runs in from both edges onto the lit face — the next
                  line is about what you DO with it, so the last beat of the
                  hook is people arriving to work on it, not an effect.
   ====================================================================== */
export const HookDrop: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const fall = E(f, REL, LAND, 0, 1, IN_Q);
  const slack = E(f, 20, REL, 0, 1, OUT);
  /* ⭐⭐ A SUSPENDED LOAD IS NEVER STILL. "dropped" moved from f22 to f30 when the
     VO was re-cut, which is correct — the beat belongs on its word — and it left
     the first second with nothing but a hero looking up: the open gate's first
     per-second bucket fell 6.9 -> 2.9, the weakest second in the reel, on the one
     frame range that is guaranteed to be seen.
     ⛔ The wrong fix is a foreign element in the first second. The right one is
     already in the rig: 760px of board hanging on two chains SWINGS, and it is
     the largest object in the picture, so putting the mechanism's own idle back
     lights up the whole frame. It damps as the hoist takes the strain, which is
     also what actually happens. */
  /* ⭐⭐⭐ Alex, twice: *"between zero to zero point five second is not enough
     motion and interesting stuff."* Everything added so far was AROUND the
     subject — a rack, a falling stream, a crew, a sway. The subject itself was
     stationary, and it is 42% of the panel. §27: a viewer reads the whole frame,
     and the biggest thing in it was parked.
     ⭐ The board now TRAVELS IN along the gantry from off the right edge, 560px
     in the first 22 frames, decelerating onto its mark before the hoist takes it.
     That is the largest possible object moving the largest possible distance
     during the exact window he is describing, and it is what a gantry is for. */
  const run = E(f, 0, 22, 1, 0, IO);
  const sway = Math.sin(f / 15) * (1 - slack * 0.72) * (1 - fall) * (1 - run * 0.5);
  const swayX = sway * 44 + run * 560, swayR = sway * 3.6 - run * 4.2;
  /* ⭐ AND THE HOIST PAYS OUT BEFORE IT LETS GO. A 608px board creeping down 22px
     while it swings is a second continuous change on the biggest mass in the
     frame, and it is what a hoist does — you lower a load onto its mark before
     you release it. Together with the swing this took the open's first second
     2.9 -> 4.6 without adding a single object to the picture. §27: a viewer reads
     the whole frame, not the object you happen to be animating. */
  const payout = E(f, 0, REL, 0, 22, LIN);
  /* ⭐⭐⭐ THE BOARD'S GEOMETRY, AND THE FIX THAT MATTERED MOST.
     v1 hung it at BY -196, i.e. entirely ABOVE the panel, so frame 0 — the one
     frame guaranteed to be seen — was an empty floor with a dark sliver at the
     top. That is THE-OPEN law 2 failed outright and reel 125's "both alternative
     hooks opened on an empty room" repeated.
     ⭐ It now hangs FULLY IN FRAME and DOMINANT at f0 (654x370 centred at y200,
     the largest object in the picture by a factor of four), and the travel is
     bought back two ways instead of one: 268px of DROP **and** a scale from
     0.86 to 1.10, because it is also coming toward camera. Swept area is what
     the motion formula pays for, and a scale change repaints the whole object
     rather than only its leading edge.
     ⛔ 760 * 1.10 = 836px = 83% of the panel — under the 85% at which a
     silhouette stops being able to form. */
  const BW = 760 * (0.80 + fall * 0.22), BH = 430 * (0.80 + fall * 0.22);
  /* ⭐⭐⭐ AND THE TAIL IS THE CREW LIFTING IT. Even with the faces still
     populating, the hook died into its cut at 0.42, because the DOMINANT MASS —
     a 775px board that is 42% of the panel — was frozen from f34 onward and
     everything still moving was small. §19: the fix is never new objects, it is
     the subject continuing to ACT. Two crew get under the near edge from f78 and
     start raising it, `LIN`, so the biggest object in the frame is sweeping
     through ~100px on the frame the cut happens — and it is also the hand-off
     the next line needs, because you stand a board up to look at it. */
  const lift = E(f, 86, dur + 30, 0, 1, LIN);
  const BY = 150 + payout + fall * 302 - lift * 46;
  const rot = -9 + fall * 9 - lift * 11 + swayR;
  /* the slam, and nothing lands and stops */
  const hitK = f > LAND ? Math.exp(-(f - LAND) / 9) : 0;
  /* ⭐⭐⭐ Alex: *"when the screen lands, it doesn't crash or make a thud or
     something like that."* He is right and the strip shows it: the board arrived,
     a thin ring appeared, four 15px grit dots flew, and that was the whole
     arrival. §2 — an arrival has to COST something. Six things now fire on the
     same frame and they are all large:
       · the whole room JOLTS, hard, decaying over 14 frames
       · a dust WALL along the full contact line, not two small puffs
       · slabs of debris thrown on ballistic arcs, 40-90px, not dots
       · the floor takes a permanent impact scar
       · everything on the shelves and the rack jumps
       · the hero is knocked off his feet and lands on his back
     ⛔ NO WHITE FLASH. `feedback_no_flashing_transitions` is standing and §16 is
     a reel that shipped one to pass a gate. The violence is in the MOVEMENT. */
  const jolt = f > LAND ? Math.exp(-(f - LAND) / 5.2) * Math.sin((f - LAND) * 1.55) : 0;
  const joltY = f > LAND ? Math.exp(-(f - LAND) / 4.0) * Math.sin((f - LAND) * 2.1) : 0;
  const ring = f > LAND ? Math.sin((f - LAND) * 0.72) * Math.exp(-(f - LAND) / 11) : 0;
  const kick = E(f, LAND, LAND + 4, 0, 1, OUT) - E(f, LAND + 4, LAND + 26, 0, 1, LIN);
  const nFace = FACE.filter((t) => f >= t).length;
  const live = E(f, FACE[0], FACE[0] + 8, 0, 1, OUT);
  /* ⭐ THREE DISCRETE ARRIVALS, each on its own beat, each with its own content
     ramp. ⛔ The last one's content is still filling on the frame the cut
     happens, and it fills LIN, so nothing decelerates into the boundary. */
  const faceK = FACE.map((at) => E(f, at, at + 9, 0, 1, BACK));
  /* ⛔⛔ THE TAIL WENT STILL AND EVERY GATE EXCEPT TWO SAID IT WAS FINE. The
     three faces had finished arriving by f71 of 104, so the last 33 frames were
     carried by two 142px crew sprites — precut RATIO 0.41 and Q4 3.01 against a
     body of 7.94. §19: the fix is never new objects, it is THE SUBJECT
     CONTINUING TO ACT. Each face keeps POPULATING for 56 frames, so real
     content is still landing inside the largest object in the frame on the
     frame the cut happens, and it lands LIN so nothing decelerates into it. */
  const faceF = FACE.map((at) => seat(f, at));
  const fill = E(f, FACE[0], dur + 20, 0, 1, LIN);
  const BX = 512;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.048]} vig={0.26} glow={hexa(p.key, 0.24)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        transform: `translate(${jolt * 13}px, ${joltY * 17}px)` }}>
        <Room p={p} f={f} dx={0} bands={3} kind="column" overhead="gantry"
          rake={0.13} rakeRate={5.6} rakeN={7} floorKind="slab" grit={0.5}
          lamp={null} window={{ x: 70, y: 74, w: 250, h: 250 }} />
      </div>

      {/* ⭐ FRAME 0 CARRIES ITS OWN LUMA. Removing text removes luma (reel 125),
          so the bright things here are OBJECTS: a bank of finished boards
          leaning against the back wall, the daylight window, and the lit floor.
          Six 150px bright faces are worth ~+28 luma at f0 — arithmetic, not
          taste. */}
      {/* ⛔ SIX ACROSS THE FRAME AT ONE PITCH IS A FENCE (reel 120: ten 80px
          shutters read as a striped wall and the defect was the SILHOUETTE, not
          the lighting). Four, leaning at real angles, stacked in two depths and
          pushed to one side, read as STOCK against a wall. */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"lean" + i} style={{ position: "absolute", left: 606 + i * 104,
          top: 424 + (i % 2) * 26,
          width: 150 - (i % 2) * 16, height: 198 - (i % 2) * 22, zIndex: 22 + (i % 2),
          borderRadius: 3, overflow: "hidden", border: "4px solid #6E6656",
          transform: `rotate(${-7 + i * 3.6}deg)` }}>
          <DesignFace w={150} h={198} scheme={(i % 3) as 0 | 1 | 2} fill={1} live={1} />
        </div>
      ))}

      {/* ⭐⭐⭐ Alex: *"even between zero to zero point five seconds needs to have
          more stuff going on, like dropping stuff coming in on the screen, already
          have stuff."* Two different requirements and they need two different
          answers, which is §27: a viewer reads the WHOLE frame, not the object
          you happen to be animating.

          ALREADY HAVE STUFF — a stock rack of finished boards along the back wall,
          drawn LANDED and settled, so frame 0 has depth and density before
          anything moves.
          STUFF COMING IN — a continuous fall of boards down both sides, seeded
          NEGATIVE so several are already in free flight on frame 0. ⛔ That is
          allowed and pre-seeding a LANDING is not: reel 125 caught a tile
          half-scaled mid-drop on the one frame guaranteed to be seen. These never
          land in shot, so there is no arrival to catch halfway. */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const cyc = 74, at = -i * 9 - 6;
        const t = (((f - at) % cyc) + cyc) % cyc / cyc;
        const left = i % 2 === 0;
        const x = left ? 18 + (i % 4) * 22 : 908 + (i % 4) * 20;
        return (
          <div key={"fl" + i} style={{ position: "absolute", left: x,
            top: -150 + t * 1010, width: 96, height: 66, zIndex: 20, borderRadius: 3,
            opacity: 0.52 + (i % 3) * 0.16,
            transform: `rotate(${(left ? -1 : 1) * (12 + t * 26)}deg)`,
            overflow: "hidden", border: "3px solid #0A0E14" }}>
            {/* ⛔ THESE WERE GREY BLANKS AND READ AS DEBRIS. They are BOARDS, so
                they carry real screens like every other board in the reel — and a
                96x66 real capture is denser than anything that can be drawn at
                that size. */}
            <DesignFace w={96} h={66} scheme={(i % 3) as 0 | 1 | 2} fill={1} live={0.92} />
          </div>
        );
      })}

      {/* the stock rack along the back — ALREADY THERE on frame 0 */}
      <div style={{ position: "absolute", left: -30, top: 388, width: W + 60, height: 22,
        zIndex: 21, background: `linear-gradient(180deg, ${mxh("#7A6A48", 0.22)} 0%, #2E2616 100%)` }} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div key={"rk" + i} style={{ position: "absolute", left: -6 + i * 148, top: 300,
          width: 118, height: 88, zIndex: 20, borderRadius: 2, overflow: "hidden",
          border: "3px solid #6E6656", transform: `rotate(${-1.5 + (i % 3) * 1.2}deg)` }}>
          <DesignFace w={118} h={88} scheme={((i + 1) % 3) as 0 | 1 | 2} fill={1} live={0.86} />
        </div>
      ))}

      {/* ⭐ THE CHALKED SEAT — the floor is not empty, it is MARKED, and the mark
          telegraphs exactly where the thing is about to land. Reel 111's rule
          that an empty bay is a bright plate, applied to a floor. */}
      <div style={{ position: "absolute", left: BX - 396, top: 590, width: 792, height: 118,
        zIndex: 14, opacity: 0.5 - fall * 0.34,
        border: "5px dashed #F2E6C4", borderRadius: 3 }} />

      {/* THE GANTRY the board hangs from — it BOWS under the load and rings out
          after the release, which is the mechanism that makes the weight read */}
      <div style={{ position: "absolute", left: -40, top: 58 + (1 - fall) * 10 + ring * 6,
        width: W + 80, height: 38, zIndex: 74,
        background: `linear-gradient(178deg, ${mxh("#3A4450", 0.26)} 0%, #0E141A 100%)` }} />
      {/* ⛔ THE CHAINS RELEASE. v1 left them attached to the gantry 36 frames
          after the board was lying on the floor, which is a rig that never let
          go of the thing it dropped. They go slack at f14, and from the landing
          they swing free and empty. */}
      {[0, 1].map((i) => {
        const held = f < LAND;
        const len = held ? Math.max(6, BY - BH / 2 + 16 - 96) : 118 + ring * 10;
        return (
          <div key={"ch" + i} style={{ position: "absolute", left: BX - 168 + i * 336,
            top: 96, width: 10, height: len, zIndex: 73,
            transform: `rotate(${held ? slack * (i ? 3 : -3) + sway * 3.4 : ring * (i ? 7 : -7)}deg)`,
            transformOrigin: "50% 0%",
            background: `linear-gradient(90deg, #0B1016 0%, ${mxh(STEEL, 0.24)} 46%, #0B1016 100%)` }}>
            {/* the hook on the end, so a released chain still reads as a chain */}
            <div style={{ position: "absolute", left: -7, top: len - 22, width: 24, height: 24,
              borderRadius: "50%", border: `6px solid ${dkh(STEEL, 0.28)}`,
              borderTopColor: "transparent" }} />
          </div>
        );
      })}

      {/* the shadow, already on the floor at f0 and growing as it comes down */}
      <div style={{ position: "absolute", left: BX + swayX * 1.5 - (238 + fall * 190),
        top: GY - 30, width: (238 + fall * 190) * 2, height: 74, zIndex: 26,
        borderRadius: "50%", background: hexa("#1A1408", 0.24 + fall * 0.36) }} />

      {/* ⭐⭐ THE MARK, TURNING, BEHIND THE BOARD (Alex, 2026-08-30). It is the
          audience filter — the one thing that says who this is for — and behind a
          near-black board on a lit hall it also gives the frame a slow continuous
          rotation that nothing else in the open provides.
          ⛔ z 30: over the room and the leaning stock, UNDER the board (56) and
          the cascade (57), so it reads as being BEHIND the screen rather than
          floating on it. Sixteen rays rather than a bitmap, so it stays crisp at
          any scale and can turn without resampling. */}
      {(() => {
        /* ⛔ AT 470px THE MARK WAS SMALLER THAN THE BOARD IT SITS BEHIND (775 x
           439 at landing) and therefore completely invisible — the object was
           rendered, at the right z, and could not be seen. §6 again. At 1160 the
           rays reach well past every edge and it reads as what it is: the mark
           turning behind the screen. */
        const RS = 1160, cxm = BX + swayX, cym = BY;
        return (
          <div style={{ position: "absolute", left: cxm - RS / 2, top: cym - RS / 2,
            width: RS, height: RS, zIndex: 30,
            transform: `rotate(${f * 0.62}deg)` }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={"ry" + i} style={{ position: "absolute",
                left: RS / 2 - RS * 0.028, top: RS * 0.06,
                width: RS * 0.056, height: RS * 0.44, borderRadius: RS * 0.028,
                background: hexa(CLAY, 0.40),
                transformOrigin: `50% ${RS * 0.44}px`,
                transform: `rotate(${i * 22.5}deg)` }} />
            ))}
            <div style={{ position: "absolute", left: RS / 2 - RS * 0.075,
              top: RS / 2 - RS * 0.075, width: RS * 0.15, height: RS * 0.15,
              borderRadius: "50%", background: hexa(CLAY, 0.44) }} />
          </div>
        );
      })()}

      {/* ⭐⭐⭐ THE BOARD — the hero artifact, arriving */}
      {/* ⛔ THE BOARD STAYS A RULED CANVAS. It used to flip to a near-black well
          the instant the first face was due, so between the landing and the first
          artboard it was a big black rectangle in the middle of the hook. */}
      <Board x={BX + swayX} y={BY} w={BW} h={BH} z={56} state={0}
        rot={rot} edge="#2A3038" eye shade={Math.max(0, 0.26 - fall * 0.26)} />

      {/* ⭐⭐⭐ THE CASCADE. Alex: *"the beginning hook needs to be more captivating,
          more interesting."* The board landed and then THREE things appeared, one
          at a time, over two seconds — a correct beat and a thin one.
          ⭐ What the command actually does is GENERATE OPTIONS, so the board floods:
          sixteen drafts pour onto it in the half second after the crash, at four a
          second, tumbling as they fall. Then three of them RISE TO THE FRONT at
          full size and get named. Volume, then resolution — which is both the more
          exciting shape and the truer one. */}
      {Array.from({ length: 16 }, (_, i) => {
        const at = LAND + 2 + i * 1.05;
        if (f < at) return null;
        const t = E(f, at, at + 9, 0, 1, OUT);
        const col = i % 4, row = Math.floor(i / 4);
        const tx = BX + swayX - 318 + col * 212 + (row % 2) * 30;
        const ty = BY - 142 + row * 98;
        /* ⛔ the flood used to start fading four frames BEFORE the first big
           board arrived, so it was never fully on screen. It holds until the
           winners are actually rising. */
        const sink = E(f, FACE[0] + 4, FACE[0] + 18, 0, 1, IO);
        const w0 = 186, h0 = 112;
        return (
          <div key={"cs" + i} style={{ position: "absolute",
            left: tx - w0 / 2, top: (ty - 420 * (1 - t)) - h0 / 2,
            /* ⛔ THE CASCADE WAS DRAWN AT z 52-56 AND THE BOARD FACE IS z 56, so
               thirteen of the sixteen drafts rendered BEHIND the thing they were
               landing on. §6.2 for the third time on this reel: when something
               looks thin, check the stacking context before the rate. Above the
               board (56), below the three winners (60+). */
            width: w0, height: h0, zIndex: 57, borderRadius: 3,
            overflow: "hidden", border: "3px solid #39424E",
            opacity: t * (1 - sink * 0.62),
            transform: `rotate(${(1 - t) * (i % 2 ? 26 : -26)}deg) scale(${(0.7 + t * 0.3) * (1 - sink * 0.12)})` }}>
            <DesignFace w={w0} h={h0} scheme={(i % 3) as 0 | 1 | 2} fill={1} live={0.9} />
          </div>
        );
      })}

      {/* ⭐⭐ THE THREE THAT WIN, at full size and named. */}
      {[
        { x: BX - 240 + swayX, y: BY - 122, w: 224, h: 138, s: 2, r: -1.6, l: "OPTION A" },
        { x: BX + 248 + swayX, y: BY - 118, w: 236, h: 146, s: 1, r: 1.8,  l: "OPTION B" },
        { x: BX + swayX,       y: BY + 92,  w: 442, h: 208, s: 0, r: 0,    l: "OPTION C" },
      ].map((a, i) => (
        <React.Fragment key={"ab" + i}>
          <Artboard x={a.x} y={a.y} w={a.w} h={a.h} z={60 + i} design={a.s as 0 | 1 | 2}
            k={faceK[i]} fill={faceF[i]} label={a.l} rot={a.r} />
          {f >= FACE[i] && f < FACE[i] + 18 && (
            <Ring x={a.x} y={a.y + a.h / 2} f={f} at={FACE[i]} c={LIVE} />
          )}
        </React.Fragment>
      ))}

      {/* THE ARRIVAL COSTS SOMETHING */}
      {f >= LAND && (<>
        {/* THE IMPACT SCAR — it does not fade, because the floor took a hit */}
        <div style={{ position: "absolute", left: BX - 430, top: GY - 34, width: 860,
          height: 60, zIndex: 24, borderRadius: "50%",
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#3A2C12", 0.62)} 0%, ${hexa("#3A2C12", 0)} 78%)` }} />
        {Array.from({ length: 7 }, (_, i) => {
          const a = -0.5 - i * 0.36, L = 60 + (i % 3) * 46;
          return (
            <div key={"cr" + i} style={{ position: "absolute", left: BX - 400 + i * 118,
              top: GY - 24, width: L, height: 5, zIndex: 25,
              opacity: E(f, LAND, LAND + 5, 0, 0.72, OUT),
              background: "#2A1E08", transform: `rotate(${a * 12}deg)` }} />
          );
        })}
        {/* THE DUST WALL — the full contact line, not two puffs at the corners */}
        {Array.from({ length: 11 }, (_, i) => {
          const t = Math.min(1, (f - LAND) / 30);
          const r = 34 + t * (150 + (i % 4) * 46);
          return (
            <div key={"dw" + i} style={{ position: "absolute",
              left: BX - 420 + i * 84 - r + Math.sin(i * 2.1) * t * 60,
              top: GY - 10 - t * (58 + (i % 3) * 34) - r,
              width: r * 2, height: r * 2, borderRadius: "50%", zIndex: 68,
              opacity: (1 - t) * 0.62,
              background: `radial-gradient(50% 50% at 50% 50%, ${hexa("#D8C49A", 0.9)} 0%, ${hexa("#C0AA80", 0)} 72%)` }} />
          );
        })}
        {/* DEBRIS — slabs, 40-90px, thrown on real arcs. ⛔ 15px dots vanish in
            the audit's 1012->240 downsample and read as nothing to a person. */}
        {Array.from({ length: 12 }, (_, i) => {
          const t = Math.min(1, (f - LAND) / 34);
          const dir = i % 2 === 0 ? -1 : 1;
          const sp = 250 + (i % 5) * 130, w = 42 + (i % 4) * 22, h = 26 + (i % 3) * 16;
          return (
            <div key={"db" + i} style={{ position: "absolute",
              left: BX + dir * (60 + (i % 6) * 40) + dir * sp * t - w / 2,
              top: GY - 26 - (150 + (i % 5) * 80) * t + 420 * t * t - h / 2,
              width: w, height: h, borderRadius: 3, zIndex: 71, opacity: 1 - t * 0.5,
              transform: `rotate(${dir * t * (200 + i * 40)}deg)`,
              background: i % 3 === 0 ? "#5A4C30" : i % 3 === 1 ? "#8E7C58" : "#3E3320" }} />
          );
        })}
        <Ring x={BX} y={GY - 20} f={f} at={LAND} c="#E8DCBC" />
        <Ring x={BX} y={GY - 20} f={f} at={LAND + 5} c={p.key} />
      </>)}
      {live > 0 && <Pool x={BX} y={GY - 28} w={860} c={LIVE} o={0.30 * live} />}

      {/* ⭐ WHAT THE CLAUDE DOES: he watches it come down, is knocked back a step
          by the slam and squashes, then cheers when the faces come up. */}
      {/* ⭐⭐⭐ Alex: *"I wanna see more emotions with the Claude sprites as well,
          like having more emotions, changing colors, etcetera."* `Hero` has taken
          a `heat` prop since reel 122 that drives FIVE things off one number —
          the body flushes toward a hot red, it trembles faster and wider, the brow
          hardens, steam lifts off the head, and above 0.55 the anger ticks pop —
          and this reel was using none of it. The hook's arc is
          WATCHING -> FLINCH -> DELIGHT, and every scene now has one.
          ⛔ THE FLUSH IS TRANSIENT, NEVER A COSTUME (`feedback_trial_cut_variants`):
          `hue-rotate`/`saturate` on the sprite are banned outright, and a
          permanently recoloured Claude is off-brand. `heat` returns to 0. */}
      <Hero f={f} x={126} y={GY} size={212} z={64} costume={{ constr: 1 }}
        act={3} ph={0.5} gaze={E(f, 0, REL, -0.9, -1.2, LIN) + fall * 1.4}
        shock={Math.max(0, kick) * 1.0 + hitK * 0.55 + E(f, REL, LAND, 0, 0.55, IN_Q) * (1 - hitK)
               + (E(f, LAND + 6, LAND + 16, 0, 0.8, OUT) - E(f, LAND + 20, LAND + 34, 0, 0.8, OUT))}
        strain={Math.max(0, kick) * 0.55}
        lift={-hitK * 34}
        stern={E(f, 0, REL, 0.15, 0.5, LIN) * (1 - live)}
        heat={Math.max(0, kick) * 0.42}
        drive={-Math.max(0, kick) * 0.30}
        cheer={live * 0.95} />

      {/* the hand-off: the crew runs IN, because the next line is about using it */}
      {/* ⛔ THE CREW ALL ARRIVED AT f78, so the first two thirds of the hook had
          one moving sprite in it. One of them is already on the floor at frame 0,
          working, which is also why there is a board to drop onto. */}
      <Crew f={f} x={906} y={GY + 12} i={7} size={152} z={30} at={0} loop={1} />
      {[0, 1, 2].map((i) => {
        const at = 78 + i * 11;
        if (f < at) return null;
        /* ⛔ LIN and still crossing at the cut. ⭐ And BIG — reel 107 measured
           crowds at s=72-92 as WORSE than the slabs they replaced until they
           were scaled up and their arrivals shortened. */
        const t = E(f, at, at + 30, 0, 1, LIN);
        const fromL = i !== 1;
        const x0 = fromL ? -160 - i * 100 : W + 170, x1 = fromL ? 196 + i * 150 : 828;
        return <Crew key={"cw" + i} f={f} x={x0 + (x1 - x0) * t} y={GY + 20} i={i + 3}
          size={206} z={66} at={at} loop={i === 2 ? 2 : 1} flip={!fromL}
          cheer={f > 86 ? 0.7 : 0} />;
      })}

      {/* ⛔ THE RECEIPT CHIP IS GONE FROM THE HOOK (Alex, 2026-08-30) and has moved
          to S3, the scene where the command is actually typed — which is where a
          viewer about to go and try it needs the version and the plan. The reel
          still carries it; the hook is now one claim and one picture. */}
      <Mark x={846} y={118} s={86} z={92} />
    </Scene>
  );
};

/* =========================================================================
   B · UNROLL — the same promise as a HORIZONTAL event, at MEDIUM, low camera.
   A rolled canvas is thrown down at the left and unrolls right across the whole
   floor, and a face pops up behind the roll as it passes each station. The
   travel is the full panel width rather than the full panel height, the hero is
   the one who throws it rather than the one who watches, and the camera is low
   enough that the roll crosses the frame at eye level.
   ====================================================================== */
export const HookUnroll: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const THROW = 18;
  const roll = E(f, THROW, 74, 0, 1, IN_Q);          /* accelerating, not easing */
  const rx = 148 + roll * 742;
  const POP = [36, 52, 68];
  const live = E(f, POP[0], POP[0] + 8, 0, 1, OUT);
  const fill = E(f, POP[0], dur + 20, 0, 1, LIN);
  const spin = -roll * 760;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.038]} vig={0.28} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={0} bands={3} kind="shelf" overhead="joist"
        rake={0.12} rakeRate={4.8} rakeN={9} floorKind="boards" grit={0.5}
        lamp={{ x: 826, y: 150, r: 320 }} window={{ x: 700, y: 78, w: 262, h: 208 }} />

      {/* ⭐ FRAME 0 IS AN IMAGE, NOT A ROOM. v1 opened on an empty counter with a
          124px olive disc on the back wall that read as a CLOCK, and the one
          object the shot is about was neither big, nor dark against its field,
          nor on the floor it was about to run along. The roll is now 214px, on
          the ground line, and near-black against a bone floor — a subject is
          recognised by its SILHOUETTE and a silhouette needs a value step. */}

      {/* the works' own stock, stacked at the back so f0 has depth AND luma */}
      {[0, 1, 2, 3].map((i) => (
        <div key={"bk" + i} style={{ position: "absolute", left: 74 + i * 132, top: 300,
          width: 116, height: 152, zIndex: 22, borderRadius: 3, overflow: "hidden",
          border: "4px solid #6E6656", transform: `rotate(${-2 + (i % 3) * 2}deg)` }}>
          <DesignFace w={116} h={152} scheme={(i % 3) as 0 | 1 | 2} fill={1} live={1} />
        </div>
      ))}

      {/* the canvas laid down behind the roll — a real sheet with a lip */}
      <div style={{ position: "absolute", left: 148, top: 402, width: Math.max(0, rx - 148),
        height: 252, zIndex: 40, borderRadius: 2,
        background: `linear-gradient(178deg, ${mxh("#2A3038", 0.30)} 0%, #10151B 100%)`,
        borderTop: "7px solid #58626E" }} />
      <div style={{ position: "absolute", left: 148, top: 646, width: Math.max(0, rx - 148),
        height: 18, zIndex: 41, background: hexa("#05070C", 0.5) }} />

      {/* the faces popping up along its length */}
      {POP.map((at, i) => {
        if (f < at) return null;
        const t = E(f, at, at + 10, 0, 1, BACK);
        const x = 214 + i * 250;
        return (
          <React.Fragment key={"fc" + i}>
            <div style={{ position: "absolute", left: x, top: 408,
              width: 226, height: 240, zIndex: 46, borderRadius: 3, overflow: "hidden",
              border: "4px solid #39424E",
              transform: `scaleY(${t}) rotate(${(1 - t) * -6}deg)`, transformOrigin: "50% 100%" }}>
              <ArtFace w={226} h={240} scheme={(i % 3) as 0 | 1 | 2}
                fill={E(fill, i * 0.1, i * 0.1 + 0.5, 0, 1, OUT)} live={live} />
            </div>
            <Ring x={x + 113} y={648} f={f} at={at} c={LIVE} />
          </React.Fragment>
        );
      })}

      {/* ⭐⭐ THE ROLL — 214px, near-black, ON the ground line, and it spins
          through 2.1 revolutions so the object itself is repainting, not only
          its leading edge. */}
      <div style={{ position: "absolute", left: rx - 107, top: 540, width: 214, height: 214,
        zIndex: 66, borderRadius: "50%",
        background: `radial-gradient(circle at 34% 28%, ${mxh("#3E4652", 0.20)}, #0C1016)`,
        border: "8px solid #05080C", transform: `rotate(${spin}deg)` }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: 94, top: 12, width: 10,
            height: 82, background: hexa("#8A94A2", 0.55),
            transformOrigin: "50% 83px", transform: `rotate(${i * 30}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 76, top: 76, width: 54, height: 54,
          borderRadius: "50%", background: mxh("#3E4652", 0.34) }} />
      </div>
      {/* the roll throws grit off the floor for its whole run */}
      {f > THROW && <Puff x={rx - 118} y={738} f={f} at={Math.floor(f / 7) * 7} c="#C9B48A" />}
      <Contact x={rx} y={742} w={260} z={44} o={0.5} />

      {live > 0 && <Pool x={520} y={GY - 26} w={880} c={LIVE} o={0.26 * live} />}

      {/* ⭐ WHAT THE CLAUDE DOES: he THROWS it, and the throw is a real distance */}
      <Hero f={f} x={126} y={GY} size={244} z={64} costume={{ constr: 1 }}
        act={1} ph={0.9} reach={134}
        drive={E(f, THROW - 6, THROW + 3, 0, 1, IN_Q) - E(f, THROW + 3, THROW + 24, 0, 1, OUT)}
        cheer={live * 0.85} gaze={0.6} />

      <Crew f={f} x={932} y={GY + 16} i={8} size={140} z={62} at={4} loop={3} flip />
      <Mark x={846} y={118} s={86} z={92} />
    </Scene>
  );
};

/* =========================================================================
   C · SLAM — the TIGHT cut, and the one that sets the crop bound.
   Low and close across a lit board table. The artboards come down AT camera one
   after another and land big, so the travel is toward the viewer rather than
   across the frame.

   ⛔⛔ v1 OPENED ON AN EMPTY DARK WALL. The face filled two thirds of the frame
   in near-black with nothing on it, which is reel 125's *"both alternative hooks
   opened on an empty grey room"* repeated, and it failed the >=140 frame-0 bar
   outright. Two things fixed it and both are laws, not taste:
     ⭐ THE FIELD IS LIGHT AND THE SUBJECTS ARE DARK. The artboards carry dark
        chrome, so the table under them is BONE. "Name which side of the contrast
        your subject is on" is the answer to *"I can't tell what that is"* more
        often than shape ever is.
     ⭐ ONE BOARD IS ALREADY LANDED AT f0, drawn as LANDED OUTRIGHT rather than
        seeded mid-flight (reel 125 caught a tile half-scaled and rotated on the
        one frame guaranteed to be seen). It is the before state, and the event
        is the two that arrive on top of it.
   ====================================================================== */
export const HookSlam: React.FC<HP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("facehook");
  const DOWN = [28, 58];
  const LIVE_AT = 76;
  const live = E(f, LIVE_AT, LIVE_AT + 10, 0, 1, OUT);
  const fill = E(f, 0, dur + 20, 0.34, 1, LIN);
  const jolt = DOWN.reduce((a, t) => a + (f > t ? Math.sin((f - t) * 1.5) * Math.exp(-(f - t) / 5) * 11 : 0), 0);
  /* the three seats, left to right; index 0 is the one already on the table */
  const SEAT = [200, 506, 812];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.034]} vig={0.24} glow={hexa(p.key, 0.26)}>
      <Room p={p} f={f} dx={0} bands={2} kind="column" overhead="gantry"
        rake={0.11} rakeRate={4.2} rakeN={11} floorKind="tile" grit={0.4}
        lamp={{ x: 512, y: 100, r: 400 }} />

      {/* THE TABLE — a bone surface at a low angle, with a dark front lip so it
          reads as a plane rather than a wall. The grid is what makes it a
          CANVAS and not a counter. */}
      <div style={{ position: "absolute", left: -46, top: 336 + jolt, width: W + 92, height: 470,
        zIndex: 30, background: `linear-gradient(178deg, #EEF3F6 0%, #B6C6D2 100%)`,
        borderTop: "12px solid #6E7C88" }} />
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"gv" + i} style={{ position: "absolute", left: -46 + i * 104, top: 348 + jolt,
          width: 2, height: 452, zIndex: 31, background: hexa("#25313C", 0.16) }} />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"gh" + i} style={{ position: "absolute", left: -46, top: 386 + i * 96 + jolt,
          width: W + 92, height: 2, zIndex: 31, background: hexa("#25313C", 0.13) }} />
      ))}

      {/* ⭐ SEAT 0 — ALREADY LANDED AT f0. The before state, drawn finished. */}
      <div style={{ position: "absolute", left: SEAT[0] - 128, top: 352 + jolt, width: 256,
        height: 320, zIndex: 50, borderRadius: 4, overflow: "hidden",
        border: "6px solid #3A4450" }}>
        <DesignFace w={256} h={320} scheme={0} fill={fill} live={0.6 + live * 0.4} />
      </div>
      <Contact x={SEAT[0]} y={676 + jolt} w={280} z={44} o={0.5} />

      {/* THE ARTBOARDS coming down AT camera — they arrive BIG and settle */}
      {DOWN.map((at, i) => {
        if (f < at - 16) return null;
        const t = E(f, at - 16, at, 0, 1, IN_Q);
        const sq = squash(f - at, 10, 0.22, 3, 9);
        const s = 2.0 - t * 1.0;
        const x = SEAT[i + 1];
        return (
          <React.Fragment key={"ab" + i}>
            <div style={{ position: "absolute", left: x - 128, top: 352 + jolt - (1 - t) * 310,
              width: 256, height: 320, zIndex: 52 + i, borderRadius: 4, overflow: "hidden",
              border: "6px solid #3A4450", opacity: Math.min(1, t * 2.6),
              transform: `scale(${s}) scaleY(${sq}) rotate(${(1 - t) * (i % 2 ? 8 : -8)}deg)`,
              transformOrigin: "50% 100%" }}>
              <DesignFace w={256} h={320} scheme={((i + 1) % 3) as 0 | 1 | 2}
                fill={E(fill, i * 0.12, i * 0.12 + 0.5, 0, 1, OUT)} live={0.6 + live * 0.4} />
            </div>
            {f >= at && <Ring x={x} y={676} f={f} at={at} c="#4E6A7C" />}
            {f >= at && <Puff x={x} y={686} f={f} at={at} c="#8FA4B4" />}
            {f >= at && <Contact x={x} y={676 + jolt} w={280} z={44} o={0.5} />}
          </React.Fragment>
        );
      })}

      {/* ⭐ WHAT THE CLAUDE DOES: he is right under them, ducking and flinching
          as each one lands, and cheering by the last. Small in a tight frame is
          what gives the boards their scale. */}
      <Hero f={f} x={80} y={GY + 78} size={196} z={70} costume={{ constr: 1 }}
        act={3} ph={1.4} gaze={0.8}
        shock={DOWN.reduce((a, t) => a + (f > t ? Math.exp(-(f - t) / 7) : 0), 0)}
        strain={DOWN.reduce((a, t) => a + (f > t && f < t + 10 ? 0.5 : 0), 0)}
        cheer={f > DOWN[1] + 6 ? 0.9 : 0} />

      <Mark x={846} y={118} s={86} z={92} />
    </Scene>
  );
};

export const HOOKS: Record<HookId, React.FC<HP>> = {
  drop: HookDrop, unroll: HookUnroll, slam: HookSlam,
};
