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
   REEL 124 · "WEB" — THE WORLD KIT.  Board: storyboards/124-web.md.

   Subject: an AI site builder that returns a 3D, scroll-animated, interactive
   site from one prompt, against the flat page every other builder returns.

   ⛔⛔ THE VO NEVER NAMES THE TOOL, SO NEITHER DOES THE REEL. Listen to the
      cut: "someone just built a tool that…", "this one built something…",
      "Comment WEB for the free link." The name is the payload of the CTA, not
      of the picture — which is `gate-the-how` exactly as written. Everything on
      screen is therefore either (a) OUR drawing of the mechanism or (b) a real
      captured page used under a claim that is true of it.

   ⛔⛔ THE WORLD IS MADE OF THE SUBJECT'S OWN OBJECTS
      ([[feedback_real_marks_are_the_props]], burned three reels). The free,
      literal object here is that **a website is a place you move through**:
      a flat page is a poster nailed in a frame, a 3D scroll site is a lit
      DIORAMA with separated planes you can see into. So the world is an
      ARCADE of bay frontages, and depth is not atmosphere — depth IS the
      product. Every prop is a page, a frame, a plane or a light.

   ⛔⛔ THE HONESTY LEDGER IS `R`, BELOW, AND NOWHERE ELSE.
      · The tool is unnamed on screen (above).
      · **Lovable and Replit appear only in the two lines that name them**, as
        marks beside OUR drawn flat page — never their real homepage under a
        pejorative claim. `PEJORATIVE_CAPTURE_BANNED` is the greppable guard.
      · Reference captures (awwwards' 3D and WebGL walls, codrops, lenis, gsap,
        spline, haoqi) are the ASPIRATION layer. They may open the reel and they
        may fill the payoff street **only as a wall of many**, so no single
        studio is implicated. ⛔ Never one named studio's page under "you built
        this" (docs/capture_sites.mjs, reel 111's ruling).
      · "in seconds" is the VO's word and is spoken, never STAMPED as a numeral:
        no build-time figure appears on screen. `TIME_BANNED`.

   ⛔ MATTE ONLY. Nothing here carries a `boxShadow: 0 0 Npx` glow.
   ⛔ `dark()`/`mix()` are hex-in/rgb-out and DO NOT NEST — use dkh/mxh.
   ⛔ `Mascot`'s drawn body is ~100% of `size`. Pitch >= 0.85 * size.
   ⛔ `Scene`'s push crops: keep `left >= 506 - 486/push`.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, SH, SH_D, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, dkh, mxh, idle, rock, shake, drift, squash };
export type { Place };

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", PAPER = "#F7F5F0";
export const INK = "#1A1813", MUTE = "#9A968B", TEAL = "#7FC0C9";
export const VIOLET = "#8E7BB5", CONCRETE = "#8E9299";

/* ---------------------------------------------------------------------------
   THE HONESTY LEDGER. Every string the picture is allowed to state.
   Checked 2026-08-31. `dora.run` was investigated as the subject and is
   NXDOMAIN from here, so it appears nowhere — a URL that does not resolve is
   not a receipt.
   ------------------------------------------------------------------------ */
export const R = {
  /** the two builders the VO names, and nothing else about them */
  flat: [
    { id: "lovable", name: "LOVABLE", c: "#E8654F" },
    { id: "replit",  name: "REPLIT",  c: "#F26207" },
  ],
  /** REFERENCE captures — real pages, used as the aspiration layer only */
  ref: [
    { id: "aw3d",    label: "3D",           url: "awwwards.com/websites/3d" },
    { id: "awwebgl", label: "WEBGL",        url: "awwwards.com/websites/webgl" },
    { id: "codrops", label: "SCROLL",       url: "tympanus.net/codrops" },
    { id: "lenis",   label: "SMOOTH SCROLL", url: "lenis.darkroom.engineering" },
    { id: "gsap",    label: "ANIMATION",    url: "gsap.com" },
    { id: "spline",  label: "3D",           url: "spline.design" },
    { id: "haoqi",   label: "3D",           url: "haoqi.design" },
  ],
  /** the words the VO actually says, which is the only claim budget there is */
  says: {
    layers: "DEPTH LAYERS",
    motion: "SMOOTH SCROLL",
    react:  "ELEMENTS REACT",
    one:    "ONE PROMPT",
    zero:   "ZERO CODING",
  },
} as const;

/** ⛔ greppable guards. Each must return zero hits across src/Web*.tsx. */
export const TIME_BANNED = ["IN SECONDS", "60 SECONDS", "90 SECONDS", "10 MINUTES", "2 MIN"] as const;
export const PEJORATIVE_CAPTURE_BANNED = ["lovable_strip", "lovable_top", "replit_strip", "replit_top"] as const;
export const NAME_BANNED = ["DORA", "DRAFTLY", "VULK", "dora.run", "draftly.space", "vulk.dev"] as const;

export const paper2 = () => "#EDE7DA";
export const vivid = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const l = (r + g + b) / 3;
  r = Math.max(0, Math.min(255, l + (r - l) * k));
  g = Math.max(0, Math.min(255, l + (g - l) * k));
  b = Math.max(0, Math.min(255, l + (b - l) * k));
  return `rgb(${r | 0},${g | 0},${b | 0})`;
};
export const mono = (px: number, w = 700) => ({ fontFamily: MONO, fontSize: px, fontWeight: w as 700 });
export const ui = (px: number, w = 800) => ({ fontFamily: inter.fontFamily, fontSize: px, fontWeight: w });

/* ---------------------------------------------------------------------------
   THE PLACES. One arcade, eleven lights. Neighbours differ in BOTH hue and
   lightness (ANIMATION-QUALITY §9). ⛔ Every `back2`/`floor2` is the darkest
   value in its row on purpose — that is what BODY_BLACK measures, and it is
   what lets one lit bay out-rank the frame. Do not lift them.
   ------------------------------------------------------------------------ */
/* ---------------------------------------------------------------------------
   THE PLACES — ⛔⛔⛔ REPAINTED. v1 built a NIGHT ARCADE: dark navy grounds with
   electric teal, violet, plum, mint and lime accents. That is neon-on-black,
   which `feedback_reel_matte_palette` calls the #1 "looks coded" tell — and
   that memory names this exact trap by name: *"building a 'screen'/'tech'/
   'arcade' world pulls me toward neon-on-black by default. Treat that instinct
   as the bug."* I built an arcade and walked straight into it.

   The register is now a WARM PAINTED INTERIOR, animation-film not vibecoded UI:
   plaster and wood and carpet and brass, lit warm, with MUTED accents from the
   house list only — CLAY #D2724E · GOLD #E7B24C · GREEN #3F9E74 · RED #C44A3A ·
   SKY #5AA0DE · slate #3A5C84, and pink/purple desaturated to #C4708E / #6B5A8E.
   ⛔ No teal, no violet, no lime, no mint, no magenta anywhere.

   ⛔ The dark stops stay dark — BODY_BLACK is measured on them — but they are
   WARM darks (browns, deep slates) rather than near-black navy.
   ------------------------------------------------------------------------ */
export const PLACES: Record<string, Place> = {
  /* S0 — the press hall. Plaster and iron under a warm work-lamp. */
  press:  { back: "#4A4436", back2: "#241F18", floor: "#4A4034", floor2: "#241D16",
            lip: "#7A6A4E", key: "#E7B24C", horizon: 508, grit: "#A8977A" },
  /* S1 — the brass slot pier. Wood and warm plaster. */
  slot:   { back: "#4B3A2C", back2: "#241A13", floor: "#3F2F23", floor2: "#1F1710",
            lip: "#8A6242", key: "#E7B24C", horizon: 520, grit: "#C4A176" },
  /* S2 — the fitting bay. Slate wall, wood floor: the house WALL colour. */
  bay:    { back: "#3E4E5C", back2: "#1E262E", floor: "#4A3B2C", floor2: "#241C15",
            lip: "#6E7F8E", key: "#5AA0DE", horizon: 512, grit: "#93A3B2" },
  /* S4 — the dead row. Drab painted board, deliberately joyless. */
  flatrow:{ back: "#4A4A40", back2: "#232320", floor: "#443F36", floor2: "#201E1A",
            lip: "#6E6D5E", key: "#B2AE95", horizon: 504, grit: "#8E8B78" },
  /* S5 — the cross hall. Slate on the work side, warm through the arch. */
  hall:   { back: "#3A5C84", back2: "#1B2836", floor: "#42382C", floor2: "#201B14",
            lip: "#5D7EA6", key: "#5AA0DE", horizon: 516, grit: "#8FA6C0" },
  /* S6 — the kiosk. Carpet and wood, the warmest room in the reel. */
  kiosk:  { back: "#5A3B33", back2: "#2A1B17", floor: "#7A4A3E", floor2: "#301C17",
            lip: "#96604E", key: "#D2724E", horizon: 520, grit: "#C08A70" },
  /* S3, S7 — three proof bays, three painted moods, none of them electric. */
  pf1:    { back: "#3E4E5C", back2: "#1E262E", floor: "#453A2E", floor2: "#221C16",
            lip: "#6E7F8E", key: "#5AA0DE", horizon: 516, grit: "#93A3B2" },
  pf2:    { back: "#4E3C48", back2: "#251C22", floor: "#463424", floor2: "#221912",
            lip: "#7E6070", key: "#C4708E", horizon: 516, grit: "#A98494" },
  pf3:    { back: "#3F4A38", back2: "#1E241A", floor: "#443A28", floor2: "#211C13",
            lip: "#697B5C", key: "#3F9E74", horizon: 516, grit: "#8B9A78" },
  /* S8 — the measuring bay. Slate and iron, one green instrument. */
  gauge:  { back: "#3A4640", back2: "#1B211E", floor: "#42382C", floor2: "#201B14",
            lip: "#63756B", key: "#3F9E74", horizon: 508, grit: "#8A9A90" },
  /* S9 — the service side. Wood, brass, hot lamps. */
  service:{ back: "#4E3A22", back2: "#251B10", floor: "#4A3620", floor2: "#231A0F",
            lip: "#8A6242", key: "#E7B24C", horizon: 512, grit: "#C39A55" },
  /* S10 — the whole hall lit. The brightest and warmest frame in the reel. */
  street: { back: "#4A5570", back2: "#232838", floor: "#5A4530", floor2: "#2A2018",
            lip: "#7E8AA8", key: "#E7B24C", horizon: 540, grit: "#A6B0CC" },
  /* S11 — the entrance board. */
  board:  { back: "#4A3E4A", back2: "#231D24", floor: "#463828", floor2: "#221B14",
            lip: "#75627A", key: "#E7B24C", horizon: 528, grit: "#A08CA4" },
};

export type SetKey = keyof typeof PLACES;
export const placeFor = (k: SetKey): Place => PLACES[k];

/* =========================================================================
   LIGHT AND TEXTURE
   ====================================================================== */

/** ⭐ A FEATHERED raking band. What makes a band look like wallpaper is the HARD
    EDGE; what makes it MEASURE is swept area x speed. Keep the feathering and
    buy the motion back through SPEED (reel 109: 9.18 -> 11.30, better looking
    AND higher). ⛔ The shadow half is weighted 1.35x the light half so the band
    cannot lift the black point. */
export const Rake: React.FC<{ f: number; y: number; h: number; x0?: number; span?: number;
  n?: number; c?: string; dc?: string; speed?: number; z?: number; o?: number; skew?: number;
  phase?: number }> =
  ({ f, y, h, x0 = -260, span = 1560, n = 5, c = "#FFF3D8", dc = "#0A0C12",
     speed = 4.2, z = 26, o = 0.5, skew = -14, phase = 0 }) => {
  const pitch = span / n;
  return (<>
    {Array.from({ length: n * 2 }, (_, i) => {
      const dk = i % 2 === 1;
      const x = x0 + ((i * pitch * 0.5 + f * speed + phase) % span);
      return (
        <div key={"rk" + i} style={{
          position: "absolute", left: x, top: y, width: pitch * 0.46, height: h, zIndex: z,
          transform: `skewX(${skew}deg)`, pointerEvents: "none",
          background: `linear-gradient(90deg, ${hexa(dk ? dc : c, 0)} 0%, ${hexa(dk ? dc : c, dk ? o * 1.35 : o)} 50%, ${hexa(dk ? dc : c, 0)} 100%)`,
        }} />
      );
    })}
  </>);
};

/** an expanding ring. ⛔ Nothing in this reel lands and simply stops. */
export const Ring: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  r0?: number; r1?: number; dur?: number; z?: number; w?: number }> =
  ({ x, y, f, at, c = "#FFE7BC", r0 = 12, r1 = 150, dur = 16, z = 60, w = 5 }) => {
  const k = (f - at) / dur;
  if (k < 0 || k > 1) return null;
  const r = r0 + (r1 - r0) * (1 - Math.pow(1 - k, 2.4));
  return <div style={{ position: "absolute", left: x - r, top: y - r * 0.42, width: r * 2,
    height: r * 0.84, borderRadius: "50%", border: `${w}px solid ${hexa(c, 0.62 * (1 - k))}`,
    zIndex: z, pointerEvents: "none" }} />;
};

/** a dust puff on an arrival — the cost of landing */
export const Puff: React.FC<{ x: number; y: number; f: number; at: number; c?: string;
  n?: number; z?: number; s?: number; dur?: number }> =
  ({ x, y, f, at, c = "#B9B2A4", n = 9, z = 58, s = 1, dur = 20 }) => {
  const k = (f - at) / dur;
  if (k < 0 || k > 1) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI - Math.PI * 0.04;
      const d = (30 + rnd(7, i) * 62) * k * s;
      const rr = (9 + rnd(11, i) * 15) * s * (0.6 + k * 0.9);
      return <div key={"pf" + i} style={{ position: "absolute",
        left: x + Math.cos(a) * d * 1.5 - rr, top: y - Math.sin(a) * d * 0.5 - rr,
        width: rr * 2, height: rr * 2, borderRadius: "50%", zIndex: z,
        background: hexa(c, 0.34 * (1 - k)) }} />;
    })}
  </>);
};

/** a reflection pool under a lit thing — a wet arcade floor is free depth */
export const Pool: React.FC<{ x: number; y: number; w: number; c?: string; o?: number;
  z?: number; h?: number }> = ({ x, y, w: ww, c = "#E7B24C", o = 0.20, z = 18, h = 118 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: h, zIndex: z,
    background: `linear-gradient(180deg, ${hexa(c, o)} 0%, ${hexa(c, 0)} 100%)`,
    filter: "blur(1px)" }} />
);

/* =========================================================================
   THE SUBJECT'S OWN OBJECTS
   ====================================================================== */

/** ⭐⭐⭐ THE PAGE SLAB — the flat page, drawn as a rigid object.
    A viewer recognises a web page by ONE silhouette: a browser chrome bar with
    three dots, a nav strip, a hero block, a row of cards. Those four features
    are what make it read as a PAGE rather than a rectangle
    (ANIMATION-QUALITY §11: category is STRUCTURE, not hue).
    ⛔ It is deliberately IDENTICAL every time it is drawn — the sameness is the
    hook's whole claim, so it takes no seed and no variation. */
export const PageSlab: React.FC<{ x: number; y: number; w: number; z?: number;
  rot?: number; o?: number; s?: number; dim?: number; thick?: number }> =
  ({ x, y, w: ww, z = 40, rot = 0, o = 1, s = 1, dim = 0, thick = 13 }) => {
  const hh = ww * 0.70;
  /* ⛔⛔⛔ REDRAWN. Alex: *"i dont get why you keep having the boring gray thing…
     the website on the stamper is not interesting its just gray stuff."* He is
     right and the house rule names it exactly: **GREY + RECTANGULAR is the
     combination that reads as boring — either one alone survives**
     (`feedback_dressing_the_words_is_not_redoing_it`).

     I had been drawing "generic template" as grey wireframe blocks because the
     word is generic. That is a boring thing drawn boringly, and it is also NOT
     TRUE: what those builders actually hand you is a perfectly colourful page —
     an indigo gradient hero, a bright CTA, three cards with coloured icons. The
     joke is that it is the SAME one every time, not that it is grey. Drawn
     properly it is more interesting to look at AND more honest.
     ⭐ `dim` no longer means "grey", it means the slightly duller PRINT of a
     stamped copy — the colour stays. */
  const ink = "#1E2130", body = "#6E7385";
  const brand = dim ? "#6C63C4" : "#7B71E0";
  const hero1 = dim ? "#5A52A8" : "#6C63C4", hero2 = dim ? "#8E5FA8" : "#A46FC4";
  const cta = dim ? "#E0894A" : "#F09A52";
  const icons = dim ? ["#3F9E9E", "#D9A44C", "#C4708E"] : ["#4BB3B3", "#E7B24C", "#DA7F9E"];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      opacity: o, transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 100%" }}>
      {thick > 0 && (
        <div style={{ position: "absolute", left: -thick * 0.5, top: thick * 0.62,
          width: ww + thick, height: hh, background: "#4A4F58", borderRadius: 3 }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF", borderRadius: 3,
        boxShadow: thick > 0 ? SH_D : undefined, overflow: "hidden" }}>
        {/* 1 · the browser chrome — the single most recognisable band */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * 0.085,
          background: "#E9EAEE", display: "flex", alignItems: "center", gap: ww * 0.014,
          paddingLeft: ww * 0.024 }}>
          {["#E06C60", "#E5B84A", "#5FB37D"].map(c => (
            <span key={c} style={{ width: ww * 0.017, height: ww * 0.017, borderRadius: "50%",
              background: c }} />
          ))}
          <div style={{ marginLeft: ww * 0.018, width: ww * 0.42, height: hh * 0.042,
            borderRadius: hh * 0.024, background: "#FFFFFF" }} />
        </div>
        {/* 2 · the nav: a brand square, four links, a filled pill */}
        <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.085, height: hh * 0.085,
          background: "#FFFFFF", borderBottom: `1px solid #E4E5EA` }}>
          <div style={{ position: "absolute", left: ww * 0.045, top: hh * 0.022, width: ww * 0.05,
            height: ww * 0.05, background: brand, borderRadius: ww * 0.012 }} />
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ position: "absolute", left: ww * (0.44 + i * 0.085),
              top: hh * 0.034, width: ww * 0.05, height: hh * 0.018, background: "#B9BCC6",
              borderRadius: 2 }} />
          ))}
          <div style={{ position: "absolute", right: ww * 0.045, top: hh * 0.024, width: ww * 0.13,
            height: hh * 0.042, background: brand, borderRadius: hh * 0.022 }} />
        </div>
        {/* 3 · THE GRADIENT HERO — the thing every one of these pages has */}
        <div style={{ position: "absolute", left: 0, right: 0, top: hh * 0.17, height: hh * 0.44,
          background: `linear-gradient(134deg, ${hero1} 0%, ${hero2} 100%)` }}>
          <div style={{ position: "absolute", left: ww * 0.08, top: hh * 0.07, width: ww * 0.52,
            height: hh * 0.075, background: "#FFFFFF", borderRadius: 3 }} />
          <div style={{ position: "absolute", left: ww * 0.08, top: hh * 0.165, width: ww * 0.34,
            height: hh * 0.075, background: "#FFFFFF", borderRadius: 3, opacity: 0.92 }} />
          <div style={{ position: "absolute", left: ww * 0.08, top: hh * 0.27, width: ww * 0.40,
            height: hh * 0.035, background: "#FFFFFF", opacity: 0.55, borderRadius: 2 }} />
          <div style={{ position: "absolute", left: ww * 0.08, top: hh * 0.33, width: ww * 0.17,
            height: hh * 0.062, background: cta, borderRadius: hh * 0.031 }} />
          {/* the obligatory abstract blob illustration on the right */}
          <div style={{ position: "absolute", right: ww * 0.07, top: hh * 0.06, width: ww * 0.22,
            height: ww * 0.22, borderRadius: "50%", background: "#FFFFFF", opacity: 0.20 }} />
          <div style={{ position: "absolute", right: ww * 0.11, top: hh * 0.12, width: ww * 0.13,
            height: ww * 0.13, borderRadius: ww * 0.03, background: cta, opacity: 0.85,
            transform: "rotate(18deg)" }} />
        </div>
        {/* 4 · the three feature cards, each with its coloured icon */}
        {[0, 1, 2].map(i => (
          <div key={"c" + i} style={{ position: "absolute", left: ww * (0.07 + i * 0.30),
            top: hh * 0.66, width: ww * 0.26, height: hh * 0.28, background: "#FFFFFF",
            border: "1px solid #E4E5EA", borderRadius: ww * 0.012 }}>
            <div style={{ position: "absolute", left: "10%", top: "10%", width: "30%",
              paddingBottom: "30%", borderRadius: "50%", background: icons[i] }} />
            <div style={{ position: "absolute", left: "10%", top: "56%", width: "72%",
              height: "13%", background: ink, borderRadius: 2 }} />
            <div style={{ position: "absolute", left: "10%", top: "76%", width: "50%",
              height: "11%", background: body, opacity: 0.45, borderRadius: 2 }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: hh * 0.04,
          background: "#F1F2F5" }} />
      </div>
    </div>
  );
};

/** ⭐ A REAL PAGE, LIVE — a captured strip scrolling behind a browser bezel.
    Real content changing every frame is the biggest single motion lever in this
    repo (median 6.36 -> 8.00 on reel 107, 10.90 -> 12.51 on reel 111) and it is
    simultaneously the receipt that the page exists. */
export const SiteScreen: React.FC<{ x: number; y: number; w: number; h: number;
  src: string; scroll?: number; z?: number; grey?: number; on?: number; url?: string;
  bezel?: number; capW?: number; rot?: number }> =
  ({ x, y, w: ww, h: hh, src, scroll = 0, z = 40, grey = 0, on = 1, url, bezel = 12,
     capW = 900, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
    background: paper2(), boxShadow: SH_D, border: `${bezel}px solid #6B5A48`,
    transform: rot ? `rotate(${rot}deg)` : undefined }}>
    {url && (
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36,
        background: "#161821", display: "flex", alignItems: "center", paddingLeft: 12, gap: 8,
        borderBottom: "2px solid #2A2D36", zIndex: 4 }}>
        {["#E0655B", "#E3B341", "#5BB98C"].map(c => (
          <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ marginLeft: 8, height: 22, flex: 1, marginRight: 12, borderRadius: 11,
          background: "#FAF8F2", display: "flex", alignItems: "center", paddingLeft: 11,
          ...mono(14, 700), color: "#6B5A48" }}>{url}</div>
      </div>
    )}
    <div style={{ position: "absolute", left: 0, right: 0, top: url ? 36 : 0, bottom: 0,
      overflow: "hidden", opacity: on,
      filter: grey > 0 ? `grayscale(${grey}) brightness(${1 - grey * 0.32})` : undefined }}>
      <Img src={staticFile("web124/" + src)}
        style={{ position: "absolute", left: 0, top: -scroll, width: ww - bezel * 2,
          display: "block" }} />
    </div>
  </div>
);

/** ⭐⭐ A REAL SCROLL RECORDING. 64 captured frames of the page being scrolled,
    played back on the reel's own clock. A strip shows LAYOUT; only this shows
    the site's own scroll-driven MOTION, which is the thing the VO is about. */
export const SiteReel: React.FC<{ x: number; y: number; w: number; h: number; id: string;
  f: number; at?: number; rate?: number; z?: number; url?: string; bezel?: number;
  n?: number; hold?: boolean; on?: number }> =
  ({ x, y, w: ww, h: hh, id, f, at = 0, rate = 1, z = 40, url, bezel = 12, n = 64,
     hold = false, on = 1 }) => {
  const raw = Math.round((f - at) * rate);
  const i = hold ? Math.max(0, Math.min(n - 1, raw)) : ((raw % n) + n) % n;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: paper2(), boxShadow: SH_D, border: `${bezel}px solid #6B5A48`, opacity: on }}>
      {url && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 36,
          background: "#EDE7DA", display: "flex", alignItems: "center", paddingLeft: 12, gap: 8,
          borderBottom: "2px solid #C9C0AE", zIndex: 4 }}>
          {["#E0655B", "#E3B341", "#5BB98C"].map(c => (
            <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ marginLeft: 8, height: 22, flex: 1, marginRight: 12, borderRadius: 11,
            background: "#0C0E13", display: "flex", alignItems: "center", paddingLeft: 11,
            ...mono(14, 700), color: "#B9BCC6" }}>{url}</div>
        </div>
      )}
      <div style={{ position: "absolute", left: 0, right: 0, top: url ? 36 : 0, bottom: 0,
        overflow: "hidden" }}>
        <Img src={staticFile(`web124/frames/${id}/f${String(i).padStart(3, "0")}.jpg`)}
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "50% 0%", display: "block" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE VILLAIN — THE TEMPLATE PRESS.
   ⛔ ITS RULE: it never breaks and it is never smashed. At S10 it is still
   stamping, in a dark side bay, ignored. Out-built is the only way it loses.
   ====================================================================== */
export const TemplatePress: React.FC<{ x: number; y: number; w: number; f: number;
  drop: number; z?: number; lamp?: number }> =
  ({ x, y, w: ww, f, drop, z = 40, lamp = 1 }) => {
  const hh = ww * 1.30;
  const ramH = ww * 0.30;
  const throwY = hh * 0.40;
  const D = "#191E29", D2 = "#232936", D3 = "#111520";   /* it is a SILHOUETTE */
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the crown beam — the mass that says this thing is heavy */}
      <div style={{ position: "absolute", left: -34, top: 0, width: ww + 68, height: 76,
        background: D, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: -34, top: 64, width: ww + 68, height: 12,
        background: D3 }} />
      {[0, 1, 2, 3].map(i => (
        <div key={"cb" + i} style={{ position: "absolute", left: -14 + i * ((ww + 28) / 3.4),
          top: 16, width: 44, height: 44, borderRadius: "50%", background: D3,
          border: `5px solid ${D2}` }} />
      ))}
      {/* the two uprights, with real tie-bolts down them */}
      {[0, 1].map(i => (
        <div key={"up" + i} style={{ position: "absolute", left: i ? ww - 62 : 0, top: 60,
          width: 62, height: hh - 60, background: D, boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: i ? 0 : 52, top: 0, bottom: 0, width: 10,
            background: D2 }} />
          {Array.from({ length: 8 }, (_, k) => (
            <div key={k} style={{ position: "absolute", left: 15, top: 42 + k * 70, width: 32,
              height: 32, borderRadius: "50%", background: D3, border: `4px solid ${D2}` }} />
          ))}
        </div>
      ))}
      {/* THE RAM — a heavy dark block travelling a real distance, with the DIE
          on its underside. The die face is the template, in relief, and it is
          lit along its bottom edge so you can read it against the lit wall. */}
      <div style={{ position: "absolute", left: 44, top: 96 + drop * throwY, width: ww - 88,
        height: ramH, background: `linear-gradient(180deg, ${D2} 0%, ${D3} 100%)`,
        boxShadow: SH_D, zIndex: 6 }}>
        <div style={{ position: "absolute", left: -18, top: -14, width: ww - 52, height: 22,
          background: D }} />
        {/* the die: nav bar / hero rule / three cards, in relief, every time */}
        {/* ⛔ NAME WHICH SIDE OF THE CONTRAST THE SUBJECT IS ON. A dark die on a
            dark ram has no silhouette at all, which is the note that cost reel
            110 two rounds. The die is a CREAM plate with the template cut into
            it, so it reads instantly and pays luma at the same time. */}
        <div style={{ position: "absolute", left: 26, right: 26, bottom: 8, height: ramH * 0.62,
          background: "linear-gradient(180deg,#F2EEE0 0%,#CFC9B7 100%)", borderRadius: 2,
          boxShadow: SH }}>
          <div style={{ position: "absolute", left: 10, right: 10, top: 8, height: 13,
            background: "#2B3140" }} />
          <div style={{ position: "absolute", left: 10, top: 30, width: "42%", height: 15,
            background: "#3A4152" }} />
          {[0, 1, 2].map(i => (
            <div key={i} style={{ position: "absolute", left: `${9 + i * 29}%`, bottom: 9,
              width: "24%", height: 22, background: "#4A5164" }} />
          ))}
        </div>
      </div>
      {/* the bed and platen — where the page is made */}
      <div style={{ position: "absolute", left: -30, top: hh - 84, width: ww + 60, height: 52,
        background: D, boxShadow: SH_D }} />
      <div style={{ position: "absolute", left: 34, top: hh - 96, width: ww - 68, height: 16,
        background: hexa("#F2EEE2", 0.86) }} />
      {/* the caged work-lamp on a bracket — a practical, not lifted shading */}
      <div style={{ position: "absolute", left: ww - 20, top: 128, width: 128, height: 12,
        background: D2, transform: "rotate(-9deg)", transformOrigin: "0 50%" }} />
      <div style={{ position: "absolute", left: ww + 82, top: 108, width: 72, height: 42,
        borderRadius: "0 0 34px 34px", background: D }} />
      <div style={{ position: "absolute", left: ww + 92, top: 142, width: 52, height: 14,
        borderRadius: 7, background: "#FFF0C4", opacity: lamp }} />
      {/* the chute the sheet leaves by — two rails, so it reads as a ramp */}
      {[0, 1].map(i => (
        <div key={"ch" + i} style={{ position: "absolute", left: ww - 26, top: hh * 0.70 + i * 26,
          width: 150, height: 11, background: i ? D3 : D2,
          transform: "rotate(17deg)", transformOrigin: "0 50%" }} />
      ))}
    </div>
  );
};

/** ⭐ THE PROOF WALL — the hook's bright field and its claim in one object.
    A backlit hoarding of the SAME page, fifteen times. It carries HOOK_LUMA and
    HOOK_PLATE so the press and the hero are free to be near-black silhouettes
    in front of it (reel 110: a gate carried by the wrong object DEFORMS that
    object). It is also the literal claim — every builder, the same template. */
export const ProofWall: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  z?: number; cols?: number; rows?: number; on?: number }> =
  ({ x, y, w: ww, h: hh, f, z = 22, cols = 6, rows = 3, on = 1 }) => {
  const cw = ww / cols, ch = hh / rows;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      background: "linear-gradient(178deg,#FDFCF7 0%,#EAE5D8 100%)", boxShadow: SH_D,
      opacity: on, overflow: "hidden" }}>
      {/* the lightbox's own tubes, so it reads as BACKLIT and not as paper */}
      {Array.from({ length: rows + 1 }, (_, r) => (
        <div key={"tb" + r} style={{ position: "absolute", left: 0, right: 0, top: r * ch - 4,
          height: 8, background: hexa("#FFFDF4", 0.9) }} />
      ))}
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        return (
          <div key={"pw" + i} style={{ position: "absolute", left: c * cw + cw * 0.11,
            top: r * ch + ch * 0.13, width: cw * 0.78, height: ch * 0.74,
            background: "#FFFFFF", border: "3px solid #DDD8C9" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "14%",
              background: "#9F9A8D" }} />
            <div style={{ position: "absolute", left: "8%", top: "24%", width: "56%",
              height: "11%", background: "#807C72" }} />
            <div style={{ position: "absolute", left: "8%", top: "41%", width: "34%",
              height: "7%", background: "#B7B3A8" }} />
            {[0, 1, 2].map(j => (
              <div key={j} style={{ position: "absolute", left: `${8 + j * 29}%`, top: "60%",
                width: "25%", height: "30%", background: "#C4BFB2", border: "1px solid #A29D91" }} />
            ))}
          </div>
        );
      })}
      {/* the frame of the hoarding, so it is an OBJECT in the arcade */}
      <div style={{ position: "absolute", inset: 0, border: "7px solid #D7D1C2" }} />
    </div>
  );
};

/* =========================================================================
   THE HERO ARTIFACT — THE BAY.  Flat, then deep.
   ====================================================================== */

/** a painted-shut frontage: ONE plane, no interior. The point is that it has
    no behind, so it is drawn with a visible BACK BOARD when seen at an angle. */
export const FlatBay: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  c?: string; mark?: string; markC?: string; dim?: number; knock?: number }> =
  ({ x, y, w: ww, h: hh, z = 40, c = "#4B5750", mark, markC = "#E8654F", dim = 0, knock = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y + knock * 1.5, width: ww, height: hh,
    zIndex: z }}>
    {/* the frame */}
    <div style={{ position: "absolute", inset: -14, background: c, borderRadius: 4,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", inset: -14, border: `6px solid ${mxh(c, 0.16)}`,
      borderRadius: 4 }} />
    {/* the single flat plane, nailed in */}
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#DCDEE2" }}>
      <PageSlab x={0} y={0} w={ww} z={2} dim={dim ? 1 : 0} thick={0} />
    </div>
    {[[10, 10], [ww - 22, 10], [10, hh - 22], [ww - 22, hh - 22]].map(([bx, by], i) => (
      <div key={i} style={{ position: "absolute", left: bx, top: by, width: 12, height: 12,
        borderRadius: "50%", background: "#8D9490", zIndex: 5 }} />
    ))}
    {mark && (
      <div style={{ position: "absolute", left: ww * 0.5 - 84, top: -74, width: 168, height: 46,
        background: "#F4F2ED", borderRadius: 4, display: "flex", alignItems: "center",
        justifyContent: "center", gap: 9, zIndex: 8, boxShadow: SH }}>
        <span style={{ width: 18, height: 18, borderRadius: 4, background: markC }} />
        <span style={{ ...ui(21, 900), color: "#1A1813", letterSpacing: 1.4 }}>{mark}</span>
      </div>
    )}
  </div>
);

/** ⭐⭐⭐ THE DEEP BAY — the reel's hero artifact.

    ⛔⛔⛔ REBUILT AGAIN, ON ALEX'S NOTE: *"the animations are covering the screen
    recording."* v2 stacked five drawn planes with the real capture as plane 0 —
    at the BACK — so every drawn element sat on top of the footage the whole
    scene. The one genuinely valuable asset in the frame was the one thing you
    could not see.

    ⭐ THE CAPTURE IS NOW THE FOREGROUND AND IS NEVER COVERED. It holds the
    centre, full size, unobstructed, for the whole scene. The page's own parts —
    nav, headline, card row, chrome — start FLUSH against its edges (so at
    `sep = 0` the whole thing reads as one ordinary page) and then fan OUTWARD
    and toward the viewer as `sep` rises, opening real gaps around a site you can
    still read every frame of. That is a better picture of "depth layers" than
    stacking was, because you watch the page come apart instead of watching
    rectangles slide over each other.

    ⛔ SOLID PAINTS ONLY (`feedback_reel_matte_palette` rule 1). Every fill here
    is `mxh`/`dkh` against the house palette — no `hexa(colour, 0.1-0.6)` washes,
    which is what made v2 read as vibecoded UI rather than as animation. */
export const DeepBay: React.FC<{ x: number; y: number; w: number; h: number; f: number;
  sep: number; look?: number; react?: number; z?: number; c?: string; lit?: number;
  strain?: number; shot?: string; scroll?: number; frame?: boolean; reel?: string;
  rate?: number }> =
  ({ x, y, w: ww, h: hh, f, sep, look = 0, react = 0, z = 40, c = CLAY, lit = 1,
     strain = 0, shot, scroll = 0, frame = true, reel, rate = 1 }) => {
  const wob = strain * Math.sin(f / 2.6) * 4;
  const E2 = (k: number, a: number, b2: number) => E(k, a, b2, 0, 1, OUT);
  /* how far each part has travelled off the page, and how much nearer it is */
  const k1 = E2(sep, 0.05, 0.55), k2 = E2(sep, 0.16, 0.70);
  const k3 = E2(sep, 0.28, 0.84), k4 = E2(sep, 0.40, 0.96);
  const PAD = Math.round(hh * 0.13);
  const paper = "#F7F5F0", paper2 = "#EDE7DA", paper3 = "#DED5C4";
  const ink = "#2E2A24";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z }}>
      {/* the room the page hangs in — solid painted wall, never a wash */}
      {frame && (
        <div style={{ position: "absolute", left: -18, top: -18, right: -18, bottom: -18,
          background: dkh(c, 0.70), borderRadius: 4, boxShadow: SH_D }} />
      )}

      {/* ⭐ THE REAL PAGE, HELD CLEAR. Nothing below is allowed to cross it. */}
      <div style={{ position: "absolute", left: PAD, top: PAD, right: PAD, bottom: PAD,
        overflow: "hidden", background: paper, zIndex: 40,
        boxShadow: "0 14px 30px rgba(26,24,19,0.40)",
        transform: `translate(${look * 8 + wob}px, 0) scale(${1 + sep * 0.03})` }}>
        {reel ? (
          <Img src={staticFile(`web124/frames/${reel}/f${String(((Math.round(f * rate) % 64) + 64) % 64).padStart(3, "0")}.jpg`)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "50% 0%", display: "block" }} />
        ) : shot ? (
          <Img src={staticFile("web124/" + shot)}
            style={{ position: "absolute", left: 0, top: -scroll, width: "100%", display: "block" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: mxh(c, 0.24) }} />
        )}
      </div>

      {/* ---- the page's own parts, fanning OUT from the capture's edges ----
           Each starts overlapping its edge (one page) and clears it (five). */}
      {/* 1 · the nav strip, off the TOP */}
      <div style={{ position: "absolute", left: PAD + 10, right: PAD + 10,
        top: PAD + 16 - k1 * (PAD + 96), height: Math.round(hh * 0.11), zIndex: 22,
        background: paper2, borderRadius: 4, boxShadow: SH,
        transform: `scale(${1 + k1 * 0.06})` }}>
        <div style={{ position: "absolute", left: "3%", top: "24%", width: "12%", height: "52%",
          background: c, borderRadius: 3 }} />
        {[0, 1, 2].map(i => (
          <div key={i} style={{ position: "absolute", left: `${52 + i * 13}%`, top: "34%",
            width: "9%", height: "30%", background: paper3, borderRadius: 2 }} />
        ))}
      </div>
      {/* 2 · the headline block, off the LEFT */}
      <div style={{ position: "absolute", left: PAD + 14 - k2 * (PAD + 128),
        top: PAD + Math.round(hh * 0.20), width: Math.round(ww * 0.34),
        height: Math.round(hh * 0.24), zIndex: 24, background: paper, borderRadius: 4,
        boxShadow: SH, transform: `scale(${1 + k2 * 0.09})` }}>
        <div style={{ position: "absolute", left: "9%", top: "18%", width: "76%", height: "26%",
          background: ink, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "9%", top: "54%", width: "52%", height: "14%",
          background: paper3, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: "9%", top: "74%", width: "30%", height: "18%",
          background: c, borderRadius: 3 }} />
      </div>
      {/* 3 · the card row, off the BOTTOM */}
      <div style={{ position: "absolute", left: PAD + 16, right: PAD + 16,
        top: hh - PAD - Math.round(hh * 0.22) - 12 + k3 * (PAD + 104),
        height: Math.round(hh * 0.22), zIndex: 26,
        transform: `scale(${1 + k3 * 0.10})` }}>
        {[0, 1, 2].map(i => (
          <div key={"cd" + i} style={{ position: "absolute", left: `${i * 34.5}%`, top: 0,
            width: "31%", height: "100%", background: paper, borderRadius: 4, boxShadow: SH }}>
            <div style={{ position: "absolute", left: "8%", top: "12%", right: "8%", height: "46%",
              background: i === 1 ? c : mxh(c, 0.40) }} />
            <div style={{ position: "absolute", left: "8%", top: "66%", width: "68%",
              height: "12%", background: ink }} />
            <div style={{ position: "absolute", left: "8%", top: "83%", width: "42%",
              height: "12%", background: paper3 }} />
          </div>
        ))}
      </div>
      {/* 4 · the one 3D object, out of the top-right corner. It only exists once
             there is a gap for it to stand in. */}
      {k4 > 0.02 && (() => {
        const S4 = Math.round(Math.min(ww, hh) * 0.24 * k4);
        const spin = react * Math.sin(f / 17) * 16;
        return (
          <div style={{ position: "absolute", left: ww - PAD - S4 * 0.9 + k4 * (PAD + 62),
            top: PAD + hh * 0.10 - k4 * (PAD + 40), width: S4, height: S4, zIndex: 28,
            transform: `rotate(${spin}deg)` }}>
            <div style={{ position: "absolute", inset: 0, background: mxh(c, 0.18),
              clipPath: "polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%)" }} />
            <div style={{ position: "absolute", inset: 0, background: mxh(c, 0.48),
              clipPath: "polygon(50% 0,100% 26%,50% 52%,0 26%)" }} />
            <div style={{ position: "absolute", inset: 0, background: dkh(c, 0.40),
              clipPath: "polygon(50% 52%,100% 26%,100% 74%,50% 100%)" }} />
          </div>
        );
      })()}
      {/* the cursor, when the scene is about reacting to one */}
      {react > 0 && (
        <div style={{ position: "absolute",
          left: PAD + (ww - PAD * 2) * (0.30 + 0.42 * (0.5 + 0.5 * Math.sin(f / 23))),
          top: PAD + (hh - PAD * 2) * (0.44 + 0.16 * Math.sin(f / 19)),
          width: 26, height: 34, zIndex: 52, background: paper,
          filter: "drop-shadow(0 3px 5px rgba(26,24,19,0.5))",
          clipPath: "polygon(0 0,0 100%,28% 76%,52% 100%,72% 84%,48% 60%,100% 44%)" }} />
      )}
      {frame && (
        <div style={{ position: "absolute", left: -18, top: -18, right: -18, bottom: -18,
          border: `18px solid ${dkh(c, 0.56)}`, borderRadius: 4, zIndex: 62 }} />
      )}
    </div>
  );
};

/* =========================================================================
   THE ARCADE — the shell every scene is built inside.
   ⛔ SIX DEPTH PLANES BEFORE A PROP LANDS: roof, far end, two pier ranks,
   floor, reflection. Plus an `Occluder` at the call site, always.
   ====================================================================== */
export const Arcade: React.FC<{ p: Place; f: number; t?: number; lit?: number;
  piers?: number; endGlow?: number; wet?: number; ribs?: boolean; bays?: React.ReactNode }> =
  ({ p, f, t = 0, lit = 0.34, piers = 5, endGlow = 1, wet = 1, ribs = true, bays }) => (<>
  {/* 1 · the far end of the arcade — the vanishing light */}
  <div style={{ position: "absolute", inset: 0, zIndex: 1,
    background: `linear-gradient(176deg, ${p.back} 0%, ${p.back2} 100%)` }} />
  <div style={{ position: "absolute", left: W * 0.5 - 210, top: p.horizon - 300, width: 420,
    height: 420, borderRadius: "50%", zIndex: 2,
    background: `radial-gradient(circle, ${hexa(p.key, 0.30 * endGlow)} 0%, ${hexa(p.key, 0.08 * endGlow)} 46%, ${hexa(p.key, 0)} 70%)` }} />
  <div style={{ position: "absolute", left: W * 0.5 - 96, top: p.horizon - 214, width: 192,
    height: 208, zIndex: 3, background: hexa(p.key, 0.16 * endGlow),
    clipPath: "polygon(16% 0,84% 0,100% 100%,0 100%)" }} />

  {/* 2 · the barrel roof and its ribs — the overhead mass ten reels skipped */}
  {ribs && (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: -10, height: 180, zIndex: 6,
      background: `linear-gradient(180deg, ${dkh(p.back2, 0.44)} 0%, ${hexa(p.back2, 0)} 100%)` }} />
    {Array.from({ length: 7 }, (_, i) => {
      const k = i / 6, sp = 1 - k * 0.62;
      return (
        <div key={"rb" + i} style={{ position: "absolute",
          left: W * 0.5 - (W * 0.60) * sp, width: W * 1.20 * sp, top: 8 + k * 96,
          height: 12 + (1 - k) * 12, zIndex: 7,
          borderRadius: "50%", border: `${3 + (1 - k) * 5}px solid ${hexa(mxh(p.lip, 0.12), 0.34 + (1 - k) * 0.30)}`,
          borderBottom: "none" }} />
      );
    })}
  </>)}

  {/* 3,4 · two ranks of piers, receding — the parallax that says PLACE */}
  {[0, 1].map(rank => {
    const k = rank ? 1 : 0.62;
    const c = rank ? dkh(p.back2, 0.70) : dkh(p.back2, 0.84);
    return Array.from({ length: piers }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      const n = Math.floor(i / 2);
      const depth = 1 - n * 0.24 - rank * 0.10;
      const pw = (44 + 40 * depth) * (rank ? 1 : 0.8);
      const ph = (240 + 240 * depth) * (rank ? 1 : 0.86);
      const px = W * 0.5 + side * (110 + n * 168 + rank * 36) * (0.5 + depth * 0.6) - pw / 2 - t * 0.14 * side;
      return (
        <div key={`pr${rank}_${i}`} style={{ position: "absolute", left: px,
          top: p.horizon - ph, width: pw, height: ph, background: c,
          zIndex: 8 + rank * 3 + n, boxShadow: rank ? SH_D : undefined }}>
          <div style={{ position: "absolute", left: side < 0 ? pw - 7 : 0, top: 0, bottom: 0,
            width: 7, background: mxh(c, 0.16) }} />
          {/* a lit window band on each near pier — practicals, not lifted shading */}
          {rank === 1 && (
            <div style={{ position: "absolute", left: pw * 0.2, top: ph * 0.24, width: pw * 0.6,
              height: ph * 0.16, background: hexa(p.key, 0.30 * lit * k) }} />
          )}
        </div>
      );
    });
  })}

  {bays}

  {/* 5 · the floor */}
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, bottom: 0, zIndex: 16,
    background: `linear-gradient(184deg, ${p.floor} 0%, ${p.floor2} 100%)` }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon - 7, height: 9,
    background: p.lip, zIndex: 17 }} />
  {/* the floor's own perspective — slabs, so the ground is a surface not a fill */}
  {Array.from({ length: 7 }, (_, i) => {
    const k = i / 6;
    const yy = p.horizon + Math.pow(k, 1.7) * (H - p.horizon) + 8;
    return <div key={"fl" + i} style={{ position: "absolute", left: -40, right: -40, top: yy,
      height: 2 + k * 3, background: hexa(p.lip, 0.20 + k * 0.16), zIndex: 18 }} />;
  })}
  {[0, 1].map(i => (
    <div key={"fv" + i} style={{ position: "absolute", left: W * 0.5 + (i ? 1 : -1) * 40,
      top: p.horizon, width: 3, height: H - p.horizon, zIndex: 18,
      background: mxh(p.floor2, 0.30),
      transform: `skewX(${(i ? 1 : -1) * 26}deg)`, transformOrigin: "50% 0%" }} />
  ))}
  {/* 6 · the wet reflection band — the arcade floor holds its lights */}
  {wet > 0 && (
    <div style={{ position: "absolute", left: 0, right: 0, top: p.horizon, height: 190, zIndex: 19,
      background: `linear-gradient(180deg, ${hexa(p.key, 0.16 * wet)} 0%, ${hexa(p.key, 0)} 100%)` }} />
  )}
  {/* grit, drifting — texture that is above the 8px floor so it survives */}
  {Array.from({ length: 18 }, (_, i) => (
    <div key={"g" + i} style={{ position: "absolute",
      left: ((i * 113 + 30 - t * 0.7) % 1180) - 70,
      top: p.horizon + 30 + ((i * 53) % 9) * 27,
      width: 9 + (i % 3) * 5, height: 5, borderRadius: 3, background: p.grit,
      opacity: 0.34, zIndex: 20 }} />
  ))}
</>);

/** the pneumatic prompt slot — the mechanism's INPUT half (§10: a beam needs a
    finding, an arrival needs an output, a hand-off needs a source) */
export const PromptSlot: React.FC<{ x: number; y: number; s?: number; f: number;
  suck?: number; charge?: number; z?: number }> =
  ({ x, y, s = 1, f, suck = 0, charge = 0, z = 44 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    {/* the tube running up out of frame — the SOURCE half */}
    <div style={{ position: "absolute", left: 44, top: -640, width: 58, height: 650,
      background: "linear-gradient(90deg,#3A3026 0%,#6B5940 42%,#3A3026 100%)",
      borderRadius: 6 }} />
    {Array.from({ length: 8 }, (_, i) => (
      <div key={"cl" + i} style={{ position: "absolute", left: 38, top: -620 + i * 78, width: 70,
        height: 11, borderRadius: 4, background: "#25201A" }} />
    ))}
    {/* the charge travelling up it */}
    {charge > 0 && (
      <div style={{ position: "absolute", left: 50, top: -30 - charge * 600, width: 46,
        height: 52 + charge * 26, borderRadius: 8, background: GOLD, opacity: 0.92 - charge * 0.2 }} />
    )}
    {/* the brass mouth */}
    <div style={{ position: "absolute", left: 0, top: 0, width: 148, height: 92,
      background: "linear-gradient(168deg,#C79A4E 0%,#7A5C2C 100%)", borderRadius: 7,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 18, top: 22, width: 112, height: 26,
      borderRadius: 4, background: "#1A140D" }} />
    <div style={{ position: "absolute", left: 18, top: 22, width: 112, height: 26,
      borderRadius: 4, background: hexa(GOLD, 0.30 + Math.sin(f / 11) * 0.08) }} />
    <div style={{ position: "absolute", left: 22, top: 62, width: 104, height: 8, borderRadius: 4,
      background: "#8B6C34" }} />
    {/* the card, deforming as it is snatched */}
    {suck > 0 && suck < 1 && (
      <div style={{ position: "absolute", left: 30 + suck * 22, top: 34 - suck * 6,
        width: 92 * (1 - suck * 0.72), height: 60 * (1 - suck * 0.5),
        background: PAPER, borderRadius: 2, transform: `rotate(${suck * -16}deg)`,
        boxShadow: SH }}>
        {[0, 1].map(i => (
          <div key={i} style={{ position: "absolute", left: 8, top: 12 + i * 15,
            width: `${62 - i * 20}%`, height: 5, background: "#B9B2A4" }} />
        ))}
      </div>
    )}
  </div>
);

/** ⭐ THE DEPTH GAUGE — S8's hero object. A graduated rail running back into the
    dark with a carriage on it. It measures rather than asserts, which is the
    only honest way to draw "nothing comes close". */
export const DepthGauge: React.FC<{ x: number; y: number; w: number; f: number; k: number;
  z?: number; c?: string; stop?: number; label?: string }> =
  ({ x, y, w: ww, f, k, z = 44, c = "#6FC7A8", stop = 1, label }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: 132, zIndex: z }}>
    {/* the rail, in perspective — it goes AWAY, which is the whole point */}
    <div style={{ position: "absolute", left: 0, top: 52, width: ww, height: 16,
      background: `linear-gradient(90deg, ${mxh(c, 0.30)} 0%, ${dkh(c, 0.62)} 100%)`,
      transform: "perspective(700px) rotateY(-24deg)", transformOrigin: "0% 50%" }} />
    {Array.from({ length: 11 }, (_, i) => {
      const kk = i / 10;
      const gh = 30 - kk * 17;
      return (
        <div key={"tk" + i} style={{ position: "absolute", left: 8 + kk * (ww - 30),
          top: 52 - gh, width: i % 5 === 0 ? 5 : 3, height: gh,
          background: i % 5 === 0 ? dkh(c, 0.30) : mxh(c, 0.42) }} />
      );
    })}
    {/* the hard stop the flat page hits */}
    {stop < 1 && (
      <div style={{ position: "absolute", left: 8 + stop * (ww - 30) - 6, top: 4, width: 16,
        height: 78, background: "#C44A3A", borderRadius: 2 }} />
    )}
    {/* the carriage */}
    <div style={{ position: "absolute", left: 8 + Math.min(k, stop) * (ww - 30) - 22, top: 24,
      width: 48, height: 40, background: mxh(c, 0.40), borderRadius: 3, boxShadow: SH }}>
      <div style={{ position: "absolute", left: 6, top: 8, right: 6, height: 9,
        background: dkh(c, 0.50) }} />
      <div style={{ position: "absolute", left: 4, bottom: -7, width: 12, height: 12,
        borderRadius: "50%", background: "#2A2E33" }} />
      <div style={{ position: "absolute", right: 4, bottom: -7, width: 12, height: 12,
        borderRadius: "50%", background: "#2A2E33" }} />
    </div>
    {label && (
      <div style={{ position: "absolute", left: 0, top: 88, ...mono(20, 800),
        color: mxh(c, 0.50), letterSpacing: 2 }}>{label}</div>
    )}
  </div>
);


/** ⭐⭐ A BIG PHYSICAL COUNTER. Measured against 119 OX and 120 UNLAZY: every
    scene in those reels has ONE large, opaque, high-chroma object you read
    instantly — a "07 DAYS" board, a "DONE" balloon, a slot machine reading
    UNLAZY. This reel was carrying its numbers as 23px chips in the plate band,
    which is information delivered as TYPE (ANIMATION-QUALITY §4) rather than as
    a thing in the room. This is the thing in the room. */
export const BigCounter: React.FC<{ x: number; y: number; v: number; label: string;
  f: number; s?: number; z?: number; c?: string; flip?: number }> =
  ({ x, y, v, label, f, s = 1, z = 60, c = GOLD, flip = -1 }) => {
  const k = flip >= 0 ? Math.max(0, 1 - (f - flip) / 9) : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 196 * s, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "0 100%" }}>
      {/* the housing: cast body, side ribs, feet — a machine, not a card */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 196, height: 250,
        background: "linear-gradient(168deg,#3A3F4C 0%,#1B1F29 100%)", borderRadius: 7,
        boxShadow: SH_D }} />
      {[0, 1].map(i => (
        <div key={i} style={{ position: "absolute", left: i ? 176 : 6, top: 18, width: 14,
          height: 214, background: "#4B5162", borderRadius: 3 }} />
      ))}
      {[0, 1].map(i => (
        <div key={"ft" + i} style={{ position: "absolute", left: i ? 132 : 22, top: 246,
          width: 42, height: 18, background: "#22262F", borderRadius: 3 }} />
      ))}
      {/* the window and the digit, on a cream ground so the numeral is the
          brightest thing on the object */}
      <div style={{ position: "absolute", left: 26, top: 26, width: 144, height: 152,
        background: "#0C0F16", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 7, background: "#F4F0E2", borderRadius: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: `translateY(${k * -26}px)` }}>
          <span style={{ ...ui(112, 900), color: "#1A1813", lineHeight: 1 }}>{v}</span>
        </div>
        {/* the split line every mechanical counter has */}
        <div style={{ position: "absolute", left: 7, right: 7, top: "50%", height: 3,
          background: "#B9B2A2" }} />
      </div>
      <div style={{ position: "absolute", left: 26, top: 190, width: 144, height: 40,
        background: c, borderRadius: 4, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...ui(19, 900), color: "#1A1813", letterSpacing: 2 }}>{label}</span>
      </div>
    </div>
  );
};

/** ⭐⭐ A BIG ROUND DIAL. Same reasoning as BigCounter: S8's claim is the
    strongest one in the reel and it was being carried by a 16px-high rail at the
    bottom of the frame. A needle slammed across a face is what "measured, not
    claimed" looks like as an OBJECT. */
export const DepthDial: React.FC<{ x: number; y: number; k: number; s?: number; z?: number;
  c?: string; f: number; label: string; peg?: boolean }> =
  ({ x, y, k, s = 1, z = 60, c = GREEN, f, label, peg = false }) => {
  /* the needle rings out when it hits the stop instead of arriving and parking */
  const ring = peg ? Math.sin(f / 2.6) * Math.exp(-Math.max(0, f - 18) / 9) * 4 : 0;
  const ang = -122 + k * 244 + ring;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 268 * s, height: 268 * s,
      zIndex: z, transform: `scale(${s})`, transformOrigin: "0 0" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
        background: "linear-gradient(168deg,#3E4450 0%,#1C2029 100%)", boxShadow: SH_D }} />
      <div style={{ position: "absolute", inset: 16, borderRadius: "50%", background: "#F4F0E2" }} />
      {/* the graduated arc: the last third is the tool's, the first notch theirs */}
      {Array.from({ length: 21 }, (_, i) => {
        const a = (-122 + (i / 20) * 244) * Math.PI / 180;
        const big = i % 5 === 0;
        const r0 = 104, r1 = big ? 82 : 92;
        return (
          <div key={"tk" + i} style={{ position: "absolute", left: 134 + Math.sin(a) * r1 - 2,
            top: 134 - Math.cos(a) * r1 - 2, width: big ? 7 : 4, height: big ? 24 : 14,
            background: i <= 2 ? "#C44A3A" : i >= 15 ? c : "#6E747E", borderRadius: 2,
            transform: `rotate(${-122 + (i / 20) * 244}deg)`, transformOrigin: "50% 50%" }} />
        );
      })}
      {/* the needle: a real tapered pointer with a counterweight */}
      <div style={{ position: "absolute", left: 128, top: 44, width: 12, height: 104,
        background: "#B8402E", borderRadius: "6px 6px 2px 2px",
        transform: `rotate(${ang}deg)`, transformOrigin: "50% 90px" }} />
      <div style={{ position: "absolute", left: 118, top: 118, width: 32, height: 32,
        borderRadius: "50%", background: "#2A2E37", border: "4px solid #565D70" }} />
      <div style={{ position: "absolute", left: 62, top: 176, width: 144, height: 38,
        background: c, borderRadius: 4, display: "flex", alignItems: "center",
        justifyContent: "center" }}>
        <span style={{ ...ui(18, 900), color: "#1A1813", letterSpacing: 1.6 }}>{label}</span>
      </div>
    </div>
  );
};

/** the bright works both reference reels are set in: pale block wall, hazard
    kerb, overhead gantry, roof lights. Shared so E and F are one world. */
export const Works: React.FC<{ f: number; tint?: string; belt?: boolean }> =
  ({ f, tint = "#C9BFA4", belt = false }) => (<>
  {/* ⛔ v1 of this set was beige on beige and took BODY_SAT to 23.9% against a
      34% bar — the opposite failure to the neon arcade it replaced, and the same
      root cause: the COLOUR was in a filter, not in the paint. A real works is
      full of painted plant: amber gantries, clay drums, green machinery, hazard
      stripes. That is where the saturation comes from now. */}
  <div style={{ position: "absolute", inset: 0, zIndex: 6,
    background: "linear-gradient(178deg,#EFE7D6 0%,#B7AC90 100%)" }} />
  {Array.from({ length: 40 }, (_, i) => {
    const paint = i % 5 === 0 ? "#C77A4E" : i % 4 === 0 ? "#4E8A6B" : i % 7 === 0 ? "#D9A44C" : i % 3 === 0 ? "#E4DAC2" : "#DCD1B6";
    return (
      <div key={"bl" + i} style={{ position: "absolute", left: -30 + (i % 8) * 136,
        top: 60 + Math.floor(i / 8) * 92, width: 128, height: 84, zIndex: 7,
        background: paint, border: "3px solid #B7A882" }} />
    );
  })}
  {/* the painted plant along the back wall — this is where the colour lives */}
  {[[60, "#C4592F"], [252, "#3F7E5E"], [452, "#E7B24C"], [660, "#B0524A"], [852, "#4A6E8A"]].map(([x, c], i) => (
    <div key={"pl" + i} style={{ position: "absolute", left: x as number, top: 312, width: 96,
      height: 156, zIndex: 9, background: c as string, borderRadius: "6px 6px 3px 3px",
      boxShadow: SH }}>
      <div style={{ position: "absolute", left: 10, top: 14, right: 10, height: 16,
        background: "#33302A", borderRadius: 3 }} />
      <div style={{ position: "absolute", left: 16, top: 46, width: 30, height: 30,
        borderRadius: "50%", background: "#EFE7D6" }} />
      <div style={{ position: "absolute", left: 54, top: 52, width: 26, height: 18,
        borderRadius: 3, background: "#33302A" }} />
      <div style={{ position: "absolute", left: 10, bottom: 16, right: 10, height: 12,
        background: "#33302A", opacity: 0.5 }} />
    </div>
  ))}
  {/* drums stacked at the wall foot — clay and amber, the house accents */}
  {[[16, "#C4592F"], [96, "#E7B24C"], [176, "#C4592F"], [252, "#3F7E5E"], [740, "#B0524A"], [806, "#E7B24C"], [886, "#C4592F"]].map(([x, c], i) => (
    <div key={"dr" + i} style={{ position: "absolute", left: x as number, top: 452, width: 68,
      height: 96, zIndex: 10, background: c as string, borderRadius: "5px 5px 7px 7px",
      boxShadow: SH }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 16, height: 8,
        background: "#33302A", opacity: 0.45 }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, height: 8,
        background: "#33302A", opacity: 0.45 }} />
    </div>
  ))}
  {/* the overhead gantry, painted amber */}
  <div style={{ position: "absolute", left: -40, right: -40, top: 92, height: 34, zIndex: 40,
    background: "linear-gradient(180deg,#E7B24C 0%,#9A7433 100%)", boxShadow: SH_D }} />
  {Array.from({ length: 7 }, (_, i) => (
    <div key={"gb" + i} style={{ position: "absolute", left: 20 + i * 156, top: 126, width: 16,
      height: 30, zIndex: 39, background: "#7A5B22" }} />
  ))}
  {[180, 506, 832].map((x, i) => (
    <div key={"rl" + i} style={{ position: "absolute", left: x - 66, top: 126, width: 132,
      height: 22, zIndex: 41, background: "#FFF3D2", borderRadius: 4 }} />
  ))}
  <div style={{ position: "absolute", left: 0, right: 0, top: 556, bottom: 0, zIndex: 12,
    background: "linear-gradient(180deg,#A89C80 0%,#6B6250 100%)" }} />
  <div style={{ position: "absolute", left: 0, right: 0, top: 544, height: 18, zIndex: 13,
    background: tint }} />
  {Array.from({ length: 16 }, (_, i) => (
    <div key={"hz" + i} style={{ position: "absolute", left: -40 + i * 72, top: 562, width: 40,
      height: 20, zIndex: 14, background: i % 2 ? "#E7B24C" : "#33302A",
      transform: "skewX(-26deg)" }} />
  ))}
  {/* ⭐ THE LINE ACTUALLY RUNS. A full-width high-contrast travelling band is the
      biggest single per-scene lever in ANIMATION-QUALITY §1, and on a STAMPING
      LINE it is also just what the room does. */}
  {belt && (<>
    <div style={{ position: "absolute", left: 0, right: 0, top: 498, height: 46, zIndex: 15,
      background: "linear-gradient(180deg,#4E4632 0%,#2A2620 100%)" }} />
    {Array.from({ length: 14 }, (_, i) => (
      <div key={"bs" + i} style={{ position: "absolute", left: ((i * 86 - f * 9.6) % 1180) - 90,
        top: 490, width: 74, height: 62, zIndex: 16,
        background: i % 2 ? "#E4DAC2" : "#B7AC90", borderRadius: 3,
        borderTop: "5px solid #F4EDDD" }} />
    ))}
  </>)}
</>);

/** the flat template drawn as a FACE — a nav bar for the brow, the hero block
    where the eyes go, the three cards for a mouth. It is the page and it is a
    mask, which is the whole joke of concept E. */
export const PageMask: React.FC<{ x: number; y: number; w: number; z?: number; rot?: number;
  s?: number }> = ({ x, y, w: ww, z = 60, rot = 0, s = 1 }) => {
  const hh = ww * 1.06;
  /* ⛔⛔ REDRAWN. Alex: *"the face of the claude sprite should be more
     interesting compared to whatever boring shape lands on its face right now."*
     It was a rounded rectangle with the page's bars arranged roughly where
     features go — a SHAPE, not a face. This is an actual face BUILT OUT OF
     PAGE PARTS, and the joke only lands once you can read it as one:
       brow      the browser chrome bar, with its three dots
       eyes      two loading spinners with a cursor arrow for a pupil — dead,
                 identical, pointing at nothing
       nose      the CTA button
       mouth     the nav bar, with the three feature-card icons as teeth
     Every one of them wears the same expression, which is the whole point. */
  const E1 = ww * 0.26;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      transform: `rotate(${rot}deg) scale(${s})`, transformOrigin: "50% 0%" }}>
      {/* the face plate: a page, but with a jaw */}
      <div style={{ position: "absolute", inset: 0, background: "#FFFFFF",
        borderRadius: `${ww * 0.14}px ${ww * 0.14}px ${ww * 0.44}px ${ww * 0.44}px`,
        boxShadow: SH_D, overflow: "hidden", border: `${ww * 0.02}px solid #DDDFE6` }}>
        {/* BROW — the chrome bar */}
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: hh * 0.13,
          background: "#E4E6EC", display: "flex", alignItems: "center", gap: ww * 0.035,
          paddingLeft: ww * 0.08 }}>
          {["#E06C60", "#E5B84A", "#5FB37D"].map(c => (
            <span key={c} style={{ width: ww * 0.05, height: ww * 0.05, borderRadius: "50%",
              background: c }} />
          ))}
        </div>
        {/* EYES — two spinners, each with a cursor for a pupil */}
        {[0, 1].map(i => (
          <div key={"ey" + i} style={{ position: "absolute",
            left: ww * (i ? 0.56 : 0.18), top: hh * 0.22, width: E1, height: E1 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
              background: "#F2F3F7", border: `${ww * 0.022}px solid #C7CAD4` }} />
            <div style={{ position: "absolute", inset: ww * 0.03, borderRadius: "50%",
              border: `${ww * 0.03}px solid #6C63C4`, borderRightColor: "transparent",
              borderBottomColor: "transparent" }} />
            <div style={{ position: "absolute", left: E1 * 0.30, top: E1 * 0.26,
              width: E1 * 0.40, height: E1 * 0.50, background: "#1E2130",
              clipPath: "polygon(0 0,0 100%,28% 76%,52% 100%,72% 84%,48% 60%,100% 44%)" }} />
          </div>
        ))}
        {/* NOSE — the CTA button */}
        <div style={{ position: "absolute", left: ww * 0.42, top: hh * 0.52, width: ww * 0.16,
          height: hh * 0.09, background: "#F09A52", borderRadius: hh * 0.045 }} />
        {/* MOUTH — the nav bar, with the three feature icons as teeth */}
        <div style={{ position: "absolute", left: ww * 0.14, right: ww * 0.14, top: hh * 0.66,
          height: hh * 0.17, background: "#2A2E3C", borderRadius: hh * 0.05,
          display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
          {["#4BB3B3", "#E7B24C", "#DA7F9E"].map(c => (
            <span key={c} style={{ width: ww * 0.11, height: ww * 0.11, borderRadius: "50%",
              background: c }} />
          ))}
        </div>
        {/* the footer strip, as a chin line */}
        <div style={{ position: "absolute", left: ww * 0.24, right: ww * 0.24, bottom: hh * 0.05,
          height: hh * 0.035, background: "#E4E6EC", borderRadius: hh * 0.02 }} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE CAST
   ⛔⛔ `Hero` HAD NO ACTION LOOP for fifteen reels (ANIMATION-QUALITY §14).
   Both actors below run one of four loops with the amplitude scaled to zero as
   `drive` rises, so an authored action always wins outright and the loop only
   ever fills the gaps. A breathing idle sits under all four at 4.6px / 2.6deg —
   the measured floor at which an idle READS, against the 1.7px that registers
   on a metric and looks static to a person.
   ====================================================================== */
export const COSTUMES: Array<Record<string, number>> = [
  { glasses: 1 }, { suit: 1 }, { constr: 1 }, { prof: 1 }, { chef: 1 }, { wizard: 1 },
  { samurai: 1 }, { cop: 1 }, { beard: 1 }, { fro: 1 }, { girl: 1 }, { xeyes: 1 },
];
export const costumeFor = (i: number) => COSTUMES[i % COSTUMES.length];

const loopFor = (f: number, i: number, act: number) => {
  const ph = i * 11;
  switch (act) {
    case 0: /* PACE  — walks side to side with a stride lift */
      return { dx: Math.sin((f + ph) / 21) * 26, dy: -Math.abs(Math.sin((f + ph) / 10.5)) * 7,
               rot: Math.sin((f + ph) / 21) * 4, arm: 0 };
    case 1: /* WORK  — leans in with a real swinging arm */
      return { dx: Math.sin((f + ph) / 13) * 7, dy: Math.abs(Math.sin((f + ph) / 13)) * 5,
               rot: 5 + Math.sin((f + ph) / 13) * 4, arm: (Math.sin((f + ph) / 13) + 1) * 0.5 };
    case 2: /* HOP   — jumps on a beat and cheers at the apex */
      { const t = ((f + ph) % 34) / 34;
        const up = Math.sin(Math.PI * Math.min(1, t * 1.7));
        return { dx: 0, dy: -up * 30, rot: 0, arm: up }; }
    default: /* LOOK — turns its head and double-takes */
      return { dx: Math.sin((f + ph) / 27) * 5, dy: 0,
               rot: Math.sin((f + ph) / 27) * 3, arm: 0 };
  }
};

/** one Claude, placed on the ground, running an action loop under any authored
    move. ⛔ `Mascot` draws its body at ~100% of `size`. */
export const Actor: React.FC<{ f: number; x: number; y: number; size: number; i?: number;
  act?: number; drive?: number; z?: number; gaze?: number; shock?: number; cheer?: number;
  stern?: number; tint?: string; dx?: number; dy?: number; rot?: number; sy?: number;
  costume?: Record<string, number>; contact?: boolean }> =
  ({ f, x, y, size, i = 0, act = 3, drive = 0, z = 50, gaze = 0, shock = 0, cheer = 0,
     stern = 0, tint, dx = 0, dy = 0, rot = 0, sy = 1, costume, contact = true }) => {
  const g = Math.max(0, 1 - drive);
  const L = loopFor(f, i, act);
  /* the breathing idle that sits under every loop — 4.6px / 2.6deg, measured */
  const br = Math.sin((f + i * 7) / 17) * 4.6 * g;
  const brR = Math.sin((f + i * 7) / 19) * 2.6 * g;
  const cs = costume ?? costumeFor(i);
  return (<>
    {contact && <Contact x={x - size * 0.42} y={y - size * 0.06} w={size * 0.84} z={z - 1}
      o={0.30} />}
    <div style={{ position: "absolute", left: x + dx + L.dx * g, top: y - size + dy + (L.dy + br) * g,
      width: size, height: size, zIndex: z,
      transform: `translateX(-50%) rotate(${rot + (L.rot + brR) * g}deg) scaleY(${sy})`,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f + i * 5} size={size} gaze={gaze} shock={shock}
        cheer={Math.max(cheer, L.arm * g * (act === 2 ? 1 : 0.42))} stern={stern}
        nodAmp={2.2 * g} nodSpeed={9 + i} tint={tint} {...cs} />
    </div>
  </>);
};

/** a rank of Claudes. ⛔ `pitch = usableWidth / (n + 1)` against
    `spacing >= 0.85 * size`, PLUS a VALUE ramp — back ranks in progressively
    darker clay is what makes depth readable, and it is the axis the greyscale
    audit can see. */
export const Crew: React.FC<{ f: number; x0: number; x1: number; y: number; n: number;
  size: number; z?: number; rank?: number; at?: number; drive?: number }> =
  ({ f, x0, x1, y, n, size, z = 48, rank = 0, at = -999, drive = 0 }) => {
  const pitch = (x1 - x0) / (n + 1);
  const tint = rank === 0 ? undefined : rank === 1 ? "#B0603C" : "#8F4E36";
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const arrive = at > -900 ? E(f, at + i * 5, at + i * 5 + 8, 0, 1, BACK) : 1;
      if (arrive <= 0.01) return null;
      return (
        <Actor key={"cw" + rank + i} f={f} x={x0 + pitch * (i + 1)} y={y}
          size={size * arrive} i={i + rank * 4} act={i % 4} drive={drive} z={z + i}
          tint={tint} />
      );
    })}
  </>);
};
