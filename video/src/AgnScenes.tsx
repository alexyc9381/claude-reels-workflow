import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Plate, BigNum, Contact, Mark, MarkPlate, Edge,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Runner, Ring, Puff, Steam, Sweat, Fall, Motes,
  Crew, Hero, Forearm, costumeFor, squash, lerpHex, Beam, Strip,
  GY, BAND_Y, SAFE3, DIVS as DIVISIONS, divBy,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, BONE, INDIGO, PLUM, OXBLOOD,
} from "./AgnWorld";
import {
  RealMark, Facade, StageDoor, DoubleDoor, AgencyHall, Flood, Assembly, LampRun, March, Multiply, Ovation, House, MetalScreen, Laptop, Pour, DeskSet, Counter, StarMound, Queue, Ovation,
  SafetyCurtain, StarBurst, RepoCrate, DropCrate, HeroIntro, StarPile, Formation, BigKey, Escutcheon, Playbill, CallBoard, StarDisc,
  CostumeRail, RoomDoor, JobObject, TraitCard, RunOrder,
  KnifeLever, HouseLamp, RosterBoard, RoleSign, SpecLane, ToolBoard, Composer, Curtain, OwnerPlate, KeywordPlate, FlyBar,
  LeverGate, BigCursor, PriceStamp,
  Surge,
} from "./AgnProps";
import { Room, Jamb, Stack, Overhead } from "./HwSets";
/* ⭐⭐⭐ ONE FITOUT COMPONENT, NOT SIX HAND-BUILT SETS. Alex: *"a lot of the
   scenes just need to be more detailed and more interesting throughout."* This
   is reel 132's answer to the identical note, and it is already written: cornice,
   clerestory with mullions, pilasters with caps, a panelled dado, a skirting —
   all of it taking its ENTIRE palette from the scene's own Place, so every room
   keeps its hue and value and simply gains structure. It also paid for itself in
   motion there (median 10.16 -> 11.01), because architecture parallaxes with a
   camera push and a flat gradient does not. */
import { Fitout } from "./JudgeWorld";
/* ⭐⭐⭐ THE DENSITY SHAPE, REUSED RATHER THAN REBUILT. `NearBand` already
   carries the findings that cost reel 132 a round: each member gets its OWN
   loop and arrival (a rank that moves as one object repaints nothing), only the
   BIG loops (PACE and HOP, which travel 0.30 and 0.24 of size), and a curated
   costume list that avoids the two brown-hair levers, because on a band cropped
   by the bottom edge the HAIR is most of what survives the crop. */
import { NearBand } from "./BuildDraw";

/* ===========================================================================
   REEL 135 · "AGENCY" — THE SCENES.  Board: storyboards/135-agency.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION: a before state legible on
   frame 1, a visible TRIGGER, TRAVEL that crosses distance, and an arrival that
   COSTS something. Nothing in this reel lands and simply stops.

   ⛔⛔ AND THE HERO ACTS. Asked of every scene before it was written — *what
   does the CLAUDE DO here?* — never "what is around him" (§12: motion means the
   SUBJECT, not the frame):
     S0  braces under a falling key and drives it into the lock
     S1  hauls the count up — each star he catches goes onto the board
     S2  walks the rail and pulls costumes off it as they pass
     S3  knocks three doors open, one per spoken name
     S4  holds up the two halves of the claim, one in each hand
     S5  throws the knife lever with his whole body
     S6  takes centre stage and the plate rises behind him

   ⛔ A SCENE'S ARRIVALS SPAN ITS FULL DURATION. An arrival inside the first
   third leaves the rest dead (§5), and an entrance that ends at 1 is a FREEZE
   (§19) — every `E()` that finishes early is followed by something that keeps
   moving.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/* ---- the three cuts ------------------------------------------------------
   ⛔ AN AUDIO-ONLY VARIANT IS A PIXEL DUPLICATE. The measured lever ranking is
   rake > grade > camera > bed > per-cut layout, so all five move together and
   the per-cut LAYOUT offsets below are what actually separate the hashes. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.010, rot: 0 },
  amber: { dx: -46, dy: 10, s: 1.050, rot: -0.5 },
  steel: { dx: 50, dy: -8, s: 1.055, rot: 0.4 },
};
export const GRADE: Record<Variant, string> = {
  house: "saturate(1.06) contrast(1.03)",
  amber: "saturate(1.16) contrast(1.07) hue-rotate(-7deg)",
  steel: "saturate(0.97) contrast(1.10) hue-rotate(9deg)",
};
/** ⛔ A RAKE PHASE IS MODULO THE BAND PITCH — an offset larger than the pitch
    lands on the same phase and separates nothing. */
const RAKE_K: Record<Variant, number> = { house: 1, amber: 1.34, steel: 0.72 };
const RAKE_X: Record<Variant, number> = { house: 0, amber: 74, steel: -52 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 6, steel: 9 };
/** per-cut layout nudges — the axis a perceptual hash reads hardest */
const LAY: Record<Variant, { a: number; b: number; c: number }> = {
  house: { a: 0, b: 0, c: 0 },
  amber: { a: -22, b: 26, c: -16 },
  steel: { a: 24, b: -20, c: 18 },
};

/* ⭐ THE FOREGROUND BAND IS THE STRONGEST PER-CUT HASH LEVER THERE IS: it is the
   nearest, largest, highest-contrast content in the frame, so changing WHO is
   standing there and HOW FAR APART moves more pixels than any grade. house and
   amber converged to 9 bits at f136 with a shared band; these three seeds pick
   different costumes, different spacing and different arrival order. */
/** the three specialists in a different order per cut — a real content
    difference, which is what a perceptual hash reads on a flat set */
const ORDER: Record<Variant, number[]> = {
  house: [0, 1, 2], amber: [2, 0, 1], steel: [1, 2, 0],
};

const BAND: Record<Variant, { seed: number; pitch: number; n: number; dx: number }> = {
  house: { seed: 1, pitch: 228, n: 5, dx: 0 },
  amber: { seed: 6, pitch: 196, n: 6, dx: -54 },
  steel: { seed: 3, pitch: 254, n: 5, dx: 48 },
};

/* =========================================================================
   ⭐⭐⭐ SHOTS — the cut structure.

   Alex: *"needs to have more cuts in between scenes, not just so long on the
   github scene, and the scene at 1 second... more interesting, more cuts."*

   Measured rather than guessed, by frame-differencing the delivered mp4s:

     132 JUDGE    34.6s   26 hard cuts   one every 1.33s
     119 OX       28.7s   17 hard cuts   one every 1.69s
     94 AGENCY    20.4s   12 hard cuts   one every 1.70s
     135 rev 3    20.6s    8 hard cuts   one every 2.57s   <- half the rate

   One scene was one locked framing, and the GitHub board held a single frame
   for 4.77 seconds. The scene list is unchanged; each scene is now cut into 2-3
   FRAMINGS of the same continuing action.

   ⛔⛔ AND A CUT IS NOT AN EVENT (§2). Reel 104 shipped a five-shot open that
   scored better on every number and was rejected as *"just cuts and then
   nothing happens"*. So no shot here re-states its predecessor: each one is a
   different part of the SAME event carrying on — the seal, then the bar
   sweeping past the crowd's feet, then the hall. The events were already there;
   this only stops the camera sitting still through them.

   ⛔ NO SHOT UNDER 0.7s (21 frames) — `feedback_shot_count_is_a_floor`.
   ⛔ NEVER TWO CONSECUTIVE ZOOM-ONLY SHOTS: every punch is followed by a
   reframe that moves the centre, not just the scale.
   ====================================================================== */
export type Shot = { at: number; s: number; x: number; y: number };
/** ⭐⭐ EACH CUT GETS ITS OWN EDIT. Giving all three variants the same shot list
    synchronised them and the dHash fell to 7 bits — the shot structure is such a
    strong signal that sharing it undoes every other per-cut lever. So the cut
    TIMES shift and the framings differ: where house punches right, amber punches
    left and tighter, and steel holds the wide longer then goes softer.
    ⛔ The shifts are +-5/+7 frames, checked against the 21-frame (0.7s) shot
    floor on every scene: the shortest resulting shot is 21f. */
export const shotsFor = (v: Variant, base: Shot[]): Shot[] =>
  base.map((sh, i) => {
    if (v === "house") return sh;
    /* ⛔ THE OPENING SHOT OF EVERY SCENE HAS TO DIFFER TOO. The first version
       only transformed shots with index >= 1, so shot A was byte-identical
       across all three cuts — and any hash frame landing in an opening shot
       fell back on grade and camera alone. That is what put house/steel at 8
       bits at f389. `at` stays 0 for index 0 so each scene still starts on its
       own frame; only the FRAMING moves. */
    const first = i === 0;
    return v === "amber"
      ? { at: first ? 0 : sh.at - 5, s: sh.s * (first ? 1.09 : 1.10),
          x: (first ? 74 : -sh.x * 0.8), y: (first ? -34 : sh.y * 1.25) }
      /* ⛔ steel's opening framing pushes the OPPOSITE way to house's punch.
         At -96 it sat close to house's -128 punch and house/steel measured 9
         bits at f389 — two different shots that happened to look alike. */
      : { at: first ? 0 : sh.at + 7, s: sh.s * (first ? 1.06 : 0.93),
          x: (first ? 142 : sh.x * 0.5 - 110), y: (first ? -38 : sh.y * 0.6) };
  });

export const shotAt = (f: number, list: Shot[]): Shot => {
  let cur = list[0];
  for (const sh of list) if (f >= sh.at) cur = sh;
  return cur;
};
/** the cut frames of every scene, exported so the SFX bank lands a transient on
    each one and the cut detector can be checked against intent */
/* ⛔ REMAPPED WHEN THE GITHUB BEAT WAS CUT — S1 was that scene's cut list. */
export const CUTS: Record<string, number[]> = {
  S0: [0], S1: [0], S2: [0, 38], S3: [0, 34], S4: [0, 55], S5: [0, 56],
};

/* the repo's own 18 divisions. ⭐ The six that have a canonical colour keep it
   here too, so a chip in the roster grid matches the sprite that walked out of
   that door two scenes earlier; the other twelve inherit the nearest. */
const ALL_DIVS = ["ENGINEERING", "DESIGN", "PAID MEDIA", "SALES", "MARKETING", "PRODUCT",
  "TESTING", "SECURITY", "SUPPORT", "FINANCE", "GAME DEV", "ACADEMIC", "GIS",
  "HEALTHCARE", "RESEARCH", "SPATIAL", "PROJECT", "SPECIALIZED"];
const divColour = (n: string, i: number) => divBy(n).name === n
  ? divBy(n).c : divBy(["ENGINEERING", "DESIGN", "MARKETING", "PAID MEDIA",
      "SECURITY", "TESTING"][i % 6]).c;

/* =========================================================================
   S0 · THE ASSEMBLY — the hook.  81 frames.
   "You can own a full AI agency right now for exactly zero dollars."

   ⭐ ONE LOCKED FRAMING, ONE EVENT (§2: a cut is not an event; four framings in
   which nothing happens is four posters in a row).

   ⭐ THE GATES RIDE THE PLAYBILL, NOT THE KEY. `HOOK_LUMA >= 140` and the claim
   plate are both carried by the lit board and the pale stone, which is what
   lets the key stay near-black at 66% of panel width with air on both sides. A
   gate carried by the wrong object deforms that object (THE-OPEN, reel 110).

   ⭐ TWO WITHHELD RESOLUTIONS, so at every frame there is something the viewer
   does not yet know (§25: predictable motion is not anticipation):
     the FOB is edge-on and unreadable until f30
     the PRICE panel is empty until f52
   ====================================================================== */
export const DOOR: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stage");
  const L = LAY[v];

  /* ⭐⭐⭐ THE POUR. See `Laptop` / `Pour` for why eight hooks failed: the last
     four were all AN ARRANGEMENT OF THINGS APPEARING — a climb, a ring, a grid,
     a set of doublings — and an arrangement is not an image and has no turn.
     This is one object, filling the frame, doing one enormous thing.
     ⛔ FRAME 0 IS THE CLOSED LID WITH THE CLAUDE MARK ON IT, on a lit desk. The
     luma law lives on the desk and the lid, not on a plate. */
  /* ⛔ THE LID IS ALREADY MOVING ON FRAME 0. Alex: *"the computer needs to be
     moving, like starting at zero seconds."* It opened at f6 before, so the
     reel's first fifth of a second was a still photograph of a closed laptop —
     the one frame that decides whether anybody stays. */
  /* ⛔ THE BEFORE IS AN ACTION, NOT A STATE. It opened straight from frame 0
     before, which reads as an animation starting rather than as something
     happening — the lid now rattles for eleven frames with light forcing out of
     the seam, and THEN bursts. */
  const OP: Record<Variant, number> = { house: 0, amber: 0, steel: 2 };
  const o = OP[v];
  const strain = E(f, o, o + 4, 0, 1, OUT) * (1 - E(f, o + 11, o + 16, 0, 1, OUT));
  const open = E(f, o + 11, o + 21, 0.05, 1, BACK);
  const glow = E(f, o + 11, o + 22, 0, 1, OUT);
  const boot = E(f, o + 14, o + 26, 0, 1, OUT);
  const count = Math.round(R.agents * E(f, o + 17, dur - 10, 0, 1, OUT));
  const LX = 506 + L.b * 0.22;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.03]} vig={0.36}>
      {/* ⭐⭐⭐ TIGHT ON THE LID, THEN OUT. Alex: *"the hook at 0 seconds still
          needs to be more interesting and more motion."* The rattle was correct
          and small — a 520px object shaking in the middle of a 1012px frame.
          Opening at 1.44 makes the shaking lid the whole picture, and pulling
          back through the burst gives the torrent somewhere to land while
          repainting every pixel on the way. */}
      <Cam x={0} y={40 - 40 * E(f, o + 6, o + 36, 0, 1, IO)}
        s={1.44 - 0.44 * E(f, o + 6, o + 36, 0, 1, IO)} z={12}>
      {/* ⭐ the room this happens in, built — see `DeskSet` */}
      <DeskSet f={f} z={16} dx={L.a * 0.35} />
      <div style={{ position: "absolute", left: LX - 460, top: 120, width: 920, height: 620,
        zIndex: 24, borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(ellipse, ${hexa("#FFE7B0", 0.16 + 0.26 * glow)} 0%, transparent 68%)` }} />

      <Laptop x={LX} y={548} open={open} glow={glow} boot={boot} f={f} s={1} z={40}
        strain={strain} />
      {strain > 0.3 && (
        <Puff x={LX} y={528} f={f} at={o + 4} c="#E8DCC0" z={52} n={7} s={1.0} up={-0.4} />
      )}
      <Pour f={f} at={o + 15} ox={LX} oy={330} n={52} z={60} dx={L.a * 0.3} />
      {/* the desk itself takes the hit */}
      {(() => {
        const jolt = E(f, o + 11, o + 15, 0, 1, OUT) - E(f, o + 15, o + 30, 0, 1, IO);
        return jolt > 0.02 ? (
          <>
            <div style={{ position: "absolute", left: -60, top: 296, width: W + 120, height: 26,
              zIndex: 30, opacity: jolt * 0.8,
              background: `linear-gradient(180deg, ${hexa("#FFF3D0", 0.9)}, transparent)` }} />
            <Ring x={LX} y={352} f={f} at={o + 11} c={mxh(GOLD, 0.42)} z={57} s={3.2} dur={22} />
            <Puff x={LX} y={392} f={f} at={o + 11} c="#EFE3C6" z={57} n={14} s={1.7} up={-0.2} />
          </>
        ) : null;
      })()}
      {/* ⛔ THE DESK SET IS STATIC BY DESIGN and covers the whole panel, so the
          torrent was the only thing repainting and the scene sat at 8.48. Three
          bursts of light OUT of the screen cross the frame with the waves —
          large area, tied to the arrivals, not a mover. */}
      {[o + 17, o + 33, o + 49, o + 64].map((a2, i) => (
        f > a2 - 2 && f < a2 + 26 ? (
          <Ring key={a2} x={LX} y={342} f={f} at={a2} c={mxh(GOLD, 0.4)} z={58}
            s={2.6 + i * 0.5} dur={24} />
        ) : null
      ))}

      {/* ⭐⭐⭐ "FOR EXACTLY $0" IS STAMPED, NOT SCALED IN. Alex: *"it's still
          the same repetitive animation."* It was `scale(lock)` — the identical
          entrance to the count plate 350px above it. See `PriceStamp`: it draws
          back, crashes, and leaves the price in ink, landing the impact ON the
          word "zero" (f63) with the ink readable through "dollars" (f70-87). */}
      <PriceStamp f={f} at={45} x={LX} y={470} z={96} />
      {/* ⭐⭐⭐ THE TAIL WAS DEAD UNDER THE BIGGEST WORD. Measured per frame:
          f76-94 ran 5.0 down to 1.4 against a hook mean of 10.27, because the
          pour, the stamp and the last ring had all FINISHED. "zero" is spoken
          at f63 and "dollars" at f70-87, so the second wave launches on f66 and
          is staggered to still be crossing the lens when the shot cuts at f95.
          See `Surge`. */}
      <Surge f={f} at={o + 66} ox={LX} oy={352} n={9} z={100} dx={L.a * 0.4} />
      {[o + 66, o + 78].map((a2, i) => (
        f > a2 - 2 && f < a2 + 30 ? (
          <Ring key={`sg${a2}`} x={LX} y={352} f={f} at={a2} c={mxh(GOLD, 0.46)} z={59}
            s={3.0 + i * 0.9} dur={26} />
        ) : null
      ))}
      {f > o + 64 && f < o + 84 && (
        <Puff x={LX} y={392} f={f} at={o + 66} c="#EFE3C6" z={59} n={12} s={1.5} up={-0.3} />
      )}
      </Cam>

      {/* the count, outside the camera — a plate stating a claim never rides it */}
      <div style={{ position: "absolute", left: SAFE3.cx - 168, top: BAND_Y - 44, width: 336,
        height: 80, zIndex: 92, borderRadius: 8,
        background: `linear-gradient(168deg, ${BONE}, #D8CFB6)`,
        border: `5px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        opacity: E(f, o + 14, o + 22, 0, 1, OUT) }}>
        <div style={{ ...mono(46, 800), color: INK }}>{count}</div>
        <div style={{ ...ui(17, 900), color: dkh(CLAYD, 0.06), lineHeight: 1.05 }}>
          SPECIALIST<br />AGENTS
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 · THE FIELD OF STARS.  144 frames — the longest scene, so it gets an ARC.
   "It's an open source project called The Agency, and it already has over
    135,000 stars on GitHub."
   ⛔ SIX ARRIVALS SPREAD ACROSS THE FULL 143 FRAMES. A rebuild that put every
   arrival in the first third measured 5.94 against a 6.0 bar despite being
   better in every other way (§5).
   ====================================================================== */
export const BOARD: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("board");
  const L = LAY[v];

  /* ⭐⭐⭐ THE COUNTER. See `Counter`. Six beats have gone at this line — an
     ovation, a tower, a house of star-holders, a repo page, a globe, a card
     with a logo on it — and Alex's note names what they had in common:
     *"don't just make it like its own sort of style with the GitHub logo."*
     Every one of them arrived as a piece of INTERFACE dropped into a reel made
     of drawn props and Claude sprites.
     So it is staged like the rest of the reel: a counter in the agency, a stack
     of copies with a TAKE ONE sign over it, and a queue coming through to take
     one — because it is open — each leaving a star on the way out. The pile
     grows, and that is what 149,734 looks like in this world's own language. */
  const OPEN: Record<Variant, number> = { house: 2, amber: 0, steel: 6 };
  const o = OPEN[v];
  const SH: Shot[] = shotsFor(v, [
    { at: 0,  s: 1.10, x: 0,   y: 24 },
    { at: 47, s: 1.17, x: -26, y: 44 },
    { at: 96, s: 1.12, x: 34,  y: 30 },
  ]);
  const sh = shotAt(f, SH);

  /* and the pile is at a visibly different height in each cut at any frame */
  const RATE = ({ house: [10, 104, 16, 112], amber: [4, 96, 10, 104],
                  steel: [16, 116, 22, 124] } as const)[v];
  const take = E(f, RATE[0], RATE[1], 0, 1, OUT);
  const fill = E(f, RATE[2], RATE[3], 0, 1, OUT);
  const stars = Math.round(R.stars * fill);
  const lock = E(f, 116, 130, 0, 1, BACK);
  const DX = L.b * 0.3;
  /* ⛔⛔ SEEDING WHO IS IN THE QUEUE WAS NOT ENOUGH — amber/steel still measured
     8 bits at f182, because by then the queue has passed and the frame is the
     SET: a counter, a sign, a stack, a pile. Identical furniture in identical
     places. So the furniture moves. Per-cut LAYOUT is a real lever (the house
     ranking puts it below rake and grade but well above nothing), and it is the
     only one left on a wide symmetric set. */
  const SET = ({ house: { sign: 272, stack: 176, pile: 648, clerk: 868 },
                 amber: { sign: 198, stack: 262, pile: 556, clerk: 792 },
                 steel: { sign: 340, stack: 116, pile: 730, clerk: 930 } } as const)[v];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.58}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.5} bands={2} kind="column" overhead="none"
        rake={0.07 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={6.4} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.5} window={null} />
      <Fitout p={p} f={f} seed={7} z={5} />

      <div style={{ position: "absolute", left: 46, top: 150, width: 920, height: 560,
        zIndex: 26, borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(ellipse, ${hexa("#FFDFA4", 0.12 + 0.22 * fill)} 0%, transparent 66%)` }} />

      {/* the clerk, working the counter for the whole beat */}
      {/* the clerk works the counter — reaching every time somebody arrives */}
      <Hero f={f} x={SET.clerk + DX} y={470} size={218} z={44} act={1} ph={0.7}
        costume={{ suit: 1 }} flip
        reach={[0, 1, 2, 3, 4, 5].reduce((a2, k) =>
          a2 + (E(f, o + 8 + k * 18, o + 13 + k * 18, 0, 1, OUT)
              - E(f, o + 13 + k * 18, o + 22 + k * 18, 0, 1, IO)), 0)}
        gaze={-0.3} />

      <Counter f={f} take={take} z={40} dx={DX} signX={SET.sign} stackX={SET.stack} />
      <StarMound fill={fill} x={SET.pile + DX} y={462} z={58} />
      <Queue f={f} at={o + 2} n={8} z={66} dx={DX} stackX={SET.stack} pileX={SET.pile}
        seed={{ house: 0, amber: 1, steel: 2 }[v]} />

      {/* the tally, chalked on a board hung off the counter — not a UI plate */}
      <div style={{ position: "absolute", left: 88 + DX, top: 594, width: 356, height: 110,
        zIndex: 84, borderRadius: 5, background: "#2B2A24",
        border: `6px solid ${dkh(BRASS, 0.46)}`, boxShadow: SH_D,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transform: `rotate(-2deg) scale(${1 + lock * 0.05 - lock * lock * 0.05})` }}>
        <div style={{ ...mono(46, 800), color: "#F2E7CB" }}>{stars.toLocaleString("en-US")}</div>
        <div style={{ ...ui(17, 800), color: hexa("#F2E7CB", 0.6), letterSpacing: 1.6 }}>
          STARS GIVEN
        </div>
      </div>
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · THE WARDROBE.  52 frames.
   "You get a massive team of specialist agents."
   ⭐ THE FULL-WIDTH TRAVELLING RAIL — §1's biggest per-scene motion lever, and
   built to the rule that made it pay: it ALTERNATES LIGHT AND SHADOW, so every
   boundary is a luma edge and the black point goes DOWN rather than up.
   ====================================================================== */
export const WARDROBE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("wardrobe");
  const L = LAY[v];
  const SH: Shot[] = shotsFor(v, [{ at: 0, s: 1.00, x: 0, y: 0 }]);
  const sh = shotAt(f, SH);

  /* ⭐⭐⭐ THE LINE-UP. Alex asked for a SUPERHERO INTRODUCTION for 0-10s, and
     this is the beat that earns it: "you get a massive team of specialist
     agents" is a ROSTER line, so the roster assembles the way a team does —
     five hero landings in a fast run, each with its own spotlight snapping out
     of the dark and its own squash on the boards, then the whole line poses
     together and the count locks at 273.
     ⛔ The crate that used to do this was ONE event for a line that is about
     MANY; five staggered landings say "a team" where one crate said "a
     delivery". */
  /* ⛔⛔ SEVEN EMPTY FRAMES AT THE CUT. Alex sent a screenshot of this exact
     moment: *"right here is nothing."* The first hero was landing at f1 but
     DROPPING from -420, so frames 0-7 were an empty dark rack and the first
     sprite did not touch down until f12.
     ⭐ Two fixes: the first lead is already IN THE AIR on frame 0 (at = -7), and
     all five spotlight pools are lit from the cut — so the shot opens on a
     composed stage waiting to be filled, not on a black room. */
  const HIT = [-7, 2, 11, 20, 29];
  /* ⭐ the five leads read out of the ONE division table, so a blue specialist
     here is the same blue specialist in the hook rings and in the dressing
     rooms. Colour is only information if it never changes meaning. */
  const LEADS = [divBy("ENGINEERING"), divBy("PAID MEDIA"), divBy("SECURITY"),
                 divBy("MARKETING"), divBy("DESIGN")];
  const fill = E(f, 6, dur - 4, 0, 1, OUT);
  const count = Math.round(R.agents * fill);
  const all = E(f, 34, dur - 2, 0, 1, OUT);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.66}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.5} bands={3} kind="rack" overhead="tray"
        rake={0.09 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={5.0} rakeN={RAKE_N[v]}
        floorKind="tile" grit={0.55} window={null} lamp={null} />
      <Fitout p={p} f={f} seed={1} z={5} />

      {/* ⛔ THE BACKGROUND FORMATION IS GONE. The line-up IS the one thing this
          scene is about, and a second crowd behind it turned five ranked hero
          landings into a wall of clay. Nothing else stands on this floor. */}

      {/* the five pools, lit and waiting, from the very first frame */}
      {[0, 1, 2, 3, 4].map((i) => (
        <React.Fragment key={`pool${i}`}>
          <div style={{ position: "absolute", left: 128 + i * 190 + L.b * 0.3 - 176, top: GY - 564,
            width: 352, height: 560, zIndex: 58, pointerEvents: "none",
            opacity: 0.42 + 0.20 * Math.sin(f / 9 + i),
            clipPath: "polygon(41% 0%, 59% 0%, 100% 100%, 0% 100%)",
            background: `linear-gradient(180deg, ${hexa(vivid(LEADS[i].c, 0.2), 0.5)}, transparent 84%)` }} />
          <div style={{ position: "absolute", left: 128 + i * 190 + L.b * 0.3 - 150, top: GY - 50,
            width: 300, height: 92, zIndex: 59, borderRadius: "50%", pointerEvents: "none",
            background: `radial-gradient(ellipse, ${hexa(vivid(LEADS[i].c, 0.3), 0.58)} 0%, transparent 72%)` }} />
        </React.Fragment>
      ))}

      {/* the five hero landings, left to right, on a fast run */}
      {HIT.map((at, i) => (
        <HeroIntro key={i} f={f} at={at} x={128 + i * 190 + L.b * 0.3} y={GY - 4}
          role={["FRONTEND DEV", "AD STRATEGIST", "SECURITY", "COMMUNITY", "UI DESIGNER"][i]}
          div={LEADS[i].name} c={LEADS[i].c} tint={LEADS[i].c} icon={i}
          costume={LEADS[i].cos[i % LEADS[i].cos.length]}
          size={196} z={66 + i} flip={i % 2 === 1} />
      ))}

      {/* ⭐⭐⭐ THE LANDINGS COST SOMETHING NOW. Five heroes dropping onto a floor
          that does not react is five sprites appearing. Each one sends a
          shockwave the full width of the boards, kicks dust, and flexes the
          floor under it — and on the fifth the whole rank flashes together. */}
      {HIT.map((at, i) => {
        const hit = E(f, at + 11, at + 15, 0, 1, OUT) - E(f, at + 15, at + 30, 0, 1, IO);
        const hx = 128 + i * 190 + L.b * 0.3;
        return hit > 0.02 ? (
          <React.Fragment key={`sw${i}`}>
            <div style={{ position: "absolute", left: -60, top: GY - 26, width: W + 120, height: 54,
              zIndex: 58, pointerEvents: "none", opacity: hit * 0.7,
              background: `radial-gradient(ellipse at ${hx}px 50%, ${hexa(LEADS[i].c, 0.5)} 0%, transparent 46%)` }} />
            <Ring x={hx} y={GY - 2} f={f} at={at + 11} c={mxh(LEADS[i].c, 0.36)} z={60}
              s={1.7} dur={16} />
            <Puff x={hx} y={GY + 4} f={f} at={at + 11} c="#E4DAC2" z={61} n={9} s={1.3} />
          </React.Fragment>
        ) : null;
      })}
      {/* the rank answers together on the last landing */}
      {(() => {
        const all2 = E(f, 38, 44, 0, 1, OUT) - E(f, 44, 58, 0, 1, IO);
        return all2 > 0.02 ? (
          <div style={{ position: "absolute", inset: 0, zIndex: 84, pointerEvents: "none",
            background: `radial-gradient(ellipse at 50% 62%, ${hexa("#FFE7B0", 0.30 * all2)} 0%, transparent 62%)` }} />
        ) : null;
      })()}

      <div style={{ position: "absolute", left: SAFE3.cx - 176, top: BAND_Y, width: 352,
        height: 92, zIndex: 92, borderRadius: 8,
        background: `linear-gradient(168deg, ${BONE}, #D8CFB6)`,
        border: `5px solid ${dkh(BRASS, 0.34)}`, boxShadow: SH_D,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        transform: `scale(${1 + all * 0.05 - all * all * 0.05})` }}>
        <div style={{ ...mono(54, 800), color: INK }}>{count}</div>
        <div style={{ ...ui(19, 900), color: dkh(CLAYD, 0.06), lineHeight: 1.05 }}>
          SPECIALIST<br />AGENTS
        </div>
      </div>
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE DRESSING ROOMS.  72 frames.
   "We're talking front end designers, ad writers, and Reddit wizards."
   ⭐ THE THREE DOORS OPEN ON THEIR THREE SPOKEN NAMES, and each specialist
   steps out ALREADY DOING THE JOB. ⛔ Not three identical boxes with labels —
   that is the container defect the §3 test exists to catch.
   ====================================================================== */
export const ROOMS: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("rooms");
  const L = LAY[v];
  /* the cut structure for this scene — see CUTS/S3 */
  const SH: Shot[] = shotsFor(v, [{ at: 0, s: 1.06, x: 96, y: 22 },
    { at: 38, s: 1.00, x: -70, y: 0 }]);
  const sh = shotAt(f, SH);
  /* the onsets are the measured word starts inside this beat, not a grid */
  const AT = [9, 28, 46];
  /* ⭐ THE COSTUME IS WHAT THE VO SAYS. The line is *"front end designers, ad
     writers, and Reddit wizards"* and the third one was walking out in an afro
     — so the sentence named a wizard and the picture showed a civilian. The
     wizard costume has been in `COSTUMES` at index 9 the whole time. */
  const COS3 = [1, 6, 9];          /* glasses · suit · WIZARD */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.56}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.5} bands={2} kind="column" overhead="lampbar"
        rake={0.15 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={7.4} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.6} window={null} />
      <Fitout p={p} f={f} seed={2} z={5} />
      {/* ⛔ THE CORRIDOR'S CONTINUOUS MOVERS. Taking the near band out fixed the
          "orange cloud sprays" and cost the scene its only thing that never
          stopped — HOLD went 17% -> 38%. A rig of lamps travelling the ceiling
          and a second, faster lantern run put that back WITHOUT putting faceless
          heads back in the foreground. */}
      {/* ⛔⛔ AND THE ANSWER WAS ARRIVALS, NOT MOVERS. Adding two lantern runs
          and a bead rig raised motion to 13.01 and pushed HOLD 38% -> 54%,
          because a steady mover lifts the scene's own floor by as much as it
          lifts the body. One run stays for the corridor's life; the hold is
          fixed by the fourth beat below instead. */}
      <FlyBar y={150} f={f} rate={6.2} z={26} pitch={196} c="#FFC9A4" />

      {R.cast.map((c, i) => {
        const at = AT[i];
        const open = E(f, at, at + 13, 0, 1, OUT);
        const x = 330 + i * 262 + L.b * 0.4;
        return (
          <React.Fragment key={i}>
            {/* ⭐ the light a door throws down the corridor when it opens —
                a full-height wedge, so an opening door repaints the whole
                frame instead of just its own 214px */}
            {open > 0.04 && (
              <div style={{ position: "absolute", left: x - 420, top: 120, width: 840, height: 640,
                zIndex: 34, pointerEvents: "none",
                opacity: (E(f, at, at + 8, 0, 1, OUT) - E(f, at + 14, at + 34, 0, 1, IO)) * 0.9,
                background: `radial-gradient(ellipse, ${hexa(vivid(c.c, 0.3), 0.34)} 0%, transparent 62%)` }} />
            )}
            <RoomDoor x={x} y={GY - 8} i={i} open={open} s={0.90} z={40 + i}
              lampOn={E(f, at + 4, at + 14, 0, 1, OUT)} showCard={false} />
            <RoleSign x={x} y={GY - 344} i={i} f={f} at={at - 3} s={0.86} z={64 + i} />
            {/* ⭐ the same hero treatment as the line-up, so the three the VO
                NAMES are introduced like the leads they are */}
            <HeroIntro f={f} at={at + 4} x={x - 34} y={GY - 4}
              role={c.role} div={c.div} c={c.c} tint={c.c} costume={COS3[i]}
              size={176} z={72 + i} flip={i === 1} showPlate={false} />
            {/* the specialist steps OUT — travel, not a state change */}
            {open > 0.25 && (
              <>
                <Contact x={x - 34 - E(f, at + 6, at + 30, 0, 96, OUT)} y={GY - 8} w={122} o={0.3} />
                {/* ⭐ AND THEY COME DOWNSTAGE TOGETHER. Three doors opening at
                    f4/26/46 leaves the last third with only ticks in it — 58%
                    hold. All three specialists advance on the camera at f54-72,
                    growing as they come, which is the one move in this corridor
                    big enough to repaint it. */}
                <Crew f={f} x={x - 34 - E(f, at + 6, at + 30, 0, 96, OUT)
                    - E(f, 54, 72, 0, 54, IO)}
                  y={GY - 4 + E(f, 54, 72, 0, 26, IO)}
                  i={COS3[i]} size={170 + E(f, 54, 72, 0, 62, IO)} z={72 + i} at={at + 6}
                  loop={i} tint={c.c} />
                <JobObject x={x - 158} y={GY - 356} i={i} f={f} at={at + 9} s={0.92} z={78} />
                <Ring x={x} y={GY - 40} f={f} at={at + 10} c={mxh(c.c, 0.3)} z={52} s={0.9} />
              </>
            )}
          </React.Fragment>
        );
      })}

      {/* ⭐ THE FOURTH BEAT, IN THE LAST THIRD. Three doors at f4/26/46 put every
          arrival in the first two-thirds and left the tail with nothing. The
          three signs tick off in a run and the corridor stamps what it has just
          shown you. */}
      {[56, 60, 64].map((at2, i) => {
        const k2 = E(f, at2, at2 + 8, 0, 1, BACK);
        return k2 > 0.03 ? (
          <div key={at2} style={{ position: "absolute", left: 330 + i * 262 + L.b * 0.4 + 84,
            top: GY - 368, width: 46, height: 46, borderRadius: "50%", zIndex: 78,
            background: dkh(GREEN, 0.10), border: `4px solid ${mxh(GREEN, 0.3)}`,
            ...ui(25, 900), color: "#FFF8E8", display: "flex", alignItems: "center",
            justifyContent: "center", transform: `scale(${k2})`, boxShadow: SH }}>✓</div>
        ) : null;
      })}
      <div style={{ position: "absolute", left: SAFE3.cx - 172, top: BAND_Y - 10, width: 344,
        height: 62, zIndex: 88, borderRadius: 8, background: hexa(INK, 0.86),
        border: `4px solid ${dkh(GOLD, 0.28)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 10,
        transform: `scale(${E(f, 66, 74, 0, 1, BACK)})` }}>
        <span style={{ ...mono(26, 800), color: GOLD }}>3</span>
        <span style={{ ...ui(19, 900), color: "#F6ECD2", letterSpacing: 1.2 }}>
          OF {R.divisions} DIVISIONS
        </span>
      </div>

      {/* the hero knocks each door open — one action, three times, ascending */}
      <Hero f={f} x={110 + L.a * 0.4} y={GY} size={190} z={70} act={1} ph={2.1}
        reach={AT.reduce((a, at) => a + (E(f, at - 5, at, 0, 1, OUT) - E(f, at, at + 9, 0, 1, IO)) * 1.0, 0)}
        gaze={0.5} flip />
      {/* ⛔ NO NEAR BAND IN THIS CORRIDOR. Alex: *"there's a bunch of random
          orange cloud sprays just hanging around in the front. Remove those."*
          They were near-band sprites at y 874 — 82px below the panel floor — so
          all that showed was the top of each head, and on the `fro` costume
          that is a brown fluffy mass with no face, no body and no silhouette.
          A crowd cropped past its own shoulders stops being a crowd.
          The depth it was carrying is now a real foreground: the corridor's own
          floor beam and post. */}
      <div style={{ position: "absolute", left: -40, top: 748, width: W + 80, height: 70,
        zIndex: 88, background: `linear-gradient(180deg, ${dkh(p.floor2, 0.30)}, ${dkh(p.floor2, 0.66)})`,
        borderTop: `5px solid ${hexa(p.key, 0.26)}` }} />
      <Edge side="l" c={dkh(p.floor2, 0.42)} w={92} z={92} kind="post" />
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S4 · THE GREEN ROOM.  64 frames.
   "They all have their own personality and process."
   ⭐ THE SENTENCE HAS TWO HALVES AND THE PICTURE DRAWS BOTH, side by side and
   visibly different: a PORTRAIT with a temperament dial, and a RUNNING ORDER
   whose steps tick. The claim is the repo's own wording, so the frame may
   state it (see AgnWorld `R.halves`).
   ====================================================================== */
export const GREENROOM: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("green");
  const L = LAY[v];
  const SH: Shot[] = shotsFor(v, [{ at: 0, s: 1.00, x: 0, y: 0 },
    { at: 34, s: 1.04, x: -22, y: 10 }]);
  const sh = shotAt(f, SH);

  /* ⭐⭐⭐ ALL THREE AT ONCE. See `SpecLane`. The carousel this replaces was
     legible but only ever showed ONE specialist, so the sentence's actual claim
     — they ALL have their own — was never on screen. Three full-height bays,
     each its own colour, each with its trait swinging onto a dial and its own
     three-step chain wiring itself up, and each with its specialist working
     underneath. The comparison is the picture. */
  const AT = ({ house: [2, 18, 34], amber: [8, 24, 40], steel: [0, 20, 38] } as const)[v];
  /* ⛔ 318 x 3 LEFT 16px OF MARGIN, and the scene push eats ~25 a side — the
     outer two bays lost their first letter. */
  const LW = 292, GAP = 12;
  const X0 = (W - (LW * 3 + GAP * 2)) / 2;

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.52}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.5} bands={3} kind="plant" overhead="duct"
        rake={0.16 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={7.8} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.55}
        lamp={{ x: 180 + L.b * 0.5, y: 340, r: 200 }} window={null} />
      <Fitout p={p} f={f} seed={3} z={5} />

      {/* the two halves, named once */}
      <div style={{ position: "absolute", left: SAFE3.cx - 214, top: BAND_Y - 42, width: 428,
        height: 58, zIndex: 86, borderRadius: 8, background: hexa(INK, 0.86),
        border: `4px solid ${dkh(GOLD, 0.3)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 16 }}>
        <span style={{ ...ui(24, 900), color: GOLD, letterSpacing: 1.6 }}>{R.halves[0]}</span>
        <span style={{ ...ui(20, 800), color: hexa("#F4EBD6", 0.6) }}>+</span>
        <span style={{ ...ui(24, 900), color: TEAL, letterSpacing: 1.6 }}>{R.halves[1]}</span>
      </div>

      {/* ORDER still differs per cut — a dark low-contrast room defeats a camera
          lever, so what changes between cuts is WHICH bay is where */}
      {ORDER[v].map((ci, i) => {
        const x = X0 + i * (LW + GAP) + L.c * 0.2;
        return (
          <React.Fragment key={i}>
            <SpecLane x={x} w={LW} i={ci} f={f} at={AT[i]} z={50 + i}
              from={i === 1 ? 620 : i === 0 ? -620 : 620} />
            {/* ⛔ THREE BAYS THAT LAND AND THEN SIT ARE THREE POSTERS. A light
                sweeps the full height of each bay as its chain completes — a
                292x530 repaint, three times, staggered, which is the only thing
                in this scene big enough to matter. 8.40 was the reel's floor. */}
            {(() => {
              const sw = E(f, AT[i] + 30, AT[i] + 48, 0, 1, IO);
              return sw > 0.01 && sw < 0.99 ? (
                <div style={{ position: "absolute", left: x, top: 176, width: LW, height: 530,
                  zIndex: 62, borderRadius: 12, overflow: "hidden", pointerEvents: "none" }}>
                  <div style={{ position: "absolute", left: -LW, top: -530 + sw * 1200,
                    width: LW * 3, height: 300, transform: "rotate(-18deg)",
                    background: `linear-gradient(180deg, transparent, ${hexa("#FFF3D0", 0.30)}, transparent)` }} />
                </div>
              ) : null;
            })()}
            {/* the specialist working in front of its own bay */}
            <Contact x={x + LW / 2} y={GY + 6} w={140} o={0.30} />
            <Crew f={f} x={x + LW / 2} y={GY + 10} i={[1, 6, 9][ci]} size={214}
              z={70 + i} tint={R.cast[ci].c} at={AT[i] + 6} loop={ci}
              cheer={E(f, AT[i] + 40, AT[i] + 52, 0, 1, BACK)} />
            {/* the bay lands with weight */}
            {f > AT[i] + 8 && f < AT[i] + 30 && (
              <Ring x={x + LW / 2} y={GY + 4} f={f} at={AT[i] + 10}
                c={mxh(R.cast[ci].c, 0.34)} z={78} s={1.25} dur={16} />
            )}
          </React.Fragment>
        );
      })}

      <Motes x={180 + L.b * 0.5} y={330} w={260} h={280} n={12} f={f} z={42} c="#CFEBD2" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · THE PROMPT CORNER.  109 frames.  ⭐ THE HERO ARTIFACT.
   "It plugs straight into Claude Code, and the desktop app installs your dream
    team in one click."
   ⭐ CUT TO THE MEASURED WORD ONSETS: the lever is gripped on "plugs", it goes
   over on "one click", the Claude lamp lights on "Claude Code", and the roster
   fills across the whole back half so the scene never parks (§19: an entrance
   that ends at 1 is a freeze).
   ====================================================================== */
export const CORNER: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("switch");
  const L = LAY[v];
  /* the cut structure for this scene — see CUTS/S5 */
  /* ⛔ dHASH 8 OF 64 AT f353 (local f69), house/steel. Per-cut gate SHAPE was
     not enough: at f69 all three cuts show the same lit rack over the same
     bright opening over the same crowd, and a coarse geometry hash reads that
     as one picture whatever the rectangle measures. The reliable lever is the
     one the trial-cut doc ranks first — WHEN THE CUT HAPPENS. Steel holds the
     push-in 21 frames longer, so at the hash frame house is wide and steel is
     still tight, which is a different SHOT and not a different tint. */
  const SH: Shot[] = shotsFor(v, [{ at: 0, s: 1.24, x: 296, y: 54 },
    { at: v === "steel" ? 76 : 55, s: 1.00, x: -34, y: -10 }]);
  const sh = shotAt(f, SH);

  /* ⛔ THE HAND IS ON THE LEVER ON FRAME 0. Alex: *"at 9 seconds it's too long
     of just a pause — it doesn't start pulling the lever until way later."* He
     is right: the grip did not begin until f6 and the throw not until f34, so
     the scene opened on more than a second of a man standing next to a switch.
     Grip at 0, strain 6-18, thrown by 26, and the sweep leaves at 26 instead
     of 44 — the whole beat now starts where the sentence starts. */
  /* ⛔ STILL TOO MUCH WAIT. Alex, on a screenshot of this scene's opening:
     *"its not interesting, its too much pause here."* The throw was at f18-26,
     so the shot still opened on ~0.7s of a man holding a lever under a row of
     dark empty squares. Thrown by f18, and the marks are not DRAWN at all until
     the light reaches them — an empty rack is worse than no rack. */
  const grip = E(f, 0, 5, 0, 1, OUT);
  const strain = E(f, 4, 12, 0, 1, IO) * (1 - E(f, 12, 18, 0, 1, OUT));
  const thrown = E(f, 12, 18, 0, 1, BACK);
  const fill = E(f, 18, dur - 4, 0, 1, LIN);
  /* ⭐⭐⭐ THE LEVER NOW OPENS SOMETHING. Alex: *"at 9 seconds with the switch,
     we should see like a Claude logo or something like a gate, then the lever
     opens that, or a light and the lever lights it up."* He named the exact
     defect: the throw had no OBJECT. A wall of light simply existed, so the
     lever was a man pulling a stick next to an unrelated effect — §10, the
     mechanism was half drawn. The gate is the missing half: it carries the
     Claude mark, it rolls up on the throw, and the light in this scene is now
     WHAT COMES OUT OF IT rather than a wipe that happens to start at the edge. */
  /* ⛔ MEASURED OFF THE FIRST RENDER, NOT GUESSED: shot 1 is s=1.24 x=296
     y=54, and the five marks visible in it (mx 116-636) put the readable
     window at roughly panel x 60-680, y 100-620. The gate first sat at x=620
     on the ground line, so two thirds of it — including the Claude mark — was
     outside the push-in, and it finished opening in ten frames. */
  /* ⛔ dHASH MIN WAS 10 OF 64 AT f353 — the floor of the pass band. The gate is
     now the biggest bright shape in this scene, so if all three cuts open the
     same rectangle on the same frame the three pictures converge exactly where
     the light is strongest. Shape and sill differ per cut (the measured lever
     ranking puts LAYOUT above grade), and the mechanism runs on its own clock
     in each — but only by +-4 frames, because the SFX bank is shared and a cue
     that drifts off its own event is worse than a hash four bits lower. */
  const GK = ({ house: [0, 470, 660], amber: [4, 546, 692], steel: [-4, 408, 626] } as const)[v];
  const go = GK[0], GX = 420 + L.a * 0.4, GB = GK[2];
  const gate = E(f, 15 + go, 40 + go, 0, 1, OUT);
  const clunk = E(f, 40 + go, 44 + go, 0, 1, OUT) - E(f, 44 + go, 58 + go, 0, 1, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.62}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.5} bands={3} kind="rack" overhead="gantry"
        rake={0.15 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={8.6} rakeN={RAKE_N[v]}
        floorKind="slab" grit={0.6} window={null} />
      <Fitout p={p} f={f} seed={4} z={5} />
      {/* ⭐ SUPPLY TRAVELS FROM THE LEVER TO THE LAMPS. §10: name the mechanism
          and ask which half is missing — a switch that lights lamps with
          nothing visibly going between them has drawn the trigger and not the
          delivery. These are 118x74, well over the 40px floor, so they survive
          the audit's 1012->240 downsample. */}
      <Runner y={318} f={f} z={54} rate={11.5 + thrown * 7} pitch={168} w={118} h={74}
        c={mxh(GOLD, 0.3)} c2="#0A0C24" kind="bead" o={0.5 + thrown * 0.5} />
      {thrown > 0.15 && (
        <Runner y={412} f={f - 26} z={30} rate={-9.5} pitch={214} w={136} h={82}
          c={mxh(TEAL, 0.24)} c2="#080A1E" kind="cell" o={0.9} />
      )}

      {/* ⭐⭐⭐ THE MARKS ARE THE HERO ARTIFACT NOW. What was here — a 122px
          lamp rail of the seven logos, with a 42-cell roster of 11px role chips
          in front of it — put the unreadable thing in front of the readable
          one. The seven real marks land big, ring, and tick; the number the
          roster used to spell out in 42 pieces is one line above them. */}
      {/* ⭐⭐⭐ THE SWEEP. Alex: *"even at fourteen seconds it needs to be more
          interesting."* The board this replaces was eight tiles landing one
          after another — which is the same shape that got the hook rejected
          eight times: AN ARRANGEMENT OF THINGS APPEARING.
          One action instead: the lever is thrown and a wall of light crosses
          the entire panel, and everything it passes comes on behind it — each
          mark, its ring, its tick, and the specialist standing under it. A
          1012px travel is also the biggest single repaint in the scene. */}
      {(() => {
        /* ⭐ THE LIGHT LEAVES THE GATE. It used to enter from off-panel left,
           which is why it read as a wipe. It now bursts out of the opening and
           runs BOTH ways, so the marks light OUTWARD from the Claude mark —
           the causality is on screen instead of implied. */
        const sweep = E(f, 30 + go, 82 + go, 0, 1, IO);
        const WXr = GX + sweep * 780;
        const WXl = GX - sweep * 640;
        return (
          <>
            {R.tools.map((tl, i) => {
              const mx = 116 + i * 130 + L.b * 0.3;
              const d = Math.max(WXr - mx, mx - WXl);   /* how far the light is past it */
              const on = E(d, -40, 90, 0, 1, OUT);
              if (on <= 0.02) return null;          /* ⛔ never a dark empty tile */
              return (
                <React.Fragment key={tl.n}>
                  {/* the rail the marks hang on */}
                  {/* ⛔ THEY WERE TILES QUIETLY TURNING ON. Alex: *"at 10 seconds
                      we just see the squares and stuff, it's not interesting."*
                      Each mark now POPS to 1.6x as the light reaches it and
                      settles back — an arrival, not a state change — and Claude
                      Code, the only tool the VO names, is permanently larger. */}
                  <div style={{ position: "absolute", left: mx - 61 - (i === 0 ? 14 : 0),
                    top: 214 - (i === 0 ? 16 : 0), width: 122 + (i === 0 ? 28 : 0),
                    height: 150 + (i === 0 ? 32 : 0), zIndex: 56 + (i === 0 ? 4 : 0),
                    borderRadius: 10,
                    transform: `translateY(${(1 - on) * 26}px) scale(${0.9 + 0.1 * on
                      + 0.62 * (E(d, -20, 40, 0, 1, OUT) - E(d, 40, 130, 0, 1, IO))})`,
                    background: `linear-gradient(168deg, ${hexa(tl.c, 0.10 + 0.22 * on)}, ${hexa("#000", 0.34)})`,
                    border: `4px solid ${hexa(tl.c, 0.24 + 0.5 * on)}`,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: 7 }}>
                    <div style={{ width: 76 + (i === 0 ? 18 : 0), height: 76 + (i === 0 ? 18 : 0),
                      borderRadius: 10, boxShadow: SH,
                      background: `linear-gradient(168deg, #FBF6E8, ${hexa("#D8CFB6", 0.92)})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      opacity: 0.62 + 0.38 * on }}>
                      <Img src={staticFile(`logos/${tl.logo}`)}
                        style={{ width: 54 + (i === 0 ? 14 : 0), height: 54 + (i === 0 ? 14 : 0), objectFit: "contain",
                          filter: `saturate(${0.4 + 0.6 * on})` }} />
                    </div>
                    <div style={{ ...ui(14, 900), color: hexa("#FFF6E2", 0.55 + 0.45 * on),
                      whiteSpace: "nowrap" }}>{tl.n}</div>
                    <div style={{ position: "absolute", right: 5, top: 5, width: 21, height: 21,
                      borderRadius: "50%", background: dkh(GREEN, 0.10), ...ui(13, 900),
                      color: "#FFF8E8", display: "flex", alignItems: "center",
                      justifyContent: "center", transform: `scale(${on})` }}>✓</div>
                  </div>
                  {on > 0.05 && on < 0.9 && (
                    <Ring x={mx} y={290} f={f} at={f} c={mxh(tl.c, 0.4)} z={62} s={0.7} dur={10} />
                  )}
                  {/* and the specialist it brings with it */}
                  {on > 0.06 && (
                    <Crew f={f + i * 11} x={mx} y={GY - 4} i={DIVISIONS[i % 6].cos[i % 3]}
                      size={168 * (0.7 + 0.3 * on)} z={64} at={0} loop={i % 3}
                      tint={DIVISIONS[i % 6].c} flip={i % 2 === 0} />
                  )}
                </React.Fragment>
              );
            })}
            {/* the two walls of light, leaving the opening */}
            {sweep > 0.01 && sweep < 0.99 && [WXr, WXl].map((wx, k) => (
              <React.Fragment key={k}>
                <div style={{ position: "absolute", left: wx - 190, top: 120, width: 380,
                  height: 660, zIndex: 70, pointerEvents: "none",
                  background: `linear-gradient(90deg, transparent, ${hexa("#FFE7B0", 0.30)}, transparent)` }} />
                <div style={{ position: "absolute", left: wx - 5, top: 120, width: 10, height: 660,
                  zIndex: 71, pointerEvents: "none", background: hexa("#FFF6DA", 0.86),
                  boxShadow: `0 0 44px ${hexa("#FFD98A", 0.9)}` }} />
              </React.Fragment>
            ))}
            {/* what the sweep leaves behind, stated once */}
            <div style={{ position: "absolute", left: SAFE3.cx - 190, top: BAND_Y + 8, width: 380,
              height: 74, zIndex: 90, borderRadius: 8, background: hexa(INK, 0.86),
              border: `4px solid ${dkh(GOLD, 0.28)}`, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 12,
              transform: `scale(${E(f, 74, 84, 0, 1, BACK)})` }}>
              <span style={{ ...mono(32, 800), color: GOLD }}>{Math.round(R.agents * fill)}</span>
              <span style={{ ...ui(18, 900), color: "#F6ECD2", letterSpacing: 1 }}>
                AGENTS · ONE CLICK
              </span>
            </div>
          </>
        );
      })()}

      <LeverGate f={f} open={gate - clunk * 0.055} x={GX} y={GB} w={GK[1]} h={296} z={52}
        pulse={E(f, 95, 99, 0, 1, OUT) - E(f, 99, dur, 0, 1, IO)} />
      {clunk > 0.03 && (
        <>
          <Puff x={GX - 232} y={GB - 300} f={f} at={40} c="#CFD6E4" z={56} n={7} s={1.0} />
          <Puff x={GX + 232} y={GB - 300} f={f} at={40} c="#CFD6E4" z={56} n={7} s={1.0} />
          <Ring x={GX} y={GB - 150} f={f} at={40} c={mxh(BRASS, 0.42)} z={55} s={2.6} dur={18} />
        </>
      )}
      {/* the drive that carries the throw across to the gate — the lever, the
          shaft, the gate: all three visible, none of them implied */}
      <div style={{ position: "absolute", left: 150 + L.a * 0.5, top: GB - 262,
        width: GX - 236 - GK[1] * 0.06, height: 13, zIndex: 50, borderRadius: 3,
        transform: `translateX(${thrown * 26}px)`,
        background: `linear-gradient(180deg, ${mxh(BRASS, 0.34)}, ${dkh(BRASS, 0.44)})`,
        boxShadow: gate > 0.05 ? `0 0 ${26 * gate}px ${hexa("#FFD98A", 0.6 * gate)}` : "none" }} />
      <KnifeLever x={132 + L.a * 0.5} y={GY - 20} throwK={thrown} s={1.08} z={58} />

      {/* the hero throws it with his whole body: braced, straining, then the
          release OVERSHOOTS past his standing height */}
      <Contact x={196 + L.a * 0.5} y={GY - 10} w={158} o={0.32} />
      <Hero f={f} x={196 + L.a * 0.5} y={GY} size={206} z={62} act={1} ph={0.9}
        strain={strain} drive={grip * 0.5 - thrown * 0.7 + E(f, 20, 32, 0, 1, OUT) * 0.3
          - E(f, 32, 46, 0, 1, IO) * 0.3}
        reach={grip} gaze={-0.2} cheer={E(f, 54, 68, 0, 1, BACK)} />
      <Steam x={196 + L.a * 0.5} y={GY - 190} f={f} at={0} n={8} z={64} s={1.1} />
      {thrown > 0.5 && (
        <>
          <Puff x={132 + L.a * 0.5} y={GY - 34} f={f} at={14} c="#BFC6DA" z={64} n={9} s={1.1} />
          <Ring x={132 + L.a * 0.5} y={GY - 96} f={f} at={14} c={mxh(BRASS, 0.4)} z={66} s={1.1} />
        </>
      )}
      {/* ⛔ the band goes BEHIND nothing here — the roster board is the hero and
          sits above it, so the crowd fills the floor the install lands on */}
      {/* ⛔ THE TAIL AGAIN — after the count stamps at f84 this scene had 17
          frames of nothing. The whole board flashes and the crowd answers. */}
      {(() => {
        const tl = E(f, 84, 90, 0, 1, OUT) - E(f, 90, dur, 0, 1, IO);
        return tl > 0.02 ? (
          <div style={{ position: "absolute", left: 506 + L.c * 0.4 - 420, top: GY - 158 - 380,
            width: 840, height: 396, zIndex: 74, borderRadius: 12, pointerEvents: "none",
            background: hexa("#FFE7B0", 0.26 * tl),
            boxShadow: `0 0 ${64 * tl}px ${hexa("#FFD98A", 0.66 * tl)}` }} />
        ) : null;
      })()}
      {/* ⭐⭐⭐ "IN ONE CLICK" — SO DRAW THE CLICK. Alex: *"at 11/12 seconds
          when it says one click, it should show that like a big cursor then
          clicking."* The line named an action and the frame was showing a light
          sweep. Word onsets out of `words_135agency.json`: "one" is spoken at
          global f365 (local 81) and "click" at f378 (local 94) — the cursor
          travels in across "one" and the button goes down ON "click". */}
      {/* ⛔ SIXTH TIME, AND THE SECOND SHAPE OF IT. HOLD is measured against
          the scene's OWN 10th-percentile floor, so BOTH a drifting light ray AND
          six sprites with action loops walking out of the gate raise the floor by
          as much as they raise the body: 47 to 56 to 56 percent. Nothing
          continuous ever lowers HOLD. The gate SETTLING at f40 is the only thing
          added here that is genuinely discrete, and this scene's floor is already
          high because the runners, motes, near band, steam and every crew loop
          never stop. SWEEP measures 20.5 motion against a 6.0 bar; its HOLD is the
          price of a floor built out of continuous life, reported and not gated. */}
      <BigCursor f={f} at={81} x={506 + L.b * 0.2} y={556} from={[1160, 900]} z={96} />
      <NearBand f={f} n={BAND[v].n} y={874} size={242} z={80}
        x0={-40 + BAND[v].dx} pitch={BAND[v].pitch} at={20} seed={BAND[v].seed} dx={0} />
      <Motes x={556} y={300} w={420} h={300} n={12} f={f} z={44} c="#CBD6FF" />
          </Cam>
</Scene>
  );
};

/* =========================================================================
   S6 · THE STAGE.  130 frames.  The peak.
   "You just became an AI agency owner for free, comment AGENCY and I'll send
    you the repo."
   ⭐ THE COMPANY IS A NEAR BAND WITH A VALUE RAMP — nearest biggest, back ranks
   in progressively darker clay. Size alone is a texture; VALUE is what makes
   depth readable and it is the axis the greyscale audit can see.
   ⛔ pitch >= 0.85 x size, computed, not eyeballed: rank 0 is 5 x 150px across
   820px = 164px pitch against 150px bodies.
   ====================================================================== */
export const STAGE: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("stage");
  const L = LAY[v];
  /* the cut structure for this scene — see CUTS/S6 */
  const SH: Shot[] = shotsFor(v, [{ at: 0, s: 1.14, x: 0, y: 74 },
    { at: 56, s: 1.00, x: 0, y: 0 }]);
  const sh = shotAt(f, SH);
  /* ⛔⛔ THE OPENING FRAMES OF THIS SCENE CONVERGED. dHash measured 7 bits at
     f381 — local f8 — because before the curtain has gone, the plate has risen
     or the company has arrived, all three cuts are the same empty stage. The
     ENTRANCE is now staggered per cut, so there is no frame at which the three
     are showing the same nothing. */
  const ENT = ({ house: [2, 24, 12, 32], amber: [0, 16, 4, 22],
                 steel: [6, 32, 20, 44] } as const)[v];
  const out = E(f, ENT[0], ENT[1], 0, 1, IO);
  const rise = E(f, ENT[2], ENT[3], 0, 1, OUT);
  /* ⛔ CUT TO THE MEASURED WORD ONSETS. "owner" is spoken at local f27 and the
     keyword "AGENCY" at f55; the plate used to reveal at f44 and the CTA at
     f84, which after the false start was removed fell past the hard cut
     entirely. Both now land ON their words. */
  const cut = E(f, 32, 45, 0, 1, LIN);
  /* ⛔ the CTA lands ON the spoken keyword, and nothing follows it */
  const kw = E(f, 67, 80, 0, 1, LIN);
  const KWY: Record<Variant, number> = { house: 512, amber: 462, steel: 548 };

  /* ⛔ pitch >= 0.85 x size, computed per rank, never eyeballed — 18 sprites at
     one size across 600px is what rendered as one unreadable orange mass on
     reel 107. And the VALUE RAMP is what makes it depth rather than texture:
     it is the axis the greyscale audit can actually see. */
  /* ⛔ THE THREE CUTS CONVERGED HERE: dHash measured MIN 8 at f625 against a
     10 bar, because camera + grade + rake are a crop, a tone curve and a band,
     and by the last scene all three cuts were showing the same company in the
     same formation. Per-cut LAYOUT is the axis a perceptual hash reads hardest,
     so the company is BLOCKED DIFFERENTLY in each cut: different rank counts,
     different sizes, different ground lines. */
  const RANKSETS: Record<Variant, Array<{ n: number; size: number; y: number; tone: number; z: number }>> = {
    house: [
      { n: 4, size: 196, y: GY + 8, tone: 0.00, z: 58 },
      { n: 5, size: 148, y: GY - 84, tone: 0.26, z: 50 },
      { n: 6, size: 108, y: GY - 152, tone: 0.48, z: 44 },
    ],
    amber: [
      { n: 3, size: 224, y: GY + 14, tone: 0.00, z: 58 },
      { n: 6, size: 132, y: GY - 96, tone: 0.30, z: 50 },
      { n: 8, size: 92, y: GY - 158, tone: 0.54, z: 44 },
    ],
    steel: [
      { n: 5, size: 172, y: GY + 2, tone: 0.00, z: 58 },
      { n: 4, size: 158, y: GY - 76, tone: 0.22, z: 50 },
      { n: 7, size: 100, y: GY - 164, tone: 0.44, z: 44 },
    ],
  };
  const RANKS = RANKSETS[v];

  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.50}>
      <Cam x={sh.x} y={sh.y} s={sh.s} z={12}>
      <Room p={p} f={f} dx={L.a * 0.4} bands={3} kind="column" overhead="lampbar"
        rake={0.16 * RAKE_K[v]} rakeX={RAKE_X[v]} rakeRate={7.0} rakeN={RAKE_N[v]}
        floorKind="boards" grit={0.5} window={null} />
      <Fitout p={p} f={f} seed={5} z={5} />

      {/* the house lights running the full width, behind the company — a band
          that ALTERNATES light and shadow, so every boundary is a luma edge */}
      <FlyBar y={168} f={f} rate={8.4} z={24} pitch={182} c="#FFE6B0" />

      {/* ⭐ THE HOUSE JUMPS WHEN THE KEY GOES DOWN. A wrapper that only exists to
          animate a group needs position + inset + z-index, or its `transform`
          becomes the containing block and everything inside it vanishes — that
          bug has cost this reel two renders already. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translateY(${-30 * (E(f, 80, 86, 0, 1, BACK) - E(f, 89, 99, 0, 1, IO))
          - 20 * (E(f, 96, 101, 0, 1, BACK) - E(f, 103, 108, 0, 1, IO))}px)` }}>
      {/* the company, back ranks first so the near band occludes them */}
      {RANKS.slice().reverse().map((r) => {
        const pitch = 880 / (r.n + 1);
        return Array.from({ length: r.n }).map((_, i) => {
          const at = 16 + (2 - RANKS.indexOf(r)) * 6 + i * 3;
          return (
            <Crew key={`${r.size}-${i}`} f={f} x={66 + pitch * (i + 1) + L.b * 0.3}
              y={r.y} i={i * 3 + r.n} size={r.size} z={r.z} at={at}
              loop={2}
              /* ⭐ TWO CHEER WAVES, AND THE SECOND ONE IS IN THE TAIL. The whole
                 company changing shape is the only full-frame arrival this
                 scene has left once the keyword plate is gone. */
              /* ⭐ THREE ANSWERS, NOT TWO. 57% hold with a dead run in the CTA
                 is the last impression of the reel sitting still. */
              cheer={Math.max(
                E(f, 40 + i * 4, 50 + i * 4, 0, 1, BACK) - E(f, 56 + i * 4, 64 + i * 4, 0, 1, IO),
                E(f, 70 + i * 3, 78 + i * 3, 0, 1, BACK) - E(f, 82 + i * 3, 88 + i * 3, 0, 1, IO),
                E(f, 92 + i * 3, 100 + i * 3, 0, 1, BACK))}
              /* ⭐ the company you now own is the SAME six divisions, still in
                 their colours — the CTA is the payoff of the colour language,
                 so it is the last place to drop it. Depth still darkens. */
              tint={dkh(divBy(["ENGINEERING", "DESIGN", "MARKETING", "PAID MEDIA",
                "SECURITY", "TESTING"][(i + r.n) % 6]).c, r.tone * 0.5)} />
          );
        });
      })}

      </div>

      {/* the hero, now in the suit, takes centre */}
      <Contact x={506 + L.a * 0.4} y={GY - 8} w={196} o={0.34} />
      <Hero f={f} x={506 + L.a * 0.4} y={GY} size={244} z={66} act={2} ph={0.4}
        costume={{ suit: 1 }} gaze={0} cheer={E(f, 62, 78, 0, 1, BACK)} />

      <OwnerPlate x={506 + L.c * 0.4} y={286 + (v === "amber" ? -34 : v === "steel" ? 30 : 0)}
        rise={rise} cut={cut} s={v === "amber" ? 1.12 : v === "steel" ? 0.92 : 1} z={74} />

      {/* the receipt strip: the name, the count and the price, once */}
      <div style={{ position: "absolute", left: SAFE3.cx - 250, top: BAND_Y - 24, width: 500,
        height: 62, zIndex: 88, borderRadius: 8, background: hexa(INK, 0.86),
        border: `4px solid ${dkh(GOLD, 0.28)}`, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 14, opacity: E(f, 26, 40, 0, 1, OUT) }}>
        <span style={{ ...ui(23, 900), color: "#F6ECD2", letterSpacing: 1.4 }}>{R.name}</span>
        <span style={{ ...mono(20, 700), color: GOLD }}>{R.agents}</span>
        <span style={{ ...mono(20, 700), color: hexa("#F6ECD2", 0.5) }}>·</span>
        <span style={{ ...mono(22, 800), color: mxh(GREEN, 0.3) }}>{R.price}</span>
      </div>

      {f > 30 && <Fall x={506} y={60} w={900} f={f} at={32} n={26} c={GOLD} z={80} s={1.5} rate={0.85} />}
      {f > 42 && <Fall x={506} y={60} w={900} f={f} at={44} n={20} c={mxh(GOLD, 0.28)} z={79} s={1.2} rate={0.6} />}
      {/* ⛔ AND THE HOUSE KEEPS ARRIVING TO THE END. The composer is a small-area
          event, so with the keyword plate gone the tail sat at 67% hold — the
          reel's last impression being a still frame is the one place that
          cannot be allowed. */}
      {/* ⛔ NOT A MOVER — ARRIVALS. A lantern run here took HOLD 58% -> 67%. The
          tail gets three real landings instead: the parcel cracking open, the
          send key going down, and one last burst over the house. */}
      {f > 74 && <Fall x={506} y={60} w={940} f={f} at={76} n={22} c={mxh(GOLD, 0.16)} z={78} s={1.2} rate={0.62} />}
      {f > 86 && <Fall x={506} y={60} w={860} f={f} at={88} n={16} c={GOLD} z={77} s={1.0} rate={0.5} />}
      {/* ⛔⛔ THE LAST TWO SECONDS WERE ONE FRAME. Alex: *"at 13-16 seconds it's
          so long where we see that scene of static."* The send lands at f78 and
          then nothing happened for 30 frames. The house now JUMPS as a body —
          a wrapper with position+inset+z, because a bare `transform` div would
          become the containing block and swallow the crowd. */}
      {(() => {
        const pop = E(f, 79, 85, 0, 1, OUT) - E(f, 85, 100, 0, 1, IO);
        return pop > 0.02 ? (
          <>
            <div style={{ position: "absolute", inset: 0, zIndex: 86, pointerEvents: "none",
              background: `radial-gradient(ellipse at 50% 62%, ${hexa("#FFE7B0", 0.34 * pop)} 0%, transparent 60%)` }} />
            <Ring x={506 + L.c * 0.4} y={KWY[v] + 60} f={f} at={79} c={mxh(GOLD, 0.42)}
              z={87} s={2.4} dur={22} />
          </>
        ) : null;
      })()}
      {f > 82 && <Fall x={506} y={40} w={960} f={f} at={84} n={26} c={mxh(GOLD, 0.2)} z={78} s={1.4} rate={0.9} />}

      {/* ⛔ THE FINALE MUST NOT BE SMALLER THAN THE OPENING. The hook now shows
          the whole company, so a thinner crowd at the payoff reads as a
          let-down. The band goes in front, and it sits well below the keyword
          plate at y 520 so it can never cover the one word the shot spells
          out — that mistake cost reel 132 a round. */}
      <NearBand f={f} n={BAND[v].n} y={874} size={238} z={82}
        x0={-40 + BAND[v].dx} pitch={BAND[v].pitch} at={10} seed={BAND[v].seed} dx={0} />
      {/* ⛔ NO PARCEL. Alex: *"its too complex, just keep it simpler with that
          random graphic in front."* The composer already carries the whole CTA
          and it carries it as an unfinished action; a second object beside it
          was a second thing to look at during the one beat that needs exactly
          one. */}
      <Curtain out={out} s={1} z={90} />
      {/* ⛔ THE CTA IS BEING TYPED, NOT DISPLAYED. A finished plate is a state,
          and a state gives permission to leave; an unfinished word does not. */}
      {/* typing starts at f40 so the last letter lands ON the spoken keyword
          (local f55) instead of after it, and the send key is still pulsing
          when the reel ends — the frame is unfinished at the exact moment the
          viewer decides whether to scroll */}
      <Composer x={506 + L.c * 0.4} y={KWY[v] - 6} f={f} at={40} s={1} z={94} />
          </Cam>
</Scene>
  );
};
