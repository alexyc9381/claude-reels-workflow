import React from "react";
import { useCurrentFrame, Img, staticFile } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, mono, GY, BAND_Y,
  Scene, Cam, Contact, Ring, Puff, Steam, Sweat, Fall, Pool, Rake, Runner, Motes,
  Hero, Crew, Forearm, asPlace, R, lerpHex, squash,
  CLAY, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, MAG, INDIGO,
} from "./FreeWorld";
import { Room, Jamb, Stack, Overhead } from "./HwSets";
import { Turnstile, Coin, CoinHeap, FareBoard, SubMeter, Shutter, SubDisc, MarkTile } from "./FreeProps";
import { fraunces } from "./fonts";

/* ===========================================================================
   REEL 131 · "FREE" — THE HOOK CANDIDATES.  docs/THE-OPEN.md step 1.

   ⛔ THE FIRST BUILD STEP OF A REEL IS NOT SCENE 0, IT IS N CONCEPTS FOR SCENE
   0. Each of the three below is a genuinely different MECHANISM — one WORD, not
   one costume on one idea, which is the test that stops the same hook shipping
   twice (reel 118):

     `toll`     TOLL      a body works a machine that takes its money and gives
                          back exactly one step
     `meter`    DRAIN     five meters on a wall run whether he uses them or not,
                          and what they run OUT of is him
     `shutters` RATIONING five shutters, and only one can be open at a time

   ⛔ ALL THREE OBEY THE FOUR LAWS OF FRAME 0: bright and saturated, the subject
   in it, recognition without narration, mute-readable. All three are ONE
   dominant object with one supporting element (`feedback_hook_simplicity`), and
   ⛔ NONE OF THEM RESOLVES — a hook that answers its own question at three
   seconds has spent the thing the body is for.

   ⛔ THE FRAME-0 GATES ARE CARRIED BY THE SIGN, NEVER BY THE HERO PROP. A gate
   carried by the wrong object deforms that object (reel 110's barbell went 4.3x
   oversized and pale because it was holding up HOOK_LUMA and HOOK_PLATE on its
   own). Here the hanging tariff board carries both, and the turnstile is free to
   be 366px of brass with air on either side, dark against a lit field.
   ========================================================================= */

export type HookId = "toll" | "meter" | "shutters" | "vending" | "stack" | "wall";
type SP = { v: "house" | "amber" | "steel"; dur: number };

/** the section band that rides each candidate — the header IS half of what is
    being chosen, so it is on every cut of the experiment. */
export const HOOK_BANDS: Record<HookId, { big: string; hot: string }> = {
  toll:     { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
  meter:    { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
  shutters: { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
  vending:  { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
  stack:    { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
  wall:     { big: "5 AI SUBSCRIPTIONS", hot: "ONE FREE PLATFORM" },
};

const PAR_X: Record<string, number> = { house: 0, amber: -46, steel: 40 };
const RAKE_X: Record<string, number> = { house: 0, amber: 96, steel: 172 };
const RAKE_K: Record<string, number> = { house: 1, amber: 1.84, steel: 0.46 };
const RAKE_N: Record<string, number> = { house: 7, amber: 5, steel: 11 };
const PJ_OF: Record<string, number> = { house: 0, amber: 1, steel: 2 };

/* =========================================================================
   HOOK A · `toll` — THE TOLL.        ⭐ PICKED (see ClaudeFree131Reel.PICKED)

   MECHANISM: **TOLL.** A body against a machine. Reel 119 measured PULL — a
   body working against a load — beating two abstract candidates outright, and
   reel 112 measured the same hero in the same set going 8.94 -> 14.09 purely by
   making his BODY change shape. So the hook is not "there are five gates"
   (a state); it is one Claude buying one step at a time.

   THE EVENT, all four parts:
     BEFORE   f0 is settled and already the joke — he is mid-shove, the arm is
              BOWED and has not moved, steam is coming off him, and the coins he
              has already fed are heaped round his feet.
     TRIGGER  f13 he gives up shoving and digs out a coin; f17 it falls 96px and
              lands in the slot.
     TRAVEL   f19-27 the head lamp flips RED -> GREEN, the arm turns 118 degrees
              and he goes through 152px — 0.52 of his own body width, which
              clears §11's one-third floor. Under that it is a state change and
              the eye cannot resolve it at 30fps on a phone.
     ARRIVAL  f27 SLAM. The arm locks on the next spoke, the lamp goes back to
              RED, and it COSTS: recoil, a dust puff, a ring and chips off the
              kerb. Then the fare counter ticks +1.
     ⛔ f48 HE LIFTS THE NEXT COIN. It does not resolve.
   ====================================================================== */
export const HookToll: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("toll");
  const PJ = PJ_OF[v];

  /* ── the beat clock, in root-scene frames. ⛔ Every timed effect below is
        traced against THIS shot's own length before being called done. */
  const SHOVE = 0, GIVE = 13, DROP = 17, REL = 19, LOCK = 27, TICK = 31, NEXT = 48;

  /* the shove that achieves nothing: he strains, the bar BOWS, and it does not
     turn. WEIGHT IS DEFORMATION — a rigid stick reads as someone holding a prop. */
  const shove = f < GIVE ? 0.62 + Math.sin(f / 3.4) * 0.22 : E(f, GIVE, GIVE + 6, 0.7, 0.06, OUT);
  const bow = shove * 7.5;

  /* the arm: locked, then ONE quarter-turn, then locked again on the next spoke */
  const turn = E(f, REL, LOCK, 0, 118, IO);
  /* the lock recoil — nothing in a reel lands and simply stops */
  const ring = f > LOCK ? Math.sin((f - LOCK) * 0.74) * Math.exp(-(f - LOCK) / 5.5) * 7.5 : 0;
  const armRot = -turn - bow * 0.5 + ring;

  const open = f >= REL && f < LOCK ? 1 : 0;

  /* HIS TRAVEL — the distance that makes the action read */
  /* ⛔ HE GOES THROUGH THE GATE, SO HE TRAVELS LEFT. 118px against a 286px
     body is 41% of his own width, which clears §11's one-third floor — under
     that it is a state change and the eye cannot resolve it at 30fps. */
  const walk = -E(f, REL + 1, LOCK + 2, 0, 108, IO);
  const bump = f > LOCK ? Math.abs(Math.sin((f - LOCK) * 0.6)) * Math.exp(-(f - LOCK) / 6) * 24 : 0;
  /* ⭐ AND THE LAST THIRD IS A BODY ACTION, NOT A WAIT. The hook measured 7.89
     with 74% HOLD because after the lock he simply stood there for 21 frames
     while a coin scaled into his hand. He now CROUCHES to the heap (f42-52) and
     RISES with the next fare (f52-60) — the same lesson as reel 112, where the
     hero's own body changing shape moved a scene 8.94 -> 14.09 with the set
     untouched. */
  const crouch = E(f, 42, 52, 0, 1, IO) - E(f, 52, 60, 0, 1, OUT);
  const strain = f < GIVE ? 0.70 + Math.sin(f / 3.4) * 0.18
    : (f > LOCK ? 0.30 + crouch * 0.62 : 0.12);

  /* the coin he feeds: 96px of fall onto a hard land, and it is 54px across so
     it survives the audit's 1012->240 downsample while it travels */
  const coinK = E(f, DROP, DROP + 7, 0, 1, IN_Q);
  const coinY = 470 + coinK * 96;
  const coinShow = f >= DROP - 4 && f < DROP + 8;
  /* and the NEXT one, already in his hand at f48 — the shot does not resolve */
  const nextK = E(f, NEXT, NEXT + 9, 0, 1, OUT);

  const fares = 41 + (f >= TICK ? 1 : 0);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.09} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="column" overhead="gantry"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.2 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tarmac" grit={0.9} lamp={{ x: 420, y: 152, r: 300 }} window={null} />

        {/* ⭐⭐⭐ THE SET IS WORTH MORE THAN THE EFFECTS. v1 put a good gate in a
               beige void and it read as an office: three rounds of hand-added
               movement stalled a comparable reel at 7.68 and rebuilding the SET
               as a dense, on-topic PLACE cleared the bar in one pass. This is a
               toll plaza, so it gets what a toll plaza has — a canopy soffit
               with lamp cans, a far barrier wall, hazard chevrons on the kerb,
               traffic crossing behind it, and a queue rail cropped by the near
               edge in front of the action. */}
        {/* 1 · the canopy soffit — the overhead mass that stops the frame being
               bottom-heavy, and the dark field the bone board reads against */}
        <div style={{ position: "absolute", left: -40, top: 22, width: W + 80, height: 84,
          zIndex: 19, background: `linear-gradient(180deg, ${dkh(SLATE, 0.30)} 0%, ${mxh(SLATE, 0.16)} 100%)` }} />
        {[120, 356, 592, 828].map((lx, i) => (
          <React.Fragment key={"can" + i}>
            <div style={{ position: "absolute", left: lx, top: 106, width: 96, height: 30,
              zIndex: 20, borderRadius: "0 0 24px 24px", background: dkh("#3A3428", 0.06) }} />
            <div style={{ position: "absolute", left: lx + 12, top: 128, width: 72, height: 12,
              zIndex: 21, borderRadius: 6, background: mxh(SODIUM, 0.42) }} />
          </React.Fragment>
        ))}
        {/* the canopy soffit is lighter now that the cream board is gone and the
            frame-0 brightness has to come from the set itself */}
        {/* 2 · TRAFFIC PASSING BEHIND THE PLAZA — the background process, and a
               full-width high-contrast travelling band, the single biggest
               per-scene lever in the measured motion table. ⛔ It is placed so
               the wall CUTS ITS WHEELS OFF: v1 ran it above the barrier and the
               cars read as boxes floating in the sky. */}
        {/* ⛔ THE HOOK MEASURED 6.98 WITH 74% HOLD — it arrived and parked. The
               traffic was there and running at 5.6px/frame, which repaints about
               1% of the panel per sample. Motion is bought through SPEED, and
               two bands at different depths and different rates also give the
               plaza a near and a far, which one band cannot. */}
        <Runner y={372} f={f} z={11} rate={8.8} pitch={228} w={186} h={96}
          c={mxh(CREAMB, 0.16)} c2={dkh(INDIGO, 0.10)} kind="car" rail={false} />
        <Runner y={410} f={f} z={12} rate={-12.4} pitch={268} w={224} h={112}
          c={mxh(SODIUM, 0.02)} c2={dkh("#1A2436", 0)} kind="car" rail={false} />
        {/* 3 · the barrier wall they pass behind, in a colour the bone plaza is
               not, with a hazard chevron capping it */}
        <div style={{ position: "absolute", left: -40, top: 452, width: W + 80, height: 54,
          zIndex: 13, background: `linear-gradient(180deg, ${mxh(TEAL, 0.06)} 0%, ${dkh(TEAL, 0.34)} 100%)` }} />
        <div style={{ position: "absolute", left: -40, top: 452, width: W + 80, height: 20,
          zIndex: 14, overflow: "hidden",
          background: `repeating-linear-gradient(118deg, ${SODIUM} 0 30px, ${dkh(INK, 0)} 30px 60px)` }} />
        {/* 4 · hazard chevrons on the gate's own plinth — saturated paint on a
               bone plaza, which is where the frame's colour comes from */}
        <div style={{ position: "absolute", left: 276, top: GY - 30, width: 248, height: 24,
          zIndex: 56, overflow: "hidden", borderRadius: 3,
          background: `repeating-linear-gradient(118deg, ${SODIUM} 0 26px, ${dkh(INK, 0)} 26px 52px)` }} />

        {/* ⭐ THE SODIUM SHAFT off the gantry lamp onto the gate. It is a SHAPED
               CONE, never a full-frame fill (reel 78 was rejected twice for the
               full-frame version), and it is what puts saturated colour on an
               otherwise bone-and-grey frame: measured, it lifts the panel's
               saturated-pixel share by 9 points on its own. */}
        <div style={{ position: "absolute", left: 214, top: 96, width: 560, height: GY - 96,
          zIndex: 16, opacity: 0.46,
          clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
          background: `linear-gradient(180deg, ${hexa(SODIUM, 0.62)} 0%, ${hexa(SODIUM, 0.05)} 100%)` }} />
        <Pool x={452} y={GY - 46} w={600} c={SODIUM} o={0.34} z={17} />

        {/* ⛔ THE FOUR RECEDING BOOTHS ARE GONE. `feedback_hook_simplicity` is
               explicit that the thing to reduce is IDEAS, not layers, and five
               gates in frame 0 is five objects with no first place. "There are
               five of them" is already carried by the tariff board's numeral and
               its five pips — and by S5 and S10, which are ABOUT the row.
               ⭐ What survives is ONE neighbouring arm cropped by the right
               edge: it says the row goes on, it is a second occluder, and it is
               one element rather than four. */}
        <div style={{ position: "absolute", left: 832, top: GY - 206, width: 180, height: 22,
          zIndex: 26, borderRadius: 11, background: dkh(BRASS, 0.30) }} />
        <div style={{ position: "absolute", left: 886, top: GY - 226, width: 156, height: 214,
          zIndex: 25, borderRadius: 10, background: dkh("#E2DACA", 0.34),
          border: `4px solid ${hexa("#000", 0.30)}` }} />
        <div style={{ position: "absolute", left: 906, top: GY - 288, width: 84, height: 44,
          zIndex: 26, borderRadius: 5, background: mxh("#E0563E", 0.0) }} />
        <div style={{ position: "absolute", left: 892, top: GY - 300, width: 112, height: 14,
          zIndex: 27, borderRadius: 4, background: dkh("#3A342A", 0) }} />

        {/* ⛔⛔ THE TARIFF BOARD IS GONE (Alex, round 3: *"remove the '5 separate
               fares' thing there, that entire rectangle"* / *"I want to see diff
               AI logos there instead"*). It was an 860x214 cream rectangle and it
               was carrying BOTH frame-0 gates, which is why it was that size —
               and a claim plate that big is still a rectangle. What a toll plaza
               actually hangs off its gantry is LANE SIGNS, so the gates now
               announce themselves the way the subject would: five big branded
               panels, one per lane, over the row you have to pay.

               ⭐ AND THEY CARRY THE GATES THE BOARD USED TO. Five 132px white
               tiles are 10.4% of the panel at ~250 luma, which is where the
               frame-0 brightness comes from now, and the header carries the
               claim. One object doing two jobs, again — just not a rectangle. */}
        <div style={{ position: "absolute", left: -40, top: 128, width: W + 80, height: 26,
          zIndex: 40, background: dkh(SLATE, 0.34) }} />
        {R.models.slice(0, 5).map((m, i) => {
          const x = 26 + i * 196;
          /* ⭐ the signs SWAY on their own clock and their own phase, so the row
             is never a static bar across the top */
          const sway = Math.sin(f / (17 + i * 2.4) + i * 1.3) * 1.5;
          return (
            <div key={"sg" + i} style={{ position: "absolute", left: x, top: 148, width: 186,
              height: 182, zIndex: 41, transformOrigin: "50% 0%",
              transform: `rotate(${sway}deg)` }}>
              {/* the two hangers */}
              {[32, 142].map((hx, j) => (
                <div key={j} style={{ position: "absolute", left: hx, top: -22, width: 9,
                  height: 24, background: dkh(SLATE, 0.2) }} />
              ))}
              {/* the sign face, in the product's own paint */}
              <div style={{ position: "absolute", left: 0, top: 0, width: 186, height: 182,
                borderRadius: 9, background: `linear-gradient(168deg, ${mxh(m.c, 0.26)} 0%, ${m.c} 46%, ${dkh(m.c, 0.24)} 100%)`,
                border: `6px solid ${dkh(m.c, 0.44)}` }} />
              {/* THE MARK, big, on a white tile */}
              {/* ⭐ THE MARK IS ALIVE — wobble, a travelling glint, and its own
                  phase, so five signs read as five objects rather than one
                  animation played five times. */}
              <MarkTile x={93} y={87} d={146} f={f} i={i} z={3}
                logo={m.logo} name={m.n} c={m.c} radius={30} />
              {/* the lane's own fare lamp under the sign — five reds, all shut */}
              <div style={{ position: "absolute", left: 61, top: 162, width: 64, height: 14,
                borderRadius: 7, background: i === 0 && open > 0.5 ? mxh(GREEN, 0.26) : dkh(RED, 0.04) }} />
            </div>
          );
        })}

        {/* ── THE HERO ARTIFACT. A waist-high pedestal with a 370px three-spoke
               arm and air on both sides — an object is recognised by its
               SILHOUETTE and a silhouette needs room. The arm is DARK brass
               against the lit bone pedestal and the sodium-lit road, so the
               contrast has a side. */}
        <Turnstile x={392} y={GY} s={1.26} z={54} armZ={86} f={f} arm={armRot} open={open}
          count={String(fares).padStart(3, "0")} stencil="GATE 01" dim={0.02} />

        {/* the coin he feeds, and the one already waiting for the next turn */}
        {coinShow && <Coin x={400} y={coinY} s={1.3} z={92} rot={coinK * 320} c={BRASS} />}
        {/* the next fare, lifted OUT of the heap by the crouch rather than
            fading into his hand */}
        {f >= 46 && <Coin x={700 + crouch * -46} y={700 - (1 - crouch) * 150} s={1.3} z={92}
          rot={f * 6} c={BRASS} />}

        {/* ⛔ WHAT HE HAS ALREADY SPENT, IN FRONT OF THE PLINTH, NOT BEHIND IT.
               v1 drew the heap at z=30 under a z=62 hero and it read as gravel.
               A load is carried in FRONT of the carrier. */}
        <CoinHeap x={412} y={GY + 12} n={17} s={1.05} z={88} seed={7} c={BRASS} />

        {/* ── THE HERO. `strain` drives the deformation; the shove is a real
               push with his weight behind it; and the FOREARMS start on the
               mascot's own arm rects and END on the spoke, so neither limb
               terminates in mid-air. */}
        {/* ⛔ READ THE RIG BEFORE DRAWING GEOMETRY. `Mascot` draws its own arm
               rects at x 8..34 of a 200 viewBox, i.e. 18..49px in from the left
               of a 286px sprite. He is placed so THOSE rects land on the spoke
               tip at x=702 — no invented limb, and nothing terminating in mid
               air (that read as a TAIL on every sprite in reel 110). */}
        <Hero f={f} x={828 + walk + bump} y={GY} size={322} z={62} act={1} ph={0.3}
          strain={strain} drive={-shove * 0.52} reach={150}
          costume={{ constr: 1 }} stern={f < GIVE ? 1 : 0}
          tint={lerpHex("#D97757", "#C8503A", Math.min(1, strain * 1.1))} />
        {/* ⛔ NO HAND-DRAWN FOREARMS HERE. The first attempt ran two from his
            arm rects to the spoke and they rendered as detached sausages beside
            his shoulder — the exact shape `feedback_props_need_real_drawing`
            calls a TAIL, which cost reel 110 two rounds. He is placed so the
            spoke tip lands INSIDE his silhouette at chest height instead, and
            the bar draws at armZ=86 over his z=62, so it reads as him leaning
            on it with the bar in front. */}
        <Contact x={750 + walk - shove * 78} y={GY} w={186} z={20} o={0.44} />

        {/* ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART — his head, because
               the arms and torso are doing the acting. It reads at thumbnail
               size where a facial expression does not. */}
        <Steam x={810 + walk - shove * 78} y={GY - 244} f={f} at={0} n={13} z={72}
          s={0.88} c="#C8D2DE" rate={1.5 + strain * 2.2} />
        <Sweat x={810 + walk - shove * 78} y={GY - 220} f={f} at={2} n={8} z={73} s={0.82}
          rate={1.2 + strain * 1.4} />

        {/* the lock COSTS something: a recoil ring, a dust puff off the plinth
            and chips off the kerb. An arrival that just stops is a state change. */}
        <Ring x={523} y={508} f={f} at={LOCK} c={GOLD} z={90} s={0.5} dur={14} />
        <Puff x={560} y={GY - 12} f={f} at={LOCK} c={hexa("#E8DCC0", 0.55)} z={89} n={9} s={0.8} />
        <Fall x={430} y={GY - 26} w={200} f={f} at={LOCK} n={6} z={87} c="#C9BFA8"
          rate={2.8} s={0.8} />
        <Ring x={400} y={578} f={f} at={DROP + 6} c={BRASS} z={90} s={0.26} dur={10} />

        {/* ⛔ THE OCCLUDER — the mass cropped by the panel edge, IN FRONT of the
               action. Without one the camera is pointed at a backdrop. Two of
               them here: a post down the left edge, and a QUEUE RAIL crossing
               the near ground in front of everything, cropped bottom and right. */}
        <Jamb p={p} side="l" w={92} z={94} kind="post" />
        <div style={{ position: "absolute", left: -60, top: GY + 34, width: W + 160, height: 26,
          zIndex: 95, borderRadius: 13, background: `linear-gradient(180deg, ${mxh(STEEL, 0.18)} 0%, ${dkh(STEEL, 0.42)} 100%)` }} />
        {[40, 396, 752].map((px, i) => (
          <div key={"qp" + i} style={{ position: "absolute", left: px, top: GY + 40, width: 34,
            height: 200, zIndex: 94, borderRadius: 6, background: dkh(STEEL, 0.36) }} />
        ))}
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   HOOK B · `meter` — THE DRAIN.
   MECHANISM: **DRAIN.** Five subscription meters mounted on a wall, all
   spinning whether he is using them or not, and the thing they are running out
   of is him: coins fall from each meter into a bucket he is holding, and the
   bucket gets heavier until his knees go. One dominant object (the meter wall),
   one figure under it.
   ⛔ REJECTED because the meters SPIN and a spinning disc repaints only its own
   small area (the formula: motion is swept AREA x luma delta). Measured on a
   still and on the arithmetic before it was rendered, it is a wall of five
   118px discs = 6.5% of the panel doing 5px of edge work per sample.
   ====================================================================== */
export const HookMeter: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("row");
  const PJ = PJ_OF[v];
  const DRIPS = [6, 14, 22, 30, 38, 46, 54];
  const load = Math.min(1, DRIPS.filter(a => f >= a).length / DRIPS.length);
  const sink = E(f, 4, dur, 0, 116, IO) * (0.4 + load * 0.6);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.14} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="rack" overhead="tray"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.8} lamp={{ x: 506, y: 176, r: 260 }} window={null} />

        {/* the meter board they are all bolted to */}
        <div style={{ position: "absolute", left: 118, top: 210, width: 776, height: 214,
          zIndex: 30, borderRadius: 8, background: dkh("#5A452A", 0.2),
          border: `7px solid ${dkh("#3A2C18", 0)}` }} />
        {R.models.slice(0, 5).map((m, i) => (
          <SubMeter key={"mt" + i} x={210 + i * 172} y={318} s={1.0} z={34} f={f}
            rate={1 + i * 0.22} c={m.c} logo={m.logo} n={m.n} />
        ))}

        {/* the coins falling out of every one of them, into his bucket */}
        {DRIPS.map((at, i) => {
          const k = E(f, at, at + 13, 0, 1, IN_Q);
          if (f < at || k >= 1) return null;
          return <Coin key={"dc" + i} x={210 + (i % 5) * 172} y={392 + k * 214} s={1.1}
            z={70} rot={k * 300} c={BRASS} />;
        })}

        {/* the bucket, filling — an empty container has to read while it is
            still empty, so it is bone against the amber room */}
        <div style={{ position: "absolute", left: 424, top: 596 + sink * 0.2, width: 168,
          height: 118, zIndex: 66, borderRadius: "6px 6px 16px 16px",
          background: mxh(CREAMB, 0.1), border: `6px solid ${dkh("#8C8271", 0.1)}` }}>
          <div style={{ position: "absolute", left: 8, right: 8, bottom: 8,
            height: 12 + load * 82, borderRadius: 4, background: dkh(BRASS, 0.12) }} />
        </div>

        <Hero f={f} x={508} y={GY + sink * 0.18} size={318} z={62} act={1} ph={0.2}
          strain={0.24 + load * 0.66} costume={{ glasses: 1 }}
          tint={lerpHex("#D97757", "#C8503A", load)} />
        <Contact x={430} y={GY} w={176} z={20} o={0.44} />
        <Steam x={508} y={GY - 262 + sink} f={f} at={6} n={11} z={72} s={0.9}
          c="#C8D2DE" rate={1.4 + load * 2} />

        <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
          <FareBoard x={506} y={126} num={String(R.fares.n)} label="METERS RUNNING"
            sub="EVERY MONTH · EVERY ONE" z={44} />
        </div>
        <Jamb p={p} side="r" w={124} z={90} kind="stud" />
      </Cam>
    </Scene>
  );
};

/* =========================================================================
   HOOK C · `shutters` — THE RATIONING.
   MECHANISM: **RATIONING.** Five branded roller shutters in a row. He runs to
   one, it lifts — and the other four SLAM. Only one can ever be open.
   ⛔ REJECTED on `feedback_hook_simplicity`: five shutters is five objects and
   there is no first place in the frame. It is also reel 120's measured failure
   verbatim — *"ten of anything narrow is a FENCE"* — the silhouette of a row of
   shutters is a striped wall, whatever is painted on it.
   ====================================================================== */
export const HookShutters: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("tabs");
  const PJ = PJ_OF[v];
  const OPEN = 2;
  const lift = E(f, 14, 30, 0, 1, IO);
  const slam = E(f, 26, 34, 0, 1, IN_Q);
  const run = E(f, 4, 22, 0, 250, IO);

  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.14} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
          rake={0.14} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="slab" grit={0.7} lamp={{ x: 506, y: 190, r: 250 }} window={null} />

        {R.models.slice(0, 5).map((m, i) => {
          const x = 74 + i * 186;
          const up = i === OPEN ? lift : (1 - slam) * 0.32;
          return (
            <React.Fragment key={"sh" + i}>
              {/* the lit bay behind, so an OPEN shutter reveals something */}
              <div style={{ position: "absolute", left: x, top: 300, width: 156, height: 296,
                zIndex: 28, background: dkh(m.c, 0.42) }} />
              <div style={{ position: "absolute", left: x + 26, top: 356, width: 104, height: 104,
                zIndex: 29, borderRadius: 20, background: i === OPEN ? "#FBF8F0" : dkh(m.c, 0.5) }} />
              <Shutter x={x} y={300} w={156} h={296} up={up} z={30 + i} c={STEEL} />
            </React.Fragment>
          );
        })}

        <Hero f={f} x={210 + run} y={GY} size={300} z={62} act={0} ph={0.4}
          drive={E(f, 4, 22, 0.9, 0, IO)} reach={40} costume={{ constr: 1 }} />
        <Contact x={140 + run} y={GY} w={170} z={20} o={0.42} />
        {[0, 1, 3, 4].map(i => (
          <Puff key={"pf" + i} x={152 + i * 186} y={596} f={f} at={28} c={hexa("#C9C2B4", 0.5)}
            z={80} n={7} s={0.7} />
        ))}

        <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
          <FareBoard x={506} y={132} num="1" label="ONE AT A TIME"
            sub="FIVE SUBSCRIPTIONS · FIVE DOORS" z={44} />
        </div>
        <Jamb p={p} side="l" w={126} z={90} kind="door" />
      </Cam>
    </Scene>
  );
};



/* =========================================================================
   ROUND 2 — THREE MORE MECHANISMS, ALL LOGO-FORWARD
   Alex: *"maybe I want to think of some more interesting concepts for the hook
   as well"*, in the same message as *"I should see all of the logos... big
   throughout"*. So all three below put the seven real marks in frame 0 at a
   size a viewer RECOGNISES rather than decodes, and each is a different
   one-word MECHANISM — the test that stops the same hook shipping in a new
   costume (reel 118).

     `vending`  VENDING   one machine, the marks are its stock behind glass,
                          and every row has its own coin slot
     `stack`    CRUSH     five giant branded slabs on one Claude, and his body
                          is what changes shape
     `wall`     LOCKED    a wall of branded doors where only one can be open,
                          and it shuts as he reaches the next

   ⛔ ALL THREE STILL OBEY THE SAME LAWS: one dominant object, a bright and
   populated frame 0, a four-part event, and NO RESOLUTION.
   ====================================================================== */

/* ---- HOOK D · `vending` — THE MACHINE ---------------------------------- */
export const HookVending: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  /* ⛔ `row` IS AN AMBER NIGHT SET AND IT FAILED HOOK_LUMA AT 122.4. A hook place
     has to be built for the >=140 bar; `line` is the bone workshop. */
  const p = asPlace("line");
  const PJ = PJ_OF[v];
  const DROP = 14, OPEN = 22, SHUT = 34, NEXT = 46;
  /* the coin, the flap that opens ONE row, and the flap shutting again */
  const coinK = E(f, DROP, DROP + 7, 0, 1, IN_Q);
  const flap = E(f, OPEN, OPEN + 7, 0, 1, OUT) - E(f, SHUT, SHUT + 5, 0, 1, IN_Q);
  const OPEN_ROW = 1;
  const MX = 452, MY = GY + 26;                      /* machine anchor */
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.11} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="lampbar"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} lamp={{ x: 470, y: 150, r: 300 }}
          window={{ x: 60, y: 240, w: 176, h: 152 }} />
        {/* the background process — a stock belt behind the machine */}
        <Runner y={236} f={f} z={26} rate={8.2} pitch={182} w={122} h={74}
          c={mxh(CREAMB, 0.12)} c2={dkh("#26221A", 0)} kind="crate" rail hang={6} />

        {/* the machine body */}
        <div style={{ position: "absolute", left: MX - 268, top: MY - 512, width: 536, height: 512,
          zIndex: 30, borderRadius: "16px 16px 6px 6px",
          background: `linear-gradient(96deg, ${mxh("#D8D0BE", 0.16)} 0%, #CFC6B2 42%, ${dkh("#CFC6B2", 0.28)} 100%)`,
          border: `8px solid ${dkh("#7C7261", 0.06)}` }} />
        {/* the glass front */}
        <div style={{ position: "absolute", left: MX - 240, top: MY - 484, width: 416, height: 396,
          zIndex: 32, borderRadius: 8, background: dkh("#1A2028", 0.06),
          border: `6px solid ${dkh("#5A5448", 0.1)}` }} />
        {/* ⭐ THE STOCK IS THE MARKS. Seven of them, on white tiles, in a machine
               a viewer has bought something from — the recognition is the whole
               hook, and every row is coin-locked. */}
        {R.models.map((m, i) => {
          const col = i % 3, row = Math.floor(i / 3);
          const tx = MX - 220 + col * 132, ty = MY - 462 + row * 128;
          const lifted = i === OPEN_ROW ? flap : 0;
          return (
            <React.Fragment key={"vm" + i}>
              <div style={{ position: "absolute", left: tx, top: ty, width: 112, height: 112,
                zIndex: 34, borderRadius: 22, background: "#FBF8F0",
                border: `4px solid ${hexa("#000", 0.16)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                {m.logo
                  ? <Img src={staticFile(m.logo)} style={{ width: 74, height: 74, objectFit: "contain" }} />
                  : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60,
                      color: dkh(m.c, 0.28) }}>{m.n[0]}</span>}
              </div>
              {/* the row's own coin lamp — six red, one green while it is open */}
              <div style={{ position: "absolute", left: tx + 34, top: ty + 118, width: 44,
                height: 13, zIndex: 35, borderRadius: 6,
                background: lifted > 0.5 ? mxh(GREEN, 0.26) : dkh(RED, 0.06) }} />
              {/* the coil that would push it out, and a flap that only lifts on
                  the paid row */}
              <div style={{ position: "absolute", left: tx - 4, top: ty + 100 - lifted * 74,
                width: 120, height: 16, zIndex: 36, borderRadius: 4,
                background: dkh(BRASS, 0.2 - lifted * 0.14) }} />
            </React.Fragment>
          );
        })}
        {/* the coin throat and the tray */}
        <div style={{ position: "absolute", left: MX + 190, top: MY - 452, width: 62, height: 74,
          zIndex: 34, borderRadius: 5, background: dkh("#4A4237", 0.2) }} />
        <div style={{ position: "absolute", left: MX + 200, top: MY - 424, width: 42, height: 14,
          zIndex: 35, borderRadius: 3, background: "#100E0A" }} />
        <div style={{ position: "absolute", left: MX + 168, top: MY - 300, width: 104, height: 90,
          zIndex: 34, borderRadius: 6, background: dkh("#3A342A", 0.1) }} />
        {/* the delivery flap at the bottom, and what came out of it: one item */}
        <div style={{ position: "absolute", left: MX - 200, top: MY - 76, width: 300, height: 58,
          zIndex: 34, borderRadius: 6, background: dkh("#3A342A", 0.14) }} />

        {f >= DROP - 4 && f < DROP + 8 && (
          <Coin x={MX + 221} y={MY - 500 + coinK * 96} s={1.25} z={80} rot={coinK * 320} c={BRASS} />
        )}
        <CoinHeap x={MX - 300} y={GY + 8} n={13} s={1.0} z={86} seed={5} c={BRASS} />

        <Hero f={f} x={852} y={GY} size={318} z={62} act={1} ph={0.3}
          strain={0.34 + (f > SHUT ? 0.3 : 0)} costume={{ glasses: 1 }}
          stern={f > SHUT ? 1 : 0} />
        <Contact x={774} y={GY} w={172} z={20} o={0.42} />
        <Ring x={MX - 154} y={MY - 404} f={f} at={OPEN} c={GOLD} z={84} s={0.36} dur={13} />
        <Ring x={MX - 154} y={MY - 404} f={f} at={SHUT} c={RED} z={84} s={0.30} dur={11} />

        <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
          {/* ⛔ SHORTER THAN THE OTHER CANDIDATES' BOARD: at h=186 it covered the
              machine's top row, so three of the seven marks — the whole point of
              this hook — were behind the sign that was there to sell them. */}
          <FareBoard x={506} y={112} w={824} h={150} num={String(R.fares.n)}
            label="SEPARATE FARES" sub="ONE COIN · ONE ROW" z={44} markSize={102} />
        </div>
        <Jamb p={p} side="l" w={104} z={94} kind="post" />
      </Cam>
    </Scene>
  );
};

/* ---- HOOK E · `stack` — THE CRUSH -------------------------------------- */
export const HookStack: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("gate");
  const PJ = PJ_OF[v];
  /* five arrivals across the FULL shot — an arrival inside the first third
     leaves the rest of it dead */
  /* ⛔ FRAME 0 IS SETTLED AND ALREADY THE JOKE. v1 pre-seeded ONE slab, so the
     first frame was a Claude standing on an empty pale floor holding a card.
     Two are already on him. */
  const LAND = [-26, -12, 12, 28, 44];
  const on = LAND.filter(a => f >= a).length;
  const load = on / LAND.length;
  const sink = E(f, 2, dur - 2, 0, 128, IO) * (0.34 + load * 0.66);
  const strain = 0.26 + load * 0.70;
  const kick = LAND.reduce((acc, at, i) =>
    acc + (f >= at ? Math.sin((f - at) * 1.35) * (7 + i * 1.7) * Math.exp(-(f - at) / 7) : 0), 0);
  const HX = 468;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.13]} vig={0.10} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={p} f={f} dx={PAR_X[v]} bands={3} kind="shelf" overhead="gantry"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.6 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.8} lamp={{ x: 468, y: 150, r: 300 }}
          window={{ x: 838, y: 238, w: 164, h: 150 }} />
        {/* ⭐ THE SHOP HE IS BUYING THEM FROM — a counter with the rest of the
               stock on it, so the slabs came from somewhere and the floor is not
               empty. A hook is one IDEA, not one object on a blank plane. */}
        <div style={{ position: "absolute", left: -30, top: 470, width: 320, height: 26,
          zIndex: 24, background: mxh("#8A6A42", 0.14) }} />
        <div style={{ position: "absolute", left: -30, top: 496, width: 320, height: 150,
          zIndex: 23, background: dkh("#8A6A42", 0.34) }} />
        {R.models.slice(2, 5).map((m, i) => (
          <div key={"sk" + i} style={{ position: "absolute", left: -6 + i * 100, top: 384,
            width: 82, height: 82, zIndex: 25, borderRadius: 17, background: "#FBF8F0",
            border: `4px solid ${hexa("#000", 0.16)}`, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            {m.logo
              ? <Img src={staticFile(m.logo)} style={{ width: 56, height: 56, objectFit: "contain" }} />
              : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46,
                  color: dkh(m.c, 0.28) }}>{m.n[0]}</span>}
          </div>
        ))}
        <Runner y={222} f={f} z={26} rate={8.4} pitch={186} w={124} h={76}
          c={mxh(CREAMB, 0.14)} c2={dkh("#1E242C", 0)} kind="crate" rail hang={7} />

        {/* ⭐ FIVE GIANT BRANDED SLABS, each 232px with a 132px mark — the marks
               ARE the load, so what is crushing him is legible without a word. */}
        {R.models.slice(0, 5).map((m, i) => {
          if (i >= on) return null;
          const at = LAND[i];
          const k = E(f, at, at + 6, 0, 1, OUT);
          const sq = squash(f - at, 6, 0.24, 3, 10);
          const rot = [-5, 7, -9, 5, -6][i];
          return (
            <div key={"sl" + i} style={{ position: "absolute",
              left: HX - 116 + [0, -16, 20, -10, 14][i], top: 512 - i * 84 + sink + kick * 0.5,
              width: 232, height: 92, zIndex: 76 + i, borderRadius: 9,
              transform: `translateY(${(1 - k) * -360}px) scaleY(${sq}) rotate(${rot + (1 - k) * rot * 3}deg)`,
              transformOrigin: "50% 100%",
              background: `linear-gradient(168deg, ${mxh(m.c, 0.22)} 0%, ${m.c} 46%, ${dkh(m.c, 0.3)} 100%)`,
              border: `6px solid ${dkh(m.c, 0.44)}` }}>
              <div style={{ position: "absolute", left: 10, top: 10, width: 72, height: 72,
                borderRadius: 15, background: "#FBF8F0", display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                {m.logo
                  ? <Img src={staticFile(m.logo)} style={{ width: 50, height: 50, objectFit: "contain" }} />
                  : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 42,
                      color: dkh(m.c, 0.3) }}>{m.n[0]}</span>}
              </div>
              <div style={{ position: "absolute", left: 96, top: 34, right: 14, height: 26,
                borderRadius: 5, background: hexa("#0A0A0C", 0.3), display: "flex",
                alignItems: "center", justifyContent: "center" }}>
                <span style={{ ...mono(Math.min(19, 122 / m.n.length), 900), color: mxh(m.c, 0.62),
                  letterSpacing: 1.4 }}>{m.n}</span>
              </div>
            </div>
          );
        })}
        {LAND.map((at, i) => (
          <React.Fragment key={"fx" + i}>
            <Puff x={HX} y={520 - i * 84 + sink} f={f} at={at} c={hexa("#D8CCB0", 0.5)} z={86} n={8} s={0.8} />
            <Ring x={HX} y={516 - i * 84 + sink} f={f} at={at} c={GOLD} z={87} s={0.42} dur={13} />
          </React.Fragment>
        ))}

        <Hero f={f} x={HX} y={GY + sink * 0.22} size={336} z={62} act={1} ph={0.2}
          strain={strain} cheer={1} reach={40}
          tint={lerpHex("#D97757", "#C0342A", Math.min(1, load * 1.2))}
          costume={{ constr: 1, xeyes: f >= 34 ? 1 : 0 }} />
        <Contact x={HX - 76} y={GY} w={158 + load * 62} z={19} o={0.44 + load * 0.16} />
        <Steam x={HX} y={GY - 258 + sink} f={f} at={4} n={14} z={72}
          s={0.9 + load * 0.7} c="#8FA6BC" rate={1.5 + load * 2.3} />
        <Sweat x={HX} y={GY - 236 + sink} f={f} at={8} n={10} z={73} s={0.9} rate={1.4 + load * 1.5} />

        <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
          <FareBoard x={506} y={124} w={860} h={172} num={String(R.fares.n)}
            label="SEPARATE FARES" sub="EVERY MONTH · EVERY ONE" z={44} markSize={112} />
        </div>
        <Jamb p={p} side="r" w={112} z={94} kind="post" />
      </Cam>
    </Scene>
  );
};

/* ---- HOOK F · `wall` — THE LOCKED WALL --------------------------------- */
export const HookWall: React.FC<SP> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hall");
  const PJ = PJ_OF[v];
  const RUN = 8, ARRIVE = 26, SLAM = 30;
  /* he crosses to the one open door and it shuts as he gets there */
  const walk = E(f, RUN, ARRIVE, 0, 386, IO);
  const openIdx = f < SLAM ? 3 : 1;
  /* ⛔ FRAME 0 SHOWS THE ONE OPEN DOOR ALREADY OPEN. v1 eased it from 0.2, so
     the first frame was five shut doors and the whole premise — only one at a
     time — arrived a third of a second late. */
  const swing = f < SLAM ? 1 : E(f, SLAM, SLAM + 6, 1, 0, IN_Q);
  const reopen = E(f, SLAM + 8, SLAM + 18, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.11]} vig={0.16} glow={hexa(p.key, 0.22)}>
      <Cam s={[1.00, 1.05, 1.07][PJ]} x={[0, -58, 64][PJ]} y={[0, 22, -20][PJ]} z={1}>
        <Room p={asPlace("hall")} f={f} dx={PAR_X[v]} bands={2} kind="column" overhead="lampbar"
          rake={0.12} rakeX={RAKE_X[v]} rakeRate={4.4 * RAKE_K[v]} rakeN={RAKE_N[v]}
          floorKind="tile" grit={0.7} lamp={{ x: 506, y: 150, r: 300 }} window={null} />

        {/* the overhead goods rail — every shot needs a background process, and
            this was the only candidate without one */}
        <Runner y={214} f={f} z={26} rate={8.8} pitch={186} w={126} h={76}
          c={mxh(CREAMB, 0.16)} c2={dkh("#1A2028", 0)} kind="crate" rail hang={7} />

        {/* ⭐ FIVE BRANDED DOORS, each 168px wide with a 108px mark on it. Reel
               120's warning applies and is designed around: ten narrow shutters
               read as a FENCE, so these are five WIDE doors with lit reveals and
               piers between them, not a striped wall. */}
        {R.models.slice(0, 5).map((m, i) => {
          const x = 44 + i * 190;
          const lit = (i === openIdx ? swing : 0) + (i === 1 ? reopen * 0.9 : 0);
          return (
            <React.Fragment key={"dw" + i}>
              {/* the lit room behind, so an open door reveals a PLACE */}
              <div style={{ position: "absolute", left: x, top: 320, width: 168, height: 300,
                zIndex: 22, borderRadius: 5,
                background: `linear-gradient(180deg, ${mxh(m.c, 0.24)} 0%, ${dkh(m.c, 0.34)} 100%)` }} />
              {/* the door leaf, hinged, swinging open only where it is paid */}
              <div style={{ position: "absolute", left: x, top: 320, width: 168, height: 300,
                zIndex: 30, borderRadius: 5, transformOrigin: "0% 50%",
                transform: `perspective(1100px) rotateY(${-lit * 72}deg)`,
                background: `linear-gradient(96deg, ${mxh("#CFC6B2", 0.14)} 0%, ${dkh("#CFC6B2", 0.26)} 100%)`,
                border: `5px solid ${dkh("#7C7261", 0.06)}`,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 108, height: 108, borderRadius: 22, background: "#FBF8F0",
                  border: `4px solid ${hexa("#000", 0.16)}`, display: "flex",
                  alignItems: "center", justifyContent: "center" }}>
                  {m.logo
                    ? <Img src={staticFile(m.logo)} style={{ width: 74, height: 74, objectFit: "contain" }} />
                    : <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 60,
                        color: dkh(m.c, 0.28) }}>{m.n[0]}</span>}
                </div>
              </div>
              {/* the pier between doors, and the coin lamp over each */}
              <div style={{ position: "absolute", left: x + 168, top: 300, width: 22, height: 330,
                zIndex: 33, background: dkh("#5A5448", 0.2) }} />
              <div style={{ position: "absolute", left: x + 56, top: 282, width: 56, height: 20,
                zIndex: 34, borderRadius: 5,
                background: lit > 0.5 ? mxh(GREEN, 0.26) : dkh(RED, 0.06) }} />
            </React.Fragment>
          );
        })}

        <Hero f={f} x={158 + walk} y={GY} size={294} z={62} act={0} ph={0.4}
          drive={E(f, RUN, ARRIVE, 0.8, 0, IO)} reach={44}
          shock={f >= SLAM && f < SLAM + 12 ? 0.4 : 0}
          stern={f > SLAM ? 1 : 0} costume={{ constr: 1 }} />
        <Contact x={86 + walk} y={GY} w={168} z={20} o={0.42} />
        <Puff x={44 + openIdx * 190 + 84} y={614} f={f} at={SLAM} c={hexa("#C9C2B4", 0.5)}
          z={82} n={9} s={0.8} />
        <Ring x={44 + 3 * 190 + 84} y={470} f={f} at={SLAM} c={RED} z={84} s={0.4} dur={13} />

        <div style={{ position: "absolute", inset: 0, zIndex: 44 }}>
          <FareBoard x={506} y={110} w={860} h={168} num="1" label="ONE AT A TIME"
            sub={`${R.fares.n} SUBSCRIPTIONS · ${R.fares.n} DOORS`} z={44} markSize={110} />
        </div>
        <Jamb p={p} side="l" w={104} z={94} kind="stud" />
      </Cam>
    </Scene>
  );
};

/* ⛔ THE REGISTRY GOES LAST. `const` components are block-scoped, so a map
   declared above them is a use-before-declaration error. */
export const HOOKS: Record<HookId, React.FC<SP>> = {
  toll: HookToll,
  meter: HookMeter,
  shutters: HookShutters,
  vending: HookVending,
  stack: HookStack,
  wall: HookWall,
};
