import React from "react";
import { Img, staticFile } from "remotion";
import { MONO, Mascot, hexA } from "./SlopKit";
import { inter } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";
import { rock, shake, drift, squash } from "./SklWorld";

/* ===========================================================================
   REEL 115 · "STAR" — THE WORLD KIT.  Board: storyboards/115-star.md.

   Subject: five free GitHub repos that replace software you currently pay for.
   Verified live 2026-08-20 against the GitHub API and each README.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS.
      The thing all five have in common is that they are the FREE version of a
      metered thing. So the world is a NIGHT MARKET behind a coin turnstile:
      outside the arch everything has a price tag and a card reader; inside,
      five stalls give away what the street charges for. Every stall is the
      literal mechanism of its repo — a pigeonhole wall that EJECTS free
      passes, a patch bay whose cords FLY into their jacks, a bot-check
      barrier walked STRAIGHT THROUGH, a pull-cord generator, a plug wall that
      fires trunk cables to every socket. Nothing here is a glowing box.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below).

   ⛔⛔⛔ THE THREE THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1. EXACTLY TWO MONEY FIGURES MAY APPEAR AND BOTH ARE THE VO'S OWN SPOKEN
         WORDS: `$10,000` (hook) and `$300/mo` (S7). Every other price, saving
         or total is banned — none of the five repos publishes one.
      2. NO PERCENTAGE, NO TOKEN COUNT, NO "N× CHEAPER". Guard: RATE_BANNED.
      3. UNDERSTATED VO NUMBERS ARE DRAWN EXACT (reel 113's rule). VO "over
         500,000" -> 945,792 · "hundreds" -> 1,346 · "1,400 plus / 50
         categories" -> 1,706 / 51 · "over 92,000" -> 92,592. An understated VO
         number is safe to draw exactly; a DIFFERENT one is not.
      4. THE VO SAYS "CLAUDE PLUGINS" AND FOUR OF THE FIVE ARE NOT. Nothing in
         the picture asserts that: the plates say what each thing IS (LIST /
         LIST / PYTHON / RUNTIME / MCP) and the Claude mark sits on the
         WORKSTATION the market feeds. The framing stays in the VO.

   ⛔ MATTE ONLY. No `boxShadow: 0 0 Npx` anywhere — the grep gate returns 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO — under ~40px on the short
      side it vanishes in the audit's 1012->240 downsample.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* ---- the palette ---------------------------------------------------------
   Clay is the house colour and it is also the colour of a sodium street lamp
   and a brazier, so the market is separated from the street by LIGHT rather
   than by hue, and the hero never changes paint. */
export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const BRASS = "#C9A15A", ENAM = "#2E6B58", SODIUM = "#E7A94C", VIOLET = "#7A6494";
export const OXIDE = "#8C4A2E";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Verified live 2026-08-20.
   ====================================================================== */
export const R = {
  combined: 945792,
  combinedText: "945,792",
  repos: [
    { key: "ffd",   name: "free-for-dev",         owner: "ripienaar", logo: "",
      stars: 132255, starsText: "132,255", kind: "LIST",    lic: "—",
      n1: "1,346", l1: "FREE TIERS", n2: "56", l2: "SECTIONS" },
    { key: "api",   name: "public-apis",          owner: "public-apis", logo: "",
      stars: 466531, starsText: "466,531", kind: "LIST",    lic: "MIT",
      n1: "1,706", l1: "FREE APIS",  n2: "51", l2: "CATEGORIES" },
    { key: "scrap", name: "Scrapling",            owner: "D4Vinci", logo: "scrapling.png",
      stars: 75397,  starsText: "75,397",  kind: "PYTHON",  lic: "BSD-3",
      n1: "0", l1: "BOT CHECKS", n2: "1", l2: "LIBRARY" },
    { key: "olla",  name: "ollama",               owner: "ollama", logo: "ollama.svg",
      stars: 179017, starsText: "179,017", kind: "RUNTIME", lic: "MIT",
      n1: "1", l1: "COMMAND",    n2: "3", l2: "MODELS" },
    { key: "mcp",   name: "awesome-mcp-servers",  owner: "punkpeye", logo: "claude.svg",
      stars: 92592,  starsText: "92,592",  kind: "MCP",     lic: "MIT",
      n1: "1", l1: "PLUG",       n2: "∞", l2: "SERVERS" },
  ],
  /* the running total after each plate lands, S1. The number MOVES to its
     value — it is never typeset at it. */
  runningTotal: ["132,255", "598,786", "674,183", "853,200", "945,792"],
  /* the only two money figures allowed, and both are the VO's own words */
  hookPrice: "$10,000",
  scrapPrice: "$300/mo",
  cmd: "ollama run llama3",
} as const;

export const MONEY_BANNED = ["USD", "SAVED", "/yr", "PRICE", "TOTAL COST", "YOU SAVE"] as const;
export const RATE_BANNED = ["%", "TOKENS SAVED", "2X CHEAPER", "CREDITS SAVED", "FASTER"] as const;
export const COUNT_BANNED = ["500,000", "1,400", "92,000", "HUNDREDS"] as const;

/* =========================================================================
   THE NINE PLACES. A new light AND colour every 2-4s, and neighbouring
   scenes differ by BOTH hue and lightness.

   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE. Body scenes target
   luma 70-105, saturated pixels 34-45%, black point p10 <= 35. `street` is
   the hook set and carries the bar through the ARCH OPENING and the wet road,
   not through the palette's dark stop.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE METERED STREET. Wet asphalt is the bright plane; the market arch
     behind the turnstile is a wide lit bay, so the hero reads as a DARK mass
     against a BRIGHT field (reel 110: name which side of the contrast the
     subject is on). Mean from the room, spread from the hero. */
  /* ⭐ THE WET ROAD IS THE BRIGHT PLANE. A rain-slick street under a lit
     market is genuinely the highest value in the frame, so the >=140 frame-0
     bar is bought by a REAL surface rather than by lifting the dark stop —
     which is the one move §8 exists to ban. The dark mass is the GATE, and it
     sits against this; that gap is the reel's biggest value spread. */
  street:  { back: "#A3B4C6", back2: "#7A8A9E", floor: "#D8E2EA", floor2: "#A8B6C6",
             lip: "#F4F8FB", key: "#FFE7BE", horizon: 508, grit: "#FFFFFF" },

  /* S1 — UNDER THE ARCH. Warm brass practical, deep brick shadow. Cold->warm
     and bright->mid from `street`. */
  arch:    { back: "#6E4C38", back2: "#301F16", floor: "#7E5E46", floor2: "#35261B",
             lip: "#AE8560", key: "#FFD9A0", horizon: 540, grit: "#DCB88A" },

  /* S2/S3 — STALL 1, THE PIGEONHOLE WALL. Green enamel under two hanging
     bulbs. Warm->green, mid->mid-dark. */
  holes:   { back: "#2B5849", back2: "#0E211A", floor: "#2F5F4E", floor2: "#12251D",
             lip: "#4C8E74", key: "#BFF0D4", horizon: 528, grit: "#80C2A2" },

  /* S4 — THE TILL. One cold white tube. Green->cold white, mid-dark->bright:
     the biggest single lightness step in the reel, and it lands on the
     "no credit cards" beat, which is the one that should feel like relief. */
  till:    { back: "#8F9BA8", back2: "#414A54", floor: "#9CA8B3", floor2: "#48515A",
             lip: "#C8D4DE", key: "#FFFFFF", horizon: 552, grit: "#DEE8F0" },

  /* S5/S6 — STALL 2, THE PATCH BAY under hard sodium. Cold white->amber. */
  patch:   { back: "#604724", back2: "#2C1E0D", floor: "#70542A", floor2: "#332411",
             lip: "#99733C", key: "#FFCE7A", horizon: 544, grit: "#D2A660" },

  /* S7/S8 — STALL 3, THE BOT CHECK. Red raking lamp; the most saturated frame
     in the reel and where BODY_SAT is bought back. Amber->red, mid->dark. */
  check:   { back: "#5E211A", back2: "#2A0D09", floor: "#541F17", floor2: "#250B08",
             lip: "#873020", key: "#FF8E62", horizon: 536, grit: "#B3543C" },

  /* S9/S10 — STALL 4, THE GENERATOR SHED, out back. Moonlight blue room with
     ONE warm firebox: the warm key against a cold room is the whole point of
     the scene, so the palette carries it. Red->blue, dark->mid. */
  shed:    { back: "#2C3C54", back2: "#0F1824", floor: "#304259", floor2: "#111A28",
             lip: "#4A6490", key: "#FFC98A", horizon: 548, grit: "#7E95B6" },

  /* S11/S12 — STALL 5, THE PLUG WALL. The signal green runs the wall itself,
     so the light source and the mechanism are the same object. Blue->green,
     mid->bright. */
  plugs:   { back: "#1F4C3E", back2: "#0B1F19", floor: "#255446", floor2: "#0D241D",
             lip: "#3E8C70", key: "#9CF0C4", horizon: 520, grit: "#6AC69C" },

  /* S13 — THE GATE COUNTER. Warm practical over, cool street spill behind:
     the strongest depth in the reel, and it is the last frame. */
  gate:    { back: "#443850", back2: "#1E1828", floor: "#50403A", floor2: "#261E1A",
             lip: "#76624C", key: "#FFD8A0", horizon: 532, grit: "#AF9272" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/* ---- helpers -------------------------------------------------------------
   ⭐⭐⭐ `mxh()` BUYS LUMA BY SPENDING SATURATION, AND BOTH ARE GATED.
   `vivid()` lifts the TOP channel and pushes the BOTTOM one DOWN, so it buys
   value WITHOUT flattening the paint. */
export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const hi = Math.max(...c), lo = Math.min(...c);
  const out = c.map(v => {
    if (v === hi) return Math.min(255, Math.round(v + (255 - v) * k));
    if (v === lo) return Math.max(0, Math.round(v * (1 - k * 0.55)));
    return v;
  });
  return `#${out.map(v => v.toString(16).padStart(2, "0")).join("")}`;
};
/** ⭐ a straight hex→hex lerp. `mxh`/`dkh` only move toward white or black, so
    neither can take a sprite from clay to red and back. */
export const lerpHex = (a: string, b: string, t: number) => {
  const k = Math.max(0, Math.min(1, t));
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (sh: number) => {
    const va = (pa >> sh) & 255, vb = (pb >> sh) & 255;
    return Math.round(va + (vb - va) * k).toString(16).padStart(2, "0");
  };
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};

export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ⭐⭐⭐ THE RAKE — the travelling band that keeps every scene alive.
   It MUST alternate LIGHT AND SHADOW (a light-only wash lifts the black point,
   which is the one thing the look gate exists to ban), and it must stay
   FEATHERED (a hard edge reads as wallpaper). Motion is bought back through
   SPEED at the call site, never through width.
   ====================================================================== */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; o?: number; rate?: number; z?: number; ang?: number }> =
  ({ f, y, h, x0 = -260, span = 1560, n = 7, c = "#FFE7BE", o = 0.30, rate = 3.4, z = 22, ang = -13 }) => {
  const pitch = span / n;
  return (<div style={{ position: "absolute", left: 0, right: 0, top: y, height: h, zIndex: z,
    overflow: "hidden", pointerEvents: "none" }}>
    {Array.from({ length: n * 2 }, (_, i) => {
      const isDark = i % 2 === 1;
      const x = x0 + ((i * pitch * 0.5 + f * rate) % span);
      return (<div key={"rk" + i} style={{ position: "absolute", left: x, top: -h * 0.5,
        width: pitch * 0.46, height: h * 2, transform: `rotate(${ang}deg)`,
        background: isDark
          ? `linear-gradient(90deg, ${hexa("#000000", 0)} 0%, ${hexa("#000000", o * 0.62)} 46%, ${hexa("#000000", 0)} 100%)`
          : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 48%, ${hexa(c, 0)} 100%)` }} />);
    })}
  </div>);
};

/** an expanding ring — every arrival gets one. Nothing lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  r?: number; z?: number; w?: number }> =
  ({ x, y, f, at, c = "#FFE7BE", r = 150, z = 62, w = 7 }) => {
  const t = E(f, at, at + 15, 0, 1, OUT);
  if (f < at || t >= 1) return null;
  const rr = r * t;
  return (<div style={{ position: "absolute", left: x - rr, top: y - rr * 0.42, width: rr * 2,
    height: rr * 0.84, borderRadius: "50%", zIndex: z, opacity: (1 - t) * 0.85,
    border: `${w * (1 - t * 0.6)}px solid ${c}` }} />);
};

/** dust squeezed out of an impact — street grit, not sparkle. */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  n?: number; s?: number; z?: number; spread?: number }> =
  ({ x, y, f, at, c = "#C9D6E0", n = 12, s = 1, z = 60, spread = 1 }) => {
  if (f < at || f > at + 30) return null;
  const lf = f - at;
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + rnd(i, 3) * 0.9;
    const d = E(lf, 0, 24, 0, 1, OUT) * (60 + rnd(i, 7) * 90) * s * spread;
    const g = lf * lf * 0.06;
    const sz = (16 + rnd(i, 11) * 22) * s;
    return (<div key={"pf" + i} style={{ position: "absolute",
      left: x + Math.cos(a) * d - sz / 2, top: y + Math.sin(a) * d * 0.42 - sz / 2 + g,
      width: sz, height: sz, borderRadius: "50%", background: c, zIndex: z,
      opacity: Math.max(0, 0.5 - lf / 34) }} />);
  })}</>);
};

/** a floor light pool — a practical, never an emissive blur. */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; h?: number }> =
  ({ x, y, w, c = "#FFE7BE", o = 0.30, z = 18, h }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - (h ?? w * 0.30) / 2,
    width: w, height: h ?? w * 0.30, borderRadius: "50%", zIndex: z,
    background: `radial-gradient(circle, ${hexa(c, o)} 0%, ${hexa(c, o * 0.34)} 46%, ${hexa(c, 0)} 72%)` }} />
);

/** ⭐ EFFORT WANTS AN EMITTER ON THE STILLEST PART OF THE HERO (§11). A
    pushing sprite acts with its arms and torso; the HEAD is what is still. */
export const Steam: React.FC<{ x: number; y: number; f: number; at: number; n?: number;
  s?: number; z?: number; c?: string }> =
  ({ x, y, f, at, n = 7, s = 1, z = 66, c = "#F4EFE4" }) => {
  if (f < at) return null;
  const lf = f - at;
  return (<>{Array.from({ length: n * 2 }, (_, i) => {
    const side = i % 2 ? 1 : -1;
    const k = i >> 1;
    const t = ((lf + k * 9) % 42) / 42;
    const sz = (18 + t * 34) * s;
    return (<div key={"st" + i} style={{ position: "absolute",
      left: x + side * (34 * s) + side * t * 30 * s - sz / 2,
      top: y - t * 82 * s - sz / 2, width: sz, height: sz * 0.82, borderRadius: "50%",
      background: c, opacity: (1 - t) * 0.42, zIndex: z }} />);
  })}</>);
};

/* =========================================================================
   THE PROPS.

   ⭐⭐⭐ PROPS NEED REAL DRAWING, NOT PRIMITIVES. *"A whole lot of nothing even
   though there's more stuff"* — the object that drew that note was FOUR divs.
   Count divs per object BEFORE adding objects. Detail-per-object and
   object-COUNT are different dials and only one of them was ever turned.
   ====================================================================== */

/** ⭐ A REAL MARK ON A WHITE TILE. A wrong mark is worse than no mark, so
    every call site names a file that exists in public/logos. */
export const Tile: React.FC<{ x: number; y: number; s?: number; src: string; z?: number;
  o?: number; rot?: number; lit?: number }> =
  ({ x, y, s = 76, src, z = 60, o = 1, rot = 0, lit = 1 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
    zIndex: z, opacity: o, transform: `rotate(${rot}deg)`, borderRadius: s * 0.22,
    background: lit >= 1 ? "#FFFFFF" : mxh("#8C877D", lit * 0.9),
    border: `${Math.max(2, s * 0.045)}px solid #E4DECE`, boxShadow: SH,
    display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile("logos/" + src)}
      style={{ width: s * 0.66, height: s * 0.66, objectFit: "contain",
        filter: lit >= 1 ? undefined : `grayscale(1) opacity(${0.3 + lit * 0.7})` }} />
  </div>
);

/** ⛔ PLATES BELONG IN A RESERVED BAND (reel 112: *"the claude sprites are
    covered by the text boxes"*). `HookHeader` owns panel y 0..96; this band is
    y 112..210; the cast owns the ground line and nothing else enters either. */
export const RepoPlate: React.FC<{ f: number; at?: number; i: number; x?: number; y?: number;
  z?: number; s?: number; right?: boolean }> =
  ({ f, at = 0, i, x, y = 120, z = 88, s = 1, right = false }) => {
  const r = R.repos[i];
  const lf = f - at;
  if (lf < -2) return null;
  const dx = E(lf, 0, 11, right ? 320 : -320, 0, OUT);
  const o = E(lf, 0, 8, 0, 1, LIN);
  const rk = rock(lf, 11, 2.4, 18);
  const left = x ?? (right ? 560 : 44);
  return (
    <div style={{ position: "absolute", left: left + dx, top: y, zIndex: z, opacity: o,
      transform: `rotate(${rk * 0.2}deg)`, display: "flex", alignItems: "stretch", gap: 0,
      borderRadius: 16 * s, overflow: "hidden", border: `4px solid #241F17`, boxShadow: SH_D }}>
      {/* ⭐ the repo's OWN mark where it publishes one, GitHub only where it
          does not. Scrapling's is pulled from its docs/assets/logo.png. */}
      <div style={{ background: "#FFFFFF", padding: `${9 * s}px ${12 * s}px`,
        display: "flex", alignItems: "center" }}>
        <Img src={staticFile("logos/" + (r.logo || "github.svg"))}
          style={{ width: 52 * s, height: 52 * s, objectFit: "contain" }} />
      </div>
      <div style={{ background: "#F2EDE0", padding: `${9 * s}px ${16 * s}px`,
        display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <span style={{ ...mono(23 * s, 800), color: "#241F17", letterSpacing: "-0.01em",
          whiteSpace: "nowrap" }}>{r.name}</span>
        <span style={{ ...mono(16 * s, 700), color: "#7E7768", whiteSpace: "nowrap" }}>
          {r.kind} · {r.lic}</span>
      </div>
      <div style={{ background: "#241F17", padding: `${9 * s}px ${18 * s}px`,
        display: "flex", alignItems: "center", gap: 8 * s }}>
        <span style={{ ...mono(24 * s, 900), color: GOLD }}>★</span>
        <span style={{ ...mono(26 * s, 900), color: "#F7F5F0", whiteSpace: "nowrap" }}>
          {r.starsText}</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S0 · THE PAY GATE — the villain's first body.

   ⛔⛔ THIS REPLACED A TRIPOD TURNSTILE, AND THE REASON IS THE ONLY ONE THAT
   MATTERS: a tripod turnstile's SILHOUETTE is a post with three bars radiating
   off it, and at 200px on a phone that is a SIGNPOST. Reel 110 spent three
   rounds on the same defect — *"it's still not that clear that it's lifting
   weights"* — and the finding was that an object is recognised by its
   silhouette before any of its surface detail is read.

   ⭐ A BARRED GATE ACROSS THE ARCH reads instantly, and it pays three ways at
   once: the market behind is a BRIGHT field cut into stripes by DARK bars,
   which is the biggest value spread in the frame (§8: brightness is the mean,
   hierarchy is the spread); the bars give the hook a vertical structure to
   shove against; and when it BURSTS the two leaves swing out of frame, which
   is a far bigger travel than an arm shearing off.

   ~34 drawn parts: two leaves of seven bars each on top and bottom rails with
   a diagonal brace and a kick plate, a centre stile with a coin head, a slot,
   a reject cup and a signal lamp, two hinge posts with three collars apiece,
   and a contact shadow under the whole span.
   ---------------------------------------------------------------------- */
export const PayGate: React.FC<{ x0: number; x1: number; yTop: number; yBot: number;
  f: number; z?: number; /** 0..1 of the shove */ push?: number;
  /** frame the gate bursts open; -1 = never */ burst?: number; c?: string }> =
  ({ x0, x1, yTop, yBot, f, z = 46, push = 0, burst = -1, c = "#79838F" }) => {
  const open = burst >= 0 && f >= burst;
  const lf = f - (burst < 0 ? 0 : burst);
  const swing = open ? E(lf, 0, 20, 0, 1, OUT) : 0;
  const h = yBot - yTop, half = (x1 - x0) / 2;
  const leaf = (side: 1 | -1) => {
    /* the shove flexes the leaf; the burst throws it right out of frame */
    const flex = push * 9 * side;
    const sw = swing * 96 * side;
    const sx = swing * 470 * side;
    return (
      <div key={"lf" + side} style={{ position: "absolute",
        left: side < 0 ? 0 : half, top: 0, width: half, height: h,
        transformOrigin: side < 0 ? "0% 50%" : "100% 50%",
        transform: `translateX(${sx}px) rotate(${(flex + sw) * 0.16}deg) skewX(${flex * 0.5 + sw * 0.4}deg)` }}>
        {/* top and bottom rails */}
        {[0, h - 20].map((ry, i) => (
          <div key={"rl" + i} style={{ position: "absolute", left: 0, right: 0, top: ry,
            height: 20, borderRadius: 4,
            background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.44)} 100%)`,
            border: `3px solid ${dkh(c, 0.60)}` }} />
        ))}
        {/* seven bars — 22px on a ~40px gap, so the lit market reads THROUGH */}
        {Array.from({ length: 7 }, (_, i) => (
          <div key={"br" + i} style={{ position: "absolute", left: 16 + i * ((half - 44) / 6.4),
            top: 20, width: 22, height: h - 38, borderRadius: 11,
            background: `linear-gradient(90deg, ${mxh(c, 0.34)} 0%, ${c} 40%, ${dkh(c, 0.50)} 100%)` }} />
        ))}
        {/* the diagonal brace every real gate leaf has */}
        <div style={{ position: "absolute", left: 12, top: h * 0.34, width: half - 34, height: 11,
          borderRadius: 6, transformOrigin: side < 0 ? "0% 50%" : "100% 50%",
          transform: `rotate(${side * 11}deg)`, background: dkh(c, 0.26) }} />
        {/* the kick plate, which is what a shove actually lands on */}
        <div style={{ position: "absolute", left: 10, right: 10, top: h * 0.66, height: 42,
          borderRadius: 5, background: `linear-gradient(178deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.40)} 100%)`,
          border: `3px solid ${dkh(c, 0.56)}` }}>
          {[0.22, 0.5, 0.78].map((k, i) => (
            <div key={"kb" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 8,
              bottom: 8, width: 5, background: hexa("#000000", 0.26) }} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div style={{ position: "absolute", left: x0, top: yTop, width: x1 - x0, height: h, zIndex: z }}>
      {/* the contact shadow under the whole span */}
      <div style={{ position: "absolute", left: 20, top: h - 12, right: 20, height: 34,
        borderRadius: "50%", background: hexa("#0A0D12", 0.40) }} />
      {leaf(-1)}
      {leaf(1)}
      {/* the two hinge posts, cropped into the piers */}
      {[-26, x1 - x0 - 12].map((hx, i) => (
        <div key={"hp" + i} style={{ position: "absolute", left: hx, top: -14, width: 38,
          height: h + 26, borderRadius: 5,
          background: `linear-gradient(90deg, ${mxh(c, 0.22)} 0%, ${dkh(c, 0.54)} 100%)` }}>
          {[0.14, 0.5, 0.86].map((k, j) => (
            <div key={"hc" + j} style={{ position: "absolute", left: -5, right: -5,
              top: `${k * 100}%`, height: 18, background: dkh(c, 0.44) }} />
          ))}
        </div>
      ))}
      {/* ⭐ THE CENTRE STILE — the coin head, the slot, the reject cup and the
          signal lamp. This is the villain's face and it stays lit red until the
          gate bursts, when it goes green. It never dims in between: the villain
          is undefeated in this scene. */}
      <div style={{ position: "absolute", left: half - 46 + swing * 0, top: h * 0.16,
        width: 92, height: h * 0.62, borderRadius: 10, zIndex: 6, opacity: open ? 1 - swing : 1,
        background: `linear-gradient(178deg, ${mxh(c, 0.36)} 0%, ${dkh(c, 0.44)} 100%)`,
        border: `5px solid ${dkh(c, 0.62)}` }}>
        <div style={{ position: "absolute", left: 12, top: 14, width: 64, height: 44,
          borderRadius: 7, background: `linear-gradient(180deg, ${mxh("#C08A3E", 0.34)} 0%, ${dkh("#C08A3E", 0.30)} 100%)`,
          border: `4px solid ${dkh("#C08A3E", 0.52)}` }}>
          <div style={{ position: "absolute", left: 20, top: 16, width: 26, height: 8,
            borderRadius: 4, background: "#12161D" }} />
        </div>
        <div style={{ position: "absolute", left: 22, top: 68, width: 44, height: 20,
          borderRadius: "0 0 8px 8px", background: dkh("#C08A3E", 0.58) }} />
        <div style={{ position: "absolute", left: 26, top: 102, width: 36, height: 36,
          borderRadius: "50%", background: open ? "#4FBF8B" : "#D8452F",
          border: `5px solid ${dkh(c, 0.66)}` }} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S0 · THE PRICE GANTRY — a split-flap board hung over the street.
   ⭐ A HEADLINE FLIPS LETTER BY LETTER (ANIMATION-QUALITY §4's translation
   table): the digits do not fade in, each cell rolls, so the number ARRIVES.
   ---------------------------------------------------------------------- */
export const SplitFlap: React.FC<{ x: number; y: number; text: string; f: number;
  at?: number; s?: number; z?: number; c?: string; fg?: string; cell?: number;
  /** ⛔ SET THIS INSIDE A FLEX ROW. The board is `position: absolute` by
      default, so dropping it into a centred flex row pins it to the row's
      top-left and every sibling lays out as if it were not there — which is
      exactly how reel 115's hook ended up with the digits jammed hard left and
      a lone `$` floating in the middle of an empty cream slab. */
  inline?: boolean }> =
  ({ x, y, text, f, at = 0, s = 1, z = 70, c = "#1B1F27", fg = "#F7F5F0", cell = 44,
     inline = false }) => {
  const chars = text.split("");
  const cw = cell * s, ch = cell * 1.44 * s;
  return (
    <div style={{ position: inline ? "relative" : "absolute",
      left: inline ? undefined : x, top: inline ? undefined : y,
      zIndex: z, display: "flex", gap: 4 * s }}>
      {chars.map((ct, i) => {
        const lf = f - at - i * 2;
        /* ⛔ THE SETTLED STATE IS `lf < 0`, NOT A PLACEHOLDER. v1 returned "8"
           for every cell before its flip started, so at frame 0 — the one frame
           guaranteed to be seen — the whole board read `888888`. THE-OPEN law 4:
           frame 0 must be SETTLED and readable. Pass a negative `at` to have a
           board already resolved when the scene opens. */
        /* ⛔⛔ A HALF-FLIPPED PRICE IS A WRONG PRICE. v1 substituted "8"/"0"/"5"
           through the roll to fake intermediate characters, so a frame strip of
           the hook reads `08,800`, `04,-08`, `10,-08` — nonsense numbers on the
           one board the whole claim rests on, held for seven frames each. A
           real split-flap shows a flap EDGE-ON between characters, which is
           unreadable rather than wrong. The cell now squashes to nothing and
           carries no glyph until it lands. */
        const roll = lf < 0 || lf >= 7 ? 0 : 1 - Math.abs(lf - 3.2) / 3.4;
        const flip = roll;
        const shown = lf < 0 || lf >= 6 ? ct : "";
        return (
          <div key={"sf" + i} style={{ position: "relative", width: cw, height: ch,
            borderRadius: 4 * s, background: c, border: `${2 * s}px solid ${dkh(c, 0.5)}`,
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            transform: `scaleY(${1 - flip * 0.94})` }}>
            <span style={{ ...mono(cell * 0.86 * s, 900), color: fg, lineHeight: 1 }}>{shown}</span>
            {/* the hinge line every split-flap cell has */}
            <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2 * s,
              background: hexa("#000000", 0.55) }} />
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3 * s,
              background: hexa("#FFFFFF", 0.08) }} />
          </div>
        );
      })}
    </div>
  );
};

/** the gantry the board hangs from: two legs, a truss, four hanger rods, a
    hood, and a maintenance walkway — so it is a STRUCTURE, not a floating sign */
export const Gantry: React.FC<{ y?: number; f: number; z?: number; c?: string;
  children?: React.ReactNode; span?: [number, number] }> =
  ({ y = 78, f, z = 68, c = "#828C99", children, span = [64, 948] }) => {
  const sway = Math.sin(f / 37) * 1.1;
  return (<>
    {/* the truss */}
    {/* ⛔ THE GANTRY IS GALVANISED STEEL, NOT A BLACK BAR. Three full-width
        dark rails across the top of the panel cost frame 0 four whole luma
        points on their own — measured on a row profile, not guessed. A lit
        street lights its own signage gantry, so this is a paint that was
        WRONG, not a gate being gamed. */}
    <div style={{ position: "absolute", left: span[0], top: y, width: span[1] - span[0],
      height: 24, zIndex: z, background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.30)} 100%)`,
      border: `3px solid ${dkh(c, 0.58)}`, borderRadius: 4 }}>
      {Array.from({ length: 14 }, (_, i) => (
        <div key={"tz" + i} style={{ position: "absolute", left: 8 + i * 64, top: 3, width: 3,
          height: 18, background: dkh(c, 0.30), transform: `rotate(${i % 2 ? 26 : -26}deg)` }} />
      ))}
    </div>
    {/* two legs, cropped by the panel top */}
    {[span[0] + 8, span[1] - 32].map((lx, i) => (
      <div key={"gl" + i} style={{ position: "absolute", left: lx, top: -40, width: 26,
        height: y + 44, zIndex: z - 1,
        background: `linear-gradient(90deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.50)} 100%)` }} />
    ))}
    {/* the hanger rods + the hood the board sits under */}
    <div style={{ position: "absolute", left: span[0] + 90, top: y + 22,
      width: span[1] - span[0] - 180, height: 9, zIndex: z,
      transform: `rotate(${sway * 0.12}deg)`, transformOrigin: "50% 0%",
      background: dkh(c, 0.40), borderRadius: 3 }} />
    <div style={{ position: "absolute", left: span[0] + 78, top: y + 31,
      width: span[1] - span[0] - 156, height: 9, zIndex: z + 3, borderRadius: 3,
      background: `linear-gradient(180deg, ${mxh(c, 0.34)} 0%, ${dkh(c, 0.26)} 100%)` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: z + 2,
      transform: `rotate(${sway * 0.1}deg)`, transformOrigin: "50% 12%" }}>{children}</div>
  </>);
};

/* -------------------------------------------------------------------------
   S0/S3 · A PRICE-TAGGED CRATE and its TAG.
   The crate is the street's unit: a body, an extruded top face, four battens,
   two dished latches, a louvred vent, a stencil panel and a contact shadow.
   ---------------------------------------------------------------------- */
export const PriceTag: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  rot?: number; o?: number; dead?: boolean }> =
  ({ x, y, t, s = 1, z = 64, rot = -8, o = 1, dead = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `rotate(${rot}deg)`, transformOrigin: "8px 8px" }}>
    {/* the string */}
    <div style={{ position: "absolute", left: 8 * s, top: -26 * s, width: 2 * s, height: 28 * s,
      background: "#7E7768" }} />
    <div style={{ display: "flex", alignItems: "center", gap: 7 * s,
      padding: `${7 * s}px ${14 * s}px ${7 * s}px ${20 * s}px`, borderRadius: 7 * s,
      background: dead ? "#6E6A61" : "#F4EFE1", border: `${3 * s}px solid ${dead ? "#4A4740" : "#B9A87E"}`,
      boxShadow: SH }}>
      <div style={{ position: "absolute", left: 5 * s, top: 5 * s, width: 9 * s, height: 9 * s,
        borderRadius: "50%", background: "#8E877A" }} />
      <span style={{ ...mono(22 * s, 900), color: dead ? "#B6B1A6" : "#8E2F22",
        textDecoration: dead ? "line-through" : undefined, whiteSpace: "nowrap" }}>{t}</span>
    </div>
  </div>
);

export const Box: React.FC<{ x: number; y: number; w?: number; f?: number; z?: number;
  c?: string; rot?: number; o?: number; label?: string; s?: number; lit?: number }> =
  ({ x, y, w = 130, f = 0, z = 40, c = "#8A6A44", rot = 0, o = 1, label, s = 1, lit = 1 }) => {
  const ww = w * s, hh = w * 0.78 * s;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, opacity: o, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", left: ww * 0.05, top: hh * 0.9, width: ww * 0.9,
        height: hh * 0.2, borderRadius: "50%", background: hexa("#0A0D12", 0.36) }} />
      {/* the extruded top face */}
      <div style={{ position: "absolute", left: ww * 0.07, top: -hh * 0.12, width: ww * 0.93,
        height: hh * 0.2, background: mxh(c, 0.34 * lit),
        clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)" }} />
      {/* the body */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 4 * s,
        background: `linear-gradient(94deg, ${mxh(c, 0.14 * lit)} 0%, ${c} 46%, ${dkh(c, 0.36)} 100%)`,
        border: `${3 * s}px solid ${dkh(c, 0.48)}` }} />
      {/* four battens */}
      {[0.12, 0.86].map((k, i) => (
        <div key={"bv" + i} style={{ position: "absolute", left: ww * k, top: hh * 0.06,
          width: ww * 0.055, height: hh * 0.88, background: dkh(c, 0.26) }} />
      ))}
      {[0.14, 0.72].map((k, i) => (
        <div key={"bh" + i} style={{ position: "absolute", left: ww * 0.06, top: hh * k,
          width: ww * 0.88, height: hh * 0.07, background: dkh(c, 0.22) }} />
      ))}
      {/* two dished latches + a louvred vent */}
      {[0.26, 0.66].map((k, i) => (
        <div key={"lt" + i} style={{ position: "absolute", left: ww * k, top: hh * 0.40,
          width: ww * 0.09, height: hh * 0.14, borderRadius: 2 * s, background: mxh("#6E6A61", 0.2),
          border: `${2 * s}px solid ${dkh("#6E6A61", 0.4)}` }} />
      ))}
      <div style={{ position: "absolute", left: ww * 0.40, top: hh * 0.66, width: ww * 0.22,
        height: hh * 0.16, background: dkh(c, 0.42), borderRadius: 2 * s, overflow: "hidden" }}>
        {[0, 1, 2].map(i => (
          <div key={"lv" + i} style={{ position: "absolute", left: 0, right: 0,
            top: `${18 + i * 28}%`, height: "12%", background: mxh(c, 0.10) }} />
        ))}
      </div>
      {label && (
        <div style={{ position: "absolute", left: ww * 0.18, top: hh * 0.20, width: ww * 0.64,
          height: hh * 0.16, borderRadius: 2 * s, background: "#EDE6D6",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(hh * 0.11, 900), color: "#3A342A", letterSpacing: "0.04em" }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   ⭐⭐⭐ THE FIVE THINGS THAT BREAK THE GATE — AS BRANDS, NOT AS OBJECTS.

   ⛔ Alex, round 3: *"those icons at 3 seconds actually need to be brands or
   something that people recognize, like claude, chatgpt, gemini, logos like
   that, rather than just random objects."*

   ⛔⛔ AND THIS IS THE SECOND TIME THE SAME SHOT HAS BEEN WRONG IN OPPOSITE
   DIRECTIONS, WHICH IS THE USEFUL PART. v1 was five brown crates: *"too plain
   and dull."* v2 was five hand-drawn objects — a pass book, a cord coil, a
   grabber claw — which fixed "plain" and failed the thing that actually
   matters at 1.5x speed on a phone: **a viewer does not decode a drawn object
   in half a second, they RECOGNISE A MARK.** Craft on the object was the wrong
   axis. Recognition is the axis.

   ⛔⛔ EVERY MARK BELOW WAS VERIFIED AGAINST THAT REPO'S OWN README TODAY, and
   the tile carries the repo NAME under it, so the mark says what the thing is
   ABOUT and the strip says what it IS:
     0  figma      free-for-dev lists Figma's free tier (3 hits, Design and UI)
     1  youtube    public-apis indexes the YouTube API (4 hits, Video)
     2  scrapling  its OWN logo, pulled from docs/assets/logo.png today
     3  ollama     its own mark
     4  claude     MCP is Anthropic's protocol (123 hits in that README), and
                   it is the audience filter Alex named first
   ⛔ NO INVENTED ASSOCIATIONS. A mark that is not in the repo does not go on
   the tile, however recognisable it is.

   ⭐ AND THE v2 LESSON IS KEPT: the five plates are five DIFFERENT COLOURS with
   different tilt, so they are not five identical white squares — which is the
   defect that killed the GitHub tiles in round 2.
   ---------------------------------------------------------------------- */
export const BRAND_DROPS: Array<{ src: string; name: string; c: string }> = [
  { src: "figma.svg",     name: "free-for-dev",  c: "#C4402E" },
  { src: "youtube.svg",   name: "public-apis",   c: "#D9A22E" },
  { src: "scrapling.png", name: "Scrapling",     c: "#8C4A2E" },
  { src: "ollama.svg",    name: "ollama",        c: "#4E6E92" },
  { src: "claude.svg",    name: "awesome-mcp",   c: "#2F8A63" },
];

export const RepoIcon: React.FC<{ x: number; y: number; i: number; s?: number; z?: number;
  rot?: number; f?: number;
  /** 0 = full colour, 1 = priced and greyed out. The flip between them is a
      LARGE AREA changing VALUE in one sample, which is the shape §1's table
      rewards — and it is also the whole idea of the hook. */
  dim?: number;
  /** frame the FREE stamp hits, -1 = never */ free?: number }> =
  ({ x, y, i, s = 1, z = 60, rot = 0, f = 0, dim = 0, free = -1 }) => {
  const D = 186 * s;
  const b = BRAND_DROPS[i];
  const edge = dkh(b.c, 0.52);
  const gone = dim > 0.02;
  const stamped = free >= 0 && f >= free;
  return (
    <div style={{ position: "absolute", left: x - D / 2, top: y - D / 2, width: D, height: D * 1.24,
      zIndex: z, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", left: D * 0.06, top: D * 1.16, width: D * 0.88,
        height: D * 0.18, borderRadius: "50%", background: hexa("#0A0D12", 0.34) }} />
      {/* the coloured carrier — five different colours, so five tiles are never
          five identical white squares (the round-2 defect, restated) */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 20 * s,
        background: gone
          ? `linear-gradient(168deg, #7E8288 0%, #55595F 48%, #33363B 100%)`
          : `linear-gradient(168deg, ${mxh(b.c, 0.26)} 0%, ${b.c} 48%, ${dkh(b.c, 0.34)} 100%)`,
        border: `${6 * s}px solid ${gone ? "#26292D" : edge}`, boxShadow: SH_D }} />
      {/* the mark, on white, filling most of the face — this is the whole point */}
      <div style={{ position: "absolute", left: D * 0.12, top: D * 0.10, width: D * 0.76,
        height: D * 0.76, borderRadius: 14 * s, background: gone ? "#9A9DA2" : "#FFFFFF",
        border: `${4 * s}px solid ${gone ? "#7E8288" : "#E8E2D2"}`, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/" + b.src)}
          style={{ width: D * 0.52, height: D * 0.52, objectFit: "contain",
            filter: gone ? "grayscale(1) opacity(0.42)" : undefined }} />
      </div>
      {/* ⭐ THE FREE STAMP. It does not fade on — it lands, oversized and
          rotated, and settles. An arrival that appears is a state change. */}
      {stamped && (() => {
        const lf = f - free;
        const k = E(lf, 0, 6, 1.55, 1, OUT);
        return (
          <div style={{ position: "absolute", left: D * 0.06, top: D * 0.30, width: D * 0.88,
            height: D * 0.34, borderRadius: 8 * s, zIndex: 6,
            transform: `rotate(-13deg) scale(${k})`, transformOrigin: "50% 50%",
            opacity: E(lf, 0, 4, 0, 1, LIN),
            border: `${6 * s}px solid #1E5C42`, background: hexa("#F7F2E4", 0.94),
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ ...mono(D * 0.20, 900), color: "#1E5C42", letterSpacing: "0.14em" }}>
              FREE</span>
          </div>
        );
      })()}
      {/* the name strip: the mark says what it is ABOUT, this says what it IS */}
      <div style={{ position: "absolute", left: D * 0.06, top: D * 0.92, right: D * 0.06,
        height: D * 0.24, borderRadius: 8 * s, background: "#14171C",
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(D * 0.115, 900), color: "#F4EFE1", whiteSpace: "nowrap" }}>
          {b.name}</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   ⭐ THE HERO ARTIFACT · THE FIVE-SLOT RACK.
   It is EMPTY at S1 and must read while it is still empty (reel 110: *"an
   empty container must still read, and a SET element must differ from its
   room"*) — so it is slate-green against every warm set it appears in, with
   bright cream slot beds and a numbered header rail.
   ---------------------------------------------------------------------- */
export const SlotRack: React.FC<{ x: number; y: number; w?: number; f: number; z?: number;
  /** which slots are filled: an array of frames, -1 = never */ fill: number[];
  s?: number; total?: string }> =
  ({ x, y, w = 720, f, z = 54, fill, s = 1, total }) => {
  const body = "#31544C";
  const hh = 210 * s, ww = w * s;
  const pitch = (ww - 28 * s) / 5;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh, zIndex: z }}>
      <div style={{ position: "absolute", left: ww * 0.04, top: hh * 0.95, width: ww * 0.92,
        height: 32 * s, borderRadius: "50%", background: hexa("#080B0A", 0.42) }} />
      {/* the carcass */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(178deg, ${mxh(body, 0.22)} 0%, ${dkh(body, 0.34)} 100%)`,
        border: `${5 * s}px solid ${dkh(body, 0.52)}` }} />
      {/* the header rail */}
      <div style={{ position: "absolute", left: 8 * s, top: 8 * s, right: 8 * s, height: 34 * s,
        borderRadius: 5 * s, background: dkh(body, 0.46), display: "flex",
        alignItems: "center", justifyContent: "space-between", padding: `0 ${14 * s}px` }}>
        <span style={{ ...mono(20 * s, 900), color: mxh(body, 0.62), letterSpacing: "0.10em" }}>FREE RACK</span>
        {total && <span style={{ ...mono(22 * s, 900), color: GOLD }}>★ {total}</span>}
      </div>
      {/* five slots */}
      {R.repos.map((r, i) => {
        const at = fill[i];
        const on = at >= 0 && f >= at;
        const lf = f - at;
        const drop = on ? E(lf, 0, 9, -260, 0, OUT) : 0;
        const sq = on ? squash(lf, 9, 0.20, 3, 12) : 1;
        return (
          <div key={"sl" + i} style={{ position: "absolute", left: 14 * s + i * pitch,
            top: 52 * s, width: pitch - 12 * s, height: hh - 74 * s, borderRadius: 6 * s,
            background: dkh(body, 0.62), border: `${3 * s}px solid ${dkh(body, 0.72)}`,
            overflow: "hidden" }}>
            {/* the slot bed — bright, so an EMPTY slot is a cream plate, never a hole */}
            <div style={{ position: "absolute", left: 6 * s, right: 6 * s, bottom: 6 * s,
              height: 16 * s, borderRadius: 3 * s, background: mxh(body, 0.44) }} />
            <div style={{ position: "absolute", left: 6 * s, right: 6 * s, top: 6 * s,
              height: 10 * s, borderRadius: 3 * s, background: hexa("#FFFFFF", 0.14) }} />
            <span style={{ position: "absolute", left: 10 * s, top: 20 * s, ...mono(18 * s, 900),
              color: mxh(body, 0.50) }}>{i + 1}</span>
            {on && (
              <div style={{ position: "absolute", left: 8 * s, right: 8 * s, top: 30 * s,
                bottom: 26 * s, borderRadius: 5 * s, background: "#F2EDE0",
                transform: `translateY(${drop}px) scaleY(${sq})`, transformOrigin: "50% 100%",
                border: `${3 * s}px solid #C6BCA2`, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4 * s }}>
                <div style={{ width: pitch * 0.40, height: pitch * 0.40, borderRadius: 8 * s,
                  background: "#FFFFFF", border: `${2 * s}px solid #E4DECE`, display: "flex",
                  alignItems: "center", justifyContent: "center" }}>
                  <Img src={staticFile("logos/github.svg")}
                    style={{ width: pitch * 0.26, height: pitch * 0.26, objectFit: "contain" }} />
                </div>
                <span style={{ ...mono(15 * s, 900), color: "#8E2F22" }}>★{r.starsText}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* -------------------------------------------------------------------------
   S2 · THE PIGEONHOLE WALL — stall 1, `free-for-dev`.
   14 columns x 6 rows of holes, each with a cream ticket in it, each hole with
   a shadowed mouth, a lip and a hand-written column letter. The EJECT is a
   left-to-right wave: the ticket travels out on its own arc with a spin, and
   the empty hole behind it goes dark. Tickets are 52x40 so they survive the
   1012->240 downsample.
   ---------------------------------------------------------------------- */
export const PigeonWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; eject?: number; c?: string }> =
  ({ x, y, w, h, f, z = 30, eject = -1, c = "#2A5548" }) => {
  const COLS = 14, ROWS = 6;
  const cw = w / COLS, chh = h / ROWS;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {/* the carcass + its top rail */}
      <div style={{ position: "absolute", inset: -10, borderRadius: 8,
        background: `linear-gradient(176deg, ${mxh(c, 0.16)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `6px solid ${dkh(c, 0.54)}` }} />
      <div style={{ position: "absolute", left: -10, right: -10, top: -30, height: 24,
        borderRadius: 4, background: dkh(c, 0.50) }} />
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS, row = (i / COLS) | 0;
        const px = col * cw, py = row * chh;
        const at = eject < 0 ? -1 : eject + col * 3 + row;
        const on = at >= 0 && f >= at;
        return (
          <div key={"ph" + i} style={{ position: "absolute", left: px + 3, top: py + 3,
            width: cw - 6, height: chh - 6 }}>
            {/* the mouth */}
            <div style={{ position: "absolute", inset: 0, borderRadius: 3,
              background: `linear-gradient(180deg, ${dkh(c, 0.72)} 0%, ${dkh(c, 0.52)} 100%)`,
              border: `2px solid ${dkh(c, 0.60)}` }} />
            {/* the lip that makes it a HOLE and not a square */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5,
              background: mxh(c, 0.26) }} />
            {!on && (
              <div style={{ position: "absolute", left: 4, top: 5, right: 4, bottom: 7,
                borderRadius: 2, background: "#EFE9DA",
                borderLeft: `3px solid #C9BE9F` }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/** the free pass a pigeonhole ejects: a cream ticket with a perforated stub, a
    punched hole, two rule lines and a red FREE overprint. 56x42 at s=1. */
export const PASS_MARKS: Array<[string, string]> = [
  ["figma.svg", "#C4402E"], ["canva.svg", "#4E6E92"], ["vercel.svg", "#2E3640"],
  ["supabase.svg", "#2F8A63"], ["mongodb.svg", "#2F8A63"], ["notion.svg", "#2E3640"],
  ["docker.svg", "#4E6E92"], ["huggingface.svg", "#D9A22E"], ["replicate.svg", "#2E3640"],
  ["n8n.svg", "#C4402E"], ["airtable.svg", "#D9A22E"], ["postgresql.svg", "#4E6E92"],
  ["slack.svg", "#8C4A2E"], ["linear.svg", "#7A6494"],
];

export const Ticket: React.FC<{ x: number; y: number; f: number; at: number; s?: number;
  z?: number; dir?: number; seed?: number }> =
  ({ x, y, f, at, s = 1, z = 58, dir = 1, seed = 0 }) => {
  const lf = f - at;
  if (lf < 0 || lf > 96) return null;
  const t = E(lf, 0, 44, 0, 1, OUT);
  const dx = dir * (60 + rnd(seed, 1) * 190) * t;
  const dy = -(70 + rnd(seed, 2) * 130) * t + (lf * lf) * 0.10;
  const rot = (rnd(seed, 3) - 0.5) * 260 * t;
  const o = lf > 70 ? 1 - (lf - 70) / 26 : 1;
  /* ⛔ 78x62, not 56x42. The old size was 13x10 after the 1012->240 downsample:
     under the floor on BOTH axes, which is why a wall of them read as confetti
     rather than as passes. */
  const ww = 78 * s, hh = 62 * s;
  const [src, band] = PASS_MARKS[seed % PASS_MARKS.length];
  return (
    <div style={{ position: "absolute", left: x + dx - ww / 2, top: y + dy - hh / 2,
      width: ww, height: hh, zIndex: z, opacity: o, transform: `rotate(${rot}deg)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 5 * s, background: "#F7F2E4",
        border: `${3 * s}px solid #C6BCA2`, overflow: "hidden" }}>
        {/* the coloured header band — the category stripe every pass carries */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * 0.24,
          background: band }} />
        {/* the service mark, on white, big enough to be read at speed */}
        <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.32, width: ww * 0.40,
          height: ww * 0.40, borderRadius: 4 * s, background: "#FFFFFF",
          border: `${2 * s}px solid #E4DECE`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          <Img src={staticFile("logos/" + src)}
            style={{ width: ww * 0.29, height: ww * 0.29, objectFit: "contain" }} />
        </div>
        {/* the stub, perforated, with FREE stamped across it */}
        <div style={{ position: "absolute", left: ww * 0.52, top: hh * 0.34, right: ww * 0.06,
          height: hh * 0.22, borderRadius: 2 * s, background: "#1E5C42" }} />
        <div style={{ position: "absolute", left: ww * 0.52, top: hh * 0.64, width: ww * 0.28,
          height: hh * 0.12, borderRadius: 2 * s, background: "#C6BCA2" }} />
        <div style={{ position: "absolute", left: ww * 0.74, top: 0, bottom: 0, width: 0,
          borderLeft: `${2 * s}px dashed #C6BCA2` }} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S3 · A CATEGORY BAY — a lit alcove with real marks on white tiles, a price
   tag that gets ripped off, and a cream FREE plate that drops into its place.
   ---------------------------------------------------------------------- */
export const CatBay: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  at: number; label: string; marks: string[]; z?: number; c?: string; price: string;
  /** the rest of the category's free alternatives, cycled after the swap */
  more?: string[] }> =
  ({ x, y, w, h, f, at, label, marks, z = 40, c = "#2A5548", price, more = [] }) => {
  const lf = f - at;
  const swapped = lf >= 0;
  const tagO = swapped ? Math.max(0, 1 - lf / 5) : 1;
  const tagX = swapped ? E(lf, 0, 22, 0, 560, OUT) : 0;
  const tagY = swapped ? -E(lf, 0, 22, 0, 240, OUT) + lf * lf * 0.5 : 0;
  const plate = swapped ? E(lf, 3, 12, -190, 0, BACK) : -190;
  const litK = swapped ? E(lf, 2, 5, 0.05, 1, OUT) : 0.05;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {/* the alcove: back, side returns, a shelf and a valance */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 6,
        background: `linear-gradient(178deg, ${mxh(c, 0.02 + litK * 0.86)} 0%, ${mxh(c, litK * 0.46)} 100%)`,
        border: `5px solid ${dkh(c, 0.56)}` }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 14, height: "100%",
        background: dkh(c, 0.30) }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: 14, height: "100%",
        background: dkh(c, 0.44) }} />
      <div style={{ position: "absolute", left: 6, right: 6, top: 0, height: 22,
        background: dkh(c, 0.62), borderRadius: "6px 6px 0 0" }} />
      <div style={{ position: "absolute", left: 10, right: 10, bottom: 44, height: 9,
        background: mxh(c, 0.30) }} />
      {/* ⭐ THE FLASH FRAME. A bay is 272x300 = 8% of the panel; flipping its
          WHOLE face from near-black to bone in three frames is LARGE x BRIGHT x
          FAST, which is the only combination §1's table says registers. Changing
          a gradient stop by 0.30 is a state change and measured as one. */}
      {swapped && lf < 5 && (
        <div style={{ position: "absolute", inset: 4, borderRadius: 5,
          background: mxh(c, 0.62), opacity: (1 - lf / 5) * 0.55, zIndex: 30 }} />
      )}
      {/* the marks — and once the bay is lit they CYCLE through the rest of the
          category on a hard 13-frame flip, two big tiles repainting at once */}
      {marks.map((m, i) => {
        const pool = [m, ...more.filter((_, k) => k % marks.length === i)];
        const step = swapped ? Math.floor(Math.max(0, lf - 6) / 13) : 0;
        const cur = pool[step % pool.length];
        const flip = swapped && (Math.max(0, lf - 6) % 13) < 2;
        return (
          <div key={"tm" + i} style={{ transform: `scaleX(${flip ? 0.14 : 1})`,
            transformOrigin: `${(0.30 + i * 0.40) * 100}% 40%` }}>
            <Tile x={w * (0.30 + i * 0.40)} y={h * 0.40} s={Math.min(150, w * 0.40)}
              src={cur} z={6} lit={litK} />
          </div>
        );
      })}
      {/* the bay label, cast into the valance */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 8, textAlign: "center" }}>
        <span style={{ ...mono(Math.max(17, w * 0.075), 900), color: mxh(c, 0.66),
          letterSpacing: "0.06em" }}>{label}</span>
      </div>
      {/* the price tag, ripped off */}
      <div style={{ position: "absolute", left: w * 0.5 - 40 + tagX, top: 30 + tagY,
        opacity: tagO, zIndex: 20 }}>
        <PriceTag x={0} y={0} t={price} s={0.86} rot={-9} />
      </div>
      {/* the cream FREE plate that lands in its place */}
      <div style={{ position: "absolute", left: w * 0.5 - 62, top: 24 + plate, zIndex: 22,
        width: 124, height: 44, borderRadius: 8, background: "#F4EFE1",
        border: "4px solid #241F17", display: "flex", alignItems: "center",
        justifyContent: "center", opacity: swapped ? 1 : 0 }}>
        <span style={{ ...mono(24, 900), color: "#1E5C42", letterSpacing: "0.08em" }}>FREE</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S4 · THE CARD READER on its post — the villain's second body.
   The POST BENDS BEFORE THE READER TEARS FREE: weight is deformation, not size.
   ---------------------------------------------------------------------- */
export const CardReader: React.FC<{ x: number; y: number; f: number; rip: number; s?: number;
  z?: number }> = ({ x, y, f, rip, s = 1, z = 52 }) => {
  const lf = f - rip;
  const bend = E(lf, -14, 0, 0, 1, IO);
  const gone = lf >= 0;
  const flyX = gone ? E(lf, 0, 24, 0, 760, OUT) : 0;
  const flyY = gone ? -E(lf, 0, 24, 0, 190, OUT) + lf * lf * 0.46 : 0;
  const flyR = gone ? lf * 26 : bend * 9;
  const body = "#3C4450";
  return (
    <div style={{ position: "absolute", left: x - 60 * s, top: y - 300 * s, width: 120 * s,
      height: 300 * s, zIndex: z }}>
      {/* the post, bending */}
      <div style={{ position: "absolute", left: 44 * s, top: 74 * s, width: 32 * s,
        height: 226 * s, transformOrigin: "50% 100%", transform: `rotate(${bend * 13}deg) skewX(${-bend * 5}deg)`,
        background: `linear-gradient(90deg, ${mxh(body, 0.24)} 0%, ${dkh(body, 0.44)} 100%)`,
        borderRadius: 5 * s }}>
        <div style={{ position: "absolute", left: -14 * s, bottom: -8 * s, width: 60 * s,
          height: 20 * s, borderRadius: 5 * s, background: dkh(body, 0.52) }} />
        {[0, 1, 2].map(i => (
          <div key={"pr" + i} style={{ position: "absolute", left: 4 * s, top: (40 + i * 52) * s,
            width: 24 * s, height: 5 * s, background: dkh(body, 0.30) }} />
        ))}
      </div>
      {/* the reader head: bezel, screen, keypad, tap ring, cable */}
      <div style={{ position: "absolute", left: 12 * s, top: 0, width: 96 * s, height: 118 * s,
        transform: `translate(${flyX * s}px, ${flyY * s}px) rotate(${flyR}deg)`,
        transformOrigin: "50% 90%" }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: 12 * s,
          background: `linear-gradient(172deg, ${mxh(body, 0.34)} 0%, ${dkh(body, 0.40)} 100%)`,
          border: `${4 * s}px solid ${dkh(body, 0.58)}` }} />
        <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: 72 * s,
          height: 38 * s, borderRadius: 4 * s, background: "#0E1626",
          border: `${2 * s}px solid ${dkh(body, 0.66)}` }}>
          <div style={{ position: "absolute", left: 7 * s, top: 12 * s, width: 40 * s,
            height: 5 * s, background: "#C44A3A" }} />
          <div style={{ position: "absolute", left: 7 * s, top: 23 * s, width: 24 * s,
            height: 4 * s, background: "#4A5566" }} />
        </div>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"kp" + i} style={{ position: "absolute", left: (14 + (i % 3) * 24) * s,
            top: (60 + ((i / 3) | 0) * 18) * s, width: 18 * s, height: 13 * s, borderRadius: 3 * s,
            background: mxh(body, 0.18) }} />
        ))}
        {/* the trailing cable — a torn thing keeps its wire */}
        {gone && (
          <div style={{ position: "absolute", left: 46 * s, top: 110 * s, width: 4 * s,
            height: 120 * s, background: dkh(body, 0.66),
            transform: `rotate(${-14 + Math.sin(lf / 3) * 16}deg)`, transformOrigin: "50% 0%" }} />
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S5 · THE PATCH BAY — stall 2, `public-apis`.
   A wall of jack rows. A cord is authored with OVERLAPPING ACTION (§13): the
   loom leads, the cord follows on ONE ease, and the plug end swings behind the
   cord's own velocity, then rings out as a damped pendulum. Never stepped.
   ---------------------------------------------------------------------- */
export const JackWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; c?: string; live?: number; rows?: number; spread?: number }> =
  ({ x, y, w, h, f, z = 28, c = "#604724", live = -1, rows = 9, spread = 7 }) => {
  const COLS = 16;
  const rh = h / rows, cw = w / COLS;
  const scanY = ((f * 13) % (h + 190)) - 130;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      overflow: "hidden", borderRadius: 8 }}>
      <div style={{ position: "absolute", inset: -12, borderRadius: 8,
        background: `linear-gradient(176deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.44)} 100%)`,
        border: `6px solid ${dkh(c, 0.58)}` }} />
      {Array.from({ length: rows }, (_, r) => {
        const at = live < 0 ? -1 : live + r * spread;
        const on = at >= 0 && f >= at;
        const k = on ? E(f - at, 0, 6, 0, 1, OUT) : 0;
        return (
          <div key={"jr" + r} style={{ position: "absolute", left: 0, top: r * rh, width: w,
            height: rh - 4 }}>
            {/* ⭐ the row's own strip light — the mechanism IS the light source,
                and the completion FLASH is what the audit can see: the whole
                row goes bone for three frames, then settles lit. */}
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
              borderRadius: 4, background: mxh(c, 0.10 + k * 0.34),
              opacity: on ? (f - at < 4 ? 0.94 : 0.34 + k * 0.22) : 0 }} />
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 2, height: 12,
              borderRadius: 6, background: mxh(c, 0.16 + k * 0.70), opacity: 0.5 + k * 0.5 }} />
            {Array.from({ length: COLS }, (_, i) => (
              <div key={"jk" + i} style={{ position: "absolute", left: i * cw + cw * 0.22,
                top: rh * 0.20, width: cw * 0.52, height: rh * 0.52, borderRadius: "50%",
                background: `radial-gradient(circle at 38% 34%, ${dkh(c, 0.30)} 0%, ${dkh(c, 0.78)} 62%, ${mxh(c, 0.20 + k * 0.5)} 100%)`,
                border: `2px solid ${dkh(c, 0.64)}` }} />
            ))}
          </div>
        );
      })}
      {/* the scan band, light AND shadow, feathered — a hard edge reads as
          wallpaper, a feathered one reads as light running down the board */}
      <div style={{ position: "absolute", left: 0, right: 0, top: scanY, height: 104, zIndex: 40,
        background: `linear-gradient(180deg, ${hexa("#FFE7BE", 0)} 0%, ${hexa("#FFE7BE", 0.52)} 48%, ${hexa("#FFE7BE", 0)} 100%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: scanY - 118, height: 86, zIndex: 39,
        background: `linear-gradient(180deg, ${hexa("#000000", 0)} 0%, ${hexa("#000000", 0.40)} 50%, ${hexa("#000000", 0)} 100%)` }} />
    </div>
  );
};

/** ⭐ ONE CORD, WITH OVERLAPPING ACTION. `sub` measured (§13): total path is
    LONGER and max jerk is HALF what a stepped move gives, and it does not read
    as a defect. The pendulum keeps the object moving through exactly the frames
    a stepped version sits still in. */
export const Cord: React.FC<{ f: number; at: number; x0: number; y0: number; x1: number;
  y1: number; c?: string; z?: number; w?: number; dur?: number }> =
  ({ f, at, x0, y0, x1, y1, c = "#E7B24C", z = 44, w = 26, dur = 20 }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const k = (g: number) => E(g, 0, dur, 0, 1, IO);
  const t = k(lf);
  const vel = (k(lf + 1) - k(lf - 1)) * 0.5;
  const ring = lf > dur ? Math.sin((lf - dur) * 0.62) * Math.exp(-(lf - dur) / 6.5) * 30 : 0;
  const px = x0 + (x1 - x0) * t + (-vel * (x1 - x0) * 1.9 + ring);
  const py = y0 + (y1 - y0) * t - Math.sin(t * Math.PI) * 88;
  const len = Math.hypot(px - x0, py - y0);
  const ang = (Math.atan2(py - y0, px - x0) * 180) / Math.PI;
  return (<>
    {/* the cord itself, drawn from the loom to the moving plug */}
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      borderRadius: w / 2, zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.34)} 100%)` }} />
    {/* ⭐ the plug: a barrel, a collar, two pins and a bright cream cheek.
        96x58 so it is 23x14 after the downsample — over the floor twice over,
        and the CREAM face is where the luma delta lives (a dark object flipping
        to dark has ~0 delta whatever its size). */}
    <div style={{ position: "absolute", left: px - 48, top: py - 29, width: 96, height: 58,
      zIndex: z + 2, borderRadius: 9, transform: `rotate(${ang}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.52)} 0%, ${dkh(c, 0.20)} 100%)`,
      border: `4px solid ${dkh(c, 0.46)}` }}>
      <div style={{ position: "absolute", left: 10, top: 9, width: 40, height: 40,
        borderRadius: 6, background: "#F7F2E4" }} />
      {[14, 34].map((py2, i) => (
        <div key={"pi" + i} style={{ position: "absolute", right: -20, top: py2, width: 24,
          height: 12, borderRadius: 3, background: "#E4E9EF" }} />
      ))}
      <div style={{ position: "absolute", left: 58, top: 0, bottom: 0, width: 8,
        background: dkh(c, 0.36) }} />
    </div>
  </>);
};

/** a mechanical counter whose digits ROLL to their value — the number moves to
    its value, it is never typeset at it. */
export const Counter: React.FC<{ x: number; y: number; f: number; at: number; to: string;
  s?: number; z?: number; label?: string; c?: string; dur?: number }> =
  ({ x, y, f, at, to, s = 1, z = 72, label, c = "#1B1F27", dur = 40 }) => {
  const lf = f - at;
  const t = E(lf, 0, dur, 0, 1, OUT);
  const target = parseInt(to.replace(/[^0-9]/g, ""), 10) || 0;
  const cur = Math.round(target * t);
  const txt = lf < 0 ? "0".padStart(to.replace(/[^0-9]/g, "").length, "0")
                     : cur.toLocaleString("en-US");
  const pad = txt.padStart(to.length, " ");
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ display: "flex", gap: 3 * s, padding: `${7 * s}px ${9 * s}px`,
        borderRadius: 7 * s, background: dkh(c, 0.24), border: `${3 * s}px solid ${dkh(c, 0.55)}` }}>
        {pad.split("").map((ch, i) => (
          <div key={"dg" + i} style={{ width: ch === "," ? 12 * s : 27 * s, height: 42 * s,
            borderRadius: 3 * s, background: ch === "," ? "transparent" : "#0E1116",
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            border: ch === "," ? undefined : `${2 * s}px solid ${mxh(c, 0.10)}` }}>
            <span style={{ ...mono(28 * s, 900), color: ch === " " ? "transparent" : "#F4E3B0" }}>
              {ch === " " ? "0" : ch}</span>
            {ch !== "," && <div style={{ position: "absolute", left: 0, right: 0, top: "50%",
              height: 1.6 * s, background: hexa("#000000", 0.6) }} />}
          </div>
        ))}
      </div>
      {label && <div style={{ marginTop: 5 * s, textAlign: "center" }}>
        <span style={{ ...mono(15 * s, 900), color: "#D8CFB6", letterSpacing: "0.12em" }}>{label}</span>
      </div>}
    </div>
  );
};

/* -------------------------------------------------------------------------
   S6/S9 · A DRUM — a category drum on the patch bay, a model drum on the
   generator shed. ⛔ §12: a dark face flipping to a dark face has ~0 luma
   delta, so the flip face is CREAM. The drum is 200px so it survives the
   downsample with room to spare.
   ---------------------------------------------------------------------- */
export const Drum: React.FC<{ x: number; y: number; s?: number; f: number; at: number;
  z?: number; c?: string; label?: string; mark?: string; rate?: number }> =
  ({ x, y, s = 1, f, at, z = 48, c = "#7A5C2E", label, mark, rate = 9 }) => {
  const lf = f - at;
  const on = lf >= 0;
  const spin = on ? E(lf, 0, 16, 0, 1, OUT) : 0;
  const kick = on ? squash(lf, 2, 0.20, 3, 12) : 1;
  const d = 200 * s;
  /* the drum's face flips: six slats, each showing cream on the lit half */
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d, width: d, height: d,
      zIndex: z, transform: `scale(${kick})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: d * 0.06, top: d * 0.92, width: d * 0.88,
        height: d * 0.18, borderRadius: "50%", background: hexa("#0A0D12", 0.40) }} />
      {/* the shell */}
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: `radial-gradient(circle at 34% 28%, ${mxh(c, 0.34)} 0%, ${c} 46%, ${dkh(c, 0.46)} 100%)`,
        border: `${6 * s}px solid ${dkh(c, 0.58)}`, overflow: "hidden" }}>
        {/* eight slats turning — the bright faces are what the audit sees */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 + (on ? f * rate * spin : 0)) % 360;
          const lit = Math.cos((a * Math.PI) / 180) > 0;
          return (
            <div key={"sl" + i} style={{ position: "absolute", left: "50%", top: "50%",
              width: d * 0.86, height: d * 0.16, marginLeft: -d * 0.43, marginTop: -d * 0.08,
              transform: `rotate(${a}deg)`, borderRadius: 3 * s,
              background: lit ? "#F2EDE0" : dkh(c, 0.54), opacity: lit ? 0.94 : 0.9 }} />
          );
        })}
        {/* the hub */}
        {/* ⛔ THE HUB MARK WAS 17% OF THE DRUM — 30px, which is 7px after the
            audit's downsample and unreadable on a phone. It is the thing the
            scene is naming, so it is now 46% of the drum on a white boss. */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: d * 0.56,
          height: d * 0.56, marginLeft: -d * 0.28, marginTop: -d * 0.28, borderRadius: "50%",
          background: mark ? "#FFFFFF" : `radial-gradient(circle at 36% 32%, ${mxh(c, 0.44)} 0%, ${dkh(c, 0.52)} 100%)`,
          border: `${5 * s}px solid ${dkh(c, 0.66)}`, display: "flex", alignItems: "center",
          justifyContent: "center" }}>
          {mark && <Img src={staticFile("logos/" + mark)}
            style={{ width: d * 0.36, height: d * 0.36, objectFit: "contain",
              filter: on ? undefined : "grayscale(1) opacity(0.45)" }} />}
        </div>
      </div>
      {/* the cradle it sits in */}
      <div style={{ position: "absolute", left: d * 0.10, top: d * 0.80, width: d * 0.80,
        height: d * 0.22, borderRadius: `0 0 ${d * 0.2}px ${d * 0.2}px`,
        background: dkh(c, 0.62), zIndex: -1 }} />
      {label && (
        <div style={{ position: "absolute", left: -d * 0.1, top: d * 1.00, width: d * 1.2,
          textAlign: "center" }}>
          <span style={{ ...mono(18 * s, 900), color: on ? "#F2EDE0" : "#8E877A",
            letterSpacing: "0.06em" }}>{label}</span>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   S7/S10 · THE METER — the villain's body, and the only object that recurs.
   A cast case, a glass, a dial with a needle and a scale, a coin head, a
   nameplate, a supply conduit and two wall bolts. `dead` shears the face and
   free-spins the needle to rest.
   ---------------------------------------------------------------------- */
export const Meter: React.FC<{ x: number; y: number; s?: number; f: number; z?: number;
  label?: string; dead?: number; rate?: number; c?: string;
  /** a real mark on the case face — WHICH subscription this meter is */
  mark?: string }> =
  ({ x, y, s = 1, f, z = 50, label = "$300/mo", dead = -1, rate = 6, c = "#6E6A61", mark }) => {
  const isDead = dead >= 0 && f >= dead;
  const lf = f - dead;
  /* alive: the needle sweeps and never rests. dead: it free-spins DOWN to rest. */
  const ang = isDead
    ? E(lf, 0, 30, 130 + Math.sin(dead / rate) * 34, -46, OUT) + rock(lf, 30, 7, 22)
    : 130 + Math.sin(f / rate) * 34;
  const sag = isDead ? E(lf, 4, 26, 0, 13, BACK) : 0;
  const faceGone = isDead && lf > 3;
  const ww = 150 * s, hh = 190 * s;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `rotate(${sag}deg)`, transformOrigin: "22% 12%" }}>
      {/* the supply conduit up out of frame */}
      <div style={{ position: "absolute", left: ww * 0.44, top: -hh * 0.55, width: 15 * s,
        height: hh * 0.58, background: dkh(c, 0.56), borderRadius: 3 * s }} />
      {/* case */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 10 * s,
        background: `linear-gradient(168deg, ${mxh(c, 0.26)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `${5 * s}px solid ${dkh(c, 0.58)}` }} />
      {[0.10, 0.90].map((k, i) => (
        <div key={"wb" + i} style={{ position: "absolute", left: ww * k - 8 * s, top: hh * 0.10,
          width: 16 * s, height: 16 * s, borderRadius: "50%", background: dkh(c, 0.64),
          border: `${2 * s}px solid ${mxh(c, 0.22)}` }} />
      ))}
      {/* the glass + dial */}
      <div style={{ position: "absolute", left: ww * 0.16, top: hh * 0.14, width: ww * 0.68,
        height: ww * 0.68, borderRadius: "50%", overflow: "hidden",
        background: faceGone ? "#14171C"
          : `radial-gradient(circle at 34% 28%, #FBF6E8 0%, #E4DCC6 66%, #C4BBA2 100%)`,
        border: `${5 * s}px solid ${dkh(c, 0.62)}` }}>
        {!faceGone && <>
          {Array.from({ length: 11 }, (_, i) => (
            <div key={"tk" + i} style={{ position: "absolute", left: "50%", top: "50%",
              width: 3 * s, height: ww * 0.30, marginLeft: -1.5 * s, marginTop: -ww * 0.30,
              transformOrigin: "50% 100%", transform: `rotate(${-124 + i * 25}deg)`,
              background: i > 7 ? "#8E2F22" : "#5B5346" }} />
          ))}
          <div style={{ position: "absolute", left: "50%", top: "62%", transform: "translateX(-50%)" }}>
            <span style={{ ...mono(14 * s, 900), color: "#5B5346" }}>{label}</span>
          </div>
        </>}
        {/* the needle */}
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 5 * s,
          height: ww * 0.30, marginLeft: -2.5 * s, marginTop: -ww * 0.30,
          transformOrigin: "50% 100%", transform: `rotate(${ang}deg)`,
          background: faceGone ? "#5B5346" : "#8E2F22", borderRadius: 2 * s }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 16 * s,
          height: 16 * s, marginLeft: -8 * s, marginTop: -8 * s, borderRadius: "50%",
          background: "#3A342A" }} />
      </div>
      {mark && (
        <div style={{ position: "absolute", left: ww * 0.10, top: -hh * 0.50, width: ww * 0.80,
          height: hh * 0.50, borderRadius: 12 * s, background: isDead ? "#8E9093" : "#FFFFFF",
          border: `${5 * s}px solid ${isDead ? "#5E6062" : "#E4DECE"}`,
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: SH }}>
          <Img src={staticFile("logos/" + mark)}
            style={{ width: ww * 0.52, height: ww * 0.52, objectFit: "contain",
              filter: isDead ? "grayscale(1) opacity(0.45)" : undefined }} />
        </div>
      )}
      {/* the neck that joins the mark panel to the case, so it is ONE object */}
      {mark && (
        <div style={{ position: "absolute", left: ww * 0.30, top: -hh * 0.06, width: ww * 0.40,
          height: hh * 0.10, background: dkh(c, 0.44) }} />
      )}
      {!mark && (
        <div style={{ position: "absolute", left: ww * 0.28, top: hh * 0.76, width: ww * 0.44,
          height: hh * 0.10, borderRadius: 4 * s, background: dkh("#C08A3E", 0.20),
          border: `${3 * s}px solid ${dkh("#C08A3E", 0.48)}` }}>
          <div style={{ position: "absolute", left: "36%", top: "34%", width: "28%", height: "32%",
            background: "#171B22", borderRadius: 2 * s }} />
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
   S8 · THE BOT CHECK — a scanner gantry with a drop-arm and a readout.
   ⭐ §10: A SCAN THAT SURFACES NOTHING IS A PROGRESS BAR. This one flags what
   it catches (three blocked bots go red and are swatted back) and its readout
   goes visibly EMPTY on the hero, which is the whole point of the repo.
   ---------------------------------------------------------------------- */
export const Checkpoint: React.FC<{ x: number; y: number; w: number; f: number; z?: number;
  lift: number; c?: string }> =
  ({ x, y, w, f, z = 44, lift, c = "#5A2018" }) => {
  const lf = f - lift;
  const arm = E(lf, 0, 14, 0, -74, OUT);
  const post = "#4A4E56";
  return (
    <div style={{ position: "absolute", left: x, top: y - 300, width: w, height: 320, zIndex: z }}>
      {/* two posts with base plates */}
      {[0, w - 44].map((px, i) => (
        <div key={"cp" + i} style={{ position: "absolute", left: px, top: 0, width: 44,
          height: 300, borderRadius: 5,
          background: `linear-gradient(90deg, ${mxh(post, 0.24)} 0%, ${dkh(post, 0.46)} 100%)`,
          border: `3px solid ${dkh(post, 0.60)}` }}>
          <div style={{ position: "absolute", left: -12, bottom: -10, width: 68, height: 22,
            borderRadius: 5, background: dkh(post, 0.56) }} />
          {[0, 1, 2, 3].map(j => (
            <div key={"cr" + j} style={{ position: "absolute", left: 6, top: 40 + j * 58,
              width: 32, height: 6, background: dkh(post, 0.30) }} />
          ))}
        </div>
      ))}
      {/* the head beam + the readout */}
      <div style={{ position: "absolute", left: 0, top: -8, width: w, height: 40, borderRadius: 5,
        background: `linear-gradient(180deg, ${mxh(post, 0.30)} 0%, ${dkh(post, 0.44)} 100%)`,
        border: `3px solid ${dkh(post, 0.62)}` }} />
      {/* the drop-arm, hinged at the left post */}
      <div style={{ position: "absolute", left: 40, top: 150, width: w - 76, height: 20,
        borderRadius: 5, transformOrigin: "6px 50%", transform: `rotate(${arm}deg)`,
        background: `repeating-linear-gradient(90deg, #E8E2D2 0px, #E8E2D2 34px, #A8321F 34px, #A8321F 68px)`,
        border: "3px solid #2A2620" }}>
        <div style={{ position: "absolute", right: -10, top: -6, width: 26, height: 30,
          borderRadius: 4, background: dkh(post, 0.30) }} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
   S9 · THE GENERATOR — a pull-cord unit with a firebox, a flywheel, a tank,
   a muffler and a frame. The hero's yank is a real distance and the release
   OVERSHOOTS his standing height (§12: the overshoot is why it reads).
   ---------------------------------------------------------------------- */
export const Generator: React.FC<{ x: number; y: number; s?: number; f: number; fire: number;
  z?: number; c?: string }> = ({ x, y, s = 1, f, fire, z = 46, c = "#5A6068" }) => {
  const on = f >= fire;
  const lf = f - fire;
  const shake2 = on ? Math.sin(lf * 2.3) * 2.2 * Math.exp(-lf / 60) + Math.sin(lf * 0.9) * 1.1 : 0;
  const glow = on ? E(lf, 0, 10, 0, 1, OUT) : 0;
  const ww = 300 * s, hh = 220 * s;
  return (
    <div style={{ position: "absolute", left: x - ww / 2, top: y - hh, width: ww, height: hh,
      zIndex: z, transform: `translate(${shake2}px, ${shake2 * 0.4}px)` }}>
      <div style={{ position: "absolute", left: ww * 0.04, top: hh * 0.93, width: ww * 0.92,
        height: 34 * s, borderRadius: "50%", background: hexa("#060A10", 0.46) }} />
      {/* the frame: four tubes */}
      <div style={{ position: "absolute", left: 0, top: hh * 0.20, width: ww, height: hh * 0.78,
        borderRadius: 10 * s, border: `${9 * s}px solid ${dkh(c, 0.60)}` }} />
      {/* the tank */}
      <div style={{ position: "absolute", left: ww * 0.10, top: hh * 0.06, width: ww * 0.80,
        height: hh * 0.30, borderRadius: 12 * s,
        background: `linear-gradient(172deg, ${mxh(c, 0.34)} 0%, ${c} 46%, ${dkh(c, 0.42)} 100%)`,
        border: `${4 * s}px solid ${dkh(c, 0.56)}` }}>
        <div style={{ position: "absolute", left: "44%", top: -10 * s, width: 40 * s,
          height: 20 * s, borderRadius: 5 * s, background: dkh(c, 0.48) }} />
      </div>
      {/* the firebox — the scene's warm key, and it is a PRACTICAL */}
      <div style={{ position: "absolute", left: ww * 0.16, top: hh * 0.44, width: ww * 0.34,
        height: hh * 0.34, borderRadius: 8 * s, overflow: "hidden",
        background: on
          ? `linear-gradient(180deg, ${mxh("#FFC98A", 0.5 * glow)} 0%, #C4571F 70%, #7A2E0E 100%)`
          : "#20242A",
        border: `${5 * s}px solid ${dkh(c, 0.62)}` }}>
        {on && Array.from({ length: 5 }, (_, i) => (
          <div key={"fl" + i} style={{ position: "absolute", left: `${8 + i * 19}%`,
            bottom: -6, width: "16%", height: `${34 + Math.abs(Math.sin(lf / 4 + i)) * 46}%`,
            borderRadius: "50% 50% 0 0", background: i % 2 ? "#FFE0A8" : "#FF9A46", opacity: 0.9 }} />
        ))}
        {/* the grate bars, in front of the fire */}
        {[0, 1, 2, 3].map(i => (
          <div key={"gb" + i} style={{ position: "absolute", left: `${12 + i * 22}%`, top: 0,
            bottom: 0, width: 7 * s, background: dkh(c, 0.70) }} />
        ))}
      </div>
      {/* the flywheel */}
      <div style={{ position: "absolute", left: ww * 0.58, top: hh * 0.42, width: ww * 0.30,
        height: ww * 0.30, borderRadius: "50%", overflow: "hidden",
        background: `radial-gradient(circle at 34% 30%, ${mxh(c, 0.36)} 0%, ${dkh(c, 0.52)} 100%)`,
        border: `${6 * s}px solid ${dkh(c, 0.66)}` }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"fs" + i} style={{ position: "absolute", left: "50%", top: "50%",
            width: ww * 0.24, height: 10 * s, marginLeft: -ww * 0.12, marginTop: -5 * s,
            transformOrigin: "50% 50%",
            transform: `rotate(${i * 30 + (on ? lf * 17 : 0)}deg)`,
            background: i % 2 ? "#F2EDE0" : dkh(c, 0.34), opacity: 0.9 }} />
        ))}
      </div>
      {/* the muffler + its exhaust */}
      <div style={{ position: "absolute", left: ww * 0.80, top: hh * 0.26, width: ww * 0.16,
        height: hh * 0.16, borderRadius: 6 * s, background: dkh(c, 0.46),
        border: `${3 * s}px solid ${dkh(c, 0.64)}` }} />
    </div>
  );
};

/* -------------------------------------------------------------------------
   S11/S12 · THE PLUG WALL — stall 5, `awesome-mcp-servers`.
   The wall's own signal lamps are the light source, so the mechanism and the
   practical are the same object (reel 113's rail, restated).
   ---------------------------------------------------------------------- */
export const PlugWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; c?: string; wave?: number; from?: [number, number] }> =
  ({ x, y, w, h, f, z = 26, c = "#1F4C3E", wave = -1, from = [0.5, 0.5] }) => {
  const COLS = 8, ROWS = 5;
  const cw = w / COLS, chh = h / ROWS;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: -12, borderRadius: 8,
        background: `linear-gradient(176deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.42)} 100%)`,
        border: `6px solid ${dkh(c, 0.56)}` }} />
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS, row = (i / COLS) | 0;
        const d = Math.hypot(col / COLS - from[0], (row / ROWS - from[1]) * 0.7);
        const at = wave < 0 ? -1 : wave + d * 62;
        const on = at >= 0 && f >= at;
        const k = on ? E(f - at, 0, 7, 0, 1, OUT) : 0;
        return (
          <div key={"pw" + i} style={{ position: "absolute", left: col * cw + 4,
            top: row * chh + 4, width: cw - 8, height: chh - 8, borderRadius: 5,
            background: `linear-gradient(170deg, ${mxh(c, 0.06 + k * 0.30)} 0%, ${dkh(c, 0.40)} 100%)`,
            border: `2px solid ${dkh(c, 0.58)}` }}>
            {/* two pin holes and an earth — a socket, not a square */}
            {[0.26, 0.62].map((px, j) => (
              <div key={"pn" + j} style={{ position: "absolute", left: `${px * 100}%`, top: "22%",
                width: Math.max(11, cw * 0.13), height: Math.max(22, chh * 0.26), borderRadius: 3,
                background: dkh(c, 0.80) }} />
            ))}
            <div style={{ position: "absolute", left: "38%", top: "60%",
              width: Math.max(16, cw * 0.20), height: Math.max(11, chh * 0.15), borderRadius: 3,
              background: dkh(c, 0.80) }} />
            {/* the faceplate screws — what makes a rectangle read as a SOCKET */}
            {[[0.06, 0.10], [0.88, 0.10], [0.06, 0.82], [0.88, 0.82]].map((q, j) => (
              <div key={"sc" + j} style={{ position: "absolute", left: `${q[0] * 100}%`,
                top: `${q[1] * 100}%`, width: 9, height: 9, borderRadius: "50%",
                background: dkh(c, 0.62) }} />
            ))}
            {/* the signal lamp — this is the room's light */}
            <div style={{ position: "absolute", right: 10, top: 10, width: Math.max(15, cw * 0.13),
              height: Math.max(15, cw * 0.13), borderRadius: "50%",
              background: k > 0 ? mxh("#9CF0C4", k * 0.55) : dkh(c, 0.68) }} />
          </div>
        );
      })}
    </div>
  );
};

/** a destination socket that LIGHTS A REAL MARK when its cable lands. ⛔ reel
    110: abstract lights on wires measured 13.93 and depicted nothing. The mark
    is what turns a light show into a mechanism. */
export const Dest: React.FC<{ x: number; y: number; f: number; at: number; src: string;
  s?: number; z?: number; label?: string; flip?: boolean }> =
  ({ x, y, f, at, src, s = 1, z = 66, label, flip = false }) => {
  const lf = f - at;
  const on = lf >= 0;
  const sq = on ? squash(lf, 0, 0.34, 3, 13) : 1;
  const rk = on ? rock(lf, 2, 6.5, 16) : 0;
  const d = 132 * s;
  return (
    <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2, width: d, height: d,
      zIndex: z, transform: `scale(${sq}) rotate(${rk * 0.35}deg)` }}>
      <div style={{ position: "absolute", inset: on ? 0 : d * 0.20, borderRadius: 14 * s,
        background: on ? "#F4EFE1" : hexa("#0E1F19", 0.34),
        border: `${on ? 5 * s : 3 * s}px solid ${on ? "#241F17" : hexa("#0A1A14", 0.42)}` }} />
      {on && (flip ? lf > 6 : true) && (
        <Img src={staticFile("logos/" + src)}
          style={{ position: "absolute", left: d * 0.18, top: d * 0.18, width: d * 0.64,
            height: d * 0.64, objectFit: "contain" }} />
      )}
      {!on && <div style={{ position: "absolute", left: d * 0.38, top: d * 0.46, width: d * 0.24,
        height: d * 0.08, borderRadius: 3 * s, background: hexa("#08150F", 0.5) }} />}
      {label && on && <div style={{ position: "absolute", left: -d * 0.3, top: d * 1.02,
        width: d * 1.6, textAlign: "center" }}>
        <span style={{ ...mono(15 * s, 900), color: "#C8EFD8" }}>{label}</span>
      </div>}
    </div>
  );
};

/* -------------------------------------------------------------------------
   COSTUMES + THE CREW. All twelve levers, cycled DETERMINISTICALLY — a
   re-render must be identical, so there is no Math.random anywhere.
   ---------------------------------------------------------------------- */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { prof: 1 }, { glasses: 1 }, { suit: 1 }, { chef: 1 }, { beard: 1 },
  { girl: 1 }, { fro: 1 }, { cop: 1 }, { wizard: 1 }, { samurai: 1 }, { stern: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

/** ⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE — four loops, chosen by index,
    each on its own phase and rate, so a crowd is doing four things at once.
    ⛔ AND AN ACTION LOOP IS NOT A SCENE (reel 110). This is what the market
    does WHILE the scene happens; the hero still has to have an EVENT. */
export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; at?: number; loop?: number; tint?: string; flip?: boolean }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 4;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) {                                  /* PACE */
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {                           /* WORK */
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {                           /* HOP */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else {                                        /* LOOK */
    gaze = Math.sin(f / 21 + ph) * 1.0;
    rot = Math.sin(f / 21 + ph) * 4.2;
    nod = 5.2;
  }
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy, width: size,
      height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f + i * 9} size={size} gaze={gaze} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={cheer} tint={tint} {...costumeFor(i)} />
    </div>
  );
};

/** ⭐⭐ THE HERO. §12: name what the CLAUDE DOES. `strain` drives a real
    DEFORMATION (he compresses and spreads under load), `lean` is a whole-body
    drive with distance, and past halfway a FAST SMALL TREMBLE — the opposite
    of a slow sway — says effort. ⛔ The body rotation stays under 8° because
    ±15° on a 300px hero is toppling over, not straining. */
export const Hero: React.FC<{ f: number; x: number; y: number; size: number; z?: number;
  /** 0..1 of the drive */ drive?: number; /** 0..1 of the load */ strain?: number;
  flip?: boolean; costume?: Record<string, number>; gaze?: number; cheer?: number;
  /** how far the drive travels, px */ reach?: number; tint?: string;
  /** 0..1 — `Mascot`'s own flinch lever, for a per-impact expression beat */
  shock?: number; /** 0..1 — the scowl */ stern?: number; /** a scale pop */ pop?: number;
  /** which of the four action loops he runs BETWEEN his authored beats:
      0 PACE · 1 WORK · 2 HOP · 3 LOOK */ act?: number;
  /** phase offset, so two heroes in a reel never run in lockstep */ ph?: number }> =
  ({ f, x, y, size, z = 56, drive = 0, strain = 0, flip = false, costume = { constr: 1 },
     gaze = 0, cheer = 0, reach = 96, tint, shock = 0, stern = 0, pop = 1,
     act = 1, ph = 0 }) => {
  /* ⭐⭐⭐ THE HERO HAS AN ACTION LOOP TOO, AND NOT HAVING ONE WAS THE DEFECT.
     Alex: *"why is that claude sprite guy in the suit on the right not moving,
     same with the other scenes as well."*

     `Crew` has run the four action loops since reel 107 — it is §5's single
     biggest measured lift in this repo — and `Hero` never did. So every scene's
     HERO, the one sprite a viewer is actually watching, stood perfectly still
     whenever its authored beat was not firing. Counted across this reel that is
     **100 of 132 frames in S1** (the suited Claude at 5s, exactly the one he
     saw), 116 of 146 in S5, 140 of 165 in S12 and 100 of 136 in S8.

     ⛔ THE LOOP YIELDS TO THE BEAT. Its amplitude scales to zero as drive or
     strain rise, so an authored action always wins outright and the loop only
     ever fills the gaps — it can never fight the thing the scene is about.
     ⛔ AND THE AMPLITUDE HAS TO BE BIG ENOUGH TO SEE: measured, 1.15deg / 1.7px
     registers as "never static" on a metric and READS as static to a human.
     2.6deg / 4.6px with a second slower harmonic is the floor that shows. */
  const beat = Math.min(1, Math.max(Math.abs(drive), strain) * 1.7);
  const k = 1 - beat;
  let ax = 0, ay = 0, ar = 0, aGaze = 0, aCheer = 0;
  if (act === 0) {                                   /* PACE — walks, with a stride lift */
    ax = Math.sin(f / 17 + ph) * size * 0.20 * k;
    ay = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.042 * k;
    ar = Math.cos(f / 17 + ph) * 3.2 * k;
  } else if (act === 1) {                            /* WORK — leans in on a beat */
    ar = (4.5 + Math.sin(f / 6.2 + ph) * 6.5) * k;
    ay = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.038 * k;
    ax = Math.sin(f / 6.2 + ph) * size * 0.048 * k;
  } else if (act === 2) {                            /* HOP — jumps, cheers at the apex */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    ay = -j * size * 0.19 * k;
    aCheer = j > 0.55 ? k : 0;
    ar = Math.sin(f / 26 + ph) * 2.6 * k;
  } else {                                           /* LOOK — turns its head, double-takes */
    aGaze = Math.sin(f / 21 + ph) * 1.0 * k;
    ar = Math.sin(f / 21 + ph) * 4.0 * k;
  }
  /* and a breathing idle UNDER all four, so nothing is ever perfectly still */
  ay += Math.sin(f / 23 + ph) * 4.6 * k;
  ar += Math.sin(f / 31 + ph * 1.7) * 1.3 * k;

  const tremble = strain > 0.5 ? Math.sin(f * 1.9) * 3.4 * (strain - 0.5) * 2 : 0;
  const sy = 1 - strain * 0.16;
  const sx = 1 + strain * 0.12;
  const dx = (flip ? -1 : 1) * (drive * reach + ax) + tremble;
  const dy = strain * size * 0.05 + ay;
  const rot = (flip ? -1 : 1) * (drive * 7 - strain * 2 + ar);
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy,
      width: size, height: size, zIndex: z,
      transform: `scale(${sx * pop * (flip ? -1 : 1)}, ${sy * pop}) rotate(${rot}deg)`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={size} gaze={gaze + aGaze} nodAmp={2.6 + strain * 2 + k * 1.4}
        nodSpeed={10} cheer={Math.max(cheer, aCheer)} tint={tint} shock={shock}
        stern={stern} {...costume} />
    </div>
  );
};

/** ⛔ READ THE RIG BEFORE YOU DRAW GEOMETRY. `Mascot` draws its own arms; the
    only limb geometry that survives is a forearm that STARTS on the mascot's
    own arm and ENDS on the thing it is holding — a limb terminating in mid-air
    reads as a TAIL. Both ends of this one are on screen by construction. */
export const Forearm: React.FC<{ x0: number; y0: number; x1: number; y1: number;
  w?: number; c?: string; z?: number }> =
  ({ x0, y0, x1, y1, w = 22, c = "#C4674A", z = 58 }) => {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  return (
    <div style={{ position: "absolute", left: x0, top: y0 - w / 2, width: len, height: w,
      borderRadius: w / 2, zIndex: z, transformOrigin: "0% 50%", transform: `rotate(${ang}deg)`,
      background: `linear-gradient(180deg, ${mxh(c, 0.18)} 0%, ${dkh(c, 0.22)} 100%)` }}>
      {/* the hand — sized to the forearm, not a ball on a stick */}
      <div style={{ position: "absolute", right: -w * 0.10, top: -w * 0.08, width: w * 1.05,
        height: w * 1.08, borderRadius: "42%", background: dkh(c, 0.10) }} />
    </div>
  );
};
