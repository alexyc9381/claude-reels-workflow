import React from "react";
import { MONO } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, dark, mix, SH, SH_D, rnd,
  dkh, mxh, Beam, Strip, Motes, Pool, Rake, Contact,
  PLACES, asPlace, STEEL, STEELD, IRON, RUST, CREAM, CLAY, GOLD, GREEN, RED, TEAL,
  BayWall, Gantry, RigLeg,
} from "./RigWorld";
import type { Place } from "./RigWorld";

/* ===========================================================================
   REEL 114 · "SMART" — THE SETS.  Board: storyboards/114-smart.md.

   ONE bay, six lit zones. ⛔ "interiors all count as ONE place" (§9), so the
   thing that has to change every 2-4s is the LIGHT and the HUE, not the room —
   and neighbouring zones differ in BOTH hue and lightness. The zone table is in
   the board; the palettes are in RigWorld.PLACES.

   ⛔⛔ EVERY SET SHIPS WITH A `RigLeg` — the mass cropped by the panel edge, in
      front of the action. It is the one depth question the look gate cannot
      automate (§8: "is there a mass cropped by the panel edge, in front of the
      action? If not, the camera is pointed at a backdrop"), and ten reels
      shipped without one.

   ⛔ THE >=140 LUMA BAR IS FRAME 0 ONLY. `fitbay` is built bright and even there
      the brightness is carried by the SpecBoard prop; every other zone targets
      luma 70-105 with its dark stop untouched.
   ========================================================================= */

export type RigKey = keyof typeof PLACES;

/** the room shell: back wall, mid band, floor, skirting, drifting grit. */
export const Room: React.FC<{ p: Place; f: number; band?: React.ReactNode; ceiling?: boolean;
  gritN?: number }> = ({ p, f, band, ceiling = true, gritN = 24 }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: 6 }}>
    {band}
  </div>
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: 15 }} />
  {/* the floor's own plate seams — a bay floor is welded, and the seams give
      the ground plane something the greyscale audit can actually see */}
  {Array.from({ length: 5 }, (_, i) => (
    <div key={"sm" + i} style={{ position: "absolute", left: -60 + i * 246, top: p.horizon,
      bottom: 0, width: 4, zIndex: 15,
      background: hexa(dkh(p.floor2, 0.34), 0.6),
      transform: `skewX(${(i - 2) * 9}deg)` }} />
  ))}
  {Array.from({ length: gritN }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - f * 0.6) % 1180) - 60,
      top: p.horizon + 22 + ((i * 51) % 9) * 27,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.34, zIndex: 16 }} />
  ))}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 96, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.24)} 0%, ${hexa(dkh(p.back2, 0.24), 0)} 100%)` }} />
  )}
</>);

/** a bank of hanging work lamps — the practical that makes a dark bay read LIT
    without touching the palette's dark stop (§8's stated remedy). */
export const WorkLamps: React.FC<{ f: number; y?: number; n?: number; c?: string; on?: number;
  z?: number; x0?: number; pitch?: number }> =
  ({ f, y = 150, n = 4, c = "#F0DDB0", on = 1, z = 30, x0 = 150, pitch = 240 }) => (<>
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={"wl" + i}>
        <div style={{ position: "absolute", left: x0 + i * pitch - 2, top: y - 54, width: 4,
          height: 54, zIndex: z, background: hexa("#20242B", 0.8) }} />
        <Strip x={x0 + i * pitch} y={y} w={168} on={on} c={c} z={z} f={f + i * 13} />
      </React.Fragment>
    ))}
  </>);

/** the pallet stacks and drums that make a bay a working place, not a backdrop.
    ⛔ PROPS NEED REAL DRAWING (feedback_props_need_real_drawing): a drum here is
    a body + two rolling hoops + a lid ring + a bung + a stencil band, not a
    rounded rectangle. Count the divs per object before adding objects. */
export const BayClutter: React.FC<{ p: Place; f: number; z?: number; seed?: number;
  drums?: Array<[number, number, number]>; pallets?: Array<[number, number, number]> }> =
  ({ p, f, z = 20, seed = 3, drums = [], pallets = [] }) => (<>
    {pallets.map(([x, y, s], i) => (
      <div key={"pl" + i} style={{ position: "absolute", left: x, top: y, zIndex: z + (i % 3) }}>
        {Array.from({ length: 3 }, (_, j) => (
          <div key={"pb" + j} style={{ position: "absolute", left: 0, top: -j * 26 * s,
            width: 148 * s, height: 22 * s, borderRadius: 2,
            background: `linear-gradient(180deg, ${mxh(RUST, 0.14)}, ${dkh(RUST, 0.34)})`,
            boxShadow: SH }} />
        ))}
        {Array.from({ length: 4 }, (_, j) => (
          <div key={"pf" + j} style={{ position: "absolute", left: 6 * s + j * 44 * s, top: 18 * s,
            width: 18 * s, height: 16 * s, background: dkh(RUST, 0.48) }} />
        ))}
        <Contact x={x - 4} y={y + 34 * s} w={160 * s} o={0.30} z={z - 1} />
      </div>
    ))}
    {drums.map(([x, y, s], i) => (
      <div key={"dr" + i} style={{ position: "absolute", left: x, top: y, zIndex: z + 1 + (i % 3) }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 74 * s, height: 108 * s,
          borderRadius: `${34 * s}px ${34 * s}px 6px 6px / ${14 * s}px ${14 * s}px 6px 6px`,
          background: `linear-gradient(90deg, ${dkh(p.key, 0.52)}, ${dkh(p.key, 0.24)} 42%, ${dkh(p.key, 0.58)})`,
          boxShadow: SH }} />
        {[0.30, 0.62].map((k, j) => (
          <div key={"hp" + j} style={{ position: "absolute", left: -3 * s, top: k * 108 * s,
            width: 80 * s, height: 9 * s, borderRadius: 3,
            background: dkh(p.key, 0.66) }} />
        ))}
        <div style={{ position: "absolute", left: 4 * s, top: 2 * s, width: 66 * s, height: 16 * s,
          borderRadius: "50%", background: dkh(p.key, 0.36),
          border: `${2 * s}px solid ${dkh(p.key, 0.62)}` }} />
        <div style={{ position: "absolute", left: 42 * s, top: 5 * s, width: 13 * s, height: 9 * s,
          borderRadius: "50%", background: dkh(p.key, 0.70) }} />
        <div style={{ position: "absolute", left: 8 * s, top: 44 * s, width: 58 * s, height: 15 * s,
          background: hexa(mxh(p.key, 0.24), 0.20) }} />
        <Contact x={x - 4} y={y + 104 * s} w={84 * s} o={0.32} z={z} />
      </div>
    ))}
  </>);

/* =========================================================================
   ⭐⭐⭐ THE BRACE WALL — the reel's dense, on-topic SET.

   ANIMATION-QUALITY §1's single biggest measured lever is not an effect:
   *"a dense, correct SET (a wall of ~70 real objects instead of an empty room):
   7.68 -> 9.65"*, and *"the set is worth more than the effects. Build the right
   room before you add motion to the wrong one."*

   v2 of this reel measured a median of **5.39** with every scene sitting on a
   flat gradient wall plus four racks, and three rounds of per-scene movers moved
   it by 0.07. The room was the problem.

   So the bay now stores what a bay like this would store: **RACKS OF BRACES** —
   nine rows of 14 bars, 126 objects, receding in value. It is the subject's own
   object (a rule IS a brace; you have written hundreds of them), it is dense, and
   every row drifts on its own clock so the wall repaints continuously.

   ⛔ THE VALUE RAMP IS THE POINT, NOT THE COUNT. The audit is GREYSCALE, so a
   wall of same-value bars measures nothing however many there are. Back rows are
   painted progressively darker toward `back2` and each row alternates a lit bar
   with a shadowed gap — every boundary is light-against-shadow, which is where
   the luma delta lives (reel 106's travelling-band finding, applied to a static
   wall that drifts).
   ====================================================================== */
export const BraceWall: React.FC<{ p: Place; f: number; z?: number; rows?: number;
  cols?: number; top?: number; drift?: number }> =
  ({ p, f, z = 8, rows = 6, cols = 11, top = 118, drift = 1 }) => (<>
    {Array.from({ length: rows }, (_, r) => {
      const k = r / (rows - 1);                       /* 0 = front row, 1 = back */
      const y = top + r * ((p.horizon - top - 26) / rows);
      /* ⛔⛔ THE BAR HEIGHT IS A MEASUREMENT, NOT A LOOK. v3 ran 9 rows of 9-26px
         bars: the audit scales the panel 1012 -> 240 (a 0.237 factor), so a 26px
         bar becomes 6px and a 9px bar becomes 2 — both under §1's ~8px floor,
         "3px rain streaks become 0.7px before differencing". The wall was
         dense, on-topic, and half-invisible to the thing measuring it. Six rows
         of 40 -> 24px bars survive the downsample at 9 -> 6px. */
      const bh = Math.max(24, 40 - r * 3);
      const lit = mxh(p.key, 0.10 + (1 - k) * 0.22);
      const dim = dkh(p.back2, 0.10 + k * 0.30);
      /* each row slides at its own rate — parallax, and a continuous repaint */
      /* ⭐ AND THE DRIFT IS WHAT MEASURES. Reel 109: a travelling band trades two
                 separable things — the HARD EDGE is what reads as wallpaper in a still,
                 and SWEPT AREA x SPEED is what the audit sees. This is a room, not a
                 stripe overlay, so the speed can go up without the reel turning into
                 venetian blinds (reel 112's failure). Checked on the contact sheet. */
              const off = ((f * (2.0 + (1 - k) * 3.4) * drift) % 120) - 60;
      return (
        <React.Fragment key={"bwr" + r}>
          {/* the rack's own shelf rail, so the bars are STORED, not floating */}
          <div style={{ position: "absolute", left: -40, right: -40, top: y + bh + 3, height: 5,
            zIndex: z + r, background: hexa(dkh(p.lip, 0.24), 0.62 - k * 0.30) }} />
          {Array.from({ length: cols }, (_, c) => {
            const w = 86 - r * 5;
            const x = -60 + c * (1180 / cols) + off + (c % 2 ? 10 : 0);
            return (
              <div key={"bw" + r + "_" + c} style={{ position: "absolute", left: x, top: y,
                width: w, height: bh, zIndex: z + r, borderRadius: 2,
                background: (c + r) % 2 === 0
                  ? `linear-gradient(180deg, ${lit}, ${dkh(p.back2, 0.06 + k * 0.24)})`
                  : `linear-gradient(180deg, ${dim}, ${dkh(p.back2, 0.30 + k * 0.30)})`,
                opacity: 0.94 - k * 0.16 }} />
            );
          })}
        </React.Fragment>
      );
    })}
    {/* the rack uprights in front of the bars — depth, and a hard vertical
        boundary for every horizontal bar to cross */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"bwu" + i} style={{ position: "absolute", left: -20 + i * 172, top: top - 20,
        width: 16, height: p.horizon - top + 20, zIndex: z + 12,
        background: `linear-gradient(90deg, ${dkh(p.back2, 0.22)}, ${mxh(p.back, 0.06)} 50%, ${dkh(p.back2, 0.30)})` }} />
    ))}
  </>);

/* =========================================================================
   THE SETS — one case per lit zone.
   ====================================================================== */
/** ⭐⭐ THE PER-CUT RAKE IS THE BIGGEST MEASURED dHASH LEVER (docs/TRIAL-CUTS §2):
    *"it is in EVERY set, full height, and pure gradient, so it covers the frames a
    hook change never touches."* Reel 110 delivered four cuts at Hamming 3.4-7.0 —
    every pair a duplicate risk — because the variant system moved the camera and
    the caption band and left the rake alone. So the rake's SPEED, SKEW, DENSITY
    and OPACITY are all per-cut here, not just a scalar dimmer. */
export type RakeCfg = { n: number; speed: number; skew: number; o: number };
export const RAKE: Record<string, RakeCfg> = {
  bay:   { n: 6, speed: 1.00, skew:   0, o: 1.00 },
  amber: { n: 9, speed: 1.62, skew:  26, o: 1.34 },
  steel: { n: 4, speed: 0.58, skew: -27, o: 0.72 },
};

export const SetFor: React.FC<{ k: RigKey; f: number; lightK?: number; rake?: number;
  rk?: RakeCfg }> =
  ({ k, f, lightK = 1, rake = 1, rk = RAKE.bay }) => {
  const p = asPlace(k);

  switch (k) {

    /* ---- S0 · THE FIT BAY. The hook, and the ONE set built bright.
       ⛔ The brightness is a MEAN and the hierarchy is a SPREAD (reel 109): the
       lit back wall and the SpecBoard carry the mean above 140, and the rig +
       the hero stay near-black steel against it. Nothing in the palette's dark
       stop was lifted to get there. */
    case "fitbay":
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={26} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #A08A52 0%, #D8B878 58%, #F6E4B4 100%)" }} />
            {/* the bay's open shutter, far end — the brightest plane in frame */}
            <div style={{ position: "absolute", left: 236, top: 118, width: 552, height: 406,
              background: "linear-gradient(180deg, #FFFAE8 0%, #FBE8B8 74%, #E0BE7E 100%)",
              borderRadius: "12px 12px 0 0" }} />
            {Array.from({ length: 9 }, (_, i) => (
              <div key={"sl" + i} style={{ position: "absolute", left: 236, top: 130 + i * 44,
                width: 552, height: 9, background: hexa("#8C7040", 0.24) }} />
            ))}
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={9} cols={14} top={128} />
          </>
        } />
        <WorkLamps f={f} y={132} n={4} c="#FFEBBE" on={lightK} z={30} x0={132} pitch={252} />
        <Gantry y={64} f={f} z={18} c="#3A3327" speed={1.6} />
        {rake > 0 && <Rake f={f} y={96} h={470} n={Math.round(7 * rk.n / 6)} c="#FFE8B8" o={0.11 * rake * rk.o} speed={4.6 * rk.speed} z={22} skew={-14 + rk.skew} />}
        <BayClutter p={p} f={f} z={20}
          drums={[[74, 596, 1.0], [946, 604, 0.94]]}
          pallets={[[152, 640, 0.9], [830, 648, 0.86]]} />
        <Pool x={506} y={p.horizon + 188} w={520} c="#FFE2A8" o={0.24} />
        <RigLeg side="l" c="#2B2A22" z={92} w={112} />
      </>);

    /* ---- S1 · THE LINE. Same bay one stop down: the belt scene must not
       out-rank the hook. Tighter, dirtier, and the reject bin's own light. */
    case "linebay":
      return (<>
        <Room p={p} f={f} ceiling gritN={20} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #3A2F1B 0%, #6E5A34 100%)" }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={10} cols={15} top={116} />
            {/* the extraction ducts — a bay's own overhead plumbing */}
            {Array.from({ length: 3 }, (_, i) => (
              <div key={"dc" + i} style={{ position: "absolute", left: 40 + i * 340, top: 128,
                width: 220, height: 46, borderRadius: 24, zIndex: 8,
                background: `linear-gradient(180deg, ${mxh(STEELD, 0.16)}, ${dkh(STEELD, 0.40)})`,
                boxShadow: SH }} />
            ))}
          </>
        } />
        <WorkLamps f={f} y={150} n={3} c="#F2CE92" on={lightK * 0.9} z={30} x0={210} pitch={300} />
        <Gantry y={72} f={f} z={18} c="#332C1E" speed={2.4} />
        {rake > 0 && <Rake f={f} y={110} h={440} n={Math.round(6 * rk.n / 6)} c="#F0C98A" o={0.09 * rake * rk.o} speed={5.2 * rk.speed} z={22} skew={-16 + rk.skew} />}
        <Pool x={430} y={p.horizon + 172} w={470} c="#E8B266" o={0.20} />
        <RigLeg side="r" c="#241F16" z={92} w={104} />
      </>);

    /* ---- S2-S3 · THE INSPECTION. The biggest hue jump in the reel: warm
       tungsten -> cold teal, in one hard cut. */
    case "inspect":
      return (<>
        <Room p={p} f={f} ceiling gritN={18} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #0E2A34 0%, #1E4A5A 100%)" }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={9} cols={13} top={124} />
            {/* the inspection bay's calibration grid on the far wall */}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={"cg" + i} style={{ position: "absolute", left: 120 + i * 130, top: 190,
                width: 96, height: 96, zIndex: 9, borderRadius: 3,
                border: `3px solid ${hexa(TEAL, 0.20)}` }} />
            ))}
          </>
        } />
        <Gantry y={58} f={f} z={18} c="#16303A" speed={0} />
        {rake > 0 && <Rake f={f} y={90} h={470} n={Math.round(6 * rk.n / 6)} c="#CFEDF2" o={0.08 * rake * rk.o} speed={5.8 * rk.speed} z={22} skew={11 + rk.skew} />}
        <BayClutter p={p} f={f} z={20} drums={[[880, 588, 1.06]]} pallets={[[62, 636, 0.94]]} />
        <Pool x={506} y={p.horizon + 168} w={480} c="#9FD9E0" o={0.20} />
        <RigLeg side="l" c="#0E2028" z={92} w={108} />
      </>);

    /* ---- S3 · THE ARCHIVE. Where the older model is kept. Indigo, dusty,
       racked — the reveal needs the small Claude to come from SOMEWHERE (§10:
       a hand-off with no source is unanswered), so the source is the set. */
    case "archive":
      return (<>
        <Room p={p} f={f} ceiling gritN={14} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #1A1338 0%, #3A3068 100%)" }} />
            <BraceWall p={p} f={f} z={8} rows={8} cols={13} top={126} drift={0.8} />
            {/* the racking: rows of dark bays where retired rigs are stored */}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={"ab" + i} style={{ position: "absolute", left: 20 + i * 172, top: 148,
                width: 138, height: 330, zIndex: 9, borderRadius: 4,
                background: `linear-gradient(178deg, ${dkh("#3A3068", 0.24)}, ${dkh("#3A3068", 0.58)})`,
                border: `4px solid ${dkh("#3A3068", 0.44)}` }}>
                {Array.from({ length: 3 }, (_, j) => (
                  <div key={"as" + j} style={{ position: "absolute", left: 6, right: 6,
                    top: 12 + j * 106, height: 90, background: hexa("#0E0A1E", 0.44) }} />
                ))}
                {/* one stored rig silhouette per bay — a shape, not a label */}
                <div style={{ position: "absolute", left: 30, top: 26, width: 76, height: 66,
                  border: `7px solid ${hexa("#8E7CC0", 0.26)}`, borderRadius: 4 }} />
              </div>
            ))}
          </>
        } />
        <WorkLamps f={f} y={124} n={3} c="#CFC0F0" on={lightK * 0.85} z={30} x0={196} pitch={312} />
        <Gantry y={54} f={f} z={18} c="#241C48" speed={1.1} />
        {rake > 0 && <Rake f={f} y={86} h={470} n={Math.round(6 * rk.n / 6)} c="#D8CCF4" o={0.09 * rake * rk.o} speed={5.2 * rk.speed} z={22} skew={14 + rk.skew} />}
        <Motes x={506} y={150} w={620} h={360} n={12} f={f} z={40} c="#CFC0F0" />
        <Pool x={506} y={p.horizon + 176} w={470} c="#B8A2E0" o={0.20} />
        <RigLeg side="r" c="#171232" z={92} w={106} />
      </>);

    /* ---- S4 · THE FURNACE. Sodium orange, UP-lit from the grate: the only
       set in the reel whose key comes from below. */
    case "furnace":
      return (<>
        <Room p={p} f={f} ceiling gritN={22} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #2A1108 0%, #6E3418 100%)" }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={9} cols={14} top={128} />
            {/* the flue stacks climbing the far wall */}
            {Array.from({ length: 4 }, (_, i) => (
              <div key={"fl" + i} style={{ position: "absolute", left: 90 + i * 250, top: 100,
                width: 58, height: 380, zIndex: 9, borderRadius: 6,
                background: `linear-gradient(90deg, ${dkh("#5A3A24", 0.30)}, #5A3A24 50%, ${dkh("#5A3A24", 0.42)})` }} />
            ))}
          </>
        } />
        <Gantry y={62} f={f} z={18} c="#3A2012" speed={1.9} />
        {rake > 0 && <Rake f={f} y={92} h={450} n={Math.round(7 * rk.n / 6)} c="#FFC98A" o={0.11 * rake * rk.o} speed={5.0 * rk.speed} z={22} skew={-10 + rk.skew} />}
        <BayClutter p={p} f={f} z={20} drums={[[54, 600, 1.0], [906, 592, 1.08]]} />
        {/* the up-wash: the furnace is the key light and it lives BELOW frame */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 300, zIndex: 17,
          background: `linear-gradient(0deg, ${hexa("#F09048", 0.34)}, transparent)` }} />
        <RigLeg side="r" c="#2A1610" z={92} w={110} />
      </>);

    /* ---- S5-S6 · ANTHROPIC'S BAY. ⛔ It must read as SOMEONE ELSE'S SHOP:
       cold sky through a roof light over a warm floor — two sources fighting,
       which is literally the scene's subject — plus a different gantry, a
       different floor and its own crew. */
    case "theirbay":
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={16} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #1A2648 0%, #3C4A78 100%)" }} />
            {/* the north-light roof glazing — this shop has DAYLIGHT, ours has none */}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={"nl" + i} style={{ position: "absolute", left: 30 + i * 200, top: 74,
                width: 150, height: 210, zIndex: 8, borderRadius: "6px 6px 0 0",
                background: "linear-gradient(180deg, #C8D8F4 0%, #7E92C4 100%)",
                transform: "skewX(-8deg)" }} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={"nb" + i} style={{ position: "absolute", left: 30 + i * 200, top: 74,
                width: 150, height: 6, zIndex: 9, background: hexa("#1A2648", 0.6),
                transform: "skewX(-8deg)" }} />
            ))}
            <BayWall p={p} f={f} z={10} racks={0} />
            <BraceWall p={p} f={f} z={11} rows={8} cols={13} top={210} />
          </>
        } />
        <WorkLamps f={f} y={150} n={3} c="#FFDFA0" on={lightK} z={30} x0={190} pitch={318} />
        <Gantry y={40} f={f} z={18} c="#26304E" speed={2.8} />
        {rake > 0 && <Rake f={f} y={80} h={430} n={Math.round(6 * rk.n / 6)} c="#DCE6FF" o={0.10 * rake * rk.o} speed={5.4 * rk.speed} z={22} skew={13 + rk.skew} />}
        <BayClutter p={p} f={f} z={20} pallets={[[70, 648, 0.9], [880, 640, 0.94]]} />
        <Pool x={506} y={p.horizon + 170} w={520} c="#EFC978" o={0.20} />
        <RigLeg side="l" c="#151C34" z={92} w={100} />
      </>);

    /* ---- S7 · THE CLASH. THE PEAK. Oxblood, lit by two OPPOSED reds — the two
       lamps ARE the two rules, one on each side, and they are the only light. */
    case "clash":
      return (<>
        <Room p={p} f={f} ceiling gritN={20} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #24090A 0%, #6A2822 100%)" }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={9} cols={14} top={128} />
          </>
        } />
        {/* the two opposed sources, each a cone, never a full-frame fill */}
        <Beam x={92} y={128} top={70} bot={520} len={470} c="#FF8A6A" o={0.20 + Math.sin(f / 7) * 0.05} z={20} f={f} />
        <Beam x={920} y={128} top={70} bot={520} len={470} c="#FFB07A" o={0.20 + Math.cos(f / 7) * 0.05} z={20} f={f} />
        <Strip x={92} y={104} w={150} on={1} c="#FF8A6A" z={30} f={f} beam={false} />
        <Strip x={920} y={104} w={150} on={1} c="#FFB07A" z={30} f={f} beam={false} />
        <Gantry y={54} f={f} z={18} c="#33110F" speed={0} />
        {rake > 0 && <Rake f={f} y={86} h={460} n={Math.round(8 * rk.n / 6)} c="#FFC0A0" o={0.10 * rake * rk.o} speed={6.4 * rk.speed} z={22} skew={-18 + rk.skew} />}
        <Pool x={506} y={p.horizon + 176} w={440} c="#E07A5A" o={0.22} />
        <RigLeg side="r" c="#2A0E0C" z={92} w={114} />
      </>);

    /* ---- S8-S10 · THE TOOL CRIB. Navy + gold, mid-bright: the turn has to be
       the most READABLE part of the reel, because it is where the how lives. */
    case "crib":
      return (<>
        <Room p={p} f={f} ceiling gritN={16} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #16283C 0%, #2E4A66 100%)" }} />
            {/* the crib's pegboard wall — the SOURCE every hand-off needs (§10) */}
            <div style={{ position: "absolute", left: 96, top: 156, width: 820, height: 322,
              zIndex: 9, borderRadius: 6,
              background: `linear-gradient(178deg, ${dkh("#2E4A66", 0.16)}, ${dkh("#2E4A66", 0.40)})`,
              border: `6px solid ${dkh("#2E4A66", 0.50)}` }} />
            {Array.from({ length: 13 }, (_, i) => (
              <div key={"pgv" + i} style={{ position: "absolute", left: 122 + i * 60, top: 176,
                width: 3, height: 282, zIndex: 10, background: hexa("#0E1A28", 0.34) }} />
            ))}
            {Array.from({ length: 42 }, (_, i) => (
              <div key={"pg" + i} style={{ position: "absolute",
                left: 124 + (i % 14) * 60, top: 186 + Math.floor(i / 14) * 96,
                width: 11, height: 11, borderRadius: "50%", zIndex: 11,
                background: hexa("#0A1420", 0.50) }} />
            ))}
            {/* real tools ON the pegboard: spanners, clamps, coils */}
            {Array.from({ length: 8 }, (_, i) => (
              <div key={"tl" + i} style={{ position: "absolute", left: 148 + i * 96, top: 206,
                width: 16, height: 82 + (i % 3) * 22, borderRadius: 8, zIndex: 12,
                background: `linear-gradient(180deg, ${mxh(STEEL, 0.20)}, ${dkh(STEEL, 0.44)})`,
                boxShadow: SH }} />
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={"cl" + i} style={{ position: "absolute", left: 172 + i * 158, top: 356,
                width: 62, height: 62, borderRadius: "50%", zIndex: 12,
                border: `9px solid ${dkh(STEEL, 0.30)}` }} />
            ))}
          </>
        } />
        <WorkLamps f={f} y={128} n={3} c="#FFD98C" on={lightK} z={30} x0={210} pitch={300} />
        <Gantry y={52} f={f} z={18} c="#1A2C40" speed={2.2} />
        {rake > 0 && <Rake f={f} y={84} h={450} n={Math.round(6 * rk.n / 6)} c="#FFE0A0" o={0.09 * rake * rk.o} speed={5.0 * rk.speed} z={22} skew={12 + rk.skew} />}
        <Pool x={506} y={p.horizon + 170} w={500} c="#E7B24C" o={0.22} />
        <RigLeg side="l" c="#101E2C" z={92} w={106} />
      </>);

    /* ---- S11-S12 · THE CUT DECK. The scan IS the source: the room is lit by
       the audit, so its own lamps are down. */
    case "cutdeck":
      return (<>
        <Room p={p} f={f} ceiling gritN={18} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #0A2018 0%, #1C4636 100%)" }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={9} cols={13} top={124} />
            {/* the cut deck's own scrap chute, where the braces go */}
            <div style={{ position: "absolute", left: 700, top: 250, width: 300, height: 240,
              zIndex: 10, borderRadius: "0 0 0 40px",
              background: `linear-gradient(150deg, ${dkh(STEELD, 0.18)}, ${dkh(STEELD, 0.52)})`,
              transform: "skewY(11deg)" }} />
          </>
        } />
        <Gantry y={58} f={f} z={18} c="#0E2A20" speed={1.4} />
        {rake > 0 && <Rake f={f} y={90} h={460} n={Math.round(7 * rk.n / 6)} c="#A8F0C8" o={0.09 * rake * rk.o} speed={6.0 * rk.speed} z={22} skew={-13 + rk.skew} />}
        <BayClutter p={p} f={f} z={20} drums={[[62, 596, 1.02]]} />
        <Pool x={480} y={p.horizon + 172} w={520} c="#6FD3A0" o={0.22} />
        <RigLeg side="r" c="#0A1E16" z={92} w={108} />
      </>);

    /* ---- S13-S14 · THE OPEN FLOOR. The callback: `fitbay` with the shutter
       fully up and daylight flooding in. Brightest BODY scene in the reel, and
       the only one whose light comes from outside the building. */
    case "openfloor":
      return (<>
        <Room p={p} f={f} ceiling={false} gritN={24} band={
          <>
            <div style={{ position: "absolute", inset: 0,
              background: "linear-gradient(178deg, #57543A 0%, #918A5E 100%)" }} />
            {/* THE OPEN SHUTTER — the same doorway as S0, now fully up */}
            <div style={{ position: "absolute", left: 214, top: 96, width: 592, height: 428,
              background: "linear-gradient(180deg, #FFFAE6 0%, #F6E2B0 62%, #D8BC84 100%)",
              borderRadius: "14px 14px 0 0" }} />
            <div style={{ position: "absolute", left: 214, top: 96, width: 592, height: 42,
              background: `linear-gradient(180deg, ${dkh("#8C7A50", 0.30)}, ${hexa("#8C7A50", 0)})` }} />
            <BayWall p={p} f={f} z={7} racks={0} />
            <BraceWall p={p} f={f} z={8} rows={7} cols={13} top={132} drift={1.4} />
          </>
        } />
        <WorkLamps f={f} y={124} n={4} c="#FFF2D0" on={lightK} z={30} x0={132} pitch={252} />
        <Gantry y={56} f={f} z={18} c="#4A4732" speed={3.2} />
        {rake > 0 && <Rake f={f} y={88} h={460} n={Math.round(7 * rk.n / 6)} c="#FFF4D4" o={0.12 * rake * rk.o} speed={5.6 * rk.speed} z={22} skew={-12 + rk.skew} />}
        <BayClutter p={p} f={f} z={20}
          drums={[[66, 600, 0.98], [938, 596, 1.02]]} pallets={[[146, 646, 0.88]]} />
        <Motes x={506} y={140} w={520} h={380} n={14} f={f} z={40} c="#FFF4D4" />
        <Pool x={506} y={p.horizon + 180} w={560} c="#FFE8B0" o={0.26} />
        <RigLeg side="l" c="#39371F" z={92} w={104} />
      </>);

    default:
      return <Room p={p} f={f} />;
  }
};
