import React from "react";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";

/* ===========================================================================
   REEL 101 · "COMPRESS" — THE WORLD KIT.  Board: storyboards/101-compress.md.

   THE PLACE: **THE INTAKE** — a night hall where everything a coding agent
   reads rides a belt, as tall lit sheets, toward ONE doorway of fixed size.
   The doorway is the API call. The counter above it is the bill.

   ⛔⛔ NOTHING HERE HAS TO BE TRANSLATED ([[feedback_real_marks_are_the_props]]):
        a file read        -> a sheet with the actual stack trace on it
        the token count    -> the number printed in that sheet's corner
        the context window -> a doorway of fixed size
        your token bill    -> a split-flap counter above the door
        your usage limit   -> a red line up a column beside it
        headroom           -> the press straddling the belt
        its three routers  -> three heads on the press spine, labelled
        a compressed chunk -> an ingot stamped [REF:id]
        CCR                -> a cabinet of the originals, with a drawer

   ⛔ EVERY NUMBER IS REAL, from headroomlabs-ai/headroom (66,006★, Apache-2.0,
      GitHub API, 2026-08-12). ⛔⛔ The VO's "60 to 95%" is the repo's JSON
      figure, NOT its coding-agent figure (15-20%) — so the band is only ever
      drawn ON the JSON/tool-output rows, and the headline receipts are the
      repo's measured workload table. See the board's HONESTY LINE.

   ⛔ MATTE PALETTE. Solid paints, dark shadows, zero `0 0 Npx <colour>` glow.
   ⛔⛔ dkh/mxh are HEX-IN HEX-OUT so they nest. dark()/mix() do NOT.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, AskBubble, CamCtx, PalCtx };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";

export const dkh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v * (1 - k));
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};
export const mxh = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  const h = (v: number) => m(v).toString(16).padStart(2, "0");
  return `#${h((n >> 16) & 255)}${h((n >> 8) & 255)}${h(n & 255)}`;
};

/* the world's own materials */
export const STEEL = "#8E97A1", STEELD = "#4E565E", STEELL = "#BEC6CE";
export const RUST = "#9C5A3C", CONC = "#6E6A64", CONCD = "#403D39";
export const SHEET = "#E7E2D4", SHEETD = "#BCB6A5";   /* the material on the belt */
export const AMBER = "#D9932F", AMBERD = "#8A5A17";   /* the alarm */
export const CARD = "#F4EFE3", CARDD = "#D9D0BC";
export const LIME = "#8FBF5A";                        /* the compressed state */

/* =========================================================================
   THE PLACES — ten, one per beat, each its own palette so every cut is a
   COLOUR change as well as a framing change ([[reel-locations-library-vs-used]]:
   this is the USED list; the count below is asserted against the scene table).

   ⛔ THE STAGE, measured off the panel: 1012 x 792, header pill owns y 0..112,
      slug owns y 730..792, so every hero lives in y 118..726. Horizons sit at
      560..610 so the floor is a ~150px band a sprite stands ON, never half the
      frame of empty ground.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0-A/B · the door mouth. Graphite hall, amber alarm, one hard top spot.
     ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (docs/THE-OPEN.md): the jammed sheet
        is near-white and fills the middle third, so the panel's mean luma is
        carried by the HERO, not by lifting the room. */
  door:   { back: "#333A42", back2: "#171B20", floor: "#42484F", floor2: "#22262B",
            lip: "#525960", key: "#F0E3C6", horizon: 596, grit: "#565E66" },
  /* S0-C/S11 · the belt head, looking down the line. Cool, blue, deep. */
  belt:   { back: "#2B3944", back2: "#141C23", floor: "#38464F", floor2: "#1C242A",
            lip: "#45535C", key: "#7FB4D6", horizon: 570, grit: "#4A5860" },
  /* S1/S4/S5/S13 · the press bay. The reel's hot room, amber from inside. */
  press:  { back: "#3E3128", back2: "#1E1712", floor: "#4A3B30", floor2: "#251C16",
            lip: "#5C4A3B", key: AMBER, horizon: 600, grit: "#5E4C3E" },
  /* S2 · the rule bench. Warm gold worklight raking from the left. */
  bench:  { back: "#E3D5B8", back2: "#B5A588", floor: "#A2applies", floor2: "#6E5B3E",
            lip: "#BC9A6A", key: GOLD, horizon: 604, grit: "#AE8F62" },
  /* S3/S7 · the accuracy alcove. Coldest frame in the reel, blue-grey key. */
  alcove: { back: "#5A6774", back2: "#2F3944", floor: "#4A5764", floor2: "#28313A",
            lip: "#55636F", key: "#A8C2D8", horizon: 588, grit: "#57646F" },
  /* S6 · the run from press to door, shot along the belt. */
  run:    { back: "#2E353C", back2: "#12161A", floor: "#3A424A", floor2: "#1B2025",
            lip: "#49515A", key: "#EFD9A6", horizon: 606, grit: "#4C545C" },
  /* S8 · the macro on the ingot. Brightest, highest-contrast frame. */
  macro:  { back: "#4A4034", back2: "#1D1812", floor: "#5A4E3E", floor2: "#2A2318",
            lip: "#6E6047", key: "#F6E7C2", horizon: 612, grit: "#6A5C46" },
  /* S9 · the CCR cabinet. Cool teal, quiet, the reveal-in-the-pause scene. */
  cab:    { back: "#22383C", back2: "#0F1E21", floor: "#2C4247", floor2: "#152428",
            lip: "#385056", key: "#6FC3C8", horizon: 596, grit: "#3C545A" },
  /* S10 · the three arches. The hall opens out; widest frame since S0-C. */
  arch:   { back: "#3A3B46", back2: "#1A1B22", floor: "#454652", floor2: "#212229",
            lip: "#54556180", key: "#E2CFA4", horizon: 590, grit: "#525360" },
  /* S12 · the limit column, floor to ceiling. */
  col:    { back: "#2F3A3A", back2: "#141C1C", floor: "#3C4848", floor2: "#1D2626",
            lip: "#4A5757", key: "#9ED2A8", horizon: 610, grit: "#4C5959" },
};
/* ⛔ a typo in a Place field paints black and only shows in one shot */
PLACES.bench.floor = "#A2825A";
PLACES.arch.lip = "#545561";

const WARM = ["press", "bench", "macro", "run"];
const COLD = ["door", "belt", "alcove", "cab", "arch", "col"];
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.09), 2: (c) => mxh(c, 0.16), 3: (c) => dkh(c, 0.10),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = COLD.includes(key) ? COLD : WARM;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   THE HALL — wall, skirting, receding floor. Nothing in this reel floats.
   `live` gives the ROOM a permanent low-contrast idle so a frame is never
   static between hero gestures, and none of it competes for hierarchy.
   ====================================================================== */
export const Hall: React.FC<{ p: Place; f: number; dim?: number; skirt?: boolean;
  floorLines?: number; live?: boolean; lightX?: number; bleed?: number;
  atmos?: boolean }> =
  ({ p, f, dim = 0, skirt = true, floorLines = 5, live = true, lightX = 0.5, bleed = 0,
     atmos = true }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const breathe = live ? Math.sin(f / 61) * 0.04 : 0;
  const drift = live ? Math.sin(f / 83) * 9 : 0;
  const B = { left: -bleed, right: -bleed } as const;
  return (<>
    <div style={{ position: "absolute", ...B, top: -bleed, bottom: -bleed, zIndex: 1,
      background: `linear-gradient(174deg, ${D(mxh(p.back, 0.12))} 0%, ${D(p.back)} 44%, ${D(p.back2)} 100%)` }} />
    <div style={{ position: "absolute", left: W * lightX - 430 + drift, top: -80,
      width: 860, height: hz + 140, zIndex: 2, borderRadius: "50%",
      background: D(mxh(p.back, 0.20)), opacity: 0.30 + breathe }} />
    <div style={{ position: "absolute", ...B, top: hz, bottom: -bleed, zIndex: 12,
      background: `linear-gradient(183deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
    {skirt && (<>
      <div style={{ position: "absolute", ...B, top: hz - 15, height: 19,
        background: D(mxh(p.floor, 0.24)), zIndex: 13, boxShadow: SH }} />
      <div style={{ position: "absolute", ...B, top: hz + 4, height: 5,
        background: D(dkh(p.floor2, 0.26)), zIndex: 14 }} />
    </>)}
    {Array.from({ length: floorLines }, (_, i) => (
      <div key={"fl" + i} style={{ position: "absolute", ...B,
        top: hz + 38 + i * i * 13 + i * 28, height: 3,
        background: D(dkh(p.floor2, 0.22)), opacity: 0.55, zIndex: 15 }} />
    ))}
    {live && (
      <div style={{ position: "absolute", left: W * lightX - 320 + drift * 0.6, top: hz + 18,
        width: 640, height: 132, borderRadius: "50%", background: D(mxh(p.floor, 0.24)),
        opacity: 0.28 + breathe, zIndex: 16 }} />
    )}
    {/* ⭐ every scene gets air, automatically */}
    {live && atmos && <Facility f={f} p={p} z={6} seed={(p.horizon % 7)} bay={4}
      sign={p.horizon > 600 ? "PRESS · BAY 2" : "INTAKE · BAY 4"} />}
    {live && atmos && <Atmos f={f} p={p} lightX={lightX} n={26} z={18} shafts={3} seed={7} />}
  </>);
};

/* the hall's overhead worklight — housing, throat, cone */
export const Spot: React.FC<{ x: number; y?: number; on?: number; c?: string;
  z?: number; f?: number; len?: number; spread?: number }> =
  ({ x, y = 0, on = 1, c = "#F2E7CC", z = 30, f = 0, len = 470, spread = 430 }) => (<>
    <div style={{ position: "absolute", left: x - 5, top: y, width: 10, height: 42,
      background: "#2C3036", zIndex: z }} />
    <div style={{ position: "absolute", left: x - 38, top: y + 36, width: 76, height: 42,
      borderRadius: "8px 8px 28px 28px", background: "#383D44", zIndex: z, boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: x - 28, top: y + 70, width: 56, height: 10,
      borderRadius: "0 0 24px 24px", background: on > 0.03 ? c : "#353A40",
      opacity: on > 0 ? 0.4 + on * 0.6 : 1, zIndex: z + 1 }} />
    {on > 0.03 && <Beam x={x} y={y + 78} top={60} bot={spread} len={len} c={c}
      o={0.24 * on} z={z - 9} f={f} />}
  </>);


/* =========================================================================
   ⭐⭐ ATMOS — the single highest-leverage "elevated" change, because it is
   wired into `Hall` and therefore lands in all thirteen scenes at once.

   ALEX: *"make the animations way more elevated"*. What separates a flat
   diorama from a cinematic frame is not more objects, it is AIR: volumetric
   shafts with real slope, particulate drifting THROUGH them at different
   depths, a haze gradient that sits between the planes, and a key that moves.
   ⛔ All of it stays under the hierarchy threshold — nothing here is ever the
   largest mover ([[reel-motion-hierarchy]]) — and it is matte: no glow, no
   blur filters, just layered solid fills at low alpha
   ([[feedback_reel_matte_palette]]).
   ====================================================================== */
export const Atmos: React.FC<{ f: number; p: Place; lightX?: number; n?: number;
  z?: number; shafts?: number; seed?: number }> =
  ({ f, p, lightX = 0.5, n = 26, z = 18, shafts = 3, seed = 0 }) => (<>
    {/* the shafts — angled, so the light has a DIRECTION and a source */}
    {Array.from({ length: shafts }, (_, i) => {
      const x = W * lightX + (i - (shafts - 1) / 2) * 210 + Math.sin(f / 97 + i) * 14;
      const sway = Math.sin(f / 71 + i * 1.3) * 3.2;
      return (
        <div key={"sh" + i} style={{ position: "absolute", left: x - 130, top: -90,
          width: 260, height: p.horizon + 190, zIndex: z,
          transform: `rotate(${9 + i * 3.5 + sway}deg)`, transformOrigin: "50% 0%",
          background: `linear-gradient(180deg, ${hexa(p.key, 0.10)} 0%, ${hexa(p.key, 0.045)} 46%, ${hexa(p.key, 0)} 100%)`,
          clipPath: "polygon(38% 0%, 62% 0%, 96% 100%, 4% 100%)" }} />
      );
    })}
    {/* particulate on three depth planes — the near ones bigger and faster */}
    {Array.from({ length: n }, (_, i) => {
      const pl = i % 3;
      const r1 = rnd(seed + i, 1), r2 = rnd(seed + i, 2), r3 = rnd(seed + i, 3);
      const sp = 0.20 + pl * 0.34;
      const y = ((r2 * (p.horizon + 120)) - f * sp + 900) % (p.horizon + 200) - 60;
      const x = r1 * W + Math.sin(f / (46 + r3 * 40) + i) * (8 + pl * 12);
      const sz = 1.6 + pl * 2.2 + r3 * 1.8;
      return (
        <div key={"mo" + i} style={{ position: "absolute", left: x, top: y, width: sz,
          height: sz, borderRadius: "50%", zIndex: z + 1 + pl,
          background: hexa(p.key, 0.16 + pl * 0.14), opacity: 0.5 + r3 * 0.5 }} />
      );
    })}
    {/* the haze that separates foreground from background */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 230, height: 320,
      zIndex: z + 5, background: `linear-gradient(180deg, ${hexa(p.back2, 0)} 0%, ${hexa(p.back2, 0.20)} 62%, ${hexa(p.back2, 0)} 100%)` }} />
  </>);


/* =========================================================================
   ⭐⭐ THE FACILITY — ALEX: *"needs more interesting worldbuilding here"*.
   Every scene was a wall, a floor and the hero. A real place has things that
   were built BEFORE the camera arrived and will be there after it leaves:
   structural bays, a gantry crane on a rail, pipework, wall signage, a stencil
   on the wall, a caged inspection lamp. None of it is a subject and none of it
   is ever the largest mover — it is what makes a room feel like a PLACE rather
   than a backdrop ([[reel-cinematic-legup]]: 4-6 parallax planes, rich bg).
   ⛔ Wired into Hall like Atmos, so it lands in all thirteen at once.
   ====================================================================== */
export const Facility: React.FC<{ f: number; p: Place; z?: number; seed?: number;
  bay?: number; sign?: string }> =
  ({ f, p, z = 6, seed = 0, bay = 4, sign = "INTAKE · BAY 4" }) => {
  const wall = mxh(p.back, 0.06), dk = dkh(p.back2, 0.10);
  return (<>
    {/* structural bays — vertical piers with capitals, receding */}
    {Array.from({ length: bay }, (_, i) => {
      const x = 40 + i * ((W - 80) / (bay - 1));
      return (
        <div key={"pi" + i} style={{ position: "absolute", left: x - 27, top: -40,
          width: 54, height: p.horizon + 40, zIndex: z,
          background: `linear-gradient(90deg, ${mxh(wall, 0.10)} 0%, ${wall} 42%, ${dk} 100%)`,
          opacity: 0.72 }}>
          <div style={{ position: "absolute", left: -9, right: -9, top: 108, height: 15,
            background: mxh(wall, 0.14), opacity: 0.9 }} />
          <div style={{ position: "absolute", left: -6, right: -6, bottom: 0, height: 26,
            background: dkh(wall, 0.18), opacity: 0.85 }} />
        </div>
      );
    })}
    {/* the gantry crane on its rail, tracking slowly across the ceiling */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 86, height: 11, zIndex: z + 1,
      background: dkh(wall, 0.26), opacity: 0.85 }} />
    <div style={{ position: "absolute", left: ((f * 0.62 + seed * 90) % (W + 300)) - 150,
      top: 74, width: 132, height: 34, zIndex: z + 2 }}>
      <div style={{ position: "absolute", inset: 0, background: dkh(wall, 0.34),
        borderRadius: 3, opacity: 0.92 }} />
      <div style={{ position: "absolute", left: 60, top: 34, width: 3, height: 74,
        background: dkh(wall, 0.38), opacity: 0.8 }} />
      <div style={{ position: "absolute", left: 48, top: 106, width: 28, height: 17,
        background: dkh(wall, 0.30), opacity: 0.9 }} />
    </div>
    {/* pipework running the back wall */}
    {[0, 1].map((i) => (
      <div key={"pp" + i} style={{ position: "absolute", left: -20, right: -20,
        top: 150 + i * 34, height: 9 + i * 3, zIndex: z + 1,
        background: `linear-gradient(180deg, ${mxh(wall, 0.16)} 0%, ${dkh(wall, 0.22)} 100%)`,
        opacity: 0.55 }} />
    ))}
    {/* the stencil every industrial wall has */}
    <div style={{ position: "absolute", left: 44, top: p.horizon - 168, zIndex: z + 2,
      fontFamily: MONO, fontWeight: 900, fontSize: 46, letterSpacing: "0.10em",
      color: hexa(p.key, 0.09), transform: "rotate(-90deg)", transformOrigin: "0% 100%",
      whiteSpace: "nowrap" }}>{sign}</div>
    {/* a caged lamp on the wall, flickering on its own clock */}
    <div style={{ position: "absolute", left: W - 118, top: 176, width: 40, height: 46,
      zIndex: z + 3 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50% 50% 6px 6px",
        background: hexa(p.key, 0.16 + Math.abs(Math.sin(f / 31 + seed)) * 0.10),
        border: `2px solid ${dkh(wall, 0.34)}`, boxSizing: "border-box" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 4 + i * 11, top: 2, width: 2,
          height: 42, background: dkh(wall, 0.40), opacity: 0.8 }} />
      ))}
    </div>
  </>);
};

/* =========================================================================
   THE BELT — the thing everything rides on. It is the agent's context: it
   never stops, and it is rebuilt every turn.
   ⛔ It is FURNITURE. Its treads move continuously at low contrast so the
      frame has life, but the tread is never the largest mover in a shot.
   ====================================================================== */
export const Belt: React.FC<{ y: number; f: number; x0?: number; x1?: number; h?: number;
  z?: number; speed?: number; c?: string; run?: number }> =
  ({ y, f, x0 = -60, x1 = W + 60, h = 34, z = 26, speed = 2.4, c = STEELD, run = 1 }) => {
  const ph = ((f * speed * run) % 46 + 46) % 46;
  return (<>
    {/* the bed */}
    <div style={{ position: "absolute", left: x0, top: y, width: x1 - x0, height: h,
      zIndex: z, background: `linear-gradient(180deg, ${mxh(c, 0.26)} 0%, ${c} 46%, ${dkh(c, 0.34)} 100%)`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {Array.from({ length: Math.ceil((x1 - x0) / 46) + 2 }, (_, i) => (
        <div key={"tr" + i} style={{ position: "absolute", left: i * 46 - ph, top: 0,
          width: 4, height: h, background: dkh(c, 0.42), opacity: 0.8 }} />
      ))}
    </div>
    {/* the rail the sheets ride between */}
    <div style={{ position: "absolute", left: x0, top: y - 7, width: x1 - x0, height: 8,
      zIndex: z + 1, background: mxh(c, 0.40), boxShadow: SH }} />
    {/* legs, so it stands on the floor rather than hovering */}
    {[0.16, 0.5, 0.84].map((k, i) => (
      <div key={"lg" + i} style={{ position: "absolute", left: x0 + (x1 - x0) * k - 9,
        top: y + h, width: 18, height: 64, zIndex: z - 1,
        background: `linear-gradient(90deg, ${dkh(c, 0.20)} 0%, ${dkh(c, 0.48)} 100%)` }} />
    ))}
  </>);
};

/* =========================================================================
   IDLE — the small permanent life a sprite needs so it is never a cut-out.
   ====================================================================== */
export const idle = (f: number, seed: number, amp = 1) => ({
  dy: Math.sin(f / 21 + seed * 1.7) * 2.4 * amp,
  rot: Math.sin(f / 29 + seed) * 0.7 * amp,
});

/* =========================================================================
   ⭐⭐ COMPONENT IDLES — the single change that took reel 100 from a median
   motion of 8.26 to 9.80. Alex, round 2 here: *"too boring and dull
   animations throughout"*. A prop that ARRIVES and then HOLDS is what that
   describes, and the motion audit sees it as STATIC.

   Every one of these is deliberately UNDER the hierarchy threshold — ≤3px of
   travel, ≤0.06 of opacity — so the frame is never still while nothing ever
   competes with the scene's one real mover ([[reel-motion-hierarchy]]).
   ====================================================================== */

/** a slow specular sweep across a flat face. The cheapest way to stop a slab
    reading as a dead rectangle. */
export const Sheen: React.FC<{ f: number; w: number; h: number; z?: number; seed?: number;
  period?: number; o?: number; c?: string; rot?: number }> =
  ({ f, w: ww, h: hh, z = 3, seed = 0, period = 118, o = 0.13, c = "#FFFFFF", rot = -18 }) => {
  const k = ((f + seed * 37) % period) / period;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z, overflow: "hidden",
      pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: -hh * 0.6, height: hh * 2.2, width: ww * 0.22,
        left: -ww * 0.3 + k * ww * 1.5, transform: `rotate(${rot}deg)`,
        background: `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 50%, ${hexa(c, 0)} 100%)` }} />
    </div>
  );
};

/** a lamp/plate that breathes. `amp` is an OPACITY delta, capped low. */
export const breathe = (f: number, seed = 0, amp = 0.05, period = 47) =>
  1 + Math.sin(f / period + seed * 2.1) * amp;

/** ≤3px of drift, for anything hanging, resting or suspended. */
export const drift = (f: number, seed = 0, amp = 2.4, period = 63) => ({
  x: Math.sin(f / period + seed) * amp,
  y: Math.cos(f / (period * 1.31) + seed * 1.7) * amp * 0.7,
});

/* =========================================================================
   ⭐ CREW — a clay Claude with a BIG mark, the way Alex asks for it: *"not
   enough Claude sprites"* and *"not enough logos"*. Reel 95 round 3 settled
   the reason: the mark is an AUDIENCE FILTER, so it wants to be big, early
   and repeated — the scroller who does not recognise it was never the target.
   ⛔ THE MARK NEVER COVERS HIS FACE. The box Mascot has no separate head: the
      body rect IS the face and the eyes sit in its upper third, so the emblem
      only ever goes ABOVE him or on the ground behind him.
   ====================================================================== */
export const CREW_MARK_ABOVE = -0.62;   /* mark y, as a multiple of sprite size */

/* a foreground occluder for this world: the shoulder of the next sheet in the
   queue, cropped by the panel. Without one the camera is at a backdrop. */
export const SheetEdge: React.FC<{ side?: "l" | "r"; c?: string; w?: number; z?: number;
  top?: number }> = ({ side = "l", c = SHEETD, w: ww = 88, z = 92, top = -40 }) => {
  const L = side === "l";
  return (
    <div style={{ position: "absolute", top, bottom: -40, width: ww, zIndex: z,
      [L ? "left" : "right"]: -20, background: dkh(c, 0.34), boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "right" : "left"]: 0,
        width: 10, background: dkh(c, 0.10) }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, [L ? "left" : "right"]: 0,
        width: 20, background: dkh(c, 0.56) }} />
    </div>
  );
};
