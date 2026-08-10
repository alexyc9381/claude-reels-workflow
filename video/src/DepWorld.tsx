import React from "react";
import { inter, fraunces } from "./fonts";
import { MONO } from "./SlopKit";
/* ⛔ THE SPRITE AND THE HELPERS COME FROM REEL 94, NOT A COPY.
   `Claudie` encodes two rules that cost rounds to learn — it is the SlopKit
   `Mascot` verbatim (never a redrawn lookalike) and it can only emit the one
   house clay `#D97757` — so re-implementing it here would be re-opening both. */
export {
  Claudie, CLAY, E, OUT, IO, BACK, IN_Q, LIN, hexa, mix, dark, Contact, Plinth,
} from "./AgyWorld";
import { E, hexa, mix, dark } from "./AgyWorld";

/* =========================================================================
   REEL 96 "AWESOME" · THE DEPOT KIT.

   Board: storyboards/96-awesome.md.

   WHY A SORTING DEPOT: the VO is not about FINDING things, it is about the
   difference between having things and having them SORTED. A depot is the same
   objects twice, and the only thing that changed is that someone labelled the
   bays. A pigeonhole wall is also the rare metaphor that IS the data structure —
   11 bays is 11 category headings, and you can count them in the shot. The heap
   in act 1 and the wall in act 3 are made of the IDENTICAL crates, which is the
   argument the reel is making, drawn instead of said.

   ⛔ IT MUST NOT LOOK LIKE REEL 94 OR 95. AGENCY was cold night-city plum / navy
      / teal / sodium. TOOLS was red velvet, brass and gold footlights. THE DEPOT
      is deep teal-green and warm amber rooms, oxidised copper trim, ELEVEN
      saturated category paints on the freight, and one signal orange that only
      ever belongs to Claude. Three reels inside a fortnight cannot share a
      palette.

   ⛔⛔ ROUND 1: *"the colors are too dull, it's just the paper color."* The first
      build drew every crate in bone manila against grey concrete, so the reel
      was one beige mass with a single orange sprite in it. Two things changed
      and BOTH were needed:
        1. the freight got `CAT` in DepProps — eleven saturated paints, one per
           category, jumbled in the heap and sorted on the wall
        2. the ROOMS committed to hues (teal wall/bay, amber bench/counter,
           blue-teal aisle, green ledger). Coloured freight in a grey room still
           reads grey; the room has to answer it.

   ⛔ MATTE, NOT NEON. Solid paints, dark drop-shadows, zero coloured bloom. No
      `0 0 Npx` box-shadow exists in this reel — every lamp is a SOLID lens with
      a SOLID cone. Saturated is not the same as glowing.
   ========================================================================= */

export const W = 1012, H = 792;
export const SH = "0 10px 22px rgba(16,20,22,0.38)";
export const SH_D = "0 24px 46px rgba(10,14,16,0.50)";

/* ---------------------------------------------------------------------------
   NINE SPACES. A chute mouth, an unsorted floor, a stencil bench, the
   pigeonhole wall, one bay in close, the long aisle, a licence gate, a tally
   office and a handover counter. If two cannot be told apart by light and
   palette alone, the viewer has not been to two places.
   ------------------------------------------------------------------------ */
export type Space = {
  wall: string; wall2: string; seam: string;      // the back surface
  floor: string; floor2: string; lip: string;     // the deck
  trim: string;                                   // copper / steel accents
  key: string;                                    // this room's practical colour
  hz: number;                                     // where wall meets floor
  grit: string;
};

export const SPACES: Record<string, Space> = {
  /* S0a/S0d · THE DEAD-DROP CHUTE. Hard cold top-down on galvanised steel. */
  /* ⛔ LIFTED. Frame-0 panel luma measured 126.6 against THE-OPEN's bar of 140:
     a feed is a brightness competition and the two hook spaces were the sinks.
     Lifted here rather than by thinning the vignette alone, so the rooms stay
     matte and cool instead of going washed-out. */
  chute:   { wall: "#B2C4C0", wall2: "#87979A", seam: "#C8D6D0", floor: "#BCC0B0",
             floor2: "#8A8E80", lip: "#D2DACD", trim: "#E2EAE0",
             key: "#E8F6F8", hz: 520, grit: "#EEF2E6" },
  /* S0b/S0c/S1 · THE UNSORTED FLOOR. One swinging caged bulb, warm on grey. */
  heap:    { wall: "#78807F", wall2: "#474E4F", seam: "#909A9B", floor: "#877F6F",
             floor2: "#514B40", lip: "#A49B89", trim: "#BCB4A2", key: "#F0CE84",
             hz: 470, grit: "#DED3B8" },
  /* S3 · THE STENCIL BENCH. Warm task lamp, low and left, on oiled timber. */
  bench:   { wall: "#7A5C36", wall2: "#3E2C18", seam: "#9A7847",
             floor: "#8E6C3E", floor2: "#4A3620", lip: "#B8905A",
             trim: "#E0B268", key: "#FFD98A", hz: 512, grit: "#E8CFA0" },
  /* S2 · THE PIGEONHOLE WALL. Even copper floods — the flattest, brightest room. */
  wall:    { wall: "#3E8C7E", wall2: "#256054", seam: "#54AC9A", floor: "#649688",
             floor2: "#3A6458", lip: "#84BCAA", trim: "#F0A860", key: "#7FF0D0",
             hz: 610, grit: "#B4E4D2" },
  /* S4 · ONE BAY, CLOSE. Hard side rake from the right. */
  bay:     { wall: "#2C6157", wall2: "#173731", seam: "#3D8175", floor: "#456E63",
             floor2: "#22403A", lip: "#5E9484", trim: "#E09A56", key: "#F4DFA8",
             hz: 640, grit: "#93C8B8" },
  /* S5 · THE LONG AISLE. Receding overheads, the deepest shot in the reel. */
  aisle:   { wall: "#33555F", wall2: "#193036", seam: "#457182",
             floor: "#3E6068", floor2: "#1F383D", lip: "#5E8C97", trim: "#9ECBD6",
             key: "#8FE0EE", hz: 430, grit: "#A8CBD4" },
  /* S6 · THE LICENCE GATE. The only shot lit from BEHIND. */
  gate:    { wall: "#4A5560", wall2: "#232A32", seam: "#66757F", floor: "#5E6660",
             floor2: "#2E342E", lip: "#8A9490", trim: "#F0D89A", key: "#FFF4D4",
             hz: 500, grit: "#B6C0B8" },
  /* S7 · THE TALLY OFFICE. Green banker's shade, tight pool — the darkest frame. */
  ledger:  { wall: "#1F4A40", wall2: "#0D2420", seam: "#2E685A", floor: "#3E4A32",
             floor2: "#1C2418", lip: "#5E7050", trim: "#E0B45C", key: "#5CF0B4",
             hz: 528, grit: "#8ABF9E" },
  /* S8 · THE HANDOVER COUNTER. Warm lamp inside, cold night beyond. */
  counter: { wall: "#7A4E30", wall2: "#3C2618", seam: "#9C6840", floor: "#8A6440",
             floor2: "#443020", lip: "#B08A58", trim: "#E8B868",
             key: "#FFD08A", hz: 545, grit: "#E0C098" },
};

/* ⛔ THE VARIANT PALETTE ROTATION. Measured on reels 94/95: with a shared body,
   the hooks diverge but the body does not, because N identical scenes with a
   camera offset are N identical scenes. A rotation onto another space's COLOURS
   fixes it. ⚠️ Colour only — `hz` stays with the original space, because every
   prop is positioned against its own horizon and a moved one puts the deck
   through the furniture.
   ⛔⛔ A HUE TINT MAKES DIVERGENCE WORSE (it compresses the range). The metric is
   mean |LUMA delta|, so the lever is a LUMA shift, not a hue one. */
export const PalCtx = React.createContext(0);
const SPACE_KEYS = Object.keys(SPACES);
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
  const d = SPACES[SPACE_KEYS[(i + p * 4) % SPACE_KEYS.length]];
  const L = LEVEL[p] || ((c: string) => c);
  return { wall: L(d.wall), wall2: L(d.wall2), seam: L(d.seam), floor: L(d.floor),
           floor2: L(d.floor2), lip: L(d.lip), trim: d.trim, key: d.key,
           grit: L(d.grit), hz: base.hz };
};

/* ---------------------------------------------------------------------------
   THE ROOM. Back wall with panel courses, a lit lip where wall meets deck, a
   deck in perspective with board seams, converging joints, grit, dust, and a
   vignette last over everything. Nine layers before a single prop lands.
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
  dust?: boolean; f?: number; boards?: boolean; vig?: number }> =
  ({ k, children, dust, f = 0, boards = true, vig = 0.58 }) => {
  const p = useSpace(k);
  return (<>
    <div style={{ position: "absolute", inset: 0, background: g(p.wall, p.wall2), zIndex: 1 }} />
    {/* wall panel courses — concrete lift lines, not timber */}
    {Array.from({ length: 5 }, (_, i) => (
      <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, top: 44 + i * 92,
        height: 3, background: p.seam, opacity: 0.62, zIndex: 2 }} />
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={`v${i}`} style={{ position: "absolute", left: 22 + i * 138, top: 0, width: 3,
        height: p.hz, background: p.seam, opacity: 0.40, zIndex: 2 }} />
    ))}
    {/* form-tie dimples — the detail that says poured concrete */}
    {Array.from({ length: 24 }, (_, i) => (
      <div key={`t${i}`} style={{ position: "absolute", left: 60 + (i % 8) * 122,
        top: 92 + Math.floor(i / 8) * 138, width: 9, height: 9, borderRadius: 5,
        background: p.wall2, opacity: 0.34, zIndex: 3 }} />
    ))}
    {/* the lit lip where the wall meets the deck */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 9, height: 11,
      background: p.lip, zIndex: 4, boxShadow: "0 3px 12px rgba(0,0,0,0.5)" }} />
    {/* the deck */}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
      background: g(p.floor, p.floor2, 184), zIndex: 4 }} />
    {boards && Array.from({ length: 7 }, (_, i) => (
      <div key={`b${i}`} style={{ position: "absolute", left: 0, right: 0,
        top: p.hz + 20 + i * (26 + i * 9), height: 2, background: p.lip, opacity: 0.30, zIndex: 5 }} />
    ))}
    {/* converging joints, so the deck has a vanishing point */}
    {Array.from({ length: 5 }, (_, i) => {
      const x = 120 + i * 200;
      return (
        <div key={`c${i}`} style={{ position: "absolute", left: x, top: p.hz, width: 3,
          height: H - p.hz, background: p.lip, opacity: 0.22, zIndex: 5,
          transform: `skewX(${(x - 506) / 32}deg)`, transformOrigin: "50% 0%" }} />
      );
    })}
    {Array.from({ length: 18 }, (_, i) => (
      <div key={`g${i}`} style={{ position: "absolute",
        left: ((i * 97 + 40 - f * 0.30) % 1080) - 40,
        top: p.hz + 22 + ((i * 47) % 9) * 26, width: 4 + (i % 3) * 3, height: 3,
        borderRadius: 2, background: p.grit, opacity: 0.32, zIndex: 6 }} />
    ))}
    {dust && <Motes f={f} c={p.key} />}
    {children}
    <div style={{ position: "absolute", inset: 0, zIndex: 96, pointerEvents: "none",
      background: `radial-gradient(122% 92% at 50% 44%, transparent 40%, ${hexa("#0A1012", vig)} 100%)` }} />
  </>);
};

/* ---------------------------------------------------------------------------
   PRACTICAL LIGHT. A cone you can SEE is what makes a dark room read as lit
   rather than as a dark rectangle. ⛔ Always a SHAPED cone, never a full-frame
   fill (reel 78 shipped a full-panel tint pulse and it flattened the grade).
   ------------------------------------------------------------------------ */
export const Cone: React.FC<{ x: number; y: number; top?: number; bot?: number; len?: number;
  c?: string; o?: number; z?: number; f?: number; sway?: number; up?: boolean }> =
  ({ x, y, top = 64, bot = 300, len = 420, c = "#E8C070", o = 0.26, z = 20, f = 0,
     sway = 1, up = false }) => (
  <div style={{ position: "absolute", left: x - bot / 2 + Math.sin(f / 47) * 7 * sway, top: y,
    width: bot, height: len, zIndex: z,
    transform: `rotate(${(up ? 180 : 0) + Math.sin(f / 47) * 0.8 * sway}deg)`,
    transformOrigin: "50% 0%",
    background: `linear-gradient(180deg, ${hexa(c, o * (0.92 + Math.sin(f / 9) * 0.06))} 0%, ${hexa(c, o * 0.12)} 100%)`,
    clipPath: `polygon(${50 - (top / bot) * 50}% 0, ${50 + (top / bot) * 50}% 0, 100% 100%, 0 100%)` }} />
);

/** ⛔ THE SWINGING CAGED BULB — the single practical that owns act 1, and the
    only thing moving in the heap wide. The swing is what makes an inert mass
    read as endless: the shadow travels, the pile does not. */
export const CagedBulb: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  flex?: number; amp?: number; c?: string; on?: number }> =
  ({ x, y, f, s = 1, z = 44, flex = 150, amp = 1, c = "#E8C070", on = 1 }) => {
  const sw = Math.sin(f / 26) * 7.5 * amp;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${sw}deg)`, transformOrigin: `50% ${-flex}px` }}>
      <div style={{ position: "absolute", left: -2 * s, top: -flex, width: 4 * s, height: flex,
        background: "#232A2A" }} />
      {/* the cage: a crown ring and six ribs */}
      <div style={{ position: "absolute", left: -30 * s, top: -4 * s, width: 60 * s, height: 10 * s,
        borderRadius: 5 * s, background: "#3A4342" }} />
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: -28 * s + i * 11 * s, top: 0,
          width: 3 * s, height: 46 * s, borderRadius: 2 * s, background: "#39423F",
          transform: `rotate(${(i - 2.5) * 7}deg)`, transformOrigin: "50% 0%" }} />
      ))}
      {/* SOLID lens — no bloom */}
      <div style={{ position: "absolute", left: -15 * s, top: 12 * s, width: 30 * s,
        height: 34 * s, borderRadius: `${15 * s}px ${15 * s}px ${13 * s}px ${13 * s}px`,
        background: c, opacity: on * (0.90 + Math.sin(f / 7) * 0.07) }} />
      <div style={{ position: "absolute", left: -32 * s, top: 44 * s, width: 64 * s, height: 7 * s,
        borderRadius: 4 * s, background: c, opacity: on * 0.5 }} />
    </div>
  );
};

/** a ceiling batten / strip lamp: housing plus a SOLID tube. Used in runs down
    the aisle so depth is drawn by falloff, not by blur. */
export const Batten: React.FC<{ x: number; y: number; w?: number; c?: string; z?: number;
  on?: number; f?: number }> =
  ({ x, y, w: ww = 150, c = "#BFD8DA", z = 40, on = 1, f = 0 }) => (
  <div style={{ position: "absolute", left: x - ww / 2, top: y, width: ww, zIndex: z }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: ww, height: 13,
      borderRadius: 3, background: "#39423F", boxShadow: SH }} />
    <div style={{ position: "absolute", left: ww * 0.07, top: 11, width: ww * 0.86, height: 9,
      borderRadius: 4, background: c, opacity: on * (0.88 + Math.sin(f / 13) * 0.05) }} />
  </div>
);

/** the green banker's shade over the tally board — S7's only light. */
export const Shade: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  c?: string }> = ({ x, y, s = 1, z = 44, f = 0, c = "#8FE0B4" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ position: "absolute", left: -3 * s, top: -120 * s, width: 6 * s,
      height: 120 * s, background: "#232A28" }} />
    <div style={{ position: "absolute", left: -74 * s, top: 0, width: 148 * s, height: 40 * s,
      borderRadius: `${74 * s}px ${74 * s}px 10px 10px`, background: "#25543F", boxShadow: SH }} />
    <div style={{ position: "absolute", left: -74 * s, top: 34 * s, width: 148 * s, height: 8 * s,
      borderRadius: 4 * s, background: "#3E7A5C" }} />
    <div style={{ position: "absolute", left: -26 * s, top: 30 * s, width: 52 * s, height: 12 * s,
      borderRadius: 6 * s, background: c, opacity: 0.90 + Math.sin(f / 11) * 0.06 }} />
  </div>
);

/** ⛔ THE FRAME-EDGE OCCLUDER — a mass cropped by the panel border, IN FRONT of
    the action. Without it the camera is pointed at a backdrop. In a depot it is
    a rack upright, a hanging chain run or a roller-shutter edge. */
export const Leg: React.FC<{ side?: "l" | "r"; c: string; w?: number; z?: number;
  kind?: "rack" | "chain" | "shutter" }> =
  ({ side = "l", c, w: ww = 92, z = 92, kind = "rack" }) => {
  const anchor = side === "l" ? "left" : "right";
  if (kind === "chain") return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: 96, zIndex: z,
      [anchor]: 26 }}>
      {[0, 40, 78].map((o, i) => (
        <div key={o} style={{ position: "absolute", top: -40, bottom: -40, [anchor]: o,
          width: 9, background: i === 1 ? mix(c, 0.16) : c }}>
          {Array.from({ length: 12 }, (_, j) => (
            <div key={j} style={{ position: "absolute", top: j * 72, left: -3, width: 15,
              height: 26, borderRadius: 8, border: `4px solid ${dark(c, 0.24)}` }} />
          ))}
        </div>
      ))}
    </div>
  );
  if (kind === "shutter") return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: 116, zIndex: z,
      [anchor]: -14, background: c, boxShadow: SH_D }}>
      {Array.from({ length: 22 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 40,
          height: 5, background: dark(c, 0.30) }} />
      ))}
      <div style={{ position: "absolute", top: -40, bottom: -40,
        [side === "l" ? "right" : "left"]: 0, width: 9, background: mix(c, 0.22) }} />
    </div>
  );
  /* a rack upright: a steel post with bolt plates and lance slots */
  return (
    <div style={{ position: "absolute", top: -40, bottom: -40, width: ww, zIndex: z,
      [anchor]: -10, background: c, boxShadow: SH_D }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, [anchor]: 0, width: ww * 0.22,
        background: dark(c, 0.26) }} />
      <div style={{ position: "absolute", top: 0, bottom: 0,
        [side === "l" ? "right" : "left"]: 0, width: 8, background: mix(c, 0.24) }} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{ position: "absolute", top: 30 + i * 62, [anchor]: ww * 0.34,
          width: 14, height: 26, borderRadius: 3, background: dark(c, 0.36) }} />
      ))}
      {[120, 470, 720].map((ty) => (
        <div key={ty} style={{ position: "absolute", top: ty, [anchor]: -8, width: ww + 22,
          height: 20, borderRadius: 3, background: mix(c, 0.10) }} />
      ))}
    </div>
  );
};

/* ---------------------------------------------------------------------------
   IN-PANEL CHROME
   ------------------------------------------------------------------------ */

/** the mono slug along the deck — names the beat without competing for rank. */
export const Slug: React.FC<{ t: string; c?: string; z?: number; y?: number }> =
  ({ t, c = "#D6DCD2", z = 95, y = H - 44 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", zIndex: z,
    fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.30em", color: c,
    textShadow: "0 2px 6px rgba(0,0,0,0.62)" }}>{t}</div>
);

/** a dark-glass readout: mono label, status dot, a big number. */
export const Glass: React.FC<{ x: number; y: number; w: number; h: number; label: string;
  c?: string; f?: number; z?: number; children?: React.ReactNode }> =
  ({ x, y, w: ww, h: hh, label, c = "#C98A5E", f = 0, z = 70, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, borderRadius: 16,
    background: "linear-gradient(168deg,#1F2826 0%,#101715 100%)", boxShadow: SH_D, zIndex: z,
    border: "3px solid rgba(214,220,210,0.24)", overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34,
      background: "#161E1C", borderBottom: "2px solid rgba(214,220,210,0.16)" }} />
    <div style={{ position: "absolute", left: 14, top: 8, width: 11, height: 11, borderRadius: 6,
      background: c, opacity: 0.55 + 0.45 * Math.abs(Math.sin(f / 11)) }} />
    <div style={{ position: "absolute", left: 34, top: 8, fontFamily: MONO, fontWeight: 800,
      fontSize: 16, letterSpacing: "0.16em", color: "#93A099" }}>{label}</div>
    {children}
  </div>
);

/** a big number that MOVES to its value — never typeset at it. */
export const BigNum: React.FC<{ x: number; y: number; v: string; c?: string; size?: number;
  z?: number }> = ({ x, y, v, c = "#F2F4EA", size = 66, z = 72 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: size, lineHeight: 1, color: c,
    letterSpacing: "-0.02em", textShadow: "0 3px 10px rgba(0,0,0,0.55)" }}>{v}</div>
);

/** a stencilled plate that sits UNDER a card. ⛔ it must clear the card's RECT,
    not merely look below its content (reel 93 shipped that bug). */
export const Plaque: React.FC<{ x: number; y: number; t: string; hot?: string; s?: number;
  z?: number; c?: string }> = ({ x, y, t, hot, s = 1, z = 72, c = "#C98A5E" }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    padding: `${9 * s}px ${18 * s}px`, borderRadius: 6 * s,
    background: "#1F2826", border: `${3 * s}px solid ${c}`, boxShadow: SH,
    fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24 * s, color: "#EEF2E6",
    whiteSpace: "nowrap" }}>
    {t}{hot && <span style={{ color: c }}> {hot}</span>}
  </div>
);

/** the one shot in the reel that moves. ⛔ THE PUSH IS COMPUTED ON THE SHOT'S OWN
    FRAME, not the scene's — reel 95 shipped a per-shot push computed on the
    scene frame and it expired before its shot began. */
export const Push: React.FC<{ f: number; from?: number; to?: number; dur: number;
  children?: React.ReactNode }> = ({ f, from = 1, to = 1.045, dur, children }) => (
  <div style={{ position: "absolute", inset: 0,
    transform: `scale(${E(f, 0, dur, from, to)})`, transformOrigin: "50% 54%" }}>
    {children}
  </div>
);
