import React from "react";
import { Img, staticFile, useCurrentFrame, Sequence, OffthreadVideo } from "remotion";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  Scene, Cam, Mark, MarkPlate, MarkCast, Chip, Plate, BigNum, Contact, Motes,
  R, PLACES, asPlace, vivid, mono, ui, Rake, Ring, Puff, Pool, Steam,
  Crew, Hero, Forearm, costumeFor, squash, lerpHex,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, SKY,
} from "./LoopWorld";
import {
  PromptSlab, Lever, ReturnRail, Carriage, BuildRig, BrowserWin, AppWin, GameView,
  Paddle, Pulpit, RejectCounter, QualityBar, Hatch, Bench, Belt, Splitter, Plunger,
  TokenDrum, KnifeSwitch, ScreenAura,
} from "./LoopProps";
import { Hall, KeyPool, Stanchion, SparePile, Truss, DuctRun } from "./LoopSets";

/* ===========================================================================
   REEL 118 · "LOOP" — THE SCENES.  Board: storyboards/118-loop.md.

   ⛔⛔ EVERY SCENE HAS AN EVENT, NOT A COMPOSITION (ANIMATION-QUALITY §2): a
   before state legible on frame 1, a visible trigger, TRAVEL, and an arrival
   that costs something. Nothing here lands and simply stops.

   ⛔⛔ AND THE HERO ACTS (§12). Before each scene was written the question
   asked was **what does the Claude DO here**, never "what is around him":
     S0 drives a lever · S1 cranks a capstan · S2 throws a board lever ·
     S4 shoves a ticket three times · S5 slams a card · S6 the crew throws
     blocks onto a belt · S7 lands a plug · S8 raises a paddle · S9 slams it
     three times · S10 flips it and drops it · S11 shovels · S12 assembles ·
     S13 throws a knife switch · S14 passes a guide hand to hand.

   ⛔⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). `Crew`'s four loops are what
   the floor does WHILE the scene happens. Every scene still owes its own event.

   ⛔ ONE TEXT CHIP PER SHOT, in the reserved band (panel y 112..210). The
   picture carries MARKS and NUMERALS; the header and captions carry language.

   ⛔ EVERY SCENE IS LOCKED. The reel has exactly ONE re-framing move — the hard
   punch-in at S0 f62, which is a CUT, not a drift.
   ========================================================================= */

export type Variant = "gauntlet" | "amber" | "steel";

/** ⛔ THE CAMERA OFFSET GOES ON THE PANEL CONTENTS, NEVER THE WHOLE COMP, and
    it has to be big enough to beat a 64-bit dHash: targets mean >= 14, min >= 10. */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  gauntlet: { dx: -16, dy: 22, s: 1.048, rot: -0.6 },
  amber:    { dx: -70, dy: -46, s: 1.152, rot: 1.7 },
  steel:    { dx: 52, dy: 24, s: 1.112, rot: -1.5 },
};

/** ⛔⛔⛔ HUE IS NOT A VARIANT LEVER (reel 115). `hue-rotate` and `saturate` are
    BANNED from GRADE — both move the clay, and a trial cut may never recolour
    the Claude. Only CONTRAST and BRIGHTNESS vary; saturate is pinned at the
    house 1.26 for all three cuts. The pixel separation that costs is bought
    back on CAM (above) and RAKE (below), neither of which touches a sprite. */
export const GRADE: Record<Variant, string> = {
  gauntlet: "contrast(1.020) saturate(1.26) brightness(1.000)",
  amber:    "contrast(1.155) saturate(1.26) brightness(0.962)",
  /* ⛔ brightness(1.078) TOOK STEEL'S BLACK POINT TO p10 35.5 AND FAILED
     BODY_BLACK — reel 115 hit exactly this and wrote it down: raising
     brightness and lowering contrast BOTH lift blacks, and lifting blacks is
     the move that washed out ten reels. Steel takes its separation from
     CONTRAST instead, which deepens the shadows while it adds punch. The dHash
     had 23-30 bits of headroom against a bar of 10, so there was room to spend. */
  steel:    "contrast(1.088) saturate(1.26) brightness(1.024)",
};

/** ⭐ THE RAKE SPEED IS THE HIGHEST-RANKED VARIANT LEVER (docs/TRIAL-CUTS.md)
    and it never touches the cast. Phase offsets guarantee the bands sit
    somewhere different in EVERY frame, which is what a dHash actually samples. */
export const RAKE_K: Record<Variant, number> = { gauntlet: 1.0, amber: 1.70, steel: 0.56 };
export const RAKE_X0: Record<Variant, number> = { gauntlet: -240, amber: 300, steel: 760 };
export const PAR_X: Record<Variant, number> = { gauntlet: 0, amber: 920, steel: -640 };

type SP = { v: Variant; dur: number };

/** ⛔⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY, AND READ THE PIXELS BEFORE YOU
    TRUST THE ALGEBRA (reel 110's crown that floated 38px above a head, and
    reel 115's arm that read as a TAIL). `Mascot`'s drawn arm rects were placed
    from the container maths at `top + 0.43 * size` and came out ON THE FACE —
    measured off this reel's own frame-0 render, the arms are at **0.57** of
    `size` below the sprite div's top, and the outer edge is at **0.86** of its
    width. Both helpers below take the hero's own x/y/size/flip so a forearm can
    never again start somewhere the body is not. */
const armX = (x: number, size: number, flip = false, dx = 0) =>
  x + (flip ? -1 : 1) * size * 0.36 + dx;
const armY = (y: number, size: number) => y - size * 0.43;

/** THE ONE TEXT CHIP A SCENE IS ALLOWED - AND THIS REEL USES NONE OF THEM.
    The contact sheet showed all thirteen chips restating the header band that
    was already on screen directly above them: S7's chip read "LINE 3 / THE PART
    EVERYONE MISSES" under a header reading "LINE 3 - THE SECRET / THE PART
    EVERYONE MISSES". That is not one text chip per shot, it is the same
    sentence twice, and it is exactly the "too much text, animation should not
    be text" note (ANIMATION-QUALITY §4).
    The division stands as the house rule states it: the HEADER and the CAPTIONS
    carry the language, the PICTURE carries marks and numerals. What is left in
    frame is the hook board's 1 / 3 / 55,000, the slab's lit line numbers, the
    flap board's quote, the REJECT/PASS counter, THE BAR, the MVP stamp and the
    LOOP plate - every one of them an object in the set rather than a caption
    laid over it. Kept, unused, so a later round can reach for it deliberately. */
const Tag: React.FC<{ f: number; at?: number; t: string; sub?: string; x?: number;
  c?: string; fg?: string; z?: number }> =
  ({ f, at = 0, t, sub, x = 44, c = CREAMB, fg = "#241F17", z = 88 }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const dx = E(lf, 0, 10, -320, 0, OUT);
  return (
    <div style={{ position: "absolute", left: x + dx, top: 124, zIndex: z,
      opacity: E(lf, 0, 7, 0, 1, LIN), display: "flex", alignItems: "stretch",
      borderRadius: 14, overflow: "hidden", border: "4px solid #241F17", boxShadow: SH_D }}>
      <div style={{ background: c, padding: "10px 22px", display: "flex", flexDirection: "column",
        justifyContent: "center" }}>
        <span style={{ ...mono(30, 900), color: fg, letterSpacing: "-0.01em",
          whiteSpace: "nowrap" }}>{t}</span>
        {sub && <span style={{ ...mono(17, 700), color: "#7E7768", whiteSpace: "nowrap" }}>{sub}</span>}
      </div>
    </div>
  );
};

/* =========================================================================
   S0 · THE INTAKE — 96f · HOOK.  Two shots, ONE event.
   VO: "There's a new prompting technique that's been blowing people's minds
        over the past week."

   ⭐ THE HOOK IS AN IMAGE, NOT A ROOM: a Claude drives one lever and a build
   the size of the building erupts out of the floor in front of him.

   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION. `intake` is the reel's only room
   built for the >=140 bar, the CLAIM BOARD is one bright object at 18.4% of
   the panel carrying the mark AND the count (reel 109: one object, two gate
   results), and everything is SETTLED at f0 — the eruption starts at f8.
   ⛔ A CUT IS NOT AN EVENT. There is exactly one cut, at f62, and it carries
   the payoff (the top-out), not a new framing of the same still.
   ⛔ AN ACTION IS A DISTANCE: the lever travels 96deg, and the tower's first
   stage clears 250px in 5 frames.
   ====================================================================== */
export const S0: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("intake");
  const B = f >= 62;                                   /* the punch-in */
  /* ⭐ OVERLAPPING ACTION, NOT STEPPED (§13): four stages, each leading the
     next, so the composite keeps repainting while every part moves smoothly. */
  const stage = (i: number) => E(f, 8 + i * 11, 20 + i * 11, 0, 1, i === 3 ? BACK : OUT);
  const grow = (stage(0) + stage(1) + stage(2) + stage(3)) / 4;
  const lvl = 1 + stage(0) + stage(1) + stage(2) + stage(3);
  /* ⛔ v1 TRANSLATED THE WHOLE RIG UP BY 710px, so the build left the frame
     entirely and read as an object flying away rather than a tower rising.
     `BuildRig` already grows UPWARD from a fixed base — the plinth stays put —
     so the eruption is TIERS plus SCALE, and at s 2.42 the crown is cropped by
     the panel top, which is what "bigger than the room" actually looks like. */
  /* AND CAP THE GROWTH. At 1.02 + 1.40 the finished tower was 462px wide and
     774 tall - it crossed the claim board, pushed the hero into a corner, and
     the eye had nowhere to rest. 1.02 + 0.82 gives 357x525: still the biggest
     object in the reel and still cropped by the panel top, with the board and
     the hero both intact. Excitement and legibility are not a trade-off. */
  const rigS = 1.02 + grow * 0.82;
  const topOut = f >= 55;
  const shk = topOut ? Math.sin((f - 55) / 2.2) * Math.exp(-(f - 55) / 9) * 9 : 0;
  const lever = E(f, 2, 8, 0, 1, IN_Q);
  /* the lever ball's real position, so the forearm ENDS on something on screen
     (⛔ a limb terminating in mid-air reads as a TAIL) */
  const th = ((-46 + lever * 96) * Math.PI) / 180;
  /* the lever sits where the hero can actually REACH it. At x=546 against a
     hero at x=306 the connecting forearm ran 216px on a 268px sprite — 80% of
     his own body — which is the "limb that reads as a pole" end of the same
     defect as a limb terminating in mid-air. Closing the gap to 146px keeps
     both ends on screen and the arm plausible through the whole throw. */
  /* ⛔ AND THE PUNCH IS MILD NOW. At 1.26 on top of the scene push and the cut
     camera the effective crop was 1.393 — 143px each side — and the frame strip
     showed it slicing "1 PROMPT" off the board and turning the tower into a wall
     of yellow cells. 1.13 keeps the cut (an open needs one) without
     re-composing the shot into an abstract. */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.34}
      glow={hexa(p.key, 0.22)}>
      <Cam x={B ? 0 : 0} y={B ? 26 : 0} s={B ? 1.12 : 1} z={10} rot={0}>
        <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={3} kind="bay"
          rake={0.41} rakeX={RAKE_X0[v]} rakeRate={4.46 * RAKE_K[v]}
          lamp={{ x: 300, y: 250, r: 300 }} />
        {/* the return rail across the ceiling — the loop is in frame from f0 */}
        <ReturnRail y={120} f={f} rate={3.96 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />

        {/* ⭐ THE CLAIM BOARD — ONE bright object carrying the mark AND the count
            (reel 109: one object, two gate results). 704x266 = 23.4% of the
            panel; measured bright-pixel share 18.2%. Settled on frame 0. */}
        <div style={{ position: "absolute", left: 116, top: 112, width: 468, height: 320,
          zIndex: 44, borderRadius: 14, boxShadow: SH_D, overflow: "hidden",
          background: `linear-gradient(172deg, #FCFAF2 0%, #F4EFE2 48%, #E2D9C6 100%)`,
          border: "7px solid #2A241C" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 46,
            background: "#2A241C", display: "flex", alignItems: "center", gap: 12,
            paddingLeft: 16 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile("claude_logo.png")}
                style={{ width: 25, height: 25, objectFit: "contain" }} />
            </div>
            <span style={{ ...mono(20, 900), color: "#D8CFBC", letterSpacing: "0.22em" }}>
              CLAUDE CODE</span>
          </div>
          {/* THE NUMERALS — the picture carries digits, never sentences.
              ⛔ AND THE BOARD IS NARROWER THAN THE TOWER'S LEFT EDGE. At 648 wide
              it ran to x 764 while the finished build's left edge sits at 594, so
              the frame strip showed the tower growing straight over "55,000" —
              the hook's own receipt, covered by the hook's own hero object. Two
              rows in 468px clears it with 10px to spare. */}
          <div style={{ position: "absolute", left: 24, top: 62, display: "flex",
            alignItems: "flex-end", gap: 22 }}>
            <div>
              <div style={{ ...mono(96, 900), color: "#241F17", lineHeight: 0.88 }}>1</div>
              <div style={{ ...mono(20, 800), color: "#7E7768", letterSpacing: "0.16em" }}>PROMPT</div>
            </div>
            <div style={{ width: 5, height: 88, background: "#CFC5AE" }} />
            <div>
              <div style={{ ...mono(96, 900), color: CLAYD, lineHeight: 0.88 }}>3</div>
              <div style={{ ...mono(20, 800), color: "#7E7768", letterSpacing: "0.16em" }}>LINES</div>
            </div>
          </div>
          <div style={{ position: "absolute", left: 24, right: 20, top: 196, height: 4,
            background: "#DCD3C0" }} />
          <div style={{ position: "absolute", left: 24, top: 212, display: "flex",
            alignItems: "baseline", gap: 12 }}>
            <div>
              {/* A NUMBER MOVES TO ITS VALUE. v1 typeset 55,000 at its answer,
                  which is the rule this repo states most often and also left the
                  board's largest numeral perfectly still for 96 frames. It now
                  counts up with the tower it is describing. */}
              <div style={{ ...mono(84, 900), color: "#241F17", lineHeight: 1.0 }}>
                {Math.round(E(f, 8, 55, 0, 55000, OUT) / 250) * 250 === 55000
                  ? R.demo.lines
                  : (Math.round(E(f, 8, 55, 0, 55000, OUT) / 250) * 250).toLocaleString("en-US")}</div>
            </div>
            <div style={{ ...mono(20, 800), color: "#7E7768", letterSpacing: "0.16em" }}>LINES OUT</div>
          </div>
        </div>

        {/* the build plot and its slot — the before state, legible on frame 1 */}
        <div style={{ position: "absolute", left: 638, top: 600, width: 264, height: 26,
          zIndex: 20, borderRadius: 4, background: "#100D08",
          border: "4px solid " + dkh(OXIDE, 0.50) }} />
        <KeyPool p={p} x={770} y={598} w={520} o={0.30} z={18} />

        {/* ⭐ THE EVENT: the tower erupts — four overlapping stages of tiers AND
            scale, from a base that never moves */}
        <div style={{ position: "absolute", inset: 0, zIndex: 46,
          transform: `translateY(${shk}px)` }}>
          <BuildRig x={770} y={618} lvl={lvl} f={f} s={rigS} z={46} />
        </div>
        {[0, 1, 2, 3].map(i => (
          <React.Fragment key={"er" + i}>
            <Ring x={770} y={606} f={f} at={8 + i * 11} c={GOLD} s={1.1 + i * 0.24} z={50} />
            <Puff x={770} y={612} f={f} at={8 + i * 11} c="#CFC0A2" n={11} s={1.2 + i * 0.22}
              z={48} up={46} />
          </React.Fragment>
        ))}

        {/* the hero: he DRIVES the lever, then recoils and cranes up at the top-out */}
        <Plunger x={512} y={624} k={lever} s={1.02} z={62} />
        <Hero f={f} x={282} y={748} size={268} z={56} act={3} ph={0.4}
          drive={lever * 0.42} reach={76} strain={lever * 0.60}
          shock={topOut ? E(f, 55, 62, 0, 1, OUT) * 0.9 : 0}
          gaze={topOut ? -0.8 : 0.35} costume={{ constr: 1 }} />
        <Forearm x0={armX(282, 268, false, lever * 0.30 * 76)} y0={armY(748, 268)}
          x1={512} y1={548 + lever * 76} w={23} z={60} />
        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — steam off the head */}
        <Steam x={282} y={504} f={f} at={20} n={8} s={1.1} z={62} rate={1.2} />
        <Contact x={196} y={744} w={176} z={19} o={0.42} />

        {/* ⭐ A FULL-WIDTH TRAVELLING BAND AT GROUND LEVEL — §1's highest-value
            per-scene shape, and motivated: this is the stock feeding the plot
            the tower is coming out of. The hook was the weakest scene in the
            reel and it is the one Alex names first. */}
        <Belt x={-30} y={734} w={W + 60} f={f} z={44} rate={5.6 * RAKE_K[v]} c={SLATE}
          load={[0.05, 0.28, 0.5, 0.72, 0.92].map((k, i) => ({
            k, c: [CREAMB, GOLD, TEAL, CLAY, CREAMB][i] }))} />
        {/* the floor crew at the tower's foot — they are what the tower is
            BIG compared to, and they flinch when it tops out. Their arrivals
            are early so frame 0 already has three characters in it. */}
        {[620, 740, 862].map((x, i) => (
          <Crew key={"hk" + i} f={f} x={x} y={710} i={i + 6} size={130} z={52} at={i * 2}
            loop={f > 55 ? 2 : 3} />
        ))}
        {/* ⭐ AND THE PUNCH SHOT GETS ITS OWN EVENT. After f62 the counter has
            finished and the tower has topped out, so the second shot was
            carrying a settled frame. The build's windows now light in a fast
            cascade up the tower through the punch — large, bright, and arriving
            one rank at a time, which is the shape §1's table rewards. */}
        {f >= 58 && Array.from({ length: 5 }, (_, r) => {
          const k = E(f, 60 + r * 5, 68 + r * 5, 0, 1, OUT);
          if (k <= 0.01) return null;
          return (
            <div key={"wc" + r} style={{ position: "absolute", left: 770 - 176, zIndex: 47,
              top: 596 - (r + 1) * 118, width: 356 * k, height: 96,
              background: `linear-gradient(90deg, ${hexa(GOLD, 0.44)} 0%, ${hexa(GOLD, 0.10)} 100%)` }} />
          );
        })}
        {/* debris shaken loose as it rises */}
        {[16, 30, 44].map((at, i) => (
          <Puff key={"db" + i} x={770 + (i - 1) * 118} y={560} f={f} at={at} c="#B8A88C"
            n={9} s={1.5} z={49} up={-70} />
        ))}
        <Stanchion side="l" c="#2E271F" w={72} z={90} braceY={470} braceW={150} />
        <SparePile side="r" c="#4A3B28" h={186} z={86} n={3} />
        <Motes x={300} y={150} w={420} h={420} n={14} f={f} z={40} c="#F2E4C2" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   S1 · THE BENCH FLOOR — 86f.
   VO: "Because in a single prompt, you can build fully functional apps and
        websites,"
   ⛔ CONTAINERS vs DEPICTIONS (§3): the VO's nouns are APPS and WEBSITES, so
   the shot draws a browser with real chrome, an app with a real sidebar and a
   game viewport with a real HUD — not three boxes with logos on them.
   ⛔ ARRIVALS SPAN THE FULL DURATION: f8 / f36 / f62 of 86.
   ====================================================================== */
export const S1: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  const rise = (at: number) => E(f, at, at + 15, 260, 0, OUT);
  const crank = (at: number) => E(f, at, at + 9, 0, 1, IN_Q) - E(f, at + 9, at + 20, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.062]} vig={0.50} glow={hexa(p.key, 0.20)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={4} kind="plant"
        rake={0.46} rakeX={RAKE_X0[v]} rakeRate={5.7 * RAKE_K[v]}
        lamp={{ x: 506, y: 300, r: 340 }} />
      <ReturnRail y={124} f={f} rate={7.13 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* the gantry the hoists hang from */}
      <div style={{ position: "absolute", left: -20, top: 176, width: W + 40, height: 30,
        zIndex: 28, background: `linear-gradient(180deg, ${mxh(SLATE, 0.16)} 0%, ${dkh(SLATE, 0.52)} 100%)` }} />
      {/* THE HOISTS HANG FROM THE GANTRY. v1 drew a fixed 190px stick from the
          gantry that STOPPED SHORT of each window, so on the contact sheet the
          three artifacts read as furniture standing on stilts. Each cable now
          runs from the gantry to that window's own moving top edge and ends in a
          hook block, so the thing it is carrying is unambiguous. */}
      {[[236, 302, 8], [506, 318, 35], [790, 296, 62]].map(([x, wy, at], i) => {
        const top = wy + rise(at);
        return (
          <React.Fragment key={"hc" + i}>
            <div style={{ position: "absolute", left: x - 5, top: 206, width: 10,
              height: Math.max(0, top - 206), zIndex: 27, background: dkh(SLATE, 0.44) }} />
            <div style={{ position: "absolute", left: x - 19, top: top - 20, width: 38,
              height: 24, borderRadius: 4, zIndex: 55, background: dkh(BRASS, 0.28),
              border: `3px solid ${mxh(BRASS, 0.16)}` }} />
          </React.Fragment>
        );
      })}

      {/* the three floor slots the artifacts come out of */}
      {[236, 506, 790].map((x, i) => (
        <Hatch key={"h" + i} x={x} y={604} open={E(f, 4 + i * 27, 14 + i * 27, 0, 1, OUT)}
          s={1.25} z={22} c="#4A3220" f={f} />
      ))}

      {/* ⭐ REAL ARTIFACTS, DRAWN — each winched up out of its own slot */}
      {/* ⭐ EACH SCREEN SITS IN ITS OWN LIGHT. The aura is keyed to the artifact's
          own colour and fades up as it arrives, so the three of them read as
          three LIT things rather than three pictures hung on a wall. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 52 }}>
        <ScreenAura x={112} y={302 + rise(8)} w={258} h={184} c={CLAY} f={f}
          k={E(f, 8, 24, 0, 1, OUT)} z={51} />
        <BrowserWin x={112} y={302 + rise(8)} s={0.86} z={52} f={f - 8} />
        <ScreenAura x={392} y={318 + rise(35)} w={230} h={170} c={TEAL} f={f + 40}
          k={E(f, 35, 51, 0, 1, OUT)} z={51} />
        <AppWin x={392} y={318 + rise(35)} s={0.86} z={53} f={f - 35} />
        <ScreenAura x={648} y={296 + rise(62)} w={288} h={182} c={GOLD} f={f + 80}
          k={E(f, 62, 78, 0, 1, OUT)} z={51} />
        <GameView x={648} y={296 + rise(62)} s={0.90} z={54} f={f - 62} />
      </div>
      {[8, 35, 62].map((at, i) => (
        <React.Fragment key={"ar" + i}>
          <Ring x={[236, 506, 790][i]} y={600} f={f} at={at + 14} c={GOLD} s={0.9} z={56} />
          <Puff x={[236, 506, 790][i]} y={606} f={f} at={at + 13} c="#C6A882" n={9} s={0.95} z={50} />
        </React.Fragment>
      ))}

      {/* the hero cranks a capstan — one crank per lift, body under real load */}
      <div style={{ position: "absolute", left: 866, top: 560, width: 120, height: 120, zIndex: 44 }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: dkh(BRASS, 0.34),
          border: `6px solid ${dkh(BRASS, 0.56)}` }} />
        {[0, 1, 2, 3].map(i => (
          <div key={"cp" + i} style={{ position: "absolute", left: 54, top: 54, width: 66, height: 9,
            borderRadius: 5, background: mxh(BRASS, 0.14), transformOrigin: "0% 50%",
            transform: `rotate(${i * 90 + f * 2.6}deg)` }} />
        ))}
      </div>
      <Hero f={f} x={906} y={664} size={214} z={56} act={1} ph={1.2}
        strain={0.30 + Math.max(crank(8), crank(35), crank(62)) * 0.52}
        drive={Math.max(crank(8), crank(35), crank(62)) * 0.34} reach={-40} flip
        costume={{ chef: 1 }} />
      <Contact x={834} y={660} w={148} z={19} o={0.40} />

      {/* the floor crew — an action loop, which is what the floor does WHILE */}
      {[96, 330, 600].map((x, i) => (
        <Crew key={"cw" + i} f={f} x={x} y={702} i={i + 3} size={122} z={47} at={i * 4} loop={i % 3} />
      ))}

      <Stanchion side="r" c="#33281C" w={64} z={90} lean={0.6} />
    </Scene>
  );
};

/* =========================================================================
   S2 · THE GALLERY — 98f.
   VO: "even the creator of Claude Code said might be the future of prompting
        LLMs."
   ⛔ NO LIKENESS OF A REAL PERSON (honesty ledger 2). The receipt is a
   SPLIT-FLAP BOARD carrying six quoted words and a name plate.
   ⭐ INFORMATION THAT CHANGES IS THE BEST MOTION THERE IS — the flaps cascade
   left to right, letter by letter, and the room is lit BY the board.
   ====================================================================== */
const FlapCell: React.FC<{ ch: string; f: number; at: number; s?: number }> =
  ({ ch, f, at, s = 1 }) => {
  const lf = f - at;
  const settled = lf > 12;
  const roll = "ETAOINSRHLDCUMWFGYPBVKJXQZ ";
  const shown = settled ? ch : (lf < 0 ? " " : roll[Math.floor(Math.abs(lf) * 2.4) % roll.length]);
  const flip = settled ? 0 : Math.abs(Math.sin(lf * 1.5)) * 22;
  /* ⭐ THE FLAP CATCHES THE LIGHT. A split-flap board's motion is not the letter
     changing, it is a bright leaf falling through the cell — which is also
     where all of this scene's luma delta comes from. Without it the cell only
     ever swapped one 30px glyph for another and the whole board measured as a
     still, however much information was arriving. */
  const leaf = lf >= 0 && lf <= 12 ? Math.abs(Math.sin(lf * 1.5)) : 0;
  return (
    <div style={{ width: 38 * s, height: 54 * s, borderRadius: 4 * s, position: "relative",
      overflow: "hidden",
      background: settled ? "#1B2130" : "#0C0F14", border: `${2 * s}px solid #2E353F`,
      display: "flex", alignItems: "center", justifyContent: "center",
      transform: `perspective(300px) rotateX(${flip}deg)` }}>
      <span style={{ ...mono(30 * s, 900), color: settled ? "#F6EBCB" : "#7A8394" }}>{shown}</span>
      {leaf > 0.04 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0,
          height: `${leaf * 100}%`, background: hexa("#E8DCBA", 0.80) }} />
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2 * s,
        background: hexa("#000000", 0.70) }} />
    </div>
  );
};

export const S2: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gallery");
  /* ⭐⭐ REAL FOOTAGE OF THE PERSON BEING QUOTED. Alex: *"for 'even the creator
     of claude code' show a video of the creator of claude code like speaking on
     stage."* Source: Y Combinator, "Boris Cherny: We Cut 80% of Claude Code's
     Prompt", the fireside chat at ~1:47. Two beats cut from it, both MUTED:
     `boris_wide.mp4` (the stage two-shot, so you read that it IS a stage) and
     `boris_tight.mp4` (him talking).

     ⛔ REAL FOOTAGE IS NOT AUTOMATICALLY MOTION — a clip HELD for a sentence
     measured 3.23 with a 60-frame dead run. So it gets an EDIT: a hard cut from
     wide to tight on the measured onset of "creator" (6.57s = local f15), and a
     second scale STEP at f56 as "the future" lands. Never a tween.
     ⛔ AND IT IS MUTED. The clips carry their own audio and the VO owns this
     track; `-an` at extract time, `muted` here, belt and braces.

     ⭐ THE QUOTE SURVIVES AS A LOWER THIRD. The split-flap board that used to
     carry it was the better-reading half of the old scene, but it cannot share
     the frame with footage. A broadcast lower third does the same job in a
     quarter of the space and is a shape every viewer already knows. */
  const CUT = 15;
  const punch = f >= 56 ? 1.07 : 1;
  const SX = 148, SY = 214, SW = 716, SH = 403;
  const lower = E(f, 41, 52, 0, 1, OUT);
  const words = R.cherny.quote.split(" ");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.62} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={3} kind="shutter"
        rake={0.162} rakeX={RAKE_X0[v]} rakeRate={3.71 * RAKE_K[v]}
        lamp={{ x: 506, y: 300, r: 400 }} />
      <ReturnRail y={120} f={f} rate={6.07 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />

      {/* the wall-mounted display: a real bezel, a mount arm and a status lamp */}
      <div style={{ position: "absolute", left: SX - 18, top: SY - 18, width: SW + 36,
        height: SH + 36, zIndex: 42, borderRadius: 16, boxShadow: SH_D,
        background: `linear-gradient(172deg, #3A414C 0%, #1C2027 62%, #12151A 100%)`,
        border: `6px solid #0C0E12` }} />
      <div style={{ position: "absolute", left: SX + SW / 2 - 34, top: SY + SH + 18, width: 68,
        height: 54, zIndex: 41, background: dkh(SLATE, 0.46) }} />
      <div style={{ position: "absolute", left: SX + SW - 44, top: SY + SH + 2, width: 14,
        height: 14, borderRadius: 14, zIndex: 44, background: GREEN }} />

      {/* ⭐ THE FOOTAGE, inside the frame, cut on the word */}
      <div style={{ position: "absolute", left: SX, top: SY, width: SW, height: SH, zIndex: 43,
        overflow: "hidden", borderRadius: 6 }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${punch})`,
          transformOrigin: "50% 42%" }}>
          <Sequence from={0} durationInFrames={CUT}>
            <OffthreadVideo src={staticFile("boris_wide.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
          <Sequence from={CUT}>
            <OffthreadVideo src={staticFile("boris_tight.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
        </div>
        {/* a faint scan sheen so it reads as a SCREEN rather than a hole in the wall */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: `linear-gradient(184deg, ${hexa("#BFD8F2", 0.10)} 0%, ${hexa("#BFD8F2", 0)} 46%)` }} />
      </div>
      <ScreenAura x={SX} y={SY} w={SW} h={SH} c={SKY} k={0.7} z={40} f={f} />

      {/* ⭐ THE LOWER THIRD — the receipt, in the shape every viewer knows */}
      <div style={{ position: "absolute", left: SX - 18 + 26, top: SY + SH - 96,
        zIndex: 60, display: "flex", alignItems: "stretch", borderRadius: 10,
        overflow: "hidden", boxShadow: SH_D,
        transform: `translateX(${(1 - lower) * -420}px)`, opacity: lower }}>
        <div style={{ background: CLAY, padding: "10px 14px", display: "flex",
          alignItems: "center" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 25, height: 25, objectFit: "contain" }} />
          </div>
        </div>
        <div style={{ background: "#12151A", padding: "9px 20px", display: "flex",
          flexDirection: "column", justifyContent: "center" }}>
          <span style={{ ...mono(29, 900), color: "#F4EAD2", letterSpacing: "0.02em",
            whiteSpace: "nowrap" }}>{"\u201C" + R.cherny.quote + "\u201D"}</span>
          <span style={{ ...mono(17, 800), color: "#8E96A4", letterSpacing: "0.14em",
            whiteSpace: "nowrap", marginTop: 3 }}>
            {R.cherny.who + "  \u00B7  " + R.cherny.what}</span>
        </div>
      </div>

      {/* the room is lit BY the screen, and the crowd below is watching it */}
      <Pool x={506} y={SY + SH + 40} w={900} c="#BFD8F2" o={0.20} z={20} hh={300} />
      {[142, 300, 458, 616, 774, 918].map((x, i) => (
        <Crew key={"gc" + i} f={f} x={x} y={772} i={i + 6} size={150} z={50} at={i * 3}
          loop={f > 56 ? 2 : 3} />
      ))}
      <Stanchion side="l" c="#1A1F29" w={104} z={90} braceY={470} braceW={112} />
      <Motes x={520} y={240} w={620} h={340} n={13} f={f} z={41} c="#CFE0F2" />
    </Scene>
  );
};

/* =========================================================================
   S3 · THE HALL — 38f · TITLE / TURN.  The whole gauntlet, seen for the first time.
   VO: "It's called the Gauntlet Loop."
   ⛔ ONE FAST EVENT, because 38 frames has no room for two: four lamp banks
   STRIKE ON left to right, each revealing one section of the hall, and the
   return rail catches on the last.
   ⛔ CONTAINED CONES ONLY — no full-frame plate, no flash (`no_flashing`).
   ====================================================================== */
export const S3: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  /* ⛔⛔ THE PICTURE HAS TO BE THE WORD. Alex: *"when it says gauntlet loop at
     like 10 seconds, i should see like a gauntlet thing animation there."* He is
     right and it is ANIMATION-QUALITY §3 on the noun rather than the verb: the
     VO names the thing, so the shot must BE the thing. v1 was a light sweep
     revealing benches and two pulpits — that is A HALL. Nobody looks at a hall
     and thinks "gauntlet".

     ⭐ A GAUNTLET HAS ONE INSTANTLY READABLE IMAGE: a LANE you must run between
     TWO FACING RANKS who strike at you as you pass. So the shot is now a
     one-point corridor receding to the BAR, eight critics in two ranks down its
     sides at falling scale, and their paddles snapping up in a wave from the far
     end toward camera. The work enters at the near end and starts the run.
     ⛔ The ranks carry a VALUE RAMP as well as a size ramp — back ranks in
     darker clay — because that is the axis the greyscale audit can see and the
     one that makes depth read. */
  /* ⭐⭐ MUCH BIGGER, AND THE MAIN FOCUS. The near rank is now 400px and stands
     BELOW the panel floor so it is cropped by the frame edge — a foreground mass
     the camera is standing behind, which is the depth cue this repo has failed
     to ship ten times. Each rank halves toward the vanishing point, so the
     corridor is a real perspective run rather than four evenly-spaced pairs. */
  const RANKS = [
    { x: 92, mx: 920, y: 858, s: 400, tint: undefined as string | undefined },
    { x: 196, mx: 816, y: 752, s: 296, tint: "#C2603C" },
    { x: 312, mx: 700, y: 664, s: 214, tint: "#A85434" },
    { x: 382, mx: 630, y: 602, s: 152, tint: "#8E4529" },
  ];
  /* the wave runs FAR to NEAR, so it arrives at the viewer */
  const up = (i: number) => E(f, 2 + (3 - i) * 4, 10 + (3 - i) * 4, 0, 1, BACK);
  const lane = E(f, 0, 14, 0, 1, OUT);
  const runK = E(f, 20, 38, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.104]} vig={0.52} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={4} kind="bay"
        rake={0.239} rakeX={RAKE_X0[v]} rakeRate={6.44 * RAKE_K[v]}
        lamp={{ x: 506, y: 300, r: 380 }} grit={1.4} />
      <ReturnRail y={120} f={f} rate={7.9 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />

      {/* ⭐ THE LANE — a bright floor running away from camera and converging.
          It is the single strongest cue that this is a corridor to be RUN. */}
      <div style={{ position: "absolute", left: 0, top: 452, width: W, height: 340, zIndex: 24,
        opacity: lane,
        background: `linear-gradient(180deg, ${hexa(SODIUM, 0.10)} 0%, ${hexa(SODIUM, 0.34)} 100%)`,
        clipPath: "polygon(46.5% 0, 53.5% 0, 92% 100%, 8% 100%)" }} />
      {/* the lane's edge kerbs, converging with it */}
      {[-1, 1].map(sgn => (
        <div key={"kb" + sgn} style={{ position: "absolute", left: 506 + sgn * 36 - 10, top: 452,
          width: 20, height: 340, zIndex: 25, opacity: lane, transformOrigin: "50% 0%",
          transform: `rotate(${sgn * 22}deg)`, background: mxh(SLATE, 0.20) }} />
      ))}
      {/* ⭐ THE BAR AT THE END OF IT — what running the gauntlet is FOR */}
      <div style={{ opacity: lane }}>
        <QualityBar y={340} f={f} on={0.30 + lane * 0.34} z={30} x0={430} x1={582} />
      </div>

      {/* ⭐⭐ THE TWO RANKS. Facing inward, paddles up, at falling scale AND
          falling value into depth. This is the gauntlet. */}
      {RANKS.map((r, i) => (
        <React.Fragment key={"rk" + i}>
          {/* left rank, facing right */}
          <Crew f={f} x={r.x} y={r.y} i={i * 2 + 9} size={r.s} z={52 - i * 3} at={i * 2}
            loop={3} tint={r.tint} />
          {f >= i * 2 && (
            <div style={{ position: "absolute", left: r.x + r.s * 0.30, top: r.y - r.s * 1.22,
              zIndex: 54 - i * 3, transformOrigin: "50% 100%",
              transform: `rotate(${-88 + up(i) * 62}deg) scale(${r.s / 400})` }}>
              <Paddle x={0} y={0} rot={0} face="bad" s={1.05} z={54 - i * 3} f={f} />
            </div>
          )}
          {/* right rank, facing left */}
          <Crew f={f} x={r.mx} y={r.y} i={i * 2 + 10} size={r.s} z={52 - i * 3} at={i * 2 + 1}
            loop={3} tint={r.tint} flip />
          {f >= i * 2 + 1 && (
            <div style={{ position: "absolute", left: r.mx - r.s * 0.30, top: r.y - r.s * 1.22,
              zIndex: 54 - i * 3, transformOrigin: "50% 100%",
              transform: `rotate(${88 - up(i) * 62}deg) scale(${r.s / 400})` }}>
              <Paddle x={0} y={0} rot={0} face="bad" s={1.05} z={54 - i * 3} f={f} />
            </div>
          )}
        </React.Fragment>
      ))}

      {/* the work entering the lane at the near end — the run begins */}
      <div style={{ position: "absolute", inset: 0, zIndex: 58 }}>
        <BuildRig x={506} y={824 - runK * 132} lvl={2} f={f} s={1.24 - runK * 0.34} z={58}
          shake={runK > 0.1 ? 2.6 : 0} />
      </div>
      <Puff x={506} y={780} f={f} at={20} c="#C6A882" n={9} s={1.0} z={56} up={30} />

      <Stanchion side="r" c="#1E262C" w={112} z={90} braceY={470} braceW={118} />
    </Scene>
  );
};

/* =========================================================================
   S4 · THE SIDE OFFICE — 61f · CONTRAST.
   VO: "Instead of going back and forth with the AI manually,"
   ⭐ THE LITERAL VERB IS "BACK AND FORTH", so the shot is a ticket going back
   and forth through a hatch three times, each cycle with MORE strain and LESS
   distance, and a reject pile growing beside him.
   ⛔ THE ONLY SCENE IN THE REEL WITH NO PUSH. The room is meant to feel stuck.
   ====================================================================== */
export const S4: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("office");
  /* three cycles: out, back, out, back, out, back */
  const cyc = (i: number) => {
    const a = 4 + i * 18;
    const out = E(f, a, a + 6, 0, 1, IN_Q);
    const back = E(f, a + 8, a + 15, 0, 1, OUT);
    return { k: out - back, out, back, a };
  };
  const c0 = cyc(0), c1 = cyc(1), c2 = cyc(2);
  const push = Math.max(c0.out - c0.back, c1.out - c1.back, c2.out - c2.back);
  const tired = E(f, 4, 58, 0.18, 0.72, LIN);
  const tx = c0.k * 356 + c1.k * 300 + c2.k * 228;
  const stamped = [c0, c1, c2].filter(c => f > c.a + 9).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.052]} vig={0.62} glow={hexa(p.key, 0.12)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="shutter"
        rake={0.164} rakeX={RAKE_X0[v]} rakeRate={2.24 * RAKE_K[v]}
        lamp={{ x: 470, y: 220, r: 220 }} grit={0.4} />
      {/* one sickly overhead, hard shadow, no fill */}
      <div style={{ position: "absolute", left: 372, top: 88, width: 196, height: 24, zIndex: 32,
        borderRadius: 5, background: "#2E3630" }} />
      <div style={{ position: "absolute", left: 388, top: 112, width: 164, height: 13, zIndex: 33,
        borderRadius: 3, background: "#C2CE9E", opacity: 0.72 + Math.sin(f / 3.1) * 0.10 }} />

      {/* the desk, the hatch in the wall, and the clock */}
      <div style={{ position: "absolute", left: 168, top: 578, width: 512, height: 30, zIndex: 40,
        borderRadius: 3, background: `linear-gradient(180deg, ${mxh("#4E4234", 0.20)} 0%, ${dkh("#4E4234", 0.30)} 100%)` }} />
      <div style={{ position: "absolute", left: 190, top: 606, width: 28, height: 158, zIndex: 39,
        background: dkh("#4E4234", 0.44) }} />
      <div style={{ position: "absolute", left: 630, top: 606, width: 28, height: 158, zIndex: 39,
        background: dkh("#4E4234", 0.44) }} />
      {/* the hatch: a lintel, a roller and a dark mouth */}
      <div style={{ position: "absolute", left: 700, top: 384, width: 288, height: 226, zIndex: 42,
        borderRadius: 8, background: "#0C0F0C", border: "8px solid #232A22" }}>
        <div style={{ position: "absolute", left: 10, top: 10, right: 10, height: 30,
          background: "#2E3630" }} />
        <div style={{ position: "absolute", left: 10, bottom: 10, right: 10, height: 16,
          background: "#1A1F19" }} />
      </div>
      {/* the wall clock, hand spinning — the background process */}
      <div style={{ position: "absolute", left: 232, top: 194, width: 134, height: 134, zIndex: 41,
        borderRadius: "50%", background: "#D8DCC6", border: "8px solid #2E3630" }}>
        <div style={{ position: "absolute", left: 59, top: 16, width: 6, height: 50,
          background: "#2E3630", transformOrigin: "50% 100%", transform: `rotate(${f * 15}deg)` }} />
        <div style={{ position: "absolute", left: 55, top: 56, width: 14, height: 14,
          borderRadius: 14, background: "#2E3630" }} />
      </div>

      {/* THE TICKET going back and forth */}
      <div style={{ position: "absolute", left: 498 + tx, top: 420, width: 206, height: 144,
        zIndex: 58, borderRadius: 7, background: CREAMB, border: "6px solid #8E8672",
        transform: `rotate(${tx * 0.04}deg)` }}>
        {[0, 1, 2].map(i => (
          <div key={"tk" + i} style={{ position: "absolute", left: 19, top: 26 + i * 30,
            width: 130 - i * 30, height: 13, borderRadius: 7, background: "#A8A08C" }} />
        ))}
        {stamped > 0 && <div style={{ position: "absolute", left: 30, top: 36, width: 144, height: 66,
          borderRadius: 4, background: hexa(RED, 0.86), transform: "rotate(-12deg)",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(32, 900), color: "#2A0E08" }}>{R.verdicts.bad}</span></div>}
      </div>

      {/* the reject pile growing beside him */}
      {Array.from({ length: stamped * 3 }, (_, i) => (
        <div key={"rp" + i} style={{ position: "absolute", left: 208 + (i % 3) * 12,
          top: 542 - Math.floor(i / 3) * 15, width: 114, height: 27, zIndex: 44 + i,
          borderRadius: 4, background: i % 2 ? "#C6BEA6" : CREAMB, border: "4px solid #8E8672",
          transform: `rotate(${(i % 2 ? 1 : -1) * 2.4}deg)` }} />
      ))}

      <Hero f={f} x={412} y={760} size={318} z={56} act={1} ph={0.9}
        drive={push * 0.55} reach={104} strain={tired}
        stern={tired * 0.8} costume={{ suit: 1 }} />
      <Contact x={320} y={756} w={200} z={19} o={0.46} />
      <Steam x={412} y={498} f={f} at={30} n={6} s={1.1} z={62} rate={0.7} c="#B8C4A0" />
      <Stanchion side="l" c="#1E241D" w={78} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S5 · THE LECTERN — 38f.  VO: "you set the task and tell Claude"
   ⛔ 38 frames = ONE fast event: a task card TRAVELS 260px in 5 frames and
   seats into line 1. An arrival that costs: recoil, ring, the slab rocks.
   ====================================================================== */
export const S5: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lectern");
  const fly = E(f, 3, 11, 0, 1, IN_Q);
  const seated = f >= 11;
  const rockA = seated ? Math.sin((f - 11) / 2.6) * Math.exp(-(f - 11) / 8) * 3.4 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.112]} vig={0.70} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={2} kind="plant"
        rake={0.205} rakeX={RAKE_X0[v]} rakeRate={3.97 * RAKE_K[v]}
        lamp={{ x: 506, y: 330, r: 300 }} grit={0.5} />
      <ReturnRail y={120} f={f} rate={6.6 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* one hard cone straight down on the slab, everything else falls away */}
      <div style={{ position: "absolute", left: 300, top: 150, width: 412, height: 400, zIndex: 24,
        background: `linear-gradient(180deg, ${hexa("#F2E0B4", 0.24)} 0%, ${hexa("#F2E0B4", 0)} 100%)`,
        clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)" }} />
      <Pool x={506} y={540} w={560} c={p.key} o={0.26} z={18} hh={150} />
      {/* the lectern body */}
      <div style={{ position: "absolute", left: 322, top: 596, width: 368, height: 130, zIndex: 42,
        background: `linear-gradient(174deg, ${mxh(SLATE, 0.12)} 0%, ${dkh(SLATE, 0.54)} 100%)`,
        borderRadius: 6 }} />
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, bottom: 0, zIndex: 60,
        transform: `rotate(${rockA}deg)`, transformOrigin: "50% 74%" }}>
        <PromptSlab x={302} y={382} w={408} f={f} lit={seated ? 1 : 0} s={0.94} z={60} hot={0} />
      </div>
      {/* THE TASK CARD, travelling */}
      <div style={{ position: "absolute", left: -78 + fly * 380, top: 356 + fly * 46, width: 214,
        height: 134, zIndex: 64, borderRadius: 8, opacity: seated ? 0 : 1,
        background: CREAMB, border: "6px solid #8E8672", boxShadow: SH_D,
        transform: `rotate(${-19 + fly * 19}deg) scale(${1 - fly * 0.20})` }}>
        <div style={{ position: "absolute", left: 16, top: 16, width: 44, height: 44, borderRadius: 9,
          background: CLAY }} />
        {[0, 1, 2].map(i => (
          <div key={"tc" + i} style={{ position: "absolute", left: 74, top: 20 + i * 22,
            width: 112 - i * 32, height: 12, borderRadius: 6, background: "#A8A08C" }} />
        ))}
        <div style={{ position: "absolute", left: 16, bottom: 14, right: 16, height: 14,
          borderRadius: 7, background: "#CFC5AE" }} />
      </div>
      <Ring x={392} y={430} f={f} at={11} c={GREEN} s={0.9} z={68} />
      <Puff x={392} y={436} f={f} at={11} c="#CFC4AE" n={9} s={0.9} z={66} />
      {/* ⭐ THE OUTPUT HALF (§10). The seat used to be the end of the scene and
          left 27 of 38 frames dead. Seating the task now FILLS line 1: six
          content bars sweep in left to right across the rest of the shot, so
          the thing the line now CONTAINS is what the viewer watches arrive. */}
      {/* ⭐ ONE FAST WIDE BAR, NOT SIX SMALL ONES. Six 44x22 fills are 10x5px
          after the audit's 1012->240 downsample — the same defect as the reel
          109 supply pulses. A single 408px bar filling line 1 in eight frames
          carries the identical information across ~9x the swept area, and a
          bright leading edge travelling with it is what the formula reads. */}
      {seated && (<>
        <div style={{ position: "absolute", left: 336, top: 398,
          width: 372 * E(f, 12, 20, 0, 1, OUT), height: 30, zIndex: 66, borderRadius: 15,
          background: `linear-gradient(90deg, ${hexa(GREEN, 0.34)} 0%, ${hexa(GREEN, 0.86)} 100%)` }} />
        <div style={{ position: "absolute", left: 336 + 372 * E(f, 12, 20, 0, 1, OUT) - 26,
          top: 390, width: 30, height: 46, zIndex: 67, borderRadius: 6,
          opacity: 1 - E(f, 20, 26, 0, 1, LIN), background: hexa("#EFE6CE", 0.90) }} />
        {/* the other two lines wake in answer, each a full-width sweep */}
        {[0, 1].map(i => (
          <div key={"wk" + i} style={{ position: "absolute", left: 336, top: 452 + i * 56,
            width: 372 * E(f, 20 + i * 6, 30 + i * 6, 0, 1, OUT), height: 22, zIndex: 66,
            borderRadius: 11, background: hexa(GOLD, 0.42 - i * 0.10) }} />
        ))}
      </>)}

      <Hero f={f} x={772} y={706} size={228} z={56} act={1} ph={1.6}
        drive={E(f, 4, 9, 0, 1, IN_Q) * 0.6 - E(f, 11, 20, 0, 1, OUT) * 0.6} reach={-120}
        strain={0.34} flip costume={{ constr: 1 }} />
      <Contact x={700} y={702} w={150} z={19} o={0.44} />
      <Stanchion side="l" c="#14171E" w={66} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S6 · THE FAN-OUT — 80f · ⭐ DENSITY PEAK 1.
   VO: "to deploy a massive team of subagents to do the work."
   ⛔ SPRITE PITCH IS ARITHMETIC: usable width 900, 5 columns -> pitch 168 for
   size 148 front / 108 back, comfortably over `spacing >= 0.85 * size`.
   ⛔ AND AN ACTION LOOP IS NOT A SCENE: the moment they land they start THROWING
   finished blocks onto a belt that fills and travels the full panel width.
   ⛔ ARRIVALS SPAN THE FULL 80f, never bunched in the first third.
   ====================================================================== */
export const S6: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  /* S6 IS A DENSITY PEAK AND THE FIRST CUT READ EMPTY. Three causes, all
     measured off the contact sheet: the arrivals were spread so late that only
     four of ten sprites had landed by mid-scene, the crowd sat in the bottom
     fifth under a large blank wall, and there was no BENCH for them to work at
     - so ten sprites doing action loops had nothing to do them TO. Arrivals now
     finish by f54 of 80 (still spread, but leaving 26 frames of full floor),
     the ranks move up, and every column gets a bench. */
  /* ⭐⭐ THIRTY-FOUR AGENTS, AND THE COUNT IS ARITHMETIC. Ten sprites at s=156
     was what the spacing law allows on ONE rank; more ranks is how you buy
     count without breaking `spacing >= 0.85 * size`. Each rank gets its own
     pitch from `usable/(n+1)`, its own smaller size, and its own darker clay —
     the value ramp is what makes four ranks read as depth instead of as a
     crowd, and it is the axis the greyscale audit can actually see. */
  /* ⭐⭐ THIRTY-EIGHT AGENTS, AND THE SPACING LAW DECIDES THE SIZE — not the
     other way round. The first attempt at "more agents" put 10 sprites at
     s=132 on a 916px rank: pitch 916/11 = 83px against a law of
     `spacing >= 0.85 * size` = 112px, so they overlapped into one orange mass.
     That is `reel-sprite-grounding-law` exactly, and it is arithmetic, not
     taste: **size <= pitch / 0.85**, computed per rank BEFORE the count is
     chosen. Deeper ranks carry MORE agents at SMALLER size, which is also what
     perspective does, and each rank is offset half a pitch so no two ranks
     stack into columns. */
  /* ⭐ BIGGER *AND* MORE, WHICH IS NOT A CONTRADICTION — it is a fifth rank.
     Within one rank, size is capped by `pitch/0.85`, so making sprites bigger
     means fewer PER RANK. Adding a rank buys the count back in DEPTH, where
     there is no horizontal spacing constraint at all. Front rank 116 -> 150,
     total 38 -> 40. */
  const RANKS = [
    { n: 6,  y: 722, s: 150, at: 6,  tint: undefined as string | undefined, z: 54, off: 0.0 },
    { n: 7,  y: 656, s: 130, at: 12, tint: "#CC6A44", z: 48, off: 0.5 },
    { n: 8,  y: 602, s: 112, at: 18, tint: "#C2603C", z: 42, off: 0.0 },
    { n: 9,  y: 560, s: 96,  at: 24, tint: "#A85434", z: 36, off: 0.5 },
    { n: 10, y: 526, s: 82,  at: 30, tint: "#8E4529", z: 30, off: 0.0 },
  ];
  const cols = [128, 296, 464, 632, 800];
  const beltLoad = [0, 0.18, 0.36, 0.54, 0.72, 0.9].map((k, i) => ({
    k, c: [CREAMB, TEAL, GOLD, CLAY, GREEN, CREAMB][i],
  })).filter((_, i) => f > 20 + i * 6);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.078]} vig={0.48} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={4} kind="plant"
        rake={0.46} rakeX={RAKE_X0[v]} rakeRate={7.44 * RAKE_K[v]}
        lamp={{ x: 506, y: 260, r: 400 }} grit={1.6} />
      <ReturnRail y={120} f={f} rate={8.71 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />

      {/* the chute out of the slab, and the SPLITTER: one stream in, five out */}
      <div style={{ position: "absolute", left: 486, top: 118, width: 40, height: 96, zIndex: 44,
        background: dkh(BRASS, 0.30), borderRadius: 4 }} />
      <Splitter x={506} y={238} f={f} at={0} n={5} s={0.94} z={46} span={676} c={GOLD} />

      {/* ten hatches, opening in the order their sprite arrives */}
      {cols.map((x, i) => (
        <React.Fragment key={"hh" + i}>
          <Hatch x={x} y={664} open={E(f, 8 + i * 5, 16 + i * 5, 0, 1, OUT)} s={1.08} z={22}
            c="#4A3220" f={f} />
          <Hatch x={x + 46} y={584} open={E(f, 32 + i * 5, 40 + i * 5, 0, 1, OUT)} s={0.84} z={21}
            c="#3E2A1A" f={f} />
          <Bench x={x + 46} y={594} w={130} s={0.82} z={30} />
          <Bench x={x} y={676} w={168} s={1.0} z={42} />
        </React.Fragment>
      ))}

      {/* ⭐ FOUR RANKS, BACK TO FRONT, EACH ON ITS OWN PITCH AND VALUE */}
      {RANKS.slice().reverse().map((r, ri) => {
        const pitch = 916 / (r.n + 1);
        return Array.from({ length: r.n }, (_, i) => (
          <Crew key={`rk${ri}-${i}`} f={f} x={48 + pitch * (i + 1 + r.off)} y={r.y}
            i={i + ri * 3} size={r.s} z={r.z} at={r.at + i * 2} loop={(i + ri) % 4}
            tint={r.tint} />
        ));
      })}
      {cols.map((x, i) => (
        <React.Fragment key={"cr" + i}>
          <Ring x={x} y={662} f={f} at={10 + i * 5} c={SODIUM} s={0.66} z={44} />
          <Puff x={x} y={666} f={f} at={10 + i * 5} c="#C6A882" n={8} s={0.76} z={42} up={30} />
        </React.Fragment>
      ))}

      {/* ⭐ THE JOB WITH AN OBJECT: the belt fills and carries work off frame */}
      <Belt x={-30} y={716} w={W + 60} f={f} z={54} rate={4.4 * RAKE_K[v]} c={SLATE}
        load={beltLoad} />

      <Stanchion side="r" c="#33281C" w={62} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S7 · THE THIRD LINE — 68f.
   VO: "But the secret sauce is in the third line of the prompt,"
   ⛔ AN EMPTY CONTAINER MUST READ WHILE IT IS EMPTY: line 3's socket is a
   BRIGHT BRASS RIM around a dark bore, differing from the slab in hue AND value.
   ⭐ OVERLAPPING ACTION (§13): the hoist leads, the plug follows on one ease,
   the chain lags on the plug's own velocity and rings out as a pendulum.
   ⭐ AND THE OUTPUT HALF OF THE MECHANISM (§10): the seat is answered by every
   pulpit lamp in the hall snapping on. A seat that changes nothing is a click.
   ====================================================================== */
export const S7: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("lectern");
  const A = 14, Bf = 30;
  const drop = (g: number) => E(g, A, Bf, 0, 1, IO);
  const k = drop(f);
  const vel = (drop(f + 1) - drop(f - 1)) * 0.5;
  const ring = f > Bf ? Math.sin((f - Bf) * 0.62) * Math.exp(-(f - Bf) / 6.5) * 22 : 0;
  const swing = -vel * 260 + ring;
  const hoist = E(f, A - 4, A + 10, 0, 1, OUT) - E(f, Bf - 14, Bf + 4, 0, 1, IO);
  const y = 96 + k * 300;
  const seated = f >= Bf;
  const wake = E(f, Bf, Bf + 14, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.118]} vig={0.66} glow={hexa(p.key, 0.22)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={3} kind="plant"
        rake={0.10 + wake * 0.14} rakeX={RAKE_X0[v]} rakeRate={4.46 * RAKE_K[v]}
        lamp={{ x: 470, y: 320, r: 300 }} grit={0.6} />
      <ReturnRail y={120} f={f} rate={6.86 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* ⭐ THE OUTPUT: the hall's pulpits wake on the seat */}
      {/* ⭐ THE OUTPUT HALF HAS TO BE BIG ENOUGH TO SEE. Four pulpits at s 0.62
          are ~92px wide — 22px after the audit's 1012->240 downsample — so the
          consequence of the whole scene registered as nothing. They are now
          s 0.86 and each one brings a 240x300 wall field up with it, which is
          the part the formula actually rewards. */}
      {[148, 322, 690, 866].map((x, i) => (
        <React.Fragment key={"pw" + i}>
          <div style={{ position: "absolute", left: x - 120, top: 196, width: 240, height: 300,
            zIndex: 26, opacity: E(f, Bf + i * 3, Bf + 12 + i * 3, 0, 1, OUT),
            background: `linear-gradient(180deg, ${hexa(VIOLET, 0.30)} 0%, ${hexa(VIOLET, 0)} 100%)` }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 30,
            opacity: E(f, Bf + i * 3, Bf + 10 + i * 3, 0, 1, OUT) }}>
            <Pulpit x={x} y={508} h={210} s={0.86} z={30} c="#33304A" lit={wake} f={f} />
          </div>
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: 288, top: 150, width: 420, height: 420, zIndex: 24,
        background: `linear-gradient(180deg, ${hexa("#F2E0B4", 0.26)} 0%, ${hexa("#F2E0B4", 0)} 100%)`,
        clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)" }} />
      <Pool x={498} y={556} w={520} c={p.key} o={0.26} z={18} hh={150} />

      <div style={{ position: "absolute", left: 316, top: 608, width: 368, height: 122, zIndex: 42,
        background: `linear-gradient(174deg, ${mxh(SLATE, 0.12)} 0%, ${dkh(SLATE, 0.54)} 100%)`,
        borderRadius: 6 }} />
      <PromptSlab x={296} y={392} w={408} f={f} lit={seated ? 3 : 2} s={0.94} z={60}
        hot={2} plug={seated ? 1 : 0} />

      {/* the chain and the heavy brass plug */}
      <div style={{ position: "absolute", left: 596, top: -20, width: 14, height: y + 60,
        zIndex: 56, transformOrigin: "50% 0%", opacity: seated ? 0 : 1,
        transform: `rotate(${swing * 0.10}deg)`,
        background: `repeating-linear-gradient(180deg, ${dkh(BRASS, 0.24)} 0px, ${dkh(BRASS, 0.24)} 9px, ${dkh(BRASS, 0.52)} 9px, ${dkh(BRASS, 0.52)} 18px)` }} />
      <div style={{ position: "absolute", left: 502 + swing, top: y - hoist * 34, width: 196,
        height: 144, zIndex: 62, borderRadius: 10, opacity: seated ? 0 : 1,
        background: `linear-gradient(168deg, ${mxh(BRASS, 0.26)} 0%, ${BRASS} 44%, ${dkh(BRASS, 0.46)} 100%)`,
        border: `5px solid ${dkh(BRASS, 0.58)}`, transform: `rotate(${swing * 0.14}deg)` }}>
        {[0, 1, 2].map(i => (
          <div key={"pg" + i} style={{ position: "absolute", left: 26 + i * 48, bottom: -28,
            width: 28, height: 38, borderRadius: 4, background: dkh(BRASS, 0.40) }} />
        ))}
        <div style={{ position: "absolute", left: 52, top: 34, width: 90, height: 56, borderRadius: 7,
          background: dkh(BRASS, 0.30), display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <span style={{ ...mono(32, 900), color: "#F2E4C2" }}>3</span>
        </div>
      </div>
      <Ring x={598} y={432} f={f} at={Bf} c={GOLD} s={1.0} z={68} />
      <Puff x={598} y={438} f={f} at={Bf} c="#CFC4AE" n={9} s={0.9} z={66} />

      <Hero f={f} x={812} y={716} size={222} z={56} act={3} ph={2.6}
        gaze={f < Bf ? -0.9 : 0.1} shock={seated ? E(f, Bf, Bf + 8, 0, 1, OUT) * 0.7 : 0}
        flip costume={{ prof: 1 }} />
      <Contact x={742} y={712} w={146} z={19} o={0.42} />
      <Stanchion side="l" c="#14171E" w={66} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S8 · THE PULPIT — 42f · THE VILLAIN ARRIVES.
   VO: "where you assign an AI critic."
   ⛔ HE IS ON A PULPIT, ABOVE AND APART FROM EVERY BENCH. That IS the mechanism
   ("the builder never grades itself"), so it is built into the blocking rather
   than said in a caption.
   ====================================================================== */
export const S8: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pulpit");
  const rise = E(f, 2, 16, 300, 0, BACK);
  const raise = E(f, 18, 26, 0, 1, OUT);
  const red = E(f, 24, 34, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.112]} vig={0.62} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.328} rakeX={RAKE_X0[v]} rakeRate={4.96 * RAKE_K[v]}
        lamp={{ x: 506, y: 190, r: 330 }} grit={0.9} />
      <ReturnRail y={120} f={f} rate={7.66 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* the run is a dark ledge at the bottom of frame — we are looking UP */}
      <div style={{ position: "absolute", left: -30, top: 690, width: W + 60, height: 120,
        zIndex: 70, background: `linear-gradient(180deg, ${dkh(SLATE, 0.62)} 0%, #07090E 100%)` }} />
      {/* ⭐ THE RED DOES NOT SWITCH, IT SWEEPS. A cut-to-red is one sample's
          worth of delta; a front travelling the full width across the back
          half of the shot repaints continuously and reads as the hall being
          put on notice, which is the beat. */}
      <div style={{ position: "absolute", left: 0, top: 640, width: W * E(f, 20, 40, 0, 1, IO),
        height: 170, zIndex: 71, background: `linear-gradient(180deg, ${hexa(RED, 0.30)} 0%, ${hexa(RED, 0.05)} 100%)` }} />
      <div style={{ position: "absolute", left: W * E(f, 20, 40, 0, 1, IO) - 60, top: 640,
        width: 62, height: 170, zIndex: 72,
        background: `linear-gradient(90deg, ${hexa(RED, 0)} 0%, ${hexa(RED, 0.52)} 100%)` }} />
      {[120, 330, 540, 750, 940].map((x, i) => (
        <div key={"rl" + i} style={{ position: "absolute", left: x - 32, top: 676, width: 64,
          height: 12, zIndex: 73, borderRadius: 3,
          background: lerpHex("#2A2634", RED, E(f, 20 + i * 4, 28 + i * 4, 0, 1, OUT)) }} />
      ))}

      <div style={{ position: "absolute", inset: 0, zIndex: 40, transform: `translateY(${rise}px)` }}>
        {/* AND THE BOX HAS TO SIT WHERE A 230px HERO FITS ABOVE IT. h=330 put
            the box floor at y 228, so a hero standing on it had his head at
            y -16 and the villain of the reel was cropped out of his own
            entrance. And widening the box to s=1.72 (so it is wider than the
            226px hero standing in it, rather than narrower) moved its FLOOR back
            up, which put him 163px below it again. The floor is
            `y - h*s + 82*s`, so h=170 at y=560 lands it at 409 and his head at
            187: inside the box, inside the panel, on a low angle. */}
        <Pulpit x={506} y={560} h={170} s={1.72} z={40} c="#3A3448" lit={red} f={f} />
        {/* the critic himself, big and stern, standing IN the box.
            HIS FEET GO ON THE BOX FLOOR, NOT THE COLUMN. Measured: the box top
            is y 520 - 330*1.18 = 131 and it is 82*1.18 = 97 tall, so its floor
            is y 409 - v1 put him at 344, well below it, and he read as
            floating in front of a post rather than standing in a pulpit. */}
        <Hero f={f} x={506} y={413} size={226} z={58} act={3} ph={0.2}
          stern={0.4 + red * 0.6} gaze={-0.3} drive={raise * 0.18} reach={-24}
          costume={{ prof: 1 }} />
        <Paddle x={672} y={276} rot={-96 + raise * 96} face="bad" s={1.32} z={66} f={f} />
        <Forearm x0={armX(506, 226)} y0={armY(413, 226)}
          x1={654} y1={346 - raise * 34} w={21} z={62} />
      </div>
      <Ring x={506} y={648} f={f} at={16} c={VIOLET} s={1.3} z={44} />
      <Puff x={506} y={654} f={f} at={16} c="#8B72B0" n={11} s={1.2} z={42} />

      <Stanchion side="l" c="#221C30" w={70} z={90} />
      <Stanchion side="r" c="#221C30" w={58} z={89} />
    </Scene>
  );
};

/* =========================================================================
   S9 · THE RUN — 65f · ⭐ DENSITY PEAK 2. THE LOOP, made literal.
   VO: "The agents loop and refine the code automatically"
   ⛔ OVERLAPPING ACTION ON EVERY CARRIAGE MOVE (§13): the hoist leads, the
   carriage eases, the load lags on the carriage's own velocity and rings out.
   ⭐ THE RETURN RAIL IS A FULL-WIDTH HIGH-CONTRAST TRAVELLING BAND — §1's
   single highest-value per-scene shape — and it alternates light AND shadow.
   ====================================================================== */
export const S9: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("run");
  /* three laps, each faster and each build bigger */
  /* THE BUILD WAS INVISIBLE. At s 0.72 and lvl 1-3 it measured 140x66 against a
     dark teal deck - under the 40px short-side floor once the audit downsamples
     1012->240, and unreadable to a person too. It now runs lvl 2-4 (so its
     windows are LIT, which is where its value contrast against the deck comes
     from) at s 1.12, i.e. 214x287. The thing the whole scene is about is now the
     biggest moving object in it. */
  const laps = [{ a: 0, b: 20, lvl: 2 }, { a: 22, b: 40, lvl: 3 }, { a: 42, b: 58, lvl: 4 }];
  const lap = laps.filter(L => f >= L.a).slice(-1)[0] ?? laps[0];
  const li = laps.indexOf(lap);
  /* the outbound run along the floor */
  const runK = E(f, lap.a, lap.a + 11, 0, 1, IO);
  const slamAt = lap.a + 12;
  const slammed = f >= slamAt;
  /* the return along the rail — the carriage, with its trailing load */
  const back = (g: number) => E(g, slamAt + 2, lap.b, 0, 1, IO);
  const bk = back(f);
  const bvel = (back(f + 1) - back(f - 1)) * 0.5;
  const bring = f > lap.b ? Math.sin((f - lap.b) * 0.62) * Math.exp(-(f - lap.b) / 6.5) * 26 : 0;
  const swing = -bvel * 1100 + bring;
  const rejects = laps.filter(L => f >= L.a + 12).length;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.082]} vig={0.50} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={4} kind="bay"
        rake={0.46} rakeX={RAKE_X0[v]} rakeRate={8.43 * RAKE_K[v]}
        lamp={{ x: 506, y: 250, r: 380 }} grit={1.5} />
      {/* ⭐ THE LOOP OVERHEAD, running the whole span, all 65 frames */}
      <ReturnRail y={158} f={f} rate={8.45 * RAKE_K[v]} z={34} c={STEEL} />

      {/* two pulpits over the run, both red, both undefeated */}
      <Pulpit x={318} y={470} h={252} s={0.90} z={40} c="#3A3448" lit={1} f={f} />
      <Pulpit x={742} y={470} h={252} s={0.90} z={40} c="#3A3448" lit={1} f={f} />
      <Hero f={f} x={318} y={318} size={168} z={44} act={3} ph={1.1} stern={0.9}
        costume={{ prof: 1 }} />
      <Hero f={f} x={742} y={318} size={168} z={44} act={3} ph={2.3} stern={0.9}
        drive={slammed ? -E(f, slamAt, slamAt + 5, 0, 1, IN_Q) * 0.2 : 0} reach={30}
        costume={{ stern: 1 }} />
      <Paddle x={640} y={252} rot={slammed ? E(f, slamAt, slamAt + 5, -74, 16, IN_Q) : -74}
        face="bad" s={0.92} z={48} f={f} />

      {/* the run's deck */}
      <div style={{ position: "absolute", left: -30, top: 620, width: W + 60, height: 30, zIndex: 30,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.10)} 0%, ${dkh(SLATE, 0.58)} 100%)` }} />
      {Array.from({ length: 18 }, (_, i) => (
        <div key={"sl" + i} style={{ position: "absolute", left: i * 62 - (f * 2.2) % 62, top: 620,
          width: 8, height: 30, zIndex: 31, background: hexa("#050A0C", 0.44) }} />
      ))}

      {/* THE BUILD on its outbound run — travelling right into the paddle */}
      {!slammed && (
        <div style={{ position: "absolute", inset: 0, zIndex: 56 }}>
          <BuildRig x={186 + runK * 430} y={624} lvl={lap.lvl} f={f} s={1.12} z={56}
            shake={runK > 0.9 ? 3 : 0} />
        </div>
      )}
      {/* punted UP onto the rail, then carried back LEFT overhead */}
      {slammed && bk < 1 && (
        <Carriage x={866 - bk * 780} y={168} swing={swing} s={1.0} z={58} c={BRASS}>
          <BuildRig x={60} y={150} lvl={lap.lvl} f={f} s={0.52} z={58} />
        </Carriage>
      )}
      <Ring x={640} y={560} f={f} at={slamAt} c={RED} s={1.2} z={60} />
      <Puff x={640} y={572} f={f} at={slamAt} c="#8E5648" n={12} s={1.1} z={58} up={54} />

      {/* the crew swarming the drop point — the job with an object */}
      {[112, 196, 280].map((x, i) => (
        <Crew key={"sw" + i} f={f} x={x} y={706} i={i + 1} size={126} z={52} at={i * 3} loop={1} />
      ))}
      <Belt x={-30} y={730} w={W + 60} f={f} z={50} rate={5.0 * RAKE_K[v]} c={SLATE} />

      <RejectCounter x={44} y={132} n={rejects} pass={false} f={f}
        at={laps[Math.max(0, rejects - 1)].a + 12} s={1.05} z={88} />
      <Stanchion side="r" c="#152026" w={62} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S10 · THE BAR — 78f · ⭐ THE PEAK. The villain is beaten exactly once.
   VO: "until the critic is amazed by the result."
   ⭐ A REWARD BEAT HAS TO RESOLVE SOMEWHERE (§18). Four things fire together:
   the paddle FLIPS to its other face, the bar floods gold along its OWN length,
   the counter turns over to PASS, and the crew erupts.
   ⛔ THE GOLD IS CONTAINED TO THE BAR AND ITS CONE. Never a full-frame plate —
   `feedback_no_flashing_transitions` is standing, and reel 115 broke it.
   ====================================================================== */
export const S10: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bar");
  const arrive = E(f, 2, 22, -520, 0, OUT);
  const raise = E(f, 26, 34, 0, 1, OUT);           /* the expected REJECT swing */
  const flipAt = 40;
  const flipped = f >= flipAt;
  const flip = E(f, flipAt, flipAt + 7, 0, 1, BACK);
  const drop = E(f, flipAt + 14, flipAt + 26, 0, 1, IN_Q);
  const barOn = E(f, flipAt + 4, flipAt + 18, 0.08, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.058]} vig={0.46} glow={hexa(p.key, 0.26)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={4} kind="bay"
        rake={0.20 + barOn * 0.14} rakeX={RAKE_X0[v]} rakeRate={5.95 * RAKE_K[v]}
        lamp={{ x: 640, y: 250, r: 400 }} grit={1.2} />
      <ReturnRail y={122} f={f} rate={5.28 * RAKE_K[v]} z={32} c={STEEL} hangers={false} />

      {/* ⭐ THE HERO ARTIFACT — the bar, floodlit along its own length only */}
      <QualityBar y={274} f={f} on={barOn} z={38} x0={92} x1={922} label="THE BAR" />

      {/* the build arrives a final time, cresting ABOVE the bar line */}
      <div style={{ position: "absolute", inset: 0, zIndex: 54 }}>
        {/* THE PAYOFF IS THE BUILD CRESTING THE BAR, AND AT s 1.06 IT TOPPED OUT
            AT y 319 UNDER A BAR AT y 274 - i.e. the one thing the scene exists
            to show did not happen on screen. At s 1.26 a five-tier build is
            403px tall on a base at y 690, so its crown clears the bar line by
            ~62px and the notch is visibly passed. Measured against the panel,
            not estimated. */}
        <BuildRig x={430 + arrive} y={690} lvl={flipped ? 5 : 4} f={f} s={1.26} z={54}
          stamp={flipped ? R.stamps.done : undefined} stampAt={flipAt + 6}
          shake={f > 18 && f < 26 ? 3 : 0} />
      </div>
      <Ring x={430} y={690} f={f} at={22} c={GOLD} s={1.5} z={58} />
      <Puff x={430} y={698} f={f} at={22} c="#C6A882" n={13} s={1.3} z={52} up={40} />

      {/* the pulpit, and the flip */}
      <Pulpit x={824} y={556} h={300} s={1.02} z={44} c="#3A3448"
        lit={flipped ? 0 : 1} f={f} />
      <Hero f={f} x={824} y={392} size={228} z={58} act={3} ph={0.7}
        stern={flipped ? 0 : 0.9}
        shock={flipped ? E(f, flipAt, flipAt + 9, 0, 1, OUT) * (1 - drop) : 0}
        cheer={flipped ? drop : 0} gaze={-0.4}
        drive={raise * 0.14 - drop * 0.1} reach={-30} costume={{ prof: 1 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 66,
        transform: `translateY(${drop * 300}px) rotate(${drop * 64}deg)`, opacity: 1 - drop * 0.1,
        transformOrigin: "82% 30%" }}>
        <Paddle x={952} y={260} rot={-92 + raise * 88} face={flipped ? "good" : "bad"}
          s={1.02} z={66} f={f} />
      </div>
      <Forearm x0={armX(824, 228)} y0={armY(392, 228)}
        x1={944} y1={296 - raise * 32} w={21} z={62} />
      {/* the stars burst from the crest, not from the whole frame */}
      {flipped && Array.from({ length: 12 }, (_, i) => {
        const k = E(f, flipAt + 2, flipAt + 26, 0, 1, OUT);
        const a = (i / 12) * Math.PI * 2;
        return (
          <div key={"sb" + i} style={{ position: "absolute",
            left: 430 + Math.cos(a) * 250 * k - 11, top: 300 + Math.sin(a) * 170 * k - 11,
            width: 22, height: 22, zIndex: 70, borderRadius: 4, background: GOLD,
            opacity: 1 - k, transform: `rotate(${k * 220}deg)` }} />
        );
      })}

      {/* ⭐ THE PAYOFF CELEBRATES. After the flip the build's own windows light
          in a fast cascade up its full height, and the hall's gold sweeps across
          the floor behind the crowd. ⛔ Both are CONTAINED — the cascade is on
          the build, the wash is a floor gradient — because a full-frame
          near-white plate is the one motion lever this house has banned in
          writing, and reel 115 reached for it anyway. */}
      {flipped && Array.from({ length: 6 }, (_, r) => {
        const k = E(f, flipAt + 2 + r * 4, flipAt + 10 + r * 4, 0, 1, OUT);
        if (k <= 0.01) return null;
        return (
          <div key={"bw" + r} style={{ position: "absolute", left: 430 - 132, zIndex: 56,
            top: 664 - (r + 1) * 84, width: 264 * k, height: 68,
            background: `linear-gradient(90deg, ${hexa(GOLD, 0.50)} 0%, ${hexa(GOLD, 0.12)} 100%)` }} />
        );
      })}
      <div style={{ position: "absolute", left: 0, top: 600,
        width: W * E(f, flipAt + 4, flipAt + 26, 0, 1, IO), height: 192, zIndex: 30,
        background: `linear-gradient(180deg, ${hexa(GOLD, 0.30)} 0%, ${hexa(GOLD, 0.04)} 100%)` }} />
      {/* the crew below erupts */}
      {[126, 254, 620, 726].map((x, i) => (
        <Crew key={"ec" + i} f={f} x={x} y={760} i={i + 2} size={132} z={50} at={4 + i * 3}
          loop={flipped ? 2 : 3} cheer={flipped ? 1 : 0} />
      ))}
      <RejectCounter x={44} y={132} n={3} pass={flipped} f={f} at={flipAt} s={1.05} z={88} />
      <Stanchion side="l" c="#2A2416" w={62} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S11 · THE DRUM ROOM — 35f · THE COST.
   VO: "Now this eats up tokens fast,"
   ⛔ NO CURRENCY ANYWHERE (honesty ledger 1). Real runs are reported at $1,200
   and $1,700 but they are two DIFFERENT projects and the VO names no figure —
   a number here would read as the cost of the build we just watched. The shot
   draws the DRAIN: a needle dropping in steps and a glass emptying.
   ====================================================================== */
export const S11: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("drum");
  const hits = [4, 15, 26];
  const level = 0.92 - hits.filter(h => f >= h).length * 0.27;
  const last = hits.filter(h => f >= h).slice(-1)[0] ?? -99;
  const flare = f - last >= 0 && f - last < 9 ? 1 - (f - last) / 9 : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.050]} vig={0.70} glow={hexa(p.key, 0.26)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="duct" bands={2} kind="plant"
        rake={0.246} rakeX={RAKE_X0[v]} rakeRate={5.45 * RAKE_K[v]}
        lamp={{ x: 250, y: 470, r: 300 }} grit={1.1} />
      <ReturnRail y={120} f={f} rate={8.18 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* the run's underside overhead — the laps thump past above us */}
      <div style={{ position: "absolute", left: -30, top: 96, width: W + 60, height: 46, zIndex: 30,
        background: `linear-gradient(180deg, #0A0503 0%, ${dkh(OXIDE, 0.62)} 100%)` }} />
      {hits.map((h, i) => (
        <div key={"th" + i} style={{ position: "absolute", top: 142, height: 8, width: 180,
          zIndex: 31, left: E(f, h - 6, h + 6, -220, W + 60, LIN),
          background: hexa(GOLD, 0.44) }} />
      ))}

      {/* the furnace mouth — the only light in the room */}
      <div style={{ position: "absolute", left: 96, top: 452, width: 232, height: 200, zIndex: 34,
        borderRadius: "10px 10px 4px 4px", background: "#160A05",
        border: `9px solid ${dkh(OXIDE, 0.60)}` }}>
        <div style={{ position: "absolute", inset: 14, borderRadius: 6,
          background: `linear-gradient(180deg, ${hexa("#FFD08A", 0.42 + flare * 0.40)} 0%, ${hexa(EMBER, 0.66 + flare * 0.30)} 46%, ${hexa("#8C2A0C", 0.80)} 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"fl" + i} style={{ position: "absolute", bottom: 16,
            left: 24 + i * 26, width: 16,
            height: 34 + Math.abs(Math.sin(f / 4 + i * 1.7)) * (36 + flare * 40),
            borderRadius: "8px 8px 3px 3px", background: hexa("#FFC46A", 0.60) }} />
        ))}
      </div>
      <Pool x={212} y={636} w={620} c={EMBER} o={0.30 + flare * 0.20} z={19} hh={210} />

      {/* the drum — the needle drops in three discrete notches */}
      <TokenDrum x={690} y={694} level={level} f={f} s={1.06} z={48} hit={last} />

      {/* the stoker, shovelling — his body changes shape */}
      <Hero f={f} x={410} y={708} size={222} z={56} act={1} ph={0.5}
        strain={0.34 + flare * 0.44} drive={flare * 0.42} reach={-96} flip
        costume={{ beard: 1 }} />
      <Forearm x0={armX(410, 222, true)} y0={armY(708, 222)}
        x1={274} y1={580 + flare * 44} w={20} z={60} />
      <Contact x={336} y={704} w={150} z={19} o={0.46} />
      <Steam x={410} y={498} f={f} at={0} n={6} s={0.9} z={62} rate={1.5} c="#E8CBB0" />

      <Stanchion side="r" c="#2A1408" w={64} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S12 · ONE BENCH — 71f · THE ADVICE.
   VO: "so you should build your minimum viable product first"
   ⛔ N DISCRETE POPS, SPREAD ACROSS THE FULL DURATION (§1 / §9) — four parts,
   each with a squash and a ring, at f6 / f22 / f38 / f54 of 71.
   ⭐ AND IT IS A REAL LITTLE PRODUCT, not a crate: a header, two rows, a button.
   ====================================================================== */
export const S12: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  const parts = [6, 22, 38, 54];
  const built = parts.filter(a => f >= a).length;
  const stampAt = 62;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.056]} vig={0.66} glow={hexa(p.key, 0.20)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="none" bands={2} kind="shutter"
        rake={0.205} rakeX={RAKE_X0[v]} rakeRate={3.47 * RAKE_K[v]}
        lamp={{ x: 470, y: 380, r: 280 }} grit={0.6} />
      <ReturnRail y={120} f={f} rate={5.81 * RAKE_K[v]} z={26} c={STEEL} hangers={false} />
      {/* one warm bench lamp with a hard falloff — the dimmest scene after S4 */}
      <div style={{ position: "absolute", left: 400, top: 176, width: 148, height: 20, zIndex: 32,
        borderRadius: `10px 10px 0 0`, background: "#4A3A28" }} />
      <div style={{ position: "absolute", left: 300, top: 196, width: 348, height: 360, zIndex: 24,
        background: `linear-gradient(180deg, ${hexa("#F2A24A", 0.30)} 0%, ${hexa("#F2A24A", 0)} 100%)`,
        clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)" }} />
      <Pool x={474} y={556} w={480} c={p.key} o={0.30} z={18} hh={140} />

      {/* MODEST IS NOT THE SAME AS EMPTY. On the contact sheet this scene was
          one small window on a large blank wall - the quiet beat before S13, but
          with nothing in it to look at. A parts rack behind, a tray of stock on
          the bench and three earlier attempts on a shelf give the room a reason
          to exist without competing with the MVP for attention: they are all
          low-value furniture, and the one bright object in the frame is still
          the thing being built. */}
      <div style={{ position: "absolute", left: 138, top: 342, width: 214, height: 232,
        zIndex: 30, borderRadius: 4, background: `linear-gradient(96deg, ${mxh("#4A3A28", 0.10)} 0%, ${dkh("#4A3A28", 0.36)} 100%)`,
        border: `4px solid ${dkh("#4A3A28", 0.52)}` }}>
        {[0, 1, 2].map(r => (
          <div key={"sh" + r} style={{ position: "absolute", left: 8, right: 8, top: 14 + r * 72,
            height: 58, background: dkh("#4A3A28", 0.24), borderTop: `3px solid ${mxh("#4A3A28", 0.14)}` }}>
            {[0, 1, 2].map(c2 => (
              <div key={"pt" + c2} style={{ position: "absolute", left: 10 + c2 * 62, top: 12,
                width: 46, height: 34, borderRadius: 3,
                background: [dkh(TEAL, 0.30), dkh(SLATE, 0.16), dkh(GOLD, 0.42)][(r + c2) % 3] }} />
            ))}
          </div>
        ))}
      </div>
      {/* three earlier attempts, on the shelf over the bench - small, finished,
          unremarkable. The point of the scene, standing in the background. */}
      {[0, 1, 2].map(i => (
        <div key={"pa" + i} style={{ position: "absolute", left: 604 + i * 74, top: 470,
          width: 60, height: 46, zIndex: 34, borderRadius: 4, background: "#D8D0BE",
          border: "3px solid #8E846E" }}>
          <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: 11,
            background: dkh(CLAY, 0.20) }} />
          <div style={{ position: "absolute", left: 4, top: 21, width: 32, height: 5,
            background: "#A8A08C" }} />
        </div>
      ))}
      <div style={{ position: "absolute", left: 590, top: 516, width: 234, height: 11,
        zIndex: 33, background: dkh("#4A3A28", 0.40) }} />
      <Bench x={474} y={664} w={392} s={1.34} z={40} />
      {/* a tray of stock on the bench top - what the parts are coming FROM */}
      <div style={{ position: "absolute", left: 292, top: 574, width: 108, height: 34, zIndex: 46,
        borderRadius: 3, background: dkh(SLATE, 0.34), border: `3px solid ${dkh(SLATE, 0.52)}` }}>
        {[0, 1, 2, 3].map(i => (
          <div key={"sk" + i} style={{ position: "absolute", left: 6 + i * 24, top: 6, width: 18,
            height: 20, borderRadius: 2, background: [CREAMB, TEAL, GOLD, GREEN][i], opacity: 0.82 }} />
        ))}
      </div>

      {/* THE MVP — four parts, assembled one at a time */}
      <div style={{ position: "absolute", left: 322, top: 362, width: 306, height: 228, zIndex: 54,
        borderRadius: 8, background: built > 0 ? "#F4F0E6" : "transparent",
        border: built > 0 ? "5px solid #2A241C" : "none", overflow: "hidden",
        transform: `scale(${squash(f, parts[0], 0.22, 3, 12)})` }}>
        {built > 1 && <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 54,
          background: CLAY, transform: `scale(${squash(f, parts[1], 0.20, 3, 11)})`,
          display: "flex", alignItems: "center", paddingLeft: 12, gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 18, height: 18, objectFit: "contain" }} /></div>
          <div style={{ width: 78, height: 9, borderRadius: 5, background: hexa("#FFFFFF", 0.80) }} />
        </div>}
        {built > 2 && [0, 1].map(i => (
          <div key={"mr" + i} style={{ position: "absolute", left: 18, top: 74 + i * 50,
            right: 18, height: 40, borderRadius: 6, background: "#E4DDCC",
            border: "3px solid #C6BCA6",
            transform: `scale(${squash(f, parts[2] + i * 3, 0.18, 3, 10)})` }}>
            <div style={{ position: "absolute", left: 8, top: 9, width: 88 - i * 24, height: 8,
              borderRadius: 4, background: "#9E9682" }} />
          </div>
        ))}
        {built > 3 && <div style={{ position: "absolute", left: 18, bottom: 16, width: 128,
          height: 40, borderRadius: 8, background: GREEN,
          transform: `scale(${squash(f, parts[3], 0.22, 3, 12)})`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 52, height: 8, borderRadius: 4, background: hexa("#FFFFFF", 0.86) }} />
        </div>}
      </div>
      {parts.map((a, i) => (
        <React.Fragment key={"mp" + i}>
          <Ring x={474} y={490} f={f} at={a} c={GOLD} s={0.5 + i * 0.1} z={58} />
          <Puff x={474} y={498} f={f} at={a} c="#C6A882" n={6} s={0.6} z={52} />
        </React.Fragment>
      ))}
      {f >= stampAt && (
        <div style={{ position: "absolute", left: 400, top: 452, width: 152, height: 52, zIndex: 66,
          borderRadius: 7, background: CREAMB, border: "5px solid #8E846E", boxShadow: SH_D,
          transform: `rotate(${-10 + Math.sin((f - stampAt) / 3.1) * Math.exp(-(f - stampAt) / 12) * 13}deg) scale(${squash(f, stampAt, 0.3, 3, 12)})`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(28, 900), color: "#3A3428", letterSpacing: "0.12em" }}>
            {R.stamps.mvp}</span>
        </div>
      )}

      <Hero f={f} x={766} y={706} size={230} z={56} act={1} ph={1.4}
        drive={parts.reduce((m, a) => Math.max(m, E(f, a - 4, a, 0, 1, IN_Q) - E(f, a, a + 8, 0, 1, OUT)), 0) * 0.5}
        reach={-104} strain={0.30} flip costume={{ constr: 1 }} />
      <Contact x={696} y={702} w={148} z={19} o={0.44} />
      <Stanchion side="l" c="#33281C" w={68} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S13 · THE HALL AT SPEED — 77f · CLIMAX OF SCALE.
   VO: "and then unleash the Gauntlet Loop to polish the final build."
   ⭐ THE BRIGHTEST, FULLEST FRAME AFTER THE HOOK. Everything runs at once and
   the MVP goes through three fast laps, arriving POLISHED under the bar.
   ⛔ AN ACTION IS A DISTANCE: the knife switch travels 62deg with the hero's
   whole body behind it.
   ====================================================================== */
export const S13: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const thrown = E(f, 4, 12, 0, 1, IN_Q);
  const spin = E(f, 10, 30, 0, 1, OUT);
  const laps = [16, 34, 52];
  const lvl = 2 + laps.filter(a => f >= a).length;
  const land = E(f, 58, 68, 0, 1, BACK);
  const runX = 96 + E(f, 12, 60, 0, 1, IO) * 340;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.086]} vig={0.44} glow={hexa(p.key, 0.28)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={5} kind="bay"
        rake={0.16 + spin * 0.22} rakeX={RAKE_X0[v]} rakeRate={(2.2 + spin * 5.0) * RAKE_K[v]}
        lamp={{ x: 506, y: 240, r: 420 }} grit={1.8} />
      <ReturnRail y={134} f={f} rate={(2.0 + spin * 9.0) * RAKE_K[v]} z={34} c={STEEL} />
      <QualityBar y={252} f={f} on={0.18 + land * 0.82} z={38} x0={92} x1={922} />

      {/* every pulpit lights */}
      {[186, 388, 606, 830].map((x, i) => (
        <React.Fragment key={"pp" + i}>
          <Pulpit x={x} y={512} h={230} s={0.80} z={40} c="#3A3448"
            lit={E(f, 12 + i * 4, 20 + i * 4, 0, 1, OUT)} f={f} />
          <Hero f={f} x={x} y={392} size={132} z={44} act={3} ph={i * 1.3} stern={0.7}
            costume={{ prof: 1 }} />
        </React.Fragment>
      ))}

      {/* the run's deck and the build growing through three laps */}
      <div style={{ position: "absolute", left: -30, top: 630, width: W + 60, height: 28, zIndex: 30,
        background: `linear-gradient(180deg, ${mxh(SLATE, 0.12)} 0%, ${dkh(SLATE, 0.56)} 100%)` }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 54 }}>
        <BuildRig x={runX} y={634 - land * 6} lvl={lvl} f={f} s={0.80 + land * 0.16} z={54}
          stamp={land > 0.5 ? R.stamps.done : undefined} stampAt={62}
          shake={f > 12 && f < 58 ? 2.4 : 0} />
      </div>
      {laps.map((a, i) => (
        <React.Fragment key={"lp" + i}>
          <Ring x={runX} y={628} f={f} at={a} c={GOLD} s={0.9 + i * 0.2} z={58} />
          <Puff x={runX} y={634} f={f} at={a} c="#C6A882" n={9} s={0.9} z={52} up={34} />
        </React.Fragment>
      ))}
      <Ring x={436} y={620} f={f} at={58} c={GOLD} s={1.7} z={60} />

      {/* the hero throws the switch, whole body behind it */}
      <KnifeSwitch x={856} y={568} k={thrown} s={1.06} z={60} />
      <Hero f={f} x={660} y={706} size={230} z={56} act={0} ph={1.9}
        drive={thrown * 0.6} reach={72} strain={thrown * 0.66}
        cheer={land} costume={{ constr: 1 }} />
      <Forearm x0={armX(660, 230)} y0={armY(706, 230)}
        x1={800} y1={556 - thrown * 46} w={21} z={62} />
      <Contact x={590} y={702} w={150} z={19} o={0.40} />

      {/* the crew swarms */}
      {[126, 268, 560, 686].map((x, i) => (
        <Crew key={"sw" + i} f={f} x={x} y={744} i={i + 4} size={128} z={50} at={10 + i * 3}
          loop={i % 2 ? 1 : 2} cheer={land} />
      ))}
      <Belt x={-30} y={766} w={W + 60} f={f} z={48} rate={(3.0 + spin * 4.0) * RAKE_K[v]} c={SLATE} />
      <Stanchion side="r" c="#1E262C" w={62} z={90} />
    </Scene>
  );
};

/* =========================================================================
   S14 · THE FRONT — 89f · CTA.
   VO: "I put this all in a free setup guide, just comment the word LOOP."
   ⭐ A JOB WITH AN OBJECT MOVING BETWEEN THEM: the guide is printed and passed
   hand to hand through the crew, landing on a plate that flips to the keyword.
   ⛔ THE KEYWORD LANDS ON ITS SPOKEN WORD: "LOOP." starts at 33.44s = root
   f1003 = local f70 of this scene, and the reel HARD-CUTS on it.
   ====================================================================== */
export const S14: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("intake");
  const hands = [16, 30, 44, 58];
  const stops = [206, 372, 540, 706, 856];
  const seg = hands.filter(a => f >= a).length;
  const t = seg < hands.length
    ? E(f, hands[seg], hands[seg] + 12, 0, 1, IO)
    : (f >= hands[hands.length - 1] ? 1 : 0);
  const gx = stops[Math.min(seg, stops.length - 1)] +
    (seg < stops.length - 1 ? (stops[seg + 1] - stops[seg]) * t : 0);
  const gy = 470 - Math.sin(Math.min(1, t) * Math.PI) * 62;
  const KEY = 70;
  const flipped = f >= KEY;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.052]} vig={0.42} glow={hexa(p.key, 0.24)}>
      <Hall p={p} f={f} dx={PAR_X[v]} overhead="truss" bands={3} kind="bay"
        rake={0.41} rakeX={RAKE_X0[v]} rakeRate={4.96 * RAKE_K[v]}
        lamp={{ x: 506, y: 250, r: 380 }} />
      <ReturnRail y={120} f={f} rate={4.22 * RAKE_K[v]} z={30} c={STEEL} hangers={false} />
      {/* the finished build, lit behind */}
      <div style={{ position: "absolute", inset: 0, zIndex: 34, opacity: 0.9 }}>
        <BuildRig x={506} y={470} lvl={5} f={f} s={0.66} z={34} />
      </div>
      <QualityBar y={186} f={f} on={1} z={32} x0={230} x1={790} />

      {/* the press that prints the guide */}
      <div style={{ position: "absolute", left: 96, top: 396, width: 176, height: 168, zIndex: 44,
        borderRadius: 8, background: `linear-gradient(174deg, ${mxh(SLATE, 0.14)} 0%, ${dkh(SLATE, 0.54)} 100%)`,
        border: `5px solid ${dkh(SLATE, 0.66)}` }}>
        <div style={{ position: "absolute", left: 16, top: 20, right: 16, height: 62, borderRadius: 4,
          background: "#171B22" }} />
        <div style={{ position: "absolute", left: 24, top: 96, right: 24, height: 14, borderRadius: 3,
          background: dkh(BRASS, 0.24) }} />
        <div style={{ position: "absolute", left: 40, bottom: -10, width: 96, height: 22,
          borderRadius: 3, background: dkh(SLATE, 0.40) }} />
      </div>

      {/* THE GUIDE travelling hand to hand */}
      <div style={{ position: "absolute", left: gx - 86, top: gy, width: 172, height: 124, zIndex: 66,
        borderRadius: 8, background: CREAMB, border: "6px solid #2A241C", boxShadow: SH_D,
        transform: `rotate(${Math.sin(f / 5) * 5}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 36,
          background: CLAY, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "#FFFFFF",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile("claude_logo.png")}
              style={{ width: 20, height: 20, objectFit: "contain" }} /></div>
        </div>
        {[0, 1, 2, 3].map(i => (
          <div key={"gl" + i} style={{ position: "absolute", left: 16, top: 50 + i * 18,
            width: 128 - i * 26, height: 10, borderRadius: 5, background: "#A8A08C" }} />
        ))}
      </div>

      {/* ⛔ TWELVE DEAD FRAMES BETWEEN THE LAST HAND-OFF AND THE FLIP. The press
          now keeps printing: a second and third guide come off it and start
          down the line behind the first, so the shot is still delivering
          something right up to the keyword. */}
      {[34, 52].map((at, i) => {
        const k = E(f, at, at + 30, 0, 1, IO);
        if (k <= 0) return null;
        return (
          <div key={"g2" + i} style={{ position: "absolute", left: 150 + k * 300, top: 508 - i * 26,
            width: 132, height: 96, zIndex: 60, borderRadius: 7, opacity: 0.92,
            background: CREAMB, border: "5px solid #2A241C",
            transform: `rotate(${Math.sin(f / 6 + i) * 6}deg)` }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 28,
              background: CLAY }} />
            {[0, 1, 2].map(j => (
              <div key={"g2l" + j} style={{ position: "absolute", left: 12, top: 40 + j * 15,
                width: 96 - j * 22, height: 8, borderRadius: 4, background: "#A8A08C" }} />
            ))}
          </div>
        );
      })}
      {/* the crew, in two ranks, facing camera */}
      {stops.slice(0, 4).map((x, i) => (
        <Crew key={"fc" + i} f={f} x={x} y={716} i={i} size={146} z={50} at={2 + i * 3}
          loop={seg === i ? 1 : 3} cheer={flipped ? 1 : 0} />
      ))}
      {[300, 470, 640].map((x, i) => (
        <Crew key={"bc" + i} f={f} x={x} y={606} i={i + 7} size={104} z={38} at={6 + i * 3}
          loop={(i + 1) % 4} tint="#A85434" />
      ))}

      {/* the keyword plate — flips ON the spoken word */}
      {/* ⛔ THE KEYWORD GOES IN THE MIDDLE. It was parked at x=806 against the
          right edge, which is the one place a viewer is not looking when the
          word is spoken. Centred and larger: this is the last thing on screen
          and the only thing the CTA is asking for. */}
      <div style={{ position: "absolute", left: 356, top: 396, width: 300, height: 156, zIndex: 70,
        borderRadius: 12, boxShadow: SH_D, overflow: "hidden",
        background: flipped ? GOLD : "#20242C",
        border: `6px solid ${flipped ? dkh(GOLD, 0.44) : "#12151A"}`,
        transform: `perspective(500px) rotateX(${flipped ? 0 : 62}deg) scale(${squash(f, KEY, 0.24, 3, 11)})`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(78, 900), letterSpacing: "0.06em",
          color: flipped ? "#241F17" : "#3A404C" }}>LOOP</span>
      </div>
      <Ring x={506} y={476} f={f} at={KEY} c={GOLD} s={1.7} z={72} />
      {flipped && Array.from({ length: 10 }, (_, i) => {
        const k = E(f, KEY, KEY + 20, 0, 1, OUT);
        const a = (i / 10) * Math.PI * 2;
        return (
          <div key={"kb" + i} style={{ position: "absolute", left: 894 + Math.cos(a) * 170 * k - 9,
            top: 484 + Math.sin(a) * 120 * k - 9, width: 18, height: 18, zIndex: 71,
            borderRadius: 4, background: GOLD, opacity: 1 - k }} />
        );
      })}
      <Stanchion side="l" c="#2E271F" w={66} z={90} />
    </Scene>
  );
};
