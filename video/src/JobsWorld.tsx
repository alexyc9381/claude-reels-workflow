import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";

/* =========================================================================
   REEL 92 "JOBS" · THE DARK-INTERIOR KIT.

   ⛔ THIS FILE EXISTS BECAUSE ROUND 1 USED THE WRONG WORLD ENGINE. I built the
      first cut on reel 91's `Site`: bright pastel DAYLIGHT EXTERIORS, flat
      colour bands, about eight objects a scene. Alex's note was that it was
      "nowhere near" reel 58 CALLBACK. He is right, and the difference is not
      polish, it is construction. Measured off CALLBACK's own frames:

        · every set is a DARK INTERIOR — a tiled wall with seams and rivets, a
          floor plane in perspective, a vignette. Nothing is lit by "daylight".
        · there is always a PRACTICAL LIGHT with a VISIBLE CONE, and usually a
          second warm source (furnace, sconce) doing the colour.
        · the hero is a BUILT MACHINE or a REAL DOCUMENT: bevels, rivets, panel
          lines, gradients, specular streaks. Never a flat rectangle.
        · one or two DARK GLASS READOUTS float top-right with a mono label, a
          status dot, a big number and a bar.
        · a BOTTOM HUD STRIP carries the state, and a wide-tracked mono line
          names the beat.
        · the TITLE IS DISPLAY TYPE SET INTO THE PANEL, white + clay, with a
          shadow. It is NOT the white `SectionHeader` pill, which is what round
          one used and which reads like a UI label sitting on top of a picture.

   Everything below is that vocabulary. Scene bodies compose it; they do not
   invent new chrome.
   ========================================================================= */

export const W = 1012, H = 792;

/* ---------------------------------------------------------------------------
   THE ROOMS. Ten interiors, each its own colour, and no two neighbours in the
   cut within 25 luma of each other. Matte paints and dark shadows: the light
   comes from lamps drawn IN the scene, never from a glow filter on a prop.
   ------------------------------------------------------------------------ */
export type Room = "hall" | "shop" | "vault" | "control" | "bay" | "back"
                 | "records" | "office" | "table" | "study";

type Pal = {
  wall: string; wall2: string; seam: string; rivet: string;
  floor: string; floor2: string; lip: string; hz: number; key: string;
};
export const ROOM: Record<Room, Pal> = {
  /* navy sorting hall — the open. Cold, industrial, the villain's own room. */
  hall:    { wall: "#1B2740", wall2: "#0E1727", seam: "#243350", rivet: "#33456A",
             floor: "#1A2438", floor2: "#131B2B", lip: "#2B3A58", hz: 470, key: "#8FB4E8" },
  /* amber workshop — where one person did it all by hand */
  shop:    { wall: "#3A2617", wall2: "#20140C", seam: "#4A321E", rivet: "#6B4A2B",
             floor: "#33220F", floor2: "#1E1409", lip: "#4A3319", hz: 486, key: "#F0B45E" },
  /* deep green archive — the repo, and everyone who took it */
  vault:   { wall: "#12301F", wall2: "#081A11", seam: "#1B4029", rivet: "#2A5C3C",
             floor: "#0F2A1B", floor2: "#071510", lip: "#1C4429", hz: 476, key: "#6FD79A" },
  /* plum control room — the four things, announced */
  control: { wall: "#2C1B33", wall2: "#170D1C", seam: "#3B2645", rivet: "#573465",
             floor: "#251629", floor2: "#140C17", lip: "#3A2342", hz: 480, key: "#D79BE8" },
  /* teal scanning bay — the read */
  bay:     { wall: "#123033", wall2: "#08191C", seam: "#1B4247", rivet: "#276169",
             floor: "#0F2A2D", floor2: "#07171A", lip: "#1B4247", hz: 474, key: "#6FD3D7" },
  /* oxblood back room — the fake listing, and what is behind it */
  back:    { wall: "#3A1719", wall2: "#1E0B0D", seam: "#4E1E22", rivet: "#6E2C31",
             floor: "#331416", floor2: "#1B0A0C", lip: "#4A1D21", hz: 482, key: "#F08A7E" },
  /* cold slate records room — reposted, forever */
  records: { wall: "#232830", wall2: "#12161C", seam: "#2F3540", rivet: "#454D5A",
             floor: "#1E232A", floor2: "#101419", lip: "#2E343E", hz: 478, key: "#AEB8C6" },
  /* warm gold corridor — the human, and the door that opens */
  office:  { wall: "#33261A", wall2: "#1A130C", seam: "#453324", rivet: "#63482F",
             floor: "#2C2115", floor2: "#17110A", lip: "#42311F", hz: 488, key: "#F3CE79" },
  /* midnight negotiation table — the offer */
  table:   { wall: "#141E33", wall2: "#070D1A", seam: "#1E2B47", rivet: "#2E3F63",
             floor: "#111A2B", floor2: "#070C16", lip: "#1D2A44", hz: 470, key: "#8FA8E8" },
  /* sepia study — the contract, clause by clause */
  study:   { wall: "#332A1C", wall2: "#1A150D", seam: "#453A26", rivet: "#63532F",
             floor: "#2B2417", floor2: "#16120B", lip: "#3F3521", hz: 486, key: "#E8C97F" },
};

const g = (a: string, b: string, deg = 176) => `linear-gradient(${deg}deg, ${a} 0%, ${b} 100%)`;
export const hexa = (h: string, a: number) => {
  const n = parseInt(h.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** slow-drifting dust in the beam — the room's own idle motion */
export const Motes: React.FC<{ f: number; c: string; n?: number; z?: number }> =
  ({ f, c, n = 22, z = 30 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 37.1 + k * 11.3) * 4371.7; return v - Math.floor(v); };
    const drift = (f * (0.22 + r(3) * 0.3) + r(1) * 700) % 720;
    return (
      <div key={`d${i}`} style={{ position: "absolute", left: 40 + r(1) * 930,
        top: 100 + ((drift + Math.sin(f / 31 + i) * 16) % 620), width: 3 + (i % 2),
        height: 3 + (i % 2), borderRadius: 999, background: c,
        opacity: 0.18 + r(2) * 0.32, zIndex: z }} />
    );
  })}
</>);

/** The set: back wall with tile seams and rivets, a horizon rail, a floor plane
    in perspective, a skirting shadow, and a vignette. Five layers before a
    single prop lands, which is the density floor CALLBACK never drops below. */
export const Set: React.FC<{ k: Room; children?: React.ReactNode; dust?: boolean; f?: number }> =
  ({ k, children, dust, f = 0 }) => {
  const p = ROOM[k];
  return (<>
    <div style={{ position: "absolute", inset: 0, background: g(p.wall, p.wall2), zIndex: 1 }} />
    {/* vertical tile seams */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={`v${i}`} style={{ position: "absolute", left: 8 + i * 124, top: 0, width: 2,
        height: p.hz, background: p.seam, opacity: 0.75, zIndex: 2 }} />
    ))}
    {/* horizontal courses */}
    {Array.from({ length: 4 }, (_, i) => (
      <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 62 + i * 118,
        height: 2, background: p.seam, opacity: 0.55, zIndex: 2 }} />
    ))}
    {/* rivets along the top course */}
    {Array.from({ length: 12 }, (_, i) => (
      <div key={`r${i}`} style={{ position: "absolute", left: 44 + i * 84, top: 176, width: 7,
        height: 7, borderRadius: 999, background: p.rivet, zIndex: 3 }} />
    ))}
    {/* the horizon rail — a lit lip where wall meets floor */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 8, height: 9,
      background: p.lip, zIndex: 4, boxShadow: `0 2px 10px ${hexa("#000000", 0.5)}` }} />
    {/* the floor, receding */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
      background: g(p.floor, p.floor2, 184), zIndex: 4 }} />
    {/* floor boards in perspective */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={`f${i}`} style={{ position: "absolute", left: 0, right: 0,
        top: p.hz + 22 + i * (30 + i * 9), height: 2, background: p.lip, opacity: 0.4, zIndex: 5 }} />
    ))}
    {/* converging seams, so the floor has a vanishing point */}
    {Array.from({ length: 5 }, (_, i) => {
      const x = 120 + i * 200;
      return (
        <div key={`c${i}`} style={{ position: "absolute", left: x, top: p.hz, width: 2,
          height: H - p.hz, background: p.lip, opacity: 0.28, zIndex: 5,
          transform: `skewX(${(x - 506) / 34}deg)`, transformOrigin: "50% 0%" }} />
      );
    })}
    {/* ⛔ THE MOTES DRIFT. Static motes are just noise; drifting ones are the
        only thing moving in a room between two scripted events. */}
    {dust && <Motes f={f} c={p.key} />}
    {children}
    {/* vignette, last, over everything */}
    <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
      background: `radial-gradient(120% 90% at 50% 42%, transparent 42%, ${hexa("#000000", 0.55)} 100%)` }} />
  </>);
};

/* ---------------------------------------------------------------------------
   PRACTICAL LIGHTS. A cone you can SEE is what makes a dark room read as lit
   rather than as a dark rectangle.
   ------------------------------------------------------------------------ */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number; sway?: number }> =
  ({ x, y, top = 70, bot = 300, len = 420, c = "#F6DDA6", o = 0.3, z = 20, f = 0, sway = 1 }) => (
  <div style={{ position: "absolute", left: x - bot / 2 + Math.sin(f / 47) * 9 * sway,
    top: y, width: bot, height: len, zIndex: z,
    transform: `rotate(${Math.sin(f / 47) * 0.9 * sway}deg)`, transformOrigin: "50% 0%",
    background: `linear-gradient(180deg, ${hexa(c, o * (0.9 + Math.sin(f / 9) * 0.07 + Math.sin(f / 3.7) * 0.04))} 0%, ${hexa(c, o * 0.12)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** a hanging pendant with a shade, bulbs and a stem */
export const Pendant: React.FC<{ x: number; y: number; c?: string; s?: number; z?: number;
  bulbs?: number; on?: number; f?: number; sway?: number }> =
  ({ x, y, c = "#F3CE79", s = 1, z = 40, bulbs = 5, on = 1, f = 0, sway = 1 }) => (
  /* it hangs, so it swings. The cord is the pivot. */
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${Math.sin(f / 47) * 1.15 * sway}deg)`,
    transformOrigin: `50% ${-120 * s}px` }}>
    <div style={{ position: "absolute", left: -3 * s, top: -120 * s, width: 6 * s, height: 122 * s,
      background: "#3A4152" }} />
    <div style={{ position: "absolute", left: -118 * s, top: 0, width: 236 * s, height: 66 * s,
      borderRadius: `${118 * s}px ${118 * s}px ${16 * s}px ${16 * s}px`,
      background: g("#C9D2DE", "#7C8798"), boxShadow: "0 10px 22px rgba(0,0,0,0.45)" }} />
    {Array.from({ length: bulbs }, (_, i) => (
      <div key={i} style={{ position: "absolute",
        left: (-88 + i * (176 / (bulbs - 1))) * s - 9 * s, top: 50 * s,
        width: 18 * s, height: 18 * s, borderRadius: 999, background: c, opacity: on,
        boxShadow: `0 0 ${16 * s}px ${hexa(c, 0.9 * on)}` }} />
    ))}
  </div>
);

/** a wall sconce, half-shell, throwing a cone down the wall */
export const Sconce: React.FC<{ x: number; y: number; c?: string; s?: number; z?: number }> =
  ({ x, y, c = "#F3CE79", s = 1, z = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: 84 * s, height: 44 * s,
      borderRadius: `${44 * s}px ${44 * s}px 0 0`, background: g("#39424F", "#242B36"),
      boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }} />
    <div style={{ position: "absolute", left: 12 * s, top: 20 * s, width: 60 * s, height: 22 * s,
      borderRadius: `${30 * s}px ${30 * s}px 0 0`, background: c,
      boxShadow: `0 0 ${20 * s}px ${hexa(c, 0.85)}` }} />
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: (10 + i * 21) * s, top: 0,
        width: 3 * s, height: 42 * s, background: "#1B212B", opacity: 0.6 }} />
    ))}
  </div>
);

/** an open furnace: the warm source that gives a dark room its colour */
export const Furnace: React.FC<{ x: number; y: number; f: number; s?: number; z?: number }> =
  ({ x, y, f, s = 1, z = 26 }) => {
  const flick = 0.86 + Math.sin(f / 5) * 0.08 + Math.sin(f / 3.1) * 0.05;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 190 * s, height: 250 * s,
        borderRadius: 12 * s, background: g("#4A3626", "#241A12"),
        boxShadow: "0 16px 30px rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", left: 26 * s, top: 34 * s, width: 138 * s, height: 176 * s,
        borderRadius: `${69 * s}px ${69 * s}px ${8 * s}px ${8 * s}px`,
        background: g("#F0A44A", "#8A2E12"), opacity: flick,
        boxShadow: `0 0 ${46 * s}px ${hexa("#F0A44A", 0.55 * flick)}` }} />
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: (40 + i * 24) * s, top: 168 * s,
          width: 18 * s, height: 14 * s, borderRadius: 4 * s, background: "#FBD892",
          opacity: 0.75 * flick }} />
      ))}
      {[[10, 10], [166, 10], [10, 226], [166, 226]].map(([bx, by], i) => (
        <div key={`b${i}`} style={{ position: "absolute", left: bx * s, top: by * s,
          width: 12 * s, height: 12 * s, borderRadius: 999, background: "#6B4A2B" }} />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   THE READOUTS. Dark glass, a bezel, a mono label with a status dot, a big
   number and a bar. CALLBACK never has a scene without one.
   ------------------------------------------------------------------------ */
export const Glass: React.FC<{ x: number; y: number; w: number; h: number; label: string;
  z?: number; c?: string; dot?: string; children?: React.ReactNode; t?: number; f?: number }> =
  ({ x, y, w, h, label, z = 70, c = "#F08A7E", dot, children, t = 1, f }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: 16, background: g("#1D2430", "#0D1219"), border: `2px solid ${hexa(c, 0.45)}`,
    boxShadow: `0 14px 30px rgba(0,0,0,0.55), inset 0 1px 0 ${hexa("#FFFFFF", 0.07)}`,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%",
    opacity: t > 0.02 ? 1 : 0, overflow: "hidden" }}>
    {/* a live panel sweeps. It is a screen, so it refreshes. */}
    {f !== undefined && (
      <div style={{ position: "absolute", left: 0, right: 0, top: ((f * 2.2) % (h + 60)) - 30,
        height: 30, zIndex: 1, pointerEvents: "none",
        background: `linear-gradient(180deg, transparent, ${hexa(c, 0.07)}, transparent)` }} />
    )}
    <div style={{ position: "absolute", left: 16, top: 13, display: "flex", alignItems: "center",
      gap: 9, zIndex: 3 }}>
      <div style={{ width: 9, height: 9, borderRadius: 999, background: dot || c }} />
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 17, letterSpacing: "0.16em",
        color: "#93A0B2", whiteSpace: "nowrap" }}>{label}</span>
    </div>
    {children}
  </div>
);

export const BigNum: React.FC<{ x: number; y: number; v: string; c?: string; size?: number;
  z?: number }> = ({ x, y, v, c = "#F08A7E", size = 76, z = 4 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, fontFamily: inter.fontFamily,
    fontWeight: 900, fontSize: size, lineHeight: 1, letterSpacing: "-0.04em", color: c,
    fontVariantNumeric: "tabular-nums", textShadow: `0 0 ${size * 0.3}px ${hexa(c, 0.45)}` }}>{v}</div>
);

export const Bar: React.FC<{ x: number; y: number; w: number; v: number; c?: string; z?: number;
  h?: number }> = ({ x, y, w, v, c = "#F08A7E", z = 4, h = 14 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 999,
    background: "#0A0E14", zIndex: z, border: "1px solid rgba(255,255,255,0.06)" }}>
    <div style={{ position: "absolute", left: 2, top: 2, height: h - 6,
      width: Math.max(0, Math.min(1, v)) * (w - 4), borderRadius: 999, background: c,
      boxShadow: `0 0 12px ${hexa(c, 0.6)}` }} />
  </div>
);

export const Pill: React.FC<{ x: number; y: number; t: string; c?: string; z?: number;
  s?: number }> = ({ x, y, t, c = "#6FD79A", z = 6, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${8 * s}px ${18 * s}px`, borderRadius: 10 * s, border: `2px solid ${c}`,
    background: hexa(c, 0.12), fontFamily: inter.fontFamily, fontWeight: 900,
    fontSize: 26 * s, color: c, whiteSpace: "nowrap" }}>{t}</div>
);

/* ---------------------------------------------------------------------------
   THE CHROME. Title as display type INSIDE the panel, the live pill, and the
   bottom strip. ⛔ No white pill header — that was round one's mistake.
   ------------------------------------------------------------------------ */
export const Title: React.FC<{ l1: string; hot: string; f: number; z?: number }> =
  ({ l1, hot, f, z = 92 }) => {
  const n = Math.max(l1.length, hot.length);
  /* ⛔ TWO THINGS THIS GOT WRONG AND CALLBACK DOES NOT.
     1. It started at y=42 and ran the full panel width, so it drove straight
        through the CLAUDE·LIVE pill. CALLBACK puts the pill FIRST and starts the
        title underneath it. `top: 78` is below the pill's 24..70 band.
     2. It auto-fit on the COMBINED length, so a long line shrank the type to 44px
        and still wrapped. Fitting on the LONGER OF THE TWO LINES keeps it big,
        which is the whole point of a display title.
     A scrim rides under it so it stays legible over any set. */
  const size = Math.round(Math.max(46, Math.min(76, (76 * 15) / Math.max(9, n))));
  /* ⛔ THE HEADER EXISTS ON FRAME 1. It used to ramp opacity over 8 frames, so
     the most valuable quarter-second in the reel opened on a header that was not
     there yet. No fade, no slide: it is simply present. */
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: 78, textAlign: "center",
      zIndex: z }}>
      <div style={{ position: "absolute", left: -40, right: -40, top: -70, height: 300, zIndex: -1,
        background: "linear-gradient(180deg, rgba(6,9,14,0.62) 0%, rgba(6,9,14,0.34) 58%, rgba(6,9,14,0) 100%)" }} />
      <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size,
        lineHeight: 1.0, letterSpacing: "-0.015em", color: "#F6F1E6",
        textShadow: "0 4px 16px rgba(0,0,0,0.85), 0 1px 0 rgba(0,0,0,0.7)" }}>
        {l1}<br /><span style={{ color: "#E8926A" }}>{hot}</span>
      </div>
    </div>
  );
};

export const LivePill: React.FC<{ f: number; z?: number }> = ({ f, z = 94 }) => {
  const blink = 0.55 + 0.45 * Math.abs(Math.sin(f / 6));
  return (
    <div style={{ position: "absolute", right: 26, top: 24, zIndex: z, display: "flex",
      alignItems: "center", gap: 9, padding: "10px 20px", borderRadius: 999,
      background: g("#1C7A50", "#125637"), border: "2px solid #6FD79A",
      boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }}>
      <span style={{ width: 11, height: 11, borderRadius: 999, background: "#B7F2D0",
        opacity: blink }} />
      <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 21,
        letterSpacing: "0.06em", color: "#E9FFF3" }}>CLAUDE · LIVE</span>
    </div>
  );
};

/** the wide-tracked mono line that names the beat, along the panel floor */
export const Slug: React.FC<{ t: string; z?: number; c?: string }> =
  ({ t, z = 92, c = "#8D97A6" }) => (<>
  {/* ⛔ A SCRIM, because the slug has to sit over whatever the set puts there.
      Without it the mono line vanished into the floor in half the scenes. */}
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96, zIndex: z - 1,
    background: "linear-gradient(0deg, rgba(6,9,14,0.72) 0%, rgba(6,9,14,0) 100%)" }} />
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", zIndex: z,
    fontFamily: MONO, fontWeight: 800, fontSize: 24, letterSpacing: "0.32em", color: c,
    textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>{t}</div>
</>);

/** the bolted display plate: the scene's one big line, two-tone */
export const Plate: React.FC<{ x: number; y: number; w: number; t: string; hot?: string;
  z?: number; size?: number; t2?: number; c?: string }> =
  ({ x, y, w, t, hot, z = 74, size = 46, t2 = 1, c = "#E8B96A" }) => {
  /* ⛔ AUTO-FIT, AND CLEAR THE BOLTS. This text is `nowrap` at a FIXED size, so
     "HEAD OF APPLIED AI" (18 chars at 40px Fraunces 900) wanted ~430px inside
     380px of usable width and bled straight out under the corner bolts. Every
     other text component got an auto-fit after the last "out of the boxes"
     note; this one was missed because it is handed an explicit `size`.
     Fraunces 900 runs ~0.55em per character, side padding is 44 each, and the
     bolts eat ~16 more, so the text may use w - 120. `size` is now a CEILING. */
  const chars = (t + (hot ? " " + hot : "")).length;
  const fit = Math.floor((w - 120) / (0.55 * Math.max(6, chars)));
  const fs = Math.max(22, Math.min(size, fit));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
      borderRadius: 14, background: g("#2A3242", "#161C26"), boxSizing: "border-box",
      border: `3px solid ${hexa(c, 0.7)}`, padding: "18px 44px",
      boxShadow: `0 16px 30px rgba(0,0,0,0.55), inset 0 1px 0 ${hexa("#FFFFFF", 0.08)}`,
      transform: `scale(${Math.max(0.02, t2)})`, transformOrigin: "50% 50%",
      opacity: t2 > 0.02 ? 1 : 0 }}>
      {[[12, 12], [-1, 12], [12, -1], [-1, -1]].map(([lx, ly], i) => (
        <div key={i} style={{ position: "absolute",
          left: lx >= 0 ? lx : undefined, right: lx < 0 ? 12 : undefined,
          top: ly >= 0 ? ly : undefined, bottom: ly < 0 ? 12 : undefined,
          width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.85 }} />
      ))}
      <div style={{ textAlign: "center", fontFamily: fraunces.fontFamily, fontWeight: 900,
        fontSize: fs, lineHeight: 1.06, color: "#F6F1E6", whiteSpace: "nowrap" }}>
        {t}{hot ? <> <span style={{ color: c }}>{hot}</span></> : null}
      </div>
    </div>
  );
};

/** a riveted machine panel — the base of every built object in the reel */
export const Panelled: React.FC<{ x: number; y: number; w: number; h: number; z?: number;
  a?: string; b?: string; r?: number; rivets?: boolean; children?: React.ReactNode }> =
  ({ x, y, w, h, z = 40, a = "#4A5468", b = "#28303F", r = 10, rivets = true, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
    borderRadius: r, background: g(a, b), boxShadow: "0 16px 30px rgba(0,0,0,0.5)" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: Math.max(4, h * 0.16),
      borderRadius: `${r}px ${r}px 0 0`, background: hexa("#FFFFFF", 0.09) }} />
    {rivets && [[9, 9], [w - 20, 9], [9, h - 20], [w - 20, h - 20]].map(([bx, by], i) => (
      <div key={i} style={{ position: "absolute", left: bx, top: by, width: 11, height: 11,
        borderRadius: 999, background: hexa("#0B0E14", 0.55),
        boxShadow: `inset 0 1px 0 ${hexa("#FFFFFF", 0.2)}` }} />
    ))}
    {children}
  </div>
);

/* ---------------------------------------------------------------------------
   THE DOCUMENT. CALLBACK's single strongest object: a real page with a name, a
   mono sub-line and actual bullet rows, where individual rows get flagged. It
   is legible at a glance and it changes state, which is why it carries scenes.
   ------------------------------------------------------------------------ */
export const Doc: React.FC<{ x: number; y: number; s?: number; z?: number; title: string;
  sub: string; rows: [string, "ok" | "bad" | "good"][]; flag?: number; rot?: number;
  t?: number }> =
  ({ x, y, s = 1, z = 60, title, sub, rows, flag = 0, rot = 0, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 340 * s, zIndex: z,
    transform: `rotate(${rot}deg) scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%",
    opacity: t > 0.02 ? 1 : 0,
    background: g("#F6F1E4", "#E3DBC9"), borderRadius: 6 * s, padding: `${20 * s}px ${20 * s}px`,
    boxShadow: "0 20px 38px rgba(0,0,0,0.55)" }}>
    <div style={{ fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 27 * s,
      color: "#20190F", letterSpacing: "0.02em" }}>{title}</div>
    <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 12.5 * s, letterSpacing: "0.14em",
      color: "#8B8271", marginTop: 3 * s, marginBottom: 10 * s,
      borderBottom: `1px solid #C9BFA9`, paddingBottom: 7 * s }}>{sub}</div>
    {rows.map(([txt, kind], i) => {
      const lit = flag > i / Math.max(1, rows.length);
      const c = kind === "bad" ? "#D0472F" : kind === "good" ? "#2E8B57" : null;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 * s,
          marginBottom: 7 * s, padding: `${5 * s}px ${8 * s}px`, borderRadius: 4 * s,
          background: c && lit ? c : "transparent" }}>
          {!(c && lit) && <div style={{ width: 6 * s, height: 6 * s, background: "#5E5646" }} />}
          <span style={{ fontFamily: inter.fontFamily, fontWeight: c && lit ? 800 : 700,
            fontSize: 16 * s, color: c && lit ? "#FFF6EE" : "#33291B", whiteSpace: "nowrap" }}>
            {txt}
          </span>
        </div>
      );
    })}
  </div>
);

/* =========================================================================
   ROUND 3 — STAGING. Alex, on round 2: "the callback one was so much more
   detailed with villains etc so interesting such good animation."

   Round 2 fixed the LIGHT and the PALETTE and it still read flatter than
   CALLBACK. Measured against CALLBACK's frames again, what was left is not
   colour, it is STAGING:

     · CALLBACK's villain is PHYSICALLY IN almost every scene — the shredder,
       the corridor, the war room, the interrogation lamp, the alley, and it is
       the OPPONENT IN THE BOXING RING. Ours appeared once and then vanished for
       six scenes, so there was nobody to root against.
     · CALLBACK stages TWO OR THREE CHARACTERS DOING SOMETHING TO EACH OTHER.
       Ours had one mascot standing politely beside a prop.
     · CALLBACK crops big shapes on the near plane (ring ropes, a conveyor, a
       desk edge) so the frame has a foreground, a middle and a back.
     · CALLBACK dresses its walls — punching bags, a clock, a valve wheel, a
       ladder, a bird. Ours had tile seams and nothing else.
     · Every subject stands in a POOL of light on the floor.

   Everything below exists to fix exactly those five things.
   ========================================================================= */

/** THE VILLAIN, PORTABLE. The APPLYVAULT head: a riveted housing, a red lens
    with a live iris, an antenna, and a jaw that can chew. It is the same object
    every time it appears, at whatever size the scene needs, so the reel has a
    face to root against instead of a brand name on a slot. */
export const Vault: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  chew?: number; dead?: boolean; angry?: number; look?: number }> =
  ({ x, y, f, s = 1, z = 50, chew = 0, dead, angry = 0, look = 0 }) => {
  const iris = dead ? 0 : 0.72 + Math.sin(f / 7) * 0.16;
  const jaw = dead ? 0 : Math.abs(Math.sin(f / 6)) * chew;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s}) rotate(${dead ? 16 : 0}deg)`, transformOrigin: "50% 100%" }}>
      {/* antenna */}
      <div style={{ position: "absolute", left: 96, top: -46, width: 6, height: 48,
        background: "#4A5468" }} />
      <div style={{ position: "absolute", left: 88, top: -60, width: 22, height: 22,
        borderRadius: 999, background: dead ? "#3A414F" : "#E0443E",
        boxShadow: dead ? undefined : "0 0 14px rgba(224,68,62,0.8)" }} />
      {/* housing */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 210, height: 150,
        borderRadius: 16, background: g("#6A748A", "#2E3646"),
        boxShadow: "0 16px 30px rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 210, height: 26,
        borderRadius: "16px 16px 0 0", background: hexa("#FFFFFF", 0.1) }} />
      {[[12, 12], [186, 12], [12, 126], [186, 126]].map(([bx, by], i) => (
        <div key={i} style={{ position: "absolute", left: bx, top: by, width: 12, height: 12,
          borderRadius: 999, background: hexa("#0B0E14", 0.6),
          boxShadow: `inset 0 1px 0 ${hexa("#FFFFFF", 0.22)}` }} />
      ))}
      {/* the lens */}
      <div style={{ position: "absolute", left: 62, top: 34, width: 86, height: 86,
        borderRadius: 999, background: dead
          ? "radial-gradient(circle at 40% 36%, #5A626F, #232934 70%)"
          : "radial-gradient(circle at 40% 36%, #FF9C8C, #8E1B12 70%)",
        boxShadow: dead ? undefined : `0 0 ${22 * iris}px rgba(224,68,62,0.75)` }} />
      <div style={{ position: "absolute", left: 90 + look * 12, top: 62, width: 28, height: 28,
        borderRadius: 999, background: "#160806" }} />
      {!dead && (
        <div style={{ position: "absolute", left: 96 + look * 12, top: 66, width: 10, height: 10,
          borderRadius: 999, background: "#FFD9CF", opacity: 0.9 }} />
      )}
      {/* the angry brow, when it is losing */}
      {angry > 0 && (
        <div style={{ position: "absolute", left: 58, top: 26, width: 96, height: 12,
          borderRadius: 3, background: "#22283245", opacity: angry,
          transform: "rotate(-9deg)", backgroundColor: "#1B2029" }} />
      )}
      {/* the jaw */}
      <div style={{ position: "absolute", left: 30, top: 138 + jaw * 16, width: 150, height: 40,
        borderRadius: "0 0 12px 12px", background: g("#4A5468", "#232A36"), overflow: "hidden" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 6 + i * 24, top: 0, width: 0, height: 0,
            borderLeft: "11px solid transparent", borderRight: "11px solid transparent",
            borderTop: "20px solid #C9D2DE" }} />
        ))}
      </div>
    </div>
  );
};

/** the pool of light a subject stands in */
export const Pool: React.FC<{ x: number; y: number; w?: number; c?: string; o?: number;
  z?: number }> = ({ x, y, w = 300, c = "#F6DDA6", o = 0.22, z = 8 }) => (
  <div style={{ position: "absolute", left: x - w / 2, top: y, width: w, height: w * 0.28,
    borderRadius: "50%", zIndex: z,
    background: `radial-gradient(ellipse at center, ${hexa(c, o)} 0%, ${hexa(c, 0)} 70%)` }} />
);

/* ---------------------------------------------------------------------------
   WALL DRESSING. Four to six props per room, in the OUTER THIRDS, behind the
   subject. This is the difference CALLBACK's gym has over a blue rectangle:
   bags, a clock, a valve, a ladder, a vent.
   ------------------------------------------------------------------------ */
type Prop = "bag" | "clock" | "valve" | "ladder" | "vent" | "pipe" | "board" | "crate" | "shelf";
export const Dress: React.FC<{ items: [Prop, number, number, number][]; c?: string; z?: number }> =
  ({ items, c = "#39424F", z = 9 }) => (<>
  {items.map(([kind, x, y, s], i) => {
    const box = (w: number, h: number, col: string, r = 4, dx = 0, dy = 0) => ({
      position: "absolute" as const, left: x + dx * s, top: y + dy * s,
      width: w * s, height: h * s, background: col, borderRadius: r * s, zIndex: z,
    });
    const dark = "#20262F";
    if (kind === "bag") return (
      <React.Fragment key={i}>
        <div style={box(6, 70, "#4E5765", 2, 26, -70)} />
        <div style={{ ...box(64, 168, "#6B3B2A", 14), boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
        <div style={box(64, 16, "#8A4E36", 6)} />
      </React.Fragment>);
    if (kind === "clock") return (
      <React.Fragment key={i}>
        <div style={{ ...box(96, 96, "#DDE4EC", 999), boxShadow: "0 8px 18px rgba(0,0,0,0.5)" }} />
        <div style={box(80, 80, "#1B2029", 999, 8, 8)} />
        <div style={box(5, 30, "#DDE4EC", 2, 45, 18)} />
        <div style={box(26, 5, "#E8926A", 2, 47, 45)} />
      </React.Fragment>);
    if (kind === "valve") return (
      <React.Fragment key={i}>
        <div style={{ ...box(74, 74, c, 999), border: `${9 * s}px solid ${dark}` }} />
        <div style={box(74, 9, dark, 2, 0, 32)} />
        <div style={box(9, 74, dark, 2, 32, 0)} />
      </React.Fragment>);
    if (kind === "ladder") return (
      <React.Fragment key={i}>
        <div style={box(9, 260, c, 2)} />
        <div style={box(9, 260, c, 2, 56, 0)} />
        {[0, 1, 2, 3, 4].map((k) => <div key={k} style={box(65, 8, c, 2, 0, 22 + k * 54)} />)}
      </React.Fragment>);
    if (kind === "vent") return (
      <React.Fragment key={i}>
        <div style={{ ...box(120, 84, dark, 6), border: `${4 * s}px solid ${c}` }} />
        {[0, 1, 2, 3].map((k) => <div key={k} style={box(100, 8, c, 2, 10, 14 + k * 18)} />)}
      </React.Fragment>);
    if (kind === "pipe") return (
      <React.Fragment key={i}>
        <div style={box(26, 300, c, 6)} />
        <div style={box(40, 20, dark, 4, -7, 60)} />
        <div style={box(40, 20, dark, 4, -7, 210)} />
      </React.Fragment>);
    if (kind === "board") return (
      <React.Fragment key={i}>
        <div style={{ ...box(150, 108, dark, 6), border: `${5 * s}px solid ${c}` }} />
        {[0, 1, 2].map((k) => (
          <div key={k} style={box(100 - k * 26, 10, c, 3, 16, 20 + k * 26)} />
        ))}
      </React.Fragment>);
    if (kind === "crate") return (
      <React.Fragment key={i}>
        <div style={{ ...box(120, 96, "#5A4630", 5), boxShadow: "0 10px 18px rgba(0,0,0,0.45)" }} />
        <div style={box(120, 12, "#3E3021", 2, 0, 42)} />
      </React.Fragment>);
    return (
      <React.Fragment key={i}>
        <div style={box(190, 12, c, 3)} />
        {[0, 1, 2, 3].map((k) => <div key={k} style={box(28, 46, dark, 3, 12 + k * 44, -46)} />)}
      </React.Fragment>);
  })}
</>);

/** THE FOREGROUND RANK: big shapes cropped by the panel edge so the frame has a
    near plane. ⛔ Outer edges only — a foreground across the middle covers the
    subject, which is the crowded-frame failure, not depth. */
export const Fore: React.FC<{ kind: "rail" | "beam" | "desk" | "rope" | "grate"; c?: string;
  z?: number }> = ({ kind, c = "#141A22", z = 88 }) => {
  if (kind === "rail") return (<>
    <div style={{ position: "absolute", left: -30, bottom: -10, width: 200, height: 300,
      background: c, borderRadius: 14, zIndex: z, transform: "rotate(6deg)" }} />
    <div style={{ position: "absolute", right: -40, bottom: -10, width: 180, height: 260,
      background: c, borderRadius: 14, zIndex: z, transform: "rotate(-7deg)" }} />
  </>);
  if (kind === "beam") return (<>
    <div style={{ position: "absolute", left: -20, top: -20, width: 120, height: 300,
      background: c, zIndex: z }} />
    <div style={{ position: "absolute", right: -20, top: -20, width: 96, height: 240,
      background: c, zIndex: z }} />
  </>);
  if (kind === "desk") return (
    <div style={{ position: "absolute", left: -40, right: -40, bottom: -30, height: 140,
      background: `linear-gradient(180deg, ${c} 0%, #05070B 100%)`, borderRadius: "18px 18px 0 0",
      zIndex: z, boxShadow: "0 -12px 26px rgba(0,0,0,0.5)" }} />
  );
  if (kind === "grate") return (<>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: -30 + i * 34, top: -20, width: 16,
        height: 240, background: c, zIndex: z }} />
    ))}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`r${i}`} style={{ position: "absolute", right: -30 + i * 34, top: -20, width: 16,
        height: 200, background: c, zIndex: z }} />
    ))}
  </>);
  /* rope */
  return (<>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "absolute", left: -30, right: -30, bottom: 96 + i * 62,
        height: 11, background: i === 1 ? "#C9D2DE" : "#A7B2C2", borderRadius: 6, zIndex: z,
        boxShadow: "0 3px 8px rgba(0,0,0,0.5)" }} />
    ))}
    <div style={{ position: "absolute", left: -34, bottom: 40, width: 40, height: 280,
      background: "#D64A3A", borderRadius: 10, zIndex: z + 1 }} />
    <div style={{ position: "absolute", right: -34, bottom: 40, width: 40, height: 280,
      background: "#D64A3A", borderRadius: 10, zIndex: z + 1 }} />
  </>);
};

/* =========================================================================
   ROUND 4 — REAL LOGOS, AND NO CAMERA MOVE.

   Alex, on round 3:
     · "try to use real logos whenever possible"
     · "each scene needs to be way more detailed and way more interesting"
     · "some of the parts have stuff thats cut off and some of the text is
        like out of the boxes"
     · "the camera keeps zooming in for not much reason which i dont like"
     · "this all needs to tell a story through the animations"

   ⛔ THE CAMERA PUSH IS OFF FOR THIS REEL. The house rule says a per-scene push
      is the highest-measuring motion lever, and it is — but it was also what
      cropped the panel edges (that is where most of the "stuff cut off" came
      from) and Alex can see it doing nothing for the story. Motion now comes
      from the ACTION: things travel, get eaten, get stamped, get struck out.
      That is the note he actually gave — "tell a story through the animations".

   ⛔ REAL LOGOS GO ON THE JOB BOARDS A POSTING CAME FROM, NEVER ON THE VILLAIN.
      APPLYVAULT is a knockoff we invented so we can show a portal eating your
      application. Putting Greenhouse or Indeed on that machine would be saying
      a real company does it. Boards label the postings; the villain stays fake.
      Sourced via Simple Icons (memory `reel-brand-logo-sourcing`); linkedin and
      workday 404 there, as that note predicts, so neither appears.
   ========================================================================= */

import { Img, staticFile } from "remotion";

/** a real brand logo on a white app-tile, so dark glyphs stay visible on a dark
    set. ⛔ Never render a brand SVG straight onto the wall: github and indeed
    are near-black and vanish. */
export const Tile: React.FC<{ x: number; y: number; logo: string; s?: number; z?: number;
  t?: number; label?: string; c?: string }> =
  ({ x, y, logo, s = 1, z = 60, t = 1, label, c = "#FFFFFF" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%",
    opacity: t > 0.02 ? 1 : 0 }}>
    <div style={{ width: 76 * s, height: 76 * s, borderRadius: 18 * s, background: c,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}>
      <Img src={staticFile(`logos/${logo}`)}
           style={{ width: 48 * s, height: 48 * s, objectFit: "contain" }} />
    </div>
    {label && (
      <div style={{ position: "absolute", left: 0, top: 84 * s, width: 76 * s, textAlign: "center",
        fontFamily: MONO, fontWeight: 800, fontSize: 13 * s, letterSpacing: "0.08em",
        color: "#9AA5B4", whiteSpace: "nowrap" }}>{label}</div>
    )}
  </div>
);

/** the boards the postings actually come from. ⛔ linkedin + workday are 404 on
    Simple Icons, so they are not in the cast. */
export const BOARDS: [string, string][] = [
  ["si_indeed.svg", "INDEED"],
  ["si_glassdoor.svg", "GLASSDOOR"],
  ["si_upwork.svg", "UPWORK"],
  ["si_greenhouse.svg", "GREENHOUSE"],
];

/** a job posting as a physical card, with the board it came from on it. This is
    the object that travels, gets scanned, gets graded and gets binned. */
export const Card: React.FC<{ x: number; y: number; s?: number; z?: number; logo: string;
  title: string; rot?: number; t?: number; dim?: boolean; stamp?: string; stampC?: string;
  stampT?: number }> =
  ({ x, y, s = 1, z = 50, logo, title, rot = 0, t = 1, dim, stamp, stampC = "#E0443E",
     stampT = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 250 * s, zIndex: z,
    transform: `rotate(${rot}deg) scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%",
    opacity: t > 0.02 ? 1 : 0 }}>
    <div style={{ width: 250 * s, height: 146 * s, borderRadius: 8 * s,
      background: dim ? "#B9AE97" : g("#F6F1E4", "#DED5C1"),
      boxShadow: "0 12px 24px rgba(0,0,0,0.5)" }}>
      <div style={{ position: "absolute", left: 12 * s, top: 12 * s, width: 46 * s, height: 46 * s,
        borderRadius: 10 * s, background: "#FFFFFF", display: "flex", alignItems: "center",
        justifyContent: "center", boxShadow: "0 3px 7px rgba(0,0,0,0.2)" }}>
        <Img src={staticFile(`logos/${logo}`)}
             style={{ width: 30 * s, height: 30 * s, objectFit: "contain" }} />
      </div>
      {/* ⛔ EXPLICIT WIDTH + NOWRAP + AUTO-FIT. "text out of the boxes" was this:
          a title with no width ran straight off the card. */}
      <div style={{ position: "absolute", left: 68 * s, top: 14 * s, width: 168 * s,
        height: 48 * s, display: "flex", alignItems: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, lineHeight: 1.06, color: "#20190F",
        fontSize: Math.max(13, Math.min(19, (19 * 15) / Math.max(10, title.length))) * s }}>
        {title}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ position: "absolute", left: 12 * s, top: (84 + i * 17) * s,
          width: (222 - i * 54) * s, height: 8 * s, borderRadius: 3 * s, background: "#C4BAA4" }} />
      ))}
    </div>
    {stamp && (
      <div style={{ position: "absolute", left: 34 * s, top: 30 * s, zIndex: 4, opacity: stampT,
        transform: `rotate(-11deg) scale(${0.7 + stampT * 0.4})`, padding: `${5 * s}px ${13 * s}px`,
        border: `${5 * s}px solid ${stampC}`, borderRadius: 5 * s, fontFamily: inter.fontFamily,
        fontWeight: 900, fontSize: 30 * s, color: stampC, whiteSpace: "nowrap",
        background: "rgba(250,246,238,0.55)" }}>{stamp}</div>
    )}
  </div>
);

/** shredded paper spraying out of the machine — the visible consequence */
export const Shred: React.FC<{ x: number; y: number; f: number; start?: number; n?: number;
  z?: number }> = ({ x, y, f, start = 0, n = 30, z = 56 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 53.7 + k * 17.9) * 4371.7; return v - Math.floor(v); };
    const life = ((f - start + i * 2) % 46) / 46;
    if (f < start) return null;
    return (
      <div key={i} style={{ position: "absolute", left: x + (r(1) - 0.5) * 300,
        top: y + life * (150 + r(2) * 120), width: 6 + r(3) * 5, height: 16 + r(1) * 14,
        background: r(2) > 0.85 ? "#D64A3A" : "#E6DFCE", zIndex: z,
        opacity: (1 - life) * 0.95, transform: `rotate(${life * 320 + r(3) * 180}deg)` }} />
    );
  })}
</>);


/** embers rising off the furnace — the workshop's own idle motion */
export const Embers: React.FC<{ x: number; y: number; f: number; n?: number; z?: number }> =
  ({ x, y, f, n = 16, z = 30 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 61.3 + k * 13.7) * 4371.7; return v - Math.floor(v); };
    const life = ((f * (0.9 + r(2) * 0.7) + r(1) * 120) % 120) / 120;
    return (
      <div key={i} style={{ position: "absolute",
        left: x + (r(1) - 0.5) * 120 + Math.sin(f / 12 + i) * 12,
        top: y - life * 300, width: 4 + (i % 3), height: 4 + (i % 3), borderRadius: 999,
        background: r(3) > 0.6 ? "#FBD892" : "#F0A44A", zIndex: z,
        opacity: (1 - life) * 0.85, boxShadow: "0 0 8px rgba(240,164,74,0.6)" }} />
    );
  })}
</>);


/* =========================================================================
   ROUND 5 — THE OPEN, AND WHAT A HEADER IS FOR.

   Alex: "The header at the very beginning should be like the payoff... the
   beginning scene needs to be more hierarchical... indirect about what this is
   going to be about... the scene at three seconds needs more animation...
   between zero and five seconds you need lots of interesting animation, opens
   curiosity loops... and the header should not repeat what is already known,
   it should be new information that adds additional value."

   ⛔ TWO RULES COME OUT OF THIS, AND THE SECOND APPLIES TO THE WHOLE REEL.

   1. THE OPEN'S HEADER IS THE PAYOFF, NOT THE PROBLEM. It used to read "740
      SENT. ZERO REPLIES" over a counter reading 740 SENT / 0 REPLIES, i.e. the
      header was captioning the picture. Now the header promises where this
      ends and the picture shows the hole you are in. That gap IS the loop.
   2. ⛔ A HEADER MAY NOT RESTATE ITS OWN VO LINE. All thirteen did ("IT SCORES
      EVERY POSTING" over a voice saying it scores every posting). A header is a
      SECOND CHANNEL: it must carry a sourced fact the voice never says, so a
      viewer who reads gets more than a viewer who only listens. This supersedes
      the older "headers restate the claim in product nouns" note — restating is
      the thing being objected to.

   HIERARCHY IN THE OPEN, in the order the eye is meant to travel:
     1st  the ONE gold envelope, the only warm thing in a cold frame (CONTRAST)
     2nd  the grey mass of everything else you sent (SCALE)
     3rd  the counter that explains it (ORDER)
   Darkness is what makes that rank readable at all.
   ========================================================================= */

/** THE ONE THAT PAYS: the single warm object in a cold frame, and the thing the
    whole open is asking a question about. */
export const GoldEnv: React.FC<{ x: number; y: number; s?: number; z?: number; rot?: number;
  f?: number; seal?: boolean }> = ({ x, y, s = 1, z = 70, rot = 0, f = 0, seal = true }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "absolute", left: -30 * s, top: -26 * s, width: 208 * s,
      height: 164 * s, borderRadius: "50%",
      background: `radial-gradient(ellipse, ${hexa("#F3CE79", 0.42 + Math.sin(f / 8) * 0.08)}, transparent 68%)` }} />
    <div style={{ width: 148 * s, height: 100 * s, borderRadius: 6 * s,
      background: g("#F6DFA8", "#D9A63F"), boxShadow: "0 14px 26px rgba(0,0,0,0.55)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 148 * s, height: 54 * s,
      background: "#E8C063", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
    {seal && (
      <div style={{ position: "absolute", left: 58 * s, top: 44 * s, width: 34 * s, height: 34 * s,
        borderRadius: 999, background: "#C0392B", border: `${3 * s}px solid #F2887A` }} />
    )}
  </div>
);

/** a numbered marker that lights along the hall. The four steps, PLANTED in the
    open as a loop the body then closes one at a time. */
export const Marker: React.FC<{ x: number; y: number; n: number; on: number; s?: number;
  z?: number }> = ({ x, y, n, on, s = 1, z = 44 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${0.5 + on * 0.5})`, opacity: 0.25 + on * 0.75 }}>
    <div style={{ width: 64 * s, height: 64 * s, borderRadius: 999,
      background: on > 0.5 ? g("#F3CE79", "#C9902E") : "#26314A",
      border: `${4 * s}px solid ${on > 0.5 ? "#FBE9BD" : "#3A4763"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 34 * s,
      color: on > 0.5 ? "#2A1D08" : "#5A6478",
      boxShadow: on > 0.5 ? `0 0 ${22 * s}px rgba(243,206,121,0.7)` : undefined }}>{n}</div>
  </div>
);

/* =========================================================================
   ROUND 6 — THE SCALE.

   Alex, on the 29s beat: "the animation at 29 seconds needs to be a lot better,
   right now its just a lot of like squares right next to each other."

   He is right, and it was the worst possible place for it: 29s is the HERO
   BEAT, the thing the hook promises at 0s. I had drawn a negotiation as a bar
   chart, two rectangles and a strike-through line. A bar chart is a READOUT,
   not a scene, and this whole reel's correction has been away from readouts.

   A negotiation is two parties putting weight against each other, so it is a
   BALANCE SCALE, and every sourced fact maps to a physical object:
     · their opening offer   -> a grey slab that DROPS onto their pan
     · "geographic discount" -> a weight already sitting on YOUR pan, put there
                                by them, holding you down. Claude LIFTS IT OFF
                                and throws it away. The repo's own phrase is
                                "geographic discount pushback", so the pushback
                                becomes a physical act instead of a struck-out
                                caption.
     · what it writes back   -> three gold blocks stacked on your pan
     · the outcome           -> the beam SWINGS and their side goes up
   ⛔ STILL NO SALARY FIGURE. The blocks carry REASONS, not numbers, because the
      repo publishes no number and neither do we. Weight is the argument.
   ========================================================================= */

export const Scale: React.FC<{
  x: number; y: number; s?: number; z?: number;
  tipTheirs: number;   // their slab lands and the beam goes their way
  liftOff: number;     // the discount weight is lifted off your pan
  blocks: number;      // 0..3 gold blocks landed on yours
  f: number;
}> = ({ x, y, s = 1, z = 50, tipTheirs, liftOff, blocks, f }) => {
  /* the beam angle IS the argument. It settles with a wobble, because a real
     beam does, and that wobble is also the scene's idle motion. */
  const target = tipTheirs * 11 - blocks * 7.5 - (1 - liftOff) * 3;
  const ang = target + Math.sin(f / 7) * (blocks >= 3 ? 0.5 : 1.1);
  const PAN = 232, ARM = 292;
  const rad = (ang * Math.PI) / 180;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z, transform: `scale(${s})`,
      transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: -18, top: 60, width: 36, height: 322,
        borderRadius: 6, background: g("#8A93A6", "#3E4757") }} />
      <div style={{ position: "absolute", left: -128, top: 366, width: 256, height: 32,
        borderRadius: 10, background: g("#8A93A6", "#333B49"),
        boxShadow: "0 16px 28px rgba(0,0,0,0.55)" }} />
      <div style={{ position: "absolute", left: -88, top: 392, width: 176, height: 18,
        borderRadius: 8, background: "#2A3140" }} />
      <div style={{ position: "absolute", left: -ARM, top: 40, width: ARM * 2, height: 22,
        borderRadius: 11, background: g("#C9D2DE", "#7C8798"),
        transform: `rotate(${ang}deg)`, transformOrigin: "50% 50%",
        boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }} />
      <div style={{ position: "absolute", left: -26, top: 24, width: 52, height: 52,
        borderRadius: 999, background: g("#DDE4EC", "#8A93A6"),
        boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.18)" }} />
      {([-1, 1] as const).map((side) => {
        const dx = side * ARM * Math.cos(rad), dy = side * ARM * Math.sin(rad);
        return (
          <div key={side} style={{ position: "absolute", left: dx - PAN / 2, top: 50 + dy,
            width: PAN, zIndex: 6 }}>
            {[-1, 1].map((k) => (
              <div key={k} style={{ position: "absolute", left: PAN / 2 + k * 94, top: 0,
                width: 4, height: 92, background: "#9AA5B4",
                transform: `rotate(${-k * 5}deg)`, transformOrigin: "50% 0%" }} />
            ))}
            <div style={{ position: "absolute", left: 0, top: 88, width: PAN, height: 26,
              borderRadius: "6px 6px 20px 20px", background: g("#C9D2DE", "#6E7889"),
              boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }} />
          </div>
        );
      })}
    </div>
  );
};

/** where a pan's SURFACE actually is, so things can SIT on it.
    ⛔ 50 is the beam, +88 is the drop down the hangers to the tray. Returning the
    hanger point instead of the tray is what left every block hovering. */
export const panAt = (x: number, y: number, side: -1 | 1, ang: number, s = 1) => {
  const rad = (ang * Math.PI) / 180, ARM = 292;
  return {
    x: x + side * ARM * Math.cos(rad) * s,
    y: y + (50 + 88) * s + side * ARM * Math.sin(rad) * s,
  };
};

/** a labelled block that sits on a pan. Reasons, never numbers. */
export const Block: React.FC<{ x: number; y: number; t: string; gold?: boolean; s?: number;
  z?: number; o?: number; rot?: number }> =
  ({ x, y, t, gold, s = 1, z = 60, o = 1, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, opacity: o,
    transform: `translateX(-50%) rotate(${rot}deg)` }}>
    <div style={{ padding: `${12 * s}px ${19 * s}px`, borderRadius: 8 * s,
      background: gold ? g("#F6DFA8", "#C9902E") : g("#5C6577", "#333B49"),
      border: `${3 * s}px solid ${gold ? "#FBE9BD" : "#20262F"}`,
      boxShadow: "0 10px 20px rgba(0,0,0,0.55)", fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 20 * s, letterSpacing: "0.02em", whiteSpace: "nowrap",
      color: gold ? "#2A1D08" : "#AEB8C6" }}>{t}</div>
  </div>
);


/** ⛔ THE OPEN'S PATTERN INTERRUPT. Alex: "the very first scene needs to have
    like more pattern interrupt with the envelope thing to spark intrigue and
    curiosity." A gold envelope hovering is an IMAGE; a gold envelope whose SEAL
    CRACKS and floods light out of the seam is an EVENT, and it asks the question
    the reel then spends 38 seconds answering: what is in it?
    Big, bright, and it fires at ~0.5s, which is where a scroller decides. */
export const Burst: React.FC<{ x: number; y: number; f: number; t: number; s?: number;
  z?: number; c?: string; rays?: number }> =
  ({ x, y, f, t, s = 1, z = 68, c = "#FBE9BD", rays = 14 }) => {
  if (t <= 0.001) return null;
  const pop = Math.min(1, t * 2.2);
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${f * 0.35}deg)`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", left: -260 * s, top: -260 * s, width: 520 * s,
        height: 520 * s, borderRadius: "50%",
        background: `radial-gradient(circle, ${hexa(c, 0.5 * pop * (1 - t * 0.4))}, transparent 62%)` }} />
      {Array.from({ length: rays }, (_, i) => {
        const len = (150 + (i % 3) * 78) * s * (0.5 + t * 0.5);
        return (
          <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 15 * s,
            height: len, transformOrigin: "50% 0%",
            transform: `translate(-50%,0) rotate(${(360 / rays) * i}deg)`,
            background: `linear-gradient(180deg, ${hexa(c, 0.7 * pop)}, transparent)`,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
        );
      })}
    </div>
  );
};
