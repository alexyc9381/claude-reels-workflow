import React from "react";
import { Easing, interpolate } from "remotion";

/* =============================================================================
   WorldKit — the SET engine. Sky, haze, parallax depth bands, ground, kerb lip,
   grit, overhead furniture, frame-edge occluders and practical light.

   ⭐⭐ WHY THIS FILE EXISTS.

   `SlopKit.tsx` is the house chassis and it exports Panel, Bg, Mascot, the
   header, the caption track, the progress rail — CHROME and CHARACTERS. It has
   never exported a single set primitive. Measured across every reel's source:

       reel          worlds  occluders  parallax
       94 AGENCY        16         16        12
       95 TOOLS          0          0         0
       96 AWESOME        0          0         0
       97 FREE           0          0         0
       98 NOMAD          0          0         0
       99 REPO           0          0         0
       100 APPLE         0          0         0
       101 COMPRESS      0          0         2
       102 SEO           0          0         0
       103 TRADE         0          0         0
       104 PLUGIN        0          0         0

   Reel 94 built a depth engine in `AgyWorld.tsx` — a table of named worlds, a
   Surface that paints three parallax building bands behind the action, and a
   mass cropped by the frame edge in FRONT of it. It is the only reel that has
   one, and it is the reel whose look everything since has been measured against
   and found short. The engine was never promoted, so every reel after it
   hand-built flat sets from gradients and props: an object on a wall, with no
   plane in front and no plane behind.

   ⛔ THE THREE PLANES ARE THE WHOLE POINT. A frame with only a midground is a
      backdrop with a prop on it, however well drawn the prop is:
        BEHIND   `Surface` — sky, haze, three parallax bands, ground, kerb, grit
        MIDDLE   your props and characters
        IN FRONT `Occluder` — a mass cropped by the panel border
      `Occluder` is the cheapest depth in the repo and the one most often
      skipped, because nothing fails without it.

   ⛔ AgyWorld.tsx IS LEFT ALONE. Reel 94 is delivered and frozen; this is a
      copy, not a refactor, so nothing can regress a shipped reel. New reels
      import from here.

   ⛔ THE PALETTES BELOW ARE TUNED TO A MEASURED TARGET, NOT TO TASTE.
      `tools/look_audit.py` gates the body at saturated pixels >= 34% and black
      point (luma p10) <= 35. AGENCY measures 58.5% / 23.6. The ten reels after
      it drifted to 6-45% / 44-81 because a frame-0 luma law of >=140 leaked into
      a whole-reel minimum, and the sanctioned fix for failing it was lifting the
      shadows. Every palette here keeps a genuinely dark `sky2`/`ground2` so the
      lit thing can rank. Run the audit before believing a set looks right.
   ========================================================================== */

export const W = 1012, H = 792;
/** the panel-local box everything important must sit inside. The `HookHeader`
    pill owns y 0..118, so nothing that must READ goes above y=120. */
export const SAFE = { x0: 46, x1: 974, y0: 124, y1: 690 } as const;

export const SH = "0 10px 22px rgba(20,18,14,0.34)";
export const SH_D = "0 24px 46px rgba(10,12,20,0.46)";

export const OUT = Easing.out(Easing.cubic), IO = Easing.inOut(Easing.cubic);
export const BACK = Easing.out(Easing.back(1.7)), IN_Q = Easing.in(Easing.quad);
export const LIN = Easing.linear;

export const E = (f: number, a: number, b: number, va = 0, vb = 1, ez: any = OUT) =>
  interpolate(f, [a, b], [va, vb], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ez,
  });

/** ⛔ hex IN, rgba OUT. Never nest these — `dark(mix(c, k), j)` parses "rgb(...)"
    as hex, gets NaN and paints SOLID BLACK. One transform per colour. */
export const hexa = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};
/** tint toward PAPER and emit a solid value — never a low-opacity wash, which
    the matte-palette rule bans outright. */
export const mix = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.round(v + (247 - v) * k);
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
};
export const dark = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.round(v * (1 - k));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
};

export type World = {
  sky: string; sky2: string;                 // the gradient behind everything
  glow: string; glowX: number; glowY: number; glowR: number;  // the one source
  b1: string; b2: string; b3: string;        // three parallax bands, far to near
  win: string;                               // lit windows in the near band
  ground: string; ground2: string;           // the floor gradient
  lip: string; grit: string;                 // the kerb edge and its texture
  horizon: number;                           // where the ground starts, panel-local
  key: string;                               // the accent this world is lit by
};

/* ⛔ EVERY PALETTE KEEPS ITS SHADOWS. `sky2` and `ground2` are the darkest values
   in each row on purpose — they are what the black-point gate measures, and they
   are what lets one lit object out-rank everything else in the frame. If a set
   built on one of these fails HOOK_LUMA, brighten the SUBJECT or add a practical
   light. Do not lift these. That is the move that flattened ten reels. */
export const PALETTES: Record<string, World> = {
  /** a wet industrial kerb under one sodium lamp — one source, warmest shadows */
  kerb: { sky: "#3A3346", sky2: "#241F2E", glow: "#E0925A", glowX: 176, glowY: 108, glowR: 150,
    b1: "#2E2B3C", b2: "#25222F", b3: "#1B1924", win: "#C99C63",
    ground: "#33323E", ground2: "#232230", lip: "#565467", grit: "#8E8AA0", horizon: 486, key: "#E0925A" },
  /** a deep navy street with a gold marquee — the building's own front */
  marquee: { sky: "#2B3A5C", sky2: "#1A2440", glow: "#F2E2B0", glowX: 806, glowY: 128, glowR: 84,
    b1: "#33436A", b2: "#293656", b3: "#1E2942", win: "#E7B24C",
    ground: "#2A3350", ground2: "#1B2238", lip: "#4B5C86", grit: "#93A4CE", horizon: 604, key: "#E7B24C" },
  /** across a flooded plaza — teal, wide, reflective, the coldest frame */
  plaza: { sky: "#1E3D4E", sky2: "#132833", glow: "#CBEAE4", glowX: 168, glowY: 132, glowR: 70,
    b1: "#245063", b2: "#1B3E4E", b3: "#142E3B", win: "#EFCF8C",
    ground: "#16323F", ground2: "#0E222C", lip: "#2E6274", grit: "#7FC0C9", horizon: 500, key: "#7FC0C9" },
  /** a neutral plum street that shopfront zones can tint */
  row: { sky: "#42314C", sky2: "#291E32", glow: "#E9C6A2", glowX: 506, glowY: 96, glowR: 106,
    b1: "#3B2E48", b2: "#31263C", b3: "#261D2E", win: "#E5B876",
    ground: "#332B3C", ground2: "#221C29", lip: "#5B4E68", grit: "#9C8CAC", horizon: 512, key: "#C88FA8" },
  /** a back lot, tungsten on gravel — the warmest set in the kit */
  backlot: { sky: "#3B3524", sky2: "#241F14", glow: "#F0C979", glowX: 866, glowY: 118, glowR: 96,
    b1: "#3A3222", b2: "#2F281B", b3: "#241E14", win: "#F0C979",
    ground: "#4A3E28", ground2: "#31281A", lip: "#6E5C3A", grit: "#C4A874", horizon: 470, key: "#F0C979" },
  /** camera on the pavement, green screen-wash on wet slate */
  kerbside: { sky: "#22303A", sky2: "#141D25", glow: "#9FD9BC", glowX: 300, glowY: 104, glowR: 62,
    b1: "#283945", b2: "#1F2D37", b3: "#17222A", win: "#DCC287",
    ground: "#2A3740", ground2: "#1A242B", lip: "#46606C", grit: "#8FB6AE", horizon: 452, key: "#5FAE86" },
  /** a cold sky and one warm house — two sources fighting */
  suburb: { sky: "#25355A", sky2: "#16203A", glow: "#EFE7C6", glowX: 128, glowY: 96, glowR: 72,
    b1: "#2C3D62", b2: "#22314F", b3: "#1A263E", win: "#EFC978",
    ground: "#2F3A46", ground2: "#1F262F", lip: "#54636F", grit: "#93A2B4", horizon: 546, key: "#EFC978" },
  /** a roof at first light — the only warm sky, and the brightest set here */
  dawnroof: { sky: "#F2B77C", sky2: "#C4707A", glow: "#FFF0CE", glowX: 726, glowY: 236, glowR: 158,
    b1: "#8E5A72", b2: "#6B4460", b3: "#4C324B", win: "#FFE2A8",
    ground: "#5A4258", ground2: "#3C2C3E", lip: "#8B6478", grit: "#E2B79E", horizon: 560, key: "#F2B77C" },
  /** a violet corner under one lamp */
  corner: { sky: "#38294A", sky2: "#1E1530", glow: "#E9C6A2", glowX: 210, glowY: 112, glowR: 118,
    b1: "#3A2C4A", b2: "#2E233C", b3: "#241A2E", win: "#E5B876",
    ground: "#332942", ground2: "#1F1830", lip: "#5E4E74", grit: "#A292BA", horizon: 596, key: "#E9C6A2" },
  /** cold steel blue, lit from a vehicle */
  depot: { sky: "#28394E", sky2: "#141C28", glow: "#DCE8F2", glowX: 862, glowY: 108, glowR: 76,
    b1: "#2E4159", b2: "#243347", b3: "#1A2634", win: "#E9D6A6",
    ground: "#26313E", ground2: "#161D26", lip: "#465B72", grit: "#9DB4C8", horizon: 620, key: "#DCE8F2" },
};

/* ---- the depth bands ----------------------------------------------------- */

/** one parallax band of building slabs, each with its own small lit windows.
    ⛔ DETAIL WITHOUT LOSING THE RANK: small, low-contrast, painted close to the
    band colour they stand on, and at the HORIZON rather than the optical centre.
    That is what lets the object count climb while the frame keeps a first place. */
const Band: React.FC<{ c: string; win: string; y: number; n: number; seed: number;
  dx: number; z: number; lit: number; hMin: number; hMax: number }> =
  ({ c, win, y, n, seed, dx, z, lit, hMin, hMax }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z }}>
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
          <div style={{ position: "absolute", left: -5, top: 0, width: w + 10, height: 7,
            background: dark(c, 0.22) }} />
          {Array.from({ length: cols * rows }, (_, k) => {
            const q = Math.sin(i * 17.3 + k * 29.1 + seed) * 4371.7;
            if ((q - Math.floor(q)) >= lit) return null;
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

/** solid dots, three sizes, no bloom */
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

/** ground dressing: seams, perspective lane dashes, far scatter, and the bottom
    pavement edge that everything stands ON.
    ⛔ A CONTINUOUS EDGE, NOT LOOSE RECTS. Reel 94 shipped seven scattered rounded
    rects along the bottom first and they read as GLITCHES rather than foreground.
    ⚠️ The edge sits at z84 and its silhouettes at z85 — anything of yours that
    must not be covered by a bin goes ABOVE 85. */
const Ground: React.FC<{ w: World; t: number }> = ({ w, t }) => (<>
  {[0, 1, 2, 3, 4].map((r) => (
    <div key={"s" + r} style={{ position: "absolute", left: 0, right: 0,
      top: w.horizon + 22 + r * (34 + r * 13), height: 2,
      background: dark(w.ground, 0.28), zIndex: 16 }} />
  ))}
  {Array.from({ length: 6 }, (_, i) => {
    const p = (i * 0.17 + t * 0.0042) % 1;
    return (
      <div key={"l" + i} style={{ position: "absolute", left: 506 - (26 + p * 66) / 2,
        top: w.horizon + 18 + p * p * (H - w.horizon), width: 26 + p * 66,
        height: 4 + p * 12, borderRadius: 3, background: mix(w.lip, 0.30), zIndex: 17 }} />
    );
  })}
  {Array.from({ length: 10 }, (_, i) => (
    <div key={"f" + i} style={{ position: "absolute",
      left: ((i * 143 + 30 - t * 0.30) % 1220) - 90, top: w.horizon - 16,
      width: 9, height: 22, borderRadius: "4px 4px 0 0", background: dark(w.b3, 0.20), zIndex: 18 }} />
  ))}
  <div style={{ position: "absolute", left: -20, right: -20, top: H - 54, height: 70,
    background: dark(w.ground2, 0.52), zIndex: 84 }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: H - 58, height: 5,
    background: mix(w.lip, 0.10), zIndex: 85 }} />
  {Array.from({ length: 6 }, (_, i) => {
    const x = ((i * 197 + 40 - t * 0.72) % 1320) - 130;
    const kind = i % 3;
    const c = dark(w.ground2, 0.62);
    return (
      <div key={"n" + i} style={{ position: "absolute", left: x, top: H - 54, zIndex: 85 }}>
        {kind === 0 && (<>
          <div style={{ position: "absolute", left: 0, top: -52, width: 62, height: 54,
            borderRadius: "6px 6px 3px 3px", background: c }} />
          <div style={{ position: "absolute", left: -6, top: -60, width: 74, height: 11,
            borderRadius: 4, background: dark(w.ground2, 0.48) }} />
        </>)}
        {kind === 1 && (<>
          <div style={{ position: "absolute", left: 0, top: -44, width: 86, height: 46, background: c }} />
          <div style={{ position: "absolute", left: 12, top: -74, width: 60, height: 32,
            background: dark(w.ground2, 0.56) }} />
        </>)}
        {kind === 2 && (<>
          <div style={{ position: "absolute", left: 6, top: -46, width: 26, height: 48,
            borderRadius: "13px 13px 3px 3px", background: c }} />
          <div style={{ position: "absolute", left: -6, top: -34, width: 50, height: 10,
            borderRadius: 5, background: c }} />
        </>)}
      </div>
    );
  })}
</>);

/** ⛔ something cropped by the TOP edge — the cheapest depth in the repo, and the
    difference between a camera standing in a place and one pointed at a backdrop. */
const Overhead: React.FC<{ w: World; t: number; on?: boolean }> = ({ w, t, on = true }) => (<>
  <div style={{ position: "absolute", left: -40, right: -40, top: 26, height: 5,
    background: dark(w.b3, 0.36), zIndex: 88,
    transform: `rotate(${-1.4 + Math.sin(t / 61) * 0.22}deg)` }} />
  {[188, 506, 824].map((x, i) => (
    <div key={x} style={{ position: "absolute", left: x, top: 26, zIndex: 89,
      transform: `rotate(${Math.sin(t / 44 + i * 1.7) * 1.9}deg)`, transformOrigin: "50% 0%" }}>
      <div style={{ position: "absolute", left: -2, top: 0, width: 4, height: 42,
        background: dark(w.b3, 0.42) }} />
      <div style={{ position: "absolute", left: -26, top: 42, width: 52, height: 22,
        borderRadius: "0 0 26px 26px", background: dark(w.b3, 0.30) }} />
      {on && <div style={{ position: "absolute", left: -13, top: 58, width: 26, height: 9,
        borderRadius: 5, background: w.key }} />}
    </div>
  ))}
</>);

/** THE SET, behind everything. ~24 objects before a single prop lands, which is
    most of the way to the 12-18 object median the learnings doc asks for — and
    all of it is BEHIND the action, so it costs the subject no rank.
    `t` drives the parallax; pass the root frame so the world never flatlines. */
export const Surface: React.FC<{ w: World; t?: number; stars?: boolean; overhead?: boolean;
  lampsOn?: boolean; litFar?: number }> =
  ({ w, t = 0, stars = true, overhead = true, lampsOn = true, litFar = 0.34 }) => (<>
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(178deg, ${w.sky} 0%, ${w.sky2} 100%)` }} />
  {/* the haze — a SOLID disc plus one soft ring, never an emissive blur */}
  <div style={{ position: "absolute", left: w.glowX - w.glowR * 1.5, top: w.glowY - w.glowR * 1.5,
    width: w.glowR * 3, height: w.glowR * 3, borderRadius: "50%", zIndex: 3,
    background: `radial-gradient(circle, ${hexa(w.glow, 0.30)} 0%, ${hexa(w.glow, 0.10)} 42%, ${hexa(w.glow, 0)} 68%)` }} />
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
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon, bottom: 0, zIndex: 14,
    background: `linear-gradient(184deg, ${w.ground} 0%, ${w.ground2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: w.horizon - 8, height: 10,
    background: w.lip, zIndex: 15 }} />
  {Array.from({ length: 24 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 97 + 40 - t * 0.66) % 1140) - 60,
      top: w.horizon + 24 + ((i * 47) % 11) * 24,
      width: 5 + (i % 3) * 4, height: 4, borderRadius: 2, background: w.grit,
      opacity: 0.44, zIndex: 16 }} />
  ))}
  <Ground w={w} t={t} />
  {overhead && <Overhead w={w} t={t} on={lampsOn} />}
</>);

/** ⛔⛔ THE FRAME-EDGE OCCLUDER — a mass cropped by the panel border, IN FRONT of
    the action. This is the single most-skipped primitive in the repo and the one
    that separates a place from a backdrop. Ten reels shipped without one.
    Nothing fails when it is missing, which is exactly why it goes missing. */
export const Occluder: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "wall" | "pole" }> =
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

/** a cone you can SEE — what makes a dark set read as LIT rather than as a dark
    rectangle. ⛔ This is the right answer when a set fails HOOK_LUMA. Lifting the
    palette's shadows is the wrong one. */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number; sway?: number }> =
  ({ x, y, top = 66, bot = 300, len = 420, c = "#E0925A", o = 0.30, z = 20, f = 0, sway = 1 }) => (
  <div style={{ position: "absolute", left: x - bot / 2 + Math.sin(f / 47) * 7 * sway, top: y,
    width: bot, height: len, zIndex: z,
    transform: `rotate(${Math.sin(f / 47) * 0.8 * sway}deg)`, transformOrigin: "50% 0%",
    background: `linear-gradient(180deg, ${hexa(c, o * (0.92 + Math.sin(f / 9) * 0.06))} 0%, ${hexa(c, o * 0.14)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** a bent pole, a shade, and a solid warm lens — the source a Cone comes from */
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
      borderRadius: "13px 13px 0 0", background: "#2A2A34", transform: "skewX(-14deg)" }} />
    <div style={{ position: "absolute", left: 68 * s, top: 10, width: 62 * s, height: 21 * s,
      borderRadius: "0 0 30px 30px", background: "#33333F", boxShadow: SH }} />
    <div style={{ position: "absolute", left: 76 * s, top: 26 * s, width: 46 * s, height: 10 * s,
      borderRadius: 6, background: c, opacity: on }} />
  </div>
);

/** the contact shadow that stops a character floating. Cheap, and its absence is
    visible in every reel that skipped it. */
export const Contact: React.FC<{ x: number; y: number; w: number; z?: number; o?: number }> =
  ({ x, y, w: ww, z = 30, o = 0.3 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: ww * 0.19,
    borderRadius: "50%", background: `rgba(8,6,12,${o})`, zIndex: z }} />
);

/* =============================================================================
   THE SET CHECKLIST — three questions, asked before a scene is called finished.
   `tools/look_audit.py` can measure the first two. The third is by eye, because
   both automatic proxies for it were tried and neither discriminated.

     1  BLACK POINT   does the frame still have a genuinely dark value in it?
                      body p10 <= 35.  If it fails, repaint — do NOT lift shading.
     2  SATURATION    is >= 34% of the frame actually coloured?
     3  THREE PLANES  is there something BEHIND the subject (Surface) and
                      something IN FRONT of it, cropped by the panel edge
                      (Occluder)? If not, it is a prop on a wall.
   ========================================================================== */
