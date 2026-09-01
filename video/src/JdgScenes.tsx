import React from "react";
import { useCurrentFrame, staticFile, Sequence, OffthreadVideo } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh, lerpHex,
  Scene, Cam, Contact, Pool, Ring, Puff, Motes, Beam, Mark, Hero, Crew, costumeFor,
  mono, ui, CLAY, INK, GREEN, RED, GOLD, MUTE,
  Chamber, asPlace, PLASTER, PLASTERD, OAK, OAKD, OAKL, BRS, BRSD, BRSL, BLOCKS,
  FACE, FACED, VOID, C_JUDGE, C_PROS, C_DEF, R,
  settle, antic, load, stroke, STEP, STEP3, STEP4,
} from "./JdgWorld";
import {
  UnitStack, Unit, BlockLine, Console, Plinth, BenchDesk, Gavel, Block, Nameplate,
  Rail10, Counter, Grille, MinuteDial, EvidenceCart, Ship, FeeStack,
} from "./JdgProps";
import { RK } from "./JdgHooks";
import type { Variant } from "./JdgHooks";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE SCENES.  Board: storyboards/132-judge.md.

   ⛔⛔⛔ EVERY NAMED BEAT CONSTANT IN THIS FILE IS A WORD, at `onset x 30 - 4`
   ([[feedback_the_picture_leads_the_voice]] · [[ANIMATION-QUALITY §31.1]]).
   `tools/beat_audit.py` reads these constants and fails the build if one does
   not land on a word — on reel 129 it found TEN OF SEVENTEEN scenes with no
   named beats at all, animating to a metronome, and that reel's hook was
   rejected eight times without anyone finding the clock.

   ⛔⛔ THE WELL IS USED FOUR TIMES (S5 · S9 · S13 · S16) AND THAT IS THE BOARD'S
   BIGGEST RISK — the CALLBACK S1=S2 failure. Each use differs on all three axes
   the critic pass named, and it is checked on a contact sheet, not asserted:
       S5   eye level, wide, cool, settled       the empty room, first look
       S9   eye level, wide, punchy, three pools three nameplates arriving
       S13  LOW, tighter, hot, bench lamp full   the loop running, three passes
       S16  eye level, wide, DAYLIGHT from the   the prototype going out
            open back doors — the brightest frame

   ⛔ EVERY SCENE HAS: a real place with 4-6 planes · a LOCKED camera (the only
      move is the house in-panel push) · ONE hero moving · a background process
      always running · arrivals spread across the FULL duration (§9 — an arrival
      inside the first third leaves the rest dead) · and nothing that lands and
      simply stops.
   ⛔ ONE text chip per shot, in the reserved band.
   ⛔ NO NUMERAL FOR THE 73% CLAIM ANYWHERE — see `R` and `PCT_BANNED`.
   ========================================================================= */

type P = { v: Variant; dur: number };

/** the per-cut camera + grade, the two dHash levers that do not touch geometry */
export const CAM: Record<Variant, { dx: number; dy: number; s: number; rot: number }> = {
  house: { dx: 0, dy: 0, s: 1, rot: 0 },
  amber: { dx: -62, dy: 18, s: 1.055, rot: 0 },
  steel: { dx: 58, dy: -20, s: 1.015, rot: 0 },
};
export const GRADE: Record<Variant, string> = {
  house: "none",
  amber: "saturate(1.12) sepia(0.10) contrast(1.05)",
  /* ⛔⛔ THE FRAME-0 LAWS APPLY TO EVERY CUT, NOT JUST THE HOUSE ONE. This grade
     shipped `brightness(0.98)` and measured **135.1 at frame 0 against the 140
     law**, while house sat at 143.1 and amber at 154.3 — so two thirds of the
     deliverable would have passed the gate and one third would have opened
     under it. Reel 125 lost a round to the same thing: its two alternative
     hooks opened on an empty grey room because the seeding had only ever been
     written for the main cut. Render frame 0 of EVERY cut and measure each one. */
  steel: "saturate(0.96) hue-rotate(-8deg) contrast(1.05) brightness(1.05)",
};

/** ⭐⭐ THE LATE CROSSING — a clerk carrying a file stack all the way across the
    room, `LIN`, entering in the last third and STILL CROSSING when the scene cuts.

    This is one fix for two measured failures at once, and both were front-loading:
      · 5 of 18 scenes DIED into their cut (ratio < 0.70). §23: an `OUT`/`IO` ease
        decelerates into its end whether or not that end is on screen, so
        extending one past the cut fixes nothing — something has to still be
        MOVING there, at a constant or rising rate.
      · 4 of 18 measured STATIC, and every one of them had put all its arrivals in
        the first half (§9: "an arrival inside the first third leaves the rest
        dead").
    ⛔ It is a BODY carrying WORK, not an abstract band: the reel's own noun, and
    a 200px sprite plus a 130px stack crossing 1200px repaints far more of the
    panel per sample than any light effect at this size. */
const Cross: React.FC<{ f: number; from: number; to: number; a: number; b: number;
  y?: number; i?: number; size?: number; z?: number; stack?: number }> =
  ({ f, from, to, a, b, y = 690, i = 3, size = 196, z = 58, stack = 3 }) => {
  if (f < a) return null;
  /* ⭐ TWO-PHASE: a fast ENTRY BURST, then a cruise.
     The gate reads the mean |dframe| over frames 1-6 and wants >= 6.5 (dead
     below 4.0). The arithmetic that sets the burst speed:
        motion ~ repainted-fraction x luma-delta
        a solid sprite H px tall moving d px repaints ~2 x H x d per frame
        target 6.5 at a clay-on-oak delta of ~110  ->  ~15,800 px/frame
        H = 260  ->  d = 30 px/frame
     So the figure covers ~380px in the first twelve frames and then walks. A
     constant crossing of the whole scene, which is what this was, moves ~14
     px/frame and repaints 0.9% of the panel — a third of what the opening needs.
     ⛔ And it must still be travelling at the END (§23), so the cruise runs past
     the last frame. One object, both boundaries. */
  const BURST = 12;
  const dir = to < from ? -1 : 1;
  const x = f < a + BURST
    ? E(f, a, a + BURST, from, from + dir * 380, IN_Q)
    : E(f, a + BURST, b, from + dir * 380, to, LIN);
  const flip = to < from;
  return (
    <>
      <Crew f={f} x={x} y={y} i={i} size={size} z={z} at={a} loop={1} flip={flip} />
      {/* ⛔ THIS CARRIED A STACK OF PAPER FILES THROUGH EVERY SCENE IN THE REEL —
          pasted in to fix the motion and scene-open gates, and it is a big part of
          why the whole thing read as "the papers concept". It carries a COURSE of
          the tower now: the same material the work is made of, saturated, and it
          reads as somebody bringing a part to a build. */}
      {Array.from({ length: Math.max(1, stack - 1) }, (_, k) => {
        const c = BLOCKS[(i + k) % BLOCKS.length];
        return (
          <div key={"cs" + k} style={{ position: "absolute",
            left: x + (flip ? -1 : 1) * size * 0.30 - 62,
            top: y - size * 0.92 - k * 52 + Math.sin(f / 6 + k) * 3,
            width: 124, height: 48, zIndex: z + 1, borderRadius: 5, boxShadow: SH,
            background: `linear-gradient(172deg, ${mxh(c, 0.28)} 0%, ${c} 46%, ${dkh(c, 0.4)} 100%)`,
            border: `3px solid ${dkh(c, 0.5)}` }}>
            <div style={{ position: "absolute", left: 10, right: 10, top: 15, height: 6,
              borderRadius: 3, background: mxh(c, 0.66) }} />
          </div>
        );
      })}
    </>
  );
};

/** ⭐⭐⭐ CUT INTO MOTION — the scene's LARGEST object is still arriving on frame 1.

    A 6x5 cell map of what actually changes between f1 and f4 ended four rounds of
    guessing: in S8 the centre of the frame measured **0.1** — the 780px document,
    the biggest thing on screen, was perfectly still at the cut — and the only
    cells moving anywhere were the one containing the crossing figure. Sprites and
    raking light cannot carry an opening, because
    `motion ~ (fraction of the panel repainted per 0.1s) x (luma delta)` and a
    262px sprite moving 32px/frame repaints 2% of the panel. The hero PROP is
    40-60% of the frame; moving it 40px repaints five times as much.

    `scene_open_audit`'s own note says it: *things want a phase offset so they are
    mid-travel on frame 1.* So each scene's hero group is pre-seeded to LAND at
    ~f5, having come from off-frame — which is also the better edit, because the
    cut then lands on something arriving instead of on a held pose.
    ⛔ NOT applied to the hook: THE-OPEN law 1 wants frame 0 SETTLED AND LEGIBLE,
    and the hook has its own gate (`hook_score`) which it clears. */
const CutIn: React.FC<{ f: number; dx?: number; dy?: number; at?: number;
  z?: number; children: React.ReactNode }> =
  ({ f, dx = 0, dy = -320, at = 5, z = 40, children }) => {
  const k = E(f, at - 10, at, 1, 0, IN_Q);
  const set = settle(f, at, 9, 12, 2.5);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transform: `translate(${dx * k}px, ${dy * k + set}px)` }}>{children}</div>
  );
};

const chip = (t: string, y = 150, c = BRSL) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: 96 }}>
    <span style={{ ...mono(24, 900), letterSpacing: 4, color: "#2A2116",
      background: `linear-gradient(180deg,${c},${dkh(c, 0.18)})`, padding: "9px 22px",
      borderRadius: 8, border: `3px solid ${dkh(c, 0.4)}` }}>{t}</span>
  </div>
);

/* =========================================================================
   S1 — "But the crazy part, it makes your output 73% more accurate"
   THE REFILL. The board from the hook is back on its easel, empty, and the work
   flies back INTO it leaf by leaf while a ten-segment rail fills beside it.
   ⛔⛔ NO NUMERAL. The §4 depiction of a percentage is "ten segments, four lit —
   no numeral anywhere". The caption carries Alex's spoken 73%; the frame does
   not certify a figure I cannot source.
   ⭐⭐ AND ONE LEAF IS LEFT OUT. The villain's integrity depends on it: the CLAIM
   is made here, the PROOF is withheld until S13.
   ========================================================================= */
const S1_SEAT0 = 6, S1_SEAT1 = 26, S1_RAIL = 33, S1_HOLD = 64;
export const S1: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const lit = f < S1_RAIL ? 4 : f < S1_HOLD ? 6 : 7;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.40} glow={hexa(BRS, 0.18)}>
      <Chamber p={p} f={f} lit={1} occ="l" bays={5} shaft={420} shaftO={0.30}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={9} rail dim={0.34} />
            <Pool x={470} y={556} w={900} c="#FFF6E2" o={0.26} z={12} />
      <Contact x={640 - 168} y={700 - 10} w={336} z={44} o={0.46} />
      <UnitStack x={640} y={700} f={f} w={344} z={60}
        blocks={[0, 1]} seat={{ 2: S1_SEAT0, 3: S1_SEAT0 + 12, 5: S1_SEAT1 }} lit={1} />
      {/* ⭐⭐ COURSE 4 IS NEVER SEATED. The villain's integrity depends on it: the
          CLAIM is made here and the PROOF is withheld until S13. */}
      {/* ⭐ THE DARK BAY. Leaf 1 is deliberately never seated in this scene. */}

      {/* the ten-segment rail — a LENGTH, not a number */}
      <Rail10 x={640} y={228} f={f} lit={lit} w={420} z={74} c={GREEN} />

      {/* the work arriving from off-frame, so the panel is repainted rather than
          a value being tweened in place */}
      {[S1_SEAT0, S1_SEAT1].map((at, i) => (
        <React.Fragment key={"ar" + i}>
          {f >= at && f < at + 22 && <Ring x={640} y={430} f={f} at={at} c={FACE} z={70} s={1.1} />}
          {f >= at && <Puff x={640 + (i ? 150 : -150)} y={560} f={f} at={at} n={8} s={1.1} c="#CFC4AE" z={66} />}
        </React.Fragment>
      ))}

      <Contact x={168} y={664} w={230} z={44} o={0.42} />
      <Hero f={f} x={280} y={672} size={340} z={48} costume={{}} tint={CLAY}
        cheer={f >= S1_RAIL ? 0.5 : 0} act={2} ph={0.3} />
      {[840, 936].map((gx, i) => (
        <Crew key={"c" + i} f={f} x={gx} y={676} i={i + 1} size={196} z={46}
          at={-10} loop={i ? 1 : 3} />
      ))}
      <Motes x={506} y={330} w={880} h={420} n={13} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Cross f={f} from={-220} to={1180} a={-18} b={dur + 34} y={706} i={4} size={262} z={58} />
      {/* the rail lights ONE SEGMENT AT A TIME as discrete pops, spread to the
          end of the scene — a bar whose leading edge creeps is worth +0.11 */}
      {[40, 48, 56, 64].map((at, i) => (
        f >= at && f < at + 14
          ? <Ring key={"rp" + i} x={460 + i * 90} y={228} f={f} at={at} c={GREEN} z={78} s={0.5} dur={13} />
          : null
      ))}

    </Scene>
  );
};

/* =========================================================================
   S2 — "and it takes just one minute to set up."
   THE COUNTER. One sheet across the brass, one stamp, one slot — and the dial
   makes exactly ONE sweep, which is the depiction of the line and is true of the
   picture as drawn.
   ========================================================================= */
const S2_SLIDE = 7, S2_STAMP = 14, S2_DROP = 29, S2_DIAL_A = 0, S2_DIAL_B = 33;
export const S2: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.40} glow={hexa(GOLD, 0.20)}>
      <Chamber p={p} f={f} lit={1} occ="r" bays={3} shaft={260} shaftO={0.26}
        rakeRate={RK[v].rate * 0.8} rakeN={RK[v].n} panelN={6} rail={false} horizonDy={20} dim={0.34} />
      <Grille x={300} y={430} w={420} h={180} z={30} />
      <MinuteDial x={760} y={330} f={f} a={S2_DIAL_A} b={S2_DIAL_B} s={1.5} z={40} />
      <Pool x={520} y={600} w={820} c="#FFF0CE" o={0.24} z={12} />
      <Counter x={506} y={772} w={840} h={250} z={50} />
      <CutIn f={f} dx={0} dy={-600} at={7} z={62}>
        <Console x={430} y={548} f={f} w={520} z={62} slots={f >= S2_STAMP ? 3 : 1} />
      </CutIn>
      {/* the stamp — a discrete stroke with a real arrival */}
      {f >= S2_STAMP - 9 && f < S2_DROP && (() => {
        const lf = f - S2_STAMP;
        const dz = E(lf, -9, 0, -190, 0, IN_Q);
        const sq = lf >= 0 ? 1 + settle(lf, 0, 0.10, 8, 2.0) : 1.4;
        return (
          <div style={{ position: "absolute", left: 396, top: 470 + dz, width: 150, height: 96,
            zIndex: 78, transform: `scale(${sq})`, borderRadius: 6,
            border: `7px solid ${C_PROS}`, display: "flex", alignItems: "center",
            justifyContent: "center", ...mono(27, 900), color: C_PROS, letterSpacing: 2 }}>
            FILED
          </div>
        );
      })()}
      {f >= S2_STAMP && <Ring x={470} y={520} f={f} at={S2_STAMP} c={BRSL} z={80} s={0.9} />}
      {f >= S2_STAMP && <Puff x={470} y={540} f={f} at={S2_STAMP} n={9} s={1.1} c="#CFC4AE" z={72} />}
      <Contact x={720} y={686} w={220} z={44} o={0.40} />
      <Hero f={f} x={830} y={694} size={330} z={52} costume={{ girl: 1, glasses: 1 }}
        tint={CLAY} act={1} ph={0.8} drive={E(f, 0, S2_SLIDE, 0.3, 0, OUT)} reach={60} />
      {chip(`${R.setup} SETUP`, 150, C_JUDGE)}
      <Motes x={506} y={340} w={860} h={400} n={12} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Cross f={f} from={1180} to={-260} a={-18} b={dur + 34} y={730} i={5} size={262} z={58} stack={2} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the shot
          is accelerating out rather than settling (§23) */}
      <Cross f={f} from={1180} to={-300} a={dur - 13} b={dur + 60} y={766} i={14} size={262} z={59} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S3 — "People are using it to ship entire apps, websites, and tools from a
   single prompt,"
   THE DOORS. ⛔ THREE DIFFERENT SILHOUETTES, not three crates: three identical
   containers carry ONE bit of information for three seconds, which is §3.
   ========================================================================= */
const S3_CHUTE = 9, S3_A = 25, S3_B = 46, S3_C = 54, S3_ONE = 70;
export const S3: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("doors");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.36} glow={hexa("#F0DCA8", 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="l" bays={3} shaft={620} shaftO={0.24}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={7} rail={false} dim={0.24} />
            {/* THE OPEN DOORS — daylight blowing in. A hole, full height, square. */}
      <div style={{ position: "absolute", left: 600, top: 150, width: 400, height: 372,
        zIndex: 24, background: `linear-gradient(178deg, #FFFBEE 0%, #F4E4B8 62%, #D8C494 100%)`,
        border: `10px solid ${dkh(OAK, 0.3)}` }} />
      {/* the shutter coming UP off the opening — the door is the biggest mass in
          the shot and it is still moving on frame 1 */}
      <div style={{ position: "absolute", left: 590, top: 140,
        width: 420, height: 392 * Math.max(0, E(f, -6, 8, 1, 0, IN_Q)), zIndex: 29,
        background: `linear-gradient(180deg, ${dkh(OAK, 0.18)} 0%, ${dkh(OAK, 0.52)} 100%)`,
        borderBottom: `8px solid ${BRSD}` }} />
      {/* ⛔ WHAT LIES BEYOND THE DOOR. Without it an opening is a lit rectangle,
          and [[feedback_a_lit_rectangle_is_a_screen]] is explicit that moving it
          never helps because the SHAPE is the bug: a hole reads because the room
          STOPS at it. Steps and roofs beyond, figures crossing, real mullions,
          and a stone lintel over the head. */}
      <div style={{ position: "absolute", left: 600, top: 150, width: 400, height: 372,
        zIndex: 25, overflow: "hidden" }}>
        {[0.16, 0.46, 0.76].map((k, i) => (
          <div key={"sk" + i} style={{ position: "absolute", left: 400 * k - 44, bottom: 0,
            width: 96 + i * 36, height: 372 * (0.28 + i * 0.13),
            background: `linear-gradient(180deg, ${hexa("#8C7A55", 0.40)} 0%, ${hexa("#5E5033", 0.60)} 100%)` }} />
        ))}
        {[0, 1].map(i => {
          const px = ((f * (2.1 + i * 1.1) + i * 230) % (400 + 200)) - 100;
          return (
            <div key={"pz" + i} style={{ position: "absolute", left: px, bottom: 0,
              width: 50, height: 104, borderRadius: 7, background: hexa("#33290F", 0.52) }} />
          );
        })}
      </div>
      {[0.34, 0.68].map((k, i) => (
        <div key={"ml" + i} style={{ position: "absolute", left: 600 + 400 * k - 6, top: 150,
          width: 12, height: 372, zIndex: 27, background: dkh(OAK, 0.30) }} />
      ))}
      <div style={{ position: "absolute", left: 600 - 18, top: 150 - 24, width: 400 + 36,
        height: 28, zIndex: 28,
        background: `linear-gradient(180deg, ${mxh(PLASTER, 0.18)} 0%, ${PLASTERD} 100%)` }} />

      <Pool x={800} y={556} w={760} c="#FFF9E8" o={0.52} z={26} />
      {/* the chute the ONE prompt feeds — the source half of the mechanism (§10) */}
      <div style={{ position: "absolute", left: 150, top: 168, width: 300, height: 34,
        zIndex: 40, background: `linear-gradient(180deg, ${BRSL} 0%, ${BRSD} 100%)` }} />
      <CutIn f={f} dx={0} dy={-640} at={8} z={68}>
  <div style={{ position: "absolute", left: 200 + E(f, 0, S3_CHUTE, -380, 0, IN_Q),
        top: 196, width: 128, height: 54, zIndex: 68, borderRadius: 5, boxShadow: SH,
        background: `linear-gradient(172deg, ${mxh(BLOCKS[1], 0.28)} 0%, ${BLOCKS[1]} 46%, ${dkh(BLOCKS[1], 0.4)} 100%)`,
        border: `3px solid ${dkh(BLOCKS[1], 0.5)}` }} />
      </CutIn>
      {f >= S3_CHUTE && <Ring x={264} y={210} f={f} at={S3_CHUTE} c={BRSL} z={70} s={0.7} />}
      {chip("ONE PROMPT IN", 150, BRSL)}

      {/* the three finished things, carried out, ASCENDING and spread across the
          FULL duration */}
      <Ship kind={0} x={214} y={648} f={f} at={S3_A} s={1.55} z={66} />
      <Ship kind={1} x={496} y={628} f={f} at={S3_B} s={1.45} z={66} />
      <Ship kind={2} x={806} y={664} f={f} at={S3_C} s={1.45} z={66} />
      {[[S3_A, 250], [S3_B, 490], [S3_C, 760]].map(([at, x], i) => (
        <React.Fragment key={"sr" + i}>
          {f >= at && <Puff x={x as number} y={670} f={f} at={at as number} n={9} s={1.2} c="#CFC4AE" z={64} />}
          {f >= at && f < (at as number) + 22 &&
            <Ring x={x as number} y={654} f={f} at={at as number} c="#FFF2D2" z={65} s={1.0} />}
        </React.Fragment>
      ))}
      {[0, 1, 2].map(i => (
        <Crew key={"cr" + i} f={f} x={[330, 640, 926][i]} y={716} i={i} size={196} z={54}
          at={[S3_A - 8, S3_B - 8, S3_C - 8][i]} loop={1} />
      ))}
      <Motes x={700} y={330} w={620} h={420} n={13} f={f} z={82} c={mxh("#FFF0C8", 0.3)} />
      <Cross f={f} from={1180} to={-240} a={-18} b={dur + 34} y={716} i={8} size={262} z={58} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the
          scene is accelerating out rather than settling (§23) */}
      <Cross f={f} from={1180} to={-280} a={dur - 13} b={dur + 60} y={762} i={13} size={252} z={59} stack={2} />

      {/* ⭐ THE EXIT: the finished work leaves, accelerating, still crossing at
          the cut. `IN_Q` over a window ending past `dur` is the only shape that
          is still gaining at the boundary. */}
      <div style={{ position: "absolute", inset: 0, zIndex: 67,
        transform: `translate(${E(f, dur - 26, dur + 34, 0, 940, IN_Q)}px, ${E(f, dur - 26, dur + 34, 0, -90, IN_Q)}px)` }}>
        <Ship kind={0} x={214} y={648} f={f} at={S3_A} s={1.55} z={67} />
      </div>

    </Scene>
  );
};

/* =========================================================================
   S4 — "and even the creators of Claude think this is the future of AI."
   THE VIDEO EXHIBIT. ⭐ ALEX ASKED FOR THIS SCENE BY NAME ("have the recording
   of the creators of Claude Code on stage like the BOSS reel"). Same two clips
   118 and 128 used on this exact line, so the receipt is verified and consistent
   across all three reels.
   ⛔ AND B-ROLL DOES NOT GET TO HOLD: a seated interview held for a full sentence
   measured 3.23 with a 60-frame dead run. It is cut TIGHT(5f) -> WIDE -> hard
   back to TIGHT on the word "Claude", which is 118's treatment exactly.
   ⭐ In this world a screen is EVIDENCE, wheeled in on an A/V cart — so the real
   footage arrives as an exhibit rather than as a jumbotron borrowed from 128.
   ========================================================================= */
const S4_CART = 12, S4_CLAUDE = 22, S4_NAME = 44, S4_AI = 58;
export const S4: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const punch = f >= S4_CLAUDE ? 1.10 : 1;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.52} glow={hexa("#BFD8F2", 0.20)}>
      <Chamber p={p} f={f} lit={0.55} occ="both" bays={5} shaft={420} shaftO={0.16}
        rakeRate={RK[v].rate * 0.7} rakeN={RK[v].n} panelN={9} rail dim={0.46} />
      <EvidenceCart x={506} y={718} f={f} at={S4_CART} w={790} z={42}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${punch})`,
          transformOrigin: "50% 42%" }}>
          <Sequence from={0} durationInFrames={5}>
            <OffthreadVideo src={staticFile("boris_tight.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
          <Sequence from={5} durationInFrames={S4_CLAUDE - 5}>
            <OffthreadVideo src={staticFile("boris_wide.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
          <Sequence from={S4_CLAUDE} durationInFrames={S4_AI - S4_CLAUDE}>
            <OffthreadVideo src={staticFile("boris_tight.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Sequence>
          {/* the FOURTH framing, hard on "AI" — four framings in a shot that
              would otherwise hold for its last two thirds */}
          <Sequence from={S4_AI}>
            <OffthreadVideo src={staticFile("boris_wide.mp4")} muted
              style={{ width: "100%", height: "100%", objectFit: "cover",
                transform: "scale(1.22)", transformOrigin: "44% 38%" }} />
          </Sequence>
        </div>
      </EvidenceCart>
      {/* ⛔ THE NAME STRIP IS THE RECEIPT AND IT IS THE SIZE A RECEIPT SHOULD BE.
          No portrait is drawn and no words are put in his mouth — it is the real
          footage with his name under it. */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 596, textAlign: "center",
        zIndex: 92, opacity: E(f, S4_NAME - 6, S4_NAME, 0, 1, IN_Q) }}>
        <span style={{ ...mono(22, 800), color: mxh("#BFD8F2", 0.4), letterSpacing: 3 }}>
          {R.futureWho}
        </span>
      </div>
      {/* the room watches — bodies, on their own loops, so the shot is not a
          talking head alone in the dark */}
      {[168, 300, 792, 924].map((gx, i) => (
        <Crew key={"w" + i} f={f} x={gx} y={706} i={i + 2} size={206} z={54}
          at={-12} loop={i % 2 ? 3 : 2} tint={dkh(CLAY, 0.16)}
          cheer={f >= S4_CLAUDE ? 0.35 + (f >= S4_AI ? 0.45 : 0) : 0} />
      ))}
      <Motes x={506} y={300} w={820} h={420} n={14} f={f} z={80} c={mxh("#BFD8F2", 0.3)} />
      <Cross f={f} from={-240} to={1180} a={-18} b={dur + 34} y={724} i={6} size={262} z={60} stack={2} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the
          scene is accelerating out rather than settling (§23) */}
      <Cross f={f} from={-280} to={1180} a={dur - 13} b={dur + 60} y={762} i={13} size={252} z={59} stack={2} />

      <div style={{ position: "absolute", inset: 0, zIndex: 41,
        transform: `translateX(${E(f, dur - 24, dur + 36, 0, -820, IN_Q)}px)` }}>
        <div style={{ position: "absolute", left: 92, top: 300, width: 300, height: 300,
          background: `linear-gradient(174deg, ${dkh(OAK, 0.10)} 0%, ${dkh(OAK, 0.52)} 100%)`,
          borderRadius: 8 }} />
      </div>

      {/* the counter-crossing: its BURST phase lands on the cut, so the shot
          is accelerating out rather than settling (§23) */}
      <Cross f={f} from={-300} to={1180} a={dur - 13} b={dur + 60} y={766} i={14} size={262} z={59} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S5 — "It's called the judge loop."
   THE WELL, WIDE — the whole chamber seen for the first time. The bench lamp
   strikes and the room fills in from the head DOWN, so the reveal has an order.
   ⛔ THE CALMEST FRAME IN THE REEL, ON PURPOSE. Density is a SHAPE, and this is
   the settle before S6's trough and S7's flood.
   ========================================================================= */
const S5_LAMP = 5, S5_BENCH = 13, S5_TABLES = 15, S5_BOARD = 22;
export const S5: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const on = (at: number) => E(f, at, at + 5, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.42} glow={hexa(BRS, 0.20)}>
      <Chamber p={p} f={f} lit={0.6 + on(S5_LAMP) * 0.4} occ="both" bays={5}
        shaft={506} shaftO={0.30} rakeRate={RK[v].rate * 0.8} rakeN={RK[v].n} panelN={9} rail dais dim={0.34} />
            <Pool x={506} y={520} w={980} c="#FFF6E2" o={0.18 + on(S5_LAMP) * 0.16} z={12} />
      <CutIn f={f} dx={0} dy={-680} at={9} z={50}>
        <BenchDesk x={506} y={478} w={560} h={180} z={50} lit={on(S5_LAMP)} />
      </CutIn>
      {/* the two tables, arriving after the bench — the room builds head-down */}
      {[[268, C_PROS], [744, C_DEF]].map(([tx, tc], i) => (
        <div key={"tb" + i} style={{ position: "absolute",
          left: (tx as number) - 150 + E(f, S5_TABLES + i * 4 - 9, S5_TABLES + i * 4, i ? 620 : -620, 0, IN_Q)
                + settle(f, S5_TABLES + i * 4, 10, 11, 2.3),
          top: 634, width: 300, height: 120, zIndex: 52,
          background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.42)} 100%)`,
          borderTop: `5px solid ${mxh(OAKL, 0.3)}`, boxShadow: SH_D }} />
      ))}
      {/* the docket board at the head — the reel's ONE text chip for this shot */}
      <div style={{ position: "absolute", left: 316,
        top: 236 + E(f, S5_BOARD - 9, S5_BOARD, -300, 0, IN_Q) + settle(f, S5_BOARD, 8, 11, 2.3),
        width: 380, height: 74, zIndex: 70, opacity: f >= S5_BOARD - 9 ? 1 : 0, borderRadius: 6,
        background: `linear-gradient(178deg, ${BRSL} 0%, ${BRS} 44%, ${BRSD} 100%)`,
        border: `4px solid ${dkh(BRSD, 0.44)}`, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...mono(27, 900), color: "#241B0C", letterSpacing: 4 }}>{R.loopName}</span>
      </div>
      {f >= S5_LAMP && <Ring x={506} y={330} f={f} at={S5_LAMP} c={C_JUDGE} z={68} s={2.2} dur={30} />}
      {[S5_BENCH, S5_TABLES, S5_BOARD].map((at, i) => (
        f >= at ? <Puff key={"p" + i} x={[506, 268, 316][i]} y={[560, 700, 320][i]} f={f} at={at}
          n={9} s={1.3} c="#CFC4AE" z={66} /> : null
      ))}
      {[180, 880].map((gx, i) => (
        <Crew key={"g" + i} f={f} x={gx} y={700} i={i + 5} size={190} z={54} at={-8} loop={3} />
      ))}
      <Motes x={506} y={300} w={900} h={420} n={13} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Cross f={f} from={-220} to={1180} a={-18} b={dur + 34} y={716} i={2} size={262} z={58} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the shot
          is accelerating out rather than settling (§23) */}
      <Cross f={f} from={1180} to={-300} a={dur - 13} b={dur + 60} y={766} i={14} size={262} z={59} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S6 — "Instead of doing the normal back and forth chats,"
   THE INTERVIEW ROOM — the smallest, dimmest place in the reel. One sheet is
   pushed across a narrow table and pushed straight back, four times, each faster,
   over a worn groove in the wood. Nothing resolves.
   ⛔ A DESIGNED TROUGH. Density is a SHAPE, not a level (§9): this is what makes
   S7's flood land.
   ⭐ AND THE PICTURE IS THE VO'S OWN VERB — "back and forth" is drawn as a thing
   travelling back, and forth.
   ========================================================================= */
const S6_P1 = 3, S6_P2 = 16, S6_P3 = 22, S6_P4 = 31, S6_P5 = 36;
export const S6: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("cell");
  const PASS = [S6_P1, S6_P2, S6_P3, S6_P4, S6_P5];
  /* the sheet's x, as a sum of discrete strokes — never one ramp */
  const sx = PASS.reduce((acc, at, i) =>
    acc + stroke(f, at, i % 2 ? -300 : 300, Math.max(3, 7 - i)), -150);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.04]} vig={0.46} glow={hexa("#C9BC9A", 0.14)}>
      <Chamber p={p} f={f} lit={0.5} occ="both" bays={0} shaft={506} shaftO={0}
        panelN={5} rail={false} horizonDy={30} dim={0.4} />
      {/* ONE hanging lamp, and everything outside its cone is black */}
      <div style={{ position: "absolute", left: 498, top: 0, width: 16, height: 176, zIndex: 30,
        background: dkh(OAK, 0.5) }} />
      <div style={{ position: "absolute", left: 446, top: 168, width: 120, height: 52, zIndex: 32,
        borderRadius: "50% 50% 12% 12%",
        background: `linear-gradient(178deg, ${dkh(OAK, 0.2)} 0%, #F6E8C4 84%)` }} />
      <Beam x={506} y={214} top={90} bot={700} len={470} c="#FFF0CE" o={0.44} z={20} f={f} />
      <Pool x={506} y={584} w={860} c="#FFF0CE" o={0.50} z={22} />
      {/* the narrow table, with the GROOVE this has worn into it */}
      <CutIn f={f} dx={0} dy={-720} at={7} z={50}>
        <div style={{ position: "absolute", left: 236, top: 578, width: 540, height: 130,
          zIndex: 50, background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.5)} 100%)`,
          boxShadow: SH_D }} />
        <div style={{ position: "absolute", left: 266, top: 590, width: 480, height: 9, zIndex: 51,
          borderRadius: 5, background: hexa("#000", 0.42) }} />
      </CutIn>
      <div style={{ position: "absolute", left: 506 + sx - 66, top: 548, width: 132, height: 54,
        zIndex: 68, borderRadius: 5, boxShadow: SH,
        background: `linear-gradient(172deg, ${mxh(BLOCKS[0], 0.28)} 0%, ${BLOCKS[0]} 46%, ${dkh(BLOCKS[0], 0.4)} 100%)`,
        border: `3px solid ${dkh(BLOCKS[0], 0.5)}` }} />
      <Contact x={158} y={696} w={200} z={44} o={0.4} />
      <Contact x={676} y={696} w={200} z={44} o={0.4} />
      <Hero f={f} x={258} y={704} size={312} z={52} costume={{}} tint={CLAY}
        act={1} ph={0.1} drive={0.16 * Math.sin(f / 5)} reach={40} />
      <Hero f={f} x={776} y={704} size={312} z={52} costume={{ glasses: 1 }} tint={CLAY}
        flip act={1} ph={2.4} drive={-0.16 * Math.sin(f / 5)} reach={40} />
      <Motes x={506} y={340} w={520} h={360} n={10} f={f} z={80} c={mxh("#C9BC9A", 0.2)} />
      {/* even the trough gets a mover — but it is the LIGHT, not a body: this
          room is deliberately the emptiest in the reel */}
      <div style={{ position: "absolute", left: E(f, -22, dur + 36, -420, 1180, LIN), top: 300,
        width: 300, height: 500, zIndex: 18, transform: "skewX(-14deg)",
        background: `linear-gradient(90deg, ${hexa("#F6E8C4", 0)} 0%, ${hexa("#F6E8C4", 0.20)} 48%, ${hexa("#F6E8C4", 0)} 100%)` }} />

    </Scene>
  );
};

/* =========================================================================
   S7 — "you give Claude a task and tell it to spawn a team of elite sub-agents."
   THE DOORS BANG OPEN and the firm comes through in three waves.
   ⭐ THE ARRIVALS ARE ON THE WORDS — "spawn" f39, "team" f45, "elite" f54,
   "sub-agents" f73 — not on a metronome, and they are spread across the FULL
   91 frames so the back half is not dead.
   ⛔ ALL TWELVE COSTUME LEVERS, cycled deterministically by `costumeFor(i)`.
   Reel 107 shipped four and was told so directly.
   ========================================================================= */
const S7_TASK = 3, S7_PICK = 21, S7_BANG = 39, S7_W2 = 45, S7_W3 = 54, S7_LAST = 73;
export const S7: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("doors");
  const open = E(f, S7_BANG, S7_BANG + 6, 0, 1, BACK);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.12]} vig={0.40} glow={hexa("#F0DCA8", 0.22)}>
      <Chamber p={p} f={f} lit={0.7 + open * 0.3} occ="both" bays={4} shaft={506}
        shaftO={0.22} rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={8} rail={false} dim={0.26} />
      <BlockLine f={f} y={296} z={30} rate={RK[v].rate * 1.5} n={7} s={1.5} />
      {/* the corridor light behind the doors — they enter as silhouettes and
          resolve into clay as they cross it */}
      <div style={{ position: "absolute", left: 306, top: 130, width: 400, height: 400,
        zIndex: 22, opacity: open,
        background: `linear-gradient(178deg, #FFFBEE 0%, #F2E0B0 70%, #D6C08C 100%)` }} />
      {/* ⛔ WHAT LIES BEYOND THE DOOR. Without it an opening is a lit rectangle,
          and [[feedback_a_lit_rectangle_is_a_screen]] is explicit that moving it
          never helps because the SHAPE is the bug: a hole reads because the room
          STOPS at it. Steps and roofs beyond, figures crossing, real mullions,
          and a stone lintel over the head. */}
      <div style={{ position: "absolute", left: 306, top: 130, width: 400, height: 400,
        zIndex: 25, overflow: "hidden" }}>
        {[0.16, 0.46, 0.76].map((k, i) => (
          <div key={"sk" + i} style={{ position: "absolute", left: 400 * k - 44, bottom: 0,
            width: 96 + i * 36, height: 400 * (0.28 + i * 0.13),
            background: `linear-gradient(180deg, ${hexa("#8C7A55", 0.40)} 0%, ${hexa("#5E5033", 0.60)} 100%)` }} />
        ))}
        {[0, 1].map(i => {
          const px = ((f * (2.1 + i * 1.1) + i * 230) % (400 + 200)) - 100;
          return (
            <div key={"pz" + i} style={{ position: "absolute", left: px, bottom: 0,
              width: 50, height: 104, borderRadius: 7, background: hexa("#33290F", 0.52) }} />
          );
        })}
      </div>
      {[0.34, 0.68].map((k, i) => (
        <div key={"ml" + i} style={{ position: "absolute", left: 306 + 400 * k - 6, top: 130,
          width: 12, height: 400, zIndex: 27, background: dkh(OAK, 0.30) }} />
      ))}
      <div style={{ position: "absolute", left: 306 - 18, top: 130 - 24, width: 400 + 36,
        height: 28, zIndex: 28,
        background: `linear-gradient(180deg, ${mxh(PLASTER, 0.18)} 0%, ${PLASTERD} 100%)` }} />

      <Pool x={506} y={556} w={900} c="#FFF9E8" o={0.16 + open * 0.26} z={26} />
      {/* the two door leaves, swinging OUT past the frame edge */}
      {[-1, 1].map(sd => (
        <div key={"dr" + sd} style={{ position: "absolute",
          left: 506 + sd * 200 - (sd < 0 ? 200 : 0), top: 130, width: 200, height: 404,
          zIndex: 34, transformOrigin: sd < 0 ? "0% 50%" : "100% 50%",
          transform: `perspective(900px) rotateY(${sd * open * 74}deg)`,
          background: `linear-gradient(96deg, ${OAKL} 0%, ${dkh(OAK, 0.44)} 100%)`,
          borderTop: `6px solid ${mxh(OAKL, 0.24)}` }} />
      ))}

      {/* the TASK lands on the table first — the trigger, and it is a BODY that
          picks it up */}
      <CutIn f={f} dx={0} dy={-600} at={8} z={50}>
        <div style={{ position: "absolute", left: 96, top: 640, width: 300, height: 110,
          zIndex: 50, background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.44)} 100%)` }} />
      </CutIn>
      {f < S7_PICK && (
        <div style={{ position: "absolute", left: 180 + E(f, S7_TASK - 8, S7_TASK, -320, 0, IN_Q),
          top: 592 + (f >= S7_TASK ? settle(f - S7_TASK, 0, 8, 11, 2.3) : 0),
          width: 132, height: 54, zIndex: 68, borderRadius: 5, boxShadow: SH,
          background: `linear-gradient(172deg, ${mxh(BLOCKS[2], 0.28)} 0%, ${BLOCKS[2]} 46%, ${dkh(BLOCKS[2], 0.4)} 100%)`,
          border: `3px solid ${dkh(BLOCKS[2], 0.5)}` }} />
      )}
      {/* the same shutter idea on the inside face of the double doors */}
      <div style={{ position: "absolute", left: 196, top: 100,
        width: 620, height: 640 * Math.max(0, E(f, -3, 22, 1, 0, LIN)), zIndex: 36,
        background: `linear-gradient(180deg, ${dkh(OAK, 0.16)} 0%, ${dkh(OAK, 0.5)} 100%)`,
        borderBottom: `8px solid ${BRSD}` }} />
      {f >= S7_TASK && <Ring x={246} y={640} f={f} at={S7_TASK} c={BRSL} z={70} s={0.7} />}
      {f >= S7_BANG && <Ring x={506} y={430} f={f} at={S7_BANG} c="#FFF9E8" z={72} s={2.0} dur={30} />}
      {f >= S7_BANG && <Puff x={506} y={560} f={f} at={S7_BANG} n={16} s={1.9} c="#CFC4AE" z={70} />}

      {/* THE FIRM — eight suited Claudes in three waves, on the words */}
      {[
        [S7_BANG, 300, 0], [S7_BANG + 2, 706, 1],
        [S7_W2, 190, 2], [S7_W2 + 3, 430, 3], [S7_W2 + 6, 838, 4],
        [S7_W3, 590, 5], [S7_W3 + 4, 106, 6],
        [S7_LAST, 906, 7],
      ].map(([at, x, i], k) => (
        <Crew key={"fm" + k} f={f} x={x as number} y={700 + ((i as number) % 2) * 12}
          i={i as number} size={208} z={56 + (k % 3)} at={at as number}
          loop={[1, 0, 3, 1][(i as number) % 4]} />
      ))}
      {chip("A TEAM, FROM ONE LINE", 150, BRSL)}
      <Motes x={506} y={300} w={860} h={400} n={14} f={f} z={82} c={mxh("#FFF0C8", 0.3)} />
      <Cross f={f} from={-240} to={1180} a={-18} b={dur + 34} y={730} i={10} size={262} z={58} />

    </Scene>
  );
};

/* =========================================================================
   S8 — "But the secret sauce is in the third line of the prompt,"
   THE CLERK'S DESK, STRAIGHT DOWN onto a three-line docket under a lamp.
   ⛔ NOT 118's vertical lectern slab. A document, flat, seen from above — a
   different object, a different geometry and a different camera.
   ⭐ Line 3 arrives as discrete letter-blocks on "third" and "line", never a fade.
   ========================================================================= */
const S8_TURN = 9, S8_L3A = 40, S8_L3B = 46, S8_STAMP = 58;
export const S8: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  const lines = 2 + E(f, S8_L3A, S8_L3B + 8, 0, 1, LIN);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.52} glow={hexa(GOLD, 0.20)}>
      <Chamber p={p} f={f} lit={0.55} occ="both" bays={0} shaft={506} shaftO={0}
        panelN={6} rail={false} horizonDy={90} dim={0.4} />
      {/* ⛔ S8 MEASURED 4.43 TWICE, AND THE SECOND TIME WAS BECAUSE THE FIX NEVER
          REACHED THE FILE: the patch anchored on a Pool opacity a previous edit
          had already changed, `str.replace` matched nothing, and the script
          printed "rebuilt" anyway ([[feedback_a_silent_patch_reports_success]]).
          An identical audit number after a real edit means the edit is not in
          the frame — assert the anchor, then grep the new text.
          THE ACTUAL DEFECT: `motion ~ (fraction of the panel repainted per 0.1s)
          x (luma delta)`, and a 600px sheet with 13px letter-blocks appearing
          repaints almost nothing. Three arithmetic fixes: the sheet goes to
          780px (59% -> 77% of panel width), the third line lands as SIX large
          blocks that each travel in from off-frame, and the desk lamp SWINGS
          across the page — a travelling high-contrast band is the biggest lever
          in the measured table. */}
      {(() => {
        const sw = E(f, 0, dur + 10, -230, 250, LIN);   /* LIN: still travelling at the cut */
        return (<>
          <Beam x={506 + sw} y={100} top={140} bot={760} len={520} c="#FFF6D8" o={0.34} z={20} f={f} />
          <Pool x={506 + sw} y={470} w={820} c="#FFF6D8" o={0.34} z={22} />
        </>);
      })()}
      <CutIn f={f} dx={0} dy={-640} at={9} z={62}>
  <Console x={506} y={470} f={f} w={720} z={62}
        slots={f >= S8_L3B ? 3 : f >= S8_L3A ? 2 : 1}
        keys={[S8_L3A, S8_L3A + 5, S8_L3B + 4]} />
      </CutIn>
      {f >= S8_L3A - 10 && [0, 1, 2, 3, 4, 5].map(i => {
        const at = S8_L3A + i * 3;
        if (f < at - 10) return null;
        const dx = E(f, at - 10, at, -760, 0, IN_Q) + settle(f, at, 9, 10, 2.2);
        return (
          <div key={"lb" + i} style={{ position: "absolute", left: 168 + i * 116 + dx, top: 604,
            width: 100, height: 36, zIndex: 72, borderRadius: 3,
            background: `linear-gradient(178deg, ${C_JUDGE} 0%, ${dkh(C_JUDGE, 0.34)} 100%)`,
            border: `3px solid ${dkh(C_JUDGE, 0.5)}` }} />
        );
      })}
      {f >= S8_TURN && f < S8_TURN + 20 &&
        <Puff x={506} y={470} f={f} at={S8_TURN} n={7} s={1.0} c="#CFC4AE" z={70} />}
      {[S8_L3A, S8_L3B].map((at, i) => (
        f >= at && f < at + 18
          ? <Ring key={"k" + i} x={430 + i * 90} y={520} f={f} at={at} c={C_JUDGE} z={74} s={0.6} dur={17} />
          : null
      ))}
      {f >= S8_STAMP && <Ring x={700} y={594} f={f} at={S8_STAMP} c={C_PROS} z={80} s={1.0} />}
      {/* ⭐ THE OUTPUT HALF: the three roles break out of line 3 and fly to their
          positions. §10 — "too plain" is usually half a mechanism, and the half
          that was missing here is what the line PRODUCES. */}
      {[[C_JUDGE, 506, -260], [C_PROS, 170, 250], [C_DEF, 850, 250]].map(([c, tx, ty], i) => {
        const at = S8_L3B + 2 + i * 4;
        if (f < at) return null;
        const k = E(f, at, at + 26, 0, 1, IN_Q);
        const x = 400 + i * 116 + ((tx as number) - 400 - i * 116) * k;
        const y = 604 + ((ty as number) - 604 + 604) * 0 + ((ty as number) - 604) * k;
        return (
          <div key={"rm" + i} style={{ position: "absolute", left: x - 54, top: y - 54,
            width: 108, height: 108, borderRadius: 8, zIndex: 84,
            transform: `rotate(${k * (i - 1) * 26}deg) scale(${1 + k * 0.35})`,
            background: `linear-gradient(178deg, ${mxh(c as string, 0.25)} 0%, ${c} 48%, ${dkh(c as string, 0.36)} 100%)`,
            border: `4px solid ${dkh(c as string, 0.5)}`, boxShadow: SH }} />
        );
      })}
      {chip("LINE 3 IS THE ONE", 150, C_JUDGE)}
      <Motes x={506} y={330} w={640} h={380} n={11} f={f} z={80} c={mxh("#F3E6C6", 0.28)} />
      {/* the clerk's hand comes across the page and STAYS crossing at the cut */}
      <div style={{ position: "absolute", left: E(f, 20, 96, -300, 700, LIN), top: 660,
        width: 240, height: 120, zIndex: 76, borderRadius: 14,
        background: `linear-gradient(178deg, ${mxh(CLAY, 0.12)} 0%, ${dkh(CLAY, 0.22)} 100%)` }} />

    </Scene>
  );
};

/* =========================================================================
   S9 — "where you assign a judge, a prosecutor, and a defense."
   ⭐⭐⭐ THE IDENTITY SCENE. Three brass nameplates SLAM into three positions ON
   THE WORDS, each throwing its own light pool, and a Claude arrives into each
   position with its plate. The room is built by the plates.
   ⭐ This is the beat neither 118 nor 128 has: THREE roles, and two of them are
   on opposite sides of the floor.
   ========================================================================= */
const S9_JUDGE = 16, S9_PROS = 26, S9_DEF = 46;
export const S9: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const lit = (at: number) => E(f, at, at + 6, 0, 1, OUT);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.14]} vig={0.44} glow={hexa(BRS, 0.20)}>
      <Chamber p={p} f={f} lit={0.5 + (lit(S9_JUDGE) + lit(S9_PROS) + lit(S9_DEF)) * 0.17}
        occ="both" bays={5} shaft={506} shaftO={0.24} rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={9} rail dais dim={0.34} />
      <BlockLine f={f} y={296} z={30} rate={RK[v].rate * 1.5} n={8} s={1.5} />
      <CutIn f={f} dx={0} dy={-680} at={7} z={50}>
  <BenchDesk x={506} y={452} w={520} h={168} z={50} lit={lit(S9_JUDGE)} />
      </CutIn>
      {[[268, C_PROS, S9_PROS], [744, C_DEF, S9_DEF]].map(([tx, tc, at], i) => (
        <div key={"tb" + i} style={{ position: "absolute", left: (tx as number) - 152,
          top: 638, width: 304, height: 124, zIndex: 52,
          background: `linear-gradient(174deg, ${lerpHex(dkh(OAKL, 0.42), OAKL, lit(at as number))} 0%, ${dkh(OAK, 0.5)} 100%)`,
          borderTop: `5px solid ${mxh(OAKL, 0.3)}`, boxShadow: SH_D }} />
      ))}
      {/* the three plates, on the three words */}
      <Nameplate x={506} y={352} f={f} at={S9_JUDGE} t="JUDGE" c={C_JUDGE} w={250} z={78} />
      <Nameplate x={268} y={632} f={f} at={S9_PROS} t="PROSECUTOR" c={C_PROS} w={286} z={78} />
      <Nameplate x={744} y={632} f={f} at={S9_DEF} t="DEFENSE" c={C_DEF} w={250} z={78} />
      {/* and a body arrives into each position WITH its plate */}
      <Crew f={f} x={506} y={442} i={9} size={286} z={48} at={S9_JUDGE + 2} loop={3}
        tint={dkh(C_JUDGE, 0.20)} />
      <Crew f={f} x={268} y={700} i={2} size={252} z={54} at={S9_PROS + 2} loop={1} />
      <Crew f={f} x={744} y={700} i={7} size={252} z={54} at={S9_DEF + 2} loop={1} flip />
      <Motes x={506} y={300} w={900} h={420} n={13} f={f} z={82} c={mxh("#F3E6C6", 0.3)} />
      <Cross f={f} from={-260} to={1180} a={-18} b={dur + 34} y={744} i={12} size={262} z={57} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S10 — "The prosecutor builds a case for everything wrong with your work,"
   THE PROSECUTION TABLE. He STACKS charge cards, one hammered on per beat, and
   on "work" three red flags are driven into the board — one of them into THE
   DARK BAY that S1 left empty.
   ⭐ "BUILDS A CASE" IS THE VO'S OWN VERB, so the picture is a thing being BUILT:
   four discrete lands beat one growing tween 5.63 to 4.27 on the same frames.
   ========================================================================= */
const S10_C1 = 15, S10_C2 = 25, S10_C3 = 34, S10_C4 = 45, S10_FLAGS = 61;
export const S10: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("pros");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.46} glow={hexa(C_PROS, 0.20)}>
      <Chamber p={p} f={f} lit={1} occ="r" bays={3} shaft={210} shaftO={0.30}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={7} rail={false} dim={0.34} />
            <Pool x={300} y={556} w={820} c="#FFE9CE" o={0.26} z={12} />
      {/* the work, standing behind the table — still missing leaf 1 */}
      <Contact x={742 - 168} y={716 - 10} w={336} z={44} o={0.46} />
      <CutIn f={f} dx={0} dy={-720} at={8} z={58}>
        <UnitStack x={742} y={730} f={f} w={330} z={58}
          blocks={[0, 1, 2, 3, 5]}
          out={{ 1: S10_C1, 3: S10_C2, 5: S10_C3 }}
          lit={f < S10_C3 ? 1 : 0}
          lean={E(f, S10_C1, S10_C1 + 12, 0, 2.4, OUT) + E(f, S10_C2, S10_C2 + 12, 0, 3.4, OUT)
              + E(f, S10_C4, S10_C4 + 14, 0, 4.6, OUT)}
          spikes={f >= S10_FLAGS ? [[0, S10_FLAGS], [2, S10_FLAGS + 5], [4, S10_FLAGS + 10]] : []} />
      </CutIn>
      {/* the table */}
      <CutIn f={f} dx={0} dy={-600} at={9} z={50}>
        <div style={{ position: "absolute", left: 60, top: 640, width: 460, height: 130,
          zIndex: 50, background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.46)} 100%)`,
          borderTop: `5px solid ${mxh(OAKL, 0.3)}`, boxShadow: SH_D }} />
      </CutIn>
      {/* ⛔ "BUILDS A CASE" WAS DRAWN AS A STACK OF PAPER CHARGE CARDS. The ACTOR
          is not a filing clerk, he is somebody TAKING THE THING APART: each beat
          is a course knocked clean out of the stack, and the courses above it are
          left standing on nothing. [[feedback_the_metric_makes_paper]] */}
      {[S10_C1, S10_C2, S10_C3, S10_C4].map((at, i) => (
        f >= at && f < at + 22
          ? <Puff key={"kp" + i} x={742} y={640 - i * 40} f={f} at={at} n={10} s={1.3}
              c="#CFC4AE" z={72} />
          : null
      ))}
      {[S10_C1, S10_C2, S10_C3, S10_C4].map((at, i) => (
        f >= at && f < at + 20
          ? <Ring key={"r" + i} x={290} y={636 - i * 40} f={f} at={at} c={C_PROS} z={76} s={0.7} dur={18} />
          : null
      ))}
      {f >= S10_FLAGS && <Puff x={742} y={430} f={f} at={S10_FLAGS} n={10} s={1.2} c="#CFC4AE" z={72} />}
      <Contact x={106} y={686} w={210} z={44} o={0.42} />
      <Hero f={f} x={212} y={694} size={326} z={52} costume={{ suit: 1 }} tint={CLAY}
        stern={0.7} act={1} ph={0.5}
        drive={[S10_C1, S10_C2, S10_C3, S10_C4].reduce((a, at) => a + stroke(f, at - 4, 0.42, 5) - stroke(f, at + 1, 0.42, 7), 0)}
        reach={70} />
      {chip("THE CASE AGAINST IT", 150, C_PROS)}
      <Motes x={400} y={330} w={700} h={420} n={12} f={f} z={82} c={mxh("#FFD9B4", 0.3)} />
      <Cross f={f} from={1180} to={-240} a={-18} b={dur + 34} y={730} i={11} size={262} z={58} stack={4} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the
          scene is accelerating out rather than settling (§23) */}
      <Cross f={f} from={1180} to={-280} a={dur - 13} b={dur + 60} y={762} i={13} size={252} z={59} stack={2} />

      {/* the knocked-out courses pile at his feet, and the last one is still
          travelling when the scene cuts (§23) */}
      <div style={{ position: "absolute", inset: 0, zIndex: 71,
        transform: `translate(${E(f, dur - 24, dur + 34, 0, -760, IN_Q)}px, ${E(f, dur - 24, dur + 34, 0, -90, IN_Q)}px)` }}>
        {[0, 1, 2].map(i => (
          <div key={"kd" + i} style={{ position: "absolute", left: 210 + i * 26, top: 690 - i * 46,
            width: 132, height: 44, borderRadius: 5, zIndex: 71, boxShadow: SH,
            transform: `rotate(${(i - 1) * 5}deg)`,
            background: `linear-gradient(172deg, ${mxh(BLOCKS[i * 2], 0.26)} 0%, ${BLOCKS[i * 2]} 46%, ${dkh(BLOCKS[i * 2], 0.42)} 100%)`,
            border: `3px solid ${dkh(BLOCKS[i * 2], 0.5)}` }} />
        ))}
      </div>

    </Scene>
  );
};

/* =========================================================================
   S11 — "the defense argues back,"
   THE DEFENSE TABLE — the MIRROR of S10, framed from the other side and keyed
   from the right. ONE hard event: the stack is swept sideways and comes apart
   across the frame.
   ⛔ THE SHORTEST SCENE IN THE REEL (24f) AND THE ONLY ONE THAT ANSWERS THE ONE
   BEFORE IT. Fast on purpose — a rebuttal is a snap, not a build.
   ========================================================================= */
const S11_TURN = 2, S11_SWING = 10, S11_SWEEP = 13;
export const S11: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("def");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.09]} vig={0.44} glow={hexa(C_DEF, 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="l" bays={3} shaft={800} shaftO={0.30}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={7} rail={false} dim={0.34} />
      <BlockLine f={f} y={296} z={30} rate={RK[v].rate * 1.5} n={7} s={1.5} />
      <Pool x={720} y={556} w={820} c="#E6F6EE" o={0.24} z={12} />
      <CutIn f={f} dx={0} dy={-640} at={7} z={50}>
        <div style={{ position: "absolute", left: 492, top: 640, width: 460, height: 130,
          zIndex: 50, background: `linear-gradient(174deg, ${OAKL} 0%, ${dkh(OAK, 0.46)} 100%)`,
          borderTop: `5px solid ${mxh(OAKL, 0.3)}`, boxShadow: SH_D }} />
      </CutIn>
      <CutIn f={f} dx={0} dy={-680} at={8} z={70}>
        <UnitStack x={700} y={730} f={f} w={330} z={70}
          blocks={[0, 2, 4]} seat={{ 1: S11_SWEEP, 3: S11_SWEEP + 3, 5: S11_SWEEP + 6 }}
          lit={f >= S11_SWEEP ? 1 : 0}
          lean={E(f, 0, S11_SWEEP, 5.5, 0, OUT)} />
      </CutIn>
      {f >= S11_SWEEP && <Ring x={700} y={560} f={f} at={S11_SWEEP} c={C_DEF} z={78} s={1.5} dur={24} />}
      {f >= S11_SWEEP && <Puff x={700} y={600} f={f} at={S11_SWEEP} n={13} s={1.5} c="#CFC4AE" z={74} />}
      <Contact x={796} y={686} w={210} z={44} o={0.42} />
      <Hero f={f} x={892} y={694} size={330} z={52} costume={{ suit: 1, glasses: 1 }}
        tint={CLAY} flip act={1} ph={0.9}
        drive={stroke(f, S11_SWING, 0.9, 4) - stroke(f, S11_SWEEP + 3, 0.9, 8)} reach={110} />
      {chip("AND SOMEBODY PUSHES BACK", 150, C_DEF)}
      <Motes x={600} y={330} w={700} h={420} n={11} f={f} z={82} c={mxh("#CFEAE0", 0.3)} />
      <Cross f={f} from={-260} to={1180} a={-18} b={dur + 34} y={748} i={1} size={262} z={57} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S12 — "and the judge rules on the evidence,"
   THE BENCH, FROM BELOW. The only low angle besides S13.
   ⭐ THE BENCH LAMP IS THE KEY AND IT MOVES ONTO THE EVIDENCE — the light does
   the "rules on". §10: a beam needs a FINDING; a scan that surfaces nothing is
   a progress bar.
   ========================================================================= */
const S12_RISE = 7, S12_GAVEL = 14, S12_READ = 30;
export const S12: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench");
  const swing = E(f, S12_READ, S12_READ + 7, 0, 1, IO);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.07]} vig={0.48} glow={hexa(C_JUDGE, 0.22)}>
      <Chamber p={p} f={f} lit={0.9} occ="both" bays={5} shaft={506} shaftO={0.22}
        rakeRate={RK[v].rate * 0.8} rakeN={RK[v].n} panelN={9} rail={false} dais dim={0.38} />
      {/* the bench lamp, and the cone it throws — it SWINGS onto the evidence */}
      <Beam x={506 - swing * 250} y={300} top={140} bot={620} len={430} c={mxh(C_JUDGE, 0.4)}
        o={0.30} z={22} f={f} />
      <Pool x={506 - swing * 250} y={676} w={640} c={mxh(C_JUDGE, 0.4)} o={0.40} z={24} />
      <CutIn f={f} dx={0} dy={-720} at={9} z={50}>
  <BenchDesk x={506} y={618} w={760} h={250} z={50} lit={1} />
      </CutIn>
      <Block x={760} y={598} s={1.15} z={66} />
      <Gavel x={790} y={598} f={f} at={S12_GAVEL} s={1.15} z={72} />
      {f >= S12_GAVEL && <Ring x={760} y={584} f={f} at={S12_GAVEL} c={C_JUDGE} z={76} s={1.3} dur={26} />}
      {f >= S12_GAVEL && <Puff x={760} y={598} f={f} at={S12_GAVEL} n={11} s={1.3} c="#CFC4AE" z={70} />}
      {/* the judge rises INTO frame behind the bench */}
      <Hero f={f} x={430} y={628} size={360} z={48} costume={{ prof: 1 }} tint={CLAY}
        stern={0.85} act={3} ph={0.2}
        lift={E(f, S12_RISE, S12_RISE + 8, 0, 76, BACK)} />
      {/* the evidence, under the swinging light — and the flags are READ off it */}
      <Contact x={216 - 130} y={716 - 8} w={260} z={44} o={0.44} />
      <UnitStack x={216} y={716} f={f} w={232} z={58} blocks={[0, 1, 2, 3, 5]} lit={0}
        spikes={[[0, -30], [2, -26], [4, -22]]} lean={2.2} />
      {[0, 1, 2].map(i => (
        f >= S12_READ + i * 4 && f < S12_READ + i * 4 + 16
          ? <Ring key={"rd" + i} x={180 + i * 42} y={600} f={f} at={S12_READ + i * 4} c={RED}
              z={80} s={0.45} dur={15} />
          : null
      ))}
      <Motes x={506} y={300} w={880} h={420} n={12} f={f} z={82} c={mxh(C_JUDGE, 0.3)} />
      <Cross f={f} from={1180} to={-260} a={-18} b={dur + 34} y={760} i={0} size={262} z={57} stack={3} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the
          scene is accelerating out rather than settling (§23) */}
      <Cross f={f} from={-280} to={1180} a={dur - 13} b={dur + 60} y={762} i={13} size={252} z={59} stack={2} />

      {/* the counter-crossing: its BURST phase lands on the cut, so the shot
          is accelerating out rather than settling (§23) */}
      <Cross f={f} from={-300} to={1180} a={dur - 13} b={dur + 60} y={766} i={14} size={262} z={59} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S13 — "so they loop and rebuild until the work is bulletproof."
   ⭐⭐⭐ THE PEAK. Three passes, each faster than the last; pass 3 fills THE DARK
   BAY that has been empty since S1. Then the gavel comes down ON THE WORK and it
   does NOT break — the strike rings off it and the gavel RECOILS.
   ⛔ AND THE HOLLOW SHELL FROM THE HOOK IS ON THE EVIDENCE SHELF BEHIND, STILL
   HOLLOW. The villain is caught, never abolished.
   ========================================================================= */
const S13_P1 = 9, S13_P2 = 23, S13_P3 = 43, S13_HIT = 53;
export const S13: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const hit = f >= S13_HIT ? Math.max(0, 1 - (f - S13_HIT) / 16) : 0;
  return (
    <Scene p={p} slug="" push={[0, dur, 1.16]} vig={0.40} glow={hexa(C_JUDGE, 0.24)}>
      <Chamber p={p} f={f} lit={1} occ="both" bays={5} shaft={506} shaftO={0.34}
        rakeRate={RK[v].rate * 1.2} rakeN={RK[v].n} panelN={9} rail dais horizonDy={38} dim={0.28} />
      <BlockLine f={f} y={296} z={30} rate={RK[v].rate * 1.5} n={8} s={1.5} />
      <Pool x={506} y={600} w={980} c="#FFF6E2" o={0.28} z={12} />
      {/* ⛔ the villain, still on the shelf, still hollow */}
      {/* ⛔ THE VILLAIN, STILL THERE AND STILL DEAD. The original stack sits on a
          plinth behind the action — grey, courses missing, exactly as the hook
          left it. The loop does not abolish work that looks finished and isn't;
          it catches it. */}
      <div style={{ position: "absolute", left: 46, top: 502, width: 200, height: 16,
        zIndex: 34, background: `linear-gradient(180deg, ${OAKL} 0%, ${dkh(OAK, 0.5)} 100%)` }} />
      <UnitStack x={146} y={502} f={f} w={140} z={35} blocks={[0, 1, 4]} lit={0} lean={-3.5} />

      {/* THE WORK — pass 3 fills the bay S1 left dark */}
      <Contact x={560 - 186} y={734 - 10} w={372} z={44} o={0.48} />
      <CutIn f={f} dx={0} dy={-600} at={7} z={60}>
        <UnitStack x={560} y={748} f={f} w={372} z={60}
          blocks={[0, 1, 2]}
          seat={{ 3: S13_P1, 5: S13_P2, 4: S13_P3 }}
          lit={f >= S13_P3 ? 1 : 0} hit={hit}
          lean={E(f, 0, S13_P1, 4.5, 0, OUT)} />
      </CutIn>

      {/* the three rebuild passes — each faster, and each throws its own ring */}
      {[S13_P1, S13_P2, S13_P3].map((at, i) => (
        <React.Fragment key={"ps" + i}>
          {f >= at && f < at + 20 &&
            <Ring x={560} y={470} f={f} at={at} c={FACE} z={72} s={1.0 + i * 0.3} dur={20 - i * 3} />}
          {f >= at && <Puff x={560 + (i - 1) * 170} y={600} f={f} at={at} n={9} s={1.2} c="#CFC4AE" z={68} />}
        </React.Fragment>
      ))}

      {/* THE STRIKE THAT LEAVES NO MARK */}
      <Block x={560} y={396} s={0.9} z={64} />
      <Gavel x={588} y={396} f={f} at={S13_HIT} s={1.35} z={78} recoil />
      {f >= S13_HIT && <Ring x={560} y={430} f={f} at={S13_HIT} c={C_JUDGE} z={82} s={2.0} dur={30} />}
      {f >= S13_HIT && <Ring x={560} y={430} f={f} at={S13_HIT + 5} c={GREEN} z={82} s={1.5} dur={26} />}

      {[196, 856].map((gx, i) => (
        <Crew key={"g" + i} f={f} x={gx} y={704} i={i + 4} size={206} z={54} at={-8}
          loop={2} cheer={f >= S13_HIT ? 0.8 : 0} />
      ))}
      <Hero f={f} x={356} y={712} size={330} z={52} costume={{ suit: 1 }} tint={CLAY}
        cheer={f >= S13_HIT ? 0.9 : 0} act={2} ph={0.4} />
      {chip("IT TAKES THE HIT", 150, GREEN)}
      <Motes x={506} y={300} w={900} h={430} n={14} f={f} z={84} c={mxh("#F3E6C6", 0.3)} />
      <Cross f={f} from={-280} to={1180} a={-18} b={dur + 34} y={752} i={5} size={262} z={57} stack={3} />

    </Scene>
  );
};

/* =========================================================================
   S14 — "This burns through tokens fast,"
   THE FEE COUNTER. A hand sweeps the brass discs OFF the counter edge and they
   fall away. ⛔ NO CURRENCY FIGURE — the VO names none, and a number here reads
   as the price of the run just watched.
   ⚠️ THE ONE COLLISION WITH 128 I COULD NOT DESIGN OUT, because the VO says the
   word "tokens" and the rule is to use the subject's own noun. 128 fed arcade
   tokens INTO a slot to start a fight; this is a clerk's counter, a different
   actor, and they go the other way — OFF the edge, spent.
   ========================================================================= */
const S14_SWEEP = 6, S14_FAST = 14;
export const S14: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("counter");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.50} glow={hexa(GOLD, 0.20)}>
      <Chamber p={p} f={f} lit={0.75} occ="both" bays={3} shaft={300} shaftO={0.22}
        rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={6} rail={false} horizonDy={30} dim={0.4} />
      <Grille x={760} y={410} w={340} h={170} z={30} />
      <Pool x={430} y={578} w={700} c="#FFF0CE" o={0.24} z={12} />
      <Counter x={506} y={780} w={880} h={260} z={50} />
      <FeeStack x={420} y={520} f={f} sweep={S14_SWEEP} n={11} s={1.5} z={70} />
      <FeeStack x={560} y={520} f={f} sweep={S14_FAST} n={9} s={1.5} z={70} />
      {f >= S14_SWEEP && <Puff x={470} y={540} f={f} at={S14_SWEEP} n={8} s={1.0} c="#CFC4AE" z={72} />}
      <Contact x={776} y={690} w={200} z={44} o={0.4} />
      <Hero f={f} x={866} y={698} size={318} z={52} costume={{ girl: 1, glasses: 1 }}
        tint={CLAY} flip act={1} ph={1.2}
        drive={stroke(f, S14_SWEEP - 3, 0.8, 4) - stroke(f, S14_FAST, 0.8, 9)} reach={120} />
      <Motes x={470} y={340} w={640} h={380} n={11} f={f} z={80} c={mxh("#F3E6C6", 0.28)} />
      <Cross f={f} from={-260} to={1180} a={-18} b={dur + 34} y={744} i={3} size={262} z={57} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S15 — "so you should only build your basic prototype first"
   THE WORKBENCH. A plain, small board is put together fast and deliberately
   modestly — visibly SMALLER than the hero exhibit, no brass anywhere.
   ⛔ THE LEAST DRAMATIC FRAME IN THE REEL, ON PURPOSE. The advice is "keep it
   small", so the picture is small.
   ========================================================================= */
const S15_L1 = 13, S15_L2 = 27, S15_L3 = 35, S15_DONE = 47;
export const S15: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("bench2");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.08]} vig={0.44} glow={hexa("#CFD6CE", 0.16)}>
      <Chamber p={p} f={f} lit={0.9} occ="l" bays={3} shaft={430} shaftO={0.22}
        rakeRate={RK[v].rate * 0.9} rakeN={RK[v].n} panelN={6} rail={false} dim={0.34} />
            {(() => {
        const sw = E(f, 0, dur + 8, -280, 300, LIN);   /* the work-light travels */
        return (<>
          <Pool x={506 + sw} y={562} w={760} c="#F2F6F0" o={0.30} z={12} />
          <Beam x={506 + sw} y={110} top={130} bot={700} len={470} c="#EFF5EE" o={0.20} z={16} f={f} />
        </>);
      })()}
      {/* the parts arrive from off-frame — real distance, not a value tweened in
          place, and spread across the FULL duration so the back half is not dead */}
      {[S15_L1, S15_L2, S15_L3].map((at, i) => {
        if (f < at - 12) return null;
        const dx = E(f, at - 12, at, i % 2 ? 780 : -780, 0, IN_Q);
        const set = settle(f, at, 10, 11, 2.3);
        if (f > at + 2) return null;
        return (
          <div key={"pt" + i} style={{ position: "absolute", left: 452 + i * 46 + dx + set,
            top: 430, width: 84, height: 176, zIndex: 62, borderRadius: 3,
            background: `linear-gradient(168deg, #F4EEDC 0%, ${FACED} 100%)`,
            border: `2px solid ${dkh(FACED, 0.3)}` }} />
        );
      })}
      {/* the tool rack — the background process, always running */}
      {[0, 1, 2, 3, 4].map(i => (
        <div key={"tl" + i} style={{ position: "absolute", left: 690 + i * 52,
          top: 300 + Math.sin(f / (9 + i * 2) + i) * 9, width: 18, height: 96 + (i % 3) * 26,
          zIndex: 34, borderRadius: 3,
          background: `linear-gradient(180deg, #9AA29C 0%, #4E5451 100%)` }} />
      ))}
      <CutIn f={f} dx={0} dy={-640} at={8} z={50}>
        <div style={{ position: "absolute", left: 236, top: 636, width: 560, height: 128,
          zIndex: 50, background: `linear-gradient(174deg, #7C837E 0%, #3B403D 100%)`,
          borderTop: `5px solid #949B96`, boxShadow: SH_D }} />
      </CutIn>
      {/* the prototype: 300px against the hero board's 500 — visibly the small
          version, which is the whole point of the line */}
      <Contact x={520 - 118} y={706 - 8} w={236} z={44} o={0.44} />
      <CutIn f={f} dx={0} dy={-680} at={9} z={60}>
        <UnitStack x={520} y={724} f={f} w={248} z={60}
          blocks={[]} seat={{ 0: 4, 1: S15_L2, 2: S15_L3 }}
          lit={f >= S15_DONE ? 1 : 0} />
      </CutIn>
      {[S15_L1, S15_L2, S15_L3].map((at, i) => (
        f >= at && f < at + 16
          ? <Ring key={"s" + i} x={520} y={560} f={f} at={at} c="#E8EFE9" z={72} s={0.7} dur={16} />
          : null
      ))}
      {f >= S15_DONE && <Ring x={520} y={540} f={f} at={S15_DONE} c={GREEN} z={74} s={1.1} />}
      <Contact x={128} y={676} w={210} z={44} o={0.4} />
      <Hero f={f} x={232} y={684} size={322} z={52} costume={{ constr: 1 }} tint={CLAY}
        act={1} ph={0.7}
        drive={[S15_L1, S15_L2, S15_L3].reduce((a, at) => a + stroke(f, at - 4, 0.36, 5) - stroke(f, at + 2, 0.36, 8), 0)}
        reach={80} />
      {chip("SMALL VERSION FIRST", 150, "#CFD6CE")}
      <Motes x={506} y={330} w={780} h={420} n={11} f={f} z={82} c={mxh("#E2E8E3", 0.3)} />
      <Cross f={f} from={1180} to={-260} a={-18} b={dur + 34} y={740} i={9} size={262} z={58} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S16 — "and trigger the judge loop before your launch."
   THE WELL, and the back doors OPEN ONTO DAYLIGHT — the brightest frame in the
   reel. The prototype is set on the plinth, the three plates light in sequence,
   and on "launch" it goes out into the light.
   ========================================================================= */
const S16_SET = 6, S16_P1 = 16, S16_P2 = 22, S16_LAUNCH = 46;
export const S16: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("well");
  const day = E(f, S16_LAUNCH, S16_LAUNCH + 8, 0, 1, OUT);
  const out = E(f, S16_LAUNCH, 74, 0, 1, IN_Q);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.10]} vig={0.34} glow={hexa("#FFF3D2", 0.24)}>
      <Chamber p={p} f={f} lit={0.9 + day * 0.4} occ="l" bays={5} shaft={760}
        shaftO={0.28 + day * 0.16} rakeRate={RK[v].rate} rakeN={RK[v].n} panelN={9} rail dais dim={0.14} />
      <BlockLine f={f} y={296} z={30} rate={RK[v].rate * 1.5} n={7} s={1.5} />
      {/* the back doors, opening onto daylight on "launch" */}
      <div style={{ position: "absolute", left: 700, top: 168, width: 300, height: 330,
        zIndex: 24, opacity: day,
        background: `linear-gradient(178deg, #FFFDF4 0%, #F8EDC8 66%, #E4D4A4 100%)`,
        border: `10px solid ${dkh(OAK, 0.3)}` }} />
      <Pool x={820} y={556} w={860} c="#FFFBEE" o={0.16 + day * 0.34} z={26} />
      <Plinth x={430} y={716} w={280} h={140} z={44} />
      <div style={{ position: "absolute", inset: 0, zIndex: 60,
        transform: `translate(${out * 470}px, ${-out * 60}px) scale(${1 - out * 0.24})`,
        opacity: 1 - out * 0.5 }}>
        <UnitStack x={430} y={724} f={f} w={248} z={60}
          blocks={[]} lit={1}
          seat={{ 0: S16_SET, 1: S16_SET + 2, 2: S16_SET + 4 }} />
      </div>
      {/* the three plates light in sequence — the loop is armed */}
      <Nameplate x={430} y={330} f={f} at={S16_P1} t="JUDGE" c={C_JUDGE} w={200} z={78} pool={false} />
      <Nameplate x={186} y={624} f={f} at={S16_P2} t="PROS" c={C_PROS} w={170} z={78} pool={false} />
      <Nameplate x={664} y={624} f={f} at={S16_P2 + 4} t="DEFENSE" c={C_DEF} w={210} z={78} pool={false} />
      {f >= S16_LAUNCH && <Ring x={700} y={470} f={f} at={S16_LAUNCH} c="#FFFBEE" z={80} s={2.0} dur={30} />}
      <Contact x={800} y={700} w={200} z={44} o={0.36} />
      <Hero f={f} x={890} y={708} size={318} z={52} costume={{ suit: 1 }} tint={CLAY}
        cheer={f >= S16_LAUNCH ? 0.8 : 0} act={2} ph={0.3} />
      <Motes x={506} y={300} w={900} h={430} n={13} f={f} z={84} c={mxh("#FFF3D2", 0.3)} />
      <Cross f={f} from={-260} to={1180} a={-18} b={dur + 34} y={748} i={7} size={262} z={57} stack={2} />

    </Scene>
  );
};

/* =========================================================================
   S17 — "Comment judge for the free guide."
   THE STEPS, exterior, daylight. The keyword lands as a brass plate, low and
   hard. ⛔ THE LAST WORD NEEDS ROOM: END is 1056f, not 1035f, so "guide" has
   0.3s after it — a word inside 150ms of the comp end dies in the RENDER and
   appears in no stem ([[feedback_the_last_word_needs_room]]).
   ========================================================================= */
const S17_PLATE = 5, S17_FREE = 20, S17_GUIDE = 25;
export const S17: React.FC<P> = ({ v, dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("steps");
  return (
    <Scene p={p} slug="" push={[0, dur, 1.06]} vig={0.30} glow={hexa("#FFF3D2", 0.22)}>
      <Chamber p={p} f={f} lit={1} occ="none" bays={6} shaft={506} shaftO={0.20}
        rakeRate={RK[v].rate * 0.7} rakeN={RK[v].n} panelN={10} rail={false} horizonDy={-40} dim={0.1} />
      <Pool x={506} y={470} w={980} c="#FFFBEE" o={0.24} z={12} />
      {/* the steps */}
      {[0, 1, 2, 3].map(i => (
        <div key={"st" + i} style={{ position: "absolute", left: 40 - i * 12, right: 40 - i * 12,
          top: 566 + i * 58, height: 58, zIndex: 40 + i,
          background: `linear-gradient(180deg, ${mxh("#B6AC96", 0.30)} 0%, #8A8272 62%, #5E594B 100%)` }} />
      ))}
      <Nameplate x={506} y={470} f={f} at={S17_PLATE} t={`COMMENT "${R.keyword}"`}
        c={BRSL} w={470} z={82} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, textAlign: "center",
        zIndex: 84, opacity: E(f, S17_FREE, S17_FREE + 6, 0, 1, OUT) }}>
        <span style={{ ...mono(26, 900), letterSpacing: 4, color: "#2A2116",
          background: `linear-gradient(180deg,${GREEN},${dkh(GREEN, 0.3)})`,
          padding: "9px 22px", borderRadius: 8, border: `3px solid ${dkh(GREEN, 0.5)}`,
          color: "#F2FBF6" }}>FOR THE FREE GUIDE</span>
      </div>
      {[236, 780].map((gx, i) => (
        <Crew key={"c" + i} f={f} x={gx} y={700} i={i + 6} size={214} z={54} at={-6}
          loop={2} cheer={f >= S17_GUIDE ? 0.8 : 0.3} />
      ))}
      <Hero f={f} x={506} y={716} size={330} z={56} costume={{}} tint={CLAY}
        cheer={f >= S17_PLATE ? 0.7 : 0} act={2} ph={0.5} />
      <Mark x={58} y={200} s={90} z={92} />
      <Motes x={506} y={300} w={900} h={420} n={13} f={f} z={84} c={mxh("#FFF3D2", 0.3)} />
      <Cross f={f} from={1180} to={-260} a={-18} b={dur + 34} y={756} i={11} size={262} z={57} stack={2} />

    </Scene>
  );
};
