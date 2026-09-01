import React from "react";
import { useCurrentFrame } from "remotion";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dkh, mxh, rnd, SH, SH_D, mono, ui,
  Scene, Cam, Ring, Puff, Motes, Rake, Contact, Mark, Crew, Hero, costumeFor,
  squash, rock, shake, idle, asPlace, R,
  Gantry, GlassBox, Hoist, Chute, BenchBay, Hatch, Flood,
  CLAY, CLAYD, GOLD, GREEN, RED, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, SODIUM, VIOLET, EMBER, OXIDE, SLATE, COPPER, JADE, IRON, GLASSW,
} from "./OvlWorld";
import { Unit, OrderWall, Slab } from "./OvlProps";
import { Room, Jamb, Overhead } from "./HwSets";

/* ===========================================================================
   REEL 128 · "BOSS" — THE FOUR HOOK CONCEPTS.

   ⛔⛔ THE FIRST BUILD STEP OF ANY REEL IS NOT SCENE 0, IT IS N CONCEPTS FOR
   SCENE 0 (`docs/THE-OPEN.md` step 1). Four are built here as real 79-frame
   shots at full quality, measured, and one is picked. Reel 78 skipped this,
   built a complete Fury Road open and threw the whole scene away.

   ⛔⛔⛔ TWO MECHANISMS ARE BANNED OUTRIGHT BECAUSE REEL 118 ALREADY USED THEM
   ON THIS SAME SCRIPT:
     · GROWTH — 118's rejected first hook was a building erupting and a counter
       rolling to 55,000. *"A building getting taller is a progress bar standing
       up. You know the ending at frame 8."*
     · THE REJECT STAMP — 118's shipped hook was a hand coming down out of frame
       stamping REJECT, faster each time, refusals piling past the builder.
   Neither appears below. The four mechanisms are INTERRUPTION, ARRIVAL,
   REVERSAL and ASCENT, and no two of them can be described by one sentence.

   ⛔ EACH IS ONE EVENT, NOT FOUR FRAMINGS. *"It's just cuts and then nothing
   happens"* — a cut is not an event (§2). Every one below has a before state
   legible on frame 1, a visible trigger, travel that crosses real distance, and
   an arrival that costs something.

   ⛔ ALL FOUR OPEN BRIGHT. `HOOK_LUMA >= 140` is a FRAME 0 law. Reel 109 proved
   brightness is the MEAN and hierarchy is the SPREAD: a bright hall containing
   near-black masses satisfies both at once, and the only way they fight is if
   you reach for the palette's dark stop. Nothing here does — the sets stay lit
   and the IRON masses stay black.

   ⛔ AND EVERYTHING MOVES AT FRAME 0 (§27). *"Between 0-1 second each of those
   hook things needs to all have motion, everything, not just this here."* A
   viewer reads the whole frame, not the object you happen to be animating, and
   the audit cannot see it because the mean is carried by whatever moves. Every
   hook below gives every standing object an idle at the measured floor (4.6px /
   2.6deg, own phase, second slower harmonic), a status chase for the eye, and a
   periodic fire staggered so two or three of N are going off at any instant.
   ========================================================================= */

type HP = { dur: number };

/** the crew's idle floor — measured: 1.15deg/1.7px registers on a metric and
    READS as static; 2.6deg/4.6px with a second slower harmonic is what shows */
const breathe = (f: number, ph: number) =>
  Math.sin(f / 13 + ph) * 4.6 + Math.sin(f / 31 + ph * 0.6) * 2.2;
const tilt = (f: number, ph: number) =>
  Math.sin(f / 15 + ph) * 2.6 + Math.sin(f / 37 + ph) * 1.1;

/* =========================================================================
   HOOK A · THE FLOOD — mechanism INTERRUPTION.

   The floor is working: eight Claudes at four bays, sparks, a belt, tools
   swinging. At f20 a hard WHITE shaft comes down out of the ceiling and every
   single body on the floor stops dead and looks UP into it. At f58 it snaps
   off and they go back to work at a visibly higher rate.

   ⭐ Why this one might win: it says "somebody is watching you work" with no
   narration, at thumbnail size, and the value event is a cold white wedge
   cutting through a warm amber room — a HUE and VALUE change at once, which is
   the only kind the greyscale audit can see AND the kind a person reads.
   ⛔ It is the only hook here whose subject is the CREW rather than an object,
   which is also its risk: `THE-OPEN` law 3 wants recognition, and a room of
   workers is not yet a thing a viewer dreads.
   ====================================================================== */
export const HookA: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("floor");
  const ON = 20, OFF = 58;
  /* the flood: fast IN, hold, fast out. ⛔ IN_Q on the way in so it does not
     decelerate into its own arrival */
  const flood = E(f, ON, ON + 6, 0, 1, IN_Q) - E(f, OFF, OFF + 7, 0, 1, IN_Q);
  const frozen = f > ON + 3 && f < OFF + 2;
  /* after the flood everyone works FASTER — the rate itself is the payoff */
  const rate = f > OFF ? 1.85 : 1;

  const BAYS = [40, 292, 544, 796];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.44} glow={hexa(p.key, 0.24)}>
      <Room p={p} f={f} bands={3} kind="rack" overhead="duct" rake={0.13}
        rakeRate={5.2} rakeN={7} floorKind="slab" grit={0.7}
        lamp={{ x: 506, y: 150, r: 300 }} />
      {/* the gantry the light comes out of — cropped by the frame top */}
      <Gantry p={p} y={96} z={38} f={f} legs={false} lit={0.3} />
      {/* four bays, each with its own lit underside */}
      {BAYS.map((bx, i) => (
        <BenchBay key={"bb" + i} p={p} x={bx} y={470 + (i % 2) * 14} w={214} z={34}
          f={f} lit={0.9} vice={i % 2 === 0} />
      ))}
      {/* the background process this world owns: a belt of parts, always running */}
      {Array.from({ length: 11 }, (_, i) => {
        const x = ((i * 96 + f * 3.4 * rate) % (W + 180)) - 90;
        return <Slab key={"bl" + i} x={x} y={678} w={72} h={46} z={30} parts={2}
          c={i % 3 === 0 ? CREAMB : OXIDE} rot={(rnd(i, 9) - 0.5) * 6} />;
      })}
      {/* THE CREW — eight bodies, two ranks, value-ramped, all moving at f0 */}
      {Array.from({ length: 8 }, (_, i) => {
        const back = i >= 4;
        const col = i % 4;
        const bx = 96 + col * 232 + (back ? 74 : 0);
        const by = back ? 452 : 556;
        const sz = back ? 132 : 176;
        const ph = i * 1.7;
        return (
          <div key={"cw" + i} style={{ position: "absolute", inset: 0, zIndex: back ? 40 : 52,
            transform: frozen
              ? `translateY(${-6}px)`
              : `translate(0px, ${breathe(f * rate, ph)}px) rotate(${tilt(f * rate, ph)}deg)`,
            transformOrigin: `${bx}px ${by + sz}px` }}>
            <Crew f={f} x={bx} y={by} i={i} size={sz} z={back ? 40 : 52} at={0}
              loop={frozen ? 3 : i % 4}
              tint={back ? dkh(CLAY, 0.30) : undefined} cheer={frozen ? 0 : 0} />
          </div>
        );
      })}
      {/* periodic fire — sparks off two of the four bays at any instant */}
      {BAYS.map((bx, i) => {
        const per = 34 + i * 7;
        const lf = (f + i * 11) % per;
        return lf < 12 ? (
          <React.Fragment key={"sp" + i}>
            <Puff x={bx + 100} y={468} f={lf} at={0} c={mxh(GOLD, 0.2)} n={7} s={0.6} up={40} />
            <Ring x={bx + 100} y={468} f={lf} at={0} c={mxh(GOLD, 0.3)} s={0.42} dur={12} />
          </React.Fragment>
        ) : null;
      })}
      {/* ⭐ THE EVENT: the flood. A shaped CONE, never a full-frame fill. */}
      <Flood x={506} y={112} k={flood} z={70} c={GLASSW} len={520} top={190} bot={640} f={f} />
      {/* the pool it lands in — so the light has a FLOOR, not just a shaft */}
      {flood > 0.02 && (
        <div style={{ position: "absolute", left: 506 - 320, top: 604, width: 640, height: 96,
          zIndex: 24, opacity: flood * 0.5, borderRadius: "50%",
          background: `radial-gradient(circle, ${hexa(GLASSW, 0.62)} 0%, ${hexa(GLASSW, 0)} 70%)` }} />
      )}
      {/* the source, cropped by the frame top: the glass is up there */}
      <div style={{ position: "absolute", left: 380, top: 68, width: 252, height: 46, zIndex: 72,
        background: `linear-gradient(180deg, ${hexa(GLASSW, 0.1 + flood * 0.8)} 0%, ${dkh(IRON, 0.2)} 100%)`,
        border: `5px solid ${dkh(IRON, 0.2)}` }} />
      <Jamb p={p} side="r" w={124} z={88} kind="post" />
    </Scene>
  );
};

/* =========================================================================
   HOOK B · THE ASSEMBLY — mechanism ARRIVAL.

   One order plate is pushed into a slot at frame left. The floor answers: six
   large parts fly in from SIX DIFFERENT EDGES and slam together into a machine
   twice the height of the Claude who posted the plate. Every part lands with a
   squash, a ring and a dust puff, staggered across the full 79 frames.

   ⭐ Why this one might win: §1's table says the only shape that reliably
   measures above bar is MANY LARGE OBJECTS ARRIVING, and reel 104's fixed open
   is exactly this (three plugins ejecting off a wall and slamming onto a
   counter, 9.97 -> 12.10 with FEWER cuts). It is also the literal promise of
   the VO line: one input, an entire built thing.
   ⛔ It is the concept closest to 118's rejected TOWER and the difference has
   to be held: that was ONE object SCALING UP, so you knew the ending at frame
   8. This is SIX objects arriving from six directions, and until the last one
   lands you cannot tell what it is going to be.
   ====================================================================== */
export const HookB: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("intake");
  const SEAT = 12;
  const seated = f >= SEAT;
  /* ⛔ arrivals span the FULL duration — bunched arrivals leave the tail dead */
  const PARTS = [
    { at: 16, fx: -300, fy: 120, w: 26, h: 214, x: 372, y: 300, c: BRASS, r: -40 },
    { at: 24, fx: 1320, fy: 90, w: 26, h: 214, x: 618, y: 300, c: BRASS, r: 40 },
    { at: 33, fx: 440, fy: -320, w: 290, h: 26, x: 366, y: 288, c: BRASS, r: 0 },
    { at: 42, fx: 460, fy: 980, w: 290, h: 30, x: 366, y: 500, c: OXIDE, r: 0 },
    { at: 52, fx: -340, fy: 620, w: 120, h: 96, x: 396, y: 336, c: STEEL, r: -70 },
    { at: 62, fx: 1340, fy: 560, w: 132, h: 60, x: 566, y: 380, c: COPPER, r: 66 },
  ];
  return (
    <Scene p={p} slug="" push={[0, dur, 1.05]} vig={0.40} glow={hexa(p.key, 0.2)}>
      <Room p={p} f={f} bands={3} kind="shelf" overhead="gantry" rake={0.12}
        rakeRate={4.6} rakeN={7} floorKind="slab" grit={0.6}
        lamp={{ x: 210, y: 130, r: 280 }} />
      {/* the slot the plate goes into, at frame left, lit and reading while EMPTY */}
      <div style={{ position: "absolute", left: 92, top: 396, width: 168, height: 92, zIndex: 40,
        background: `linear-gradient(180deg, ${dkh(IRON, 0.06)} 0%, ${dkh(IRON, 0.4)} 100%)`,
        border: `6px solid ${mxh(IRON, 0.2)}`, borderRadius: 5 }}>
        <div style={{ position: "absolute", left: 10, top: 12, right: 10, height: 8,
          background: hexa(p.key, seated ? 0.9 : 0.34) }} />
      </div>
      {/* the plate travelling in, then seating */}
      <div style={{ position: "absolute", left: 108 + (seated ? 0 : (1 - E(f, 0, SEAT, 0, 1, IN_Q)) * -190),
        top: 414, zIndex: 58, transform: `scale(${squash(f, SEAT, 0.16, 3, 11)})`,
        transformOrigin: "84px 30px" }}>
        <Slab x={0} y={0} w={140} h={60} z={58} parts={2} c={CREAMB} label="1 PROMPT" />
      </div>
      {seated && <Ring x={178} y={444} f={f} at={SEAT} c={mxh(GOLD, 0.3)} s={0.7} />}

      {/* ⭐ THE EVENT: six parts, six edges, six arrivals across the full shot */}
      {PARTS.map((q, i) => {
        const k = E(f, q.at, q.at + 9, 0, 1, IN_Q);
        if (k <= 0) return null;
        const landed = f >= q.at + 9;
        const sq = landed ? squash(f, q.at + 9, 0.18, 3, 12) : 1;
        const rk = landed ? rock(f, q.at + 9, 7, 13) : 0;
        return (
          <React.Fragment key={"pt" + i}>
            <div style={{ position: "absolute",
              left: q.fx + (q.x - q.fx) * k, top: q.fy + (q.y - q.fy) * k,
              width: q.w, height: q.h, zIndex: 60 + i,
              transform: `rotate(${q.r * (1 - k) + rk * 0.4}deg) scale(${sq})`,
              background: `linear-gradient(168deg, ${mxh(q.c, 0.3)} 0%, ${dkh(q.c, 0.28)} 100%)`,
              border: `4px solid ${dkh(q.c, 0.46)}`, borderRadius: 4 }}>
              <div style={{ position: "absolute", left: 4, top: 4, right: 4, height: 5,
                background: mxh(q.c, 0.5) }} />
            </div>
            {landed && <Ring x={q.x + q.w / 2} y={q.y + q.h / 2} f={f} at={q.at + 9}
              c={mxh(q.c, 0.4)} s={0.62} dur={14} />}
            {landed && <Puff x={q.x + q.w / 2} y={q.y + q.h} f={f} at={q.at + 9}
              c={p.grit} n={7} s={0.7} />}
          </React.Fragment>
        );
      })}
      {/* the Claude who posted it, dwarfed by what arrives — and never static */}
      <div style={{ position: "absolute", inset: 0, zIndex: 54,
        transform: `translateY(${breathe(f, 0.4)}px) rotate(${tilt(f, 0.4)}deg)`,
        transformOrigin: "196px 640px" }}>
        <Hero f={f} x={150} y={470} size={190} z={54} costume={{ constr: 1 }}
          act={3} gaze={0.5} shock={seated ? E(f, 33, 44, 0, 0.7, OUT) - E(f, 60, 72, 0, 0.7, OUT) : 0} />
      </div>
      <Contact x={196} y={664} w={150} z={30} o={0.4} />
      {/* two crew in the far rank so the room is inhabited at frame 0 */}
      {[0, 1].map((i) => (
        <Crew key={"fc" + i} f={f} x={760 + i * 140} y={430} i={i + 5} size={112} z={38}
          at={0} loop={i === 0 ? 1 : 3} tint={dkh(CLAY, 0.34)} />
      ))}
      <Jamb p={p} side="l" w={118} z={88} kind="stud" />
      <Motes x={506} y={150} w={700} h={420} n={16} f={f} z={80} c={mxh(p.key, 0.3)} />
    </Scene>
  );
};

/* =========================================================================
   HOOK C · THE DROP — mechanism REVERSAL.

   A finished, gleaming UNIT is riding the hoist UP into the light. At f26 the
   chute above opens and it comes back DOWN past the camera in seven pieces,
   through the frame, past the crew's heads, into the tray. It never resolves.

   ⭐ Why this one might win: it is the counterintuitive half of the subject —
   the thing you built gets destroyed by your own AI, on purpose — and it is the
   only concept here whose direction REVERSES inside the shot, which is the
   single hardest thing for a viewer to predict at frame 8.
   ⛔ It is the closest of the four to reel 118's shipped hook (which was also
   "the AI refuses its own work"). The difference that has to hold: 118 was a
   STAMP coming down on paper, and this is a MACHINE coming apart in mid-air on
   a vertical axis. If this one is picked, check it against 118 side by side
   before it ships.
   ⛔ THE PAYOFF IS NOT SPENT: the unit never runs and never delivers here. It
   only ever comes apart.
   ====================================================================== */
export const HookC: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("hookc");
  const BREAK = 24;
  /* ⛔ LIN on the climb, so the reversal at BREAK is a genuine direction change
     and not a deceleration that was going to happen anyway (§23). */
  const climb = E(f, 0, BREAK, 0.44, 0.92, LIN);
  const CX = 486, CY0 = 660, TOPY = CY0 - 0.88 * 430;

  /* ⭐ THE PIECES ARE RECOGNISABLE MACHINE PARTS, NOT RECTANGLES. v1 threw seven
     anonymous slabs and they read as a PILE — §15's lesson twice over: at half a
     second a viewer recognises a THING, and craft on an unrecognisable silhouette
     is the wrong axis. Two gears, a hopper, a spout, two uprights and the
     faceplate are the same six objects `Unit` is built from, so the eye can see
     the machine it just watched go up coming apart.
     ⛔ EVERY PATH IS LIN AND STILL TRAVELLING AT f79. v1 measured PRE-CUT 0.45 —
     the pieces had landed and the shot was dead into its own cut. */
  const PARTS = [
    { k: "gear", d: -1, vx: -7.4, vy: -3.2, sp: -9, at: BREAK + 0, s: 108 },
    { k: "gear", d: 1,  vx: 6.9,  vy: -4.0, sp: 11, at: BREAK + 1, s: 88 },
    { k: "hop",  d: 0,  vx: -3.1, vy: -5.4, sp: -6, at: BREAK + 3, s: 132 },
    { k: "spout",d: 0,  vx: 8.2,  vy: -1.6, sp: 13, at: BREAK + 4, s: 118 },
    { k: "up",   d: -1, vx: -9.1, vy: -0.9, sp: -14, at: BREAK + 6, s: 190 },
    { k: "up",   d: 1,  vx: 9.6,  vy: -1.4, sp: 15, at: BREAK + 7, s: 190 },
    { k: "face", d: 0,  vx: -1.4, vy: -6.2, sp: -8, at: BREAK + 9, s: 126 },
    /* ⭐ THE SECOND WAVE. The chute keeps dumping for the rest of the shot, so
       the tail is not the first wave finishing — it is more arriving. */
    { k: "gear", d: 1,  vx: 4.2,  vy: -2.4, sp: 9, at: BREAK + 20, s: 84 },
    { k: "up",   d: -1, vx: -5.6, vy: -1.1, sp: -11, at: BREAK + 26, s: 150 },
    { k: "hop",  d: 0,  vx: 2.8,  vy: -3.6, sp: 7, at: BREAK + 33, s: 104 },
    /* ⭐ THIRD WAVE. v2 measured PRE-CUT 0.78 against a 0.88 bar: the shot was
       still fading into its own cut because everything authored had already
       been thrown. These four are the biggest of the lot and the last one
       leaves the chute at f78 of 79. */
    { k: "face", d: 0,  vx: 6.4,  vy: -4.8, sp: 12, at: BREAK + 38, s: 138 },
    { k: "up",   d: 1,  vx: 8.8,  vy: -2.2, sp: 16, at: BREAK + 43, s: 200 },
    { k: "gear", d: -1, vx: -8.1, vy: -3.9, sp: -13, at: BREAK + 47, s: 122 },
    { k: "up",   d: -1, vx: -7.2, vy: -2.8, sp: -12, at: BREAK + 52, s: 176 },
    /* ⭐⭐ MORE OF THE MECHANISM, NOT A FOREIGN ELEMENT (§24). v5 measured 9.05
       with at most four parts in the air at any instant. A machine coming apart
       has as many parts as it has parts, so the count goes to 22 and the gaps
       between waves close — the ceiling on this shot is how much of it is
       travelling at once, and nothing else. */
    { k: "gear", d: 1,  vx: 5.6,  vy: -5.1, sp: 10, at: BREAK + 2, s: 96 },
    { k: "up",   d: 1,  vx: 7.1,  vy: -3.4, sp: 13, at: BREAK + 5, s: 164 },
    { k: "hop",  d: 0,  vx: -6.3, vy: -4.2, sp: -9, at: BREAK + 8, s: 116 },
    { k: "spout",d: 0,  vx: -7.8, vy: -2.9, sp: -12, at: BREAK + 12, s: 128 },
    { k: "gear", d: -1, vx: -4.4, vy: -5.6, sp: -11, at: BREAK + 15, s: 100 },
    { k: "face", d: 0,  vx: 3.6,  vy: -5.9, sp: 9, at: BREAK + 17, s: 118 },
    { k: "up",   d: 1,  vx: 6.2,  vy: -4.4, sp: 14, at: BREAK + 23, s: 172 },
    { k: "hop",  d: 0,  vx: -4.9, vy: -5.2, sp: -8, at: BREAK + 29, s: 124 },
    { k: "spout",d: 0,  vx: 7.4,  vy: -3.1, sp: 12, at: BREAK + 36, s: 122 },
    { k: "gear", d: 1,  vx: 3.2,  vy: -6.1, sp: 11, at: BREAK + 41, s: 112 },
    { k: "hop",  d: 0,  vx: -8.4, vy: -3.8, sp: -13, at: BREAK + 49, s: 130 },
    { k: "face", d: 0,  vx: 5.1,  vy: -5.4, sp: 10, at: BREAK + 54, s: 132 },
  ];

  const Piece: React.FC<{ q: typeof PARTS[number] }> = ({ q }) => {
    const lf = f - q.at;
    if (lf < 0) return null;
    /* LIN sideways, gravity down — ballistic, never eased, never settling */
    const x = CX + q.vx * lf;
    const y = TOPY + 60 + q.vy * lf + 0.30 * lf * lf;
    if (y > H + 220) return null;
    const rot = q.sp * lf;
    const S = q.s;
    const body = (() => {
      if (q.k === "gear") return (
        <div style={{ width: S, height: S, borderRadius: "50%",
          background: `radial-gradient(circle at 38% 34%, ${mxh(BRASS, 0.38)} 0%, ${dkh(BRASS, 0.22)} 100%)`,
          border: `${Math.round(S*0.09)}px solid ${dkh(BRASS, 0.44)}`, position: "relative" }}>
          {Array.from({ length: 9 }, (_, t) => (
            <div key={t} style={{ position: "absolute",
              left: S/2 - S*0.07 + Math.cos((t/9)*6.283) * S*0.54,
              top: S/2 - S*0.07 + Math.sin((t/9)*6.283) * S*0.54,
              width: S*0.16, height: S*0.16, background: dkh(BRASS, 0.14), borderRadius: 3 }} />
          ))}
          <div style={{ position: "absolute", left: S*0.37, top: S*0.37, width: S*0.26,
            height: S*0.26, borderRadius: "50%", background: dkh(IRON, 0.06) }} />
        </div>
      );
      if (q.k === "hop") return (
        <div style={{ width: S, height: S*0.76,
          clipPath: "polygon(0 0, 100% 0, 74% 100%, 26% 100%)",
          background: `linear-gradient(180deg, ${mxh(STEEL, 0.22)} 0%, ${dkh(STEEL, 0.26)} 100%)`,
          borderTop: `${Math.round(S*0.08)}px solid ${mxh(STEEL, 0.5)}` }} />
      );
      if (q.k === "spout") return (
        <div style={{ width: S, height: S*0.5, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: S*0.74, height: S*0.4,
            background: `linear-gradient(180deg, ${mxh(BRASS, 0.28)} 0%, ${dkh(BRASS, 0.28)} 100%)`,
            borderRadius: `0 ${S*0.08}px ${S*0.08}px 0` }} />
          <div style={{ position: "absolute", left: S*0.7, top: -S*0.06, width: S*0.18,
            height: S*0.56, background: mxh(BRASS, 0.44) }} />
        </div>
      );
      if (q.k === "up") return (
        <div style={{ width: S*0.17, height: S,
          background: `linear-gradient(90deg, ${mxh(BRASS, 0.3)} 0%, ${dkh(BRASS, 0.32)} 100%)`,
          position: "relative" }}>
          {Array.from({ length: 5 }, (_, t) => (
            <div key={t} style={{ position: "absolute", left: S*0.04, top: S*0.1 + t*S*0.2,
              width: S*0.08, height: S*0.08, borderRadius: "50%", background: mxh(BRASS, 0.5) }} />
          ))}
        </div>
      );
      return (
        <div style={{ width: S, height: S*0.44, borderRadius: 4,
          background: mxh(CREAMB, 0.06), border: `${Math.round(S*0.05)}px solid ${dkh(BRASS, 0.3)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(Math.round(S*0.19), 800), color: INK, letterSpacing: 1 }}>UNIT</span>
        </div>
      );
    })();
    return (
      <div style={{ position: "absolute", left: x - S/2, top: y, zIndex: 78,
        transform: `rotate(${rot}deg)` }}>{body}</div>
    );
  };

  return (
    <Scene p={p} slug="" push={[0, dur, 1.055]} vig={0.40} glow={hexa(p.key, 0.2)}>
      <Room p={p} f={f} bands={2} kind="column" overhead="none" rake={0.10}
        rakeRate={6.8} rakeN={9} floorKind="slab" grit={0.5}
        lamp={{ x: 486, y: 210, r: 300 }} />

      {/* ⭐ THE GLASS IS FULLY IN FRAME AND BLAZING FROM FRAME 0. It is what
          carries HOOK_LUMA and it is the largest bright object, which is also
          what `HOOK_PLATE` wants — one object, two gate results (§THE-OPEN).
          ⛔ NO READOUT HERE. v2 drew the unlit score bezel and a 244x124 dark
          rectangle inside a lit box reads as a switched-off television.
          ⭐ THE BOSS IS IN IT AT FRAME 0 — a character on the first frame
          (THE-OPEN law 2), the villain planted before he is ever mentioned, and
          the reason a hard white light is falling down the shaft. He is behind
          glass, above everyone, and he never comes down; that is the whole
          reel in one composition. */}
      <GlassBox p={p} x={214} y={122} w={584} h={196} z={50} f={f} on={1}
        score={null} refl={1} readout={false}>
        {/* ⛔ `top` HERE IS A GROUND LINE, NOT A TOP EDGE. `Hero` draws its
            mascot div at `y - size*0.62`, so v3's `top: 6` put the whole body
            ABOVE the glazing and the box came out empty — the same class of bug
            as the crown that floated 38px over a head. Measured against the
            186px box: a 150px body wants its ground line at ~168. */}
        <div style={{ position: "absolute", left: 150, top: 168, zIndex: 2 }}>
          <Hero f={f} x={0} y={0} size={150} z={2} costume={{ suit: 1 }} act={3}
            stern={1} gaze={-0.25} ph={2.1} />
        </div>
        {/* his desk lamp and a rank of switches — the box is an OFFICE */}
        <div style={{ position: "absolute", left: 44, top: 108, width: 96, height: 13,
          background: dkh(IRON, 0.16), zIndex: 1 }} />
        <div style={{ position: "absolute", left: 52, top: 74, width: 15, height: 36,
          background: dkh(IRON, 0.2), zIndex: 1 }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sw" + i} style={{ position: "absolute", left: 372 + i * 22, top: 116,
            width: 13, height: 26, zIndex: 1, borderRadius: 2,
            background: ((f + i * 9) % 46) < 23 ? mxh(GOLD, 0.2) : dkh(IRON, 0.24) }} />
        ))}
      </GlassBox>
      <Gantry p={p} y={330} z={40} f={f} legs={false} lit={0.7} />
      {/* ⭐⭐ THE TOP HALF WAS DEAD — measured TOP/BOT 0.48 on v2, and every panel
          audit averaged straight over it (§24). The fix is not a rate, it is a
          full-width high-contrast TRAVELLING object in that half: §1's second
          highest-value shape. A crane trolley runs the gantry for the whole
          shot, carrying a load that swings off its own velocity, and it is
          still crossing when the shot cuts. */}
      {(() => {
        /* ⛔ 128x46 at IRON on a pale wall is a 30px object after the audit's
           1012->240 downsample and it bought almost nothing. Bigger, brighter,
           faster: the load is CREAM against a blue wall, which is the value step
           the greyscale audit actually sees. */
        const tx = ((f * 12.6) % (W + 520)) - 260;
        const vel = 12.6;
        return (
          <>
            <div style={{ position: "absolute", left: tx, top: 276, width: 196, height: 58,
              zIndex: 47, borderRadius: 3,
              background: `linear-gradient(180deg, ${mxh(IRON, 0.3)} 0%, ${dkh(IRON, 0.3)} 100%)` }} />
            <div style={{ position: "absolute", left: tx + 92, top: 334, width: 9,
              height: 78, zIndex: 47, background: mxh(IRON, 0.3),
              transformOrigin: "50% 0%", transform: `rotate(${-vel * 0.9}deg)` }} />
            <div style={{ position: "absolute", left: tx + 26, top: 404, width: 142, height: 86,
              zIndex: 47, borderRadius: 4, transformOrigin: `${70}px ${-74}px`,
              transform: `rotate(${-vel * 0.9}deg)`,
              background: `linear-gradient(168deg, ${mxh(CREAMB, 0.14)} 0%, ${dkh(CREAMB, 0.24)} 100%)`,
              border: `3px solid ${dkh(CREAMB, 0.44)}` }} />
          </>
        );
      })()}
      {/* ⛔ FRAME-0 LUMA WAS 135.0 AGAINST A 140 BAR AND THE FIX IS NOT THE
          PALETTE'S DARK STOP (§8 — that is the exact move that took thirteen
          reels pale). It is MORE OF THE LIGHT THAT IS ALREADY MOTIVATED: the
          flood is what the boss is doing to the room, so a wider, hotter one is
          the scene being more itself. Still a shaped cone, never a fill. */}
      <Flood x={486} y={326} k={1} z={24} c={GLASSW} len={500} top={300} bot={900} f={f} />

      {/* the shaft, and the chute that opens at BREAK */}
      <Hoist p={p} x={402} yTop={344} yBot={694} k={climb} z={42} f={f} w={168} />
      <Chute p={p} x={596} y={296} w={404} h={250} z={46} f={f} hot={f > BREAK ? 1 : 0} />

      {/* ⭐ THE EVENT: intact and LIT on the way up, then ten parts on the way
          down. ⛔ The payoff is not spent — it never runs and never delivers. */}
      {f < BREAK + 1 && (
        <div style={{ position: "absolute", left: CX - 126, top: CY0 - climb * 430, zIndex: 76,
          transform: `rotate(${Math.sin(f / 8) * 1.8}deg) scale(0.86)`, transformOrigin: "50% 100%" }}>
          <Unit p={p} x={0} y={0} s={0.84} z={76} f={f} built={1} run={0} lit={1} />
        </div>
      )}
      {PARTS.map((q, i) => <Piece key={"pc" + i} q={q} />)}
      {f >= BREAK && <Puff x={CX} y={TOPY + 70} f={f} at={BREAK} c={mxh(p.key, 0.2)} n={14} s={1.5} up={90} />}
      {f >= BREAK && <Ring x={CX} y={TOPY + 70} f={f} at={BREAK} c={mxh(GOLD, 0.3)} s={1.4} dur={20} />}
      {f >= BREAK && <Ring x={CX} y={TOPY + 70} f={f} at={BREAK + 4} c={mxh(p.key, 0.4)} s={1.9} dur={26} />}

      {/* ⭐ THE CREW, BIG. v1 ran them at 140 and they read as bystanders at the
          bottom of a tall frame. At 196 they are a CAST, and they flinch. */}
      {/* ⛔⛔ BOTTOM-HEAVY IS A COMPOSITION DEFECT AND SO IS BOTTOM-EMPTY. v3 sat
          the crew at y=628, which is the Room's own horizon lip, so they read as
          standing on a RAIL with 200px of bare floor under them. In a shot whose
          whole subject is HEIGHT the bottom third has to be foreground: the cast
          moves down to the floor line, goes up to 244, and the two outer bodies
          are cropped by the panel edge — which is `Occluder`'s job done by the
          cast instead of by a prop. */}
      {Array.from({ length: 4 }, (_, i) => {
        /* ⛔⛔ THE SUBJECT MUST NOT BE BEHIND THE PROPS — and the cast counts as
           props when the subject is an object. v4 put crew i=1 at z70 dead
           centre, over a Unit at z64, so the one thing the shot is about was the
           one thing hidden. The cast now brackets a clear centre CHANNEL and
           nobody outranks the unit. */
        const bx = [52, 258, 760, 962][i];
        const fl = f > BREAK + 4
          ? E(f, BREAK + 4, BREAK + 9, 0, 1, IN_Q) - E(f, BREAK + 26, BREAK + 40, 0, 1, IO) : 0;
        return (
          <div key={"cr" + i} style={{ position: "absolute", inset: 0, zIndex: 52,
            transform: `translateY(${breathe(f, i * 1.7) - fl * 14}px)`,
            transformOrigin: `${bx}px 760px` }}>
            {/* ⛔⛔ `at={-12}`, NOT 0. `Crew` runs `E(lf,0,8,0,1,BACK)` as its
                entrance, so at `at=0` every body is at SCALE 0 on frame 0 — v2
                shipped a hook about a crew with no crew in its first frame,
                against THE-OPEN law 2. Pre-seeding is TIME, not just position:
                the entrance has to have already HAPPENED. */}
            <Crew f={f} x={bx} y={772} i={i} size={244} z={52} at={-12}
              loop={fl > 0.3 ? 3 : i % 4} tint={i === 3 ? dkh(CLAY, 0.22) : undefined} />
          </div>
        );
      })}
      {[52, 258, 760, 962].map((bx, i) => <Contact key={"ct" + i} x={bx} y={786} w={196} z={30} o={0.38} />)}

      {/* ⛔ MEASURED, NOT GUESSED: a column profile of frame 0 put x 0-169 at
          mean 80.4 against a panel mean of 135.4, and the row band under the
          gantry at 70.9. Those two masses alone were the whole 140 miss. The
          depth check is *"is there a mass cropped by the panel edge, in front of
          the action?"* — and the CAST already is one, at the bottom edge, four
          bodies wide. A second near-black occluder down the left was buying no
          depth the crew were not already buying, so it is narrowed rather than
          the palette being lifted. */}
      <Jamb p={p} side="l" w={66} z={88} kind="post" o={0.72} />
      {/* ⭐ THE TOP HALF MEASURED 0.52 OF THE BOTTOM (§24 — every panel audit
          averages straight over it). Two extractor fans are furniture the room
          would actually have, they are 96px so they survive the 1012->240
          downsample, and they turn on their own clock for the whole shot. */}
      {[128, 884].map((fx, i) => (
        <div key={"fan" + i} style={{ position: "absolute", left: fx, top: 150, width: 96,
          height: 96, zIndex: 46, borderRadius: "50%", background: dkh(IRON, 0.12),
          border: `6px solid ${mxh(IRON, 0.2)}` }}>
          {[0, 1, 2].map((b) => (
            <div key={b} style={{ position: "absolute", left: 38, top: 6, width: 12, height: 76,
              borderRadius: 6, background: mxh(STEEL, 0.16), transformOrigin: "50% 50%",
              transform: `rotate(${f * (i ? 11.4 : -9.2) + b * 60}deg)` }} />
          ))}
        </div>
      ))}
      <Motes x={486} y={200} w={620} h={460} n={20} f={f} z={80} c={mxh(p.key, 0.4)} />
    </Scene>
  );
};

/* =========================================================================
   HOOK D · THE CLIMB — mechanism ASCENT (revealing SCALE).

   Locked on the full height of the building. A cage carrying one crude slab
   climbs from the floor toward the glass, and as it passes each storey THAT
   STOREY LIGHTS — bench floor, mid deck, gantry, and finally the boss's box
   blazing at the top with the crew now tiny at the bottom of frame.

   ⭐ Why this one might win: it is the only concept that states the reel's
   whole STRUCTURE in one shot — there is a floor, there is a boss, and there is
   a machine between them — and the light arriving storey by storey is a
   full-width high-contrast travelling event, §1's second-highest-value shape.
   ⛔ THE RISK IS THAT ASCENT READS AS GROWTH, which is 118's rejected hook. The
   difference that must hold: nothing gets BIGGER here. A cage of fixed size
   travels through a building of fixed size, and what changes is the LIGHT.
   ⛔ If this wins, S3 must lose its own three-bank light-up, or the reel plays
   the same beat twice inside four seconds.
   ====================================================================== */
export const HookD: React.FC<HP> = ({ dur }) => {
  const f = useCurrentFrame();
  const p = asPlace("over");
  /* ⛔ LIN, and still climbing at the cut — nothing decelerates into its end */
  const k = E(f, 6, dur + 10, 0.04, 0.92, LIN);
  /* three storeys light as the cage passes them */
  const lit = (at: number) => E(f, at, at + 5, 0, 1, IN_Q);
  const L1 = lit(14), L2 = lit(34), L3 = lit(54);
  return (
    <Scene p={p} slug="" push={[0, dur, 1.045]} vig={0.42} glow={hexa(p.key, 0.22)}>
      <Room p={p} f={f} bands={3} kind="column" overhead="none" rake={0.12}
        rakeRate={4.2} rakeN={7} floorKind="slab" grit={0.6}
        lamp={{ x: 506, y: 116, r: 250 }} />

      {/* STOREY 1 · the bench floor, bottom of frame */}
      <div style={{ position: "absolute", left: 0, top: 606, width: W, height: 12, zIndex: 26,
        background: hexa(p.key, 0.12 + L1 * 0.7) }} />
      {[24, 268, 700, 892].map((bx, i) => (
        <BenchBay key={"b1" + i} p={p} x={bx} y={618} w={188} z={30} f={f} lit={L1} vice={i === 0} />
      ))}
      {/* STOREY 2 · the mid deck */}
      <Gantry p={p} y={430} z={34} f={f} legs={false} lit={L2} x0={-40} span={W + 80} />
      <div style={{ position: "absolute", left: 0, top: 414, width: W, height: 9, zIndex: 36,
        background: hexa(p.key, 0.08 + L2 * 0.62) }} />
      {[70, 806].map((bx, i) => (
        <Crew key={"m" + i} f={f} x={bx} y={330} i={i + 2} size={96} z={38} at={0}
          loop={i} tint={dkh(CLAY, 0.3)} />
      ))}
      {/* STOREY 3 · the gantry under the glass */}
      <Gantry p={p} y={228} z={40} f={f} legs={false} lit={L3} x0={-40} span={W + 80} />

      {/* THE GLASS at the top — dark until the cage nearly reaches it */}
      <GlassBox p={p} x={266} y={92} w={480} h={132} z={52} f={f} on={L3}
        score={f > 60 ? R.scores[0] : null} refl={L3} />
      <Flood x={506} y={224} k={L3 * 0.8} z={22} c={GLASSW} len={430} top={180} bot={520} f={f} />

      {/* ⭐ THE EVENT: the cage climbing the whole height, carrying one slab */}
      <Hoist p={p} x={420} yTop={236} yBot={640} k={k} z={44} f={f} w={172}>
        <div style={{ position: "absolute", left: 22, top: 20, zIndex: 2 }}>
          <Slab x={0} y={0} w={126} h={86} z={2} parts={3} c={CREAMB} label="BUILD" />
        </div>
      </Hoist>

      {/* the crew at the foot, tiny, and every one of them moving at frame 0 */}
      {Array.from({ length: 5 }, (_, i) => {
        const bx = 62 + i * 206;
        return (
          <div key={"c" + i} style={{ position: "absolute", inset: 0, zIndex: 50,
            transform: `translateY(${breathe(f, i * 1.7)}px) rotate(${tilt(f, i * 1.7)}deg)`,
            transformOrigin: `${bx}px 720px` }}>
            <Crew f={f} x={bx} y={640} i={i} size={124} z={50} at={0} loop={i % 4}
              tint={i > 2 ? dkh(CLAY, 0.26) : undefined} />
          </div>
        );
      })}
      {/* the background process: a mains conduit running the full width, OVER
          everything, which is also where a real one runs (§6 z-order) */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = ((i * 84 + f * 4.2) % (W + 160)) - 80;
        return <div key={"pl" + i} style={{ position: "absolute", left: x, top: 196, width: 46,
          height: 12, zIndex: 84, borderRadius: 3, background: mxh(COPPER, 0.14), opacity: 0.9 }} />;
      })}
      <Jamb p={p} side="r" w={120} z={88} kind="post" />
      <Motes x={506} y={180} w={720} h={440} n={16} f={f} z={80} c={mxh(p.key, 0.3)} />
    </Scene>
  );
};

export const HOOKS = { A: HookA, B: HookB, C: HookC, D: HookD } as const;
export type HookId = keyof typeof HOOKS;
