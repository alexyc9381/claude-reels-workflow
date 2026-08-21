import React from "react";
import {
  W, H, E, OUT, IO, LIN, hexa, dkh, mxh, rnd, SH, SH_D,
  PLACES, asPlace, vivid, Rake, Pool, Motes,
  STEEL, CLAY, CREAMB, INK, BRASS, GOLD, SLATE, OXIDE, TEAL, VIOLET, EMBER, SODIUM,
} from "./LoopWorld";
import type { Place } from "./LoopWorld";

/* ===========================================================================
   REEL 118 · "LOOP" — THE SETS.  Board: storyboards/118-loop.md.

   ⛔⛔ EVERY SCENE IS A REAL PLACE, NOT SHAPES ON BLACK. `Hall` builds seven
   planes for every stretch of the gauntlet:

     1  the back wall — coursed block, a high clerestory, and the far bay mouth
     2  ONE haze disc around the practical (a solid disc + a soft ring; matte
        only, never an emissive blur)
     3  a far parallax band of bays and shutters, moving slowest
     4  a mid band of trusses, ducting and pulpit columns
     5  the near band + the floor, its expansion joints and its lip
     6  grit and sparks drifting on the ground — the hall never flatlines
     7  the travelling rake, the overhead plane, and the OCCLUDER

   ⛔⛔ THE DEPTH CHECK IS BY EYE AND CANNOT BE AUTOMATED: *"is there a mass
   cropped by the panel edge, IN FRONT of the action?"* If not, the camera is
   pointed at a backdrop. `Stanchion` and `SparePile` are that mass, and every
   scene mounts at least one.

   ⛔ BOTTOM-HEAVY IS A COMPOSITION DEFECT (reel 112). Every set here hangs
   something overhead — a truss, a duct run, a hoist beam, the return rail —
   so no scene is two thirds dead wall above the characters.
   ========================================================================= */

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/** a parallax band of hall structure — bay mouths, shutters or plant */
const Band: React.FC<{ c: string; lit: string; y: number; n: number; seed: number; dx: number;
  z: number; on?: number; hMin?: number; hMax?: number; kind?: "bay" | "shutter" | "plant" }> =
  ({ c, lit, y, n, seed, dx, z, on = 0.28, hMin = 120, hMax = 250, kind = "bay" }) => (
  <>{Array.from({ length: n }, (_, i) => {
    const h = hMin + rnd(seed, i) * (hMax - hMin);
    const w = 104 + rnd(seed + 1, i) * 140;
    const x = ((i * (W / n) + dx) % (W + 320)) - 160;
    return (
      <div key={"bd" + seed + i} style={{ position: "absolute", left: x, top: y - h, width: w,
        height: h, zIndex: z, background: c, borderTop: `5px solid ${mxh(c, 0.14)}` }}>
        {kind === "bay"
          ? (<>
              {/* a lit bay mouth with a lintel and a roller housing */}
              <div style={{ position: "absolute", left: "13%", top: "30%", width: "74%",
                height: "58%", background: lit, opacity: on, borderRadius: 3 }} />
              <div style={{ position: "absolute", left: "8%", right: "8%", top: "20%", height: "9%",
                background: dkh(c, 0.30) }} />
              <div style={{ position: "absolute", left: "30%", top: "48%", width: "40%",
                height: "8%", background: dkh(c, 0.22) }} />
            </>)
          : kind === "shutter"
          ? (<>
              <div style={{ position: "absolute", inset: "18% 8% 6% 8%", borderRadius: 2,
                background: `repeating-linear-gradient(180deg, ${dkh(c, 0.14)} 0px, ${dkh(c, 0.14)} 9px, ${dkh(c, 0.36)} 9px, ${dkh(c, 0.36)} 18px)` }} />
              <div style={{ position: "absolute", left: "38%", bottom: "8%", width: "24%",
                height: "9%", background: mxh(c, 0.22), borderRadius: 2 }} />
            </>)
          : (<>{/* plant: a tank, a pipe run and a walkway rail */}
              <div style={{ position: "absolute", left: "16%", top: "12%", width: "48%",
                height: "56%", borderRadius: 8, background: dkh(c, 0.18) }} />
              <div style={{ position: "absolute", left: "10%", right: "10%", top: "72%",
                height: 9, background: dkh(c, 0.34) }} />
              {[0, 1, 2].map(j => (
                <div key={"pp" + j} style={{ position: "absolute", left: `${68 + j * 10}%`,
                  top: "10%", width: 7, height: "62%", background: dkh(c, 0.26) }} />
              ))}
            </>)}
      </div>
    );
  })}</>
);

/** THE OCCLUDER - AND THE ROUND IT COST. A contact sheet of all fifteen scenes
    showed the SAME defect in every one of them: a black diagonal stick floating
    in the corner with nothing attached to it. The column WAS there - 68px wide,
    painted dkh(c,0.64) against an already dark panel edge - but it had no value
    separation from the wall behind it, so the only part a viewer could see was
    the brace, and a brace on its own is not a depth cue, it is a scratch on the
    picture.

    THE FIX IS VALUE, NOT GEOMETRY. The column is now 118px wide and its lit
    face is mxh(c, 0.30) - BRIGHTER than the wall behind it - so it reads as a
    MASS in front of the action, which is the whole job of an occluder. The
    brace is shorter, thicker, and starts ON the lit face where the eye can see
    it attach. (reel 110: every object must differ from its background in BOTH
    hue and value - an occluder is no exception.) */
export const Stanchion: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  lean?: number; braceY?: number; braceW?: number }> =
  ({ side = "l", c = "#2E2A26", w = 118, z = 88, lean = 0, braceY = 452, braceW = 132 }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -34, top: -70,
    width: w, height: H + 150, zIndex: z, transform: `rotate(${lean}deg)`,
    transformOrigin: side === "l" ? "0% 30%" : "100% 30%",
    background: side === "l"
      ? `linear-gradient(90deg, ${dkh(c, 0.52)} 0%, ${mxh(c, 0.30)} 58%, ${dkh(c, 0.30)} 100%)`
      : `linear-gradient(270deg, ${dkh(c, 0.52)} 0%, ${mxh(c, 0.30)} 58%, ${dkh(c, 0.30)} 100%)` }}>
    {/* the flange plates and bolt rows every steel column has */}
    {[0.12, 0.40, 0.70].map((k, i) => (
      <div key={"fp" + i} style={{ position: "absolute", left: -9, right: -9, top: `${k * 100}%`,
        height: 26, background: dkh(c, 0.34), borderTop: `4px solid ${mxh(c, 0.44)}` }}>
        {[0.18, 0.5, 0.82].map((b, j) => (
          <div key={"bo" + j} style={{ position: "absolute", left: `${b * 100}%`, top: 8,
            width: 9, height: 9, borderRadius: 9, background: dkh(c, 0.62) }} />
        ))}
      </div>
    ))}
    {/* the knee brace - thick, short, and starting ON the lit face so the eye
        can see what it is bolted to */}
    <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: w - 26, top: braceY,
      width: braceW, height: 30, transform: `rotate(${side === "l" ? 30 : -30}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.44)} 100%)`,
      transformOrigin: side === "l" ? "0% 50%" : "100% 50%" }} />
    {/* a conduit run clamped to the column */}
    <div style={{ position: "absolute", [side === "l" ? "right" : "left"]: 12, top: 0,
      width: 17, height: "100%", background: dkh(c, 0.26) }} />
  </div>
);

/** the second occluder: a pile of spare stock cropped by the bottom edge, so
    the camera is standing ON the floor rather than looking at a wall. */
export const SparePile: React.FC<{ side?: "l" | "r"; c?: string; h?: number; z?: number;
  n?: number }> = ({ side = "r", c = "#3E3227", h = 210, z = 84, n = 4 }) => (
  <div style={{ position: "absolute", [side === "l" ? "left" : "right"]: -40, bottom: -50,
    width: 268, height: h, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"sp" + i} style={{ position: "absolute", left: 10 + (i % 2) * 20,
        bottom: i * (h / n) * 0.88, width: 238 - i * 18, height: h / n * 0.92,
        borderRadius: 4, transform: `rotate(${(i % 2 ? 1 : -1) * 1.3}deg)`,
        background: `linear-gradient(96deg, ${mxh(c, 0.12)} 0%, ${c} 44%, ${dkh(c, 0.44)} 100%)`,
        border: `4px solid ${dkh(c, 0.58)}` }}>
        {[0.18, 0.82].map((k, j) => (
          <div key={"st" + j} style={{ position: "absolute", left: `${k * 100}%`, top: "10%",
            width: 13, height: "80%", background: dkh(c, 0.28) }} />
        ))}
        <div style={{ position: "absolute", left: "28%", top: "36%", width: "44%", height: "22%",
          borderRadius: 2, background: dkh(c, 0.36) }} />
      </div>
    ))}
  </div>
);

/** the overhead plane: a roof truss with its purlins and a hoist beam */
export const Truss: React.FC<{ y?: number; c?: string; z?: number; f: number; drift?: number }> =
  ({ y = -8, c = "#2A3138", z = 24, f, drift: dr = 0 }) => (
  <div style={{ position: "absolute", left: -40, top: y, width: W + 80, height: 118, zIndex: z,
    transform: `translateX(${Math.sin(f / 90) * dr}px)` }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 15,
      background: dkh(c, 0.24) }} />
    <div style={{ position: "absolute", left: 0, top: 92, width: "100%", height: 13,
      background: dkh(c, 0.40) }} />
    {/* the web — a real warren truss, alternating diagonals */}
    {Array.from({ length: 16 }, (_, i) => (
      <div key={"tw" + i} style={{ position: "absolute", left: i * 70, top: 12, width: 10,
        height: 92, background: dkh(c, 0.32), transformOrigin: "50% 0%",
        transform: `rotate(${i % 2 ? 30 : -30}deg)` }} />
    ))}
    {/* the purlins running across */}
    {[0.3, 0.62].map((k, i) => (
      <div key={"pu" + i} style={{ position: "absolute", left: 0, top: 15 + k * 78, width: "100%",
        height: 7, background: dkh(c, 0.50) }} />
    ))}
  </div>
);

/** a hanging duct run — the other overhead shape, for rooms without a truss */
export const DuctRun: React.FC<{ y?: number; c?: string; z?: number; f: number }> =
  ({ y = 24, c = "#3A4048", z = 25, f }) => (
  <div style={{ position: "absolute", left: -30, top: y, width: W + 60, height: 74, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 14, width: "100%", height: 46, borderRadius: 8,
      background: `linear-gradient(180deg, ${mxh(c, 0.22)} 0%, ${c} 40%, ${dkh(c, 0.44)} 100%)` }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"df" + i} style={{ position: "absolute", left: 40 + i * 128, top: 8, width: 14,
        height: 58, borderRadius: 3, background: dkh(c, 0.34) }} />
    ))}
    {[0.18, 0.5, 0.82].map((k, i) => (
      <div key={"dh" + i} style={{ position: "absolute", left: `${k * 100}%`, top: -30, width: 9,
        height: 44, background: dkh(c, 0.50) }} />
    ))}
  </div>
);

/* =========================================================================
   THE HALL — the seven-plane set builder every scene mounts
   ====================================================================== */
export const Hall: React.FC<{ p: Place; f: number; dx?: number;
  /** the practical's screen position, for the haze disc and the floor pool.
      ⛔ NOT called `key` — that is React's reserved prop and TypeScript widens
      it to `Key`, so the object form never typechecks. */
  lamp?: { x: number; y: number; r?: number };
  overhead?: "truss" | "duct" | "none"; rake?: number; rakeX?: number; rakeRate?: number;
  bands?: number; kind?: "bay" | "shutter" | "plant"; grit?: number; z?: number }> =
  ({ p, f, dx = 0, lamp: kx, overhead = "truss", rake = 0.28, rakeX = 0, rakeRate = 2.1,
     bands = 3, kind = "bay", grit = 1, z = 0 }) => (
  <>
    {/* 1 · the back wall — coursed block with a clerestory band */}
    <div style={{ position: "absolute", inset: 0, zIndex: z + 1,
      background: `linear-gradient(180deg, ${p.back} 0%, ${p.back2} ${p.horizon / H * 100}%, ${p.back2} 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: p.horizon, zIndex: z + 2,
      opacity: 0.30,
      background: `repeating-linear-gradient(180deg, transparent 0px, transparent 36px, ${hexa("#000000", 0.28)} 36px, ${hexa("#000000", 0.28)} 39px), repeating-linear-gradient(90deg, transparent 0px, transparent 78px, ${hexa("#000000", 0.22)} 78px, ${hexa("#000000", 0.22)} 81px)` }} />
    {/* the clerestory: high windows that give the wall a top */}
    <div style={{ position: "absolute", left: 0, top: 44, width: W, height: 62, zIndex: z + 3,
      display: "flex", gap: 26, paddingLeft: 30 }}>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"cl" + i} style={{ flex: 1, borderRadius: 4, background: hexa(p.key, 0.13),
          border: `3px solid ${hexa("#000000", 0.26)}` }} />
      ))}
    </div>

    {/* 2 · ONE haze disc around the practical — matte, a disc plus a soft ring */}
    {kx && (<>
      <div style={{ position: "absolute", left: kx.x - (kx.r ?? 190), top: kx.y - (kx.r ?? 190),
        width: (kx.r ?? 190) * 2, height: (kx.r ?? 190) * 2, borderRadius: "50%", zIndex: z + 4,
        background: `radial-gradient(50% 50% at 50% 50%, ${hexa(p.key, 0.20)} 0%, ${hexa(p.key, 0.07)} 52%, ${hexa(p.key, 0)} 100%)` }} />
    </>)}

    {/* 3 · the far band, slowest */}
    <Band c={dkh(p.back2, 0.52)} lit={p.key} y={p.horizon + 8} n={bands + 3} seed={11}
      dx={dx * 0.24} z={z + 6} on={0.22} hMin={130} hMax={230} kind={kind} />
    {/* 4 · the mid band */}
    <Band c={dkh(p.back2, 0.32)} lit={p.key} y={p.horizon + 42} n={bands + 1} seed={23}
      dx={dx * 0.52} z={z + 8} on={0.30} hMin={160} hMax={280} kind={kind} />

    {/* 5 · the floor, its lip and its expansion joints */}
    <div style={{ position: "absolute", left: 0, top: p.horizon + 54, width: W,
      height: H - p.horizon - 54, zIndex: z + 12,
      background: `linear-gradient(180deg, ${p.floor2} 0%, ${p.floor} 62%, ${dkh(p.floor, 0.26)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, top: p.horizon + 48, width: W, height: 10,
      zIndex: z + 13, background: p.lip }} />
    {Array.from({ length: 6 }, (_, i) => (
      <div key={"ej" + i} style={{ position: "absolute", left: 0, width: W, zIndex: z + 14,
        top: p.horizon + 82 + i * 44 + i * i * 4, height: 3,
        background: hexa("#000000", 0.20 + i * 0.03) }} />
    ))}

    {/* 6 · grit drifting on the ground — the hall never flatlines */}
    {grit > 0 && Array.from({ length: Math.round(16 * grit) }, (_, i) => (
      <div key={"gr" + i} style={{ position: "absolute", zIndex: z + 16,
        left: ((rnd(i, 31) * W + f * (0.5 + rnd(i, 32) * 1.5)) % (W + 40)) - 20,
        top: p.horizon + 80 + rnd(i, 33) * (H - p.horizon - 100),
        width: 4 + rnd(i, 34) * 5, height: 3 + rnd(i, 35) * 3, borderRadius: 3,
        background: p.grit, opacity: 0.42 }} />
    ))}

    {/* 7 · the overhead plane and the travelling rake */}
    {overhead === "truss" ? <Truss f={f} z={z + 18} c={dkh(p.back2, 0.58)} drift={9} />
      : overhead === "duct" ? <DuctRun f={f} z={z + 18} c={dkh(p.back2, 0.48)} /> : null}
    {rake > 0 && <Rake f={f} y={0} h={H} c={p.key} o={rake} x0={rakeX} rate={rakeRate} z={z + 21} n={7} />}
  </>
);

/** the floor pool a practical casts, mounted separately so a scene can put it
    UNDER its own props rather than under the whole set */
export const KeyPool: React.FC<{ p: Place; x: number; y: number; w?: number; o?: number;
  z?: number }> = ({ p, x, y, w = 520, o = 0.24, z = 17 }) => (
  <Pool x={x} y={y} w={w} c={p.key} o={o} z={z} />
);
