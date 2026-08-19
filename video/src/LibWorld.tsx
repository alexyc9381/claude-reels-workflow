import React from "react";
import { Img, staticFile } from "remotion";
import { MONO, Mascot } from "./SlopKit";
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
   REEL 111 · "LIBRARIES" — THE WORLD KIT.  Board: storyboards/111-libraries.md.

   Subject: three UI/animation component libraries you can paste into a plain
   site — Skiper UI, Vengeance UI, Animmaster Lib. The VO's frame is an AGENCY
   that charges thousands for an animated site, against three crates that land
   on the pavement and do it themselves.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS.
      [[feedback_real_marks_are_the_props]] has burned three reels — a correct
      mapping of the MECHANISM is not the subject. The free, literal object here
      is that **a website is a FRONT**: a page is a stack of sections, a section
      is a panel, and a component library is a crate of panels you bolt on. So
      the hero is a building frontage clad in real page furniture — a card with
      an image well, a three-column pricing board, a nav strip — and never a
      generic glowing box. The crew are Claudes because a crew is a crew.

   ⛔⛔ THE HONESTY LEDGER IS IN THIS FILE AND NOWHERE ELSE (`R` below). Every
      figure the picture is allowed to state lives here, so no scene can invent
      one. Checked live 2026-08-18 against each library's own site.

   ⛔⛔⛔ THE ONE THAT WILL COST A ROUND IF IT IS FORGOTTEN:
      the VO's hook says all three libraries are **free**. Two are; **Animmaster
      Lib is PAID** ($3 Junior / $4.99 PRO / $8 Premium, one-time, stated on its
      own pricing block). Skiper UI has a free set behind a $129 Premium.
      ⭐ THE RULING: **the only money on screen in this reel is the AGENCY'S.**
      No library carries a price plate, a `$0` or a `FREE` stamp — not even the
      two that could, because a badge on two of three reads as a badge on all
      three. The "for free" line is dramatised as the MECHANISM (crates land,
      the crew fits the front themselves) and the picture stops at the edge of
      the claim. Guards: `FREE_BANNED`, `PRICE_BANNED`.
      Each library's receipt is its COMPONENT COUNT, which is true of all three.

   ⭐ `250` is the VO's own understated figure (the real one is 300). An
      UNDERSTATED number is safe to draw; a DIFFERENT one is not. Guard:
      `COUNT_BANNED` blocks 300.

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). Nothing here carries a
      `boxShadow: 0 0 Npx` glow — the grep gate on that is 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES (reel 93 lost a tower).
      Use `Cam`, which carries an explicit z.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70% (reel 109 merged three
      titans into one black bar by trusting the algebra). Pitch >= 0.85 * size.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";
export const CREAMB = "#F2EDE0", CONCRETE = "#8E9299";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Checked live 2026-08-18.
   ====================================================================== */
export const R = {
  keyword: "LIBRARIES",
  /** the villain. Invented name — it is a STAND-IN for "web developers", not a
      real agency, so it can carry a price the way no real product may. */
  agency: { name: "MERIDIAN & CO.", price: "$10,000" },
  libs: [
    { key: "skiper", name: "SKIPER UI", stencil: "SKIPER UI", count: "106",
      /* skiper-ui.com — "106+ Outstanding components", shadcn CLI install.
         Free set + Premium $129 / Exclusive $549 one-time. */
      c: "#E0925A", accent: "#F0C979" },
    { key: "vengeance", name: "VENGEANCE UI", stencil: "VENGEANCE UI", count: "46",
      /* vengenceui.com — 46 components across 9 families, 100+ blocks.
         Open source, Vercel OSS Program. Fully free. */
      c: "#7FC0C9", accent: "#CBEAE4" },
    { key: "animmaster", name: "ANIMMASTER LIB", stencil: "ANIMMASTER LIB", count: "250",
      /* animmasterlib.dev — 300 PRO-level components. ⛔ PAID: $3 / $4.99 / $8
         one-time. The VO says "over 250", which is UNDERSTATED and therefore
         safe to draw. 300 is not. NO price and NO free badge anywhere. */
      c: "#9FD9BC", accent: "#C8EEDC" },
  ],
} as const;

/** ⛔ the picture may never stamp a library as free or priced — see the header. */
export const FREE_BANNED = ["FREE", "$0", "0$", "NO COST", "FREE TIER", "100% FREE"] as const;
export const PRICE_BANNED = ["$3", "$4.99", "$8", "$129", "$549"] as const;
/** ⛔ the real Animmaster figure. The VO understates it; the picture follows the VO. */
export const COUNT_BANNED = ["300", "300+", "300 COMPONENTS"] as const;

/* =========================================================================
   THE SETS. One per scene, each a real place on one continuous street.
   ⛔⛔ EVERY ROW KEEPS ITS SHADOWS. `back2`/`floor2` are the darkest values in
   each row on purpose — they are what the black-point gate measures and what
   lets one lit object out-rank everything else. If a set fails HOOK_LUMA,
   brighten the SUBJECT or add a practical. Do not lift these.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE QUOTE, close. ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE.
     The cream quote board is ~40% of the panel at value ~237, which contributes
     ~95; the street therefore only has to average ~77 to clear 140, so it stays
     a genuinely night-lit plum rather than being washed out to make the bar.
     That is the AGENCY pattern (hook 154, body 64-103) and it is why the black
     point survives: `back2` below is untouched. */
  quote:   { back: "#6E5A7A", back2: "#3A2E46", floor: "#5A4C66", floor2: "#332A40",
             lip: "#8C7AA0", key: "#E9C6A2", horizon: 512, grit: "#B9A6C8" },

  /* S1 — the pavement, wide. Same street, DARKER, so the three case spills and
     the agency tower's gold are the new information rather than a repeat. */
  street:  { back: "#4A3E5E", back2: "#241E33", floor: "#443A54", floor2: "#231C2E",
             lip: "#6E5E88", key: "#E9C6A2", horizon: 548, grit: "#9C8CAC" },

  /* S2 — THE BARE SHELL. Steel-blue, the coldest and lowest-saturation set in
     the reel, deliberately: it is the "before" every later scene is measured
     against, and it is the reel's value floor. */
  shell:   { back: "#2A3B4E", back2: "#121C28", floor: "#2E3F52", floor2: "#141E29",
             lip: "#46617C", key: "#9FB6CC", horizon: 528, grit: "#7F98B0" },

  /* S3 — crate 1 lid, tight. Warm tungsten, the BRIGHTEST body set: the crate
     interior is the source and it is blowing its lid off. */
  crate1:  { back: "#5A4526", back2: "#2E2213", floor: "#6A5330", floor2: "#3A2C18",
             lip: "#8E6F3E", key: "#F0C979", horizon: 560, grit: "#C9A468" },

  /* S4 — the fit-out deck. Same warm family one stop down, so the panels
     arriving are what brightens the frame rather than the palette. */
  deck:    { back: "#4E3C22", back2: "#281E10", floor: "#604A2A", floor2: "#342714",
             lip: "#82653A", key: "#F0C979", horizon: 520, grit: "#C0995E" },

  /* S5 — crate 2 lid. Teal-steel, coldest, near-silhouette: this crate fires a
     shaft of light straight up and everything else goes dark against it. The
     biggest VALUE SPREAD in the reel (hierarchy is the spread, not the mean). */
  crate2:  { back: "#1E3D4E", back2: "#0E2029", floor: "#1C3846", floor2: "#0C1C24",
             lip: "#2E6274", key: "#CBEAE4", horizon: 556, grit: "#7FC0C9" },

  /* S6 — the lighting gantry. Navy + gold: the villain's own colour, because
     this is the scene the VO hands the agency its name. */
  gantry:  { back: "#2B3A5C", back2: "#141C34", floor: "#26304C", floor2: "#121829",
             lip: "#4B5C86", key: "#E7B24C", horizon: 600, grit: "#93A4CE" },

  /* S7 — crate 3 lid. Green up-light out of a bottomless case. */
  crate3:  { back: "#22383A", back2: "#101F20", floor: "#24403E", floor2: "#102220",
             lip: "#38665E", key: "#9FD9BC", horizon: 552, grit: "#79B79E" },

  /* S8 — the parts rack. Green, drifting teal at the third framing. */
  rack:    { back: "#1C3A38", back2: "#0C1E1E", floor: "#1E4240", floor2: "#0E2422",
             lip: "#316A62", key: "#9FD9BC", horizon: 540, grit: "#79B79E" },

  /* S9 — the payoff, widest. Navy + gold, the BRIGHTEST and most saturated body
     set, and still the biggest spread: a blazing front against a dying tower. */
  payoff:  { back: "#3A4E78", back2: "#1A2340", floor: "#303C60", floor2: "#171E32",
             lip: "#5E70A0", key: "#F2CE84", horizon: 596, grit: "#A6B6DE" },

  /* S10 — the finished marquee. Full gold, warmest close of the reel. */
  cta:     { back: "#4E3E22", back2: "#241B0E", floor: "#56421F", floor2: "#281E10",
             lip: "#8A6C38", key: "#F0C979", horizon: 570, grit: "#CBA76A" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

/** ⭐⭐ BRIGHTEN WITHOUT DESATURATING.
    `mxh()` mixes toward WHITE, so every step of brightness it buys costs
    saturation — and saturated-pixel share is exactly what `look_audit.BODY_SAT`
    measures. v2 raised the clad panels with `mxh` to fix a greyscale motion
    problem and drove BODY_SAT to 26.8% against a 34% bar: the picture got
    brighter and paler at the same time, which is the ten-reel regression in
    miniature (§8).

    This lifts the BRIGHTEST channel toward 255 and pushes the DARKEST channel
    DOWN, so value and saturation both rise. `k` 0..1.
    ⛔ Returns `rgb(...)`, so like `dark()`/`mix()` it is hex-in/rgb-out and MUST
    NOT be nested ([[feedback_nested_colour_helpers_go_black]]). Leaf use only. */
export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const hi = Math.min(255, mx + (255 - mx) * k);
  const lo = Math.max(0, mn * (1 - k * 0.62));
  const at = (v: number) => Math.round(mx === mn ? hi : lo + (hi - lo) * ((v - mn) / (mx - mn)));
  return `rgb(${at(r)},${at(g)},${at(b)})`;
};

export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   MOTION HELPERS.
   ====================================================================== */

/** ⛔⛔ A TRAVELLING BAND MUST ALTERNATE LIGHT AND SHADOW, and the two things it
    trades are SEPARABLE (reel 109). What makes a band read as WALLPAPER is the
    HARD EDGE; what makes it MEASURE is swept area x SPEED. So: keep the
    feathering (soft stops), keep the width, and take the motion back through
    speed. Narrowing them to fix the look cost reel 109 1.6 median points across
    every scene before that was understood. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; dc?: string; speed?: number; z?: number; o?: number; skew?: number }> =
  ({ f, y, h, x0 = -260, span = 1560, n = 5, c = "#FFF3D8", dc = "#0A0C12",
     speed = 3.4, z = 26, o = 0.5, skew = -14 }) => {
  const pitch = span / n;
  return (<>
    {Array.from({ length: n * 2 }, (_, i) => {
      const dark_ = i % 2 === 1;
      const x = x0 + ((i * pitch * 0.5 + f * speed) % span);
      return (
        <div key={"rk" + i} style={{
          position: "absolute", left: x, top: y, width: pitch * 0.46, height: h, zIndex: z,
          transform: `skewX(${skew}deg)`, pointerEvents: "none",
          /* feathered, never a hard-edged bar — a hard edge reads as a graphic
             laid over the room, a feathered one as light falling through it */
          /* ⛔⛔ THE SHADOW HALF IS HEAVIER THAN THE LIGHT HALF (1.35x, not
             0.8x). v2 ran eight of these and BODY_BLACK went to p10 36.1 against
             a <=35 bar: a band whose light stripe out-weighs its dark one is a
             light-only wash wearing a disguise, and lifting the black point is
             precisely what the look gate exists to catch. Weighting the dark
             band up keeps the same swept area and the same luma delta while
             pulling the floor back DOWN. */
          background: `linear-gradient(90deg, ${hexa(dark_ ? dc : c, 0)} 0%, ${hexa(dark_ ? dc : c, dark_ ? o * 1.35 : o)} 50%, ${hexa(dark_ ? dc : c, 0)} 100%)`,
        }} />
      );
    })}
  </>);
};

/** an expanding ring — every arrival gets one. Nothing lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  r0?: number; r1?: number; life?: number; z?: number; w?: number }> =
  ({ x, y, f, at, c = "#FFF3D8", r0 = 12, r1 = 150, life = 16, z = 44, w = 5 }) => {
  const lf = f - at;
  if (lf < 0 || lf > life) return null;
  const k = lf / life;
  const r = r0 + (r1 - r0) * Easing_out(k);
  return (
    <div style={{ position: "absolute", left: x - r, top: y - r * 0.34, width: r * 2,
      height: r * 0.68, borderRadius: "50%", border: `${w}px solid ${hexa(c, 0.62 * (1 - k))}`,
      zIndex: z, pointerEvents: "none" }} />
  );
};
const Easing_out = (k: number) => 1 - Math.pow(1 - k, 2.4);

/** a dust puff — the second half of an arrival. */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  n?: number; life?: number; z?: number; s?: number }> =
  ({ x, y, f, at, c = "#CFC6B4", n = 9, life = 22, z = 43, s = 1 }) => {
  const lf = f - at;
  if (lf < 0 || lf > life) return null;
  const k = lf / life;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + i * 0.7;
      const d = (26 + rnd(i, 3) * 44) * s * Easing_out(k);
      const r = (7 + rnd(i, 9) * 11) * s * (1 + k * 0.9);
      return (
        <div key={"pf" + i} style={{ position: "absolute",
          left: x + Math.cos(a) * d - r, top: y + Math.sin(a) * d * 0.36 - r - k * 16 * s,
          width: r * 2, height: r * 2, borderRadius: "50%", zIndex: z,
          background: hexa(c, 0.34 * (1 - k)) }} />
      );
    })}
  </>);
};

/** a hard contact pool — what stops a sprite floating. */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number }> = ({ x, y, w, c = "#05060B", o = 0.36, z = 20 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - w * 0.09, width: w,
    height: w * 0.18, borderRadius: "50%", background: hexa(c, o), zIndex: z }} />
);

/* =========================================================================
   THE PAGE FURNITURE — the subject's own objects, drawn as real objects.

   ⛔⛔ §3 CONTAINERS vs DEPICTIONS. A box with a logo on it is a CONTAINER for
   the idea "a component" and carries one bit of information. The VO names four
   different things — cards, pricing, layouts, blocks — so these are four
   genuinely different DRAWN objects, and the information is carried by their
   shape (an image well, three columns of different heights, a row of nav slots)
   and never by type set on them.
   ⛔ §4 the counterpart rule: do NOT solve it with text. There is no live copy
   on any of these — text is drawn as RULES (bars), which is what type looks
   like at this distance anyway.
   ====================================================================== */
export type PanelKind = "card" | "price" | "nav" | "block" | "hero" | "media";

export const Clad: React.FC<{ x: number; y: number; w: number; h: number; kind: PanelKind;
  c: string; lit?: number; z?: number; f?: number; seed?: number; o?: number;
  /** ⭐⭐ 0..1 — how much of this panel's OWN CONTENT has arrived.
      REAL CONTENT ARRIVING is the highest-value entry in the measured motion
      table that is not a camera trick: a list whose rows land one by one took a
      stuck second from 6.3-6.9 to 8.0-8.5, and it beat a push raise, two
      travelling elements and an added event on the same scene. It is also the
      only kind of motion that MEANS something — a component that fills with its
      own content is exactly what these libraries do. */
  fill?: number }> =
  ({ x, y, w, h, kind, c, lit = 1, z = 40, f = 0, seed = 0, o = 1, fill = 1 }) => {
  /** has inner element `i` of `n` landed yet? */
  const got = (i: number, n: number) => fill >= (i + 0.001) / n;
  const pop = (i: number, n: number) => got(i, n) ? 1 : 0;
  /* ⛔⛔ VALUE, NOT HUE — AND NOT AT THE COST OF CHROMA. v1 painted these at
     `mxh(c, 0.10 + lit*0.16)`, a mid-tone panel on a mid-tone set, and the DECK
     scene measured 6.03 because the motion audit works in GREYSCALE: a colour
     change at equal luma scores exactly zero. v2 fixed that with `mxh` and
     promptly failed BODY_SAT at 26.8% — mixing toward white buys luma by
     spending saturation. `vivid()` buys both. */
  const face = vivid(c, 0.10 + lit * 0.30);
  const deep = dkh(c, 0.46);
  const rule = hexa("#0B0D12", 0.52);
  const bright = vivid(c, 0.62);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      opacity: o, background: `linear-gradient(166deg, ${face} 0%, ${deep} 100%)`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {/* the seam every clad panel has — reads as a fitted plate, not a rectangle */}
      <div style={{ position: "absolute", inset: 0, border: `${Math.max(2, w * 0.012)}px solid ${hexa("#000", 0.28)}` }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: Math.max(3, h * 0.035),
        background: hexa(bright, 0.55 * lit) }} />

      {kind === "card" && (<>
        {/* an IMAGE WELL — the thing that makes a card a card */}
        <div style={{ position: "absolute", left: w * 0.08, top: h * 0.10, width: w * 0.84,
          height: h * 0.48, background: dkh(c, 0.62) }}>
          <div style={{ position: "absolute", left: "14%", bottom: "16%", width: "30%", height: "44%",
            background: hexa(bright, 0.5 * lit) }} />
          <div style={{ position: "absolute", left: "48%", bottom: "16%", width: "38%", height: "66%",
            background: hexa(bright, 0.34 * lit) }} />
        </div>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: w * 0.08, top: h * (0.66 + i * 0.10),
            width: w * (0.72 - i * 0.20) * pop(i + 1, 4), height: Math.max(3, h * 0.045),
            background: rule }} />
        ))}
      </>)}

      {kind === "price" && (<>
        {/* THREE COLUMNS OF DIFFERENT HEIGHTS, middle tallest and haloed — the
            shape of a pricing table, with no numeral anywhere on it */}
        {[0, 1, 2].map(i => {
          const ch = h * (i === 1 ? 0.80 : 0.58);
          const cw = w * 0.26;
          return (
            <div key={i} style={{ position: "absolute", left: w * (0.06 + i * 0.31), top: h - ch - h * 0.08,
              width: cw, height: ch, background: i === 1 ? mxh(c, 0.34) : dkh(c, 0.34),
              border: i === 1 ? `${Math.max(2, w * 0.012)}px solid ${hexa(bright, 0.8)}` : undefined }}>
              {[0, 1, 2, 3].map(j => (
                <div key={j} style={{ position: "absolute", left: "14%", top: `${26 + j * 17}%`,
                  width: `${(68 - j * 12) * pop(i * 4 + j, 12)}%`,
                  height: Math.max(2, ch * 0.05), background: rule }} />
              ))}
            </div>
          );
        })}
      </>)}

      {kind === "nav" && (<>
        {/* a NAV STRIP: a mark at the left, five slots, a pill at the right */}
        <div style={{ position: "absolute", left: w * 0.025, top: h * 0.24, width: h * 0.52,
          height: h * 0.52, borderRadius: h * 0.14, background: bright }} />
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{ position: "absolute", left: w * (0.16 + i * 0.115), top: h * 0.42,
            width: w * 0.075, height: Math.max(3, h * 0.14),
            background: got(i, 5) ? bright : rule }} />
        ))}
        <div style={{ position: "absolute", right: w * 0.03, top: h * 0.26, width: w * 0.15,
          height: h * 0.48, borderRadius: h * 0.24, background: hexa(bright, 0.85) }} />
      </>)}

      {kind === "hero" && (<>
        {/* the HERO BLOCK — one headline rule twice the weight of anything else,
            a sub-rule, and two buttons */}
        <div style={{ position: "absolute", left: w * 0.07, top: h * 0.20, width: w * 0.68,
          height: Math.max(6, h * 0.15), background: hexa("#F4EFE2", 0.90) }} />
        <div style={{ position: "absolute", left: w * 0.07, top: h * 0.42, width: w * 0.46,
          height: Math.max(4, h * 0.075), background: hexa("#F4EFE2", 0.52) }} />
        <div style={{ position: "absolute", left: w * 0.07, top: h * 0.60, width: w * 0.19,
          height: h * 0.16, borderRadius: h * 0.05, background: bright }} />
        <div style={{ position: "absolute", left: w * 0.29, top: h * 0.60, width: w * 0.19,
          height: h * 0.16, borderRadius: h * 0.05, border: `3px solid ${hexa(bright, 0.8)}` }} />
      </>)}

      {kind === "media" && (<>
        <div style={{ position: "absolute", inset: `${h * 0.10}px ${w * 0.08}px`,
          background: dkh(c, 0.58) }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", width: 0, height: 0,
          marginLeft: -w * 0.05, marginTop: -w * 0.06,
          borderLeft: `${w * 0.13}px solid ${hexa(bright, 0.9)}`,
          borderTop: `${w * 0.075}px solid transparent`,
          borderBottom: `${w * 0.075}px solid transparent` }} />
      </>)}

      {kind === "block" && (<>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: w * 0.09, top: h * (0.16 + i * 0.20),
            width: w * (0.80 - (i % 2) * 0.26) * pop(i, 4), height: Math.max(3, h * 0.085),
            background: i === 0 ? hexa(bright, 0.72) : rule }} />
        ))}
      </>)}
    </div>
  );
};

/** an EMPTY SLOT in the shell — the socket a panel seats into. */
export const Slot: React.FC<{ x: number; y: number; w: number; h: number; on?: number;
  c?: string; z?: number; filled?: boolean }> =
  ({ x, y, w, h, on = 0, c = "#9FB6CC", z = 30, filled = false }) => (
  /* ⛔ ONCE A PANEL HAS SEATED THE SOCKET IS GONE. Leaving the dashed outline
     under a fitted panel left a dashed halo round every one of them on the DECK
     and read as an unfinished wireframe rather than a fitted front. */
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    opacity: filled ? 0 : 1,
    background: hexa("#0B1119", 0.62),
    border: `3px dashed ${hexa(c, 0.28 + on * 0.62)}` }}>
    {[0, 1].map(i => (
      <div key={i} style={{ position: "absolute", left: i === 0 ? -4 : w - 10, top: h / 2 - 12,
        width: 14, height: 24, background: hexa(c, 0.30 + on * 0.70) }} />
    ))}
  </div>
);

/* =========================================================================
   THE FRONT — the hero artifact. On screen in all 11 scenes. Bare grey
   concrete at S2, blazing at S9. `lit` drives the value arc; `seated` is how
   many of the clad panels have been fitted.
   ====================================================================== */
export type Seat = { x: number; y: number; w: number; h: number; kind: PanelKind; c: string; at: number };

export const Front: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  seats?: Seat[]; lit?: number; z?: number; scroll?: number; scaffold?: boolean;
  slots?: Array<[number, number, number, number]>; slotOn?: number }> =
  ({ x, y, w, h, f, seats = [], lit = 0, z = 30, scroll = 0, scaffold = true,
     slots = [], slotOn = 0 }) => {
  /* ⛔ THE SHELL IS CONCRETE, AND CONCRETE IS MID-GREY. v1 painted it
     `dkh(face, 0.30..0.62)` off an already-dark base, so on the cold S2 set the
     hero artifact was a near-black rectangle on a near-black street — the scene
     measured 4.58 and the object the whole reel is about was invisible in the
     one scene that introduces it. Brightening the SUBJECT is the sanctioned fix
     (§8); the set's own `back2`/`floor2` dark stops are untouched. */
  const face = mxh(CONCRETE, 0.06 + lit * 0.22);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {/* the raw shell */}
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(172deg, ${face} 0%, ${dkh(face, 0.42)} 100%)`,
        boxShadow: SH_D }} />
      {/* concrete pour lines — the texture that makes it a building not a slab */}
      {Array.from({ length: 7 }, (_, i) => (
        <div key={"pl" + i} style={{ position: "absolute", left: 0, right: 0, top: h * (i + 1) / 8,
          height: 3, background: hexa("#05070B", 0.30) }} />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <div key={"pv" + i} style={{ position: "absolute", top: 0, bottom: 0, left: w * (i + 1) / 5,
          width: 3, background: hexa("#05070B", 0.22) }} />
      ))}
      {/* the ground-floor reveal — a dark shopfront window, always there */}
      <div style={{ position: "absolute", left: w * 0.10, bottom: 0, width: w * 0.80, height: h * 0.20,
        background: `linear-gradient(180deg, ${hexa("#0A0F16", 0.92)} 0%, ${hexa("#0A0F16", 0.72)} 100%)`,
        border: `4px solid ${hexa("#05070B", 0.5)}` }} />

      {/* the panel stack — clipped, so `scroll` is a real scroll and not a slide */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transform: `translateY(${scroll}px)` }}>
          {slots.map(([sx, sy, sw, sh], i) => (
            <Slot key={"sl" + i} x={sx} y={sy} w={sw} h={sh} on={slotOn} z={2}
              filled={seats.some(s => s.y === sy && f >= s.at)} />
          ))}
          {seats.filter(s => f >= s.at).map((s, i) => {
            const lf = f - s.at;
            /* ⛔ NOTHING LANDS AND STOPS: every seated panel takes a squash on
               arrival and then keeps a damped rock that never quite settles. */
            const sy = squash(lf, 0, 0.17, 3, 11);
            const rk = rock(lf, 3, 1.9, 22);
            return (
              <div key={"st" + i} style={{ position: "absolute", left: 0, top: 0,
                transform: `scale(${2 - sy}, ${sy}) rotate(${rk}deg)`,
                transformOrigin: `${s.x + s.w / 2}px ${s.y + s.h}px` }}>
                <Clad x={s.x} y={s.y} w={s.w} h={s.h} kind={s.kind} c={s.c} lit={lit} z={3}
                  f={lf} seed={i} fill={E(lf, 5, 40, 0, 1, LIN)} />
              </div>
            );
          })}
        </div>
      </div>

      {scaffold && (<>
        {/* scaffold standards + ledgers, in FRONT of the face */}
        {[0.04, 0.96].map((k, i) => (
          <div key={"sc" + i} style={{ position: "absolute", left: w * k - 7, top: -18, width: 14,
            height: h + 18, background: "#6B6F5E", zIndex: 8 }} />
        ))}
        {[0.30, 0.62, 0.90].map((k, i) => (
          <div key={"sl" + i} style={{ position: "absolute", left: w * 0.04, top: h * k, width: w * 0.92,
            height: 9, background: "#5E6253", zIndex: 8 }} />
        ))}
      </>)}
    </div>
  );
};

/* =========================================================================
   ⭐⭐⭐ THE REAL SITE, SCROLLING. `src` is a tall PNG pulled LIVE from the
   library's own site on build day (`public/shots/`), rendered through a
   CLIPPING viewport with a moving offset — which is what turns a still capture
   into a genuine scroll-through rather than a crossfade between two frames.

   This is the biggest single motion lever in the repo and it is not close:
   real UI took reel 107's median 6.36 -> 8.00, with one scene 6.30 -> 10.25 and
   another 7.99 -> 13.24. It also satisfies the playbook's PROOF requirement at
   the same time, because the receipt for "this library exists and looks like
   this" is the library's own page.

   ⛔ REAL FOOTAGE IS NOT AUTOMATICALLY MOTION. A capture HELD for a whole
   sentence measured 3.23 with a 60-frame dead run; cutting inside it on the
   beat took it to 4.40. So every call site here either scrolls continuously or
   gets cut, and none of them just sits.
   ====================================================================== */
export const SiteScreen: React.FC<{ x: number; y: number; w: number; h: number;
  src: string; scroll?: number; z?: number; grey?: number; on?: number;
  url?: string; bezel?: number; capW?: number }> =
  ({ x, y, w, h, src, scroll = 0, z = 40, grey = 0, on = 1, url, bezel = 14, capW = 900 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: "#0A0B0F", boxShadow: SH_D, border: `${bezel}px solid #24262E` }}>
    {/* the address bar — the real URL, because a claim about a site is cheap
        and the site's own domain on screen is a receipt */}
    {url && (
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 40,
        background: "#16181F", display: "flex", alignItems: "center", paddingLeft: 14, gap: 9,
        borderBottom: "2px solid #2A2D36", zIndex: 4 }}>
        {["#E0655B", "#E3B341", "#5BB98C"].map(c => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ marginLeft: 10, height: 24, flex: 1, marginRight: 14, borderRadius: 12,
          background: "#0C0E13", display: "flex", alignItems: "center", paddingLeft: 12,
          ...mono(15, 700), color: "#B9BCC6" }}>{url}</div>
      </div>
    )}
    {/* the clipping viewport */}
    <div style={{ position: "absolute", left: 0, right: 0, top: url ? 40 : 0, bottom: 0,
      overflow: "hidden", filter: grey > 0 ? `grayscale(${grey}) brightness(${1 - grey * 0.34})` : undefined,
      opacity: on }}>
      <Img src={staticFile("shots/" + src)}
        style={{ position: "absolute", left: 0, top: -scroll, width: w - bezel * 2,
          display: "block" }} />
    </div>
  </div>
);

/* =========================================================================
   THE VILLAIN. ⛔ Its RULE: its marquee stays lit and its invoice stays
   legible through every scene. It is never torn and never stamped — at S9 it
   is OUT-SHONE, which is the only way it is allowed to lose.
   ====================================================================== */
export const Tower: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  on?: number; z?: number; showName?: boolean }> =
  ({ x, y, w, h, f, on = 1, z = 24, showName = true }) => {
  const cols = 5, rows = 9;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(168deg, #2A3350 0%, #141A2C 100%)`, boxShadow: SH_D }} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const r = Math.floor(i / cols), c = i % cols;
        /* the slow window chase — the background process that runs all reel */
        const lit = ((Math.sin(f / 22 + i * 0.9) + 1) / 2) > 0.34 ? 1 : 0.30;
        /* at S9 the tower dies TOP-DOWN while ours lights bottom-up */
        const alive = on >= 1 ? 1 : (r / rows < on ? 0.10 : 1);
        return (
          <div key={"wd" + i} style={{ position: "absolute",
            left: w * (0.09 + c * 0.185), top: h * (0.10 + r * 0.088),
            width: w * 0.125, height: h * 0.052,
            background: hexa(GOLD, 0.86 * lit * alive * on + 0.05) }} />
        );
      })}
      {showName && (
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.015, textAlign: "center",
          ...ui(Math.max(11, w * 0.088), 900), color: hexa("#F2E2B0", 0.62 + 0.38 * on),
          letterSpacing: 0.5 }}>{R.agency.name}</div>
      )}
    </div>
  );
};

/** the agency's QUOTE BOARD — the claim plate at frame 0 and the villain's
    receipt for the rest of the reel. ⭐ ONE CONTIGUOUS CREAM MASS: reel 110
    learned that a dark header strip SPLIT an 18%-by-area card down to 10.6% as
    far as HOOK_PLATE is concerned, so the header here is a tinted band ON the
    cream, never a separate dark slab. */
export const QuoteBoard: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  /** frames on which each price cell LANDS. ⭐ §4: a number MOVES to its value,
      it is never typeset at it — so the price arrives as N discrete flap lands
      (N discrete pops beat one long tween: 4.27 -> 5.63, measured) rather than
      appearing. `rockAt` is the last land, which is what makes the board swing. */
  lands?: number[]; rockAt?: number; z?: number }> =
  ({ x, y, w, h, f, lands = [], rockAt = 0, z = 60 }) => {
  const rk = rock(f, rockAt, 4.6, 30);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      transform: `rotate(${rk}deg)`, transformOrigin: "50% -60px" }}>
      {/* two chains, drawn up out of frame */}
      {[0.18, 0.82].map((c, i) => (
        <div key={"ch" + i} style={{ position: "absolute", left: w * c - 5, top: -640, width: 10,
          height: 646, background: "#5A5E68" }}>
          {Array.from({ length: 16 }, (_, j) => (
            <div key={j} style={{ position: "absolute", left: -4, top: j * 40, width: 18, height: 12,
              borderRadius: 6, border: "3px solid #7C818C" }} />
          ))}
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: CREAMB, boxShadow: SH_D,
        border: "6px solid #D8CFB8" }}>
        {/* the tinted header band — ON the cream, never a dark slab that would
            split the plate in two as far as the gate is concerned */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.20,
          background: hexa("#C9BFA4", 0.55), borderBottom: `4px solid ${hexa("#8E856E", 0.6)}` }} />
        <div style={{ position: "absolute", left: w * 0.06, top: h * 0.045, ...ui(h * 0.115, 900),
          color: "#3A342A", letterSpacing: 1 }}>{R.agency.name}</div>
        {/* line-item rules, drawn as bars: type at this distance IS a bar. Six
            of them with a right-hand amount column, so the board reads as a
            real invoice rather than a cream slab with a gap in the middle. */}
        {[0, 1, 2, 3, 4, 5].map(i => (
          <React.Fragment key={"li" + i}>
            <div style={{ position: "absolute", left: w * 0.06, top: h * (0.265 + i * 0.062),
              width: w * (0.50 - (i % 3) * 0.11), height: h * 0.026,
              background: hexa("#3A342A", 0.26) }} />
            <div style={{ position: "absolute", right: w * 0.06, top: h * (0.265 + i * 0.062),
              width: w * (0.12 + (i % 2) * 0.04), height: h * 0.026,
              background: hexa("#3A342A", 0.20) }} />
          </React.Fragment>
        ))}
        {/* the total rule the price sits under. ⛔ It must clear the flap row
            (which starts at 65% and is painted OVER it) or the 3px gaps between
            cells chop it into a row of dashes. */}
        <div style={{ position: "absolute", left: w * 0.06, right: w * 0.06, top: h * 0.600,
          height: h * 0.011, background: hexa("#3A342A", 0.40) }} />
        {/* ⛔⛔ THE PRICE IS A ROW OF FLAPS THAT ARE CREAM WHEN BLANK, and that is
            not decoration — `HOOK_PLATE` measures the largest CONTIGUOUS bright
            mass, and reel 110 lost 18% of a panel down to 10.6% because a dark
            strip cut its card in half. Blank flaps keep the board one cream
            object on frame 0; the numerals then flip IN, which is also how the
            number gets to move to its value instead of being typeset at it. */}
        {(() => {
          const chars = R.agency.price.split("");
          const cw = (w * 0.80) / chars.length;
          return chars.map((ch, i) => {
            const at = lands[i] ?? lands[lands.length - 1] ?? 0;
            const kf = E(f, at, at + 5, 0, 1, OUT);
            return (
              <div key={"pc" + i} style={{ position: "absolute", left: w * 0.10 + i * cw,
                bottom: h * 0.05, width: cw - 3, height: h * 0.30, overflow: "hidden",
                background: CREAMB }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
                  justifyContent: "center", ...ui(h * 0.27, 900), color: "#B3352B",
                  letterSpacing: -1, opacity: kf,
                  transform: `rotateX(${(1 - kf) * 88}deg)` }}>{ch}</div>
                {/* ⛔ the flap's hinge line only appears once the cell has
                    TURNED. Drawn while blank it reads as a scratch across the
                    board and breaks the one-contiguous-cream-mass rule that
                    `HOOK_PLATE` is measuring. */}
                {kf > 0.02 && (
                  <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 2,
                    background: hexa("#8E856E", 0.30 * kf) }} />
                )}
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

/* =========================================================================
   THE AGENCY'S PRESS. A colossal rubber stamp on a piston that comes down out
   of the top of frame and prices whatever is under it.
   ⛔ It is the VILLAIN'S instrument, so it never breaks and never gets taken
   away — it stamps, it lifts, and it is still hanging there at the end of the
   scene. The agency does not lose until S9, and then only by being out-shone.
   ====================================================================== */
export const PressStamp: React.FC<{ x: number; y: number; w: number; h: number;
  z?: number; press?: number; label?: string }> =
  ({ x, y, w, h, z = 66, press = 0, label }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
    {/* the piston, drawn up out of frame */}
    <div style={{ position: "absolute", left: w / 2 - 46, top: -900, width: 92, height: 920,
      background: `linear-gradient(90deg, #6E7280 0%, #3A3E48 100%)` }}>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: -12, top: 40 + i * 96, width: 116,
          height: 16, background: "#2A2D36" }} />
      ))}
    </div>
    {/* the head — ONE contiguous cream mass, which is what HOOK_PLATE measures */}
    {/* ⛔ A DARKER RIM AND A STEEL COLLAR. Painted in flat house cream the head
        merged with the `HookHeader` pill sitting directly above it and the two
        read as one object — which is fine for HOOK_PLATE and wrong for a viewer,
        who then cannot tell the chrome from the scene. */}
    <div style={{ position: "absolute", left: -10, right: -10, top: -14, height: 26,
      background: "#3A3E48", zIndex: 2 }} />
    <div style={{ position: "absolute", inset: 0, background: CREAMB, boxShadow: SH_D,
      border: "9px solid #9A8F76" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.30,
        background: hexa("#B8AC8C", 0.62) }} />
      {/* ⛔ the label sits BELOW the header pill's footprint (~106px of panel),
          or the agency's name is clipped in the one frame guaranteed to be seen */}
      <div style={{ position: "absolute", left: w * 0.05, top: h * 0.40, ...ui(h * 0.17, 900),
        color: "#3A342A", letterSpacing: 1.5 }}>{label ?? R.agency.name}</div>
      {/* the embossed rule and the ribs of a real press head */}
      {[0, 1].map(i => (
        <div key={i} style={{ position: "absolute", left: w * 0.05, right: w * 0.05,
          top: h * (0.68 + i * 0.13), height: h * 0.05, background: hexa("#3A342A", 0.16) }} />
      ))}
    </div>
    {/* the rubber face, compressed on the press */}
    <div style={{ position: "absolute", left: w * 0.03, right: w * 0.03, top: h,
      height: 34 * (1 - press * 0.55), background: "#A8302A", boxShadow: SH }} />
  </div>
);

/** the wet ink a press leaves behind. ⛔ The price is the VO's own word and it
    belongs to the AGENCY, which is the only thing in this reel allowed to
    carry money. */
export const InkPrice: React.FC<{ x: number; y: number; w: number; f: number; at: number;
  z?: number; text?: string }> = ({ x, y, w, f, at, z = 70, text }) => {
  const k = E(f, at, at + 5, 0, 1, OUT);
  if (k <= 0) return null;
  const sq = 1 + (1 - k) * 0.26;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z, textAlign: "center",
      ...ui(w * 0.20, 900), color: hexa("#D8443A", 0.94), letterSpacing: -2,
      transform: `scale(${sq}) rotate(-2.4deg)`, transformOrigin: "50% 50%", opacity: k }}>
      {text ?? R.agency.price}
    </div>
  );
};

/* =========================================================================
   THE THREE CRATES. Each opens by a DIFFERENT mechanism — the critic pass
   killed three identical lid shots. Blocks / light / volume.
   ====================================================================== */
export const Crate: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  i: number; open?: number; z?: number; stencil?: string }> =
  ({ x, y, w, h, f, i, open = 0, z = 40, stencil }) => {
  const lib = R.libs[i];
  const body = dkh(lib.c, 0.52);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(164deg, ${mxh(body, 0.16)} 0%, ${dkh(body, 0.30)} 100%)`,
        boxShadow: SH_D, border: `5px solid ${dkh(lib.c, 0.66)}` }} />
      {/* case corners + latches — flight-case furniture */}
      {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([cx, cy], j) => (
        <div key={"cn" + j} style={{ position: "absolute", left: cx ? w - 30 : 0, top: cy ? h - 30 : 0,
          width: 30, height: 30, background: "#4A4E56" }} />
      ))}
      {[0.28, 0.72].map((k, j) => (
        <div key={"lt" + j} style={{ position: "absolute", left: w * k - 13, top: h * 0.30,
          width: 26, height: 20, background: "#8A9099" }} />
      ))}
      {/* the livery band + stencil */}
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.46, height: h * 0.10,
        background: hexa(lib.c, 0.85) }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.62, textAlign: "center",
        ...ui(Math.max(13, h * 0.095), 900), color: hexa(lib.accent, 0.95), letterSpacing: 1.5 }}>
        {stencil ?? lib.stencil}
      </div>
      {open > 0 && (
        <div style={{ position: "absolute", left: -6, right: -6, top: -10, height: h * 0.26,
          background: dkh(lib.c, 0.44), border: `5px solid ${dkh(lib.c, 0.66)}`, zIndex: 4,
          /* ⛔ THE LID FLEW STRAIGHT UP AND LANDED ACROSS THE SCREEN BEHIND IT,
             covering the real page the whole scene exists to show. It now throws
             sideways and out of frame, which is also what a blown lid does. */
          transformOrigin: "50% 100%",
          transform: `translate(${-open * 300}px, ${-open * 96}px) rotate(${-open * 62}deg)` }} />
      )}
    </div>
  );
};

/* =========================================================================
   THE LIGHTING RIG — Vengeance's "cinematic animations".
   ⛔ Light is always a SHAPED CONE, never a full-frame fill (reel 78 was
   rejected twice for a full-panel tint: it flattens the grade AND makes the
   motion metric look good for the wrong reason).
   ====================================================================== */
export const FloodHead: React.FC<{ x: number; y: number; s?: number; on?: number;
  c?: string; z?: number; ang?: number }> =
  ({ x, y, s = 1, on = 0, c = "#CBEAE4", z = 50, ang = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${ang}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: -6 * s, top: -26 * s, width: 12 * s, height: 26 * s,
      background: "#4A4E56" }} />
    <div style={{ position: "absolute", left: -30 * s, top: 0, width: 60 * s, height: 46 * s,
      background: `linear-gradient(180deg, #6E747E 0%, #33373E 100%)`, borderRadius: 4 * s }} />
    <div style={{ position: "absolute", left: -22 * s, top: 40 * s, width: 44 * s, height: 12 * s,
      background: hexa(c, 0.18 + on * 0.82) }} />
    {/* four barn doors, so it reads as a film flood and not a lamp */}
    {[[-30, -10], [30, 10]].map(([dx, r], j) => (
      <div key={"bd" + j} style={{ position: "absolute", left: dx * s - 3 * s, top: 34 * s,
        width: 6 * s, height: 26 * s, background: "#585D66",
        transform: `rotate(${r}deg)`, transformOrigin: "50% 0%" }} />
    ))}
  </div>
);

/** the shaped cone a lit head throws. */
export const ConeLight: React.FC<{ x: number; y: number; len: number; spread: number;
  c?: string; o?: number; z?: number; ang?: number }> =
  ({ x, y, len, spread, c = "#CBEAE4", o = 0.30, z = 28, ang = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, width: 0, height: 0,
    transform: `rotate(${ang}deg)`, transformOrigin: "50% 0%" }}>
    <div style={{ position: "absolute", left: -spread / 2, top: 0, width: spread, height: len,
      background: `linear-gradient(180deg, ${hexa(c, o)} 0%, ${hexa(c, o * 0.34)} 46%, ${hexa(c, 0)} 100%)`,
      clipPath: `polygon(46% 0%, 54% 0%, 100% 100%, 0% 100%)` }} />
  </div>
);

/* =========================================================================
   THE PARTS RACK — Animmaster's 250. The biggest object in the reel, cropped
   by the top edge, rolling in on rails.
   ====================================================================== */
export const PartsRack: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  bays?: number; ranks?: number; openFrom?: number; c?: string; z?: number }> =
  ({ x, y, w, h, f, bays = 7, ranks = 9, openFrom = 0, c = "#9FD9BC", z = 34 }) => {
  const bw = w / bays, bh = h / ranks;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", inset: 0,
        background: `linear-gradient(170deg, #2C4A46 0%, #12211F 100%)`, boxShadow: SH_D }} />
      {/* uprights — the rack's own structure, and the occluding mass */}
      {Array.from({ length: bays + 1 }, (_, i) => (
        <div key={"up" + i} style={{ position: "absolute", left: i * bw - 5, top: -20, width: 11,
          height: h + 20, background: "#3E5F58", zIndex: 6 }} />
      ))}
      {Array.from({ length: bays * ranks }, (_, i) => {
        const bx = (i % bays) * bw, by = Math.floor(i / bays) * bh;
        /* the drawers bang open in a TRAVELLING WAVE, rank after rank —
           swept area x speed is what measures, so the wave is wide and fast */
        const wave = (i % bays) * 2.2 + Math.floor(i / bays) * 5.4;
        const k = E(f, openFrom + wave, openFrom + wave + 7, 0, 1, OUT);
        const lit = 0.16 + k * 0.84;
        return (
          <div key={"dw" + i} style={{ position: "absolute", left: bx + 6, top: by + 5,
            width: bw - 14, height: bh - 11, zIndex: 4,
            transform: `translateY(${k * bh * 0.16}px)` }}>
            <div style={{ position: "absolute", inset: 0, background: dkh(c, 0.72 - k * 0.30) }} />
            <div style={{ position: "absolute", left: "10%", top: "16%", width: "80%", height: "44%",
              background: hexa(c, 0.20 + lit * 0.62) }} />
            <div style={{ position: "absolute", left: "18%", bottom: "16%", width: "64%", height: 4,
              background: hexa("#0A0F12", 0.5) }} />
            {/* the drawer pull */}
            <div style={{ position: "absolute", left: "36%", bottom: "4%", width: "28%", height: 5,
              background: hexa(c, 0.5 + k * 0.5) }} />
          </div>
        );
      })}
      {/* the chain drive — the background process, always running */}
      <div style={{ position: "absolute", right: -22, top: 0, bottom: 0, width: 16,
        background: "#25403C", zIndex: 8 }}>
        {Array.from({ length: 22 }, (_, i) => (
          <div key={"cd" + i} style={{ position: "absolute", left: -3, width: 22, height: 11,
            top: ((i * 46 + f * 3.4) % (h + 46)) - 46, borderRadius: 4,
            border: "3px solid #4E7A72" }} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   THE CURSOR — "mouse driven interactions".
   ⛔ A 30x38 cursor travelling is one of the MEASURED ZEROES. The point is not
   the pointer: it is the TRAVELLING WAVE of panels flinching as it passes, and
   the grab-and-slap that depicts "copy and paste". So this is ~200px.
   ====================================================================== */
export const BigCursor: React.FC<{ x: number; y: number; s?: number; z?: number;
  press?: number }> = ({ x, y, s = 200, z = 70, press = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${1 - press * 0.12})`, transformOrigin: "0% 0%" }}>
    <svg width={s * 0.72} height={s} viewBox="0 0 72 100">
      <path d="M4 2 L4 78 L22 62 L34 92 L50 85 L38 56 L62 54 Z"
        fill="#F7F5F0" stroke="#16181E" strokeWidth={6} strokeLinejoin="round" />
    </svg>
  </div>
);

/* =========================================================================
   THE MARQUEE — the CTA object. Split-flap cells flipping letter by letter is
   a DEPICTION of type arriving; typesetting the word is not.
   ====================================================================== */
export const Marquee: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  text: string; at?: number; z?: number; c?: string }> =
  ({ x, y, w, h, f, text, at = 0, z = 60, c = GOLD }) => {
  const n = text.length, cw = w / n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      <div style={{ position: "absolute", left: -18, top: -18, right: -18, bottom: -18,
        background: `linear-gradient(172deg, #4A3A1E 0%, #241B0E 100%)`, boxShadow: SH_D }} />
      {/* the chase bulbs around the frame */}
      {Array.from({ length: 26 }, (_, i) => {
        const on = ((i + Math.floor(f / 3)) % 4) < 2 ? 1 : 0.28;
        const per = i / 26, edge = per * (w * 2 + h * 2);
        let bx = 0, by = 0;
        if (edge < w) { bx = edge; by = -30; }
        else if (edge < w + h) { bx = w + 12; by = edge - w; }
        else if (edge < w * 2 + h) { bx = w - (edge - w - h); by = h + 12; }
        else { bx = -30; by = h - (edge - w * 2 - h); }
        return <div key={"bl" + i} style={{ position: "absolute", left: bx, top: by, width: 17,
          height: 17, borderRadius: "50%", background: hexa("#FFE9A8", on) }} />;
      })}
      {Array.from({ length: n }, (_, i) => {
        const flipped = f >= at + i * 3;
        const kf = E(f, at + i * 3, at + i * 3 + 5, 0, 1, OUT);
        return (
          <div key={"cl" + i} style={{ position: "absolute", left: i * cw + 4, top: 0,
            width: cw - 8, height: h, background: "#15181F", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", ...ui(h * 0.62, 900), color: c,
              transform: `rotateX(${(1 - kf) * 90}deg)`, transformOrigin: "50% 50%",
              opacity: flipped ? 1 : 0 }}>{text[i]}</div>
            <div style={{ position: "absolute", left: 0, right: 0, top: h / 2 - 1, height: 2,
              background: hexa("#000", 0.6) }} />
          </div>
        );
      })}
    </div>
  );
};

/* =========================================================================
   THE CREW. ⭐ SPRITES NEED AN ACTION LOOP, NOT AN IDLE — the single biggest
   measured lift in the repo (reel 107: failures 3/11 -> 1/11, every scene rose).
   Four loops by index, each on its own phase and rate, so a crowd is doing four
   different things at once instead of one animation played N times.
   ⛔ ALL TWELVE costume levers, cycled DETERMINISTICALLY (re-renders must be
   identical). Reel 107 shipped four and was told so.
   ====================================================================== */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { glasses: 1 }, { cop: 1 }, { suit: 1 }, { beard: 1 }, { prof: 1 },
  { chef: 1 }, { wizard: 1 }, { samurai: 1 }, { fro: 1 }, { girl: 1 }, { constr: 1, glasses: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; o?: number; tint?: string; act?: number; gaze?: number; shock?: number;
  cheer?: number }> =
  ({ f, x, y, i, size, z = 40, o = 1, tint, act, gaze, shock = 0, cheer = 0 }) => {
  const t = f * (0.86 + (i % 5) * 0.08) + i * 11;
  const a = act ?? i % 4;
  /* ⛔ an idle wobble has to be VISIBLE to count: 1.15deg / 1.7px MEASURED as
     "never static" and READ as static. 2.6deg / 4.6px with a second slower
     harmonic is the amplitude that actually shows. */
  const pace = a === 0 ? Math.sin(t / 17) * size * 0.30 : 0;
  const stride = a === 0 ? Math.abs(Math.sin(t / 8.5)) * size * 0.07 : 0;
  const hopPh = (t + i * 7) % 48;
  const hop = a === 2 ? -Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * size * 0.22 : 0;
  const lean = a === 1 ? Math.sin(t / 8) * 15 : 0;
  const drive = a === 1 ? Math.abs(Math.sin(t / 8)) : 0;
  const look = a === 3 ? Math.sin(t / 11) * 1.1 : 0;
  const wob = Math.sin(t / 23 + i) * 2.6 + Math.sin(t / 41 + i * 0.7) * 1.4;
  return (
    <div style={{ position: "absolute", left: x + pace - size / 2, top: y - size - hop - stride,
      zIndex: z, opacity: o, transform: `rotate(${lean + wob * 0.35}deg)`,
      transformOrigin: "50% 96%" }}>
      {/* ⛔ NEVER HAND-DRAW A LIMB ONTO THE HOUSE MASCOT (reels 108 + 110: a drawn
          arm reads as a TAIL on every sprite). The WORK loop is carried by the
          body lean and a faster, deeper nod, which the sprite already has. */}
      <Mascot lf={t} size={size} gaze={gaze ?? look}
        nodAmp={a === 1 ? 6.4 + drive * 3.2 : 4.2} nodSpeed={a === 1 ? 7 : 11}
        shock={shock} cheer={cheer || (a === 2 ? Math.max(0, Math.sin((hopPh / 48) * Math.PI * 2)) * 0.7 : 0)}
        tint={tint} {...(costumeFor(i) as any)} />
    </div>
  );
};

/** ⛔⛔ THE CROWD PITCH IS ARITHMETIC, NOT TASTE. `spacing >= 0.85 * size`,
    computed BEFORE adding count — reel 107 put 18 sprites at s=148 across 600px
    (120px pitch for ~126px bodies) and it rendered as one unreadable orange
    mass. Ten sprites, 5 columns, 190px pitch reads as a cast.
    Against an 892px usable width: `pitch = 892/(n+1)`.
      n=10 pitch 81.1  size 92  -> 0.85*92 = 78.2  OK
      n=7  pitch 111.5 size 128 -> 0.85*128 = 108.8 OK
      n=5  pitch 148.7 size 168 -> 0.85*168 = 142.8 OK */
export const RACK_RANKS: Array<[number, number, number, number]> = [
  [10, 470, 0.61, 0.72],
  [7,  548, 0.85, 0.88],
  [5,  648, 1.12, 1.00],
];
export const RANK_TINT: Array<string | undefined> = ["#8F4E36", "#B0603C", undefined];
