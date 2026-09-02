import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Ring, Puff, Motes, Contact, Pool, Beam, Rake, Runner, Steam,
  Crew, Hero, costumeFor, squash, rock, Chip, Mark, MarkCast,
  BAYS, BAY_N, Shutter, BayFrame, BayFlood, BayLamp, BayNum, MarkTile, OutTray,
  HypeMob, Apron, Facade, RowWall, BayRoom, VarCtx, GHero, HOT_BAYS, BaySlam, PLACE, R,
  NIGHT, HOT, COLD, JBLUE, OVIO, MAMBER, PTEAL, SHUT, JAMB, STEEL, SLATE,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, COPPER,
} from "./RowWorld";
import {
  PRRack, JulesRig, PowerFeed, NightWindow, BugCatch, TestRack, DepPucks,
  NodeBlock, NodeCanvas, Cable, EnglishStrip, MiniApp,
  PinCard, WhiteBoard, GenFrame, Press, SitePage, AdSheet, PRCard,
} from "./RowProps";
/* ⭐⭐ THE OFFICIAL FOOTAGE, IN THE HOUSE DEVICE FRAME. `Broll` and `Shot` are
   reel 116's components, reused rather than rebuilt — they already carry the
   chrome, the LIVE pip, the hard `punch` (a scale STEP, never a tween) and the
   per-cut `bv` framing that stops trial cuts sharing pixels.
   ⛔ Every clip is GOOGLE'S OWN launch video, verified by channel id:
     opal_*      "Introducing Opal"                    Google for Developers
     mixboard_*  "Introducing Mixboard | Google Labs"  Google
     pomelli_*   "Introducing Pomelli | Google Labs"   Google
   ⛔ JULES HAS NO OFFICIAL LAUNCH VIDEO on any Google channel. The top "Meet
   Jules" result is a third-party upload (channel `Padakoo`), so Jules gets a
   live headless capture of jules.google instead. A wrong source is worse than
   no source, exactly like a wrong mark.
   ⛔ Clips are cut with `-an` AND played `muted` — the VO owns that track. */
import { Broll, Shot } from "./BillProps";
/** ⛔ the sprite safe band lives here: feet <= 672, x 208..879 (`BillChars` header) */
import { foot } from "./BillChars";
import { SplitFlap, Gantry } from "./StarWorld";

/* ===========================================================================
   REEL 129 · "GOOGLE" — THE SCENES. Board: storyboards/129-google.md.

   ⛔ EVERY SCENE OWES ITS OWN EVENT (§2): a before state legible on frame 1, a
      visible trigger, TRAVEL that crosses distance, and an arrival that COSTS
      something. A cut is not an event.
   ⛔ AND THE HERO ACTS (§14 — `Hero` had no action loop in a shipped reel and
      stood dead for 100 of 132 frames). Asked of every scene, what does the
      CLAUDE DO?
     S0  stands at the back of the mob, facing away, and does not turn either
     S1  is not here — the row is, and it is opening
     S2  reaches into the tray, lifts the thing out and turns it over
     S3  is ASLEEP in the chair, and stays asleep
     S4  is still asleep while the rack empties behind him
     S5  is still asleep while the window goes from night to dawn
     S6  lifts a node off the rail, carries it across the bay and drops it
     S7  hauls a rope to lower a harness onto the n8n rig, and it is heavy
     S8  speaks, and the sentence he says crosses the whole frame
     S9  watches the app boot with his hands still at his sides
     S10 steps back as the board comes down out of the ceiling
     S11 throws scraps up onto the board, one after another
     S12 tears three wrong pictures off and keeps the fourth
     S13 walks the press bed as it seats
     S14 feeds the page in and the machine takes three things out of it
     S15 stands back with his hands behind his back and does NOTHING
     S16 is the one facing us while sixteen others finally turn round

   ⛔ ANYTHING CROSSING A CUT IS `LIN` OR `IN` (§23) — an `IO`/`OUT` ease
      decelerates into its own cut whether or not the end is on screen.
   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band.
   ⛔ ARRIVALS SPREAD ACROSS THE FULL DURATION (§9) — an arrival inside the
      first third leaves the rest of the scene dead.
   ========================================================================= */

/* ⭐ GOOGLE'S OWN MIXBOARD SAMPLE OUTPUTS, pulled from the product page's asset
   directory (`gstatic.com/canvas/marketing/*`). These are the exact pictures
   Google uses to show what the board makes, so the cards on the board and the
   image that finally LOCKS are real Mixboard results rather than drawn
   stand-ins. `feedback_real_product_footage`: real content is both the biggest
   motion lever in the repo and the only version of this shot that is true. */
export const MB_REAL = [
  "broll/shots/mb_chair.png", "broll/shots/mb_cake.png", "broll/shots/mb_pants.png",
  "broll/shots/mb_light.png", "broll/shots/mb_catTower.png", "broll/shots/mb_mug.png",
  "broll/shots/mb_bird.png", "broll/shots/mb_plate.png", "broll/shots/mb_banana.png",
] as const;

export type Variant = "house" | "amber" | "steel";
type SP = { v: Variant; dur: number };

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER — `hue-rotate`/`saturate` are BANNED from
    GRADE (`feedback_trial_cut_variants`: amber shipped an off-brand mascot).
    ⛔ AND A TILT IS NOT A VARIANT (`feedback_a_tilt_is_not_a_variant`): a rotate
    buys ~0 bits of dHash and tilts the horizon. The levers here are SHOT SIZE
    and TRANSLATION, which is what actually moves a perceptual hash. */
/** ⭐⭐ THE HOOK IS CONTESTED — four notes on "anticipation" and four different
    answers from me. `boss128-reel` measured THREE concepts side by side before
    committing (A SWAT 4.55 · B WIPE 5.81 · C BLOCK 5.23) and that is the process
    this should have been using two rounds ago. Flip and render `--frames=0-51`.

      "build"  THE BUILD    — boxes thrown on faster and faster; the stack starts
                              to go on the last beat and the cut denies the fall.
      "last"   THE LAST ONE — he is already holding fourteen. The fifteenth is
                              lowered onto the top, slowly, for the whole shot.
                              The tower bows under it. Cut. (a Jenga moment, and
                              "fifteen" is the literal count in the VO)
      "door"   THE DOORWAY  — he carries all fifteen toward a doorway whose lintel
                              is plainly below the top of his stack, and does not
                              slow down. The gap closes all shot. Cut before impact.
                              (the most legible: nobody has to be told what happens) */
export type HookKind = "build" | "last" | "door" | "hose" | "roll" | "rain" | "burst" | "juggle"
  | "crowd" | "shelf" | "spot" | "podium";
/* ⛔ the `as HookKind` is load-bearing: without it TS narrows a const to its
   literal and every other branch becomes an "unintentional comparison" error. */
/** ⛔⛔⛔⛔⛔ FIFTH NOTE, AND FOUR OF THEM WERE THE SAME OBJECT. build / last / door
    are three stagings of ONE hero prop: a Claude holding a stack of white boxes.
    `feedback_three_notes_means_the_object` says the first note is values, the
    second staging, the THIRD the object itself — and I restaged it four times.

    ⛔ Worse, `feedback_recognition_beats_craft_on_a_hook_object` lists the exact
    failure: *"could a stranger name this object in half a second from its
    SILHOUETTE alone? A typewriter, a boulder, a keyboard, a padlock — yes. A
    large card, a CRATE, a SLAB, a 'module' — no."* A stack of boxes is on the
    NO list, and Alex has been saying "just squares and rectangles" about this
    reel since the body scenes. I built four hooks on a banned shape.

    ⭐⭐⭐ "hose" IS A NEW OBJECT, and it clears all three bars:
      1 NAME IT IN TWO WORDS — a fire hose. Nobody has to decode it.
      2 CAN A BODY DO THAT TO IT — wrestling a pressurised hose is one of the
        most legible strain images there is, and it is a TOOL a body operates,
        not an apparatus that performs by itself.
      3 IS IT THE SUBJECT — "Google is firehosing AI tools" is the literal idiom
        people use about this, and the thing coming out of it is Google's own
        real product marks. Not a metaphor for how it feels: a depiction of
        "Google shipped fifteen new tools this month."
    ⭐ And the anticipation is structural rather than staged: a hose under rising
    pressure is a rope going tight. It swells, it bucks harder, his heels slide —
    and the cut lands before it tears out of his hands. */
export const HK: HookKind = "podium" as HookKind;

export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1.000, rot: 0 },
  amber: { dx: -84, dy: -36, s: 1.118, rot: 0 },
  steel: { dx: 90, dy: 32, s: 1.058, rot: 0 },
};
export const GRADE: Record<Variant, string> = {
  house: "none",
  amber: "brightness(1.04) contrast(1.05)",
  /* ⛔ 0.97 put the steel cut's frame 0 at 139.4 against the 140 law while the
     house cut sat at 144.2 — a per-cut GRADE can fail a gate the house cut
     passes, so every variant is measured, not assumed. */
  steel: "brightness(1.00) contrast(1.09)",
};

/* ---- shared: the row, drawn once, parameterised by what is open ---------- */
const RowWide: React.FC<{ f: number; open: (i: number) => number; lamps?: number;
  nums?: (i: number) => number; mob?: React.ReactNode; z?: number; dx?: number }> =
  ({ f, open, lamps = 1, nums, mob, z = 0, dx = 0 }) => (<>
    {/* ⭐ THE BUILDING, not empty sky. The first cut put a third of the frame at
        ~30/255 and frame 0 measured 63 against a 140 bar. */}
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 300, zIndex: 2,
      background: `linear-gradient(180deg, ${PLACE.row.back} 0%, ${PLACE.row.back2} 100%)` }} />
    <Facade f={f} y={0} z={6} lit={1} />
    {/* the apron: the row's background process */}
    <Apron f={f} y={690} z={10} slope={228} />
    {/* ⭐ the DARK wall the bays are holes in — without it they float */}
    <RowWall y={250} h={456} z={18} f={f} />
    {/* the bays. ⛔ ONLY the bays travel — the sky and the apron do not, because
        a whole frame sliding at one rate reads as a slide, not as a camera. */}
    {/* ⛔⛔⛔ THE EXPLICIT zIndex IS LOAD-BEARING. A `transform` creates a NEW
        STACKING CONTEXT, so every zIndex inside this wrapper is relative to the
        WRAPPER — and with no zIndex of its own the whole group sat at auto and
        `RowWall` (z 18) painted over all fifteen bays. The still showed a dark
        wall with no doors in it at all. This is `NomWorld.Cam`'s own comment
        ("reel 93 lost a whole tower to a transform with no zIndex") hit again
        in a different file. ⭐ AND NOTE THE GATE COULD NOT SEE IT: frame-0 luma
        moved 112 -> 79 and motion stayed plausible, because a missing object
        just reads as a darker frame. Only the still showed it. */}
    <div style={{ position: "absolute", inset: 0, zIndex: 30,
      transform: `translateX(${dx}px)` }}>
    {BAYS.map(g => {
      const o = Math.max(0, Math.min(1, open(g.i)));
      return (<React.Fragment key={"by" + g.i}>
        <BayFlood g={g} lit={o * (g.i % 3 === 2 ? 0.62 : 1)} c={g.i === 1 || g.i === 4 ? HOT : COLD} z={20} />
        <BayFrame g={g} lit={o * (g.i % 3 === 2 ? 0.58 : 1)} key2={g.i === 1 || g.i === 4 ? HOT : COLD} z={44} />
        <Shutter g={g} open={o} z={52} />
        <BayLamp g={g} on={lamps} z={40} />
        <BayNum g={g} on={nums ? nums(g.i) : 0} z={58} />
      </React.Fragment>);
    })}
    </div>
    {mob}
  </>);

/* =========================================================================
   S0 · HOOK — 0.00 to 1.73s (52f) · WIDE
   VO: "Everyone's hyping Antigravity and Stitch right now,"

   ⭐ THE EVENT, and it is the layout itself: THIRTEEN SHUTTERS ROLL UP IN A
   WAVE. §1's top row is LARGE x BRIGHT x FAST, and this is thirteen objects
   each travelling its own full height with a flood of light arriving under it.
   ⛔ The wave is `IN_Q` — it ACCELERATES down the row and is FASTEST ON THE CUT
   FRAME (§23). Cutting on acceleration is what editors do.
   ⛔ FRAME 0 LAW: bright, subject present, recognition, mute-readable. The
   brightness is bought from the two blazing bays, their wet reflections and
   fifteen lamp cones — NEVER from lifting the shadows (§8).
   ⛔ THE MOB DOES NOT TURN. The villain's rule starts on frame 0.
   ======================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const P = PLACE.row;

  /* ⛔⛔⛔ THE HOOK WAS REPLACED WHOLESALE. The old one (THE PANEL — a machined
     cover unbolting itself off a 5x3 rack of fifteen 70px tiles) is the exact
     shape three separate memories say does not work:

       · `feedback_a_hook_needs_a_body_not_a_mechanism` — reel 130 built SHUTTER,
         LIGHTS, COUNT, SLOT, DRAWER and GATE and every one came back "boring".
         All six are AN APPARATUS PERFORMING WITH A CLAUDE STANDING NEXT TO IT.
         A cover coming off a rack is the seventh.
       · `feedback_hierarchy_is_layers_removed` — fifteen equal tiles cannot rank.
         A row of equals has no first thing.
       · `feedback_recognition_beats_craft_on_a_hook_object` — at half a second a
         viewer RECOGNISES a thing. A grid of squares is what "I don't know what
         I'm looking at" means.

     ⭐⭐⭐ WHAT THE THREE REFERENCE HOOKS ACTUALLY SHARE. Pulled their frames and
     they are the same shot three ways: ONE huge nameable thing at 40-50% of panel
     width, ONE body at full size doing something physical to it, and nothing else
     in frame. OX = a real ox, harnessed, DRAGGING a rig. UNLAZY = one enormous
     balloon reading DONE, about to POP. BOSS = a boss SWATTING the work out of a
     Claude's hands. Body · verb · object. Three elements, no systems.

     ⭐ SO: THE ARMFUL. He is carrying all fifteen at once — a teetering stack
     taller than he is, wrapped in both arms, braced. The VO's own verb is
     "Google SHIPPED fifteen new AI tools", and this is fifteen shipped things
     with a body under them. Then the two everybody actually talks about slide
     off the top and get carried away by someone else, and he is left holding the
     other thirteen. The whole premise, with no words in the picture.

     ⛔ NOT A HAUL. Reel 130 ships a body dragging a load on a strap and these two
     post days apart — `boss128-reel`'s rule (everything 118 owned is banned in
     128, or they read as one post). Carrying is a different verb from dragging.
     ⛔ AND THE ANTICIPATION IS THE WOBBLE, not a wind-up: the stack leans, and it
     has not fallen yet. 119 puts its whole first beat in the slack going out of
     the chain; this puts it in a stack that is past its angle. */

  /* ⛔⛔⛔⛔ FOURTH NOTE ON ANTICIPATION, so the previous three answers were all
     the same wrong answer in different clothes:
       v1  a pile past its angle, wobbling            — a STATE, no clock
       v2  a second Claude walking over with one box  — a clock, but a slow
                                                        lateral one with no
                                                        visible process in it
     ⭐ WHAT 119 ACTUALLY DOES, precisely: a physical process VISIBLY COMPLETES
     inside the shot. You watch the slack leave the chain link by link and the
     last frame is the one before the pull. UNLAZY inflates a balloon. BOSS winds
     up and swings. In every case the shot contains the whole approach to a limit,
     and the limit is obvious.

     "Someone is walking over here" is not that. Nothing about it is nearer to
     failing at f40 than at f10 — the pile is exactly as stable either way.

     ⭐⭐ SO THE LOAD IS BUILT IN FRONT OF YOU, AND IT ACCELERATES. He starts under
     seven and ends under fifteen, thrown on faster and faster — 8f between the
     first two, 3f between the last two. He sinks, the lean climbs, the whole
     stack shudders on every landing. You can COUNT the thing getting worse.
     ⭐⭐⭐ AND THE CAMERA PULLS BACK BECAUSE IT NO LONGER FITS — 1.24 to 1.00 across
     the scene. Frame 0 is tight on a body already at his limit (which is also the
     answer to "everything is too small"), and the pull-out is what tells you the
     problem is growing faster than the frame can hold it.
     ⛔ The reveal is the CAMERA, not a cut: `feedback_the_camera_must_never_tilt`
     still holds — this is scale only, no rotation. */

  /* the accelerating arrival clock — intervals 8,7,6,5,4,4,3 */
  const ARR = HK === "build" ? [6, 14, 21, 27, 32, 36, 40, 44]
            : HK === "last"  ? [40]              // one box, lowered all shot
            : [];                                // "door": he already has them all

  /* every landing shakes the whole stack; they overlap, so it gets worse */
  const shake = ARR.reduce((acc, at) => {
    const lf = f - at;
    return acc + (lf >= 0 ? Math.sin(lf / 2.2) * Math.exp(-lf / 7) : 0);
  }, 0);

  /* ⛔ the lean CLIMBS to the cut and never resolves. `IN_Q`, so it is steepest
     in the last frames — the shot ends at its most unstable moment. */
  /* ⭐ THE BOW — "last" only. Once the fifteenth touches at f40 the tower starts
     to deform: every box above the waist shifts a little further than the one
     below it, which is what a stack does in the half-second before it goes. */
  const bow  = HK === "last" ? E(f, 38, dur + 3, 0, 1, IN_Q) : 0;
  /* ⛔ capped. 5.6 + 9.4 + shake*2.6 reached ~19deg and the tower read as
     FALLING OVER rather than growing — and once it is past ~13deg the upper boxes
     swing out of frame entirely. Anticipation needs it to stay UP and get worse. */
  const lean = (HK === "door" ? 4.2 : 4.6)
             + E(f, 0, dur + 4, 0, HK === "last" ? 4.6 : 6.8, IN_Q)
             + shake * 1.5 + bow * 6.0 + Math.sin(f / 5.4) * 0.9;
  const sink = E(f, 0, dur + 4, 0, 30, IN_Q);        // he goes DOWN under it
  const set  = shake * 0.9;

  /* ⭐ FIFTEEN, and the count is the point. Seven are on him at frame 0 — enough
     that he already reads as overloaded — and eight more arrive. Rows build
     upward as the camera pulls back to find them. */
  /* ⛔⛔⛔ MEASURED: THE PULL-BACK WAS EATING THE BUILD. The boxes filled 14.0%
     of the panel at f0 and only **8.5%** at f50 — the shot was showing LESS stuff
     as more arrived, which is the exact opposite of what it is for. A 1.24 -> 1.00
     camera is a 35% area shrink and eight extra boxes could not outrun it.
     ⭐ Two changes: the tower is packed into five tighter rows so it fits without
     a big pull-out, and the pull-out drops to 1.16 -> 1.00 (19% area). Net
     apparent growth is now ~1.6x instead of 0.6x.
     ⛔ AND THIS IS A CLASS OF BUG NO GATE CATCHES — motion, luma and halves all
     passed on a shot that read backwards. The only way to see it was to count the
     subject's pixels at f0 and f50 and compare. */
  const PILE: [number, number, number, number, number][] = [
    [2, 322, 470, -7, 0], [3, 428, 486, 5, 0], [12, 528, 466, -4, 0],
    [13, 340, 366, 6, 0], [4, 444, 354, -8, 0], [5, 540, 370, 3, 0],
    [6, 358, 262, -5, 0],
    [8, 462, 250, 7, ARR[0] ?? 0], [11, 556, 266, -6, ARR[1] ?? 0],
    [7, 376, 162, 9, ARR[2] ?? 0], [14, 482, 150, -11, ARR[3] ?? 0],
    [9, 578, 168, 4, ARR[4] ?? 0],
    [10, 404, 66, -8, ARR[5] ?? 0], [0, 510, 54, 6, ARR[6] ?? 0],
    /* ⭐ the FIFTEENTH. In "last" it is the only one still to arrive and it takes
       the whole shot to come down; in the others it lands with the rest. */
    [1, 606, 72, -5, HK === "last" ? 40 : (ARR[7] ?? 0)],
  ];
  const N = PILE.length;
  const CX = 452, CY = 486;             // the pivot: where it meets his shoulder
  const TW = 198, TH = 126;

  return (
    <Scene p={P} slug="" vig={0.24 - E(f, 0, dur, 0, 0.09, LIN)}>
      <Cam s={HK === "build" ? 1.16 - E(f, 0, dur + 2, 0, 0.16, LIN) : HK === "last" ? 1.10 - E(f, 0, dur + 2, 0, 0.10, LIN) : 1.06} z={12}>
        {/* ── THE ROOM. ⛔ v1 of this hook stripped the set to three layers to fix
             a hierarchy note, and Alex's answer was *"needs a more detailed
             background."* Those are not in conflict: `feedback_hierarchy_is_layers_removed`
             is about competing SYSTEMS, and §1's measured finding is the opposite
             — a DENSE CORRECT ROOM is worth more than any effect on top of it
             (7.68 -> 9.65). `BayRoom` is that room and it already exists: nine
             racks, seven shelves each, a status lamp per shelf on its own phase,
             an overhead truss and its service runs. It is high-frequency, dark
             and completely subordinate, which is exactly what a bright hero
             needs to read against. ── */}
        <BayRoom f={f} p={P} z={2} racks={9} floorY={560} num="" />
        {/* the dispatch line running away from camera behind him — depth, and it
            is what a room that SHIPS things would actually have */}
        <Runner y={140} f={f} z={7} rate={26} pitch={244} w={188} h={58}
          c="#8FA6D8" c2="#0C1220" kind="cell" />
        {/* three pendant lamps: the depth cue, and the luma. ⛔ measured — the
            racking is dark and would take frame 0 under the 140 law on its own. */}
        {[168, 506, 844].map((lx, i) => (
          <React.Fragment key={"lp" + i}>
            <div style={{ position: "absolute", left: lx - 3, top: 96, width: 6, height: 54,
              zIndex: 13, background: dkh(P.lip, -0.2) }} />
            <div style={{ position: "absolute", left: lx - 46, top: 148, width: 92, height: 34,
              zIndex: 14, borderRadius: "46px 46px 8px 8px",
              background: `linear-gradient(180deg, #C6D2E8 0%, #6F7C93 100%)` }} />
            <div style={{ position: "absolute", left: lx - 168, top: 178, width: 336, height: 430,
              zIndex: 13, filter: "blur(20px)",
              clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
              background: `linear-gradient(180deg, ${hexa("#FFE3A8", 0.56 + Math.sin(f / 21 + i * 2.1) * 0.06)} 0%, ${hexa("#FFE3A8", 0)} 100%)` }} />
          </React.Fragment>
        ))}
        {/* ⭐⭐ THE OPEN LOADING DOORS. ⛔ Measured: steel's frame 0 reads 97.8 in
             its LEFT THIRD against 159.5 in the middle, because `CAM.steel` crops
             the bright right side away and reveals dark racking instead. A global
             lift would wash the whole frame to fix one third of it.
             ⭐ Two lit bay doors in the back wall put the light exactly there —
             and they are the single most on-subject thing this room could have,
             because the shot is about a place that SHIPS. Detail and luma from
             the same object, which is what `feedback_push_the_two_values_apart`
             asks for: a bright detail on a dark field, not a raised floor. */}
        {[10, 206, 402].map((dx, i) => (
          <React.Fragment key={"dr" + i}>
            <div style={{ position: "absolute", left: dx, top: 128, width: 186, height: 322,
              zIndex: 8, borderRadius: "6px 6px 0 0", overflow: "hidden",
              background: `linear-gradient(184deg, #FFFCF2 0%, #FBEFD4 46%, #DCC79A 100%)`,
              border: `7px solid ${dkh(P.lip, -0.16)}` }}>
              {/* the roller slats stacked at its head — it is an open door, not a hole */}
              {[0, 1, 2].map(q => (
                <div key={"sl" + q} style={{ position: "absolute", left: 0, right: 0, top: q * 13,
                  height: 9, background: hexa("#6A7488", 0.42) }} />
              ))}
              {/* something moving out through it, so the room is working */}
              <div style={{ position: "absolute", left: 24 + ((f * 1.6 + i * 40) % 130), bottom: 0,
                width: 62, height: 96, background: dkh(P.lip, 0.10), borderRadius: 4 }} />
            </div>
            {/* the light it throws onto the floor in front */}
            <div style={{ position: "absolute", left: dx - 46, top: 400, width: 250, height: 240,
              zIndex: 9, filter: "blur(16px)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
              background: `linear-gradient(180deg, ${hexa("#FFEFCE", 0.68)} 0%, ${hexa("#FFEFCE", 0)} 100%)` }} />
          </React.Fragment>
        ))}
        <Apron f={f} y={690} z={10} slope={228} />
        <div style={{ position: "absolute", left: -40, top: 470, width: 1092, height: 390,
          zIndex: 11, borderRadius: "50%", filter: "blur(2px)",
          background: `radial-gradient(ellipse at 50% 50%, ${hexa("#FFEBCC", 0.76)} 0%, ${hexa("#FFEBCC", 0)} 76%)` }} />
        <div style={{ position: "absolute", left: -160, top: -110, width: 820, height: 620,
          zIndex: 12, filter: "blur(34px)", borderRadius: "50%",
          background: `radial-gradient(ellipse at 50% 50%, ${hexa("#E6EEFC", 0.30)} 0%, ${hexa("#E6EEFC", 0)} 70%)` }} />

        {/* ⛔⛔ DELETED: two more Claudes walking off with the hyped pair. It was
             the right IDEA and the wrong SHOT — at that depth they were 142px of
             blue behind a 700px pile and never once read. More importantly it made
             this frame carry SEVEN systems (racking, lamps, conveyor, pile, hero,
             arrival, background pair), which is the exact count that got the
             ORIGINAL hook rejected. `feedback_hierarchy_is_layers_removed`: I
             re-created the failure I was hired to fix, while fixing a different
             note. The Antigravity/Stitch clause is carried by S1 and S2 anyway.

             ⭐ THREE THINGS ONLY: the hero under the pile · the one arriving with
             another · a dense low-contrast room behind them. The room is texture,
             not a system — that is why it is allowed to be detailed. ── */}

        {/* ══ "hose" · THE FIREHOSE. ════════════════════════════════════════════
             ⭐ THE PRESSURE IS THE CLOCK. It does not arrive from off-screen and it
             is not a state — it BUILDS, visibly, in the object itself: the hose
             swells, the bucking amplitude grows, the spray widens, his heels lose
             ground. Every one of those is a needle moving toward a limit, and the
             cut lands before it goes. ══════════════════════════════════════════ */}
        {/* ══ "roll" · THE ROLL. ═════════════════════════════════════════════════
             ⛔⛔⛔⛔⛔⛔ SIXTH ATTEMPT, and the note on the fifth was the diagnosis:
             *"a big long stick, I don't know what's even going on."* The firehose
             was 26 circles + 3 bands + a cone — an ASSEMBLY. So were the box pile
             and the machined panel before it.

             ⭐⭐⭐ WHAT THE THREE WINNING HOOKS ARE, stated properly at last: OX is
             ONE OX. UNLAZY is ONE BALLOON. BOSS is ONE BODY. Every one is a single
             BIG FILLED SHAPE with a silhouette you can name with the sound off.
             None of them is built out of parts. I have spent six rounds drawing
             assemblies out of divs and every single one has come back "I can't
             tell what it is", which is precisely what an assembly looks like at
             half a second on a phone.

             ⭐ SO: ONE DISC. 470px of white carrying Google's own real mark, rolling
             at him. A wheel is the most legible silhouette there is, it is the most
             recognised logo on earth, and it IS the subject rather than a metaphor
             for it. He is braced against it, losing ground, shedding the products
             as it comes — and the gap closes all shot. Nobody needs telling what
             happens next, which is the whole definition of anticipation.
             ⛔ The DISC rotates. The camera does not (`feedback_the_camera_must_never_tilt`).
             ═══════════════════════════════════════════════════════════════════ */}
        {/* ══ "burst" · THE DOOR ════════════════════════════════════════════════
             His shoulder against a storeroom door, and Google's month behind it
             forcing it open. The GAP is a literal measurable countdown — it widens
             on LIN for the whole shot — and his feet skidding is the second gauge.
             Cut before it goes. ⭐ The purest body-against-a-load in the set, which
             is 119's lesson stated directly.
             ═══════════════════════════════════════════════════════════════════ */}
        {HK === "burst" && (() => {
          const k = E(f, 0, dur + 6, 0, 1, LIN);
          const GAP = 26 + k * 208;                       // the countdown, in pixels
          const DX = 470, DTOP = 168, DH = 520;           // the jamb
          const slip = k * 66;
          return (<>
            {/* the frame it is set in */}
            <div style={{ position: "absolute", left: DX - 30, top: DTOP - 30, width: 470, height: DH + 30,
              zIndex: 52, background: `linear-gradient(96deg,#8E97A6 0%,#4C5462 100%)`, borderRadius: 6 }} />
            {/* ⭐ THE LIGHT COMING THROUGH — it is what makes a gap read as a gap,
                 and it grows with it, so frame 0 is dark and the cut is blazing */}
            <div style={{ position: "absolute", left: DX, top: DTOP, width: GAP, height: DH, zIndex: 54,
              background: `linear-gradient(90deg, #FFF6E0 0%, #FFE6AE 60%, #E8C878 100%)` }} />
            <div style={{ position: "absolute", left: DX - 40, top: DTOP - 30, width: GAP + 200, height: DH + 90,
              zIndex: 53, filter: "blur(30px)", borderRadius: "50%",
              background: `radial-gradient(ellipse at 30% 50%, ${hexa("#FFE9BE", 0.30 + k * 0.36)} 0%, ${hexa("#FFE9BE", 0)} 70%)` }} />

            {/* ── WHAT IS COMING THROUGH IT: the products, squeezing out and dropping ── */}
            {Array.from({ length: 11 }, (_, i) => {
              const at = -8 + i * 4.4, lf = f - at;
              if (lf < 0) return null;
              const t = R.fifteen[(i * 3) % R.fifteen.length];
              const sz = 76 + (i % 3) * 14;
              const px = DX + GAP * 0.5 - lf * (5 + (i % 3) * 2);
              const py = DTOP + 60 + ((i * 97) % 380) + lf * lf * 0.9;
              if (py > 700 || px < -80) return null;
              return (
                <div key={"th" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
                  width: sz, height: sz, zIndex: 62, borderRadius: 10,
                  transform: `rotate(${i * 47 + lf * 5}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {t.m ? (
                    <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: sz * 0.54, height: sz * 0.54, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(Math.min(11, (sz - 12) / (t.n.length * 0.62)), 800), color: "#2A3240" }}>{t.n}</span>
                  )}
                </div>
              );
            })}

            {/* ══ THE DOOR itself, swinging toward camera ══ */}
            <div style={{ position: "absolute", left: DX + GAP, top: DTOP, width: 320, height: DH,
              zIndex: 70, transformOrigin: "100% 50%",
              transform: `perspective(900px) rotateY(${-8 - k * 26}deg)`,
              background: `linear-gradient(96deg, #C6CEDA 0%, #97A1B1 44%, #5E6878 100%)`,
              border: `8px solid ${dkh("#454E5E", 0.24)}`, borderRadius: 4, boxShadow: SH_D }}>
              {[0, 1].map(q => (
                <div key={"pn" + q} style={{ position: "absolute", left: 34, right: 34,
                  top: 40 + q * 250, height: 190, borderRadius: 5,
                  background: hexa("#3E4756", 0.16), border: `4px solid ${hexa("#3E4756", 0.22)}` }} />
              ))}
              <div style={{ position: "absolute", left: 22, top: DH / 2 - 12, width: 74, height: 24,
                borderRadius: 12, background: "linear-gradient(180deg,#F0D89A 0%,#9E8440 100%)" }} />
            </div>

            {/* ⭐ AND HIM, SHOULDER TO IT, LOSING */}
            <div style={{ position: "absolute", inset: 0, zIndex: 82,
              transform: `translateX(${-slip}px) rotate(${-16 - k * 10}deg)`, transformOrigin: "300px 700px" }}>
              <GHero f={f} at={-30} x={306} y={foot(P.horizon, 418)} size={478} z={82}
                strain={0.78 + k * 0.21} drive={0.30 + k * 0.2} reach={148} act={1} ph={0.4} calm={0.5} />
            </div>
            {[0, 1, 2].map(j => (
              <div key={"sk" + j} style={{ position: "absolute", left: 232 - slip + j * 24, top: 704 + j * 9,
                width: 92 + slip, height: 7, zIndex: 40, borderRadius: 4,
                background: hexa("#2A3038", 0.28 - j * 0.07) }} />
            ))}
            <Puff x={272 - slip} y={712} f={f} at={-20} n={9} s={0.9 + k * 0.7} c="#D8CDBA" z={44} />
          </>);
        })()}

        {/* ══ "juggle" · THE JUGGLE ══════════════════════════════════════════════
             He is keeping all fifteen in the air and another one joins the pattern
             every few frames. You can COUNT it getting worse, which is the clock,
             and the arc widens until it is plainly impossible. Cut on the beat it
             is about to come down.
             ═══════════════════════════════════════════════════════════════════ */}
        {HK === "juggle" && (() => {
          const k = E(f, 0, dur + 6, 0, 1, LIN);
          const N = Math.round(5 + k * 10);                // one more, and another
          const CXj = 468, BASE = 486;
          const SPREAD = 300 + k * 250, HGT = 250 + k * 96;
          return (<>
            {Array.from({ length: N }, (_, i) => {
              const per = 30;
              const t = (((f + i * (per / N)) % per) + per) % per / per;
              const dir = i % 2 ? 1 : -1;
              const px = CXj + dir * (t - 0.5) * SPREAD;
              const py = BASE - Math.sin(t * Math.PI) * HGT;
              const m = R.fifteen[i % R.fifteen.length];
              const sz = 92;
              return (
                <div key={"jg" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
                  width: sz, height: sz, zIndex: 84, borderRadius: 11,
                  transform: `rotate(${i * 51 + t * 300 * dir}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {m.m ? (
                    <Img src={staticFile(m.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: 50, height: 50, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(12, 800), color: "#2A3240" }}>{m.n}</span>
                  )}
                </div>
              );
            })}
            {/* the next one being lobbed in from off-frame, every few frames */}
            <div style={{ position: "absolute", inset: 0, zIndex: 86,
              transform: `translateY(${Math.sin(f / 5) * 5}px)` }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 80,
              transform: `translateY(${k * 12}px)` }}>
              <GHero f={f} at={-30} x={468} y={foot(P.horizon, 418)} size={470} z={80}
                strain={0.44 + k * 0.42} drive={0} reach={158} act={1} ph={0.4} calm={0.4} />
            </div>
            {/* his hands, working the pattern */}
            {[0, 1].map(j => {
              const sw = Math.sin(f / 3.4 + j * Math.PI) * 26;
              return (
                <div key={"jh" + j} style={{ position: "absolute",
                  left: CXj - 150 + j * 224 + sw, top: 470 + Math.cos(f / 3.4 + j * Math.PI) * 16,
                  width: 96, height: 50, zIndex: 88, borderRadius: 25,
                  transform: `rotate(${-22 + j * 44}deg)`,
                  background: "linear-gradient(180deg,#7C89EE 0%,#5C6BE8 52%,#4351C6 100%)",
                  border: "5px solid #37409E" }} />
              );
            })}
          </>);
        })()}

        {/* ⭐⭐⭐ THE THREE BELOW ALL STAGE THE SAME SENTENCE, AND IT IS NOT THE ONE
             I HAD BEEN DRAWING. Eight hooks dramatised VOLUME — an armful, a ball,
             a firehose, a downpour — and every one came back "I don't understand".
             The VO's tension is not volume, it is ATTENTION:

                *"Everyone's hyping Antigravity and Stitch right now, BUT Google
                  shipped about fifteen new AI tools this month."*

             You are looking at the wrong two. That is a COMPARISON, and a viewer
             reads a comparison as a sentence instead of decoding an object — which
             is why every pile I drew failed the half-second test and a crowd at the
             wrong door will not. ══════════════════════════════════════════════ */}

        {/* ══ "podium" · THE UNVEILING ══════════════════════════════════════════
             ⭐⭐⭐ BUILT THE WAY 119 AND 120 ARE BUILT, WHICH I HAD NOT ACTUALLY
             READ UNTIL NOW. Studying their source rather than their frames turned
             up four things every one of my eight hooks was missing:

             1 ⭐ EVERY BEAT IS A WORD. 120's hook comments read literally
               "f68 'and' — the nose punctures · f76 'lying' — lurch 3 · f85
               'to you' — the tip strikes the post". The beats are not invented
               numbers, they are the VO. Mine were arbitrary (f4, f12, f22),
               which is why nothing ever felt inevitable.
             2 ⭐ DISCRETE STROKES, NOT RAMPS. 120: `stroke = E(f, at, at+6, 0, v,
               BACK)` summed six times. Six punches with overshoot, not a slide.
               That IS the answer to "just moving back and forth".
             3 ⭐ ONE CAUSE, FOUR VISIBLE EFFECTS — 120's note in its own words:
               each lie "swells the balloon AND judders it AND extrudes the nose"
               while the hero crosses in front of it.
             4 ⭐ A CAUSAL CHAIN. 119: pin drops → slack leaves the chain → the ox
               digs in → the rig moves → the dial spins past its stop. Five
               different events, each caused by the last. Mine repeated ONE event.

             ⭐⭐ SO, THE WORDS OF THIS HOOK, MEASURED OFF `words_google.json`:
                 f0-11  "Everyone's"    a crowd is already massed at an empty plinth
                 f11-20 "hyping"        they surge, the flashes start
                 f20-37 "ANTIGRAVITY"   ← hits at f16 (the picture leads by 4)
                 f40-44 "STITCH"        ← hits at f36
                 f44-54 "right now"     the flashes stop. Behind them, in the dark,
                                        thirteen more. He turns his head. CUT.
             ⛔ THE MOB NEVER TURNS ROUND. That is the whole joke and it is the
             villain rule this reel started with. ═══════════════════════════ */}
        {HK === "podium" && (() => {
          const SLAM1 = 16, SLAM2 = 36, TURN = 44;
          /* ⭐ a stroke, not a slide — BACK overshoot on a 6-frame window */
          const stroke = (at: number, v: number) => E(f, at, at + 6, 0, v, BACK);
          /* the arrival of each mark: fast on impact, then it settles */
          const drop = (at: number) => E(f, at - 9, at, 0, 1, IN_Q);
          /* ONE CAUSE, FOUR EFFECTS — this single number judders the plinths,
             kicks the crowd, rings the floor and shakes the lamps */
          const jud = [SLAM1, SLAM2].reduce((acc, at) => acc +
            (f >= at ? Math.sin((f - at) / 1.5) * Math.exp(-(f - at) / 5.2) : 0), 0);
          const surge = stroke(11, 1) + stroke(SLAM1, 1.3) + stroke(SLAM2, 1.5);
          const hush = E(f, TURN, TURN + 6, 0, 1, OUT);        // the flashes stop
          const flash = f < TURN && f > 11 && (f % 6 < 2) ? 1 : 0;
          const PL: [number, number][] = [[168, SLAM1], [430, SLAM2]];
          return (<>
            {/* ── the dark hall behind, and the THIRTEEN standing in it ── */}
            {Array.from({ length: 7 }, (_, i) => {
              const t = R.fifteen[i + 2];
              const px = 664 + (i % 4) * 96, py = 214 + Math.floor(i / 4) * 104;
              return (
                <div key={"dk" + i} style={{ position: "absolute", left: px, top: py,
                  width: 92, height: 92, zIndex: 30, borderRadius: "50%",
                  opacity: 0.16 + hush * 0.5,
                  background: hush > 0.2
                    ? `radial-gradient(circle at 42% 34%, #FFFFFF 0%, #FFF7E4 50%, #EFDDB4 100%)`
                    : `radial-gradient(circle at 42% 34%, #59616E 0%, #3E4650 100%)`,
                  border: `5px solid ${hush > 0.2 ? "#C8A354" : "#39414C"}`,
                  filter: hush > 0.2 ? "none" : "brightness(0.5)" }}>
                  {t.m ? (
                    <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: 46, height: 46, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center", ...mono(9, 800),
                      color: "#2A3240" }}>{t.n}</span>
                  )}
                </div>
              );
            })}
            {/* ⭐ and the light that starts to find them right at the cut */}
            <div style={{ position: "absolute", left: 590, top: 180, width: 420, height: 460,
              zIndex: 29, filter: "blur(26px)", opacity: hush * 0.62, borderRadius: "50%",
              background: `radial-gradient(ellipse at 50% 50%, ${hexa("#FFEFCE", 0.9)} 0%, ${hexa("#FFEFCE", 0)} 72%)` }} />

            {/* ── THE TWO PLINTHS. Empty until their word is spoken. ── */}
            {PL.map(([px, at], j) => {
              const dk = drop(at);
              const set = f >= at ? Math.sin((f - at) / 2.2) * Math.exp(-(f - at) / 8) : 0;
              const t = R.fifteen[j];
              return (
                <React.Fragment key={"pd" + j}>
                  <div style={{ position: "absolute", left: px - 8, top: 470 + jud * 5,
                    width: 232, height: 208, zIndex: 48, borderRadius: 5,
                    background: `linear-gradient(180deg,#EDF2F8 0%,#A6B0BF 62%,#6E7889 100%)`,
                    boxShadow: SH_D }} />
                  {/* the spot on it */}
                  <div style={{ position: "absolute", left: px - 90, top: 150, width: 336, height: 400,
                    zIndex: 44, filter: "blur(18px)",
                    clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
                    background: `linear-gradient(180deg, ${hexa("#FFF6E0", 0.30 + (f >= at ? 0.44 : 0))} 0%, ${hexa("#FFF6E0", 0)} 100%)` }} />
                  {/* ⭐ THE MARK ITSELF — it ARRIVES on its own word */}
                  {f >= at - 9 && (
                    <div style={{ position: "absolute", left: px + 6,
                      top: 274 - (1 - dk) * 500 + set * 11,
                      width: 208, height: 208, zIndex: 60, borderRadius: "50%",
                      transform: `rotate(${(1 - dk) * -22 + set * 5}deg) scale(${1 + set * 0.10})`,
                      background: `radial-gradient(circle at 42% 34%, #FFFFFF 0%, #FFF7E4 46%, #F0DEB4 100%)`,
                      border: "8px solid #C8A354", boxShadow: SH_D }}>
                      <Img src={staticFile(t.m as string)} style={{ position: "absolute", left: "50%",
                        top: "50%", transform: "translate(-50%,-50%)", width: 118, height: 118,
                        objectFit: "contain" }} />
                      <div style={{ position: "absolute", left: "12%", top: "10%", width: "44%",
                        height: "26%", borderRadius: "50%", background: hexa("#FFFFFF", 0.7),
                        filter: "blur(6px)" }} />
                    </div>
                  )}
                  {/* the ring and the dust it lands with */}
                  {f >= at && <Ring x={px + 78} y={476} f={f} at={at} c="#FFF0D2" s={1.5 + j * 0.3} z={62} dur={16} />}
                  {f >= at && <Puff x={px + 78} y={486} f={f} at={at} n={10} s={1.2 + j * 0.2} c="#E4D8C4" z={58} />}
                </React.Fragment>
              );
            })}

            {/* ── THE MOB. It never turns round. It jumps on every slam. ── */}
            <div style={{ position: "absolute", inset: 0, zIndex: 70,
              transform: `translateY(${-surge * 16 + jud * 7}px)` }}>
              <HypeMob f={f} x={352} y={752} n={15} size={148} spread={470} turn={0} z={70} seed={4} sil={0.40} />
            </div>
            {/* their cameras, firing at the same two things */}
            {flash === 1 && [0, 1, 2, 3].map(j => (
              <div key={"fl" + j} style={{ position: "absolute", left: 156 + j * 116, top: 560,
                width: 92, height: 92, borderRadius: "50%", zIndex: 74,
                background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.92)} 0%, ${hexa("#FFFFFF", 0)} 68%)` }} />
            ))}

            {/* ⭐ AND ONE OF THEM LOOKS THE OTHER WAY, right at the cut. */}
            <div style={{ position: "absolute", inset: 0, zIndex: 86,
              transform: `translateY(${jud * 5}px)` }}>
              <GHero f={f} at={-30} x={906} y={foot(P.horizon, 418)} size={370} z={86}
                drive={-0.16 - hush * 0.24} strain={0.14} reach={104}
                act={2} ph={1.2} gaze={hush} calm={0.5} />
            </div>
          </>);
        })()}

        {/* ══ "crowd" · THE CROWD AT TWO DOORS ═══════════════════════════════════ */}
        {HK === "crowd" && (() => {
          const TURN = 16, WALK = 22;
          const wk = E(f, WALK, dur + 6, 0, 1, LIN);
          const surge = Math.sin(f / 3.2) * 7 + Math.sin(f / 5.1) * 4;
          const DOORS: [number, number, boolean][] = [
            [96, 0, true], [252, 1, true],
            [452, 2, false], [598, 3, false], [744, 12, false], [890, 13, false],
          ];
          return (<>
            {DOORS.map(([dx, ti, hot], i) => {
              const t = R.fifteen[ti];
              return (
                <React.Fragment key={"dr" + i}>
                  {/* the opening, lit from inside — the empty ones are lit TOO,
                      which is the joke: nothing is stopping you walking in */}
                  <div style={{ position: "absolute", left: dx, top: 226, width: 128, height: 400,
                    zIndex: 20, borderRadius: "6px 6px 0 0",
                    background: hot
                      ? `linear-gradient(184deg,#FFF8E6 0%,#FFE7B2 52%,#E0BE78 100%)`
                      : `linear-gradient(184deg,#FFFDF6 0%,#F4E8CE 52%,#CFC0A0 100%)`,
                    border: `8px solid ${dkh(P.lip, -0.12)}` }} />
                  {/* its light on the apron */}
                  <div style={{ position: "absolute", left: dx - 40, top: 600, width: 208, height: 190,
                    zIndex: 21, filter: "blur(15px)",
                    clipPath: "polygon(28% 0%, 72% 0%, 100% 100%, 0% 100%)",
                    background: `linear-gradient(180deg, ${hexa("#FFEFCE", hot ? 0.62 : 0.42)} 0%, ${hexa("#FFEFCE", 0)} 100%)` }} />
                  {/* the mark over the lintel — which one this door is */}
                  <div style={{ position: "absolute", left: dx + 24, top: 150, width: 80, height: 80,
                    zIndex: 24, borderRadius: 10, background: "#FFFFFF",
                    border: `4px solid ${dkh("#8E96A2", 0.3)}`, boxShadow: SH }}>
                    {t.m ? (
                      <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%,-50%)", width: 46, height: 46, objectFit: "contain" }} />
                    ) : (
                      <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                        transform: "translateY(-50%)", textAlign: "center", ...mono(9, 800),
                        color: "#2A3240" }}>{t.n}</span>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            {/* ⭐ THE MOB, JAMMED AT THE FIRST TWO — backs to camera, arms up. ⛔ It
                 never turns round; that is the whole point of the shot. */}
            <HypeMob f={f} x={210} y={640} n={16} size={92} spread={310} turn={0} z={62} seed={3} sil={0.5} />
            <div style={{ position: "absolute", left: 40, top: 470, width: 380, height: 190, zIndex: 63,
              transform: `translateX(${surge * 0.6}px)` }} />
            {/* ⭐ AND HIM, WALKING PAST ALL OF IT INTO AN EMPTY ONE. */}
            <div style={{ position: "absolute", inset: 0, zIndex: 82,
              transform: `translateX(${wk * 300}px)` }}>
              <GHero f={f} at={-30} x={392} y={foot(P.horizon, 418)} size={430} z={82}
                drive={0.34} strain={0.12} reach={110} act={2} ph={0.9}
                gaze={f >= TURN ? 1 : 0} calm={0.55} />
            </div>
          </>);
        })()}

        {/* ══ "shelf" · THE STRIPPED SHELF ═══════════════════════════════════════ */}
        {HK === "shelf" && (() => {
          const REACH = 20;
          const rk = E(f, REACH, dur + 4, 0, 1, IO);
          const lift = E(f, 38, dur + 6, 0, 1, OUT);
          const grab = Math.sin(f / 2.6) * 6;
          return (<>
            {/* the gondola */}
            <div style={{ position: "absolute", left: 20, top: 236, width: 976, height: 26, zIndex: 40,
              background: `linear-gradient(180deg,#C8CFDA 0%,#7A8494 100%)`, borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 20, top: 452, width: 976, height: 26, zIndex: 40,
              background: `linear-gradient(180deg,#C8CFDA 0%,#7A8494 100%)`, borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 20, top: 236, width: 976, height: 242, zIndex: 34,
              background: `linear-gradient(180deg,${dkh(P.floor2, 0.34)} 0%,${dkh(P.floor2, 0.5)} 100%)` }} />
            {/* ⛔ THE TWO EMPTY SLOTS. Nothing in them, price rail bare, and a scrum
                 grabbing at the last one — the whole "everyone is hyping two". */}
            {[0, 1].map(j => (
              <div key={"mt" + j} style={{ position: "absolute", left: 56 + j * 170, top: 262,
                width: 148, height: 186, zIndex: 38, borderRadius: 5,
                background: `linear-gradient(180deg,${dkh(P.lip, 0.06)} 0%,${dkh(P.lip, -0.1)} 100%)`,
                boxShadow: "inset 0 12px 26px rgba(0,0,0,0.45)" }} />
            ))}
            <HypeMob f={f} x={186} y={636} n={11} size={96} spread={240} turn={0} z={64} seed={7} sil={0.42} />
            {/* ⭐ AND THE THIRTEEN NOBODY IS TOUCHING, FULLY FACED UP */}
            {Array.from({ length: 8 }, (_, i) => {
              const t = R.fifteen[i + 2];
              const gone = i === 2 && lift > 0.02;
              const bx = 424 + i * 74, by = 292;
              return (
                <div key={"sf" + i} style={{ position: "absolute",
                  left: bx - (gone ? lift * 6 : 0), top: by - (gone ? lift * 210 : 0),
                  width: 66, height: 132, zIndex: 44, borderRadius: 6,
                  transform: `rotate(${gone ? lift * -12 : 0}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {t.m ? (
                    <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "38%",
                      transform: "translate(-50%,-50%)", width: 42, height: 42, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "38%",
                      transform: "translateY(-50%)", textAlign: "center", ...mono(8, 800),
                      color: "#2A3240" }}>{t.n}</span>
                  )}
                </div>
              );
            })}
            {/* ⭐ HIS ARM, COMING IN OVER THE SCRUM AND TAKING ONE OFF THE FULL SHELF */}
            <div style={{ position: "absolute", inset: 0, zIndex: 80 }}>
              <GHero f={f} at={-30} x={790} y={foot(P.horizon, 418)} size={442} z={80}
                drive={-0.2} strain={0.2} reach={120 + rk * 70} act={1} ph={0.5} calm={0.5} />
            </div>
            <div style={{ position: "absolute", left: 700 - rk * 128, top: 386 - lift * 176 + grab * 0.6,
              width: 232, height: 52, zIndex: 88, borderRadius: 26,
              transform: `rotate(${-8 - lift * 16}deg)`,
              background: "linear-gradient(180deg,#7C89EE 0%,#5C6BE8 52%,#4351C6 100%)",
              border: "5px solid #37409E" }} />
          </>);
        })()}

        {/* ══ "spot" · THE SPOTLIGHT ═════════════════════════════════════════════ */}
        {HK === "spot" && (() => {
          const THROW = 28;
          const on = E(f, THROW, THROW + 5, 0, 1, IN_Q);       // ⛔ a switch is a STEP
          const hand = E(f, 4, THROW, 0, 1, IO);
          const flash = (f % 7 < 2) ? 1 : 0;
          return (<>
            {/* the dark hall, and the thirteen standing in it unlit until f28 */}
            {Array.from({ length: 7 }, (_, i) => {
              const t = R.fifteen[i + 2];
              const px = 232 + i * 118;
              return (
                <React.Fragment key={"pl" + i}>
                  <div style={{ position: "absolute", left: px - 42, top: 512, width: 84, height: 132,
                    zIndex: 36, background: `linear-gradient(180deg,${mxh(P.floor, 0.1 + on * 0.3)} 0%,${dkh(P.floor2, 0.4)} 100%)`,
                    borderRadius: 4 }} />
                  <div style={{ position: "absolute", left: px - 44, top: 388, width: 88, height: 88,
                    zIndex: 38, borderRadius: 10, opacity: 0.10 + on * 0.9,
                    background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                    border: `4px solid ${dkh("#8E96A2", 0.3)}`,
                    boxShadow: on > 0.5 ? SH_D : "none" }}>
                    {t.m ? (
                      <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%,-50%)", width: 48, height: 48, objectFit: "contain" }} />
                    ) : (
                      <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                        transform: "translateY(-50%)", textAlign: "center", ...mono(9, 800),
                        color: "#2A3240" }}>{t.n}</span>
                    )}
                  </div>
                  {/* each one's lamp strikes when the switch goes */}
                  <div style={{ position: "absolute", left: px - 96, top: 250, width: 192, height: 300,
                    zIndex: 35, filter: "blur(18px)", opacity: on,
                    clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
                    background: `linear-gradient(180deg, ${hexa("#FFEFCE", 0.62)} 0%, ${hexa("#FFEFCE", 0)} 100%)` }} />
                </React.Fragment>
              );
            })}
            {/* ── the TWO on the lit plinth, with the cameras going off at them ── */}
            {[0, 1].map(j => (
              <React.Fragment key={"hp" + j}>
                <div style={{ position: "absolute", left: 92 + j * 128, top: 470, width: 104, height: 176,
                  zIndex: 50, borderRadius: 5,
                  background: `linear-gradient(180deg,#E8EEF6 0%,#9BA6B6 100%)` }} />
                <div style={{ position: "absolute", left: 88 + j * 128, top: 330, width: 112, height: 112,
                  zIndex: 52, borderRadius: 12, background: "#FFFFFF",
                  border: `5px solid ${dkh("#8E96A2", 0.3)}`, boxShadow: SH_D }}>
                  <Img src={staticFile(R.fifteen[j].m as string)} style={{ position: "absolute", left: "50%",
                    top: "50%", transform: "translate(-50%,-50%)", width: 62, height: 62, objectFit: "contain" }} />
                </div>
              </React.Fragment>
            ))}
            <div style={{ position: "absolute", left: 20, top: 190, width: 340, height: 420, zIndex: 48,
              filter: "blur(20px)", clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
              background: `linear-gradient(180deg, ${hexa("#FFF4DC", 0.72)} 0%, ${hexa("#FFF4DC", 0)} 100%)` }} />
            {/* the flashes — the crowd photographing the same two things */}
            {flash === 1 && [0, 1, 2].map(j => (
              <div key={"fx" + j} style={{ position: "absolute", left: 60 + j * 96, top: 604,
                width: 72, height: 72, borderRadius: "50%", zIndex: 66,
                background: `radial-gradient(circle, ${hexa("#FFFFFF", 0.9)} 0%, ${hexa("#FFFFFF", 0)} 70%)` }} />
            ))}
            <HypeMob f={f} x={196} y={664} n={12} size={86} spread={280} turn={0} z={64} seed={5} sil={0.55} />

            {/* ⭐ AND HIM, AT THE SWITCH. ⛔ A switch is a STEP, not a fade — the hall
                 is dark on one frame and lit on the next. */}
            <div style={{ position: "absolute", inset: 0, zIndex: 82 }}>
              <GHero f={f} at={-30} x={846} y={foot(P.horizon, 418)} size={438} z={82}
                drive={-0.24} strain={0.24 + hand * 0.2} reach={110 + hand * 66} act={1} ph={0.7} calm={0.5} />
            </div>
            <div style={{ position: "absolute", left: 916, top: 356, width: 62, height: 132, zIndex: 78,
              borderRadius: 8, background: `linear-gradient(180deg,#B4BCC6 0%,#5E6878 100%)`,
              border: "5px solid #2A3038" }}>
              <div style={{ position: "absolute", left: 14, top: 12 + on * 62, width: 34, height: 52,
                borderRadius: 6, background: on > 0.5 ? "#7ED8A8" : "#E0685C",
                border: "4px solid #2A3038" }} />
            </div>
            <div style={{ position: "absolute", left: 810 + hand * 74, top: 402 + on * 44,
              width: 140, height: 48, zIndex: 86, borderRadius: 24,
              transform: `rotate(${-12 + on * 22}deg)`,
              background: "linear-gradient(180deg,#7C89EE 0%,#5C6BE8 52%,#4351C6 100%)",
              border: "5px solid #37409E" }} />
          </>);
        })()}

        {/* ══ "rain" · THE DOWNPOUR ═════════════════════════════════════════════
             One umbrella, and Google's fifteen coming down on it. The fall rate is
             the clock and it accelerates; the canopy buckling is a second gauge on
             the same failure. The two he has already caught and tucked under his
             arm are ANTIGRAVITY and STITCH — the only two anybody is holding.
             ═══════════════════════════════════════════════════════════════════ */}
        {HK === "rain" && (() => {
          /* ⛔⛔⛔⛔⛔⛔⛔ SEVENTH NOTE, AND IT IS ABOUT STRUCTURE, NOT SUBJECT.
             *"More anticipatory — oh what's going to happen next — rather than just
             basic moving back and forth animations."* Every hook I have built for
             this reel animates the same way: a CONSTANT RAMP. A ball rolls at a
             steady rate, rain falls at a steady rate, a door opens at a steady
             rate. A ramp has no future in it — at any moment the next second looks
             exactly like the last one, so there is nothing to wonder about.

             ⭐⭐⭐ THE REFERENCE HOOKS ARE BEATS, NOT RAMPS. 119: the pin DROPS, the
             slack goes out, the ox DIGS IN — and it has not moved. Three discrete
             events with wind-up and reaction, then a HELD moment. 120 inflates in
             puffs. 128 winds up and swats. Every one is *establish → escalate →
             hold*, and the hold is where the question lives.

             ⭐ SO THIS IS FOUR BEATS, NOT A DOWNPOUR:
               1  f4    ONE lands. It clangs off the canopy and he flinches.
                        The rule of the shot, taught in half a beat.
               2  f12   TWO more, harder. The canopy takes a real dip.
               3  f22   A BARRAGE — six of them, the canopy folds, he drops.
               4  f34   EVERYTHING STOPS. A shadow spreads over him and grows.
                        Something very large is above him and it has not landed.
                        ⭐ THE CUT DENIES IT. That is the "what happens next".
             ⛔ Beat 4 is the one that matters and it is the one every previous
             version lacked: a PAUSE, then a threat you can see but not yet resolve. */
          const HITS = [4, 12, 16, 22, 25, 28, 31];
          const BIG = 34;
          /* each impact is a damped spring in the canopy — discrete, not a sag */
          const dip = HITS.reduce((acc, at) => {
            const lf = f - at;
            return acc + (lf >= 0 ? Math.sin(lf / 2.5) * Math.exp(-lf / 7) : 0);
          }, 0);
          const fold = HITS.filter(h => f >= h).length / HITS.length;   // it loses shape in steps
          const bk = E(f, BIG, dur + 10, 0, 1, LIN);                    // the big one, descending
          const CXu = 442, CYu = 316, CW = 372, CH = 196;
          const tilt = -5 + dip * 13 - fold * 7;
          return (<>
            {/* what has already landed, and it grows with every beat */}
            {[[150, 2], [268, 5], [372, 9], [626, 8], [742, 11], [852, 6]].map(([gx, ti], i) => {
              if (i >= 4 + HITS.filter(h => f >= h).length) return null;
              const t = R.fifteen[ti as number];
              return (
                <div key={"fl" + i} style={{ position: "absolute", left: (gx as number) - 44, top: 636 + (i % 2) * 18,
                  width: 88, height: 88, zIndex: 44, borderRadius: 10,
                  transform: `rotate(${-24 + i * 14}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {t.m && <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                    transform: "translate(-50%,-50%)", width: 48, height: 48, objectFit: "contain" }} />}
                </div>
              );
            })}

            {/* ── THE BEATS. Each one is a real arrival: it falls, it STRIKES the
                 canopy on its frame, and it ricochets off. Not a stream. ── */}
            {HITS.map((at, i) => {
              const lf = f - at;
              if (lf < -12 || lf > 26) return null;
              const m = R.fifteen[(i * 2 + 3) % R.fifteen.length];
              const sz = 84 + (i % 3) * 14;
              const dir = i % 2 ? 1 : -1;
              const inbound = lf < 0;
              const t2 = inbound ? (lf + 12) / 12 : lf / 26;
              const px = inbound ? CXu + dir * 70 + (i - 3) * 46
                                 : CXu + dir * (70 + t2 * 300) + (i - 3) * 46;
              const py = inbound ? -110 + t2 * (CYu - 60 + 110)
                                 : CYu - 60 - Math.sin(t2 * Math.PI) * 66 + t2 * t2 * 420;
              if (py > 700) return null;
              return (
                <div key={"hb" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
                  width: sz, height: sz, zIndex: 88, borderRadius: 10,
                  transform: `rotate(${i * 53 + t2 * 260 * (inbound ? 1 : dir)}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {m.m ? (
                    <Img src={staticFile(m.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: sz * 0.54, height: sz * 0.54, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(Math.min(11, (sz - 12) / (m.n.length * 0.62)), 800), color: "#2A3240" }}>{m.n}</span>
                  )}
                </div>
              );
            })}
            {/* the ring on each strike — the impact has to be SEEN, not inferred */}
            {HITS.map((at, i) => f >= at && f < at + 14 && (
              <Ring key={"rg" + i} x={CXu + (i % 2 ? 60 : -60)} y={CYu - 70} f={f} at={at}
                c="#FFF0D2" s={0.7 + i * 0.06} z={90} dur={14} />
            ))}

            {/* ══ THE UMBRELLA — it takes each hit and loses a little more shape ══ */}
            <div style={{ position: "absolute", left: CXu - CW / 2, top: CYu - CH,
              width: CW, height: CH, zIndex: 84,
              transform: `rotate(${tilt}deg) scaleY(${1 - fold * 0.30 + dip * 0.06})`,
              transformOrigin: "50% 100%" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: `${CW / 2}px ${CW / 2}px 10px 10px`,
                background: `linear-gradient(168deg, #FFB07A 0%, #F0854A 46%, #C25A2A 100%)`,
                border: "7px solid #9A431F", boxShadow: SH_D }} />
              {[0, 1, 2, 3].map(q => (
                <div key={"rb" + q} style={{ position: "absolute", left: CW / 2 - 3, bottom: 0,
                  width: 6, height: CH - 10, background: hexa("#9A431F", 0.42),
                  transform: `rotate(${-52 + q * 35}deg)`, transformOrigin: "50% 100%" }} />
              ))}
              {[0, 1, 2, 3, 4].map(q => (
                <div key={"sc" + q} style={{ position: "absolute", left: q * (CW / 5), bottom: -18,
                  width: CW / 5, height: 36, borderRadius: "0 0 50% 50%",
                  background: "#D2683A" }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: CXu - 7 + tilt * 1.6, top: CYu - 16,
              width: 14, height: 224, zIndex: 83, borderRadius: 7,
              transform: `rotate(${tilt}deg)`, transformOrigin: "50% 0%",
              background: "linear-gradient(90deg,#8A7434 0%,#F0D89A 46%,#9E8440 100%)" }} />

            {/* ══ BEAT 4 · THE ONE THAT HAS NOT LANDED ═══════════════════════════
                 Everything else stops. Its shadow arrives first and spreads over
                 him, and the shot ends with it still in the air. ⭐ This is the
                 whole note: a threat you can see and cannot resolve. ══════════ */}
            {f >= BIG - 6 && (
              <div style={{ position: "absolute", left: CXu - 150 - bk * 130, top: 520,
                width: 300 + bk * 300, height: 150 + bk * 90, zIndex: 46,
                borderRadius: "50%", filter: "blur(16px)", opacity: 0.20 + bk * 0.52,
                background: "radial-gradient(ellipse at 50% 50%, #06090F 0%, rgba(6,9,15,0) 72%)" }} />
            )}
            {f >= BIG - 10 && (() => {
              const BR = 286;
              const by = -600 + bk * 760;
              return (
                <div style={{ position: "absolute", left: CXu - BR, top: by,
                  width: BR * 2, height: BR * 2, zIndex: 94, borderRadius: 26,
                  transform: `rotate(${-10 + bk * 16}deg)`,
                  background: "linear-gradient(158deg,#FFFFFF 0%,#EDF1F6 54%,#C8D0DC 100%)",
                  border: `10px solid ${dkh("#7E8794", 0.28)}`, boxShadow: SH_D }}>
                  <Img src={staticFile("logos/google.svg")} style={{ position: "absolute",
                    left: "50%", top: "50%", transform: "translate(-50%,-50%)",
                    width: BR * 1.05, height: BR * 1.05, objectFit: "contain" }} />
                </div>
              );
            })()}

            {/* ⭐ AND HE LOOKS UP. The flinch on every hit, then the stillness. */}
            <div style={{ position: "absolute", inset: 0, zIndex: 80,
              transform: `translateY(${fold * 20 + Math.abs(dip) * 6}px) rotate(${-2 - fold * 5 - bk * 5}deg)`,
              transformOrigin: "442px 700px" }}>
              <GHero f={f} at={-30} x={442} y={foot(P.horizon, 418)} size={452} z={80}
                strain={0.44 + fold * 0.34 + bk * 0.2} drive={-0.08 - fold * 0.16}
                shock={Math.min(1, Math.abs(dip) * 0.9)} reach={150} act={1} ph={0.4} calm={0.5} />
            </div>
            {[0, 1].map(j => (
              <div key={"hd" + j} style={{ position: "absolute", left: 300 + j * 20, top: 476 + j * 80,
                width: 92, height: 92, zIndex: 90, borderRadius: 10,
                transform: `rotate(${-16 + j * 26}deg)`,
                background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                <Img src={staticFile(R.fifteen[j].m as string)} style={{ position: "absolute", left: "50%",
                  top: "50%", transform: "translate(-50%,-50%)", width: 50, height: 50, objectFit: "contain" }} />
              </div>
            ))}
            {HITS.map((at, i) => f >= at && f < at + 12 && (
              <Puff key={"pu" + i} x={CXu + (i % 2 ? 90 : -90)} y={660} f={f} at={at} n={6} s={0.8} c="#D8CDBA" z={45} />
            ))}
          </>);
        })()}

        {/* ══ "burst" · THE DOOR ════════════════════════════════════════════════
             His shoulder against a storeroom door, and Google's month behind it
             forcing it open. The GAP is a literal measurable countdown — it widens
             on LIN for the whole shot — and his feet skidding is the second gauge.
             Cut before it goes. ⭐ The purest body-against-a-load in the set, which
             is 119's lesson stated directly.
             ═══════════════════════════════════════════════════════════════════ */}
        {HK === "burst" && (() => {
          const k = E(f, 0, dur + 6, 0, 1, LIN);
          const GAP = 26 + k * 208;                       // the countdown, in pixels
          const DX = 470, DTOP = 168, DH = 520;           // the jamb
          const slip = k * 66;
          return (<>
            {/* the frame it is set in */}
            <div style={{ position: "absolute", left: DX - 30, top: DTOP - 30, width: 470, height: DH + 30,
              zIndex: 52, background: `linear-gradient(96deg,#8E97A6 0%,#4C5462 100%)`, borderRadius: 6 }} />
            {/* ⭐ THE LIGHT COMING THROUGH — it is what makes a gap read as a gap,
                 and it grows with it, so frame 0 is dark and the cut is blazing */}
            <div style={{ position: "absolute", left: DX, top: DTOP, width: GAP, height: DH, zIndex: 54,
              background: `linear-gradient(90deg, #FFF6E0 0%, #FFE6AE 60%, #E8C878 100%)` }} />
            <div style={{ position: "absolute", left: DX - 40, top: DTOP - 30, width: GAP + 200, height: DH + 90,
              zIndex: 53, filter: "blur(30px)", borderRadius: "50%",
              background: `radial-gradient(ellipse at 30% 50%, ${hexa("#FFE9BE", 0.30 + k * 0.36)} 0%, ${hexa("#FFE9BE", 0)} 70%)` }} />

            {/* ── WHAT IS COMING THROUGH IT: the products, squeezing out and dropping ── */}
            {Array.from({ length: 11 }, (_, i) => {
              const at = -8 + i * 4.4, lf = f - at;
              if (lf < 0) return null;
              const t = R.fifteen[(i * 3) % R.fifteen.length];
              const sz = 76 + (i % 3) * 14;
              const px = DX + GAP * 0.5 - lf * (5 + (i % 3) * 2);
              const py = DTOP + 60 + ((i * 97) % 380) + lf * lf * 0.9;
              if (py > 700 || px < -80) return null;
              return (
                <div key={"th" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
                  width: sz, height: sz, zIndex: 62, borderRadius: 10,
                  transform: `rotate(${i * 47 + lf * 5}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {t.m ? (
                    <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: sz * 0.54, height: sz * 0.54, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(Math.min(11, (sz - 12) / (t.n.length * 0.62)), 800), color: "#2A3240" }}>{t.n}</span>
                  )}
                </div>
              );
            })}

            {/* ══ THE DOOR itself, swinging toward camera ══ */}
            <div style={{ position: "absolute", left: DX + GAP, top: DTOP, width: 320, height: DH,
              zIndex: 70, transformOrigin: "100% 50%",
              transform: `perspective(900px) rotateY(${-8 - k * 26}deg)`,
              background: `linear-gradient(96deg, #C6CEDA 0%, #97A1B1 44%, #5E6878 100%)`,
              border: `8px solid ${dkh("#454E5E", 0.24)}`, borderRadius: 4, boxShadow: SH_D }}>
              {[0, 1].map(q => (
                <div key={"pn" + q} style={{ position: "absolute", left: 34, right: 34,
                  top: 40 + q * 250, height: 190, borderRadius: 5,
                  background: hexa("#3E4756", 0.16), border: `4px solid ${hexa("#3E4756", 0.22)}` }} />
              ))}
              <div style={{ position: "absolute", left: 22, top: DH / 2 - 12, width: 74, height: 24,
                borderRadius: 12, background: "linear-gradient(180deg,#F0D89A 0%,#9E8440 100%)" }} />
            </div>

            {/* ⭐ AND HIM, SHOULDER TO IT, LOSING */}
            <div style={{ position: "absolute", inset: 0, zIndex: 82,
              transform: `translateX(${-slip}px) rotate(${-16 - k * 10}deg)`, transformOrigin: "300px 700px" }}>
              <GHero f={f} at={-30} x={306} y={foot(P.horizon, 418)} size={478} z={82}
                strain={0.78 + k * 0.21} drive={0.30 + k * 0.2} reach={148} act={1} ph={0.4} calm={0.5} />
            </div>
            {[0, 1, 2].map(j => (
              <div key={"sk" + j} style={{ position: "absolute", left: 232 - slip + j * 24, top: 704 + j * 9,
                width: 92 + slip, height: 7, zIndex: 40, borderRadius: 4,
                background: hexa("#2A3038", 0.28 - j * 0.07) }} />
            ))}
            <Puff x={272 - slip} y={712} f={f} at={-20} n={9} s={0.9 + k * 0.7} c="#D8CDBA" z={44} />
          </>);
        })()}

        {/* ══ "juggle" · THE JUGGLE ══════════════════════════════════════════════
             He is keeping all fifteen in the air and another one joins the pattern
             every few frames. You can COUNT it getting worse, which is the clock,
             and the arc widens until it is plainly impossible. Cut on the beat it
             is about to come down.
             ═══════════════════════════════════════════════════════════════════ */}
        {HK === "juggle" && (() => {
          const k = E(f, 0, dur + 6, 0, 1, LIN);
          const N = Math.round(5 + k * 10);                // one more, and another
          const CXj = 468, BASE = 486;
          const SPREAD = 300 + k * 250, HGT = 250 + k * 96;
          return (<>
            {Array.from({ length: N }, (_, i) => {
              const per = 30;
              const t = (((f + i * (per / N)) % per) + per) % per / per;
              const dir = i % 2 ? 1 : -1;
              const px = CXj + dir * (t - 0.5) * SPREAD;
              const py = BASE - Math.sin(t * Math.PI) * HGT;
              const m = R.fifteen[i % R.fifteen.length];
              const sz = 92;
              return (
                <div key={"jg" + i} style={{ position: "absolute", left: px - sz / 2, top: py - sz / 2,
                  width: sz, height: sz, zIndex: 84, borderRadius: 11,
                  transform: `rotate(${i * 51 + t * 300 * dir}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {m.m ? (
                    <Img src={staticFile(m.m)} style={{ position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: 50, height: 50, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(12, 800), color: "#2A3240" }}>{m.n}</span>
                  )}
                </div>
              );
            })}
            {/* the next one being lobbed in from off-frame, every few frames */}
            <div style={{ position: "absolute", inset: 0, zIndex: 86,
              transform: `translateY(${Math.sin(f / 5) * 5}px)` }} />
            <div style={{ position: "absolute", inset: 0, zIndex: 80,
              transform: `translateY(${k * 12}px)` }}>
              <GHero f={f} at={-30} x={468} y={foot(P.horizon, 418)} size={470} z={80}
                strain={0.44 + k * 0.42} drive={0} reach={158} act={1} ph={0.4} calm={0.4} />
            </div>
            {/* his hands, working the pattern */}
            {[0, 1].map(j => {
              const sw = Math.sin(f / 3.4 + j * Math.PI) * 26;
              return (
                <div key={"jh" + j} style={{ position: "absolute",
                  left: CXj - 150 + j * 224 + sw, top: 470 + Math.cos(f / 3.4 + j * Math.PI) * 16,
                  width: 96, height: 50, zIndex: 88, borderRadius: 25,
                  transform: `rotate(${-22 + j * 44}deg)`,
                  background: "linear-gradient(180deg,#7C89EE 0%,#5C6BE8 52%,#4351C6 100%)",
                  border: "5px solid #37409E" }} />
              );
            })}
          </>);
        })()}

        {/* ⛔⛔ A DUPLICATE BLOCK WAS RENDERING UNDERNEATH THIS ONE. Rebuilding
             the downpour inserted the new version without removing the first,
             so BOTH ran — two umbrellas stacked (a cream canopy sitting over
             the clay one) and two sets of falling tiles. That is most of why
             the shot read as clutter, and why changing the canopy colour
             appeared to do nothing: I was recolouring the one underneath.
             ⭐ After rebuilding a scene in place, COUNT THE GUARD:
             `grep -c 'HK === "rain"'` must be 1. */}

        {HK === "roll" && (() => {
          /* ⭐⭐ THE BALL IS MADE OF THE SUBJECT, AND IT IS GROWING.
             A plain white disc with one mark on it was legible but inert — Alex:
             *"the ball etc way more interesting."* ⭐ A snowball is the answer, and
             it is also the most accurate picture of the sentence: Google shipped
             fifteen tools THIS MONTH, so the thing rolling at you is made of all
             fifteen and picks up more as it comes. Every product mark on this reel
             is embedded in its surface, turning with it.
             ⭐⭐⭐ TWO CLOCKS AT ONCE, which is what the anticipation was missing in
             all five earlier hooks: it is getting CLOSER and it is getting BIGGER.
             Either alone is a countdown; together they converge on him. */
          const k   = E(f, 0, dur + 6, 0, 1, LIN);        // ⛔ LIN: a clock is constant
          const RAD = 176 + k * 108;                       // it grows as it rolls
          const cx  = 920 - k * 340, cy = 690 - RAD + Math.sin(f / 3.1) * 3;
          /* a REAL roll: the turn is the distance travelled over the radius */
          const spin = -(920 - cx) / RAD * (180 / Math.PI);
          const slip = k * 74;
          const NT = Math.round(9 + k * 8);                // and it collects more
          /* the loose ones lying in its path, which it rolls over and takes */
          const GROUND: [number, number][] = [[452, 4], [548, 9], [644, 1], [740, 6], [836, 12]];
          return (<>
            <div style={{ position: "absolute", left: cx - RAD - 44, top: 656, width: RAD * 2 + 88, height: 82,
              zIndex: 30, borderRadius: "50%", filter: "blur(13px)",
              background: `radial-gradient(ellipse at 50% 50%, ${hexa("#0A0F1A", 0.52)} 0%, ${hexa("#0A0F1A", 0)} 72%)` }} />

            {/* ── the ones still on the floor in front of it ── */}
            {GROUND.map(([gx, ti], i) => {
              const eaten = Math.max(0, Math.min(1, ((cx - RAD * 0.86) - gx) * -0.02));
              if (eaten >= 1) return null;
              const t = R.fifteen[ti];
              const sz = 92 * (1 - eaten * 0.55);
              return (
                <div key={"gt" + i} style={{ position: "absolute", left: gx - sz / 2,
                  top: 636 - sz / 2 - eaten * 40, width: sz, height: sz, zIndex: 46,
                  borderRadius: 10, opacity: 1 - eaten * 0.4,
                  transform: `rotate(${-14 + i * 9 + eaten * 90}deg)`,
                  background: "linear-gradient(160deg,#FFFFFF 0%,#E4E9EF 100%)",
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH }}>
                  {t.m && <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%",
                    top: "50%", transform: "translate(-50%,-50%)", width: sz * 0.54, height: sz * 0.54,
                    objectFit: "contain" }} />}
                </div>
              );
            })}

            {/* ══ THE BALL ══ */}
            <div style={{ position: "absolute", left: cx - RAD, top: cy - RAD,
              width: RAD * 2, height: RAD * 2, zIndex: 70, borderRadius: "50%",
              transform: `rotate(${spin}deg)`,
              background: `radial-gradient(circle at 36% 30%, #FFFFFF 0%, #E9EEF5 46%, #A9B4C4 100%)`,
              border: `9px solid ${dkh("#6E7886", 0.28)}`, boxShadow: SH_D, overflow: "hidden" }}>
              {/* ⭐ ITS SURFACE IS THE PRODUCTS. Two rings of real marks, packed into
                  the ball and turning with it — so the thing rolling at him is
                  visibly everything Google put out. */}
              {Array.from({ length: NT }, (_, i) => {
                const ring = i % 2;
                const rr = RAD * (ring ? 0.88 : 0.54) * (0.94 + rnd(i, 5) * 0.14);
                const th = (i / NT) * Math.PI * 2 + ring * 0.4;
                const sz = RAD * (ring ? 0.28 : 0.34) * (0.82 + rnd(i, 3) * 0.42);
                const t = R.fifteen[i % R.fifteen.length];
                return (
                  <div key={"bt" + i} style={{ position: "absolute",
                    left: RAD + Math.cos(th) * rr - sz / 2, top: RAD + Math.sin(th) * rr - sz / 2,
                    width: sz, height: sz, borderRadius: sz * 0.14,
                    transform: `rotate(${th * (180 / Math.PI) + 90 + (rnd(i, 7) - 0.5) * 88}deg)`,
                    background: "linear-gradient(160deg,#FFFFFF 0%,#DDE3EB 100%)",
                    border: `3px solid ${dkh("#8E96A2", 0.34)}` }}>
                    {t.m ? (
                      <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%,-50%)", width: sz * 0.58, height: sz * 0.58,
                        objectFit: "contain" }} />
                    ) : (
                      <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                        transform: "translateY(-50%)", textAlign: "center",
                        ...mono(Math.max(7, sz * 0.15), 800), color: "#2A3240" }}>{t.n}</span>
                    )}
                  </div>
                );
              })}
              {/* the hub: Google's own real mark, at the centre of the thing */}
              <div style={{ position: "absolute", left: RAD - RAD * 0.24, top: RAD - RAD * 0.24,
                width: RAD * 0.48, height: RAD * 0.48, borderRadius: "50%", zIndex: 6,
                background: "linear-gradient(158deg,#FFFFFF 0%,#EDF1F6 100%)",
                border: `4px solid ${dkh("#8E96A2", 0.3)}` }}>
                <Img src={staticFile("logos/google.svg")} style={{ position: "absolute", left: "50%",
                  top: "50%", transform: "translate(-50%,-50%)", width: RAD * 0.30,
                  height: RAD * 0.30, objectFit: "contain" }} />
              </div>
            </div>
            {/* the tread it leaves — a ball that big packs the ground */}
            {[0, 1, 2, 3].map(j => (
              <div key={"tr" + j} style={{ position: "absolute", left: cx + RAD * 0.4 + j * 62,
                top: 688 + j * 4, width: 46, height: 9, zIndex: 34, borderRadius: 5,
                background: hexa("#2A3038", 0.24 - j * 0.05) }} />
            ))}
            <Puff x={cx - RAD * 0.7} y={700} f={f} at={-20} n={9} s={1.0 + k * 0.8} c="#D8CDBA" z={44} />

            {/* ⭐ AND HE IS GOING UNDER IT. Braced, sliding, and dropping — the body
                 is the readout for how close this is. */}
            <div style={{ position: "absolute", inset: 0, zIndex: 80,
              transform: `translate(${-slip}px, ${k * 22}px) rotate(${-14 - k * 12}deg)`,
              transformOrigin: "266px 700px" }}>
              <GHero f={f} at={-30} x={272} y={foot(P.horizon, 418)} size={496} z={80}
                strain={0.76 + k * 0.23} drive={-0.36 - k * 0.2} reach={152} act={1} ph={0.4} calm={0.5} />
            </div>
            {[0, 1].map(j => (
              <div key={"pw" + j} style={{ position: "absolute",
                left: cx - RAD - 96 + j * 20, top: 366 + k * 26 + j * 106,
                width: 126, height: 54, zIndex: 84, borderRadius: 27,
                transform: `rotate(${-40 + j * 24}deg)`,
                background: "linear-gradient(180deg,#7C89EE 0%,#5C6BE8 52%,#4351C6 100%)",
                border: "5px solid #37409E" }} />
            ))}
            {[0, 1, 2].map(j => (
              <div key={"sk" + j} style={{ position: "absolute", left: 206 - slip + j * 24, top: 706 + j * 9,
                width: 96 + slip, height: 7, zIndex: 40, borderRadius: 4,
                background: hexa("#2A3038", 0.28 - j * 0.07) }} />
            ))}
          </>);
        })()}

        {/* ⛔ AN ALLOW-LIST, NOT A DENY-LIST. This was `HK !== "hose" && HK !== "roll"`,
            so every NEW concept added after it silently rendered the old box pile and
            its tosser UNDERNEATH — three concepts drawn as six, which is exactly what
            "I can't tell what's going on" looks like. A deny-list has to be updated
            every time the set grows; an allow-list cannot rot. */}
        {(HK === "build" || HK === "last" || HK === "door") && (<>{/* ── THE ARMFUL. It pivots on his shoulder, and it is past its angle at
             frame 0 — that is the anticipation: a load that has not fallen YET.
             ⛔ the PILE rotates about its own contact point; the camera never
             tilts (`feedback_the_camera_must_never_tilt`). ── */}
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 54,
          transform: `translateY(${HK === "door" ? Math.abs(Math.sin(f / 4.2)) * 7 : 0}px) rotate(${lean + set * 3.1}deg) translateY(${sink * 0.34}px)`, transformOrigin: `408px 604px` }}>
          {PILE.map(([ti, px, py, pa, av], i) => {
            const t = R.fifteen[ti];
            /* the arrival: a hard throw onto the pile, landing at `av` */
            /* ⭐ it is THROWN: a 10-frame flight from his hands, landing hard.
               ⛔ IN_Q — fastest on impact. An OUT ease floats the box in and the
               landing stops reading as a hit. */
            /* ⭐ "last": the fifteenth is LOWERED, not thrown — 36 frames of
               approach on a straight line, which is the countdown. Everywhere
               else a box is thrown and lands hard. */
            const slow = HK === "last" && ti === 1;
            const ar = av > 0 ? (slow ? E(f, 4, av, 0, 1, LIN) : E(f, av - 10, av, 0, 1, IN_Q)) : 1;
            if (ar <= 0.001) return null;
            const land = av > 0 && f >= av
              ? Math.sin((f - av) / 2.4) * Math.exp(-(f - av) / 8) : 0;
            const g = 0;
            const w = TW - rnd(i, 3) * 18, h = TH - rnd(i, 5) * 10;
            return (
              <div key={"bx" + i} style={{ position: "absolute",
                left: px + (1 - ar) * (slow ? 40 : 798 - px),
                top: py + (1 - ar) * (slow ? -420 : 352 - py),
                width: w, height: h, zIndex: 54 + i,
                /* ⭐ and in "last" the boxes BOW: each one above the waist shifts
                   further than the one below it, which is what a stack does in the
                   half-second before it goes. */
                transform: `translateX(${bow * Math.max(0, (486 - py)) * 0.11}px) rotate(${pa + (1 - ar) * (slow ? 8 : 86) + land * 7 + bow * (486 - py) * 0.012}deg) scale(${1 + land * 0.09})` }}>
                {/* its thickness — a face alone is a card, an edge makes it an object */}
                <div style={{ position: "absolute", left: 5, top: h - 14, width: w - 10, height: 22,
                  borderRadius: 4, background: dkh("#B9C0CB", 0.30) }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: 10,
                  background: `linear-gradient(163deg, #FFFFFF 0%, #EDF0F4 58%, #D2D8E0 100%)`,
                  border: `4px solid ${dkh("#8E96A2", 0.30)}`, boxShadow: SH_D,
                  overflow: "hidden" }}>
                  {/* ⛔ MIXBOARD, POMELLI and WHISK publish no product icon — they
                      all serve the generic Labs beaker — so they carry their NAME.
                      A WRONG MARK IS WORSE THAN NO MARK, and `t.m` is null for them:
                      passing that to staticFile() is what crashed the first render. */}
                  {t.m ? (
                    <Img src={staticFile(t.m)} style={{ position: "absolute",
                      left: "50%", top: "48%", transform: "translate(-50%,-50%)",
                      width: h * 0.60, height: h * 0.60, objectFit: "contain" }} />
                  ) : (
                    <span style={{ position: "absolute", left: 0, right: 0, top: "48%",
                      transform: "translateY(-50%)", textAlign: "center",
                      ...mono(Math.min(22, (w - 26) / (t.n.length * 0.62)), 800),
                      color: "#2A3240", letterSpacing: "0.04em" }}>{t.n}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── THE ARM THAT MAKES IT CARRIED. ⛔ v1 drew this in HOT — the ORANGE
             Claude colour — on a BLUE Gemini sprite, and it read as a beige plank
             across his face. This is the sprite's own body blue, sampled off the
             render (#5C6BE8), braced under the pile's bottom-left corner at z 90
             so it sits in FRONT of the load. Without it he is a sprite standing
             beside a stack; with it he is holding one. ── */}
        {(() => {
          const px = 336, py = 466 + sink * 0.86 + (HK === "door" ? Math.abs(Math.sin(f / 4.2)) * 7 : 0);
          const ang = -15 - lean * 0.30 + set * 2.0;
          return (
            <div style={{ position: "absolute", left: px, top: py, width: 196, height: 46,
              zIndex: 90, transform: `rotate(${ang}deg)`, transformOrigin: "14px 50%" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 23,
                background: `linear-gradient(180deg, #7C89EE 0%, #5C6BE8 54%, #4351C6 100%)`,
                border: "5px solid #37409E" }} />
              {/* the hand, cupped under the corner it is taking the weight on */}
              <div style={{ position: "absolute", left: 150, top: -13, width: 62, height: 70,
                borderRadius: "32px 32px 26px 26px",
                background: `linear-gradient(168deg, #7C89EE 0%, #4B58D2 100%)`,
                border: "5px solid #37409E" }} />
            </div>
          );
        })()}

        {/* ⛔⛔ FRAME 0 HAD NO HERO IN IT. The sprite rig runs an entrance from
            its `at`, which defaults to 0, so the one frame that has to stop a
            scroll opened on a load with nobody under it. at={-20} means he is
            already there, already straining, at frame 0. */}
        {/* ⭐ AND HE SEES IT COMING. A load getting heavier is a fact; a body that
            has NOTICED is a story. Strain climbs across the scene instead of
            easing off, and he leans away from the thing arriving. */}
        {/* ⭐ HE SINKS. Strain climbs to the cut and his knees give under each
            landing — the body is the readout for how close this is to going. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 78,
          transform: `translate(0px, ${sink * 0.86 + shake * 4 + (HK === "door" ? Math.abs(Math.sin(f / 4.2)) * 7 : 0)}px)` }}>
          <GHero f={f} at={-20} x={294} y={foot(P.horizon, 418)} size={452} z={78}
            strain={0.66 + E(f, 0, dur, 0, 0.33, IN_Q) + Math.abs(shake) * 0.1}
            drive={-0.12 - E(f, 6, dur, 0, 0.2, IN_Q)}
            reach={138} act={1} ph={0.4} calm={0.5} />
        </div>

        {/* ══ AND SOMEBODY KEEPS THROWING THEM. ═══════════════════════════════
             ⛔ v2 had him WALKING OVER with one box. That gave the shot a clock and
             nothing else: he is no nearer to breaking the pile at f40 than at f10,
             because he never does anything to it. Here he is the CAUSE of the
             accelerating rain — every box in the air came out of his hands, so the
             thing making it worse is a body, on screen, doing it on purpose.
             ⛔ Not a chute or a conveyor: that is the apparatus this hook has been
             rejected for six times over.
             ══════════════════════════════════════════════════════════════════ */}
        {(() => {
          /* his throw cycle is locked to the arrival clock, so the picture and the
             rate agree — he winds up 6f before each one and follows through after */
          if (HK === "door") return null;              // nobody else in the doorway shot
          const nxt = ARR.find(a2 => a2 > f - 3) ?? ARR[ARR.length - 1];
          const w = Math.max(0, Math.min(1, (f - (nxt - 9)) / 9));
          const thr = w < 0.62 ? -E(f, nxt - 9, nxt - 3, 0, 1, OUT) * 0.5
                               : E(f, nxt - 3, nxt + 4, 0, 1, IN_Q);
          return (
            <div style={{ position: "absolute", left: 690, top: 352, zIndex: 92,
              transform: `rotate(${thr * -9}deg)`, transformOrigin: "40% 90%" }}>
              <GHero f={f} at={-30} x={118} y={330} size={318} z={92} act={2} ph={1.4}
                drive={0.26 + thr * 0.3} strain={0.42} reach={120 + thr * 60} calm={0.5} />
              {/* the arm that does the throwing */}
              <div style={{ position: "absolute", left: 22, top: 44, width: 48, height: 150,
                zIndex: 93, borderRadius: 24,
                transform: `rotate(${34 - thr * 96}deg)`, transformOrigin: "50% 88%",
                background: `linear-gradient(180deg, #7C89EE 0%, #4B58D2 100%)`,
                border: "4px solid #37409E" }} />
              {/* and the pallet he is working off — it goes DOWN as the pile goes up */}
              {Array.from({ length: 6 }, (_, q) => {
                const gone = ARR.filter(a2 => f >= a2).length;
                if (q < gone - 2) return null;
                return (
                  <div key={"pl" + q} style={{ position: "absolute", left: 176 + (q % 2) * 12,
                    top: 246 - q * 22, width: 132, height: 30, zIndex: 90, borderRadius: 5,
                    background: `linear-gradient(168deg, #F4F6F9 0%, #C9D0DA 100%)`,
                    border: `3px solid ${dkh("#8E96A2", 0.30)}` }} />
                );
              })}
            </div>
          );
        })()}

        {/* ══ "door" · THE DOORWAY. ════════════════════════════════════════════
             The most legible of the three, and the only one that needs no reading:
             a lintel at 296 and a stack whose top box sits at -76. He is walking
             at it and not slowing down. Everyone has seen this shot; nobody has to
             be told what is about to happen, which is the entire definition of
             anticipation. ⛔ The gap closes on LIN — a clock is constant.
             ══════════════════════════════════════════════════════════════════ */}
        {HK === "door" && (() => { const DXX = -330 + E(f, 0, dur + 4, 0, 372, LIN); return (<>
          <div style={{ position: "absolute", left: DXX, top: 296, width: 300, height: 40,
            zIndex: 84, background: `linear-gradient(180deg, #8E97A6 0%, #4C5462 100%)`,
            borderBottom: "6px solid #2A3038" }} />
          <div style={{ position: "absolute", left: DXX, top: 296, width: 74, height: 420,
            zIndex: 84, background: `linear-gradient(96deg, #7E8794 0%, #444C58 100%)` }} />
          <div style={{ position: "absolute", left: DXX + 226, top: 296, width: 74, height: 420,
            zIndex: 84, background: `linear-gradient(96deg, #7E8794 0%, #444C58 100%)` }} />
          {/* the dark of the next room, so it reads as a way THROUGH */}
          <div style={{ position: "absolute", left: DXX + 74, top: 336, width: 152, height: 380,
            zIndex: 83, background: "linear-gradient(180deg,#0C1119 0%,#1B2330 100%)" }} />
          {/* the height marker on the jamb — the measurement he is about to fail */}
          {[0, 1, 2].map(q => (
            <div key={"hm" + q} style={{ position: "absolute", left: DXX + 232, top: 344 + q * 30,
              width: 60, height: 7, zIndex: 85, background: hexa("#E8B45A", 0.5 - q * 0.12) }} />
          ))}
        </>); })()}

        {/* ⭐ every landing throws dust off the stack — eight of them, accelerating,
             so the shot gets visibly busier the closer it gets to going over */}
        {ARR.map((at, i) => f >= at && f < at + 16 && (
          <Puff key={"pf" + i} x={452 + (i % 3 - 1) * 90} y={620 - i * 22} f={f} at={at}
            n={7} s={1.0 + i * 0.06} c="#E4D8C4" z={52} />
        ))}
        </>)}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · 1.73 to 3.60s (56f) · MED-WIDE
   VO: "but Google actually launched 15 new AI tools,"
   EVENT: fifteen bay numbers light IN SEQUENCE down the row and each bay's
   machine kicks in as its number lands. ⛔ The count is READ as fifteen bays —
   no numeral "15" is typeset anywhere.
   ======================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const P = PLACE.row;

  /* ⛔⛔⛔ REPLACED. The old S1 was a 992x250 RACK OF TUBES firing fifteen columns
     of light — an invented apparatus launching abstract shapes, which is the exact
     failure that got eight hook versions rejected, sitting in the body of the reel
     where I had not thought to look for it.

     ⭐⭐ AND IT NOW PAYS OFF THE HOOK. S0 ends with a crowd photographing two
     plinths while thirteen more stand unlit in the dark behind them. So this is
     THE LIGHTS COMING UP: banks strike on in sequence until the whole hall is
     visible and all fifteen are standing there. A stadium lighting up is a machine
     everybody already knows (`feedback_draw_a_machine_people_know`), it is the
     honest picture of "Google launched fifteen", and it is a CAUSAL CHAIN rather
     than one event repeated — which is what 119's hook does and mine did not:
     breaker → bank → bank → flood.

     ⭐ THE BEATS ARE THE WORDS, minus the house 4-frame picture lead:
         "but" f4 · "Google" f7 · "actually" f11
         ⭐ "LAUNCHED" f22  →  the main bank strikes at f18
         "15" f31 → f27, all fifteen standing lit
         "new" f38 · "AI" f45 · "tools" f50
     ⛔ EACH STRIKE IS A STEP, NEVER A FADE. Lights do not ramp; they bang on and
     the room jumps with them. That is the discrete stroke 120 is built on. */
  /* ⛔ THE TAIL DIED AT 0.31. Everything was lit by f18 and the scene then held
     for thirty-eight frames — and the words kept coming: "15" f31, "new" f38,
     "AI" f45, "TOOLS" f50. ⭐ So the last beat is the four this reel is actually
     about LIFTING FORWARD on "tools" (f46), which fills the tail AND states the
     sentence the next four scenes have to pay off. */
  const BREAK = 4, BANK_A = 8, BANK_B = 13, FLOOD = 18, SETTLE = 27, PICK = 46;
  const BANKS = [BANK_A, BANK_B, FLOOD];
  /* ⭐ ONE CAUSE, FOUR EFFECTS: every strike lights its plinths, throws a pool on
     the floor, kicks the room and pops the marks. */
  const jolt = BANKS.reduce((a, at) => a +
    (f >= at ? Math.sin((f - at) / 1.6) * Math.exp(-(f - at) / 5.4) : 0), 0);
  const on = (at: number) => (f >= at ? 1 : 0);            // ⛔ a STEP, not a ramp
  const lit = on(BANK_A) + on(BANK_B) + on(FLOOD);
  const room = 0.30 + lit * 0.24;
  const lever = E(f, BREAK - 3, BREAK, 0, 1, IN_Q);
  const settle = f >= SETTLE ? Math.sin((f - SETTLE) / 2.6) * Math.exp(-(f - SETTLE) / 9) : 0;

  /* fifteen plinths in three banks of five. The first two are the ones the crowd
     was already photographing in the hook, so they are lit from frame 0. */
  /* ⛔ FIFTEEN IDENTICAL PLATES IS A ROW OF EQUALS, and a row of equals cannot
     rank (`feedback_hierarchy_is_layers_removed`) — it is the same fault the
     original hook was rejected for, rebuilt in the body. ⭐ The FOUR this reel is
     actually about come forward: bigger plate, taller plinth, brighter pool. The
     scene therefore ends on "4 out of 15", which is the sentence the next four
     scenes have to pay off, instead of on fifteen anonymous squares. */
  const HERO4 = [2, 3, 12, 13];                  // JULES · OPAL · MIXBOARD · POMELLI
  const PLINTHS = Array.from({ length: 15 }, (_, i) => ({
    ti: i,
    x: 42 + (i % 5) * 190,
    y: 286 + Math.floor(i / 5) * 150,
    bank: i < 2 ? -1 : Math.floor(i / 5),
    hero: HERO4.includes(i),
  }));

  return (
    <Scene p={P} slug="" vig={0.34 - E(f, 0, dur, 0, 0.16, LIN)}>
      <Cam s={1.08 - E(f, FLOOD, dur + 8, 0, 0.08, OUT)} z={12}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 430,
            background: `linear-gradient(180deg, ${mxh(P.back, 0.10 + room * 0.34)} 0%, ${mxh(P.back2, 0.06 + room * 0.26)} 100%)` }} />
          <RowWall y={214} h={498} z={6} f={f} />
          <Apron f={f} y={690} z={10} slope={228} />
        </div>

        {/* ⭐ THE LAMP BANKS THEMSELVES, high in the truss — you see WHAT lights up */}
        {BANKS.map((at, b) => (
          <React.Fragment key={"bk" + b}>
            <div style={{ position: "absolute", left: 30 + b * 330, top: 88 + jolt * 4,
              width: 300, height: 42, zIndex: 22, borderRadius: 5,
              background: `linear-gradient(180deg,#8E97A6 0%,#3E4756 100%)` }} />
            {[0, 1, 2, 3].map(q => (
              <div key={"lm" + q} style={{ position: "absolute", left: 44 + b * 330 + q * 72,
                top: 124 + jolt * 4, width: 58, height: 34, zIndex: 23,
                borderRadius: "0 0 26px 26px",
                background: f >= at
                  ? `linear-gradient(180deg,#FFFBEE 0%,#FFE39A 100%)`
                  : `linear-gradient(180deg,#6E7686 0%,#3A414E 100%)` }} />
            ))}
            {f >= at && (
              <div style={{ position: "absolute", left: 30 + b * 330 - 96, top: 156,
                width: 492, height: 560, zIndex: 20, filter: "blur(24px)",
                opacity: 0.5 + Math.exp(-(f - at) / 4) * 0.5,
                clipPath: "polygon(34% 0%, 66% 0%, 100% 100%, 0% 100%)",
                background: `linear-gradient(180deg, ${hexa("#FFEFCE", 0.6)} 0%, ${hexa("#FFEFCE", 0)} 100%)` }} />
            )}
          </React.Fragment>
        ))}

        {/* ── THE FIFTEEN ────────────────────────────────────────────────────────
             ⛔⛔⛔ "I still see one rectangle with white on it, not interesting."
             He is right, and it is a rule I inherited rather than chose: the house
             convention is "real marks on WHITE TILES", which exists for a luma
             reason (several of these logos are dark-on-transparent and read at
             72/255 on a dark plate). I applied it everywhere without noticing that
             the CONTAINER had become the thing you see — fifteen white squares.

             ⭐ The mark has to stay real and the panel still has to be bright, so
             the fix is the SHAPE and the MATERIAL, not the mark: each tool is now
             an ILLUMINATED ROUNDEL ON A POST — a lit station sign. Round kills the
             rectangle, the glass is lit from within rather than being flat white,
             it throws its own light onto the floor, and it SWINGS on its post when
             its bank strikes. Fifteen signs coming on in banks is a picture; fifteen
             white squares is a spreadsheet. */}
        {PLINTHS.map(({ ti, x, y, bank, hero }) => {
          const at = bank < 0 ? -30 : BANKS[bank];
          const show = f >= at;
          const pk = show ? E(f, at, at + 7, 0, 1, BACK) : 0;
          /* it swings on its post when the current hits it, then settles */
          const sw = show ? Math.sin((f - at) / 2.4) * Math.exp(-(f - at) / 9) * (hero ? 11 : 7) : 0;
          /* ⭐ "TOOLS" f50 -> 46: the four come forward and the eleven stand back */
          const pick = E(f, PICK, PICK + 12, 0, 1, BACK);
          const fwd = hero ? pick : 0;
          const back = hero ? 0 : E(f, PICK, PICK + 12, 0, 1, OUT);
          const t = R.fifteen[ti];
          const D = hero ? 152 : 116;                 // the roundel's diameter
          const cx = x + 74, cy = y + 40;
          return (
            <React.Fragment key={"pt" + ti}>
              {/* the post it hangs off */}
              <div style={{ position: "absolute", left: cx - 7, top: cy, width: 14, height: 214,
                zIndex: 39, borderRadius: 7,
                background: `linear-gradient(90deg,#4A525E 0%,#96A0B0 46%,#3E4652 100%)` }} />
              <div style={{ position: "absolute", left: cx - 46, top: cy + 206, width: 92, height: 22,
                zIndex: 39, borderRadius: 6, background: `linear-gradient(180deg,#8E97A6 0%,#454E5A 100%)` }} />

              {/* ⭐ THE ROUNDEL. Lit from within when its bank strikes. */}
              <div style={{ position: "absolute", left: cx - D / 2, top: cy - D / 2 + settle * 3 - fwd * 26,
                width: D, height: D, zIndex: hero ? 47 : 44, borderRadius: "50%",
                opacity: 1 - back * 0.42,
                transform: `rotate(${sw}deg) scale(${0.88 + pk * 0.12 + fwd * 0.24 - back * 0.06})`,
                transformOrigin: "50% -18%",
                background: show
                  ? `radial-gradient(circle at 42% 34%, #FFFFFF 0%, #FFF7E4 46%, #F0DEB4 100%)`
                  : `radial-gradient(circle at 42% 34%, #59616E 0%, #454C57 60%, #333944 100%)`,
                border: `7px solid ${show ? "#C8A354" : "#39414C"}`,
                boxShadow: show ? SH_D : "none" }}>
                {t.m ? (
                  <Img src={staticFile(t.m)} style={{ position: "absolute", left: "50%", top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: D * 0.54, height: D * 0.54, objectFit: "contain",
                    opacity: show ? 1 : 0.34, filter: show ? "none" : "grayscale(1)" }} />
                ) : (
                  <span style={{ position: "absolute", left: 0, right: 0, top: "50%",
                    transform: "translateY(-50%)", textAlign: "center",
                    ...mono(Math.min(15, (D - 26) / (t.n.length * 0.62)), 800),
                    color: show ? "#2A3240" : "#6E7686" }}>{t.n}</span>
                )}
                {/* the filament glare across the glass — it is LIT, not white */}
                {show && (
                  <div style={{ position: "absolute", left: "12%", top: "10%", width: "44%", height: "26%",
                    borderRadius: "50%", background: hexa("#FFFFFF", 0.72), filter: "blur(5px)" }} />
                )}
              </div>

              {/* ⭐ and it throws its OWN light — the halo and the pool under it */}
              {show && (<>
                <div style={{ position: "absolute", left: cx - D * 0.95, top: cy - D * 0.95,
                  width: D * 1.9, height: D * 1.9, zIndex: 42, borderRadius: "50%", filter: "blur(20px)",
                  opacity: (hero ? 0.62 : 0.40) + Math.exp(-(f - at) / 5) * 0.4,
                  background: `radial-gradient(circle, ${hexa("#FFE9BE", 0.8)} 0%, ${hexa("#FFE9BE", 0)} 68%)` }} />
                <div style={{ position: "absolute", left: cx - 108, top: cy + 216, width: 216, height: 62,
                  zIndex: 38, borderRadius: "50%", filter: "blur(10px)",
                  opacity: (hero ? 0.5 : 0.30) + Math.exp(-(f - at) / 5) * 0.34,
                  background: `radial-gradient(ellipse at 50% 50%, ${hexa("#FFEFCE", 0.8)} 0%, ${hexa("#FFEFCE", 0)} 72%)` }} />
              </>)}
              {show && f < at + 16 && (
                <Ring x={cx} y={cy} f={f} at={at} c="#FFF0D2" s={hero ? 1.15 : 0.85} z={48} dur={16} />
              )}
            </React.Fragment>
          );
        })}

        {/* ⭐ AND A BODY CAUSED IT. The chain starts with him on the breaker. */}
        <div style={{ position: "absolute", left: 872, top: 392, width: 72, height: 152, zIndex: 60,
          borderRadius: 8, background: `linear-gradient(180deg,#B4BCC6 0%,#5E6878 100%)`,
          border: "5px solid #2A3038" }}>
          <div style={{ position: "absolute", left: 15, top: 14 + lever * 74, width: 42, height: 54,
            borderRadius: 7, background: lever > 0.5 ? "#7ED8A8" : "#E0685C",
            border: "4px solid #2A3038" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 62,
          transform: `translateY(${jolt * 5}px)` }}>
          <GHero f={f} at={-30} x={912} y={foot(P.horizon, 418)} size={360} z={62}
            drive={-0.2} strain={0.2 + lever * 0.2} reach={104 + lever * 60}
            act={1} ph={0.7} calm={0.5} />
        </div>
        {/* the crowd, still down at the first two, still not turning round */}
        <HypeMob f={f} x={196} y={766} n={9} size={110} spread={274} turn={0} z={64} seed={4} sil={0.44} />
      </Cam>
      <Chip t="GOOGLE · NEW THIS MONTH" y={150} c={INK} fg="#EAF2FF" s={0.96} z={96} />
    </Scene>
  );
};


/* =========================================================================
   S2 · 3.60 to 6.53s (88f) · CLOSE
   VO: "and some of them might be incredibly helpful for you."
   ⭐ THE HERO ARTIFACT'S INTRODUCTION, and the whole reel's promise in one
   gesture: the tray is EMPTY for 14 frames (the before state), something DROPS
   into it, and Claude lifts it out. A transaction, not a conveyor.
   ======================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REBUILT ON THE ONE MECHANISM THIS ACCOUNT HAS MEASURED PERFORMANCE FOR.
     Alex: *"needs to be completely redone, way more interesting and intriguing,
     please reference the winning videos from the past."*

     ⭐ `feedback_frame0_claim_plate` is the only place in this repo where a hook
     variable was checked against REAL IG PERFORMANCE. Reel 94 shipped six cuts;
     A and B performed, C-F did not, and the separator was **a big readable CLAIM
     PLATE in the middle third** — 32.66% and 18.15% of the panel against ~8% for
     every loser. ⛔ Motion did NOT separate them (the highest-motion cut LOST),
     luma did not, and the mechanism did not. The two cuts built off that finding
     were **G · THE PRESS (multiplication)** and **H · THE BOARD (resolution:
     scrambled flaps LOCK to exact)**.

     ⭐⭐ "SOME of them" IS A RESOLUTION, so this is THE BOARD. A departure board
     rolls through Google's whole roster and LOCKS, one row at a time, onto the
     four this reel is about. It is intriguing for the reason a split-flap always
     is: you cannot look away until it lands. And a four-row board IS the claim
     plate — a big bright readable rectangle in the middle third, which is the
     measured shape.

     ⭐ THE LOCKS ARE ON THE WORDS (minus the 4-frame lead):
         ⭐ "SOME" f10 -> row 1 locks f8   ·  "them" f19 -> row 2 f18
            "incredibly" f38 -> row 3 f30  ·  "helpful" f41 -> row 4 f42
         ⭐ "FOR YOU" f52-60 -> all four light and the hero takes the board in. */
  const P = PLACE.row;
  /* the four, in the order the VO names them, each with its real mark */
  const ROWS = [
    { n: "JULES",    m: R.tools[0].mark, at: 8 },
    { n: "OPAL",     m: R.tools[1].mark, at: 18 },
    { n: "MIXBOARD", m: null,            at: 30 },
    { n: "POMELLI",  m: null,            at: 42 },
  ];
  /* ⛔ the decoys are REAL Google tools too — a board that scrambles through
     invented names would be a fabricated receipt. */
  const DECOY = ["GEMINI", "STITCH", "COLAB", "FLOW", "WHISK", "VEO", "STAX",
                 "IMAGEN", "GENIE", "NOTEBOOK", "AI STUDIO", "VANTAGE"];
  const LIT = 48;
  const lit = E(f, LIT, LIT + 14, 0, 1, OUT);
  /* ⭐ the board DROPS IN, already most of the way down on frame 0 (carry-in),
     and lands with a swing on its hangers. */
  const drop = E(f, -9, 7, 0, 1, OUT);
  const swing = f > 7 ? Math.sin((f - 7) / 4.2) * Math.exp(-(f - 7) / 14) * 2.6 : 0;
  /* ⛔ §23 · AND THEN IT LEAVES. Four 72px marks lifting off moved 11px/frame
     and the tail stayed at 0.66 — nowhere near enough area to carry a cut. The
     BOARD is 820x348, 35% of the panel, so once it has handed its four over it
     hauls back up out of frame: the largest object in the scene is the one that
     takes the shot into the next. */
  const away = E(f, LIT + 10, dur + 8, 0, 1, IN_Q);
  const dy = (1 - drop) * -470 - away * 620;

  return (
    <Scene p={P} slug="" vig={0.28 - E(f, 0, dur, 0, 0.12, LIN)}>
      <Cam z={12}>
        <div style={{ position: "absolute", inset: 0, zIndex: 2, opacity: 0.95 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 300,
            background: `linear-gradient(180deg, ${P.back} 0%, ${P.back2} 100%)` }} />
          <Facade f={f} y={0} z={6} lit={1} />
          <RowWall y={250} h={456} z={18} f={f} />
          <Apron f={f} y={690} z={10} slope={228} />
        </div>

        {/* the gantry it hangs from, so the board is a STRUCTURE not a floating sign */}
        <Gantry y={92} f={f} z={40} span={[70, 942]} />

        {/* ⭐ THE BOARD — the claim plate. Cream case, four rows, in the middle
            third, well below the header pill (which is what the losers' biggest
            bright object was). */}
        <div style={{ position: "absolute", left: 96, top: 172 + dy, width: 820, height: 348, zIndex: 56,
          transform: `rotate(${swing}deg)`, transformOrigin: "50% -30%",
          background: `linear-gradient(180deg, #F4F1E8 0%, #E4DFD2 100%)`,
          borderRadius: 14, border: "9px solid #2A3038", boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 96, top: 172 + dy, width: 820, height: 44, zIndex: 57,
          transform: `rotate(${swing}deg)`, transformOrigin: "50% -30%",
          background: "#2A3038", borderRadius: "6px 6px 0 0" }} />
        {[0, 1, 2, 3].map(i => (
          <div key={"hang" + i} style={{ position: "absolute", left: 176 + i * 220, top: 118,
            width: 11, height: Math.max(6, 58 + dy), zIndex: 55, background: dkh(STEEL, 0.34) }} />
        ))}

        {ROWS.map((r, i) => {
          const locked = f >= r.at;
          /* ⭐ BEFORE THE LOCK IT ROLLS THROUGH THE REAL ROSTER; AFTER, it holds.
             The flip is the component's own edge-on cell (never a fake glyph). */
          const txt = locked ? r.n : DECOY[(Math.floor(f / 2) + i * 5) % DECOY.length];
          const at = locked ? r.at : f;          // re-flip every time it changes
          const ry = 238 + i * 70 + dy;
          return (
            <React.Fragment key={"row" + i}>
              {/* the row's lamp — dark while it rolls, lit when it locks */}
              <div style={{ position: "absolute", left: 130, top: ry + 14, width: 26, height: 26,
                borderRadius: "50%", zIndex: 60,
                background: locked ? hexa(GREEN, 0.55 + lit * 0.45) : hexa("#8A867C", 0.5) }} />
              {/* its real mark, on a white tile, arriving as it locks */}
              {locked && (
                <div style={{ position: "absolute", left: 176, top: ry - 6, zIndex: 62,
                  transform: `scale(${E(f, r.at, r.at + 8, 0.5, 1, BACK)})`, transformOrigin: "0% 50%" }}>
                  <MarkTile x={0} y={0} s={62} src={r.m} name={r.n} z={62}
                    f={f} at={r.at} seed={i * 3} />
                </div>
              )}
              {/* ⭐ THE ROW THAT IS LOCKING IS THE BIGGEST — four equal rows have
                  no first place; the one resolving right now leads. */}
              <SplitFlap x={280} y={ry} text={txt} f={f} at={at}
                s={0.96 * (1 + (f >= r.at && f < r.at + 14 ? 0.22 : 0))} cell={40}
                z={64} c={locked ? "#1B1F27" : "#3A4048"}
                fg={locked ? "#FFF6E2" : "#9AA0A8"} />
              {locked && <Ring x={330} y={ry + 30} f={f} at={r.at} c={GOLD} s={0.5} z={70} dur={14} />}
            </React.Fragment>
          );
        })}

        {/* ⭐ and it LIGHTS on "for you" — the plate at its brightest, which is
            the measured winning geometry, on the words that hand it over. */}
        <div style={{ position: "absolute", left: 96, top: 172 + dy, width: 820, height: 348, zIndex: 58,
          borderRadius: 14, opacity: lit * 0.30, pointerEvents: "none",
          background: `radial-gradient(60% 60% at 50% 50%, ${hexa("#FFF3D2", 0.95)} 0%, ${hexa("#FFF3D2", 0)} 100%)` }} />

        {drop >= 1 && <Puff x={506} y={182} f={f} at={7} n={9} s={1.5} c="#D8CFBC" z={72} />}
        {/* ⛔ §23 · the four lock by f42 of 81 and the board then sat (0.67). The
            four marks LIFT OFF the board and come down to him — still travelling
            on the cut frame, and it hands straight into the first bay. */}
        {ROWS.map((r, i) => {
          const go = LIT + 2 + i * 3;
          if (f < go) return null;
          /* ⛔ IN_Q from f56 had them only 19% travelled by the last eight frames.
             LIN, and starting sooner, so they are visibly crossing at the cut. */
          const k = E(f, go, dur + 6, 0, 1, LIN);
          return (
            <div key={"off" + i} style={{ position: "absolute",
              left: 176 + k * (150 + i * 176 - 176),
              top: 238 + i * 70 - 6 + k * 420,
              zIndex: 88 + i, transform: `rotate(${k * (i % 2 ? 40 : -40)}deg) scale(${1 + k * 0.5})` }}>
              <MarkTile x={0} y={0} s={72} src={r.m} name={r.n} z={88 + i} f={f} at={go} seed={i} />
            </div>
          );
        })}
        {/* ⭐ THE HERO, LIT BY IT, looking up — "for you" needs a recipient */}
        <Hero f={f} x={506} y={958} size={438} z={80} costume={{}} act={3} ph={0.4}
          gaze={0.3 - E(f, 6, LIT, 0, 0.7, IO)}
          cheer={E(f, LIT + 6, LIT + 20, 0, 0.7, OUT)}
          lift={E(f, LIT, LIT + 12, 0, 22, OUT)} />
        <Mark x={874} y={572} s={56} z={92} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · 6.53 to 9.70s (95f) · MED  ·  BAY 07 · JULES
   VO: "First, Jules, an autonomous coding agent powered by Gemini."
   ⭐ "powered by Gemini" is drawn LITERALLY — the charge travels the whole
   length of the feed and the rig boots in three OVERLAPPING stages (§13).
   Claude is asleep and stays asleep: that plants "on its own / in the
   background" three scenes before the VO says it.
   ======================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ f1-6 measured 1.54: the feed sat dark for ten frames. The charge is
     already running when the cut lands. */
  /* ⭐ THE BEATS ARE THE WORDS (`tools/beat_audit.py`, house lead 4f):
       "First" f4 · ⭐ "JULES" f21 -> the mark lands at 17 · "coding" f50
       "agent" f58 · ⭐ "GEMINI" f73 -> the power arrives at 69
     ⛔ Before this the rig simply booted over frames -8..34 for no reason
     connected to anything being said. */
  const NAME = 17, POWER = 69;
  const charge = E(f, -6, NAME, 0, 1, LIN);          // travels, constant speed
  const boot = E(f, -8, NAME, 0, 1, OUT);
  const P = PLACE.jules;
  return (
    <Scene p={P} slug="" vig={0.30 + E(f, 0, dur, 0, 0.16, LIN)}>
      <Cam z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="07" floorY={470} />
        <NightWindow x={628} y={150} w={300} h={210} dawn={0} z={12} />
        {/* the background process: a cable tray running the length of the wall */}
        <Runner y={40} f={f} z={16} rate={21.5} pitch={268} w={212} h={74} c="#7ACAC4" c2="#0A1418" kind="cell" />
        <PowerFeed x={-130} y={452} len={660} f={f} charge={charge} z={42} mark={R.feeds.gemini} />
        <JulesRig x={452} y={266} s={2.16} f={f} boot={boot}
          reach={f > 76 ? Math.sin(f / 4.6) * 0.5 + 0.5 : 0} z={50} />
        {boot > 0.9 && <Ring x={606} y={392} f={f} at={NAME} c={JBLUE} s={1.1} z={74} />}
        {/* ⭐ and Gemini arrives on its own word, not before it */}
        {f >= POWER && <Ring x={452} y={452} f={f} at={POWER} c={JBLUE} s={1.7} z={75} dur={18} />}
        {/* ⭐ THE MOMENT IT IS UP IT STARTS PULLING WORK. Large cards arriving
            from off-frame right, every 5 frames, straight through the cut into
            S4 — which is also §23 (something must still be moving on the cut). */}
        {Array.from({ length: 18 }, (_, i) => {
          const at = -14 + i * 7, lf = f - at;
          if (lf < 0) return null;
          const k = E(f, at, at + 22, 0, 1, LIN);
          return (
            <PRCard key={"jw" + i} f={f} i={i} state="open" w={226}
              x={1120 - k * (1120 - (40 + rnd(i, 2) * 150))}
              y={560 + rnd(i, 3) * 120 + k * 150} z={62}
              rot={(rnd(i, 4) - 0.5) * 46 - k * 64} />
          );
        })}
        {/* ⭐ he is ASLEEP. A chair, a slumped sprite, and nothing else. */}
        {/* ⛔ v1 DREW A CHAIR AND PUT HIM IN FRONT OF IT. A strip showed a Claude
            standing bolt upright in an empty room while the caption said he was
            asleep — `feedback_a_prop_that_renders_is_not_visible`'s sibling: a
            prop that renders in the wrong RELATIONSHIP says nothing. The seat
            is now at y 604 and he sits ON it, tipped back against the rest. */}
        <div style={{ position: "absolute", left: 62, top: 396, width: 46, height: 244, zIndex: 43,
          background: dkh(BRASS, 0.34), borderRadius: "9px 9px 0 0" }} />
        <div style={{ position: "absolute", left: 62, top: 616, width: 268, height: 34, zIndex: 47,
          background: dkh(BRASS, 0.22), borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 84, top: 648, width: 30, height: 96, zIndex: 43, background: dkh(BRASS, 0.52) }} />
        <div style={{ position: "absolute", left: 288, top: 648, width: 30, height: 96, zIndex: 43, background: dkh(BRASS, 0.52) }} />
        {/* the armrest, in FRONT of him — that is what seats a sprite in a chair */}
        <div style={{ position: "absolute", left: 62, top: 548, width: 268, height: 22, zIndex: 52,
          background: dkh(BRASS, 0.40), borderRadius: 5 }} />
        <div style={{ position: "absolute", left: 108, top: 400, zIndex: 46,
          transform: `rotate(${-13 + Math.sin(f / 34) * 1.6}deg)`, transformOrigin: "42% 100%" }}>
          <GHero f={f} x={834} y={228} size={232} z={46} costume={{ constr: 1 }} act={3} ph={2.1}
            drive={0} gaze={0} />
        </div>
        {/* the Zs — small, but they are the only thing that says asleep */}
        {[0, 1, 2].map(i => {
          const t = ((f / 46) + i / 3) % 1;
          return (
            <div key={"z" + i} style={{ position: "absolute", left: 96 + t * 70, top: 560 - t * 140,
              zIndex: 60, fontFamily: MONO, fontWeight: 900, fontSize: 34 + t * 40,
              color: hexa("#DFF6EE", (1 - t) * 0.86), transform: `rotate(${t * 22}deg)` }}>z</div>
          );
        })}
        {/* ⛔⛔⛔ REPLACED — THE SOURCE WAS THE PROBLEM, NOT THE MOVE.
            Alex: *"when it talks about Jules the screen there is so blank and
            boring."* I had already re-cut the pan once for the same shot and it
            did not help, because I was re-framing the wrong capture. Measured,
            `jules_ui.png` has a MEAN LUMA OF 19.6 and a per-band std of 13-27:
            it is jules.google's marketing hero, which is a near-black page with
            a logo on it. No pan, punch or crop rescues that — there is nothing
            in the file to find. `capture_sites.mjs` says this in its own header
            ("the top of a page is usually its darkest band... open on the
            BRIGHTEST window") and I had not obeyed it.

            ⭐ So I re-captured the full page (4747px) and measured it in
            viewport windows. Google publishes a four-step product walkthrough
            far down the page, and it is the actual product doing the actual
            job: a repo picker on a real repo, a real prompt, Jules answering
            with a plan, the user approving, a real diff, and Publish Branch.
            Three panels cut out of it read 16.8 / 86.4 / 19.2 mean luma — the
            plan card alone is 4.4x brighter than the entire old capture, and
            it says something.

            ⭐ And it is now a two-beat SEQUENCE rather than a drift: you see
            what he is GIVEN, then what he ANSWERS. That is the sentence. */}
        {/* 1 · THE ASK — the repo, the branch, and the job, in Google's words */}
        {f >= 2 && f < 42 && (
          <Shot x={492} y={396} w={946} f={f} at={2} ratio={0.511}
            src="broll/shots/jules_ask.png" label="jules.google" z={58} />
        )}
        {/* 2 · THE ANSWER — it comes back with a plan. Hard PUNCH in, no tween:
             `Broll`'s device, and the reason a still can hold a shot at all. */}
        {f >= 42 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 59,
            transform: `scale(${f >= 66 ? 1.10 : 1})`, transformOrigin: "50% 46%" }}>
            <Shot x={492} y={412} w={946} f={f} at={42} ratio={0.637} chrome="bare"
              src="broll/shots/jules_plan.png" z={59} />
          </div>
        )}
        {/* the cut between them gets a real edge so it reads as a cut, not a swap */}
        {f >= 42 && f < 47 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 61,
            background: hexa("#FFFFFF", (1 - (f - 42) / 5) * 0.30) }} />
        )}
        {/* ⭐ the hook's language, in the body: the tool's own mark arrives hard
            on the frame its name is spoken, then takes its place on the header. */}
        <BaySlam f={f} at={NAME} mark={R.tools[0].mark} x={186} y={116} z={94} />
      </Cam>
      <Chip t="BAY 07 · JULES" y={150} c={dkh(JBLUE, 0.62)} fg="#EAFFF8" s={0.98} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S4 · 9.70 to 12.27s (77f) · WIDE  ·  BAY 07
   VO: "Hook it up to GitHub and it clears your pull request backlog on its own,"
   ⭐ §3: the VO's noun is BACKLOG and its verb is CLEARS, so a physical stack
   physically empties. The rack DRAINS across the FULL duration.
   ======================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REPLACED, CONCEPT AND ALL. Alex: *"at 10 seconds that animation concept
     itself is way too bad."* Two goes at this were both the same idea in
     different clothes — twenty cards flying, then a tower shrinking. Both are
     the SECOND half of the sentence (the backlog clearing) and neither is the
     FIRST half, which is the actual instruction and the actual verb:

         *"**HOOK IT UP** to GitHub and it clears your backlog on its own."*

     ⭐ So the shot is the CONNECTION being made. A heavy cable with GitHub's
     real mark on its connector is driven into the rig's socket by the sprite —
     a body against a load, foreground, unmissable — and the instant it seats,
     the backlog behind it starts going down on its own. Cause and effect in one
     frame: you plug it in, it empties. One dominant object, one violent beat,
     and the drain is the CONSEQUENCE rather than the subject. */
  const P = PLACE.jules;
  const SEAT = 13;                                   // the plug lands
  /* the drive: he hauls it in, it SLAMS, everything recoils */
  const push = E(f, -8, SEAT, 0, 1, IN_Q);
  const kick = E(f, SEAT, SEAT + 3, 0, 1, IN_Q) - E(f, SEAT + 3, SEAT + 16, 0, 1, OUT);
  /* ⛔ LIN — the drain crosses the cut into S5 */
  const drained = E(f, SEAT, dur + 10, 0, 22, LIN);
  const left = Math.round(24 - drained);
  return (
    <Scene p={P} slug="" vig={0.28 - E(f, 0, dur, 0, 0.08, LIN)}>
      <Cam y={6} s={0.98} z={12}>
        <BayRoom f={f} p={P} z={2} num="07" floorY={560} />
        <Runner y={64} f={f} z={16} rate={22.5} pitch={272} w={216} h={86} c="#7ACAC4" c2="#0A1418" kind="cell" />

        {/* ── THE BACKLOG, behind, going down on its own once it is connected ── */}
        <div style={{ position: "absolute", left: 0, top: 0, zIndex: 30 }}>
          <PRRack x={648} y={-30} w={252} n={24} cols={1} rowH={32}
            left={left} f={f} z={30} />
        </div>
        {/* what it has already cleared, stacking at the foot of it */}
        {Array.from({ length: Math.min(7, Math.round(drained / 3)) }, (_, j) => (
          <PRCard key={"dn" + j} f={f} i={j + 40} state="merged" w={186}
            x={652 + (j % 2) * 96} y={640 - Math.floor(j / 2) * 24} z={32 + j}
            rot={(rnd(j, 6) - 0.5) * 10} />
        ))}

        {/* ── THE SOCKET on the rig, and the port lamp that goes green ── */}
        <div style={{ position: "absolute", left: 388, top: 372 + kick * 7, width: 128, height: 168,
          zIndex: 44, borderRadius: 10, boxShadow: SH_D,
          background: `linear-gradient(160deg, ${mxh(SLATE, 0.20)} 0%, ${dkh(SLATE, 0.54)} 100%)` }} />
        {[0, 1, 2, 3].map(i => (
          <div key={"pin" + i} style={{ position: "absolute", left: 412 + (i % 2) * 46,
            top: 400 + Math.floor(i / 2) * 66 + kick * 7, width: 30, height: 44, zIndex: 45,
            borderRadius: 4, background: dkh(SLATE, 0.70) }} />
        ))}
        <div style={{ position: "absolute", left: 424, top: 560 + kick * 7, width: 54, height: 20,
          borderRadius: 10, zIndex: 46,
          background: f >= SEAT ? GREEN : dkh(GREEN, 0.72) }} />

        {/* ⭐⭐ THE CONNECTOR — 12 drawn parts, GitHub's real mark on its face,
             driven in from the left. This is the shot. */}
        <div style={{ position: "absolute", left: -292 + push * 630, top: 356 - kick * 12,
          width: 396, height: 200, zIndex: 60,
          transform: `rotate(${(1 - push) * -5 + kick * 3}deg)` }}>
          {/* the flex, sagging behind it */}
          <svg width={300} height={230} style={{ position: "absolute", left: -262, top: 40, overflow: "visible" }}>
            <path d="M 0 40 C 90 40, 130 120, 268 74" stroke={dkh(SLATE, 0.30)} strokeWidth={34}
              fill="none" strokeLinecap="round" />
            <path d="M 0 40 C 90 40, 130 120, 268 74" stroke={mxh(SLATE, 0.10)} strokeWidth={12}
              fill="none" strokeLinecap="round" opacity={0.5} />
          </svg>
          {/* the body of the plug */}
          <div style={{ position: "absolute", left: 0, top: 26, width: 250, height: 148,
            borderRadius: 12, boxShadow: SH_D,
            background: `linear-gradient(160deg, #C9CFD8 0%, #7E868F 54%, #4A525C 100%)`,
            border: "7px solid #1A1F26" }} />
          {/* its grip ribs */}
          {[0, 1, 2].map(i => (
            <div key={"gr" + i} style={{ position: "absolute", left: 24 + i * 26, top: 44,
              width: 13, height: 112, borderRadius: 5, background: hexa("#0E1116", 0.26) }} />
          ))}
          {/* the four pins that go into the socket */}
          {[0, 1, 2, 3].map(i => (
            <div key={"pp" + i} style={{ position: "absolute", left: 248,
              top: 52 + (i % 2) * 66 + Math.floor(i / 2) * 0, width: 44, height: 40,
              borderRadius: 4, background: "#C8AE62", border: "4px solid #8A7434" }} />
          ))}
          {/* GitHub's real mark on the connector face */}
          <MarkTile x={112} y={62} s={78} src={R.feeds.github} z={64} f={f} at={-30} seed={5} />
        </div>

        {/* the seat costs something */}
        {f >= SEAT && (<>
          <Ring x={470} y={452} f={f} at={SEAT} c={JBLUE} s={1.5} z={70} dur={18} />
          <Puff x={470} y={452} f={f} at={SEAT} n={9} s={1.3} c="#9CD8D0" z={69} />
        </>)}

        {/* ⭐ THE RECEIPT, IN GOOGLE'S OWN UI. The same re-captured walkthrough
            supplies the END of the sentence: a real diff on a real dependency
            (`"next": "10.2.3"` out, `"15.4.5"` in) under a PUBLISH BRANCH button
            carrying GitHub's mark. The plug seats, and forty frames later the
            branch it opened is on screen. That is "clears your backlog" shown
            rather than claimed, and it is the product's page, not my drawing. */}
        {f >= SEAT + 26 && (
          <div style={{ position: "absolute", inset: 0, zIndex: 60,
            transform: `translateX(${(1 - E(f, SEAT + 26, SEAT + 40, 0, 1, OUT)) * 620}px)` }}>
            <Shot x={508} y={352} w={860} f={f} at={SEAT + 26} ratio={0.712} chrome="bare"
              src="broll/shots/jules_ship.png" z={60} />
          </div>
        )}

        {/* ⭐ HE DRIVES IT IN — foreground, nothing over him */}
        <GHero f={f} x={196} y={834} size={300} z={72} costume={{ constr: 1 }}
          strain={0.52 * (1 - push) + 0.2}
          drive={push * 0.34 - kick * 0.30} reach={104} act={1} ph={0.6} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · 12.27 to 15.67s (102f) · MED-CLOSE  ·  BAY 07
   VO: "fixing bugs, writing tests, updating dependencies, all in the background."
   ⭐ THREE DIFFERENT MECHANISMS, one per spoken phrase, staggered across the
   FULL duration — never one animation played three times. And behind all three
   the window runs NIGHT -> DAWN, which is what "all in the background" means.
   ======================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REPLACED. Alex: *"at 14 seconds too much of that guy is covered —
     replace that animation concept completely."* Both halves were true. The
     three stations were laid ACROSS the frame at floor level with the sprite
     standing behind them, so a conveyor rail cut him off at the chest — and the
     concept was three gadgets in a room rather than one readable idea.

     ⭐ THE NEW CONCEPT: THE NIGHT SHIFT DELIVERS. He is ASLEEP in the near
     corner, large and completely unobstructed — nothing is ever drawn in front
     of him. The rig behind THROWS one finished thing out per spoken phrase, and
     each lands in a heap beside him while he does not move:
         "fixing bugs"            -> a dead BUG, legs up, tossed out
         "writing tests"          -> a fan of green TICK tokens
         "updating dependencies"  -> two COGS, the old one out, a new one in
     "all in the background" is the sky behind going night -> dawn across the
     whole shot. The joke is that he sleeps through every one of them, and you
     can only read that if you can SEE him. */
  const P = PLACE.jules;
  const dawn = E(f, 4, dur + 10, 0, 1, LIN);
  /* ⛔ f1-6 measured 4.20, then 4.53 after moving the bug earlier — because the
     bug is DARK BROWN and this room is dark, so it repaints pixels without a
     luma delta and scores nothing (`feedback_a_prop_that_renders_is_not_visible`
     — motion is repaint x LUMA DELTA). The GREEN TICKS are the bright object in
     this scene, and `feedback_relight_depends_on_the_mover` says a bright mover
     wants exactly this dark ground. They go first. */
  const TICKS = -6, BUG = 26, COGS = 48;
  return (
    <Scene p={P} slug="" vig={0.30 - E(f, 0, dur, 0, 0.12, LIN)}>
      <Cam y={-6} s={1.04} z={12}>
        <BayRoom f={f} p={P} z={2} num="07" floorY={556} />
        {/* ⭐ THE SKY IS THE SECOND SUBJECT — "all in the background" is the only
            slow move in a shot where everything else is thrown. */}
        {/* ⭐ Alex: the 13s scene is *"horrible."* Measured, it was the sparsest in
            the reel: a dark room, a small window, and three little objects thrown
            low across it. Two causes, both fixed here — the LIGHT SOURCE was a
            detail rather than the room's light, and every delivered object was
            drawn at a quarter the size of the thing it represents. */}
        <NightWindow x={318} y={54} w={700} h={440} dawn={dawn} z={12} />
        {/* the light the window throws into the room, growing as dawn comes up */}
        <div style={{ position: "absolute", left: 250, top: 470, width: 840, height: 330, zIndex: 13,
          opacity: 0.30 + dawn * 0.42,
          background: `linear-gradient(196deg, ${hexa("#FFD9A0", 0.85)} 0%, ${hexa("#FFD9A0", 0)} 100%)` }} />
        <Runner y={40} f={f} z={16} rate={21.9} pitch={272} w={216} h={74} c="#7ACAC4" c2="#0A1418" kind="cell" />

        {/* the rig that is doing it, mid-ground, small — it is not the subject */}
        <JulesRig x={628} y={300} s={1.02} f={f} boot={1}
          reach={Math.sin(f / 4.2) * 0.5 + 0.5} z={30} />

        {/* ── 1 · THE BUG, thrown out dead. A real beetle: body, head, six legs,
             two antennae — and it lands legs-up, which is the whole joke. ── */}
        {f >= BUG && (() => {
          const k = E(f, BUG, BUG + 22, 0, 1, OUT);
          const bx = 1090 - k * 470, by = 250 + k * 192 - Math.sin(k * Math.PI) * 170;
          return (
            <div style={{ position: "absolute", left: bx, top: by, width: 190, height: 126,
              zIndex: 56, transform: `rotate(${k * 220}deg)` }}>
              <div style={{ position: "absolute", left: 26, top: 19, width: 126, height: 87,
                borderRadius: "50%", background: "#3A2A1E" }} />
              <div style={{ position: "absolute", left: 126, top: 32, width: 61, height: 61,
                borderRadius: "50%", background: "#241810" }} />
              {[0, 1, 2].map(j => (<React.Fragment key={"lg" + j}>
                <div style={{ position: "absolute", left: 42 + j * 39, top: 3, width: 13, height: 39,
                  borderRadius: 4, background: "#241810", transform: `rotate(${-26 + j * 9}deg)` }} />
                <div style={{ position: "absolute", left: 42 + j * 39, top: 90, width: 13, height: 39,
                  borderRadius: 4, background: "#241810", transform: `rotate(${26 - j * 9}deg)` }} />
              </React.Fragment>))}
              <div style={{ position: "absolute", left: 174, top: 16, width: 11, height: 42,
                borderRadius: 4, background: "#241810", transform: "rotate(30deg)" }} />
              <div style={{ position: "absolute", left: 180, top: 64, width: 11, height: 42,
                borderRadius: 4, background: "#241810", transform: "rotate(-16deg)" }} />
            </div>
          );
        })()}

        {/* ── 2 · THE TICKS, a fan of tokens thrown out one after another ── */}
        {Array.from({ length: 7 }, (_, i) => {
          const at = TICKS + i * 3.2;
          if (f < at) return null;
          const k = E(f, at, at + 20, 0, 1, OUT);
          return (
            <div key={"tk" + i} style={{ position: "absolute",
              left: 1110 - k * (1110 - (546 + (i % 4) * 114)), top: 200 + k * (380 + Math.floor(i / 4) * 100) - Math.sin(k * Math.PI) * (180 + i * 12),
              width: 96, height: 96, borderRadius: "50%", zIndex: 57,
              background: GREEN, border: `6px solid ${mxh(GREEN, 0.26)}`,
              transform: `rotate(${k * 190 * (i % 2 ? 1 : -1)}deg)`,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" width={54} height={54}>
                <path d="M5 13 L10 18 L19 6" stroke="#EAF7F0" strokeWidth="4"
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          );
        })}

        {/* ── 3 · THE COGS — the old one out, the new one in, both real cogs ── */}
        {[0, 1].map(i => {
          const at = COGS + i * 9;
          if (f < at) return null;
          const k = E(f, at, at + 22, 0, 1, OUT);
          const old = i === 0;
          const c = old ? OXIDE : GREEN;
          return (
            <div key={"cg" + i} style={{ position: "absolute",
              left: 1120 - k * (1120 - (530 + i * 156)), top: 180 + k * 92 - Math.sin(k * Math.PI) * 190,
              width: 156, height: 156, borderRadius: "50%", zIndex: 58,
              background: `linear-gradient(150deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.34)} 100%)`,
              border: `9px solid ${dkh(c, 0.42)}`,
              transform: `rotate(${k * 230 * (old ? -1 : 1)}deg)` }}>
              {Array.from({ length: 6 }, (_, q) => (
                <div key={"t" + q} style={{ position: "absolute", left: 58, top: -13, width: 20, height: 153,
                  borderRadius: 4, background: mxh(c, 0.12),
                  transform: `rotate(${q * 30}deg)`, transformOrigin: "50% 50%" }} />
              ))}
              <div style={{ position: "absolute", left: 45, top: 45, width: 46, height: 46,
                borderRadius: "50%", background: dkh(c, 0.5) }} />
            </div>
          );
        })}

        {/* ⭐⭐ HE IS ASLEEP IN THE NEAR CORNER AND NOTHING IS DRAWN IN FRONT OF
             HIM. Everything above is z<=58; he is z 80. */}
        <div style={{ position: "absolute", left: 46, top: 470, width: 300, height: 30, zIndex: 74,
          background: dkh(BRASS, 0.30), borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 62, top: 500, width: 30, height: 108, zIndex: 73,
          background: dkh(BRASS, 0.52) }} />
        <div style={{ position: "absolute", left: 300, top: 500, width: 30, height: 108, zIndex: 73,
          background: dkh(BRASS, 0.52) }} />
        <div style={{ position: "absolute", left: 92, top: 300, zIndex: 80,
          transform: `rotate(${-12 + Math.sin(f / 34) * 1.6}deg)`, transformOrigin: "42% 100%" }}>
          <GHero f={f} x={104} y={186} size={304} z={80} costume={{ constr: 1 }}
            act={3} ph={2.1} calm={0.18} />
        </div>
        {[0, 1, 2].map(i => {
          const t = ((f / 44) + i / 3) % 1;
          return (
            <div key={"z" + i} style={{ position: "absolute", left: 262 + t * 90, top: 330 - t * 170,
              zIndex: 82, fontFamily: MONO, fontWeight: 900, fontSize: 40 + t * 44,
              color: hexa("#DFF6EE", (1 - t) * 0.86), transform: `rotate(${t * 20}deg)` }}>z</div>
          );
        })}
      </Cam>
      <Chip t="RUNS WHILE YOU SLEEP" y={150} c={dkh(JBLUE, 0.66)} fg="#EAFFF8" s={0.96} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S6 · 15.67 to 18.70s (91f) · MED  ·  BAY 12 · OPAL
   VO: "Second, Google Opal, a drag and drop video editor for AI,"
   ⚠️⛔ NOTHING IN THIS BAY IS A VIDEO EDITOR. No timeline, no scrubber, no
   filmstrip, no clip, no play head. The VO misspeaks (see `R.opalMisspeak`);
   the picture draws the node canvas the REST of the sentence describes.
   ⭐ "drag and drop" is the literal ACTION, and §11 says an action is a
   DISTANCE — the carry crosses most of the panel width.
   ======================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ f1-6 = 1.65. The carry is ALREADY UNDER WAY on the cut frame — he
     picked it up during the shot before, which is how a cut normally works. */
  const grab = E(f, -10, 2, 0, 1, OUT);
  const carry = E(f, -8, 26, 0, 1, LIN);
  const drop = E(f, 26, 36, 0, 1, IN_Q);       // it FALLS the last third
  const land = f >= 36;
  const P = PLACE.opal;
  return (
    <Scene p={P} slug="" vig={0.30 + E(f, 0, dur, 0, 0.14, LIN)}>
      <Cam z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="12" floorY={540} />
        <Runner y={96} f={f} z={16} rate={22.6} pitch={280} w={222} h={100} c="#B98CE8" c2="#150A26" kind="cell" />
        {/* ⛔⛔ EVERY DRAWN NODE IN THIS SCENE IS GONE. Alex: *"at 17 seconds it's
            just rectangles, it doesn't represent stuff, so it's not interesting
            whatsoever."* He is right and it was the worst case in the reel: an
            outlined purple rectangle IS a container (§3) — it stands for "a
            node" and shows nothing about what Opal does. Google's own footage of
            the real workflow canvas shows the actual thing, so the footage is
            the hero here and the drawn layer is the CHARACTER working it. */}
        {/* ⛔ §23 · with every drawn node deleted the clip alone carries this shot,
            and a clip settles — the tail fell to 3.01. TWO punches: one on the
            beat, one right before the cut. A punch is a hard scale STEP, which
            is `feedback_real_product_footage`'s "cut INSIDE the clip on the
            beat" — the thing that took a held b-roll shot 3.23 -> 4.40. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 40,
          transform: `scale(${f >= dur - 13 ? 1.11 : 1})`, transformOrigin: "50% 46%" }}>
          <Broll x={492} y={368} w={946} f={f} at={2} src="broll/opal_nodes.mp4"
            label="OPAL · WORKFLOW" punch={40} z={40} bv={VARBV[v]} />
        </div>
        {/* and he reaches into it as the shot ends, so a BODY crosses the cut */}
        <GHero f={f} x={846} y={780} size={214} z={44} costume={{ glasses: 1 }}
          act={1} ph={1.6} flip
          drive={E(f, dur - 22, dur + 8, 0, 0.34, IN_Q)} reach={110} />
        {/* ⭐ the one he carries — a full-panel-width travel */}
        {/* ⛔ §23 · the clip's own action settles before the cut and the shot went
            with it (last8 3.11 against a body of 10.49). A SECOND node is
            carried in late and is still crossing frame on the cut frame. */}
        {/* ⭐⭐ "DRAG AND DROP" HAS TO BE A DRAG AND A DROP. Alex: *"at 17 seconds
            when it says drag and drop it should show something like that on the
            screen."* The line names a GESTURE and the shot had no hands in it —
            §3 exactly: draw the verb the sentence uses.
            ⭐ So a real CURSOR picks a real tile off the shelf, carries it the
            width of the frame with the tile tilted under the drag, and DROPS it
            onto Google's own canvas — where it lands with a squash and a ring.
            The cursor is drawn (arrow + shadow), the tile is a real Google mark,
            and the surface it lands on is the actual product. */}
        {(() => {
          const GRAB = 8, DROP = 44;
          const carry = E(f, GRAB, DROP, 0, 1, IO);
          const fall = E(f, DROP, DROP + 7, 0, 1, IN_Q);
          const held = f >= GRAB && f < DROP + 7;
          const lf = f - (DROP + 7);
          const land = lf >= 0 ? Math.sin(lf / 2.6) * Math.exp(-lf / 11) : 0;
          const cx = 168 + carry * 520, cy = 300 + carry * 96 + fall * 150;
          return (<>
            {/* the shelf it comes off */}
            <div style={{ position: "absolute", left: 96, top: 388, width: 190, height: 13,
              zIndex: 52, borderRadius: 4, background: dkh(OVIO, 0.52) }} />
            {/* the tile, tilted under the drag, squashing on the drop */}
            {(held || lf >= 0) && (
              <div style={{ position: "absolute", left: cx, top: cy + land * 7, zIndex: 66,
                transform: `rotate(${(1 - fall) * (6 - carry * 12) + land * 3}deg) scale(${1 + land * 0.10}, ${1 - land * 0.10})`,
                filter: held && fall < 1 ? "drop-shadow(0 18px 22px rgba(10,6,20,0.5))" : undefined }}>
                <MarkTile x={0} y={0} s={128} src={R.tools[1].mark} z={66}
                  f={f} at={DROP + 7} seed={4} />
              </div>
            )}
            {/* ⭐ THE CURSOR — an arrow with a real outline and its own shadow,
                pressed (smaller) while it is dragging */}
            {f >= GRAB - 8 && (
              <svg viewBox="0 0 24 24" width={fall >= 1 ? 62 : 54} height={fall >= 1 ? 62 : 54}
                style={{ position: "absolute", left: cx + 96, top: cy + 92, zIndex: 70,
                  filter: "drop-shadow(0 6px 8px rgba(10,6,20,0.55))" }}>
                <path d="M5 2 L5 20 L10 15.5 L13.2 22 L16.6 20.4 L13.4 14 L20 14 Z"
                  fill="#FFFFFF" stroke="#1C1030" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            )}
            {lf >= 0 && <Ring x={cx + 78} y={cy + 150} f={f} at={DROP + 7} c={OVIO} s={0.9} z={68} />}
          </>);
        })()}
        {/* ⛔ ALL SIX DRAWN NodeBlocks THAT USED TO BE HERE ARE DELETED — the
            rail of blanks, the one he carried, the four that landed. An outlined
            purple rectangle standing for "a node" is §3's container exactly, and
            six of them was what Alex saw as "just rectangles". What Opal does is
            in Google's own footage above; the drawn layer is now only the
            CHARACTER, working it. */}
        <GHero f={f} x={198} y={700} size={236} z={62} costume={{ glasses: 1 }} act={1} ph={0.9}
          drive={carry * 0.30} reach={120} gaze={0.4} />
        {/* ⭐ OFFICIAL: "Introducing Opal" (Google for Developers) */}
        {/* ⛔ last8 3.89 against a body of 18.37 — ratio 0.21, the worst tail in
            the reel. The drag landed at f51 and then the shot simply stopped for
            its last thirty frames. ⭐ A drop onto a node canvas HAS a
            consequence, and it is the thing Opal actually is: the tile wires
            itself into the graph and the workflow starts running. The cable
            draws, then signal pulses travel it continuously through the cut —
            §23, something is still moving when we leave. */}
        {f >= 54 && (() => {
          const draw = E(f, 54, 68, 0, 1, OUT);
          const X0 = 744, Y0 = 602, X1 = 388, Y1 = 706;
          return (<>
            {/* the elbow: across, then down — a real patch cable, not a diagonal */}
            <div style={{ position: "absolute", left: X1 + (1 - draw) * (X0 - X1), top: Y0,
              width: (X0 - X1) * draw, height: 11, zIndex: 72, borderRadius: 6,
              background: `linear-gradient(90deg, ${dkh(TEAL, 0.34)} 0%, ${TEAL} 100%)` }} />
            <div style={{ position: "absolute", left: X1, top: Y0,
              width: 11, height: (Y1 - Y0) * E(f, 66, 76, 0, 1, OUT), zIndex: 72,
              borderRadius: 6, background: dkh(TEAL, 0.20) }} />
            {/* the signal running down it — three pulses on their own clocks, and
                they never stop, so the cut lands on a moving frame */}
            {f >= 70 && [0, 1, 2, 3].map(i => {
              const t = ((f - 70) / 14 + i / 4) % 1;
              return (
                <div key={"pz" + i} style={{ position: "absolute",
                  left: X0 - t * (X0 - X1) - 22, top: Y0 - 14, width: 62, height: 40,
                  borderRadius: 20, zIndex: 74, background: "#DFFBF4",
                  opacity: 0.35 + Math.sin(t * Math.PI) * 0.65 }} />
              );
            })}
            {/* ⭐ AND THEN IT RUNS. A punch is a one-frame event, so moving it
                later did not lift a 8-frame window — what does is four LARGE
                bright cards launching out of the node across exactly those
                frames. The workflow you just wired produces things: that is the
                end of the sentence, and it is also the repaint area the tail
                needed. */}
            {f >= 72 && [0, 1, 2, 3].map(i => {
              const at = 72 + i * 3.4, k = E(f, at, at + 13, 0, 1, OUT);
              if (k <= 0.01) return null;
              const ang = -0.95 + i * 0.42;
              return (
                <div key={"out" + i} style={{ position: "absolute",
                  left: X1 - 44 + Math.cos(ang) * k * 300,
                  top: Y1 - 20 + Math.sin(ang) * k * 205 - Math.sin(k * Math.PI) * 54,
                  width: 196, height: 134, zIndex: 76, borderRadius: 9,
                  background: `linear-gradient(150deg, #FFFDF6 0%, #E4E9EE 100%)`,
                  border: `6px solid ${dkh(TEAL, 0.30)}`, boxShadow: SH_D,
                  transform: `rotate(${(1 - k) * -40 + i * 6}deg)` }}>
                  <div style={{ position: "absolute", left: 14, top: 14, right: 14, height: 58,
                    borderRadius: 5, background: hexa(TEAL, 0.42) }} />
                  <div style={{ position: "absolute", left: 14, top: 84, width: 118, height: 13,
                    borderRadius: 4, background: hexa("#3A4450", 0.44) }} />
                  <div style={{ position: "absolute", left: 14, top: 106, width: 74, height: 13,
                    borderRadius: 4, background: hexa("#3A4450", 0.28) }} />
                </div>
              );
            })}
            {/* and the node it feeds lights up and stays breathing */}
            {f >= 76 && (
              <div style={{ position: "absolute", left: X1 - 62, top: Y1, width: 146, height: 92,
                zIndex: 73, borderRadius: 12, border: `6px solid ${TEAL}`,
                background: hexa(TEAL, 0.20 + Math.sin(f / 5.2) * 0.16),
                transform: `scale(${E(f, 76, 84, 0, 1, BACK)})` }} />
            )}
          </>);
        })()}

        {/* ⛔ still 0.26 into the cut after the cable was added: the pulses are
            30px objects and motion is REPAINT AREA x luma delta, so small bright
            things score almost nothing. The largest repaintable surface in the
            shot is the footage itself, and `Broll` only carries one punch — so a
            SECOND hard scale step goes on a wrapper at f70, right where the shot
            was dying. ⛔ explicit zIndex: a transformed wrapper without one makes
            a new stacking context, which has hidden a whole cast twice already. */}
        <div style={{ position: "absolute", inset: 0, zIndex: 58,
          transform: `scale(${f >= 77 ? 1.13 : 1})`, transformOrigin: "58% 40%" }}>
          <Broll x={492} y={352} w={930} f={f} at={2} src="broll/opal_build.mp4"
            label="OPAL" punch={44} z={58} bv={VARBV[v]} />
        </div>
        <BaySlam f={f} at={6} mark={R.tools[1].mark} x={186} y={112} z={94} />
      </Cam>
      <Chip t="BAY 12 · OPAL" y={150} c={dkh(OVIO, 0.5)} fg="#F6ECFF" s={0.98} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S7 · 18.70 to 20.80s (63f) · TWO-SHOT WIDE  ·  BAY 12
   VO: "basically an AI native alternative to n8n."
   ⭐ A like-for-like bench comparison: the n8n rig's harness is lowered BY HAND
   (weight = DEFORMATION — the rope stretches, the harness sags and swings),
   the Opal canvas wires ITSELF across the same seconds.
   ⛔ NO verdict, NO score, NO tick/cross. The VO says *alternative*.
   ⛔ §24: the frame is SPLIT, so BOTH halves must move — the dead-half failure
   lives exactly here.
   ======================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔⛔ REPLACED. Alex: *"between 16 and 22 seconds those animations completely
     suck."* He was right and the reason is specific: I deleted the drawn
     NodeBlocks from S6 and left them standing in S7 and S8 — so the two scenes
     either side of the fixed one were still outlined purple rectangles standing
     for "a workflow". That is §3's container, twice.

     ⭐ THE LINE IS A COMPARISON — *"basically an AI native alternative to n8n"* —
     so the shot is a comparison, made of REAL THINGS: n8n's own mark on a bench
     with a physical CABLE TANGLE the sprite is threading BY HAND, against
     Google's own footage of Opal wiring itself. Nothing invented, nothing
     abstract, and the difference is something you can see rather than read.
     ⛔ NO VERDICT. The VO says *alternative*; the frame shows two ways to do
     one job and lets the viewer draw the line. */
  const P = PLACE.opal;
  /* the haul: a repeating heave, a body against a load */
  const heave = Math.max(0, Math.sin(f / 6.4));
  /* ⭐ "basically" f4 · "AI native" f18 · "alternative" f24 · ⭐ "N8N" f46,
     so the n8n mark arrives at 42 — the noun is the beat. */
  const N8N = 42;
  const threaded = E(f, 2, dur, 0, 1, LIN);
  return (
    <Scene p={P} slug="" vig={0.28 + E(f, 0, dur, 0, 0.10, LIN)}>
      <Cam y={10} s={0.96} z={12}>
        <BayRoom f={f} p={P} z={2} num="12" floorY={540} />
        <Runner y={86} f={f} z={16} rate={24.9} pitch={274} w={218} h={98} c="#B98CE8" c2="#150A26" kind="cell" />

        {/* ── LEFT: n8n, wired BY HAND. A real mark, a real bench, real cable. ── */}
        <div style={{ position: "absolute", left: 44, top: 470, width: 372, height: 132, zIndex: 34,
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.16)} 0%, ${dkh(STEEL, 0.46)} 100%)`,
          borderRadius: 8, boxShadow: SH_D }} />
        {[0, 1, 2, 3].map(i => (
          <div key={"port" + i} style={{ position: "absolute", left: 74 + i * 88, top: 442,
            width: 54, height: 34, zIndex: 36, borderRadius: 5,
            background: dkh(STEEL, 0.58), border: `4px solid ${dkh(STEEL, 0.7)}` }} />
        ))}
        {/* ⭐ THE TANGLE. ⛔ v1's curves ran from the ports straight UP and out of
            frame, so four cables rendered as four vertical sticks — not a snarl,
            just posts. A tangle only reads if the lines CROSS: each cable now
            arcs up and ACROSS to a different hook on the far side, with real sag
            and enough weight to see, so the left half is visibly a mess that a
            body has to sort out by hand. */}
        <svg style={{ position: "absolute", left: 0, top: 0, width: W, height: H, zIndex: 44,
          pointerEvents: "none", overflow: "visible" }}>
          {[0, 1, 2, 3].map(i => {
            const done = threaded * 4 > i + 0.5;
            const x1 = 100 + i * 88, y1 = 444;
            /* every cable lands on a DIFFERENT hook, so they cross each other */
            const hook = [3, 0, 2, 1][i];
            const hx = 86 + hook * 92, hy = 232;
            const sag = (done ? 96 : 168) + Math.sin(f / 8 + i * 1.7) * (done ? 8 : 26);
            const grab = done ? 0 : heave * 34;
            return (
              <path key={"cb" + i}
                d={`M ${x1} ${y1} C ${x1 - 40} ${y1 - sag}, ${hx + 60 + grab} ${hy + sag}, ${hx} ${hy}`}
                stroke={[COPPER, "#B07A52", "#8E5E3C", "#C08A5E"][i]} strokeWidth={17}
                fill="none" strokeLinecap="round" opacity={done ? 1 : 0.94} />
            );
          })}
        </svg>
        {/* the hooks they have to be threaded onto — a real rail, not a void */}
        <div style={{ position: "absolute", left: 62, top: 214, width: 400, height: 15, zIndex: 42,
          borderRadius: 4, background: dkh(STEEL, 0.34) }} />
        {[0, 1, 2, 3].map(i => (
          <div key={"hk" + i} style={{ position: "absolute", left: 78 + i * 92, top: 226,
            width: 17, height: 34, zIndex: 43, borderRadius: "0 0 9px 9px",
            background: dkh(STEEL, 0.5) }} />
        ))}
        <MarkTile x={62} y={620} s={78} src={R.feeds.n8n} z={88} f={f} at={N8N} seed={2} />

        {/* ── RIGHT: Opal, wiring ITSELF. Google's own footage, not a drawing. ── */}
        <Broll x={500} y={370} w={926} f={f} at={0} src="broll/opal_nodes.mp4"
          label="OPAL" punch={34} z={50} bv={VARBV[v]} />

        {/* ⭐ HE IS THREADING THE LEFT ONE, IN FRONT OF EVERYTHING, UNOBSTRUCTED */}
        <GHero f={f} x={838} y={812} size={236} z={62} costume={{ glasses: 1 }}
          strain={0.30 + heave * 0.44} drive={-heave * 0.22} reach={96}
          act={1} ph={1.4} flip />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · 20.80 to 22.73s (58f) · CLOSE  ·  BAY 12
   VO: "Describe a workflow in plain English and it turns that into"
   ⭐ ONE large high-contrast object crossing the FULL frame and converting as
   it passes the intake lip. §11: an action is a DISTANCE.
   ⛔ LIN — it crosses the cut into S9.
   ======================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔⛔ REPLACED. The strip itself was the good part — a real ribbon of ordinary
     handwriting crossing the whole frame is a DEPICTION of "describe a workflow
     in plain English". What was wrong is what it converted INTO: drawn node
     rectangles on a drawn canvas, i.e. an invented picture of a thing Google
     will happily show you.

     ⭐ The sentence now feeds into GOOGLE'S OWN CANVAS: the ribbon runs off the
     left of frame INTO the real Opal footage, and the workflow that appears
     there is the actual product building the actual graph. Words in one side,
     the real thing out the other, and nothing between them is invented. */
  const P = PLACE.opal;
  /* ⭐ "Describe" f4 · "workflow" f15 · "plain English" f28 · ⭐ "TURNS" f50,
     which is the verb of the whole scene — the conversion lands at 46. */
  const TURNS = 46;
  const k = E(f, -14, dur + 8, 0, 1, LIN);
  return (
    <Scene p={P} slug="" vig={0.26 + E(f, 0, dur, 0, 0.10, LIN)}>
      <Cam y={-8} s={1.06} z={12}>
        <BayRoom f={f} p={P} z={2} num="12" floorY={560} />
        <Runner y={82} f={f} z={16} rate={25.4} pitch={276} w={218} h={98} c="#B98CE8" c2="#150A26" kind="cell" />

        {/* ⭐ THE REAL CANVAS, receiving it */}
        <Broll x={496} y={372} w={932} f={f} at={0} src="broll/opal_nodes.mp4"
          label="OPAL · WORKFLOW" punch={30} z={40} bv={VARBV[v]} />

        {/* the intake the ribbon disappears into — a real slot with a lit lip */}
        <div style={{ position: "absolute", left: 300, top: 300, width: 54, height: 200, zIndex: 58,
          borderRadius: 6, background: `linear-gradient(90deg, ${dkh(OVIO, 0.62)} 0%, ${dkh(OVIO, 0.30)} 100%)` }} />
        <div style={{ position: "absolute", left: 296, top: 296, width: 10, height: 208, zIndex: 60,
          background: `linear-gradient(180deg, ${hexa(OVIO, 0.3)} 0%, ${hexa("#F0DCFF", 0.98)} 50%, ${hexa(OVIO, 0.3)} 100%)` }} />

        {/* ⭐ THE SENTENCE, in ordinary handwriting, feeding in from the right */}
        <div style={{ position: "absolute", left: 1080 - k * 900, top: 372, height: 78, zIndex: 62,
          display: "flex", alignItems: "center", paddingLeft: 26, paddingRight: 26,
          background: "#F6F2E6", borderRadius: 5, boxShadow: SH_D,
          borderTop: "4px solid #D8D0BC", borderBottom: "4px solid #C6BEA8" }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 25, color: "#2A2419",
            whiteSpace: "nowrap" }}>when a form comes in, sort it, then email me</span>
        </div>
        {/* the feed rollers that pull it in — a real mechanism, turning */}
        {[0, 1].map(i => (
          <div key={"rl" + i} style={{ position: "absolute", left: 366, top: 288 + i * 176,
            width: 66, height: 66, borderRadius: "50%", zIndex: 64,
            background: `linear-gradient(140deg, ${mxh(OVIO, 0.26)} 0%, ${dkh(OVIO, 0.42)} 100%)`,
            border: `6px solid ${dkh(OVIO, 0.54)}`,
            transform: `rotate(${f * (i ? -9 : 9)}deg)` }}>
            <div style={{ position: "absolute", left: 28, top: 5, width: 6, height: 56,
              background: dkh(OVIO, 0.6) }} />
          </div>
        ))}

        {/* he feeds it in — clear of the footage, in the near corner */}
        <GHero f={f} x={150} y={812} size={246} z={66} costume={{ glasses: 1 }}
          act={1} ph={0.2} drive={0.14 + Math.sin(f / 7) * 0.10} reach={80} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · 22.73 to 24.93s (66f) · MED  ·  BAY 12 — PAYOFF
   VO: "a working mini app, no coding required."
   ⭐ OVERLAPPING ACTION (§13), not a stepped quantise: cables lead, nodes
   follow, each rings out. The app BOOTS and RUNS. The code rack FOLDS AWAY —
   a large bright mass LEAVING is the depiction of "no coding required".
   ======================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* the biggest object in the shot is the code rack, and it should be LEAVING
     on the frame we cut to — "no coding required" starts immediately. */
  /* ⭐ "working" f9 · ⭐ "MINI APP" f20 -> f16 · ⭐ "NO CODING" f35 -> f31.
     The app has to EXIST on its own noun, and the "no coding" beat is the one
     the whole scene is a payoff for. */
  const APP = 16, NOCODE = 31;   // ⭐ the app exists on its noun, then the claim
  const fold = E(f, 0, APP + 6, 0, 1, IN_Q);
  const P = PLACE.opal;
  const NODES: [number, number][] = [[70, 636], [286, 700], [530, 654], [790, 706]];
  return (
    <Scene p={P} slug="" vig={0.28 - E(f, 0, dur, 0, 0.08, LIN)}>
      <Cam s={1.04} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="12" floorY={540} />
        <Runner y={88} f={f} z={16} rate={23.2} pitch={272} w={216} h={96} c="#B98CE8" c2="#150A26" kind="cell" />
        <NodeCanvas x={54} y={306} w={420} h={400} f={f} lit={1} z={20} />
        {NODES.map((n, i) => {
          /* ⭐ the node RINGS OUT after its cable lands — the pendulum is what
             pays for the smoothing (§13) */
          const at = -6 + i * 7;
          const lf = f - at - 10;
          const ring = lf > 0 ? Math.sin(lf * 0.62) * Math.exp(-lf / 7) * 5 : 0;
          return (
            <div key={"nn" + i} style={{ position: "absolute", left: 0, top: ring, zIndex: 54 }}>
              <NodeBlock x={n[0]} y={n[1]} w={104} h={62} lit={E(f, at + 8, at + 14, 0, 1, OUT)} z={54} />
            </div>
          );
        })}
        {NODES.slice(1).map((n, i) => (
          <Cable key={"c9" + i} x1={NODES[i][0] + 104} y1={NODES[i][1] + 31}
            x2={n[0]} y2={n[1] + 31} k={E(f, -6 + i * 7, 4 + i * 7, 0, 1, LIN)} c={OVIO} z={52} />
        ))}
        {/* ⭐ the code rack FOLDS AWAY and drops out of frame */}
        {fold < 0.99 && (
          <div style={{ position: "absolute", left: 726, top: 596 + fold * 420, width: 268, height: 250,
            zIndex: 44, transform: `rotate(${fold * 42}deg) scaleY(${1 - fold * 0.5})`,
            transformOrigin: "50% 0%", opacity: 1 - fold * 0.5 }}>
            <div style={{ position: "absolute", inset: 0, background: "#12161E", borderRadius: 6,
              border: `3px solid ${dkh(STEEL, 0.5)}` }} />
            {Array.from({ length: 11 }, (_, i) => (
              <div key={"cd" + i} style={{ position: "absolute", left: 18, top: 20 + i * 26,
                width: 240 * (0.4 + rnd(i, 2) * 0.6), height: 8, borderRadius: 3,
                background: [OVIO, "#6A7A92", GREEN, "#8A7A5E"][i % 4] }} />
            ))}
          </div>
        )}
        {/* ⭐ the app BOOTS and RUNS — real content arriving one row at a time */}
        {/* ⭐⭐ GOOGLE'S OWN FOOTAGE OF THE OPAL WORKFLOW CANVAS. The VO calls
            Opal a "video editor"; this is the product, from Google's launch
            video, showing the node graph. The strongest correction available is
            Google showing you the thing itself. */}
        <Broll x={492} y={370} w={946} f={f} at={8} src="broll/opal_nodes.mp4"
          label="OPAL · WORKFLOW" punch={38} z={70} bv={VARBV[v]} />
        <Ring x={726} y={604} f={f} at={33} c={OVIO} s={1.0} z={76} />
        {/* ⛔ §23 · the app booted at f41 of 66 and the scene died into the cut
            (0.65). The finished app now LEAVES for the tray, accelerating, and
            is still in the air when the picture changes. */}
        {f > dur - 30 && (
          <div style={{ position: "absolute",
            left: 556 - E(f, dur - 30, dur + 12, 0, 430, IN_Q),
            top: 300 + E(f, dur - 30, dur + 12, 0, 540, IN_Q),
            width: 340, height: 264, zIndex: 74,
            transform: `rotate(${E(f, dur - 22, dur + 6, 0, -34, IN_Q)}deg)`,
            background: "#FAF8F3", borderRadius: 10, boxShadow: SH_D }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 34, background: "#E8E2D6" }} />
            {[0, 1, 2, 3].map(i => (
              <div key={"lr" + i} style={{ position: "absolute", left: 18, top: 54 + i * 30,
                width: 300, height: 20, borderRadius: 4, background: i % 2 ? "#EFEADD" : "#E6E0D0" }} />
            ))}
          </div>
        )}
        <GHero f={f} x={846} y={760} size={232} z={62} costume={{ glasses: 1 }} act={3} ph={1.8}
          gaze={-0.3} cheer={f > 52 ? 0.5 : 0} />
        {/* ⭐ TRAY 2 FULL */}
        <OutTray x={230} y={758} w={250} f={f} fill={E(f, 46, dur, 0, 1, LIN)} kind="app"
          hit={46} z={66} />
      </Cam>
      <Chip t="NO CODE WRITTEN" y={150} c={dkh(OVIO, 0.5)} fg="#F6ECFF" s={0.96} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S10 · 24.93 to 27.87s (88f) · WIDE  ·  BAY 04 · MIXBOARD
   VO: "Third, Mixboard, it's an AI whiteboard from Google Labs."
   ⛔ NO INVENTED MARK. Mixboard ships the GENERIC Google Labs beaker, not a
   product icon, so it gets a real NAME plate. The beaker appears as GOOGLE
   LABS' own mark — which is what the VO actually says — never as Mixboard's.
   ⭐ EVENT: the board ARRIVES as a physical object, swinging down on chains,
   overshooting and locking. The largest single object in the reel so far.
   ======================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ 0.62 at the open — the board hung out of frame for ten frames. It is
     already falling when we cut to it. */
  const drop = E(f, -12, 34, 0, 1, OUT);
  const P = PLACE.mixb;
  return (
    <Scene p={P} slug="" vig={0.28 + E(f, 0, dur, 0, 0.14, LIN)}>
      <Cam y={+10} s={0.94} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="04" floorY={560} />
        {/* the studio: a truss overhead and two lamps, so the light has a source */}
        <div style={{ position: "absolute", left: -20, top: 74, width: W + 40, height: 20, zIndex: 14,
          background: dkh(BRASS, 0.5) }} />
        {[220, 780].map((x, i) => (<React.Fragment key={"lp" + i}>
          <div style={{ position: "absolute", left: x - 32, top: 92, width: 64, height: 34, zIndex: 16,
            background: "#2E2418", borderRadius: "6px 6px 20px 20px" }} />
          <div style={{ position: "absolute", left: x - 76, top: 124, width: 152, height: 260, zIndex: 8,
            opacity: 0.38, clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
            background: `linear-gradient(180deg, ${hexa(MAMBER, 0.6)} 0%, ${hexa(MAMBER, 0)} 100%)` }} />
        </React.Fragment>))}
        <Runner y={620} f={f} z={12} rate={6.4} pitch={230} w={150} h={54} c="#8A6A34" c2="#2A1C0A" kind="crate" />
        <WhiteBoard x={148} y={286} w={716} h={392} drop={drop} f={f} z={26} />
        {/* ⭐ the studio keeps working behind it: a lamp bar tracking across the
            truss, which is the room's own background process (§5). */}
        <div style={{ position: "absolute", left: ((f * 24.0) % (W + 440)) - 220, top: 92,
          width: 420, height: 86, zIndex: 20,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.30)} 0%, ${dkh(BRASS, 0.34)} 100%)`,
          borderRadius: 6 }} />
        {drop >= 1 && (<>
          <Puff x={506} y={678} f={f} at={34} n={9} s={1.3} c="#D8C09A" z={72} />
          <Ring x={506} y={678} f={f} at={34} c={MAMBER} s={1.2} z={74} />
        </>)}
        {/* ⭐ THE BACK HALF. The board landed at f46 of 88 and the scene held for
            the other 42 — §9: arrivals spread across the FULL duration. The
            first scraps start arriving the moment it settles, which also hands
            S11 a board that is already in use rather than a blank one. */}
        {[[92, 620, 0, -7], [286, 648, 2, 5], [498, 636, 1, -4], [700, 654, 3, 6],
          [858, 616, 0, -5], [180, 700, 2, 4], [618, 706, 1, -6]].map((q, i) => (
          <PinCard key={"pre" + i} x={q[0]} y={q[1]} f={f} at={30 + i * 7} kind={q[2]}
            s={1.86} rot={q[3]} z={58 + i} real={MB_REAL[(i + 3) % MB_REAL.length]} />
        ))}
        {/* ⛔ §23 · a card in flight, thrown late and still accelerating at the cut */}
        {[0, 1].map(j => (f <= dur - 30 + j * 14 ? null : (
          <div key={"lt" + j} style={{ position: "absolute",
            left: (j ? -220 : 960) + E(f, dur - 30 + j * 14, dur + 14, 0, j ? 700 : -760, IN_Q),
            top: 800 - E(f, dur - 30 + j * 14, dur + 14, 0, 470, IN_Q),
            width: 248, height: 198, zIndex: 76, background: "#F2EADA", borderRadius: 4,
            boxShadow: SH, transform: `rotate(${E(f, dur - 30 + j * 14, dur + 14, 0, j ? -300 : 340, IN_Q)}deg)`,
            overflow: "hidden" }}>
            <Img src={staticFile(MB_REAL[6 + j])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )))}
        <GHero f={f} x={852} y={780} size={228} z={62} costume={{ prof: 1 }} act={0} ph={0.7}
          gaze={-0.6} shock={drop > 0.85 && drop < 1 ? 0.5 : 0} flip />
        {/* ⛔ THE NAME, because Google publishes no mark for it. And the LABS
            beaker beside it, as Labs' own mark — that distinction is the point. */}
        {/* ⭐ OFFICIAL: "Introducing Mixboard | Google Labs" */}
        <Broll x={492} y={372} w={936} f={f} at={38} src="broll/mixboard_gen.mp4"
          label="MIXBOARD" punch={64} z={64} bv={VARBV[v]} />
        {/* ⛔ THE OFFICIAL LOCKUP IS THE LABS BEAKER + THE WORDMARK. Mixboard
            publishes no product icon of its own — `mixboard_favicon_32x32.png`
            rasterises to the GENERIC Labs beaker, checked by eye this build and
            by reel 116 before it. This pairing is how Google's header does it. */}
        {/* ⭐ "Third" f4 · ⭐ "MIXBOARD" f13 -> the name lands at 9 */}
        <BaySlam f={f} at={9} mark={null} name="MIXBOARD" x={150} y={146} big={300} small={82} z={94} />
        <MarkTile x={392} y={148} s={78} src={R.feeds.labs} z={88} />
      </Cam>
      <Chip t="BAY 04 · GOOGLE LABS" y={150} c={dkh(MAMBER, 0.62)} fg="#FFF4DC" s={0.94} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S11 · 27.87 to 30.57s (81f) · MED  ·  BAY 04
   VO: "You drop different images and text onto the canvas and generate images"
   ⭐ MANY LARGE OBJECTS ARRIVING CONTINUOUSLY across the full duration — §9's
   only shape that measures above bar. ⛔ "different" is drawn as GENUINELY
   different: a photograph, a torn note, a swatch strip, a sketch — never eight
   copies of one card.
   ======================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const P = PLACE.mixb;
  /* ⛔ §24 · L/R was 0.31. Landing sites now straddle the panel. */
  const PINS = [
    [128, 300, 0, -6], [330, 262, 1, 4], [524, 296, 2, -3], [702, 258, 3, 5],
    [178, 434, 1, 3], [430, 452, 0, -5], [668, 424, 2, 6],
  ] as const;
  return (
    <Scene p={P} slug="" vig={0.28 + E(f, 0, dur, 0, 0.12, LIN)}>
      <Cam x={10} y={-20} s={1.16} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="04" floorY={560} />
        <Runner y={640} f={f} z={12} rate={5.8} pitch={230} w={150} h={54} c="#8A6A34" c2="#2A1C0A" kind="crate" />
        <WhiteBoard x={128} y={216} w={760} h={430} drop={1} f={f} z={26} />
        <Broll x={492} y={366} w={940} f={f} at={26} src="broll/mixboard_board.mp4"
          label="MIXBOARD · LIVE" punch={54} z={40} bv={VARBV[v]} />
        {/* ⛔ arrivals spread across the FULL duration, never the first third */}
        {PINS.map((p, i) => (
          <PinCard key={"pc" + i} x={p[0]} y={p[1]} f={f} at={-16 + i * 7} kind={p[2]}
            s={1.72} rot={p[3]} z={56 + i} real={MB_REAL[i % MB_REAL.length]} />
        ))}
        {/* the throw: a card in flight before each one pins */}
        {PINS.map((p, i) => {
          const at = -16 + i * 7, lf = f - at;
          if (lf < -18 || lf >= 0) return null;
          const k = (lf + 18) / 18;
          return (
            <div key={"th" + i} style={{ position: "absolute",
              /* ⛔ alternate the side each card is thrown from, or the whole left
                 half of the shot never moves (§24). */
              left: (i % 2 ? 940 : -180) + k * (p[0] - (i % 2 ? 940 : -180)),
              top: 740 - Math.sin(k * Math.PI) * 250 - k * (740 - p[1]), width: 206, height: 165,
              zIndex: 70, background: "#F2EADA", borderRadius: 3, boxShadow: SH,
              transform: `rotate(${k * 240}deg)` }} />
          );
        })}
        {/* ⭐ and then it GENERATES */}
        {/* ⭐ "drop" f9 · "images" f16 · "canvas" f46 · ⭐ "GENERATE" f59 -> f55 */}
          <GenFrame x={392} y={472} w={230} h={172} f={f} at={55} variant={0} resolve={1} z={62}
          real={MB_REAL[4]} />
        {/* ⛔ §23 · two more scraps thrown into the last third, the second one
            still crossing frame when the cut lands (0.42 -> arriving). */}
        {[0, 1].map(i => {
          const at = dur - 26 + i * 13;
          if (f < at) return null;
          const k = E(f, at, at + 22, 0, 1, IN_Q);
          return (
            <div key={"lt" + i} style={{ position: "absolute",
              left: 900 - k * (900 - (300 + i * 260)), top: 780 - Math.sin(k * Math.PI) * 250 - k * 300,
              width: 208, height: 166, zIndex: 74, background: i ? "#EFE8D6" : "#F6F2E6",
              borderRadius: 4, boxShadow: SH, transform: `rotate(${k * 280}deg)` }} />
          );
        })}
        <GHero f={f} x={856} y={786} size={232} z={64} costume={{ prof: 1 }} act={1} ph={0.3}
          drive={Math.sin(f / 8) * 0.3} reach={90} flip />
        <MarkTile x={128} y={150} s={70} src={null} name="MIXBOARD" z={88} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · 30.57 to 33.87s (99f) · CLOSE  ·  BAY 04 — PAYOFF
   VO: "until you get exactly what you wanted. Great for visual thinking."
   ⭐⭐ THE ESCALATING JOKE, and it is what "until" means. Three near-misses are
   torn off, each FASTER than the last, and the reject pile on the floor is the
   receipt of how many it took — information the VO does not carry, which is
   exactly what §3 asks a picture to ADD. The fourth LOCKS.
   ======================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⭐ ESCALATION IS IN THE RATE: 22f, then 18f, then 14f, then the keeper. */
  const TRIES = [{ at: 2, tear: 22 }, { at: 26, tear: 18 }, { at: 46, tear: 14 }];
  const KEEP = 62;
  const P = PLACE.mixb;
  return (
    <Scene p={P} slug="" vig={0.26 - E(f, 60, dur, 0, 0.10, LIN)}>
      <Cam x={-4} y={-14} s={1.32} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="04" floorY={600} />
        {/* the board face, big and close */}
        <div style={{ position: "absolute", left: 60, top: 150, width: 900, height: 470, zIndex: 20,
          background: "#F7F4EC", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 60, top: 150, width: 900, height: 470, zIndex: 22,
          border: `14px solid ${dkh(BRASS, 0.24)}`, borderRadius: 4 }} />
        {/* ⭐⭐ THE FLIP-THROUGH. Alex: *"at 29 seconds needs to be more
            interesting, like to show the motion of flipping through the images."*
            v1 was three discrete tears with dead beats between them — the LINE
            is *"until you get exactly what you wanted"*, and "until" is a RATE:
            you riffle through options faster and faster and then stop.
            ⭐ So it is one continuous riffle through Google's own Mixboard
            outputs — nine of them, decelerating on a curve — that lands on the
            keeper and CLAMPS. The rejects fan out on the floor as the receipt of
            how many it took, which is information the VO never gives you. */}
        {(() => {
          const START = 2, LAND = 62;
          /* the riffle DECELERATES: fast at the start, one card at the end */
          const t = E(f, START, LAND, 0, 1, OUT);
          const idx = Math.min(MB_REAL.length - 1, Math.floor(t * (MB_REAL.length - 0.001)));
          const held = f >= LAND;
          const lf = f - LAND;
          const set = held ? Math.sin(lf / 2.8) * Math.exp(-lf / 12) : 0;
          /* the one leaving, and the one arriving under it — a real riffle */
          return (<>
            {!held && idx > 0 && (
              <div style={{ position: "absolute", left: 210 - 40, top: 196 - 26, zIndex: 60,
                transform: `rotate(${-9 - idx * 2}deg)`, opacity: 0.5 }}>
                <GenFrame x={0} y={0} w={620} h={468} f={f} at={-14} variant={(idx - 1) % 4}
                  resolve={1} z={60} real={MB_REAL[idx - 1]} />
              </div>
            )}
            <div style={{ position: "absolute", left: 210, top: 196, zIndex: 64,
              transform: `rotate(${set * 2.4}deg) scale(${1 + set * 0.05})` }}>
              <GenFrame x={0} y={0} w={620} h={468} f={f} at={-14} variant={idx % 4}
                resolve={1} z={64} real={MB_REAL[idx]} />
            </div>
            {/* the rejects fanning onto the floor as it goes */}
            {Array.from({ length: Math.min(6, idx) }, (_, j) => (
              <div key={"rj" + j} style={{ position: "absolute", left: 92 + j * 96,
                top: 690 + (j % 2) * 22, width: 208, height: 158, zIndex: 40 + j,
                transform: `rotate(${-26 + j * 11}deg)`, overflow: "hidden",
                border: `5px solid ${dkh(BRASS, 0.3)}`, borderRadius: 4, boxShadow: SH }}>
                <Img src={staticFile(MB_REAL[j])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
            {/* the clamp that takes the keeper */}
            {held && [[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], j) => {
              const k = E(f, LAND + 4, LAND + 12, 0, 1, BACK);
              return (
                <div key={"jw" + j} style={{ position: "absolute",
                  left: 210 - 34 + cx * 654 - cx * 24 + (cx ? -1 : 1) * (1 - k) * 70,
                  top: 196 - 34 + cy * 502 - cy * 24 + (cy ? -1 : 1) * (1 - k) * 70,
                  width: 68, height: 68, zIndex: 70,
                  borderTop: cy ? "none" : `10px solid ${GOLD}`,
                  borderBottom: cy ? `10px solid ${GOLD}` : "none",
                  borderLeft: cx ? "none" : `10px solid ${GOLD}`,
                  borderRight: cx ? `10px solid ${GOLD}` : "none" }} />
              );
            })}
            {held && <Ring x={520} y={430} f={f} at={LAND + 6} c={GOLD} s={2.4} z={78} dur={22} />}
          </>);
        })()}
        <GHero f={f} x={858} y={786} size={236} z={66} costume={{ prof: 1 }} act={1} ph={1.1}
          drive={f > KEEP + 12 ? 0 : Math.sin(f / 4.2) * 0.34} reach={80}
          cheer={f > KEEP + 16 ? 0.7 : 0} flip />
        {/* ⛔⛔ §23 · THE WORST OFFENDER IN THE REEL (ratio 0.06): the keeper
            locked at KEEP+14 and the last eight frames were 0.73 against a body
            of 12.66. The locked image now LEAVES THE BOARD for the tray on an
            accelerating curve and is still moving on the cut frame — which is
            also the better read, because a payoff that is handed over beats a
            payoff that is framed and admired. */}
        {f > KEEP + 24 && (
          <div style={{ position: "absolute",
            left: 210 - E(f, KEEP + 24, dur + 8, 0, 150, IN_Q),
            top: 196 + E(f, KEEP + 24, dur + 8, 0, 660, IN_Q),
            width: 620, height: 468, zIndex: 72, overflow: "hidden",
            transform: `rotate(${E(f, KEEP + 24, dur + 8, 0, -26, IN_Q)}deg)`,
            background: `linear-gradient(218deg, ${MAMBER} 0%, ${dkh(GOLD, 0.2)} 100%)`,
            border: `7px solid ${GOLD}` }}>
            {/* ⛔ THIS WAS A BARE GRADIENT AND IT COVERED THE KEEPER. The whole
                point of the beat is the picture he finally accepts, so the copy
                that LEAVES has to be that same real picture. */}
            <Img src={staticFile(MB_REAL[3])} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        {/* ⭐ TRAY 3 FULL */}
        <OutTray x={214} y={840} w={248} f={f} fill={E(f, KEEP + 20, dur, 0, 1, LIN)} kind="img"
          hit={KEEP + 20} z={68} />
      </Cam>
      <Chip t="UNTIL IT IS RIGHT" y={150} c={dkh(MAMBER, 0.62)} fg="#FFF4DC" s={0.96} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S13 · 33.87 to 36.40s (76f) · MED  ·  BAY 09 · POMELLI
   VO: "Fourth, Google Pomelli, it's an AI marketing tool."
   ⛔ NO INVENTED MARK — same generic beaker, same call as Mixboard: a NAME plate.
   EVENT: the press LOWERS onto its rails in two overlapping stages, seats with
   a heavy clunk, and the rollers spin up — a background process that will then
   run for the whole bay.
   ======================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ 0.37 — the lowest open in the reel. The press is already coming down. */
  /* ⛔ f1-6 went DOWN (1.89 -> 1.71) when the seat was made faster, because an
     OUT ease starting at f-10 is already decelerating by the time the shot
     opens. §23 in the opening window: use LIN, and land the arrival INSIDE it. */
  const seat = E(f, -6, 9, 0, 1, LIN);
  const run = E(f, 9, 34, 0, 1, OUT);
  const P = PLACE.pom;
  return (
    <Scene p={P} slug="" vig={0.30 + E(f, 0, dur, 0, 0.12, LIN)}>
      <Cam z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="09" floorY={540} />
        {/* the raking key from the right, hard — a shaped cone, never a fill */}
        <div style={{ position: "absolute", left: 520, top: -40, width: 620, height: 700, zIndex: 8,
          opacity: 0.30, clipPath: "polygon(58% 0, 100% 0, 100% 100%, 6% 100%)",
          background: `linear-gradient(240deg, ${hexa(PTEAL, 0.62)} 0%, ${hexa(PTEAL, 0)} 100%)` }} />
        <Runner y={150} f={f} z={12} rate={8.1} pitch={190} w={124} h={40} c="#2E7A6A" c2="#04140F" kind="load" />
        {/* the rails it comes down on */}
        {[176, 812].map((x, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: x, top: 120, width: 16, height: 400,
            zIndex: 20, background: dkh(STEEL, 0.52) }} />
        ))}
        <Press x={182} y={300} w={640} f={f} run={run} seat={seat} z={34} />
        {seat >= 1 && (<>
          <Puff x={500} y={588} f={f} at={9} n={9} s={1.6} c="#8ACFC0" z={72} />
          <Ring x={500} y={592} f={f} at={9} c={PTEAL} s={1.7} z={74} />
        </>)}
        {/* ⛔ §23 · the press starts THROWING before the cut, so S15's run is
            already under way when the picture changes to it. */}
        {Array.from({ length: 3 }, (_, i) => {
          const at = dur - 26 + i * 6;
          if (f < at) return null;
          const k = E(f, at, at + 24, 0, 1, IN_Q);
          return (
            <div key={"ps" + i} style={{ position: "absolute",
              left: 700 + k * 300, top: 430 - Math.sin(k * Math.PI) * 170 + k * 250,
              width: 148, height: 188, zIndex: 68, background: "#FAF7F0", borderRadius: 3,
              boxShadow: SH, transform: `rotate(${(rnd(i, 2) - 0.5) * 40 + k * 200}deg)` }}>
              <div style={{ position: "absolute", left: 10, top: 34, width: 128, height: 68,
                background: `linear-gradient(140deg, ${CLAY} 0%, ${dkh(CLAY, 0.34)} 100%)`, borderRadius: 3 }} />
              <div style={{ position: "absolute", left: 10, top: 112, width: 96, height: 10, background: "#2A2419", borderRadius: 2 }} />
            </div>
          );
        })}
        <GHero f={f} x={852} y={772} size={230} z={62} costume={{ suit: 1 }} act={0} ph={1.6}
          gaze={-0.5} flip />
        {/* ⭐ OFFICIAL: "Introducing Pomelli | Google Labs" */}
        <Broll x={492} y={356} w={936} f={f} at={20} src="broll/pomelli_cards.mp4"
          label="POMELLI" punch={52} z={64} bv={VARBV[v]} />
        {/* ⛔ Pomelli serves the same generic Labs beaker (checked by eye:
            `foundry_about/assets/favicon-48x48.png` is the beaker, tinted pink).
            Two products wearing one icon reads as a mistake, so it keeps its
            NAME, which is how Google's own page titles it. */}
        {/* ⭐ "Fourth" f4 · ⭐ "POMELLI" f18 -> the name lands at 14 */}
        <BaySlam f={f} at={14} mark={null} name="POMELLI" x={148} y={146} big={300} small={82} z={94} />
      </Cam>
      <Chip t="BAY 09 · MARKETING" y={150} c={dkh(PTEAL, 0.66)} fg="#E4FFF8" s={0.94} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S14 · 36.40 to 39.70s (99f) · CLOSE  ·  BAY 09
   VO: "Just give it your website and it studies your brand, your colors, and your fonts."
   ⭐ THREE PHYSICAL EXTRACTIONS, one per spoken phrase, staggered across the
   full duration, by THREE DIFFERENT MECHANISMS: the mark LIFTS onto a peg, the
   colours SLIDE into a rack, the fonts PUNCH OUT as type slugs into a case.
   ⛔ Never a table. §4: information is objects, not type.
   ======================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const feed = E(f, -8, 14, 0, 1, OUT);
  /* ⛔⛔ THESE WERE 26 / 52 / 76 AND EVERY ONE FIRED EARLY — the mark plate
     punched out EIGHTEEN FRAMES before the word "brand" was spoken, and the type
     slug twelve before "fonts". Three artefacts, three nouns, and not one of them
     landed on its own word. Measured onsets, minus the house 4-frame lead:
         "brand,"  f48 -> 44      "colors," f59 -> 55      "fonts."  f86 -> 82 */
  const A = 44, B = 55, C = 82;                       // brand · colours · fonts
  const stripped = (f >= C ? 1 : f >= B ? 0.6 : f >= A ? 0.4 : 0);
  const P = PLACE.pom;
  const BRAND = CLAY;
  return (
    <Scene p={P} slug="" vig={0.26 + E(f, 0, dur, 0, 0.12, LIN)}>
      <Cam x={-10} y={-16} s={1.42} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="09" floorY={540} />
        <Runner y={104} f={f} z={16} rate={26.0} pitch={252} w={230} h={112} c="#5FC4B0" c2="#04140F" kind="load" />
        {/* ⭐ "Generating your Business DNA" — Google's own phrase for what the
            VO calls "it studies your brand". */}
        {/* ⛔ IT WAS CUT MID-WORD. At x=640 in a 1012-wide panel the box is 134px
            off-centre, and once the Cam scale and the 1.09 punch are on it the
            frame ran to 1128 — so Google's own headline read "Pomelli will
            understa... your Busines". Same defect as the Jules capture: real
            footage you cannot read is a texture. Centred and sized to fit. */}
        <Broll x={492} y={318} w={924} f={f} at={2} src="broll/pomelli_dna.mp4"
          label="BUSINESS DNA" punch={52} z={62} bv={VARBV[v]} />
        {/* ⭐ the reader keeps FEEDING: pages queue in from the right the whole
            scene, so the machine is processing a site, not holding one sheet. */}
        {Array.from({ length: 5 }, (_, i) => {
          const at = -10 + i * 18; if (f < at) return null;
          const k = E(f, at, at + 30, 0, 1, LIN);
          return (
            <div key={"pg" + i} style={{ position: "absolute", left: 1040 - k * 560,
              top: 236 + rnd(i, 2) * 40, width: 176, height: 232, zIndex: 34,
              background: "#EFEADF", borderRadius: 4, opacity: 0.92 - k * 0.3, boxShadow: SH,
              transform: `rotate(${-6 + rnd(i, 3) * 12}deg)` }}>
              <div style={{ position: "absolute", left: 12, top: 14, width: 60, height: 10, background: "#9A9386", borderRadius: 3 }} />
              <div style={{ position: "absolute", left: 12, top: 40, width: 150, height: 64, background: "#C8C0B0", borderRadius: 3 }} />
            </div>
          );
        })}
        {/* the reader head the page goes into */}
        <div style={{ position: "absolute", left: 232, top: 392, width: 400, height: 54, zIndex: 40,
          background: dkh(SLATE, 0.32), borderRadius: 6 }} />
        <div style={{ position: "absolute", left: 246, top: 440, width: 372, height: 14, zIndex: 42,
          background: hexa(PTEAL, 0.5 + Math.sin(f / 4) * 0.3) }} />
        <SitePage x={300} y={430 + feed * 96} w={272} h={376} f={f} stripped={stripped}
          z={38} brandC={BRAND} />
        {/* ⛔⛔ REPLACED. Alex: *"at 37 seconds those images of the coloured
            squares and letters are not good."* He is right: "your brand, your
            colours, your fonts" was three coloured squares and four letters in
            boxes — the most literal possible restatement of the words, drawn as
            primitives. That is §4's failure twice over: information delivered as
            type, and a quantity delivered as a swatch.

            ⭐ WHAT IT IS NOW: the page goes into the reader and the machine pulls
            three REAL artefacts out of it, each a made thing rather than a
            square — a MARK PLATE punched out and hung on a peg, a folded COLOUR
            FAN that opens like a paint-shop swatch book, and a metal TYPE SLUG
            with a real letterform on its face dropping into a compositor's
            stick. Each is a physical object a viewer can name. */}
        {/* 1 · THE MARK — punched out and hung, still swinging */}
        {f >= A && (() => {
          const k = E(f, A, A + 13, 0, 1, OUT);
          const lf = f - (A + 13);
          const sw = lf >= 0 ? Math.sin(lf / 4.2) * Math.exp(-lf / 20) * 9 : 0;
          return (<>
            <div style={{ position: "absolute", left: 196, top: 214, width: 168, height: 13,
              zIndex: 44, borderRadius: 4, background: dkh(BRASS, 0.34) }} />
            <div style={{ position: "absolute", left: 270 - k * 4, top: 227,
              width: 6, height: 44 * k, zIndex: 45, background: dkh(BRASS, 0.5) }} />
            <div style={{ position: "absolute",
              left: 470 - k * 238, top: 330 - k * 62, zIndex: 66,
              transform: `rotate(${(1 - k) * 34 + sw}deg)`, transformOrigin: "50% -30%" }}>
              <div style={{ width: 128, height: 128, borderRadius: 16,
                background: `linear-gradient(158deg, ${mxh(BRAND, 0.22)} 0%, ${BRAND} 60%, ${dkh(BRAND, 0.30)} 100%)`,
                border: `7px solid ${dkh(BRAND, 0.46)}`, boxShadow: SH_D }}>
                <div style={{ position: "absolute", left: 22, top: 22, width: 26, height: 26,
                  borderRadius: "50%", background: hexa("#FFFFFF", 0.30) }} />
              </div>
            </div>
          </>);
        })()}

        {/* 2 · THE COLOUR FAN — a swatch book opening leaf by leaf */}
        {f >= B && (
          <div style={{ position: "absolute", left: 214, top: 452, zIndex: 66 }}>
            {/* the rivet it all pivots on */}
            <div style={{ position: "absolute", left: -13, top: -13, width: 30, height: 30,
              borderRadius: "50%", zIndex: 70, background: dkh(SLATE, 0.3),
              border: "5px solid #C8CEDA" }} />
            {[BRAND, dkh(BRAND, 0.28), "#E8B45A", GREEN, TEAL, "#5A78C8"].map((c, i) => {
              const at = B + i * 4;
              const k = E(f, at, at + 11, 0, 1, BACK);
              if (k <= 0.01) return null;
              return (
                <div key={"fan" + i} style={{ position: "absolute", left: 0, top: 0,
                  width: 210, height: 54, borderRadius: "5px 27px 27px 5px",
                  background: `linear-gradient(90deg, ${dkh(c, 0.22)} 0%, ${c} 100%)`,
                  border: "3px solid rgba(0,0,0,0.22)", zIndex: 60 + i,
                  transform: `rotate(${-14 + k * (i * 15 - 6)}deg)`,
                  transformOrigin: "6px 27px" }} />
              );
            })}
          </div>
        )}

        {/* 3 · THE TYPE SLUG — real metal type, letterform on its face, dropping
             into a compositor's stick */}
        {f >= C && (<>
          <div style={{ position: "absolute", left: 192, top: 690, width: 420, height: 26,
            zIndex: 44, background: dkh(BRASS, 0.44), borderRadius: 4 }} />
          <div style={{ position: "absolute", left: 192, top: 640, width: 18, height: 76,
            zIndex: 46, background: dkh(BRASS, 0.34) }} />
          {["A", "g"].map((ch, i) => {
            const at = C + i * 9;
            const k = E(f, at, at + 12, 0, 1, IN_Q);
            if (k <= 0.01) return null;
            return (
              <div key={"slug" + i} style={{ position: "absolute",
                left: 470 - k * (470 - (228 + i * 130)), top: 380 + k * 250,
                width: 118, height: 156, zIndex: 68,
                transform: `rotate(${(1 - k) * -46}deg)` }}>
                {/* the body of the sort */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 4,
                  background: `linear-gradient(96deg, #E4DED0 0%, #B4AC98 46%, #8A8270 100%)`,
                  border: "4px solid #6E6656" }} />
                {/* the nick every piece of type has */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 104, height: 11,
                  background: hexa("#4A4436", 0.55) }} />
                {/* the letterform on its face */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 16, textAlign: "center",
                  fontFamily: "Fraunces, Georgia, serif", fontWeight: 900, fontSize: 74,
                  lineHeight: 1, color: "#3A3428" }}>{ch}</div>
              </div>
            );
          })}
        </>)}
        <GHero f={f} x={846} y={786} size={236} z={62} costume={{ suit: 1 }} act={1} ph={0.5}
          drive={feed * 0.3} reach={70} gaze={-0.5} flip />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S15 · 39.70 to 43.50s (114f) · WIDE  ·  BAY 09 — PAYOFF
   VO: "Then it writes and designs social media posts and ads that match your
        brand automatically."
   ⭐⭐ "MATCH YOUR BRAND" IS DEPICTED, NOT ASSERTED: every sheet the press
   throws carries the SAME mark, the SAME swatches and the SAME type that were
   pulled off the site in S14. The viewer watches the match happen.
   ⭐ "automatically" → he stands back with his hands behind his back and does
   NOTHING, and §11 gives the stillest part of the frame an emitter (steam off
   the press) so the shot keeps moving where he does not.
   ======================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const P = PLACE.pom;
  const BRAND = CLAY;
  /* ⭐ THE BEATS ARE THE WORDS. ⛔ These were authored into S14 by a replace that
     matched `const P = PLACE.pom;` in the WRONG SCENE first — the edit reported
     success and compiled clean, which is `feedback_a_silent_patch_reports_success`
     exactly. Always grep the NEW text and check which scene it landed in.
       ⭐ "WRITES" f9 -> 5 · ⭐ "DESIGNS" f17 -> 13 · "posts" f38 · "ads" f56
       · ⭐ "MATCH" f75 -> 71, which is the claim this scene has to prove. */
  const WRITES = 5, DESIGNS = 13, MATCH = 71;
  return (
    <Scene p={P} slug="" vig={0.26 - E(f, 0, dur, 0, 0.08, LIN)}>
      <Cam x={+8} y={+14} s={0.90} z={12}>
        {/* ⭐ THE SET, not a gradient. §1: a dense correct room is worth more
            than any effect on top of it (7.68 -> 9.65 measured). */}
        <BayRoom f={f} p={P} z={2} num="09" floorY={540} />
        <div style={{ position: "absolute", left: 520, top: -40, width: 620, height: 700, zIndex: 8,
          opacity: 0.28, clipPath: "polygon(58% 0, 100% 0, 100% 100%, 6% 100%)",
          background: `linear-gradient(240deg, ${hexa(PTEAL, 0.6)} 0%, ${hexa(PTEAL, 0)} 100%)` }} />
        <Runner y={128} f={f} z={12} rate={9.9} pitch={190} w={124} h={40} c="#2E7A6A" c2="#04140F" kind="load" />
        <Press x={62} y={272} w={600} f={f} run={1} seat={1} z={34} />
        {/* ⛔ §24 · L/R was 0.11. Nothing was going IN. Blank stock now feeds the
            left end continuously — the missing half of the mechanism (§10) and
            the missing half of the frame, fixed by the same object. */}
        {/* ⭐ THE PRESS STROKES ARE THE VERBS. It WRITES (f5) and it DESIGNS (f13)
             — two discrete hits with a ring and a puff each, rather than a feed that
             merely runs — and on "MATCH" (f71) a ring fires on the brand plate, so
             the claim is proved on the frame it is made. */}
        {[WRITES, DESIGNS].map((at, i) => f >= at && f < at + 18 && (
          <React.Fragment key={"pv" + i}>
            <Ring x={330 + i * 96} y={402} f={f} at={at} c="#CFE9E0" s={1.25 + i * 0.2} z={70} dur={18} />
            <Puff x={330 + i * 96} y={430} f={f} at={at} n={8} s={1.1} c="#BEE8DC" z={69} />
          </React.Fragment>
        ))}
        {f >= MATCH && f < MATCH + 24 && (
          <Ring x={560} y={330} f={f} at={MATCH} c="#FFE6C0" s={2.3} z={78} dur={22} />
        )}
        {/* ⛔ last4 4.00 on a body of 11.17: the eighth sheet cleared at f105 and
            the shot's last seven frames were a still press. Twelve sheets on a
            tighter interval keep stock going in THROUGH the cut. */}
        {Array.from({ length: 12 }, (_, i) => {
          const at = -12 + i * 11; if (f < at) return null;
          const k = E(f, at, at + 26, 0, 1, LIN);
          return (
            <div key={"fd" + i} style={{ position: "absolute",
              left: -190 + k * 300, top: 300 + k * 128 + rnd(i, 2) * 26,
              width: 176, height: 136, zIndex: 30, background: "#E8E2D2", borderRadius: 3,
              boxShadow: SH, opacity: 1 - k * 0.2,
              transform: `rotate(${-14 + k * 16}deg)` }} />
          );
        })}
        {/* ⭐ the inking train on the feed side — three rollers on their own
            clocks, so the left half has continuous mechanical motion rather
            than a static press frame. */}
        {[[104, 236, 92], [188, 200, 68], [258, 244, 76]].map((q, i) => (
          <div key={"ink" + i} style={{ position: "absolute", left: q[0], top: q[1],
            width: q[2], height: q[2], borderRadius: "50%", zIndex: 40,
            background: `linear-gradient(140deg, ${mxh(PTEAL, 0.22)} 0%, ${dkh(PTEAL, 0.44)} 100%)`,
            border: `6px solid ${dkh(PTEAL, 0.54)}`,
            transform: `rotate(${f * (9 + i * 4) * (i % 2 ? -1 : 1)}deg)` }}>
            <div style={{ position: "absolute", left: q[2] / 2 - 4, top: 5, width: 8,
              height: q[2] - 10, background: dkh(PTEAL, 0.58) }} />
            <div style={{ position: "absolute", left: 5, top: q[2] / 2 - 4, width: q[2] - 10,
              height: 8, background: dkh(PTEAL, 0.58) }} />
          </div>
        ))}
        {/* the swatch rack and type case still on the bench — the SOURCE of the
            match, kept in frame so the identity is visible, not claimed */}
        <div style={{ position: "absolute", left: 66, top: 634, width: 200, height: 66, zIndex: 44,
          background: dkh(SLATE, 0.4), borderRadius: 5 }} />
        {[BRAND, dkh(BRAND, 0.3), GREEN, TEAL].map((c, i) => (
          <div key={"sw" + i} style={{ position: "absolute", left: 78 + i * 46, top: 644,
            width: 40, height: 48, borderRadius: 3, background: c, zIndex: 46 }} />
        ))}
        <div style={{ position: "absolute", left: 300, top: 644, width: 56, height: 56, borderRadius: 12,
          background: BRAND, zIndex: 46 }} />
        {/* ⭐ THE OUTPUT — many large bright objects travelling, continuously,
            across the FULL duration. The reel's densest scene. */}
        {Array.from({ length: 16 }, (_, i) => (
          <AdSheet key={"ad" + i} x={742} y={560} f={f} at={-14 + i * 6.4} i={i}
            brandC={BRAND} s={1.0} z={64 + (i % 5)} />
        ))}
        {/* ⛔ §11: an emitter on the STILLEST part of the frame */}
        {/* ⭐ THE REAL OUTPUT: Google's launch footage of the posts and ads
            Pomelli generates, beside the press printing them. */}
        <Broll x={492} y={330} w={936} f={f} at={4} src="broll/pomelli_posts.mp4"
          label="POMELLI · ON BRAND" punch={54} z={60} bv={VARBV[v]} />
        <Steam x={334} y={306} f={f} at={0} n={7} s={1.5} z={58} c="#BEE8DC" rate={1.3} />
        {/* hands behind his back: no drive, no reach, act 3 (LOOK) only */}
        <GHero f={f} x={852} y={786} size={234} z={62} costume={{ suit: 1 }} act={3} ph={2.4}
          drive={0} gaze={-0.7} flip />
        {/* ⭐ TRAY 4 FULL — heaped */}
        <OutTray x={286} y={846} w={290} f={f} fill={E(f, 20, dur - 4, 0, 1, LIN)} kind="ad"
          hit={-999} z={70} />
      </Cam>
      <Chip t="ON BRAND, HANDS OFF" y={150} c={dkh(PTEAL, 0.66)} fg="#E4FFF8" s={0.94} z={96} />
    </Scene>
  );
};

/* =========================================================================
   S16 · 43.50 to 46.10s (78f) · WIDEST — CTA / PEAK
   VO: "There are many tools on this list, just comment Google for access."
   ⭐⭐ THE VILLAIN TURNS. For the first time in 46 seconds the HYPE MOB turns
   round — one head, then three, then the whole mass streams down the row past
   camera. Sixteen large sprites travelling the full depth of frame is the
   biggest single move in the reel and it is the last one.
   ⛔ THE PEAK MUST BEAT THE HOOK: S0 was two bays lit and a static mob. This is
   fifteen bays lit AND running, four trays heaped, and the mob itself moving.
   ⛔ NOTHING SOUNDS AFTER THE CHIP — the last word needs its 0.31s of room.
   ======================================================================== */
export const S16: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ LIN: the turn runs to the very last frame and must not decelerate into it */
  /* the mob is ALREADY turning on the cut frame — the last shot ended with a
     tray heaping, so the reaction has already begun. */
  const turn = E(f, -22, dur - 8, 0, 1, LIN);
  return (
    <Scene p={PLACE.row} slug="" vig={0.22 - E(f, 0, dur, 0, 0.08, LIN)}>
      <Cam y={16} s={0.88} z={12}>
        <RowWide f={f} open={() => 1} lamps={1} nums={() => 1}
          mob={<>
            <HypeMob f={f} x={158} y={716} n={9} size={104} spread={250} turn={turn} z={64} seed={0} />
            <HypeMob f={f} x={654} y={560} n={6} size={72} spread={150} turn={turn * 0.86} z={63} seed={40} />
          </>} />
        {/* every bay running, not merely lit */}
        {BAYS.map(g => {
          if (g.sc < 0.30) return null;
          /* ⭐ RUNNING, not lit: each bay's machine drives a piston on its own
             clock, so fifteen mouths are fifteen moving things, not fifteen
             coloured rectangles. */
          const pist = (Math.sin(f / 4.4 + g.i * 1.9) * 0.5 + 0.5);
          return (
            <div key={"rn" + g.i} style={{ position: "absolute", left: g.x + g.w * 0.12,
              top: g.base - g.h * 0.56, width: g.w * 0.76, height: g.h * 0.34, zIndex: 46,
              background: hexa(COLD, 0.34), borderRadius: 3, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: "8%", top: `${8 + pist * 46}%`,
                width: "40%", height: "34%", background: hexa(HOT, 0.86) }} />
              <div style={{ position: "absolute", left: "56%", top: `${52 - pist * 40}%`,
                width: "34%", height: "40%", background: hexa(COLD, 0.80) }} />
            </div>
          );
        })}
        {/* ⭐ THE FOUR TRAYS, heaped and lit across the front of frame */}
        {[[112, "pr"], [378, "app"], [644, "img"], [906, "ad"]].map(([x, k], i) => (
          <OutTray key={"tt" + i} x={x as number} y={806} w={248} f={f} fill={1}
            kind={k as any} hit={-999} z={72} />
        ))}
        {/* ⭐ THE PEAK MUST BEAT THE HOOK, so the row is not merely lit — it is
            HANDING THINGS OUT. Output flies from the bays across the whole shot. */}
        {Array.from({ length: 26 }, (_, i) => {
          const at = -30 + i * 4; if (f < at) return null;
          const k = E(f, at, at + 26, 0, 1, LIN);
          const bx = 120 + (i % 5) * 190;
          return (
            <div key={"out" + i} style={{ position: "absolute",
              /* ⛔ §24 · the arc now PEAKS IN THE TOP HALF (y~150) instead of
                 crossing the bottom third — the dead half is the top one. */
              left: bx + (rnd(i, 2) - 0.5) * 90, top: 470 - Math.sin(k * Math.PI) * 400 + k * 330,
              width: 156, height: 112, zIndex: 70, borderRadius: 4,
              background: ["#EFE9DA", "#DCC8F4", "#F6DCA8", "#CFF0E4"][i % 4],
              boxShadow: SH, opacity: 1 - k * 0.25,
              transform: `rotate(${(rnd(i, 3) - 0.5) * 60 + k * 180}deg)` }} />
          );
        })}
        {/* the one Claude facing us while the others turn */}
        <Hero f={f} x={508} y={800} size={236} z={80} costume={{}} act={2} ph={0.2}
          gaze={0} cheer={turn > 0.4 ? 0.8 : 0.2} />
        <MarkCast x={508} y={228} s={128} z={84} f={f} spin={0.4} pulse={0.3} />
      </Cam>
      {/* ⭐⭐ THE CTA IS A CARD, NOT A CHIP. Alex: *"at the very end the COMMENT
          GOOGLE should be a bigger card and cooler effect."* It was the house
          chip at 1.12x — the same pill the audience has scrolled past a hundred
          times, which is exactly what `feedback_frame0_claim_plate` measured as
          the LOSING shape. This is a purpose-built plate: it flies in, lands
          with a squash and a ring, and keeps a slow live pulse under it. */}
      {(() => {
        const IN = 2;                      // ⛔ f1-6 was 4.68: it opened empty
        const k = E(f, IN, IN + 9, 0, 1, IN_Q);
        const lf = f - (IN + 9);
        const set = lf >= 0 ? Math.sin(lf / 3.0) * Math.exp(-lf / 13) : 0;
        const glow = 0.5 + 0.5 * Math.sin(f / 9);
        if (k <= 0.001) return null;
        return (
          <div style={{ position: "absolute", left: 0, right: 0, top: 452 + (1 - k) * -420,
            display: "flex", justifyContent: "center", zIndex: 99,
            transform: `scale(${(0.6 + k * 0.4) * (1 + set * 0.06)}) rotate(${set * 1.6}deg)` }}>
            <div style={{ position: "relative", padding: "30px 62px", borderRadius: 26,
              background: `linear-gradient(168deg, ${mxh(CLAY, 0.16)} 0%, ${CLAY} 58%, ${dkh(CLAY, 0.22)} 100%)`,
              border: "9px solid #2A2018", boxShadow: SH_D }}>
              {/* the live pip, so the card is not a still */}
              <div style={{ position: "absolute", left: 26, top: "50%", marginTop: -11,
                width: 22, height: 22, borderRadius: "50%",
                background: hexa("#FFF6EC", 0.45 + glow * 0.55) }} />
              <div style={{ ...ui(62, 900), color: "#FFF6EC", letterSpacing: "0.01em",
                paddingLeft: 30, whiteSpace: "nowrap" }}>
                COMMENT &ldquo;GOOGLE&rdquo;
              </div>
              {/* the underline that fills as it lands */}
              <div style={{ position: "absolute", left: 62, bottom: 16, height: 6, borderRadius: 3,
                width: `${E(f, IN + 9, IN + 26, 0, 260, OUT)}px`, background: hexa("#FFF6EC", 0.85) }} />
            </div>
          </div>
        );
      })()}
      <Ring x={506} y={520} f={f} at={11} c="#FFE6C0" s={2.6} z={97} dur={22} />
      {/* ⭐ AND IT HITS ON THE ASK. "comment" f37 -> 33 and "Google" f43 -> 39 are
          the two words the entire reel exists to deliver, and the card was sitting
          perfectly still through both of them. */}
      {[33, 39].map((at, i) => f >= at && f < at + 16 && (
        <Ring key={"ask" + i} x={506} y={520} f={f} at={at} c="#FFF0D2"
          s={1.9 + i * 0.5} z={98} dur={16} />
      ))}
    </Scene>
  );
};

/* ⭐ THE RAKE LEVER, PER CUT. Phases are coprime with every band pitch in the
   reel (268 · 274 · 330 · 340 · 380), so none of them lands back on itself —
   which is exactly the mistake reel 122 shipped. */
/* ⭐⭐ AND THE FOOTAGE NEEDS A PER-CUT FRAMING TOO. Every trial cut plays the
   SAME official clip, so without this the b-roll is identical pixels in all
   three and it drags the dHash down exactly where the frame is busiest.
   `Broll.bv` takes a different start frame, zoom and pan per cut. */
export const VARBV: Record<Variant, { t: number; k: number; dx: number; dy: number }> = {
  house: { t: 0,  k: 1.00, dx: 0,  dy: 0 },
  amber: { t: 26, k: 1.16, dx: -6, dy: -4 },
  steel: { t: 13, k: 1.09, dx: 5,  dy: 3 },
};

export const VARKIT: Record<Variant, { rakeRate: number; rakeSkew: number; rakePhase: number; railRate: number }> = {
  house: { rakeRate: 3.4, rakeSkew: -30, rakePhase: 0,   railRate: 17.5 },
  amber: { rakeRate: 6.1, rakeSkew: -47, rakePhase: 97,  railRate: 24.3 },
  steel: { rakeRate: 2.1, rakeSkew: -16, rakePhase: 211, railRate: 12.7 },
};
