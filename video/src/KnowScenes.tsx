import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh, squash, rock, shake, idle,
  Scene, Cam, Mark, MarkPlate, MarkCast, Plate, BigNum, Contact, Chip,
  Crew, Hero, Forearm, costumeFor, Ring, Puff, Pool, Steam, Tile, Counter,
  mono, ui, R, HourRail, Belt, Cable, Ingot, Furnace,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, ENAM, SODIUM, VIOLET, OXIDE, CYAN, IRON, EMBER, ING, INGH, INGD,
} from "./KnowWorld";
import {
  HourDrum, Pour, Chute, Mould, Grind, IngotRack, UsageGauge, Assembly,
  SpoolWall, FeedSpool, FeedRail, Booth, PageWindow, Facts, FormBoard,
  CodeRig, AppBuild, Loom, Unit, SocketWall, Cartridge, Guide, CommentSlot,
} from "./KnowProps";
import { SetFor, placeFor, Pier } from "./KnowSets";

/* ===========================================================================
   REEL 117 · "KNOW" — THE SCENES.  Board: storyboards/117-know.md §2.

   ⛔⛔ EVERY SCENE START IS A MEASURED WORD ONSET from words_117know.json,
   converted to frames and pulled back by the house 4-frame picture lead.
   Nothing here is estimated. The table lives in ClaudeKnowReel.tsx as `L`.

   ⛔⛔ AND A SCENE NEEDS AN EVENT, NOT A COMPOSITION (§2). Each one below names
   its four parts in a comment: a BEFORE state legible on its first frame, a
   visible TRIGGER, TRAVEL that crosses distance, and an ARRIVAL THAT COSTS
   SOMETHING. Nothing in this reel lands and simply stops.

   ⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). `Crew` running four loops is
   what the works does WHILE the scene happens. Every scene still has to have
   the event.

   ⛔ ARRIVALS SPREAD ACROSS THE FULL DURATION. An arrival inside the first
   third leaves the rest dead — reel 104 measured 5.94 on a scene that was
   better in every other way and put everything in its first 34 of 70 frames.
   ========================================================================= */

export type Variant = "works" | "forge" | "night";
export type SP = { v: Variant; dur: number };

/** ⭐ THE VARIANT LEVERS, ranked by MEASURED dHash contribution:
    rake > grade > camera > bed > layout. ⛔ `hue-rotate`/`saturate` are BANNED
    from GRADE — reel 112 shipped an off-brand mascot that way. Separation is
    bought from RAKE and CAMERA, and the three cuts are ONE BODY, THREE HOOKS. */
export const RAKE_K: Record<Variant, number> = { works: 1, forge: 1.66, night: 0.42 };
/** ⭐ THE RAKE'S ANGLE, PER CUT. A dHash is GEOMETRY, and rotating the light
    bands by +-9 degrees moves every band's intersection with every edge in the
    frame — which is a large, cheap, sprite-free change of exactly the thing the
    hash samples. Speed and phase were already at their useful limits. */
export const RAKE_ANG: Record<Variant, number> = { works: 0, forge: 9, night: -9 };
/** ⭐ A PHASE OFFSET ON THE RAKE AND ON THE PARALLAX, and the offsets have to be
    LARGE. v1 used 260 / -190 and the body frames measured 5-12 bits against a
    min bar of 10, because speed alone still lets two cuts coincide on any given
    frame — an offset is what guarantees every band sits somewhere different in
    EVERY frame, which is what a dHash actually samples. Reel 115 shipped
    -260/260/780 and 0/940/-620 and scored the best separation in the repo. */
export const RAKE_X0: Record<Variant, number> = { works: -260, forge: 260, night: 780 };
export const PAR_X: Record<Variant, number> = { works: 0, forge: 940, night: -620 };
export const CAM: Record<Variant, { s: number; dx: number; dy: number; rot: number }> = {
  /* ⛔ THREE CAMERAS NEED THREE DIRECTIONS, NOT TWO SIMILAR ONES. Pushing
     night to dx -30 fixed works<->night (8 -> 13 on the worst frame) and
     immediately collided forge<->night at 5, because both cuts were then up and
     to the left at nearly the same scale. They now occupy three quadrants:
     works neutral, forge down-left, night up-right. */
  works: { s: 1.000, dx: 0, dy: 0, rot: 0 },
  forge: { s: 1.058, dx: -44, dy: 26, rot: 1.6 },
  /* ⛔ NIGHT WAS THE WEAK PAIR. At s1.030/dx20/rot-1.1 with a near-neutral
     grade it measured 5-8 bits against works on five body frames — a mild
     camera plus a mild grade is not a variant, it is the same picture nudged.
     Pushed to the crop bound and no further: at push 1.096 x s 1.078 the
     visible half-width is 429px, so `dx` goes NEGATIVE (content left, window
     right) to keep the brass spine at x880-927 inside it. */
  night: { s: 1.062, dx: 36, dy: -30, rot: -2.2 },
};
/** ⛔⛔⛔ A TRIAL CUT MAY NEVER RECOLOUR THE CLAUDE. The grade is a CSS filter
    over the whole panel, so a `hue-rotate` on the SET drags the cast with it —
    reel 115's amber cut shipped an off-brand mascot exactly that way, against a
    standing delivery gate that says every Claude is the one house clay.
    ⭐ HUE IS NOT A VARIANT LEVER. `hue-rotate` and `saturate` are BANNED here;
    saturate is held at one value for all three cuts and only CONTRAST and
    BRIGHTNESS move, which change punch without moving a single hue.
    ⛔ AND BOTH MOVE IN THE SAFE DIRECTION ONLY. This reel's BODY_BLACK sits at
    p10 34.7 against a bar of 35, with 0.3 of headroom — and lowering contrast
    or raising brightness both LIFT the black point. Every contrast below is
    >= 1.0 and every brightness <= 1.0, so the trial cuts can only take the
    blacks DOWN. */
export const GRADE: Record<Variant, string> = {
  works: "contrast(1.020) saturate(1.16) brightness(1.000)",
  forge: "contrast(1.155) saturate(1.16) brightness(0.958)",
  night: "contrast(1.210) saturate(1.16) brightness(0.952)",
};

/** the rail's fill at each scene — the number spine, six of fifteen */
const RAIL = { S0: 0, S1: 0, S2: 1, S3: 1, S4: 2, S5: 2, S6: 3, S7: 4, S8: 4,
  S9: 5, S10: 5, S11: 6, S12: 6, S13: 6, S14: 6, S15: 6 } as const;

/** the spine, drawn the same way in every body scene: the brass climb at frame
    right, creeping, with its lit slots bright and its unlit ones shadow. */
const Spine: React.FC<{ f: number; lit: number; at?: number; x?: number; y?: number;
  s?: number }> = ({ f, lit, at = 0, x = 846, y = 128, s = 0.84 }) => (
  <HourRail x={x} y={y} f={f} lit={lit} at={at} s={s} z={78} label="TIPS" />
);

/* =========================================================================
   S0 · THE POUR — 31f (0.00-1.03s).  LOCKED WIDE.  **HOOK**
   VO: "Give me 30 seconds and I'll give you…"

   ⛔ THE-OPEN law 1: FRAME 0 IS A BRIGHTNESS COMPETITION, and law 2: A CLAUDE
   IS IN IT. Both are settled on frame 0 here, not arrived at.
   ⭐ THE CLAIM PLATE CARRIES `HOOK_LUMA` AND `HOOK_PLATE` SO THAT NO PROP HAS
   TO (reel 110). The drum stays a near-black cast mass, which is the only way
   its silhouette forms, and the plate is the largest bright object.

   EVENT — before: a 620px drum stamped 10,000 HRS beside a mould an eighth its
   size, NIB's hand on the lever, and the grind turning through the floor grate.
   trigger: the lever slams at f9, two frames, hard.  travel: the drum face
   cracks and a full-panel-width torrent rips down the chute.  arrival: S1.
   ====================================================================== */
/* ⛔⛔⛔ ONE BODY, THREE HOOKS — NOT THREE GRADED COPIES.
   Measured: with the three cuts differing only by rake, parallax, camera and
   bed, `dhash_cuts` returned **mean 13.0, MIN 5** against targets of mean >=14
   and min >=10. Nine of eleven sampled frames were inside the flagging band,
   and the worst pair was forge<->night, which is exactly what the house variant
   system has always scored (3.4-7.0 bits of 64, every pair a duplicate risk).
   ⭐ The lever ranking says rake > grade > camera > bed > layout, and all four
   of the top levers were already at their useful limit. What was left is the
   one the doc actually asks for: give each cut its OWN HOOK. Same VO, same
   sixteen body scenes, three different first three seconds:

     works  THE POUR     a hopper stamped 10,000 HRS emptying into a 30 SEC
                         mould. Molten amber. The promise, delivered.
     forge  THE SLOW WAY the whetstone, cold blue-grey, five Claudes walking
                         out their ten thousand hours one at a time, and the
                         ingot arriving on a chain to stop them. The PRICE.
     night  THE CLIMB    the works from outside at night, cool teal, the three
                         lit decks stacked in one window and the rail climbing
                         past all of them. The LADDER.

   Three different rooms, three different palettes, three different events —
   which is a real experiment about which open works, not a colourway. */
export const S0: React.FC<SP> = (pr) =>
  pr.v === "forge" ? <S0Forge {...pr} /> : pr.v === "night" ? <S0Night {...pr} /> : <S0Pour {...pr} />;

const S0Pour: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("pour");
  const PULL = 9, CRACK = 12;
  /* ⛔ frame 0 must be SETTLED, not mid-roll: everything below is drawn at its
     resting value at f=0 and only the lever and the pour are animated. */
  const pull = E(f, PULL, PULL + 2, 0, 1, IN_Q);
  const crack = E(f, CRACK, CRACK + 5, 0, 1, OUT);
  /* ⭐ THE PANEL IS BANDED, so nothing has to fight anything else for room:
       0-100    the HookHeader pill (chassis)
       126-316  the claim plate
       300-700  the action — hopper, chute, mould, cast
       700-792  the floor grate, and the villain turning under it
     v3 put the plate on the floor at y=520 and it buried the `30 SEC` mould,
     which is half of the metaphor, while the brick pier at z93 painted over the
     plate's own left edge and clipped the first glyph of the headline. */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.30}>
      <Cam z={5}>
        <SetFor k="pour" f={f} t={f * 0.8} rakeRate={6.4 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* THE HOPPER — the largest object in the reel, near-black against the
            lit tapping bay. Brightness is the MEAN, hierarchy is the SPREAD. */}
        <HourDrum x={268} y={596} f={f} s={0.64} z={34} crack={crack} />

        {/* the chute it discharges into, running down to the mould */}
        <Chute x0={272} y0={556} x1={800} y1={636} w={112} z={30} f={f} />

        {/* THE MOULD — an eighth of the hopper. The proportion IS the promise. */}
        <Mould x={812} y={706} f={f} s={0.82} z={44} fill={0} />

        {/* the torrent, once the gate has lifted */}
        <Pour f={f} at={CRACK + 2} x0={276} y0={552} x1={812} y1={630} n={24} z={52}
          rate={0.075} s={0.84} spread={70} />

        {/* NIB, hand on the lever — settled at f0, drives on the trigger.
            ⛔ THE FOREARM STARTS ON HIS OWN ARM AND ENDS ON THE GRIP. A limb
            terminating in mid-air reads as a tail (reel 115). */}
        <Hero f={f} x={548} y={730} size={244} z={70} drive={pull * 0.9}
          strain={pull * 0.5} reach={66} costume={{ constr: 1 }} act={3} ph={0.4} flip />
        <div style={{ position: "absolute", left: 664, top: 574, width: 24, height: 138,
          zIndex: 68, borderRadius: 12, transformOrigin: "50% 100%",
          transform: `rotate(${-20 + pull * 48}deg)`,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.50)} 100%)` }}>
          <div style={{ position: "absolute", left: -11, top: -17, width: 46, height: 34,
            borderRadius: 9, background: CLAYD }} />
        </div>
        {/* the lever's own pedestal, so it is bolted to the floor */}
        <div style={{ position: "absolute", left: 642, top: 704, width: 68, height: 34,
          zIndex: 66, borderRadius: 6, background: dkh(IRON, 0.58) }} />

        {/* the gantry crew — a background process, each on its own loop */}
        <Crew f={f} x={132} y={706} i={0} size={158} z={26} at={-10} loop={1} />
        <Crew f={f} x={946} y={712} i={5} size={152} z={26} at={-10} loop={3} />

        {/* ⭐⭐ THE CLAIM PLATE — the largest bright object at frame 0, and the
            one thing carrying BOTH frame-0 gates so that no PROP has to (reel
            110: a gate carried by the wrong object deforms that object).
            ⛔ z=96, ABOVE the brick pier: at z92 the pier painted over its left
            edge and the headline shipped reading "0,000 HOURS".
            ⛔ AND IT IS ONE CONTIGUOUS CREAM REGION — HOOK_PLATE measures
            CONTIGUITY, not area, so there is no dark inset anywhere in it.
            ⛔ Its top sits at y126, a clear 26px of dark set below the header
            pill, so the gate cannot merge the two and discount both as chassis. */}
        <div style={{ position: "absolute", left: 124, top: 126, width: 830, zIndex: 96,
          borderRadius: 18, padding: "24px 30px", background: CREAMB,
          border: `8px solid ${INK}`, boxShadow: SH_D, display: "flex",
          alignItems: "center", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...ui(76, 900), color: INK, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>10,000 HOURS</div>
            <div style={{ ...ui(76, 900), color: CLAYD, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>OF CLAUDE</div>
          </div>
          <div style={{ padding: "12px 16px", textAlign: "center", whiteSpace: "nowrap" }}>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>IN 30</div>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>SECONDS</div>
          </div>
        </div>
        {/* the mark, big and early — the audience filter, never on a face, and
            ⛔ never in the middle of the plate (it would carve the region out) */}
        <MarkCast x={936} y={412} s={96} z={94} f={f} spin={0.5} />

        <Contact x={446} y={736} w={222} z={64} o={0.30} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · THE INGOT — 62f (1.03-3.10s).  HARD CUT, PUNCHED IN.  **HOOK PAYOFF**
   VO: "…10,000 hours of Claude knowledge."

   ⭐ THE ARRIVAL THAT COSTS SOMETHING. Reel 104: a gentle arrival is not an
   event. The torrent slams, the mould overflows, the deck recoils 6px, the
   crew flinch, and the counter snaps 0 -> 10,000 in FOUR DISCRETE STEPS.
   ⭐ AN ACTION IS A DISTANCE (§11): the ingot rises 214px, which is 4.8x its
   own height. Under about a third of its own size would be a state change.
   ====================================================================== */
export const S1: React.FC<SP> = (pr) =>
  pr.v === "forge" ? <S1Forge {...pr} /> : pr.v === "night" ? <S1Night {...pr} /> : <S1Pour {...pr} />;

const S1Pour: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("pour");
  const SLAM = 10, RISE = 22, COUNT = 24;
  const fill = E(f, 0, SLAM + 6, 0.1, 1, OUT);
  const rise = E(f, RISE, RISE + 9, 0, 1, BACK);
  /* the whole deck recoils on the slam — the impact costs the SET something */
  const kick = f >= SLAM ? Math.sin((f - SLAM) / 3.1) * 6 * Math.exp(-(f - SLAM) / 14) : 0;
  const gy = p.horizon + 150;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.098]} vig={0.36}>
      <Cam z={5} y={kick}>
        <SetFor k="pour" f={f + 40} t={f * 0.8 + 300} rakeRate={7.2 * RAKE_K[v]}
          rakeX0={RAKE_X0[v]} parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* the drum is now a dark mass at the frame edge — same world, new shot */}
        <HourDrum x={-40} y={440} f={f + 40} s={0.74} z={20} crack={1} />
        <Chute x0={-40} y0={452} x1={452} y1={566} w={196} z={26} f={f + 40} />

        {/* the pour, still running, until the slam */}
        {f < SLAM + 14 && <Pour f={f} at={0} x0={-30} y0={446} x1={480} y1={558} n={22} z={40}
          rate={0.085} s={1.1} spread={108} />}

        <Mould x={506} y={gy + 40} f={f} s={1.28} z={34} fill={fill} hot={E(f, SLAM, SLAM + 20, 1, 0.3, OUT)} />

        {/* the overflow — an arrival that costs something, thrown wide */}
        <Puff x={506} y={gy - 40} f={f} at={SLAM} c="#FFE0A4" n={16} s={1.5} z={62} spread={1.5} />
        <Ring x={506} y={gy - 30} f={f} at={SLAM} r={300} z={60} c={INGH} w={11} />
        <Ring x={506} y={gy - 30} f={f} at={SLAM + 5} r={220} z={60} c={EMBER} w={7} />

        {/* ⭐ THE HERO ARTIFACT, BORN. 40% of panel height, and it rises 4.8x
            its own height so the movement is a DISTANCE, not a state change. */}
        <Ingot x={506} y={gy - 74 - rise * 262} s={3.3} z={72} stamp={R.hours}
          hot={E(f, RISE, RISE + 34, 1, 0.25, OUT)} rot={-4 + rise * 4} />
        <Steam x={506} y={gy - 350} f={f} at={RISE + 6} n={8} s={1.7} z={70} c="#FFE9C8" />

        {/* the crew flinch on the slam — the impact reaches the CAST */}
        <Crew f={f} x={150} y={gy + 46} i={2} size={186} z={66} at={0} loop={3} />
        <Crew f={f} x={886} y={gy + 52} i={7} size={182} z={66} at={0} loop={2} />
        <Hero f={f} x={712} y={gy + 40} size={244} z={68} costume={{ constr: 1 }} act={2}
          ph={1.2} shock={E(f, SLAM, SLAM + 4, 0, 1, OUT) - E(f, SLAM + 6, SLAM + 22, 0, 1, OUT)}
          cheer={E(f, RISE + 4, RISE + 12, 0, 1, OUT)} />

        {/* ⛔ FOUR DISCRETE STEPS, NEVER A TWEEN. §1: N pops beat a long ramp. */}
        <Counter x={92} y={150} f={f} at={COUNT} to="10,000" s={1.15} z={86} label="HOURS BANKED"
          c="#2A2118" dur={22} />

        <MarkCast x={862} y={128} s={92} z={90} f={f} spin={0.5} />
        <Contact x={430} y={gy + 44} w={168} z={30} o={0.34} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   THE FORGE CUT'S HOOK — "THE SLOW WAY".  Cold blue-grey, the villain first.
   Same VO, same event shape (before / trigger / travel / arrival that costs),
   completely different room, palette and subject from the pour.
   ====================================================================== */
const S0Forge: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("grind");
  const gy = p.horizon + 120;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.34}>
      <Cam z={5}>
        <SetFor k="grind" f={f} t={f * 0.5} rakeRate={4.6 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} lit={1.35} />
        {/* the villain, full panel, turning — the PRICE of ten thousand hours */}
        <Grind x={430} y={gy + 92} f={f} s={1.06} z={36} rate={2.1} n={5} lit={1} />
        {/* the tally board: what one lap on that wheel is worth */}
        <Counter x={706} y={352} f={f} at={-40} to="1" s={1.5} z={80} label="HOURS BANKED"
          c="#2A3038" dur={4} />
        <Hero f={f} x={244} y={gy + 96} size={228} z={70} costume={{ beard: 1 }} act={0} ph={1.4}
          drive={Math.abs(Math.sin(f / 12)) * 0.5} reach={44} stern={0.6} />
        <Crew f={f} x={880} y={gy + 100} i={3} size={168} z={62} at={-10} loop={0} />
        {/* one contiguous cream region, top edge clear of the header pill */}
        <div style={{ position: "absolute", left: 124, top: 126, width: 830, zIndex: 96,
          borderRadius: 18, padding: "24px 30px", background: CREAMB,
          border: `8px solid ${INK}`, boxShadow: SH_D, display: "flex",
          alignItems: "center", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...ui(76, 900), color: INK, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>10,000 HOURS</div>
            <div style={{ ...ui(76, 900), color: CLAYD, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>THE SLOW WAY</div>
          </div>
          <div style={{ padding: "12px 16px", textAlign: "center", whiteSpace: "nowrap" }}>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>OR 30</div>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>SECONDS</div>
          </div>
        </div>
        <MarkCast x={928} y={402} s={100} z={94} f={f} spin={0.5} />
        <Contact x={144} y={gy + 100} w={206} z={30} o={0.30} />
      </Cam>
    </Scene>
  );
};

/** the forge cut's payoff — the ingot arrives on a chain and the wheel stops
    mattering. ⭐ Same beat as the pour cut (the artifact is born) and a
    completely different picture of it. */
const S1Forge: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("grind");
  const DROP = 4, LAND = 22, COUNT = 26;
  const drop = E(f, DROP, LAND, -420, 0, IN_Q);
  const kick = f >= LAND ? Math.sin((f - LAND) / 3.0) * 8 * Math.exp(-(f - LAND) / 15) : 0;
  const gy = p.horizon + 120;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.092]} vig={0.40}>
      <Cam z={5} y={kick}>
        <SetFor k="grind" f={f + 30} t={f * 0.5 + 200} rakeRate={5.2 * RAKE_K[v]}
          rakeX0={RAKE_X0[v]} parX={PAR_X[v]} lit={1.2 + E(f, LAND, LAND + 12, 0, 0.9, OUT)} />
        <Grind x={250} y={gy + 92} f={f} s={0.92} z={26} rate={2.1} n={4} lit={1} />
        {/* the hatch, the chain, and the artifact coming down through it */}
        <div style={{ position: "absolute", left: 470, top: -10, width: 320, height: 46, zIndex: 40,
          borderRadius: 6, background: dkh(IRON, 0.56) }} />
        <div style={{ position: "absolute", left: 622, top: 34, width: 20,
          height: Math.max(0, 300 + drop), zIndex: 41,
          background: `repeating-linear-gradient(180deg, ${dkh(IRON, 0.28)} 0px, ${dkh(IRON, 0.28)} 11px, ${dkh(IRON, 0.62)} 11px, ${dkh(IRON, 0.62)} 22px)` }} />
        <Ingot x={632} y={352 + drop} s={3.2} z={72} stamp={R.hours}
          hot={E(f, LAND, LAND + 30, 1, 0.3, OUT)} rot={-3} />
        <Pool x={632} y={430 + drop} w={760} c="#FFE9BE" o={0.34} z={20} />
        <Ring x={632} y={366} f={f} at={LAND} r={330} z={64} c={INGH} w={10} />
        <Puff x={632} y={410} f={f} at={LAND} c="#C8D6E0" n={16} s={1.5} z={62} spread={1.5} />
        <Steam x={632} y={190} f={f} at={LAND + 6} n={7} s={1.5} z={70} c="#EAF2F8" />
        {/* they stop walking and look up — the cost has just been cancelled */}
        <Hero f={f} x={300} y={gy + 96} size={216} z={70} costume={{ beard: 1 }} act={3} ph={1.4}
          shock={E(f, LAND, LAND + 5, 0, 1, OUT) - E(f, LAND + 10, LAND + 26, 0, 1, OUT)}
          cheer={E(f, LAND + 12, LAND + 22, 0, 1, OUT)} />
        <Crew f={f} x={906} y={gy + 100} i={8} size={168} z={62} at={-10} loop={2} />
        <Counter x={92} y={150} f={f} at={COUNT} to="10,000" s={1.15} z={86} label="HOURS BANKED"
          c="#2A3038" dur={22} />
        <MarkCast x={912} y={132} s={92} z={90} f={f} spin={0.5} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   THE NIGHT CUT'S HOOK — "THE CLIMB".  The works from outside, cool teal, the
   three lit decks stacked in one window and the rail climbing past all of them.
   ====================================================================== */
const S0Night: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("street");
  const gy = p.horizon + 130;
  const DECKS: Array<[string, string]> = [["EXPERT", VIOLET], ["INTERMEDIATE", TEAL], ["BEGINNER", SODIUM]];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.056]} vig={0.32}>
      <Cam z={5}>
        <SetFor k="street" f={f} t={f * 1.1} rakeRate={7.0 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} lit={1.25} />
        {/* THE WORKS — one tall building, three lit floors, each its own colour */}
        <div style={{ position: "absolute", left: 232, top: 118, width: 548, height: gy - 92,
          zIndex: 30, borderRadius: "10px 10px 4px 4px",
          background: `linear-gradient(178deg, ${hexa("#2A3742", 0.96)} 0%, ${hexa("#16202A", 0.98)} 100%)`,
          border: `9px solid ${hexa("#101A22", 0.9)}` }}>
          {DECKS.map(([lab, c], i) => (
            <div key={"dk" + i} style={{ position: "absolute", left: 22, right: 22,
              top: 26 + i * 148, height: 122, borderRadius: 6, overflow: "hidden",
              background: `linear-gradient(178deg, ${hexa(c, 0.86)} 0%, ${hexa(dkh(c, 0.34), 0.94)} 100%)` }}>
              {/* silhouettes at work behind each lit floor's glazing */}
              {Array.from({ length: 4 }, (_, k) => (
                <div key={"sil" + k} style={{ position: "absolute",
                  left: 22 + k * 118 + Math.sin(f / 14 + k * 2 + i) * 12, bottom: 8,
                  width: 62, height: 66, borderRadius: 8, background: hexa("#141A22", 0.72) }} />
              ))}
              {/* the floor's own mullions */}
              {[0.33, 0.66].map((q, k) => (
                <div key={"mu" + k} style={{ position: "absolute", left: `${q * 100}%`, top: 0,
                  bottom: 0, width: 6, background: hexa("#101A22", 0.8) }} />
              ))}
              <div style={{ position: "absolute", left: 10, top: 8, padding: "4px 10px",
                borderRadius: 5, background: hexa("#0C1218", 0.72) }}>
                <span style={{ ...mono(15, 900), color: "#F2EADA", letterSpacing: "0.14em" }}>{lab}</span>
              </div>
            </div>
          ))}
        </div>
        {/* ⭐ THE RAIL CLIMBING PAST ALL THREE — the reel's spine, introduced as
            the hook's own subject rather than as furniture at the frame edge. */}
        <HourRail x={806} y={140} f={f} lit={0} at={0} s={1.15} z={72} label="15 TIPS" />
        {/* an ingot riding the hoist up the outside of the building */}
        {Array.from({ length: 3 }, (_, i) => {
          const t = (((f * 0.9 + i * 44) % 132) / 132);
          return <Ingot key={"hz" + i} x={186} y={gy - t * 480} s={1.5} z={54}
            stamp="1 HR" hot={0.4} rot={-4} />;
        })}
        <div style={{ position: "absolute", left: 178, top: 108, width: 16, height: gy - 90,
          zIndex: 40, background: `repeating-linear-gradient(180deg, ${dkh(IRON, 0.30)} 0px, ${dkh(IRON, 0.30)} 10px, ${dkh(IRON, 0.60)} 10px, ${dkh(IRON, 0.60)} 20px)` }} />
        <Hero f={f} x={906} y={gy + 60} size={228} z={70} costume={{ prof: 1 }} act={3} ph={0.6} />
        <Crew f={f} x={92} y={gy + 62} i={6} size={162} z={62} at={-10} loop={1} />
        {/* one contiguous cream region, top edge clear of the header pill */}
        <div style={{ position: "absolute", left: 124, top: 126, width: 830, zIndex: 96,
          borderRadius: 18, padding: "24px 30px", background: CREAMB,
          border: `8px solid ${INK}`, boxShadow: SH_D, display: "flex",
          alignItems: "center", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ ...ui(76, 900), color: INK, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>10,000 HOURS</div>
            <div style={{ ...ui(76, 900), color: CLAYD, lineHeight: 0.92,
              letterSpacing: "-0.025em" }}>IN 3 FLOORS</div>
          </div>
          <div style={{ padding: "12px 16px", textAlign: "center", whiteSpace: "nowrap" }}>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>IN 30</div>
            <div style={{ ...mono(30, 900), color: INK, letterSpacing: "0.06em" }}>SECONDS</div>
          </div>
        </div>
        <MarkCast x={936} y={412} s={96} z={94} f={f} spin={0.5} />
      </Cam>
    </Scene>
  );
};

/** the night cut's payoff — the hoist tips its load into the top floor and the
    whole building lights, one deck at a time, bottom to top. */
const S1Night: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("street");
  const TIP = 12, COUNT = 22;
  const kick = f >= TIP ? Math.sin((f - TIP) / 3.0) * 7 * Math.exp(-(f - TIP) / 14) : 0;
  const gy = p.horizon + 130;
  const DECKS: Array<[string, string]> = [["EXPERT", VIOLET], ["INTERMEDIATE", TEAL], ["BEGINNER", SODIUM]];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.38}>
      <Cam z={5} y={kick}>
        <SetFor k="street" f={f + 40} t={f * 1.1 + 260} rakeRate={7.8 * RAKE_K[v]}
          rakeX0={RAKE_X0[v]} parX={PAR_X[v]} lit={1.3} />
        <div style={{ position: "absolute", left: 150, top: 104, width: 700, height: gy - 76,
          zIndex: 30, borderRadius: "12px 12px 4px 4px",
          background: `linear-gradient(178deg, ${hexa("#2A3742", 0.96)} 0%, ${hexa("#16202A", 0.98)} 100%)`,
          border: `10px solid ${hexa("#101A22", 0.9)}` }}>
          {DECKS.map(([lab, c], i) => {
            /* bottom to top: BEGINNER lights first */
            const at = TIP + (2 - i) * 7;
            const on = E(f, at, at + 6, 0.24, 1, OUT);
            return (
              <div key={"dk" + i} style={{ position: "absolute", left: 26, right: 26,
                top: 30 + i * 178, height: 150, borderRadius: 7, overflow: "hidden",
                background: `linear-gradient(178deg, ${hexa(c, 0.88 * on)} 0%, ${hexa(dkh(c, 0.34), 0.94)} 100%)`,
                transform: `scaleY(${0.96 + on * 0.04})` }}>
                {Array.from({ length: 5 }, (_, k) => (
                  <div key={"sil" + k} style={{ position: "absolute",
                    left: 24 + k * 122 + Math.sin(f / 12 + k * 2 + i) * 16, bottom: 10,
                    width: 74, height: 82, borderRadius: 9, background: hexa("#141A22", 0.74) }} />
                ))}
                <div style={{ position: "absolute", left: 12, top: 10, padding: "5px 12px",
                  borderRadius: 5, background: hexa("#0C1218", 0.74) }}>
                  <span style={{ ...mono(17, 900), color: "#F2EADA", letterSpacing: "0.14em" }}>{lab}</span>
                </div>
              </div>
            );
          })}
        </div>
        {DECKS.map((_, i) => (
          <Ring key={"dr" + i} x={500} y={190 + i * 178} f={f} at={TIP + (2 - i) * 7} r={330}
            z={64} c={INGH} w={8} />
        ))}
        <Ingot x={500} y={168} s={3.0} z={74} stamp={R.hours}
          hot={E(f, TIP, TIP + 30, 1, 0.3, OUT)} rot={-3 + E(f, TIP, TIP + 8, 0, 6, OUT)} />
        <Steam x={500} y={104} f={f} at={TIP + 4} n={7} s={1.5} z={72} c="#DCEAF4" />
        <Hero f={f} x={906} y={gy + 60} size={236} z={70} costume={{ prof: 1 }} act={2} ph={0.6}
          cheer={E(f, TIP + 10, TIP + 20, 0, 1, OUT)} />
        <Crew f={f} x={78} y={gy + 62} i={2} size={166} z={62} at={-10} loop={3} />
        <Counter x={92} y={150} f={f} at={COUNT} to="10,000" s={1.15} z={86} label="HOURS BANKED"
          c="#1E2A34" dur={22} />
        <MarkCast x={924} y={132} s={92} z={90} f={f} spin={0.5} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S2 · THE GRIND — 35f (3.10-4.27s).  CUT DOWN.  **SETUP · villain wins #1**
   VO: "First, beginner tips."

   ⛔ THE VILLAIN IS UNDEFEATED HERE. A Claude reaches for the descending ingot
   and the wheel CARRIES HIM PAST IT. He does not get it. The board's villain
   integrity check depends on this beat losing.
   ⭐ Deliberately the coldest and dimmest frame in the reel, so S3's furnace
   mouth is a hard cut in BOTH hue and lightness.
   ====================================================================== */
export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("grind");
  const DROP = 4, MISS = 20;
  const drop = E(f, DROP, DROP + 14, -300, 250, OUT);
  const reach = E(f, MISS - 8, MISS, 0, 1, OUT) - E(f, MISS, MISS + 10, 0, 1, IN_Q);
  const gy = p.horizon + 120;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.60}>
      <Cam z={5}>
        <SetFor k="grind" f={f} t={f * 0.5} rakeRate={4.2 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* THE VILLAIN, full panel and turning */}
        <Grind x={470} y={gy + 60} f={f} s={0.94} z={36} rate={2.1} n={5} lit={0.7} />

        {/* the chain and the hatch it comes through — the ingot has a SOURCE
            (§10: a hand-off needs somewhere it came from) */}
        <div style={{ position: "absolute", left: 810, top: -10, width: 150, height: 44, zIndex: 40,
          borderRadius: 5, background: dkh(IRON, 0.58) }} />
        <div style={{ position: "absolute", left: 876, top: 30, width: 14,
          height: Math.max(0, 240 + drop), zIndex: 41,
          background: `repeating-linear-gradient(180deg, ${dkh(IRON, 0.30)} 0px, ${dkh(IRON, 0.30)} 9px, ${dkh(IRON, 0.62)} 9px, ${dkh(IRON, 0.62)} 18px)` }} />
        <Ingot x={883} y={280 + drop} s={1.5} z={68} stamp={R.hours} hot={0.35} />
        <Pool x={883} y={300 + drop} w={420} c="#FFE9BE" o={0.30} z={20} />

        {/* the one who reaches — and misses. His arm ends ON the ingot's line,
            never in mid-air, and the wheel takes him past it. */}
        <Hero f={f} x={716 - reach * 62} y={gy + 46} size={218} z={70} drive={reach * 0.8}
          reach={72} costume={{ beard: 1 }} act={0} ph={2.1}
          stern={E(f, MISS + 2, MISS + 10, 0, 1, OUT)} />

        <Spine f={f} lit={RAIL.S2} at={MISS + 4} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S3 · THE BURN — 93f (4.27-7.37s).  CUT UP.  **TIP 1 · the waste**
   VO: "Don't waste money and usage limits on high tier models for simple tasks."

   ⭐ §3, RUN ON THE VERB: the sentence's nouns are WASTE, MONEY, USAGE LIMITS,
   HIGH TIER MODELS, SIMPLE TASKS — and every one is drawn. The waste is 18
   ingots crossing the panel into a mouth. The high-tier model is the largest
   furnace, badged. The simple task is ONE TINY BOLT on a huge shovel, and the
   proportion is the joke.

   ⛔ EDGE 1: no `$`, no `%`, no numeral on the gauge. Segments, countable.
   ⛔ THE 18 ARRIVALS ARE STAGGERED ACROSS ALL 93 FRAMES, one every 4, so the
      scene does not empty after its first third.
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("burn");
  const FEED = 14, ROAR = 20, SPIT = 74;
  const N = 18;
  /* one ingot leaves every 4 frames from ROAR — spread across the FULL scene */
  const gone = Math.max(0, Math.min(N, Math.floor((f - ROAR) / 4) + 1));
  const feed = E(f, FEED - 8, FEED, 0, 1, OUT) - E(f, FEED + 4, FEED + 14, 0, 1, IO);
  const spit = E(f, SPIT, SPIT + 8, 0, 1, BACK);
  const gy = p.horizon + 156;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.082]} vig={0.66}>
      <Cam z={5}>
        <SetFor k="burn" f={f} t={f * 0.7} rakeRate={6.8 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* THE HIGH-TIER MODEL: the largest furnace in the reel, badged. */}
        <Furnace x={250} y={gy + 20} f={f} w={352} h={412} c="#C0563E" name="OPUS 5"
          z={42} open={E(f, FEED - 6, FEED + 2, 0, 1, OUT)} roar={1.6} job="HIGH TIER" />

        {/* THE RACK OF HOURS — your money and your usage, in one object */}
        <IngotRack x={790} y={gy + 10} f={f} n={N} z={40} s={0.92} gone={gone} at={ROAR} />

        {/* ⭐⭐ THE TRAVEL: the highest-value shape in the motion table. Each
            ingot crosses the FULL panel width into the mouth, 118x44, well
            over the 40px floor, alternating bright against the dark hall. */}
        {Array.from({ length: N }, (_, i) => {
          const at = ROAR + i * 4;
          const t = E(f, at, at + 13, 0, 1, IN_Q);
          if (t <= 0 || t >= 1) return null;
          const x = 790 - t * 540, y = gy - 120 - Math.sin(t * Math.PI) * 130 + (i % 3) * 22;
          return <Ingot key={"fly" + i} x={x} y={y} s={1.05} z={56} rot={t * 70 - 20} hot={1} />;
        })}
        {/* the mouth flares as each one goes in — the furnace REACTS */}
        {Array.from({ length: N }, (_, i) => {
          const at = ROAR + i * 4 + 13;
          return <Ring key={"fr" + i} x={250} y={gy - 118} f={f} at={at} r={130} z={58}
            c={EMBER} w={6} />;
        })}

        {/* THE SIMPLE TASK: one tiny bolt, on a shovel four times its length */}
        <div style={{ position: "absolute", left: 452 - feed * 130, top: gy - 176, width: 250,
          height: 26, zIndex: 64, borderRadius: 5, transformOrigin: "100% 50%",
          transform: `rotate(${-6 + feed * 16}deg)`,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.22)} 0%, ${dkh(IRON, 0.46)} 100%)` }}>
          <div style={{ position: "absolute", left: -66, top: -26, width: 80, height: 78,
            borderRadius: "6px 30px 30px 6px", background: dkh(IRON, 0.36) }} />
          {/* the bolt: 34px against a 250px shovel */}
          <div style={{ position: "absolute", left: -50, top: -10, width: 34, height: 30,
            borderRadius: 6, background: STEEL, border: `3px solid ${dkh(STEEL, 0.34)}` }} />
        </div>

        {/* it comes back out unchanged — the whole point of the tip */}
        {f >= SPIT && (
          <div style={{ position: "absolute", left: 300 + spit * 240, top: gy - 150 - Math.sin(spit * Math.PI) * 120,
            width: 34, height: 30, zIndex: 66, borderRadius: 6, transform: `rotate(${spit * 300}deg)`,
            background: STEEL, border: `3px solid ${dkh(STEEL, 0.34)}` }} />
        )}
        <Puff x={250} y={gy - 118} f={f} at={SPIT} c="#E8C08A" n={9} s={1.1} z={62} />

        {/* ⛔ SEGMENTS, NO NUMERAL. It drains as the rack empties. */}
        <UsageGauge x={928} y={gy - 40} lit={Math.max(0, 10 - Math.floor(gone / 1.9))} n={10}
          s={0.92} z={80} label="USAGE" />

        {/* the crew who feeds it, and one watching the rack empty */}
        <Hero f={f} x={478} y={gy + 34} size={236} z={62} drive={feed} reach={86}
          costume={{ chef: 1 }} act={1} ph={0.9} flip />
        <Crew f={f} x={664} y={gy + 44} i={3} size={172} z={60} at={0} loop={3} />

        <Belt y={gy + 84} f={f} rate={3.4} z={24} h={24} />
        <Spine f={f} lit={RAIL.S3} at={0} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S4 · THE MODEL LINE — 33f (7.37-8.47s).  CUT WIDE.  **TIP 2a**
   VO: "Use Sonnet for daily use,"

   ⭐ A NUMBER MOVES TO ITS VALUE; IT IS NEVER TYPESET AT IT. The four furnaces
   are SIZED BY WHAT THEY ARE FOR, so the badge only carries the name and the
   information is in the geometry.
   EVENT — before: four cold mouths. trigger: the SONNET door lifts. travel:
   parts crossing on the belt. arrival: one finished part landing every 6f, and
   they keep coming for the rest of the section.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("line");
  const OPEN = 8;
  const open = E(f, OPEN, OPEN + 7, 0, 1, OUT);
  const gy = p.horizon + 150;
  const X = [106, 292, 546, 812];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.62}>
      <Cam z={5}>
        <SetFor k="line" f={f} t={f * 0.8} rakeRate={6.0 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {R.models.map((m, i) => (
          <Furnace key={m.key} x={X[i]} y={gy} f={f + i * 17} w={m.w} h={m.h} c={m.c}
            name={m.name} z={40 + i} job={m.job} roar={m.key === "haiku" ? 3 : 1}
            open={m.key === "sonnet" ? open : 0} />
        ))}
        {/* the belt in front — the background process for the whole section */}
        <Belt y={gy + 26} f={f} rate={5.0} z={52} h={30} />
        {/* finished parts arriving on it, one every 6 frames, and NOT stopping */}
        {Array.from({ length: 8 }, (_, i) => {
          const at = OPEN + 4 + i * 6;
          if (f < at) return null;
          const x = 340 + (f - at) * 5.0;
          if (x > 1040) return null;
          return (
            <div key={"pt" + i} style={{ position: "absolute", left: x, top: gy - 16, width: 54,
              height: 40, zIndex: 56, borderRadius: 5,
              transform: `rotate(${Math.sin((f - at) / 6) * 5}deg)`,
              background: `linear-gradient(172deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.24)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.34)}` }}>
              <div style={{ position: "absolute", left: 8, top: 10, right: 8, height: 5,
                borderRadius: 3, background: hexa(CLAY, 0.6) }} />
            </div>
          );
        })}
        <Hero f={f} x={468} y={gy + 30} size={214} z={62} costume={{ glasses: 1 }} act={0} ph={0.3} />
        <Crew f={f} x={782} y={gy + 36} i={6} size={166} z={60} at={0} loop={1} />
        <Spine f={f} lit={RAIL.S4} at={OPEN + 2} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S5 · FAST, NOT RIGHT — 34f (8.47-9.60s).  PUNCH IN.  **TIP 2b**
   VO: "Haiku if you like wrong answers,"

   ⛔⛔ EDGE 2 OF §0: NO SCORE PLATE, NO `%`, NO `WRONG` STAMP, NO COMPARISON
   BAR. The furnace is drawn FAST — three times the line rate, a mouth
   flickering on a 2.1-frame clock — and the parts it makes are MISSHAPEN and
   will not stack. The claim stays in the audio, exactly where reel 105 left
   Magnific's and 116 left Flow's.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("fast");
  const TOPPLE = 20;
  const top = E(f, TOPPLE, TOPPLE + 12, 0, 1, IN_Q);
  const gy = p.horizon + 150;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.118]} vig={0.62}>
      <Cam z={5}>
        <SetFor k="fast" f={f} t={f * 1.4} rakeRate={11.5 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        <Furnace x={300} y={gy} f={f} w={228} h={286} c="#5FB6D6" name="HAIKU 4.5" z={42}
          open={1} roar={3} job="FASTEST" />
        {/* the ejects — 14 of them in 34 frames, which IS the depiction of fast */}
        {Array.from({ length: 14 }, (_, i) => {
          const at = i * 2.2;
          const t = E(f, at, at + 11, 0, 1, LIN);
          if (t <= 0 || t >= 1) return null;
          const x = 400 + t * 300, y = gy - 140 - Math.sin(t * Math.PI) * 150 + i * 3;
          /* ⛔ MISSHAPEN, NOT LABELLED. Each one is bent a different way. */
          return (
            <div key={"ej" + i} style={{ position: "absolute", left: x, top: y, width: 62,
              height: 44, zIndex: 58, borderRadius: `${4 + (i % 4) * 9}px ${3 + (i % 3) * 12}px ${8}px ${2 + (i % 5) * 7}px`,
              transform: `rotate(${t * (240 + i * 40)}deg) skewX(${(rnd(i, 5) - 0.5) * 44}deg)`,
              background: `linear-gradient(172deg, ${dkh(CREAMB, 0.06)} 0%, ${dkh(CREAMB, 0.34)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.44)}` }} />
          );
        })}
        {/* the pile they land in — and it TOPPLES across the frame */}
        {Array.from({ length: 11 }, (_, i) => {
          const land = 12 + i * 2;
          if (f < land) return null;
          const t2 = top;
          return (
            <div key={"pl" + i} style={{ position: "absolute",
              left: 660 + (i % 3) * 22 + t2 * (90 + i * 34),
              top: gy - 46 - Math.floor(i / 3) * 34 + t2 * (i * 12),
              width: 66, height: 44, zIndex: 54, borderRadius: `${4 + (i % 4) * 9}px 6px 8px ${3 + (i % 3) * 8}px`,
              transform: `rotate(${(rnd(i, 3) - 0.5) * 40 + t2 * (200 + i * 30)}deg)`,
              background: `linear-gradient(172deg, ${dkh(CREAMB, 0.08)} 0%, ${dkh(CREAMB, 0.36)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.46)}` }} />
          );
        })}
        <Puff x={760} y={gy - 30} f={f} at={TOPPLE} c="#9FC4D2" n={11} s={1.2} z={62} />
        {/* he catches one, looks at it, and throws it over his shoulder */}
        <Hero f={f} x={854} y={gy + 34} size={224} z={66} costume={{ girl: 1 }} act={3} ph={1.6}
          shock={E(f, TOPPLE - 4, TOPPLE + 2, 0, 1, OUT) - E(f, TOPPLE + 8, TOPPLE + 20, 0, 1, OUT)} />
        <Belt y={gy + 26} f={f} rate={9.0} z={52} h={30} c="#39505C" />
        <Spine f={f} lit={RAIL.S5} at={0} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S6 · THE DEEP WORK — 78f (9.60-12.20s).  CUT.  **TIP 2c**
   VO: "and Opus slash Fable for more complex tasks."

   ⭐ "COMPLEX" IS NOT A COLOUR AND IT IS NOT A BIGGER BOX. It is a thing with
   NINE PARTS that has to be assembled in an order — so a nine-piece assembly
   is craned in, goes through, and UNFOLDS in four discrete pops.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("deep");
  const IN = 14, THRU = 28, OUT_ = 36;
  const carry = E(f, 0, IN, 0, 1, IO);
  const thru = E(f, THRU, THRU + 10, 0, 1, IN_Q);
  const open = E(f, OUT_, dur - 4, 0, 1, OUT);
  const gy = p.horizon + 150;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.064]} vig={0.66}>
      <Cam z={5}>
        <SetFor k="deep" f={f} t={f * 0.8} rakeRate={6.6 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* ⛔ 7.32 AT 42% HOLD — both doors opened once at f18 and then stood
            open for the remaining 60 frames. They now CYCLE on their own
            clocks, out of phase: 2 x (225 x 156) of large travelling contrast,
            for free, from geometry that was already on screen. §5's rule —
            ANIMATE WHAT IS ALREADY THERE BEFORE ADDING ANYTHING ELSE. */}
        <Furnace x={216} y={gy} f={f} w={296} h={340} c="#C0563E" name="OPUS 5" z={40}
          open={0.5 + Math.sin(f / 11) * 0.5} roar={0.7} />
        <Furnace x={800} y={gy} f={f + 30} w={292} h={326} c={VIOLET} name="FABLE 5" z={40}
          open={0.5 + Math.sin(f / 11 + 2.1) * 0.5} roar={0.7} />

        {/* the crane hook that carries it in — a hand-off with a SOURCE */}
        <div style={{ position: "absolute", left: 494, top: 118, width: 14,
          height: 130 + carry * 96, zIndex: 44, background: dkh(IRON, 0.54) }} />
        <div style={{ position: "absolute", left: 476, top: 244 + carry * 96, width: 50, height: 34,
          zIndex: 45, borderRadius: 6, background: dkh(IRON, 0.44) }} />

        {/* the nine-piece assembly: carried in, through, and OUT unfolded */}
        <Assembly x={506} y={286 + carry * 108 + thru * 108} f={f} at={OUT_} s={1.86}
          z={54} open={open} />

        {/* the four unfold rings, so each pop lands rather than smears */}
        {[0, 1, 2, 3].map((i) => (
          <Ring key={"ur" + i} x={506} y={410} f={f} at={OUT_ + i * 8} r={230 + i * 44} z={52}
            c={i % 2 ? "#E8CCFF" : "#FFD0BC"} w={8} />
        ))}
        {/* ⭐ THE BACKGROUND PROCESS THIS SCENE DID NOT HAVE. Nine raw parts ride
            in on the deck below, one every 6 frames, for the whole shot — so the
            frame is never waiting on the one hero object. */}
        {Array.from({ length: 11 }, (_, i) => {
          const at = i * 6;
          if (f < at) return null;
          const x = -70 + (f - at) * 8.4;
          if (x > 1080) return null;
          const c = [GOLD, TEAL, CLAY, VIOLET, STEEL][i % 5];
          return (
            <div key={"rp" + i} style={{ position: "absolute", left: x, top: gy - 62,
              width: 96, height: 68, zIndex: 44, borderRadius: 6,
              transform: `rotate(${Math.sin((f - at) / 7) * 7}deg)`,
              background: `linear-gradient(170deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.30)} 100%)`,
              border: `3px solid ${dkh(c, 0.52)}` }}>
              {/* ⛔ NOT TWO BORES SIDE BY SIDE — that is a pair of eyes, and in
                  this reel it reads as another Claude. Four corner holes. */}
              {[[10, 10], [78, 10], [10, 48], [78, 48]].map((q, k) => (
                <div key={"rb" + k} style={{ position: "absolute", left: q[0], top: q[1],
                  width: 11, height: 11, borderRadius: "50%",
                  background: hexa("#000000", 0.34) }} />
              ))}
              <div style={{ position: "absolute", left: 28, top: 28, width: 44, height: 6,
                borderRadius: 3, background: hexa("#000000", 0.26), transform: "rotate(-12deg)" }} />
            </div>
          );
        })}

        <Hero f={f} x={506} y={gy + 50} size={238} z={70} costume={{ prof: 1 }} act={1} ph={0.5}
          cheer={E(f, dur - 20, dur - 10, 0, 1, OUT)} />
        <Crew f={f} x={150} y={gy + 56} i={9} size={168} z={62} at={0} loop={0} />
        <Crew f={f} x={880} y={gy + 56} i={11} size={164} z={62} at={0} loop={2} />
        <Belt y={gy + 40} f={f} rate={3.0} z={30} h={26} c="#4A3A46" />
        <Spine f={f} lit={RAIL.S6} at={OUT_ + 6} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S7 · THE VAULT — 46f (12.20-13.73s).  CUT.  **TIP 3a · the good state**
   VO: "Also, don't use Projects for most work"

   ⭐ THE BEFORE STATE IS DELIBERATELY GOOD, because S8 has to be able to TAKE
   it away and a thing you take away has to have been there. The wall FEEDS
   him: three spools travel out on rails, he works them, they run back —
   continuous, both directions, across the full width.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("vault");
  const gy = p.horizon + 140;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.52}>
      <Cam z={5}>
        <SetFor k="vault" f={f} t={f * 0.6} rakeRate={5.4 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* ⭐ THE BIGGEST BRIGHT MASS SINCE THE HOOK — 45 turning spools */}
        <SpoolWall x={56} y={172} w={900} h={318} f={f} z={26} cols={9} rows={5} lit={1} />
        {/* the three feed rails, and the spools running BOTH ways on them */}
        {[0, 1, 2].map((i) => (
          <FeedRail key={"fr" + i} x0={140 + i * 40} y0={512 + i * 34} x1={620 + i * 60}
            y1={gy - 40} z={30} snapped={0} f={f} />
        ))}
        {Array.from({ length: 12 }, (_, i) => {
          /* the ramp: one rail feeding at f0, all three saturated by the end */
          const live = E(f, 2 + i * 3.4, 10 + i * 3.4, 0, 1, OUT);
          if (live <= 0) return null;
          return (
            <FeedSpool key={"fs" + i} x0={140 + (i % 3) * 40} y0={512 + (i % 3) * 34}
              x1={620 + (i % 3) * 60} y1={gy - 40} f={f} ph={i * 5} period={44} z={58}
              s={1.1 * live} />
          );
        })}
        {/* and what he DOES with them: finished work stacking on the bench, one
            every 7 frames, so the beat has an OUTPUT as well as an input (§10 —
            name the mechanism, then ask which half is missing) */}
        {Array.from({ length: 6 }, (_, i) => {
          const at = 6 + i * 7;
          const t = E(f, at, at + 8, 0, 1, BACK);
          if (t <= 0) return null;
          return (
            <div key={"wk" + i} style={{ position: "absolute", left: 806 + (i % 2) * 92,
              top: gy - 40 - Math.floor(i / 2) * 44, width: 84, height: 38, zIndex: 60,
              borderRadius: 5, transform: `scale(${t}) rotate(${(rnd(i, 5) - 0.5) * 12}deg)`,
              background: `linear-gradient(172deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.22)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.34)}` }}>
              <div style={{ position: "absolute", left: 9, top: 11, right: 9, height: 6,
                borderRadius: 3, background: hexa(GOLD, 0.7) }} />
            </div>
          );
        })}
        {/* he WORKS them — a job with an object, not an idle */}
        <Hero f={f} x={724} y={gy + 26} size={252} z={66} costume={{ prof: 1 }} act={1} ph={0.2}
          drive={Math.abs(Math.sin(f / 13)) * 0.42} reach={54} />
        <Forearm x0={700} y0={gy - 128} x1={624} y1={gy - 66} w={22} c="#C4674A" z={68} />
        <Crew f={f} x={928} y={gy + 32} i={1} size={168} z={62} at={0} loop={3} />

        <Spine f={f} lit={RAIL.S7} at={6} />
        <Contact x={646} y={gy + 24} w={166} z={30} o={0.3} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S8 · THE SHUTTER — 94f (13.73-16.87s).  SAME SET, THE TURN.  **TIP 3b**
   VO: "because the AI loses access to your main memory when in the Projects."

   ⭐⭐ THE BIGGEST SINGLE-OBJECT TRAVEL IN THE REEL: a full-height shutter,
   six frames, landing hard. An ACTION IS A DISTANCE (§11) and this one covers
   its whole height.
   ⛔ EDGE 4: the booth's cream chip carries Anthropic's own three words. There
   is no verdict on screen — the shutter does the arguing.
   ⛔ VILLAIN UNDEFEATED #2: the grind turns behind the booth window throughout.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⭐⭐ THIS SCENE CUTS INSIDE ITSELF, ON THE BEAT. A full-panel shutter is the
     right image for "loses access" — but once it lands it is a sheet of steel,
     and v3 would have held one for 48 frames while the receipt it was supposed
     to be arguing for sat hidden behind it. Reel 107 fixed a dead b-roll hold
     the same way: cut INSIDE the clip on the beat (3.23 -> 4.40, dead run 60f
     -> 3f). Shot A is the vault and the fall; shot B is where he ends up.
     Both are over the 0.7s floor: 56f (1.87s) and 38f (1.27s). */
  const CUT = 56;
  return f < CUT ? <S8a v={v} dur={dur} /> : <S8b v={v} dur={dur} cut={CUT} />;
};

/** S8 shot A — the vault, the doorway, and the shutter coming down full panel */
const S8a: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("vault");
  const WALK = 4, STEP = 24, SHUT = 40, SNAP = 46;
  const walk = E(f, WALK, STEP, 0, 1, IO);
  const step = E(f, STEP, STEP + 12, 0, 1, IO);
  /* ⭐⭐⭐ AN ACTION IS A DISTANCE (§11). v2's shutter was 396px tall inside a
     310px booth at frame right — 15% of the panel, and the scene measured 5.07
     then 5.83, the floor of the reel both times. It is now FULL PANEL:
     1012x792, travelling its entire height in six frames. Same authored event,
     same six frames, ~7x the swept area. */
  const shut = E(f, SHUT, SHUT + 6, 0, 1, IN_Q);
  const snap = E(f, SNAP, SNAP + 8, 0, 1, OUT);
  const vlit = 1 - E(f, SHUT + 1, SHUT + 7, 0, 1, OUT);
  const kick = f >= SHUT + 6 ? Math.sin((f - SHUT - 6) / 2.8) * 9 * Math.exp(-(f - SHUT - 6) / 13) : 0;
  const gy = p.horizon + 140;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.070]} vig={0.58}>
      <Cam z={5} y={kick}>
        <SetFor k="vault" f={f} t={f * 0.6} rakeRate={5.0 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} lit={0.34 + vlit * 0.66} />
        <SpoolWall x={40} y={172} w={880} h={318} f={f} z={26} cols={9} rows={5} lit={vlit} />
        {/* the overhead reclaim line — the background process, running the whole
            shot. It is what makes the vault a WORKING place rather than a wall. */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = ((i * 156 + f * 5.4) % 1180) - 120;
          return (
            <div key={"rc" + i} style={{ position: "absolute", left: x, top: 140, width: 96,
              height: 62, zIndex: 24, borderRadius: 6,
              background: `linear-gradient(172deg, ${hexa(CREAMB, 0.30 + vlit * 0.60)} 0%, ${hexa(GOLD, 0.24 + vlit * 0.50)} 100%)`,
              border: `3px solid ${hexa(dkh(BRASS, 0.40), 0.8)}` }}>
              <div style={{ position: "absolute", left: 14, top: 12, width: 68, height: 38,
                borderRadius: "50%", opacity: 0.35 + vlit * 0.55,
                background: `conic-gradient(from ${f * 4 + i * 40}deg, ${CREAMB} 0deg, ${GOLD} 180deg, ${CREAMB} 360deg)` }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: -40, right: -40, top: 202, height: 16,
          zIndex: 23, background: `linear-gradient(180deg, ${mxh(BRASS, 0.16)} 0%, ${dkh(BRASS, 0.48)} 100%)` }} />

        {[0, 1, 2].map((i) => (
          <FeedRail key={"fr" + i} x0={110 + i * 34} y0={504 + i * 30} x1={548 + i * 40}
            y1={gy - 50} z={30} snapped={snap} f={f} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <FeedSpool key={"fs" + i} x0={110 + (i % 3) * 34} y0={504 + (i % 3) * 30}
            x1={548 + (i % 3) * 40} y1={gy - 50} f={f} ph={i * 5} period={42} z={58} s={1.2}
            cut={SNAP} />
        ))}
        {/* the work he is producing WITH them, right up to the moment it stops.
            Six pieces land across the 40 frames before the shutter, and the
            last one is still in the air when the rails go. */}
        {Array.from({ length: 6 }, (_, i) => {
          const at = 2 + i * 6;
          const t = E(f, at, at + 8, 0, 1, BACK);
          if (t <= 0) return null;
          return (
            <div key={"wk" + i} style={{ position: "absolute", left: 306 + (i % 3) * 92,
              top: gy - 46 - Math.floor(i / 3) * 46, width: 84, height: 38, zIndex: 60,
              borderRadius: 5, transform: `scale(${t}) rotate(${(rnd(i, 5) - 0.5) * 12}deg)`,
              opacity: 1 - snap * 0.7,
              background: `linear-gradient(172deg, ${CREAMB} 0%, ${dkh(CREAMB, 0.22)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.34)}` }}>
              <div style={{ position: "absolute", left: 9, top: 11, right: 9, height: 6,
                borderRadius: 3, background: hexa(GOLD, 0.7) }} />
            </div>
          );
        })}

        {/* the PROJECT doorway he walks into — a place, not a caption */}
        <div style={{ position: "absolute", left: 640, top: 214, width: 318, height: gy - 174,
          zIndex: 40, borderRadius: "10px 10px 4px 4px",
          background: `linear-gradient(178deg, ${hexa("#1A2426", 0.62)} 0%, ${hexa("#0E1618", 0.94)} 100%)`,
          border: `9px solid ${dkh("#243036", 0.56)}` }}>
          <div style={{ position: "absolute", left: "50%", top: 26, width: 84, height: 22,
            marginLeft: -42, borderRadius: 7, background: hexa(TEAL, 0.72) }} />
        </div>
        <div style={{ position: "absolute", left: 654, top: 172, zIndex: 42,
          padding: "7px 22px", borderRadius: 8, background: "#FFFFFF", whiteSpace: "nowrap",
          border: "3px solid #E4DCC8", boxShadow: SH }}>
          <span style={{ ...ui(24, 900), color: "#241F17", letterSpacing: "0.06em" }}>PROJECT</span>
        </div>

        <Hero f={f} x={300 + walk * 300 + step * 200} y={gy + 20} size={248} z={70}
          costume={{ prof: 1 }} act={0} ph={0.2} drive={step * 0.5} reach={40}
          shock={E(f, SHUT + 6, SHUT + 10, 0, 1, OUT) - E(f, SHUT + 14, SHUT + 30, 0, 1, OUT)} />

        {/* ⭐⭐ THE SHUTTER, FULL PANEL. Horizontal slats, a pressed rib and two
             fixings per slat, a bottom rail and a latch, running in two guide
             channels — the features a viewer actually uses to name the category
             (§11: CATEGORY IS STRUCTURE, NOT HUE). */}
        <div style={{ position: "absolute", left: -20, right: -20, top: -20, bottom: -20,
          zIndex: 76, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 852,
            top: -852 + shut * 852,
            background: `linear-gradient(180deg, ${dkh(STEEL, 0.34)} 0%, ${dkh(STEEL, 0.50)} 100%)` }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={"sl" + i} style={{ position: "absolute", left: 0, right: 0,
                top: i * 42.6, height: 38,
                background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)} 0%, ${dkh(STEEL, 0.30)} 58%, ${dkh(STEEL, 0.54)} 100%)`,
                borderBottom: `4px solid ${dkh(STEEL, 0.62)}` }}>
                <div style={{ position: "absolute", left: 0, right: 0, top: 15, height: 6,
                  background: hexa("#000000", 0.16) }} />
                <div style={{ position: "absolute", left: 78, top: 12, width: 11, height: 11,
                  borderRadius: "50%", background: hexa("#000000", 0.22) }} />
                <div style={{ position: "absolute", right: 78, top: 12, width: 11, height: 11,
                  borderRadius: "50%", background: hexa("#000000", 0.22) }} />
              </div>
            ))}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 34,
              background: dkh(IRON, 0.56) }} />
            <div style={{ position: "absolute", left: "50%", bottom: 6, width: 128, height: 22,
              marginLeft: -64, borderRadius: 5, background: dkh(IRON, 0.72) }} />
          </div>
        </div>
        {[-14, 986].map((lx, i) => (
          <div key={"gc" + i} style={{ position: "absolute", left: lx, top: -20, width: 30,
            height: 852, zIndex: 78, background: dkh(IRON, 0.62),
            border: `3px solid ${dkh(IRON, 0.76)}` }} />
        ))}

        {[0, 1, 2].map((i) => (
          <React.Fragment key={"sn" + i}>
            <Ring x={310 + i * 96} y={548 + i * 26} f={f} at={SNAP + i * 3} r={190} z={80}
              c="#E8D4A8" w={7} />
            <Puff x={310 + i * 96} y={548 + i * 26} f={f} at={SNAP + i * 3} c="#8A9A9E" n={9}
              s={1.1} z={80} />
          </React.Fragment>
        ))}
        <Puff x={506} y={740} f={f} at={SHUT + 6} c="#7E8E92" n={22} s={2.0} z={82} spread={2.0} />
        <Ring x={506} y={734} f={f} at={SHUT + 6} r={520} z={81} c="#B8C6CA" w={12} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/** S8 shot B — the far side of it. One bulb, one spool, and the receipt. */
const S8b: React.FC<SP & { cut: number }> = ({ v, dur, cut }) => {
  const f = useCurrentFrame() - cut;
  const p = placeFor("booth");
  const BANG = [6, 20, 32];
  const gy = p.horizon + 140;
  const hit = BANG.some((a) => f >= a && f < a + 4);
  return (
    <Scene p={p} slug="" push={[0, dur - cut, 1.104]} vig={0.66}>
      <Cam z={5} y={hit ? Math.sin(f * 2.2) * 7 : 0}>
        <SetFor k="booth" f={f} t={f * 0.6} rakeRate={4.0 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} lit={0.9} />
        {/* the closed shutter, now the BACK wall of the room he is in */}
        <div style={{ position: "absolute", left: 26, top: 96, right: 26, height: 470, zIndex: 20,
          overflow: "hidden", borderRadius: 6,
          background: `linear-gradient(180deg, ${dkh(STEEL, 0.50)} 0%, ${dkh(STEEL, 0.64)} 100%)` }}>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={"bs" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 43,
              height: 38, background: `linear-gradient(180deg, ${dkh(STEEL, 0.30)} 0%, ${dkh(STEEL, 0.52)} 62%, ${dkh(STEEL, 0.66)} 100%)`,
              borderBottom: `4px solid ${dkh(STEEL, 0.72)}`,
              transform: `translateX(${hit && i > 3 ? Math.sin(f * 3 + i) * 5 : 0}px)` }} />
          ))}
        </div>
        {/* the one bulb, and the only pool of light in the room */}
        <div style={{ position: "absolute", left: 452, top: 78, width: 108, height: 30, zIndex: 34,
          borderRadius: "0 0 54px 54px", background: dkh(IRON, 0.56) }} />
        <div style={{ position: "absolute", left: 476, top: 100, width: 60, height: 18, zIndex: 35,
          borderRadius: 9, background: hexa(TEAL, 0.86) }} />
        <Pool x={506} y={gy + 40} w={620} c={TEAL} o={0.34} z={18} />

        {/* ⛔ EDGE 4 — Anthropic's own three words, on a cream chip, LIT. A
            QUOTE, not a verdict: no red cross, no "PROJECTS ARE BAD" anywhere. */}
        <div style={{ position: "absolute", left: "50%", top: 176, transform: "translateX(-50%)",
          padding: "13px 22px", borderRadius: 10, background: CREAMB, whiteSpace: "nowrap",
          zIndex: 86, border: `4px solid ${dkh(CREAMB, 0.22)}`, boxShadow: SH }}>
          <span style={{ ...mono(28, 900), color: "#241F17", letterSpacing: "0.05em" }}>
            {R.projectPlate}</span>
        </div>

        {/* ⛔ VILLAIN UNDEFEATED #2 — the grind, turning through the one window */}
        <div style={{ position: "absolute", left: 62, top: 300, width: 250, height: 200, zIndex: 44,
          overflow: "hidden", borderRadius: 6, background: hexa("#080C10", 0.94),
          border: `6px solid ${dkh("#243036", 0.54)}` }}>
          <Grind x={125} y={300} f={f} s={0.54} z={2} rate={2.1} n={3} lit={0.44} />
        </div>

        {/* the local spool box — it holds exactly ONE, and that is the beat */}
        <div style={{ position: "absolute", left: 706, top: 336, width: 214, height: 176, zIndex: 46,
          borderRadius: 9, background: hexa("#0A1214", 0.86), border: `6px solid ${hexa(TEAL, 0.40)}` }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"eb" + i} style={{ position: "absolute", left: 18 + (i % 3) * 62,
              top: 20 + Math.floor(i / 3) * 74, width: 52, height: 52, borderRadius: "50%",
              background: hexa("#000000", 0.44), border: `3px solid ${hexa(TEAL, 0.16)}` }} />
          ))}
          <div style={{ position: "absolute", left: 18, top: 20, width: 52, height: 52,
            borderRadius: "50%", transform: `rotate(${f * 3}deg)`,
            background: `conic-gradient(${CREAMB} 0deg, ${GOLD} 180deg, ${CREAMB} 360deg)` }} />
        </div>

        {/* he hammers on it, three times, and each blow rings the room */}
        <Hero f={f} x={506} y={gy + 46} size={262} z={70} costume={{ prof: 1 }} act={1} ph={0.6}
          drive={hit ? 0.85 : 0.1} reach={78} stern={E(f, 8, 18, 0, 1, OUT)} />
        {BANG.map((at, i) => (
          <React.Fragment key={"bg" + i}>
            <Ring x={506} y={356} f={f} at={at} r={360} z={84} c="#CBD8DC" w={9} />
            <Puff x={506} y={400} f={f} at={at} c="#8A9A9E" n={13} s={1.4} z={84} />
          </React.Fragment>
        ))}
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S9 · THE STREET — 92f (16.87-19.93s).  CUT OUT AND UP.  **INTERMEDIATE**
   VO: "For intermediate tips, use the Claude Chrome extension and treat it
        like a junior hire."

   ⭐ THE JUNIOR STARTS MOVING IMMEDIATELY. Reel 110: an arrival that just
   appears reads as a state change. He is LOWERED onto the rail and is riding
   it before the line finishes.
   ⛔ THE MARK: `googlechrome.svg` on a white tile on the rig, and the Claude
   mark on the clipboard. A wrong mark is worse than no mark, so both files are
   named and both exist in public/logos.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("street");
  const DROP = 8, RIDE = 26;
  const drop = E(f, DROP, DROP + 14, 0, 1, OUT);
  const ride = E(f, RIDE, dur, 0, 1, LIN);
  const gy = p.horizon + 130;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.080]} vig={0.64}>
      <Cam z={5}>
        <SetFor k="street" f={f} t={f * 1.1} rakeRate={7.2 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* ⭐ THE TRAFFIC BAND — page tiles crossing the block for all 92
            frames. This is the change that took VERBS 5.31 -> 8.16 and it is
            the same street, so it is the same furniture. */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = ((i * 138 + f * 5.8) % 1240) - 150;
          return (
            <div key={"tb" + i} style={{ position: "absolute", left: x, top: 148, width: 110,
              height: 140, zIndex: 20, borderRadius: 5,
              background: i % 2 ? hexa(PAPER, 0.76) : hexa("#2E3C48", 0.88),
              border: `3px solid ${hexa("#22303A", 0.8)}` }}>
              <div style={{ position: "absolute", left: 8, right: 8, top: 8, height: 15,
                borderRadius: 3, background: hexa(i % 2 ? "#B9B2A2" : "#4E5C68", 0.9) }} />
              {[0, 1, 2].map((k) => (
                <div key={"tr" + k} style={{ position: "absolute", left: 10, top: 32 + k * 21,
                  width: (0.4 + rnd(i * 3 + k, 5) * 0.5) * 90, height: 9, borderRadius: 3,
                  background: hexa(i % 2 ? CLAY : "#6E7A88", 0.8) }} />
              ))}
            </div>
          );
        })}
        {/* three PAGE windows as lit shopfronts, receding */}
        {[0, 1, 2].map((i) => (
          <PageWindow key={"pw" + i} x={40 + i * 322} y={gy - 40} w={286} h={300} f={f + i * 20}
            z={32 + i} lit={1} rows={9} i={i} />
        ))}
        {/* the tab rail, full width — the travelling band of this scene */}
        <div style={{ position: "absolute", left: -40, right: -40, top: gy - 6, height: 34,
          zIndex: 48, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.42)} 100%)` }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={"tk" + i} style={{ position: "absolute", top: 8,
              left: ((i * 62 + f * 3.2) % 1180) - 40, width: 26, height: 18, borderRadius: 3,
              background: i % 2 ? hexa("#000000", 0.28) : hexa(INGH, 0.20) }} />
          ))}
        </div>
        {/* the harness rig it comes down on, carrying the real Chrome mark */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 74, height: 26, zIndex: 50,
          background: dkh(IRON, 0.52) }} />
        <div style={{ position: "absolute", left: 336, top: 100, width: 10,
          height: 60 + drop * 232, zIndex: 51, background: dkh(IRON, 0.44) }} />
        <Tile x={412} y={128} s={72} src="googlechrome.svg" z={86} />

        {/* THE JUNIOR — lowered, then riding, window to window, immediately */}
        <Hero f={f} x={341 + ride * 470} y={gy - 34 + (1 - drop) * -300} size={206} z={70}
          costume={{ suit: 1 }} act={0} ph={1.1} pop={0.4 + drop * 0.6} />

        {/* NIB hands him the clipboard — the Claude mark, on the JOB not the face */}
        <Hero f={f} x={150} y={gy + 46} size={244} z={68} costume={{ prof: 1 }} act={3} ph={0.4}
          drive={E(f, DROP + 12, DROP + 22, 0, 1, OUT) * 0.6} reach={60} />
        <MarkPlate x={72} y={176} t="CLAUDE IN CHROME" s={0.86} z={88} />

        <Spine f={f} lit={RAIL.S9} at={RIDE} />
        <Contact x={96} y={gy + 42} w={158} z={30} o={0.32} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S10 · THE FOUR VERBS — 122f (19.93-24.00s).  **DENSITY PEAK #1**
   VO: "It can navigate pages, read content, click elements, and even fill out
        forms on its own."

   ⭐⭐⭐ RUN THE §3 TEST PER SCENE, ON THE VERB. Measured onsets from
   words_117know.json, converted to scene-local: navigate f6 · read f32 ·
   click f50 · fill f71. Every beat lands on its own word.

   ⛔ §10: A SCAN THAT SURFACES NOTHING IS A PROGRESS BAR. `read` does not just
   sweep a lamp — the lines it passes light up and LIFT OFF as found facts.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("hall");
  const NAV = 6, READ = 32, CLICK = 50, FILL = 71;
  const nav = E(f, NAV, READ - 4, 0, 1, IO);
  const read = E(f, READ, CLICK - 4, 0, 1, LIN);
  const click = E(f, CLICK, CLICK + 6, 0, 1, OUT) - E(f, CLICK + 10, CLICK + 26, 0, 1, OUT);
  const drawer = E(f, CLICK + 4, CLICK + 14, 0, 1, BACK);
  const fill = E(f, FILL, dur - 14, 0, 1, LIN);
  const sub = E(f, dur - 12, dur - 4, 0, 1, OUT);
  const gy = p.horizon + 132;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.090]} vig={0.66}>
      <Cam z={5}>
        <SetFor k="hall" f={f} t={f * 1.5} rakeRate={7.6 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* the three pages he works across. The middle one is the one he READS
            and CLICKS, so the beats have a single subject to happen to. */}
        {/* ⭐ THE TRAFFIC BAND — pages crossing the hall behind him for all 122
            frames. Large, bright, travelling: the only shape §1's measured table
            says actually registers, and it is also what a browser IS. */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = ((i * 132 + f * 6.2) % 1220) - 150;
          return (
            <div key={"tb" + i} style={{ position: "absolute", left: x, top: 128, width: 116,
              height: 148, zIndex: 20, borderRadius: 5,
              background: i % 2 ? hexa(PAPER, 0.82) : hexa("#3A4250", 0.86),
              border: `3px solid ${hexa("#2A3040", 0.7)}` }}>
              <div style={{ position: "absolute", left: 8, right: 8, top: 8, height: 16,
                borderRadius: 3, background: hexa(i % 2 ? "#B9B2A2" : "#5A6270", 0.9) }} />
              {[0, 1, 2].map((k) => (
                <div key={"tr" + k} style={{ position: "absolute", left: 10,
                  top: 34 + k * 22, width: (0.4 + rnd(i * 3 + k, 5) * 0.5) * 96, height: 9,
                  borderRadius: 3, background: hexa(i % 2 ? CLAY : "#7E8798", 0.8) }} />
              ))}
            </div>
          );
        })}
        <PageWindow x={20} y={gy - 26} w={252} h={290} f={f} z={30} lit={0.9} rows={9} i={0} />
        <PageWindow x={296} y={gy - 26} w={272} h={300} f={f} z={32} lit={1} rows={10} i={1}
          read={read} click={click} />
        <PageWindow x={592} y={gy - 26} w={252} h={290} f={f} z={30} lit={0.9} rows={9} i={2} />

        {/* NAVIGATE — he rides the rail hard across the three, and the street
            behind SCROLLS, which is the full-width band this scene lives on */}
        <div style={{ position: "absolute", left: -40, right: -40, top: gy + 6, height: 30,
          zIndex: 46, borderRadius: 6,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.18)} 0%, ${dkh(BRASS, 0.44)} 100%)` }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"tk" + i} style={{ position: "absolute", top: 7,
              left: ((i * 58 + f * 5.4) % 1200) - 40, width: 24, height: 16, borderRadius: 3,
              background: i % 2 ? hexa("#000000", 0.30) : hexa(INGH, 0.22) }} />
          ))}
        </div>

        {/* READ — the lamp he carries is the only MOVING light in the hall */}
        {f >= READ && f < CLICK + 6 && (<>
          <div style={{ position: "absolute", left: 306, top: gy - 320 + read * 274, width: 252,
            height: 34, zIndex: 60, borderRadius: 17, background: hexa(INGH, 0.94) }} />
          <div style={{ position: "absolute", left: 296, top: gy - 316, width: 272,
            height: read * 268, zIndex: 44,
            background: `linear-gradient(180deg, ${hexa(INGH, 0.02)} 0%, ${hexa(INGH, 0.20)} 100%)` }} />
        </>)}
        {/* ⭐ THE FINDINGS — the half of the mechanism that makes a scan mean
            something. Five facts lift off the page he has read. */}
        <Facts x={432} y={gy - 300} f={f} at={READ + 10} n={6} z={68} s={1.6} />

        {/* CLICK — the page RESPONDS: a drawer opens and a result drops out */}
        {drawer > 0 && (
          <div style={{ position: "absolute", left: 470, top: gy - 96 + drawer * 74, width: 150,
            height: 56, zIndex: 66, borderRadius: 6, transform: `rotate(${drawer * 8}deg)`,
            background: `linear-gradient(172deg, ${GOLD} 0%, ${dkh(GOLD, 0.28)} 100%)`,
            border: `3px solid ${dkh(GOLD, 0.40)}` }}>
            <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 7,
              borderRadius: 3, background: hexa("#3A2C10", 0.5) }} />
            <div style={{ position: "absolute", left: 10, top: 28, width: "52%", height: 7,
              borderRadius: 3, background: hexa("#3A2C10", 0.34) }} />
          </div>
        )}
        <Ring x={545} y={gy - 84} f={f} at={CLICK} r={150} z={64} c={GOLD} w={6} />

        {/* FILL — seven fields, each landing a real value, and then SUBMITTED */}
        {f >= FILL - 10 && (
          <FormBoard x={790} y={gy - 6 + (1 - E(f, FILL - 10, FILL, 0, 1, BACK)) * 420}
            w={330} h={392} f={f} at={dur - 12} z={56} n={7} done={fill} submitted={sub} />
        )}
        {Array.from({ length: 7 }, (_, i) => (
          <Ring key={"st" + i} x={790} y={gy - 300 + i * 48} f={f} at={FILL + i * 5} r={70}
            z={62} c={CLAY} w={4} />
        ))}

        {/* the junior, doing all four — his position tracks the beat he is on */}
        <Hero f={f} x={150 + nav * 380 + (fill > 0 ? 190 : 0)} y={gy + 44} size={230} z={72}
          costume={{ suit: 1 }} act={1} ph={1.1}
          drive={Math.max(click * 0.9, fill > 0 ? Math.abs(Math.sin(f / 5)) * 0.5 : 0)}
          reach={70} />
        <Crew f={f} x={946} y={gy + 46} i={4} size={158} z={60} at={0} loop={3} />

        <Spine f={f} lit={RAIL.S10} at={0} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S11 · THE CODE LOFT — 119f (24.00-27.97s).  CUT UP.  **EXPERT**
   VO: "For expert tips, use the desktop app's Code tab to build functional
        software using plain English prompts"

   ⭐ NINE DISCRETE POPS, NEVER ONE TWEEN, and spread across the FULL duration
   with the last landing at the very end — reel 104 measured 5.94 on a scene
   that front-loaded everything and 7.28 on the same scene staggered.
   ⛔ ONE TEXT CHIP: the plain-English ticket. It is the only typeset thing in
      this shot besides the band and the rail label.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("loft");
  const DROP = 14, BUILD = 26;
  const drop = E(f, DROP, DROP + 12, 0, 1, IN_Q);
  const gy = p.horizon + 132;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.078]} vig={0.64}>
      <Cam z={5}>
        <SetFor k="loft" f={f} t={f * 0.7} rakeRate={6.4 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* ⭐ THE TICKET BELT — plain-English jobs arriving continuously. §5:
            every shot needs a background process, and it is the difference
            between a shot and a still. */}
        <Belt y={gy + 62} f={f} rate={5.6} z={26} h={30} c="#2E3450" />
        {Array.from({ length: 7 }, (_, i) => {
          const x = ((i * 168 + f * 5.6) % 1260) - 150;
          return (
            <div key={"tk" + i} style={{ position: "absolute", left: x, top: gy + 8, width: 132,
              height: 58, zIndex: 30, borderRadius: 6, background: CREAMB,
              border: `3px solid ${dkh(CREAMB, 0.26)}`,
              transform: `rotate(${Math.sin(f / 9 + i) * 3}deg)` }}>
              <div style={{ position: "absolute", left: 12, top: 13, right: 12, height: 8,
                borderRadius: 3, background: hexa("#3A332A", 0.5) }} />
              <div style={{ position: "absolute", left: 12, top: 30, width: "56%", height: 8,
                borderRadius: 3, background: hexa("#3A332A", 0.3) }} />
            </div>
          );
        })}
        <CodeRig x={246} y={gy - 18} w={432} h={318} f={f} z={34} hot={drop} />
        {/* the bench lamp over the rig — the practical that lights this loft */}
        <div style={{ position: "absolute", left: 196, top: 118, width: 108, height: 26,
          zIndex: 36, borderRadius: "0 0 54px 54px", background: dkh(IRON, 0.54) }} />
        <div style={{ position: "absolute", left: 220, top: 138, width: 60, height: 16,
          zIndex: 37, borderRadius: 8, background: hexa("#FFE8C0", 0.92) }} />
        <div style={{ position: "absolute", left: 116, top: 150, width: 268, height: 400,
          zIndex: 12, clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa("#FFE0B0", 0.20)} 0%, ${hexa("#FFE0B0", 0.02)} 100%)` }} />

        {/* THE PLAIN-ENGLISH TICKET — one cream card, one handwritten line */}
        <div style={{ position: "absolute", left: 178, top: 128 + drop * 214, width: 250,
          height: 70, zIndex: 66, borderRadius: 8, opacity: 1 - E(f, DROP + 10, DROP + 14, 0, 1, LIN),
          transform: `rotate(${-8 + drop * 12}deg)`,
          background: CREAMB, border: `4px solid ${dkh(CREAMB, 0.30)}`, boxShadow: SH }}>
          <div style={{ ...mono(17, 800), color: "#3A332A", padding: "13px 14px",
            lineHeight: 1.35 }}>“build me a dashboard<br />that shows my sales”</div>
        </div>

        {/* ⭐ THE APP, ASSEMBLING — nine parts, one every 9 frames, last at f98 */}
        <AppBuild x={690} y={gy + 12} w={534} h={430} f={f} at={BUILD} z={56} />
        {[0, 3, 6, 8].map((i) => (
          <Ring key={"ar" + i} x={690} y={gy - 200} f={f} at={BUILD + i * 9} r={190 + i * 22}
            z={52} c={i === 8 ? GREEN : "#FFE0B0"} w={5} />
        ))}
        <Puff x={690} y={gy + 12} f={f} at={BUILD + 72} c="#B8C4E0" n={12} s={1.3} z={54} />

        <Hero f={f} x={392} y={gy + 52} size={252} z={70} costume={{ glasses: 1 }} act={1} ph={0.6}
          drive={E(f, DROP - 6, DROP, 0, 1, OUT) - E(f, DROP + 2, DROP + 12, 0, 1, OUT)}
          reach={62} cheer={E(f, BUILD + 74, BUILD + 84, 0, 1, OUT)} />
        <Crew f={f} x={112} y={gy + 48} i={8} size={172} z={62} at={0} loop={1} />

        <Spine f={f} lit={RAIL.S11} at={BUILD + 74} />
        <Contact x={266} y={gy + 48} w={168} z={30} o={0.32} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S12 · THE AUTOMATION LINE — 78f (27.97-30.57s).  **THE PEAK**
   VO: "and build automations to 10x your Claude usage."

   ⛔⛔ EDGE 3 OF §0: NO `10x` PLATE, NO MULTIPLIER GAUGE. This draws OUTPUT
   VOLUME — six lines starting at once, a rack filling and OVERFLOWING with
   countable 62px units. The figure stays in the audio and the caption, exactly
   where reel 116 left `20x`.

   ⭐⭐⭐ THE VILLAIN DIES HERE, EXACTLY ONCE. The overflow floods the shaft and
   the grind seizes: it judders, slows, stops, and its Claudes step off. This
   is the only beat in the reel where `stop` is non-zero, and it is the only
   scene that out-intensities the hook.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("looms");
  const LEVER = 8, FLOOD = 44, SEIZE = 52;
  const lever = E(f, LEVER, LEVER + 4, 0, 1, IN_Q);
  const flood = E(f, FLOOD, FLOOD + 16, 0, 1, IO);
  const stop = E(f, SEIZE, SEIZE + 18, 0, 1, OUT);
  const gy = p.horizon + 128;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.100]} vig={0.6}>
      <Cam z={5}>
        <SetFor k="looms" f={f} t={f * 1.0} rakeRate={8.2 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* SIX LINES, STARTING TOGETHER on a 3-frame stagger */}
        {Array.from({ length: 6 }, (_, i) => (
          <Loom key={"lm" + i} x={70 + i * 152} y={gy - 26} f={f} at={LEVER + i * 3} s={0.86}
            z={38 + i} run={lever} />
        ))}

        {/* the rack, filling — countable units, 62px, over the downsample floor */}
        <div style={{ position: "absolute", left: 48, top: gy + 6, width: 726, height: 108,
          zIndex: 50, borderRadius: 6, background: hexa(dkh(BRASS, 0.52), 0.7),
          border: `5px solid ${dkh(BRASS, 0.62)}` }} />
        {Array.from({ length: 26 }, (_, i) => {
          const at = LEVER + 8 + i * 1.6;
          if (f < at) return null;
          const t = E(f, at, at + 9, 0, 1, IN_Q);
          const col = i % 8, row = Math.floor(i / 8);
          const overflow = i >= 24;
          const tx = overflow ? 700 + (i - 24) * 86 : 96 + col * 86;
          const ty = overflow ? gy + 132 : gy + 70 - row * 54;
          return <Unit key={"un" + i} x={tx} y={ty - (1 - t) * 260} s={1.0} z={54}
            rot={(rnd(i, 5) - 0.5) * 22 * t} />;
        })}
        {/* ⭐ THE OVERFLOW ITSELF — units spilling down the shaft, continuously */}
        {f >= FLOOD && Array.from({ length: 10 }, (_, i) => {
          const t = (((f - FLOOD) * 0.045 + i / 10) % 1);
          return <Unit key={"ov" + i} x={846 + Math.sin(t * 5 + i) * 30} y={gy + 40 + t * 300}
            s={1.0} z={62} rot={t * 260} c="#EDE6D4" />;
        })}
        <Puff x={846} y={gy + 300} f={f} at={SEIZE} c="#C8B48A" n={14} s={1.4} z={64} spread={1.3} />

        {/* ⛔⛔ THE VILLAIN, SEIZING. The only `stop` in the whole reel. */}
        <div style={{ position: "absolute", right: 36, top: gy + 100, width: 224, height: 290,
          zIndex: 60, overflow: "hidden", borderRadius: "6px 6px 0 0" }}>
          <Grind x={112} y={286} f={f} s={0.52} z={2} rate={2.1} n={3} stop={stop}
            lit={0.34 + stop * 0.66} />
        </div>
        {/* the sub-floor lighting as it dies — the payoff, in LIGHT */}
        <Pool x={846} y={gy + 300} w={520} c={GOLD} o={0.10 + stop * 0.34} z={58} />

        {/* NIB pulls the one lever that starts all six */}
        <div style={{ position: "absolute", left: 918, top: gy - 176, width: 18, height: 112,
          zIndex: 66, borderRadius: 9, transformOrigin: "50% 100%",
          transform: `rotate(${-20 + lever * 48}deg)`,
          background: `linear-gradient(180deg, ${mxh(IRON, 0.24)} 0%, ${dkh(IRON, 0.50)} 100%)` }}>
          <div style={{ position: "absolute", left: -8, top: -13, width: 34, height: 26,
            borderRadius: 7, background: CLAYD }} />
        </div>
        <Hero f={f} x={876} y={gy + 46} size={236} z={68} costume={{ constr: 1 }} act={2} ph={0.8}
          drive={lever * 0.8} reach={56} cheer={E(f, SEIZE + 12, SEIZE + 22, 0, 1, OUT)} />
        <Crew f={f} x={106} y={gy + 50} i={10} size={170} z={62} at={0} loop={1} />

        <Spine f={f} lit={RAIL.S12} at={0} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S13 · THE SOCKETS — 52f (30.57-32.30s).  CUT.
   VO: "And you can install plugins and MCPs for Claude"

   EVENT — before: a wall of empty bores. trigger/travel: four cartridges fly
   in from off-frame. arrival: each SLAMS home with a squash, a ring and a
   recoil, and sends a 74px charge down a 40px cable.
   ⛔ The cables are 40px because reel 115 lost two scenes to 9px cords: 9px is
      2.1px after the audit's 1012->240 downsample.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("socket");
  const A = [4, 13, 22, 31];
  const filled = A.filter((a) => f >= a + 7).length;
  const gy = p.horizon + 130;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.072]} vig={0.62}>
      <Cam z={5}>
        <SetFor k="socket" f={f} t={f * 1.2} rakeRate={7.8 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* ⭐ THE FEED — plugin cases riding the overhead tray for the whole
            shot. Large, bright, travelling: the only shape §1's table says
            registers, and it is what a socket wall is actually supplied by. */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = ((i * 142 + f * 6.6) % 1220) - 130;
          const c = [CLAY, TEAL, GOLD, VIOLET][i % 4];
          return (
            <div key={"fd" + i} style={{ position: "absolute", left: x, top: 62, width: 104,
              height: 64, zIndex: 26, borderRadius: 7,
              background: `linear-gradient(172deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.30)} 100%)`,
              border: `3px solid ${dkh(c, 0.52)}` }}>
              {[0, 1, 2].map((k) => (
                <div key={"fr" + k} style={{ position: "absolute", right: -7, top: 12 + k * 16,
                  width: 12, height: 8, borderRadius: 2, background: INGD }} />
              ))}
              <div style={{ position: "absolute", left: 12, top: 10, width: 5, height: 44,
                borderRadius: 3, background: hexa("#000000", 0.24) }} />
              <div style={{ position: "absolute", left: 22, top: 10, width: 5, height: 44,
                borderRadius: 3, background: hexa("#000000", 0.24) }} />
            </div>
          );
        })}
        <SocketWall x={40} y={gy - 60} w={932} h={286} f={f} z={28} n={8} filled={filled} />

        {["UI", "SCRAPE", "MKT", "MCP"].map((lb, i) => (
          <Cartridge key={"cg" + i} x={158 + i * 232} y={gy - 200} f={f} at={A[i]}
            from={i % 2 ? 520 : -520} s={1.0} z={64} label={lb}
            c={[CLAY, TEAL, GOLD, VIOLET][i]} />
        ))}
        {A.map((a, i) => (
          <React.Fragment key={"fx" + i}>
            <Ring x={158 + i * 232} y={gy - 200} f={f} at={a + 7} r={170} z={62} c={CYAN} w={7} />
            <Puff x={158 + i * 232} y={gy - 200} f={f} at={a + 7} c="#9FD4E2" n={9} s={1.0} z={60} />
          </React.Fragment>
        ))}
        {/* the charge running down to whoever is on the other end */}
        {A.map((a, i) => (
          <Cable key={"cb" + i} x0={158 + i * 232} y0={gy - 130} x1={158 + i * 232} y1={gy + 10}
            f={f} at={a + 7} c={IRON} z={34} w={40} charge={f >= a + 7} rate={9} />
        ))}
        <Crew f={f} x={150} y={gy + 70} i={2} size={176} z={66} at={0} loop={2} />
        <Crew f={f} x={388} y={gy + 70} i={6} size={174} z={66} at={0} loop={1} />
        <Crew f={f} x={626} y={gy + 70} i={9} size={176} z={66} at={0} loop={3} />
        <Crew f={f} x={864} y={gy + 70} i={11} size={172} z={66} at={0} loop={0} />
        <Spine f={f} lit={RAIL.S13} at={0} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S14 · RE-SKILLED — 111f (32.30-36.00s).
   VO: "to make it an expert in UI design, scraping, marketing, and so much more."

   ⭐ EACH JOB IS A REAL ACTIVITY, NOT AN ICON, and each starts on its own
   MEASURED word onset, scene-local: UI f31 · scraping f52 · marketing f64.
   ⭐ "AND SO MUCH MORE" is drawn as DEPTH: four more sockets light down the
   wall, each Claude smaller and darker — the value ramp is the axis the
   greyscale audit can actually see.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("socket");
  const UI = 31, SCR = 52, MKT = 64, MORE = 78;
  const ui_ = E(f, UI, UI + 26, 0, 1, OUT);
  const scr = E(f, SCR, dur - 8, 0, 1, LIN);
  const mkt = E(f, MKT, dur - 8, 0, 1, LIN);
  const gy = p.horizon + 130;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.088]} vig={0.62}>
      <Cam z={5}>
        <SetFor k="socket" f={f + 60} t={f * 1.2 + 300} rakeRate={7.4 * RAKE_K[v]}
          rakeX0={RAKE_X0[v]} parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />
        {/* ⭐ THE FEED — plugin cases riding the overhead tray for the whole
            shot. Large, bright, travelling: the only shape §1's table says
            registers, and it is what a socket wall is actually supplied by. */}
        {Array.from({ length: 8 }, (_, i) => {
          const x = ((i * 142 + f * 6.6) % 1220) - 130;
          const c = [CLAY, TEAL, GOLD, VIOLET][i % 4];
          return (
            <div key={"fd" + i} style={{ position: "absolute", left: x, top: 62, width: 104,
              height: 64, zIndex: 26, borderRadius: 7,
              background: `linear-gradient(172deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.30)} 100%)`,
              border: `3px solid ${dkh(c, 0.52)}` }}>
              {[0, 1, 2].map((k) => (
                <div key={"fr" + k} style={{ position: "absolute", right: -7, top: 12 + k * 16,
                  width: 12, height: 8, borderRadius: 2, background: INGD }} />
              ))}
              <div style={{ position: "absolute", left: 12, top: 10, width: 5, height: 44,
                borderRadius: 3, background: hexa("#000000", 0.24) }} />
              <div style={{ position: "absolute", left: 22, top: 10, width: 5, height: 44,
                borderRadius: 3, background: hexa("#000000", 0.24) }} />
            </div>
          );
        })}
        <SocketWall x={20} y={gy - 88} w={972} h={230} f={f} z={28} n={8}
          filled={3 + (f >= MORE ? Math.min(4, Math.floor((f - MORE) / 5) + 1) : 0)} />
        {[0, 1, 2].map((i) => (
          <Cable key={"cb" + i} x0={186 + i * 300} y0={gy - 140} x1={186 + i * 300} y1={gy - 10}
            f={f} at={0} c={IRON} z={30} w={40} charge rate={8} />
        ))}

        {/* ⭐ UI DESIGN — he pulls a screen layout together, panels SNAPPING in */}
        <div style={{ position: "absolute", left: 40, top: gy - 366, width: 300, height: 250,
          zIndex: 54 }}>
          {[[0, 0, 1, 0.22], [0, 0.28, 0.30, 0.72], [0.36, 0.28, 0.64, 0.40],
            [0.36, 0.74, 0.30, 0.26], [0.70, 0.74, 0.30, 0.26]].map((r, k) => {
            const t = E(f, UI + k * 5, UI + k * 5 + 6, 0, 1, BACK);
            return (
              <div key={"ui" + k} style={{ position: "absolute", left: `${r[0] * 100}%`,
                top: `${r[1] * 100}%`, width: `${r[2] * 100}%`, height: `${r[3] * 100}%`,
                transform: `scale(${t})`, borderRadius: 5,
                background: k === 0 ? hexa(CLAY, 0.9) : hexa(CREAMB, 0.86),
                border: `3px solid ${hexa("#241F17", 0.30)}` }} />
            );
          })}
        </div>

        {/* ⭐ SCRAPING — he reels a ribbon of page-rows in, hand over hand, and
            it crosses the full panel width. This is the scene's travelling band. */}
        <div style={{ position: "absolute", left: 360, top: gy - 344, width: 300, height: 248,
          zIndex: 54, overflow: "hidden" }}>
          {Array.from({ length: 16 }, (_, k) => {
            const t = ((scr * 3 + k / 16) % 1);
            return (
              <div key={"sc" + k} style={{ position: "absolute", left: 10, right: 10,
                top: 248 - t * 268, height: 22, borderRadius: 4,
                background: hexa(k % 3 === 0 ? CLAY : CREAMB, 0.86),
                opacity: f >= SCR ? 1 : 0 }} />
            );
          })}
        </div>
        {/* the spool it comes off */}
        <div style={{ position: "absolute", left: 452, top: gy - 400, width: 116, height: 116,
          zIndex: 56, borderRadius: "50%", opacity: f >= SCR ? 1 : 0,
          transform: `rotate(${f * 7}deg)`,
          background: `conic-gradient(${CREAMB} 0deg, ${TEAL} 120deg, ${CREAMB} 240deg, ${TEAL} 360deg)`,
          border: `4px solid ${dkh(TEAL, 0.34)}` }} />

        {/* ⭐ MARKETING — he fires posts up and the board FILLS */}
        <div style={{ position: "absolute", left: 676, top: gy - 366, width: 300, height: 250,
          zIndex: 52, borderRadius: 6, background: hexa("#2A2140", 0.7),
          border: `4px solid ${hexa(GOLD, 0.34)}`, opacity: f >= MKT ? 1 : 0.3 }} />
        {Array.from({ length: 9 }, (_, k) => {
          const at = MKT + k * 4;
          const t = E(f, at, at + 8, 0, 1, BACK);
          if (t <= 0) return null;
          return (
            <div key={"mk" + k} style={{ position: "absolute", left: 692 + (k % 3) * 96,
              top: gy - 352 + Math.floor(k / 3) * 78, width: 86, height: 64,
              marginTop: (1 - t) * 240,
              zIndex: 58, borderRadius: 4, opacity: t,
              background: hexa(k % 2 ? GOLD : CREAMB, 0.9),
              border: `2.5px solid ${hexa("#241F17", 0.28)}` }} />
          );
        })}

        {/* the three heroes, each with a NAME on an apron, one text unit each */}
        {R.jobs.map((j, i) => (
          <div key={"ap" + i} style={{ position: "absolute", left: 96 + i * 314, top: gy + 92,
            zIndex: 84, padding: "5px 12px", borderRadius: 6, whiteSpace: "nowrap",
            background: hexa("#0C0E14", 0.78), border: `2px solid ${hexa(CYAN, 0.44)}`,
            opacity: E(f, [UI, SCR, MKT][i], [UI, SCR, MKT][i] + 8, 0, 1, OUT) }}>
            <span style={{ ...mono(15, 900), color: "#F0EADA", letterSpacing: "0.12em" }}>{j}</span>
          </div>
        ))}
        <Hero f={f} x={172} y={gy + 74} size={206} z={70} costume={{ girl: 1 }} act={1} ph={0.3}
          drive={f >= UI ? Math.abs(Math.sin(f / 6)) * 0.6 : 0} reach={54} />
        <Hero f={f} x={492} y={gy + 74} size={204} z={70} costume={{ constr: 1 }} act={1} ph={1.4}
          drive={f >= SCR ? Math.abs(Math.sin(f / 5)) * 0.7 : 0} reach={58} />
        <Hero f={f} x={806} y={gy + 74} size={206} z={70} costume={{ chef: 1 }} act={2} ph={2.2}
          drive={f >= MKT ? Math.abs(Math.sin(f / 5.5)) * 0.6 : 0} reach={54} />

        {/* ⭐ "AND SO MUCH MORE" — four more, receding, each smaller and darker */}
        {f >= MORE && Array.from({ length: 4 }, (_, i) => {
          const at = MORE + i * 5;
          const t = E(f, at, at + 8, 0, 1, BACK);
          if (t <= 0) return null;
          const s = 104 - i * 16;
          return (
            <Crew key={"mo" + i} f={f} x={196 + i * 214} y={gy - 4 - i * 16} i={i + 3} size={s}
              z={40 - i} at={at} loop={i % 4} tint={["#B8654A", "#9E5740", "#874A36", "#71402F"][i]} />
          );
        })}

        <Spine f={f} lit={RAIL.S14} at={0} />
        <Mark x={62} y={112} s={62} z={90} />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S15 · THE BALCONY — 132f (36.00-40.40s).  **CTA**
   VO: "I made a full list of 15 tips from beginner to expert in a free guide.
        Comment KNOW for access."

   ⭐⭐ THE COUNTER DELIBERATELY STOPPED SHORT OF ITS OWN TOTAL FOR THE WHOLE
   REEL, so the CTA is THE REST OF THE NUMBER rather than a restatement of the
   promise. The rail runs horizontally here, at full width, and EXTENDS: slots
   7 through 15 light in sequence.
   ⭐ AND THE HERO ARTIFACT BECOMES THE DELIVERABLE — the ingot the drum poured
   at 1.2s is pressed into the guide the CTA hands over.
   ====================================================================== */
export const S15: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = placeFor("dawn");
  const EXT = 20, PRESS = 58, TYPE = 94, BACK_ = 112;
  const press = E(f, PRESS, PRESS + 10, 0, 1, IN_Q);
  const push = E(f, TYPE, TYPE + 14, 0, 1, IO);
  const ret = E(f, BACK_, BACK_ + 10, 0, 1, BACK);
  const gy = p.horizon + 150;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.46}>
      <Cam z={5}>
        <SetFor k="dawn" f={f} t={f * 0.5} rakeRate={5.6 * RAKE_K[v]} rakeX0={RAKE_X0[v]}
          parX={PAR_X[v]} rakeAng={RAKE_ANG[v]} />

        {/* ⭐ THE RAIL, HORIZONTAL AND FULL WIDTH, EXTENDING TO FIFTEEN */}
        <HourRail x={44} y={196} f={f} lit={R.tipsShown} at={0} horiz s={1.28} z={80}
          extendAt={EXT} label="TIPS IN THE GUIDE" />
        {Array.from({ length: 9 }, (_, i) => (
          <Ring key={"xr" + i} x={104 + (R.tipsShown + i) * 59} y={216} f={f} at={EXT + i * 5}
            r={96} z={82} c={INGH} w={6} />
        ))}
        {/* ⭐ THE SETTING CARRIAGE — a 190px brass head that runs the length of
            the rail setting each slot as it passes. The nine slots lighting was
            an event nine small objects were carrying; this gives it ONE large
            bright travelling object, which is the shape §1's table ranks
            highest and the only one that reads at thumbnail size. */}
        {f >= EXT && f < EXT + 58 && (
          <div style={{ position: "absolute", left: 74 + (R.tipsShown - 0.4) * 59 + E(f, EXT, EXT + 46, 0, 1, IO) * 9 * 59,
            top: 158, width: 190, height: 118, zIndex: 86, borderRadius: 10,
            background: `linear-gradient(180deg, ${INGH} 0%, ${ING} 38%, ${INGD} 100%)`,
            border: `5px solid ${dkh(INGD, 0.34)}` }}>
            <div style={{ position: "absolute", left: 16, top: 18, right: 16, height: 16,
              borderRadius: 4, background: hexa("#6B4E1C", 0.34) }} />
            <div style={{ position: "absolute", left: 26, bottom: 14, width: 46, height: 34,
              borderRadius: 5, background: dkh(INGD, 0.30) }} />
            <div style={{ position: "absolute", right: 26, bottom: 14, width: 46, height: 34,
              borderRadius: 5, background: dkh(INGD, 0.30) }} />
          </div>
        )}

        {/* the ingot, pressed into the guide — the artifact becoming the thing */}
        {f < PRESS + 12 && <Ingot x={300} y={gy - 250 + press * 96} s={2.0} z={70}
          stamp={R.hours} hot={0.5 - press * 0.4} rot={press * -6} />}
        <Ring x={300} y={gy - 160} f={f} at={PRESS + 10} r={230} z={66} c={INGH} w={8} />
        <Puff x={300} y={gy - 150} f={f} at={PRESS + 10} c="#E8D2A2" n={12} s={1.2} z={64} />
        {f >= PRESS + 8 && (
          <Guide x={300} y={gy - 168 + Math.sin((f - PRESS) / 3.4) * 26 * Math.exp(-(f - PRESS) / 30)}
            f={f} s={1.28} z={72}
            rot={-4 + Math.sin((f - PRESS) / 3.1) * 9 * Math.exp(-(f - PRESS) / 26)} />
        )}

        {/* the comment slot — KNOW goes in, the guide comes back out */}
        <CommentSlot x={760} y={gy + 10} f={f} at={TYPE} s={1.0} z={52} push={push} ret={ret} />
        {Array.from({ length: 5 }, (_, i) => {
          const at = BACK_ + i * 5;
          if (f < at) return null;
          const t = E(f, at, at + 11, 0, 1, BACK);
          const lf = f - at;
          return (
            <Guide key={"gd" + i} x={760 + i * 34}
              y={gy - 84 - t * (150 + i * 30)} f={f} s={1.02 - i * 0.06} z={68 - i}
              rot={t * (10 + i * 5) + Math.sin(lf / 3.4) * 8 * Math.exp(-lf / 22)} />
          );
        })}
        <Ring x={760} y={gy - 74} f={f} at={BACK_} r={190} z={66} c={GOLD} w={6} />

        {/* NIB, a master now */}
        {/* ⛔ 116 OF 132 FRAMES WERE A HELD POSTER. The works below runs a shift
            change for the whole shot: eight Claudes crossing the deck under the
            balustrade, continuously, at three depths. */}
        {/* ⭐ THE WORKS IS AWAKE. A full-width gantry crossing the deck below
            plus three venting stacks, running for all 132 frames — the reel
            ends on a place that is still working, not on a poster of one. */}
        <div style={{ position: "absolute", left: -60, right: -60, top: gy - 236, height: 26,
          zIndex: 14, background: `linear-gradient(180deg, ${mxh(IRON, 0.22)} 0%, ${dkh(IRON, 0.52)} 100%)` }} />
        <div style={{ position: "absolute", left: ((f * 4.8) % 1240) - 140, top: gy - 268,
          width: 168, height: 62, zIndex: 15, borderRadius: 6,
          background: `linear-gradient(172deg, ${mxh(BRASS, 0.20)} 0%, ${dkh(BRASS, 0.44)} 100%)`,
          border: `4px solid ${dkh(BRASS, 0.58)}` }}>
          <div style={{ position: "absolute", left: 16, top: 14, right: 16, height: 20,
            borderRadius: 4, background: hexa(INGH, 0.72) }} />
        </div>
        {[150, 470, 800].map((sx, i) => (
          <React.Fragment key={"vs" + i}>
            <div style={{ position: "absolute", left: sx, top: gy - 366, width: 42, height: 130,
              zIndex: 13, background: hexa("#4A3E36", 0.9) }} />
            {Array.from({ length: 3 }, (_, k) => {
              const t = (((f + k * 26 + i * 17) % 78) / 78);
              return (
                <div key={"pl" + k} style={{ position: "absolute", left: sx - 14 + t * 30,
                  top: gy - 366 - t * 130, width: 56 + t * 52, height: 56 + t * 52,
                  borderRadius: "50%", zIndex: 12, opacity: (1 - t) * 0.34,
                  background: "#E8D8BE" }} />
              );
            })}
          </React.Fragment>
        ))}
        {/* the shift change on the deck below — big enough to read, three
            ranks deep, painted in progressively darker clay so the depth is
            legible to the greyscale audit as well as to the eye */}
        {Array.from({ length: 7 }, (_, i) => {
          const x = ((i * 172 + f * 4.4) % 1300) - 150;
          const rank = i % 3;
          return (
            <Crew key={"sh" + i} f={f} x={x} y={gy - 84 - rank * 34} i={i}
              size={150 - rank * 26} z={16 - rank} at={0} loop={i % 4}
              tint={["#C06B4C", "#A15A40", "#864B36"][rank]} />
          );
        })}
        <Hero f={f} x={506} y={gy + 52} size={264} z={70} costume={{ prof: 1, beard: 1 }} act={2}
          ph={0.4} drive={press * 0.7} reach={60}
          cheer={E(f, BACK_ + 4, BACK_ + 14, 0, 1, OUT)} />
        <Crew f={f} x={116} y={gy + 48} i={7} size={176} z={62} at={0} loop={3} />
        <Crew f={f} x={922} y={gy + 52} i={5} size={172} z={62} at={0} loop={2} />

        {/* the CTA plate — the only place the keyword is typeset large */}
        <div style={{ position: "absolute", left: 40, top: 268, width: 440, zIndex: 92,
          borderRadius: 15, padding: "18px 22px", background: CREAMB,
          border: `6px solid ${INK}`, boxShadow: SH_D,
          opacity: E(f, 6, 16, 0, 1, OUT), transform: `scale(${E(f, 6, 16, 0.9, 1, BACK)})`,
          transformOrigin: "0% 50%" }}>
          <div style={{ ...ui(56, 900), color: INK, lineHeight: 0.98 }}>{R.ctaBig}</div>
          <div style={{ ...mono(21, 900), color: CLAYD, letterSpacing: "0.08em", marginTop: 6 }}>
            {R.ctaSub}</div>
          <div style={{ ...mono(24, 900), color: INK, letterSpacing: "0.06em", marginTop: 10 }}>
            COMMENT “{R.keyword}”</div>
        </div>
        <MarkCast x={930} y={150} s={86} z={94} f={f} spin={0.5} />
        <Contact x={432} y={gy + 46} w={182} z={30} o={0.28} />
      </Cam>
    </Scene>
  );
};
