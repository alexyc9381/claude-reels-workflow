import React from "react";
import {
  W, H, hexa, dkh, mxh, rnd, PLACES, Rake, Pool, Motes,
  STEEL, CLAY, CREAMB, PAPER, INK, BRASS, GOLD, SLATE, OXIDE, TEAL, VIOLET, EMBER,
  SODIUM, MUTE, RED, PCB, COPPER, mono,
} from "./HwWorld";
import type { Place } from "./HwWorld";

/* ===========================================================================
   REEL 122 · "HARDWARE" — THE SETS.  Board: storyboards/122-hardware.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE, NOT SHAPES ON BLACK. `Room` builds seven
   planes for every location in the house:

     1  the back wall — its own material, a window or an opening, a skirting
     2  ONE haze disc around the practical (a solid disc + a soft ring; matte
        only, never an emissive blur — the palette bans emissive glows outright)
     3  a FAR parallax band, moving slowest
     4  a MID band — the furniture and structure of that room
     5  the NEAR band, the floor, its boards or joints, and its lip
     6  grit, dust or motes drifting — no room in this reel ever flatlines
     7  the travelling rake, the overhead plane, and the OCCLUDER

   ⛔⛔ THE DEPTH CHECK IS BY EYE AND CANNOT BE AUTOMATED: *"is there a mass
   cropped by the panel edge, IN FRONT of the action?"* If not, the camera is
   pointed at a backdrop. `Jamb`, `Stack` and `Rail` are that mass and every
   scene mounts at least one.

   ⛔ BOTTOM-HEAVY IS A COMPOSITION DEFECT (reel 112: six scenes had the cast in
   the lowest third and two thirds of dead wall above). Every set here hangs
   something overhead — a joist run, a ceiling rose, a conduit tray, a gantry,
   a lamp bar — so no scene is dead wall above the characters.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/* ---- a parallax band of room structure ---------------------------------- */
const Band: React.FC<{ c: string; lit: string; y: number; n: number; seed: number; dx: number;
  z: number; on?: number; hMin?: number; hMax?: number;
  kind?: "house" | "shelf" | "plant" | "rack" | "column" }> =
  ({ c, lit, y, n, seed, dx, z, on = 0.28, hMin = 120, hMax = 250, kind = "house" }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const h = hMin + rnd(seed, i) * (hMax - hMin);
    const w = 104 + rnd(seed + 1, i) * 140;
    const x = ((i * (W / n) + dx) % (W + 320)) - 160;
    return (
      <div key={"bd" + seed + i} style={{ position: "absolute", left: x, top: y - h, width: w,
        height: h, zIndex: z, background: c, borderTop: `5px solid ${mxh(c, 0.14)}` }}>
        {kind === "house"
          ? (<>
              {/* a terrace roofline: a pitched cap, two lit windows, a stack */}
              <div style={{ position: "absolute", left: "6%", right: "6%", top: 0, height: "11%",
                background: dkh(c, 0.34) }} />
              <div style={{ position: "absolute", left: "16%", top: "26%", width: "28%",
                height: "26%", background: lit, opacity: on, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: "56%", top: "26%", width: "28%",
                height: "26%", background: lit, opacity: on * 0.5, borderRadius: 2 }} />
              <div style={{ position: "absolute", left: "72%", top: "-14%", width: "13%",
                height: "20%", background: dkh(c, 0.26) }} />
            </>)
          : kind === "shelf"
          ? (<>
              {/* racking: three shelves with boxed stock */}
              {[0, 1, 2].map(j => (
                <div key={"sh" + j} style={{ position: "absolute", left: "8%", right: "8%",
                  top: `${18 + j * 26}%`, height: "6%", background: dkh(c, 0.3) }} />
              ))}
              {[0, 1, 2, 3].map(j => (
                <div key={"bx" + j} style={{ position: "absolute", left: `${12 + j * 20}%`,
                  top: `${24 + (j % 2) * 26}%`, width: "15%", height: "18%",
                  background: mxh(c, 0.16), borderRadius: 2 }} />
              ))}
            </>)
          : kind === "plant"
          ? (<>
              <div style={{ position: "absolute", left: "16%", top: "12%", width: "48%",
                height: "56%", borderRadius: 8, background: dkh(c, 0.18) }} />
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "72%",
                height: 9, background: dkh(c, 0.34) }} />
              {[0, 1, 2].map(j => (
                <div key={"pp" + j} style={{ position: "absolute", left: `${68 + j * 10}%`,
                  top: "10%", width: 7, height: "62%", background: dkh(c, 0.26) }} />
              ))}
            </>)
          : kind === "rack"
          ? (<>
              {/* a far row of cabinets with lamp columns */}
              <div style={{ position: "absolute", inset: "12% 10% 0 10%", borderRadius: 3,
                background: dkh(c, 0.2) }} />
              {Array.from({ length: 7 }, (_, j) => (
                <div key={"lp" + j} style={{ position: "absolute", left: "18%",
                  top: `${18 + j * 10}%`, width: 8, height: 5, borderRadius: 2,
                  background: lit, opacity: on * (j % 3 === 0 ? 1 : 0.34) }} />
              ))}
            </>)
          : (<>{/* column: a pier with a capital and a shadow gap */}
              <div style={{ position: "absolute", left: "28%", top: 0, width: "44%", height: "100%",
                background: dkh(c, 0.14) }} />
              <div style={{ position: "absolute", left: "20%", top: "4%", width: "60%",
                height: "7%", background: dkh(c, 0.34) }} />
            </>)}
      </div>
    );
  })}</>
);

/** ⛔⛔ THE OCCLUDER — the mass cropped by the panel edge, IN FRONT of the
    action. It is the cheapest depth in the repo and the one most often skipped,
    because nothing FAILS without it. */
export const Jamb: React.FC<{ p: Place; side?: "l" | "r"; w?: number; z?: number; o?: number;
  kind?: "door" | "stud" | "post" }> =
  ({ p, side = "l", w: ww = 132, z = 88, o = 1, kind = "door" }) => (
  <div style={{ position: "absolute", top: -20, [side === "l" ? "left" : "right"]: -14,
    width: ww, height: H + 40, zIndex: z, opacity: o,
    background: `linear-gradient(${side === "l" ? 92 : 268}deg, ${dkh(p.grit, 0)} 0%, ${dkh(p.grit, 0.18)} 62%, ${hexa("#000", 0)} 100%)` }}>
    {kind === "door" && (<>
      {/* an architrave and its shadow line — a door frame, not a smear */}
      <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: 16, top: 0,
        width: 16, height: "100%", background: dkh(p.lip, 0.1) } as React.CSSProperties} />
      <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: 0, top: 0,
        width: 14, height: "100%", background: hexa("#000", 0.34) } as React.CSSProperties} />
    </>)}
    {kind === "stud" && (
      <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: 22, top: 0,
        width: 26, height: "100%",
        background: `repeating-linear-gradient(180deg, ${dkh(p.lip, 0.06)} 0 60px, ${dkh(p.lip, 0.24)} 60px 68px)` } as React.CSSProperties} />
    )}
    {kind === "post" && (<>
      <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: 12, top: 0,
        width: 42, height: "100%", background: dkh(p.lip, 0.04) } as React.CSSProperties} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", [side === "l" ? "right" : "left"]: 16,
          top: 40 + i * 88, width: 34, height: 10, background: hexa("#000", 0.4) } as React.CSSProperties} />
      ))}
    </>)}
  </div>
);

/** a foreground pile of boxed stock, cropped by the bottom edge */
export const Stack: React.FC<{ p: Place; x: number; z?: number; n?: number; s?: number }> =
  ({ p, x, z = 86, n = 5, s = 1 }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const w = (140 + rnd(i, 71) * 90) * s, h = (68 + rnd(i, 72) * 40) * s;
    return (
      <div key={"sk" + i} style={{ position: "absolute", left: x + (rnd(i, 73) - 0.5) * 80 * s,
        top: H - h * (i + 1) * 0.82 + 40, width: w, height: h, zIndex: z + i,
        background: `linear-gradient(172deg, ${dkh(p.grit, -0.22)} 0%, ${dkh(p.grit, 0.14)} 100%)`,
        border: `4px solid ${hexa("#000", 0.42)}`, borderRadius: 3,
        transform: `rotate(${(rnd(i, 74) - 0.5) * 5}deg)` }}>
        <div style={{ position: "absolute", left: "12%", top: "34%", width: "40%", height: "9px",
          background: hexa("#FFF", 0.10) }} />
      </div>
    );
  })}</>
);

/** the overhead plane — ⛔ every set hangs one, or the frame is bottom-heavy */
export const Overhead: React.FC<{ p: Place; f: number; z?: number;
  kind?: "joist" | "tray" | "gantry" | "lampbar" | "duct" }> =
  ({ p, f, z = 70, kind = "joist" }) => {
  if (kind === "joist") return (
    <>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 26, zIndex: z,
        background: dkh(p.lip, 0.1) }} />
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"jo" + i} style={{ position: "absolute", left: i * 118 - 20, top: 0, width: 44,
          height: 74 + (i % 3) * 22, zIndex: z, background: dkh(p.lip, 0.02),
          borderRight: `4px solid ${hexa("#000", 0.32)}` }} />
      ))}
    </>
  );
  if (kind === "tray") return (
    <>
      <div style={{ position: "absolute", left: -40, top: 34, width: W + 80, height: 22, zIndex: z,
        background: dkh(SLATE, 0.2) }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={"cb" + i} style={{ position: "absolute", left: -40, top: 40 + i * 4,
          width: W + 80, height: 4, zIndex: z + 1,
          background: [COPPER, dkh(RED, 0.2), dkh(SODIUM, 0.2), dkh(TEAL, 0.3), MUTE][i] }} />
      ))}
      {[180, 620].map((hx, i) => (
        <div key={"hg" + i} style={{ position: "absolute", left: hx, top: 0, width: 12, height: 40,
          zIndex: z, background: dkh(SLATE, 0.36) }} />
      ))}
    </>
  );
  if (kind === "gantry") return (
    <>
      <div style={{ position: "absolute", left: -40, top: 46, width: W + 80, height: 30, zIndex: z,
        background: `linear-gradient(180deg, ${mxh(STEEL, 0.06)} 0%, ${dkh(STEEL, 0.44)} 100%)` }} />
      {Array.from({ length: 11 }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: i * 96 - 30, top: 0, width: 7,
          height: 48, zIndex: z, background: dkh(STEEL, 0.4),
          transform: `skewX(${i % 2 ? 20 : -20}deg)` }} />
      ))}
      {/* a trolley crossing it — a background process, always running */}
      <div style={{ position: "absolute", left: ((f * 2.6) % (W + 200)) - 100, top: 30, width: 74,
        height: 34, zIndex: z + 2, background: dkh(SODIUM, 0.32), borderRadius: 3 }} />
    </>
  );
  if (kind === "lampbar") return (
    <>
      <div style={{ position: "absolute", left: 60, top: 34, width: W - 120, height: 14, zIndex: z,
        background: dkh(SLATE, 0.3) }} />
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"lm" + i} style={{ position: "absolute", left: 120 + i * 226, top: 46, width: 120,
          height: 26, zIndex: z, borderRadius: "0 0 40px 40px",
          background: `linear-gradient(180deg, ${dkh(SLATE, 0.2)} 0%, ${mxh(p.key, 0.2)} 100%)` }} />
      ))}
    </>
  );
  return (
    <>
      <div style={{ position: "absolute", left: -40, top: 18, width: W + 80, height: 60, zIndex: z,
        borderRadius: 30, background: `linear-gradient(180deg, ${mxh(SLATE, 0.12)} 0%, ${dkh(SLATE, 0.42)} 100%)` }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"dr" + i} style={{ position: "absolute", left: i * 152 - 20, top: 18, width: 10,
          height: 60, zIndex: z + 1, background: hexa("#000", 0.28) }} />
      ))}
    </>
  );
};

/* =========================================================================
   THE ROOM — the seven-plane set builder every scene mounts.
   ====================================================================== */
export const Room: React.FC<{
  p: Place; f: number; dx?: number; bands?: number; kind?: "house" | "shelf" | "plant" | "rack" | "column";
  overhead?: "joist" | "tray" | "gantry" | "lampbar" | "duct" | "none";
  rake?: number; rakeX?: number; rakeRate?: number; rakeN?: number;
  lamp?: { x: number; y: number; r: number } | null;
  grit?: number; floorKind?: "boards" | "slab" | "tile" | "tarmac";
  window?: { x: number; y: number; w: number; h: number } | null;
}> = ({ p, f, dx = 0, bands = 3, kind = "house", overhead = "joist", rake = 0.14,
        rakeX = 0, rakeRate = 4.4, rakeN = 7, lamp = null, grit = 0.7,
        floorKind = "boards", window: win = null }) => {
  const hz = p.horizon;
  return (
    <>
      {/* 1 · the back wall */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} 100%)` }} />

      {/* the window, when the room has one — a real opening, with a frame,
          a sill and light spilling onto the floor */}
      {win && (<>
        <div style={{ position: "absolute", left: win.x - 12, top: win.y - 12, width: win.w + 24,
          height: win.h + 24, zIndex: 5, background: dkh(p.lip, 0.05), borderRadius: 4 }} />
        <div style={{ position: "absolute", left: win.x, top: win.y, width: win.w, height: win.h,
          zIndex: 6, overflow: "hidden",
          background: `linear-gradient(178deg, ${mxh(p.key, 0.34)} 0%, ${mxh(p.key, 0.06)} 100%)` }}>
          <div style={{ position: "absolute", left: win.w / 2 - 5, top: 0, width: 10, height: "100%",
            background: dkh(p.lip, 0.02) }} />
          <div style={{ position: "absolute", left: 0, top: win.h * 0.46, width: "100%", height: 10,
            background: dkh(p.lip, 0.02) }} />
        </div>
        <div style={{ position: "absolute", left: win.x - 22, top: win.y + win.h + 10, width: win.w + 44,
          height: 16, zIndex: 7, background: mxh(p.lip, 0.32), borderRadius: 2 }} />
        {/* the spill on the floor — a shaped pool, never a full-frame fill */}
        <div style={{ position: "absolute", left: win.x - 60, top: hz + 40, width: win.w + 200,
          height: 210, zIndex: 12, opacity: 0.34, transform: "skewX(-22deg)",
          background: `linear-gradient(180deg, ${hexa(p.key, 0.62)} 0%, ${hexa(p.key, 0)} 100%)` }} />
      </>)}

      {/* 2 · ONE haze disc around the practical — matte, solid + a soft ring */}
      {lamp && (<>
        <div style={{ position: "absolute", left: lamp.x - lamp.r, top: lamp.y - lamp.r,
          width: lamp.r * 2, height: lamp.r * 2, borderRadius: "50%", zIndex: 4,
          background: `radial-gradient(50% 50% at 50% 50%, ${hexa(p.key, 0.26)} 0%, ${hexa(p.key, 0)} 72%)` }} />
        <div style={{ position: "absolute", left: lamp.x - 26, top: lamp.y - 26, width: 52,
          height: 52, borderRadius: "50%", zIndex: 5, background: mxh(p.key, 0.34) }} />
      </>)}

      {/* 3,4,5 · the parallax bands, far to near */}
      {bands >= 3 && <Band c={dkh(p.back2, 0.34)} lit={p.key} y={hz - 24} n={6} seed={11}
        dx={dx * 0.30} z={7} on={0.20} hMin={150} hMax={250} kind={kind} />}
      {bands >= 2 && <Band c={dkh(p.back2, 0.18)} lit={p.key} y={hz + 6} n={5} seed={23}
        dx={dx * 0.58} z={8} on={0.30} hMin={110} hMax={200} kind={kind} />}
      {bands >= 1 && <Band c={dkh(p.back2, 0.04)} lit={p.key} y={hz + 30} n={4} seed={37}
        dx={dx * 0.92} z={9} on={0.40} hMin={80} hMax={150} kind={kind} />}

      {/* the floor */}
      <div style={{ position: "absolute", left: 0, top: hz, width: W, height: H - hz, zIndex: 10,
        background: `linear-gradient(180deg, ${p.floor2} 0%, ${p.floor} 100%)` }} />
      {/* the skirting / lip where wall meets floor */}
      <div style={{ position: "absolute", left: 0, top: hz - 12, width: W, height: 18, zIndex: 11,
        background: p.lip }} />
      {/* the floor's own material */}
      {floorKind === "boards" && Array.from({ length: 8 }, (_, i) => (
        <div key={"bo" + i} style={{ position: "absolute", left: 0, top: hz + 26 + i * 38,
          width: W, height: 4, zIndex: 12, background: hexa("#000", 0.16 + i * 0.012) }} />
      ))}
      {floorKind === "tile" && Array.from({ length: 7 }, (_, i) => (
        <div key={"ti" + i} style={{ position: "absolute", left: 0, top: hz + 30 + i * 42,
          width: W, height: 3, zIndex: 12, background: hexa("#FFF", 0.10) }} />
      ))}
      {floorKind === "slab" && Array.from({ length: 5 }, (_, i) => (
        <div key={"sb" + i} style={{ position: "absolute", left: -60 + i * 236, top: hz,
          width: 8, height: H - hz, zIndex: 12, background: hexa("#000", 0.20),
          transform: `skewX(${(i - 2) * 11}deg)` }} />
      ))}
      {floorKind === "tarmac" && (
        <div style={{ position: "absolute", left: 0, top: hz + 96, width: W, height: 10, zIndex: 12,
          background: `repeating-linear-gradient(90deg, ${hexa("#F0E4C4", 0.5)} 0 60px, transparent 60px 130px)` }} />
      )}

      {/* 6 · grit — no room in this reel flatlines */}
      <Motes x={0} y={hz - 190} w={W} h={330} n={Math.round(16 * grit)} f={f} z={14}
        c={hexa(p.grit, 0.5)} />

      {/* 7 · the travelling rake */}
      {rake > 0 && <Rake f={f} y={-40} h={H + 80} x0={rakeX} c={mxh(p.key, 0.10)} o={rake}
        rate={rakeRate} n={rakeN} z={15} />}

      {/* the overhead plane */}
      {overhead !== "none" && <Overhead p={p} f={f} kind={overhead} z={17} />}

      {/* the vignette's partner: a floor contact shadow under the whole set */}
      <div style={{ position: "absolute", left: 0, top: hz - 30, width: W, height: 90, zIndex: 13,
        background: `linear-gradient(180deg, ${hexa("#000", 0.30)} 0%, ${hexa("#000", 0)} 100%)` }} />
    </>
  );
};

/* =========================================================================
   SET DRESSING specific to one or two rooms.
   ====================================================================== */

/** S0 — the bedroom's own furniture, and the HOLE the rack came through */
export const CeilingHole: React.FC<{ x: number; y: number; w: number; f: number; z?: number;
  p: Place }> = ({ x, y, w: ww, f, z = 18, p }) => (
  <>
    {/* the ragged plaster edge */}
    <div style={{ position: "absolute", left: x - ww / 2, top: y - 40, width: ww, height: 96,
      zIndex: z, background: dkh("#0A0A0C", 0),
      clipPath: "polygon(4% 100%, 0% 22%, 13% 46%, 22% 8%, 34% 40%, 46% 4%, 58% 38%, 69% 10%, 80% 44%, 90% 16%, 100% 40%, 100% 100%)" }} />
    {/* snapped joists across the opening */}
    {[-0.22, 0.1, 0.36].map((k, i) => (
      <div key={"js" + i} style={{ position: "absolute", left: x + k * ww, top: y - 22,
        width: 30, height: 74, zIndex: z + 1, background: mxh("#6E5A3E", 0.06),
        transform: `rotate(${(i - 1) * 13}deg)`, borderRadius: 2 }} />
    ))}
    {/* the shaft of daylight coming DOWN through it — the frame-0 luma carrier */}
    <div style={{ position: "absolute", left: x - ww * 0.62, top: y + 30, width: ww * 1.24,
      height: 470, zIndex: z + 2, opacity: 0.30, transform: "perspective(600px) rotateX(2deg)",
      background: `linear-gradient(180deg, ${hexa(p.key, 0.72)} 0%, ${hexa(p.key, 0)} 100%)`,
      clipPath: "polygon(24% 0%, 76% 0%, 100% 100%, 0% 100%)" }} />
  </>
);

export const DeskSet: React.FC<{ x: number; y: number; f: number; z?: number; lampOn: number;
  p: Place }> = ({ x, y, f, z = 30, lampOn, p }) => (
  <>
    {/* the desk top and its two legs */}
    <div style={{ position: "absolute", left: x - 170, top: y - 118, width: 340, height: 20,
      zIndex: z + 2, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh("#8A6A42", 0.26)} 0%, ${dkh("#8A6A42", 0.2)} 100%)` }} />
    {[x - 158, x + 138].map((lx, i) => (
      <div key={"dl" + i} style={{ position: "absolute", left: lx, top: y - 100, width: 18,
        height: 100, zIndex: z + 1, background: dkh("#8A6A42", 0.4) }} />
    ))}
    {/* a monitor — off, because the power is about to go into the rack */}
    <div style={{ position: "absolute", left: x - 96, top: y - 250, width: 192, height: 122,
      zIndex: z + 3, borderRadius: 5, background: dkh("#22262C", 0),
      border: `5px solid ${dkh("#14171B", 0)}` }}>
      <div style={{ position: "absolute", inset: 6, borderRadius: 2, background: "#0B0F16" }} />
    </div>
    <div style={{ position: "absolute", left: x - 24, top: y - 132, width: 48, height: 20,
      zIndex: z + 2, background: dkh("#22262C", 0.2) }} />
    {/* the desk lamp — the practical that BROWNS OUT */}
    <div style={{ position: "absolute", left: x + 110, top: y - 210, width: 10, height: 96,
      zIndex: z + 3, background: dkh(SLATE, 0.2) }} />
    <div style={{ position: "absolute", left: x + 84, top: y - 232, width: 64, height: 30,
      zIndex: z + 4, borderRadius: "40% 40% 8px 8px",
      background: `linear-gradient(180deg, ${dkh(SLATE, 0.1)} 0%, ${mxh(GOLD, 0.1 + lampOn * 0.4)} 100%)` }} />
    <Pool x={x + 116} y={y - 128} w={230 * (0.5 + lampOn * 0.6)} c={GOLD} o={0.10 + lampOn * 0.24} z={z + 1} />
    {/* a chair, cropped — furniture, and a second mass on the floor */}
    <div style={{ position: "absolute", left: x - 320, top: y - 156, width: 104, height: 26,
      zIndex: z + 2, borderRadius: 4, background: dkh("#4A4038", 0.06) }} />
    <div style={{ position: "absolute", left: x - 312, top: y - 250, width: 22, height: 100,
      zIndex: z + 1, background: dkh("#4A4038", 0.2) }} />
  </>
);

/** S8 — the house seen from the street, one window lit */
export const HouseFront: React.FC<{ x: number; y: number; f: number; z?: number; lit: number;
  p: Place }> = ({ x, y, f, z = 26, lit, p }) => (
  <>
    <div style={{ position: "absolute", left: x - 250, top: y - 420, width: 500, height: 420,
      zIndex: z, background: `linear-gradient(178deg, ${dkh(p.back2, 0.24)} 0%, ${dkh(p.back2, 0.5)} 100%)`,
      borderRadius: 3 }} />
    {/* pitched roof */}
    <div style={{ position: "absolute", left: x - 274, top: y - 500, width: 548, height: 84,
      zIndex: z + 1, background: dkh(p.back2, 0.56),
      clipPath: "polygon(6% 100%, 26% 0%, 74% 0%, 94% 100%)" }} />
    {/* four windows, ONE lit — the hero is in it */}
    {[[-140, -330], [70, -330], [-140, -180], [70, -180]].map(([wx, wy], i) => (
      <div key={"wn" + i} style={{ position: "absolute", left: x + wx, top: y + wy, width: 110,
        height: 96, zIndex: z + 2, borderRadius: 2,
        background: i === 1 ? mxh(p.key, 0.1) : dkh(p.back2, 0.68),
        opacity: i === 1 ? 0.4 + lit * 0.6 : 1,
        border: `5px solid ${dkh(p.lip, 0)}` }}>
        <div style={{ position: "absolute", left: 50, top: 0, width: 7, height: "100%",
          background: dkh(p.lip, 0) }} />
      </div>
    ))}
    {/* the door and its step */}
    <div style={{ position: "absolute", left: x - 46, top: y - 132, width: 92, height: 132,
      zIndex: z + 2, background: dkh(EMBER, 0.5), borderRadius: "4px 4px 0 0",
      border: `4px solid ${dkh(p.lip, 0)}` }} />
    {/* ⭐ the meter box on the OUTSIDE wall — the scene's hero sits on it */}
    <div style={{ position: "absolute", left: x + 178, top: y - 200, width: 54, height: 76,
      zIndex: z + 3, borderRadius: 3, background: dkh("#5A5245", 0.1),
      border: `3px solid ${dkh(p.lip, 0)}` }} />
  </>
);

/** a lit strip fixture — the practical that makes a dark room rank */
export const Strip2: React.FC<{ x: number; y: number; w: number; c: string; z?: number;
  o?: number }> = ({ x, y, w: ww, c, z = 22, o = 1 }) => (
  <>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: 13, zIndex: z,
      background: mxh(c, 0.3), opacity: o, borderRadius: 2 }} />
    <div style={{ position: "absolute", left: x - 20, top: y - 8, width: ww + 40, height: 8,
      zIndex: z - 1, background: dkh(SLATE, 0.3) }} />
    <div style={{ position: "absolute", left: x - 30, top: y + 12, width: ww + 60, height: 140,
      zIndex: z - 2, opacity: 0.20 * o,
      background: `linear-gradient(180deg, ${hexa(c, 0.8)} 0%, ${hexa(c, 0)} 100%)`,
      clipPath: "polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)" }} />
  </>
);
