import React from "react";
import { Img, staticFile, useCurrentFrame, AbsoluteFill } from "remotion";
import { inter, fraunces } from "./fonts";
import { Panel, hexA, MONO } from "./SlopKit";
/* ⛔ THE SPRITE AND THE MATHS HELPERS COME FROM REEL 94, NOT A COPY. `Claudie` is
   the SlopKit `Mascot` verbatim and can only emit the one house clay #D97757 —
   re-implementing either here would re-open two settled rounds. */
export { Claudie, CLAY, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, Contact, Plinth } from "./AgyWorld";
/* ⛔ `export ... from` RE-EXPORTS WITHOUT BINDING LOCALLY. The line above makes
   `Claudie` available to importers of this file but NOT to this file, so the
   Hoplite could not see it. Import what you use, separately. */
import { E, hexa, mix, dark, LIN, OUT, BACK, IO, Claudie } from "./AgyWorld";
import { CamCtx } from "./AgyWorld";

/* =========================================================================
   REEL 97 "FREE" · THE PRICE-PLATE KIT.  Board: storyboards/97-free.md.

   ⛔⛔ WHY THERE IS NO GENRE WORLD HERE.
   Reel 86 CANCEL is this exact premise (paid apps -> free replacements). It
   burned THREE hook sets and FIFTEEN scenes on genre worlds — toll plaza,
   supermarket, subway, night city, billing plant, carnival, title fight,
   auction, demolition, pawn shop — and every one was killed with the same note:
   *"in every ritual the app marks were set DRESSING inside somebody else's
   world."*  The conclusion that reel finally shipped is the premise of this kit:

        THE REAL BRAND MARKS ARE THE SET.
        THE MECHANISM IS A PRICE THAT FLIPS TO FREE.
        THE ROOM IS WHATEVER THE TOOL ACTUALLY DOES.

   So this file has no depot, no theatre and no street. It has a lit stage that
   changes colour every 2.3 seconds, one enamel PRICE PLATE that is the hero
   artifact in all ten scenes, and a RAIL that counts.

   ⛔ MATTE, NOT NEON. Solid paints and dark drop shadows. There is no
      `0 0 Npx` box-shadow in this reel and the grep is a ship gate.
   ⛔ NEVER FILTER A BRAND MARK. `grayscale(1) brightness(0.12)` is safe only for
      simple-icons glyphs; reel 86 shipped it over HiggsField's LIME tile and
      Figma's multi-colour mark and turned both into black squares. Marks render
      UNFILTERED on a white tile; if contrast is wrong, change the TILE.
   ========================================================================= */

export const W = 1012, H = 792;
export const SH = "0 10px 22px rgba(14,16,22,0.40)";
export const SH_D = "0 24px 46px rgba(8,10,16,0.52)";
/** the safe rest box once the per-scene push is applied (reel 96: at 1.13 about
    50%/56%, panel x=40 maps to -21 and y=112 lands under the HookHeader). */
export const SAFE = { x0: 90, x1: 922, y0: 150, y1: 776 } as const;

export const RED = "#D5493C", GO = "#3FA07A", AMB = "#E0A542";
export const PAPER = "#F1EEE4", INKD = "#181C22";

/* ---------------------------------------------------------------------------
   THE TEN ROWS. ⛔ ONE NUMBER SPINE — no scene carries a literal price, they all
   read it from here, so the stands and the rail can never disagree.

   ⭐ THE TIER RULE, ROUND 3. Alex: *"use the more expensive tiers for each
   option, for each choice."*  A rule, applied uniformly, not ten separate
   judgement calls: **the SECOND paid tier — the plan you move to when the entry
   plan stops being enough.** Every stand names it (`tier`), so the number on
   screen always says which plan it is and can never read as the cheapest one.

   Basic $10 -> Midjourney STANDARD $30 · Pro $20 -> Perplexity MAX $200 ·
   Creator $29 -> HeyGen PRO $99 · Pro $10 -> Copilot PRO+ $39 · Starter $15 ->
   Higgsfield PLUS $39 · Standard $10 -> Firefly PRO $30 · Essentials $6 ->
   Buffer TEAM $12/channel · Basic $10 -> Framer PRO $30 · ElevenLabs CREATOR $22.
   ⚠️ CapCut has ONE individual paid tier, so PRO $20 is both its entry and its
   ceiling — the rule cannot be applied there and the row is unchanged.
   ⚠️ Firefly Pro is $29.99 and CapCut Pro $19.99; both are shown to the dollar,
   and the total rounds from $520.98.

   Every price verified 2026-08-09 against the vendor's own pricing page.
   ------------------------------------------------------------------------ */
export type Pair = {
  cat: string;                      // the category, as the VO says it
  paid: string; price: number;      // the paid tool + the plan it is priced on
  tier: string;                     // WHICH plan, named on the stand
  free: string;                     // the free replacement
  pLogo: string; fLogo: string;     // public/logos/*
  note: string;                     // the qualifier, where the price needs one
};

export const PAIRS: Pair[] = [
  { cat: "IMAGE CREATION",    paid: "Midjourney",     price: 30, tier: "STANDARD",
    free: "Nano Banana",
    pLogo: "midjourney.png",    fLogo: "googlegemini.svg", note: "" },
  { cat: "AI RESEARCH",       paid: "Perplexity",     price: 200, tier: "MAX",
    free: "Consensus",
    pLogo: "perplexity.svg",    fLogo: "consensus.png",    note: "" },
  { cat: "AVATAR CREATION",   paid: "HeyGen",         price: 99, tier: "PRO",
    free: "Hedra",
    pLogo: "heygen.png",        fLogo: "hedra.png",        note: "" },
  { cat: "CODE GENERATION",   paid: "GitHub Copilot", price: 39, tier: "PRO+",
    free: "Cursor",
    pLogo: "githubcopilot.svg", fLogo: "cursor.svg",       note: "" },
  { cat: "VIDEOS",            paid: "Higgsfield",     price: 39, tier: "PLUS",
    free: "Hailuo",
    pLogo: "higgsfield.png",    fLogo: "hailuo.png",       note: "" },
  { cat: "IMAGE EDITING",     paid: "Adobe Firefly",  price: 30, tier: "PRO",
    free: "Photoroom",
    pLogo: "firefly.png",       fLogo: "photoroom.png",    note: "" },
  /* ⛔ Buffer is priced PER CHANNEL. A bare $12 would be a lie, so this row
     carries the qualifier — the only one that needs one. */
  { cat: "SOCIAL SCHEDULING", paid: "Buffer",         price: 12, tier: "TEAM",
    free: "Publer",
    pLogo: "buffer.svg",        fLogo: "publer.png",       note: "PER CHANNEL" },
  { cat: "WEBSITE BUILDER",   paid: "Framer",         price: 30, tier: "PRO",
    free: "Lovable",
    pLogo: "framer.svg",        fLogo: "lovable.png",      note: "" },
  { cat: "VIDEO EDITING",     paid: "CapCut",         price: 20, tier: "PRO",
    free: "Edits",
    pLogo: "capcut.png",        fLogo: "instagram.svg",    note: "" },
  { cat: "VOICE GENERATION",  paid: "ElevenLabs",     price: 22, tier: "CREATOR",
    free: "MiniMax",
    pLogo: "elevenlabs.svg",    fLogo: "minimax.svg",      note: "" },
];

/** running total after each row: 30 230 329 368 407 437 449 479 499 521 */
export const CUM: number[] = PAIRS.reduce<number[]>(
  (a, p) => [...a, (a[a.length - 1] || 0) + p.price], []);
export const TOTAL = CUM[CUM.length - 1];      // 521

/** ⛔ four marks are low-resolution (heygen 48, firefly 48, capcut 64, hailuo 64
    — nobody publishes them larger). Rendering a 48px bitmap at 150px is the
    difference between a premium reel and a cheap one, so those tiles cap the
    glyph and let the white tile carry the size instead. */
export const MARK_CAP: Record<string, number> = {
  "heygen.png": 62, "firefly.png": 62, "capcut.png": 76, "hailuo.png": 76,
  "consensus.png": 999,
};

/* ---------------------------------------------------------------------------
   TEN ROOMS. The location has to change every 2.3s or ten bars of the same
   sentence become one bar played ten times. Deliberately alternated so no two
   consecutive scenes share a temperature family.
   ------------------------------------------------------------------------ */
export type RoomP = { wall: string; wall2: string; seam: string; floor: string;
  floor2: string; lip: string; key: string; hz: number };

/* ⛔ LIFTED ONCE, DELIBERATELY. The first pass measured panel luma 63-125 with
   the app windows in place, and a reel that is dark UI on a near-black room
   reads as murky in a feed — the same note reel 86 got, where the fix took its
   frame from 105 to 146.6. The lift is on the ROOM, never on the windows: real
   software is dark and making an IDE beige to win a luma gate would be a
   correct calculation over the wrong signal. It also buys the thing the rooms
   exist for — at this brightness the per-scene colour actually reads as a
   change of place rather than as ten shades of black. */
export const ROOMS: RoomP[] = [
  /* 1  plum        */ { wall: "#37273B", wall2: "#1A121F", seam: "#4C3850", floor: "#2F2333", floor2: "#140E18", lip: "#554457", key: "#F6D2EE", hz: 556 },
  /* 2  deep teal   */ { wall: "#163A3C", wall2: "#0A1C1F", seam: "#265054", floor: "#153233", floor2: "#08191A", lip: "#32575A", key: "#B4F2EE", hz: 566 },
  /* 3  oxblood     */ { wall: "#422420", wall2: "#1F0E09", seam: "#57352F", floor: "#371F1C", floor2: "#190C09", lip: "#5D3E38", key: "#F8D0B0", hz: 548 },
  /* 4  slate blue  */ { wall: "#242D3E", wall2: "#10141F", seam: "#374154", floor: "#1F2837", floor2: "#0D111A", lip: "#444D5F", key: "#CCDCF6", hz: 572 },
  /* 5  forest      */ { wall: "#1C3627", wall2: "#0C1913", seam: "#2C4C38", floor: "#1A2E23", floor2: "#0A1510", lip: "#375341", key: "#BEF2CC", hz: 552 },
  /* 6  aubergine   */ { wall: "#2D203A", wall2: "#140E1D", seam: "#41324E", floor: "#261C33", floor2: "#100B18", lip: "#4B3B58", key: "#E2CAFA", hz: 562 },
  /* 7  amber-brown */ { wall: "#412E1A", wall2: "#1D1209", seam: "#554125", floor: "#372716", floor2: "#181009", lip: "#5E4A2F", key: "#F8E0AE", hz: 546 },
  /* 8  petrol      */ { wall: "#192E39", wall2: "#0B161C", seam: "#284452", floor: "#172A33", floor2: "#091316", lip: "#344C58", key: "#BCE6F6", hz: 568 },
  /* 9  burgundy    */ { wall: "#3A1B26", wall2: "#1A0B13", seam: "#4E2A37", floor: "#301721", floor2: "#16090E", lip: "#553541", key: "#F8C4D4", hz: 554 },
  /* 10 pine        */ { wall: "#163327", wall2: "#091912", seam: "#254B3A", floor: "#152E24", floor2: "#081410", lip: "#315341", key: "#B4F0D2", hz: 560 },
  /* 11 CTA · the coolest, flattest room, so the ten lit marks own the frame */
  { wall: "#242930", wall2: "#111318", seam: "#383E45", floor: "#22262B", floor2: "#0E1114", lip: "#41474E", key: "#E4EDF4", hz: 604 },
];

/** ⛔ COLOUR-ONLY palette rotation for trial cuts. `hz` never rotates — every
    prop is positioned against its own horizon and a moved one puts the deck
    through the furniture (reel 96). The metric variants are judged on is mean
    |LUMA delta|, so the lever is a luma shift, not a hue one. */
export const PalCtx = React.createContext(0);
const LEVEL: Array<(c: string) => string> = [(c) => c, (c) => dark(c, 0.24), (c) => mix(c, 0.24)];
export const useRoom = (i: number): RoomP => {
  const p = React.useContext(PalCtx);
  const T = (typeof THEMES !== "undefined" && THEMES[React.useContext(ThemeCtx)]) || null;
  const set = T ? T.rooms : ROOMS;
  const base = set[i];
  if (!p) return base;
  const d = set[(i + p * 4) % set.length];
  const L = LEVEL[p] || ((c: string) => c);
  return { wall: L(d.wall), wall2: L(d.wall2), seam: L(d.seam), floor: L(d.floor),
           floor2: L(d.floor2), lip: L(d.lip), key: d.key, hz: base.hz };
};

/* ---------------------------------------------------------------------------
   THE ROOM. Back wall with courses, a lit lip, a deck in perspective, grit,
   motes and a vignette. Nine layers before a prop lands — a flat fill reads as
   a backdrop, not a place.
   ------------------------------------------------------------------------ */
const g = (a: string, b: string, deg = 176) => `linear-gradient(${deg}deg, ${a} 0%, ${b} 100%)`;

export const Motes: React.FC<{ f: number; c: string; n?: number; z?: number }> =
  ({ f, c, n = 16, z = 30 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 37.1 + k * 11.3) * 4371.7; return v - Math.floor(v); };
    const drift = (f * (0.18 + r(3) * 0.26) + r(1) * 700) % 720;
    return (<div key={"d" + i} style={{ position: "absolute", left: 34 + r(1) * 940,
      top: 96 + ((drift + Math.sin(f / 31 + i) * 12) % 600), width: 3 + (i % 2),
      height: 3 + (i % 2), borderRadius: 999, background: c,
      opacity: 0.18 + r(2) * 0.26, zIndex: z }} />);
  })}
</>);

export const Room: React.FC<{ i: number; f?: number; children?: React.ReactNode;
  dust?: boolean; vig?: number }> = ({ i, f = 0, children, dust = true, vig = 0.80 }) => {
  const p = useRoom(i);
  return (<>
    <div style={{ position: "absolute", inset: 0, background: g(p.wall, p.wall2), zIndex: 1 }} />
    {/* wall courses */}
    {Array.from({ length: 5 }, (_, k) => (
      <div key={"h" + k} style={{ position: "absolute", left: 0, right: 0, top: 40 + k * 96,
        height: 3, background: p.seam, opacity: 0.50, zIndex: 2 }} />
    ))}
    {Array.from({ length: 8 }, (_, k) => (
      <div key={"v" + k} style={{ position: "absolute", left: 18 + k * 140, top: 0, width: 3,
        height: p.hz, background: p.seam, opacity: 0.30, zIndex: 2 }} />
    ))}
    {/* fixing dimples — the detail that says a built surface, not a gradient */}
    {Array.from({ length: 24 }, (_, k) => (
      <div key={"t" + k} style={{ position: "absolute", left: 58 + (k % 8) * 122,
        top: 88 + Math.floor(k / 8) * 140, width: 8, height: 8, borderRadius: 5,
        background: p.wall2, opacity: 0.30, zIndex: 3 }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 9, height: 11,
      background: p.lip, zIndex: 4, boxShadow: "0 3px 12px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
      background: g(p.floor, p.floor2, 184), zIndex: 4 }} />
    {Array.from({ length: 6 }, (_, k) => (
      <div key={"b" + k} style={{ position: "absolute", left: 0, right: 0,
        top: p.hz + 22 + k * (28 + k * 10), height: 2, background: p.lip, opacity: 0.26, zIndex: 5 }} />
    ))}
    {Array.from({ length: 5 }, (_, k) => {
      const x = 120 + k * 200;
      return (<div key={"c" + k} style={{ position: "absolute", left: x, top: p.hz, width: 3,
        height: H - p.hz, background: p.lip, opacity: 0.20, zIndex: 5,
        transform: `skewX(${(x - 506) / 32}deg)`, transformOrigin: "50% 0%" }} />);
    })}
    {dust && <Motes f={f} c={p.key} />}
    {children}
    <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
      background: `radial-gradient(122% 92% at 50% 42%, transparent 42%, ${hexa("#0A0C12", vig)} 100%)` }} />
  </>);
};

/** a SHAPED practical cone. ⛔ never a full-frame fill — reel 78 shipped a
    full-panel tint pulse and it flattened the grade. */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number }> =
  ({ x, y, top = 70, bot = 340, len = 430, c = "#F0D8A0", o = 0.22, z = 20, f = 0 }) => (
  <div style={{ position: "absolute", left: x - bot / 2, top: y, width: bot, height: len, zIndex: z,
    background: `linear-gradient(180deg, ${hexa(c, o * (0.94 + Math.sin(f / 11) * 0.05))} 0%, ${hexa(c, o * 0.10)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** ⛔ THE FRAME-EDGE OCCLUDER — a mass cropped by the panel border, IN FRONT of
    the action. Without it the camera is pointed at a backdrop, not into a room. */
export const Post: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number }> =
  ({ side = "l", c, w: ww = 76, z = 92 }) => {
  const a = side === "l" ? "left" : "right";
  return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: ww, zIndex: z,
      [a]: -12, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [a]: 0, width: ww * 0.24,
        background: dark(c, 0.28) }} />
      <div style={{ position: "absolute", top: 0, bottom: 0,
        [side === "l" ? "right" : "left"]: 0, width: 7, background: mix(c, 0.22) }} />
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 42 + i * 70, [a]: ww * 0.36,
          width: 12, height: 22, borderRadius: 3, background: dark(c, 0.38) }} />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE MARK TILE. A real brand glyph on a white app-tile. This is the SET, not
   decoration, so it is built like a physical object: a plate, a bevel, a
   shadow and a name strip.
   ------------------------------------------------------------------------ */
export const MarkTile: React.FC<{ x: number; y: number; s?: number; logo: string; name?: string;
  z?: number; dim?: number; tilt?: number; plate?: string }> =
  ({ x, y, s = 1, logo, name, z = 60, dim = 0, tilt = 0, plate = "#FFFFFF" }) => {
  const T = 132 * s;
  const cap = MARK_CAP[logo] ?? 999;
  const glyph = Math.min(T * 0.62, cap * s * 1.35);
  return (
    <div style={{ position: "absolute", left: x - T / 2, top: y - T / 2, zIndex: z,
      transform: `rotate(${tilt}deg)`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: T, height: T,
        borderRadius: 26 * s, background: plate, boxShadow: SH_D,
        border: `${3 * s}px solid #E4DED0` }} />
      {/* the bevel — one solid highlight, never a bloom */}
      <div style={{ position: "absolute", left: 7 * s, top: 6 * s, width: T - 14 * s,
        height: 14 * s, borderRadius: 12 * s, background: "#FFFFFF", opacity: 0.72 }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: T, height: T,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* ⛔ UNFILTERED. Never darken a brand mark; change the plate instead. */}
        <Img src={staticFile("logos/" + logo)}
          style={{ width: glyph, height: glyph, objectFit: "contain" }} />
      </div>
      {dim > 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: T, height: T,
          borderRadius: 26 * s, background: "#0B0E14", opacity: dim * 0.62 }} />
      )}
      {name && (
        <div style={{ position: "absolute", left: -30 * s, top: T + 10 * s, width: T + 60 * s,
          textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 25 * s, color: "#F4F1E8", letterSpacing: "0.01em",
          textShadow: "0 2px 7px rgba(0,0,0,0.75)", whiteSpace: "nowrap" }}>{name}</div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   ⭐⭐ THE STAND — one of the two ranked panels. THIS IS THE WHOLE SCENE NOW.

   Alex, round 1: *"each of the scenes needs to be way more hierarchical and just
   have like two panels to show paid vs free. I don't need whole scenes, just two
   simple scenes hierarchically showing each and nothing else basically, and the
   header should just be the category. Way simpler, way more hierarchical."*

   ⛔ THE FIRST BUILD DREW WHAT EACH TOOL DOES — ten product surfaces, a render
   window, an NLE, a week queue. They were good drawings and they were the wrong
   answer: a mock of Midjourney's UI next to a price is INFORMATION, and what
   this script needs is a RANKING. Ten different app windows also meant the one
   thing that repeats (the comparison) was the smallest thing on screen.

   ⛔ "HIERARCHICAL" DOES NOT MEAN DEPTH TIERS. Reel 86 settled this: it means
   the frame must RANK. Two cards of equal size side by side have hierarchy
   ZERO, no matter how well drawn. So the two stands are never equal:

        the WINNER is taller, on paper, spotlit, with a 150px mark
        the LOSER  is shorter, dark, unlit, with a 96px mark

   ⭐ AND THE RANK FLIPS ON THE WORD. "this is paid" -> the paid stand owns the
   frame. "this is free" -> the light swings, the free stand grows past it and
   the paid one sinks and greys. The hierarchy IS the argument, animated.

   ⛔ ONE PANEL STILL. This is two STANDS inside the single house Panel, not a
   dual-screen chassis (reel 52, absolute).
   ⛔ THE MARK TILE STAYS WHITE ON BOTH STANDS. The loser recedes by its PLATE
   going dark, never by a filter over the brand mark.
   ------------------------------------------------------------------------ */
/** ⛔ ONE card size, both stands. Named CARD_* because `SH` is already the
    house drop-shadow constant and reusing it silently shadowed the shadow. */
export const CARD_W = 340, CARD_H = 430;

export const Stand: React.FC<{ cx: number; base: number; win: number; logo: string;
  name: string; price: number; tier?: string; note?: string; free?: boolean;
  punch?: number; strike?: number; z?: number }> =
  ({ cx, base, win, logo, name, price, tier, note, free, punch = 1, strike = 0, z = 60 }) => {
  const w = CARD_W, h = CARD_H;
  const paper = win > 0.5;
  const tile = 140;
  const cap = MARK_CAP[logo] ?? 999;
  const glyph = Math.min(tile * 0.60, cap * 1.30);
  const ink = paper ? "#1B1F26" : "#98A0AA";
  /* ⛔⛔ THE TWO STANDS ARE THE SAME SIZE. Rounds 2 to 6 ranked them by height and
     width — the winner 470 tall on paper, the loser 340 and dark. Alex, round 7:
     *"don't make one smaller one bigger, just make both the same size."*
     The rank did not go away, it MOVED: it is now carried by the DRAPE (one side
     is covered and one is not), by the plate going paper or near-black, and by
     the light. Concealment outranks size — before the pull the paid stand is the
     only thing in the room you can actually see. */
  return (<>
    <div style={{ position: "absolute", left: cx - w / 2 - 18, top: base, width: w + 36,
      height: 28, borderRadius: 6, background: paper ? "#CCC6B6" : "#2C333C", zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: cx - w / 2 - 10, top: base + 24, width: w + 20,
      height: 15, borderRadius: 5, background: paper ? "#A6A092" : "#20262E", zIndex: z - 2 }} />
    <div style={{ position: "absolute", left: cx - w / 2 - 30, top: base + 38, width: w + 60,
      height: 16, borderRadius: 8, background: "#0A0D12", opacity: 0.34, zIndex: z - 3 }} />
    <div style={{ position: "absolute", left: cx - w / 2, top: base - h, width: w, height: h,
      borderRadius: 28, zIndex: z, boxShadow: paper ? SH_D : SH, overflow: "hidden",
      display: "flex", flexDirection: "column",
      background: paper ? "linear-gradient(172deg,#F8F5ED 0%,#E6E1D3 100%)"
                        : "linear-gradient(172deg,#171C23 0%,#0C1016 100%)",
      border: `4px solid ${paper ? "#FFFDF6" : "#242B34"}` }}>
      <div style={{ height: 60, flex: "0 0 auto",
        background: free ? (paper ? "#2C7D5C" : "#233A32") : (paper ? "#C33F32" : "#3A2A2E"),
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 33,
        letterSpacing: "0.22em", color: paper ? "#FFF6EE" : "#8A929C" }}>
        {free ? "FREE" : "PAID"}
      </div>
      <div style={{ flex: "1 1 auto", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-evenly", padding: "8px 12px" }}>
        <div style={{ width: tile, height: tile, borderRadius: tile * 0.22,
          background: "#FFFFFF", border: "3px solid #E4DED0", boxShadow: SH, flex: "0 0 auto",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/" + logo)}
            style={{ width: glyph, height: glyph, objectFit: "contain" }} />
        </div>
        <div style={{ flex: "0 0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40,
            color: ink, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{name}</div>
          {tier && (
            <div style={{ display: "inline-block", marginTop: 7, padding: "3px 11px",
              borderRadius: 5, background: paper ? "#E2DCCC" : "#20262F",
              fontFamily: MONO, fontWeight: 800, fontSize: 17, letterSpacing: "0.16em",
              color: paper ? "#6B6252" : "#69727C" }}>{tier}</div>
          )}
        </div>
        <div style={{ position: "relative", flex: "0 0 auto", textAlign: "center",
          transform: `scale(${punch})`, transformOrigin: "50% 50%" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: 84 * (free ? 1 : String(price).length >= 3 ? 0.80 : 1), lineHeight: 1,
            color: free ? (paper ? "#2C7D5C" : "#63847A") : (paper ? "#C33F32" : "#8A6E72") }}>
            {free ? "FREE" : "$" + price}
            {!free && <span style={{ fontSize: 38 * (String(price).length >= 3 ? 0.82 : 1) }}>{"/mo"}</span>}
          </span>
          {note && (
            <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17,
              letterSpacing: "0.14em", color: paper ? "#9A5148" : "#6E5A5E",
              marginTop: 3 }}>{note}</div>
          )}
          {strike > 0 && !free && (
            <div style={{ position: "absolute", left: "6%", right: "6%", top: 44, height: 9,
              borderRadius: 5, background: "#C33F32", transform: `scaleX(${strike})`,
              transformOrigin: "0% 50%" }} />
          )}
        </div>
      </div>
    </div>
  </>);
};

/* ---------------------------------------------------------------------------
   ⭐⭐ THE DRAPE. Round 7: *"the other side is like a curtain that says FREE,
   then it gets pulled off."*

   This is the best version of the mechanic the reel has had, because it turns
   every one of the ten beats into a REVEAL. Before the pull you know the right
   side is free and you do not know what it IS, which is a question; the old
   version showed both answers immediately and only changed their sizes.

   It also solves the note it came from. Two same-size cards side by side have
   hierarchy zero — but a covered card and an uncovered one do not, and the rank
   still flips on the word: the drape goes up, the free tool is under it, and the
   paid price is struck in the same frame.
   ------------------------------------------------------------------------ */
export const Drape: React.FC<{ cx: number; base: number; pull: number; cloth: string;
  f: number; shake?: number; z?: number }> = ({ cx, base, pull, cloth, f, shake = 0, z = 78 }) => {
  if (pull >= 1) return null;
  const w = CARD_W + 34, h = CARD_H + 34;
  const top = base - CARD_H - 22;
  /* the cloth flies UP and off, so the card is revealed from the BOTTOM — which
     puts the word FREE on screen first. It leans as it goes, the way a real
     unveiling drape does when one corner is pulled harder than the other. */
  const dy = pull * (h + top + 210);
  const rot = pull * -7;
  /* ⭐ THE CLOTH TREMBLES, AND HARDER THE CLOSER THE PULL GETS. Round 8:
     *"the right side FREE section should be shaking too a little and stuff,
     shaking some and like rumbling."*  It is the anticipation beat the reveal
     did not have — something is under there and it wants out, so the cut earns
     the reveal instead of just arriving at it.
     ⛔ TWO FREQUENCIES, NOT ONE. A single sine reads as a float; a fast jitter
     over a slow sway reads as strain. And the cloth BULGES on the same curve,
     because fabric with something behind it pushes out, it does not only slide. */
  const jx = (Math.sin(f * 2.1) * 3.6 + Math.sin(f * 4.7 + 1.2) * 1.9) * shake;
  const jy = (Math.sin(f * 2.9 + 0.7) * 2.7 + Math.sin(f * 6.1) * 1.1) * shake;
  const jr = Math.sin(f * 2.4 + 0.3) * 0.9 * shake;
  const bulge = 1 + Math.abs(Math.sin(f * 1.7)) * 0.022 * shake;
  return (
    <div style={{ position: "absolute", left: cx - w / 2, top,
      width: w, height: h, zIndex: z,
      transform: `translate(${jx}px, ${-dy + jy}px) rotate(${rot + jr}deg) scale(${bulge}, 1)`,
      transformOrigin: "80% 100%" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "16px 16px 4px 4px",
        background: `linear-gradient(174deg, ${mix(cloth, 0.16)} 0%, ${cloth} 46%, ${dark(cloth, 0.72)} 100%)`,
        boxShadow: SH_D, overflow: "hidden" }}>
        {/* ⛔ FOLDS ARE GRADIENTS, NOT STRIPES. Nine hard bars read as a roller
            shutter; six soft ones read as hanging cloth. */}
        {Array.from({ length: 6 }, (_, i) => (
          <div key={"fd" + i} style={{ position: "absolute", left: i * w / 6, top: 0, bottom: 0,
            width: w / 6,
            background: `linear-gradient(90deg, ${dark(cloth, 0.78)} 0%, ${mix(cloth, 0.14)} 46%, ${dark(cloth, 0.86)} 100%)`,
            opacity: 0.55 }} />
        ))}
        {/* the gathered head where the cloth hangs from its rod */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30,
          background: dark(cloth, 0.58) }} />
        {Array.from({ length: 12 }, (_, i) => (
          <div key={"gt" + i} style={{ position: "absolute", left: 4 + i * (w - 8) / 12, top: 4,
            width: (w - 8) / 20, height: 22, borderRadius: 6, background: dark(cloth, 0.44) }} />
        ))}
        {/* ⛔ THE WORD HAS TO SURVIVE THE FOLDS. Cream letters straight onto
            gradient-folded cloth sat at the same value as the fold highlights
            and read as texture. It is printed on a PANEL — which is also how a
            real event drape carries a word — so the letters have one flat
            ground instead of six alternating ones. */}
        {/* ⛔ 132px OVERFLOWED BOTH THE PANEL AND THE CLOTH. "FREE" in Fraunces
            900 runs about 2.5x its font size, so 132 is ~330px inside a 374px
            drape whose printed panel is only 322 — the letters hung off the
            right edge of the curtain. 106 measures ~265 and sits inside both. */}
        <div style={{ position: "absolute", left: "5%", right: "5%", top: "27%", height: "34%",
          borderRadius: 10, background: dark(cloth, 0.58) }} />
        <div style={{ position: "absolute", left: "5%", right: "5%", top: "27%", height: "34%",
          borderRadius: 10, border: `4px solid ${mix(cloth, 0.36)}` }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 98,
          letterSpacing: "0.01em", color: "#FFFBF0", whiteSpace: "nowrap",
          textShadow: "0 6px 0 rgba(0,0,0,0.34)" }}>FREE</div>
      </div>
      {/* the scalloped hem, waving a little while it hangs */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={"hm" + i} style={{ position: "absolute", left: i * w / 8,
          top: h - 12 + Math.sin(f / 17 + i * 0.9) * 3, width: w / 8, height: 30,
          borderRadius: "0 0 50% 50%", background: dark(cloth, 0.74) }} />
      ))}
      {/* ⭐ grit shaken loose off the head of the cloth as the rumble peaks —
          the cheapest possible proof that the shaking has FORCE behind it */}
      {shake > 0.45 && Array.from({ length: 7 }, (_, i) => {
        const r = (k: number) => { const v = Math.sin(i * 51.7 + k * 9.1) * 4371.7; return v - Math.floor(v); };
        const t = ((f * (0.9 + r(2) * 0.8) + r(1) * 40) % 34) / 34;
        return (<div key={"gr" + i} style={{ position: "absolute", left: 12 + r(1) * (w - 24),
          top: -6 + t * 26, width: 3, height: 3, borderRadius: 3, background: "#E8DFC8",
          opacity: (1 - t) * 0.55 * shake }} />);
      })}
      {/* the pull ring on the near corner */}
      <div style={{ position: "absolute", left: w - 34, top: h - 4, width: 30, height: 30,
        borderRadius: 16, border: "7px solid #C9A45C" }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE PRICE PLATE. ⚠️ SUPERSEDED as the hero by `Stand` above — the stands now
   carry the price themselves. Kept because the flip mechanic and the enamel
   treatment are the reference for any future build in this family.
   ------------------------------------------------------------------------ */
export const Plate: React.FC<{ x: number; y: number; s?: number; price: number; note?: string;
  drop: number; flip: number; z?: number }> =
  ({ x, y, s = 1, price, note, drop, flip, z = 84 }) => {
  /* drop: frames since the PAID hit. flip: frames since the FREE hit. */
  const inY = E(drop, 0, 7, -190, 0, OUT);
  const squash = drop >= 0 && drop < 9 ? 1 + Math.sin(Math.min(1, drop / 9) * Math.PI) * 0.10 : 1;
  const rot = E(flip, 0, 9, 0, 180, IO);          // the flip itself
  const face = rot > 90;                           // past the edge -> the FREE face
  const w = 258 * s, h = 112 * s;
  if (drop < 0) return null;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - h / 2 + inY, zIndex: z,
      width: w, height: h, perspective: 900 }}>
      <div style={{ position: "absolute", inset: 0,
        transform: `rotateX(${rot}deg) scaleY(${squash})`, transformStyle: "preserve-3d" }}>
        {/* PAID face */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 14 * s,
          background: face ? "transparent" : "linear-gradient(168deg,#E4584A 0%,#B3352A 100%)",
          border: face ? "none" : `${4 * s}px solid #F0A79C`, boxShadow: face ? "none" : SH_D,
          display: face ? "none" : "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", backfaceVisibility: "hidden" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: (note ? 52 : 60) * s, color: "#FFF6F2", lineHeight: 1,
            textShadow: "0 3px 8px rgba(0,0,0,0.45)" }}>
            {"$" + price}<span style={{ fontSize: 28 * s }}>{"/mo"}</span>
          </span>
          {note && <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
            letterSpacing: "0.16em", color: "#F6C9C2", marginTop: 4 * s }}>{note}</span>}
        </div>
        {/* FREE face — mounted pre-rotated so it reads upright once the plate lands */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 14 * s,
          background: "linear-gradient(168deg,#4CB98D 0%,#2C7D5C 100%)",
          border: `${4 * s}px solid #A6E6C8`, boxShadow: SH_D,
          display: face ? "flex" : "none", alignItems: "center", justifyContent: "center",
          transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
          <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 62 * s,
            letterSpacing: "0.02em", color: "#F2FFF8", lineHeight: 1,
            textShadow: "0 3px 8px rgba(0,0,0,0.42)" }}>FREE</span>
        </div>
      </div>
      {/* the two fixing bolts, so the plate reads as enamel and not as a label */}
      {!face && [0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: i ? w - 26 * s : 14 * s, top: h / 2 - 6 * s,
          width: 12 * s, height: 12 * s, borderRadius: 7 * s, background: "#F0A79C", zIndex: 2 }} />
      ))}
    </div>
  );
};

/** the paywall scrim + padlock that lands with the price and dies with the flip.
    ⛔ a solid paint at low alpha, never a blur — the matte rule. */
export const Gate: React.FC<{ x: number; y: number; w: number; h: number; drop: number;
  flip: number; z?: number; r?: number }> = ({ x, y, w: ww, h: hh, drop, flip, z = 78, r = 18 }) => {
  if (drop < 0) return null;
  const on = flip < 0 ? E(drop, 0, 6, 0, 1, OUT) : E(flip, 0, 6, 1, 0, OUT);
  if (on <= 0.01) return null;
  const shackle = flip < 0 ? 0 : E(flip, 0, 7, 0, 1, OUT);
  return (<>
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, borderRadius: r,
      background: "#0C1018", opacity: on * 0.62, zIndex: z }} />
    {/* hatching, so the scrim reads as a barrier rather than as a dim */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: x, top: y + 12 + i * (hh / 9),
        width: ww, height: 3, background: "#F0D8A0", opacity: on * 0.16, zIndex: z + 1 }} />
    ))}
    <div style={{ position: "absolute", left: x + ww / 2 - 30, top: y + hh / 2 - 26, zIndex: z + 2,
      opacity: on, transform: `translateY(${shackle * -60}px) rotate(${shackle * 34}deg)` }}>
      <div style={{ position: "absolute", left: 12, top: -22, width: 36, height: 34,
        borderRadius: "18px 18px 0 0", border: "8px solid #E8C878", borderBottom: "none" }} />
      <div style={{ position: "absolute", left: 0, top: 10, width: 60, height: 50, borderRadius: 9,
        background: "#E8C878", boxShadow: SH }} />
      <div style={{ position: "absolute", left: 26, top: 28, width: 9, height: 18, borderRadius: 4,
        background: "#6B4A16" }} />
    </div>
  </>);
};

/* ---------------------------------------------------------------------------
   THE RAIL — the escalation, made visible in every single scene. Ten pips, one
   per row, and the running total. ⛔ It COUNTS, it never performs: the plate is
   the hero and the rail may not compete with it.
   ------------------------------------------------------------------------ */
/** how much of the bill is still being paid when row `i` starts */
export const REMAIN: number[] = PAIRS.map((_, i) =>
  TOTAL - PAIRS.slice(0, i).reduce((a, p) => a + p.price, 0));

export const Rail: React.FC<{ idx: number; pf: number; ff: number; z?: number; done?: boolean }> =
  ({ idx, pf, ff, z = 94, done = false }) => {
  /* ⭐ THE BILL IS ON SCREEN AT FRAME 0 AND COUNTS DOWN.
     The first cut had it counting UP from $0, which meant frame 0 — the one
     frame guaranteed to be seen — opened on nothing owed. Starting at the full
     $136 makes the dread object present before a claim is made, gives the
     viewer a reason to stay (ten pips, count them), and turns every "this is
     free" into a visible subtraction instead of a caption. */
  const before = REMAIN[Math.min(idx, REMAIN.length - 1)];
  const after = before - PAIRS[Math.min(idx, PAIRS.length - 1)].price;
  const t = ff < 0 ? 0 : E(ff, 0, 13, 0, 1, OUT);
  /* ⛔ the rail reaches $0 on S10's flip, which IS the peak — the CTA does not
     re-collapse it, it celebrates a number that already landed. */
  const v = done ? 0 : Math.round(before + (after - before) * t);
  const dead = done;
  const bump = ff >= 0 && ff < 10 ? 1 + Math.sin(Math.min(1, ff / 10) * Math.PI) * 0.12 : 1;
  /* ⛔ THE RAIL IS NOW THE SMALLEST THING IN THE FRAME, and that is the point.
     Round 1: *"way more hierarchical ... and nothing else basically."* The ten
     pips and the row counter are gone — the counter moved into the header, and
     a pip strip beside two ranked stands was a third thing competing for rank.
     What survives is the one number the reel is actually about. */
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 706, height: 54, zIndex: z,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 20, letterSpacing: "0.20em",
        color: "#9AA29A" }}>{dead ? "YOU NOW PAY" : "YOU PAY"}</span>
      <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46,
        lineHeight: 1, transform: `scale(${bump})`,
        color: dead || v === 0 ? "#8FE8BE" : "#F0BDB5",
        textShadow: "0 3px 9px rgba(0,0,0,0.6)" }}>
        {"$" + v}<span style={{ fontSize: 24 }}>{"/mo"}</span>
      </span>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE STAGE — one scene's chassis. ⛔ EVERY SCENE CARRIES A SLOW IN-PANEL PUSH.
   Reel 96 boarded "locked camera" literally, measured median motion 5.91 against
   a bar of 9.0 with 7 of 9 scenes failing, and learned that CAMERA-GRAMMAR's
   "locked by default" governs RE-FRAMING (whips, dollies, tilts) — the slow push
   is a separate thing and belongs on every scene.
   ⛔ ANY TRANSFORMED WRAPPER NEEDS AN EXPLICIT zIndex: a transform creates a
      stacking context and reel 93 lost a whole tower to it.
   ------------------------------------------------------------------------ */
export const Stage: React.FC<{ i: number; children: React.ReactNode; push?: [number, number, number];
  dust?: boolean; vig?: number }> = ({ i, children, push = [0, 999, 1.10], dust, vig }) => {
  const f = useCurrentFrame();
  const cam = React.useContext(CamCtx);
  const p = useRoom(i);
  const sc = E(f, push[0], push[1], 1, push[2], LIN);
  return (
    <AbsoluteFill>
      <Panel glow={hexA(p.key, 0.18)}>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, transformOrigin: "50% 56%",
          transform: `translate(${cam.dx}px, ${cam.dy}px) rotate(${cam.rot}deg) scale(${sc * cam.s})` }}>
          <Room i={i} f={f} dust={dust} vig={vig}>{children}</Room>
        </div>
      </Panel>
    </AbsoluteFill>
  );
};

/* ---------------------------------------------------------------------------
   SMALL SHARED PARTS the product surfaces are built from.
   ------------------------------------------------------------------------ */

/** a dark device/app surface — the thing each tool's work happens on. */
export const Slab: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  c?: string; c2?: string; r?: number; children?: React.ReactNode; bar?: string }> =
  ({ x, y, w: ww, h: hh, z = 50, c = "#1B212B", c2 = "#11161E", r = 18, children, bar }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, borderRadius: r,
    background: g(c, c2, 168), boxShadow: SH_D, zIndex: z, overflow: "hidden",
    border: "3px solid rgba(228,224,210,0.18)" }}>
    {bar !== undefined && (<>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36,
        background: "#0E131A", borderBottom: "2px solid rgba(228,224,210,0.14)" }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 14 + i * 20, top: 13, width: 11,
          height: 11, borderRadius: 6, background: ["#D5564A", "#E0A542", "#4CB98D"][i], opacity: 0.85 }} />
      ))}
      <div style={{ position: "absolute", left: 84, top: 10, fontFamily: MONO, fontWeight: 800,
        fontSize: 15, letterSpacing: "0.13em", color: "#8A9299" }}>{bar}</div>
    </>)}
    {children}
  </div>
);

/** a mono chip. ⛔ ONE text chip per shot is the budget; these are for labels
    the picture cannot draw (a file name, a source, a timecode). */
export const Chip: React.FC<{ x: number; y: number; t: string; c?: string; fg?: string;
  z?: number; s?: number }> = ({ x, y, t, c = "#2A313C", fg = "#DCE2DA", z = 70, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, padding: `${6 * s}px ${13 * s}px`,
    borderRadius: 7 * s, background: c, fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
    letterSpacing: "0.10em", color: fg, whiteSpace: "nowrap", boxShadow: SH }}>{t}</div>
);

/** a caret that blinks on a 30fps grid, for the surfaces that type. */
export const Caret: React.FC<{ x: number; y: number; h?: number; f: number; c?: string; z?: number }> =
  ({ x, y, h: hh = 26, f, c = "#F0D8A0", z = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 3, height: hh, background: c,
    opacity: Math.floor(f / 8) % 2 ? 0.25 : 1, zIndex: z }} />
);

/* =========================================================================
   THE FOUR WORLDS.

   ⛔⛔ THIS BLOCK WAS ONCE LOST TO A BAD SPLICE. A python `s[:a] + new + s[b:]`
   whose `b` was found by searching for a marker that sat AFTER this kit deleted
   every theme in one write, and the file had only ever been `git add -N`'d, so
   there was no blob to restore and no source map in any bundler cache. Two rules
   came out of it, both now in the memory brain: COMMIT BEFORE A STRUCTURAL EDIT,
   and never compute a splice end from a marker you have not verified is adjacent.

   Each theme supplies three things and nothing else, so a cut can be judged on
   the world rather than on a rebuild:
     Dress    the room itself, behind everything
     Barrier  what the PAID stand sits behind. This is the argument in objects:
              you cannot have this one without paying.
     Fixture  the practical light that swings to whichever side is winning.
   ⛔ The FREE stand never gets a barrier — it gets the DRAPE, which comes off.
   ========================================================================= */

export type Barrier = React.FC<{ cx: number; base: number; w: number; h: number; dim: number }>;
export type Fixture = React.FC<{ x: number; c: string }>;
export type Theme = {
  id: string; label: string; rooms: RoomP[]; accent: string; vig: number;
  /** the drape cloth for this world */
  cloth: string;
  /** the drape is PULLED OFF by a figure rather than simply rising */
  crew?: boolean;
  Dress: React.FC<{ p: RoomP; f: number }>;
  Barrier: Barrier;
  Fixture: Fixture;
};

export const ThemeCtx = React.createContext(0);
export const useTheme = (): Theme => THEMES[React.useContext(ThemeCtx)] ?? THEMES[0];

/* ---- A · THE GALLERY ----------------------------------------------------
   The paid tool is an exhibit behind glass, behind a rope. The free one stands
   on an open plinth you could walk up to.
   ------------------------------------------------------------------------ */
export const Wing: React.FC<{ p: RoomP; f: number }> = ({ p, f }) => (<>
  {[110, 506, 902].map((cx, i) => (
    <div key={"pn" + i} style={{ position: "absolute", left: cx - 168, top: 96, width: 336,
      height: 366, borderRadius: 4, border: `5px solid ${mix(p.wall, 0.10)}`,
      background: mix(p.wall, 0.05), zIndex: 3 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 72, height: 9,
    background: mix(p.lip, 0.18), zIndex: 4 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 84, height: 4,
    background: dark(p.wall, 0.4), zIndex: 4 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 26, height: 26,
    background: mix(p.wall, 0.14), zIndex: 5 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 30, height: 5,
    background: mix(p.lip, 0.22), zIndex: 6 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, height: 4,
    background: mix(p.lip, 0.30), opacity: 0.5, zIndex: 6 }} />
  {[300, 712].map((x, i) => (
    <div key={"rf" + i} style={{ position: "absolute", left: x - 150, top: p.hz + 6, width: 300,
      height: 128, background: `linear-gradient(180deg, ${hexa(p.lip, 0.24)} 0%, transparent 100%)`,
      zIndex: 6 }} />
  ))}
  <div style={{ position: "absolute", left: 60, right: 60, top: 26, height: 12, borderRadius: 6,
    background: dark(p.wall, 0.52), zIndex: 24 }} />
</>);

export const SpotHead: React.FC<{ x: number; c: string; z?: number }> = ({ x, c, z = 26 }) => (
  <div style={{ position: "absolute", left: x - 26, top: 20, zIndex: z }}>
    <div style={{ position: "absolute", left: 20, top: 0, width: 12, height: 20,
      background: "#2A3038" }} />
    <div style={{ position: "absolute", left: 0, top: 18, width: 52, height: 40,
      borderRadius: "10px 10px 22px 22px", background: "#39424C" }} />
    <div style={{ position: "absolute", left: 8, top: 52, width: 36, height: 12,
      borderRadius: 6, background: c, opacity: 0.9 }} />
  </div>
);

const TrackFixture: Fixture = ({ x, c }) => <SpotHead x={x} c={c} />;

/** ⛔ Glass is two hard highlight streaks and a faint tint. Never a blur, never
    a bloom — the matte rule is a ship gate. */
export const Vitrine: React.FC<{ cx: number; base: number; w: number; h: number;
  z?: number; dim?: number }> = ({ cx, base, w, h, z = 70, dim = 0 }) => {
  const W2 = w + 40, H2 = h + 30;
  const L = cx - W2 / 2, T = base - H2;
  return (<>
    <div style={{ position: "absolute", left: L - 10, top: base, width: W2 + 20, height: 22,
      borderRadius: 4, background: "#8E7A52", zIndex: z - 1 }} />
    <div style={{ position: "absolute", left: L, top: T, width: W2, height: H2,
      background: "#BFD6E4", opacity: 0.10 + dim * 0.14, zIndex: z }} />
    <div style={{ position: "absolute", left: L, top: T, width: W2, height: H2,
      overflow: "hidden", zIndex: z + 1 }}>
      <div style={{ position: "absolute", left: -W2 * 0.5, top: -40, width: W2 * 0.30,
        height: H2 + 120, background: "#EAF4FA", opacity: 0.13, transform: "rotate(14deg)" }} />
      <div style={{ position: "absolute", left: W2 * 0.18, top: -40, width: W2 * 0.10,
        height: H2 + 120, background: "#EAF4FA", opacity: 0.09, transform: "rotate(14deg)" }} />
    </div>
    {[L - 7, L + W2 - 7].map((x, i) => (
      <div key={"po" + i} style={{ position: "absolute", left: x, top: T - 10, width: 14,
        height: H2 + 12, borderRadius: 3,
        background: "linear-gradient(90deg,#C9A45C,#8E7132)", zIndex: z + 2 }} />
    ))}
    <div style={{ position: "absolute", left: L - 12, top: T - 16, width: W2 + 24, height: 16,
      borderRadius: 4, background: "linear-gradient(180deg,#D8B569,#9C7C38)", zIndex: z + 3 }} />
    <div style={{ position: "absolute", left: L - 12, top: base - 8, width: W2 + 24, height: 12,
      borderRadius: 3, background: "linear-gradient(180deg,#B79A52,#7E6630)", zIndex: z + 3 }} />
  </>);
};

export const Rope: React.FC<{ cx: number; y: number; w: number; z?: number }> =
  ({ cx, y, w: ww, z = 88 }) => (<>
  {[cx - ww / 2, cx + ww / 2].map((x, i) => (
    <div key={"st" + i} style={{ position: "absolute", left: x - 9, top: y, width: 18, height: 92,
      zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 18, height: 18, borderRadius: 9,
        background: "linear-gradient(180deg,#D8B569,#9C7C38)" }} />
      <div style={{ position: "absolute", left: 5, top: 14, width: 8, height: 62,
        background: "linear-gradient(90deg,#C9A45C,#8E7132)" }} />
      <div style={{ position: "absolute", left: -11, top: 74, width: 40, height: 16,
        borderRadius: 5, background: "#7E6630" }} />
    </div>
  ))}
  {Array.from({ length: 13 }, (_, i) => {
    const t = i / 12, x = cx - ww / 2 + t * ww;
    return (<div key={"rp" + i} style={{ position: "absolute", left: x - 9,
      top: y + 10 + Math.sin(t * Math.PI) * 22, width: 18, height: 13, borderRadius: 6,
      background: "#8E2F3C", zIndex: z + 1 }} />);
  })}
</>);

const VitrineBarrier: Barrier = ({ cx, base, w, h, dim }) => (<>
  <Vitrine cx={cx} base={base + 4} w={w} h={h} z={72} dim={dim} />
  <Rope cx={cx} y={base + 22} w={w + 30} z={90} />
</>);

/* ---- B · THE READING ROOM -----------------------------------------------
   A chained library. The paid tool is CHAINED to its lectern the way a real
   chained library worked: read it here, it does not leave with you.
   ------------------------------------------------------------------------ */
const OakDress: React.FC<{ p: RoomP; f: number }> = ({ p, f }) => (<>
  {/* the shelf wall: five courses of spines behind everything */}
  {Array.from({ length: 4 }, (_, r) => (
    <div key={"sh" + r} style={{ position: "absolute", left: 0, right: 0, top: 96 + r * 92,
      height: 84, zIndex: 3 }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 9,
        background: mix(p.wall, 0.16) }} />
      {Array.from({ length: 26 }, (_, i) => {
        const rr = (k: number) => { const v = Math.sin(i * 29.7 + r * 13.1 + k * 7.3) * 4371.7; return v - Math.floor(v); };
        return (<div key={"sp" + i} style={{ position: "absolute", left: 6 + i * 39,
          bottom: 9, width: 22 + rr(1) * 12, height: 46 + rr(2) * 26,
          background: [dark(p.lip, 0.72), mix(p.wall, 0.24), dark(p.seam, 0.80),
                       mix(p.lip, 0.10)][i % 4], borderRadius: "3px 3px 0 0" }} />);
      })}
    </div>
  ))}
  {/* panelled dado and the skirting */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 96, height: 96,
    background: g(mix(p.wall, 0.12), p.wall, 178), zIndex: 5 }} />
  {[100, 320, 540, 760, 960].map((x, i) => (
    <div key={"dp" + i} style={{ position: "absolute", left: x - 84, top: p.hz - 84, width: 168,
      height: 66, border: `4px solid ${mix(p.lip, 0.14)}`, borderRadius: 3, zIndex: 6 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 8, height: 12,
    background: mix(p.lip, 0.22), zIndex: 7 }} />
  {/* the red runner down the middle of the floor */}
  <div style={{ position: "absolute", left: 250, right: 250, top: p.hz + 8, bottom: 0,
    background: "linear-gradient(180deg,#7E2732 0%,#4E161E 100%)", zIndex: 7 }} />
  <div style={{ position: "absolute", left: 262, right: 262, top: p.hz + 8, bottom: 0,
    border: "3px solid #A8623C", borderTop: "none", opacity: 0.55, zIndex: 8 }} />
</>);

/** the green banker's shade that slides to whichever side is being read */
const ShadeFixture: Fixture = ({ x, c }) => (
  <div style={{ position: "absolute", left: x - 62, top: 96, zIndex: 26 }}>
    <div style={{ position: "absolute", left: 56, top: -96, width: 10, height: 100,
      background: "#5A4A2E" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 124, height: 46,
      borderRadius: "58px 58px 10px 10px",
      background: "linear-gradient(180deg,#2E6B4E,#17402E)" }} />
    <div style={{ position: "absolute", left: 6, top: 40, width: 112, height: 12,
      borderRadius: 8, background: c, opacity: 0.92 }} />
  </div>
);

/** ⛔ THE CHAIN RUNS DOWN THE OUTER EDGES AND ACROSS THE FOOT — never over the
    name or the price. A barrier that hides the fact is not a barrier, it is a
    mistake (learned on the odyssey rope, which shipped four turns straight
    through "Midjourney" and "$30/mo"). */
const ChainBarrier: Barrier = ({ cx, base, w, h, dim }) => {
  const top = base - h;
  const link = (x: number, y: number, k: number) => (
    <div key={"lk" + k} style={{ position: "absolute", left: x, top: y, width: 17, height: 13,
      borderRadius: 7, border: `4px solid ${k % 2 ? "#9AA1A8" : "#71787E"}`,
      opacity: 0.96 - dim * 0.35, zIndex: 92 }} />
  );
  return (<>
    <div style={{ position: "absolute", left: cx - 22, top: base + 4, width: 44, height: 34,
      borderRadius: 6, background: "#8C939A", zIndex: 91 }} />
    <div style={{ position: "absolute", left: cx - 9, top: base + 12, width: 18, height: 18,
      borderRadius: 9, background: "#3A4046", zIndex: 92 }} />
    {[cx - w / 2 + 4, cx + w / 2 - 21].map((x, s) =>
      Array.from({ length: 15 }, (_, i) => link(x, top + 18 + i * 26, s * 40 + i)))}
    {Array.from({ length: 13 }, (_, i) => link(cx - w / 2 + 10 + i * (w - 20) / 13, base - 22, 90 + i))}
  </>);
};

/* ---- C · THE COIN-OP ----------------------------------------------------
   Steel and enamel. The paid tool is behind a COIN COLUMN you have to feed.
   ------------------------------------------------------------------------ */
const SteelDress: React.FC<{ p: RoomP; f: number }> = ({ p, f }) => (<>
  {/* riveted panels */}
  {Array.from({ length: 4 }, (_, r) => Array.from({ length: 5 }, (_, c) => (
    <div key={"pl" + r + "_" + c} style={{ position: "absolute", left: c * 206 + 6,
      top: 70 + r * 106, width: 194, height: 94, borderRadius: 5,
      background: (r + c) % 2 ? mix(p.wall, 0.07) : dark(p.wall, 0.90),
      border: `3px solid ${dark(p.wall, 0.72)}`, zIndex: 3 }} />
  )))}
  {Array.from({ length: 44 }, (_, i) => (
    <div key={"rv" + i} style={{ position: "absolute", left: 14 + (i % 11) * 98,
      top: 78 + Math.floor(i / 11) * 106, width: 9, height: 9, borderRadius: 5,
      background: mix(p.lip, 0.30), opacity: 0.75, zIndex: 4 }} />
  ))}
  {/* the kick rail and the chequer-plate floor */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 22, height: 22,
    background: "repeating-linear-gradient(45deg,#C8A23A 0 22px,#2B2F34 22px 44px)",
    opacity: 0.85, zIndex: 6 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
    background: g(p.floor, p.floor2, 178), zIndex: 6 }} />
  {Array.from({ length: 9 }, (_, i) => (
    <div key={"cq" + i} style={{ position: "absolute", left: -40 + i * 130, top: p.hz,
      width: 66, height: H - p.hz, background: mix(p.floor, 0.06),
      transform: "skewX(-16deg)", zIndex: 7 }} />
  ))}
</>);

/** a bare batten strip that slides along its conduit */
const BattenFixture: Fixture = ({ x, c }) => (
  <div style={{ position: "absolute", left: x - 96, top: 84, zIndex: 26 }}>
    <div style={{ position: "absolute", left: 90, top: -84, width: 12,
      height: 88, background: "#3A4148" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 192, height: 20, borderRadius: 4,
      background: "linear-gradient(180deg,#5A636B,#333A41)" }} />
    <div style={{ position: "absolute", left: 8, top: 18, width: 176, height: 11, borderRadius: 5,
      background: c, opacity: 0.94 }} />
  </div>
);

/** ⛔ THE COIN COLUMN STANDS BESIDE THE STAND, NOT OVER IT. A stack of coins in
    a glass tube plus an INSERT plate: the price is a thing you feed, in a shape
    everyone born after 1975 recognises instantly. */
const CoinBarrier: Barrier = ({ cx, base, w, h, dim }) => {
  const x = cx + w / 2 + 16, top = base - h + 24;
  return (<>
    <div style={{ position: "absolute", left: x, top, width: 58, height: h - 24, borderRadius: 8,
      background: "#9FB0BC", opacity: 0.20 + dim * 0.10, zIndex: 90 }} />
    <div style={{ position: "absolute", left: x, top, width: 58, height: h - 24, borderRadius: 8,
      border: "5px solid #6E7982", zIndex: 92 }} />
    {Array.from({ length: 9 }, (_, i) => (
      <div key={"cn" + i} style={{ position: "absolute", left: x + 9, top: base - 42 - i * 21,
        width: 40, height: 17, borderRadius: 9,
        background: "linear-gradient(180deg,#E2BC5E,#9C7C2E)",
        opacity: 0.96 - dim * 0.4, zIndex: 93 }} />
    ))}
    <div style={{ position: "absolute", left: x - 4, top: top - 40, width: 66, height: 34,
      borderRadius: 5, background: "#C8A23A", display: "flex", alignItems: "center",
      justifyContent: "center", fontFamily: MONO, fontWeight: 800, fontSize: 15,
      letterSpacing: "0.10em", color: "#2B2F34", zIndex: 94 }}>INSERT</div>
    <div style={{ position: "absolute", left: x + 20, top: top - 2, width: 18, height: 7,
      borderRadius: 4, background: "#2B2F34", zIndex: 94 }} />
  </>);
};

/* ---- D · THE ODYSSEY ----------------------------------------------------
   ⭐ The paid tool is LASHED TO ITS COLUMN, the way Odysseus was lashed to the
   mast: it is right there and it does not come with you. And this is the only
   cut where the drape is pulled off by somebody.
   ------------------------------------------------------------------------ */
const MarbleDress: React.FC<{ p: RoomP; f: number }> = ({ p, f }) => (<>
  <div style={{ position: "absolute", left: 0, right: 0, top: 60, height: p.hz - 60,
    background: `linear-gradient(178deg, ${dark(p.wall, 0.55)} 0%, ${mix(p.wall, 0.06)} 100%)`,
    zIndex: 2 }} />
  {Array.from({ length: 34 }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 41.3 + k * 13.7) * 4371.7; return v - Math.floor(v); };
    return (<div key={"st" + i} style={{ position: "absolute", left: 20 + r(1) * 970,
      top: 80 + r(2) * 300, width: 3 + (i % 2), height: 3 + (i % 2), borderRadius: 3,
      background: "#EFE7D2", opacity: 0.30 + r(3) * 0.45 * (0.7 + 0.3 * Math.sin(f / 19 + i)),
      zIndex: 3 }} />);
  })}
  <div style={{ position: "absolute", left: 0, right: 0, top: 58, height: 34,
    background: "linear-gradient(180deg,#D8CDB4,#A99C82)", zIndex: 12 }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 92, height: 10,
    background: "#8B7F68", zIndex: 12 }} />
  {Array.from({ length: 13 }, (_, i) => (
    <div key={"tg" + i} style={{ position: "absolute", left: 10 + i * 80, top: 102, width: 30,
      height: 16, background: "#B7AA8E", zIndex: 12 }} />
  ))}
  {[64, 300, 712, 948].map((cx, i) => (
    <div key={"cl" + i} style={{ position: "absolute", left: cx - 46, top: 118, width: 92,
      height: p.hz - 108, zIndex: 11 }}>
      <div style={{ position: "absolute", left: -12, top: 0, width: 116, height: 26,
        borderRadius: 3, background: "linear-gradient(180deg,#E2D7BE,#B2A488)" }} />
      <div style={{ position: "absolute", left: 0, top: 26, right: 0, bottom: 24,
        background: "linear-gradient(90deg,#C9BC9E 0%,#EFE6CE 34%,#BFB295 70%,#8F826E 100%)" }} />
      {[14, 30, 46, 62, 78].map((fx) => (
        <div key={fx} style={{ position: "absolute", left: fx, top: 26, bottom: 24, width: 5,
          background: "#9C8F74", opacity: 0.55 }} />
      ))}
      <div style={{ position: "absolute", left: -14, bottom: 0, width: 120, height: 26,
        borderRadius: 3, background: "linear-gradient(180deg,#C4B79A,#9A8D72)" }} />
    </div>
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 18, height: 18,
    background: "#B7AA8E", zIndex: 13 }} />
  {Array.from({ length: 6 }, (_, i) => (
    <div key={"sl" + i} style={{ position: "absolute", left: i * 172, top: p.hz, width: 3,
      height: H - p.hz, background: dark(p.floor, 0.30), opacity: 0.6, zIndex: 14 }} />
  ))}
  {[150, 862].map((bx, i) => (
    <div key={"bz" + i} style={{ position: "absolute", left: bx - 26, top: p.hz - 96, zIndex: 15 }}>
      <div style={{ position: "absolute", left: 18, top: 42, width: 16, height: 54,
        background: "#6E5A38" }} />
      <div style={{ position: "absolute", left: 0, top: 30, width: 52, height: 22,
        borderRadius: "0 0 22px 22px", background: "#8A6B3A" }} />
      {[0, 1, 2].map((k) => {
        const t = Math.sin(f / (7 + k * 3) + i * 2 + k) * 0.5 + 0.5;
        return (<div key={k} style={{ position: "absolute", left: 12 + k * 10, top: 16 - t * 12,
          width: 12, height: 22 + t * 14, borderRadius: "7px 7px 4px 4px",
          background: ["#E8B04A", "#E08A32", "#F0C86A"][k], opacity: 0.88 }} />);
      })}
    </div>
  ))}
</>);

const BrazierFixture: Fixture = ({ x, c }) => (
  <div style={{ position: "absolute", left: x - 34, top: 116, zIndex: 26 }}>
    <div style={{ position: "absolute", left: 26, top: -96, width: 16, height: 100,
      background: "#5E4A28" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 68, height: 26,
      borderRadius: "0 0 26px 26px", background: "linear-gradient(180deg,#B08A46,#6E5628)" }} />
    <div style={{ position: "absolute", left: 16, top: -14, width: 36, height: 22, borderRadius: 10,
      background: c, opacity: 0.92 }} />
  </div>
);

const LashBarrier: Barrier = ({ cx, base, w, h, dim }) => {
  const top = base - h;
  return (<>
    <div style={{ position: "absolute", left: cx - 20, top: base + 6, width: 40, height: 40,
      borderRadius: 22, border: "8px solid #9C7C38", zIndex: 92 }} />
    {[0.115, 0.935].map((t, i) => (
      <div key={"rt" + i} style={{ position: "absolute", left: cx - w / 2 - 10, top: top + h * t,
        width: w + 20, height: 13, borderRadius: 7,
        background: "repeating-linear-gradient(74deg,#C8A465 0 8px,#9E7C3E 8px 16px)",
        opacity: 0.95 - dim * 0.35, zIndex: 92 }} />
    ))}
    {[cx - w / 2 + 6, cx + w / 2 - 20].map((x, i) => (
      <div key={"rv" + i} style={{ position: "absolute", left: x, top: top + h * 0.115,
        width: 14, height: h * 0.82, borderRadius: 7,
        background: "repeating-linear-gradient(6deg,#C8A465 0 8px,#9E7C3E 8px 16px)",
        opacity: 0.95 - dim * 0.35, zIndex: 92 }} />
    ))}
    <div style={{ position: "absolute", left: cx - 8, top: top + h * 0.935 + 8, width: 16,
      height: Math.max(0, base - (top + h * 0.935) - 2), borderRadius: 8,
      background: "repeating-linear-gradient(6deg,#C8A465 0 8px,#9E7C3E 8px 16px)",
      opacity: 0.95 - dim * 0.35, zIndex: 91 }} />
  </>);
};

/** ⭐ THE HOPLITE — the one figure in the odyssey cut, and the reason that world
    reads as the Odyssey rather than as "a building with columns". He is the one
    who PULLS THE DRAPE.

    ⛔ COSTUME IS ADDITIVE BLOCKS OVER THE HOUSE SPRITE, NEVER A REDRAWN BODY
    (standing since reel 46). Crest, helmet dome, cheek guards, hoplon and spear
    are drawn AROUND `Claudie`; the sprite is untouched and still emits the one
    house clay.
    ⛔ THE DOME STOPS ABOVE THE EYES. On this sprite the body rect IS the face and
    the eyes sit at 35-48% of its height, so an accurately-drawn Corinthian
    helmet would cover the whole face — the mistake the badge rule exists for. */
export const Hoplite: React.FC<{ x: number; y: number; s?: number; f: number; z?: number;
  cheer?: number; reach?: number; lean?: number }> =
  ({ x, y, s = 0.9, f, z = 86, cheer = 0, reach = 0, lean = 0 }) => {
  const H2 = 190 * s, W2 = 190 * s;
  const top = y - H2;
  /* ⭐ HE LEANS BACK INTO THE PULL. A figure with his arms up and his weight
     unchanged is waving, not hauling. */
  return (<div style={{ position: "absolute", inset: 0,
    transform: `rotate(${-lean * 8}deg)`, transformOrigin: `${x}px ${y}px` }}>
    {/* ⛔ THE ARMS RISE OUTSIDE HIS SILHOUETTE, FROM THE SHOULDERS. At ±0.20W
        starting at 0.30H they came up through the top of his head and sat beside
        the red crest in a near-identical clay: the whole crown read as one
        smudge. */}
    {reach > 0 && [-0.40, 0.40].map((dx, i) => (
      <div key={"ar" + i} style={{ position: "absolute", left: x + dx * W2 - 10 * s,
        top: top + H2 * 0.46 - reach, width: 20 * s, height: reach + H2 * 0.18,
        borderRadius: 10 * s, background: "#D97757", zIndex: z + 1 }} />
    ))}
    {reach > 0 && [-0.40, 0.40].map((dx, i) => (
      <div key={"hd" + i} style={{ position: "absolute", left: x + dx * W2 - 17 * s,
        top: top + H2 * 0.46 - reach - 15 * s, width: 34 * s, height: 24 * s,
        borderRadius: 10 * s, background: "#EFA179", zIndex: z + 2 }} />
    ))}
    <div style={{ position: "absolute", left: x - W2 * 0.62, top: top + H2 * 0.34,
      width: W2 * 0.52, height: W2 * 0.52, borderRadius: "50%",
      background: "radial-gradient(circle at 38% 34%, #E0B45C 0%, #A8802E 62%, #6E5220 100%)",
      border: `${5 * s}px solid #8A6A28`, zIndex: z + 3 }} />
    <div style={{ position: "absolute", left: x - W2 * 0.62 + W2 * 0.14,
      top: top + H2 * 0.34 + W2 * 0.14, width: W2 * 0.24, height: W2 * 0.24,
      borderRadius: "50%", background: "#6E5220", zIndex: z + 4 }} />
    <div style={{ position: "absolute", left: x - W2 * 0.62 + W2 * 0.20,
      top: top + H2 * 0.34 + W2 * 0.20, width: W2 * 0.12, height: W2 * 0.12,
      borderRadius: "50%", background: "#E0B45C", zIndex: z + 4 }} />
    <div style={{ position: "absolute", left: x + W2 * 0.44, top: top - H2 * 0.22,
      width: 9 * s, height: H2 * 1.24, background: "#6E5228", zIndex: z - 1,
      transform: "rotate(7deg)", transformOrigin: "50% 100%" }} />
    <div style={{ position: "absolute", left: x + W2 * 0.40, top: top - H2 * 0.30,
      width: 20 * s, height: 40 * s, background: "#C8B48A", zIndex: z - 1,
      clipPath: "polygon(50% 0, 100% 100%, 0 100%)", transform: "rotate(7deg)" }} />

    <Claudie x={x} y={y} s={s} f={f} z={z} face={-1} costume={{ cheer, stern: 1 - cheer }} />

    <div style={{ position: "absolute", left: x - W2 * 0.27, top: top + H2 * 0.185,
      width: W2 * 0.54, height: H2 * 0.17, borderRadius: `${W2 * 0.27}px ${W2 * 0.27}px 0 0`,
      background: "linear-gradient(180deg,#E2BC6A,#A8802E)", zIndex: z + 5 }} />
    {[-1, 1].map((sgn) => (
      <div key={"cg" + sgn} style={{ position: "absolute", left: x + sgn * W2 * 0.215 - W2 * 0.055,
        top: top + H2 * 0.33, width: W2 * 0.11, height: H2 * 0.22, borderRadius: 4 * s,
        background: "linear-gradient(180deg,#C9A45C,#8A6A28)", zIndex: z + 5 }} />
    ))}
    <div style={{ position: "absolute", left: x - W2 * 0.03, top: top + H2 * 0.33,
      width: W2 * 0.06, height: H2 * 0.15, borderRadius: 3 * s, background: "#B7913F",
      zIndex: z + 5 }} />
    {/* ⭐ THE CREST: the single most legible "Greek soldier" shape there is, and
        it sits entirely above the head. */}
    <div style={{ position: "absolute", left: x - W2 * 0.20, top: top + H2 * 0.055,
      width: W2 * 0.40, height: H2 * 0.15, borderRadius: `${W2 * 0.20}px ${W2 * 0.20}px 0 0`,
      background: "linear-gradient(180deg,#C0392B,#8E2B22)", zIndex: z + 6 }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={"cr" + i} style={{ position: "absolute", left: x - W2 * 0.185 + i * W2 * 0.055,
        top: top + H2 * 0.03 + Math.abs(i - 3) * H2 * 0.012 + Math.sin(f / 13 + i) * 1.6,
        width: W2 * 0.035, height: H2 * 0.075, borderRadius: 3 * s,
        background: i % 2 ? "#D14A38" : "#A8322A", zIndex: z + 6 }} />
    ))}
  </div>);
};

/* ---- the room sets each world runs on ---------------------------------- */
const OAK: RoomP[] = ROOMS.map((r, i) => {
  const HX = ["#3E2C1E", "#332616", "#43301F", "#2C2114", "#3A2A1A", "#2E2418",
              "#40301E", "#2A2015", "#3C2C1C", "#312414", "#382A1A"][i];
  return { wall: HX, wall2: dark(HX, 0.52), seam: mix(HX, 0.16), floor: "#3A2A1C",
           floor2: "#1C1410", lip: "#8A6A3C", key: "#F0D89A", hz: r.hz };
});

const STEEL: RoomP[] = ROOMS.map((r, i) => {
  const HX = ["#2A333C", "#232C36", "#2E3740", "#1E262E", "#28323A", "#222A32",
              "#2C353E", "#1E2730", "#2A343C", "#212932", "#262F38"][i];
  return { wall: HX, wall2: dark(HX, 0.54), seam: mix(HX, 0.18), floor: "#2E363E",
           floor2: "#141A20", lip: "#8894A0", key: "#DCEAF6", hz: r.hz };
});

const MARBLE: RoomP[] = ROOMS.map((r, i) => {
  const HX = ["#1E2C46", "#1A3040", "#2A2A44", "#16283E", "#1E3438", "#26243E",
              "#2E2A38", "#182C3C", "#2C2438", "#1C3038", "#222A3A"][i];
  return { wall: HX, wall2: dark(HX, 0.48), seam: mix(HX, 0.20), floor: "#4A4436",
           floor2: "#241F16", lip: "#8B7F68", key: "#F4D08A", hz: r.hz };
});

export const THEMES: Theme[] = [
  { id: "gallery", label: "THE GALLERY · behind glass, behind a rope",
    rooms: ROOMS, accent: "#C8A465", vig: 0.80, cloth: "#2E9C6E",
    Dress: Wing, Barrier: VitrineBarrier, Fixture: TrackFixture },
  { id: "reading", label: "THE READING ROOM · chained to the lectern",
    rooms: OAK, accent: "#C08A3E", vig: 0.84, cloth: "#AE3543",
    Dress: OakDress, Barrier: ChainBarrier, Fixture: ShadeFixture },
  { id: "coinop", label: "THE COIN-OP · feed the slot",
    rooms: STEEL, accent: "#A8B0B8", vig: 0.86, cloth: "#2A80AC",
    Dress: SteelDress, Barrier: CoinBarrier, Fixture: BattenFixture },
  { id: "odyssey", label: "THE ODYSSEY · lashed to the column, the drape pulled off",
    rooms: MARBLE, accent: "#C8A465", vig: 0.82, cloth: "#8E44A0", crew: true,
    Dress: MarbleDress, Barrier: LashBarrier, Fixture: BrazierFixture },
];
