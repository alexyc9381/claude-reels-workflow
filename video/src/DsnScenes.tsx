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
import {
  SlopFace, ArtFace, Board, StockPress, Terminal, Cursor, InkTray, PartsCase,
  ReaderHead, Handles, PropStrip, Guide, Spur, CodeRack, StockBelt, SlopStack,
  SHOTS, COMPOSER, Artboard, CanvasGround, CanvasChrome, DesignFace,
} from "./DsnProps";
import { Room } from "./HwSets";

/* ===========================================================================
   REEL 127 · "DESIGN" — THE SCENES.  Board: storyboards/127-design.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses real distance, and an arrival
   that COSTS something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him":
     S1  is knocked back by the press and BRACES against the next slam
     S2  takes delivery of the boards and is BURIED by the fourth
     S3  types the command and drives ENTER down with his whole body
     S4  hauls the spur's coupling across and locks it onto the board
     S5  fires the second command, back to camera, at the same desk
     S6  walks the reader head down the rack, hand on the carriage
     S7  pours the five inks, one after another, and the case fills behind him
     S8  UNBOLTS the stock plate and swings the new one in — the peak
     S9  puts BOTH HANDS on a panel and walks it across the face
     S10 carries the finished board out through the doors

   ⛔ AN ACTION LOOP IS NOT A SCENE. `Crew`'s four loops are what the works does
   WHILE the scene happens; every scene still owes its own four-part event.
   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN` (§23). An `IO`/`OUT` ease
   decelerates into its end whether or not that end is on screen, so extending
   it past the cut fixes nothing.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). Plates
   never enter the ground line the cast stands on.
   ⛔ EVERY SCENE IS LOCKED. The reel has exactly THREE re-framings — S3 f54,
   S8 f28 and S9 f46 — and all three are CUTS, not drifts.
   ⛔ THE VILLAIN IS THE STOCK PLATE AND IT IS NEVER ARGUED WITH. It stamps at
   S1, fills a wall at S2, is still bolted in at S7, is REPLACED at S8, and is
   still hanging on the wall, still purple, in the CTA.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };

/** the ground line the cast stands on, house-wide */
export const GY = 706;

/** ⭐⭐ A FACE HAS TO BECOME LEGIBLE FAST AND THEN KEEP CREEPING. The first build
    filled each artboard over 52 frames, so a contact sheet caught two of the
    three as blank grey panels at the moment the scene was about to cut — the
    payoff existed and could not be read. This puts 86% of the content down in
    18 frames (a viewer can name the page) and creeps the last 14% out over 58
    more, `LIN`, so the largest object in the frame is still changing when the
    cut lands (§23). Legibility and a live tail are not a trade-off; they are two
    different parts of the same ramp. */
export const seat = (f: number, at: number) =>
  E(f, at + 2, at + 20, 0, 0.86, OUT) + E(f, at + 20, at + 78, 0, 0.14, LIN);
/** the reserved plate band — ⛔ nothing else enters y 112..210 */
const BAND_Y = 150;

/** ⛔ the camera offset goes on the PANEL CONTENTS, never the whole comp, and it
    has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  /* ⛔⛔⛔ rot IS DEAD — see TILT_BANNED in NomWorld. It is kept at 0 here only
     because the type still carries the field. Never set it: it tilts the whole
     room, and a tilted UI reads as a broken render, not as a second camera. */
  house: { dx: -4, dy: 8, s: 1.006, rot: 0 },
  amber: { dx: -104, dy: -58, s: 1.092, rot: 0 },
  steel: { dx: 78, dy: 42, s: 1.062, rot: 0 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` / `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary. */
export const GRADE: Record<Variant, string> = {
  house: "contrast(1.000) saturate(1.20) brightness(1.000)",
  amber: "contrast(1.136) saturate(1.20) brightness(0.958)",
  steel: "contrast(1.072) saturate(1.20) brightness(1.050)",
};

const PAR_X: Record<Variant, number> = { house: 0, amber: -48, steel: 46 };
/** ⛔⛔ A RAKE PHASE IS MODULO THE BAND PITCH — offsets inside one pitch collapse
    to nothing. Varying `n` changes the PITCH itself, which is the only offset
    that cannot go inert. */
const RAKE_X: Record<Variant, number> = { house: 0, amber: 98, steel: 176 };
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.86, steel: 0.52 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 4, steel: 11 };
/** ⭐ PER-CUT LAYOUT on the flattest scenes — one large object on a plain field
    is the hardest frame to differentiate and a grade has nothing to bite on
    there, so at any sampled instant the subject is somewhere else. */
const LAY: Record<Variant, { main: number; sec: number; beat: number }> = {
  house: { main: 0, sec: 0, beat: 0 },
  amber: { main: 106, sec: -94, beat: -5 },
  steel: { main: -112, sec: 108, beat: 8 },
};

/** ⭐ THE STACK COUNT IS THE REEL'S OTHER SPINE. The villain's output only ever
    goes UP until S8, and it is written down in one place so a scene cannot
    drift off it. */
const STOCK = { s1: 1, s2: 12, s3: 12, s4: 12, s5: 12, s6: 12, s7: 12 } as const;

/* =========================================================================
   S1 · THE PRESS HALL — "So it completely fixes the worst part of AI coding."
   §3: the words are WORST PART, and a caption saying so is a container. The
   picture is the machine that MAKES the worst part, doing its job successfully.
   EVENT: before, the press idling with its flywheel turning and the bed empty ·
   trigger, the ram drives on "worst" (f25) · travel, 96px of real stroke ·
   arrival, a purple board drops onto the belt and the hero is knocked back.
   ⛔ NO PLATE WRITES "THE WORST PART OF AI CODING".
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("press");
  /* ⛔⛔⛔ REBUILT. Alex: *"the second scene with the purple stuff, the purple
     scene is just very very bad. It's just not good."* The frame strip agreed and
     the diagnosis is §21 exactly — **GREY + RECTANGULAR is the combination that
     reads as boring**, and the old scene was a grey rectangle frame with a grey
     bar across it, in a purple room:
       · the press was a 460x430 assembly of grey boxes at half panel width, so
         none of its parts were legible as parts
       · its ram moved 96px, which at that scale is a twitch
       · the flywheel was a 150px dark disc on a dark machine — invisible
       · the page it made was 214x140 of flat purple with three white bars, far
         too small to be recognised as a WEBPAGE, which is the entire joke
       · and the shot was a wide of a machine, so nothing was ever close enough
         to look at

     ⭐ THE REBUILD IS A DIFFERENT SHOT, NOT A DRESSED VERSION OF THE SAME ONE
     (`feedback_dressing_the_words_is_not_redoing_it`). It is now CLOSE ON THE
     BED: the ram is a mass filling the top third and cropped by the frame, the
     flywheel is 380px and cropped by the left edge, the stroke is 250px, and what
     comes out is a 470px page you can actually read as a page. Muted, what is
     happening is "a machine slams down and prints the same website again". */
  const SLAM = 32;                                    /* "worst", derived f27 */
  const drop = E(f, SLAM - 9, SLAM, 0, 1, IN_Q);
  const lift = E(f, SLAM + 7, SLAM + 26, 0, 1, IO);
  /* ⛔⛔ THE RAM PARKED AND THE SCENE DIED INTO ITS CUT AT 0.52. After the single
     stroke the biggest mass in the frame was frozen for the last 19 frames while
     a 470px page slid 17px a frame — §19 again: the fix is never new objects, it
     is THE SUBJECT CONTINUING TO ACT.
     ⭐ And a press does not strike once. The villain's whole rule is that it only
     knows one page, so it starting the NEXT stroke is the rule stated as
     behaviour rather than as a caption — and it is still ACCELERATING downward on
     the frame the cut lands, which is `IN_Q`, the ease §23 asks for across a cut. */
  const drop2 = E(f, SLAM + 30, dur + 16, 0, 1, IN_Q);
  const ram = drop * (1 - lift) + drop2;
  const jolt = f > SLAM ? Math.exp(-(f - SLAM) / 4.4) * Math.sin((f - SLAM) * 1.7) : 0;
  const kick = E(f, SLAM, SLAM + 4, 0, 1, OUT) - E(f, SLAM + 4, SLAM + 30, 0, 1, LIN);
  /* the sheet feeds in, is stamped, and leaves — one continuous pass, `LIN` out */
  const feed = E(f, 0, SLAM - 9, 0, 1, IO);
  const out = E(f, SLAM + 10, dur + 20, 0, 1, LIN);
  /* ⛔⛔ THE RAM RESTED AT y=96 WITH ITS WRAPPER TOP AT -234, i.e. almost entirely
     ABOVE the panel — so the before state was an empty bed and the "slam" was a
     dark band appearing from off-frame. §11: an action is a DISTANCE, and a
     distance you cannot see the start of is not one. It now rests fully in shot
     with its plate visible, and drives 230px down into the bed. */
  const RY = 292 + ram * 230;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.052]} vig={0.42} glow={hexa(p.key, 0.24)}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        transform: `translate(${jolt * 11}px, ${jolt * 14}px)` }}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="plant" overhead="gantry"
          rake={0.16} rakeX={RAKE_X[v]} rakeRate={6.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 560, y: 640, r: 360 }} />
      </div>
      <Pool x={560} y={706} w={860} c={p.key} o={0.34} />

      {/* ⭐ THE FLYWHEEL — 380px and CROPPED BY THE LEFT EDGE, which is both the
          depth check's "mass cropped by the frame in front of the action" and the
          only way a wheel reads as a wheel at this size. It never stops. */}
      <div style={{ position: "absolute", left: -196, top: 250, width: 380, height: 380,
        borderRadius: "50%", zIndex: 30,
        background: `radial-gradient(circle at 38% 30%, #4E5A66, #0B0F14)`,
        border: `26px solid #05070A`, transform: `rotate(${f * 5.4}deg)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={"sp" + i} style={{ position: "absolute", left: 158, top: 16,
            width: 18, height: 156, borderRadius: 3,
            background: `linear-gradient(90deg, #05070A 0%, #7C8894 45%, #05070A 100%)`,
            transformOrigin: "50% 148px", transform: `rotate(${i * 45}deg)` }} />
        ))}
        <div style={{ position: "absolute", left: 128, top: 128, width: 72, height: 72,
          borderRadius: "50%", background: mxh(BRASS, 0.06),
          border: `9px solid ${dkh(BRASS, 0.54)}` }} />
      </div>
      {/* ⛔ THE FIRST FRAMES WERE AN EMPTY BED. The press does not start when the
          shot does — there is a rack of what it has already made standing behind
          it, and the next sheet is already on its way in on frame 1. */}
      {/* the rack of what it has already made — lit, so the room has depth and a
          reason to exist, and every one of them is the same page */}
      <div style={{ position: "absolute", left: -20, top: 258, width: W + 40, height: 13,
        zIndex: 17, background: "#2A1E44" }} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"st" + i} style={{ position: "absolute", left: 96 + i * 156, top: 150,
          width: 142, height: 104, zIndex: 18, borderRadius: 2, overflow: "hidden",
          opacity: 0.74, border: "3px solid #1A1030",
          transform: `rotate(${-2 + (i % 3) * 1.6}deg)` }}>
          <SlopFace w={142} h={104} dim={0.16} />
        </div>
      ))}

      {/* the belt that drives it, running up out of frame */}
      <div style={{ position: "absolute", left: 150, top: -40, width: 22, height: 340,
        zIndex: 29, background: dkh("#2A1E3E", 0.10), transform: "rotate(7deg)" }} />

      {/* ⭐⭐ THE RAM — a mass filling the top of the frame, cropped by the edge,
          with the STOCK PLATE bolted to its face. It is what makes the page, so
          the engraving is on the thing that comes down. */}
      <div style={{ position: "absolute", left: 236, top: RY - 330, width: 660, height: 330,
        zIndex: 62 }}>
        {/* ⛔⛔ THE WHOLE SCENE WAS ONE VALUE. Alex called this section boring
            twice, and the frame strip says why: the ram, the wall, the shadows and
            the page were ALL mid-purple, so nothing had an edge and no shape read
            as a shape. §21's "grey and rectangular" in a different hue.
            ⭐ THE PRESS IS CAST IRON NOW — near-black with a hard steel highlight —
            and the ONLY purple left in the room is the page it makes. That is the
            villain's colour and it should be the one thing wearing it. */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 660, height: 250,
          borderRadius: 5,
          background: `linear-gradient(178deg, #3E4650 0%, #0A0D12 100%)`,
          borderTop: `8px solid #78848E`,
          borderBottom: "18px solid #05070A" }} />
        {/* the oil sheen down the face, so it reads as metal and not as a slab */}
        <div style={{ position: "absolute", left: 0, top: 8, width: 660, height: 34,
          background: `linear-gradient(96deg, ${hexa("#FFFFFF", 0)} 0%, ${hexa("#C8D4DE", 0.30)} 40%, ${hexa("#FFFFFF", 0)} 78%)` }} />
        {/* the ribs, so the mass reads as CAST and not as a bar */}
        {[0, 1, 2, 3].map((i) => (
          <div key={"rb" + i} style={{ position: "absolute", left: 62 + i * 150, top: 84,
            width: 74, height: 150, borderRadius: 4,
            background: `linear-gradient(178deg, ${hexa("#000", 0.46)} 0%, ${hexa("#000", 0.10)} 100%)`,
            borderLeft: `4px solid ${hexa("#9EAEBC", 0.40)}`,
            borderRight: `2px solid ${hexa("#000", 0.5)}` }} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={"bo" + i} style={{ position: "absolute", left: 44 + i * 140, top: 34,
            width: 40, height: 40, borderRadius: "50%",
            background: `radial-gradient(circle at 36% 32%, ${mxh(BRASS, 0.22)}, ${dkh(BRASS, 0.52)})` }} />
        ))}
        {/* the engraved plate — the villain, on the face that strikes */}
        <div style={{ position: "absolute", left: 96, top: 250, width: 468, height: 66,
          background: `linear-gradient(160deg, ${SLOP2} 0%, ${SLOPD} 100%)`,
          borderBottom: `10px solid ${dkh(SLOPD, 0.44)}` }}>
          <div style={{ position: "absolute", left: "8%", top: "22%", width: "84%",
            height: "20%", background: hexa("#000", 0.36) }} />
          <div style={{ position: "absolute", left: "36%", top: "58%", width: "28%",
            height: "26%", borderRadius: 10, background: hexa("#000", 0.42) }} />
        </div>
        {/* ⭐ §21: the fix for "grey and boring" is BRASS, DOMED, WITH A TURNING
            WHEEL AND A BACKLIT NAMEPLATE. A bigger plate, a pressure gauge whose
            needle actually swings with the stroke, and a valve wheel that turns. */}
        <div style={{ position: "absolute", left: 232, top: 6, width: 200, height: 42,
          borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(168deg, ${mxh(BRASS, 0.36)} 0%, ${dkh(BRASS, 0.30)} 100%)`,
          border: "3px solid #6A4E14" }}>
          <span style={{ ...mono(25, 800), color: "#1A1206", letterSpacing: 4 }}>STOCK</span>
        </div>
        <div style={{ position: "absolute", left: 52, top: 4, width: 86, height: 86,
          borderRadius: "50%",
          background: `radial-gradient(circle at 36% 32%, #F4E6C0, #B79A5A)`,
          border: "6px solid #6A4E14" }}>
          {[0,1,2,3,4,5,6].map((i) => (
            <div key={"tk"+i} style={{ position: "absolute", left: 36, top: 5, width: 2.6,
              height: 8, background: "#4A360C",
              transformOrigin: "50% 32px", transform: `rotate(${-110 + i*36}deg)` }} />
          ))}
          <div style={{ position: "absolute", left: 35, top: 14, width: 3.4, height: 26,
            background: "#8E2A18", transformOrigin: "50% 100%",
            transform: `rotate(${-104 + ram * 190}deg)` }} />
        </div>
        <div style={{ position: "absolute", left: 500, top: 8, width: 78, height: 78,
          borderRadius: "50%", border: "9px solid #6A4E14",
          transform: `rotate(${f * 2.4}deg)` }}>
          {[0,1,2].map((i) => (
            <div key={"vw"+i} style={{ position: "absolute", left: 28, top: -2, width: 6,
              height: 64, background: mxh(BRASS, 0.18),
              transformOrigin: "50% 50%", transform: `rotate(${i*60}deg)` }} />
          ))}
        </div>
      </div>
      {/* the ways the ram slides in, so it reads as guided rather than floating */}
      {[0, 1].map((i) => (
        <div key={"wy" + i} style={{ position: "absolute", left: i ? 880 : 216, top: -30,
          width: 34, height: 470, zIndex: 58,
          background: `linear-gradient(90deg, #0A0614 0%, ${mxh("#463A5E", 0.16)} 50%, #0A0614 100%)` }} />
      ))}

      {/* THE BED, and the sheet on it */}
      <div style={{ position: "absolute", left: 190, top: 500, width: 740, height: 58,
        zIndex: 34, borderRadius: 4,
        background: `linear-gradient(178deg, #47525C 0%, #0B0F14 100%)`,
        borderTop: `5px solid #7C8894` }} />
      <div style={{ position: "absolute", left: -60, top: 486, width: W + 120, height: 16,
        zIndex: 33, background: "#0C0618" }} />

      {/* ⭐ THE PAGE — 470px wide, which is where a viewer RECOGNISES it. Blank
          while it feeds in, stamped on the slam, and it leaves to the right. */}
      <div style={{ position: "absolute",
        left: -400 + feed * 690 + out * 940, top: 214 + out * 46,
        width: 470, height: 292, zIndex: 66, borderRadius: 3, overflow: "hidden",
        border: `5px solid ${f >= SLAM ? "#1A1424" : "#5A5064"}`,
        transform: `translateY(${286 - (f >= SLAM ? 0 : 0)}px) rotate(${out * 5}deg) scaleY(${1 - Math.max(0, kick) * 0.10})` }}>
        {f >= SLAM
          ? <SlopFace w={470} h={292} />
          : <div style={{ position: "absolute", inset: 0, background:
              `linear-gradient(172deg, #E8E4DA 0%, #BEB8AA 100%)` }} />}
      </div>

      {/* the NEXT sheet, already on its way in under the falling ram */}
      {drop2 > 0.01 && (
        <div style={{ position: "absolute", left: -400 + E(f, SLAM + 26, dur + 10, 0, 690, LIN),
          top: 500, width: 470, height: 292, zIndex: 40, borderRadius: 3,
          border: "5px solid #5A5064",
          background: `linear-gradient(172deg, #E8E4DA 0%, #BEB8AA 100%)` }} />
      )}

      {/* the strike: sparks out of the join, both sides, on real arcs */}
      {f >= SLAM && f < SLAM + 26 && Array.from({ length: 16 }, (_, i) => {
        const t = (f - SLAM) / 26, dir = i % 2 === 0 ? -1 : 1;
        const sp = 210 + (i % 5) * 150;
        return (
          <div key={"sk" + i} style={{ position: "absolute",
            left: 560 + dir * (40 + (i % 7) * 30) + dir * sp * t - 5,
            top: 496 - (60 + (i % 4) * 70) * t + 380 * t * t - 5,
            width: 11 + (i % 3) * 5, height: 6, borderRadius: 3, zIndex: 70,
            opacity: 1 - t, background: i % 3 ? "#FFD9A0" : "#FF9A4A" }} />
        );
      })}
      {f >= SLAM && <Ring x={560} y={500} f={f} at={SLAM} c="#FFC98A" />}
      {f >= SLAM && <Puff x={330} y={502} f={f} at={SLAM} c="#5A3A86" />}
      {f >= SLAM && <Puff x={800} y={502} f={f} at={SLAM + 1} c="#5A3A86" />}

      {/* ⭐ WHAT THE CLAUDE DOES: he is right under it, braced, and the slam knocks
          him back. The heat is the arc starting — patience wearing thin. */}
      <Hero f={f} x={116} y={GY + 40} size={236} z={66} costume={{ constr: 1 }}
        act={1} ph={0.7} gaze={0.7}
        strain={Math.max(0, kick) * 0.7 + drop * 0.3 * (1 - lift)}
        drive={-Math.max(0, kick) * 0.34}
        shock={Math.max(0, kick) * 1.0}
        heat={E(f, 0, dur, 0.12, 0.46, LIN) + Math.max(0, kick) * 0.22}
        stern={E(f, 0, dur, 0.5, 0.9, LIN)} />

      <Crew f={f} x={946} y={GY + 44} i={7} size={150} z={54} at={6} loop={3} flip />
      <Mark x={862} y={BAND_Y - 34} s={78} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE STACK — "Usually when you ask Claude to design, you get an ugly
   generic template."
   ⭐ THE RECOGNITION IS THE POINT (§15): every board on the belt is the same
   real page — purple gradient hero, centred blob, one button — at real
   proportions, because a viewer identifies that in under a second and an
   abstract slab carries one bit.
   EVENT: before, an empty floor and a running belt · trigger, the first board
   arrives at f6 · travel, boards cross the FULL panel width one every 9 frames
   · arrival, the wall grows to twelve and the hero is buried holding four.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stack");
  /* ⛔⛔⛔ REBUILT. Alex: *"the animation at 7 seconds needs to be completely
     redone to a way better concept for what's being spoken."* 7.0s is this
     scene's local frame 37. The old version was a belt carrying identical purple
     pages into a stack — literally true, and inert: a conveyor is a fact, not a
     joke, and a viewer had nothing to want.

     ⭐ THE LINE IS *"usually when you ask Claude to design, you GET an ugly
     generic template"* — a transaction with a bad outcome. So it is a VENDING
     MACHINE. Behind the glass are a dozen genuinely different designs, lit, all
     of them things you would want. He presses a button. The same purple slop page
     drops. He presses a DIFFERENT button. Same page. A third. Same page.
     ⭐ THE JOKE IS THE MECHANISM: whichever button he hits, the SAME coil turns.
     That is the whole complaint about generic AI design in one picture, it is a
     transaction like the sentence, and it escalates three times — "every single
     time" made visible rather than stated. */
  const PRESS = [10, 30, 50];                    /* three attempts */
  const DROP = PRESS.map((t) => t + 9);
  const got = DROP.filter((t) => f >= t + 8).length;
  const MX = 430 + LAY[v].main * 0.28, MY = 660;
  const MW = 540, MH = 470;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.36} glow={hexa(p.key, 0.18)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="joist"
        rake={0.15} rakeX={RAKE_X[v]} rakeRate={5.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: MX, y: 150, r: 320 }} />

      {/* a row of the same machine receding, because it is not one machine */}
      {[0, 1].map((i) => (
        <div key={"bg" + i} style={{ position: "absolute", left: i ? 880 : -110, top: 268,
          width: 300, height: 420, zIndex: 16, borderRadius: 8, opacity: 0.5,
          background: "linear-gradient(172deg, #2A323C 0%, #131920 100%)" }}>
          <div style={{ position: "absolute", left: 22, top: 22, width: 214, height: 250,
            background: hexa("#7FA8C0", 0.16), borderRadius: 4 }} />
        </div>
      ))}

      {/* ⭐ THE MACHINE */}
      <div style={{ position: "absolute", left: MX - MW / 2, top: MY - MH, width: MW,
        height: MH, zIndex: 40, borderRadius: 10,
        background: "linear-gradient(168deg, #39434F 0%, #10151B 100%)",
        border: "6px solid #0A0E13" }}>
        {/* the lit glass, and behind it a dozen designs you cannot have */}
        <div style={{ position: "absolute", left: 22, top: 22, width: MW - 106, height: 300,
          borderRadius: 5, overflow: "hidden", background: "#0A0E13",
          boxShadow: `inset 0 8px 20px ${hexa("#000", 0.6)}` }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={"gd" + i} style={{ position: "absolute",
              left: 8 + (i % 4) * 105, top: 8 + Math.floor(i / 4) * 96,
              width: 97, height: 88, borderRadius: 3, overflow: "hidden",
              border: "2px solid #2E3844" }}>
              <DesignFace w={97} h={88} scheme={(i % 3) as 0 | 1 | 2} fill={1} live={0.95} />
            </div>
          ))}
          {/* the coils. ⭐ THE JOKE: only ONE of them ever turns. */}
          {Array.from({ length: 4 }, (_, i) => (
            <div key={"cl" + i} style={{ position: "absolute", left: 8 + i * 105, top: 292,
              width: 97, height: 8,
              background: `repeating-linear-gradient(90deg, ${hexa("#8FA3B4", 0.5)} 0 5px, transparent 5px 11px)`,
              transform: `translateX(${i === 1 ? (f * 2.2) % 11 : 0}px)` }} />
          ))}
          {/* the glass itself */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: `linear-gradient(104deg, ${hexa("#CFE4F2", 0.20)} 0%, ${hexa("#CFE4F2", 0)} 40%)` }} />
        </div>

        {/* the keypad — three buttons, and he tries all three */}
        {[0, 1, 2].map((i) => {
          const lit = f >= PRESS[i] && f < PRESS[i] + 14;
          const push = E(f, PRESS[i], PRESS[i] + 3, 0, 1, OUT) - E(f, PRESS[i] + 3, PRESS[i] + 12, 0, 1, OUT);
          return (
            <div key={"bt" + i} style={{ position: "absolute", left: MW - 76, top: 34 + i * 66,
              width: 50, height: 50, borderRadius: 8, zIndex: 3,
              transform: `translateY(${push * 5}px) scale(${1 - push * 0.06})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: lit ? mxh(GOLD, 0.14) : "linear-gradient(168deg, #4C5865 0%, #222A33 100%)",
              border: `3px solid ${lit ? dkh(GOLD, 0.30) : "#131920"}` }}>
              <span style={{ ...mono(22, 800), color: lit ? "#1A1206" : "#93A6B6" }}>
                {["A", "B", "C"][i]}
              </span>
            </div>
          );
        })}
        {/* the maker's plate */}
        <div style={{ position: "absolute", left: MW - 84, top: 236, width: 66, height: 26,
          borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
          background: `linear-gradient(168deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.34)} 100%)` }}>
          <span style={{ ...mono(13, 800), color: "#1A1206", letterSpacing: 1 }}>STOCK</span>
        </div>

        {/* the delivery tray, and what is in it */}
        <div style={{ position: "absolute", left: 22, top: 340, width: MW - 106, height: 100,
          borderRadius: 5, background: "#080B0F",
          boxShadow: `inset 0 10px 22px ${hexa("#000", 0.72)}` }} />
        <div style={{ position: "absolute", left: 22, top: 336, width: MW - 106, height: 12,
          background: "#1E262E" }} />
      </div>

      {/* ⭐ THE SAME PAGE, THREE TIMES. It falls through the glass front's own
          slot and lands in the tray — and it is the same one every time, which is
          the sentence. */}
      {DROP.map((at, i) => {
        if (f < at) return null;
        const t = E(f, at, at + 8, 0, 1, IN_Q);
        const sq = squash(f - at, 8, 0.22, 3, 8);
        const w0 = 150, h0 = 96;
        return (
          <div key={"sl" + i} style={{ position: "absolute",
            /* ⛔ they were landing 70px BELOW the tray floor. The tray is at the
               machine's own y 340..440, i.e. absolute 530..630. */
            left: MX - 172 + i * 116, top: (MY - MH + 296) + t * 130,
            width: w0, height: h0, zIndex: 52, borderRadius: 3, overflow: "hidden",
            border: "3px solid #1A1424",
            transform: `rotate(${-6 + i * 5 + (1 - t) * 22}deg) scaleY(${sq})` }}>
            <SlopFace w={w0} h={h0} />
          </div>
        );
      })}
      {DROP.map((at, i) => (f >= at + 7 && f < at + 22
        ? <Puff key={"pf" + i} x={MX - 100 + i * 118} y={MY - 118} f={f} at={at + 7} c="#2A2438" />
        : null))}

      {/* ⭐ WHAT THE CLAUDE DOES: he presses A, then B, then C, and gets angrier
          each time. `heat` runs to 0.9 by the third — this is the emotional low of
          the reel and it is what makes the payoff worth anything. */}
      {/* ⛔ he was cropped by the right edge and too small to read the anger on */}
      <Hero f={f} x={MX + 344} y={GY + 22} size={266} z={62} costume={{ glasses: 1 }}
        act={1} ph={2.1} reach={104}
        drive={PRESS.reduce((a2, t) => a2 - (E(f, t - 4, t + 2, 0, 1, IN_Q) - E(f, t + 2, t + 14, 0, 1, OUT)), 0) * 0.42}
        heat={E(f, PRESS[0], dur - 4, 0.22, 0.90, LIN)}
        stern={E(f, PRESS[0], dur - 4, 0.4, 1, LIN)}
        shock={DROP.reduce((a2, t) => a2 + (E(f, t + 6, t + 12, 0, 0.7, OUT) - E(f, t + 12, t + 26, 0, 0.7, OUT)), 0)}
        gaze={-0.35} />

      {/* ⛔ "1 TRIES". A counter that reads as broken English undoes the joke it
          is counting. */}
      <Chip t={got === 1 ? "1 TRY · THE SAME PAGE" : `${got} TRIES · THE SAME PAGE`}
        y={BAND_Y} x={64} c="#F0ECE0" fg="#171B22" />
      <Mark x={860} y={BAND_Y - 30} s={74} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE DESK — "But now you just open your Claude and type forward slash
   design,"
   ⭐ THE LITERAL LAYER: the real command, typed into a real terminal, landing
   its last character on the spoken word, with a 78px cursor (§28) and a key
   that visibly TRAVELS under it.
   EVENT: before, a dark terminal at a lit desk · trigger, the cursor arrives ·
   travel, the command types across 28 frames · arrival, ENTER depresses, the
   reward stack fires CONTAINED, and the canvas link prints.
   ⛔ THE REWARD IS CONTAINED — a bloom at 6.6% of frame width, never a screen
   flash (`feedback_no_flashing_transitions`; §16 is a reel that shipped one).
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk");
  const CMD = "/design";
  const T0 = 2, T1 = 66;                         /* the command lands ON "design" f66 */
  const nch = Math.max(0, Math.min(CMD.length, Math.floor(E(f, T0, T1, 0, CMD.length + 0.4, LIN))));
  const ENT = 68;                                     /* just after "design" f66 */
  const hit = E(f, ENT, ENT + 4, 0, 1, OUT) - E(f, ENT + 4, ENT + 20, 0, 1, OUT);
  const link = E(f, ENT + 8, ENT + 22, 0, 1, OUT);
  /* ⛔ the punch is a CUT, not a drift, and safe centres are computed against it */
  /* ⛔⛔ THE PUNCH CROPPED THE SUBJECT OFF THE FRAME. §17: a punch-in crops
     HARDER than the push and only AFTER the cut, so a layout that passes a
     frame-0 check loses its edge at the punch — 1.20 with a -46px offset put the
     `/de` of `/design` outside the panel and the whole scene read as a black
     rectangle with a smudge in it. The punch is now 1.12 and pushes RIGHT, and
     the terminal sits inside `506 - 486/(1.12*1.048*1.054) = 113 .. 899`. */
  const punch = f >= ENT ? 1.12 : 1.0;
  const cx = 512 + LAY[v].main * 0.24;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.048]} vig={0.44} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="lampbar"
        rake={0.13} rakeX={RAKE_X[v]} rakeRate={4.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.7} lamp={{ x: 236, y: 186, r: 290 }} />

      {/* ⛔⛔ THIS SCENE MEASURED 5.99 (the only STATIC one) AND DIED INTO ITS
          CUT AT 0.45, and the diagnosis was not the typing — it was that
          NOTHING LARGE MOVED. A terminal, a desk and a hero are three static
          masses; the only travel was a 78px cursor and eight sparks. Two fixes,
          both of them "more of the mechanism" rather than a foreign element:
          the works behind is now a real run at full strength, and the thing the
          command PRODUCES leaves the terminal and climbs out of frame. */}
      <Spur y={140} f={f} z={20} rate={9.4} pitch={186} c={SODIUM} on={0.88} />

      <Cam s={punch} x={f >= ENT ? 34 : 0} y={f >= ENT ? -26 : 0} z={30}>
        {/* the desk — a real bench with a front edge, a leg and a shadow */}
        <div style={{ position: "absolute", left: 96, top: GY - 150, width: 850, height: 34,
          zIndex: 40, borderRadius: 3,
          background: `linear-gradient(178deg, ${mxh("#6A4A20", 0.30)} 0%, #2C1C08 100%)` }} />
        <div style={{ position: "absolute", left: 176, top: GY - 118, width: 34, height: 150,
          zIndex: 39, background: "#221606" }} />
        <div style={{ position: "absolute", left: 820, top: GY - 118, width: 34, height: 150,
          zIndex: 39, background: "#221606" }} />
        <Contact x={cx} y={GY - 112} w={700} z={38} o={0.42} />

        {/* ⭐⭐⭐ THE REAL COMPOSER, from Anthropic's own release-note demo: the
            actual Claude Code input box with `/design` in it, the real control row,
            the real model chip. `realK` reveals it left to right as the command is
            typed, so the beat is unchanged and what a viewer sees is the product
            rather than my drawing of it. */}
        {/* ⛔⛔ AT 9 SECONDS THIS WAS AN EMPTY DARK RECTANGLE. The typing did not
            start until local f40 and the real composer did not appear until f66,
            so more than half the scene was a black screen with a cursor floating
            in it and the hero cropped to a head at the bottom edge.
            ⭐ The composer is on screen from frame 1 with an EMPTY input — which
            is what the app actually looks like before you type — and the scrollback
            above it is already running. What changes is that `/design` types INTO
            it. Wider, taller, and moved up so the hero fits underneath. */}
        {/* ⛔ `composer_empty.png` was not empty — the demo's very first frame
            already has the command in it, so the "before" state showed the whole
            thing typed. There is no pre-typed state now: the command WIPES IN from
            frame 2 and completes exactly on the spoken word, so the screen is
            never blank and never ahead of the voice. */}
        <Terminal x={cx} y={GY - 150} w={840} h={452} z={44} f={f} cmd={2.0}
          real={COMPOSER} realK={E(f, T0, T1, 0, 1, LIN)}
          typed={CMD.slice(0, nch)} link={link} hit={Math.max(0, hit)} />

        {/* ⭐ the contained reward — 6.6% of frame width, on the terminal only */}
        {f >= ENT && f < ENT + 26 && (<>
          <div style={{ position: "absolute", left: cx - 34, top: GY - 262, width: 68, height: 68,
            borderRadius: "50%", zIndex: 46,
            background: `radial-gradient(50% 50% at 50% 50%, ${hexa(LIVE, 0.72 * (1 - (f - ENT) / 26))} 0%, ${hexa(LIVE, 0)} 72%)` }} />
          <Ring x={cx} y={GY - 230} f={f} at={ENT} c={LIVE} />
          <Ring x={cx} y={GY - 230} f={f} at={ENT + 5} c="#EADFC4" />
          {Array.from({ length: 8 }, (_, i) => {
            const t = (f - ENT) / 22, a = (i / 8) * Math.PI * 2 + 0.4;
            return (
              <div key={"sk" + i} style={{ position: "absolute",
                left: cx + Math.cos(a) * 190 * t - 6,
                top: GY - 230 + Math.sin(a) * 150 * t + t * t * 76 - 6,
                width: 13, height: 13, borderRadius: "50%", zIndex: 47,
                opacity: 1 - t, background: i % 2 ? LIVE : GOLD }} />
            );
          })}
        </>)}

        {/* ⭐ WHAT THE CLAUDE DOES: he drives ENTER down with his whole body —
            a distance, not a state change (§11). */}
        {/* ⛔ THE HERO WAS STANDING ON THE COMMAND. At cx-372 he sat exactly on
            the prompt line's x, so the one string the scene exists to make
            readable had a 244px sprite in front of it. He works the desk from
            the near edge instead, below the prompt and in front of the bench. */}
        {/* ⭐ THE TURN OF THE ARC: the heat he carried out of S2 drains away over
            the first half-second here, which is the moment the reel is about. */}
        {/* ⛔ he was cropped to a head at the bottom edge */}
        <Hero f={f} x={cx - 424} y={GY + 8} size={236} z={62} costume={{ glasses: 1 }}
          act={1} ph={1.2} reach={104}
          heat={E(f, 0, 16, 0.72, 0, LIN)}
          stern={E(f, 0, 16, 0.8, 0.15, LIN)}
          gaze={E(f, 0, 20, -0.2, 0.5, LIN)}
          drive={E(f, ENT - 4, ENT + 3, 0, 1, IN_Q) - E(f, ENT + 3, ENT + 20, 0, 1, OUT)}
          shock={E(f, ENT, ENT + 6, 0, 0.7, OUT) - E(f, ENT + 6, ENT + 22, 0, 0.7, OUT)}
          cheer={link * 0.95} />

        {/* the 78px cursor, travelling in and pressing */}
        <Cursor x={E(f, 4, ENT - 2, 200, cx + 128, IO)}
          y={E(f, 4, ENT - 2, GY - 400, GY - 214, IO)} z={88}
          click={f >= ENT ? (f - ENT) / 20 : -1} grab={0} />
      </Cam>

      {/* ⭐ WHAT THE COMMAND PRODUCES, LEAVING. The canvas is a LINK, and the
          board it points at rises out of the terminal and climbs past the top of
          the panel — a 340px object crossing 470px, `LIN`, still travelling on
          the frame S4 cuts in. It is the same board S4 opens on, so the cut is a
          MATCH rather than a jump. */}
      {/* ⛔ AND IT WAS DRAWN OVER THE TERMINAL — a dark board on a dark screen
          has no edge, which is §6.5 twice in one shot. It leaves from ABOVE the
          terminal's top edge and climbs out of frame, so it is always against
          the lit wall, never against the screen. */}
      {/* ⭐⭐ AND IT IS ARTBOARD**S**, PLURAL. One board leaving still left the
          last eight frames at 0.60 — the terminal, the desk and the hero are
          three static masses and a single climbing object could not carry them.
          The command publishes a CANVAS, so three boards leave on a stagger,
          all `LIN`, all still climbing on the frame the cut lands, which is the
          tail AND the thing the release note actually describes. */}
      {[0, 1, 2].map((i) => {
        const at = ENT + 3 + i * 6;
        if (f < at) return null;
        const rise = E(f, at, dur + 30, 0, 470, LIN);
        return (
          <Board key={"pb" + i} x={cx + 214 - i * 178} y={GY - 486 - rise}
            w={332 - i * 26} h={210 - i * 16} z={70 - i} state={1}
            design={(i % 3) as 0 | 1 | 2} fill={seat(f, at)} live={1}
            rot={-8 + i * 7 + rise * 0.012} edge="#3A4450" />
        );
      })}

      {/* ⛔ ONE chip, and it carries the RECEIPT the docs give: this is a
          research preview with a version gate, and the frame says so. */}
      {/* ⛔⛔ THE RECEIPT LIVES HERE NOW. The hook band claims a VALUE and no
          longer carries the small print (Alex, 2026-08-30), so it lands on the
          scene where the command is typed — the exact moment a viewer decides
          to go and try it, and the moment they need to know it is a research
          preview behind a version gate and a paid plan. Dropping it from the
          reel entirely would leave the frame claiming something the product
          does not do; moving it keeps the hook to one claim and one picture. */}
      <Chip t={`${R.status} · ${R.needs} · PRO / MAX / TEAM`} y={BAND_Y} x={62}
        c={CLAY} fg="#FFF6EA" />
      <Mark x={866} y={BAND_Y - 32} s={76} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE FLOOR, RE-LIT — "and this connects your local project straight to a
   visual canvas."
   §10: the verb is CONNECTS, so the picture is a CONNECTION BEING MADE, not a
   canvas already lit. ⭐ Same geometry as the hook under the opposite lighting,
   which is what makes a returning set a callback rather than a repeat.
   EVENT: before, the board dark on the floor and a crate at the left edge ·
   trigger, the hero hauls the coupling across (f8) · travel, it crosses ~560px
   and the spur charges · arrival, the board comes UP on "canvas" (f62) and its
   three faces fill one after another, ascending.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floorlit");
  /* ⛔⛔⛔ REBUILT AGAIN. Alex: *"the visual canvas section needs to be way more
     interesting, like make it an actual canvas."* The previous version was a grey
     ruled BOARD hanging on a wall in a teal room: nothing in the frame said
     pan/zoom canvas, which is exactly what the header over it claims.

     ⭐ THE WHOLE PANEL IS NOW THE CANVAS. A dot grid that translates and scales
     with the view, artboards standing on it with name tabs, a real toolbar, a
     zoom read-out whose number changes, a cursor that selects. And it PANS AND
     ZOOMS for the whole scene, `LIN`, still moving at the cut — which is the one
     thing the sentence actually promises and the one thing the old version never
     did.

     ⛔ AND IT IS STILL A SCENE, NOT A SCREENSHOT. "Object scenes not UI" is about
     the HOOK; here the canvas is the SUBJECT of the line. What keeps it a place
     is that the hero stands ON it — the canvas is the GROUND, the boards stand up
     out of it, and he walks between them. */
  const LOCK = 10;                                   /* "connects" */
  const LIT = 67;                                    /* "canvas"   */
  /* the view: it pushes in and drifts the whole scene. This is the pan/zoom. */
  const zoom = 0.72 + E(f, 0, dur + 26, 0, 0.46, LIN);
  const panX = E(f, 0, dur + 26, -150, 210, LIN);
  const panY = E(f, 0, dur + 26, -40, 74, LIN);
  const live = E(f, LOCK, LOCK + 8, 0, 1, OUT);
  const chrome = E(f, 4, 16, 0, 1, OUT);
  /* six pieces stream out of the repo and each becomes a board */
  /* ⛔ the first board used to land at f37 of 91, so the scene opened on an
     empty grid. The feed starts at f8 and the first board is up by f26. */
  const SEND = [8, 14, 20, 26, 32, 38, 46, 54, 62, 70, 78, 86];
  const SEAT_AT = [26, 44, 62];
  const SEAT = [
    { x: 300, y: 300, w: 300, h: 180, s: 0, l: "HOME" },
    { x: 700, y: 286, w: 268, h: 168, s: 1, l: "SETTINGS" },
    { x: 486, y: 556, w: 396, h: 200, s: 2, l: "BILLING" },
  ];
  const cx0 = 210, cy0 = 470;                        /* the repo, canvas-space */
  const toS = (x: number, y: number): [number, number] =>
    [W / 2 + (x - W / 2 + panX) * zoom, H / 2 + (y - H / 2 + panY) * zoom];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.020]} vig={0.30} glow={hexa(LIVE, 0.16 + live * 0.14)}>
      <CanvasGround x={panX} y={panY} z={10} zoom={zoom} f={f} />

      {/* ⭐ THE REPO, AS A NODE ON THE CANVAS — it is where the material comes
          from, so it lives on the surface rather than being furniture beside it */}
      {(() => {
        const [sx, sy] = toS(cx0, cy0);
        const w = 196 * zoom, h = 132 * zoom;
        return (
          <div style={{ position: "absolute", left: sx - w / 2, top: sy - h / 2,
            width: w, height: h, zIndex: 40, borderRadius: 6 * zoom,
            background: "linear-gradient(168deg, #2A2218 0%, #150F08 100%)",
            border: `${3 * zoom}px solid #4A3C28` }}>
            <div style={{ position: "absolute", left: "10%", top: "16%", width: "80%",
              height: "26%", borderRadius: 3, background: hexa("#F0EADC", 0.92),
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...mono(15 * zoom, 800), color: "#1A1813" }}>YOUR REPO</span>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={"ln" + i} style={{ position: "absolute", left: "10%",
                top: `${52 + i * 14}%`, width: `${64 - i * 14}%`, height: 5 * zoom,
                borderRadius: 2, background: hexa(OWN[i], 0.72) }} />
            ))}
            <div style={{ position: "absolute", inset: 0,
              background: `radial-gradient(50% 50% at 50% 50%, ${hexa(LIVE, 0.30 * live)} 0%, ${hexa(LIVE, 0)} 74%)` }} />
          </div>
        );
      })()}

      {/* ⭐ THE WIRE — a real connection drawn ON the canvas, from the repo node
          to each board, the way a canvas actually shows a link */}
      {SEAT.map((t, i) => {
        const k = E(f, LOCK, LOCK + 10 + i * 6, 0, 1, OUT);
        if (k <= 0.01) return null;
        const [ax, ay] = toS(cx0 + 98, cy0);
        const [bx, by] = toS(t.x, t.y + t.h / 2);
        return (
          <svg key={"wr" + i} style={{ position: "absolute", inset: 0, zIndex: 34 }}
            width={W} height={H}>
            <path d={`M ${ax} ${ay} C ${ax + 150 * zoom} ${ay}, ${bx - 150 * zoom} ${by}, ${bx} ${by}`}
              fill="none" stroke={hexa(LIVE, 0.62)} strokeWidth={3.4 * zoom}
              strokeDasharray={`${14 * zoom} ${10 * zoom}`}
              strokeDashoffset={-f * 5} pathLength={1} opacity={k} />
          </svg>
        );
      })}

      {/* the pieces travelling the wire */}
      {SEND.map((at, i) => {
        if (f < at) return null;
        const t = E(f, at, at + 16, 0, 1, LIN);
        if (t >= 1) return null;
        const tg = SEAT[i % 3];
        const [ax, ay] = toS(cx0 + 98, cy0);
        const [bx, by] = toS(tg.x, tg.y + tg.h / 2);
        const px = ax + (bx - ax) * t, py = ay + (by - ay) * t - Math.sin(t * Math.PI) * 70 * zoom;
        const sz = 56 * zoom;
        return (
          <div key={"cy" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz * 0.36,
            width: sz, height: sz * 0.72, zIndex: 76, borderRadius: 3 * zoom,
            transform: `rotate(${t * 22}deg)`,
            background: `linear-gradient(166deg, ${mxh(OWN[i % OWN.length], 0.30)} 0%, ${dkh(OWN[i % OWN.length], 0.26)} 100%)`,
            border: `${2.4 * zoom}px solid ${dkh(OWN[i % OWN.length], 0.50)}` }} />
        );
      })}

      {/* ⭐ THE ARTBOARDS, standing on the canvas at three different sizes */}
      {SEAT.map((t, i) => {
        const at = SEAT_AT[i];
        const [sx, sy] = toS(t.x, t.y);
        return (
          <React.Fragment key={"ab" + i}>
            <Artboard x={sx} y={sy} w={t.w * zoom} h={t.h * zoom} z={60 + i}
              design={t.s as 0 | 1 | 2} k={E(f, at, at + 8, 0, 1, BACK)} fill={seat(f, at)}
              label={t.l} />
            {f >= at && f < at + 16 && <Ring x={sx} y={sy} f={f} at={at} c={LIVE} />}
          </React.Fragment>
        );
      })}

      {/* ⭐ WHAT THE CLAUDE DOES: he stands ON the canvas and walks between the
          boards as they land — which is what keeps this a SET and not a
          screenshot. He is placed in canvas space so the pan carries him too. */}
      {(() => {
        const [hx, hy] = toS(452 + E(f, 20, dur, 0, 190, LIN), 700);
        return (
          <Hero f={f} x={hx} y={hy} size={214 * zoom} z={70} costume={{ constr: 1 }}
            act={0} ph={0.4} drive={0.14} gaze={live * 0.5}
            shock={E(f, LIT, LIT + 6, 0, 0.85, OUT) - E(f, LIT + 6, LIT + 24, 0, 0.85, OUT)}
            cheer={E(f, SEAT_AT[2] + 6, SEAT_AT[2] + 16, 0, 1, OUT)} />
        );
      })()}

      {/* the cursor, selecting the board that just landed */}
      {(() => {
        const [px, py] = toS(SEAT[2].x - 40, SEAT[2].y - 30);
        const t = E(f, SEAT_AT[2] - 8, SEAT_AT[2] + 4, 0, 1, IO);
        const [qx, qy] = toS(SEAT[0].x + 120, SEAT[0].y + 60);
        return <Cursor x={qx + (px - qx) * t} y={qy + (py - qy) * t} z={90} s={74 * zoom}
          click={f >= SEAT_AT[2] ? (f - SEAT_AT[2]) / 18 : -1} />;
      })()}

      <CanvasChrome zoom={zoom} f={f} k={chrome} />
      <Mark x={866} y={BAND_Y - 32} s={76} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE DESK, COLDER — "Then you run slash design sync"
   ⭐ DENSITY IS A SHAPE, NOT A LEVEL (§9). This is deliberately one of the two
   THIN scenes so the peak at S8 can carry the reel's density. It is 55 frames
   and it does exactly one thing.
   EVENT: before, the same desk under green screen-light · trigger, the cursor
   lands · travel, `/design-sync` types across 26 frames · arrival, it fires on
   "sync" (f37) with a smaller reward than S3's, and the pull starts.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("desk2");
  const CMD = "/design-sync";
  const T0 = 4, T1 = 30;
  const nch = Math.max(0, Math.min(CMD.length, Math.floor(E(f, T0, T1, 0, CMD.length + 0.4, LIN))));
  const ENT = 33;                                     /* "sync", derived f32 */
  const hit = E(f, ENT, ENT + 4, 0, 1, OUT) - E(f, ENT + 4, ENT + 18, 0, 1, OUT);
  const cx = 512 + LAY[v].sec * 0.22;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.088]} vig={0.42} glow={hexa(p.key, 0.20)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="house" overhead="duct"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.6} lamp={{ x: cx, y: 300, r: 340 }} />

      {/* ⛔ the tail must not go still — the pull starts on the same frame the
          command fires and runs LIN straight through the cut into S6. */}
      {/* ⛔ THE RUN ONLY STARTED AT f37 OF 55, so two thirds of the scene had no
          large travelling object at all and it measured 6.14. The works do not
          stop while you type — it runs from frame 1 and STEPS UP when the
          command fires, which is also the honest picture. */}
      <Spur y={124} f={f} z={76} rate={8.2 + E(f, ENT, ENT + 6, 0, 6.0, LIN)}
        pitch={158} c={p.key} on={0.62 + E(f, ENT, ENT + 6, 0, 0.38, LIN)} />

      <div style={{ position: "absolute", left: 96, top: GY - 84, width: 830, height: 32,
        zIndex: 40, borderRadius: 3,
        background: `linear-gradient(178deg, ${mxh("#1E4030", 0.24)} 0%, #0A1A12 100%)` }} />
      <Terminal x={cx} y={GY - 84} w={796} h={402} z={44} f={f} cmd={1.7}
        typed={CMD.slice(0, nch)} hit={Math.max(0, hit)} link={0} />

      {f >= ENT && f < ENT + 22 && (<>
        <Ring x={cx} y={GY - 244} f={f} at={ENT} c={p.key} />
        <div style={{ position: "absolute", left: cx - 30, top: GY - 274, width: 60, height: 60,
          borderRadius: "50%", zIndex: 46,
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(p.key, 0.60 * (1 - (f - ENT) / 22))} 0%, ${hexa(p.key, 0)} 72%)` }} />
      </>)}

      {/* ⭐ WHAT THE CLAUDE DOES: same desk, back to camera, the second command */}
      <Hero f={f} x={cx - 392} y={GY} size={228} z={62} costume={{ glasses: 1 }}
        act={1} ph={2.6} reach={98} gaze={0.45}
        drive={E(f, ENT - 4, ENT + 3, 0, 1, IN_Q) - E(f, ENT + 3, ENT + 18, 0, 1, OUT)}
        cheer={E(f, ENT + 4, ENT + 12, 0, 0.75, OUT)} />
      <Cursor x={E(f, 2, ENT - 2, 262, cx + 150, IO)}
        y={E(f, 2, ENT - 2, GY - 392, GY - 222, IO)} z={88}
        click={f >= ENT ? (f - ENT) / 18 : -1} />

      <Mark x={868} y={BAND_Y - 32} s={74} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE CODE STORE — "so Claude actually reads your existing codebase."
   §10: *a scan that surfaces nothing is a progress bar.* The head travels AND
   it produces — a drawer comes out behind it at every step, each with a real
   part visible in it, and the parts travel away up the spur.
   ⛔ AND IT IS ONE COMPONENT AT A TIME, because that is what the tool's own
   definition says it does. A wholesale swap would be a different product.
   EVENT: before, a closed rack under one hard key · trigger, the head starts at
   f4 · travel, it crosses ~700px of rack face · arrival, eleven drawers are
   out and eleven parts are on the spur by "codebase" (f45).
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("store");
  const N = 20;
  const trav = E(f, 4, dur + 8, 0, 1, LIN);          /* ⛔ LIN across the cut */
  const hx = 128 + LAY[v].main * 0.22 + trav * 748;
  const out = Array.from({ length: N }, (_, i) => {
    const cx = 168 + LAY[v].main * 0.22 + (i % 5) * 152;
    return E(hx, cx - 40, cx + 54, 0, 1, OUT) * (i % 5 <= 4 ? 1 : 0);
  });
  const lifted = out.filter((o) => o > 0.55).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.076]} vig={0.40} glow={hexa(p.key, 0.18)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="rack" overhead="tray"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={6.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: 210, y: 168, r: 300 }} />

      <CodeRack x={512 + LAY[v].main * 0.22} y={GY - 46} w={800} h={368} z={30}
        cols={5} rows={4} out={out} f={f} />

      {/* ⭐ THE FINDINGS — a part leaves the rack for every drawer that opens and
          travels up onto the spur. 62x46, over the 40px floor. */}
      {out.map((o, i) => {
        if (o < 0.55) return null;
        const t = Math.min(1, (o - 0.55) / 0.45 + (f - 4) * 0.004);
        const cx = 168 + LAY[v].main * 0.22 + (i % 5) * 152, cy = GY - 400 + Math.floor(i / 5) * 90;
        return (
          <div key={"pt" + i} style={{ position: "absolute",
            left: cx - 31 + t * (760 - cx), top: cy - t * (cy - 168) - 23,
            width: 62, height: 46, zIndex: 74, borderRadius: 3,
            background: `linear-gradient(166deg, ${mxh(OWN[i % OWN.length], 0.26)} 0%, ${dkh(OWN[i % OWN.length], 0.30)} 100%)`,
            border: `3px solid ${dkh(OWN[i % OWN.length], 0.52)}`,
            transform: `rotate(${t * 18}deg)` }} />
        );
      })}

      <Spur y={166} f={f} z={76} rate={12.2} pitch={164} c={p.key} on={0.9} />
      <ReaderHead x={hx} y={GY - 400} h={352} z={70} f={f} c={p.key} />

      {/* the occluder */}
      <div style={{ position: "absolute", left: 930, top: 168, width: 126, height: 680,
        zIndex: 79, borderRadius: 4,
        background: `linear-gradient(266deg, #16323C 0%, #050E12 100%)` }} />

      {/* ⭐ WHAT THE CLAUDE DOES: he walks the head down the rack, hand on it */}
      <Hero f={f} x={hx - 148} y={GY} size={222} z={62} costume={{ constr: 1 }}
        act={0} ph={1.1} reach={86} drive={0.12}
        gaze={0.4 + Math.sin(f / 9) * 0.5}
        cheer={E(f, dur - 22, dur - 8, 0, 0.6, OUT)} />

      {/* ⛔ NOT the sentence again — a COUNT the header does not carry, and it
          MOVES to its value rather than being typeset at it. */}
      <Chip t={`${lifted} COMPONENTS READ`} y={BAND_Y} x={62} c="#F0ECE0" fg="#0A1A20" />
      <Mark x={862} y={BAND_Y - 32} s={74} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE INK BENCH — "It learns your exact brand colors and your custom
   parts."
   ⭐ §4: A NUMBER MOVES TO ITS VALUE, IT IS NEVER TYPESET AT IT. Five trays fill
   to five DIFFERENT levels in YOUR paint, and the five words on the bench are
   the tool's own group labels at 17px — the size a label actually is (§21).
   EVENT: before, five EMPTY bright trays and an empty case · trigger, the first
   pour at f6 · travel, five pours across the full duration on an ascending run
   · arrival, the case fills behind him, one compartment at a time.
   ⛔ THE TRAYS AND THE CASE READ WHILE EMPTY — bright recessed plates, not black
   holes. Empty is the promise.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  /* ⛔⛔⛔ THIS SCENE WAS REBUILT, NOT TUNED. It measured 4.15 STATIC, the only
     failing scene in the reel, and three rounds of re-spreading its beats moved
     it to 5.17 and no further. The frame strip said why in one look, and none of
     it was timing:
       · FIVE 128x166 PANS. Filling one is ~1.6% of the panel repainted. Five of
         those across 88 frames cannot register however they are spaced — the
         40px floor is really "survives the 1012->240 downsample", and an ink
         level rising inside a small pan is under it twice over.
       · NOTHING CAUSED THE POURS. Paint appeared above each tray with the hero
         standing to one side. §12: name what the CLAUDE DOES — the answer was
         "stands there while things happen around him", which is dead whatever
         the number says.
       · NO FULL-WIDTH TRAVELLING OBJECT. It was the one room in the works
         without one.
     ⭐ All three are the same fix: put the pouring on a GANTRY HEAD that travels
     the full width of the bench, let the hero WALK IT and pull the lever at each
     stop, and make the pans big enough that a level rising is a real area. The
     mechanism is unchanged and it is now the thing you watch. */
  const POUR = [12, 24, 36, 48, 60];   /* ⛔ was [8,24,40,56,72] in a 71-frame
                                         scene: the fifth pour fired at f72 and
                                         NEVER PLAYED. "brand" f15, "parts" f40. */
  const LEV = [0.88, 0.54, 0.72, 0.36, 0.64];       /* five DIFFERENT values */
  const PX = [118, 290, 462, 634, 806];             /* the five pans, 172 pitch */
  const caseFill = E(f, 20, dur + 26, 0, 1, LIN);   /* ⛔ LIN across the cut */

  /* ⭐ THE HEAD'S PATH — it is at each pan a few frames before that pan's pour,
     so the travel LEADS the event instead of following it, and it never stops
     for long: between stops it is crossing 172px in ~10 frames, which is the
     largest continuous repaint in the scene. */
  const stops = POUR.map((t, i) => [t - 6, PX[i]] as const);
  let hx = -150 + E(f, 0, stops[0][0], 0, PX[0] + 150, IO);
  for (let i = 1; i < stops.length; i++) {
    hx += E(f, stops[i - 1][0] + 9, stops[i][0], 0, PX[i] - PX[i - 1], IO);
  }
  hx += E(f, stops[4][0] + 9, dur + 14, 0, 260, LIN);   /* ⛔ still moving at the cut */

  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.30} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="joist"
        rake={0.11} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.5} lamp={{ x: 512, y: 132, r: 340 }}
        window={{ x: 838, y: 118, w: 168, h: 200 }} />

      {/* ⛔⛔ THIS RUN WAS ADDED, THEN SILENTLY DELETED BY MY OWN REWRITE OF THE
          SCENE, and the audit reported the rebuild as a 1.8-point gain when the
          single biggest lever in it was no longer in the file. A wholesale
          rewrite throws away every fix that lived in the text it replaces —
          re-grep for the thing you added, do not assume it survived.
          ⭐ AND IT IS THE SOURCE, which §10 says is the half usually missing: the
          pigment does not appear in the head, it is fed to it, and what feeds it
          is the codebase the scene before just read. */}
      <Spur y={154} f={f} z={68} rate={13.6} pitch={162} c={GOLD} on={0.92} />

      {/* the gantry rail the head runs on — full width, high contrast, and the
          thing that makes the head's travel read as a machine and not a float */}
      <div style={{ position: "absolute", left: -40, top: 196, width: W + 80, height: 26,
        zIndex: 66, background: `linear-gradient(178deg, ${mxh("#6E5A34", 0.30)} 0%, #2A2110 100%)` }} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: 40 + i * 190, top: 120,
          width: 11, height: 78, zIndex: 65, background: "#241B0C" }} />
      ))}

      {/* the bench top the pans stand on */}
      <div style={{ position: "absolute", left: -20, top: GY - 196, width: W + 40, height: 44,
        zIndex: 36, borderRadius: 3,
        background: `linear-gradient(178deg, ${mxh("#8A7248", 0.34)} 0%, #4A3A1C 100%)` }} />
      <div style={{ position: "absolute", left: -20, top: GY - 154, width: W + 40, height: 20,
        zIndex: 35, background: "#33260F" }} />

      {/* ⭐ FIVE PANS, 150x210 — two and a half times the area of the version that
          measured STATIC, and a full level is now 8.6% of the panel rather than
          1.6%. The five group names are the product's own words, at the 22px a
          label actually is. */}
      {LEV.map((lv, i) => (
        <InkTray key={"tr" + i} x={PX[i]} y={GY - 196} w={150} h={212} z={46}
          c={OWN[i]} f={f} label={R.groups[i]}
          fill={E(f, POUR[i], POUR[i] + 7, 0, lv, OUT)} />
      ))}

      {/* THE POURING HEAD — the travelling object, drawn as a real hopper with a
          spout, a sight glass and a lever. ⛔ Its z beats the rail AND the pans. */}
      <div style={{ position: "absolute", left: hx - 68, top: 208, width: 136, height: 148,
        zIndex: 72 }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 136, height: 96,
          borderRadius: 5,
          background: `linear-gradient(166deg, ${mxh(BRASS, 0.28)} 0%, ${dkh(BRASS, 0.44)} 100%)`,
          border: `5px solid ${dkh(BRASS, 0.62)}` }} />
        {/* the sight glass shows what it is carrying, and it changes per stop */}
        <div style={{ position: "absolute", left: 44, top: 18, width: 48, height: 58,
          borderRadius: 3, background: hexa("#F4EEDE", 0.30),
          border: `3px solid ${dkh(BRASS, 0.54)}` }}>
          <div style={{ position: "absolute", left: 3, top: 26, width: 36, height: 26,
            background: OWN[Math.min(4, POUR.filter((t) => f >= t - 6).length)] }} />
        </div>
        {/* the spout */}
        <div style={{ position: "absolute", left: 54, top: 92, width: 28, height: 44,
          background: `linear-gradient(90deg, ${dkh(BRASS, 0.50)} 0%, ${mxh(BRASS, 0.18)} 50%, ${dkh(BRASS, 0.50)} 100%)` }} />
        {/* the lever the hero pulls, and it MOVES on each pour */}
        <div style={{ position: "absolute", left: 4, top: 22, width: 12, height: 62,
          transformOrigin: "50% 0%",
          transform: `rotate(${POUR.reduce((acc, t) => acc + (E(f, t - 4, t, 0, 46, IN_Q) - E(f, t + 6, t + 18, 0, 46, OUT)), 0)}deg)`,
          background: dkh(STEEL, 0.34) }} />
        {/* the trolley wheels on the rail */}
        {[0, 1].map((i) => (
          <div key={"tw" + i} style={{ position: "absolute", left: 20 + i * 82, top: -22,
            width: 30, height: 30, borderRadius: "50%", background: dkh(STEEL, 0.22),
            border: `4px solid ${dkh(STEEL, 0.60)}`, transform: `rotate(${hx * 1.6}deg)` }}>
            <div style={{ position: "absolute", left: 11, top: 2, width: 4, height: 11,
              background: mxh(STEEL, 0.40) }} />
          </div>
        ))}
      </div>

      {/* the pour itself — a thick column from the head's spout into the pan */}
      {POUR.map((t, i) => {
        const k = E(f, t, t + 7, 0, 1, LIN) - E(f, t + 6, t + 11, 0, 1, LIN);
        if (k <= 0.01) return null;
        return (
          <React.Fragment key={"po" + i}>
            <div style={{ position: "absolute", left: PX[i] - 13, top: 348, width: 26,
              height: (GY - 196 - 212) + 212 * (1 - LEV[i] * E(f, t, t + 7, 0, 1, OUT)) - 348 + 30,
              zIndex: 70, opacity: Math.min(1, k * 2.2),
              background: `linear-gradient(180deg, ${hexa(OWN[i], 0)} 0%, ${mxh(OWN[i], 0.20)} 22%, ${OWN[i]} 100%)` }} />
            <Puff x={PX[i]} y={GY - 200} f={f} at={t + 2} c={OWN[i]} />
          </React.Fragment>
        );
      })}

      {/* the case behind — YOUR custom parts, one compartment at a time */}
      <PartsCase x={880} y={GY + 24} w={268} h={286} z={30} cols={3} rows={3}
        fill={caseFill} f={f} />

      {/* ⭐ WHAT THE CLAUDE DOES: he WALKS THE HEAD along the bench and pulls the
          lever at every stop. He is the reason the paint moves, and his own
          travel is the second large object crossing the frame. */}
      <Hero f={f} x={hx - 106} y={GY + 34} size={224} z={62} costume={{ chef: 1 }}
        act={1} ph={0.9} reach={104}
        drive={POUR.reduce((acc, t) => acc + (E(f, t - 5, t, 0, 1, IN_Q) - E(f, t, t + 14, 0, 1, OUT)), 0) * 0.6}
        gaze={0.35}
        cheer={POUR.reduce((acc, t) => acc + (E(f, t + 3, t + 9, 0, 1, OUT) - E(f, t + 9, t + 20, 0, 1, OUT)), 0) * 0.6
               + E(f, POUR[4] + 12, POUR[4] + 22, 0, 1, OUT) * 0.9} />
      {/* ⛔ NO FOREARM HERE. The first build ran one from the hero's arm at y598
          up to the head at y252 — 346px of clay standing vertically in the middle
          of the frame, the same "limb terminating in mid-air" shape that cost reel
          110 two rounds and that I had already deleted once in S4. The head
          carries its own lever; the hero's DRIVE is what connects them. */}

      <Crew f={f} x={196} y={GY + 58} i={4} size={136} z={54} at={6} loop={1} />
      <Mark x={874} y={BAND_Y - 32} s={74} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE FITTING FLOOR — "When you ask it to build a new page, it uses your
   existing design system instead of guessing."   ⭐⭐⭐ THE PEAK.
   ⛔ IT MUST BEAT THE HOOK. Density peaks here: parts arriving every 4 frames
   across the full duration, the plate swap, and the board coming up.
   EVENT: before, a blank board stood up and the press still holding the stock
   plate · trigger, the case opens at f14 · travel, thirteen parts cross the
   panel and land on the board · arrival, the STOCK PLATE IS UNBOLTED AND SWUNG
   OUT (f47) and the new plate drops into its place, and the board lights.
   ⭐ THE VILLAIN IS NOT ARGUED WITH, IT IS REPLACED — and the old plate stays
   visible, still purple, on the wall behind.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("fit");
  const OPEN = 36;                                   /* "uses",     derived f30 */
  const SWAP = 68;                                   /* "system",   derived f57 */
  const LIT = 89;                                    /* "guessing", derived f78 */
  const PUNCH = 30;
  const swap = E(f, SWAP, SWAP + 16, 0, 1, IO);
  /* ⭐⭐ THE PAGE IS BUILT BY THE PARTS, NOT BESIDE THEM. v1 ramped the board's
     content on its own clock while coloured squares landed in front of it, so
     the contact sheet showed exactly that: squares on a grey grid. `fill` is now
     the LANDED COUNT — every part that arrives puts its own row on the page, so
     the assembly a viewer watches IS the assembly they are being told about. */
  const landed = Array.from({ length: 14 }, (_, i) => OPEN + i * 6 + 11)
    .filter((t) => f >= t).length;
  const fill = Math.min(1, landed / 11) * 0.92
    + E(f, OPEN, dur + 18, 0, 0.08, LIN);
  const live = E(f, LIT, LIT + 10, 0, 1, OUT);
  const BX = 626 + LAY[v].main * 0.22;
  const punch = f >= PUNCH ? 1.20 : 1.0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.056]} vig={0.34} glow={hexa(p.key, 0.20 + live * 0.14)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="plant" overhead="gantry"
        rake={0.14} rakeX={RAKE_X[v]} rakeRate={7.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} lamp={{ x: BX, y: 138, r: 340 }} />

      <Spur y={142} f={f} z={76} rate={13.0} pitch={150} c={p.key} on={0.86} />

      <Cam s={punch} x={f >= PUNCH ? 40 : 0} y={f >= PUNCH ? -22 : 0} z={30}>
        {/* the press, cropped by the LEFT edge — the villain is in frame without
            being the subject, which is the occluder the depth check wants */}
        <div style={{ position: "absolute", left: -196, top: 152, zIndex: 34 }}>
          <StockPress x={0} y={GY + 20} s={0.86} z={34} f={f}
            plate={swap > 0.5 ? "own" : "stock"} swap={swap > 0.5 ? 0 : swap * 2} spin={0.7} />
        </div>
        {/* ⭐ the OLD plate, swung out and left hanging on the wall, still purple */}
        {swap > 0.02 && (
          <div style={{ position: "absolute", left: 74 + swap * 96, top: 232 - swap * 96,
            width: 216, height: 54, zIndex: 36, borderRadius: 3,
            transform: `rotate(${-8 - swap * 26}deg)`,
            background: `linear-gradient(160deg, ${SLOP2} 0%, ${SLOPD} 100%)`,
            border: `4px solid ${dkh(SLOPD, 0.40)}` }}>
            <div style={{ position: "absolute", left: "8%", top: "20%", width: "84%",
              height: "18%", background: hexa("#000", 0.34) }} />
            <div style={{ position: "absolute", left: "38%", top: "58%", width: "24%",
              height: "24%", borderRadius: 8, background: hexa("#000", 0.40) }} />
          </div>
        )}

        {/* the case the parts come out of */}
        <PartsCase x={188} y={GY - 8} w={292} h={252} z={40} cols={4} rows={3}
          fill={1 - E(f, OPEN, dur - 10, 0, 0.86, LIN)} f={f} />

        {/* THE BOARD, being built. It reads while EMPTY because the well is a
            lit recess, not a black hole. */}
        {/* ⛔⛔ THE PAGE WAS RENDERING AT 62% OPACITY OVER NEAR-BLACK, which is
            why every contact sheet showed "coloured squares on a grey grid": the
            board was carrying "not finished yet" as a DIMMER, and a dimmer on a
            dark ground removes the object rather than the emphasis. The page is
            at full value from its first row; what changes is the ROOM — the pool
            and the key come up on "guessing", which is where the emphasis
            actually belongs. */}
        <Board x={BX} y={430} w={620} h={396} z={48} state={fill > 0.04 ? 1 : 0}
          design={1} fill={fill} live={1} edge="#1B2C20" />
        <Contact x={BX} y={GY - 34} w={640} z={44} o={0.44} />
        {live > 0 && <Pool x={BX} y={GY - 40} w={720} c={p.key} o={0.30 * live} />}

        {/* ⭐ THE PARTS, arriving one every 4 frames across the FULL duration.
            Each is >= 56px, squashes on landing, and rings. */}
        {Array.from({ length: 14 }, (_, i) => {
          /* ⛔ ARRIVALS SPAN THE **FULL** DURATION. v1 put all thirteen inside
             f14-62 of a 101-frame scene, so the peak spent its last 39 frames on
             one plate swap and died into its cut at 0.65. Every 6 frames instead
             of every 4 puts the last one landing at f92 and the one after it
             still in the air when the cut happens. */
          const at = OPEN + i * 6;
          if (f < at) return null;
          const t = E(f, at, at + 11, 0, 1, IO);
          const sx = 188 + (i % 4) * 22 - 40, sy = GY - 150;
          const tx = BX - 240 + (i % 4) * 156, ty = 272 + Math.floor(i / 4) * 88;
          const sq = squash(f - at, 11, 0.20, 3, 9);
          return (
            <React.Fragment key={"pp" + i}>
              <div style={{ position: "absolute", left: sx + (tx - sx) * t - 48,
                top: sy + (ty - sy) * t - 36 - Math.sin(t * Math.PI) * 148,
                width: 96, height: 72, zIndex: 62, borderRadius: 4,
                transform: `rotate(${(1 - t) * 34}deg) scaleY(${sq})`,
                background: `linear-gradient(166deg, ${mxh(OWN[i % OWN.length], 0.28)} 0%, ${dkh(OWN[i % OWN.length], 0.28)} 100%)`,
                border: `3px solid ${dkh(OWN[i % OWN.length], 0.50)}` }} />
              {f >= at + 11 && f < at + 26 && (
                <Ring x={tx} y={ty} f={f} at={at + 11} c={p.key} />
              )}
            </React.Fragment>
          );
        })}

        {/* ⭐ WHAT THE CLAUDE DOES: he unbolts the stock plate and swings the new
            one in. The body strains through the swing — deformation is weight. */}
        {/* ⭐ THE TOP OF THE ARC. Effort into the swap — `heat` and `strain`
            together, which is exertion rather than anger — then it drops to zero
            and he is delighted, on the frame the board lights. */}
        <Hero f={f} x={330} y={GY} size={248} z={64} costume={{ constr: 1 }}
          act={1} ph={0.2} reach={110}
          strain={E(f, SWAP - 8, SWAP, 0, 0.85, IN_Q) - E(f, SWAP + 4, SWAP + 20, 0, 0.85, OUT)}
          heat={E(f, SWAP - 12, SWAP, 0, 0.66, IN_Q) - E(f, SWAP + 2, SWAP + 20, 0, 0.66, OUT)}
          shock={E(f, LIT, LIT + 6, 0, 0.9, OUT) - E(f, LIT + 6, LIT + 24, 0, 0.9, OUT)}
          drive={-E(f, SWAP - 6, SWAP + 4, 0, 0.55, IN_Q) + E(f, SWAP + 4, SWAP + 22, 0, 0.55, OUT)}
          cheer={live * 1.0} />

        <Crew f={f} x={906} y={GY + 12} i={6} size={144} z={54} at={20} loop={2} />
      </Cam>

      <Mark x={870} y={BAND_Y - 32} s={78} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE BOARD FACE — "And you can fix the layout by just clicking and
   dragging until you get the perfect result."
   ⛔⛔ THE LEDGER'S EDGE. The documented editing is click-to-select, a
   properties panel, inline text editing and undo/redo, so this STAGES direct
   manipulation and NO PLATE WRITES "DRAG" AS A FEATURE CLAIM (`DRAG_BANNED`).
   ⭐ §12: THE MECHANISM FAILS FIRST. The panel sticks, the guides bow, and THEN
   it comes — an effort that meets no resistance does not read as effort.
   EVENT: before, a finished board with one panel in the wrong place · trigger,
   the cursor clicks it (f12) and handles appear · travel, the hero walks it
   ~300px across the face · arrival, it snaps to a guide, the guide flashes, the
   layout settles and SAVED seats under it.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("close");
  /* ⛔ THE SCENE LOST 18 FRAMES AND KEPT ITS SHAPE, so the move all happened in
     the last third and the first 46 frames were a cursor arriving and waiting:
     9.30 -> 6.07. The beats are re-spread across the whole 94 and each one is on
     its own word — click on "fix" (f14), the panel taken hold of on "layout"
     (f24), the resistance through "by just" (f34-44), the move running from
     "clicking" (f45) and snapping on "perfect" (f78). */
  const CLICK = 14;                                  /* "fix",      derived f12 */
  const PUNCH = 40;
  const STICK = 34, GO = 49, SNAP = 79;   /* the panel sticks, comes free ON
                                             "dragging" f55, and snaps before
                                             "result" f81 */
  const sel = E(f, CLICK, CLICK + 6, 0, 1, OUT);
  /* the resistance, then the move. ⛔ `IN` past the snap so it does not
     decelerate into the cut. */
  const stick = E(f, STICK, GO, 0, 1, IO) - E(f, GO, GO + 6, 0, 1, OUT);
  const move = E(f, GO, SNAP, 0, 1, IO);
  const settle = f > SNAP ? Math.sin((f - SNAP) * 0.58) * Math.exp(-(f - SNAP) / 7.5) * 15 : 0;
  const saved = E(f, SNAP + 6, SNAP + 16, 0, 1, OUT);
  const pan = E(f, SNAP + 4, dur + 26, 0, 1, LIN);
  const PX = 388 + LAY[v].sec * 0.16 + move * 296 + settle;
  const PY = 452 - stick * 5;
  const punch = f >= PUNCH ? 1.18 : 1.0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.044]} vig={0.44} glow={hexa(p.key, 0.16)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
        rake={0.10} rakeX={RAKE_X[v]} rakeRate={3.8 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={{ x: 176, y: 128, r: 320 }} />

      <Cam s={punch} x={f >= PUNCH ? -30 : 0} y={f >= PUNCH ? -14 : 0} z={30}>
        {/* THE BOARD FACE, filling the frame — the tightest framing in the reel.
            The lamp RAKES across it so it has a real gradient. */}
        {/* ⭐ the canvas PANS after the snap, for the same reason as S4: the scene
            ended on a settle and measured 0.58 into its cut, and a canvas that
            pans is what the product is. */}
        <Board x={512 + LAY[v].sec * 0.16 - pan * 132} y={412 - pan * 30}
          w={880 + pan * 150} h={512 + pan * 88} z={40} state={1}
          design={2} fill={1} live={1} edge="#242A34" />
        {/* the raking light across the face, and it moves */}
        <div style={{ position: "absolute", left: 72 + Math.sin(f / 44) * 30, top: 156,
          width: 880, height: 512, zIndex: 52, pointerEvents: "none",
          background: `linear-gradient(102deg, ${hexa("#FFFFFF", 0.14)} 0%, ${hexa("#FFFFFF", 0)} 46%, ${hexa("#05070C", 0.30)} 100%)` }} />

        {/* the guides — they BOW under the stick, which is the resistance */}
        <Guide x={684} y={190} len={444} z={70} k={0.30 + stick * 0.5}
          c={f > SNAP && f < SNAP + 10 ? GREEN : LIVE} bow={stick * 2.6} />
        <Guide y={452} len={880} x={undefined} z={70} k={0.20 + stick * 0.4} c={LIVE} />

        {/* the panel's travelling shadow — the second thing moving (§13) */}
        <div style={{ position: "absolute", left: PX - 128, top: PY - 62, width: 268,
          height: 132, zIndex: 58, borderRadius: 4, background: hexa("#05070C", 0.42),
          transform: `translate(${14 + move * 6}px, ${16}px)` }} />

        {/* THE PANEL BEING MOVED — a real card, not a rectangle */}
        <div style={{ position: "absolute", left: PX - 134, top: PY - 66, width: 268,
          height: 132, zIndex: 60, borderRadius: 6, overflow: "hidden",
          background: "#FFFFFF", border: "3px solid #D6DEE4",
          transform: `rotate(${(move - 0.5) * 2.4 + settle * 0.06}deg) scale(${1 + stick * 0.03})` }}>
          <div style={{ position: "absolute", left: 16, top: 16, width: 34, height: 34,
            borderRadius: 8, background: hexa(OWN[2], 0.8) }} />
          <div style={{ position: "absolute", left: 60, top: 20, width: 128, height: 12,
            borderRadius: 3, background: hexa(INK, 0.62) }} />
          <div style={{ position: "absolute", left: 60, top: 40, width: 88, height: 8,
            borderRadius: 3, background: hexa(INK, 0.28) }} />
          {[0, 1, 2, 3].map((i) => (
            <div key={"bar" + i} style={{ position: "absolute", left: 18 + i * 62,
              top: 116 - (18 + i * 13), width: 44, height: 18 + i * 13, borderRadius: 2,
              background: i === 3 ? OWN[2] : hexa(INK, 0.20) }} />
          ))}
        </div>
        {sel > 0.02 && <Handles x={PX} y={PY} w={280} h={144} z={84} k={sel} />}

        {/* ⭐⭐ THE LAYOUT REFLOWS. v1's last event was the snap at f88 of 112,
            so the scene died into its cut at 0.41 — and the fix is what actually
            happens when you move something on a canvas: everything else has to
            move too. Four cards travel to their new seats, `LIN`, still going
            when the cut lands, which is also the honest picture of an
            auto-laying-out canvas rather than a static mock. */}
        {[0, 1, 2, 3].map((i) => {
          const r = E(f, SNAP - 4 + i * 5, SNAP + 46 + i * 5, 0, 1, LIN);
          const y0 = 232 + i * 128, x0 = 236 + (i % 2) * 470;
          const x1 = x0 + (i % 2 ? -186 : 150), y1 = y0 + (i % 2 ? 34 : -28);
          return (
            <div key={"rf" + i} style={{ position: "absolute",
              left: x0 + (x1 - x0) * r - 92, top: y0 + (y1 - y0) * r - 44,
              width: 184, height: 88, zIndex: 56, borderRadius: 5,
              background: "#FFFFFF", border: "3px solid #D6DEE4",
              transform: `rotate(${(r - 0.5) * 1.6}deg)` }}>
              <div style={{ position: "absolute", left: 12, top: 12, width: 22, height: 22,
                borderRadius: 6, background: hexa(OWN[i % OWN.length], 0.78) }} />
              <div style={{ position: "absolute", left: 42, top: 15, width: 96, height: 9,
                borderRadius: 3, background: hexa(INK, 0.5) }} />
              <div style={{ position: "absolute", left: 12, top: 48, width: 152, height: 7,
                borderRadius: 3, background: hexa(INK, 0.22) }} />
              <div style={{ position: "absolute", left: 12, top: 63, width: 108, height: 7,
                borderRadius: 3, background: hexa(INK, 0.18) }} />
            </div>
          );
        })}

        {/* the snap reward — contained, two rings, never a flash */}
        {f >= SNAP && f < SNAP + 20 && (<>
          <Ring x={PX} y={PY} f={f} at={SNAP} c={GREEN} />
          <Ring x={PX} y={PY} f={f} at={SNAP + 4} c="#EADFC4" />
        </>)}

        {/* ⭐ WHAT THE CLAUDE DOES: BOTH HANDS on the panel, walking it across.
            ⛔ The forearms START on his own arm rects and END on the panel. */}
        <Hero f={f} x={PX - 236} y={GY + 46} size={236} z={72} costume={{ constr: 1 }}
          act={1} ph={1.6} reach={104}
          strain={stick * 0.9} drive={move * 0.30}
          heat={stick * 0.78}
          stern={stick * 0.6}
          shock={E(f, SNAP, SNAP + 6, 0, 0.8, OUT) - E(f, SNAP + 6, SNAP + 22, 0, 0.8, OUT)}
          cheer={saved * 1.0} />
        <Forearm x0={PX - 236 + 54} y0={GY - 106} x1={PX - 128} y1={PY + 20} w={21} z={78} />
        <Forearm x0={PX - 236 + 66} y0={GY - 76} x1={PX - 124} y1={PY + 48} w={19} z={78} />
      </Cam>

      {/* the properties strip, in the RESERVED BAND and nowhere near the cast */}
      <PropStrip x={706} y={112} z={86} k={sel}
        rows={[["X", `${Math.round(PX - 134)}`], ["W", "268"], ["ALIGN", "GRID"]]} />
      {saved > 0.4 && (
        <Chip t={R.saves} y={BAND_Y + 210} x={62} c={GREEN} fg="#F2FBF6" />
      )}
      <Mark x={92} y={BAND_Y - 34} s={72} z={92} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE WORKS DOORS — "Comment DESIGN for the free guide."
   The keyword lands on the spoken word with a HARD CUT, and the mark is large
   and settled. ⛔ The old stock plate is still on the wall, still purple: the
   villain was replaced, not beaten.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("doors");
  const KEY = 8;                                     /* "DESIGN",  derived f11 */
  const stamp = E(f, KEY, KEY + 5, 0, 1, BACK);
  /* ⛔ HOLD WAS 84% — the highest in the reel — because the carry crossed 190px
     in 59 frames, i.e. 3.2px a frame, which repaints almost nothing per sample.
     The exit is now 430px and the board is bigger, so the dominant mass is
     genuinely leaving the building on the last frame. */
  const carry = E(f, 0, dur + 8, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.046]} vig={0.30} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="house" overhead="joist"
        rake={0.12} rakeX={RAKE_X[v]} rakeRate={5.0 * RAKE_K[v]} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.5} lamp={null}
        window={{ x: 328, y: 96, w: 360, h: 330 }} />

      {/* ⛔ THE VILLAIN, STILL HERE. Hung on the wall, still purple. */}
      <div style={{ position: "absolute", left: 812, top: 176, width: 168, height: 44,
        zIndex: 30, borderRadius: 3, transform: "rotate(-7deg)",
        background: `linear-gradient(160deg, ${SLOP2} 0%, ${SLOPD} 100%)`,
        border: `4px solid ${dkh(SLOPD, 0.40)}`, opacity: 0.82 }} />

      {/* ⛔ HOLD WAS 89%, THE HIGHEST IN THE REEL. The set was a painted opening
          rather than a pair of doors: two 210px leaves now swing back through the
          whole scene, `LIN`, so the exit is happening rather than having
          happened. */}
      {[0, 1].map((i) => (
        <div key={"dr" + i} style={{ position: "absolute",
          left: i ? 690 : 116, top: 96, width: 206, height: 402, zIndex: 28,
          transformOrigin: i ? "100% 50%" : "0% 50%",
          transform: `perspective(900px) rotateY(${(i ? 1 : -1) * (18 + carry * 46)}deg)`,
          background: `linear-gradient(${i ? 254 : 106}deg, ${mxh("#5A4A30", 0.24)} 0%, #2A2114 100%)`,
          borderLeft: "8px solid #1A1409", borderRight: "8px solid #1A1409" }}>
          {[0, 1, 2].map((k) => (
            <div key={k} style={{ position: "absolute", left: 22, top: 30 + k * 122,
              width: 162, height: 96, background: hexa("#000", 0.26), borderRadius: 3 }} />
          ))}
        </div>
      ))}

      {/* the finished board, carried out */}
      <Board x={228 + LAY[v].main * 0.26 + carry * 430} y={444 - carry * 26} w={438} h={286} z={56} state={1}
        design={0} fill={1} live={1} edge="#2A2F38" rot={-4 + carry * 8} />

      <Crew f={f} x={132 + LAY[v].main * 0.26 + carry * 430} y={GY + 4} i={3} size={166} z={58} at={0} loop={0} />
      <Hero f={f} x={452 + LAY[v].main * 0.26 + carry * 420} y={GY} size={248} z={60} costume={{ constr: 1 }}
        act={2} ph={0.3} cheer={0.85 + Math.sin(f / 7) * 0.15} gaze={0.3}
        drive={carry * 0.22} />

      {/* the keyword, stamped on the spoken word */}
      <div style={{ position: "absolute", left: 0, top: BAND_Y - 6, width: W, zIndex: 94,
        display: "flex", justifyContent: "center", opacity: stamp,
        transform: `scale(${0.86 + stamp * 0.14})` }}>
        <div style={{ padding: "13px 34px", borderRadius: 9, background: CLAY,
          border: `5px solid ${dkh(CLAY, 0.44)}` }}>
          <span style={{ ...mono(50, 800), color: "#FFF6EA", letterSpacing: 5 }}>
            COMMENT “{R.keyword}”
          </span>
        </div>
      </div>
      <Mark x={456} y={GY - 640} s={96} z={92} />
    </Scene>
  );
};
