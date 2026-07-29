import React from "react";
import { Actor, Room, Vignette, M, H, over, ramp, seed, CLAY, GOLD, mono, fraunces } from "./chassis";

/* =============================================================================
   REEL 77 "TESTED" — S4 · THE SWITCH        window 29.330–35.610 (188f @30fps)

   PLACE      the west fork of a night rail yard, at the point work.
   FLOOR      grey-blue granite BALLAST over dark cess; the near-left cess is
              unlit black stone (the hero stands on it and separates by value).
   BACK WALL  a brick RETAINING WALL broken by one tunnel portal (centred x640);
              pine treeline and two distant yard lamps behind it.
   KEY LIGHT  ONE sodium floodlight on a 4 m mast, HIGH-LEFT (x114, head y164),
              cowl aimed DOWN-RIGHT across the point work.  => every highlight
              sits on the LEFT face of an object, every cast shadow falls
              DOWN-RIGHT, and the near-LEFT corner stays out of the pool.
              The lamp is FAILING — it breathes, and the whole lit half of the
              yard breathes with it. That is continuous mover #2.
   CAMERA     LOCKED. one framing for all 188 frames. no push / pan / zoom / drift.
   DEPTH      6 planes, every one of them carrying CONTENT, not gradient:
              1 sky — town glow, stars, treeline, water tower, the two yard lamps
              2 wall — brick piers, patch plate, downpipe + rust, cable route, portal
              3 far yard — stabled wagon rake w/ tail lamp, level crossing (lamps
                alternating), signal box w/ a MAN in it, chimney smoke, stair, rota
              4 mid yard — SIGNAL GANTRY (lattice legs, walkway, overhead wire, TWO
                semaphores), key mast, spare rail, oil drums, sleeper stack, cable
                trough route, milepost, fouling-point marker, puddles, crane
              5 action — roads, blades, trolleys, beams, dust, sparks, buffer
              6 near cess — a black ballast berm with weeds that crops the bottom
                edge, a cropped stack of spare rail bottom-right, the boundary post

   ⛔ HIERARCHY. Everything added in planes 1-4 and 6 is TEXTURE: darker, flatter and
      lower-contrast than whatever is the event that second. The ambient movers are
      deliberately tiny — stars twinkling, the wire swaying 2px, the crossing lamps
      alternating, the signalman shifting, the chimney wisp, the tail lamp, the moth
      at the handlamp, the drip into its puddle, the flapping rota notice, the crane
      beacon idling, weeds in the draught. None of them is ever the largest mover.

   PERSISTENT RESULTS (the yard is materially different at f188 than at f0)
      f15  the right semaphore DROPS to clear and its lamp goes green — stays
      f15  the ground frame's repeater goes red -> green — stays
      f26  a spanner shaken off the stretcher lands in the four-foot — stays
      f100 the left corridor, its rail highlight and the left semaphore lamp die
      f130 the buffer is knocked 2.4deg out of true and ballast is thrown — stays
      f130 the crane beacon latches bright — stays

   ⛔ THE FIX THIS FILE EXISTS FOR — measured dead air (median 1.2, five frozen
      seconds). Diagnosis was "climb-then-freeze": correct beats, but short,
      small-area, and separated by held frames.  Three changes:

      A · TWO CONTINUOUS MOVERS, never stopping, escalating:
          1. STEAM boiling out of the tunnel portal — 9 lobed volumes, born
             staggered so frame 0 is already mid-flow, rising + expanding +
             drifting down-light. `steamK` ramps density and size three times.
          2. The FAILING SODIUM LAMP: `lamp` modulates the key cone, its halo,
             the ground pool and the ballast wash together, so a third of the
             panel is always changing value. ("modulate a large lit area.")
          Plus two attached to the hero action: a swinging HEADLAMP BEAM per
          wagon (M(3.2) long, its far end sweeping ~150px/s of ballast) and a
          rolling DUST WAKE off each set of wheels, both scaling with the wagon.
      B · THE RACE IS THE SCENE, not its last beat. The wagons creep out from
          f12, take a branch each at f54/f56 and are STILL travelling at
          f126/f142 — 3.0s of continuous big travel. They finish ~500px apart
          and ~4x bigger. D0 went 0.207 -> 0.28 so they are a large mover from
          the moment they leave the portal, not only at the end.
      C · EVERY dead second now owns a distinct large event (below), and the
          finale uses LINEAR ramps that are still accelerating at the cut.

   BEATS (sequential, one LARGE mover each, escalating)
     0  f0       complete: lamp live, steam flowing, both wagons idling INSIDE
                 the portal with their beams already sweeping the main road
     1  f2–17    the ground-frame LEVER (1.15 m) is hauled through 72deg, a hot
                 slug runs the rodding, f17 the BLADES SLAM
     2  f17–37   the slam throws a SHOCK RING across the whole yard and a bright
                 wake band runs the full length of the right road
     3  f28–51   the fork GHOSTS into eight roads across the lower half, snaps
                 back to exactly two
     4  f54–142  TWO IDENTICAL WAGONS run one branch each — the scene's spine
     5  f80–100  the yard commits: the right corridor takes a warm standby wash
     6  f96–128  the crane traverses its hook out to the kept road; the left
                 corridor loses its light (large-area darkening)
     7  f126–146 buffer impact + the dead-road BLACK WIPE travels the left road
     8  f138–188 hook down, work lamp to full, the gold stamp flares and throws
                 a ring, the crate rises 268px, and the emptied wagon rolls on
                 out of frame bottom-right — all still moving at the cut

   MEASURED (188f rendered, panel crop, mean |frame-delta| per second, bar 4.0)
     before  0.9  0.7  1.4  1.9  0.8  12.5   median 1.2
     after   4.5  6.3  5.4  4.5  4.5  4.6  4.3   median 4.55, min 4.26
     chaos (6x6, cells >8% share, cap 6): 2 2 2 2 2 2 6
   ============================================================================= */

/* ---- projection: depth is a function of screen y only, so ties stay horizontal.
   D0 was 0.207 — that made a wagon 59px wide at the portal, so the first two
   thirds of its run were too small to register at all. 0.28 compresses the far
   end just enough that the race is a LARGE mover from the moment it starts. */
const YF = 356, YN = 690, D0 = 0.28;
const dep = (y: number) => Math.max(0.13, D0 + ((y - YF) * (1 - D0)) / (YN - YF));
const HGA = (y: number) => (M(1.435) * dep(y)) / 2;        // half of the 1.435 m gauge

/* ---- roads. ex 0.55 spreads x fast off the crossing nose (so the two wagons
        stop being ONE silhouette within ~6 frames of the split) and still leaves
        a long even run to the ends. */
type Road = { x0: number; y0: number; x1: number; y1: number; ex: number };
const ROAD_MAIN: Road = { x0: 640, y0: 356, x1: 620, y1: 470, ex: 1 };
const ROAD_L: Road = { x0: 620, y0: 470, x1: 356, y1: 604, ex: 0.55 };
const ROAD_R: Road = { x0: 620, y0: 470, x1: 858, y1: 700, ex: 0.55 };
const at = (r: Road, u: number) => {
  const q = Math.max(0, u);
  return { x: r.x0 + (r.x1 - r.x0) * Math.pow(q, r.ex), y: r.y0 + (r.y1 - r.y0) * Math.pow(q, 1.15) };
};

/* ---- a polygon cut to a road: used for the corridor washes and for the
        travelling black wipe that kills the dead branch on beat 7 */
const bandPoly = (r: Road, u0: number, u1: number, pad: number, k = 1.25) => {
  const a: string[] = [], b: string[] = [];
  const N = 10;
  for (let i = 0; i <= N; i++) {
    const u = u0 + (u1 - u0) * (i / N);
    const p = at(r, u), d = dep(p.y), w = HGA(p.y) * k + pad * d;
    a.push(`${p.x + w},${p.y - 30 * d}`);
    b.unshift(`${p.x - w},${p.y + 34 * d}`);
  }
  return [...a, ...b].join(" ");
};
/* both corridors start clear of the crossing nose — the nose belongs to BOTH roads */
const CORR_L = bandPoly(ROAD_L, 0.1, 1, 12, 1.3);
const CORR_R = bandPoly(ROAD_R, 0.1, 1.5, 12, 1.3);

/* ---- sleepers: horizontal, because constant y == constant depth here */
const Ties: React.FC<{ r: Road; n: number; u0?: number; u1?: number; dim?: number }> =
({ r, n, u0 = 0, u1 = 1, dim = 0 }) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const p = at(r, u0 + (u1 - u0) * ((i + 0.5) / n));
    const d = dep(p.y), hw = HGA(p.y) * 1.14;
    const h = Math.max(2.6, M(0.24) * d);
    out.push(<rect key={"t" + i} x={p.x - hw} y={p.y - h / 2} width={hw * 2} height={h} fill="#1C150E" opacity={1 - dim * 0.7} />);
    out.push(<rect key={"s" + i} x={p.x - hw} y={p.y - h / 2} width={hw * 0.86} height={Math.max(1, h * 0.3)} fill="#4C3C2C" opacity={(1 - dim) * 0.85} />);
  }
  return <g>{out}</g>;
};

/* ---- rails: tapered quads + an optional travelling "live" highlight */
const Rails: React.FC<{ r: Road; u0?: number; u1?: number; hot?: (t: number) => number; base?: string }> =
({ r, u0 = 0, u1 = 1, hot, base = "#5B717C" }) => {
  const out: React.ReactNode[] = [];
  const N = 14;
  ([-1, 1] as const).forEach((s) => {
    for (let i = 0; i < N; i++) {
      const pa = at(r, u0 + (u1 - u0) * (i / N)), pb = at(r, u0 + (u1 - u0) * ((i + 1) / N));
      const xa = pa.x + s * HGA(pa.y), xb = pb.x + s * HGA(pb.y);
      const wa = Math.max(1.8, M(0.085) * dep(pa.y)), wb = Math.max(1.8, M(0.085) * dep(pb.y));
      out.push(<polygon key={`r${s}${i}`} points={`${xa - wa / 2},${pa.y} ${xa + wa / 2},${pa.y} ${xb + wb / 2},${pb.y} ${xb - wb / 2},${pb.y}`} fill={base} />);
      if (hot) {
        const o = hot((i + 0.5) / N);
        /* highlight on the LEFT face of the railhead — key light is high-left */
        if (o > 0.012) out.push(<polygon key={`h${s}${i}`} points={`${xa - wa * 0.75},${pa.y} ${xa + wa * 0.12},${pa.y} ${xb + wb * 0.12},${pb.y} ${xb - wb * 0.75},${pb.y}`} fill="#D7EBF3" opacity={o} />);
      }
    }
  });
  return <g>{out}</g>;
};

/* ---- the trolley: a narrow-bodied yard wagon. 1.44 m over sides, 1.16 m tall,
       wheels 0.52 m. Lit hard on its LEFT face so it separates from the ballast
       at every size — the old build was #2B3A42 on #122530 and read as a hole. */
const Trolley: React.FC<{ x: number; y: number; d: number; lamp: number; dim: number; roll: number }> =
({ x, y, d, lamp, dim, roll }) => {
  const g = (m: number) => M(m) * d;
  const b = 1 - dim * 0.74;                       // body lightness knocked out when the road dies
  const ink = (c: string) => (dim > 0.5 ? "#060E13" : c);
  return (
    <g transform={`rotate(${roll} ${x} ${y})`}>
      <ellipse cx={x + g(0.12)} cy={y + g(0.05)} rx={g(1.05)} ry={g(0.19)} fill="url(#s4shad)" opacity={0.88} />
      <circle cx={x - g(0.5)} cy={y - g(0.26)} r={g(0.26)} fill="#141C21" />
      <circle cx={x + g(0.5)} cy={y - g(0.26)} r={g(0.26)} fill="#141C21" />
      <circle cx={x - g(0.5)} cy={y - g(0.26)} r={g(0.11)} fill={ink("#5C7A88")} opacity={b} />
      <circle cx={x + g(0.5)} cy={y - g(0.26)} r={g(0.11)} fill={ink("#5C7A88")} opacity={b} />
      <rect x={x - g(0.76)} y={y - g(0.68)} width={g(1.52)} height={g(0.2)} fill={ink("#22333C")} />
      <rect x={x - g(0.76)} y={y - g(0.68)} width={g(1.52)} height={Math.max(1, g(0.05))} fill="#6E93A2" opacity={b} />
      <rect x={x - g(0.72)} y={y - g(1.16)} width={g(1.44)} height={g(0.48)} fill={ink("#31474F")} />
      <rect x={x - g(0.72)} y={y - g(1.16)} width={g(1.44)} height={Math.max(1, g(0.08))} fill="#9CC2CF" opacity={b} />
      <rect x={x - g(0.72)} y={y - g(1.16)} width={g(0.13)} height={g(0.48)} fill="#8FB6C5" opacity={b * 0.95} />
      <rect x={x - g(0.42)} y={y - g(1.0)} width={g(0.84)} height={Math.max(1, g(0.05))} fill="#141E24" opacity={b} />
      <circle cx={x - g(0.74)} cy={y - g(0.98)} r={g(0.13)} fill={lamp > 0.05 ? "#FFF0CE" : "#1A242A"} />
      {lamp > 0.05 && <circle cx={x - g(0.74)} cy={y - g(0.98)} r={g(0.46)} fill="url(#s4halo)" opacity={0.55 * lamp} />}
    </g>
  );
};

/* ---- the rolling ballast dust each wagon drags off its wheels: a continuous
       mover ATTACHED to the hero action, so it escalates for free as they grow */
const Wake: React.FC<{ lf: number; x: number; y: number; d: number; dx: number; dy: number; ph: number; k: number }> =
({ lf, x, y, d, dx, dy, ph, k }) => (
  <g>
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (((lf * 0.055 + i / 8 + ph) % 1) + 1) % 1;
      const op = 0.5 * Math.min(1, a * 5.5) * (1 - a) * k;
      if (op < 0.012) return null;
      const r = M(0.34) * d * (0.45 + a * 2.5);
      const px = x - dx * a * M(1.9) * d + (seed(i * 3.7 + ph) - 0.5) * 40 * d;
      const py = y - dy * a * M(1.9) * d - a * M(0.9) * d;
      return <circle key={i} cx={px} cy={py} r={r} fill="url(#s4dust)" opacity={op} />;
    })}
  </g>
);

/* ---- lattice steel. Two chords + zig bracing, ONE left-face highlight because the
       key is high-left. The gantry, the wire masts and the crane are all built of it,
       so the yard reads as one place made of one material. */
const Lattice: React.FC<{ x: number; y0: number; y1: number; w: number; n?: number }> = ({ x, y0, y1, w, n = 8 }) => {
  const zig: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = y0 + ((y1 - y0) * i) / n, b = y0 + ((y1 - y0) * (i + 1)) / n;
    zig.push(`M${x - w / 2} ${a} L${x + w / 2} ${b}`, `M${x + w / 2} ${a} L${x - w / 2} ${b}`);
  }
  return (
    <g>
      <path d={zig.join(" ")} stroke="#0E1F26" strokeWidth={Math.max(1.4, w * 0.15)} fill="none" />
      <rect x={x - w / 2 - 1.5} y={y0} width={3.5} height={y1 - y0} fill="#2E525D" />
      <rect x={x + w / 2 - 2} y={y0} width={3.5} height={y1 - y0} fill="#0E1F26" />
    </g>
  );
};

/* ---- the gantry girder: the same steel, lying down */
const Girder: React.FC<{ x0: number; x1: number; y: number; h: number; n?: number }> = ({ x0, x1, y, h, n = 18 }) => {
  const zig: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = x0 + ((x1 - x0) * i) / n, b = x0 + ((x1 - x0) * (i + 1)) / n;
    zig.push(`M${a} ${y} L${b} ${y + h}`, `M${a} ${y + h} L${b} ${y}`);
  }
  return (
    <g>
      <path d={zig.join(" ")} stroke="#0E1F26" strokeWidth={2} fill="none" />
      <rect x={x0} y={y - 4} width={x1 - x0} height={5} fill="#33565F" />
      <rect x={x0} y={y + h} width={x1 - x0} height={5} fill="#0C1C22" />
    </g>
  );
};

/* ---- a SEMAPHORE on the gantry. Horizontal = danger. It DROPS 46deg on the lever
       throw and STAYS down for the rest of the scene — a persistent result you can
       read at a glance, high in frame, where the eye lands after the blades slam. */
const Semaphore: React.FC<{ x: number; y: number; s: number; drop: number; live?: number }> =
({ x, y, s, drop, live = 1 }) => {
  const L = M(1.0) * s, T = M(0.26) * s;
  return (
    <g>
      <rect x={x - 3} y={y - M(1.9) * s} width={6} height={M(1.9) * s} fill="#122630" />
      <rect x={x - 3} y={y - M(1.9) * s} width={2.2} height={M(1.9) * s} fill="#2E525D" />
      <rect x={x - 9} y={y - M(0.34) * s} width={18} height={7} rx={2} fill="#0E2028" />
      <g transform={`rotate(${drop * 46} ${x} ${y})`}>
        <rect x={x - L} y={y - T / 2} width={L} height={T} fill={drop > 0.5 ? "#2F7A56" : "#A83A2B"} opacity={0.35 + live * 0.65} />
        <rect x={x - L * 0.8} y={y - T / 2} width={L * 0.17} height={T} fill="#E4DDCD" opacity={(0.35 + live * 0.65) * 0.9} />
        <rect x={x - L} y={y - T / 2} width={L} height={2} fill="#D8CFBB" opacity={0.3 * live} />
      </g>
      <circle cx={x - L * 0.2} cy={y + T * 1.6} r={T * 0.46} fill={drop > 0.5 ? "#8FE9B4" : "#FF7A62"} opacity={0.25 + live * 0.75} />
    </g>
  );
};

/* ---- a puddle. It mirrors whatever lamp is above it, and it RINGS when something
       lands in it — the cheapest way to make dead ground feel like wet ground. */
const Puddle: React.FC<{ x: number; y: number; rx: number; tint: string; op: number; ring?: number }> =
({ x, y, rx, tint, op, ring = -1 }) => (
  <g>
    <ellipse cx={x} cy={y} rx={rx} ry={rx * 0.3} fill="#071319" opacity={0.62} />
    <ellipse cx={x} cy={y} rx={rx * 0.9} ry={rx * 0.25} fill={tint} opacity={op} />
    <ellipse cx={x} cy={y} rx={rx * 0.9} ry={rx * 0.25} fill="none" stroke="#5E8894" strokeWidth={1.6} opacity={op * 0.9} />
    <ellipse cx={x - rx * 0.26} cy={y - rx * 0.06} rx={rx * 0.38} ry={rx * 0.085} fill="#E4F2F6" opacity={op * 0.95} />
    {ring >= 0 && ring < 1 && (
      <ellipse cx={x} cy={y} rx={rx * (0.14 + ring * 0.86)} ry={rx * (0.04 + ring * 0.26)} fill="none"
               stroke="#BFE0EA" strokeWidth={1.6} opacity={(1 - ring) * 0.5} />
    )}
  </g>
);

const HERO = Math.round(H * 0.945);                 // 312 — inside the 300–360 band
const HX = 146, HGY = 772;                          // near-left cess, clear of the point work
const LVX = 410, LVY = 762;                         // ground frame, at his right hand
const LVL = Math.round(M(1.15) * dep(LVY));         // 254 — a 1.15 m hand lever, a real arc
/* the point rodding: it leaves his ground frame and lands on the switch stretcher,
   threading the wedge BETWEEN the two roads so it never crosses either one */
const ROD_A = { x: 436, y: 756 }, ROD_B = { x: 604, y: 524 };

export const S4Fork: React.FC<{ lf: number }> = ({ lf }) => {
  /* ============================ BEAT CLOCKS ============================ */
  const thr = over(lf, 2, 15);                        // 1 · lever hauled over
  const rod = over(lf, 5, 11);                        // 1 · impulse runs the rodding
  const slam = Math.max(0, 1 - Math.abs(lf - 17) / 9);// 1 · the blades land
  const wakeU = over(lf, 17, 20);                     // 2 · bright band runs the right road
  const ring = over(lf, 17, 15);                      // 2 · shock ring off the slam
  const fanA = Math.max(0, over(lf, 28, 14) - over(lf, 45, 6));  // 3 · the many-roads ghost
  /* 4 · the two trolleys. m = the shared road (-1 deep in the portal, 0 at the
        mouth, 1 at the crossing nose); t = the branch. They creep out from f22,
        clear the mouth ~f42, take a branch each within 2 frames of one another,
        and are STILL travelling at f130 / f146 — 3.4s of continuous big travel. */
  const mL = ramp(lf, 12, 54) * 2 - 1;
  const mR = ramp(lf, 16, 56) * 2 - 1;
  const tL = Math.pow(ramp(lf, 54, 126), 1.22);
  /* the kept wagon is RELIEVED of its load and rolls on out of frame bottom-right
     — the single biggest mover in the last second, and the story's "keep going". */
  const roll2 = ramp(lf, 162, 196);
  const tR = Math.pow(ramp(lf, 56, 142), 1.22) + roll2 * 0.45;
  const standby = over(lf, 80, 20);                   // 5 · the yard commits to the right road
  const fade = over(lf, 100, 22);                     // 6 · the left corridor loses its light
  const wipe = over(lf, 126, 20);                     // 7 · the black wipe travels the dead road
  const won = over(lf, 130, 18);                      // 8 · the kept road gains the work lamp
  const hookD = over(lf, 138, 15);                    // 8 · hook comes down
  const flare = over(lf, 150, 12);                    // 8 · the work lamp goes to full
  const gold = over(lf, 150, 13);                     // 8 · the stamp flares
  const lift = ramp(lf, 154, 192);                    // 8 · cargo lifted clear (still rising at the cut)

  /* damped recoil of the buffer beam + the trolley that ran onto it */
  const dt = lf - 126;
  const rec = dt >= 0 ? Math.exp(-dt / 6.5) * Math.sin(dt / 2.1) * 15 : 0;

  /* ===== CONTINUOUS MOVER 2 — the failing sodium lamp. One value, wired to the
     cone, the halo, the ground pool AND the ballast wash, so a third of the panel
     is never the same two frames running. Escalates late as the yard powers up. */
  const lamp = 0.72 + 0.18 * Math.sin(lf / 4.6) + 0.09 * Math.sin(lf / 2.3 + 1.1) + won * 0.14;
  const steamK = 1 + over(lf, 30, 40) * 0.5 + over(lf, 96, 44) * 0.3 + over(lf, 150, 38) * 0.25;

  /* lever: rest -42deg (grip lands in his hand) -> +30deg (shoved through) */
  const lvA = ((-42 + thr * 72) * Math.PI) / 180;
  const blade = -26 + thr * 26;                       // blades hard-left -> the fork is open

  /* trolley path: staged in the mouth, out along the shared road, then a branch each */
  const posOf = (m: number, t: number, side: -1 | 1) => {
    if (t > 0) return at(side < 0 ? ROAD_L : ROAD_R, t * (side < 0 ? 0.86 : 1));
    if (m < 0) {                                     // staged INSIDE the mouth, abreast
      const k = -m * (0.94 + 0.06 * Math.sin(lf / 9 + (side > 0 ? 2 : 0)));
      return { x: 640 + side * 34 * k, y: 356 - k * 58 };
    }
    return { x: 640 - 20 * m, y: 356 + 114 * Math.pow(m, 1.15) };
  };
  const dirOf = (m: number, t: number, side: -1 | 1) => {
    const a = posOf(m, t, side);
    const b = t > 0 ? posOf(m, t + 0.05, side) : posOf(Math.min(1, m + 0.14), 0, side);
    const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return { x: (b.x - a.x) / L, y: (b.y - a.y) / L };
  };
  const TL = posOf(mL, tL, -1), TR = posOf(mR, tR, 1);
  const DL = dirOf(mL, tL, -1), DR = dirOf(mR, tR, 1);
  const dL = dep(TL.y), dR = dep(TR.y);
  const deadT = wipe > 0.45;
  const runL = tL > 0 && tL < 1, runR = tR > 0 && tR < 1.44;

  /* ===== the swinging HEADLAMP BEAM — the largest continuously moving bright
     area in the scene. It rides the wagon, swings on the jointed track, and its
     far end sweeps ~150px of ballast every second. */
  const beam = (x: number, y: number, d: number, dx: number, dy: number, ph: number, op: number) => {
    const sw = Math.sin(lf / 5.4 + ph) * 0.125 + Math.sin(lf / 2.6 + ph * 2) * 0.062;
    const c = Math.cos(sw), s = Math.sin(sw);
    const ux = dx * c - dy * s, uy = dx * s + dy * c;
    const px = -uy, py = ux;
    const L = M(3.2) * d, W0 = M(0.4) * d, W1 = M(2.15) * d;
    const ex = x + ux * L, ey = y + uy * L;
    const quad = (w0: number, w1: number) =>
      `${x + px * w0},${y + py * w0} ${x - px * w0},${y - py * w0} ${ex - px * w1},${ey - py * w1} ${ex + px * w1},${ey + py * w1}`;
    return (
      <g opacity={op}>
        <polygon points={quad(W0, W1)} fill="#FFD9A0" opacity={0.17} />
        <polygon points={quad(W0 * 0.55, W1 * 0.5)} fill="#FFE9C4" opacity={0.25} />
        <ellipse cx={ex} cy={ey} rx={W1 * 1.1} ry={W1 * 0.42} fill="url(#s4pool)" opacity={0.68} />
      </g>
    );
  };

  /* ---- SPARKS off the railhead at the wheel contact, and the SPEED STREAKS the
     wheels drag over the sleepers. Both are welded to the hero action, both are
     tiny, so they escalate with the race without ever competing with it. */
  const sparks = (x: number, y: number, d: number, ph: number, k: number) => {
    const c = (lf + ph) % 13;
    if (c > 5 || k < 0.05) return null;
    const t = c / 5, gen = Math.floor((lf + ph) / 13);
    return (
      <g opacity={(1 - t) * 0.85 * k}>
        {Array.from({ length: 5 }).map((_, i) => {
          const s1 = seed(i * 5.7 + gen * 3.3), s2 = seed(i * 2.9 + gen * 1.7 + 4);
          return <circle key={i} cx={x + (s1 - 0.32) * 78 * t * d} cy={y + (-24 - s2 * 34) * t * d + 96 * t * t * d}
                         r={Math.max(0.8, (2.1 - t * 1.3) * d)} fill={s2 > 0.5 ? "#FFF3D2" : "#FFC26B"} />;
        })}
      </g>
    );
  };
  const streaks = (x: number, y: number, d: number, dx: number, dy: number, k: number) => (
    <g opacity={0.17 * k}>
      {[0.4, 0.68, 1].map((s, i) => {
        const L = M(2.6) * d * s, off = (i - 1) * M(0.46) * d, px = -dy, py = dx;
        return <polygon key={i} points={`${x + px * off},${y + py * off} ${x + px * off - dx * L},${y + py * off - dy * L - 2.4} ${x + px * off - dx * L},${y + py * off - dy * L + 2.4}`} fill="#BFE2EE" />;
      })}
    </g>
  );

  /* the kept cargo: a 1.0 x 0.9 m crate riding the right trolley, hoisted on beat 8 */
  const park = at(ROAD_R, 1), parked = lift > 0.001;
  const crD = parked ? dep(park.y) : dR;
  const crW = M(0.5) * crD, crH = M(0.9) * crD;
  const crX = parked ? park.x : TR.x;
  const crTop = (parked ? park.y : TR.y) - M(0.66) * crD - crH - lift * 300;   // 268px of travel by the cut
  const hookY = Math.max(62, 96 + hookD * 272 - lift * 300);

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <radialGradient id="s4shad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.72" /><stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s4bal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E353D" /><stop offset="0.55" stopColor="#122530" /><stop offset="1" stopColor="#07131A" />
          </linearGradient>
          <linearGradient id="s4cone" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#F6CB86" stopOpacity="0.34" /><stop offset="0.6" stopColor="#EDB367" stopOpacity="0.11" /><stop offset="1" stopColor="#EDB367" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s4work" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD68F" stopOpacity="0.42" /><stop offset="1" stopColor="#FFB25A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s4wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#233C42" /><stop offset="1" stopColor="#132228" />
          </linearGradient>
          <radialGradient id="s4mouth" cx="0.5" cy="0.86" r="0.75">
            <stop offset="0" stopColor="#123039" /><stop offset="1" stopColor="#03090C" />
          </radialGradient>
          <linearGradient id="s4win" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFDFA0" /><stop offset="1" stopColor="#E0A24E" />
          </linearGradient>
          <radialGradient id="s4halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFD48F" stopOpacity="0.5" /><stop offset="1" stopColor="#FFD48F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s4pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFDCA4" stopOpacity="0.62" /><stop offset="0.6" stopColor="#E8A855" stopOpacity="0.2" /><stop offset="1" stopColor="#E8A855" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s4dark" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#01070A" stopOpacity="0.88" /><stop offset="0.62" stopColor="#01070A" stopOpacity="0.64" /><stop offset="1" stopColor="#01070A" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s4crate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7C6440" /><stop offset="1" stopColor="#3F3320" />
          </linearGradient>
          {/* the steam volume — lit top-left by the sodium key, dark and heavy right.
              A DRAWN form with a falling edge, not a low-opacity haze plate. */}
          <radialGradient id="s4steam" cx="0.34" cy="0.3" r="0.72">
            <stop offset="0" stopColor="#CFE0E6" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#67899A" stopOpacity="0.6" />
            <stop offset="1" stopColor="#152C36" stopOpacity="0" />
          </radialGradient>
          {/* rust bleeding out of every bolt hole and drain in the place */}
          <linearGradient id="s4rust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8A4A22" stopOpacity="0.5" /><stop offset="1" stopColor="#8A4A22" stopOpacity="0" />
          </linearGradient>
          {/* the town's sodium glow, sitting on the treeline */}
          <linearGradient id="s4sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0A2029" stopOpacity="0" /><stop offset="1" stopColor="#2E6068" stopOpacity="0.42" />
          </linearGradient>
          <radialGradient id="s4dust" cx="0.36" cy="0.32" r="0.7">
            <stop offset="0" stopColor="#C7D6DC" stopOpacity="0.9" />
            <stop offset="0.55" stopColor="#6B8794" stopOpacity="0.5" />
            <stop offset="1" stopColor="#16292F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---------- PLANE 1 · sky + ballast shell (teal night) ---------- */}
        <Room wall1="#1D4C58" wall2="#0A1D25" floor1="#1A2F37" floor2="#08131A" floorY={356} />

        {/* ---------- PLANE 0 · SKY. The town's sodium glow sits on the treeline and a
             field of stars only just twinkles. Nothing here is ever the event. ---------- */}
        <rect x={0} y={90} width={1012} height={178} fill="url(#s4sky)" />
        {Array.from({ length: 30 }).map((_, i) => {
          const s1 = seed(i * 1.7 + 2), s2 = seed(i * 4.3 + 8);
          return <circle key={"star" + i} cx={s1 * 1012} cy={12 + s2 * 186} r={0.9 + s2 * 1.2} fill="#D6E9F0"
                         opacity={(0.2 + s2 * 0.28) * (0.7 + 0.3 * Math.sin(lf / (6 + s1 * 11) + i))} />;
        })}

        {/* pine treeline behind the wall */}
        <polygon fill="#0A1E24" points={
          "0,262 34,208 62,240 96,190 128,236 158,206 196,246 224,214 262,250 300,200 336,244 372,212 410,248 452,196 492,242 528,214 566,250 606,204 646,244 686,214 726,250 764,202 806,244 846,216 884,250 922,206 962,242 1012,214 1012,300 0,300"
        } />
        {/* ---------- the yard's WATER TOWER, out beyond the wall (12 m read at far
             depth 0.0435 => 98 px). Its overflow joint has never been fixed and it
             drips, once every 1.5 s, all scene. ---------- */}
        {(() => {
          const WD = 0.0435, w = (m: number) => M(m) * WD;
          const cx = 238, base = 252, tankH = w(4), tankW = w(6);
          const legTop = base - w(5.6), tankTop = legTop - tankH;
          const dr = (lf % 46) / 46;
          return (
            <g>
              {[-1, -0.36, 0.36, 1].map((k, i) => (
                <rect key={"wl" + i} x={cx + k * tankW * 0.44 - 1.4} y={legTop} width={2.8} height={base - legTop}
                      fill={k < 0 ? "#173540" : "#0C2028"} />
              ))}
              <path d={`M${cx - tankW * 0.44} ${legTop + 4} L${cx + tankW * 0.44} ${base - 6} M${cx + tankW * 0.44} ${legTop + 4} L${cx - tankW * 0.44} ${base - 6}`}
                    stroke="#0C2028" strokeWidth={1.8} />
              <rect x={cx - tankW / 2} y={tankTop} width={tankW} height={tankH} fill="#16333C" />
              <rect x={cx - tankW / 2} y={tankTop} width={tankW * 0.2} height={tankH} fill="#28525D" />
              <rect x={cx - tankW / 2} y={tankTop + tankH * 0.44} width={tankW} height={1.8} fill="#0A1C22" />
              <polygon points={`${cx - tankW * 0.6},${tankTop} ${cx + tankW * 0.6},${tankTop} ${cx},${tankTop - w(1.8)}`} fill="#0F2830" />
              <polygon points={`${cx - tankW * 0.6},${tankTop} ${cx},${tankTop - w(1.8)} ${cx},${tankTop}`} fill="#1E4450" />
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={"wr" + i} x={cx + tankW * 0.52} y={base - 10 - i * 12} width={9} height={1.6} fill="#193A44" />
              ))}
              <rect x={cx + tankW * 0.5} y={tankTop + 5} width={1.8} height={base - tankTop - 5} fill="#0A1C22" />
              <circle cx={cx + tankW * 0.5 + 1} cy={base - 8 + dr * 8} r={1.5} fill="#9CC6D4" opacity={0.5 * (1 - dr * 0.5)} />
            </g>
          );
        })()}

        {[268, 878].map((x, i) => (
          <g key={"yl" + i}>
            <rect x={x - 3} y={196} width={6} height={70} fill="#0C2028" />
            <rect x={x - 13} y={190} width={26} height={8} rx={3} fill="#132C34" />
            <circle cx={x} cy={198} r={5} fill="#FFDDA0" />
            <circle cx={x} cy={198} r={30} fill="url(#s4halo)" opacity={0.4 + 0.28 * lamp} />
          </g>
        ))}

        {/* ---------- PLANE 2 · brick retaining wall + the tunnel portal (x640) ---------- */}
        <rect x={0} y={248} width={1012} height={110} fill="url(#s4wall)" />
        <rect x={0} y={248} width={1012} height={7} fill="#33525A" />
        {Array.from({ length: 34 }).map((_, i) => (
          <rect key={"bk" + i} x={i * 30 + (i % 2) * 8} y={262 + (i % 3) * 26} width={26} height={5} fill="#0D1A20" opacity={0.55} />
        ))}
        {/* wall WEAR — this wall has been here a hundred years: brick piers, a bolted
            patch plate over a hole, a downpipe that has stained the brick orange, and
            the cable route that feeds the point work, hung on its brackets. */}
        {[54, 292, 906].map((x, i) => (
          <g key={"pier" + i}>
            <rect x={x} y={244} width={30} height={114} fill="#1A2F36" />
            <rect x={x} y={244} width={7} height={114} fill="#2C4A52" />
            <rect x={x} y={244} width={30} height={6} fill="#3A5F68" />
          </g>
        ))}
        <rect x={824} y={278} width={62} height={44} fill="#1E353C" />
        <rect x={824} y={278} width={62} height={4} fill="#38606B" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={"bolt" + i} cx={830 + (i % 2) * 50} cy={284 + Math.floor(i / 2) * 32} r={2.2} fill="#4C6E78" />
        ))}
        <polygon points="826,322 886,322 892,358 820,358" fill="url(#s4rust)" />
        <rect x={438} y={250} width={9} height={108} fill="#0E2028" />
        <rect x={438} y={250} width={3} height={108} fill="#2A4A54" />
        <polygon points="430,318 456,318 464,358 424,358" fill="url(#s4rust)" />
        {[68, 168, 268, 368, 812, 912].map((x, i) => <rect key={"cbk" + i} x={x} y={316} width={6} height={15} fill="#16292F" />)}
        <path d="M0 320 Q118 334 168 322 Q268 336 368 324 Q430 332 470 326" fill="none" stroke="#101F25" strokeWidth={4} />
        <path d="M0 316 Q118 330 168 318 Q268 332 368 320 Q430 328 470 322" fill="none" stroke="#27444C" strokeWidth={2.2} opacity={0.75} />
        <path d="M790 326 Q862 338 912 324 Q968 332 1012 326" fill="none" stroke="#101F25" strokeWidth={4} />
        <path d="M790 322 Q862 334 912 320 Q968 328 1012 322" fill="none" stroke="#27444C" strokeWidth={2.2} opacity={0.75} />

        <rect x={512} y={214} width={256} height={144} fill="#1B333A" />
        <rect x={512} y={214} width={256} height={9} fill="#395A63" />
        <rect x={530} y={186} width={220} height={32} fill="#162C33" />
        <rect x={530} y={186} width={220} height={7} fill="#31525B" />
        <path d="M558 358 L558 250 Q640 176 722 250 L722 358 Z" fill="url(#s4mouth)" />
        <path d="M558 250 Q640 176 722 250" fill="none" stroke="#40636D" strokeWidth={7} />
        <path d="M564 358 L564 254 Q640 188 716 254 L716 358 Z" fill="none" stroke="#0A171C" strokeWidth={4} opacity={0.8} />
        {/* keystone + the wet streak it has been bleeding down the arch for years */}
        <polygon points="627,178 653,178 658,206 622,206" fill="#3B5F69" />
        <polygon points="627,178 653,178 652,185 628,185" fill="#5A868F" />
        <polygon points="566,262 584,258 590,358 562,358" fill="#0B1A20" opacity={0.62} />
        {(() => {                                   /* the drip. It falls, it lands, the puddle rings. */
          const a = (lf % 38) / 38;
          return a < 0.86
            ? <circle cx={575} cy={264 + a * 116} r={2} fill="#A8CEDA" opacity={0.5 * (1 - a * 0.4)} />
            : null;
        })()}
        {/* the road continues into the mouth so the trolleys arrive from somewhere */}
        {[300, 322, 344].map((y) => (
          <rect key={"tt" + y} x={640 - HGA(y) * 1.2} y={y} width={HGA(y) * 2.4} height={2.6} fill="#101A20" />
        ))}

        {/* ===== CONTINUOUS MOVER 1 · STEAM out of the portal mouth =====
            12 volumes on staggered lives, so frame 0 is already mid-flow. Each is
            born at the mouth, rises ~300px, expands ~4x and drifts down-light.
            Never stops; density and scale ramp with `steamK`. */}
        {Array.from({ length: 9 }).map((_, i) => {
          const s1 = seed(i * 3.1 + 1), s2 = seed(i * 7.9 + 5), s3 = seed(i * 2.3 + 9);
          const life = 48 + s1 * 26;
          const a = ((((lf + s2 * life * 3) % life) + life) % life) / life;
          const op = (0.3 + s2 * 0.13) * Math.min(1, a * 4.5) * (1 - a) * Math.min(1.3, steamK);
          if (op < 0.012) return null;
          const r = M(0.32) * (0.5 + s3 * 0.7) * (0.5 + a * 1.85) * Math.min(1.25, steamK);
          const x = 622 + (s1 - 0.5) * 120 + a * (150 + s2 * 170);
          const y = 340 - a * (200 + s3 * 86);
          return (
            <g key={"sm" + i}>
              <circle cx={x} cy={y} r={r} fill="url(#s4steam)" opacity={op} />
              <circle cx={x - r * 0.5} cy={y + r * 0.34} r={r * 0.6} fill="url(#s4steam)" opacity={op * 0.85} />
              {/* the sodium key catches the upper-left cap — gives the volume an edge */}
              <circle cx={x - r * 0.34} cy={y - r * 0.3} r={r * 0.34} fill="#E7EEF0" opacity={op * 0.5} />
            </g>
          );
        })}

        {/* ---------- PLANE 3 · signal box, key-light mast, ballast ----------
             The box is MANNED: a silhouette works his frame behind the glass, the
             stove is lit and smoking, and there is a rota board by the door. */}
        <g>
          {/* the stove chimney + its wisp — the smallest continuous mover in frame */}
          <rect x={148} y={214} width={15} height={32} fill="#14282F" />
          <rect x={148} y={214} width={4.5} height={32} fill="#2C4A52" />
          <rect x={144} y={209} width={23} height={7} rx={2} fill="#1B343C" />
          {Array.from({ length: 4 }).map((_, i) => {
            const a = ((lf + i * 22) % 88) / 88;
            return <circle key={"ch" + i} cx={156 + a * 44 + Math.sin(a * 5 + i) * 7} cy={206 - a * 70} r={4 + a * 15}
                           fill="url(#s4steam)" opacity={0.2 * (1 - a) * Math.min(1, a * 6)} />;
          })}
          <rect x={18} y={266} width={168} height={164} fill="#17303A" />
          <rect x={18} y={266} width={168} height={8} fill="#2E525C" />
          <polygon points="6,268 198,268 186,240 30,240" fill="#102730" />
          <polygon points="6,268 198,268 198,278 6,278" fill="#0A1D25" />
          <polygon points="24,300 35,300 40,356 20,356" fill="url(#s4rust)" opacity={0.8} />
          <rect x={44} y={300} width={78} height={54} fill="url(#s4win)" opacity={0.8 + 0.14 * lamp} />
          {/* the man at his frame. Silhouette only — he shifts, and he leans in hard
              at the instant the blades land. Never a sprite, never the subject. */}
          {(() => {
            const lean = Math.sin(lf / 17) * 2.4 + slam * 6;
            return (
              <g transform={`translate(${lean} 0)`}>
                <ellipse cx={64} cy={317} rx={8.5} ry={9.5} fill="#0A1A20" />
                <path d="M50 354 q14 -28 28 0 z" fill="#0A1A20" />
              </g>
            );
          })()}
          {[96, 103, 110, 117].map((x, i) => (
            <rect key={"lvr" + i} x={x} y={316 + (i === 1 && thr > 0.5 ? 7 : 0)} width={3} height={36} fill="#4A3A1C" opacity={0.85} />
          ))}
          <rect x={80} y={300} width={5} height={54} fill="#5C4522" />
          <rect x={44} y={324} width={78} height={4} fill="#5C4522" />
          <rect x={140} y={334} width={34} height={96} fill="#0D2029" />
          <rect x={140} y={334} width={5} height={96} fill="#2B4C56" />
          {/* door lamp */}
          <rect x={152} y={322} width={12} height={6} rx={2} fill="#FFDFA0" opacity={0.85} />
          <circle cx={158} cy={326} r={24} fill="url(#s4halo)" opacity={0.35 + 0.2 * lamp} />
          {/* rota board, redacted — and one corner of paper that never stops flapping */}
          <rect x={26} y={366} width={48} height={34} fill="#12262C" />
          <rect x={26} y={366} width={48} height={4} fill="#2B4A54" />
          {[0, 1, 2].map((i) => <rect key={"nb" + i} x={31} y={375 + i * 8} width={37 - i * 9} height={3.2} fill="#5E7681" opacity={0.62} />)}
          {(() => { const fl = Math.sin(lf / 6.5) * 2.6; return (
            <polygon points={`70,374 79,${372 + fl} 79,${384 + fl} 70,386`} fill="#8FA3AC" opacity={0.45} />); })()}
          {/* the outside stair down to the cess */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={"stp" + i} x={178 + i * 11} y={392 + i * 11} width={14} height={4.5} fill="#16303A" />
          ))}
          <path d="M178 384 L246 452" stroke="#2A4C56" strokeWidth={3} fill="none" />
          <path d="M178 400 L246 466" stroke="#0E2028" strokeWidth={3} fill="none" />
        </g>

        {/* ballast wash + stones — the wash breathes with the lamp, so the WHOLE
            floor of the yard is a continuously modulating value, not a flat plate */}
        <rect x={0} y={356} width={1012} height={436} fill="url(#s4bal)" opacity={0.44 + 0.24 * lamp} />
        {Array.from({ length: 96 }).map((_, i) => {
          const s1 = seed(i * 2.7 + 1), s2 = seed(i * 5.3 + 4);
          const y = 366 + s2 * 420, x = s1 * 1012;
          const d = dep(y);
          const r = Math.max(1.1, M(0.035) * d * (0.6 + s1));
          const nearLeft = x < 340 && y > 640;                     // ⛔ hero's ground stays black
          return <circle key={"st" + i} cx={x} cy={y} r={r} fill={s2 > 0.55 ? "#2C4650" : "#101F27"} opacity={nearLeft ? 0.1 : 0.55} />;
        })}

        {/* ================= PLANE 3b · THE WORKING YARD =================
             Everything a night yard has lying about. All of it is DARKER and flatter
             than the point work, none of it is ever the event: it exists so the eye
             has somewhere to go on the second watch. One key, high-left, obeyed. */}

        {/* a rake of wagons stabled on the far siding — the yard is not empty tonight.
            1.44 m over sides at the wall's depth (0.30). One tail lamp still blinks. */}
        {(() => {
          const d = 0.3, g = (m: number) => M(m) * d, base = 380;
          const on = Math.floor(lf / 17) % 2 === 0;
          return (
            <g>
              <rect x={766} y={base} width={250} height={3} fill="#0C1C22" />
              {[0, 1, 2].map((i) => {
                const x = 806 + i * 74;
                return (
                  <g key={"wg" + i}>
                    <rect x={x - g(0.72)} y={base - g(1.16)} width={g(1.44)} height={g(0.9)} fill="#12262D" />
                    <rect x={x - g(0.72)} y={base - g(1.16)} width={g(1.44)} height={3} fill="#2C4E58" />
                    <rect x={x - g(0.72)} y={base - g(1.16)} width={4} height={g(0.9)} fill="#2C4E58" />
                    <rect x={x - g(0.76)} y={base - g(0.28)} width={g(1.52)} height={5} fill="#0A181E" />
                    <circle cx={x - g(0.45)} cy={base - g(0.15)} r={g(0.25)} fill="#0A181E" />
                    <circle cx={x + g(0.45)} cy={base - g(0.15)} r={g(0.25)} fill="#0A181E" />
                  </g>
                );
              })}
              <circle cx={806 - g(0.8)} cy={base - g(0.66)} r={3.2} fill="#FF6A54" opacity={on ? 0.8 : 0.2} />
              {/* the yard's LEVEL CROSSING: barrier down, its two lamps alternating all
                  scene. Cropped by the frame edge — the yard goes on past us. */}
              <rect x={904} y={398} width={7} height={34} fill="#12262E" />
              <rect x={904} y={398} width={2.4} height={34} fill="#2E525D" />
              <rect x={908} y={402} width={104} height={7} fill="#0E2028" />
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={"lcb" + i} x={912 + i * 20} y={402} width={9} height={7} fill={i % 2 ? "#B9AE9A" : "#A8402F"} opacity={0.85} />
              ))}
              <circle cx={897} cy={390} r={3.6} fill="#FF6A54" opacity={on ? 0.85 : 0.14} />
              <circle cx={912} cy={390} r={3.6} fill="#FF6A54" opacity={on ? 0.14 : 0.85} />
              <ellipse cx={908} cy={434} rx={16} ry={5} fill="url(#s4shad)" opacity={0.7} />
            </g>
          );
        })()}

        {/* ---------- the SIGNAL GANTRY: lattice legs either side of the yard, a walkway
             girder over the whole point work, the overhead wire strung off it, and TWO
             semaphore arms. The right one DROPS when he throws the lever and stays down;
             the left one holds at danger and loses its lamp when that road dies. ---------- */}
        {(() => {
          const LX = 336, RX = 812, TOP = 196, GH = 22;
          const sem = over(lf, 15, 7);
          const sw = Math.sin(lf / 21) * 2.0;                 // the wire never quite stops moving
          return (
            <g>
              <path d={`M0 ${190 + sw * 0.4} Q170 ${228 + sw} ${LX} ${208}`} fill="none" stroke="#0D1E25" strokeWidth={2.6} />
              <path d={`M${LX} 208 Q574 ${262 + sw * 2.4} ${RX} 212`} fill="none" stroke="#0D1E25" strokeWidth={2.6} />
              <path d={`M${RX} 212 Q912 ${230 + sw} 1012 ${192 + sw * 0.4}`} fill="none" stroke="#0D1E25" strokeWidth={2.6} />
              <path d={`M${LX} 200 Q574 ${240 + sw * 1.8} ${RX} 204`} fill="none" stroke="#1E3B44" strokeWidth={1.6} opacity={0.8} />
              {[430, 520, 640, 730].map((x, i) => (
                <rect key={"dp" + i} x={x} y={214 + i * 2} width={1.6} height={20} fill="#1A343C" opacity={0.7} />
              ))}
              <Lattice x={LX} y0={TOP} y1={370} w={21} n={9} />
              <Lattice x={RX} y0={TOP} y1={374} w={21} n={9} />
              <rect x={LX - 26} y={364} width={52} height={10} rx={3} fill="#0A1A20" />
              <rect x={RX - 26} y={368} width={52} height={10} rx={3} fill="#0A1A20" />
              <polygon points={`${LX - 24},344 ${LX + 24},344 ${LX + 18},352 ${LX - 18},352`} fill="url(#s4rust)" opacity={0.7} />
              <Girder x0={LX} x1={RX} y={TOP} h={GH} />
              <rect x={LX} y={TOP - 17} width={RX - LX} height={3} fill="#294A54" />
              {Array.from({ length: 15 }).map((_, i) => (
                <rect key={"hr" + i} x={LX + (i * (RX - LX)) / 15} y={TOP - 17} width={2.2} height={17} fill="#16323A" />
              ))}
              {/* the walkway maintenance lamp — a practical, and it flickers with the yard */}
              <rect x={392} y={218} width={16} height={7} rx={3} fill="#FFE6AE" opacity={0.5 + 0.24 * lamp} />
              <circle cx={400} cy={222} r={26} fill="url(#s4halo)" opacity={0.3 * lamp} />
              <Semaphore x={566} y={262} s={0.3} drop={0} live={1 - fade * 0.86} />
              <Semaphore x={700} y={262} s={0.3} drop={sem} live={1} />
            </g>
          );
        })()}

        {/* ---------- the p-way gang's kit, left to right across the ballast:
             spare RAIL on chocks · three OIL DRUMS · a stack of SLEEPERS on end ·
             the concrete CABLE TROUGH route out to the cess · a milepost ---------- */}
        {(() => {
          const d1 = dep(438), a = (m: number) => M(m) * d1;
          const d2 = dep(450), b = (m: number) => M(m) * d2;
          const d3 = dep(492), c = (m: number) => M(m) * d3;
          return (
            <g>
              {/* spare rail on chocks */}
              <rect x={240} y={432} width={26} height={11} fill="#101F26" />
              <rect x={352} y={432} width={26} height={11} fill="#101F26" />
              {[0, 1, 2].map((i) => (
                <g key={"sr" + i}>
                  <rect x={236 + i * 4} y={432 - a(0.17) * (i + 1)} width={152 - i * 8} height={a(0.15)} fill="#1B333B" />
                  <rect x={236 + i * 4} y={432 - a(0.17) * (i + 1)} width={152 - i * 8} height={2.4} fill="#4E7280" />
                </g>
              ))}
              {/* oil drums, 0.6 x 0.9 m — two standing, one on its side and leaking rust */}
              {[0, 1].map((i) => {
                const x = 690 + i * 60;
                return (
                  <g key={"dr" + i}>
                    <ellipse cx={x + 6} cy={452} rx={b(0.36)} ry={b(0.09)} fill="url(#s4shad)" opacity={0.8} />
                    <rect x={x - b(0.3)} y={450 - b(0.9)} width={b(0.6)} height={b(0.9)} fill="#1C333A" />
                    <rect x={x - b(0.3)} y={450 - b(0.9)} width={b(0.12)} height={b(0.9)} fill="#37606B" />
                    <rect x={x - b(0.3)} y={450 - b(0.62)} width={b(0.6)} height={3} fill="#0C1D24" />
                    <rect x={x - b(0.3)} y={450 - b(0.3)} width={b(0.6)} height={3} fill="#0C1D24" />
                    <ellipse cx={x} cy={450 - b(0.9)} rx={b(0.3)} ry={b(0.08)} fill="#274B55" />
                  </g>
                );
              })}
              <g>
                <ellipse cx={798} cy={452} rx={b(0.48)} ry={b(0.11)} fill="url(#s4shad)" opacity={0.8} />
                <rect x={798 - b(0.45)} y={450 - b(0.6)} width={b(0.9)} height={b(0.6)} rx={b(0.16)} fill="#182D34" />
                <rect x={798 - b(0.45)} y={450 - b(0.6)} width={b(0.9)} height={b(0.08)} fill="#31575F" />
                <polygon points={`${798 - b(0.4)},450 ${798 + b(0.5)},450 ${798 + b(0.62)},458 ${798 - b(0.52)},458`} fill="url(#s4rust)" opacity={0.8} />
              </g>
              {/* sleepers stacked on end, 0.26 x 0.15 m ends, three by three */}
              {Array.from({ length: 9 }).map((_, i) => {
                const cx0 = 848 + (i % 3) * c(0.28), cy0 = 494 - Math.floor(i / 3) * c(0.17);
                return (
                  <g key={"sl" + i}>
                    <rect x={cx0} y={cy0 - c(0.15)} width={c(0.26)} height={c(0.15)} fill="#1C150E" />
                    <rect x={cx0} y={cy0 - c(0.15)} width={c(0.26)} height={2.4} fill="#4C3C2C" />
                    <rect x={cx0} y={cy0 - c(0.15)} width={2.4} height={c(0.15)} fill="#3A2E20" />
                  </g>
                );
              })}
              {/* the cable trough route, running away down the right-hand cess */}
              {Array.from({ length: 11 }).map((_, i) => {
                const x = 686 + i * 31, y = 506 + i * 9.4, dd = dep(y);
                return (
                  <g key={"tr" + i}>
                    <polygon points={`${x},${y} ${x + M(0.36) * dd},${y + 2} ${x + M(0.36) * dd},${y + M(0.14) * dd} ${x},${y + M(0.14) * dd - 2}`} fill="#14262C" />
                    <polygon points={`${x},${y} ${x + M(0.36) * dd},${y + 2} ${x + M(0.36) * dd},${y + 5} ${x},${y + 3}`} fill="#33555E" />
                  </g>
                );
              })}
              {/* milepost + the fouling-point marker that says where the two roads stop
                  being one road — the most rail-yard object in the frame */}
              <rect x={962} y={506} width={7} height={M(0.9) * dep(540)} fill="#16292F" />
              <rect x={962} y={506} width={2.4} height={M(0.9) * dep(540)} fill="#3A5F68" />
              <rect x={950} y={498} width={30} height={15} rx={2} fill="#20363D" />
              <rect x={950} y={498} width={30} height={4} fill="#41666F" />
              <g>
                <rect x={556} y={534} width={8} height={M(0.7) * dep(560)} fill="#1A2E35" />
                {[0, 1, 2].map((i) => <rect key={"fz" + i} x={556} y={538 + i * 16} width={8} height={7} fill="#C9BEA6" opacity={0.6} />)}
                <ellipse cx={560} cy={534 + M(0.7) * dep(560)} rx={13} ry={4} fill="url(#s4shad)" opacity={0.7} />
              </g>
              {/* wet ground: the drip's puddle under the portal, and a long one out on
                  the right-hand cess that will catch the crane lamp when it comes up */}
              <Puddle x={575} y={372} rx={20} tint="#2E5E6B" op={0.45 + 0.2 * lamp}
                      ring={(() => { const dr = (lf % 38) / 38; return dr < 0.14 ? dr / 0.14 : -1; })()} />
              <Puddle x={706} y={548} rx={46} tint="#2A5866" op={0.3 + 0.16 * lamp + standby * 0.2 + won * 0.26} />
            </g>
          );
        })()}

        {/* ===== THE KEY: sodium floodlight, high-left, cowl aimed DOWN-RIGHT at the points.
                Cone + halo + ground pool all ride `lamp` together. ===== */}
        <polygon points="96,166 132,166 980,792 330,792" fill="url(#s4cone)" opacity={lamp} />
        <ellipse cx={352} cy={612} rx={392} ry={228} fill="url(#s4pool)" opacity={0.34 * lamp} />
        <rect x={102} y={158} width={13} height={280} fill="#132831" />
        <rect x={102} y={158} width={4} height={280} fill="#2E5561" />
        <rect x={88} y={430} width={42} height={12} rx={3} fill="#0C1D24" />
        <polygon points="82,130 148,130 136,168 92,168" fill="#1A343D" />
        <polygon points="82,130 148,130 146,138 84,138" fill="#3A6470" />
        <rect x={92} y={160} width={44} height={9} rx={4} fill="#FFE6AE" opacity={Math.min(1, lamp)} />
        <circle cx={114} cy={164} r={86} fill="url(#s4halo)" opacity={0.72 * lamp} />

        {/* ---------- PLANE 4 · the corridor washes: the yard's light COMMITS to one
             branch and abandons the other. Two large-area value events (f88, f106). ---------- */}
        <polygon points={CORR_R} fill="#FFC97F" opacity={0.05 + standby * 0.18 + won * 0.24} />
        <polygon points={CORR_L} fill="#9ED6E4" opacity={0.13 * (1 - fade)} />
        <polygon points={CORR_L} fill="#01080B" opacity={fade * 0.42} />

        {/* ---------- the roads ---------- */}
        <Ties r={ROAD_MAIN} n={8} />
        <Rails r={ROAD_MAIN} hot={() => 0.5} />
        <Ties r={ROAD_L} n={12} dim={fade * 0.6 + wipe * 0.4} />
        <Rails r={ROAD_L} hot={() => 0.55 * (1 - fade) * (1 - wipe)} base={wipe > 0.4 ? "#25343B" : "#5B717C"} />
        <Ties r={ROAD_R} n={20} u1={1.6} />
        <Rails r={ROAD_R} u1={1.6} hot={(t) => Math.min(1, 0.1 + 0.42 * thr + 0.85 * won + 0.4 * standby + (wakeU > 0 && wakeU < 1 ? Math.max(0, 1 - Math.abs(t - wakeU) * 5) : 0))} />

        {/* ===== BEAT 2 · the bright WAKE BAND running the full length of the right road ===== */}
        {wakeU > 0.001 && wakeU < 0.999 && (
          <>
            <polygon points={bandPoly(ROAD_R, Math.max(0, wakeU - 0.16), Math.min(1.4, wakeU + 0.05), 6, 1.2)} fill="#CFF2FA" opacity={0.34} />
            <polygon points={bandPoly(ROAD_R, Math.max(0, wakeU - 0.05), Math.min(1.1, wakeU + 0.02), 2, 0.92)} fill="#F2FDFF" opacity={0.5} />
          </>
        )}

        {/* point BLADES + the crossing nose where the two roads part */}
        <g>
          <polygon points={`${592 + blade},474 ${603 + blade},474 ${622 + blade},528 ${611 + blade},528`} fill="#8FA9B4" />
          <polygon points={`${638 + blade},474 ${649 + blade},474 ${664 + blade},528 ${653 + blade},528`} fill="#8FA9B4" />
          <rect x={548 + blade * 0.4} y={530} width={164} height={9} rx={3} fill="#33454E" />
          <polygon points="620,472 640,500 600,500" fill="#7C949E" />
        </g>
        {/* PERSISTENT RESULT · the slam shakes a spanner off the stretcher bar. It falls,
            it lands at f26, and it is still lying in the four-foot at the cut. */}
        {lf > 17 && (() => {
          const fall = Math.min(1, (lf - 17) / 9);
          const y = 536 + fall * fall * 26, x = 590 + fall * 16;
          const spin = fall < 1 ? fall * 210 : 210;
          return (
            <g transform={`rotate(${spin} ${x} ${y})`} opacity={0.9}>
              <rect x={x - 15} y={y - 3} width={30} height={5.5} rx={2} fill="#2A424B" />
              <rect x={x - 15} y={y - 3} width={30} height={1.8} fill="#5D808C" />
              <circle cx={x + 16} cy={y - 0.5} r={4.6} fill="#2A424B" />
              <circle cx={x + 16} cy={y - 0.5} r={2} fill="#0B171C" />
            </g>
          );
        })()}
        {slam > 0.02 && (
          <g opacity={slam}>
            {Array.from({ length: 16 }).map((_, i) => {
              const s1 = seed(i * 3.3 + 2), s2 = seed(i * 7.1 + 6);
              const t = 1 - slam;
              return <circle key={"sp" + i} cx={592 + blade + (s1 - 0.2) * 110 * (0.4 + t * 1.8)} cy={492 + (s2 - 0.5) * 60 - t * 46}
                             r={(2.4 + s2 * 5) * slam} fill={s1 > 0.5 ? "#FFF2CE" : "#FFC97F"} />;
            })}
          </g>
        )}

        {/* ===== BEAT 2 · the SHOCK RING off the slam — crosses the whole yard ===== */}
        {ring > 0.005 && ring < 1 && (
          <g>
            <circle cx={620} cy={488} r={22 + ring * 690} fill="none" stroke="#CFF2FA" strokeWidth={Math.max(2, 26 - ring * 23)} opacity={(1 - ring) * 0.7} />
            <circle cx={620} cy={488} r={10 + ring * 430} fill="none" stroke="#F2FDFF" strokeWidth={Math.max(1, 11 - ring * 10)} opacity={(1 - ring) * 0.45} />
          </g>
        )}

        {/* ===== BEAT 3 · the fork ghosts into EIGHT roads across the lower half,
               then snaps back to two. Big, fast, and it dies in 6 frames. ===== */}
        {fanA > 0.01 && (
          <g>
            {[-4, -3, -2, -1, 1, 2, 3, 4].map((k) => {
              const home = k < 0 ? 372 : 860;
              const out = 640 + k * 176;
              const ex = home + (out - home) * fanA;
              const op = fanA * 0.52 * (1 - Math.abs(k) / 6.2);
              return <polygon key={"gh" + k} points={`610,470 632,470 ${ex + 34},792 ${ex - 34},792`} fill="#9EE0EA" opacity={op} />;
            })}
            <circle cx={620} cy={474} r={20 + fanA * 26} fill="#BFEFF6" opacity={fanA * 0.4} />
          </g>
        )}

        {/* ---------- the yard jib crane over the KEPT road (foot planted clear of it) ---------- */}
        <g>
          <rect x={946} y={34} width={28} height={522} fill="#12252C" />
          <rect x={946} y={34} width={7} height={522} fill="#2C4E58" />
          {/* the climbing ladder, its cage hoops, and the rust running out of the
              base flange — nobody has painted this crane in twenty years */}
          {Array.from({ length: 17 }).map((_, i) => (
            <rect key={"cl" + i} x={952} y={70 + i * 28} width={17} height={2.6} fill="#0A171C" />
          ))}
          <rect x={951} y={70} width={2} height={478} fill="#0A171C" />
          <rect x={969} y={70} width={2} height={478} fill="#0A171C" />
          <polygon points="944,470 976,470 980,556 940,556" fill="url(#s4rust)" opacity={0.75} />
          <rect x={930} y={548} width={60} height={20} rx={4} fill="#0B171D" />
          {[0, 1, 2, 3].map((i) => (
            <polygon key={"cv" + i} points={`${934 + i * 15},566 ${942 + i * 15},550 ${949 + i * 15},550 ${941 + i * 15},566`} fill="#8A7233" opacity={0.62} />
          ))}
          {/* PERSISTENT RESULT · the crane's beacon. It idles dim all scene and latches
              bright the moment the yard commits to the kept road. */}
          {(() => {
            const rot = 0.35 + 0.65 * Math.max(0, Math.sin(lf / 4.2));
            const k = (0.16 + won * 0.6 + flare * 0.24) * rot;
            return (
              <g>
                <rect x={952} y={22} width={17} height={12} rx={4} fill="#3A2E14" />
                <rect x={953} y={23} width={15} height={9} rx={3} fill="#E8A83C" opacity={0.35 + k} />
                <circle cx={960} cy={28} r={16 + won * 12} fill="url(#s4halo)" opacity={k * 0.7} />
              </g>
            );
          })()}
          <rect x={700} y={34} width={286} height={17} fill="#162C34" />
          <rect x={700} y={34} width={286} height={5} fill="#325863" />
          <polygon points="960,124 974,124 974,136 712,54 712,42" fill="#162C34" />
          {/* the work lamp — a PRACTICAL, lights the kept road on beats 5/8 */}
          <rect x={840} y={51} width={40} height={15} rx={4} fill="#22414B" />
          <rect x={844} y={64} width={32} height={7} rx={3} fill="#FFE6AE" opacity={0.18 + standby * 0.2 + won * 0.3 + flare * 0.32} />
          <circle cx={860} cy={66} r={30 + won * 30 + flare * 34} fill="url(#s4halo)" opacity={0.2 * standby + won * 0.42 + flare * 0.5} />
          {/* chain + hook block — the block SWAYS on its chain from frame 0 (texture) */}
          {(() => {
            const trav = over(lf, 96, 32);          // the crane traverses to meet the kept road
            const ax = 744 + trav * 116;
            const sway = Math.sin(lf / 8.4) * (1 - hookD * 0.72) * 30;
            const hx = ax + sway;
            return (
              <g>
                <path d={`M${ax} 52 Q${ax + sway * 0.55} ${(52 + hookY) / 2} ${hx} ${hookY}`} fill="none" stroke="#4E6874" strokeWidth={6} />
                <path d={`M${ax - 3} 52 Q${ax - 3 + sway * 0.55} ${(52 + hookY) / 2} ${hx - 3} ${hookY}`} fill="none" stroke="#7B98A4" strokeWidth={2} />
                <rect x={hx - 16} y={hookY} width={32} height={17} rx={3} fill="#2E4A55" />
                <rect x={hx - 16} y={hookY} width={32} height={5} rx={2} fill="#66848F" />
                <path d={`M${hx} ${hookY + 17} l0 16 a11 11 0 1 0 -11 -11`} fill="none" stroke="#8AA6B1" strokeWidth={5} strokeLinecap="round" />
              </g>
            );
          })()}
        </g>

        {/* ---------- PLANE 5 · the point RODDING: his lever, tied to the blades ---------- */}
        {(() => {
          const dx = ROD_B.x - ROD_A.x, dy = ROD_B.y - ROD_A.y;
          const sl = thr * 11;
          const rods: React.ReactNode[] = [];
          [-7, 7].forEach((o, j) => {
            rods.push(<line key={"rd" + j} x1={ROD_A.x + o + sl} y1={ROD_A.y} x2={ROD_B.x + o + sl * 0.4} y2={ROD_B.y}
                            stroke={j ? "#22383F" : "#4E6C78"} strokeWidth={j ? 7 : 8} strokeLinecap="round" />);
          });
          for (let i = 1; i < 6; i++) {
            const x = ROD_A.x + dx * (i / 6), y = ROD_A.y + dy * (i / 6);
            rods.push(<rect key={"stk" + i} x={x - 17} y={y - 3} width={34} height={11} rx={3} fill="#14262D" />);
          }
          if (rod > 0.01 && rod < 1) {
            const x = ROD_A.x + dx * rod, y = ROD_A.y + dy * rod;
            rods.push(<circle key="imp2" cx={x} cy={y} r={54} fill="url(#s4halo)" opacity={0.7 * (1 - Math.abs(rod - 0.5) * 1.2)} />);
            rods.push(<circle key="imp" cx={x} cy={y} r={26} fill="#E8FAFF" opacity={0.75 * (1 - Math.abs(rod - 0.5) * 1.2)} />);
          }
          return <g>{rods}</g>;
        })()}

        {/* ===== BEATS 4/7/8 · the two trolleys, their beams, their dust, and the
               buffer — painted BACK TO FRONT (lower on screen == nearer == last) ===== */}
        {(() => {
          const lY = TL.y + rec * 0.4;
          const lw = M(0.5) * dL, lh = M(0.9) * dL, lTop = lY - M(0.66) * dL - lh;
          const clack = (ph: number) => { const c = (lf + ph) % 12; return c < 3 ? 1 - c / 3 : 0; };
          const lLive = (1 - wipe) * (1 - fade * 0.5);

          const leftUnit = (
            <g key="u-left">
              {runL && streaks(TL.x, lY, dL, DL.x, DL.y, (1 - wipe) * (1 - fade * 0.6))}
              {beam(TL.x - M(0.74) * dL, lY - M(0.98) * dL, dL, DL.x, DL.y, 0, lLive)}
              <Wake lf={lf} x={TL.x} y={lY} d={dL} dx={DL.x} dy={DL.y} ph={0.13} k={(1 - wipe) * Math.min(1, Math.max(0, mL) * 3)} />
              {clack(0) > 0 && runL && (
                <ellipse cx={TL.x} cy={lY} rx={M(1.0) * dL} ry={M(0.2) * dL} fill="#FFE9C4" opacity={0.4 * clack(0) * lLive} />
              )}
              <Trolley x={TL.x} y={lY} d={dL} lamp={lLive} dim={wipe} roll={Math.sin(lf / 4.6) * 1.1 * (runL ? 1 : 0)} />
              {runL && sparks(TL.x - M(0.5) * dL, lY - M(0.2) * dL, dL, 3, (1 - wipe) * (1 - fade * 0.5))}
              <rect x={TL.x - lw} y={lTop} width={lw * 2} height={lh} fill={deadT ? "#0B1A20" : "url(#s4crate)"} />
              <rect x={TL.x - lw} y={lTop} width={lw * 2} height={Math.max(2, lh * 0.05)} fill={deadT ? "#2A3C44" : "#9C8154"} />
              <rect x={TL.x - lw} y={lTop} width={Math.max(2, lw * 0.09)} height={lh} fill={deadT ? "#2E434B" : "#A98D5D"} />
              <rect x={TL.x - lw * 0.84} y={lTop + lh * 0.56} width={lw * 1.68} height={lh * 0.28} rx={4} fill={deadT ? "#0A171C" : "#5A4A2C"} opacity={0.5} />
            </g>
          );

          const bufferUnit = (
            <g key="u-buf">
              {/* PERSISTENT RESULT · the hit knocks the buffer 2.4deg out of true and
                  throws a fan of ballast out of the four-foot. Neither goes back. */}
              {lf > 130 && Array.from({ length: 9 }).map((_, i) => {
                const s1 = seed(i * 4.9 + 3), s2 = seed(i * 7.7 + 11);
                return <circle key={"pb" + i} cx={356 + (s1 - 0.5) * 250} cy={618 + s2 * 26}
                               r={3.4 + s2 * 5} fill={s1 > 0.5 ? "#25404A" : "#0E1F27"} opacity={0.85} />;
              })}
              <g transform={`translate(356 ${604 + rec * 0.5}) rotate(${(lf > 130 ? 2.4 : 0) + rec * 0.12}) scale(${dep(604)})`} opacity={1 - wipe * 0.92}>
                <ellipse cx={8} cy={5} rx={M(0.95)} ry={M(0.14)} fill="url(#s4shad)" opacity={0.8} />
                <polygon points={`${-M(0.6)},0 ${-M(0.47)},0 ${-M(0.15)},${-M(0.78)} ${-M(0.28)},${-M(0.78)}`} fill="#111F26" />
                <polygon points={`${M(0.47)},0 ${M(0.6)},0 ${M(0.28)},${-M(0.78)} ${M(0.15)},${-M(0.78)}`} fill="#0B171C" />
                <rect x={-M(0.46)} y={-M(0.81)} width={M(0.92)} height={M(0.2)} fill="#14242B" />
                <rect x={-M(0.46)} y={-M(0.81)} width={M(0.92)} height={M(0.04)} fill="#3E5C67" />
                <rect x={-M(0.06)} y={-M(0.7)} width={M(0.12)} height={M(0.7)} fill="#0E1C22" />
              </g>
              {/* the impact throws a wall of ballast dust the width of the dead road */}
              {dt >= 0 && dt < 34 && Array.from({ length: 13 }).map((_, i) => {
                const t = Math.min(1, dt / 34), s1 = seed(i * 4.1 + 2), s2 = seed(i * 8.3 + 6);
                return <circle key={"du" + i} cx={356 + (s1 - 0.5) * 320 * (0.4 + t)} cy={604 - t * (60 + s2 * 90)}
                               r={(8 + s2 * 20) * (0.4 + t * 1.4)} fill="url(#s4dust)" opacity={(1 - t) * 0.5} />;
              })}
            </g>
          );

          const rightUnit = (
            <g key="u-right">
              {runR && streaks(TR.x, TR.y, dR, DR.x, DR.y, 1)}
              {beam(TR.x - M(0.74) * dR, TR.y - M(0.98) * dR, dR, DR.x, DR.y, 2.1, 1)}
              <Wake lf={lf} x={TR.x} y={TR.y} d={dR} dx={DR.x} dy={DR.y} ph={0.61} k={Math.min(1, Math.max(0, mR) * 3) * (1 - lift)} />
              {clack(5) > 0 && runR && (
                <ellipse cx={TR.x} cy={TR.y} rx={M(1.0) * dR} ry={M(0.2) * dR} fill="#FFE9C4" opacity={0.42 * clack(5)} />
              )}
              <Trolley x={TR.x} y={TR.y} d={dR} lamp={1} dim={0} roll={Math.sin(lf / 4.1 + 2) * 1.1 * (runR ? 1 : 0)} />
              {runR && sparks(TR.x - M(0.5) * dR, TR.y - M(0.2) * dR, dR, 8, 1)}
              {lift > 0.01 && crTop > hookY + 30 && <rect x={crX - 3} y={hookY + 30} width={6} height={crTop - hookY - 30} fill="#4E6874" />}
              <rect x={crX - crW} y={crTop} width={crW * 2} height={crH} fill="url(#s4crate)" />
              <rect x={crX - crW} y={crTop} width={crW * 2} height={Math.max(2, crH * 0.05)} fill="#9C8154" />
              <rect x={crX - crW} y={crTop} width={Math.max(2, crW * 0.09)} height={crH} fill="#A98D5D" />
              <rect x={crX - crW} y={crTop + crH * 0.42} width={crW * 2} height={Math.max(2, crH * 0.05)} fill="#2E2415" />
              <rect x={crX - crW * 0.84} y={crTop + crH * 0.56} width={crW * 1.68} height={crH * 0.28} rx={4}
                    fill={gold > 0.02 ? GOLD : "#5A4A2C"} opacity={0.35 + gold * 0.65} />
              <text x={crX} y={crTop + crH * 0.775} textAnchor="middle"
                    style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: crH * 0.17, letterSpacing: 1.5 }}
                    fill={gold > 0.02 ? "#231B0A" : "#6B5A38"} opacity={0.06 + gold * 0.94}>TESTED</text>
              {gold > 0.02 && <circle cx={crX} cy={crTop + crH * 0.5} r={crH * (1.0 + gold * 0.9)} fill="url(#s4halo)" opacity={gold * 0.8} />}
              {gold > 0.02 && gold < 1 && (<>
                <circle cx={crX} cy={crTop + crH * 0.5} r={24 + gold * 540} fill="none" stroke="#FFE7A8" strokeWidth={Math.max(2, 24 - gold * 21)} opacity={(1 - gold) * 0.62} />
                <circle cx={crX} cy={crTop + crH * 0.5} r={12 + gold * 330} fill="none" stroke="#FFF6DC" strokeWidth={Math.max(1, 10 - gold * 9)} opacity={(1 - gold) * 0.4} />
              </>)}
            </g>
          );

          return [{ y: lY, el: leftUnit }, { y: 604, el: bufferUnit }, { y: TR.y, el: rightUnit }]
            .sort((a, b) => a.y - b.y).map((u) => u.el);
        })()}

        {/* ===== BEAT 7 · the DEAD-ROAD WIPE — a black front that TRAVELS the left
               branch from the fork out to the buffer, led by one cold flare bar. ===== */}
        {wipe > 0.005 && (
          <>
            <polygon points={bandPoly(ROAD_L, 0.13, Math.max(0.14, 0.13 + wipe * 0.92), 14, 1.4)} fill="#01070A" opacity={0.8} />
            {wipe < 0.98 && (() => {
              const p = at(ROAD_L, 0.13 + wipe * 0.92), d = dep(p.y), w = HGA(p.y) * 1.4 + 14 * d;
              return <ellipse cx={p.x} cy={p.y} rx={w} ry={44 * d} fill="#9ED6E4" opacity={0.42 * (1 - wipe)} />;
            })()}
          </>
        )}

        {/* the crane work-lamp lays its warm cone OVER the kept road, so the two
            branches split apart in VALUE as well as in geometry */}
        {(standby > 0.01 || won > 0.01 || flare > 0.01) &&
          <polygon points="838,68 882,68 1012,720 636,720" fill="url(#s4work)" opacity={standby * 0.3 + won * 0.42 + flare * 0.55} />}

        {/* ---------- the ground frame he works, at the edge of the action ---------- */}
        <g>
          <ellipse cx={LVX + 12} cy={LVY + 7} rx={M(0.8)} ry={M(0.15)} fill="url(#s4shad)" opacity={0.85} />
          <rect x={LVX - M(0.38)} y={LVY - M(0.16)} width={M(0.76)} height={M(0.18)} rx={4} fill="#16292F" />
          <path d={`M${LVX - M(0.42)} ${LVY - M(0.16)} A ${M(0.66)} ${M(0.66)} 0 0 1 ${LVX + M(0.36)} ${LVY - M(0.5)}`}
                fill="none" stroke="#22383F" strokeWidth={M(0.1)} />
          <rect x={LVX - M(0.06)} y={LVY - M(0.66)} width={M(0.12)} height={M(0.66)} fill="#1C3138" />
          {/* the handlamp — the practical that puts him in warm light */}
          <rect x={LVX - M(0.34)} y={LVY - M(1.16)} width={M(0.1)} height={M(0.56)} fill="#1A2E35" />
          <rect x={LVX - M(0.42)} y={LVY - M(1.3)} width={M(0.26)} height={M(0.2)} rx={4} fill="#FFDFA0" opacity={0.95} />
          <circle cx={LVX - M(0.29)} cy={LVY - M(1.2)} r={M(0.5)} fill="url(#s4halo)" opacity={0.6 + 0.25 * lamp} />
          {/* the moth that has been working this lamp all night */}
          {(() => {
            const a = lf / 8.5, mx = LVX - M(0.29) + Math.cos(a) * 27, my = LVY - M(1.2) + Math.sin(a * 1.7) * 15;
            return <ellipse cx={mx} cy={my} rx={4.2} ry={2.4} fill="#F3E2C0" opacity={0.38}
                            transform={`rotate(${Math.sin(a * 3) * 34} ${mx} ${my})`} />;
          })()}
          {/* PERSISTENT RESULT · the frame's own repeater. Red until he throws it,
              green from f17 to the cut. Small, but it never goes back. */}
          <rect x={LVX + M(0.44)} y={LVY - M(0.72)} width={M(0.09)} height={M(0.72)} fill="#16292F" />
          <rect x={LVX + M(0.44)} y={LVY - M(0.72)} width={M(0.03)} height={M(0.72)} fill="#3A5F68" />
          <circle cx={LVX + M(0.485)} cy={LVY - M(0.78)} r={M(0.055)} fill={thr > 0.85 ? "#7FE3A8" : "#E2604A"} />
          <circle cx={LVX + M(0.485)} cy={LVY - M(0.78)} r={M(0.17)} fill="url(#s4halo)" opacity={0.4} />
          {/* taped grip + a rust patch: this frame has been thrown ten thousand times */}
          <polygon points={`${LVX - M(0.36)},${LVY - M(0.14)} ${LVX - M(0.2)},${LVY - M(0.14)} ${LVX - M(0.17)},${LVY + M(0.02)} ${LVX - M(0.39)},${LVY + M(0.02)}`} fill="url(#s4rust)" opacity={0.85} />
          <g transform={`rotate(${(lvA * 180) / Math.PI} ${LVX} ${LVY})`}>
            <rect x={LVX - M(0.055)} y={LVY - LVL} width={M(0.11)} height={LVL} rx={4} fill="#3A5560" />
            <rect x={LVX - M(0.055)} y={LVY - LVL} width={M(0.035)} height={LVL} fill="#8FBAC6" />
            <rect x={LVX - M(0.12)} y={LVY - LVL * 0.42} width={M(0.24)} height={M(0.09)} rx={3} fill="#20363D" />
            <circle cx={LVX} cy={LVY - LVL} r={M(0.13)} fill={thr > 0.9 ? CLAY : "#C8523A"} />
            <circle cx={LVX - M(0.05)} cy={LVY - LVL - M(0.05)} r={M(0.05)} fill="#F0A183" opacity={0.85} />
          </g>
        </g>

        {/* ---------- PLANE 6 · near cess: the ground under the hero is crushed to near-black
             so his legs stop sharing a value with the ballast, then the handlamp lays ONE
             dim spill back down beside him. ---------- */}
        <ellipse cx={84} cy={812} rx={392} ry={196} fill="url(#s4dark)" />
        <ellipse cx={262} cy={800} rx={244} ry={96} fill="url(#s4dark)" opacity={0.45} />
        <ellipse cx={306} cy={742} rx={200} ry={58} fill="#33454F" opacity={0.3 + 0.16 * lamp} />
        <ellipse cx={314} cy={734} rx={124} ry={34} fill="#4A6270" opacity={0.2 + 0.14 * lamp} />

        {/* ---------- the gang's kit, sitting ON the crushed cess so its lit LEFT edges
             survive: a barrow tipped on its nose, a bucket, a shovel stood against the
             frame, a coil of cable, and the puddle that holds his handlamp ---------- */}
        {(() => {
          const d = dep(736), s = (m: number) => M(m) * d;
          return (
            <g>
              <Puddle x={308} y={596} rx={62} tint="#2E5E6B" op={0.3 + 0.2 * lamp} />
              {/* wheelbarrow — 0.62 m barrow body, one wheel, one handle */}
              <ellipse cx={286} cy={732} rx={s(0.66)} ry={s(0.13)} fill="url(#s4shad)" opacity={0.8} />
              <polygon points={`234,${730 - s(0.56)} 330,${722 - s(0.56)} 322,728 244,733`} fill="#0B1A20" />
              <polygon points={`234,${730 - s(0.56)} 330,${722 - s(0.56)} 328,${728 - s(0.56)} 236,${736 - s(0.56)}`} fill="#3E6A78" />
              <polygon points={`234,${730 - s(0.56)} 240,${731 - s(0.56)} 246,732 244,733`} fill="#2C5260" />
              <circle cx={336} cy={728} r={s(0.17)} fill="#08141A" />
              <circle cx={336} cy={728} r={s(0.06)} fill="#3E6A78" />
              <rect x={224} y={716 - s(0.56)} width={s(0.09)} height={s(0.62)} rx={3} fill="#2C5260" transform={`rotate(18 228 ${716 - s(0.56)})`} />
              {/* bucket */}
              <ellipse cx={392} cy={752} rx={s(0.24)} ry={s(0.07)} fill="url(#s4shad)" opacity={0.75} />
              <polygon points={`${392 - s(0.16)},${752 - s(0.36)} ${392 + s(0.16)},${752 - s(0.36)} ${392 + s(0.11)},752 ${392 - s(0.11)},752`} fill="#0B1A20" />
              <polygon points={`${392 - s(0.16)},${752 - s(0.36)} ${392 - s(0.11)},${752 - s(0.36)} ${392 - s(0.075)},752 ${392 - s(0.11)},752`} fill="#3E6A78" />
              <path d={`M${392 - s(0.155)} ${752 - s(0.35)} q${s(0.155)} ${-s(0.18)} ${s(0.31)} 0`} fill="none" stroke="#31596A" strokeWidth={2.2} />
              {/* shovel, stood against the frame */}
              <rect x={452} y={716 - s(1.05)} width={s(0.075)} height={s(1.05)} rx={3} fill="#2C5260" transform={`rotate(-14 454 ${716 - s(1.05)})`} />
              <polygon points="436,738 458,736 456,760 438,760" fill="#12242B" />
              <polygon points="436,738 442,737.5 441,760 438,760" fill="#42707E" />
              {/* coil of cable, dumped where it was dropped */}
              <ellipse cx={210} cy={756} rx={s(0.44)} ry={s(0.15)} fill="#071217" />
              <ellipse cx={210} cy={753} rx={s(0.44)} ry={s(0.15)} fill="none" stroke="#335C6A" strokeWidth={3} />
              <ellipse cx={210} cy={747} rx={s(0.37)} ry={s(0.12)} fill="none" stroke="#24434E" strokeWidth={3} />
            </g>
          );
        })()}
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={"fs" + i}>
              <rect x={472 + i * 5} y={738 + i * 20} width={222 - i * 12} height={20} fill="#050F14" />
              <rect x={472 + i * 5} y={738 + i * 20} width={222 - i * 12} height={4} fill="#173840" opacity={0.75} />
            </g>
          ))}
        </g>
        <path d="M0 792 L0 774 Q140 762 300 776 Q440 788 560 780 L560 792 Z" fill="#020A0E" />

        {/* ===== PLANE 6 · the NEAR CESS. A ballast berm right under the lens: it crops
               the bottom of the frame, it is blacker than anything else in the yard, and
               the kept wagon rolls out BEHIND it — which is what tells you how near it
               is. Its weeds lean in the draught the wagons drag past. ===== */}
        <path d="M0 792 L0 766 Q118 750 232 764 Q332 776 430 766 Q520 758 606 772 Q700 786 792 774 Q900 760 1012 772 L1012 792 Z" fill="#01070A" />
        {Array.from({ length: 14 }).map((_, i) => {
          const s1 = seed(i * 9.1 + 2), s2 = seed(i * 3.3 + 7);
          return <circle key={"nbs" + i} cx={20 + s1 * 972} cy={768 + s2 * 20} r={4 + s2 * 7} fill="#050F14" />;
        })}
        {Array.from({ length: 9 }).map((_, i) => {
          const s1 = seed(i * 6.7 + 3), x = 44 + s1 * 930, y = 772 - seed(i * 2.1) * 12;
          const b = Math.sin(lf / 13 + i) * 3 + (runR ? Math.sin(lf / 3.2 + i) * 1.3 : 0);
          return <path key={"wd" + i} d={`M${x} ${y} q${b} -15 ${b * 1.6} -27 M${x} ${y} q${b - 6} -10 ${b - 9} -21 M${x} ${y} q${b + 6} -11 ${b + 10} -20`}
                       stroke="#0A1B21" strokeWidth={2.4} fill="none" />;
        })}
        {/* a near stack of spare rail, cropped by two frame edges */}
        <g>
          <polygon points="836,792 878,700 1012,686 1012,792" fill="#020A0E" />
          {[0, 1, 2, 3].map((i) => (
            <g key={"nr" + i}>
              <rect x={866 + i * 5} y={700 + i * 23} width={146 - i * 7} height={13} fill="#04121A" />
              <rect x={866 + i * 5} y={700 + i * 23} width={146 - i * 7} height={2.8} fill="#1B3B46" opacity={0.75} />
            </g>
          ))}
        </g>
        {/* the boundary post at the frame edge — the nearest object in the yard, and it
            exists only to put something between us and the light */}
        <polygon points="0,792 0,556 31,552 36,792" fill="#01070A" />
        <rect x={0} y={552} width={6.5} height={240} fill="#12292F" opacity={0.6} />
        <rect x={4} y={600} width={26} height={19} rx={2} fill="#0D2027" />
        <rect x={4} y={600} width={26} height={3} fill="#2A4A54" opacity={0.8} />

        {/* dust drifting through the key light (texture, never the event) */}
        {Array.from({ length: 10 }).map((_, i) => {
          const s1 = seed(i * 6.1 + 3);
          const y = 200 + ((seed(i * 3.7) * 500 + lf * (0.9 + s1 * 1.4)) % 500);
          return <circle key={"dm" + i} cx={300 + s1 * 380 + Math.sin(lf / 22 + i) * 18} cy={y} r={1.8 + s1 * 2.2} fill="#FFE7BC" opacity={(0.16 + s1 * 0.14) * lamp} />;
        })}

        <Vignette cx={0.55} cy={0.54} a={0.68} />
      </svg>

      {/* ---------- the TESTER · pushed to the LEFT EDGE, hand on the ground frame ----------
           ⛔ no `stern` — attitude comes from the gaze holding the fork and the throw. */}
      <Actor
        lf={lf}
        x={HX}
        groundY={HGY}
        size={HERO}
        z={14}
        coat={1}
        nodAmp={2.2}
        nodSpeed={12}
        gaze={lf < 28 ? 6 : lf < 126 ? 8 : 7}
        point={Math.max(0, 1 - over(lf, 28, 12))}
        cheer={over(lf, 158, 12) * 0.6}
      />

      {/* ---------- cohesion HUD (non-VO status plate; ticks the last notch on the fork) ---------- */}
      <div style={{ position: "absolute", left: 30, top: 64, zIndex: 60, display: "flex", alignItems: "center", gap: 11,
                    padding: "7px 14px", borderRadius: 9, background: "rgba(6,20,26,0.8)", border: "1.5px solid rgba(120,190,202,0.32)" }}>
        <span style={{ fontFamily: mono, fontSize: 18, letterSpacing: 2.4, color: "#8FBFC8" }}>TESTED</span>
        <span style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2, 3].map((i) => {
            const on = i < 3 || lf >= 24;
            return <span key={i} style={{ width: 11, height: 11, borderRadius: 2, background: on ? GOLD : "rgba(140,190,202,0.24)",
                                          boxShadow: on ? `0 0 7px ${GOLD}88` : "none" }} />;
          })}
        </span>
        <span style={{ fontFamily: mono, fontSize: 18, color: GOLD, letterSpacing: 1 }}>04 / 04</span>
      </div>
    </>
  );
};
