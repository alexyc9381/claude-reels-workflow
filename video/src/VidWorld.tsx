import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";

/* =========================================================================
   REEL 93 "VIDEO" · shared world kit.

   ⛔ FILE PREFIX IS `Vid`. `Open*` belongs to reels 79/80, `Lot*` to reel 90
      (SAME PRODUCT, different angle — do not reuse its BACKLOT), `Row*` to 91,
      `Jobs*` to 92.

   Panel-local coordinates only: 0..1012 wide, 0..792 tall. Anything past ~792
   is clipped and invisible (build-gotcha 1).
   ========================================================================= */

/* ---- matte paints. Solid pigment + dark shadow, never glow. ------------- */
export const PAPER = "#F4EFE4", INK = "#1A1813", CLAY = "#D2724E";
export const RED = "#C0402F", GO = "#3C8F68", GOLD = "#DFA63C", BRASS = "#C69A46";
export const STEEL = "#96A2AE", STEEL_D = "#5A6773", CHROME = "#DCE2E8";
export const DIM = "rgba(26,24,19,0.42)";
export const SH = "0 10px 22px rgba(20,18,14,0.30)";
export const SH_D = "0 24px 46px rgba(12,14,20,0.44)";
export const SH_IN = "inset 0 3px 0 rgba(255,255,255,0.55), inset 0 -5px 12px rgba(20,18,14,0.16)";

/* ---- the four models the VO names. Marks are SOURCED, never invented. ----
   ⛔ Sora and Midjourney are not on Simple Icons; Flux's `flux` slug there is
      FluxCD, a Kubernetes tool, i.e. the WRONG company. So: Sora and Kling wear
      the REAL mark of the company that builds them with a "by X" credit (reel
      90's precedent), and Flux and Midjourney get typographic wordmarks.
   ⛔ openai.png is a black glyph — it only ever sits on a cream tile.        */
export type Brand = { name: string; by: string; logo?: string; c: string; tint: string };
export const BRANDS: Brand[] = [
  { name: "SORA", by: "by OpenAI", logo: "openai.png", c: "#22201C", tint: "#E6E2D9" },
  { name: "KLING", by: "by Kuaishou", logo: "kuaishou.svg", c: "#FF4906", tint: "#FBDDD1" },
  { name: "FLUX", by: "Black Forest Labs", c: "#33322F", tint: "#E2E0DA" },
  { name: "MIDJOURNEY", by: "Midjourney", c: "#38425C", tint: "#DDE2EC" },
];

/** the mark on its own cream tile, or a typographic wordmark when the company
    publishes none. Never an invented glyph. */
export const BrandMark: React.FC<{ b: Brand; s?: number }> = ({ b, s = 1 }) => (
  <div style={{ width: 104 * s, height: 104 * s, borderRadius: 22 * s, background: "#FFFDF8",
    border: `${3 * s}px solid #E4DDCD`, boxShadow: SH, display: "flex", alignItems: "center",
    justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
    {b.logo
      ? <Img src={staticFile(`logos/${b.logo}`)}
             style={{ width: 68 * s, height: 68 * s, objectFit: "contain" }} />
      : <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 46 * s,
          letterSpacing: "-0.06em", color: b.c }}>{b.name.slice(0, 2)}</span>}
  </div>
);

/* ---- chrome shared by every concept ------------------------------------ */

/** the ONE claim chip a shot is allowed. Solid slab, hard shadow. */
export const Band: React.FC<{ t: string; y?: number; c?: string; fg?: string; s?: number; z?: number }> =
  ({ t, y = 664, c = INK, fg = PAPER, s = 1, z = 82 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: `${14 * s}px ${36 * s}px`, borderRadius: 14 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44 * s,
      letterSpacing: "-0.015em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** the payoff slab. The only green in the hook, and the only string that has to
    be legible with the sound off. */
export const Free: React.FC<{ x?: number; y: number; s?: number; z?: number; sub?: string }> =
  ({ x, y, s = 1, z = 90, sub }) => (
  <div style={{ position: "absolute", left: x ?? 0, right: x === undefined ? 0 : undefined,
    top: y, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 * s, zIndex: z }}>
    <div style={{ padding: `${16 * s}px ${52 * s}px`, borderRadius: 20 * s, background: GO,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 128 * s,
      lineHeight: 1, letterSpacing: "-0.04em", color: "#F6FBF7" }}>FREE</div>
    {sub && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
      letterSpacing: "0.14em", color: INK }}>{sub}</div>}
  </div>
);

/* ---- rooms. Every one fills the whole panel with bright material, because
       frame-0 panel luma has to clear 140/255 and the Panel itself is a dark
       card. The world behind the hero object is held DOWN, never stripped. --- */

/** an interior: back wall + a lit ceiling band + floor + skirting. */
export const Room: React.FC<{ wall: string; wall2: string; floor: string; floor2: string;
  horizon?: number; band?: string }> = ({ wall, wall2, floor, floor2, horizon = 470, band }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${wall} 0%, ${wall2} 100%)` }} />
  {band && <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 92,
    background: `linear-gradient(180deg, ${band}, ${wall})` }} />}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: `linear-gradient(178deg, ${floor} 0%, ${floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 14, height: 16,
    background: "rgba(26,24,19,0.20)" }} />
</>);

/** an exterior: sky + a far treeline + ground. */
export const Yard: React.FC<{ sky: string; sky2: string; ground: string; ground2: string;
  horizon?: number; far?: string }> = ({ sky, sky2, ground, ground2, horizon = 400, far }) => (<>
  <div style={{ position: "absolute", inset: 0,
    background: `linear-gradient(178deg, ${sky} 0%, ${sky2} 100%)` }} />
  {far && <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 46, height: 50,
    background: far, opacity: 0.55 }} />}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0,
    background: `linear-gradient(178deg, ${ground} 0%, ${ground2} 100%)` }} />
</>);

/** the world held DOWN behind the hero: anything wrapped in this recedes. */
export const Back: React.FC<{ children: React.ReactNode; o?: number; b?: number }> =
  ({ children, o = 0.52, b = 0 }) => (
  <div style={{ position: "absolute", inset: 0, opacity: o,
    filter: b ? `blur(${b}px) saturate(0.72)` : "saturate(0.78)" }}>{children}</div>
);

/* ---- props reused across concepts -------------------------------------- */

/** a clamshell video box, face out. The single most reused object in the set. */
export const Boxart: React.FC<{ x: number; y: number; s?: number; z?: number; b: Brand;
  rot?: number; face?: string }> = ({ x, y, s = 1, z = 40, b, rot = 0, face }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 236 * s, height: 340 * s,
    borderRadius: 14 * s, background: face || b.tint, boxShadow: SH_D, zIndex: z,
    transform: `rotate(${rot}deg)`, border: `${4 * s}px solid rgba(26,24,19,0.16)`,
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 18 * s, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 26 * s,
      background: "rgba(26,24,19,0.13)" }} />
    <BrandMark b={b} s={s} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s,
      letterSpacing: "-0.02em", color: INK, textAlign: "center", padding: `0 ${14 * s}px` }}>
      {b.name}
    </div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 17 * s,
      letterSpacing: "0.08em", color: "rgba(26,24,19,0.56)" }}>{b.by}</div>
  </div>
);

/** the RENTAL sticker. Cost, with no currency figure on it — the VO names none
    and an invented price is the one number a viewer can check in ten seconds. */
export const Sticker: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  t?: string; sub?: string; c?: string }> =
  ({ x, y, s = 1, z = 60, rot = -8, t = "RENTAL", sub = "DUE BACK EVERY MONTH", c = RED }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, padding: `${13 * s}px ${26 * s}px`, borderRadius: 10 * s,
    background: c, boxShadow: SH_D, textAlign: "center",
    border: `${4 * s}px solid rgba(255,255,255,0.55)` }}>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 52 * s, lineHeight: 1,
      letterSpacing: "-0.02em", color: "#FFF6F2" }}>{t}</div>
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 17 * s,
      letterSpacing: "0.10em", color: "rgba(255,246,242,0.86)", marginTop: 5 * s }}>{sub}</div>
  </div>
);

/** an enamel lane / pump / shelf plate: the brand, small, in the world. */
export const Plate: React.FC<{ x: number; y: number; s?: number; z?: number; b: Brand;
  c?: string }> = ({ x, y, s = 1, z = 50, b, c = "#FFFDF8" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 12 * s, padding: `${9 * s}px ${18 * s}px ${9 * s}px ${9 * s}px`,
    borderRadius: 14 * s, background: c, boxShadow: SH, border: `${3 * s}px solid #E4DDCD` }}>
    <BrandMark b={b} s={0.48 * s} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30 * s,
      letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap" }}>{b.name}</div>
  </div>
);

/** a coin. Cost you can see without writing a number. */
export const Coin: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  o?: number }> = ({ x, y, s = 1, z = 60, rot = 0, o = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 62 * s, height: 62 * s,
    borderRadius: "50%", zIndex: z, opacity: o, transform: `rotate(${rot}deg)`,
    background: `linear-gradient(150deg, #F0CE7E 0%, ${BRASS} 58%, #9C7526 100%)`,
    border: `${4 * s}px solid #EEDFA8`, boxShadow: SH,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 30 * s, color: "#6A4E12" }}>$</div>
);

/* =========================================================================
   ROUND 2 — the roster of REAL marks.

   ⛔ SOURCED 2026-08-07. Simple Icons returns nothing for runway, luma, pika,
      midjourney, sora, blackforestlabs, synthesia, heygen, ideogram or krea, and
      its `flux` slug is FluxCD, a Kubernetes tool — the WRONG company, which is
      worse than no mark at all.
   ⛔ THE HONESTY RULE FOR THIS SET: a tile that NAMES a product must also carry
      the "by X" credit for whoever's mark it is wearing. A tile too small to fit
      the credit shows the mark ALONE with no product name — a bare Kuaishou mark
      is just the Kuaishou mark and asserts nothing.
   ⛔ Light marks (Higgsfield's lime, VEED's lime) go on a DARK tile, which is how
      those brands actually present. Black marks go on cream. Never the reverse.
   ========================================================================= */
export type Tool = { name: string; by?: string; logo?: string; c: string; tile?: string };
export const TOOLS: Tool[] = [
  { name: "SORA", by: "by OpenAI", logo: "openai.png", c: "#22201C" },
  { name: "KLING", by: "by Kuaishou", logo: "kuaishou.svg", c: "#FF4906" },
  { name: "FLUX", by: "Black Forest Labs", c: "#33322F" },
  { name: "MIDJOURNEY", by: "Midjourney", c: "#38425C" },
  { name: "VEO", by: "by Google", logo: "googlegemini.svg", c: "#8E75B2" },
  { name: "SEEDANCE", by: "by ByteDance", logo: "bytedance.svg", c: "#3C8CFF" },
  { name: "HAILUO", by: "by MiniMax", logo: "minimax.svg", c: "#E73562" },
  { name: "HIGGSFIELD", by: "Higgsfield", logo: "higgsfield.png", c: "#D1FE17", tile: "#131313" },
  { name: "VEED", by: "VEED", logo: "veed.svg", c: "#B6FF60", tile: "#18210F" },
  { name: "FREEPIK", by: "Freepik", logo: "freepik.svg", c: "#1273EB" },
  { name: "CANVA", by: "Canva", logo: "canva.svg", c: "#00C4CC" },
  { name: "ELEVENLABS", by: "ElevenLabs", logo: "elevenlabs.svg", c: "#22201C" },
  { name: "REPLICATE", by: "Replicate", logo: "replicate.svg", c: "#22201C" },
  { name: "HUGGING FACE", by: "Hugging Face", logo: "huggingface.svg", c: "#E0B200" },
];
/** the four the VO actually names, in the order it names them */
export const NAMED: Tool[] = [TOOLS[0], TOOLS[1], TOOLS[2], TOOLS[3]];

/** ONE tool, on its own tile. `named` false = mark only, which is what every
    tile below ~130px gets, because a product name with no visible credit is a
    claim the tile is too small to support. */
export const LogoTile: React.FC<{ t: Tool; s?: number; named?: boolean; tag?: "cost" | "free" }> =
  ({ t, s = 1, named = false, tag }) => {
  const dark = !!t.tile;
  return (
    <div style={{ width: 150 * s, height: (named ? (tag ? 206 : 186) : 150) * s, borderRadius: 30 * s,
      paddingBottom: tag ? 40 * s : 0, boxSizing: "border-box",
      background: t.tile || "#FFFDF8", boxShadow: SH_D, border: `${4 * s}px solid ${dark ? "#2C2C2C" : "#E4DDCD"}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 6 * s, position: "relative", overflow: "hidden" }}>
      {t.logo
        ? <Img src={staticFile(`logos/${t.logo}`)}
               style={{ width: 82 * s, height: 82 * s, objectFit: "contain" }} />
        : <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
            letterSpacing: "-0.07em", color: t.c }}>{t.name.slice(0, 2)}</span>}
      {named && (<>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: Math.min(25, 25 * 9 / Math.max(9, t.name.length)) * s,
          letterSpacing: "-0.02em", color: dark ? "#F2EFE6" : INK, whiteSpace: "nowrap" }}>{t.name}</span>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 800,
          fontSize: Math.min(14, 14 * 13 / Math.max(13, (t.by || "").length)) * s,
          letterSpacing: "0.07em", color: dark ? "rgba(242,239,230,0.6)" : "rgba(26,24,19,0.55)",
          whiteSpace: "nowrap" }}>{t.by}</span>
      </>)}
      {tag && <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: `${6 * s}px 0`,
        background: tag === "free" ? GO : RED, textAlign: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 21 * s, letterSpacing: "0.08em",
        color: tag === "free" ? "#F6FBF7" : "#FFF3EF" }}>{tag === "free" ? "FREE" : "$/MO"}</div>}
    </div>
  );
};

/** the free one. The product lives on GitHub under MIT, so GitHub's real mark is
    the honest face for it — same call reel 90 made. */
export const FreeTile: React.FC<{ s?: number; sub?: string }> = ({ s = 1, sub = "MIT LICENCE" }) => (
  <div style={{ width: 150 * s, height: 196 * s, borderRadius: 32 * s, background: "#FFFDF8",
    boxShadow: SH_D, border: `${6 * s}px solid ${GO}`, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 8 * s, position: "relative", overflow: "hidden" }}>
    <Img src={staticFile("logos/github.svg")}
         style={{ width: 84 * s, height: 84 * s, objectFit: "contain" }} />
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 23 * s,
      letterSpacing: "-0.02em", color: INK, textAlign: "center", lineHeight: 1.08,
      padding: `0 ${10 * s}px` }}>OPEN<br />GENERATIVE AI</span>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: `${7 * s}px 0`,
      background: GO, textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 19 * s, letterSpacing: "0.08em", color: "#F6FBF7" }}>{sub}</div>
  </div>
);

/** a flat saturated ground plus ONE piece of world: a floor plane and a light
    pool under the hero. Rich enough to look at, quiet enough to lose to the
    hero — the correction Alex made to the "just strip it out" note on reel 90. */
export const Stage: React.FC<{ c: string; c2: string; floor: string; pool?: string;
  poolX?: number; horizon?: number }> = ({ c, c2, floor, pool, poolX = 506, horizon = 596 }) => (<>
  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(176deg, ${c}, ${c2})` }} />
  {pool && <div style={{ position: "absolute", left: poolX - 420, top: horizon - 560, width: 840,
    height: 700, borderRadius: "50%", background: pool, opacity: 0.5 }} />}
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon, bottom: 0, background: floor }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: horizon - 8, height: 10,
    background: "rgba(12,14,20,0.28)" }} />
</>);

/* =========================================================================
   ROUND 3 — the VIDEO theme, and the safe area it creates.

   The reel's keyword is VIDEO and the subject is AI video models, so the panel
   is dressed as film: sprocket rails down both edges, a perforated band across
   the foot, and a live scrubber with a travelling playhead and a timecode.

   ⛔ THIS STEALS SPACE. Everything a concept draws must live inside
      x 46..966 · y 56..684. Outside that it goes under the film furniture.
      The one deliberate exception is vidStamp's belt, which runs BEHIND the
      rails on purpose — that is what film passing a gate looks like.
   ⛔ No top rail: the HookHeader already covers panel-local y 0..118, so a band
      there is invisible and pays for nothing.
   ========================================================================= */
export const SAFE = { x0: 46, x1: 974, y0: 56, y1: 690 } as const;

export const Film: React.FC<{ f: number; total?: number; c?: string; hole?: string }> =
  ({ f, total = 205, c = "#252B34", hole = "#F2EFE6" }) => {
  const p = Math.min(1, f / total);
  const TRACK = 1012 - 56 - 132;                       // left pad, right pad, timecode
  const tc = `00:0${Math.floor(f / 30)}:${String(f % 30).padStart(2, "0")}`;
  const rail = (left: number) => (
    <div style={{ position: "absolute", left, top: 0, width: 30, height: 792,
      background: c, zIndex: 86 }}>
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 5, top: 18 + i * 70, width: 20,
          height: 40, borderRadius: 5, background: hole }} />
      ))}
    </div>
  );
  return (<>
    {rail(0)}{rail(982)}
    <div style={{ position: "absolute", left: 0, right: 0, top: 696, height: 40,
      background: c, zIndex: 86 }}>
      {Array.from({ length: 11 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 26 + i * 90, top: 8, width: 58,
          height: 24, borderRadius: 5, background: hole }} />
      ))}
    </div>
    {/* the scrubber. Its playhead crosses the full width of every shot, which is
        also the one element that keeps moving when a hero is deliberately still. */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 740, height: 52,
      background: "#1A1F27", zIndex: 86 }} />
    <div style={{ position: "absolute", left: 28, top: 757, width: TRACK, height: 14,
      borderRadius: 7, background: "rgba(239,235,225,0.22)", zIndex: 87 }} />
    <div style={{ position: "absolute", left: 28, top: 757, width: TRACK * p, height: 14,
      borderRadius: 7, background: CLAY, zIndex: 88 }} />
    <div style={{ position: "absolute", left: 28 + TRACK * p - 9, top: 748, width: 18,
      height: 32, borderRadius: 5, background: "#EFEBE1", boxShadow: SH, zIndex: 89 }} />
    <div style={{ position: "absolute", right: 22, top: 753, fontFamily: inter.fontFamily,
      fontWeight: 900, fontSize: 26, letterSpacing: "0.06em", color: "#EFEBE1",
      zIndex: 89 }}>{tc}</div>
  </>);
};

/** the sprite's prop, and the second half of the video theme: a clapperboard,
    with a stick that claps. */
export const Clapper: React.FC<{ s?: number; open?: number }> = ({ s = 1, open = 0 }) => (
  <div style={{ position: "relative", width: 168 * s, height: 132 * s }}>
    <div style={{ position: "absolute", left: 0, top: 40 * s, width: 168 * s, height: 92 * s,
      borderRadius: 9 * s, background: "#242932", boxShadow: SH_D }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 14 * s, top: (16 + i * 22) * s,
          width: (140 - i * 34) * s, height: 8 * s, borderRadius: 4 * s,
          background: "rgba(239,235,225,0.5)" }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, top: 4 * s, width: 168 * s, height: 32 * s,
      borderRadius: 7 * s, transformOrigin: "6% 100%", transform: `rotate(${-open * 26}deg)`,
      background: `repeating-linear-gradient(66deg, #242932 0 ${22 * s}px, #EFEBE1 ${22 * s}px ${44 * s}px)`,
      boxShadow: SH }} />
  </div>
);

/** a mechanical split-flap / odometer digit. Used by the pump and the jukebox. */
export const Wheel: React.FC<{ x: number; y: number; d: string; s?: number; z?: number;
  roll?: number; c?: string }> = ({ x, y, d, s = 1, z = 60, roll = 0, c = "#221F1A" }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 78 * s, height: 116 * s,
    borderRadius: 10 * s, background: c, boxShadow: "inset 0 6px 14px rgba(0,0,0,0.55)",
    zIndex: z, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: `${-roll * 100}%`,
      height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 84 * s, color: "#F5EFE0" }}>{d}</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 3 * s,
      background: "rgba(0,0,0,0.45)" }} />
  </div>
);
