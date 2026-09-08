import React from "react";
import { Img, staticFile } from "remotion";
import { MONO } from "./SlopKit";
import { inter, fraunces } from "./fonts";
import {
  W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx,
} from "./NomWorld";
import type { Place } from "./NomWorld";
import { Hall, Spot, dkh, mxh, idle } from "./AppWorld";
import { Mascot } from "./SlopKit";

/* ===========================================================================
   REEL 123 · "ROUTE" — THE WORLD KIT.  Board: storyboards/123-route.md.

   THE PLACE: **THE NOTE ROOM** — a records desk against a floor-to-ceiling card
   wall. Two hundred cream cards on pins; a hooded lamp; a ceiling-hung intake
   called THE HOPPER; and one brass stand that ends up holding a single card.

   ⛔⛔ EVERY PROP IS LITERAL. Point at it and say what it IS — if the honest
      answer needs "stands for", it is cut (board §1):

        a card on the wall     -> one of your notes. An actual file.
        THE HOPPER             -> the prompt box you paste everything into
        its segmented arc      -> the context window filling
        its shred tray         -> what a stuffed prompt gives back
        the pin board + mark   -> searching GitHub for a template
        the date on a result   -> why the template is someone else's snapshot
        THE COMPASS CARD       -> COMPASS.md, the one index file
        the needle's bearing   -> the index resolving a question to a location
        3 lit cards of 200     -> Claude opening three files, not two hundred
        the folded brief       -> the summary that comes back
        the counter 200 -> 201 -> adding a note
        the carriage + folder  -> Claude writing the script and saving it to disk

   ⭐ "CONTEXT COMPASS" IS ALEX'S OWN NOUN, SPOKEN IN THE RECORDING, so the
      compass rose is literal vocabulary and not a metaphor to decode — the same
      free ride reel 104 got from "plug in".

   ⛔ MATTE PALETTE, NOT NEON (REEL-BUILD-LEARNINGS §1). Every lit surface is a
      solid matte paint; depth is a dark drop-shadow; light is a SHAPED cone.
      There is not one `0 0 Npx <colour>` in this reel — the grep is a ship gate.

   ⛔ `dkh`/`mxh` are HEX-IN, HEX-OUT and are the only colour helpers used here.
      NomWorld's `dark`/`mix` return rgb() and do not nest.

   ⛔ THE STAGE, MEASURED. The panel is 1012 x 792. ROOT's header pill owns
      y 0..112 and the slug owns y 730..792, so every hero object lives inside
      **y 118..726**. The card wall is deliberately 920 x 360 (41.3% of the
      panel) because frame 0 is a brightness competition and the wall is the
      bright plane that wins it.
   ========================================================================= */

export { W, H, SAFE, E, OUT, IO, BACK, IN_Q, LIN, hexa, rnd,
  Beam, Strip, Motes, Chip, Slug, Plate, BigNum, Contact, Edge, Scene, Cam,
  Mark, MarkPlate, MarkCast, CamCtx, PalCtx, Hall, Spot, dkh, mxh, idle };
export type { Place };

/** ⛔ HEX IN, HEX OUT, like dkh/mxh — NomWorld's dark()/mix() return rgb() and do
    not nest. This one blends two hexes, which is what a coloured light does to a
    surface. */
export const blend = (a: string, b: string, k: number) => {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const ch = (sh: number) => {
    const v = Math.round((((A >> sh) & 255) * (1 - k) + ((B >> sh) & 255) * k));
    return Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0");
  };
  return `#${ch(16)}${ch(8)}${ch(0)}`;
};

/* the house accents, matte */
export const CLAY = "#D97757", GOLD = "#E7B24C", GREEN = "#3F9E74";
export const RED = "#C44A3A", SKY = "#5AA0DE", INK = "#1A1813", MUTE = "#9A968B";

/* ---- this room's own materials ------------------------------------------ */
export const CARD = "#DCAE63", CARDD = "#A9793A", CARDL = "#F2CE8A";  /* a note: MANILA */
/** ⭐ THE FILE COLOURS. Ten stocks, earthy and saturated, no neon. A card picks by
    seed and then takes the room's `cast`, so a scene keeps ONE dominant family
    (the inter-scene gate needs that) while no two neighbouring cards match. */
export const FILES = ["#EAC079", "#E08A5C", "#93C296", "#84AACC", "#B08CB4",
                      "#72C2BC", "#EEC663", "#E2A0AE", "#B0B662", "#F2E4C4"];
export const PAPER = "#F4EEDD", PAPERD = "#CFC4A6", PAPERL = "#FCF8EE";  /* the HEROES only */
export const CARDDK = "#8A6430";  /* ⛔ a note with the light OFF is still CREAM. At
                                     #6E6857 the wall read as grey brick; at #A79E87 it
                                     read as notes but measured 19% saturation and blocked the
                                     look gate. Manila in shadow is both legible AND saturated. */
export const PIN = "#C9A45E";
export const OAK = "#8E5A1E", OAKD = "#4E2E08", OAKL = "#BE8232";     /* the desk */
export const BRASS = "#C8963E", BRASSD = "#8A6626", BRASSL = "#EBCB84"; /* the stand */
export const STEEL = "#9AA3AC", STEELD = "#5C646C", STEELL = "#C6CDD4";
export const HOP = "#4A4E55", HOPD = "#2E3238", HOPL = "#6C727B";      /* the hopper */
export const LAMPC = "#F6E7BC";                     /* the one practical colour */
export const SHRED = "#B99046";
export const STAMPR = "#C8443A";

/* =========================================================================
   THE PLACES. One per beat-group so no two neighbours share a palette.
   ⛔ EVERY ROW KEEPS ITS SHADOWS. `back2` and `floor2` are the darkest values on
      purpose — they are what the black-point gate measures and what lets one lit
      card out-rank two hundred dark ones. If a set reads dim, add a practical or
      brighten the SUBJECT. Do NOT lift these (ANIMATION-QUALITY §8).
   ====================================================================== */
export const PLACES: Record<string, Place> = {
  /* ⛔⛔ THIS TABLE IS A SEQUENCE, NOT A SET OF MOODS. `tools/interscene_contrast.py`
     measured the first build at 8 of 11 cuts FAILING — every scene from 9.7s on
     came in at hue 33-35 and luma 100-117, i.e. two thirds of the reel was one
     amber wash and no cut read as a cut. Alex: *"the colors are way too similar
     ... it doesn't have enough scene variety ... the user will basically want to
     scroll away."*
     the row order below IS the engineered hue sequence, and every neighbour is a
     deliberate jump. Read it down: warm, cold, green, plum, ember, teal, ochre,
     wine, deep blue, ochre, teal, violet. Bar per cut is dHue >= 26 OR dLuma >= 22;
     the smallest gap designed here is 50 degrees.
     EVERY ROW STAYS EARTHY AND MUTED. Teal, plum, forest and ochre are allowed as
     a scene's dominant colour (memory reel-interscene-contrast); neon is not.
     AND EVERY ROW KEEPS ITS SHADOWS: back2/floor2 are the darkest values in the
     row on purpose. That is what the black-point gate measures. */

  /* S0 MORNING - daylight through a window. the brightest set in the reel and the
     only daylit one: frame 0 is a brightness competition. hue 36 luma 150 */
  morning: { back: "#E6C88C", back2: "#BE8C34", floor: "#CE8A26", floor2: "#8A5614",
             lip: "#E0AE4E", key: "#FFF0C0", horizon: 520, grit: "#DCA850" },
  /* S1 THE INTAKE - inside the machine. cold steel, one hot gauge. hue 210 luma 85 */
  throat:  { back: "#2E4256", back2: "#0C1420", floor: "#2A3A4A", floor2: "#0E161F",
             lip: "#4C6B85", key: "#F0A93C", horizon: 600, grit: "#6E90AC" },
  /* S2 THE SEARCH CORNER - a different wall of the same building. forest green,
     and its results are BLUE-GREY printouts, not manila. hue 145 luma 113 */
  board:   { back: "#12463A", back2: "#03170F", floor: "#1B4A34", floor2: "#061B10",
             lip: "#2E7A5A", key: "#9CE6BE", horizon: 588, grit: "#4EA87C" },
  /* S3 LIGHTS OUT - the turn. deep plum, and ONE warm lamp is born in it, which is
     the largest value change in the reel. hue 265 luma 62 */
  night:   { back: "#2A1F48", back2: "#0A0616", floor: "#241A34", floor2: "#0A0710",
             lip: "#4A3670", key: LAMPC, horizon: 512, grit: "#6A52A0" },
  /* S4 UNDER THE CHUTE - ember. the machine is hot and it is giving back mush.
     hue 9 luma 88 */
  chute:   { back: "#54180E", back2: "#180402", floor: "#4A1608", floor2: "#160402",
             lip: "#8E2E12", key: "#FF7A2A", horizon: 556, grit: "#B44820" },
  /* S5 THE LAMP POOL, CLOSE - teal room, warm lamp. the complementary split
     SET-AND-LIGHT calls the premium look. hue 185 luma 105 */
  pool:    { back: "#0E3E44", back2: "#02181C", floor: "#124042", floor2: "#04181A",
             lip: "#1E7A76", key: LAMPC, horizon: 500, grit: "#3EA8A0" },
  /* S6 THE WALL AT NIGHT - ochre, lit only by the lamp and the beam. the cards cast
     warm here, and only here in the back half. hue 40 luma 78 */
  wall:    { back: "#2E2010", back2: "#0C0703", floor: "#3A2810", floor2: "#100A03",
             lip: "#6E4C18", key: "#F5C061", horizon: 528, grit: "#A87A2C" },
  /* S7 THE REQUEST DESK - wine. NO CARD WALL IN THIS SCENE: the shape has to change
     too, not just the paint. hue 350 luma 100 */
  deck:    { back: "#4E1428", back2: "#180410", floor: "#42101C", floor2: "#160408",
             lip: "#8E2444", key: "#FF9E7A", horizon: 430, grit: "#B4406A" },
  /* S8 THE PEAK - a deep blue room, and three GOLD cards crossing it. the
     highest-contrast frame in the reel. hue 218 luma 118 */
  beamroom:{ back: "#16305C", back2: "#040A18", floor: "#182A48", floor2: "#050A14",
             lip: "#2E5490", key: "#FFD37A", horizon: 528, grit: "#5A82C8" },
  /* S9 THE WALL EDGE - back to warm ochre, bright, because the argument of this
     scene is that NOTHING changes. hue 42 luma 92 */
  edge:    { back: "#4A3410", back2: "#140C02", floor: "#5A4014", floor2: "#180E03",
             lip: "#9A6E1E", key: "#FFD98A", horizon: 528, grit: "#C89A34" },
  /* S10 THE PRESS ROOM - a different corner, a different object (output
     pigeonholes, not note cards), deep teal with a warm page. hue 190 luma 128 */
  press:   { back: "#0C3C48", back2: "#02161C", floor: "#0E4048", floor2: "#03181C",
             lip: "#1A7A88", key: "#FFE0A0", horizon: 430, grit: "#38A8B8" },
  /* S11 THE CTA - violet, so the last cut is a jump too. hue 280 luma 100 */
  cta:     { back: "#33205C", back2: "#0C0620", floor: "#2E1E4A", floor2: "#0A0616",
             lip: "#5E3E9A", key: GOLD, horizon: 520, grit: "#8E68C8" },
};

/** the cast each scene throws on an UNLIT card. This is the whole reason six
    scenes can share one wall without sharing one colour. */
export const CAST: Record<string, [string, number]> = {
  morning:  ["#FFE9B4", 0.10],   /* daylight - the card stays manila */
  throat:   ["#3E6E96", 0.70],
  board:    ["#2E8C68", 0.66],
  night:    ["#4A3A82", 0.72],
  chute:    ["#B4441C", 0.62],
  pool:     ["#1E8C88", 0.70],
  wall:     ["#C08A34", 0.34],   /* the one warm wall in the back half */
  deck:     ["#9E2A4A", 0.66],
  beamroom: ["#2A4E8E", 0.74],
  edge:     ["#D0A03C", 0.26],
  press:    ["#1C8090", 0.70],
  cta:      ["#5E3E9A", 0.70],
};

export const usePlace = (k: string): Place => PLACES[k];
export const castOf = (k: string): [string, number] => CAST[k] ?? ["#FFFFFF", 0];

/* =========================================================================
   THE WALL. 200 cards, 20 x 10, 960 x 380 — countable, and the bright plane.
   `state(i)` returns what card i is doing, so ONE component serves the full
   wall, the bare wall, the lit-one wall and the three-of-two-hundred payoff.
   ====================================================================== */
export const COLS = 14, ROWS = 7, NCARD = COLS * ROWS;
/* ⛔ THE THINGS IN THE BACK WERE TOO SMALL. Alex: *"make the stuff like not so
   small things in the back."* 200 cards at 38x28 is 200 props the eye cannot
   resolve, and ANIMATION-QUALITY §1 already says small props never add up. The
   cell is now 66x52 — THREE TIMES the area — and the grid runs off the right edge
   so the room still reads as bigger than the frame. */
export const CW = 66, CH = 52, PX = 76, PY = 66;        /* card + pitch */
export const WALL_X = 60, WALL_Y = 116;  /* the wall RUNS PAST the right edge — a wall you are
                                             standing beside, not a grid pasted on a backdrop. x 152..1072,
                                             cropped at 1012; the left 150px is the window / far door. */
export const cardX = (i: number) => WALL_X + (i % COLS) * PX;
export const cardY = (i: number) => WALL_Y + Math.floor(i / COLS) * PY;

export type CardState = { o?: number; lit?: number; dx?: number; dy?: number;
  rot?: number; s?: number; gone?: number; fly?: number };

/** one note. Flat manufactured face — divs render this correctly (SET-AND-LIGHT
    §5); the organic props below are real SVG paths. */
export const Note: React.FC<{ x: number; y: number; lit?: number; o?: number; s?: number;
  rot?: number; z?: number; w?: number; h?: number; ruled?: number; seed?: number;
  tab?: string | null; cast?: string; castK?: number; fly?: number; hue?: string;
  flip?: number }> =
  ({ x, y, lit = 0, o = 1, s = 1, rot = 0, z = 20, w: ww = CW, h: hh = CH, ruled = 2,
     seed = 0, tab = null, cast, castK = 0.62, fly = 0, hue, flip = 0 }) => {
  /* ⛔⛔ THE VALUE PROBLEM, SOLVED THE RIGHT WAY. Round 4 answered "yellow paper on
     a yellow wall" with a dark contour on every card. It worked and it was a
     workaround — Alex: *"make the papers diff colors and stuff not a dark
     countour."* Every file now has its OWN stock out of ten, so separation comes
     from HUE and the edge is only a darker shade of the card's own colour. There
     is no black outline anywhere in this reel. */
  const v = rnd(seed, 31);
  const base = hue ?? FILES[Math.floor(rnd(seed, 37) * FILES.length) % FILES.length];
  /* a card OFF the shelf is in the room's light; a card ON it is in a recess */
  const litFace = mxh(base, (v - 0.5) * 0.08 + fly * 0.14);
  const dimFace = dkh(cast ? blend(base, cast, castK * 0.72) : dkh(base, 0.30), 0.14);
  const face = lit > 0.02 ? litFace : dimFace;
  const edge = dkh(face, 0.26);                 /* the card's OWN colour, darker */
  const bw = Math.max(1, Math.min(3, hh * 0.038));
  return (
    <div style={{ position: "absolute", left: x, top: y, width: ww, height: hh, zIndex: z,
      opacity: o,
      transform: `rotate(${rot}deg) scale(${s})` + (flip ? ` scaleY(${Math.cos(flip * Math.PI)})` : ""),
      transformOrigin: "50% 50%",
      background: face, borderRadius: 3, boxSizing: "border-box",
      borderTop: `${bw}px solid ${mxh(face, 0.34)}`,
      borderRight: `${bw * 1.6}px solid ${edge}`,
      borderBottom: `${bw * 1.6}px solid ${edge}`,
      boxShadow: fly > 0.02
        ? `0 ${10 * s}px ${20 * s}px rgba(6,8,12,${0.52 + fly * 0.2})`
        : lit > 0.4 ? `0 ${5 * s}px ${11 * s}px rgba(8,10,14,0.46)`
                    : `0 ${2 * s}px ${5 * s}px rgba(6,8,12,0.50)` }}>
      {tab && <div style={{ position: "absolute", left: ww * 0.10, top: -5,
        width: ww * 0.34, height: Math.max(6, hh * 0.14), borderRadius: 2,
        background: lit > 0.02 ? tab : dkh(tab, 0.44) }} />}
      <div style={{ position: "absolute", left: ww / 2 - 2, top: -2.5, width: 4, height: 4,
        borderRadius: 3, background: lit > 0.02 ? PIN : dkh(PIN, 0.44) }} />
      {(() => {
        const n = Math.max(1, ruled);
        const top = hh * 0.30, span = hh * 0.50;          /* rules live in 30%..80% */
        const gap = n > 1 ? span / (n - 1) : 0;
        const th = Math.max(1.4, Math.min(hh * 0.075, gap * 0.55));
        return Array.from({ length: n }, (_, r) => (
          <div key={r} style={{ position: "absolute", left: ww * 0.11, top: top + r * gap,
            width: (ww * 0.70) * (r % 2 ? 0.62 : 1), height: th,
            background: dkh(face, 0.30), opacity: 0.75, borderRadius: 2 }} />
        ));
      })()}
    </div>
  );
};

/** ⭐⭐ A CLAUDE IN THE PIGEONHOLE. Alex: *"each rectangle be like a claude sprite
    or something."* One cell in six holds one instead of a file — which is also the
    right call for the audience filter (reel 95: the mark is what makes the right
    person stop), and it turns a grid into a population.
    ⛔ THEY ARE FURNITURE, NOT MOVERS (reel-motion-hierarchy). Each one blinks and
    bobs on its OWN slow clock at ~1.5px, so the wall feels inhabited without ever
    competing with the scene's one hero action. */
export const ClaudeCell: React.FC<{ x: number; y: number; w: number; h: number;
  f: number; seed: number; lit?: number; cast?: string; castK?: number; z?: number;
  o?: number }> =
  ({ x, y, w: ww, h: hh, f, seed, lit = 1, cast, castK = 0.62, z = 20, o = 1 }) => {
  const ph = rnd(seed, 71) * 100;
  const bob = Math.sin((f + ph) / 34) * 1.5;
  const blink = ((f + Math.floor(ph * 3)) % (78 + Math.floor(rnd(seed, 73) * 40))) < 5;
  const body = lit > 0.02 ? mxh(CLAY, (rnd(seed, 75) - 0.5) * 0.10 + 0.06)
                          : dkh(cast ? blend(CLAY, cast, castK * 0.62) : dkh(CLAY, 0.26), 0.06);
  const eye = lit > 0.02 ? "#20180F" : dkh("#20180F", 0.2);
  const bw = Math.max(3, hh * 0.13), eh = blink ? Math.max(2, hh * 0.05) : hh * 0.20;
  return (
    <div style={{ position: "absolute", left: x, top: y + bob, width: ww, height: hh,
      zIndex: z, opacity: o }}>
      {/* the body, filling the cell like something sitting in it */}
      <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.08,
        width: ww * 0.88, height: hh * 0.90, borderRadius: hh * 0.12, background: body,
        boxShadow: `0 ${hh*0.05}px ${hh*0.10}px rgba(6,8,12,0.42)` }} />
      <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.08,
        width: ww * 0.88, height: hh * 0.15, borderRadius: `${hh*0.12}px ${hh*0.12}px 0 0`,
        background: mxh(body, 0.26) }} />
      {/* the two eyes */}
      <div style={{ position: "absolute", left: ww * 0.26, top: hh * 0.40,
        width: bw, height: eh, borderRadius: 1.5, background: eye }} />
      <div style={{ position: "absolute", left: ww * 0.74 - bw, top: hh * 0.40,
        width: bw, height: eh, borderRadius: 1.5, background: eye }} />
      {/* the little arms on the lip of the hole */}
      <div style={{ position: "absolute", left: ww * 0.06, top: hh * 0.62,
        width: ww * 0.12, height: hh * 0.14, borderRadius: 2, background: dkh(body, 0.12) }} />
      <div style={{ position: "absolute", left: ww * 0.82, top: hh * 0.62,
        width: ww * 0.12, height: hh * 0.14, borderRadius: 2, background: dkh(body, 0.12) }} />
    </div>
  );
};

/** an empty pin hole — what a card leaves behind. */
const Hole: React.FC<{ x: number; y: number; o: number; p: Place }> = ({ x, y, o, p }) => (
  <div style={{ position: "absolute", left: x + CW / 2 - 4, top: y - 2, width: 8, height: 8,
    borderRadius: 5, background: dkh(p.back2, 0.42), opacity: o * 0.9, zIndex: 8 }} />
);

/** THE WALL. `st(i)` decides each card; everything else is the carcass it hangs
    in. ⛔ THE WALL IS SEEN AT AN ANGLE, NOT HEAD ON. A frontal 20x10 grid is a
    spreadsheet; a 7-degree turn with the right-hand end running past the frame is
    a wall you are standing beside. That one transform is the difference between a
    diagram and a place (SET-AND-LIGHT §0). */
const TABS = ["#C8443A", "#3F9E74", "#5AA0DE", "#E7B24C", "#B07BC0"];
export const CardWall: React.FC<{ p: Place; f: number; st?: (i: number) => CardState;
  z?: number; holes?: number; frame?: boolean; extra?: number; turn?: number;
  tabs?: number; wash?: number; cast?: string; castK?: number;
  hueOf?: (i: number) => string | undefined; flipOf?: (i: number) => number }> =
  ({ p, f, st, z = 20, holes = 0, frame = true, extra = 0, turn = 7, tabs = 0.2, wash = 0.54,
     cast, castK = 0.62, hueOf, flipOf }) => (
  <div style={{ position: "absolute", inset: 0, zIndex: z - 6,
    transform: `perspective(1900px) rotateY(${-turn}deg)`, transformOrigin: "8% 50%" }}>
    {frame && (<>
      {/* the head rail, with a real underside shadow */}
      <div style={{ position: "absolute", left: WALL_X - 30, top: WALL_Y - 26, width: 1140,
        height: 18, background: mxh(p.back, 0.22), zIndex: z - 4 }} />
      <div style={{ position: "absolute", left: WALL_X - 30, top: WALL_Y - 8, width: 1140,
        height: 7, background: dkh(p.back2, 0.34), zIndex: z - 4 }} />
      {/* the uprights — joinery, every four columns */}
      {[0, 4, 8, 12, 16, 20].map((c) => (
        <div key={"bt" + c} style={{ position: "absolute", left: WALL_X + c * PX - 7,
          top: WALL_Y - 26, width: 7, height: ROWS * PY + 26,
          background: `linear-gradient(90deg, ${mxh(p.back, 0.14)} 0%, ${dkh(p.back2, 0.26)} 100%)`,
          zIndex: z - 5 }} />
      ))}
      {/* a SHELF under every row: a lip that catches the key and a shadow under it */}
      {Array.from({ length: ROWS }, (_, r) => (
        <React.Fragment key={"sh" + r}>
          <div style={{ position: "absolute", left: WALL_X - 30,
            top: WALL_Y + r * PY + CH, width: 1140, height: 5,
            background: mxh(p.lip, 0.18), zIndex: z + 1 }} />
          <div style={{ position: "absolute", left: WALL_X - 30,
            top: WALL_Y + r * PY + CH + 5, width: 1140, height: 6,
            background: dkh(p.back2, 0.40), opacity: 0.85, zIndex: z + 1 }} />
          {/* ⭐ THE RECESS. The shadow the shelf above throws down onto the cards
              below it — this is what makes the wall read as DEEP cells rather than
              a flat sheet, and it is most of the ground-darkening. */}
          <div style={{ position: "absolute", left: WALL_X - 30,
            top: WALL_Y + r * PY - 10, width: 1140, height: Math.round(CH * 0.52),
            background: `linear-gradient(180deg, ${hexa("#0A0A10", 0.52)} 0%, ${hexa("#0A0A10", 0)} 100%)`,
            zIndex: z + 26, pointerEvents: "none" }} />
        </React.Fragment>
      ))}
      {/* the bottom plinth the whole thing stands on */}
      <div style={{ position: "absolute", left: WALL_X - 34, top: WALL_Y + ROWS * PY + 6,
        width: 1148, height: 22, background: dkh(p.back2, 0.16), zIndex: z - 4 }} />
      <div style={{ position: "absolute", left: WALL_X - 34, top: WALL_Y + ROWS * PY + 6,
        width: 1148, height: 5, background: mxh(p.lip, 0.10), zIndex: z - 3 }} />
    </>)}
    {Array.from({ length: NCARD + extra }, (_, i) => {
      const s = st ? st(i) : {};
      if ((s.gone ?? 0) > 0.99) return holes > 0
        ? <Hole key={"h" + i} x={cardX(i)} y={cardY(i)} o={holes} p={p} /> : null;
      const bob = Math.sin(f / 37 + i * 0.7) * 0.35;
      /* ⭐ one cell in six is inhabited. The seed is the index, so a given cell is
         always the same thing — it never flickers between a file and a Claude. */
      if (rnd(i, 91) < 0.20 && !(s.dx || s.dy)) return (
        <ClaudeCell key={"cc" + i} x={cardX(i) + (s.dx ?? 0)} y={cardY(i) + (s.dy ?? 0) + bob}
          w={CW} h={CH} f={f} seed={i} lit={s.lit ?? 0} cast={cast} castK={castK}
          z={z + 1} o={s.o ?? 1} />
      );
      return (<React.Fragment key={"c" + i}>
        {holes > 0 && <Hole x={cardX(i)} y={cardY(i)} o={holes * (s.gone ?? 0)} p={p} />}
        <Note x={cardX(i) + (s.dx ?? 0)} y={cardY(i) + (s.dy ?? 0) + bob}
          lit={(s.lit ?? 0) * (s.lit === 1 && !(s.fly ?? 0) ? 0.60 : 1)} fly={s.fly ?? 0}
          o={s.o ?? 1} s={s.s ?? 1}
          rot={(s.rot ?? 0) + (rnd(i, 41) - 0.5) * 2.2}
          z={z + ((s.fly ?? 0) > 0.5 ? 46 : ((s.lit ?? 0) > 0.4 ? 30 : 0))}
          ruled={(s.fly ?? 0) > 0.5 ? 5 : 2 + (i % 2)} seed={i}
          tab={rnd(i, 43) < tabs ? TABS[i % 5] : null} cast={cast} castK={castK}
          hue={hueOf ? hueOf(i) : undefined} flip={flipOf ? flipOf(i) : 0} />
      </React.Fragment>);
    })}
    {/* ⛔ THE LIGHT FALLS OFF ACROSS THE WALL. Without this the 200 cards are one
        flat value and the wall reads as wallpaper. One shaped gradient, no blur. */}
    <div style={{ position: "absolute", left: WALL_X - 40, top: WALL_Y - 30, width: 1160,
      height: ROWS * PY + 60, zIndex: z + 44, pointerEvents: "none",
      background: `linear-gradient(104deg, ${hexa("#FFEBBE", 0.14 + (0.54 - wash) * 0.5)} 0%, ${hexa("#000000", 0)} 30%, ${hexa("#060810", wash)} 100%)` }} />
  </div>
);

/* =========================================================================
   THE HOPPER — the ceiling-hung intake. ⛔ FURNITURE, NOT A CHARACTER: it never
   gets a face, it never speaks, and it does not lose. It is capped at S4 and
   swings out of frame for good.
   The funnel is an organic taper, so it is ONE inline <svg> with real paths
   (SET-AND-LIGHT §5: div-stacking renders an angled hopper as mush).
   ====================================================================== */
export const Hopper: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  swing?: number; open?: number; bulge?: number; hatch?: number; rivets?: number;
  heat?: number; fall?: number }> =
  ({ x, y, s = 1, z = 60, f = 0, swing = 0, open = 1, bulge = 0, hatch = 0, rivets = 0,
     heat = 0, fall = 0 }) => {
  /* every grey on the body runs toward ember as it overloads */
  const HOT = "#C4351A";
  const _B = blend(HOP, HOT, heat * 0.82), _D = blend(HOPD, HOT, heat * 0.70);
  const _L = blend(HOPL, blend(HOT, "#FFB07A", 0.45), heat * 0.86);
  const shudder = heat > 0.3 ? Math.sin(f / 1.7) * heat * 2.4 : 0;
  const sway = Math.sin(f / 43) * 0.8 + swing + shudder + fall * 46;
  const mw = 250 + bulge * 46;                       /* the mouth widens as it fills */
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${sway}deg) translateY(${fall * fall * 720}px)`,
      transformOrigin: "50% -140px", opacity: 1 - fall * 0.15 }}>
      {/* the arm it hangs from, running up out of frame */}
      <div style={{ position: "absolute", left: -13 * s, top: -320 * s, width: 26 * s,
        height: 340 * s, background: _D, boxShadow: "0 8px 18px rgba(6,8,12,0.55)" }} />
      <div style={{ position: "absolute", left: -13 * s, top: -320 * s, width: 8 * s,
        height: 340 * s, background: _L, opacity: 0.5 }} />
      <svg width={340 * s} height={300 * s} viewBox="0 0 340 300"
        style={{ position: "absolute", left: -170 * s, top: -14 * s, overflow: "visible" }}>
        {/* the body: a real taper, drawn */}
        <path d={`M ${170 - mw / 2} 6 L ${170 + mw / 2} 6 L 214 172 L 126 172 Z`}
          fill={_B} />
        <path d={`M ${170 - mw / 2} 6 L ${170 - mw / 2 + 30} 6 L 152 172 L 126 172 Z`}
          fill={_L} opacity={0.34} />
        <path d={`M ${170 + mw / 2 - 26} 6 L ${170 + mw / 2} 6 L 214 172 L 196 172 Z`}
          fill={_D} />
        {/* the lip of the mouth */}
        <rect x={170 - mw / 2 - 10} y={-4} width={mw + 20} height={20} rx={5} fill={_L} />
        <rect x={170 - mw / 2 - 10} y={-4} width={mw + 20} height={6} rx={3} fill={mxh(_L, 0.30)} />
        {/* the throat, and the split seam that opens when it jams */}
        <rect x={126} y={168} width={88} height={62} fill={dkh(_B, 0.14)} />
        <rect x={126} y={168 + 30} width={88} height={4} fill={heat > 0.2 ? blend("#FF9A3C", "#FFE08A", heat * 0.5) : dkh(_B, 0.42)}
          opacity={0.3 + bulge * 0.7 + heat * 0.3} />
        {bulge > 0.5 && (
          <path d={`M 126 ${196} L 96 ${206 + bulge * 12} L 96 ${214 + bulge * 12} L 126 ${210} Z`}
            fill={heat > 0.2 ? "#FF8A2E" : dkh(_B, 0.30)} />
        )}
        {/* the output slot */}
        <rect x={132} y={228} width={76} height={12} rx={3} fill="#14171B" />
        {heat > 0.15 && (<>
          <rect x={126} y={196} width={88} height={5} fill="#FFB454" opacity={heat} />
          <rect x={132} y={214} width={76} height={4} fill="#FF8A2E" opacity={heat * 0.9} />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={"sm" + i} x={128 + i * 18} y={168} width={7} height={62}
              fill="#FF7A22" opacity={heat * (0.28 + 0.18 * Math.sin(f / 4 + i)) } />
          ))}
        </>)}
        {/* ⭐ THE STENCIL. A blank grey funnel says nothing; this says whose intake
            it is and which way the material goes. Painted ON the taper, so it
            skews with the body the way a real stencil would. */}
        <g opacity={0.9}>
          <circle cx={170} cy={56} r={38} fill="none" stroke={mxh(_L, 0.38)} strokeWidth={5} />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 - 90) * Math.PI / 180;
            return <line key={"bz" + i}
              x1={170 + Math.cos(a) * 38} y1={56 + Math.sin(a) * 38}
              x2={170 + Math.cos(a) * 27} y2={56 + Math.sin(a) * 27}
              stroke={mxh(_L, 0.38)} strokeWidth={i % 3 === 0 ? 7 : 4} />;
          })}
          {/* the burst, drawn as geometry so it stencils rather than sits on top */}
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45) * Math.PI / 180;
            return <line key={"br" + i}
              x1={170 + Math.cos(a) * 7} y1={56 + Math.sin(a) * 7}
              x2={170 + Math.cos(a) * 22} y2={56 + Math.sin(a) * 22}
              stroke={mxh(_L, 0.58)} strokeWidth={6} strokeLinecap="round" />;
          })}
          <rect x={104} y={104} width={132} height={6} fill={mxh(_L, 0.30)} />
          {[0, 1, 2].map((i) => (
            <path key={"cv" + i}
              d={`M ${140} ${122 + i * 17} L ${170} ${136 + i * 17} L ${200} ${122 + i * 17}`}
              fill="none" stroke={mxh(_L, 0.34)} strokeWidth={7}
              strokeLinecap="round" strokeLinejoin="round" opacity={0.85 - i * 0.2} />
          ))}
        </g>
        {/* rivets, popping one at a time */}
        {Array.from({ length: 7 }, (_, i) => {
          const gone = rivets > i / 7 ? 1 : 0;
          return <circle key={i} cx={132 + i * 12.6} cy={162} r={4.4}
            fill={gone ? dkh(_B, 0.45) : (heat > 0.4 ? "#FFCE8A" : STEELL)} opacity={gone ? 0.5 : 1} />;
        })}
        {/* THE HATCH — drives across the mouth at S4 and locks */}
        {hatch > 0.01 && (<>
          <rect x={170 - mw / 2 - 12 + (1 - hatch) * (mw + 24)} y={-8}
            width={mw + 24} height={26} rx={4} fill={STEELD} />
          <rect x={170 - mw / 2 - 12 + (1 - hatch) * (mw + 24)} y={-8}
            width={mw + 24} height={7} rx={3} fill={STEEL} />
          {hatch > 0.95 && <rect x={162} y={-2} width={16} height={16} rx={3} fill={GOLD} />}
        </>)}
      </svg>
      {/* the intake mouth's dark interior — reads as a hole, not a lid */}
      <div style={{ position: "absolute", left: (-mw / 2 + 2) * s, top: 4 * s,
        width: (mw - 4) * s, height: 16 * s, borderRadius: 4,
        background: "#0D1014", opacity: open }} />
    </div>
  );
};

/** the ten-segment context arc bolted across the throat.
    ⛔ NOT A NUMERAL. The translation table's first row: ten segments, N lit. */
export const ContextArc: React.FC<{ x: number; y: number; lit: number; s?: number; z?: number;
  f?: number }> = ({ x, y, lit, s = 1, z = 70, f = 0 }) => {
  const n = 10, on = lit * n;
  const shake = lit > 0.95 ? Math.sin(f / 1.7) * 1.6 : 0;
  return (
    <div style={{ position: "absolute", left: x, top: y + shake, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
      <div style={{ position: "absolute", left: -14, top: -12, width: 348, height: 74,
        borderRadius: 14, background: HOPD, border: `4px solid ${dkh(HOP, 0.28)}`,
        boxShadow: "0 8px 18px rgba(6,8,12,0.5)" }} />
      {Array.from({ length: n }, (_, i) => {
        const k = Math.max(0, Math.min(1, on - i));
        const hot = i >= 8;
        const c = k < 0.05 ? dkh(HOP, 0.36) : hot ? mxh(RED, (1 - k) * 0.3) : mxh(GOLD, 0.10);
        return <div key={i} style={{ position: "absolute", left: i * 32, top: 0, width: 26,
          height: 50, borderRadius: 4, background: c,
          transform: `scaleY(${0.72 + k * 0.28})`, transformOrigin: "50% 100%" }} />;
      })}
      <div style={{ position: "absolute", left: 0, top: 56, width: 320, height: 5,
        borderRadius: 3, background: dkh(HOP, 0.44) }} />
    </div>
  );
};

/* =========================================================================
   THE HOODED LAMP — the reel's ONE light source, born at S3. It is a fixture in
   the set, and it SWINGS when something lands, which is how the room reacts
   without a second animation competing for the hierarchy.
   ====================================================================== */
export const HoodLamp: React.FC<{ x: number; y: number; on?: number; s?: number; z?: number;
  f?: number; kick?: number; len?: number; bot?: number }> =
  ({ x, y, on = 1, s = 1, z = 74, f = 0, kick = 0, len = 470, bot = 470 }) => {
  const sw = Math.sin(f / 39) * 1.1 + Math.sin(f / 6.1) * kick * 7;
  return (<>
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `rotate(${sw}deg)`, transformOrigin: "50% -170px" }}>
      <div style={{ position: "absolute", left: -4 * s, top: -190 * s, width: 8 * s,
        height: 194 * s, background: dkh(STEELD, 0.30) }} />
      <svg width={190 * s} height={92 * s} viewBox="0 0 190 92"
        style={{ position: "absolute", left: -95 * s, top: -6 * s, overflow: "visible" }}>
        <path d="M 95 0 C 118 0 168 46 182 82 L 8 82 C 22 46 72 0 95 0 Z" fill={STEELD} />
        <path d="M 95 0 C 108 0 132 24 143 58 L 52 58 C 62 24 82 0 95 0 Z"
          fill={STEEL} opacity={0.55} />
        <rect x={6} y={78} width={178} height={9} rx={4} fill={dkh(STEELD, 0.26)} />
        <ellipse cx={95} cy={82} rx={62} ry={11} fill={on > 0.02 ? LAMPC : "#2B2F35"} />
      </svg>
      {on > 0.02 && <Beam x={0} y={78 * s} top={110 * s} bot={bot} len={len} c={LAMPC}
        o={0.30 * on} z={-2} f={f} />}
    </div>
  </>);
};

/* =========================================================================
   THE DESK. The deck plus its NEAR LIP, which is the frame-edge mass in front of
   the action — without one the camera is pointed at a backdrop
   (ANIMATION-QUALITY §8: the depth question that is checked by eye).
   ====================================================================== */
export const Desk: React.FC<{ p: Place; y: number; f?: number; z?: number; rail?: number;
  slot?: boolean; clutter?: number; lip?: boolean; props?: boolean; day?: number;
  cast?: string; castK?: number }> =
  ({ p, y, f = 0, z = 40, rail = 0, slot = false, clutter = 0, lip = true, props = true,
     day = 0, cast, castK = 0.55 }) => {
  const OK = cast ? blend(OAK, cast, castK) : OAK;
  const W_ = (k: number) => mxh(OK, k + day * 0.30); return (<>
    {/* ⛔ A COUNTER, NOT A SHELF. It reaches the panel floor, so the viewer is
        STANDING at it. A slab floating over a visible floor reads as a diagram. */}
    <div style={{ position: "absolute", left: -40, right: -40, top: y + 22, bottom: -40, zIndex: z,
      background: `linear-gradient(180deg, ${day ? W_(0.10) : dkh(OK, 0.26)} 0%, ${day ? W_(-0.14) : dkh(OK, 0.60)} 62%, ${day ? W_(-0.24) : dkh(OK, 0.74)} 100%)` }} />
    {/* the deck: the top surface, catching the key */}
    <div style={{ position: "absolute", left: -40, right: -40, top: y, height: 24, zIndex: z + 1,
      background: `linear-gradient(180deg, ${W_(0.30)} 0%, ${W_(0.06)} 100%)` }} />
    <div style={{ position: "absolute", left: -40, right: -40, top: y + 22, height: 7, zIndex: z + 2,
      background: dkh(OAK, 0.46) }} />
    {/* the panelling on the front, so it is joinery and not a painted band */}
    {[0, 1, 2, 3].map((i) => (
      <div key={"pn" + i} style={{ position: "absolute", left: 22 + i * 258, top: y + 52,
        width: 214, height: 118, borderRadius: 4, zIndex: z + 3,
        background: day ? W_(-0.06) : dkh(OK, 0.40), border: `3px solid ${day ? W_(-0.20) : dkh(OK, 0.56)}` }} />
    ))}
    {/* the drawer, with a brass pull */}
    <div style={{ position: "absolute", left: 280, top: y + 52, width: 214, height: 118,
      borderRadius: 4, zIndex: z + 4, background: day ? W_(0.02) : dkh(OK, 0.30),
      border: `3px solid ${day ? W_(-0.16) : dkh(OK, 0.52)}` }} />
    <div style={{ position: "absolute", left: 352, top: y + 100, width: 70, height: 11,
      borderRadius: 6, background: cast ? blend(BRASSD, cast, castK * 0.7) : BRASSD, zIndex: z + 5 }} />
    {/* the request rail */}
    {rail > 0 && (<>
      <div style={{ position: "absolute", left: 60, top: y - 12, width: 890, height: 10,
        borderRadius: 5, background: dkh(STEELD, 0.18), zIndex: z + 6 }} />
      <div style={{ position: "absolute", left: 60, top: y - 12, width: 890, height: 3,
        borderRadius: 2, background: STEELL, opacity: 0.45, zIndex: z + 7 }} />
    </>)}
    {slot && (<>
      <div style={{ position: "absolute", left: 66, top: y - 62, width: 132, height: 62,
        borderRadius: "6px 6px 0 0", background: dkh(STEELD, 0.10), zIndex: z + 6,
        border: `4px solid ${dkh(STEELD, 0.34)}` }} />
      <div style={{ position: "absolute", left: 84, top: y - 44, width: 96, height: 12,
        borderRadius: 3, background: "#0D1014", zIndex: z + 7 }} />
    </>)}
    {/* the world props that say this is a records desk: an out-tray and a stamp */}
    {props && (<>
      <div style={{ position: "absolute", left: 726, top: y - 26, width: 196, height: 26,
        borderRadius: 4, background: dkh(STEELD, 0.12), zIndex: z + 6 }} />
      <div style={{ position: "absolute", left: 726, top: y - 30, width: 196, height: 7,
        borderRadius: 4, background: STEELL, opacity: 0.44, zIndex: z + 7 }} />
      <div style={{ position: "absolute", left: 738, top: y - 44, width: 172, height: 16,
        borderRadius: 3, background: mxh(CARD, 0.10), zIndex: z + 6 }} />
      <div style={{ position: "absolute", left: 962, top: y - 54, width: 34, height: 54,
        borderRadius: "6px 6px 3px 3px", background: dkh(STAMPR, 0.20), zIndex: z + 6 }} />
      <div style={{ position: "absolute", left: 954, top: y - 62, width: 50, height: 14,
        borderRadius: 5, background: dkh(INK, 0.02), zIndex: z + 7 }} />
    </>)}
    {/* clutter left on the deck, swept away in S3 */}
    {clutter > 0 && Array.from({ length: 12 }, (_, i) => (
      <div key={"cl" + i} style={{ position: "absolute", left: 90 + rnd(i, 5) * 820,
        top: y - 16 - rnd(i, 6) * 10, width: 22 + rnd(i, 7) * 34, height: 8,
        borderRadius: 3, background: SHRED, opacity: clutter * 0.85, zIndex: z + 8,
        transform: `rotate(${-24 + rnd(i, 8) * 48}deg)` }} />
    ))}
    {/* ⛔ THE NEAR LIP — the frame-edge mass, IN FRONT of everything */}
    {lip && (<>
      <div style={{ position: "absolute", left: -40, right: -40, top: H - 96, height: 130,
        zIndex: 93, background: `linear-gradient(180deg, ${dkh(OK, 0.56)} 0%, ${dkh(OK, 0.76)} 100%)` }} />
      <div style={{ position: "absolute", left: -40, right: -40, top: H - 100, height: 8,
        background: mxh(OK, 0.10), zIndex: 94 }} />
    </>)}
  </>); };

/* =========================================================================
   ⭐ THE HERO ARTIFACT — THE COMPASS CARD. One cream .md card on a brass stand
   with a rose etched into its face and a needle that takes a BEARING. It must
   carry both halves of the promise in one object: it is SMALL (one card against
   two hundred) and it POINTS (the needle is the only thing in the reel that
   aims). Born S5, works S6-S8, survives a change at S9, handed over at S11.
   ⛔ The rose is drawn as GEOMETRY — it is the only text-shaped thing in the
      reel and it is never typeset.
   ====================================================================== */
export const CompassCard: React.FC<{ x: number; y: number; s?: number; z?: number; f?: number;
  etch?: number; bearing?: number; lock?: number; label?: boolean; tick?: number;
  stand?: boolean; twitch?: number; bump?: number }> =
  ({ x, y, s = 1, z = 80, f = 0, etch = 1, bearing = 0, lock = 0, label = true,
     tick = 0, stand = true, twitch = 0, bump = 0 }) => {
  /* the needle HUNTS: a fast search while unlocked, then an overshoot that decays,
     then a live micro-correction that never quite stops. A dial that drifts on one
     sine reads as an ornament; a dial that hunts reads as an instrument. */
  const hunt = Math.sin(f / 5.5) * 13 + Math.sin(f / 2.1) * 5;
  const settle = Math.sin(f / 3.4) * Math.exp(-f / 30) * 9;
  const micro = Math.sin(f / 17) * 1.5 + Math.sin(f / 6.3) * 0.7;
  const ang = bearing + (1 - lock) * hunt + lock * (settle + micro)
              + Math.sin(f / 2.3) * twitch * 11;
  const bez = f * 0.55;            /* the outer bezel turns, always */
  const inner = -f * 0.9;          /* and the inner ring counter-turns */
  const sweep = (f * 3.2) % 360;   /* a lit tick running the ring */
  /* ⭐ THE BODY. Two harmonics so the bob never looks like one sine, a slow sway,
     a lean that FOLLOWS the needle (the mass arrives after the reading), and the
     bump the scene drives. Amplitudes are above the 2.6deg / 4.6px floor the
     learnings doc measured as the minimum that reads to a human. */
  const bob  = Math.sin(f / 11) * 5.4 + Math.sin(f / 4.3) * 1.8 - bump * 16;
  const sway = Math.sin(f / 27) * 2.6 + Math.sin(f / 9.1) * 0.9;
  const lean = Math.sin(f / 13) * 1.4 + ((1 - lock) * hunt + lock * micro) * 0.09
             + bump * 3.4 + twitch * 2.2;
  const flex = 1 + Math.sin(f / 11 + 1.6) * 0.028 + bump * 0.06;
  const R = 62;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
      {/* ⛔ THE BASE IS PLANTED. Everything above it rides the spring. */}
      {stand && (
        <div style={{ position: "absolute", left: -66, top: 196, width: 132, height: 15,
          borderRadius: 5, background: `linear-gradient(180deg, ${BRASSL} 0%, ${BRASSD} 100%)`,
          boxShadow: "0 8px 16px rgba(6,8,12,0.55)" }} />
      )}
      <div style={{ position: "absolute", inset: 0,
        transform: `translateY(${bob}px) translateX(${sway}px) rotate(${lean}deg)`,
        transformOrigin: "50% 196px" }}>
      {stand && (<>
        {/* the post, flexing under the card */}
        <div style={{ position: "absolute", left: -13, top: 150, width: 26, height: 52,
          transformOrigin: "50% 100%", transform: `scaleY(${1 / flex}) scaleX(${flex})`,
          background: `linear-gradient(90deg, ${BRASSD} 0%, ${BRASS} 40%, ${BRASSD} 100%)` }} />
        <div style={{ position: "absolute", left: -46, top: 138, width: 92, height: 14,
          borderRadius: 4, background: BRASS }} />
      </>)}
      {/* the card */}
      <div style={{ position: "absolute", left: -78, top: -12, width: 156, height: 156,
        borderRadius: 7, background: `linear-gradient(168deg, ${PAPERL} 0%, ${PAPER} 62%, ${PAPERD} 100%)`,
        boxShadow: "0 16px 30px rgba(6,8,12,0.60)" }} />
      <div style={{ position: "absolute", left: -78, top: -12, width: 156, height: 8,
        borderRadius: "7px 7px 0 0", background: "#FFFFFF", opacity: 0.55 }} />
      {/* the etched rose */}
      <svg width={156} height={156} viewBox="0 0 156 156"
        style={{ position: "absolute", left: -78, top: -12, overflow: "visible" }}>
        <circle cx={78} cy={78} r={R} fill="none" stroke={dkh(PAPERD, 0.30)} strokeWidth={3}
          strokeDasharray={2 * Math.PI * R} strokeDashoffset={(1 - Math.min(1, etch * 1.6)) * 2 * Math.PI * R}
          transform="rotate(-90 78 78)" />
        {/* the bezel, turning */}
        <g transform={`rotate(${bez} 78 78)`} opacity={Math.max(0, etch * 2 - 0.5)}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 - 90) * Math.PI / 180;
            return <rect key={"bz" + i} x={78 + Math.cos(a) * (R + 4) - 3}
              y={78 + Math.sin(a) * (R + 4) - 3} width={6} height={6} rx={1.5}
              fill={dkh(PAPERD, 0.34)} />;
          })}
        </g>
        {/* the inner ring, counter-turning */}
        <g transform={`rotate(${inner} 78 78)`} opacity={Math.max(0, etch * 2 - 0.8)}>
          <circle cx={78} cy={78} r={R - 11} fill="none" stroke={dkh(PAPERD, 0.16)}
            strokeWidth={1.6} strokeDasharray="7 5" />
        </g>
        {/* the ticks */}
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * 15 - 90) * Math.PI / 180;
          const long = i % 6 === 0;
          const k = Math.max(0, Math.min(1, etch * 3 - 1 - i / 40));
          /* a lit tick runs the ring, so the dial is never still */
          const d = Math.abs(((i * 15) - sweep + 540) % 360 - 180);
          const hot = Math.max(0, 1 - d / 34);
          return <line key={i}
            x1={78 + Math.cos(a) * (R - 4)} y1={78 + Math.sin(a) * (R - 4)}
            x2={78 + Math.cos(a) * (R - (long ? 20 : 11) - hot * 5)}
            y2={78 + Math.sin(a) * (R - (long ? 20 : 11) - hot * 5)}
            stroke={hot > 0.1 ? mxh(CLAY, 1 - hot * 0.7) : dkh(PAPERD, long ? 0.42 : 0.22)}
            strokeWidth={(long ? 4 : 2) + hot * 2} opacity={k} />;
        })}
        {/* the four cardinals, as WEDGES not letters */}
        {[0, 90, 180, 270].map((d, i) => {
          const k = Math.max(0, Math.min(1, etch * 3 - 1.6));
          const a0 = (d - 96) * Math.PI / 180, a1 = (d - 84) * Math.PI / 180;
          return <path key={d} opacity={k}
            d={`M 78 78 L ${78 + Math.cos(a0) * (R - 22)} ${78 + Math.sin(a0) * (R - 22)} L ${78 + Math.cos(a1) * (R - 22)} ${78 + Math.sin(a1) * (R - 22)} Z`}
            fill={i === 0 ? dkh(CLAY, 0.06) : dkh(PAPERD, 0.34)} />;
        })}
        {/* THE NEEDLE — the only thing in this reel that aims */}
        <g transform={`rotate(${ang} 78 78)`} opacity={Math.max(0, Math.min(1, etch * 3 - 1.9))}>
          <path d={`M 78 ${78 - R + 12} L 85 78 L 78 88 L 71 78 Z`} fill={CLAY} />
          <path d={`M 78 ${78 + R - 16} L 84 78 L 78 72 L 72 78 Z`} fill={dkh(PAPERD, 0.46)} />
        </g>
        <circle cx={78} cy={78} r={7} fill={dkh(PAPERD, 0.50)} />
        <circle cx={78} cy={78} r={3} fill={PAPERL} />
      </svg>
      {/* the green tick struck into the corner at S9 */}
      {tick > 0.02 && (
        <div style={{ position: "absolute", left: 44, top: 104, width: 34, height: 34,
          borderRadius: 9, background: GREEN, opacity: tick, transform: `scale(${0.6 + tick * 0.4})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#F4FBF7" }}>✓</div>
      )}
      </div>
      {label && (
        <div style={{ position: "absolute", left: -84, top: 152, width: 168, textAlign: "center",
          fontFamily: MONO, fontWeight: 800, fontSize: 21, letterSpacing: "0.06em",
          color: "#F2EADA", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>COMPASS.md</div>
      )}
    </div>
  );
};

/** ⭐ THE ROUTING BEAM — a hard-edged cone from the compass to a bearing on the
    wall. Large x bright x fast is the only combination that registers
    (ANIMATION-QUALITY §1), so this is drawn as a solid wedge, not a glow. */
export const RouteBeam: React.FC<{ x: number; y: number; toX: number; toY: number;
  o?: number; z?: number; c?: string; wide?: number; f?: number }> =
  ({ x, y, toX, toY, o = 0.5, z = 46, c = LAMPC, wide = 26, f = 0 }) => {
  const dx = toX - x, dy = toY - y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const flick = 0.92 + Math.sin(f / 5.3) * 0.08;
  return (
    <div style={{ position: "absolute", left: x, top: y - wide / 2, width: len, height: wide,
      zIndex: z, transform: `rotate(${ang}deg)`, transformOrigin: "0% 50%",
      background: `linear-gradient(90deg, ${hexa(c, o * flick)} 0%, ${hexa(c, o * 0.46 * flick)} 62%, ${hexa(c, 0)} 100%)`,
      clipPath: "polygon(0 44%, 100% 6%, 100% 94%, 0 56%)" }}>
      {/* the hot core — a beam with no core reads as a smudge */}
      <div style={{ position: "absolute", left: 0, top: wide / 2 - 1.5, width: len, height: 3,
        background: `linear-gradient(90deg, ${hexa("#FFFFFF", o * 0.85)} 0%, ${hexa(c, o * 0.34)} 62%, ${hexa(c, 0)} 100%)` }} />
    </div>
  );
};

/* =========================================================================
   S2 — THE PIN BOARD. A different base object from the hopper (the CALLBACK
   S1=S2 failure is what the board's critic pass caught), on the room's other
   wall, with the REAL GitHub mark on a white tile.
   ====================================================================== */
export const PinBoard: React.FC<{ x: number; y: number; f: number; n?: number; z?: number;
  flip?: (i: number) => number; stamp?: number; sheet?: string; sheetD?: string;
  board?: string }> =
  ({ x, y, f, n = 12, z = 40, flip, stamp = 0, sheet = CARD, sheetD = CARDD,
     board = "#6E5C42" }) => (<>
    <div style={{ position: "absolute", left: x - 22, top: y - 26, width: 716, height: 396,
      borderRadius: 8, background: board, border: `12px solid ${dkh(board, 0.42)}`,
      boxShadow: "0 14px 28px rgba(6,8,12,0.55)", zIndex: z }} />
    <div style={{ position: "absolute", left: x - 10, top: y - 14, width: 692, height: 372,
      background: `repeating-linear-gradient(46deg, ${dkh(board, 0.02)} 0 5px, ${dkh(board, 0.16)} 5px 10px)`,
      zIndex: z + 1 }} />
    {Array.from({ length: n }, (_, i) => {
      const k = flip ? flip(i) : 1;
      if (k <= 0.01) return null;
      const cx = x + (i % 4) * 172, cy = y + Math.floor(i / 4) * 122;
      const yr = (1 - k) * 90;                      /* split-flap: rotates down into place */
      const dates = ["2022", "2023", "2022", "2023", "2021", "2023",
                     "2022", "2020", "2023", "2022", "2021", "2023"];
      return (
        <div key={"r" + i} style={{ position: "absolute", left: cx, top: cy, width: 156,
          height: 104, zIndex: z + 6, transformOrigin: "50% 0%",
          transform: `perspective(700px) rotateX(${-yr}deg)`, opacity: Math.min(1, k * 2.2) }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 5,
            background: stamp > 0.4 ? dkh(sheet, 0.34) : sheet,
            boxShadow: "0 5px 12px rgba(6,8,12,0.45)" }} />
          {[0, 1, 2].map((r) => (
            <div key={r} style={{ position: "absolute", left: 12, top: 16 + r * 15,
              width: 118 - r * 26, height: 6, borderRadius: 3, background: dkh(sheetD, 0.16) }} />
          ))}
          <div style={{ position: "absolute", left: 12, top: 70, padding: "3px 9px",
            borderRadius: 5, background: stamp > 0.4 ? STAMPR : dkh(CARDD, 0.30),
            fontFamily: MONO, fontWeight: 800, fontSize: 17,
            color: stamp > 0.4 ? "#FDF3F1" : "#4A4436" }}>{dates[i % 12]}</div>
        </div>
      );
    })}
    {/* the real mark at the board's head — a wrong mark is worse than no mark */}
    <div style={{ position: "absolute", left: x + 268, top: y - 92, width: 76, height: 76,
      borderRadius: 18, background: "#FFFFFF", border: "3px solid #E8DCC0", zIndex: z + 9,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 16px rgba(6,8,12,0.45)" }}>
      <Img src={staticFile("logos/github.svg")} style={{ width: 54, height: 54 }} />
    </div>
    {stamp > 0.02 && (<>
      {/* the ink slab itself: solid, ragged, and it sits ON the board */}
      <div style={{ position: "absolute", left: x + 10, top: y + 96, zIndex: z + 40,
        transform: `rotate(-8deg) scale(${1.55 - stamp * 0.55})`,
        opacity: Math.min(1, stamp * 1.7) }}>
        <div style={{ position: "relative", padding: "20px 42px",
          background: STAMPR, borderRadius: 6,
          clipPath: "polygon(1% 6%, 12% 0%, 34% 5%, 58% 0%, 82% 6%, 99% 2%, 100% 40%, 98% 74%, 100% 96%, 76% 100%, 52% 95%, 26% 100%, 6% 96%, 0% 62%, 2% 30%)",
          boxShadow: "0 10px 22px rgba(40,6,4,0.5)" }}>
          {/* the worn patches, so the ink is not a flat fill */}
          {[[18, 14, 64, 9], [128, 52, 92, 7], [232, 18, 48, 8], [66, 66, 40, 6]].map((r, i) => (
            <div key={"wr" + i} style={{ position: "absolute", left: r[0], top: r[1],
              width: r[2], height: r[3], borderRadius: 4,
              background: dkh(STAMPR, 0.22), opacity: 0.55 }} />
          ))}
          <span style={{ position: "relative", fontFamily: inter.fontFamily, fontWeight: 900,
            fontSize: 62, letterSpacing: "0.06em", color: "#FCEAE6" }}>OUTDATED</span>
        </div>
      </div>
      {/* the flecks it throws when it lands */}
      {Array.from({ length: 10 }, (_, i) => {
        const k = Math.min(1, stamp * 1.4);
        return <div key={"fk" + i} style={{ position: "absolute",
          left: x + 300 + (rnd(i, 3) - 0.5) * 460 * k, top: y + 160 + (rnd(i, 4) - 0.5) * 220 * k,
          width: 5 + rnd(i, 5) * 9, height: 5 + rnd(i, 6) * 7, borderRadius: 4,
          background: STAMPR, opacity: (1 - k * 0.4) * 0.8, zIndex: z + 41 }} />;
      })}
    </>)}
  </>);

/** the wall clock — "waste hours", depicted. The hands SWEEP, they never jump. */
export const WallClock: React.FC<{ x: number; y: number; s?: number; z?: number; spin: number }> =
  ({ x, y, s = 1, z = 50, spin }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 50%" }}>
    <div style={{ position: "absolute", left: -58, top: -58, width: 116, height: 116,
      borderRadius: "50%", background: dkh(STEELD, 0.18), border: `7px solid ${dkh(STEELD, 0.42)}`,
      boxShadow: "0 8px 18px rgba(6,8,12,0.5)" }} />
    <div style={{ position: "absolute", left: -44, top: -44, width: 88, height: 88,
      borderRadius: "50%", background: mxh(CARD, 0.10) }} />
    {Array.from({ length: 12 }, (_, i) => {
      const a = i * 30 * Math.PI / 180;
      return <div key={i} style={{ position: "absolute",
        left: Math.sin(a) * 36 - 2, top: -Math.cos(a) * 36 - 2, width: 4, height: 4,
        borderRadius: 2, background: dkh(CARDD, 0.44) }} />;
    })}
    <div style={{ position: "absolute", left: -2, top: -30, width: 4, height: 32,
      borderRadius: 2, background: INK, transformOrigin: "50% 100%",
      transform: `rotate(${spin * 720}deg)` }} />
    <div style={{ position: "absolute", left: -2.5, top: -40, width: 5, height: 42,
      borderRadius: 3, background: dkh(CARDD, 0.52), transformOrigin: "50% 100%",
      transform: `rotate(${spin * 60}deg)` }} />
    <div style={{ position: "absolute", left: -5, top: -5, width: 10, height: 10,
      borderRadius: 5, background: CLAY }} />
  </div>
);

/* =========================================================================
   S9 — THE WALL COUNTER. A physical split-flap on a real object: the one place
   in this reel a numeral is allowed, because it IS a prop.
   ====================================================================== */
export const Counter: React.FC<{ x: number; y: number; v: string; nx: string; k: number;
  s?: number; z?: number }> = ({ x, y, v, nx, k, s = 1, z = 70 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "0% 50%" }}>
    <div style={{ position: "absolute", left: -10, top: -10, width: 172, height: 88,
      borderRadius: 10, background: "#14171B", border: `5px solid ${dkh(STEELD, 0.36)}`,
      boxShadow: "0 8px 18px rgba(6,8,12,0.55)" }} />
    <div style={{ position: "absolute", left: 0, top: 0, width: 152, height: 68,
      overflow: "hidden", borderRadius: 5, background: "#1C2026" }}>
      <div style={{ position: "absolute", left: 0, top: -k * 68, width: 152, height: 136 }}>
        {[v, nx].map((t, i) => (
          <div key={i} style={{ position: "absolute", left: 0, top: i * 68, width: 152, height: 68,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: fraunces.fontFamily, fontWeight: 900, fontSize: 46,
            color: i === 1 ? GOLD : "#EFE8D8" }}>{t}</div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, top: 32, width: 152, height: 3,
        background: "#0A0C0F" }} />
    </div>
  </div>
);

/* =========================================================================
   S10 — THE PRINT CARRIAGE, THE FOLDER, THE DRAWER.
   ⛔ THE PAGE FILLS WITH GREY RULED BARS, NEVER READABLE TYPE. A number MOVES to
      its value; information is watched, not read (ANIMATION-QUALITY §4).
   ====================================================================== */
export const Carriage: React.FC<{ x: number; y: number; f: number; fill: number; lever: number;
  z?: number; s?: number }> = ({ x, y, f, fill, lever, z = 60, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    {/* the body */}
    <div style={{ position: "absolute", left: -196, top: 78, width: 392, height: 104,
      borderRadius: 12, background: `linear-gradient(180deg, ${STEEL} 0%, ${STEELD} 100%)`,
      boxShadow: "0 12px 24px rgba(6,8,12,0.55)" }} />
    <div style={{ position: "absolute", left: -196, top: 78, width: 392, height: 10,
      borderRadius: "12px 12px 0 0", background: STEELL, opacity: 0.6 }} />
    {/* the page rising out of it as it fills */}
    <div style={{ position: "absolute", left: -104, top: 96 - fill * 118, width: 208, height: 268,
      borderRadius: 5, background: `linear-gradient(172deg, ${PAPERL} 0%, ${PAPER} 100%)`,
      boxShadow: "0 10px 20px rgba(6,8,12,0.5)" }}>
      {/* the title rule */}
      <div style={{ position: "absolute", left: 18, top: 16, width: 122 * Math.min(1, fill * 6),
        height: 10, borderRadius: 5, background: dkh(CLAY, 0.04) }} />
      {[0, 1, 2].map((sec) => {
        const cols = ["#EAC079", "#E08A5C", "#F2E4C4"];
        const base = 44 + sec * 74;
        const k = Math.max(0, Math.min(1, fill * 3.6 - sec * 0.9));
        if (k <= 0.01) return null;
        return (
          <React.Fragment key={"sec" + sec}>
            {/* the source file's colour, down the margin */}
            <div style={{ position: "absolute", left: 12, top: base, width: 7,
              height: 58 * k, borderRadius: 4, background: cols[sec] }} />
            {/* ⭐ and the Claude that opened it */}
            <div style={{ position: "absolute", left: 24, top: base + 2,
              width: 22 * k, height: 22 * k, borderRadius: 5,
              background: mxh(CLAY, 0.06), opacity: k }}>
              <div style={{ position: "absolute", left: 4 * k, top: 8 * k, width: 4.5 * k,
                height: 6 * k, borderRadius: 1, background: "#1E1710" }} />
              <div style={{ position: "absolute", left: 13 * k, top: 8 * k, width: 4.5 * k,
                height: 6 * k, borderRadius: 1, background: "#1E1710" }} />
            </div>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ position: "absolute", left: 54, top: base + 4 + r * 17,
                width: (128 - (r % 3) * 30) * k, height: 6, borderRadius: 3,
                background: dkh(PAPERD, 0.22 + (r % 2) * 0.10) }} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
    {/* the print head sweeping */}
    <div style={{ position: "absolute", left: -110 + fill * 200, top: 86, width: 24, height: 88,
      borderRadius: 4, background: dkh(STEELD, 0.30), zIndex: 4 }} />
    <div style={{ position: "absolute", left: -104 + fill * 200, top: 150, width: 12, height: 12,
      borderRadius: 6, background: CLAY, zIndex: 5 }} />
    {/* the lever */}
    <div style={{ position: "absolute", left: 176, top: 62, width: 14, height: 78,
      borderRadius: 7, background: BRASS, transformOrigin: "50% 100%",
      transform: `rotate(${lever * 62}deg)`, zIndex: 3 }} />
    <div style={{ position: "absolute", left: 168, top: 52, width: 30, height: 22,
      borderRadius: 11, background: BRASSL, transformOrigin: "50% 400%",
      transform: `rotate(${lever * 62}deg)`, zIndex: 4 }} />
    {/* the mark cast into the carriage face, large */}
    <div style={{ position: "absolute", left: -178, top: 108, width: 62, height: 62,
      borderRadius: 15, background: "#FFFFFF", border: "3px solid #E8DCC0", zIndex: 6,
      display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Img src={staticFile("claude_logo.png")} style={{ width: 44, height: 44, objectFit: "contain" }} />
    </div>
  </div>
);

export const Folder: React.FC<{ x: number; y: number; shut: number; stamp: number; slide: number;
  z?: number; s?: number }> = ({ x, y, shut, stamp, slide, z = 62, s = 1 }) => (
  <div style={{ position: "absolute", left: x + slide * 190, top: y + slide * 62, zIndex: z,
    transform: `scale(${s * (1 - slide * 0.2)})`, transformOrigin: "50% 100%", opacity: 1 - slide * 0.25 }}>
    <div style={{ position: "absolute", left: -104, top: -18, width: 208, height: 24,
      borderRadius: "8px 30px 0 0", background: dkh(GOLD, 0.30) }} />
    <div style={{ position: "absolute", left: -104, top: 0, width: 208, height: 122,
      borderRadius: 8, background: `linear-gradient(172deg, ${mxh(GOLD, 0.34)} 0%, ${dkh(GOLD, 0.18)} 100%)`,
      boxShadow: "0 10px 20px rgba(6,8,12,0.5)" }} />
    {/* the flap closing over the page */}
    <div style={{ position: "absolute", left: -104, top: 0, width: 208, height: 122,
      borderRadius: 8, background: `linear-gradient(172deg, ${mxh(GOLD, 0.18)} 0%, ${dkh(GOLD, 0.30)} 100%)`,
      transformOrigin: "50% 0%", transform: `perspective(700px) rotateX(${(1 - shut) * 104}deg)` }} />
    {stamp > 0.02 && (
      <div style={{ position: "absolute", left: -96, top: -2, padding: "10px 18px",
        borderRadius: 9, background: "#FBF7EC", border: `5px solid ${dkh(GOLD, 0.34)}`,
        opacity: Math.min(1, stamp * 1.5), display: "flex", alignItems: "center", gap: 10,
        transform: `rotate(-4deg) scale(${1.45 - stamp * 0.45})`,
        boxShadow: "0 10px 20px rgba(6,8,12,0.45)" }}>
        <span style={{ width: 22, height: 22, borderRadius: 5, background: mxh(CLAY, 0.02),
          display: "inline-block" }} />
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 30,
          letterSpacing: "0.02em", color: "#241F17" }}>SCRIPT.md</span>
      </div>
    )}
    {stamp > 0.6 && (
      <div style={{ position: "absolute", left: 62, top: 74, width: 38, height: 38, borderRadius: 10,
        background: GREEN, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 24, color: "#F4FBF7" }}>✓</div>
    )}
  </div>
);

/** the summary that comes back: three cards fold into ONE brief and it STANDS UP.
    ⛔ ruled grey bars, never legible type. */
export const Brief: React.FC<{ x: number; y: number; f: number; rise: number; z?: number;
  s?: number; tick?: number }> = ({ x, y, f, rise, z = 76, s = 1, tick = 0 }) => {
  const rock = Math.sin(f / 3.1) * Math.exp(-f / 26) * 3.4;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: z,
      transform: `scale(${s}) rotate(${rock}deg) perspective(900px) rotateX(${(1 - rise) * 82}deg)`,
      transformOrigin: "50% 100%", opacity: Math.min(1, rise * 3) }}>
      <div style={{ position: "absolute", left: -96, top: -244, width: 192, height: 246,
        borderRadius: 7, background: `linear-gradient(170deg, ${PAPERL} 0%, ${PAPER} 74%, ${PAPERD} 100%)`,
        boxShadow: "0 16px 30px rgba(6,8,12,0.6)" }} />
      <div style={{ position: "absolute", left: -74, top: -216, width: 118, height: 12,
        borderRadius: 6, background: dkh(CLAY, 0.04) }} />
      {Array.from({ length: 7 }, (_, r) => (
        <div key={r} style={{ position: "absolute", left: -74, top: -188 + r * 22,
          width: 148 - (r % 3) * 40, height: 7, borderRadius: 4,
          background: dkh(PAPERD, 0.20 + (r % 2) * 0.12) }} />
      ))}
      {tick > 0.02 && (
        <div style={{ position: "absolute", left: 34, top: -58, width: 38, height: 38,
          borderRadius: 10, background: GREEN, opacity: tick,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 26, color: "#F4FBF7" }}>✓</div>
      )}
    </div>
  );
};

/** ⛔ A DIFFERENT OBJECT, NOT A DIFFERENT PAINT. Two scenes were repainted and
    still failed the eye, because the SHAPE was the same flat card grid. The
    request desk and the press room get PIGEONHOLES instead: deep open cells with
    a lit interior, which reads as a completely different piece of joinery at a
    glance even though it is still, honestly, where the paper lives. */
export const Pigeonholes: React.FC<{ p: Place; f: number; x?: number; y?: number;
  cols?: number; rows?: number; cw?: number; ch?: number; z?: number; fill?: number;
  cast?: string }> =
  ({ p, f, x = 60, y = 118, cols = 7, rows = 5, cw = 138, ch = 84, z = 18, fill = 0.7,
     cast }) => {
  const face = cast ? blend(mxh(p.back, 0.16), cast, 0.35) : mxh(p.back, 0.16);
  return (
  <div style={{ position: "absolute", inset: 0, zIndex: z,
    transform: "perspective(1700px) rotateY(-6deg)", transformOrigin: "10% 50%" }}>
    <div style={{ position: "absolute", left: x - 18, top: y - 16,
      width: cols * cw + 36, height: rows * ch + 32, background: face,
      boxShadow: "0 14px 30px rgba(4,6,12,0.55)" }} />
    {Array.from({ length: cols * rows }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const cx = x + c * cw, cy = y + r * ch;
      const has = rnd(i, 61) < fill;
      return (
        <React.Fragment key={"ph" + i}>
          {/* the cell: a dark hole with a lit floor, which is what makes it read
              as DEPTH rather than as a tile */}
          <div style={{ position: "absolute", left: cx, top: cy, width: cw - 10, height: ch - 10,
            background: `linear-gradient(184deg, ${dkh(p.back2, 0.20)} 0%, ${dkh(p.back2, 0.62)} 62%, ${blend(dkh(p.back2, 0.30), p.key, 0.16)} 100%)` }} />
          <div style={{ position: "absolute", left: cx, top: cy + ch - 20, width: cw - 10, height: 6,
            background: blend(mxh(p.lip, 0.16), p.key, 0.22), opacity: 0.7 }} />
          {has && (<>
            <div style={{ position: "absolute", left: cx + 12, top: cy + 26 + Math.sin(f / 41 + i) * 1.2,
              width: cw - 40, height: ch - 40, borderRadius: 2,
              background: cast ? blend(CARDDK, cast, 0.5) : CARDDK }} />
            <div style={{ position: "absolute", left: cx + 12, top: cy + 26 + Math.sin(f / 41 + i) * 1.2,
              width: cw - 40, height: 5,
              background: cast ? blend(mxh(CARDDK, 0.3), cast, 0.4) : mxh(CARDDK, 0.3) }} />
          </>)}
          {/* the divider, catching the key */}
          <div style={{ position: "absolute", left: cx - 10, top: cy - 8, width: 10, height: ch,
            background: face }} />
        </React.Fragment>
      );
    })}
    <div style={{ position: "absolute", left: x - 18, top: y + rows * ch + 8,
      width: cols * cw + 36, height: 16, background: dkh(p.back2, 0.10) }} />
  </div>);
};

/** ⭐ SPOTLIGHT — everything else goes down, the subject comes up, and a soft warm
    halo sits behind it. ⛔ NOT a `0 0 Npx <colour>` box-shadow: a shaped radial
    pool, which is how every other light in this reel is drawn. */
export const Spotlight: React.FC<{ x: number; y: number; r?: number; k: number;
  c?: string; z?: number; dim?: number }> =
  ({ x, y, r = 200, k, c = "#FFE7A8", z = 54, dim = 0.72 }) => (<>
    {/* the darkening, with a hole where the subject is */}
    <div style={{ position: "absolute", inset: -60, zIndex: z, pointerEvents: "none",
      background: `radial-gradient(${r * 1.5}px ${r * 1.5}px at ${x + 60}px ${y + 60}px, ${hexa("#05060C", 0)} 0%, ${hexa("#05060C", dim * 0.55)} 48%, ${hexa("#05060C", dim)} 78%)`,
      opacity: k }} />
    {/* the halo, behind the subject */}
    <div style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2,
      zIndex: z + 1, pointerEvents: "none", opacity: k,
      background: `radial-gradient(circle, ${hexa(c, 0.62)} 0%, ${hexa(c, 0.26)} 34%, ${hexa(c, 0)} 68%)` }} />
  </>);

/** ⛔ AN IMPACT WITH NO WEIGHT IS A STATE CHANGE. Everything a hit touches gets
    this: a decaying shake at the hit's own frequency, so the SET reacts and not
    just the object. Props only — never the camera (CAMERA-GRAMMAR). */
export const Hit: React.FC<{ f: number; at: number[]; amp?: number; freq?: number;
  z?: number; children: React.ReactNode }> =
  ({ f, at, amp = 1, freq = 2.6, z = 50, children }) => {
  let k = 0;
  for (const t of at) if (f >= t) k += Math.exp(-(f - t) / 6.5);
  const x = Math.sin(f / freq) * k * amp * 7;
  const y = Math.cos(f / (freq * 0.83)) * k * amp * 5;
  const r = Math.sin(f / (freq * 1.17)) * k * amp * 0.9;
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: z,
      transform: `translate(${x}px, ${y}px) rotate(${r}deg)` }}>{children}</div>
  );
};

/** ⭐ THE CTA PLATE. Alex, 2026-08-27: *"the COMMENT ROUTE at the end needs to
    like have its own containerized so its much easier to see separation."* The
    keyword is the ONE thing the whole reel is asking for, and it was set straight
    onto the set. It now has a card of its own, and the KEYWORD has a second
    container inside that — so the thing you actually type is the most enclosed
    object on screen. */
export const CtaPlate: React.FC<{ x?: number; y: number; k: number; word: string;
  lead?: string; z?: number; s?: number; f?: number }> =
  ({ x, y, k, word, lead = "COMMENT", z = 96, s = 1, f = 0 }) => {
  const pop = 0.72 + k * 0.28;
  const breathe = 1 + Math.sin(f / 13) * 0.008 * k;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, display: "flex",
      justifyContent: "center", zIndex: z, opacity: k,
      transform: `scale(${pop * breathe}) translateY(${(1 - k) * 26}px)` }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 26 * s,
        padding: `${24 * s}px ${34 * s}px`, borderRadius: 30 * s,
        background: "linear-gradient(180deg,#FFFFFF 0%,#F3ECDC 100%)",
        border: `${6 * s}px solid #E4D8BE`,
        boxShadow: "0 30px 64px -16px rgba(10,8,20,0.72), inset 0 3px 0 rgba(255,255,255,0.95)" }}>
        <span style={{ fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
          letterSpacing: "-0.02em", color: INK, whiteSpace: "nowrap" }}>{lead}</span>
        {/* the keyword's OWN container inside the card */}
        <span style={{ display: "inline-flex", alignItems: "center",
          padding: `${12 * s}px ${28 * s}px`, borderRadius: 18 * s,
          background: `linear-gradient(180deg, ${mxh(CLAY, 0.10)} 0%, ${dkh(CLAY, 0.20)} 100%)`,
          border: `${5 * s}px solid ${mxh(CLAY, 0.34)}`,
          boxShadow: "inset 0 3px 0 rgba(255,255,255,0.34), 0 8px 18px rgba(10,8,20,0.4)",
          fontFamily: inter.fontFamily, fontWeight: 900, fontSize: 62 * s,
          letterSpacing: "0.01em", color: "#FFF7EA", whiteSpace: "nowrap" }}>{word}</span>
      </div>
    </div>
  );
};

/* =========================================================================
   SET DRESSING — the archive's own vocabulary. ⛔ The density floor: the back
   wall needs 2-3 world props that tell you where you are, and there must be a
   living-world detail. These are STATIC furniture: they cost the motion
   hierarchy nothing and they are the difference between a room and a diagram.
   ====================================================================== */

/** the rolling ladder on its rail. One big vertical, in front of the wall — the
    single cheapest thing that stops 200 small cards reading as wallpaper. */
export const Ladder: React.FC<{ x: number; top: number; bot: number; z?: number;
  f?: number; s?: number; cast?: string; castK?: number }> =
  ({ x, top, bot, z = 44, f = 0, s = 1, cast, castK = 0.55 }) => {
  const OK = cast ? blend(OAK, cast, castK) : OAK;
  const lean = Math.sin(f / 97) * 0.20;
  const h = bot - top;
  return (
    <div style={{ position: "absolute", left: x, top, zIndex: z,
      transform: `rotate(${1.6 + lean}deg)`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: -46 * s, top: 0, width: 13 * s, height: h,
        background: `linear-gradient(90deg, ${mxh(OK, 0.24)} 0%, ${dkh(OK, 0.22)} 100%)` }} />
      <div style={{ position: "absolute", left: 34 * s, top: 0, width: 13 * s, height: h,
        background: `linear-gradient(90deg, ${mxh(OK, 0.10)} 0%, ${dkh(OK, 0.36)} 100%)` }} />
      {Array.from({ length: Math.max(3, Math.floor(h / 62)) }, (_, i) => (
        <div key={"rg" + i} style={{ position: "absolute", left: -46 * s, top: 44 + i * 62,
          width: 93 * s, height: 10 * s, borderRadius: 3, background: mxh(OK, 0.16),
          boxShadow: "0 3px 6px rgba(6,8,12,0.4)" }} />
      ))}
      {/* the hook over the rail, and the wheel on the floor */}
      <div style={{ position: "absolute", left: -54 * s, top: -16, width: 112 * s, height: 18 * s,
        borderRadius: 5, background: dkh(STEELD, 0.22) }} />
      <div style={{ position: "absolute", left: -40 * s, top: h - 6, width: 24 * s, height: 24 * s,
        borderRadius: 14, background: "#22262C" }} />
      <div style={{ position: "absolute", left: 30 * s, top: h - 6, width: 24 * s, height: 24 * s,
        borderRadius: 14, background: "#22262C" }} />
    </div>
  );
};

/** a stack of archive boxes — mass on the counter, in the room's own vocabulary */
export const BoxStack: React.FC<{ x: number; y: number; n?: number; z?: number; s?: number;
  f?: number; cast?: string; castK?: number }> =
  ({ x, y, n = 3, z = 46, s = 1, f = 0, cast, castK = 0.55 }) => (
  <div style={{ position: "absolute", left: x, top: y, zIndex: z,
    transform: `scale(${s})`, transformOrigin: "50% 100%" }}>
    {Array.from({ length: n }, (_, i) => (
      <div key={"bx" + i} style={{ position: "absolute", left: -78 + (i % 2) * 9,
        top: -(i + 1) * 56, width: 156, height: 54, borderRadius: 5,
        background: `linear-gradient(172deg, ${mxh(cast ? blend(CARDD, cast, castK) : CARDD, 0.18)} 0%, ${dkh(cast ? blend(CARDD, cast, castK) : CARDD, 0.22)} 100%)`,
        boxShadow: "0 6px 13px rgba(6,8,12,0.45)",
        transform: `rotate(${-1.4 + (i % 3) * 1.3}deg)` }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 156, height: 7,
          borderRadius: "5px 5px 0 0", background: mxh(CARDL, 0.20) }} />
        <div style={{ position: "absolute", left: 54, top: 20, width: 48, height: 15,
          borderRadius: 3, background: dkh(CARDD, 0.34), opacity: 0.6 }} />
      </div>
    ))}
  </div>
);

/** the pipe run across the ceiling — the mass cropped by the TOP edge, which
    ANIMATION-QUALITY §8 calls the cheapest depth in the repo. */
export const Ceiling: React.FC<{ p: Place; f: number; z?: number }> = ({ p, f, z = 90 }) => (<>
  <div style={{ position: "absolute", left: -40, right: -40, top: 4, height: 34, zIndex: z,
    background: `linear-gradient(180deg, ${dkh(p.back2, 0.10)} 0%, ${dkh(p.back2, 0.46)} 100%)` }} />
  <div style={{ position: "absolute", left: -40, right: -40, top: 38, height: 14, zIndex: z,
    background: dkh(p.back2, 0.56), transform: `rotate(${-0.5 + Math.sin(f / 121) * 0.1}deg)` }} />
  {[120, 360, 600, 840].map((x) => (
    <div key={"hg" + x} style={{ position: "absolute", left: x, top: 38, width: 9, height: 30,
      background: dkh(p.back2, 0.40), zIndex: z - 1 }} />
  ))}
</>);

/* =========================================================================
   THE SPRITE. ONE character, one costume lever per scene. ⛔ THE MARK NEVER
   COVERS HIS FACE — the box Mascot's body rect IS the face.
   ====================================================================== */
export const Guy: React.FC<{ x: number; y: number; f: number; s?: number; z?: number;
  face?: 1 | -1; ground?: boolean; costume?: Record<string, number> }> =
  ({ x, y, f, s = 1, z = 78, face = 1, ground = true, costume = {} }) => (<>
    {ground && <Contact x={x - 96 * s} y={y + 236 * s} w={192 * s} z={z - 1} o={0.42} />}
    <div style={{ position: "absolute", left: x - 125 * s, top: y, zIndex: z,
      transform: `scaleX(${face})`, transformOrigin: "50% 100%" }}>
      <Mascot lf={f} size={250 * s} {...(costume as any)} />
    </div>
  </>);

/** the shred that a stuffed prompt gives back. ⛔ ONE atmosphere layer per scene. */
export const Shred: React.FC<{ x: number; y: number; f: number; n?: number; rate?: number;
  z?: number; spread?: number }> = ({ x, y, f, n = 18, rate = 1, z = 66, spread = 170 }) => (<>
  {Array.from({ length: n }, (_, i) => {
    const t = ((f * 2.4 * rate) + i * 23) % 190;
    return <div key={"sd" + i} style={{ position: "absolute",
      left: x + (rnd(i, 3) - 0.5) * spread + Math.sin(f / 13 + i) * 9,
      top: y + t, width: 9 + rnd(i, 4) * 16, height: 5, borderRadius: 2,
      background: SHRED, opacity: 0.86 - t / 260, zIndex: z,
      transform: `rotate(${t * 2 + i * 30}deg)` }} />;
  })}
</>);

/** the paper dust that makes a beam visible. ⛔ ONE per scene, never a 2nd mover. */
export const Dust = Motes;
