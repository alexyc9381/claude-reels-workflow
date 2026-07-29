import React from "react";
import { H, M, over, ramp, seed, GOLD, fraunces, inter, Actor, Room } from "./chassis";

/* ============================================================================
   REEL 77 · S5 "THE WAREHOUSE"  — the PEAK.  120f @30fps, panel-local 1012×792.

   PLACE   Aisle 04 of the archive warehouse. Named floor: polished concrete
           slab with transverse expansion joints, worn yellow aisle lines, a
           hatched marshalling zone, an oil stain and a drip puddle. Named back
           wall: the corrugated far gable at the end of the aisle — ribs, a
           roller shutter, a high vent — lost in ochre haze until the chain
           reaches it. Steel pallet racking (3 m, three decks) runs down both
           sides to a vanishing point; a cross-passage is cut through each bank,
           a parked forklift noses out of the left one, a mezzanine deck runs
           above the right bank, an overhead cross-gantry, a sprinkler main and
           a wall conduit thread the roof space.

   LIGHT   ONE motivated key: the FIVE high clerestory windows on the LEFT wall.
           Their hard ochre dust shafts fall down-and-to-the-RIGHT at ~22° from
           vertical. Every lit face is a LEFT/TOP face; the left rack is the lit
           side, the right rack is the shade side, every contact shadow falls
           right. The pendant lamps are in-world practicals — they add floor
           pools, they never re-cast the key's shadow direction.

   CAMERA  LOCKED. One framing for the whole scene. No push, pan, zoom, drift or
           scale ramp anywhere. The scale is delivered by the CUT into this shot
           and by staging — never by a move.

   ⛔ HIERARCHY. ONE hero mover for the whole scene: the pendant chain igniting
      away down the aisle, which swings the LIT VOLUME of the entire hall every
      second. Everything added in the richness pass below is TEXTURE — smaller,
      dimmer and lower-contrast than the hero — or it is dead still.
      MEASURED after the richness pass (panel crop, 10fps, per-1s bucket):
      motion 6.1 / 5.6 / 7.1 / 7.1, median 6.19, bar 4.0 — every second clears.
      chaos: top-cell share 0.08–0.09, cells >8% = 1 / 4 / 1 / 1 (cap 6).

   RICHNESS PASS (client: "not detailed enough… more background stuff")
      · six worked planes, each with content (see PLANES)
      · world props: forklift, mezzanine + ladder, cross-gantry, two rack
        ladders, sprinkler main + drop heads, wall conduit, hanging chains and
        hooks, a draped tarpaulin, pallet stacks, a fire extinguisher, a sack
        barrow, a coiled hose, a stencilled aisle plate, a redacted notice, an
        enamel mug, chalked tally marks, strapping bands, rust streaks, taped
        patches, a broken slat, an oil stain, a puddle.
      · ambient life, all BELOW the hero in contrast: dust bands rolling down
        the shafts · heavy drifting dust · near-field motes · two swaying
        chains · three birds in the roof space · a stuttering fluorescent in
        the side aisle · a drip and its ripple · a lifting tarp corner · a
        fluttering notice corner · a blinking mezzanine indicator.
      · persistent results: every strike leaves the hall a stop brighter, the
        cross-passages, the forklift, the gantry, the mezzanine and the far
        gable stay revealed, the mezzanine strip stays lit, the birds end the
        scene higher than they started, and the tally stays flipped.

   PLANES  1 foreground rack end-panels, pallet stack, extinguisher, barrow,
             hose, near-field motes — near-black, they crop the frame
           2 the four gold TESTED crates + the near-left rack's small print:
             aisle plate, notice, mug, chalk tallies, rust
           3 the burning near pendant + its floor pool (the only light at f0)
           4 the TESTER, dwarfed at the aisle mouth
           5 receding rack banks, the igniting chain, ladders, tarp, forklift,
             cross-passages, mezzanine, the hanging tally
           6 gantry, trusses, sprinkler main, conduit, birds, clerestory
             windows, dust shafts, the far gable

   BEATS   f0        one pendant burns at the aisle mouth; the depth is black
           f2–f60    the chain runs away: lamps 1-5 strike, the hall's lit
                     volume doubles, the left cross-passage and the forklift
                     come out of the dark
           f60–f99   the chain accelerates to the vanishing point, the roof
                     stacks, the mezzanine and the far gable emerge, the birds
                     lift off the gantry, the haze bloom opens to full
           f92–f113  the hanging tally flips 04 TESTED → 46 UNTESTED
           f106–f118 the aisle goes out far → near; only the gold crates hold
   ========================================================================== */

/* ---- one-point perspective. z = 0 is the near plane (literal panel coords) -- */
const VPX = 519, VPY = 352, FLOOR = 792;
const P = (z: number) => 1 / (1 + z);
const PX = (X: number, z: number) => VPX + (X - VPX) * P(z);
const PY = (Y: number, z: number) => VPY + (Y - VPY) * P(z);
const pv = (X: number, Y: number, z: number): number[] => [PX(X, z), PY(Y, z)];
const ps = (...pts: number[][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
const lp = (a: number[], b: number[], t: number): number[] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const mix = (a: number, b: number, t: number) => a + (b - a) * clamp01(t);
/* lit-colour ramp: one dark value, one hot value, driven by litAt() */
const lc = (l: number, d: number[], h: number[]) => `rgb(${d.map((v, j) => Math.round(mix(v, h[j], l))).join(",")})`;

/* ---- SCALE CONTRACT — every prop below is sized through M(metres) ---------- */
const TIER = M(1.0);                 // 189 — shelf pitch, 1 m
const CRATE = M(0.8);                // 151 — one tip crate, 0.8 m
const RACK_H = 3 * TIER;             // 567 — pallet racking, 3 m
const RACK_TOP = FLOOR - RACK_H;     // 225
const AISLE = M(3.7);                // 698 — aisle width
const XL = VPX - AISLE / 2;          // 170 — left rack inner face
const XR = VPX + AISLE / 2;          // 868 — right rack inner face
const CEIL = FLOOR - M(6.0);         // hall clear height 6 m
const HALL = M(4.5);                 // half hall width, for the trusses
const LAMP_Y = FLOOR - M(3.14);      // pendant height ~3.14 m
const LAMP_W = M(0.5);               // pendant shade 0.5 m
const DECKS = [FLOOR, FLOOR - TIER, FLOOR - 2 * TIER];
const NB = 13;                       // drawn bays before the compressed far mass
const BZ = (k: number) => k * 0.42;  // one bay = 0.42 camera-lengths deep
const GAPL = [4, 5, 6];              // the cross-passage cut through the LEFT bank
const GAPR = [8, 9];                 // a second, deeper one through the RIGHT bank
const CWZ = 1.9;                     // the overhead cross-gantry
const MEZ_Y = FLOOR - M(3.45);       // the mezzanine deck, 3.45 m up the right bank

/* the pendant chain, running away to the vanishing point, and the frame each
   lamp strikes on. Lamp 0 is ALREADY BURNING at f0 (frame 0 is complete); the
   rest ignite in an ACCELERATING cascade so the reveal escalates. */
const LAMPZ = [0.35, 0.9, 1.5, 2.2, 3.0, 3.9, 5.0, 6.3, 7.8, 9.6, 11.8];
const IGN = [-999, 2, 13, 24, 34, 44, 53, 62, 70, 77, 84];

/* the hanging tally, slung over the RIGHT of the aisle. ⛔ it must clear three
   things at once: the white title card (panel-y 36..150, centred ~620 wide),
   the IG right safe zone (stop by x ~920), and — the reason it sits this low —
   the two near pendant fittings, which are the hero and must never be masked. */
const SG = { x: 656, y: 268, w: 260, h: 82 };
const COLS = 7;

const TallyFace: React.FC<{ num: string; word: string; hot: boolean }> = ({ num, word, hot }) => (
  <div style={{
    width: SG.w, height: SG.h, display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
    background: "linear-gradient(180deg,#2A1E0C 0%,#150E05 100%)", boxSizing: "border-box",
  }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 50, lineHeight: 1, letterSpacing: -2,
                   color: hot ? GOLD : "#9C8149" }}>{num}</span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 18, letterSpacing: 4, marginTop: 4,
                   color: hot ? "#F2DBA4" : "#7E6839" }}>{word}</span>
  </div>
);

export const S5Payoff: React.FC<{ lf: number }> = ({ lf }) => {
  /* ================= THE ONE MOVER: the igniting pendant chain ==============
     Each lamp strikes like a real gas-discharge fitting — flash, ballast dip,
     then up to full. Every phase is >=3 frames so it reads at speed. */
  const strike = (t: number) => {
    const d = lf - t;
    if (d < 0) return 0;
    if (d < 3) return 0.58;
    if (d < 6) return 0.12;
    const q = d - 6;                                        // the ballast hunts up
    return Math.min(1.04, 0.70 + 0.34 * (1 - Math.exp(-q / 4)) + 0.15 * Math.exp(-q / 5) * Math.sin(q * 0.85));
  };
  const die = 1 - ramp(lf, 106, 118);                       // the aisle goes out
  const em = LAMPZ.map((_, i) => (i === 0 ? 1 : strike(IGN[i])) * die *
    (0.95 + 0.05 * Math.sin(lf * 0.42 + i * 1.9)));
  /* how much of the chain is burning — this drives the HALL's exposure, so a
     lamp striking 40 m away still changes a large lit area near camera. */
  const fill = em.reduce((a, b) => a + b, 0) / LAMPZ.length;

  /* the lit FRONT: monotone in depth, so the boundary between lit and unlit
     bays sweeps continuously deeper and never snaps back. */
  let frontZ = 1.05;
  for (let i = 1; i < LAMPZ.length; i++) frontZ += clamp01((lf - IGN[i]) / 9) * (LAMPZ[i] - LAMPZ[i - 1]);
  /* the whole bank sags for a few frames each time the next fitting strikes */
  let sag = 1;
  for (let i = 1; i < LAMPZ.length; i++) {
    const d = lf - IGN[i];
    if (d >= 0 && d < 9) sag = Math.min(sag, d < 3 ? 0.80 : d < 6 ? 0.60 : 0.88);
  }
  const glow = (0.22 + 0.78 * fill) * sag;                  // the hall's exposure
  const zBack = 12.6 - ramp(lf, 106, 118) * 12.1;           // the far→near extinguish
  const litAt = (z: number) => clamp01((frontZ - z) * 1.5) * clamp01((zBack - z) * 1.9) * glow;
  const flare = (i: number) => { const d = lf - IGN[i]; return d >= 0 && d < 11 ? 1 - d / 11 : 0; };

  /* ---- BEAT: the tally flips ---------------------------------------------- */
  const jolt = 11 * (over(lf, 92, 3) - over(lf, 95, 14));

  /* the hero watches the chain run away from him, then looks up at the tally */
  const gaze = Math.round(-7 * (over(lf, 22, 14) - over(lf, 94, 14)));

  /* ---- AMBIENT LIFE (all texture — small, dim, never the event) ------------ */
  /* every strike also shakes the ironmongery: chains and hooks shudder */
  const shudder = (1 - sag) * 7;
  const sway1 = Math.sin(lf / 21) * 5 + shudder;
  const sway2 = Math.sin(lf / 17 + 1.9) * 3.5 + shudder * 0.6;
  /* a stuttering fluorescent deep in the left cross-passage */
  const flick = seed(Math.floor(lf / 4) * 1.7 + 3) > 0.74 ? 0.22 : 1;
  /* a drip off the near-left rack into a puddle on the slab, every 46 frames */
  const dripT = lf % 46, dripFall = dripT < 11 ? dripT / 11 : -1;
  const ripple = dripT >= 11 && dripT < 32 ? (dripT - 11) / 21 : -1;
  /* the mezzanine strip light kicks in once the chain gets past it — persistent */
  const mezOn = clamp01((lf - 66) / 10) * die;
  const blink = ((lf + 9) % 34) < 7 ? 1 : 0.15;

  /* ---- THE RACKS: 13 bays × 3 decks × 2 sides, drawn far → near ------------ */
  const crates: React.ReactNode[] = [];
  for (let side = 0; side < 2; side++) {
    const X = side === 0 ? XL : XR;
    const cBase = side === 0 ? "#3E3018" : "#2A2011";
    const cLit = side === 0 ? "#C4984A" : "#8B6B34";
    const cTop = side === 0 ? "#E4B663" : "#A47E35";
    for (let k = NB - 1; k >= 0; k--) {
      if (side === 0 && GAPL.indexOf(k) >= 0) continue;      // the cross-passages
      if (side === 1 && GAPR.indexOf(k) >= 0) continue;
      const g = (BZ(k + 1) - BZ(k)) * 0.07;
      const za = BZ(k) + g, zb = BZ(k + 1) - g;
      const lit = litAt((za + zb) / 2);
      for (let t = 0; t < 3; t++) {
        const deck = DECKS[t];
        const y1 = deck - 5, y0 = deck - CRATE;
        const gold = side === 0 && t === 1 && k < 4;
        const A = pv(X, y0, za), B = pv(X, y0, zb), C = pv(X, y1, zb), D = pv(X, y1, za);
        if (Math.abs(B[0] - A[0]) < 2.2) continue;
        const hN = (D[1] - A[1]) * 0.1, hF = (C[1] - B[1]) * 0.1;
        const key = `s5c-${side}-${k}-${t}`;
        /* shrink-wrap sheen / strapping bands on the near loads, and chalked
           five-bar tallies on the two nearest bottom crates — small print that
           only pays off on a second watch */
        const near = k < 3 && Math.abs(B[0] - A[0]) > 26;
        crates.push(
          <g key={key}>
            <polygon points={ps(A, B, C, D)} fill={gold ? "#6A4E20" : cBase} />
            {lit > 0.02 && <polygon points={ps(A, B, C, D)} fill={gold ? "#BE8C38" : cLit} opacity={lit} />}
            <polygon points={ps(A, B, [B[0], B[1] + hF], [A[0], A[1] + hN])} fill={gold ? "#D8A755" : cTop}
                     opacity={0.3 + lit * 0.5} />
            {near && !gold && (
              <g opacity={0.5 + lit * 0.4}>
                <polygon points={ps(lp(A, D, 0.24), lp(B, C, 0.24), lp(B, C, 0.30), lp(A, D, 0.30))} fill="#7A6132" />
                <polygon points={ps(lp(A, D, 0.74), lp(B, C, 0.74), lp(B, C, 0.79), lp(A, D, 0.79))} fill="#7A6132" />
              </g>
            )}
            {near && t === 0 && side === 0 && (
              <g opacity={0.42 + lit * 0.5}>
                {[0, 1, 2, 3].map((m) => {
                  const a = lp(lp(A, D, 0.34), lp(B, C, 0.34), 0.24 + m * 0.07);
                  const b = lp(lp(A, D, 0.62), lp(B, C, 0.62), 0.22 + m * 0.07);
                  return <line key={m} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#E4D3A8" strokeWidth={2} />;
                })}
                {(() => {
                  const a = lp(lp(A, D, 0.32), lp(B, C, 0.32), 0.50);
                  const b = lp(lp(A, D, 0.64), lp(B, C, 0.64), 0.20);
                  return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#E4D3A8" strokeWidth={2} />;
                })()}
              </g>
            )}
            {gold && (() => {
              const p1 = lp(lp(A, D, 0.36), lp(B, C, 0.36), 0.08);
              const p2 = lp(lp(A, D, 0.36), lp(B, C, 0.36), 0.92);
              const p3 = lp(lp(A, D, 0.68), lp(B, C, 0.68), 0.92);
              const p4 = lp(lp(A, D, 0.68), lp(B, C, 0.68), 0.08);
              const mid = lp(lp(p1, p2, 0.5), lp(p4, p3, 0.5), 0.5);
              const ang = (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180) / Math.PI;
              return (
                <g>
                  <polygon points={ps(p1, p2, p3, p4)} fill={GOLD} />
                  <polygon points={ps(p1, p2, lp(p2, p3, 0.22), lp(p1, p4, 0.22))} fill="#F6DDA0" />
                  {k === 0 && (
                    <text x={mid[0]} y={mid[1] + 6} textAnchor="middle" transform={`rotate(${ang.toFixed(1)} ${mid[0].toFixed(1)} ${mid[1].toFixed(1)})`}
                          style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 19, letterSpacing: 0.5, fill: "#241804" }}>TESTED</text>
                  )}
                </g>
              );
            })()}
          </g>
        );
      }
      /* seam between crates so the wall of boxes reads as separate objects */
      crates.push(
        <line key={`s5s-${side}-${k}`} x1={PX(X, BZ(k + 1))} y1={PY(RACK_TOP, BZ(k + 1))}
              x2={PX(X, BZ(k + 1))} y2={PY(FLOOR, BZ(k + 1))} stroke="#161006"
              strokeWidth={Math.max(1, 8 * P(BZ(k + 1)))} />
      );
    }
  }

  /* roof-stacked crates on the far bays — a ragged skyline that comes out of
     the dark as the chain reaches it */
  const roof: React.ReactNode[] = [];
  for (let side = 0; side < 2; side++) {
    const X = side === 0 ? XL : XR;
    for (let k = 4; k < 11; k++) {
      const s = seed(k * 3.3 + side * 7);
      if (s < 0.28) continue;
      const za = BZ(k) + 0.03, zb = BZ(k + 1) - 0.03;
      const hgt = M(0.55) * (0.7 + s * 0.6);
      const A = pv(X, RACK_TOP - hgt, za), B = pv(X, RACK_TOP - hgt, zb);
      const C = pv(X, RACK_TOP, zb), D = pv(X, RACK_TOP, za);
      const l = litAt((za + zb) / 2);
      const c = lc(l, side === 0 ? [0x33, 0x28, 0x13] : [0x24, 0x1b, 0x0d],
                      side === 0 ? [0xa8, 0x83, 0x40] : [0x7a, 0x5e, 0x2c]);
      roof.push(<polygon key={`s5r${side}${k}`} points={ps(A, B, C, D)} fill={c} />);
    }
  }

  /* ---- pendant practicals, two converging rows over the aisle -------------- */
  const lamps: React.ReactNode[] = [];
  const pools: React.ReactNode[] = [];
  for (let i = LAMPZ.length - 1; i >= 0; i--) {
    const z = LAMPZ[i], p = P(z), on = em[i] * sag, fl = flare(i) * die;
    const w = LAMP_W * p, y = PY(LAMP_Y, z);
    for (let sgn = -1; sgn <= 1; sgn += 2) {
      const x = PX(VPX + sgn * M(1.02), z);
      lamps.push(
        <g key={`s5l${i}${sgn}`}>
          <line x1={x} y1={PY(CEIL, z)} x2={x} y2={y} stroke="#241A0C" strokeWidth={Math.max(1, 4 * p)} />
          <polygon points={ps([x - w / 2, y], [x + w / 2, y], [x + w * 0.22, y - w * 0.42], [x - w * 0.22, y - w * 0.42])}
                   fill="#2E2312" />
          {on > 0.04 && (
            <polygon points={ps([x - w * 0.34, y], [x + w * 0.34, y], [x + w * 2.3, PY(FLOOR, z)], [x - w * 2.3, PY(FLOOR, z)])}
                     fill="url(#s5cone)" opacity={on * 0.7} />
          )}
          <ellipse cx={x} cy={y + w * 0.06} rx={w * 0.32} ry={w * 0.13}
                   fill={on > 0.05 ? "#FFEFC2" : "#43351C"} opacity={0.35 + on * 0.65} />
          {/* the strike flare — the fitting blows a ring of light into the dust */}
          {fl > 0.01 && (
            <ellipse cx={x} cy={y} rx={w * (0.8 + (1 - fl) * 4.8)} ry={w * (0.8 + (1 - fl) * 4.8) * 0.8}
                     fill="url(#s5flare)" opacity={fl * 0.95} />
          )}
          {/* secondary consequence: the strike knocks a puff of dust off the fitting */}
          {fl > 0.02 && (
            <ellipse cx={x + w * 0.5} cy={y - w * (0.5 + (1 - fl) * 1.5)} rx={w * (0.35 + (1 - fl) * 1.1)}
                     ry={w * (0.22 + (1 - fl) * 0.7)} fill="#E8CE9A" opacity={fl * 0.20} />
          )}
        </g>
      );
    }
    if (z < 6.6) {
      const rx = (AISLE / 2) * p * 1.12 * (0.5 + 0.5 * Math.min(1, on * 1.15));
      pools.push(
        <g key={`s5p${i}`}>
          <ellipse cx={VPX} cy={PY(FLOOR, z)} rx={rx} ry={rx * 0.19} fill="url(#s5pool)" opacity={on * 0.92} />
          <ellipse cx={VPX} cy={PY(FLOOR, z)} rx={rx * 0.42} ry={rx * 0.09} fill="#FFE7B0" opacity={on * 0.32} />
        </g>
      );
    }
  }

  /* ---- ceiling trusses — they come out of the black with the hall ---------- */
  const truss: React.ReactNode[] = [];
  [1.2, 2.0, 3.1, 4.6, 6.6].forEach((z, i) => {
    const p = P(z), y = PY(CEIL, z), hw = HALL * p, d = 22 * p, sw = Math.max(1, 3.4 * p);
    const l = litAt(z) * 0.9;
    const c1 = lc(l, [0x2a, 0x1f, 0x0e], [0x86, 0x69, 0x30]);
    const bits: React.ReactNode[] = [
      <line key="a" x1={VPX - hw} y1={y} x2={VPX + hw} y2={y} stroke={c1} strokeWidth={sw} />,
      <line key="b" x1={VPX - hw} y1={y + d} x2={VPX + hw} y2={y + d} stroke={c1} strokeWidth={sw} opacity={0.8} />,
    ];
    for (let w = 0; w < 10; w++) {
      const x0 = VPX - hw + (hw * 2 * w) / 10, x1 = VPX - hw + (hw * 2 * (w + 1)) / 10;
      bits.push(<line key={`w${w}`} x1={w % 2 ? x0 : x1} y1={y} x2={w % 2 ? x1 : x0} y2={y + d} stroke={c1} strokeWidth={Math.max(0.8, sw * 0.7)} opacity={0.85} />);
    }
    truss.push(<g key={`s5t${i}`}>{bits}</g>);
  });

  /* ---- clerestory windows on the left wall (the key) + their dust shafts ----
     FIVE windows now, marching away down the hall. Each shaft leaves its own
     window and falls down-and-right at ~22° from vertical to the slab. */
  const WIN_HI = CEIL + M(0.9), WIN_LO = CEIL + M(1.9);
  const winZ: number[][] = [[0.08, 0.95], [1.15, 2.05], [2.35, 3.45], [3.8, 5.0], [5.4, 6.8]];
  const SLANT = 0.404;
  const shafts = winZ.map((zz) => {
    const D = pv(XL, WIN_LO, zz[0]), C = pv(XL, WIN_LO, zz[1]);
    return [D, C, [C[0] + SLANT * (FLOOR - C[1]), FLOOR], [D[0] + SLANT * (FLOOR - D[1]), FLOOR]];
  });
  /* the continuous under-texture: density waves rolling DOWN the shafts, faster
     and brighter as the hall fills with light. This never stops. */
  const bandSpd = 13 + 8 * fill;

  /* the cross-passages — proof the hall keeps going sideways */
  const gz0 = BZ(GAPL[0]), gz1 = BZ(GAPL[GAPL.length - 1] + 1);
  const gLit = clamp01((frontZ - gz1) * 1.3) * glow;
  const rz0 = BZ(GAPR[0]), rz1 = BZ(GAPR[GAPR.length - 1] + 1);
  const rLit = clamp01((frontZ - rz1) * 1.1) * glow;

  return (
    <>
      <svg viewBox="0 0 1012 792" width={1012} height={792} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <linearGradient id="s5floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5B4926" /><stop offset="0.45" stopColor="#3B2F1B" /><stop offset="1" stopColor="#241B0E" />
          </linearGradient>
          <radialGradient id="s5haze" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F5CB80" stopOpacity="0.85" /><stop offset="0.55" stopColor="#E0A855" stopOpacity="0.34" />
            <stop offset="1" stopColor="#D89C4A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s5pool" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFDE9B" stopOpacity="0.95" /><stop offset="1" stopColor="#F5C87C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s5flare" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#FFF3D4" stopOpacity="0.95" /><stop offset="0.5" stopColor="#FFD98F" stopOpacity="0.35" />
            <stop offset="1" stopColor="#FFD98F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s5goldglow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F0B84E" stopOpacity="0.55" /><stop offset="1" stopColor="#F0B84E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="s5cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFDE9C" stopOpacity="0.62" /><stop offset="1" stopColor="#FFDE9C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s5shaft" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#FFDFA0" stopOpacity="0.34" /><stop offset="0.6" stopColor="#FFD79A" stopOpacity="0.14" />
            <stop offset="1" stopColor="#FFD79A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="s5band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE7B4" stopOpacity="0" /><stop offset="0.5" stopColor="#FFEDC6" stopOpacity="0.62" />
            <stop offset="1" stopColor="#FFE7B4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="s5slot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD692" stopOpacity="0.95" /><stop offset="1" stopColor="#8A6122" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="s5vig" cx="0.5" cy="0.46" r="0.76">
            <stop offset="0.42" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.66" />
          </radialGradient>
          {shafts.map((sh, i) => (
            <clipPath key={`s5cl${i}`} id={`s5cl${i}`}><polygon points={ps(...sh)} /></clipPath>
          ))}
        </defs>

        {/* ---- PLANE 6: the hall shell (wall above the racks + the slab) ------ */}
        <Room wall1="#4B3616" wall2="#150D04" floor1="#3D3120" floor2="#140E05" floorY={400} />
        {/* the hall above the racking lifts as the chain fills the volume */}
        <rect x={0} y={0} width={1012} height={RACK_TOP + 40} fill="#C89A4A" opacity={0.04 + 0.30 * fill * sag} />

        {/* ---- the FAR GABLE: corrugated ribs, a roller shutter, a high vent.
             It is black until the chain's last fittings reach it. ------------- */}
        {(() => {
          const z = 9.9, l = litAt(z);
          const xa = PX(XL, z), xb = PX(XR, z), w = xb - xa;
          const yb = PY(FLOOR, z), yt = PY(CEIL + M(0.8), z);
          const wall = lc(l, [0x1c, 0x15, 0x0a], [0x8e, 0x6c, 0x31]);
          const sh = lc(l, [0x14, 0x0e, 0x06], [0x5c, 0x45, 0x1e]);
          const sx0 = xa + w * 0.30, sx1 = xa + w * 0.72, sy0 = yb - (yb - yt) * 0.46;
          return (
            <g>
              <rect x={xa} y={yt} width={w} height={yb - yt} fill={wall} />
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={i} x1={xa + (w * (i + 0.5)) / 13} y1={yt} x2={xa + (w * (i + 0.5)) / 13} y2={yb}
                      stroke="#0D0904" strokeWidth={0.9} opacity={0.5} />
              ))}
              <rect x={sx0} y={sy0} width={sx1 - sx0} height={yb - sy0} fill={sh} />
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={i} x1={sx0} y1={sy0 + ((yb - sy0) * (i + 1)) / 7} x2={sx1} y2={sy0 + ((yb - sy0) * (i + 1)) / 7}
                      stroke="#0A0603" strokeWidth={0.8} opacity={0.75} />
              ))}
              <rect x={xa + w * 0.09} y={yt + 4} width={w * 0.17} height={7} fill="#0C0804" opacity={0.85} />
              <rect x={xa + w * 0.09} y={yt + 4} width={w * 0.17} height={7} fill="#C79A50" opacity={l * 0.5} />
            </g>
          );
        })()}

        {truss}

        {/* ---- the overhead CROSS-GANTRY: a mesh deck and a handrail crossing
             the hall high up, hung under the trusses ------------------------- */}
        {(() => {
          const p = P(CWZ), y = PY(CEIL + M(1.35), CWZ), hw = HALL * p;
          const l = litAt(CWZ) * 0.8, c = lc(l, [0x24, 0x1a, 0x0c], [0x8e, 0x6d, 0x32]);
          const railY = y - M(0.65) * p, dh = Math.max(3, 13 * p);
          return (
            <g>
              <rect x={VPX - hw} y={y} width={hw * 2} height={dh} fill={c} />
              <rect x={VPX - hw} y={y + dh} width={hw * 2} height={Math.max(1, 4 * p)} fill="#120C05" />
              <line x1={VPX - hw} y1={railY} x2={VPX + hw} y2={railY} stroke={c} strokeWidth={Math.max(1, 4 * p)} />
              {Array.from({ length: 13 }).map((_, i) => {
                const x = VPX - hw + (hw * 2 * i) / 12;
                return <line key={i} x1={x} y1={railY} x2={x} y2={y} stroke={c} strokeWidth={Math.max(0.8, 2.6 * p)} opacity={0.8} />;
              })}
            </g>
          );
        })()}

        {/* ---- the sprinkler main + its drop heads, running down the roof ----- */}
        {(() => {
          const Y = CEIL + M(1.05), Xp = VPX + M(1.55), l = litAt(2.4) * 0.7;
          const c = lc(l, [0x2b, 0x20, 0x0e], [0x9a, 0x74, 0x33]);
          const a = pv(Xp, Y, 1.5), b = pv(Xp, Y, 9.0);
          return (
            <g>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={Math.max(1, 9 * P(1.5))} strokeLinecap="round" />
              {[1.7, 2.15, 2.8, 3.7, 5.0, 6.9].map((z, i) => {
                const q = pv(Xp, Y, z), p2 = P(z);
                return (
                  <g key={i}>
                    <line x1={q[0]} y1={q[1]} x2={q[0]} y2={q[1] + M(0.24) * p2} stroke={c} strokeWidth={Math.max(0.8, 3.2 * p2)} />
                    <circle cx={q[0]} cy={q[1] + M(0.26) * p2} r={Math.max(1, 5 * p2)} fill={c} />
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* ---- the wall conduit above the left racking, with its clamps ------- */}
        {(() => {
          const Y = RACK_TOP - M(0.28), l = litAt(1.6) * 0.85;
          const c = lc(l, [0x2e, 0x22, 0x10], [0xa6, 0x7f, 0x39]);
          const a = pv(XL, Y, 0), b = pv(XL, Y, 9.4);
          return (
            <g>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={5} strokeLinecap="round" />
              <line x1={a[0]} y1={a[1] + 9} x2={b[0]} y2={b[1] + 4} stroke={c} strokeWidth={2.6} opacity={0.75} />
              {[0.3, 0.9, 1.7, 2.9, 4.6].map((z, i) => {
                const q = pv(XL, Y, z), p2 = P(z);
                return <rect key={i} x={q[0] - 3} y={q[1] - 4} width={Math.max(2, 9 * p2)} height={Math.max(3, 15 * p2)} fill="#1B1408" opacity={0.9} />;
              })}
            </g>
          );
        })()}

        {/* ---- two chains hung off the gantry, one swaying — ambient ---------- */}
        {[[VPX - 214, sway1, 1.5], [VPX + 96, sway2, 1.15]].map((q, i) => {
          const x = q[0] as number, sw = q[1] as number, len = q[2] as number;
          const p = P(CWZ), y0 = PY(CEIL + M(1.35), CWZ) + 6, y1 = y0 + M(len) * p;
          const l = litAt(CWZ) * 0.7, c = lc(l, [0x22, 0x19, 0x0b], [0x7e, 0x60, 0x2c]);
          return (
            <g key={`s5ch${i}`}>
              <line x1={x} y1={y0} x2={x + sw} y2={y1} stroke={c} strokeWidth={2.4} strokeDasharray="3 3" />
              <path d={`M${x + sw} ${y1} q6 3 0 8 q-6 3 -3 -3`} fill="none" stroke={c} strokeWidth={2.4} />
            </g>
          );
        })}

        {/* ---- birds in the roof space; the chain startles them upward -------- */}
        {Array.from({ length: 3 }).map((_, i) => {
          const s = seed(i * 6.1 + 4), t = lf / (52 + s * 26) + s * 6.3;
          const startle = clamp01((lf - 70) / 18);
          const bx = 296 + s * 360 + Math.cos(t) * 84;
          const by = 198 + Math.sin(t * 1.4) * 14 - startle * 28;
          const w = 7 + s * 3, fl = Math.sin(lf * 0.5 + i * 2.2) * 0.5 + 0.5;
          return (
            <path key={`s5bird${i}`}
                  d={`M${bx - w} ${by + fl * 3.2} Q${bx - w * 0.4} ${by - 2.6} ${bx} ${by} Q${bx + w * 0.4} ${by - 2.6} ${bx + w} ${by + fl * 3.2}`}
                  fill="none" stroke="#130E07" strokeWidth={2} opacity={0.5} />
          );
        })}

        {/* the aisle vanishes into ochre haze — and the haze OPENS as the chain
            reaches the far bays: the single biggest area change in the scene */}
        <ellipse cx={VPX} cy={VPY + 24} rx={168 + 232 * fill} ry={96 + 128 * fill}
                 fill="url(#s5haze)" opacity={(0.45 + 0.55 * fill) * (0.25 + 0.75 * die)} />

        {/* ---- the concrete slab of the aisle -------------------------------- */}
        <polygon points={ps(pv(XL, FLOOR, 0), pv(XL, FLOOR, 11), pv(XR, FLOOR, 11), pv(XR, FLOOR, 0))} fill="url(#s5floor)" />
        <polygon points={ps(pv(XL, FLOOR, 0), pv(XL, FLOOR, 11), pv(XR, FLOOR, 11), pv(XR, FLOOR, 0))}
                 fill="#E8BB68" opacity={0.05 + 0.40 * fill * sag} />
        {[270, 380, 519, 658, 768].map((X) => (
          <line key={`s5j${X}`} x1={PX(X, 0)} y1={PY(FLOOR, 0)} x2={PX(X, 11)} y2={PY(FLOOR, 11)} stroke="#1D1509" strokeWidth={2.5} opacity={0.55} />
        ))}
        {[0.42, 1.26, 2.5, 4.2, 6.6].map((z) => (
          <line key={`s5x${z}`} x1={PX(XL, z)} y1={PY(FLOOR, z)} x2={PX(XR, z)} y2={PY(FLOOR, z)} stroke="#1D1509" strokeWidth={Math.max(1, 3 * P(z))} opacity={0.5} />
        ))}

        {/* worn yellow aisle lines, laid as scuffed dashes so they taper ------- */}
        {[XL + M(0.42), XR - M(0.42)].map((X, si) => (
          <g key={`s5ay${si}`}>
            {Array.from({ length: 11 }).map((_, k) => {
              const za = k * 0.78, zb = za + 0.5, p2 = P(za);
              const a = pv(X, FLOOR, za), b = pv(X, FLOOR, zb);
              if (seed(k * 2.7 + si * 5) < 0.14) return null;   // worn away in patches
              return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#A98035"
                           strokeWidth={Math.max(1, 7 * p2)} opacity={(0.22 + 0.34 * glow) * (0.7 + seed(k * 1.3) * 0.3)} />;
            })}
          </g>
        ))}
        {/* the hatched marshalling zone near camera, left of the aisle -------- */}
        {Array.from({ length: 6 }).map((_, i) => {
          const a = pv(XL + 24 + i * 46, FLOOR, 0.06), b = pv(XL + 92 + i * 46, FLOOR, 0.5);
          return <line key={`s5hz${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#9A7430" strokeWidth={6}
                       opacity={0.16 + 0.22 * glow} />;
        })}
        {/* an old oil stain under the parked forklift + a drip puddle --------- */}
        <ellipse cx={432} cy={472} rx={44} ry={11} fill="#100B05" opacity={0.55} />
        <ellipse cx={412} cy={476} rx={20} ry={6} fill="#100B05" opacity={0.4} />
        <ellipse cx={252} cy={742} rx={21} ry={7} fill="#241A0C" opacity={0.75} />
        <ellipse cx={252} cy={741} rx={15} ry={4.4} fill="#C79A4E" opacity={0.10 + 0.22 * glow} />
        {ripple >= 0 && (
          <ellipse cx={252} cy={742} rx={5 + ripple * 17} ry={(5 + ripple * 17) * 0.32} fill="none"
                   stroke="#E4C079" strokeWidth={1.4} opacity={(1 - ripple) * 0.42} />
        )}
        {dripFall >= 0 && (
          <ellipse cx={252} cy={430 + dripFall * 310} rx={2.2} ry={4.6} fill="#E8CE9A" opacity={0.5} />
        )}

        {pools}
        {(() => {
          const zf = Math.min(frontZ, 9.2), zb2 = zf + 0.40;
          const a = (0.35 + 0.65 * glow) * 0.72 * die;
          if (a < 0.02) return null;
          return (
            <g>
              <polygon points={ps(pv(XL, FLOOR, zf), pv(XL, FLOOR, zb2), pv(XR, FLOOR, zb2), pv(XR, FLOOR, zf))}
                       fill="#FFDE9E" opacity={a * 0.5} />
              <polygon points={ps(pv(XL, FLOOR, zf - 0.34), pv(XL, FLOOR, zf), pv(XR, FLOOR, zf), pv(XR, FLOOR, zf - 0.34))}
                       fill="#FFF0C8" opacity={a * 0.8} />
            </g>
          );
        })()}

        {/* ---- PLANE 5: the compressed far mass, then the drawn rack banks ---- */}
        {[XL, XR].map((X, i) => (
          <g key={`s5f${i}`}>
            {/* the dark interior of the racking, so the gaps between decks read
                as rack shadow rather than as the wall behind it */}
            <polygon points={ps(pv(X, RACK_TOP, 0), pv(X, RACK_TOP, BZ(NB)), pv(X, FLOOR, BZ(NB)), pv(X, FLOOR, 0))} fill="#191207" />
            <polygon points={ps(pv(X, RACK_TOP, BZ(NB)), pv(X, RACK_TOP, 11), pv(X, FLOOR, 11), pv(X, FLOOR, BZ(NB)))}
                     fill={lc(litAt(7.4), [0x24, 0x1b, 0x0d], [0x92, 0x71, 0x33])} />
            {[5.9, 6.4, 7.0, 7.7, 8.6, 9.7].map((z) => (
              <line key={z} x1={PX(X, z)} y1={PY(RACK_TOP, z)} x2={PX(X, z)} y2={PY(FLOOR, z)} stroke="#150F06" strokeWidth={1.4} />
            ))}
          </g>
        ))}
        {roof}

        {/* the MEZZANINE above the right bank: fascia, handrail, posts, ladder,
            and a small indicator that blinks once its strip light kicks in */}
        {(() => {
          const z0 = 2.3, z1 = 6.4, l = litAt(3.6) * 0.9;
          const c = lc(l, [0x27, 0x1d, 0x0e], [0x93, 0x71, 0x34]);
          const A = pv(XR, MEZ_Y, z0), B = pv(XR, MEZ_Y, z1);
          const A2 = pv(XR, MEZ_Y + M(0.26), z0), B2 = pv(XR, MEZ_Y + M(0.26), z1);
          const R0 = pv(XR, MEZ_Y - M(0.95), z0), R1 = pv(XR, MEZ_Y - M(0.95), z1);
          const lz = 6.2, L0 = pv(XR, FLOOR, lz), L1 = pv(XR, MEZ_Y, lz);
          return (
            <g>
              <polygon points={ps(A, B, B2, A2)} fill={c} />
              <polygon points={ps(A, B, [B[0], B[1] - 2.5], [A[0], A[1] - 3.5])} fill="#D6AA5C" opacity={0.14 + l * 0.5} />
              <line x1={R0[0]} y1={R0[1]} x2={R1[0]} y2={R1[1]} stroke={c} strokeWidth={2.6} />
              {Array.from({ length: 7 }).map((_, i) => {
                const z = z0 + ((z1 - z0) * i) / 6;
                const a = pv(XR, MEZ_Y, z), b = pv(XR, MEZ_Y - M(0.95), z);
                return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={1.8} opacity={0.85} />;
              })}
              {/* the access ladder down to the slab */}
              <line x1={L0[0] - 5} y1={L0[1]} x2={L1[0] - 5} y2={L1[1]} stroke={c} strokeWidth={1.6} />
              <line x1={L0[0] + 3} y1={L0[1]} x2={L1[0] + 3} y2={L1[1]} stroke={c} strokeWidth={1.6} />
              {Array.from({ length: 7 }).map((_, i) => {
                const y = L0[1] + ((L1[1] - L0[1]) * (i + 1)) / 8;
                return <line key={i} x1={L0[0] - 5} y1={y} x2={L0[0] + 3} y2={y} stroke={c} strokeWidth={1.2} opacity={0.9} />;
              })}
              {/* the strip light under the deck — a persistent result */}
              <rect x={B[0]} y={(A[1] + B[1]) / 2 + 3} width={A[0] - B[0]} height={2.6} fill="#FFE3A6" opacity={mezOn * 0.55} />
              <circle cx={A[0] - 12} cy={R0[1] + 8} r={2.4} fill="#FFD98F" opacity={mezOn * blink * 0.9} />
            </g>
          );
        })()}

        {/* the cross-passages: lit slots through the banks, so the hall visibly
            keeps going sideways once the front reaches them */}
        <polygon points={ps(pv(XR, RACK_TOP, rz0), pv(XR, RACK_TOP, rz1), pv(XR, FLOOR, rz1), pv(XR, FLOOR, rz0))} fill="#0D0904" />
        {rLit > 0.02 && (
          <polygon points={ps(pv(XR, RACK_TOP + 20, rz0), pv(XR, RACK_TOP + 20, rz1), pv(XR, FLOOR, rz1), pv(XR, FLOOR, rz0))}
                   fill="url(#s5slot)" opacity={rLit * 0.6} />
        )}
        <polygon points={ps(pv(XL, RACK_TOP, gz0), pv(XL, RACK_TOP, gz1), pv(XL, FLOOR, gz1), pv(XL, FLOOR, gz0))} fill="#0E0A04" />
        {/* a stuttering fluorescent burning down the side aisle — the only light
            in the depth at f0, and pure ambient life: dim, small, soft */}
        {(() => {
          const zm = (gz0 + gz1) / 2, a = pv(XL, RACK_TOP + M(0.5), gz0), b = pv(XL, RACK_TOP + M(0.5), gz1);
          return (
            <g opacity={die}>
              <line x1={a[0] + 4} y1={a[1]} x2={b[0] - 4} y2={b[1]} stroke="#FFE2A4" strokeWidth={4} opacity={0.34 * flick} />
              <line x1={a[0] + 4} y1={a[1]} x2={b[0] - 4} y2={b[1]} stroke="#FFE2A4" strokeWidth={11} opacity={0.10 * flick} />
              <polygon points={ps(pv(XL, RACK_TOP + M(0.9), gz0), pv(XL, RACK_TOP + M(0.9), gz1), pv(XL, FLOOR, gz1), pv(XL, FLOOR, gz0))}
                       fill="#C08F3E" opacity={0.10 * flick} />
              <line x1={PX(XL, zm)} y1={PY(RACK_TOP + 30, zm)} x2={PX(XL, zm)} y2={PY(FLOOR, zm)} stroke="#241A0B" strokeWidth={5} opacity={0.8} />
            </g>
          );
        })()}
        {gLit > 0.02 && (
          <>
            <polygon points={ps(pv(XL, RACK_TOP + 26, gz0), pv(XL, RACK_TOP + 26, gz1), pv(XL, FLOOR, gz1), pv(XL, FLOOR, gz0))}
                     fill="url(#s5slot)" opacity={gLit * 0.85} />
            <line x1={PX(XL, (gz0 + gz1) / 2)} y1={PY(RACK_TOP + 40, (gz0 + gz1) / 2)}
                  x2={PX(XL, (gz0 + gz1) / 2)} y2={PY(FLOOR, (gz0 + gz1) / 2)} stroke="#3A2A11" strokeWidth={4} opacity={gLit} />
          </>
        )}
        {crates}

        {/* a canvas tarpaulin bundled over the left rack's top deck, one corner
            lifting in the draught — ambient, tiny amplitude */}
        {(() => {
          const tz0 = BZ(2), tz1 = BZ(5), l = litAt((tz0 + tz1) / 2);
          const lift = Math.sin(lf / 17) * 4;
          const A = pv(XL, RACK_TOP - M(0.55), tz0), B = pv(XL, RACK_TOP - M(0.7), tz1);
          const C = pv(XL, RACK_TOP + M(0.85), tz1), D = pv(XL, RACK_TOP + M(0.95), tz0);
          const c = lc(l, [0x35, 0x2c, 0x18], [0x9b, 0x83, 0x4a]);
          const hi = lc(l, [0x42, 0x37, 0x1e], [0xc0, 0xa1, 0x5c]);
          return (
            <g>
              <path d={`M${ps(A)} L${ps(B)} L${ps(C)} L${D[0].toFixed(1)},${(D[1] + lift).toFixed(1)} Z`} fill={c} />
              <path d={`M${ps(A)} L${ps(B)} L${B[0].toFixed(1)},${(B[1] + 8).toFixed(1)} L${A[0].toFixed(1)},${(A[1] + 12).toFixed(1)} Z`} fill={hi} />
              {[0.3, 0.56, 0.8].map((t, i) => {
                const a = lp(A, B, t), b = lp(D, C, t);
                return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1] + (t > 0.7 ? 0 : lift * 0.3)} stroke="#20190D" strokeWidth={1.6} opacity={0.7} />;
              })}
              <line x1={D[0]} y1={D[1] + lift} x2={D[0] + 14} y2={D[1] + 26 + lift} stroke="#2A2112" strokeWidth={1.6} />
            </g>
          );
        })()}

        {/* two access ladders bolted to the rack uprights ---------------------- */}
        {[[XL, 0.42, 0.56], [XR, 1.0, 1.14]].map((q, i) => {
          const X = q[0] as number, za = q[1] as number, zb = q[2] as number;
          const l = litAt((za + zb) / 2), c = lc(l, [0x30, 0x25, 0x12], [0xb0, 0x88, 0x3d]);
          const rungs: React.ReactNode[] = [];
          for (let Yw = FLOOR - 40; Yw > RACK_TOP; Yw -= M(0.32)) {
            const a = pv(X, Yw, za), b = pv(X, Yw, zb);
            rungs.push(<line key={Yw} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={2} opacity={0.9} />);
          }
          const t0 = pv(X, RACK_TOP - 18, za), t1 = pv(X, RACK_TOP - 18, zb);
          const f0 = pv(X, FLOOR, za), f1 = pv(X, FLOOR, zb);
          return (
            <g key={`s5ld${i}`}>
              <line x1={t0[0]} y1={t0[1]} x2={f0[0]} y2={f0[1]} stroke={c} strokeWidth={2.6} />
              <line x1={t1[0]} y1={t1[1]} x2={f1[0]} y2={f1[1]} stroke={c} strokeWidth={2.6} />
              {rungs}
            </g>
          );
        })}

        {/* ---- the parked FORKLIFT, nosed out of the left cross-passage -------
             a dead-still mass: it silhouettes against the opening haze and stays
             revealed once the chain has passed it. */}
        {(() => {
          const z = 2.1, p = P(z), gy = PY(FLOOR, z);
          const w = M(2.6) * p, h = M(2.3) * p, cx = 424, x0 = cx - w / 2;
          const l = litAt(z) * 0.5;
          const body = lc(l, [0x11, 0x0d, 0x08], [0x3e, 0x2e, 0x13]);
          const edge = lc(litAt(z), [0x36, 0x29, 0x14], [0xc2, 0x97, 0x44]);
          const mx = x0 + w * 0.80;
          return (
            <g>
              {/* counterweight body + engine deck */}
              <path d={`M${x0} ${gy - h * 0.30} L${x0 + w * 0.06} ${gy - h * 0.52} L${x0 + w * 0.48} ${gy - h * 0.52}
                        L${x0 + w * 0.52} ${gy - h * 0.30} L${x0 + w * 0.66} ${gy - h * 0.30} L${x0 + w * 0.66} ${gy - h * 0.06}
                        L${x0} ${gy - h * 0.06} Z`} fill={body} />
              {/* seat + backrest */}
              <path d={`M${x0 + w * 0.30} ${gy - h * 0.52} L${x0 + w * 0.30} ${gy - h * 0.72} L${x0 + w * 0.42} ${gy - h * 0.72}
                        L${x0 + w * 0.42} ${gy - h * 0.52} Z`} fill={body} />
              {/* overhead guard: four posts + roof */}
              <rect x={x0 + w * 0.20} y={gy - h} width={w * 0.62} height={h * 0.07} fill={body} />
              <rect x={x0 + w * 0.22} y={gy - h} width={w * 0.045} height={h * 0.5} fill={body} />
              <rect x={x0 + w * 0.60} y={gy - h} width={w * 0.045} height={h * 0.52} fill={body} />
              {/* mast: two rails + carriage */}
              <rect x={mx} y={gy - h * 0.98} width={w * 0.045} height={h * 0.92} fill={body} />
              <rect x={mx + w * 0.075} y={gy - h * 0.98} width={w * 0.045} height={h * 0.92} fill={body} />
              <rect x={mx - w * 0.01} y={gy - h * 0.44} width={w * 0.14} height={h * 0.07} fill={body} />
              {/* forks */}
              <path d={`M${mx + w * 0.04} ${gy - h * 0.40} L${mx + w * 0.06} ${gy - h * 0.40} L${mx + w * 0.06} ${gy - h * 0.045}
                        L${mx + w * 0.30} ${gy - h * 0.045} L${mx + w * 0.30} ${gy - h * 0.005} L${mx + w * 0.04} ${gy - h * 0.005} Z`} fill={body} />
              {/* wheels */}
              <circle cx={x0 + w * 0.16} cy={gy - h * 0.10} r={h * 0.115} fill="#0E0A06" />
              <circle cx={x0 + w * 0.66} cy={gy - h * 0.085} r={h * 0.095} fill="#0E0A06" />
              {/* the key catches the left/top edges only */}
              <rect x={x0 + w * 0.20} y={gy - h} width={w * 0.62} height={3} fill={edge} opacity={0.85} />
              <rect x={x0 + w * 0.06} y={gy - h * 0.52} width={w * 0.42} height={3} fill={edge} opacity={0.8} />
              <rect x={x0} y={gy - h * 0.30} width={3} height={h * 0.25} fill={edge} opacity={0.7} />
              <rect x={x0 + w * 0.22} y={gy - h} width={3} height={h * 0.5} fill={edge} opacity={0.55} />
              <rect x={mx} y={gy - h * 0.98} width={3} height={h * 0.92} fill={edge} opacity={0.6} />
              <ellipse cx={cx} cy={gy + 2} rx={w * 0.52} ry={h * 0.06} fill="#0A0704" opacity={0.55} />
            </g>
          );
        })()}

        {/* the wash edge where the lit volume ends — it sweeps the racks smoothly */}
        {[XL, XR].map((X, i) => {
          const zf = Math.min(frontZ, 5.2);
          const a = (0.35 + 0.65 * glow) * 0.72 * die;
          if (a < 0.02) return null;
          return (
            <polygon key={`s5we${i}`}
                     points={ps(pv(X, RACK_TOP, zf - 0.3), pv(X, RACK_TOP, zf + 0.12), pv(X, FLOOR, zf + 0.12), pv(X, FLOOR, zf - 0.3))}
                     fill="#FFE3A4" opacity={a * (i === 0 ? 0.5 : 0.34)} />
          );
        })}

        {/* gold halo behind the four TESTED crates (they are self-luminous) */}
        {[0, 1, 2, 3].map((k) => {
          const za = BZ(k), zb = BZ(k + 1);
          const cx = (PX(XL, za) + PX(XL, zb)) / 2;
          const cy = (PY(DECKS[1] - CRATE, za) + PY(DECKS[1], zb)) / 2;
          const br = 1 + 0.22 * Math.sin(lf / 7 - k * 1.1);
          const r = Math.max(26, (PX(XL, zb) - PX(XL, za)) * 1.7) * br;
          return <ellipse key={`s5g${k}`} cx={cx} cy={cy} rx={r} ry={r * 0.95} fill="url(#s5goldglow)" opacity={0.72 + 0.28 * br} />;
        })}

        {/* rack uprights + deck beams, near bays only (they carry the silhouette) */}
        {[XL, XR].map((X, i) => (
          <g key={`s5b${i}`}>
            {[RACK_TOP, DECKS[1], DECKS[2]].map((Y) => (
              <polygon key={Y} points={ps(pv(X, Y - 9, 0), pv(X, Y - 9, BZ(NB)), pv(X, Y + 3, BZ(NB)), pv(X, Y + 3, 0))}
                       fill={lc(litAt(0.9), [0x4a, 0x38, 0x1a], [0xc0, 0x93, 0x42])} />
            ))}
            <polygon points={ps(pv(X, FLOOR - 26, 0), pv(X, FLOOR - 26, BZ(NB)), pv(X, FLOOR, BZ(NB)), pv(X, FLOOR, 0))} fill="#1B1408" />
          </g>
        ))}

        {/* ---- PLANE 2: the near-left rack's small print — the stuff a viewer
             only finds on a second watch: a stencilled aisle plate, a taped
             notice with its contents redacted, an enamel mug, rust and tape --- */}
        {(() => {
          const l = litAt(0.3);
          const plate = lc(l, [0x6a, 0x5c, 0x3c], [0xd9, 0xc4, 0x8e]);
          return (
            <g>
              {/* aisle plate */}
              <rect x={186} y={252} width={62} height={42} rx={3} fill={plate} />
              <rect x={186} y={252} width={62} height={5} fill="#F0DCA8" opacity={0.35 + l * 0.5} />
              <text x={217} y={285} textAnchor="middle"
                    style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 27, letterSpacing: 1, fill: "#221805" }}>04</text>
              <rect x={214} y={294} width={6} height={16} fill="#241A0B" />
              {/* the taped notice — redacted bars only, never legible rules */}
              <g transform={`rotate(${(-2 + Math.sin(lf / 23) * 0.8).toFixed(2)} 226 342)`}>
                <rect x={196} y={316} width={62} height={52} fill={lc(l, [0x5c, 0x51, 0x36], [0xcf, 0xbd, 0x8c])} />
                {[0, 1, 2, 3].map((r) => (
                  <rect key={r} x={202} y={324 + r * 11} width={r === 3 ? 30 : 50} height={5} fill="#2C2313" opacity={0.7} />
                ))}
                <rect x={214} y={312} width={26} height={7} fill="#E4D8B4" opacity={0.55} />
              </g>
              {/* enamel mug left on the middle deck beam */}
              <g>
                <rect x={206} y={392} width={15} height={16} rx={2} fill={lc(l, [0x5e, 0x53, 0x38], [0xd2, 0xc0, 0x8c])} />
                <path d="M221 396 q7 4 0 8" fill="none" stroke={lc(l, [0x5e, 0x53, 0x38], [0xd2, 0xc0, 0x8c])} strokeWidth={2.4} />
                <rect x={206} y={392} width={15} height={3} fill="#F0E4BE" opacity={0.4 + l * 0.4} />
              </g>
              {/* rust streaks and a taped patch down the near upright */}
              {[[176, 300, 4, 62], [178, 430, 3, 48], [175, 560, 5, 40]].map((q, i) => (
                <rect key={`s5ru${i}`} x={q[0]} y={q[1]} width={q[2]} height={q[3]} fill="#7A4A22" opacity={0.28 + l * 0.2} />
              ))}
              <rect x={172} y={498} width={16} height={22} fill="#9A8A62" opacity={0.30} />
            </g>
          );
        })()}

        {/* ---- the clerestory windows: the one motivated source -------------- */}
        {winZ.map((zz, i) => {
          const A = pv(XL, WIN_HI, zz[0]), B = pv(XL, WIN_HI, zz[1]);
          const C = pv(XL, WIN_LO, zz[1]), D = pv(XL, WIN_LO, zz[0]);
          return (
            <g key={`s5w${i}`}>
              <polygon points={ps(A, B, C, D)} fill="#F6DFA6" opacity={0.92 - i * 0.12} />
              <polygon points={ps(lp(A, D, 0.44), lp(B, C, 0.44), lp(B, C, 0.56), lp(A, D, 0.56))} fill="#8A6E38" opacity={0.7} />
              <polygon points={ps(lp(A, B, 0.48), lp(D, C, 0.48), lp(D, C, 0.54), lp(A, B, 0.54))} fill="#8A6E38" opacity={0.7} />
            </g>
          );
        })}

        {lamps}

        {/* ---- the dust shafts (air, so they sit over the racking) ------------ */}
        {shafts.map((sh, i) => (
          <polygon key={`s5sh${i}`} points={ps(...sh)} fill="url(#s5shaft)"
                   opacity={[1, 0.76, 0.52, 0.26, 0.17][i] * (0.72 + 0.5 * fill)}
                   style={{ mixBlendMode: "screen" }} />
        ))}
        {/* CONTINUOUS MOVER — dust density rolling down the near shafts */}
        {shafts.slice(0, 3).map((_, i) => {
          const y1 = ((lf * bandSpd + i * 300) % 1240) - 300;
          const y2 = ((lf * bandSpd * 0.72 + i * 190 + 620) % 1240) - 300;
          return (
            <g key={`s5bd${i}`} clipPath={`url(#s5cl${i})`} style={{ mixBlendMode: "screen" }}>
              <rect x={0} y={y1} width={1012} height={252} fill="url(#s5band)" opacity={(0.78 + 0.6 * fill) * (1 - i * 0.16)} />
              <rect x={0} y={y2} width={1012} height={170} fill="url(#s5band)" opacity={(0.52 + 0.5 * fill) * (1 - i * 0.16)} />
            </g>
          );
        })}

        {/* heavy dust drifting through the shafts — texture, never the event */}
        {Array.from({ length: 112 }).map((_, i) => {
          const s = seed(i * 3.7 + 2), s2 = seed(i * 1.9 + 11);
          const spd = 1.6 + s * 2.6;
          const y = ((s2 * 940 + lf * spd) % 940) - 90;
          const x = 96 + s * 700 + (y + 90) * 0.30 + Math.sin(lf / 21 + i * 1.7) * 13;
          const r = (2.0 + s2 * 3.8) * (0.85 + 0.3 * fill);
          const inBeam = clamp01(1.3 - Math.abs(x - 430) / 340);
          return <circle key={`s5d${i}`} cx={x} cy={y} r={r} fill="#FFE9BC"
                         opacity={(0.22 + s * 0.45) * (0.45 + 0.55 * fill) * (0.3 + 0.7 * inBeam)} />;
        })}

        {/* chains of the hanging tally */}
        <line x1={SG.x + 34} y1={0} x2={SG.x + 34} y2={SG.y + jolt} stroke="#2A1F0E" strokeWidth={5} />
        <line x1={SG.x + SG.w - 34} y1={0} x2={SG.x + SG.w - 34} y2={SG.y + jolt} stroke="#2A1F0E" strokeWidth={5} />

        {/* ---- PLANE 1: the foreground rack end-panels, near black ----------- */}
        {[0, 1].map((i) => {
          const x0 = i === 0 ? 0 : XR, w = i === 0 ? XL : 1012 - XR;
          return (
            <g key={`s5e${i}`}>
              <rect x={x0} y={RACK_TOP} width={w} height={FLOOR - RACK_TOP} fill="#120D06" />
              <rect x={i === 0 ? XL - 16 : XR} y={RACK_TOP} width={16} height={FLOOR - RACK_TOP} fill="#241A0C" />
              {[RACK_TOP, DECKS[1], DECKS[2], FLOOR - 20].map((Y) => (
                <rect key={Y} x={x0} y={Y - 12} width={w} height={12} fill="#1E160A" />
              ))}
              <polygon points={ps([x0 + w * 0.12, RACK_TOP + 30], [x0 + w * 0.86, FLOOR - 60], [x0 + w * 0.78, FLOOR - 60], [x0 + w * 0.06, RACK_TOP + 34])} fill="#1B1409" />
            </g>
          );
        })}
        {/* a stack of empty pallets against the near-left rack — plane 1 */}
        {Array.from({ length: 7 }).map((_, i) => (
          <g key={`s5fp${i}`}>
            <rect x={4} y={FLOOR - 40 - i * 26} width={132} height={17} fill="#0E0A05" />
            <rect x={4} y={FLOOR - 40 - i * 26} width={132} height={4} fill="#231A0C" />
          </g>
        ))}

        {/* ---- PLANE 1 props: a fire extinguisher on the near-left panel, a
             sack barrow and a coiled hose on the near-right one, a broken slat
             on the slab. All near-black silhouettes; they crop the frame. ---- */}
        <g>
          {/* fire extinguisher, M(0.5) tall */}
          <rect x={104} y={652} width={32} height={M(0.5) - 22} rx={5} fill="#2A1409" />
          <rect x={104} y={652} width={5} height={M(0.5) - 22} fill="#4A2A12" />
          <rect x={112} y={640} width={13} height={14} fill="#241606" />
          <path d="M125 646 q22 8 12 34" fill="none" stroke="#241606" strokeWidth={5} />
          <rect x={104} y={690} width={32} height={7} fill="#160C05" />
          {/* sack barrow leaning on the near-right panel, M(1.3) tall */}
          <g>
            <path d="M946 546 L962 546 L976 752 L960 752 Z" fill="#161009" />
            <path d="M972 546 L986 546 L998 752 L984 752 Z" fill="#161009" />
            {[588, 636, 684].map((y) => (
              <rect key={y} x={950} y={y} width={44} height={7} fill="#1E1509" />
            ))}
            <path d="M958 752 L1008 752 L1008 764 L960 764 Z" fill="#1E1509" />
            <circle cx={966} cy={744} r={19} fill="#0C0805" />
            <circle cx={966} cy={744} r={7} fill="#1C1409" />
          </g>
          {/* a coiled hose hung on the near-right upright */}
          <path d="M886 358 a26 26 0 1 0 0.1 0" fill="none" stroke="#1B1409" strokeWidth={9} />
          <path d="M890 366 a18 18 0 1 0 0.1 0" fill="none" stroke="#1B1409" strokeWidth={8} />
          <rect x={878} y={340} width={10} height={16} fill="#241A0C" />
          {/* a broken pallet slat discarded on the slab */}
          <polygon points="612,776 704,762 712,770 620,786" fill="#171009" />
          <polygon points="612,776 704,762 706,765 614,779" fill="#2A2011" opacity={0.7} />
          <polygon points="726,784 764,776 766,782 728,790" fill="#171009" />
        </g>

        {/* near-field motes, drifting across the foreground silhouettes */}
        {Array.from({ length: 7 }).map((_, i) => {
          const s = seed(i * 8.3 + 5), s2 = seed(i * 4.7 + 1);
          const y = ((s2 * 900 + lf * (0.55 + s * 0.8)) % 900) - 60;
          const x = 30 + s * 950 + Math.sin(lf / 26 + i * 2.1) * 22;
          return <circle key={`s5nd${i}`} cx={x} cy={y} r={4 + s2 * 3.5} fill="#F7E2B0" opacity={0.06 + s * 0.09} />;
        })}

        <rect x={0} y={0} width={1012} height={792} fill="url(#s5vig)" />
      </svg>

      {/* ---- PLANE 4: the TESTER, dwarfed at the mouth of the aisle ---------- */}
      <Actor lf={lf} x={760} groundY={754} size={H} z={22} coat={1} headband={1} gaze={gaze} nodAmp={2.1} nodSpeed={14} />

      {/* ---- the hanging tally flips 04 TESTED → 46 UNTESTED ----------------- */}
      <div style={{ position: "absolute", left: 0, top: jolt, width: 1012, height: 792, zIndex: 34, pointerEvents: "none" }}>
        {Array.from({ length: COLS }).map((_, i) => {
          const cw = SG.w / COLS;
          const p = clamp01(over(lf, 92 + i * 2, 9));
          return (
            <div key={`s5fl${i}`} style={{ position: "absolute", left: SG.x + i * cw, top: SG.y, width: cw, height: SG.h, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: -i * cw, top: 0, width: SG.w, height: SG.h, transformOrigin: "50% 100%", transform: `scaleY(${(1 - Math.min(1, p * 2)).toFixed(3)})` }}>
                <TallyFace num="04" word="TESTED" hot />
              </div>
              <div style={{ position: "absolute", left: -i * cw, top: 0, width: SG.w, height: SG.h, transformOrigin: "50% 0%", transform: `scaleY(${Math.max(0, p * 2 - 1).toFixed(3)})` }}>
                <TallyFace num="46" word="UNTESTED" hot={false} />
              </div>
              <div style={{ position: "absolute", left: cw - 1, top: 0, width: 1, height: SG.h, background: "rgba(0,0,0,0.5)" }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: SG.x - 6, top: SG.y - 10, width: SG.w + 12, height: SG.h + 18, border: "5px solid #4E3B1B", borderRadius: 5, boxShadow: "0 20px 44px rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", left: SG.x - 14, top: SG.y - 17, width: SG.w + 28, height: 12, background: "#5A4520", borderRadius: 3 }} />
      </div>
    </>
  );
};
