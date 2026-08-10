import React from "react";
import { Easing } from "remotion";
import { inter, fraunces } from "./fonts";
import { Img, staticFile } from "remotion";
import { MONO, Mascot } from "./SlopKit";

/* =========================================================================
   REEL 94 "AGENCY" · THE NIGHT-CITY KIT.

   Board: storyboards/94-agency.md.

   WHY A NIGHT CITY, measured rather than chosen:
     · Reel 84 proved HIERARCHY NEEDS DARKNESS — a cream room ranks nothing
       (top-decile/mean 1.24); a dark room with one lit thing ranks at 2.92.
       A night city is a machine for ranking: whatever is lit is the subject
       and everything else is a silhouette that costs nothing to draw.
     · REEL-BUILD-LEARNINGS §3: the default body scene is EXTERIOR, and
       INTERIORS ALL COUNT AS ONE PLACE. Nine exteriors here, nine palettes.
     · Reel 93 §V2: build ONE parameterised `Surface`, not N backdrops.

   ⛔ MATTE, NOT NEON. [[feedback_reel_matte_palette]] is the single most
      re-flagged rule in this repo and "night city" is exactly the prompt that
      lands you in neon-on-black. So:
        · every window is a SOLID warm rectangle, never an emissive dot
        · there is not one `boxShadow: 0 0 Npx <colour>` in this reel
        · depth is dark drop-shadow + inset highlight, never bloom
        · skies are painted blues and dusk violets, never #000
      The self-check is at the bottom of ClaudeAgencyReel.tsx and is run before
      every render.
   ========================================================================= */

export const W = 1012, H = 792;
/** the Panel's real safe area once the header and rail are accounted for */
export const SAFE = { x0: 46, x1: 974, y0: 56, y1: 690 } as const;

export const INK = "#1A1813";
export const SH = "0 10px 22px rgba(20,18,14,0.34)";
export const SH_D = "0 24px 46px rgba(10,12,20,0.46)";
export const SH_IN = "inset 0 -5px 0 rgba(20,18,14,0.16)";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic);
export const BACK = Easing.out(Easing.back(1.7)), IN_Q = Easing.in(Easing.quad);
export const LIN = Easing.linear;
/** interpolate with clamped ends — the house shorthand */
export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) => {
  if (b <= a) return f >= b ? vb : va;
  const t = Math.max(0, Math.min(1, (f - a) / (b - a)));
  return va + (vb - va) * ez(t);
};

/* ⛔ THE VARIANT CAMERA. [[feedback_trial_reel_variants]], measured on reels
   83/84: scaling the WHOLE composition also scales the cream background, moves
   the Panel off its fixed chassis position, and wrecks the motion audit by
   changing how much static background is in frame (one scene scored 8.12 at
   scale 1.0 and 3.72 at 1.038 with identical content). So the offset is applied
   to the panel CONTENTS through this context, and the bg, rail and panel rect
   stay byte-identical across cuts while the picture differs.
   Removing the camera is not the alternative either — ROLES' body delta
   collapsed 24.9 -> 5.4 without it, i.e. ~85% of the reel went near-identical. */
export type Cam = { dx: number; dy: number; s: number; rot: number };
export const CamCtx = React.createContext<Cam>({ dx: 0, dy: 0, s: 1, rot: 0 });
/** a per-SCENE offset derived from the variant seed, so it is not one flat shift
    across the whole reel — a constant translate is one number for a hash to
    cancel, a varying one is not. */
export const camFor = (seed: number, i: number): Cam => {
  const r = (k: number) => { const v = Math.sin(seed * 37.1 + i * 19.7 + k * 11.3) * 4371.7; return v - Math.floor(v); };
  return seed === 0
    ? { dx: 0, dy: 0, s: 1, rot: 0 }
    : { dx: Math.round((r(1) - 0.5) * 46), dy: Math.round((r(2) - 0.5) * 34),
        s: 1 + r(3) * 0.055, rot: (r(4) - 0.5) * 1.1 };
};

/* ⛔ THE BODY IS WHERE A VARIANT GOES WEAK, AND THE DOC NAMES THE FIX.
   [[feedback_trial_reel_variants]]: *"if the scenes are shared, the middle is
   weak; the next lever is swapping which WORLD each scene uses."* Measured on
   the first four cuts: hooks diverged 48.6-63.9 (target 30) but the body only
   14.3-17.0 (target 20), because the nine body scenes were pixel-identical
   apart from the camera offset.

   So each variant ROTATES the palette: scene N borrows a different world's
   colours. ⚠️ It borrows COLOUR ONLY — horizon and glow geometry stay with the
   original scene, because those are what its props are positioned against and a
   moved ground line would put the kerb through a shopfront. */
export const PalCtx = React.createContext(0);
const WORLD_KEYS_LEN = 14;   // 12 body places + lobby + corner
/* ⛔⛔ A ROTATION ALONE LEAVES PAIRS SHORT. With four cuts it held (body 21-25);
   at six, three pairs came in at 18.1-19.9 against a target of 20, because two
   rotations can land on donors of similar LUMA and the metric is mean |luma
   delta|. Reel 95 proved the fix and also proved what does NOT work: a hue tint
   COMPRESSES the range and makes divergence worse. A LEVEL shift is the lever.
   ⚠️ Only the new palettes carry one — 1..3 are already delivered and passing,
   and changing them would invalidate cuts that are on the Drive. */
const LEVEL: Record<number, (c: string) => string> = {
  4: (c) => dark(c, 0.28),
  5: (c) => mix(c, 0.24),
};
export const useWorld = (key: string): World => {
  const p = React.useContext(PalCtx);
  const base = WORLDS[key];
  if (!p) return base;
  const keys = Object.keys(WORLDS);
  const OFFS: Record<number, number> = { 1: 5, 2: 10, 3: 1, 4: 8, 5: 11 };
  const d = WORLDS[keys[(keys.indexOf(key) + (OFFS[p] ?? p * 5)) % WORLD_KEYS_LEN]];
  const L = LEVEL[p];
  const donor = L ? { ...d, sky: L(d.sky), sky2: L(d.sky2), b1: L(d.b1), b2: L(d.b2),
    b3: L(d.b3), ground: L(d.ground), ground2: L(d.ground2), lip: L(d.lip),
    grit: L(d.grit), win: d.win, glow: d.glow, key: d.key } : d;
  return { ...donor, horizon: base.horizon, glowX: base.glowX, glowY: base.glowY,
           glowR: base.glowR };
};

export const hexa = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
/** ⛔ tint by MIXING TOWARD PAPER and emitting a SOLID value — never by dropping
    opacity. §1 of REEL-BUILD-LEARNINGS. */
export const mix = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v + (247 - v) * k);
  return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
};
/** mix toward BLACK, for painting a shadowed face of the same material */
export const dark = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const m = (v: number) => Math.round(v * (1 - k));
  return `rgb(${m((n >> 16) & 255)},${m((n >> 8) & 255)},${m(n & 255)})`;
};

/* ---------------------------------------------------------------------------
   THE NINE PLACES. If two scenes cannot be told apart by light and palette
   alone, the viewer has not been to two places. Neighbours in the cut differ by
   both hue and lightness.
   ------------------------------------------------------------------------ */
export type World = {
  sky: string; sky2: string;               // the vault, top to horizon
  glow: string; glowX: number; glowY: number; glowR: number;  // moon / sodium haze / sun
  b1: string; b2: string; b3: string;      // three parallax building bands, far -> near
  win: string;                             // the lit-window paint for the far bands
  ground: string; ground2: string; lip: string;
  grit: string; horizon: number;
  key: string;                             // this place's practical-light colour
};

export const WORLDS: Record<string, World> = {
  /* S0 · a wet industrial kerb under one sodium lamp. Warm dirty orange on
     cold slate — the only place in the reel lit by a single source. */
  kerb: { sky: "#3A3346", sky2: "#241F2E", glow: "#E0925A", glowX: 176, glowY: 108, glowR: 150,
    b1: "#2E2B3C", b2: "#25222F", b3: "#1B1924", win: "#C99C63",
    ground: "#33323E", ground2: "#232230", lip: "#565467", grit: "#8E8AA0", horizon: 486, key: "#E0925A" },

  /* S1 · the building's own front. Deep navy street, gold marquee. */
  forefront: { sky: "#2B3A5C", sky2: "#1A2440", glow: "#F2E2B0", glowX: 806, glowY: 128, glowR: 84,
    b1: "#33436A", b2: "#293656", b3: "#1E2942", win: "#E7B24C",
    ground: "#2A3350", ground2: "#1B2238", lip: "#4B5C86", grit: "#93A4CE", horizon: 604, key: "#E7B24C" },

  /* S2 · across a flooded plaza. Teal, wide, reflective. The coldest frame. */
  plaza: { sky: "#1E3D4E", sky2: "#132833", glow: "#CBEAE4", glowX: 168, glowY: 132, glowR: 70,
    b1: "#245063", b2: "#1B3E4E", b3: "#142E3B", win: "#EFCF8C",
    ground: "#16323F", ground2: "#0E222C", lip: "#2E6274", grit: "#7FC0C9", horizon: 500, key: "#7FC0C9" },

  /* S3 · Agency Row. A neutral plum street the three shopfront zones tint. */
  row: { sky: "#42314C", sky2: "#291E32", glow: "#E9C6A2", glowX: 506, glowY: 96, glowR: 106,
    b1: "#3B2E48", b2: "#31263C", b3: "#261D2E", win: "#E5B876",
    ground: "#332B3C", ground2: "#221C29", lip: "#5B4E68", grit: "#9C8CAC", horizon: 512, key: "#C88FA8" },

  /* S4 · the back lot. Tungsten on gravel — the warmest body scene. */
  backlot: { sky: "#3B3524", sky2: "#241F14", glow: "#F0C979", glowX: 866, glowY: 118, glowR: 96,
    b1: "#3A3222", b2: "#2F281B", b3: "#241E14", win: "#F0C979",
    ground: "#4A3E28", ground2: "#31281A", lip: "#6E5C3A", grit: "#C4A874", horizon: 470, key: "#F0C979" },

  /* S5 · the kerbstone, camera on the pavement. Green screen-wash on wet slate. */
  kerbside: { sky: "#22303A", sky2: "#141D25", glow: "#9FD9BC", glowX: 300, glowY: 104, glowR: 62,
    b1: "#283945", b2: "#1F2D37", b3: "#17222A", win: "#DCC287",
    ground: "#2A3740", ground2: "#1A242B", lip: "#46606C", grit: "#8FB6AE", horizon: 452, key: "#5FAE86" },

  /* S6 · your street. Cold sky, one warm house — two sources fighting. */
  suburb: { sky: "#25355A", sky2: "#16203A", glow: "#EFE7C6", glowX: 128, glowY: 96, glowR: 72,
    b1: "#2C3D62", b2: "#22314F", b3: "#1A263E", win: "#EFC978",
    ground: "#2F3A46", ground2: "#1F262F", lip: "#54636F", grit: "#93A2B4", horizon: 546, key: "#EFC978" },

  /* S7 · the roof at first light. The reel's only warm sky, and its brightest. */
  dawnroof: { sky: "#F2B77C", sky2: "#C4707A", glow: "#FFF0CE", glowX: 726, glowY: 236, glowR: 158,
    b1: "#8E5A72", b2: "#6B4460", b3: "#4C324B", win: "#FFE2A8",
    ground: "#5A4258", ground2: "#3C2C3E", lip: "#8B6478", grit: "#E2B79E", horizon: 560, key: "#F2B77C" },

  /* ---- VARIANT-ONLY PLACES. Each alternate open gets its own palette so a
     perceptual hash has nothing to latch onto across the cuts. ---- */
  /* B · a casting street: warm amber lamps down a long kerb */
  casting: { sky: "#3E3222", sky2: "#241C12", glow: "#F0C87E", glowX: 214, glowY: 118, glowR: 132,
    b1: "#3A2F20", b2: "#2E2519", b3: "#231B12", win: "#EFC978",
    ground: "#3E3324", ground2: "#251E14", lip: "#6B5738", grit: "#C9A874", horizon: 512, key: "#F0C87E" },
  /* C · a coach depot: cold steel blue, the only place lit from a vehicle */
  depot: { sky: "#28394E", sky2: "#141C28", glow: "#DCE8F2", glowX: 862, glowY: 108, glowR: 76,
    b1: "#2E4159", b2: "#243347", b3: "#1A2634", win: "#E9D6A6",
    ground: "#26313E", ground2: "#161D26", lip: "#465B72", grit: "#9DB4C8", horizon: 620, key: "#DCE8F2" },
  /* D · a vacant lot behind a brick wall: the warmest and the emptiest */
  lot: { sky: "#4A3B26", sky2: "#2A2116", glow: "#F0C979", glowX: 128, glowY: 92, glowR: 118,
    b1: "#453722", b2: "#382C1B", b3: "#2A2114", win: "#EBC178",
    ground: "#3A3021", ground2: "#231C12", lip: "#6E5A38", grit: "#C4A874", horizon: 596, key: "#F0C979" },

  /* E · a brass lift lobby. Warm metal on charcoal — the only interior. */
  lobby: { sky: "#3E3A46", sky2: "#211E28", glow: "#F2C463", glowX: 506, glowY: 96, glowR: 90,
    b1: "#454150", b2: "#383442", b3: "#2A2732", win: "#E5C07A",
    ground: "#4A4654", ground2: "#28242E", lip: "#6E6878", grit: "#A79FB4", horizon: 636, key: "#F2C463" },
  /* F · a street corner at night. Deep violet, one warm lamp. */
  corner: { sky: "#38294A", sky2: "#1E1530", glow: "#E9C6A2", glowX: 210, glowY: 112, glowR: 118,
    b1: "#3A2C4A", b2: "#2E233C", b3: "#241A2E", win: "#E5B876",
    ground: "#332942", ground2: "#1F1830", lip: "#5E4E74", grit: "#A292BA", horizon: 596, key: "#E9C6A2" },

  /* S8 · the forecourt, twenty minutes later. Cool blue dawn, one warm doorway. */
  forecourt: { sky: "#8FA8C4", sky2: "#5A718F", glow: "#FFF4D8", glowX: 506, glowY: 178, glowR: 140,
    b1: "#5E7591", b2: "#4A5F79", b3: "#3A4C63", win: "#F0CE8A",
    ground: "#4E5A6B", ground2: "#36404E", lip: "#7B8A9C", grit: "#BCC7D4", horizon: 556, key: "#E7B24C" },
};

/* ---------------------------------------------------------------------------
   THE SURFACE — sky, haze, three parallax BUILDING bands with lit windows,
   street, kerb lip, grit, overhead furniture. ~24 objects before a prop lands,
   which is most of the way to the 12-18 median the learnings doc asks for.
   ------------------------------------------------------------------------ */

/** one parallax band of building slabs, each with its own tiny lit windows.
    ⛔ DETAIL WITHOUT LOSING THE RANK: these are SMALL, LOW-CONTRAST (painted in
    the band colour they stand on) and at the HORIZON, never the optical centre.
    That is what lets the object count climb while the frame keeps a first place. */
const Band: React.FC<{ c: string; win: string; y: number; n: number; seed: number;
  dx: number; z: number; lit: number; hMin: number; hMax: number }> =
  ({ c, win, y, n, seed, dx, z, lit, hMin, hMax }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: z }}>
    {Array.from({ length: n }, (_, i) => {
      const r = (k: number) => { const v = Math.sin(i * 41.3 + seed * 7.1 + k * 13.7) * 4371.7; return v - Math.floor(v); };
      const w = 62 + Math.round(r(1) * 78);
      const h = hMin + Math.round(r(2) * (hMax - hMin));
      const x = -160 + i * (1360 / n) + Math.round(r(3) * 26) + dx;
      const cols = Math.max(2, Math.floor(w / 26));
      const rows = Math.max(3, Math.floor(h / 34));
      return (
        <div key={i} style={{ position: "absolute", left: x, top: y - h, width: w, height: h + 40,
          background: c }}>
          {/* a parapet lip so the silhouette is built, not extruded */}
          <div style={{ position: "absolute", left: -5, top: 0, width: w + 10, height: 7,
            background: dark(c, 0.22) }} />
          {Array.from({ length: cols * rows }, (_, k) => {
            const q = (Math.sin(i * 17.3 + k * 29.1 + seed) * 4371.7);
            const on = (q - Math.floor(q)) < lit;
            if (!on) return null;
            return (
              <div key={k} style={{ position: "absolute",
                left: 7 + (k % cols) * ((w - 14) / cols), top: 18 + Math.floor(k / cols) * 30,
                width: Math.max(5, (w - 14) / cols - 7), height: 12, background: win }} />
            );
          })}
        </div>
      );
    })}
  </div>
);

/** the star field — solid dots, no bloom, three sizes so it has texture. */
const Stars: React.FC<{ w: World; n?: number }> = ({ w, n = 34 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 53.7 + k * 19.3) * 4371.7; return v - Math.floor(v); };
    const s = 2 + Math.round(r(2) * 2);
    return (
      <div key={i} style={{ position: "absolute", left: Math.round(r(1) * 1000),
        top: 14 + Math.round(r(3) * 250), width: s, height: s, borderRadius: s,
        background: mix(w.grit, 0.45), zIndex: 5 }} />
    );
  })}
</>);

/** street dressing: lane dashes converging to the vanishing point, kerb seams,
    and two parallax scatter ranks. This is what makes the road a road. */
const Street: React.FC<{ w: World; t: number }> = ({ w, t }) => (<>
  {/* kerb seams */}
  {[0, 1, 2, 3, 4].map((r) => (
    <div key={"s" + r} style={{ position: "absolute", left: 0, right: 0,
      top: w.horizon + 22 + r * (34 + r * 13), height: 2,
      background: dark(w.ground, 0.28), zIndex: 16 }} />
  ))}
  {/* lane dashes, perspective-scaled, drifting toward camera */}
  {Array.from({ length: 6 }, (_, i) => {
    const p = ((i * 0.17 + t * 0.0042) % 1);
    const yy = w.horizon + 18 + p * p * (H - w.horizon);
    return (
      <div key={"l" + i} style={{ position: "absolute", left: 506 - (26 + p * 66) / 2, top: yy,
        width: 26 + p * 66, height: 4 + p * 12, borderRadius: 3,
        background: mix(w.lip, 0.30), zIndex: 17, opacity: 0.9 }} />
    );
  })}
  {/* far scatter: bollards and boxes on the pavement line */}
  {Array.from({ length: 10 }, (_, i) => (
    <div key={"f" + i} style={{ position: "absolute",
      left: ((i * 143 + 30 - t * 0.30) % 1220) - 90, top: w.horizon - 16,
      width: 9, height: 22, borderRadius: "4px 4px 0 0", background: dark(w.b3, 0.20), zIndex: 18 }} />
  ))}
  {/* ⛔ THE BOTTOM OCCLUDER. The first pass put seven loose rounded rects along
      the bottom edge and they read as glitches, not as foreground. A continuous
      PAVEMENT EDGE with a lit lip is the same depth cue and cannot look like
      debris — and the shaped silhouettes now stand ON it instead of floating. */}
  <div style={{ position: "absolute", left: -20, right: -20, top: H - 54, height: 70,
    background: dark(w.ground2, 0.52), zIndex: 84 }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: H - 58, height: 5,
    background: mix(w.lip, 0.10), zIndex: 85 }} />
  {Array.from({ length: 6 }, (_, i) => {
    const x = ((i * 197 + 40 - t * 0.72) % 1320) - 130;
    const kind = i % 3;
    return (
      <div key={"n" + i} style={{ position: "absolute", left: x, top: H - 54, zIndex: 85 }}>
        {kind === 0 && (<>{/* a bin */}
          <div style={{ position: "absolute", left: 0, top: -52, width: 62, height: 54,
            borderRadius: "6px 6px 3px 3px", background: dark(w.ground2, 0.62) }} />
          <div style={{ position: "absolute", left: -6, top: -60, width: 74, height: 11,
            borderRadius: 4, background: dark(w.ground2, 0.48) }} />
        </>)}
        {kind === 1 && (<>{/* a stack of crates */}
          <div style={{ position: "absolute", left: 0, top: -44, width: 86, height: 46,
            background: dark(w.ground2, 0.62) }} />
          <div style={{ position: "absolute", left: 12, top: -74, width: 60, height: 32,
            background: dark(w.ground2, 0.56) }} />
        </>)}
        {kind === 2 && (<>{/* a hydrant */}
          <div style={{ position: "absolute", left: 6, top: -46, width: 26, height: 48,
            borderRadius: "13px 13px 3px 3px", background: dark(w.ground2, 0.62) }} />
          <div style={{ position: "absolute", left: -6, top: -34, width: 50, height: 10,
            borderRadius: 5, background: dark(w.ground2, 0.62) }} />
        </>)}
      </div>
    );
  })}
</>);

/** ⛔ something cropped by the TOP edge — the cheapest depth in the repo, and the
    difference between a camera standing in a place and one pointed at a backdrop.
    Here: a span wire with three hanging lamps that swing, plus two cable runs. */
const Overhead: React.FC<{ w: World; t: number; on?: boolean }> = ({ w, t, on = true }) => (<>
  <div style={{ position: "absolute", left: -40, right: -40, top: 26, height: 5,
    background: dark(w.b3, 0.36), zIndex: 88,
    transform: `rotate(${-1.4 + Math.sin(t / 61) * 0.22}deg)` }} />
  {[188, 506, 824].map((x, i) => {
    const sway = Math.sin(t / 44 + i * 1.7) * 1.9;
    return (
      <div key={x} style={{ position: "absolute", left: x, top: 26, zIndex: 89,
        transform: `rotate(${sway}deg)`, transformOrigin: "50% 0%" }}>
        <div style={{ position: "absolute", left: -2, top: 0, width: 4, height: 42,
          background: dark(w.b3, 0.42) }} />
        <div style={{ position: "absolute", left: -26, top: 42, width: 52, height: 22,
          borderRadius: "0 0 26px 26px", background: dark(w.b3, 0.30) }} />
        {on && <div style={{ position: "absolute", left: -13, top: 58, width: 26, height: 9,
          borderRadius: 5, background: w.key }} />}
      </div>
    );
  })}
  <div style={{ position: "absolute", right: 118, top: -24, width: 5, height: 104,
    background: dark(w.b3, 0.34), zIndex: 88 }} />
  <div style={{ position: "absolute", right: 92, top: -24, width: 5, height: 78,
    background: dark(w.b3, 0.34), zIndex: 88 }} />
</>);

/** the whole vault + street. `t` drives the parallax so the world never flatlines. */
export const Surface: React.FC<{ w: World; t?: number; stars?: boolean; overhead?: boolean;
  lampsOn?: boolean; litFar?: number }> =
  ({ w, t = 0, stars = true, overhead = true, lampsOn = true, litFar = 0.34 }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${w.sky} 0%, ${w.sky2} 100%)`, zIndex: 1 }} />
  {/* the haze — a moon, a sodium bloom or the sun, always a SOLID disc plus one
      soft ring, never an emissive blur */}
  <div style={{ position: "absolute", left: w.glowX - w.glowR * 1.5, top: w.glowY - w.glowR * 1.5,
    width: w.glowR * 3, height: w.glowR * 3, borderRadius: "50%",
    background: `radial-gradient(circle, ${hexa(w.glow, 0.30)} 0%, ${hexa(w.glow, 0.10)} 42%, ${hexa(w.glow, 0)} 68%)`,
    zIndex: 3 }} />
  <div style={{ position: "absolute", left: w.glowX - w.glowR * 0.42, top: w.glowY - w.glowR * 0.42,
    width: w.glowR * 0.84, height: w.glowR * 0.84, borderRadius: "50%",
    background: w.glow, zIndex: 4 }} />
  {stars && <Stars w={w} />}
  <Band c={w.b1} win={mix(w.win, 0.34)} y={w.horizon - 176} n={9} seed={3} dx={t * 0.09} z={8}
    lit={litFar * 0.62} hMin={130} hMax={300} />
  <Band c={w.b2} win={mix(w.win, 0.18)} y={w.horizon - 92} n={7} seed={11} dx={t * 0.20} z={10}
    lit={litFar * 0.85} hMin={110} hMax={250} />
  <Band c={w.b3} win={w.win} y={w.horizon - 6} n={6} seed={23} dx={t * 0.38} z={12}
    lit={litFar} hMin={90} hMax={190} />
  {/* the street */}
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon, bottom: 0,
    background: `linear-gradient(184deg, ${w.ground} 0%, ${w.ground2} 100%)`, zIndex: 14 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon - 8, height: 10,
    background: w.lip, zIndex: 15 }} />
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 40 - t * 0.66) % 1140) - 60,
      top: w.horizon + 24 + ((i * 47) % 11) * 24,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: w.grit,
      opacity: 0.44, zIndex: 16 }} />
  ))}
  <Street w={w} t={t} />
  {overhead && <Overhead w={w} t={t} on={lampsOn} />}
</>);

/** ⛔ THE FRAME-EDGE OCCLUDER. A mass cropped by the panel border, IN FRONT of
    the action. Without it the camera is pointed at a backdrop. */
export const Occluder: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "wall" | "pole" | "hedge" }> =
  ({ side = "l", c, w: ww = 132, z = 92, kind = "wall" }) => {
  if (kind === "pole") return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: 34, zIndex: z,
      [side === "l" ? "left" : "right"]: 44, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 8,
        background: mix(c, 0.20) }} />
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 66 + i * 118, left: -6, width: 46,
          height: 10, background: dark(c, 0.28) }} />
      ))}
    </div>
  );
  return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: ww, zIndex: z,
      [side === "l" ? "left" : "right"]: -26, background: c,
      borderRadius: side === "l" ? "0 46px 74px 0" : "46px 0 0 74px", boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0,
        [side === "l" ? "right" : "left"]: 0, width: 7, background: mix(c, 0.26) }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 54 + i * 100,
          [side === "l" ? "right" : "left"]: 24, width: 14, height: 14, borderRadius: "50%",
          background: mix(c, 0.34) }} />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   PRACTICAL LIGHT. A cone you can SEE is what makes a dark exterior read as
   lit rather than as a dark rectangle.
   ------------------------------------------------------------------------ */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number; sway?: number }> =
  ({ x, y, top = 66, bot = 300, len = 420, c = "#E0925A", o = 0.30, z = 20, f = 0, sway = 1 }) => (
  <div style={{ position: "absolute", left: x - bot / 2 + Math.sin(f / 47) * 7 * sway, top: y,
    width: bot, height: len, zIndex: z,
    transform: `rotate(${Math.sin(f / 47) * 0.8 * sway}deg)`, transformOrigin: "50% 0%",
    background: `linear-gradient(180deg, ${hexa(c, o * (0.92 + Math.sin(f / 9) * 0.06))} 0%, ${hexa(c, o * 0.14)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** a street lamp: a bent pole, a shade, and a solid warm lens. */
export const StreetLamp: React.FC<{ x: number; y: number; h?: number; c?: string; s?: number;
  z?: number; on?: number; flip?: boolean }> =
  ({ x, y, h = 330, c = "#E0925A", s = 1, z = 34, on = 1, flip = false }) => (
  <div style={{ position: "absolute", left: x, top: y - h, zIndex: z,
    transform: flip ? "scaleX(-1)" : undefined }}>
    <div style={{ position: "absolute", left: 0, top: 26, width: 13 * s, height: h - 26,
      background: "#2A2A34" }} />
    <div style={{ position: "absolute", left: -4, top: h - 34, width: 21 * s, height: 34,
      borderRadius: 4, background: "#22222B" }} />
    <div style={{ position: "absolute", left: 4, top: 0, width: 88 * s, height: 13,
      borderRadius: "13px 13px 0 0", background: "#2A2A34",
      transform: "skewX(-14deg)" }} />
    <div style={{ position: "absolute", left: 68 * s, top: 10, width: 62 * s, height: 21 * s,
      borderRadius: "0 0 30px 30px", background: "#33333F", boxShadow: SH }} />
    <div style={{ position: "absolute", left: 76 * s, top: 26 * s, width: 46 * s, height: 10 * s,
      borderRadius: 6, background: c, opacity: on }} />
  </div>
);

/* ---------------------------------------------------------------------------
   THE CREW.

   ⛔⛔ EVERY PERSON IN THIS REEL IS A CLAUDE. Alex, round 2: *"the 'people'
      shouldn't be people, it should be Claude sprites"*, and he is right for a
      reason beyond style — the repo's whole claim is that these ARE Claude
      agents, so a generic silhouette is drawing the wrong noun. It is also the
      audience signal: a viewer scrolling past sees the clay Claude and knows
      the video is for them before a word is read.

   ⛔ It is the SlopKit `Mascot` verbatim, never a redrawn one
      ([[feedback_reel_house_chassis]]: "use the SPRITES FROM THE GIT REPO").
      Its own `legLift` already alternates off `lf`, so a lower `nodSpeed` IS
      the walk cycle; the container supplies the travel.
   ⛔⛔ EVERY CLAUDE IS THE SAME ORANGE. Alex, round 6: *"why are the Claude
      sprites some darker colored, needs to be fixed, just have the single
      orange color."* I had tinted the crew down because reel 93 found that a
      second hero-coloured mascot behind the hero reads as a second head. He has
      overruled that here and he is right for this reel: an off-brand Claude is
      worse than a crowded one, because the whole audience signal is that these
      are CLAUDES. `#D97757` is the only body colour in the reel.
      ⭐ Hierarchy is now carried by SIZE, POSITION and LIGHT instead of colour —
      the hero is the biggest, nearest and most-lit thing in every frame he is
      in, which is how a frame should rank anyway.
   ------------------------------------------------------------------------ */
export type Prop = "none" | "board" | "roll" | "mega" | "swatch" | "case" | "screen";

/** ⛔ THE ONE BODY COLOUR. Kept as a 4-entry array only so the call sites that
    index it stay readable; every entry is the house clay and there is no darker
    variant anywhere in this reel. */
export const CLAY = "#D97757";
export const CREW_TINT = [CLAY, CLAY, CLAY, CLAY];

export const Claudie: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  walk?: number; prop?: Prop; face?: 1 | -1; tint?: string; hero?: boolean;
  costume?: Record<string, number>; propC?: string; badge?: number }> =
  ({ x, y, s = 1, z = 40, f = 0, walk = 0, prop = "none", face = 1, tint, hero = false,
     costume, propC = "#E7B24C", badge = 0 }) => {
  const size = 190 * s;
  const bob = walk ? Math.abs(Math.sin(f / 4.6 + x * 0.07)) * 5 * walk * s : 0;
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size - bob, zIndex: z,
      transform: `scaleX(${face})`, transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={size} nodSpeed={walk ? 5.2 : 10} nodAmp={walk ? 4.4 : 3.0}
        gaze={hero ? 0 : 0.8} tint={tint || CLAY}
        {...(costume as any)} />
      {/* ⛔⛔ THE MARK MUST NEVER COVER HIS FACE. Alex, round 4: "the Claude
          logo shouldn't cover his face, he still needs his eyes — maybe make it
          above him or big behind him."
          I put it at 47.5% of `size` calling that the "chest", but this sprite
          has NO SEPARATE HEAD: the body rect (y 44..146 of a 200 viewBox) IS the
          face, and the eyes sit at y 70..96 — which is 47.5%. The badge landed
          exactly on them.
          ⭐ The rule: on a box character, the only safe places for an emblem are
          OFF the body — above it (< y44 = 22%) or behind it. Never on it.
          This hovers above the head with a slow bob so it reads as deliberate
          rather than stuck on. The BIG behind-him treatment is the hook's job. */}
      {badge > 0 && (
        <div style={{ position: "absolute",
          left: size * 0.5 - size * 0.15 * badge,
          top: size * 0.22 - size * 0.30 * badge - size * 0.05
               + Math.sin(f / 17) * size * 0.012,
          width: size * 0.30 * badge, height: size * 0.30 * badge,
          borderRadius: size * 0.075 * badge, background: "#FFFFFF",
          border: `${Math.max(2, size * 0.014 * badge)}px solid #E8DCC0`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `scaleX(${face})`,
          boxShadow: "0 5px 12px rgba(20,10,6,0.36)" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: size * 0.21 * badge, height: size * 0.21 * badge,
              objectFit: "contain" }} />
        </div>
      )}
      {/* the prop that gives this one a trade. Held at the mascot's arm line. */}
      {prop === "board" && (
        <div style={{ position: "absolute", left: size * 0.78, top: size * 0.40,
          width: size * 0.30, height: size * 0.40, background: "#EFE7D6",
          border: `${Math.max(2, size * 0.022)}px solid #4A3F30` }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: "14%", right: "14%",
              top: `${18 + i * 24}%`, height: 3, background: "#A79A84" }} />
          ))}
        </div>
      )}
      {prop === "roll" && (
        <div style={{ position: "absolute", left: size * 0.76, top: size * 0.52,
          width: size * 0.44, height: size * 0.13, borderRadius: size * 0.07,
          background: "#EFE7D6", borderTop: `${Math.max(2, size * 0.02)}px solid ${propC}` }} />
      )}
      {prop === "mega" && (
        <div style={{ position: "absolute", left: size * 0.78, top: size * 0.42,
          width: size * 0.34, height: size * 0.26,
          clipPath: "polygon(0 22%, 55% 0, 100% 0, 100% 100%, 55% 100%, 0 78%)",
          background: propC }} />
      )}
      {prop === "swatch" && Array.from({ length: 4 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: size * (0.76 + i * 0.015),
          top: size * 0.48, width: size * 0.30, height: size * 0.055, borderRadius: 3,
          background: ["#D2724E", "#E7B24C", "#3F9E74", "#5AA0DE"][i],
          transformOrigin: "0% 50%", transform: `rotate(${-18 + i * 13}deg)` }} />
      ))}
      {prop === "case" && (
        <div style={{ position: "absolute", left: size * 0.76, top: size * 0.58,
          width: size * 0.30, height: size * 0.24, borderRadius: 3, background: "#6E4A30",
          borderTop: `${Math.max(3, size * 0.03)}px solid #8A6242` }} />
      )}
      {prop === "screen" && (
        <div style={{ position: "absolute", left: size * 0.72, top: size * 0.40,
          width: size * 0.38, height: size * 0.28, borderRadius: 4, background: "#F6E7BE",
          border: `${Math.max(3, size * 0.026)}px solid #4A3F5C` }} />
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   IN-PANEL CHROME. ⛔ Reel 92: the title is DISPLAY TYPE SET INTO THE PANEL,
   white + clay with a shadow — NOT the white SectionHeader pill, which reads as
   a UI label sitting on top of a picture. The pill is the ROOT's job.
   ------------------------------------------------------------------------ */

/** the ONE claim chip a scene gets, in its own horizontal band. */
export const Chip: React.FC<{ t: string; y: number; c?: string; fg?: string; s?: number;
  z?: number; x?: number }> =
  ({ t, y, c = INK, fg = "#F6F2E8", s = 1, z = 96, x }) => (
  <div style={{ position: "absolute", left: x ?? 0, right: x === undefined ? 0 : undefined, top: y,
    display: "flex", justifyContent: x === undefined ? "center" : "flex-start", zIndex: z }}>
    <div style={{ padding: `${11 * s}px ${28 * s}px`, borderRadius: 13 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 36 * s,
      letterSpacing: "-0.015em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** the mono slug along the floor — names the beat without competing for rank. */
export const Slug: React.FC<{ t: string; c?: string; z?: number; y?: number }> =
  ({ t, c = "#CFC8BC", z = 95, y = H - 44 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: z,
    fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.30em", color: c,
    textShadow: "0 2px 6px rgba(0,0,0,0.55)" }}>{t}</div>
);

/** a dark-glass readout: mono label, status dot, a big number. */
export const Glass: React.FC<{ x: number; y: number; w: number; h: number; label: string;
  c?: string; f?: number; z?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, label, c = "#EFCF8C", f = 0, z = 70, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, borderRadius: 16,
    background: "linear-gradient(168deg,#20242E 0%,#151922 100%)", boxShadow: SH_D, zIndex: z,
    border: "3px solid rgba(226,232,244,0.20)", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
      background: "#161A23", borderBottom: "2px solid rgba(226,232,244,0.14)" }} />
    <div style={{ position: "absolute", left: 14, top: 8, width: 11, height: 11, borderRadius: 6,
      background: c, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 11)) }} />
    <div style={{ position: "absolute", left: 34, top: 8, fontFamily: MONO, fontWeight: 800,
      fontSize: 16, letterSpacing: "0.16em", color: "#96A0B0" }}>{label}</div>
    {children}
  </div>
);

/** a big number that MOVES to its value — never typeset at it. */
export const BigNum: React.FC<{ x: number; y: number; v: string; c?: string; size?: number;
  z?: number; mono?: boolean }> =
  ({ x, y, v, c = "#F6F1E6", size = 66, z = 72, mono = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: mono ? MONO : fraunces.fontFamily, fontWeight: 900, fontSize: size,
    lineHeight: 1, color: c, letterSpacing: "-0.02em",
    textShadow: "0 3px 10px rgba(0,0,0,0.5)" }}>{v}</div>
);

/** display type set INTO the panel: the scene's claim, white + clay. */
export const Title: React.FC<{ l1: string; hot: string; f: number; z?: number; y?: number }> =
  ({ l1, hot, f, z = 94, y = 34 }) => {
  const p = E(f, 0, 11, 0, 1, BACK);
  return (
    <div style={{ position: "absolute", left: 46, top: y, zIndex: z, opacity: Math.min(1, p),
      transform: `translateY(${(1 - p) * -14}px)` }}>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 1.04,
        color: "#F7F3EA", letterSpacing: "-0.02em", textShadow: "0 4px 14px rgba(0,0,0,0.62)" }}>{l1}</div>
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 44, lineHeight: 1.04,
        color: "#E7B24C", letterSpacing: "-0.02em", textShadow: "0 4px 14px rgba(0,0,0,0.62)" }}>{hot}</div>
    </div>
  );
};

/** a plinth so nothing floats. */
export const Plinth: React.FC<{ x: number; y: number; w: number; h?: number; c?: string; z?: number }> =
  ({ x, y, w: ww, h = 22, c = "rgba(10,12,18,0.34)", z = 20 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: h, borderRadius: h / 2,
    background: c, zIndex: z }} />
);

/** a contact shadow that grounds a prop to the street. */
export const Contact: React.FC<{ x: number; y: number; w: number; z?: number; o?: number }> =
  ({ x, y, w: ww, z = 19, o = 0.34 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: Math.max(12, ww * 0.10),
    borderRadius: "50%", background: `rgba(8,10,16,${o})`, zIndex: z, filter: "blur(6px)" }} />
);
