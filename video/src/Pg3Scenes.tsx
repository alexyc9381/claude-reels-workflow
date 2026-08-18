import React from "react";
import { useCurrentFrame } from "remotion";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh,
  CLAY, GOLD, GREEN, RED, SKY, INK, PAPER, MUTE, TEAL, VIOLET, MINT,
  R1, R2, R3, KEYWORD, PROVIDERS, CANDIDATES,
  Scene, Cam, asPlace, Ring, Puff, Rake, Pool, Lamp, Tag, LogoTile,
  Mark, MarkCast, Contact, Spine, Cartridge, RepoCard,
  rock, shake, squash, idle, drift,
} from "./Pg3World";
import { SetFor, CrateWall, Gantry, Chutes, Diverter, ProviderGrid } from "./Pg3Sets";
import {
  Actor, Worker, Walker, Crowd, costumeFor, Hatch, CandidateCard, HandStack,
  Rig, Endpoint, CableRun, Shutter, Beacons, Cascade, CoinFall, Mound, Counter,
  Spool, ContextBar, SessionLine, CancelBubble, StampPlate, ClaimPlate, ManifestBoard,
  Titan, Monolith, Popper, Podium, SpriteSuck, TierGate, MarkNum, CatGlyph, CAT_C,
  CapacityTank, Coupler, Finding, Catenary,
} from "./Pg3Props";

/* ===========================================================================
   REEL 109 "PLUGINS3" · THE SCENES.  Board: storyboards/109-plugins3.md.

   ⛔⛔ EVERY SCENE NEEDS ONE THING TO HAPPEN — a before state, a trigger,
      TRAVEL, and an arrival that COSTS something. A cut is not an event: four
      framings in which nothing happens is four posters in a row.

   ⛔⛔ ARRIVALS ARE SPREAD ACROSS THE **FULL** DURATION. A rebuild that put
      every object inside the first 34 of 70 frames measured 5.94 (under bar)
      despite being better in every other way; staggering them across the whole
      scene took it to 7.28.

   ⛔ `Scene` push is SCENE-LOCAL and crops progressively: keep content at
      `left >= 506 - 486/push`. At 1.075 that is left >= 54.
   ⛔ ONE text chip per shot, in a band nothing else enters.
   ⛔ Anything passed as `children` sits UNDER the vignette (z97). Frame-wide
      effects that must not be dimmed go in the `overlay` slot.
   ⛔ Every timed effect below is stated in SCENE-LOCAL frames and checked
      against its own scene's length — the reel-104 trap was an alarm that armed
      at local frame 68 of a 61-frame shot and therefore never fired.
   ========================================================================= */

const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });
const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w });

export type Variant = "night" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content. */
/* ⛔⛔ MEASURED, AND THE FIRST ATTEMPT FAILED ON THE HALF I WAS NOT WATCHING.
   With three different hooks the HOOK delta cleared easily (37.5 / 38.4 / 40.4
   against a bar of 30) and the BODY came back **16.5 · 14.7 · 22.0** — two pairs
   under the bar of 20. The reason is visible in which pair passed: amber-vs-steel
   was fine and everything-vs-NIGHT was not, because night ran the IDENTITY
   camera. The two variants differed from each other and neither differed from the
   reference.

   ⭐ So all THREE get a camera, positioned as three corners of the space rather
   than "a default and two nudges", and each also DRIFTS on its own periods — a
   static offset differs by a constant, a drift differs by a different amount in
   every single frame, which is what a per-frame delta actually measures.
   ⛔ The transform stays INSIDE the panel (`CamCtx`), never on the composition:
   scaling the comp moves the chassis off its fixed position and wrecks the motion
   audit (8.12 at scale 1.0 vs 3.72 at 1.038 on identical content). */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  night: { dx: 0, dy: -16, s: 1.000, rot: 1.0 },
  amber: { dx: -20, dy: 10, s: 1.026, rot: -0.9 },
  steel: { dx: 20, dy: 6, s: 1.048, rot: 0.2 },
};

/** the per-frame drift, different periods per cut so no two frames share an offset */
const DRIFT: Record<Variant, number[]> = {
  /*        dxAmp dxT  dyAmp dyT   sAmp   sT   rotAmp rotT */
  night: [   9,   71,    7,   83,  0.006,  97,  0.30,  113],
  amber: [  11,   53,    8,   61,  0.007,  79,  0.36,   89],
  steel: [   8,   43,   10,   97,  0.005,  67,  0.28,  101],
};

export const camFor = (v: Variant, f: number) => {
  const b = CAM[v], [ax, tx, ay, ty, as, ts, ar, tr] = DRIFT[v];
  return {
    dx: b.dx + Math.sin(f / tx) * ax,
    dy: b.dy + Math.cos(f / ty) * ay,
    s: b.s + Math.sin(f / ts) * as,
    rot: b.rot + Math.sin(f / tr) * ar,
  };
};

/** ⭐ a different push CURVE per cut, not just a different end value. `night`
    pushes across the whole scene; `amber` finishes its push at 62% and then
    HOLDS; `steel` is still moving past the cut. Same three scenes, three
    different motion signatures at every boundary — axis 4 of the variant list
    without reaching for a flashing transition, which is banned outright. */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  v === "amber" ? [0, Math.round(dur * 0.62), base + 0.014]
  : v === "steel" ? [0, Math.round(dur * 1.35), base + 0.030]
  : [0, dur, base];

/* =========================================================================
   S0 — THE BAY.  f0-52 (1.73s).  BEAT: HOOK.  Intensity 9.
   VO: "Don't use Claude Code without these 3 plugins."

   ⭐ ONE LOCKED FRAMING, ONE REAL EVENT — the corrected THE-OPEN rule. Reel
      104's five-shot open scored better on every number that doc gives and was
      rejected anyway: "it's just cuts and then nothing happens."

      before  f0      SETTLED AND COMPLETE — the rig with THREE EMPTY LIT
                      SOCKETS, the lead Claude beside it as the scale reference,
                      the claim plate, and all three repo cards already up with
                      their stars and licences. ⭐ Frame 0 is the whole claim;
                      the f4 event pushes PAST it rather than arriving at it.
      trigger f4      the three floor hatches BANG open
      travel  f4-f30  three cartridges rise UP THROUGH THE DECK
      arrival f11 / f18 / f26  each LOCKS into the spine — squash, ring, puff,
                      recoil; LEAD flinches on every hit
      f26-52          the spine fuse runs bottom-to-top and the bay lights

   ⛔ DELIBERATELY NOT REEL 104's OPEN (three plugins ejecting off a wall and
      slamming onto a counter). Different geometry — from BELOW, not across —
      different sound, and it plants the rig that pays off at S10.
   ⛔ FRAME 0 MUST BE SETTLED AND BRIGHT (luma >= 140), carried by the two
      practicals, the floor sheen and the lit board — never by lifting the
      palette's dark stop.
   ====================================================================== */
/* ⛔⛔ V8's HOOK WAS REJECTED ON CONCEPT, NOT EXECUTION. It passed every gate
   (motion 11.30, luma 150.4) and came back as *"the beginning hook animation
   shouldnt have text and it needs to be a way more hierarchical interesting
   concept here"*. Two separate faults, both named in the craft doc:

   1 THE CLAIM WAS TEXT. A 560x430 cream board carrying three repo names, three
     star counts and three licences is `feedback_graphical_over_textual` in its
     purest form — the information density was right and the MEDIUM was wrong.
   2 A CARTRIDGE IS A TRANSLATION. This is `feedback_real_marks_are_the_props`
     landing for the third time across three reels: the mapping was *correct*
     (modules seat into a rig) and it did not matter, because a viewer has to
     decode "cartridge" into "plugin" before anything means anything.

   ⭐ THE SUBJECT'S OWN OBJECT WAS AVAILABLE THE WHOLE TIME. A plugin, a skill,
   a subagent and an MCP server are all HELPERS, and reel 107 already measured
   what a helper is: *"a helper is not a tile, it is a Claude."*

   THE NEW HOOK — ONE SMALL CLAUDE, THREE COLOSSAL ONES.
     before  f0    a bright hall. ONE small Claude alone in a pool of light, and
                   THREE COLOSSAL CLAUDES already standing over him as near-black
                   silhouettes, each more than twice his height. Settled, and it
                   is the whole claim: you are outnumbered, here are three.
     trigger f6    the first titan IGNITES — full clay, its real mark drops in on
                   a banner over its head, the frame shakes
     travel  -     none needed: the event is a state change at colossal scale
     arrival f6 / f15 / f24  one-two-three, each shaking the hall harder, the
                   small Claude reeling further back on every one
     f24-52        all three lit, the hall at full colour, the count plate lands

   ⭐ AND IT FIXES THE HIERARCHY NOTE AT THE SAME TIME. "Hierarchy needs
   DARKNESS" and THE-OPEN's ">=140 luma at frame 0" look like opposites and are
   not: a BRIGHT hall containing three near-black masses has a high mean luma
   AND the biggest value gap in the reel. Brightness is the mean; hierarchy is
   the spread.
   ⛔ NO PROSE. The only glyphs in this scene are three real logo marks and one
   numeral (the combined star count). Every word the hook needs is already in
   the header band, which is on for all 950 frames.
   ====================================================================== */
const IGNITE = [6, 15, 24];

/* =========================================================================
   ⭐⭐ THREE HOOKS, ONE PER TRIAL CUT.

   `feedback_trial_reel_variants`: *"it cant be too similar since instagram is
   starting to flag."* A variant is NOT a re-render, and the axes are ranked —
   **a completely different animated HOOK is most of the signal**, because the
   opening seconds are what a perceptual hash samples hardest. v1 of these cuts
   varied only the camera offset and the caption band, i.e. axes 3 and 5, the two
   weakest on the list.

   So the three cuts get three different WORLDS, PROPS, ACTIONS and EXITS — and
   crucially three different GEOMETRIES, because a restyle of one action reads as
   the same shot:

     night · THE IGNITION  three colossal Claudes standing in a bay IGNITE in
                           place, one-two-three.            geometry: STATIC, value
     amber · THE PICK      a bright rack wall of 54 small dark Claudes; a beam
                           sweeps it and THREE BLAST TOWARD CAMERA, scaling from
                           54px to 300px.                   geometry: DEPTH, scale
     steel · THE TOWER     one giant already standing; two more DROP FROM ABOVE
                           and stack onto its shoulders.    geometry: VERTICAL, build

   ⛔ All three obey the same laws: frame 0 settled and >=140 luma, no prose, the
   Claude mark present, one small hero as the scale reference, and an event with
   a before / trigger / travel / arrival.
   ⭐ AMBER also carries the reel's honest subtext for free: a wall of hundreds
   with three picked out of it is what "there are hundreds of plugins, these are
   the three" actually looks like.
   ====================================================================== */

/** amber — THE PICK. Fifty-four helpers on a lit rack, three chosen. */
const S0Pick: React.FC = () => {
  const f = useCurrentFrame();
  const BLAST = [10, 19, 28];
  const sweep = E(f, 2, 30, -1, 10, LIN);
  const CH = [13, 31, 44];                       /* which cells get picked */
  return (<>
    {/* the rack the wall hangs on — BRIGHT, so 54 dark sprites read as a mass
        against it and frame 0 still clears the luma law */}
    {[0, 1, 2, 3, 4, 5].map((r) => (
      <div key={"rk" + r} style={{ position: "absolute", left: 46, right: 46, top: 232 + r * 78,
        height: 13, borderRadius: 6, background: "#D8DCEA", zIndex: 18 }} />
    ))}
    <div style={{ position: "absolute", left: 40, right: 40, top: 150, bottom: 214, zIndex: 16,
      borderRadius: 16, background: "linear-gradient(172deg,#CBD2E6 0%,#9AA4C4 100%)",
      border: "6px solid #E6EAF6" }} />

    {Array.from({ length: 54 }, (_, i) => {
      const cx = i % 9, cy = Math.floor(i / 9);
      const picked = CH.indexOf(i);
      const lit = sweep >= cx + cy * 0.3;
      if (picked >= 0) return null;              /* the three are drawn below */
      return (
        <div key={"wl" + i} style={{ position: "absolute", left: 74 + cx * 96, top: 168 + cy * 78,
          zIndex: 22, opacity: lit ? 0.94 : 0.62,
          filter: `brightness(${lit ? 0.62 : 0.30})` }}>
          <Mascot lf={f + i * 5} size={58} nodAmp={lit ? 3.2 : 1.4} nodSpeed={11}
            {...costumeFor(i)} />
        </div>
      );
    })}
    {/* the beam that picks — a hard travelling edge, light against its shadow */}
    {sweep > -0.9 && sweep < 10 && (<>
      <div style={{ position: "absolute", left: 44 + sweep * 96, top: 150, width: 58, bottom: 214,
        zIndex: 30, background: `linear-gradient(90deg,rgba(6,8,16,0.42) 0%,${hexa("#FFF3D4", 0.86)} 52%,rgba(6,8,16,0.30) 100%)` }} />
    </>)}

    {/* ⭐ THE THREE, BLASTING TOWARD CAMERA — 58px on the rack to 300px at the
        front. Depth and scale, the geometry the other two hooks do not use. */}
    {CH.map((cell, i) => {
      const cx = cell % 9, cy = Math.floor(cell / 9);
      const at = BLAST[i];
      const k = E(f, at, at + 10, 0, 1, OUT);
      const x0 = 74 + cx * 96 + 29, y0 = 168 + cy * 78 + 29;
      const x1 = 208 + i * 300, y1 = 636;
      const x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k;
      const sz = 58 + (300 - 58) * k;
      const land = f >= at + 10;
      return (<React.Fragment key={"pk" + i}>
        <div style={{ position: "absolute", left: x - sz / 2, top: y - sz * 0.62, zIndex: 60 + i,
          transform: `rotate(${(1 - k) * (i % 2 ? 16 : -16)}deg) scaleY(${squash(f, at + 9, 0.24)})`,
          transformOrigin: "50% 92%",
          filter: land ? undefined : `brightness(${0.34 + k * 0.66})` }}>
          <Mascot lf={f + i * 11} size={sz} nodAmp={land ? 4.4 : 0} nodSpeed={9}
            {...[{ constr: 1 }, { suit: 1 }, { prof: 1 }][i]} />
        </div>
        {land && (
          <div style={{ position: "absolute", left: x - 74, top: y - sz * 0.62 - 106, zIndex: 66,
            width: 148, height: 122, borderRadius: 16, background: PAPER,
            border: `5px solid ${dkh([CLAY, SKY, GREEN][i], 0.14)}`, boxShadow: SH_D,
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("logos/" + ["anthropic.svg", "openrouter.svg", "github.svg"][i])}
              style={{ width: 92, height: 92, objectFit: "contain" }} />
          </div>
        )}
        <Ring x={x} y={y + sz * 0.32} f={f} at={at + 9} c={GOLD} z={58} max={sz * 1.2} dur={18} />
        <Puff x={x} y={y + sz * 0.32} f={f} at={at + 9} c="#C8C2B0" z={57} n={9} s={sz / 220} />
      </React.Fragment>);
    })}
  </>);
};

/** steel — THE TOWER. One giant standing, two more dropped onto its shoulders. */
const S0Tower: React.FC = () => {
  const f = useCurrentFrame();
  const DROP = [9, 22];
  const shake2 = DROP.reduce((a, l) => a + shake(f, l + 8, 11, 9).x, 0);
  const LV = [
    { y: 700, logo: "anthropic.svg",  c: CLAY,  cos: { constr: 1 } },
    { y: 546, logo: "openrouter.svg", c: SKY,   cos: { suit: 1 } },
    { y: 392, logo: "github.svg",     c: GREEN, cos: { prof: 1 } },
  ];
  return (
    /* ⛔⛔ THIS WRAPPER NEEDS ITS OWN zIndex. v1 of this hook rendered COMPLETELY
       EMPTY: a transformed div creates a stacking context, and without an
       explicit z it painted behind the set. It is the reel-93 trap written at
       the top of Pg3World.tsx — "a transformed wrapper with NO zIndex VANISHES,
       use `Cam`, which carries an explicit z" — and I wrote a bare div anyway.
       Caught by looking at the still, which is the only reason it did not ship. */
    <div style={{ position: "absolute", inset: 0, zIndex: 40,
      transform: `translateX(${shake2 * 0.6}px)` }}>
      {LV.map((l, i) => (
        <Titan key={"tw" + i} f={f} x={556} y={l.y} at={i === 0 ? -999 : DROP[i - 1]} s={190}
          z={52 + (3 - i)} logo={l.logo} c={l.c} costume={l.cos} seed={i * 5}
          standing={i === 0} bannerDX={266} bannerDY={122} />
      ))}
      {/* the small one at the foot of it, looking up */}
      <Actor f={f} x={214} y={748} s={116} z={70} seed={4} glasses={1}
        gaze={-0.8}
        shock={DROP.reduce((a, l) => a + Math.max(0, E(f, l + 8, l + 18, 1, 0, OUT)), 0)}
        lean={DROP.reduce((a, l) => a + rock(f, l + 8, 8, 20), 0)} />
      <Pool x={556} y={742} w={520} c="#FFF6E0" o={0.40} z={30} />
    </div>
  );
};

export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const jolt = IGNITE.reduce((a, l) => a + shake(f, l, 9, 8).x, 0);
  /* ⛔ AND THE 0.70 FACTOR WAS WRONG TOO. `SlopKit.Mascot` draws its body at
     very nearly the full `size`, not 70% of it, so s=352 on a 320 pitch still
     OVERLAPPED and the three rendered as one continuous black band across the
     lower half of the frame. Measured off the render, not the algebra — the same
     lesson as the floating crown: **read the pixels, don't trust the maths.**
       body ~= 1.00 x s = 286px at s=286, on a 310px pitch -> a 24px gap. */
  const TIT = [
    { x: 196, logo: "anthropic.svg",  c: CLAY,  cos: { constr: 1 } },
    { x: 506, logo: "openrouter.svg", c: SKY,   cos: { suit: 1 } },
    { x: 816, logo: "github.svg",     c: GREEN, cos: { prof: 1 } },
  ];
  return (
    <Scene p={asPlace("bay")} slug="" push={push(v, 52, 1.055)} vig={v === "amber" ? 0.30 : 0.34}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        transform: `translateX(${v === "night" ? jolt * 0.7 : 0}px)` }}>
        <SetFor k="bay" f={f} />

        {v === "night" && (<>
          <MarkCast x={824} y={112} s={120} z={13} o={0.20} f={f} spin={0.14} />
          {TIT.map((t, i) => (
            <Titan key={"tt" + i} f={f} x={t.x} y={664} at={IGNITE[i]} s={286} z={54 + i}
              logo={t.logo} c={t.c} costume={t.cos} seed={i * 3} standing />
          ))}
          <Pool x={506} y={720} w={430} c="#FFF6E0" o={0.44} z={30} />
          <Actor f={f} x={506} y={766} s={112} z={76} seed={2} glasses={1}
            shock={IGNITE.reduce((a, l) => a + Math.max(0, E(f, l, l + 10, 1, 0, OUT)), 0)}
            lean={IGNITE.reduce((a, l) => a + rock(f, l, 9, 20), 0)}
            bob={IGNITE.reduce((a, l) => a + E(f, l, l + 6, 0, 12, OUT) - E(f, l + 6, l + 18, 0, 12, IO), 0)} />
        </>)}

        {v === "amber" && <S0Pick />}
        {v === "steel" && <S0Tower />}

        {/* the one numeral, settled at f0 in all three cuts */}
        {/* ⛔ amber's plate was at y=626, i.e. straight on top of the three that
            blast in and land at y=636. Each cut needs its own clear band: night
            has empty wall at the top, amber hangs it over the rack, steel puts it
            beside the tower where the frame is empty. */}
        <MarkNum f={f}
          x={v === "steel" ? 74 : v === "amber" ? 316 : 252}
          y={v === "steel" ? 318 : v === "amber" ? 166 : 150} at={-999}
          logo="claude.svg" v="174,744" c={GOLD} s={v === "night" ? 1.18 : 1.00} z={86} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE CARGO HOLD.  f52-160 (3.61s = 108f).  BEAT: SETUP.  Intensity 6.
   VO: "First is Claude Setup, an official Anthropic plugin that scans your
        entire codebase"

   ⭐ THE SET IS THE MOTION. ~36 crates carrying REAL FILENAMES, and the gantry
      sweeping them is the travelling band AND the trigger, one object. Crates
      behind the beam stay OPEN, so the room itself records the scan's progress
      across the full 108 frames — content that CHANGES is the best motion
      available, and it is the only motion that also means something.
   ⛔ The crates are not containers (§3): the VO's noun is CODEBASE, so each
      crate is a FILE with the name a real repo actually has.
   ====================================================================== */
export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* ⛔⛔ V8 DREW THE CODEBASE AS 36 CRATES OF 96x72 AND WAS TOLD SO:
     *"for claude setup animation that needs to be more interesting its just a
     bunch of small squares"*. ANIMATION-QUALITY §1 says it in advance — LARGE x
     BRIGHT x FAST is the only combination that registers, and small props never
     add up however many you add. One 470x430 mass replaces all 36.
     ⭐ AND THE OUTPUT IS THE FIX FOR THE SECOND HALF OF THE NOTE. What the scan
     produces is not a label, it is a HELPER: seven Claudes burst out of the
     monolith as the read line passes them, each capped with its category GLYPH,
     and they land running. */
  const read = E(f, 8, 96, 0, 1, LIN);
  const POPS = [16, 28, 40, 52, 64, 78, 92];
  return (
    <Scene p={asPlace("hold")} slug="" push={push(v, 108, 1.070)} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="hold" f={f} />

        {/* ONE mass, twelve real strata, a hard read line eating down it */}
        <Monolith f={f} x={92} y={158} w={470} h={438} read={read} z={24} c="#2C5C68" />

        {/* ⭐⭐ WHAT THE SCAN SURFACES. *"need to surface bugs that pop out
            interesting flags etc here"* — and it is the better mechanism as well
            as the better picture: `claude-code-setup` can only recommend
            anything BECAUSE it found something first. Eleven flags stab into the
            code as the red line passes them, each on the row it was found in, so
            the finding and the line that produced it are the same event. The
            helpers below are then the ANSWERS to them. */}
        {[{ at: 12, r: 1, kx: 0 }, { at: 20, r: 3, kx: 1 }, { at: 27, r: 4, kx: 2 },
          { at: 34, r: 6, kx: 0 }, { at: 41, r: 7, kx: 1 }, { at: 48, r: 8, kx: 3 },
          { at: 55, r: 10, kx: 0 }, { at: 62, r: 11, kx: 2 }, { at: 70, r: 13, kx: 1 },
          { at: 78, r: 15, kx: 0 }, { at: 86, r: 16, kx: 3 }].map((g, i) => (
          <Finding key={"fg" + i} f={f} at={g.at} kind={g.kx}
            x={132 + ((i * 143) % 360)} y={182 + g.r * 22} s={1.14} z={44 + (i % 3)} />
        ))}

        {/* the helpers it finds, bursting out sideways and landing running */}
        {POPS.map((at, i) => (
          <Popper key={"pp" + i} f={f} at={at} i={i}
            x0={540} y0={186 + i * 54} x1={122 + (i % 4) * 158} y1={708 - (i % 2) * 62}
            s={152} z={62 + (i % 3)} cat={i % 5} costume={costumeFor(i + 2)} />
        ))}

        {/* ⭐ THE SCAN HAPPENS BECAUSE SOMEBODY IS DOING IT. A big Claude walks
            the face of the monolith with the lamp, and the read line tracks him —
            an action loop that CHANGES THE WORLD rather than one that runs
            beside it. */}
        {/* ⛔ v9 put him at x=172, i.e. INSIDE the monolith's own footprint, so
            he read as stuck to the code rather than reading it. He now rides the
            gantry down its RIGHT face and the lamp throws LEFT across it, which
            is also why the read line moves. */}
        <Actor f={f} x={624} y={196 + read * 400} s={182} z={70} seed={3} prof={1}
          lean={Math.sin(f / 9) * 8} bob={Math.sin(f / 6) * 5} />
        <div style={{ position: "absolute", left: 88, top: 172 + read * 400, width: 470,
          height: 26, borderRadius: 13, zIndex: 68,
          background: `linear-gradient(270deg, ${hexa("#EAFBFF", 0.90)} 0%, ${hexa("#EAFBFF", 0)} 100%)` }} />
        {/* the rail he rides, so the move is motivated by an object */}
        <div style={{ position: "absolute", left: 700, top: 150, width: 14, height: 470,
          borderRadius: 7, zIndex: 40, background: "#1B3A44", border: "2px solid #2C5C68" }} />

        <Walker f={f} x0={880} x1={760} y={748} s={128} z={59} at={12} dur={90} seed={9} fro={1} />
        {/* ⛔ the receipt is a MARK and a NUMERAL. No repo name, no licence line:
            the header band already says CLAUDE SETUP on every frame of this beat. */}
        <MarkNum f={f} x={736} y={162} at={20} logo="anthropic.svg" v="33,639" c={CLAY} s={0.66} z={86} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — THE SORTING SHELF.  f160-267 (3.56s = 107f).  BEAT: SETUP. Intensity 7.5.
   VO: "and recommends the best skills, subagents, and even MCP servers for
        your project"

   ⛔ TWELVE candidates land STAGGERED ACROSS THE FULL 107 FRAMES (last at f94),
      never bunched into the first third. Then the top two in each chute take a
      lit bar — the RANKING, drawn as a VALUE, never typeset as a score.
   ⛔ ⭐ THE HONEST MECHANISM IS THE BETTER PICTURE. The skill RECOMMENDS; it is
      read-only by its own docs. "It installs it" is one motionless event; a
      sort plus a ranking is a scene with an arc. Same trade as reel 104.
   SHAPE: LIST / SORT. ⛔ S5 must be a CONVERGENCE so the two never read as one
      arrangement used twice.
   ====================================================================== */
export const S2: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* ⛔ V8 SORTED TWELVE NAMED CARDS INTO FIVE LABELLED CHUTES — seventeen pieces
     of text in one shot. Same information, no words: five PODIUM columns capped
     with the category glyph, and the helpers themselves climb them. The ranking
     is the HEIGHT, which is the house rule for a value: a number moves to its
     value, it is never typeset at it.
     ⛔ Arrivals staggered across the FULL 107 frames — the last lands at f92. */
  const ARR = [4, 13, 22, 31, 40, 49, 58, 67, 76, 84, 92];
  const CAT = [0, 1, 3, 0, 2, 4, 1, 3, 0, 3, 4];
  /* each column grows as its category fills — the podium itself is an arc */
  const H = [0, 1, 2, 3, 4].map((c) => {
    const n = CAT.filter((x, i) => x === c && f >= ARR[i] + 12).length;
    return E(f, 0, 1, 0, 1, LIN) * Math.min(1, 0.22 + n * 0.30);
  });
  return (
    <Scene p={asPlace("shelf")} slug="" push={push(v, 107, 1.075)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="shelf" f={f} />

        {/* ⛔ SORT was the reel's floor at 8.56 with 66% HOLD: eleven helpers
            arriving is content, but between arrivals the room ran nothing. The
            feed rail above is the background process — always on, full width,
            light against its own shadow. */}
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"fd" + i} style={{ position: "absolute",
            left: ((i * 92 - f * 7.4) % 1200) - 92, top: 150,
            width: 56, height: 26, borderRadius: 6, zIndex: 21,
            background: i % 2 ? hexa("#F7E0BC", 0.62) : "rgba(20,12,4,0.52)" }} />
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, top: 178, height: 12,
          background: "#7A5528", zIndex: 20 }} />

        <Podium f={f} x={56} y={660} pitch={186} z={26} heights={H} />

        {/* the helpers climbing onto their column. ⭐ Each one is a Claude in its
            own costume, arriving in 11 frames with a squash — never a card. */}
        {ARR.map((at, i) => {
          const c = CAT[i];
          const slot = CAT.slice(0, i).filter((x) => x === c).length;
          return (
            <Popper key={"cl" + i} f={f} at={at} i={i}
              x0={-160} y0={200 + (i % 3) * 60}
              x1={100 + c * 186 + (slot % 2) * 52} y1={636 - (60 + H[c] * 190) - slot * 38}
              s={152} z={64 + slot} cat={c} costume={costumeFor(i)} />
          );
        })}

        {/* he is the one running the sort — the lever moves because he moves it */}
        <Worker f={f} x={906} y={734} s={176} z={72} seed={4} phase={0} rate={1.15} suit={1} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — THE BENCH.  f267-311 (1.48s = 44f).  BEAT: PAYOFF 1.  Intensity 8.
   VO: "to 10x your productivity."

   ⛔⛔ NO `10x`. NO MULTIPLIER. NO NUMERAL. Nothing anywhere backs it, so it
      stays in the AUDIO and the picture carries the HANDOFF instead: the stack
      lands in his arms, he staggers, the bench light snaps on and three crew
      arrive and start working. Guard: `MULTIPLIER_BANNED` in Pg3World.
   ⛔ 44 frames is the shortest scene in the reel — every arrival is inside it
      and checked: stack f2-f20, light f10, crew f14/f22/f30. Nothing armed
      later than f30.
   ====================================================================== */
export const S3: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const lightK = E(f, 8, 16, 0.25, 1, OUT);
  /* ⛔ v8 handed over a stack of six abstract plates. What the setup plugin
     actually hands you is the CREW it picked, so the crew is what arrives —
     six Claudes marching in fast and going straight to work, in six different
     costumes. ⛔⛔ STILL NO `10x`, NO MULTIPLIER, NO NUMERAL. */
  return (
    <Scene p={asPlace("bench")} slug="" push={push(v, 44, 1.060)} vig={0.52}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="bench" f={f} lightK={lightK} />

        {/* ⛔ v9 left the top 60% of this room EMPTY. What belongs there is what
            the crew is here to work on: a lit rack of the helpers already seated,
            arriving from the other side so the frame fills from both directions
            across the whole 44 frames. */}
        <Crowd f={f} x={252} y={392} n={4} cols={4} pitchX={182} pitchY={0} s={116} z={50}
          at={8} every={5} from="l" seed={2} />
        <div style={{ position: "absolute", left: 120, right: 90, top: 448, height: 16,
          borderRadius: 8, zIndex: 44, background: "#7A4A3E" }} />
        <div style={{ position: "absolute", left: 134, right: 104, top: 456, height: 7,
          borderRadius: 4, zIndex: 45, background: hexa("#F3C79E", 0.62) }} />

        {/* he takes the weight of a whole crew arriving at once */}
        <Actor f={f} x={158} y={716} s={186} z={72} seed={6} beard={1}
          lean={-10 + rock(f, 6, 13, 20)}
          bob={Math.max(0, E(f, 4, 12, 0, 16, OUT) - E(f, 12, 26, 0, 16, OUT))} />

        {/* ⭐ SIX CLAUDES, BIG AND FAST — 8-frame arrivals, all four action loops,
            six distinct costume levers, 176px pitch against ~124px bodies (the
            spacing law computed before the count, not after). */}
        <Crowd f={f} x={368} y={664} n={6} cols={3} pitchX={176} pitchY={-118} s={132} z={64}
          at={2} every={4} from="r" seed={1} />

        {[6, 12, 18, 24, 30].map((at, i) => (
          <Ring key={"br" + i} x={368 + (i % 3) * 176} y={664 - Math.floor(i / 3) * 118}
            f={f} at={at} c="#F3C79E" z={60} max={170} dur={14} />
        ))}

        {/* ⭐⭐ *"the animation at 9 seconds needs to have something interesting
            there since it was just a plain screen"*. It was: six sprites landing
            in a dark room and then 20 frames of nothing. What is missing is the
            OUTPUT — the whole point of the beat is that work starts happening.
            So the bench THROWS finished work: eight large plates launched in an
            accelerating arc across the full 44 frames, each with a spark ring.
            ⛔ Large, bright, fast and CONTINUOUS — the only combination that
            registers, and the only one that reads as "and then it got quick". */}
        {[3, 7, 11, 15, 19, 24, 29, 34].map((at, i) => {
          const k = E(f, at, at + 16, 0, 1, OUT);
          if (k <= 0) return null;
          const x0 = 300 + (i % 3) * 176;
          const x = x0 + k * (520 + (i % 3) * 90);
          const y = 620 - Math.sin(k * Math.PI) * (250 + (i % 4) * 46) - k * 130;
          return (
            <div key={"ot" + i} style={{ position: "absolute", left: x, top: y, zIndex: 76,
              opacity: 1 - Math.max(0, (k - 0.72) / 0.28) * 0.7,
              transform: `rotate(${k * (i % 2 ? 190 : -190)}deg)` }}>
              <div style={{ width: 96, height: 68, borderRadius: 9,
                background: [PAPER, GOLD, "#F3C79E"][i % 3],
                border: "4px solid rgba(40,14,10,0.40)", boxShadow: SH }} />
              <div style={{ position: "absolute", left: 12, top: 14, width: 56, height: 8,
                borderRadius: 4, background: "rgba(60,26,20,0.34)" }} />
              <div style={{ position: "absolute", left: 12, top: 30, width: 40, height: 8,
                borderRadius: 4, background: "rgba(60,26,20,0.24)" }} />
            </div>
          );
        })}
        {[3, 11, 19, 29].map((at, i) => (
          <Puff key={"sk" + i} x={300 + (i % 3) * 176} y={640} f={f} at={at}
            c="#FFD9A8" z={74} n={8} s={1.3} />
        ))}
        <MarkCast x={806} y={128} s={128} z={16} o={0.22} f={f} spin={0.18} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE ROAD.  f311-406 (3.14s = 95f).  BEAT: TURN.  Intensity 7.
   VO: "The second is OmniRoute, which literally gives Claude Code unlimited
        usage"

   ⭐ OmniRoute's OWN NOUN IS A ROUTE. The subject's own object is already a
      physical thing, which is the free pass this world is built on — nothing
      here has to be translated before it means something.
   ⛔ HONESTY: the header states the MECHANISM. The word "unlimited" appears
      nowhere in the picture — the README never claims it. Guard:
      `UNLIMITED_BANNED`.
   ⛔ EXTERIOR on the promoted `WorldKit.Surface` depth engine (sky, haze, three
      parallax bands, ground, kerb, grit) — the primitive nine reels shipped
      without, and the difference between a place and a backdrop.
   ====================================================================== */
export const S4: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* ⛔⛔ THE §3 TEST, RUN ON THE ONE SCENE WHERE THE VERB IS THE WHOLE SENTENCE.
     Measured word onsets inside this scene: "gives" at 11.83s, "Claude" 12.01,
     "Code" 12.27, "unlimited" 12.49, "usage" 13.23 — i.e. scene-local frames
     44, 50, 57, 63 and 85. v10 answered all of that with a rig driving past.
     Write the line beside the shot and ask what the picture ADDS: nothing about
     GIVING, nothing about CLAUDE CODE, nothing about USAGE.

     ⭐ So the scene is now the transaction itself, cut to those onsets:
       before  f0-26   CLAUDE CODE hauls a capacity tank, gauge at 2 of 12, its
                       own lamps dim. It is moving, and it is nearly out.
       trigger f28     the OmniRoute rig runs up behind it
       travel  f44-58  ⭐ ON "GIVES" — the coupler arm extends across the gap
       arrival f58     it LOCKS on "Code": squash, ring, dust, a jolt
       f58-95          ⭐ ON "USAGE" — supply pumps down the line and the GAUGE
                       CLIMBS, segment by segment, right through the end of the
                       scene. A value drawn, never typeset.
     ⛔ The gauge keeps climbing and never pegs — no infinity mark, no "max", no
        word "unlimited" anywhere. The README does not claim it, so nor does the
        picture. */
  /* ⛔ v11 parked the rig at x=-178 — 90% of it off-frame, so the object
     DOING the giving was never actually in the picture. It now arrives by f24
     (before the word "OmniRoute" lands at local f20) and settles fully in frame. */
  const rx = E(f, 0, 24, -620, -46, OUT);
  const TANK_X = 492, BAR_Y = 570;
  /* the hero is already nearly out at f0, and only climbs once coupled */
  const fill = f < 58 ? 0.16 : E(f, 58, 95, 0.16, 0.86, OUT);
  const dim = f < 58 ? 0.34 : E(f, 58, 70, 0.34, 1, OUT);
  return (
    <Scene p={asPlace("lane")} slug="" push={push(v, 95, 1.070)} vig={0.36}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="lane" f={f} />

        {/* ⭐ *"there needs to be something above the train at 12 seconds"*. The
            top half was empty night sky, and it was also the beat's unanswered
            question: the rig gives capacity, but from WHERE? A catenary answers
            both — structure across the dead half of the frame, six carriers
            running its full width continuously, and two drop-downs feeding the
            deck, so the supply arrives from off-frame rather than materialising.
            It also plants S5, which is where that somewhere turns out to be 290
            providers. */}
        <Catenary f={f} y={196} z={36} c="#8FB6D8" speed={9} drops={[236, 612]} />

        {/* the OmniRoute rig, arriving from behind */}
        <Rig f={f} x={rx} y={476} s={0.92} z={50} seated={3} lightsOn={1} roll={1} />
        <Actor f={f} x={rx + 352} y={484} s={118} z={54} seed={8} glasses={1}
          lean={Math.sin(f / 9) * 5} />

        {/* ⭐ THE CAPACITY IT IS GIVING — a tank with a twelve-segment gauge */}
        <CapacityTank f={f} x={TANK_X} y={498} fill={fill} s={1.06} z={52} segs={12} />

        {/* ⭐ CLAUDE CODE ITSELF, hauling it. Dim and labouring before the
            coupling, upright and lit after — the sprite IS the subject of the
            sentence, so it is the thing that changes. */}
        <Actor f={f} x={862} y={654} s={196} z={60} seed={17} suit={1}
          lean={f < 58 ? 13 + Math.sin(f / 7) * 4 : Math.sin(f / 10) * 5}
          bob={f < 58 ? Math.abs(Math.sin(f / 9)) * 5 : Math.abs(Math.sin(f / 6)) * 9}
          cheer={f >= 62 ? E(f, 62, 74, 0, 0.7, OUT) : 0} />
        {/* its own running lamps, coming up as the supply lands */}
        {[0, 1, 2].map((i) => (
          <div key={"hl" + i} style={{ position: "absolute", left: 800 + i * 42, top: 486,
            width: 30, height: 12, borderRadius: 6, zIndex: 64,
            background: hexa("#FFE9BC", dim * (0.45 + Math.abs(Math.sin(f / 7 + i * 1.4)) * 0.5)) }} />
        ))}

        {/* ⭐ THE HAND-OFF, ON THE WORD "GIVES" */}
        <Coupler f={f} at={44} x0={rx + 396} x1={TANK_X - 6} y={BAR_Y} z={58} c={SKY} />

        <MarkNum f={f} x={512} y={110} at={16} logo="openrouter.svg" v="50,060" c={SKY} s={0.80} z={86} />
        {f >= 16 && [530, 856].map((x, i) => (
          <div key={"po" + i} style={{ position: "absolute", left: x, top: 274, width: 18,
            height: E(f, 16, 26, 0, 290, OUT), background: "#2A3A4E", zIndex: 42 }} />
        ))}
        <MarkCast x={92} y={132} s={132} z={18} o={0.16} f={f} spin={0.18} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — THE PROVIDER GRID.  f406-492 (2.89s = 86f).  BEAT: ESCALATE. Int 8.5.
   VO: "by connecting to over 200 AI providers to use for free."

   ⛔ THE DARKEST SET IN THE REEL, and the light ARRIVES with the marks — never
      by lifting the palette. That move is what flattened ten reels.
   ⛔ TWELVE REAL MARKS at 96px+ on WHITE tiles; the other 48 stay ANONYMOUS,
      because there are 290 and we can honestly name twelve. A wrong mark is
      worse than no mark, and a padded grid is a made-up number in picture form.
   SHAPE: CONVERGENCE — "many becoming one". ⛔ Deliberately NOT S2's LIST/SORT.
   ====================================================================== */
export const S5: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  /* the sweep crosses the whole grid across the full scene */
  const sweep = E(f, 4, 62, -1, 12, LIN);
  /* ⭐ the sweep gets a VISIBLE leading edge — v1 lit tiles with nothing
     travelling between them, so only the tiles themselves repainted (7.97). */
  const edgeX = 78 + sweep * 94;
  const EPX = 392, EPY = 566;
  return (
    <Scene p={asPlace("grid")} slug="" push={push(v, 86, 1.075)} vig={0.50}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="grid" f={f} />

        <ProviderGrid f={f} x={78} y={104} cols={9} rows={5} sweep={sweep} z={22} s={1.22} />
        {/* the energising edge crossing the wall — light against its own shadow */}
        {sweep > -0.9 && sweep < 12 && (<>
          <div style={{ position: "absolute", left: edgeX - 26, top: 88, width: 52, height: 484,
            zIndex: 33, background: `linear-gradient(90deg,rgba(4,6,11,0.55) 0%,${hexa("#CFE4FA", 0.88)} 55%,rgba(4,6,11,0.40) 100%)` }} />
          <div style={{ position: "absolute", left: edgeX - 74, top: 88, width: 48, height: 484,
            zIndex: 32, background: "rgba(4,6,11,0.46)" }} />
        </>)}

        {/* the cables converging on ONE endpoint — the sentence this shape says */}
        {Array.from({ length: 9 }, (_, i) => (
          <CableRun key={"cb" + i} f={f} at={30 + i * 4}
            x0={130 + i * 86} y0={478} x1={EPX + 118} y1={EPY + 10}
            c={SKY} z={34} w={5} />
        ))}
        <Endpoint f={f} x={EPX} y={EPY} at={46} s={1} z={74} />

        {/* he throws the switch that lights the wall — the sweep happens because
            he starts it, so the sprite changes the world instead of watching it */}
        <Worker f={f} x={854} y={706} s={176} z={64} seed={21} phase={0} rate={1.5} constr={1} />
        <Actor f={f} x={166} y={716} s={148} z={62} seed={23} girl={1}
          gaze={Math.sin(f / 12)} lean={Math.sin(f / 10) * 6} />

      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE LIMIT GATE.  f492-570 (2.59s = 78f).  BEAT: THE VILLAIN WINS. Int 9.
   VO: "Then the moment you hit your limit, it swaps to the next best model."

   ⭐ RECOGNITION, NOT MOTION (THE-OPEN law 3). The strongest interrupt is the
      viewer seeing a thing they personally dread, instantly, without narration:
      `usage limit reached`. Placed exactly where the VO puts it.

      before  f0-7    the rig rolling, lights on, crew working
      trigger f8      the SHUTTER SLAMS. Lights die. Everything stops.
      travel  f22-50  the cascade fires, four tier plates, ✗ ✗ ✗ ✓
      arrival f50-78  the rig SWINGS into the free lane and blasts through

   ⛔⛔ THE SHUTTER IS STILL STANDING, SHUT, AT f78. OmniRoute does not raise
      your limit — it fails over. Drawing it defeated would be the picture
      telling a lie the README does not tell, and it would also cost the villain
      its integrity: it wins here, exactly once, and is never beaten twice.
   ====================================================================== */
export const S6: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const SLAM = 8;
  const dead = f >= SLAM && f < 50;                    /* the stall */
  const lights = dead ? 0 : f < SLAM ? 1 : E(f, 50, 58, 0, 1, OUT);
  /* he rolls right up to it, stops dead, then swings DOWN into the free lane */
  const rx = f < 50 ? E(f, 0, SLAM, -140, 96, OUT) : E(f, 50, 78, 96, 760, IN_Q);
  const ry = f < 50 ? 470 : E(f, 50, 78, 470, 556, OUT);
  const tilt = f < 50 ? 0 : E(f, 50, 62, 0, -7, OUT) + E(f, 62, 78, 0, 7, OUT);

  return (
    <Scene p={asPlace("gate")} slug="" push={push(v, 78, 1.080)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="gate" f={f} lightK={dead ? 1.25 : 0.85} />

        {/* the villain */}
        <Shutter f={f} at={SLAM} x={156} y={128} w={700} h={340} z={62} />

        {/* ⭐ the beacons run from the slam to the end — the one thing allowed to
            move during a stall, and the fix for the reel's weakest story beat */}
        <Beacons f={f} at={SLAM + 2} y={88} z={47} />

        {/* ⛔ v8 drew the cascade as four TEXT PLATES reading SUBSCRIPTION /
            API KEY / CHEAP / FREE. Same mechanism, no words: four physical
            GATES, three slamming shut with a struck cross, the fourth swinging
            open with a tick. The header band carries the sentence
            ("HIT THE LIMIT, IT FAILS OVER") on every frame of this beat. */}
        {[0, 1, 2, 3].map((i) => (
          <TierGate key={"tg" + i} f={f} at={22 + i * 7} x={92 + i * 212} y={188}
            w={186} h={124} ok={i === 3} z={78 + i} />
        ))}

        <Rig f={f} x={rx} y={ry} s={0.94} z={54} seated={3} lightsOn={lights}
          roll={dead ? 0.06 : 1} tilt={tilt} />
        <Actor f={f} x={rx + 356} y={ry + 8} s={124} z={58} seed={14} cop={1}
          shock={dead ? 1 : 0} lean={dead ? -6 : Math.sin(f / 8) * 6} />

        {/* the free lane opening, low right — where he goes */}
        {f >= 44 && (
          <div style={{ position: "absolute", left: 592, top: 604,
            width: E(f, 44, 56, 0, 420, OUT), height: 26, borderRadius: 13,
            background: hexa(GREEN, 0.72), zIndex: 46 }} />
        )}
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — THE MINTING HALL.  f570-670 (3.33s = 100f).  BEAT: PEAK. Intensity 10.
   VO: "You literally get 1.6 billion tokens for free every month."

   ⭐ A TOKEN IS ALREADY A PHYSICAL COIN — the subject's own object, no
      translation, and a pile does the ARITHMETIC for you: four coins beside a
      mound of the same coin is the comparison PROVED, not asserted.

   ⛔⛔ THE NUMBER IS THE REPO'S, NOT THE VO's. The README publishes ~1.53B/mo;
      the VO says 1.6 billion. The receipt prints `~1.53B` with its source plate
      (`README · POOL-DEDUPED`) under it. A made-up number on a receipt-shaped
      object is the most believable kind of wrong. Guard: `TOKEN_FIGURE_BANNED`.
   ⛔ THE PEAK MUST BEAT THE HOOK — brightest set, most movers, biggest arrival.
   ====================================================================== */
export const S7: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const mk = E(f, 6, 76, 0, 1, LIN);          /* the mound grows the whole scene */
  return (
    <Scene p={asPlace("mint")} slug="" push={push(v, 100, 1.075)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="mint" f={f} />

        {/* the pour — coins falling from the 43 pool chutes, the whole scene */}
        <CoinFall f={f} at={6} x={330} y0={150} y1={556} n={30} spread={430}
          s={1} z={52} seed={3} />
        <CoinFall f={f} at={34} x={470} y0={140} y1={572} n={26} spread={480}
          s={1} z={53} seed={19} />
        <Mound f={f} x={392} y={618} k={mk} s={1} z={48} rows={6} />

        {/* ⭐ THE COMPARISON, PROVED — four coins of the SAME size beside it */}
        <div style={{ position: "absolute", left: 726, top: 578, zIndex: 50 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={"sc" + i} style={{ position: "absolute", left: (i % 2) * 30,
              top: -i * 20, width: 46, height: 46, borderRadius: "50%",
              background: "radial-gradient(circle at 36% 30%,#FFE9A8 0%,#E7B24C 46%,#A97A20 100%)",
              border: "3px solid #8A6218" }} />
          ))}
          {/* ⛔ `A HEAVY DAY` was a caption on a picture that already made the
              point. ⭐ A pile does the arithmetic FOR you: four coins of the SAME
              size beside a mound of a hundred and fifty is the comparison PROVED,
              and a label on top of a proof is just text. A small Claude standing
              next to the four is the scale reference the label was pretending to
              be. */}
          <Actor f={f} x={22} y={116} s={104} z={54} seed={51} girl={1}
            lean={Math.sin(f / 11) * 6} />
        </div>

        {/* ⭐ A NUMBER MOVES TO ITS VALUE; it is never typeset at it */}
        <Counter f={f} x={286} y={92} at={20} dur={54} v={R2.tokens}
          unit={R2.tokenUnit} src={R2.tokenSrc} s={0.94} z={84} />

        {/* the crew cheer as it lands — HOP loops, on their own clocks */}
        <Crowd f={f} x={118} y={714} n={3} cols={3} pitchX={172} pitchY={0} s={128} z={58}
          at={40} every={7} from="b" seed={2} />
        <Actor f={f} x={892} y={720} s={168} z={62} seed={31} chef={1}
          cheer={E(f, 74, 84, 0, 0.9, OUT)}
          bob={-Math.max(0, Math.sin(((f - 74) / 26) * Math.PI)) * 22} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — THE VOID.  f670-751 (2.70s = 81f).  BEAT: VILLAIN 2 WINS. Intensity 6.5.
   VO: "The third is Claude Mem. It gives Claude memory across all your
        sessions,"

   The session ENDS and the room is stripped. This is the reel's quiet, dark
   beat — deliberately, in the last quarter, motivated, never in the belly.
   ⛔ It still has to clear the motion floor, and it does, because THE ERASE IS
      ITSELF A BIG FAST EVENT: twelve large objects leaving frame in 20 frames.
   ⛔ MUST NOT reuse reel 104's memory staging (labelled trays). This is an
      ERASE followed by a spool arriving — a different sentence entirely.
   ====================================================================== */
export const S8: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("void")} slug="" push={push(v, 81, 1.065)} vig={0.54}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="void" f={f} />

        {/* ⛔⛔ THE 23-SECOND NOTE, VERBATIM: *"the animation at 23 seconds is not
            good enough its just a bunch of squares and rectangles"*. It was
            sixteen coloured slabs tumbling off frame, and it was exactly that.
            ⭐ What the reel has actually built by 22s is a CAST — the crew from
            the scan, the sort and the bench. So the session takes the CAST: nine
            Claudes dragged toward one vanishing point, spinning and shrinking,
            every one of them wearing the shock face. Same event, same duration,
            and now it is about somebody. */}
        <SpriteSuck f={f} at={2} n={14} every={3} z={62} toX={1460} toY={-260} />

        {/* the marks go dark with them — the receipts leave too */}
        {[{ l: "anthropic.svg", x: 132 }, { l: "openrouter.svg", x: 452 },
          { l: "github.svg", x: 772 }].map((m, i) => {
          const k = E(f, 8 + i * 6, 8 + i * 6 + 14, 0, 1, IN_Q);
          if (k >= 1) return null;
          return (
            <div key={"mk" + i} style={{ position: "absolute", left: m.x + k * 620,
              top: 196 - k * 180, zIndex: 70, opacity: (1 - k) * 0.9,
              transform: `rotate(${k * 240}deg) scale(${1 - k * 0.5})` }}>
              <div style={{ width: 104, height: 104, borderRadius: 18, background: "#FFFFFF",
                border: "4px solid #E3DDCE", display: "flex", alignItems: "center",
                justifyContent: "center", boxShadow: SH }}>
                <Img src={staticFile("logos/" + m.l)}
                  style={{ width: 74, height: 74, objectFit: "contain" }} />
              </div>
            </div>
          );
        })}

        {/* ⛔ HE DOES NOT JUST STAND THERE. He turns, looks, and drops. */}
        <Actor f={f} x={352} y={720} s={192} z={64} seed={41} prof={1}
          gaze={E(f, 22, 34, 0, -0.9, OUT) + E(f, 40, 52, 0, 1.5, OUT)}
          shock={E(f, 26, 36, 0, 0.8, OUT)}
          bob={E(f, 34, 50, 0, 13, OUT)} lean={E(f, 34, 52, 0, -7, OUT)} />

        {/* then the spool DROPS IN and starts turning — the turn of the beat */}
        <Spool f={f} x={606} y={356} at={48} s={1.0} z={66} spin={1} c={MINT} />

        <MarkNum f={f} x={104} y={104} at={62} logo="github.svg" v="91,045" c={GREEN} s={0.74} z={86} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — THE SPOOL ROOM.  f751-845 (3.13s = 94f).  BEAT: PAYOFF 3. Intensity 9.
   VO: "so it remembers your projects and your files so you never re-explain
        anything again."

   ⭐ THE HOUSE DEPICTION for "it remembers across chats" is BARS TRAVELLING
      ACROSS A SESSION BOUNDARY — never labelled trays, never key/value rows.
      Nine of them cross across the FULL 94 frames and REBUILD the board that
      S8 stripped, so the two scenes are one sentence in two halves.
   ⛔ The "never re-explain" beat is drawn, not typeset: a speech bubble rises
      and is STRUCK THROUGH. He never says it.
   ====================================================================== */
export const S9: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const SX = 470;
  return (
    <Scene p={asPlace("drum")} slug="" push={push(v, 94, 1.070)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="drum" f={f} />

        <SessionLine x={SX} y={168} h={392} z={44} f={f} />
        <Spool f={f} x={46} y={258} at={0} s={0.92} z={52} spin={1.4} c={MINT} />

        {/* ⛔ v1 ran nine 26px bars and measured 7.29 with 74% HOLD — the bars
            were under the ~40px short-side floor, so most of them vanished in the
            audit's 1012->240 downsample and read as nothing to a human either.
            TWELVE bars at 46px, travelling further, staggered across the whole
            94 frames. */}
        {Array.from({ length: 12 }, (_, i) => (
          <ContextBar key={"cbz" + i} f={f} i={i} at={2 + i * 7}
            x0={168} x1={SX + 40 + (i % 3) * 56} y={178 + i * 33} s={1.55} z={60} c={MINT} />
        ))}

        {/* ⭐ AND THE CAST COMES BACK. S8 took the crew; this takes them across
            the boundary and puts them down on the far side, one at a time across
            the full 94 frames. Two scenes, one sentence: the session ended and
            nothing was lost. ⛔ Six Claudes, not six coloured slabs. */}
        {[24, 36, 48, 58, 68, 78].map((at, i) => (
          <Popper key={"rc" + i} f={f} at={at} i={i + 3}
            x0={SX - 40} y0={300 + (i % 3) * 70}
            x1={648 + (i % 3) * 132} y1={628 - Math.floor(i / 3) * 128}
            s={130} z={68 + i} cat={(i + 1) % 5} costume={costumeFor(i + 6)} />
        ))}

        {/* ⛔ the re-explanation he NEVER has to give */}
        <CancelBubble f={f} x={176} y={520} at={54} s={0.92} z={86} />
        <Actor f={f} x={196} y={730} s={176} z={64} seed={43} glasses={1} beard={1}
          gaze={E(f, 50, 60, 0, 0.8, OUT)} lean={Math.sin(f / 12) * 5} />
        <Worker f={f} x={880} y={716} s={160} z={62} seed={47} phase={7} rate={1.2} girl={1} />

      </div>
    </Scene>
  );
};

/* =========================================================================
   S10 — THE RUN, LIT.  f845-950 (3.49s = 105f).  BEAT: CTA.  Intensity 9.5.
   VO: "If you want to try these for free, comment CLAUDE for the full setup."

   The bookend: the rig that stood empty in a static bay at f0 is now seated,
   lit and MOVING, with the whole crew aboard. ⛔ Deliberately not a repeat of
   S0 — different set, framing, light, and action.
   ⛔ SPACING IS ARITHMETIC: 6 sprites at s=128 on a 176px pitch is 176 >= 0.85
      x (64+64) = 109. Computed before the count, not after.
   ====================================================================== */
export const S10: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  return (
    <Scene p={asPlace("runlit")} slug="" push={push(v, 105, 1.070)} vig={0.38}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="runlit" f={f} />

        {/* ⛔ THE CTA IS WHERE RECEIPTS BELONG, and they still are not prose:
            three MARK + NUMERAL plates, one per beat. The header band and the
            caption carry the repo names; the picture carries the marks and the
            star counts, which is the split this whole rebuild is built on. */}
        {[{ l: "anthropic.svg", v: "33,639", c: CLAY, at: 6 },
          { l: "openrouter.svg", v: "50,060", c: SKY, at: 17 },
          { l: "github.svg", v: "91,045", c: GREEN, at: 28 }].map((h, i) => (
          <MarkNum key={"mn" + i} f={f} x={58} y={148 + i * 104} at={h.at}
            logo={h.l} v={h.v} c={h.c} s={0.72} z={74 + i} />
        ))}

        <Rig f={f} x={168} y={506} s={1.06} z={54} seated={3} lightsOn={1} roll={1.5} />

        {/* the whole crew aboard — all four action loops, costumes cycled */}
        <Crowd f={f} x={224} y={498} n={6} cols={3} pitchX={176} pitchY={96} s={124} z={58}
          at={16} every={6} from="r" seed={3} />

        <StampPlate f={f} x={272} y={588} at={62} t={`COMMENT ${KEYWORD}`}
          sub="FOR THE FULL SETUP" s={0.88} z={92} />
        <MarkCast x={812} y={196} s={168} z={16} o={0.24} f={f} spin={0.16} />
      </div>
    </Scene>
  );
};
