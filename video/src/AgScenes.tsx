import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Chip, Contact, Edge, Ring, Puff, Pool, Motes, Beam, Rake, Runner,
  Crew, Hero, Forearm, costumeFor, R, asPlace, mono, ui, GY, BAND_Y, SAFE3, Sweat,
  CLAY, GOLD, GREEN, RED, SKY, BONE, INK, MUTE, STEEL, CREAMB, SODIUM, TEAL,
  BRASS, SLATE, EMBER, VIOLET, PAPER,
} from "./AgWorld";
import { Room } from "./HwSets";
import {
  RoleRack, RolePlate, RepoPlate, StarFall, Bench, TicketPile, Ticket,
  AppSlab, PayHook, WallClock, Laptop, KeywordPlate, NearShade, HeroKey, RealMark,
  PartsWall, HoistRun, CrewField, HeadCount, RANKS, slots,
  BuildLine, Station, JOBS, JobFrontend, JobBackend, JobSecurity, JobArchitect,
  TallyColumn, StarStream, NightTower, TowerToLaptop, LiftShaft, LiftApp, FloorProp,
  AgentGrid, DiscSymbol,
  OfficeFrontend, OfficeBackend, OfficeSecurity, OfficeWall, BayShell, BayFore, CityGlass,
  BayFitout,
} from "./AgProps";

/* ===========================================================================
   REEL 134 · "AGENTS" — THE SCENES.  Board: storyboards/134-agents.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION (ANIMATION-QUALITY §2): a
   before state legible on the first frame, a visible TRIGGER, TRAVEL across real
   distance, and an ARRIVAL THAT COSTS SOMETHING. Nothing here lands and stops.

   ⛔⛔ AND THE BODY IS DENSE WHERE THE HOOK IS SPARSE
   (`feedback_the_crowd_is_a_near_band`): every body scene carries
     1. a NEAR-CAMERA CREW BAND cropped by the bottom edge, in front of the
        action — which is also the depth cue reel 94's audit asks for, so it
        pays twice;
     2. COUNTABLE REAL CONTENT on the back wall — the rack, always, because in
        this reel the rack is the repo and it is the thing being counted.
   ⛔ The band goes BEHIND the one word a scene spells out (the CTA keyword).

   ⛔ Panel coords are 0..1012 x 0..792. `GY` 706 is the ground line. `BAND_Y`
   132 is reserved for the claim chip; nothing else enters y 112..210.
   ========================================================================= */

export type Variant = "house" | "amber" | "steel";
export type SP = { v: Variant; dur: number };

/* ⛔⛔ THREE CUTS = THREE HOOKS AND THREE SHOT SIZES, NOT THREE GRADES
   (`feedback_variants_need_shot_sizes`). The camera below changes the FRAMING —
   a wide, a tighter mid, and a low three-quarter — so a perceptual hash reads a
   different PICTURE, not a different tone curve. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: -8,  dy: 0,   s: 1.000, rot: 0 },   /* the wide            */
  amber: { dx: -46, dy: -30, s: 1.120, rot: 0 },   /* a tighter, higher mid */
  steel: { dx: 54,  dy: 26,  s: 1.140, rot: 0 },   /* low three-quarter   */
};
/* ⛔ THE CROP BOUND INCLUDES `cam`. At steel's 1.140 x a 1.08 scene push the
   visible half-width is 506/1.231 = 411px, so everything that must read in all
   three cuts stays inside SAFE3 (x 134..864). The Edge occluders sit outside it
   deliberately; they are the thing that is allowed to be cropped. */
export const GRADE: Record<Variant, string> = {
  house: "none",
  amber: "saturate(1.06) contrast(1.03)",
  steel: "saturate(0.97) contrast(1.05) hue-rotate(-4deg)",
};
/** a small per-variant parallax on the set, so the BACKGROUND moves too */
const LAY: Record<Variant, { a: number; b: number }> = {
  house: { a: 0, b: 0 }, amber: { a: -58, b: -78 }, steel: { a: 62, b: 84 },
};
/* ⭐⭐ AND THE SET'S OWN GEOMETRY DIFFERS PER CUT, not just the camera.
   ⛔ A dHASH IS GEOMETRY, NOT GRADE (`feedback_dhash_is_geometry`) — the first
   three cuts shared one bin layout, one hoist phase and one plate stagger, so
   f528 measured 9 bits of 64 between house and steel however much the rake and
   the tone curve moved. `SEED` re-deals every stagger and every bin colour;
   `HOIST_K` puts the carried loads in different places at the same frame. */
const SEED: Record<Variant, number> = { house: 0, amber: 17, steel: 34 };
/* ⛔ THE OFFICE ROOMS ARE FULL-FRAME AND HAD NO PER-CUT GEOMETRY AT ALL, so
   house/amber measured 8 bits at f287 — a dHash reads GEOMETRY, and CAM + GRADE
   alone do not move one. Each cut frames the same room differently instead. */
const ROOMCAM: Record<Variant, { s: number; x: number; y: number }> = {
  house: { s: 1.00, x: 0, y: 0 },
  amber: { s: 1.18, x: -86, y: -34 },
  steel: { s: 1.12, x: 74, y: 26 },
};
const HOIST_K: Record<Variant, number> = { house: 1.0, amber: 1.38, steel: 0.71 };

/* ⭐⭐ THE RAKE IS THE STRONGEST TRIAL-CUT LEVER (`docs/TRIAL-CUTS.md` ranks it
   rake > grade > camera > bed > layout), and the first build did not vary it at
   all: the three cuts shared one band pattern and the dHash bottomed out at
   9 bits of 64 at f528, inside the duplicate-flagging band.
   ⛔ A RAKE PHASE IS MODULO THE BAND PITCH (`feedback_rake_phase_is_modulo_pitch`),
   so shifting by more than one pitch changes nothing. `n` is varied too, which
   changes the pitch itself and is what actually moves the hash. */
const RAKE_K: Record<Variant, number> = { house: 1.0, amber: 1.52, steel: 0.68 };
const RAKE_X: Record<Variant, number> = { house: 0, amber: 84, steel: 172 };
const RAKE_N: Record<Variant, number> = { house: 7, amber: 5, steel: 10 };

/* ===========================================================================
   ⭐⭐⭐ SHOTS — A HARD CUT TO A NEW FRAMING EVERY ~45 FRAMES.

   Alex, rev 3: *"needs to change scenes at like 1.5 secs."* Rev 2 held one
   framing for a whole beat (2.5-4.6s each, nine shots in 27s). This cuts to a
   new LOCKED framing roughly every 1.5s — 18 shots — which is the retention
   lever `docs/THE-OPEN.md` measures: reel 78 went 2.0 -> 6.85 first-5s motion
   from recutting alone, with no new elements.

   ⛔⛔ AND A CUT IS NOT AN EVENT (`ANIMATION-QUALITY` §2). Four framings in
   which nothing happens is four posters in a row. Every boundary below is placed
   ON an event the scene was already going to have — a landing, an arrival, a
   state change — so the cut REVEALS something rather than just reframing.

   ⛔ THE CAMERA IS LOCKED INSIDE EACH SHOT. The push lives on `Scene` and is
   held to ~1.02 now, because the shot scale multiplies it and the crop bound
   includes `cam`: at a combined 1.35 the visible half-width is 375px, so
   everything that must read stays inside SAFE3 (x 134..864).
   ========================================================================= */
type Fr = { at: number; s?: number; x?: number; y?: number };
export const Shots: React.FC<{ f: number; frames: Fr[]; z?: number; children: React.ReactNode }> =
  ({ f, frames, z = 30, children }) => {
  let cur = frames[0];
  for (const fr of frames) if (f >= fr.at) cur = fr;
  return (
    <Cam s={cur.s ?? 1} x={cur.x ?? 0} y={cur.y ?? 0} z={z}>{children}</Cam>
  );
};

/** the shot boundaries, exported so the SFX bank can put a transient on every
    cut frame without the two lists drifting apart. ⛔ A cut with no sound reads
    as a glitch; a cut with sound reads as intent. */
export const SHOTS: Record<string, number[]> = {
  /* ⛔ REV 29 kept the open as ONE locked framing after it had been jumping 52
     times in six seconds. ⭐ REV 34 gives it exactly ONE cut back, and the reason
     is measured, not a swing: shot LENGTH. Detected shot lengths across the
     winners cap at 2.53s (131 FREE), 2.70s (133 BUILD) and 3.20s (132 JUDGE) —
     while this reel's hook ran **3.93s in a single framing**, its LIFT-A 2.77s
     and its NIGHT 2.80s. My average shot (0.88s) is already SHORTER than every
     winner's; the pacing fault was three shots that overstayed, not a slow reel.
     One hard cut inside each, to a genuinely different framing of the SAME
     event — never a cut for its own sake (`THE-OPEN.md`, reel 104). */
  S0: [0, 30, 60], S1: [0, 30, 62], S2: [0, 26, 52, 77], S3: [0, 24],
  /* ⛔ REV 13 — S4 and S5 declare NO inner cut. They are one continuous camera
     ride up a lift shaft, and CUT_TICKS is derived from this map, so leaving the
     old [0, 42] / [0, 46] here fired a slate whump at a cut that no longer
     exists: a sound with no picture. The lift's real events — the car landing at
     each floor — are cued explicitly in the reel file instead. */
  S4: [0, 42], S5: [0], S6: [0, 44], S7: [0, 34], S8: [0],
};

/* ⛔⛔⛔ CLUTTER IS DENSITY OF STATEMENTS, NOT OF OBJECTS
   (`feedback_cluttered_is_a_repeat_count`). Alex: *"less cluttered but still
   better visual impact."* The count that found it: FOUR of seven band chips
   restated the SectionHeader directly beneath it —
     S4  header "ONE JOB / FOUR AGENTS ON IT"   chip "ONE JOB. FOUR AGENTS."
     S5  the same header                        chip "FRONTEND · BACKEND · SECURITY",
                                                which the three station plates already say
     S6  header "NO SALARIES / NO SLEEP"        chip "NO SALARIES. NO SLEEP."
     S8  header "COMMENT / AGENTS"              chip "COMMENT FOR THE FREE REPO"
   Every one was defensible when it was added; nobody stacks four redundant
   headlines on purpose, they accrete a round at a time. The fix is DELETION, and
   on reel 133 deleting four such elements RAISED the motion score, because the
   survivor finally had the frame.
   ⭐ A chip now only survives where it says something the header does not. */
const BandChip: React.FC<{ t: string; c?: string; fg?: string }> =
  ({ t, c = INK, fg = "#F6F2E8" }) => <Chip t={t} y={BAND_Y} c={c} fg={fg} s={0.94} z={94} />;

/** ⭐ THE NEAR BAND. A rank across the full width at 150-200px, in FRONT of the
    action, legs cut off by the panel. BOSS 128 runs one in every body frame and
    it is the single biggest density lever the reference sheet found. */
const NearCrew: React.FC<{ f: number; n?: number; y?: number; z?: number; at?: number;
  size?: number; seed?: number }> =
  ({ f, n = 4, y = 806, z = 84, at = 0, size = 176, seed = 0 }) => (
  <>{Array.from({ length: n }, (_, i) => (
    <Crew key={"nb" + i} f={f} x={64 + i * 268 + rnd(i + seed, 4) * 40} y={y}
      i={i + seed + 4} size={size + rnd(i + seed, 6) * 26} z={z} at={at + i * 3} />
  ))}</>
);

/** ⛔⛔⛔ THE BACK WALL IS A WORKING CREW, NOT A RACK OF PLATES.
    Alex, rev 2: *"each of the ai engineers should be represented as claude
    sprites not little rectangles or squares."* Rev 1 stood a 202-plate rack
    behind eight of nine scenes; it was a CONTAINER carrying one bit, and it was
    the same bit in every frame, which is the real answer to "the animation
    concepts are not interesting whatsoever."

    ⭐ Two receding ranks of small Claudes at work, each on its own action loop
    and costume, on a lit bench line. Countable, on-topic, and ALIVE — and it is
    the same lever the reference sheet found in BOSS 128 (8-12 sprites per body
    frame), applied to the back plane instead of the near one. */
/* ⛔⛔⛔ THE BACK PLANE IS A WORKING LINE, NOT A RANK OF STANDING PEOPLE.

   Rev 3 put two rows of Claude sprites on a bench line behind every scene. Alex:
   *"its not talking about the ai engineers really showing that in an interesting
   way its just too generic of a presentation."* He is right, and it is the same
   defect as the plate rack one level up: a sprite running an action loop is a
   person who is BUSY. It does not say what the job IS.

   ⭐ A rank of standing bodies is a uniform field, and a uniform field repaints
   nothing (`feedback_uniform_field_repaints_nothing`) — I had swapped one
   wallpaper for another. The back plane now carries the LINE (a full-width
   travelling band, the top of the motion table) with small STATIONS on it, each
   showing a different real job. Same countability, and now it means something.
   ------------------------------------------------------------------------- */
const BackLine: React.FC<{ f: number; z?: number; seed?: number; y?: number;
  lit?: number; n?: number; rate?: number }> =
  ({ f, z = 24, seed = 9, y = 470, lit = 1, n = 4, rate = 6.2 }) => (
  <>
    <BuildLine y={y + 54} f={f} on={lit} z={z} rate={rate} pitch={196} />
    {Array.from({ length: n }, (_, i) => (
      <Station key={"bs" + i} x={112 + i * 262} y={y + 26} f={f} job={(i + seed) % 4}
        k={0.55 + 0.45 * Math.abs(Math.sin(f / 46 + i))} lit={lit * 0.9}
        s={0.62} z={z + 2 + i} name={seed + i * 5} />
    ))}
  </>
);

/* =========================================================================
   S1 · THE BENCH — 4.58 to 8.32s (112f)
   VO: "It's called Agents and it already has over 39,000 GitHub stars."

   ⭐ THE ONLY PROOF BEAT IN THE REEL, so it is built around the one thing a
   viewer RECOGNISES in half a second: the GitHub mark, at size, on a machined
   sign — plus the star count, which is GitHub's own number.
   ⛔ NOT a UI screenshot (Alex's standing "object scenes not UI").

   EVENT: before = an empty lit bench under a lamp · trigger = the hero sets the
   plate down · travel = stars pour in from off-frame along real arcs · arrival =
   the counter lands and the plate rings.
   ====================================================================== */
/* =========================================================================
   S1 · THE STARS — 4.09 to 7.01s (87f)
   VO: "It's called Agents, and it already has over 39,000 GitHub stars."

   ⛔⛔⛔ REV 21, ALEX: *"the scene at six seconds needs to be so much more
   interesting. The scene at four seconds also. Right after the hook it's just
   very very boring, the scenes are back to back to back not good at all. The
   animations talking about the GitHub stars are just not good — we need to
   scrap them and completely redo them, way more interesting CONCEPTS here."*

   ⭐⭐⭐ THE NOTE UNDER THE NOTE, AND IT IS THE SAME TRAP THREE TIMES.
   I have now built this beat three ways — a tally column filling, a star button
   being clicked, a queue lobbing stars — and every one of them was the same
   picture: ★ GLYPHS PLUS A RISING NUMBER. The VO says "stars" so I drew stars,
   and it says "39,000" so I typeset 39,000. That is
   `feedback_illustrating_the_noun_is_the_trap`, twice over, in one beat.
   Iterating on it was never going to work, because the concept was the defect.

   WHAT 39,000 STARS ACTUALLY MEANS is not "many small gold shapes arrived". It
   means THIS ONE BEAT EVERYTHING ELSE. And this reel is already set in a tower,
   so the meaning has a picture waiting for it:

   ⭐ THE SKYLINE RACE. Our building starts the same height as every other
   repo on the skyline, and then it GROWS — floors slamming on, overtaking its
   neighbours one at a time, each one it passes going dark behind it — until it
   stands alone over the city and the count lands. The camera pulls back to keep
   the top in frame, so the whole panel repaints continuously.
   ⛔ The neighbours are NEVER NAMED (`NAME_BANNED`) — they are unlabelled
   buildings, because the claim is about this repo, not about anyone else's.

   THREE SHOTS, THREE SCALES, ONE CONTINUOUS EVENT:
     f0-30   TIGHT on our tower's crown, floors slamming on from below
     f30-62  WIDE — the skyline, ours climbing through the pack
     f62-87  VERY WIDE — alone above the city, the count lands
   ====================================================================== */

/** the skyline our repo climbs through. Heights are FIXED and unnamed.
    ⛔⛔ PER-VARIANT GEOMETRY, NOT PER-VARIANT GRADE. The first cut of this scene
    drew an identical skyline in all three cuts and measured **10 bits** at f160
    — dead on the dHash floor — because grade and camera do not move a hash
    (`feedback_dhash_is_geometry`). Which tower is OURS, how tall its neighbours
    are and where the clouds sit all shift per cut, so the three read as three
    different cities. */
const SKY_N = 11;
const skyH = (i: number, sd: number) => 150 + (((i + sd) * 137) % 100) * 2.4;
const SKY_OURS: Record<Variant, number> = { house: 5, amber: 3, steel: 7 };

const Skyline: React.FC<{ f: number; grow: number; zoom: number; showCount: boolean;
  v: Variant; label: boolean }> = ({ f, grow, zoom, showCount, v, label }) => {
  const GROUNDY = 726;
  const OURS = SKY_OURS[v];
  const SD = SEED[v];
  const ourH = 168 + grow * 1180;
  /* the camera pulls back exactly enough to hold the crown in frame */
  const sc = 1 / (1 + grow * 1.02 * zoom);
  /* ⛔ OUR TOWER MUST STAY A BUILDING. At 96px wide and 1348 tall it rendered as
     a NEEDLE once the camera pulled back — about 1:14, which reads as a mast, not
     a high rise. Ours is wider than its neighbours (it is also the biggest repo
     on the skyline, so that is the right shape anyway) and the neighbours shift
     out around it. */
  const bw = 92, MYW = 156, gap = 9;
  const tower = (i: number) => {
    const mine = i === OURS;
    const h = mine ? ourH : skyH(i, SD);
    const w = mine ? MYW : bw;
    const side = i < OURS ? -1 : 1;
    const x = mine
      ? 506 - MYW / 2
      : 506 + side * (MYW / 2 + gap + (Math.abs(i - OURS) - 1) * (bw + gap))
          + (side < 0 ? -bw : 0);
    /* a neighbour goes dark the moment we pass it */
    const passed = !mine && ourH > h + 40;
    /* the frame it was overtaken on — the flash is 8 frames wide */
    const justPassed = !mine && ourH > h + 40 && ourH < h + 130;
    const rows = Math.max(1, Math.floor(h / 44));
    return (
      <div key={"tw" + i} style={{ position: "absolute", left: x, width: w,
        top: GROUNDY - h, height: h, zIndex: mine ? 30 : 20,
        background: mine
          ? "linear-gradient(180deg,#5E6C7A,#39434E)"
          : `linear-gradient(180deg,${passed ? "#1B2430" : "#3C4754"},#151C26)`,
        border: `${mine ? 7 : 5}px solid #10151B`, boxSizing: "border-box",
        boxShadow: mine ? `0 0 44px ${hexa(GOLD, 0.4)}`
          : justPassed ? `0 0 40px ${hexa("#FFFFFF", 0.7)}` : "none", overflow: "hidden" }}>
        {Array.from({ length: rows }, (_, r) => {
          const lit = mine
            ? (GROUNDY - h + r * 44) > GROUNDY - ourH + 8
            : !passed && (((i + SD) * 7 + r * 3) % 5) < 3;
          return (
            <div key={"wr" + r} style={{ position: "absolute", left: 9, right: 9,
              top: 10 + r * 44, height: 30, display: "flex", justifyContent: "space-around",
              background: lit
                ? (mine ? "linear-gradient(180deg,#FFF0C4,#E8C264)" : hexa("#E7C87A", 0.5))
                : "#222C38",
              border: "3px solid #10151B", boxSizing: "border-box", overflow: "hidden" }}>
              {/* two Claudes to a floor while the camera is still close enough */}
              {mine && lit && sc > 0.34 && [0, 1].map((q) => (
                <Crew key={q} f={f} x={MYW * (0.3 + q * 0.4) - 9} y={27} i={r * 3 + q * 7 + i}
                  size={30} z={2} at={0} loop={(r + q) % 4} />
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 6,
      transform: `translateY(${((1 - sc) * 300).toFixed(1)}px) scale(${sc.toFixed(4)})`,
      transformOrigin: "50% 100%" }}>
      {/* ⭐⭐ REV 22, ALEX: *"it's cool to see the tower stack up, but I want to see
          more interesting stuff as well — think through how to elevate this even
          more. I like that concept."* Three things, all of them consequences of
          the climb rather than decoration on it:
            · a CRANE that rises with the crown and visibly hoists each slab into
              place, so the growth has a mechanism instead of just happening
              (`feedback_make_an_action_read`: draw the machine, not the result)
            · a CLOUD LAYER at a fixed height that the tower rises THROUGH, which
              is the cheapest and strongest scale cue there is
            · the passed neighbours go dark WITH A FLASH, so overtaking is an
              event you can count rather than a state you infer */}
      {/* a far rank behind the near one, so the city has depth and not a row */}
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"fr" + i} style={{ position: "absolute", left: -60 + i * 84, width: 62,
          top: GROUNDY - (96 + (((i + SD) * 71) % 100) * 1.5),
          height: 96 + (((i + SD) * 71) % 100) * 1.5,
          zIndex: 12, background: "linear-gradient(180deg,#243040,#131A24)" }}>
          {Array.from({ length: 5 }, (_, r) => (
            <div key={r} style={{ position: "absolute", left: 8, right: 8, top: 10 + r * 30,
              height: 18, background: (i * 3 + r) % 4 ? hexa("#8FA6BC", 0.28) : hexa("#E7C87A", 0.3) }} />
          ))}
        </div>
      ))}
      {Array.from({ length: SKY_N }, (_, i) => tower(i))}
      {/* ⭐ THE CRANE — it stands off our tower and climbs with the crown, and
          the hook carries the next slab down onto it on a loop */}
      {(() => {
        const cy = GROUNDY - ourH;
        const t = (f * 0.09) % 1;
        return (
          <>
            <div style={{ position: "absolute", left: 506 + 118, width: 12,
              top: cy - 40, height: ourH + 40, zIndex: 26, background: "#E7B24C" }} />
            <div style={{ position: "absolute", left: 506 - 30, width: 190, top: cy - 116,
              height: 12, zIndex: 27, background: "#E7B24C" }} />
            <div style={{ position: "absolute", left: 506 + 118 - 4, width: 20, top: cy - 150,
              height: 40, zIndex: 27, background: "#C89A38" }} />
            {/* the hoist line and the slab on the end of it */}
            <div style={{ position: "absolute", left: 506 + 26, width: 5,
              top: cy - 110, height: 24 + t * 74, zIndex: 27, background: "#8E7A50" }} />
            <div style={{ position: "absolute", left: 506 - 34, width: 124, height: 15,
              top: cy - 92 + t * 74, zIndex: 28, opacity: 1 - t * 0.3,
              background: "linear-gradient(180deg,#D6DEE8,#6E7A88)",
              border: "4px solid #10151B", boxSizing: "border-box" }} />
          </>
        );
      })()}
      {/* ⭐ THE CLOUD LAYER our tower rises through — the scale cue */}
      {[0, 1, 2].map((i) => (
        <div key={"cl" + i} style={{ position: "absolute", zIndex: 34,
          left: -180 + ((f * (0.9 + i * 0.4) + i * 420 + SD * 47) % 1500),
          top: 190 + i * 62 + (SD % 3) * 34, width: 300 + i * 90 + (SD % 5) * 22,
          height: 44 + i * 12,
          borderRadius: 40, background: hexa("#D9E4EE", 0.34 - i * 0.06) }} />
      ))}
      {/* ⭐ THE FLOORS ARRIVING — a slab slams onto the crown every few frames */}
      {grow > 0.02 && grow < 0.99 && Array.from({ length: 3 }, (_, q) => {
        const t = ((f * 0.09 + q / 3) % 1);
        return (
          <div key={"sl" + q} style={{ position: "absolute", left: 506 - 92, width: 184,
            top: GROUNDY - ourH - 150 + t * 130, height: 16, zIndex: 42,
            background: "linear-gradient(180deg,#D6DEE8,#6E7A88)", opacity: 1 - t,
            border: "4px solid #10151B", boxSizing: "border-box" }} />
        );
      })}
      {/* our roof cap and its beacon, riding the crown */}
      <div style={{ position: "absolute", left: 506 - 88, width: 176, top: GROUNDY - ourH - 18,
        height: 20, zIndex: 44, background: "linear-gradient(180deg,#D6DEE8,#6E7A88)",
        border: "4px solid #10151B", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 506 - 13, width: 26, height: 26, borderRadius: "50%",
        top: GROUNDY - ourH - 52, zIndex: 45, background: RED,
        opacity: 0.3 + 0.7 * Math.abs(Math.sin(f / 5)),
        boxShadow: `0 0 34px ${hexa(RED, 0.9)}` }} />
      {/* the ground the whole city stands on */}
      <div style={{ position: "absolute", left: -400, right: -400, top: GROUNDY, height: 400,
        zIndex: 46, background: "linear-gradient(180deg,#2B3340,#161C26)" }} />
      {label && (
        <div style={{ position: "absolute", left: 506 - 150, width: 300, top: GROUNDY - 96,
          zIndex: 48, padding: "8px 0", textAlign: "center", background: "#0A0E14",
          border: `5px solid ${GOLD}`, boxSizing: "border-box",
          ...mono(26, 900), color: GOLD, letterSpacing: "0.02em" }}>
          {R.repo.owner}/{R.repo.name}
        </div>
      )}
    </div>
  );
};

export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  const count = 0.14 + E(f, 0, 76, 0, 0.86, LIN);
  /* one continuous growth across the whole beat — the CAMERA cuts, not the event */
  const grow = E(f, 4, 78, 0, 1, IO);

  const sky = (
    <>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#0E1A2E 0%,#22375A 42%,#5E7C9C 78%,#A9BCCE 100%)" }} />
      {Array.from({ length: 34 }, (_, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: (i * 97) % 1004,
          top: 10 + ((i * 61) % 300), width: 3, height: 3, borderRadius: "50%", zIndex: 2,
          background: hexa("#FFFFFF", 0.3 + ((i * 13) % 5) * 0.12) }} />
      ))}
    </>
  );

  /* ---- SHOT 1 · TIGHT ON THE CROWN, floors slamming on from below -------- */
  if (f < 30) {
    return (
      <Scene p={asPlace("linehall")} slug="" push={[0, 30, 1.05]} vig={0.36}>
        {sky}
        <Skyline f={f} grow={grow} zoom={0.16} showCount={false} v={v} label={false} />
        {/* ⛔⛔ REV 29 — THE SUBJECT VANISHED HERE. Measured across 0-6s, share of
            the panel that is a Claude: this reel held 8-17% through the hook and
            then fell to 0.5% at 4s and 2.6% at 5s, the moment the skyline took
            over. The four winners never drop below 4.0% anywhere in the window
            (133 BUILD 4.0-7.7 · 131 FREE 4.1-12.8 · 132 JUDGE 6.1-26.1 · 119 OX
            2.9-11.1). A reel about AI ENGINEERS cannot have a two-second stretch
            with no engineer in it. The street is populated in all three shots. */}
        {/* ⛔ `at={0}` means the FIRST FRAME OF THE SHOT catches them inside
            `Crew`'s own 8-frame entrance, so the measurement at 4.0s still read
            0.8%. They are already standing when the shot cuts in. */}
        <NearCrew f={f} n={4} y={800} z={86} at={-14} size={228} seed={5 + SEED[v]} />
        <Chip t="ONE REPO, CLIMBING" y={706} c={INK} fg="#F6F2E8" s={0.86} z={94} />
        {/* the count's own band, so it never fights the crown for the same pixels */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 190, zIndex: 90,
          background: "linear-gradient(180deg,rgba(8,14,26,0.82) 0%,rgba(8,14,26,0.62) 58%,rgba(8,14,26,0))" }} />
        <HeadCount x={506} y={186} k={count} s={0.62} z={93} f={f} to={39400}
          label="GITHUB STARS" />
        <NearShade top={716} z={88} k={0.28} />
      </Scene>
    );
  }

  /* ---- SHOT 2 · WIDE. It climbs through the pack ------------------------ */
  if (f < 62) {
    return (
      <Scene p={asPlace("linehall")} slug="" push={[0, 32, 1.02]} vig={0.38}>
        {sky}
        <Skyline f={f} grow={grow} zoom={0.62} showCount={false} v={v} label={false} />
        {/* ⛔⛔ I DREW A RANK BADGE HERE AND THEN DELETED IT. "#1 ON GITHUB"
            is an unverifiable claim about a live leaderboard — and "#1" is on
            this reel's own `CLAIM_BANNED` list, which exists precisely so a
            good-looking graphic cannot smuggle in a number nobody sourced. The
            honesty ledger carries stars and agent count and nothing else, so
            that is all the picture is allowed to say.

            ⭐ What goes here instead is the one thing the shot genuinely needs:
            WHICH BUILDING IS OURS. The repo's own name, on its own tower. */}
        <div style={{ position: "absolute", left: 40, top: 300, zIndex: 91,
          padding: "12px 18px", background: "#0A0E14", border: `6px solid ${GOLD}`,
          boxSizing: "border-box" }}>
          <div style={{ ...mono(30, 900), color: GOLD, lineHeight: 1.1 }}>{R.repo.owner}/</div>
          <div style={{ ...mono(40, 900), color: "#F6F2E8", lineHeight: 1.05 }}>{R.repo.name}</div>
          <div style={{ ...ui(16, 900), color: "#9FB0C0", letterSpacing: "0.14em",
            marginTop: 4 }}>{R.agents} SUBAGENTS</div>
        </div>
        <Chip t="PAST EVERY OTHER ONE" y={706} c={INK} fg="#F6F2E8" s={0.86} z={94} />
        {/* the count's own band, so it never fights the crown for the same pixels */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 190, zIndex: 90,
          background: "linear-gradient(180deg,rgba(8,14,26,0.82) 0%,rgba(8,14,26,0.62) 58%,rgba(8,14,26,0))" }} />
        <HeadCount x={506} y={186} k={count} s={0.6} z={93} f={f} to={39400}
          label="GITHUB STARS" />
        {/* ⛔ a 206px body in front of a 200px building is a scale contradiction.
            The near band is cropped low and small enough to read as street level. */}
        <NearCrew f={f} n={4} y={824} z={84} at={-14} size={222} seed={11 + SEED[v]} />
        <NearShade top={734} z={88} k={0.3} />
      </Scene>
    );
  }

  /* ---- SHOT 3 · ALONE OVER THE CITY, and the count lands ---------------- */
  const land = E(f, 62, 82, 0, 1, OUT);
  return (
    <Scene p={asPlace("linehall")} slug="" push={[0, 25, 1.04]} vig={0.34}>
      {sky}
      <Skyline f={f} grow={grow} zoom={1} showCount v={v} label={land > 0.5} />
      {/* the whole street looking up at it */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Crew key={"lu" + i} f={f} x={38 + i * 190 + L.b * 0.3} y={GY + 118}
          i={i * 4 + 9 + SEED[v]} size={196 + (i % 3) * 34} z={80 + i} at={-12 + i * 2}
          loop={2} cheer={land} flip={i % 2 === 1} />
      ))}
      {/* the count's own band, so it never fights the crown for the same pixels */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 190, zIndex: 90,
        background: "linear-gradient(180deg,rgba(8,14,26,0.82) 0%,rgba(8,14,26,0.62) 58%,rgba(8,14,26,0))" }} />
      {land > 0.9 && <Ring x={506} y={188} f={f} at={80} c={GOLD} z={91} s={1.9} />}
      <HeadCount x={506} y={188} k={count} s={0.84} z={93} f={f} to={39400}
        label="GITHUB STARS" />
      <NearShade top={716} z={88} k={0.3} />
      <Edge side="r" c="#0A121C" w={52} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE PIT — 8.32 to 12.48s (125f)
   VO: "Instead of having one AI do everything, you can have a frontend
        engineer, backend engineer,"

   ⭐⭐⭐ THE LINE IS A CONTRAST, SO THE PICTURE HOLDS BOTH HALVES IN ONE FRAME.
   The event IS the sentence: a load that one figure cannot carry, visibly
   SPLITTING three ways. That is why it is not three cards with role names on
   them — three cards carry one bit of information (there are three) and this
   beat has to carry the DIFFERENCE.

   ⛔ THIS IS WHERE THE VILLAIN WINS. The pile buries him at frame 0 and it is
   only DENTED here: three thirds leave and the stack is still standing. It does
   not lose until S6.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pit");
  const L = LAY[v];
  /* ⛔⛔⛔ REV 8 — THE ROLES ARE SHOWN, NOT LABELLED. Alex: *"when i mention
     frontend engineer, backend engineer, etc like needs to show that"* and
     *"we need to see like offices."*

     Up to rev 7 a named role was an engraved plate on a bench: the VO said "a
     frontend engineer" and the picture said "a person at a workstation, with a
     word under him". A LABEL IS NOT A DEPICTION — the plate carried the role,
     and a plate carries one bit.

     ⭐ So the scene CUTS INTO EACH SPECIALIST'S OWN OFFICE, on the frame the
     word is spoken. Measured off `words_134agents.json`:
        f0   "Instead of having one AI do everything"  -> the open floor, failing
        f52  "a FRONTEND engineer"                     -> the frontend room
        f77  "BACKEND engineer"                        -> the backend room
     A room states a discipline the way a workshop states a trade: you know what
     someone does from what is on their walls before anyone tells you. */
  /* ⛔⛔⛔ REV 15, ALEX: *"the animation at 7 seconds is way too choppy."*
     It was, and the cause was one line: `lap = (f % 40) / 10`. Every 40 frames
     that WRAPPED, so the runner teleported from the far desk back to the first
     one — a hard cut in the middle of a continuous action — and because the
     camera tracks him, the whole floor snapped with him. On top of that the last
     10 frames of each cycle held him still (`min(3, ...)` pinned both ends of
     the interpolation), so the beat was: slide, freeze, teleport, slide.

     ⭐ It is now ONE MONOTONIC RUN across the room over the scene's own 52
     frames — four legs, each an eased sprint into a short stop. No wrap, no
     freeze, no teleport, and it reads better as a story: he never gets back to
     the first desk, so the alarms behind him accumulate. */
  const SX = [176, 428, 680, 932];
  const LEG = 13, RUNF = 9;                    /* sprint 9 frames, stop 4      */
  const seg = Math.min(3, Math.floor(f / LEG));
  const legT = E(Math.min(RUNF, f - seg * LEG), 0, RUNF, 0, 1, IO);
  const vel = f - seg * LEG < RUNF ? 1 : 0;    /* he is only DRIVING mid-leg   */
  const HX = SX[seg] + (SX[Math.min(3, seg + 1)] - SX[seg]) * legT;
  const held = (i: number) => 1 - Math.min(1, Math.abs(HX - SX[i]) / 190);

  /* ---- ROOM 2 · FRONTEND, on the word ---------------------------------- */
  if (f >= 52 && f < 77) {
    return (
      <Scene p={asPlace("hall")} slug="" push={[0, dur, 1.02]} vig={0.36}>
        /* ⛔ these room cameras were LOCKED, which is where OFFICES' 7 and WALL's 8
              dead windows came from. A drift of a few pixels over the shot keeps
              the panel alive without adding a single hard change. */
          <Cam s={ROOMCAM[v].s + f * 0.0009} x={ROOMCAM[v].x + Math.sin(f / 34) * 9}
            y={ROOMCAM[v].y + Math.cos(f / 41) * 7} z={20}>
          <BayShell f={f} side="r" tint={SKY} seed={2} />
          <BayFitout f={f} tint={SKY} side="l" seed={2} />
          <OfficeFrontend f={f} k={E(f, 52, 76, 0, 1, OUT)} />
          {/* ⛔ REV 13 — a discipline is a TEAM, not an occupant. Three bodies
              at three depths, each on a different loop, so the room is worked
              rather than posed. */}
          <Crew f={f} x={318} y={GY + 8} i={3 + SEED[v]} size={196} z={58} at={0} loop={1} />
          <Crew f={f} x={128} y={GY - 4} i={11 + SEED[v]} size={162} z={48} at={0} loop={2} flip />
          {/* ⭐⭐ REV 20, ALEX: *"the animations at nine to ten seconds need to be
              way more detailed, more interesting motion."* Every role room was a
              LOCKED-OFF shot: three bodies on the spot, props on their own small
              loops, and nothing crossing the frame. Motion needs a destination —
              so someone WALKS THE ROOM in each of them, right across the full
              width in the ~25 frames the shot has, carrying that discipline's
              own work, and the near band gets a body cropped by the frame. */}
          <Crew f={f} x={-120 + ((f - 52) / 25) * 1250} y={GY + 30} i={41 + SEED[v]}
            size={232} z={70} at={0} loop={0} />
          <BayFore f={f} tint={SKY} />
        </Cam>
        <NearShade top={690} z={88} k={0.34} />
        <BandChip t="FRONTEND ENGINEER" c={INK} />
        <Edge side="l" c="#2A241C" w={62} z={92} kind="wall" />
      </Scene>
    );
  }
  /* ---- ROOM 3 · BACKEND, on the word ----------------------------------- */
  if (f >= 77) {
    return (
      <Scene p={asPlace("floor")} slug="" push={[0, dur, 1.02]} vig={0.44}>
        /* ⛔ these room cameras were LOCKED, which is where OFFICES' 7 and WALL's 8
              dead windows came from. A drift of a few pixels over the shot keeps
              the panel alive without adding a single hard change. */
          <Cam s={ROOMCAM[v].s + f * 0.0009} x={ROOMCAM[v].x + Math.sin(f / 34) * 9}
            y={ROOMCAM[v].y + Math.cos(f / 41) * 7} z={20}>
          <BayShell f={f} side="l" tint={TEAL} seed={5} />
          <BayFitout f={f} tint={TEAL} side="r" seed={5} />
          <OfficeBackend f={f} k={E(f, 77, 104, 0, 1, OUT)} />
          <Crew f={f} x={706} y={GY + 8} i={17 + SEED[v]} size={190} z={58} at={0} loop={3} flip />
          <Crew f={f} x={882} y={GY - 4} i={23 + SEED[v]} size={158} z={48} at={0} loop={0} />
          <Crew f={f} x={1130 - ((f - 77) / 27) * 1250} y={GY + 30} i={47 + SEED[v]}
            size={228} z={70} at={0} loop={0} flip />
          <BayFore f={f} tint={TEAL} />
        </Cam>
        <NearShade top={690} z={88} k={0.40} />
        <BandChip t="BACKEND ENGINEER" c={INK} />
        <Edge side="r" c="#0A1218" w={62} z={92} kind="wall" />
      </Scene>
    );
  }

  /* ---- ROOM 1 · THE OPEN FLOOR, and one Claude cannot hold it ------------
     ⛔⛔⛔ REV 14, ALEX: *"at 7 seconds that animation needs to be completely
     scrapped and redone, it's not good and not interesting engaging enough."*

     THE SAME DEFECT, ONE SCENE EARLIER AGAIN. This was still the flat
     industrial floor — `Room` with a gantry, a `PartsWall` of tiny code panels,
     `Station`s in a row on a slab, a `BuildLine` under them — while the reel
     either side of it had become a tower. Third time this rebuild:
     `feedback_fix_the_reel_not_the_scene`. I keep fixing the scene in the note
     instead of every scene that belongs to the dead world.

     ⭐ The IDEA was right and is kept: one Claude alone on a whole floor,
     sprinting between four workstations, and losing. What changes is the SET
     and what "losing" looks like:
       · a real open-plan floor — glazing right across the back with the city
         behind it, a ceiling with pendants, a near-black foreground edge
       · four desks in the four DISCIPLINE COLOURS, each with its own work on it,
         so "four jobs" is four visibly different jobs and not four grey boxes
       · a status lamp over each. It goes RED the moment he leaves, so by the end
         of the shot three of the four are alarming behind him — the failure is
         cumulative and visible, not a state on one prop
       · he travels the FULL WIDTH of the frame, with a smear, which is also
         where the scene's motion comes from */
  const RUN = SX;
  const hx = HX;
  const DESK = [
    { c: "#E7B24C", kind: "chart"  },
    { c: "#5AA0DE", kind: "screen" },
    { c: "#3F9E74", kind: "rack"   },
    { c: "#C44A3A", kind: "audit"  },
  ];
  /* ⭐⭐⭐ THE CAMERA GOES WITH HIM. Measured: with the floor locked off this
     scene scored 7.55 — the only moving thing was one 238px sprite, about 6% of
     the panel, which is the same arithmetic that made the first cut of the lift
     STATIC. Tracking him repaints the whole floor every frame AND is the right
     shot for the line: the camera cannot settle either.
     ⛔ `translateX` BEFORE `scale`, never after — `scale(k) translate(tx)`
     multiplies tx by k (`feedback_transform_order_multiplies_translate`). */
  const camx = -(hx - 554) * 0.44;
  const punch = f >= 26 ? 1.13 : 1.0;        /* leg 3 starts at f26 — the cut
                                               SHOTS.S2 declares lands on it  */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.02]} vig={0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#2B3948 0%,#1B2634 58%,#121A24 100%)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792, zIndex: 2,
        transform: `translateX(${camx.toFixed(1)}px) scale(${punch})`,
        transformOrigin: "50% 58%" }}>
      <CityGlass x={-220} y={128} w={1452} h={286} f={f} seed={3 + SEED[v]} z={5} />
      {/* the floor slab the desks stand on */}
      <div style={{ position: "absolute", left: -240, width: 1492, top: 438, height: 354, zIndex: 14,
        background: "linear-gradient(180deg,#3E4A58 0%,#2B3541 58%,#232C38 100%)" }} />

      {DESK.map((D, i) => {
        /* ⭐ RED THE MOMENT HE LEAVES — the alarm is a consequence, not a loop */
        const near = 1 - Math.min(1, Math.abs(hx - RUN[i]) / 200);
        const ok = near > 0.42;
        return (
          <React.Fragment key={"dk" + i}>
            <div style={{ position: "absolute", left: RUN[i] - 120, top: 452, width: 240, height: 192,
              zIndex: 20 + i, boxSizing: "border-box", border: "5px solid #0A0E14",
              background: `linear-gradient(178deg,${mxh(D.c, ok ? 0.55 : 0.30)},${dkh(D.c, ok ? 0.22 : 0.44)})` }} />
            {/* ⛔ the unattended desks used to fade to 0.46 and simply VANISH — a
                dark prop at half opacity on a dark panel is not "waiting", it is
                gone. They stay legible and lose their COLOUR instead, and the
                props are scaled to the desk rather than sitting in it like a
                stamp. */}
            {/* ⛔⛔ THE WRAPPER MUST COVER THE PANEL. A bare <div> carrying a
                `transform` or a `filter` becomes the containing block for every
                absolutely-positioned descendant, so a zero-size wrapper silently
                re-bases the prop's panel coordinates and it vanishes off-frame —
                which is exactly what happened on the first attempt at this.
                Same family as `feedback_transform_order_multiplies_translate`. */}
            <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
              zIndex: 30 + i, transform: "scale(1.42)",
              transformOrigin: `${RUN[i] - 104}px 640px`,
              filter: ok ? "none" : "saturate(0.3) brightness(0.8)" }}>
              <FloorProp kind={D.kind} c={D.c} f={f} x={RUN[i] - 104} y={640} seed={i * 7 + SEED[v]} />
            </div>
            {/* the chair he is not sitting in */}
            <div style={{ position: "absolute", left: RUN[i] + 52, top: 596, width: 62, height: 52,
              zIndex: 44, background: "#161D26", borderRadius: "8px 8px 0 0",
              border: "4px solid #0A0E14", boxSizing: "border-box" }} />
            {/* the desk top, and the lamp that judges him */}
            <div style={{ position: "absolute", left: RUN[i] - 134, top: 638, width: 268, height: 26,
              zIndex: 46, background: "linear-gradient(180deg,#C9B693,#7B684A)",
              border: "4px solid #241C12", boxSizing: "border-box" }} />
            <div style={{ position: "absolute", left: RUN[i] - 16, top: 398,
              width: 32, height: 32, borderRadius: "50%", zIndex: 80,
              background: ok ? GREEN : RED, border: "5px solid #05070A", boxSizing: "border-box",
              opacity: ok ? 1 : 0.5 + Math.abs(Math.sin(f / 3.5 + i)) * 0.5,
              boxShadow: ok ? "none" : `0 0 26px ${hexa(RED, 0.9)}` }} />
            {!ok && <div style={{ position: "absolute", left: RUN[i] - 62, top: 364,
              width: 124, height: 26, zIndex: 79, ...mono(19, 900), color: RED,
              textAlign: "center", opacity: 0.35 + Math.abs(Math.sin(f / 3.5 + i)) * 0.65 }}>WAITING</div>}
          </React.Fragment>
        );
      })}

      {/* ⭐ THE SMEAR — he is moving fast enough that he leaves the last desk in
          the frame behind him, which is what "cannot hold it" looks like */}
      {vel > 0 && (
        <div style={{ position: "absolute", left: hx - 152, top: GY - 200, width: 156, height: 200,
          zIndex: 74, opacity: 0.34,
          background: `linear-gradient(90deg, rgba(0,0,0,0), ${hexa(CLAY, 0.85)})` }} />
      )}
      <Contact x={hx - 64 + L.a * 0.2} y={GY - 8} w={148} o={0.36} />
      <Hero f={f} x={hx + L.a * 0.2} y={GY - vel * (2 + Math.abs(Math.sin(f / 2.2)) * 9)}
        size={238} z={76} act={0} ph={0.2}
        costume={{ constr: 1 }} strain={0.62 + vel * 0.28}
        drive={vel ? 0.44 : -0.18} gaze={0.5} />
      <Sweat x={hx + L.a * 0.2} y={GY - 208} f={f} at={0} n={5} z={78} s={1.0} />
      {/* ⛔ THE RUNNER RIDES THE SAME CAMERA AS THE FLOOR. Drawn outside the
          tracked wrapper he kept his raw panel x, so by the last desk he was at
          x=932 and the f26 punch pushed him to 987 — half out of frame. Inside
          it the camera damps his travel to 56% and he stays between 299 and 821,
          and he stays glued to the desk he is actually at. */}
      </div>
      <BayFore f={f} tint="#8FA8C0" />
      <NearShade top={716} z={88} k={0.28} />
      <BandChip t="ONE AI, FOUR JOBS" c={INK} />
      <Edge side="l" c="#05070C" w={60} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE WIDE — 12.48 to 14.30s (55f)
   VO: "security auditor, and hundreds of other specialized roles."

   ⭐ "HUNDREDS OF OTHER" IS A SCALE LINE, AND SCALE IS A CAMERA MOVE, NOT AN
   OBJECT. One pull-back does what no added prop can: the rack the last two
   scenes have been standing in front of turns out to run past the top of frame.
   ⛔ 55 frames is short, so there is ONE idea in it and the camera never stops.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ MEASURED: "security auditor" f0 · "and hundreds" f24.
     The third named role gets its own room like the other two, and then
     "hundreds of other specialized roles" becomes a BUILDING of them — which is
     the scale image AND the "offices" note, instead of another crowd. */
  if (f < 24) {
    return (
      <Scene p={asPlace("pit")} slug="" push={[0, dur, 1.02]} vig={0.44}>
        /* ⛔ these room cameras were LOCKED, which is where OFFICES' 7 and WALL's 8
              dead windows came from. A drift of a few pixels over the shot keeps
              the panel alive without adding a single hard change. */
          <Cam s={ROOMCAM[v].s + f * 0.0009} x={ROOMCAM[v].x + Math.sin(f / 34) * 9}
            y={ROOMCAM[v].y + Math.cos(f / 41) * 7} z={20}>
          <BayShell f={f} side="r" tint={GOLD} seed={9} />
          <BayFitout f={f} tint={GOLD} side="l" seed={9} />
          <OfficeSecurity f={f} k={E(f, 0, 23, 0, 1, OUT)} />
          <Crew f={f} x={300} y={GY + 8} i={29 + SEED[v]} size={194} z={58} at={0} loop={2} />
          <Crew f={f} x={112} y={GY - 4} i={35 + SEED[v]} size={160} z={48} at={0} loop={1} flip />
          <Crew f={f} x={-120 + (f / 24) * 1250} y={GY + 30} i={53 + SEED[v]}
            size={230} z={70} at={0} loop={0} />
          <BayFore f={f} tint={GOLD} />
        </Cam>
        <NearShade top={690} z={88} k={0.40} />
        <BandChip t="SECURITY AUDITOR" c={INK} />
        <Edge side="r" c="#2A1A18" w={62} z={92} kind="wall" />
      </Scene>
    );
  }
  /* ⛔⛔ REV 16 — SAME DEFECT AS THE S1 SEAM, AND I MISSED IT THE FIRST TIME.
     `fill` started at 0 on the frame the shot cut in, so the wall arrived as a
     BLACK RECTANGLE with four cells at the top and filled over the next second
     and a third. Alex: *"the animations at 9 seconds, 10 seconds etc need to be
     so much more interesting."* A quarter of the building is already lit on the
     cut, and what the shot shows is it filling the rest — an arrival, not a
     construction from nothing. */
  const fill = 0.40 + E(f, 24, 66, 0, 0.60, LIN);
  return (
    <Scene p={asPlace("wide")} slug="" push={[0, dur, 1.02]} vig={0.40}>
      /* ⛔ these room cameras were LOCKED, which is where OFFICES' 7 and WALL's 8
              dead windows came from. A drift of a few pixels over the shot keeps
              the panel alive without adding a single hard change. */
          <Cam s={ROOMCAM[v].s + f * 0.0009} x={ROOMCAM[v].x + Math.sin(f / 34) * 9}
            y={ROOMCAM[v].y + Math.cos(f / 41) * 7} z={20}>
        <OfficeWall f={f} k={fill} cols={9} rows={6} z={30} />
      </Cam>
      {/* the one looking up at all of them, for scale */}
      <Contact x={92} y={GY - 8} w={150} o={0.34} />
      <Hero f={f} x={148} y={GY} size={186} z={72} act={3} ph={0.6}
        costume={{ constr: 1 }} gaze={-1.0} shock={E(f, 26, 42, 0, 1, OUT)} />
      {/* ⭐ searchlights raking the face, so the building is LIT rather than
          merely drawn — and they travel, which the wall itself cannot */}
      {[0, 1].map((i) => (
        <div key={"sl" + i} style={{ position: "absolute", top: 96, width: 210, height: 620,
          left: -160 + ((f * (5.4 + i * 2.2) + i * 520) % 1340), zIndex: 44,
          transform: `skewX(${i ? 11 : -11}deg)`, pointerEvents: "none",
          background: `linear-gradient(90deg,rgba(255,238,196,0),${hexa("#FFEEC4", 0.13)},rgba(255,238,196,0))` }} />
      ))}
      <HeadCount x={540} y={690} k={fill} s={0.56} z={93} f={f} to={R.agents}
        label="SPECIALIZED ROLES" />
      <NearShade top={700} z={88} k={0.40} />
      <Edge side="l" c="#05070A" w={62} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S4 + S5 · THE SERVICE LIFT — ONE JOB RIDING A BUILDING
   ⛔ REV 13, ALEX: "at 14 and 17 seconds it needs to be removed completely and
   then it needs to be so much more interesting, literally scrap that animation
   and redo it."  Both were still the flat horizontal BUILD LINE — the world I
   had already replaced with a tower at the top of the reel and with offices in
   the middle, but never in the MIDDLE OF THE REEL. Same cause as the 20s note,
   fixed at the end and not in the middle.

   THE CONCEPT: in a tower, the job goes UP. A glass service lift carries the
   app out of the lobby and stops at ARCHITECTURE, FRONTEND, BACKEND, SECURITY,
   and at each stop that floor's engineer reaches INTO the car and the app gains
   a layer — blank slab, blueprint, face, wiring, PASS stamp. The VO names four
   roles; the picture visits four floors, on the word.
   ====================================================================== */
/** the floors the job passes on its way up, ground upward */
const LIFT_FLOORS: { n: string; c: string; kind: string;
  sym: "building" | "site" | "stack" | "shield" }[] = [
  { n: "ARCHITECTURE", c: "#E7B24C", kind: "chart",  sym: "building" },
  { n: "FRONTEND",     c: "#5AA0DE", kind: "screen", sym: "site" },
  { n: "BACKEND",      c: "#3F9E74", kind: "rack",   sym: "stack" },
  { n: "SECURITY",     c: "#C44A3A", kind: "audit",  sym: "shield" },
];

/* ⛔ REV 13 — WHY THIS SCENE IS BUILT AS A WORLD SCROLL AND NOT A WIDE SHOT.
   The first cut of the lift measured 5.09 (STATIC) because the only thing that
   moved was the car: a ~170px object on a 1012x792 panel, about 3% of the frame
   repainting. motion = (fraction repainted per 0.1s) x (luma delta), so a small
   travelling object on a still building CANNOT score, however good it looks.
   The lift is now shot the way a lift is actually shot — the CAMERA RIDES THE
   CAR, the car holds screen centre, and the whole building falls past it. Every
   slab, room, name and body translates every frame, so the repaint fraction is
   ~100% instead of ~3%, and it is structured content (not the uniform field of
   `feedback_uniform_field_repaints_nothing`), so the luma delta is real. */
const PITCH = 236;            /* world px per floor                            */
const FY0   = 700;            /* world y of the ARCHITECTURE slab              */
const CY_FIX = 452;           /* the car's fixed SCREEN y — the camera anchor  */
const floorY = (i: number) => FY0 - i * PITCH;
/** car 0..1 → world y: 0 is the lobby, 1 is the roof above SECURITY */
const carY = (t: number) => 806 - t * (806 - (floorY(3) - 96));

const LiftScene: React.FC<{ v: Variant; dur: number; car: number; stage: number;
  chip: string; ring?: number; punch?: number }> =
  ({ v, dur, car, stage, chip, ring = -1, punch = 0 }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  const SX = 392 + L.b * 0.3, SW = 176;
  const cyw = carY(car);
  const shift = CY_FIX - cyw;                    /* the camera ride            */
  const at = (i: number) => Math.abs(cyw - floorY(i)) < 78;
  return (
    <Scene p={asPlace("floor")} slug="" push={[0, dur, 1.03]} vig={0.4}>
      {/* ⭐ REV 34 — `punch` is the scene's ONE hard cut: a tighter framing of the
          same shaft, so the car and the ticket it carries fill more of the panel.
          ⛔ translate BEFORE scale (`feedback_transform_order_multiplies_translate`). */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 0,
        zIndex: 2,
        transform: `translateY(${(shift + punch * 96).toFixed(1)}px) scale(${1 + punch * 0.3})`,
        transformOrigin: "50% 46%" }}>
        {/* the building's full section, lobby to roof, in WORLD coordinates */}
        <div style={{ position: "absolute", left: 0, top: -560, width: 1012, height: 1740,
          background: "linear-gradient(180deg,#33506E 0%,#1E2C3C 16%,#16202C 52%,#101923 84%,#0B1119 100%)" }} />
        {/* the roof line the car finally reaches */}
        <div style={{ position: "absolute", left: 26, right: 26, top: floorY(3) - 168,
          height: 20, background: "linear-gradient(180deg,#B9C6D4,#48535F)" }} />

        {LIFT_FLOORS.map((F, i) => {
          const fy = floorY(i), on = at(i);
          const RH = PITCH - 62;
          return (
            <React.Fragment key={"lf" + i}>
              <div style={{ position: "absolute", left: 22, right: 22, top: fy, height: 18,
                background: "linear-gradient(180deg,#9AA6B4,#2E3742)" }} />
              {/* the room the job is going to, lit only while the car is there */}
              <div style={{ position: "absolute", left: SX + SW + 24, right: 30, top: fy - RH,
                height: RH,
                background: `linear-gradient(178deg,${mxh(F.c, on ? 0.52 : 0.14)},${dkh(F.c, on ? 0.16 : 0.56)})`,
                border: "4px solid #0A0E14", boxSizing: "border-box" }} />
              {/* ⛔⛔ REV 19, ALEX: *"at fourteen seconds, that animation with the
                  floors and stuff needs to be more interesting."* Each floor had
                  one small prop and two bodies; you could not tell at a glance
                  what any of them DID. Every floor now runs its discipline's own
                  picture on a big wall screen — the same four symbols the app
                  gains as it rides past them — so the shaft is flanked by four
                  visibly different trades instead of four tinted boxes. */}
              <div style={{ position: "absolute", left: SX + SW + 42, top: fy - RH + 16,
                width: 218, height: RH - 44, zIndex: 26, boxSizing: "border-box",
                border: "5px solid #0A0E14", background: "#0B1119",
                opacity: on ? 1 : 0.46 }}>
                <DiscSymbol kind={F.sym} x={4} y={4} w={208} h={RH - 62} f={f + i * 17}
                  c={F.c} z={27} k={on ? 1 : 0.55} />
              </div>
              <div style={{ opacity: on ? 1 : 0.4 }}>
                <FloorProp kind={F.kind} c={F.c} f={f} x={SX + SW + 286} y={fy - 4} seed={i * 5} />
              </div>
              <Crew f={f} x={SX + SW + 424} y={fy - 4} i={i * 4 + 1 + SEED[v]} size={144}
                z={22} at={0} loop={on ? 1 : 3} flip />
              <Crew f={f} x={SX + SW + 178} y={fy - 4} i={i * 4 + 6 + SEED[v]} size={126}
                z={21} at={0} loop={(i + 1) % 4} />
              {/* ⭐ the hand-off: at his floor he reaches INTO the car */}
              {on && <Forearm x0={SX + SW + 214} y0={fy - 62} x1={SX + SW + 10} y1={cyw - 74}
                w={16} c={CLAY} z={80} />}
              <div style={{ position: "absolute", left: 34, top: fy - 40, zIndex: 24,
                padding: "4px 12px", background: "#0A0E14", opacity: on ? 1 : 0.62,
                ...mono(22, 900), color: F.c, letterSpacing: "0.12em" }}>{F.n}</div>
              {/* the other half of the floor, so the shaft sits inside a building */}
              <div style={{ position: "absolute", left: 30, top: fy - RH, width: SX - 56,
                height: RH,
                background: `linear-gradient(178deg,${hexa("#3C4A5A", 0.72)},${hexa("#18202B", 0.92)})`,
                border: "4px solid #0A0E14", boxSizing: "border-box" }} />
              <Crew f={f} x={150} y={fy - 4} i={i * 4 + 9 + SEED[v]} size={122} z={20} at={0}
                loop={(i + 2) % 4} />
              <Crew f={f} x={286} y={fy - 4} i={i * 4 + 13 + SEED[v]} size={110} z={20} at={0}
                loop={(i + 3) % 4} flip />
            </React.Fragment>
          );
        })}

        {/* THE LOBBY, where the brief is handed in */}
        <div style={{ position: "absolute", left: 22, right: 22, top: FY0 + 18, height: 300,
          background: "linear-gradient(180deg,#2A3646,#131B25)", borderTop: "6px solid #0A0E14",
          boxSizing: "border-box" }} />
        <div style={{ position: "absolute", left: 40, top: FY0 + 108, zIndex: 24,
          padding: "4px 12px", background: "#0A0E14", ...mono(22, 900), color: PAPER,
          letterSpacing: "0.12em" }}>LOBBY</div>
        <Crew f={f} x={SX + SW + 220} y={FY0 + 246} i={31 + SEED[v]} size={148} z={22} at={0} loop={2} flip />
        <Crew f={f} x={SX + SW + 372} y={FY0 + 246} i={35 + SEED[v]} size={126} z={21} at={0} loop={0} />
        <Crew f={f} x={196} y={FY0 + 246} i={39 + SEED[v]} size={132} z={20} at={0} loop={1} />

        <LiftShaft x={SX} w={SW} top={floorY(3) - 150} bottom={FY0 + 250} car={
          (FY0 + 250 - cyw) / (FY0 + 250 - (floorY(3) - 150))} f={f} z={40}
          stops={[0, 1, 2, 3].map(floorY)} />
        {/* ⭐ THE COUNTERWEIGHT — it runs the opposite way to the car, which is
            the one detail that makes a lift shaft read as a machine. */}
        <div style={{ position: "absolute", left: SX + SW - 34, width: 26,
          top: (floorY(3) - 150) + (FY0 + 250 - cyw) - 60, height: 96, zIndex: 38,
          background: "linear-gradient(180deg,#6E7A88,#2A323C)", border: "4px solid #0A0E14",
          boxSizing: "border-box" }} />
        {/* ⛔⛔ REV 22, ALEX: *"at fifteen, sixteen and seventeen seconds there's
            a bar with four lighted up dots — I don't like those things, please
            remove that bar completely because it's covering the animation."*
            Removed. It was a floor indicator I added to make the climb legible,
            but the climb is already legible from the car's position against the
            named floors, so the indicator carried no information the picture did
            not already have — and it sat directly over the car. A readout that
            duplicates the picture and occludes it is pure cost. */}
        <LiftApp x={SX + SW / 2} y={cyw - 22} stage={stage} s={1.2} z={70} f={f} />
        {ring >= 0 && <Ring x={SX + SW / 2} y={cyw - 66} f={f} at={ring} c={GOLD} z={84} s={1.3} />}
      </div>

      {/* ⛔⛔ REV 20, ALEX: *"around sixteen seconds when the middle thing is going
          upwards, I don't like how there's the bar in the middle of it, it kinda
          covers everything."* Correct: `BandChip` sits at BAND_Y and the lift car
          rises straight through BAND_Y, so for the back half of both shots a black
          bar was parked on the one object the scene is about — with the section
          header stacked right above it. The chip goes to the FOOT of the frame in
          these two scenes, where the shaft has nothing behind it. */}
      <NearShade top={694} z={86} k={0.4} />
      <Chip t={chip} y={708} c={INK} fg="#F6F2E8" s={0.84} z={94} />
      <Edge side="l" c="#0A0E14" w={50} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE BRIEF GOES IN — 12.67 to 15.44s (83f)
   VO: "You can tell your team to build an app, have one agent plan the
        architecture,"
   ⛔ MEASURED: "build an app" f21 · "have one agent" f40 · "architecture" f66.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* the car collects the brief at the bottom and rides to ARCHITECTURE */
  /* ⛔ the car did not start until local f14, so the scene opened on a stationary
     shaft — and an IO ease is slowest at BOTH ends, which is where LIFT-A's twelve
     dead windows came from. It starts on frame 2 and runs nearly linear, so the
     shaft is always moving. */
  const car = E(f, 2, 74, 0.0, 0.30, LIN);
  const bp  = E(f, 58, 80, 0, 1, OUT);
  /* ⭐ REV 34 — LIFT-A ran 2.77s in one framing. It cuts in at f42 onto the car
     and the job ticket it is carrying, which is also the object the scene is
     about and was previously only ever seen wide. */
  return <LiftScene v={v} dur={dur} car={car} stage={bp} punch={f >= 42 ? 1 : 0}
    chip="ONE JOB, FOUR FLOORS" ring={bp > 0.9 ? 62 : -1} />;
};

/* =========================================================================
   S5 · IT RIDES UP — 15.44 to 18.50s (92f)
   VO: "another build the frontend, another handle the backend, and another
        review the code for security."
   ⛔ MEASURED: "another handle the backend" f20 · "and another review" f52 ·
   "for security" f79 — the car reaches each floor ON the word that names it.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ these three eases had GAPS between them (18->20, 48->52) and each is an
     OUT ease that is slowest at its end, so the car visibly stopped between
     floors — LIFT-B's five dead windows. They overlap now: the car is always
     moving, it just changes speed as it passes each landing. */
  const fe = E(f, 0, 24, 0, 1, LIN);
  const be = E(f, 18, 54, 0, 1, LIN);
  const se = E(f, 46, 88, 0, 1, LIN);
  /* the car steps floor to floor, arriving on each spoken role */
  const car = 0.30 + fe * 0.21 + be * 0.23 + se * 0.25;
  return <LiftScene v={v} dur={dur} car={car} stage={1 + fe + be + se}
    chip="FRONTEND · BACKEND · SECURITY" ring={se > 0.92 ? 84 : -1} />;
};

/* =========================================================================
   S6 · THE NIGHT FLOOR — 20.54 to 23.72s (95f)
   VO: "And they don't need salaries or sleep, so they can keep working
        forever."

   ⛔⛔ THIS IS WHERE THE VILLAIN LOSES, AND IT MUST LOSE WITH NOBODY THERE.
   That is what "no salaries or sleep" actually means, and it is the only shape
   of this beat that is not just a clock on a wall. The hero's stool is EMPTY —
   he went home — and the pile goes down anyway.

   ⭐ A NUMBER IS NEVER TYPESET AT ITS VALUE: "24/7" is said by an hour hand
   going all the way round twice with the lamps staying on, not by the string.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔⛔⛔ REV 12 — SCRAPPED. Alex: *"at 20 seconds it needs to be completely
     redo that scene like scrap it and completely redo it more interesting."*

     The cause was a WORLD MISMATCH, not a bad scene. The hook and the proof beat
     are a TOWER and S2/S3 are OFFICES, but this was still the industrial build
     line from four revisions ago — a shop floor, a pay board on a wall, a ticket
     pile. The last third of the reel was set somewhere the first two thirds had
     stopped being, and that reads as boring because it reads as unrelated.

     ⭐ "They don't need salaries or sleep, so they can keep working forever" gets
     the one picture only a tower can give: THE WHOLE BUILDING FROM OUTSIDE, AT
     NIGHT, EVERY WINDOW STILL LIT — with the blocks either side of it dark.
     The clock runs a full day round and the lights do not change. Nobody leaves.
     ⛔ MEASURED: "salaries" f18 · "sleep" f36 · "keep working" f57 · "forever" f70. */
  const turns = E(f, 4, 84, 0, 2, LIN);            /* a full day, twice        */
  const pay   = E(f, 18, 34, 0, 1, BACK);          /* the pay window shutters  */
  return (
    <Scene p={asPlace("night")} slug="" push={[0, dur, 1.02]} vig={0.34}>
      {/* ⛔⛔⛔ REV 30 — THE MOTION WAS SPIKY, NOT LOW. Measured in 12-frame
          windows across the whole reel, this build had **62 near-frozen windows
          (Δ < 1.5) against the winners' 2-4**, while its AVERAGE sat right in
          their band. That is the shape behind every "at X seconds it's boring"
          note in this build: bursts separated by dead patches, which averages fine
          and watches badly. THIRTY of the 62 were in this one scene — a static
          grid of lit windows with a punch at f42 and nothing either side of it.

          ⭐ A slow continuous CRAWL up the facade replaces the punch. It never
          exceeds a couple of pixels a frame, so it adds no churn, and the panel is
          never still — which is what the winners actually do. */}
      {/* ⭐ REV 34 — NIGHT ran 2.80s in one framing, above every winner's cap.
          One hard cut at f44 to a tighter framing of the same building. */}
      <Shots f={f} frames={[{ at: 0 }, { at: 44, s: 1.26, x: -34, y: -52 }]} z={26}>
       <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
         transform: `translateY(${(18 - f * 0.42).toFixed(2)}px) scale(${(1.03 + f * 0.0011).toFixed(4)})`,
         transformOrigin: "50% 100%" }}>
        {/* ⛔ this lives INSIDE <Shots>: that wrapper carries z=26 and therefore
            forms a stacking context, so a sky drawn after it at z=27 sat on top
            of the entire building. Inside the group, z=27 is above NightTower's
            own night sky (z-4) and below its blocks (z-2) and its tower (z). */}
        {/* ⭐ THE SKY RUNS A WHOLE DAY AND THE BUILDING DOES NOT NOTICE. "They
            don't need salaries or sleep, so they can keep working forever" is a
            claim about TIME, so time has to visibly pass: night → dawn → day →
            dusk → night behind the tower, twice, while every window stays lit and
            the clock spins. Nothing about the building changes, which is the joke
            and also the only thing in the shot that can carry three seconds. */}
        {(() => {
          const d = (E(f, 0, 84, 0, 1, LIN) * 2) % 1;
          const SKYS = ["#070C1A", "#3A3350", "#8C6A63", "#A9BDD2", "#7FA6C8",
                        "#B08A6A", "#4A3B50", "#0B1020"];
          const k1 = Math.floor(d * SKYS.length) % SKYS.length;
          const k2 = (k1 + 1) % SKYS.length;
          const t = (d * SKYS.length) % 1;
          return (
            <div style={{ position: "absolute", inset: 0, zIndex: 27,
              background: `linear-gradient(180deg,${dkh(SKYS[k1], 0.08)} 0%,${mxh(SKYS[k2], t * 0.45)} 100%)` }}>
              {/* our own stars, which fade out when the sun is up */}
              {Array.from({ length: 34 }, (_, i) => (
                <div key={"sc" + i} style={{ position: "absolute", left: (i * 97) % 1004,
                  top: 14 + ((i * 61) % 240), width: 3, height: 3, borderRadius: "50%",
                  background: "#FFFFFF",
                  opacity: (0.3 + ((i * 13) % 5) * 0.13) * (d < 0.2 || d > 0.72 ? 1 : 0.04) }} />
              ))}
              <div style={{ position: "absolute", left: `${6 + d * 86}%`,
                top: `${14 + Math.abs(Math.sin(d * Math.PI * 2)) * 30}%`, width: 78, height: 78,
                borderRadius: "50%", background: d < 0.5 ? "#F6E7B6" : "#FFF3D2",
                opacity: 0.92, boxShadow: `0 0 76px ${hexa("#FFE9A8", 0.62)}` }} />
            </div>
          );
        })()}
        <NightTower f={f} k={1} cols={7} rows={7} z={30} />
       </div>
      </Shots>


      {/* ⭐ THE CLOCK ON THE FACADE, running the day round while nothing changes */}
      <WallClock x={506 + L.b * 0.3} y={118} f={f} s={1.05} z={86} turns={turns} />

      {/* ⛔⛔⛔ REV 20, ALEX: *"at nineteen seconds when it says the zero dollar
          payroll part, it's completely covered. It's not good. All of that is
          just not good, it just needs to be completely redone there."*

          MEASURED: the plate was 148x44 and "$0 PAYROLL" at 27px wrapped to two
          lines and overflowed it on both sides, so half the words sat as dark
          green on dark navy shutters — unreadable. A box sized to a guess
          instead of to its content.

          ⭐ Redone the way the rest of the reel states a number: LARGE TYPE, NO
          PLATE (`feedback_when_the_info_is_the_number_the_box_is_decoration`),
          on its own scrim at the foot of the frame with nothing behind it. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, height: 292, zIndex: 82,
        opacity: pay,
        background: "linear-gradient(180deg,rgba(7,11,22,0) 0%,rgba(7,11,22,0.88) 44%,rgba(7,11,22,0.95) 100%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 556, zIndex: 88,
        textAlign: "center", opacity: pay,
        transform: `translateY(${((1 - pay) * 54).toFixed(1)}px)` }}>
        <div style={{ ...mono(158, 900), color: GREEN, lineHeight: 0.88,
          textShadow: "0 7px 0 #0D3A28, 0 0 9px #05070A, 0 12px 30px rgba(0,0,0,0.78)" }}>
          {R.price}
        </div>
        <div style={{ ...ui(38, 900), color: "#F6F2E8", letterSpacing: "0.24em", marginTop: 10,
          textShadow: "0 3px 14px rgba(0,0,0,0.9)" }}>PAYROLL</div>
      </div>

      {/* the one who went home, small, on the street below */}
      <Contact x={112 + L.a * 0.3} y={GY + 62} w={132} o={0.30} />
      <Hero f={f} x={158 + L.a * 0.3} y={GY + 70} size={152} z={85} act={3} ph={0.5}
        costume={{ constr: 1 }} gaze={-1.0} />
      <NearShade top={720} z={88} k={0.30} />
      <BandChip t="NOBODY CLOCKS OUT" c={INK} />
      <Edge side="r" c="#070B16" w={54} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE DESK — "You literally get an entire AI dev team on your laptop."
   ⭐ THE SCALE COLLAPSE, and now that the team lives in a BUILDING, the thing
   that collapses is the building.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  /* ⛔ MEASURED: "entire" f19 · "on your" f51 · "laptop" f61 */
  const fold = E(f, 4, 48, 0, 1, IO);
  const open = E(f, 34, 58, 0, 1, BACK);
  /* ⛔⛔ REV 14 — Alex: *"at 23 seconds that animation doesn't fit on the laptop
     and not interesting here either."* Two separate faults.

     THE FIT was a real bug: `NightTower` drew itself in PANEL coordinates
     (CW 108 / X0 152 / Y0 150 on 1012x792) and S7 renders it inside the laptop
     lid, whose clipped content box is 623x399. A fifth of the building fell
     outside the lid and the rest sat against the left edge. It now takes a
     `fit` and sizes itself to the box it is in.

     THE DEAD LID was the second: the screen was a black rectangle for the eight
     frames the lid took to swing up, and `k` — the prop that was supposed to
     drive the boot — was accepted and never used. The windows now come up in a
     bottom-up cascade keyed to how far the lid has opened, so the screen fills
     as it rises and is never empty.

     ⭐ AND THE ROOM. "The whole team. Your laptop." only lands if BOTH halves
     are in frame: the real tower still burning outside the window, and the same
     building, small, on the screen. So this is a high floor at night with the
     city behind it, and the crew comes to the desk to look. */
  /* ⛔ the boot has to be AHEAD of the lid, not behind it — at 40..76 the lid
     was fully up while the screen was still 3% lit, which is the dead black
     rectangle the fit bug was hiding. */
  const boot = E(f, 32, 60, 0, 1, OUT);
  const on   = E(f, 30, 40, 0, 1, OUT);
  const DX = 512 + L.b * 0.3;
  /* the lid's clipped content box at s=1.24: 520*1.24 - 2*9*1.24 by 340*1.24 - … */
  const FIT = { w: 622, h: 399 };
  return (
    <Scene p={asPlace("desk")} slug="" push={[0, dur, 1.03]} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#101A2C 0%,#1A2740 54%,#22181A 100%)" }} />
      {/* ⭐ THE CITY STILL AWAKE BEHIND HIM — the reel's own tower, out there */}
      <div style={{ position: "absolute", left: 54 + L.a * 0.3, top: 74, width: 904, height: 392,
        zIndex: 4, overflow: "hidden", background: "linear-gradient(180deg,#0A1024,#1B2745)" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.72 }}>
          <NightTower f={f} k={1} cols={7} rows={4} z={4} fit={{ w: 904, h: 392 }} />
        </div>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div key={"mu" + i} style={{ position: "absolute", left: 54 + L.a * 0.3 + i * 226,
          top: 74, width: 14, height: 392, zIndex: 12, background: "#0A0E14" }} />
      ))}
      <div style={{ position: "absolute", left: 54 + L.a * 0.3, top: 74, width: 904, height: 392,
        zIndex: 13, border: "16px solid #1E2732", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 40 + L.a * 0.3, top: 460, width: 932, height: 26,
        zIndex: 14, background: "linear-gradient(180deg,#6A5F4A,#332C20)" }} />

      <HeroKey x={DX} y={470} r={400} c="#FFF4D8" z={24} k={0.96} />

      {/* the whole lit tower folding down onto the desk */}
      <TowerToLaptop f={f} k={fold} z={36} />

      {/* the desk, and the lamp that lights it */}
      <div style={{ position: "absolute", left: 44, top: 646, width: 924, height: 30, zIndex: 50,
        background: "linear-gradient(180deg,#C9B693,#8A7551)", border: "5px solid #2E2418",
        boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 830, top: 470, width: 120, height: 176, zIndex: 52,
        background: `linear-gradient(180deg,${hexa(GOLD, 0.30)},rgba(0,0,0,0))`,
        clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)" }} />

      <Laptop x={DX} y={664} s={1.24} z={74} open={open} f={f}>
        {/* ⛔ REV 19 — the screen used to carry the SAME night-tower grid as the
            window behind it, so two thirds of the frame was one texture at two
            sizes. It carries the TEAM now: a roster of agent cards dealing in
            one at a time, each with a face, a role off the repo's own list, a
            job bar that runs and a status lamp. A different OBJECT, so the two
            halves of the shot finally read as two different things. */}
        <div style={{ position: "absolute", inset: 0, opacity: on }}>
          <AgentGrid f={f} k={boot} cols={4} rows={4} fit={FIT} z={2} />
        </div>
      </Laptop>
      {open > 0.9 && <Ring x={DX} y={560} f={f} at={54} c="#FFE0A0" z={84} s={1.7} />}
      {fold > 0.9 && <Puff x={DX} y={656} f={f} at={46} c="#D8CCB4" z={80} n={12} s={1.3} />}

      {/* ⭐ THE CREW COMES TO LOOK — the beat is a reveal, so someone reacts */}
      <Contact x={106 + L.a * 0.4} y={GY - 8} w={176} o={0.32} />
      <Hero f={f} x={158 + L.a * 0.4} y={GY} size={222} z={86} act={2} ph={0.5}
        costume={{ constr: 1 }} gaze={0.9} cheer={on} />
      <Crew f={f} x={892} y={GY + 6} i={13 + SEED[v]} size={196} z={85} at={0} loop={1} flip />
      <NearCrew f={f} n={2} y={836} z={84} at={26} size={196} seed={27 + SEED[v]} />
      <NearShade top={702} z={88} k={0.40} />
      <BandChip t="THE WHOLE TEAM. YOUR LAPTOP." c={INK} />
      <Edge side="l" c="#241C12" w={70} z={92} kind="wall" />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE CTA — 26.46 to 28.12s (50f)
   VO: "Comment Agents for the free repo."
   ⛔ HARD CUT ON THE KEYWORD — nothing after it.
   ⛔ THE NEAR BAND GOES BEHIND THE ONE WORD THE PICTURE SPELLS OUT. On reel 132
   it covered the keyword, which is the entire call to action.
   ====================================================================== */
/* =========================================================================
   S8 · THE CTA — 23.84 to 25.42s
   ⛔⛔⛔ REV 17, ALEX: *"between the animation of twenty one seconds and twenty
   five seconds it's still quite boring — it's the same kind of thing I'm looking
   at for the next four seconds."*

   He is exactly right and it is a COMPOSITION problem, not an animation one.
   S7 is a wall of lit windows behind a desk; S8 was a wall of lit windows behind
   a keyword. Same grid, same scale, same camera, four seconds. Giving the
   windows six different interiors (rev 16) made each cell better and did nothing
   about the fact that the SHOT had not changed.

   ⭐ SO THE CAMERA FINALLY GOES OUTSIDE. The whole reel happens inside this
   building — the lobby, the lift, four floors, a desk at night — and we have
   never once seen it. The last shot is street level at night, looking UP the
   face in steep perspective: sky and stars at the top, the tower receding to a
   vanishing point, the crowd on the pavement, and the keyword on the building's
   own illuminated sign. Different vantage, different scale, different geometry —
   which is what "the same thing for four seconds" actually asks for.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const L = LAY[v];
  const up = E(f, 0, 14, 0, 1, OUT);
  const pour = E(f, 6, 46, 0, 1, LIN);
  const lift = E(f, 0, 26, 0, 1, OUT);          /* the last of the camera move */

  /* the face in perspective: nine bands, each narrower and shorter than the one
     below it, stacked from the pavement up toward a vanishing point */
  const N = 9, VX = 506;
  const bands: { y: number; h: number; hw: number }[] = [];
  let yy = 660;
  for (let r = 0; r < N; r++) {
    const t = r / (N - 1);
    const h = 96 * (1 - t * 0.70);
    yy -= h;
    bands.push({ y: yy, h, hw: 452 * (1 - t * 0.62) });
  }
  return (
    <Scene p={asPlace("night")} slug="" push={[0, dur, 1.04]} vig={0.42}>
      {/* the night above the city */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(180deg,#070C1A 0%,#101A33 34%,#1D2B44 66%,#2A3550 100%)" }} />
      {Array.from({ length: 40 }, (_, i) => (
        <div key={"st" + i} style={{ position: "absolute", left: (i * 97) % 1004,
          top: 12 + ((i * 61) % 210), width: 3, height: 3, borderRadius: "50%", zIndex: 2,
          background: hexa("#FFFFFF", 0.3 + ((i * 13) % 5) * 0.13) }} />
      ))}
      {/* the neighbours, also in perspective, so the street has walls */}
      {[0, 1].map((sd) => (
        <div key={"nb" + sd} style={{ position: "absolute", top: 150, bottom: 92,
          left: sd ? undefined : -30, right: sd ? -30 : undefined, width: 250, zIndex: 4,
          background: "linear-gradient(180deg,#0C1424,#18223A)",
          clipPath: sd ? "polygon(0% 16%, 100% 0%, 100% 100%, 0% 88%)"
                       : "polygon(0% 0%, 100% 16%, 100% 88%, 0% 100%)" }}>
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{ position: "absolute", left: 18 + (i % 3) * 74,
              top: 40 + Math.floor(i / 3) * 52, width: 44, height: 30,
              background: (i * 5 + sd) % 4 === 0 ? hexa(GOLD, 0.55) : hexa("#22304F", 0.9) }} />
          ))}
        </div>
      ))}

      {/* ⭐ THE TOWER, FROM THE PAVEMENT — the building the whole reel was in */}
      <div style={{ position: "absolute", inset: 0, zIndex: 10,
        transform: `translateY(${((1 - lift) * 46).toFixed(1)}px)` }}>
        {bands.map((b, r) => (
          <React.Fragment key={"bd" + r}>
            {/* the floor slab, foreshortening as it goes up */}
            <div style={{ position: "absolute", left: VX - b.hw, width: b.hw * 2, top: b.y + b.h - 9,
              height: 11, zIndex: 12,
              background: `linear-gradient(180deg,#8794A4,${dkh("#39434F", 0.2)})`, opacity: 0.95 }} />
            {Array.from({ length: 6 }, (_, c) => {
              const wpad = b.hw * 2 * 0.05, ww = (b.hw * 2 - wpad * 2) / 6;
              const on = ((c * 7 + r * 3) % 9) !== 4;
              return (
                <div key={"wn" + c} style={{ position: "absolute", zIndex: 13,
                  left: VX - b.hw + wpad + c * ww + 3, width: ww - 7,
                  top: b.y + 5, height: b.h - 17, boxSizing: "border-box",
                  border: `${Math.max(2, 4 - r * 0.3)}px solid #070B16`,
                  background: on
                    ? `linear-gradient(180deg,${hexa("#FFE9A8", 0.95 - r * 0.05)},${hexa("#D8A64C", 0.9 - r * 0.05)})`
                    : "#182238", overflow: "hidden" }}>
                  {on && r < 5 && (
                    <div style={{ position: "absolute", left: "34%", bottom: "16%",
                      width: `${26 - r * 3}%`, height: `${44 - r * 5}%`,
                      borderRadius: "26% 26% 0 0", background: CLAY,
                      transform: `translateX(${Math.sin(f / (16 + ((c + r) % 7)) + c) * 4}px)` }} />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
        {/* the mast and its beacon, at the top of the perspective */}
        <div style={{ position: "absolute", left: VX - 5, top: bands[N - 1].y - 74, width: 10,
          height: 74, zIndex: 14, background: "#39434F" }} />
        <div style={{ position: "absolute", left: VX - 13, top: bands[N - 1].y - 92, width: 26,
          height: 26, borderRadius: "50%", zIndex: 15, background: RED,
          opacity: 0.3 + 0.7 * Math.abs(Math.sin(f / 5)),
          boxShadow: `0 0 40px ${hexa(RED, 0.95)}` }} />
      </div>

      {/* the pavement, the canopy over the doors, and the light it spills */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 660, height: 132, zIndex: 20,
        background: "linear-gradient(180deg,#2B3340 0%,#171D26 100%)" }} />
      <div style={{ position: "absolute", left: VX - 300, width: 600, top: 648, height: 26,
        zIndex: 22, background: "linear-gradient(180deg,#C9B693,#7B684A)",
        border: "5px solid #241C12", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: VX - 340, width: 680, top: 672, height: 130,
        zIndex: 21, background: `linear-gradient(180deg,${hexa(GOLD, 0.30)},rgba(0,0,0,0))` }} />

      {/* ⭐ the stars converging ON the keyword — the reel's motif, arriving */}
      {Array.from({ length: 34 }, (_, i) => {
        const t = (pour * 1.7 + i / 34) % 1;
        const ang = (i * 137.5 * Math.PI) / 180;
        const rad = 780 * (1 - t);
        return (
          <div key={"cs" + i} style={{ position: "absolute", zIndex: 40,
            left: VX + Math.cos(ang) * rad * 0.84, top: 400 + Math.sin(ang) * rad,
            ...mono((18 + ((i * 17) % 30)) * (0.35 + t * 1.15), 900),
            color: hexa("#F5C542", Math.min(1, (1 - t) * 2.6)),
            transform: `translate(-50%,-50%) rotate(${t * 300 + i * 21}deg)` }}>★</div>
        );
      })}

      {/* the crowd on the pavement, a near band cropped by the frame */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Crew key={"ct" + i} f={f} x={46 + i * 190 + L.b * 0.3} y={GY + 84 + (i % 3) * 30}
          i={i + 3 + SEED[v]} size={182 + (i % 3) * 46} z={44 + i} at={i * 3} loop={2}
          cheer={1} flip={i % 2 === 1} />
      ))}

      {/* ⛔ THE KEYWORD, ON THE BUILDING'S OWN SIGN */}
      <KeywordPlate x={506} y={372} f={f} at={4} s={1} z={92} />
      {f > 10 && <Ring x={506} y={372} f={f} at={10} c={GOLD} z={91} s={2.0} />}

      {/* ⛔⛔ REV 22, ALEX: *"at the end make sure it's clear they need to COMMENT
          for the repo."* The end frame carried the word AGENTS on a plate and the
          section header said COMMENT — but the plate is the loud object and a
          keyword on its own reads as a title, not an instruction. The VO's last
          line is "Comment Agents for the free repo", so the picture now shows the
          ACTION: a comment field with the word being typed into it, a caret, and
          a send control. Nobody has to infer what to do with the word. */}
      {/* ⛔ THE WRAPPER NEEDS A WIDTH. `left:0; top:0` with no size gives a zero
          box, so a child at `left:0; right:0; textAlign:center` centres inside
          nothing and the line spills off the panel — "COMMENT IT FOR THE FREE
          REPO" rendered as "OMMENT … OR THE". Same family as the transform
          wrappers: an absolutely-positioned parent must be sized before its
          children can lay out against it. */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1012, height: 792,
        zIndex: 78, opacity: up,
        transform: `translateY(${(1 - up) * 90}px)` }}>
        <div style={{ position: "absolute", left: 96, top: 496, width: 820, height: 96,
          background: "#FBF8F0", border: "8px solid #14181E", boxSizing: "border-box",
          display: "flex", alignItems: "center", paddingLeft: 26, gap: 18,
          boxShadow: SH_D }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: CLAY,
            border: "5px solid #14181E", boxSizing: "border-box" }} />
          <span style={{ ...ui(40, 900), color: "#14181E", letterSpacing: "0.02em" }}>
            {R.keyword.slice(0, Math.max(0, Math.round(E(f, 12, 30, 0, R.keyword.length, LIN))))}
          </span>
          <span style={{ display: "inline-block", width: 6, height: 48, background: "#14181E",
            opacity: Math.floor(f / 4) % 2 ? 0.95 : 0.15 }} />
          <div style={{ marginLeft: "auto", marginRight: 22, padding: "12px 26px",
            background: f >= 32 ? GREEN : "#C9D2DC", border: "5px solid #14181E",
            boxSizing: "border-box", ...ui(30, 900), color: "#14181E",
            transform: `scale(${f >= 32 && f < 38 ? 1.1 : 1})` }}>POST</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 606, textAlign: "center",
          ...ui(33, 900), color: "#F6F2E8", letterSpacing: "0.1em", whiteSpace: "nowrap",
          textShadow: "0 3px 14px rgba(0,0,0,0.92)" }}>
          COMMENT IT FOR THE FREE REPO
        </div>
        <RepoPlate x={506} y={712} f={f} s={0.44} z={76} on={1} stars={1} agents={1} />
      </div>

      <NearShade top={704} z={86} k={0.30} />
    </Scene>
  );
};
