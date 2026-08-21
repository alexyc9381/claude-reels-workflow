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
   REEL 116 · "BILL" — THE WORLD KIT.  Board: storyboards/116-bill.md.

   Subject: FIVE free Google AI tools — AI Studio, NotebookLM, Flow, Opal and
   Antigravity — verified live 2026-08-20 (see the board's §0 for each source).

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS.
      [[feedback_real_marks_are_the_props]] has burned THREE reels, and reel 86
      CANCEL burned five hook worlds on THIS EXACT PREMISE — toll plazas,
      supermarkets, subways, a night city and a **billing plant** — because *"a
      metaphor for half the subject is not the subject."*

      Point at each prop and say what it is:
        "it's a subscription bill and it has five charges on it"  -> ships
        "it's a billing plant, which stands for being charged"    -> cut

      So the spine object is THE BILL ITSELF: one continuous printed invoice
      roll that crosses every scene and is physically CUT SHORTER five times.
      It is also the keyword.

   ⭐⭐⭐ AND IT IS THE TRAVELLING BAND. The roll is always creeping, and it
      alternates BLANK PAPER (light) with PRINTED ROWS (shadow) — the only
      version of a band that raises motion without lifting the black point
      (reel 106: light-only scored 7.79 and pushed p10 47.4 -> 56.1; interleaved
      scored 9.92 with p10 back DOWN).

   ⛔⛔ THE HONESTY LEDGER IS `R` BELOW AND NOWHERE ELSE. Every figure the
      picture may state lives there, so no scene can invent one.

   ⛔⛔⛔ THE FIVE THAT WILL COST A ROUND IF THEY ARE FORGOTTEN:
      1. NO `FREE` PLATE AND NO `$0` ON THE FLOW BEAT (S9/S10). Flow's free tier
         is 50 DAILY CREDITS — metered, not open. "Free" stays in the AUDIO.
      2. NO `20x` PLATE, NO MULTIPLIER GAUGE, NO PERCENTAGE (S17). There is no
         published benchmark. Output VOLUME is drawn instead.
      3. ONLY THREE PAID MARKS EXIST, because the VO names only three:
         higgsfield, bytedance (Seedance), cursor. The "$20 a month for a chat
         window" line names NO vendor, so that row carries NO mark.
      4. NO TOTAL, EVER. The only money on screen is `$20/MO`, twice, because
         the VO says $20 twice and both are real. The spine counts CHARGES.
      5. NO "0% HALLUCINATION" PLATE. S8 draws a TETHER, not a score.

   ⛔ MATTE ONLY. Nothing here carries `boxShadow: 0 0 Npx` — the grep gate on
      that must return 0.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST. Use dkh/mxh.
   ⛔ `Scene` push walks content off-frame: keep `left >= 506 - 486/push`.
   ⛔ A transformed wrapper with NO zIndex VANISHES. Use `Cam`.
   ⛔ `Mascot`'s drawn body is ~100% of `size`, NOT 70%. Pitch >= 0.85 * size.
   ⛔ THE 40px FLOOR APPLIES TO MOVING OBJECTS TOO.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

export const CLAY = "#D97757", CLAYD = "#B8501F", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F4EC", CREAMB = "#F2EDE0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9", STEEL = "#8E9299";
export const OXIDE = "#8C4A2E", BRASS = "#C9A15A";
/* the four Google brand values, sampled from the real mark — used ONLY on the
   product cards and the tile wall, never as room light. */
export const G_BLUE = "#4285F4", G_RED = "#EA4335", G_YEL = "#FBBC05", G_GRN = "#34A853";

/* =========================================================================
   ⛔⛔ THE HONESTY LEDGER. Verified live 2026-08-20 against each product's own
   page. NOTHING in the picture may state a figure that is not in here.
   ====================================================================== */
export const R = {
  /* ⭐⭐ THE FIVE, IN VO ORDER, AND FOUR NOW CARRY THEIR REAL MARK.
     The first build used the Google `G` for Flow / Opal / Antigravity because
     none of them publishes an icon on the usual gstatic product-logo path. That
     was the wrong place to stop looking:
       · FLOW         labs.google/fx/icons/favicon/flow_favicon_b.png — 653x524,
                      and the mark is a PROJECTOR LIGHT-CONE, which is exactly
                      right for a film tool
       · ANTIGRAVITY  the @googleantigravity channel avatar at s900 — 900x900 of
                      the real gradient arch, on Google's own dark tile
       · NOTEBOOKLM   the official product mark is MONOCHROME arcs; the
                      "..._color_..." gstatic path returns the same mono glyph,
                      so the repo SVG was already correct
       · AI STUDIO    gstatic web-512dp, real colour
     ⛔ OPAL is the one that genuinely has no icon: opal.google renders its
     identity as a WORDMARK plus a Google Labs chip, read live. So Opal keeps
     the wordmark treatment — that is not a fallback, it IS the mark. */
  tools: [
    { key: "aistudio", name: "AI STUDIO",   mark: "logos/aistudio.png",       real: true,  dark: false },
    { key: "notebook", name: "NOTEBOOKLM",  mark: "logos/notebooklm_mark.png", real: true,  dark: false },
    /* ⛔⛔ THE FLOW CONE ONLY READS ON A DARK TILE. Google ships it in two
       versions and the DARK-INK one on a white tile is a solid black rectangle
       at card size — the mark is a light-cone that fades to transparent, so its
       silhouette is the FADE, and a fade against white has no edge at all. The
       white-on-dark version is the same asset read the right way round: a
       projector beam, which is what a film tool's mark should look like. Reel
       110's silhouette test, applied to a logo. */
    { key: "flow",     name: "FLOW",        mark: "logos/googleflow_light.png", real: true, dark: true },
    { key: "opal",     name: "OPAL",        mark: "logos/google.svg",         real: false, dark: false },
    { key: "antigrav", name: "ANTIGRAVITY", mark: "logos/antigravity.png",    real: true,  dark: true  },
  ] as const,

  /* ⭐ the ONLY two figures the picture may draw, and why each is safe:
       1M    Gemini 3 input context is 1,000,000 tokens. The VO understates it
             ("big enough to drop a whole codebase into"), and an understated VO
             figure is safe to draw exactly.
       $20   the VO SAYS "$20 a month" twice, and both are real prices
             (ChatGPT Plus / Google AI Pro ~= $20; Cursor Pro $20). */
  context: "1M",
  price: "$20",

  /* the three paid marks the VO actually names. NO OTHERS. */
  paid: [
    { key: "higgsfield", mark: "logos/higgsfield.png" },
    { key: "seedance",   mark: "logos/bytedance.svg" },
    { key: "cursor",     mark: "logos/cursor.svg" },
  ] as const,

  /* the three surfaces Antigravity's own docs name */
  surfaces: ["EDITOR", "TERMINAL", "BROWSER"] as const,
} as const;

/** ⛔ a `$0`, a `FREE` stamp or a saving anywhere near the Flow beat would be
    asserting an open free tier that does not exist (50 daily credits). */
export const FREE_STAMP_BANNED_SCENES = [9, 10] as const;
/** ⛔ no multiplier, no percentage, no benchmark — none is published. */
export const RATE_BANNED = ["20x", "20X", "%", "FASTER", "MORE PRODUCTIVE"] as const;
/** ⛔ no total, no sum, no "saved" — "thousands a month" is not sourceable. */
export const TOTAL_BANNED = ["TOTAL", "SAVED", "$1,000", "THOUSANDS", "/YR"] as const;

/* =========================================================================
   THE ELEVEN PLACES. A new light AND colour every 2-4s
   (`feedback_reel_vary_the_locations`), and neighbouring scenes differ by BOTH
   hue and lightness.

   ⛔⛔ THE >=140 LUMA BAR IS FRAME 0 AND NOWHERE ELSE (ANIMATION-QUALITY §8).
   Body scenes target luma 70-105, saturated pixels 34-45%, black point p10
   <= 35. `hall` is the hook set: its mean is carried by the CREAM BILL, which
   is the subject, so the dark stop is never touched.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* S0 — THE BILL HALL. A dark records room, one overhead lamp. The bill is a
     colossal cream mass against it, which is where frame 0's luma comes from
     and also where the reel's biggest value SPREAD is. */
  hall:    { back: "#3A3038", back2: "#181318", floor: "#4A3E38", floor2: "#221B18",
             lip: "#6E5A4E", key: "#FFE9C4", horizon: 522, grit: "#A88C70" },

  /* S1 — the same hall RELIT COLD AND HARD from camera-left, punched in. The
     return must not read as a copy: the key swings and the family goes blue. */
  hall2:   { back: "#2C3644", back2: "#111820", floor: "#333E4A", floor2: "#141B22",
             lip: "#52657A", key: "#CFE4F4", horizon: 540, grit: "#7E93A6" },

  /* S18/S19 — the hall lit HARDEST in the reel, warm, for the payoff. */
  hall3:   { back: "#4E3C2E", back2: "#241A13", floor: "#5E4A38", floor2: "#2A2018",
             lip: "#8A6E52", key: "#FFF0D2", horizon: 528, grit: "#C9A87E" },

  /* S2 — THE SIFTING LAB. Flat bright daylight: the brightest set in the reel
     and the biggest hue+lightness jump anywhere in it. */
  lab:     { back: "#6E8EA0", back2: "#2A3E4C", floor: "#5C8093", floor2: "#1E3038",
             lip: "#9AC4D8", key: "#FFFFFF", horizon: 552, grit: "#B0D2E2" },

  /* S3 — THE RAIL. Warm key on a lit bench in front of the lab wall, the wall
     dropped a full stop behind it so the five cards rank. */
  rail:    { back: "#3E4A52", back2: "#1A2228", floor: "#6A5238", floor2: "#33261A",
             lip: "#96764E", key: "#FFDCA2", horizon: 534, grit: "#C0996A" },

  /* S4 — THE TOLL BOOTH. Cold, cramped, meter-green. The meanest frame here. */
  booth:   { back: "#26382F", back2: "#0E1815", floor: "#2A3C33", floor2: "#101A16",
             lip: "#436054", key: "#9EE0BE", horizon: 548, grit: "#5E8A74" },

  /* S5 — the booth BLOWN OUT: the cage is gone and a browser fills the wall. */
  wide:    { back: "#8FA8C0", back2: "#3A5068", floor: "#7C93AA", floor2: "#2E4055",
             lip: "#B6CCE0", key: "#FFFFFF", horizon: 566, grit: "#C6D8E8" },

  /* S6 — THE SHAFT. Deep, warm, vertical: the only set lit from BELOW. */
  shaft:   { back: "#4A3A22", back2: "#1C1408", floor: "#5E4826", floor2: "#241A0C",
             lip: "#8A6A34", key: "#FFD98A", horizon: 588, grit: "#C29A50" },

  /* S7 — THE STACKS. A warm archive, one green reading lamp, shelves receding. */
  stacks:  { back: "#3E3A2A", back2: "#191710", floor: "#4E4632", floor2: "#211D14",
             lip: "#766A48", key: "#D8E8B0", horizon: 530, grit: "#A89A6E" },

  /* S8 — THE READING DESK, cool and tight under the stacks. */
  desk:    { back: "#2E3444", back2: "#12161F", floor: "#363C4C", floor2: "#171B24",
             lip: "#556080", key: "#BFD0F0", horizon: 552, grit: "#8090B0" },

  /* S9/S10 — THE STAGE. The darkest set and the deepest: one big key, a black
     surround, and the reel's strongest occluder in front of the action. */
  stage:   { back: "#241E2E", back2: "#0A0810", floor: "#2C2436", floor2: "#0E0B14",
             lip: "#4A3E5E", key: "#FFE2B0", horizon: 560, grit: "#7A6890" },

  /* S12/S13 — THE BENCH. ⛔⛔ THE FIRST VERSION WAS BROWN ON BROWN ON BROWN:
     a brown back wall, a brown bench and a brown press, so nothing in the shot
     had a silhouette and both scenes read as an empty room on the contact
     sheet. Reel 110's test — *name which side of the contrast the subject is
     on* — has no answer when every value in the frame is the same.
     ⭐ The back wall goes COLD and a stop down while the bench and the key stay
     warm. Nothing gets brighter; the SPREAD does the work, which is §8's
     "brightness is the mean, hierarchy is the spread" built rather than
     argued. */
  bench:   { back: "#2E3440", back2: "#12161C", floor: "#6A4C32", floor2: "#2A1C12",
             lip: "#9A7048", key: "#FFCE8E", horizon: 540, grit: "#C09660" },

  /* S14/S15/S16 — THE BAYS. A wide dark control room; the three bay screens are
     the only light, so the light source and the mechanism are the same object. */
  bays:    { back: "#1E2A34", back2: "#080D12", floor: "#242F3A", floor2: "#0A0F14",
             lip: "#3A5060", key: "#7FD4E8", horizon: 546, grit: "#527084" },

  /* S17 — THE OUTPUT FLOOR. Bright, even, near shadowless: relief after the
     control room and the reel's second brightest set. */
  out:     { back: "#C08A5E", back2: "#54341C", floor: "#CE9464", floor2: "#573520",
             lip: "#EABC92", key: "#FFF4DE", horizon: 548, grit: "#EECBA2" },
};
export const asPlace = (k: keyof typeof PLACES): Place => PLACES[k];

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
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* =========================================================================
   ⭐⭐⭐ THE RAKE — the travelling band that keeps every scene alive.
   ⛔⛔ IT ALTERNATES LIGHT AND SHADOW, and it is FEATHERED. What makes a band
   read as WALLPAPER is the HARD EDGE; what makes it MEASURE is SWEPT AREA x
   SPEED. Keep the feathering and the width, buy motion back through `rate`.
   ====================================================================== */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  c?: string; o?: number; rate?: number; z?: number; n?: number; ang?: number }> =
  ({ f, y, h, x0 = -320, span = 1720, c = "#FFE7BC", o = 0.24, rate = 4.4, z = 22, n = 6, ang = -17 }) => {
  const pitch = span / n;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, height: h, zIndex: z,
      overflow: "hidden", pointerEvents: "none" }}>
      {Array.from({ length: n * 2 }, (_, i) => {
        const dark_ = i % 2 === 1;
        const x = x0 + ((i * pitch * 0.5 + f * rate) % span);
        return (
          <div key={"rk" + i} style={{ position: "absolute", left: x, top: -h * 0.5,
            width: pitch * 0.44, height: h * 2, transform: `rotate(${ang}deg)`,
            background: dark_
              ? `linear-gradient(90deg, ${hexa("#0A0A10", 0)} 0%, ${hexa("#0A0A10", o * 0.72)} 50%, ${hexa("#0A0A10", 0)} 100%)`
              : `linear-gradient(90deg, ${hexa(c, 0)} 0%, ${hexa(c, o)} 50%, ${hexa(c, 0)} 100%)` }} />
        );
      })}
    </div>
  );
};

/** an expanding ring — every arrival costs something */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  r?: number; z?: number; dur?: number; w?: number }> =
  ({ x, y, f, at, c = "#FFE7BC", r = 200, z = 70, dur = 18, w = 8 }) => {
  const lf = f - at;
  if (lf < 0 || lf > dur) return null;
  const t = lf / dur;
  const rr = r * (0.18 + t * 0.82);
  return (
    <div style={{ position: "absolute", left: x - rr, top: y - rr * 0.42, width: rr * 2,
      height: rr * 0.84, borderRadius: "50%", zIndex: z, opacity: (1 - t) * 0.8,
      border: `${w * (1 - t * 0.6)}px solid ${c}` }} />
  );
};

/** a puff of dust — an arrival that just appears reads as a state change */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  n?: number; s?: number; z?: number; dur?: number; up?: number }> =
  ({ x, y, f, at, c = "#D8C4A0", n = 14, s = 1, z = 68, dur = 26, up = 1 }) => {
  const lf = f - at;
  if (lf < 0 || lf > dur) return null;
  const t = lf / dur;
  return (<>{Array.from({ length: n }, (_, i) => {
    const a = (rnd(at + 7, i) - 0.5) * 2.6;
    const sp = 40 + rnd(at + 13, i) * 130;
    const size = (11 + rnd(at + 3, i) * 22) * s;
    return (
      <div key={"pf" + i} style={{ position: "absolute", zIndex: z,
        left: x + Math.cos(a) * sp * t * s - size / 2,
        top: y - Math.abs(Math.sin(a)) * sp * t * 0.7 * up * s - size / 2 + t * t * 34,
        width: size, height: size, borderRadius: "50%", background: c,
        opacity: (1 - t) * 0.5 }} />
    );
  })}</>);
};

/** a solid light pool on the floor — matte, never an emissive blur */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; h?: number }> =
  ({ x, y, w, c = "#FFE7BC", o = 0.4, z = 19, h }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y - (h ?? w * 0.34) / 2, width: w,
    height: h ?? w * 0.34, borderRadius: "50%", zIndex: z,
    background: `radial-gradient(closest-side, ${hexa(c, o)} 0%, ${hexa(c, o * 0.42)} 52%, ${hexa(c, 0)} 100%)` }} />
);

/* =========================================================================
   ⭐⭐⭐ THE BILL — the reel's spine, its villain and its keyword.

   ⛔ IT IS DRAWN, NOT SUGGESTED. `feedback_props_need_real_drawing`: a book
   that was four divs got *"a whole lot of nothing even though there's more
   stuff"*. One CHARGE ROW here is: the paper ground, a perforation line, a
   left rule, a description block of three ink bars, a mark tile, a figure
   block, a ruled right column, an ink stamp ring and its bleed. Nine parts.
   ====================================================================== */

export type BillRow = {
  /** the paid mark on this row, or null — ⛔ only R.paid keys are legal, and
      rows the VO names no vendor for MUST be null. */
  mark?: string | null;
  /** a second mark on the same row (row 3 carries Higgsfield AND Seedance) */
  mark2?: string | null;
  /** the figure, or null. ⛔ ONLY `$20` is legal (R.price). */
  fig?: string | null;
  /** the frame this row is CUT at, or undefined if it survives */
  cut?: number;
};

/** ONE printed charge row. Nine drawn parts; the stamp is what recurs. */
export const ChargeRow: React.FC<{ w: number; h: number; row: BillRow; f: number;
  seed: number; stamps?: number[]; dim?: number }> =
  ({ w, h, row, f, seed, stamps = [], dim = 1 }) => {
  const nStamp = stamps.filter(k => f >= k).length;
  const last = stamps.filter(k => f >= k).slice(-1)[0];
  const pop = last !== undefined ? squash(f - last, 5, 0.10, 3, 9) : 1;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* 1 · the perforation line along the top edge */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 4,
        background: `repeating-linear-gradient(90deg, ${hexa(INK, 0.26 * dim)} 0px, ${hexa(INK, 0.26 * dim)} 13px, transparent 13px, transparent 26px)` }} />
      {/* 2 · the left rule and the item number gutter */}
      <div style={{ position: "absolute", left: w * 0.085, top: 0, bottom: 0, width: 3,
        background: hexa(INK, 0.20 * dim) }} />
      <div style={{ position: "absolute", left: w * 0.024, top: h * 0.30, width: w * 0.042,
        height: h * 0.40, borderRadius: 4, background: hexa(INK, 0.30 * dim) }} />
      {/* 3 · the mark tile — a real paid mark on a white tile, or nothing */}
      {row.mark && (
        <div style={{ position: "absolute", left: w * 0.115, top: h * 0.16, width: h * 0.68,
          height: h * 0.68, borderRadius: h * 0.14, background: "#FFFFFF",
          border: `${Math.max(2, h * 0.035)}px solid ${dkh(PAPER, 0.18)}`,
          display: "flex", alignItems: "center", justifyContent: "center", opacity: dim }}>
          <Img src={staticFile(row.mark)} style={{ width: h * 0.46, height: h * 0.46, objectFit: "contain" }} />
        </div>
      )}
      {row.mark2 && (
        <div style={{ position: "absolute", left: w * 0.115 + h * 0.80, top: h * 0.16, width: h * 0.68,
          height: h * 0.68, borderRadius: h * 0.14, background: "#FFFFFF",
          border: `${Math.max(2, h * 0.035)}px solid ${dkh(PAPER, 0.18)}`,
          display: "flex", alignItems: "center", justifyContent: "center", opacity: dim }}>
          <Img src={staticFile(row.mark2)} style={{ width: h * 0.44, height: h * 0.44, objectFit: "contain" }} />
        </div>
      )}
      {/* 4 · the description block — three ink bars, never words */}
      {[0.26, 0.50, 0.70].map((k, i) => (
        <div key={"db" + i} style={{ position: "absolute",
          left: w * (row.mark ? (row.mark2 ? 0.40 : 0.28) : 0.13), top: h * k,
          width: w * (0.16 + rnd(seed, i) * 0.14), height: Math.max(7, h * 0.10),
          borderRadius: 3, background: hexa(INK, (0.30 - i * 0.06) * dim) }} />
      ))}
      {/* 5 · the ruled right column */}
      <div style={{ position: "absolute", right: w * 0.20, top: 0, bottom: 0, width: 3,
        background: hexa(INK, 0.16 * dim) }} />
      {/* 6 · the figure — ⛔ ONLY R.price is ever passed here */}
      {row.fig && (
        <div style={{ position: "absolute", right: w * 0.028, top: h * 0.20, ...mono(h * 0.42, 800),
          color: hexa(INK, 0.80 * dim), letterSpacing: "-0.02em" }}>{row.fig}</div>
      )}
      {/* 7 · the recurring stamp — the villain's fingerprint, one per month */}
      {nStamp > 0 && (
        <div style={{ position: "absolute", right: w * 0.235, top: h * 0.06,
          width: h * 0.86, height: h * 0.86, transform: `scale(${pop}) rotate(-13deg)`,
          borderRadius: "50%", border: `${Math.max(4, h * 0.075)}px solid ${hexa(RED, 0.52 * dim)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(h * 0.24, 800), color: hexa(RED, 0.62 * dim), letterSpacing: "0.04em" }}>
            {nStamp > 1 ? `x${nStamp}` : "PAID"}
          </span>
        </div>
      )}
      {/* 8 · the stamp's ink bleed into the paper */}
      {nStamp > 0 && (
        <div style={{ position: "absolute", right: w * 0.222, top: h * 0.02, width: h * 1.02,
          height: h * 0.96, borderRadius: "50%", background: hexa(RED, 0.05 * dim) }} />
      )}
    </div>
  );
};

/** ⭐ ONE UPRIGHT CHARGE CELL — the horizontal run's row. Same information as
    `ChargeRow`, laid out to be READ rather than rotated onto its side: the
    perforations run down both sides (the paper travels sideways), the mark
    tile is centred, and the figure sits under it. Nine drawn parts, same as
    the row, because a cell drawn in four divs is the defect
    [[feedback_props_need_real_drawing]] exists for. */
export const ChargeCell: React.FC<{ w: number; h: number; row: BillRow; f: number;
  seed: number; stamps?: number[]; dim?: number }> =
  ({ w, h, row, f, seed, stamps = [], dim = 1 }) => {
  const nStamp = stamps.filter(k => f >= k).length;
  const last = stamps.filter(k => f >= k).slice(-1)[0];
  const pop = last !== undefined ? squash(f - last, 5, 0.10, 3, 9) : 1;
  const tile = Math.min(w * 0.56, h * 0.30);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* 1 · the perforation down the LEADING edge — the paper travels sideways */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: `repeating-linear-gradient(180deg, ${hexa(INK, 0.26 * dim)} 0px, ${hexa(INK, 0.26 * dim)} 13px, transparent 13px, transparent 26px)` }} />
      {/* 2 · the item rule across the top */}
      <div style={{ position: "absolute", left: w * 0.12, right: w * 0.12, top: h * 0.09,
        height: 3, background: hexa(INK, 0.20 * dim) }} />
      {/* 3 · the item number */}
      <div style={{ position: "absolute", left: w * 0.12, top: h * 0.13, width: w * 0.20,
        height: h * 0.035, borderRadius: 3, background: hexa(INK, 0.30 * dim) }} />
      {/* 4 · the mark tile, or an unnamed recurring block if the VO names none */}
      {row.mark ? (
        <div style={{ position: "absolute", left: w * 0.5 - tile / 2, top: h * 0.20, width: tile,
          height: tile, borderRadius: tile * 0.20, background: "#FFFFFF",
          border: `${Math.max(2, tile * 0.05)}px solid ${dkh(PAPER, 0.18)}`,
          display: "flex", alignItems: "center", justifyContent: "center", opacity: dim }}>
          <Img src={staticFile(row.mark)} style={{ width: tile * 0.66, height: tile * 0.66, objectFit: "contain" }} />
        </div>
      ) : (
        <div style={{ position: "absolute", left: w * 0.18, top: h * 0.22, right: w * 0.18,
          height: tile * 0.62, borderRadius: 6, background: hexa(INK, 0.09 * dim),
          border: `3px dashed ${hexa(INK, 0.20 * dim)}` }} />
      )}
      {/* 5 · the second mark, under the first (row 3 carries two) */}
      {row.mark2 && (
        <div style={{ position: "absolute", left: w * 0.5 - tile / 2, top: h * 0.20 + tile + 12,
          width: tile, height: tile, borderRadius: tile * 0.20, background: "#FFFFFF",
          border: `${Math.max(2, tile * 0.05)}px solid ${dkh(PAPER, 0.18)}`,
          display: "flex", alignItems: "center", justifyContent: "center", opacity: dim }}>
          <Img src={staticFile(row.mark2)} style={{ width: tile * 0.62, height: tile * 0.62, objectFit: "contain" }} />
        </div>
      )}
      {/* 6 · the description bars */}
      {[0.62, 0.67].map((k, i) => (
        <div key={"cb" + i} style={{ position: "absolute", left: w * (0.16 + i * 0.06),
          top: h * k, width: w * (0.62 - i * 0.16), height: Math.max(6, h * 0.022),
          borderRadius: 3, background: hexa(INK, (0.28 - i * 0.08) * dim) }} />
      ))}
      {/* 7 · the figure — ⛔ ONLY R.price is ever passed here */}
      {row.fig && (
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.74, textAlign: "center",
          ...mono(Math.min(w * 0.30, 62), 800), color: hexa(INK, 0.82 * dim), letterSpacing: "-0.02em" }}>
          {row.fig}
        </div>
      )}
      {/* 8 · the recurring stamp — the villain's fingerprint, one per month */}
      {nStamp > 0 && (
        <div style={{ position: "absolute", left: w * 0.5 - w * 0.28, top: h * 0.84,
          width: w * 0.56, height: w * 0.56, transform: `scale(${pop}) rotate(-13deg)`,
          borderRadius: "50%", border: `${Math.max(4, w * 0.05)}px solid ${hexa(RED, 0.52 * dim)}`,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ ...mono(w * 0.17, 800), color: hexa(RED, 0.62 * dim), letterSpacing: "0.04em" }}>
            {nStamp > 1 ? `x${nStamp}` : "PAID"}
          </span>
        </div>
      )}
      {/* 9 · the trailing perforation */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 4,
        background: `repeating-linear-gradient(180deg, ${hexa(INK, 0.14 * dim)} 0px, ${hexa(INK, 0.14 * dim)} 13px, transparent 13px, transparent 26px)` }} />
    </div>
  );
};

/** ⭐⭐⭐ THE BILL ROLL. A continuous printed invoice; rows are CUT out of it
    and the paper closes up. `dir` picks the hook's vertical hang or the body's
    horizontal run. The paper always creeps: this is the reel's band. */
export const BillRoll: React.FC<{ x: number; y: number; w: number; f: number; rows: BillRow[];
  rowH?: number; z?: number; dir?: "v" | "h"; creep?: number; jolt?: number; rot?: number;
  /** the frame the whole remaining roll is pulled up and out (S18) */
  pull?: number; head?: boolean; dim?: number; stampsFor?: (i: number) => number[];
  /** ⭐⭐⭐ THE PAPER ADVANCE — frames at which the roll steps down by one WHOLE
      ROW. §11: *an ACTION is a DISTANCE; under about a third of the object's
      own size is a state change.* The first version answered a press strike
      with `jolt` alone — a +-30px damped rock on a 560px roll, which is 5% and
      reads as a wobble, not as a machine advancing paper. One row is 145px, it
      lands in 7 frames, and it is also what a printer actually DOES: it feeds a
      line per strike. The rock stays, on top, as the overshoot. */
  steps?: number[];
  /** ⛔ THE HEAD BLOCK IS THE FRAME-0 CLAIM PLATE, and on a 792px panel whose
      top ~95px is already owned by `HookHeader`, a 250px head leaves room for
      barely one charge row. It is a prop so the hook can run a SHORT head and
      still show three rows. Everything below positions off it, so changing it
      moves nothing else. */
  headH?: number }> =
  ({ x, y, w, f, rows, rowH = 132, z = 40, dir = "v", creep = 0.62, jolt, rot = 0,
     pull, head = true, dim = 1, stampsFor, headH = 250, steps }) => {
  /* the jolt: the whole roll lurches when the head slams, then rocks.
     ⛔⛔⛔ THE SIGNATURE IS `rock(lf, at, amp, k)` AND I HAD amp AND k SWAPPED
     IN ALL FOUR CALL SITES IN THIS REEL. `rock(f - jolt, 0, 26, 3.1) * 30` is
     amplitude **26 x 30 = 780px** with a 3.1-frame decay — a 780px spike on a
     792px panel, which is what threw the whole bill down the frame between f14
     and f20 while every gate stayed green. It decayed in ~3 frames, so it read
     as a glitch rather than as a constant offset, which is exactly why it
     survived four rounds of looking at contact sheets.
     ⭐ READ THE RIG BEFORE TRUSTING THE ALGEBRA — the same lesson as reel 109's
     crown floating 38px above a head, one API down. */
  const j = jolt !== undefined && f >= jolt ? rock(f - jolt, 0, 1, 26) * 30 : 0;
  /* ⭐ the ADVANCE: one full row per strike, 7 frames, hard-landed. This is the
     distance the eye actually reads as "the bill got longer".
     ⛔⛔ AND IT MOVES THE ROWS, NOT THE WHOLE ROLL. Applying it to the outer
     transform fed the entire document out of the bottom of the panel — by the
     second strike the frame was an empty room with a head block sliding off the
     edge. It is also the wrong mechanism: a new charge prints at the TOP of the
     current period, so the header STAYS PUT and everything under it cascades
     down. The claim plate is anchored, which is the other thing that has to be
     true at frame 0 and stay true. */
  const adv = (steps ?? []).reduce((a, k) => a + E(f, k, k + 7, 0, rowH, OUT), 0);
  const pulled = pull !== undefined && f >= pull ? E(f, pull, pull + 22, 0, 1, IN_Q) : 0;
  /* how many rows have been cut BEFORE row i — the paper closes up */
  const gone = (i: number) => rows.slice(0, i).filter(r => r.cut !== undefined && f >= r.cut + 14).length;
  const V = dir === "v";
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translate(${V ? 0 : -f * creep}px, ${V ? f * creep + j - pulled * 1500 : j}px) rotate(${rot}deg)`,
      transformOrigin: "50% 0%" }}>
      {/* the paper ground — a real roll has a curl highlight and torn edges */}
      <div style={{ position: "absolute",
        left: V ? 0 : -(headH + 10), top: V ? -(headH + 30) : 0,
        width: V ? w : rows.length * rowH + headH + 900, height: V ? rows.length * rowH + headH + 1200 : w,
        background: `linear-gradient(${V ? 92 : 178}deg, ${dkh(PAPER, 0.10)} 0%, ${PAPER} 14%, ${PAPER} 82%, ${dkh(PAPER, 0.16)} 100%)`,
        borderLeft: V ? `4px solid ${dkh(PAPER, 0.24)}` : undefined,
        borderRight: V ? `4px solid ${dkh(PAPER, 0.24)}` : undefined,
        borderTop: V ? undefined : `4px solid ${dkh(PAPER, 0.24)}`,
        borderBottom: V ? undefined : `4px solid ${dkh(PAPER, 0.24)}`,
        opacity: dim }} />
      {/* the sprocket holes down both edges — this is a printer's roll */}
      {Array.from({ length: 26 }, (_, i) => (
        <React.Fragment key={"sp" + i}>
          <div style={{ position: "absolute", left: V ? 14 : -headH + 10 + i * 72, top: V ? -headH + 10 + i * 72 : 14,
            width: 15, height: 15, borderRadius: "50%", background: hexa(INK, 0.17 * dim) }} />
          <div style={{ position: "absolute", left: V ? w - 29 : -headH + 10 + i * 72, top: V ? -headH + 10 + i * 72 : w - 29,
            width: 15, height: 15, borderRadius: "50%", background: hexa(INK, 0.17 * dim) }} />
        </React.Fragment>
      ))}
      {/* the head block — the cream claim plate at frame 0 */}
      {head && (
        <div style={{ position: "absolute", left: V ? 0 : -headH, top: V ? -(headH + 22) : 0,
          width: V ? w : headH, height: V ? headH : w,
          background: `linear-gradient(${V ? 176 : 92}deg, #FFFDF7 0%, ${dkh(PAPER, 0.06)} 100%)`,
          borderBottom: V ? `5px solid ${hexa(INK, 0.22)}` : undefined,
          borderRight: V ? undefined : `5px solid ${hexa(INK, 0.22)}`, opacity: dim }}>
          <div style={{ position: "absolute", left: V ? w * 0.07 : 22, top: V ? headH * 0.10 : w * 0.10,
            ...ui(V ? 46 : 34, 900), color: hexa(INK, 0.82), letterSpacing: "0.02em" }}>
            SUBSCRIPTIONS
          </div>
          <div style={{ position: "absolute", left: V ? w * 0.07 : 22, top: V ? headH * 0.47 : w * 0.30,
            ...mono(V ? 26 : 20, 700), color: hexa(INK, 0.42), letterSpacing: "0.10em" }}>
            MONTHLY · RECURRING
          </div>
          {[0, 1, 2].map(i => (
            <div key={"hr" + i} style={{ position: "absolute", left: V ? w * 0.07 : 22,
              top: V ? headH * 0.68 + i * 22 : w * 0.46 + i * 20,
              width: V ? w * (0.56 - i * 0.11) : 150 - i * 30,
              height: 9, borderRadius: 3, background: hexa(INK, 0.16),
              display: V && headH < 200 && i > 1 ? "none" : undefined }} />
          ))}
        </div>
      )}
      {/* the rows — inside their own advanced wrapper, so the head does not move */}
      <div style={{ position: "absolute", left: 0, top: 0,
        transform: `translate(${V ? 0 : -adv}px, ${V ? adv : 0}px)` }}>
      {rows.map((r, i) => {
        const isCut = r.cut !== undefined && f >= r.cut;
        const lf = isCut ? f - (r.cut as number) : 0;
        /* the cut strip falls away and flutters out of frame */
        const fall = isCut ? Math.min(1, lf / 26) : 0;
        const closed = gone(i) * rowH;
        const off = i * rowH - closed;
        if (isCut && fall >= 1) return null;
        return (
          <div key={"br" + i} style={{ position: "absolute",
            left: V ? 0 : off, top: V ? off : 0, width: V ? w : rowH, height: V ? rowH : w,
            opacity: dim * (1 - fall * 0.55),
            transform: isCut
              ? `translate(${fall * 190 * (i % 2 ? 1 : -1)}px, ${fall * fall * 900}px) rotate(${fall * (i % 2 ? 34 : -29)}deg)`
              : undefined }}>
            {V
              ? <ChargeRow w={w} h={rowH} row={r} f={f} seed={i * 13 + 5} dim={dim}
                  stamps={stampsFor ? stampsFor(i) : []} />
              /* ⛔⛔ A HORIZONTAL RUN MAY NOT JUST ROTATE THE ROW. The first pass
                 reused `ChargeRow` at rotate(90deg), which is what a real
                 receipt roll does — and it turned `$20` and every mark on its
                 side, so six scenes carried an unreadable figure. Physically
                 right and illegible is still illegible. `ChargeCell` is the
                 upright form: the same information, drawn to be read. */
              : <ChargeCell w={rowH} h={w} row={r} f={f} seed={i * 13 + 5} dim={dim}
                  stamps={stampsFor ? stampsFor(i) : []} />}
          </div>
        );
      })}
      </div>
    </div>
  );
};

/** ⛔ THE VILLAIN. The stamp head that keeps printing charges. It is fed in S0,
    S1, S4 and S11 and is still going at S18's before-state. */
export const StampHead: React.FC<{ x: number; y: number; w: number; f: number; hits: number[];
  z?: number; c?: string; drop?: number }> =
  /* ⛔ `c` WAS "#3A3038" AND THE HEAD VANISHED. A near-black press in a
     near-black records hall has no silhouette — reel 110's *"light on light"*
     note, one value the other way. Steel at #6E6A66 reads as machined metal
     against the room AND still sits well under the cream bill, so the bill
     keeps the top of the value ladder. */
  ({ x, y, w, f, hits, z = 62, c = "#6E6A66", drop = 96 }) => {
  const last = hits.filter(k => f >= k - 9).slice(-1)[0];
  let dy = 0;
  if (last !== undefined) {
    const lf = f - last;
    /* down fast, back up slow — a press has weight */
    dy = lf < 0 ? E(f, last - 9, last, 0, drop, IN_Q)
       : lf < 4 ? drop
       : E(f, last + 4, last + 22, drop, 0, OUT);
  }
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, zIndex: z }}>
      {/* the ram, running up out of frame */}
      <div style={{ position: "absolute", left: w * 0.36, top: -560 + dy, width: w * 0.28, height: 620,
        background: `linear-gradient(90deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.34)} 100%)` }} />
      {/* the guide rails either side */}
      {[0.08, 0.84].map((k, i) => (
        <div key={"gr" + i} style={{ position: "absolute", left: w * k, top: -600, width: w * 0.08,
          height: 900, background: dkh(c, 0.24) }} />
      ))}
      {/* the head block */}
      <div style={{ position: "absolute", left: 0, top: dy, width: w, height: 128, borderRadius: 8,
        background: `linear-gradient(178deg, ${mxh(c, 0.24)} 0%, ${dkh(c, 0.40)} 100%)`,
        border: `6px solid ${dkh(c, 0.50)}` }}>
        {/* the die face — the thing that prints */}
        <div style={{ position: "absolute", left: w * 0.10, bottom: -18, width: w * 0.80, height: 30,
          borderRadius: 4, background: dkh(RED, 0.16) }} />
        {/* ⛔ THREE BOLTS OVER A RED BAR READ AS A FACE. Two dark discs and a
            mouth is a face at any scale, and the contact sheet showed one
            staring out of the hook. Six bolts in an even run reads as a bolted
            plate; the reservoir moved off-centre so nothing sits under a pair. */}
        {[0.08, 0.24, 0.40, 0.56, 0.72, 0.88].map((k, i) => (
          <div key={"sb" + i} style={{ position: "absolute", left: `${k * 100}%`, top: 18,
            width: 17, height: 17, borderRadius: "50%", background: dkh(c, 0.54) }} />
        ))}
        {/* the ink reservoir, off to one side, with its level window */}
        <div style={{ position: "absolute", left: w * 0.06, top: 52, width: w * 0.34, height: 40,
          borderRadius: 5, background: dkh(RED, 0.30), border: `4px solid ${dkh(c, 0.56)}` }}>
          <div style={{ position: "absolute", left: "12%", top: "26%", width: "34%", height: "48%",
            borderRadius: 3, background: hexa("#F0C4B4", 0.30) }} />
        </div>
        {/* the maker's plate, so the press is a MACHINE and not a slab */}
        <div style={{ position: "absolute", right: w * 0.06, top: 54, width: w * 0.26, height: 36,
          borderRadius: 4, background: dkh(c, 0.16), border: `3px solid ${dkh(c, 0.50)}` }}>
          {[0.24, 0.58].map((k, i) => (
            <div key={"mp" + i} style={{ position: "absolute", left: "14%", top: `${k * 100}%`,
              width: `${60 - i * 22}%`, height: 5, background: hexa(c, 0.5) }} />
          ))}
        </div>
      </div>
    </div>
  );
};

/** ⭐ THE CUTTER. A blade that runs the FULL PANEL WIDTH along one row — the
    highest-value shape in ANIMATION-QUALITY §1's table, used exactly five
    times, once per tool. */
export const Cutter: React.FC<{ y: number; f: number; at: number; z?: number; c?: string;
  h?: number; dur?: number }> =
  ({ y, f, at, z = 74, c = "#C9CCD2", h = 54, dur = 14 }) => {
  const lf = f - at;
  if (lf < -10 || lf > dur + 26) return null;
  const drop = E(f, at - 10, at, -190, 0, IN_Q);
  const t = E(f, at, at + dur, 0, 1, LIN);
  const x = -280 + t * (W + 560);
  return (<>
    {/* the blade carriage on its rail */}
    <div style={{ position: "absolute", left: -300, right: -300, top: y - 34 + drop, height: 16,
      zIndex: z - 1, background: `linear-gradient(180deg, ${dkh(c, 0.30)} 0%, ${dkh(c, 0.52)} 100%)` }} />
    <div style={{ position: "absolute", left: x - 46, top: y - 58 + drop, width: 92, height: h + 40,
      zIndex: z, borderRadius: 6,
      background: `linear-gradient(178deg, ${mxh(c, 0.20)} 0%, ${dkh(c, 0.44)} 100%)`,
      border: `5px solid ${dkh(c, 0.54)}` }}>
      {/* the disc */}
      <div style={{ position: "absolute", left: 16, bottom: -26, width: 60, height: 60,
        borderRadius: "50%", background: mxh(c, 0.36), border: `6px solid ${dkh(c, 0.40)}`,
        transform: `rotate(${f * 34}deg)` }}>
        {[0, 60, 120].map(a => (
          <div key={"ct" + a} style={{ position: "absolute", left: 24, top: 2, width: 4, height: 20,
            background: dkh(c, 0.46), transform: `rotate(${a}deg)`, transformOrigin: "50% 26px" }} />
        ))}
      </div>
    </div>
    {/* the kerf it leaves behind — the cut is visible after the blade passes */}
    <div style={{ position: "absolute", left: -280, top: y - 4 + drop, width: Math.max(0, x + 280),
      height: 9, zIndex: z - 2, background: hexa(INK, 0.42) }} />
  </>);
};

/** ⭐ THE CHARGE COUNTER — the number spine. `feedback_graphical_over_textual`:
    a number MOVES to its value, it is never typeset at it. This is a split-flap
    that FLIPS down to the new value and rocks. */
export const ChargeCounter: React.FC<{ x: number; y: number; f: number;
  steps: Array<[number, number]>; s?: number; z?: number; label?: string }> =
  ({ x, y, f, steps, s = 1, z = 80, label = "CHARGES" }) => {
  const active = steps.filter(([k]) => f >= k);
  const cur = active.length ? active[active.length - 1] : steps[0];
  const at = cur[0], v = cur[1];
  const lf = f - at;
  /* the flap falls, then the whole plate rocks */
  const flip = lf >= 0 && lf < 9 ? 1 - lf / 9 : 0;
  const rk = lf >= 0 ? rock(lf, 0, 1, 22) : 0;   /* ⛔ was rock(lf,0,22,2.4) = 22x1.6 = 35deg */
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${rk * 1.6}deg)`, transformOrigin: "50% 0%" }}>
      {/* the plate it hangs on */}
      <div style={{ position: "absolute", left: -14 * s, top: -12 * s, width: 224 * s, height: 168 * s,
        borderRadius: 12 * s, background: `linear-gradient(176deg, ${mxh("#2A241E", 0.18)} 0%, ${dkh("#2A241E", 0.30)} 100%)`,
        border: `${5 * s}px solid ${dkh("#2A241E", 0.44)}` }} />
      {/* the digit window */}
      <div style={{ position: "absolute", left: 22 * s, top: 12 * s, width: 118 * s, height: 112 * s,
        borderRadius: 8 * s, background: "#14110E", border: `${4 * s}px solid ${dkh("#2A241E", 0.52)}`,
        overflow: "hidden" }}>
        <span style={{ position: "absolute", left: 0, right: 0, top: 4 * s, textAlign: "center",
          ...mono(92 * s, 800), color: v === 0 ? GREEN : GOLD, lineHeight: `${104 * s}px` }}>{v}</span>
        {/* the flap mid-fall */}
        {flip > 0 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 56 * s,
            background: dkh(GOLD, 0.62), opacity: flip,
            transform: `scaleY(${flip})`, transformOrigin: "50% 0%" }} />
        )}
        {/* the split line */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 55 * s, height: 3 * s,
          background: hexa("#000000", 0.5) }} />
      </div>
      <span style={{ position: "absolute", left: 152 * s, top: 34 * s, width: 60 * s,
        ...mono(19 * s, 800), color: hexa(PAPER, 0.68), letterSpacing: "0.06em", lineHeight: 1.18 }}>
        {label}
      </span>
    </div>
  );
};

/* =========================================================================
   THE FIVE PRODUCT CARDS.

   ⛔ Flow, Opal and Antigravity publish NO mark above 48px. A 10x upscale of a
   favicon is a blurry mark, and *a wrong mark is worse than no mark* — so those
   three are the real Google `G` plus the product WORDMARK, which is what a
   Google Labs product's identity actually is. AI Studio and NotebookLM use
   their REAL marks.
   ====================================================================== */
export const ToolCard: React.FC<{ x: number; y: number; s: number; i: number; f: number;
  at?: number; z?: number; lit?: number; rot?: number;
  /** ⭐⭐ THE AURA. Alex: *"after each of the logos come in there should be like
      an aura border around them, like it goes around the whole thing... a
      glowing kind of thing that wraps around, right after it appears, and it
      goes around for each."*

      ⛔ IT STILL CANNOT BE A GLOW — the matte palette bans emissive light and
      the build greps for `boxShadow: 0 0 Npx`, which must stay at 0. But what he
      is describing is not a halo, it is a light TRAVELLING THE PERIMETER, and
      that is a hard-edged shape: a `conic-gradient` with one bright arc,
      rotated. Drawn one layer BEHIND the card and inset by a few px, the card's
      own opaque body masks the middle, so all that shows is a bright segment
      running around the outline. Two laps, then it fades.
      ⭐ Pass the frame the card LANDS on — not the frame it starts moving. */
  auraAt?: number; auraC?: string }> =
  ({ x, y, s, i, f, at = -999, z = 70, lit = 1, rot = 0, auraAt, auraC = GOLD }) => {
  const t = R.tools[i];
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.18, 3, 12);
  const w = 210 * s, h = 262 * s;
  const al = auraAt === undefined ? -1 : f - auraAt;
  return (
    <>
    {al >= 0 && al <= 32 && (() => {
      const P = 26 * s, ang = (al / 32) * 720, fade = al > 24 ? 1 - (al - 24) / 8 : 1;
      return (
        <div style={{ position: "absolute", left: x - w / 2 - P, top: y - h - P,
          width: w + 2 * P, height: h + 2 * P, zIndex: z - 1, borderRadius: 20 * s + P,
          opacity: fade, transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%",
          background: `conic-gradient(from ${ang}deg, ${hexa(auraC, 0)} 0deg, ${hexa(auraC, 0)} 188deg, ${hexa(auraC, 0.42)} 250deg, ${auraC} 312deg, #FFFFFF 344deg, ${auraC} 352deg, ${hexa(auraC, 0)} 360deg)`,
          border: `${3 * s}px solid ${hexa(auraC, 0.30)}` }} />
      );
    })()}
    <div style={{ position: "absolute", left: x - w / 2, top: y - h, width: w, height: h, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg)`, transformOrigin: "50% 100%",
      borderRadius: 20 * s, background: `linear-gradient(172deg, #FFFFFF 0%, ${dkh("#F4F1EA", 0.08)} 100%)`,
      border: `${5 * s}px solid ${dkh("#F4F1EA", 0.22)}`, boxShadow: SH_D, opacity: 0.30 + lit * 0.70 }}>
      {/* the mark, on its own tile. ⛔ Antigravity's real mark ships on a dark
          ground and is a gradient — dropping it on a white tile puts a black
          square inside a cream card. Its tile goes dark instead, which is how
          Google itself presents it. */}
      <div style={{ position: "absolute", left: w * 0.5 - 62 * s, top: 24 * s, width: 124 * s,
        height: 124 * s, borderRadius: 26 * s, background: t.dark ? "#141518" : "#FFFFFF",
        border: `${3 * s}px solid ${t.dark ? "#2A2C32" : "#ECE7DC"}`, display: "flex",
        alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* ⛔ THE FLOW CONE FADES TO TRANSPARENT and has no silhouette unless it
            has air around it — at tile size it read as a black smear. It gets
            0.60 of the tile; Antigravity's mark is a full-bleed dark tile by
            design; the other two are the usual 0.74. */}
        <Img src={staticFile(t.mark)}
          style={{ width: (t.key === "flow" ? 104 : t.dark ? 124 : 92) * s,
                   height: (t.key === "flow" ? 104 : t.dark ? 124 : 92) * s, objectFit: "contain" }} />
      </div>
      {/* the wordmark */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 166 * s, textAlign: "center",
        ...ui(t.name.length > 9 ? 25 * s : 31 * s, 900), color: INK, letterSpacing: "-0.01em" }}>
        {t.name}
      </div>
      {/* the four Google bar — the vendor, said once, graphically */}
      <div style={{ position: "absolute", left: w * 0.22, top: 212 * s, width: w * 0.56, height: 12 * s,
        borderRadius: 6 * s, overflow: "hidden", display: "flex" }}>
        {[G_BLUE, G_RED, G_YEL, G_GRN].map((c, j) => (
          <div key={"gb" + j} style={{ flex: 1, background: c }} />
        ))}
      </div>
      {/* the index number, cast into the card's foot */}
      <div style={{ position: "absolute", left: 14 * s, top: 210 * s, ...mono(20 * s, 800),
        color: hexa(INK, 0.34) }}>{i + 1}</div>
    </div>
    </>
  );
};

/** ⭐⭐ THE TILE WALL, WITH REAL GOOGLE TOOL MARKS.
    Alex: *"the google logos should be the google tools logos at 6 seconds in
    that animation here."* The first version put the plain Google `G` on all 24
    tiles, which says "Google" and does not say "TOOLS" — and the five that
    survive the sift are the five the reel is about, so they have to be
    recognisable here or the payoff in S3 lands on strangers.

    ⛔ AND THE ROSTER IS HONEST. The VO says Google shipped "over 20 of THESE
    tools", meaning AI tools. So the wall carries the real marks this repo has
    for Google AI products — AI Studio, NotebookLM, Flow, Antigravity, Gemini,
    Colab — and everything else stays an UNNAMED Labs tile. Docs, Sheets, Drive
    and Calendar are not "quietly shipped AI tools" and are not on this wall. */
export const LabTile: React.FC<{ x: number; y: number; s: number; f: number; at: number;
  struck?: number; z?: number; seed: number; mark?: string; dark?: boolean }> =
  ({ x, y, s, f, at, struck, z = 40, seed, mark, dark }) => {
  const lf = f - at;
  if (lf < 0) return null;
  const inS = E(lf, 0, 7, 0, 1, BACK);
  const sq = squash(lf, 5, 0.16, 3, 10);
  const w = 112 * s;
  const isX = struck !== undefined && f >= struck;
  const xt = isX ? Math.min(1, (f - (struck as number)) / 6) : 0;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y - w / 2, width: w, height: w, zIndex: z,
      transform: `scale(${inS * sq})`, borderRadius: 16 * s,
      background: isX ? dkh("#8A8578", 0.34) : dark ? "#141518" : "#FFFFFF",
      border: `${4 * s}px solid ${isX ? dkh("#8A8578", 0.46) : dark ? "#2A2C32" : "#E6E1D4"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden" }}>
      <Img src={staticFile(mark ?? "logos/google.svg")}
        style={{ width: w * (dark ? 1 : 0.50), height: w * (dark ? 1 : 0.50),
          objectFit: "contain", opacity: isX ? 0.16 : 0.94 }} />
      {/* two UI bars so an UNNAMED tile still reads as a TOOL and not a blank
          square. A tile carrying a real mark does not need them. */}
      {!mark && [0.70, 0.80].map((k, i) => (
        <div key={"lt" + i} style={{ position: "absolute", left: "18%", top: `${k * 100}%`,
          width: `${(46 + rnd(seed, i) * 26)}%`, height: 6 * s, borderRadius: 3,
          background: hexa(INK, isX ? 0.10 : 0.20) }} />
      ))}
      {/* the X, drawn as two struck bars */}
      {xt > 0 && [-38, 38].map((a, i) => (
        <div key={"xb" + i} style={{ position: "absolute", left: "50%", top: "50%",
          width: w * 0.92 * xt, height: 11 * s, borderRadius: 3, background: hexa(RED, 0.80),
          transform: `translate(-50%,-50%) rotate(${a}deg)` }} />
      ))}
    </div>
  );
};

/** a big lit name board — how a room says what it is, without a sentence */
export const NameBoard: React.FC<{ x: number; y: number; w: number; t: string; f: number;
  at?: number; z?: number; c?: string; fg?: string; sub?: string; s?: number }> =
  ({ x, y, w, t, f, at = -999, z = 66, c = "#F2EDE0", fg = "#241F17", sub, s = 1 }) => {
  const lf = f - at;
  const inS = at > -900 ? E(lf, 0, 8, 0, 1, BACK) : 1;
  if (lf < -2) return null;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, zIndex: z,
      transform: `scale(${inS})`, transformOrigin: "50% 0%",
      padding: `${16 * s}px ${22 * s}px`, borderRadius: 12 * s, background: c,
      border: `${5 * s}px solid ${dkh(c, 0.22)}`, boxShadow: SH }}>
      {/* the bulb run along the top — a name board is LIT */}
      <div style={{ position: "absolute", left: 12 * s, right: 12 * s, top: -9 * s, height: 14 * s,
        display: "flex", justifyContent: "space-between" }}>
        {Array.from({ length: 9 }, (_, i) => (
          <div key={"nb" + i} style={{ width: 12 * s, height: 12 * s, borderRadius: "50%",
            background: (Math.floor(f / 6) + i) % 3 === 0 ? "#FFF0C4" : dkh(c, 0.30) }} />
        ))}
      </div>
      <div style={{ ...ui(34 * s, 900), color: fg, letterSpacing: "0.01em", textAlign: "center" }}>{t}</div>
      {sub && <div style={{ ...mono(19 * s, 700), color: hexa(fg, 0.52), letterSpacing: "0.08em",
        textAlign: "center", marginTop: 5 * s }}>{sub}</div>}
    </div>
  );
};

/* =========================================================================
   THE CAST. ⛔⛔ AN ACTION LOOP IS NOT A SCENE (reel 110). These loops are what
   a sprite does WHILE the scene happens; every scene still has to pass §2's
   four-part event test on its own.
   ⛔ Cycle all TWELVE costume levers deterministically — reel 107 shipped four
   and was told so.
   ====================================================================== */
export const COSTUMES: Array<Record<string, number>> = [
  { constr: 1 }, { prof: 1 }, { glasses: 1 }, { suit: 1 }, { chef: 1 }, { beard: 1 },
  { girl: 1 }, { fro: 1 }, { cop: 1 }, { wizard: 1 }, { samurai: 1 }, { stern: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

export const Crew: React.FC<{ f: number; x: number; y: number; i: number; size: number;
  z?: number; at?: number; loop?: number; tint?: string; flip?: boolean; shock?: number;
  cheer?: number; gazeK?: number }> =
  ({ f, x, y, i, size, z = 48, at = 0, loop, tint, flip = false, shock = 0, cheer: cheerIn, gazeK }) => {
  const lf = f - at;
  if (lf < -2) return null;
  const inS = E(lf, 0, 8, 0, 1, BACK);
  const sq = squash(lf, 6, 0.16, 3, 11);
  const L = loop ?? i % 5;
  const ph = i * 1.7;
  let dx = 0, dy = 0, rot = 0, cheer = 0, gaze = 0, nod = 3.6;
  if (L === 0) {                                  /* PACE — walks with a stride lift */
    dx = Math.sin(f / 17 + ph) * size * 0.30;
    dy = -Math.abs(Math.sin(f / 8.5 + ph)) * size * 0.055;
    rot = Math.cos(f / 17 + ph) * 3.4;
  } else if (L === 1) {                           /* WORK — leans in on a beat */
    rot = 7 + Math.sin(f / 6.2 + ph) * 8.5;
    dy = Math.abs(Math.sin(f / 6.2 + ph)) * size * 0.05;
    dx = Math.sin(f / 6.2 + ph) * size * 0.055;
  } else if (L === 2) {                           /* HOP — jumps and cheers at the apex */
    const t = (f / 26 + ph) % 1;
    const j = Math.max(0, Math.sin(t * Math.PI));
    dy = -j * size * 0.24; cheer = j > 0.55 ? 1 : 0;
    rot = Math.sin(f / 26 + ph) * 2.8;
  } else if (L === 3) {                           /* LOOK — turns its head, double-takes */
    gaze = Math.sin(f / 21 + ph) * 1.0;
    rot = Math.sin(f / 21 + ph) * 4.2;
    nod = 5.2;
  } else {                                        /* HAUL — a two-handed lift and carry */
    const t = (f / 30 + ph) % 1;
    dy = -Math.max(0, Math.sin(t * Math.PI * 2)) * size * 0.10;
    rot = Math.sin(f / 15 + ph) * 6.5;
    dx = Math.sin(f / 30 + ph) * size * 0.18;
  }
  return (
    <div style={{ position: "absolute", left: x - size / 2 + dx, top: y - size + dy, width: size,
      height: size, zIndex: z,
      transform: `scale(${inS * sq}) rotate(${rot}deg) ${flip ? "scaleX(-1)" : ""}`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f + i * 9} size={size} gaze={gazeK ?? gaze} nodAmp={nod} nodSpeed={9 + (i % 3) * 2}
        cheer={cheerIn ?? cheer} shock={shock} tint={tint} {...costumeFor(i)} />
    </div>
  );
};

/** ⛔ EVERY SHOT NEEDS A BACKGROUND PROCESS. One hero doing one gesture is a
    dead shot. Slats are >= 40px so they survive the 1012->240 downsample. */
export const Belt: React.FC<{ x: number; y: number; w: number; h?: number; f: number;
  rate?: number; z?: number; c?: string; carry?: Array<{ o: number; s?: number; c?: string }> }> =
  ({ x, y, w, h = 62, f, rate = 3.6, z = 24, c = "#5A554D", carry = [] }) => {
  const pitch = 96;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      overflow: "hidden", borderRadius: 5,
      background: `linear-gradient(180deg, ${mxh(c, 0.14)} 0%, ${dkh(c, 0.30)} 100%)` }}>
      {Array.from({ length: Math.ceil(w / pitch) + 2 }, (_, i) => (
        <div key={"bs" + i} style={{ position: "absolute", left: ((i * pitch + f * rate) % (w + pitch)) - pitch,
          top: 0, width: 46, height: h, background: dkh(c, 0.20) }} />
      ))}
      {carry.map((k, i) => (
        <div key={"bc" + i} style={{ position: "absolute",
          left: ((k.o * w + f * rate) % (w + 120)) - 60, top: h * 0.10,
          width: 70 * (k.s ?? 1), height: h * 0.80, borderRadius: 6,
          background: k.c ?? mxh(OXIDE, 0.10), border: `3px solid ${dkh(OXIDE, 0.28)}` }} />
      ))}
    </div>
  );
};
