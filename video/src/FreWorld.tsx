import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { dkh, mxh, idle } from "./AppWorld";

/* ===========================================================================
   REEL 105 · "FREE" — THE WORLD KIT.  Board: storyboards/105-free.md.

   THE PLACE: **THE THREE TABS** — one oversized browser on the house Panel.
   Three tabs, three platforms, left to right, and the tab strip advancing IS
   the reel's spine.

   ⭐⭐ WHY THERE IS NO GENRE WORLD HERE, AND WHY THAT IS NOT LAZINESS.
      This premise — paid tools replaced by free ones — has now been built
      twice. Reel 86 CANCEL burned **three hook sets and fifteen scenes** on a
      toll plaza, a supermarket, a subway, a night city and a billing plant
      before the genre worlds were thrown out. Reel 97 FREE inherited that and
      its memory says it in capitals: *"THIS PREMISE GETS NO GENRE WORLD."*
      [[feedback_real_marks_are_the_props]] is the general form, and it has
      rejected four more worlds across reels 99 and 104 whose METAPHORS WERE
      CORRECT — they still died, because a prop the viewer has to translate is
      a dead prop.

      The subject's own objects here are the three websites. So they ARE the
      set, as **real captures pulled live from the three sites this build**
      (`public/shots/`). Alex asked for real screen recordings; the honest
      world and the requested world turned out to be the same world.

   ⛔⛔ THE BAR EVERY PROP IS HELD TO — point at it, say what it IS, with no
      "stands for" anywhere in the answer:

        the browser        -> a browser
        a tab              -> one of the three websites
        the scrolling rows -> arena.ai's real leaderboard, 391 models
        a model tile       -> that model's real mark
        the charge stamp   -> a subscription billing again
        the model band     -> Magnific's own model row, as captured
        the mosaic resolve -> an image generating
        the two bars       -> free output vs paid output, ending LEVEL

   ⛔ MATTE ONLY (REEL-BUILD-LEARNINGS §1). The captures are the only saturated
      things on screen and that is deliberate — it is what makes them read as
      REAL rather than drawn. Nothing here carries a `0 0 Npx` glow.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST
      ([[feedback_nested_colour_helpers_go_black]]). Use dkh/mxh.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B";

/* browser chrome — a warm graphite, never a pure black */
export const CHROME = "#232228", CHROMED = "#17161B", CHROMEL = "#33323A";
export const TABON = "#F4F1EA", TABOFF = "#2E2D35";
export const BARBG = "#1C1B21";
export const PAGE = "#FBFAF7";

/* =========================================================================
   THE STAGE, MEASURED — NOT GUESSED. The Panel is 1012 x 792. The root header
   pill owns y 0..112 and the slug owns y 730..792, so every hero object lives
   inside **y 118..726**. The browser is derived from that band once, here, and
   every scene positions against these constants rather than re-deriving them.
   ====================================================================== */
export const BR = {
  x: 40, y: 128, w: 932, h: 588,
  tabH: 56,                       // y 128..184
  barH: 48,                       // y 184..232
  vpY: 232, vpH: 484,             // the page viewport, y 232..716
} as const;

/* the three tabs, in VO order. `mark` is a REAL wordmark cropped this build
   from that site's own live page — no invented favicons, no stale logos.
   ⛔ TAB 2 IS LABELLED FROM WHAT THE SITE NOW CALLS ITSELF. freepik.com's AI
      product 301s to magnific.com and the site's own banner reads "Freepik is
      now Magnific", so the captured wordmark is Magnific's. The VO never names
      the brand, so nothing in the audio is contradicted. */
/* ⛔ `dark` IS NOT COSMETIC. Each mark is a CROP of that site's own header, so
   it arrives with that header's background baked in: Arena's is ink-on-cream,
   Magnific's and AI Studio's are white-on-near-black. Putting a white-on-black
   crop on a white tile produced an unreadable black slab on the CTA card. The
   tile takes the crop's own value instead of the crop being re-coloured, which
   would falsify the mark. */
/* ⭐ `icon` is the site's OWN app icon, pulled from its live
   apple-touch-icon / product-logo this build — not a wordmark crop and not a
   drawn stand-in. Alex asked for icon-only marks with a blurred placeholder as
   the fallback; no placeholder was needed, all three resolved to real assets:
     arena.ai/apple-touch-icon.png (180px) · magnific.com apple-touch-icon
     (180px) · gstatic ai_studio web-512dp (512px).
   ⛔ Each is SELF-CONTAINED — Arena's carries its own white field, Magnific's
   its own black rounded square, AI Studio's is transparent — so none of them
   needs a tile behind it and none may be re-coloured. */
export type TabDef = { id: string; label: string; mark: string; icon: string; url: string; tint: string; dark: boolean };
export const TABS: TabDef[] = [
  { id: "arena", label: "Arena",            mark: "shots/c_arena.png", icon: "shots/ic_arena.png", url: "arena.ai",            tint: "#E0A62B", dark: false },
  { id: "mag",   label: "Magnific",         mark: "shots/c_mag.png",   icon: "shots/ic_mag.png",   url: "magnific.com",        tint: "#DC4A8E", dark: true  },
  { id: "ais",   label: "Google AI Studio", mark: "shots/c_ais.png",   icon: "shots/ic_ais.png",   url: "aistudio.google.com", tint: "#3E86D6", dark: true  },
];

/* the five models the VO names, with their REAL marks.
   ⛔ Grok has no distributable Grok mark — xAI's is X's, which is what
      public/logos/x.svg is. Same precedent HANDOFF-93 set for Kling and Sora. */
/* ⭐⭐ EACH MODEL CARRIES ITS OWN BRAND COLOUR, and this is the fix for
   *"too shape heavy, too boring, needs to be more visually heavy."* The first
   race drew five IDENTICAL cream rectangles full of grey pills — a UI
   wireframe, not a picture. Nothing in it had colour, texture or scale, so the
   only thing distinguishing the five was a 40px logo and a caption.
   ⭐ Five saturated colour fields differentiate instantly, give the frame real
   density, and are the same lever that fixed the hook (gold / pink / blue).
   ⛔ MATTE PAINTS, NOT NEON (REEL-BUILD-LEARNINGS §1) — solid values, no glow.
   ⛔ Gemini and DeepSeek are both blue in reality, so Gemini takes the purple
      end of its own gradient to keep the five readable apart at thumbnail. */
export const MODELS = [
  { id: "gpt", label: "ChatGPT",  src: "logos/openai.png",       pad: 0.26, c: "#0E8C6E" },
  { id: "cld", label: "Claude",   src: "logos/claude.svg",       pad: 0.20, c: "#C9623F" },
  { id: "gem", label: "Gemini",   src: "logos/googlegemini.svg", pad: 0.22, c: "#6E5BD0" },
  { id: "grk", label: "Grok",     src: "logos/x.svg",            pad: 0.30, c: "#2B2B30" },
  { id: "dsk", label: "DeepSeek", src: "logos/deepseek.svg",     pad: 0.18, c: "#3C63D8" },
] as const;

/* the three video engines the VO names, with their PARENTS' real marks */
export const ENGINES = [
  { id: "kling", label: "Kling",    src: "logos/kuaishou.svg",  pad: 0.22 },
  { id: "sora",  label: "Sora",     src: "logos/openai.png",    pad: 0.26 },
  { id: "seed",  label: "Seedance", src: "logos/bytedance.svg", pad: 0.20 },
] as const;

/* the paid stack S2 sweeps away — real marks, real products, no invented $ */
export const PAID = [
  { id: "p1", src: "logos/openai.png",       pad: 0.26 },
  { id: "p2", src: "logos/claude.svg",       pad: 0.20 },
  { id: "p3", src: "logos/googlegemini.svg", pad: 0.22 },
  { id: "p4", src: "logos/x.svg",            pad: 0.30 },
] as const;

/* ⛔ EVERY NUMBER BELOW WAS READ OFF THE LIVE PAGE THIS BUILD, not recalled.
   arena.ai/leaderboard/text, Aug 12 2026 snapshot. */
export const ARENA = { models: "391", votes: "7,779,985", date: "AUG 12 2026" } as const;

/* =========================================================================
   THE ROOM THE BROWSER SITS IN. `Scene` wants a Place, and this reel only
   needs three: the desk the browser sits on, warmed a different way per beat
   so the three tabs do not all look like the same photograph.
   ⛔ FRAME 0 IS A BRIGHTNESS COMPETITION (docs/THE-OPEN.md law 1) — every
      value below is high-key so the panel clears the ≥140 luma floor with a
      dark browser chrome sitting in the middle of it.
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  desk:  { back: "#D8CDBA", back2: "#F1E9DA", floor: "#E7DECB", floor2: "#CFC4AE",
           lip: "#B8AB92", key: GOLD, horizon: 470, grit: "#B5A88F" },
  studio:{ back: "#C9C6D6", back2: "#EDEAF3", floor: "#DEDAE6", floor2: "#C3BFD1",
           lip: "#ABA6BC", key: SKY,  horizon: 470, grit: "#ADA8BE" },
  bench: { back: "#D5C6BE", back2: "#F2E7DF", floor: "#E8DCD2", floor2: "#CFC0B4",
           lip: "#B7A597", key: CLAY, horizon: 470, grit: "#B4A296" },
};

/* -------------------------------------------------------------------------
   MOTION HELPERS. ⛔ An arrival that just stops reads as a state change, not an
   event (ANIMATION-QUALITY §5), so everything that lands here rocks.
   ---------------------------------------------------------------------- */
/** a damped oscillation that never quite settles */
export const rock = (lf: number, at: number, amp = 5.5, k = 26) =>
  lf < at ? 0 : Math.sin((lf - at) / 3.1) * amp * Math.exp(-(lf - at) / k);

/** a short frame-shake on impact */
export const shake = (lf: number, at: number, amp = 10, n = 10) => {
  if (lf < at || lf > at + n) return { x: 0, y: 0 };
  const d = 1 - (lf - at) / n;
  return { x: Math.sin((lf - at) * 2.7) * amp * d, y: Math.cos((lf - at) * 3.3) * amp * 0.6 * d };
};

/** ⛔ AN IDLE UNDER 2.6° / 4.6px READS AS STATIC TO A HUMAN even though a
    metric calls it moving (measured, reel 102). Amplitudes here clear that. */
export const drift = (f: number, seed: number, amp = 1) => ({
  x: (Math.sin(f / 23 + seed * 2.1) * 3.4 + Math.sin(f / 9.3 + seed) * 1.6) * amp,
  y: (Math.cos(f / 27 + seed * 1.7) * 2.8 + Math.cos(f / 11 + seed) * 1.3) * amp,
  r: (Math.sin(f / 31 + seed * 3.3) * 2.0 + Math.sin(f / 13 + seed) * 0.9) * amp,
});

/* =========================================================================
   ⭐⭐⭐ THE DOWNLOAD BAR — THE SPINE THAT TURNS A LIST INTO A BUILD.

   Reel 105 v1 underperformed, and the diagnosis was NOT the motion: it scored
   a median of 11.35 against 9.82 for the best previously approved reel, and
   [[feedback_frame0_claim_plate]] — the only dataset here with real IG
   performance attached — showed the HIGHEST-motion cut LOSING. Raising motion
   again would have been optimising a variable that stopped binding.

   The real fault was SHAPE. [[feedback_outlier_lift_is_within_creator_only]],
   measured across 25 real outliers: **build-a-system is the only breakout
   family** (7.19x the creator's own baseline), the enemy has to be INTERNAL,
   and **external villains scored rel-median 1.00 and never once exceeded
   1.38x** — "every breakout has NO villain". v1 was a three-item tool listicle
   whose enemy was external (companies charging you). That is precisely the
   family that has never broken out, and it was the third reel on the premise
   after 86 CANCEL and 97 FREE.

   ⛔ THE CONSTRAINT: THE VO IS RECORDED AND IT LITERALLY COUNTS "Number 1 …
      Number 2 … Number 3". The audio cannot be changed. So the list-to-build
      conversion has to happen entirely in the PICTURE, by making those numbers
      read as STAGES OF ONE JOB rather than entries in a list.

   ⭐ THIS IS THAT DEVICE, and it is the browser's own object, not a metaphor:
   a download bar with three empty slots, present from the first body frame, one
   filling at each site. It gives the reel the three things a list cannot have —
   a visible GOAL, ACCUMULATION, and a PAYOFF when the last slot fills — and it
   makes the enemy internal, because what the viewer sees is their own tray
   sitting two-thirds empty.
   ====================================================================== */
export type Slot = { icon: string; kind: string; tint: string };
export const SLOTS: Slot[] = [
  { icon: TABS[0].icon, kind: "SCRIPT", tint: TABS[0].tint },
  { icon: TABS[1].icon, kind: "CLIP",   tint: TABS[1].tint },
  { icon: TABS[2].icon, kind: "IMAGE",  tint: TABS[2].tint },
];

/* ⛔⛔ THE FILL TIMES ARE ROOT FRAMES, AND THEY ARE DERIVED, NOT TYPED PER
   SCENE. Round 6 of this reel found the SAME bug in four scenes at once: a
   retime moved the picture and the hand-written cue/state numbers stayed put,
   silently. Anything that has to agree with a scene's timing now computes from
   the scene's own `at`, so it cannot drift.
     slot 1 SCRIPT — Arena's receipt landing,  scene 55 + local 106 = f161
     slot 2 CLIP   — the generated clip lands, scene 412 + local 40 = f452
     slot 3 IMAGE  — the image goes sharp,     scene 470 + local 58 = f528 */
export const FILL_AT = [161, 434, 528] as const;   /* slot 2 moved with the compressed S5 */
export const fillsAt = (rootFrame: number): number[] =>
  FILL_AT.map((a) => E(rootFrame, a, a + 14, 0, 1, OUT));

/** `fill[i]` is 0..1 per slot. ⛔ The bar is ALWAYS rendered in the body so the
    empty slots are a standing question; a tray that only appears once it has
    something in it cannot create the gap that makes the build read. */
export const DownloadBar: React.FC<{ f: number; fill: number[]; z?: number;
  /** ⛔ COORDINATE SPACE. Default is the browser VIEWPORT (932x484). Inside
      `FullBleed` the layer is the whole PANEL (1012x792), so the bar must be
      told where the bottom is or it floats in the middle of the shot — which
      is exactly what it did on the first full-bleed render. */
  top?: number; w?: number }> =
  ({ f, fill, z = 90, top = BR.vpH - 62, w = BR.w }) => (
  <div style={{ position: "absolute", left: 0, top, width: w, height: 62,
    zIndex: z, background: "#EFEAE0", borderTop: "3px solid #D9CFB8",
    /* ⛔ CENTRED, NOT LEFT-ALIGNED. On the full-frame payoffs the bar is scaled
       1.46x from its centre, and left-aligned chips pushed the first one clean
       off the screen edge. Centred content scales symmetrically. */
    display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
    {SLOTS.map((s, i) => {
      const k = fill[i] ?? 0;
      const landed = k > 0.02;
      return (
        <div key={s.kind} style={{ position: "relative", width: 188, height: 42,
          borderRadius: 12,
          background: landed ? "#FFFFFF" : "transparent",
          /* ⛔ THE EMPTY SLOT HAS TO BE LEGIBLE OR THERE IS NO GAP, AND WITHOUT
              THE GAP THIS IS A LIST AGAIN. v1 drew them at 0.55 opacity with a
              #C6BCA6 dash on a #EFEAE0 bar and they simply were not visible in
              the render — the tray read as "one item" instead of "one of
              three". */
          border: `3px ${landed ? "solid" : "dashed"} ${landed ? dkh(s.tint, 0.1) : "#A89C82"}`,
          transform: `translateY(${(1 - k) * 26}px) scale(${0.94 + k * 0.06})`,
          opacity: 1,
          display: "flex", alignItems: "center", gap: 10, paddingLeft: 9, overflow: "hidden" }}>
          {/* a real progress fill sweeping the chip as the file lands */}
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%",
            width: `${Math.min(1, k * 1.25) * 100}%`, background: hexa(s.tint, 0.30) }} />
          <span style={{ position: "relative", width: 28, height: 28, borderRadius: 7,
            overflow: "hidden", flex: "0 0 auto", opacity: landed ? 1 : 0.45,
            filter: landed ? undefined : "grayscale(1)" }}>
            <Img src={staticFile(s.icon)}
              style={{ width: 28, height: 28, objectFit: "contain" }} />
          </span>
          <span style={{ position: "relative", fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 17, letterSpacing: "0.08em",
            color: landed ? "#2A2620" : "#8A7F6B" }}>{s.kind}</span>
          {landed && (
            <span style={{ position: "relative", marginLeft: "auto", marginRight: 10,
              width: 22, height: 22, borderRadius: "50%", background: GREEN,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 14, color: "#FFF",
              transform: `scale(${E(k, 0.55, 1, 0, 1, BACK)})` }}>✓</span>
          )}
        </div>
      );
    })}
  </div>
);

/* =========================================================================
   ⭐⭐⭐ FULL BLEED — THE REAL OUTPUT, EDGE TO EDGE, NO BROWSER.

   Measured on the delivered v2: **8 of the 9 scenes rendered the same browser
   window at the identical constant** (x40 y128 w932 h588), and the only
   variation in the whole reel was a per-scene push of 1.056-1.102 — a 5-10%
   zoom that is imperceptible frame to frame. So for 20 of 22 seconds the
   viewer looked at ONE rectangle, in one place, from one distance, and every
   "animation" happened inside a 932x484 window that never moved. That is a
   hard ceiling on how interesting the contents can feel, and it is why adding
   motion inside the frame kept failing to move the needle.

   ⭐⭐ AND THE FIX IS NOT A NEW EFFECT, IT IS A CHANGE OF SUBJECT. This reel is
   about what three tools MAKE, and the best assets in the whole build — a real
   photoreal Nano Banana output and real generated video frames — were being
   shown as THUMBNAILS INSIDE A BROWSER. The output is the interesting thing;
   the UI is the packaging. So at each beat's payoff the output bursts out of
   the window and fills the panel edge to edge, at ~4x the area it had before.

   ⛔ IT IS A PAYOFF, NOT A WALLPAPER. Full bleed is spent only where a beat
      RESOLVES; if every scene were full bleed it would be one flat framing
      again, which is the exact fault it exists to fix.
   ====================================================================== */
export const FullBleed: React.FC<{
  src: string; k: number; z?: number; scale?: number; y?: number;
  children?: React.ReactNode;
}> = ({ src, k, z = 70, scale = 1, y = 0, children }) => {
  if (k <= 0.001) return null;
  /* it BURSTS: overshoots past full size, then settles back into the frame */
  const s = (0.72 + E(k, 0, 0.62, 0, 1, BACK) * 0.28) * scale;
  return (
    /* ⛔ SOLID BACKDROP. The inner image is scaled and translated, so it can
       slide off its own frame — S1's board scrolled up 936px and the browser
       underneath showed through the gap. A full-bleed layer must be opaque in
       its own right, never reliant on its child covering the frame. */
    <div style={{ position: "absolute", inset: 0, zIndex: z, overflow: "hidden",
      background: "#14120F", opacity: Math.min(1, k * 2.6) }}>
      <div style={{ position: "absolute", inset: 0,
        transform: `scale(${s}) translateY(${y}px)`, transformOrigin: "50% 48%" }}>
        <Img src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {children}
    </div>
  );
};

/* =========================================================================
   THE BROWSER. One window, three tabs, an address bar and a clipped viewport.
   ⛔ THE VIEWPORT CLIPS. Every capture inside it is positioned in PAGE
      coordinates and the window shows a moving slice — which is what makes a
      still PNG read as a scrolling screen recording.
   ====================================================================== */
export const Browser: React.FC<{
  f: number; active: number; children?: React.ReactNode;
  /** 0..1 per tab, how far it has slid in */
  tabIn?: number[]; url?: string; z?: number;
}> = ({ f, active, children, tabIn, url, z = 20 }) => {
  const d = drift(f, 3, 0.55);
  return (
    <div style={{ position: "absolute", left: BR.x, top: BR.y, width: BR.w, height: BR.h,
      zIndex: z, borderRadius: 22, background: CHROME, boxShadow: SH_D,
      border: `3px solid ${CHROMEL}`, overflow: "hidden",
      transform: `translate(${d.x}px, ${d.y}px)` }}>

      {/* ---- the tab strip ------------------------------------------------ */}
      <div style={{ position: "absolute", left: 0, top: 0, width: BR.w, height: BR.tabH,
        background: CHROMED, borderBottom: `2px solid ${dkh(CHROMEL, 0.2)}` }}>
        {/* traffic lights */}
        {["#E0655B", "#E3B341", "#5BB98C"].map((c, i) => (
          <span key={c} style={{ position: "absolute", left: 18 + i * 22, top: BR.tabH / 2 - 7,
            width: 14, height: 14, borderRadius: "50%", background: c }} />
        ))}
        {TABS.map((t, i) => {
          const on = i === active;
          const k = tabIn ? tabIn[i] : 1;
          if (k <= 0.001) return null;
          return (
            <div key={t.id} style={{ position: "absolute", left: 96 + i * 268,
              top: 8 + (1 - k) * 8, width: 254, height: BR.tabH - 8,
              transform: `translateX(${(1 - k) * 430}px)`, opacity: k,
              borderRadius: "12px 12px 0 0", background: on ? TABON : TABOFF,
              border: `2px solid ${on ? dkh(TABON, 0.14) : CHROMEL}`, borderBottom: "none",
              display: "flex", alignItems: "center", gap: 10, paddingLeft: 12 }}>
              <span style={{ width: 24, height: 24, borderRadius: 6,
                background: t.dark ? "#17161B" : "#FFF",
                border: `2px solid ${t.dark ? "#3A3843" : dkh(TABON, 0.2)}`, display: "flex",
                alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <Img src={staticFile(t.mark)} style={{ width: 34, height: 18, objectFit: "cover",
                  objectPosition: "left center" }} />
              </span>
              <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
                color: on ? "#2A2620" : "#9C99A4", letterSpacing: "0.01em",
                whiteSpace: "nowrap", overflow: "hidden" }}>{t.label}</span>
            </div>
          );
        })}
      </div>

      {/* ---- the address bar ---------------------------------------------- */}
      <div style={{ position: "absolute", left: 0, top: BR.tabH, width: BR.w, height: BR.barH,
        background: BARBG, display: "flex", alignItems: "center", paddingLeft: 18, gap: 12 }}>
        <span style={{ width: 26, height: 26, borderRadius: "50%", border: `3px solid ${MUTE}`,
          opacity: 0.5 }} />
        <div style={{ flex: 1, marginRight: 18, height: 30, borderRadius: 15,
          background: "#100F14", border: `2px solid ${CHROMEL}`, display: "flex",
          alignItems: "center", paddingLeft: 14 }}>
          <span style={{ fontFamily: MONO, fontSize: 17, color: "#C9C5D2", letterSpacing: "0.02em" }}>
            {url ?? TABS[active].url}
          </span>
        </div>
      </div>

      {/* ---- the page viewport, clipping ---------------------------------- */}
      <div style={{ position: "absolute", left: 0, top: BR.vpY - BR.y, width: BR.w,
        height: BR.vpH, background: PAGE, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
};

/* =========================================================================
   A REAL CAPTURE, SCROLLING. `src` is a PNG pulled live from the site this
   build; `scroll` is the page offset in viewport pixels. Rendering a tall
   still through a clipping window is what gives a genuine scroll rather than
   a crossfade between two frames.
   ====================================================================== */
export const Shot: React.FC<{ src: string; scroll?: number; w?: number; x?: number;
  o?: number; z?: number; scale?: number }> =
  ({ src, scroll = 0, w = BR.w, x = 0, o = 1, z = 5, scale = 1 }) => (
  <div style={{ position: "absolute", left: x, top: -scroll, width: w, zIndex: z, opacity: o,
    transform: scale !== 1 ? `scale(${scale})` : undefined, transformOrigin: "50% 0%" }}>
    <Img src={staticFile(src)} style={{ width: w, display: "block" }} />
  </div>
);

/* =========================================================================
   A MODEL TILE — a real mark on a white tile, the house form for a brand.
   ⛔ A WRONG MARK IS WORSE THAN NO MARK, so every `src` here resolves to a file
      that exists in public/logos and was checked against the model's parent.
   ====================================================================== */
export const ModelTile: React.FC<{ x: number; y: number; src: string; s?: number; z?: number;
  label?: string; pad?: number; rot?: number; o?: number; lift?: number }> =
  ({ x, y, src, s = 104, z = 60, label, pad = 0.22, rot = 0, o = 1, lift = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `translateY(${-lift}px) rotate(${rot}deg)`, transformOrigin: "50% 60%" }}>
    <div style={{ width: s, height: s, borderRadius: s * 0.26, background: "#FFFFFF",
      border: `${Math.max(2, s * 0.032)}px solid #E4DCC8`, boxShadow: SH,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile(src)}
        style={{ width: s * (1 - pad), height: s * (1 - pad), objectFit: "contain" }} />
    </div>
    {label && (
      <div style={{ marginTop: 8, textAlign: "center", fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: s * 0.17, letterSpacing: "0.05em", color: "#2A2620" }}>
        {label}
      </div>
    )}
  </div>
);

/* =========================================================================
   THE RECEIPT PLATE — where a freeze-frame has to hold up. Values come from
   ARENA, which came off the live page.
   ====================================================================== */
export const Receipt: React.FC<{ x: number; y: number; k: number; z?: number;
  rel?: boolean }> = ({ x, y, k, z = 92, rel = false }) => (
  <div style={{ position: rel ? "relative" : "absolute", left: rel ? undefined : x,
    top: rel ? undefined : y, zIndex: z,
    transform: `translateY(${(1 - k) * 22}px) scale(${0.94 + k * 0.06})`, opacity: k,
    padding: "12px 22px", borderRadius: 16, background: "#F4EFE2",
    border: "3px solid #DCCFAE", boxShadow: SH, whiteSpace: "nowrap",
    display: "flex", alignItems: "center", gap: 18 }}>
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 40, color: INK }}>
      {ARENA.models}
    </span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#6A6459",
      letterSpacing: "0.06em" }}>MODELS</span>
    <span style={{ width: 3, height: 34, background: "#DCCFAE" }} />
    <span style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34, color: INK }}>
      {ARENA.votes}
    </span>
    <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 20, color: "#6A6459",
      letterSpacing: "0.06em" }}>VOTES</span>
  </div>
);

/* =========================================================================
   THE RECURRING CHARGE. ⛔⛔ NO INVENTED TOTAL ANYWHERE — the VO's "hundreds"
   is not sourceable per-month, so the picture carries RECURRENCE instead of
   arithmetic ([[feedback_graphical_over_textual]]: the information here is
   *"it keeps charging"*, and the depiction of that is a stamp that will not
   stop). There is no `$89/mo`, no `$521`, no running total in this reel.
   ====================================================================== */
export const ChargeStamp: React.FC<{ x: number; y: number; k: number; z?: number; s?: number }> =
  ({ x, y, k, z = 88, s = 1 }) => {
  if (k <= 0.001) return null;
  const drop = E(k, 0, 0.42, 1, 0, OUT);          // slams down
  const sq = 1 + E(k, 0.36, 0.52, 0, 1, OUT) * 0.16 - E(k, 0.52, 0.78, 0, 1, IO) * 0.16;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `translateY(${-drop * 64}px) scale(${(0.8 + k * 0.2) * s}) scaleY(${sq})`,
      opacity: Math.min(1, k * 3), transformOrigin: "50% 50%",
      padding: "7px 16px", borderRadius: 11, background: RED,
      border: `3px solid ${dkh(RED, 0.24)}`, boxShadow: SH }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22,
        letterSpacing: "0.10em", color: "#FFF3EC" }}>BILLED</span>
    </div>
  );
};

/* =========================================================================
   THE ENGINE BOX — the one generator every model is seated INTO. The verb the
   VO uses is "built IN", so this is a container things go inside, and the
   seating is the event.
   ====================================================================== */
export const EngineBox: React.FC<{ x: number; y: number; w: number; h: number; open: number;
  z?: number; children?: React.ReactNode }> =
  ({ x, y, w, h, open, z = 40, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 20, background: "#F1ECE0", border: `4px solid #D6C9AC`, boxShadow: SH,
    overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: w, height: 44,
      background: "#E2D8BF", borderBottom: "3px solid #CDBE9C", display: "flex",
      alignItems: "center", paddingLeft: 16 }}>
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 19,
        letterSpacing: "0.10em", color: "#5C5344" }}>ONE GENERATOR</span>
    </div>
    {/* the three seats */}
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: 26 + i * (w - 52) / 3,
        top: 66, width: (w - 52) / 3 - 16, height: h - 92, borderRadius: 14,
        background: "#E6DFCD", border: `3px dashed ${hexa("#B8A882", 0.55 + open * 0.3)}` }} />
    ))}
    {children}
  </div>
);

/* =========================================================================
   THE MOSAIC RESOLVE — an image generating. Coarse tiles sharpen to the real
   photoreal capture underneath, sweeping across. ⭐ This is how "insane
   quality and realism" is DEPICTED rather than typeset: the viewer watches it
   become sharp, and no plate anywhere says the word "quality".
   ====================================================================== */
export const Mosaic: React.FC<{ x: number; y: number; w: number; h: number; k: number;
  src: string; z?: number; cols?: number; rows?: number }> =
  ({ x, y, w, h, k, src, z = 50, cols = 14, rows = 10 }) => {
  const cw = w / cols, ch = h / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 16, overflow: "hidden", border: "4px solid #E4DCC8", boxShadow: SH }}>
      <Img src={staticFile(src)} style={{ position: "absolute", left: 0, top: 0,
        width: w, height: h, objectFit: "cover" }} />
      {/* the coarse tiles clearing left-to-right on a diagonal front */}
      {Array.from({ length: cols * rows }, (_, i) => {
        const cx = i % cols, cy = Math.floor(i / cols);
        const front = (cx / cols) * 0.72 + (cy / rows) * 0.2;
        const a = 1 - E(k, front, front + 0.30, 0, 1, IO);
        if (a <= 0.01) return null;
        const v = 176 + Math.floor(rnd(cx * 7 + 1, cy * 3 + 2) * 62);
        return <div key={i} style={{ position: "absolute", left: cx * cw, top: cy * ch,
          width: cw + 1, height: ch + 1, background: `rgb(${v},${v - 6},${v - 18})`, opacity: a }} />;
      })}
    </div>
  );
};

/* =========================================================================
   TOE TO TOE. ⛔⛔ THE HONESTY BEAT OF THE REEL. The VO says the free output
   *"goes toe to toe with"* paid tools — that is LEVEL, not better. Both bars
   rise together and stop at the SAME height, and a tie bar locks across them.
   The free bar never passes the paid one, in any frame, at any k.
   ====================================================================== */
export const LevelBars: React.FC<{ x: number; y: number; w: number; h: number; k: number;
  z?: number }> = ({ x, y, w, h, k, z = 60 }) => {
  const bw = w * 0.36;
  const grow = E(k, 0, 0.72, 0, 1, OUT);
  const settle = rock(k * 100, 72, 0.030, 30);
  const hh = h * (0.86 * grow + settle);
  const tie = E(k, 0.72, 0.94, 0, 1, OUT);
  const cols: [string, string, string][] = [
    [GREEN, "FREE", "#EAF5EF"],
    ["#7C8794", "PAID", "#EEF1F4"],
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z }}>
      {cols.map(([c, lab, fg], i) => (
        <div key={lab}>
          <div style={{ position: "absolute", left: i * (w - bw), top: h - hh, width: bw,
            height: hh, borderRadius: "14px 14px 0 0", background: c,
            border: `3px solid ${dkh(c, 0.2)}`, borderBottom: "none", boxShadow: SH }} />
          <div style={{ position: "absolute", left: i * (w - bw), top: h + 10, width: bw,
            textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26,
            letterSpacing: "0.10em", color: c }}>{lab}</div>
        </div>
      ))}
      {/* the tie bar — it locks them EQUAL, it does not crown one */}
      {tie > 0.01 && (
        <div style={{ position: "absolute", left: 0, top: h - hh - 8, width: w * tie, height: 8,
          borderRadius: 4, background: GOLD, boxShadow: SH }} />
      )}
    </div>
  );
};

/* =========================================================================
   THE PROMPT BAR + RENDER SWEEP — "just drop in a prompt and get a video".
   ⛔ ONE TEXT CHIP PER SHOT: the prompt line is S5's one piece of type and
      nothing else in that scene is typeset.
   ====================================================================== */
export const PromptBar: React.FC<{ x: number; y: number; w: number; text: string; k: number;
  z?: number }> = ({ x, y, w, text, k, z = 70 }) => {
  const n = Math.floor(E(k, 0, 0.62, 0, text.length, LIN));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 58, zIndex: z,
      borderRadius: 16, background: "#FFFFFF", border: "3px solid #DCD3BE", boxShadow: SH,
      display: "flex", alignItems: "center", paddingLeft: 18, overflow: "hidden" }}>
      <span style={{ fontFamily: MONO, fontSize: 25, color: "#2A2620", whiteSpace: "nowrap" }}>
        {text.slice(0, n)}
      </span>
      {k < 0.66 && (
        <span style={{ width: 3, height: 30, marginLeft: 3, background: CLAY,
          opacity: Math.round(k * 100) % 12 < 6 ? 1 : 0.15 }} />
      )}
    </div>
  );
};

export const RenderSweep: React.FC<{ x: number; y: number; w: number; k: number; z?: number }> =
  ({ x, y, w, k, z = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: 16, zIndex: z,
    borderRadius: 8, background: "#E4DCC8", overflow: "hidden", boxShadow: SH }}>
    <div style={{ position: "absolute", left: 0, top: 0, height: 16, width: `${Math.min(1, k) * 100}%`,
      borderRadius: 8, background: CLAY }} />
  </div>
);

/* =========================================================================
   THE LINK CARD — the CTA payoff, one per tab, each carrying that site's REAL
   captured wordmark.
   ====================================================================== */
/* ⛔⛔ ROUND 2: *"the final part it's too much text, needs to be more logo and
   graphic heavy."* v1's card was a plate wrapping a mark PLUS a mono url line,
   so the CTA carried the FREE stamp plus three more strings of type. The url
   is gone — a viewer cannot type it off a reel anyway, which is the entire
   reason the keyword CTA exists. The card is now just the REAL wordmark, on
   its own value, big. */
export const LinkCard: React.FC<{ x: number; y: number; t: TabDef; k: number; z?: number;
  rot?: number }> = ({ x, y, t, k, z = 80, rot = 0 }) => (
  /* ⛔⛔ THE CTA LOGOS WERE BLACK AND WHITE. Alex: *"the final logos need to be a
     lot more colourful, it's just black and white, boring."* They were using
     the WORDMARK crops, and two of the three (Magnific, AI Studio) are
     white-on-near-black by origin — so the payoff frame of the whole reel was
     a cream card, a black card and another black card.
     ⭐ The hook had already solved this in round 4: a card in the site's own
     brand colour carrying its real APP ICON. The CTA now matches it exactly,
     which fixes the colour AND bookends the reel — the three cards you meet in
     the first two seconds are the three you leave with. */
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: Math.min(1, k * 2),
    transform: `translateY(${(1 - k) * 70}px) rotate(${rot * k}deg) scale(${0.86 + k * 0.14})`,
    transformOrigin: "50% 100%", width: 264, height: 146, borderRadius: 22,
    background: t.tint, border: `6px solid ${dkh(t.tint, 0.24)}`, boxShadow: SH,
    display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 106, height: 106, borderRadius: 26, background: "#FFFFFF",
      display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <Img src={staticFile(t.icon)}
        style={{ width: 92, height: 92, objectFit: "contain", borderRadius: 20 }} />
    </div>
  </div>
);
