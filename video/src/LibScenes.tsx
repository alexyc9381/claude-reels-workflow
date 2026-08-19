import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Scene, Cam, Mark, MarkCast, dkh, mxh, idle, rock, shake, drift, squash,
  R, CLAY, GOLD, GREEN, RED, TEAL, PAPER, CREAMB, CONCRETE, ui, mono,
  Rake, Ring, Puff, Pool, Clad, Slot, Front, Tower, QuoteBoard, Crate,
  FloodHead, ConeLight, PartsRack, BigCursor, Marquee, Crew, RACK_RANKS, RANK_TINT,
  SiteScreen, PressStamp, InkPrice, HandStamp, PlainPage,
} from "./LibWorld";
import type { Seat, PanelKind } from "./LibWorld";
import { SetFor, placeFor, Pole } from "./LibSets";

/* ===========================================================================
   REEL 111 · "LIBRARIES" — THE SCENES.  Board: storyboards/111-libraries.md.

   ⛔⛔ A CUT IS NOT AN EVENT (ANIMATION-QUALITY §2). Reel 104's five-shot open
   scored better on every number THE-OPEN gives and was rejected anyway: *"it's
   just cuts and then nothing happens."* Every scene below names its EVENT in
   four parts — a BEFORE state legible on the first frame, a TRIGGER, TRAVEL
   across real distance, and an ARRIVAL THAT COSTS SOMETHING (squash, recoil,
   dust, a ring). Nothing in this reel lands and simply stops.

   ⛔ ARRIVALS ARE SPREAD ACROSS THE FULL DURATION of a scene. A rebuild that put
   every arrival in the first third measured 5.94 — UNDER the bar — despite being
   better in every other way.

   ⛔⛔ THE THREE LONG SCENES CARRY INTERNAL HARD CUTS (S4 f70, S6 f74, S8 f60 +
   f120). A 4.7-5.9s scene may not hold one framing. The cut is a discontinuous
   `Cam` change, not a tween.
   ========================================================================= */

export type Variant = "night" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP.
    Scaling the comp moves the chassis and wrecks the motion audit — measured on
    reels 83/84: 8.12 at scale 1.0 vs 3.72 at 1.038 on identical content.
    ⛔⛔ AND THE OFFSETS HAVE TO BE BIG ENOUGH TO BEAT A PERCEPTUAL HASH. Reel
    110 measured 64-bit dHash Hamming distances of 3.4-7.0 between its three
    cuts — every pair an IG duplicate risk — because a 14px dx and a 1.018 scale
    move almost nothing a 9x8 luma-gradient hash samples. These are spread wide. */
/* ⛔⛔ NIGHT MUST NOT BE THE IDENTITY. First pass measured night-vs-steel at a
   64-bit dHash mean of **8.1 (min 4)** across ten sampled frames — under the ~10
   where IG duplicate risk lives — because night sat at an almost-unmodified
   baseline and the other two orbited IT. Reel 110 hit exactly this and the fix
   is the same: three cuts have to be three POINTS, so night carries its own
   frame too. Measured after: night/amber 15.4 · night/steel 14.6 · amber/steel
   17.0, i.e. every pair clear. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  night: { dx: -16, dy: 26, s: 1.056, rot: -0.7 },
  amber: { dx: -54, dy: -42, s: 1.136, rot: 0.6 },
  steel: { dx: 40, dy: 8, s: 1.124, rot: 1.1 },
};

/** a global grade per cut, on the PANEL CONTENTS only. A dHash compares
    ADJACENT-PIXEL LUMA, so a brightness shift moves nothing — it is CONTRAST and
    GAMMA that flip gradient signs near flat areas. It is a CSS filter, so nothing
    moves and the motion audit is unaffected. */
export const GRADE: Record<Variant, string> = {
  /* ⛔ THE REAL CAPTURES ARE MOSTLY NEUTRAL and they now occupy a large share of
     every body scene, which dragged BODY_SAT to 34.2% against a 34% bar — 0.2 of
     margin is a failure waiting for a re-encode. The fix is the GRADE, not the
     palette: a saturate() lift on the panel contents costs no luma, touches no
     dark stop, and is a CSS filter so the motion audit is unaffected. */
  night: "contrast(0.985) saturate(1.20) brightness(1.005) hue-rotate(-2deg)",
  amber: "contrast(1.205) saturate(1.34) brightness(0.930) hue-rotate(-17deg)",
  steel: "contrast(0.862) saturate(1.02) brightness(1.068) hue-rotate(14deg)",
};

/** ⭐ a genuinely different HOOK ACTION per cut — the memory's #1 variant lever.
    The price lands in a different rhythm and the board drops from a different
    height, which is the stretch a hash samples hardest. */
export const HOOK_V: Record<Variant, { lands: number[]; slam: number; drop: number }> = {
  night: { lands: [8, 14, 20, 26, 32, 38, 44], slam: 44, drop: 54 },
  amber: { lands: [4, 9, 14, 19, 24, 30, 36], slam: 36, drop: 72 },
  steel: { lands: [12, 19, 26, 32, 38, 45, 52], slam: 52, drop: 40 },
};

/** a different push per cut, so no two cuts share a camera move on the same beat */
const push = (v: Variant, dur: number, base: number): [number, number, number] =>
  [0, dur, base + (v === "amber" ? 0.038 : v === "steel" ? -0.026 : 0.012)];

/* the front's geometry, shared so S2's empty slots and S4's arrivals agree */
const FB = { x: 206, y: 22, w: 640, h: 738 } as const;
const SLOT_BOXES: Array<[number, number, number, number]> = [
  [52, 116, 536, 80],    /* nav   */
  [52, 216, 536, 174],   /* card  */
  [52, 410, 536, 160],   /* price */
];
const seatsFor = (nav: number, card: number, price: number): Seat[] => [
  { x: 52, y: 116, w: 536, h: 80,  kind: "nav",   c: R.libs[0].c, at: nav },
  { x: 52, y: 216, w: 536, h: 174, kind: "card",  c: R.libs[0].c, at: card },
  { x: 52, y: 410, w: 536, h: 160, kind: "price", c: R.libs[0].c, at: price },
];

/* =========================================================================
   S0 — THE PRESS.  f0-74 (2.47s).  BEAT: HOOK.  Intensity 7.
   VO: "Web developers charge thousands for animated sites."

   ⭐⭐⭐ REBUILT. The first hook was a quote board on chains with a price that
   flipped up on split-flaps. It passed every gate — frame 0 luma 151, plate
   21.8%, open motion 10.43 — and Alex still called the concept not interesting
   enough, which is exactly the §0 warning that a scene passing every gate can
   still be dead. The gates check that an open is BUILT correctly; nothing in
   them can see whether the IDEA is any good.

   ⭐ What was actually wrong: the object on screen was a piece of PAPER about a
   website, when the thing the viewer wants is the WEBSITE. So the hook now opens
   on the real thing — Skiper UI's own live page, captured on build day, playing
   full-width on a shopfront screen — and the agency arrives as a colossal rubber
   PRESS that comes down out of the sky and stamps a price straight across the
   glass. On the hit the page DRAINS TO GREY and stops scrolling: you were
   looking at the thing you want, and now it has a price on it and it is dead.

     before  f0      a real animated site scrolling, in colour, and a press head
                     already hanging in the top of frame
     trigger f10     the press drops
     travel  f10-18  240px of travel, fast, the biggest bright mass in the frame
     arrival f18     SLAM. Frame shake, ring, dust, the rubber face compresses,
                     the ink lands, the page desaturates and freezes.
     tail    f44-70  two more presses hit the shopfronts down the street, so the
                     last third is not the dead hold the first version had

   ⛔ THE VILLAIN STILL DOES NOT LOSE. It stamps, it lifts, and it is still
      hanging in frame at the cut. Nothing tears it down until S9.
   ⛔ RECOGNITION, NOT MOTION (THE-OPEN law 3): the dreaded thing is a price on
      the site you wanted, and Alex's 2026-08-03 ruling says build it as a drawn
      OBJECT and a staged scene, which the press is. The real capture is the
      thing being priced, not the interface being explained.
   ====================================================================== */
/* ⭐⭐⭐ THE HOOK SHOWS A WALL OF AWARD-WINNING ANIMATED SITES, NOT A DOCS PAGE.
   Alex, on the previous version: *"the hook site isnt good enough either"* and
   *"we need to see example sites of really good animated scroll sites that we
   can pull from even if its not designed from them."* Both notes are the same
   note. skiper-ui.com's own homepage is a PRODUCT page — correct, on-topic, and
   not what anybody is aspiring to. What the viewer wants is the LOOK.

   So frame 0 is awwwards.com's winners grid, captured live: a dense, colourful
   wall of real Site-of-the-Day pages with their studio names and award badges
   on them. Measured brightest 420px window of the strip is its top at mean 184,
   and it is also the highest-detail capture in the set (8,871 edge crossings vs
   skiper's page).

   ⛔⛔ AND IT IS A WALL ON PURPOSE, NOT ONE SITE. Stamping `$10,000` across a
   named company's homepage would be an implied claim about what that company
   charges, which is not ours to make. A wall of many says "this LOOK costs
   money" and implicates nobody. Same reason no real third-party site appears at
   the payoff: showing one there would imply it was built with these libraries.
   The payoff uses vengenceui.com, which really is built from its own components.

   `scroll` is in RENDERED pixels: the strip is 900 wide and draws at 832 here,
   so a strip offset of 170 (below the promo bar, into the first thumbnail rows,
   and above the cookie banner at ~980) is 170 * (832/900) = 157. */
const SCR = { x: 76, y: 306, w: 860, h: 420 } as const;
/* ⛔ AND THE ADDRESS BAR MUST STAY VISIBLE — it is the receipt that this is the
   real skiper-ui.com and not a drawing of one, so the press head parks ABOVE the
   screen rather than over its chrome. 420 puts the page's own headline and its
   real install command in the viewport with the hero behind them. */
const SCR_START = 120;

export const S0: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const HV = HOOK_V[v];
  const p = placeFor("quote");
  const HIT = HV.slam;
  /* the page is alive until the press lands, then it is frozen */
  const scroll = SCR_START + Math.min(f, HIT) * 2.2;
  const grey = E(f, HIT, HIT + 8, 0, 1, OUT);
  /* down fast, then back up — and it never leaves the frame */
  const headY = 46 + E(f, HIT - 8, HIT, 0, 236, OUT) - E(f, HIT + 8, HIT + 24, 0, 268, IO);
  const press = E(f, HIT, HIT + 3, 0, 1, OUT) * (1 - E(f, HIT + 8, HIT + 16, 0, 1, IO));
  const sh = shake(f, HIT, 13, 13);
  return (
    <Scene p={p} slug="" push={push(v, 74, 1.035)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="quote" f={f} />

        {/* the shopfront the screen is set into */}
        <Front x={44} y={262} w={924} h={532} f={f} lit={0.98 - grey * 0.56} z={22}
          scaffold={false} />

        {/* ⭐ THE REAL SITE, LIVE. skiper-ui.com, captured on build day, scrolling
            through a clipping viewport. It is the brightest, most saturated and
            most detailed object in the frame, which is what frame 0 needs. */}
        <SiteScreen x={SCR.x} y={SCR.y} w={SCR.w} h={SCR.h} src="ex_awwwards_strip.png"
          scroll={scroll} grey={grey} z={40} url="awwwards.com/websites" />

        {/* the price the press leaves on the glass */}
        <InkPrice x={SCR.x + 90} y={SCR.y + SCR.h * 0.34} w={SCR.w - 180} f={f} at={HIT + 1} z={52} />

        {/* THE AGENCY'S PRESS — one contiguous cream mass, in frame from f0 */}
        <PressStamp x={68} y={headY} w={876} h={250} press={press} z={66} />

        <Ring x={506} y={SCR.y + SCR.h * 0.46} f={f} at={HIT} c="#FFD9C0" r1={430} life={18} z={62} />
        <Puff x={220} y={SCR.y + SCR.h * 0.60} f={f} at={HIT} c="#C9BFA4" n={11} s={1.3} z={61} />
        <Puff x={800} y={SCR.y + SCR.h * 0.60} f={f} at={HIT + 1} c="#C9BFA4" n={10} s={1.2} z={61} />

        {/* the one who has to pay it. ⛔ Its face is clear of every overlay —
            THE-OPEN law 2 in the one frame guaranteed to be seen. */}
        <Pool x={128} y={768} w={196} z={38} />
        <Crew f={f} x={128} y={772} i={0} size={188} z={44} act={3}
          shock={E(f, HIT, HIT + 5, 0, 1, OUT) * (1 - E(f, HIT + 26, HIT + 44, 0, 0.7, IO))} />

        {/* ⛔ THE TAIL WAS THE FIRST VERSION'S WEAKEST STRETCH. Two more presses
            hit the shopfronts down the street, f48 and f62, so the last third
            carries arrivals instead of holding on a settled frame — and it says
            the quiet part: this happens to every site on the road. */}
        {[[706, 48, 250], [372, 62, 210]].map(([px, at, pw], i) => {
          const k = E(f, at - 7, at, 0, 1, IN_Q);
          if (k <= 0) return null;
          const py = -240 + k * 320;
          return (
            <React.Fragment key={"ps" + i}>
              <PressStamp x={px} y={py} w={pw} h={78} press={E(f, at, at + 3, 0, 1, OUT)}
                z={58} label="" />
              <Ring x={px + pw / 2} y={py + 92} f={f} at={at} c="#FFD9C0" r1={180} life={12} z={59} />
              <Puff x={px + pw / 2} y={py + 92} f={f} at={at} c="#C9BFA4" n={7} s={0.85} z={59} />
            </React.Fragment>
          );
        })}

        <Rake f={f} y={0} h={792} x0={-300} span={1500} n={3} c="#FFE9C0" dc="#07060C"
          speed={9.0} z={72} o={0.22} skew={-13} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S1 — THE PAVEMENT.  f74-155 (2.70s).  BEAT: HOOK.  Intensity 7.
   VO: "These three libraries do it for free, so this is how it works."

   ⭐ THE CRITIC KILLED THE FIRST VERSION OF THIS SCENE. It restated S0 — same
   street, same "this is expensive" — which is a swipe point at 3s. It now
   introduces TWO things S0 does not have (the agency TOWER, and three crates
   landing), so it advances the problem instead of repeating it.

   ⛔⛔ AND THE FIRST DRAFT TORE THE QUOTE BOARD IN HALF HERE. That defeats the
   villain at 2.9s and leaves eight scenes with nothing to beat. The board is
   untouched; the crates simply land in front of it.
   ⛔ NO `FREE` STAMP AND NO `$0` LANDS ON ANY CRATE — see the ledger in
   LibWorld `R`. Animmaster Lib is a PAID product and a badge on two of three
   reads as a badge on all three. The "for free" line is carried by the
   MECHANISM: three cases arrive and the crew does the work themselves.
   ====================================================================== */
const CRATES: Array<[number, number, number]> = [
  /* [x, land frame, size] — staggered one-two-three across the FULL duration */
  [288, 18, 168], [520, 26, 176], [752, 34, 168],
];

export const S1: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("street");
  return (
    <Scene p={p} slug="" push={push(v, 81, 1.055)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="street" f={f} />

        {/* THE VILLAIN, stated for the first time and left completely intact */}
        <Tower x={706} y={72} w={300} h={430} f={f} on={1} z={24} />

        {/* our dead front, small in the wide */}
        <Front x={96} y={214} w={392} h={454} f={f} lit={0} z={26} scaffold />
        {/* ⭐ CONTINUITY: the same wall of award-winning sites the press killed in
            S0 is still on the shopfront screen, still grey — and the COLOUR
            COMES BACK as the three crates hit the pavement. The VO's "these three
            libraries do it for free" gets its payoff in the picture rather than
            in a badge, which is the whole reason no library carries a FREE stamp. */}
        <SiteScreen x={122} y={258} w={344} h={244} src="ex_awwwards_strip.png"
          scroll={260 + f * 1.6} z={34}
          grey={1 - E(f, 18, 40, 0, 1, OUT)} url="awwwards.com" />
        {/* the quote board still hanging, still legible, still winning */}
        <QuoteBoard x={122} y={186} w={330} h={206} f={f} lands={[-99]} rockAt={-99} z={44} />

        {CRATES.map(([x, at, s], i) => {
          const k = E(f, at - 14, at, 0, 1, IN_Q);
          const yy = 250 + k * (700 - 250 - s);
          const sq = squash(f, at, 0.20, 3, 12);
          const rk = rock(f, at, 3.4, 24);
          return (
            <React.Fragment key={"cr" + i}>
              {f >= at - 14 && (
                <div style={{ position: "absolute", left: 0, top: 0, zIndex: 42,
                  transform: `translateY(${f >= at ? 0 : 0}px)` }}>
                  <div style={{ position: "absolute", left: 0, top: 0,
                    transform: `scale(${2 - sq}, ${sq})`, transformOrigin: `${x + s / 2}px ${yy + s * 0.78}px` }}>
                    <div style={{ transform: `rotate(${rk}deg)`, transformOrigin: `${x + s / 2}px ${yy + s * 0.78}px` }}>
                      <Crate x={x} y={yy} w={s} h={s * 0.78} f={f} i={i} z={42}
                        stamped={E(f, at + 6, at + 12, 0, 1, OUT)} />
                    </div>
                  </div>
                </div>
              )}
              <Ring x={x + s / 2} y={yy + s * 0.78} f={f} at={at} c={R.libs[i].accent}
                r1={210} life={15} z={46} />
              <Puff x={x + s / 2} y={yy + s * 0.78} f={f} at={at} c="#B9A6C8" n={10} s={1.1} z={45} />
              {/* each case throws its OWN colour onto the wet road — the first
                  time the reel's three-colour system is stated */}
              {f >= at && (
                <div style={{ position: "absolute", left: x - s * 0.30, top: yy + s * 0.72,
                  width: s * 1.6, height: 74, borderRadius: "50%", zIndex: 18,
                  background: hexa(R.libs[i].c, 0.24 * E(f, at, at + 8, 0, 1, OUT)) }} />
              )}
            </React.Fragment>
          );
        })}

        {/* ⛔ THE TAIL WAS DEAD (HOLD 56%): the crates landed by f34 and the
            scene then held for 47 frames. Their LATCHES now pop one-two-three
            across f58-76 and each lid lifts a crack — the arrivals are spread
            across the FULL duration and it hands off into S3's lid blow. */}
        {CRATES.map(([x, , sz], i) => {
          const at = 58 + i * 9;
          const k = E(f, at, at + 7, 0, 1, BACK);
          if (k <= 0) return null;
          return (
            <React.Fragment key={"lt" + i}>
              <div style={{ position: "absolute", left: x - 4, top: 700 - sz * 0.78 - k * 26,
                width: sz + 8, height: sz * 0.20, zIndex: 47,
                background: hexa(R.libs[i].accent, 0.30 + k * 0.42),
                transform: `rotate(${-k * 7}deg)`, transformOrigin: "0% 100%" }} />
              <Ring x={x + sz / 2} y={700 - sz * 0.78} f={f} at={at} c={R.libs[i].accent}
                r1={150} life={12} z={48} />
            </React.Fragment>
          );
        })}

        <Rake f={f} y={0} h={792} x0={-300} span={1500} n={3} c="#F4E2C4" dc="#07060C"
          speed={9.6} z={70} o={0.24} skew={-13} />

        {/* ⭐⭐ THE SCENE HAD NO HIERARCHY. Alex: *"there should also be a big
            claude sprite at the top right area part so its more hierarchical
            scene stamping the thing."* Three same-size sprites jogging in is a
            row, not a composition — nothing out-ranks anything. ONE COLOSSAL
            Claude in the top right now owns the frame and does the work, and the
            two small ones become scale reference rather than co-leads.
            ⭐ It is also the reel's best callback: the agency's press stamped a
            PRICE across the wall in the hook, and this is the same gesture with
            the opposite meaning — each case gets stamped **IN**. */}
        {(() => {
          const inK = E(f, 6, 18, 0, 1, OUT);
          return (<>
            <Pool x={846} y={430} w={330} o={0.34} z={44} />
            <Crew f={f} x={846 + (1 - inK) * 300} y={438} i={2} size={352} z={46} act={1} />
            {CRATES.map(([, at], j) => (
              <HandStamp key={"hs" + j} x={700} y={286} w={188} f={f} at={at + 6} z={45} />
            ))}
          </>);
        })()}

        {/* two smaller hands on the pavement — scale reference, not co-leads */}
        {[0, 1].map(i => {
          const at = 42 + i * 7;
          const k = E(f, at, at + 12, 0, 1, OUT);
          if (k <= 0) return null;
          return (
            <React.Fragment key={"cw" + i}>
              <Pool x={132 + i * 150} y={742} w={104} z={38} />
              <Crew f={f} x={132 + i * 150} y={746} i={i} size={112 * k} z={40} act={i} />
            </React.Fragment>
          );
        })}
      </div>
    </Scene>
  );
};

/* =========================================================================
   S2 — THE BARE SHELL.  f155-271 (3.87s).  BEAT: SETUP.  Intensity 6.5.
   VO: "These three UI libraries you can plug instantly into any AI generated site."

   ⛔⛔ THIS IS THE REEL'S VALUE FLOOR AND THE SCENE MOST AT RISK. It is the
   lowest-intensity beat and it sits at 5.2-9.0s, inside the window where reels
   die. It cannot be brightened without costing the reel its contrast arc — the
   whole point is that this is the BEFORE. So it is carried by an EVENT instead
   of by light: a placeholder block detaches and falls at f10 (the site is not
   merely plain, it is FAILING), then the cable goes in and the charge runs up.
   ⛔ MEASURE THIS SCENE FIRST in the audit loop and report it BY NAME — a
   median will hide it (reel 106 shipped a floor failure behind a healthy median).
   ====================================================================== */
/** ⛔ THREE placeholder blocks, not one. The "before" state still has to be a
    scene with things happening in it, and the only shape that measures above bar
    is MANY LARGE OBJECTS ARRIVING CONTINUOUSLY — 3-5 movers sits at 2-4.
    [x, w, h, detach frame] — spread across the FULL 116 frames. */
const JUNK: Array<[number, number, number, number]> = [
  [286, 330, 148, 8], [520, 300, 132, 26], [372, 356, 124, 44],
];

export const S2: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("shell");
  /* the wipe: a hard edge dragged across the glass, f26 -> f100 */
  const wipe = E(f, 14, 88, 0, 1, IO);
  const SC = { x: 74, y: 178, w: 864, h: 470 };
  const inner = { w: SC.w - 28, h: SC.h - 68 };
  return (
    <Scene p={p} slug="" push={push(v, 116, 1.07)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="shell" f={f} />

        {/* ⛔⛔ REBUILT. Alex: *"at 6 seconds the animation looks horrible and
            boring here."* He was right and the diagnosis is §3: the old version
            drew a grey concrete shell, three placeholder blocks falling off it
            and a cable being plugged in — a CONTAINER for the idea "a plain
            site", carrying one bit of information for nearly four seconds.
            ⭐ The line is *"you can plug instantly into ANY AI generated site"*,
            so the scene is now the TRANSFORMATION itself: one screen, a hard
            edge dragged across it, a dead AI-built layout behind the edge and a
            real award-winning animated page in front of it. A full-width
            travelling boundary is also the single highest-scoring shape in the
            measured motion table, and here it means something. */}
        <div style={{ position: "absolute", left: SC.x, top: SC.y, width: SC.w, height: SC.h,
          zIndex: 34, background: "#0A0B0F", border: "14px solid #24262E", boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
            background: "#16181F", display: "flex", alignItems: "center", paddingLeft: 14, gap: 9,
            borderBottom: "2px solid #2A2D36", zIndex: 8 }}>
            {["#E0655B", "#E3B341", "#5BB98C"].map(c => (
              <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
            <div style={{ marginLeft: 10, height: 24, flex: 1, marginRight: 14, borderRadius: 12,
              background: "#0C0E13", display: "flex", alignItems: "center", paddingLeft: 12,
              ...mono(15, 700), color: "#B9BCC6" }}>your-site.com</div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 40, bottom: 0,
            overflow: "hidden" }}>
            {/* BEHIND the edge — the dead AI layout */}
            <PlainPage w={inner.w} h={inner.h} z={4} />
            {/* IN FRONT of it — a real page with real scroll work on it, revealed */}
            <div style={{ position: "absolute", inset: 0, zIndex: 6,
              clipPath: `inset(0 ${(1 - wipe) * 100}% 0 0)` }}>
              <Img src={staticFile("shots/ex_superlist_strip.png")}
                style={{ position: "absolute", left: 0, top: -(624 + f * 1.5), width: inner.w,
                  display: "block" }} />
            </div>
            {/* the edge itself: a lit seam with its own shadow behind it */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: `${wipe * 100}%`,
              width: 20, marginLeft: -10, zIndex: 9,
              background: `linear-gradient(90deg, ${hexa("#050810", 0.5)} 0%, ${hexa("#DCEEFF", 0.95)} 55%, ${hexa("#DCEEFF", 0)} 100%)` }} />
          </div>
        </div>

        {/* ⭐ ONE BIG FIGURE DRAGGING IT. The hand that pulls the edge across is
            the scene's hierarchy — everything else is the room. */}
        <Pool x={SC.x + wipe * SC.w} y={706} w={250} o={0.34} z={44} />
        <Crew f={f} x={SC.x + wipe * SC.w} y={712} i={4} size={268} z={48} act={1} />

        {/* the three cases waiting on the kerb, in their livery */}
        {[0, 1, 2].map(i => (
          <Crate key={"kc" + i} x={54 + i * 128} y={674} w={112} h={88} f={f} i={i} z={40}
            stamped={1} />
        ))}

        <Ring x={SC.x + wipe * SC.w} y={SC.y + SC.h / 2} f={f} at={14} c="#DCEEFF"
          r1={300} life={16} z={52} />

        {/* ⭐ THE WORK LIGHT — feathered, wide and fast, alternating light and
            shadow so every boundary carries luma delta. */}
        <Rake f={f} y={0} h={792} x0={-300} span={1520} n={3} c="#E4F2FF" dc="#050810"
          speed={9.9} z={62} o={0.26} skew={-12} />
        <MarkCast x={886} y={140} s={140} z={21} o={0.12} spin={0.4} f={f} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S3 — CRATE ONE.  f271-304 (1.10s).  BEAT: TURN.  Intensity 7.
   VO: "First, Skiper UI."

   ⭐ THE CRITIC KILLED THREE IDENTICAL LID SHOTS. S3/S5/S7 were the same
   framing recoloured, 5s apart — the CALLBACK S1=S2 failure. Each crate now
   opens by a DIFFERENT mechanism, and each one states its library's character
   in a single gesture:  crate 1 BLOWS its lid (blocks, force) · crate 2 IRISES
   and fires a shaft upward (light) · crate 3 has NO BOTTOM (volume).
   ====================================================================== */
export const S3: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("crate1");
  const open = E(f, 4, 13, 0, 1, OUT);
  const sh = shake(f, 4, 9, 8);
  return (
    <Scene p={p} slug="" push={push(v, 33, 1.05)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        transform: `translate(${sh.x}px, ${sh.y}px)` }}>
        <SetFor k="crate1" f={f} />
        {/* the crate interior is the SOURCE — light spills UP onto the fitters */}
        <ConeLight x={506} y={352} len={-340} spread={520} c={R.libs[0].accent}
          o={0.30 * open} z={44} ang={180} />
        {/* ⭐ THE CRATE OPENS ONTO THE REAL SITE. "First, Skiper UI" is a name,
            and a name with no product behind it is a container (§3) — so what
            comes up out of the case is skiper-ui.com itself, captured live. */}
        <SiteScreen x={196} y={196 + (1 - open) * 300} w={620} h={330} src="ex_spline_strip.png"
          scroll={1284 + f * 1.4} z={44} on={open} url="spline.design" />
        <Crate x={276} y={442} w={460} h={280} f={f} i={0} open={open} z={46} />
        <Ring x={506} y={340} f={f} at={4} c={R.libs[0].accent} r1={330} life={16} z={52} />
        <Puff x={506} y={352} f={f} at={4} c="#E4C79A" n={12} s={1.4} z={51} />

        {/* two fitters vault in over the lip */}
        {[0, 1].map(i => {
          const at = 10 + i * 6;
          const k = E(f, at, at + 10, 0, 1, OUT);
          if (k <= 0) return null;
          const x = (i ? 830 : 190) + (i ? -1 : 1) * k * 96;
          return (
            <React.Fragment key={"ft" + i}>
              <Pool x={x} y={742} w={116} z={48} />
              <Crew f={f} x={x} y={746} i={i} size={124} z={50} act={i ? 1 : 3} />
            </React.Fragment>
          );
        })}
      </div>
    </Scene>
  );
};

/* =========================================================================
   S4 — THE FIT-OUT DECK.  f304-444 (4.67s).  BEAT: ESCALATE.  Intensity 8.
   VO: "Cards, pricing, layouts, and ready to use blocks you can drop into any
        project with no design work required."

   ⛔⛔ §3 CONTAINERS vs DEPICTIONS — THE TEST THIS SCENE EXISTS TO PASS. The
   first version was "four panels arrive", i.e. four identical boxes, which carry
   ONE bit of information (there are four) for four and a half seconds. The VO
   names FOUR DIFFERENT NOUNS, so four genuinely different DRAWN objects arrive,
   and each is recognisable by its SHAPE and not by type set on it:
     cards    -> a panel with an IMAGE WELL and three text rules
     pricing  -> THREE COLUMNS of different heights, middle tallest and haloed
     layouts  -> a NAV STRIP that locks home in FIVE discrete detents
     blocks   -> eight more panels stacking on the deck, two at a time
   ⛔ Arrivals run f6 -> f126 across the FULL 140 frames. Bunching them in the
   first third measured 5.94, under the bar, on a build that was better in every
   other way.
   ⛔ INTERNAL HARD CUT AT f70 — a 4.67s scene may not hold one framing.
   ====================================================================== */
/** ⛔⛔ v3/v4 DELIVERED THE "BLOCKS" BEAT AS TEN 136x56 PANELS STACKED IN THE
    TWO CORNERS, and DECK stayed the weakest scene in the reel (8.14 -> 8.20,
    HOLD 57% -> 70%). The diagnosis is §1, not "add more": **small props never
    add up, however many you add.** 56px on the short side is barely over the
    audit's 40px floor, and two edge columns are the part of the frame the
    per-scene push crops anyway.

    ⭐ Rebuilt as NINE 290x92 blocks DEALT ONTO THE DECK across the full width —
    large, bright, fast, and arriving continuously, which is the only shape that
    measures above bar (3-5 movers sits at 2-4). It also reads better: a pallet
    of ready-made sections being dealt out is what "ready to use blocks you can
    drop into any project" actually looks like.
    [x, y, land frame] */
const BLOCK_FAN: Array<[number, number, number]> = [
  [ 46, 700,  84], [356, 700,  90], [666, 700,  96],
  [ 46, 602, 102], [356, 602, 108], [666, 602, 114],
  [ 46, 504, 120], [356, 504, 126], [666, 504, 132],
];

export const S4: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("deck");
  /* ⛔ the internal hard cut moved f70 -> f80 so the re-frame lands ON the
     "ready to use blocks" clause rather than in the middle of the nav seat. */
  const CUT = 80;
  const lit = E(f, 6, 126, 0.10, 1, LIN);
  /* the internal hard cut: a discontinuous re-frame, never a tween */
  const cam = f < CUT ? { x: 0, y: 0, s: 1 } : { x: -30, y: -120, s: 1.22 };
  return (
    <Scene p={p} slug="" push={push(v, 140, 1.07)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="deck" f={f} />
        <Cam x={cam.x} y={cam.y} s={cam.s} z={26}>
          <Front x={FB.x} y={FB.y} w={FB.w} h={FB.h} f={f} lit={lit} z={26}
            slots={SLOT_BOXES} slotOn={1} seats={seatsFor(78, 26, 52)} scaffold />
          {/* ⭐⭐ THE REAL COMPONENT GRID, SCROLLING, set into the frontage. The VO
              names cards, pricing, layouts and blocks; skiper-ui.com's own page
              shows those exact components, so the receipt and the depiction are
              the same object. Real UI is the biggest motion lever in the repo
              (median 6.36 -> 8.00 on reel 107) and it is also the PROOF. */}
          {/* ⛔ 430 lands the viewport on the page's real COMPONENT GRID — the
              white cards — instead of the dark band above it. Same measurement
              as the hook: the strip renders at 552 here, so strip y 720 is
              720 * (552/900) = 441. */}
          <SiteScreen x={FB.x + 30} y={FB.y + 72} w={580} h={430} src="ex_spline_strip.png"
            scroll={1150 + f * 1.2} z={33} url="spline.design" />

          {/* the three named panels FLYING IN on the crane, before they seat */}
          {([
            [26, 216, 536, 174, "card"], [52, 410, 536, 160, "price"], [78, 116, 536, 80, "nav"],
          ] as Array<[number, number, number, number, PanelKind]>).map(([at, sy, sw, sh_, kind], i) => {
            const k = E(f, at - 20, at, 0, 1, OUT);
            if (f >= at || k <= 0) return null;
            /* nav slides in LATERALLY, the other two swing down off the gantry */
            const fromX = kind === "nav" ? -680 : 0;
            const fromY = kind === "nav" ? 0 : -560;
            return (
              <div key={"fly" + i} style={{ position: "absolute", left: 0, top: 0, zIndex: 34,
                transform: `translate(${fromX * (1 - k)}px, ${fromY * (1 - k)}px) rotate(${(1 - k) * (kind === "nav" ? 0 : -7)}deg)` }}>
                <Clad x={FB.x + 52} y={FB.y + sy} w={sw} h={sh_} kind={kind} c={R.libs[0].c}
                  lit={0.8} z={34} />
                {/* the hook it hangs off — a panel does not fly by itself */}
                {kind !== "nav" && (
                  <div style={{ position: "absolute", left: FB.x + 316, top: FB.y + sy - 260,
                    width: 5, height: 260, background: "#7C818C", zIndex: 33 }} />
                )}
              </div>
            );
          })}

          {/* ⭐ FIVE DISCRETE DETENTS on the nav strip — N pops beat one tween */}
          {[0, 1, 2, 3, 4].map(i => {
            const at = 78 + i * 3;
            const k = E(f, at, at + 5, 0, 1, OUT);
            if (k <= 0 || f > at + 14) return null;
            return (
              <div key={"dt" + i} style={{ position: "absolute", left: FB.x + 80 + i * 104,
                top: FB.y + 108, width: 46, height: 96, zIndex: 40,
                background: hexa(R.libs[0].accent, 0.60 * (1 - E(f, at + 4, at + 12, 0, 1, LIN))) }} />
            );
          })}
        </Cam>

        {/* ⭐ "READY TO USE BLOCKS" — nine LARGE panels dealt onto the deck,
            three at a time, f84 -> f132. Each lands with a squash, a recoil, a
            puff and a ring: nothing in this reel lands and simply stops. */}
        {BLOCK_FAN.map(([bx, by, at], i) => {
          const k = E(f, at - 13, at, 0, 1, IN_Q);
          if (k <= 0) return null;
          const yy = by - 620 + k * 620;
          const sq = squash(f, at, 0.19, 3, 12);
          const rk = rock(f, at, 2.4, 20);
          return (
            <React.Fragment key={"bf" + i}>
              <div style={{ position: "absolute", left: 0, top: 0, zIndex: 52 + (i % 3),
                transform: `scale(${2 - sq}, ${sq}) rotate(${rk}deg)`,
                transformOrigin: `${bx + 145}px ${yy + 92}px` }}>
                <Clad x={bx} y={yy} w={290} h={92} kind={i % 3 === 1 ? "media" : "block"}
                  c={R.libs[0].c} lit={0.95} z={52}
                  fill={E(f, at + 3, at + 22, 0, 1, LIN)} />
              </div>
              <Puff x={bx + 145} y={yy + 92} f={f} at={at} c="#C0995E" n={9} s={1.05} z={55} />
              <Ring x={bx + 145} y={yy + 92} f={f} at={at} c="#FFE6B4" r1={190} life={12} z={55} />
            </React.Fragment>
          );
        })}

        {/* ⭐ THE CRANE'S WORK LIGHT crossing the deck for the whole scene. */}
        <Rake f={f} y={0} h={792} x0={-300} span={1520} n={3} c="#FFE6B4" dc="#08060B"
          speed={10.2} z={70} o={0.28} skew={-12} />

        {/* the fitters, running ACTION LOOPS — a bob is an IDLE and an idle is
            not an action (reel 107: failures 3/11 -> 1/11 on this one change).
            ⛔ AND THEY HAVE TO BE BIG: swapping slabs for sprites measured WORSE
            (CTA 8.54 -> 5.14) until they were scaled up and their arrivals cut
            to 8 frames. */}
        <Pool x={128} y={766} w={182} z={48} />
        <Crew f={f} x={128} y={770} i={0} size={192} z={54} act={1} />
        <Pool x={904} y={756} w={166} z={48} />
        <Crew f={f} x={904} y={760} i={5} size={176} z={54} act={0} />

        {/* ⛔ ONE TEXT CHIP PER SHOT, in a band nothing else enters. This is the
            library's REAL component count (skiper-ui.com, "106+"). ⛔ It is NOT
            a price and NOT a free badge — see the ledger. */}
        <div style={{ position: "absolute", left: 40, top: 96, zIndex: 88,
          background: hexa("#1A1813", 0.82), border: `3px solid ${hexa(R.libs[0].accent, 0.7)}`,
          padding: "10px 20px", ...ui(30, 900), color: R.libs[0].accent, letterSpacing: 1 }}>
          {R.libs[0].count} COMPONENTS
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   S5 — CRATE TWO.  f444-476 (1.07s).  BEAT: TURN.  Intensity 7.5.
   VO: "Second, Vengeance UI."

   ⭐⭐ THE BIGGEST VALUE SPREAD IN THE REEL. "Hierarchy needs DARKNESS" and
   THE-OPEN's ">=140 at frame 0" are not opposites: brightness is the MEAN,
   hierarchy is the SPREAD, and the >=140 bar is a FRAME-0 law that does not
   apply here. So this scene commits: one hard shaft out of the case, everything
   else in silhouette. It is about LIGHT because the library is.
   ====================================================================== */
export const S5: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("crate2");
  const iris = E(f, 3, 11, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={push(v, 32, 1.05)} vig={0.54}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="crate2" f={f} />
        {/* the shaft — it fires straight UP out of the case and catches the rain */}
        <div style={{ position: "absolute", left: 506 - 150 * iris, top: -60,
          width: 300 * iris, height: 500, zIndex: 40,
          background: `linear-gradient(0deg, ${hexa(R.libs[1].accent, 0.52 * iris)} 0%, ${hexa(R.libs[1].accent, 0)} 100%)`,
          clipPath: "polygon(38% 100%, 62% 100%, 100% 0%, 0% 0%)" }} />
        {/* rain caught in the beam — small, but it is what makes a shaft read */}
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"rn" + i} style={{ position: "absolute",
            left: 340 + rnd(i, 5) * 340,
            top: ((i * 39 + f * 13) % 520) - 40,
            width: 3, height: 26, zIndex: 41,
            background: hexa(R.libs[1].accent, 0.34 * iris), transform: "rotate(7deg)" }} />
        ))}
        <SiteScreen x={214} y={210 + (1 - iris) * 240} w={584} h={300} src="ex_basement_strip.png"
          scroll={124 + f * 1.2} z={43} on={iris} url="basement.studio" />
        <Crate x={306} y={470} w={400} h={244} f={f} i={1} open={0} z={46} />
        {/* the iris itself, opening on the lid */}
        <div style={{ position: "absolute", left: 506 - 96 * iris, top: 392 - 10,
          width: 192 * iris, height: 40 * iris, borderRadius: "50%", zIndex: 47,
          background: hexa(R.libs[1].accent, 0.9) }} />
        <Ring x={506} y={400} f={f} at={3} c={R.libs[1].accent} r1={300} life={16} z={52} />

        {/* a gaffer shielding their eyes — a real body reaction, not a bob */}
        <Pool x={800} y={738} w={122} z={48} />
        <Crew f={f} x={800} y={742} i={2} size={132} z={50} act={3}
          shock={E(f, 6, 12, 0, 1, OUT)} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S6 — THE LIGHTING GANTRY.  f476-624 (4.93s).  BEAT: ESCALATE.  Intensity 9.
   VO: "Cinematic animations and design elements that make your site look like
        it came from a $10,000 agency."

   ⛔ LIGHT IS ALWAYS A SHAPED CONE, NEVER A FULL-FRAME FILL. Reel 78's
   full-panel red tint was rejected twice — it flattens the grade AND makes the
   motion metric look good for the wrong reason.
   ⭐⭐ THE SWEEP ALTERNATES LIGHT AND SHADOW. Reel 106's light-only bands scored
   7.79 and lifted the black point 47.4 -> 56.1, which is the exact "fix it by
   lifting the shading" move the look gate exists to ban. Interleaving a dark
   band fixed both at once (9.92, black point back DOWN): every boundary becomes
   light-against-shadow, so more luma delta per swept pixel.
   ⭐ And the two things a band trades are SEPARABLE — the HARD EDGE is what
   reads as wallpaper, swept area x SPEED is what measures. So: feathered, wide,
   and FAST.
   ⛔ INTERNAL HARD CUT AT f74.
   ⛔⛔ THE VILLAIN WINS THIS SCENE. The VO hands the agency its own name here,
   so the tower is at full brightness with its invoice re-lit, and it stays that
   way into S9. It has never lost once by this point.
   ====================================================================== */
const FLOODS = [0, 1, 2, 3, 4, 5, 6, 7];

export const S6: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("gantry");
  const CUT = 74;
  const cam = f < CUT ? { x: 0, y: 0, s: 1 } : { x: 120, y: -30, s: 1.34 };
  return (
    <Scene p={p} slug="" push={push(v, 148, 1.06)} vig={0.44}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="gantry" f={f} />

        {/* THE VILLAIN AT FULL STRENGTH — its own scene, its own colour */}
        <Tower x={716} y={110} w={296} h={452} f={f} on={1} z={24} />
        {/* its invoice, re-lit on its own facade */}
        <div style={{ position: "absolute", left: 742, top: 176, width: 244, height: 96,
          zIndex: 26, background: hexa(CREAMB, 0.94), border: `4px solid ${hexa("#8E856E", 0.6)}` }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", ...ui(52, 900), color: "#B3352B" }}>{R.agency.price}</div>
        </div>

        <Cam x={cam.x} y={cam.y} s={cam.s} z={28}>
          {/* ⛔ OUR FRONT WAS 430x496 — 26% of the panel — in the one scene where
              it is supposed to acquire the agency look, and GANTRY sat at 8.51,
              the weakest in the reel. LARGE x BRIGHT x FAST is the only
              combination that registers, so it is now 560x560. */}
          <Front x={38} y={172} w={560} h={560} f={f} lit={E(f, 10, 60, 0.34, 1, LIN)} z={28}
            seats={seatsFor(-99, -99, -99)} scaffold={false} />
          {/* the real vengenceui.com, scrolling through its own cinematic blocks */}
          <SiteScreen x={72} y={214} w={492} h={392} src="ex_basement_strip.png"
            scroll={103 + f * 1.1} z={33} url="basement.studio" />
        </Cam>

        {/* ⭐⭐ §10 — A BEAM WITH NO FINDINGS IS A PROGRESS BAR. v5 switched eight
            lamps on and ramped the front's `lit` smoothly underneath, so the
            picture drew the FIRST half of the mechanism and stopped. Each flood
            now LANDS ON A BAND OF THE FRONT: eight discrete full-width pops that
            settle into a lit state, so the front is BUILT out of the light
            instead of merely brightening. N discrete pops beat one long tween
            (4.27 -> 5.63, measured), and this is eight of them at 560x70. */}
        {FLOODS.map(i => {
          const at = 14 + i * 6;
          const k = E(f, at, at + 4, 0, 1, OUT);
          if (k <= 0) return null;
          const settle = E(f, at + 4, at + 16, 1, 0.30, IO);
          const by = 172 + i * 70;
          return (
            /* ⛔ NOT A FLAT TINT BAR. v6 painted these as solid alpha strips and
               the front read as a striped wall rather than a lit facade. Light
               lands on the TOP of a course and falls off downward, so each band
               is a gradient with a hard lit lip and a shadow under it — which is
               also what gives the boundary its luma delta. */
            <div key={"lb" + i} style={{ position: "absolute", left: 38, top: by, width: 560,
              height: 70, zIndex: 46, transform: `scaleX(${k})`, transformOrigin: "0% 50%",
              background: `linear-gradient(180deg, ${hexa(R.libs[1].accent, 0.46 * k * settle)} 0%, ${hexa(R.libs[1].accent, 0.10 * k * settle)} 46%, ${hexa("#060A12", 0.30 * k * settle)} 100%)` }} />
          );
        })}

        {/* the gantry rail the heads are racked on */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 128, height: 22,
          background: "#3E4A6E", zIndex: 48 }} />
        {FLOODS.map(i => {
          /* ⭐ EIGHT DISCRETE POPS DOWN THE RANK, never a ramp */
          const at = 10 + i * 6;
          const on = E(f, at, at + 4, 0, 1, OUT);
          const x = 66 + i * 124;
          return (
            <React.Fragment key={"fl" + i}>
              <ConeLight x={x} y={172} len={430} spread={210} c={R.libs[1].accent}
                o={0.26 * on} z={30} ang={(i - 3.5) * 4} />
              <FloodHead x={x} y={150} s={0.94} on={on} c={R.libs[1].accent} z={50}
                ang={(i - 3.5) * 4} />
            </React.Fragment>
          );
        })}

        {/* the rig's spill crossing the whole scene, under the hero sweep */}
        <Rake f={f} y={128} h={600} x0={-300} span={1560} n={3} c="#CFE8F2" dc="#060A14"
          speed={8.4} z={58} o={0.22} skew={-12} />

        {/* ⭐ THE SEARCHLIGHT SWEEP — feathered, wide, fast, and alternating
            light AND shadow so every boundary carries luma delta */}
        {f >= 58 && (
          <Rake f={f - 58} y={150} h={600} x0={-340} span={1780} n={4}
            c="#EAF6FF" dc="#060A12" speed={15.1} z={62} o={0.50} skew={-11} />
        )}

        {/* the gaffer who threw the switch, working the rank */}
        <Pole side="l" c="#3E4A6E" w={30} x={-6} z={93} />
        <Pool x={214} y={708} w={176} z={64} />
        <Crew f={f} x={214} y={712} i={2} size={186} z={68} act={1} />
        <Pool x={492} y={700} w={152} z={64} />
        <Crew f={f} x={492} y={704} i={8} size={162} z={68} act={0} />

        {/* ⛔ ONE TEXT CHIP. vengenceui.com ships 46 components across 9
            families. ⛔ NOT a price and NOT a free badge, even though this is
            the one library that is genuinely open source — a badge on two of
            three reads as a badge on all three. */}
        <div style={{ position: "absolute", left: 40, top: 638, zIndex: 88,
          background: hexa("#1A1813", 0.82), border: `3px solid ${hexa(R.libs[1].accent, 0.7)}`,
          padding: "10px 20px", ...ui(30, 900), color: R.libs[1].accent, letterSpacing: 1 }}>
          {R.libs[1].count} COMPONENTS
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   S7 — CRATE THREE.  f624-656 (1.07s).  BEAT: TURN.  Intensity 7.5.
   VO: "Third, Animmaster Lib."

   ⛔⛔ NO PRICE AND NO FREE BADGE ANYWHERE IN THIS SECTION. animmasterlib.dev
   is a PAID product ($3 / $4.99 / $8 one-time) and the VO's hook says all three
   are free. The picture stops at the edge of the claim: this library's receipt
   is its component count and the work it does, which is true.
   ====================================================================== */
export const S7: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("crate3");
  const hinge = E(f, 3, 12, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={push(v, 32, 1.05)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="crate3" f={f} />
        {/* the case has NO BOTTOM — it is the top of a shaft, and the drawers
            are already on their way up out of it */}
        <ConeLight x={506} y={430} len={-380} spread={470} c={R.libs[2].accent}
          o={0.32 * hinge} z={42} ang={180} />
        {[0, 1, 2].map(i => {
          const k = E(f, 8 + i * 4, 20 + i * 4, 0, 1, OUT);
          if (k <= 0) return null;
          return (
            <div key={"dr" + i} style={{ position: "absolute", left: 330 + i * 122,
              top: 430 - k * (140 + i * 44), width: 108, height: 78, zIndex: 44,
              background: dkh(R.libs[2].c, 0.44 - k * 0.20),
              border: `3px solid ${hexa(R.libs[2].accent, 0.6)}` }}>
              <div style={{ position: "absolute", left: "12%", top: "18%", width: "76%",
                height: "42%", background: hexa(R.libs[2].accent, 0.30 + k * 0.44) }} />
            </div>
          );
        })}
        <SiteScreen x={214} y={186 + (1 - hinge) * 250} w={584} h={296} src="ex_rive_strip.png"
          scroll={237 + f * 1.5} z={43} on={hinge} url="rive.app" />
        <Crate x={306} y={452} w={400} h={258} f={f} i={2} open={hinge * 0.6} z={46} />
        <Ring x={506} y={424} f={f} at={3} c={R.libs[2].accent} r1={320} life={16} z={52} />
        <Pool x={180} y={742} w={116} z={48} />
        <Crew f={f} x={180} y={746} i={4} size={126} z={50} act={3} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S8 — THE PARTS RACK.  f656-832 (5.87s).  BEAT: ESCALATE.  Intensity 9.5.
   VO: "Over 250 pre built components covering scroll effects, hero blocks, and
        mouse driven interactions to copy and paste."

   ⭐⭐ THE DENSITY PEAK. Density is a SHAPE, not a level — it must PEAK on the
   one or two scenes that carry the story and thin out elsewhere. This scene and
   S9 are the peak.
   ⛔ TWO INTERNAL HARD CUTS, one per VO clause, so each named capability gets
   its own framing — and the beats are cut to the MEASURED word onsets out of
   the caption JSON, not to a guess.
   ⛔⛔ THE THIRD CLAUSE WAS THE CRITIC'S BIGGEST CATCH. "A cursor moves across"
   is one of the measured ZEROES (a 30x38 cursor scores ~0) and it depicts no
   interaction at all. The missing half of the mechanism (§10) was the RESPONSE,
   not the pointer: the cursor is 200px, and the point is the TRAVELLING WAVE of
   panels flinching as it passes, plus the grab-and-slap that is literally
   "copy and paste".
   ====================================================================== */
export const S8: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("rack");
  const C1 = 60, C2 = 120;
  const seg = f < C1 ? 0 : f < C2 ? 1 : 2;
  const cam = seg === 0 ? { x: 0, y: 0, s: 1 }
            : seg === 1 ? { x: 0, y: -40, s: 1.16 }
            : { x: -60, y: 40, s: 1.22 };
  /* the rack rolls in on rails, cropped by the top edge — the biggest object */
  const roll = E(f, 0, 26, -940, 0, OUT);
  /* clause 2: the whole FRONT slides vertically past a locked camera */
  const scroll = seg >= 1 ? E(f, C1, C1 + 44, 0, -320, IO) : 0;
  /* clause 3: the cursor crosses the block on a diagonal */
  const ck = E(f, C2, C2 + 40, 0, 1, IO);
  const cx = 1060 - ck * 900, cy = 210 + ck * 300;
  const grab = E(f, C2 + 34, C2 + 44, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={push(v, 176, 1.08)} vig={0.46}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="rack" f={f} />

        {/* ---- clause 1 · "over 250 pre built components" ---- */}
        <div style={{ position: "absolute", left: roll, top: 0, right: -roll, bottom: 0, zIndex: 30 }}>
          <PartsRack x={40} y={-70} w={640} h={720} f={f} bays={7} ranks={9}
            openFrom={8} c={R.libs[2].c} z={34} />
        </div>

        {/* ---- clause 2 · "scroll effects, hero blocks" ----
            the front SCROLLS: a full-panel travelling move, and the literal noun */}
        {/* ⭐⭐⭐ THE REAL GALLERY. The VO says "over 250 pre built components
            covering scroll effects, hero blocks and mouse driven interactions",
            and animmasterlib.dev's own page is a grid of exactly those, each
            labelled with its category. Scrolling the real page IS the line.
            ⛔ The site's hero says 300 and the VO says over 250: the VO
            UNDERSTATES it, which is the safe direction, so the capture and the
            drawn chip do not contradict each other. */}
        <SiteScreen x={556} y={64} w={444} h={628} src="ex_rive_strip.png"
          scroll={seg === 0 ? 177 + f * 1.8 : 460 + f * 2.6} z={35} url="rive.app" />

        {/* ⛔ THE DRAWN FRONT USED TO CARRY THIS BEAT AND IT NOW DOUBLE-DRAWS.
            The real page scrolling past a locked camera IS "scroll effects", so
            the hand-drawn stack came out and only the HERO BLOCK stayed — one
            panel twice the size of anything else, slamming into the top of the
            page as the slide stops, which is the noun the VO actually says. */}
        {seg >= 1 && (() => {
          const k = E(f, C1 + 34, C1 + 42, 0, 1, BACK);
          if (k <= 0) return null;
          const sq = squash(f, C1 + 42, 0.22, 3, 12);
          return (
            <div style={{ position: "absolute", left: 0, top: 0, zIndex: 46,
              transform: `scale(${2 - sq}, ${sq})`, transformOrigin: "804px 250px" }}>
              <Clad x={628} y={104 + (1 - k) * -300} w={352} h={190} kind="hero"
                c={R.libs[2].c} lit={1} z={46} fill={E(f, C1 + 44, C1 + 70, 0, 1, LIN)} />
            </div>
          );
        })()}

        {/* ---- clause 3 · "mouse driven interactions to copy and paste" ----
            ⭐ THE POINT IS NOT THE POINTER. Every panel the cursor passes
            FLINCHES — a travelling wave of responses, which is the half of the
            mechanism the first version was missing. */}
        {seg === 2 && (<>
          {[0, 1, 2, 3, 4].map(i => {
            const py = 232 + i * 124;
            const d = Math.abs(cy - py);
            const react = Math.max(0, 1 - d / 190);
            return (
              <div key={"fx" + i} style={{ position: "absolute", left: 664,
                top: py - react * 16, width: 336, height: 104, zIndex: 44,
                background: hexa(R.libs[2].accent, 0.10 + react * 0.34),
                border: `3px solid ${hexa(R.libs[2].accent, 0.2 + react * 0.7)}`,
                transform: `scale(${1 + react * 0.05})` }} />
            );
          })}
          {/* the grab-and-slap: a tile comes off the rack and seats on the front */}
          {grab > 0 && (
            <div style={{ position: "absolute", left: 300 + grab * 420, top: 470 - grab * 150,
              zIndex: 66, transform: `rotate(${(1 - grab) * -16}deg)` }}>
              <Clad x={0} y={0} w={230} h={104} kind="media" c={R.libs[2].c} lit={1} z={66} />
            </div>
          )}
          <Ring x={790} y={430} f={f} at={C2 + 44} c={R.libs[2].accent} r1={260} life={14} z={68} />
          <BigCursor x={cx} y={cy} s={206} z={72} press={grab} />
        </>)}

        <Rake f={f} y={0} h={792} x0={-320} span={1560} n={4} c="#D8F4E6" dc="#040C0A"
          speed={11.3} z={74} o={0.24} skew={-11} />

        {/* ⭐ THE RACK CREW — three ranks, pitch computed BEFORE count:
            `spacing >= 0.85 * size` against an 892px width (n=10 -> 81.1 pitch
            for 92px bodies; n=7 -> 111.5 for 128; n=5 -> 148.7 for 168). Reel
            107 put 18 sprites at 120px pitch for 126px bodies and it rendered as
            one unreadable orange mass. All twelve costumes, cycled. */}
        {seg === 0 && RACK_RANKS.map(([n, gy, sc, op], r) =>
          Array.from({ length: n }, (_, i) => {
            const pitch = 892 / (n + 1);
            const x = 60 + pitch * (i + 1);
            const size = 150 * sc;
            const at = 14 + r * 6 + i * 2;
            const k = E(f, at, at + 8, 0, 1, OUT);
            if (k <= 0) return null;
            return (
              <React.Fragment key={`rk${r}_${i}`}>
                <Pool x={x} y={gy + 4} w={size * 0.86} o={0.30} z={38 + r} />
                <Crew f={f} x={x} y={gy + 4} i={r * 7 + i} size={size * k} z={40 + r}
                  o={op} tint={RANK_TINT[r]} />
              </React.Fragment>
            );
          })
        )}

        {/* ⛔ ONE TEXT CHIP. The VO's own UNDERSTATED figure — the real count is
            300, and an understated number is safe to draw where a different one
            is not. ⛔ NO price anywhere: this library is the paid one. */}
        <div style={{ position: "absolute", left: 40, top: 92, zIndex: 88,
          background: hexa("#0E1A18", 0.86), border: `3px solid ${hexa(R.libs[2].accent, 0.72)}`,
          padding: "10px 22px", ...ui(32, 900), color: R.libs[2].accent, letterSpacing: 1 }}>
          {R.libs[2].count}+ COMPONENTS
        </div>
      </div>
    </Scene>
  );
};

/* =========================================================================
   S9 — THE STREET.  f832-939 (3.57s).  BEAT: PAYOFF.  Intensity 10.
   VO: "This is a website that looks like it costs thousands, but no designer
        ever touched it."

   ⛔⛔ THE VILLAIN LOSES BY BEING OUT-SHONE, NEVER BY BEING TORN DOWN. Its
   invoice is still hanging and still legible; it is simply no longer the
   brightest thing on the street. That is the whole arc, and it is why the board
   survived nine scenes untouched.

   ⭐ TWO TRAVELLING BANDS CROSSING IN ONE FRAME, one light one dark: our front
   lights BOTTOM-UP while the tower dies TOP-DOWN. Every boundary is
   light-against-shadow, which is where the luma delta lives.

   ⭐⭐ AND THE CREW LEAVE. The line is "no designer ever touched it", so the
   payoff is an ABSENCE — the last Claude walks out of frame at f78 and does not
   come back. A crowd cheering here would contradict the sentence.
   ====================================================================== */
export const S9: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("payoff");
  const up = E(f, 0, 40, 0, 1, OUT);          /* ours lights bottom-up   */
  const down = E(f, 40, 70, 1, 0.12, IO);     /* theirs dies top-down    */
  return (
    <Scene p={p} slug="" push={push(v, 107, 1.055)} vig={0.40}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="payoff" f={f} />

        {/* THE FINISHED FRONT — bigger than anything else in the reel, because
            this is the payoff and LARGE x BRIGHT x FAST is the only combination
            that registers. v1 drew it 470px wide in a 1012 panel and the scene
            measured 5.93, under the bar, in the beat that has to be the peak. */}
        <Front x={104} y={92} w={576} h={648} f={f} lit={0.35 + up * 0.65} z={30}
          scaffold={false}
          seats={[
            { x: 46, y: 96, w: 484, h: 76, kind: "nav", c: R.libs[0].c, at: -99 },
            { x: 46, y: 192, w: 484, h: 158, kind: "hero", c: R.libs[1].c, at: -99 },
            { x: 46, y: 370, w: 484, h: 122, kind: "card", c: R.libs[0].c, at: -99 },
            { x: 46, y: 512, w: 484, h: 116, kind: "price", c: R.libs[2].c, at: -99 },
          ]} />
        {/* ⭐⭐ THE ~31s BEAT. Alex: *"the site at 31 seconds it needs to be a
            reference example actual site with hella good scroll animations."*
            The payoff line is *"a website that looks like it costs thousands"*,
            so the finished frontage shows one — locomotive.ca, an agency
            portfolio, still scrolling in colour while the tower beside it dies.
            A drawn facade can only ASSERT the claim; a real page IS it. */}
        <SiteScreen x={140} y={158} w={504} h={438} src="ex_locomotive_strip.png"
          scroll={790 + f * 1.4} z={38} url="locomotive.ca" />

        {/* ⭐ THE LIGHT WAVE CLIMBING OUR FRONT — a 190px band with its own
            SHADOW behind it, so the boundary is light-against-dark rather than a
            wash that would only lift the black point. */}
        <div style={{ position: "absolute", left: 104, top: 92 + (1 - up) * 648 - 90, width: 576,
          height: 210, zIndex: 44,
          background: `linear-gradient(180deg, ${hexa("#060A12", 0.40)} 0%, ${hexa("#FFF3D8", 0.56)} 52%, ${hexa("#FFF3D8", 0)} 100%)` }} />

        {/* THE VILLAIN, out-shone. ⛔ Its invoice stays hanging and legible. */}
        <Tower x={706} y={110} w={292} h={486} f={f} on={down} z={24} />
        {/* the dark taking the tower, TOP-DOWN — the second travelling band, and
            it runs the opposite way to ours so the two cross in one frame */}
        <div style={{ position: "absolute", left: 706, top: 110 - 150 + E(f, 40, 70, 0, 636, IO),
          width: 292, height: 190, zIndex: 27,
          background: `linear-gradient(180deg, ${hexa("#060A12", 0)} 0%, ${hexa("#060A12", 0.74)} 62%, ${hexa("#060A12", 0.86)} 100%)` }} />
        <div style={{ position: "absolute", left: 726, top: 168, width: 252, height: 92,
          zIndex: 26, background: hexa(CREAMB, 0.30 + down * 0.62),
          border: `4px solid ${hexa("#8E856E", 0.4)}` }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
            justifyContent: "center", ...ui(50, 900),
            color: hexa("#B3352B", 0.36 + down * 0.6) }}>{R.agency.price}</div>
        </div>

        <Rake f={f} y={92} h={650} x0={-300} span={1500} n={3} c="#FFF3D8" dc="#060A12"
          speed={10.7} z={58} o={0.36} skew={-9} />

        {/* ⭐ THE STREET EMPTIES. Each one walks OUT, staggered, and the last
            leaves at f78. The ABSENCE is the line — a crowd cheering here would
            contradict "no designer ever touched it". */}
        {[0, 1, 2].map(i => {
          const go = 30 + i * 22;
          const k = E(f, go, go + 28, 0, 1, IO);
          if (k >= 1) return null;
          const x = 340 + i * 210 - k * 760;
          return (
            <React.Fragment key={"ex" + i}>
              <Pool x={x} y={756} w={158} o={0.30 * (1 - k)} z={48} />
              <Crew f={f} x={x} y={760} i={i + 3} size={168} z={50} act={0} o={1 - k * 0.9} />
            </React.Fragment>
          );
        })}
        {/* ⛔ THE TAIL WAS DEAD (HOLD 66%): the last Claude left at f78 and the
            scene held for 29 frames. ⭐ The empty street is the LINE, so nothing
            may walk back in — instead THE SITE RUNS ITSELF. Eight of its own
            lights come up across the frontage, spread f76-104, which is the
            payoff the whole reel built and needs no one standing next to it. */}
        {Array.from({ length: 8 }, (_, i) => {
          const at = 76 + i * 4;
          const k = E(f, at, at + 6, 0, 1, BACK);
          if (k <= 0) return null;
          const col = i % 4, row = Math.floor(i / 4);
          return (
            /* ⛔ these were 96x46 cream slabs floating over the facade. They are
               the site's own lit panels, so they sit INSIDE the frontage and
               carry the panel's own hue with a lit lip, not a cream fill. */
            <div key={"al" + i} style={{ position: "absolute", left: 150 + col * 118,
              top: 636 - row * 70, width: 104, height: 40, zIndex: 52,
              transform: `scaleY(${k})`, transformOrigin: "50% 100%",
              background: `linear-gradient(180deg, ${hexa("#FFF3D8", 0.66 * k)} 0%, ${hexa("#E7B24C", 0.30 * k)} 100%)` }} />
          );
        })}
        <Ring x={392} y={420} f={f} at={98} c="#FFF3D8" r1={520} life={20} z={56} w={7} />
        <Mark x={44} y={92} s={92} z={88} />
      </div>
    </Scene>
  );
};

/* =========================================================================
   S10 — THE MARQUEE.  f939-1005 (2.20s).  BEAT: CTA.  Intensity 8.
   VO: "Comment LIBRARIES below and I'll send you the links."

   ⛔ HARD-CUT ON THE KEYWORD. The reel carries the VO tail and stops.
   ⭐ Split-flap cells flipping letter by letter is a DEPICTION of type
   arriving; typesetting the word is not.
   ====================================================================== */
export const S10: React.FC<{ v: Variant }> = ({ v }) => {
  const f = useCurrentFrame();
  const p = placeFor("cta");
  return (
    <Scene p={p} slug="" push={push(v, 66, 1.05)} vig={0.42}>
      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SetFor k="cta" f={f} />
        <Front x={150} y={40} w={712} h={700} f={f} lit={1} z={26} scaffold={false}
          seats={[
            { x: 60, y: 400, w: 592, h: 120, kind: "card", c: R.libs[0].c, at: -99 },
            { x: 60, y: 540, w: 592, h: 104, kind: "price", c: R.libs[2].c, at: -99 },
          ]} />
        {/* ⭐ the finished shopfront is showing real work, not drawn panels */}
        <SiteScreen x={196} y={352} w={620} h={330} src="ex_stripe_strip.png"
          scroll={487 + f * 1.5} z={38} url="stripe.com" />
        <Marquee x={196} y={168} w={620} h={150} f={f} text={R.keyword} at={6} z={64} c={GOLD} />

        {/* ⛔ ARRIVALS ACROSS THE FULL DURATION. v3 put all three of these
            inside the first 34 of 66 frames and the scene then held (HOLD 77%) —
            the exact rebuild that measured 5.94 on reel 104 despite being better
            in every other way. Five now, staggered f10 -> f46. */}
        {[0, 1, 2, 3, 4].map(i => {
          const at = 10 + i * 9;
          const k = E(f, at, at + 10, 0, 1, BACK);
          if (k <= 0) return null;
          const xs = [228, 506, 784, 366, 646];
          return (
            <React.Fragment key={"ct" + i}>
              <Crew f={f} x={xs[i]} y={886 - k * (i < 3 ? 132 : 86)} i={i + 6}
                size={i < 3 ? 214 : 158} z={i < 3 ? 70 : 68}
                act={2} cheer={E(f, at + 16, at + 24, 0, 1, OUT)} />
            </React.Fragment>
          );
        })}

        {/* ⭐ AND THE SIGN CONFIRMS ITSELF — the whole marquee flashes twice
            after the last cell lands, which is what a sign actually does when it
            finishes setting. Two discrete pops, never a fade. */}
        {[38, 50].map((at, i) => {
          const k = 1 - E(f, at, at + 8, 0, 1, LIN);
          if (f < at || k <= 0) return null;
          return (
            <div key={"fl" + i} style={{ position: "absolute", left: 178, top: 150, width: 656,
              height: 186, zIndex: 66, background: hexa("#FFE9A8", 0.42 * k) }} />
          );
        })}
        <Rake f={f} y={0} h={792} x0={-300} span={1500} n={3} c="#FFE9A8" dc="#0A0704"
          speed={9.3} z={74} o={0.26} skew={-12} />
        <Mark x={44} y={92} s={96} z={88} />
      </div>
    </Scene>
  );
};
