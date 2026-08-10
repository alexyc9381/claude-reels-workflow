import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
/* ⛔ THE SPRITE AND THE HELPERS COME FROM REEL 94, NOT A COPY.
   `Claudie` encodes two rules that cost rounds to learn — it is the SlopKit
   `Mascot` verbatim (never a redrawn lookalike) and it can only emit the one
   house clay `#D97757` — so re-implementing it here would be re-opening both.
   The easings and colour maths are shared for the same reason. */
export {
  Claudie, CLAY, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, Contact, Plinth,
} from "./AgyWorld";
import { E, LIN, hexa, mix, dark } from "./AgyWorld";

/* =========================================================================
   REEL 95 "TOOLS" · THE PLAYHOUSE KIT.

   Board: storyboards/95-tools.md.

   WHY A THEATRE: a system prompt IS a script — the words a performer is handed
   before the audience hears anything — and the repo is the script library. The
   metaphor is not dressing on the idea, it is the idea, which is the test
   [[feedback_reel_needs_a_storyline]] sets. It also hands the reel its central
   image free: the PROMPTER'S BOX, the hooded hatch at the front of a stage
   where someone feeds an actor every line he appears to be inventing.

   ⛔ IT MUST NOT LOOK LIKE REEL 94. AGENCY shipped a week ago in cold night-city
      plum / navy / teal / sodium. This is red velvet, brass, gold footlights and
      worklight blue. Two reels this close together cannot share a palette.

   ⛔ MATTE, NOT NEON. Solid paints, dark drop-shadows, zero coloured bloom. A
      theatre is the second-most reliable way after "terminal" to end up drawing
      glowing lights on black; every lamp here is a SOLID lens with a SOLID cone.
   ========================================================================= */

export const W = 1012, H = 792;
export const SH = "0 10px 22px rgba(24,14,12,0.36)";
export const SH_D = "0 24px 46px rgba(18,8,8,0.48)";

/* ---------------------------------------------------------------------------
   ELEVEN SPACES. A stage, a hatch under it, an archive, two corridors, a
   catwalk forty feet up, a green room, a house, a box office and two exteriors.
   If two cannot be told apart by light and palette alone, the viewer has not
   been to two places.
   ------------------------------------------------------------------------ */
export type Space = {
  wall: string; wall2: string; seam: string;      // the back surface
  floor: string; floor2: string; lip: string;     // the deck
  trim: string;                                   // brass / timber accents
  key: string;                                    // this room's practical colour
  hz: number;                                     // where wall meets floor
  grit: string;
};

export const SPACES: Record<string, Space> = {
  /* S0a/S0c · THE STAGE. Red velvet and brass footlights, the reel's home key. */
  stage:    { wall: "#5A1E22", wall2: "#2E0D11", seam: "#71272C", floor: "#7A5334",
              floor2: "#432B18", lip: "#A8763F", trim: "#D9A441", key: "#F2C15E",
              hz: 486, grit: "#E0B478" },
  /* S0b · INSIDE THE PROMPTER'S BOX. Tight, timber, one green shade. */
  box:      { wall: "#33241A", wall2: "#170F0A", seam: "#4A3524", floor: "#2A1D14",
              floor2: "#140D09", lip: "#5E4227", trim: "#B98A3C", key: "#8FD9A8",
              hz: 560, grit: "#C09B62" },
  /* S1 · THE ARCHIVE. Brown and brass under green reading shades. */
  archive:  { wall: "#3B2E22", wall2: "#1C150F", seam: "#54402D", floor: "#43331F",
              floor2: "#221A10", lip: "#7A5A2E", trim: "#C79A46", key: "#7FCf9B",
              hz: 500, grit: "#C7A46A" },
  /* S2 · THE STAR DRESSING CORRIDOR. Cream doors, mirror bulbs, red runner. */
  dressing: { wall: "#4A3A3E", wall2: "#241A1E", seam: "#61494E", floor: "#6E2A2C",
              floor2: "#3A1416", lip: "#8E4C3C", trim: "#E4D6B4", key: "#F6E2A8",
              hz: 508, grit: "#E8D2A6" },
  /* S3 · THE UNDERSTUDY'S CORRIDOR. Cold institutional green, one bare bulb.
     ⛔ It is COLD on purpose — the contrast with `dressing` IS the beat. */
  under:    { wall: "#39463E", wall2: "#1A231E", seam: "#4C5C52", floor: "#3B443C",
              floor2: "#1E241F", lip: "#5E6E62", trim: "#93A398", key: "#EFE4C0",
              hz: 520, grit: "#A7B4AA" },
  /* S4 · THE MARQUEE, exterior night. Gold bulbs on wet pavement. */
  marquee:  { wall: "#22283E", wall2: "#111426", seam: "#333B58", floor: "#2C3244",
              floor2: "#171B28", lip: "#4E5876", trim: "#E7B24C", key: "#F2D28A",
              hz: 604, grit: "#9AA6C4" },
  /* S5 · THE STAGE DOOR ALLEY, exterior. Grey brick, one caged lamp. */
  alley:    { wall: "#3E4148", wall2: "#1E2024", seam: "#525761", floor: "#33373C",
              floor2: "#1A1D20", lip: "#5A6068", trim: "#B2874A", key: "#8FD9A8",
              hz: 470, grit: "#98A0AA" },
  /* S6 · THE FLY CATWALK. The only cool-steel space, and the only one from above. */
  catwalk:  { wall: "#1E2C3E", wall2: "#0E1622", seam: "#2C4058", floor: "#26323F",
              floor2: "#131A22", lip: "#3E566E", trim: "#8FA6BE", key: "#8FB8E0",
              hz: 300, grit: "#7E96AE" },
  /* S7 · THE GREEN ROOM. Felt, brass pins, a kettle. */
  green:    { wall: "#2C4438", wall2: "#14231B", seam: "#3C5A49", floor: "#4A3A26",
              floor2: "#241C12", lip: "#6E5A38", trim: "#C79A46", key: "#F0D48A",
              hz: 512, grit: "#B4C0A2" },
  /* S8 · THE HOUSE, seen from the wings. Ranked red seats in the dark. */
  house:    { wall: "#2A1216", wall2: "#12070A", seam: "#3E1C21", floor: "#6E4A2C",
              floor2: "#38240F", lip: "#9A6A36", trim: "#D9A441", key: "#F6D89A",
              hz: 452, grit: "#C79A6A" },
  /* S9 · THE BOX OFFICE. Brass grille and marble — the brightest interior. */
  boxoff:   { wall: "#5E4A32", wall2: "#33261A", seam: "#7A6240", floor: "#8A7C68",
              floor2: "#4E463A", lip: "#B8A88C", trim: "#E0B45C", key: "#FFEEC0",
              hz: 546, grit: "#D8C8A8" },
  /* S10 · THE FOYER at half-light. */
  foyer:    { wall: "#4E2226", wall2: "#280F12", seam: "#6A3238", floor: "#7E6448",
              floor2: "#42331F", lip: "#A8865A", trim: "#E0B45C", key: "#F4D89C",
              hz: 540, grit: "#D6BC94" },
};

/* ⛔ THE VARIANT PALETTE ROTATION. Measured on reel 94: with a shared body, the
   hooks diverged 48-64 but the body only 14-17 against a target of 20, because
   eleven identical scenes with a camera offset are eleven identical scenes. A
   rotation onto another space's COLOURS took it to 21-25.
   ⚠️ Colour only — `hz` stays with the original space, because every prop in a
   scene is positioned against its own horizon and a moved one puts the deck
   through the furniture. */
export const PalCtx = React.createContext(0);
const SPACE_KEYS = Object.keys(SPACES);
/** blend two solid colours and emit a SOLID value — never an alpha wash. */
const blend = (a: string, b: string, k: number) => {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const m = (sa: number, sb: number) => Math.round(((A >> sa) & 255) * (1 - k) + ((B >> sb) & 255) * k);
  return `rgb(${m(16, 16)},${m(8, 8)},${m(0, 0)})`;
};
/* ⛔⛔ A ROTATION ALONE WAS NOT ENOUGH, AND A TINT MADE IT WORSE. Measured:
   rotation only -> body 19.0-21.0; rotation + a 26% tint blend -> 17.1-19.8,
   i.e. it went DOWN. Blending toward a common-ish colour COMPRESSES the range,
   so every scene in a variant moved closer to every other scene AND to the other
   variants. The metric is mean |LUMA delta|, so the lever that actually moves it
   is a LUMA shift, not a hue one:
     pal 1  darker  (x0.74)   pal 2  lighter (mixed toward paper 0.26)
   ⚠️ Checked against the luma floor after: full-frame stays well above 140. */
const LEVEL: Array<(c: string) => string> = [
  (c) => c,
  (c) => dark(c, 0.26),
  (c) => mix(c, 0.26),
];
export const useSpace = (k: keyof typeof SPACES): Space => {
  const p = React.useContext(PalCtx);
  const base = SPACES[k];
  if (!p) return base;
  const i = SPACE_KEYS.indexOf(k as string);
  const d = SPACES[SPACE_KEYS[(i + p * 5) % SPACE_KEYS.length]];
  const L = LEVEL[p] || ((c: string) => c);
  return { wall: L(d.wall), wall2: L(d.wall2), seam: L(d.seam), floor: L(d.floor),
           floor2: L(d.floor2), lip: L(d.lip), trim: d.trim, key: d.key,
           grit: L(d.grit), hz: base.hz };
};

/* ---------------------------------------------------------------------------
   THE ROOM. Back wall with panel courses, a lit lip where wall meets deck, a
   deck in perspective with board seams, converging joints, dust, and a vignette
   last over everything. Nine layers before a single prop lands, which is the
   density floor CALLBACK never drops below.
   ------------------------------------------------------------------------ */
const g = (a: string, b: string, deg = 176) => `linear-gradient(${deg}deg, ${a} 0%, ${b} 100%)`;

/** slow-drifting dust in the beam — the only thing moving in a room between two
    scripted events, and the difference between a still frame and a held one. */
export const Motes: React.FC<{ f: number; c: string; n?: number; z?: number }> =
  ({ f, c, n = 20, z = 30 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const r = (k: number) => { const v = Math.sin(i * 37.1 + k * 11.3) * 4371.7; return v - Math.floor(v); };
    const drift = (f * (0.20 + r(3) * 0.28) + r(1) * 700) % 720;
    return (
      <div key={`d${i}`} style={{ position: "absolute", left: 34 + r(1) * 940,
        top: 90 + ((drift + Math.sin(f / 31 + i) * 14) % 620), width: 3 + (i % 2),
        height: 3 + (i % 2), borderRadius: 999, background: c,
        opacity: 0.20 + r(2) * 0.30, zIndex: z }} />
    );
  })}
</>);

export const Room: React.FC<{ k: keyof typeof SPACES; children?: React.ReactNode;
  dust?: boolean; f?: number; boards?: boolean }> =
  ({ k, children, dust, f = 0, boards = true }) => {
  const p = useSpace(k);
  return (<>
    <div style={{ position: "absolute", inset: 0, background: g(p.wall, p.wall2), zIndex: 1 }} />
    {/* wall panel courses */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 44 + i * 92,
        height: 3, background: p.seam, opacity: 0.7, zIndex: 2 }} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={`v${i}`} style={{ position: "absolute", left: 22 + i * 138, top: 0, width: 3,
        height: p.hz, background: p.seam, opacity: 0.45, zIndex: 2 }} />
    ))}
    {/* the lit lip where the wall meets the deck */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 9, height: 11,
      background: p.lip, zIndex: 4, boxShadow: `0 3px 12px rgba(0,0,0,0.5)` }} />
    {/* the deck */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
      background: g(p.floor, p.floor2, 184), zIndex: 4 }} />
    {boards && Array.from({ length: 7 }, (_, i) => (
      <div key={`b${i}`} style={{ position: "absolute", left: 0, right: 0,
        top: p.hz + 20 + i * (26 + i * 9), height: 2, background: p.lip, opacity: 0.34, zIndex: 5 }} />
    ))}
    {/* converging board joints, so the deck has a vanishing point */}
    {Array.from({ length: 5 }, (_, i) => {
      const x = 120 + i * 200;
      return (
        <div key={`c${i}`} style={{ position: "absolute", left: x, top: p.hz, width: 3,
          height: H - p.hz, background: p.lip, opacity: 0.24, zIndex: 5,
          transform: `skewX(${(x - 506) / 32}deg)`, transformOrigin: "50% 0%" }} />
      );
    })}
    {Array.from({ length: 18 }, (_, i) => (
      <div key={`g${i}`} style={{ position: "absolute",
        left: ((i * 97 + 40 - f * 0.30) % 1080) - 40,
        top: p.hz + 22 + ((i * 47) % 9) * 26, width: 4 + (i % 3) * 3, height: 3,
        borderRadius: 2, background: p.grit, opacity: 0.34, zIndex: 6 }} />
    ))}
    {dust && <Motes f={f} c={p.key} />}
    {children}
    <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
      background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#0A0405", 0.60)} 100%)` }} />
  </>);
};

/* ---------------------------------------------------------------------------
   PRACTICAL LIGHT. A cone you can SEE is what makes a dark room read as lit
   rather than as a dark rectangle.
   ------------------------------------------------------------------------ */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number; sway?: number; up?: boolean }> =
  ({ x, y, top = 64, bot = 300, len = 420, c = "#F2C15E", o = 0.28, z = 20, f = 0,
     sway = 1, up = false }) => (
  <div style={{ position: "absolute", left: x - bot / 2 + Math.sin(f / 47) * 7 * sway, top: y,
    width: bot, height: len, zIndex: z,
    transform: `rotate(${(up ? 180 : 0) + Math.sin(f / 47) * 0.8 * sway}deg)`,
    transformOrigin: "50% 0%",
    background: `linear-gradient(180deg, ${hexa(c, o * (0.92 + Math.sin(f / 9) * 0.06))} 0%, ${hexa(c, o * 0.12)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** the brass footlight rank across the front lip of a stage. */
export const Footlights: React.FC<{ y: number; n?: number; c?: string; f?: number; z?: number;
  on?: number }> = ({ y, n = 11, c = "#F2C15E", f = 0, z = 88, on = 1 }) => (<>
  <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 26,
    borderRadius: 6, background: "#6E4A22", zIndex: z }} />
  <div style={{ position: "absolute", left: -20, right: -20, top: y, height: 7,
    background: "#A8763F", zIndex: z + 1 }} />
  {Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ position: "absolute", left: 12 + i * (1000 / n), top: y - 22,
      width: 62, height: 26, borderRadius: "31px 31px 0 0", background: "#8A5F2C",
      zIndex: z + 1 }}>
      <div style={{ position: "absolute", left: 10, top: 9, width: 42, height: 14,
        borderRadius: 8, background: c,
        opacity: on * (0.86 + Math.sin(f / 6 + i * 1.4) * 0.10) }} />
    </div>
  ))}
</>);

/** a hanging worklight / shaded reading lamp: shade, flex and a SOLID lens. */
export const Lamp: React.FC<{ x: number; y: number; c?: string; s?: number; z?: number;
  f?: number; sway?: number; flex?: number; shade?: string }> =
  ({ x, y, c = "#F2C15E", s = 1, z = 40, f = 0, sway = 1, flex = 120, shade = "#3E2C1E" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `rotate(${Math.sin(f / 47) * 1.3 * sway}deg)`, transformOrigin: `50% ${-flex}px` }}>
    <div style={{ position: "absolute", left: -3 * s, top: -flex, width: 6 * s, height: flex,
      background: "#2A1E14" }} />
    <div style={{ position: "absolute", left: -52 * s, top: 0, width: 104 * s, height: 34 * s,
      borderRadius: `${52 * s}px ${52 * s}px 8px 8px`, background: shade, boxShadow: SH }} />
    <div style={{ position: "absolute", left: -22 * s, top: 26 * s, width: 44 * s, height: 12 * s,
      borderRadius: 7 * s, background: c }} />
  </div>
);

/** ⛔ THE FRAME-EDGE OCCLUDER — a mass cropped by the panel border, IN FRONT of
    the action. Without it the camera is pointed at a backdrop. In a theatre it
    is a velvet leg, a rope run or a flown border. */
export const Leg: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "velvet" | "rope" | "rail" }> =
  ({ side = "l", c, w: ww = 132, z = 92, kind = "velvet" }) => {
  const anchor = side === "l" ? "left" : "right";
  if (kind === "rope") return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: 96, zIndex: z,
      [anchor]: 20 }}>
      {[0, 34, 70].map((o, i) => (
        <div key={o} style={{ position: "absolute", top: -40, bottom: -40, [anchor]: o,
          width: 11, background: i === 1 ? mix(c, 0.14) : c, boxShadow: SH }} />
      ))}
      {[140, 420, 700].map((ty) => (
        <div key={ty} style={{ position: "absolute", top: ty, [anchor]: -6, width: 116,
          height: 22, borderRadius: 6, background: dark(c, 0.28) }} />
      ))}
    </div>
  );
  if (kind === "rail") return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: 40, zIndex: z,
      [anchor]: 40, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [anchor]: 0, width: 9,
        background: mix(c, 0.22) }} />
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 50 + i * 100, [anchor]: -10, width: 60,
          height: 13, borderRadius: 4, background: dark(c, 0.30) }} />
      ))}
    </div>
  );
  /* a velvet leg: a heavy drape with vertical folds */
  return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: ww, zIndex: z,
      [anchor]: -20, background: c, boxShadow: SH_D }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: -40, bottom: -40,
          [anchor]: 8 + i * (ww / 5), width: ww / 10,
          background: i % 2 ? mix(c, 0.10) : dark(c, 0.22) }} />
      ))}
      <div style={{ position: "absolute", top: -40, bottom: -40, [side === "l" ? "right" : "left"]: 0,
        width: 8, background: mix(c, 0.24) }} />
    </div>
  );
};

/* ---------------------------------------------------------------------------
   IN-PANEL CHROME
   ------------------------------------------------------------------------ */

/** the mono slug along the deck — names the beat without competing for rank. */
export const Slug: React.FC<{ t: string; c?: string; z?: number; y?: number }> =
  ({ t, c = "#D8C8A8", z = 95, y = H - 44 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: z,
    fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.30em", color: c,
    textShadow: "0 2px 6px rgba(0,0,0,0.62)" }}>{t}</div>
);

/** a dark-glass readout: mono label, status dot, a big number. */
export const Glass: React.FC<{ x: number; y: number; w: number; h: number; label: string;
  c?: string; f?: number; z?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, label, c = "#E7B24C", f = 0, z = 70, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, borderRadius: 16,
    background: "linear-gradient(168deg,#2A1F16 0%,#170F0A 100%)", boxShadow: SH_D, zIndex: z,
    border: "3px solid rgba(232,216,180,0.24)", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
      background: "#1C1410", borderBottom: "2px solid rgba(232,216,180,0.16)" }} />
    <div style={{ position: "absolute", left: 14, top: 8, width: 11, height: 11, borderRadius: 6,
      background: c, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 11)) }} />
    <div style={{ position: "absolute", left: 34, top: 8, fontFamily: MONO, fontWeight: 800,
      fontSize: 16, letterSpacing: "0.16em", color: "#A6957A" }}>{label}</div>
    {children}
  </div>
);

/** a big number that MOVES to its value — never typeset at it. */
export const BigNum: React.FC<{ x: number; y: number; v: string; c?: string; size?: number;
  z?: number }> = ({ x, y, v, c = "#F6EEDC", size = 66, z = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1, color: c,
    letterSpacing: "-0.02em", textShadow: "0 3px 10px rgba(0,0,0,0.55)" }}>{v}</div>
);

/** a brass plaque that sits UNDER a card. ⛔ it must clear the card's RECT, not
    merely look below its content (reel 93 shipped that bug). */
export const Plaque: React.FC<{ x: number; y: number; t: string; hot?: string; s?: number;
  z?: number; c?: string }> = ({ x, y, t, hot, s = 1, z = 72, c = "#D9A441" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${9 * s}px ${18 * s}px`, borderRadius: 8 * s,
    background: "#2A1F16", border: `${3 * s}px solid ${c}`, boxShadow: SH,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * s, color: "#F2E6CE",
    whiteSpace: "nowrap" }}>
    {t}{hot && <span style={{ color: c }}> {hot}</span>}
  </div>
);
