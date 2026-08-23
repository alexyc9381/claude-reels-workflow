import React from "react";
import {
  E, OUT, IO, BACK, IN_Q, LIN, hexa, SH, SH_D, rnd, dkh, mxh, mono, ui,
  PLACES, Rake, Pool, Belt,
  CLAY, CLAYD, GOLD, GREEN, RED, SKY, PAPER, CREAMB, INK, MUTE, TEAL, STEEL,
  BRASS, ENAM, SODIUM, VIOLET, OXIDE, CYAN, IRON, EMBER, ING, INGH, INGD,
} from "./KnowWorld";
import type { Place } from "./KnowWorld";

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/* ===========================================================================
   REEL 117 · "KNOW" — THE SETS.  Board: storyboards/117-know.md §1.

   ⛔⛔ THREE PLANES OR IT IS A PROP ON A WALL. The clearest difference between
   the reels that look good and the ones that do not is that AGENCY is a PLACE
   and APPLE/SEO are an object on a flat wall. Every set below has:
     BEHIND   a back plane + two parallax bands
     ON       a ground plane with a lip, grit and a light pool
     IN FRONT a mass cropped by the panel edge (`Pier`) — the primitive that
              ten reels shipped without, because nothing fails when it is
              missing. That is exactly why it goes missing.

   ⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE. `pour` carries it through
   HOT METAL and a lit sand floor. Body sets target luma 70-105 and p10 <= 35,
   and when one is too dim the fix is a PRACTICAL (a lamp, a cone, a lit
   fascia) or a brighter SUBJECT — never the palette's dark stop.
   ========================================================================= */

/** ⛔⛔ THE FRAME-EDGE OCCLUDER. A mass cropped by the panel border, IN FRONT
    of the action. `kind` picks what sort of mass: a brick pier, a steel
    stanchion, a lamp post or a balustrade. */
export const Pier: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "brick" | "steel" | "post" | "rail"; f?: number; lit?: number }> =
  ({ side = "l", c, w = 138, z = 93, kind = "brick", f = 0, lit = 1 }) => {
  const anchor = side === "l" ? { left: -30 } : { right: -30 };
  const D = (k: number) => dkh(c, k * lit);
  if (kind === "post") return (
    <div style={{ position: "absolute", top: -50, bottom: -50, width: 46, zIndex: z,
      [side === "l" ? "left" : "right"]: 62,
      background: `linear-gradient(90deg, ${dkh(c, 0.52)} 0%, ${dkh(c, 0.10)} 34%, ${dkh(c, 0.70)} 100%)` }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"pb" + i} style={{ position: "absolute", top: 40 + i * 128, left: -9, width: 64,
          height: 13, borderRadius: 3, background: dkh(c, 0.50) }} />
      ))}
    </div>
  );
  if (kind === "rail") return (
    <div style={{ position: "absolute", left: -40, right: -40, bottom: -30, height: 250, zIndex: z }}>
      {/* a balustrade: a coping, balusters, and a plinth */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, borderRadius: 6,
        background: `linear-gradient(180deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.32)} 100%)` }} />
      {Array.from({ length: 15 }, (_, i) => (
        <div key={"bl" + i} style={{ position: "absolute", left: 12 + i * 76, top: 34, width: 38,
          height: 128, borderRadius: "18px 18px 6px 6px", background: dkh(c, 0.42) }} />
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 158, height: 92,
        background: `linear-gradient(180deg, ${dkh(c, 0.44)} 0%, ${dkh(c, 0.62)} 100%)` }} />
    </div>
  );
  if (kind === "steel") return (
    <div style={{ position: "absolute", top: -50, bottom: -50, width: w * 0.62, zIndex: z, ...anchor,
      background: `linear-gradient(90deg, ${dkh(c, 0.70)} 0%, ${dkh(c, 0.16)} 26%, ${dkh(c, 0.48)} 58%, ${dkh(c, 0.76)} 100%)` }}>
      {/* rivet columns and two flange plates — what makes steel read as steel */}
      {Array.from({ length: 14 }, (_, i) => (
        <React.Fragment key={"rv" + i}>
          <div style={{ position: "absolute", top: 30 + i * 76, left: 14, width: 13, height: 13,
            borderRadius: "50%", background: mxh(c, 0.22) }} />
          <div style={{ position: "absolute", top: 30 + i * 76, right: 14, width: 13, height: 13,
            borderRadius: "50%", background: dkh(c, 0.54) }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", top: 210, left: -12, right: -12, height: 30,
        background: dkh(c, 0.56) }} />
      <div style={{ position: "absolute", top: 560, left: -12, right: -12, height: 30,
        background: dkh(c, 0.56) }} />
    </div>
  );
  return (
    <div style={{ position: "absolute", top: -50, bottom: -50, width: w, zIndex: z, ...anchor,
      borderRadius: side === "l" ? "0 30px 44px 0" : "30px 0 0 44px",
      background: `linear-gradient(${side === "l" ? 90 : 270}deg, ${D(0.74)} 0%, ${D(0.44)} 62%, ${D(0.66)} 100%)` }}>
      {/* real brick courses, staggered — a flat rect reads as a colour swatch */}
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"bc" + i} style={{ position: "absolute", left: 0, right: 0, top: i * 42,
          height: 2.5, background: hexa("#000000", 0.26) }} />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"bv" + i} style={{ position: "absolute", top: i * 42, height: 42, width: 2.5,
          [side === "l" ? "right" : "left"]: 30 + (i % 2) * 52, background: hexa("#000000", 0.20) }} />
      ))}
      {/* the lit edge, so the mass has a side facing the practical */}
      <div style={{ position: "absolute", top: 0, bottom: 0, width: 9,
        [side === "l" ? "right" : "left"]: 0, background: mxh(c, 0.26 + (1 - lit) * 0.34) }} />
    </div>
  );
};

/** ⭐ THE GENERIC WORKS SET — back plane, two parallax bands, a ground plane
    with a lip, grit and a light pool. Everything a `Place` can give for free,
    so per-set code only has to draw what makes THAT room that room. */
export const Works: React.FC<{ p: Place; f: number; t?: number; lit?: number;
  /** the parallax band's own silhouette style */ band?: "stack" | "arch" | "block" | "truss";
  poolX?: number; poolW?: number; poolO?: number; z0?: number; grit?: number }> =
  ({ p, f, t = 0, lit = 1, band = "stack", poolX = 506, poolW = 900, poolO = 0.26,
     z0 = 1, grit = 22 }) => (
  <>
    {/* the back plane */}
    <div style={{ position: "absolute", inset: 0, zIndex: z0,
      background: `linear-gradient(178deg, ${p.back} 0%, ${p.back2} 100%)` }} />
    {/* the practical's haze — a solid disc plus one soft ring, never a blur */}
    <div style={{ position: "absolute", left: poolX - 420, top: p.horizon - 520, width: 840,
      height: 840, borderRadius: "50%", zIndex: z0 + 1,
      background: `radial-gradient(circle, ${hexa(p.key, 0.22 * lit)} 0%, ${hexa(p.key, 0.07 * lit)} 44%, ${hexa(p.key, 0)} 70%)` }} />
    {/* FAR BAND — 9 silhouettes, slowest parallax */}
    {Array.from({ length: 9 }, (_, i) => {
      const h = 130 + rnd(i, 3) * 190;
      const x = ((i * 128 + 30 - t * 0.10) % 1220) - 100;
      return (
        <div key={"fb" + i} style={{ position: "absolute", left: x, top: p.horizon - h - 82,
          width: 108, height: h, zIndex: z0 + 3,
          borderRadius: band === "arch" ? "54px 54px 3px 3px" : 3,
          background: hexa(dkh(p.back2, 0.30), 0.86) }}>
          {band === "stack" && <div style={{ position: "absolute", left: 34, top: -54, width: 26,
            height: 58, background: hexa(dkh(p.back2, 0.34), 0.86) }} />}
          {/* two lit windows per far shape — depth read as LIGHT, not as blur */}
          {[0, 1].map((k) => (
            <div key={"fw" + k} style={{ position: "absolute", left: 22 + k * 44,
              top: h * 0.30 + k * 34, width: 22, height: 26, borderRadius: 2,
              background: hexa(p.key, 0.28 * lit) }} />
          ))}
        </div>
      );
    })}
    {/* MID BAND — 7 shapes, faster, larger, brighter windows */}
    {Array.from({ length: 7 }, (_, i) => {
      const h = 150 + rnd(i, 11) * 210;
      const x = ((i * 172 + 66 - t * 0.24) % 1280) - 130;
      return (
        <div key={"mb" + i} style={{ position: "absolute", left: x, top: p.horizon - h - 12,
          width: 152, height: h, zIndex: z0 + 5,
          borderRadius: band === "arch" ? "76px 76px 4px 4px" : 4,
          background: hexa(dkh(p.back2, 0.48), 0.92) }}>
          {band === "truss" && Array.from({ length: 5 }, (_, k) => (
            <div key={"tz" + k} style={{ position: "absolute", left: 8 + k * 28, top: 6, width: 5,
              height: h - 12, background: hexa(dkh(p.back2, 0.62), 0.9),
              transform: `skewX(${k % 2 ? 12 : -12}deg)` }} />
          ))}
          {[0, 1, 2].map((k) => (
            <div key={"mw" + k} style={{ position: "absolute", left: 20 + (k % 2) * 74,
              top: h * 0.22 + k * 48, width: 46, height: 34, borderRadius: 2,
              background: hexa(p.key, 0.36 * lit) }} />
          ))}
        </div>
      );
    })}
    {/* the ground plane */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: z0 + 8,
      background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
    {/* the lip — the line that says where the wall stops and the floor starts */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 12,
      zIndex: z0 + 9, background: p.lip }} />
    {/* the light pool on the floor: a practical, never an emissive blur */}
    <Pool x={poolX} y={p.horizon + 168} w={poolW} c={p.key} o={poolO * lit} z={z0 + 10} />
    {/* grit — the thing that stops a floor being a gradient */}
    {Array.from({ length: grit }, (_, i) => (
      <div key={"gt" + i} style={{ position: "absolute",
        left: ((i * 103 + 40 - t * 0.62) % 1160) - 70,
        top: p.horizon + 22 + ((i * 53) % 11) * 22,
        width: 5 + (i % 3) * 5, height: 4, borderRadius: 2, background: p.grit,
        opacity: 0.42, zIndex: z0 + 11 }} />
    ))}
  </>
);

/* =========================================================================
   THE PER-PLACE STRUCTURE. What makes each room THAT room.
   ====================================================================== */
export const SetFor: React.FC<{ k: SetKey; f: number; lit?: number; t?: number;
  rakeRate?: number; rakeX0?: number; parX?: number; occ?: boolean; rakeAng?: number;
  /** ⭐ how DARK the frame-edge occluder is: 1 = silhouette, 0.30 = a lit face.
      The hook needs a lit pier for HOOK_LUMA; every body scene wants the dark
      one, because hierarchy needs DARKNESS and p10 is measured on the body. */
  pierLit?: number }> =
  ({ k, f, lit = 1, t = 0, rakeRate, rakeX0 = -260, parX = 0, occ = true, rakeAng = 0,
     pierLit }) => {
  const p = placeFor(k);
  const tt = t + parX;

  switch (k) {

    /* ---- S0/S1 · THE POUR HALL --------------------------------------------
       ⛔ THE HOOK CARRIES ITS LUMA ON HOT METAL AND A LIT SAND FLOOR, not on a
       lifted dark stop. The bright planes are: the sand floor under the pour,
       the arch of firebrick behind it catching the drum's own light, and the
       tapping bay at frame right. The DRUM is a near-black mass against all of
       it, which is the biggest value spread in the reel. */
    case "pour":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="arch" poolX={640} poolW={1080} poolO={0.34} />
        {/* ⭐ THE TAPPING BAY — the set's BRIGHT PLANE. Reel 109: brightness is
            the MEAN and hierarchy is the SPREAD, and they only fight when the
            fix reached for is the palette. This is a wide lit opening at the
            back of the hall with molten metal running in a trough across it, so
            the mean comes from the ROOM and the near-black hopper in front of
            it is still the biggest value gap in the reel. */}
        <div style={{ position: "absolute", left: 22, top: 108, width: 968, height: p.horizon - 96,
          zIndex: 7, borderRadius: "16px 16px 6px 6px", overflow: "hidden",
          background: `linear-gradient(178deg, #FFF6E2 0%, #FFE2AE 40%, #F0B368 78%, #C98A46 100%)` }}>
          {/* five firebrick arches, DARK against it, so the bay ranks */}
          {Array.from({ length: 5 }, (_, i) => (
            <div key={"ar" + i} style={{ position: "absolute", left: 18 + i * 190, bottom: 0,
              width: 152, height: p.horizon - 190, borderRadius: "76px 76px 3px 3px",
              background: `linear-gradient(178deg, ${hexa(dkh(OXIDE, 0.30), 0.94)} 0%, ${hexa(dkh(OXIDE, 0.58), 0.96)} 100%)`,
              border: `5px solid ${hexa(dkh(OXIDE, 0.64), 0.92)}` }}>
              <div style={{ position: "absolute", left: 15, right: 15, bottom: 0, top: 34,
                borderRadius: "62px 62px 0 0",
                background: `linear-gradient(178deg, ${hexa("#3A2618", 0.82)} 0%, ${hexa(EMBER, 0.90 * lit)} 34%, ${hexa("#FFF3D8", 0.96 * lit)} 100%)` }} />
              {/* the charge burning on each hearth — countable, and it moves */}
              {Array.from({ length: 3 }, (_, k) => (
                <div key={"ch" + k} style={{ position: "absolute", left: 26 + k * 36, bottom: 14,
                  width: 30, height: 22 + Math.sin(f / 6 + k * 2 + i) * 6, borderRadius: 5,
                  background: hexa("#FFFFFF", 0.92 * lit) }} />
              ))}
            </div>
          ))}
          {/* the running trough — a full-width travelling band of molten metal,
              alternating light and shadow, which is the only version of a band
              that raises motion WITHOUT lifting the black point. */}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, height: 44,
            overflow: "hidden", background: dkh(OXIDE, 0.60) }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div key={"tg" + i} style={{ position: "absolute", top: 5, height: 34,
                left: ((i * 70 + f * 4.6) % 1060) - 40, width: 40, borderRadius: 4,
                background: i % 2 ? hexa("#000000", 0.34) : `linear-gradient(180deg, #FFFFFF 0%, ${EMBER} 100%)` }} />
            ))}
          </div>
        </div>
        {/* the overhead charging gantry, crossing the whole frame */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 96, height: 40, zIndex: 20,
          background: `linear-gradient(180deg, ${dkh(IRON, 0.26)} 0%, ${dkh(IRON, 0.56)} 100%)` }}>
          {Array.from({ length: 13 }, (_, i) => (
            <div key={"gz" + i} style={{ position: "absolute", left: i * 92, top: -26, width: 7,
              height: 26, background: dkh(IRON, 0.52), transform: `skewX(${i % 2 ? 16 : -16}deg)` }} />
          ))}
        </div>
        {/* ⛔ THE FLOOR GRATE — the villain, present in the hook's before state,
            cropped by the panel's bottom edge. THE-OPEN law 3: recognition. */}
        <div style={{ position: "absolute", left: 60, right: 60, bottom: -6, height: 96, zIndex: 88,
          borderRadius: "8px 8px 0 0", overflow: "hidden",
          background: `linear-gradient(180deg, ${hexa("#0A0D12", 0.34)} 0%, ${hexa("#0A0D12", 0.86)} 100%)` }}>
          {Array.from({ length: 22 }, (_, i) => (
            <div key={"gb" + i} style={{ position: "absolute", left: 10 + i * 40, top: 0, width: 26,
              height: 96,
              background: `linear-gradient(90deg, ${dkh("#B8BEC6", 0.30)} 0%, #D8DEE4 38%, ${dkh("#B8BEC6", 0.42)} 100%)` }} />
          ))}
          {/* the two bearer bars that carry them, crossing the whole opening */}
          {[18, 62].map((ty, i) => (
            <div key={"bb" + i} style={{ position: "absolute", left: 0, right: 0, top: ty,
              height: 13, background: `linear-gradient(180deg, #E4E9ED 0%, ${dkh("#B8BEC6", 0.36)} 100%)` }} />
          ))}
          {/* something turning down there */}
          <div style={{ position: "absolute", left: 300 - ((f * 1.6) % 460), top: 34, width: 240,
            height: 40, borderRadius: 20, background: hexa("#6A6258", 0.44) }} />
        </div>
        <Rake f={f} y={110} h={430} n={6} c="#FFD9A0" o={0.24} rate={rakeRate ?? 6.4} z={19}
          x0={rakeX0} ang={-16 + rakeAng} />
        {occ && <Pier side="l" c="#C4753F" w={128} kind="brick" lit={pierLit ?? 0.30} />}
      </>);

    /* ---- S2 · THE GRIND ----------------------------------------------------
       Deliberately the coldest, dimmest frame in the reel: a low vaulted
       sub-floor, one overhead lamp, wet concrete. The next cut is a furnace
       mouth, so this has to sit at the bottom of BOTH hue and lightness. */
    case "grind":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="arch" poolX={506} poolW={720} poolO={0.30} grit={14} />
        {/* the low vault overhead — three ribs, cropping the top of frame */}
        {Array.from({ length: 3 }, (_, i) => (
          <div key={"vt" + i} style={{ position: "absolute", left: -80 + i * 400, top: -80,
            width: 460, height: 250, zIndex: 18, borderRadius: "0 0 230px 230px",
            background: `linear-gradient(180deg, ${hexa("#10151B", 0.96)} 0%, ${hexa("#1C242D", 0.86)} 100%)`,
            border: `6px solid ${hexa("#0A0E13", 0.9)}`, borderTop: "none" }} />
        ))}
        {/* pipe runs along the back wall — a sub-floor is under something */}
        {[0, 1, 2].map((i) => (
          <div key={"pp" + i} style={{ position: "absolute", left: -40, right: -40,
            top: 210 + i * 42, height: 22, zIndex: 9,
            background: `linear-gradient(180deg, ${mxh("#3E464F", 0.16)} 0%, ${dkh("#3E464F", 0.40)} 100%)` }}>
            {Array.from({ length: 8 }, (_, k) => (
              <div key={"pf" + k} style={{ position: "absolute", left: 60 + k * 140, top: -5,
                width: 26, height: 32, borderRadius: 3, background: dkh("#3E464F", 0.52) }} />
            ))}
          </div>
        ))}
        {/* the one lamp, and the cone it actually throws */}
        <div style={{ position: "absolute", left: 466, top: 92, width: 80, height: 26, zIndex: 30,
          borderRadius: "0 0 40px 40px", background: dkh(IRON, 0.56) }} />
        <div style={{ position: "absolute", left: 306, top: 116, width: 400, height: 470, zIndex: 12,
          clipPath: "polygon(38% 0, 62% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(180deg, ${hexa("#CFE2ED", 0.40 * lit)} 0%, ${hexa("#CFE2ED", 0.04)} 100%)` }} />
        {/* the lens itself, so the cone has a visible source */}
        <div style={{ position: "absolute", left: 476, top: 112, width: 60, height: 14, zIndex: 31,
          borderRadius: 7, background: hexa("#EAF4FA", 0.92 * lit) }} />
        {/* a caged wall lamp over the trough — the second practical. ⛔ NOT a
            lifted dark stop: the palette is untouched and the room still has the
            reel's coldest, deepest shadow either side of these two sources. */}
        <div style={{ position: "absolute", left: 812, top: 292, width: 74, height: 74, zIndex: 30,
          borderRadius: "50%", background: hexa("#DCEAF2", 0.80 * lit),
          border: `5px solid ${dkh(IRON, 0.60)}` }}>
          {[0, 1, 2].map((i) => (
            <div key={"cg" + i} style={{ position: "absolute", left: 6 + i * 20, top: 2, width: 5,
              height: 60, background: dkh(IRON, 0.56) }} />
          ))}
        </div>
        <Pool x={846} y={368} w={420} c="#CFE2ED" o={0.26 * lit} z={13} />
        {/* the wet-floor reflection band — the only bright plane down here */}
        <div style={{ position: "absolute", left: 250, right: 250, top: p.horizon + 120, height: 130,
          zIndex: 13, borderRadius: "50%",
          background: `radial-gradient(circle, ${hexa("#C8DAE6", 0.20 * lit)} 0%, ${hexa("#C8DAE6", 0)} 70%)` }} />
        {occ && <Pier side="r" c="#2A333C" w={124} kind="steel" />}
      </>);

    /* ---- S3 · THE BURN FLOOR ---------------------------------------------- */
    case "burn":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="stack" poolX={340} poolW={880} poolO={0.36} />
        {/* a row of flue stacks behind, venting */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"fl" + i} style={{ position: "absolute", left: 20 + i * 168, top: 60,
            width: 62, height: p.horizon - 60, zIndex: 8,
            background: `linear-gradient(90deg, ${hexa(dkh(OXIDE, 0.52), 0.94)} 0%, ${hexa(dkh(OXIDE, 0.32), 0.94)} 40%, ${hexa(dkh(OXIDE, 0.58), 0.94)} 100%)` }}>
            <div style={{ position: "absolute", left: -9, top: 0, width: 80, height: 20,
              borderRadius: 4, background: hexa(dkh(OXIDE, 0.62), 0.94) }} />
            {/* the vent plume, on its own clock per stack */}
            <div style={{ position: "absolute", left: 12, top: -40 - ((f * 1.4 + i * 30) % 60),
              width: 38, height: 38, borderRadius: "50%",
              background: hexa("#8A7A66", 0.22), opacity: 0.6 }} />
          </div>
        ))}
        {/* the charging deck overhead, with its handrail */}
        <div style={{ position: "absolute", left: -50, right: -50, top: 150, height: 34, zIndex: 21,
          background: `linear-gradient(180deg, ${dkh(IRON, 0.30)} 0%, ${dkh(IRON, 0.58)} 100%)` }} />
        {Array.from({ length: 16 }, (_, i) => (
          <div key={"hr" + i} style={{ position: "absolute", left: i * 72, top: 118, width: 6,
            height: 34, zIndex: 21, background: dkh(IRON, 0.50) }} />
        ))}
        {/* slag heaps on the floor, so it reads as a working floor */}
        {[130, 780].map((x, i) => (
          <div key={"sg" + i} style={{ position: "absolute", left: x, top: p.horizon + 96, width: 210,
            height: 74, zIndex: 17, borderRadius: "50% 50% 12px 12px",
            background: `linear-gradient(180deg, ${dkh("#5A4632", 0.20)} 0%, ${dkh("#5A4632", 0.52)} 100%)` }} />
        ))}
        <Rake f={f} y={130} h={470} n={7} c="#FFCE92" o={0.26} rate={rakeRate ?? 6.8} z={19}
          x0={rakeX0} ang={-14 + rakeAng} />
        {occ && <Pier side="l" c={OXIDE} w={126} kind="brick" />}
      </>);

    /* ---- S4/S5/S6 · THE MODEL LINE, three framings of one bay -------------
       ⭐ ONE ROOM, FOUR COLOUR TEMPERATURES. The wide grades warm at frame
       left to violet at frame right, so the two punch-ins read as new places
       without a new set being built. */
    case "line":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="truss" poolX={506} poolW={1020} poolO={0.24} />
        {/* the grade across the back wall — four sources in one frame */}
        <div style={{ position: "absolute", inset: 0, zIndex: 6,
          background: `linear-gradient(90deg, ${hexa(SODIUM, 0.20 * lit)} 0%, ${hexa(SODIUM, 0.10 * lit)} 28%, ${hexa("#8FD6EE", 0.12 * lit)} 46%, ${hexa(RED, 0.14 * lit)} 72%, ${hexa(VIOLET, 0.22 * lit)} 100%)` }} />
        {/* vent louvres along the back wall */}
        {Array.from({ length: 11 }, (_, i) => (
          <div key={"lv" + i} style={{ position: "absolute", left: 12 + i * 92, top: 150, width: 74,
            height: 96, zIndex: 9, borderRadius: 4, overflow: "hidden",
            background: hexa("#1E1822", 0.62), border: `3px solid ${hexa("#100C14", 0.7)}` }}>
            {[0, 1, 2, 3].map((k) => (
              <div key={"lb" + k} style={{ position: "absolute", left: 3, right: 3, top: 6 + k * 22,
                height: 12, borderRadius: 2, background: hexa("#3A3244", 0.8) }} />
            ))}
          </div>
        ))}
        {/* rail tracks on the floor, receding — the line is a LINE */}
        {[0, 1].map((i) => (
          <div key={"rt" + i} style={{ position: "absolute", left: -40, right: -40,
            top: p.horizon + 116 + i * 74, height: 12, zIndex: 16,
            background: `linear-gradient(180deg, ${mxh(IRON, 0.20)} 0%, ${dkh(IRON, 0.44)} 100%)` }} />
        ))}
        {Array.from({ length: 15 }, (_, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: -20 + i * 76,
            top: p.horizon + 112, width: 44, height: 90, zIndex: 15, borderRadius: 3,
            background: hexa(dkh("#4A3E32", 0.30), 0.7) }} />
        ))}
        <Rake f={f} y={120} h={440} n={7} c="#FFDDB0" o={0.20} rate={rakeRate ?? 6.0} z={19}
          x0={rakeX0} ang={-12 + rakeAng} />
        {occ && <Pier side="r" c="#3A3040" w={122} kind="steel" />}
      </>);

    case "fast":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="truss" poolX={506} poolW={760} poolO={0.30} />
        {/* a cooling rack behind, stacked with parts, blue tube light on it */}
        <div style={{ position: "absolute", left: 40, right: 40, top: 150, height: 250, zIndex: 9,
          borderRadius: 6, background: hexa("#1A2830", 0.72), border: `5px solid ${hexa("#0E1A22", 0.8)}` }}>
          {Array.from({ length: 4 }, (_, r) => (
            <div key={"cs" + r} style={{ position: "absolute", left: 8, right: 8, top: 10 + r * 60,
              height: 8, borderRadius: 3, background: hexa("#4A6570", 0.9) }} />
          ))}
          {Array.from({ length: 18 }, (_, i) => (
            <div key={"cp" + i} style={{ position: "absolute", left: 20 + (i % 6) * 148,
              top: 22 + Math.floor(i / 6) * 60, width: 62, height: 30, borderRadius: 4,
              transform: `rotate(${(rnd(i, 5) - 0.5) * 30}deg)`,
              background: hexa(STEEL, 0.7) }} />
          ))}
        </div>
        {/* the blue tube — the practical, and it FLICKERS fast, which is the
            whole depiction of the beat */}
        <div style={{ position: "absolute", left: 80, right: 80, top: 120, height: 16, zIndex: 24,
          borderRadius: 8,
          background: hexa("#BFEEFF", (0.6 + Math.sin(f / 2.1) * 0.22) * lit) }} />
        <Rake f={f} y={110} h={460} n={8} c="#CFF2FF" o={0.24} rate={rakeRate ?? 11.5} z={19}
          x0={rakeX0} ang={-18 + rakeAng} />
        {occ && <Pier side="l" c="#243038" w={120} kind="steel" />}
      </>);

    case "deep":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="arch" poolX={506} poolW={880} poolO={0.28} />
        {/* two great arches, one red one violet, facing each other */}
        {[[36, RED], [606, VIOLET]].map(([x, c], i) => (
          <div key={"da" + i} style={{ position: "absolute", left: x as number, top: 122,
            width: 370, height: p.horizon - 100, zIndex: 8, borderRadius: "185px 185px 5px 5px",
            background: `linear-gradient(178deg, ${hexa(dkh(c as string, 0.34), 0.9)} 0%, ${hexa(dkh(c as string, 0.60), 0.94)} 100%)`,
            border: `6px solid ${hexa(dkh(c as string, 0.62), 0.92)}` }}>
            <div style={{ position: "absolute", left: 26, right: 26, top: 44, bottom: 0,
              borderRadius: "160px 160px 0 0",
              background: `linear-gradient(178deg, ${hexa(c as string, 0.34 * lit)} 0%, ${hexa("#140E16", 0.86)} 78%)` }} />
          </div>
        ))}
        {/* the crane rail across the top, and its trolley crossing */}
        <div style={{ position: "absolute", left: -50, right: -50, top: 96, height: 30, zIndex: 22,
          background: `linear-gradient(180deg, ${dkh(IRON, 0.28)} 0%, ${dkh(IRON, 0.56)} 100%)` }} />
        <div style={{ position: "absolute", left: ((f * 2.4) % 1160) - 80, top: 118, width: 96,
          height: 44, zIndex: 23, borderRadius: 5, background: dkh(IRON, 0.48),
          border: `3px solid ${dkh(IRON, 0.66)}` }} />
        <Rake f={f} y={120} h={450} n={7} c="#E8CCFF" o={0.22} rate={rakeRate ?? 6.6} z={19}
          x0={rakeX0} ang={-15 + rakeAng} />
        {occ && <Pier side="l" c="#33232E" w={124} kind="brick" />}
      </>);

    /* ---- S7/S8 · THE MEMORY VAULT and the same room after the shutter ------ */
    case "vault":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="block" poolX={506} poolW={980} poolO={0.26} />
        {/* the mezzanine gallery over the wall — a vault is TALL */}
        <div style={{ position: "absolute", left: -40, right: -40, top: 132, height: 30, zIndex: 22,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.14)} 0%, ${dkh(BRASS, 0.44)} 100%)` }} />
        {Array.from({ length: 18 }, (_, i) => (
          <div key={"bal" + i} style={{ position: "absolute", left: i * 62, top: 92, width: 9,
            height: 42, zIndex: 21, borderRadius: 4, background: dkh(BRASS, 0.40) }} />
        ))}
        {/* pilasters down the enamel wall */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"pl" + i} style={{ position: "absolute", left: -10 + i * 202, top: 160,
            width: 40, height: p.horizon - 150, zIndex: 12, borderRadius: 3,
            background: `linear-gradient(90deg, ${dkh(ENAM, 0.44)} 0%, ${mxh(ENAM, 0.14)} 40%, ${dkh(ENAM, 0.52)} 100%)` }} />
        ))}
        {/* parquet floor, so the room reads as a LIBRARY and not a shed */}
        {Array.from({ length: 30 }, (_, i) => (
          <div key={"pq" + i} style={{ position: "absolute",
            left: (i % 6) * 174 - 20, top: p.horizon + 26 + Math.floor(i / 6) * 46,
            width: 160, height: 34, zIndex: 15, borderRadius: 2,
            background: hexa(i % 2 ? "#7A6B4E" : "#6B5E44", 0.42) }} />
        ))}
        <Rake f={f} y={140} h={420} n={6} c="#FFE9BE" o={0.18} rate={rakeRate ?? 5.4} z={19}
          x0={rakeX0} ang={-11 + rakeAng} />
        {occ && <Pier side="r" c="#2A4038" w={126} kind="brick" />}
      </>);

    case "booth":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit * 0.5} band="block" poolX={506} poolW={520} poolO={0.24} grit={12} />
        {/* the same wall, unlit — the room the shutter took away */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"pl" + i} style={{ position: "absolute", left: -10 + i * 202, top: 160,
            width: 40, height: p.horizon - 150, zIndex: 12, borderRadius: 3,
            background: hexa("#1A2426", 0.9) }} />
        ))}
        <div style={{ position: "absolute", left: -40, right: -40, top: 132, height: 30, zIndex: 22,
          background: hexa("#141C1E", 0.94) }} />
        {occ && <Pier side="r" c="#182224" w={126} kind="brick" />}
      </>);

    /* ---- S9 · THE STREET WINDOW ------------------------------------------- */
    case "street":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="block" poolX={506} poolW={1060} poolO={0.30} />
        {/* a receding block of fronts, three depths, each with lit windows */}
        {Array.from({ length: 5 }, (_, i) => {
          const x = ((i * 236 + 40 - t * 0.44) % 1300) - 140;
          return (
            <div key={"bf" + i} style={{ position: "absolute", left: x, top: 128, width: 212,
              height: p.horizon - 118, zIndex: 11, borderRadius: 4,
              background: `linear-gradient(178deg, ${hexa("#26343F", 0.94)} 0%, ${hexa("#18232B", 0.96)} 100%)` }}>
              {Array.from({ length: 9 }, (_, k) => (
                <div key={"bw" + k} style={{ position: "absolute", left: 16 + (k % 3) * 66,
                  top: 24 + Math.floor(k / 3) * 78, width: 48, height: 54, borderRadius: 2,
                  background: hexa(rnd(i * 9 + k, 3) > 0.28 ? SODIUM : "#3A4A56",
                    rnd(i * 9 + k, 3) > 0.28 ? 0.36 * lit : 0.5) }} />
              ))}
            </div>
          );
        })}
        {/* the kerb, and the wet road reflecting the lamps */}
        <div style={{ position: "absolute", left: -40, right: -40, top: p.horizon + 74, height: 20,
          zIndex: 17, background: `linear-gradient(180deg, ${mxh("#5C6874", 0.14)} 0%, ${dkh("#5C6874", 0.34)} 100%)` }} />
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"rf" + i} style={{ position: "absolute", left: 60 + i * 220,
            top: p.horizon + 100, width: 90, height: 150, zIndex: 16, borderRadius: "50%",
            background: `radial-gradient(circle, ${hexa(SODIUM, 0.26 * lit)} 0%, ${hexa(SODIUM, 0)} 70%)` }} />
        ))}
        {/* the street lamps themselves, so the reflections have a source */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"lm" + i} style={{ position: "absolute", left: 96 + i * 262, top: 200,
            width: 12, height: p.horizon - 180, zIndex: 26, background: dkh(IRON, 0.56) }}>
            <div style={{ position: "absolute", left: -30, top: -14, width: 72, height: 18,
              borderRadius: "9px 9px 0 0", background: dkh(IRON, 0.62) }} />
            <div style={{ position: "absolute", left: -22, top: 2, width: 56, height: 12,
              borderRadius: 6, background: hexa(SODIUM, 0.86 * lit) }} />
          </div>
        ))}
        <Rake f={f} y={150} h={430} n={6} c="#FFD8A0" o={0.18} rate={rakeRate ?? 7.2} z={19}
          x0={rakeX0} ang={-13 + rakeAng} />
        {occ && <Pier side="r" c="#22303A" w={44} kind="post" />}
      </>);

    /* ---- S10 · THE FORM HALL ---------------------------------------------- */
    case "hall":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="truss" poolX={506} poolW={1000} poolO={0.22} />
        {/* the truss roof, cropping the top of frame */}
        <div style={{ position: "absolute", left: -60, right: -60, top: -20, height: 132, zIndex: 20,
          background: `linear-gradient(180deg, ${hexa("#232936", 0.96)} 0%, ${hexa("#2E3440", 0.72)} 100%)` }}>
          {Array.from({ length: 18 }, (_, i) => (
            <div key={"tr" + i} style={{ position: "absolute", left: i * 66, top: 34, width: 6,
              height: 96, background: hexa("#4A5260", 0.8),
              transform: `skewX(${i % 2 ? 20 : -20}deg)` }} />
          ))}
        </div>
        {/* tall windows down the back wall */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"tw" + i} style={{ position: "absolute", left: 40 + i * 194, top: 140,
            width: 130, height: p.horizon - 150, zIndex: 9, borderRadius: "62px 62px 3px 3px",
            background: `linear-gradient(178deg, ${hexa("#B8A6D8", 0.22 * lit)} 0%, ${hexa("#3A4250", 0.7)} 100%)`,
            border: `4px solid ${hexa("#4A5260", 0.9)}` }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 4,
              marginLeft: -2, background: hexa("#4A5260", 0.9) }} />
            {[0.34, 0.62].map((k, j) => (
              <div key={"tm" + j} style={{ position: "absolute", left: 0, right: 0, top: `${k * 100}%`,
                height: 4, background: hexa("#4A5260", 0.9) }} />
            ))}
          </div>
        ))}
        {/* a polished floor: two reflection bands under the windows */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"pf" + i} style={{ position: "absolute", left: 44 + i * 194, top: p.horizon + 10,
            width: 122, height: 96, zIndex: 15,
            background: `linear-gradient(180deg, ${hexa("#B8A6D8", 0.14 * lit)} 0%, ${hexa("#B8A6D8", 0)} 100%)` }} />
        ))}
        <Rake f={f} y={130} h={450} n={7} c="#DCCCF6" o={0.18} rate={rakeRate ?? 7.6} z={19}
          x0={rakeX0} ang={-14 + rakeAng} />
        {occ && <Pier side="l" c="#232838" w={148} kind="steel" lit={pierLit ?? 1.2} />}
      </>);

    /* ---- S11 · THE CODE LOFT ---------------------------------------------- */
    case "loft":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="block" poolX={620} poolW={900} poolO={0.26} />
        {/* the great night window — a real multi-pane, with a city behind it */}
        <div style={{ position: "absolute", left: 46, top: 118, width: 640, height: p.horizon - 108,
          zIndex: 9, borderRadius: 5, overflow: "hidden",
          background: `linear-gradient(178deg, ${hexa("#1A2244", 0.94)} 0%, ${hexa("#0E1428", 0.96)} 100%)`,
          border: `7px solid ${hexa("#2C3352", 0.94)}` }}>
          {/* the city outside — small, dense, and it does not move */}
          {Array.from({ length: 34 }, (_, i) => (
            <div key={"ct" + i} style={{ position: "absolute", left: (i * 37) % 620,
              bottom: 0, width: 22 + (i % 3) * 12, height: 40 + rnd(i, 5) * 150,
              background: hexa("#0A0F20", 0.9) }}>
              {[0, 1].map((k) => (
                <div key={"cw" + k} style={{ position: "absolute", left: 4 + k * 11, top: 12 + k * 22,
                  width: 6, height: 8, background: hexa("#FFE0B0", 0.4 * lit) }} />
              ))}
            </div>
          ))}
          {/* the mullions */}
          {[0.33, 0.66].map((k, i) => (
            <div key={"ml" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 0,
              bottom: 0, width: 7, background: hexa("#2C3352", 0.94) }} />
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: "44%", height: 7,
            background: hexa("#2C3352", 0.94) }} />
        </div>
        {/* the board wall at frame right — pinned work, a loft has history */}
        <div style={{ position: "absolute", left: 712, top: 150, width: 262, height: 300, zIndex: 10,
          borderRadius: 5, background: hexa("#2A2E42", 0.9), border: `5px solid ${hexa("#1C2032", 0.9)}` }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={"pn" + i} style={{ position: "absolute", left: 14 + (i % 3) * 82,
              top: 16 + Math.floor(i / 3) * 94, width: 68, height: 78, borderRadius: 3,
              transform: `rotate(${(rnd(i, 7) - 0.5) * 10}deg)`,
              background: hexa(i % 3 === 0 ? CREAMB : "#9AA0B8", 0.7) }} />
          ))}
        </div>
        {/* roof trusses, cropping the top */}
        <div style={{ position: "absolute", left: -60, right: -60, top: -24, height: 108, zIndex: 21,
          background: `linear-gradient(180deg, ${hexa("#12162A", 0.96)} 0%, ${hexa("#171C30", 0.6)} 100%)` }}>
          {Array.from({ length: 16 }, (_, i) => (
            <div key={"lt" + i} style={{ position: "absolute", left: i * 72, top: 30, width: 6,
              height: 78, background: hexa("#333A56", 0.86), transform: `skewX(${i % 2 ? 18 : -18}deg)` }} />
          ))}
        </div>
        <Rake f={f} y={110} h={460} n={6} c="#FFE6BC" o={0.20} rate={rakeRate ?? 6.4} z={19}
          x0={rakeX0} ang={-13 + rakeAng} />
        {occ && <Pier side="r" c="#232840" w={122} kind="steel" />}
      </>);

    /* ---- S12 · THE AUTOMATION LINE — THE PEAK ------------------------------ */
    case "looms":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="truss" poolX={430} poolW={1040} poolO={0.30} />
        {/* the run receding: five bays with warm practicals down them */}
        {Array.from({ length: 5 }, (_, i) => (
          <div key={"by" + i} style={{ position: "absolute", left: -20 + i * 210, top: 130,
            width: 176, height: p.horizon - 120, zIndex: 9, borderRadius: 4,
            background: `linear-gradient(178deg, ${hexa(dkh(BRASS, 0.50), 0.86)} 0%, ${hexa("#241D16", 0.94)} 100%)` }}>
            <div style={{ position: "absolute", left: 62, top: 22, width: 52, height: 16,
              borderRadius: 8, background: hexa(GOLD, 0.72 * lit) }} />
          </div>
        ))}
        {/* the line shaft overhead with its belt drops — this is what drives a
            loom hall, and it is a full-width travelling band */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 118, height: 26, zIndex: 23,
          background: `linear-gradient(180deg, ${mxh(BRASS, 0.18)} 0%, ${dkh(BRASS, 0.48)} 100%)` }} />
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"bd" + i} style={{ position: "absolute", left: 40 + i * 148, top: 140, width: 18,
            height: 190, zIndex: 22,
            background: `repeating-linear-gradient(180deg, ${hexa("#0E0A06", 0.7)} 0px, ${hexa("#0E0A06", 0.7)} ${8}px, ${hexa(CREAMB, 0.30)} ${8}px, ${hexa(CREAMB, 0.30)} ${16}px)`,
            backgroundPositionY: `${(f * 5) % 16}px` }} />
        ))}
        {/* ⛔ THE SHAFT DOWN TO THE GRIND, at frame right. The villain is
            REACHABLE from this scene, which is what lets the peak kill it. */}
        <div style={{ position: "absolute", right: 30, top: p.horizon + 40, width: 236, height: 300,
          zIndex: 18, borderRadius: "8px 8px 0 0", overflow: "hidden",
          background: `linear-gradient(180deg, ${hexa("#0A0D12", 0.5)} 0%, ${hexa("#0A0D12", 0.94)} 100%)`,
          border: `6px solid ${dkh(IRON, 0.62)}` }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={"sb" + i} style={{ position: "absolute", left: 8 + i * 38, top: 0, width: 18,
              height: 300, background: dkh(IRON, 0.56) }} />
          ))}
        </div>
        <Rake f={f} y={120} h={450} n={7} c="#FFE0A8" o={0.22} rate={rakeRate ?? 8.2} z={19}
          x0={rakeX0} ang={-13 + rakeAng} />
        {occ && <Pier side="l" c="#3A2E1E" w={124} kind="brick" />}
      </>);

    /* ---- S13/S14 · THE SOCKET WALL ---------------------------------------- */
    case "socket":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="block" poolX={506} poolW={960} poolO={0.28} />
        {/* the cable trays overhead, running the full width */}
        {[0, 1].map((i) => (
          <div key={"cy" + i} style={{ position: "absolute", left: -50, right: -50, top: 92 + i * 46,
            height: 24, zIndex: 22, background: hexa(dkh(VIOLET, 0.56), 0.9) }}>
            {Array.from({ length: 20 }, (_, k) => (
              <div key={"cr" + k} style={{ position: "absolute", left: k * 58, top: 4, width: 34,
                height: 16, borderRadius: 3, background: hexa(CYAN, 0.20) }} />
            ))}
          </div>
        ))}
        {/* the wall receding into depth — this is where "and so much more" goes */}
        {Array.from({ length: 4 }, (_, i) => (
          <div key={"sw" + i} style={{ position: "absolute", left: 40 + i * 232, top: 176,
            width: 200, height: p.horizon - 166, zIndex: 8 + i, borderRadius: 4,
            background: `linear-gradient(178deg, ${hexa(dkh(VIOLET, 0.34 + i * 0.06), 0.9)} 0%, ${hexa(dkh(VIOLET, 0.62), 0.94)} 100%)` }} />
        ))}
        <Rake f={f} y={130} h={440} n={7} c="#C8E8F4" o={0.20} rate={rakeRate ?? 7.8} z={19}
          x0={rakeX0} ang={-15 + rakeAng} />
        {occ && <Pier side="l" c="#2A2140" w={122} kind="steel" />}
      </>);

    /* ---- S15 · THE BALCONY, DAWN ------------------------------------------
       The only frame in the reel that looks DOWN at the whole works, and the
       brightest since the hook. The grind is visible and DARK. */
    case "dawn":
      return (<>
        <Works p={p} f={f} t={tt} lit={lit} band="stack" poolX={506} poolW={1080} poolO={0.20} grit={10} />
        {/* the sun — a solid disc, never an emissive blur */}
        <div style={{ position: "absolute", left: 620, top: 214, width: 168, height: 168,
          borderRadius: "50%", zIndex: 4, background: "#FFEFC8" }} />
        {/* the works below in silhouette, with its lit windows and dead grind */}
        {Array.from({ length: 8 }, (_, i) => (
          <div key={"wk" + i} style={{ position: "absolute", left: -30 + i * 142,
            top: p.horizon - 100 - rnd(i, 3) * 120, width: 126,
            height: 140 + rnd(i, 3) * 130, zIndex: 12, borderRadius: 3,
            background: hexa("#4A3E36", 0.88) }}>
            {Array.from({ length: 4 }, (_, k) => (
              <div key={"ww" + k} style={{ position: "absolute", left: 14 + (k % 2) * 56,
                top: 20 + Math.floor(k / 2) * 52, width: 40, height: 34, borderRadius: 2,
                background: hexa(GOLD, 0.44) }} />
            ))}
            {i % 3 === 0 && <div style={{ position: "absolute", left: 44, top: -56, width: 30,
              height: 58, background: hexa("#4A3E36", 0.88) }} />}
          </div>
        ))}
        <Rake f={f} y={150} h={400} n={6} c="#FFE6BC" o={0.16} rate={rakeRate ?? 5.6} z={19}
          x0={rakeX0} ang={-10 + rakeAng} />
        {occ && <Pier side="l" c="#4A3E30" kind="rail" lit={pierLit ?? 1.2} />}
      </>);

    default:
      return <Works p={p} f={f} t={tt} lit={lit} />;
  }
};
