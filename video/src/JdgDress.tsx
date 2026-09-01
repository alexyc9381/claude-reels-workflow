import React from "react";
import {
  W, H, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd, SH, SH_D, dkh, mxh, lerpHex,
  Pool, Contact, mono, CLAY, GREEN, RED, BRS, BRSD, BRSL, OAK, OAKD, OAKL,
  BLOCKS, settle,
} from "./JdgWorld";
import { Unit } from "./JdgProps";

/* ===========================================================================
   REEL 132 · "JUDGE" — THE DRESSING KIT.

   ⛔⛔⛔ WHY THIS FILE EXISTS. Alex, on the body scenes: *"each of these scenes
   needs to be significantly better, all of these animations are horrible, needs
   to be redone to be way more detailed, significantly more interesting."* He is
   right, and at full size the reason is not the animation at all — it is that
   **I built props and never built rooms.** Every one of the eighteen scenes was
   the same bare wainscot, four windows and an empty floor, with two or three
   objects standing on nothing in front of it.

   ⭐ THE MEASURED HIERARCHY PUTS THIS FIRST, ABOVE EVERY EFFECT:
     *"a dense, correct SET (a wall of ~70 real objects instead of an empty room)
      7.68 -> 9.65"* — and, in the same table, *"the set is worth more than the
      effects. Three rounds of hand-added scan bars, trolleys, travel bands and
      mid-scene events stalled at 7.68. Rebuilding the SET as a dense, on-topic
      place cleared the bar in one pass. BUILD THE RIGHT ROOM BEFORE YOU ADD
      MOTION TO THE WRONG ONE."*

   So every element here is a REAL thing in a works where Claude's output is
   built, stored and judged: racking full of finished units, pegboards of tools,
   overhead conduit, a crane gantry, parts bins, benches, pendant lamps, bay
   signage, ducting and stacked crates. Four to eight per scene, varied, so no
   two rooms read the same.

   ⛔ EVERY PIECE IS DRAWN FROM ITS OWN STRUCTURE, not from a rectangle with a
   gradient: a rack has uprights, beams, braces, feet and a load; a pegboard has
   a perforation grid, hooks and shadows; a gantry has a rail, a trolley, a hoist
   block and a hook. [[feedback_recognition_beats_craft_on_a_hook_object]] —
   a viewer names a thing from its structure.
   ⛔ AND IT ALL SITS BEHIND THE ACTION: nothing here is above z=40, so the set is
   dense without ever competing with the subject
   ([[feedback_a_dense_room_is_not_a_system]] — the count of things mistakable
   for the hero stays at one).
   ========================================================================= */

const STEEL = "#7E8C95", STEELD = "#3A454C", STEELL = "#B4C0C7";

/** ⭐⭐⭐ THE RACK WALL — floor-to-ceiling pallet racking loaded with finished
    units. This is the "wall of ~70 real objects" the motion table is talking
    about, and it is on-subject: it is everything Claude has already shipped. */
export const RackWall: React.FC<{ x: number; y: number; f: number; w?: number;
  h?: number; z?: number; bays?: number; levels?: number; dim?: number }> =
  ({ x, y, f, w: ww = 1120, h: hh = 470, z = 12, bays = 4, levels = 3, dim = 0.34 }) => {
  const bw = ww / bays, lh = hh / levels;
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, filter: `saturate(${1 - dim * 0.4}) brightness(${1 - dim * 0.16})` }}>
      {/* the uprights, with their brace lattice — what makes it racking */}
      {Array.from({ length: bays + 1 }, (_, i) => (
        <React.Fragment key={"up" + i}>
          <div style={{ position: "absolute", left: i * bw - 9, top: 0, width: 18, height: hh,
            background: `linear-gradient(96deg, ${D(STEELL)} 0%, ${D(STEEL)} 50%, ${D(STEELD)} 100%)` }} />
          {Array.from({ length: 6 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: i * bw - 5, top: j * (hh / 6) + 6,
              width: 10, height: hh / 6 - 12, transformOrigin: "50% 50%",
              transform: `skewY(${j % 2 ? 22 : -22}deg)`, background: hexa(D(STEELD), 0.8) }} />
          ))}
        </React.Fragment>
      ))}
      {/* the beams, and the load on each */}
      {Array.from({ length: levels }, (_, L) => (
        <React.Fragment key={"lv" + L}>
          <div style={{ position: "absolute", left: -6, right: -6, top: L * lh + lh - 16,
            height: 16, background: `linear-gradient(180deg, ${D(BRSL)} 0%, ${D(BRSD)} 100%)` }} />
          {Array.from({ length: bays }, (_, b) =>
            Array.from({ length: 2 }, (_, s) => {
              const idx = L * 7 + b * 2 + s;
              const uw = bw * 0.44;
              return (
                <div key={`u${L}-${b}-${s}`} style={{ position: "absolute",
                  left: b * bw + 12 + s * (bw * 0.48), top: L * lh + lh - 16 - uw * 0.30,
                  opacity: 0.94 }}>
                  <Unit kind={idx} x={uw / 2} y={uw * 0.30} w={uw} z={1} lamp={1} f={f + idx * 9} />
                </div>
              );
            })
          )}
        </React.Fragment>
      ))}
      {/* the feet */}
      {Array.from({ length: bays + 1 }, (_, i) => (
        <div key={"ft" + i} style={{ position: "absolute", left: i * bw - 20, top: hh - 10,
          width: 40, height: 12, background: D(STEELD) }} />
      ))}
    </div>
  );
};

/** ⭐ A PEGBOARD OF TOOLS — a real perforation grid, hooks, and a silhouette per
    tool, so the wall reads as a workplace rather than as texture. */
export const ToolBoard: React.FC<{ x: number; y: number; w?: number; h?: number;
  z?: number; dim?: number }> = ({ x, y, w: ww = 340, h: hh = 240, z = 14, dim = 0.3 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, background: `linear-gradient(172deg, ${D("#C9A96A")} 0%, ${D("#8A6E3E")} 100%)`,
      border: `6px solid ${D(OAKD)}`, boxShadow: SH }}>
      {Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 13 }, (_, c) => (
          <div key={`p${r}-${c}`} style={{ position: "absolute", left: 12 + c * (ww - 30) / 13,
            top: 12 + r * (hh - 26) / 9, width: 5, height: 5, borderRadius: "50%",
            background: hexa("#2A1F10", 0.5) }} />
        ))
      )}
      {/* the tools: a wrench, a hammer, a saw, two screwdrivers, a mallet */}
      {[[0.12, 0.16, 16, 96], [0.30, 0.14, 22, 84], [0.50, 0.12, 12, 108],
        [0.66, 0.18, 10, 76], [0.80, 0.16, 10, 82]].map(([kx, ky, tw, th], i) => (
        <React.Fragment key={"tl" + i}>
          <div style={{ position: "absolute", left: ww * (kx as number), top: hh * (ky as number),
            width: tw as number, height: th as number, borderRadius: 3,
            background: `linear-gradient(96deg, ${D(STEELL)} 0%, ${D(STEELD)} 100%)` }} />
          <div style={{ position: "absolute", left: ww * (kx as number) - 3,
            top: hh * (ky as number) + (th as number) * 0.6, width: (tw as number) + 6,
            height: (th as number) * 0.36, borderRadius: 4, background: D(BRSD) }} />
        </React.Fragment>
      ))}
      <div style={{ position: "absolute", left: ww * 0.06, bottom: 14, width: ww * 0.5, height: 22,
        borderRadius: 3, background: D("#5E4A2A") }} />
    </div>
  );
};

/** ⭐ OVERHEAD CONDUIT — pipes with brackets, valves and a gauge. Reads as plant. */
export const PipeRun: React.FC<{ y: number; z?: number; dim?: number; n?: number }> =
  ({ y, z = 16, dim = 0.32, n = 3 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (<>
    {Array.from({ length: n }, (_, i) => (
      <div key={"pp" + i} style={{ position: "absolute", left: -20, right: -20, top: y + i * 22,
        height: 15, zIndex: z,
        background: `linear-gradient(180deg, ${D(STEELL)} 0%, ${D(STEEL)} 44%, ${D(STEELD)} 100%)` }} />
    ))}
    {[0.10, 0.34, 0.62, 0.88].map((k, i) => (
      <div key={"br" + i} style={{ position: "absolute", left: W * k - 13, top: y - 16,
        width: 26, height: n * 22 + 24, zIndex: z - 1, background: D(STEELD) }} />
    ))}
    {[0.22, 0.72].map((k, i) => (
      <div key={"vl" + i} style={{ position: "absolute", left: W * k - 22, top: y - 14,
        width: 44, height: 44, borderRadius: "50%", zIndex: z + 1,
        border: `6px solid ${D(BRSD)}`, background: D(BRS) }} />
    ))}
  </>);
};

/** ⭐ A CRANE GANTRY — a rail, a trolley, a hoist block and a hook on a chain.
    It also TRAVELS, so it doubles as the scene's background process. */
export const Gantry: React.FC<{ f: number; y: number; z?: number; rate?: number;
  dim?: number }> = ({ f, y, z = 18, rate = 1.6, dim = 0.28 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  const x = ((f * rate) % (W + 300)) - 150;
  return (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 22, zIndex: z,
      background: `linear-gradient(180deg, ${D(STEELL)} 0%, ${D(STEELD)} 100%)` }} />
    <div style={{ position: "absolute", left: -20, right: -20, top: y + 22, height: 8, zIndex: z,
      background: hexa("#000", 0.34) }} />
    <div style={{ position: "absolute", left: x - 44, top: y - 18, width: 88, height: 40,
      zIndex: z + 2, borderRadius: 4,
      background: `linear-gradient(178deg, ${D(BRSL)} 0%, ${D(BRSD)} 100%)` }} />
    <div style={{ position: "absolute", left: x - 4, top: y + 30, width: 8, height: 76,
      zIndex: z + 1, background: D(STEELD) }} />
    <div style={{ position: "absolute", left: x - 20, top: y + 104, width: 40, height: 30,
      zIndex: z + 2, borderRadius: 4, background: D(STEEL) }} />
    <div style={{ position: "absolute", left: x - 10, top: y + 132, width: 20, height: 26,
      zIndex: z + 2, borderRadius: "0 0 12px 12px",
      border: `6px solid ${D(BRSD)}`, borderTop: "none" }} />
  </>);
};

/** ⭐ A ROW OF PARTS BINS on a stand — small, countable, and unmistakably a works. */
export const Bins: React.FC<{ x: number; y: number; w?: number; z?: number; dim?: number;
  rows?: number; cols?: number }> =
  ({ x, y, w: ww = 300, z = 20, dim = 0.3, rows = 3, cols = 5 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  const bw = ww / cols, bh = bw * 0.66;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - rows * bh - 26, width: ww,
      height: rows * bh + 26, zIndex: z }}>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <div key={`b${r}-${c}`} style={{ position: "absolute", left: c * bw + 2, top: r * bh,
            width: bw - 4, height: bh - 3, borderRadius: "2px 2px 6px 6px",
            background: `linear-gradient(178deg, ${D(BLOCKS[(r * cols + c) % 6])} 0%, ${D(dkh(BLOCKS[(r * cols + c) % 6], 0.44))} 100%)`,
            border: `2px solid ${hexa("#000", 0.3)}` }}>
            <div style={{ position: "absolute", left: 5, right: 5, top: 4, height: 6,
              borderRadius: 2, background: hexa("#FFF", 0.34) }} />
          </div>
        ))
      )}
      <div style={{ position: "absolute", left: -8, right: -8, top: rows * bh, height: 14,
        background: D(STEELD) }} />
      {[0.1, 0.9].map((k, i) => (
        <div key={"lg" + i} style={{ position: "absolute", left: ww * k - 7, top: rows * bh + 14,
          width: 14, height: 26, background: D(STEELD) }} />
      ))}
    </div>
  );
};

/** ⭐ PENDANT WORK LAMPS in a row — they also give the room its overhead light. */
export const HangLamps: React.FC<{ y: number; n?: number; z?: number; on?: number;
  c?: string }> = ({ y, n = 4, z = 22, on = 1, c = "#FFE9B8" }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const x = (W / (n + 1)) * (i + 1);
    return (
      <React.Fragment key={"hl" + i}>
        <div style={{ position: "absolute", left: x - 3, top: 0, width: 6, height: y - 30,
          zIndex: z, background: hexa("#1A2126", 0.8) }} />
        <div style={{ position: "absolute", left: x - 46, top: y - 34, width: 92, height: 38,
          zIndex: z + 1, borderRadius: "50% 50% 14% 14%",
          background: `linear-gradient(178deg, ${dkh(STEEL, 0.2)} 0%, ${STEELD} 62%, ${mxh(c, 0.5)} 100%)` }} />
        {on > 0.4 && <Pool x={x} y={y + 2} w={300} c={c} o={0.22 * on} z={z} />}
      </React.Fragment>
    );
  })}
</>);

/** ⭐ STACKED CRATES against a wall — mass, and a different silhouette from the
    racking so two dressed rooms never read the same. */
export const Crates: React.FC<{ x: number; y: number; z?: number; dim?: number;
  n?: number; s?: number }> = ({ x, y, z = 20, dim = 0.32, n = 6, s = 1 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  const LAY = [[0, 0], [1, 0], [2, 0], [0.4, 1], [1.4, 1], [0.9, 2]];
  const cw = 118 * s, ch = 92 * s;
  return (<>
    {LAY.slice(0, n).map(([cx, cy], i) => (
      <div key={"cr" + i} style={{ position: "absolute", left: x + (cx as number) * cw,
        top: y - ((cy as number) + 1) * ch, width: cw - 5, height: ch - 5, zIndex: z,
        borderRadius: 4, boxShadow: SH,
        background: `linear-gradient(174deg, ${D("#C9A96A")} 0%, ${D("#8A6E3E")} 62%, ${D("#5E4A2A")} 100%)`,
        border: `3px solid ${D("#4A3A20")}` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "44%", height: 7,
          background: hexa("#3A2C16", 0.5) }} />
        <div style={{ position: "absolute", left: "44%", top: 0, bottom: 0, width: 7,
          background: hexa("#3A2C16", 0.4) }} />
        <div style={{ position: "absolute", left: 10, top: 8, width: 26, height: 18,
          borderRadius: 2, background: hexa(D(BRSL), 0.7) }} />
      </div>
    ))}
  </>);
};

/** ⭐ A BAY SIGN on the wall — where you are, in the works' own signage. */
export const BaySign: React.FC<{ x: number; y: number; t: string; z?: number;
  c?: string; dim?: number }> = ({ x, y, t, z = 24, c = BRSL, dim = 0.2 }) => {
  const D = (h: string) => lerpHex(h, "#16323A", dim);
  return (<>
    {[-1, 1].map(sd => (
      <div key={sd} style={{ position: "absolute", left: x + sd * 96 - 5, top: y - 40, width: 10,
        height: 40, zIndex: z - 1, background: D(STEELD) }} />
    ))}
    <div style={{ position: "absolute", left: x - 118, top: y, width: 236, height: 52, zIndex: z,
      borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center",
      background: `linear-gradient(178deg, ${D(mxh(c, 0.2))} 0%, ${D(c)} 46%, ${D(dkh(c, 0.4))} 100%)`,
      border: `4px solid ${D(dkh(c, 0.52))}`, boxShadow: SH }}>
      <span style={{ ...mono(22, 900), letterSpacing: 4, color: "#241B0C" }}>{t}</span>
    </div>
  </>);
};

/** ⭐ VENT DUCTING along the ceiling — the last of the four overhead options, so
    no two rooms share a skyline. */
export const Duct: React.FC<{ y: number; z?: number; dim?: number }> =
  ({ y, z = 16, dim = 0.34 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (<>
    <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 58, zIndex: z,
      background: `linear-gradient(180deg, ${D(STEELL)} 0%, ${D(STEEL)} 40%, ${D(STEELD)} 100%)` }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"sm" + i} style={{ position: "absolute", left: i * 124 - 10, top: y - 4,
        width: 14, height: 66, zIndex: z + 1, background: hexa(D(STEELD), 0.9) }} />
    ))}
    {[0.28, 0.66].map((k, i) => (
      <div key={"gr" + i} style={{ position: "absolute", left: W * k - 44, top: y + 58,
        width: 88, height: 26, zIndex: z + 1, background: D(STEELD),
        borderBottom: `4px solid ${hexa("#000", 0.4)}` }}>
        {[0, 1, 2].map(j => (
          <div key={j} style={{ position: "absolute", left: 8, right: 8, top: 5 + j * 7, height: 3,
            background: hexa("#000", 0.5) }} />
        ))}
      </div>
    ))}
  </>);
};

/** ⭐ A WORKBENCH with a vice, a lamp and parts on it — the mid-ground plane most
    of these rooms were missing entirely. */
export const WorkBench: React.FC<{ x: number; y: number; f: number; w?: number; z?: number;
  dim?: number }> = ({ x, y, f, w: ww = 420, z = 24, dim = 0.26 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (<>
    <Contact x={x - ww / 2 - 10} y={y - 6} w={ww + 20} z={z - 1} o={0.4} />
    <div style={{ position: "absolute", left: x - ww / 2, top: y - 116, width: ww, height: 22,
      zIndex: z + 2, borderRadius: 3,
      background: `linear-gradient(180deg, ${D(mxh(OAKL, 0.3))} 0%, ${D(OAK)} 100%)` }} />
    <div style={{ position: "absolute", left: x - ww / 2 + 8, top: y - 96, width: ww - 16,
      height: 96, zIndex: z, background: `linear-gradient(174deg, ${D(STEEL)} 0%, ${D(STEELD)} 100%)` }} />
    {[0.14, 0.86].map((k, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: x - ww / 2 + ww * k - 9, top: y - 96,
        width: 18, height: 96, zIndex: z + 1, background: D(STEELD) }} />
    ))}
    {/* the vice */}
    <div style={{ position: "absolute", left: x - ww / 2 + 26, top: y - 158, width: 74, height: 46,
      zIndex: z + 3, borderRadius: 4, background: `linear-gradient(178deg, ${D("#5E7A8A")} 0%, ${D("#2E3E48")} 100%)` }} />
    <div style={{ position: "absolute", left: x - ww / 2 + 20, top: y - 172, width: 12, height: 30,
      zIndex: z + 4, borderRadius: 6, background: D(BRSL) }} />
    {/* parts on the top */}
    {[0.42, 0.56, 0.70].map((k, i) => (
      <div key={"pt" + i} style={{ position: "absolute", left: x - ww / 2 + ww * k,
        top: y - 134 + Math.sin(f / 11 + i) * 1.5, width: 44 - i * 8, height: 20,
        zIndex: z + 3, borderRadius: 3, background: D(BLOCKS[i % 6]) }} />
    ))}
  </>);
};

/* =========================================================================
   ⭐⭐⭐ THE ROOMS — eight dressed places built out of the kit above.

   ⛔ Every scene used to call `Chamber` and stop. `Chamber` is a WALL: plaster,
   windows, wainscot, floor. A wall is not a room, and eighteen scenes sharing one
   wall is why the note was *"all of these animations are horrible"* — there was
   nothing in any of them to look at between the two or three props.
   ⭐ Each kind below puts 4-8 real objects across three depth planes, and no two
   share a skyline: `racks` has conduit, `hall` has a crane gantry, `store` has
   ducting, `bay` has pendant lamps. That difference is what stops the reel
   reading as one location eighteen times.
   ========================================================================= */
export type RoomKind = "racks" | "bench" | "hall" | "store" | "line" | "cell" | "bay" | "doors";

export const Dress: React.FC<{ kind: RoomKind; f: number; hz: number; dim?: number;
  lamps?: number; bay?: string; pallets?: number[] }> =
  ({ kind, f, hz, dim = 0.3, lamps = 1, bay = "03", pallets = [] }) => {
  /* ⭐ THE FLOOR AND THE MID-WALL GO IN EVERY ROOM. They were the two big empty
     bands every scene shared — a third of the frame at the bottom with nothing on
     it, and a blank strip across the middle at exactly the height the action
     happens. */
  const common = (<>
    <FloorDeck hz={hz} f={f} z={14} dim={dim} bay={bay} pallets={pallets} />
    <WallBand y={Math.round(hz * 0.62)} f={f} z={15} dim={dim} />
  </>);
  switch (kind) {
    case "racks": return (<>{common}
      <PipeRun y={96} z={16} dim={dim} n={3} />
      <RackWall x={506} y={hz + 6} f={f} w={1180} h={hz - 190} z={12} bays={4} levels={3} dim={dim} />
      <HangLamps y={172} n={4} z={22} on={lamps} />
      <Bins x={130} y={hz + 96} w={250} z={26} dim={dim} rows={3} cols={4} />
    </>);
    case "bench": return (<>{common}
      <Duct y={78} z={16} dim={dim} />
      <ToolBoard x={214} y={hz - 34} w={330} h={230} z={14} dim={dim} />
      <Crates x={742} y={hz + 4} z={20} dim={dim} n={5} s={0.9} />
      <WorkBench x={520} y={hz + 118} f={f} w={430} z={24} dim={dim} />
      <HangLamps y={150} n={3} z={22} on={lamps} />
    </>);
    case "hall": return (<>{common}
      <Gantry f={f} y={104} z={18} rate={1.5} dim={dim} />
      <RackWall x={506} y={hz + 2} f={f} w={1200} h={hz - 210} z={12} bays={5} levels={2} dim={dim + 0.1} />
      <HangLamps y={196} n={5} z={22} on={lamps} />
      <BaySign x={506} y={236} t="THE WORKS" z={24} dim={dim} />
    </>);
    case "store": return (<>{common}
      <Duct y={70} z={16} dim={dim} />
      <Crates x={64} y={hz + 8} z={20} dim={dim} n={6} s={1.0} />
      <Crates x={708} y={hz + 8} z={20} dim={dim + 0.06} n={4} s={0.92} />
      <Bins x={506} y={hz - 26} w={330} z={22} dim={dim} rows={3} cols={5} />
      <HangLamps y={162} n={3} z={22} on={lamps} />
    </>);
    case "line": return (<>{common}
      <Gantry f={f} y={92} z={18} rate={2.1} dim={dim} />
      <PipeRun y={162} z={16} dim={dim} n={2} />
      <RackWall x={506} y={hz + 4} f={f} w={1180} h={hz - 250} z={12} bays={5} levels={2} dim={dim + 0.12} />
      <Bins x={128} y={hz + 84} w={230} z={26} dim={dim} rows={2} cols={4} />
      <Bins x={892} y={hz + 84} w={230} z={26} dim={dim} rows={2} cols={4} />
      <HangLamps y={216} n={4} z={22} on={lamps} />
    </>);
    case "cell": return (<>{common}
      <Duct y={54} z={16} dim={dim + 0.2} />
      <ToolBoard x={880} y={hz - 40} w={230} h={170} z={14} dim={dim + 0.24} />
      <Crates x={40} y={hz + 4} z={20} dim={dim + 0.26} n={3} s={0.8} />
    </>);
    case "bay": return (<>{common}
      <PipeRun y={82} z={16} dim={dim} n={2} />
      <Bins x={620} y={hz + 66} w={250} z={22} dim={dim} rows={2} cols={4} />
      <Crates x={690} y={hz - 44} z={18} dim={dim + 0.1} n={3} s={0.7} />
      <ToolBoard x={880} y={hz - 46} w={300} h={220} z={14} dim={dim} />
      <Crates x={44} y={hz + 4} z={20} dim={dim} n={5} s={0.92} />
      <WorkBench x={300} y={hz + 106} f={f} w={330} z={24} dim={dim} />
      <HangLamps y={158} n={4} z={22} on={lamps} />
      <BaySign x={214} y={214} t="BAY 03" z={24} c={BRSL} dim={dim} />
    </>);
    case "doors": return (<>{common}
      <PipeRun y={88} z={16} dim={dim} n={3} />
      <Crates x={38} y={hz + 6} z={20} dim={dim} n={6} s={0.95} />
      <Bins x={196} y={hz - 20} w={230} z={22} dim={dim} rows={2} cols={4} />
      <HangLamps y={168} n={3} z={22} on={lamps} />
      <BaySign x={190} y={230} t="DESPATCH" z={24} dim={dim} />
    </>);
  }
};

/** ⭐⭐ THE FLOOR — the bottom third was bare in every scene, which is a third of
    the frame doing nothing. A works floor has painted bay lines, hazard chevrons
    at the edges, a steel plate over a service run, a drain and pallets, and the
    action stands ON something instead of floating on a gradient. */
export const FloorDeck: React.FC<{ hz: number; f: number; z?: number; dim?: number;
  bay?: string; pallets?: number[] }> =
  ({ hz, f, z = 14, dim = 0.3, bay = "03", pallets = [] }) => {
  const D = (c: string) => lerpHex(c, "#2A231A", dim);
  return (<>
    {/* the painted bay outline, in perspective */}
    <div style={{ position: "absolute", left: 120, right: 120, top: hz + 54, height: 9,
      zIndex: z, background: hexa(D("#E8C97A"), 0.62) }} />
    {[-1, 1].map(sd => (
      <div key={"bl" + sd} style={{ position: "absolute",
        left: sd < 0 ? 84 : undefined, right: sd > 0 ? 84 : undefined, top: hz + 54,
        width: 9, height: H - hz - 54, zIndex: z, transformOrigin: sd < 0 ? "0% 0%" : "100% 0%",
        transform: `rotate(${sd * 7}deg)`, background: hexa(D("#E8C97A"), 0.52) }} />
    ))}
    {/* hazard chevrons along the near edge */}
    <div style={{ position: "absolute", left: -20, right: -20, bottom: 0, height: 34, zIndex: z + 1,
      opacity: 0.5,
      background: "repeating-linear-gradient(115deg,#E8C97A 0 22px,#2A231A 22px 44px)" }} />
    {/* a steel service plate with countersunk bolts */}
    <div style={{ position: "absolute", left: 300, top: hz + 128, width: 300, height: 66,
      zIndex: z + 1, borderRadius: 4, background: `linear-gradient(178deg, ${D("#9AA6AE")} 0%, ${D("#5A646B")} 100%)` }}>
      {[0.08, 0.36, 0.64, 0.92].map((k, i) => (
        <div key={i} style={{ position: "absolute", left: `${k * 100}%`, top: 12, width: 10,
          height: 10, borderRadius: "50%", background: hexa("#000", 0.42) }} />
      ))}
    </div>
    {/* a drain */}
    <div style={{ position: "absolute", left: 806, top: hz + 150, width: 92, height: 42, zIndex: z + 1,
      borderRadius: 5, background: D("#3E464C") }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ position: "absolute", left: 8, right: 8, top: 7 + i * 8, height: 4,
          background: hexa("#000", 0.55) }} />
      ))}
    </div>
    {/* pallets — the thing the action actually stands on */}
    {pallets.map((px, i) => (
      <React.Fragment key={"pl" + i}>
        <div style={{ position: "absolute", left: px - 150, top: hz + 176, width: 300, height: 30,
          zIndex: z + 2, background: `linear-gradient(180deg, ${D("#B08A4E")} 0%, ${D("#6E5424")} 100%)` }} />
        {[0, 1, 2, 3, 4].map(j => (
          <div key={j} style={{ position: "absolute", left: px - 150 + j * 62, top: hz + 176,
            width: 46, height: 30, zIndex: z + 3, background: hexa(D("#8A6A34"), 0.9),
            borderRight: `3px solid ${hexa("#000", 0.3)}` }} />
        ))}
        <div style={{ position: "absolute", left: px - 150, top: hz + 206, width: 300, height: 14,
          zIndex: z + 2, background: D("#5A4420") }} />
      </React.Fragment>
    ))}
  </>);
};

/** ⭐ THE MID-WALL BAND — the wainscot was a blank strip across the middle of
    every frame. A cable tray, a notice board, a fire point and a clock break it
    up and give the eye something at the height the action happens. */
export const WallBand: React.FC<{ y: number; f: number; z?: number; dim?: number }> =
  ({ y, f, z = 15, dim = 0.3 }) => {
  const D = (c: string) => lerpHex(c, "#16323A", dim);
  return (<>
    {/* cable tray with a bundle in it */}
    <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 26, zIndex: z,
      background: `linear-gradient(180deg, ${D(STEELD)} 0%, ${D("#242C31")} 100%)` }} />
    {[0, 1, 2].map(i => (
      <div key={"cb" + i} style={{ position: "absolute", left: -20, right: -20, top: y + 4 + i * 6,
        height: 5, zIndex: z + 1, background: hexa(D(BLOCKS[i]), 0.75) }} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"hg" + i} style={{ position: "absolute", left: i * 138 + 30, top: y - 16, width: 10,
        height: 20, zIndex: z - 1, background: D(STEELD) }} />
    ))}
    {/* a notice board with sheets pinned to it */}
    <div style={{ position: "absolute", left: 610, top: y + 40, width: 250, height: 140, zIndex: z + 2,
      background: D("#4A5A46"), border: `6px solid ${D("#2A331F")}` }}>
      {[[10, 10, 96, 58], [116, 14, 68, 46], [24, 76, 110, 46], [148, 70, 62, 54]].map((r, i) => (
        <div key={i} style={{ position: "absolute", left: r[0], top: r[1], width: r[2], height: r[3],
          background: hexa("#EFE7D2", 0.86), transform: `rotate(${(i % 2 ? 1 : -1) * 2}deg)` }} />
      ))}
    </div>
    {/* a fire point */}
    <div style={{ position: "absolute", left: 118, top: y + 44, width: 54, height: 96, zIndex: z + 2,
      borderRadius: "26px 26px 6px 6px",
      background: `linear-gradient(178deg, ${D("#E24A32")} 0%, ${D("#8E2417")} 100%)` }} />
    <div style={{ position: "absolute", left: 106, top: y + 140, width: 78, height: 10, zIndex: z + 2,
      background: D("#2A333A") }} />
    {/* a wall clock — the works runs to a clock */}
    <div style={{ position: "absolute", left: 906, top: y + 44, width: 74, height: 74, zIndex: z + 2,
      borderRadius: "50%", border: `6px solid ${D("#2A333A")}`,
      background: `radial-gradient(50% 50% at 42% 34%, ${D("#F7F1DC")} 0%, ${D("#C9BFA2")} 100%)` }}>
      <div style={{ position: "absolute", left: "50%", top: 10, width: 4, height: 24, marginLeft: -2,
        background: "#2A2318", transformOrigin: "2px 22px",
        transform: `rotate(${(f * 1.4) % 360}deg)` }} />
    </div>
  </>);
};
