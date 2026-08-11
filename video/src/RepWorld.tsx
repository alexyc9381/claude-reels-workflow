import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";

/* ===========================================================================
   REEL 99 "REPO" — THE WORLD KIT.  Board: storyboards/99-repo.md.

   The place is a municipal NIGHT WATERWORKS: a lime-plaster pumphouse, a
   reservoir yard, a lamplit row of feeder taps, a coin-fed pay spigot in the
   rain, the manifold hall where twenty-nine feeds become one main, and a macro
   on the rotary changeover gear.

   WHY A WATERWORKS. The subject's three moves are all things this place does
   physically, so none of them needs a diagram:
     free tiers, each a dribble      -> twenty-nine thin feeder pipes
     pooled behind one endpoint      -> one manifold, one main
     capacity                        -> HEIGHT of water in a graduated glass
     a rate limit                    -> a feeder coughs and runs dry
     automatic failover              -> a brass arm CLACKS to the next live port
     paying per request              -> a coin meter on a spigot

   ⛔ MATTE PALETTE, NOT NEON (REEL-BUILD-LEARNINGS §1). Warm practicals against
      cold wet stone. The brightest values in the reel are LIME PLASTER and
      WATER — both things the world already owns — which is what lets the gauge
      column rank without a single `0 0 Npx` emissive shadow anywhere.
   ⛔ NO low-alpha washes. Tints are mixed toward paper and emitted solid.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813";
/* ⛔⛔ `dark()` AND `mix()` TAKE HEX AND RETURN `rgb(...)`, SO THEY DO NOT NEST.
   `dark(dark(c, .2), .1)` runs `parseInt("gb(186,179,164)", 16)` -> NaN, and
   `NaN >> 16 & 255` is 0, so the result is a SILENT SOLID BLACK — not a crash,
   not a dropped style, black. It shipped as heavy black arches across the vault
   and one black band through the middle of the gauge shot, and it only happens
   when a surface is DIMMED, which is why the undimmed frames looked fine.
   These two are hex-in/hex-out and are what every derived colour below uses. */
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
export const BRASS = "#C8963E", BRASSD = "#8E6626", BRASSL = "#E8C57A";
export const IRON = "#4A5058", IROND = "#33383E", IRONL = "#6E757E";
export const WATER = "#7FB0C4", WATERD = "#4E7E93", WATERL = "#BEDCE6";
export const PLASTER = "#E8E0CE", STONE = "#9E9A90";

/* ---------------------------------------------------------------------------
   THE SEVEN PLACES. Neighbours in the cut differ by BOTH hue and lightness, so
   every cut is a move as well as a change of subject.

   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (docs/THE-OPEN.md law 1, ≥150/255).
      `pump` wins it from INSIDE the world: a lime-plaster barrel vault is the
      brightest thing a Victorian pumphouse actually contains, so no neutral
      card has to be imported to clear the bar.
   ------------------------------------------------------------------------ */
export const PLACES: Record<string, Place> = {
  /* --- S0/S6 · the pumphouse. BRIGHT, warm, the reel's home value --------- */
  /* ⛔ THE FLOOR IS WHAT COSTS YOU THE LUMA GATE. v1 measured 145.3 against the
     ≥150 bar with a plaster vault that was already at 232 — the lower 40% of
     the frame was a #6B6860 sweep dragging the mean down. Lifting the flags a
     stop (and only the flags) took frame 0 to 158 without touching the mood. */
  pump:  { back: "#E8E0CE", back2: "#C6BCA4", floor: "#B2ADA1", floor2: "#88857D",
           lip: "#C0BAAB", key: GOLD, horizon: 470, grit: "#98948A" },
  /* the CTA framing: same room, pushed a full stop brighter still */
  tap:   { back: "#F0E9D9", back2: "#D4CAB2", floor: "#ADA79A", floor2: "#7C776E",
           lip: "#BEB7A6", key: GOLD, horizon: 500, grit: "#98938A" },

  /* --- S1 · the reservoir yard. COLD, high-value water -------------------- */
  yard:  { back: "#5F6C80", back2: "#A9B3BC", floor: "#93A3AE", floor2: "#5A6772",
           lip: "#7C8894", key: GOLD, horizon: 430, grit: "#7E8A94" },

  /* --- S2 · the feeder row. AMBER, the deepest frame in the reel ---------- */
  row:   { back: "#453B30", back2: "#6E5C44", floor: "#847867", floor2: "#544C42",
           lip: "#8C7E66", key: GOLD, horizon: 480, grit: "#9A8A70" },

  /* --- S3 · the coin pump. COLD SLATE + one sour lamp. The villain's
     palette, and it is used NOWHERE else in the reel. -------------------- */
  kiosk: { back: "#3A4650", back2: "#28313A", floor: "#59636B", floor2: "#363F47",
           lip: "#4C575F", key: "#93A98C", horizon: 520, grit: "#6A737B" },

  /* --- S4 · the manifold hall. WARM, lit from both sides, the relief ------ */
  hall:  { back: "#4E4232", back2: "#332B20", floor: "#836F58", floor2: "#544839",
           lip: "#6E6046", key: "#EFD9A2", horizon: 450, grit: "#9C8768" },

  /* --- S5 · the selector, macro. STEEL, hard raking key ------------------- */
  gear:  { back: "#363C43", back2: "#22262B", floor: "#4E545B", floor2: "#2E3238",
           lip: "#424951", key: "#F0DDB0", horizon: 560, grit: "#5E656D" },
};

/* the variant palette rotation — colour only, horizon and key stay put because
   every prop is positioned against them. Two rings so an exterior never borrows
   an interior's mud and goes dark (reel 98 lost two opens to exactly that). */
const EXT = ["yard", "row", "kiosk"];
const INT = ["pump", "tap", "hall", "gear"];
/* ⛔ HEX IN, HEX OUT. A `Place` field is fed straight back into `dkh`/`mxh` by
   the surfaces below, so a rotation that emitted `rgb(...)` would turn every
   dimmed variant black — the same trap, one level further out. */
const LEVEL: Record<number, (c: string) => string> = {
  1: (c) => mxh(c, 0.10),
  2: (c) => mxh(c, 0.17),
  3: (c) => dkh(c, 0.11),
};
export const usePlace = (key: string): Place => {
  const p = React.useContext(PalCtx);
  const base = PLACES[key];
  if (!p) return base;
  const ring = EXT.includes(key) ? EXT : INT;
  const d = PLACES[ring[(ring.indexOf(key) + p) % ring.length]];
  const L = LEVEL[p];
  const c = L ? { ...d, back: L(d.back), back2: L(d.back2), floor: L(d.floor),
    floor2: L(d.floor2), lip: L(d.lip), grit: L(d.grit) } : d;
  return { ...c, key: base.key, horizon: base.horizon };
};

/* =========================================================================
   SURFACES
   ====================================================================== */

/** the pumphouse: a lime-plaster BARREL VAULT over a wet flagstone floor.
    Six depth planes before a single prop lands — vault, ribs, far arch, dado,
    floor, and the wet sheen band that says this room is damp. */
export const Vault: React.FC<{ p: Place; f: number; ribs?: number; arch?: boolean;
  dim?: number }> = ({ p, f, ribs = 5, arch = true, dim = 0 }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  return (<>
    {/* the vault itself — a wide ellipse of plaster, the brightest plane */}
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(176deg, ${D(p.back2)} 0%, ${D(p.back)} 34%, ${D(p.back)} 62%, ${D(dkh(p.back, 0.14))} 100%)` }} />
    <div style={{ position: "absolute", left: -180, top: -300, width: W + 360, height: 760,
      borderRadius: "50%", zIndex: 2,
      background: `linear-gradient(180deg, ${D(mxh(p.back, 0.30))} 0%, ${D(p.back)} 70%)` }} />
    {/* the ribs — plaster arches receding, each one darker and closer together */}
    {Array.from({ length: ribs }, (_, i) => {
      const k = i / (ribs - 1);
      const wRib = 940 - k * 430, hRib = 470 - k * 210;
      return (
        <div key={"rb" + i} style={{ position: "absolute", left: W / 2 - wRib / 2,
          top: 28 + k * 96, width: wRib, height: hRib, zIndex: 3 + i,
          borderRadius: `${wRib / 2}px ${wRib / 2}px 0 0`,
          border: `${13 - i * 2}px solid ${D(dkh(p.back, 0.09 + k * 0.16))}`,
          borderBottom: "none", boxSizing: "border-box" }} />
      );
    })}
    {/* the far arch: the dark hole the feeders come out of */}
    {arch && (<>
      <div style={{ position: "absolute", left: W / 2 - 172, top: hz - 292, width: 344, height: 330,
        borderRadius: "172px 172px 0 0", background: D(dkh(p.back2, 0.52)), zIndex: 9 }} />
      <div style={{ position: "absolute", left: W / 2 - 148, top: hz - 268, width: 296, height: 300,
        borderRadius: "148px 148px 0 0", background: D(dkh(p.back2, 0.72)), zIndex: 10 }} />
    </>)}
    {/* the dado band — a painted skirting, the line that makes the wall a wall */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 96, height: 96,
      background: D(dkh(p.back, 0.20)), zIndex: 11 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 100, height: 7,
      background: D(dkh(p.back, 0.34)), zIndex: 12 }} />
    {/* the floor */}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: 13,
      background: `linear-gradient(184deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 12, height: 14,
      background: D(p.lip), zIndex: 14 }} />
    {/* flagstone joints — the floor is CUT STONE, not a sweep */}
    {Array.from({ length: 5 }, (_, r) => (
      <div key={"fj" + r} style={{ position: "absolute", left: 0, right: 0,
        top: hz + 26 + r * r * 15 + r * 26, height: 3,
        background: D(dkh(p.floor2, 0.26)), opacity: 0.7, zIndex: 15 }} />
    ))}
    {Array.from({ length: 16 }, (_, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      const y = hz + 26 + r * r * 15 + r * 26;
      return <div key={"fv" + i} style={{ position: "absolute",
        left: 40 + c * 250 + (r % 2) * 125, top: y, width: 3,
        height: 26 + r * 16, background: D(dkh(p.floor2, 0.22)), opacity: 0.55, zIndex: 15 }} />;
    })}
    {/* the WET SHEEN — a solid lighter band on the flags under the lamp */}
    <div style={{ position: "absolute", left: W / 2 - 250, top: hz + 30, width: 500, height: 116,
      borderRadius: "50%", background: D(mxh(p.floor, 0.26)), opacity: 0.55, zIndex: 16 }} />
    {Array.from({ length: 20 }, (_, i) => (
      <div key={"fg" + i} style={{ position: "absolute", left: rnd(i, 11) * W,
        top: hz + 20 + rnd(i, 12) * (H - hz - 36), width: 4 + rnd(i, 13) * 7, height: 3,
        borderRadius: 2, background: D(p.grit), opacity: 0.34, zIndex: 17 }} />
    ))}
  </>);
};

/** the exterior: sky, a far lamp row, the reservoir surface, a stone kerb.
    `water` draws the reservoir as the ground plane (S1); otherwise the ground
    is wet yard stone (S2, S3). */
export const Outside: React.FC<{ p: Place; f: number; water?: boolean; lamps?: number;
  dim?: number }> = ({ p, f, water = false, lamps = 0, dim = 0 }) => {
  const hz = p.horizon;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  return (<>
    <div style={{ position: "absolute", inset: 0, zIndex: 1,
      background: `linear-gradient(178deg, ${D(p.back)} 0%, ${D(p.back2)} 100%)` }} />
    {/* a far bank: the silhouette that gives the sky a bottom */}
    <div style={{ position: "absolute", left: -40, top: hz - 74, width: W + 80, height: 82,
      zIndex: 4, background: D(dkh(p.back2, 0.38)),
      clipPath: "polygon(0% 62%, 9% 44%, 17% 52%, 26% 30%, 34% 42%, 44% 26%, 53% 40%, 62% 22%, 71% 38%, 80% 30%, 89% 44%, 100% 34%, 100% 100%, 0% 100%)" }} />
    {/* the lamp row on the far bank */}
    {Array.from({ length: lamps }, (_, i) => {
      const x = 88 + i * ((W - 176) / Math.max(1, lamps - 1));
      return (<React.Fragment key={"lr" + i}>
        <div style={{ position: "absolute", left: x - 2, top: hz - 96, width: 4, height: 40,
          background: D(dkh(p.back2, 0.52)), zIndex: 5 }} />
        <div style={{ position: "absolute", left: x - 8, top: hz - 104, width: 16, height: 13,
          borderRadius: 4, background: D(mxh(p.key, 0.20)), zIndex: 6 }} />
      </React.Fragment>);
    })}
    <div style={{ position: "absolute", left: 0, right: 0, top: hz, bottom: 0, zIndex: 12,
      background: `linear-gradient(184deg, ${D(p.floor)} 0%, ${D(p.floor2)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: hz - 9, height: 11,
      background: D(p.lip), zIndex: 13 }} />
    {water ? (<>
      {/* the reservoir: horizontal chop bands, denser and lighter toward camera */}
      {Array.from({ length: 15 }, (_, i) => {
        const y = hz + 12 + i * i * 1.9 + i * 11;
        if (y > H) return null;
        return <div key={"wv" + i} style={{ position: "absolute",
          left: -60 + Math.sin(f / 38 + i * 1.4) * 26, top: y,
          width: W + 120, height: 3 + i * 0.5, borderRadius: 3,
          background: D(mxh(p.floor, 0.20 + i * 0.026)), opacity: 0.68, zIndex: 14 }} />;
      })}
      {/* the reflected lamp: a broken vertical column of solid dashes */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={"rf" + i} style={{ position: "absolute",
          left: W / 2 - 26 + Math.sin(f / 26 + i) * 13, top: hz + 18 + i * 30,
          width: 52 + i * 9, height: 7 + i, borderRadius: 5,
          background: D(mxh(p.key, 0.36)), opacity: 0.5 - i * 0.03, zIndex: 15 }} />
      ))}
    </>) : (<>
      {Array.from({ length: 22 }, (_, i) => (
        <div key={"og" + i} style={{ position: "absolute", left: rnd(i, 31) * W,
          top: hz + 18 + rnd(i, 32) * (H - hz - 32), width: 5 + rnd(i, 33) * 9, height: 3,
          borderRadius: 2, background: D(p.grit), opacity: 0.32, zIndex: 14 }} />
      ))}
    </>)}
  </>);
};

/** rain. Solid slanted strokes, never a wash — the villain scene's texture. */
export const Rain: React.FC<{ f: number; n?: number; z?: number; c?: string }> =
  ({ f, n = 40, z = 88, c = "#B6C6CE" }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const sp = 13 + rnd(i, 41) * 9;
      const y = (rnd(i, 42) * H + f * sp) % (H + 120) - 60;
      return <div key={"rn" + i} style={{ position: "absolute",
        left: rnd(i, 43) * (W + 120) - 60 - y * 0.16, top: y,
        width: 2, height: 22 + rnd(i, 44) * 16, background: c,
        opacity: 0.34, zIndex: z, transform: "rotate(9deg)" }} />;
    })}
  </>);

/** the puddle a rain scene stands in — solid, with two ripple rings. */
export const Puddle: React.FC<{ x: number; y: number; w?: number; f: number; c?: string;
  z?: number }> = ({ x, y, w: ww = 300, f, c = "#6E7C86", z = 18 }) => (<>
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: ww * 0.19,
    borderRadius: "50%", background: c, zIndex: z }} />
  {[0, 1].map((i) => {
    const ph = ((f / 34) + i * 0.5) % 1;
    const s = 0.2 + ph * 0.8;
    return <div key={"pr" + i} style={{ position: "absolute",
      left: x - (ww * 0.4 * s) / 2, top: y + ww * 0.095 - (ww * 0.077 * s) / 2,
      width: ww * 0.4 * s, height: ww * 0.077 * s, borderRadius: "50%",
      border: `2px solid ${mix(c, 0.34)}`, opacity: (1 - ph) * 0.6, zIndex: z + 1,
      boxSizing: "border-box" }} />;
  })}
</>);

/* =========================================================================
   WATER — the substance the whole reel is about. Everything here is SOLID
   paint: a body, a lighter crest, and discrete droplets. No gradients to
   transparent, no blur, no glow.
   ====================================================================== */

/** a falling stream from a spout. `t` 0..1 is how far it has charged. */
export const Stream: React.FC<{ x: number; y: number; len: number; w?: number; t?: number;
  f?: number; z?: number; c?: string }> =
  ({ x, y, len, w: ww = 16, t = 1, f = 0, z = 60, c = WATER }) => {
  if (t <= 0.01) return null;
  const L = len * Math.min(1, t);
  return (<>
    <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, height: L,
      background: c, zIndex: z, borderRadius: ww / 2 }} />
    <div style={{ position: "absolute", left: x - ww / 2 + 2, top: y, width: ww * 0.30, height: L,
      background: WATERL, opacity: 0.8, zIndex: z + 1, borderRadius: ww / 2 }} />
    {/* the twist: three offset segments so the fall is not a rectangle */}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={"st" + i} style={{ position: "absolute",
        left: x - ww / 2 + Math.sin(f / 4 + i * 1.7) * 3, top: y + (i + 0.4) * (L / 4.4),
        width: ww, height: 5, borderRadius: 3, background: WATERL, opacity: 0.42, zIndex: z + 2 }} />
    ))}
  </>);
};

/** a splash crown where a stream lands. */
export const Splash: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  on?: number }> = ({ x, y, f, s = 1, z = 62, on = 1 }) => {
  if (on <= 0.01) return null;
  return (<>
    <div style={{ position: "absolute", left: x - 46 * s, top: y - 6 * s, width: 92 * s,
      height: 17 * s, borderRadius: "50%", background: WATERL, opacity: 0.66 * on, zIndex: z }} />
    {Array.from({ length: 7 }, (_, i) => {
      const ph = ((f / 9) + i * 0.28) % 1;
      const a = -0.35 + i * 0.13;
      return <div key={"sp" + i} style={{ position: "absolute",
        left: x + Math.sin(a * 3.1) * (16 + ph * 46) * s - 3 * s,
        top: y - ph * 34 * s + ph * ph * 40 * s,
        width: 7 * s, height: 7 * s, borderRadius: 5 * s, background: WATERL,
        opacity: (1 - ph) * 0.85 * on, zIndex: z + 1 }} />;
    })}
  </>);
};

/** a single hanging drip — the "nothing is happening yet" tell in frame 0. */
export const Drip: React.FC<{ x: number; y: number; f: number; period?: number; fall?: number;
  z?: number }> = ({ x, y, f, period = 52, fall = 120, z = 60 }) => {
  const ph = (f % period) / period;
  const g = ph * ph;
  return (<>
    <div style={{ position: "absolute", left: x - 5, top: y + g * fall, width: 10,
      height: 13 + g * 7, borderRadius: "50% 50% 46% 46%", background: WATERL,
      opacity: 0.95, zIndex: z }} />
    {ph > 0.9 && <div style={{ position: "absolute", left: x - 17, top: y + fall + 3,
      width: 34, height: 7, borderRadius: "50%", background: WATERL,
      opacity: (ph - 0.9) * 8, zIndex: z }} />}
  </>);
};

/* =========================================================================
   ⛔⛔ THE MARK IS AN AUDIENCE FILTER, NOT BRANDING (reel 95, round 3).
   FIVE marks land inside the first three seconds, and every scene after
   carries at least one. In THIS world the Claude mark belongs on the OUTLET —
   Claude Code is a documented CLIENT of this repo (`/v1/messages`), so the
   thing being FILLED is the honest place for it.
   ⛔ THE MARK NEVER COVERS THE MASCOT'S FACE — the body rect IS the face.
   ====================================================================== */

/** the real provider marks, on an enamel disc. Downloaded simple-icons SVGs,
    UNFILTERED (reel 86: the house darken filter turns any coloured mark into a
    black square). Providers with no public mark get `Stencil` instead — this
    reel never invents a logo. */
export const PROVIDERS = [
  { k: "googlegemini", n: "GOOGLE",     mark: true },
  { k: "groq",         n: "GROQ",       mark: false },
  { k: "cerebras",     n: "CEREBRAS",   mark: false },
  { k: "mistralai",    n: "MISTRAL",    mark: true },
  { k: "cloudflare",   n: "CLOUDFLARE", mark: true },
  { k: "cohere",       n: "COHERE",     mark: false },
  { k: "nvidia",       n: "NVIDIA",     mark: true },
  { k: "huggingface",  n: "HUGGINGFACE", mark: true },
  { k: "openrouter",   n: "OPENROUTER", mark: true },
  { k: "zai",          n: "Z.AI",       mark: false },
] as const;

/** an enamel disc carrying a real brand mark, on a light plate so the mark can
    be itself. */
export const Disc: React.FC<{ k: string; x: number; y: number; s?: number; z?: number }> =
  ({ k, x, y, s = 54, z = 80 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
    borderRadius: "50%", background: "#FBF8F1", border: `${Math.max(2, s * 0.055)}px solid #D9CFB6`,
    boxShadow: SH, zIndex: z, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile(`logos/${k}.svg`)}
      style={{ width: s * 0.60, height: s * 0.60, objectFit: "contain" }} />
  </div>
);

/** a cast stencil nameplate — what a provider with no public mark gets. */
export const Stencil: React.FC<{ t: string; x: number; y: number; s?: number; z?: number;
  c?: string; fg?: string }> =
  ({ t, x, y, s = 1, z = 80, c = "#B9AE93", fg = "#2A2418" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${5 * s}px ${11 * s}px`, borderRadius: 3 * s, background: c,
    border: `${2 * s}px solid ${dark(c, 0.26)}`, boxShadow: SH,
    fontFamily: MONO, fontWeight: 800, fontSize: 17 * s, letterSpacing: "0.13em",
    color: fg, whiteSpace: "nowrap" }}>{t}</div>
);

/** the repo's own receipt, cast into iron the way a Victorian foundry plate is.
    ⛔ EVERY VALUE HERE IS REAL, pulled from the GitHub API on 2026-08-11. */
export const MakerPlate: React.FC<{ x: number; y: number; s?: number; z?: number;
  stars?: string }> = ({ x, y, s = 1, z = 84, stars = "18,265" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${13 * s}px ${20 * s}px`, borderRadius: 7 * s,
    background: "#C4BA9E", border: `${4 * s}px solid #8E866E`, boxShadow: SH_D }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 * s }}>
      <Img src={staticFile("logos/github.svg")}
        style={{ width: 30 * s, height: 30 * s, objectFit: "contain" }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 31 * s,
        letterSpacing: "-0.01em", color: "#241F14" }}>freellmapi</span>
    </div>
    <div style={{ marginTop: 5 * s, fontFamily: MONO, fontWeight: 800, fontSize: 20 * s,
      letterSpacing: "0.10em", color: "#4A4230" }}>★ {stars}  ·  MIT</div>
  </div>
);
