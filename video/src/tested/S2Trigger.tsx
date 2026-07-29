import React from "react";
import { Actor, Room, Vignette, CutFlash, M, mono, fraunces, ramp, seed, CLAY, INK , H } from "./chassis";

/* ===================== REEL 77 · S2 — THE DOOR LIST, THEN THE TRIPWIRE =====================
   261 frames (15.060–23.750). TWO LOCKED SHOTS, hard cut at lf 135.
   ⛔ the camera NEVER moves inside either shot — the cut is the only change of framing.
   Dominant colour: deep crimson / ember.

   ⛔ DEAD-AIR REBUILD. The measured version climbed then FROZE: 3 correct beats, each a small-area
   event, total stillness between them (median 1.6 against a bar of 4.0). Fixed with the S0 recipe:
     · ONE continuous mover under the WHOLE scene — the rain. It never stops, it crosses the whole
       panel, it gets heavier every second, and the single caged bulb it falls through GUTTERS, so the
       entire lit half of the frame is modulating on every frame. Interior half: the ember spill through
       the doorway does the same job, then the alarm beacon takes over and sweeps the whole back wall.
     · The scroll unspools and POOLS continuously from lf 30 to the cut — one bright cream mass growing
       and rippling across the dark wet pavement, so no second is ever a hold.
     · Every beat is now door-sized: a slab of bounced light raking the whole facade, a light curtain
       climbing the full frame, a full-frame value kill when the iron lands, and the torn list tumbling
       at the lens.

   ⛔ RICHNESS PASS. The note was "boring / not detailed enough / needs more background stuff", NOT a
   motion-metric failure (measured: max 2 of 36 grid cells carry >8% of a second's change, cap is 6).
   So everything added below is TEXTURE, never a competing mover:
     · 6 real planes now. A: alley (fire escape, a window that dies, crates, bagged rubbish) → facade
       (rust bleed, poster ghosts, blown render, taped bill, lit menu case, security camera) → wet
       pavement (splat stain, drain + stream, trodden flyers, queue barrier, cigarette bin) → heroes +
       list → velvet rope → the cast-iron DOWNPIPE cropped by the right edge, bursting at a split collar.
       B: street through the door → jamb/leaf/threshold → wall (conduit run, fuse box, taped-over sign,
       coat rail, extinguisher, mop + bucket, chalk tallies) → hero + beam → near crate stack + coil.
     · 10 ambient movers, all dim and prop-sized: awning drips, moths at the bulb, two breaths in the
       cold, smoke off the ash bin, the drain ripple, the burst-collar jet, coats in the draught, a
       ceiling drip into the bucket, a twitching pressure gauge, dust in the ember spill.
     · Every beat now has a SECOND consequence and leaves a LASTING mark: B1 rattles the barrier and
       blows a stain into the paving · B2 makes the camera stop sweeping and lock on him · B3's chips
       kick splash rings and go on soaking · B4 rips the bill's tape (it hangs by one corner) and takes
       the bulb down with it · B7 flickers the sconce, drops a coat off the rail, turns every fuse
       indicator red, leaves the extinguisher crooked, the mat shoved, a skid in the polish and one
       more chalk mark on the jamb. The street and the room are measurably worse off than at frame 0.

   SHOT A  0–134   THE VELVET ROPE (exterior, night, rain). 4 events:
     B1  lf   2– 42  the list unrolls out of the tester's hand and slaps onto the wet pavement
     B1b lf  30–128  it KEEPS unspooling — the pool sprawls across the whole bottom third (continuous)
     B2  lf  44– 84  the skim: he tilts it to the bulb, a slab of bounced ember rakes the whole facade
     B3  lf  86–114  two skipped rules slough off; the ribbon slumps a step each time
     B4  lf 108–134  the whole lower list RIPS OFF and tumbles at the lens; the bulb guts out
   SHOT B  135–260  THE TRIPWIRE (same doorway, from inside). 5 events:
     B5  s    2– 34  the tester strides for the door (320px traverse) through the flickering spill
     B6  s   38– 60  his foot breaks the beam — a crimson LIGHT CURTAIN climbs the full frame
     B7  s   56– 68  an iron shutter SLAMS down out of frame-top and seals the doorway
     B8  s   64– 76  the ember dies with it: the whole frame drops 55% — the value kill IS the point
     B9  s   70–126  the alarm beacon sweeps the room; the BLOCKED plate stamps; dust rolls out
   ============================================================================================ */

const CUT = 135;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
const eInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ---- SCALE CONTRACT: every prop below is derived from M(metres), H = 330px = the Claude sprite ---- */
const DOOR_H = M(2.05), DOOR_W = M(0.98);        // a 2.05 m street door
const STANCH_H = M(1.05);                        // brass rope post, waist-high (shot B interior)
const SCROLL_W = M(0.52);                        // the list: a 0.52 m wide ribbon of paper
const ROLL_A = M(0.17), ROLL_B = M(0.07);        // the roll — fat at the top, spent once it unrolls
const BAR_H = M(0.095);                          // one redacted rule on the ribbon
const CHIP_H = M(0.125);                         // a rule that has sloughed off the list
const BULB = M(0.16);                            // the caged ember bulb
const NEAR = 1.5;                                // the near plane reads ~1.5x closer than the heroes
const POST_H = M(1.05) * NEAR, POST_W = M(0.075) * NEAR;  // velvet-rope posts, cropped by the frame edge
const BALL_R = M(0.07) * NEAR, ROPE_W = M(0.062) * NEAR;  // finial + the rope itself
const OPEN_W = M(1.7), OPEN_H = M(2.3);          // the doorway opening, from inside
const SHUT_W = M(2.1), SHUT_H = M(2.95);         // the iron roller shutter
const PLATE_W = M(1.43), PLATE_H = M(0.5);       // the BLOCKED plate
const ANCHOR_H = M(0.36);                        // beam anchor block
const ANKLE = M(0.12);                           // beam height above the floor
const BEACON = M(0.26);                          // the alarm dome above the shutter housing
/* ---- WORLD PROPS. Everything a viewer can name in the street and in the vestibule, all sized off M() ---- */
const POST_NW = M(0.42), POST_NH = M(0.60);      // the taped notice by the door — an A3 bill
const CASE_W = M(0.53), CASE_H = M(0.63);        // the lit menu case bolted to the brick
const CAM_L = M(0.24);                           // the security camera under the awning
const ASH_H = M(1.05), ASH_W = M(0.25);          // the cigarette bin — a waist-high column
const BARR_W = M(1.90), BARR_H = M(1.05);        // the steel queue barrier on the pavement
const GRATE_W = M(0.62);                         // the drain grate at the kerb
const PIPE_W = M(0.12) * NEAR;                   // the cast-iron downpipe, near camera, cropped
const FAR = 0.55;                                // the alley reads one plane back: props at 0.55x
const COAT_H = M(0.86), RAIL_W = M(0.95);        // interior coat rail + the coats on it
const FUSE_W = M(0.46), FUSE_H = M(0.52);        // the fuse box
const EXT_H = M(0.60), EXT_W = M(0.17);          // the fire extinguisher
const SIGN_W = M(0.50), SIGN_H = M(0.38);        // the sign someone has taped over
const MAT_W = M(1.55);                           // the doormat inside the threshold
const BUCK_W = M(0.36), BUCK_H = M(0.34);        // the mop bucket in the corner

/* ⛔ THE GUTTER. There is ONE bulb in this scene and it is out in the rain, so it is never steady:
   a slow breath, a per-frame jitter, and hard stutters that get worse as the shot runs. Everything
   the bulb lights is multiplied by this, which is why the whole lit half of the panel is moving on
   every single frame instead of only during a beat. Amplitude stays inside "guttering", not strobe. */
const gutter = (f: number, esc: number) => {
  const breathe = 0.92 + 0.09 * Math.sin(f / 5.7) + 0.05 * Math.sin(f / 2.1 + 1.3);
  const jit = (seed(f * 1.7 + 4) - 0.5) * (0.13 + 0.13 * esc);
  const stut = seed(Math.floor(f / 3) * 5.3) < 0.09 + 0.16 * esc ? -(0.20 + 0.26 * esc) : 0;
  return Math.max(0.30, Math.min(1.24, breathe + jit + stut));
};

/* ⛔ THE CONTINUOUS MOVER. Rain, in depth layers — it crosses the whole panel, it never stops and it
   densifies every second. Long fast streaks so a streak barely overlaps its own last position. */
const Rain: React.FC<{ f: number; n: number; x0: number; x1: number; y0: number; y1: number;
  len: number; w: number; sp: number; col: string; op: number; k: number; slant?: number }> =
({ f, n, x0, x1, y0, y1, len, w, sp, col, op, k, slant = 0.19 }) => (
  <g>
    {Array.from({ length: Math.max(0, Math.round(n)) }, (_, i) => {
      const a = seed(i * 3.31 + k), b = seed(i * 7.13 + k * 2.7);
      const span = (y1 - y0) + len * 2;
      const yy = y0 - len + ((f * sp * (0.78 + b * 0.6) + a * span * 2.13) % span);
      const xx = x0 + a * (x1 - x0) - (yy - y0) * slant;
      return (
        <line key={i} x1={xx} y1={yy} x2={xx - len * slant} y2={yy + len}
          stroke={col} strokeWidth={w * (0.7 + b * 0.6)} strokeLinecap="round"
          opacity={op * (0.42 + b * 0.58)} />
      );
    })}
  </g>
);

/* rain landing: rings opening on the wet stone. Part of the same weather, never a separate subject. */
const Splash: React.FC<{ f: number; n: number; x0: number; x1: number; y0: number; y1: number;
  col: string; k: number; op?: number }> = ({ f, n, x0, x1, y0, y1, col, k, op = 0.5 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const a = seed(i * 5.9 + k), b = seed(i * 2.7 + k * 1.9);
      const per = 20 + a * 18;
      const p = ((f + a * 60) % per) / per;
      const r = 5 + p * (34 + b * 30);
      return (
        <ellipse key={i} cx={x0 + a * (x1 - x0)} cy={y0 + b * (y1 - y0)} rx={r} ry={r * 0.27}
          fill="none" stroke={col} strokeWidth={3.4 * (1 - p)} opacity={op * (1 - p)} />
      );
    })}
  </g>
);

/* ============================ AMBIENT LIFE ============================================
   ⛔ HIERARCHY: every helper below is deliberately SMALL, DIM and SOFT. They exist so a viewer
   can look anywhere and find something crafted, and find something new on a second watch. Not one
   of them may ever out-contrast the beat that owns the frame — opacities are capped in the teens
   and the areas are prop-sized, never wall-sized. */

/* one exhaled breath in cold air */
const Breath: React.FC<{ f: number; x: number; y: number; per: number; ph: number; dir: number; op?: number }> =
({ f, x, y, per, ph, dir, op = 0.15 }) => {
  const t = ((((f + ph) % per) + per) % per) / per;
  if (t > 0.4) return null;
  const p = t / 0.4;
  return (
    <g opacity={op * Math.sin(p * Math.PI)}>
      <ellipse cx={x + dir * p * 52} cy={y - p * 24} rx={11 + p * 32} ry={8 + p * 19} fill="#E7E0D4" />
      <ellipse cx={x + dir * p * 26} cy={y - p * 11} rx={7 + p * 14} ry={5 + p * 10} fill="#FFF6E8" opacity={0.45} />
    </g>
  );
};

/* a thread of smoke leaving a hot thing — cigarette bin outside, settling dust inside */
const Wisp: React.FC<{ f: number; x: number; y: number; k: number; h?: number; op?: number; col?: string }> =
({ f, x, y, k, h = 130, op = 0.12, col = "#C9BCAE" }) => (
  <g opacity={op}>
    {[0, 1, 2, 3].map((i) => {
      const t = ((f + i * 33 + k * 19) % 132) / 132;
      const wob = Math.sin((f + i * 20) / 9) * 9 * t;
      return <ellipse key={i} cx={x + wob + t * 9} cy={y - t * h} rx={5 + t * 15} ry={4 + t * 11}
        fill={col} opacity={Math.sin(t * Math.PI) * 0.9} />;
    })}
  </g>
);

/* a drip leaving a lip or a joint, and the ring it makes when it lands */
const Drip: React.FC<{ f: number; x: number; y0: number; y1: number; per: number; ph: number; col: string; op?: number; w?: number }> =
({ f, x, y0, y1, per, ph, col, op = 0.5, w = 3 }) => {
  const t = ((((f + ph) % per) + per) % per) / per;
  const p = Math.min(1, t * 1.25);
  const y = mix(y0, y1, p * p);
  const land = t > 0.8 ? (t - 0.8) / 0.2 : 0;
  return (
    <g opacity={op}>
      {land <= 0 && <line x1={x} y1={y} x2={x} y2={y + 13} stroke={col} strokeWidth={w} strokeLinecap="round" />}
      {land > 0 && <ellipse cx={x} cy={y1} rx={5 + land * 18} ry={2 + land * 4} fill="none" stroke={col} strokeWidth={2.4 * (1 - land)} />}
    </g>
  );
};

/* slow motes drifting through a shaft of light */
const Motes: React.FC<{ f: number; n: number; x0: number; x1: number; y0: number; y1: number; col: string; op: number; k: number }> =
({ f, n, x0, x1, y0, y1, col, op, k }) => (
  <g opacity={op}>
    {Array.from({ length: n }, (_, i) => {
      const a = seed(i * 4.7 + k), b = seed(i * 9.1 + k * 1.7);
      const span = y1 - y0;
      const yy = y1 - ((f * (0.22 + b * 0.3) + a * span) % span);
      return <circle key={i} cx={x0 + a * (x1 - x0) + Math.sin((f + i * 30) / 26) * 16} cy={yy}
        r={1.6 + b * 2.6} fill={col} opacity={0.35 + b * 0.5} />;
    })}
  </g>
);

/* the cohesion HUD — a short non-VO status plate, top-right, clear of the panel chrome.
   ⛔ ONE LINE ALWAYS: auto width + nowrap and the label split in two, so it can never wrap. */
const Hud: React.FC = () => (
  <div style={{ position: "absolute", left: 30, top: 64, height: 44, padding: "0 15px", borderRadius: 9,
    background: "rgba(24,8,10,0.78)", border: "1.5px solid rgba(210,114,78,0.42)", zIndex: 46,
    display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap",
    boxShadow: "0 6px 16px rgba(0,0,0,0.45)" }}>
    <div style={{ width: 11, height: 11, borderRadius: 2, background: CLAY, boxShadow: `0 0 8px ${CLAY}`, flex: "0 0 auto" }} />
    <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: 2.2, color: "#E6C3B2" }}>TESTED</span>
    <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: 1, color: CLAY }}>02/04</span>
  </div>
);

/* ⛔ VALUE SEPARATION. The bulb is high-RIGHT, so every sprite carries a warm rim down its RIGHT
   edge — that is what lifts an orange sprite off a dark wall by LIGHTNESS, not just hue.
   The rim is drawn in the sprite's own 200x200 space and copies the Mascot hop/squash exactly,
   so it can never drift off the body. Geometry mirrors the chassis: body 34..166 / 44..146,
   arms x166..192 at y86, legs 124..141 and 149..166 at y146..184. */
const Rim: React.FC<{ lf: number; x: number; groundY: number; size: number; nodAmp: number;
  nodSpeed: number; z: number; col: string; op: number }> =
({ lf, x, groundY, size, nodAmp, nodSpeed, z, col, op }) => {
  const hopP = Math.max(0, Math.sin(lf / (nodSpeed * 0.6)));
  const hop = hopP * nodAmp * 2.2, squash = 1 - hopP * 0.045;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: groundY - size * 0.92, width: size, height: size,
      zIndex: z, pointerEvents: "none", transform: `translateY(${-hop}px) scaleY(${squash})`, transformOrigin: "50% 100%" }}>
      <svg viewBox="0 0 200 200" width={size} height={size} shapeRendering="crispEdges" style={{ overflow: "visible" }}>
        <g fill={col} opacity={op}>
          <rect x={160} y={44} width={6} height={102} />
          <rect x={100} y={44} width={66} height={5} />
          <rect x={186} y={86} width={6} height={26} />
          <rect x={166} y={86} width={26} height={4} />
          <rect x={160} y={146} width={6} height={38} />
          <rect x={136} y={146} width={5} height={38} />
        </g>
      </svg>
    </div>
  );
};

/* ============================================================================================
   SHOT A — THE VELVET ROPE.  A club doorway on a wet street at night, in heavy rain.
   FLOOR: wet black-granite paving.   BACK WALL: cold plum-crimson brick + a deep red steel door.
   ⛔ ONE MOTIVATED LIGHT: the caged ember bulb under the awning at (806, 274), high-RIGHT.
      Its glow is kept HIGH and tight so the wall behind the two sprites stays dark and cool;
      every object is lit on its right cheek and drops its contact shadow down-LEFT. It GUTTERS.
   PLANES: 1 alley mouth + cold far street · 2 brick facade, door, awning, bulb · 3 wet pavement,
           kerb, ember reflections · 4 hero plane (tester, doorman, the list + its pool) · 5 rope + rain.
   BLOCKING: tester 320 @ x260, doorman 340 @ x730 → 470 apart (min 0.85*(160+170) = 281).
             The list hangs in the GAP and is drawn BEHIND both sprites, so neither is occluded.
   ============================================================================================ */
const ShotA: React.FC<{ lf: number }> = ({ lf }) => {
  const GY = 676, FY = 640;                 // actors' pavement / wall base
  const LX = 806, LY = 274;                 // the bulb
  const DX = 800 - DOOR_W / 2;              // door left edge
  const TX = 260, TS = 320;                 // the tester
  const KX = 730, KS = 340;                 // the doorman
  const tL = lf + 9, kL = lf + 20;          // blink phases desynced — never together, never at lf 0

  /* the storm escalates across the whole shot: more rain, worse gutter, by the cut it is at its wildest.
     GUSTS re-slant the ENTIRE rain field three times — the cheapest way to move every pixel of the
     panel at once without touching the camera. */
  const esc = ramp(lf, 0, 130);
  /* B4's secondary consequence: when the list rips, the bulb takes a hard dip with it and every
     single thing it lights dips too — one line, whole-frame value change, no extra mover. */
  const gut = gutter(lf, esc) * (1 - 0.5 * Math.max(0, 1 - Math.abs(lf - 118) / 11));
  const rainN = 74 + esc * 40;
  const gustAt = (c: number, w: number) => Math.max(0, 1 - Math.abs(lf - c) / w);
  const gust = Math.min(1, gustAt(8, 24) + gustAt(64, 20) * 0.8 + gustAt(118, 22));
  const slantA = 0.19 + 0.5 * gust;

  /* the awning dumps its load in the first second — a 416px-wide sheet of water sluicing off the lip */
  const sluice = ramp(lf, 4, 22);
  const slY = mix(268, 802, eOut(sluice));
  const slSplash = ramp(lf, 19, 40);

  /* B1 — the roll leaves his hand and the list unrolls to the pavement */
  const un = eOut(ramp(lf, 2, 42));
  const SX = 404, SW = SCROLL_W, SR = SX + SW;
  const ROLLY = 530, TOPY = 516, FLOORY = 700;
  const RIPY = 596;                                   // where the list finally tears

  /* B4 — the rip. the ribbon retracts fast, the lower half tumbles at the lens */
  const tear = ramp(lf, 108, 132);
  const tearE = eOut(tear);
  const sBotBase = mix(568, FLOORY, un);
  const sBot = tear > 0 ? mix(sBotBase, RIPY - 10, Math.min(1, tear * 3.2)) : sBotBase;

  /* the ribbon is being pushed about by the wind the whole time — the paper is never still */
  const sway = Math.sin(lf / 5.9) * (4 + 7 * esc) + Math.sin(lf / 2.7) * (1.5 + 2 * esc) + gust * 16;
  const slump = ramp(lf, 86, 96) * 9 + ramp(lf, 96, 108) * 11;    // it drops a step per rule lost
  const rollH = mix(ROLL_A, ROLL_B, un);
  const edgeL = `M ${SX} ${TOPY} C ${SX - 15 + sway * 0.4} ${mix(TOPY, sBot, 0.34)}, ${SX + 9 + sway} ${mix(TOPY, sBot, 0.72)}, ${SX - 4 + sway} ${sBot}`;
  const edgeR = `M ${SR} ${TOPY} C ${SR - 9 + sway * 0.4} ${mix(TOPY, sBot, 0.3)}, ${SR + 15 + sway} ${mix(TOPY, sBot, 0.68)}, ${SR + 4 + sway} ${sBot}`;
  const ribbon = `${edgeL} L ${SR + 4 + sway} ${sBot}` +
    ` C ${SR + 15 + sway} ${mix(TOPY, sBot, 0.68)}, ${SR - 9 + sway * 0.4} ${mix(TOPY, sBot, 0.3)}, ${SR} ${TOPY} Z`;

  /* B1b — THE POOL. the list never stops feeding: it sprawls across the whole bottom third of the
     panel and RIPPLES under the rain. This is the second continuous mover — a big bright cream mass
     growing on near-black wet stone, so the "quiet" seconds are never static. */
  const pe = eOut(ramp(lf, 30, 128));
  const PL = mix(SX - 14, 118, pe), PR = mix(SR + 14, 938, pe);
  const PN = mix(FLOORY + 12, 792, Math.min(1, pe * 1.16));
  const rip = (k: number) => Math.sin((lf + k * 27) / 5.4) * (3 + 6 * esc);
  const poolPts = `${SX - 10},${FLOORY} ${SR + 10},${FLOORY} ` +
    `${PR},${PN + rip(0)} ${mix(PR, PL, 0.34)},${PN + 10 + rip(1)} ` +
    `${mix(PR, PL, 0.67)},${PN + 5 + rip(2)} ${PL},${PN + rip(3)}`;
  const poolShift = tearE * 74;                       // once it rips, the pool starts sliding too

  /* B2 — the skim. He tilts the list to the bulb: the read-bar runs the ribbon top to floor and keeps
     going out across the pool toward camera, WIDENING as it goes. And the cream sheet bounces a slab
     of ember light back across the whole brick facade, right to left. Both are large-area movers. */
  const skim = ramp(lf, 44, 84);
  const scanY = mix(500, 792, skim);
  const scanOn = lf >= 43 && lf <= 86;
  const scanW = scanY < FLOORY ? SW + 34 : mix(SW + 34, 830, Math.min(1, (scanY - FLOORY) / 92));
  const bounceX = mix(1010, 130, eInOut(skim));
  const bounceOp = (lf >= 43 && lf <= 88 ? Math.min(1, ramp(lf, 43, 50)) * (1 - ramp(lf, 78, 88)) : 0) * gut;

  /* the redacted rules. rows 1, 3, 5 are the ones he lets slide. ⛔ bars only — never legible rules. */
  const ROWS = [552, 578, 604, 630, 656, 682];
  const WID = [58, 74, 50, 70, 62, 78];
  const SKIP = [1, 3, 5];
  const FSTART = [86, 96, 108];
  const TGT: [number, number, number][] = [[268, 742, -11], [318, 754, 9], [230, 762, -5]];
  const fallT = (k: number) => ramp(lf, FSTART[k], FSTART[k] + 26);
  const litNow = (y: number) => (scanOn ? Math.max(0, 1 - Math.abs(scanY - (y + 9)) / 32) : 0);
  const dead = (y: number) => (scanY > y + 12 ? 1 : 0);
  const piled = TGT.filter((_, k) => fallT(k) > 0.98).length;
  const landT = (k: number) => ramp(lf, FSTART[k] + 22, FSTART[k] + 46);   // the splash a chip makes
  const soak = (k: number) => ramp(lf, FSTART[k] + 26, FSTART[k] + 90);    // and then it soaks through

  /* ---- PERSISTENT WORLD STATE. Nothing here resets: by lf 134 the street is measurably worse off
     than it was at lf 0 — a wet splat on the stone, a dead window, a locked camera, a torn bill. ---- */
  const splat = ramp(lf, 34, 50);                        // B1 slaps water out of the paving — the stain stays
  const winOff = ramp(lf, 72, 78);                       // the window across the alley goes dark, for good
  const jolt = Math.max(0, 1 - Math.abs(lf - 42) / 8) * Math.sin(lf * 1.9) * 1.2;  // the barrier rattles with the slap
  const posterFlap = Math.sin(lf / 8.5) * 1.7 + gust * 3.4;
  const posterRot = mix(posterFlap, -27, eOut(Math.min(1, tear * 1.7)));  // B4 rips its tape — it hangs by one corner
  const camLock = ramp(lf, 60, 76);                      // the camera stops sweeping and locks onto him, permanently
  const camA = mix(Math.sin(lf / 33) * 9, -15, camLock);
  const camLed = seed(Math.floor(lf / 11) * 3.1) > 0.5 ? 1 : 0.16;
  const caseF = 0.60 + 0.40 * (seed(Math.floor(lf / 5) * 2.7) > 0.14 ? 1 : 0.22);   // the case's strip light is failing

  return (
    <>
      {/* ---------------- THE SET ---------------- */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          {/* ⛔ the brick is pushed DARK + COOL (plum) so the orange sprites separate by lightness */}
          <pattern id="s2brick" width={126} height={62} patternUnits="userSpaceOnUse">
            <rect width={126} height={62} fill="#1A0916" />
            <rect x={2} y={2} width={58} height={27} fill="#2A1226" />
            <rect x={64} y={2} width={58} height={27} fill="#22101F" />
            <rect x={-29} y={33} width={58} height={27} fill="#271224" />
            <rect x={33} y={33} width={58} height={27} fill="#2D1529" />
            <rect x={95} y={33} width={58} height={27} fill="#1F0D1C" />
          </pattern>
          <radialGradient id="s2key" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF9C63" stopOpacity="0.34" />
            <stop offset="0.5" stopColor="#C4472C" stopOpacity="0.12" />
            <stop offset="1" stopColor="#C4472C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s2wide" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF8A4E" stopOpacity="0.20" />
            <stop offset="1" stopColor="#FF8A4E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s2door" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A2B22" /><stop offset="0.55" stopColor="#5E1614" /><stop offset="1" stopColor="#310A0C" />
          </linearGradient>
          <linearGradient id="s2awn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8E2320" /><stop offset="1" stopColor="#5A1216" />
          </linearGradient>
          <linearGradient id="s2brass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6B4C22" /><stop offset="0.42" stopColor="#C79A4E" /><stop offset="1" stopColor="#5C3F1C" />
          </linearGradient>
          <linearGradient id="s2wetE" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E4703E" stopOpacity="0.30" /><stop offset="1" stopColor="#E4703E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s2wetC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5D86AE" stopOpacity="0.30" /><stop offset="1" stopColor="#5D86AE" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s2cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFB077" stopOpacity="0.16" /><stop offset="1" stopColor="#FFB077" stopOpacity="0" />
          </linearGradient>
          {/* the slab of ember the cream list bounces back onto the brick when he tilts it */}
          <linearGradient id="s2bounce" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFB077" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFC08C" stopOpacity="0.30" />
            <stop offset="1" stopColor="#FFB077" stopOpacity="0" />
          </linearGradient>
          {/* light falls off AWAY from the bulb: the wall behind the tester goes cold and near-black */}
          <linearGradient id="s2coolFar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0A1024" stopOpacity="0.66" />
            <stop offset="0.6" stopColor="#0A1024" stopOpacity="0.30" />
            <stop offset="1" stopColor="#0A1024" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s2alley" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#243C55" /><stop offset="1" stopColor="#0B1220" />
          </linearGradient>
          <linearGradient id="s2fgDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0A0308" stopOpacity="0" /><stop offset="1" stopColor="#0A0308" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="s2sluice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8D2BC" stopOpacity="0.04" /><stop offset="1" stopColor="#FFE3C4" stopOpacity="0.30" />
          </linearGradient>
          <linearGradient id="s2slFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" /><stop offset="0.16" stopColor="#FFF" />
            <stop offset="0.84" stopColor="#FFF" /><stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="s2slMask">
            <rect x={596} y={250} width={416} height={550} fill="url(#s2slFade)" />
          </mask>
          {/* ---- the world props' own materials ---- */}
          <linearGradient id="s2steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#171B22" /><stop offset="0.55" stopColor="#2C333E" /><stop offset="1" stopColor="#10141B" />
          </linearGradient>
          <linearGradient id="s2iron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0A0509" /><stop offset="0.62" stopColor="#160C10" /><stop offset="1" stopColor="#050208" />
          </linearGradient>
          <linearGradient id="s2glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3A2018" /><stop offset="1" stopColor="#170A0C" />
          </linearGradient>
          <linearGradient id="s2rust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7A3A22" stopOpacity="0.5" /><stop offset="1" stopColor="#7A3A22" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="s2splat" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#060206" stopOpacity="0.66" /><stop offset="1" stopColor="#060206" stopOpacity="0" />
          </radialGradient>
        </defs>

        <Room wall1="#3A1226" wall2="#12060F" floor1="#1B0B13" floor2="#080409" floorY={FY} />

        {/* PLANE 1 — the alley mouth left of the facade, with a cold far street lamp */}
        <rect x={0} y={78} width={152} height={FY - 78} fill="#12060F" />
        <rect x={24} y={286} width={46} height={FY - 286} fill="url(#s2alley)" />
        <rect x={24} y={286} width={46} height={7} fill="#4E6E90" opacity={0.55} />
        <circle cx={47} cy={332} r={9} fill="#8FB6D8" opacity={0.75} style={{ filter: "drop-shadow(0 0 12px rgba(120,168,210,0.8))" }} />
        <rect x={44} y={341} width={6} height={80} fill="#3A526E" opacity={0.5} />
        {/* the alley is a PLACE, not a gap: fire escape, a lit window that dies, crates, bin bags.
            Far plane — everything here is drawn at FAR (0.55x) and read only by cold rim light. */}
        <path d="M4 292 L62 320 L4 348 L62 376 L4 404 L62 432" fill="none" stroke="#1F2C3E" strokeWidth={6} />
        <path d="M6 290 L64 318 L6 346 L64 374 L6 402 L64 430" fill="none" stroke="#42607F" strokeWidth={2} opacity={0.5} />
        <rect x={0} y={286} width={7} height={158} fill="#141C28" />
        {/* a window across the alley — someone is up. at lf 74 they aren't, and it never comes back on */}
        <rect x={26} y={452} width={M(0.7) * FAR} height={M(0.85) * FAR} fill="#0E141F" />
        <rect x={30} y={456} width={M(0.7) * FAR - 8} height={M(0.85) * FAR - 8}
          fill={winOff > 0.5 ? "#141B27" : "#C9A46A"} opacity={winOff > 0.5 ? 0.9 : 0.34 + 0.06 * Math.sin(lf / 9)} />
        {winOff < 0.5 && <rect x={38} y={466} width={13} height={M(0.85) * FAR - 22} fill="#2A2018" opacity={0.7} />}
        <rect x={26} y={452} width={M(0.7) * FAR} height={5} fill="#3E566F" opacity={0.5} />
        {/* stacked crates and bagged rubbish at the alley mouth */}
        {[0, 1].map((i) => (
          <g key={"cr" + i}>
            <rect x={86 + i * 8} y={548 - i * M(0.46) * FAR} width={M(0.62) * FAR} height={M(0.46) * FAR} fill="#171019" />
            <rect x={86 + i * 8} y={548 - i * M(0.46) * FAR} width={M(0.62) * FAR} height={4} fill="#3E2C35" opacity={0.75} />
            <rect x={86 + i * 8} y={548 - i * M(0.46) * FAR + 14} width={M(0.62) * FAR} height={3} fill="#0B060C" />
          </g>
        ))}
        <path d="M96 640 q10 -46 34 -44 q26 2 24 44 z" fill="#120B14" />
        <path d="M100 618 q14 -18 28 -12" fill="none" stroke="#3A2B3C" strokeWidth={3} opacity={0.8} />
        <path d="M126 640 q8 -34 26 -32 q20 2 18 32 z" fill="#0E080F" />

        {/* PLANE 2 — the brick facade, the pilaster, the awning, the door */}
        <rect x={152} y={0} width={860} height={FY} fill="url(#s2brick)" />
        <rect x={152} y={0} width={44} height={FY} fill="#1B0714" />
        <rect x={190} y={0} width={6} height={FY} fill="#7A2A22" opacity={0.5} />
        {/* the bulb's glow on the wall is kept HIGH and tight — the sprite band stays dark.
            BOTH ellipses ride the gutter, which is what keeps the lit half of the panel alive. */}
        <ellipse cx={LX} cy={244} rx={300} ry={140} fill="url(#s2key)" opacity={gut} />
        <ellipse cx={LX - 40} cy={300} rx={560} ry={300} fill="url(#s2wide)" opacity={0.55 * gut} />

        {/* ---- THE WALL HAS A HISTORY. Rust bleeding out of the awning bolts, the ghosts of posters
             torn off years ago, a patch of blown render, a scab of old gaffer tape. All texture. ---- */}
        {[604, 668, 742, 830, 902, 976].map((x, i) => (
          <rect key={"rs" + i} x={x} y={242} width={5 + (i % 3) * 3} height={60 + seed(i * 2.3) * 90} fill="url(#s2rust)" />
        ))}
        {[[338, 296, 62, 44], [326, 356, 74, 58], [470, 262, 54, 40]].map(([x, y, w, h], i) => (
          <g key={"tp" + i}>
            <rect x={x} y={y} width={w} height={h} fill="#5A3448" opacity={0.16} />
            <rect x={x - 4} y={y - 5} width={20} height={9} fill="#9C8F86" opacity={0.13} transform={`rotate(${-8 + i * 7} ${x} ${y})`} />
            <rect x={x + w - 16} y={y + h - 4} width={20} height={9} fill="#9C8F86" opacity={0.11} transform={`rotate(${6 - i * 5} ${x + w} ${y + h})`} />
          </g>
        ))}
        <path d="M232 468 q26 -14 52 2 q10 20 -6 30 q-34 8 -46 -8 z" fill="#3A1C30" opacity={0.55} />
        <path d="M236 470 q24 -12 46 2" fill="none" stroke="#5C3247" strokeWidth={3} opacity={0.5} />

        {/* THE TAPED NOTICE. Four strips of tape, redacted lines, and a bottom corner already loose in
            the wind. When the list rips at B4 the tape goes with it and this hangs by one corner — for good. */}
        <g transform={`translate(236 322) rotate(${posterRot})`}>
          <rect x={4} y={6} width={POST_NW} height={POST_NH} fill="#000" opacity={0.35} />
          <rect x={0} y={0} width={POST_NW} height={POST_NH} fill="#B7A98E" />
          <rect x={0} y={0} width={POST_NW} height={5} fill="#E2D5B8" opacity={0.7 * gut} />
          <rect x={7} y={9} width={POST_NW - 14} height={38} fill="#4A3A38" opacity={0.75} />
          {[56, 70, 84, 98].map((y, i) => (
            <rect key={"pl" + i} x={7} y={y} width={(POST_NW - 14) * (i === 3 ? 0.5 : 0.86 - i * 0.08)} height={7} rx={3} fill="#5C4B46" opacity={0.7} />
          ))}
          <rect x={-7} y={-6} width={26} height={11} fill="#D8CBB4" opacity={0.5} transform="rotate(-9 0 0)" />
          {tear < 0.4 && <rect x={POST_NW - 18} y={-6} width={26} height={11} fill="#D8CBB4" opacity={0.45} transform={`rotate(8 ${POST_NW} 0)`} />}
          {tear < 0.4 && <rect x={POST_NW - 20} y={POST_NH - 5} width={26} height={11} fill="#D8CBB4" opacity={0.4} />}
        </g>

        {/* THE MENU CASE — a lit glass case bolted to the brick, its strip light on the way out.
            ⛔ redacted bars only inside it; it is a prop, not a place to hide copy. */}
        <g>
          <rect x={545 + 5} y={286 + 7} width={CASE_W} height={CASE_H} fill="#000" opacity={0.4} />
          <rect x={545} y={286} width={CASE_W} height={CASE_H} fill="#1C1116" />
          <rect x={545 + 6} y={286 + 6} width={CASE_W - 12} height={CASE_H - 12} fill="url(#s2glass)" />
          <rect x={545 + 8} y={286 + 9} width={CASE_W - 16} height={5} fill="#FFE3B8" opacity={0.5 * caseF * gut}
            style={{ filter: `drop-shadow(0 0 ${7 * caseF}px rgba(255,200,140,0.7))` }} />
          {[0, 1].map((c) => [0, 1, 2, 3, 4].map((r) => (
            <rect key={`mc${c}${r}`} x={545 + 12 + c * (CASE_W / 2 - 4)} y={286 + 26 + r * 17}
              width={(CASE_W / 2 - 20) * (0.6 + seed(c * 3 + r) * 0.4)} height={6} rx={3}
              fill="#8E7A66" opacity={0.30 + 0.22 * caseF} />
          )))}
          <rect x={545} y={286} width={CASE_W} height={4} fill="#6E4A34" opacity={0.6 * gut} />
          <rect x={545 + CASE_W - 4} y={286} width={4} height={CASE_H} fill="#8A5236" opacity={0.45 * gut} />
          <path d={`M${545 + 8} ${286 + CASE_H - 10} l${CASE_W - 26} -${CASE_H - 34}`} stroke="#FFF0D8" strokeWidth={2} opacity={0.10} />
        </g>

        <rect x={152} y={0} width={548} height={FY} fill="url(#s2coolFar)" />
        {/* B2 — the slab of bounced ember raking the whole facade as he tilts the list to the light */}
        {bounceOp > 0.01 && (
          <rect x={bounceX - 210} y={64} width={420} height={FY - 64} fill="url(#s2bounce)" opacity={bounceOp} />
        )}
        {/* awning */}
        <polygon points={`648,188 1012,188 1012,240 596,240`} fill="url(#s2awn)" />
        <rect x={596} y={236} width={416} height={24} fill="#4E1014" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <circle key={i} cx={608 + i * 30} cy={260} r={14} fill="#4E1014" />
        ))}
        <rect x={596} y={232} width={416} height={5} fill="#B7583C" opacity={0.5 * gut} />
        {/* THE SECURITY CAMERA under the awning lip. It sweeps the pavement on a slow arc until the
            skim at B2 — then it locks onto him and never sweeps again. Its indicator ticks throughout. */}
        <g transform={`translate(624 268) rotate(${camA})`}>
          <rect x={-5} y={-14} width={10} height={16} fill="#241318" />
          <path d={`M -8 0 h ${CAM_L} l 9 9 v 11 l -9 8 h -${CAM_L} z`} fill="#1B1016" />
          <path d={`M -8 0 h ${CAM_L} l 9 9 h -${CAM_L + 6} z`} fill="#3A2630" opacity={0.9} />
          <circle cx={CAM_L + 1} cy={15} r={7} fill="#0A0509" />
          <circle cx={CAM_L + 2} cy={14} r={2.6} fill="#8FA8C0" opacity={0.5} />
          <circle cx={-3} cy={16} r={3} fill="#E0432E" opacity={camLed} style={{ filter: "drop-shadow(0 0 6px rgba(224,67,46,0.9))" }} />
        </g>
        {/* drips coming off the scalloped lip, one per bay, staggered — weather hitting an OBJECT */}
        {[638, 728, 848, 938].map((x, i) => (
          <Drip key={"aw" + i} f={lf} x={x} y0={276} y1={FY + 24} per={44 + i * 9} ph={i * 17}
            col="#FFD2A8" op={0.34} w={3.2} />
        ))}
        {/* two moths working the bulb. Nothing in the frame is smaller or dimmer than this. */}
        {[0, 1].map((i) => {
          const a = lf / (17 + i * 6) + i * 2.2;
          return <ellipse key={"mo" + i} cx={LX + Math.cos(a) * (44 + i * 22)} cy={LY + Math.sin(a * 1.7) * (26 + i * 12)}
            rx={5} ry={3} fill="#FFE7C6" opacity={0.3 + 0.15 * Math.sin(lf / 3 + i)} />;
        })}
        {/* the red steel door */}
        <rect x={DX - 12} y={FY - DOOR_H - 14} width={DOOR_W + 24} height={DOOR_H + 14} fill="#26070E" />
        <rect x={DX - 12} y={FY - DOOR_H - 14} width={DOOR_W + 24} height={7} fill="#96412C" opacity={0.7 * gut} />
        <rect x={DX} y={FY - DOOR_H} width={DOOR_W} height={DOOR_H} fill="url(#s2door)" />
        <rect x={DX + 18} y={FY - DOOR_H + 26} width={DOOR_W - 36} height={132} fill="#4A1210" opacity={0.85} />
        <rect x={DX + 18} y={FY - DOOR_H + 178} width={DOOR_W - 36} height={150} fill="#4A1210" opacity={0.85} />
        <rect x={DX + 18} y={FY - DOOR_H + 26} width={DOOR_W - 36} height={4} fill="#B45540" opacity={0.5 * gut} />
        {/* barred viewing slot */}
        <rect x={DX + 46} y={FY - DOOR_H + 62} width={92} height={44} fill="#140508" />
        {[0, 1, 2].map((i) => <rect key={i} x={DX + 60 + i * 28} y={FY - DOOR_H + 62} width={6} height={44} fill="#8A5F32" />)}
        <rect x={DX} y={FY - 46} width={DOOR_W} height={40} fill="url(#s2brass)" opacity={0.5} />
        <rect x={DX + DOOR_W - 26} y={FY - 232} width={11} height={92} rx={5} fill="url(#s2brass)" />
        {/* the door has been kicked for years: a riveted patch plate over the bottom rail, a bell push
            worn to brass, and a rash of scuffs where boots land. Age, not decoration. */}
        <rect x={DX + 14} y={FY - 104} width={DOOR_W - 28} height={M(0.34)} fill="#2E2226" />
        <rect x={DX + 14} y={FY - 104} width={DOOR_W - 28} height={4} fill="#6E5A4E" opacity={0.55 * gut} />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={"rv" + i} cx={DX + 26 + i * 34} cy={FY - 96} r={3.4} fill="#8A7462" opacity={0.55} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={"rw" + i} cx={DX + 26 + i * 34} cy={FY - 104 + M(0.34) - 8} r={3.4} fill="#0E0A0C" opacity={0.7} />
        ))}
        {[[36, 132, 26], [58, 176, 15], [104, 148, 20]].map(([dx, dy, w], i) => (
          <rect key={"sc" + i} x={DX + dx} y={FY - dy} width={w} height={3} fill="#C08A6E" opacity={0.16} />
        ))}
        <rect x={DX - 30} y={FY - 246} width={16} height={26} rx={4} fill="#241318" />
        <circle cx={DX - 22} cy={FY - 236} r={4.5} fill="#FFD9A8" opacity={0.42 + 0.3 * gut}
          style={{ filter: "drop-shadow(0 0 7px rgba(255,180,110,0.8))" }} />
        {/* the ONE light: the caged ember bulb hangs from the awning IN FRONT of the door, so the
            source is visible and its cone falls across the door and out onto the wet pavement */}
        <rect x={LX - 2} y={252} width={4} height={16} fill="#2A1410" />
        <path d={`M${LX - 20} ${LY - 6} q20 -14 40 0 l0 26 q-20 12 -40 0 z`} fill="none" stroke="#3A1E18" strokeWidth={3} />
        <circle cx={LX} cy={LY + 4} r={(BULB / 2) * (0.86 + 0.2 * gut)} fill="#FFE0B4" opacity={Math.min(1, 0.5 + 0.5 * gut)}
          style={{ filter: `drop-shadow(0 0 ${14 + 22 * gut}px rgba(255,150,84,0.95))` }} />
        <polygon points={`${LX - 40},${LY + 14} ${LX + 40},${LY + 14} ${LX + 300},${FY} ${LX - 230},${FY}`}
          fill="url(#s2cone)" opacity={gut} />

        {/* the rain sheeting off the awning lip — a 416px-wide curtain, always running */}
        <Rain f={lf} n={22 + esc * 16} x0={600} x1={1120} y0={262} y1={FY + 120} len={58} w={2.6} sp={30}
          col="#FFC79A" op={0.4} k={11} slant={0.1 + 0.2 * gust} />

        {/* B0 — the awning DUMPS: a sheet of standing water sluices off the lip and hits the pavement.
            One door-sized event so the opening second is never a hold while the VO starts. */}
        {sluice > 0.005 && sluice < 1 && (
          <g opacity={0.9 - sluice * 0.25} mask="url(#s2slMask)">
            <rect x={596} y={268} width={416} height={Math.max(0, slY - 268)} fill="url(#s2sluice)" />
            <rect x={596} y={slY - 16} width={416} height={17} fill="#FFE3C4" opacity={0.42} />
            <rect x={596} y={slY - 3} width={416} height={5} fill="#FFF3E2" opacity={0.55} />
          </g>
        )}
        {slSplash > 0.01 && slSplash < 1 && (
          <g opacity={0.7 * (1 - slSplash)}>
            <ellipse cx={804} cy={FY + 66} rx={90 + slSplash * 250} ry={12 + slSplash * 40}
              fill="none" stroke="#FFDDBB" strokeWidth={9 * (1 - slSplash)} />
            <ellipse cx={804} cy={FY + 58} rx={40 + slSplash * 170} ry={8 + slSplash * 26}
              fill="none" stroke="#FFF0DC" strokeWidth={6 * (1 - slSplash)} opacity={0.7} />
          </g>
        )}

        {/* PLANE 3 — the wet pavement: ember + cold reflections, kerb, slab joints */}
        <rect x={694} y={FY} width={216} height={140} fill="url(#s2wetE)" opacity={gut} />
        <rect x={LX - 150} y={FY} width={300} height={120} fill="url(#s2wetE)" opacity={0.7 * gut} />
        <rect x={24} y={FY} width={48} height={110} fill="url(#s2wetC)" />
        <ellipse cx={LX} cy={FY + 52} rx={280 * (0.9 + 0.14 * gut)} ry={58} fill="url(#s2key)" opacity={0.7 * gut} />
        <rect x={0} y={FY} width={1012} height={4} fill="#5E2A22" opacity={0.5 * gut} />
        <line x1={0} y1={714} x2={1012} y2={714} stroke="#000" strokeOpacity={0.35} strokeWidth={3} />

        {/* B1's LASTING MARK — the list lands hard enough to blow the standing water out of the
            paving, and the dark splat it leaves behind is still there at the cut. */}
        {splat > 0.01 && (
          <g opacity={splat}>
            <ellipse cx={452} cy={704} rx={186} ry={44} fill="url(#s2splat)" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const a = seed(i * 6.1 + 3);
              return <ellipse key={"sf" + i} cx={452 + (a - 0.5) * 430} cy={694 + seed(i * 2.9) * 62}
                rx={9 + a * 22} ry={4 + a * 7} fill="#0A0409" opacity={0.4} />;
            })}
          </g>
        )}

        {/* THE DRAIN at the kerb, taking the whole street's rain. A grate, a running stream, a
            standing ripple. Small, dark, permanently busy. */}
        <g>
          <rect x={836} y={690} width={GRATE_W * 1.9} height={30} rx={3} fill="#0A0509" />
          <rect x={836} y={690} width={GRATE_W * 1.9} height={4} fill="#5A3628" opacity={0.5 * gut} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={"gb" + i} x={846 + i * 17} y={694} width={7} height={22} fill="#2A1A18" opacity={0.9} />
          ))}
          <path d={`M 952 676 q -22 8 -34 16 l 12 4 q 16 -10 30 -14 z`} fill="#C98A63" opacity={0.22 * gut} />
          <ellipse cx={888} cy={706} rx={26 + Math.sin(lf / 6) * 7} ry={7} fill="none" stroke="#C98A63" strokeWidth={2} opacity={0.25 * gut} />
        </g>

        {/* wet flyers trodden flat into the stone — nobody has swept this doorway in weeks */}
        {[[176, 700, -9, 62], [610, 694, 6, 54], [678, 714, -4, 48], [268, 724, 13, 58]].map(([x, y, r, w], i) => (
          <g key={"fy" + i} transform={`translate(${x} ${y}) rotate(${r + (i === 1 ? Math.sin(lf / 11) * 1.6 : 0)})`}>
            <rect x={0} y={0} width={w} height={w * 0.66} rx={2} fill="#6E6252" opacity={0.42} />
            <rect x={0} y={0} width={w} height={4} fill="#A99A85" opacity={0.30 * gut} />
            <rect x={6} y={12} width={w - 16} height={5} fill="#2A2422" opacity={0.4} />
            <rect x={6} y={24} width={w - 26} height={5} fill="#2A2422" opacity={0.34} />
          </g>
        ))}

        {/* THE QUEUE BARRIER — a steel crowd barrier planted across the pavement, mid-left. It takes
            a rattle when the list slaps down (B1's second consequence) and settles again. */}
        <g transform={`rotate(${jolt} 140 692)`}>
          <ellipse cx={-40 + BARR_W / 2} cy={692} rx={BARR_W / 2} ry={9} fill="#000" opacity={0.4} />
          {[-30, BARR_W - 62].map((dx, i) => (
            <g key={"bl" + i}>
              <rect x={-40 + dx} y={692 - BARR_H} width={11} height={BARR_H} fill="url(#s2steel)" />
              <path d={`M ${-40 + dx - 26} 692 l 26 -22 l 26 22 z`} fill="#141920" />
              <rect x={-40 + dx} y={692 - BARR_H} width={3} height={BARR_H} fill="#5E7086" opacity={0.35} />
            </g>
          ))}
          {[0, 0.42, 0.84].map((t, i) => (
            <g key={"br" + i}>
              <rect x={-30} y={692 - BARR_H + 6 + t * (BARR_H - 22)} width={BARR_W - 44} height={9} fill="#1B2028" />
              <rect x={-30} y={692 - BARR_H + 6 + t * (BARR_H - 22)} width={BARR_W - 44} height={3} fill="#63788E" opacity={0.3} />
            </g>
          ))}
        </g>

        {/* THE CIGARETTE BIN by the door — a column with a sand tray, one thread of smoke still
            leaving it. The single quietest moving thing in the frame. */}
        <g>
          <ellipse cx={906 + ASH_W / 2} cy={662} rx={ASH_W * 0.8} ry={8} fill="#000" opacity={0.45} />
          <rect x={906} y={660 - ASH_H} width={ASH_W} height={ASH_H} rx={4} fill="#1A1015" />
          <rect x={906 + ASH_W - 6} y={660 - ASH_H} width={6} height={ASH_H} fill="#8A4A2E" opacity={0.45 * gut} />
          <rect x={900} y={660 - ASH_H - 12} width={ASH_W + 12} height={14} rx={3} fill="#241419" />
          <rect x={900} y={660 - ASH_H - 12} width={ASH_W + 12} height={4} fill="#A45836" opacity={0.5 * gut} />
          <rect x={908} y={660 - ASH_H + 26} width={ASH_W - 16} height={7} rx={3} fill="#080407" />
          <rect x={906} y={660 - ASH_H * 0.45} width={ASH_W} height={30} fill="url(#s2rust)" opacity={0.7} />
        </g>
        <Wisp f={lf} x={929} y={660 - ASH_H - 14} k={2} h={110} op={0.11} col="#D8C8B8" />

        {/* rain landing on the stone — the pavement itself never settles */}
        <Splash f={lf} n={7} x0={120} x1={960} y0={664} y1={784} col="#C98A63" k={3} op={0.45} />

        {/* the far rain layer, behind the heroes — thin and dim, wall to wall */}
        <Rain f={lf} n={rainN} x0={-120} x1={1440} y0={-40} y1={792} len={62} w={2.2} sp={26}
          col="#9DBBD6" op={0.3} k={2} slant={slantA} />
        <Rain f={lf} n={rainN * 0.34} x0={520} x1={1440} y0={-40} y1={792} len={70} w={2.6} sp={29}
          col="#FFC79A" op={0.4} k={5} slant={slantA} />

        <rect x={0} y={640} width={1012} height={152} fill="url(#s2fgDark)" />
        {/* the ONE bulb lighting the ONE street: when it gutters, the whole street gutters with it */}
        <rect x={0} y={0} width={1012} height={792} fill="#FF7A3C" opacity={0.052 * gut} />
      </svg>

      {/* ---------------- HERO PLANE (plane 4) ----------------
          ⛔ NO stern squash anywhere — attitude comes from gaze and posture. Arms stay flush
             (x+26=34 left / x=166 right) with zero rotation: no `point`, no `rant`. */}
      <Actor lf={tL} x={TX} groundY={GY} size={TS} z={12} coat={1} nodAmp={1.0} nodSpeed={17} gaze={7} />
      <Rim lf={tL} x={TX} groundY={GY} size={TS} nodAmp={1.0} nodSpeed={17} z={13} col="#F2A470" op={0.72} />
      <Actor lf={kL} x={KX} groundY={GY} size={KS} z={14} nodAmp={1.2} nodSpeed={21} gaze={-7} />
      <Rim lf={kL} x={KX} groundY={GY} size={KS} nodAmp={1.2} nodSpeed={21} z={15} col="#FFC48E" op={0.92} />

      {/* it is COLD. Both of them are breathing it — staggered so they never puff together. */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 16, pointerEvents: "none" }}>
        <Breath f={lf} x={334} y={516} per={96} ph={12} dir={1} op={0.13} />
        <Breath f={lf} x={654} y={500} per={112} ph={64} dir={-1} op={0.17} />
      </svg>

      {/* ---------------- THE LIST — a real SCROLL, drawn BEHIND both sprites (z 11) -------------
          A roll at the top (his hand covers its left end), a ribbon of paper falling to the wet
          pavement, then POOLING across the whole bottom third. ⛔ redacted bars only. */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 11 }}>
        <defs>
          <linearGradient id="s2paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F2E7D2" /><stop offset="0.55" stopColor="#DBCAAF" /><stop offset="1" stopColor="#B7A288" />
          </linearGradient>
          <linearGradient id="s2paperFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EADCC1" /><stop offset="1" stopColor="#AF9B81" />
          </linearGradient>
        </defs>

        {/* B1b — THE POOL: it keeps arriving, it keeps spreading, and the rain keeps it rippling */}
        {pe > 0.02 && (
          <g transform={`translate(${-poolShift} ${tearE * 22})`}>
            <polygon points={poolPts} fill="#000" opacity={0.34} transform="translate(-16 12)" />
            <polygon points={poolPts} fill="url(#s2paperFloor)" />
            {/* fold ridges fanning down the run — they arrive one at a time as more paper lands */}
            {[0.14, 0.3, 0.46, 0.62, 0.78].map((t, i) => {
              if (pe < 0.1 + i * 0.15) return null;
              const fx = mix(SX - 6, SR + 6, t);
              const nx = mix(PL, PR, 1 - t);
              return (
                <g key={"fd" + i}>
                  <line x1={fx} y1={FLOORY} x2={nx} y2={PN + rip(i) + 4} stroke="#8E7A63" strokeWidth={3} opacity={0.6} />
                  <line x1={fx + 4} y1={FLOORY} x2={nx + 9} y2={PN + rip(i) + 4} stroke="#FBF2DE" strokeWidth={2.5} opacity={0.42} />
                </g>
              );
            })}
            {/* the same redacted rules, now foreshortened out along the run */}
            {[0.34, 0.56, 0.78].map((t, i) => {
              if (pe < 0.24 + i * 0.2) return null;
              const y = mix(FLOORY, PN, t);
              const halfW = mix(SW / 2 + 10, (PR - PL) / 2, t) * 0.62;
              const cx = mix((SX + SR) / 2, (PL + PR) / 2, t);
              return <rect key={"pb" + i} x={cx - halfW} y={y} width={halfW * 2} height={BAR_H * (0.7 + t)}
                rx={4} fill="#4A3A38" opacity={0.8} />;
            })}
            {/* the near lip curled up toward camera — the tell that says PAPER, not carpet */}
            <path d={`M ${PL} ${PN + rip(3)} Q ${(PL + PR) / 2} ${PN - 26 + rip(1)} ${PR} ${PN + rip(0)}`}
              fill="none" stroke="#F7EBD2" strokeWidth={6} opacity={0.8} />
          </g>
        )}

        {/* the hanging ribbon — shaded edge away from the bulb, warm rim on the edge facing it */}
        <g transform={`translate(0 ${slump})`}>
          <path d={ribbon} fill="url(#s2paper)" />
          <path d={edgeL} fill="none" stroke="#7E6A58" strokeWidth={5} opacity={0.75} />
          <path d={edgeR} fill="none" stroke="#FFF3DC" strokeWidth={4} opacity={0.85 * gut} />
          {/* creases — what makes it read as PAPER and not a slab */}
          {[0.3, 0.62].map((t, i) => {
            const yy = mix(TOPY + 34, sBot, t);
            if (yy > sBot - 14) return null;
            return (
              <g key={"cr" + i}>
                <path d={`M ${SX - 3} ${yy} Q ${SX + SW / 2 + sway * 0.5} ${yy + 10} ${SR + 3} ${yy - 3}`} fill="none" stroke="#9C8874" strokeWidth={3} opacity={0.55} />
                <path d={`M ${SX - 3} ${yy + 5} Q ${SX + SW / 2 + sway * 0.5} ${yy + 15} ${SR + 3} ${yy + 2}`} fill="none" stroke="#FBF2DE" strokeWidth={2.5} opacity={0.45} />
              </g>
            );
          })}

          {/* the redacted rules on the hanging part */}
          {ROWS.map((y, i) => {
            const k = SKIP.indexOf(i);
            if (sBot < y + BAR_H) return null;
            if (k >= 0 && fallT(k) > 0) return null;
            const isSkip = k >= 0;
            const grey = isSkip ? dead(y) : 0;
            return (
              <g key={i}>
                <rect x={SX + 11 + sway * ((y - TOPY) / 200)} y={y} width={WID[i]} height={BAR_H} rx={3}
                  fill={grey ? "#8A857F" : "#3B2C2E"} opacity={grey ? 0.85 : 1} />
                {!isSkip && litNow(y) > 0.02 && (
                  <rect x={SX + 11 + sway * ((y - TOPY) / 200)} y={y} width={WID[i]} height={BAR_H} rx={3} fill="#F0A05E" opacity={litNow(y) * 0.9} />
                )}
                {grey > 0 && <rect x={SX + 11 + sway * ((y - TOPY) / 200)} y={y + BAR_H / 2 - 2} width={WID[i]} height={4} fill="#463C38" opacity={0.7} />}
              </g>
            );
          })}
        </g>

        {/* the roll at the top — drawn last so the ribbon reads as coming out from behind it */}
        <ellipse cx={SX + SW / 2} cy={ROLLY + rollH / 2 + 6} rx={SW / 2 + 6} ry={7} fill="#000" opacity={0.3} />
        <rect x={SX - 10} y={ROLLY - rollH / 2} width={SW + 20} height={rollH} rx={rollH / 2} fill="#E0D0B4" />
        <rect x={SX - 6} y={ROLLY - rollH / 2 + 2} width={SW + 12} height={Math.max(3, rollH * 0.3)} rx={3} fill="#FBF0D8" opacity={0.85} />
        <ellipse cx={SX - 10} cy={ROLLY} rx={7} ry={rollH / 2} fill="#B09C80" />
        <ellipse cx={SR + 10} cy={ROLLY} rx={7} ry={rollH / 2} fill="#D6C4A4" />
        {/* the roll KEEPS TURNING while paper is still feeding — the spool mark spins */}
        <path d={`M ${SR + 10} ${ROLLY - rollH / 2 + 4} a 5 ${Math.max(2, rollH / 2 - 4)} 0 0 1 0 ${Math.max(4, rollH - 8)}`}
          fill="none" stroke="#8E7A63" strokeWidth={2}
          transform={`rotate(${lf * 6} ${SR + 10} ${ROLLY})`} />

        {/* B2 — the ember read-bar: down the ribbon, then out across the pool, widening */}
        {scanOn && (
          <>
            <rect x={(SX + SW / 2) - scanW / 2} y={scanY - 6} width={scanW} height={12} fill="#FFB271" opacity={0.9}
              style={{ filter: "drop-shadow(0 0 16px rgba(255,150,80,0.95))" }} />
            <rect x={(SX + SW / 2) - scanW / 2 - 14} y={scanY - 20} width={scanW + 28} height={40} fill="#FF8A44" opacity={0.16} />
          </>
        )}

        {/* B3 — the skipped rules slough off the list and pile up on the kerb */}
        {SKIP.map((rowI, k) => {
          const t = fallT(k);
          if (t <= 0 || k === 2) return null;      // the third one leaves with the tear, not as a chip
          const [tx, ty, rot] = TGT[k];
          const x0 = SX + 11, y0 = ROWS[rowI];
          const x = mix(x0, tx, t), y = mix(y0, ty, t * t);
          const r = mix(0, rot, eOut(t));
          const w = WID[rowI] + 44;
          const sk = soak(k);                       // it lands in the wet and goes on soaking through
          return (
            <g key={k}>
              {/* the ring it kicks out of the standing water when it hits — B3's second consequence */}
              {landT(k) > 0.01 && landT(k) < 1 && (
                <ellipse cx={tx + w / 2} cy={ty + CHIP_H} rx={14 + landT(k) * 110} ry={5 + landT(k) * 26}
                  fill="none" stroke="#C98A63" strokeWidth={4 * (1 - landT(k))} opacity={0.5 * (1 - landT(k))} />
              )}
              <g transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect x={-8} y={6} width={w} height={CHIP_H} rx={4} fill="#000" opacity={0.35} />
                <rect x={0} y={0} width={w} height={CHIP_H} rx={4} fill={sk > 0.5 ? "#544E4A" : "#6E6862"} opacity={1 - sk * 0.18} />
                <rect x={0} y={0} width={w} height={5} rx={2} fill="#918A83" opacity={1 - sk * 0.45} />
                <rect x={9} y={CHIP_H / 2 - 2} width={w - 18} height={4} fill="#3A3634" opacity={0.8} />
                {/* the wet creeping up it from the bottom edge */}
                <rect x={0} y={CHIP_H - CHIP_H * sk * 0.7} width={w} height={CHIP_H * sk * 0.7} rx={3} fill="#2E2A2A" opacity={0.4 * sk} />
              </g>
            </g>
          );
        })}
        {piled > 0 && <ellipse cx={316} cy={788} rx={124} ry={16} fill="#000" opacity={0.42} />}
      </svg>

      {/* ---------------- PLANE 5 — the velvet rope, near camera, below the heroes' feet ----------
          a clear catenary between two posts; near-black, read only by its ember rim. */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 28 }}>
        <path d={`M 70 716 Q 160 ${802 + Math.sin(lf / 7) * 6} 250 716`} fill="none" stroke="#0B0509" strokeWidth={ROPE_W + 6} strokeLinecap="round" />
        <path d={`M 70 712 Q 160 ${796 + Math.sin(lf / 7) * 6} 250 712`} fill="none" stroke="#B2472C" strokeWidth={5} strokeLinecap="round" opacity={0.72 * gut} />
        {[70, 250].map((px) => (
          <g key={px}>
            <rect x={px - POST_W / 2} y={712} width={POST_W} height={POST_H} fill="#0B0509" />
            <rect x={px + POST_W / 2 - 5} y={712} width={5} height={POST_H} fill="#A8432A" opacity={0.55 * gut} />
            <circle cx={px} cy={712} r={BALL_R} fill="#0B0509" />
            <circle cx={px + 6} cy={706} r={5} fill="#C4643C" opacity={0.7 * gut} />
          </g>
        ))}
      </svg>

      {/* ---------------- B4 — THE TEAR. The rules he skipped literally blow away: the lower half of
           the list rips off and tumbles AT THE LENS, growing as it comes. The scene's biggest mover. */}
      {tear > 0.01 && (
        <svg viewBox="0 0 1012 792" width={1012} height={792}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 29, pointerEvents: "none" }}>
          <g transform={`translate(${mix(SX + 6, 128, eInOut(tear))} ${mix(RIPY - 10, 636, tear)}) ` +
            `rotate(${tearE * 38}) scale(${1 + tearE * 0.95})`} opacity={1 - ramp(lf, 130, 135)}>
            <path d="M 0 0 Q 58 22 118 -6 L 132 196 Q 62 226 -6 200 Z" fill="#E6D7BB" />
            <path d="M 0 0 Q 58 22 118 -6 L 122 46 Q 58 70 -2 46 Z" fill="#F6EDD8" opacity={0.85} />
            <path d="M 0 0 Q 58 22 118 -6" fill="none" stroke="#FFF7E6" strokeWidth={6} />
            <path d="M -6 200 Q 62 226 132 196" fill="none" stroke="#9C8874" strokeWidth={5} opacity={0.7} />
            {[62, 104, 146].map((y, i) => (
              <rect key={i} x={14} y={y} width={78 - i * 12} height={BAR_H} rx={3} fill="#6E6862" opacity={0.9} />
            ))}
          </g>
        </svg>
      )}

      {/* ---------------- PLANE 6 — THE DOWNPIPE, right at the lens and cropped by the frame.
           Near-black cast iron with a burst collar half way up: the whole street's roof water is
           coming out of that split joint all shot long. It is the frame's closest object, so it is
           the darkest thing in it and reads by its ember rim alone. ---------------- */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 30, pointerEvents: "none" }}>
        <rect x={946} y={-12} width={PIPE_W + 24} height={78} rx={5} fill="url(#s2iron)" />
        <rect x={946} y={-12} width={5} height={78} fill="#8A4028" opacity={0.34 * gut} />
        <rect x={958} y={54} width={PIPE_W} height={806} fill="url(#s2iron)" />
        <rect x={958} y={54} width={5} height={806} fill="#A24E2E" opacity={0.4 * gut} />
        <rect x={962} y={54} width={2} height={806} fill="#FFC79A" opacity={0.12 * gut} />
        {[210, 470, 648].map((y, i) => (
          <g key={"cl" + i}>
            <rect x={951} y={y} width={PIPE_W + 14} height={18} rx={3} fill="#0B0509" />
            <rect x={951} y={y} width={4} height={18} fill="#B4552F" opacity={0.4 * gut} />
          </g>
        ))}
        {[300, 560].map((y, i) => (
          <rect key={"bk" + i} x={992} y={y} width={22} height={11} fill="#0A0509" />
        ))}
        {/* THE BURST JOINT — a permanent, low-contrast jet arcing out of the split and falling away */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = ((lf * 0.055 + i / 7) % 1);
          const jx = 951 - t * 74, jy = 484 + t * t * 300;
          return <line key={"jt" + i} x1={jx} y1={jy} x2={jx - 9} y2={jy + 26 + t * 20}
            stroke="#E6C3A6" strokeWidth={3.6 - t * 1.4} strokeLinecap="round" opacity={0.30 * (1 - t * 0.5)} />;
        })}
        <ellipse cx={888} cy={770} rx={40 + Math.sin(lf / 5) * 12} ry={11} fill="none" stroke="#C98A63" strokeWidth={3} opacity={0.22 * gut} />
        <rect x={951} y={484} width={PIPE_W + 14} height={6} fill="#C98A63" opacity={0.2 * gut} />
      </svg>

      {/* the NEAR rain layer — fat, fast, right at the lens. Depth, and it never stops. */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 31, pointerEvents: "none" }}>
        <Rain f={lf} n={11 + esc * 6} x0={-160} x1={1480} y0={-200} y1={792} len={168} w={6.5} sp={62}
          col="#E9DCCB" op={0.3} k={7} slant={0.22 + 0.5 * gust} />
      </svg>

      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 32, pointerEvents: "none" }}>
        <Vignette cx={0.56} cy={0.46} a={0.6} />
      </svg>
    </>
  );
};

/* ============================================================================================
   SHOT B — THE TRIPWIRE.  The SAME doorway, now shot from inside the vestibule.
   FLOOR: polished dark concrete with a brass threshold strip.
   BACK WALL: plum plaster with a dado rail; the open doorway to the ember street on the right.
   ⛔ ONE MOTIVATED LIGHT: the same awning bulb, now OUTSIDE, spilling through the doorway from
      back-RIGHT (a cold sconce high-left is fill only) — and still guttering, so the spill across the
      whole floor breathes on every frame. When the iron lands it kills that spill and the WHOLE FRAME
      drops 55%; then the alarm beacon becomes the only mover and sweeps the entire back wall.
   PLANES: 1 the ember street through the opening · 2 the doorway frame, leaf, threshold ·
           3 interior wall, sconce, stanchion · 4 hero + beam + anchors · 5 near floor + the iron.
   ============================================================================================ */
const ShotB: React.FC<{ s: number }> = ({ s }) => {
  const GY = 656, FY = 644;
  const DX0 = 630, DX1 = DX0 + OPEN_W, DY0 = FY - OPEN_H;   // 630..951, top 210

  const esc = ramp(s, 0, 120);
  const gut = gutter(s + 400, esc * 0.6);
  const gustB = Math.max(0, 1 - Math.abs(s - 12) / 20) + Math.max(0, 1 - Math.abs(s - 44) / 16) * 0.8;

  /* B5 — the stride: 320px of traverse, and his shadow bites across the lit floor as he crosses it */
  const walk = eInOut(ramp(s, 2, 34));
  const back = eOut(ramp(s, 62, 76));
  const hx = mix(132, 452, walk) - 16 * back;

  /* the beam */
  const BLX = 496, BRX = 958, BLY = FY - ANKLE + 12, BRY = FY - ANKLE;
  const flare = s >= 38 ? Math.max(0, 1 - (s - 38) / 22) : 0;
  const hot = s >= 38 ? Math.max(0, 1 - (s - 38) / 6) : 0;
  const armed = 1 + 0.7 * ramp(s, 20, 38);
  const beamW = mix(3.5, 19, flare);

  /* B6 — the LIGHT CURTAIN: the tripwire answers by standing a wall of crimson up the whole frame */
  const curT = ramp(s, 40, 58);
  const curTop = mix(BRY, 42, eOut(curT));
  const curOp = Math.min(1, ramp(s, 40, 46)) * (1 - ramp(s, 60, 70));

  /* B7 — the iron shutter */
  const dropT = ramp(s, 56, 66);
  const bounce = s > 66 ? Math.max(0, 1 - (s - 66) / 14) * Math.sin((s - 66) / 2) * 16 : 0;
  const shutB = mix(150, 664, dropT * dropT) - bounce;
  const shutT = shutB - SHUT_H;
  const landed = ramp(s, 62, 70);
  const spill = (1 - 0.78 * landed) * gut;
  const dust = ramp(s, 66, 112);
  const shock = ramp(s, 54, 64);

  /* B8 — the value kill: with the ember gone the whole room drops away */
  const night = ramp(s, 64, 76);

  /* ---- THE ROOM REACTS, AND STAYS REACTED. Nothing the iron does is undone: a coat is on the
     floor, the mat is askew, the fuse box is showing red, the extinguisher hangs crooked, there is
     a skid burned into the polish and one more chalk mark on the jamb. Every one of them is a
     small, dim, secondary consequence of a beat that already owns the frame. ---- */
  const draught = (Math.sin(s / 12.5) * 1.1 + Math.sin(s / 5.3) * 0.55) * (1 - landed);   // door-draught in the coats
  const coatFall = ramp(s, 66, 86);                        // the slam shakes one coat off the rail
  const matKick = ramp(s, 40, 52);                         // his skid shoves the mat, and it stays shoved
  const extSwing = s > 62 ? Math.exp(-(s - 62) / 20) * Math.sin((s - 62) / 2.4) * 11 + 6 * ramp(s, 62, 100) : 0;
  const fuseRed = ramp(s, 64, 74);                         // every indicator on the box goes red and stays
  const sconceHit = Math.max(0, 1 - Math.abs(s - 66) / 9); // the impact flickers the cold sconce too
  const tally = ramp(s, 92, 100);                          // one more mark chalked on the jamb — the receipt
  const scuff = ramp(s, 40, 54);                           // the skid mark he leaves in the polish
  const haze = ramp(s, 74, 122);                           // the dust never fully settles
  const gaugeJit = Math.sin(s / 3.1) * 2 + (seed(Math.floor(s / 5) * 1.7) - 0.5) * 5;

  /* B9 — the alarm. TWO opposed lobes on one rotating lamp: a wedge of crimson permanently sweeping
     the back wall and the floor. This is the continuous mover for the whole back half of the shot. */
  const beacon = ramp(s, 68, 78);
  const bAng = (s - 68) * (6.4 + 3.2 * ramp(s, 78, 126));
  const BX = 486, BY = 182;      // ⛔ kept clear of the title-card band (panel-y 36..150)
  const wedge = (deg: number) => {
    const r = 1350, a0 = ((deg - 8) * Math.PI) / 180, a1 = ((deg + 8) * Math.PI) / 180;
    return `${BX},${BY} ${BX + r * Math.cos(a0)},${BY + r * Math.sin(a0)} ${BX + r * Math.cos(a1)},${BY + r * Math.sin(a1)}`;
  };
  const lampPulse = 0.55 + 0.45 * Math.abs(Math.sin((bAng * Math.PI) / 180));

  /* B9 — the stamp */
  const st = ramp(s, 84, 91);
  const stampSc = 1 + 0.95 * (1 - st) * (1 - st);
  const stampOp = ramp(s, 84, 88);
  const ringT = ramp(s, 90, 116);

  return (
    <>
      {/* ---------------- THE SET ---------------- */}
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="s2bStreet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#803124" /><stop offset="0.62" stopColor="#4A1416" /><stop offset="1" stopColor="#280A0E" />
          </linearGradient>
          <linearGradient id="s2bSpill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F09053" stopOpacity="0.42" /><stop offset="1" stopColor="#F09053" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s2bWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3E1424" /><stop offset="1" stopColor="#1A0812" />
          </linearGradient>
          <linearGradient id="s2bBrass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5C3F1C" /><stop offset="0.45" stopColor="#C79A4E" /><stop offset="1" stopColor="#54391A" />
          </linearGradient>
          <linearGradient id="s2bFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E0C14" /><stop offset="1" stopColor="#060206" />
          </linearGradient>
          <radialGradient id="s2bSconce" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#9FC0DE" stopOpacity="0.30" /><stop offset="1" stopColor="#9FC0DE" stopOpacity="0" />
          </radialGradient>
          <clipPath id="s2bOpen">
            <rect x={DX0} y={DY0} width={OPEN_W} height={OPEN_H} />
          </clipPath>
          {/* ---- the vestibule's own materials ---- */}
          <linearGradient id="s2bCoat" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#120A14" /><stop offset="0.62" stopColor="#221527" /><stop offset="1" stopColor="#0C060E" />
          </linearGradient>
          <linearGradient id="s2bBox" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#241E24" /><stop offset="0.6" stopColor="#39303A" /><stop offset="1" stopColor="#181316" />
          </linearGradient>
          <linearGradient id="s2bExt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4E120E" /><stop offset="0.45" stopColor="#9E2A1C" /><stop offset="1" stopColor="#3A0C0A" />
          </linearGradient>
          <linearGradient id="s2bMat" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#241A18" /><stop offset="1" stopColor="#100A0C" />
          </linearGradient>
          <linearGradient id="s2bPipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3A3038" /><stop offset="0.4" stopColor="#241C22" /><stop offset="1" stopColor="#0E0A0E" />
          </linearGradient>
        </defs>

        <Room wall1="#3A1220" wall2="#140610" floor1="#1C0A12" floor2="#070307" floorY={FY} />

        {/* PLANE 3 — interior wall: plaster panels, dado rail, cold sconce (fill only) */}
        <rect x={0} y={0} width={1012} height={FY} fill="url(#s2bWall)" />
        {[96, 300, 504].map((x) => <rect key={x} x={x} y={64} width={4} height={FY - 64} fill="#180712" opacity={0.8} />)}
        <rect x={0} y={470} width={620} height={13} fill="#4A1A2A" />
        <rect x={0} y={470} width={620} height={4} fill="#6E2A3C" opacity={0.7} />
        <rect x={126} y={188} width={54} height={40} fill="#2A1420" />
        <path d="M126 188 l54 0 l14 34 l-82 0 z" fill="#5A3C4E" />
        <circle cx={153} cy={228} r={11} fill="#DCEBF8" opacity={0.85 * (1 - 0.75 * sconceHit)}
          style={{ filter: "drop-shadow(0 0 18px rgba(160,196,226,0.8))" }} />
        <ellipse cx={153} cy={330} rx={210} ry={230} fill="url(#s2bSconce)" opacity={1 - 0.6 * sconceHit} />
        {/* the same brass stanchion, now inside — continuity with shot A */}
        <ellipse cx={150} cy={GY} rx={32} ry={9} fill="#120610" />
        <rect x={143} y={GY - STANCH_H} width={14} height={STANCH_H} fill="url(#s2bBrass)" />
        <circle cx={150} cy={GY - STANCH_H - 8} r={13} fill="#B08A46" />

        {/* ---- SERVICES. A conduit run along the wall feeding the fuse box, and one joint that has
             been weeping into the mop bucket for months. Background, but it is REAL background. ---- */}
        <rect x={0} y={252} width={606} height={10} fill="url(#s2bPipe)" />
        <rect x={0} y={252} width={606} height={3} fill="#584A56" opacity={0.5} />
        <rect x={0} y={268} width={606} height={7} fill="url(#s2bPipe)" />
        {[62, 196, 330, 462, 578].map((x, i) => (
          <rect key={"pb" + i} x={x} y={248} width={13} height={32} rx={3} fill="#1A1218" />
        ))}
        <rect x={382} y={262} width={9} height={32} fill="url(#s2bPipe)" />
        <Drip f={s} x={48} y0={280} y1={598} per={62} ph={9} col="#9FB6CC" op={0.3} w={2.6} />

        {/* THE FUSE BOX — hinged door hanging open, breakers in a row, three indicators.
            When the iron lands every one of them goes red, and stays red. */}
        <g>
          <rect x={344 + 6} y={292 + 8} width={FUSE_W} height={FUSE_H} fill="#000" opacity={0.4} />
          <rect x={344} y={292} width={FUSE_W} height={FUSE_H} fill="url(#s2bBox)" />
          <rect x={344} y={292} width={FUSE_W} height={4} fill="#6E5C68" opacity={0.6} />
          <rect x={344 + 8} y={292 + 30} width={FUSE_W - 16} height={FUSE_H - 44} fill="#120D12" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={"bk" + i} x={344 + 13 + (i % 3) * 24} y={292 + 36 + Math.floor(i / 3) * 24}
              width={17} height={17} rx={2} fill="#4A3E44" opacity={0.85} />
          ))}
          {[0, 1, 2].map((i) => {
            const live = seed(Math.floor(s / 7) * 2.3 + i) > 0.25 ? 1 : 0.3;
            return <circle key={"ld" + i} cx={344 + 20 + i * 22} cy={292 + 16} r={4.5}
              fill={fuseRed > 0.5 ? "#E0432E" : "#5E9E7A"} opacity={(fuseRed > 0.5 ? 0.95 : 0.6) * live}
              style={{ filter: `drop-shadow(0 0 ${6 + 5 * fuseRed}px ${fuseRed > 0.5 ? "rgba(224,67,46,0.9)" : "rgba(94,158,122,0.7)"})` }} />;
          })}
          {/* the door, hanging open on its hinge */}
          <polygon points={`${344 + FUSE_W},${292} ${344 + FUSE_W + 26},${292 + 12} ${344 + FUSE_W + 26},${292 + FUSE_H - 4} ${344 + FUSE_W},${292 + FUSE_H}`} fill="#2A2228" />
          <polygon points={`${344 + FUSE_W},${292} ${344 + FUSE_W + 6},${292 + 3} ${344 + FUSE_W + 6},${292 + FUSE_H - 1} ${344 + FUSE_W},${292 + FUSE_H}`} fill="#6E5C68" opacity={0.5} />
        </g>

        {/* THE TAPED-OVER SIGN — whatever it used to say, somebody papered it and taped the paper on.
            ⛔ redacted bars only; a curled bottom corner lifts in the draught. */}
        <g>
          <rect x={452} y={296} width={SIGN_W} height={SIGN_H} fill="#2A1C26" />
          <rect x={452} y={296} width={SIGN_W} height={4} fill="#5E4A56" opacity={0.6} />
          <g transform={`translate(452 296) rotate(${-1.6 + draught * 0.4})`}>
            <rect x={4} y={4} width={SIGN_W - 8} height={SIGN_H - 8} fill="#8E8272" opacity={0.9} />
            {[14, 28, 42].map((y, i) => (
              <rect key={"sg" + i} x={12} y={y} width={(SIGN_W - 30) * (0.9 - i * 0.22)} height={6} rx={3} fill="#3A3230" opacity={0.7} />
            ))}
            <path d={`M ${SIGN_W - 26} ${SIGN_H - 8} l 18 0 l 0 -16 q -12 6 -18 16 z`} fill="#B0A492" opacity={0.8} />
            <rect x={-4} y={-3} width={24} height={9} fill="#C6BAA6" opacity={0.35} transform="rotate(-8)" />
            <rect x={SIGN_W - 24} y={-4} width={24} height={9} fill="#C6BAA6" opacity={0.3} />
          </g>
        </g>

        {/* THE COAT RAIL — three coats on wire hangers, breathing in the draught off the open door.
            When the shutter lands, the middle one comes off the rail and is on the floor from then on. */}
        <g>
          <rect x={140} y={400} width={RAIL_W} height={8} rx={4} fill="url(#s2bBrass)" opacity={0.8} />
          <rect x={140} y={400} width={RAIL_W} height={3} rx={2} fill="#DCB870" opacity={0.35} />
          {[142, 316].map((x, i) => (
            <g key={"rb" + i}>
              <rect x={x - 4} y={378} width={9} height={26} fill="#2A1E28" />
              <rect x={x - 12} y={374} width={25} height={8} rx={3} fill="#332532" />
            </g>
          ))}
          {[170, 232, 292].map((x, i) => {
            const gone = i === 1 ? coatFall : 0;
            if (gone > 0.98) return null;
            const sw = draught * (1.2 + i * 0.35) + (i === 1 ? gone * 26 : 0);
            return (
              <g key={"ct" + i} transform={`translate(${x} 404) rotate(${sw})`} opacity={1 - gone}>
                {/* wire hanger, shoulders, a hem that flares — a COAT silhouette, not a cone */}
                <path d="M -9 -6 q 9 -12 18 0" fill="none" stroke="#9C8250" strokeWidth={3} />
                <path d={`M 0 2 L -${M(0.15)} 24 L -${M(0.17)} ${COAT_H} q ${M(0.17)} 13 ${M(0.34)} 0 L ${M(0.15)} 24 Z`}
                  fill="url(#s2bCoat)" />
                <path d={`M -${M(0.15)} 24 L -${M(0.17)} ${COAT_H} q 8 5 16 7 L ${M(0.02)} 26 Z`} fill="#0C060E" opacity={0.55} />
                <path d={`M 0 2 L -12 20 L 0 30 L 12 20 Z`} fill="#3E2C46" />
                <rect x={-2.5} y={30} width={5} height={COAT_H - 34} fill="#0A060C" opacity={0.55} />
                <rect x={M(0.15) - 5} y={26} width={4} height={COAT_H - 30} fill="#6E5E82" opacity={0.22} />
              </g>
            );
          })}
        </g>

        {/* THE FIRE EXTINGUISHER on its bracket, with a pressure gauge whose needle never quite
            settles. The slam swings it, and it hangs crooked for the rest of the shot. */}
        <g transform={`translate(572 448) rotate(${extSwing})`}>
          <rect x={-EXT_W / 2 + 3} y={6} width={EXT_W} height={EXT_H} rx={7} fill="#000" opacity={0.4} />
          <rect x={-EXT_W / 2} y={0} width={EXT_W} height={EXT_H} rx={7} fill="url(#s2bExt)" />
          <rect x={-EXT_W / 2} y={0} width={EXT_W} height={5} rx={2} fill="#D06A48" opacity={0.55} />
          <rect x={-7} y={-16} width={14} height={18} fill="#2A2226" />
          <path d={`M -12 -18 q 12 -12 24 0`} fill="none" stroke="#4A3E44" strokeWidth={5} />
          <rect x={-EXT_W / 2 - 5} y={26} width={EXT_W + 10} height={9} rx={3} fill="#241C20" />
          <circle cx={EXT_W / 2 + 5} cy={-6} r={8} fill="#1C1418" />
          <circle cx={EXT_W / 2 + 5} cy={-6} r={5.5} fill="#C6BFA8" opacity={0.55} />
          <line x1={EXT_W / 2 + 5} y1={-6} x2={EXT_W / 2 + 5} y2={-11}
            stroke="#2A2226" strokeWidth={2} transform={`rotate(${gaugeJit} ${EXT_W / 2 + 5} -6)`} />
          <rect x={-EXT_W / 2 + 4} y={EXT_H * 0.42} width={EXT_W - 8} height={M(0.13)} fill="#F0E4CE" opacity={0.16} />
        </g>

        {/* THE MOP AND BUCKET in the corner, catching the drip */}
        <g>
          <ellipse cx={48 + BUCK_W / 2} cy={GY} rx={BUCK_W * 0.62} ry={8} fill="#0A050A" opacity={0.7} />
          <path d={`M 14 ${GY - BUCK_H} l ${BUCK_W} 0 l -7 ${BUCK_H} l -${BUCK_W - 14} 0 z`} fill="#1E2028" />
          <rect x={14} y={GY - BUCK_H} width={BUCK_W} height={6} rx={3} fill="#4A5260" opacity={0.7} />
          <ellipse cx={14 + BUCK_W / 2} cy={GY - BUCK_H + 12} rx={BUCK_W / 2 - 8} ry={5} fill="#0D1620" opacity={0.9} />
          <path d="M 60 652 L 30 404" stroke="#3A2E26" strokeWidth={7} strokeLinecap="round" />
          <path d="M 61 650 L 31 404" stroke="#6E5A44" strokeWidth={2} opacity={0.4} />
          <path d="M 24 398 q 14 -6 18 8 q -10 16 -22 8 z" fill="#3A3630" />
        </g>

        {/* CHALK TALLIES on the jamb wall — everybody this door has already turned away.
            One more mark is chalked up the instant the plate stamps, and it stays. */}
        <g opacity={0.4}>
          {[0, 1, 2, 3].map((g0) => (
            <g key={"tg" + g0} transform={`translate(${552 + g0 * 13} 578)`}>
              {[0, 1, 2, 3].map((i) => <rect key={i} x={i * 2.6} y={0} width={2} height={26} fill="#D8CEC0" />)}
              <rect x={-2} y={10} width={16} height={2.4} fill="#D8CEC0" transform="rotate(-24 6 12)" />
            </g>
          ))}
          {tally > 0.02 && (
            <g transform="translate(604 578)" opacity={tally}>
              <rect x={0} y={0} width={2} height={26} fill="#F0E6D6" />
            </g>
          )}
        </g>

        {/* PLANE 1 + 2 — the doorway: frame, opening onto the ember street, the swung leaf */}
        <rect x={DX0 - 26} y={DY0 - 26} width={OPEN_W + 52} height={OPEN_H + 26} fill="#2A0C16" />
        <rect x={DX0} y={DY0} width={OPEN_W} height={OPEN_H} fill="url(#s2bStreet)" opacity={0.35 + 0.65 * spill} />
        {/* the storm is still out there — rain falling in the doorway, the whole time */}
        <g clipPath="url(#s2bOpen)" opacity={1 - landed}>
          <Rain f={s} n={30} x0={DX0 - 120} x1={DX1 + 160} y0={DY0} y1={FY} len={60} w={2.8} sp={30}
            col="#FFCBA2" op={0.42} k={13} slant={0.19 + 0.45 * gustB} />
        </g>
        <rect x={DX0} y={DY0} width={OPEN_W} height={38} fill="#5A1216" opacity={0.9} />
        <rect x={DX0} y={DY0 + 36} width={OPEN_W} height={5} fill="#B7583C" opacity={0.45 * spill} />
        <rect x={DX0} y={FY - 84} width={OPEN_W} height={84} fill="#2A0C10" opacity={0.55} />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={DX0 + 26 + i * 78} y={FY - 84} width={30} height={84} fill="#E4703E" opacity={0.16 * spill} />
        ))}
        <circle cx={DX0 + 236} cy={DY0 + 128} r={7} fill="#9FC0DE" opacity={0.5 * spill} />
        <rect x={DX0 - 26} y={DY0 - 26} width={26} height={OPEN_H + 26} fill="#4A1220" />
        <rect x={DX0 - 6} y={DY0 - 26} width={6} height={OPEN_H + 26} fill="#C4643C" opacity={0.5 * spill} />
        <rect x={DX1} y={DY0 - 26} width={26} height={OPEN_H + 26} fill="#3A0E1A" />
        {/* the red leaf, swung inward against the far jamb */}
        <polygon points={`${DX1},${DY0 + 6} 1012,${DY0 + 40} 1012,${FY - 34} ${DX1},${FY}`} fill="#6E1D18" />
        <polygon points={`${DX1},${DY0 + 6} ${DX1 + 12},${DY0 + 13} ${DX1 + 12},${FY - 6} ${DX1},${FY}`} fill="#A84630" opacity={0.7 * gut} />
        {/* brass threshold + the warm spill it throws across the floor (the frame's biggest lit area) */}
        <rect x={DX0} y={FY - 4} width={OPEN_W} height={14} fill="url(#s2bBrass)" opacity={0.5 + 0.5 * spill} />
        <polygon points={`${DX0 + 8},${FY + 10} ${DX1 - 8},${FY + 10} 1012,792 470,792`} fill="url(#s2bSpill)" opacity={spill} />
        {/* rain blowing in over the threshold, popping on the polished floor */}
        <g opacity={1 - landed}>
          <Splash f={s} n={5} x0={620} x1={980} y0={664} y1={764} col="#D8996E" k={9} op={0.4} />
        </g>

        {/* PLANE 4 — the floor, the brass inlay, the beam anchors, the beam itself */}
        <rect x={0} y={FY} width={1012} height={792 - FY} fill="url(#s2bFloor)" opacity={0.55} />
        <rect x={0} y={FY} width={1012} height={4} fill="#4A1E26" opacity={0.6} />
        <line x1={0} y1={706} x2={1012} y2={700} stroke="#000" strokeOpacity={0.4} strokeWidth={3} />
        <rect x={0} y={FY + 18} width={1012} height={5} fill="url(#s2bBrass)" opacity={0.25} />

        {/* THE MAT inside the threshold — bristles, a bound edge, and a corner that lifts in the
            draught. His skid shoves it out of square at B6 and it never gets straightened. */}
        <g transform={`translate(${-18 * matKick} ${4 * matKick}) rotate(${-6.5 * matKick} 800 694)`}>
          <polygon points="662,664 938,664 966,726 634,726" fill="url(#s2bMat)" />
          <polygon points="662,664 938,664 942,672 658,672" fill="#4A3A34" opacity={0.7 * spill} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={"mb" + i} x1={676 + i * 36} y1={666} x2={666 + i * 42} y2={724}
              stroke="#0A0608" strokeWidth={3} opacity={0.55} />
          ))}
          <polygon points="634,726 966,726 964,734 636,734" fill="#3A2C28" opacity={0.8} />
          <path d={`M 634 726 l ${24 + draught * 6} -${10 + draught * 4} l -6 -12 l -22 12 z`} fill="#2A201E" />
        </g>

        {/* THE SKID — where his boot locked up on the polish. It is still there under the alarm. */}
        {scuff > 0.02 && (
          <g opacity={0.24 * scuff}>
            <path d="M 470 668 q 54 -8 104 2" fill="none" stroke="#C6B49E" strokeWidth={7} strokeLinecap="round" />
            <path d="M 480 676 q 46 -6 88 2" fill="none" stroke="#E4D6C0" strokeWidth={3} strokeLinecap="round" opacity={0.6} />
          </g>
        )}

        {/* THE FALLEN COAT — shaken off the rail by the iron, and left where it landed. */}
        {coatFall > 0.02 && (
          <g opacity={Math.min(1, coatFall * 1.6)}
            transform={`translate(${mix(232, 214, coatFall)} ${mix(470, 636, coatFall * coatFall)}) rotate(${coatFall * 74})`}>
            <ellipse cx={30} cy={22} rx={70} ry={13} fill="#000" opacity={0.4} />
            <path d="M -30 0 q 30 -22 66 -6 q 34 16 22 30 q -44 14 -92 2 z" fill="url(#s2bCoat)" />
            <path d="M -24 4 q 28 -16 58 -4" fill="none" stroke="#3A2840" strokeWidth={4} opacity={0.7} />
            <path d="M 44 -6 q 12 -12 22 2" fill="none" stroke="#9C8250" strokeWidth={3} opacity={0.8} />
          </g>
        )}

        {/* dust and lint turning over in the ember spill, until the ember stops existing */}
        <g opacity={1 - landed}>
          <Motes f={s} n={13} x0={596} x1={1000} y0={396} y1={648} col="#FFD9B4" op={0.2} k={5} />
        </g>
        {/* his shadow, thrown back at the camera by the doorway light — it bites across the lit floor */}
        {landed < 0.9 && (
          <polygon opacity={0.5 * (1 - landed)} fill="#07030A"
            points={`${hx - 46},${GY - 4} ${hx + 46},${GY - 4} ${hx - 176},792 ${hx - 452},792`} />
        )}
        {/* the two beam anchors — cast blocks bolted to the floor, lens at beam height */}
        {([[BLX - 30, BLY], [BRX - 10, BRY]] as [number, number][]).map(([ax, lensY], i) => (
          <g key={i}>
            <ellipse cx={ax + 20} cy={FY + 2} rx={30} ry={8} fill="#0A0409" opacity={0.7} />
            <rect x={ax} y={FY - ANCHOR_H} width={40} height={ANCHOR_H} rx={4} fill="#2A2226" />
            <rect x={ax} y={FY - ANCHOR_H} width={40} height={6} rx={3} fill="#4E4046" />
            <rect x={ax + 30} y={FY - ANCHOR_H} width={5} height={ANCHOR_H} fill="#0E0A0C" opacity={0.6} />
            <circle cx={ax + 20} cy={lensY} r={9} fill="#E0432E"
              style={{ filter: `drop-shadow(0 0 ${8 + 8 * armed}px rgba(224,67,46,0.9))` }} />
            <circle cx={ax + 20} cy={lensY} r={3.5} fill="#FFD9C4" />
          </g>
        ))}
        {/* THE BEAM — base state, behind the hero's legs so a crossed leg occludes it */}
        <line x1={BLX} y1={BLY} x2={BRX} y2={BRY} stroke="#8E2018" strokeWidth={beamW + 14} strokeLinecap="round" opacity={0.22 * armed} />
        <line x1={BLX} y1={BLY} x2={BRX} y2={BRY} stroke={hot > 0.05 ? "#FFF1E4" : "#E0432E"} strokeWidth={beamW}
          strokeLinecap="round" style={{ filter: `drop-shadow(0 0 ${12 + 40 * flare}px rgba(255,120,80,${0.7 + 0.3 * flare}))` }} />

        {/* the ONE light still gutters in here too, over the whole interior */}
        <rect x={0} y={0} width={1012} height={792} fill="#FF7A3C" opacity={0.046 * spill} />
      </svg>

      {/* ---------------- HERO PLANE ---------------- */}
      <Actor lf={s} x={hx} groundY={GY} size={H} z={12} coat={1} headband={1}
        nodAmp={walk > 0 && walk < 1 ? 3.4 : 1} nodSpeed={walk > 0 && walk < 1 ? 8 : 18}
        gaze={6} shock={shock} />

      {/* ---------------- NEAR PLANE: the curtain, the iron, the dust ---------------- */}
      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 26 }}>
        <defs>
          <linearGradient id="s2bIron" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3A2E30" /><stop offset="0.3" stopColor="#241C1E" /><stop offset="1" stopColor="#140F11" />
          </linearGradient>
          <linearGradient id="s2bFg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#050206" stopOpacity="0" /><stop offset="1" stopColor="#050206" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="s2bCurtain" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#FF6A46" stopOpacity="0.46" />
            <stop offset="0.55" stopColor="#E0432E" stopOpacity="0.22" />
            <stop offset="1" stopColor="#E0432E" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="s2bBeacon" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FF6A46" stopOpacity="0.5" />
            <stop offset="0.45" stopColor="#E0432E" stopOpacity="0.22" />
            <stop offset="1" stopColor="#E0432E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* B5 — the flare washes OVER the leg that broke it */}
        {flare > 0.01 && (
          <>
            <line x1={BLX} y1={BLY} x2={BRX} y2={BRY} stroke="#FFF1E4" strokeWidth={beamW * 0.55}
              strokeLinecap="round" opacity={0.35 + 0.65 * flare}
              style={{ filter: `drop-shadow(0 0 ${20 + 46 * flare}px rgba(255,160,110,0.95))` }} />
            <rect x={BLX - 40} y={BRY - 76} width={BRX - BLX + 80} height={150} fill="#FF7A46" opacity={0.22 * flare} />
            {[0, 1, 2].map((i) => {
              const t = Math.max(0, Math.min(1, (s - 38 - i * 4) / 16));
              if (t <= 0 || t >= 1) return null;
              return <circle key={i} cx={540} cy={632} r={12 + t * 190} fill="none" stroke="#FFC79A"
                strokeWidth={5 * (1 - t)} opacity={0.7 * (1 - t)} />;
            })}
          </>
        )}

        {/* B6 — THE LIGHT CURTAIN: crimson stands up the full height of the frame across the threshold */}
        {curOp > 0.01 && (
          <g opacity={curOp}>
            <rect x={BLX - 14} y={curTop} width={BRX - BLX + 28} height={Math.max(0, BRY - curTop)} fill="url(#s2bCurtain)" />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const span = Math.max(1, BRY - curTop);
              const yy = BRY - ((s * 13 + i * 96) % span);
              return <rect key={i} x={BLX - 10} y={yy} width={BRX - BLX + 20} height={7} fill="#FFB27E"
                opacity={0.34 * (1 - (BRY - yy) / span)} />;
            })}
            <rect x={BLX - 14} y={curTop} width={BRX - BLX + 28} height={6} fill="#FFD9C4" opacity={0.6} />
          </g>
        )}

        {/* B7 — the IRON SHUTTER out of frame-top */}
        <g>
          <rect x={1012 - SHUT_W} y={shutT} width={SHUT_W} height={SHUT_H} fill="url(#s2bIron)" />
          {Array.from({ length: 26 }).map((_, i) => (
            <g key={i}>
              <rect x={1012 - SHUT_W} y={shutT + i * 22} width={SHUT_W} height={4} fill="#4A3C40" opacity={0.55} />
              <rect x={1012 - SHUT_W} y={shutT + i * 22 + 18} width={SHUT_W} height={4} fill="#0E0A0C" opacity={0.7} />
            </g>
          ))}
          <rect x={1012 - SHUT_W} y={shutT} width={6} height={SHUT_H} fill="#7A3324" opacity={0.55} />
          <rect x={1012 - SHUT_W} y={shutB - 26} width={SHUT_W} height={26} fill="#4E3E42" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const bx = 1012 - SHUT_W + 22 + i * 56;
            return (
              <polygon key={i}
                points={`${bx},${shutB - 22} ${bx + 30},${shutB - 22} ${bx + 14},${shutB - 6} ${bx - 16},${shutB - 6}`}
                fill="#C4553A" opacity={0.85} />
            );
          })}
          <rect x={1012 - SHUT_W} y={shutB - 6} width={SHUT_W} height={6} fill="#100B0D" />
        </g>
        {/* the shutter housing — the iron rolls out from behind it */}
        <rect x={1012 - SHUT_W - 18} y={88} width={SHUT_W + 18} height={68} rx={5} fill="#2E2428" />
        <rect x={1012 - SHUT_W - 18} y={88} width={SHUT_W + 18} height={7} rx={3} fill="#584850" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={1012 - SHUT_W + 16 + i * 72} cy={146} r={5} fill="#120D0F" />
        ))}

        {/* B9 — the dust the slam blows out along the floor, rolling the whole width of the room */}
        {dust > 0.01 && [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const sd = seed(i * 3.7 + 2);
          const t = Math.max(0, Math.min(1, dust * 1.5 - i * 0.075));
          if (t <= 0) return null;
          return (
            <ellipse key={i} cx={1012 - SHUT_W - t * (120 + sd * 620)} cy={GY - 4 - sd * 40 - t * 30}
              rx={40 + t * (110 + sd * 90)} ry={16 + t * (40 + sd * 30)}
              fill="#B7A79C" opacity={Math.max(0, 0.34 * (1 - t))} />
          );
        })}
        {/* the impact ring on the iron face */}
        {ringT > 0.01 && ringT < 1 && (
          <circle cx={790} cy={352} r={30 + ringT * 210} fill="none" stroke="#F0A05E"
            strokeWidth={7 * (1 - ringT)} opacity={0.55 * (1 - ringT)} />
        )}

        {/* the dust the iron threw never fully settles — a low band hanging at ankle height */}
        {haze > 0.02 && (
          <ellipse cx={620} cy={702} rx={520} ry={62} fill="#B7A79C"
            opacity={0.13 * haze * (1 - ramp(s, 108, 126) * 0.5)} />
        )}

        {/* PLANE 5 — THE NEAR CROP: a stack of bar crates and a coil of spare velvet rope, cut off by
             the bottom-left corner. Near-black; its only job is to put an object between us and the room. */}
        <g>
          <rect x={-46} y={690} width={284} height={110} rx={5} fill="#050206" />
          <rect x={-46} y={690} width={284} height={6} fill="#4A1E26" opacity={0.6} />
          <rect x={-46} y={736} width={284} height={5} fill="#160B12" />
          {[24, 92, 160].map((x, i) => (
            <rect key={"cs" + i} x={x} y={696} width={9} height={96} fill="#0C060C" />
          ))}
          <rect x={-46} y={756} width={284} height={44} rx={4} fill="#030105" />
          <rect x={-46} y={756} width={284} height={4} fill="#3E1A22" opacity={0.5} />
          {/* the spare rope, coiled on the top crate */}
          <ellipse cx={168} cy={686} rx={54} ry={17} fill="none" stroke="#0A0509" strokeWidth={13} />
          <ellipse cx={168} cy={682} rx={54} ry={17} fill="none" stroke="#5E2018" strokeWidth={6} opacity={0.5 * spill} />
          <circle cx={216} cy={678} r={9} fill="#0A0509" />
          <circle cx={218} cy={675} r={4} fill="#8A6A34" opacity={0.5 * spill} />
        </g>
        <rect x={0} y={620} width={1012} height={172} fill="url(#s2bFg)" />
      </svg>

      {/* B8 — THE VALUE KILL. The ember dies with the iron and the whole room drops away with it. */}
      {night > 0.01 && (
        <div style={{ position: "absolute", inset: 0, background: "#07030A", opacity: night * 0.55, zIndex: 30, pointerEvents: "none" }} />
      )}

      {/* B9 — THE ALARM. One rotating lamp, two opposed lobes, sweeping the whole back wall and floor
           for the rest of the shot. ⛔ the LIGHT rotates — the camera does not. */}
      {beacon > 0.01 && (
        <svg viewBox="0 0 1012 792" width={1012} height={792}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 32, pointerEvents: "none" }}>
          <defs>
            <radialGradient id="s2bLobe" gradientUnits="userSpaceOnUse" cx={BX} cy={BY} r={1350}>
              <stop offset="0" stopColor="#FF7A50" stopOpacity="0.52" />
              <stop offset="0.42" stopColor="#E0432E" stopOpacity="0.24" />
              <stop offset="1" stopColor="#E0432E" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g opacity={beacon}>
            <polygon points={wedge(bAng)} fill="url(#s2bLobe)" />
            <polygon points={wedge(bAng + 180)} fill="url(#s2bLobe)" opacity={0.8} />
            {/* the lamp itself, bracketed on the wall */}
            <rect x={BX - 8} y={BY - 26} width={16} height={26} fill="#241C1E" />
            <ellipse cx={BX} cy={BY} rx={BEACON / 2} ry={BEACON / 2.4} fill="#E0432E" opacity={0.55 + 0.45 * lampPulse}
              style={{ filter: `drop-shadow(0 0 ${16 + 26 * lampPulse}px rgba(224,67,46,0.95))` }} />
            <ellipse cx={BX} cy={BY - 4} rx={BEACON / 4} ry={BEACON / 6} fill="#FFD9C4" opacity={0.5 + 0.5 * lampPulse} />
            {/* the room answers the lamp — a crimson pulse over everything */}
            <rect x={0} y={0} width={1012} height={792} fill="#C02A20" opacity={0.05 + 0.07 * lampPulse} />
          </g>
        </svg>
      )}

      {/* the clay BLOCKED plate stamped on the iron */}
      {stampOp > 0.01 && (
        <div style={{
          position: "absolute", left: 790 - PLATE_W / 2, top: 352 - PLATE_H / 2, width: PLATE_W, height: PLATE_H,
          borderRadius: 10, background: CLAY, border: "4px solid #A9502F", zIndex: 34,
          transform: `scale(${stampSc}) rotate(-2deg)`, transformOrigin: "50% 50%", opacity: stampOp,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 14px 30px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,220,200,0.32)"
        }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 43, letterSpacing: 2, color: INK }}>BLOCKED</span>
        </div>
      )}

      <svg viewBox="0 0 1012 792" width={1012} height={792}
        style={{ position: "absolute", left: 0, top: 0, zIndex: 36, pointerEvents: "none" }}>
        <Vignette cx={0.44} cy={0.52} a={0.64} />
      </svg>

      {/* the trip flash — 5 frames, the only full-frame wash in the scene */}
      {hot > 0.02 && (
        <div style={{ position: "absolute", inset: 0, background: "#FFD3B4", opacity: hot * 0.2, zIndex: 44, pointerEvents: "none" }} />
      )}
    </>
  );
};

export const S2Trigger: React.FC<{ lf: number }> = ({ lf }) => (
  <>
    {lf < CUT ? <ShotA lf={lf} /> : <ShotB s={lf - CUT} />}
    <Hud />
    <CutFlash lf={lf} at={CUT} />
  </>
);
