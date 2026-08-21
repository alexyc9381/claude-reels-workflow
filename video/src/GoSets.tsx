import React from "react";
import {
  W, H, E, OUT, IO, LIN, hexa, dkh, mxh, rnd, SH,
  PLACES, asPlace, vivid, Rake, Pool, Belt, STEEL, CLAY, CREAMB, INK, BRASS,
} from "./GoWorld";
import type { Place } from "./GoWorld";

/* ===========================================================================
   REEL 113 · "GO" — THE SETS.  Board: storyboards/113-go.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE, NOT SHAPES ON BLACK (STORYBOARD-SPEC floor
   1): a named location, >= 4 depth planes, ONE committed light direction and
   real world props. `Shop` below builds six planes for every interior:

     1  the far wall + its roof line
     2  the haze disc around the practical (a solid disc + a soft ring, never
        an emissive blur — matte only)
     3  a far bay band, parallaxed slowest
     4  a mid rack band
     5  the near structural band + the floor and its skirting lip
     6  grit drifting on the floor, and the roof truss overhead

   ⛔⛔ AND THE DEPTH CHECK IS BY EYE, BECAUSE IT CANNOT BE AUTOMATED
   (ANIMATION-QUALITY §8 — two automatic proxies were built and both failed):
   *"Is there a mass cropped by the panel edge, IN FRONT of the action?"* If
   not, the camera is pointed at a backdrop. `Stanchion` is that mass, and
   every scene mounts one.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/** a parallax band of shop structure — bays, racks, or a machine line */
const Band: React.FC<{ c: string; lit: string; y: number; n: number; seed: number; dx: number;
  z: number; on?: number; hMin?: number; hMax?: number; kind?: "bay" | "rack" }> =
  ({ c, lit, y, n, seed, dx, z, on = 0.3, hMin = 110, hMax = 250, kind = "bay" }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const h = hMin + rnd(seed, i) * (hMax - hMin);
    const w = 96 + rnd(seed + 1, i) * 130;
    const x = ((i * (W / n) + dx) % (W + 300)) - 150;
    return (
      <div key={"bd" + seed + i} style={{ position: "absolute", left: x, top: y - h, width: w,
        height: h, zIndex: z, background: c, borderTop: `5px solid ${mxh(c, 0.12)}` }}>
        {kind === "bay"
          /* a lit bay opening — the shop behind the shop */
          ? <div style={{ position: "absolute", left: "16%", top: "22%", width: "68%", height: "54%",
              background: lit, opacity: on, borderRadius: 3 }} />
          /* a rack: four shelves, so the band reads as STORAGE not as a block */
          : <>{[0.20, 0.40, 0.60, 0.80].map((k, j) => (
              <div key={"sh" + j} style={{ position: "absolute", left: "10%", right: "10%",
                top: `${k * 100}%`, height: 7, background: mxh(c, 0.20) }} />
            ))}
            <div style={{ position: "absolute", left: "22%", top: "26%", width: "50%", height: "16%",
              background: lit, opacity: on * 0.8 }} /></>}
      </div>
    );
  })}</>
);

/** ⛔⛔ THE OCCLUDER — a stanchion, a gantry leg or a rack upright, cropped by
    the panel edge and painted IN FRONT of everything. This is the difference
    between a PLACE and a backdrop, and it is not optional. */
export const Stanchion: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  lean?: number; brace?: boolean }> =
  ({ side = "l", c = "#3A332B", w = 118, z = 88, lean = 0, brace = true }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -20, top: -60, width: w,
    height: H + 140, zIndex: z, transform: `rotate(${lean}deg)`,
    transformOrigin: side === "l" ? "0% 50%" : "100% 50%" } as React.CSSProperties}>
    <div style={{ position: "absolute", inset: 0,
      background: `linear-gradient(${side === "l" ? 96 : 84}deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    {/* the flange edges */}
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 16, background: mxh(c, 0.24) }} />
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 16, background: dkh(c, 0.42) }} />
    {/* bolt rows, every 96px — real steel is bolted */}
    {Array.from({ length: 11 }, (_, i) => (
      <React.Fragment key={"bl" + i}>
        <div style={{ position: "absolute", left: w * 0.24, top: 40 + i * 96, width: 15, height: 15,
          borderRadius: "50%", background: dkh(c, 0.50) }} />
        <div style={{ position: "absolute", left: w * 0.62, top: 40 + i * 96, width: 15, height: 15,
          borderRadius: "50%", background: dkh(c, 0.50) }} />
      </React.Fragment>
    ))}
    {/* a diagonal brace running off the panel */}
    {brace && (
      <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: w * 0.5, top: H * 0.34,
        width: 300, height: 30, background: dkh(c, 0.26),
        transform: `rotate(${side === "l" ? 34 : -34}deg)`,
        transformOrigin: side === "l" ? "0% 50%" : "100% 50%" } as React.CSSProperties} />
    )}
  </div>
);

/** the roof truss — a real shop has something above it, and it crops the top */
export const Truss: React.FC<{ c?: string; y?: number; z?: number; n?: number }> =
  ({ c = "#2A241E", y = -14, z = 84, n = 7 }) => (
  <div style={{ position: "absolute", left: -60, right: -60, top: y, height: 168, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, background: dkh(c, 0.10) }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 96, height: 20, background: dkh(c, 0.24) }} />
    {Array.from({ length: n }, (_, i) => (
      <React.Fragment key={"tz" + i}>
        <div style={{ position: "absolute", left: i * (W / (n - 1)) - 8, top: 30, width: 16, height: 70,
          background: dkh(c, 0.18) }} />
        <div style={{ position: "absolute", left: i * (W / (n - 1)) - 90, top: 60, width: 190, height: 13,
          background: dkh(c, 0.30), transform: `rotate(${i % 2 ? 21 : -21}deg)` }} />
      </React.Fragment>
    ))}
  </div>
);

/** an overhead flood on a yoke — the ONE committed light direction, made visible */
export const Flood: React.FC<{ x: number; y?: number; s?: number; z?: number; on?: number;
  c?: string; len?: number; spread?: number }> =
  ({ x, y = 40, s = 1, z = 26, on = 1, c = "#F2D6A0", len = 700, spread = 250 }) => (
  <>
    {/* the shaped cone — a polygon, never a blur */}
    <div style={{ position: "absolute", left: x - spread, top: y + 58 * s, width: spread * 2, height: len,
      zIndex: z, opacity: on * 0.34, pointerEvents: "none",
      clipPath: `polygon(${spread - 52 * s}px 0, ${spread + 52 * s}px 0, 100% 100%, 0 100%)`,
      background: `linear-gradient(180deg, ${hexa(c, 0.62)} 0%, ${hexa(c, 0.10)} 62%, ${hexa(c, 0)} 100%)` }} />
    {/* the housing */}
    <div style={{ position: "absolute", left: x - 62 * s, top: y, width: 124 * s, height: 60 * s,
      zIndex: z + 2, borderRadius: `${10 * s}px ${10 * s}px ${26 * s}px ${26 * s}px`,
      background: `linear-gradient(180deg, ${dkh("#4A443C", 0.06)} 0%, ${dkh("#4A443C", 0.44)} 100%)`,
      border: `${4 * s}px solid ${dkh("#4A443C", 0.54)}` }} />
    <div style={{ position: "absolute", left: x - 46 * s, top: y + 50 * s, width: 92 * s, height: 16 * s,
      zIndex: z + 3, borderRadius: 4 * s, background: mxh(c, on * 0.5), opacity: 0.4 + on * 0.6 }} />
    {/* the yoke and its stem, running up out of frame */}
    <div style={{ position: "absolute", left: x - 7 * s, top: y - 90 * s, width: 14 * s, height: 92 * s,
      zIndex: z + 1, background: dkh("#4A443C", 0.34) }} />
  </>
);


/** ⛔⛔ THE NEAR PLANE, AND THE BLACK POINT, ARE THE SAME FIX (reel 112).
    Four sets measured a per-scene p10 of 47-50 against a <=35 bar while their
    saturation was fine — they were BRIGHT ROOMS WITH NOTHING IN FRONT. A narrow
    stanchion is not a near plane; this is a real mass of racked stock and a
    trolley, cropped by the panel's bottom corner, painted in front of
    everything at near-black. It answers ANIMATION-QUALITY §8's by-eye depth
    question (*"is there a mass cropped by the panel edge, in front of the
    action?"*) and drops the black point at the same time, without touching a
    single palette value. */
export const NearStack: React.FC<{ side?: "l" | "r"; c?: string; h?: number; z?: number;
  trolley?: boolean }> =
  ({ side = "l", c = "#241E18", h = 300, z = 87, trolley = true }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -70, bottom: -40,
    width: 470, height: h, zIndex: z } as React.CSSProperties}>
    {/* three stacked pallets of stock, each a real object with boards and feet */}
    {[0, 1, 2].map(i => (
      <div key={"ns" + i} style={{ position: "absolute",
        left: side === "l" ? 10 + i * 128 : 470 - 150 - i * 128,
        bottom: 0, width: 138, height: h * (0.98 - i * 0.20), borderRadius: 5,
        background: `linear-gradient(${side === "l" ? 96 : 84}deg, ${mxh(c, 0.12)} 0%, ${dkh(c, 0.30)} 100%)` }}>
        {Array.from({ length: 5 }, (_, j) => (
          <div key={"nb" + j} style={{ position: "absolute", left: 8, right: 8,
            top: 16 + j * (h * 0.16), height: 9, background: mxh(c, 0.20), opacity: 0.7 }} />
        ))}
        {/* the pallet feet */}
        {[0.08, 0.46, 0.82].map((k, j) => (
          <div key={"nf" + j} style={{ position: "absolute", left: `${k * 100}%`, bottom: -14,
            width: 22, height: 18, background: dkh(c, 0.24) }} />
        ))}
      </div>
    ))}
    {/* a hand trolley leaning against it — the object that says "shop floor" */}
    {trolley && (<>
      <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: 386, bottom: 6,
        width: 18, height: h * 0.86, background: mxh(c, 0.16),
        transform: `rotate(${side === "l" ? 9 : -9}deg)` } as React.CSSProperties} />
      <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: 344, bottom: 6,
        width: 18, height: h * 0.86, background: mxh(c, 0.10),
        transform: `rotate(${side === "l" ? 9 : -9}deg)` } as React.CSSProperties} />
      <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: 336, bottom: 0,
        width: 74, height: 74, borderRadius: "50%", background: dkh(c, 0.10),
        border: `9px solid ${mxh(c, 0.20)}` } as React.CSSProperties} />
    </>)}
  </div>
);


/** ⛔ THE DARK OVERHEAD. `dock` and `out` measured a per-scene p10 of 40-42
    against a <=35 bar with their saturation already healthy — they were bright
    rooms with a bright ceiling. A real shop has a dark roof structure over it:
    a deep gantry beam, its hangers, and a run of conduit. This is furniture
    that costs the hierarchy nothing, it is genuinely part of the world, and it
    supplies the dark tenth of the frame the black point needs. ⛔ Note what it
    is NOT: dimming the palette or deepening the vignette, both of which dim
    saturated paint just as hard as they dim shadow. */
export const DarkOverhead: React.FC<{ c?: string; y?: number; z?: number; deep?: number }> =
  ({ c = "#1C1712", y = -10, z = 82, deep = 1 }) => (
  <div style={{ position: "absolute", left: -60, right: -60, top: y, height: 210 * deep, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 96 * deep,
      background: `linear-gradient(180deg, ${dkh(c, 0.05)} 0%, ${dkh(c, 0.05)} 62%, ${hexa(dkh(c, 0.05), 0)} 100%)` }} />
    {/* the main beam */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 84 * deep, height: 44 * deep,
      background: `linear-gradient(180deg, ${mxh(c, 0.10)} 0%, ${dkh(c, 0.30)} 100%)` }} />
    {/* its hangers */}
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"oh" + i} style={{ position: "absolute", left: 60 + i * 190, top: 0,
        width: 22, height: 92 * deep, background: dkh(c, 0.14) }} />
    ))}
    {/* a conduit run and its clips */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 138 * deep, height: 15,
      background: dkh(c, 0.02) }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"oc" + i} style={{ position: "absolute", left: 30 + i * 128, top: 132 * deep,
        width: 15, height: 28, background: mxh(c, 0.06) }} />
    ))}
  </div>
);

/* =========================================================================
   THE SHOP — the six-plane interior every set is built from.
   ====================================================================== */
export const Shop: React.FC<{ p: Place; f: number; t?: number; lit?: number; z0?: number;
  truss?: boolean; racks?: boolean; band?: React.ReactNode; glowX?: number; glowR?: number;
  /* ⭐ the rake is a per-cut lever now — angle and stripe count, not just rate.
     A dHash reads adjacent-pixel luma, so moving where the light EDGES fall is
     worth far more than changing how fast they travel. */
  rake?: boolean; rakeRate?: number; rakeAng?: number; rakeN?: number; rakeO?: number }> =
  ({ p, f, t = 0, lit = 0.34, z0 = 0, truss = true, racks = true, band,
     glowX = 500, glowR = 300, rake = true, rakeRate = 3.4,
     rakeAng = -17, rakeN = 6, rakeO = 0.26 }) => (<>
  {/* 1 · the far wall */}
  <div style={{ position: "absolute", inset: 0, zIndex: z0 + 1,
    background: `linear-gradient(174deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  {/* 2 · ONE haze source around the practical */}
  <div style={{ position: "absolute", left: glowX - glowR * 1.5, top: 60 - glowR * 1.2,
    width: glowR * 3, height: glowR * 3, borderRadius: "50%", zIndex: z0 + 3,
    background: `radial-gradient(circle, ${hexa(p.key, 0.24)} 0%, ${hexa(p.key, 0.08)} 46%, ${hexa(p.key, 0)} 70%)` }} />
  {/* 3,4,5 · three parallax bands, far to near */}
  <Band c={dkh(p.back2, 0.06)} lit={mxh(p.key, 0.28)} y={p.horizon - 176} n={8} seed={3}
    dx={t * 0.09} z={z0 + 8} on={lit * 0.52} hMin={132} hMax={288} />
  <Band c={dkh(p.back2, 0.24)} lit={mxh(p.key, 0.12)} y={p.horizon - 92} n={6} seed={11}
    dx={t * 0.20} z={z0 + 10} on={lit * 0.80} hMin={112} hMax={246} kind={racks ? "rack" : "bay"} />
  <Band c={dkh(p.back2, 0.44)} lit={p.key} y={p.horizon - 2} n={5} seed={23}
    dx={t * 0.38} z={z0 + 12} on={lit} hMin={94} hMax={190} />
  {/* whatever this stretch of shop has standing on it */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: z0 + 13 }}>
    {band}
  </div>
  {/* 6 · the floor and its skirting lip */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: z0 + 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: z0 + 15 }} />
  {/* the floor's bay markings — a shop floor is painted */}
  {Array.from({ length: 4 }, (_, i) => (
    <div key={"fm" + i} style={{ position: "absolute", left: -80 + i * 300 - t * 0.5,
      top: p.horizon + 34 + i * 12, width: 210, height: 8, background: hexa(p.lip, 0.34),
      zIndex: z0 + 16, transform: `rotate(${-2 - i}deg)` }} />
  ))}
  {/* swarf and grit drifting on the floor — the shop never flatlines */}
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"gt" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - t * 0.62) % 1190) - 62,
      top: p.horizon + 22 + ((i * 51) % 10) * 24,
      width: 6 + (i % 3) * 5, height: 5, borderRadius: 3, background: p.grit,
      opacity: 0.32, zIndex: z0 + 17 }} />
  ))}
  {/* ⭐ the travelling rake — feathered, light AND shadow, speed at the call site */}
  {rake && <Rake f={f} y={p.horizon - 300} h={480} c={p.key} o={rakeO} rate={rakeRate} z={z0 + 20} n={rakeN} ang={rakeAng} />}
  {truss && <Truss z={z0 + 84} />}
</>);

/* =========================================================================
   THE EIGHT SETS. Each one is a place with its own light direction, and
   neighbours differ by BOTH hue and lightness.
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lit?: number; t?: number;
  rakeRate?: number;
  /** ⛔ set false when a scene puts a large flat SUBJECT in the middle of the
      frame (S7's browser). The stanchion's diagonal brace and the dark overhead
      are painted at z 82-87, i.e. IN FRONT of everything, which is exactly what
      makes them a depth cue — and exactly what ruins a screen. */
  occluders?: boolean }> = ({ k, f, lit = 1, t = 0, rakeRate, occluders = true }) => {
  const p = placeFor(k);
  switch (k) {
    /* S0 — THE SCRAP FLOOR. One hard overhead flood, camera-left, throwing the
       mound's shadow toward the viewer. Frame 0 has to clear luma 140, so the
       floor pool is wide and the flood is at full. */
    case "scrap":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.72} glowX={430} glowR={420} rakeRate={rakeRate ?? 6.3} />
        {/* ⭐⭐ THE BACKLIT BAY. Reel 110: *"an object is recognised by its
            SILHOUETTE"*, and *"light on light"* answers "I can't tell what that
            is" more often than shape does. A brown mound on a brown floor in a
            brown room has NO silhouette — so the hook's back wall is a wide lit
            bay opening, the mound reads as a dark mass against it, and the
            frame-0 MEAN comes from the room while the SPREAD comes from the
            hero. That is §8's "brightness is the mean, hierarchy is the
            spread", built rather than argued. */}
        <div style={{ position: "absolute", left: 60, top: 96, width: 900, height: p.horizon - 34,
          zIndex: 11, borderRadius: 8,
          background: `linear-gradient(178deg, #FFFEFB 0%, ${mxh(p.key, 0.70)} 54%, ${mxh(p.back, 0.60)} 100%)` }} />
        {/* the bay's steel jambs and head, so it is an OPENING and not a panel */}
        {[58, 940].map((x, i) => (
          <div key={"sj" + i} style={{ position: "absolute", left: x, top: 96, width: 34,
            height: p.horizon - 40, zIndex: 13, borderRadius: 4,
            background: `linear-gradient(90deg, ${mxh("#4A443C", 0.16)} 0%, ${dkh("#4A443C", 0.40)} 100%)` }} />
        ))}
        <div style={{ position: "absolute", left: 72, top: 88, width: 880, height: 44, zIndex: 13,
          borderRadius: 5, background: `repeating-linear-gradient(90deg, ${dkh("#4A443C", 0.10)} 0px, ${dkh("#4A443C", 0.10)} 26px, ${dkh("#4A443C", 0.36)} 26px, ${dkh("#4A443C", 0.36)} 52px)` }} />
        {/* three distant shop silhouettes inside the bright bay, so the opening
            reads as DEPTH rather than as a white rectangle */}
        {[[168, 300, 150], [420, 250, 190], [700, 330, 140]].map(([x, h, w], i) => (
          <div key={"ds" + i} style={{ position: "absolute", left: x, top: p.horizon - 52 - h,
            width: w, height: h, zIndex: 12, borderRadius: 5,
            background: hexa("#6B563E", 0.30 + i * 0.06) }} />
        ))}
        <Flood x={330} y={26} s={1.6} on={lit} len={820} spread={360} c={p.key} />
        <Flood x={760} y={10} s={1.2} on={lit * 0.8} len={700} spread={260} c={p.key} />
        <Pool x={400} y={p.horizon + 150} w={1180} c={p.key} o={0.62 * lit} z={19} h={470} />
        <Belt x={-60} y={p.horizon - 44} w={430} f={f} rate={5.5} z={23}
          carry={[{ o: 0.1, wrong: true }, { o: 0.55, wrong: true }, { o: 0.85, wrong: true, s: 0.6 }]} />
        {occluders && <Stanchion side="l" w={126} z={86} />}
        {occluders && <NearStack side="r" c="#241A12" h={196} trolley={false} />}
      </>);

    /* S3 — the same floor RELIT FROM THE OTHER SIDE, a stop down and colder, so
       the return reads as a return and not as a copied shot. */
    case "scrap2":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.28} glowX={720} glowR={300} rakeRate={rakeRate ?? 6.9} />
        <Flood x={742} y={20} s={1.35} on={lit * 0.92} len={720} spread={266} c={p.key} />
        <Pool x={726} y={p.horizon + 118} w={720} c={p.key} o={0.28 * lit} z={19} />
        {occluders && <Stanchion side="r" w={132} z={86} lean={0.6} />}
      </>);

    /* S1/S4 — THE PRESS BAY. Warm gold from the gantry above, cream bounce. */
    case "press":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.36} glowX={506} glowR={330} racks={false} rakeRate={rakeRate ?? 5.8} />
        <Flood x={506} y={-6} s={1.6} on={lit} len={800} spread={330} c={p.key} />
        <Pool x={506} y={p.horizon + 116} w={860} c={p.key} o={0.34 * lit} z={19} />
        {/* the gantry rail the press hangs from, and its running chain */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 96, height: 34, zIndex: 25,
          background: `linear-gradient(180deg, ${mxh("#4A443C", 0.16)} 0%, ${dkh("#4A443C", 0.44)} 100%)` }} />
        {Array.from({ length: 18 }, (_, i) => (
          <div key={"gc" + i} style={{ position: "absolute", left: ((i * 74 + f * 2.6) % 1200) - 60,
            top: 130, width: 30, height: 16, borderRadius: 4, background: dkh(BRASS, 0.30), zIndex: 26 }} />
        ))}
        {occluders && <Stanchion side="l" w={110} z={86} brace={false} />}
        {occluders && <NearStack side="r" h={330} />}
      </>);

    /* S5 — the same bay one stop DOWN and tighter: the cream sheet is what
       brightens the frame, never the palette. */
    case "press2":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.26} glowX={506} glowR={280} racks={false} truss={false}
          rakeRate={rakeRate ?? 5.2} />
        <Flood x={506} y={-30} s={1.3} on={lit * 0.86} len={700} spread={280} c={p.key} />
        {occluders && <Stanchion side="r" w={104} z={86} brace={false} />}
      </>);

    /* S2 — THE YARD, night. The reel's only COLD set: steel-blue, one warm
       work lamp, and the biggest value spread in the reel. */
    case "yard":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.30} glowX={760} glowR={250} racks={false} rakeRate={rakeRate ?? 4.1} />
        {/* the night sky above the shop line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon - 210,
          zIndex: 6, background: `linear-gradient(180deg, ${dkh(p.back2, 0.34)} 0%, ${p.back} 100%)` }} />
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"sr" + i} style={{ position: "absolute", left: rnd(i, 2) * W,
            top: rnd(i, 5) * (p.horizon - 250), width: 4, height: 4, borderRadius: 2,
            background: "#DCE8F4", opacity: 0.28 + rnd(i, 8) * 0.4, zIndex: 7 }} />
        ))}
        <Flood x={766} y={70} s={1.15} on={lit} len={560} spread={210} c={p.key} />
        <Pool x={752} y={p.horizon + 96} w={600} c={p.key} o={0.24 * lit} z={19} />
        {occluders && <Stanchion side="l" w={122} z={86} />}
      </>);

    /* S6/S7 — THE INTAKE DOCK. Flat bright daylight through an open roller
       door: the brightest set in the reel and the only daylight one. */
    case "dock":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.20} glowX={506} glowR={360} truss={false} racks
          rakeRate={rakeRate ?? 3.6} />
        {/* the roller door opening — the light source is a hole in the wall */}
        <div style={{ position: "absolute", left: 176, top: 92, width: 660, height: p.horizon - 60,
          zIndex: 11, borderRadius: 6, background: `linear-gradient(180deg, #FFFFFF 0%, ${mxh(p.key, 0.0)} 62%, ${mxh(p.back, 0.42)} 100%)` }} />
        {/* the rolled-up shutter above it */}
        <div style={{ position: "absolute", left: 158, top: 44, width: 696, height: 62, zIndex: 13,
          borderRadius: 6, background: `repeating-linear-gradient(180deg, ${dkh(STEEL, 0.20)} 0px, ${dkh(STEEL, 0.20)} 9px, ${dkh(STEEL, 0.42)} 9px, ${dkh(STEEL, 0.42)} 18px)` }} />
        {/* the door's steel jambs */}
        {[152, 838].map((x, i) => (
          <div key={"jm" + i} style={{ position: "absolute", left: x, top: 44, width: 30,
            height: p.horizon - 10, zIndex: 14, background: dkh(STEEL, 0.40) }} />
        ))}
        {occluders && <Stanchion side="r" w={116} z={86} c="#1A2C37" />}
        {occluders && <NearStack side="l" c="#16232C" h={320} />}
        {occluders && <DarkOverhead c="#101A21" />}
      </>);

    /* S8 — THE INSPECTION BAY. The most saturated frame in the reel: this is
       where BODY_SAT is bought back after two pale sets. */
    case "insp":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.34} glowX={506} glowR={290} racks={false} rakeRate={rakeRate ?? 7.5} />
        <Flood x={506} y={-16} s={1.2} on={lit} len={620} spread={250} c={p.key} />
        {occluders && <Stanchion side="l" w={120} z={86} c="#3A1C18" />}
        {occluders && <Stanchion side="r" w={92} z={85} c="#3A1C18" brace={false} />}
      </>);

    /* S9 — THE CARD RAIL. The rail IS the light source. */
    case "rail":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.30} glowX={506} glowR={300} racks rakeRate={rakeRate ?? 5.5} />
        <Pool x={506} y={p.horizon + 90} w={820} c={p.key} o={0.22 * lit} z={19} />
        {occluders && <Stanchion side="l" w={108} z={86} c="#17342C" />}
      </>);

    /* S10/S11 — THE OUTPUT FLOOR. Bright, even, near shadowless: relief. */
    case "out":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.44} glowX={506} glowR={380} racks rakeRate={rakeRate ?? 5.0} />
        <Flood x={280} y={-20} s={1.25} on={lit * 0.9} len={700} spread={250} c={p.key} />
        <Flood x={760} y={-20} s={1.25} on={lit * 0.9} len={700} spread={250} c={p.key} />
        <Pool x={506} y={p.horizon + 120} w={980} c={p.key} o={0.28 * lit} z={19} />
        {occluders && <Stanchion side="r" w={112} z={86} c="#3A2214" />}
        {occluders && <NearStack side="l" c="#2A1810" h={340} />}
        {occluders && <DarkOverhead c="#1E120A" />}
      </>);

    /* S12/S13 — THE COUNTER. Warm practical in, cool street spill behind:
       the strongest depth in the reel. */
    case "counter":
      return (<>
        <Shop p={p} f={f} t={t} lit={0.34} glowX={506} glowR={300} racks={false} rakeRate={rakeRate ?? 4.4} />
        {/* the shutter, fully up, and the street behind it */}
        <div style={{ position: "absolute", left: 118, top: 120, width: 776, height: p.horizon - 100,
          zIndex: 11, borderRadius: 6, background: `linear-gradient(180deg, ${dkh(p.back, 0.30)} 0%, ${mxh(p.back, 0.16)} 100%)` }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"sw" + i} style={{ position: "absolute", left: 150 + i * 152, top: 168,
            width: 96, height: 150 + (i % 3) * 60, zIndex: 12, borderRadius: 4,
            background: dkh(p.back2, 0.20),
            borderTop: `4px solid ${hexa(p.key, 0.30)}` }} />
        ))}
        <Flood x={506} y={40} s={1.4} on={lit} len={640} spread={290} c={p.key} />
        <Pool x={506} y={p.horizon + 104} w={800} c={p.key} o={0.30 * lit} z={19} />
        {occluders && <Stanchion side="l" w={104} z={86} brace={false} />}
      </>);
  }
  return null;
};
