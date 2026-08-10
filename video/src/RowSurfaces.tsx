import React from "react";
import { Img, staticFile } from "remotion";
import { inter } from "./fonts";
import { Mascot, MONO } from "./SlopKit";
import { PAPER, INK, INK_L, MUTE, CLAY, GO, RED, GOLD, SH, SH_D, STATS, RB_MARK } from "./RowRituals";

/* =========================================================================
   REEL 91 "ROWBOAT" · THE BODY'S PLACES.

   ⛔ ONE PARAMETERIZED SURFACE, NOT FOURTEEN BACKDROPS. Reel 82 shipped nine
      bespoke rooms, seven of them interiors, and got back "they look like
      they're on the ship... I want to see them walking on the planets". The fix
      that worked was a single `Surface` taking a world kind, so every scene
      starts with sky + two ridge bands + ground + lip = 5 objects before a
      single prop lands, and no two places can accidentally share a palette.

   ⛔ EXTERIORS BY DEFAULT. Differently-named interiors count as ONE location.
      Only THE PASS is inside, and it spends the budget of a whole location.

   ⛔ EVERY PALETTE IS >= 25 LUMA FROM ITS NEIGHBOUR IN THE CUT, so each cut is
      a colour change as well as a place change. Matte paints, dark shadows,
      no glow, no washes, no neon.
   ========================================================================= */

export type Kind = "lawn" | "plaza" | "kerb" | "yard" | "street" | "cross"
                 | "build" | "apron" | "gate" | "dock" | "road" | "depot" | "terrace";

type Pal = { sky: string; far: string; mid: string; gnd: string; lip: string; hz: number };
export const PAL: Record<Kind, Pal> = {
  lawn:   { sky: "#EDF2F6", far: "#4A7A40", mid: "#3F6B37", gnd: "#74AC5E", lip: "#5F9349", hz: 352 },
  plaza:  { sky: "#C3D2DE", far: "#7C8A99", mid: "#5E6C7B", gnd: "#A9B2BB", lip: "#8E97A0", hz: 402 },
  kerb:   { sky: "#DCE6EE", far: "#C6A488", mid: "#B5977C", gnd: "#DDD6C8", lip: "#CFC7B7", hz: 430 },
  yard:   { sky: "#F2DFB8", far: "#C08A5E", mid: "#A87148", gnd: "#D9C093", lip: "#C4A97C", hz: 386 },
  street: { sky: "#E4D6CE", far: "#B4837A", mid: "#9C6A62", gnd: "#C6B6A6", lip: "#B0A08F", hz: 444 },
  cross:  { sky: "#BFD8D6", far: "#4E7A78", mid: "#3E6664", gnd: "#93B4AE", lip: "#7C9C97", hz: 372 },
  build:  { sky: "#E7D9BC", far: "#B09263", mid: "#96784C", gnd: "#C9B182", lip: "#B39C6E", hz: 398 },
  apron:  { sky: "#D3DCE0", far: "#6E8189", mid: "#576A72", gnd: "#A6B0B4", lip: "#8D989C", hz: 416 },
  gate:   { sky: "#CFE0D2", far: "#52795C", mid: "#40634C", gnd: "#8FB093", lip: "#78997C", hz: 380 },
  dock:   { sky: "#F0DDBE", far: "#C08F4E", mid: "#A6763A", gnd: "#D7BB8B", lip: "#C0A374", hz: 424 },
  road:   { sky: "#CDE0EC", far: "#8FA3AE", mid: "#74868F", gnd: "#B9BFC0", lip: "#A3A9AA", hz: 366 },
  depot:  { sky: "#B4C4D0", far: "#566677", mid: "#42505E", gnd: "#94A0AC", lip: "#7C8894", hz: 410 },
  terrace:{ sky: "#DCE4D8", far: "#5F7F5B", mid: "#4B6848", gnd: "#9DB294", lip: "#86A07E", hz: 392 },
};

/** the skyline band each world puts on its horizon — geometric, never a blob */
const BAND: Record<Kind, (c: string, i: number) => React.CSSProperties> = {
  lawn:   (c) => ({ background: c, borderRadius: "18px 18px 0 0" }),
  plaza:  (c, i) => ({ background: c, height: 128 + (i % 3) * 54 }),
  kerb:   (c) => ({ background: c }),
  yard:   (c, i) => ({ background: c, height: 92 + (i % 2) * 40, borderRadius: "10px 10px 0 0" }),
  street: (c, i) => ({ background: c, height: 150 + (i % 4) * 42 }),
  cross:  (c) => ({ background: c, clipPath: "polygon(0 100%, 26% 0, 74% 0, 100% 100%)" }),
  build:  (c, i) => ({ background: c, height: 110 + (i % 3) * 66 }),
  apron:  (c, i) => ({ background: c, height: 118 + (i % 2) * 50 }),
  gate:   (c) => ({ background: c, borderRadius: "22px 22px 0 0" }),
  dock:   (c, i) => ({ background: c, height: 134 + (i % 3) * 48 }),
  road:   (c) => ({ background: c, clipPath: "polygon(0 100%, 18% 0, 82% 0, 100% 100%)" }),
  depot:  (c, i) => ({ background: c, height: 126 + (i % 4) * 38, borderRadius: "6px 6px 0 0" }),
  terrace:(c, i) => ({ background: c, height: 96 + (i % 3) * 52,
                       clipPath: "polygon(0 100%, 0 22%, 40% 0, 100% 30%, 100% 100%)" }),
};

/* ---------------------------------------------------------------------------
   BAND DETAIL. Alex on the first cut: "there needs to be ... interesting
   backgrounds". A flat trapezoid on the horizon is a silhouette, not a place —
   what makes a band read as a BUILDING is lit windows, as a TREELINE is trunks,
   as a YARD is stacked crates. This runs INSIDE the far band, so it costs no new
   top-level objects and cannot compete with the scene's hero.
   ------------------------------------------------------------------------ */
type Detail = "windows" | "trunks" | "stacks" | "vents" | "none";
const DETAIL: Record<Kind, Detail> = {
  lawn: "trunks", plaza: "windows", kerb: "windows", yard: "stacks",
  street: "windows", cross: "trunks", build: "stacks", apron: "vents",
  gate: "trunks", dock: "stacks", road: "none", depot: "windows",
  terrace: "trunks",
};

const Inner: React.FC<{ d: Detail; i: number; lip: string; sky: string }> = ({ d, i, lip, sky }) => {
  if (d === "none") return null;
  if (d === "windows") return (<>
    {Array.from({ length: 12 }, (_, j) => (
      <div key={j} style={{ position: "absolute", left: 14 + (j % 3) * 34, top: 18 + Math.floor(j / 3) * 36,
        width: 22, height: 24, background: (i + j) % 4 ? sky : lip, opacity: (i + j) % 4 ? 0.5 : 0.9 }} />
    ))}
  </>);
  if (d === "trunks") return (<>
    <div style={{ position: "absolute", left: 52, bottom: 0, width: 17, height: 46,
      background: "rgba(30,26,20,0.34)" }} />
  </>);
  if (d === "stacks") return (<>
    {Array.from({ length: 6 }, (_, j) => (
      <div key={j} style={{ position: "absolute", left: 10 + (j % 2) * 56, bottom: Math.floor(j / 2) * 34,
        width: 50, height: 30, background: lip, opacity: 0.55,
        borderBottom: "3px solid rgba(30,26,20,0.22)" }} />
    ))}
  </>);
  return (<>
    {Array.from({ length: 3 }, (_, j) => (
      <div key={j} style={{ position: "absolute", left: 20 + j * 32, top: 14, width: 20, height: 62,
        borderRadius: 10, background: lip, opacity: 0.6 }} />
    ))}
  </>);
};

/* ---------------------------------------------------------------------------
   STREET FURNITURE. Alex, twice: "each of the scenes needs to be way more
   detailed and interesting". Measured on reel 82, the difference between a scene
   that reads as a place and one that reads as a backdrop was a median object
   count of 9 vs 19. Rather than hand-dressing fourteen scenes, every world gets
   a furniture list here, so the count clears the bar BEFORE any hero prop lands.

   ⛔ It all sits BEHIND the hero (z 6..9) and in the outer thirds. Detail that
      competes with the subject is the crowded-frame failure, not richness.
   ------------------------------------------------------------------------- */
type Item = [string, number, number, number];   // kind, x, yOffsetFromHorizon, scale
/* ⛔ 4-5 pieces per world was not enough — Alex asked twice for "way more
   detailed and interesting". Reel 82 measured the difference between a place and
   a backdrop at a median object count of 9 vs 19, so every world now carries
   8-9, including MIDGROUND structures (shelter / mast / board / stack) that give
   the band between the horizon and the hero something in it. Still all in the
   outer thirds and still behind everything the scene is about. */
const FURN: Record<Kind, Item[]> = {
  lawn:    [["tree", 20, -196, 1], ["tree", 946, -166, .85], ["bench", 828, 26, .9],
            ["urn", 178, 44, .7], ["board", 892, -96, .8], ["urn", 754, 40, .6],
            ["tree", 596, -150, .5], ["bench", 62, 40, .6]],
  plaza:   [["lamp", 36, -236, 1], ["shelter", 690, -70, 1], ["bollard", 246, 50, .8],
            ["bollard", 318, 50, .8], ["planter", 848, 12, 1], ["lamp", 966, -214, .9],
            ["mast", 470, -190, .8], ["bollard", 390, 50, .8], ["bin", 158, 22, .7]],
  kerb:    [["lamp", 22, -246, 1], ["bin", 902, 10, .9], ["bollard", 812, 28, .8],
            ["board", 442, -104, .8], ["bike", 232, 26, .9], ["hydrant", 132, 22, .8],
            ["shelter", 620, -64, .9], ["bollard", 976, 28, .8]],
  yard:    [["pallet", 18, 44, 1], ["barrel", 114, 20, .9], ["crateS", 906, 26, 1],
            ["fence", 690, -74, 1], ["cone", 850, 56, .8], ["stack", 440, -128, .9],
            ["barrel", 802, 40, .8], ["pallet", 962, 50, .8]],
  street:  [["lamp", 30, -256, 1], ["bin", 950, 14, .9], ["bollard", 112, 34, .8],
            ["cone", 868, 44, .7], ["hydrant", 200, 26, .8], ["board", 760, -110, .8],
            ["bike", 620, 22, .8], ["bollard", 900, 34, .8]],
  cross:   [["tree", 14, -206, .95], ["post", 934, -146, 1], ["bollard", 142, 38, .8],
            ["tree", 986, -176, .8], ["board", 108, -120, .7], ["urn", 812, 34, .7],
            ["bench", 736, 30, .7], ["tree", 262, -150, .55]],
  build:   [["fence", 10, -80, 1], ["cone", 18, 50, .9], ["barrel", 938, 22, 1],
            ["pallet", 834, 48, .9], ["fence", 872, -80, 1], ["stack", 128, -140, .9],
            ["mast", 700, -210, .8], ["cone", 268, 52, .7], ["crateS", 962, 34, .8]],
  apron:   [["bollard", 28, 40, .9], ["barrel", 934, 18, 1], ["lamp", 968, -226, .9],
            ["cone", 122, 48, .8], ["shelter", 118, -70, .9], ["stack", 812, -120, .8],
            ["bollard", 340, 40, .8], ["hydrant", 706, 24, .8]],
  gate:    [["tree", 10, -216, 1], ["urn", 168, 38, .8], ["urn", 856, 38, .8],
            ["tree", 972, -196, .9], ["bench", 254, 34, .7], ["board", 72, -110, .7],
            ["tree", 700, -160, .6], ["urn", 604, 34, .6]],
  dock:    [["bollard", 24, 44, 1], ["crateS", 910, 24, 1], ["barrel", 828, 38, .9],
            ["post", 142, -126, .8], ["cone", 992, 52, .7], ["stack", 646, -134, .9],
            ["mast", 372, -196, .7], ["pallet", 216, 46, .8]],
  road:    [["post", 34, -166, .9], ["cone", 122, 44, .8], ["cone", 894, 44, .8],
            ["post", 962, -156, .9], ["board", 700, -120, .8], ["mast", 250, -186, .7],
            ["cone", 508, 48, .7], ["bollard", 806, 36, .8]],
  depot:   [["fence", 6, -78, 1], ["barrel", 22, 30, 1], ["pallet", 906, 44, 1],
            ["crateS", 830, 18, .9], ["lamp", 974, -236, .9], ["stack", 246, -142, .9],
            ["shelter", 592, -76, .9], ["cone", 152, 48, .7]],
  terrace: [["urn", 18, 34, .9], ["tree", 950, -206, .9], ["bench", 96, 38, .8],
            ["urn", 888, 34, .9], ["board", 176, -104, .7], ["tree", 30, -180, .6],
            ["bench", 786, 32, .7], ["urn", 704, 32, .6]],
};

/** ⛔ FURNITURE DRAWN IN `mid` IS INVISIBLE. First pass used the near-band colour
    for every piece, which sits within ~15 luma of the ground it stands on, so a
    lamp post read as a smudge. Structures get a darkened tone; the same trap as
    the cream-cone-on-cream-wall one. */
const mix = (a: string, b: string, t: number) => {
  const n = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = n(a), [r2, g2, b2] = n(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${c(r1, r2)},${c(g1, g2)},${c(b1, b2)})`;
};

const Piece: React.FC<{ it: Item; hz: number; lip: string; mid: string }> =
  ({ it, hz, lip: lipIn, mid: midIn }) => {
  const mid = mix(midIn, "#241E18", 0.45);
  const lip = mix(lipIn, "#241E18", 0.18);
  const [t, x, dy, s] = it;
  /* ⛔ EVERY PIECE DRAWS UPWARD FROM ITS BASE (`top: y - h*s`), so `y` is where it
     STANDS. A negative dy therefore put the base ABOVE the horizon — i.e. in the
     sky — and every tall piece in the table (lamps, trees, masts, boards) had
     one. They read as poles hanging in mid-air. A negative dy is now treated as
     "further back", which in this flat perspective means standing just below the
     horizon line, not floating above it. */
  const y = hz + (dy < 0 ? Math.round(-dy / 14) : dy);
  const box = (w: number, h: number, c: string, r = 4) =>
    ({ position: "absolute" as const, left: x, top: y - h * s, width: w * s, height: h * s,
       background: c, borderRadius: r * s, zIndex: 8 });
  const SHD = "rgba(30,26,20,0.20)";
  if (t === "lamp") return (<>
    <div style={box(11, 250, mid)} />
    <div style={{ ...box(76, 13, mid, 6), top: y - 250 * s }} />
    <div style={{ ...box(40, 22, lip, 8), left: x + 44 * s, top: y - 242 * s }} />
  </>);
  if (t === "bollard") return <div style={box(20, 58, mid, 9)} />;
  if (t === "post") return (<>
    <div style={box(13, 150, mid)} />
    <div style={{ ...box(66, 40, lip, 5), left: x - 26 * s, top: y - 150 * s }} />
  </>);
  if (t === "bin") return (<>
    <div style={box(58, 76, mid, 7)} />
    <div style={{ ...box(70, 12, lip, 5), left: x - 6 * s, top: y - 84 * s }} />
  </>);
  if (t === "planter") return (<>
    <div style={box(96, 46, mid, 6)} />
    <div style={{ ...box(70, 54, "#5F9349", 22), left: x + 13 * s, top: y - 98 * s }} />
  </>);
  if (t === "bench") return (<>
    <div style={box(122, 15, mid, 5)} />
    <div style={{ ...box(13, 34, mid, 3), top: y - 34 * s }} />
    <div style={{ ...box(13, 34, mid, 3), left: x + 108 * s, top: y - 34 * s }} />
  </>);
  if (t === "tree") return (<>
    <div style={{ ...box(24, 122, "#6B5540", 4) }} />
    <div style={{ ...box(150, 168, "#4A7A40", 18), left: x - 63 * s, top: y - 268 * s }} />
    <div style={{ ...box(112, 96, "#3F6B37", 16), left: x - 44 * s, top: y - 236 * s }} />
  </>);
  if (t === "urn") return (<>
    <div style={box(52, 40, lip, 6)} />
    <div style={{ ...box(66, 15, mid, 4), left: x - 7 * s, top: y - 55 * s }} />
    <div style={{ ...box(38, 34, "#C96442", 12), left: x + 7 * s, top: y - 86 * s }} />
  </>);
  if (t === "barrel") return (<>
    <div style={box(56, 82, mid, 7)} />
    <div style={{ ...box(56, 9, lip, 2), top: y - 66 * s }} />
    <div style={{ ...box(56, 9, lip, 2), top: y - 30 * s }} />
  </>);
  if (t === "pallet") return (<>
    <div style={box(126, 14, mid, 3)} />
    <div style={{ ...box(126, 14, mid, 3), top: y - 30 * s }} />
    <div style={{ ...box(126, 10, lip, 3), top: y - 46 * s }} />
  </>);
  if (t === "crateS") return (<>
    <div style={box(96, 74, mid, 5)} />
    <div style={{ ...box(96, 11, SHD, 0), top: y - 58 * s }} />
    <div style={{ ...box(84, 58, lip, 5), left: x + 6 * s, top: y - 128 * s }} />
  </>);
  if (t === "cone") return (<>
    <div style={{ ...box(46, 12, "#C96442", 3) }} />
    <div style={{ position: "absolute", left: x + 8 * s, top: y - 62 * s, width: 30 * s,
      height: 50 * s, background: "#C96442", zIndex: 8,
      clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
  </>);
  if (t === "shelter") return (<>
    <div style={{ ...box(14, 150, mid, 2) }} />
    <div style={{ ...box(14, 150, mid, 2), left: x + 210 * s }} />
    <div style={{ ...box(238, 18, mid, 5), top: y - 168 * s }} />
    <div style={{ ...box(206, 96, lip, 4), left: x + 14 * s, top: y - 148 * s }} />
    <div style={{ ...box(110, 14, mid, 4), left: x + 62 * s, top: y - 44 * s }} />
  </>);
  if (t === "mast") return (<>
    <div style={{ ...box(10, 220, mid, 2) }} />
    <div style={{ ...box(70, 46, "#C96442", 3), left: x + 10 * s, top: y - 220 * s }} />
    <div style={{ ...box(44, 9, mid, 3), left: x - 17 * s }} />
  </>);
  if (t === "board") return (<>
    <div style={{ ...box(13, 96, mid, 2) }} />
    <div style={{ ...box(13, 96, mid, 2), left: x + 118 * s }} />
    <div style={{ ...box(144, 90, lip, 5), top: y - 186 * s }} />
    <div style={{ ...box(112, 12, mid, 3), left: x + 16 * s, top: y - 166 * s }} />
    <div style={{ ...box(84, 12, mid, 3), left: x + 16 * s, top: y - 142 * s }} />
  </>);
  if (t === "stack") return (<>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} style={{ ...box(104, 46, i % 2 ? mid : lip, 4),
        left: x + (i % 2) * 9 * s, top: y - (48 + i * 48) * s }} />
    ))}
    <div style={{ ...box(124, 14, mid, 3), left: x - 10 * s }} />
  </>);
  if (t === "hydrant") return (<>
    <div style={{ ...box(28, 54, "#C96442", 6) }} />
    <div style={{ ...box(46, 12, "#C96442", 4), left: x - 9 * s, top: y - 62 * s }} />
    <div style={{ ...box(46, 11, mid, 3), left: x - 9 * s, top: y - 34 * s }} />
  </>);
  if (t === "bike") return (<>
    <div style={{ ...box(38, 38, mid, 19) }} />
    <div style={{ ...box(38, 38, mid, 19), left: x + 54 * s }} />
    <div style={{ ...box(78, 9, mid, 3), left: x + 8 * s, top: y - 44 * s }} />
    <div style={{ ...box(9, 34, mid, 3), left: x + 66 * s, top: y - 62 * s }} />
  </>);
  /* fence */
  return (<>
    <div style={{ ...box(132, 11, mid, 3), top: y - 78 * s }} />
    <div style={{ ...box(132, 11, mid, 3), top: y - 34 * s }} />
    <div style={{ ...box(12, 92, mid, 2) }} />
    <div style={{ ...box(12, 92, mid, 2), left: x + 120 * s }} />
  </>);
};

/* ---------------------------------------------------------------------------
   THE FOREGROUND RANK, and THE SKY.

   The hook's shot C measured 2.24 with a filled bottom third and a completely
   static top 60% — sky, hedge and railing never changed. Adding more mid-ground
   props did nothing; putting BIG SHAPES cropped by the panel floor and something
   CROSSING THE SKY took it to 2.81. Every body scene had the same shape, so
   every world now gets both.

   ⛔ Foreground pieces live in the OUTER EDGES only. A silhouette across the
      middle would cover the scene's hero, which is the crowded-frame failure.
   ------------------------------------------------------------------------- */
/* ⛔ EXTREME EDGES ONLY. The first pass put these at x -70..-104 and 908..952,
   which on a 1012px panel is well inside the frame — in S13 and S14 they landed
   straight across the repo card and cropped the word ROWBOAT. A foreground piece
   may occupy roughly the outer 70px and no more. */
const FORE: Record<Kind, Item[]> = {
  lawn:    [["tree", -150, 232, 2.1], ["urn", 1000, 250, 1.9]],
  plaza:   [["planter", -140, 236, 2.2], ["bollard", 1004, 250, 2.4]],
  kerb:    [["bin", -128, 244, 2.3], ["hydrant", 1006, 250, 2.2]],
  yard:    [["crateS", -166, 250, 2.0], ["barrel", 1000, 248, 2.1]],
  street:  [["bin", -132, 246, 2.2], ["bollard", 1006, 250, 2.5]],
  cross:   [["tree", -158, 236, 2.0], ["bollard", 1006, 250, 2.4]],
  build:   [["pallet", -190, 252, 2.2], ["cone", 1000, 250, 2.4]],
  apron:   [["barrel", -132, 248, 2.1], ["bollard", 1006, 250, 2.4]],
  gate:    [["urn", -136, 244, 2.1], ["tree", 992, 232, 2.0]],
  dock:    [["bollard", -128, 248, 2.4], ["crateS", 986, 250, 2.0]],
  road:    [["cone", -122, 250, 2.6], ["cone", 1000, 250, 2.6]],
  depot:   [["barrel", -136, 248, 2.1], ["pallet", 986, 252, 2.2]],
  terrace: [["urn", -136, 244, 2.1], ["bench", 978, 250, 2.0]],
};

/** what crosses the sky, so the top third is never parked */
type SkyKind = "birds" | "cloud" | "wire" | "none";
const SKYS: Record<Kind, SkyKind> = {
  lawn: "birds", plaza: "wire", kerb: "wire", yard: "cloud", street: "wire",
  cross: "birds", build: "cloud", apron: "wire", gate: "birds", dock: "birds",
  road: "cloud", depot: "wire", terrace: "birds",
};

const Sky: React.FC<{ f: number; kind: SkyKind; hz: number; mid: string }> =
  ({ f, kind, hz, mid }) => {
  if (kind === "none") return null;
  if (kind === "wire") return (<>
    {/* a catenary and the things sitting on it — urban skies are never empty */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 128, height: 7,
      background: mix(mid, "#241E18", 0.4), opacity: 0.55, zIndex: 7 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 176, height: 6,
      background: mix(mid, "#241E18", 0.4), opacity: 0.4, zIndex: 7 }} />
    {Array.from({ length: 7 }, (_, i) => (
      <div key={i} style={{ position: "absolute", zIndex: 7,
        left: ((i * 168 + f * 0.5) % 1180) - 84, top: 112,
        width: 17, height: 23, borderRadius: 5, background: mix(mid, "#241E18", 0.5) }} />
    ))}
  </>);
  if (kind === "cloud") return (<>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} style={{ position: "absolute", zIndex: 7,
        left: ((i * 268 + f * (1.1 + (i % 3) * 0.4)) % 1420) - 240,
        top: 112 + (i % 3) * 52, width: 210 + (i % 2) * 76, height: 46,
        borderRadius: 24, background: "#FFFFFF", opacity: 0.62 }} />
    ))}
  </>);
  return (<>
    {Array.from({ length: 5 }, (_, i) => {
      const bx = ((f * (1.4 + i * 0.42) + i * 296) % 1300) - 140;
      const by = 118 + i * 38 + Math.sin(f / 19 + i) * 10;
      return (
        <div key={i} style={{ position: "absolute", left: bx, top: by, width: 32,
          height: 12, zIndex: 7 }}>
          <div style={{ position: "absolute", left: 0, width: 16, height: 6,
            background: mix(mid, "#241E18", 0.35),
            transform: `rotate(${-20 - Math.sin(f / 3 + i) * 10}deg)` }} />
          <div style={{ position: "absolute", left: 15, width: 16, height: 6,
            background: mix(mid, "#241E18", 0.35),
            transform: `rotate(${20 + Math.sin(f / 3 + i) * 10}deg)` }} />
        </div>
      );
    })}
  </>);
};

/** sky + far band + near band + ground + lip + grit + furniture + foreground. */
export const Site: React.FC<{ f: number; k: Kind; fore?: boolean;
  children?: React.ReactNode }> = ({ f, k, fore = true, children }) => {
  const p = PAL[k];
  const det = DETAIL[k];
  return (<>
    <div style={{ position: "absolute", inset: 0, background: p.sky, zIndex: 1 }} />
    {/* far band, with its own interior detail */}
    {Array.from({ length: 9 }, (_, i) => (
      <div key={`fb${i}`} style={{ position: "absolute", left: -30 + i * 128, bottom: 792 - p.hz,
        width: 122, height: 150, zIndex: 2, overflow: "hidden", ...BAND[k](p.far, i) }}>
        <Inner d={det} i={i} lip={p.lip} sky={p.sky} />
      </div>
    ))}
    {/* near band, darker and shorter, so the horizon has two planes in it */}
    {Array.from({ length: 7 }, (_, i) => (
      <div key={`nb${i}`} style={{ position: "absolute", left: -50 + i * 166, bottom: 792 - p.hz,
        width: 132, height: 92, zIndex: 3, ...BAND[k](p.mid, i + 1) }} />
    ))}
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz - 9, height: 11,
      background: p.mid, zIndex: 4 }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: p.hz, bottom: 0,
      background: p.gnd, zIndex: 4 }} />
    {/* ground stripes — depth without a single new object */}
    {Array.from({ length: 8 }, (_, i) => (
      <div key={`gs${i}`} style={{ position: "absolute", left: 0, right: 0,
        top: p.hz + i * 58, height: 27, background: p.lip, opacity: 0.6, zIndex: 5 }} />
    ))}
    {/* ground texture — grit, tufts and seams. Twelve marks that cost nothing and
        stop the lower third reading as a flat colour field. */}
    {Array.from({ length: 12 }, (_, i) => {
      const gx = (i * 173) % 1012, gy = p.hz + 26 + ((i * 97) % (770 - p.hz));
      return (
        <div key={`gr${i}`} style={{ position: "absolute", left: gx, top: gy,
          width: 16 + (i % 4) * 13, height: 6 + (i % 3) * 3, borderRadius: 4,
          background: mix(p.lip, "#241E18", 0.22), opacity: 0.5, zIndex: 6 }} />
      );
    })}
    {/* the furniture: 4-5 more objects per world, in the outer thirds, behind
        anything the scene actually cares about */}
    {FURN[k].map((it, i) => (
      <Piece key={i} it={it} hz={p.hz} lip={p.lip} mid={p.mid} />
    ))}
    <Sky f={f} kind={SKYS[k]} hz={p.hz} mid={p.mid} />
    {children}
    {/* in FRONT of the scene, cropped by the panel floor, edges only */}
    <div style={{ position: "absolute", inset: 0, zIndex: 78,
      display: fore ? undefined : "none" }}>
      {FORE[k].map((it, i) => (
        <Piece key={`fg${i}`} it={it} hz={p.hz} lip={mix(p.lip, "#241E18", 0.34)}
               mid={mix(p.mid, "#241E18", 0.34)} />
      ))}
    </div>
  </>);
};

/* =========================================================================
   SHARED BODY FURNITURE
   ========================================================================= */

/** the scene's ONE text chip. Everything else has to be in the picture. */
export const Chip: React.FC<{ t: string; y?: number; c?: string; fg?: string; s?: number;
  z?: number; t2?: number }> = ({ t, y = 664, c = INK, fg = PAPER, s = 1, z = 74, t2 = 1 }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
    justifyContent: "center", zIndex: z }}>
    <div style={{ padding: `${14 * s}px ${34 * s}px`, borderRadius: 14 * s, background: c,
      boxShadow: SH_D, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44 * s,
      letterSpacing: "-0.01em", color: fg, whiteSpace: "nowrap",
      transform: `scale(${Math.max(0.02, t2)})` }}>{t}</div>
  </div>
);

/** a walking mascot. ⛔ The body is a rigid box and CANNOT lean — swing the leg
    groups in opposition, bob on the plant, and leave prints. */
export const Walker: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  who?: string; step?: number; carry?: React.ReactNode; flip?: boolean }> =
  ({ f, x, y, s = 1, z = 40, who = "suit", step = 1, carry, flip }) => {
  const ph = f * 0.34 * step;
  const bob = Math.abs(Math.cos(ph)) * 7 * step;
  return (
    <div style={{ position: "absolute", left: x, top: y - bob, zIndex: z,
      transform: flip ? "scaleX(-1)" : undefined }}>
      <Mascot lf={f} size={200 * s} nodAmp={0} nodSpeed={40} {...({ [who]: 1 } as any)} />
      {[0, 1].map((i) => (
        <div key={i} style={{ position: "absolute", left: (52 + i * 62) * s,
          top: (176 - Math.max(0, Math.sin(ph + i * Math.PI)) * 17) * s,
          width: 34 * s, height: 22 * s, borderRadius: 6 * s, background: "#4B3A2A" }} />
      ))}
      {carry && <div style={{ position: "absolute", left: 150 * s, top: 44 * s }}>{carry}</div>}
    </div>
  );
};

/** a plain crate — "the company", "the tool", whatever is being moved */
export const Crate: React.FC<{ x: number; y: number; s?: number; z?: number; label?: string;
  c?: string; t?: number }> = ({ x, y, s = 1, z = 34, label, c = "#B98A55", t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <div style={{ width: 250 * s, height: 186 * s, borderRadius: 8 * s, background: c,
      boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 0, top: 22 * s, width: 250 * s, height: 15 * s,
      background: "rgba(0,0,0,0.16)" }} />
    <div style={{ position: "absolute", left: 0, top: 148 * s, width: 250 * s, height: 15 * s,
      background: "rgba(0,0,0,0.16)" }} />
    {label && (
      <div style={{ position: "absolute", left: 0, top: 66 * s, width: 250 * s, textAlign: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 34 * s, letterSpacing: "0.02em",
        color: "#33291C", whiteSpace: "nowrap" }}>{label}</div>
    )}
  </div>
);

/** a placard that SLAMS on: SOLD, CLOSED, TESTED, FREE. One mechanism, reused. */
export const Placard: React.FC<{ x: number; y: number; t: string; s?: number; z?: number;
  c?: string; fg?: string; drop: number; rot?: number }> =
  ({ x, y, t, s = 1, z = 60, c = RED, fg = PAPER, drop, rot = -8 }) => (
  <div style={{ position: "absolute", left: x, top: y - (1 - drop) * 240, zIndex: z,
    opacity: drop > 0.02 ? 1 : 0,
    transform: `rotate(${rot * drop}deg) scale(${0.7 + drop * 0.3})`, transformOrigin: "50% 50%" }}>
    <div style={{ padding: `${16 * s}px ${40 * s}px`, background: c, boxShadow: SH_D,
      border: `${7 * s}px solid ${fg}`, fontFamily: inter.fontFamily, fontWeight: 900,
      fontSize: 68 * s, letterSpacing: "0.06em", color: fg, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** a shopfront that can shutter. The high street's whole mechanism. */
export const Shopfront: React.FC<{ x: number; y: number; w?: number; h?: number; s?: number;
  z?: number; name: string; shut: number; children?: React.ReactNode }> =
  ({ x, y, w = 250, h = 300, s = 1, z = 30, name, shut, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w * s, height: h * s, zIndex: z }}>
    <div style={{ position: "absolute", inset: 0, background: "#3B3630", borderRadius: 6 * s }} />
    {/* the INTERIOR. ⛔ A shutter over an empty cream box reads as a storage unit;
        the beat only lands if you saw what was working in there first. */}
    <div style={{ position: "absolute", left: 10 * s, top: 10 * s, right: 10 * s,
      bottom: 10 * s, background: "#EFE7D8", overflow: "hidden" }}>{children}</div>
    <div style={{ position: "absolute", left: 0, top: -46 * s, width: w * s, height: 46 * s,
      background: "#4E6B4C", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 22 * s, letterSpacing: "0.06em",
      color: "#EFE7D8", whiteSpace: "nowrap", overflow: "hidden" }}>{name}</div>
    {/* the shutter, rolling down from the head */}
    <div style={{ position: "absolute", left: 0, top: 0, width: w * s, height: h * s * shut,
      background: "#8C8579", overflow: "hidden" }}>
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: i * 21 * s,
          height: 8 * s, background: "#7A7469" }} />
      ))}
    </div>
  </div>
);

/** the real mark, dark on light. ⛔ MONOCHROME brand — never tint it. */
export const Brand: React.FC<{ x: number; y: number; s?: number; z?: number; t?: number;
  word?: boolean }> = ({ x, y, s = 1, z = 60, t = 1, word = true }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 18 * s,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "0% 50%" }}>
    <div style={{ width: 118 * s, height: 118 * s, borderRadius: 27 * s, overflow: "hidden",
      background: "#FFFFFF", boxShadow: SH_D }}>
      <Img src={staticFile(RB_MARK)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    {word && <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 76 * s,
      letterSpacing: "-0.03em", color: INK }}>rowboat</div>}
  </div>
);

/** an agent that lands, with the real MCP mark it is wired to */
export const Unit: React.FC<{ f: number; x: number; y: number; s?: number; z?: number;
  who?: string; tool?: string; t?: number }> =
  ({ f, x, y, s = 1, z = 40, who = "glasses", tool, t = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 100%" }}>
    <Mascot lf={f} size={172 * s} cheer={0.5} nodAmp={3} nodSpeed={11}
            {...({ [who]: 1 } as any)} />
    {tool && (
      <div style={{ position: "absolute", left: 56 * s, top: 160 * s, width: 62 * s,
        height: 62 * s, borderRadius: 16 * s, background: PAPER, boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(`logos/${tool}.svg`)}
             style={{ width: 36 * s, height: 36 * s, objectFit: "contain" }} />
      </div>
    )}
  </div>
);

/** the repo card — every figure on it is checkable against the README */
export const Repo: React.FC<{ x: number; y: number; w?: number; s?: number; z?: number;
  t?: number; stars?: number }> = ({ x, y, w = 860, s = 1, z = 62, t = 1, stars = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, zIndex: z,
    borderRadius: 26 * s, background: PAPER, boxShadow: SH_D, padding: `${28 * s}px ${32 * s}px`,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%" }}>
    <Brand x={0} y={0} s={0.74 * s} z={2} />
    <div style={{ height: 112 * s }} />
    <div style={{ display: "flex", alignItems: "center", gap: 16 * s }}>
      {/* the mark that makes the number mean something */}
      <Img src={staticFile("logos/github.svg")}
           style={{ width: 66 * s, height: 66 * s, objectFit: "contain" }} />
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 88 * s,
        lineHeight: 1, letterSpacing: "-0.05em", color: INK, fontVariantNumeric: "tabular-nums" }}>
        &#9733; {Math.round(16974 * Math.min(1, stars)).toLocaleString()}
      </div>
      <div style={{ padding: `${9 * s}px ${19 * s}px`, borderRadius: 12 * s, background: "#EFE7D8",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26 * s,
        letterSpacing: "0.08em", color: INK_L, whiteSpace: "nowrap" }}>{STATS.license}</div>
      <div style={{ marginLeft: "auto", padding: `${12 * s}px ${26 * s}px`, borderRadius: 14 * s,
        background: GO, fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 44 * s,
        color: PAPER }}>FREE</div>
    </div>
  </div>
);

/* =========================================================================
   THE APP WINDOW.

   Alex on the first cut: "when there is ui typing then the ui needs to be way
   more realistic and interesting ... more geared towards our target audience".
   The first pass drew a cream card with a caret in it, which is a caption, not
   software. This audience uses these tools every day, so the window has to have
   the parts they'd expect: chrome with traffic lights, a workspace rail with
   live status, a real message thread, a composer with a send affordance, a model
   chip, and the MCP marks along the bottom.

   ⛔ DARK. It is the only dark object in a reel of bright exteriors, which is
      exactly why it reads as a screen rather than another prop.
   ⛔ ONLY THE MCPs THE README ACTUALLY NAMES go on the tool rail. An integration
      the product does not have is an invented on-screen fact.
   ========================================================================= */
/* ⛔ NOT NEON. Alex: "a lot more realistic, not so much neon colors". A real dark
   IDE is near-monochrome — many closely-spaced greys, ONE accent, and status
   colours that are DESATURATED rather than LED-bright. The first pass had a
   #57B76B green, a #6C8FD0 blue and pure #FFFFFF logo tiles all glowing off a
   near-black ground, which is what read as neon. */
const UI = {
  bg: "#151A21", chrome: "#1D232C", rail: "#191F27", act: "#11151B",
  line: "#2C333D", line2: "#232932",
  ink: "#DCE2EA", dim: "#8A94A2", faint: "#5A6472",
  accent: "#C96442", ok: "#6E8F72", info: "#7C8CA2",
  tile: "#F1EEE8",
};
export const MCP = ["slack", "linear", "jira", "github"];
/** local 0..1 ramp — the window is drawn from a raw frame, not a Sequence */
const E2 = (f: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (f - a) / Math.max(1, b - a)));

/* the log lines the strip streams. ⛔ NO TIMINGS AND NO COUNTS — "done in 2.8s"
   or "24 messages" would be a performance claim about someone else's product
   that nothing sourced backs. Structure only: what called what, and a handoff. */
const LOG: [string, string, string][] = [
  ["agent", "support triage", "started"],
  ["mcp", "slack", "conversations.history"],
  ["mcp", "slack", "ok"],
  ["flow", "handoff", "inbox reader"],
  ["mcp", "linear", "issue.create"],
  ["mcp", "linear", "ok"],
  ["flow", "handoff", "escalation"],
  ["mcp", "jira", "issue.transition"],
  ["agent", "run", "complete"],
];
const LOGC: Record<string, string> = { agent: "#C96442", mcp: "#6E8F72", flow: "#7C8CA2" };

export const AppWindow: React.FC<{
  f: number; x: number; y: number; w?: number; h?: number; z?: number;
  typed: string; caret?: boolean; sent?: number; agents?: string[]; t?: number;
}> = ({ f, x, y, w = 900, h = 540, z = 50, typed, caret = true, sent = 0,
        agents = ["support triage", "inbox reader", "escalation", "notify"], t = 1 }) => {
  /* ⛔ AN ACTIVITY BAR. "more realistic" for this audience means the chrome they
     actually sit in all day — an icon strip down the left with one active tab,
     a breadcrumb, and a scrollbar. Without it the window read as a diagram of an
     app rather than an app. */
  const ACT = 46, RAIL = 168, INSP = 208, TOP = 44, BODY = 292, LOGH = 92, COMP = 76;
  const cvX = ACT + RAIL, cvW = w - ACT - RAIL - INSP;
  const pulse = 0.55 + 0.45 * Math.abs(Math.sin(f / 11));
  const px = E2(f, 30, 66), pressed = f > 66 && f < 74;
  const shown = Math.min(LOG.length, Math.max(0, Math.floor((f - 6) / 3.4)));
  /* the graph branches: 0 -> 1, 0 -> 2, 2 -> 3 */
  const NODE = [{ x: 16, y: 30 }, { x: 176, y: 6 }, { x: 176, y: 112 }, { x: 336, y: 112 }];
  const EDGE: [number, number][] = [[0, 1], [0, 2], [2, 3]];
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h, zIndex: z,
      borderRadius: 18, background: UI.bg, overflow: "hidden",
      boxShadow: "0 30px 60px -18px rgba(18,22,28,0.62), 0 10px 24px rgba(18,22,28,0.4)",
      border: `2px solid ${UI.line}`,
      transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%" }}>

      {/* ---- title bar ---- */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: TOP,
        background: UI.chrome, borderBottom: `2px solid ${UI.line}`, display: "flex",
        alignItems: "center", paddingLeft: 15, gap: 8 }}>
        {["#E0655A", "#E2B04A", UI.ok].map((c) => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div style={{ marginLeft: 13, width: 24, height: 24, borderRadius: 7, overflow: "hidden",
          background: UI.tile }}>
          <Img src={staticFile(RB_MARK)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 18,
          color: UI.dim }}>rowboat &nbsp;&#183;&nbsp; my workspace</div>
        <div style={{ marginLeft: "auto", marginRight: 14, padding: "5px 11px", borderRadius: 7,
          background: UI.line2, fontFamily: MONO, fontWeight: 700, fontSize: 14,
          color: UI.dim }}>&#8984;K</div>
      </div>

      {/* ---- activity bar ---- */}
      <div style={{ position: "absolute", left: 0, top: TOP, bottom: 0, width: ACT,
        background: UI.act, borderRight: `2px solid ${UI.line2}`, paddingTop: 10 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ position: "relative", height: 42, display: "flex",
            alignItems: "center", justifyContent: "center" }}>
            {i === 0 && <div style={{ position: "absolute", left: 0, top: 9, bottom: 9,
              width: 2, background: UI.accent }} />}
            {i === 0 ? (
              <div style={{ width: 17, height: 17, border: `2px solid ${UI.ink}`,
                borderRadius: 4 }} />
            ) : i === 1 ? (<>
              <div style={{ width: 17, height: 3, background: UI.faint }} />
              <div style={{ position: "absolute", width: 11, height: 3, top: 24,
                background: UI.faint }} />
            </>) : i === 2 ? (
              <div style={{ width: 15, height: 15, borderRadius: "50%",
                border: `2px solid ${UI.faint}` }} />
            ) : i === 3 ? (
              <div style={{ width: 16, height: 16, background: UI.faint,
                clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)" }} />
            ) : (
              <div style={{ width: 16, height: 12, borderTop: `3px solid ${UI.faint}`,
                borderBottom: `3px solid ${UI.faint}` }} />
            )}
          </div>
        ))}
      </div>

      {/* ---- workspace rail ---- */}
      <div style={{ position: "absolute", left: ACT, top: TOP, bottom: 0, width: RAIL,
        background: UI.rail, borderRight: `2px solid ${UI.line}` }}>
        <div style={{ padding: "13px 15px 6px", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 12, letterSpacing: "0.17em", color: UI.faint }}>AGENTS</div>
        {agents.map((a, i) => (
          <div key={a} style={{ display: "flex", alignItems: "center", gap: 9,
            margin: "0 9px 3px", padding: "7px 10px", borderRadius: 8,
            background: i === 0 ? "#232A33" : "transparent",
            borderLeft: i === 0 ? `3px solid ${UI.accent}` : "3px solid transparent" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%",
              background: i === 0 ? UI.ok : "#4A5563", opacity: i === 0 ? pulse : 1 }} />
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14,
              color: i === 0 ? UI.ink : UI.dim, whiteSpace: "nowrap", overflow: "hidden" }}>{a}</div>
          </div>
        ))}
        <div style={{ margin: "10px 15px", height: 2, background: UI.line }} />
        <div style={{ padding: "0 15px 6px", fontFamily: inter.fontFamily, fontWeight: 900,
          fontSize: 12, letterSpacing: "0.17em", color: UI.faint }}>MCP SERVERS</div>
        <div style={{ position: "absolute", right: 3, top: 14, width: 3, height: 96,
          borderRadius: 2, background: UI.line }} />
        {MCP.map((m) => (
          <div key={m} style={{ display: "flex", alignItems: "center", gap: 9,
            margin: "0 9px 3px", padding: "5px 10px" }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: UI.tile,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${m}.svg`)}
                   style={{ width: 15, height: 15, objectFit: "contain" }} />
            </div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 13,
              color: UI.dim }}>{m}</div>
            <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
              background: UI.ok }} />
          </div>
        ))}
      </div>

      {/* ---- canvas toolbar ---- */}
      <div style={{ position: "absolute", left: cvX, top: TOP, width: cvW, height: 34,
        borderBottom: `2px solid ${UI.line}`, display: "flex", alignItems: "center",
        gap: 18, paddingLeft: 16 }}>
        {["BUILD", "RUN", "LOGS"].map((tb, i) => (
          <div key={tb} style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13,
            letterSpacing: "0.1em", color: i === 0 ? UI.ink : "#5F6975",
            borderBottom: i === 0 ? `2px solid ${UI.accent}` : "2px solid transparent",
            paddingBottom: 8 }}>{tb}</div>
        ))}
        <div style={{ marginLeft: 14, fontFamily: MONO, fontSize: 12, color: "#4C5462" }}>
          workspace&nbsp;/&nbsp;<span style={{ color: UI.dim }}>support triage</span>
        </div>
        <div style={{ marginLeft: "auto", marginRight: 14, fontFamily: MONO,
          fontWeight: 700, fontSize: 12, color: UI.faint }}>100%</div>
      </div>

      {/* ---- the graph: a real BRANCH, ports, arrowed edges, a running node ---- */}
      <div style={{ position: "absolute", left: cvX, top: TOP + 34, width: cvW,
        height: BODY - 34, overflow: "hidden" }}>
        {Array.from({ length: 91 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: 12 + (i % 13) * 38,
            top: 12 + Math.floor(i / 13) * 34, width: 2, height: 2, borderRadius: 1,
            background: UI.line }} />
        ))}
        {EDGE.map(([a, b], i) => {
          const on = E2(f, 10 + i * 6, 24 + i * 6);
          const ax = NODE[a].x + 122, ay = NODE[a].y + 30;
          const bx = NODE[b].x - 4, by = NODE[b].y + 30;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: ax, top: ay + 4, height: 3,
                width: (bx - ax) * 0.5 * on, background: UI.line }} />
              <div style={{ position: "absolute", left: ax + (bx - ax) * 0.5, top: Math.min(ay, by) + 4,
                width: 3, height: Math.abs(by - ay) * on, background: UI.line }} />
              <div style={{ position: "absolute", left: ax + (bx - ax) * 0.5, top: by + 4, height: 3,
                width: (bx - ax) * 0.5 * on, background: UI.line }} />
              <div style={{ position: "absolute", left: bx - 6, top: by, width: 0, height: 0,
                borderLeft: `7px solid ${UI.line}`, borderTop: "5px solid transparent",
                borderBottom: "5px solid transparent", opacity: on }} />
            </React.Fragment>
          );
        })}
        {agents.map((a, i) => {
          const n = NODE[i]; const live = E2(f, 3 + i * 5, 18 + i * 5);
          const run = i === 0 ? E2(f, 18, 70) : 0;
          return (<React.Fragment key={a}>
            <div style={{ position: "absolute", left: n.x, top: n.y, width: 126, height: 68,
              borderRadius: 10, background: "#1B212A", opacity: live,
              border: `2px solid ${i === 0 ? UI.accent : UI.line}`,
              transform: `scale(${0.9 + live * 0.1})` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 9px 0" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%",
                  background: i === 0 ? UI.ok : "#4A5563",
                  opacity: i === 0 ? pulse : 1 }} />
                <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 10,
                  letterSpacing: "0.12em", color: UI.faint }}>
                  {i === 0 ? "RUNNING" : "IDLE"}
                </div>
                <div style={{ marginLeft: "auto", width: 17, height: 17, borderRadius: 5,
                  background: UI.tile, display: "flex", alignItems: "center",
                  justifyContent: "center" }}>
                  <Img src={staticFile(`logos/${MCP[i % MCP.length]}.svg`)}
                       style={{ width: 10, height: 10, objectFit: "contain" }} />
                </div>
              </div>
              <div style={{ padding: "4px 9px 0", fontFamily: inter.fontFamily, fontWeight: 700,
                fontSize: 13, color: UI.ink, whiteSpace: "nowrap", overflow: "hidden" }}>{a}</div>
              <div style={{ position: "absolute", left: 9, right: 9, bottom: 8, height: 4,
                borderRadius: 2, background: "#252C36", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, width: `${run * 100}%`,
                  background: UI.accent }} />
              </div>
            </div>
            {[0, 1].map((side) => (
              <div key={side} style={{ position: "absolute", left: n.x + (side ? 122 : -4),
                top: n.y + 28, width: 8, height: 8, borderRadius: "50%",
                background: side ? UI.accent : "#4A5563", opacity: live }} />
            ))}
          </React.Fragment>);
        })}
        {/* minimap, bottom-right of the canvas */}
        <div style={{ position: "absolute", right: 10, bottom: 10, width: 78, height: 50,
          borderRadius: 6, background: "#171C24", border: `2px solid ${UI.line}` }}>
          {NODE.map((n, i) => (
            <div key={i} style={{ position: "absolute", left: 6 + n.x * 0.13, top: 8 + n.y * 0.13,
              width: 15, height: 8, borderRadius: 2,
              background: i === 0 ? UI.accent : "#3A434E" }} />
          ))}
        </div>
      </div>

      {/* ---- inspector ---- */}
      <div style={{ position: "absolute", right: 0, top: TOP, width: INSP, height: BODY,
        background: UI.rail, borderLeft: `2px solid ${UI.line}`, padding: "12px 14px" }}>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 12,
          letterSpacing: "0.17em", color: UI.faint }}>INSPECTOR</div>
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 16,
          color: UI.ink, marginTop: 7 }}>support triage</div>
        {[["STATUS", "running"], ["HANDOFF", "inbox reader"], ["RETRIES", "on"]].map(([kk, vv]) => (
          <div key={kk} style={{ marginTop: 10 }}>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 10,
              letterSpacing: "0.14em", color: "#4C5462" }}>{kk}</div>
            <div style={{ fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 14,
              color: UI.dim, marginTop: 2 }}>{vv}</div>
          </div>
        ))}
        <div style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 10,
          letterSpacing: "0.14em", color: "#4C5462", marginTop: 13 }}>TOOLS</div>
        <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
          {MCP.map((m) => (
            <div key={m} style={{ width: 28, height: 28, borderRadius: 7, background: UI.tile,
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Img src={staticFile(`logos/${m}.svg`)}
                   style={{ width: 16, height: 16, objectFit: "contain" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ---- THE LOG STRIP. Lines land one at a time while the graph runs — the
              single most "this is real software" detail there is, and it is also
              nine objects arriving across the shot. ---- */}
      <div style={{ position: "absolute", left: ACT + RAIL, right: 0, top: TOP + BODY, height: LOGH,
        borderTop: `2px solid ${UI.line}`, background: "#10141A", overflow: "hidden",
        padding: "7px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 10,
            letterSpacing: "0.17em", color: "#4C5462" }}>RUN LOG</div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: UI.ok,
            opacity: pulse }} />
        </div>
        {LOG.slice(Math.max(0, shown - 4), shown).map(([kind, who, what], i) => (
          <div key={`${kind}${who}${what}`} style={{ display: "flex", gap: 10,
            fontFamily: MONO, fontSize: 13, lineHeight: "17px",
            opacity: i === 3 ? 1 : 0.42 + i * 0.16 }}>
            <span style={{ color: LOGC[kind], fontWeight: 700, width: 42 }}>{kind}</span>
            <span style={{ color: UI.dim, width: 118 }}>{who}</span>
            <span style={{ color: UI.dim }}>{what}</span>
          </div>
        ))}
      </div>

      {/* ---- the message that lands once it is sent ---- */}
      <div style={{ position: "absolute", right: INSP + 18, top: TOP + 44, opacity: sent }}>
        <div style={{ maxWidth: 280, padding: "9px 14px", borderRadius: "13px 13px 4px 13px",
          background: UI.accent, fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 15,
          color: "#FFF3EC" }}>make it reply in my tone</div>
      </div>

      {/* ---- composer ---- */}
      <div style={{ position: "absolute", left: ACT + RAIL, right: 0, top: TOP + BODY + LOGH,
        height: COMP, borderTop: `2px solid ${UI.line}`, background: "#151A21" }}>
        <div style={{ position: "absolute", left: 15, top: 10, right: 70,
          fontFamily: inter.fontFamily, fontWeight: 700, fontSize: 23, lineHeight: 1.26,
          color: UI.ink }}>
          {typed}
          {caret && <span style={{ opacity: Math.floor(f / 7) % 2 ? 1 : 0,
            color: UI.accent }}>|</span>}
        </div>
        <div style={{ position: "absolute", right: 13, bottom: 12, width: 40, height: 40,
          borderRadius: 10, background: typed ? UI.accent : "#2A313A",
          transform: `scale(${pressed ? 0.9 : 1})`, display: "flex",
          alignItems: "center", justifyContent: "center", fontFamily: inter.fontFamily,
          fontWeight: 900, fontSize: 21, color: typed ? "#FFF3EC" : "#5F6975" }}>&#8593;</div>
        <div style={{ position: "absolute", left: 15, bottom: 9, fontFamily: MONO,
          fontWeight: 700, fontSize: 12, color: "#4C5462" }}>&#8984;&#9166; to run</div>
      </div>

      {/* ---- status bar ---- */}
      <div style={{ position: "absolute", left: ACT + RAIL, right: 0, bottom: 0,
        height: h - TOP - BODY - LOGH - COMP, borderTop: `2px solid ${UI.line}`,
        display: "flex", alignItems: "center", gap: 8, paddingLeft: 15 }}>
        {/* ⛔ EVERY CHIP HERE IS SOURCED. A model chip would assert "Rowboat runs
            Claude" and a duration would assert a benchmark; neither is verified. */}
        <div style={{ padding: "5px 10px", borderRadius: 7, background: "#1B212A",
          border: `2px solid ${UI.line}`, fontFamily: inter.fontFamily, fontWeight: 800,
          fontSize: 13, color: UI.dim }}>{STATS.license}</div>
        <div style={{ padding: "5px 10px", borderRadius: 7, background: "#1B212A",
          border: `2px solid ${UI.line}`, fontFamily: inter.fontFamily, fontWeight: 800,
          fontSize: 13, color: UI.dim }}>&#9733; {STATS.stars}</div>
        <div style={{ marginLeft: "auto", marginRight: 15, display: "flex",
          alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: UI.ok,
            opacity: pulse }} />
          <span style={{ fontFamily: inter.fontFamily, fontWeight: 800, fontSize: 13,
            color: UI.faint }}>4 mcp connected</span>
        </div>
      </div>

      {/* ---- the pointer, travelling to the send button and pressing it ---- */}
      <div style={{ position: "absolute", left: 330 + px * (w - 400),
        top: 250 + px * (h - 330), width: 15, height: 22, zIndex: 9,
        opacity: f > 24 ? 1 : 0 }}>
        <div style={{ width: 0, height: 0, borderLeft: "9px solid #FFFFFF",
          borderBottom: "15px solid transparent", transform: "rotate(-32deg)",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }} />
      </div>
    </div>
  );
};

/* =========================================================================
   THE FOUNDERS.

   Alex: "use real images of the founders and stuff whenever possible".
   ⛔ I did NOT fetch their headshots. Their photos are on the YC company page,
      but a photograph is copyrighted by whoever took it and a real person's face
      used to promote content is a likeness question on top of that — neither is
      mine to license on Alex's behalf. What IS free to use is the FACT: their
      names, verified on ycombinator.com/companies/rowboat-labs. So this draws
      house mascots as portraits with the real names under them, and the marks
      beside them are the real Coinbase and Y Combinator ones.
      Swapping in a licensed photo later is a one-line change: replace the
      <Mascot> with an <Img src={staticFile(...)} />.

   ⛔ ROWBOAT LABS HAS TWO FOUNDERS — Arjun Maheswaran and Ramnique Singh — so
      the VO's "two guys" is CORRECT. (Three people co-founded AGARA, the
      previous company Coinbase bought in 2021. Do not conflate the two counts.)
   ========================================================================= */
export const FOUNDERS = ["ARJUN MAHESWARAN", "RAMNIQUE SINGH"];

export const Founder: React.FC<{ f: number; x: number; y: number; name: string;
  s?: number; z?: number; who?: string; t?: number; photo?: string; role?: string }> =
  ({ f, x, y, name, s = 1, z = 60, who = "glasses", t = 1, photo, role }) => (
  <div style={{ position: "absolute", left: x, top: y, width: 300 * s, zIndex: z,
    transform: `scale(${Math.max(0.02, t)})`, transformOrigin: "50% 50%" }}>
    <div style={{ width: 300 * s, height: 214 * s, borderRadius: 22 * s, background: PAPER,
      boxShadow: SH_D, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 96 * s,
        background: "#EFE7D8" }} />
      {/* ⛔ THE PHOTO SLOT. Pass `photo` and a real licensed headshot drops
          straight in at the right crop — the swap Alex asked for is this one
          prop. Until there is one to pass, the house mascot stands in; I am not
          scraping someone's headshot off a company page and putting it in a
          monetised video. */}
      {photo ? (
        <Img src={staticFile(photo)} style={{ position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <div style={{ position: "absolute", left: 62 * s, top: 16 * s }}>
          <Mascot lf={f} size={176 * s} cheer={0.34} nodAmp={2.6} nodSpeed={12}
                  {...({ [who]: 1 } as any)} />
        </div>
      )}
    </div>
    {/* ⛔ ON A CHIP. Bare type under the portrait sat straight on whatever the
        world had behind it — over the plaza's mid band the names were unreadable,
        which defeats the whole point of naming them. */}
    <div style={{ marginTop: 10 * s, padding: `${9 * s}px ${12 * s}px`, borderRadius: 12 * s,
      background: PAPER, boxShadow: SH, textAlign: "center" }}>
      <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 25 * s,
        letterSpacing: "-0.01em", color: INK, whiteSpace: "nowrap" }}>{name}</div>
      {role && (
        <div style={{ marginTop: 3 * s, fontFamily: inter.fontFamily, fontWeight: 800,
          fontSize: 17 * s, letterSpacing: "0.08em", color: MUTE,
          whiteSpace: "nowrap" }}>{role}</div>
      )}
    </div>
  </div>
);

/** the two real credential marks. ⛔ Coinbase bought AGARA, their PREVIOUS
    company, in 2021. Never let a frame imply it bought Rowboat. */
export const Badge: React.FC<{ x: number; y: number; logo: string; t: string; s?: number;
  z?: number; sc?: number }> = ({ x, y, logo, t, s = 1, z = 60, sc = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z, display: "flex",
    alignItems: "center", gap: 18 * s, padding: `${18 * s}px ${28 * s}px`, borderRadius: 20 * s,
    background: PAPER, boxShadow: SH_D, transform: `scale(${Math.max(0.02, sc)})`,
    transformOrigin: "50% 50%" }}>
    <Img src={staticFile(`logos/${logo}.svg`)}
         style={{ width: 72 * s, height: 72 * s, objectFit: "contain" }} />
    <div style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 40 * s,
      letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap" }}>{t}</div>
  </div>
);

/** the headstone, reused from the hook so the callback is literally the same
    object rather than a lookalike */
export const Slab: React.FC<{ x: number; y: number; s?: number; z?: number; name: string;
  dates?: string; logo?: string }> = ({ x, y, s = 1, z = 34, name, dates, logo }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z }}>
    <div style={{ width: 420 * s, height: 300 * s, borderRadius: `${190 * s}px ${190 * s}px 10px 10px`,
      background: "#DFDACE", boxShadow: SH_D }} />
    <div style={{ position: "absolute", left: 18 * s, top: 18 * s, width: 384 * s, height: 264 * s,
      borderRadius: `${172 * s}px ${172 * s}px 6px 6px`, border: `4px solid #C4BEAF` }} />
    {logo && (
      <div style={{ position: "absolute", left: 154 * s, top: 46 * s, width: 112 * s,
        height: 112 * s, borderRadius: 26 * s, background: "#FFFFFF", boxShadow: SH,
        display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Img src={staticFile(`logos/${logo}.svg`)}
             style={{ width: 70 * s, height: 70 * s, objectFit: "contain" }} />
      </div>
    )}
    {/* ⛔ AUTO-FIT. At a flat 50 "AGENT BUILDERS" wrapped onto the dates line and
        "PROMPT STUDIO" ran off the stone. Scale to the name, do not re-check by
        hand every time the wording changes. */}
    <div style={{ position: "absolute", left: 0, width: 420 * s, textAlign: "center",
      top: (logo ? 178 : 106) * s,
      fontFamily: inter.fontFamily, fontWeight: 900, lineHeight: 1.06, whiteSpace: "nowrap",
      fontSize: Math.min(logo ? 44 : 50, ((logo ? 44 : 50) * 11) / Math.max(9, name.length)) * s,
      letterSpacing: "-0.02em", color: "#5E574B" }}>{name}</div>
    {dates && (
      <div style={{ position: "absolute", left: 0, width: 420 * s, top: (logo ? 228 : 190) * s,
        textAlign: "center", fontFamily: inter.fontFamily, fontWeight: 900,
        fontSize: (logo ? 27 : 31) * s, letterSpacing: "0.06em",
        color: "#7E7667" }}>{dates}</div>
    )}
    <div style={{ position: "absolute", left: -26 * s, top: 292 * s, width: 472 * s, height: 32 * s,
      borderRadius: 7 * s, background: "#C4BEAF" }} />
  </div>
);

export { PAPER, INK, INK_L, MUTE, CLAY, GO, RED, GOLD, SH, SH_D, STATS };
