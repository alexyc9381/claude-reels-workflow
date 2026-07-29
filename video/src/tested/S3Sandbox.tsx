import React from "react";
import { Actor, H, M, Room, seed, mono, fraunces, GOLD } from "./chassis";

/* =============================================================================
   REEL 77 "TESTED" · S3 — THE PADDOCK        window 23.750–29.330 · 167f @ 30fps
   -----------------------------------------------------------------------------
   PLACE   A live containment paddock at dusk — a working test facility, not a
           diagram of one.
             FLOOR      poured-concrete blast APRON, painted with a worn hazard
                        -hatched impact box, expansion joints, drag marks, an
                        inspection drain and THREE faded scorch rings from earlier
                        tests. Bounded far by the fence base (y 636) and near-left
                        by the side run. Everything left of that line is NOT paddock.
             BACK WALL  a 3.25 m REINFORCED MESH FENCE (x 456→1012): hazard-chevron
                        top rail, a chevron-bordered GATE with a caged lamp, one
                        BRIGHT replacement panel, one wire-laced patch, rust
                        streaks off every bolt plate, a 4-lamp DAMAGE TALLY board,
                        klaxon horns, hanging BLAST MATS, and a corner post scored
                        with tally scratches from previous runs.
             INSIDE     a diesel GENERATOR with a smoking stack and a spinning
                        extractor fan, cable runs pinned along the fence base, a
                        TYRE STACK, a lean of SPARE FENCE PANELS, a sandbag pallet,
                        a fire-point extinguisher, two burnt-out crate carcasses,
                        the swing crane (mast + jib + operator cab), the wrecking
                        ball, and the inner test wall.
             OUTSIDE    a mown LAWN on the far side of the wire holding a receding
                        row of FOUR filing cabinets (the real files) — with a mug,
                        a potted plant, a clipboard and one drawer left ajar — plus
                        a CONTROL CABIN with a lit window and a perfectly still
                        figure in it, a gravel path, and a garden ROPE-AND-POST
                        boundary so flimsy it is the joke.
   LIGHT   ONE motivated key: the floodlight pylon head at (90, 176), high camera
           -LEFT, standing OUT on the lawn. Left faces lit, every cast shadow on
           apron and lawn falls DOWN-RIGHT. The amber band behind the treeline is
           ambient sky fill only — never a second key.
   DEPTH   0 near boughs cropping the top corners + a cropped tyre stack bottom-right
           1 lawn + cabinets + cabin (outside) · 2 hero on the apron · 3 test wall /
           crane / generator / paddock kit · 4 the fence + gate + mats + boards
           5 berm + pylons + far grass · 6 trees + dusk sky.
   CAMERA  LOCKED. When the paddock is hit the PROPS jolt; the frame never does,
           and NOTHING outside the wire moves for the whole 167 frames — the wall
           can come down and the tea mug on cabinet two never even ripples.

   ⛔ HIERARCHY. Exactly TWO large continuous movers plus one large beat mover at a
      time. Everything added in the richness pass is TEXTURE: dimmer, smaller and
      lower-contrast than whatever is carrying the frame, and every one of it is
      INSIDE the wire.

      CONTINUOUS A · THE RAKING FLOODLIGHT. The pylon head sweeps the paddock for
        all 167 frames — a full-height wedge whose ground end travels 400↔1000 and
        whose arc buzzes at ~7 Hz, so a ~430 px slab of frame is re-lit every frame.
        ESCALATES: the sweep rate steps up at f96; at f140 a SECOND, narrow lamp
        snaps onto the hero and tracks him. Hard-clipped at the wire, so the safe
        lawn is never touched.
      CONTINUOUS B · THE WRECKING BALL on a real pendulum, all 167 frames, Ø 1.4 m
        (208 px). Blocked by the wall it works between +4° and +26° — at +4° its
        left edge kisses the wall's right face at (616, 579) — once the wall is
        down the arc opens to −22°…+30° and the period drops 84f → 62f, so the
        widest, fastest swing of the scene is its last second.

   BEATS + WHAT EACH ONE LEAVES BEHIND (nothing happens in isolation)
      E1 f0–42   crate already airborne at f0 → detonates f14: Ø 680 fireball,
                 paddock-wide flash, 900 px shock ring.
                 LEAVES · a jagged scorch star + crater ring on the apron
                        · charred fragments that settle and stay
                        · soot blown onto the inside face of the wire
                        · the gate's caged lamp SHATTERS, goes dark and droops
                        · the top tyre knocked off the stack, rolls, rests
                        · tally lamp 1 lights · the klaxons start
      E2 f52–110 the ball takes the wall; all 2.4 m goes over, band A travels
                 150 px right and 300 px down through 92°, a 480 px dust wall rolls.
                 LEAVES · two rubble slabs lying on the apron for good
                        · a crack splitting the apron under them
                        · the spare-panel lean collapses flat
                        · settled dust film on the concrete
                        · tally lamp 2 · alarm level up
      E3 f60–128 he retreats 180 px, then SPRINTS 450 px at the wire through the
                 settling dust; the searchlight steps up to double rate. tally 3.
      E4 f128–167 he bounces; the cage discharges — paddock flash, three ripples,
                 a 180 px band crossing the full width.
                 LEAVES · a permanent bulge in the mesh + a bent post + an arc
                          scorch + two snapped ties hanging
                        · a blast mat tears a hook and hangs crooked
                        · every remaining floodlight snaps onto him
                        · tally lamp 4 — the board is full
   ========================================================================== */

/* ---------- scale contract: every prop derived from M(), one depth factor each ---------- */
const D_FENCE = 0.78;                            // the cage stands ~4 m back
const D_WALL = 0.82;                             // the test wall, ~3.5 m back
const D_CAB = [0.70, 0.634, 0.567, 0.50];        // the cabinet row, receding on the lawn

const CRATE = M(0.85);                           // 160  a hurled test crate
const BALL_R = Math.round(M(1.4) * 0.79 / 2);    // 104  wrecking ball Ø 1.4 m
const CHAIN_W = Math.round(M(0.05));             //   9  chain link
const WALL_W = Math.round(M(1.62) * D_WALL);     // 250  inner test wall, 1.62 m wide
const WALL_H = Math.round(M(2.4) * D_WALL);      // 371  ... 2.4 m tall
const FENCE_H = Math.round(M(3.25) * D_FENCE);   // 478  the cage, 3.25 m
const POST_W = Math.round(M(0.22) * D_FENCE);    //  32  fence post
const GATE_W = Math.round(M(1.3) * D_FENCE);     // 191  the gate leaf, 1.30 m
const GATE_H = Math.round(M(2.0) * D_FENCE);     // 294  the gate is a DOOR — 2.0 m,
                                                 //      the hero's own door-height check
const MAST_H = Math.round(M(3.4) * 0.92);        // 590  the swing crane's lattice mast
const WRECK = Math.round(M(0.55));               // 104  burnt-out crate carcass
const GEN_W = Math.round(M(2.05) * 0.42);        // 162  genset, 2.05 m long, 4 m back
const GEN_H = Math.round(M(1.50) * 0.42);        // 119  ... 1.50 m tall
const TYRE_W = Math.round(M(1.02) * 0.56);       // 108  a plant tyre, Ø 1.02 m
const TYRE_H = Math.round(TYRE_W * 0.36);        //  39  seen slightly from above
const NTYRE_W = Math.round(M(1.02) * 1.14);      // 220  the NEAR tyre stack, cropped
const PANEL_W = Math.round(M(1.1) * 0.60);       // 124  a spare fence panel leaf
const PANEL_H = Math.round(M(2.0) * 0.60);       // 226
const DRUM_H = Math.round(M(0.88) * 0.44);       //  73  sandbag pallet stack height
const EXT_H = Math.round(M(0.62) * 0.50);        //  58  extinguisher on its stand
const MUG_W = Math.round(M(0.12) * 0.634);       //  14  the mug that never ripples
const PLANT_H = Math.round(M(0.34) * 0.567);     //  36  the potted plant

/* ---------- fixed world geometry ---------- */
const FBASE = 636;                               // fence base = far edge of the apron
const FTOP = FBASE - FENCE_H;                    // 158
const CORNER = 456;                              // the corner post
const SNX = 100, SNTOP = 20, SNBASE = 792;       // near end of the side run (camera-left)
const sfX = (t: number) => CORNER + (SNX - CORNER) * t;
const sfTop = (t: number) => FTOP + (SNTOP - FTOP) * t;
const sfBot = (t: number) => FBASE + (SNBASE - FBASE) * t;
/* the wire's ground line, as an x for a given y — used to keep every prop on its own side */
const wireX = (y: number) => CORNER + (SNX - CORNER) * ((y - FBASE) / (SNBASE - FBASE));

const GY = 720;                                  // hero ground line on the apron
const WALL_X = 366, WALL_B = 690, WALL_T = WALL_B - WALL_H;   // 319
const PIVX = 690, PIVY = 150, SWING_R = 430;     // the crane's chain pivot (jib tip)
const MASTX = 940, MASTB = 700;                  // the crane mast, inside the wire
const GATE_X = 664, GATE_T = FBASE - GATE_H;     // 342
const BERM = 300;                                // grass horizon behind the fence
const BLX = 420, BLY = 742;                      // crate detonation centre
/* ⛔ the pylon head moved camera-LEFT to x 90: the white title card owns panel-y 36..150
   across the middle of the frame, and the motivated key must stay VISIBLE. Direction
   (high camera-left, shadows down-right) is unchanged, so nothing else re-lights. */
const LAMPX = 90, LAMPY = 176;
const GENX = 836, GENB = 664;                    // the diesel genset
const TYX = 626, TYB = 662;                      // the tyre stack, inside the wire
const PNX = 468, PNB = 664;                      // the spare-panel lean
const CABINX = 176, CABINB = 600, CABINW = 156;  // the control cabin, OUTSIDE
const TALLYX = 470, TALLYY = 196;                // the damage-tally board on the wire

/* ---------- easing (chassis exports no Easing) ---------- */
const c01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const seg = (f: number, a: number, b: number) => c01((f - a) / (b - a));
const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
const eIn = (t: number) => t * t * t;
const DEG = Math.PI / 180;
/* a decaying rattle a prop inherits from an impact — the reason nothing happens alone */
const rattle = (lf: number, at: number, amp: number, decay: number) =>
  lf < at ? 0 : Math.sin((lf - at) * 0.62) * amp * Math.exp(-(lf - at) / decay);

/* ---------- the forest, built once (deterministic) ---------- */
const TREES_FAR = Array.from({ length: 13 }, (_, i) => {
  const s = seed(i * 3.7 + 2);
  const x = -10 + i * 84 + s * 30;
  const h = 110 + s * 74;
  const w = 54 + seed(i * 5.1 + 6) * 30;
  return `M ${x - w / 2} ${BERM + 6} L ${x - w * 0.2} ${BERM - h * 0.5} L ${x} ${BERM - h} L ${x + w * 0.2} ${BERM - h * 0.5} L ${x + w / 2} ${BERM + 6} Z`;
});
const TREES_NEAR = Array.from({ length: 15 }, (_, i) => {
  const s = seed(i * 2.9 + 11);
  const x = -30 + i * 74 + s * 34;
  const h = 140 + s * 96;
  const w = 62 + seed(i * 6.3 + 4) * 40;
  return `M ${x - w / 2} ${BERM + 8} L ${x - w * 0.26} ${BERM - h * 0.46} L ${x - w * 0.1} ${BERM - h * 0.74} L ${x} ${BERM - h} L ${x + w * 0.1} ${BERM - h * 0.74} L ${x + w * 0.26} ${BERM - h * 0.46} L ${x + w / 2} ${BERM + 8} Z`;
});

/* the NEAR-FOREGROUND razor coil that crops the top of the frame. Its loops follow a
   shallow catenary so it reads as one strung coil, not a row of rings. */
const RAZOR = Array.from({ length: 11 }, (_, i) => {
  const t = i / 10;
  return { x: -40 + t * 1090, y: 6 + Math.sin(t * Math.PI) * 46, r: 52 + seed(i * 3.3 + 6) * 14 };
});

/* ---------- THE REAL FILES: four labelled filing cabinets, OUTSIDE the wire ----------
   Each one is checked against wireX(base) so it can never drift inside the paddock. */
const CABS = D_CAB.map((d, i) => {
  const w = Math.round(M(0.62) * d);
  const h = Math.round(M(1.42) * d);
  const b = 786 - i * 30;
  const x = 8 + i * 56;
  return { x, b, w, h, d };
});

/* charred fragments that SETTLE after the detonation and never move again */
const FALLOUT = Array.from({ length: 7 }, (_, i) => {
  const s = seed(i * 9.1 + 4);
  const a = -Math.PI * (0.14 + seed(i * 3.9 + 2) * 0.7);
  const x = BLX + Math.cos(a) * (150 + s * 250);
  const y = BLY + 8 + s * 34;
  return { x: Math.max(wireX(y) + 40, x), y, w: 16 + s * 22, r: s * 70 - 35 };
});

/* old scorch rings — this paddock has been used before */
const OLD_BURNS = [
  { x: 690, y: 700, r: 96 }, { x: 900, y: 752, r: 118 }, { x: 560, y: 764, r: 80 },
];

export const S3Sandbox: React.FC<{ lf: number }> = ({ lf }) => {
  /* ===== CONTINUOUS MOVER A — the raking floodlight. One ACCUMULATED phase, so the
     sweep can step up in rate at f96 without the beam ever jumping position. ===== */
  const beamPhase = lf < 96 ? lf / 9.5 : 96 / 9.5 + (lf - 96) / 6.2;
  const beamX = 700 + 300 * Math.sin(beamPhase);   // its ground end, 400..1000
  const buzz = 0.80 + 0.20 * Math.sin(lf / 2.05);  // the arc lamp never sits still
  const esc = 1 + seg(lf, 30, 160) * 0.5;          // driven harder as the scene escalates

  /* ===== CONTINUOUS MOVER B — the wrecking ball, a real pendulum for all 167f.
     Blocked by the wall (floor +4°) until f52; then the arc opens and speeds up. ===== */
  const opened = eOut(seg(lf, 52, 112));
  const bp = (lf - 52) * (2 * Math.PI / (lf < 52 ? 84 : 62));
  /* after the strike the crane WINCHES it up 120 px, so the opened arc clears the
     surviving bottom course instead of ploughing through it */
  const swingR = SWING_R - 120 * opened;
  const thDeg = (15 - 11 * opened) - (11 + 15 * opened) * Math.cos(bp);
  const th = thDeg * DEG;
  const ballX = PIVX + swingR * Math.sin(th);
  const ballY = PIVY + swingR * Math.cos(th);

  /* ===================== BEAT CLOCK ===================== */
  /* E1 — the hurl. The crate is ALREADY in the air at f0; it detonates at f14. */
  const fly = seg(lf, 0, 15);
  const crX = 812 - (812 - BLX) * fly;
  const crY = 470 + (BLY - 70 - 470) * fly - Math.sin(fly * Math.PI) * 160;
  const crRot = fly * -360;
  const blast = seg(lf, 14, 42);
  const fireR = blast <= 0 || blast >= 1 ? 0 : (blast < 0.3 ? (blast / 0.3) * 340 : 340 * (1 - (blast - 0.3) / 0.7 * 0.24));
  const fireOp = blast <= 0 || blast >= 1 ? 0 : (blast < 0.16 ? blast / 0.16 : 1 - (blast - 0.16) / 0.84);
  const fireCY = BLY - 10 - blast * 150;
  const shockR = seg(lf, 14, 38) * 900;
  const shockOp = (1 - seg(lf, 14, 38)) * 0.62;
  const padFlash = lf >= 14 && lf < 27 ? (1 - seg(lf, 14, 27)) * 0.55 : 0;

  /* E2 — the ball lands on the wall at f52 and all 2.4 m of it goes over */
  const drop = eIn(seg(lf, 52, 88));
  const jolt = (1 - seg(lf, 52, 78)) * Math.sin((lf - 52) * 1.5) * (lf >= 52 ? 9 : 0);
  const hitFlash = lf >= 52 && lf < 63 ? (1 - seg(lf, 52, 63)) * 0.85 : 0;
  const dust = seg(lf, 54, 110);

  /* E3 / E4 — the retreat, the 450 px sprint, the bounce, the cage */
  const HX = lf < 60 ? 700
    : lf < 96 ? 700 + 180 * eOut(seg(lf, 60, 92))
      : lf < 128 ? 880 - 450 * eIn(seg(lf, 96, 128))
        : 430 + 190 * eOut(seg(lf, 128, 152));
  const tilt = 17 * eOut(seg(lf, 128, 142)) - 11 * eOut(seg(lf, 152, 167));
  const ring = seg(lf, 128, 164);
  const bandX = -200 + 1420 * eOut(seg(lf, 128, 164));
  const cageFlash = lf >= 128 ? (1 - seg(lf, 128, 140)) * 0.6 : 0;

  /* sprite state — frame 0 is the follow-through: the crate has already left his hands */
  const throwing = lf < 22;
  const charging = lf >= 96 && lf < 130;
  const shock = Math.max(
    seg(lf, 14, 20) * (1 - seg(lf, 34, 48)),
    seg(lf, 52, 58) * (1 - seg(lf, 78, 92)),
    seg(lf, 128, 133)
  );

  /* ===================== PERSISTENT DAMAGE STATE =====================
     every one of these ramps ONCE and then holds — the paddock is materially
     different at f166 than it was at f0. */
  const scorch = seg(lf, 16, 34);                 // the crater star on the apron
  const soot = seg(lf, 18, 40);                   // soot blown onto the wire
  const lampDead = seg(lf, 14, 22);               // the gate's caged lamp
  const tyreOff = seg(lf, 18, 36);                // top tyre knocked off the stack
  const fallout = seg(lf, 30, 50);                // charred fragments settle
  const panelDown = seg(lf, 58, 78);              // the spare-panel lean collapses
  const crack = seg(lf, 88, 110);                 // the apron splits under the rubble
  const filmed = seg(lf, 96, 132) * 0.13;         // settled dust film
  const dent = seg(lf, 130, 148);                 // the mesh bulge + bent post
  const matTorn = seg(lf, 132, 152);              // a blast mat loses a hook

  /* ===================== THE FACILITY REACTS =====================
     alarm level steps at each beat and never falls back. */
  const alarm = lf >= 128 ? 1 : lf >= 52 ? 0.72 : lf >= 16 ? 0.42 : 0;
  const bcn = alarm > 0 ? Math.pow(Math.max(0, Math.sin(lf * Math.PI / 9)), 3) * alarm : 0;
  const klaxT = alarm > 0 ? ((lf - 16) % 26) / 26 : -1;
  const tally = lf >= 134 ? 4 : lf >= 100 ? 3 : lf >= 58 ? 2 : lf >= 20 ? 1 : 0;
  const lock = seg(lf, 140, 150);                 // every lamp snaps onto him
  const genFan = lf * 7;                          // the extractor fan on the genset
  const genNdl = Math.sin(lf / 3.1) * 3 + rattle(lf, 52, 9, 16) + rattle(lf, 128, 11, 14);
  /* mats inherit every impact instead of swinging on their own */
  const matSway = rattle(lf, 14, 2.6, 22) + rattle(lf, 52, 3.4, 26) + rattle(lf, 128, 3.8, 24);
  const cableSag = rattle(lf, 52, 5, 30) + rattle(lf, 128, 6, 26);
  const tapeFlut = Math.sin(lf / 6.4) * 2.4 + Math.sin(lf / 2.7) * 1.1;

  /* ===================== small helpers ===================== */
  const meshBack: React.ReactNode[] = [];
  for (let x = CORNER + 20; x < 1012; x += 38)
    meshBack.push(<line key={"bv" + x} x1={x} y1={FTOP + 6} x2={x} y2={FBASE - 4} stroke="#7C8B80" strokeWidth={2} opacity={0.42} />);
  for (let y = FTOP + 16; y < FBASE - 6; y += 38)
    meshBack.push(<line key={"bh" + y} x1={CORNER} y1={y} x2={1012} y2={y} stroke="#7C8B80" strokeWidth={2} opacity={0.34} />);

  const meshSide: React.ReactNode[] = [];
  for (let i = 0; i <= 7; i++) {
    const t = i / 7;
    meshSide.push(<line key={"sv" + i} x1={sfX(t)} y1={sfTop(t)} x2={sfX(t)} y2={sfBot(t)} stroke="#7C8B80" strokeWidth={2.4} opacity={0.42} />);
  }
  for (let i = 1; i < 9; i++) {
    const k = i / 9;
    meshSide.push(<line key={"sh" + i} x1={CORNER} y1={FTOP + k * FENCE_H} x2={SNX} y2={SNTOP + k * (SNBASE - SNTOP)} stroke="#7C8B80" strokeWidth={2.2} opacity={0.32} />);
  }

  const debris = blast > 0 && blast < 1 ? Array.from({ length: 9 }, (_, i) => {
    const a = -Math.PI * (0.12 + seed(i * 3.1 + 1) * 0.76);
    const sp = 300 + seed(i * 7.7 + 5) * 360;
    const p = blast;
    const dx = Math.cos(a) * sp * p;
    const dy = Math.sin(a) * sp * p + 660 * p * p;
    const sz = 20 + seed(i * 4.3 + 2) * 26;
    return (
      <rect key={"db" + i} x={BLX + dx - sz / 2} y={BLY - 62 + dy - sz / 2} width={sz} height={sz * 0.72} rx={2}
        fill={i % 3 === 0 ? "#7A5A32" : "#2B231A"} opacity={1 - p * 0.85}
        transform={`rotate(${p * 420 + i * 40} ${BLX + dx} ${BLY - 62 + dy})`} />
    );
  }) : null;

  /* wall chips fly off the CONTACT point on the wall's right face */
  const chips = lf >= 52 && lf < 96 ? Array.from({ length: 12 }, (_, i) => {
    const p = seg(lf, 52, 96);
    const a = -Math.PI * (0.06 + seed(i * 5.9 + 3) * 0.72);
    const sp = 240 + seed(i * 2.7 + 8) * 320;
    const dx = Math.cos(a) * sp * p;
    const dy = Math.sin(a) * sp * p + 700 * p * p;
    const sz = 13 + seed(i * 8.1 + 4) * 20;
    return <rect key={"cp" + i} x={WALL_X + WALL_W - 10 + dx} y={548 + dy} width={sz} height={sz * 0.8} rx={2} fill="#6C7A6E" opacity={1 - p * 0.9} transform={`rotate(${p * 340} ${WALL_X + WALL_W - 10 + dx} ${548 + dy})`} />;
  }) : null;

  /* the DUST WALL the collapse throws — ~480 px tall, rolling right across the apron */
  const puffs = dust > 0 && dust < 1 ? [0, 1, 2, 3, 4, 5].map((i) => {
    const p = c01((dust - i * 0.06) / 0.7);
    if (p <= 0) return null;
    const sd = seed(i * 4.7 + 3);
    return (
      <ellipse key={"pf" + i} cx={WALL_X + 60 + i * 46 + p * (250 + i * 70)} cy={702 - i * 42 - p * (150 + sd * 140)}
        rx={96 + p * (150 + i * 22)} ry={70 + p * (115 + i * 16)} fill="url(#s3dust)" opacity={(1 - p) * 0.55} />
    );
  }) : null;

  /* ambient · exhaust from the genset stack — INSIDE the wire, dim, tiny */
  const smoke = [0, 1, 2].map((i) => {
    const p = ((lf * 0.9 + i * 26) % 78) / 78;
    return (
      <ellipse key={"sm" + i} cx={GENX + 128 + p * 26 + Math.sin(p * 6 + i) * 7} cy={GENB - GEN_H - 40 - p * 96}
        rx={11 + p * 21} ry={9 + p * 17} fill="#93A08F" opacity={(1 - p) * 0.20} />
    );
  });

  /* ambient · motes drifting in the lit half of the paddock. SIX, 3 px, 0.2 alpha —
     ⛔ deliberately not the 16-speck jitter field that failed the last pass. */
  const motes = [0, 1, 2, 3, 4, 5].map((i) => {
    const s = seed(i * 5.3 + 7);
    const p = ((lf * (0.5 + s * 0.5) + i * 30) % 150) / 150;
    const x = 600 + s * 340 + Math.sin(p * 4 + i) * 20;
    const y = 706 - p * 190;
    return <circle key={"mo" + i} cx={x} cy={y} r={2 + s * 1.6} fill="#DDEBD6" opacity={(1 - p) * 0.22} />;
  });

  return (
    <>
      {/* ================= THE SET ================= */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="s3amb" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C98A3E" stopOpacity="0" />
            <stop offset="0.6" stopColor="#D9993F" stopOpacity="0.5" />
            <stop offset="1" stopColor="#8C6631" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="s3lawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3D5B39" /><stop offset="1" stopColor="#22371F" />
          </linearGradient>
          {/* the CALM lawn outside the wire — lighter + warmer than the paddock apron */}
          <linearGradient id="s3safe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5F8449" /><stop offset="1" stopColor="#41652F" />
          </linearGradient>
          <linearGradient id="s3cabg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E4D6B6" /><stop offset="0.5" stopColor="#BCAB8B" /><stop offset="1" stopColor="#7C7159" />
          </linearGradient>
          <linearGradient id="s3conc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8B9A85" /><stop offset="0.42" stopColor="#55635A" /><stop offset="1" stopColor="#2B342E" />
          </linearGradient>
          <linearGradient id="s3steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5E6B62" /><stop offset="0.4" stopColor="#39443D" /><stop offset="1" stopColor="#1B221D" />
          </linearGradient>
          {/* the genset shell — same left-lit logic as every other steel object */}
          <linearGradient id="s3gen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6B7568" /><stop offset="0.36" stopColor="#414B41" /><stop offset="1" stopColor="#1D241F" />
          </linearGradient>
          <linearGradient id="s3hut" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#C9C0A6" /><stop offset="0.5" stopColor="#A79C81" /><stop offset="1" stopColor="#6E6752" />
          </linearGradient>
          <linearGradient id="s3rub" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3A423A" /><stop offset="0.5" stopColor="#242B25" /><stop offset="1" stopColor="#141A16" />
          </linearGradient>
          <radialGradient id="s3ball" cx="0.34" cy="0.3" r="0.82">
            <stop offset="0" stopColor="#6E7A70" /><stop offset="0.55" stopColor="#333C36" /><stop offset="1" stopColor="#12170f" />
          </radialGradient>
          <radialGradient id="s3fire" cx="0.5" cy="0.55" r="0.5">
            <stop offset="0" stopColor="#FFF6D2" /><stop offset="0.3" stopColor="#FFC257" />
            <stop offset="0.66" stopColor="#E7601E" /><stop offset="1" stopColor="#8A2A08" stopOpacity="0.08" />
          </radialGradient>
          {/* the dust reads as real grit now — it was too thin to register at 0.42 */}
          <radialGradient id="s3dust" cx="0.5" cy="0.55" r="0.5">
            <stop offset="0" stopColor="#B8C3AC" stopOpacity="0.95" />
            <stop offset="0.62" stopColor="#94A08C" stopOpacity="0.55" />
            <stop offset="1" stopColor="#94A08C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#D7EFD9" stopOpacity="0.28" /><stop offset="1" stopColor="#D7EFD9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3duskpool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#E7C489" stopOpacity="0.34" /><stop offset="1" stopColor="#E7C489" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3lamp" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F2FFF4" stopOpacity="0.95" /><stop offset="0.4" stopColor="#CFE8D6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#CFE8D6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3warm" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F6D69A" stopOpacity="0.55" /><stop offset="1" stopColor="#F6D69A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s3amberpool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F2A63A" stopOpacity="0.85" /><stop offset="1" stopColor="#F2A63A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s3band" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7FE9B4" stopOpacity="0" /><stop offset="0.5" stopColor="#9CFFCE" stopOpacity="0.85" />
            <stop offset="1" stopColor="#7FE9B4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s3rust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A5A2E" stopOpacity="0.55" /><stop offset="1" stopColor="#8A5A2E" stopOpacity="0" />
          </linearGradient>
          <pattern id="s3chev" width={36} height={20} patternUnits="userSpaceOnUse">
            <rect width={36} height={20} fill="#1E2621" />
            <polygon points="0,20 15,0 29,0 14,20" fill="#C79427" />
          </pattern>
          {/* the worn painted impact box on the apron */}
          <pattern id="s3hatch" width={22} height={22} patternUnits="userSpaceOnUse">
            <line x1={-4} y1={22} x2={22} y2={-4} stroke="#C79427" strokeWidth={6} opacity={0.30} />
          </pattern>
          {/* everything violent is CLIPPED to the paddock — nothing may spill past the wire */}
          <clipPath id="s3in">
            <polygon points={`${CORNER},0 1012,0 1012,792 ${SNX},792 ${CORNER},${FBASE}`} />
          </clipPath>
          <clipPath id="s3cage">
            <rect x={CORNER} y={FTOP} width={1012 - CORNER} height={FENCE_H} />
            <polygon points={`${CORNER},${FTOP} ${SNX},${SNTOP} ${SNX},${SNBASE} ${CORNER},${FBASE}`} />
          </clipPath>
        </defs>

        {/* --- plane 6: dusk sky + the floodlight cone from the LEFT pylon --- */}
        <Room wall1="#0D2622" wall2="#153A2C" floor1="#3D4A41" floor2="#141C18" floorY={FBASE} beam="#CFE8D6" beamX={LAMPX} />
        <rect x={0} y={30} width={1012} height={278} fill="url(#s3amb)" />
        {/* the dusk itself — a low amber wash behind the treeline so the palette is
            forest green AND dusk amber, not one flat green */}
        <ellipse cx={330} cy={302} rx={520} ry={128} fill="#E9A64C" opacity={0.16} />
        <ellipse cx={880} cy={296} rx={330} ry={92} fill="#D98E3E" opacity={0.11} />

        {/* --- plane 6: the treeline (two rows for depth) --- */}
        {TREES_FAR.map((d, i) => <path key={"tf" + i} d={d} fill="#1D3E31" />)}
        {TREES_NEAR.map((d, i) => <path key={"tn" + i} d={d} fill="#0C2118" />)}

        {/* --- plane 5: the far grass beyond the wire, mown in stripes --- */}
        <rect x={0} y={BERM} width={1012} height={FBASE - BERM + 4} fill="url(#s3lawn)" />
        <rect x={0} y={BERM} width={1012} height={7} fill="#4A6A42" opacity={0.7} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={"mw" + i} x={0} y={BERM + 16 + i * 56} width={1012} height={26 + i * 4}
            fill="#4F7143" opacity={0.16 + i * 0.02} />
        ))}
        <ellipse cx={300} cy={430} rx={330} ry={110} fill="url(#s3duskpool)" />

        {/* --- plane 5: THE CONTROL CABIN, OUTSIDE the wire. Lit slit window, a figure
                in it that never once moves, a chimney, an aerial, a hose reel. --- */}
        <g>
          <ellipse cx={CABINX + CABINW * 0.72} cy={CABINB + 5} rx={CABINW * 0.66} ry={13} fill="#16240F" opacity={0.5} />
          {/* gravel path running away to the left edge */}
          <polygon points={`${CABINX + 30},${CABINB} ${CABINX + 78},${CABINB} 34,${CABINB + 62} 0,${CABINB + 58}`} fill="#6E6A56" opacity={0.55} />
          <polygon points={`${CABINX + 34},${CABINB} ${CABINX + 62},${CABINB} 40,${CABINB + 56} 16,${CABINB + 54}`} fill="#847F66" opacity={0.35} />
          {/* body + roof */}
          <rect x={CABINX} y={CABINB - 108} width={CABINW} height={108} rx={3} fill="url(#s3hut)" />
          <polygon points={`${CABINX - 12},${CABINB - 108} ${CABINX + CABINW + 12},${CABINB - 108} ${CABINX + CABINW + 4},${CABINB - 124} ${CABINX - 4},${CABINB - 124}`} fill="#4E4C3E" />
          <rect x={CABINX - 12} y={CABINB - 110} width={CABINW + 24} height={5} fill="#D9D0B4" opacity={0.5} />
          {/* corrugation */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={"cg" + i} x1={CABINX + 8 + i * 19} y1={CABINB - 104} x2={CABINX + 8 + i * 19} y2={CABINB - 4} stroke="#8B8168" strokeWidth={2} opacity={0.4} />
          ))}
          {/* the lit slit window + the still figure */}
          <rect x={CABINX + 16} y={CABINB - 88} width={70} height={38} rx={2} fill="#3C3728" />
          <rect x={CABINX + 20} y={CABINB - 84} width={62} height={30} fill="#F0C87E" opacity={0.75} />
          <rect x={CABINX + 44} y={CABINB - 78} width={17} height={24} rx={7} fill="#4A4030" opacity={0.85} />
          <ellipse cx={CABINX + 51} cy={CABINB - 70} rx={54} ry={30} fill="url(#s3warm)" opacity={0.5} />
          {/* door + step */}
          <rect x={CABINX + 102} y={CABINB - 78} width={38} height={78} rx={2} fill="#5C543F" />
          <rect x={CABINX + 102} y={CABINB - 78} width={5} height={78} fill="#8F856A" opacity={0.6} />
          <circle cx={CABINX + 134} cy={CABINB - 40} r={3} fill="#D6C89C" />
          <rect x={CABINX + 96} y={CABINB - 2} width={50} height={9} rx={2} fill="#4A4536" />
          {/* chimney + aerial */}
          <rect x={CABINX + 22} y={CABINB - 152} width={11} height={30} fill="#4C4A3C" />
          <rect x={CABINX + 18} y={CABINB - 156} width={19} height={7} rx={2} fill="#69664F" />
          <line x1={CABINX + 128} y1={CABINB - 124} x2={CABINX + 128} y2={CABINB - 186} stroke="#4C4A3C" strokeWidth={3} />
          <line x1={CABINX + 116} y1={CABINB - 178} x2={CABINX + 140} y2={CABINB - 178} stroke="#4C4A3C" strokeWidth={3} />
          <line x1={CABINX + 119} y1={CABINB - 166} x2={CABINX + 137} y2={CABINB - 166} stroke="#4C4A3C" strokeWidth={3} />
          {/* hose reel bolted to the gable end */}
          <circle cx={CABINX + CABINW - 16} cy={CABINB - 58} r={15} fill="#3F4A36" />
          <circle cx={CABINX + CABINW - 16} cy={CABINB - 58} r={8} fill="#5D6B4E" />
          <path d={`M ${CABINX + CABINW - 16} ${CABINB - 43} q 6 26 -14 34`} stroke="#3F4A36" strokeWidth={4} fill="none" />
        </g>

        {/* --- plane 5: THE FLOODLIGHT PYLON — the single key, out on the safe lawn,
                pushed camera-LEFT so the title card never eats the light source. --- */}
        <g>
          <polygon points={`58,${FBASE} 122,${FBASE} 106,196 74,196`} fill="url(#s3steel)" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const t0 = i / 7, t1 = (i + 1) / 7;
            const y0 = 196 + t0 * (FBASE - 196), y1 = 196 + t1 * (FBASE - 196);
            const l0 = 74 - t0 * 16, r0 = 106 + t0 * 16, l1 = 74 - t1 * 16, r1 = 106 + t1 * 16;
            return <path key={"px" + i} d={`M ${l0} ${y0} L ${r1} ${y1} M ${r0} ${y0} L ${l1} ${y1} M ${l1} ${y1} L ${r1} ${y1}`} stroke="#48554C" strokeWidth={3} fill="none" />;
          })}
          {/* the maintenance ladder up the mast — a detail you only find on a rewatch */}
          <line x1={112} y1={210} x2={128} y2={FBASE} stroke="#3D4A42" strokeWidth={3} />
          <line x1={122} y1={210} x2={140} y2={FBASE} stroke="#3D4A42" strokeWidth={3} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={"ld" + i} x1={113 + i * 2.4} y1={224 + i * 58} x2={123 + i * 2.6} y2={224 + i * 58} stroke="#3D4A42" strokeWidth={2.5} />
          ))}
          <rect x={36} y={168} width={108} height={13} rx={3} fill="#3A453D" />
          {[0, 1, 2, 3].map((i) => (
            <g key={"lp" + i}>
              <rect x={42 + i * 26} y={144} width={20} height={26} rx={3} fill="#4C594F" />
              <rect x={44 + i * 26} y={166} width={16} height={8} rx={2} fill="#F4FFF6" opacity={0.55 + 0.45 * buzz} />
            </g>
          ))}
          <ellipse cx={LAMPX} cy={LAMPY} rx={150} ry={96} fill="url(#s3lamp)" opacity={0.7 + 0.3 * buzz} />
        </g>

        {/* --- plane 3: the paddock APRON (concrete), bounded by the wire on the near-left --- */}
        <polygon points={`${CORNER},${FBASE} 1012,${FBASE} 1012,792 ${SNX},792`} fill="#2E3A33" />
        <polygon points={`${CORNER},${FBASE} 1012,${FBASE} 1012,792 ${SNX},792`} fill="url(#s3pool)" opacity={0.9} />
        <g clipPath="url(#s3in)">
          {/* the painted hazard-hatched IMPACT BOX around the test wall, worn thin */}
          <polygon points={`330,704 690,676 736,760 300,792`} fill="url(#s3hatch)" opacity={0.55} />
          <polygon points={`330,704 690,676 736,760 300,792`} fill="none" stroke="#C79427" strokeWidth={4} opacity={0.26} />
          {/* SCORCH RINGS FROM PREVIOUS TESTS — this paddock has a history */}
          {OLD_BURNS.map((b, i) => (
            <g key={"ob" + i}>
              <ellipse cx={b.x} cy={b.y} rx={b.r} ry={b.r * 0.28} fill="#161C16" opacity={0.34} />
              <ellipse cx={b.x} cy={b.y} rx={b.r * 0.6} ry={b.r * 0.17} fill="#0D110D" opacity={0.4} />
            </g>
          ))}
          {/* drag + skid marks */}
          <path d="M 620 736 q 110 -18 216 -6" stroke="#141A15" strokeWidth={9} fill="none" opacity={0.35} />
          <path d="M 604 764 q 130 -14 244 0" stroke="#141A15" strokeWidth={6} fill="none" opacity={0.28} />
          {/* an inspection drain */}
          <g transform="translate(776 700)">
            <rect x={-32} y={-11} width={64} height={22} rx={3} fill="#232B25" />
            {[0, 1, 2, 3].map((i) => <line key={"dg" + i} x1={-26 + i * 17} y1={-8} x2={-26 + i * 17} y2={8} stroke="#4C574E" strokeWidth={3} />)}
            <rect x={-32} y={-11} width={64} height={3} fill="#5C6960" opacity={0.6} />
          </g>
          {/* the taped-down cable run from the genset, sagging when the ground shakes */}
          <path d={`M ${GENX + 10} ${GENB - 4} q -120 ${26 + cableSag} -300 ${34 + cableSag * 1.4} T 470 ${706 + cableSag}`}
            stroke="#10160F" strokeWidth={9} fill="none" opacity={0.7} />
          <path d={`M ${GENX + 10} ${GENB - 7} q -120 ${26 + cableSag} -300 ${34 + cableSag * 1.4} T 470 ${703 + cableSag}`}
            stroke="#3E4A3C" strokeWidth={3} fill="none" opacity={0.6} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={"tp" + i} x={520 + i * 82} y={690 + i * 4} width={26} height={9} rx={2} fill="#C79427" opacity={0.35} />
          ))}
        </g>
        {[0, 1, 2, 3].map((i) => (
          <line key={"ej" + i} x1={CORNER + 40 + i * 140} y1={FBASE + 2} x2={CORNER - 40 + i * 240} y2={792}
            stroke="#0E1512" strokeWidth={3} opacity={0.45} />
        ))}
        {/* two burnt-out crate carcasses — he has been at this a while */}
        {[{ x: 520, y: 760, r: -14 }, { x: 830, y: 736, r: 9 }].map((w, i) => (
          <g key={"wk" + i} transform={`translate(${w.x} ${w.y}) rotate(${w.r})`}>
            <ellipse cx={WRECK * 0.72} cy={WRECK * 0.56} rx={WRECK * 0.72} ry={12} fill="#0B120E" opacity={0.6} />
            <path d={`M 0 ${WRECK * 0.5} L 6 0 L ${WRECK - 10} 4 L ${WRECK} ${WRECK * 0.5} Z`} fill="#2E271D" />
            <path d={`M 6 0 L ${WRECK - 10} 4 L ${WRECK - 16} 16 L 12 12 Z`} fill="#463A28" />
            <line x1={10} y1={WRECK * 0.26} x2={WRECK - 8} y2={WRECK * 0.28} stroke="#171208" strokeWidth={4} />
          </g>
        ))}

        {/* ===== PERSISTENT DAMAGE 1 — the crater the crate leaves, and it stays ===== */}
        {scorch > 0.01 && (
          <g clipPath="url(#s3in)" opacity={scorch}>
            <ellipse cx={BLX} cy={BLY - 4} rx={152} ry={32} fill="#0F0D09" opacity={0.62} />
            <path d={`M ${BLX - 156} ${BLY - 4} l 54 -19 l 34 12 l 40 -22 l 46 15 l 44 -12 l 40 22 l -46 26 l -70 12 l -84 -6 z`}
              fill="#161310" opacity={0.7} />
            <ellipse cx={BLX} cy={BLY - 6} rx={72} ry={16} fill="#070605" opacity={0.75} />
            <ellipse cx={BLX} cy={BLY - 8} rx={100} ry={22} fill="none" stroke="#6A5636" strokeWidth={3} opacity={0.4} />
          </g>
        )}
        {/* charred fragments that settled and never move again */}
        {fallout > 0.01 && FALLOUT.map((p, i) => (
          <g key={"fo" + i} opacity={fallout} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
            <ellipse cx={p.w * 0.2} cy={5} rx={p.w * 0.6} ry={5} fill="#0A0F0B" opacity={0.55} />
            <path d={`M ${-p.w / 2} 2 L ${-p.w / 3} ${-p.w * 0.42} L ${p.w / 2} ${-p.w * 0.2} L ${p.w / 2.4} 3 Z`} fill="#241D14" />
            <path d={`M ${-p.w / 3} ${-p.w * 0.42} L ${p.w / 2} ${-p.w * 0.2} L ${p.w / 3} ${-p.w * 0.1} Z`} fill="#3E3322" />
          </g>
        ))}

        {/* --- plane 4: THE CAGE — back run (with the GATE), corner post, side run --- */}
        <g>
          <rect x={CORNER} y={FTOP + 4} width={1012 - CORNER} height={FENCE_H - 8} fill="#0D1712" opacity={0.24} />
          {meshBack}
          {/* ONE BRIGHT REPLACEMENT PANEL — something already broke here before today */}
          <g opacity={0.9}>
            <rect x={866} y={FTOP + 10} width={130} height={FENCE_H - 26} fill="#16241C" opacity={0.3} />
            {[0, 1, 2, 3].map((i) => <line key={"nv" + i} x1={880 + i * 34} y1={FTOP + 12} x2={880 + i * 34} y2={FBASE - 8} stroke="#A9BBAC" strokeWidth={2.4} opacity={0.5} />)}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <line key={"nh" + i} x1={868} y1={FTOP + 22 + i * 38} x2={996} y2={FTOP + 22 + i * 38} stroke="#A9BBAC" strokeWidth={2.2} opacity={0.4} />)}
            <rect x={864} y={FTOP + 8} width={6} height={FENCE_H - 22} fill="#8FA294" opacity={0.6} />
            <rect x={994} y={FTOP + 8} width={6} height={FENCE_H - 22} fill="#8FA294" opacity={0.6} />
          </g>
          {/* a WIRE-LACED PATCH over an old hole */}
          <g opacity={0.85}>
            <rect x={600} y={192} width={66} height={72} fill="#0E1913" opacity={0.55} />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={"lc" + i} d={`M ${600} ${196 + i * 17} L ${666} ${206 + i * 17} M ${666} ${196 + i * 17} L ${600} ${206 + i * 17}`} stroke="#B7A468" strokeWidth={2.4} fill="none" opacity={0.6} />
            ))}
            <rect x={598} y={190} width={70} height={4} fill="#B7A468" opacity={0.5} />
          </g>
          {[520, 660, 862, 1000].map((x) => (
            <g key={"po" + x}>
              <rect x={x - POST_W / 2} y={FTOP - 6} width={POST_W} height={FENCE_H + 6} fill="url(#s3steel)" />
              <rect x={x - POST_W / 2} y={FTOP - 6} width={6} height={FENCE_H + 6} fill="#77857A" opacity={0.7} />
              {/* bolt plate + the rust streak running off it */}
              <rect x={x - POST_W / 2 - 5} y={FTOP + 148} width={POST_W + 10} height={16} rx={2} fill="#2A332C" />
              {[0, 1].map((k) => <circle key={"bt" + k} cx={x - 8 + k * 16} cy={FTOP + 156} r={3} fill="#7E8C81" />)}
              <rect x={x - 7} y={FTOP + 164} width={14} height={120} fill="url(#s3rust)" />
            </g>
          ))}
          {/* the concrete kicker plate along the fence foot, sooted near the blast */}
          <rect x={CORNER} y={FBASE - 20} width={1012 - CORNER} height={20} fill="#3A443C" />
          <rect x={CORNER} y={FBASE - 20} width={1012 - CORNER} height={4} fill="#68766B" opacity={0.6} />

          {/* THE GATE — a 2.0 m door in the wire. The hero stands right against it at f0,
              so the viewer gets a free door-height read on him. Hazard tape lives HERE. */}
          <g>
            <rect x={GATE_X} y={GATE_T} width={GATE_W} height={GATE_H} fill="#101B15" opacity={0.5} />
            <rect x={GATE_X} y={GATE_T} width={GATE_W} height={9} fill="url(#s3chev)" />
            <rect x={GATE_X} y={GATE_T} width={9} height={GATE_H} fill="url(#s3chev)" />
            <rect x={GATE_X + GATE_W - 9} y={GATE_T} width={9} height={GATE_H} fill="url(#s3chev)" />
            {/* no chevron at the gate foot — it crossed the hero's torso in the last render */}
            <rect x={GATE_X} y={FBASE - 9} width={GATE_W} height={9} fill="#2B342E" />
            {/* heavy latch bar + hasp, left face lit */}
            <rect x={GATE_X + 14} y={GATE_T + 122} width={GATE_W - 28} height={17} rx={4} fill="#4A564D" />
            <rect x={GATE_X + 14} y={GATE_T + 122} width={GATE_W - 28} height={5} rx={2} fill="#8A968C" opacity={0.7} />
            <rect x={GATE_X + GATE_W / 2 - 13} y={GATE_T + 112} width={26} height={38} rx={5} fill="#2B342E" />
            <circle cx={GATE_X + GATE_W / 2} cy={GATE_T + 131} r={7} fill="#C79427" />
            {/* ⛔ PERSISTENT DAMAGE 2 — the gate's caged lamp. Lit at f0; the detonation
                shatters it, it goes dark and hangs off its flex for the rest of the reel. */}
            <g transform={`rotate(${26 * lampDead} ${GATE_X + 34} ${GATE_T - 6})`}>
              <line x1={GATE_X + 34} y1={GATE_T - 6} x2={GATE_X + 34} y2={GATE_T + 16} stroke="#2A332C" strokeWidth={4} />
              <rect x={GATE_X + 20} y={GATE_T + 14} width={28} height={22} rx={4} fill="#333D35" />
              <rect x={GATE_X + 23} y={GATE_T + 18} width={22} height={14} rx={3}
                fill={lampDead > 0.6 ? "#1A211B" : "#FFE6AE"} opacity={lampDead > 0.6 ? 1 : 1 - lampDead * 0.4} />
              {[0, 1, 2].map((i) => <line key={"cgz" + i} x1={GATE_X + 25 + i * 8} y1={GATE_T + 14} x2={GATE_X + 25 + i * 8} y2={GATE_T + 36} stroke="#222A23" strokeWidth={2.4} />)}
              {lampDead > 0.6 && <path d={`M ${GATE_X + 24} ${GATE_T + 20} l 9 7 l -5 6 l 12 -4`} stroke="#6E7A6E" strokeWidth={2} fill="none" />}
              {lampDead < 0.6 && <ellipse cx={GATE_X + 34} cy={GATE_T + 25} rx={44} ry={30} fill="url(#s3warm)" opacity={0.6 * (1 - lampDead)} />}
            </g>
          </g>

          {/* the ONLY hazard tape: a taut boundary marker on the fence line, well above his head */}
          <rect x={CORNER} y={FTOP - 22} width={1012 - CORNER} height={20} fill="url(#s3chev)" />
          <rect x={CORNER} y={FTOP - 24} width={1012 - CORNER} height={4} fill="#D3AE72" opacity={0.85} />
          {/* one torn ribbon of it, the only thing on the fence that moves on its own */}
          <path d={`M 916 ${FTOP - 4} q 14 ${16 + tapeFlut} 4 ${34 + tapeFlut} q -10 ${14 - tapeFlut} 8 ${26}`}
            stroke="#C79427" strokeWidth={7} fill="none" opacity={0.55} strokeLinecap="round" />

          {/* THE DAMAGE TALLY BOARD — four lamps, no words. Lights one per beat and
              never goes back out; by the last second the board is full. */}
          <g>
            <rect x={TALLYX + 5} y={TALLYY + 6} width={124} height={106} rx={4} fill="#080D0A" opacity={0.45} />
            <rect x={TALLYX} y={TALLYY} width={124} height={106} rx={4} fill="#232C26" />
            <rect x={TALLYX} y={TALLYY} width={124} height={5} fill="#6C7A6E" opacity={0.6} />
            <rect x={TALLYX} y={TALLYY} width={124} height={13} fill="url(#s3chev)" />
            {[0, 1, 2, 3].map((i) => {
              const cx = TALLYX + 14 + (i % 2) * 54, cy = TALLYY + 24 + Math.floor(i / 2) * 40;
              const on = i < tally;
              return (
                <g key={"tl" + i}>
                  <rect x={cx} y={cy} width={44} height={30} rx={3} fill="#121813" />
                  <rect x={cx + 3} y={cy + 3} width={38} height={24} rx={2}
                    fill={on ? "#F0A93A" : "#1D2620"} opacity={on ? 0.55 + 0.45 * (0.6 + 0.4 * Math.sin(lf / 3 + i)) : 1} />
                  {on && <ellipse cx={cx + 22} cy={cy + 15} rx={40} ry={26} fill="url(#s3amberpool)" opacity={0.2} />}
                </g>
              );
            })}
            <rect x={TALLYX + 10} y={TALLYY + 100} width={104} height={4} rx={2} fill="#4A564D" />
          </g>

          {/* KLAXON HORNS on the wire — a twin PA cluster above the gate. Their rings
              are dim arcs, never a bright mover. */}
          {[{ x: 892, y: 206, d: -1 }, { x: 892, y: 254, d: -1 }].map((k, i) => (
            <g key={"kx" + i}>
              <rect x={k.x - 5} y={k.y - 4} width={10} height={26} fill="#2A332C" />
              <polygon points={`${k.x},${k.y} ${k.x + k.d * 40},${k.y - 17} ${k.x + k.d * 40},${k.y + 19} `} fill="#3E4A42" />
              <polygon points={`${k.x + k.d * 40},${k.y - 17} ${k.x + k.d * 40},${k.y + 19} ${k.x + k.d * 34},${k.y + 15} ${k.x + k.d * 34},${k.y - 13}`} fill="#77857A" opacity={0.55} />
              {klaxT >= 0 && [0, 1].map((r) => {
                const p = (klaxT + r * 0.5) % 1;
                return <path key={"kr" + r} d={`M ${k.x + k.d * (46 + p * 42)} ${k.y - 20 - p * 20} q ${k.d * 14} ${20 + p * 20} 0 ${40 + p * 40}`}
                  stroke="#E8B764" strokeWidth={3} fill="none" opacity={(1 - p) * 0.30 * alarm} />;
              })}
            </g>
          ))}
          {/* the amber beacon on top of the far post — the facility's own panic light */}
          <g>
            <rect x={854} y={FTOP - 40} width={16} height={16} rx={2} fill="#2A332C" />
            <path d={`M 852 ${FTOP - 40} q 10 -20 20 0 z`} fill={bcn > 0.1 ? "#F5B94E" : "#5E5432"} />
            {bcn > 0.02 && <ellipse cx={862} cy={FTOP - 44} rx={64} ry={40} fill="url(#s3amberpool)" opacity={0.5 * bcn} />}
          </g>

          {/* HV insulator line + the controller box that keeps blinking through everything */}
          <g>
            {[500, 620, 740, 860, 980].map((x) => (
              <g key={"in" + x}>
                <rect x={x - 3} y={FTOP + 18} width={6} height={12} fill="#3A453D" />
                <ellipse cx={x} cy={FTOP + 34} rx={7} ry={9} fill="#6E5B3A" />
              </g>
            ))}
            <path d={`M ${CORNER} ${FTOP + 40} Q 740 ${FTOP + 48} 1012 ${FTOP + 36}`} stroke="#8CA593" strokeWidth={2.6} fill="none" opacity={0.55} />
            <rect x={CORNER + 4} y={FTOP + 62} width={40} height={54} rx={4} fill="#2C362E" />
            <rect x={CORNER + 4} y={FTOP + 62} width={7} height={54} fill="#71806F" opacity={0.6} />
            <circle cx={CORNER + 24} cy={FTOP + 80} r={5} fill="#7FE9B4" opacity={0.35 + 0.55 * (0.5 + 0.5 * Math.sin(lf / 4.6))} />
            <rect x={CORNER + 12} y={FTOP + 94} width={24} height={5} rx={2} fill="#59654F" />
          </g>

          {/* BLAST MATS hung on the wire. They inherit every impact; at f132 one hook
              tears and that mat hangs crooked for the rest of the scene. */}
          {[0, 1, 2].map((i) => {
            const mx = 862 + i * 50;
            const tear = i === 1 ? matTorn : 0;
            return (
              <g key={"bm" + i} transform={`rotate(${matSway * (0.6 + i * 0.2) - 15 * tear} ${mx + 21} 302) translate(0 ${9 * tear})`}>
                <rect x={mx + 5} y={296} width={7} height={12} rx={3} fill="#7E8C81" opacity={1 - tear} />
                <rect x={mx + 30} y={296} width={7} height={12} rx={3} fill="#7E8C81" />
                <rect x={mx} y={304} width={42} height={218} rx={3} fill="#191F1A" />
                <rect x={mx} y={304} width={7} height={218} fill="#3B453C" opacity={0.7} />
                {[0, 1, 2, 3, 4, 5, 6].map((k) => <line key={"mr" + k} x1={mx + 2} y1={318 + k * 29} x2={mx + 40} y2={318 + k * 29} stroke="#2C342D" strokeWidth={4} />)}
                {tear > 0.5 && <path d={`M ${mx + 4} 306 l 10 12 l -8 6`} stroke="#3B453C" strokeWidth={3} fill="none" />}
              </g>
            );
          })}

          {/* corner post — scored with the tally scratches of every previous run */}
          <rect x={CORNER - 16} y={FTOP - 30} width={32} height={FENCE_H + 30} fill="url(#s3steel)" />
          <rect x={CORNER - 16} y={FTOP - 30} width={8} height={FENCE_H + 30} fill="#7E8C81" opacity={0.75} />
          {[0, 1, 2, 3].map((g) => (
            <g key={"sc" + g}>
              {[0, 1, 2, 3].map((k) => <line key={"sk" + k} x1={CORNER - 9 + k * 5} y1={452 + g * 26} x2={CORNER - 9 + k * 5} y2={470 + g * 26} stroke="#9EAC9F" strokeWidth={2} opacity={0.5} />)}
              <line x1={CORNER - 11} y1={470 + g * 26} x2={CORNER + 10} y2={452 + g * 26} stroke="#9EAC9F" strokeWidth={2} opacity={0.5} />
            </g>
          ))}
          {/* side run, receding toward camera-LEFT */}
          <polygon points={`${CORNER},${FTOP} ${SNX},${SNTOP} ${SNX},${SNBASE} ${CORNER},${FBASE}`} fill="#0D1712" opacity={0.3} />
          {meshSide}
          {/* PERSISTENT DAMAGE 3 — soot blown onto the inside face of the wire */}
          {soot > 0.01 && (
            <g clipPath="url(#s3cage)" opacity={soot * 0.55}>
              <ellipse cx={306} cy={646} rx={168} ry={126} fill="#0A0E09" />
              <ellipse cx={252} cy={700} rx={110} ry={86} fill="#0A0E09" opacity={0.8} />
            </g>
          )}
          {/* ⛔ PERSISTENT DAMAGE 6 — the bulge he leaves in the mesh, the bent post,
              the arc scorch and two snapped ties. All of it stays. */}
          {dent > 0.01 && (
            <g clipPath="url(#s3cage)">
              {/* the mesh BOWS out around the point of contact and stays bowed */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const y = 546 + i * 34;
                const w = 1 - Math.abs(i - 2.5) / 3.2;
                return <path key={"dt" + i} d={`M ${372} ${y - 30} Q ${304 - 50 * dent * w} ${y} ${362} ${y + 34}`}
                  stroke="#8FA394" strokeWidth={3} fill="none" opacity={0.5 * dent} />;
              })}
              {/* the bent stay + the scorch the discharge burns into the wire */}
              <path d={`M ${330} 552 q ${-46 * dent} 86 4 150`} stroke="#8FA394" strokeWidth={5} fill="none" opacity={0.5 * dent} />
              <ellipse cx={308} cy={648} rx={70} ry={80} fill="#0B0F0A" opacity={0.4 * dent} />
              <path d="M 278 618 l 26 14 l -15 16 l 32 10" stroke="#C3D6B4" strokeWidth={3.4} fill="none" opacity={0.4 * dent} />
              {/* two snapped ties, hanging */}
              <path d={`M 348 566 q 11 22 -7 34`} stroke="#7D8C81" strokeWidth={4} fill="none" opacity={0.7 * dent} />
              <path d={`M 296 702 q -12 20 5 32`} stroke="#7D8C81" strokeWidth={4} fill="none" opacity={0.7 * dent} />
            </g>
          )}
          {/* the ARC at the moment of contact — a short, bright, single event */}
          {lf >= 128 && lf < 142 && (
            <g clipPath="url(#s3cage)" opacity={(1 - seg(lf, 128, 142)) * 0.9}>
              <path d="M 330 578 l -28 40 l 22 10 l -36 42 l 32 8 l -24 36" stroke="#E6FFEE" strokeWidth={5} fill="none" strokeLinejoin="round" />
              <ellipse cx={310} cy={648} rx={96} ry={110} fill="#9CFFCE" opacity={0.16} />
            </g>
          )}
          <polygon points={`${CORNER},${FTOP - 22} ${SNX},${SNTOP - 34} ${SNX},${SNTOP} ${CORNER},${FTOP}`} fill="url(#s3chev)" />
          {/* a small warning plate bolted to the wire — glyph only, no copy */}
          <g transform="translate(348 300)">
            <polygon points="0,44 24,0 48,44" fill="#C79427" stroke="#1E2621" strokeWidth={3} />
            <rect x={21} y={14} width={6} height={16} fill="#1E2621" />
            <rect x={21} y={34} width={6} height={6} fill="#1E2621" />
          </g>
        </g>

        {/* --- plane 3: THE PADDOCK'S OWN KIT, all inside the wire ---------------- */}
        {/* the spare-panel LEAN — revealed when the wall goes, then flattened by it */}
        <g>
          {[0, 1, 2].map((i) => {
            const px = PNX + i * 16;
            const fall = i === 0 ? panelDown : 0;
            return (
              <g key={"sp" + i} transform={`rotate(${-9 - i * 3 - 74 * fall} ${px} ${PNB})`}>
                <rect x={px} y={PNB - PANEL_H} width={PANEL_W} height={PANEL_H} fill="#131C16" opacity={0.5} />
                <rect x={px} y={PNB - PANEL_H} width={PANEL_W} height={7} fill="#5E6B62" />
                <rect x={px} y={PNB - 7} width={PANEL_W} height={7} fill="#3B453D" />
                <rect x={px} y={PNB - PANEL_H} width={7} height={PANEL_H} fill="#6E7C71" />
                <rect x={px + PANEL_W - 7} y={PNB - PANEL_H} width={7} height={PANEL_H} fill="#2B342E" />
                {[0, 1, 2, 3].map((k) => <line key={"pv" + k} x1={px + 18 + k * 26} y1={PNB - PANEL_H + 8} x2={px + 18 + k * 26} y2={PNB - 8} stroke="#7C8B80" strokeWidth={2} opacity={0.4} />)}
                {[0, 1, 2, 3, 4, 5].map((k) => <line key={"ph" + k} x1={px + 6} y1={PNB - PANEL_H + 24 + k * 32} x2={px + PANEL_W - 6} y2={PNB - PANEL_H + 24 + k * 32} stroke="#7C8B80" strokeWidth={2} opacity={0.32} />)}
              </g>
            );
          })}
        </g>
        {/* the SANDBAG PALLET */}
        <g transform="translate(700 664)">
          <ellipse cx={44} cy={6} rx={62} ry={11} fill="#0B120E" opacity={0.55} />
          <rect x={-6} y={-8} width={100} height={12} rx={2} fill="#3A2F1E" />
          {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
            <g key={`sb${r}${c}`} transform={`translate(${2 + c * 30 + (r % 2) * 8} ${-20 - r * (DRUM_H / 3)})`}>
              <rect x={0} y={0} width={31} height={DRUM_H / 3 + 2} rx={7} fill="#5A5540" />
              <rect x={0} y={0} width={31} height={5} rx={2} fill="#7C765A" opacity={0.7} />
            </g>
          )))}
        </g>
        {/* the TYRE STACK — the top one is knocked off by the blast and stays where it lands */}
        <g>
          <ellipse cx={TYX + TYRE_W / 2} cy={TYB + 5} rx={TYRE_W * 0.62} ry={11} fill="#0B120E" opacity={0.55} />
          {[0, 1].map((i) => (
            <g key={"ty" + i}>
              <ellipse cx={TYX + TYRE_W / 2} cy={TYB - 8 - i * (TYRE_H - 12)} rx={TYRE_W / 2} ry={TYRE_H / 2} fill="#171C18" />
              <ellipse cx={TYX + TYRE_W / 2} cy={TYB - 12 - i * (TYRE_H - 12)} rx={TYRE_W / 2 - 4} ry={TYRE_H / 2 - 4} fill="#2A322B" />
              <ellipse cx={TYX + TYRE_W / 2} cy={TYB - 12 - i * (TYRE_H - 12)} rx={TYRE_W / 5} ry={TYRE_H / 5} fill="#111511" />
              <path d={`M ${TYX + 8} ${TYB - 20 - i * (TYRE_H - 12)} a ${TYRE_W / 2 - 8} ${TYRE_H / 2 - 6} 0 0 1 ${TYRE_W * 0.42} ${-4}`} stroke="#4C574E" strokeWidth={3} fill="none" opacity={0.6} />
            </g>
          ))}
          {/* the knocked-off tyre: falls right, rolls, comes to rest — permanently */}
          <g transform={`translate(${TYX + 8 + 96 * eOut(tyreOff)} ${TYB - 8 - (TYRE_H - 12) * 2 + 54 * eIn(tyreOff)}) rotate(${118 * tyreOff} ${TYRE_W / 2} 0)`}>
            <ellipse cx={TYRE_W / 2} cy={9} rx={TYRE_W * 0.5} ry={9} fill="#0B120E" opacity={0.45 * tyreOff} />
            <ellipse cx={TYRE_W / 2} cy={0} rx={TYRE_W / 2} ry={TYRE_H / 2 + tyreOff * 22} fill="#171C18" />
            <ellipse cx={TYRE_W / 2} cy={-3} rx={TYRE_W / 2 - 4} ry={TYRE_H / 2 - 4 + tyreOff * 20} fill="#2A322B" />
            <ellipse cx={TYRE_W / 2} cy={-3} rx={TYRE_W / 5} ry={TYRE_H / 5 + tyreOff * 12} fill="#111511" />
          </g>
        </g>
        {/* the FIRE POINT — a stand and an extinguisher nobody is going to reach in time */}
        <g transform="translate(792 662)">
          <ellipse cx={16} cy={4} rx={26} ry={8} fill="#0B120E" opacity={0.5} />
          <rect x={2} y={-EXT_H - 12} width={30} height={12} rx={2} fill="#3E4A42" />
          <rect x={14} y={-12} width={6} height={12} fill="#3E4A42" />
          <rect x={6} y={-EXT_H} width={20} height={EXT_H - 12} rx={7} fill="#A8402E" />
          <rect x={6} y={-EXT_H} width={6} height={EXT_H - 12} rx={3} fill="#C9614C" opacity={0.75} />
          <rect x={11} y={-EXT_H - 8} width={10} height={9} rx={2} fill="#2E3730" />
        </g>
        {/* the DIESEL GENSET — stack smoke, a spinning extractor fan, a twitching gauge */}
        <g>
          <ellipse cx={GENX + GEN_W * 0.62} cy={GENB + 6} rx={GEN_W * 0.62} ry={12} fill="#0B120E" opacity={0.55} />
          <rect x={GENX + 118} y={GENB - GEN_H - 78} width={17} height={82} fill="#28312A" />
          <rect x={GENX + 113} y={GENB - GEN_H - 86} width={27} height={10} rx={3} fill="#39443C" />
          <rect x={GENX} y={GENB - GEN_H} width={GEN_W} height={GEN_H} rx={5} fill="url(#s3gen)" />
          <rect x={GENX} y={GENB - GEN_H} width={GEN_W} height={6} fill="#8A968C" opacity={0.55} />
          <rect x={GENX - 6} y={GENB - 12} width={GEN_W + 12} height={14} rx={3} fill="#232B25" />
          {/* radiator grille */}
          {[0, 1, 2, 3, 4, 5].map((i) => <line key={"rd" + i} x1={GENX + 10 + i * 8} y1={GENB - GEN_H + 14} x2={GENX + 10 + i * 8} y2={GENB - 22} stroke="#222A23" strokeWidth={4} />)}
          {/* the extractor fan — small, slow, always turning */}
          <circle cx={GENX + 96} cy={GENB - GEN_H + 40} r={22} fill="#1B221D" />
          <g transform={`rotate(${genFan} ${GENX + 96} ${GENB - GEN_H + 40})`}>
            {[0, 1, 2].map((i) => (
              <path key={"fb" + i} d={`M ${GENX + 96} ${GENB - GEN_H + 40} l 19 -6 l -4 12 z`} fill="#4E5A4F"
                transform={`rotate(${i * 120} ${GENX + 96} ${GENB - GEN_H + 40})`} />
            ))}
          </g>
          <circle cx={GENX + 96} cy={GENB - GEN_H + 40} r={4} fill="#8A968C" />
          {/* control panel: a gauge whose needle twitches on every impact + two LEDs */}
          <rect x={GENX + 126} y={GENB - GEN_H + 22} width={30} height={44} rx={3} fill="#161C17" />
          <circle cx={GENX + 141} cy={GENB - GEN_H + 38} r={11} fill="#D9D2B4" opacity={0.8} />
          <line x1={GENX + 141} y1={GENB - GEN_H + 38}
            x2={GENX + 141 + 8 * Math.cos((-120 + genNdl * 4) * DEG)}
            y2={GENB - GEN_H + 38 + 8 * Math.sin((-120 + genNdl * 4) * DEG)} stroke="#8A2E22" strokeWidth={2.4} />
          <circle cx={GENX + 134} cy={GENB - GEN_H + 58} r={3.4} fill="#7FE9B4" opacity={0.4 + 0.5 * (0.5 + 0.5 * Math.sin(lf / 5.2))} />
          <circle cx={GENX + 148} cy={GENB - GEN_H + 58} r={3.4} fill={alarm > 0.5 ? "#E8734E" : "#33402F"} opacity={alarm > 0.5 ? 0.4 + 0.6 * bcn : 1} />
        </g>
        {/* the exhaust plume — the quietest continuous motion in the frame */}
        <g clipPath="url(#s3in)">{smoke}</g>

        {/* --- plane 3: THE SWING CRANE — a lattice mast + jib INSIDE the paddock.
                The chain hangs from the jib tip at (PIVX, PIVY); nothing runs off-frame. --- */}
        <g>
          {/* mast */}
          <polygon points={`${MASTX - 26},${MASTB} ${MASTX + 26},${MASTB} ${MASTX + 15},${MASTB - MAST_H} ${MASTX - 15},${MASTB - MAST_H}`} fill="url(#s3steel)" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t0 = i / 6, t1 = (i + 1) / 6;
            const y0 = MASTB - t0 * MAST_H, y1 = MASTB - t1 * MAST_H;
            const l0 = MASTX - 26 + t0 * 11, r0 = MASTX + 26 - t0 * 11;
            const l1 = MASTX - 26 + t1 * 11, r1 = MASTX + 26 - t1 * 11;
            return <path key={"mz" + i} d={`M ${l0} ${y0} L ${r1} ${y1} M ${r0} ${y0} L ${l1} ${y1} M ${l1} ${y1} L ${r1} ${y1}`} stroke="#5A675D" strokeWidth={3} fill="none" />;
          })}
          {/* jib running LEFT from the mast head to the pivot, plus its tie cable */}
          <polygon points={`${MASTX - 8},${PIVY - 26} ${PIVX - 10},${PIVY - 16} ${PIVX - 10},${PIVY} ${MASTX - 8},${PIVY - 6}`} fill="url(#s3steel)" />
          <path d={`M ${MASTX - 8} ${PIVY - 22} L ${PIVX - 6} ${PIVY - 4} M ${MASTX - 8} ${PIVY - 6} L ${PIVX + 60} ${PIVY - 20} M ${PIVX + 120} ${PIVY - 24} L ${PIVX + 60} ${PIVY - 4}`} stroke="#7B887E" strokeWidth={3} fill="none" opacity={0.75} />
          <line x1={MASTX} y1={MASTB - MAST_H} x2={PIVX - 6} y2={PIVY - 18} stroke="#8D9A90" strokeWidth={3} opacity={0.8} />
          {/* the OPERATOR CAB at the jib root — a lit box and a red mast beacon, both
              deliberately parked right of the title card's band */}
          <g>
            <rect x={896} y={PIVY - 34} width={82} height={58} rx={5} fill="#2B342E" />
            <rect x={896} y={PIVY - 34} width={82} height={6} fill="#6E7C71" opacity={0.6} />
            <rect x={904} y={PIVY - 26} width={40} height={30} rx={3} fill="#F0C87E" opacity={0.42} />
            <rect x={950} y={PIVY - 26} width={20} height={30} rx={3} fill="#1B221D" />
            <rect x={914} y={PIVY + 24} width={44} height={8} rx={3} fill="#232B25" />
          </g>
          <circle cx={MASTX} cy={MASTB - MAST_H - 10} r={7} fill={bcn > 0.15 ? "#E8734E" : "#4A3128"} />
          {bcn > 0.05 && <ellipse cx={MASTX} cy={MASTB - MAST_H - 10} rx={40} ry={26} fill="#E8734E" opacity={0.16 * bcn} />}
          {/* counterweight slab on the mast's far side */}
          <rect x={MASTX + 22} y={PIVY - 30} width={54} height={54} rx={4} fill="#2B342E" />
          <rect x={MASTX + 22} y={PIVY - 30} width={54} height={7} fill="#5E6B62" />
          {/* trolley block at the jib tip */}
          <rect x={PIVX - 20} y={PIVY - 18} width={40} height={22} rx={4} fill="#3A453D" />
          <rect x={PIVX - 20} y={PIVY - 18} width={9} height={22} fill="#7E8C81" opacity={0.6} />
        </g>

        {/* --- plane 3: THE INNER TEST WALL — a reinforced concrete blast wall.
                Buttressed base, capped top, exposed rebar when it breaks. ALL of it
                goes over now: band A travels 150 px right, 300 px down, through 92°. --- */}
        <g transform={`translate(${jolt * 0.4} 0)`}>
          {/* buttress plinth (survives) */}
          <path d={`M ${WALL_X - 22} ${WALL_B} L ${WALL_X + 4} ${WALL_B - 54} L ${WALL_X + WALL_W - 4} ${WALL_B - 54} L ${WALL_X + WALL_W + 22} ${WALL_B} Z`} fill="#3E4A42" />
          <path d={`M ${WALL_X + 4} ${WALL_B - 54} L ${WALL_X + WALL_W - 4} ${WALL_B - 54} L ${WALL_X + WALL_W + 22} ${WALL_B} L ${WALL_X + WALL_W - 4} ${WALL_B} Z`} fill="#232C26" />
          {/* bottom course — survives, cracked */}
          <path d={`M ${WALL_X} ${WALL_B - 50} L ${WALL_X} ${WALL_T + 248} L ${WALL_X + 60} ${WALL_T + 240 + drop * 12} L ${WALL_X + 140} ${WALL_T + 254 + drop * 6} L ${WALL_X + 200} ${WALL_T + 236 + drop * 16} L ${WALL_X + WALL_W} ${WALL_T + 250} L ${WALL_X + WALL_W} ${WALL_B - 50} Z`} fill="url(#s3conc)" />
          {/* the bottom course carries its own formwork: shutter joint, tie-cone holes,
              a grime wash off the base and two old pock marks */}
          <g>
            <line x1={WALL_X + 125} y1={WALL_T + 250} x2={WALL_X + 125} y2={WALL_B - 50} stroke="#232C26" strokeWidth={2.5} opacity={0.45} />
            {[0, 1, 2, 3].map((c) => <circle key={"t0" + c} cx={WALL_X + 34 + c * 62} cy={WALL_T + 292} r={4.5} fill="#1E2620" opacity={0.6} />)}
            <rect x={WALL_X} y={WALL_B - 78} width={WALL_W} height={28} fill="#1B221C" opacity={0.28} />
            <ellipse cx={WALL_X + 62} cy={WALL_T + 282} rx={15} ry={10} fill="#1D241F" opacity={0.45} />
            <ellipse cx={WALL_X + 196} cy={WALL_T + 306} rx={11} ry={8} fill="#1D241F" opacity={0.4} />
          </g>
          {drop > 0.05 && (
            <g stroke="#1D241F" strokeWidth={3} fill="none" opacity={0.8}>
              <path d={`M ${WALL_X + 40} ${WALL_B - 50} l 26 -52 l -14 -40`} />
              <path d={`M ${WALL_X + 168} ${WALL_B - 58} l -20 -44 l 16 -30`} />
            </g>
          )}
          {/* exposed rebar at the break line */}
          {drop > 0.1 && (
            <g stroke="#8A6A3A" strokeWidth={4} fill="none" opacity={0.9}>
              <path d={`M ${WALL_X + 34} ${WALL_T + 246} l 4 -30 l -8 -18`} />
              <path d={`M ${WALL_X + 118} ${WALL_T + 250} l -3 -34 l 9 -16`} />
              <path d={`M ${WALL_X + 212} ${WALL_T + 238} l 6 -32 l -6 -20`} />
            </g>
          )}
          {/* band B — slides right and tips. Carries the stencilled impact target, so
              the ring the crew have been aiming at goes over WITH it. */}
          <g transform={`translate(${74 * drop} ${264 * drop}) rotate(${-44 * drop} ${WALL_X + WALL_W / 2} ${WALL_T + 190})`}>
            <rect x={WALL_X} y={WALL_T + 124} width={WALL_W} height={126} fill="url(#s3conc)" />
            <rect x={WALL_X} y={WALL_T + 124} width={WALL_W} height={6} fill="#9BAB97" opacity={0.5} />
            <rect x={WALL_X} y={WALL_T + 124} width={10} height={126} fill="#9BAB97" opacity={0.42} />
            <line x1={WALL_X + 125} y1={WALL_T + 130} x2={WALL_X + 125} y2={WALL_T + 248} stroke="#232C26" strokeWidth={2.5} opacity={0.4} />
            <g opacity={0.4}>
              <circle cx={WALL_X + 122} cy={WALL_T + 188} r={40} fill="none" stroke="#C79427" strokeWidth={6} />
              <circle cx={WALL_X + 122} cy={WALL_T + 188} r={15} fill="none" stroke="#C79427" strokeWidth={6} />
            </g>
            {[0, 1, 2, 3].map((c) => <circle key={"tb" + c} cx={WALL_X + 34 + c * 62} cy={WALL_T + 236} r={4.5} fill="#1E2620" opacity={0.55} />)}
            {[0, 1, 2].map((i) => {
              const s = seed(i * 4.1 + 9);
              return <ellipse key={"pb" + i} cx={WALL_X + 26 + s * 210} cy={WALL_T + 142 + seed(i * 2.2 + 3) * 26} rx={8 + s * 11} ry={6 + s * 7} fill="#1D241F" opacity={0.42} />;
            })}
          </g>
          {/* band A — the capped top course, goes right over onto the apron */}
          <g transform={`translate(${150 * drop} ${300 * drop}) rotate(${92 * drop} ${WALL_X + WALL_W / 2} ${WALL_T + 62})`}>
            <path d={`M ${WALL_X} ${WALL_T + 124} L ${WALL_X} ${WALL_T + 14} L ${WALL_X + WALL_W} ${WALL_T + 14} L ${WALL_X + WALL_W} ${WALL_T + 124} Z`} fill="url(#s3conc)" />
            <line x1={WALL_X + 125} y1={WALL_T + 18} x2={WALL_X + 125} y2={WALL_T + 122} stroke="#232C26" strokeWidth={2.5} opacity={0.4} />
            {[0, 1, 2, 3].map((c) => <circle key={"tc" + c} cx={WALL_X + 34 + c * 62} cy={WALL_T + 74} r={4.5} fill="#1E2620" opacity={0.55} />)}
            {[0, 1].map((i) => {
              const s = seed(i * 6.3 + 2);
              return <ellipse key={"pa" + i} cx={WALL_X + 44 + s * 170} cy={WALL_T + 96 + s * 18} rx={9 + s * 9} ry={7 + s * 6} fill="#1D241F" opacity={0.4} />;
            })}
            <rect x={WALL_X - 12} y={WALL_T} width={WALL_W + 24} height={16} rx={3} fill="#6E7D6C" />
            <rect x={WALL_X - 12} y={WALL_T} width={WALL_W + 24} height={5} rx={2} fill="#E0C089" opacity={0.75} />
            {/* the cap is chipped at both corners — this wall has been rebuilt before */}
            <path d={`M ${WALL_X - 12} ${WALL_T + 16} l 20 0 l -14 12 z`} fill="#3A443C" />
            <path d={`M ${WALL_X + WALL_W + 12} ${WALL_T + 16} l -22 0 l 16 14 z`} fill="#3A443C" />
            <rect x={WALL_X} y={WALL_T + 14} width={10} height={110} fill="#9BAB97" opacity={0.42} />
          </g>
          {/* the two shutter SEAMS, so all three courses read as courses before one goes */}
          {drop < 0.02 && (
            <g stroke="#1B221C" strokeWidth={3} opacity={0.5}>
              <line x1={WALL_X} y1={WALL_T + 124} x2={WALL_X + WALL_W} y2={WALL_T + 124} />
              <line x1={WALL_X} y1={WALL_T + 250} x2={WALL_X + WALL_W} y2={WALL_T + 250} />
            </g>
          )}
        </g>
        {chips}

        {/* ⛔ PERSISTENT DAMAGE 4 — the apron splits under where the rubble came down --- */}
        {crack > 0.01 && (
          <g clipPath="url(#s3in)" opacity={crack}>
            <path d="M 470 692 l 62 22 l -30 20 l 96 22 l -34 20 l 118 16"
              stroke="#0A0E0A" strokeWidth={7} fill="none" strokeLinejoin="round" />
            <path d="M 532 714 l -44 34 M 598 756 l 34 30" stroke="#0A0E0A" strokeWidth={5} fill="none" />
            <path d="M 470 690 l 62 22 l -30 20 l 96 22" stroke="#8FA08C" strokeWidth={2} fill="none" opacity={0.28} />
          </g>
        )}
        {/* settled dust film left on the concrete after the collapse */}
        {filmed > 0.005 && (
          <g clipPath="url(#s3in)">
            <ellipse cx={620} cy={716} rx={330} ry={78} fill="#B8C3AC" opacity={filmed} />
          </g>
        )}

        {/* --- CONTINUOUS MOVER B: THE WRECKING BALL on its chain, swinging all 167f --- */}
        <g>
          <line x1={PIVX} y1={PIVY} x2={ballX} y2={ballY} stroke="#131A15" strokeWidth={CHAIN_W + 5} />
          <line x1={PIVX} y1={PIVY} x2={ballX} y2={ballY} stroke="#5B6A5F" strokeWidth={CHAIN_W} strokeDasharray="16 9" />
          <circle cx={ballX} cy={ballY} r={BALL_R} fill="url(#s3ball)" />
          <path d={`M ${ballX - BALL_R * 0.72} ${ballY - BALL_R * 0.3} a ${BALL_R * 0.8} ${BALL_R * 0.8} 0 0 1 ${BALL_R * 0.62} ${-BALL_R * 0.52}`} stroke="#A9B6AB" strokeWidth={8} fill="none" opacity={0.65} strokeLinecap="round" />
          <rect x={ballX - 17} y={ballY - BALL_R - 16} width={34} height={26} rx={5} fill="#2A322C" />
        </g>
        {hitFlash > 0 && (
          <g opacity={hitFlash}>
            <circle cx={WALL_X + WALL_W - 6} cy={560} r={104} fill="#FFF3CE" opacity={0.55} />
            <path d={`M ${WALL_X + WALL_W - 6} ${560} m -140 -32 l 90 24 l -58 44 l 108 -18 l -38 64 l 84 -64 l 64 18 l -50 -50 l 67 -32 l -102 12 z`} fill="#FFE9AE" />
          </g>
        )}
        {puffs}

        {/* --- plane 2/3: THE CRATE + THE DETONATION (E1) --- */}
        <g clipPath="url(#s3in)">
          {lf < 15 && (
            <g transform={`rotate(${crRot} ${crX + CRATE / 2} ${crY + CRATE / 2})`}>
              <rect x={crX} y={crY} width={CRATE} height={CRATE} rx={5} fill="#6B5433" />
              <rect x={crX} y={crY} width={CRATE} height={CRATE * 0.16} fill="#8E7245" />
              <rect x={crX} y={crY} width={CRATE * 0.14} height={CRATE} fill="#8E7245" opacity={0.75} />
              <path d={`M ${crX} ${crY} L ${crX + CRATE} ${crY + CRATE} M ${crX + CRATE} ${crY} L ${crX} ${crY + CRATE}`} stroke="#43331C" strokeWidth={7} />
              <rect x={crX + CRATE * 0.28} y={crY + CRATE * 0.36} width={CRATE * 0.44} height={CRATE * 0.26} rx={3} fill="#C79427" opacity={0.8} />
            </g>
          )}
          {lf >= 14 && shockOp > 0.01 && <ellipse cx={BLX} cy={BLY - 6} rx={shockR} ry={shockR * 0.3} fill="none" stroke="#FFD79A" strokeWidth={10} opacity={shockOp} />}
          {fireOp > 0.01 && (
            <g opacity={fireOp}>
              <circle cx={BLX} cy={fireCY} r={fireR} fill="url(#s3fire)" />
              <circle cx={BLX - fireR * 0.5} cy={fireCY + fireR * 0.24} r={fireR * 0.56} fill="url(#s3fire)" />
              <circle cx={BLX + fireR * 0.52} cy={fireCY + fireR * 0.1} r={fireR * 0.5} fill="url(#s3fire)" />
              <circle cx={BLX + fireR * 0.16} cy={fireCY - fireR * 0.62} r={fireR * 0.46} fill="url(#s3fire)" />
              <circle cx={BLX} cy={fireCY + fireR * 0.16} r={fireR * 0.34} fill="#FFF7DC" opacity={0.85} />
            </g>
          )}
          {debris}
          {/* the whole paddock takes the flash — the lawn does not */}
          {padFlash > 0 && <rect x={0} y={0} width={1012} height={792} fill="#FFE7B4" opacity={padFlash} />}
        </g>

        {/* --- E4: THE CAGE ANSWERS — flash, ripples and a shock band, clipped to the wire --- */}
        {lf >= 128 && (
          <>
            <g clipPath="url(#s3in)">
              <rect x={0} y={0} width={1012} height={792} fill="#CFFFE2" opacity={cageFlash} />
            </g>
            <g clipPath="url(#s3cage)">
              {[0, 1, 2].map((i) => {
                const p = c01((ring - i * 0.13) / 0.62);
                if (p <= 0 || p >= 1) return null;
                return <ellipse key={"rp" + i} cx={300} cy={700} rx={p * 1280} ry={p * 620} fill="none" stroke="#8CF4C0" strokeWidth={11 - i * 2} opacity={(1 - p) * 0.78} />;
              })}
              <rect x={bandX - 90} y={0} width={180} height={792} fill="url(#s3band)" opacity={(1 - ring) * 0.9} />
            </g>
          </>
        )}

        {/* --- plane 1: THE SAFE LAWN, drawn OVER the wire so it reads as the near side.
                Nothing in this wedge ever moves — not one frame in 167. --- */}
        <g>
          <polygon points={`${CORNER},${FBASE} ${SNX},792 0,792 0,${FBASE}`} fill="url(#s3safe)" />
          <polygon points={`${CORNER},${FBASE} ${SNX},792 ${SNX - 26},792 ${CORNER - 30},${FBASE}`} fill="#2C4622" opacity={0.55} />
          <ellipse cx={150} cy={720} rx={260} ry={96} fill="url(#s3duskpool)" />
          {/* mown stripes carry on right up to the wire */}
          {[0, 1, 2].map((i) => (
            <polygon key={"ms" + i} points={`0,${656 + i * 44} ${380 - i * 74},${650 + i * 44} ${330 - i * 74},${676 + i * 44} 0,${684 + i * 44}`}
              fill="#6A9150" opacity={0.16} />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const gx = 26 + i * 62;
            const gy = 786 - i * 26 + seed(i * 6.6 + 1) * 10;
            if (gx > wireX(gy) - 22) return null;
            return <path key={"gr" + i} d={`M ${gx} ${gy} l -8 -19 M ${gx} ${gy} l 2 -24 M ${gx} ${gy} l 9 -17`} stroke="#6E9455" strokeWidth={3} fill="none" opacity={0.8} />;
          })}
          {/* daisies — the smallest thing in the frame and it survives the whole reel */}
          {[[44, 762], [92, 738], [140, 716], [196, 690], [244, 668]].map((p, i) => (
            <g key={"dz" + i} opacity={0.7}>
              <circle cx={p[0]} cy={p[1]} r={4} fill="#EFE7CE" />
              <circle cx={p[0]} cy={p[1]} r={1.6} fill="#D8B04E" />
            </g>
          ))}
          {/* THE GAG: a garden ROPE-AND-POST boundary one metre outside a blast fence */}
          <g>
            {[[384, 660], [320, 686], [262, 712]].map((p, i) => (
              <g key={"rp2" + i}>
                <ellipse cx={p[0] + 5} cy={p[1] + 3} rx={11} ry={4} fill="#1D2E14" opacity={0.5} />
                <rect x={p[0] - 4} y={p[1] - 42} width={9} height={42} rx={2} fill="#7A6642" />
                <rect x={p[0] - 4} y={p[1] - 42} width={3} height={42} fill="#9D8558" />
                <circle cx={p[0] + 0.5} cy={p[1] - 44} r={6} fill="#8A7449" />
              </g>
            ))}
            <path d="M 384 622 q -34 22 -64 42 M 320 648 q -32 22 -58 42" stroke="#C9BB94" strokeWidth={4} fill="none" opacity={0.8} />
          </g>
          {/* a watering can, left out, upright */}
          <g transform="translate(96 780)">
            <ellipse cx={12} cy={3} rx={20} ry={6} fill="#1D2E14" opacity={0.5} />
            <path d="M 0 0 L 2 -26 L 24 -26 L 26 0 Z" fill="#7E8C6E" />
            <path d="M 2 -26 L 24 -26 L 23 -21 L 3 -21 Z" fill="#A3B08E" />
            <path d="M 24 -22 L 44 -8 L 41 -3 L 23 -16 Z" fill="#7E8C6E" />
            <path d="M 6 -26 q 10 -12 16 0" stroke="#6C7A5E" strokeWidth={4} fill="none" />
          </g>
          {/* the REAL FILES: a receding row of four labelled cabinets, calm and untouched */}
          {CABS.map((c, i) => (
            <g key={"cab" + i}>
              {/* cast shadow falls DOWN-RIGHT from the left key */}
              <ellipse cx={c.x + c.w * 0.86} cy={c.b + 4} rx={c.w * 0.78} ry={11} fill="#16240F" opacity={0.55} />
              <rect x={c.x} y={c.b - c.h} width={c.w} height={c.h} rx={3} fill="url(#s3cabg)" />
              <rect x={c.x} y={c.b - c.h} width={c.w} height={7} fill="#F0E4C6" />
              <rect x={c.x} y={c.b - c.h} width={8} height={c.h} fill="#EBDCB9" opacity={0.6} />
              {[0, 1, 2, 3].map((d) => {
                const dh = (c.h - 18) / 4;
                const dy = c.b - c.h + 12 + d * dh;
                /* one drawer on the far cabinet is left ajar — and stays exactly that ajar */
                const ajar = i === 3 && d === 1 ? 7 : 0;
                return (
                  <g key={"dr" + d}>
                    {ajar > 0 && <rect x={c.x + 5} y={dy - 3} width={c.w - 10} height={dh - 3} rx={2} fill="#0F1A0B" opacity={0.4} />}
                    <rect x={c.x + 5 + ajar} y={dy} width={c.w - 10} height={dh - 7} rx={2} fill="#C4B492" />
                    <rect x={c.x + 5 + ajar} y={dy} width={c.w - 10} height={3} fill="#E6D8B6" />
                    {ajar > 0 && <rect x={c.x + 9} y={dy - 6} width={c.w * 0.5} height={5} rx={2} fill="#F4EEDC" opacity={0.85} />}
                    {/* label plate + pull */}
                    <rect x={c.x + 10 + ajar} y={dy + 6} width={c.w * 0.36} height={7} rx={2} fill="#F3EBD6" opacity={0.9} />
                    <rect x={c.x + c.w / 2 - 11 + ajar} y={dy + dh * 0.5} width={22} height={5} rx={2.5} fill="#605743" />
                  </g>
                );
              })}
            </g>
          ))}
          {/* the mug that never ripples, a plant nobody watered, a clipboard on a hook */}
          <g>
            <ellipse cx={CABS[1].x + 34} cy={CABS[1].b - CABS[1].h - 1} rx={MUG_W * 0.8} ry={3} fill="#2A2417" opacity={0.4} />
            <rect x={CABS[1].x + 28} y={CABS[1].b - CABS[1].h - MUG_W} width={MUG_W} height={MUG_W} rx={2} fill="#E4E0D2" />
            <rect x={CABS[1].x + 28} y={CABS[1].b - CABS[1].h - MUG_W} width={MUG_W} height={3} fill="#6E5F44" />
            <path d={`M ${CABS[1].x + 28 + MUG_W} ${CABS[1].b - CABS[1].h - MUG_W + 4} q 6 4 0 8`} stroke="#E4E0D2" strokeWidth={3} fill="none" />
          </g>
          <g transform={`translate(${CABS[2].x + 22} ${CABS[2].b - CABS[2].h})`}>
            <rect x={-11} y={-14} width={22} height={14} rx={2} fill="#A8623F" />
            <rect x={-13} y={-17} width={26} height={5} rx={2} fill="#C4784E" />
            <path d={`M 0 -14 q -16 -12 -8 -${PLANT_H} M 0 -14 q 4 -14 12 -${PLANT_H - 8} M 0 -14 q -2 -12 0 -${PLANT_H - 4}`} stroke="#4E7A3E" strokeWidth={4} fill="none" />
          </g>
          <g transform={`translate(${CABS[0].x + CABS[0].w - 6} ${CABS[0].b - CABS[0].h + 40})`}>
            <rect x={0} y={0} width={26} height={34} rx={2} fill="#8A7A56" />
            <rect x={2} y={4} width={22} height={28} fill="#EFE7D2" />
            <rect x={5} y={-3} width={16} height={7} rx={2} fill="#4E4738" />
            {[0, 1, 2].map((i) => <rect key={"cl" + i} x={5} y={11 + i * 7} width={16} height={2.6} rx={1} fill="#B7AC92" />)}
          </g>
        </g>
      </svg>

      {/* ================= THE HERO — the TESTER, scorched coat + goggles on the brow ================= */}
      {/* his own long cast shadow, thrown DOWN-RIGHT by the left pylon */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 5 }}>
        <polygon points={`${HX - 44},${GY + 4} ${HX + 40},${GY - 4} ${HX + 262},${GY + 26} ${HX + 116},${GY + 40}`} fill="#080D0A" opacity={0.42} />
      </svg>
      <div style={{ position: "absolute", inset: 0, zIndex: 6, transform: `rotate(${tilt}deg)`, transformOrigin: `${HX}px ${GY}px` }}>
        <Actor lf={lf} x={HX} groundY={GY} size={H} coat={1}
          gaze={4} shock={shock} point={throwing || charging ? 1 : 0}
          nodAmp={charging ? 7 : 3.5} nodSpeed={charging ? 3.4 : 10} flip={1} />
      </div>

      {/* ===== CONTINUOUS MOVER A — own layer ABOVE the set, or the planes paint over it.
              ONE mover, deliberately enormous: the floodlight rakes the whole paddock for
              all 167 frames and is clipped at the wire, so the safe side never changes.
              At f140 a SECOND, narrow lamp snaps onto him and tracks — the facility
              finally pointing at the thing it has been failing to hold. ===== */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 7, pointerEvents: "none" }}>
        <defs>
          <linearGradient id="s3sweep2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EAFBEE" stopOpacity="0.10" />
            <stop offset="0.45" stopColor="#E4F7E8" stopOpacity="0.30" />
            <stop offset="1" stopColor="#DFF3E4" stopOpacity="0.44" />
          </linearGradient>
          <radialGradient id="s3hot" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#EAF7E6" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#D5EBCF" stopOpacity="0.2" />
            <stop offset="1" stopColor="#D5EBCF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="s3in2">
            <polygon points={`${CORNER},0 1012,0 1012,792 ${SNX},792 ${CORNER},${FBASE}`} />
          </clipPath>
        </defs>
        <g clipPath="url(#s3in2)">
          {/* the paddock's own light level breathes with the arc — a whole-area change,
              never a haze blob: it has no edge of its own */}
          <rect x={0} y={0} width={1012} height={792} fill="#CDE8CF"
            opacity={(0.045 + 0.035 * Math.sin(lf / 2.4 + 1.1)) * esc} />
          {/* the rake itself: a full-height wedge whose ground end runs 400..1000 */}
          <polygon points={`${LAMPX - 46},${LAMPY} ${LAMPX + 46},${LAMPY} ${beamX + 215},792 ${beamX - 215},792`}
            fill="url(#s3sweep2)" opacity={0.62 * buzz * esc} />
          <polygon points={`${LAMPX - 16},${LAMPY} ${LAMPX + 16},${LAMPY} ${beamX + 74},792 ${beamX - 74},792`}
            fill="#EFFAEA" opacity={0.13 * buzz * esc} />
          {/* its hot pool dragging across the apron */}
          <ellipse cx={beamX} cy={FBASE + 96} rx={244} ry={62} fill="url(#s3hot)" opacity={0.95 * buzz} />
          {/* motes, only where the light is */}
          {motes}
          {/* the LOCK-ON: a narrow lamp that finds him and stays on him */}
          {lock > 0.01 && (
            <>
              <polygon points={`${LAMPX - 13},${LAMPY} ${LAMPX + 13},${LAMPY} ${HX + 96},792 ${HX - 96},792`}
                fill="#F2FBEC" opacity={0.15 * lock} />
              <ellipse cx={HX} cy={GY + 26} rx={158} ry={44} fill="url(#s3hot)" opacity={0.85 * lock} />
            </>
          )}
        </g>
      </svg>

      {/* ================= PLANE 0 — NEAR FOREGROUND. Boughs crop the top corners and a
              tyre stack crops the bottom-right, so the paddock is seen THROUGH something.
              All of it is unlit silhouette; none of it ever moves. ============ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 24, pointerEvents: "none" }}>
        <g>
          {/* the near fence's RAZOR-WIRE crown, cropped by the top edge. Nameable in
              one look and it says the one word the scene is about: contained. */}
          <path d="M -30 -6 C 120 46 300 62 470 58 C 660 54 850 34 1050 -14 L 1050 -60 L -30 -60 Z" fill="#070C09" />
          {RAZOR.map((c, i) => (
            <g key={"rz" + i}>
              <ellipse cx={c.x} cy={c.y} rx={c.r} ry={c.r * 0.62} fill="none" stroke="#070C09" strokeWidth={7} />
              {[0, 1, 2, 3, 4, 5].map((k) => {
                const a = (k / 6) * Math.PI * 2 + i;
                const bx = c.x + Math.cos(a) * c.r, by = c.y + Math.sin(a) * c.r * 0.62;
                return <path key={"bb" + k} d={`M ${bx - 9} ${by - 7} L ${bx + 9} ${by + 7} M ${bx + 9} ${by - 7} L ${bx - 9} ${by + 7}`} stroke="#070C09" strokeWidth={5} fill="none" />;
              })}
            </g>
          ))}
          {/* the cranked brackets the coil is strung from, cropped left and right */}
          <path d="M -20 -20 L 26 -20 L 62 44 L 42 52 Z" fill="#070C09" />
          <path d="M 1030 -20 L 986 -20 L 946 40 L 966 50 Z" fill="#070C09" />
        </g>
        {/* cropped tyre stack, hard right, in front of everything on the apron */}
        <g fill="#0A0F0B">
          {[0, 1, 2].map((i) => (
            <g key={"nt" + i}>
              <ellipse cx={1000} cy={772 - i * 44} rx={NTYRE_W / 2} ry={NTYRE_W * 0.17} />
              <ellipse cx={1000} cy={764 - i * 44} rx={NTYRE_W / 2 - 9} ry={NTYRE_W * 0.14} fill="#141A15" />
              <ellipse cx={1000} cy={764 - i * 44} rx={NTYRE_W / 5} ry={NTYRE_W * 0.06} fill="#080C09" />
            </g>
          ))}
        </g>
      </svg>

      {/* ================= PLANE 0 — the vignette only (no near post: it read as a render fault) ============ */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0, zIndex: 30, pointerEvents: "none" }}>
        <defs>
          <radialGradient id="s3vig" cx="0.5" cy="0.54" r="0.8">
            <stop offset="0.46" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1012} height={792} fill="url(#s3vig)" />
      </svg>

      {/* ================= HUD — the reel's recurring plate ================= */}
      <div style={{ position: "absolute", left: 92, top: 56, height: 38, padding: "0 16px", borderRadius: 8, zIndex: 60,
        background: "linear-gradient(180deg,#16211B,#0B120E)", border: `2px solid ${GOLD}`,
        boxShadow: "0 8px 18px rgba(0,0,0,0.55)", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 2, color: "#F0E2C0" }}>TESTED</span>
        <span style={{ fontFamily: mono, fontSize: 17, fontWeight: 700, color: GOLD }}>03/04</span>
      </div>
    </>
  );
};
