import React from "react";
import {
  W, H, E, OUT, IO, LIN, hexa, mix, dark, SH, SH_D, rnd, dkh, mxh,
  PLACES, Rake, Tower, Front, PartsRack, FloodHead, ConeLight, Pool,
  R, GOLD, TEAL, CONCRETE, ui, mono,
} from "./LibWorld";
import type { Place, Seat } from "./LibWorld";

/* ===========================================================================
   REEL 111 · "LIBRARIES" — THE SETS.  Board: storyboards/111-libraries.md.

   ⭐⭐ THE SET IS WORTH MORE THAN THE EFFECTS (ANIMATION-QUALITY §1). Three
   rounds of hand-added scan bars, trolleys and mid-scene events stalled reel 104
   at 7.68; rebuilding the SET as a dense, on-topic place cleared the bar in one
   pass. **Build the right room before you add motion to the wrong one.**

   ⛔⛔ EVERY SET CARRIES AN OCCLUDER — a mass cropped by the panel edge, IN
   FRONT of the action. Ten reels shipped without one and nothing failed, which
   is exactly why it goes missing. It is the single thing that separates a place
   from a backdrop, and `look_audit` reports depth but never fails it, so this
   is on the author.

   Eleven sets, all on ONE continuous street, each with >=4 depth planes and one
   committed light direction. Neighbours differ in both HUE and LIGHTNESS.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/* ---------------------------------------------------------------------------
   THE EXTERIOR SHELL — sky, one haze source, three parallax building bands,
   road, kerb, drifting grit, overhead catenary. Six depth planes before a prop
   lands anywhere.
   ------------------------------------------------------------------------ */
const Band: React.FC<{ c: string; win: string; y: number; n: number; seed: number;
  dx: number; z: number; lit: number; hMin: number; hMax: number }> =
  ({ c, win, y, n, seed, dx, z, lit, hMin, hMax }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const bw = 96 + rnd(seed, i) * 150;
    const bh = hMin + rnd(seed + 3, i) * (hMax - hMin);
    const x = ((i * (1160 / n) + rnd(seed + 7, i) * 60 - dx) % 1320) - 154;
    return (
      <div key={"b" + seed + i} style={{ position: "absolute", left: x, top: y - bh,
        width: bw, height: bh, background: c, zIndex: z }}>
        {Array.from({ length: Math.max(2, Math.floor(bh / 44)) }, (_, r) =>
          Array.from({ length: Math.max(2, Math.floor(bw / 34)) }, (_, q) => {
            const on = rnd(seed * 13 + i * 7 + r * 3, q) < lit;
            return on ? (
              <div key={`w${r}_${q}`} style={{ position: "absolute", left: 11 + q * 34,
                top: 14 + r * 44, width: 15, height: 21, background: win, opacity: 0.85 }} />
            ) : null;
          })
        )}
      </div>
    );
  })}
</>);

export const Street: React.FC<{ p: Place; f: number; t?: number; lit?: number;
  ceiling?: boolean; wires?: boolean; band?: React.ReactNode; glowX?: number;
  glowR?: number }> =
  ({ p, f, t = 0, lit = 0.30, ceiling = true, wires = true, band, glowX = 200, glowR = 150 }) => (<>
  {/* 1 · sky */}
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  {/* 2 · ONE haze source — a solid disc plus a soft ring, never an emissive blur */}
  <div style={{ position: "absolute", left: glowX - glowR * 1.5, top: 96 - glowR * 1.5,
    width: glowR * 3, height: glowR * 3, borderRadius: "50%", zIndex: 3,
    background: `radial-gradient(circle, ${hexa(p.key, 0.26)} 0%, ${hexa(p.key, 0.09)} 44%, ${hexa(p.key, 0)} 70%)` }} />
  {/* 3,4,5 · three parallax building bands, far to near */}
  <Band c={dkh(p.back2, 0.10)} win={mxh(p.key, 0.30)} y={p.horizon - 168} n={9} seed={3}
    dx={t * 0.09} z={8} lit={lit * 0.55} hMin={126} hMax={286} />
  <Band c={dkh(p.back2, 0.26)} win={mxh(p.key, 0.14)} y={p.horizon - 88} n={7} seed={11}
    dx={t * 0.20} z={10} lit={lit * 0.80} hMin={106} hMax={244} />
  <Band c={dkh(p.back2, 0.44)} win={p.key} y={p.horizon - 4} n={6} seed={23}
    dx={t * 0.38} z={12} lit={lit} hMin={88} hMax={186} />
  {/* whatever this stretch of street has on it */}
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: p.horizon, zIndex: 13 }}>
    {band}
  </div>
  {/* 6 · road + kerb lip */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 9, height: 11,
    background: p.lip, zIndex: 15 }} />
  {/* 7 · wet grit drifting across the road — the street never flatlines */}
  {Array.from({ length: 26 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 30 - t * 0.62) % 1190) - 62,
      top: p.horizon + 20 + ((i * 51) % 10) * 26,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: p.grit,
      opacity: 0.34, zIndex: 16 }} />
  ))}
  {/* 8 · the overhead catenary — a real street has something above it */}
  {wires && (<>
    {[0, 1].map(i => (
      <div key={"wr" + i} style={{ position: "absolute", left: -40, right: -40, top: 54 + i * 38,
        height: 4, background: hexa("#0A0C12", 0.52), zIndex: 18,
        transform: `rotate(${i ? 0.7 : -0.5}deg)` }} />
    ))}
  </>)}
  {ceiling && (
    <div style={{ position: "absolute", left: 0, right: 0, top: -30, height: 104, zIndex: 90,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.30)} 0%, ${hexa(dkh(p.back2, 0.30), 0)} 100%)` }} />
  )}
</>);

/** ⛔⛔ THE OCCLUDER. A scaffold standard, a gantry leg or a rack upright cropped
    by the panel edge and painted IN FRONT of everything. */
export const Pole: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  x?: number; braces?: boolean }> =
  ({ side = "l", c = "#5E6253", w: ww = 30, z = 92, x, braces = true }) => (
  <div style={{ position: "absolute", top: -50, bottom: -50, width: ww, zIndex: z,
    ...(x != null ? { left: x } : side === "l" ? { left: 38 } : { right: 38 }),
    background: `linear-gradient(90deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.34)} 100%)`,
    boxShadow: SH_D }}>
    {braces && Array.from({ length: 8 }, (_, i) => (
      <div key={i} style={{ position: "absolute", top: 60 + i * 116, left: -9, width: ww + 18,
        height: 12, background: dkh(c, 0.24) }} />
    ))}
  </div>
);

/** a shopfront stretch for the far side of the road — the street has neighbours */
const Shopfronts: React.FC<{ f: number; p: Place; y: number }> = ({ f, p, y }) => (<>
  {Array.from({ length: 5 }, (_, i) => {
    const x = 44 + i * 196;
    const on = ((Math.sin(f / 31 + i * 1.7) + 1) / 2) > 0.30 ? 1 : 0.42;
    return (
      <div key={"sf" + i} style={{ position: "absolute", left: x, top: y - 132, width: 170,
        height: 132, background: dkh(p.back2, 0.34), zIndex: 13 }}>
        <div style={{ position: "absolute", left: 12, top: 16, right: 12, height: 26,
          background: hexa(p.key, 0.30 * on) }} />
        <div style={{ position: "absolute", left: 12, bottom: 10, right: 12, height: 62,
          background: hexa("#0A0F16", 0.80) }} />
        <div style={{ position: "absolute", left: 22, bottom: 18, width: 46, height: 44,
          background: hexa(p.key, 0.42 * on) }} />
      </div>
    );
  })}
</>);

/* =========================================================================
   THE ELEVEN SETS
   ====================================================================== */

/** the seat plan for the FRONT — where each clad panel lands, in front-local
    coords. Shared so S2's empty slots and S4's arrivals agree exactly. */
export const FRONT_BOX = { x: 214, y: -96, w: 620, h: 760 } as const;
export const SLOTS: Array<[number, number, number, number]> = [
  [54, 150, 512, 122],   /* nav strip   */
  [54, 296, 512, 210],   /* card        */
  [54, 530, 512, 186],   /* pricing     */
];

export const seatsFor = (lands: number[]): Seat[] => [
  { x: 54, y: 150, w: 512, h: 122, kind: "nav",   c: R.libs[0].c, at: lands[2] },
  { x: 54, y: 296, w: 512, h: 210, kind: "card",  c: R.libs[0].c, at: lands[0] },
  { x: 54, y: 530, w: 512, h: 186, kind: "price", c: R.libs[0].c, at: lands[1] },
];

export const SetFor: React.FC<{ k: SetKey; f: number; lit?: number }> = ({ k, f, lit = 1 }) => {
  const p = placeFor(k);
  const t = f;
  switch (k) {
    /* ---- S0 · THE QUOTE, close. The one set built BRIGHT: >=140 luma is a
       FRAME-0 law and this is the frame it applies to. The cream quote board
       carries ~38% of the panel, so the street itself does not have to be
       washed out to clear the bar — `back2` is untouched. */
    case "quote":
      return (<>
        <Street p={p} f={f} t={t} lit={0.52} glowX={176} glowR={182} wires
          band={<Shopfronts f={f} p={p} y={p.horizon} />} />
        {/* ⭐ A PRACTICAL, NOT A BRIGHTER PALETTE. Frame 0 measured 139.7
            against the >=140 bar and the yuv420p encode costs another ~1.5.
            The sanctioned fix is a practical light or a brighter SUBJECT —
            lifting `back2`/`floor2` is the exact move that flattened ten reels
            (§8), so the dark stops are untouched and this lamp does the work. */}
        <div style={{ position: "absolute", left: 862, top: 96, width: 15, height: 300,
          background: "#4A4436", zIndex: 22 }} />
        <div style={{ position: "absolute", left: 792, top: 84, width: 150, height: 26,
          borderRadius: 8, background: "#5E563F", zIndex: 23 }} />
        <div style={{ position: "absolute", left: 812, top: 106, width: 110, height: 18,
          borderRadius: 6, background: hexa("#FFE9BC", 0.95), zIndex: 24 }} />
        <ConeLight x={867} y={122} len={620} spread={520} c="#FFE9BC" o={0.22} z={20} ang={4} />
        <Pole side="l" c="#2A3040" x={-4} z={93} />
        <Pole side="r" c="#242A38" w={22} z={91} />
      </>);

    /* ---- S1 · the pavement, WIDE. Darker than S0 so the three case spills and
       the agency tower are new information rather than a repeat framing. */
    case "street":
      return (<>
        <Street p={p} f={f} t={t} lit={0.34} glowX={140} glowR={140}
          band={<Shopfronts f={f} p={p} y={p.horizon} />} />
        <Pole side="l" c="#2C3028" w={26} x={16} z={93} />
      </>);

    /* ---- S2 · THE BARE SHELL. The reel's value floor: coldest, least
       saturated, one hard work-lamp. It EARNS being the dimmest scene by having
       an event in it (a placeholder block detaches and falls). */
    case "shell":
      return (<>
        <Street p={p} f={f} t={t} lit={0.20} glowX={840} glowR={104} ceiling />
        {/* a hard work-lamp on a stand — one committed direction */}
        <ConeLight x={846} y={92} len={520} spread={430} c="#BFD4E6" o={0.20} z={20} ang={12} />
        <Pole side="l" c="#242C34" w={34} x={-8} z={93} />
      </>);

    /* ---- S3 · crate 1 lid. The BRIGHTEST body set: the crate interior is the
       source and it is blowing its lid. */
    case "crate1":
      return (<>
        <Street p={p} f={f} t={t} lit={0.44} glowX={506} glowR={190} wires={false} />
        <Pole side="r" c="#3A3020" w={30} z={93} />
      </>);

    /* ---- S4 · the fit-out deck, crane overhead. */
    case "deck":
      return (<>
        <Street p={p} f={f} t={t} lit={0.36} glowX={760} glowR={150} />
        {/* the crane gantry that the panels come off — the background process */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 40, height: 30,
          background: "#4E4230", zIndex: 20 }} />
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"tr" + i} style={{ position: "absolute", left: -40 + i * 138, top: 40,
            width: 12, height: 62, background: "#3E3526", zIndex: 19,
            transform: "skewX(18deg)" }} />
        ))}
        {/* the trolley crossing the gantry, continuous */}
        <div style={{ position: "absolute", left: ((f * 5.2) % 1180) - 84, top: 24,
          width: 84, height: 40, background: "#6E5C3A", zIndex: 22 }} />
        <Pole side="l" c="#33352C" w={30} x={2} z={93} />
      </>);

    /* ---- S5 · crate 2 lid. Near-silhouette: one shaft of light, everything
       else dark against it. The biggest VALUE SPREAD in the reel — hierarchy is
       the spread, not the mean, so this is where the darkness earns its keep. */
    case "crate2":
      return (<>
        <Street p={p} f={f} t={t} lit={0.16} glowX={506} glowR={92} wires={false} ceiling />
        <Pole side="l" c="#16262E" w={28} x={-6} z={93} />
      </>);

    /* ---- S6 · the lighting gantry, high above the street. The villain's own
       colour, because this is the beat the VO hands the agency its name. */
    case "gantry":
      return (<>
        <Street p={p} f={f} t={t} lit={0.46} glowX={830} glowR={116} ceiling={false} />
        {/* the gantry deck we are standing on, cropped by the bottom edge */}
        <div style={{ position: "absolute", left: -60, right: -60, top: 690, height: 140,
          background: `linear-gradient(180deg, #3A4260 0%, #191E2E 100%)`, zIndex: 66 }} />
        {Array.from({ length: 14 }, (_, i) => (
          <div key={"gd" + i} style={{ position: "absolute", left: -50 + i * 84, top: 690,
            width: 30, height: 140, background: hexa("#0C0F18", 0.36), zIndex: 67 }} />
        ))}
        <Pole side="l" c="#1E2438" w={36} x={-10} z={93} />
      </>);

    /* ---- S7 · crate 3 lid — a bottomless case with a shaft under it. */
    case "crate3":
      return (<>
        <Street p={p} f={f} t={t} lit={0.30} glowX={506} glowR={126} wires={false} />
        <Pole side="r" c="#162824" w={28} z={93} />
      </>);

    /* ---- S8 · the parts rack hall. */
    case "rack":
      return (<>
        <Street p={p} f={f} t={t} lit={0.26} glowX={150} glowR={132} ceiling />
        <Pole side="l" c="#142422" w={34} x={-10} z={93} />
      </>);

    /* ---- S9 · the payoff, widest. Brightest and most saturated body set, and
       still the biggest spread: a blazing front against a dying tower. */
    case "payoff":
      return (<>
        <Street p={p} f={f} t={t} lit={0.52} glowX={506} glowR={186}
          band={<Shopfronts f={f} p={p} y={p.horizon} />} />
        <Pole side="l" c="#22293E" w={24} x={10} z={93} />
      </>);

    /* ---- S10 · the finished marquee, tight. */
    case "cta":
      return (<>
        <Street p={p} f={f} t={t} lit={0.40} glowX={506} glowR={168} wires={false} />
        <Pole side="r" c="#3A3020" w={26} z={93} />
      </>);
  }
  return null;
};
