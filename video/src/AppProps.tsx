import React from "react";
import { Img, staticFile } from "remotion";
import { inter, fraunces } from "./fonts";
import { MONO, Mascot } from "./SlopKit";
import {
  W, H, E, OUT, IO, BACK, LIN, hexa, SH, SH_D, rnd, dkh, mxh, Contact,
  A_WHITE, A_DARK, A_GRAY, A_ELEV, A_SEC, A_TER, A_BLUE, BAD_TEXT,
  OAK, OAKD, OAKL, STEEL, STEELD, STEELL, BRASS, BRASSD, BRASSL,
  CARD, CARDD, TAGR, TAGRD, GOLD, CLAY, GREEN, INK, shortTok,
} from "./AppWorld";

/* ===========================================================================
   REEL 100 · "APPLE" — THE PROPS.  Board: storyboards/100-apple.md.

   ⛔⛔ DRAW, DON'T STACK ([[reel-draw-dont-stack]]). The split used here:
      · MANUFACTURED FACES — the page board, the skill card, the plinth, the
        rule plates, the console, the screens — are genuinely flat rectangular
        objects, so they are built from divs and they read.
      · REAL TOOLS AND TAGS — the caliper, the defect tag, the easel, the
        weight dial — are SHAPES, and stacked divs cannot draw a shape. Every
        one of those is a single inline <svg> with real paths, and every one
        passes the SILHOUETTE TEST (nameable as flat black on white).
   ⛔ VALUE SEPARATION: each prop's face and its ground differ in LIGHTNESS,
      not just hue. Flat + one shade + one highlight; one light direction.
   ⛔ Every grounded object gets a Contact shadow WIDER than itself.
   ========================================================================= */

/* =========================================================================
   THE APPLE MARK, AND APPLE HARDWARE.

   ⛔ WHY THE MARK IS HERE AT ALL: the subject of this reel is Apple's DESIGN
      LANGUAGE, so the mark is the same audience filter the Claude mark is —
      it says at a glance whose rules these are. `logos/si_apple.svg` is the
      real glyph (Simple Icons, fetched 2026-08-11).
   ⛔⛔ AND WHAT IT MUST NEVER IMPLY: that Apple published, endorses or is
      connected to the skill. So the mark NEVER appears alone on the artifact —
      on the SkillCard it sits next to the Claude mark with an arrow between
      them, which reads as "Apple's rules, ported to Claude", and the card
      carries an UNOFFICIAL chip. Everywhere else it is architecture: a mark on
      a wall, a lid, a lock screen, the things a design hall would actually have.

   ⛔ THE DEVICES ARE FURNITURE, NOT HEROES ([[reel-declutter-single-hero]]).
      They give the world its scale and its specificity, they display the page
      being talked about, and they never take a beat from the card or the board.
      Each is a MANUFACTURED FACE, which is the one class of object stacked divs
      genuinely do render ([[reel-draw-dont-stack]]) — but the SILHOUETTE is
      what carries them, so the proportions below are the real ones: a MacBook
      is a 16:10 lid on a base 1.06x its width, a Mac mini is square and squat
      with a 3.5% corner radius, an iPhone is 19.5:9.
   ====================================================================== */

/* =========================================================================
   COMPONENT IDLES — the permanent low-contrast life every prop carries.

   ⛔⛔ *"needs more detail, more movement in the different components
      throughout."* The trap this walks between is already in memory: a set
      where ONLY the hero moves reads as a still with an animation pasted on
      it, but a set where everything moves reads as *"too chaotic, I can't tell
      what's going on"* ([[reel-motion-hierarchy]]). The resolution is not less
      movement, it is movement with a CEILING: every idle below is slow (period
      40-110 frames), tiny (≤3px or ≤0.06 opacity), and low-contrast, so it
      registers as the object being alive without ever competing for rank.
      The hero still owns every beat; the props simply stop being frozen.
   ====================================================================== */

/** a screen's specular band, drifting down its face. Every glass surface in
    the reel gets one, at a different phase, so no two screens breathe alike. */
export const Sheen: React.FC<{ f: number; phase?: number; z?: number; o?: number }> =
  ({ f, phase = 0, z = 6, o = 0.055 }) => {
  const p = ((f * 0.4 + phase * 37) % 190) / 190;
  return (
    <div style={{ position: "absolute", left: "-30%", right: "-30%", top: `${p * 150 - 30}%`,
      height: "26%", zIndex: z, pointerEvents: "none",
      background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${o}) 50%, rgba(255,255,255,0) 100%)`,
      transform: "rotate(-11deg)" }} />
  );
};

/** the small permanent breath a standing object has: a sub-pixel sway plus a
    hair of vertical settle. Deterministic per `seed` so props never sync up. */
export const breath = (f: number, seed = 0, amp = 1) => ({
  rot: Math.sin(f / 71 + seed * 1.9) * 0.34 * amp,
  dy: Math.sin(f / 53 + seed * 2.7) * 1.1 * amp,
  dx: Math.sin(f / 89 + seed) * 1.4 * amp,
});

/** the Apple glyph. `tile` puts it on a white app-tile so it survives a dark
    set; bare is for emblems cast into a wall. */
export const AppleMark: React.FC<{ x: number; y: number; s?: number; z?: number;
  tile?: boolean; o?: number; c?: string }> =
  ({ x, y, s = 64, z = 90, tile = true, o = 1, c }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    width: tile ? s * 1.3 : s, height: tile ? s * 1.3 : s,
    borderRadius: tile ? s * 0.28 : 0,
    background: tile ? "#FFFFFF" : "transparent",
    border: tile ? `${Math.max(2, s * 0.04)}px solid #E8DCC0` : undefined,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: tile ? SH : undefined,
    filter: c ? `brightness(0) saturate(100%)` : undefined }}>
    <Img src={staticFile("logos/si_apple.svg")}
      style={{ width: s * (tile ? 0.72 : 1), height: s * (tile ? 0.72 : 1),
        objectFit: "contain" }} />
  </div>
);

/** the mark cast into a wall — no tile, no chrome, just the glyph at scale. */
export const AppleCast: React.FC<{ x: number; y: number; s?: number; z?: number;
  o?: number }> = ({ x, y, s = 200, z = 8, o = 0.14 }) => (
  <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2, width: s, height: s,
    zIndex: z, opacity: o }}>
    <Img src={staticFile("logos/si_apple.svg")}
      style={{ width: s, height: s, objectFit: "contain" }} />
  </div>
);

/** a MacBook, open. Silhouette: a 16:10 lid over a shallow trapezoid base.
    `children` renders inside the screen at its real inset. */
export const MacBook: React.FC<{ x: number; y: number; w: number; z?: number;
  children?: React.ReactNode; screen?: string; open?: boolean; dim?: number;
  f?: number }> =
  ({ x, y, w, z = 46, children, screen = "#0E1114", open = true, dim = 0, f = 0 }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const lidH = w * 0.625;                    /* 16:10 */
  const bez = w * 0.022;
  const baseH = w * 0.052, baseW = w * 1.06;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z }}>
      {open ? (<>
        {/* the lid */}
        <div style={{ position: "relative", width: w, height: lidH,
          background: D("#C9CDD2"), borderRadius: `${w * 0.022}px ${w * 0.022}px 3px 3px`,
          padding: bez, boxSizing: "border-box", boxShadow: SH_D }}>
          <div style={{ position: "absolute", left: "50%", top: bez * 0.34, width: w * 0.05,
            height: 2, marginLeft: -w * 0.025, background: D("#8E959C"), borderRadius: 2 }} />
          <div style={{ width: "100%", height: "100%", background: D(screen),
            borderRadius: 2, position: "relative", overflow: "hidden" }}>
            {children}<Sheen f={f} phase={1} z={7} />
          </div>
        </div>
        {/* the base, in perspective: wider at the front */}
        <div style={{ position: "relative", left: -(baseW - w) / 2, width: baseW,
          height: baseH, background: D("#B9BEC4"),
          clipPath: `polygon(${w * 0.028}px 0, ${baseW - w * 0.028}px 0, 100% 100%, 0 100%)`,
          boxShadow: SH }}>
          <div style={{ position: "absolute", left: "50%", top: 0, width: w * 0.15,
            height: baseH * 0.30, marginLeft: -w * 0.075,
            background: D("#9AA1A8"), borderRadius: `0 0 ${w * 0.02}px ${w * 0.02}px` }} />
        </div>
      </>) : (
        /* closed: the lid back, with the mark on it */
        <div style={{ width: w, height: lidH * 0.62, background: D("#C4C9CE"),
          borderRadius: w * 0.03, boxShadow: SH_D, display: "flex",
          alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("logos/si_apple.svg")}
            style={{ width: w * 0.15, height: w * 0.15, objectFit: "contain", opacity: 0.42 }} />
        </div>
      )}
    </div>
  );
};

/** a Mac mini. Silhouette: a square, squat slab — it only reads if the top
    face is visible and the corner radius is small. */
export const MacMini: React.FC<{ x: number; y: number; w: number; z?: number;
  dim?: number; lit?: boolean }> = ({ x, y, w, z = 44, dim = 0, lit = true }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const h = w * 0.155, top = w * 0.20;
  return (
    <div style={{ position: "absolute", left: x, top: y - top, width: w, zIndex: z }}>
      {/* the top face, in perspective */}
      <div style={{ width: w, height: top, background: D("#CDD1D6"),
        clipPath: `polygon(${w * 0.07}px 0, ${w * 0.93}px 0, 100% 100%, 0 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile("logos/si_apple.svg")}
          style={{ width: w * 0.15, height: w * 0.15, objectFit: "contain", opacity: 0.34 }} />
      </div>
      {/* the front face */}
      <div style={{ width: w, height: h, background: D("#AEB4BA"),
        borderRadius: `0 0 ${w * 0.035}px ${w * 0.035}px`, boxShadow: SH,
        position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 2,
          background: D("#8C9299") }} />
        {lit && <div style={{ position: "absolute", left: w * 0.06, top: h * 0.42,
          width: w * 0.028, height: w * 0.028, borderRadius: w * 0.028,
          background: "#8FE0A8" }} />}
      </div>
    </div>
  );
};

/** an iPhone. Silhouette: 19.5:9 with a dynamic island. */
export const IPhone: React.FC<{ x: number; y: number; w: number; z?: number;
  children?: React.ReactNode; screen?: string; dim?: number; f?: number }> =
  ({ x, y, w, z = 48, children, screen = "#0E1114", dim = 0, f = 0 }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const h = w * (19.5 / 9), bez = w * 0.045;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: D("#C2C7CC"), borderRadius: w * 0.16, padding: bez,
      boxSizing: "border-box", boxShadow: SH_D }}>
      <div style={{ width: "100%", height: "100%", background: D(screen),
        borderRadius: w * 0.12, position: "relative", overflow: "hidden" }}>
        {children}<Sheen f={f} phase={2} z={7} />
        <div style={{ position: "absolute", left: "50%", top: h * 0.018, width: w * 0.30,
          height: w * 0.085, marginLeft: -w * 0.15, borderRadius: w * 0.05,
          background: "#0A0C0E" }} />
      </div>
    </div>
  );
};

/** a desktop display on a slim stand — the second screen in the copying room. */
export const Display: React.FC<{ x: number; y: number; w: number; z?: number;
  children?: React.ReactNode; screen?: string; dim?: number; f?: number }> =
  ({ x, y, w, z = 46, children, screen = "#0E1114", dim = 0, f = 0 }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const h = w * 0.60, bez = w * 0.022;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z }}>
      <div style={{ width: w, height: h, background: D("#C4C9CE"),
        borderRadius: w * 0.022, padding: bez, boxSizing: "border-box", boxShadow: SH_D }}>
        <div style={{ width: "100%", height: "100%", background: D(screen),
          borderRadius: 2, position: "relative", overflow: "hidden" }}>
          {children}<Sheen f={f} phase={3} z={7} />
        </div>
      </div>
      {/* the chin, the neck and the foot */}
      <div style={{ width: w * 0.11, height: h * 0.26, background: D("#B4B9BF"),
        margin: "0 auto" }} />
      <div style={{ width: w * 0.34, height: h * 0.035, borderRadius: w * 0.01,
        background: D("#AAB0B6"), margin: "0 auto", boxShadow: SH }} />
    </div>
  );
};

/** the page, reduced to a device-screen thumbnail. Same layout as PageBoard so
    a MacBook and the board are visibly showing the SAME site. */
export const MiniPage: React.FC<{ fixed?: boolean; pad?: number }> =
  ({ fixed = false, pad = 7 }) => {
  const body = fixed ? A_DARK : BAD_TEXT;
  const gaps = fixed ? [11, 11, 11] : [7, 14, 9];
  const cw = fixed ? "82%" : "94%";
  return (
    <div style={{ position: "absolute", inset: 0, background: A_ELEV }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: pad * 1.5,
        background: A_DARK }} />
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)",
        top: pad * 2.4, width: cw }}>
        <div style={{ width: "88%", height: fixed ? 6 : 4, background: A_DARK, borderRadius: 1 }} />
        <div style={{ width: "62%", height: fixed ? 6 : 4, background: A_DARK,
          borderRadius: 1, marginTop: 3 }} />
        <div style={{ width: "74%", height: 3, background: body, borderRadius: 1,
          marginTop: gaps[0] }} />
        <div style={{ display: "flex", gap: 4, marginTop: gaps[1] }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 22, background: A_GRAY, borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ width: "100%", height: 24, background: A_DARK, borderRadius: 2,
          marginTop: gaps[2] }} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE TOKEN CHIPS — and the burst that is the reel's pattern interrupt.

   ⛔⛔ *"the beginning hook scene is still wayyyyy too boring, not enough
      pattern interrupt or interesting component to make someone keep watching,
      and not enough moving components either."* He is right, and the diagnosis
      is in docs/THE-OPEN.md already: **an establishing shot is a POSTER — it
      has ONE beat, and after that beat the eye has nothing left to do.** The
      old shot A was a card landing at f6 and then 21 frames of a still life.
      S0 measured the highest motion in the reel (11.87) and the LOWEST
      top-cell share (0.051), which is exactly what "busy but nothing is
      happening" looks like as a number.

   ⭐ THE FIX IS THE ONE REEL 99 FOUND: **an object that was still and is now
      coming apart is an interrupt; a fade never is.** Frame 0 is the settled
      skill card, and at f6 it BURSTS — fourteen real tokens blast out of it,
      tumble, and then slam into the wall as the rack of rules. So the open
      now reads as a sentence: Apple's design language -> comes apart into
      numbers -> those numbers run everywhere.
   ⛔ Every chip carries a REAL token value. The interrupt is also the receipt.
   ====================================================================== */

/** one token, as a physical chip you can throw. Cream plate, mono value, and
    a colour swatch when the value is a hex. */
export const TokenChip: React.FC<{ v: string; s?: number; sw?: string }> =
  ({ v, s = 1, sw }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 7 * s,
    background: CARD, border: `${2.6 * s}px solid ${CARDD}`, borderRadius: 8 * s,
    padding: `${7 * s}px ${12 * s}px`, boxShadow: SH_D, whiteSpace: "nowrap" }}>
    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26 * s,
      color: "#241F17", lineHeight: 1 }}>{v}</span>
    {sw && <span style={{ width: 20 * s, height: 20 * s, borderRadius: 5 * s,
      background: sw, border: `${2 * s}px solid #B9AF9A` }} />}
  </div>
);

/* the fourteen things that come out of the card — all real, all from the
   skill's own token files, in the order they read best at speed */
export const CHIPS: [string, string | undefined][] = [
  ["100px", undefined], ["980px", undefined], ["#1D1D1F", "#1D1D1F"],
  ["32px", undefined], ["600", undefined], ["SF Pro", undefined],
  ["#F5F5F7", "#F5F5F7"], ["#6E6E73", "#6E6E73"], ["48px", undefined],
  ["#0066CC", "#0066CC"], ["16px", undefined], ["700", undefined],
  ["#86868B", "#86868B"], ["1200px", undefined],
];

/** the BURST: chips thrown radially out of the card, tumbling as they go. */
export const ChipBurst: React.FC<{ x: number; y: number; t: number; n?: number;
  z?: number; spread?: number; s?: number }> =
  ({ x, y, t, n = 14, z = 100, spread = 620, s = 1 }) => {
  if (t <= 0.001) return null;
  return (<>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + rnd(i, 71) * 0.5;
      const d = t * spread * (0.42 + rnd(i, 72) * 0.78);
      const cs = (0.52 + rnd(i, 73) * 0.62) * s;
      /* ⛔ ±420° TUMBLE MADE HALF THE CHIPS UNREADABLE — sideways and upside
         down. The chip is a RECEIPT as well as a particle, so the tumble is
         capped at ±34°: it still reads as thrown, and every value stays
         legible on the way out. */
      const rot = (rnd(i, 74) - 0.5) * 68 * Math.min(1, t * 2);
      const [v, sw] = CHIPS[i % CHIPS.length];
      return (
        <div key={"cb" + i} style={{ position: "absolute", zIndex: z + i,
          left: x + Math.cos(a) * d, top: y + Math.sin(a) * d * 0.74,
          transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${cs})`,
          opacity: Math.min(1, t * 6) * (1 - Math.max(0, t - 0.74) * 3.2) }}>
          <TokenChip v={v} sw={sw} s={1} />
        </div>
      );
    })}
  </>);
};

/** the STORM: the same chips rushing PAST camera, staggered, so the second
    shot of the hook is 27 frames of continuous movement rather than a hold. */
export const ChipStorm: React.FC<{ f: number; n?: number; z?: number;
  cx?: number; cy?: number }> =
  ({ f, n = 16, z = 100, cx = W / 2, cy = 396 }) => (<>
    {Array.from({ length: n }, (_, i) => {
      const per = 26;
      const p = (((f + i * (per / n) * 2.1) % per) / per);
      const a = rnd(i, 81) * Math.PI * 2;
      const d = p * p * 740 * (0.5 + rnd(i, 82) * 0.7);
      const cs = 0.22 + p * p * 1.5;
      const [v, sw] = CHIPS[i % CHIPS.length];
      return (
        <div key={"cs" + i} style={{ position: "absolute", zIndex: z + i,
          left: cx + Math.cos(a) * d, top: cy + Math.sin(a) * d * 0.66,
          transform: `translate(-50%,-50%) rotate(${(rnd(i, 83) - 0.5) * 30 * p}deg) scale(${cs})`,
          opacity: Math.min(1, p * 4) * (1 - Math.max(0, p - 0.72) * 3.4) }}>
          <TokenChip v={v} sw={sw} s={1} />
        </div>
      );
    })}
  </>);

/* =========================================================================
   THE HERO ARTIFACT — the skill, as one cream .md card.
   It is frame 0, it is what posts into the console at S5, and it is what the
   CTA hands over. The three lines on it are real tokens.
   ====================================================================== */
export const SkillCard: React.FC<{ x: number; y: number; s?: number; z?: number;
  print?: number; rot?: number; stamped?: number; sub?: string }> =
  ({ x, y, s = 1, z = 60, print = 1, rot = 0, stamped = 0, sub }) => {
  const LINES: [string, string][] = [
    ["--apple-section-gap", "100px"],
    ["--apple-content-max-width", "980px"],
    ["--apple-text-primary", "#1D1D1F"],
  ];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 740 * s, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 50%",
      background: CARD, borderRadius: 18 * s, border: `${4 * s}px solid ${CARDD}`,
      boxShadow: SH_D, overflow: "hidden" }}>
      {/* ⭐ THE HEAD IS THE WHOLE THESIS IN ONE OBJECT: the APPLE mark, an
          arrow, the CLAUDE mark. "Apple's rules, ported to Claude" is the
          entire premise of the reel, and here it is readable with the sound
          off in the first frame.
          ⛔⛔ AND IT IS WHY THE APPLE MARK IS SAFE TO USE HERE. It never
          appears alone on the artifact — alone it would read as an Apple
          product. Beside the Claude mark with an arrow between them, and under
          an UNOFFICIAL chip, it reads as what it is: a third party skill
          derived from a public design language. */}
      <div style={{ display: "flex", alignItems: "center", gap: 13 * s,
        padding: `${20 * s}px ${24 * s}px ${16 * s}px` }}>
        <div style={{ width: 74 * s, height: 74 * s, borderRadius: 16 * s,
          background: A_WHITE, border: `${3 * s}px solid #E8DCC0`, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Img src={staticFile("logos/si_apple.svg")}
            style={{ width: 46 * s, height: 46 * s, objectFit: "contain" }} />
        </div>
        <svg width={30 * s} height={20 * s} viewBox="0 0 30 20"
          style={{ flexShrink: 0, display: "block" }}>
          <path d="M2 10 H22 M15 3 L23 10 L15 17" fill="none" stroke="#B0A48A"
            strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ width: 74 * s, height: 74 * s, borderRadius: 16 * s,
          background: A_WHITE, border: `${3 * s}px solid #E8DCC0`, display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: 54 * s, height: 54 * s, objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0, marginLeft: 4 * s }}>
          <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900,
            fontSize: 42 * s, lineHeight: 1, color: "#241F17",
            letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>APPLE DESIGN</div>
          <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17 * s,
            letterSpacing: "0.13em", color: "#8A7F68", marginTop: 5 * s,
            whiteSpace: "nowrap" }}>
            {sub ?? "UNOFFICIAL · .md"}</div>
        </div>
        {stamped > 0.02 && (
          <div style={{ transform: `rotate(-11deg) scale(${0.7 + stamped * 0.3})`,
            opacity: stamped, border: `${4 * s}px solid ${GREEN}`, borderRadius: 8 * s,
            padding: `${4 * s}px ${11 * s}px`, fontFamily: inter.fontFamily,
            fontWeight: 900, fontSize: 22 * s, color: GREEN, letterSpacing: "0.08em",
            flexShrink: 0 }}>SENT</div>
        )}
      </div>
      {/* the hairline */}
      <div style={{ height: 3 * s, background: CARDD, margin: `0 ${24 * s}px` }} />
      {/* the three real tokens, printing left to right */}
      <div style={{ padding: `${16 * s}px ${24 * s}px ${22 * s}px` }}>
        {LINES.map(([nm, vl], i) => {
          /* each line wipes in over its own third of `print` */
          const p = Math.max(0, Math.min(1, print * 3 - i));
          const swatch = vl.startsWith("#");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 * s,
              height: 40 * s, opacity: p > 0 ? 1 : 0 }}>
              <div style={{ overflow: "hidden", whiteSpace: "nowrap",
                width: `${p * 100}%`, display: "flex", alignItems: "center", gap: 12 * s }}>
                <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 25 * s,
                  color: "#6E6455", whiteSpace: "nowrap" }}>{nm}:</span>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 27 * s,
                  color: "#241F17", whiteSpace: "nowrap" }}>{vl}</span>
                {swatch && (
                  <span style={{ width: 26 * s, height: 26 * s, borderRadius: 6 * s,
                    background: A_DARK, border: `${2 * s}px solid #B9AF9A`,
                    flexShrink: 0 }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
   THE CO-STAR — YOUR WEBSITE, as a board you can stand up and measure.

   ⛔ THE VILLAIN IS DRAWN HERE AND NEVER MENTIONED. At fix=0 the board is a
      decent-looking page with four REAL defects in it: uneven section gaps,
      a content column running nearly full bleed, body text at #4A4A4A instead
      of #1D1D1F, and one card's padding tight. S4 shows it and says nothing.
      S6's tags land exactly on these four. S8 corrects exactly these four.
   Each correction is its OWN prop so the four can land on four separate beats
   rather than as one blended dissolve.
   ====================================================================== */
type BoardFix = { gap?: number; width?: number; color?: number; weight?: number };

/** board-local geometry, so tags and calipers can land on the real defects */
export const boardGeom = (s: number, fx: BoardFix = {}) => {
  const { gap = 0, width = 0, color = 0, weight = 0 } = fx;
  const BW = 340 * s, BH = 520 * s, PAD = 16 * s;
  /* the three section gaps: uneven 64/88/71 -> an even 100 */
  const g = [64, 88, 71].map((v) => (v + (100 - v) * gap) * 0.30 * s);
  /* content column: 94% of the board -> 980/1200 = 81.7% */
  const cw = (0.94 + (0.817 - 0.94) * width) * (BW - PAD * 2);
  const cx = PAD + ((BW - PAD * 2) - cw) / 2;
  return { BW, BH, PAD, g, cw, cx, gap, width, color, weight };
};

export const PageBoard: React.FC<{ x: number; y: number; s?: number; z?: number;
  fx?: BoardFix; f?: number; rot?: number; dim?: number }> =
  ({ x, y, s = 1, z = 50, fx = {}, f = 0, rot = 0, dim = 0 }) => {
  const G = boardGeom(s, fx);
  const { BW, BH, PAD, g, cw, cx } = G;
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  /* the headline weight: drawn as BAR THICKNESS, never typeset as a number */
  const hw = (10 + 6 * (fx.weight ?? 0)) * s;
  const body = fx.color ? mxh(BAD_TEXT, 0) : BAD_TEXT;
  const bodyC = (fx.color ?? 0) > 0.5 ? A_DARK : BAD_TEXT;
  const bar = (w: number, h: number, c: string, mt: number) => (
    <div style={{ width: w, height: h, background: D(c), borderRadius: 2 * s, marginTop: mt }} />
  );
  let top = PAD + 34 * s;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: BW, height: BH, zIndex: z,
      transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%",
      background: D(A_ELEV), borderRadius: 6 * s,
      border: `${3 * s}px solid ${D("#B6AC98")}`, boxShadow: SH_D, overflow: "hidden" }}>
      {/* ⭐ THE BOARD IS PAPER UNDER A WORKLIGHT, so a soft raking highlight
          crawls down it. It is the only idle the hero object gets, it is 0.05
          opacity, and it is what stops a 306x468 white rectangle reading as a
          cut-out in the four scenes it appears in. */}
      <Sheen f={f} phase={4} z={9} o={0.05} />
      {/* the nav */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 30 * s,
        background: D(A_DARK), display: "flex", alignItems: "center",
        paddingLeft: 12 * s, gap: 9 * s }}>
        <div style={{ width: 13 * s, height: 13 * s, borderRadius: 13 * s, background: D("#D8D4CE") }} />
        {[26, 20, 24, 18].map((w, i) => (
          <div key={i} style={{ width: w * s, height: 6 * s, borderRadius: 3 * s,
            background: D("#9A968E") }} />
        ))}
      </div>
      {/* THE CONTENT COLUMN — its width is --apple-content-max-width */}
      <div style={{ position: "absolute", left: cx, top: top, width: cw }}>
        {/* hero headline: two bars whose THICKNESS is the title weight */}
        {bar(cw * 0.92, hw, A_DARK, 0)}
        {bar(cw * 0.66, hw, A_DARK, 7 * s)}
        {/* subhead, in the body colour that the audit flags */}
        {bar(cw * 0.80, 6 * s, bodyC, 13 * s)}
        {bar(cw * 0.72, 6 * s, bodyC, 6 * s)}
        {/* the link, always Apple blue */}
        {bar(cw * 0.30, 7 * s, A_BLUE, 12 * s)}
      </div>
      {/* SECTION 2 — three cards. The first card's padding is the tight one. */}
      <div style={{ position: "absolute", left: cx, top: top + 108 * s + g[0],
        width: cw, display: "flex", gap: 9 * s }}>
        {[0, 1, 2].map((i) => {
          const cp = (i === 0 ? 5 : 11) + (i === 0 ? 6 : 0) * (fx.gap ?? 0);
          return (
            <div key={i} style={{ flex: 1, height: 76 * s, background: D(A_GRAY),
              borderRadius: 5 * s, padding: cp * s, boxSizing: "border-box" }}>
              <div style={{ width: "100%", height: 26 * s, background: D("#D2D2D6"),
                borderRadius: 3 * s }} />
              {bar("70%" as any, 5 * s, bodyC, 8 * s)}
              {bar("52%" as any, 5 * s, bodyC, 5 * s)}
            </div>
          );
        })}
      </div>
      {/* SECTION 3 — a wide band */}
      <div style={{ position: "absolute", left: cx, top: top + 108 * s + g[0] + 76 * s + g[1],
        width: cw, height: 84 * s, background: D(A_DARK), borderRadius: 5 * s,
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", gap: 7 * s }}>
        <div style={{ width: cw * 0.52, height: hw * 0.8, background: D("#F2F2F4"),
          borderRadius: 2 * s }} />
        <div style={{ width: cw * 0.34, height: 5 * s, background: D("#9A9AA0"),
          borderRadius: 2 * s }} />
      </div>
      {/* the footer */}
      <div style={{ position: "absolute", left: cx,
        top: top + 108 * s + g[0] + 76 * s + g[1] + 84 * s + g[2],
        width: cw, display: "flex", gap: 8 * s }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1 }}>
            {bar("100%" as any, 5 * s, "#C6C2BA", 0)}
            {bar("70%" as any, 4 * s, "#D2CEC6", 5 * s)}
          </div>
        ))}
      </div>
    </div>
  );
};

/** where the four planted defects sit, in BOARD-LOCAL px — so a tag, a caliper
    or a check lands on the actual thing it is about, never near it. */
export const flawPoints = (s: number, fx: BoardFix = {}) => {
  const G = boardGeom(s, fx);
  const { PAD, g, cw, cx } = G;
  const top = PAD + 34 * s;
  const y1 = top + 108 * s + g[0] * 0.5;                       /* gap 1 */
  const y2 = top + 108 * s + g[0] + 76 * s + g[1] * 0.5;       /* gap 2 */
  const y3 = top + 108 * s + g[0] + 76 * s + g[1] + 84 * s + g[2] * 0.5;
  return {
    gap1: { x: cx + cw * 0.5, y: y1 },
    gap2: { x: cx + cw * 0.5, y: y2 },
    gap3: { x: cx + cw * 0.5, y: y3 },
    width: { x: cx + cw - 6 * s, y: top + 54 * s },
    color: { x: cx + cw * 0.44, y: top + 62 * s },
    pad: { x: cx + cw * 0.14, y: top + 108 * s + g[0] + 34 * s },
    weight: { x: cx + cw * 0.30, y: top + 8 * s },
  };
};

/* =========================================================================
   THE TOOLS — inline SVG, one path each, silhouette-legible.
   ====================================================================== */

/** a defect tag: the classic five-sided luggage tag with a punched eye.
    Silhouette test: a pentagon with a hole reads as "tag" at 40px. */
export const Tag: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string; fg?: string; rot?: number; o?: number; flip?: number;
  point?: "l" | "r"; f?: number; seed?: number }> =
  ({ x, y, t, s = 1, z = 80, c = TAGR, fg = "#FFF3EE", rot = 0, o = 1, flip = 0,
     point = "l", f = 0, seed = 0 }) => {
  /* ⭐ A TAG HANGS FROM A HOLE, SO IT SWINGS. The pivot is the punched eye, the
     amplitude is under two degrees and the period is ~2.3s — enough that six
     tags on a board are never a frozen collage, nowhere near enough to compete
     with the run that is landing them. */
  const sway = Math.sin(f / 41 + seed * 1.7) * 1.7 + Math.sin(f / 27 + seed) * 0.5;
  /* flip 0..1 turns the red flag into a gold check as its fix lands */
  const cc = flip > 0.5 ? GOLD : c;
  const edge = flip > 0.5 ? dkh(GOLD, 0.32) : TAGRD;
  /* ⛔ THE PLATE IS SIZED FROM ITS LABEL, NOT FIXED AT 152. A flipped tag also
     carries a 34px check, and "#1D1D1F" at 22px mono is 91px — the fixed
     viewBox clipped the trailing "F" off the S8 check and it shipped reading
     "#1D1D1". Width now = point + text + check + padding, measured. */
  const h = 52;
  const w = Math.max(152, 56 + t.length * 13.2 + (flip > 0.5 ? 40 : 0));
  /* ⛔ THE POINT FACES THE BOARD. A tag in the LEFT margin whose arrow points
     further left is pointing at nothing; `point` puts the tip on the side the
     leader line leaves from. */
  const body = point === "l"
    ? `M 26 2 L ${w - 6} 2 Q ${w - 2} 2 ${w - 2} 6 L ${w - 2} ${h - 6}
       Q ${w - 2} ${h - 2} ${w - 6} ${h - 2} L 26 ${h - 2} L 2 ${h / 2} Z`
    : `M 6 2 L ${w - 26} 2 L ${w - 2} ${h / 2} L ${w - 26} ${h - 2} L 6 ${h - 2}
       Q 2 ${h - 2} 2 ${h - 6} L 2 6 Q 2 2 6 2 Z`;
  const eyeX = point === "l" ? 20 : w - 20;
  const tx = point === "l" ? (flip > 0.5 ? 74 : 38) : (flip > 0.5 ? 60 : 22);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
      transform: `rotate(${rot + sway}deg) scale(${s})`,
      transformOrigin: `${point === "l" ? 20 : w - 20}px 50%` }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
        style={{ display: "block", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.42))" }}>
        <path d={body} fill={cc} stroke={edge} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={eyeX} cy={h / 2} r={5.5} fill={edge} />
        {flip > 0.5 && (
          <path d={`M ${tx - 34} 26 L ${tx - 25} 35 L ${tx - 8} 17`} fill="none"
            stroke="#3A2E12" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        )}
        <text x={tx} y={h / 2 + 8} fill={flip > 0.5 ? "#3A2E12" : fg}
          fontFamily={MONO} fontWeight={900} fontSize={22}>{t}</text>
      </svg>
    </div>
  );
};

/** an unnamed defect pin — the density behind the six NAMED tags. One gesture,
    fourteen marks, but only six of them ask to be read. */
export const Pin: React.FC<{ x: number; y: number; s?: number; z?: number; o?: number;
  c?: string }> = ({ x, y, s = 1, z = 79, o = 1, c = TAGR }) => (
  <div style={{ position: "absolute", left: x - 13 * s, top: y - 13 * s, zIndex: z,
    opacity: o, width: 26 * s, height: 26 * s, borderRadius: 26 * s,
    background: c, border: `${3 * s}px solid ${TAGRD}`, boxShadow: SH }}>
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 6 * s,
      height: 6 * s, marginLeft: -3 * s, marginTop: -3 * s, borderRadius: 6 * s,
      background: "#FFE9E3" }} />
  </div>
);

/** a vernier caliper. Silhouette: a long beam with two downward jaws and a
    thumbwheel — unmistakable, and it is the only tool that measures a GAP. */
export const Caliper: React.FC<{ x: number; y: number; open: number; s?: number;
  z?: number; read?: string; c?: string; vertical?: boolean }> =
  ({ x, y, open, s = 1, z = 84, read, c = STEEL, vertical = true }) => {
  const BEAM = 300, JAW = 46, d = Math.max(26, open);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})${vertical ? " rotate(90deg)" : ""}`,
      transformOrigin: "0% 50%" }}>
      <svg width={BEAM} height={JAW + 34} viewBox={`0 0 ${BEAM} ${JAW + 34}`}
        style={{ display: "block", filter: "drop-shadow(0 5px 9px rgba(0,0,0,0.45))" }}>
        {/* the beam */}
        <rect x={0} y={0} width={BEAM} height={17} rx={3} fill={c} stroke={STEELD} strokeWidth={2.5} />
        {/* graduations along the beam */}
        {Array.from({ length: 15 }, (_, i) => (
          <rect key={i} x={12 + i * 19} y={3} width={2} height={i % 5 === 0 ? 10 : 6} fill={STEELD} />
        ))}
        {/* the FIXED jaw */}
        <path d={`M 4 15 L 22 15 L 22 ${JAW + 22} L 14 ${JAW + 30} L 4 ${JAW + 22} Z`}
          fill={STEELL} stroke={STEELD} strokeWidth={2.5} strokeLinejoin="round" />
        {/* the SLIDING jaw + its thumbwheel */}
        <g transform={`translate(${d}, 0)`}>
          <rect x={-6} y={-4} width={40} height={26} rx={3} fill={STEELL} stroke={STEELD} strokeWidth={2.5} />
          <path d={`M 6 20 L 24 20 L 24 ${JAW + 22} L 15 ${JAW + 30} L 6 ${JAW + 22} Z`}
            fill={c} stroke={STEELD} strokeWidth={2.5} strokeLinejoin="round" />
          <circle cx={14} cy={9} r={7} fill={BRASS} stroke={BRASSD} strokeWidth={2} />
        </g>
      </svg>
      {read && (
        <div style={{ position: "absolute", left: d + 44, top: -4,
          transform: vertical ? "rotate(-90deg)" : undefined, transformOrigin: "0% 50%",
          background: INK, color: "#F6F2E8", fontFamily: MONO, fontWeight: 900,
          fontSize: 25, padding: "5px 11px", borderRadius: 7, whiteSpace: "nowrap",
          boxShadow: SH }}>{read}</div>
      )}
    </div>
  );
};

/** a paint swatch chip that FLIPS from the wrong value to the right one.
    The number is not typeset at its value — the chip changes colour. */
export const Swatch: React.FC<{ x: number; y: number; from: string; to: string;
  p: number; s?: number; z?: number; label?: string }> =
  ({ x, y, from, to, p, s = 1, z = 84, label }) => {
  const showTo = p > 0.5;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "0% 50%",
      display: "flex", alignItems: "center", gap: 10, background: CARD,
      border: `3px solid ${CARDD}`, borderRadius: 10, padding: "8px 13px 8px 8px",
      boxShadow: SH }}>
      {/* the chip: two faces on a flip, so the swap is an EVENT not a fade */}
      <div style={{ width: 46, height: 46, borderRadius: 8, background: showTo ? to : from,
        border: "3px solid #B9AF9A",
        transform: `rotateY(${Math.min(1, Math.abs(p - 0.5) * 2) * 0 + (p > 0 && p < 1 ? (0.5 - Math.abs(p - 0.5)) * 120 : 0)}deg)` }} />
      <div>
        {label && <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 15,
          color: "#8A7F68", letterSpacing: "0.02em" }}>{label}</div>}
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 26, color: "#241F17",
          lineHeight: 1.1 }}>{showTo ? to : from}</div>
      </div>
    </div>
  );
};

/** the weight dial. Silhouette: a ringed dial with a pointer — it reads as an
    instrument, and the headline thickens as it turns. */
export const Dial: React.FC<{ x: number; y: number; p: number; s?: number; z?: number;
  from?: string; to?: string }> =
  ({ x, y, p, s = 1, z = 84, from = "400", to = "600" }) => {
  const R = 46, ang = -128 + p * 100;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
      <svg width={R * 2 + 16} height={R * 2 + 16} viewBox={`0 0 ${R * 2 + 16} ${R * 2 + 16}`}
        style={{ display: "block", filter: "drop-shadow(0 5px 9px rgba(0,0,0,0.45))" }}>
        <circle cx={R + 8} cy={R + 8} r={R} fill={CARD} stroke="#B9AF9A" strokeWidth={4} />
        <circle cx={R + 8} cy={R + 8} r={R - 11} fill="none" stroke="#D8D0BE" strokeWidth={2} />
        {Array.from({ length: 9 }, (_, i) => {
          const a = (-128 + i * 25) * Math.PI / 180;
          const r0 = R - 6, r1 = i % 4 === 0 ? R - 17 : R - 12;
          return <line key={i}
            x1={R + 8 + Math.cos(a) * r0} y1={R + 8 + Math.sin(a) * r0}
            x2={R + 8 + Math.cos(a) * r1} y2={R + 8 + Math.sin(a) * r1}
            stroke="#8A7F68" strokeWidth={i % 4 === 0 ? 4 : 2.5} />;
        })}
        <g transform={`rotate(${ang} ${R + 8} ${R + 8})`}>
          <path d={`M ${R + 8} ${R + 8} L ${R + 8 + R - 14} ${R + 3} L ${R + 8 + R - 14} ${R + 13} Z`}
            fill={CLAY} />
        </g>
        <circle cx={R + 8} cy={R + 8} r={9} fill="#3A342A" />
        <text x={R + 8} y={R + 8 + 34} textAnchor="middle" fill="#241F17"
          fontFamily={MONO} fontWeight={900} fontSize={22}>{p > 0.5 ? to : from}</text>
      </svg>
    </div>
  );
};

/** the two guide rails that squeeze the content column to --apple-content-max-width */
export const GuideRails: React.FC<{ x: number; y: number; w: number; h: number;
  p: number; z?: number; read?: string; c?: string }> =
  ({ x, y, w, h, p, z = 82, read, c = CLAY }) => {
  const inset = p * (w * 0.065);
  return (<>
    {[0, 1].map((i) => (
      <div key={i} style={{ position: "absolute", zIndex: z,
        left: i === 0 ? x + inset : x + w - inset - 4, top: y, width: 4, height: h,
        background: c, boxShadow: SH }}>
        <div style={{ position: "absolute", left: -7, top: -8, width: 18, height: 12,
          background: c, borderRadius: 2 }} />
        <div style={{ position: "absolute", left: -7, bottom: -8, width: 18, height: 12,
          background: c, borderRadius: 2 }} />
      </div>
    ))}
    {read && (
      <div style={{ position: "absolute", left: x + w / 2 - 62, top: y + h + 10, zIndex: z + 1,
        background: INK, color: "#F6F2E8", fontFamily: MONO, fontWeight: 900, fontSize: 24,
        padding: "5px 12px", borderRadius: 7, boxShadow: SH, textAlign: "center",
        minWidth: 124, boxSizing: "border-box" }}>{read}</div>
    )}
  </>);
};

/** the easel the board stands on. Silhouette: an A-frame with a ledge. */
export const Easel: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  c?: string }> = ({ x, y, w, h, z = 44, c = OAK }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      <path d={`M ${w * 0.30} 0 L ${w * 0.10} ${h} L ${w * 0.20} ${h} L ${w * 0.38} 0 Z`}
        fill={c} stroke={OAKD} strokeWidth={2} />
      <path d={`M ${w * 0.70} 0 L ${w * 0.90} ${h} L ${w * 0.80} ${h} L ${w * 0.62} 0 Z`}
        fill={OAKD} stroke={OAKD} strokeWidth={2} />
      <rect x={w * 0.16} y={h * 0.52} width={w * 0.68} height={9} fill={OAKL} stroke={OAKD} strokeWidth={2} />
      <rect x={w * 0.06} y={-14} width={w * 0.88} height={16} rx={3} fill={OAKL} stroke={OAKD} strokeWidth={2.5} />
    </svg>
  </div>
);

/* =========================================================================
   THE FURNITURE — manufactured faces, so divs are the honest way to build them
   ====================================================================== */

/** the white gallery plinth the skill card stands on.
    ⛔ v1 WAS A FLAT GREY SLAB and it read as a blank sheet of paper standing on
       the floor, not as a pedestal — the card above it looked like a second,
       unrelated object. A box only reads as a box when you can see its TOP.
       The camera sits above the plinth top, so the top face is drawn as a real
       trapezoid in perspective, lighter than the front, with the front face
       taking the key from the left and the right cheek in shade. */
export const Plinth: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  face?: string; mark?: boolean; depth?: number }> =
  ({ x, y, w, h, z = 40, face = "#EFECE4", mark = false, depth = 30 }) => {
  const inset = w * 0.075;             /* the back edge is narrower = perspective */
  return (<>
    {/* THE TOP FACE — the thing that makes it a plinth and not a sheet */}
    <div style={{ position: "absolute", left: x, top: y - depth, width: w, height: depth + 2,
      zIndex: z + 1, background: mxh(face, 0.34),
      clipPath: `polygon(${inset}px 0, ${w - inset}px 0, 100% 100%, 0 100%)` }} />
    {/* the lit front face */}
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: `linear-gradient(178deg, ${face} 0%, ${dkh(face, 0.18)} 100%)`,
      boxShadow: SH_D }}>
      {/* the key edge, from the left — one light direction */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: w * 0.06,
        background: mxh(face, 0.22) }} />
      {/* the shadowed right cheek */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: w * 0.19,
        background: dkh(face, 0.21) }} />
      {/* the reveal line under the top, so the two faces read as two planes */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 3,
        background: dkh(face, 0.30) }} />
      {mark && (
        <div style={{ position: "absolute", left: 0, right: 0, top: h * 0.26,
          display: "flex", justifyContent: "center" }}>
          <Img src={staticFile("claude_logo.png")}
            style={{ width: Math.min(78, w * 0.30), height: Math.min(78, w * 0.30),
              objectFit: "contain", opacity: 0.26 }} />
        </div>
      )}
    </div>
  </>);
};

/** a tag's leader line — ⛔ PROXIMITY IS NOT CONNECTION. A tag in the margin
    means nothing until a line ties it to the pixel it is about. */
export const Leader: React.FC<{ x1: number; y1: number; x2: number; y2: number;
  z?: number; c?: string; o?: number }> =
  ({ x1, y1, x2, y2, z = 79, c = "#F26B5E", o = 1 }) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  return (<>
    <div style={{ position: "absolute", left: x1, top: y1 - 1.5, width: len, height: 3,
      background: c, opacity: o * 0.9, zIndex: z,
      transform: `rotate(${ang}deg)`, transformOrigin: "0% 50%" }} />
    <div style={{ position: "absolute", left: x2 - 6, top: y2 - 6, width: 12, height: 12,
      borderRadius: 12, background: c, opacity: o, zIndex: z + 1 }} />
  </>);
};

/** the intake console: a card slot with light coming UP out of it */
export const Console: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  open?: number; c?: string; f?: number; line?: string }> =
  ({ x, y, w, h, z = 46, open = 1, c = "#2C3E45", f = 0, line }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    background: `linear-gradient(176deg, ${mxh(c, 0.16)} 0%, ${c} 60%, ${dkh(c, 0.30)} 100%)`,
    borderRadius: 12, boxShadow: SH_D, overflow: "hidden" }}>
    {/* the slot mouth */}
    <div style={{ position: "absolute", left: w * 0.16, top: h * 0.22, width: w * 0.68,
      height: 26, borderRadius: 5, background: "#0C1418",
      border: `3px solid ${dkh(c, 0.42)}` }} />
    {/* the light coming up out of it */}
    <div style={{ position: "absolute", left: w * 0.16, top: h * 0.22 - 3, width: w * 0.68,
      height: 10, background: "#6FC3C8", opacity: 0.30 + open * 0.55 }} />
    {/* the console face line */}
    {line && (
      <div style={{ position: "absolute", left: w * 0.16, top: h * 0.52,
        fontFamily: MONO, fontWeight: 800, fontSize: 26, color: "#BFE7E9",
        letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
        {line}<span style={{ opacity: Math.sin(f / 5) > 0 ? 1 : 0 }}>_</span>
      </div>
    )}
    {/* the housing's lit lip */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 5,
      background: mxh(c, 0.34) }} />
  </div>
);

/** a monitor. Used turned-away in S1 and as the DevTools pair in S7. */
export const Screen: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  children?: React.ReactNode; c?: string; rot?: number; off?: boolean }> =
  ({ x, y, w, h, z = 46, children, c = "#12171C", rot = 0, off = false }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
    <div style={{ width: w, height: h, background: "#2A3138", borderRadius: 9,
      padding: 8, boxSizing: "border-box", boxShadow: SH_D }}>
      <div style={{ width: "100%", height: "100%", background: off ? "#191E23" : c,
        borderRadius: 4, position: "relative", overflow: "hidden" }}>{children}</div>
    </div>
    {/* the stand */}
    <div style={{ width: w * 0.16, height: 22, background: "#343B42", margin: "0 auto" }} />
    <div style={{ width: w * 0.44, height: 9, borderRadius: 4, background: "#3E464E",
      margin: "0 auto" }} />
  </div>
);

/* =========================================================================
   THE SIX BUILT SITES — the S3 rack.

   ⛔⛔ v1 OF THIS SCENE WAS SIX BLANK GREY RECTANGLES. Alex: *"all of those
      sheets at 7 seconds are blank, needs to be fixed and replaced with
      actually detailed and designed ones that are interesting."* He was right,
      and the reason it happened is worth keeping: the LOGIC said "blank" (the
      VO is "most people use this to BUILD A NEW website", and blank = starting
      from scratch), so I drew blank. But a blank rectangle is not a picture of
      starting from scratch — it is just an absence, and an absence cannot be
      interesting. The scene means the same thing, and reads infinitely better,
      if the rack is full of sites people have JUST BUILT.
   ⭐ SIX GENUINELY DIFFERENT LAYOUTS, not one layout in six colours: a hero
      landing, a pricing table, a product page, an editorial spread, a gallery
      grid and a feature list. Each takes a different REAL Apple accent token
      (--apple-link-blue #0066CC, --apple-accent-green #2D8C3C,
      --apple-accent-orange #E85D04, --apple-accent-red #E30000), so even the
      colour variety is sourced rather than invented.
   ====================================================================== */
const ACCENTS = ["#0066CC", "#2D8C3C", "#E85D04", "#0066CC", "#E30000", "#2D8C3C"];

export const SitePreview: React.FC<{ x: number; y: number; w: number; h: number;
  kind: number; z?: number; dim?: number; f?: number }> =
  ({ x, y, w, h, kind, z = 40, dim = 0, f = 0 }) => {
  const D = (c: string) => (dim > 0 ? dkh(c, dim) : c);
  const k = kind % 6;
  const ac = D(ACCENTS[k]);
  const u = w / 100;                       /* one layout unit = 1% of the width */
  const bar = (bw: string, bh: number, c: string, mt = 0, mx?: string) => (
    <div style={{ width: bw, height: bh * u, background: D(c), borderRadius: 1 * u,
      marginTop: mt * u, marginLeft: mx }} />
  );
  const PAD = 6 * u;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      background: D(A_ELEV), borderRadius: 2 * u, overflow: "hidden",
      border: `${1.2 * u}px solid ${D("#A9A196")}`, boxShadow: SH }}>
      {/* ⭐ THE PAGE IS ALIVE: its content drifts a couple of px on a long
          period and its accent element breathes. Both are under the ceiling
          (≤3px, ≤0.06 opacity) so the rack reads as four running sites
          rather than four screenshots, without any of them asking for rank. */}
      <Sheen f={f} phase={kind} z={9} o={0.05} />
      {/* every one of them has the same chrome — that is the point of a system */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 7 * u,
        background: D(A_DARK), display: "flex", alignItems: "center",
        paddingLeft: 3 * u, gap: 2 * u }}>
        <div style={{ width: 2.6 * u, height: 2.6 * u, borderRadius: 3 * u,
          background: D("#D8D4CE") }} />
        {[5, 4, 5].map((n, i) => (
          <div key={i} style={{ width: n * u, height: 1.4 * u, borderRadius: u,
            background: D("#8E8A84") }} />
        ))}
      </div>
      <div style={{ position: "absolute", left: PAD, right: PAD, top: 11 * u,
        transform: `translateY(${Math.sin(f / 67 + k * 2.1) * 2.2}px)` }}>
        {/* 0 · HERO LANDING — dark full-bleed hero, then three cards */}
        {k === 0 && (<>
          <div style={{ width: "100%", height: 26 * u, background: D(A_DARK),
            borderRadius: 1.5 * u, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", gap: 1.6 * u }}>
            {bar("62%", 3.4, "#F2F2F4")}
            {bar("40%", 1.8, "#9A9AA0")}
            <div style={{ width: "24%", height: 4 * u, background: ac,
              borderRadius: 2 * u, marginTop: 1.4 * u }} />
          </div>
          <div style={{ display: "flex", gap: 2.4 * u, marginTop: 5 * u }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ flex: 1, height: 20 * u, background: D(A_GRAY),
                borderRadius: 1.5 * u, padding: 2 * u, boxSizing: "border-box" }}>
                <div style={{ width: "100%", height: 8 * u, background: D("#D2D2D6"),
                  borderRadius: u }} />
                {bar("80%", 1.4, A_SEC, 2)}
                {bar("58%", 1.4, A_SEC, 1.2)}
              </div>
            ))}
          </div>
        </>)}
        {/* 1 · PRICING — three columns, the middle one raised and accented */}
        {k === 1 && (<>
          {bar("54%", 3, A_DARK, 0, "auto")}
          <div style={{ display: "flex", gap: 2.2 * u, marginTop: 5 * u,
            alignItems: "flex-start" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ flex: 1, height: (i === 1 ? 40 : 34) * u,
                marginTop: i === 1 ? 0 : 3 * u,
                background: i === 1 ? D(A_DARK) : D(A_GRAY),
                border: i === 1 ? `${1.4 * u}px solid ${ac}` : "none",
                borderRadius: 1.6 * u, padding: 2.2 * u, boxSizing: "border-box" }}>
                <div style={{ width: "60%", height: 5 * u, borderRadius: u,
                  background: i === 1 ? ac : D(A_DARK) }} />
                {[0, 1, 2, 3].map((r) => (
                  <div key={r} style={{ width: r === 3 ? "50%" : "84%", height: 1.3 * u,
                    marginTop: 2.2 * u, borderRadius: u,
                    background: i === 1 ? "#7A7A80" : D(A_SEC) }} />
                ))}
              </div>
            ))}
          </div>
        </>)}
        {/* 2 · PRODUCT — one big object, centred, with spec rows under it */}
        {k === 2 && (<>
          <div style={{ width: "100%", height: 30 * u, background: D(A_GRAY),
            borderRadius: 1.5 * u, display: "flex", alignItems: "center",
            justifyContent: "center" }}>
            <div style={{ width: "44%", height: 20 * u, borderRadius: 3 * u,
              background: ac }} />
          </div>
          {bar("58%", 3, A_DARK, 4, "auto")}
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ display: "flex", gap: 2 * u, marginTop: 2.4 * u }}>
              {bar("32%", 1.5, A_SEC)}
              <div style={{ flex: 1 }} />
              {bar("22%", 1.5, A_DARK)}
            </div>
          ))}
        </>)}
        {/* 3 · EDITORIAL — a big headline and two text columns */}
        {k === 3 && (<>
          {bar("92%", 4.2, A_DARK)}
          {bar("64%", 4.2, A_DARK, 1.8)}
          <div style={{ width: "16%", height: 1.6 * u, background: ac,
            marginTop: 3 * u }} />
          <div style={{ display: "flex", gap: 3.4 * u, marginTop: 4 * u }}>
            {[0, 1].map((c) => (
              <div key={c} style={{ flex: 1 }}>
                {[0, 1, 2, 3, 4, 5].map((r) => (
                  <div key={r} style={{ width: r === 5 ? "62%" : "100%", height: 1.4 * u,
                    marginTop: r ? 1.8 * u : 0, borderRadius: u, background: D(A_SEC) }} />
                ))}
              </div>
            ))}
          </div>
        </>)}
        {/* 4 · GALLERY — a 3x2 grid, one tile accented */}
        {k === 4 && (<>
          {bar("46%", 3, A_DARK)}
          {[0, 1].map((row) => (
            <div key={row} style={{ display: "flex", gap: 2 * u, marginTop: 3 * u }}>
              {[0, 1, 2].map((c) => (
                <div key={c} style={{ flex: 1, height: 17 * u, borderRadius: 1.4 * u,
                  background: row === 0 && c === 1 ? ac : D(A_GRAY) }} />
              ))}
            </div>
          ))}
          {bar("70%", 1.5, A_SEC, 3)}
        </>)}
        {/* 5 · FEATURE LIST — alternating rows, image one side, copy the other */}
        {k === 5 && (<>
          {bar("50%", 3, A_DARK, 0, "auto")}
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ display: "flex", gap: 2.4 * u, marginTop: 3.4 * u,
              flexDirection: r % 2 ? "row-reverse" : "row", alignItems: "center" }}>
              <div style={{ width: "38%", height: 13 * u, borderRadius: 1.4 * u,
                background: r === 1 ? ac : D(A_GRAY) }} />
              <div style={{ flex: 1 }}>
                {bar("86%", 1.8, A_DARK)}
                {bar("64%", 1.3, A_SEC, 1.6)}
                {bar("48%", 1.3, A_SEC, 1.2)}
              </div>
            </div>
          ))}
        </>)}
      </div>
    </div>
  );
};

/** a small costumed Claude — the person who built that site. Six costumes, so
    the rack reads as six different PEOPLE shipping six different sites, which
    is what "most people use this to build a new website" actually looks like. */
export const Builder: React.FC<{ x: number; base: number; s?: number; z?: number;
  f: number; kind: number }> = ({ x, base, s = 1, z = 70, f, kind }) => {
  const SZ = 240 * s;
  const k = kind % 6;
  const cos = [
    { constr: 1 }, { suit: 1 }, { chef: 1 }, { prof: 1 }, { wizard: 1 }, { beard: 1 },
  ][k] as any;
  return (<>
    <Contact x={x - SZ * 0.34} y={base - 6 * s} w={SZ * 0.68} z={z - 2} o={0.34} />
    <div style={{ position: "absolute", left: x - SZ / 2, top: base - SZ, zIndex: z }}>
      <Mascot lf={f + k * 13} size={SZ} gaze={0.4} cheer={0.45}
        nodAmp={2.6} nodSpeed={9 + k} {...cos} />
    </div>
  </>);
};

/** a small blank board for the S3 rack — the "build a new site" production line */
export const BlankBoard: React.FC<{ x: number; y: number; w: number; h: number;
  z?: number; up?: number; dim?: number }> =
  ({ x, y, w, h, z = 40, up = 1, dim = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y + h * (1 - up) * 0.5, width: w,
    height: h * up, zIndex: z, background: dkh("#E8E4DA", dim), borderRadius: 3,
    border: `2px solid ${dkh("#A9A196", dim)}`, boxShadow: SH, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h * 0.10,
      background: dkh("#C9C4B8", dim) }} />
  </div>
);

/** an engraved rule plate that SEATS into the bench rack with a hard stop */
export const RulePlate: React.FC<{ x: number; y: number; nm: string; vl: string;
  s?: number; z?: number; seat?: number; hot?: boolean; swatch?: string }> =
  ({ x, y, nm, vl, s = 1, z = 60, seat = 1, hot = false, swatch }) => (
  <div style={{ position: "absolute", left: x, top: y - (1 - seat) * 74 * s, zIndex: z,
    width: 372 * s, opacity: seat > 0.02 ? 1 : 0,
    background: hot ? "#E4D9BE" : "#CFC4A9", borderRadius: 6 * s,
    border: `${3 * s}px solid ${hot ? "#A3906B" : "#9E947C"}`, boxShadow: SH_D,
    padding: `${9 * s}px ${13 * s}px`, display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 10 * s }}>
    <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 19 * s, color: "#6B5F46",
      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      minWidth: 0 }}>{shortTok(nm)}</span>
    <span style={{ display: "flex", alignItems: "center", gap: 8 * s }}>
      <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 28 * s, color: "#241F17",
        whiteSpace: "nowrap" }}>{vl}</span>
      {swatch && <span style={{ width: 26 * s, height: 26 * s, borderRadius: 5 * s,
        background: swatch, border: `${2 * s}px solid #8E856E` }} />}
    </span>
  </div>
);

/** the counter that ticks 01 -> 14 as the tags land. It MOVES to its value. */
export const FlagCount: React.FC<{ x: number; y: number; n: number; total?: number;
  s?: number; z?: number }> = ({ x, y, n, total = 14, s = 1, z = 88 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "0% 0%",
    background: INK, borderRadius: 10, padding: "9px 15px", boxShadow: SH_D,
    display: "flex", alignItems: "baseline", gap: 9 }}>
    <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 44, color: "#F0574B",
      lineHeight: 1 }}>{String(Math.max(0, Math.round(n))).padStart(2, "0")}</span>
    <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 19, color: "#9C968C",
      letterSpacing: "0.10em" }}>FLAGGED</span>
  </div>
);

/** the sweeping measure line the audit runs down the board */
export const Sweep: React.FC<{ x: number; y: number; w: number; z?: number; c?: string;
  o?: number }> = ({ x, y, w, z = 78, c = "#F26B5E", o = 1 }) => (<>
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 4,
      background: c, opacity: o, zIndex: z }} />
    <div style={{ position: "absolute", left: x - 13, top: y - 8, width: 13, height: 20,
      background: c, opacity: o, zIndex: z, clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
    <div style={{ position: "absolute", left: x + w, top: y - 8, width: 13, height: 20,
      background: c, opacity: o, zIndex: z, clipPath: "polygon(100% 0, 0 50%, 100% 100%)" }} />
  </>);

/* =========================================================================
   THE INSPECTOR — the clay house Mascot, grounded, in the glasses costume.
   ⛔ He is the SCALE REFERENCE ([[feedback_real_marks_are_the_props]]): without
      him a board is just a rectangle and the viewer cannot tell if it is a
      postcard or a billboard. He is in every scene for that reason.
   ⛔ Door-height sizing, and the contact shadow is WIDER than he is or it does
      not read ([[reel-sprite-grounding-law]]).
   ====================================================================== */
export const Insp: React.FC<{ x: number; base: number; s?: number; z?: number; f: number;
  cheer?: number; shock?: number; stern?: number; gaze?: number; carry?: number;
  reach?: number; slump?: number }> =
  ({ x, base, s = 1, z = 70, f, cheer = 0, shock = 0, stern = 0, gaze = 0,
     carry = 0, reach = 0, slump = 0 }) => {
  const SZ = 240 * s;
  return (<>
    <Contact x={x - SZ * 0.34} y={base - 8 * s} w={SZ * 0.68} z={z - 2} o={0.38} />
    <div style={{ position: "absolute", left: x - SZ / 2, top: base - SZ + slump * 18 * s,
      zIndex: z, transform: slump ? `rotate(${slump * 4}deg)` : undefined,
      transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={SZ} glasses={1} gaze={gaze} cheer={cheer} shock={shock}
        stern={stern} nodAmp={stern ? 1.6 : slump ? 1.2 : 3.0} nodSpeed={11} />
    </div>
    {/* ⛔ PROXIMITY IS NOT CONNECTION — when he holds or points at something the
        arm gets DRAWN, or the object reads as floating beside him. */}
    {(carry > 0 || reach > 0) && (
      <div style={{ position: "absolute", left: x + SZ * 0.28,
        top: base - SZ * (reach ? 0.70 : 0.58),
        width: SZ * (reach ? 0.42 : 0.30), height: SZ * 0.10, borderRadius: SZ * 0.05,
        background: "#D97757", zIndex: z + 1, boxShadow: SH,
        transform: reach ? `rotate(${-16 * reach}deg)` : undefined,
        transformOrigin: "0% 50%" }} />
    )}
  </>);
};

/** the discard pile in S7 — screenshots thrown away, the fastest gesture in the
    reel. ⛔ v1 just STACKED them as `n` grew and the scene measured 4.96 motion
    against a bar of 9: a card appearing in place is a few hundred px² of
    change, and the dead-air metric cannot see it ([[reel-dead-air-motion-audit]]
    — a mover needs ≥40,000px² travelling ≥6px/frame). Each sheet now FLIES the
    full width of the desk from the screen it was measured on, so the same beat
    carries a 9,000px² object across ~300px in 8 frames. */
export const Discard: React.FC<{ x: number; y: number; n: number; z?: number; s?: number;
  fromX?: number; fromY?: number }> =
  ({ x, y, n, z = 58, s = 1, fromX = 0, fromY = 0 }) => {
  const whole = Math.floor(n);
  const frac = n - whole;                 /* the sheet currently in flight */
  const item = (i: number, fly: number) => {
    const jx = (rnd(i, 61) - 0.5) * 44 * s;
    const tx = x + jx, ty = y - i * 7 * s;
    /* fly 1 -> just left the screen, fly 0 -> landed */
    const px = tx + (fromX - tx) * fly;
    const py = ty + (fromY - ty) * fly;
    return (
      <div key={"dc" + i} style={{ position: "absolute", left: px, top: py,
        width: 116 * s, height: 78 * s, zIndex: z + i,
        transform: `rotate(${(rnd(i, 62) - 0.5) * 22 + fly * 46}deg) scale(${1 - fly * 0.22})`,
        background: i % 2 ? "#D8D3C8" : "#E4DFD4", borderRadius: 3,
        border: "2px solid #A9A196", boxShadow: SH }}>
        <div style={{ position: "absolute", left: 8 * s, top: 8 * s, right: 8 * s,
          height: 9 * s, background: "#B4AEA2" }} />
        <div style={{ position: "absolute", left: 8 * s, top: 24 * s, width: "50%",
          height: 6 * s, background: "#C2BCB0" }} />
      </div>
    );
  };
  return (<>
    {Array.from({ length: Math.max(0, whole) }, (_, i) => item(i, 0))}
    {n > 0 && frac > 0.02 && item(whole, 1 - frac)}
  </>);
};
